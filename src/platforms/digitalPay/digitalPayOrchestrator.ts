/**
 * JUMO DIGITAL PAY
 * Sovereign Payment Switch & Universal Multi-Rail Gateway Orchestrator
 * Authority: JUMO UEOS Architecture V2.0
 */

import { faapEnterpriseEngine } from "../faap/faapEnterpriseEngine";
import type {
  PaymentDomain,
  PaymentRail,
  PaymentSwitchReceipt,
  SettlementReconciliationBatch,
  SovereignPayCode,
  UniversalPaymentRequest,
} from "./digitalPayTypes";

export class DigitalPayOrchestrator {
  private payCodes = new Map<string, SovereignPayCode>();
  private receipts = new Map<string, PaymentSwitchReceipt>();
  private idempotencyRegistry = new Map<string, PaymentSwitchReceipt>();
  private settlementBatches: SettlementReconciliationBatch[] = [];

  constructor() {
    this.seedSovereignPayCodes();
  }

  private seedSovereignPayCodes() {
    const codes: SovereignPayCode[] = [
      {
        payCode: "PAY-EDU-2026",
        institutionName: "Uganda Martyrs High School & University Campus",
        domain: "TUITION_EDUCATION",
        defaultCurrency: "UGX",
        active: true,
        settlementAccountId: "acct-4010",
        allowedRails: ["MTN_MOMO", "AIRTEL_MONEY", "BANK_EFT", "DYNAMIC_QR"],
        splitConfig: { platformFeeRate: 0.015, merchantNetRate: 0.985 },
      },
      {
        payCode: "PAY-MED-8834",
        institutionName: "Kampala Metropolitan Medical Clinic",
        domain: "HEALTH_CLINICAL",
        defaultCurrency: "UGX",
        active: true,
        settlementAccountId: "acct-4010",
        allowedRails: ["MTN_MOMO", "AIRTEL_MONEY", "VISA_MASTERCARD"],
        splitConfig: { platformFeeRate: 0.015, merchantNetRate: 0.985 },
      },
      {
        payCode: "PAY-SACCO-1092",
        institutionName: "Wakulima Savings & Credit Cooperative Society",
        domain: "COMMUNITY_SACCO",
        defaultCurrency: "UGX",
        active: true,
        settlementAccountId: "acct-2500",
        allowedRails: ["MTN_MOMO", "AIRTEL_MONEY", "BANK_EFT", "INTERNAL_WALLET"],
        splitConfig: { platformFeeRate: 0.015, merchantNetRate: 0.985 },
      },
      {
        payCode: "PAY-CHURCH-0051",
        institutionName: "Grace Cathedral International Benevolence & Tithes",
        domain: "FAITH_BENEVOLENCE",
        defaultCurrency: "UGX",
        active: true,
        settlementAccountId: "acct-4020",
        allowedRails: ["MTN_MOMO", "AIRTEL_MONEY", "DYNAMIC_QR"],
        splitConfig: { platformFeeRate: 0.015, merchantNetRate: 0.985 },
      },
    ];

    codes.forEach(c => this.payCodes.set(c.payCode, c));
  }

  // ==========================================
  // 1. SOVEREIGN PAYCODE REGISTRY
  // ==========================================

  registerPayCode(payCodeData: SovereignPayCode): SovereignPayCode {
    this.payCodes.set(payCodeData.payCode, payCodeData);
    return payCodeData;
  }

  resolvePayCode(payCode: string): SovereignPayCode | undefined {
    return this.payCodes.get(payCode);
  }

  getAllPayCodes(): SovereignPayCode[] {
    return Array.from(this.payCodes.values());
  }

  // ==========================================
  // 2. UNIVERSAL PAYMENT TRANSACTION DISPATCH
  // ==========================================

  processPayment(request: UniversalPaymentRequest): PaymentSwitchReceipt {
    if (!request.idempotencyKey || !request.idempotencyKey.trim()) {
      throw new Error("DIGITAL PAY ERROR: Idempotency key is required.");
    }

    // Check Idempotency Cache
    if (this.idempotencyRegistry.has(request.idempotencyKey)) {
      const existing = this.idempotencyRegistry.get(request.idempotencyKey)!;
      return { ...existing, isDuplicate: true };
    }

    const payCode = this.payCodes.get(request.payCode);
    if (!payCode) {
      throw new Error(`DIGITAL PAY ERROR: Sovereign PayCode ${request.payCode} not registered.`);
    }

    if (!payCode.active) {
      throw new Error(`DIGITAL PAY ERROR: PayCode ${request.payCode} is currently deactivated.`);
    }

    if (!payCode.allowedRails.includes(request.rail)) {
      throw new Error(`DIGITAL PAY ERROR: Rail ${request.rail} not permitted on PayCode ${request.payCode}.`);
    }

    const grossAmount = request.amount;
    const platformFeeRate = payCode.splitConfig.platformFeeRate;
    const platformFee = grossAmount * platformFeeRate;
    const merchantNetAmount = grossAmount - platformFee;

    const publicRef = `JDP-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;

    // Dispatch automated clearing & 1.5% split into FAAP Statutory Ledger
    const faapSplit = faapEnterpriseEngine.processClearingFeeSplit(
      publicRef,
      grossAmount,
      request.currency || payCode.defaultCurrency,
      platformFeeRate,
    );

    const receipt: PaymentSwitchReceipt = {
      transactionId: `tx-sw-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      publicReference: publicRef,
      payCode: payCode.payCode,
      institutionName: payCode.institutionName,
      domain: payCode.domain,
      rail: request.rail,
      grossAmount,
      platformFee,
      merchantNetAmount,
      currency: request.currency || payCode.defaultCurrency,
      status: "SETTLED",
      faapJournalRef: `CLEAR-${publicRef}`,
      timestamp: new Date().toISOString(),
      isDuplicate: false,
      isOfflineQueued: false,
    };

    this.receipts.set(receipt.transactionId, receipt);
    this.idempotencyRegistry.set(request.idempotencyKey, receipt);

    return receipt;
  }

  getReceipts(): PaymentSwitchReceipt[] {
    return Array.from(this.receipts.values());
  }

  // ==========================================
  // 3. SETTLEMENT RECONCILIATION
  // ==========================================

  runSettlementReconciliation(): SettlementReconciliationBatch {
    const allReceipts = Array.from(this.receipts.values()).filter(r => r.status === "SETTLED");
    const totalTransactions = allReceipts.length;
    const totalGrossVolume = allReceipts.reduce((s, r) => s + r.grossAmount, 0);
    const totalPlatformFees = allReceipts.reduce((s, r) => s + r.platformFee, 0);
    const totalMerchantNetSettled = allReceipts.reduce((s, r) => s + r.merchantNetAmount, 0);

    const batch: SettlementReconciliationBatch = {
      batchId: `BATCH-REC-${Date.now()}`,
      date: new Date().toISOString().slice(0, 10),
      totalTransactions,
      totalGrossVolume,
      totalPlatformFees,
      totalMerchantNetSettled,
      status: "BALANCED_SETTLED",
      faapBatchRef: `FAAP-REC-${Date.now().toString(36).toUpperCase()}`,
    };

    this.settlementBatches.push(batch);
    return batch;
  }

  getSettlementBatches(): SettlementReconciliationBatch[] {
    return [...this.settlementBatches];
  }
}

export const digitalPayOrchestrator = new DigitalPayOrchestrator();
