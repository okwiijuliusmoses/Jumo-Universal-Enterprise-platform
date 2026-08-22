import { FaapService } from '../../faap/domain/FaapService';

export type WorkflowStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'IN_REVIEW';

export interface SaccoMember {
  id: string;
  name: string;
  memberNumber: string;
  savingsBalance: number;
  loanBalance: number;
  shares: number;
  status: WorkflowStatus;
}

export interface SaccoLoan {
  id: string;
  memberId: string;
  memberName: string;
  amount: number;
  interestRate: number;
  tenureMonths: number;
  status: WorkflowStatus;
  disbursedDate?: string;
}

export interface TreasuryAsset {
  id: string;
  name: string;
  type: 'CASH' | 'EQUITY' | 'BOND' | 'REAL_ESTATE';
  valuation: number;
  lastAudited: string;
}

export class FintechService {
  private static instance: FintechService;
  private faapService = FaapService.getInstance();

  private members: SaccoMember[] = [
    { id: 'MEM-001', name: 'John Doe', memberNumber: 'SAC-2026-001', savingsBalance: 2500000, loanBalance: 0, shares: 50, status: 'APPROVED' },
    { id: 'MEM-002', name: 'Jane Smith', memberNumber: 'SAC-2026-002', savingsBalance: 1200000, loanBalance: 5000000, shares: 100, status: 'APPROVED' }
  ];

  private loans: SaccoLoan[] = [];
  private assets: TreasuryAsset[] = [
    { id: 'AST-001', name: 'Main Operating Account', type: 'CASH', valuation: 420500000, lastAudited: new Date().toISOString() }
  ];

  private constructor() {}

  public static getInstance(): FintechService {
    if (!FintechService.instance) {
      FintechService.instance = new FintechService();
    }
    return FintechService.instance;
  }

  getMembers() { return this.members; }

  registerMember(data: Omit<SaccoMember, 'id' | 'savingsBalance' | 'loanBalance' | 'status'>) {
    const member: SaccoMember = {
      ...data,
      id: `MEM-${(this.members.length + 1).toString().padStart(3, '0')}`,
      savingsBalance: 0,
      loanBalance: 0,
      status: 'PENDING'
    };
    this.members.push(member);
    return member;
  }

  approveMember(id: string) {
    const mem = this.members.find(m => m.id === id);
    if (mem) mem.status = 'APPROVED';
  }

  requestLoan(memberId: string, amount: number) {
    const member = this.members.find(m => m.id === memberId);
    if (!member) throw new Error('Member not found');

    const loan: SaccoLoan = {
      id: `LOAN-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      memberId,
      memberName: member.name,
      amount,
      interestRate: 12,
      tenureMonths: 12,
      status: 'PENDING'
    };
    this.loans.push(loan);
    return loan;
  }

  getLoans() { return this.loans; }

  approveLoan(id: string) {
    const loan = this.loans.find(l => l.id === id);
    if (loan && loan.status === 'PENDING') {
      loan.status = 'APPROVED';
      loan.disbursedDate = new Date().toISOString();

      const member = this.members.find(m => m.id === loan.memberId);
      if (member) member.loanBalance += loan.amount;

      // FAAP Posting
      this.faapService.postUniversalTransaction({
        sourceProduct: 'FINTECH',
        memo: `SACCO Loan Disbursement: ${loan.memberName}`,
        debitAccount: '1020', // Loans Receivable
        creditAccount: '1010', // Cash
        amount: loan.amount
      });
    }
  }

  getAssets() { return this.assets; }
}
