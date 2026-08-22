/**
 * JUMO Digital Pay — Sovereign Service
 * Manages virtual wallets, QR payments, and settlement clearing.
 * Enforces 1.5% Master Treasury fee on all transactions.
 * Integrates with FAAP for settlement ledger.
 */

import { FaapService } from '../../faap/domain/FaapService';

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

  private transactions: PaymentTransaction[] = [];
  private onboardings: MerchantOnboarding[] = [];

  private constructor() {}

  public static getInstance(): DigitalPayService {
    if (!DigitalPayService.instance) {
      DigitalPayService.instance = new DigitalPayService();
    }
    return DigitalPayService.instance;
  }

  getWallets() { return this.wallets; }

  registerWallet(ownerName: string, type: 'MERCHANT' | 'CONSUMER') {
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

  processPayment(fromId: string, toId: string, amount: number) {
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
    this.transactions.push(tx);
    return tx;
  }

  clearSettlement(txId: string) {
    const tx = this.transactions.find(t => t.id === txId);
    if (tx && tx.clearingStatus === 'PENDING') {
      tx.clearingStatus = 'APPROVED';

      const from = this.wallets.find(w => w.id === tx.fromWalletId);
      const to = this.wallets.find(w => w.id === tx.toWalletId);

      // FAAP Posting
      this.faapService.postUniversalTransaction({
        sourceProduct: 'DIGITAL_PAY',
        memo: `Settlement: ${from?.ownerName} -> ${to?.ownerName}`,
        debitAccount: '1010',
        creditAccount: '4010',
        amount: tx.netAmount
      });

      // Master Treasury Fee
      this.faapService.postUniversalTransaction({
        sourceProduct: 'DIGITAL_PAY',
        memo: `JUMO Fee: ${tx.id}`,
        debitAccount: '1010',
        creditAccount: '4011', // Fee Revenue
        amount: tx.feeAmount
      });
    }
  }

  getTransactions() { return this.transactions; }

  requestOnboarding(data: Omit<MerchantOnboarding, 'id' | 'status' | 'date'>) {
    const entry: MerchantOnboarding = {
      ...data,
      id: `ONB-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      status: 'PENDING',
      date: new Date().toISOString()
    };
    this.onboardings.push(entry);
    return entry;
  }

  getOnboardings() { return this.onboardings; }

  approveOnboarding(id: string) {
    const onb = this.onboardings.find(o => o.id === id);
    if (onb) {
      onb.status = 'APPROVED';
      this.registerWallet(onb.businessName, 'MERCHANT');
    }
  }
}
