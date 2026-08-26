/**
 * JUMO Education ERP — Universal Sovereign Domain Types
 * Defines the unified data models for K-12, Higher Ed, Vocational, and Continuing Ed.
 */

export type EducationTemplate = 
  | 'NURSERY'
  | 'K12_PRIMARY'
  | 'K12_SECONDARY'
  | 'VOCATIONAL'
  | 'COLLEGE'
  | 'UNIVERSITY'
  | 'PROF_TRAINING';

export interface EdErpInstitutionConfig {
  name: string;
  template: EducationTemplate;
  multiCampus: boolean;
  selectedCampus: string;
}

export interface EdErpCouncilResolution {
  id: string;
  resolutionNumber: string;
  title: string;
  dateApproved: string;
  status: 'PENDING' | 'IMPLEMENTED' | 'SUPERSEDED';
  campusScope: string;
}

// ADMISSIONS PIPELINE
export interface EdErpApplication {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  selectedProgramme: string;
  templateType: EducationTemplate;
  status: 'SUBMITTED' | 'UNDER_REVIEW' | 'OFFER_MADE' | 'ACCEPTED' | 'REJECTED' | 'DEFERRED' | 'WITHDRAWN';
  verifiedDocuments: string[]; // e.g. ["Birth Certificate", "Transcript"]
  guardianName?: string;
  guardianPhone?: string;
}

export interface EdErpStudentProfile {
  id: string;
  regNumber: string;
  fullName: string;
  programmeId: string;
  campus: string;
  currentSemesterOrTerm: string;
  academicStatus: 'NORMAL_PROGRESS' | 'PROBATION' | 'STAY_PUT' | 'GRADUATED' | 'WITHDRAWN';
  guardianName?: string;
  guardianPhone?: string;
  attendanceRate: number; // percentage
  demeritsCount: number;
}

export interface EdErpProgramme {
  id: string;
  code: string;
  name: string;
  level: EducationTemplate;
  durationYears: number;
  courses: string[]; // Course IDs
}

export interface EdErpCourse {
  id: string;
  code: string;
  name: string;
  creditUnits?: number;
  prerequisites?: string[]; // Course codes
}

export interface EdErpSenateExamResult {
  id: string;
  studentId: string;
  courseCode: string;
  continuousAssessmentMark: number;
  examMark: number;
  totalMark: number;
  grade: string;
  termOrSemester: string;
  isSenateApproved: boolean;
}

export interface EdErpVoteBookCommitment {
  id: string;
  voteCode: string;
  voteName: string;
  allocatedAmount: number;
  committedAmount: number;
  balance: number;
}

export interface EdErpInvoice {
  id: string;
  invoiceNumber: string;
  studentId: string;
  studentName: string;
  termOrSemester: string;
  amount: number;
  paidAmount: number;
  status: 'UNPAID' | 'PARTIALLY_PAID' | 'PAID';
}

export interface EdErpReceipt {
  id: string;
  receiptNumber: string;
  invoiceId: string;
  amountPaid: number;
  paymentDate: string;
  channel: string;
}

// LMS / LEARNING MODULE
export interface EdErpLmsLesson {
  id: string;
  courseCode: string;
  title: string;
  content: string;
}

export interface EdErpLmsAssignment {
  id: string;
  courseCode: string;
  title: string;
  dueDate: string;
  submissions: { studentId: string; fileUrl: string; grade?: number; feedback?: string }[];
}

export interface EdErpLmsQuiz {
  id: string;
  courseCode: string;
  title: string;
  questionsCount: number;
  submissions: { studentId: string; score: number }[];
}

// HEALTH CLINIC
export interface EdErpClinicalVisit {
  id: string;
  patientId: string;
  patientName: string;
  date: string;
  diagnosis: string;
  treatment: string;
  vitals: { temp: string; bp: string; pulse: string };
}

// LIBRARY
export interface EdErpLibraryCirculation {
  id: string;
  bookId: string;
  bookTitle: string;
  borrowerId: string;
  borrowerName: string;
  dueDate: string;
  status: 'BORROWED' | 'RETURNED' | 'OVERDUE';
  fineAmount: number;
}

// ACCOMMODATION HOSTELS
export interface EdErpHostelRoom {
  id: string;
  hostelName: string;
  roomNumber: string;
  capacity: number;
  occupiedBeds: number;
  status: 'AVAILABLE' | 'FULL' | 'MAINTENANCE';
  occupants: string[]; // Student IDs
}
