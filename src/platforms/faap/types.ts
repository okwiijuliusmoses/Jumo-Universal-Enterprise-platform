/**
 * JUMO UEOS — FAAP Universal Financial Backbone Types
 * Universal financial domain covering Commercial, Institutional, Fund, and Public Sector accounting.
 */

export interface FaapAccount {
  code: string;
  name: string;
  category: 'Asset' | 'Liability' | 'Equity' | 'Revenue' | 'Expense';
  accountingModel: 'COMMERCIAL_GAAP' | 'PUBLIC_SECTOR_VOTEBOOK' | 'RESTRICTED_FUND' | 'SACCO_MEMBER_SHARES';
  balance: number;
  currency: string;
  tenantId: string;
}

export interface FaapFinancialTransaction {
  id: string;
  timestamp: string;
  tenantId: string;
  sourceAccount: string;
  destinationAccount: string;
  amount: number;
  narration: string;
  postedBy: string;
  status: 'draft' | 'posted' | 'voided' | 'failed';
  accountingModel?: string;
  voteCodeReference?: string;
  fundReference?: string;
}

export interface FaapReconciliationReport {
  timestamp: string;
  totalDebits: number;
  totalCredits: number;
  difference: number;
  isBalanced: boolean;
  status: 'Matched' | 'Unreconciled_Discrepancy';
  recommendation: string;
}

export interface FaapVoteBookModel {
  voteCode: string;
  voteTitle: string;
  warrantBudget: number;
  encumberedCommitments: number;
  actualDisbursements: number;
  availableFreeBalance: number;
}
