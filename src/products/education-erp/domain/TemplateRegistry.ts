/**
 * JUMO UNIVERSAL SCHOOL ERP - TEMPLATE REGISTRY SERVICE
 * Authoritative capability manifest and institutional template activation service.
 * Supports Nursery/Pre-Primary, Primary School, Secondary School, Tertiary/Higher Ed, and Vocational (TVET).
 */

import { 
  Building2, Users, BookOpen, DollarSign, Award, Calendar, 
  FileText, Clock, Stethoscope, Library, Home, Briefcase, 
  ShieldCheck, HardDrive, UserCheck, CheckCircle2, LayoutGrid,
  Sparkles, Wrench, Heart, Baby, Utensils, Smile, Bus, Layers,
  Compass, Flame, ShieldAlert, BadgeCheck, FileSpreadsheet,
  GraduationCap
} from 'lucide-react';

export type EducationTemplateId = 'PRE_PRIMARY' | 'PRIMARY' | 'SECONDARY' | 'TERTIARY' | 'VOCATIONAL';

export interface EducationPortalRole {
  id: string;
  code: string;
  name: string;
  office: string;
  description: string;
  allowedPortals: string[];
  defaultPortal: string;
}

export interface EducationCapabilityManifest {
  capabilityId: string;
  name: string;
  category: 'ADMIN' | 'ACADEMIC' | 'FINANCE' | 'STUDENT_SERVICES' | 'EXAMINATIONS' | 'FACILITY';
  requiredLevel: EducationTemplateId[];
  description: string;
  status: 'ACTIVE' | 'PROVISIONED' | 'OPTIONAL';
}

export interface EducationOfficePortal {
  id: string;
  code: string;
  name: string;
  officerTitle: string;
  icon: string;
  route: string;
  description: string;
  workspaces: {
    id: string;
    name: string;
    description: string;
    type: 'REGISTER' | 'LEDGER' | 'QUEUE' | 'FORM' | 'ANALYTICS';
  }[];
}

export interface InstitutionalLicense {
  institutionId: string;
  institutionName: string;
  activeTier: EducationTemplateId;
  curriculumCode: 'UG_NCDC' | 'CAMBRIDGE' | 'IB' | 'TVET_DIT' | 'UNEB_STANDARD';
  licenseStatus: 'ACTIVE' | 'TRIAL' | 'ENTERPRISE';
  studentCapacity: number;
  academicYear: number;
  currentTerm: number;
  enabledCapabilities: string[];
}

export interface EducationNavGroup {
  group: string;
  items: {
    id: string;
    label: string;
    icon: any;
    badge?: string;
    description: string;
  }[];
}

export interface EducationTemplateConfig {
  id: EducationTemplateId;
  code: string;
  displayName: string;
  categoryName: string;
  tagline: string;
  description: string;
  themeColor: string;
  badgeBg: string;
  defaultRole: string;
  metrics: {
    label: string;
    value: string;
    change?: string;
    sublabel: string;
  }[];
  navGroups: EducationNavGroup[];
  features: string[];
  officePortals: EducationOfficePortal[];
}

export const EDUCATION_CAPABILITY_MANIFESTS: EducationCapabilityManifest[] = [
  { capabilityId: 'CAP_ECD_BIO', name: 'Child Bio & Guardian Safety Gate', category: 'STUDENT_SERVICES', requiredLevel: ['PRE_PRIMARY'], description: 'Guardian verification, facial gate pass and allergy flags', status: 'ACTIVE' },
  { capabilityId: 'CAP_PRI_CURR', name: 'Primary Thematic & NCDC Assessment', category: 'ACADEMIC', requiredLevel: ['PRIMARY'], description: 'Continuous assessment BOT/MOT/EOT and report generation', status: 'ACTIVE' },
  { capabilityId: 'CAP_SEC_UNEB', name: 'O/A Level Combinations & UNEB Centre Mgmt', category: 'EXAMINATIONS', requiredLevel: ['SECONDARY'], description: 'Index candidate registration, e-marking and mock examinations', status: 'ACTIVE' },
  { capabilityId: 'CAP_BURSAR_FAAP', name: 'Bursar Double-Entry Cash Book & PRN Ledger', category: 'FINANCE', requiredLevel: ['PRE_PRIMARY', 'PRIMARY', 'SECONDARY', 'TERTIARY', 'VOCATIONAL'], description: 'Alpha cash book, school fees reconciliation, and URA PRN gateway', status: 'ACTIVE' },
  { capabilityId: 'CAP_REGISTRAR_SIS', name: 'Registrar Student Information System (SIS)', category: 'ADMIN', requiredLevel: ['PRE_PRIMARY', 'PRIMARY', 'SECONDARY', 'TERTIARY', 'VOCATIONAL'], description: 'Learner Identification Number (LIN), transfers and canonical enrollment', status: 'ACTIVE' },
  { capabilityId: 'CAP_TVET_CBET', name: 'Competency-Based Modular Trade Testing', category: 'ACADEMIC', requiredLevel: ['VOCATIONAL'], description: 'DIT logbooks, workshop safety protocols, and apprentice tracking', status: 'ACTIVE' },
  { capabilityId: 'CAP_TERTIARY_SENATE', name: 'Senate Academic Registry & Credit Units', category: 'ACADEMIC', requiredLevel: ['TERTIARY'], description: 'Course unit registration, semester transcripts, and senate graduation roll', status: 'ACTIVE' }
];

export const EDUCATION_OFFICE_PORTALS: Record<string, EducationOfficePortal> = {
  BURSAR: {
    id: 'PORTAL_BURSAR',
    code: 'OFFICE-BURSAR',
    name: 'Bursar Office & Treasury',
    officerTitle: 'Chief School Bursar / Accountant',
    icon: 'DollarSign',
    route: '/school/portal/bursar',
    description: 'Financial ledger, fees collection, cash book, payment vouchers, and bank reconciliation.',
    workspaces: [
      { id: 'FEES_LEDGER', name: 'Student Fees Ledger', description: 'Student fee accounts, balances, and term billing', type: 'LEDGER' },
      { id: 'CASH_BOOK', name: 'Alpha Cash Book', description: 'Real-time double-entry receipts and cash payments', type: 'REGISTER' },
      { id: 'PAYMENT_VOUCHERS', name: 'Payment Vouchers Queue', description: 'Procurement approvals and expense disbursements', type: 'QUEUE' },
      { id: 'BANK_RECON', name: 'Bank & PRN Reconciliation', description: 'Direct bank statement feeds and automated receipting', type: 'REGISTER' }
    ]
  },
  REGISTRAR: {
    id: 'PORTAL_REGISTRAR',
    code: 'OFFICE-REGISTRAR',
    name: 'Registrar Office & Admissions',
    officerTitle: 'School Registrar / Admissions Officer',
    icon: 'Users',
    route: '/school/portal/registrar',
    description: 'Student admissions, Learner Identification Numbers (LIN), class streams, and transfers.',
    workspaces: [
      { id: 'ADMISSIONS_REGISTER', name: 'Admissions Register', description: 'New applicant intake, document verification, and LIN issuance', type: 'REGISTER' },
      { id: 'STUDENT_CENSUS', name: 'Student Master Census', description: 'Active student registry by class, stream, gender, and status', type: 'REGISTER' },
      { id: 'CLASS_STREAMS', name: 'Class & Stream Allocations', description: 'Stream capacities, class teachers, and classroom assignments', type: 'REGISTER' },
      { id: 'PROMOTION_ENGINE', name: 'End of Year Promotions', description: 'Automated term progression and class advancing', type: 'QUEUE' }
    ]
  },
  ACADEMIC_DOS: {
    id: 'PORTAL_ACADEMIC_DOS',
    code: 'OFFICE-DOS',
    name: 'Academic Office & Director of Studies',
    officerTitle: 'Director of Studies (DOS)',
    icon: 'BookOpen',
    route: '/school/portal/academic',
    description: 'Curriculum delivery, examination administration, UNEB grading, report cards, and timetables.',
    workspaces: [
      { id: 'EXAM_REGISTER', name: 'Examination & Assessment Register', description: 'BOT, MOT, EOT mark entries and grade cutoffs', type: 'REGISTER' },
      { id: 'REPORT_CARDS', name: 'Report Card Generation Queue', description: 'Bulk term report card compilation and remarks approval', type: 'QUEUE' },
      { id: 'TIMETABLE_GRID', name: 'Master Academic Timetable', description: 'Subject periods, room allocation, and teacher clash detection', type: 'REGISTER' },
      { id: 'UNEB_CENTRE', name: 'UNEB Candidate Centre Manager', description: 'Candidate index numbers, mock papers, and national registration', type: 'REGISTER' }
    ]
  },
  HEAD_TEACHER: {
    id: 'PORTAL_HEAD_TEACHER',
    code: 'OFFICE-HT',
    name: 'Head Teacher Executive Office',
    officerTitle: 'Head Teacher / Principal',
    icon: 'Building2',
    route: '/school/portal/headteacher',
    description: 'Institutional governance, staff performance, school council approvals, and compliance.',
    workspaces: [
      { id: 'EXECUTIVE_SUMMARY', name: 'School Executive Dashboard', description: 'Enrollment trends, fee recovery percentage, and academic targets', type: 'ANALYTICS' },
      { id: 'STAFF_ROSTER', name: 'Teaching & Support Staff Roster', description: 'Staff appointments, teaching loads, and performance evaluations', type: 'REGISTER' },
      { id: 'COUNCIL_MINUTES', name: 'Board of Governors / PTA Minutes', description: 'Statutory resolutions, budget authorizations, and policies', type: 'REGISTER' }
    ]
  },
  TEACHER: {
    id: 'PORTAL_TEACHER',
    code: 'OFFICE-TEACHER',
    name: 'Teacher & Gradebook Portal',
    officerTitle: 'Class / Subject Teacher',
    icon: 'UserCheck',
    route: '/school/portal/teacher',
    description: 'Daily roll call, continuous assessment score entry, lesson plans, and student remarks.',
    workspaces: [
      { id: 'DAILY_ROLL_CALL', name: 'Daily Attendance Roll Call', description: 'Period-by-period class attendance register', type: 'REGISTER' },
      { id: 'GRADEBOOK_ENTRY', name: 'Continuous Assessment Gradebook', description: 'Activity of Integration (AOI) and test marks input', type: 'REGISTER' },
      { id: 'LESSON_PLANS', name: 'Schemes of Work & Lesson Plans', description: 'Weekly syllabus coverage and teaching materials', type: 'REGISTER' }
    ]
  },
  PARENT_STUDENT: {
    id: 'PORTAL_PARENT_STUDENT',
    code: 'PORTAL-PARENT',
    name: 'Parent & Student Portal',
    officerTitle: 'Authorized Guardian / Student',
    icon: 'Heart',
    route: '/school/portal/parent',
    description: 'Academic reports, term fee balances, school announcements, and digital PRN payments.',
    workspaces: [
      { id: 'ACADEMIC_RESULTS', name: 'Terminal Report Cards', description: 'Verified report cards and teacher evaluations', type: 'REGISTER' },
      { id: 'FEES_STATEMENT', name: 'Student Fees Statement', description: 'Invoice breakdown, payments history, and PRN e-receipts', type: 'LEDGER' }
    ]
  }
};

export const EDUCATION_TEMPLATES: Record<EducationTemplateId, EducationTemplateConfig> = {
  // A. PRE-PRIMARY / EARLY CHILDHOOD
  PRE_PRIMARY: {
    id: 'PRE_PRIMARY',
    code: 'TMPL-EDU-ECD-01',
    displayName: 'Early Childhood & Pre-Primary ERP',
    categoryName: 'Early Childhood Care & Education (ECCE)',
    tagline: 'Developmental milestones, nursery welfare, caregiver coordination & daily routines',
    description: 'Specialized for kindergartens, nursery schools, daycare centers, and early learning hubs.',
    themeColor: 'amber',
    badgeBg: 'bg-amber-100 text-amber-800 border-amber-300',
    defaultRole: 'LEAD NURSERY DIRECTOR',
    metrics: [
      { label: 'Enrolled Infants & Toddlers', value: '342', change: '+18 this term', sublabel: 'Across Baby, Middle & Top Classes' },
      { label: 'Caregiver-to-Child Ratio', value: '1:6', change: 'Optimal', sublabel: 'National ECCE Benchmark Met' },
      { label: 'Daily Meal & Nutrition Compliance', value: '100%', change: 'Allergies Tracked', sublabel: 'Special Diets & Lactose Monitored' },
      { label: 'Milestone Progress Logs', value: '94.8%', change: 'Term Assessment', sublabel: 'Motor, Speech & Cognitive Records' }
    ],
    features: [
      'Child Bio-Metric Check-In & Authorized Guardian Pickup Verification',
      'Daily Nutrition, Nap Schedules & Meal Logs',
      'Developmental Milestones (Fine Motor, Social-Emotional, Speech)',
      'Direct Parent Messaging & Incident Reporting',
      'Nursery Term Fee Billing & Term Supplies Tracking'
    ],
    officePortals: [
      EDUCATION_OFFICE_PORTALS.BURSAR,
      EDUCATION_OFFICE_PORTALS.REGISTRAR,
      EDUCATION_OFFICE_PORTALS.HEAD_TEACHER,
      EDUCATION_OFFICE_PORTALS.TEACHER,
      EDUCATION_OFFICE_PORTALS.PARENT_STUDENT
    ],
    navGroups: [
      {
        group: 'CHILDREN & CARE',
        items: [
          { id: 'ECD_CHILDREN', label: 'Child Registry & Enrollment', icon: Baby, description: 'Child bio, emergency contacts, allergy registers and medical forms' },
          { id: 'ECD_GUARDIANS', label: 'Guardian Pickup & Safety', icon: ShieldCheck, badge: 'Verified', description: 'Authorized pickup authorizations, QR gate passes, and SMS alerts' },
          { id: 'ECD_MILESTONES', label: 'Developmental Milestones', icon: Smile, description: 'Cognitive, motor, language, and emotional growth charts' },
        ]
      },
      {
        group: 'DAILY ROUTINES',
        items: [
          { id: 'ECD_ATTENDANCE', label: 'Daily Attendance & Check-In', icon: Clock, description: 'Morning drop-off time-stamps and health screening' },
          { id: 'ECD_MEALS', label: 'Meals & Nutrition Planner', icon: Utensils, description: 'Dietary needs, allergy precautions, and snack scheduling' },
          { id: 'ECD_ACTIVITIES', label: 'Play & Learning Activities', icon: Sparkles, description: 'Montessori play-stations, outdoor activities, and crafts' },
        ]
      },
      {
        group: 'NURSERY MANAGEMENT',
        items: [
          { id: 'ECD_CAREGIVERS', label: 'Caregivers & Nursery Teachers', icon: Users, description: 'Staff-child allocations, shift rosters, and certifications' },
          { id: 'ECD_FEES', label: 'Nursery Fees & Material Dues', icon: DollarSign, description: 'Tuition, meal contributions, uniform dues, and PRN invoices' },
          { id: 'ECD_COMMUNICATION', label: 'Parent Daily Diary & Broadcast', icon: Heart, description: 'Instant photo updates, mood logs, and emergency broadcasts' },
        ]
      }
    ]
  },

  // B. PRIMARY SCHOOL ERP
  PRIMARY: {
    id: 'PRIMARY',
    code: 'TMPL-EDU-PRI-02',
    displayName: 'Primary School ERP',
    categoryName: 'Basic & Primary Education (P.1 – P.7)',
    tagline: 'Continuous assessment, thematic curriculum, attendance, PLE preparation & pupil welfare',
    description: 'Designed for government, private, and community primary institutions.',
    themeColor: 'emerald',
    badgeBg: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    defaultRole: 'PRIMARY HEAD TEACHER',
    metrics: [
      { label: 'Active Primary Enrollment', value: '1,280', change: '+4.2% YoY', sublabel: 'P.1 to P.7 Streams A, B & C' },
      { label: 'Term Assessment Completion', value: '98.4%', change: 'NCDC Compliant', sublabel: 'Continuous Assessment & Competence' },
      { label: 'Pupil Daily Attendance', value: '96.2%', change: '+1.1% vs last week', sublabel: 'Automated biometric & roll-call' },
      { label: 'PLE Candidate Readiness Index', value: '92.5%', change: 'P.7 Cohort', sublabel: 'Mock examinations & remedial sets' }
    ],
    features: [
      'Thematic Curriculum & Subject Grading (English, Math, Science, SST)',
      'Continuous Assessment (BOT, MOT, EOT) and Printable Pupil Report Cards',
      'Class & Stream Allocations with Class Teacher Assignment',
      'School Transport Fleet Tracking & Route Allocation',
      'Pupil Dispensary & Health Check Records'
    ],
    officePortals: [
      EDUCATION_OFFICE_PORTALS.BURSAR,
      EDUCATION_OFFICE_PORTALS.REGISTRAR,
      EDUCATION_OFFICE_PORTALS.ACADEMIC_DOS,
      EDUCATION_OFFICE_PORTALS.HEAD_TEACHER,
      EDUCATION_OFFICE_PORTALS.TEACHER,
      EDUCATION_OFFICE_PORTALS.PARENT_STUDENT
    ],
    navGroups: [
      {
        group: 'ACADEMICS & CURRICULUM',
        items: [
          { id: 'PRI_CLASSES', label: 'Classes & Streams (P.1–P.7)', icon: Building2, description: 'Class rosters, stream distribution, and capacity monitoring' },
          { id: 'PRI_CURRICULUM', label: 'Thematic & Subject Syllabus', icon: BookOpen, description: 'Syllabus coverage, lesson plans, and competency rubrics' },
          { id: 'PRI_ASSESSMENT', label: 'Continuous Assessment & Tests', icon: FileSpreadsheet, description: 'Beginning of Term (BOT), Mid-Term, and End of Term (EOT) grades' },
          { id: 'PRI_REPORTS', label: 'Pupil Report Cards', icon: FileText, badge: 'Automated', description: 'Automated term reports, remarks engine, and printable PDFs' },
        ]
      },
      {
        group: 'PUPILS & WELFARE',
        items: [
          { id: 'PRI_PUPILS', label: 'Pupil Information System (SIS)', icon: Users, description: 'Admission register, parent details, and disciplinary records' },
          { id: 'PRI_ATTENDANCE', label: 'Daily Roll Call & Attendance', icon: Clock, description: 'Morning and afternoon class register checks' },
          { id: 'PRI_TRANSPORT', label: 'School Vans & Route Logistics', icon: Bus, description: 'Bus routes, pickup zones, and driver assignments' },
          { id: 'PRI_HEALTH', label: 'Dispensary & Pupil Clinic', icon: Stethoscope, description: 'First aid logs, immunization history, and health incidents' },
        ]
      },
      {
        group: 'SCHOOL OPERATIONS',
        items: [
          { id: 'PRI_STAFF', label: 'Teachers & Support Staff', icon: Briefcase, description: 'Teacher allocations, subject duties, and appraisal logs' },
          { id: 'PRI_FEES', label: 'School Fees & Bursar Collections', icon: DollarSign, description: 'Term fee invoices, bank pay-in slips, and fee balance lists' },
        ]
      }
    ]
  },

  // C. SECONDARY SCHOOL ERP
  SECONDARY: {
    id: 'SECONDARY',
    code: 'TMPL-EDU-SEC-03',
    displayName: 'Secondary School ERP',
    categoryName: 'O-Level & A-Level Secondary Education (S.1 – S.6)',
    tagline: 'UNEB examinations, subject combinations, boarding hostels, lab inventory & academic rigor',
    description: 'Engineered for high schools, boarding academies, and secondary colleges.',
    themeColor: 'blue',
    badgeBg: 'bg-blue-100 text-blue-800 border-blue-300',
    defaultRole: 'PRINCIPAL / HEAD OF ACADEMICS',
    metrics: [
      { label: 'Secondary Student Population', value: '2,450', change: 'Capacity: 2,600', sublabel: 'O-Level (S.1–S.4) & A-Level (S.5–S.6)' },
      { label: 'A-Level Subject Combinations', value: '38 Active', change: 'Sciences & Arts', sublabel: 'PCM, PCB, BCM, PEM, HEG, MEGs' },
      { label: 'UNEB Examination Centre Status', value: 'U0892', change: 'Centre Approved', sublabel: 'Registered Index Numbers' },
      { label: 'Boarding Hostel Occupancy', value: '88.6%', change: '1,420 Residents', sublabel: 'Dormitory Warden Monitored' }
    ],
    features: [
      'Comprehensive O-Level & A-Level Subject Combination Management',
      'UNEB Examination Center Management & Candidate Index Indexing',
      'Continuous Assessment / Competency-Based Integration (AOI)',
      'Science & Computer Laboratory Equipment & Chemical Inventory',
      'Boarding House & Dormitory Warden Management System'
    ],
    officePortals: [
      EDUCATION_OFFICE_PORTALS.BURSAR,
      EDUCATION_OFFICE_PORTALS.REGISTRAR,
      EDUCATION_OFFICE_PORTALS.ACADEMIC_DOS,
      EDUCATION_OFFICE_PORTALS.HEAD_TEACHER,
      EDUCATION_OFFICE_PORTALS.TEACHER,
      EDUCATION_OFFICE_PORTALS.PARENT_STUDENT
    ],
    navGroups: [
      {
        group: 'ACADEMIC STRUCTURE',
        items: [
          { id: 'SEC_DEPARTMENTS', label: 'Academic Departments', icon: Building2, description: 'Sciences, Humanities, Languages, Technical, and Commercial' },
          { id: 'SEC_COMBINATIONS', label: 'A-Level Subject Combinations', icon: Compass, description: 'Subject baskets (PCM, PCB, HEG, DEG) and subject weighting' },
          { id: 'SEC_EXAMS', label: 'Examinations & UNEB Centre', icon: Award, badge: 'UCE/UACE', description: 'Internal mocks, terminal exams, and national index registrations' },
          { id: 'SEC_CURRICULUM', label: 'Competency-Based Syllabus (NCDC)', icon: BookOpen, description: 'Activities of Integration (AOI), project rubrics, and continuous assessment' },
        ]
      },
      {
        group: 'STUDENTS & BOARDING',
        items: [
          { id: 'SEC_STUDENTS', label: 'Student Directory & Admissions', icon: Users, description: 'Learner Identification Numbers (LIN), bio-data, and records' },
          { id: 'SEC_BOARDING', label: 'Hostels & Boarding Houses', icon: Home, description: 'Dormitories, bed allocations, house masters, and exeat permits' },
          { id: 'SEC_DISCIPLINE', label: 'Discipline & Prefects Council', icon: ShieldAlert, description: 'Disciplinary hearing logs, prefect leadership, and merits' },
          { id: 'SEC_LIBRARY', label: 'Academic Library & Textbooks', icon: Library, description: 'Textbook catalog, barcode loaning, and syllabus collections' },
        ]
      },
      {
        group: 'LABS & RESOURCES',
        items: [
          { id: 'SEC_LABS', label: 'Science & Computer Laboratories', icon: Flame, description: 'Physics/Chem/Bio apparatus, reagents, and PC workstations' },
          { id: 'SEC_FEES', label: 'Bursary & Financial Ledger', icon: DollarSign, description: 'Tuition fees, boarding charges, bank reconciliation, and PRNs' },
          { id: 'SEC_STAFF', label: 'Faculty & Teacher Workload', icon: Briefcase, description: 'Teacher period allocations, lesson observations, and payroll' },
        ]
      }
    ]
  },

  // D. TERTIARY & HIGHER EDUCATION
  TERTIARY: {
    id: 'TERTIARY',
    code: 'TMPL-EDU-TERT-04',
    displayName: 'Tertiary & University ERP',
    categoryName: 'Higher Education & Universities',
    tagline: 'Faculties, academic senate, credit accumulation, semester transcripts & campus governance',
    description: 'Comprehensive campus management for universities, institutes, and degree colleges.',
    themeColor: 'purple',
    badgeBg: 'bg-purple-100 text-purple-800 border-purple-300',
    defaultRole: 'ACADEMIC REGISTRAR / SENATE SECRETARY',
    metrics: [
      { label: 'Undergrad & Postgrad Enrollment', value: '8,650', change: '+6.5% Fall Intake', sublabel: 'Across 6 Faculties & 24 Schools' },
      { label: 'Semester Course Units', value: '412', change: 'Senate Approved', sublabel: 'Credit Accumulation & Transfer (CATS)' },
      { label: 'Faculty Research Grants', value: '$1.4M', change: '18 Active Grants', sublabel: 'National Science Foundation Funded' },
      { label: 'Graduation Clearance Rate', value: '99.1%', change: 'Senate Certified', sublabel: 'Bursary, Library & Faculty cleared' }
    ],
    features: [
      'Faculty, School & Academic Department Management Hierarchy',
      'Academic Senate Approvals, Curricula Accreditations & CGPA Engine',
      'Semester Course Unit Registration & Prerequisite Validation',
      'Bursary Alpha Cash Book & University Endowment Ledger',
      'Comprehensive E-Library, Health Center & Student Hostels'
    ],
    officePortals: [
      EDUCATION_OFFICE_PORTALS.BURSAR,
      EDUCATION_OFFICE_PORTALS.REGISTRAR,
      EDUCATION_OFFICE_PORTALS.ACADEMIC_DOS,
      EDUCATION_OFFICE_PORTALS.HEAD_TEACHER
    ],
    navGroups: [
      {
        group: 'CAMPUS GOVERNANCE',
        items: [
          { id: 'MOD_EDU_GOVERNANCE', label: 'University Council & Senate', icon: Building2, description: 'Senate resolutions, council committees, and campus policies' },
          { id: 'MOD_EDU_SENATE', label: 'Curricula & Credit Units', icon: CheckCircle2, description: 'Degree accreditations, CATS credits, and prerequisite engines' },
          { id: 'MOD_EDU_REGISTRAR', label: 'Academic Registrar & SIS', icon: Users, description: 'Intake selection, transcripts, registration, and graduation list' },
        ]
      },
      {
        group: 'FINANCE & SERVICES',
        items: [
          { id: 'MOD_EDU_BURSARY', label: 'University Bursary & Ledger', icon: DollarSign, description: 'Tuition structures, research grant ledger, and receipts' },
          { id: 'MOD_EDU_LIBRARY', label: 'University Library & E-Journals', icon: Library, description: 'Digital repositories, OPAC catalog, and thesis archive' },
          { id: 'MOD_EDU_CLINIC', label: 'University Health Service', icon: Stethoscope, description: 'Campus infirmary, medical insurance, and doctor consultations' },
          { id: 'MOD_EDU_HOSTEL', label: 'Halls of Residence', icon: Home, description: 'On-campus halls, room reservations, and warden services' },
        ]
      }
    ]
  },

  // E. VOCATIONAL & TECHNICAL (TVET)
  VOCATIONAL: {
    id: 'VOCATIONAL',
    code: 'TMPL-EDU-TVET-05',
    displayName: 'Vocational & TVET Institute ERP',
    categoryName: 'Technical, Vocational Education & Training',
    tagline: 'Competency-based training (CBET), workshop machinery, industrial attachments & trade certifications',
    description: 'Built for polytechnics, technical institutes, craft centers, and trade academies.',
    themeColor: 'teal',
    badgeBg: 'bg-teal-100 text-teal-800 border-teal-300',
    defaultRole: 'PRINCIPAL TECHNICAL DIRECTOR',
    metrics: [
      { label: 'Enrolled TVET Apprentices', value: '920', change: '12 Trade Fields', sublabel: 'Electrical, Mechanical, Building, ICT' },
      { label: 'Workshops & Machinery Units', value: '46', change: 'Safety Certified', sublabel: 'Heavy Lathes, CNCs, Welding Bays' },
      { label: 'Industrial Attachment Placements', value: '100%', change: 'Industry Partners', sublabel: 'Partnered with 84 Engineering Firms' },
      { label: 'Trade Test Pass Rate (DIT/UBTEB)', value: '96.8%', change: 'National Assessment', sublabel: 'Level 1, 2 & Craft Certificates' }
    ],
    features: [
      'Competency-Based Education & Training (CBET) Modular Assessments',
      'Technical Workshop Machinery, Consumables & Safety PPE Inventory',
      'Industrial Attachment Supervision & Field Logbook Assessments',
      'National Trade Testing Registration (DIT, UBTEB, City & Guilds)',
      'Production Unit Invoicing & Technical Consulting Revenue'
    ],
    officePortals: [
      EDUCATION_OFFICE_PORTALS.BURSAR,
      EDUCATION_OFFICE_PORTALS.REGISTRAR,
      EDUCATION_OFFICE_PORTALS.ACADEMIC_DOS,
      EDUCATION_OFFICE_PORTALS.HEAD_TEACHER
    ],
    navGroups: [
      {
        group: 'TRADE WORKSHOPS',
        items: [
          { id: 'TVET_TRADES', label: 'Trade Disciplines & Programs', icon: Wrench, description: 'Electrical installation, automotive, welding, plumbing, and carpentry' },
          { id: 'TVET_WORKSHOPS', label: 'Workshop Equipment & Safety', icon: ShieldAlert, description: 'Machinery safety inspections, tooling inventory, and maintenance logs' },
          { id: 'TVET_ASSESSMENT', label: 'Competency Modular Logs (CBET)', icon: BadgeCheck, description: 'Practical task grading, skill checklists, and portfolio verification' },
        ]
      },
      {
        group: 'ATTACHMENTS & CERTIFICATION',
        items: [
          { id: 'TVET_ATTACHMENTS', label: 'Industrial Attachments', icon: Briefcase, description: 'Company placements, supervisor field logs, and student logbooks' },
          { id: 'TVET_EXAMS', label: 'Trade Testing (DIT & UBTEB)', icon: Award, description: 'National trade assessments, candidate roll, and certificates' },
          { id: 'TVET_FEES', label: 'Tuition & Workshop Materials Dues', icon: DollarSign, description: 'Raw material contributions, protective gear fees, and billing' },
        ]
      }
    ]
  }
};

/**
 * Institutional Template & Capability Activation Service
 */
export class EducationTemplateService {
  private static defaultLicense: InstitutionalLicense = {
    institutionId: 'INST-DEMO-001',
    institutionName: 'ST. JOSEPH ACADEMY & HIGH SCHOOL',
    activeTier: 'SECONDARY',
    curriculumCode: 'UG_NCDC',
    licenseStatus: 'ACTIVE',
    studentCapacity: 3000,
    academicYear: 2026,
    currentTerm: 1,
    enabledCapabilities: [
      'CAP_PRI_CURR',
      'CAP_SEC_UNEB',
      'CAP_BURSAR_FAAP',
      'CAP_REGISTRAR_SIS'
    ]
  };

  /**
   * Get Active Institutional License
   */
  public static getInstitutionalLicense(): InstitutionalLicense {
    const stored = localStorage.getItem('JUMO_EDU_LICENSE');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        // fallback
      }
    }
    return this.defaultLicense;
  }

  /**
   * Set Institutional Template / Tier
   */
  public static setInstitutionalTier(tier: EducationTemplateId): void {
    const current = this.getInstitutionalLicense();
    current.activeTier = tier;
    localStorage.setItem('JUMO_EDU_LICENSE', JSON.stringify(current));
    localStorage.setItem('JUMO_EDU_ACTIVE_TEMPLATE', tier);
  }

  /**
   * Get Template Config by Id
   */
  public static getTemplate(templateId: EducationTemplateId): EducationTemplateConfig {
    return EDUCATION_TEMPLATES[templateId] || EDUCATION_TEMPLATES.SECONDARY;
  }

  /**
   * Get All Available Templates
   */
  public static getAllTemplates(): EducationTemplateConfig[] {
    return Object.values(EDUCATION_TEMPLATES);
  }

  /**
   * Get Available Office Portals for a given Template Tier
   */
  public static getOfficePortals(tier?: EducationTemplateId): EducationOfficePortal[] {
    const targetTier = tier || this.getInstitutionalLicense().activeTier;
    const tmpl = this.getTemplate(targetTier);
    return tmpl.officePortals || Object.values(EDUCATION_OFFICE_PORTALS);
  }

  /**
   * Get Specific Office Portal Definition
   */
  public static getPortalById(portalId: string): EducationOfficePortal | undefined {
    const key = portalId.toUpperCase().replace('PORTAL_', '');
    return EDUCATION_OFFICE_PORTALS[key] || Object.values(EDUCATION_OFFICE_PORTALS).find(p => p.id === portalId || p.code === portalId);
  }
}

// Default export
export default EducationTemplateService;
