import { 
  FinancialIdentity, 
  KYCVerificationRequest 
} from '../domain/Identity';

export interface IdentityService {
  /**
   * Retrieves the financial identity profile for a user
   */
  getIdentity(userId: string, tenantId: string): Promise<FinancialIdentity | null>;

  /**
   * Submits a document for KYC verification
   */
  submitKYCDocument(request: KYCVerificationRequest): Promise<FinancialIdentity>;

  /**
   * Evaluates and updates the risk score for an identity
   */
  evaluateRisk(identityId: string): Promise<number>;
  
  /**
   * Checks if an identity meets the requirements for a specific tier
   */
  checkTierEligibility(identityId: string, targetTier: string): Promise<boolean>;
}
