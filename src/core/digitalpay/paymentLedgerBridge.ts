/**
 * JUMO DIGITAL PAY
 * Payment Transfer & Ledger Bridge
 *
 * Controlled movement layer between:
 *
 * Digital Pay
 *   ↓
 * Wallet / Account Service
 *   ↓
 * Payment Ledger
 *   ↓
 * FAAP / Settlement
 *
 * UI components must never modify balances directly.
 */

import {
  walletAccountService,
} from "./walletAccountService";

export interface PaymentTransferRequest {
  transferId: string;

  debitAccountId: string;

  creditAccountId: string;

  amount: number;

  currency: string;

  publicReference: string;

  description?: string;
}

export interface PaymentTransferResult {
  transferId: string;

  publicReference: string;

  amount: number;

  currency: string;

  status:
    | "SETTLED"
    | "FAILED";

  createdAt: string;
}

class PaymentLedgerBridge {
  private readonly transfers =
    new Map<
      string,
      PaymentTransferResult
    >();

  /**
   * Execute a controlled account transfer.
   *
   * Both sides must belong to the same currency.
   */
  transfer(
    request: PaymentTransferRequest
  ): PaymentTransferResult {
    if (
      request.amount <= 0
    ) {
      throw new Error(
        "Digital Pay: transfer amount must be positive"
      );
    }

    if (
      request.debitAccountId ===
      request.creditAccountId
    ) {
      throw new Error(
        "Digital Pay: debit and credit accounts must differ"
      );
    }

    if (
      this.transfers.has(
        request.transferId
      )
    ) {
      return this.transfers.get(
        request.transferId
      )!;
    }

    const debit =
      walletAccountService
        .getAccount(
          request.debitAccountId
        );

    const credit =
      walletAccountService
        .getAccount(
          request.creditAccountId
        );

    if (!debit) {
      throw new Error(
        "Digital Pay: debit account not found"
      );
    }

    if (!credit) {
      throw new Error(
        "Digital Pay: credit account not found"
      );
    }

    if (
      debit.currency !==
      request.currency
    ) {
      throw new Error(
        "Digital Pay: debit currency mismatch"
      );
    }

    if (
      credit.currency !==
      request.currency
    ) {
      throw new Error(
        "Digital Pay: credit currency mismatch"
      );
    }

    /**
     * Debit first.
     */
    walletAccountService.debit(
      request.debitAccountId,
      request.amount,
      request.publicReference
    );

    /**
     * Credit destination.
     */
    try {
      walletAccountService.credit(
        request.creditAccountId,
        request.amount,
        request.publicReference
      );
    } catch (error) {
      /**
       * Compensating credit protects the
       * source account if destination posting
       * fails.
       */
      walletAccountService.credit(
        request.debitAccountId,
        request.amount,
        `REVERSAL-${request.publicReference}`
      );

      throw error;
    }

    const result:
      PaymentTransferResult = {
      transferId:
        request.transferId,

      publicReference:
        request.publicReference,

      amount:
        request.amount,

      currency:
        request.currency,

      status:
        "SETTLED",

      createdAt:
        new Date().toISOString(),
    };

    this.transfers.set(
      request.transferId,
      result
    );

    return result;
  }

  /**
   * Verify an existing transfer.
   */
  getTransfer(
    transferId: string
  ) {
    return (
      this.transfers.get(
        transferId
      ) ?? null
    );
  }

  /**
   * Check whether a transfer has settled.
   */
  isSettled(
    transferId: string
  ): boolean {
    return (
      this.transfers.get(
        transferId
      )?.status ===
      "SETTLED"
    );
  }

  /**
   * Internal reconciliation summary.
   */
  getSummary() {
    const transfers =
      Array.from(
        this.transfers.values()
      );

    return {
      total:
        transfers.length,

      settled:
        transfers.filter(
          transfer =>
            transfer.status ===
            "SETTLED"
        ).length,

      failed:
        transfers.filter(
          transfer =>
            transfer.status ===
            "FAILED"
        ).length,

      volume:
        transfers.reduce(
          (sum, transfer) =>
            sum + transfer.amount,
          0
        ),
    };
  }
}

export const paymentLedgerBridge =
  new PaymentLedgerBridge();

export default paymentLedgerBridge;
