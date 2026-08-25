/**
 * JUMO Digital Pay — Sovereign Service
 * Manages virtual wallets, PRN payment references, daily batch settlements, and clearing.
 * Enforces 1.5% Master Treasury fee on all transactions.
 * Integrates with FAAP for settlement ledger.
 */
import { FaapService } from '../../faap/domain/FaapService';
import { 
  DigitalPayReference, 
  DigitalPayTransaction, 
  DigitalPaySettlementBatch, 
  DigitalPayReconciliationQuery 
} from './types';

export type WorkflowStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'IN_REVIEW';

export interface Wallet {
  id: string;
  ownerName: string;
  balance: number;
  type: 'MERCHANT' | 'CONSUMER';
  kycStatus: WorkflowStatus;
}

export interface PaymentTransaction {
  id: string;
  fromWalletId: string;
  toWalletId: string;
  grossAmount: number;
  feeAmount: number;
  netAmount: number;
  date: string;
  status: 'COMPLETED' | 'PENDING' | 'FAILED';
  clearingStatus: WorkflowStatus;
}

export interface MerchantOnboarding {
  id: string;
  businessName: string;
  tin: string;
  ownerName: string;
  status: WorkflowStatus;
  date: string;
}

export class DigitalPayService {
  private static instance: DigitalPayService;
  private faapService = FaapService.getInstance();

  private wallets: Wallet[] = [
    { id: 'WAL-001', ownerName: 'Sovereign High School', balance: 12500000, type: 'MERCHANT', kycStatus: 'APPROVED' },
    { id: 'WAL-002', ownerName: 'Kampala Junior Academy', balance: 8400000, type: 'MERCHANT', kycStatus: 'APPROVED' },
    { id: 'WAL-003', ownerName: 'Alice Namutebi', balance: 500000, type: 'CONSUMER', kycStatus: 'APPROVED' }
  ];

  private walletTransactions: PaymentTransaction[] = [];
  private onboardings: MerchantOnboarding[] = [];

  private references: DigitalPayReference[] = [
    {
      id: 'REF-001',
      reference: 'PRN-2026-9901',
      payerId: 'STU-SEC-2024-001',
      payerName: 'David Mukasa',
      merchantCode: 'SOVEREIGN-SEC',
      totalAmount: 1850000,
      balanceDue: 0,
      expiryDate: '2026-12-31',
      status: 'PAID'
    },
    {
      id: 'REF-002',
      reference: 'PRN-2026-9902',
      payerId: 'STU-NUR-2024-045',
      payerName: 'Sarah Namatovu',
      merchantCode: 'ALPHA-JUNIOR',
      totalAmount: 950000,
      balanceDue: 950000,
      expiryDate: '2026-12-31',
      status: 'ACTIVE'
    },
    {
      id: 'REF-003',
      reference: 'PRN-2026-9903',
      payerId: 'MEM-CH-2024-112',
      payerName: 'Dr. Timothy Mukasa',
      merchantCode: 'NAMIREMBE-CATHEDRAL',
      totalAmount: 500000,
      balanceDue: 250000,
      expiryDate: '2026-12-31',
      status: 'ACTIVE'
    }
  ];

  private transactions: DigitalPayTransaction[] = [
    {
      id: 'TXN-001',
      transactionRef: 'PAY-889102-MM',
      reference: 'PRN-2026-9901',
      amount: 1850000,
      channel: 'MOBILE_MONEY',
      paymentDate: '2026-08-01',
      status: 'SUCCESS'
    },
    {
      id: 'TXN-002',
      transactionRef: 'PAY-889103-BANK',
      reference: 'PRN-2026-9903',
      amount: 250000,
      channel: 'BANK_TRANSFER',
      paymentDate: '2026-08-05',
      status: 'SUCCESS'
    }
  ];

  private batches: DigitalPaySettlementBatch[] = [
    {
      id: 'BAT-001',
      batchRef: 'BATCH-2026-08-01',
      collectionDate: '2026-08-01',
      totalGross: 1850000,
      commissionAmount: 27750,
      netSettlement: 1822250,
      status: 'SETTLED'
    }
  ];

  private reconciliations: DigitalPayReconciliationQuery[] = [
    {
      id: 'REC-001',
      transactionId: 'TXN-001',
      issueType: 'MISSING_IN_BANK',
      severity: 'LOW',
      status: 'RESOLVED'
    }
  ];

  private constructor() {}

  public static getInstance(): DigitalPayService {
    if (!DigitalPayService.instance) {
      DigitalPayService.instance = new DigitalPayService();
    }
    return DigitalPayService.instance;
  }

  // Wallets
  getWallets(): Wallet[] { 
    return this.wallets; 
  }

  registerWallet(ownerName: string, type: 'MERCHANT' | 'CONSUMER'): Wallet {
    const wallet: Wallet = {
      id: `WAL-${(this.wallets.length + 1).toString().padStart(3, '0')}`,
      ownerName,
      balance: 0,
      type,
      kycStatus: 'PENDING'
    };
    this.wallets.push(wallet);
    return wallet;
  }

  approveKYC(id: string) {
    const wallet = this.wallets.find(w => w.id === id);
    if (wallet) wallet.kycStatus = 'APPROVED';
  }

  processPayment(fromId: string, toId: string, amount: number): PaymentTransaction {
    const from = this.wallets.find(w => w.id === fromId);
    const to = this.wallets.find(w => w.id === toId);
    if (!from || !to) throw new Error('Wallet not found');
    if (from.kycStatus !== 'APPROVED') throw new Error('Payer KYC not verified');
    if (from.balance < amount) throw new Error('Insufficient funds');

    const fee = amount * 0.015; // 1.5% JUMO Fee
    const net = amount - fee;

    from.balance -= amount;
    to.balance += net;

    const tx: PaymentTransaction = {
      id: `PAY-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      fromWalletId: fromId,
      toWalletId: toId,
      grossAmount: amount,
      feeAmount: fee,
      netAmount: net,
      date: new Date().toISOString(),
      status: 'COMPLETED',
      clearingStatus: 'PENDING'
    };

    this.walletTransactions.push(tx);
    return tx;
  }

  clearSettlement(txId: string) {
    const tx = this.walletTransactions.find(t => t.id === txId);
    if (tx && tx.clearingStatus === 'PENDING') {
      tx.clearingStatus = 'APPROVED';
      const from = this.wallets.find(w => w.id === tx.fromWalletId);
      const to = this.wallets.find(w => w.id === tx.toWalletId);
      
      this.faapService.postUniversalTransaction({
        sourceProduct: 'FINTECH',
        amount: tx.grossAmount,
        debitAccount: 'BANK-001',
        creditAccount: 'REV-001',
        memo: `Wallet settlement: ${from?.ownerName || tx.fromWalletId} to ${to?.ownerName || tx.toWalletId} (Net: ${tx.netAmount}, Fee: ${tx.feeAmount})`
      });
    }
  }

  // PRN & Collections
  getReferences(): DigitalPayReference[] {
    return this.references;
  }

  resolveReference(refCode: string): DigitalPayReference | undefined {
    return this.references.find(r => r.reference.toLowerCase() === refCode.toLowerCase() || r.id === refCode);
  }

  createReference(params: any) { return this.generatePRN(params); }

  generatePRN(params: {
    payerId: string;
    payerName: string;
    merchantCode: string;
    amount: number;
    expiryDays?: number;
  }): DigitalPayReference {
    const num = Math.floor(1000 + Math.random() * 9000);
    const reference = `PRN-${new Date().getFullYear()}-${num}`;
    const exp = new Date();
    exp.setDate(exp.getDate() + (params.expiryDays || 30));

    const newRef: DigitalPayReference = {
      id: `REF-${Date.now()}`,
      reference,
      payerId: params.payerId,
      payerName: params.payerName,
      merchantCode: params.merchantCode,
      totalAmount: params.amount,
      balanceDue: params.amount,
      expiryDate: exp.toISOString().split('T')[0],
      status: 'ACTIVE'
    };

    this.references.unshift(newRef);
    return newRef;
  }

  processCollection(params: {
    reference: string;
    amount: number;
    channel: 'MOBILE_MONEY' | 'BANK_TRANSFER' | 'CARD' | 'WALLET';
    paymentDate: string;
  }): DigitalPayTransaction {
    const ref = this.resolveReference(params.reference);
    if (!ref) throw new Error('Reference not found');
    if (ref.status === 'PAID') throw new Error('Reference is already paid');
    if (params.amount <= 0) throw new Error('Payment amount must be greater than 0');

    ref.balanceDue = Math.max(0, ref.balanceDue - params.amount);
    if (ref.balanceDue === 0) {
      ref.status = 'PAID';
    }

    const tx: DigitalPayTransaction = {
      id: `TXN-${Date.now()}`,
      transactionRef: `PAY-${Math.floor(100000 + Math.random() * 900000)}-${params.channel.substring(0, 2)}`,
      reference: ref.reference,
      amount: params.amount,
      channel: params.channel,
      paymentDate: params.paymentDate || new Date().toISOString().split('T')[0],
      status: 'SUCCESS'
    };

    this.transactions.unshift(tx);

    // Cross-post to FAAP
    const fee = params.amount * 0.015;
    this.faapService.postUniversalTransaction({
      sourceProduct: 'FINTECH',
      amount: params.amount,
      debitAccount: 'BANK-SETTLEMENT-001',
      creditAccount: 'MERCHANT-PAYABLE-001',
      memo: `PRN Collection: ${ref.reference} (${ref.payerName}) - Net: ${params.amount - fee}, JUMO Fee: ${fee}`
    });

    return tx;
  }

  // Settlements & Batches
  getBatches(): DigitalPaySettlementBatch[] {
    return this.batches;
  }

  getTransactions(): DigitalPayTransaction[] {
    return this.transactions;
  }

  closeDailyBatch(): DigitalPaySettlementBatch {
    const today = new Date().toISOString().split('T')[0];
    const todaysTxs = this.transactions.filter(t => t.paymentDate === today || t.status === 'SUCCESS');
    const totalGross = todaysTxs.reduce((sum, t) => sum + t.amount, 0);
    const commission = Math.round(totalGross * 0.015);
    const net = totalGross - commission;

    const batch: DigitalPaySettlementBatch = {
      id: `BAT-${Date.now()}`,
      batchRef: `BATCH-${today}-${Math.floor(100 + Math.random() * 900)}`,
      collectionDate: today,
      totalGross,
      commissionAmount: commission,
      netSettlement: net,
      status: 'SETTLED'
    };

    this.batches.unshift(batch);
    return batch;
  }

  getReconciliations(): DigitalPayReconciliationQuery[] {
    return this.reconciliations;
  }
}

export default DigitalPayService;
