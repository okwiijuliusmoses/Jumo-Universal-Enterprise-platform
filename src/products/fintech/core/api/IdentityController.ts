import { KYCVerificationRequest } from '../domain/Identity';
import { KYCOnboardingWorkflow } from '../workflows/KYCOnboardingWorkflow';

export class IdentityController {
  constructor(private workflow: KYCOnboardingWorkflow) {}

  async submitKYC(req: any, res: any) {
    try {
      const request: KYCVerificationRequest = req.body;
      
      const identity = await this.workflow.execute(request);
      res.status(200).json(identity);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}
