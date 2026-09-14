/**
 * JUMO DIGITAL PAY
 * Sovereign Payment Switch & Multi-Rail Gateway Types
 * Authority: JUMO UEOS Architecture V2.0
 */

export type PaymentRail =
  | "MTN_MOMO"
  | "AIRTEL_MONEY"
  | "MPESA"
  | "BANK_EFT"
  | "BANK_RTGS"
  | "VISA_MASTERCARD"
  | "DYNAMIC_QR"
  | "INTERNAL_WALLET"
  | "AGENCY_CASH";

export type PaymentDomain =
  | "TUITION_EDUCATION"
  | "HEALTH_CLINICAL"
  | "COMMUNITY_SACCO"
  | "FAITH_BENEVOLENCE"
  | "SUPPLIER_PROCUREMENT"
  | "UTILITY_RECHARGE"
  | "INSTITUTIONAL_FEES";

export type SwitchTransactionStatus =
  | "INITIATED"
  | "ROUTED"
  | "AUTHORIZED"
  | "SETTLED"
  | "FAILED"
  | "REVERSED"
  | "OFFLINE_QUEUED";

export interface SovereignPayCode {
  payCode: string; // e.g., "PAY-SCH-7721", "PAY-MED-9901"
  institutionName: string;
  domain: PaymentDomain;
  defaultCurrency: string;
  active: boolean;
  settlementAccountId: string;
  allowedRails: PaymentRail[];
  splitConfig: {
    platformFeeRate: number; // 0.015 (1.5%)
    merchantNetRate: number; // 0.985 (98.5%)
  };
}

export interface UniversalPaymentRequest {
  idempotencyKey: string;
  payCode: string;
  amount: number;
  currency: string;
  rail: PaymentRail;
  payerName: string;
  payerPhoneOrAccount: string;
  narrative: string;
  metadata?: Record<string, unknown>;
}

export interface PaymentSwitchReceipt {
  transactionId: string;
  publicReference: string;
  payCode: string;
  institutionName: string;
  domain: PaymentDomain;
  rail: PaymentRail;
  grossAmount: number;
  platformFee: number;
  merchantNetAmount: number;
  currency: string;
  status: SwitchTransactionStatus;
  faapJournalRef?: string;
  timestamp: string;
  isDuplicate: boolean;
  isOfflineQueued: boolean;
}

export interface SettlementReconciliationBatch {
  batchId: string;
  date: string;
  totalTransactions: number;
  totalGrossVolume: number;
  totalPlatformFees: number;
  totalMerchantNetSettled: number;
  status: "BALANCED_SETTLED" | "VARIANCE_FLAGGED" | "PENDING_FAAP_SYNC";
  faapBatchRef: string;
}
