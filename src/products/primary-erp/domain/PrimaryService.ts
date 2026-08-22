/**
 * JUMO Primary ERP — Sovereign Service
 * Manages PLE candidates, PLE center registration, and tuition collection.
 * Integrates with FAAP for primary education finance.
 */

import { FaapService } from '../../faap/domain/FaapService';

export interface PrimaryPupil {
  id: string;
  name: string;
  class: string;
  lin?: string;
  guardian: string;
  feeBalance: number;
}

export class PrimaryService {
  private static instance: PrimaryService;
  private faapService = FaapService.getInstance();

  private pupils: PrimaryPupil[] = [
    { id: 'PRI-2026-001', name: 'Alice Namutebi', class: 'Primary Seven', lin: 'L123456789', guardian: 'Joseph Namutebi', feeBalance: 120000 },
    { id: 'PRI-2026-002', name: 'Bob Kasule', class: 'Primary Five', guardian: 'Jane Kasule', feeBalance: 340000 }
  ];

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
      feeBalance: 950000 // Standard primary tuition
    };
    this.pupils.push(newPupil);
    return newPupil;
  }

  collectFee(pupilId: string, amount: number, category: string) {
    const pupil = this.pupils.find(p => p.id === pupilId);
    if (!pupil) throw new Error('Pupil not found');
    
    pupil.feeBalance -= amount;

    // Post to FAAP
    this.faapService.postUniversalTransaction({
      sourceProduct: 'EDUCATION',
      memo: `Primary Fee Collection: ${pupil.name} (${category})`,
      debitAccount: '1010',
      creditAccount: '4010',
      amount: amount
    });

    // Record in Cash Book
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
}
