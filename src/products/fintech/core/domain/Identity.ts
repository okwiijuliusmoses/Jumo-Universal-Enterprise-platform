export type VerificationLevel = 'TIER_0' | 'TIER_1' | 'TIER_2' | 'TIER_3';
export type KYCStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'EXPIRED';

export interface FinancialIdentity {
  id: string;
  userId: string;
  tenantId: string;
  verificationLevel: VerificationLevel;
  kycStatus: KYCStatus;
  documents: KYCDocument[];
  riskScore: number;
  lastScreenedAt: string;
}

export interface KYCDocument {
  id: string;
  type: 'PASSPORT' | 'NATIONAL_ID' | 'DRIVERS_LICENSE' | 'UTILITY_BILL';
  status: 'UPLOADED' | 'VERIFIED' | 'REJECTED';
  verifiedAt?: string;
  expiryDate?: string;
}

export interface KYCVerificationRequest {
  userId: string;
  tenantId: string;
  documentType: string;
  documentUrl: string;
}
