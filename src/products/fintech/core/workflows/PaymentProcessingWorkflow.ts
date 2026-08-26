import { PaymentRequest, PaymentIntent, PaymentResponse } from '../domain/PaymentGateway';
import { PaymentGatewayService } from '../services/PaymentGatewayService';
import { LedgerService } from '../services/LedgerService';

export class PaymentProcessingWorkflow {
  constructor(
    private paymentGateway: PaymentGatewayService,
    private ledgerService: LedgerService
  ) {}

  async execute(request: PaymentRequest): Promise<PaymentResponse> {
    // 1. Initialize intent with provider
    const response = await this.paymentGateway.initializePayment(request);
    
    // We defer ledger posting until the webhook confirms CAPTURED status.
    // The webhook handler will call the LedgerService to post the transaction.
    return response;
  }
}
