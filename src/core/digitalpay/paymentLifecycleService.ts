/**
 * JUMO DIGITAL PAY
 * Phase 4 — Automated Payment Lifecycle
 *
 * Handles payment creation, validation, routing,
 * settlement, reconciliation and failure states.
 *
 * No manual paperwork is required by the runtime.
 */

export type PaymentLifecycleState =
  | "CREATED"
  | "VALIDATED"
  | "ROUTING"
  | "PROCESSING"
  | "SETTLEMENT_PENDING"
  | "SETTLED"
  | "RECONCILIATION_PENDING"
  | "RECONCILED"
  | "FAILED"
  | "REVERSED";

export type PaymentRail =
  | "MOBILE_MONEY"
  | "BANK_TRANSFER"
  | "CARD"
  | "QR"
  | "WALLET"
  | "INTERNAL";

export type PaymentRequest = {
  paymentId: string;
  payeeCode: string;
  tenantId: string;
  amount: number;
  currency: string;
  rail: PaymentRail;
  reference?: string;
  createdAt: string;
};

export type PaymentRecord =
  PaymentRequest & {
    state: PaymentLifecycleState;
    updatedAt: string;
    settlementReference?: string;
    reconciliationReference?: string;
    failureReason?: string;
  };

const VALID_TRANSITIONS: Record<
  PaymentLifecycleState,
  PaymentLifecycleState[]
> = {
  CREATED: ["VALIDATED", "FAILED"],
  VALIDATED: ["ROUTING", "FAILED"],
  ROUTING: ["PROCESSING", "FAILED"],
  PROCESSING: [
    "SETTLEMENT_PENDING",
    "FAILED",
  ],
  SETTLEMENT_PENDING: [
    "SETTLED",
    "FAILED",
  ],
  SETTLED: [
    "RECONCILIATION_PENDING",
  ],
  RECONCILIATION_PENDING: [
    "RECONCILED",
    "FAILED",
  ],
  RECONCILED: [],
  FAILED: ["REVERSED"],
  REVERSED: [],
};

function now(): string {
  return new Date().toISOString();
}

function assertAmount(amount: number): void {
  if (
    !Number.isFinite(amount) ||
    amount <= 0
  ) {
    throw new Error(
      "Payment amount must be greater than zero.",
    );
  }
}

export class PaymentLifecycleService {
  private readonly payments =
    new Map<string, PaymentRecord>();

  createPayment(
    request: PaymentRequest,
  ): PaymentRecord {
    assertAmount(request.amount);

    if (
      !/^\d{10}$/.test(
        request.payeeCode,
      )
    ) {
      throw new Error(
        "Invalid public payee code.",
      );
    }

    if (
      this.payments.has(
        request.paymentId,
      )
    ) {
      throw new Error(
        "Payment already exists.",
      );
    }

    const payment: PaymentRecord = {
      ...request,
      state: "CREATED",
      updatedAt: now(),
    };

    this.payments.set(
      request.paymentId,
      payment,
    );

    return payment;
  }

  transition(
    paymentId: string,
    nextState: PaymentLifecycleState,
    metadata: {
      settlementReference?: string;
      reconciliationReference?: string;
      failureReason?: string;
    } = {},
  ): PaymentRecord {
    const payment =
      this.payments.get(paymentId);

    if (!payment) {
      throw new Error(
        "Payment not found.",
      );
    }

    const allowed =
      VALID_TRANSITIONS[
        payment.state
      ];

    if (
      !allowed.includes(nextState)
    ) {
      throw new Error(
        `Invalid payment transition: ${payment.state} -> ${nextState}`,
      );
    }

    const updated: PaymentRecord = {
      ...payment,
      ...metadata,
      state: nextState,
      updatedAt: now(),
    };

    this.payments.set(
      paymentId,
      updated,
    );

    return updated;
  }

  validate(
    paymentId: string,
  ): PaymentRecord {
    return this.transition(
      paymentId,
      "VALIDATED",
    );
  }

  route(
    paymentId: string,
  ): PaymentRecord {
    return this.transition(
      paymentId,
      "ROUTING",
    );
  }

  process(
    paymentId: string,
  ): PaymentRecord {
    return this.transition(
      paymentId,
      "PROCESSING",
    );
  }

  settle(
    paymentId: string,
    settlementReference: string,
  ): PaymentRecord {
    return this.transition(
      paymentId,
      "SETTLEMENT_PENDING",
    ).constructor
      ? this.transition(
          paymentId,
          "SETTLED",
          {
            settlementReference,
          },
        )
      : this.get(paymentId);
  }

  beginReconciliation(
    paymentId: string,
  ): PaymentRecord {
    return this.transition(
      paymentId,
      "RECONCILIATION_PENDING",
    );
  }

  reconcile(
    paymentId: string,
    reconciliationReference: string,
  ): PaymentRecord {
    return this.transition(
      paymentId,
      "RECONCILED",
      {
        reconciliationReference,
      },
    );
  }

  fail(
    paymentId: string,
    reason: string,
  ): PaymentRecord {
    return this.transition(
      paymentId,
      "FAILED",
      {
        failureReason: reason,
      },
    );
  }

  reverse(
    paymentId: string,
  ): PaymentRecord {
    return this.transition(
      paymentId,
      "REVERSED",
    );
  }

  get(
    paymentId: string,
  ): PaymentRecord {
    const payment =
      this.payments.get(paymentId);

    if (!payment) {
      throw new Error(
        "Payment not found.",
      );
    }

    return payment;
  }

  list(): PaymentRecord[] {
    return Array.from(
      this.payments.values(),
    );
  }

  pendingReconciliation(): PaymentRecord[] {
    return this.list().filter(
      (payment) =>
        payment.state ===
        "RECONCILIATION_PENDING",
    );
  }
}

export const paymentLifecycleService =
  new PaymentLifecycleService();

export default paymentLifecycleService;
