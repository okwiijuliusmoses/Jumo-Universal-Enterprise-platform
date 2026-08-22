/**
 * JUMO Nursery ERP — Sovereign Service
 * Manages infants, guardians, health logs, and ECD milestones.
 * Integrates with FAAP for fee collections.
 */

import { FaapService } from '../../faap/domain/FaapService';

export interface NurseryLearner {
  id: string;
  name: string;
  age: string;
  nurseryClass: string;
  guardian: string;
  contact: string;
  status: 'PRESENT' | 'ABSENT' | 'SICK';
  feeBalance: number;
}

export interface ECDMilestone {
  learnerId: string;
  milestone: string;
  category: 'MOTOR' | 'LANGUAGE' | 'SOCIAL' | 'COGNITIVE';
  status: 'DEVELOPING' | 'ACHIEVED' | 'EXCEEDED';
  observer: string;
  date: string;
}

export class NurseryService {
  private static instance: NurseryService;
  private faapService = FaapService.getInstance();

  private learners: NurseryLearner[] = [
    { id: 'NUR-2026-001', name: 'Liam Kiggundu', age: '3 yrs 2 mos', nurseryClass: 'Baby Class A', guardian: 'Sarah Kiggundu', contact: '+256 701 445522', status: 'PRESENT', feeBalance: 0 },
    { id: 'NUR-2026-002', name: 'Maya Nsubuga', age: '4 yrs 1 mo', nurseryClass: 'Middle Class B', guardian: 'Eng. David Nsubuga', contact: '+256 772 889911', status: 'PRESENT', feeBalance: 150000 },
    { id: 'NUR-2026-003', name: 'Ethan Musoke', age: '5 yrs 0 mos', nurseryClass: 'Top Class A', guardian: 'Dr. Rita Musoke', contact: '+256 752 334411', status: 'PRESENT', feeBalance: 850000 }
  ];

  private milestones: ECDMilestone[] = [];

  private constructor() {}

  public static getInstance(): NurseryService {
    if (!NurseryService.instance) {
      NurseryService.instance = new NurseryService();
    }
    return NurseryService.instance;
  }

  getLearners() { return this.learners; }

  registerLearner(learner: Omit<NurseryLearner, 'id' | 'status' | 'feeBalance'>) {
    const newLearner: NurseryLearner = {
      ...learner,
      id: `NUR-2026-${(this.learners.length + 1).toString().padStart(3, '0')}`,
      status: 'PRESENT',
      feeBalance: 1200000 // Standard tuition fee for new learners
    };
    this.learners.push(newLearner);
    return newLearner;
  }

  collectFee(learnerId: string, amount: number, category: string) {
    const learner = this.learners.find(l => l.id === learnerId);
    if (!learner) throw new Error('Learner not found');
    
    learner.feeBalance -= amount;

    // Post to FAAP
    // Debit Bank (1010), Credit Revenue (4010)
    this.faapService.postUniversalTransaction({
      sourceProduct: 'EDUCATION',
      memo: `Nursery Fee Collection: ${learner.name} (${category})`,
      debitAccount: '1010',
      creditAccount: '4010',
      amount: amount
    });

    // Also record in Cash Book
    this.faapService.recordCashEntry({
      date: new Date().toISOString().split('T')[0],
      description: `Fee: ${learner.name} - ${category}`,
      folioReference: learner.id,
      accountCode: '4010',
      cashAmount: 0,
      bankAmount: amount,
      type: 'RECEIPT'
    });

    return learner;
  }

  recordMilestone(milestone: Omit<ECDMilestone, 'date'>) {
    const entry: ECDMilestone = {
      ...milestone,
      date: new Date().toISOString()
    };
    this.milestones.push(entry);
    return entry;
  }

  getMilestones(learnerId: string) {
    return this.milestones.filter(m => m.learnerId === learnerId);
  }
}
