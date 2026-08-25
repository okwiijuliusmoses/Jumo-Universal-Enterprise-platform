export interface GlAccount {
  accountId: string;
  accountCode: string; // e.g. '1000'
  name: string;
  type: 'ASSET' | 'LIABILITY' | 'EQUITY' | 'REVENUE' | 'EXPENSE';
  balance: number;
  currency: string;
  status: 'ACTIVE' | 'FROZEN' | 'CLOSED';
  tenantId: string;
}

export interface JournalEntryLine {
  accountId: string;
  type: 'DEBIT' | 'CREDIT';
  amount: number;
  currency: string;
  exchangeRate?: number; // Base currency exchange rate if multi-currency
}

export interface JournalEntry {
  entryId: string;
  transactionRef: string; // Linking back to payment switch or mobile money tx
  date: string;
  description: string;
  lines: JournalEntryLine[];
  status: 'POSTED' | 'DRAFT' | 'REVERSED';
  postedBy: string; // System or User ID
  tenantId: string;
  // Cryptographic hash for immutability
  integrityHash?: string; 
}
