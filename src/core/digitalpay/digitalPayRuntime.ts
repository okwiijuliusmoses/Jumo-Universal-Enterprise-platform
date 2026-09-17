/**
 * JUMO DIGITAL PAY
 * Universal Runtime Facade
 *
 * One payment runtime for the entire JUMO ecosystem.
 *
 * ERP/Product
 *     ↓
 * Digital Pay Runtime
 *     ├── Domain Payments
 *     ├── Wallet
 *     ├── Banking
 *     ├── Lending
 *     ├── Hybrid Offline Queue
 *     ├── Idempotency
 *     ├── Reconciliation
 *     └── FAAP settlement integration
 */

import {
  paymentDomainService,
  type DomainPaymentRequest,
  type DomainPaymentResult,
} from "./paymentDomainService";

import {
  walletBankingLendingService,
  type WalletOperationRequest,
  type LoanOperationRequest,
  type BankingOperationRequest,
} from "./walletBankingLendingService";

import {
  hybridSyncService,
} from "./hybridSyncService";

import {
  reconciliationService,
} from "./reconciliationService";

import {
  paymentTransactionService,
  type PaymentTransaction,
} from "./paymentTransactionService";

export interface DigitalPayRuntimeContext {
  platformIdentity: string;
  tenantIdentity: string;
  templateIdentity: string;
  institutionIdentity?: string;

  /**
   * Public payee code only.
   *
   * Internal platform/tenant/template/institution
   * identifiers must never be exposed to the payer.
   */
  payeeCode: string;
}

export interface RuntimePaymentRequest
  extends DomainPaymentRequest {
  context: DigitalPayRuntimeContext;

  /**
   * Unique request key supplied by the originating
   * ERP/product/runtime.
   */
  idempotencyKey: string;
}

export interface RuntimePaymentResult {
  transaction: PaymentTransaction;

  publicReference: string;

  domain: DomainPaymentResult["domain"];

  feeAmount: number;

  netAmount: number;

  offlineQueued: boolean;

  duplicate: boolean;
}

class DigitalPayRuntime {
  readonly name =
    "JUMO DIGITAL PAY";

  readonly version =
    "3.0.0";

  readonly status =
    "OPERATIONAL";

  /**
   * Creates a domain payment through the
   * universal payment fabric.
   */
  payment(
    request: RuntimePaymentRequest,
    domain: DomainPaymentResult["domain"]
  ): RuntimePaymentResult {
    if (!request.idempotencyKey?.trim()) {
      throw new Error(
        "Digital Pay: idempotencyKey is required"
      );
    }

    /**
     * Duplicate/retry protection.
     */
    const existing =
      reconciliationService.findByIdempotencyKey(
        request.idempotencyKey
      );

    if (existing) {
      const transaction =
        paymentTransactionService.getTransaction(
          existing.transactionId
        );

      if (!transaction) {
        throw new Error(
          "Digital Pay: idempotency record references a missing transaction"
        );
      }

      return {
        transaction,

        publicReference:
          transaction.publicReference,

        domain,

        feeAmount:
          transaction.feeAmount,

        netAmount:
          transaction.netAmount,

        offlineQueued: false,

        duplicate: true,
      };
    }

    const result =
      paymentDomainService.dispatch(
        domain,
        {
          ...request,
          payeeCode:
            request.context.payeeCode,

          platformIdentity:
            request.context.platformIdentity,

          tenantIdentity:
            request.context.tenantIdentity,

          templateIdentity:
            request.context.templateIdentity,

          institutionIdentity:
            request.context.institutionIdentity,
        }
      );

    reconciliationService.registerIdempotency(
      request.idempotencyKey,
      result.transaction
    );

    return {
      transaction:
        result.transaction,

      publicReference:
        result.transaction.publicReference,

      domain,

      feeAmount:
        result.feeAmount,

      netAmount:
        result.netAmount,

      offlineQueued: false,

      duplicate: false,
    };
  }

  /**
   * Queue a transaction for offline/hybrid
   * synchronization.
   */
  queueOffline(
    transaction: PaymentTransaction
  ) {
    return hybridSyncService.enqueue(
      transaction
    );
  }

  /**
   * Compatibility wrapper for legacy Digital Pay integrations.
   * Routes through the canonical payment() runtime method.
   */
  createPayment(
    request: RuntimePaymentRequest,
    domain: DomainPaymentResult["domain"],
  ): RuntimePaymentResult {
    return this.payment(request, domain);
  }

  /**
   * Compatibility wrapper for execution-oriented integrations.
   * The canonical runtime execution path is payment().
   */
  executePayment(
    request: RuntimePaymentRequest,
    domain: DomainPaymentResult["domain"],
  ): RuntimePaymentResult {
    return this.payment(request, domain);
  }

  /**
   * Wallet transfer.
   */
  walletTransfer(
    request: WalletOperationRequest
  ) {
    return walletBankingLendingService.walletTransfer(
      request
    );
  }

  /**
   * Loan disbursement.
   */
  loanDisbursement(
    request: LoanOperationRequest
  ) {
    return walletBankingLendingService.loanDisbursement(
      request
    );
  }

  /**
   * Loan repayment.
   */
  loanRepayment(
    request: LoanOperationRequest
  ) {
    return walletBankingLendingService.loanRepayment(
      request
    );
  }

  /**
   * Bank transfer.
   */
  bankTransfer(
    request: BankingOperationRequest
  ) {
    return walletBankingLendingService.bankTransfer(
      request
    );
  }

  /**
   * Reconcile a settled payment against
   * the external payment rail.
   */
  reconcile(
    transaction: PaymentTransaction,
    actualAmount: number
  ) {
    return reconciliationService.reconcile(
      transaction,
      actualAmount
    );
  }

  /**
   * Runtime telemetry.
   */
  getStatus() {
    return {
      name: this.name,
      version: this.version,
      status: this.status,

      hybridSync:
        hybridSyncService.getSummary(),

      reconciliation:
        reconciliationService.getSummary(),
    };
  }

  /**
   * Returns the safe public payment identity.
   *
   * Internal platform/tenant/template/institution
   * identities are deliberately excluded.
   */
  getPublicPaymentIdentity(
    transaction: PaymentTransaction
  ) {
    return {
      publicReference:
        transaction.publicReference,

      payeeCode:
        transaction.payeeCode,

      amount:
        transaction.amount,

      currency:
        transaction.currency,

      status:
        transaction.status,
    };
  }
}

export const digitalPayRuntime =
  new DigitalPayRuntime();

export default digitalPayRuntime;
