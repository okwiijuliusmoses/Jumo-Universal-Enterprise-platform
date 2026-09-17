import { LedgerRepository, AuditLogRepository } from "../../repositories/repositories";
import { LedgerAccountRecord } from "../../models/models";

export interface FinancialTransaction {
  id: string;
  timestamp: string;
  tenantId: string;
  sourceAccount: string;
  destinationAccount: string;
  amount: number;
  narration: string;
  postedBy: string;
  status: "draft" | "posted" | "voided" | "failed";
}

export interface ReconciliationReport {
  timestamp: string;
  totalDebits: number;
  totalCredits: number;
  difference: number;
  isBalanced: boolean;
  status: "Matched" | "Unreconciled_Discrepancy";
  recommendation: string;
}

export class FAAPService {
  private static instance: FAAPService;
  private transactionLedger: Map<string, FinancialTransaction> = new Map();

  private constructor() {
    this.seedDefaultTransactions();
  }

  public static getInstance(): FAAPService {
    if (!FAAPService.instance) {
      FAAPService.instance = new FAAPService();
    }
    return FAAPService.instance;
  }

  private seedDefaultTransactions() {
    const seedTx: FinancialTransaction[] = [
      {
        id: "TX-FAAP-401",
        timestamp: new Date().toISOString(),
        tenantId: "sacco-zambia-hq",
        sourceAccount: "10001", // Cash
        destinationAccount: "40001", // Interest Income
        amount: 2500.00,
        narration: "Sacco loan interest credit payment",
        postedBy: "controller@jumo.net",
        status: "posted"
      },
      {
        id: "TX-FAAP-402",
        timestamp: new Date().toISOString(),
        tenantId: "church-uganda-diocese",
        sourceAccount: "10001", // Cash
        destinationAccount: "30001", // Capital Reserve
        amount: 5000.00,
        narration: "Tithes & Building Fund Contribution",
        postedBy: "operator@jumo.net",
        status: "posted"
      }
    ];

    for (const tx of seedTx) {
      this.transactionLedger.set(tx.id, tx);
    }
  }

  // 1. Transaction Validation Layer
  public validateTransaction(tx: Omit<FinancialTransaction, "id" | "timestamp" | "status">): { valid: boolean; error?: string } {
    if (tx.amount <= 0) {
      return { valid: false, error: "Transaction amount must be greater than zero." };
    }
    if (!tx.sourceAccount || !tx.destinationAccount) {
      return { valid: false, error: "Source and destination accounts are required." };
    }
    if (tx.sourceAccount === tx.destinationAccount) {
      return { valid: false, error: "Source and destination accounts cannot be identical." };
    }
    if (!tx.narration || tx.narration.trim().length < 5) {
      return { valid: false, error: "Narration must be a descriptive string of at least 5 characters." };
    }

    const src = LedgerRepository.findAccountByCode(tx.sourceAccount);
    const dest = LedgerRepository.findAccountByCode(tx.destinationAccount);

    if (!src) {
      return { valid: false, error: `Source account code '${tx.sourceAccount}' does not exist.` };
    }
    if (!dest) {
      return { valid: false, error: `Destination account code '${tx.destinationAccount}' does not exist.` };
    }

    return { valid: true };
  }

  // 2. Post Transaction Core with Double-Entry and Event Publishing
  public postTransaction(txData: Omit<FinancialTransaction, "id" | "timestamp" | "status">): FinancialTransaction {
    const validation = this.validateTransaction(txData);
    if (!validation.valid) {
      AuditLogRepository.log(
        txData.postedBy,
        "FAAP_TRANSACTION_FAILED",
        `Validation failed for ledger post: ${validation.error}`,
        "failed"
      );
      throw new Error(validation.error || "Transaction validation failed.");
    }

    const id = `TX-FAAP-${Math.floor(Math.random() * 900000) + 100000}`;
    const tx: FinancialTransaction = {
      ...txData,
      id,
      timestamp: new Date().toISOString(),
      status: "posted"
    };

    const src = LedgerRepository.findAccountByCode(tx.sourceAccount)!;
    const dest = LedgerRepository.findAccountByCode(tx.destinationAccount)!;

    // Mutate source account and destination account balances in db
    // Asset/Expense increase on debit (+), other accounts decrease on debit (-)
    // Liability/Equity/Revenue increase on credit (+), other accounts decrease on credit (-)
    LedgerRepository.updateBalance(tx.sourceAccount, -tx.amount, src.category);
    LedgerRepository.updateBalance(tx.destinationAccount, tx.amount, dest.category);

    this.transactionLedger.set(id, tx);

    // 3. Audit Trail Logger
    AuditLogRepository.log(
      tx.postedBy,
      "FAAP_LEDGER_POST",
      `Posted double-entry FAAP transaction ${tx.id} from [${tx.sourceAccount}] to [${tx.destinationAccount}] of amount ${tx.amount} (${tx.narration}).`
    );

    // 4. Financial Event Publishing (Simulated webhook & WebSocket dispatch log)
    console.log(`[FAAP_EVENT_PUBLISHER] Dispatched transaction event: ${JSON.stringify(tx)}`);

    return tx;
  }

  // 5. Ledger Reconciliation Service
  public performReconciliation(tenantId: string): ReconciliationReport {
    const accounts = LedgerRepository.findAllAccounts();
    
    let totalDebits = 0;
    let totalCredits = 0;

    for (const acc of accounts) {
      if (acc.category === "Asset" || acc.category === "Expense") {
        if (acc.balance >= 0) totalDebits += acc.balance;
        else totalCredits += Math.abs(acc.balance);
      } else {
        if (acc.balance >= 0) totalCredits += acc.balance;
        else totalDebits += Math.abs(acc.balance);
      }
    }

    const difference = Math.abs(totalDebits - totalCredits);
    const isBalanced = difference < 0.01;

    const report: ReconciliationReport = {
      timestamp: new Date().toISOString(),
      totalDebits,
      totalCredits,
      difference,
      isBalanced,
      status: isBalanced ? "Matched" : "Unreconciled_Discrepancy",
      recommendation: isBalanced 
        ? "All double-entry ledger categories matched with exactly $0.00 offset. Core parity verified." 
        : `Ledger discrepancy of ${difference.toFixed(2)} discovered. Review audit trail logs and void unbalanced postings.`
    };

    AuditLogRepository.log(
      "FAAP_System_Auditor",
      "LEDGER_RECONCILIATION",
      `Ledger reconciliation executed. Status: ${report.status}. Debits: ${totalDebits.toFixed(2)}, Credits: ${totalCredits.toFixed(2)}.`
    );

    return report;
  }

  public getTransactionHistory(): FinancialTransaction[] {
    return Array.from(this.transactionLedger.values());
  }

  public getTreasuryStatus() {
    const cashAcc = LedgerRepository.findAccountByCode("10001");
    const bankAcc = LedgerRepository.findAccountByCode("10002");
    
    return {
      masterTreasuryBalance: (cashAcc?.balance || 0) + (bankAcc?.balance || 0),
      clearingFeeRate: "1.5%",
      settlementCycle: "Real-Time Gross Settlement (RTGS)",
      currenciesSupported: ["ZMK", "UGX", "KES", "USD"]
    };
  }
}

export const faapService = FAAPService.getInstance();
export { faapEnterpriseEngine } from "./faapEnterpriseEngine";
export * from "./faapEnterpriseTypes";
