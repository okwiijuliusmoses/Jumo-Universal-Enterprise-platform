/**
 * JUMO DIGITAL PAY
 * Universal Payment Transaction Orchestrator
 *
 * FINAL CORE FOUNDATION — PHASE 3
 *
 * Coordinates:
 * Identity / Authorization
 * Capability
 * Fee Policy
 * Routing
 * Wallet / Account
 * Ledger Transfer
 * Transaction Lifecycle
 * Reconciliation
 *
 * IMPORTANT:
 * - Internal IDs never become public payment identifiers.
 * - Platform / ERP / product / tenant / institution
 *   identities remain confidential.
 * - Public payment references are separate from
 *   internal runtime identities.
 */

import {
  paymentAuthorizationService,
  type PaymentActorRole,
  type PaymentOperation,
} from "./paymentAuthorizationService";

import {
  paymentRoutingService,
} from "./paymentRoutingService";

import {
  feePolicyService,
} from "./feePolicyService";

import {
  paymentLedgerBridge,
} from "./paymentLedgerBridge";

import {
  paymentReconciliationService,
} from "./paymentReconciliationService";

export interface UniversalPaymentRequest {
  transactionId: string;

  publicReference: string;

  paymentCode: string;

  actorId: string;

  actorRole: PaymentActorRole;

  productId: string;

  tenantId?: string;

  capability: any;

  debitAccountId: string;

  creditAccountId: string;

  amount: number;

  currency: string;

  operation?: PaymentOperation;

  preferredRail?: any;

  category?: any;

  productType: string;
}

export interface UniversalPaymentResult {
  transactionId: string;

  publicReference: string;

  paymentCode: string;

  amount: number;

  currency: string;

  serviceFee: number;

  automatedDeduction: number;

  netSettlementAmount: number;

  paymentRail?: any;

  status:
    | "SETTLED"
    | "FAILED";

  reason: string;

  createdAt: string;
}

class PaymentOrchestrator {
  readonly version =
    "JDP-UNIVERSAL-ORCHESTRATOR-1.0";

  /**
   * Execute a complete Digital Pay transaction.
   */
  execute(
    request:
      UniversalPaymentRequest
  ): UniversalPaymentResult {
    const operation =
      request.operation ??
      "CREATE_PAYMENT";

    /*
     * 1. AUTHORIZE
     */
    const authorization =
      paymentAuthorizationService.authorize({
        actorId:
          request.actorId,

        role:
          request.actorRole,

        productId:
          request.productId,

        capability:
          request.capability,

        operation,

        tenantId:
          request.tenantId,
      });

    if (
      !authorization.authorized
    ) {
      this.registerFailedPayment(
        request,
        authorization.reason
      );

      throw new Error(
        `Digital Pay authorization denied: ${authorization.reason}`
      );
    }

    /*
     * 2. REGISTER TRANSACTION
     */
    paymentReconciliationService
      .registerPayment({
        transactionId:
          request.transactionId,

        publicReference:
          request.publicReference,

        paymentCode:
          request.paymentCode,

        amount:
          request.amount,

        currency:
          request.currency,

        productType:
          request.productType,
      });

    /*
     * 3. AUTHORIZE TRANSACTION
     */
    paymentReconciliationService.updateStatus(
      request.transactionId,
      "AUTHORIZED"
    );

    /*
     * 4. CALCULATE FEES + AUTOMATED DEDUCTIONS
     */
    const fees =
      feePolicyService.calculateComplete({
        productId:
          request.productId,

        tenantId:
          request.tenantId,

        amount:
          request.amount,

        currency:
          request.currency,

        category:
          request.category,
      });

    /*
     * 5. ROUTE PAYMENT
     */
    const routing =
      paymentRoutingService.route({
        productId:
          request.productId,

        capability:
          request.capability,

        amount:
          request.amount,

        currency:
          request.currency,

        preferredRail:
          request.preferredRail,
      });

    if (
      !routing.approved ||
      !routing.rail
    ) {
      paymentReconciliationService
        .updateStatus(
          request.transactionId,
          "FAILED",
          {
            failureReason:
              routing.reason,
          }
        );

      throw new Error(
        `Digital Pay routing failed: ${routing.reason}`
      );
    }

    /*
     * 6. PROCESSING
     */
    paymentReconciliationService.updateStatus(
      request.transactionId,
      "PROCESSING"
    );

    /*
     * 7. TRANSFER PRINCIPAL
     *
     * The ledger bridge is the only layer
     * permitted to move account balances.
     */
    const transfer =
      paymentLedgerBridge.transfer({
        transferId:
          request.transactionId,

        debitAccountId:
          request.debitAccountId,

        creditAccountId:
          request.creditAccountId,

        amount:
          request.amount,

        currency:
          request.currency,

        publicReference:
          request.publicReference,

        description:
          `Digital Pay ${request.productType}`,
      });

    /*
     * 8. SETTLE
     */
    paymentReconciliationService.updateStatus(
      request.transactionId,
      "SETTLED",
      {
        settlementReference:
          transfer.publicReference,
      }
    );

    /*
     * 9. RECONCILE
     */
    paymentReconciliationService.reconcile({
      transactionId:
        request.transactionId,

      settledAmount:
        request.amount,
    });

    /*
     * 10. RETURN PUBLIC-SAFE RESULT
     *
     * Internal IDs are intentionally excluded.
     */
    return {
      transactionId:
        request.transactionId,

      publicReference:
        request.publicReference,

      paymentCode:
        request.paymentCode,

      amount:
        request.amount,

      currency:
        request.currency,

      serviceFee:
        fees.serviceFee,

      automatedDeduction:
        fees.deductions,

      netSettlementAmount:
        fees.netAmount,

      paymentRail:
        routing.rail,

      status:
        "SETTLED",

      reason:
        "Payment successfully authorized, routed, posted and reconciled",

      createdAt:
        new Date().toISOString(),
    };
  }

  /**
   * Public-safe transaction status.
   */
  getTransactionStatus(
    publicReference: string
  ) {
    return paymentReconciliationService
      .getPublicPayment(
        publicReference
      );
  }

  /**
   * Internal runtime diagnostics.
   */
  getRuntimeSummary() {
    return {
      orchestratorVersion:
        this.version,

      reconciliation:
        paymentReconciliationService
          .getSummary(),

      ledger:
        paymentLedgerBridge
          .getSummary(),

      fees:
        feePolicyService
          .getSummary(),
    };
  }

  private registerFailedPayment(
    request:
      UniversalPaymentRequest,
    reason: string
  ) {
    try {
      paymentReconciliationService
        .registerPayment({
          transactionId:
            request.transactionId,

          publicReference:
            request.publicReference,

          paymentCode:
            request.paymentCode,

          amount:
            request.amount,

          currency:
            request.currency,

          productType:
            request.productType,
        });

      paymentReconciliationService
        .updateStatus(
          request.transactionId,
          "FAILED",
          {
            failureReason:
              reason,
          }
        );
    } catch {
      /*
       * Authorization failure must never
       * block the caller with a secondary
       * audit-registration error.
       */
    }
  }
}

export const paymentOrchestrator =
  new PaymentOrchestrator();

export const digitalPayRuntime =
  paymentOrchestrator;

export default paymentOrchestrator;
