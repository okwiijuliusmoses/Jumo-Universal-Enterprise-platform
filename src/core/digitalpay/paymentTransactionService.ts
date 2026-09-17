/**
 * JUMO DIGITAL PAY
 * Phase 3 — Universal Payment Transaction Orchestration
 *
 * One transaction fabric for:
 * - Merchant payments
 * - School / institutional payments
 * - Agent banking
 * - Mobile money agents
 * - QR / payment-code transactions
 * - Wallet transfers
 * - Service-fee deductions
 * - Loan disbursement and repayment
 * - Banking transactions
 * - ERP / commercial-product payments
 *
 * Internal routing identities remain confidential.
 * Public payment references expose only the approved public reference.
 */

export type PaymentTransactionType =
  | "MERCHANT_PAYMENT"
  | "INSTITUTION_PAYMENT"
  | "SCHOOL_PAYMENT"
  | "AGENT_DEPOSIT"
  | "AGENT_WITHDRAWAL"
  | "WALLET_TRANSFER"
  | "QR_PAYMENT"
  | "CODE_PAYMENT"
  | "SERVICE_FEE"
  | "LOAN_DISBURSEMENT"
  | "LOAN_REPAYMENT"
  | "BANK_TRANSFER"
  | "BILL_PAYMENT"
  | "ERP_PAYMENT";

export type PaymentChannel =
  | "MOBILE_MONEY"
  | "BANK"
  | "CARD"
  | "QR"
  | "PAYMENT_CODE"
  | "WALLET"
  | "AGENT"
  | "OFFLINE_QUEUE";

export type PaymentStatus =
  | "CREATED"
  | "QUEUED"
  | "PROCESSING"
  | "AUTHORIZED"
  | "SETTLED"
  | "FAILED"
  | "REVERSED";

export interface PaymentTransactionRequest {
  type: PaymentTransactionType;
  channel: PaymentChannel;

  /**
   * Public payee code only.
   * Never place platform/tenant/institution IDs here.
   */
  payeeCode: string;

  amount: number;
  currency: string;

  payerReference?: string;
  description?: string;

  /**
   * Internal-only routing context.
   */
  platformIdentity?: string;
  tenantIdentity?: string;
  templateIdentity?: string;
  institutionIdentity?: string;

  metadata?: Record<string, unknown>;
}

export interface PaymentTransaction {
  transactionId: string;
  publicReference: string;

  type: PaymentTransactionType;
  channel: PaymentChannel;

  payeeCode: string;

  amount: number;
  currency: string;

  status: PaymentStatus;

  feeAmount: number;
  netAmount: number;

  createdAt: string;
  updatedAt: string;

  metadata?: Record<string, unknown>;
}

const SUPPORTED_CURRENCIES = new Set([
  "UGX",
  "USD",
  "EUR",
  "GBP",
  "KES",
  "TZS",
  "RWF",
  "ZMW",
  "ZAR",
  "NGN",
  "GHS",
]);

const SERVICE_FEE_RATE = 0.005;

function internalId(prefix: string): string {
  return `${prefix}_${Date.now()}_${Math.random()
    .toString(36)
    .slice(2, 10)
    .toUpperCase()}`;
}

function publicReference(): string {
  const value = Math.floor(
    1000000000 + Math.random() * 9000000000
  );

  return value.toString();
}

class PaymentTransactionService {
  private readonly transactions =
    new Map<string, PaymentTransaction>();

  /**
   * Creates a universal payment transaction.
   */
  createTransaction(
    request: PaymentTransactionRequest
  ): PaymentTransaction {
    if (!request.payeeCode) {
      throw new Error(
        "Digital Pay: payee payment code is required"
      );
    }

    if (!/^\d{10}$/.test(request.payeeCode)) {
      throw new Error(
        "Digital Pay: payee code must contain exactly 10 digits"
      );
    }

    if (!Number.isFinite(request.amount) || request.amount <= 0) {
      throw new Error(
        "Digital Pay: transaction amount must be greater than zero"
      );
    }

    if (!SUPPORTED_CURRENCIES.has(request.currency)) {
      throw new Error(
        `Digital Pay: unsupported currency ${request.currency}`
      );
    }

    const transactionId = internalId("TXN");

    const feeAmount = Number(
      (request.amount * SERVICE_FEE_RATE).toFixed(2)
    );

    const netAmount = Number(
      (request.amount - feeAmount).toFixed(2)
    );

    const now = new Date().toISOString();

    const transaction: PaymentTransaction = {
      transactionId,

      /*
       * Public reference is intentionally independent
       * from all confidential architecture identifiers.
       */
      publicReference: publicReference(),

      type: request.type,
      channel: request.channel,

      payeeCode: request.payeeCode,

      amount: request.amount,
      currency: request.currency,

      status: "CREATED",

      feeAmount,
      netAmount,

      createdAt: now,
      updatedAt: now,

      metadata: request.metadata,
    };

    this.transactions.set(transactionId, transaction);

    return transaction;
  }

  queueTransaction(
    transactionId: string
  ): PaymentTransaction | null {
    const transaction = this.transactions.get(transactionId);

    if (!transaction) {
      return null;
    }

    transaction.status = "QUEUED";
    transaction.updatedAt = new Date().toISOString();

    return transaction;
  }

  processTransaction(
    transactionId: string
  ): PaymentTransaction | null {
    const transaction = this.transactions.get(transactionId);

    if (!transaction) {
      return null;
    }

    transaction.status = "PROCESSING";
    transaction.updatedAt = new Date().toISOString();

    return transaction;
  }

  authorizeTransaction(
    transactionId: string
  ): PaymentTransaction | null {
    const transaction = this.transactions.get(transactionId);

    if (!transaction) {
      return null;
    }

    transaction.status = "AUTHORIZED";
    transaction.updatedAt = new Date().toISOString();

    return transaction;
  }

  settleTransaction(
    transactionId: string
  ): PaymentTransaction | null {
    const transaction = this.transactions.get(transactionId);

    if (!transaction) {
      return null;
    }

    transaction.status = "SETTLED";
    transaction.updatedAt = new Date().toISOString();

    return transaction;
  }

  failTransaction(
    transactionId: string
  ): PaymentTransaction | null {
    const transaction = this.transactions.get(transactionId);

    if (!transaction) {
      return null;
    }

    transaction.status = "FAILED";
    transaction.updatedAt = new Date().toISOString();

    return transaction;
  }

  reverseTransaction(
    transactionId: string
  ): PaymentTransaction | null {
    const transaction = this.transactions.get(transactionId);

    if (!transaction) {
      return null;
    }

    if (transaction.status !== "SETTLED") {
      throw new Error(
        "Digital Pay: only settled transactions may be reversed"
      );
    }

    transaction.status = "REVERSED";
    transaction.updatedAt = new Date().toISOString();

    return transaction;
  }

  getTransaction(
    transactionId: string
  ): PaymentTransaction | null {
    return this.transactions.get(transactionId) ?? null;
  }

  getPublicTransaction(
    transactionId: string
  ): Omit<
    PaymentTransaction,
    "transactionId"
  > | null {
    const transaction = this.transactions.get(transactionId);

    if (!transaction) {
      return null;
    }

    /*
     * Never expose the internal transaction ID.
     */
    const {
      transactionId: _internalId,
      ...publicTransaction
    } = transaction;

    return publicTransaction;
  }
}

export const paymentTransactionService =
  new PaymentTransactionService();

export default paymentTransactionService;
