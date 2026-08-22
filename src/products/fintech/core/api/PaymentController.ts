import { PaymentRequest, PaymentResponse } from '../domain/PaymentGateway';
import { PaymentProcessingWorkflow } from '../workflows/PaymentProcessingWorkflow';

export class PaymentController {
  constructor(private workflow: PaymentProcessingWorkflow) {}

  async processPayment(req: any, res: any) {
    try {
      const request: PaymentRequest = req.body;
      // In a real application, tenantId and customerId would be extracted from the auth context
      
      const response = await this.workflow.execute(request);
      res.status(200).json(response);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}
