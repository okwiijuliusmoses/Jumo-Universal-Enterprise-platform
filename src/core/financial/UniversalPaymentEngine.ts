// ============================================================================
// UNIVERSAL PAYMENT ENGINE: ALLOCATION, CLEARING & LEDGER INTEGRITY
// ============================================================================

import { JUMODBEngine } from "../../database/db";
import { UniversalAccountingEngine, JournalEntry } from "./UniversalAccountingEngine";

export interface PaymentPayload {
  tenantId: string;
  workspaceId: string;
  partyId: string;
  amountMinor: number;
  currencyCode: string;
  method: string;
  reference: string;
  providerTxId?: string;
  metadata?: Record<string, any>;
  // Configured target accounts from tenant metadata
  clearingAccountId: string;
  receivablesAccountId: string;
  walletAccountId: string;
}

export class UniversalPaymentEngine {
  private db: JUMODBEngine;
  private accounting: UniversalAccountingEngine;

  constructor() {
    this.db = JUMODBEngine.getInstance();
    this.accounting = new UniversalAccountingEngine();
  }

  /**
   * Process a universal payment.
   * Maps payment intent to authoritative ledger postings and open item allocations.
   */
  public async processPayment(payload: PaymentPayload): Promise<{ success: boolean; paymentId: string; journalId: string }> {
    const paymentId = `PAY-${payload.reference}-${Date.now()}`;
    const journalId = `JRN-${paymentId}`;

    // 1. Persist Payment Record
    this.db.insert("payments", {
      id: paymentId,
      tenant_id: payload.tenantId,
      party_id: payload.partyId,
      payment_method: payload.method,
      amount_minor: payload.amountMinor,
      currency_code: payload.currencyCode,
      reference: payload.reference,
      provider_tx_id: payload.providerTxId,
      status: "COMPLETED",
      created_at: new Date().toISOString()
    });

    // 2. Perform Open Item Allocation (FIFO)
    let remainingToAllocate = payload.amountMinor;
    const openItems = this.db.select<any>("open_items", (i) => 
      i.tenant_id === payload.tenantId && 
      i.party_id === payload.partyId && 
      i.status === "OPEN" &&
      i.direction === "DEBIT" // We only allocate payments to Debits/Receivables
    ).sort((a, b) => new Date(a.due_date).getTime() - new Date(b.due_date).getTime());

    for (const item of openItems) {
      if (remainingToAllocate <= 0) break;

      const allocationAmount = Math.min(item.remaining_minor, remainingToAllocate);
      remainingToAllocate -= allocationAmount;

      this.db.insert("payment_allocations", {
        tenant_id: payload.tenantId,
        payment_id: paymentId,
        open_item_id: item.id,
        amount_minor: allocationAmount,
        created_at: new Date().toISOString()
      });

      const newRemaining = item.remaining_minor - allocationAmount;
      this.db.update(
        "open_items",
        (oi: any) => oi.id === item.id,
        (current: any) => ({
          ...current,
          remaining_minor: newRemaining,
          status: newRemaining === 0 ? "PAID" : "PARTIAL"
        })
      );
    }

    // 3. Handle Residual / Wallet Overflow
    if (remainingToAllocate > 0) {
      const wallet = this.db.select<any>("digital_wallets", (w) => 
        w.tenant_id === payload.tenantId && w.party_id === payload.partyId
      )[0];

      if (wallet) {
        this.db.update(
          "digital_wallets",
          (w: any) => w.id === wallet.id,
          (current: any) => ({
            ...current,
            balance_minor: current.balance_minor + remainingToAllocate,
            updated_at: new Date().toISOString()
          })
        );
      } else {
        this.db.insert("digital_wallets", {
          id: `WLT-${payload.partyId}`,
          tenant_id: payload.tenantId,
          party_id: payload.partyId,
          balance_minor: remainingToAllocate,
          currency: payload.currencyCode,
          status: "ACTIVE",
          updated_at: new Date().toISOString()
        });
      }
    }

    // 4. Construct & Post Double-Entry Journal
    const journal: JournalEntry = {
      id: journalId,
      tenant_id: payload.tenantId,
      workspace_id: payload.workspaceId,
      posting_date: new Date().toISOString().split("T")[0],
      reference: payload.reference,
      description: `Payment Allocation: ${payload.method} ref ${payload.reference}`,
      source: "PAYMENTS_ENGINE",
      currency_code: payload.currencyCode,
      exchange_rate: 1.0,
      lines: [
        {
          ledger_account_id: payload.clearingAccountId,
          debit_minor: payload.amountMinor,
          credit_minor: 0
        },
        {
          ledger_account_id: payload.receivablesAccountId,
          debit_minor: 0,
          credit_minor: payload.amountMinor - remainingToAllocate
        }
      ]
    };

    // If there's overflow, add the credit line for the liability (wallet)
    if (remainingToAllocate > 0) {
      journal.lines.push({
        ledger_account_id: payload.walletAccountId,
        debit_minor: 0,
        credit_minor: remainingToAllocate
      });
    }

    await this.accounting.postJournal(journal);

    return { success: true, paymentId, journalId };
  }
}
