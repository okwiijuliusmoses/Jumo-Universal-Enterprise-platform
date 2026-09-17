/**
 * JUMO DIGITAL PAY
 * Universal Payment Orchestrator
 *
 * Central transaction boundary for all JUMO products.
 *
 * Product/ERP
 *      ↓
 * Universal Payment Orchestrator
 *      ↓
 * Digital Pay Gateway / Runtime
 *      ↓
 * Identity + Fees + FAAP + Settlement
 *
 * IMPORTANT:
 * Internal platform/product/tenant/institution
 * identities are never exposed as public payment
 * identifiers.
 */

import {
  paymentIdentityService,
} from "./paymentIdentityService";

import {
  digitalPayRuntime,
  type RuntimePaymentResult,
} from "./digitalPayRuntime";

export interface UniversalPaymentCommand {
  tenantId: string;
  productId: string;
  templateId: string;
  institutionId?: string;
  payeeCode: string;
  amount: number;
  currency: string;
  channel: "MOBILE_MONEY" | "BANK" | "CARD" | "QR" | "WALLET";
  paymentType?: string;
  payerReference?: string;
  description?: string;
  idempotencyKey: string;
  metadata?: Record<string, unknown>;
}

export interface UniversalPaymentReceipt {
  transactionId: string;
  payeeCode: string;
  publicReference: string;
  domain: RuntimePaymentResult["domain"];
  amount: number;
  currency: string;
  status: string;
  feeAmount: number;
  netAmount: number;
  duplicate: boolean;
  offlineQueued: boolean;
  success: boolean;
}

export class UniversalPaymentOrchestrator {
  readonly name = "JUMO UNIVERSAL PAYMENT ORCHESTRATOR";
  readonly version = "1.0.0";
  readonly status = "OPERATIONAL";

  private readonly receipts =
    new Map<string, UniversalPaymentReceipt>();

  private readonly processed =
    new Map<string, UniversalPaymentReceipt>();

  private createPublicReference(): string {
    const timestamp =
      Date.now().toString(36)
        .toUpperCase();

    const random =
      Math.random()
        .toString(36)
        .slice(2, 8)
        .toUpperCase();

    return `JDP-${timestamp}-${random}`;
  }

  /**
   * Execute a universal payment.
   */
  execute(
    command: UniversalPaymentCommand
  ): UniversalPaymentReceipt {
    if (
      !command.idempotencyKey.trim()
    ) {
      throw new Error(
        "Digital Pay: idempotency key is required"
      );
    }

    /**
     * Prevent duplicate payment execution.
     */
    const existing =
      this.processed.get(
        command.idempotencyKey
      );

    if (existing) {
      return existing;
    }

    if (
      command.amount <= 0
    ) {
      throw new Error(
        "Digital Pay: payment amount must be positive"
      );
    }

    if (
      !command.currency.trim()
    ) {
      throw new Error(
        "Digital Pay: currency is required"
      );
    }

    /**
     * Public payment identity validation.
     */
    const payee =
      paymentIdentityService
        .resolvePublicPayee(
          command.payeeCode
        );

    if (!payee) {
      throw new Error(
        "Digital Pay: payee code is invalid"
      );
    }

    if (!payee.active) {
      throw new Error(
        "Digital Pay: payee is inactive"
      );
    }

    if (
      payee.currency &&
      payee.currency !==
        command.currency
    ) {
      throw new Error(
        "Digital Pay: payee currency mismatch"
      );
    }

    /**
     * Create a public reference independently
     * from all internal identities.
     */
    const publicReference =
      this.createPublicReference();

    const runtimeResult =
      digitalPayRuntime.payment(
        {
          payeeCode: command.payeeCode,
          channel: command.channel,
          context: {
            platformIdentity:
              "JUMO-UEOS",

            tenantIdentity:
              command.tenantId,

            templateIdentity:
              command.templateId,

            institutionIdentity:
              command.institutionId,

            payeeCode:
              command.payeeCode,
          },

          idempotencyKey:
            command.idempotencyKey,

          amount:
            command.amount,

          currency:
            command.currency,

          description:
            command.description,
        },

        command.paymentType
      );

    const receipt:
      UniversalPaymentReceipt = {
      success: true,

      publicReference:
        runtimeResult.publicReference ||
        publicReference,

      payeeCode:
        command.payeeCode,

      amount:
        command.amount,

      currency:
        command.currency,

      transactionId:
        runtimeResult.transaction
          .transactionId,

      status:
        "PENDING",
    };

    this.processed.set(
      command.idempotencyKey,
      receipt
    );

    return receipt;
  }

  /**
   * Check whether a payment was already
   * processed using its idempotency key.
   */
  getExistingPayment(
    idempotencyKey: string
  ) {
    return (
      this.processed.get(
        idempotencyKey
      ) ?? null
    );
  }

  /**
   * Validate a public payee code without
   * revealing internal identity information.
   */
  validatePayee(
    payeeCode: string
  ) {
    return (
      paymentIdentityService
        .resolvePublicPayee(
          payeeCode
        )
    );
  }

  /**
   * Runtime telemetry.
   */
  getStatus() {
    return {
      status: "OPERATIONAL",

      processedPayments:
        this.processed.size,

      publicIdentityPolicy:
        "10-DIGIT-PAYEE-CODE",

      internalIdentityExposure:
        "PROHIBITED",

      idempotency:
        "ENABLED",
    };
  }
}

export const universalPaymentOrchestrator =
  new UniversalPaymentOrchestrator();

export default universalPaymentOrchestrator;
