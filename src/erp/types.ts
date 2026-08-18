// JUMO Independent Secondary School ERP — Authoritative Types & Institutional Architecture 2026

export type StakeholderClassification = 
  | 'STUDENT_LEARNER'
  | 'ACADEMIC_FACULTY'
  | 'STUDENT_INFORMATION_MANAGEMENT'
  | 'FINANCE_ADMINISTRATION'
  | 'INSTITUTIONAL_MANAGEMENT'
  | 'EXTERNAL_STAKEHOLDER';

export type SchoolDirectorate = 
  | 'GOVERNANCE'
  | 'EXECUTIVE_ADMIN'
  | 'ACADEMICS'
  | 'EXAMINATIONS'
  | 'STUDENT_AFFAIRS'
  | 'ADMISSIONS'
  | 'FINANCE'
  | 'HR_ADMIN'
  | 'ICT'
  | 'LIBRARY'
  | 'BOARDING'
  | 'TRANSPORT'
  | 'PROCUREMENT'
  | 'STORES'
  | 'FACILITIES'
  | 'AGRICULTURE'
  | 'HEALTH'
  | 'COUNSELLING'
  | 'COMMUNICATIONS'
  | 'EXTERNAL_RELATIONS';

// 50+ Configurable Institutional Roles across all Stakeholder Classifications
export type UserRole = 
  // 1. Student and learner ecosystem (13 roles)
  | 'STUDENT'
  | 'PROSPECTIVE_STUDENT'
  | 'APPLICANT'
  | 'NEW_STUDENT'
  | 'CONTINUING_STUDENT'
  | 'GRADUATING_STUDENT'
  | 'EXCHANGE_STUDENT'
  | 'INTERNATIONAL_STUDENT'
  | 'DISTANCE_ONLINE_STUDENT'
  | 'SHORT_COURSE_STUDENT'
  | 'STUDENT_REPRESENTATIVE'
  | 'STUDENT_ORG_OFFICER'
  | 'ALUMNI'
  // 2. Academic ecosystem (15 roles)
  | 'LECTURER'
  | 'PROFESSOR'
  | 'TUTOR'
  | 'TEACHING_ASSISTANT'
  | 'COURSE_COORDINATOR'
  | 'DEPARTMENT_ACADEMIC_OFFICER'
  | 'HOD'
  | 'DEAN'
  | 'FACULTY_ADMINISTRATOR'
  | 'ACADEMIC_REGISTRAR'
  | 'EXAM_OFFICER'
  | 'ACADEMIC_QUALITY_OFFICER'
  | 'CURRICULUM_ADMINISTRATOR'
  | 'RESEARCHER'
  | 'RESEARCH_SUPERVISOR'
  | 'TEACHER'
  // 3. Student Information Management (12 roles)
  | 'ADMISSIONS_OFFICER'
  | 'ADMISSIONS_MANAGER'
  | 'REGISTRAR'
  | 'STUDENT_RECORDS_OFFICER'
  | 'ENROLLMENT_OFFICER'
  | 'ACADEMIC_RECORDS_OFFICER'
  | 'EXAM_ADMINISTRATOR'
  | 'GRADUATION_OFFICER'
  | 'STUDENT_SUPPORT_OFFICER'
  | 'COUNSELLOR'
  | 'ACCOMMODATION_OFFICER'
  | 'LIBRARIAN'
  // 4. Finance and administration (12 roles)
  | 'BURSAR'
  | 'FINANCE_OFFICER'
  | 'ACCOUNTANT'
  | 'ACCOUNTS_RECEIVABLE_OFFICER'
  | 'ACCOUNTS_PAYABLE_OFFICER'
  | 'CASHIER'
  | 'PAYROLL_OFFICER'
  | 'PROCUREMENT_OFFICER'
  | 'PROCUREMENT_MANAGER'
  | 'ASSET_OFFICER'
  | 'INTERNAL_AUDITOR'
  | 'FINANCE_MANAGER'
  // 5. Institutional management (15 roles)
  | 'PROPRIETOR'
  | 'BOARD_MEMBER'
  | 'HEADTEACHER'
  | 'PRINCIPAL'
  | 'DEPUTY_PRINCIPAL'
  | 'DEPUTY_ACADEMIC'
  | 'DEPUTY_ADMIN'
  | 'CHIEF_ADMIN_OFFICER'
  | 'HR_OFFICER'
  | 'HR_MANAGER'
  | 'ICT_OFFICER'
  | 'ICT_ADMIN'
  | 'COMPLIANCE_OFFICER'
  | 'LEGAL_OFFICER'
  | 'COMMUNICATIONS_OFFICER'
  | 'QUALITY_ASSURANCE_MANAGER'
  | 'ESTATES_OFFICER'
  | 'SECURITY_OFFICER'
  | 'SYSTEM_ADMIN'
  // 6. External stakeholders (10 roles)
  | 'PARENT'
  | 'GENERAL_PUBLIC_USER'
  | 'EMPLOYER_PLACEMENT_PARTNER'
  | 'VENDOR_SUPPLIER'
  | 'REGULATORY_STAKEHOLDER'
  | 'DONOR_SPONSOR'
  | 'STRATEGIC_PARTNER'
  | 'EXTERNAL_RESEARCHER'
  | 'SERVICE_PROVIDER'
  | 'INSTITUTIONAL_GUEST';

export interface RoleProfileDefinition {
  code: UserRole;
  name: string;
  classification: StakeholderClassification;
  directorate?: SchoolDirectorate;
  defaultOfficeCode?: string;
  description: string;
  defaultCapabilityCodes: string[];
  isAdministrative: boolean;
}

export interface PermissionDefinition {
  id: string;
  code: string;
  name: string;
  scope: 'READ' | 'WRITE' | 'APPROVE' | 'AUDIT' | 'ADMIN';
  domain: 'FINANCE' | 'ACADEMIC' | 'SIS' | 'HR' | 'OPERATIONS' | 'GOVERNANCE' | 'EXTERNAL';
}

export interface Tenant {
  id: string;
  name: string;
  domain: string;
  status: 'ACTIVE' | 'SUSPENDED';
  createdAt: string;
}

export interface InstitutionProfile {
  id: string;
  tenantId: string;
  name: string;
  emisCode: string;
  motto: string;
  logoUrl?: string;
  address: string;
  district: string;
  country: string;
  phone: string;
  email: string;
  currentAcademicYear: string;
  currentTerm: 'Term 1' | 'Term 2' | 'Term 3';
  currency: string;
  boardingEnabled: boolean;
  transportEnabled: boolean;
  farmEnabled: boolean;
  healthUnitEnabled: boolean;
  createdAt: string;
}

export interface Campus {
  id: string;
  institutionId: string;
  name: string;
  location: string;
  headStaffId?: string;
  contactPhone: string;
}

export interface Capability {
  id: string;
  code: string;
  name: string;
  description: string;
  category: 'CORE' | 'ADMIN' | 'FINANCE' | 'ACADEMIC' | 'SUPPORT' | 'SIS' | 'EXTERNAL';
}

export interface ModuleRegistryEntry {
  id: string;
  capabilityId: string;
  name: string;
  componentKey: string;
  icon?: string;
  description?: string;
  requiredPermissions?: string[];
}

export interface InstitutionalOffice {
  id: string;
  institutionId: string;
  campusId?: string;
  directorate: SchoolDirectorate;
  name: string;
  code: string;
  description: string;
  headPosition: string;
  responsibilities: string[];
  capabilityIds: string[]; // Resolved from Registry
}

export interface OfficerAssignment {
  id: string;
  staffId: string;
  officeId: string;
  positionTitle: string;
  assignedDate: string;
  status: 'ACTIVE' | 'RELIEVED';
}

export interface Department {
  id: string;
  institutionId: string;
  directorate: SchoolDirectorate;
  name: string;
  headStaffId?: string;
  description: string;
}

export interface StaffMember {
  id: string;
  employeeNo: string;
  fullName: string;
  email: string;
  phone: string;
  directorate: SchoolDirectorate;
  departmentId: string;
  officeId?: string;
  role: UserRole;
  qualification: string;
  hireDate: string;
  status: 'ACTIVE' | 'ON_LEAVE' | 'SUSPENDED' | 'EXITED';
}

export interface Student {
  id: string;
  admissionNo: string;
  fullName: string;
  gender: 'MALE' | 'FEMALE';
  dateOfBirth: string;
  classLevel: string; // e.g. "S.1", "S.2", ... "S.6"
  stream: string;     // e.g. "East", "West", "Science A"
  guardianName: string;
  guardianPhone: string;
  guardianEmail: string;
  boardingStatus: 'BOARDER' | 'DAY';
  hostelRoom?: string;
  admissionDate: string;
  status: 'PROSPECTIVE' | 'ADMITTED' | 'ACTIVE' | 'SUSPENDED' | 'GRADUATED' | 'WITHDRAWN';
  feeBalance?: number;
  attendanceRate?: number;
  averageGrade?: string;
}

export interface Subject {
  id: string;
  code: string;
  name: string;
  category: 'SCIENCES' | 'HUMANITIES' | 'BUSINESS' | 'LANGUAGES' | 'TECHNICAL';
  isCompulsory: boolean;
  departmentId: string;
  credits?: number;
}

export interface AssessmentRecord {
  id: string;
  studentId: string;
  subjectId: string;
  subjectName?: string;
  term: string;
  academicYear: string;
  cat1Score: number; // out of 20
  cat2Score: number; // out of 20
  examScore: number; // out of 60
  totalScore: number; // out of 100
  grade: string; // A, B, C, D, E, F
  remarks: string;
  recordedByStaffId: string;
  verified: boolean;
}

export interface TimetableEntry {
  id: string;
  classLevel: string;
  stream: string;
  dayOfWeek: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday';
  period: string; // e.g. "08:00 - 08:45"
  subjectCode: string;
  subjectName: string;
  teacherName: string;
  room: string;
}

export interface HostelAccommodation {
  id: string;
  hostelName: string;
  roomNumber: string;
  capacity: number;
  occupied: number;
  gender: 'MALE' | 'FEMALE';
  wardenName: string;
  residentStudentIds: string[];
}

export interface LibraryBook {
  id: string;
  isbn: string;
  title: string;
  author: string;
  category: string;
  copiesAvailable: number;
  totalCopies: number;
  locationShelf: string;
}

export interface LibraryLoan {
  id: string;
  bookId: string;
  bookTitle: string;
  studentId: string;
  studentName: string;
  issueDate: string;
  dueDate: string;
  returnDate?: string;
  status: 'ACTIVE' | 'RETURNED' | 'OVERDUE';
}

export interface AttendanceRecord {
  id: string;
  date: string;
  targetType: 'STUDENT' | 'STAFF';
  targetId: string;
  targetName: string;
  classLevel?: string;
  status: 'PRESENT' | 'ABSENT' | 'LATE' | 'EXCUSED';
  remarks?: string;
}

export interface DisciplineCase {
  id: string;
  studentId: string;
  studentName: string;
  incidentDate: string;
  category: 'ATTENDANCE' | 'INSUBORDINATION' | 'PROPERTY_DAMAGE' | 'THEFT' | 'OTHER';
  description: string;
  reportedByStaffId: string;
  actionTaken: string;
  status: 'OPEN' | 'INVESTIGATING' | 'RESOLVED' | 'CLOSED';
}

// -------------------------------------------------------------
// DYNAMIC ORGANIZATIONAL HIERARCHY & OFFICE REGISTRY
// -------------------------------------------------------------

export type OrgUnitType = 
  | 'FACULTY' 
  | 'SCHOOL' 
  | 'DIRECTORATE' 
  | 'DEPARTMENT' 
  | 'DIVISION' 
  | 'SECTION' 
  | 'UNIT' 
  | 'COMMITTEE' 
  | 'CENTRE' 
  | 'SERVICE_CENTRE';

export interface OrganizationalUnit {
  id: string;
  code: string;
  name: string;
  type: OrgUnitType;
  parentUnitId?: string;
  tenantId: string;
  institutionId: string;
  domain: string;
  headStaffId?: string;
  headTitle?: string;
  description: string;
  status: 'ACTIVE' | 'ARCHIVED';
  createdAt: string;
}

export type OfficeType = 
  | 'EXECUTIVE' 
  | 'ACADEMIC' 
  | 'ADMINISTRATIVE' 
  | 'FINANCIAL' 
  | 'OPERATIONAL' 
  | 'SUPPORT' 
  | 'STUDENT_FACING' 
  | 'EXTERNAL_FACING' 
  | 'REGULATORY';

export interface OfficeDefinition {
  id: string;
  code: string;
  name: string;
  officeType: OfficeType;
  description: string;
  parentOrgUnitId: string;
  parentOrgUnitName?: string;
  institutionId: string;
  tenantId: string;
  domain: string;
  responsibleRoles: UserRole[];
  headPosition?: string;
  headStaffId?: string;
  capabilityPackageCodes?: string[];
  capabilityCodes: string[];
  moduleCodes: string[];
  formCodes: string[];
  workflowCodes: string[];
  reportCodes: string[];
  aiServiceCodes: string[];
  permissions: string[];
  status: 'ACTIVE' | 'ARCHIVED';
  createdAt: string;
  updatedAt: string;
}

export interface ResolvedOfficeConfig {
  capabilities: Capability[];
  modules: ModuleRegistryEntry[];
  forms: FormDefinition[];
  workflows: WorkflowDefinition[];
  reports: ReportDefinition[];
  aiServices: AIServiceDefinition[];
  permissions: string[];
}

export interface CapabilityPackage {
  id: string;
  code: string;
  name: string;
  category: 'CORE' | 'FINANCE' | 'SIS' | 'ACADEMIC' | 'OPERATIONS' | 'GOVERNANCE' | 'HR' | 'EXTERNAL' | 'UNIVERSAL_PAY';
  description: string;
  capabilityCodes: string[];
  defaultModuleCodes: string[];
  defaultFormCodes: string[];
  defaultWorkflowCodes: string[];
  defaultReportCodes: string[];
  defaultAICodes: string[];
}

// -------------------------------------------------------------
// FINANCE OFFICE — JUMO FAAP MINIMUM STANDARD ARCHITECTURE
// -------------------------------------------------------------

export interface ChartOfAccount {
  id: string;
  code: string;
  name: string;
  type: 'ASSET' | 'LIABILITY' | 'EQUITY' | 'INCOME' | 'EXPENSE';
  detailType: string;
  parentAccountId?: string;
  currency: string;
  status: 'ACTIVE' | 'ARCHIVED';
  balance: number;
  description?: string;
}

export interface TransactionEntry {
  accountId: string;
  accountName?: string;
  type: 'DEBIT' | 'CREDIT';
  amount: number;
}

export interface FinancialTransaction {
  id: string;
  date: string;
  description: string;
  entries: TransactionEntry[];
  referenceType: 'INVOICE' | 'RECEIPT' | 'BILL' | 'PAYMENT' | 'JOURNAL' | 'TRANSFER' | 'DIGITAL_PAY_SETTLEMENT' | 'REFUND' | 'REVERSAL';
  referenceId?: string;
  status: 'PENDING' | 'POSTED' | 'VOIDED';
  auditId: string;
  postedBy?: string;
  voucherNumber?: string;
}

// 1. Budget Book / Budget Recorder Architecture
export interface BudgetBookRecord {
  id: string;
  fiscalYear: string;
  budgetLineCode: string;
  budgetLineName: string;
  departmentId: string;
  departmentName: string;
  officeCode: string;
  category: 'CAPITAL' | 'RECURRENT' | 'DEVELOPMENT' | 'SPECIAL_PROJECT' | 'PERSONNEL' | 'ACADEMIC_OPS';
  approvedBudget: number;
  revisedBudget: number;
  committedBudget: number;
  actualExpenditure: number;
  availableBalance: number;
  variance: number;
  status: 'DRAFT' | 'APPROVED' | 'REVISED' | 'FROZEN';
  linkedGlAccountId?: string;
  updatedAt: string;
}

export interface BudgetTransferVoucher {
  id: string;
  voucherNumber: string;
  fromBudgetLineId: string;
  fromBudgetLineName: string;
  toBudgetLineId: string;
  toBudgetLineName: string;
  amount: number;
  reason: string;
  authorizedBy: string;
  date: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
}

// 2. Vote Book Architecture (Institutional / Public Vote Control)
export interface VoteBookItem {
  id: string;
  voteCode: string;
  subVoteCode: string;
  title: string;
  departmentId: string;
  departmentName: string;
  approvedAllocation: number;
  commitments: number;
  expenditures: number;
  balance: number;
  reallocations: number;
  encumbrances: number;
  linkedLpoCount: number;
  status: 'ACTIVE' | 'EXHAUSTED' | 'LOCKED';
  updatedAt: string;
}

// 3. Cash Books Architecture (Single, Double, and Triple Cash Books)
export type CashBookType = 'SINGLE' | 'DOUBLE' | 'TRIPLE';

export interface CashBookEntry {
  id: string;
  date: string;
  voucherNo: string;
  description: string;
  referenceNo: string;
  entryType: 'RECEIPT' | 'PAYMENT' | 'CONTRA' | 'DEPOSIT' | 'WITHDRAWAL';
  cashAmount: number;
  bankAmount: number;
  cashBookType?: 'SINGLE' | 'DOUBLE' | 'TRIPLE';
  discountOrEscrowAmount?: number;
  accountId: string;
  contraAccountId?: string;
  reconciliationStatus: 'UNRECONCILED' | 'RECONCILED';
  recordedBy: string;
}

// 4. Auditor Books Architecture
export interface AuditObservation {
  id: string;
  auditRefNumber: string;
  auditPeriod: string;
  departmentId: string;
  departmentName: string;
  officeCode: string;
  category: 'CONTROL_TEST' | 'PROCUREMENT_COMPLIANCE' | 'REVENUE_LEAKAGE' | 'INVENTORY_DISCREPANCY' | 'STATUTORY_DEFICIT' | 'PAYMENT_INTEGRITY';
  observationDetails: string;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  criteria: string;
  financialImpact: number;
  rootCause: string;
  recommendation: string;
  managementResponse?: string;
  responsibleOfficer?: string;
  status: 'OPEN' | 'UNDER_REVIEW' | 'RESOLVED' | 'ESCALATED';
  evidenceDocuments?: string[];
  resolutionDate?: string;
  auditorStaffId: string;
}

// 5. Financial Analysis & Diagnostics
export interface FinancialAnalysisDigest {
  period: string;
  totalRevenue: number;
  totalExpenditure: number;
  netSurplusDeficit: number;
  operatingCashBalance: number;
  accountsReceivableTotal: number;
  accountsPayableTotal: number;
  currentRatio: number;
  quickRatio: number;
  budgetExecutionRatePercent: number;
  collectionEfficiencyPercent: number;
  arAging: {
    current: number;
    days30to60: number;
    days61to90: number;
    over90: number;
  };
  apAging: {
    current: number;
    days30to60: number;
    days61to90: number;
    over90: number;
  };
  aiFinancialForecast: string;
  liquidityHealth: 'HEALTHY' | 'MODERATE' | 'CRITICAL';
}

// -------------------------------------------------------------
// UNIVERSAL JUMO DIGITAL PAY — DOMAIN-INDEPENDENT PAYMENT ENGINE
// -------------------------------------------------------------

export type PaymentDomain = 
  | 'EDUCATION' 
  | 'HEALTHCARE' 
  | 'HOSPITALITY' 
  | 'CHURCH' 
  | 'ALUMNI' 
  | 'CLAN_FAMILY' 
  | 'NGO' 
  | 'GOVERNMENT' 
  | 'RETAIL' 
  | 'ENTERPRISE';

export type PaymentCodeStrategy = 
  | 'JUMO_GENERATED_10DIGIT' 
  | 'ADMISSION_NO' 
  | 'REGISTRATION_NO' 
  | 'PATIENT_NO' 
  | 'MEMBER_NO' 
  | 'CUSTOMER_NO' 
  | 'ACCOUNT_NO' 
  | 'BOOKING_NO' 
  | 'CUSTOM_IDENTIFIER';

export interface PayeeIdentity {
  id: string;
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
  publicPaymentCode: string;
  internalPaymentKey: string;
  status: 'ACTIVE' | 'SUSPENDED' | 'REPLACED' | 'EXPIRED' | 'ARCHIVED';
  totalObligations: number;
  totalPaid: number;
  currentBalance: number;
  createdAt: string;
  updatedAt: string;
}

export interface PaymentObligation {
  id: string;
  payeeIdentityId: string;
  payeeName: string;
  publicPaymentCode: string;
  domain: PaymentDomain;
  tenantId: string;
  organizationId: string;
  title: string;
  category: string;
  amountDue: number;
  amountPaid: number;
  balance: number;
  dueDate: string;
  status: 'UNPAID' | 'PARTIALLY_PAID' | 'PAID' | 'WAIVED' | 'CANCELLED';
  faapReceivableAccountId: string;
  faapIncomeAccountId: string;
  createdAt: string;
}

export interface UniversalPaymentTransaction {
  id: string;
  transactionReference: string;
  publicPaymentCode: string;
  payeeIdentityId: string;
  payeeName: string;
  obligationId?: string;
  domain: PaymentDomain;
  tenantId: string;
  organizationId: string;
  amount: number;
  rail: DigitalPaymentRail;
  payerName: string;
  payerContact: string;
  providerTransactionId: string;
  status: 'INITIATED' | 'PROCESSING' | 'SETTLED' | 'REFUNDED' | 'REVERSED' | 'FAILED';
  receiptNumber: string;
  faapLedgerVoucherId: string;
  dateInitiated: string;
  dateSettled?: string;
  reconciliationBatchId?: string;
}

export interface PaymentRefundRequest {
  id: string;
  originalTransactionId: string;
  transactionReference: string;
  payeeName: string;
  amount: number;
  reason: string;
  requestedBy: string;
  authorizedBy?: string;
  status: 'PENDING' | 'APPROVED' | 'EXECUTED' | 'REJECTED';
  faapAdjustmentVoucherId?: string;
  date: string;
}

export interface PaymentReversalRequest {
  id: string;
  originalTransactionId: string;
  transactionReference: string;
  reason: string;
  investigationNotes: string;
  authorizedBy?: string;
  status: 'PENDING' | 'COMPLETED' | 'REJECTED';
  faapReversalJournalId?: string;
  date: string;
}

export interface FeeInvoice {
  id: string;
  invoiceNumber: string;
  studentId: string;
  studentName?: string;
  classLevel?: string;
  term: string;
  academicYear: string;
  items: { description: string; amount: number; accountId?: string }[];
  totalBilled: number;
  totalPaid: number;
  balance: number;
  status: 'UNPAID' | 'PARTIAL' | 'PAID' | 'VOIDED';
  dateIssued: string;
  dueDate: string;
}

export interface FeePaymentReceipt {
  id: string;
  receiptNumber: string;
  invoiceId: string;
  studentId: string;
  studentName?: string;
  amount: number;
  paymentMethod: 'CASH' | 'BANK_TRANSFER' | 'MOBILE_MONEY' | 'CHEQUE' | 'SCHOOLPAY_DIGITAL' | 'JUMO_DIGITAL_PAY';
  referenceCode: string;
  date: string;
  receivedByStaffId: string;
  status: 'CLEARED' | 'PENDING' | 'RECONCILED';
}

export type DigitalPaymentRail = 
  | 'MTN_MOMO'
  | 'AIRTEL_MONEY'
  | 'VISA_MASTERCARD'
  | 'BANK_DIRECT'
  | 'SCHOOLPAY_PAYCODE'
  | 'JUMO_PAYCODE';

export interface SchoolPayTransaction {
  id: string;
  transactionReference: string;
  payCode: string;
  studentId: string;
  studentName: string;
  admissionNo: string;
  amount: number;
  channel: DigitalPaymentRail;
  providerTransactionId: string;
  status: 'INITIATED' | 'PROCESSING' | 'SETTLED' | 'RECONCILED' | 'FAILED' | 'REVERSED';
  payerPhoneOrAccount: string;
  payerName: string;
  dateInitiated: string;
  dateSettled?: string;
  feeCategory: string;
  receiptNumber: string;
  ledgerVoucherId: string;
  reconciliationBatchId?: string;
  bankAccountId: string;
}

// Digital Pay Transaction Alias for JUMO DIGITAL PAY
export type DigitalPayTransaction = SchoolPayTransaction;
export type DigitalPaySettlementBatch = SchoolPaySettlementBatch;

// -------------------------------------------------------------
// JUPIE / UNIVERSAL DIGITAL PAY DEEP PAYMENT IDENTITY CONTRACTS
// -------------------------------------------------------------

export interface JUPIEPaymentIdentity {
  id: string;
  public6DigitCode: string; // 6-digit opaque short reference (e.g. "884192")
  tenantContext: {
    tenantId: string;
    tenantType: string;
    tenantName: string;
  };
  domainContext: {
    domain: 'EDUCATION' | 'HEALTHCARE' | 'CHURCH' | 'HOSPITALITY' | 'ALUMNI' | 'GENERAL';
    product: string;
  };
  institutionalContext: {
    institutionId: string;
    campus: string;
    directorate: string;
    office: string;
    costCentre: string;
  };
  payerContext: {
    payerType: string;
    payerId: string;
    fullName: string;
    primaryIdentifier: string;
    contactPhone?: string;
    contactEmail?: string;
  };
  financialContext: {
    fiscalYear: string;
    voteCode: string;
    accountId: string;
    revenueCategory: string;
    obligationId?: string;
  };
  paymentContext: {
    purpose: string;
    amount: number;
    currency: string;
    dueDate: string;
    status: 'ACTIVE' | 'SETTLED' | 'EXPIRED' | 'CANCELLED';
  };
  routingContext: {
    settlementRoute: string;
    bankAccountId: string;
    reconciliationStrategy: string;
  };
  securityMetadata: {
    generatedAt: string;
    hash: string;
    nonce: string;
    channel: string;
  };
}

// -------------------------------------------------------------
// COMPLETE BUDGET BOOK & VOTE LEDGER SUBSYSTEM CONTRACTS
// -------------------------------------------------------------

export interface BudgetBookLine {
  id: string;
  voteCode: string;
  subVoteCode?: string;
  accountName: string;
  directorate: SchoolDirectorate;
  costCentre: string;
  expenditureCategory: 'RECURRENT_PERSONNEL' | 'RECURRENT_OPERATIONAL' | 'CAPITAL_DEVELOPMENT';
  priorYearBudget: number;
  priorYearActual: number;
  proposedBudget: number;
  approvedBudget: number;
  committedAmount: number;
  actualExpenditure: number;
  availableBalance: number;
  varianceAmount: number;
  variancePercent: number;
  justification: string;
}

export interface BudgetBook {
  id: string;
  academicYear: string;
  title: string;
  version: string;
  status: 'DRAFT' | 'DEPARTMENT_SUBMITTED' | 'CONSOLIDATED' | 'APPROVED' | 'ACTIVE' | 'REVISED' | 'ARCHIVED';
  fundingSource: string;
  directorate: SchoolDirectorate;
  recurrentExpenditure: number;
  capitalExpenditure: number;
  plannedRevenue: number;
  approvedTotal: number;
  committedAmount: number;
  spentAmount: number;
  availableBalance: number;
  varianceAmount: number;
  variancePercent: number;
  lines: BudgetBookLine[];
  approvalHistory: {
    role: string;
    actor: string;
    date: string;
    action: string;
    notes?: string;
  }[];
}

export interface VoteLedgerTransaction {
  id: string;
  date: string;
  voucherNo: string;
  description: string;
  transactionType: 'APPROVED_ALLOCATION' | 'SUPPLEMENTARY_VIREMENT' | 'PURCHASE_COMMITMENT' | 'ACTUAL_EXPENDITURE' | 'REVERSAL';
  amount: number;
  runningCommitments: number;
  runningExpenditure: number;
  availableBalanceAfter: number;
  performedBy: string;
}

export interface VoteLedgerEntry {
  id: string;
  voteCode: string;
  voteName: string;
  directorate: SchoolDirectorate;
  costCentre: string;
  approvedAllocation: number;
  revisedAllocation: number;
  commitments: number; // Encumbrances / Active LPOs
  actualExpenditure: number;
  availableBalance: number; // Revised - Commitments - Expenditure
  status: 'ACTIVE' | 'EXHAUSTED' | 'FROZEN';
  transactions: VoteLedgerTransaction[];
}

// -------------------------------------------------------------
// DEDICATED AUDITOR BOOKS & EXCEPTION REGISTER
// -------------------------------------------------------------

export interface AuditorRegisterEntry {
  id: string;
  findingRef: string;
  title: string;
  riskLevel: 'HIGH' | 'MEDIUM' | 'LOW';
  category: 'GL_INTEGRITY' | 'FEES_RECEIVABLE' | 'PROCUREMENT_AP' | 'BUDGET_VOTE' | 'DIGITAL_PAY';
  observation: string;
  evidenceSummary: string;
  recommendation: string;
  managementResponse?: string;
  status: 'OPEN' | 'IN_REVIEW' | 'CORRECTIVE_ACTION_REQUIRED' | 'CLOSED';
  auditorId: string;
  auditDate: string;
}

export interface SchoolPaySettlementBatch {
  id: string;
  batchNumber: string;
  channel: DigitalPaymentRail | 'ALL_CHANNELS';
  totalAmount: number;
  transactionCount: number;
  settledToBankAccountId: string;
  settlementDate: string;
  status: 'PENDING' | 'SETTLED' | 'RECONCILED';
  journalVoucherId?: string;
}

export interface StudentReportCard {
  id: string;
  studentId: string;
  studentName: string;
  admissionNo: string;
  classLevel: string;
  stream: string;
  term: string;
  academicYear: string;
  assessments: {
    subjectCode: string;
    subjectName: string;
    catScore: number;
    examScore: number;
    totalScore: number;
    grade: string;
    scoreRemarks: string;
    teacherName: string;
  }[];
  totalAggregate: number;
  division: 'Division 1' | 'Division 2' | 'Division 3' | 'Division 4' | 'Division 9' | 'Division U';
  classRank: string;
  attendanceRate: number;
  classTeacherRemarks: string;
  headteacherRemarks: string;
  nextTermBeginsDate: string;
  status: 'DRAFT' | 'APPROVED' | 'PUBLISHED';
}

export interface Vendor {
  id: string;
  name: string;
  category: string;
  contactPerson: string;
  phone: string;
  email: string;
  address: string;
  taxPin?: string;
  paymentTerms: string;
  status: 'ACTIVE' | 'INACTIVE';
  balance: number;
}

export interface Bill {
  id: string;
  billNumber: string;
  vendorId: string;
  vendorName: string;
  date: string;
  dueDate: string;
  items: { description: string; amount: number; accountId: string }[];
  totalAmount: number;
  amountPaid: number;
  status: 'PENDING' | 'APPROVED' | 'PARTIALLY_PAID' | 'PAID' | 'VOIDED';
}

export interface BankFeedItem {
  id: string;
  bankAccountId: string;
  transactionDate: string;
  description: string;
  amount: number;
  type: 'CREDIT' | 'DEBIT';
  reconciled: boolean;
  matchedTransactionId?: string;
  suggestedAccount?: string;
}

export interface Budget {
  id: string;
  academicYear: string;
  title: string;
  directorate: SchoolDirectorate;
  allocatedAmount: number;
  spentAmount: number;
  remainingAmount: number;
  status: 'DRAFT' | 'APPROVED' | 'OVER_BUDGET';
}

export interface FixedAsset {
  id: string;
  assetNumber: string;
  name: string;
  category: 'BUILDINGS' | 'LAB_EQUIPMENT' | 'VEHICLES' | 'FURNITURE' | 'IT_EQUIPMENT';
  purchaseDate: string;
  purchaseCost: number;
  depreciationMethod: 'STRAIGHT_LINE' | 'DECLINING_BALANCE';
  usefulLifeYears: number;
  currentBookValue: number;
  location: string;
  condition: 'EXCELLENT' | 'GOOD' | 'FAIR' | 'POOR';
}

export interface TaxConfig {
  id: string;
  name: string;
  ratePercent: number;
  appliesTo: 'PROCUREMENT' | 'PAYROLL' | 'SERVICES' | 'NONE';
  accountId: string;
  active: boolean;
}

// -------------------------------------------------------------
// EXTERNAL & SUPPORT SERVICES ENTITIES
// -------------------------------------------------------------

export interface EstateAsset {
  id: string;
  name: string;
  category: 'BUILDING' | 'LABORATORY' | 'UTILITY' | 'VEHICLE' | 'EQUIPMENT';
  location: string;
  condition: 'EXCELLENT' | 'GOOD' | 'NEEDS_REPAIR' | 'CRITICAL';
  lastInspectionDate: string;
}

export interface FarmProject {
  id: string;
  projectName: string;
  category: 'CROP' | 'LIVESTOCK' | 'POULTRY' | 'HORTICULTURE';
  scale: string;
  status: 'ACTIVE' | 'HARVESTED' | 'FALLOW';
  expectedYield: string;
  projectedRevenue: number;
  actualRevenue?: number;
}

export interface HealthRecord {
  id: string;
  studentId: string;
  studentName: string;
  visitDate: string;
  symptoms: string;
  diagnosis: string;
  prescription: string;
  admittedToSickbay: boolean;
  attendingNurse: string;
}

export interface PartnerContract {
  id: string;
  partnerName: string;
  type: 'INTERNSHIP_PLACEMENT' | 'RESEARCH' | 'DONATION_GRANT' | 'COMMUNITY_SERVICE';
  startDate: string;
  endDate: string;
  status: 'ACTIVE' | 'EXPIRED' | 'RENEWAL_PENDING';
  valueAmount?: number;
}

// -------------------------------------------------------------
// FORMS & WORKFLOW REGISTRY CONTRACTS
// -------------------------------------------------------------

export interface FormField {
  id: string;
  name: string;
  label: string;
  type: 'text' | 'number' | 'date' | 'select' | 'textarea' | 'checkbox' | 'file';
  required: boolean;
  options?: { label: string; value: string }[];
  placeholder?: string;
  validationRegex?: string;
  group?: string;
}

export interface FormDefinition {
  id: string;
  code: string;
  name: string;
  description: string;
  fields: FormField[];
  submitLabel: string;
  successMessage: string;
  targetDomain: 'SIS' | 'FINANCE' | 'HR' | 'OPERATIONS' | 'SUPPORT';
}

export interface WorkflowState {
  id: string;
  name: string;
  description: string;
  isInitial?: boolean;
  isFinal?: boolean;
  authorizedRoles: UserRole[];
}

export interface WorkflowTransition {
  id: string;
  fromStateId: string;
  toStateId: string;
  name: string;
  actionRequired: string;
  authorizedRoles: UserRole[];
}

export interface WorkflowDefinition {
  id: string;
  code: string;
  name: string;
  category: 'ADMISSION' | 'FEE_PAYMENT' | 'BILL_APPROVAL' | 'LEAVE_REQUEST' | 'DISCIPLINE' | 'PURCHASE_ORDER';
  states: WorkflowState[];
  transitions: WorkflowTransition[];
}

export interface WorkflowInstance {
  id: string;
  workflowCode: string;
  title: string;
  currentStateId: string;
  data: any;
  initiatorId: string;
  initiatorRole?: string;
  createdAt: string;
  updatedAt: string;
  history: {
    stateId: string;
    actorId: string;
    timestamp: string;
    action: string;
    note?: string;
  }[];
}

export interface ReportDefinition {
  id: string;
  code: string;
  title: string;
  category: 'FINANCE' | 'ACADEMIC' | 'SIS' | 'AUDIT' | 'GOVERNANCE';
  description: string;
  parameters: string[];
}

export interface AIServiceDefinition {
  id: string;
  code: string;
  name: string;
  domain: 'FINANCE' | 'SIS' | 'ACADEMIC' | 'EXECUTIVE';
  description: string;
  capabilities: string[];
}
