/**
 * JUMO FAAP (Financial Accounting & Allocation Platform)
 * Core Enterprise Engine & Statutory Double-Entry Ledger Subsystem
 * Authority: JUMO UEOS Architecture V2.0
 */

import type {
  Account,
  BankReconciliation,
  Budget,
  BudgetLine,
  CashBookEntry,
  CashBookType,
  CommitmentVoucher,
  Currency,
  FeeSplitAllocation,
  Invoice,
  InvoiceLine,
  JournalEntry,
  JournalLine,
  MerkleAuditBlock,
  Payment,
  ThreeWayMatchVoucher,
  VoteBookRecord,
} from "./faapEnterpriseTypes";

export class FAAPEnterpriseEngine {
  private accounts = new Map<string, Account>();
  private journals = new Map<string, JournalEntry>();
  private cashBookEntries: CashBookEntry[] = [];
  private voteBooks = new Map<string, VoteBookRecord>();
  private commitmentVouchers = new Map<string, CommitmentVoucher>();
  private matchVouchers = new Map<string, ThreeWayMatchVoucher>();
  private feeSplits = new Map<string, FeeSplitAllocation>();
  private invoices = new Map<string, Invoice>();
  private payments = new Map<string, Payment>();
  private budgets = new Map<string, Budget>();
  private reconciliations = new Map<string, BankReconciliation>();
  private merkleBlocks: MerkleAuditBlock[] = [];

  private currencies: Currency[] = [
    { code: "UGX", name: "Uganda Shilling", symbol: "UGX", decimalPlaces: 0, exchangeRateToUSD: 0.00027 },
    { code: "USD", name: "US Dollar", symbol: "$", decimalPlaces: 2, exchangeRateToUSD: 1.0 },
    { code: "KES", name: "Kenyan Shilling", symbol: "KES", decimalPlaces: 2, exchangeRateToUSD: 0.0077 },
    { code: "EUR", name: "Euro", symbol: "€", decimalPlaces: 2, exchangeRateToUSD: 1.08 },
    { code: "GBP", name: "British Pound", symbol: "£", decimalPlaces: 2, exchangeRateToUSD: 1.28 },
    { code: "TZS", name: "Tanzanian Shilling", symbol: "TZS", decimalPlaces: 2, exchangeRateToUSD: 0.00038 },
    { code: "RWF", name: "Rwandan Franc", symbol: "RWF", decimalPlaces: 2, exchangeRateToUSD: 0.00075 },
  ];

  constructor() {
    this.seedStandardChartOfAccounts();
    this.seedVoteBookRegistry();
    this.seedInitialMerkleGenesis();
  }

  /**
   * Seed Canonical 5-Tier Chart of Accounts
   */
  private seedStandardChartOfAccounts() {
    const standardAccounts: Array<[string, string, Account["type"], boolean]> = [
      // 1000 - Assets
      ["1010", "Main Vault Cash", "asset", false],
      ["1020", "Commercial Bank Operating Account", "asset", false],
      ["1030", "Digital Pay Clearing Holding Account", "asset", false],
      ["1100", "Trade Accounts Receivable", "asset", false],
      ["1200", "Inventory & Materials Stock", "asset", false],
      ["1500", "Institutional Fixed Assets (Property & Equipment)", "asset", false],
      ["1550", "Accumulated Depreciation", "asset", false],

      // 2000 - Liabilities
      ["2010", "Accounts Payable (Suppliers & Vendors)", "liability", false],
      ["2020", "Withholding Tax (WHT) Payable", "liability", false],
      ["2030", "VAT / Sales Tax Output Liability", "liability", false],
      ["2040", "Staff Payroll & Statutory Deductions", "liability", false],
      ["2500", "Member Savings & Term Deposits", "liability", false],

      // 3000 - Equity
      ["3010", "Statutory Capital Reserves", "equity", false],
      ["3020", "Member Share Capital", "equity", false],
      ["3030", "Retained Earnings / General Fund", "equity", false],

      // 4000 - Revenue
      ["4010", "Tuition, Membership & Service Fees", "revenue", false],
      ["4020", "Institutional Levies & Tithes", "revenue", false],
      ["4030", "Investment & Interest Income", "revenue", false],
      ["4040", "Grants & Research Endowments", "revenue", false],

      // 5000 - Expenses & Vote Controls
      ["5010", "Academic & Program Direct Costs", "expense", true],
      ["5020", "Staff Compensation & Welfare", "expense", true],
      ["5030", "Campus Utilities, Maintenance & Power", "expense", true],
      ["5040", "Laboratory, ICT & Library Materials", "expense", true],
      ["5050", "Administrative & Governance Expenses", "expense", true],
      ["5060", "Platform Transaction Fees & Clearing Splits", "expense", false],
    ];

    standardAccounts.forEach(([code, name, type, isVoteControlled]) => {
      const account: Account = {
        id: `acct-${code}`,
        code,
        name,
        type,
        active: true,
        balance: 0,
        isVoteControlled,
      };
      this.accounts.set(account.id, account);
    });
  }

  /**
   * Seed Initial Institutional Vote Books
   */
  private seedVoteBookRegistry() {
    const votes: Array<{ code: string; dept: string; desc: string; budget: number }> = [
      { code: "VOTE-101", dept: "Directorate Alpha", desc: "Operational Expenditure", budget: 0 },
      { code: "VOTE-102", dept: "Directorate Beta", desc: "Strategic Development", budget: 0 },
      { code: "VOTE-103", dept: "Directorate Gamma", desc: "Sovereign Infrastructure", budget: 0 },
      { code: "VOTE-104", dept: "Directorate Delta", desc: "Cognitive Operations", budget: 0 },
      { code: "VOTE-105", dept: "Directorate Epsilon", desc: "Governance & Compliance", budget: 0 },
    ];

    votes.forEach(v => {
      const record: VoteBookRecord = {
        id: `vb-${v.code}`,
        voteCode: v.code,
        department: v.dept,
        description: v.desc,
        fiscalYear: "2026/2027",
        approvedBudget: v.budget,
        revisedBudget: v.budget,
        totalCommitments: 0,
        actualExpenditure: 0,
        availableBalance: v.budget,
        utilizationPercentage: 0,
        isFrozen: false,
      };
      this.voteBooks.set(record.voteCode, record);
    });
  }

  private seedInitialMerkleGenesis() {
    this.recordMerkleProof("SYSTEM_INIT", "FAAP_GENESIS", "JUMO_FAAP_LEDGER_GENESIS_ROOT_HASH_V2");
  }

  // ==========================================
  // 1. CHART OF ACCOUNTS & BALANCING
  // ==========================================

  getAccounts(): Account[] {
    return Array.from(this.accounts.values());
  }

  getAccount(id: string): Account | undefined {
    return this.accounts.get(id);
  }

  getCurrencies(): Currency[] {
    return [...this.currencies];
  }

  // ==========================================
  // 2. DOUBLE-ENTRY JOURNAL & ZERO-PARITY
  // ==========================================

  createJournalEntry(
    reference: string,
    description: string,
    source: JournalEntry["source"],
    lines: Array<{
      accountId: string;
      description: string;
      debit: number;
      credit: number;
      currency?: string;
      voteCode?: string;
    }>,
    autoPost: boolean = false,
  ): JournalEntry {
    const totalDebit = lines.reduce((sum, l) => sum + (l.debit || 0), 0);
    const totalCredit = lines.reduce((sum, l) => sum + (l.credit || 0), 0);

    // Strict Double-Entry Parity
    if (Math.abs(totalDebit - totalCredit) > 0.0001) {
      throw new Error(
        `FAAP ZERO-PARITY VIOLATION: Total Debits (${totalDebit.toFixed(2)}) MUST equal Total Credits (${totalCredit.toFixed(2)}).`,
      );
    }

    const journalLines: JournalLine[] = lines.map((l, index) => {
      const acct = this.accounts.get(l.accountId);
      if (!acct) {
        throw new Error(`FAAP Account not found for ID: ${l.accountId}`);
      }
      return {
        id: `line-${Date.now()}-${index}`,
        accountId: l.accountId,
        accountCode: acct.code,
        accountName: acct.name,
        description: l.description || description,
        debit: l.debit || 0,
        credit: l.credit || 0,
        currency: l.currency || "UGX",
        exchangeRate: 1.0,
        voteCode: l.voteCode,
      };
    });

    const entry: JournalEntry = {
      id: `je-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      reference,
      date: new Date().toISOString().slice(0, 10),
      description,
      source,
      status: "draft",
      lines: journalLines,
      totalDebit,
      totalCredit,
      isBalanced: true,
      createdAt: new Date().toISOString(),
    };

    this.journals.set(entry.id, entry);

    if (autoPost) {
      this.postJournalEntry(entry.id);
    }

    return entry;
  }

  postJournalEntry(journalId: string, postedBy: string = "SYSTEM_CONTROLLER"): JournalEntry {
    const journal = this.journals.get(journalId);
    if (!journal) {
      throw new Error(`Journal ${journalId} not found.`);
    }

    if (journal.status === "posted") {
      return journal;
    }

    // Apply to ledger account balances
    journal.lines.forEach(line => {
      const account = this.accounts.get(line.accountId);
      if (account) {
        if (account.type === "asset" || account.type === "expense") {
          account.balance += line.debit - line.credit;
        } else {
          // Liability, Equity, Revenue
          account.balance += line.credit - line.debit;
        }

        // Check if attached to Vote Book
        if (line.voteCode && (account.type === "expense" || account.isVoteControlled)) {
          this.recordVoteExpenditure(line.voteCode, line.debit);
        }
      }
    });

    journal.status = "posted";
    journal.postedAt = new Date().toISOString();
    journal.postedBy = postedBy;

    const merkleHash = this.recordMerkleProof(
      postedBy,
      "POST_JOURNAL",
      `Journal:${journal.reference}:Debit=${journal.totalDebit}:Credit=${journal.totalCredit}`,
    );
    journal.merkleHash = merkleHash;

    return journal;
  }

  getJournals(): JournalEntry[] {
    return Array.from(this.journals.values());
  }

  // ==========================================
  // 3. MULTI-COLUMN CASH BOOKS
  // ==========================================

  recordCashBookEntry(
    bookType: CashBookType,
    particulars: string,
    voucherNo: string,
    cashDebit: number,
    cashCredit: number,
    bankDebit: number,
    bankCredit: number,
    discountDebit: number = 0,
    discountCredit: number = 0,
  ): CashBookEntry {
    const lastEntry = this.cashBookEntries[this.cashBookEntries.length - 1];
    const prevCashBal = lastEntry ? lastEntry.balanceCash : 0;
    const prevBankBal = lastEntry ? lastEntry.balanceBank : 0;

    const balanceCash = prevCashBal + cashDebit - cashCredit;
    const balanceBank = prevBankBal + bankDebit - bankCredit;

    const entry: CashBookEntry = {
      id: `cb-${Date.now()}-${this.cashBookEntries.length + 1}`,
      bookType,
      date: new Date().toISOString().slice(0, 10),
      reference: `CB-${Date.now()}`,
      particulars,
      voucherNo,
      cashDebit,
      cashCredit,
      bankDebit,
      bankCredit,
      discountDebit,
      discountCredit,
      balanceCash,
      balanceBank,
    };

    this.cashBookEntries.push(entry);
    return entry;
  }

  getCashBookEntries(bookType?: CashBookType): CashBookEntry[] {
    if (!bookType) return [...this.cashBookEntries];
    return this.cashBookEntries.filter(e => e.bookType === bookType);
  }

  // ==========================================
  // 4. VOTE BOOK & COMMITMENT CONTROL
  // ==========================================

  getVoteBooks(): VoteBookRecord[] {
    return Array.from(this.voteBooks.values());
  }

  getVoteBook(voteCode: string): VoteBookRecord | undefined {
    return this.voteBooks.get(voteCode);
  }

  createCommitmentVoucher(
    voteCode: string,
    requisitionNo: string,
    vendorName: string,
    description: string,
    amount: number,
  ): CommitmentVoucher {
    const vote = this.voteBooks.get(voteCode);
    if (!vote) {
      throw new Error(`Vote code ${voteCode} does not exist in Vote Book.`);
    }

    if (vote.isFrozen) {
      throw new Error(`Vote ${voteCode} is currently FROZEN by the Financial Controller.`);
    }

    if (vote.availableBalance < amount) {
      throw new Error(
        `VOTE CEILING EXCEEDED: Requested commitment UGX ${amount.toLocaleString()} exceeds available vote balance UGX ${vote.availableBalance.toLocaleString()} on Vote ${voteCode}.`,
      );
    }

    const voucher: CommitmentVoucher = {
      id: `comm-${Date.now()}`,
      voteCode,
      requisitionNo,
      vendorName,
      description,
      committedAmount: amount,
      date: new Date().toISOString().slice(0, 10),
      status: "COMMITTED",
    };

    this.commitmentVouchers.set(voucher.id, voucher);

    // Update Vote Book
    vote.totalCommitments += amount;
    vote.availableBalance = vote.approvedBudget - (vote.actualExpenditure + vote.totalCommitments);
    vote.utilizationPercentage = ((vote.actualExpenditure + vote.totalCommitments) / vote.approvedBudget) * 100;

    return voucher;
  }

  private recordVoteExpenditure(voteCode: string, amount: number) {
    const vote = this.voteBooks.get(voteCode);
    if (vote) {
      vote.actualExpenditure += amount;
      vote.availableBalance = vote.approvedBudget - (vote.actualExpenditure + vote.totalCommitments);
      vote.utilizationPercentage = ((vote.actualExpenditure + vote.totalCommitments) / vote.approvedBudget) * 100;
    }
  }

  // ==========================================
  // 5. 3-WAY MATCH VOUCHER ENGINE
  // ==========================================

  createThreeWayMatchVoucher(
    vendorId: string,
    vendorName: string,
    poNo: string,
    grnNo: string,
    invoiceNo: string,
    poAmount: number,
    grnAmount: number,
    invoiceAmount: number,
  ): ThreeWayMatchVoucher {
    const variance = invoiceAmount - poAmount;
    const isMatched = Math.abs(poAmount - grnAmount) < 0.01 && Math.abs(poAmount - invoiceAmount) < 0.01;

    const voucher: ThreeWayMatchVoucher = {
      id: `3way-${Date.now()}`,
      voucherNo: `VCH-3W-${Date.now().toString().slice(-6)}`,
      vendorId,
      vendorName,
      purchaseOrderNo: poNo,
      goodsReceivedNoteNo: grnNo,
      supplierInvoiceNo: invoiceNo,
      poAmount,
      grnAmount,
      invoiceAmount,
      matchVariance: variance,
      status: isMatched ? "fully_matched_approved" : "variance_flagged",
      approvedForPayment: isMatched,
    };

    this.matchVouchers.set(voucher.id, voucher);
    return voucher;
  }

  getThreeWayMatchVouchers(): ThreeWayMatchVoucher[] {
    return Array.from(this.matchVouchers.values());
  }

  // ==========================================
  // 6. AUTOMATED 1.5% FEE SPLIT CLEARING
  // ==========================================

  processClearingFeeSplit(
    transactionRef: string,
    grossAmount: number,
    currency: string = "UGX",
    platformFeeRate: number = 0.015, // 1.5%
  ): FeeSplitAllocation {
    const platformFeeAmount = grossAmount * platformFeeRate;
    const merchantNetAmount = grossAmount - platformFeeAmount;

    const split: FeeSplitAllocation = {
      id: `split-${Date.now()}`,
      transactionRef,
      grossAmount,
      currency,
      platformFeePercentage: platformFeeRate * 100,
      platformFeeAmount,
      merchantNetAmount,
      holdingAccountId: "acct-1030", // Digital Pay Clearing Holding
      settlementStatus: "SETTLED",
      timestamp: new Date().toISOString(),
    };

    this.feeSplits.set(split.id, split);

    // Post clearing journal entry
    this.createJournalEntry(
      `CLEAR-${transactionRef}`,
      `1.5% Clearing Split for Ref: ${transactionRef}`,
      "FEE_SPLIT",
      [
        { accountId: "acct-1020", description: "Gross Funds Inflow", debit: grossAmount, credit: 0 },
        { accountId: "acct-4010", description: "Merchant Net Revenue", debit: 0, credit: merchantNetAmount },
        { accountId: "acct-5060", description: "1.5% JUMO Fee Clearing", debit: 0, credit: platformFeeAmount },
      ],
      true,
    );

    return split;
  }

  getFeeSplits(): FeeSplitAllocation[] {
    return Array.from(this.feeSplits.values());
  }

  // ==========================================
  // 7. FINANCIAL STATEMENTS & IFRS REPORTING
  // ==========================================

  getFinancialStatements() {
    const accts = this.getAccounts();

    const assets = accts.filter(a => a.type === "asset");
    const liabilities = accts.filter(a => a.type === "liability");
    const equity = accts.filter(a => a.type === "equity");
    const revenue = accts.filter(a => a.type === "revenue");
    const expenses = accts.filter(a => a.type === "expense");

    const totalAssets = assets.reduce((s, a) => s + a.balance, 0);
    const totalLiabilities = liabilities.reduce((s, a) => s + a.balance, 0);
    const totalEquity = equity.reduce((s, a) => s + a.balance, 0);
    const totalRevenue = revenue.reduce((s, a) => s + a.balance, 0);
    const totalExpenses = expenses.reduce((s, a) => s + a.balance, 0);

    const netSurplusOrDeficit = totalRevenue - totalExpenses;
    const balanceSheetParityCheck = totalAssets - (totalLiabilities + totalEquity + netSurplusOrDeficit);

    return {
      balanceSheet: {
        totalAssets,
        totalLiabilities,
        totalEquity,
        retainedEarnings: netSurplusOrDeficit,
        isParityBalanced: Math.abs(balanceSheetParityCheck) < 0.01,
        assets,
        liabilities,
        equity,
      },
      incomeStatement: {
        totalRevenue,
        totalExpenses,
        netSurplusOrDeficit,
        revenueAccounts: revenue,
        expenseAccounts: expenses,
      },
      trialBalance: {
        totalDebits: totalAssets + totalExpenses,
        totalCredits: totalLiabilities + totalEquity + totalRevenue,
        isBalanced: Math.abs(totalAssets + totalExpenses - (totalLiabilities + totalEquity + totalRevenue)) < 0.01,
      },
    };
  }

  // ==========================================
  // 8. CRYPTOGRAPHIC MERKLE AUDIT PROOF
  // ==========================================

  private recordMerkleProof(actor: string, action: string, payload: string): string {
    const prevBlock = this.merkleBlocks[this.merkleBlocks.length - 1];
    const prevHash = prevBlock ? prevBlock.currentBlockHash : "00000000000000000000000000000000";
    const timestamp = new Date().toISOString();
    
    // Hash computation simulation
    const currentBlockHash = `SHA256:${Math.random().toString(36).substring(2)}${Date.now().toString(36)}`;
    const merkleRoot = `MROOT:${Math.random().toString(36).substring(2)}`;

    const block: MerkleAuditBlock = {
      blockHeight: this.merkleBlocks.length + 1,
      previousBlockHash: prevHash,
      currentBlockHash,
      merkleRoot,
      timestamp,
      transactionCount: 1,
      actor,
      action: `${action} :: ${payload}`,
    };

    this.merkleBlocks.push(block);
    return currentBlockHash;
  }

  getMerkleAuditLedger(): MerkleAuditBlock[] {
    return [...this.merkleBlocks];
  }
}

export const faapEnterpriseEngine = new FAAPEnterpriseEngine();
