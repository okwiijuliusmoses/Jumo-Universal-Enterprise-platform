/**
 * JUMO FAAP — Sovereign Domain Types
 */

export interface FaapAccount {
  id?: string;
  code: string;
  name: string;
  type: 'ASSET' | 'LIABILITY' | 'EQUITY' | 'REVENUE' | 'EXPENSE';
  subType: string;
  balance: number;
  currency: string;
  isSystem: boolean;
}

export interface FaapJournalEntry {
  id: string;
  sourceProduct?: string;
  entryNumber: string;
  date: string;
  memo: string;
  debitAccount?: string;
  creditAccount?: string;
  amount?: number;
  timestamp?: string;
  lines: FaapJournalLine[];
  totalDebit: number;
  totalCredit: number;
  status: 'POSTED' | 'DRAFT' | 'VOIDED';
}

export interface FaapJournalLine {
  accountCode: string;
  debit: number;
  credit: number;
  description?: string;
}

export interface FaapVendorBill {
  id: string;
  createdAt?: string;
  billNumber: string;
  vendorName: string;
  dueDate: string;
  totalAmount: number;
  balanceDue: number;
  status: 'OPEN' | 'PAID' | 'OVERDUE';
}

export interface FaapCustomerInvoice {
  id: string;
  createdAt?: string;
  invoiceNumber: string;
  customerName: string;
  dueDate: string;
  totalAmount: number;
  balanceDue: number;
  status: 'SENT' | 'PAID' | 'OVERDUE';
}

export interface FaapBankFeedTransaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  status: 'UNRECONCILED' | 'MATCHED';
}

export interface FaapFixedAsset {
  id: string;
  assetCode: string;
  name: string;
  acquisitionCost: number;
  accumulatedDepreciation: number;
  netBookValue: number;
}

// VOTE BOOK (Institutional Finance Control)
export interface FaapVoteBookEntry {
  id: string;
  voteCode: string;
  voteName: string;
  annualBudget: number;
  commitments: number; // Encumbrances (Requisitions in process)
  expenditure: number; // Actual payments made
  balanceAvailable: number; // Budget - Commitments - Expenditure
}

export interface FaapCommitmentRecord {
  id: string;
  voteCode: string;
  description: string;
  amount: number;
  referenceNumber: string; // e.g. LPO/LSO number
  status: 'COMMITTED' | 'LIQUIDATED' | 'CANCELLED';
  date: string;
}

// CASH BOOK (Treasury Management)
export interface FaapCashBookEntry {
  id: string;
  date: string;
  description: string;
  folioReference: string;
  accountCode: string;
  cashAmount: number;
  bankAmount: number;
  discountAllowed?: number;
  discountReceived?: number;
  type: 'RECEIPT' | 'PAYMENT';
}
