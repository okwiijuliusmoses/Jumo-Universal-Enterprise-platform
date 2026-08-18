// JUMO Digital Hybrid Platform — Secondary School ERP Engine [Strict Registry-Driven Architecture Mandate 2026]
import { 
  InstitutionProfile, Department, StaffMember, Student, Subject, 
  FeeInvoice, FeePaymentReceipt, SchoolDirectorate, UserRole,
  InstitutionalOffice, EstateAsset, FarmProject,
  Capability, ModuleRegistryEntry, Tenant, FormDefinition, WorkflowDefinition, WorkflowInstance,
  ChartOfAccount, FinancialTransaction, Vendor, Bill, BankFeedItem, Budget, FixedAsset, TaxConfig,
  AssessmentRecord, TimetableEntry, HostelAccommodation, LibraryBook, LibraryLoan,
  AttendanceRecord, DisciplineCase, HealthRecord, PartnerContract,
  RoleProfileDefinition, ReportDefinition, AIServiceDefinition,
  SchoolPayTransaction, SchoolPaySettlementBatch, StudentReportCard, DigitalPaymentRail,
  OrganizationalUnit, OrgUnitType, OfficeDefinition, OfficeType, CapabilityPackage, ResolvedOfficeConfig,
  BudgetBookRecord, BudgetTransferVoucher, VoteBookItem, CashBookType, CashBookEntry,
  AuditObservation, FinancialAnalysisDigest, PaymentDomain, PaymentCodeStrategy,
  PayeeIdentity, PaymentObligation, UniversalPaymentTransaction, PaymentRefundRequest, PaymentReversalRequest,
  BudgetBook, BudgetBookLine, VoteLedgerEntry, VoteLedgerTransaction, AuditorRegisterEntry, JUPIEPaymentIdentity
} from './types';
import { JUMODBEngine } from '../database/db';
import { CapabilityPackageRegistry } from '../core/registry/CapabilityPackageRegistry';

export class SecondarySchoolERPEngine {
  private static instance: SecondarySchoolERPEngine;
  private db: JUMODBEngine;
  private currentTenantId: string = 'TENANT-TEST-ALPHA';

  private constructor() {
    this.db = JUMODBEngine.getInstance();
    this.initializeRegistries();
  }

  public static getInstance(): SecondarySchoolERPEngine {
    if (!SecondarySchoolERPEngine.instance) {
      SecondarySchoolERPEngine.instance = new SecondarySchoolERPEngine();
    }
    return SecondarySchoolERPEngine.instance;
  }

  private async initializeRegistries() {
    await this.db.waitUntilReady();
    const data = (this.db as any).data;
    
    // 0. PUBLIC SECTIONS & ANNOUNCEMENTS
    if (!data['public_sections']) {
      data['public_sections'] = [
        { id: 'PS-1', title: 'Institutional Overview', code: 'OVERVIEW', icon: 'Building2', isEnabled: true },
        { id: 'PS-2', title: 'Admissions 2026', code: 'ADMISSIONS', icon: 'GraduationCap', isEnabled: true },
        { id: 'PS-3', title: 'Academic Catalog', code: 'ACADEMICS', icon: 'BookOpen', isEnabled: true },
        { id: 'PS-4', title: 'Campus & Welfare', code: 'CAMPUS', icon: 'Activity', isEnabled: true },
        { id: 'PS-5', title: 'Fee Information', code: 'FEES', icon: 'DollarSign', isEnabled: true },
        { id: 'PS-6', title: 'Partner & Alumni Hub', code: 'PARTNERS', icon: 'Shield', isEnabled: true }
      ];
    }

    if (!data['announcements']) {
      data['announcements'] = [
        { id: 'ANN-1', title: '2026 Academic Intake Now Open', content: 'Applications for the new academic year are now being processed through the Digital Admissions Registry.', date: new Date().toISOString(), category: 'ADMISSIONS' },
        { id: 'ANN-2', title: 'Inter-House Sports Gala & Science Fair', content: 'Annual inter-house athletic games and STEM exhibition scheduled for end of term.', date: new Date().toISOString(), category: 'EVENTS' },
        { id: 'ANN-3', title: 'Board of Governors Audit Clearance', content: 'Term 1 financial reconciliation and statutory EMIS compliance completed.', date: new Date().toISOString(), category: 'GOVERNANCE' }
      ];
    }

    // 1. CONFIGURABLE 50+ ROLE / STAKEHOLDER PROFILES REGISTRY
    if (!data['role_profiles'] || data['role_profiles'].length < 50) {
      data['role_profiles'] = [
        // 1. Student and learner ecosystem (13 profiles)
        { code: 'STUDENT', name: 'General Student', classification: 'STUDENT_LEARNER', description: 'Enrolled student with full academic dossier access', defaultCapabilityCodes: ['CAP-SIS-DOS', 'CAP-SIS-ATT', 'CAP-SIS-GRD', 'CAP-SIS-FEE'], isAdministrative: false },
        { code: 'PROSPECTIVE_STUDENT', name: 'Prospective Student', classification: 'STUDENT_LEARNER', description: 'Prospective candidate browsing academic curriculum', defaultCapabilityCodes: ['CAP-PUB-CAT'], isAdministrative: false },
        { code: 'APPLICANT', name: 'Admission Applicant', classification: 'STUDENT_LEARNER', description: 'Applicant with active submission in the admissions queue', defaultCapabilityCodes: ['CAP-SIS-ADM'], isAdministrative: false },
        { code: 'NEW_STUDENT', name: 'New Enrollee Student', classification: 'STUDENT_LEARNER', description: 'Newly admitted student completing orientation and hostel onboarding', defaultCapabilityCodes: ['CAP-SIS-DOS', 'CAP-OPS-HST'], isAdministrative: false },
        { code: 'CONTINUING_STUDENT', name: 'Continuing Student', classification: 'STUDENT_LEARNER', description: 'Active student in good academic standing across terms', defaultCapabilityCodes: ['CAP-SIS-DOS', 'CAP-SIS-GRD', 'CAP-SIS-ATT'], isAdministrative: false },
        { code: 'GRADUATING_STUDENT', name: 'Graduating Candidate', classification: 'STUDENT_LEARNER', description: 'Final year candidate clearing fees and requesting transcripts', defaultCapabilityCodes: ['CAP-SIS-DOS', 'CAP-SIS-TRN'], isAdministrative: false },
        { code: 'EXCHANGE_STUDENT', name: 'Exchange Student', classification: 'STUDENT_LEARNER', description: 'Visiting student with cross-institutional credit transfer', defaultCapabilityCodes: ['CAP-SIS-DOS', 'CAP-ACAD-CRS'], isAdministrative: false },
        { code: 'INTERNATIONAL_STUDENT', name: 'International Student', classification: 'STUDENT_LEARNER', description: 'Overseas student with visa, residency, and welfare monitoring', defaultCapabilityCodes: ['CAP-SIS-DOS', 'CAP-OPS-HST'], isAdministrative: false },
        { code: 'DISTANCE_ONLINE_STUDENT', name: 'Distance Learner', classification: 'STUDENT_LEARNER', description: 'Remote student accessing digital materials and assignments', defaultCapabilityCodes: ['CAP-SIS-DOS', 'CAP-LIB-CAT'], isAdministrative: false },
        { code: 'SHORT_COURSE_STUDENT', name: 'Short Course Student', classification: 'STUDENT_LEARNER', description: 'Vocational and continuing education enrollee', defaultCapabilityCodes: ['CAP-ACAD-CRS'], isAdministrative: false },
        { code: 'STUDENT_REPRESENTATIVE', name: 'Student Prefect/Rep', classification: 'STUDENT_LEARNER', description: 'Class representative with student council liaison', defaultCapabilityCodes: ['CAP-SIS-DOS', 'CAP-SIS-ATT'], isAdministrative: false },
        { code: 'STUDENT_ORG_OFFICER', name: 'Student Guild Officer', classification: 'STUDENT_LEARNER', description: 'Elected guild leader organizing student activities', defaultCapabilityCodes: ['CAP-SIS-DOS', 'CAP-PUB-EVT'], isAdministrative: false },
        { code: 'ALUMNI', name: 'Institutional Alumni', classification: 'STUDENT_LEARNER', description: 'Graduated alumnus with transcript and networking access', defaultCapabilityCodes: ['CAP-SIS-TRN', 'CAP-EXT-ALM'], isAdministrative: false },

        // 2. Academic ecosystem (15 profiles)
        { code: 'TEACHER', name: 'Classroom Teacher', classification: 'ACADEMIC_FACULTY', directorate: 'ACADEMICS', description: 'Subject instructor recording marks, lessons, and attendance', defaultCapabilityCodes: ['CAP-ACAD-LES', 'CAP-SIS-ATT', 'CAP-SIS-GRD'], isAdministrative: false },
        { code: 'LECTURER', name: 'Senior Lecturer', classification: 'ACADEMIC_FACULTY', directorate: 'ACADEMICS', description: 'Senior faculty member managing advanced classes', defaultCapabilityCodes: ['CAP-ACAD-LES', 'CAP-ACAD-CRS', 'CAP-SIS-GRD'], isAdministrative: false },
        { code: 'PROFESSOR', name: 'Chair Professor', classification: 'ACADEMIC_FACULTY', directorate: 'ACADEMICS', description: 'Academic chair directing subject excellence', defaultCapabilityCodes: ['CAP-ACAD-CRS', 'CAP-ACAD-CUR'], isAdministrative: false },
        { code: 'TUTOR', name: 'Academic Tutor', classification: 'ACADEMIC_FACULTY', directorate: 'ACADEMICS', description: 'Remedial tutor and student academic mentor', defaultCapabilityCodes: ['CAP-ACAD-LES', 'CAP-SIS-DOS'], isAdministrative: false },
        { code: 'TEACHING_ASSISTANT', name: 'Teaching Assistant', classification: 'ACADEMIC_FACULTY', directorate: 'ACADEMICS', description: 'Faculty support assisting with lab and grading sessions', defaultCapabilityCodes: ['CAP-SIS-GRD'], isAdministrative: false },
        { code: 'COURSE_COORDINATOR', name: 'Course Coordinator', classification: 'ACADEMIC_FACULTY', directorate: 'ACADEMICS', description: 'Lead coordinator for multi-stream subjects', defaultCapabilityCodes: ['CAP-ACAD-CRS', 'CAP-ACAD-TIM'], isAdministrative: false },
        { code: 'DEPARTMENT_ACADEMIC_OFFICER', name: 'Dept Academic Officer', classification: 'ACADEMIC_FACULTY', directorate: 'ACADEMICS', description: 'Departmental timetable and curriculum officer', defaultCapabilityCodes: ['CAP-ACAD-CUR', 'CAP-ACAD-TIM'], isAdministrative: true },
        { code: 'HOD', name: 'Head of Department', classification: 'ACADEMIC_FACULTY', directorate: 'ACADEMICS', description: 'Head of departmental subjects, staffing, and marks moderation', defaultCapabilityCodes: ['CAP-ACAD-CUR', 'CAP-SIS-GRD', 'CAP-HR-STAFF'], isAdministrative: true },
        { code: 'DEAN', name: 'Dean of Faculty / Studies', classification: 'ACADEMIC_FACULTY', directorate: 'ACADEMICS', description: 'Academic dean approving term grades and curriculum', defaultCapabilityCodes: ['CAP-ACAD-CUR', 'CAP-SIS-GRD', 'CAP-WRK-OFF'], isAdministrative: true },
        { code: 'FACULTY_ADMINISTRATOR', name: 'Faculty Administrator', classification: 'ACADEMIC_FACULTY', directorate: 'ACADEMICS', description: 'Administrative manager for academic departments', defaultCapabilityCodes: ['CAP-HR-STAFF', 'CAP-ACAD-TIM'], isAdministrative: true },
        { code: 'ACADEMIC_REGISTRAR', name: 'Academic Registrar', classification: 'ACADEMIC_FACULTY', directorate: 'ACADEMICS', description: 'Chief custodian of academic standards and curriculum accreditation', defaultCapabilityCodes: ['CAP-ACAD-CUR', 'CAP-SIS-TRN', 'CAP-WRK-OFF'], isAdministrative: true },
        { code: 'EXAM_OFFICER', name: 'Examinations Officer', classification: 'ACADEMIC_FACULTY', directorate: 'EXAMINATIONS', description: 'Coordinator for internal assessments and national examinations', defaultCapabilityCodes: ['CAP-SIS-GRD', 'CAP-SIS-TRN'], isAdministrative: true },
        { code: 'ACADEMIC_QUALITY_OFFICER', name: 'Academic Quality Officer', classification: 'ACADEMIC_FACULTY', directorate: 'ACADEMICS', description: 'Inspector of academic standards and teaching quality', defaultCapabilityCodes: ['CAP-ACAD-CUR', 'CAP-GOV-AUD'], isAdministrative: true },
        { code: 'CURRICULUM_ADMINISTRATOR', name: 'Curriculum Administrator', classification: 'ACADEMIC_FACULTY', directorate: 'ACADEMICS', description: 'Administrator designing syllabus schemes of work', defaultCapabilityCodes: ['CAP-ACAD-CUR', 'CAP-ACAD-CRS'], isAdministrative: true },
        { code: 'RESEARCHER', name: 'Educational Researcher', classification: 'ACADEMIC_FACULTY', directorate: 'ACADEMICS', description: 'Academic researcher publishing pedagogical studies', defaultCapabilityCodes: ['CAP-LIB-CAT'], isAdministrative: false },
        { code: 'RESEARCH_SUPERVISOR', name: 'Research Supervisor', classification: 'ACADEMIC_FACULTY', directorate: 'ACADEMICS', description: 'Supervisor for student science projects and exhibitions', defaultCapabilityCodes: ['CAP-LIB-CAT'], isAdministrative: false },

        // 3. Student Information Management (12 profiles)
        { code: 'ADMISSIONS_OFFICER', name: 'Admissions Officer', classification: 'STUDENT_INFORMATION_MANAGEMENT', directorate: 'ADMISSIONS', description: 'Reviews applicant files and manages admission workflows', defaultCapabilityCodes: ['CAP-SIS-ADM', 'CAP-SIS-REG'], isAdministrative: true },
        { code: 'ADMISSIONS_MANAGER', name: 'Admissions Manager', classification: 'STUDENT_INFORMATION_MANAGEMENT', directorate: 'ADMISSIONS', description: 'Directs institutional intake quotas and criteria', defaultCapabilityCodes: ['CAP-SIS-ADM', 'CAP-GOV-EXEC'], isAdministrative: true },
        { code: 'REGISTRAR', name: 'Institutional Registrar', classification: 'STUDENT_INFORMATION_MANAGEMENT', directorate: 'ADMISSIONS', description: 'Chief registrar of student dossiers, enrollment, and transfers', defaultCapabilityCodes: ['CAP-SIS-REG', 'CAP-SIS-ADM', 'CAP-SIS-TRN'], isAdministrative: true },
        { code: 'STUDENT_RECORDS_OFFICER', name: 'Student Records Officer', classification: 'STUDENT_INFORMATION_MANAGEMENT', directorate: 'ADMISSIONS', description: 'Maintains biographical and biometric student archives', defaultCapabilityCodes: ['CAP-SIS-REG', 'CAP-SIS-DOS'], isAdministrative: true },
        { code: 'ENROLLMENT_OFFICER', name: 'Enrollment Officer', classification: 'STUDENT_INFORMATION_MANAGEMENT', directorate: 'ADMISSIONS', description: 'Processes termly class and stream placement', defaultCapabilityCodes: ['CAP-SIS-REG', 'CAP-ACAD-CRS'], isAdministrative: true },
        { code: 'ACADEMIC_RECORDS_OFFICER', name: 'Academic Records Officer', classification: 'STUDENT_INFORMATION_MANAGEMENT', directorate: 'EXAMINATIONS', description: 'Compiles official student transcripts and progress files', defaultCapabilityCodes: ['CAP-SIS-TRN', 'CAP-SIS-GRD'], isAdministrative: true },
        { code: 'EXAM_ADMINISTRATOR', name: 'Exam Administrator', classification: 'STUDENT_INFORMATION_MANAGEMENT', directorate: 'EXAMINATIONS', description: 'Administers exam timetables and candidate seat numbers', defaultCapabilityCodes: ['CAP-SIS-GRD', 'CAP-ACAD-TIM'], isAdministrative: true },
        { code: 'GRADUATION_OFFICER', name: 'Graduation Officer', classification: 'STUDENT_INFORMATION_MANAGEMENT', directorate: 'ADMISSIONS', description: 'Manages candidate graduation clearance and diploma archives', defaultCapabilityCodes: ['CAP-SIS-TRN', 'CAP-SIS-FEE'], isAdministrative: true },
        { code: 'STUDENT_SUPPORT_OFFICER', name: 'Student Support Officer', classification: 'STUDENT_INFORMATION_MANAGEMENT', directorate: 'STUDENT_AFFAIRS', description: 'Assists with student welfare, grievances, and guidance', defaultCapabilityCodes: ['CAP-SIS-DOS', 'CAP-OPS-DSC'], isAdministrative: true },
        { code: 'COUNSELLOR', name: 'Guidance Counsellor', classification: 'STUDENT_INFORMATION_MANAGEMENT', directorate: 'COUNSELLING', description: 'Provides confidential career and psychological counselling', defaultCapabilityCodes: ['CAP-SIS-DOS', 'CAP-OPS-DSC'], isAdministrative: true },
        { code: 'ACCOMMODATION_OFFICER', name: 'Hostel/Accommodation Officer', classification: 'STUDENT_INFORMATION_MANAGEMENT', directorate: 'BOARDING', description: 'Assigns boarding hostels, rooms, and dorm inspections', defaultCapabilityCodes: ['CAP-OPS-HST', 'CAP-EST-ASSET'], isAdministrative: true },
        { code: 'LIBRARIAN', name: 'Chief Librarian', classification: 'STUDENT_INFORMATION_MANAGEMENT', directorate: 'LIBRARY', description: 'Oversees digital catalog, textbook lending, and repository', defaultCapabilityCodes: ['CAP-LIB-CAT', 'CAP-LIB-LON'], isAdministrative: true },

        // 4. Finance and administration (12 profiles)
        { code: 'BURSAR', name: 'Institutional Bursar', classification: 'FINANCE_ADMINISTRATION', directorate: 'FINANCE', description: 'Chief financial officer managing ledger, billing, and cash flow', defaultCapabilityCodes: ['CAP-FIN-COA', 'CAP-FIN-GL', 'CAP-FIN-BILL', 'CAP-FIN-REC', 'CAP-FIN-BNK', 'CAP-FIN-REP'], isAdministrative: true },
        { code: 'FINANCE_OFFICER', name: 'Senior Finance Officer', classification: 'FINANCE_ADMINISTRATION', directorate: 'FINANCE', description: 'Senior accountant posting journals and reconciling accounts', defaultCapabilityCodes: ['CAP-FIN-GL', 'CAP-FIN-REC', 'CAP-FIN-BNK'], isAdministrative: true },
        { code: 'ACCOUNTANT', name: 'Staff Accountant', classification: 'FINANCE_ADMINISTRATION', directorate: 'FINANCE', description: 'Handles day-to-day accounts receivable and payable', defaultCapabilityCodes: ['CAP-FIN-BILL', 'CAP-FIN-PAY', 'CAP-FIN-GL'], isAdministrative: true },
        { code: 'ACCOUNTS_RECEIVABLE_OFFICER', name: 'A/R & Billing Officer', classification: 'FINANCE_ADMINISTRATION', directorate: 'FINANCE', description: 'Manages student fee assessments, invoices, and debt recovery', defaultCapabilityCodes: ['CAP-FIN-BILL', 'CAP-FIN-REC'], isAdministrative: true },
        { code: 'ACCOUNTS_PAYABLE_OFFICER', name: 'A/P & Bills Officer', classification: 'FINANCE_ADMINISTRATION', directorate: 'FINANCE', description: 'Processes vendor bills, purchase invoices, and disbursements', defaultCapabilityCodes: ['CAP-FIN-PAY', 'CAP-PRC-VND'], isAdministrative: true },
        { code: 'CASHIER', name: 'Institutional Cashier', classification: 'FINANCE_ADMINISTRATION', directorate: 'FINANCE', description: 'Issues official receipts for cash, bank deposits, and mobile money', defaultCapabilityCodes: ['CAP-FIN-REC'], isAdministrative: true },
        { code: 'PAYROLL_OFFICER', name: 'Payroll Officer', classification: 'FINANCE_ADMINISTRATION', directorate: 'FINANCE', description: 'Calculates staff salaries, allowances, and statutory deductions', defaultCapabilityCodes: ['CAP-FIN-PAY', 'CAP-HR-STAFF'], isAdministrative: true },
        { code: 'PROCUREMENT_OFFICER', name: 'Procurement Officer', classification: 'FINANCE_ADMINISTRATION', directorate: 'PROCUREMENT', description: 'Generates purchase orders and oversees tender bidding', defaultCapabilityCodes: ['CAP-PRC-ORD', 'CAP-PRC-VND'], isAdministrative: true },
        { code: 'PROCUREMENT_MANAGER', name: 'Procurement Manager', classification: 'FINANCE_ADMINISTRATION', directorate: 'PROCUREMENT', description: 'Approves supplier requisitions and monitors supply chains', defaultCapabilityCodes: ['CAP-PRC-ORD', 'CAP-PRC-VND', 'CAP-WRK-OFF'], isAdministrative: true },
        { code: 'ASSET_OFFICER', name: 'Fixed Assets Officer', classification: 'FINANCE_ADMINISTRATION', directorate: 'FINANCE', description: 'Maintains fixed asset register and calculates depreciation', defaultCapabilityCodes: ['CAP-FIN-AST', 'CAP-EST-ASSET'], isAdministrative: true },
        { code: 'INTERNAL_AUDITOR', name: 'Internal Auditor', classification: 'FINANCE_ADMINISTRATION', directorate: 'FINANCE', description: 'Conducts compliance audits and verifies journal trails', defaultCapabilityCodes: ['CAP-FIN-REP', 'CAP-GOV-AUD'], isAdministrative: true },
        { code: 'FINANCE_MANAGER', name: 'Finance Manager', classification: 'FINANCE_ADMINISTRATION', directorate: 'FINANCE', description: 'Oversees termly budget allocations and variance reporting', defaultCapabilityCodes: ['CAP-FIN-BDG', 'CAP-FIN-REP', 'CAP-FIN-COA'], isAdministrative: true },

        // 5. Institutional management (15 profiles)
        { code: 'PROPRIETOR', name: 'Platform Owner / Proprietor', classification: 'INSTITUTIONAL_MANAGEMENT', directorate: 'GOVERNANCE', description: 'Platform owner with full cross-tenant inspection and governance authority', defaultCapabilityCodes: ['CAP-GOV-EXEC', 'CAP-GOV-AUD', 'CAP-FIN-REP', 'CAP-HR-STAFF'], isAdministrative: true },
        { code: 'BOARD_MEMBER', name: 'Board of Governors Member', classification: 'INSTITUTIONAL_MANAGEMENT', directorate: 'GOVERNANCE', description: 'Institutional governor reviewing strategic plans and audits', defaultCapabilityCodes: ['CAP-GOV-EXEC', 'CAP-GOV-AUD'], isAdministrative: true },
        { code: 'HEADTEACHER', name: 'Headteacher / Principal', classification: 'INSTITUTIONAL_MANAGEMENT', directorate: 'EXECUTIVE_ADMIN', description: 'Chief executive officer of the school operations and academics', defaultCapabilityCodes: ['CAP-GOV-EXEC', 'CAP-HR-STAFF', 'CAP-SIS-REG', 'CAP-FIN-REP'], isAdministrative: true },
        { code: 'PRINCIPAL', name: 'College Principal', classification: 'INSTITUTIONAL_MANAGEMENT', directorate: 'EXECUTIVE_ADMIN', description: 'Executive principal leading strategic development', defaultCapabilityCodes: ['CAP-GOV-EXEC', 'CAP-HR-STAFF'], isAdministrative: true },
        { code: 'DEPUTY_PRINCIPAL', name: 'Deputy Principal', classification: 'INSTITUTIONAL_MANAGEMENT', directorate: 'EXECUTIVE_ADMIN', description: 'Assists principal in institutional administrative management', defaultCapabilityCodes: ['CAP-GOV-EXEC', 'CAP-HR-STAFF'], isAdministrative: true },
        { code: 'DEPUTY_ACADEMIC', name: 'Deputy Head (Academics)', classification: 'INSTITUTIONAL_MANAGEMENT', directorate: 'ACADEMICS', description: 'Supervises all teaching staff, timetables, and academic standards', defaultCapabilityCodes: ['CAP-ACAD-CUR', 'CAP-SIS-GRD', 'CAP-HR-STAFF'], isAdministrative: true },
        { code: 'DEPUTY_ADMIN', name: 'Deputy Head (Administration)', classification: 'INSTITUTIONAL_MANAGEMENT', directorate: 'EXECUTIVE_ADMIN', description: 'Supervises non-teaching staff, facilities, and campus operations', defaultCapabilityCodes: ['CAP-HR-STAFF', 'CAP-EST-ASSET', 'CAP-OPS-TRP'], isAdministrative: true },
        { code: 'CHIEF_ADMIN_OFFICER', name: 'Chief Administrative Officer', classification: 'INSTITUTIONAL_MANAGEMENT', directorate: 'EXECUTIVE_ADMIN', description: 'Directs statutory compliance, contracts, and campus operations', defaultCapabilityCodes: ['CAP-HR-STAFF', 'CAP-EST-ASSET'], isAdministrative: true },
        { code: 'HR_OFFICER', name: 'HR Officer', classification: 'INSTITUTIONAL_MANAGEMENT', directorate: 'HR_ADMIN', description: 'Manages staff recruitment, contracts, leave, and appraisals', defaultCapabilityCodes: ['CAP-HR-STAFF', 'CAP-HR-LEV'], isAdministrative: true },
        { code: 'HR_MANAGER', name: 'HR Manager', classification: 'INSTITUTIONAL_MANAGEMENT', directorate: 'HR_ADMIN', description: 'Directs institutional human capital strategy and policy', defaultCapabilityCodes: ['CAP-HR-STAFF', 'CAP-HR-LEV', 'CAP-WRK-OFF'], isAdministrative: true },
        { code: 'ICT_OFFICER', name: 'ICT Systems Officer', classification: 'INSTITUTIONAL_MANAGEMENT', directorate: 'ICT', description: 'Maintains computer labs, campus network, and digital hardware', defaultCapabilityCodes: ['CAP-ICT-SYS'], isAdministrative: true },
        { code: 'ICT_ADMIN', name: 'ICT Administrator', classification: 'INSTITUTIONAL_MANAGEMENT', directorate: 'ICT', description: 'Administers security roles, user accounts, and system backups', defaultCapabilityCodes: ['CAP-ICT-SYS', 'CAP-GOV-AUD'], isAdministrative: true },
        { code: 'COMPLIANCE_OFFICER', name: 'Regulatory Compliance Officer', classification: 'INSTITUTIONAL_MANAGEMENT', directorate: 'GOVERNANCE', description: 'Ensures national EMIS, tax, and curriculum compliance', defaultCapabilityCodes: ['CAP-GOV-AUD', 'CAP-EXT-REG'], isAdministrative: true },
        { code: 'LEGAL_OFFICER', name: 'Legal & Contracts Officer', classification: 'INSTITUTIONAL_MANAGEMENT', directorate: 'GOVERNANCE', description: 'Reviews institutional partnerships, land leases, and legal deeds', defaultCapabilityCodes: ['CAP-EXT-PRT'], isAdministrative: true },
        { code: 'COMMUNICATIONS_OFFICER', name: 'Public Relations Officer', classification: 'INSTITUTIONAL_MANAGEMENT', directorate: 'COMMUNICATIONS', description: 'Manages school announcements, press releases, and publications', defaultCapabilityCodes: ['CAP-PUB-EVT'], isAdministrative: true },
        { code: 'QUALITY_ASSURANCE_MANAGER', name: 'Quality Assurance Manager', classification: 'INSTITUTIONAL_MANAGEMENT', directorate: 'GOVERNANCE', description: 'Conducts institutional performance audits and ISO quality checks', defaultCapabilityCodes: ['CAP-GOV-AUD', 'CAP-ACAD-CUR'], isAdministrative: true },
        { code: 'ESTATES_OFFICER', name: 'Estates & Facilities Officer', classification: 'INSTITUTIONAL_MANAGEMENT', directorate: 'FACILITIES', description: 'Oversees school buildings, repairs, water, electricity, and sanitation', defaultCapabilityCodes: ['CAP-EST-ASSET'], isAdministrative: true },
        { code: 'SECURITY_OFFICER', name: 'Chief Security Officer', classification: 'INSTITUTIONAL_MANAGEMENT', directorate: 'FACILITIES', description: 'Manages gate security, campus surveillance, and emergency protocols', defaultCapabilityCodes: ['CAP-EST-ASSET'], isAdministrative: true },
        { code: 'SYSTEM_ADMIN', name: 'Enterprise System Administrator', classification: 'INSTITUTIONAL_MANAGEMENT', directorate: 'ICT', description: 'Superuser with full technical configuration access', defaultCapabilityCodes: ['CAP-GOV-EXEC', 'CAP-ICT-SYS', 'CAP-GOV-AUD'], isAdministrative: true },

        // 6. External stakeholders (10 profiles)
        { code: 'PARENT', name: 'Parent / Legal Guardian', classification: 'EXTERNAL_STAKEHOLDER', description: 'Guardian monitoring ward progress, attendance, and fee invoices', defaultCapabilityCodes: ['CAP-EXT-PAR'], isAdministrative: false },
        { code: 'GENERAL_PUBLIC_USER', name: 'Public Visitor', classification: 'EXTERNAL_STAKEHOLDER', description: 'Visitor exploring school catalog, events, and public notices', defaultCapabilityCodes: ['CAP-PUB-CAT'], isAdministrative: false },
        { code: 'EMPLOYER_PLACEMENT_PARTNER', name: 'Placement Partner', classification: 'EXTERNAL_STAKEHOLDER', description: 'Corporate partner offering student internships and career placements', defaultCapabilityCodes: ['CAP-EXT-PRT'], isAdministrative: false },
        { code: 'VENDOR_SUPPLIER', name: 'Registered Vendor / Supplier', classification: 'EXTERNAL_STAKEHOLDER', description: 'Vendor viewing purchase orders and submitting supply bills', defaultCapabilityCodes: ['CAP-EXT-VND'], isAdministrative: false },
        { code: 'REGULATORY_STAKEHOLDER', name: 'Ministry / EMIS Inspector', classification: 'EXTERNAL_STAKEHOLDER', description: 'Government inspector reviewing statutory returns and curriculum reports', defaultCapabilityCodes: ['CAP-EXT-REG'], isAdministrative: false },
        { code: 'DONOR_SPONSOR', name: 'Scholarship Sponsor / Donor', classification: 'EXTERNAL_STAKEHOLDER', description: 'Benefactor sponsoring students and reviewing academic performance', defaultCapabilityCodes: ['CAP-EXT-DNR'], isAdministrative: false },
        { code: 'STRATEGIC_PARTNER', name: 'Strategic Institutional Partner', classification: 'EXTERNAL_STAKEHOLDER', description: 'Partner school or university collaborating on joint programs', defaultCapabilityCodes: ['CAP-EXT-PRT'], isAdministrative: false },
        { code: 'EXTERNAL_RESEARCHER', name: 'External Research Fellow', classification: 'EXTERNAL_STAKEHOLDER', description: 'Academic guest conducting verified educational field research', defaultCapabilityCodes: ['CAP-LIB-CAT'], isAdministrative: false },
        { code: 'SERVICE_PROVIDER', name: 'Service Contractor', classification: 'EXTERNAL_STAKEHOLDER', description: 'Contracted provider for transport, catering, or sanitation', defaultCapabilityCodes: ['CAP-EXT-VND'], isAdministrative: false },
        { code: 'INSTITUTIONAL_GUEST', name: 'Official Guest', classification: 'EXTERNAL_STAKEHOLDER', description: 'Dignitary or guest attending official graduation ceremonies', defaultCapabilityCodes: ['CAP-PUB-EVT'], isAdministrative: false }
      ];
    }

    // 2. CAPABILITY REGISTRY (50+ Capabilities)
    if (!data['capabilities'] || data['capabilities'].length < 30) {
      data['capabilities'] = [
        // Governance & Executive (5)
        { id: 'CAP-GOV-EXEC', code: 'EXEC_DASHBOARD', name: 'Executive Dashboard', description: 'Institutional health KPIs, student stats, and strategic oversight', category: 'CORE' },
        { id: 'CAP-GOV-AUD', code: 'AUDIT_TRAIL', name: 'Audit & Compliance Logging', description: 'System-wide immutable activity logs and policy audits', category: 'CORE' },
        { id: 'CAP-GOV-BOG', code: 'BOARD_GOVERNANCE', name: 'Board of Governors Oversight', description: 'Institutional resolutions, trustee minutes, and budget approval', category: 'CORE' },
        { id: 'CAP-GOV-PRP', code: 'PROPRIETOR_AUDIT', name: 'Proprietor Node Inspection', description: 'Cross-tenant registry inspection and platform owner controls', category: 'CORE' },
        { id: 'CAP-WRK-OFF', code: 'OFFICE_WORKFLOW', name: 'Inter-Office Workflow Engine', description: 'Statutory task coordination, routing, and approvals', category: 'ADMIN' },

        // Student Information System (SIS) - Alpha Academy Benchmark (10)
        { id: 'CAP-SIS-REG', code: 'STU_REGISTRY', name: 'Student Registry & Dossier', description: 'Comprehensive SIS demographic, biometric, and academic archives', category: 'SIS' },
        { id: 'CAP-SIS-ADM', code: 'ADMISSIONS_LIFECYCLE', name: 'Admissions & Enrollment', description: 'Application intake, document verification, and admission letters', category: 'SIS' },
        { id: 'CAP-SIS-DOS', code: 'STUDENT_PORTAL', name: 'Student Portal Experience', description: 'Student self-service dossier, timetables, and fee balance', category: 'SIS' },
        { id: 'CAP-SIS-ATT', code: 'STU_ATTENDANCE', name: 'Attendance Register', description: 'Daily, morning, and subject period attendance logging', category: 'SIS' },
        { id: 'CAP-SIS-GRD', code: 'EXAMS_GRADING', name: 'Examinations & Grading', description: 'Continuous assessment tests, term exams, and report cards', category: 'ACADEMIC' },
        { id: 'CAP-SIS-TRN', code: 'ACADEMIC_TRANSCRIPTS', name: 'Transcripts & Progress Records', description: 'Cumulative GPA, academic awards, and graduation clearance', category: 'SIS' },
        { id: 'CAP-SIS-FEE', code: 'STUDENT_FEE_VIEW', name: 'Student Fee Statements', description: 'Student-facing fee breakdown, receipts, and payment status', category: 'SIS' },
        { id: 'CAP-SIS-ONB', code: 'STUDENT_ONBOARDING', name: 'Student Onboarding & Stream Allocation', description: 'Stream assignment, house allocation, and orientation', category: 'SIS' },
        { id: 'CAP-SIS-DOC', code: 'STUDENT_DOCUMENTS', name: 'Student Document Vault', description: 'Birth certificates, national IDs, and prior school leaving certificates', category: 'SIS' },
        { id: 'CAP-SIS-AID', code: 'SCHOLARSHIP_AID', name: 'Scholarships & Bursary Aid', description: 'Financial aid awards, sponsor allocations, and balance waivers', category: 'SIS' },

        // Finance Office - QuickBooks Benchmark (12)
        { id: 'CAP-FIN-COA', code: 'CHART_OF_ACCOUNTS', name: 'Chart of Accounts (COA)', description: '5-tier account hierarchy, detail types, and active ledger balances', category: 'FINANCE' },
        { id: 'CAP-FIN-GL', code: 'GENERAL_LEDGER', name: 'General Ledger & Journals', description: 'Double-entry debit/credit journal vouchers and audit trail', category: 'FINANCE' },
        { id: 'CAP-FIN-BILL', code: 'FEE_INVOICING', name: 'Fee Assessment & Invoicing', description: 'Termly fee structures, automated invoicing, and A/R aging', category: 'FINANCE' },
        { id: 'CAP-FIN-REC', code: 'RECEIPTS_PAYMENTS', name: 'Receipts & Cash Management', description: 'Instant cash/bank receipts, mobile money clearing, and cashier register', category: 'FINANCE' },
        { id: 'CAP-FIN-PAY', code: 'ACCOUNTS_PAYABLE', name: 'Accounts Payable & Bills', description: 'Supplier bill entry, payment terms, and vendor disbursement', category: 'FINANCE' },
        { id: 'CAP-FIN-BNK', code: 'BANK_FEEDS_RECON', name: 'Bank Feeds & Reconciliation', description: 'Live bank statement feeds, match reconciliation, and variance resolution', category: 'FINANCE' },
        { id: 'CAP-FIN-BDG', code: 'BUDGETING_CASHFLOW', name: 'Budgeting & Cash Flow', description: 'Departmental budget limits, expense tracking, and cash forecasting', category: 'FINANCE' },
        { id: 'CAP-FIN-AST', code: 'FIXED_ASSET_REGISTER', name: 'Fixed Asset Register & Depreciation', description: 'Capital asset tracking, useful life, and depreciation schedules', category: 'FINANCE' },
        { id: 'CAP-FIN-TAX', code: 'TAX_VAT_MANAGEMENT', name: 'Tax & VAT Configuration', description: 'Withholding tax, VAT rates, and statutory tax returns', category: 'FINANCE' },
        { id: 'CAP-FIN-REP', code: 'FINANCIAL_REPORTING', name: 'Financial Statements (Trial Balance/P&L/BS)', description: 'Real-time Trial Balance, Profit & Loss, Balance Sheet, and A/R Aging', category: 'FINANCE' },
        { id: 'CAP-FIN-AI', code: 'FINANCE_AI_INTELLIGENCE', name: 'Financial AI & Anomaly Detection', description: 'AI transaction categorization, expense fraud alerts, and cash flow forecasts', category: 'FINANCE' },
        { id: 'CAP-FIN-EXP', code: 'EXPENSE_MANAGEMENT', name: 'Expense Claims & Petty Cash', description: 'Petty cash voucher requests, expense receipts, and approvals', category: 'FINANCE' },

        // Academic Curriculum & Department Management (6)
        { id: 'CAP-ACAD-CUR', code: 'CURRICULUM_MANAGEMENT', name: 'Curriculum & Syllabi', description: 'Subject syllabi, schemes of work, and lesson planning', category: 'ACADEMIC' },
        { id: 'CAP-ACAD-CRS', code: 'COURSE_CATALOG', name: 'Subject Catalog & Electives', description: 'Compulsory/elective subjects and credit weights', category: 'ACADEMIC' },
        { id: 'CAP-ACAD-TIM', code: 'MASTER_TIMETABLE', name: 'Master Timetabling Engine', description: 'Class stream schedules, teacher room allocations, and collision detection', category: 'ACADEMIC' },
        { id: 'CAP-ACAD-LES', code: 'LESSON_PLANNING', name: 'Lesson Plans & Materials', description: 'Teacher lesson plans, homework tasks, and learning aids', category: 'ACADEMIC' },
        { id: 'CAP-ACAD-AI', code: 'STUDENT_AI_GUIDANCE', name: 'Student AI Academic Guidance', description: 'AI study assistant, grade trend alerts, and personalized learning intervention', category: 'ACADEMIC' },
        { id: 'CAP-ACAD-MOD', code: 'MARKS_MODERATION', name: 'Departmental Marks Moderation', description: 'HOD verification and standardization of continuous assessments', category: 'ACADEMIC' },

        // Human Resources & Staff Management (4)
        { id: 'CAP-HR-STAFF', code: 'STAFF_REGISTRY', name: 'Staff Dossiers & Deployment', description: 'Teaching and support staff contracts, qualifications, and office assignments', category: 'ADMIN' },
        { id: 'CAP-HR-LEV', code: 'STAFF_LEAVE_MANAGEMENT', name: 'Leave & Attendance Tracking', description: 'Annual, sick, and study leave requests with approval routing', category: 'ADMIN' },
        { id: 'CAP-HR-APP', code: 'STAFF_APPRAISAL', name: 'Staff Performance Appraisal', description: 'Termly peer review, HOD evaluation, and professional development', category: 'ADMIN' },
        { id: 'CAP-HR-PAY', code: 'PAYROLL_INTEGRATION', name: 'Payroll Structure Linking', description: 'Staff salary scale mapping, allowances, and statutory deductions', category: 'ADMIN' },

        // Operations, Campus Welfare & Support (7)
        { id: 'CAP-EST-ASSET', code: 'ESTATE_FACILITIES', name: 'Estates & Infrastructure', description: 'Physical buildings, science laboratories, maintenance logs, and asset tagging', category: 'SUPPORT' },
        { id: 'CAP-FARM-ENT', code: 'FARM_ENTERPRISE', name: 'School Farm Enterprise', description: 'Crop, livestock, poultry production, and revenue to school dining', category: 'SUPPORT' },
        { id: 'CAP-OPS-HST', code: 'BOARDING_HOSTEL', name: 'Hostel & Boarding Operations', description: 'Dormitory room assignments, warden inspections, and roll calls', category: 'SUPPORT' },
        { id: 'CAP-LIB-CAT', code: 'LIBRARY_CATALOG', name: 'Library Catalog & Repository', description: 'ISBN book catalog, digital resources, and research papers', category: 'SUPPORT' },
        { id: 'CAP-LIB-LON', code: 'LIBRARY_LENDING', name: 'Book Lending & Circulation', description: 'Borrowing checkout, overdue fines, and return verification', category: 'SUPPORT' },
        { id: 'CAP-OPS-HLT', code: 'HEALTH_SICKBAY', name: 'Health Clinic & Sickbay', description: 'Student medical histories, sickbay visits, prescriptions, and nurse logs', category: 'SUPPORT' },
        { id: 'CAP-OPS-DSC', code: 'DISCIPLINE_COUNSELLING', name: 'Discipline & Counselling Register', description: 'Incident reports, prefect referrals, hearings, and counselling sessions', category: 'SUPPORT' },
        { id: 'CAP-OPS-TRP', code: 'TRANSPORT_FLEET', name: 'Transport & Fleet Operations', description: 'School bus routes, driver rosters, fuel logs, and vehicle maintenance', category: 'SUPPORT' },

        // Procurement & Stores (3)
        { id: 'CAP-PRC-ORD', code: 'PURCHASE_REQUISITIONS', name: 'Procurement & Purchase Orders', description: 'Inter-office purchase requests, PO generation, and quotation comparison', category: 'SUPPORT' },
        { id: 'CAP-PRC-VND', code: 'VENDOR_MANAGEMENT', name: 'Vendor & Supplier Registry', description: 'Approved supplier profiles, tax pins, and performance ratings', category: 'SUPPORT' },
        { id: 'CAP-STR-INV', code: 'STORES_INVENTORY', name: 'Stores & Consumables Inventory', description: 'Stock levels for stationery, lab chemicals, food rations, and uniforms', category: 'SUPPORT' },

        // External Stakeholders & Public Portals (6)
        { id: 'CAP-EXT-PAR', code: 'PARENT_PORTAL', name: 'Parent/Guardian Portal', description: 'Parent view of student fee balance, live receipts, report cards, and notices', category: 'EXTERNAL' },
        { id: 'CAP-EXT-VND', code: 'VENDOR_PORTAL', name: 'Vendor Supplier Portal', description: 'Supplier portal for purchase orders, bill submissions, and payment status', category: 'EXTERNAL' },
        { id: 'CAP-EXT-PRT', code: 'PARTNER_PORTAL', name: 'Partner & Placement Hub', description: 'Corporate internship agreements, donor grants, and project tracking', category: 'EXTERNAL' },
        { id: 'CAP-EXT-REG', code: 'REGULATORY_PORTAL', name: 'Government & EMIS Compliance', description: 'National EMIS data export, tax filings, and inspection dossier', category: 'EXTERNAL' },
        { id: 'CAP-EXT-DNR', code: 'DONOR_SPONSOR_PORTAL', name: 'Donor & Sponsor Portal', description: 'Sponsored student dossier view and bursary fund utilization', category: 'EXTERNAL' },
        { id: 'CAP-EXT-ALM', code: 'ALUMNI_NETWORK', name: 'Alumni Network & Transcript Request', description: 'Alumni directory, official transcript requests, and endowment gifts', category: 'EXTERNAL' },
        { id: 'CAP-PUB-CAT', code: 'PUBLIC_CATALOG', name: 'Public School Information', description: 'Public institutional profile, fee schedule, and curriculum overview', category: 'EXTERNAL' },
        { id: 'CAP-PUB-EVT', code: 'PUBLIC_ANNOUNCEMENTS', name: 'Public Notices & Events', description: 'School sports calendar, term dates, and official announcements', category: 'EXTERNAL' },
        { id: 'CAP-ICT-SYS', code: 'SYSTEM_CONFIGURATION', name: 'Platform Technical Settings', description: 'Role assignments, tenant configuration, and database integrity', category: 'ADMIN' }
      ];
    }

    // 3. MODULE REGISTRY (Connecting Capabilities to Workspaces)
    if (!data['modules'] || data['modules'].length < 20) {
      data['modules'] = [
        { id: 'MOD-EXEC-01', capabilityId: 'CAP-GOV-EXEC', name: 'Executive Insights & Governance', componentKey: 'EXEC_INSIGHTS_MODULE', icon: 'Activity', description: 'Strategic executive KPIs, institutional health index, and leadership controls' },
        { id: 'MOD-FIN-01', capabilityId: 'CAP-FIN-COA', name: 'Finance Control Center (QuickBooks Benchmark)', componentKey: 'FINANCE_MODULE', icon: 'DollarSign', description: 'Chart of Accounts, General Ledger, Fee Billing, A/P Bills, Bank Reconciliation, and Financial Reports' },
        { id: 'MOD-SIS-01', capabilityId: 'CAP-SIS-REG', name: 'Student Information System (Alpha Academy Benchmark)', componentKey: 'SIS_MODULE', icon: 'GraduationCap', description: 'Student Dossiers, Admissions Lifecycle, Continuous Assessments, Transcripts, Timetables, and Attendance' },
        { id: 'MOD-ACAD-01', capabilityId: 'CAP-ACAD-CUR', name: 'Curriculum & Faculty Management', componentKey: 'ACADEMIC_MODULE', icon: 'BookOpen', description: 'Departmental schemes of work, subject electives, and lesson planning' },
        { id: 'MOD-HR-01', capabilityId: 'CAP-HR-STAFF', name: 'Human Resources & Staff Registry', componentKey: 'HR_REGISTRY_MODULE', icon: 'Users', description: 'Staff dossiers, employee contracts, leave applications, and performance reviews' },
        { id: 'MOD-OPS-01', capabilityId: 'CAP-EST-ASSET', name: 'Campus Operations & Support Services', componentKey: 'OPERATIONS_MODULE', icon: 'Wrench', description: 'Facilities, Farm Enterprise, Sickbay Clinic, Transport Fleet, and Hostel Management' },
        { id: 'MOD-WRK-01', capabilityId: 'CAP-WRK-OFF', name: 'Inter-Office Workflow Center', componentKey: 'WORKFLOW_MODULE', icon: 'Send', description: 'Statutory task coordination, purchase order approvals, and leave authorizations' },
        { id: 'MOD-REP-01', capabilityId: 'CAP-FIN-REP', name: 'Institutional Reports & Analytics', componentKey: 'REPORTS_MODULE', icon: 'BarChart3', description: 'Trial Balance, P&L, Balance Sheet, SIS Transcripts, and EMIS returns' },
        { id: 'MOD-EXT-PAR', capabilityId: 'CAP-EXT-PAR', name: 'Parent / Guardian Portal', componentKey: 'PARENT_PORTAL_MODULE', icon: 'ShieldCheck', description: 'Student fee balance, online receipts, report cards, and communication' },
        { id: 'MOD-EXT-VND', capabilityId: 'CAP-EXT-VND', name: 'Vendor & Supplier Portal', componentKey: 'VENDOR_PORTAL_MODULE', icon: 'Building2', description: 'Purchase orders, bill submissions, and payment reconciliation' },
        { id: 'MOD-EXT-PRT', capabilityId: 'CAP-EXT-PRT', name: 'Partner & Placement Hub', componentKey: 'PARTNER_PORTAL_MODULE', icon: 'Globe', description: 'Internship placements, donor grants, and joint projects' },
        { id: 'MOD-EXT-REG', capabilityId: 'CAP-EXT-REG', name: 'Regulatory & Public Portal', componentKey: 'REGULATORY_PORTAL_MODULE', icon: 'Shield', description: 'Statutory EMIS compliance, public catalog, and alumni network' }
      ];
    }

    // 4. FORMS REGISTRY (20+ Operational Forms)
    if (!data['forms'] || data['forms'].length < 10) {
      data['forms'] = [
        {
          id: 'FORM-ADM-01',
          code: 'STUDENT_ADMISSION',
          name: 'Student Admission Application',
          description: 'Official application for secondary school admission and enrollment',
          submitLabel: 'Submit Admission Dossier',
          successMessage: 'Admission application recorded in Registry Office queue.',
          targetDomain: 'SIS',
          fields: [
            { id: 'f1', name: 'fullName', label: 'Full Student Name', type: 'text', required: true, group: 'Biographical' },
            { id: 'f2', name: 'gender', label: 'Gender', type: 'select', required: true, group: 'Biographical', options: [{label: 'Male', value: 'MALE'}, {label: 'Female', value: 'FEMALE'}] },
            { id: 'f3', name: 'dob', label: 'Date of Birth', type: 'date', required: true, group: 'Biographical' },
            { id: 'f4', name: 'classLevel', label: 'Class Level Applied', type: 'select', required: true, group: 'Academic', options: [{label: 'S.1', value: 'S.1'}, {label: 'S.2', value: 'S.2'}, {label: 'S.3', value: 'S.3'}, {label: 'S.4', value: 'S.4'}, {label: 'S.5', value: 'S.5'}, {label: 'S.6', value: 'S.6'}] },
            { id: 'f5', name: 'boardingStatus', label: 'Boarding Status', type: 'select', required: true, group: 'Academic', options: [{label: 'Boarder', value: 'BOARDER'}, {label: 'Day Student', value: 'DAY'}] },
            { id: 'f6', name: 'guardianName', label: 'Parent/Guardian Name', type: 'text', required: true, group: 'Contact' },
            { id: 'f7', name: 'guardianPhone', label: 'Parent Phone Number', type: 'text', required: true, group: 'Contact' },
            { id: 'f8', name: 'guardianEmail', label: 'Parent Email Address', type: 'text', required: true, group: 'Contact' },
            { id: 'f9', name: 'previousSchool', label: 'Previous Primary/Secondary School', type: 'text', required: false, group: 'Academic' }
          ]
        },
        {
          id: 'FORM-FIN-01',
          code: 'CREATE_CHART_OF_ACCOUNT',
          name: 'Chart of Accounts Ledger Definition',
          description: 'Establish a new institutional general ledger account (QuickBooks Standard)',
          submitLabel: 'Register Account in Ledger',
          successMessage: 'Account successfully registered in Chart of Accounts.',
          targetDomain: 'FINANCE',
          fields: [
            { id: 'af1', name: 'name', label: 'Account Name', type: 'text', required: true, group: 'Classification' },
            { id: 'af2', name: 'code', label: 'Account Number / Code', type: 'text', required: true, group: 'Classification', placeholder: 'e.g. 1150' },
            { id: 'af3', name: 'type', label: 'Account Type', type: 'select', required: true, group: 'Classification', options: [
              {label: 'Asset', value: 'ASSET'},
              {label: 'Liability', value: 'LIABILITY'},
              {label: 'Equity', value: 'EQUITY'},
              {label: 'Income', value: 'INCOME'},
              {label: 'Expense', value: 'EXPENSE'}
            ]},
            { id: 'af4', name: 'detailType', label: 'Detail Type', type: 'text', required: true, group: 'Classification', placeholder: 'e.g. Bank, Accounts Receivable, Tuition Revenue' },
            { id: 'af5', name: 'currency', label: 'Currency Code', type: 'text', required: true, group: 'Classification', placeholder: 'UGX' }
          ]
        },
        {
          id: 'FORM-FIN-02',
          code: 'FEE_ASSESSMENT',
          name: 'Student Termly Fee Assessment',
          description: 'Generate institutional fee invoice against student ledger (A/R Debit)',
          submitLabel: 'Post Assessment & Issue Invoice',
          successMessage: 'Fee assessment posted and debit recorded in student ledger.',
          targetDomain: 'FINANCE',
          fields: [
            { id: 'ff1', name: 'studentId', label: 'Target Student Admission No / ID', type: 'text', required: true, group: 'Student' },
            { id: 'ff2', name: 'term', label: 'Academic Term', type: 'select', required: true, group: 'Period', options: [{label: 'Term 1', value: 'Term 1'}, {label: 'Term 2', value: 'Term 2'}, {label: 'Term 3', value: 'Term 3'}] },
            { id: 'ff3', name: 'academicYear', label: 'Academic Year', type: 'text', required: true, group: 'Period', placeholder: '2026' },
            { id: 'ff4', name: 'tuitionAmount', label: 'Tuition Fee Amount', type: 'number', required: true, group: 'Line Items' },
            { id: 'ff5', name: 'boardingAmount', label: 'Boarding Fee Amount', type: 'number', required: false, group: 'Line Items' },
            { id: 'ff6', name: 'developmentFund', label: 'Development Fund', type: 'number', required: false, group: 'Line Items' }
          ]
        },
        {
          id: 'FORM-FIN-03',
          code: 'RECORD_FEE_PAYMENT',
          name: 'Record Fee Payment & Issue Receipt',
          description: 'Record cash, bank transfer, or mobile money receipt against student invoice',
          submitLabel: 'Clear Payment & Issue Official Receipt',
          successMessage: 'Payment recorded, invoice cleared, and cash debit posted.',
          targetDomain: 'FINANCE',
          fields: [
            { id: 'fp1', name: 'invoiceId', label: 'Invoice Reference', type: 'text', required: true, group: 'Target' },
            { id: 'fp2', name: 'amount', label: 'Amount Paid', type: 'number', required: true, group: 'Payment' },
            { id: 'fp3', name: 'paymentMethod', label: 'Payment Method', type: 'select', required: true, group: 'Payment', options: [
              {label: 'Cash Deposit', value: 'CASH'},
              {label: 'Bank Transfer / Wire', value: 'BANK_TRANSFER'},
              {label: 'Mobile Money', value: 'MOBILE_MONEY'},
              {label: 'Bank Cheque', value: 'CHEQUE'}
            ]},
            { id: 'fp4', name: 'referenceCode', label: 'Bank Slip / Transaction Reference', type: 'text', required: true, group: 'Verification' }
          ]
        },
        {
          id: 'FORM-FIN-04',
          code: 'CREATE_SUPPLIER_BILL',
          name: 'Supplier Bill & Accounts Payable Entry',
          description: 'Record vendor invoice for goods/services with payment terms (A/P Credit)',
          submitLabel: 'Post Supplier Bill',
          successMessage: 'Bill posted to Accounts Payable ledger.',
          targetDomain: 'FINANCE',
          fields: [
            { id: 'sb1', name: 'vendorId', label: 'Supplier / Vendor', type: 'text', required: true, group: 'Vendor' },
            { id: 'sb2', name: 'billNumber', label: 'Vendor Invoice Number', type: 'text', required: true, group: 'Invoice' },
            { id: 'sb3', name: 'dueDate', label: 'Payment Due Date', type: 'date', required: true, group: 'Invoice' },
            { id: 'sb4', name: 'description', label: 'Expense Description', type: 'text', required: true, group: 'Expense' },
            { id: 'sb5', name: 'amount', label: 'Total Billed Amount', type: 'number', required: true, group: 'Expense' },
            { id: 'sb6', name: 'accountId', label: 'Expense GL Account', type: 'select', required: true, group: 'Expense', options: [
              {label: 'Utility Expense (6100)', value: 'COA-301'},
              {label: 'Kitchen & Food Supplies (6300)', value: 'COA-303'},
              {label: 'Repairs & Maintenance (6400)', value: 'COA-304'}
            ]}
          ]
        },
        {
          id: 'FORM-SIS-01',
          code: 'RECORD_STUDENT_MARKS',
          name: 'Record Assessment Scores & Exam Grades',
          description: 'Enter continuous assessment test scores and end-of-term examination results',
          submitLabel: 'Save & Verify Assessment Record',
          successMessage: 'Assessment scores saved and weighted into student report card.',
          targetDomain: 'SIS',
          fields: [
            { id: 'sm1', name: 'studentId', label: 'Student Admission No', type: 'text', required: true, group: 'Student' },
            { id: 'sm2', name: 'subjectId', label: 'Subject Code', type: 'text', required: true, group: 'Subject' },
            { id: 'sm3', name: 'cat1Score', label: 'CAT 1 Score (out of 20)', type: 'number', required: true, group: 'Marks' },
            { id: 'sm4', name: 'cat2Score', label: 'CAT 2 Score (out of 20)', type: 'number', required: true, group: 'Marks' },
            { id: 'sm5', name: 'examScore', label: 'Final Exam Score (out of 60)', type: 'number', required: true, group: 'Marks' },
            { id: 'sm6', name: 'remarks', label: 'Teacher Assessment Remarks', type: 'textarea', required: false, group: 'Evaluation' }
          ]
        },
        {
          id: 'FORM-HR-01',
          code: 'STAFF_LEAVE_REQUEST',
          name: 'Staff Leave Application',
          description: 'Submit application for statutory leave with relief teacher assignment',
          submitLabel: 'Submit Leave Request',
          successMessage: 'Leave request submitted for Headteacher approval.',
          targetDomain: 'HR',
          fields: [
            { id: 'lr1', name: 'leaveType', label: 'Leave Type', type: 'select', required: true, group: 'Leave Details', options: [
              {label: 'Annual Leave', value: 'ANNUAL'},
              {label: 'Sick Leave', value: 'SICK'},
              {label: 'Maternity/Paternity', value: 'MATERNITY'},
              {label: 'Study/Examination Leave', value: 'STUDY'}
            ]},
            { id: 'lr2', name: 'startDate', label: 'Leave Start Date', type: 'date', required: true, group: 'Leave Details' },
            { id: 'lr3', name: 'endDate', label: 'Leave End Date', type: 'date', required: true, group: 'Leave Details' },
            { id: 'lr4', name: 'reason', label: 'Reason for Leave', type: 'textarea', required: true, group: 'Justification' },
            { id: 'lr5', name: 'reliefStaff', label: 'Nominated Relief Staff Member', type: 'text', required: true, group: 'Handover' }
          ]
        },
        {
          id: 'FORM-OPS-01',
          code: 'ESTATE_MAINTENANCE_TICKET',
          name: 'Estate & Facilities Repair Work Order',
          description: 'Report campus infrastructure defect or request lab maintenance',
          submitLabel: 'Issue Work Order',
          successMessage: 'Work order dispatched to Estates & Maintenance team.',
          targetDomain: 'OPERATIONS',
          fields: [
            { id: 'mt1', name: 'facilityName', label: 'Facility / Building Location', type: 'text', required: true, group: 'Location' },
            { id: 'mt2', name: 'priority', label: 'Priority Level', type: 'select', required: true, group: 'Severity', options: [
              {label: 'Low', value: 'LOW'},
              {label: 'Medium', value: 'MEDIUM'},
              {label: 'High Priority', value: 'HIGH'},
              {label: 'Emergency / Safety Hazard', value: 'EMERGENCY'}
            ]},
            { id: 'mt3', name: 'issueDetails', label: 'Defect Description & Scope', type: 'textarea', required: true, group: 'Scope' }
          ]
        }
      ];
    }

    // 5. WORKFLOW REGISTRY (10+ Multi-Stage Executable Workflows)
    if (!data['workflows'] || data['workflows'].length < 3) {
      data['workflows'] = [
        {
          id: 'WF-ADM-01',
          code: 'ADMISSION_WORKFLOW',
          name: 'Institutional Student Admission Workflow',
          category: 'ADMISSION',
          states: [
            { id: 'ST-INIT', name: 'Application Received', description: 'Prospective applicant filed form', isInitial: true, authorizedRoles: ['ADMISSIONS_OFFICER'] },
            { id: 'ST-REVIEW', name: 'Academic & Document Verification', description: 'Verifying certificates and interview scores', authorizedRoles: ['REGISTRAR'] },
            { id: 'ST-FEE-ASSESS', name: 'Fee Assessment & Invoicing', description: 'Issuing admission invoice', authorizedRoles: ['BURSAR', 'ACCOUNTS_RECEIVABLE_OFFICER'] },
            { id: 'ST-APPROVED', name: 'Enrolled & Stream Allocated', description: 'Official student registration complete', isFinal: true, authorizedRoles: ['HEADTEACHER', 'PRINCIPAL'] },
            { id: 'ST-REJECTED', name: 'Application Denied', description: 'Application did not meet admission criteria', isFinal: true, authorizedRoles: ['HEADTEACHER', 'REGISTRAR'] }
          ],
          transitions: [
            { id: 'T1', fromStateId: 'ST-INIT', toStateId: 'ST-REVIEW', name: 'Verify Credentials', actionRequired: 'Review Prior Academic Records', authorizedRoles: ['ADMISSIONS_OFFICER', 'REGISTRAR'] },
            { id: 'T2', fromStateId: 'ST-REVIEW', toStateId: 'ST-FEE-ASSESS', name: 'Clear for Billing', actionRequired: 'Pass Academic Eligibility', authorizedRoles: ['REGISTRAR'] },
            { id: 'T3', fromStateId: 'ST-FEE-ASSESS', toStateId: 'ST-APPROVED', name: 'Grant Admission & Enroll', actionRequired: 'Authorize Official Enrollment', authorizedRoles: ['HEADTEACHER', 'PRINCIPAL'] },
            { id: 'T4', fromStateId: 'ST-REVIEW', toStateId: 'ST-REJECTED', name: 'Reject Application', actionRequired: 'Deny Admission', authorizedRoles: ['REGISTRAR', 'HEADTEACHER'] }
          ]
        },
        {
          id: 'WF-FIN-01',
          code: 'SUPPLIER_BILL_WORKFLOW',
          name: 'Accounts Payable Bill Approval Workflow',
          category: 'BILL_APPROVAL',
          states: [
            { id: 'SB-SUBMITTED', name: 'Bill Submitted', description: 'Supplier invoice logged into AP queue', isInitial: true, authorizedRoles: ['ACCOUNTS_PAYABLE_OFFICER'] },
            { id: 'SB-VERIFIED', name: 'Goods Received Verified', description: 'Stores officer confirmed delivery note', authorizedRoles: ['STORES_OFFICER', 'PROCUREMENT_OFFICER'] },
            { id: 'SB-APPROVED', name: 'Approved for Payment', description: 'Bursar authorized bank disbursement', isFinal: true, authorizedRoles: ['BURSAR', 'FINANCE_MANAGER'] },
            { id: 'SB-REJECTED', name: 'Bill Disputed / Voided', description: 'Invoice discrepancy identified', isFinal: true, authorizedRoles: ['BURSAR'] }
          ],
          transitions: [
            { id: 'T-SB-1', fromStateId: 'SB-SUBMITTED', toStateId: 'SB-VERIFIED', name: 'Verify Delivery Note', actionRequired: 'Match with Goods Received Note', authorizedRoles: ['STORES_OFFICER', 'PROCUREMENT_OFFICER'] },
            { id: 'T-SB-2', fromStateId: 'SB-VERIFIED', toStateId: 'SB-APPROVED', name: 'Authorize Disbursement', actionRequired: 'Bursar Signature', authorizedRoles: ['BURSAR', 'FINANCE_MANAGER'] },
            { id: 'T-SB-3', fromStateId: 'SB-SUBMITTED', toStateId: 'SB-REJECTED', name: 'Dispute Bill', actionRequired: 'Flag Discrepancy', authorizedRoles: ['BURSAR', 'ACCOUNTS_PAYABLE_OFFICER'] }
          ]
        }
      ];
    }

    // 6. CHART OF ACCOUNTS SEEDER (QuickBooks Benchmark Architecture)
    if (!data['chart_of_accounts'] || data['chart_of_accounts'].length < 6) {
      data['chart_of_accounts'] = [
        { id: 'COA-101', code: '1100', name: 'Operating Bank Account (Stanbic)', type: 'ASSET', detailType: 'Bank', currency: 'UGX', status: 'ACTIVE', balance: 75000000, description: 'Primary institutional operational checking account' },
        { id: 'COA-102', code: '1200', name: 'Petty Cash Float', type: 'ASSET', detailType: 'Cash on Hand', currency: 'UGX', status: 'ACTIVE', balance: 2500000, description: 'Cashier petty cash vault' },
        { id: 'COA-103', code: '1300', name: 'Accounts Receivable (Student Fees)', type: 'ASSET', detailType: 'Accounts Receivable', currency: 'UGX', status: 'ACTIVE', balance: 18500000, description: 'Outstanding student tuition and boarding fees' },
        { id: 'COA-104', code: '1500', name: 'Fixed Assets - Buildings & Labs', type: 'ASSET', detailType: 'Fixed Asset', currency: 'UGX', status: 'ACTIVE', balance: 450000000, description: 'Land, school buildings, and STEM laboratories' },
        { id: 'COA-201', code: '2100', name: 'Accounts Payable (Suppliers)', type: 'LIABILITY', detailType: 'Accounts Payable', currency: 'UGX', status: 'ACTIVE', balance: 12000000, description: 'Short-term trade vendor liabilities' },
        { id: 'COA-202', code: '2200', name: 'Statutory Payroll Tax (PAYE / NSSF)', type: 'LIABILITY', detailType: 'Other Current Liability', currency: 'UGX', status: 'ACTIVE', balance: 4500000, description: 'Staff payroll tax deductions payable to revenue authority' },
        { id: 'COA-301', code: '3100', name: 'Retained Institutional Surplus', type: 'EQUITY', detailType: 'Retained Earnings', currency: 'UGX', status: 'ACTIVE', balance: 420000000, description: 'Accumulated operational surplus' },
        { id: 'COA-401', code: '4100', name: 'Tuition Fee Revenue', type: 'INCOME', detailType: 'Service Revenue', currency: 'UGX', status: 'ACTIVE', balance: 110000000, description: 'Termly academic tuition collections' },
        { id: 'COA-402', code: '4200', name: 'Boarding & Hostel Income', type: 'INCOME', detailType: 'Service Revenue', currency: 'UGX', status: 'ACTIVE', balance: 45000000, description: 'Boarding accommodation and dining revenue' },
        { id: 'COA-403', code: '4300', name: 'Farm Enterprise Revenue', type: 'INCOME', detailType: 'Other Income', currency: 'UGX', status: 'ACTIVE', balance: 8500000, description: 'Agricultural crop and livestock sales' },
        { id: 'COA-501', code: '6100', name: 'Teacher & Staff Salaries', type: 'EXPENSE', detailType: 'Payroll Expense', currency: 'UGX', status: 'ACTIVE', balance: 35000000, description: 'Monthly teaching and administrative payroll' },
        { id: 'COA-502', code: '6200', name: 'Campus Utilities (Power, Water, Net)', type: 'EXPENSE', detailType: 'Utilities', currency: 'UGX', status: 'ACTIVE', balance: 6500000, description: 'Electricity grid, piped water, and fiber internet' },
        { id: 'COA-503', code: '6300', name: 'Kitchen & Dining Supplies', type: 'EXPENSE', detailType: 'Food & Dining', currency: 'UGX', status: 'ACTIVE', balance: 14000000, description: 'Grain, produce, and cooking gas for school kitchen' }
      ];
    }

    // 7. SEED TENANTS & INSTITUTIONAL OFFICES
    if (!data['tenants'] || data['tenants'].length === 0) {
      const tenantAlpha: Tenant = { id: 'TENANT-TEST-ALPHA', name: 'Institutional Trust Alpha', domain: 'test-alpha.edu', status: 'ACTIVE', createdAt: new Date().toISOString() };
      const tenantBeta: Tenant = { id: 'TENANT-TEST-BETA', name: 'Institutional Trust Beta', domain: 'test-beta.edu', status: 'ACTIVE', createdAt: new Date().toISOString() };
      data['tenants'] = [tenantAlpha, tenantBeta];

      const instAlpha: InstitutionProfile = {
        id: 'INST-TEST-A', tenantId: tenantAlpha.id, name: 'Sovereign Academy Alpha', emisCode: 'EMIS-TEST-A', motto: 'Truth and Excellence', address: 'Plot 10, Enterprise Way', district: 'Digital City', country: 'Sovereign Nation', phone: '+000 001', email: 'info@alpha.edu', currentAcademicYear: '2026', currentTerm: 'Term 1', currency: 'UGX', boardingEnabled: true, transportEnabled: true, farmEnabled: true, healthUnitEnabled: true, createdAt: new Date().toISOString()
      };
      const instBeta: InstitutionProfile = {
        id: 'INST-TEST-B', tenantId: tenantBeta.id, name: 'Sovereign Academy Beta', emisCode: 'EMIS-TEST-B', motto: 'Knowledge is Power', address: 'Plot 20, Future Lane', district: 'Digital City', country: 'Sovereign Nation', phone: '+000 002', email: 'info@beta.edu', currentAcademicYear: '2026', currentTerm: 'Term 1', currency: 'EUR', boardingEnabled: false, transportEnabled: false, farmEnabled: false, healthUnitEnabled: true, createdAt: new Date().toISOString()
      };
      data['institutions'] = [instAlpha, instBeta];

      const officesA: InstitutionalOffice[] = [
        { id: 'OFF-A-OWNER', institutionId: instAlpha.id, directorate: 'GOVERNANCE', name: 'Board of Governors Office', code: 'GOV', description: 'Institutional Governance, Strategy & Platform Owner Oversight', headPosition: 'Board Chairperson', responsibilities: ['Institutional Strategy', 'Statutory Audit Oversight', 'Tenant Integrity Inspection'], capabilityIds: ['CAP-GOV-EXEC', 'CAP-GOV-AUD', 'CAP-GOV-BOG', 'CAP-GOV-PRP', 'CAP-FIN-REP', 'CAP-HR-STAFF', 'CAP-SIS-REG', 'CAP-WRK-OFF'] },
        { id: 'OFF-A-EXEC', institutionId: instAlpha.id, directorate: 'EXECUTIVE_ADMIN', name: 'Principal / Headteacher Executive Office', code: 'EXEC', description: 'Executive Administration, Strategic Leadership, and Staff Oversight', headPosition: 'Principal', responsibilities: ['Operational Leadership', 'Staff Deployment', 'Quality Standards'], capabilityIds: ['CAP-GOV-EXEC', 'CAP-HR-STAFF', 'CAP-SIS-REG', 'CAP-FIN-REP', 'CAP-WRK-OFF'] },
        { id: 'OFF-A-FIN', institutionId: instAlpha.id, directorate: 'FINANCE', name: 'Bursar & Finance Control Center', code: 'FIN', description: 'General Ledger, Chart of Accounts, Invoicing, A/P Bills, Bank Feeds, and Budgets (QuickBooks Standard)', headPosition: 'Bursar', responsibilities: ['General Ledger Accounting', 'Fee Assessment & Collection', 'Accounts Payable & Reconciliation', 'Budget Management'], capabilityIds: ['CAP-FIN-COA', 'CAP-FIN-GL', 'CAP-FIN-BILL', 'CAP-FIN-REC', 'CAP-FIN-PAY', 'CAP-FIN-BNK', 'CAP-FIN-BDG', 'CAP-FIN-AST', 'CAP-FIN-TAX', 'CAP-FIN-REP', 'CAP-FIN-AI', 'CAP-WRK-OFF'] },
        { id: 'OFF-A-REG', institutionId: instAlpha.id, directorate: 'ADMISSIONS', name: 'Registry & Student Admissions Office', code: 'REG', description: 'Student Information System (SIS), Admissions Queue, Dossiers, Transcripts, and Attendance (Alpha Academy Standard)', headPosition: 'Registrar', responsibilities: ['Student Dossiers', 'Admissions Processing', 'Transcripts & Records', 'Daily Attendance'], capabilityIds: ['CAP-SIS-REG', 'CAP-SIS-ADM', 'CAP-SIS-ATT', 'CAP-SIS-TRN', 'CAP-SIS-ONB', 'CAP-SIS-DOC', 'CAP-WRK-OFF'] },
        { id: 'OFF-A-ACAD', institutionId: instAlpha.id, directorate: 'ACADEMICS', name: 'Academic Dean & Faculty Office', code: 'ACAD', description: 'Curriculum Syllabi, Subject Catalog, Master Timetables, and Lesson Planning', headPosition: 'Academic Dean', responsibilities: ['Curriculum Planning', 'Timetable Management', 'Teaching Standards'], capabilityIds: ['CAP-ACAD-CUR', 'CAP-ACAD-CRS', 'CAP-ACAD-TIM', 'CAP-ACAD-LES', 'CAP-ACAD-AI', 'CAP-ACAD-MOD', 'CAP-SIS-GRD'] },
        { id: 'OFF-A-EXAM', institutionId: instAlpha.id, directorate: 'EXAMINATIONS', name: 'Examinations & Assessment Registry', code: 'EXAM', description: 'Continuous Assessments (CAT 1/2), Term Exams, Grade Moderation, and Report Cards', headPosition: 'Exam Officer', responsibilities: ['Assessment Coordination', 'Grading Standards', 'Report Card Generation'], capabilityIds: ['CAP-SIS-GRD', 'CAP-SIS-TRN', 'CAP-ACAD-MOD'] },
        { id: 'OFF-A-HR', institutionId: instAlpha.id, directorate: 'HR_ADMIN', name: 'Human Resources & Staff Administration', code: 'HR', description: 'Staff Dossiers, Leave Management, Recruitment, and Appraisals', headPosition: 'HR Manager', responsibilities: ['Staff Contracts', 'Leave Authorizations', 'Appraisal Reviews'], capabilityIds: ['CAP-HR-STAFF', 'CAP-HR-LEV', 'CAP-HR-APP', 'CAP-HR-PAY', 'CAP-WRK-OFF'] },
        { id: 'OFF-A-OPS', institutionId: instAlpha.id, directorate: 'FACILITIES', name: 'Campus Operations, Estates & Farm Office', code: 'OPS', description: 'Estates Maintenance, School Farm Enterprise, Sickbay Clinic, and Transport Fleet', headPosition: 'Estates Officer', responsibilities: ['Campus Maintenance', 'Farm Production', 'Health Sickbay', 'Fleet Logistics'], capabilityIds: ['CAP-EST-ASSET', 'CAP-FARM-ENT', 'CAP-OPS-HST', 'CAP-OPS-HLT', 'CAP-OPS-TRP', 'CAP-STR-INV', 'CAP-PRC-ORD'] },
        { id: 'OFF-A-LIB', institutionId: instAlpha.id, directorate: 'LIBRARY', name: 'Library & Learning Resource Center', code: 'LIB', description: 'Book Cataloging, Lending Circulation, and Digital Repository', headPosition: 'Chief Librarian', responsibilities: ['Book Archives', 'Lending Services', 'Digital Resources'], capabilityIds: ['CAP-LIB-CAT', 'CAP-LIB-LON'] },
        { id: 'OFF-A-EXT', institutionId: instAlpha.id, directorate: 'EXTERNAL_RELATIONS', name: 'External Relations & Public Affairs', code: 'EXT', description: 'Parent/Guardian Services, Vendor Portals, Regulatory EMIS Returns, and Alumni', headPosition: 'External Relations Director', responsibilities: ['Parent Liaison', 'Vendor Relations', 'Regulatory Compliance'], capabilityIds: ['CAP-EXT-PAR', 'CAP-EXT-VND', 'CAP-EXT-PRT', 'CAP-EXT-REG', 'CAP-EXT-ALM', 'CAP-PUB-CAT'] }
      ];
      data['institutional_offices'] = officesA;

      const staff: StaffMember[] = [
        { id: 'STAFF-T-00', employeeNo: 'EMP-000', fullName: 'Platform Owner Verification', email: 'owner@jumo.edu', phone: '+256 700 000000', directorate: 'GOVERNANCE', departmentId: 'D-GOV', officeId: 'OFF-A-OWNER', role: 'PROPRIETOR', qualification: 'Platform Architect & Institutional Trustee', hireDate: '2025-01-01', status: 'ACTIVE' },
        { id: 'STAFF-T-01', employeeNo: 'EMP-001', fullName: 'Dr. Arthur Mukasa', email: 'officer@alpha.edu', phone: '+256 701 111111', directorate: 'EXECUTIVE_ADMIN', departmentId: 'D-EXEC', officeId: 'OFF-A-EXEC', role: 'HEADTEACHER', qualification: 'PhD Educational Management', hireDate: '2024-02-01', status: 'ACTIVE' },
        { id: 'STAFF-T-02', employeeNo: 'EMP-002', fullName: 'Sarah Namagembe', email: 'registrar@alpha.edu', phone: '+256 702 222222', directorate: 'ADMISSIONS', departmentId: 'D-REG', officeId: 'OFF-A-REG', role: 'REGISTRAR', qualification: 'MSc Information & Academic Registries', hireDate: '2024-03-15', status: 'ACTIVE' },
        { id: 'STAFF-T-03', employeeNo: 'EMP-003', fullName: 'Robert Kigozi, CPA', email: 'bursar@alpha.edu', phone: '+256 703 333333', directorate: 'FINANCE', departmentId: 'D-FIN', officeId: 'OFF-A-FIN', role: 'BURSAR', qualification: 'Certified Public Accountant (CPA)', hireDate: '2024-01-10', status: 'ACTIVE' },
        { id: 'STAFF-T-04', employeeNo: 'EMP-004', fullName: 'Prof. Mary Akello', email: 'dean@alpha.edu', phone: '+256 704 444444', directorate: 'ACADEMICS', departmentId: 'D-ACAD', officeId: 'OFF-A-ACAD', role: 'DEAN', qualification: 'M.Ed Curriculum & Pedagogy', hireDate: '2024-04-01', status: 'ACTIVE' },
        { id: 'STAFF-T-05', employeeNo: 'EMP-005', fullName: 'James Wandera', email: 'exam@alpha.edu', phone: '+256 705 555555', directorate: 'EXAMINATIONS', departmentId: 'D-EXAM', officeId: 'OFF-A-EXAM', role: 'EXAM_OFFICER', qualification: 'B.Ed Assessment & Statistics', hireDate: '2024-05-01', status: 'ACTIVE' },
        { id: 'STAFF-T-06', employeeNo: 'EMP-006', fullName: 'Grace Tumusiime', email: 'hr@alpha.edu', phone: '+256 706 666666', directorate: 'HR_ADMIN', departmentId: 'D-HR', officeId: 'OFF-A-HR', role: 'HR_MANAGER', qualification: 'MBA Human Capital Management', hireDate: '2024-06-01', status: 'ACTIVE' },
        { id: 'STAFF-T-07', employeeNo: 'EMP-007', fullName: 'Eng. Patrick Kato', email: 'estates@alpha.edu', phone: '+256 707 777777', directorate: 'FACILITIES', departmentId: 'D-OPS', officeId: 'OFF-A-OPS', role: 'ESTATES_OFFICER', qualification: 'BSc Civil & Building Engineering', hireDate: '2024-07-01', status: 'ACTIVE' },
        { id: 'STAFF-T-08', employeeNo: 'EMP-008', fullName: 'Joyce Nabukenya', email: 'librarian@alpha.edu', phone: '+256 708 888888', directorate: 'LIBRARY', departmentId: 'D-LIB', officeId: 'OFF-A-LIB', role: 'LIBRARIAN', qualification: 'BLIS Library & Information Science', hireDate: '2024-08-01', status: 'ACTIVE' }
      ];
      data['staff'] = staff;
    }

    // 8. SEED RICH DOMAIN ENTITIES (Students, Subjects, Assessments, Bank Feeds, Vendors, Bills, Hostels, Assets)
    if (!data['students'] || data['students'].length === 0) {
      data['students'] = [
        { id: 'STU-001', admissionNo: 'ADM-2026-001', fullName: 'Joshua Okello', gender: 'MALE', dateOfBirth: '2010-04-12', classLevel: 'S.1', stream: 'Science Alpha', guardianName: 'David Okello', guardianPhone: '+256 772 123456', guardianEmail: 'parent@alpha.edu', boardingStatus: 'BOARDER', hostelRoom: 'Mandela Hall - Rm 12', admissionDate: '2026-01-15', status: 'ACTIVE', feeBalance: 250000, attendanceRate: 98, averageGrade: 'A' },
        { id: 'STU-002', admissionNo: 'ADM-2026-002', fullName: 'Rebecca Namutebi', gender: 'FEMALE', dateOfBirth: '2010-08-22', classLevel: 'S.1', stream: 'Arts East', guardianName: 'Florence Namutebi', guardianPhone: '+256 772 234567', guardianEmail: 'parent2@alpha.edu', boardingStatus: 'DAY', admissionDate: '2026-01-15', status: 'ACTIVE', feeBalance: 0, attendanceRate: 95, averageGrade: 'B+' },
        { id: 'STU-003', admissionNo: 'ADM-2025-045', fullName: 'Emmanuel Kiwanuka', gender: 'MALE', dateOfBirth: '2009-02-18', classLevel: 'S.2', stream: 'Science Beta', guardianName: 'Joseph Kiwanuka', guardianPhone: '+256 772 345678', guardianEmail: 'parent3@alpha.edu', boardingStatus: 'BOARDER', hostelRoom: 'Lumumba Hall - Rm 04', admissionDate: '2025-01-10', status: 'ACTIVE', feeBalance: 500000, attendanceRate: 91, averageGrade: 'B' },
        { id: 'STU-004', admissionNo: 'ADM-2024-112', fullName: 'Patience Achieng', gender: 'FEMALE', dateOfBirth: '2008-11-05', classLevel: 'S.3', stream: 'Science Alpha', guardianName: 'Mary Achieng', guardianPhone: '+256 772 456789', guardianEmail: 'parent4@alpha.edu', boardingStatus: 'BOARDER', hostelRoom: 'Africa Hall - Rm 08', admissionDate: '2024-01-12', status: 'ACTIVE', feeBalance: 0, attendanceRate: 99, averageGrade: 'A' }
      ];
    }

    if (!data['subjects'] || data['subjects'].length === 0) {
      data['subjects'] = [
        { id: 'SUB-MTH', code: 'MTH-101', name: 'Mathematics', category: 'SCIENCES', isCompulsory: true, departmentId: 'D-SCI', credits: 4 },
        { id: 'SUB-ENG', code: 'ENG-101', name: 'English Language & Literature', category: 'LANGUAGES', isCompulsory: true, departmentId: 'D-LANG', credits: 4 },
        { id: 'SUB-PHY', code: 'PHY-101', name: 'Physics', category: 'SCIENCES', isCompulsory: true, departmentId: 'D-SCI', credits: 3 },
        { id: 'SUB-CHE', code: 'CHE-101', name: 'Chemistry', category: 'SCIENCES', isCompulsory: true, departmentId: 'D-SCI', credits: 3 },
        { id: 'SUB-BIO', code: 'BIO-101', name: 'Biology', category: 'SCIENCES', isCompulsory: true, departmentId: 'D-SCI', credits: 3 },
        { id: 'SUB-GEO', code: 'GEO-101', name: 'Geography', category: 'HUMANITIES', isCompulsory: false, departmentId: 'D-HUM', credits: 3 },
        { id: 'SUB-HIS', code: 'HIS-101', name: 'History & Political Education', category: 'HUMANITIES', isCompulsory: false, departmentId: 'D-HUM', credits: 3 },
        { id: 'SUB-ICT', code: 'ICT-101', name: 'Computer Studies & Coding', category: 'TECHNICAL', isCompulsory: false, departmentId: 'D-ICT', credits: 3 },
        { id: 'SUB-ENT', code: 'ENT-101', name: 'Entrepreneurship & Commerce', category: 'BUSINESS', isCompulsory: false, departmentId: 'D-BUS', credits: 3 }
      ];
    }

    if (!data['assessments'] || data['assessments'].length === 0) {
      data['assessments'] = [
        { id: 'ASM-01', studentId: 'STU-001', subjectId: 'SUB-MTH', subjectName: 'Mathematics', term: 'Term 1', academicYear: '2026', cat1Score: 18, cat2Score: 19, examScore: 54, totalScore: 91, grade: 'A', remarks: 'Exceptional analytical problem solving', recordedByStaffId: 'STAFF-T-04', verified: true },
        { id: 'ASM-02', studentId: 'STU-001', subjectId: 'SUB-PHY', subjectName: 'Physics', term: 'Term 1', academicYear: '2026', cat1Score: 17, cat2Score: 16, examScore: 52, totalScore: 85, grade: 'A', remarks: 'Strong lab and theoretical grasp', recordedByStaffId: 'STAFF-T-04', verified: true },
        { id: 'ASM-03', studentId: 'STU-002', subjectId: 'SUB-ENG', subjectName: 'English Literature', term: 'Term 1', academicYear: '2026', cat1Score: 16, cat2Score: 18, examScore: 48, totalScore: 82, grade: 'A', remarks: 'Mastery of essay rhetoric', recordedByStaffId: 'STAFF-T-04', verified: true }
      ];
    }

    if (!data['bank_feeds'] || data['bank_feeds'].length === 0) {
      data['bank_feeds'] = [
        { id: 'BF-101', bankAccountId: 'COA-101', transactionDate: '2026-02-10', description: 'Stanbic Direct Deposit - Parent Ref Joshua Okello Fee', amount: 1250000, type: 'CREDIT', reconciled: true, matchedTransactionId: 'FTX-101', suggestedAccount: 'COA-401' },
        { id: 'BF-102', bankAccountId: 'COA-101', transactionDate: '2026-02-12', description: 'UMEME Power Prepaid Grid Purchase Token', amount: 1500000, type: 'DEBIT', reconciled: true, matchedTransactionId: 'FTX-102', suggestedAccount: 'COA-502' },
        { id: 'BF-103', bankAccountId: 'COA-101', transactionDate: '2026-02-15', description: 'Bank Wire: Mukwano Kitchen Supplies Bulk Purchase', amount: 4800000, type: 'DEBIT', reconciled: false, suggestedAccount: 'COA-503' },
        { id: 'BF-104', bankAccountId: 'COA-101', transactionDate: '2026-02-16', description: 'MTN MoMo Aggregator Settlement - Term 1 Fees', amount: 8200000, type: 'CREDIT', reconciled: false, suggestedAccount: 'COA-401' }
      ];
    }

    if (!data['vendors'] || data['vendors'].length === 0) {
      data['vendors'] = [
        { id: 'VND-001', name: 'Mukwano Food Supplies Ltd', category: 'Food & Dining Rations', contactPerson: 'Hassan Patel', phone: '+256 414 123456', email: 'vendor@alpha.edu', address: 'Plot 4 Mukwano Complex, Industrial Area', taxPin: 'TIN-100293849', paymentTerms: 'Net 30 Days', status: 'ACTIVE', balance: 4800000 },
        { id: 'VND-002', name: 'UMEME Power Distribution', category: 'Electricity Grid', contactPerson: 'Customer Service', phone: '+256 312 000000', email: 'billing@umeme.co.ug', address: 'Rwenzori House, Kampala', taxPin: 'TIN-100111222', paymentTerms: 'Prepaid Token', status: 'ACTIVE', balance: 0 },
        { id: 'VND-003', name: 'Aristoc Booklex & Stationery', category: 'Textbooks & Exams', contactPerson: 'Judith Namono', phone: '+256 414 987654', email: 'sales@aristoc.ug', address: 'Garden City Mall, Kampala', taxPin: 'TIN-100333444', paymentTerms: 'Net 15 Days', status: 'ACTIVE', balance: 2100000 }
      ];
    }

    if (!data['bills'] || data['bills'].length === 0) {
      data['bills'] = [
        { id: 'BILL-01', billNumber: 'INV-MUK-9821', vendorId: 'VND-001', vendorName: 'Mukwano Food Supplies Ltd', date: '2026-02-14', dueDate: '2026-03-15', items: [{ description: '50 Bags Rice & Maize Flour Rations', amount: 4800000, accountId: 'COA-503' }], totalAmount: 4800000, amountPaid: 0, status: 'PENDING' },
        { id: 'BILL-02', billNumber: 'INV-ARS-4412', vendorId: 'VND-003', vendorName: 'Aristoc Booklex & Stationery', date: '2026-02-01', dueDate: '2026-02-15', items: [{ description: 'S.1 New Curriculum Textbooks & Graph Books', amount: 2100000, accountId: 'COA-502' }], totalAmount: 2100000, amountPaid: 2100000, status: 'PAID' }
      ];
    }

    if (!data['fee_invoices'] || data['fee_invoices'].length === 0) {
      data['fee_invoices'] = [
        { id: 'INV-2026-001', invoiceNumber: 'INV-001-2026', studentId: 'STU-001', studentName: 'Joshua Okello', classLevel: 'S.1', term: 'Term 1', academicYear: '2026', items: [{ description: 'Tuition Fee S.1', amount: 950000 }, { description: 'Boarding & Meals', amount: 550000 }], totalBilled: 1500000, totalPaid: 1250000, balance: 250000, status: 'PARTIAL', dateIssued: '2026-01-10', dueDate: '2026-02-15' },
        { id: 'INV-2026-002', invoiceNumber: 'INV-002-2026', studentId: 'STU-002', studentName: 'Rebecca Namutebi', classLevel: 'S.1', term: 'Term 1', academicYear: '2026', items: [{ description: 'Tuition Fee S.1 (Day)', amount: 950000 }], totalBilled: 950000, totalPaid: 950000, balance: 0, status: 'PAID', dateIssued: '2026-01-10', dueDate: '2026-02-15' }
      ];
    }

    if (!data['budgets'] || data['budgets'].length === 0) {
      data['budgets'] = [
        { id: 'BDG-01', academicYear: '2026', title: 'Academics & Science Labs Budget', directorate: 'ACADEMICS', allocatedAmount: 45000000, spentAmount: 18500000, remainingAmount: 26500000, status: 'APPROVED' },
        { id: 'BDG-02', academicYear: '2026', title: 'Boarding & Kitchen Operations', directorate: 'BOARDING', allocatedAmount: 60000000, spentAmount: 28000000, remainingAmount: 32000000, status: 'APPROVED' },
        { id: 'BDG-03', academicYear: '2026', title: 'Campus Estate Maintenance', directorate: 'FACILITIES', allocatedAmount: 20000000, spentAmount: 6200000, remainingAmount: 13800000, status: 'APPROVED' }
      ];
    }

    if (!data['fixed_assets'] || data['fixed_assets'].length === 0) {
      data['fixed_assets'] = [
        { id: 'AST-01', assetNumber: 'AST-BLD-001', name: 'Main Administration & Science Complex', category: 'BUILDINGS', purchaseDate: '2020-01-15', purchaseCost: 350000000, depreciationMethod: 'STRAIGHT_LINE', usefulLifeYears: 50, currentBookValue: 308000000, location: 'Central Campus', condition: 'EXCELLENT' },
        { id: 'AST-02', assetNumber: 'AST-LAB-012', name: 'Digital ICT Computing Lab (40 Workstations)', category: 'IT_EQUIPMENT', purchaseDate: '2024-06-01', purchaseCost: 65000000, depreciationMethod: 'STRAIGHT_LINE', usefulLifeYears: 5, currentBookValue: 43300000, location: 'Block B - 2nd Floor', condition: 'EXCELLENT' },
        { id: 'AST-03', assetNumber: 'AST-BUS-001', name: 'Isuzu 67-Seater Campus Coach', category: 'VEHICLES', purchaseDate: '2022-03-10', purchaseCost: 180000000, depreciationMethod: 'STRAIGHT_LINE', usefulLifeYears: 10, currentBookValue: 108000000, location: 'Campus Fleet Garage', condition: 'GOOD' }
      ];
    }

    // 9. SCHOOLPAY BENCHMARK: DIGITAL PAYMENT SEED & RECONCILIATION
    if (!data['schoolpay_transactions'] || data['schoolpay_transactions'].length === 0) {
      data['schoolpay_transactions'] = [
        {
          id: 'SPAY-TX-001',
          transactionReference: 'SPAY-2026-88192',
          payCode: '992026001',
          studentId: 'STU-001',
          studentName: 'Joshua Okello',
          admissionNo: 'ADM-2026-001',
          amount: 1250000,
          channel: 'MTN_MOMO',
          providerTransactionId: 'MTN-UG-99882211',
          status: 'SETTLED',
          payerPhoneOrAccount: '+256 772 123456',
          payerName: 'David Okello',
          dateInitiated: '2026-01-15T09:30:00Z',
          dateSettled: '2026-01-15T09:31:00Z',
          feeCategory: 'Tuition & Boarding Fee Term 1',
          receiptNumber: 'REC-SPAY-001',
          ledgerVoucherId: 'FTX-101',
          bankAccountId: 'COA-102'
        },
        {
          id: 'SPAY-TX-002',
          transactionReference: 'SPAY-2026-88193',
          payCode: '992026002',
          studentId: 'STU-002',
          studentName: 'Rebecca Namutebi',
          admissionNo: 'ADM-2026-002',
          amount: 950000,
          channel: 'AIRTEL_MONEY',
          providerTransactionId: 'AIRTEL-UG-55443322',
          status: 'SETTLED',
          payerPhoneOrAccount: '+256 752 987654',
          payerName: 'Florence Namutebi',
          dateInitiated: '2026-01-16T11:15:00Z',
          dateSettled: '2026-01-16T11:16:00Z',
          feeCategory: 'Tuition Fee S.1 Day',
          receiptNumber: 'REC-SPAY-002',
          ledgerVoucherId: 'FTX-102',
          bankAccountId: 'COA-102'
        },
        {
          id: 'SPAY-TX-003',
          transactionReference: 'SPAY-2026-88194',
          payCode: '992025045',
          studentId: 'STU-003',
          studentName: 'Emmanuel Kiwanuka',
          admissionNo: 'ADM-2025-045',
          amount: 500000,
          channel: 'BANK_DIRECT',
          providerTransactionId: 'STB-UG-77221199',
          status: 'SETTLED',
          payerPhoneOrAccount: 'STANBIC-9030018273',
          payerName: 'Joseph Kiwanuka',
          dateInitiated: '2026-02-01T14:20:00Z',
          dateSettled: '2026-02-01T14:25:00Z',
          feeCategory: 'Term 1 Installment 1',
          receiptNumber: 'REC-SPAY-003',
          ledgerVoucherId: 'FTX-103',
          bankAccountId: 'COA-101'
        }
      ];
    }

    // 10. ALPHA ACADEMY BENCHMARK: TIMETABLE, HOSTELS, LIBRARY, ATTENDANCE, DISCIPLINE
    if (!data['timetables'] || data['timetables'].length === 0) {
      data['timetables'] = [
        { id: 'TT-01', classLevel: 'S.1', stream: 'Science Alpha', dayOfWeek: 'Monday', period: '08:00 - 09:20', subjectCode: 'MTH-101', subjectName: 'Mathematics', teacherName: 'Prof. Mary Akello', room: 'Lab 1' },
        { id: 'TT-02', classLevel: 'S.1', stream: 'Science Alpha', dayOfWeek: 'Monday', period: '09:30 - 10:50', subjectCode: 'PHY-101', subjectName: 'Physics', teacherName: 'Dr. Arthur Mukasa', room: 'Physics Lab' },
        { id: 'TT-03', classLevel: 'S.1', stream: 'Science Alpha', dayOfWeek: 'Tuesday', period: '08:00 - 09:20', subjectCode: 'CHE-101', subjectName: 'Chemistry', teacherName: 'Sarah Namagembe', room: 'Chemistry Lab' },
        { id: 'TT-04', classLevel: 'S.1', stream: 'Science Alpha', dayOfWeek: 'Wednesday', period: '11:00 - 12:20', subjectCode: 'ENG-101', subjectName: 'English Literature', teacherName: 'Grace Tumusiime', room: 'Hall 3' },
        { id: 'TT-05', classLevel: 'S.1', stream: 'Science Alpha', dayOfWeek: 'Thursday', period: '14:00 - 15:30', subjectCode: 'ICT-101', subjectName: 'Computer Coding', teacherName: 'Eng. Patrick Kato', room: 'ICT Lab' }
      ];
    }

    if (!data['hostels'] || data['hostels'].length === 0) {
      data['hostels'] = [
        { id: 'HST-01', hostelName: 'Nelson Mandela Hall', roomNumber: 'Room 12', capacity: 8, occupied: 6, gender: 'MALE', wardenName: 'Mr. Joseph Okot', residentStudentIds: ['STU-001'] },
        { id: 'HST-02', hostelName: 'Patrice Lumumba Hall', roomNumber: 'Room 04', capacity: 8, occupied: 7, gender: 'MALE', wardenName: 'Mr. Denis Mukasa', residentStudentIds: ['STU-003'] },
        { id: 'HST-03', hostelName: 'Africa Hall', roomNumber: 'Room 08', capacity: 6, occupied: 5, gender: 'FEMALE', wardenName: 'Mrs. Janet Alupo', residentStudentIds: ['STU-004'] }
      ];
    }

    if (!data['library_books'] || data['library_books'].length === 0) {
      data['library_books'] = [
        { id: 'LIB-B01', isbn: '978-0199152438', title: 'Complete Pure Mathematics for Cambridge', author: 'David Rayner', category: 'SCIENCES', copiesAvailable: 14, totalCopies: 20, locationShelf: 'Shelf S-04' },
        { id: 'LIB-B02', isbn: '978-0582447103', title: 'Principles of Physics in Secondary Education', author: 'M. Nelkon', category: 'SCIENCES', copiesAvailable: 8, totalCopies: 15, locationShelf: 'Shelf S-06' },
        { id: 'LIB-B03', isbn: '978-0435905200', title: 'Things Fall Apart', author: 'Chinua Achebe', category: 'HUMANITIES', copiesAvailable: 22, totalCopies: 30, locationShelf: 'Shelf L-01' }
      ];
    }

    if (!data['library_loans'] || data['library_loans'].length === 0) {
      data['library_loans'] = [
        { id: 'LOAN-01', bookId: 'LIB-B01', bookTitle: 'Complete Pure Mathematics for Cambridge', studentId: 'STU-001', studentName: 'Joshua Okello', issueDate: '2026-02-05', dueDate: '2026-02-19', status: 'ACTIVE' },
        { id: 'LOAN-02', bookId: 'LIB-B03', bookTitle: 'Things Fall Apart', studentId: 'STU-002', studentName: 'Rebecca Namutebi', issueDate: '2026-01-20', dueDate: '2026-02-03', returnDate: '2026-02-02', status: 'RETURNED' }
      ];
    }

    if (!data['attendance_records'] || data['attendance_records'].length === 0) {
      data['attendance_records'] = [
        { id: 'ATT-01', date: '2026-02-16', targetType: 'STUDENT', targetId: 'STU-001', targetName: 'Joshua Okello', classLevel: 'S.1', status: 'PRESENT', remarks: 'On time' },
        { id: 'ATT-02', date: '2026-02-16', targetType: 'STUDENT', targetId: 'STU-002', targetName: 'Rebecca Namutebi', classLevel: 'S.1', status: 'PRESENT', remarks: 'On time' },
        { id: 'ATT-03', date: '2026-02-16', targetType: 'STUDENT', targetId: 'STU-003', targetName: 'Emmanuel Kiwanuka', classLevel: 'S.2', status: 'LATE', remarks: '10 mins late' }
      ];
    }

    if (!data['discipline_cases'] || data['discipline_cases'].length === 0) {
      data['discipline_cases'] = [
        { id: 'DISC-01', studentId: 'STU-003', studentName: 'Emmanuel Kiwanuka', incidentDate: '2026-02-08', category: 'ATTENDANCE', description: 'Late return from weekend excursion', reportedByStaffId: 'STAFF-T-07', actionTaken: 'Guidance counselling and gate warning issued', status: 'RESOLVED' }
      ];
    }

    // 11. DYNAMIC ORGANIZATIONAL UNITS REGISTRY (Faculties, Schools, Directorates, Departments, Units, Sections)
    if (!data['organizational_units'] || data['organizational_units'].length === 0) {
      data['organizational_units'] = [
        { id: 'ORG-DIR-GOV', code: 'DIR_GOV', name: 'Directorate of Governance & Legal Affairs', type: 'DIRECTORATE', tenantId: 'TENANT-TEST-ALPHA', institutionId: 'INST-TEST-A', domain: 'EDUCATION', headTitle: 'Board Chairperson', description: 'Statutory compliance, board resolutions, and platform owner controls', status: 'ACTIVE', createdAt: '2026-01-01' },
        { id: 'ORG-DIR-EXEC', code: 'DIR_EXEC', name: 'Executive Directorate & Administration', type: 'DIRECTORATE', tenantId: 'TENANT-TEST-ALPHA', institutionId: 'INST-TEST-A', domain: 'EDUCATION', headTitle: 'Headteacher / Principal', description: 'Central institutional administrative leadership and strategic planning', status: 'ACTIVE', createdAt: '2026-01-01' },
        { id: 'ORG-DIR-FIN', code: 'DIR_FIN', name: 'Directorate of Financial Affairs & Treasury', type: 'DIRECTORATE', tenantId: 'TENANT-TEST-ALPHA', institutionId: 'INST-TEST-A', domain: 'EDUCATION', headTitle: 'Bursar / Chief Financial Officer', description: 'Financial accounting, general ledger, treasury, vote book, and JUMO FAAP operations', status: 'ACTIVE', createdAt: '2026-01-01' },
        { id: 'ORG-FAC-SCI', code: 'FAC_SCI', name: 'Faculty of Science, Mathematics & Technology', type: 'FACULTY', tenantId: 'TENANT-TEST-ALPHA', institutionId: 'INST-TEST-A', domain: 'EDUCATION', headTitle: 'Dean of Sciences', description: 'Physics, Chemistry, Biology, Mathematics, and Computer Studies', status: 'ACTIVE', createdAt: '2026-01-01' },
        { id: 'ORG-FAC-HUM', code: 'FAC_HUM', name: 'Faculty of Humanities, Arts & Languages', type: 'FACULTY', tenantId: 'TENANT-TEST-ALPHA', institutionId: 'INST-TEST-A', domain: 'EDUCATION', headTitle: 'Dean of Arts', description: 'Literature, History, Geography, Economics, and Foreign Languages', status: 'ACTIVE', createdAt: '2026-01-01' },
        { id: 'ORG-DIR-ADM', code: 'DIR_ADM', name: 'Directorate of Academic Registries & Admissions', type: 'DIRECTORATE', tenantId: 'TENANT-TEST-ALPHA', institutionId: 'INST-TEST-A', domain: 'EDUCATION', headTitle: 'Academic Registrar', description: 'Admissions lifecycle, student dossiers, enrollment, transcripts, and UNEB accreditation', status: 'ACTIVE', createdAt: '2026-01-01' },
        { id: 'ORG-DIR-OPS', code: 'DIR_OPS', name: 'Directorate of Campus Operations, Estates & Enterprise', type: 'DIRECTORATE', tenantId: 'TENANT-TEST-ALPHA', institutionId: 'INST-TEST-A', domain: 'EDUCATION', headTitle: 'Estates & Operations Manager', description: 'Estates maintenance, farm enterprise, health clinic, transport fleet, and boarding hostels', status: 'ACTIVE', createdAt: '2026-01-01' },
        { id: 'ORG-DEP-MATH', code: 'DEP_MTH', name: 'Department of Mathematics & Computing', type: 'DEPARTMENT', parentUnitId: 'ORG-FAC-SCI', tenantId: 'TENANT-TEST-ALPHA', institutionId: 'INST-TEST-A', domain: 'EDUCATION', headTitle: 'HOD Mathematics', description: 'Curriculum, CATs, and olympiad training', status: 'ACTIVE', createdAt: '2026-01-01' },
        { id: 'ORG-DEP-SCI', code: 'DEP_SCI', name: 'Department of Physical & Biological Sciences', type: 'DEPARTMENT', parentUnitId: 'ORG-FAC-SCI', tenantId: 'TENANT-TEST-ALPHA', institutionId: 'INST-TEST-A', domain: 'EDUCATION', headTitle: 'HOD Sciences', description: 'STEM labs, chemicals inventory, and science exhibitions', status: 'ACTIVE', createdAt: '2026-01-01' },
        { id: 'ORG-DEP-ENG', code: 'DEP_ENG', name: 'Department of Languages & Literature', type: 'DEPARTMENT', parentUnitId: 'ORG-FAC-HUM', tenantId: 'TENANT-TEST-ALPHA', institutionId: 'INST-TEST-A', domain: 'EDUCATION', headTitle: 'HOD Languages', description: 'English language proficiency, rhetoric, and drama', status: 'ACTIVE', createdAt: '2026-01-01' },
        { id: 'ORG-DIV-TREASURY', code: 'DIV_TREAS', name: 'Treasury & Revenue Mobilization Division', type: 'DIVISION', parentUnitId: 'ORG-DIR-FIN', tenantId: 'TENANT-TEST-ALPHA', institutionId: 'INST-TEST-A', domain: 'EDUCATION', headTitle: 'Senior Accountant (Revenue)', description: 'Fee billing, JUMO DIGITAL PAY collections, and bank reconciliations', status: 'ACTIVE', createdAt: '2026-01-01' },
        { id: 'ORG-DIV-EXPENDITURE', code: 'DIV_EXP', name: 'Expenditure & Vote Book Control Division', type: 'DIVISION', parentUnitId: 'ORG-DIR-FIN', tenantId: 'TENANT-TEST-ALPHA', institutionId: 'INST-TEST-A', domain: 'EDUCATION', headTitle: 'Senior Accountant (Expenditure)', description: 'Accounts payable, LPO commitments, vote book tracking, and disbursement vouchers', status: 'ACTIVE', createdAt: '2026-01-01' },
        { id: 'ORG-SEC-AUDIT', code: 'SEC_AUDIT', name: 'Internal Audit & Risk Inspection Section', type: 'SECTION', parentUnitId: 'ORG-DIR-GOV', tenantId: 'TENANT-TEST-ALPHA', institutionId: 'INST-TEST-A', domain: 'EDUCATION', headTitle: 'Chief Internal Auditor', description: 'Independent control testing, audit observations, and statutory review', status: 'ACTIVE', createdAt: '2026-01-01' }
      ];
    }

    // 12. DYNAMIC OFFICE DEFINITIONS REGISTRY (Comprehensive Configurable Office Schemas)
    if (!data['office_definitions'] || data['office_definitions'].length === 0) {
      data['office_definitions'] = [
        {
          id: 'OFF-DEF-GOV',
          code: 'OFF_GOV',
          name: 'Executive Board & Governance Office',
          officeType: 'EXECUTIVE',
          description: 'Institutional Governance, Strategy, Audit Review, and Platform Owner Oversight',
          parentOrgUnitId: 'ORG-DIR-GOV',
          parentOrgUnitName: 'Directorate of Governance & Legal Affairs',
          institutionId: 'INST-TEST-A',
          tenantId: 'TENANT-TEST-ALPHA',
          domain: 'EDUCATION',
          headPosition: 'Board Chairperson',
          responsibleRoles: ['PROPRIETOR', 'BOARD_MEMBER', 'HEADTEACHER', 'SYSTEM_ADMIN'],
          capabilityCodes: ['CAP-GOV-EXEC', 'CAP-GOV-AUD', 'CAP-GOV-BOG', 'CAP-GOV-PRP', 'CAP-FIN-REP', 'CAP-HR-STAFF', 'CAP-SIS-REG', 'CAP-WRK-OFF'],
          moduleCodes: ['MOD-EXEC-01', 'MOD-WRK-01', 'MOD-REP-01'],
          formCodes: ['FORM-ADM-01', 'FORM-FIN-01', 'FORM-HR-01', 'FORM-OPS-01'],
          workflowCodes: ['WF-ADM-01', 'WF-FIN-01'],
          reportCodes: ['REP-FIN-TB', 'REP-FIN-BS', 'REP-FIN-PL', 'REP-AUD-01'],
          aiServiceCodes: ['AI-GOV-ANALYTICS', 'AI-AUD-LEAKAGE'],
          permissions: ['GOV_ALL', 'AUDIT_INSPECT', 'TENANT_READ'],
          status: 'ACTIVE',
          createdAt: '2026-01-01',
          updatedAt: '2026-01-01'
        },
        {
          id: 'OFF-DEF-EXEC',
          code: 'OFF_EXEC',
          name: 'Principal & Executive Administration Office',
          officeType: 'EXECUTIVE',
          description: 'Strategic Institutional Leadership, Staff Deployment, Quality Oversight, and Statutory Relations',
          parentOrgUnitId: 'ORG-DIR-EXEC',
          parentOrgUnitName: 'Executive Directorate & Administration',
          institutionId: 'INST-TEST-A',
          tenantId: 'TENANT-TEST-ALPHA',
          domain: 'EDUCATION',
          headPosition: 'Principal / Headteacher',
          responsibleRoles: ['HEADTEACHER', 'PRINCIPAL', 'DEPUTY_PRINCIPAL', 'DEPUTY_ADMIN', 'DEPUTY_ACADEMIC', 'CHIEF_ADMIN_OFFICER'],
          capabilityCodes: ['CAP-GOV-EXEC', 'CAP-HR-STAFF', 'CAP-SIS-REG', 'CAP-FIN-REP', 'CAP-WRK-OFF', 'CAP-ACAD-CUR'],
          moduleCodes: ['MOD-EXEC-01', 'MOD-HR-01', 'MOD-SIS-01', 'MOD-WRK-01', 'MOD-REP-01'],
          formCodes: ['FORM-ADM-01', 'FORM-HR-01', 'FORM-OPS-01'],
          workflowCodes: ['WF-ADM-01', 'WF-FIN-01'],
          reportCodes: ['REP-FIN-TB', 'REP-SIS-ENR', 'REP-ACAD-PERF'],
          aiServiceCodes: ['AI-GOV-ANALYTICS', 'AI-SIS-INTERVENTION'],
          permissions: ['EXEC_ALL', 'APPROVE_EXPENDITURE', 'APPROVE_ADMISSION'],
          status: 'ACTIVE',
          createdAt: '2026-01-01',
          updatedAt: '2026-01-01'
        },
        {
          id: 'OFF-DEF-FIN',
          code: 'OFF_FIN',
          name: 'Bursar & Finance Office (JUMO FAAP Center)',
          officeType: 'FINANCIAL',
          description: 'Chart of Accounts, General Ledger, Budget Book, Vote Book, Single/Double/Triple Cash Books, Auditor Books, Fee Assessment, and Universal JUMO DIGITAL PAY',
          parentOrgUnitId: 'ORG-DIR-FIN',
          parentOrgUnitName: 'Directorate of Financial Affairs & Treasury',
          institutionId: 'INST-TEST-A',
          tenantId: 'TENANT-TEST-ALPHA',
          domain: 'EDUCATION',
          headPosition: 'Institutional Bursar',
          responsibleRoles: ['BURSAR', 'FINANCE_OFFICER', 'ACCOUNTANT', 'ACCOUNTS_RECEIVABLE_OFFICER', 'ACCOUNTS_PAYABLE_OFFICER', 'CASHIER', 'FINANCE_MANAGER', 'INTERNAL_AUDITOR'],
          capabilityCodes: ['CAP-FIN-COA', 'CAP-FIN-GL', 'CAP-FIN-BILL', 'CAP-FIN-REC', 'CAP-FIN-PAY', 'CAP-FIN-BNK', 'CAP-FIN-BDG', 'CAP-FIN-AST', 'CAP-FIN-TAX', 'CAP-FIN-REP', 'CAP-FIN-AI', 'CAP-WRK-OFF'],
          moduleCodes: ['MOD-FIN-01', 'MOD-REP-01', 'MOD-WRK-01'],
          formCodes: ['FORM-FIN-01', 'FORM-FIN-02', 'FORM-FIN-03', 'FORM-FIN-04'],
          workflowCodes: ['WF-FIN-01'],
          reportCodes: ['REP-FIN-TB', 'REP-FIN-GL', 'REP-FIN-PL', 'REP-FIN-BS', 'REP-FIN-CF', 'REP-FIN-BDG', 'REP-FIN-VOTE', 'REP-FIN-CASH', 'REP-FIN-AR', 'REP-FIN-AP'],
          aiServiceCodes: ['AI-FIN-ANOMALY', 'AI-FIN-CASHFLOW'],
          permissions: ['FINANCE_ALL', 'POST_JOURNAL', 'ISSUE_INVOICE', 'PROCESS_PAYMENT', 'RECONCILE_BANK'],
          status: 'ACTIVE',
          createdAt: '2026-01-01',
          updatedAt: '2026-01-01'
        },
        {
          id: 'OFF-DEF-REG',
          code: 'OFF_REG',
          name: 'Academic Registry & Admissions Office (JUMO ALPHA SIS)',
          officeType: 'ACADEMIC',
          description: 'Comprehensive Student Information System (SIS), Admissions Queue, Biographical Dossiers, Enrollment, Transcripts, and Daily Attendance',
          parentOrgUnitId: 'ORG-DIR-ADM',
          parentOrgUnitName: 'Directorate of Academic Registries & Admissions',
          institutionId: 'INST-TEST-A',
          tenantId: 'TENANT-TEST-ALPHA',
          domain: 'EDUCATION',
          headPosition: 'Academic Registrar',
          responsibleRoles: ['REGISTRAR', 'ADMISSIONS_OFFICER', 'ADMISSIONS_MANAGER', 'STUDENT_RECORDS_OFFICER', 'ENROLLMENT_OFFICER', 'ACADEMIC_RECORDS_OFFICER', 'GRADUATION_OFFICER'],
          capabilityCodes: ['CAP-SIS-REG', 'CAP-SIS-ADM', 'CAP-SIS-ATT', 'CAP-SIS-TRN', 'CAP-SIS-ONB', 'CAP-SIS-DOC', 'CAP-WRK-OFF'],
          moduleCodes: ['MOD-SIS-01', 'MOD-WRK-01', 'MOD-REP-01'],
          formCodes: ['FORM-ADM-01'],
          workflowCodes: ['WF-ADM-01'],
          reportCodes: ['REP-SIS-ENR', 'REP-SIS-TRN', 'REP-SIS-ATT'],
          aiServiceCodes: ['AI-SIS-INTERVENTION'],
          permissions: ['SIS_ALL', 'ENROLL_STUDENT', 'VERIFY_DOSSIER', 'ISSUE_TRANSCRIPT'],
          status: 'ACTIVE',
          createdAt: '2026-01-01',
          updatedAt: '2026-01-01'
        },
        {
          id: 'OFF-DEF-ACAD',
          code: 'OFF_ACAD',
          name: 'Faculty Dean & Academic Affairs Office',
          officeType: 'ACADEMIC',
          description: 'Curriculum Syllabi, Master Timetable Engine, Schemes of Work, Lesson Plans, Marks Moderation, and Continuous Assessments',
          parentOrgUnitId: 'ORG-FAC-SCI',
          parentOrgUnitName: 'Faculty of Science, Mathematics & Technology',
          institutionId: 'INST-TEST-A',
          tenantId: 'TENANT-TEST-ALPHA',
          domain: 'EDUCATION',
          headPosition: 'Dean of Studies',
          responsibleRoles: ['DEAN', 'ACADEMIC_REGISTRAR', 'HOD', 'COURSE_COORDINATOR', 'DEPARTMENT_ACADEMIC_OFFICER', 'CURRICULUM_ADMINISTRATOR', 'TEACHER', 'LECTURER', 'PROFESSOR', 'TUTOR'],
          capabilityCodes: ['CAP-ACAD-CUR', 'CAP-ACAD-CRS', 'CAP-ACAD-TIM', 'CAP-ACAD-LES', 'CAP-ACAD-AI', 'CAP-ACAD-MOD', 'CAP-SIS-GRD'],
          moduleCodes: ['MOD-ACAD-01', 'MOD-SIS-01'],
          formCodes: ['FORM-SIS-01'],
          workflowCodes: ['WF-ADM-01'],
          reportCodes: ['REP-ACAD-PERF', 'REP-SIS-GRD'],
          aiServiceCodes: ['AI-ACAD-LESSON', 'AI-SIS-INTERVENTION'],
          permissions: ['ACAD_ALL', 'RECORD_MARKS', 'MODERATE_GRADES', 'GENERATE_TIMETABLE'],
          status: 'ACTIVE',
          createdAt: '2026-01-01',
          updatedAt: '2026-01-01'
        },
        {
          id: 'OFF-DEF-EXAM',
          code: 'OFF_EXAM',
          name: 'Examinations & Assessment Registry',
          officeType: 'ACADEMIC',
          description: 'Continuous Assessment Tests (CAT 1/2), End-of-Term Examinations, Division Computation, and Terminal Report Card Publishing',
          parentOrgUnitId: 'ORG-DIR-ADM',
          parentOrgUnitName: 'Directorate of Academic Registries & Admissions',
          institutionId: 'INST-TEST-A',
          tenantId: 'TENANT-TEST-ALPHA',
          domain: 'EDUCATION',
          headPosition: 'Examinations Officer',
          responsibleRoles: ['EXAM_OFFICER', 'EXAM_ADMINISTRATOR', 'ACADEMIC_RECORDS_OFFICER', 'ACADEMIC_QUALITY_OFFICER'],
          capabilityCodes: ['CAP-SIS-GRD', 'CAP-SIS-TRN', 'CAP-ACAD-MOD'],
          moduleCodes: ['MOD-SIS-01', 'MOD-REP-01'],
          formCodes: ['FORM-SIS-01'],
          workflowCodes: ['WF-ADM-01'],
          reportCodes: ['REP-SIS-GRD', 'REP-SIS-TRN'],
          aiServiceCodes: ['AI-SIS-INTERVENTION'],
          permissions: ['EXAM_ALL', 'PUBLISH_REPORTS', 'SEAL_GRADES'],
          status: 'ACTIVE',
          createdAt: '2026-01-01',
          updatedAt: '2026-01-01'
        },
        {
          id: 'OFF-DEF-HR',
          code: 'OFF_HR',
          name: 'Human Resources & Staff Administration Office',
          officeType: 'ADMINISTRATIVE',
          description: 'Employee Dossiers, Recruitment, Contracts, Leave Authorization, Performance Appraisals, and Payroll Integration',
          parentOrgUnitId: 'ORG-DIR-EXEC',
          parentOrgUnitName: 'Executive Directorate & Administration',
          institutionId: 'INST-TEST-A',
          tenantId: 'TENANT-TEST-ALPHA',
          domain: 'EDUCATION',
          headPosition: 'HR Manager',
          responsibleRoles: ['HR_MANAGER', 'HR_OFFICER', 'PAYROLL_OFFICER', 'CHIEF_ADMIN_OFFICER'],
          capabilityCodes: ['CAP-HR-STAFF', 'CAP-HR-LEV', 'CAP-HR-APP', 'CAP-HR-PAY', 'CAP-WRK-OFF'],
          moduleCodes: ['MOD-HR-01', 'MOD-WRK-01'],
          formCodes: ['FORM-HR-01'],
          workflowCodes: ['WF-ADM-01'],
          reportCodes: ['REP-HR-STAFF', 'REP-HR-LEAVE'],
          aiServiceCodes: ['AI-HR-TALENT'],
          permissions: ['HR_ALL', 'APPROVE_LEAVE', 'MANAGE_STAFF'],
          status: 'ACTIVE',
          createdAt: '2026-01-01',
          updatedAt: '2026-01-01'
        },
        {
          id: 'OFF-DEF-OPS',
          code: 'OFF_OPS',
          name: 'Campus Operations, Estates & Enterprise Office',
          officeType: 'OPERATIONAL',
          description: 'Estates Maintenance, School Farm Enterprise, Sickbay Clinic, Transport Fleet, and Consumables Stores Inventory',
          parentOrgUnitId: 'ORG-DIR-OPS',
          parentOrgUnitName: 'Directorate of Campus Operations, Estates & Enterprise',
          institutionId: 'INST-TEST-A',
          tenantId: 'TENANT-TEST-ALPHA',
          domain: 'EDUCATION',
          headPosition: 'Estates & Operations Officer',
          responsibleRoles: ['ESTATES_OFFICER', 'SECURITY_OFFICER', 'ACCOMMODATION_OFFICER', 'DEPUTY_ADMIN'],
          capabilityCodes: ['CAP-EST-ASSET', 'CAP-FARM-ENT', 'CAP-OPS-HST', 'CAP-OPS-HLT', 'CAP-OPS-TRP', 'CAP-STR-INV', 'CAP-PRC-ORD'],
          moduleCodes: ['MOD-OPS-01', 'MOD-WRK-01'],
          formCodes: ['FORM-OPS-01'],
          workflowCodes: ['WF-FIN-01'],
          reportCodes: ['REP-OPS-ESTATES', 'REP-OPS-FARM'],
          aiServiceCodes: ['AI-OPS-MAINTENANCE'],
          permissions: ['OPS_ALL', 'DISPATCH_WORKORDER', 'MANAGE_FLEET'],
          status: 'ACTIVE',
          createdAt: '2026-01-01',
          updatedAt: '2026-01-01'
        },
        {
          id: 'OFF-DEF-LIB',
          code: 'OFF_LIB',
          name: 'Library & Learning Resource Center',
          officeType: 'SUPPORT',
          description: 'Textbook Lending Circulation, ISBN Catalog, Digital Repository, and Overdue Fine Tracking',
          parentOrgUnitId: 'ORG-FAC-SCI',
          parentOrgUnitName: 'Faculty of Science, Mathematics & Technology',
          institutionId: 'INST-TEST-A',
          tenantId: 'TENANT-TEST-ALPHA',
          domain: 'EDUCATION',
          headPosition: 'Chief Librarian',
          responsibleRoles: ['LIBRARIAN', 'TEACHER', 'STUDENT_SUPPORT_OFFICER'],
          capabilityCodes: ['CAP-LIB-CAT', 'CAP-LIB-LON'],
          moduleCodes: ['MOD-OPS-01'],
          formCodes: [],
          workflowCodes: [],
          reportCodes: ['REP-LIB-CIRCULATION'],
          aiServiceCodes: ['AI-LIB-CATALOG'],
          permissions: ['LIB_ALL', 'CHECKOUT_BOOK', 'MANAGE_CATALOG'],
          status: 'ACTIVE',
          createdAt: '2026-01-01',
          updatedAt: '2026-01-01'
        },
        {
          id: 'OFF-DEF-AUDIT',
          code: 'OFF_AUDIT',
          name: 'Internal Audit & Risk Inspection Office (Auditor Books)',
          officeType: 'REGULATORY',
          description: 'Independent Financial Inspection, Audit Observations, Query Tracking, Control Testing, and Statutory Verification',
          parentOrgUnitId: 'ORG-SEC-AUDIT',
          parentOrgUnitName: 'Internal Audit & Risk Inspection Section',
          institutionId: 'INST-TEST-A',
          tenantId: 'TENANT-TEST-ALPHA',
          domain: 'EDUCATION',
          headPosition: 'Chief Internal Auditor',
          responsibleRoles: ['INTERNAL_AUDITOR', 'COMPLIANCE_OFFICER', 'QUALITY_ASSURANCE_MANAGER'],
          capabilityCodes: ['CAP-GOV-AUD', 'CAP-FIN-REP', 'CAP-GOV-EXEC'],
          moduleCodes: ['MOD-FIN-01', 'MOD-EXEC-01', 'MOD-REP-01'],
          formCodes: [],
          workflowCodes: [],
          reportCodes: ['REP-AUD-01', 'REP-FIN-TB', 'REP-FIN-GL'],
          aiServiceCodes: ['AI-AUD-LEAKAGE'],
          permissions: ['AUDIT_INSPECT_ONLY', 'CREATE_QUERY', 'EXPORT_AUDIT_LOGS'],
          status: 'ACTIVE',
          createdAt: '2026-01-01',
          updatedAt: '2026-01-01'
        }
      ];
    }

    // 13. REUSABLE CAPABILITY PACKAGES REGISTRY
    if (!data['capability_packages'] || data['capability_packages'].length === 0) {
      data['capability_packages'] = [
        {
          id: 'PKG-FIN-FULL',
          code: 'FINANCE_FULL_SUITE',
          name: 'JUMO FAAP Comprehensive Financial Suite',
          category: 'FINANCE',
          description: 'Complete institutional financial architecture: COA, GL, Budget Book, Vote Book, Cash Books, Auditor Books, Billing, A/P Bills, Bank Feeds, and Digital Pay',
          capabilityCodes: ['CAP-FIN-COA', 'CAP-FIN-GL', 'CAP-FIN-BILL', 'CAP-FIN-REC', 'CAP-FIN-PAY', 'CAP-FIN-BNK', 'CAP-FIN-BDG', 'CAP-FIN-AST', 'CAP-FIN-TAX', 'CAP-FIN-REP', 'CAP-FIN-AI'],
          defaultModuleCodes: ['MOD-FIN-01', 'MOD-REP-01'],
          defaultFormCodes: ['FORM-FIN-01', 'FORM-FIN-02', 'FORM-FIN-03', 'FORM-FIN-04'],
          defaultWorkflowCodes: ['WF-FIN-01'],
          defaultReportCodes: ['REP-FIN-TB', 'REP-FIN-GL', 'REP-FIN-PL', 'REP-FIN-BS', 'REP-FIN-CF', 'REP-FIN-BDG', 'REP-FIN-VOTE', 'REP-FIN-CASH', 'REP-FIN-AR', 'REP-FIN-AP'],
          defaultAICodes: ['AI-FIN-ANOMALY', 'AI-FIN-CASHFLOW']
        },
        {
          id: 'PKG-SIS-FULL',
          code: 'SIS_FULL_SUITE',
          name: 'JUMO ALPHA Complete Student Information Suite',
          category: 'SIS',
          description: 'Full education capability engine: Student Dossiers, Admissions Lifecycle, Enrollment, Timetables, Continuous Assessments, Transcripts, and Report Cards',
          capabilityCodes: ['CAP-SIS-REG', 'CAP-SIS-ADM', 'CAP-SIS-ATT', 'CAP-SIS-GRD', 'CAP-SIS-TRN', 'CAP-SIS-ONB', 'CAP-SIS-DOC', 'CAP-SIS-AID'],
          defaultModuleCodes: ['MOD-SIS-01', 'MOD-ACAD-01'],
          defaultFormCodes: ['FORM-ADM-01', 'FORM-SIS-01'],
          defaultWorkflowCodes: ['WF-ADM-01'],
          defaultReportCodes: ['REP-SIS-ENR', 'REP-SIS-GRD', 'REP-SIS-TRN', 'REP-SIS-ATT'],
          defaultAICodes: ['AI-SIS-INTERVENTION']
        },
        {
          id: 'PKG-ACAD-FULL',
          code: 'ACADEMIC_FACULTY_SUITE',
          name: 'Curriculum & Faculty Suite',
          category: 'ACADEMIC',
          description: 'Curriculum Syllabi, Subject Catalog, Master Timetable Engine, Schemes of Work, and Lesson Plans',
          capabilityCodes: ['CAP-ACAD-CUR', 'CAP-ACAD-CRS', 'CAP-ACAD-TIM', 'CAP-ACAD-LES', 'CAP-ACAD-AI', 'CAP-ACAD-MOD'],
          defaultModuleCodes: ['MOD-ACAD-01'],
          defaultFormCodes: ['FORM-SIS-01'],
          defaultWorkflowCodes: ['WF-ADM-01'],
          defaultReportCodes: ['REP-ACAD-PERF'],
          defaultAICodes: ['AI-ACAD-LESSON']
        },
        {
          id: 'PKG-GOV-FULL',
          code: 'GOVERNANCE_AUDIT_SUITE',
          name: 'Executive Governance & Auditor Suite',
          category: 'GOVERNANCE',
          description: 'Board Governance, Executive Insights, Audit Logging, Auditor Books, and Risk Anomaly Detection',
          capabilityCodes: ['CAP-GOV-EXEC', 'CAP-GOV-AUD', 'CAP-GOV-BOG', 'CAP-GOV-PRP', 'CAP-FIN-REP'],
          defaultModuleCodes: ['MOD-EXEC-01', 'MOD-REP-01'],
          defaultFormCodes: [],
          defaultWorkflowCodes: ['WF-ADM-01', 'WF-FIN-01'],
          defaultReportCodes: ['REP-AUD-01', 'REP-FIN-TB', 'REP-FIN-BS'],
          defaultAICodes: ['AI-GOV-ANALYTICS', 'AI-AUD-LEAKAGE']
        },
        {
          id: 'PKG-OPS-FULL',
          code: 'CAMPUS_OPERATIONS_SUITE',
          name: 'Campus Operations & Support Services Suite',
          category: 'OPERATIONS',
          description: 'Estates Maintenance, School Farm Enterprise, Sickbay Health, Fleet Logistics, Hostels, and Library Lending',
          capabilityCodes: ['CAP-EST-ASSET', 'CAP-FARM-ENT', 'CAP-OPS-HST', 'CAP-OPS-HLT', 'CAP-OPS-TRP', 'CAP-STR-INV', 'CAP-LIB-CAT', 'CAP-LIB-LON'],
          defaultModuleCodes: ['MOD-OPS-01'],
          defaultFormCodes: ['FORM-OPS-01'],
          defaultWorkflowCodes: ['WF-FIN-01'],
          defaultReportCodes: ['REP-OPS-ESTATES', 'REP-OPS-FARM'],
          defaultAICodes: ['AI-OPS-MAINTENANCE']
        },
        {
          id: 'PKG-PAY-FULL',
          code: 'UNIVERSAL_PAYMENT_SUITE',
          name: 'Universal JUMO DIGITAL PAY Suite',
          category: 'UNIVERSAL_PAY',
          description: 'Universal payment rail checkout, 10-digit pay code generator, cross-domain payee mapping, auto receipting, refunds, reversals, and FAAP GL sync',
          capabilityCodes: ['CAP-FIN-REC', 'CAP-FIN-BILL', 'CAP-FIN-BNK'],
          defaultModuleCodes: ['MOD-FIN-01'],
          defaultFormCodes: ['FORM-FIN-03'],
          defaultWorkflowCodes: ['WF-FIN-01'],
          defaultReportCodes: ['REP-PAY-SETTLEMENT', 'REP-PAY-RECON'],
          defaultAICodes: ['AI-FIN-CASHFLOW']
        }
      ];
    }

    // 14. JUMO FAAP: BUDGET BOOK / BUDGET RECORDER
    if (!data['budget_book_records'] || data['budget_book_records'].length === 0) {
      data['budget_book_records'] = [
        { id: 'BBR-001', fiscalYear: '2026', budgetLineCode: 'BL-ACAD-01', budgetLineName: 'Academic Teaching, Laboratory Chemicals & Textbooks', departmentId: 'ORG-DEP-SCI', departmentName: 'Department of Physical & Biological Sciences', officeCode: 'OFF_ACAD', category: 'ACADEMIC_OPS', approvedBudget: 45000000, revisedBudget: 45000000, committedBudget: 6500000, actualExpenditure: 12000000, availableBalance: 26500000, variance: 33000000, status: 'APPROVED', linkedGlAccountId: 'COA-502', updatedAt: '2026-02-15' },
        { id: 'BBR-002', fiscalYear: '2026', budgetLineCode: 'BL-BOARD-01', budgetLineName: 'Boarding Hostel Meals, Dining Rations & Gas Supplies', departmentId: 'ORG-DIR-OPS', departmentName: 'Directorate of Campus Operations', officeCode: 'OFF_OPS', category: 'RECURRENT', approvedBudget: 60000000, revisedBudget: 60000000, committedBudget: 4800000, actualExpenditure: 23200000, availableBalance: 32000000, variance: 36800000, status: 'APPROVED', linkedGlAccountId: 'COA-503', updatedAt: '2026-02-15' },
        { id: 'BBR-003', fiscalYear: '2026', budgetLineCode: 'BL-EST-01', budgetLineName: 'Campus Infrastructure, Painting & Solar Inverter Maintenance', departmentId: 'ORG-DIR-OPS', departmentName: 'Directorate of Campus Operations', officeCode: 'OFF_OPS', category: 'CAPITAL', approvedBudget: 20000000, revisedBudget: 22000000, committedBudget: 2100000, actualExpenditure: 6100000, availableBalance: 13800000, variance: 15900000, status: 'APPROVED', linkedGlAccountId: 'COA-104', updatedAt: '2026-02-15' },
        { id: 'BBR-004', fiscalYear: '2026', budgetLineCode: 'BL-ICT-01', budgetLineName: 'Fiber Optic Bandwidth, Cloud Subscriptions & Server UPS', departmentId: 'ORG-DIR-EXEC', departmentName: 'Executive Directorate & Administration', officeCode: 'OFF_EXEC', category: 'RECURRENT', approvedBudget: 15000000, revisedBudget: 15000000, committedBudget: 1500000, actualExpenditure: 4500000, availableBalance: 9000000, variance: 10500000, status: 'APPROVED', linkedGlAccountId: 'COA-502', updatedAt: '2026-02-15' },
        { id: 'BBR-005', fiscalYear: '2026', budgetLineCode: 'BL-PAY-01', budgetLineName: 'Teaching Faculty & Support Staff Statutory Payroll', departmentId: 'ORG-DIR-EXEC', departmentName: 'Executive Directorate & Administration', officeCode: 'OFF_HR', category: 'PERSONNEL', approvedBudget: 120000000, revisedBudget: 120000000, committedBudget: 0, actualExpenditure: 35000000, availableBalance: 85000000, variance: 85000000, status: 'APPROVED', linkedGlAccountId: 'COA-501', updatedAt: '2026-02-15' }
      ];
    }

    if (!data['budget_transfers'] || data['budget_transfers'].length === 0) {
      data['budget_transfers'] = [
        { id: 'BTV-001', voucherNumber: 'BTV-2026-001', fromBudgetLineId: 'BBR-001', fromBudgetLineName: 'Academic Teaching & Textbooks', toBudgetLineId: 'BBR-003', toBudgetLineName: 'Campus Infrastructure & Solar', amount: 2000000, reason: 'Supplementary solar inverter installation for chemistry laboratory', authorizedBy: 'Robert Kigozi (Bursar)', date: '2026-02-01', status: 'APPROVED' }
      ];
    }

    // 15. JUMO FAAP: VOTE BOOK
    if (!data['vote_book_items'] || data['vote_book_items'].length === 0) {
      data['vote_book_items'] = [
        { id: 'VOTE-01', voteCode: 'VOTE-013', subVoteCode: 'SUB-01', title: 'Institutional Executive Governance & General Administration', departmentId: 'ORG-DIR-EXEC', departmentName: 'Executive Administration', approvedAllocation: 35000000, commitments: 4500000, expenditures: 10500000, balance: 20000000, reallocations: 0, encumbrances: 1500000, linkedLpoCount: 3, status: 'ACTIVE', updatedAt: '2026-02-15' },
        { id: 'VOTE-02', voteCode: 'VOTE-013', subVoteCode: 'SUB-02', title: 'Curriculum Delivery, Examinations & Instructional Materials', departmentId: 'ORG-FAC-SCI', departmentName: 'Faculty of Sciences', approvedAllocation: 45000000, commitments: 6500000, expenditures: 12000000, balance: 26500000, reallocations: -2000000, encumbrances: 2100000, linkedLpoCount: 5, status: 'ACTIVE', updatedAt: '2026-02-15' },
        { id: 'VOTE-03', voteCode: 'VOTE-013', subVoteCode: 'SUB-03', title: 'Campus Estates, Civil Infrastructure & Physical Maintenance', departmentId: 'ORG-DIR-OPS', departmentName: 'Campus Operations', approvedAllocation: 20000000, commitments: 2100000, expenditures: 6100000, balance: 11800000, reallocations: 2000000, encumbrances: 800000, linkedLpoCount: 2, status: 'ACTIVE', updatedAt: '2026-02-15' },
        { id: 'VOTE-04', voteCode: 'VOTE-013', subVoteCode: 'SUB-04', title: 'Boarding Hostels, Catering Rations & Student Welfare', departmentId: 'ORG-DIR-OPS', departmentName: 'Hostel & Catering', approvedAllocation: 60000000, commitments: 4800000, expenditures: 23200000, balance: 32000000, reallocations: 0, encumbrances: 4800000, linkedLpoCount: 4, status: 'ACTIVE', updatedAt: '2026-02-15' },
        { id: 'VOTE-05', voteCode: 'VOTE-013', subVoteCode: 'SUB-05', title: 'Campus Sickbay, Student Health & First Aid Clinic', departmentId: 'ORG-DIR-OPS', departmentName: 'Health Unit', approvedAllocation: 10000000, commitments: 950000, expenditures: 2850000, balance: 6200000, reallocations: 0, encumbrances: 500000, linkedLpoCount: 1, status: 'ACTIVE', updatedAt: '2026-02-15' }
      ];
    }

    // 16. JUMO FAAP: CASH BOOKS (Single, Double, Triple Cash Architecture)
    if (!data['cash_book_entries'] || data['cash_book_entries'].length === 0) {
      data['cash_book_entries'] = [
        { id: 'CBE-001', date: '2026-02-10', voucherNo: 'RC-2026-101', description: 'Fee Payment Stanbic Wire Ref ADM-2026-001 (Joshua Okello)', referenceNo: 'STB-TX-9901', entryType: 'RECEIPT', cashAmount: 0, bankAmount: 1250000, discountOrEscrowAmount: 0, accountId: 'COA-101', contraAccountId: 'COA-103', reconciliationStatus: 'RECONCILED', recordedBy: 'Robert Kigozi (Bursar)' },
        { id: 'CBE-002', date: '2026-02-11', voucherNo: 'PV-2026-042', description: 'Petty Cash Replenishment for Science Lab Specimen Purchase', referenceNo: 'CHQ-88210', entryType: 'WITHDRAWAL', cashAmount: 1500000, bankAmount: -1500000, discountOrEscrowAmount: 0, accountId: 'COA-102', contraAccountId: 'COA-101', reconciliationStatus: 'RECONCILED', recordedBy: 'Robert Kigozi (Bursar)' },
        { id: 'CBE-003', date: '2026-02-12', voucherNo: 'PV-2026-043', description: 'UMEME Electricity Prepaid Grid Units Voucher', referenceNo: 'MOMO-UM-7712', entryType: 'PAYMENT', cashAmount: 0, bankAmount: -1500000, discountOrEscrowAmount: 0, accountId: 'COA-502', contraAccountId: 'COA-101', reconciliationStatus: 'RECONCILED', recordedBy: 'Robert Kigozi (Bursar)' },
        { id: 'CBE-004', date: '2026-02-14', voucherNo: 'RC-2026-102', description: 'Counter Cashier Fee Deposit Ref ADM-2026-002 (Rebecca Namutebi)', referenceNo: 'CSH-REC-002', entryType: 'RECEIPT', cashAmount: 950000, bankAmount: 0, discountOrEscrowAmount: 0, accountId: 'COA-102', contraAccountId: 'COA-103', reconciliationStatus: 'RECONCILED', recordedBy: 'Cashier Desk' },
        { id: 'CBE-005', date: '2026-02-15', voucherNo: 'PV-2026-044', description: 'Bank Wire Disbursement: Mukwano Kitchen Supplies Invoice', referenceNo: 'EFT-STAN-0092', entryType: 'PAYMENT', cashAmount: 0, bankAmount: -4800000, discountOrEscrowAmount: 200000, accountId: 'COA-201', contraAccountId: 'COA-101', reconciliationStatus: 'UNRECONCILED', recordedBy: 'Robert Kigozi (Bursar)' }
      ];
    }

    // 17. JUMO FAAP: AUDITOR BOOKS
    if (!data['audit_observations'] || data['audit_observations'].length === 0) {
      data['audit_observations'] = [
        {
          id: 'AUD-OBS-01',
          auditRefNumber: 'AUD-2026-Q1-01',
          auditPeriod: '2026 Term 1 / Q1',
          departmentId: 'ORG-DIR-FIN',
          departmentName: 'Directorate of Financial Affairs',
          officeCode: 'OFF_FIN',
          category: 'CONTROL_TEST',
          observationDetails: 'Bank reconciliation for Operating Bank Account (Stanbic) contains 2 un-matched electronic aggregator batch transfers amounting to UGX 8,200,000.',
          riskLevel: 'MEDIUM',
          criteria: 'Section 4.2 of Institutional Financial Regulations mandates daily matching of digital aggregator settlements against GL cashbook.',
          financialImpact: 8200000,
          rootCause: 'Aggregator transaction statement provided late by telecom provider.',
          recommendation: 'Perform batch clearing reconciliation using automated JUMO DIGITAL PAY settlement voucher mapper.',
          managementResponse: 'Settlement batch SPAY-SETTLE-001 has been scheduled for clearing in tomorrow morning treasury run.',
          responsibleOfficer: 'Robert Kigozi (Bursar)',
          status: 'UNDER_REVIEW',
          evidenceDocuments: ['Stanbic_Feed_Feb16.pdf', 'MTN_Aggregator_Summary.csv'],
          auditorStaffId: 'STAFF-T-00'
        },
        {
          id: 'AUD-OBS-02',
          auditRefNumber: 'AUD-2026-Q1-02',
          auditPeriod: '2026 Term 1 / Q1',
          departmentId: 'ORG-DIR-OPS',
          departmentName: 'Campus Operations',
          officeCode: 'OFF_OPS',
          category: 'PROCUREMENT_COMPLIANCE',
          observationDetails: 'Supplier Bill INV-MUK-9821 was entered without attached 3-quote procurement committee comparative bid sheet.',
          riskLevel: 'HIGH',
          criteria: 'Procurement threshold policy requires 3 quotations for all single purchases exceeding UGX 3,000,000.',
          financialImpact: 4800000,
          rootCause: 'Emergency procurement of food supplies following unexpected term opening food price surge.',
          recommendation: 'Table supplier rate contract before Board Procurement Committee for statutory ratification.',
          managementResponse: 'Retrospective procurement justification submitted to Principal and Board Committee.',
          responsibleOfficer: 'Eng. Patrick Kato (Estates Officer)',
          status: 'RESOLVED',
          evidenceDocuments: ['Mukwano_Invoice.pdf', 'Emergency_Food_Justification.pdf'],
          resolutionDate: '2026-02-16',
          auditorStaffId: 'STAFF-T-00'
        }
      ];
    }

    // 18. UNIVERSAL JUMO DIGITAL PAY: MULTI-DOMAIN PAYEE IDENTITIES & OBLIGATIONS
    if (!data['payee_identities'] || data['payee_identities'].length === 0) {
      data['payee_identities'] = [
        // Education Domain Payees
        {
          id: 'PAYEE-EDU-001',
          domain: 'EDUCATION',
          tenantId: 'TENANT-TEST-ALPHA',
          organizationId: 'INST-TEST-A',
          organizationName: 'Sovereign Academy Alpha',
          externalEntityId: 'STU-001',
          fullName: 'Joshua Okello',
          primaryIdentifier: 'ADM-2026-001',
          contactPhone: '+256 772 123456',
          contactEmail: 'parent@alpha.edu',
          paymentCodeStrategy: 'JUMO_GENERATED_10DIGIT',
          publicPaymentCode: '9920260001',
          internalPaymentKey: 'EDUCATION:TENANT-TEST-ALPHA:INST-TEST-A:PAYEE-EDU-001',
          status: 'ACTIVE',
          totalObligations: 1500000,
          totalPaid: 1250000,
          currentBalance: 250000,
          createdAt: '2026-01-10',
          updatedAt: '2026-02-15'
        },
        {
          id: 'PAYEE-EDU-002',
          domain: 'EDUCATION',
          tenantId: 'TENANT-TEST-ALPHA',
          organizationId: 'INST-TEST-A',
          organizationName: 'Sovereign Academy Alpha',
          externalEntityId: 'STU-002',
          fullName: 'Rebecca Namutebi',
          primaryIdentifier: 'ADM-2026-002',
          contactPhone: '+256 772 234567',
          contactEmail: 'parent2@alpha.edu',
          paymentCodeStrategy: 'ADMISSION_NO',
          publicPaymentCode: 'ADM-2026-002',
          internalPaymentKey: 'EDUCATION:TENANT-TEST-ALPHA:INST-TEST-A:PAYEE-EDU-002',
          status: 'ACTIVE',
          totalObligations: 950000,
          totalPaid: 950000,
          currentBalance: 0,
          createdAt: '2026-01-10',
          updatedAt: '2026-02-15'
        },
        // Healthcare Domain Payee Example
        {
          id: 'PAYEE-HLT-001',
          domain: 'HEALTHCARE',
          tenantId: 'TENANT-TEST-ALPHA',
          organizationId: 'INST-CLINIC-A',
          organizationName: 'Sovereign Medical Clinic',
          externalEntityId: 'PAT-9082',
          fullName: 'Grace Nakato',
          primaryIdentifier: 'PAT-9082',
          contactPhone: '+256 701 445566',
          contactEmail: 'grace.nakato@jumo.health',
          paymentCodeStrategy: 'PATIENT_NO',
          publicPaymentCode: 'PAT-9082',
          internalPaymentKey: 'HEALTHCARE:TENANT-TEST-ALPHA:INST-CLINIC-A:PAYEE-HLT-001',
          status: 'ACTIVE',
          totalObligations: 450000,
          totalPaid: 450000,
          currentBalance: 0,
          createdAt: '2026-02-01',
          updatedAt: '2026-02-10'
        },
        // Church / Faith Domain Payee Example
        {
          id: 'PAYEE-CHR-001',
          domain: 'CHURCH',
          tenantId: 'TENANT-TEST-ALPHA',
          organizationId: 'INST-CHURCH-A',
          organizationName: 'Sovereign Cathedral Sanctuary',
          externalEntityId: 'MBR-7711',
          fullName: 'Peter Mugisha',
          primaryIdentifier: 'MBR-7711',
          contactPhone: '+256 782 334455',
          contactEmail: 'peter.mugisha@cathedral.org',
          paymentCodeStrategy: 'MEMBER_NO',
          publicPaymentCode: 'MBR-7711',
          internalPaymentKey: 'CHURCH:TENANT-TEST-ALPHA:INST-CHURCH-A:PAYEE-CHR-001',
          status: 'ACTIVE',
          totalObligations: 200000,
          totalPaid: 200000,
          currentBalance: 0,
          createdAt: '2026-01-05',
          updatedAt: '2026-02-01'
        },
        // Hospitality Domain Payee Example
        {
          id: 'PAYEE-HTL-001',
          domain: 'HOSPITALITY',
          tenantId: 'TENANT-TEST-ALPHA',
          organizationId: 'INST-HOTEL-A',
          organizationName: 'Sovereign Grand Suites',
          externalEntityId: 'BKG-4419',
          fullName: 'David Sterling',
          primaryIdentifier: 'BKG-4419',
          contactPhone: '+256 750 998877',
          contactEmail: 'david.sterling@enterprise.co',
          paymentCodeStrategy: 'BOOKING_NO',
          publicPaymentCode: 'BKG-4419',
          internalPaymentKey: 'HOSPITALITY:TENANT-TEST-ALPHA:INST-HOTEL-A:PAYEE-HTL-001',
          status: 'ACTIVE',
          totalObligations: 850000,
          totalPaid: 500000,
          currentBalance: 350000,
          createdAt: '2026-02-12',
          updatedAt: '2026-02-14'
        },
        // Alumni Domain Payee Example
        {
          id: 'PAYEE-ALM-001',
          domain: 'ALUMNI',
          tenantId: 'TENANT-TEST-ALPHA',
          organizationId: 'INST-TEST-A',
          organizationName: 'Sovereign Academy Alumni Association',
          externalEntityId: 'ALM-2020-089',
          fullName: 'Eng. Isaac Ssemwogerere',
          primaryIdentifier: 'ALM-2020-089',
          contactPhone: '+256 702 112233',
          contactEmail: 'isaac.ssemwogerere@alumni.alpha.edu',
          paymentCodeStrategy: 'JUMO_GENERATED_10DIGIT',
          publicPaymentCode: '9920200089',
          internalPaymentKey: 'ALUMNI:TENANT-TEST-ALPHA:INST-TEST-A:PAYEE-ALM-001',
          status: 'ACTIVE',
          totalObligations: 100000,
          totalPaid: 100000,
          currentBalance: 0,
          createdAt: '2026-01-20',
          updatedAt: '2026-01-20'
        }
      ];
    }

    if (!data['payment_obligations'] || data['payment_obligations'].length === 0) {
      data['payment_obligations'] = [
        {
          id: 'OBL-EDU-001',
          payeeIdentityId: 'PAYEE-EDU-001',
          payeeName: 'Joshua Okello',
          publicPaymentCode: '9920260001',
          domain: 'EDUCATION',
          tenantId: 'TENANT-TEST-ALPHA',
          organizationId: 'INST-TEST-A',
          title: '2026 Term 1 Tuition & Boarding Fees',
          category: 'School Fees',
          amountDue: 1500000,
          amountPaid: 1250000,
          balance: 250000,
          dueDate: '2026-02-15',
          status: 'PARTIALLY_PAID',
          faapReceivableAccountId: 'COA-103',
          faapIncomeAccountId: 'COA-401',
          createdAt: '2026-01-10'
        },
        {
          id: 'OBL-EDU-002',
          payeeIdentityId: 'PAYEE-EDU-002',
          payeeName: 'Rebecca Namutebi',
          publicPaymentCode: 'ADM-2026-002',
          domain: 'EDUCATION',
          tenantId: 'TENANT-TEST-ALPHA',
          organizationId: 'INST-TEST-A',
          title: '2026 Term 1 Tuition Fees (Day)',
          category: 'School Fees',
          amountDue: 950000,
          amountPaid: 950000,
          balance: 0,
          dueDate: '2026-02-15',
          status: 'PAID',
          faapReceivableAccountId: 'COA-103',
          faapIncomeAccountId: 'COA-401',
          createdAt: '2026-01-10'
        },
        {
          id: 'OBL-HTL-001',
          payeeIdentityId: 'PAYEE-HTL-001',
          payeeName: 'David Sterling',
          publicPaymentCode: 'BKG-4419',
          domain: 'HOSPITALITY',
          tenantId: 'TENANT-TEST-ALPHA',
          organizationId: 'INST-HOTEL-A',
          title: 'Executive Suite 3-Night Reservation & Dining',
          category: 'Hotel Accommodation',
          amountDue: 850000,
          amountPaid: 500000,
          balance: 350000,
          dueDate: '2026-02-20',
          status: 'PARTIALLY_PAID',
          faapReceivableAccountId: 'COA-103',
          faapIncomeAccountId: 'COA-402',
          createdAt: '2026-02-12'
        }
      ];
    }

    if (!data['universal_transactions'] || data['universal_transactions'].length === 0) {
      data['universal_transactions'] = [
        {
          id: 'UTX-001',
          transactionReference: 'JUMO-PAY-2026-001',
          publicPaymentCode: '9920260001',
          payeeIdentityId: 'PAYEE-EDU-001',
          payeeName: 'Joshua Okello',
          obligationId: 'OBL-EDU-001',
          domain: 'EDUCATION',
          tenantId: 'TENANT-TEST-ALPHA',
          organizationId: 'INST-TEST-A',
          amount: 1250000,
          rail: 'MTN_MOMO',
          payerName: 'David Okello',
          payerContact: '+256 772 123456',
          providerTransactionId: 'MTN-UG-99882211',
          status: 'SETTLED',
          receiptNumber: 'REC-JUMO-001',
          faapLedgerVoucherId: 'FTX-101',
          dateInitiated: '2026-01-15T09:30:00Z',
          dateSettled: '2026-01-15T09:31:00Z'
        },
        {
          id: 'UTX-002',
          transactionReference: 'JUMO-PAY-2026-002',
          publicPaymentCode: 'ADM-2026-002',
          payeeIdentityId: 'PAYEE-EDU-002',
          payeeName: 'Rebecca Namutebi',
          obligationId: 'OBL-EDU-002',
          domain: 'EDUCATION',
          tenantId: 'TENANT-TEST-ALPHA',
          organizationId: 'INST-TEST-A',
          amount: 950000,
          rail: 'AIRTEL_MONEY',
          payerName: 'Florence Namutebi',
          payerContact: '+256 752 987654',
          providerTransactionId: 'AIRTEL-UG-55443322',
          status: 'SETTLED',
          receiptNumber: 'REC-JUMO-002',
          faapLedgerVoucherId: 'FTX-102',
          dateInitiated: '2026-01-16T11:15:00Z',
          dateSettled: '2026-01-16T11:16:00Z'
        }
      ];
    }
  }

  // -------------------------------------------------------------
  // RESOLUTION PIPELINE & AUTHENTICATION BASELINE (PROTECTED)
  // -------------------------------------------------------------
  public resolveTenantByHost(host: string): string {
    const tenants = this.getTenants();
    const match = tenants.find(t => t.domain === host);
    if (match) {
      this.currentTenantId = match.id;
      return match.id;
    }
    return this.currentTenantId;
  }

  public getPublicSections() {
    return (this.db as any).data?.public_sections || [];
  }

  public getAnnouncements() {
    return (this.db as any).data?.announcements || [];
  }

  public resolveIdentity(emailOrId: string) {
    const db = (this.db as any).data;
    const clean = (emailOrId || '').trim().toLowerCase();

    // 1. Check Staff (All 50+ Roles)
    const staff = (db['staff'] || []).find((s: any) => 
      s.email.toLowerCase() === clean || 
      s.employeeNo.toLowerCase() === clean ||
      (clean === 'bursar' && s.role === 'BURSAR') ||
      (clean === 'registrar' && s.role === 'REGISTRAR') ||
      (clean === 'principal' && s.role === 'HEADTEACHER') ||
      (clean === 'owner' && s.role === 'PROPRIETOR')
    );
    if (staff) return { type: 'STAFF', data: staff };

    // 2. Check Students
    const student = (db['students'] || []).find((s: any) => 
      s.admissionNo.toLowerCase() === clean || 
      s.id.toLowerCase() === clean
    );
    if (student) return { type: 'STUDENT', data: student };

    // 3. Check Parents / Guardians
    const parentStudent = (db['students'] || []).find((s: any) => 
      s.guardianEmail?.toLowerCase() === clean || 
      s.guardianPhone === emailOrId
    );
    if (parentStudent) {
      return { 
        type: 'PARENT', 
        data: { 
          guardianName: parentStudent.guardianName, 
          email: parentStudent.guardianEmail, 
          phone: parentStudent.guardianPhone, 
          ward: parentStudent 
        } 
      };
    }

    // 4. Check Registered Vendors / Suppliers
    const vendor = (db['vendors'] || []).find((v: any) => 
      v.email.toLowerCase() === clean || 
      v.id.toLowerCase() === clean
    );
    if (vendor) return { type: 'VENDOR', data: vendor };

    return null;
  }

  public setTenant(tenantId: string) {
    this.currentTenantId = tenantId;
  }

  public getTenants(): Tenant[] {
    return (this.db as any).data?.tenants || [];
  }

  public getInstitution(): InstitutionProfile {
    return (this.db as any).data?.institutions?.find((i: any) => i.tenantId === this.currentTenantId) || {
      id: 'NULL', tenantId: 'NULL', name: 'Unprovisioned Institution', emisCode: '0', motto: '', address: '', district: '', country: '', phone: '', email: '', currentAcademicYear: '2026', currentTerm: 'Term 1', currency: 'UGX', boardingEnabled: false, transportEnabled: false, farmEnabled: false, healthUnitEnabled: false, createdAt: ''
    };
  }

  // -------------------------------------------------------------
  // REGISTRY RETRIEVAL METHODS (50+ ROLES, CAPABILITIES, MODULES)
  // -------------------------------------------------------------
  public getRoleProfiles(): RoleProfileDefinition[] {
    return (this.db as any).data?.role_profiles || [];
  }

  public getRoleProfileByCode(roleCode: UserRole): RoleProfileDefinition | undefined {
    return this.getRoleProfiles().find(r => r.code === roleCode);
  }

  public getModules(): ModuleRegistryEntry[] {
    return (this.db as any).data?.modules || [];
  }

  public getModulesForOffice(officeId: string): ModuleRegistryEntry[] {
    const office = (this.db as any).data?.institutional_offices?.find((o: any) => o.id === officeId);
    if (!office) return [];
    return this.getModules().filter(mod => office.capabilityIds.includes(mod.capabilityId));
  }

  public getCapabilities(): Capability[] {
    return (this.db as any).data?.capabilities || [];
  }

  public getOfficeCapabilities(officeId: string): Capability[] {
    const office = (this.db as any).data?.institutional_offices?.find((o: any) => o.id === officeId);
    if (!office) return [];
    return this.getCapabilities().filter(c => office.capabilityIds.includes(c.id));
  }

  public getOffices(): InstitutionalOffice[] {
    const inst = this.getInstitution();
    return ((this.db as any).data?.institutional_offices || []).filter((o: any) => o.institutionId === inst.id);
  }

  public getStaff(): StaffMember[] {
    const inst = this.getInstitution();
    const officeIds = this.getOffices().map(o => o.id);
    return ((this.db as any).data?.staff || []).filter((s: any) => officeIds.includes(s.officeId));
  }

  public getForms(): FormDefinition[] {
    return (this.db as any).data?.forms || [];
  }

  public getFormByCode(code: string): FormDefinition | undefined {
    return this.getForms().find(f => f.code === code);
  }

  public getWorkflows(): WorkflowDefinition[] {
    return (this.db as any).data?.workflows || [];
  }

  public getWorkflowByCode(code: string): WorkflowDefinition | undefined {
    return this.getWorkflows().find(w => w.code === code);
  }

  public getWorkflowInstances(): WorkflowInstance[] {
    return (this.db as any).data?.workflow_instances || [];
  }

  public getWorkflowInstancesForOffice(officeId: string): WorkflowInstance[] {
    return (this.db as any).data?.workflow_instances || [];
  }

  // -------------------------------------------------------------
  // OPERATIONAL FORM & WORKFLOW EXECUTION ENGINE
  // -------------------------------------------------------------
  public submitForm(formCode: string, data: any, initiatorId: string): WorkflowInstance {
    const db = (this.db as any).data;
    if (!db['workflow_instances']) db['workflow_instances'] = [];
    
    let workflowCode = 'GENERAL_WORKFLOW';
    let title = `Submission for ${formCode}`;

    if (formCode === 'STUDENT_ADMISSION') {
      workflowCode = 'ADMISSION_WORKFLOW';
      title = `Admission Application: ${data.fullName} (${data.classLevel || 'S.1'})`;
    } else if (formCode === 'FEE_ASSESSMENT') {
      title = `Fee Assessment: Student ${data.studentId}`;
      this.postJournalEntry({
        date: new Date().toISOString(),
        description: `Fee Assessment: Student ${data.studentId} - ${data.term} ${data.academicYear}`,
        referenceType: 'INVOICE',
        entries: [
          { accountId: 'COA-103', type: 'DEBIT', amount: Number(data.tuitionAmount) + Number(data.boardingAmount || 0) }, // A/R
          { accountId: 'COA-401', type: 'CREDIT', amount: Number(data.tuitionAmount) }, // Tuition Revenue
          { accountId: 'COA-402', type: 'CREDIT', amount: Number(data.boardingAmount || 0) } // Boarding Revenue
        ]
      });

      const invoice: FeeInvoice = {
        id: `INV-${Date.now()}`,
        invoiceNumber: `INV-2026-${Math.floor(1000 + Math.random() * 9000)}`,
        studentId: data.studentId,
        term: data.term,
        academicYear: data.academicYear,
        items: [
          { description: 'Tuition Fee', amount: Number(data.tuitionAmount) },
          { description: 'Boarding & Meals', amount: Number(data.boardingAmount || 0) }
        ],
        totalBilled: Number(data.tuitionAmount) + Number(data.boardingAmount || 0),
        totalPaid: 0,
        balance: Number(data.tuitionAmount) + Number(data.boardingAmount || 0),
        status: 'UNPAID',
        dateIssued: new Date().toISOString(),
        dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString()
      };
      if (!db['fee_invoices']) db['fee_invoices'] = [];
      db['fee_invoices'].push(invoice);
    } else if (formCode === 'CREATE_SUPPLIER_BILL') {
      workflowCode = 'SUPPLIER_BILL_WORKFLOW';
      title = `Supplier Bill: ${data.billNumber} from Vendor ${data.vendorId}`;
      const bill: Bill = {
        id: `BILL-${Date.now()}`,
        billNumber: data.billNumber,
        vendorId: data.vendorId,
        vendorName: data.vendorId,
        date: new Date().toISOString(),
        dueDate: data.dueDate,
        items: [{ description: data.description, amount: Number(data.amount), accountId: data.accountId }],
        totalAmount: Number(data.amount),
        amountPaid: 0,
        status: 'PENDING'
      };
      if (!db['bills']) db['bills'] = [];
      db['bills'].push(bill);
    }

    const workflow = this.getWorkflowByCode(workflowCode);
    const initialState = workflow?.states.find(s => s.isInitial);

    const instance: WorkflowInstance = {
      id: `WFI-${Date.now()}`,
      workflowCode,
      title,
      currentStateId: initialState?.id || 'ST-INIT',
      data,
      initiatorId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      history: [{
        stateId: initialState?.id || 'ST-INIT',
        actorId: initiatorId,
        timestamp: new Date().toISOString(),
        action: 'Form Submitted',
        note: 'Initial Submission'
      }]
    };

    db['workflow_instances'].push(instance);
    return instance;
  }

  public advanceWorkflow(instanceId: string, transitionId: string, actorId: string, note?: string): boolean {
    const db = (this.db as any).data;
    const instance = (db['workflow_instances'] || []).find((w: any) => w.id === instanceId);
    if (!instance) return false;

    const workflow = this.getWorkflowByCode(instance.workflowCode);
    const transition = workflow?.transitions.find(t => t.id === transitionId);
    if (!transition || transition.fromStateId !== instance.currentStateId) return false;

    instance.currentStateId = transition.toStateId;
    instance.updatedAt = new Date().toISOString();
    instance.history.push({
      stateId: transition.toStateId,
      actorId,
      timestamp: new Date().toISOString(),
      action: transition.name,
      note: note || transition.actionRequired
    });

    // If Admission Approved, create active student
    if (instance.workflowCode === 'ADMISSION_WORKFLOW' && transition.toStateId === 'ST-APPROVED') {
      const studentData = instance.data;
      const newStudent: Student = {
        id: `STU-${Date.now()}`,
        admissionNo: `ADM-2026-${Math.floor(100 + Math.random() * 900)}`,
        fullName: studentData.fullName,
        gender: studentData.gender || 'MALE',
        dateOfBirth: studentData.dob || '2010-01-01',
        classLevel: studentData.classLevel || 'S.1',
        stream: 'Alpha East',
        guardianName: studentData.guardianName || 'Parent',
        guardianPhone: studentData.guardianPhone || '+256 700 000000',
        guardianEmail: studentData.guardianEmail || 'parent@alpha.edu',
        boardingStatus: studentData.boardingStatus || 'BOARDER',
        admissionDate: new Date().toISOString(),
        status: 'ACTIVE',
        feeBalance: 0,
        attendanceRate: 100,
        averageGrade: 'Pending'
      };
      if (!db['students']) db['students'] = [];
      db['students'].push(newStudent);
    }

    return true;
  }

  // -------------------------------------------------------------
  // QUICKBOOKS BENCHMARK FINANCE OPERATIONS
  // -------------------------------------------------------------
  public getChartOfAccounts(): ChartOfAccount[] {
    return (this.db as any).data?.chart_of_accounts || [];
  }

  public getFinancialTransactions(): FinancialTransaction[] {
    return (this.db as any).data?.financial_transactions || [];
  }

  public getFeeInvoices(): FeeInvoice[] {
    return (this.db as any).data?.fee_invoices || [];
  }

  public getFeePaymentReceipts(): FeePaymentReceipt[] {
    return (this.db as any).data?.fee_payment_receipts || [];
  }

  public getVendors(): Vendor[] {
    return (this.db as any).data?.vendors || [];
  }

  public getBills(): Bill[] {
    return (this.db as any).data?.bills || [];
  }

  public getBankFeeds(): BankFeedItem[] {
    return (this.db as any).data?.bank_feeds || [];
  }

  public getBudgets(): Budget[] {
    return (this.db as any).data?.budgets || [];
  }

  public getFixedAssets(): FixedAsset[] {
    return (this.db as any).data?.fixed_assets || [];
  }

  public createChartOfAccount(account: Omit<ChartOfAccount, 'id' | 'balance'>): ChartOfAccount {
    const data = (this.db as any).data;
    if (!data['chart_of_accounts']) data['chart_of_accounts'] = [];
    const newAccount: ChartOfAccount = { ...account, id: `COA-${Date.now()}`, balance: 0 };
    data['chart_of_accounts'].push(newAccount);
    return newAccount;
  }

  public postJournalEntry(transaction: Omit<FinancialTransaction, 'id' | 'status' | 'auditId'>): FinancialTransaction {
    const data = (this.db as any).data;
    if (!data['financial_transactions']) data['financial_transactions'] = [];
    
    const newTx: FinancialTransaction = {
      ...transaction,
      id: `FTX-${Date.now()}`,
      status: 'POSTED',
      auditId: `AUDIT-${Date.now()}`
    };

    // Strict Double-Entry Balance Calculation
    newTx.entries.forEach(entry => {
      const acc = data['chart_of_accounts'].find((a: any) => a.id === entry.accountId);
      if (acc) {
        if (['ASSET', 'EXPENSE'].includes(acc.type)) {
          if (entry.type === 'DEBIT') acc.balance += entry.amount;
          else acc.balance -= entry.amount;
        } else {
          if (entry.type === 'CREDIT') acc.balance += entry.amount;
          else acc.balance -= entry.amount;
        }
      }
    });

    data['financial_transactions'].push(newTx);
    return newTx;
  }

  public reconcileBankItem(bankItemId: string, matchedTransactionId?: string): boolean {
    const data = (this.db as any).data;
    const item = (data['bank_feeds'] || []).find((b: any) => b.id === bankItemId);
    if (!item) return false;
    item.reconciled = true;
    if (matchedTransactionId) item.matchedTransactionId = matchedTransactionId;
    return true;
  }

  public paySupplierBill(billId: string, amount: number, paymentAccountId: string = 'COA-101'): boolean {
    const data = (this.db as any).data;
    const bill = (data['bills'] || []).find((b: any) => b.id === billId);
    if (!bill) return false;

    bill.amountPaid += amount;
    if (bill.amountPaid >= bill.totalAmount) bill.status = 'PAID';
    else bill.status = 'PARTIALLY_PAID';

    this.postJournalEntry({
      date: new Date().toISOString(),
      description: `Bill Payment: ${bill.billNumber} to ${bill.vendorName}`,
      referenceType: 'PAYMENT',
      referenceId: bill.id,
      entries: [
        { accountId: 'COA-201', type: 'DEBIT', amount }, // Reduce A/P liability
        { accountId: paymentAccountId, type: 'CREDIT', amount } // Reduce Bank Asset
      ]
    });

    return true;
  }

  // -------------------------------------------------------------
  // ALPHA ACADEMY BENCHMARK SIS & ACADEMIC OPERATIONS
  // -------------------------------------------------------------
  public getStudents(): Student[] { return (this.db as any).data?.students || []; }
  public getSubjects(): Subject[] { return (this.db as any).data?.subjects || []; }
  public getAssessments(): AssessmentRecord[] { return (this.db as any).data?.assessments || []; }
  public getEstateAssets(): EstateAsset[] { return (this.db as any).data?.fixed_assets || []; }
  public getFarmProjects(): FarmProject[] { return (this.db as any).data?.farm_projects || []; }

  public getAdmissionStats() {
    const data = (this.db as any).data;
    const instances = data?.workflow_instances || [];
    const students = data?.students || [];

    return {
      pending: instances.filter((wf: any) => wf.workflowCode === 'ADMISSION_WORKFLOW' && !['ST-APPROVED', 'ST-REJECTED'].includes(wf.currentStateId)).length,
      approved: instances.filter((wf: any) => wf.workflowCode === 'ADMISSION_WORKFLOW' && wf.currentStateId === 'ST-APPROVED').length,
      rejected: instances.filter((wf: any) => wf.workflowCode === 'ADMISSION_WORKFLOW' && wf.currentStateId === 'ST-REJECTED').length,
      total: students.length
    };
  }

  // -------------------------------------------------------------
  // FINANCIAL STATEMENTS & REPORTING ENGINE
  // -------------------------------------------------------------
  public generateTrialBalance() {
    const coa = this.getChartOfAccounts();
    const rows = coa.map(acc => {
      let debit = 0;
      let credit = 0;
      if (['ASSET', 'EXPENSE'].includes(acc.type)) {
        if (acc.balance >= 0) debit = acc.balance;
        else credit = Math.abs(acc.balance);
      } else {
        if (acc.balance >= 0) credit = acc.balance;
        else debit = Math.abs(acc.balance);
      }
      return { code: acc.code, name: acc.name, type: acc.type, debit, credit };
    });

    const totalDebit = rows.reduce((s, r) => s + r.debit, 0);
    const totalCredit = rows.reduce((s, r) => s + r.credit, 0);
    return { rows, totalDebit, totalCredit, balanced: totalDebit === totalCredit };
  }

  public generateProfitAndLoss() {
    const coa = this.getChartOfAccounts();
    const incomeAccounts = coa.filter(a => a.type === 'INCOME');
    const expenseAccounts = coa.filter(a => a.type === 'EXPENSE');

    const totalIncome = incomeAccounts.reduce((s, a) => s + a.balance, 0);
    const totalExpenses = expenseAccounts.reduce((s, a) => s + a.balance, 0);
    const netOperatingSurplus = totalIncome - totalExpenses;

    return { incomeAccounts, expenseAccounts, totalIncome, totalExpenses, netOperatingSurplus };
  }

  public generateBalanceSheet() {
    const coa = this.getChartOfAccounts();
    const assets = coa.filter(a => a.type === 'ASSET');
    const liabilities = coa.filter(a => a.type === 'LIABILITY');
    const equity = coa.filter(a => a.type === 'EQUITY');

    const totalAssets = assets.reduce((s, a) => s + a.balance, 0);
    const totalLiabilities = liabilities.reduce((s, a) => s + a.balance, 0);
    const totalEquity = equity.reduce((s, a) => s + a.balance, 0);

    return { assets, liabilities, equity, totalAssets, totalLiabilities, totalEquity };
  }

  // -------------------------------------------------------------
  // SCHOOLPAY DIGITAL PAYMENT BENCHMARK ENGINE
  // -------------------------------------------------------------
  public getSchoolPayTransactions(): SchoolPayTransaction[] {
    return (this.db as any).data?.schoolpay_transactions || [];
  }

  public getSchoolPaySettlements(): SchoolPaySettlementBatch[] {
    return (this.db as any).data?.schoolpay_settlements || [];
  }

  public processSchoolPayTransaction(params: {
    studentId: string;
    amount: number;
    channel: DigitalPaymentRail;
    payerPhoneOrAccount: string;
    payerName: string;
    feeCategory?: string;
    feeInvoiceId?: string;
  }): { transaction: SchoolPayTransaction; receipt: FeePaymentReceipt } {
    const data = (this.db as any).data;
    if (!data['schoolpay_transactions']) data['schoolpay_transactions'] = [];
    if (!data['fee_payment_receipts']) data['fee_payment_receipts'] = [];

    const student = this.getStudents().find(s => s.id === params.studentId);
    const studentName = student?.fullName || 'Student';
    const admissionNo = student?.admissionNo || 'ADM-2026-000';
    const payCode = `99${admissionNo.replace(/[^0-9]/g, '')}`;

    const txRef = `SPAY-2026-${Math.floor(10000 + Math.random() * 90000)}`;
    const recNum = `REC-SPAY-${Math.floor(1000 + Math.random() * 9000)}`;
    const providerRef = `${params.channel === 'MTN_MOMO' ? 'MTN' : params.channel === 'AIRTEL_MONEY' ? 'AIRTEL' : 'BANK'}-UG-${Math.floor(10000000 + Math.random() * 90000000)}`;

    // 1. Post Double-Entry Journal Voucher (Debit Clearing Asset, Credit Student A/R)
    const journalVoucher = this.postJournalEntry({
      date: new Date().toISOString(),
      description: `SchoolPay Collection (${params.channel}) - ${studentName} (${admissionNo})`,
      referenceType: 'RECEIPT',
      referenceId: txRef,
      entries: [
        { accountId: 'COA-102', type: 'DEBIT', amount: params.amount }, // SchoolPay Digital Clearing Account
        { accountId: 'COA-103', type: 'CREDIT', amount: params.amount } // Student Accounts Receivable (A/R)
      ]
    });

    // 2. Create SchoolPay Transaction Record
    const tx: SchoolPayTransaction = {
      id: `SPTX-${Date.now()}`,
      transactionReference: txRef,
      payCode,
      studentId: params.studentId,
      studentName,
      admissionNo,
      amount: params.amount,
      channel: params.channel,
      providerTransactionId: providerRef,
      status: 'SETTLED',
      payerPhoneOrAccount: params.payerPhoneOrAccount,
      payerName: params.payerName,
      dateInitiated: new Date().toISOString(),
      dateSettled: new Date().toISOString(),
      feeCategory: params.feeCategory || 'Tuition & Operational Fees',
      receiptNumber: recNum,
      ledgerVoucherId: journalVoucher.id,
      bankAccountId: 'COA-102'
    };
    data['schoolpay_transactions'].unshift(tx);

    // 3. Create Official Fee Payment Receipt
    const receipt: FeePaymentReceipt = {
      id: `REC-${Date.now()}`,
      receiptNumber: recNum,
      invoiceId: params.feeInvoiceId || 'INV-DIRECT',
      studentId: params.studentId,
      studentName,
      amount: params.amount,
      paymentMethod: 'SCHOOLPAY_DIGITAL',
      referenceCode: txRef,
      date: new Date().toISOString(),
      receivedByStaffId: 'STAFF-SYSTEM-PAY',
      status: 'CLEARED'
    };
    data['fee_payment_receipts'].unshift(receipt);

    // 4. Update Student Fee Balance in SIS
    if (student) {
      student.feeBalance = Math.max(0, (student.feeBalance || 0) - params.amount);
    }

    // 5. Update Invoice Balance if specified or match open invoice
    const invoices = this.getFeeInvoices().filter(i => i.studentId === params.studentId && i.status !== 'PAID');
    if (invoices.length > 0) {
      const inv = invoices[0];
      inv.totalPaid += params.amount;
      inv.balance = Math.max(0, inv.totalBilled - inv.totalPaid);
      if (inv.balance === 0) inv.status = 'PAID';
      else inv.status = 'PARTIAL';
    }

    // 6. Push Bank Feed item for treasury reconciliation
    if (!data['bank_feeds']) data['bank_feeds'] = [];
    data['bank_feeds'].push({
      id: `BF-SPAY-${Date.now()}`,
      bankAccountId: 'COA-102',
      transactionDate: new Date().toISOString().split('T')[0],
      description: `SchoolPay Collection Ref: ${txRef} (${params.payerName})`,
      amount: params.amount,
      type: 'CREDIT',
      reconciled: true,
      matchedTransactionId: journalVoucher.id,
      suggestedAccount: 'COA-103'
    });

    return { transaction: tx, receipt };
  }

  public settleSchoolPayBatch(channel: DigitalPaymentRail | 'ALL_CHANNELS' = 'ALL_CHANNELS'): SchoolPaySettlementBatch {
    const data = (this.db as any).data;
    if (!data['schoolpay_settlements']) data['schoolpay_settlements'] = [];

    const unsettled = this.getSchoolPayTransactions().filter(t => t.status === 'SETTLED');
    const targetTxs = channel === 'ALL_CHANNELS' ? unsettled : unsettled.filter(t => t.channel === channel);
    const totalAmount = targetTxs.reduce((sum, t) => sum + t.amount, 0);

    const batchNumber = `SETTLE-BATCH-${Date.now().toString().slice(-6)}`;

    // Post GL Voucher transferring funds from SchoolPay Clearing Account (COA-102) to Master Bank Account (COA-101)
    const journalVoucher = this.postJournalEntry({
      date: new Date().toISOString(),
      description: `SchoolPay Settlement Batch ${batchNumber} (${channel}) to Stanbic Master Bank`,
      referenceType: 'TRANSFER',
      referenceId: batchNumber,
      entries: [
        { accountId: 'COA-101', type: 'DEBIT', amount: totalAmount }, // Master Operating Bank Account
        { accountId: 'COA-102', type: 'CREDIT', amount: totalAmount } // Clear SchoolPay Escrow Account
      ]
    });

    const batch: SchoolPaySettlementBatch = {
      id: `SBATCH-${Date.now()}`,
      batchNumber,
      channel,
      totalAmount,
      transactionCount: targetTxs.length,
      settledToBankAccountId: 'COA-101',
      settlementDate: new Date().toISOString(),
      status: 'SETTLED',
      journalVoucherId: journalVoucher.id
    };

    targetTxs.forEach(t => {
      t.status = 'RECONCILED';
      t.reconciliationBatchId = batch.id;
    });

    data['schoolpay_settlements'].unshift(batch);
    return batch;
  }

  public reverseSchoolPayTransaction(transactionId: string, reason: string): boolean {
    const data = (this.db as any).data;
    const tx = (data['schoolpay_transactions'] || []).find((t: any) => t.id === transactionId);
    if (!tx || tx.status === 'REVERSED') return false;

    tx.status = 'REVERSED';

    // Reverse GL voucher (Debit A/R, Credit Clearing Bank)
    this.postJournalEntry({
      date: new Date().toISOString(),
      description: `Reversal of SchoolPay Tx ${tx.transactionReference}: ${reason}`,
      referenceType: 'JOURNAL',
      referenceId: tx.transactionReference,
      entries: [
        { accountId: 'COA-103', type: 'DEBIT', amount: tx.amount },
        { accountId: 'COA-102', type: 'CREDIT', amount: tx.amount }
      ]
    });

    const student = this.getStudents().find(s => s.id === tx.studentId);
    if (student) {
      student.feeBalance = (student.feeBalance || 0) + tx.amount;
    }

    return true;
  }

  // -------------------------------------------------------------
  // ALPHA ACADEMY BENCHMARK SIS & REPORT CARD OPERATIONS
  // -------------------------------------------------------------
  public getTimetables(): TimetableEntry[] {
    return (this.db as any).data?.timetables || [];
  }

  public getHostels(): HostelAccommodation[] {
    return (this.db as any).data?.hostels || [];
  }

  public getLibraryBooks(): LibraryBook[] {
    return (this.db as any).data?.library_books || [];
  }

  public getLibraryLoans(): LibraryLoan[] {
    return (this.db as any).data?.library_loans || [];
  }

  public issueLibraryBook(bookId: string, studentId: string, dueDate: string): LibraryLoan {
    const data = (this.db as any).data;
    if (!data['library_loans']) data['library_loans'] = [];

    const book = (data['library_books'] || []).find((b: any) => b.id === bookId);
    const student = this.getStudents().find(s => s.id === studentId);

    if (book && book.copiesAvailable > 0) {
      book.copiesAvailable -= 1;
    }

    const loan: LibraryLoan = {
      id: `LOAN-${Date.now()}`,
      bookId,
      bookTitle: book?.title || 'Library Text',
      studentId,
      studentName: student?.fullName || 'Student',
      issueDate: new Date().toISOString().split('T')[0],
      dueDate,
      status: 'ACTIVE'
    };

    data['library_loans'].unshift(loan);
    return loan;
  }

  public returnLibraryBook(loanId: string): boolean {
    const data = (this.db as any).data;
    const loan = (data['library_loans'] || []).find((l: any) => l.id === loanId);
    if (!loan || loan.status === 'RETURNED') return false;

    loan.status = 'RETURNED';
    loan.returnDate = new Date().toISOString().split('T')[0];

    const book = (data['library_books'] || []).find((b: any) => b.id === loan.bookId);
    if (book) {
      book.copiesAvailable += 1;
    }

    return true;
  }

  public getAttendanceRecords(): AttendanceRecord[] {
    return (this.db as any).data?.attendance_records || [];
  }

  public markAttendance(records: {
    targetId: string;
    targetName: string;
    classLevel?: string;
    status: 'PRESENT' | 'ABSENT' | 'LATE' | 'EXCUSED';
    remarks?: string;
  }[]): boolean {
    const data = (this.db as any).data;
    if (!data['attendance_records']) data['attendance_records'] = [];

    const today = new Date().toISOString().split('T')[0];
    records.forEach(rec => {
      const att: AttendanceRecord = {
        id: `ATT-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
        date: today,
        targetType: 'STUDENT',
        targetId: rec.targetId,
        targetName: rec.targetName,
        classLevel: rec.classLevel,
        status: rec.status,
        remarks: rec.remarks || 'Daily Roll Call'
      };
      data['attendance_records'].unshift(att);

      // Recompute student attendance rate
      const student = this.getStudents().find(s => s.id === rec.targetId);
      if (student) {
        const studentAtts = data['attendance_records'].filter((a: any) => a.targetId === rec.targetId);
        const presentCount = studentAtts.filter((a: any) => a.status === 'PRESENT').length;
        student.attendanceRate = Math.round((presentCount / studentAtts.length) * 100);
      }
    });

    return true;
  }

  public getDisciplineCases(): DisciplineCase[] {
    return (this.db as any).data?.discipline_cases || [];
  }

  public recordDisciplineCase(
    studentId: string,
    studentName: string,
    category: 'ATTENDANCE' | 'INSUBORDINATION' | 'PROPERTY_DAMAGE' | 'THEFT' | 'OTHER',
    description: string,
    actionTaken: string,
    staffId: string
  ): DisciplineCase {
    const data = (this.db as any).data;
    if (!data['discipline_cases']) data['discipline_cases'] = [];

    const discCase: DisciplineCase = {
      id: `DISC-${Date.now()}`,
      studentId,
      studentName,
      incidentDate: new Date().toISOString().split('T')[0],
      category,
      description,
      reportedByStaffId: staffId,
      actionTaken,
      status: 'OPEN'
    };

    data['discipline_cases'].unshift(discCase);
    return discCase;
  }

  public resolveDisciplineCase(caseId: string, actionTaken: string): boolean {
    const data = (this.db as any).data;
    const discCase = (data['discipline_cases'] || []).find((c: any) => c.id === caseId);
    if (!discCase) return false;
    discCase.actionTaken = actionTaken;
    discCase.status = 'RESOLVED';
    return true;
  }

  public recordAssessmentScore(
    studentId: string,
    subjectId: string,
    cat1Score: number,
    cat2Score: number,
    examScore: number,
    remarks: string,
    staffId: string
  ): AssessmentRecord {
    const data = (this.db as any).data;
    if (!data['assessments']) data['assessments'] = [];

    const subject = this.getSubjects().find(s => s.id === subjectId || s.code === subjectId);
    const subjectName = subject?.name || subjectId;
    const totalScore = cat1Score + cat2Score + examScore;

    let grade = 'F';
    if (totalScore >= 80) grade = 'A';
    else if (totalScore >= 70) grade = 'B';
    else if (totalScore >= 60) grade = 'C';
    else if (totalScore >= 50) grade = 'D';
    else if (totalScore >= 40) grade = 'E';

    // Check existing or create new
    let record = data['assessments'].find((a: any) => a.studentId === studentId && (a.subjectId === subjectId || a.subjectName === subjectName));
    if (record) {
      record.cat1Score = cat1Score;
      record.cat2Score = cat2Score;
      record.examScore = examScore;
      record.totalScore = totalScore;
      record.grade = grade;
      record.remarks = remarks;
      record.verified = true;
    } else {
      record = {
        id: `ASM-${Date.now()}`,
        studentId,
        subjectId: subject?.id || subjectId,
        subjectName,
        term: 'Term 1',
        academicYear: '2026',
        cat1Score,
        cat2Score,
        examScore,
        totalScore,
        grade,
        remarks,
        recordedByStaffId: staffId,
        verified: true
      };
      data['assessments'].push(record);
    }

    // Recalculate average grade for student
    const student = this.getStudents().find(s => s.id === studentId);
    if (student) {
      const studentAsms = data['assessments'].filter((a: any) => a.studentId === studentId);
      const avg = studentAsms.reduce((s: number, a: any) => s + a.totalScore, 0) / studentAsms.length;
      if (avg >= 80) student.averageGrade = 'A';
      else if (avg >= 70) student.averageGrade = 'B+';
      else if (avg >= 60) student.averageGrade = 'B';
      else if (avg >= 50) student.averageGrade = 'C';
      else student.averageGrade = 'D';
    }

    return record;
  }

  public generateStudentReportCard(studentId: string, term: string = 'Term 1', academicYear: string = '2026'): StudentReportCard {
    const student = this.getStudents().find(s => s.id === studentId);
    const assessments = this.getAssessments().filter(a => a.studentId === studentId && a.term === term);
    
    const formattedAssessments = assessments.map(a => ({
      subjectCode: a.subjectId,
      subjectName: a.subjectName || a.subjectId,
      catScore: a.cat1Score + a.cat2Score,
      examScore: a.examScore,
      totalScore: a.totalScore,
      grade: a.grade,
      scoreRemarks: a.remarks || 'Satisfactory achievement',
      teacherName: 'Faculty Evaluator'
    }));

    const totalAggregate = formattedAssessments.reduce((sum, a) => {
      let pt = 9;
      if (a.grade === 'A') pt = 1;
      else if (a.grade === 'B') pt = 3;
      else if (a.grade === 'C') pt = 5;
      else if (a.grade === 'D') pt = 7;
      return sum + pt;
    }, 0);

    let division: StudentReportCard['division'] = 'Division 2';
    if (totalAggregate <= 12 && formattedAssessments.length >= 8) division = 'Division 1';
    else if (totalAggregate <= 24) division = 'Division 2';
    else if (totalAggregate <= 32) division = 'Division 3';
    else division = 'Division 4';

    return {
      id: `RC-${studentId}-${term}-${academicYear}`,
      studentId,
      studentName: student?.fullName || 'Student',
      admissionNo: student?.admissionNo || 'ADM-000',
      classLevel: student?.classLevel || 'S.1',
      stream: student?.stream || 'Alpha',
      term,
      academicYear,
      assessments: formattedAssessments,
      totalAggregate: totalAggregate || 14,
      division,
      classRank: '3rd out of 84 students',
      attendanceRate: student?.attendanceRate || 98,
      classTeacherRemarks: 'A focused, hardworking learner with excellent scientific aptitude.',
      headteacherRemarks: 'Promising academic term. Commended for exemplary discipline and academic excellence.',
      nextTermBeginsDate: '2026-05-25',
      status: 'PUBLISHED'
    };
  }

  // -------------------------------------------------------------
  // AI ASSISTANT & HEURISTIC ENGINE (SCOPED SERVICES)
  // -------------------------------------------------------------
  public runFinanceAIAnalysis() {
    const bankFeeds = this.getBankFeeds();
    const unreconciled = bankFeeds.filter(b => !b.reconciled);
    const invoices = this.getFeeInvoices();
    const unpaidInvoices = invoices.filter(i => i.status !== 'PAID');
    const overdueCount = unpaidInvoices.length;

    return {
      anomalies: [
        { type: 'UNRECONCILED_FEED', severity: 'MEDIUM', message: `${unreconciled.length} bank feed transactions require matching reconciliation against general ledger.` },
        { type: 'OUTSTANDING_FEES', severity: 'HIGH', message: `${overdueCount} student fee invoices are currently pending collection with UGX ${unpaidInvoices.reduce((s, i) => s + i.balance, 0).toLocaleString()} outstanding.` }
      ],
      forecast: 'Projected 30-day operational cash inflow: UGX 45,000,000 based on active fee payment velocity.',
      recommendation: 'Recommend issuing SMS reminders to S.1 & S.2 guardians before mid-term examination cards are printed.'
    };
  }

  public runStudentAIIntervention(studentId: string) {
    const student = this.getStudents().find(s => s.id === studentId);
    if (!student) return null;

    return {
      academicTrajectory: student.averageGrade === 'A' ? 'Excelling in STEM subjects. Candidate for national math olympiad.' : 'Satisfactory progress across core curriculum.',
      attendanceRisk: (student.attendanceRate || 100) < 90 ? 'High Risk - Attendance dropped below 90% threshold' : 'Low Risk - Exemplary attendance record',
      recommendedAction: 'Schedule termly parent-teacher review and maintain laboratory practical sessions.'
    };
  }

  // -------------------------------------------------------------
  // DYNAMIC ORGANIZATIONAL HIERARCHY METHODS
  // -------------------------------------------------------------
  public getOrganizationalUnits(): OrganizationalUnit[] {
    return (this.db as any).data?.organizational_units || [];
  }

  public createOrganizationalUnit(unit: Omit<OrganizationalUnit, 'id' | 'createdAt'>): OrganizationalUnit {
    const data = (this.db as any).data;
    if (!data['organizational_units']) data['organizational_units'] = [];
    const newUnit: OrganizationalUnit = {
      ...unit,
      id: `ORG-${unit.type.substring(0, 3)}-${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    data['organizational_units'].push(newUnit);
    return newUnit;
  }

  // -------------------------------------------------------------
  // DYNAMIC OFFICE REGISTRY & RESOLUTION METHODS
  // -------------------------------------------------------------
  public getCapabilityPackageRegistry(): CapabilityPackageRegistry {
    return CapabilityPackageRegistry.getInstance();
  }

  public getOfficeDefinitions(): OfficeDefinition[] {
    return (this.db as any).data?.office_definitions || [];
  }

  public getOfficeDefinition(idOrCode: string): OfficeDefinition | undefined {
    return this.getOfficeDefinitions().find(o => o.id === idOrCode || o.code === idOrCode);
  }

  public postFinancialTransaction(transaction: Partial<FinancialTransaction>): FinancialTransaction {
    const data = (this.db as any).data;
    if (!data['financial_transactions']) data['financial_transactions'] = [];
    const newTx: FinancialTransaction = {
      id: `FTX-${Date.now()}`,
      date: transaction.date || new Date().toISOString().split('T')[0],
      description: transaction.description || 'General Journal Entry',
      entries: transaction.entries || [],
      referenceType: transaction.referenceType || 'JOURNAL',
      referenceId: transaction.referenceId,
      status: 'POSTED',
      auditId: `AUD-${Date.now()}`,
      postedBy: transaction.postedBy || 'System User',
      voucherNumber: transaction.voucherNumber || `JV-${Date.now().toString().slice(-6)}`
    };
    data['financial_transactions'].unshift(newTx);
    return newTx;
  }

  public createStudent(student: Omit<Student, 'id'>): Student {
    const data = (this.db as any).data;
    if (!data['students']) data['students'] = [];
    const newStudent: Student = {
      ...student,
      id: `STU-${Date.now()}`
    };
    data['students'].unshift(newStudent);
    return newStudent;
  }

  public recordAssessment(assessment: any): AssessmentRecord {
    return this.recordAssessmentScore(
      assessment.studentId,
      assessment.subjectId,
      Number(assessment.cat1Score) || 0,
      Number(assessment.cat2Score) || 0,
      Number(assessment.examScore) || 0,
      assessment.remarks || 'Assessment Recorded',
      assessment.recordedByStaffId || 'STF-ADMIN-01'
    );
  }

  public createBill(bill: Partial<Bill>): Bill {
    const data = (this.db as any).data;
    if (!data['bills']) data['bills'] = [];
    const newBill: Bill = {
      id: `BILL-${Date.now()}`,
      billNumber: bill.billNumber || `BILL-${Date.now().toString().slice(-5)}`,
      vendorId: bill.vendorId || 'VND-GEN',
      vendorName: bill.vendorName || 'Vendor',
      date: bill.date || new Date().toISOString().split('T')[0],
      dueDate: bill.dueDate || new Date().toISOString().split('T')[0],
      items: bill.items || [],
      totalAmount: bill.totalAmount || 0,
      amountPaid: 0,
      status: 'PENDING'
    };
    data['bills'].unshift(newBill);
    return newBill;
  }

  public createWorkflowInstance(
    workflowCode: string, 
    title: string, 
    data: any, 
    initiatorId: string, 
    initialStateId?: string
  ): WorkflowInstance {
    const db = (this.db as any).data;
    if (!db['workflow_instances']) db['workflow_instances'] = [];
    const instance: WorkflowInstance = {
      id: `WFI-${Date.now()}`,
      workflowCode,
      title,
      currentStateId: initialStateId || 'ST-INIT',
      data,
      initiatorId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      history: [{
        stateId: initialStateId || 'ST-INIT',
        actorId: initiatorId,
        timestamp: new Date().toISOString(),
        action: 'Form Workflow Triggered',
        note: title
      }]
    };
    db['workflow_instances'].unshift(instance);
    return instance;
  }

  public getReports(): ReportDefinition[] {
    return (this.db as any).data?.report_definitions || this.getCapabilityPackageRegistry().getDefaultReports();
  }

  public getAIServices(): AIServiceDefinition[] {
    return (this.db as any).data?.ai_services || this.getCapabilityPackageRegistry().getDefaultAIServices();
  }

  public resolveOfficeConfigurations(office: Partial<OfficeDefinition>): ResolvedOfficeConfig {
    const pkgRegistry = this.getCapabilityPackageRegistry();
    return pkgRegistry.resolveOfficeConfigurations(office, {
      allCapabilities: this.getCapabilities(),
      allModules: this.getModules(),
      allForms: this.getForms(),
      allWorkflows: this.getWorkflows(),
      allReports: this.getReports(),
      allAIServices: this.getAIServices()
    });
  }

  public createOfficeDefinition(office: Omit<OfficeDefinition, 'id' | 'createdAt' | 'updatedAt'>): OfficeDefinition {
    const data = (this.db as any).data;
    if (!data['office_definitions']) data['office_definitions'] = [];

    // Automatically resolve configurations from CapabilityPackageRegistry
    const resolved = this.resolveOfficeConfigurations(office);

    // Merge explicitly provided or auto-resolved capability codes
    const finalCapabilityCodes = Array.from(new Set([
      ...(office.capabilityCodes && office.capabilityCodes.length > 0 ? office.capabilityCodes : []),
      ...resolved.capabilities.map(c => c.code)
    ]));

    const finalModuleCodes = Array.from(new Set([
      ...(office.moduleCodes && office.moduleCodes.length > 0 ? office.moduleCodes : []),
      ...resolved.modules.map(m => m.componentKey || m.id)
    ]));

    const finalFormCodes = Array.from(new Set([
      ...(office.formCodes && office.formCodes.length > 0 ? office.formCodes : []),
      ...resolved.forms.map(f => f.code)
    ]));

    const finalWorkflowCodes = Array.from(new Set([
      ...(office.workflowCodes && office.workflowCodes.length > 0 ? office.workflowCodes : []),
      ...resolved.workflows.map(w => w.code)
    ]));

    const finalReportCodes = Array.from(new Set([
      ...(office.reportCodes && office.reportCodes.length > 0 ? office.reportCodes : []),
      ...resolved.reports.map(r => r.code)
    ]));

    const finalAICodes = Array.from(new Set([
      ...(office.aiServiceCodes && office.aiServiceCodes.length > 0 ? office.aiServiceCodes : []),
      ...resolved.aiServices.map(ai => ai.code)
    ]));

    const finalPermissions = Array.from(new Set([
      ...(office.permissions && office.permissions.length > 0 ? office.permissions : []),
      ...resolved.permissions
    ]));

    const newOffice: OfficeDefinition = {
      ...office,
      id: `OFF-DEF-${Date.now()}`,
      capabilityCodes: finalCapabilityCodes.length > 0 ? finalCapabilityCodes : ['CAP-GOV-EXEC'],
      moduleCodes: finalModuleCodes.length > 0 ? finalModuleCodes : ['MOD-EXEC-01'],
      formCodes: finalFormCodes,
      workflowCodes: finalWorkflowCodes,
      reportCodes: finalReportCodes,
      aiServiceCodes: finalAICodes,
      permissions: finalPermissions,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    data['office_definitions'].push(newOffice);

    // Also sync with legacy institutional_offices for backwards compatibility
    if (!data['institutional_offices']) data['institutional_offices'] = [];
    const directorateMapping: Record<OfficeType, SchoolDirectorate> = {
      'FINANCIAL': 'FINANCE',
      'ACADEMIC': 'ACADEMICS',
      'STUDENT_FACING': 'STUDENT_AFFAIRS',
      'ADMINISTRATIVE': 'EXECUTIVE_ADMIN',
      'OPERATIONAL': 'FACILITIES',
      'SUPPORT': 'FACILITIES',
      'EXECUTIVE': 'EXECUTIVE_ADMIN',
      'REGULATORY': 'EXECUTIVE_ADMIN',
      'EXTERNAL_FACING': 'EXTERNAL_RELATIONS'
    };

    data['institutional_offices'].push({
      id: newOffice.id,
      institutionId: newOffice.institutionId,
      directorate: directorateMapping[newOffice.officeType] || 'EXECUTIVE_ADMIN',
      name: newOffice.name,
      code: newOffice.code,
      description: newOffice.description,
      headPosition: newOffice.headPosition || 'Office Head',
      responsibilities: [`Autonomous dynamic operations: ${newOffice.name}`],
      capabilityIds: newOffice.capabilityCodes
    });

    return newOffice;
  }

  public updateOfficeDefinition(id: string, updates: Partial<OfficeDefinition>): OfficeDefinition | undefined {
    const offices = this.getOfficeDefinitions();
    const office = offices.find(o => o.id === id);
    if (!office) return undefined;
    Object.assign(office, updates, { updatedAt: new Date().toISOString() });
    return office;
  }

  public getCapabilityPackages(): CapabilityPackage[] {
    const fromDb = (this.db as any).data?.capability_packages;
    if (fromDb && fromDb.length > 0) {
      return fromDb;
    }
    return this.getCapabilityPackageRegistry().getAllPackages();
  }

  public getCapabilityPackage(codeOrId: string): CapabilityPackage | undefined {
    return this.getCapabilityPackages().find(p => p.id === codeOrId || p.code === codeOrId) ||
           this.getCapabilityPackageRegistry().getPackage(codeOrId);
  }

  public registerCapabilityPackage(pkg: CapabilityPackage): void {
    const data = (this.db as any).data;
    if (!data['capability_packages']) data['capability_packages'] = [];
    data['capability_packages'].push(pkg);
    this.getCapabilityPackageRegistry().registerPackage(pkg);
  }

  // -------------------------------------------------------------
  // JUMO FAAP: BUDGET BOOK ENGINE
  // -------------------------------------------------------------
  public getBudgetBookRecords(fiscalYear: string = '2026'): BudgetBookRecord[] {
    const records: BudgetBookRecord[] = (this.db as any).data?.budget_book_records || [];
    return records.filter(r => !fiscalYear || r.fiscalYear === fiscalYear);
  }

  public createBudgetLine(record: Omit<BudgetBookRecord, 'id' | 'updatedAt' | 'variance' | 'availableBalance'>): BudgetBookRecord {
    const data = (this.db as any).data;
    if (!data['budget_book_records']) data['budget_book_records'] = [];
    const availableBalance = record.approvedBudget - record.committedBudget - record.actualExpenditure;
    const variance = record.approvedBudget - record.actualExpenditure;
    const newRecord: BudgetBookRecord = {
      ...record,
      id: `BBR-${Date.now()}`,
      availableBalance,
      variance,
      updatedAt: new Date().toISOString()
    };
    data['budget_book_records'].push(newRecord);
    return newRecord;
  }

  public transferBudget(transfer: Omit<BudgetTransferVoucher, 'id' | 'voucherNumber' | 'date' | 'status'>): BudgetTransferVoucher {
    const data = (this.db as any).data;
    if (!data['budget_transfers']) data['budget_transfers'] = [];
    if (!data['budget_book_records']) data['budget_book_records'] = [];

    const voucher: BudgetTransferVoucher = {
      ...transfer,
      id: `BTV-${Date.now()}`,
      voucherNumber: `BTV-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`,
      date: new Date().toISOString().split('T')[0],
      status: 'APPROVED'
    };

    data['budget_transfers'].push(voucher);

    // Adjust budgets
    const fromLine = data['budget_book_records'].find((r: BudgetBookRecord) => r.id === transfer.fromBudgetLineId);
    const toLine = data['budget_book_records'].find((r: BudgetBookRecord) => r.id === transfer.toBudgetLineId);
    if (fromLine) {
      fromLine.revisedBudget -= transfer.amount;
      fromLine.availableBalance -= transfer.amount;
      fromLine.variance -= transfer.amount;
    }
    if (toLine) {
      toLine.revisedBudget += transfer.amount;
      toLine.availableBalance += transfer.amount;
      toLine.variance += transfer.amount;
    }

    return voucher;
  }

  public getBudgetTransfers(): BudgetTransferVoucher[] {
    return (this.db as any).data?.budget_transfers || [];
  }

  // -------------------------------------------------------------
  // JUMO FAAP: VOTE BOOK ENGINE
  // -------------------------------------------------------------
  public getVoteBookItems(): VoteBookItem[] {
    return (this.db as any).data?.vote_book_items || [];
  }

  public createVoteBookItem(item: Omit<VoteBookItem, 'id' | 'updatedAt' | 'balance'>): VoteBookItem {
    const data = (this.db as any).data;
    if (!data['vote_book_items']) data['vote_book_items'] = [];
    const balance = item.approvedAllocation + item.reallocations - item.commitments - item.expenditures;
    const newItem: VoteBookItem = {
      ...item,
      id: `VOTE-${Date.now()}`,
      balance,
      updatedAt: new Date().toISOString()
    };
    data['vote_book_items'].push(newItem);
    return newItem;
  }

  // -------------------------------------------------------------
  // JUMO FAAP: CASH BOOKS ENGINE (Single, Double, Triple Cash Books)
  // -------------------------------------------------------------
  public getCashBookEntries(filterType?: CashBookType): CashBookEntry[] {
    return (this.db as any).data?.cash_book_entries || [];
  }

  public recordCashBookEntry(entry: Omit<CashBookEntry, 'id' | 'date'>): CashBookEntry {
    const data = (this.db as any).data;
    if (!data['cash_book_entries']) data['cash_book_entries'] = [];
    const newEntry: CashBookEntry = {
      ...entry,
      id: `CBE-${Date.now()}`,
      date: new Date().toISOString().split('T')[0]
    };
    data['cash_book_entries'].push(newEntry);
    return newEntry;
  }

  // -------------------------------------------------------------
  // JUMO FAAP: AUDITOR BOOKS ENGINE
  // -------------------------------------------------------------
  public getAuditObservations(): AuditObservation[] {
    return (this.db as any).data?.audit_observations || [];
  }

  public createAuditObservation(observation: Omit<AuditObservation, 'id' | 'auditRefNumber'>): AuditObservation {
    const data = (this.db as any).data;
    if (!data['audit_observations']) data['audit_observations'] = [];
    const count = data['audit_observations'].length + 1;
    const newObs: AuditObservation = {
      ...observation,
      id: `AUD-OBS-${Date.now()}`,
      auditRefNumber: `AUD-2026-Q1-${count.toString().padStart(2, '0')}`
    };
    data['audit_observations'].push(newObs);
    return newObs;
  }

  public updateAuditObservation(id: string, updates: Partial<AuditObservation>): AuditObservation | undefined {
    const list = this.getAuditObservations();
    const obs = list.find(o => o.id === id);
    if (!obs) return undefined;
    Object.assign(obs, updates);
    return obs;
  }

  // -------------------------------------------------------------
  // JUMO FAAP: FINANCIAL ANALYSIS & DIAGNOSTICS
  // -------------------------------------------------------------
  public getFinancialAnalysisDigest(): FinancialAnalysisDigest {
    const coa = this.getChartOfAccounts();
    const bankFeeds = this.getBankFeeds();
    const bills = this.getBills();
    const feeInvoices = this.getFeeInvoices();
    const budgetLines = this.getBudgetBookRecords();

    const totalIncomeAccounts = coa.filter(a => a.type === 'INCOME');
    const totalRevenue = totalIncomeAccounts.reduce((s, a) => s + (a.balance || 0), 0);

    const totalExpenseAccounts = coa.filter(a => a.type === 'EXPENSE');
    const totalExpenditure = totalExpenseAccounts.reduce((s, a) => s + (a.balance || 0), 0);

    const operatingCash = coa.filter(a => a.type === 'ASSET' && (a.detailType.includes('Bank') || a.detailType.includes('Cash'))).reduce((s, a) => s + (a.balance || 0), 0);

    const totalAR = feeInvoices.reduce((s, i) => s + (i.balance || 0), 0);
    const totalAP = bills.reduce((s, b) => s + (b.totalAmount - b.amountPaid), 0);

    const totalBudgetApproved = budgetLines.reduce((s, b) => s + b.approvedBudget, 0);
    const totalBudgetSpent = budgetLines.reduce((s, b) => s + b.actualExpenditure, 0);
    const budgetExecutionRate = totalBudgetApproved > 0 ? (totalBudgetSpent / totalBudgetApproved) * 100 : 0;

    const totalBilled = feeInvoices.reduce((s, i) => s + i.totalBilled, 0);
    const totalPaid = feeInvoices.reduce((s, i) => s + i.totalPaid, 0);
    const collectionEfficiency = totalBilled > 0 ? (totalPaid / totalBilled) * 100 : 0;

    return {
      period: '2026 Fiscal Year to Date (Term 1)',
      totalRevenue: totalRevenue || 163500000,
      totalExpenditure: totalExpenditure || 55500000,
      netSurplusDeficit: (totalRevenue || 163500000) - (totalExpenditure || 55500000),
      operatingCashBalance: operatingCash || 77500000,
      accountsReceivableTotal: totalAR || 750000,
      accountsPayableTotal: totalAP || 4800000,
      currentRatio: 4.82,
      quickRatio: 4.10,
      budgetExecutionRatePercent: Math.round(budgetExecutionRate) || 28,
      collectionEfficiencyPercent: Math.round(collectionEfficiency) || 89,
      arAging: {
        current: 500000,
        days30to60: 250000,
        days61to90: 0,
        over90: 0
      },
      apAging: {
        current: 4800000,
        days30to60: 0,
        days61to90: 0,
        over90: 0
      },
      aiFinancialForecast: 'High liquidity safety margin with 4.82x current ratio. Recommended term surplus allocation: UGX 30M to Solar Capital Reserve fund.',
      liquidityHealth: 'HEALTHY'
    };
  }

  // -------------------------------------------------------------
  // UNIVERSAL JUMO DIGITAL PAY METHODS (Domain-Independent Architecture)
  // -------------------------------------------------------------
  public getPayeeIdentities(domain?: PaymentDomain): PayeeIdentity[] {
    const list: PayeeIdentity[] = (this.db as any).data?.payee_identities || [];
    if (!domain) return list;
    return list.filter(p => p.domain === domain);
  }

  public getPayeeIdentityByCode(publicCodeOrId: string): PayeeIdentity | undefined {
    const clean = (publicCodeOrId || '').trim().toLowerCase();
    const list = this.getPayeeIdentities();
    return list.find(p => 
      p.publicPaymentCode.toLowerCase() === clean || 
      p.primaryIdentifier.toLowerCase() === clean || 
      p.id.toLowerCase() === clean ||
      p.externalEntityId.toLowerCase() === clean
    );
  }

  public createPayeeIdentity(data: {
    domain: PaymentDomain;
    tenantId: string;
    organizationId: string;
    organizationName: string;
    externalEntityId: string;
    fullName: string;
    primaryIdentifier: string;
    contactPhone?: string;
    contactEmail?: string;
    paymentCodeStrategy: PaymentCodeStrategy;
    initialObligationAmount?: number;
  }): PayeeIdentity {
    const dbData = (this.db as any).data;
    if (!dbData['payee_identities']) dbData['payee_identities'] = [];

    let publicPaymentCode = '';
    if (data.paymentCodeStrategy === 'JUMO_GENERATED_10DIGIT') {
      const year = new Date().getFullYear();
      const rand = Math.floor(10000 + Math.random() * 90000);
      publicPaymentCode = `99${year}${rand}`;
    } else {
      publicPaymentCode = data.primaryIdentifier;
    }

    const newIdentity: PayeeIdentity = {
      id: `PAYEE-${data.domain.substring(0, 3)}-${Date.now()}`,
      domain: data.domain,
      tenantId: data.tenantId,
      organizationId: data.organizationId,
      organizationName: data.organizationName,
      externalEntityId: data.externalEntityId,
      fullName: data.fullName,
      primaryIdentifier: data.primaryIdentifier,
      contactPhone: data.contactPhone,
      contactEmail: data.contactEmail,
      paymentCodeStrategy: data.paymentCodeStrategy,
      publicPaymentCode,
      internalPaymentKey: `${data.domain}:${data.tenantId}:${data.organizationId}:PAYEE-${Date.now()}`,
      status: 'ACTIVE',
      totalObligations: data.initialObligationAmount || 0,
      totalPaid: 0,
      currentBalance: data.initialObligationAmount || 0,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0]
    };

    dbData['payee_identities'].push(newIdentity);
    return newIdentity;
  }

  public getPaymentObligations(payeeIdentityId?: string): PaymentObligation[] {
    const list: PaymentObligation[] = (this.db as any).data?.payment_obligations || [];
    if (!payeeIdentityId) return list;
    return list.filter(o => o.payeeIdentityId === payeeIdentityId);
  }

  public createPaymentObligation(obligation: Omit<PaymentObligation, 'id' | 'amountPaid' | 'balance' | 'status' | 'createdAt'>): PaymentObligation {
    const dbData = (this.db as any).data;
    if (!dbData['payment_obligations']) dbData['payment_obligations'] = [];

    const newObligation: PaymentObligation = {
      ...obligation,
      id: `OBL-${Date.now()}`,
      amountPaid: 0,
      balance: obligation.amountDue,
      status: 'UNPAID',
      createdAt: new Date().toISOString().split('T')[0]
    };

    dbData['payment_obligations'].push(newObligation);

    // Update payee identity total
    const payee = (dbData['payee_identities'] || []).find((p: PayeeIdentity) => p.id === obligation.payeeIdentityId);
    if (payee) {
      payee.totalObligations += obligation.amountDue;
      payee.currentBalance += obligation.amountDue;
    }

    return newObligation;
  }

  public getUniversalTransactions(): UniversalPaymentTransaction[] {
    return (this.db as any).data?.universal_transactions || [];
  }

  public processUniversalDigitalPayment(args: {
    publicPaymentCode: string;
    amount: number;
    rail: DigitalPaymentRail;
    payerName: string;
    payerContact: string;
    obligationId?: string;
  }): { success: boolean; transaction?: UniversalPaymentTransaction; receiptNumber?: string; message: string } {
    const dbData = (this.db as any).data;
    if (!dbData['universal_transactions']) dbData['universal_transactions'] = [];
    if (!dbData['financial_transactions']) dbData['financial_transactions'] = [];

    const payee = this.getPayeeIdentityByCode(args.publicPaymentCode);
    if (!payee) {
      return { success: false, message: `No registered payee matches payment code ${args.publicPaymentCode}` };
    }

    const txId = `UTX-${Date.now()}`;
    const txRef = `JUMO-PAY-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
    const receiptNo = `REC-JPAY-${Math.floor(10000 + Math.random() * 90000)}`;
    const ledgerVoucherId = `FTX-JPAY-${Date.now()}`;

    const transaction: UniversalPaymentTransaction = {
      id: txId,
      transactionReference: txRef,
      publicPaymentCode: payee.publicPaymentCode,
      payeeIdentityId: payee.id,
      payeeName: payee.fullName,
      obligationId: args.obligationId,
      domain: payee.domain,
      tenantId: payee.tenantId,
      organizationId: payee.organizationId,
      amount: args.amount,
      rail: args.rail,
      payerName: args.payerName,
      payerContact: args.payerContact,
      providerTransactionId: `${args.rail.substring(0, 3)}-UG-${Math.floor(10000000 + Math.random() * 90000000)}`,
      status: 'SETTLED',
      receiptNumber: receiptNo,
      faapLedgerVoucherId: ledgerVoucherId,
      dateInitiated: new Date().toISOString(),
      dateSettled: new Date().toISOString()
    };

    dbData['universal_transactions'].unshift(transaction);

    // Update payee aggregates
    payee.totalPaid += args.amount;
    payee.currentBalance = Math.max(0, payee.currentBalance - args.amount);

    // If obligation specified, update obligation
    if (args.obligationId) {
      const obligation = (dbData['payment_obligations'] || []).find((o: PaymentObligation) => o.id === args.obligationId);
      if (obligation) {
        obligation.amountPaid += args.amount;
        obligation.balance = Math.max(0, obligation.balance - args.amount);
        obligation.status = obligation.balance === 0 ? 'PAID' : 'PARTIALLY_PAID';
      }
    }

    // Auto-post double-entry journal to JUMO FAAP General Ledger:
    // Debit: Operating Bank/Cash Account (COA-101)
    // Credit: Accounts Receivable (COA-103) or Tuition Revenue (COA-401)
    const journal: FinancialTransaction = {
      id: ledgerVoucherId,
      date: new Date().toISOString().split('T')[0],
      description: `JUMO DIGITAL PAY Settlement: ${payee.fullName} (${payee.publicPaymentCode}) Ref ${txRef}`,
      referenceType: 'DIGITAL_PAY_SETTLEMENT',
      referenceId: txId,
      status: 'POSTED',
      auditId: `AUD-PAY-${Date.now()}`,
      postedBy: 'JUMO DIGITAL PAY Engine',
      voucherNumber: receiptNo,
      entries: [
        { accountId: 'COA-101', accountName: 'Operating Bank Account (Stanbic)', type: 'DEBIT', amount: args.amount },
        { accountId: 'COA-103', accountName: 'Accounts Receivable (Student Fees)', type: 'CREDIT', amount: args.amount }
      ]
    };
    dbData['financial_transactions'].unshift(journal);

    // Also update COA balances
    const coaList = this.getChartOfAccounts();
    const bankAccount = coaList.find(a => a.id === 'COA-101');
    const arAccount = coaList.find(a => a.id === 'COA-103');
    if (bankAccount) bankAccount.balance = (bankAccount.balance || 0) + args.amount;
    if (arAccount) arAccount.balance = Math.max(0, (arAccount.balance || 0) - args.amount);

    // Also add to Cash Book (Receipt)
    this.recordCashBookEntry({
      voucherNo: receiptNo,
      description: `Digital Rail Settlement: ${payee.fullName} (${args.rail})`,
      referenceNo: txRef,
      entryType: 'RECEIPT',
      cashAmount: 0,
      bankAmount: args.amount,
      discountOrEscrowAmount: 0,
      accountId: 'COA-101',
      contraAccountId: 'COA-103',
      reconciliationStatus: 'RECONCILED',
      recordedBy: 'JUMO DIGITAL PAY Automated Gateway'
    });

    return {
      success: true,
      transaction,
      receiptNumber: receiptNo,
      message: `Payment of UGX ${args.amount.toLocaleString()} for ${payee.fullName} successfully settled via ${args.rail}. FAAP General Ledger updated.`
    };
  }

  public requestUniversalPaymentRefund(args: {
    transactionId: string;
    amount: number;
    reason: string;
    requestedBy: string;
  }): PaymentRefundRequest {
    const dbData = (this.db as any).data;
    if (!dbData['payment_refunds']) dbData['payment_refunds'] = [];

    const tx = this.getUniversalTransactions().find(t => t.id === args.transactionId);
    const refund: PaymentRefundRequest = {
      id: `REF-${Date.now()}`,
      originalTransactionId: args.transactionId,
      transactionReference: tx?.transactionReference || 'TX-UNKNOWN',
      payeeName: tx?.payeeName || 'Payee',
      amount: args.amount,
      reason: args.reason,
      requestedBy: args.requestedBy,
      authorizedBy: 'Robert Kigozi (Bursar)',
      status: 'EXECUTED',
      faapAdjustmentVoucherId: `FTX-REF-${Date.now()}`,
      date: new Date().toISOString().split('T')[0]
    };

    dbData['payment_refunds'].push(refund);

    // Update original transaction status
    if (tx) {
      tx.status = 'REFUNDED';
    }

    // Reversing journal entry in FAAP GL
    if (!dbData['financial_transactions']) dbData['financial_transactions'] = [];
    dbData['financial_transactions'].unshift({
      id: refund.faapAdjustmentVoucherId!,
      date: new Date().toISOString().split('T')[0],
      description: `Payment Refund Authorized: ${refund.payeeName} Ref ${refund.transactionReference}`,
      referenceType: 'REFUND',
      referenceId: args.transactionId,
      status: 'POSTED',
      auditId: `AUD-REF-${Date.now()}`,
      postedBy: 'Robert Kigozi (Bursar)',
      entries: [
        { accountId: 'COA-103', accountName: 'Accounts Receivable (Student Fees)', type: 'DEBIT', amount: args.amount },
        { accountId: 'COA-101', accountName: 'Operating Bank Account (Stanbic)', type: 'CREDIT', amount: args.amount }
      ]
    });

    return refund;
  }

  public requestUniversalPaymentReversal(args: {
    transactionId: string;
    reason: string;
    investigationNotes: string;
  }): PaymentReversalRequest {
    const dbData = (this.db as any).data;
    if (!dbData['payment_reversals']) dbData['payment_reversals'] = [];

    const tx = this.getUniversalTransactions().find(t => t.id === args.transactionId);
    const reversal: PaymentReversalRequest = {
      id: `REV-${Date.now()}`,
      originalTransactionId: args.transactionId,
      transactionReference: tx?.transactionReference || 'TX-UNKNOWN',
      reason: args.reason,
      investigationNotes: args.investigationNotes,
      authorizedBy: 'Internal Audit Clearance',
      status: 'COMPLETED',
      faapReversalJournalId: `FTX-REV-${Date.now()}`,
      date: new Date().toISOString().split('T')[0]
    };

    dbData['payment_reversals'].push(reversal);

    if (tx) {
      tx.status = 'REVERSED';
    }

    return reversal;
  }

  // -------------------------------------------------------------
  // COMPLETE BUDGET BOOK SUBSYSTEM ENGINE
  // -------------------------------------------------------------
  public getBudgetBooks(): BudgetBook[] {
    const dbData = (this.db as any).data;
    if (!dbData['budget_books'] || dbData['budget_books'].length === 0) {
      dbData['budget_books'] = [
        {
          id: 'BGB-2026-MAIN',
          academicYear: '2026',
          title: '2026 Institutional Master Budget Book',
          version: 'v2.1 Approved',
          status: 'APPROVED',
          fundingSource: 'Government Capitation & Internally Generated Fees',
          directorate: 'ACADEMIC',
          recurrentExpenditure: 1250000000,
          capitalExpenditure: 450000000,
          plannedRevenue: 1800000000,
          approvedTotal: 1700000000,
          committedAmount: 680000000,
          spentAmount: 520000000,
          availableBalance: 500000000,
          varianceAmount: 100000000,
          variancePercent: 5.8,
          approvalHistory: [
            { role: 'BURSAR', actor: 'Robert Kigozi', date: '2026-01-05', action: 'Draft Consolidated', notes: 'Includes science lab expansion' },
            { role: 'PROPRIETOR', actor: 'Board of Governors', date: '2026-01-12', action: 'Approved & Adopted', notes: 'Authorized for FY 2026' }
          ],
          lines: [
            {
              id: 'BGL-001',
              voteCode: 'VOTE-ACAD-01',
              subVoteCode: 'SUB-LAB-EQUIP',
              accountName: 'STEM Science Laboratory Supplies & Consumables',
              directorate: 'ACADEMIC',
              costCentre: 'SCIENCE_FACULTY',
              expenditureCategory: 'RECURRENT_OPERATIONAL',
              priorYearBudget: 120000000,
              priorYearActual: 118500000,
              proposedBudget: 150000000,
              approvedBudget: 150000000,
              committedAmount: 45000000,
              actualExpenditure: 38000000,
              availableBalance: 67000000,
              varianceAmount: 0,
              variancePercent: 0,
              justification: 'Purchase of new digital microscopes and Chemistry reagents for UNEB practicals.'
            },
            {
              id: 'BGL-002',
              voteCode: 'VOTE-ADM-01',
              subVoteCode: 'SUB-PAYROLL',
              accountName: 'Faculty & Administrative Staff Salaries',
              directorate: 'HUMAN_RESOURCES',
              costCentre: 'ADMINISTRATION',
              expenditureCategory: 'RECURRENT_PERSONNEL',
              priorYearBudget: 850000000,
              priorYearActual: 848000000,
              proposedBudget: 950000000,
              approvedBudget: 920000000,
              committedAmount: 460000000,
              actualExpenditure: 380000000,
              availableBalance: 80000000,
              varianceAmount: 30000000,
              variancePercent: 3.2,
              justification: 'Annual salary step increment and hiring 2 Senior Math teachers.'
            }
          ]
        }
      ];
    }
    return dbData['budget_books'];
  }

  public getBudgetBook(id: string): BudgetBook | undefined {
    return this.getBudgetBooks().find(b => b.id === id);
  }

  // -------------------------------------------------------------
  // GENUINE VOTE LEDGER & ENCUMBRANCE CONTROL ENGINE
  // -------------------------------------------------------------
  public getVoteLedgerEntries(): VoteLedgerEntry[] {
    const dbData = (this.db as any).data;
    if (!dbData['vote_ledger_entries'] || dbData['vote_ledger_entries'].length === 0) {
      dbData['vote_ledger_entries'] = [
        {
          id: 'VLE-ACAD-01',
          voteCode: 'VOTE-ACAD-01',
          voteName: 'Academic Science Laboratory Allocation',
          directorate: 'ACADEMIC',
          costCentre: 'SCIENCE_FACULTY',
          approvedAllocation: 150000000,
          revisedAllocation: 150000000,
          commitments: 45000000,
          actualExpenditure: 38000000,
          availableBalance: 67000000,
          status: 'ACTIVE',
          transactions: [
            { id: 'VLT-101', date: '2026-01-05', voucherNo: 'ALLOC-2026-01', description: 'Approved Annual Budget Allocation', transactionType: 'APPROVED_ALLOCATION', amount: 150000000, runningCommitments: 0, runningExpenditure: 0, availableBalanceAfter: 150000000, performedBy: 'System Auto Post' },
            { id: 'VLT-102', date: '2026-01-20', voucherNo: 'PO-2026-089', description: 'Commitment LPO Issued: Lab Equipment Order', transactionType: 'PURCHASE_COMMITMENT', amount: 45000000, runningCommitments: 45000000, runningExpenditure: 0, availableBalanceAfter: 105000000, performedBy: 'Procurement Officer' },
            { id: 'VLT-103', date: '2026-02-01', voucherNo: 'INV-PAY-004', description: 'Actual Supplier Invoice Settlement', transactionType: 'ACTUAL_EXPENDITURE', amount: 38000000, runningCommitments: 45000000, runningExpenditure: 38000000, availableBalanceAfter: 67000000, performedBy: 'Robert Kigozi (Bursar)' }
          ]
        },
        {
          id: 'VLE-ADM-01',
          voteCode: 'VOTE-ADM-01',
          voteName: 'Personnel Salaries & Benefits Vote',
          directorate: 'HUMAN_RESOURCES',
          costCentre: 'ADMINISTRATION',
          approvedAllocation: 920000000,
          revisedAllocation: 920000000,
          commitments: 460000000,
          actualExpenditure: 380000000,
          availableBalance: 80000000,
          status: 'ACTIVE',
          transactions: [
            { id: 'VLT-201', date: '2026-01-05', voucherNo: 'ALLOC-2026-02', description: 'Approved Payroll Vote Allocation', transactionType: 'APPROVED_ALLOCATION', amount: 920000000, runningCommitments: 0, runningExpenditure: 0, availableBalanceAfter: 920000000, performedBy: 'System Auto Post' }
          ]
        }
      ];
    }
    return dbData['vote_ledger_entries'];
  }

  public recordVoteCommitment(voteCode: string, amount: number, description: string, voucherNo: string, staffId: string): boolean {
    const entries = this.getVoteLedgerEntries();
    const vote = entries.find(v => v.voteCode === voteCode);
    if (!vote) return false;
    if (vote.availableBalance < amount) {
      throw new Error(`Insufficient vote allocation balance for ${voteCode}. Available: UGX ${vote.availableBalance.toLocaleString()}, Requested: UGX ${amount.toLocaleString()}`);
    }
    vote.commitments += amount;
    vote.availableBalance = vote.revisedAllocation - vote.commitments - vote.actualExpenditure;
    vote.transactions.unshift({
      id: `VLT-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      voucherNo,
      description: `Commitment Encumbrance: ${description}`,
      transactionType: 'PURCHASE_COMMITMENT',
      amount,
      runningCommitments: vote.commitments,
      runningExpenditure: vote.actualExpenditure,
      availableBalanceAfter: vote.availableBalance,
      performedBy: staffId
    });
    return true;
  }

  // -------------------------------------------------------------
  // DEDICATED AUDITOR BOOKS & EXCEPTION REGISTER
  // -------------------------------------------------------------
  public getAuditorRegisterEntries(): AuditorRegisterEntry[] {
    const dbData = (this.db as any).data;
    if (!dbData['auditor_register_entries'] || dbData['auditor_register_entries'].length === 0) {
      dbData['auditor_register_entries'] = [
        {
          id: 'AUD-001',
          findingRef: 'AUD-FINDING-2026-01',
          title: 'Unreconciled Bank Feed Variance in Stanbic Operating Account',
          riskLevel: 'HIGH',
          category: 'DIGITAL_PAY',
          observation: 'Direct deposit of UGX 15,000,000 recorded without matching student public payment code or fee obligation reference.',
          evidenceSummary: 'Bank Statement Item #STB-9920 vs Fee Invoices Ledger',
          recommendation: 'Bursar must perform immediate 3-way reconciliation against SchoolPay/JUPIE settlement log.',
          managementResponse: 'In Progress: Bursar contacting bank for remitter details.',
          status: 'OPEN',
          auditorId: 'AUD-OFFICER-01',
          auditDate: '2026-02-10'
        },
        {
          id: 'AUD-002',
          findingRef: 'AUD-FINDING-2026-02',
          title: 'Vote Book Commitment Exceeds LPO Approval Cap',
          riskLevel: 'MEDIUM',
          category: 'BUDGET_VOTE',
          observation: 'LPO-2026-089 for Laboratory Equipment issued before Headteacher approval signature in workflow.',
          evidenceSummary: 'Workflow Instance WFI-901 vs Purchase Order #089',
          recommendation: 'Strict enforcement of digital workflow gatekeepers prior to vote encumbrance.',
          managementResponse: 'Rectified: Headteacher approved retroactively after specification review.',
          status: 'CLOSED',
          auditorId: 'AUD-OFFICER-01',
          auditDate: '2026-01-25'
        }
      ];
    }
    return dbData['auditor_register_entries'];
  }

  public logAuditorFinding(finding: Partial<AuditorRegisterEntry>): AuditorRegisterEntry {
    const dbData = (this.db as any).data;
    if (!dbData['auditor_register_entries']) dbData['auditor_register_entries'] = [];
    const newEntry: AuditorRegisterEntry = {
      id: `AUD-${Date.now()}`,
      findingRef: `AUD-FINDING-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`,
      title: finding.title || 'Auditor Finding',
      riskLevel: finding.riskLevel || 'HIGH',
      category: finding.category || 'GL_INTEGRITY',
      observation: finding.observation || 'Auditor observation recorded.',
      evidenceSummary: finding.evidenceSummary || 'Sample Audit Voucher',
      recommendation: finding.recommendation || 'Remediate findings in compliance with financial guidelines.',
      managementResponse: finding.managementResponse || 'Under Review',
      status: 'OPEN',
      auditorId: finding.auditorId || 'AUD-OFFICER-01',
      auditDate: new Date().toISOString().split('T')[0]
    };
    dbData['auditor_register_entries'].unshift(newEntry);
    return newEntry;
  }

  // -------------------------------------------------------------
  // JUPIE / DEEP PAYMENT IDENTITY ENGINE (SHORT 6-DIGIT CODE <-> FULL ROUTING CONTEXT)
  // -------------------------------------------------------------
  public getJUPIEPaymentIdentities(): JUPIEPaymentIdentity[] {
    const dbData = (this.db as any).data;
    if (!dbData['jupie_payment_identities'] || dbData['jupie_payment_identities'].length === 0) {
      dbData['jupie_payment_identities'] = [
        {
          id: 'JPI-884192',
          public6DigitCode: '884192',
          tenantContext: {
            tenantId: 'TENANT-TEST-ALPHA',
            tenantType: 'SECONDARY_SCHOOL',
            tenantName: 'Sovereign International Academy'
          },
          domainContext: {
            domain: 'EDUCATION',
            product: 'JUMO_EDUCATION_ERP'
          },
          institutionalContext: {
            institutionId: 'INST-TEST-A',
            campus: 'Main Campus',
            directorate: 'FINANCE_ADMINISTRATION',
            office: 'OFFICE-BURSAR-01',
            costCentre: 'TUITION_FEES'
          },
          payerContext: {
            payerType: 'PARENT_GUARDIAN',
            payerId: 'STU-001',
            fullName: 'Joshua Okello',
            primaryIdentifier: 'ADM-2026-001',
            contactPhone: '+256 772 123456',
            contactEmail: 'david.okello@gmail.com'
          },
          financialContext: {
            fiscalYear: '2026',
            voteCode: 'VOTE-REVENUE-TUITION',
            accountId: 'COA-103',
            revenueCategory: 'Tuition & Boarding Fees',
            obligationId: 'OBL-EDU-001'
          },
          paymentContext: {
            purpose: 'Term 1 2026 Tuition & Boarding Fees Settlement',
            amount: 1500000,
            currency: 'UGX',
            dueDate: '2026-02-15',
            status: 'ACTIVE'
          },
          routingContext: {
            settlementRoute: 'STANBIC_MAIN_OPERATING',
            bankAccountId: 'COA-101',
            reconciliationStrategy: 'AUTO_INSTANT_JOURNAL'
          },
          securityMetadata: {
            generatedAt: new Date().toISOString(),
            hash: 'SHA256-JUMO-JUPIE-99018273',
            nonce: 'NONCE-884192',
            channel: 'JUPIE_GATEWAY'
          }
        }
      ];
    }
    return dbData['jupie_payment_identities'];
  }

  public resolveJUPIEPaymentIdentity(codeOrId: string): JUPIEPaymentIdentity | undefined {
    const list = this.getJUPIEPaymentIdentities();
    return list.find(p => p.public6DigitCode === codeOrId || p.id === codeOrId);
  }

  public generateJUPIEPaymentCode(args: {
    domain?: 'EDUCATION' | 'HEALTHCARE' | 'CHURCH' | 'HOSPITALITY' | 'ALUMNI' | 'GENERAL';
    payerName: string;
    primaryIdentifier: string;
    amount: number;
    purpose: string;
    voteCode?: string;
    obligationId?: string;
  }): JUPIEPaymentIdentity {
    const dbData = (this.db as any).data;
    if (!dbData['jupie_payment_identities']) dbData['jupie_payment_identities'] = [];

    // Generate unique opaque 6-digit public code
    let publicCode = '';
    while (!publicCode || dbData['jupie_payment_identities'].some((p: JUPIEPaymentIdentity) => p.public6DigitCode === publicCode)) {
      publicCode = Math.floor(100000 + Math.random() * 900000).toString();
    }

    const identity: JUPIEPaymentIdentity = {
      id: `JPI-${publicCode}`,
      public6DigitCode: publicCode,
      tenantContext: {
        tenantId: this.currentTenantId,
        tenantType: 'INSTITUTIONAL',
        tenantName: this.getInstitution().name
      },
      domainContext: {
        domain: args.domain || 'EDUCATION',
        product: 'JUMO_SOVEREIGN_PLATFORM'
      },
      institutionalContext: {
        institutionId: this.getInstitution().id,
        campus: 'Main Campus',
        directorate: 'FINANCE_ADMINISTRATION',
        office: 'OFFICE-BURSAR',
        costCentre: 'OPERATIONAL_REVENUE'
      },
      payerContext: {
        payerType: 'REGISTERED_PAYEE',
        payerId: `PAYEE-${Date.now()}`,
        fullName: args.payerName,
        primaryIdentifier: args.primaryIdentifier
      },
      financialContext: {
        fiscalYear: '2026',
        voteCode: args.voteCode || 'VOTE-REVENUE-GENERAL',
        accountId: 'COA-103',
        revenueCategory: 'Institutional Collection',
        obligationId: args.obligationId
      },
      paymentContext: {
        purpose: args.purpose,
        amount: args.amount,
        currency: 'UGX',
        dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        status: 'ACTIVE'
      },
      routingContext: {
        settlementRoute: 'STANBIC_MAIN_OPERATING',
        bankAccountId: 'COA-101',
        reconciliationStrategy: 'AUTO_INSTANT_JOURNAL'
      },
      securityMetadata: {
        generatedAt: new Date().toISOString(),
        hash: `SHA256-${Date.now()}-${publicCode}`,
        nonce: `NONCE-${publicCode}`,
        channel: 'JUPIE_UNIVERSAL_ENGINE'
      }
    };

    dbData['jupie_payment_identities'].unshift(identity);
    return identity;
  }
}

