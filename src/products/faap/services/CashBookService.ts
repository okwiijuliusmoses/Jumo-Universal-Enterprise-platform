/**
 * JUMO FAAP — Cash Book Service (Treasury Management)
 * Manages receipts, payments, and multi-column cash book ledgers.
 * Direct integration with General Ledger via double-entry posting.
 */

import { FaapCashBookEntry } from '../domain/types';
import { LedgerPostingService } from './LedgerPostingService';

export class CashBookService {
  private static instance: CashBookService;
  private entries: FaapCashBookEntry[] = [];
  private ledgerService: LedgerPostingService;

  private constructor() {
    this.ledgerService = LedgerPostingService.getInstance();
    // Initial Seed
    this.entries = [
      { id: 'CB_1', date: '2024-03-01', description: 'Opening Balance', folioReference: 'OB', accountCode: '1010', cashAmount: 5000000, bankAmount: 150000000, type: 'RECEIPT' },
      { id: 'CB_2', date: '2024-03-05', description: 'Tuition Collection - Batch 01', folioReference: 'RCPT-001', accountCode: '4010', cashAmount: 2000000, bankAmount: 45000000, type: 'RECEIPT' },
      { id: 'CB_3', date: '2024-03-10', description: 'Office Utilities Payment', folioReference: 'PV-023', accountCode: '6010', cashAmount: 500000, bankAmount: 0, type: 'PAYMENT' }
    ];
  }

  public static getInstance(): CashBookService {
    if (!CashBookService.instance) {
      CashBookService.instance = new CashBookService();
    }
    return CashBookService.instance;
  }

  public getEntries(): FaapCashBookEntry[] {
    return this.entries;
  }

  /**
   * Records a new Cash/Bank Receipt and posts to the General Ledger.
   */
  public recordReceipt(params: {
    description: string;
    accountCode: string; // The source of income (Credit Account)
    cashAmount: number;
    bankAmount: number;
    reference: string;
  }): boolean {
    const total = params.cashAmount + params.bankAmount;
    if (total <= 0) return false;

    // 1. Prepare GL Journal Posting
    // Debit: Cash (1010) and/or Bank (1020)
    // Credit: Target Account (params.accountCode)
    const journalLines = [
      { accountCode: params.accountCode, debit: 0, credit: total, description: params.description }
    ];

    if (params.cashAmount > 0) {
      journalLines.push({ accountCode: '1010', debit: params.cashAmount, credit: 0, description: 'Cash Receipt' });
    }
    if (params.bankAmount > 0) {
      journalLines.push({ accountCode: '1020', debit: params.bankAmount, credit: 0, description: 'Bank Deposit' });
    }

    const result = this.ledgerService.postJournalWithValidation({
      memo: `Cash Book Receipt: ${params.description}`,
      lines: journalLines,
      sourceProduct: 'INTERNAL'
    });

    if (result.success) {
      this.entries.push({
        id: `CB_${Date.now()}`,
        date: new Date().toISOString().split('T')[0],
        description: params.description,
        folioReference: params.reference,
        accountCode: params.accountCode,
        cashAmount: params.cashAmount,
        bankAmount: params.bankAmount,
        type: 'RECEIPT'
      });
      return true;
    }

    return false;
  }

  /**
   * Records a new Cash/Bank Payment and posts to the General Ledger.
   */
  public recordPayment(params: {
    description: string;
    accountCode: string; // The expense/target (Debit Account)
    cashAmount: number;
    bankAmount: number;
    reference: string;
  }): boolean {
    const total = params.cashAmount + params.bankAmount;
    if (total <= 0) return false;

    // 1. Prepare GL Journal Posting
    // Debit: Target Account (params.accountCode)
    // Credit: Cash (1010) and/or Bank (1020)
    const journalLines = [
      { accountCode: params.accountCode, debit: total, credit: 0, description: params.description }
    ];

    if (params.cashAmount > 0) {
      journalLines.push({ accountCode: '1010', debit: 0, credit: params.cashAmount, description: 'Cash Payment' });
    }
    if (params.bankAmount > 0) {
      journalLines.push({ accountCode: '1020', debit: 0, credit: params.bankAmount, description: 'Bank Withdrawal' });
    }

    const result = this.ledgerService.postJournalWithValidation({
      memo: `Cash Book Payment: ${params.description}`,
      lines: journalLines,
      sourceProduct: 'INTERNAL'
    });

    if (result.success) {
      this.entries.push({
        id: `CB_${Date.now()}`,
        date: new Date().toISOString().split('T')[0],
        description: params.description,
        folioReference: params.reference,
        accountCode: params.accountCode,
        cashAmount: params.cashAmount,
        bankAmount: params.bankAmount,
        type: 'PAYMENT'
      });
      return true;
    }

    return false;
  }
}
