export type FAAPCurrency = string;

export type FAAPAccountType =
  | "asset"
  | "liability"
  | "equity"
  | "revenue"
  | "expense";

export interface FAAPAccount {
  id: string;
  code: string;
  name: string;
  type: FAAPAccountType;
  currency: FAAPCurrency;
  parentId?: string;
  active: boolean;
}

export interface FAAPLedgerEntry {
  id: string;
  accountId: string;
  debit: number;
  credit: number;
  currency: FAAPCurrency;
  description?: string;
}

export interface FAAPJournal {
  id: string;
  reference: string;
  date: string;
  description: string;
  currency: FAAPCurrency;
  entries: FAAPLedgerEntry[];
  status: "draft" | "pending" | "approved" | "posted" | "reversed";
  source:
    | "manual"
    | "invoice"
    | "bill"
    | "payment"
    | "payroll"
    | "asset"
    | "inventory"
    | "treasury"
    | "system";
  createdAt: string;
  postedAt?: string;
}

export interface FAAPInvoice {
  id: string;
  customerId: string;
  issueDate: string;
  dueDate: string;
  currency: FAAPCurrency;
  subtotal: number;
  tax: number;
  total: number;
  balance: number;
  status: "draft" | "issued" | "partially_paid" | "paid" | "void";
}

export interface FAAPBill {
  id: string;
  supplierId: string;
  issueDate: string;
  dueDate: string;
  currency: FAAPCurrency;
  subtotal: number;
  tax: number;
  total: number;
  balance: number;
  status: "draft" | "approved" | "partially_paid" | "paid" | "void";
}

export interface FAAPBankTransaction {
  id: string;
  accountId: string;
  date: string;
  reference: string;
  amount: number;
  currency: FAAPCurrency;
  direction: "credit" | "debit";
  reconciled: boolean;
}

export interface FAAPBudget {
  id: string;
  name: string;
  accountId?: string;
  allocated: number;
  committed: number;
  consumed: number;
  currency: FAAPCurrency;
  status: "draft" | "active" | "closed";
}

export interface FAAPAsset {
  id: string;
  name: string;
  acquisitionCost: number;
  accumulatedDepreciation: number;
  currency: FAAPCurrency;
  depreciationMethod:
    | "straight_line"
    | "declining_balance"
    | "units_of_production";
  usefulLifeMonths: number;
  status: "active" | "disposed" | "fully_depreciated";
}

export interface FAAPTreasuryPosition {
  id: string;
  institution: string;
  accountReference: string;
  currency: FAAPCurrency;
  availableBalance: number;
  reservedBalance: number;
  liquidityRisk: "low" | "medium" | "high";
}

export interface FAAPReconciliationResult {
  id: string;
  bankAccountId: string;
  statementDate: string;
  matched: number;
  unmatched: number;
  difference: number;
  status: "matched" | "review" | "exception";
}

export interface FAAPDocument {
  id: string;
  type:
    | "invoice"
    | "bill"
    | "receipt"
    | "voucher"
    | "statement"
    | "trial_balance"
    | "income_statement"
    | "balance_sheet"
    | "cash_flow";
  reference: string;
  format: "pdf" | "xlsx" | "docx" | "csv";
  generatedAt: string;
  sourceId?: string;
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
    | "asset";
  operation: "create" | "update" | "post" | "reverse";
  payload: unknown;
  createdAt: string;
  syncedAt?: string;
  status: "pending" | "synced" | "failed";
}

export interface FAAPRuntimeHealth {
  ledger: "healthy" | "degraded" | "failed";
  reconciliation: "healthy" | "degraded" | "failed";
  treasury: "healthy" | "degraded" | "failed";
  documents: "healthy" | "degraded" | "failed";
  hybridSync: "online" | "offline" | "syncing";
  pendingOperations: number;
}
