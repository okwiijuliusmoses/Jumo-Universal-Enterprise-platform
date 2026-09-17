import fs from "fs";
import path from "path";

export interface SchoolRecord {
  id: string;
  name: string;
  code: string;
  district: string;
  studentCount: number;
  totalCollections: number;
  activeTerm: string;
  created_at: string;
}

export interface StudentFeeRecord {
  id: string;
  name: string;
  school_id: string;
  school_name: string;
  pay_code: string;
  class_grade: string;
  term_fee: number;
  paid_amount: number;
  balance: number;
  status: "CLEARED" | "PARTIAL" | "UNPAID";
  created_at: string;
}

export interface SchoolPayTransaction {
  id: string;
  student_id: string;
  school_id: string;
  pay_code: string;
  amount: number;
  currency: string;
  channel: string;
  payer_reference: string;
  status: "COMPLETED" | "PENDING" | "FAILED";
  timestamp: string;
}

export interface SchoolPayDataStore {
  metadata: {
    app: "SchoolPay";
    version: "v2.4.0";
    authority: "National Institutional Payment Switch";
    last_updated: string;
  };
  schools: SchoolRecord[];
  students: StudentFeeRecord[];
  transactions: SchoolPayTransaction[];
}

const STORAGE_PATH = path.join(process.cwd(), ".jumo", "schoolpay_data.json");

function getDefaultData(): SchoolPayDataStore {
  return {
    metadata: {
      app: "SchoolPay",
      version: "v2.4.0",
      authority: "National Institutional Payment Switch",
      last_updated: new Date().toISOString(),
    },
    schools: [
      { id: "SCH-001", name: "Namiryango Secondary College", code: "SCH-NAM-101", district: "Mukono", studentCount: 1420, totalCollections: 2840000000, activeTerm: "Term 1 - 2026", created_at: "2026-01-10T08:00:00Z" },
      { id: "SCH-002", name: "Hillside Primary School Nalya", code: "SCH-HIL-202", district: "Wakiso", studentCount: 1850, totalCollections: 3120000000, activeTerm: "Term 1 - 2026", created_at: "2026-01-12T09:15:00Z" },
      { id: "SCH-003", name: "St. Mary's Boarding Academy", code: "SCH-STM-303", district: "Kampala", studentCount: 960, totalCollections: 1440000000, activeTerm: "Term 1 - 2026", created_at: "2026-01-15T14:30:00Z" },
    ],
    students: [
      { id: "STU-8801", name: "Kato Emmanuel Mukasa", school_id: "SCH-001", school_name: "Namiryango Secondary College", pay_code: "PAY-NAM-8801", class_grade: "Senior 4 East", term_fee: 2000000, paid_amount: 2000000, balance: 0, status: "CLEARED", created_at: "2026-02-01T10:00:00Z" },
      { id: "STU-8802", name: "Nalubega Sarah Grace", school_id: "SCH-001", school_name: "Namiryango Secondary College", pay_code: "PAY-NAM-8802", class_grade: "Senior 5 Science", term_fee: 2400000, paid_amount: 1400000, balance: 1000000, status: "PARTIAL", created_at: "2026-02-05T11:20:00Z" },
      { id: "STU-8803", name: "Ochen David Okot", school_id: "SCH-002", school_name: "Hillside Primary School Nalya", pay_code: "PAY-HIL-8803", class_grade: "Primary 7 Blue", term_fee: 1680000, paid_amount: 0, balance: 1680000, status: "UNPAID", created_at: "2026-02-10T14:30:00Z" },
      { id: "STU-8804", name: "Auma Brenda Faith", school_id: "SCH-002", school_name: "Hillside Primary School Nalya", pay_code: "PAY-HIL-8804", class_grade: "Primary 6 Green", term_fee: 1680000, paid_amount: 1680000, balance: 0, status: "CLEARED", created_at: "2026-02-12T09:00:00Z" },
    ],
    transactions: []
  };
}

export class SchoolPayStoreService {
  private static instance: SchoolPayStoreService;
  private data: SchoolPayDataStore;

  private constructor() {
    this.data = this.loadFromDisk();
  }

  public static getInstance(): SchoolPayStoreService {
    if (!SchoolPayStoreService.instance) {
      SchoolPayStoreService.instance = new SchoolPayStoreService();
    }
    return SchoolPayStoreService.instance;
  }

  private loadFromDisk(): SchoolPayDataStore {
    try {
      const dir = path.dirname(STORAGE_PATH);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }

      if (fs.existsSync(STORAGE_PATH)) {
        const raw = fs.readFileSync(STORAGE_PATH, "utf-8");
        return JSON.parse(raw);
      }
    } catch (err) {
      console.error("[SchoolPayStore] Failed to read from disk:", err);
    }

    const defaultData = getDefaultData();
    this.saveToDisk(defaultData);
    return defaultData;
  }

  private saveToDisk(dataToSave?: SchoolPayDataStore): void {
    try {
      const dir = path.dirname(STORAGE_PATH);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      const data = dataToSave || this.data;
      data.metadata.last_updated = new Date().toISOString();
      fs.writeFileSync(STORAGE_PATH, JSON.stringify(data, null, 2), "utf-8");
    } catch (err) {
      console.error("[SchoolPayStore] Error writing to disk:", err);
    }
  }

  public getSchools(): SchoolRecord[] {
    return this.data.schools;
  }

  public getStudents(schoolId?: string): StudentFeeRecord[] {
    if (schoolId && schoolId !== "ALL") {
      return this.data.students.filter(s => s.school_id === schoolId);
    }
    return this.data.students;
  }

  public getTransactions(): SchoolPayTransaction[] {
    return this.data.transactions;
  }

  public addSchool(school: Omit<SchoolRecord, "id" | "totalCollections" | "created_at">): SchoolRecord {
    const id = `SCH-${String(this.data.schools.length + 1).padStart(3, "0")}`;
    const newSchool: SchoolRecord = {
      ...school,
      id,
      totalCollections: 0,
      created_at: new Date().toISOString()
    };
    this.data.schools.push(newSchool);
    this.saveToDisk();
    return newSchool;
  }

  public addStudent(student: Omit<StudentFeeRecord, "id" | "paid_amount" | "balance" | "status" | "created_at">): StudentFeeRecord {
    const id = `STU-${String(this.data.students.length + 8805).padStart(4, "0")}`;
    const newStudent: StudentFeeRecord = {
      ...student,
      id,
      paid_amount: 0,
      balance: Number(student.term_fee),
      status: "UNPAID",
      created_at: new Date().toISOString()
    };
    this.data.students.push(newStudent);
    this.saveToDisk();
    return newStudent;
  }

  public processFeePayment(params: {
    studentId: string;
    amount: number;
    channel: string;
    payerReference: string;
  }): { transaction: SchoolPayTransaction; student: StudentFeeRecord } {
    const student = this.data.students.find(s => s.id === params.studentId);
    if (!student) {
      throw new Error(`Student with ID ${params.studentId} not found.`);
    }

    const txId = `SP-TX-${Date.now()}`;
    const transaction: SchoolPayTransaction = {
      id: txId,
      student_id: student.id,
      school_id: student.school_id,
      pay_code: student.pay_code,
      amount: params.amount,
      currency: "UGX",
      channel: params.channel,
      payer_reference: params.payerReference,
      status: "COMPLETED",
      timestamp: new Date().toISOString()
    };

    // Update student balance
    student.paid_amount += params.amount;
    student.balance = Math.max(0, student.term_fee - student.paid_amount);
    student.status = student.balance === 0 ? "CLEARED" : "PARTIAL";

    // Update school total collections
    const school = this.data.schools.find(s => s.id === student.school_id);
    if (school) {
      school.totalCollections += params.amount;
    }

    this.data.transactions.unshift(transaction);
    this.saveToDisk();

    return { transaction, student };
  }
}
