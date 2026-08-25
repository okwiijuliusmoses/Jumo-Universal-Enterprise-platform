import { 
  PaymentIntent, 
  PaymentRequest, 
  PaymentResponse 
} from '../domain/PaymentGateway';

export interface PaymentGatewayService {
  /**
   * Initializes a payment intent with an external provider
   */
  initializePayment(request: PaymentRequest): Promise<PaymentResponse>;

  /**
   * Verifies the status of a payment intent
   */
  verifyPayment(intentId: string): Promise<PaymentIntent>;

  /**
   * Processes a webhook from a provider
   */
  handleWebhook(provider: string, payload: any, signature: string): Promise<void>;
  
  /**
   * Refunds a captured payment
   */
  refundPayment(intentId: string, amount?: number): Promise<PaymentIntent>;
}
