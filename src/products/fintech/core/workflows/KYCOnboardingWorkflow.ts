import { KYCVerificationRequest, FinancialIdentity } from '../domain/Identity';
import { IdentityService } from '../services/IdentityService';
import { ComplianceService } from '../services/ComplianceService';

export class KYCOnboardingWorkflow {
  constructor(
    private identityService: IdentityService,
    private complianceService: ComplianceService
  ) {}

  async execute(request: KYCVerificationRequest): Promise<FinancialIdentity> {
    // 1. Submit Document
    const updatedIdentity = await this.identityService.submitKYCDocument(request);
    
    // 2. Evaluate risk score
    await this.identityService.evaluateRisk(updatedIdentity.id);
    
    // 3. Return updated profile
    return this.identityService.getIdentity(updatedIdentity.userId, updatedIdentity.tenantId) as Promise<FinancialIdentity>;
  }
}
