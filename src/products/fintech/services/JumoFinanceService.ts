import { FaapService } from '../../faap/domain/FaapService';
import { FintechService, VoteBookEntry, VoteEncumbrance, FinancialReconciliationItem, PaymentSwitchTx } from '../domain/FintechService';

import { formatNumber } from '../../../utils/formatters';

export interface StandardGLPostingRequest {
  sourceModule: string;
  memo: string;
  debitAccount: string;
  creditAccount: string;
  amount: number;
  voteCode?: string;
  reference?: string;
  actorEmail?: string;
}

export interface VoteBookValidationResult {
  valid: boolean;
  voteCode: string;
  annualBudget: number;
  availableBalance: number;
  requestedAmount: number;
  remainingBalance: number;
  message: string;
}

export interface ReconciliationBatchSummary {
  batchId: string;
  totalItems: number;
  matchedCount: number;
  unreconciledCount: number;
  totalVolume: number;
  reconciledVolume: number;
  varianceVolume: number;
  status: 'BALANCED' | 'UNBALANCED';
}

export interface BankStatementFeedItem {
  id: string;
  bankName: string;
  accountNumber: string;
  statementDate: string;
  rawFormat: 'MT940' | 'CAMT_053' | 'CSV_FEED';
  transactionReference: string;
  debitCreditIndicator: 'CRDT' | 'DBIT';
  amount: number;
  narrative: string;
  reconciled: boolean;
}

export interface SaccoCrbScore {
  memberId: string;
  memberName: string;
  savingsTotalUsd: number;
  shareCapitalUsd: number;
  activeLoanBalanceUsd: number;
  repaymentHistoryRating: 'EXCELLENT' | 'GOOD' | 'FAIR' | 'DEFAULT_RISK';
  crbCreditScore: number; // 300 to 850
  maxLoanEligibleUsd: number;
}

export class JumoFinanceService {
  private static instance: JumoFinanceService;
  private faapService = FaapService.getInstance();
  private fintechService = FintechService.getInstance();

  private bankFeeds: BankStatementFeedItem[] = [
    { id: 'FEED-01', bankName: 'Stanbic Bank Uganda', accountNumber: '9030001234567', statementDate: '2026-08-22', rawFormat: 'CAMT_053', transactionReference: 'STB-NTR-90412', debitCreditIndicator: 'CRDT', amount: 4500000, narrative: 'EFT Tuition Batch - SchoolPay Collection', reconciled: true },
    { id: 'FEED-02', bankName: 'Centenary Bank', accountNumber: '3100089765432', statementDate: '2026-08-22', rawFormat: 'MT940', transactionReference: 'CENT-PAY-88120', debitCreditIndicator: 'CRDT', amount: 1200000, narrative: 'MTN MoMo Settlement Collection', reconciled: false }
  ];

  private constructor() {}

  public static getInstance(): JumoFinanceService {
    if (!JumoFinanceService.instance) {
      JumoFinanceService.instance = new JumoFinanceService();
    }
    return JumoFinanceService.instance;
  }

  // --- ISO 20022 / MT940 BANK STATEMENT FEED ENGINE ---
  getBankFeeds() { return this.bankFeeds; }

  ingestBankStatementFeed(bankName: string, accountNumber: string, amount: number, narrative: string, format: 'MT940' | 'CAMT_053' | 'CSV_FEED' = 'CAMT_053') {
    const item: BankStatementFeedItem = {
      id: `FEED-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
      bankName,
      accountNumber,
      statementDate: new Date().toISOString().split('T')[0],
      rawFormat: format,
      transactionReference: `RAW-REF-${Math.floor(100000 + Math.random() * 900000)}`,
      debitCreditIndicator: 'CRDT',
      amount,
      narrative,
      reconciled: false
    };
    this.bankFeeds.unshift(item);
    return item;
  }

  // --- SACCO CREDIT REFERENCE BUREAU (CRB) SCORING ENGINE ---
  calculateSaccoCrbCreditScore(memberId: string, memberName: string, savingsTotalUsd: number, shareCapitalUsd: number, activeLoanBalanceUsd: number): SaccoCrbScore {
    let score = 650;
    if (savingsTotalUsd > 5000) score += 100;
    if (shareCapitalUsd > 1000) score += 50;
    if (activeLoanBalanceUsd === 0) score += 50;
    else if (activeLoanBalanceUsd > savingsTotalUsd * 2) score -= 100;

    let rating: SaccoCrbScore['repaymentHistoryRating'] = 'GOOD';
    if (score >= 780) rating = 'EXCELLENT';
    else if (score >= 680) rating = 'GOOD';
    else if (score >= 580) rating = 'FAIR';
    else rating = 'DEFAULT_RISK';

    const maxLoan = Math.max(0, (savingsTotalUsd + shareCapitalUsd) * 3 - activeLoanBalanceUsd);

    return {
      memberId,
      memberName,
      savingsTotalUsd,
      shareCapitalUsd,
      activeLoanBalanceUsd,
      repaymentHistoryRating: rating,
      crbCreditScore: score,
      maxLoanEligibleUsd: maxLoan
    };
  }

  // --- GL DOUBLE ENTRY & VOTE BOOK ---
  public postGeneralLedgerJournal(request: StandardGLPostingRequest) {
    if (request.amount <= 0) {
      throw new Error('GL Transaction amount must be greater than zero');
    }

    if (request.voteCode) {
      const voteValidation = this.validateVoteBook(request.voteCode, request.amount);
      if (!voteValidation.valid) {
        throw new Error(`Vote Book Validation Failed: ${voteValidation.message}`);
      }
      if (request.reference) {
        this.fintechService.commitVoteEncumbrance(
          request.voteCode,
          request.reference,
          request.memo,
          request.amount,
          request.sourceModule
        );
      }
    }

    const journal = this.faapService.postUniversalTransaction({
      sourceProduct: request.sourceModule,
      memo: request.memo,
      debitAccount: request.debitAccount,
      creditAccount: request.creditAccount,
      amount: request.amount
    });

    return journal;
  }

  public validateVoteBook(voteCode: string, requestedAmount: number): VoteBookValidationResult {
    const votes = this.fintechService.getVoteBook();
    const vote = votes.find(v => v.voteCode === voteCode);

    if (!vote) {
      return {
        valid: false,
        voteCode,
        annualBudget: 0,
        availableBalance: 0,
        requestedAmount,
        remainingBalance: 0,
        message: `Vote code ${voteCode} not found in Chart of Votes`
      };
    }

    const remaining = vote.balanceAvailable - requestedAmount;
    if (remaining < 0) {
      return {
        valid: false,
        voteCode,
        annualBudget: vote.annualBudget,
        availableBalance: vote.balanceAvailable,
        requestedAmount,
        remainingBalance: remaining,
        message: `Insufficient Vote Allocation. Required: UGX ${formatNumber(requestedAmount || 0)}, Available: UGX ${formatNumber(vote.balanceAvailable || 0)}`
      };
    }

    return {
      valid: true,
      voteCode,
      annualBudget: vote.annualBudget,
      availableBalance: vote.balanceAvailable,
      requestedAmount,
      remainingBalance: remaining,
      message: 'Vote funds available and pre-encumbrance approved'
    };
  }

  public runReconciliationWorkflow(channelFilter?: string): ReconciliationBatchSummary {
    const feeds = this.fintechService.getReconciliationFeeds();
    const targetFeeds = channelFilter ? feeds.filter(f => f.source === channelFilter) : feeds;

    let matchedCount = 0;
    let unreconciledCount = 0;
    let totalVolume = 0;
    let reconciledVolume = 0;
    let varianceVolume = 0;

    const batchId = `REC-BATCH-${Date.now().toString(36).toUpperCase()}`;

    for (const feed of targetFeeds) {
      totalVolume += feed.amount;
      if (feed.status === 'MATCHED') {
        matchedCount++;
        reconciledVolume += feed.amount;
      } else {
        const journals = this.faapService.getJournals();
        const matchedJE = journals.find(j => j.totalDebit === feed.amount || j.totalCredit === feed.amount);
        if (matchedJE) {
          this.fintechService.reconcileFeedItem(feed.id, matchedJE.id);
          matchedCount++;
          reconciledVolume += feed.amount;
        } else {
          unreconciledCount++;
          varianceVolume += feed.amount;
        }
      }
    }

    return {
      batchId,
      totalItems: targetFeeds.length,
      matchedCount,
      unreconciledCount,
      totalVolume,
      reconciledVolume,
      varianceVolume,
      status: varianceVolume === 0 ? 'BALANCED' : 'UNBALANCED'
    };
  }

  public processUniversalPaymentSwitch(payerName: string, channel: string, grossAmount: number): PaymentSwitchTx {
    return this.fintechService.processSwitchPayment({
      payerName,
      channel,
      amount: grossAmount
    });
  }

  public verifyEcosystemLedgerParity() {
    return this.faapService.verifyLedgerParity();
  }
}
