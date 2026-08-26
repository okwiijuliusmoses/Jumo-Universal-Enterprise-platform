export type PaymentStatus = 'PENDING' | 'AUTHORIZED' | 'CAPTURED' | 'FAILED' | 'REFUNDED';
export type PaymentMethodType = 'CARD' | 'MOBILE_MONEY' | 'BANK_TRANSFER' | 'CRYPTO';

export interface PaymentIntent {
  id: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  method: PaymentMethodType;
  provider: string; // e.g., 'STRIPE', 'MPESA', 'FLUTTERWAVE'
  tenantId: string;
  customerId: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PaymentRequest {
  amount: number;
  currency: string;
  method: PaymentMethodType;
  provider: string;
  tenantId: string;
  customerId: string;
  description?: string;
  returnUrl?: string;
}

export interface PaymentResponse {
  intentId: string;
  status: PaymentStatus;
  clientSecret?: string;
  redirectUrl?: string;
  providerData?: any;
}
