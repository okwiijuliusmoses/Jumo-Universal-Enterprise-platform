export type EntryType = 'CREDIT' | 'DEBIT';
export type TransactionStatus = 'PENDING' | 'COMMITTED' | 'FAILED' | 'ROLLED_BACK';

export interface LedgerEntry {
  id: string;
  transactionId: string;
  accountId: string;
  type: EntryType;
  amount: number; // MUST be positive
  currency: string;
  exchangeRate?: number;
  description: string;
  timestamp: string; // ISO-8601
  metadata?: Record<string, any>;
}

export interface LedgerTransaction {
  id: string;
  tenantId: string;
  status: TransactionStatus;
  entries: LedgerEntry[];
  timestamp: string;
  idempotencyKey?: string;
  metadata?: Record<string, any>;
}

export interface PostTransactionRequest {
  tenantId: string;
  entries: Omit<LedgerEntry, 'id' | 'transactionId' | 'timestamp'>[];
  idempotencyKey?: string;
  metadata?: Record<string, any>;
}
