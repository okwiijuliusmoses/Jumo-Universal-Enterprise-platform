import { FaapService } from '../../faap/domain/FaapService';
import { WorkflowState, WorkflowTransitionLog } from '../../../components/common/workflow/WorkflowEngine';

export interface PrimaryTimetableLesson {
  id: string;
  day: 'MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY';
  periodNumber: number; // 1 to 8 (40 periods/week)
  timeSlot: string;
  classStream: string; // e.g. "P.7 Blue", "P.7 Green", "P.6 Red"
  subject: string;
  teacherName: string;
  roomName: string;
  isSubstitution?: boolean;
  substituteTeacherName?: string;
}

export interface TimetableCollisionError {
  type: 'TEACHER_DOUBLE_BOOKING' | 'ROOM_DOUBLE_BOOKING' | 'CLASS_DOUBLE_BOOKING';
  message: string;
  day: string;
  periodNumber: number;
  conflictingLessons: PrimaryTimetableLesson[];
}

export interface PupilMarksheetEntry {
  id: string;
  pupilId: string;
  pupilName: string;
  classStream: string;
  englishScore: number;
  mathematicsScore: number;
  scienceScore: number;
  socialStudiesScore: number;
  totalAggregate: number; // 4 (Best) to 36 (Worst)
  division: 'DIVISION_1' | 'DIVISION_2' | 'DIVISION_3' | 'DIVISION_4' | 'UNGRADED';
  term: string;
  academicYear: string;
}

export interface ExecutiveDirective {
  id: string;
  title: string;
  category: 'GOVERNANCE' | 'ACADEMIC' | 'FINANCE' | 'EMERGENCY';
  content: string;
  issuer: string;
  status: WorkflowState;
  dateIssued: string;
  history: WorkflowTransitionLog[];
}

export interface BursarTuitionPayment {
  id: string;
  pupilId: string;
  pupilName: string;
  classStream: string;
  schoolPayCode: string;
  amountPaid: number;
  balanceRemaining: number;
  paymentChannel: 'SCHOOLPAY_MOMO' | 'BANK_EFT' | 'CASH';
  paymentDate: string;
  receiptNumber: string;
  journalEntryId?: string;
}

export class NurseryPrimaryService {
  private static instance: NurseryPrimaryService;
  private faapService = FaapService.getInstance();

  private timetableLessons: PrimaryTimetableLesson[] = [
    { id: 'L-01', day: 'MONDAY', periodNumber: 1, timeSlot: '08:00 - 08:45', classStream: 'P.7 Blue', subject: 'Mathematics', teacherName: 'Mr. Kato Francis', roomName: 'P.7 Blue Room' },
    { id: 'L-02', day: 'MONDAY', periodNumber: 2, timeSlot: '08:45 - 09:30', classStream: 'P.7 Blue', subject: 'Integrated Science', teacherName: 'Ms. Akello Sarah', roomName: 'P.7 Blue Room' },
    { id: 'L-03', day: 'MONDAY', periodNumber: 1, timeSlot: '08:00 - 08:45', classStream: 'P.6 Red', subject: 'English Language', teacherName: 'Mrs. Namubiru Grace', roomName: 'P.6 Red Room' }
  ];

  private marksheets: PupilMarksheetEntry[] = [
    { id: 'MK-001', pupilId: 'PUP-2026-001', pupilName: 'Kagabo Joel', classStream: 'P.7 Blue', englishScore: 88, mathematicsScore: 92, scienceScore: 90, socialStudiesScore: 85, totalAggregate: 4, division: 'DIVISION_1', term: 'Term II 2026', academicYear: '2026' },
    { id: 'MK-002', pupilId: 'PUP-2026-002', pupilName: 'Mbabazi Clara', classStream: 'P.7 Blue', englishScore: 82, mathematicsScore: 78, scienceScore: 80, socialStudiesScore: 75, totalAggregate: 7, division: 'DIVISION_1', term: 'Term II 2026', academicYear: '2026' }
  ];

  private executiveDirectives: ExecutiveDirective[] = [
    { id: 'DIR-2026-01', title: 'Mandatory Sovereign Academy PLE Mock Examination Timetable Clearance', category: 'ACADEMIC', content: 'All P.7 Teachers must finalize scheme of work syllabus coverage by Friday end of day.', issuer: 'Head Teacher - Dr. Mugisha Arthur', status: 'APPROVED', dateIssued: '2026-08-01', history: [] }
  ];

  private tuitionPayments: BursarTuitionPayment[] = [
    { id: 'PMT-8012', pupilId: 'PUP-2026-001', pupilName: 'Kagabo Joel', classStream: 'P.7 Blue', schoolPayCode: 'SCHPAY-90412', amountPaid: 1200000, balanceRemaining: 0, paymentChannel: 'SCHOOLPAY_MOMO', paymentDate: '2026-08-10', receiptNumber: 'REC-SA-2026-901' }
  ];

  private constructor() {}

  public static getInstance(): NurseryPrimaryService {
    if (!NurseryPrimaryService.instance) {
      NurseryPrimaryService.instance = new NurseryPrimaryService();
    }
    return NurseryPrimaryService.instance;
  }

  // --- TIMETABLING & COLLISION ENGINE ---
  getTimetableLessons() { return this.timetableLessons; }

  detectTimetableCollisions(): TimetableCollisionError[] {
    const collisions: TimetableCollisionError[] = [];
    const map = new Map<string, PrimaryTimetableLesson[]>();

    for (const lesson of this.timetableLessons) {
      const key = `${lesson.day}-${lesson.periodNumber}-${lesson.teacherName}`;
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(lesson);
    }

    for (const [key, lessons] of map.entries()) {
      if (lessons.length > 1) {
        collisions.push({
          type: 'TEACHER_DOUBLE_BOOKING',
          message: `Teacher ${lessons[0].teacherName} is double-booked across ${lessons.map(l => l.classStream).join(' and ')} on ${lessons[0].day} Period ${lessons[0].periodNumber}`,
          day: lessons[0].day,
          periodNumber: lessons[0].periodNumber,
          conflictingLessons: lessons
        });
      }
    }

    return collisions;
  }

  addTimetableLesson(lessonData: Omit<PrimaryTimetableLesson, 'id'>) {
    const newLesson: PrimaryTimetableLesson = {
      ...lessonData,
      id: `L-${Math.random().toString(36).substr(2, 6).toUpperCase()}`
    };
    this.timetableLessons.push(newLesson);
    return newLesson;
  }

  assignTeacherSubstitution(lessonId: string, substituteTeacherName: string) {
    const lesson = this.timetableLessons.find(l => l.id === lessonId);
    if (lesson) {
      lesson.isSubstitution = true;
      lesson.substituteTeacherName = substituteTeacherName;
    }
    return lesson;
  }

  // --- PLE EXAMINATION & MARKSHEET ENGINE ---
  getMarksheets() { return this.marksheets; }

  calculatePleAggregate(english: number, math: number, science: number, sst: number) {
    const scoreToGrade = (s: number) => {
      if (s >= 80) return 1;
      if (s >= 70) return 2;
      if (s >= 60) return 3;
      if (s >= 50) return 4;
      if (s >= 45) return 5;
      if (s >= 40) return 6;
      if (s >= 35) return 7;
      if (s >= 30) return 8;
      return 9;
    };

    const gEng = scoreToGrade(english);
    const gMath = scoreToGrade(math);
    const gSci = scoreToGrade(science);
    const gSst = scoreToGrade(sst);
    const totalAggregate = gEng + gMath + gSci + gSst;

    let division: 'DIVISION_1' | 'DIVISION_2' | 'DIVISION_3' | 'DIVISION_4' | 'UNGRADED' = 'UNGRADED';
    if (totalAggregate <= 12) division = 'DIVISION_1';
    else if (totalAggregate <= 24) division = 'DIVISION_2';
    else if (totalAggregate <= 28) division = 'DIVISION_3';
    else if (totalAggregate <= 34) division = 'DIVISION_4';

    return { totalAggregate, division };
  }

  recordPupilMarksheet(data: { pupilId: string; pupilName: string; classStream: string; englishScore: number; mathematicsScore: number; scienceScore: number; socialStudiesScore: number }) {
    const { totalAggregate, division } = this.calculatePleAggregate(data.englishScore, data.mathematicsScore, data.scienceScore, data.socialStudiesScore);
    const entry: PupilMarksheetEntry = {
      id: `MK-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
      pupilId: data.pupilId,
      pupilName: data.pupilName,
      classStream: data.classStream,
      englishScore: data.englishScore,
      mathematicsScore: data.mathematicsScore,
      scienceScore: data.scienceScore,
      socialStudiesScore: data.socialStudiesScore,
      totalAggregate,
      division,
      term: 'Term II 2026',
      academicYear: '2026'
    };
    this.marksheets.unshift(entry);
    return entry;
  }

  // --- EXECUTIVE DIRECTIVES ---
  getExecutiveDirectives() { return this.executiveDirectives; }

  issueExecutiveDirective(title: string, category: 'GOVERNANCE' | 'ACADEMIC' | 'FINANCE' | 'EMERGENCY', content: string, issuer: string) {
    const directive: ExecutiveDirective = {
      id: `DIR-2026-${(this.executiveDirectives.length + 1).toString().padStart(2, '0')}`,
      title,
      category,
      content,
      issuer,
      status: 'APPROVED',
      dateIssued: new Date().toISOString().split('T')[0],
      history: []
    };
    this.executiveDirectives.unshift(directive);
    return directive;
  }

  // --- BURSAR TUITION FEES & FAAP INTEGRATION ---
  getTuitionPayments() { return this.tuitionPayments; }

  collectTuitionPayment(pupilId: string, pupilName: string, classStream: string, amountPaid: number, channel: 'SCHOOLPAY_MOMO' | 'BANK_EFT' | 'CASH') {
    const schoolPayCode = `SCHPAY-${Math.floor(10000 + Math.random() * 90000)}`;
    const receiptNumber = `REC-HN-2026-${Math.floor(100 + Math.random() * 900)}`;

    const journal = this.faapService.postUniversalTransaction({
      sourceProduct: 'NURSERY_PRIMARY_ERP',
      memo: `Tuition Fee Receipt: ${pupilName} (${classStream}) - ${schoolPayCode}`,
      debitAccount: '1010', // Bank/Cash
      creditAccount: '4010', // Tuition Revenue
      amount: amountPaid
    });

    const payment: BursarTuitionPayment = {
      id: `PMT-${Math.floor(1000 + Math.random() * 9000)}`,
      pupilId,
      pupilName,
      classStream,
      schoolPayCode,
      amountPaid,
      balanceRemaining: 0,
      paymentChannel: channel,
      paymentDate: new Date().toISOString().split('T')[0],
      receiptNumber,
      journalEntryId: journal.id
    };

    this.tuitionPayments.unshift(payment);
    return payment;
  }
}
