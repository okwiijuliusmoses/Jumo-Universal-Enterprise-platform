/**
 * JUMO Digital Pay — Sovereign Service
 * Manages virtual wallets, QR payments, and settlement clearing.
 * Enforces 1.5% Master Treasury fee on all transactions.
 * Integrates with FAAP for settlement ledger.
 */

import { FaapService } from '../../faap/domain/FaapService';

export interface Wallet {
  id: string;
  ownerName: string;
  balance: number;
  type: 'MERCHANT' | 'CONSUMER';
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
}

export class DigitalPayService {
  private static instance: DigitalPayService;
  private faapService = FaapService.getInstance();

  private wallets: Wallet[] = [
    { id: 'WAL-001', ownerName: 'Sovereign High School', balance: 12500000, type: 'MERCHANT' },
    { id: 'WAL-002', ownerName: 'Kampala Junior Academy', balance: 8400000, type: 'MERCHANT' },
    { id: 'WAL-003', ownerName: 'Alice Namutebi', balance: 500000, type: 'CONSUMER' }
  ];

  private transactions: PaymentTransaction[] = [];

  private constructor() {}

  public static getInstance(): DigitalPayService {
    if (!DigitalPayService.instance) {
      DigitalPayService.instance = new DigitalPayService();
    }
    return DigitalPayService.instance;
  }

  getWallets() { return this.wallets; }

  processPayment(fromId: string, toId: string, amount: number) {
    const from = this.wallets.find(w => w.id === fromId);
    const to = this.wallets.find(w => w.id === toId);

    if (!from || !to) throw new Error('Wallet not found');
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
      status: 'COMPLETED'
    };
    this.transactions.push(tx);

    // Post to FAAP
    // 1. Debit Payer Account, Credit Merchant Account (Net)
    // 2. Credit JUMO Revenue Account (Fee)
    this.faapService.postUniversalTransaction({
      sourceProduct: 'DIGITAL_PAY',
      memo: `P2B Payment: ${from.ownerName} -> ${to.ownerName}`,
      debitAccount: '1010', // Simplified: using same cash pool for simulation
      creditAccount: '4010',
      amount: net
    });

    // Post Fee to JUMO Master Treasury
    this.faapService.postUniversalTransaction({
      sourceProduct: 'DIGITAL_PAY',
      memo: `JUMO 1.5% Settlement Fee: ${tx.id}`,
      debitAccount: '1010',
      creditAccount: '4010', // Fee Revenue
      amount: fee
    });

    return tx;
  }

  getTransactions() { return this.transactions; }
}
