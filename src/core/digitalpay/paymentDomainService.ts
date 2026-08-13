/**
 * JUMO DIGITAL PAY
 * Phase 3 — Payment Domain Orchestration
 *
 * Supports:
 * - Merchant payments
 * - School payments
 * - Institutional payments
 * - Agent banking
 * - Mobile-money agent operations
 * - Service payments
 * - ERP/product payments
 * - Automated service-fee deductions
 *
 * All domains use the same Digital Pay transaction fabric.
 */

import {
  paymentTransactionService,
  type PaymentTransaction,
  type PaymentChannel,
} from "./paymentTransactionService";

export interface DomainPaymentRequest {
  payeeCode: string;
  amount: number;
  currency: string;
  channel: PaymentChannel;

  payerReference?: string;
  description?: string;

  platformIdentity?: string;
  tenantIdentity?: string;
  templateIdentity?: string;
  institutionIdentity?: string;

  metadata?: Record<string, unknown>;
}

export interface DomainPaymentResult {
  transaction: PaymentTransaction;
  domain:
    | "MERCHANT"
    | "SCHOOL"
    | "INSTITUTION"
    | "AGENT"
    | "SERVICE"
    | "ERP";
  feeAmount: number;
  netAmount: number;
}

class PaymentDomainService {
  private create(
    domain: DomainPaymentResult["domain"],
    type: Parameters<
      typeof paymentTransactionService.createTransaction
    >[0]["type"],
    request: DomainPaymentRequest
  ): DomainPaymentResult {
    const transaction =
      paymentTransactionService.createTransaction({
        type,
        channel: request.channel,

        payeeCode:
          request.payeeCode,

        amount:
          request.amount,

        currency:
          request.currency,

        payerReference:
          request.payerReference,

        description:
          request.description,

        platformIdentity:
          request.platformIdentity,

        tenantIdentity:
          request.tenantIdentity,

        templateIdentity:
          request.templateIdentity,

        institutionIdentity:
          request.institutionIdentity,

        metadata:
          request.metadata,
      });

    return {
      transaction,
      domain,

      feeAmount:
        transaction.feeAmount,

      netAmount:
        transaction.netAmount,
    };
  }

  /**
   * Merchant checkout.
   */
  merchantPayment(
    request: DomainPaymentRequest
  ): DomainPaymentResult {
    return this.create(
      "MERCHANT",
      "MERCHANT_PAYMENT",
      request
    );
  }

  /**
   * School fees and institutional collections.
   */
  schoolPayment(
    request: DomainPaymentRequest
  ): DomainPaymentResult {
    return this.create(
      "SCHOOL",
      "SCHOOL_PAYMENT",
      request
    );
  }

  /**
   * Universities, colleges, hospitals,
   * government institutions and other
   * registered institutions.
   */
  institutionalPayment(
    request: DomainPaymentRequest
  ): DomainPaymentResult {
    return this.create(
      "INSTITUTION",
      "INSTITUTION_PAYMENT",
      request
    );
  }

  /**
   * Agent deposit.
   */
  agentDeposit(
    request: DomainPaymentRequest
  ): DomainPaymentResult {
    return this.create(
      "AGENT",
      "AGENT_DEPOSIT",
      request
    );
  }

  /**
   * Agent withdrawal.
   */
  agentWithdrawal(
    request: DomainPaymentRequest
  ): DomainPaymentResult {
    return this.create(
      "AGENT",
      "AGENT_WITHDRAWAL",
      request
    );
  }

  /**
   * General service payment.
   */
  servicePayment(
    request: DomainPaymentRequest
  ): DomainPaymentResult {
    return this.create(
      "SERVICE",
      "BILL_PAYMENT",
      request
    );
  }

  /**
   * ERP or commercial-product payment.
   */
  erpPayment(
    request: DomainPaymentRequest
  ): DomainPaymentResult {
    return this.create(
      "ERP",
      "ERP_PAYMENT",
      request
    );
  }

  /**
   * Automatically deducts a platform service fee.
   *
   * The deduction is represented in the transaction
   * itself and can subsequently be posted to FAAP.
   */
  calculateServiceFee(
    amount: number,
    rate = 0.005
  ): {
    gross: number;
    fee: number;
    net: number;
  } {
    if (!Number.isFinite(amount) || amount <= 0) {
      throw new Error(
        "Digital Pay: invalid service-fee amount"
      );
    }

    const fee = Number(
      (amount * rate).toFixed(2)
    );

    return {
      gross: amount,
      fee,
      net: Number(
        (amount - fee).toFixed(2)
      ),
    };
  }

  /**
   * Universal payment dispatch.
   *
   * This allows ERP/product runtimes to call Digital Pay
   * without implementing their own payment engine.
   */
  dispatch(
    domain:
      | "MERCHANT"
      | "SCHOOL"
      | "INSTITUTION"
      | "AGENT"
      | "SERVICE"
      | "ERP",
    request: DomainPaymentRequest
  ): DomainPaymentResult {
    switch (domain) {
      case "MERCHANT":
        return this.merchantPayment(request);

      case "SCHOOL":
        return this.schoolPayment(request);

      case "INSTITUTION":
        return this.institutionalPayment(request);

      case "AGENT":
        return this.agentDeposit(request);

      case "SERVICE":
        return this.servicePayment(request);

      case "ERP":
        return this.erpPayment(request);

      default:
        throw new Error(
          `Digital Pay: unsupported payment domain ${domain}`
        );
    }
  }
}

export const paymentDomainService =
  new PaymentDomainService();

export default paymentDomainService;
