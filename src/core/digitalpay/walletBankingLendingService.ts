/**
 * JUMO DIGITAL PAY
 * Phase 3 — Wallet, Banking & Lending Orchestration
 *
 * Provides the shared orchestration layer for:
 * - Digital wallets
 * - Wallet-to-wallet transfers
 * - Agent banking
 * - Bank transfers
 * - Loan disbursement
 * - Loan repayment
 * - Institutional collections
 *
 * Accounting remains delegated to FAAP.
 */

import {
  paymentTransactionService,
  type PaymentTransaction,
  type PaymentChannel,
} from "./paymentTransactionService";

export interface WalletOperationRequest {
  payeeCode: string;
  amount: number;
  currency: string;
  channel?: PaymentChannel;

  payerReference?: string;
  description?: string;

  metadata?: Record<string, unknown>;
}

export interface LoanOperationRequest {
  payeeCode: string;
  amount: number;
  currency: string;
  channel?: PaymentChannel;

  loanReference: string;

  payerReference?: string;
  description?: string;

  metadata?: Record<string, unknown>;
}

export interface BankingOperationRequest {
  payeeCode: string;
  amount: number;
  currency: string;

  bankReference: string;

  payerReference?: string;
  description?: string;

  metadata?: Record<string, unknown>;
}

export interface DigitalPayOperationResult {
  transaction: PaymentTransaction;
  operation:
    | "WALLET_TRANSFER"
    | "LOAN_DISBURSEMENT"
    | "LOAN_REPAYMENT"
    | "BANK_TRANSFER";
}

class WalletBankingLendingService {
  /**
   * Wallet-to-wallet transfer.
   */
  walletTransfer(
    request: WalletOperationRequest
  ): DigitalPayOperationResult {
    const transaction =
      paymentTransactionService.createTransaction({
        type: "WALLET_TRANSFER",

        channel:
          request.channel ?? "WALLET",

        payeeCode:
          request.payeeCode,

        amount:
          request.amount,

        currency:
          request.currency,

        payerReference:
          request.payerReference,

        description:
          request.description ??
          "Digital wallet transfer",

        metadata:
          request.metadata,
      });

    return {
      transaction,
      operation: "WALLET_TRANSFER",
    };
  }

  /**
   * Loan disbursement.
   *
   * The lending/credit decision is performed by the
   * appropriate financial runtime; Digital Pay performs
   * payment orchestration.
   */
  loanDisbursement(
    request: LoanOperationRequest
  ): DigitalPayOperationResult {
    const transaction =
      paymentTransactionService.createTransaction({
        type: "LOAN_DISBURSEMENT",

        channel: "BANK",

        payeeCode:
          request.payeeCode,

        amount:
          request.amount,

        currency:
          request.currency,

        payerReference:
          request.payerReference,

        description:
          request.description ??
          "Loan disbursement",

        metadata: {
          loanReference:
            request.loanReference,

          ...request.metadata,
        },
      });

    return {
      transaction,
      operation: "LOAN_DISBURSEMENT",
    };
  }

  /**
   * Loan repayment.
   */
  loanRepayment(
    request: LoanOperationRequest
  ): DigitalPayOperationResult {
    const transaction =
      paymentTransactionService.createTransaction({
        type: "LOAN_REPAYMENT",

        channel:
          request.channel ?? "MOBILE_MONEY",

        payeeCode:
          request.payeeCode,

        amount:
          request.amount,

        currency:
          request.currency,

        payerReference:
          request.payerReference,

        description:
          request.description ??
          "Loan repayment",

        metadata: {
          loanReference:
            request.loanReference,

          ...request.metadata,
        },
      });

    return {
      transaction,
      operation: "LOAN_REPAYMENT",
    };
  }

  /**
   * Bank transfer.
   */
  bankTransfer(
    request: BankingOperationRequest
  ): DigitalPayOperationResult {
    const transaction =
      paymentTransactionService.createTransaction({
        type: "BANK_TRANSFER",

        channel: "BANK",

        payeeCode:
          request.payeeCode,

        amount:
          request.amount,

        currency:
          request.currency,

        payerReference:
          request.payerReference,

        description:
          request.description ??
          "Digital Pay bank transfer",

        metadata: {
          bankReference:
            request.bankReference,

          ...request.metadata,
        },
      });

    return {
      transaction,
      operation: "BANK_TRANSFER",
    };
  }

  /**
   * Standard payment lifecycle.
   *
   * This is intentionally deterministic:
   *
   * CREATED
   * → QUEUED
   * → PROCESSING
   * → AUTHORIZED
   * → SETTLED
   */
  processToSettlement(
    transactionId: string
  ): PaymentTransaction | null {
    let transaction =
      paymentTransactionService.queueTransaction(
        transactionId
      );

    if (!transaction) {
      return null;
    }

    transaction =
      paymentTransactionService.processTransaction(
        transactionId
      );

    transaction =
      paymentTransactionService.authorizeTransaction(
        transactionId
      );

    transaction =
      paymentTransactionService.settleTransaction(
        transactionId
      );

    return transaction;
  }
}

export const walletBankingLendingService =
  new WalletBankingLendingService();

export default walletBankingLendingService;
