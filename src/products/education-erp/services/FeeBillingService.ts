/**
 * EDUCATION ERP — Fee Billing Service
 * Demonstrates integration with JUMO FAAP for financial ledger consistency.
 */

import { LedgerPostingService } from '../../faap/services/LedgerPostingService';

export class FeeBillingService {
  private ledgerService: LedgerPostingService;

  constructor() {
    this.ledgerService = LedgerPostingService.getInstance();
  }

  /**
   * Posts a fee payment from a student.
   * Debits Bank (1020) and Credits Tuition Revenue (4010).
   */
  public postFeePayment(studentId: string, amount: number, reference: string) {
    return this.ledgerService.postJournalWithValidation({
      memo: `Student Fee Payment: ${studentId}`,
      lines: [
        { accountCode: '1020', debit: amount, credit: 0, description: `Bank Deposit - Student ${studentId}` },
        { accountCode: '4010', debit: 0, credit: amount, description: `Tuition Revenue - Ref: ${reference}` }
      ],
      sourceProduct: 'EDUCATION'
    });
  }
}
