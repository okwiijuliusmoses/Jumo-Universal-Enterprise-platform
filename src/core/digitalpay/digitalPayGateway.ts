/**
 * JUMO DIGITAL PAY
 * Universal Integration Gateway
 *
 * Every JUMO ERP/product should integrate through
 * this gateway rather than implementing its own
 * payment logic.
 *
 * Product / ERP
 *      ↓
 * Digital Pay Gateway
 *      ├── Payment Identity
 *      ├── Merchant
 *      ├── Agent
 *      ├── Institution
 *      ├── Fee Engine
 *      ├── FAAP Settlement
 *      └── Universal Runtime
 */

import {
  digitalPayRuntime,
  type RuntimePaymentRequest,
} from "./digitalPayRuntime";

import {
  paymentIdentityService,
} from "./paymentIdentityService";

import {
  feeDistributionService,
} from "./feeDistributionService";

import {
  faapSettlementBridge,
} from "./faapSettlementBridge";

import {
  merchantAgentService,
} from "./merchantAgentService";

import {
  institutionalPaymentService,
} from "./institutionalPaymentService";

export interface DigitalPayGatewayContext {
  platformIdentity: string;

  productIdentity: string;

  tenantIdentity: string;

  templateIdentity: string;

  institutionIdentity?: string;

  /**
   * Public payee code.
   */
  payeeCode: string;
}

export interface GatewayPaymentRequest {
  context: DigitalPayGatewayContext;

  idempotencyKey: string;

  domain:
    | "MERCHANT"
    | "INSTITUTION"
    | "SCHOOL"
    | "ERP"
    | "AGENT"
    | "BANK"
    | "PLATFORM"
    | "LOAN"
    | "SERVICE";

  amount: number;

  currency: string;

  channel:
    | "MOBILE_MONEY"
    | "BANK"
    | "CARD"
    | "QR"
    | "WALLET";

  description?: string;
}

export interface GatewayPaymentResult {
  success: boolean;

  publicReference: string;

  paymentCode: string;

  transactionId: string;

  amount: number;

  currency: string;

  fee: number;

  netAmount: number;

  settlementId?: string;

  status:
    | "PENDING"
    | "SETTLED"
    | "FAILED";

  duplicate: boolean;
}

class DigitalPayGateway {
  readonly name =
    "JUMO DIGITAL PAY UNIVERSAL GATEWAY";

  readonly version =
    "3.0.0";

  readonly status =
    "OPERATIONAL";

  /**
   * Validate a public payee code.
   */
  validatePayeeCode(
    paymentCode: string
  ) {
    return paymentIdentityService
      .validatePaymentCode(
        paymentCode
      );
  }

  /**
   * Resolve safe public payee information.
   */
  resolvePayee(
    paymentCode: string
  ) {
    return paymentIdentityService
      .resolvePublicPayee(
        paymentCode
      );
  }

  /**
   * Process a universal payment.
   *
   * The originating ERP/product does not need
   * to know which payment rail is used.
   */
  processPayment(
    request: GatewayPaymentRequest
  ): GatewayPaymentResult {
    if (
      request.amount <= 0
    ) {
      throw new Error(
        "Digital Pay Gateway: amount must be positive"
      );
    }

    if (
      !request.currency.trim()
    ) {
      throw new Error(
        "Digital Pay Gateway: currency is required"
      );
    }

    if (
      !request.context.payeeCode
    ) {
      throw new Error(
        "Digital Pay Gateway: payee code is required"
      );
    }

    if (
      !this.validatePayeeCode(
        request.context.payeeCode
      )
    ) {
      throw new Error(
        "Digital Pay Gateway: invalid or inactive payee code"
      );
    }

    const runtimeRequest:
      RuntimePaymentRequest = {
        context: {
          platformIdentity:
            request.context
              .platformIdentity,

          tenantIdentity:
            request.context.tenantIdentity,
          templateIdentity:
            request.context
              .templateIdentity,

          institutionIdentity:
            request.context
              .institutionIdentity,

          payeeCode:
            request.context.payeeCode
        },

        idempotencyKey:
          request.idempotencyKey,

        payeeCode:
          request.context.payeeCode,

        channel:
          request.channel,

        amount:
          request.amount,

        currency:
          request.currency,

        description:
          request.description,
      };

    const runtimeResult =
      digitalPayRuntime.payment(
        runtimeRequest,
        (
          request.domain === "BANK" ||
          request.domain === "PLATFORM" ||
          request.domain === "LOAN"
            ? "SERVICE"
            : request.domain
        )
      );

    /**
     * Calculate configurable fees.
     */
    const feeDistribution =
      feeDistributionService.calculate(
        {
          transactionId:
            runtimeResult.transaction
              .transactionId,

          publicReference:
            runtimeResult
              .publicReference,

          amount:
            request.amount,

          currency:
            request.currency,
        }
      );

    /**
     * Prepare the FAAP settlement event.
     */
    const settlement =
      faapSettlementBridge.createSettlement(
        runtimeResult.transaction,
        this.resolveFAAPSettlementAccounts(request),
        (
          request.domain === "BANK" ||
          request.domain === "PLATFORM" ||
          request.domain === "LOAN"
            ? "SERVICE"
            : request.domain
        ) ===
          "INSTITUTION" ||
        (
          request.domain === "BANK" ||
          request.domain === "PLATFORM" ||
          request.domain === "LOAN"
            ? "SERVICE"
            : request.domain
        ) ===
          "SCHOOL"
          ? "INSTITUTION"
          : (
          request.domain === "BANK" ||
          request.domain === "PLATFORM" ||
          request.domain === "LOAN"
            ? "SERVICE"
            : request.domain
        ) ===
              "MERCHANT"
            ? "MERCHANT"
            : (
          request.domain === "BANK" ||
          request.domain === "PLATFORM" ||
          request.domain === "LOAN"
            ? "SERVICE"
            : request.domain
        ) ===
                "AGENT"
              ? "AGENT"
              : "DIGITAL_PAY"
      );

    return {
      success: true,

      publicReference:
        runtimeResult
          .publicReference,

      paymentCode: String(request.context),
      transactionId:
        runtimeResult.transaction
          .transactionId,

      amount:
        request.amount,

      currency:
        request.currency,

      fee:
        feeDistribution.totalFee,

      netAmount:
        feeDistribution.netAmount,

      settlementId:
        settlement.settlementId,

      status:
        "PENDING",

      duplicate:
        runtimeResult.duplicate,
    };
  }

  /**
   * Direct merchant collection.
   */
  merchantCollection(
    merchantId: string,
    request: {
      publicReference: string;
      amount: number;
      fee?: number;
      currency: string;
    }
  ) {
    return merchantAgentService
      .collectMerchantPayment(
        merchantId,
        request
      );
  }

  /**
   * Agent cash operation.
   */
  agentOperation(
    agentId: string,
    request: {
      publicReference: string;
      operation:
        | "CASH_IN"
        | "CASH_OUT";
      amount: number;
      currency: string;
    }
  ) {
    return merchantAgentService
      .processAgentOperation(
        agentId,
        request
      );
  }

  /**
   * Create institutional invoice.
   */
  createInstitutionInvoice(
    institutionId: string,
    request: {
      invoiceReference: string;
      payerReference: string;
      description: string;
      amount: number;
      currency: string;
      dueDate?: string;
    }
  ) {
    return institutionalPaymentService
      .createInvoice(
        institutionId,
        request
      );
  }

  /**
   * Pay an institutional invoice.
   */
  payInstitutionInvoice(
    invoiceId: string,
    request: {
      publicReference: string;
      payerReference: string;
      amount: number;
      serviceFee?: number;
      currency: string;
    }
  ) {
    return institutionalPaymentService
      .payInvoice(
        invoiceId,
        request
      );
  }

  /**
   * Mark a FAAP settlement as posted.
   */
  confirmSettlement(
    settlementId: string
  ) {
    return faapSettlementBridge
      .markPosted(
        settlementId
      );
  }

  /**
   * Universal gateway telemetry.
   */
  /**
   * FAAP is the accounting authority.
   *
   * Digital Pay may request a settlement, but it must never
   * invent, override, or bypass FAAP account mappings.
   */
  /**
   * Resolve the FAAP accounts authorized for a Digital Pay settlement.
   *
   * FAAP remains the accounting authority. Digital Pay does not create
   * synthetic ledger accounts and does not use private clearing-account
   * names that are absent from the FAAP chart of accounts.
   *
   * The current Genesis chart provides:
   *   acct-1000 = Cash & Bank
   *   acct-4000 = Revenue
   *
   * Domain-specific accounting mappings can later be supplied by the
   * FAAP configuration/tenant accounting policy without changing the
   * Digital Pay payment contract.
   */
  private resolveFAAPSettlementAccounts(
    _request: GatewayPaymentRequest,
  ): {
    debitAccount: string;
    creditAccount: string;
  } {
    return {
      debitAccount: "acct-1000",
      creditAccount: "acct-4000",
    };
  }

  getStatus() {
    return {
      name: this.name,

      version: this.version,

      status: this.status,

      runtime:
        digitalPayRuntime
          .getStatus(),

      identity:
        paymentIdentityService
          .getSummary(),

      fees:
        feeDistributionService
          .getSummary(),

      merchantAgent:
        merchantAgentService
          .getSummary(),

      institutions:
        institutionalPaymentService
          .getSummary(),

      settlement:
        faapSettlementBridge
          .getSummary(),
    };
  }
}

export const digitalPayGateway =
  new DigitalPayGateway();

export default digitalPayGateway;
