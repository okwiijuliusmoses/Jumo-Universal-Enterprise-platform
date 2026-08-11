/**
 * JUMO DIGITAL PAY
 * Reconciliation & Transaction Status Service
 *
 * Central lifecycle tracking for Digital Pay.
 *
 * Payment lifecycle:
 *
 * CREATED
 *   ↓
 * AUTHORIZED
 *   ↓
 * PROCESSING
 *   ↓
 * SETTLED
 *
 * Or:
 *
 * FAILED / REVERSED
 *
 * Public references are safe to expose.
 * Internal account and identity IDs remain private.
 */

export type PaymentLifecycleStatus =
  | "CREATED"
  | "AUTHORIZED"
  | "PROCESSING"
  | "SETTLED"
  | "FAILED"
  | "REVERSED";

export interface PaymentRecord {
  transactionId: string;

  publicReference: string;

  paymentCode: string;

  amount: number;

  currency: string;

  productType: string;

  status:
    PaymentLifecycleStatus;

  createdAt: string;

  updatedAt: string;

  failureReason?: string;

  reversalReason?: string;

  settlementReference?: string;
}

export interface ReconciliationEntry {
  reconciliationId: string;

  transactionId: string;

  publicReference: string;

  expectedAmount: number;

  settledAmount: number;

  variance: number;

  currency: string;

  status:
    | "MATCHED"
    | "VARIANCE"
    | "PENDING";

  reconciledAt?: string;
}

class PaymentReconciliationService {
  private readonly payments =
    new Map<
      string,
      PaymentRecord
    >();

  private readonly reconciliations =
    new Map<
      string,
      ReconciliationEntry
    >();

  /**
   * Register a payment.
   */
  registerPayment(
    input: {
      transactionId: string;

      publicReference: string;

      paymentCode: string;

      amount: number;

      currency: string;

      productType: string;
    }
  ) {
    if (
      this.payments.has(
        input.transactionId
      )
    ) {
      return this.payments.get(
        input.transactionId
      )!;
    }

    const now =
      new Date().toISOString();

    const record:
      PaymentRecord = {
      transactionId:
        input.transactionId,

      publicReference:
        input.publicReference,

      paymentCode:
        input.paymentCode,

      amount:
        input.amount,

      currency:
        input.currency,

      productType:
        input.productType,

      status:
        "CREATED",

      createdAt:
        now,

      updatedAt:
        now,
    };

    this.payments.set(
      input.transactionId,
      record
    );

    return record;
  }

  /**
   * Advance transaction status.
   */
  updateStatus(
    transactionId: string,
    status:
      PaymentLifecycleStatus,
    details?: {
      failureReason?: string;

      reversalReason?: string;

      settlementReference?: string;
    }
  ) {
    const payment =
      this.payments.get(
        transactionId
      );

    if (!payment) {
      throw new Error(
        "Digital Pay: transaction not found"
      );
    }

    this.assertValidTransition(
      payment.status,
      status
    );

    payment.status =
      status;

    payment.updatedAt =
      new Date().toISOString();

    if (
      details?.failureReason
    ) {
      payment.failureReason =
        details.failureReason;
    }

    if (
      details?.reversalReason
    ) {
      payment.reversalReason =
        details.reversalReason;
    }

    if (
      details?.settlementReference
    ) {
      payment.settlementReference =
        details.settlementReference;
    }

    return payment;
  }

  /**
   * Reconcile a settled transaction.
   */
  reconcile(
    input: {
      transactionId: string;

      settledAmount: number;
    }
  ): ReconciliationEntry {
    const payment =
      this.payments.get(
        input.transactionId
      );

    if (!payment) {
      throw new Error(
        "Digital Pay: transaction not found"
      );
    }

    const variance =
      Number(
        (
          payment.amount -
          input.settledAmount
        ).toFixed(2)
      );

    const entry:
      ReconciliationEntry = {
      reconciliationId:
        `REC-${Date.now()}-${Math.random()
          .toString(36)
          .slice(2, 8)
          .toUpperCase()}`,

      transactionId:
        payment.transactionId,

      publicReference:
        payment.publicReference,

      expectedAmount:
        payment.amount,

      settledAmount:
        input.settledAmount,

      variance,

      currency:
        payment.currency,

      status:
        variance === 0
          ? "MATCHED"
          : "VARIANCE",

      reconciledAt:
        new Date().toISOString(),
    };

    this.reconciliations.set(
      entry.reconciliationId,
      entry
    );

    return entry;
  }

  /**
   * Retrieve a payment by internal transaction ID.
   *
   * Internal runtime only.
   */
  getInternalPayment(
    transactionId: string
  ) {
    return (
      this.payments.get(
        transactionId
      ) ?? null
    );
  }

  /**
   * Public-safe payment lookup.
   */
  getPublicPayment(
    publicReference: string
  ) {
    const payment =
      Array.from(
        this.payments.values()
      ).find(
        item =>
          item.publicReference ===
          publicReference
      );

    if (!payment) {
      return null;
    }

    return {
      publicReference:
        payment.publicReference,

      paymentCode:
        payment.paymentCode,

      amount:
        payment.amount,

      currency:
        payment.currency,

      status:
        payment.status,

      createdAt:
        payment.createdAt,

      updatedAt:
        payment.updatedAt,

      settlementReference:
        payment.settlementReference,
    };
  }

  /**
   * Validate lifecycle transitions.
   */
  private assertValidTransition(
    current:
      PaymentLifecycleStatus,
    next:
      PaymentLifecycleStatus
  ) {
    const transitions:
      Record<
        PaymentLifecycleStatus,
        PaymentLifecycleStatus[]
      > = {
      CREATED: [
        "AUTHORIZED",
        "FAILED",
      ],

      AUTHORIZED: [
        "PROCESSING",
        "FAILED",
      ],

      PROCESSING: [
        "SETTLED",
        "FAILED",
      ],

      SETTLED: [
        "REVERSED",
      ],

      FAILED: [],

      REVERSED: [],
    };

    if (
      current === next
    ) {
      return;
    }

    if (
      !transitions[
        current
      ].includes(next)
    ) {
      throw new Error(
        `Digital Pay: invalid payment transition ${current} -> ${next}`
      );
    }
  }

  /**
   * Internal reconciliation summary.
   */
  getSummary() {
    const payments =
      Array.from(
        this.payments.values()
      );

    const reconciliations =
      Array.from(
        this.reconciliations.values()
      );

    return {
      transactions:
        payments.length,

      created:
        payments.filter(
          p =>
            p.status ===
            "CREATED"
        ).length,

      authorized:
        payments.filter(
          p =>
            p.status ===
            "AUTHORIZED"
        ).length,

      processing:
        payments.filter(
          p =>
            p.status ===
            "PROCESSING"
        ).length,

      settled:
        payments.filter(
          p =>
            p.status ===
            "SETTLED"
        ).length,

      failed:
        payments.filter(
          p =>
            p.status ===
            "FAILED"
        ).length,

      reversed:
        payments.filter(
          p =>
            p.status ===
            "REVERSED"
        ).length,

      matched:
        reconciliations.filter(
          r =>
            r.status ===
            "MATCHED"
        ).length,

      variances:
        reconciliations.filter(
          r =>
            r.status ===
            "VARIANCE"
        ).length,
    };
  }
}

export const paymentReconciliationService =
  new PaymentReconciliationService();

export default paymentReconciliationService;
