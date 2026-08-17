/**
 * JUMO DIGITAL PAY
 * Phase 3 — Idempotency, Duplicate Protection & Reconciliation
 *
 * Guarantees:
 * - Same request cannot create duplicate transactions.
 * - Offline retries can safely be replayed.
 * - Public payment references remain distinct from
 *   confidential internal identities.
 * - Settlement reconciliation can identify mismatches.
 */

import type {
  PaymentTransaction,
} from "./paymentTransactionService";

export interface IdempotencyRecord {
  key: string;
  transactionId: string;
  publicReference: string;
  createdAt: string;
}

export interface ReconciliationRecord {
  reconciliationId: string;
  transactionId: string;
  publicReference: string;

  expectedAmount: number;
  actualAmount: number;
  currency: string;

  status:
    | "MATCHED"
    | "MISMATCH"
    | "PENDING";

  difference: number;

  createdAt: string;
}

export interface ReconciliationSummary {
  total: number;
  matched: number;
  mismatched: number;
  pending: number;
}

class ReconciliationService {
  private readonly idempotency =
    new Map<string, IdempotencyRecord>();

  private readonly reconciliations =
    new Map<string, ReconciliationRecord>();

  /**
   * Registers a request idempotency key.
   *
   * If the key already exists, the original transaction
   * is returned instead of creating another payment.
   */
  registerIdempotency(
    key: string,
    transaction: PaymentTransaction
  ): IdempotencyRecord {
    if (!key.trim()) {
      throw new Error(
        "Digital Pay: idempotency key is required"
      );
    }

    const existing =
      this.idempotency.get(key);

    if (existing) {
      return existing;
    }

    const record: IdempotencyRecord = {
      key,

      transactionId:
        transaction.transactionId,

      publicReference:
        transaction.publicReference,

      createdAt:
        new Date().toISOString(),
    };

    this.idempotency.set(
      key,
      record
    );

    return record;
  }

  /**
   * Finds the original transaction associated
   * with a retry key.
   */
  findByIdempotencyKey(
    key: string
  ): IdempotencyRecord | null {
    return (
      this.idempotency.get(key) ??
      null
    );
  }

  /**
   * Builds a reconciliation record between
   * the expected Digital Pay amount and the
   * amount reported by a payment rail.
   */
  reconcile(
    transaction: PaymentTransaction,
    actualAmount: number
  ): ReconciliationRecord {
    const difference = Number(
      (
        actualAmount -
        transaction.amount
      ).toFixed(2)
    );

    const status =
      difference === 0
        ? "MATCHED"
        : "MISMATCH";

    const record: ReconciliationRecord = {
      reconciliationId:
        `REC_${Date.now()}_${Math.random()
          .toString(36)
          .slice(2, 8)
          .toUpperCase()}`,

      transactionId:
        transaction.transactionId,

      publicReference:
        transaction.publicReference,

      expectedAmount:
        transaction.amount,

      actualAmount,

      currency:
        transaction.currency,

      status,

      difference,

      createdAt:
        new Date().toISOString(),
    };

    this.reconciliations.set(
      record.reconciliationId,
      record
    );

    return record;
  }

  /**
   * Marks a reconciliation as pending.
   */
  markPending(
    reconciliationId: string
  ): ReconciliationRecord | null {
    const record =
      this.reconciliations.get(
        reconciliationId
      );

    if (!record) {
      return null;
    }

    record.status = "PENDING";

    return record;
  }

  /**
   * Returns reconciliation summary.
   */
  getSummary(): ReconciliationSummary {
    const records =
      Array.from(
        this.reconciliations.values()
      );

    return {
      total: records.length,

      matched:
        records.filter(
          r => r.status === "MATCHED"
        ).length,

      mismatched:
        records.filter(
          r => r.status === "MISMATCH"
        ).length,

      pending:
        records.filter(
          r => r.status === "PENDING"
        ).length,
    };
  }

  /**
   * Gets a reconciliation record internally.
   */
  getReconciliation(
    reconciliationId: string
  ): ReconciliationRecord | null {
    return (
      this.reconciliations.get(
        reconciliationId
      ) ?? null
    );
  }

  /**
   * Returns only safe public reconciliation data.
   */
  getPublicReconciliation(
    reconciliationId: string
  ): {
    publicReference: string;
    expectedAmount: number;
    actualAmount: number;
    currency: string;
    status:
      | "MATCHED"
      | "MISMATCH"
      | "PENDING";
    difference: number;
  } | null {
    const record =
      this.reconciliations.get(
        reconciliationId
      );

    if (!record) {
      return null;
    }

    return {
      publicReference:
        record.publicReference,

      expectedAmount:
        record.expectedAmount,

      actualAmount:
        record.actualAmount,

      currency:
        record.currency,

      status:
        record.status,

      difference:
        record.difference,
    };
  }
}

export const reconciliationService =
  new ReconciliationService();

export default reconciliationService;
