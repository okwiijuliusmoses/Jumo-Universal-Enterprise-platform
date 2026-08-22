/**
 * JUMO FAAP — Vote Book Service (Institutional Finance Suite)
 * Implements pre-expenditure control, budget monitoring, and commitment management.
 * Essential for Government, Education, and Church institutional accounting.
 */

import { FaapVoteBookEntry, FaapCommitmentRecord } from '../domain/types';

export class VoteBookService {
  private static instance: VoteBookService;
  private voteBooks: FaapVoteBookEntry[] = [];
  private commitments: FaapCommitmentRecord[] = [];

  private constructor() {
    // Initial Seed for Demonstration
    this.voteBooks = [
      { id: 'VOTE_1', voteCode: 'EDU-01', voteName: 'Tuition & Academic Programs', annualBudget: 500000000, commitments: 20000000, expenditure: 150000000, balanceAvailable: 330000000 },
      { id: 'VOTE_2', voteCode: 'ADM-02', voteName: 'Administrative Overheads', annualBudget: 100000000, commitments: 5000000, expenditure: 40000000, balanceAvailable: 55000000 },
      { id: 'VOTE_3', voteCode: 'CAP-03', voteName: 'Capital Development & Infrastructure', annualBudget: 1000000000, commitments: 450000000, expenditure: 200000000, balanceAvailable: 350000000 }
    ];
  }

  public static getInstance(): VoteBookService {
    if (!VoteBookService.instance) {
      VoteBookService.instance = new VoteBookService();
    }
    return VoteBookService.instance;
  }

  public getVoteBooks(): FaapVoteBookEntry[] {
    return this.voteBooks;
  }

  /**
   * Verifies if a vote has enough available balance for a new commitment/requisition.
   */
  public checkAvailability(voteCode: string, amount: number): boolean {
    const vote = this.voteBooks.find(v => v.voteCode === voteCode);
    if (!vote) return false;
    return vote.balanceAvailable >= amount;
  }

  /**
   * Commits funds from a vote (Encumbrance).
   * This is called during Requisition/LPO stage.
   */
  public commitFunds(voteCode: string, amount: number, description: string, reference: string): FaapCommitmentRecord | null {
    const vote = this.voteBooks.find(v => v.voteCode === voteCode);
    if (!vote || vote.balanceAvailable < amount) return null;

    // Update Vote Book
    vote.commitments += amount;
    vote.balanceAvailable = vote.annualBudget - vote.commitments - vote.expenditure;

    const commitment: FaapCommitmentRecord = {
      id: `CMT_${Date.now()}`,
      voteCode,
      description,
      amount,
      referenceNumber: reference,
      status: 'COMMITTED',
      date: new Date().toISOString()
    };

    this.commitments.push(commitment);
    return commitment;
  }

  /**
   * Liquidates a commitment into actual expenditure.
   * This is called during Payment Voucher processing.
   */
  public liquidateCommitment(commitmentId: string): boolean {
    const commitment = this.commitments.find(c => c.id === commitmentId);
    if (!commitment || commitment.status !== 'COMMITTED') return false;

    const vote = this.voteBooks.find(v => v.voteCode === commitment.voteCode);
    if (!vote) return false;

    // Transition from Commitment to Expenditure
    vote.commitments -= commitment.amount;
    vote.expenditure += commitment.amount;
    vote.balanceAvailable = vote.annualBudget - vote.commitments - vote.expenditure;

    commitment.status = 'LIQUIDATED';
    return true;
  }
}
