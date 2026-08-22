/**
 * JUMO Primary ERP — Sovereign Service
 * Manages PLE candidates, PLE center registration, and tuition collection.
 * Integrates with FAAP for primary education finance.
 */

import { FaapService } from '../../faap/domain/FaapService';

export type WorkflowStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'IN_REVIEW';

export interface PrimaryPupil {
  id: string;
  name: string;
  class: string;
  lin?: string; // Learner Identification Number
  guardian: string;
  contact: string;
  feeBalance: number;
}

export interface PLECandidate {
  id: string;
  pupilId: string;
  pupilName: string;
  indexNumber?: string;
  centerNumber: string;
  subjects: string[];
  status: WorkflowStatus;
  registeredDate: string;
}

export interface AcademicAssessment {
  id: string;
  pupilId: string;
  pupilName: string;
  class: string;
  term: 'TERM_1' | 'TERM_2' | 'TERM_3';
  year: number;
  scores: Record<string, number>;
  status: WorkflowStatus;
}

export class PrimaryService {
  private static instance: PrimaryService;
  private faapService = FaapService.getInstance();

  private pupils: PrimaryPupil[] = [
    { id: 'PRI-2026-001', name: 'Alice Namutebi', class: 'Primary Seven', lin: 'L123456789', guardian: 'Joseph Namutebi', contact: '+256 700 112233', feeBalance: 120000 },
    { id: 'PRI-2026-002', name: 'Bob Kasule', class: 'Primary Five', guardian: 'Jane Kasule', contact: '+256 772 445566', feeBalance: 340000 }
  ];

  private pleCandidates: PLECandidate[] = [];
  private assessments: AcademicAssessment[] = [];

  private constructor() {}

  public static getInstance(): PrimaryService {
    if (!PrimaryService.instance) {
      PrimaryService.instance = new PrimaryService();
    }
    return PrimaryService.instance;
  }

  getPupils() { return this.pupils; }

  registerPupil(pupil: Omit<PrimaryPupil, 'id' | 'feeBalance'>) {
    const newPupil: PrimaryPupil = {
      ...pupil,
      id: `PRI-2026-${(this.pupils.length + 1).toString().padStart(3, '0')}`,
      feeBalance: 950000 
    };
    this.pupils.push(newPupil);
    return newPupil;
  }

  collectFee(pupilId: string, amount: number, category: string) {
    const pupil = this.pupils.find(p => p.id === pupilId);
    if (!pupil) throw new Error('Pupil not found');
    
    pupil.feeBalance -= amount;

    this.faapService.postUniversalTransaction({
      sourceProduct: 'EDUCATION',
      memo: `Primary Fee Collection: ${pupil.name} (${category})`,
      debitAccount: '1010',
      creditAccount: '4010',
      amount: amount
    });

    this.faapService.recordCashEntry({
      date: new Date().toISOString().split('T')[0],
      description: `Primary Fee: ${pupil.name} - ${category}`,
      folioReference: pupil.id,
      accountCode: '4010',
      cashAmount: 0,
      bankAmount: amount,
      type: 'RECEIPT'
    });

    return pupil;
  }

  registerPLE(pupilId: string, centerNumber: string) {
    const pupil = this.pupils.find(p => p.id === pupilId);
    if (!pupil || pupil.class !== 'Primary Seven') throw new Error('Invalid candidate');

    const candidate: PLECandidate = {
      id: `PLE-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      pupilId,
      pupilName: pupil.name,
      centerNumber,
      subjects: ['English', 'Mathematics', 'Social Studies', 'Science'],
      status: 'PENDING',
      registeredDate: new Date().toISOString()
    };
    this.pleCandidates.push(candidate);
    return candidate;
  }

  getPLECandidates() { return this.pleCandidates; }

  approvePLERegistration(id: string, indexNumber: string) {
    const candidate = this.pleCandidates.find(c => c.id === id);
    if (candidate) {
      candidate.status = 'APPROVED';
      candidate.indexNumber = indexNumber;
    }
  }

  recordAssessment(assessment: Omit<AcademicAssessment, 'id' | 'status'>) {
    const entry: AcademicAssessment = {
      ...assessment,
      id: `ASM-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      status: 'PENDING'
    };
    this.assessments.push(entry);
    return entry;
  }

  getAssessments() { return this.assessments; }

  approveAssessment(id: string) {
    const asm = this.assessments.find(a => a.id === id);
    if (asm) asm.status = 'APPROVED';
  }
}
