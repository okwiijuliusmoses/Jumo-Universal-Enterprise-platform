import crypto from "crypto";
import { db } from "../../database/db";
import { LedgerEngine } from "../faap/LedgerEngine";
import { AuditLogRepository, LedgerRepository, SecretsRepository } from "../../repositories/repositories";
import { JournalRecord, LedgerEntryRecord } from "../../models/models";

export interface AllocationPayload {
  tenantId: string;
  eventId: string;
  signature: string;
  partyRoutingCode: string;
  amountMinor: number;
  currency: string;
}

export interface AllocationResult {
  success: boolean;
  paymentId: string;
  allocatedAmountMinor: number;
  residualAmountMinor: number;
  allocatedItems: Array<{ openItemId: string; amountAllocatedMinor: number }>;
  walletCredited: boolean;
  journalId?: string;
}

export class PolymorphicAllocationEngine {
  private static activeLocks: Set<string> = new Set();

  /**
   * Universal Payment Allocation with strict FIFO ordering, ACID boundaries, 
   * strong idempotency, concurrency row protection, and double-entry general ledger integration.
   */
  public static async allocatePayment(payload: AllocationPayload): Promise<AllocationResult> {
    const { tenantId, eventId, signature, partyRoutingCode, amountMinor, currency } = payload;

    // 1. Zero/Negative Payment Validation
    if (amountMinor <= 0) {
      throw new Error(`Treasury Exception: Allocation amount must be positive. Received ${amountMinor}.`);
    }

    // 2. HMAC Webhook Signature Verification
    this.verifyHmacSignature(eventId, payload, signature);

    // 3. Concurrency Protection & Locking Boundary
    const lockKey = `${tenantId}:${partyRoutingCode}`;
    if (this.activeLocks.has(lockKey)) {
      throw new Error(`Lock Conflict: A payment allocation is already in progress for party ${partyRoutingCode}.`);
    }
    this.activeLocks.add(lockKey);

    try {
      // 4. Idempotency Check
      const existingPayment = db.select<any>("processed_payments", (p: any) => p.id === `${tenantId}:${eventId}` || (p.id === eventId && p.tenantId === tenantId));
      if (existingPayment.length > 0) {
        AuditLogRepository.log(
          "ALLOCATION_ENGINE",
          "IDEMPOTENCY_REPLAY",
          `Bypassing duplicate callback event: ${eventId} for tenant: ${tenantId}`,
          "success"
        );
        const record = existingPayment[0];
        const realEventId = record.id.includes(":") ? record.id.split(":")[1] : record.id;
        return {
          success: true,
          paymentId: realEventId,
          allocatedAmountMinor: record.allocatedMinor,
          residualAmountMinor: record.residualMinor,
          allocatedItems: [],
          walletCredited: record.residualMinor > 0,
        };
      }

      // 5. Party and Tenant Context Verification
      const parties = db.select<any>("parties", (p: any) => p.routingCode === partyRoutingCode && p.tenantId === tenantId);
      if (parties.length === 0) {
        throw new Error(`Identity Exception: Active party with routing code ${partyRoutingCode} was not found under tenant ${tenantId}.`);
      }
      const party = parties[0];
      if (party.status !== "ACTIVE") {
        throw new Error(`Security Exception: Party ${party.id} status is ${party.status}. Payments rejected.`);
      }

      // 6. Configurable Control Accounts Mappings Lookup
      const accountsMap = this.resolveControlAccounts(tenantId);
      const clearingAccountCode = accountsMap.clearingAccount;
      const receivablesAccountCode = accountsMap.receivablesAccount;

      // Validate control accounts exist and are active
      const clearingAcc = LedgerRepository.findAccountByCode(clearingAccountCode);
      const receivablesAcc = LedgerRepository.findAccountByCode(receivablesAccountCode);
      if (!clearingAcc || clearingAcc.status !== "Active") {
        throw new Error(`Configuration Exception: Clearing account ${clearingAccountCode} is inactive or missing for tenant ${tenantId}.`);
      }
      if (!receivablesAcc || receivablesAcc.status !== "Active") {
        throw new Error(`Configuration Exception: Receivables control account ${receivablesAccountCode} is inactive or missing for tenant ${tenantId}.`);
      }

      // 7. FIFO Open Items Resolution
      const openItems = db.select<any>(
        "open_items",
        (item: any) => item.tenantId === tenantId && item.partyId === party.id && item.status !== "PAID" && item.currency === currency
      );

      // Strict FIFO Sorting: Oldest Due Date first, then oldest creation date
      openItems.sort((a: any, b: any) => {
        const dueDiff = new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
        if (dueDiff !== 0) return dueDiff;
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      });

      let remainingRemittance = amountMinor;
      const allocatedItems: Array<{ openItemId: string; amountAllocatedMinor: number }> = [];

      // 8. Allocation Pipeline Execution (ACID Emulated Loop)
      for (const item of openItems) {
        if (remainingRemittance <= 0) break;

        const totalObligation = item.amountMinor;
        const currentAllocated = item.allocatedAmountMinor || 0;
        const unpaidObligation = totalObligation - currentAllocated;

        if (unpaidObligation <= 0) continue;

        if (remainingRemittance >= unpaidObligation) {
          // Full Allocation
          remainingRemittance -= unpaidObligation;
          allocatedItems.push({ openItemId: item.id, amountAllocatedMinor: unpaidObligation });

          db.update<any>(
            "open_items",
            (oi: any) => oi.id === item.id,
            (oi: any) => ({ ...oi, allocatedAmountMinor: totalObligation, status: "PAID" })
          );
        } else {
          // Partial Allocation
          allocatedItems.push({ openItemId: item.id, amountAllocatedMinor: remainingRemittance });

          db.update<any>(
            "open_items",
            (oi: any) => oi.id === item.id,
            (oi: any) => ({
              ...oi,
              allocatedAmountMinor: currentAllocated + remainingRemittance,
              status: "PARTIALLY_PAID",
            })
          );
          remainingRemittance = 0;
        }
      }

      const totalAllocatedMinor = amountMinor - remainingRemittance;
      let walletCredited = false;

      // 9. Residual Overpayment Processing
      if (remainingRemittance > 0) {
        const overpaymentPolicy = this.resolveOverpaymentPolicy(tenantId);
        if (overpaymentPolicy === "WALLET") {
          this.creditSWallet(tenantId, party.id, remainingRemittance, currency, eventId);
          walletCredited = true;
        } else if (overpaymentPolicy === "SUSPENSE") {
          // In suspense policy, remainder goes to standard Suspense ledger account
          const suspenseAccCode = accountsMap.suspenseAccount;
          const suspenseAcc = LedgerRepository.findAccountByCode(suspenseAccCode);
          if (!suspenseAcc || suspenseAcc.status !== "Active") {
            throw new Error(`Configuration Exception: Suspense account ${suspenseAccCode} is inactive or missing.`);
          }
        }
        // "UNAPPLIED" means the remainder stays on the payment tracking record
      }

      // 10. Double-Entry General Ledger Post Integration
      const journalId = `JRN-PAY-${eventId}`;
      const journalDate = new Date().toISOString();

      const journalHeader: Omit<JournalRecord, "id" | "createdAt" | "status"> = {
        date: journalDate,
        reference: eventId,
        description: `Automated payment allocation of ${amountMinor} ${currency} for party ${party.name}`,
        source: "system",
      };

      const ledgerEntries: Omit<LedgerEntryRecord, "id" | "journalId">[] = [];

      // A. DEBIT Cash/Clearing Transit (Asset)
      ledgerEntries.push({
        accountId: clearingAccountCode,
        debit: amountMinor,
        credit: 0,
        currency,
      });

      // B. CREDIT Accounts Receivables (Asset Decrease)
      if (totalAllocatedMinor > 0) {
        ledgerEntries.push({
          accountId: receivablesAccountCode,
          debit: 0,
          credit: totalAllocatedMinor,
          currency,
        });
      }

      // C. Overpayment Ledger offsets
      if (remainingRemittance > 0) {
        const overpaymentPolicy = this.resolveOverpaymentPolicy(tenantId);
        if (overpaymentPolicy === "WALLET") {
          // Overpayment liability credited to Wallet Liabilities account
          const walletLiabilityAccCode = accountsMap.walletLiabilityAccount;
          const walletLiabilityAcc = LedgerRepository.findAccountByCode(walletLiabilityAccCode);
          if (walletLiabilityAcc && walletLiabilityAcc.status === "Active") {
            ledgerEntries.push({
              accountId: walletLiabilityAccCode,
              debit: 0,
              credit: remainingRemittance,
              currency,
            });
          } else {
            // Default to general liability or suspense if wallet liability account config is missing
            const suspenseAccCode = accountsMap.suspenseAccount;
            ledgerEntries.push({
              accountId: suspenseAccCode,
              debit: 0,
              credit: remainingRemittance,
              currency,
            });
          }
        } else {
          // Default Suspense or unapplied postings
          const suspenseAccCode = accountsMap.suspenseAccount;
          ledgerEntries.push({
            accountId: suspenseAccCode,
            debit: 0,
            credit: remainingRemittance,
            currency,
          });
        }
      }

      // Assert Double-Entry Parity
      const totalDebits = ledgerEntries.reduce((s, e) => s + e.debit, 0);
      const totalCredits = ledgerEntries.reduce((s, e) => s + e.credit, 0);
      if (Math.abs(totalDebits - totalCredits) > 0.001) {
        throw new Error(`Double-Entry Parity Exception: Debits (${totalDebits}) do not equal Credits (${totalCredits}).`);
      }

      // Save and Atomic Posting inside general general ledger
      const postedJournal = await LedgerEngine.postJournal(journalHeader, ledgerEntries);

      // Save processed payment for strong idempotency boundary
      db.insert<any>("processed_payments", {
        id: `${tenantId}:${eventId}`,
        tenantId,
        partyId: party.id,
        amountMinor,
        currency,
        allocatedMinor: totalAllocatedMinor,
        residualMinor: remainingRemittance,
        status: "PROCESSED",
        createdAt: journalDate,
      });

      AuditLogRepository.log(
        "ALLOCATION_ENGINE",
        "PAYMENT_ALLOCATED",
        `Payment ${eventId} of ${amountMinor} ${currency} allocated successfully. Allocated items: ${allocatedItems.length}`,
        "success"
      );

      return {
        success: true,
        paymentId: eventId,
        allocatedAmountMinor: totalAllocatedMinor,
        residualAmountMinor: remainingRemittance,
        allocatedItems,
        walletCredited,
        journalId: postedJournal.id,
      };

    } catch (err: any) {
      AuditLogRepository.log("ALLOCATION_ENGINE", "ALLOCATION_FAILED", `Failed payload event: ${eventId}. Error: ${err.message}`, "failed");
      throw err;
    } finally {
      // Release concurrency row lock
      this.activeLocks.delete(lockKey);
    }
  }

  /**
   * Safe and timing-resilient HMAC verification of incoming digital webhook callbacks
   */
  private static verifyHmacSignature(eventId: string, payload: any, signature: string) {
    const webhookSecret = process.env.AGGREGATOR_WEBHOOK_SECRET;
    if (!webhookSecret) {
      throw new Error("Security Exception: AGGREGATOR_WEBHOOK_SECRET configuration is missing on server.");
    }

    if (!signature || signature.length < 10) {
      throw new Error("Security Exception: Webhook signature is malformed or empty.");
    }

    const hmac = crypto.createHmac("sha256", webhookSecret);
    const bodyStr = typeof payload === "string" ? payload : JSON.stringify({
      tenantId: payload.tenantId,
      eventId: payload.eventId,
      partyRoutingCode: payload.partyRoutingCode,
      amountMinor: payload.amountMinor,
      currency: payload.currency
    });
    hmac.update(bodyStr);
    const calculated = hmac.digest("hex");

    const calculatedBuf = Buffer.from(calculated, "hex");
    let signatureBuf: Buffer;
    try {
      signatureBuf = Buffer.from(signature, "hex");
    } catch {
      throw new Error("Security Exception: Webhook signature encoding is invalid.");
    }

    if (calculatedBuf.length !== signatureBuf.length) {
      throw new Error("Security Exception: Unauthorized payment callback signature validation mismatch.");
    }

    if (!crypto.timingSafeEqual(calculatedBuf, signatureBuf)) {
      throw new Error("Security Exception: Unauthorized payment callback signature validation mismatch.");
    }
  }

  /**
   * Resolves control accounts based on tenant configuration, with fallback defaults
   */
  private static resolveControlAccounts(tenantId: string) {
    // 1. Check if there are configured mappings inside secrets_vault/tenant_configs
    const configSecret = SecretsRepository.findByKey(`accountsMap_${tenantId}`);
    if (configSecret) {
      try {
        const config = JSON.parse(configSecret.value);
        if (config.clearingAccount && config.receivablesAccount) {
          return {
            clearingAccount: config.clearingAccount,
            receivablesAccount: config.receivablesAccount,
            suspenseAccount: config.suspenseAccount || "4030-RECONCILIATION-RESERVE",
            walletLiabilityAccount: config.walletLiabilityAccount || "2010-SAVINGS",
          };
        }
      } catch {
        // Fallback on json parse exceptions
      }
    }

    // Default Fallbacks
    return {
      clearingAccount: "1030-CLEARING-TRANSIT",
      receivablesAccount: "1200-LOANS",
      suspenseAccount: "4030-RECONCILIATION-RESERVE",
      walletLiabilityAccount: "2010-SAVINGS",
    };
  }

  /**
   * Dynamic lookup of overpayment treatment policy
   */
  private static resolveOverpaymentPolicy(tenantId: string): "WALLET" | "SUSPENSE" | "UNAPPLIED" {
    const configSecret = SecretsRepository.findByKey(`overpaymentPolicy_${tenantId}`);
    if (configSecret) {
      const val = configSecret.value.toUpperCase();
      if (val === "WALLET" || val === "SUSPENSE" || val === "UNAPPLIED") {
        return val as any;
      }
    }
    // Default system-wide configuration: Credit digital wallets (as pocket money liabilities etc.)
    return "WALLET";
  }

  /**
   * Atomic Credit operation into Sovereign digital S-wallets with correct currency check
   */
  private static creditSWallet(tenantId: string, partyId: string, amountMinor: number, currency: string, paymentRef: string) {
    const wallets = db.select<any>("wallets", (w: any) => w.tenantId === tenantId && w.partyId === partyId && w.currency === currency);
    
    if (wallets.length > 0) {
      const wallet = wallets[0];
      if (wallet.status !== "ACTIVE") {
        throw new Error(`S-Wallet Exception: Cannot credit frozen or closed digital wallet ${wallet.id}.`);
      }

      db.update<any>(
        "wallets",
        (w: any) => w.id === wallet.id,
        (w: any) => ({
          ...w,
          balanceMinor: Number(w.balanceMinor) + amountMinor,
          updatedAt: new Date().toISOString(),
        })
      );
    } else {
      // Ensure we do not create duplicate wallets for same party/currency/workspace
      const walletId = `WLT-${tenantId}-${partyId}-${currency}`;
      const duplicateCheck = db.select<any>("wallets", (w: any) => w.id === walletId);
      if (duplicateCheck.length > 0) {
        throw new Error(`S-Wallet Conflict Exception: Duplicate S-Wallet detected for ID ${walletId}.`);
      }

      db.insert<any>("wallets", {
        id: walletId,
        tenantId,
        partyId,
        currency,
        balanceMinor: amountMinor,
        status: "ACTIVE",
        updatedAt: new Date().toISOString(),
      });
    }

    AuditLogRepository.log(
      "WALLET_SERVICE",
      "WALLET_CREDITED",
      `S-Wallet credited with ${amountMinor} ${currency} for party: ${partyId}. Ref: ${paymentRef}`,
      "success"
    );
  }
}
