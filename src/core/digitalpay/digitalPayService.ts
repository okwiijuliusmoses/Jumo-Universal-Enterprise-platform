/**
 * JUMO DIGITAL PAY
 * Universal Product Integration Service
 *
 * Stable service facade for all JUMO ERPs,
 * commercial products and institutional platforms.
 *
 * Renderers and domain applications should call
 * this facade instead of reaching directly into
 * individual payment engines.
 */

import {
  universalPaymentOrchestrator,
  type UniversalPaymentCommand,
  type UniversalPaymentReceipt,
} from "./universalPaymentOrchestrator";

import {
  paymentIdentityService,
} from "./paymentIdentityService";

import {
  merchantAgentService,
} from "./merchantAgentService";

import {
  institutionalPaymentService,
} from "./institutionalPaymentService";

export interface ProductPaymentContext {
  productId: string;
  tenantId: string;
  templateId: string;
  institutionId?: string;
}

export interface CreatePaymentInput {
  context: ProductPaymentContext;

  payeeCode: string;

  amount: number;

  currency: string;

  paymentType:
    | "MERCHANT"
    | "AGENT"
    | "SCHOOL"
    | "INSTITUTION"
    | "SERVICE"
    | "LOAN"
    | "BANK"
    | "ERP"
    | "PLATFORM";

  description?: string;

  idempotencyKey: string;
}

class DigitalPayService {
  /**
   * Universal payment operation.
   */
  createPayment(
    input: CreatePaymentInput
  ): UniversalPaymentReceipt {
    const command:
      UniversalPaymentCommand = {
      productId:
        input.context.productId,

      tenantId:
        input.context.tenantId,

      templateId:
        input.context.templateId,

      institutionId:
        input.context.institutionId,

      payeeCode:
        input.payeeCode,

      amount:
        input.amount,

      currency:
        input.currency,

      paymentType:
        input.paymentType,

      channel: "WALLET",
      description:
        input.description,

      idempotencyKey:
        input.idempotencyKey,
    };

    return universalPaymentOrchestrator
      .execute(command);
  }

  /**
   * Public payee lookup.
   *
   * Only safe public information is returned.
   */
  lookupPayee(
    payeeCode: string
  ) {
    return paymentIdentityService
      .resolvePublicPayee(
        payeeCode
      );
  }

  /**
   * Validate a payment code.
   */
  validatePayeeCode(
    payeeCode: string
  ): boolean {
    return paymentIdentityService
      .validatePaymentCode(
        payeeCode
      );
  }

  /**
   * Merchant payment operation.
   */
  merchantPayment(
    merchantId: string,
    input: {
      publicReference: string;
      amount: number;
      fee?: number;
      currency: string;
    }
  ) {
    return merchantAgentService
      .collectMerchantPayment(
        merchantId,
        input
      );
  }

  /**
   * Agent cash-in / cash-out.
   */
  agentTransaction(
    agentId: string,
    input: {
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
        input
      );
  }

  /**
   * Create a school/institution invoice.
   */
  createInstitutionInvoice(
    institutionId: string,
    input: {
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
        input
      );
  }

  /**
   * Pay a school/institution invoice.
   */
  payInstitutionInvoice(
    invoiceId: string,
    input: {
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
        input
      );
  }

  /**
   * Public Digital Pay status.
   *
   * Deliberately excludes confidential
   * platform and tenant identifiers.
   */
  getPublicStatus() {
    return {
      service:
        "JUMO DIGITAL PAY",

      status:
        "OPERATIONAL",

      paymentIdentity:
        "10-DIGIT-PAYEE-CODE",

      merchantPayments:
        "AVAILABLE",

      agentBanking:
        "AVAILABLE",

      institutionalPayments:
        "AVAILABLE",

      schoolPayments:
        "AVAILABLE",

      automatedCharges:
        "AVAILABLE",

      universalERPIntegration:
        "AVAILABLE",
    };
  }

  /**
   * Internal runtime diagnostics.
   *
   * Intended for UEOS Control Center only.
   */
  getInternalStatus() {
    return {
      orchestrator:
        universalPaymentOrchestrator
          .getStatus(),

      merchantAgent:
        merchantAgentService
          .getSummary(),

      institutions:
        institutionalPaymentService
          .getSummary(),

      identity:
        paymentIdentityService
          .getSummary(),
    };
  }
}

export const digitalPayService =
  new DigitalPayService();

export default digitalPayService;
