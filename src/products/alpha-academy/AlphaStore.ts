import { Student as ERPStudent, AssessmentRecord, TimetableEntry, AttendanceRecord, FeeInvoice } from '../../erp/types';

export interface AlphaStudent extends ERPStudent {
  cohortId?: string;
  house?: string;
  medicalInfo?: string;
  formerSchool?: string;
}

export interface StudentApplicant {
  id: string;
  applicantName: string;
  targetClass: string;
  guardianPhone: string;
  guardianName: string;
  formerSchool: string;
  interviewScore?: number;
  entranceExamScore?: number;
  status: 'PENDING_INQUIRY' | 'SCORED' | 'OFFERED' | 'ENROLLED' | 'REJECTED';
  submissionDate: string;
}

export interface ParentNote {
  id: string;
  studentId: string;
  guardianName: string;
  teacherName: string;
  subject: string;
  message: string;
  timestamp: string;
  sender: 'PARENT' | 'TEACHER';
}

export interface HostelBed {
  id: string;
  dormName: string;
  roomNo: string;
  bedNo: string;
  allocatedStudentId?: string;
  capacity: number;
}

export interface LibraryLoanItem {
  id: string;
  bookTitle: string;
  isbn: string;
  studentId: string;
  issueDate: string;
  dueDate: string;
  returned: boolean;
  fineUGX: number;
}

export interface TransportRoute {
  id: string;
  routeName: string;
  driverName: string;
  vehicleNo: string;
  capacity: number;
  assignedStudentIds: string[];
}

export interface AuditLogEntry {
  id: string;
  action: string;
  actorRole: string;
  timestamp: string;
  details: string;
}

export class AADatabase {
  static listeners: (() => void)[] = [];

  static subscribe(listener: () => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  static notify() {
    this.listeners.forEach(l => l());
  }

  static activeTerm = '2026 Term 1';
  static schoolProfile = {
    name: 'Alpha Academy Secondary School',
    emisCode: 'EMIS-UG-88291',
    address: 'Plot 42 Academic Drive, Kampala',
    motto: 'Excellence and Integrity',
    principalName: 'Dr. Arthur Pendelton'
  };

  static bellSchedule = [
    { period: 'Period 1', time: '08:00 - 08:45', type: 'ACADEMIC' },
    { period: 'Period 2', time: '08:45 - 09:30', type: 'ACADEMIC' },
    { period: 'Morning Break', time: '09:30 - 10:00', type: 'BREAK' },
    { period: 'Period 3', time: '10:00 - 10:45', type: 'ACADEMIC' },
    { period: 'Period 4', time: '10:45 - 11:30', type: 'ACADEMIC' },
    { period: 'Lunch Break', time: '13:00 - 14:00', type: 'BREAK' }
  ];

  static applicants: StudentApplicant[] = [
    {
      id: 'APP-101',
      applicantName: 'David Kintu',
      targetClass: 'S.1',
      guardianPhone: '+256772100200',
      guardianName: 'Robert Kintu',
      formerSchool: 'St. Peter Primary School',
      interviewScore: 82,
      entranceExamScore: 78,
      status: 'OFFERED',
      submissionDate: '2026-01-05'
    },
    {
      id: 'APP-102',
      applicantName: 'Grace Akello',
      targetClass: 'S.5-SCI',
      guardianPhone: '+256701882233',
      guardianName: 'Mary Akello',
      formerSchool: 'Gayaza High School',
      interviewScore: 65,
      entranceExamScore: 68,
      status: 'PENDING_INQUIRY',
      submissionDate: '2026-01-12'
    }
  ];

  static students: AlphaStudent[] = [
    {
      id: 'STU-001',
      admissionNo: 'LIN-2026-001',
      fullName: 'John Doe',
      gender: 'MALE',
      dateOfBirth: '2010-05-14',
      classLevel: 'S.1',
      stream: 'East',
      guardianName: 'Jane Doe',
      guardianPhone: '+256700000001',
      guardianEmail: 'jane@example.com',
      boardingStatus: 'BOARDER',
      admissionDate: '2025-01-10',
      status: 'ACTIVE',
      feeBalance: 500,
      attendanceRate: 96,
      cohortId: 'COHORT-2026',
      house: 'Mandela House',
      medicalInfo: 'No known allergies'
    },
    {
      id: 'STU-002',
      admissionNo: 'LIN-2026-002',
      fullName: 'Sarah Namubiru',
      gender: 'FEMALE',
      dateOfBirth: '2009-11-20',
      classLevel: 'S.4',
      stream: 'North',
      guardianName: 'Joseph Namubiru',
      guardianPhone: '+256752331100',
      guardianEmail: 'namubiru@example.com',
      boardingStatus: 'DAY',
      admissionDate: '2023-01-15',
      status: 'ACTIVE',
      feeBalance: 0,
      attendanceRate: 98,
      cohortId: 'COHORT-2023',
      house: 'Nyerere House'
    }
  ];

  static parentNotes: ParentNote[] = [
    {
      id: 'NOTE-001',
      studentId: 'STU-001',
      guardianName: 'Jane Doe',
      teacherName: 'Mr. Smith (Math Teacher)',
      subject: 'Mid-term Progress Query',
      message: 'Hello Mr. Smith, how is John performing in Mathematics CA test?',
      timestamp: '2026-02-10 10:15',
      sender: 'PARENT'
    },
    {
      id: 'NOTE-002',
      studentId: 'STU-001',
      guardianName: 'Jane Doe',
      teacherName: 'Mr. Smith (Math Teacher)',
      subject: 'Re: Mid-term Progress Query',
      message: 'Hello Mrs. Doe, John scored 85% in CA1. He is doing very well!',
      timestamp: '2026-02-10 11:30',
      sender: 'TEACHER'
    }
  ];

  static fees: FeeInvoice[] = [
    {
      id: 'INV-001',
      invoiceNumber: 'FEE-2026-T1-001',
      studentId: 'STU-001',
      studentName: 'John Doe',
      classLevel: 'S.1',
      term: '2026 Term 1',
      academicYear: '2026',
      items: [
        { description: 'Tuition Fee', amount: 350 },
        { description: 'Boarding & Hostel', amount: 100 },
        { description: 'Exam & Lab Uniform', amount: 50 }
      ],
      totalBilled: 500,
      totalPaid: 0,
      balance: 500,
      status: 'UNPAID',
      dateIssued: '2026-01-01',
      dueDate: '2026-02-15'
    },
    {
      id: 'INV-002',
      invoiceNumber: 'FEE-2026-T1-002',
      studentId: 'STU-002',
      studentName: 'Sarah Namubiru',
      classLevel: 'S.4',
      term: '2026 Term 1',
      academicYear: '2026',
      items: [{ description: 'Tuition Fee', amount: 450 }],
      totalBilled: 450,
      totalPaid: 450,
      balance: 0,
      status: 'PAID',
      dateIssued: '2026-01-01',
      dueDate: '2026-02-15'
    }
  ];

  static attendance: AttendanceRecord[] = [
    {
      id: 'ATT-1001',
      date: new Date().toISOString().split('T')[0],
      targetType: 'STUDENT',
      targetId: 'STU-001',
      targetName: 'John Doe',
      status: 'PRESENT',
      remarks: 'On time'
    }
  ];

  static assessments: AssessmentRecord[] = [
    {
      id: 'ASS-001',
      studentId: 'STU-001',
      subjectId: 'MTH101',
      term: '2026 Term 1',
      academicYear: '2026',
      cat1Score: 18, // out of 20
      cat2Score: 17, // out of 20
      examScore: 52, // out of 60
      totalScore: 87,
      grade: 'A',
      remarks: 'Distinction 1',
      recordedByStaffId: 'TCH-001',
      verified: true
    },
    {
      id: 'ASS-002',
      studentId: 'STU-001',
      subjectId: 'PHY101',
      term: '2026 Term 1',
      academicYear: '2026',
      cat1Score: 15,
      cat2Score: 16,
      examScore: 48,
      totalScore: 79,
      grade: 'A',
      remarks: 'Distinction 2',
      recordedByStaffId: 'TCH-002',
      verified: true
    }
  ];

  static timetable: TimetableEntry[] = [
    {
      id: 'TT-001',
      classLevel: 'S.1',
      stream: 'East',
      dayOfWeek: 'Monday',
      period: '08:00 - 08:45',
      subjectCode: 'MTH101',
      subjectName: 'Mathematics',
      teacherName: 'Mr. Smith',
      room: 'Room 12'
    },
    {
      id: 'TT-002',
      classLevel: 'S.1',
      stream: 'East',
      dayOfWeek: 'Monday',
      period: '08:45 - 09:30',
      subjectCode: 'PHY101',
      subjectName: 'Physics',
      teacherName: 'Dr. Allen',
      room: 'Physics Lab 1'
    },
    {
      id: 'TT-003',
      classLevel: 'S.4',
      stream: 'North',
      dayOfWeek: 'Monday',
      period: '10:00 - 10:45',
      subjectCode: 'ENG101',
      subjectName: 'English Literature',
      teacherName: 'Mrs. Vance',
      room: 'Room 20'
    }
  ];

  static hostelBeds: HostelBed[] = [
    { id: 'BED-001', dormName: 'Mandela Hall', roomNo: 'R101', bedNo: 'Bed A', capacity: 4, allocatedStudentId: 'STU-001' },
    { id: 'BED-002', dormName: 'Mandela Hall', roomNo: 'R101', bedNo: 'Bed B', capacity: 4 },
    { id: 'BED-003', dormName: 'Nyerere Hall', roomNo: 'R204', bedNo: 'Bed A', capacity: 4 }
  ];

  static libraryLoans: LibraryLoanItem[] = [
    { id: 'LIB-001', bookTitle: 'Advanced Level Physics by Nelkon', isbn: '978-0123456789', studentId: 'STU-001', issueDate: '2026-01-20', dueDate: '2026-02-10', returned: false, fineUGX: 0 }
  ];

  static transportRoutes: TransportRoute[] = [
    { id: 'TRP-001', routeName: 'Ntinda - Ntinda - Campus Express', driverName: 'Ouma Moses', vehicleNo: 'UBC 482A', capacity: 30, assignedStudentIds: ['STU-002'] }
  ];

  static auditLogs: AuditLogEntry[] = [
    { id: 'LOG-001', action: 'STUDENT_ENROLLED', actorRole: 'HEADTEACHER', timestamp: '2026-01-10 09:00', details: 'Enrolled John Doe with LIN-2026-001' },
    { id: 'LOG-002', action: 'INVOICE_ISSUED', actorRole: 'BURSAR', timestamp: '2026-01-10 09:15', details: 'Issued Fee Invoice FEE-2026-T1-001 for $500' }
  ];

  static currentUserRole: 'HEADTEACHER' | 'BURSAR' | 'TEACHER' | 'PARENT' | 'STUDENT' | 'ADMIN' = 'HEADTEACHER';

  // Domain Actions & Business Logic
  static submitInquiry(applicantName: string, targetClass: string, guardianPhone: string, formerSchool: string) {
    const newApp: StudentApplicant = {
      id: `APP-${Date.now()}`,
      applicantName,
      targetClass,
      guardianPhone,
      guardianName: 'Guardian of ' + applicantName,
      formerSchool,
      status: 'PENDING_INQUIRY',
      submissionDate: new Date().toISOString().split('T')[0]
    };
    this.applicants.push(newApp);
    this.logAudit('SUBMIT_INQUIRY', 'PUBLIC_GUEST', `Inquiry received for ${applicantName}`);
    this.notify();
    return newApp;
  }

  static scoreApplicant(id: string, interviewScore: number, examScore: number) {
    const app = this.applicants.find(a => a.id === id);
    if (!app) return;
    app.interviewScore = interviewScore;
    app.entranceExamScore = examScore;
    app.status = (interviewScore + examScore) / 2 >= 70 ? 'OFFERED' : 'SCORED';
    this.logAudit('SCORE_APPLICANT', this.currentUserRole, `Scored ${app.applicantName}: Exam ${examScore}%, Interview ${interviewScore}%`);
    this.notify();
  }

  static enrollApplicant(id: string, classLevel: string, stream: string) {
    const app = this.applicants.find(a => a.id === id);
    if (!app) return;
    
    app.status = 'ENROLLED';
    const newLin = `LIN-2026-${Math.floor(100 + Math.random() * 900)}`;
    const newStudent: AlphaStudent = {
      id: `STU-${Date.now()}`,
      admissionNo: newLin,
      fullName: app.applicantName,
      gender: 'MALE',
      dateOfBirth: '2010-01-01',
      classLevel,
      stream,
      guardianName: app.guardianName,
      guardianPhone: app.guardianPhone,
      guardianEmail: `${app.applicantName.toLowerCase().replace(/\s+/g, '.')}@guardian.ac.ug`,
      boardingStatus: 'DAY',
      admissionDate: new Date().toISOString().split('T')[0],
      status: 'ACTIVE',
      feeBalance: 500,
      attendanceRate: 100,
      cohortId: 'COHORT-2026'
    };
    this.students.push(newStudent);
    
    // Auto-issue tuition invoice
    this.fees.push({
      id: `INV-${Date.now()}`,
      invoiceNumber: `FEE-2026-T1-${Math.floor(100 + Math.random() * 900)}`,
      studentId: newStudent.id,
      studentName: newStudent.fullName,
      classLevel: newStudent.classLevel,
      term: this.activeTerm,
      academicYear: '2026',
      items: [{ description: 'Tuition & Enrollment Fee', amount: 500 }],
      totalBilled: 500,
      totalPaid: 0,
      balance: 500,
      status: 'UNPAID',
      dateIssued: new Date().toISOString().split('T')[0],
      dueDate: '2026-03-01'
    });

    this.logAudit('ENROLL_STUDENT', this.currentUserRole, `Enrolled ${app.applicantName} with ${newLin}`);
    this.notify();
    return newStudent;
  }

  static recordAttendance(studentId: string, status: 'PRESENT' | 'ABSENT' | 'LATE', remarks?: string) {
    const student = this.students.find(s => s.id === studentId);
    if (!student) return;
    this.attendance.push({
      id: `ATT-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      targetType: 'STUDENT',
      targetId: studentId,
      targetName: student.fullName,
      status,
      remarks: remarks || (status === 'ABSENT' ? 'Unexcused Absence - SMS Dispatched to ' + student.guardianPhone : 'Recorded')
    });
    this.logAudit('RECORD_ATTENDANCE', this.currentUserRole, `Marked ${student.fullName} as ${status}`);
    this.notify();
  }

  static enterMarks(studentId: string, subjectCode: string, cat1: number, cat2: number, exam: number) {
    const student = this.students.find(s => s.id === studentId);
    if (!student) return;

    const total = cat1 + cat2 + exam;
    let grade = 'F';
    let remarks = 'Fail';
    if (total >= 80) { grade = 'A'; remarks = 'Distinction 1'; }
    else if (total >= 70) { grade = 'B'; remarks = 'Distinction 2'; }
    else if (total >= 60) { grade = 'C'; remarks = 'Credit 3'; }
    else if (total >= 50) { grade = 'D'; remarks = 'Pass 7'; }

    const existingIndex = this.assessments.findIndex(a => a.studentId === studentId && a.subjectId === subjectCode);
    const newRecord: AssessmentRecord = {
      id: `ASS-${Date.now()}`,
      studentId,
      subjectId: subjectCode,
      term: this.activeTerm,
      academicYear: '2026',
      cat1Score: cat1,
      cat2Score: cat2,
      examScore: exam,
      totalScore: total,
      grade,
      remarks,
      recordedByStaffId: 'TEACHER',
      verified: true
    };

    if (existingIndex >= 0) {
      this.assessments[existingIndex] = newRecord;
    } else {
      this.assessments.push(newRecord);
    }

    this.logAudit('ENTER_MARKS', this.currentUserRole, `Entered marks for ${student.fullName} (${subjectCode}): ${total}%`);
    this.notify();
  }

  static receiveFeePayment(invoiceId: string, amountPaid: number) {
    const inv = this.fees.find(f => f.id === invoiceId);
    if (!inv) return;

    inv.totalPaid += amountPaid;
    inv.balance = Math.max(0, inv.totalBilled - inv.totalPaid);
    inv.status = inv.balance === 0 ? 'PAID' : 'PARTIAL';

    const student = this.students.find(s => s.id === inv.studentId);
    if (student) {
      student.feeBalance = inv.balance;
    }

    this.logAudit('RECEIVE_PAYMENT', this.currentUserRole, `Received $${amountPaid} for Invoice ${inv.invoiceNumber}`);
    this.notify();
  }

  static sendParentNote(studentId: string, subject: string, message: string, sender: 'PARENT' | 'TEACHER') {
    const student = this.students.find(s => s.id === studentId);
    const newNote: ParentNote = {
      id: `NOTE-${Date.now()}`,
      studentId,
      guardianName: student?.guardianName || 'Guardian',
      teacherName: 'Class Teacher',
      subject,
      message,
      timestamp: new Date().toLocaleString(),
      sender
    };
    this.parentNotes.push(newNote);
    this.notify();
  }

  static promoteStudents(fromClass: string, toClass: string) {
    let count = 0;
    this.students.forEach(s => {
      if (s.classLevel === fromClass && s.status === 'ACTIVE') {
        s.classLevel = toClass;
        count++;
      }
    });
    this.logAudit('CLASS_PROMOTION', this.currentUserRole, `Promoted ${count} students from ${fromClass} to ${toClass}`);
    this.notify();
  }

  static generateReportCard(studentId: string) {
    const student = this.students.find(s => s.id === studentId);
    const marks = this.assessments.filter(a => a.studentId === studentId);
    const totalAggregate = marks.reduce((sum, a) => sum + a.totalScore, 0);
    const avg = marks.length > 0 ? totalAggregate / marks.length : 0;
    
    let division = 'Division 4';
    if (avg >= 75) division = 'Division 1';
    else if (avg >= 65) division = 'Division 2';
    else if (avg >= 50) division = 'Division 3';

    return {
      student,
      term: this.activeTerm,
      marks,
      totalAggregate,
      avg: Math.round(avg),
      division,
      headteacherRemarks: avg >= 75 ? 'An outstanding academic performance. Keep it up!' : 'Satisfactory progress. Needs more effort in sciences.'
    };
  }

  static logAudit(action: string, actorRole: string, details: string) {
    this.auditLogs.unshift({
      id: `LOG-${Date.now()}`,
      action,
      actorRole,
      timestamp: new Date().toLocaleString(),
      details
    });
  }
}
