/**
 * JUMO DIGITAL PAY
 * Phase 3 — Settlement, FAAP Bridge & Revenue Allocation
 *
 * Responsibilities:
 * - Automatic settlement after successful payment
 * - Automatic service-fee calculation
 * - Platform revenue allocation
 * - Merchant/institution net settlement
 * - FAAP posting bridge
 * - Reconciliation references
 * - Offline transaction settlement queue
 *
 * Internal platform/tenant/template/institution identities
 * remain confidential and are never exposed as public
 * payment references.
 */

import type {
  PaymentTransaction,
} from "./paymentTransactionService";

export type SettlementDestination =
  | "MERCHANT"
  | "INSTITUTION"
  | "SCHOOL"
  | "AGENT"
  | "PLATFORM"
  | "LOAN_ACCOUNT"
  | "BANK_ACCOUNT"
  | "WALLET";

export interface SettlementAllocation {
  destination: SettlementDestination;
  reference: string;
  amount: number;
  currency: string;
}

export interface FAAPSettlementPosting {
  postingId: string;
  transactionId: string;
  publicReference: string;

  debitAccount: string;
  creditAccount: string;

  amount: number;
  currency: string;

  feeAmount: number;

  status:
    | "PENDING"
    | "POSTED"
    | "FAILED";

  createdAt: string;
}

export interface SettlementResult {
  settlementId: string;
  transactionId: string;
  publicReference: string;

  grossAmount: number;
  feeAmount: number;
  netAmount: number;

  allocations: SettlementAllocation[];

  faapPosting: FAAPSettlementPosting;

  status:
    | "PENDING"
    | "SETTLED"
    | "FAILED";

  settledAt: string;
}

const DEFAULT_PLATFORM_FEE_RATE = 0.005;

function internalId(prefix: string): string {
  return `${prefix}_${Date.now()}_${Math.random()
    .toString(36)
    .slice(2, 10)
    .toUpperCase()}`;
}

class SettlementOrchestrator {
  private readonly settlements =
    new Map<string, SettlementResult>();

  private readonly faapPostings =
    new Map<string, FAAPSettlementPosting>();

  /**
   * Calculates the platform service fee without
   * changing the original payment amount.
   */
  calculateServiceFee(
    amount: number,
    rate = DEFAULT_PLATFORM_FEE_RATE
  ): number {
    if (!Number.isFinite(amount) || amount <= 0) {
      return 0;
    }

    return Number(
      (amount * rate).toFixed(2)
    );
  }

  /**
   * Creates the FAAP bridge posting.
   *
   * This is intentionally an orchestration contract.
   * The actual FAAP runtime remains the authoritative
   * accounting ledger.
   */
  createFAAPPosting(
    transaction: PaymentTransaction,
    debitAccount: string,
    creditAccount: string
  ): FAAPSettlementPosting {
    const posting: FAAPSettlementPosting = {
      postingId: internalId("FAAP_POST"),

      transactionId:
        transaction.transactionId,

      publicReference:
        transaction.publicReference,

      debitAccount,
      creditAccount,

      amount: transaction.netAmount,
      currency: transaction.currency,

      feeAmount: transaction.feeAmount,

      status: "PENDING",

      createdAt:
        new Date().toISOString(),
    };

    this.faapPostings.set(
      posting.postingId,
      posting
    );

    return posting;
  }

  /**
   * Mark a FAAP bridge posting as successfully
   * handed to the accounting runtime.
   */
  markFAAPPosted(
    postingId: string
  ): FAAPSettlementPosting | null {
    const posting =
      this.faapPostings.get(postingId);

    if (!posting) {
      return null;
    }

    posting.status = "POSTED";

    return posting;
  }

  /**
   * Mark a FAAP posting as failed.
   */
  markFAAPFailed(
    postingId: string
  ): FAAPSettlementPosting | null {
    const posting =
      this.faapPostings.get(postingId);

    if (!posting) {
      return null;
    }

    posting.status = "FAILED";

    return posting;
  }

  /**
   * Creates the complete settlement plan.
   */
  createSettlement(
    transaction: PaymentTransaction,
    destination: SettlementDestination,
    destinationReference: string,
    debitAccount: string,
    creditAccount: string
  ): SettlementResult {
    if (transaction.status !== "SETTLED") {
      throw new Error(
        "Digital Pay: transaction must be SETTLED before settlement"
      );
    }

    const feeAmount =
      this.calculateServiceFee(
        transaction.amount
      );

    const netAmount = Number(
      (transaction.amount - feeAmount)
        .toFixed(2)
    );

    const allocations: SettlementAllocation[] = [
      {
        destination,
        reference: destinationReference,
        amount: netAmount,
        currency: transaction.currency,
      },
      {
        destination: "PLATFORM",
        reference: "JUMO_DIGITAL_PAY_REVENUE",
        amount: feeAmount,
        currency: transaction.currency,
      },
    ];

    const faapPosting =
      this.createFAAPPosting(
        transaction,
        debitAccount,
        creditAccount
      );

    const settlement: SettlementResult = {
      settlementId: internalId("SET"),

      transactionId:
        transaction.transactionId,

      publicReference:
        transaction.publicReference,

      grossAmount:
        transaction.amount,

      feeAmount,

      netAmount,

      allocations,

      faapPosting,

      status: "PENDING",

      settledAt:
        new Date().toISOString(),
    };

    this.settlements.set(
      settlement.settlementId,
      settlement
    );

    return settlement;
  }

  /**
   * Completes settlement only after the FAAP
   * bridge confirms successful posting.
   */
  completeSettlement(
    settlementId: string
  ): SettlementResult | null {
    const settlement =
      this.settlements.get(
        settlementId
      );

    if (!settlement) {
      return null;
    }

    const posting =
      this.faapPostings.get(
        settlement.faapPosting.postingId
      );

    if (!posting || posting.status !== "POSTED") {
      throw new Error(
        "Digital Pay: settlement blocked until FAAP posting is confirmed"
      );
    }

    settlement.status = "SETTLED";
    settlement.settledAt =
      new Date().toISOString();

    return settlement;
  }

  /**
   * Retrieves a settlement internally.
   */
  getSettlement(
    settlementId: string
  ): SettlementResult | null {
    return (
      this.settlements.get(
        settlementId
      ) ?? null
    );
  }

  /**
   * Public settlement view.
   *
   * Internal settlement IDs and FAAP posting IDs
   * are deliberately removed.
   */
  getPublicSettlement(
    settlementId: string
  ): Omit<
    SettlementResult,
    "settlementId" | "faapPosting"
  > & {
    faapStatus:
      | "PENDING"
      | "POSTED"
      | "FAILED";
  } | null {
    const settlement =
      this.settlements.get(
        settlementId
      );

    if (!settlement) {
      return null;
    }

    return {
      transactionId:
        settlement.transactionId,

      publicReference:
        settlement.publicReference,

      grossAmount:
        settlement.grossAmount,

      feeAmount:
        settlement.feeAmount,

      netAmount:
        settlement.netAmount,

      allocations:
        settlement.allocations,

      status:
        settlement.status,

      settledAt:
        settlement.settledAt,

      faapStatus:
        settlement.faapPosting.status,
    };
  }
}

export const settlementOrchestrator =
  new SettlementOrchestrator();

export default settlementOrchestrator;
