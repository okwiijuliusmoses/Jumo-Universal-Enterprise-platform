import { FaapService } from '../../faap/domain/FaapService';

export type WorkflowStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'IN_REVIEW';

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
  id: string;
  learnerId: string;
  milestone: string;
  category: 'MOTOR' | 'LANGUAGE' | 'SOCIAL' | 'COGNITIVE';
  status: 'DEVELOPING' | 'ACHIEVED' | 'EXCEEDED';
  workflowStatus: WorkflowStatus;
  observer: string;
  date: string;
}

export interface PickupAuthorization {
  id: string;
  learnerId: string;
  authorizedPerson: string;
  relation: string;
  idNumber: string;
  photoUrl?: string;
  status: WorkflowStatus;
  requestedBy: string;
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
  private pickupAuthorizations: PickupAuthorization[] = [];

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
      feeBalance: 1200000 
    };
    this.learners.push(newLearner);
    return newLearner;
  }

  collectFee(learnerId: string, amount: number, category: string) {
    const learner = this.learners.find(l => l.id === learnerId);
    if (!learner) throw new Error('Learner not found');
    
    learner.feeBalance -= amount;

    this.faapService.postUniversalTransaction({
      sourceProduct: 'EDUCATION',
      memo: `Nursery Fee Collection: ${learner.name} (${category})`,
      debitAccount: '1010',
      creditAccount: '4010',
      amount: amount
    });

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

  recordMilestone(milestone: Omit<ECDMilestone, 'id' | 'date' | 'workflowStatus'>) {
    const entry: ECDMilestone = {
      ...milestone,
      id: `MLS-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      workflowStatus: 'PENDING',
      date: new Date().toISOString()
    };
    this.milestones.push(entry);
    return entry;
  }

  approveMilestone(id: string) {
    const m = this.milestones.find(ms => ms.id === id);
    if (m) m.workflowStatus = 'APPROVED';
  }

  getAllMilestones() { return this.milestones; }

  requestPickupAuthorization(auth: Omit<PickupAuthorization, 'id' | 'status'>) {
    const newAuth: PickupAuthorization = {
      ...auth,
      id: `PKP-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      status: 'PENDING'
    };
    this.pickupAuthorizations.push(newAuth);
    return newAuth;
  }

  getPickupAuthorizations() { return this.pickupAuthorizations; }

  approvePickup(id: string) {
    const auth = this.pickupAuthorizations.find(a => a.id === id);
    if (auth) auth.status = 'APPROVED';
  }
}
