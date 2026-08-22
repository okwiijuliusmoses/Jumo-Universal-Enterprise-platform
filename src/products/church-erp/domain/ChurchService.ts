/**
 * JUMO Church ERP — Sovereign Service
 * Manages members, tithes, offerings, and church projects.
 * Integrates with FAAP for ecclesiastical financial accountability.
 */

import { FaapService } from '../../faap/domain/FaapService';

export interface ChurchMember {
  id: string;
  name: string;
  department: string;
  contact: string;
  membershipStatus: 'ACTIVE' | 'VISITOR' | 'INACTIVE';
}

export interface ChurchTransaction {
  id: string;
  memberId: string;
  memberName: string;
  type: 'TITHE' | 'OFFERING' | 'PROJECT' | 'THANKSGIVING';
  amount: number;
  date: string;
}

export class ChurchService {
  private static instance: ChurchService;
  private faapService = FaapService.getInstance();

  private members: ChurchMember[] = [
    { id: 'CHR-001', name: 'Elder John Kato', department: 'Men\'s Fellowship', contact: '+256 700 112233', membershipStatus: 'ACTIVE' },
    { id: 'CHR-002', name: 'Deaconess Mary Namono', department: 'Choir', contact: '+256 772 445566', membershipStatus: 'ACTIVE' }
  ];

  private transactions: ChurchTransaction[] = [];

  private constructor() {}

  public static getInstance(): ChurchService {
    if (!ChurchService.instance) {
      ChurchService.instance = new ChurchService();
    }
    return ChurchService.instance;
  }

  getMembers() { return this.members; }

  recordContribution(memberId: string, amount: number, type: ChurchTransaction['type']) {
    const member = this.members.find(m => m.id === memberId);
    if (!member) throw new Error('Member not found');

    const tx: ChurchTransaction = {
      id: `TX-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      memberId,
      memberName: member.name,
      type,
      amount,
      date: new Date().toISOString()
    };
    this.transactions.push(tx);

    // Post to FAAP
    // Tithes/Offerings are Revenue
    this.faapService.postUniversalTransaction({
      sourceProduct: 'INTERNAL',
      memo: `Church ${type}: ${member.name}`,
      debitAccount: '1010',
      creditAccount: '4010',
      amount: amount
    });

    // Record in Cash Book
    this.faapService.recordCashEntry({
      date: new Date().toISOString().split('T')[0],
      description: `${type}: ${member.name}`,
      folioReference: member.id,
      accountCode: '4010',
      cashAmount: 0,
      bankAmount: amount,
      type: 'RECEIPT'
    });

    return tx;
  }

  getTransactions() { return this.transactions; }
}
