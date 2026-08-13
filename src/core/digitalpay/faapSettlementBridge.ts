/**
 * JUMO DIGITAL PAY
 * Phase 3 — FAAP Settlement Bridge
 *
 * Purpose:
 *   Digital Pay settlement
 *          ↓
 *   Accounting event
 *          ↓
 *   FAAP
 *
 * No manual journal-entry requirement for normal
 * Digital Pay settlements.
 *
 * IMPORTANT:
 * This bridge does not bypass FAAP controls.
 * FAAP remains the accounting authority.
 */

import type {
  PaymentTransaction,
} from "./paymentTransactionService";

export type FAAPSettlementStatus =
  | "READY"
  | "POSTED"
  | "PENDING"
  | "FAILED"
  | "RECONCILIATION_REQUIRED";

export interface FAAPSettlementEvent {
  settlementId: string;

  transactionId: string;
  publicReference: string;

  amount: number;
  currency: string;

  debitAccount: string;
  creditAccount: string;

  feeAmount: number;

  status: FAAPSettlementStatus;

  source:
    | "DIGITAL_PAY"
    | "MERCHANT"
    | "SCHOOL"
    | "INSTITUTION"
    | "AGENT"
    | "ERP"
    | "BANK"
    | "LOAN";

  createdAt: string;
  postedAt?: string;

  error?: string;
}

export interface SettlementSummary {
  total: number;
  ready: number;
  posted: number;
  pending: number;
  failed: number;
  reconciliationRequired: number;
}

class FAAPSettlementBridge {
  private readonly settlements =
    new Map<string, FAAPSettlementEvent>();

  /**
   * Creates an accounting settlement event.
   *
   * Account mapping is intentionally supplied by
   * the FAAP configuration layer rather than being
   * hard-coded into Digital Pay.
   */
  createSettlement(
    transaction: PaymentTransaction,
    accounts: {
      debitAccount: string;
      creditAccount: string;
    },
    source: FAAPSettlementEvent["source"]
  ): FAAPSettlementEvent {
    if (!accounts.debitAccount) {
      throw new Error(
        "FAAP settlement: debit account is required"
      );
    }

    if (!accounts.creditAccount) {
      throw new Error(
        "FAAP settlement: credit account is required"
      );
    }

    const settlementId =
      `SET_${Date.now()}_${Math.random()
        .toString(36)
        .slice(2, 9)
        .toUpperCase()}`;

    const event: FAAPSettlementEvent = {
      settlementId,

      transactionId:
        transaction.transactionId,

      publicReference:
        transaction.publicReference,

      amount:
        transaction.amount,

      currency:
        transaction.currency,

      debitAccount:
        accounts.debitAccount,

      creditAccount:
        accounts.creditAccount,

      feeAmount:
        transaction.feeAmount,

      status: "READY",

      source,

      createdAt:
        new Date().toISOString(),
    };

    this.settlements.set(
      settlementId,
      event
    );

    return event;
  }

  /**
   * Marks an accounting event as posted by FAAP.
   *
   * The actual FAAP journal writer can consume this
   * event and perform the authoritative posting.
   */
  markPosted(
    settlementId: string
  ): FAAPSettlementEvent | null {
    const settlement =
      this.settlements.get(
        settlementId
      );

    if (!settlement) {
      return null;
    }

    settlement.status = "POSTED";

    settlement.postedAt =
      new Date().toISOString();

    settlement.error =
      undefined;

    return settlement;
  }

  /**
   * Places the settlement in a controlled pending state.
   */
  markPending(
    settlementId: string
  ): FAAPSettlementEvent | null {
    const settlement =
      this.settlements.get(
        settlementId
      );

    if (!settlement) {
      return null;
    }

    settlement.status = "PENDING";

    return settlement;
  }

  /**
   * Records an accounting failure without
   * destroying the original payment event.
   */
  markFailed(
    settlementId: string,
    error: string
  ): FAAPSettlementEvent | null {
    const settlement =
      this.settlements.get(
        settlementId
      );

    if (!settlement) {
      return null;
    }

    settlement.status = "FAILED";
    settlement.error = error;

    return settlement;
  }

  /**
   * Requires controlled reconciliation.
   */
  requireReconciliation(
    settlementId: string,
    reason?: string
  ): FAAPSettlementEvent | null {
    const settlement =
      this.settlements.get(
        settlementId
      );

    if (!settlement) {
      return null;
    }

    settlement.status =
      "RECONCILIATION_REQUIRED";

    settlement.error =
      reason ??
      "Settlement requires reconciliation";

    return settlement;
  }

  /**
   * Retrieves a settlement.
   */
  getSettlement(
    settlementId: string
  ): FAAPSettlementEvent | null {
    return (
      this.settlements.get(
        settlementId
      ) ?? null
    );
  }

  /**
   * Returns events waiting for FAAP posting.
   */
  getReadySettlements():
    FAAPSettlementEvent[] {
    return Array.from(
      this.settlements.values()
    ).filter(
      event =>
        event.status === "READY"
    );
  }

  /**
   * Settlement telemetry.
   */
  getSummary(): SettlementSummary {
    const records =
      Array.from(
        this.settlements.values()
      );

    return {
      total:
        records.length,

      ready:
        records.filter(
          r => r.status === "READY"
        ).length,

      posted:
        records.filter(
          r => r.status === "POSTED"
        ).length,

      pending:
        records.filter(
          r => r.status === "PENDING"
        ).length,

      failed:
        records.filter(
          r => r.status === "FAILED"
        ).length,

      reconciliationRequired:
        records.filter(
          r =>
            r.status ===
            "RECONCILIATION_REQUIRED"
        ).length,
    };
  }
}

export const faapSettlementBridge =
  new FAAPSettlementBridge();

export default faapSettlementBridge;
