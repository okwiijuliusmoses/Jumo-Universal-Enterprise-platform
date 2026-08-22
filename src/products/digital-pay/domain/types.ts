/**
 * JUMO DIGITAL PAY — Sovereign Domain Types
 */

export interface DigitalPayReference {
  id: string;
  reference: string;
  payerId: string;
  payerName: string;
  merchantCode: string;
  totalAmount: number;
  balanceDue: number;
  expiryDate: string;
  status: 'ACTIVE' | 'EXPIRED' | 'PAID';
}

export interface DigitalPayTransaction {
  id: string;
  transactionRef: string;
  reference: string;
  amount: number;
  channel: 'MOBILE_MONEY' | 'BANK_TRANSFER' | 'CARD' | 'WALLET';
  paymentDate: string;
  status: 'SUCCESS' | 'FAILED' | 'PENDING' | 'REVERSED';
  metadata?: Record<string, any>;
}

export interface DigitalPaySettlementBatch {
  id: string;
  batchRef: string;
  collectionDate: string;
  totalGross: number;
  commissionAmount: number; // 1.5% fixed fee
  netSettlement: number;
  status: 'PROCESSING' | 'SETTLED' | 'RECONCILING';
}

export interface DigitalPayReconciliationQuery {
  id: string;
  transactionId: string;
  issueType: 'MISSING_IN_BANK' | 'DUPLICATE_CALLBACK' | 'AMOUNT_MISMATCH';
  severity: 'HIGH' | 'MEDIUM' | 'LOW';
  status: 'OPEN' | 'RESOLVED';
}
