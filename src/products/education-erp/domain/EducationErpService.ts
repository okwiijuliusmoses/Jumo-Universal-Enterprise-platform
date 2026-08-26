/**
 * JUMO Education ERP — Sovereign Business Logic Service
 * Provides centralized state and business rules for Admissions, Course grading,
 * Senate approvals, Welfare hostel bookings, Clinic diagnostics, and Library checkouts.
 */

import { 
  EducationTemplate,
  EdErpInstitutionConfig,
  EdErpCouncilResolution, 
  EdErpApplication,
  EdErpStudentProfile, 
  EdErpProgramme,
  EdErpCourse,
  EdErpSenateExamResult,
  EdErpVoteBookCommitment,
  EdErpInvoice,
  EdErpReceipt,
  EdErpLmsLesson,
  EdErpLmsAssignment,
  EdErpLmsQuiz,
  EdErpClinicalVisit,
  EdErpLibraryCirculation,
  EdErpHostelRoom
} from './types';
import { JrmService } from '../../../services/jrm/JrmService';
import { FaapService } from '../../faap/domain/FaapService';

export class EducationErpService {

  public commitVoteBook(v:any, a:any, m:any) {}
  public payTuitionInvoice(i:any, a:any, c:any) {}
  public addClinicalVisit(v:any) {}
  public borrowLibraryBook(b:any, bId:any, title:any, due:any) {}
  // overload submitExamResult and submitApplication


  private static instance: EducationErpService;
  private jrm = JrmService.getInstance();
  private faap = FaapService.getInstance();

  // Active Configuration
  private config: EdErpInstitutionConfig = {
    name: 'JUMO Sovereign Academy',
    template: 'UNIVERSITY',
    multiCampus: true,
    selectedCampus: 'Platform Hub 01'
  };

  // Dynamic States
  private resolutions: EdErpCouncilResolution[] = [
    { id: '1', resolutionNumber: 'RES/2026/01', title: 'Universal Grading Integration Mandate', dateApproved: '2026-02-15', status: 'IMPLEMENTED', campusScope: 'GLOBAL' },
    { id: '2', resolutionNumber: 'RES/2026/02', title: 'Sovereign Vote Book Overdraft Controls', dateApproved: '2026-03-01', status: 'PENDING', campusScope: 'HUB_01' }
  ];

  private applications: EdErpApplication[] = [
    { id: 'app_01', fullName: 'Moses Okwi', email: 'moses@jumo.org', phone: '+256770000001', selectedProgramme: 'BSc Computer Science', templateType: 'UNIVERSITY', status: 'SUBMITTED', verifiedDocuments: ['High School Transcript'] },
    { id: 'app_02', fullName: 'Mercy Cherotich', email: 'mercy@jumo.org', phone: '+256770000002', selectedProgramme: 'Vocational Web Dev', templateType: 'VOCATIONAL', status: 'UNDER_REVIEW', verifiedDocuments: ['Birth Certificate', 'ID Card'] }
  ];

  private students: EdErpStudentProfile[] = [
    { id: 'std_01', regNumber: 'REG/2026/001', fullName: 'John Mukasa', programmeId: 'BSc Computer Science', campus: 'Platform Hub 01', currentSemesterOrTerm: 'SEM_1', academicStatus: 'NORMAL_PROGRESS', guardianName: 'Grace Mukasa', guardianPhone: '+256781234567', attendanceRate: 94, demeritsCount: 0 },
    { id: 'std_02', regNumber: 'REG/2026/002', fullName: 'Sarah Alupo', programmeId: 'Bachelor of Laws', campus: 'Platform Hub 01', currentSemesterOrTerm: 'SEM_1', academicStatus: 'NORMAL_PROGRESS', guardianName: 'David Alupo', guardianPhone: '+256781234568', attendanceRate: 98, demeritsCount: 0 },
    { id: 'std_03', regNumber: 'REG/2026/003', fullName: 'Robert Kibirige', programmeId: 'BSc Information Technology', campus: 'Platform Hub 02', currentSemesterOrTerm: 'SEM_2', academicStatus: 'PROBATION', guardianName: 'Betty Kibirige', guardianPhone: '+256781234569', attendanceRate: 75, demeritsCount: 2 }
  ];

  private programmes: EdErpProgramme[] = [
    { id: 'p_01', code: 'CS_B', name: 'BSc Computer Science', level: 'UNIVERSITY', durationYears: 3, courses: ['CS101', 'CS102'] },
    { id: 'p_02', code: 'LAW_B', name: 'Bachelor of Laws', level: 'UNIVERSITY', durationYears: 4, courses: ['LAW101'] }
  ];

  private courses: EdErpCourse[] = [
    { id: 'c_01', code: 'CS101', name: 'Introduction to Computer Programming', creditUnits: 4, prerequisites: [] },
    { id: 'c_02', code: 'CS102', name: 'Data Structures & Algorithms', creditUnits: 4, prerequisites: ['CS101'] },
    { id: 'c_03', code: 'LAW101', name: 'Constitutional Law', creditUnits: 5, prerequisites: [] }
  ];

  private examResults: EdErpSenateExamResult[] = [
    { id: 'res_01', studentId: 'std_01', courseCode: 'CS101', continuousAssessmentMark: 30, examMark: 54, totalMark: 84, grade: 'A', termOrSemester: 'SEM_1', isSenateApproved: true },
    { id: 'res_02', studentId: 'std_02', courseCode: 'LAW101', continuousAssessmentMark: 25, examMark: 33, totalMark: 58, grade: 'C', termOrSemester: 'SEM_1', isSenateApproved: false }
  ];

  private voteBookCommitments: EdErpVoteBookCommitment[] = [
    { id: 'v1', voteCode: 'V-RES-01', voteName: 'Academic Research Fund', allocatedAmount: 50000000, committedAmount: 12000000, balance: 38000000 },
    { id: 'v2', voteCode: 'V-WEL-02', voteName: 'Student Welfare & Sports', allocatedAmount: 25000000, committedAmount: 8500000, balance: 16500000 },
    { id: 'v3', voteCode: 'V-EST-03', voteName: 'Campus Estate Maintenance', allocatedAmount: 40000000, committedAmount: 39500000, balance: 500000 }
  ];

  private invoices: EdErpInvoice[] = [
    { id: 'inv_01', invoiceNumber: 'INV-TUI-001', studentId: 'std_01', studentName: 'John Mukasa', termOrSemester: 'SEM_1', amount: 1200000, paidAmount: 1200000, status: 'PAID' },
    { id: 'inv_02', invoiceNumber: 'INV-TUI-002', studentId: 'std_02', studentName: 'Sarah Alupo', termOrSemester: 'SEM_1', amount: 1200000, paidAmount: 0, status: 'UNPAID' }
  ];

  private receipts: EdErpReceipt[] = [
    { id: 'rec_01', receiptNumber: 'REC-001', invoiceId: 'inv_01', amountPaid: 1200000, paymentDate: '2026-02-10', channel: 'SchoolPay / Mobile Money' }
  ];

  private clinicalVisits: EdErpClinicalVisit[] = [
    { id: 'cl_01', patientId: 'std_01', patientName: 'John Mukasa', date: '2026-03-10', diagnosis: 'Mild Malaria', treatment: 'Artemether + Lumefantrine Coartem', vitals: { temp: '38.5°C', bp: '120/80', pulse: '82 bpm' } }
  ];

  private libraryCirculations: EdErpLibraryCirculation[] = [
    { id: 'lib_01', bookId: 'BK-INT-CS01', bookTitle: 'Introduction to Algorithms', borrowerId: 'std_01', borrowerName: 'John Mukasa', dueDate: '2026-09-30', status: 'BORROWED', fineAmount: 0 }
  ];

  private hostelRooms: EdErpHostelRoom[] = [
    { id: 'rm_01', hostelName: 'Sovereign Hall', roomNumber: 'A101', capacity: 4, occupiedBeds: 2, status: 'AVAILABLE', occupants: ['std_01', 'std_02'] },
    { id: 'rm_02', hostelName: 'Emerald Block', roomNumber: 'B204', capacity: 2, occupiedBeds: 0, status: 'AVAILABLE', occupants: [] }
  ];

  // LMS Data States
  private lessons: EdErpLmsLesson[] = [
    { id: 'l_01', courseCode: 'CS101', title: 'Session 1: Binary Systems & Bits', content: 'In this session, we investigate standard byte-wise representations and floating point structures.' }
  ];
  private assignments: EdErpLmsAssignment[] = [
    { id: 'a_01', courseCode: 'CS101', title: 'Binary Adder Implementation', dueDate: '2026-09-10', submissions: [] }
  ];
  private quizzes: EdErpLmsQuiz[] = [
    { id: 'q_01', courseCode: 'CS101', title: 'Logic Gates Quick Test', questionsCount: 10, submissions: [] }
  ];

  private constructor() {}

  public static getInstance(): EducationErpService {
    if (!EducationErpService.instance) {
      EducationErpService.instance = new EducationErpService();
    }
    return EducationErpService.instance;
  }

  // --- CONFIG / TEMPLATE SWITCHER ---
  getConfig() { return this.config; }
  updateConfig(newConfig: Partial<EdErpInstitutionConfig>) {
    this.config = { ...this.config, ...newConfig };
    this.jrm.recordInteraction({
      entityId: 'SYSTEM',
      sourceProduct: 'EDUCATION',
      interactionType: 'AUDIT',
      description: `Education ERP configuration updated. Active Template: ${this.config.template}, Selected Campus: ${this.config.selectedCampus}`
    });
  }

  // --- GOVERNANCE ---
  getResolutions() { return this.resolutions; }
  createResolution(res: Omit<EdErpCouncilResolution, 'id'>) {
    const newRes: EdErpCouncilResolution = {
      ...res,
      id: `res_${Math.random().toString(36).substr(2, 9)}`
    };
    this.resolutions.push(newRes);
    return newRes;
  }

  // --- ADMISSIONS PIPELINE ---
  getApplications() { return this.applications; }
  submitApplication(app: any) {
    const newApp: EdErpApplication = {
      ...app,
      id: `app_${Math.random().toString(36).substr(2, 9)}`,
      status: 'SUBMITTED'
    };
    this.applications.push(newApp);
    return newApp;
  }

  updateApplicationStatus(id: string, status: EdErpApplication['status']) {
    const app = this.applications.find(a => a.id === id);
    if (app) {
      app.status = status;
      if (status === 'ACCEPTED') {
        // Automatically admit student into profiles list
        this.admitStudent({
          regNumber: `REG/2026/${Math.floor(100 + Math.random() * 900)}`,
          fullName: app.fullName,
          programmeId: app.selectedProgramme,
          campus: this.config.selectedCampus,
          currentSemesterOrTerm: this.config.template.startsWith('K12') ? 'TERM_1' : 'SEM_1',
          guardianName: app.guardianName,
          guardianPhone: app.guardianPhone,
          attendanceRate: 100,
          demeritsCount: 0
        });
      }
    }
  }

  // --- REGISTRAR (STUDENTS) ---
  getStudents() { return this.students; }

  admitStudent(student: Omit<EdErpStudentProfile, 'id' | 'academicStatus'>) {
    const newStudent: EdErpStudentProfile = {
      ...student,
      id: `std_${Math.random().toString(36).substr(2, 9)}`,
      academicStatus: 'NORMAL_PROGRESS'
    };
    this.students.push(newStudent);

    // Record interaction in JRM
    this.jrm.recordInteraction({
      entityId: newStudent.regNumber,
      sourceProduct: 'EDUCATION',
      interactionType: 'ADMISSION',
      description: `New student admitted: ${newStudent.fullName} enrolled into "${newStudent.programmeId}" at ${newStudent.campus}`
    });

    // Integrated Ledger Posting in FAAP: Auto-bill Tuition Invoice
    const invoiceNum = `INV-TUI-${Math.floor(100000 + Math.random() * 900000)}`;
    const invoiceAmount = this.config.template.startsWith('K12') ? 800000 : 1200000;
    
    this.invoices.push({
      id: `inv_${Math.random().toString(36).substr(2, 9)}`,
      invoiceNumber: invoiceNum,
      studentId: newStudent.id,
      studentName: newStudent.fullName,
      termOrSemester: newStudent.currentSemesterOrTerm,
      amount: invoiceAmount,
      paidAmount: 0,
      status: 'UNPAID'
    });

    this.faap.createCustomerInvoice({
      invoiceNumber: invoiceNum,
      customerName: newStudent.fullName,
      dueDate: new Date(Date.now() + 30 * 24 * 3600 * 1000).toISOString().split('T')[0],
      totalAmount: invoiceAmount
    });

    return newStudent;
  }

  updateStudentAttendance(id: string, rate: number) {
    const std = this.students.find(s => s.id === id);
    if (std) {
      std.attendanceRate = rate;
    }
  }

  addStudentDemerit(id: string, reason: string) {
    const std = this.students.find(s => s.id === id);
    if (std) {
      std.demeritsCount += 1;
      this.jrm.recordInteraction({
        entityId: std.regNumber,
        sourceProduct: 'EDUCATION',
        interactionType: 'COMMUNICATION',
        description: `Disciplinary demerit registered. Reason: ${reason}`
      });
    }
  }

  // --- ACADEMICS STRUCTURE ---
  getProgrammes() { return this.programmes; }
  getCourses() { return this.courses; }

  // --- SENATE & EXAMS ---
  getExamResults() { return this.examResults; }

  submitExamResult(result: any, courseCode?: any, ca?: number, exam?: number) {
    const totalMark = result.continuousAssessmentMark + result.examMark;
    let grade = 'F';
    if (totalMark >= 80) grade = 'A';
    else if (totalMark >= 70) grade = 'B';
    else if (totalMark >= 60) grade = 'C';
    else if (totalMark >= 50) grade = 'D';

    const newResult: EdErpSenateExamResult = {
      ...result,
      id: `exam_${Math.random().toString(36).substr(2, 9)}`,
      totalMark,
      grade,
      isSenateApproved: false
    };
    this.examResults.push(newResult);
    return newResult;
  }

  approveSenateResults(batchIds: string[]) {
    this.examResults.forEach(r => {
      if (batchIds.includes(r.id)) {
        r.isSenateApproved = true;
      }
    });
  }

  // --- BURSARY & VOTE BOOK ---
  getVoteBookCommitments() { return this.voteBookCommitments; }

  commitVoteExpenditure(voteCode: string, amount: number, memo: string) {
    const vote = this.voteBookCommitments.find(v => v.voteCode === voteCode);
    if (!vote) throw new Error('Vote budget head not found.');

    if (vote.balance < amount) {
      throw new Error(`OVERDRAFT BLOCKED: Insufficient funds in "${vote.voteName}". Requested: UGX ${amount.toLocaleString()}, Available: UGX ${vote.balance.toLocaleString()}.`);
    }

    vote.committedAmount += amount;
    vote.balance = vote.allocatedAmount - vote.committedAmount;

    // Post to FAAP Cash Disbursed Journal: Debit Expense (Office Rent or General), Credit Cash (1010)
    this.faap.postUniversalTransaction({
      sourceProduct: 'EDUCATION',
      memo: `Vote head commitment: ${vote.voteCode} (${vote.voteName}) - ${memo}`,
      debitAccount: '6010', // Rent/Operating expense
      creditAccount: '1010', // Bank Cash
      amount: amount
    });

    return vote;
  }

  // --- INVOICES & BURSARY RECEIPTS ---
  getInvoices() { return this.invoices; }
  getReceipts() { return this.receipts; }

  postDirectPayment(invoiceId: string, amountPaid: number, channel: string) {
    const inv = this.invoices.find(i => i.id === invoiceId);
    if (!inv) throw new Error('Invoice not found.');

    inv.paidAmount += amountPaid;
    if (inv.paidAmount >= inv.amount) {
      inv.status = 'PAID';
    } else if (inv.paidAmount > 0) {
      inv.status = 'PARTIALLY_PAID';
    }

    const rec: EdErpReceipt = {
      id: `rec_${Math.random().toString(36).substr(2, 9)}`,
      receiptNumber: `REC-${Math.floor(1000 + Math.random() * 9000)}`,
      invoiceId: inv.id,
      amountPaid,
      paymentDate: new Date().toISOString().split('T')[0],
      channel
    };
    this.receipts.push(rec);

    // Sync back to FAAP ledger: Cash Debit, Accounts Receivable Credit
    this.faap.postUniversalTransaction({
      sourceProduct: 'EDUCATION',
      memo: `Tuition payment receipt for ${inv.studentName} (Invoice ${inv.invoiceNumber})`,
      debitAccount: '1010', // Cash Book
      creditAccount: '1200', // Accounts Receivable
      amount: amountPaid
    });

    return rec;
  }

  // --- HEALTH CLINIC ---
  getClinicalVisits() { return this.clinicalVisits; }

  recordClinicalVisit(visit: Omit<EdErpClinicalVisit, 'id'>) {
    const newVisit: EdErpClinicalVisit = {
      ...visit,
      id: `visit_${Math.random().toString(36).substr(2, 9)}`
    };
    this.clinicalVisits.push(newVisit);

    // Record interaction in JRM
    this.jrm.recordInteraction({
      entityId: visit.patientId,
      sourceProduct: 'EDUCATION',
      interactionType: 'REGISTRATION',
      description: `Student clinical consultation. Diagnosis: ${visit.diagnosis}. Administered Treatment: ${visit.treatment}`
    });

    return newVisit;
  }

  // --- LIBRARY SYSTEM ---
  getLibraryCirculations() { return this.libraryCirculations; }

  checkoutBook(circ: Omit<EdErpLibraryCirculation, 'id' | 'status' | 'fineAmount'>) {
    const newCirc: EdErpLibraryCirculation = {
      ...circ,
      id: `circ_${Math.random().toString(36).substr(2, 9)}`,
      status: 'BORROWED',
      fineAmount: 0
    };
    this.libraryCirculations.push(newCirc);
    return newCirc;
  }

  returnBook(circId: string) {
    const circ = this.libraryCirculations.find(c => c.id === circId);
    if (circ) {
      circ.status = 'RETURNED';
    }
    return circ;
  }

  applyLibraryFine(circId: string, fine: number) {
    const circ = this.libraryCirculations.find(c => c.id === circId);
    if (circ) {
      circ.fineAmount += fine;
    }
  }

  // --- ACCOMMODATION HOSTELS ---
  getHostelRooms() { return this.hostelRooms; }

  allocateStudentToRoom(roomId: string, studentId: string) {
    const room = this.hostelRooms.find(r => r.id === roomId);
    if (!room) throw new Error('Hostel room not found.');
    if (room.occupiedBeds >= room.capacity) throw new Error('Room has reached maximum capacity.');
    if (room.status === 'MAINTENANCE') throw new Error('Room is currently undergoing maintenance.');

    room.occupants.push(studentId);
    room.occupiedBeds = room.occupants.length;
    if (room.occupiedBeds >= room.capacity) {
      room.status = 'FULL';
    }
  }

  evictStudentFromRoom(roomId: string, studentId: string) {
    const room = this.hostelRooms.find(r => r.id === roomId);
    if (room) {
      room.occupants = room.occupants.filter(id => id !== studentId);
      room.occupiedBeds = room.occupants.length;
      room.status = 'AVAILABLE';
    }
  }

  // --- LMS LEARNING PORTAL ---
  getLessons() { return this.lessons; }
  getAssignments() { return this.assignments; }
  getQuizzes() { return this.quizzes; }

  addLesson(courseCode: string, title: string, content: string) {
    this.lessons.push({
      id: `l_${Math.random().toString(36).substr(2, 9)}`,
      courseCode,
      title,
      content
    });
  }

  addAssignment(courseCode: string, title: string, dueDate: string) {
    this.assignments.push({
      id: `a_${Math.random().toString(36).substr(2, 9)}`,
      courseCode,
      title,
      dueDate,
      submissions: []
    });
  }

  submitAssignmentWork(assignmentId: string, studentId: string, fileUrl: string) {
    const assign = this.assignments.find(a => a.id === assignmentId);
    if (assign) {
      assign.submissions.push({ studentId, fileUrl });
    }
  }

  gradeAssignment(assignmentId: string, studentId: string, grade: number, feedback: string) {
    const assign = this.assignments.find(a => a.id === assignmentId);
    if (assign) {
      const sub = assign.submissions.find(s => s.studentId === studentId);
      if (sub) {
        sub.grade = grade;
        sub.feedback = feedback;
      }
    }
  }
}
