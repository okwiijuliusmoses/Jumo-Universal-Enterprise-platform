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

export class FAAPEnterpriseRuntime {
  readonly version = "FAAP-Enterprise-1.0.0";

  private readonly accounts =
    new Map<string, FAAPAccount>();

  private readonly journals =
    new Map<string, FAAPJournal>();

  private readonly invoices =
    new Map<string, FAAPInvoice>();

  private readonly bills =
    new Map<string, FAAPBill>();

  private readonly payroll =
    new Map<string, FAAPPayrollRun>();

  private readonly assets =
    new Map<string, FAAPAsset>();

  private readonly budgets =
    new Map<string, FAAPBudget>();

  private readonly bankTransactions =
    new Map<string, FAAPBankTransaction>();

  private readonly treasury =
    new Map<string, FAAPTreasuryPosition>();

  private readonly syncQueue: FAAPSyncEnvelope[] = [];

  private readonly auditTrail: FAAPAuditEvent[] = [];

  private online = true;

  registerAccount(
    input: Omit<FAAPAccount, "createdAt">,
  ): FAAPAccount {
    if (this.accounts.has(input.id)) {
      throw new Error(
        `FAAP account already exists: ${input.id}`,
      );
    }

    const account: FAAPAccount = {
      ...input,
      createdAt: now(),
    };

    this.accounts.set(account.id, account);

    return account;
  }

  listAccounts(): FAAPAccount[] {
    return [...this.accounts.values()];
  }

  validateEntries(
    entries: FAAPLedgerEntry[],
  ): void {
    if (!entries.length) {
      throw new Error(
        "A journal requires at least one ledger entry.",
      );
    }

    let debit = 0;
    let credit = 0;

    for (const entry of entries) {
      if (!this.accounts.has(entry.accountId)) {
        throw new Error(
          `Unknown FAAP account: ${entry.accountId}`,
        );
      }

      if (
        entry.debit < 0 ||
        entry.credit < 0
      ) {
        throw new Error(
          "Debit and credit values cannot be negative.",
        );
      }

      if (
        entry.debit > 0 &&
        entry.credit > 0
      ) {
        throw new Error(
          `Entry ${entry.id} cannot contain both debit and credit.`,
        );
      }

      debit += Number(entry.debit || 0);
      credit += Number(entry.credit || 0);
    }

    if (
      roundMoney(debit) !==
      roundMoney(credit)
    ) {
      throw new Error(
        `Ledger imbalance: debit=${roundMoney(
          debit,
        )}, credit=${roundMoney(credit)}`,
      );
    }
  }

  createJournal(
    input: Omit<
      FAAPJournal,
      "status" | "createdAt"
    >,
    actorId = "system",
  ): FAAPJournal {
    this.validateEntries(input.entries);

    if (this.journals.has(input.id)) {
      throw new Error(
        `Journal already exists: ${input.id}`,
      );
    }

    const journal: FAAPJournal = {
      ...input,
      status: "draft",
      createdAt: now(),
    };

    this.journals.set(
      journal.id,
      journal,
    );

    this.queueSync(
      "journal",
      "create",
      journal,
    );

    this.audit(
      "journal.created",
      "journal",
      journal.id,
      actorId,
    );

    return journal;
  }

  approveJournal(
    journalId: string,
    actorId = "system",
  ): FAAPJournal {
    const journal =
      this.requireJournal(journalId);

    if (
      !["draft", "pending"].includes(
        journal.status,
      )
    ) {
      throw new Error(
        `Journal ${journalId} cannot be approved from ${journal.status}.`,
      );
    }

    journal.status = "approved";
    journal.approvedAt = now();

    this.queueSync(
      "journal",
      "approve",
      journal,
    );

    this.audit(
      "journal.approved",
      "journal",
      journal.id,
      actorId,
    );

    return journal;
  }

  postJournal(
    journalId: string,
    actorId = "system",
  ): FAAPJournal {
    const journal =
      this.requireJournal(journalId);

    if (journal.status !== "approved") {
      throw new Error(
        `Journal ${journalId} must be approved before posting.`,
      );
    }

    this.validateEntries(
      journal.entries,
    );

    journal.status = "posted";
    journal.postedAt = now();

    this.queueSync(
      "journal",
      "post",
      journal,
    );

    this.audit(
      "journal.posted",
      "journal",
      journal.id,
      actorId,
    );

    return journal;
  }

  reverseJournal(
    journalId: string,
    actorId = "system",
  ): FAAPJournal {
    const journal =
      this.requireJournal(journalId);

    if (journal.status !== "posted") {
      throw new Error(
        `Only posted journal ${journalId} can be reversed.`,
      );
    }

    journal.status = "reversed";
    journal.reversedAt = now();

    this.queueSync(
      "journal",
      "reverse",
      journal,
    );

    this.audit(
      "journal.reversed",
      "journal",
      journal.id,
      actorId,
    );

    return journal;
  }

  listJournals(): FAAPJournal[] {
    return [...this.journals.values()];
  }

  getTrialBalance() {
    const balances = new Map<
      string,
      {
        debit: number;
        credit: number;
      }
    >();

    for (const journal of this.journals.values()) {
      if (journal.status !== "posted") {
        continue;
      }

      for (const entry of journal.entries) {
        const balance =
          balances.get(entry.accountId) ?? {
            debit: 0,
            credit: 0,
          };

        balance.debit += entry.debit;
        balance.credit += entry.credit;

        balances.set(
          entry.accountId,
          balance,
        );
      }
    }

    return this.listAccounts().map(
      (account) => ({
        account,
        debit: roundMoney(
          balances.get(account.id)
            ?.debit ?? 0,
        ),
        credit: roundMoney(
          balances.get(account.id)
            ?.credit ?? 0,
        ),
      }),
    );
  }

  getFinancialPosition() {
    const trialBalance =
      this.getTrialBalance();

    let assets = 0;
    let liabilities = 0;
    let equity = 0;
    let revenue = 0;
    let expenses = 0;

    for (const row of trialBalance) {
      const net =
        row.debit - row.credit;

      switch (row.account.type) {
        case "asset":
          assets += net;
          break;
        case "liability":
          liabilities += -net;
          break;
        case "equity":
          equity += -net;
          break;
        case "revenue":
          revenue += -net;
          break;
        case "expense":
          expenses += net;
          break;
      }
    }

    return {
      assets: roundMoney(assets),
      liabilities: roundMoney(
        liabilities,
      ),
      equity: roundMoney(equity),
      revenue: roundMoney(revenue),
      expenses: roundMoney(expenses),
      netIncome: roundMoney(
        revenue - expenses,
      ),
    };
  }

  createInvoice(
    invoice: FAAPInvoice,
    actorId = "system",
  ): FAAPInvoice {
    if (this.invoices.has(invoice.id)) {
      throw new Error(
        `Invoice already exists: ${invoice.id}`,
      );
    }

    if (
      roundMoney(invoice.total) !==
      roundMoney(
        invoice.subtotal +
          invoice.tax,
      )
    ) {
      throw new Error(
        "Invoice total does not equal subtotal plus tax.",
      );
    }

    const record: FAAPInvoice = {
      ...invoice,
      balance:
        invoice.balance ??
        invoice.total,
    };

    this.invoices.set(
      record.id,
      record,
    );

    this.queueSync(
      "invoice",
      "create",
      record,
    );

    this.audit(
      "invoice.created",
      "invoice",
      record.id,
      actorId,
    );

    return record;
  }

  listInvoices(): FAAPInvoice[] {
    return [...this.invoices.values()];
  }

  createBill(
    bill: FAAPBill,
    actorId = "system",
  ): FAAPBill {
    if (this.bills.has(bill.id)) {
      throw new Error(
        `Bill already exists: ${bill.id}`,
      );
    }

    if (
      roundMoney(bill.total) !==
      roundMoney(
        bill.subtotal + bill.tax,
      )
    ) {
      throw new Error(
        "Bill total does not equal subtotal plus tax.",
      );
    }

    const record: FAAPBill = {
      ...bill,
      balance:
        bill.balance ?? bill.total,
    };

    this.bills.set(
      record.id,
      record,
    );

    this.queueSync(
      "bill",
      "create",
      record,
    );

    this.audit(
      "bill.created",
      "bill",
      record.id,
      actorId,
    );

    return record;
  }

  listBills(): FAAPBill[] {
    return [...this.bills.values()];
  }

  createPayrollRun(
    payrollRun: FAAPPayrollRun,
    actorId = "system",
  ): FAAPPayrollRun {
    if (
      this.payroll.has(
        payrollRun.id,
      )
    ) {
      throw new Error(
        `Payroll run already exists: ${payrollRun.id}`,
      );
    }

    if (
      roundMoney(
        payrollRun.gross -
          payrollRun.deductions,
      ) !==
      roundMoney(
        payrollRun.net,
      )
    ) {
      throw new Error(
        "Payroll net does not equal gross minus deductions.",
      );
    }

    this.payroll.set(
      payrollRun.id,
      payrollRun,
    );

    this.queueSync(
      "payroll",
      "create",
      payrollRun,
    );

    this.audit(
      "payroll.created",
      "payroll",
      payrollRun.id,
      actorId,
    );

    return payrollRun;
  }

  listPayrollRuns(): FAAPPayrollRun[] {
    return [...this.payroll.values()];
  }

  registerBudget(
    budget: FAAPBudget,
    actorId = "system",
  ): FAAPBudget {
    if (this.budgets.has(budget.id)) {
      throw new Error(
        `Budget already exists: ${budget.id}`,
      );
    }

    if (
      budget.committed < 0 ||
      budget.consumed < 0
    ) {
      throw new Error(
        "Budget commitments and consumption cannot be negative.",
      );
    }

    this.budgets.set(
      budget.id,
      budget,
    );

    this.queueSync(
      "budget",
      "create",
      budget,
    );

    this.audit(
      "budget.created",
      "budget",
      budget.id,
      actorId,
    );

    return budget;
  }

  getBudgetAvailability(
    budgetId: string,
  ): number {
    const budget =
      this.budgets.get(
        budgetId,
      );

    if (!budget) {
      throw new Error(
        `Budget not found: ${budgetId}`,
      );
    }

    return roundMoney(
      budget.allocated -
        budget.committed -
        budget.consumed,
    );
  }

  registerAsset(
    asset: FAAPAsset,
    actorId = "system",
  ): FAAPAsset {
    if (this.assets.has(asset.id)) {
      throw new Error(
        `Asset already exists: ${asset.id}`,
      );
    }

    this.assets.set(
      asset.id,
      asset,
    );

    this.queueSync(
      "asset",
      "create",
      asset,
    );

    this.audit(
      "asset.created",
      "asset",
      asset.id,
      actorId,
    );

    return asset;
  }

  calculateStraightLineDepreciation(
    assetId: string,
  ): number {
    const asset =
      this.assets.get(assetId);

    if (!asset) {
      throw new Error(
        `Asset not found: ${assetId}`,
      );
    }

    if (
      asset.usefulLifeMonths <= 0
    ) {
      throw new Error(
        "Asset useful life must be greater than zero.",
      );
    }

    return roundMoney(
      asset.acquisitionCost /
        asset.usefulLifeMonths,
    );
  }

  listAssets(): FAAPAsset[] {
    return [...this.assets.values()];
  }

  registerTreasuryPosition(
    position: FAAPTreasuryPosition,
    actorId = "system",
  ): FAAPTreasuryPosition {
    if (
      this.treasury.has(
        position.id,
      )
    ) {
      throw new Error(
        `Treasury position already exists: ${position.id}`,
      );
    }

    this.treasury.set(
      position.id,
      position,
    );

    this.queueSync(
      "treasury",
      "create",
      position,
    );

    this.audit(
      "treasury.position.created",
      "treasury",
      position.id,
      actorId,
    );

    return position;
  }

  listTreasuryPositions(): FAAPTreasuryPosition[] {
    return [
      ...this.treasury.values(),
    ];
  }

  registerBankTransaction(
    transaction: FAAPBankTransaction,
    actorId = "system",
  ): FAAPBankTransaction {
    if (
      this.bankTransactions.has(
        transaction.id,
      )
    ) {
      throw new Error(
        `Bank transaction already exists: ${transaction.id}`,
      );
    }

    this.bankTransactions.set(
      transaction.id,
      transaction,
    );

    this.queueSync(
      "bank_transaction",
      "create",
      transaction,
    );

    this.audit(
      "bank.transaction.created",
      "bank_transaction",
      transaction.id,
      actorId,
    );

    return transaction;
  }

  reconcileBankAccount(
    bankAccountId: string,
    statementDate: string,
  ): FAAPReconciliationResult {
    const transactions = [
      ...this.bankTransactions.values(),
    ].filter(
      (transaction) =>
        transaction.bankAccountId ===
          bankAccountId &&
        transaction.date <=
          statementDate,
    );

    const matched =
      transactions.filter(
        (transaction) =>
          transaction.reconciled,
      );

    const unmatched =
      transactions.filter(
        (transaction) =>
          !transaction.reconciled,
      );

    const difference =
      unmatched.reduce(
        (sum, transaction) => {
          const signed =
            transaction.direction ===
            "credit"
              ? transaction.amount
              : -transaction.amount;

          return sum + signed;
        },
        0,
      );

    return {
      id: createId("recon"),
      bankAccountId,
      statementDate,
      matched: matched.length,
      unmatched: unmatched.length,
      difference:
        roundMoney(difference),
      status:
        unmatched.length === 0
          ? "matched"
          : "review",
    };
  }

  calculateTax(
    taxableAmount: number,
    rate: number,
    currency: CurrencyCode,
  ): FAAPTAXResult {
    if (taxableAmount < 0) {
      throw new Error(
        "Taxable amount cannot be negative.",
      );
    }

    if (
      rate < 0 ||
      rate > 100
    ) {
      throw new Error(
        "Tax rate must be between 0 and 100.",
      );
    }

    return {
      taxableAmount:
        roundMoney(
          taxableAmount,
        ),
      taxAmount:
        roundMoney(
          taxableAmount *
            (rate / 100),
        ),
      rate,
      currency,
    };
  }

  createDocumentDefinition(
    type: FAAPDocumentType,
    format: FAAPDocumentFormat,
    reference: string,
    data: unknown,
    sourceId?: string,
  ): FAAPDocumentDefinition {
    return {
      id: createId("document"),
      type,
      reference,
      format,
      generatedAt: now(),
      sourceId,
      data,
    };
  }

  exportTrialBalance(
    format: FAAPDocumentFormat = "xlsx",
  ): FAAPDocumentDefinition {
    return this.createDocumentDefinition(
      "trial_balance",
      format,
      `TB-${new Date()
        .toISOString()
        .slice(0, 10)}`,
      this.getTrialBalance(),
    );
  }

  exportFinancialPosition(
    format: FAAPDocumentFormat = "xlsx",
  ): FAAPDocumentDefinition {
    return this.createDocumentDefinition(
      "balance_sheet",
      format,
      `BS-${new Date()
        .toISOString()
        .slice(0, 10)}`,
      this.getFinancialPosition(),
    );
  }

  setConnectivity(
    online: boolean,
  ): void {
    this.online = online;
  }

  isOnline(): boolean {
    return this.online;
  }

  private queueSync(
    entity: FAAPSyncEnvelope["entity"],
    operation:
      FAAPSyncEnvelope["operation"],
    payload: unknown,
  ): FAAPSyncEnvelope {
    const envelope: FAAPSyncEnvelope = {
      id: createId("sync"),
      entity,
      operation,
      payload,
      createdAt: now(),
      status: this.online
        ? "syncing"
        : "pending",
      attempts: 0,
    };

    this.syncQueue.push(
      envelope,
    );

    return envelope;
  }

  getPendingSyncOperations(): FAAPSyncEnvelope[] {
    return this.syncQueue.filter(
      (operation) =>
        operation.status ===
          "pending" ||
        operation.status ===
          "failed",
    );
  }

  async flushSync(
    adapter?: (
      operation: FAAPSyncEnvelope,
    ) => Promise<void>,
  ): Promise<FAAPSyncEnvelope[]> {
    if (!this.online) {
      return this.getPendingSyncOperations();
    }

    const operations =
      this.getPendingSyncOperations();

    for (const operation of operations) {
      operation.status =
        "syncing";

      operation.attempts += 1;

      try {
        if (adapter) {
          await adapter(
            operation,
          );
        }

        operation.status =
          "synced";

        operation.syncedAt =
          now();

        operation.error =
          undefined;
      } catch (error) {
        operation.status =
          "failed";

        operation.error =
          error instanceof Error
            ? error.message
            : String(error);
      }
    }

    return operations;
  }

  private audit(
    action: string,
    entity: string,
    entityId: string,
    actorId: string,
    metadata?: Record<
      string,
      unknown
    >,
  ): void {
    this.auditTrail.push({
      id: createId("audit"),
      action,
      entity,
      entityId,
      actorId,
      timestamp: now(),
      metadata,
    });
  }

  getAuditTrail(): FAAPAuditEvent[] {
    return [...this.auditTrail];
  }

  health(): FAAPRuntimeHealth {
    const pending =
      this.getPendingSyncOperations()
        .length;

    return {
      ledger: "healthy",
      subledgers: "healthy",
      reconciliation: "healthy",
      treasury: "healthy",
      documents: "healthy",
      hybridSync: this.online
        ? pending > 0
          ? "syncing"
          : "online"
        : "offline",
      pendingOperations:
        pending,
    };
  }

  createUpgradePlan(
    fromVersion: string,
    toVersion: string,
    migrations: string[],
  ): FAAPUpgradePlan {
    return {
      fromVersion,
      toVersion,
      migrations,
      backupRequired: true,
      rollbackSupported: true,
    };
  }

  validateUpgrade(
    plan: FAAPUpgradePlan,
  ): {
    valid: boolean;
    reasons: string[];
  } {
    const reasons: string[] = [];

    if (!plan.fromVersion) {
      reasons.push(
        "Missing source version.",
      );
    }

    if (!plan.toVersion) {
      reasons.push(
        "Missing target version.",
      );
    }

    if (!plan.migrations.length) {
      reasons.push(
        "No migrations defined.",
      );
    }

    if (!plan.backupRequired) {
      reasons.push(
        "Upgrade backup is mandatory.",
      );
    }

    if (
      !plan.rollbackSupported
    ) {
      reasons.push(
        "Rollback support is mandatory.",
      );
    }

    return {
      valid:
        reasons.length === 0,
      reasons,
    };
  }

  private requireJournal(
    journalId: string,
  ): FAAPJournal {
    const journal =
      this.journals.get(
        journalId,
      );

    if (!journal) {
      throw new Error(
        `FAAP journal not found: ${journalId}`,
      );
    }

    return journal;
  }
}

export const faapEnterpriseRuntime =
  new FAAPEnterpriseRuntime();

export default faapEnterpriseRuntime;
