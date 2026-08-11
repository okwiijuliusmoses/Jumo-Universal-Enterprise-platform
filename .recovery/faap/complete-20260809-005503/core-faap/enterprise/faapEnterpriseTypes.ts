export type AccountType =
  | "asset"
  | "liability"
  | "equity"
  | "revenue"
  | "expense";

export type JournalStatus =
  | "draft"
  | "pending"
  | "posted"
  | "reversed";

export type DocumentStatus =
  | "draft"
  | "issued"
  | "paid"
  | "partially-paid"
  | "overdue"
  | "cancelled";

export interface Currency {
  code: string;
  name: string;
  symbol: string;
  decimalPlaces: number;
}

export interface Account {
  id: string;
  code: string;
  name: string;
  type: AccountType;
  parentId?: string;
  currency?: string;
  active: boolean;
  balance: number;
}

export interface JournalLine {
  accountId: string;
  description: string;
  debit: number;
  credit: number;
  currency: string;
  exchangeRate: number;
}

export interface JournalEntry {
  id: string;
  reference: string;
  date: string;
  description: string;
  source: string;
  status: JournalStatus;
  lines: JournalLine[];
  createdAt: string;
  postedAt?: string;
}

export interface InvoiceLine {
  description: string;
  quantity: number;
  unitPrice: number;
  taxRate: number;
  accountId: string;
}

export interface Invoice {
  id: string;
  number: string;
  customerId: string;
  issueDate: string;
  dueDate: string;
  currency: string;
  status: DocumentStatus;
  lines: InvoiceLine[];
  subtotal: number;
  tax: number;
  total: number;
  amountPaid: number;
  balanceDue: number;
}

export interface Payment {
  id: string;
  reference: string;
  date: string;
  payerId?: string;
  payeeId?: string;
  amount: number;
  currency: string;
  method: string;
  source: string;
  status: "pending" | "settled" | "failed" | "reversed";
  journalEntryId?: string;
}

export interface Budget {
  id: string;
  name: string;
  fiscalYear: string;
  currency: string;
  lines: Array<{
    accountId: string;
    period: string;
    budget: number;
    actual: number;
    variance: number;
  }>;
}

export interface ReconciliationRecord {
  id: string;
  accountId: string;
  statementDate: string;
  statementBalance: number;
  ledgerBalance: number;
  difference: number;
  status: "open" | "matched" | "exception";
}

export interface AuditEvent {
  id: string;
  timestamp: string;
  actor: string;
  action: string;
  entityType: string;
  entityId: string;
  details: string;
}
