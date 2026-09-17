/**
 * JUMO DIGITAL PAY
 * UI Integration Adapter
 *
 * Keeps DigitalPayRenderer independent from the
 * internal payment engines.
 *
 * Existing UI -> Adapter -> Digital Pay Service
 */

import {
  digitalPayService,
} from "./digitalPayService";

export interface UIPaymentContext {
  productId: string;
  tenantId: string;
  templateId: string;
  institutionId?: string;
}

export interface UIPaymentRequest {
  context: UIPaymentContext;

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
}

class DigitalPayUIAdapter {
  /**
   * Generate an idempotency key for a UI operation.
   */
  private createIdempotencyKey(): string {
    return [
      "JDP-UI",
      Date.now(),
      Math.random()
        .toString(36)
        .slice(2, 10)
        .toUpperCase(),
    ].join("-");
  }

  /**
   * Look up a public 10-digit payee code.
   */
  lookupPayee(
    payeeCode: string
  ) {
    return digitalPayService
      .lookupPayee(
        payeeCode
      );
  }

  /**
   * Validate a public payment code.
   */
  validatePayee(
    payeeCode: string
  ): boolean {
    return digitalPayService
      .validatePayeeCode(
        payeeCode
      );
  }

  /**
   * Submit a payment from the UI.
   */
  submitPayment(
    request: UIPaymentRequest
  ) {
    if (
      !request.payeeCode ||
      !/^\d{10}$/.test(
        request.payeeCode
      )
    ) {
      throw new Error(
        "Enter a valid 10-digit Digital Pay code"
      );
    }

    if (
      !Number.isFinite(
        request.amount
      ) ||
      request.amount <= 0
    ) {
      throw new Error(
        "Payment amount must be greater than zero"
      );
    }

    if (
      !request.currency.trim()
    ) {
      throw new Error(
        "Payment currency is required"
      );
    }

    return digitalPayService
      .createPayment({
        context:
          request.context,

        payeeCode:
          request.payeeCode,

        amount:
          request.amount,

        currency:
          request.currency,

        paymentType:
          request.paymentType,

        description:
          request.description,

        idempotencyKey:
          this.createIdempotencyKey(),
      });
  }

  /**
   * Merchant payment.
   */
  merchantPayment(
    merchantId: string,
    amount: number,
    currency: string
  ) {
    return digitalPayService
      .merchantPayment(
        merchantId,
        {
          publicReference:
            this.createPublicReference(),

          amount,

          currency,
        }
      );
  }

  /**
   * Agent banking operation.
   */
  agentOperation(
    agentId: string,
    operation:
      | "CASH_IN"
      | "CASH_OUT",
    amount: number,
    currency: string
  ) {
    return digitalPayService
      .agentTransaction(
        agentId,
        {
          publicReference:
            this.createPublicReference(),

          operation,

          amount,

          currency,
        }
      );
  }

  /**
   * School/institution invoice payment.
   */
  payInstitutionInvoice(
    invoiceId: string,
    payerReference: string,
    amount: number,
    currency: string,
    serviceFee = 0
  ) {
    return digitalPayService
      .payInstitutionInvoice(
        invoiceId,
        {
          publicReference:
            this.createPublicReference(),

          payerReference,

          amount,

          serviceFee,

          currency,
        }
      );
  }

  /**
   * Public service status for UI.
   */
  getPublicStatus() {
    return digitalPayService
      .getPublicStatus();
  }

  /**
   * Generate a public transaction reference.
   *
   * No internal IDs are included.
   */
  private createPublicReference(): string {
    const timestamp =
      Date.now()
        .toString(36)
        .toUpperCase();

    const random =
      Math.random()
        .toString(36)
        .slice(2, 8)
        .toUpperCase();

    return `JDP-${timestamp}-${random}`;
  }
}

export const digitalPayUIAdapter =
  new DigitalPayUIAdapter();

export default digitalPayUIAdapter;
