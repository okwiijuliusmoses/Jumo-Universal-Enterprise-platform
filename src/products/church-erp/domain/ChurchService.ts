/**
 * JUMO Church ERP — Sovereign Service
 * Manages members, tithes, offerings, sacraments, clergy HR, and church projects.
 * Integrates with FAAP for ecclesiastical financial accountability.
 */

import { FaapService } from '../../faap/domain/FaapService';

export type WorkflowStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'IN_REVIEW';

export interface SacramentalRecord {
  id: string;
  type: 'BAPTISM' | 'CONFIRMATION' | 'MATRIMONY' | 'BURIAL';
  certificateNumber: string;
  recipientName: string;
  officiatingClergy: string;
  parishName: string;
  dateOfSacrament: string;
  godparentsOrWitnesses?: string;
  status: WorkflowStatus;
}

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

export interface CounselingRequest {
  id: string;
  memberId: string;
  memberName: string;
  topic: string;
  preferredDate: string;
  status: WorkflowStatus;
  notes?: string;
}

export interface WelfareAssistance {
  id: string;
  memberId: string;
  memberName: string;
  needCategory: 'MEDICAL' | 'EDUCATION' | 'BEREAVEMENT' | 'FOOD';
  requestedAmount: number;
  description: string;
  status: WorkflowStatus;
  date: string;
}

export class ChurchService {
  private static instance: ChurchService;
  private faapService = FaapService.getInstance();

  private members: ChurchMember[] = [
    { id: 'CHR-001', name: 'Elder John Kato', department: 'Men\'s Fellowship', contact: '+256 700 112233', membershipStatus: 'ACTIVE' },
    { id: 'CHR-002', name: 'Deaconess Mary Namono', department: 'Choir', contact: '+256 772 445566', membershipStatus: 'ACTIVE' }
  ];

  private sacramentalRecords: SacramentalRecord[] = [
    { id: 'SAC-001', type: 'BAPTISM', certificateNumber: 'BAP-DIOC-2026-104', recipientName: 'Emmanuel Ssemwanga', officiatingClergy: 'Rev. Canon Peter Opio', parishName: 'St. Paul Cathedral Namirembe', dateOfSacrament: '2026-04-12', godparentsOrWitnesses: 'Dr. Joseph Mukasa & Sarah Mukasa', status: 'APPROVED' },
    { id: 'SAC-002', type: 'MATRIMONY', certificateNumber: 'MAT-DIOC-2026-088', recipientName: 'David Omondi & Grace Akello', officiatingClergy: 'Rt. Rev. Bishop Samuel Kinaalwa', parishName: 'All Saints Cathedral Kampala', dateOfSacrament: '2026-06-20', godparentsOrWitnesses: 'Hon. Justice James Ogoola', status: 'APPROVED' }
  ];

  private transactions: ChurchTransaction[] = [];
  private counselingRequests: CounselingRequest[] = [];
  private welfareRequests: WelfareAssistance[] = [];

  private constructor() {}

  public static getInstance(): ChurchService {
    if (!ChurchService.instance) {
      ChurchService.instance = new ChurchService();
    }
    return ChurchService.instance;
  }

  getMembers() { return this.members; }

  registerMember(member: Omit<ChurchMember, 'id'>) {
    const newMember: ChurchMember = {
      ...member,
      id: `CHR-${(this.members.length + 1).toString().padStart(3, '0')}`
    };
    this.members.push(newMember);
    return newMember;
  }

  // --- SACRAMENTAL REGISTERS & CERTIFICATE ISSUANCE ---
  getSacramentalRecords() { return this.sacramentalRecords; }

  issueSacramentalRecord(type: SacramentalRecord['type'], recipientName: string, officiatingClergy: string, parishName: string, godparentsOrWitnesses?: string) {
    const certNum = `${type.substr(0, 3)}-DIOC-2026-${Math.floor(100 + Math.random() * 900)}`;
    const record: SacramentalRecord = {
      id: `SAC-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
      type,
      certificateNumber: certNum,
      recipientName,
      officiatingClergy,
      parishName,
      dateOfSacrament: new Date().toISOString().split('T')[0],
      godparentsOrWitnesses,
      status: 'APPROVED'
    };
    this.sacramentalRecords.unshift(record);
    return record;
  }

  // --- TITHE & OFFERINGS TO FAAP ---
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

    this.faapService.postUniversalTransaction({
      sourceProduct: 'CHURCH_ERP',
      memo: `Church ${type}: ${member.name}`,
      debitAccount: '1010',
      creditAccount: '4010',
      amount: amount
    });

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

  requestCounseling(req: Omit<CounselingRequest, 'id' | 'status' | 'memberName'>) {
    const member = this.members.find(m => m.id === req.memberId);
    const newReq: CounselingRequest = {
      ...req,
      id: `CNS-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      memberName: member?.name || 'Unknown',
      status: 'PENDING'
    };
    this.counselingRequests.push(newReq);
    return newReq;
  }

  getCounselingRequests() { return this.counselingRequests; }

  approveCounseling(id: string) {
    const req = this.counselingRequests.find(r => r.id === id);
    if (req) req.status = 'APPROVED';
  }

  requestWelfare(req: Omit<WelfareAssistance, 'id' | 'status' | 'date' | 'memberName'>) {
    const member = this.members.find(m => m.id === req.memberId);
    const newReq: WelfareAssistance = {
      ...req,
      id: `WLF-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      memberName: member?.name || 'Unknown',
      status: 'PENDING',
      date: new Date().toISOString()
    };
    this.welfareRequests.push(newReq);
    return newReq;
  }

  getWelfareRequests() { return this.welfareRequests; }

  approveWelfare(id: string) {
    const req = this.welfareRequests.find(r => r.id === id);
    if (req && req.status === 'PENDING') {
      req.status = 'APPROVED';
      this.faapService.postUniversalTransaction({
        sourceProduct: 'CHURCH_ERP',
        memo: `Church Welfare Disbursement: ${req.memberName} (${req.needCategory})`,
        debitAccount: '5010',
        creditAccount: '1010',
        amount: req.requestedAmount
      });
    }
  }
}
