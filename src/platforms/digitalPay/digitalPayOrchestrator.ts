/**
 * JUMO DIGITAL PAY
 * Sovereign Payment Switch & Universal Multi-Rail Gateway Orchestrator
 * Authority: JUMO UEOS Architecture V2.0
 */

import fs from "fs";
import path from "path";
import { faapEnterpriseEngine } from "../faap/faapEnterpriseEngine";
import type {
  PaymentDomain,
  PaymentRail,
  PaymentSwitchReceipt,
  SettlementReconciliationBatch,
  SovereignPayCode,
  UniversalPaymentRequest,
} from "./digitalPayTypes";

export interface DigitalPayApplication {
  id: string;
  name: string;
  status: "ACTIVE" | "INACTIVE" | "SUSPENDED";
  permissions: string[];
  supported_currencies: string[];
  channels: string[];
  created_at?: string;
}

export interface DigitalPayMerchant {
  id: string;
  name: string;
  type: "Institution" | "Merchant" | "Agent";
  status: "ACTIVE" | "PENDING";
  created_at: string;
}

export interface DigitalPayInstitution {
  id: string;
  name: string;
  code: string;
  category: string;
  status: "ACTIVE" | "PENDING";
  created_at: string;
}

export interface DigitalPayPayer {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: "ACTIVE" | "INACTIVE";
  created_at: string;
}

export interface DigitalPayMandate {
  id: string;
  payer: string;
  merchant: string;
  amount: number;
  currency: string;
  frequency: string;
  status: "ACTIVE" | "PENDING" | "CANCELLED";
}

export interface DigitalPayDataStore {
  applications: DigitalPayApplication[];
  merchants: DigitalPayMerchant[];
  institutions: DigitalPayInstitution[];
  payers: DigitalPayPayer[];
  mandates: DigitalPayMandate[];
  payCodes: SovereignPayCode[];
  receipts: PaymentSwitchReceipt[];
  settlementBatches: SettlementReconciliationBatch[];
}

const STORAGE_PATH = path.join(process.cwd(), ".jumo", "digitalpay_data.json");

function getDefaultData(): DigitalPayDataStore {
  return {
    applications: [
      {
        id: "APP-EDU-01",
        name: "SchoolPay Educational Gateway",
        status: "ACTIVE",
        permissions: ["CREATE_PRN", "PROCESS_PAYMENT", "REFUND"],
        supported_currencies: ["UGX", "USD"],
        channels: ["MTN_MOMO", "AIRTEL_MONEY", "BANK_EFT", "VISA_MASTERCARD"],
        created_at: "2026-01-10T08:00:00Z"
      },
      {
        id: "APP-GOV-01",
        name: "URA E-Tax Portal",
        status: "ACTIVE",
        permissions: ["CREATE_PRN", "PROCESS_PAYMENT"],
        supported_currencies: ["UGX"],
        channels: ["BANK_EFT", "MTN_MOMO", "AIRTEL_MONEY"],
        created_at: "2026-01-15T09:00:00Z"
      }
    ],
    merchants: [
      { id: "MERCH-991", name: "Uganda Martyrs High School", type: "Institution", status: "ACTIVE", created_at: "2026-01-20T10:00:00Z" },
      { id: "MERCH-992", name: "Jumo Cloud Services", type: "Merchant", status: "ACTIVE", created_at: "2026-02-01T11:00:00Z" }
    ],
    institutions: [
      { id: "INST-001", name: "Uganda Martyrs High School & University Campus", code: "UMHS-101", category: "Education", status: "ACTIVE", created_at: "2026-01-20T10:00:00Z" },
      { id: "INST-002", name: "Kampala Metropolitan Medical Clinic", code: "KMMC-202", category: "Healthcare", status: "ACTIVE", created_at: "2026-02-01T11:00:00Z" }
    ],
    payers: [
      { id: "PAYER-001", name: "Mbabazi John", email: "mbabazi.john@example.org", phone: "+256 701 442 890", status: "ACTIVE", created_at: "2026-02-01T10:00:00Z" },
      { id: "PAYER-002", name: "Nalubega Sarah Grace", email: "sarah.nalubega@example.org", phone: "+256 772 190 281", status: "ACTIVE", created_at: "2026-02-05T11:20:00Z" }
    ],
    mandates: [
      { id: "MND-1001", payer: "Mbabazi John", merchant: "Uganda Martyrs High School", amount: 1500000, currency: "UGX", frequency: "Per Term", status: "ACTIVE" }
    ],
    payCodes: [
      {
        payCode: "PAY-EDU-2026",
        obligationId: "OBL-EDU-2026-01",
        institutionName: "Uganda Martyrs High School & University Campus",
        merchantName: "Uganda Martyrs High School",
        payerName: "Mbabazi John",
        studentCustomer: "Kato Emmanuel Mukasa",
        purpose: "Term 1 Tuition Fees",
        amount: 2000000,
        currency: "UGX",
        defaultCurrency: "UGX",
        domain: "TUITION_EDUCATION",
        active: true,
        status: "ACTIVE",
        settlementAccountId: "acct-4010",
        allowedRails: ["MTN_MOMO", "AIRTEL_MONEY", "BANK_EFT", "DYNAMIC_QR"],
        paymentChannel: "MTN_MOMO",
        reconciliationStatus: "PENDING",
        created_at: "2026-02-01T10:00:00Z",
        expiry_date: "2026-04-30T23:59:59Z",
        splitConfig: { platformFeeRate: 0.015, merchantNetRate: 0.985 }
      },
      {
        payCode: "PAY-MED-8834",
        obligationId: "OBL-MED-2026-02",
        institutionName: "Kampala Metropolitan Medical Clinic",
        merchantName: "Kampala Metropolitan Medical Clinic",
        payerName: "Nalubega Sarah Grace",
        studentCustomer: "Nalubega Sarah Grace",
        purpose: "Clinical Consultation & Telemetry",
        amount: 350000,
        currency: "UGX",
        defaultCurrency: "UGX",
        domain: "HEALTH_CLINICAL",
        active: true,
        status: "ACTIVE",
        settlementAccountId: "acct-4010",
        allowedRails: ["MTN_MOMO", "AIRTEL_MONEY", "VISA_MASTERCARD"],
        paymentChannel: "AIRTEL_MONEY",
        reconciliationStatus: "PENDING",
        created_at: "2026-02-05T11:20:00Z",
        expiry_date: "2026-04-30T23:59:59Z",
        splitConfig: { platformFeeRate: 0.015, merchantNetRate: 0.985 }
      }
    ],
    receipts: [
      {
        transactionId: "tx-sw-1001",
        publicReference: "JDP-UGX-9901-A",
        payCode: "PAY-EDU-2026",
        institutionName: "Uganda Martyrs High School & University Campus",
        domain: "TUITION_EDUCATION",
        rail: "MTN_MOMO",
        grossAmount: 2000000,
        platformFee: 30000,
        merchantNetAmount: 1970000,
        currency: "UGX",
        status: "SETTLED",
        faapJournalRef: "CLEAR-JDP-UGX-9901-A",
        timestamp: "2026-02-10T14:30:00Z",
        isDuplicate: false,
        isOfflineQueued: false
      }
    ],
    settlementBatches: [
      {
        batchId: "BATCH-REC-1001",
        date: "2026-02-10",
        totalTransactions: 1,
        totalGrossVolume: 2000000,
        totalPlatformFees: 30000,
        totalMerchantNetSettled: 1970000,
        status: "BALANCED_SETTLED",
        faapBatchRef: "FAAP-REC-1001"
      }
    ]
  };
}

export class DigitalPayOrchestrator {
  private static instance: DigitalPayOrchestrator;
  private data: DigitalPayDataStore;
  private idempotencyRegistry = new Map<string, PaymentSwitchReceipt>();

  public constructor() {
    this.data = this.loadFromDisk();
  }

  public static getInstance(): DigitalPayOrchestrator {
    if (!DigitalPayOrchestrator.instance) {
      DigitalPayOrchestrator.instance = new DigitalPayOrchestrator();
    }
    return DigitalPayOrchestrator.instance;
  }

  private loadFromDisk(): DigitalPayDataStore {
    try {
      const dir = path.dirname(STORAGE_PATH);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      if (fs.existsSync(STORAGE_PATH)) {
        const raw = fs.readFileSync(STORAGE_PATH, "utf-8");
        const parsed = JSON.parse(raw);
        return {
          applications: parsed.applications || [],
          merchants: parsed.merchants || [],
          institutions: parsed.institutions || [],
          payers: parsed.payers || [],
          mandates: parsed.mandates || [],
          payCodes: parsed.payCodes || [],
          receipts: parsed.receipts || [],
          settlementBatches: parsed.settlementBatches || []
        };
      }
    } catch (err) {
      console.error("[DigitalPayOrchestrator] Failed to read from disk:", err);
    }
    const defaultData = getDefaultData();
    this.saveToDisk(defaultData);
    return defaultData;
  }

  private saveToDisk(dataToSave?: DigitalPayDataStore): void {
    try {
      const dir = path.dirname(STORAGE_PATH);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      const target = dataToSave || this.data;
      if (target) {
        fs.writeFileSync(STORAGE_PATH, JSON.stringify(target, null, 2), "utf-8");
      }
    } catch (err) {
      console.error("[DigitalPayOrchestrator] Failed to save to disk:", err);
    }
  }

  // Applications
  public getApplications(): DigitalPayApplication[] {
    return this.data.applications;
  }

  public addApplication(app: Omit<DigitalPayApplication, "id" | "created_at">): DigitalPayApplication {
    const newApp: DigitalPayApplication = {
      ...app,
      id: `APP-${Date.now().toString(36).toUpperCase()}`,
      created_at: new Date().toISOString()
    };
    this.data.applications.push(newApp);
    this.saveToDisk();
    return newApp;
  }

  public toggleApplicationStatus(id: string): DigitalPayApplication {
    const app = this.data.applications.find(a => a.id === id);
    if (!app) {
      throw new Error(`DigitalPay Application ${id} not found`);
    }
    app.status = app.status === "ACTIVE" ? "SUSPENDED" : "ACTIVE";
    this.saveToDisk();
    return app;
  }

  // Merchants
  public getMerchants(): DigitalPayMerchant[] {
    return this.data.merchants;
  }

  public addMerchant(merchant: Partial<DigitalPayMerchant>): DigitalPayMerchant {
    const newMerch: DigitalPayMerchant = {
      id: `MERCH-${Date.now().toString(36).toUpperCase()}`,
      name: merchant.name || "Unnamed Merchant",
      type: merchant.type || "Merchant",
      status: "ACTIVE",
      created_at: new Date().toISOString()
    };
    this.data.merchants.push(newMerch);
    this.saveToDisk();
    return newMerch;
  }

  // Institutions
  public getInstitutions(): DigitalPayInstitution[] {
    return this.data.institutions;
  }

  public addInstitution(inst: Partial<DigitalPayInstitution>): DigitalPayInstitution {
    const newInst: DigitalPayInstitution = {
      id: `INST-${Date.now().toString(36).toUpperCase()}`,
      name: inst.name || "New Institution",
      code: inst.code || `INST-${Math.floor(Math.random() * 900) + 100}`,
      category: inst.category || "General",
      status: "ACTIVE",
      created_at: new Date().toISOString()
    };
    this.data.institutions.push(newInst);
    this.saveToDisk();
    return newInst;
  }

  // Payers
  public getPayers(): DigitalPayPayer[] {
    return this.data.payers;
  }

  public addPayer(payer: Partial<DigitalPayPayer>): DigitalPayPayer {
    const newPayer: DigitalPayPayer = {
      id: `PAYER-${Date.now().toString(36).toUpperCase()}`,
      name: payer.name || "Valued Payer",
      email: payer.email || "",
      phone: payer.phone || "",
      status: "ACTIVE",
      created_at: new Date().toISOString()
    };
    this.data.payers.push(newPayer);
    this.saveToDisk();
    return newPayer;
  }

  // Mandates
  public getMandates(): DigitalPayMandate[] {
    return this.data.mandates;
  }

  public addMandate(mandate: Partial<DigitalPayMandate>): DigitalPayMandate {
    const newMandate: DigitalPayMandate = {
      id: `MND-${Date.now().toString(36).toUpperCase()}`,
      payer: mandate.payer || "Valued Payer",
      merchant: mandate.merchant || "General Merchant",
      amount: Number(mandate.amount) || 100000,
      currency: mandate.currency || "UGX",
      frequency: mandate.frequency || "Monthly",
      status: "ACTIVE"
    };
    this.data.mandates.push(newMandate);
    this.saveToDisk();
    return newMandate;
  }

  // PRN / Payment Codes
  public registerPayCode(payCodeData: SovereignPayCode): SovereignPayCode {
    const existingIndex = this.data.payCodes.findIndex(p => p.payCode === payCodeData.payCode);
    if (existingIndex >= 0) {
      this.data.payCodes[existingIndex] = payCodeData;
    } else {
      this.data.payCodes.unshift(payCodeData);
    }
    this.saveToDisk();
    return payCodeData;
  }

  public resolvePayCode(payCode: string): SovereignPayCode | undefined {
    return this.getPayCodeById(payCode);
  }

  public getAllPayCodes(): SovereignPayCode[] {
    return this.data.payCodes;
  }

  public getPayCodeById(payCode: string): SovereignPayCode | undefined {
    return this.data.payCodes.find(p => p.payCode === payCode);
  }

  public generatePRN(request: {
    payer?: string;
    institution?: string;
    merchant?: string;
    studentCustomer?: string;
    amount: number;
    currency?: string;
    purpose?: string;
    channel?: string;
  }): SovereignPayCode {
    const prnNum = `PRN-${Date.now().toString(36).toUpperCase()}-${Math.floor(Math.random() * 9000) + 1000}`;
    const code: SovereignPayCode = {
      payCode: prnNum,
      obligationId: `OBL-${Date.now().toString(36).toUpperCase()}`,
      institutionName: request.institution || "General Institution",
      merchantName: request.merchant || request.institution || "General Merchant",
      payerName: request.payer || "Valued Payer",
      studentCustomer: request.studentCustomer || request.payer || "Valued Customer",
      purpose: request.purpose || "General Obligation Payment",
      amount: Number(request.amount),
      currency: request.currency || "UGX",
      defaultCurrency: request.currency || "UGX",
      domain: "TUITION_EDUCATION",
      active: true,
      status: "ACTIVE",
      settlementAccountId: "acct-4010",
      allowedRails: [request.channel as any || "MTN_MOMO"],
      paymentChannel: request.channel || "MTN_MOMO",
      reconciliationStatus: "PENDING",
      created_at: new Date().toISOString(),
      expiry_date: new Date(Date.now() + 90 * 24 * 3600 * 1000).toISOString(),
      splitConfig: { platformFeeRate: 0.015, merchantNetRate: 0.985 }
    };
    this.data.payCodes.unshift(code);
    this.saveToDisk();
    return code;
  }

  public cancelPayCode(payCode: string): SovereignPayCode {
    const code = this.getPayCodeById(payCode);
    if (!code) {
      throw new Error(`PRN Code ${payCode} not found.`);
    }
    code.active = false;
    code.status = "CANCELLED";
    this.saveToDisk();
    return code;
  }

  // Payment Processing & Transactions
  public processPayment(request: UniversalPaymentRequest): PaymentSwitchReceipt {
    if (!request.idempotencyKey || !request.idempotencyKey.trim()) {
      throw new Error("DIGITAL PAY ERROR: Idempotency key is required.");
    }
    if (this.idempotencyRegistry.has(request.idempotencyKey)) {
      const existing = this.idempotencyRegistry.get(request.idempotencyKey)!;
      return { ...existing, isDuplicate: true };
    }

    const payCodeObj = this.data.payCodes.find(p => p.payCode === request.payCode);
    if (!payCodeObj) {
      throw new Error(`DIGITAL PAY ERROR: Sovereign PayCode ${request.payCode} not registered.`);
    }
    if (!payCodeObj.active) {
      throw new Error(`DIGITAL PAY ERROR: PayCode ${request.payCode} is deactivated/cancelled.`);
    }

    const grossAmount = Number(request.amount) || payCodeObj.amount || 0;
    const platformFeeRate = payCodeObj.splitConfig?.platformFeeRate || 0.015;
    const platformFee = grossAmount * platformFeeRate;
    const merchantNetAmount = grossAmount - platformFee;

    const publicRef = `JDP-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;

    const receipt: PaymentSwitchReceipt = {
      transactionId: `tx-sw-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      publicReference: publicRef,
      payCode: payCodeObj.payCode,
      institutionName: payCodeObj.institutionName,
      domain: payCodeObj.domain,
      rail: request.rail || "MTN_MOMO",
      grossAmount,
      platformFee,
      merchantNetAmount,
      currency: request.currency || payCodeObj.currency || "UGX",
      status: "SETTLED",
      faapJournalRef: `CLEAR-${publicRef}`,
      timestamp: new Date().toISOString(),
      isDuplicate: false,
      isOfflineQueued: false
    };

    // Update PRN state lifecycle
    payCodeObj.status = "PAID";
    payCodeObj.transactionRef = receipt.transactionId;
    payCodeObj.receiptRef = receipt.publicReference;
    payCodeObj.reconciliationStatus = "SETTLED";

    this.data.receipts.unshift(receipt);
    this.idempotencyRegistry.set(request.idempotencyKey, receipt);
    this.saveToDisk();

    return receipt;
  }

  public getReceipts(): PaymentSwitchReceipt[] {
    return this.data.receipts;
  }

  public getReceiptById(id: string): PaymentSwitchReceipt | undefined {
    return this.data.receipts.find(r => r.transactionId === id || r.publicReference === id);
  }

  public refundReceipt(txId: string): PaymentSwitchReceipt {
    const receipt = this.getReceiptById(txId);
    if (!receipt) {
      throw new Error(`Receipt/Transaction ${txId} not found.`);
    }
    receipt.status = "REFUNDED" as any;
    const code = this.getPayCodeById(receipt.payCode);
    if (code) {
      code.status = "REFUNDED";
    }
    this.saveToDisk();
    return receipt;
  }

  public reverseReceipt(txId: string): PaymentSwitchReceipt {
    const receipt = this.getReceiptById(txId);
    if (!receipt) {
      throw new Error(`Receipt/Transaction ${txId} not found.`);
    }
    receipt.status = "REVERSED" as any;
    const code = this.getPayCodeById(receipt.payCode);
    if (code) {
      code.status = "REVERSED";
    }
    this.saveToDisk();
    return receipt;
  }

  // Settlement & Reconciliation
  public runSettlementReconciliation(): SettlementReconciliationBatch {
    const allReceipts = this.data.receipts.filter(r => r.status === "SETTLED");
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
      faapBatchRef: `FAAP-REC-${Date.now().toString(36).toUpperCase()}`
    };

    // Mark reconciled
    allReceipts.forEach(r => {
      const code = this.getPayCodeById(r.payCode);
      if (code) {
        code.status = "RECONCILED";
        code.settlementRef = batch.batchId;
        code.reconciliationStatus = "RECONCILED";
      }
    });

    this.data.settlementBatches.unshift(batch);
    this.saveToDisk();
    return batch;
  }

  public getSettlementBatches(): SettlementReconciliationBatch[] {
    return this.data.settlementBatches;
  }
}

export const digitalPayOrchestrator = DigitalPayOrchestrator.getInstance();
