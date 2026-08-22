/**
 * JUMO Secondary ERP — Sovereign Service
 * Manages O/A Level students, subject combinations, and UNEB center registration.
 * Integrates with FAAP for institutional finance.
 */

import { FaapService } from '../../faap/domain/FaapService';

export interface SecondaryStudent {
  id: string;
  name: string;
  class: string;
  combination?: string;
  indexNumber?: string;
  guardian: string;
  feeBalance: number;
}

export class SecondaryService {
  private static instance: SecondaryService;
  private faapService = FaapService.getInstance();

  private students: SecondaryStudent[] = [
    { id: 'SEC-2026-001', name: 'James Okello', class: 'Senior Four', indexNumber: 'U0001/001', guardian: 'Peter Okello', feeBalance: 250000 },
    { id: 'SEC-2026-002', name: 'Grace Anena', class: 'Senior Six', combination: 'PCM/Sub-Math', indexNumber: 'U0001/501', guardian: 'Sarah Anena', feeBalance: 450000 }
  ];

  private constructor() {}

  public static getInstance(): SecondaryService {
    if (!SecondaryService.instance) {
      SecondaryService.instance = new SecondaryService();
    }
    return SecondaryService.instance;
  }

  getStudents() { return this.students; }

  registerStudent(student: Omit<SecondaryStudent, 'id' | 'feeBalance'>) {
    const newStudent: SecondaryStudent = {
      ...student,
      id: `SEC-2026-${(this.students.length + 1).toString().padStart(3, '0')}`,
      feeBalance: 1500000 // Standard secondary tuition
    };
    this.students.push(newStudent);
    return newStudent;
  }

  collectFee(studentId: string, amount: number, category: string) {
    const student = this.students.find(s => s.id === studentId);
    if (!student) throw new Error('Student not found');
    
    student.feeBalance -= amount;

    // Post to FAAP
    this.faapService.postUniversalTransaction({
      sourceProduct: 'EDUCATION',
      memo: `Secondary Fee Collection: ${student.name} (${category})`,
      debitAccount: '1010',
      creditAccount: '4010',
      amount: amount
    });

    // Record in Cash Book
    this.faapService.recordCashEntry({
      date: new Date().toISOString().split('T')[0],
      description: `Secondary Fee: ${student.name} - ${category}`,
      folioReference: student.id,
      accountCode: '4010',
      cashAmount: 0,
      bankAmount: amount,
      type: 'RECEIPT'
    });

    return student;
  }
}
