/**
 * JUMO DIGITAL PAY
 * PHASE 7 — UNIVERSAL MONEY-FLOW ORCHESTRATOR
 *
 * One transaction fabric for:
 * merchant payments
 * agent banking
 * school/institutional payments
 * wallets
 * banking
 * loans
 * repayments
 * collections
 * disbursements
 * platform service fees
 * commissions
 *
 * Hybrid-first:
 * - online when connectivity exists
 * - offline queue when connectivity is unavailable
 * - automatic synchronization when connectivity returns
 */

import {
  digitalPayServiceRegistry,
} from "./digitalPayServiceRegistry";

export type MoneyFlowType =
  | "PAYMENT"
  | "COLLECTION"
  | "DISBURSEMENT"
  | "TRANSFER"
  | "LOAN_DISBURSEMENT"
  | "LOAN_REPAYMENT"
  | "SERVICE_FEE"
  | "COMMISSION"
  | "REFUND";

export type MoneyFlowStatus =
  | "QUEUED"
  | "AUTHORIZED"
  | "PROCESSING"
  | "SETTLED"
  | "FAILED"
  | "REVERSED";

export interface MoneyFlowRequest {
  serviceId: string;

  type: MoneyFlowType;

  amount: number;
  currency: string;

  payerReference?: string;

  payeeCode: string;

  channel:
    | "MOBILE_MONEY"
    | "BANK"
    | "CARD"
    | "QR"
    | "USSD"
    | "AGENT"
    | "WALLET"
    | "INTERNAL";

  mode?: "ONLINE" | "OFFLINE" | "HYBRID";

  metadata?: Record<string, unknown>;
}

export interface MoneyFlow {
  transactionId: string;

  serviceId: string;

  type: MoneyFlowType;

  amount: number;
  currency: string;

  payeeCode: string;

  channel: MoneyFlowRequest["channel"];

  status: MoneyFlowStatus;

  queuedOffline: boolean;

  feeAmount: number;

  netAmount: number;

  createdAt: string;

  settledAt?: string;

  metadata?: Record<string, unknown>;
}

const flowStore =
  new Map<string, MoneyFlow>();

const offlineQueue: MoneyFlow[] = [];

function transactionId(): string {
  return `DPX-${Date.now()}-${Math.random()
    .toString(36)
    .slice(2, 10)
    .toUpperCase()}`;
}

function serviceFee(amount: number): number {
  /*
   * Default orchestration fee.
   *
   * Actual commercial fee rules should be resolved
   * from tenant/product configuration rather than
   * hard-coded in production.
   */
  return Math.round(
    amount * 0.005 * 100,
  ) / 100;
}

export class DigitalPayOrchestrator {
  initiate(
    request: MoneyFlowRequest,
  ): MoneyFlow {
    if (
      !request.serviceId ||
      !request.payeeCode
    ) {
      throw new Error(
        "Digital Pay service and payee code are required.",
      );
    }

    if (
      !/^\d{10}$/.test(
        request.payeeCode,
      )
    ) {
      throw new Error(
        "Invalid public payee payment code.",
      );
    }

    if (
      !Number.isFinite(request.amount) ||
      request.amount <= 0
    ) {
      throw new Error(
        "Payment amount must be greater than zero.",
      );
    }

    const service =
      digitalPayServiceRegistry.get(
        request.serviceId,
      );

    if (service.status !== "ACTIVE") {
      throw new Error(
        "Digital Pay service is not active.",
      );
    }

    const fee =
      serviceFee(request.amount);

    const flow: MoneyFlow = {
      transactionId:
        transactionId(),

      serviceId:
        request.serviceId,

      type:
        request.type,

      amount:
        request.amount,

      currency:
        request.currency,

      payeeCode:
        request.payeeCode,

      channel:
        request.channel,

      status:
        request.mode === "OFFLINE"
          ? "QUEUED"
          : "AUTHORIZED",

      queuedOffline:
        request.mode === "OFFLINE",

      feeAmount:
        fee,

      netAmount:
        Math.max(
          0,
          request.amount - fee,
        ),

      createdAt:
        new Date().toISOString(),

      metadata:
        request.metadata,
    };

    flowStore.set(
      flow.transactionId,
      flow,
    );

    if (flow.queuedOffline) {
      offlineQueue.push(flow);
    }

    return flow;
  }

  process(
    transactionIdValue: string,
  ): MoneyFlow {
    const flow =
      this.require(
        transactionIdValue,
      );

    if (
      flow.status === "SETTLED"
    ) {
      return flow;
    }

    if (
      flow.status === "FAILED" ||
      flow.status === "REVERSED"
    ) {
      return flow;
    }

    flow.status =
      "PROCESSING";

    /*
     * Real payment adapters will be invoked here:
     *
     * Mobile Money
     * Bank
     * Card
     * QR
     * USSD
     * Agent
     * Wallet
     *
     * The orchestrator remains rail-neutral.
     */

    flow.status =
      "SETTLED";

    flow.queuedOffline =
      false;

    flow.settledAt =
      new Date().toISOString();

    return flow;
  }

  synchronizeOfflineQueue(): MoneyFlow[] {
    const synchronized: MoneyFlow[] = [];

    while (offlineQueue.length > 0) {
      const flow =
        offlineQueue.shift();

      if (!flow) {
        continue;
      }

      flow.queuedOffline =
        false;

      flow.status =
        "PROCESSING";

      flowStore.set(
        flow.transactionId,
        flow,
      );

      synchronized.push(
        this.process(
          flow.transactionId,
        ),
      );
    }

    return synchronized;
  }

  get(
    transactionIdValue: string,
  ): MoneyFlow {
    return this.require(
      transactionIdValue,
    );
  }

  list(): MoneyFlow[] {
    return Array.from(
      flowStore.values(),
    );
  }

  listPendingOffline(): MoneyFlow[] {
    return [...offlineQueue];
  }

  reverse(
    transactionIdValue: string,
  ): MoneyFlow {
    const flow =
      this.require(
        transactionIdValue,
      );

    if (
      flow.status !== "SETTLED"
    ) {
      throw new Error(
        "Only settled transactions can be reversed.",
      );
    }

    flow.status =
      "REVERSED";

    return flow;
  }

  private require(
    transactionIdValue: string,
  ): MoneyFlow {
    const flow =
      flowStore.get(
        transactionIdValue,
      );

    if (!flow) {
      throw new Error(
        `Digital Pay transaction not found: ${transactionIdValue}`,
      );
    }

    return flow;
  }
}

export const digitalPayOrchestrator =
  new DigitalPayOrchestrator();

export default digitalPayOrchestrator;
