/**
 * JUMO FAAP (Financial Accounting & Allocation Platform)
 * Sovereign Enterprise Types & Statutory Multi-Column Ledger Contracts
 * Authority: JUMO Enterprise Operating System (UEOS) V2.0
 */

export type AccountType =
  | "asset"
  | "liability"
  | "equity"
  | "revenue"
  | "expense"
  | "vote_commitment";

export type JournalStatus =
  | "draft"
  | "pending_approval"
  | "posted"
  | "reversed"
  | "rejected";

export type DocumentStatus =
  | "draft"
  | "issued"
  | "partially_paid"
  | "paid"
  | "overdue"
  | "cancelled"
  | "cleared";

export type CashBookType =
  | "single_column" // Cash only
  | "double_column" // Cash + Bank
  | "triple_column"; // Cash + Bank + Discount/Fee column

export type ThreeWayMatchStatus =
  | "unmatched"
  | "po_matched"
  | "grn_matched"
  | "fully_matched_approved"
  | "variance_flagged";

export interface Currency {
  code: string;
  name: string;
  symbol: string;
  decimalPlaces: number;
  exchangeRateToUSD: number;
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
  costCentreId?: string;
  isVoteControlled?: boolean;
}

export interface JournalLine {
  id: string;
  accountId: string;
  accountCode: string;
  accountName: string;
  description: string;
  debit: number;
  credit: number;
  currency: string;
  exchangeRate: number;
  costCentreId?: string;
  voteCode?: string;
}

export interface JournalEntry {
  id: string;
  reference: string;
  date: string;
  description: string;
  source: "MANUAL" | "PAYMENT_GATEWAY" | "PAYROLL" | "FEE_SPLIT" | "BILLING" | "SYSTEM";
  status: JournalStatus;
  lines: JournalLine[];
  totalDebit: number;
  totalCredit: number;
  isBalanced: boolean;
  createdAt: string;
  postedAt?: string;
  postedBy?: string;
  merkleHash?: string;
}

export interface CashBookEntry {
  id: string;
  bookType: CashBookType;
  date: string;
  reference: string;
  particulars: string;
  voucherNo: string;
  cashDebit: number;
  cashCredit: number;
  bankDebit: number;
  bankCredit: number;
  discountDebit: number;
  discountCredit: number;
  balanceCash: number;
  balanceBank: number;
}

export interface VoteBookRecord {
  id: string;
  voteCode: string;
  department: string;
  description: string;
  fiscalYear: string;
  approvedBudget: number;
  revisedBudget: number;
  totalCommitments: number;
  actualExpenditure: number;
  availableBalance: number;
  utilizationPercentage: number;
  isFrozen: boolean;
}

export interface CommitmentVoucher {
  id: string;
  voteCode: string;
  requisitionNo: string;
  vendorName: string;
  description: string;
  committedAmount: number;
  date: string;
  status: "COMMITTED" | "DISBURSED" | "CANCELLED";
}

export interface ThreeWayMatchVoucher {
  id: string;
  voucherNo: string;
  vendorId: string;
  vendorName: string;
  purchaseOrderNo: string;
  goodsReceivedNoteNo: string;
  supplierInvoiceNo: string;
  poAmount: number;
  grnAmount: number;
  invoiceAmount: number;
  matchVariance: number;
  status: ThreeWayMatchStatus;
  approvedForPayment: boolean;
  approvedBy?: string;
}

export interface FeeSplitAllocation {
  id: string;
  transactionRef: string;
  grossAmount: number;
  currency: string;
  platformFeePercentage: number; // e.g. 1.5%
  platformFeeAmount: number;
  merchantNetAmount: number;
  holdingAccountId: string;
  settlementStatus: "PENDING" | "SETTLED" | "EXCEPTION";
  timestamp: string;
}

export interface InvoiceLine {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  taxRate: number;
  accountId: string;
  total: number;
}

export interface Invoice {
  id: string;
  number: string;
  customerId: string;
  customerName: string;
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
  payCode?: string;
  date: string;
  payerId?: string;
  payerName?: string;
  payeeId?: string;
  amount: number;
  currency: string;
  method: "MOBILE_MONEY" | "BANK_EFT" | "CARD" | "CASH" | "QR_CODE" | "INTERNAL_TRANSFER";
  source: string;
  status: "pending" | "settled" | "failed" | "reversed";
  journalEntryId?: string;
  feeSplitId?: string;
}

export interface BudgetLine {
  accountId: string;
  accountCode: string;
  accountName: string;
  period: string;
  budgetAmount: number;
  actualAmount: number;
  committedAmount: number;
  varianceAmount: number;
  variancePercentage: number;
}

export interface Budget {
  id: string;
  name: string;
  fiscalYear: string;
  currency: string;
  totalBudget: number;
  totalActual: number;
  totalCommitted: number;
  lines: BudgetLine[];
}

export interface BankReconciliation {
  id: string;
  bankAccountId: string;
  statementDate: string;
  statementBalance: number;
  ledgerBalance: number;
  uncreditedDeposits: number;
  unpresentedCheques: number;
  adjustedBankBalance: number;
  adjustedLedgerBalance: number;
  difference: number;
  status: "MATCHED" | "DISCREPANCY_FLAGGED" | "PENDING_REVIEW";
}

export interface MerkleAuditBlock {
  blockHeight: number;
  previousBlockHash: string;
  currentBlockHash: string;
  merkleRoot: string;
  timestamp: string;
  transactionCount: number;
  actor: string;
  action: string;
}
