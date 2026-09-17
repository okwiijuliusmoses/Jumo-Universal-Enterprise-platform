/**
 * JUMO DIGITAL PAY
 * Phase 3 — Hybrid Offline Transaction & Synchronization Engine
 *
 * Design:
 * Online:
 *   Client → Digital Pay → Payment Rail → FAAP
 *
 * Offline:
 *   Client → Local Secure Queue
 *          → Local validation
 *          → Pending synchronization
 *          → Digital Pay
 *          → Payment Rail
 *          → FAAP
 *
 * No internal platform, tenant, template or institution
 * identifiers are exposed in public payment references.
 */

import type {
  PaymentTransaction,
} from "./paymentTransactionService";

export type SyncState =
  | "LOCAL_PENDING"
  | "SYNCING"
  | "SYNCED"
  | "CONFLICT"
  | "FAILED";

export interface HybridPaymentRecord {
  localId: string;
  transactionId: string;
  publicReference: string;

  state: SyncState;

  attempts: number;

  createdAt: string;
  updatedAt: string;

  lastError?: string;
}

export interface SyncSummary {
  total: number;
  pending: number;
  syncing: number;
  synced: number;
  conflicts: number;
  failed: number;
}

function internalId(prefix: string): string {
  return `${prefix}_${Date.now()}_${Math.random()
    .toString(36)
    .slice(2, 10)
    .toUpperCase()}`;
}

class HybridSyncService {
  private readonly queue =
    new Map<string, HybridPaymentRecord>();

  /**
   * Adds a transaction to the local hybrid queue.
   */
  enqueue(
    transaction: PaymentTransaction
  ): HybridPaymentRecord {
    const existing =
      Array.from(this.queue.values()).find(
        record =>
          record.transactionId ===
          transaction.transactionId
      );

    if (existing) {
      return existing;
    }

    const now =
      new Date().toISOString();

    const record: HybridPaymentRecord = {
      localId: internalId("LOCAL"),

      transactionId:
        transaction.transactionId,

      publicReference:
        transaction.publicReference,

      state: "LOCAL_PENDING",

      attempts: 0,

      createdAt: now,
      updatedAt: now,
    };

    this.queue.set(
      record.localId,
      record
    );

    return record;
  }

  /**
   * Begins synchronization.
   */
  beginSync(
    localId: string
  ): HybridPaymentRecord | null {
    const record =
      this.queue.get(localId);

    if (!record) {
      return null;
    }

    if (
      record.state === "SYNCED"
    ) {
      return record;
    }

    record.state = "SYNCING";
    record.attempts += 1;
    record.updatedAt =
      new Date().toISOString();

    return record;
  }

  /**
   * Marks a local transaction successfully
   * synchronized with the central runtime.
   */
  markSynced(
    localId: string
  ): HybridPaymentRecord | null {
    const record =
      this.queue.get(localId);

    if (!record) {
      return null;
    }

    record.state = "SYNCED";
    record.lastError = undefined;
    record.updatedAt =
      new Date().toISOString();

    return record;
  }

  /**
   * Records a synchronization failure.
   */
  markFailed(
    localId: string,
    error: string
  ): HybridPaymentRecord | null {
    const record =
      this.queue.get(localId);

    if (!record) {
      return null;
    }

    record.state = "FAILED";
    record.lastError = error;
    record.updatedAt =
      new Date().toISOString();

    return record;
  }

  /**
   * Marks a transaction as requiring
   * reconciliation before synchronization.
   */
  markConflict(
    localId: string,
    reason: string
  ): HybridPaymentRecord | null {
    const record =
      this.queue.get(localId);

    if (!record) {
      return null;
    }

    record.state = "CONFLICT";
    record.lastError = reason;
    record.updatedAt =
      new Date().toISOString();

    return record;
  }

  /**
   * Retry failed synchronization.
   */
  retry(
    localId: string
  ): HybridPaymentRecord | null {
    const record =
      this.queue.get(localId);

    if (!record) {
      return null;
    }

    if (
      record.state !== "FAILED" &&
      record.state !== "CONFLICT"
    ) {
      return record;
    }

    record.state = "LOCAL_PENDING";
    record.lastError = undefined;
    record.updatedAt =
      new Date().toISOString();

    return record;
  }

  /**
   * Return synchronization statistics.
   */
  getSummary(): SyncSummary {
    const records =
      Array.from(this.queue.values());

    return {
      total: records.length,

      pending:
        records.filter(
          r => r.state === "LOCAL_PENDING"
        ).length,

      syncing:
        records.filter(
          r => r.state === "SYNCING"
        ).length,

      synced:
        records.filter(
          r => r.state === "SYNCED"
        ).length,

      conflicts:
        records.filter(
          r => r.state === "CONFLICT"
        ).length,

      failed:
        records.filter(
          r => r.state === "FAILED"
        ).length,
    };
  }

  /**
   * Get pending records for a synchronization worker.
   */
  getPendingRecords(): HybridPaymentRecord[] {
    return Array.from(
      this.queue.values()
    ).filter(
      record =>
        record.state ===
        "LOCAL_PENDING"
    );
  }

  /**
   * Internal queue inspection.
   */
  getRecord(
    localId: string
  ): HybridPaymentRecord | null {
    return (
      this.queue.get(localId) ??
      null
    );
  }
}

export const hybridSyncService =
  new HybridSyncService();

export default hybridSyncService;
