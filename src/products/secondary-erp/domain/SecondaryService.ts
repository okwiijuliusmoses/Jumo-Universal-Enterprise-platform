import { FaapService } from '../../faap/domain/FaapService';
import { WorkflowState, WorkflowTransitionLog } from '../../../components/common/workflow/WorkflowEngine';

export interface SubjectCombinationRule {
  comboCode: string; // e.g. "PCM/Sub-Math", "HEG/ICT"
  principal1: string;
  principal2: string;
  principal3: string;
  subsidiary1: string; // "General Paper"
  subsidiary2: string; // "Sub-Math" or "Subsidiary ICT"
  minOLevelMathGrade: number; // 1 (D1) to 6 (C6)
  minOLevelEnglishGrade: number;
}

export interface SecondaryCandidateRegistration {
  id: string;
  candidateName: string;
  unebIndexNumber: string; // e.g. "U0041/501"
  level: 'UCE' | 'UACE';
  subjectCombination?: string;
  registrationStatus: WorkflowState;
  uacePointsTally?: number; // 0 to 20 Points
  history: WorkflowTransitionLog[];
}

export interface ScienceLabReagent {
  id: string;
  labName: 'CHEMISTRY_LAB' | 'PHYSICS_LAB' | 'BIOLOGY_LAB';
  chemicalName: string;
  quantityInStock: number; // in grams or Liters
  unitOfMeasure: string;
  reorderLevel: number;
  lastUsedDate: string;
}

export class SecondaryService {
  private static instance: SecondaryService;
  private faapService = FaapService.getInstance();

  private combinationRules: SubjectCombinationRule[] = [
    { comboCode: 'PCM/M', principal1: 'Physics', principal2: 'Chemistry', principal3: 'Mathematics', subsidiary1: 'General Paper', subsidiary2: 'Subsidiary ICT', minOLevelMathGrade: 2, minOLevelEnglishGrade: 6 },
    { comboCode: 'PCB/Sub-M', principal1: 'Physics', principal2: 'Chemistry', principal3: 'Biology', subsidiary1: 'General Paper', subsidiary2: 'Sub-Math', minOLevelMathGrade: 4, minOLevelEnglishGrade: 6 },
    { comboCode: 'HEG/ICT', principal1: 'History', principal2: 'Economics', principal3: 'Geography', subsidiary1: 'General Paper', subsidiary2: 'Subsidiary ICT', minOLevelMathGrade: 6, minOLevelEnglishGrade: 4 }
  ];

  private candidates: SecondaryCandidateRegistration[] = [
    { id: 'CAND-001', candidateName: 'Akello Sharon', unebIndexNumber: 'U0082/501', level: 'UACE', subjectCombination: 'PCM/M', registrationStatus: 'APPROVED', uacePointsTally: 19, history: [] },
    { id: 'CAND-002', candidateName: 'Okwiringa David', unebIndexNumber: 'U0082/502', level: 'UACE', subjectCombination: 'PCB/Sub-M', registrationStatus: 'APPROVED', uacePointsTally: 18, history: [] }
  ];

  private labReagents: ScienceLabReagent[] = [
    { id: 'REAG-01', labName: 'CHEMISTRY_LAB', chemicalName: 'Concentrated Hydrochloric Acid (HCl)', quantityInStock: 25, unitOfMeasure: 'Liters', reorderLevel: 5, lastUsedDate: '2026-08-20' },
    { id: 'REAG-02', labName: 'CHEMISTRY_LAB', chemicalName: 'Sodium Hydroxide Pellets (NaOH)', quantityInStock: 12, unitOfMeasure: 'Kg', reorderLevel: 3, lastUsedDate: '2026-08-21' },
    { id: 'REAG-03', labName: 'PHYSICS_LAB', chemicalName: 'Constantan Resistance Wire Reels', quantityInStock: 50, unitOfMeasure: 'Reels', reorderLevel: 10, lastUsedDate: '2026-08-18' }
  ];

  private constructor() {}

  public static getInstance(): SecondaryService {
    if (!SecondaryService.instance) {
      SecondaryService.instance = new SecondaryService();
    }
    return SecondaryService.instance;
  }

  // --- A-LEVEL SUBJECT COMBINATION CONSTRAINT ENGINE ---
  getCombinationRules() { return this.combinationRules; }

  validateSubjectCombination(comboCode: string, oLevelMathGrade: number, oLevelEnglishGrade: number): { valid: boolean; message: string } {
    const rule = this.combinationRules.find(r => r.comboCode === comboCode);
    if (!rule) {
      return { valid: false, message: `Combination ${comboCode} is not recognized under UNEB A-Level guidelines.` };
    }

    if (oLevelMathGrade > rule.minOLevelMathGrade) {
      return { valid: false, message: `O-Level Mathematics grade D${oLevelMathGrade} does not meet minimum requirement (D${rule.minOLevelMathGrade}) for ${comboCode}.` };
    }

    if (oLevelEnglishGrade > rule.minOLevelEnglishGrade) {
      return { valid: false, message: `O-Level English grade D${oLevelEnglishGrade} does not meet minimum requirement (D${rule.minOLevelEnglishGrade}) for ${comboCode}.` };
    }

    return { valid: true, message: `Subject combination ${comboCode} approved for UNEB registration.` };
  }

  // --- UNEB EXAMINATION & CANDIDATE ENGINE ---
  getCandidates() { return this.candidates; }

  registerUnebCandidate(candidateName: string, level: 'UCE' | 'UACE', subjectCombination?: string) {
    const candidateNumber = (this.candidates.length + 501).toString();
    const unebIndexNumber = `U0082/${candidateNumber}`;

    const candidate: SecondaryCandidateRegistration = {
      id: `CAND-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
      candidateName,
      unebIndexNumber,
      level,
      subjectCombination,
      registrationStatus: 'SUBMITTED',
      uacePointsTally: level === 'UACE' ? 20 : undefined,
      history: []
    };

    this.candidates.push(candidate);
    return candidate;
  }

  calculateUacePoints(p1Grade: 'A'|'B'|'C'|'D'|'E'|'O'|'F', p2Grade: 'A'|'B'|'C'|'D'|'E'|'O'|'F', p3Grade: 'A'|'B'|'C'|'D'|'E'|'O'|'F', gpScore: number, subScore: number): number {
    const gradeToPoints = (g: string) => {
      switch(g) {
        case 'A': return 6;
        case 'B': return 5;
        case 'C': return 4;
        case 'D': return 3;
        case 'E': return 2;
        case 'O': return 1;
        default: return 0;
      }
    };

    const p1 = gradeToPoints(p1Grade);
    const p2 = gradeToPoints(p2Grade);
    const p3 = gradeToPoints(p3Grade);
    const gp = gpScore >= 50 ? 1 : 0;
    const sub = subScore >= 50 ? 1 : 0;

    return Math.min(20, p1 + p2 + p3 + gp + sub);
  }

  // --- SCIENCE LABS INVENTORY ENGINE ---
  getLabReagents() { return this.labReagents; }

  depleteLabReagent(id: string, quantityUsed: number) {
    const item = this.labReagents.find(r => r.id === id);
    if (item) {
      item.quantityInStock = Math.max(0, item.quantityInStock - quantityUsed);
      item.lastUsedDate = new Date().toISOString().split('T')[0];
    }
    return item;
  }
}
