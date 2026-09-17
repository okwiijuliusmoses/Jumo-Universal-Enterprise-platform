import type { CurrencyCode } from "./types";

export type FAAPAccountType =
  | "asset"
  | "liability"
  | "equity"
  | "revenue"
  | "expense";

export type FAAPJournalStatus =
  | "draft"
  | "pending"
  | "approved"
  | "posted"
  | "reversed";

export type FAAPSourceType =
  | "manual"
  | "invoice"
  | "bill"
  | "payment"
  | "payroll"
  | "asset"
  | "inventory"
  | "treasury"
  | "tax"
  | "system";

export type FAAPSyncStatus =
  | "pending"
  | "syncing"
  | "synced"
  | "failed";

export interface FAAPAccount {
  id: string;
  code: string;
  name: string;
  type: FAAPAccountType;
  currency: CurrencyCode;
  parentId?: string;
  active: boolean;
  createdAt: string;
}

export interface FAAPLedgerEntry {
  id: string;
  accountId: string;
  debit: number;
  credit: number;
  currency: CurrencyCode;
  description?: string;
  reference?: string;
}

export interface FAAPJournal {
  id: string;
  reference: string;
  date: string;
  description: string;
  currency: CurrencyCode;
  entries: FAAPLedgerEntry[];
  status: FAAPJournalStatus;
  source: FAAPSourceType;
  createdAt: string;
  approvedAt?: string;
  postedAt?: string;
  reversedAt?: string;
}

export interface FAAPInvoice {
  id: string;
  customerId: string;
  issueDate: string;
  dueDate: string;
  currency: CurrencyCode;
  subtotal: number;
  tax: number;
  total: number;
  balance: number;
  status:
    | "draft"
    | "issued"
    | "partially_paid"
    | "paid"
    | "void";
}

export interface FAAPBill {
  id: string;
  supplierId: string;
  issueDate: string;
  dueDate: string;
  currency: CurrencyCode;
  subtotal: number;
  tax: number;
  total: number;
  balance: number;
  status:
    | "draft"
    | "approved"
    | "partially_paid"
    | "paid"
    | "void";
}

export interface FAAPPayrollRun {
  id: string;
  period: string;
  currency: CurrencyCode;
  gross: number;
  deductions: number;
  net: number;
  status:
    | "draft"
    | "approved"
    | "posted"
    | "paid";
}

export interface FAAPAsset {
  id: string;
  name: string;
  acquisitionCost: number;
  accumulatedDepreciation: number;
  currency: CurrencyCode;
  depreciationMethod:
    | "straight_line"
    | "declining_balance"
    | "units_of_production";
  usefulLifeMonths: number;
  status:
    | "active"
    | "disposed"
    | "fully_depreciated";
}

export interface FAAPBudget {
  id: string;
  name: string;
  accountId?: string;
  allocated: number;
  committed: number;
  consumed: number;
  currency: CurrencyCode;
  status:
    | "draft"
    | "active"
    | "closed";
}

export interface FAAPBankTransaction {
  id: string;
  bankAccountId: string;
  date: string;
  reference: string;
  amount: number;
  currency: CurrencyCode;
  direction: "credit" | "debit";
  reconciled: boolean;
}

export interface FAAPTreasuryPosition {
  id: string;
  institution: string;
  accountReference: string;
  currency: CurrencyCode;
  availableBalance: number;
  reservedBalance: number;
  liquidityRisk:
    | "low"
    | "medium"
    | "high";
}

export interface FAAPReconciliationResult {
  id: string;
  bankAccountId: string;
  statementDate: string;
  matched: number;
  unmatched: number;
  difference: number;
  status:
    | "matched"
    | "review"
    | "exception";
}

export interface FAAPTAXResult {
  taxableAmount: number;
  taxAmount: number;
  rate: number;
  currency: CurrencyCode;
}

export type FAAPDocumentType =
  | "invoice"
  | "bill"
  | "receipt"
  | "payment_voucher"
  | "trial_balance"
  | "income_statement"
  | "balance_sheet"
  | "cash_flow"
  | "ar_aging"
  | "ap_aging"
  | "budget"
  | "payroll"
  | "tax"
  | "asset_register"
  | "bank_reconciliation"
  | "treasury";

export type FAAPDocumentFormat =
  | "pdf"
  | "xlsx"
  | "docx"
  | "csv";

export interface FAAPDocumentDefinition {
  id: string;
  type: FAAPDocumentType;
  reference: string;
  format: FAAPDocumentFormat;
  generatedAt: string;
  sourceId?: string;
  data: unknown;
}

export interface FAAPSyncEnvelope {
  id: string;
  entity:
    | "journal"
    | "invoice"
    | "bill"
    | "payment"
    | "bank_transaction"
    | "budget"
    | "asset"
    | "payroll"
    | "treasury";
  operation:
    | "create"
    | "update"
    | "approve"
    | "post"
    | "reverse";
  payload: unknown;
  createdAt: string;
  syncedAt?: string;
  status: FAAPSyncStatus;
  attempts: number;
  error?: string;
}

export interface FAAPAuditEvent {
  id: string;
  action: string;
  entity: string;
  entityId: string;
  actorId: string;
  timestamp: string;
  metadata?: Record<string, unknown>;
}

export interface FAAPRuntimeHealth {
  ledger:
    | "healthy"
    | "degraded"
    | "failed";
  subledgers:
    | "healthy"
    | "degraded"
    | "failed";
  reconciliation:
    | "healthy"
    | "degraded"
    | "failed";
  treasury:
    | "healthy"
    | "degraded"
    | "failed";
  documents:
    | "healthy"
    | "degraded"
    | "failed";
  hybridSync:
    | "online"
    | "offline"
    | "syncing";
  pendingOperations: number;
}

export interface FAAPUpgradePlan {
  fromVersion: string;
  toVersion: string;
  migrations: string[];
  backupRequired: boolean;
  rollbackSupported: boolean;
}

const now = (): string =>
  new Date().toISOString();

const roundMoney = (value: number): number =>
  Math.round(
    (Number(value) + Number.EPSILON) * 100,
  ) / 100;

const createId = (prefix: string): string =>
  `${prefix}-${Date.now()}-${Math.random()
    .toString(36)
    .slice(2, 10)}`;

import { LedgerEngine } from "./LedgerEngine";
import { db } from "../../database/db";
import { LedgerRepository, AuditLogRepository } from "../../repositories/repositories";
import { JournalRecord, LedgerEntryRecord, LedgerAccountRecord } from "../../models/models";

export class FAAPEnterpriseRuntime {
  readonly version = "FAAP-Enterprise-1.0.0-Persistent";

  registerAccount(input: Omit<LedgerAccountRecord, "balance" | "status">): LedgerAccountRecord {
    const account: LedgerAccountRecord = {
      ...input,
      balance: 0,
      status: "Active"
    };
    return LedgerRepository.saveAccount(account);
  }

  listAccounts(): LedgerAccountRecord[] {
    return LedgerRepository.findAllAccounts();
  }

  async createJournal(
    journal: Omit<JournalRecord, "id" | "createdAt" | "status">,
    entries: Omit<LedgerEntryRecord, "id" | "journalId">[]
  ): Promise<JournalRecord> {
    return LedgerEngine.postJournal(journal, entries);
  }

  async saveDraft(
    journal: Omit<JournalRecord, "id" | "createdAt" | "status">,
    entries: Omit<LedgerEntryRecord, "id" | "journalId">[]
  ): Promise<JournalRecord> {
    return LedgerEngine.saveDraft(journal, entries);
  }

  async approveJournal(id: string): Promise<JournalRecord> {
    return LedgerEngine.approveAndPost(id);
  }

  listJournals(): JournalRecord[] {
    return db.select<JournalRecord>("journals");
  }

  getPeriods() {
    return db.select<any>("accounting_periods");
  }

  getTrialBalance() {
    const accounts = this.listAccounts();
    const entries = db.select<LedgerEntryRecord>("ledger_entries");

    return accounts.map(account => {
      const accountEntries = entries.filter(e => e.accountId === account.code);
      const debit = accountEntries.reduce((sum, e) => sum + e.debit, 0);
      const credit = accountEntries.reduce((sum, e) => sum + e.credit, 0);
      return {
        account,
        debit,
        credit,
        balance: account.balance
      };
    });
  }

  getFinancialPosition() {
    const accounts = this.listAccounts();
    const result = {
      assets: 0,
      liabilities: 0,
      equity: 0,
      revenue: 0,
      expenses: 0,
      netIncome: 0
    };

    accounts.forEach(acc => {
      if (acc.category === "Asset") result.assets += acc.balance;
      if (acc.category === "Liability") result.liabilities += acc.balance;
      if (acc.category === "Equity") result.equity += acc.balance;
      if (acc.category === "Revenue") result.revenue += acc.balance;
      if (acc.category === "Expense") result.expenses += acc.balance;
    });

    result.netIncome = result.revenue - result.expenses;
    return result;
  }

  ensureSeeded() {
    const accounts = this.listAccounts();
    if (accounts.length === 0) {
      console.log("[FAAP] Seeding default Chart of Accounts...");
      this.registerAccount({ code: "1001", name: "Cash in Vault", category: "Asset" });
      this.registerAccount({ code: "1002", name: "Bank Balance (Stanbic)", category: "Asset" });
      this.registerAccount({ code: "2001", name: "Member Savings Deposits", category: "Liability" });
      this.registerAccount({ code: "2002", name: "Share Capital", category: "Equity" });
      this.registerAccount({ code: "3001", name: "Interest Income on Loans", category: "Revenue" });
      this.registerAccount({ code: "4001", name: "Salary Expenses", category: "Expense" });
      this.registerAccount({ code: "4002", name: "Rent & Utilities", category: "Expense" });
    }

    const periods = this.getPeriods();
    if (periods.length === 0) {
      console.log("[FAAP] Seeding default Accounting Periods...");
      db.insert("accounting_periods", {
        id: "FY2026-Q1",
        startDate: "2026-01-01T00:00:00Z",
        endDate: "2026-03-31T23:59:59Z",
        status: "Open"
      });
      db.insert("accounting_periods", {
        id: "FY2026-Q2",
        startDate: "2026-04-01T00:00:00Z",
        endDate: "2026-06-30T23:59:59Z",
        status: "Open"
      });
      db.insert("accounting_periods", {
        id: "FY2026-Q3",
        startDate: "2026-07-01T00:00:00Z",
        endDate: "2026-09-30T23:59:59Z",
        status: "Open"
      });
      db.insert("accounting_periods", {
        id: "FY2026-Q4",
        startDate: "2026-10-01T00:00:00Z",
        endDate: "2026-12-31T23:59:59Z",
        status: "Open"
      });
    }
  }
}

export const faapEnterpriseRuntime = new FAAPEnterpriseRuntime();
export default faapEnterpriseRuntime;
