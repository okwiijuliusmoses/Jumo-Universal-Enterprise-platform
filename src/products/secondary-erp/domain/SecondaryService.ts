/**
 * JUMO Secondary ERP — Sovereign Service
 * Manages O/A Level students, subject combinations, and UNEB center registration.
 * Integrates with FAAP for institutional finance.
 */

import { FaapService } from '../../faap/domain/FaapService';

export type WorkflowStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'IN_REVIEW';

export interface SecondaryStudent {
  id: string;
  name: string;
  class: string;
  combination?: string;
  indexNumber?: string;
  guardian: string;
  feeBalance: number;
  status: 'ACTIVE' | 'INACTIVE' | 'GRADUATED';
}

export interface AcademicAssessment {
  id: string;
  studentId: string;
  subject: string;
  score: number;
  type: 'MID-TERM' | 'END-OF-TERM' | 'MOCK';
  term: string;
  year: number;
  status: WorkflowStatus;
  recordedBy: string;
  approvedBy?: string;
}

export interface FeeWaiverRequest {
  id: string;
  studentId: string;
  amount: number;
  reason: string;
  status: WorkflowStatus;
  requestedBy: string;
  decisionBy?: string;
}

export class SecondaryService {
  private static instance: SecondaryService;
  private faapService = FaapService.getInstance();

  private students: SecondaryStudent[] = [
    { id: 'SEC-2026-001', name: 'James Okello', class: 'Senior Four', indexNumber: 'U0001/001', guardian: 'Peter Okello', feeBalance: 250000, status: 'ACTIVE' },
    { id: 'SEC-2026-002', name: 'Grace Anena', class: 'Senior Six', combination: 'PCM/Sub-Math', indexNumber: 'U0001/501', guardian: 'Sarah Anena', feeBalance: 450000, status: 'ACTIVE' }
  ];

  private assessments: AcademicAssessment[] = [];
  private waiverRequests: FeeWaiverRequest[] = [];

  private constructor() {}

  public static getInstance(): SecondaryService {
    if (!SecondaryService.instance) {
      SecondaryService.instance = new SecondaryService();
    }
    return SecondaryService.instance;
  }

  // --- Student Management ---
  getStudents() { return this.students; }

  registerStudent(student: Omit<SecondaryStudent, 'id' | 'feeBalance' | 'status'>) {
    const newStudent: SecondaryStudent = {
      ...student,
      id: `SEC-2026-${(this.students.length + 1).toString().padStart(3, '0')}`,
      feeBalance: 1500000, // Standard secondary tuition
      status: 'ACTIVE'
    };
    this.students.push(newStudent);
    return newStudent;
  }

  updateStudent(id: string, updates: Partial<SecondaryStudent>) {
    const index = this.students.findIndex(s => s.id === id);
    if (index !== -1) {
      this.students[index] = { ...this.students[index], ...updates };
      return this.students[index];
    }
    throw new Error('Student not found');
  }

  // --- Academic / HOD Management ---
  getAssessments() { return this.assessments; }

  recordScore(assessment: Omit<AcademicAssessment, 'id' | 'status' | 'recordedBy'>) {
    const newAssessment: AcademicAssessment = {
      ...assessment,
      id: `ASM-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      status: 'PENDING',
      recordedBy: 'Secondary HOD'
    };
    this.assessments.push(newAssessment);
    return newAssessment;
  }

  approveAssessment(id: string, approvedBy: string) {
    const assessment = this.assessments.find(a => a.id === id);
    if (assessment) {
      assessment.status = 'APPROVED';
      assessment.approvedBy = approvedBy;
      return assessment;
    }
    throw new Error('Assessment not found');
  }

  // --- Financial / Bursar Management ---
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

  requestWaiver(request: Omit<FeeWaiverRequest, 'id' | 'status' | 'requestedBy'>) {
    const newRequest: FeeWaiverRequest = {
      ...request,
      id: `WVR-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      status: 'PENDING',
      requestedBy: 'Secondary Bursar'
    };
    this.waiverRequests.push(newRequest);
    return newRequest;
  }

  getWaivers() { return this.waiverRequests; }

  approveWaiver(id: string, decisionBy: string) {
    const request = this.waiverRequests.find(r => r.id === id);
    if (request) {
      request.status = 'APPROVED';
      request.decisionBy = decisionBy;
      
      // Update student balance
      const student = this.students.find(s => s.id === request.studentId);
      if (student) {
        student.feeBalance -= request.amount;
        
        // Post to FAAP as an expense/discount
        this.faapService.postUniversalTransaction({
          sourceProduct: 'EDUCATION',
          memo: `Fee Waiver Approved: ${student.name}`,
          debitAccount: '5010', // Discount/Scholarship Expense
          creditAccount: '1210', // Accounts Receivable (Student Fees)
          amount: request.amount
        });
      }
      return request;
    }
    throw new Error('Waiver request not found');
  }
}
