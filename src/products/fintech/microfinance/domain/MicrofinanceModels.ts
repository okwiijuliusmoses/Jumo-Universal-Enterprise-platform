export interface MfiMember {
  memberId: string;
  type: 'INDIVIDUAL' | 'GROUP';
  groupId?: string; // If part of a Joint Liability Group (JLG)
  status: 'ACTIVE' | 'PENDING_KYC' | 'BLACKLISTED' | 'DORMANT';
  kycTier: 1 | 2 | 3;
  creditScore?: number;
  branchId: string;
  assignedOfficerId: string; // Field Officer
}

export interface LoanApplication {
  applicationId: string;
  memberId: string;
  productType: 'BUSINESS' | 'AGRICULTURE' | 'EMERGENCY' | 'ASSET_FINANCE';
  principalAmount: number;
  currency: string;
  interestRate: number; // e.g. 15.0 for 15%
  durationMonths: number;
  status: 'SUBMITTED' | 'APPRAISAL' | 'APPROVED' | 'DISBURSED' | 'REJECTED';
  collateral?: CollateralItem[];
  guarantorIds?: string[];
}

export interface CollateralItem {
  id: string;
  type: 'VEHICLE' | 'LAND' | 'EQUIPMENT' | 'GUARANTOR_SAVINGS';
  estimatedValue: number;
  status: 'PLEDGED' | 'RELEASED' | 'LIQUIDATED';
}

export interface LoanAccount {
  loanId: string;
  applicationId: string;
  memberId: string;
  disbursedAmount: number;
  outstandingPrincipal: number;
  outstandingInterest: number;
  outstandingPenalties: number;
  status: 'ACTIVE' | 'ARREARS' | 'DEFAULT' | 'WRITTEN_OFF' | 'CLOSED';
  parDays: number; // Portfolio At Risk days
}
