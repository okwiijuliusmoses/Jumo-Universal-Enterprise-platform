import { FormField } from '../core/enterprise/components/JumoForm';

export interface WorkflowState {
  id: string;
  label: string;
  color: string;
}

export interface WorkflowDefinition {
  id: string;
  name: string;
  states: WorkflowState[];
  initialState: string;
}

export interface OfficeTabDefinition {
  id: string;
  label: string;
  capability: string;
  fields: FormField[];
  workflows?: WorkflowDefinition;
  integrations?: string[];
}

export interface AuditTrailEntry {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  details: string;
  status: 'SUCCESS' | 'WARNING' | 'FAILED';
}

export interface LedgerPosting {
  id: string;
  accountName: string;
  accountNumber: string;
  debit: number;
  credit: number;
  reference: string;
}

export const ERP_WORKFLOWS = {
  STANDARD_APPROVAL: {
    id: 'STANDARD_APPROVAL',
    name: 'Administrative Approval Pipeline',
    states: [
      { id: 'DRAFT', label: 'Draft', color: 'bg-slate-100 text-slate-700 border-slate-300' },
      { id: 'VALIDATED', label: 'Validated', color: 'bg-blue-100 text-blue-700 border-blue-300' },
      { id: 'SUBMITTED', label: 'Submitted', color: 'bg-purple-100 text-purple-700 border-purple-300' },
      { id: 'APPROVED', label: 'Approved', color: 'bg-emerald-100 text-emerald-700 border-emerald-300' },
      { id: 'REJECTED', label: 'Rejected', color: 'bg-rose-100 text-rose-700 border-rose-300' },
      { id: 'ARCHIVED', label: 'Archived', color: 'bg-slate-200 text-slate-800 border-slate-400' }
    ],
    initialState: 'DRAFT'
  }
};

// Reusable dynamic schemas for complex enterprise records
export const FORM_SCHEMAS: Record<string, FormField[]> = {
  WORKSPACE: [
    { id: 'title', label: 'Directive/Strategic Plan Title', type: 'text', required: true, section: 'Core Details' },
    { id: 'category', label: 'Strategic Domain', type: 'select', required: true, section: 'Core Details', options: [
      { value: 'ACADEMIC', label: 'Academic & Curriculum' },
      { value: 'FINANCE', label: 'Finance & FAAP Ledger' },
      { value: 'OPERATIONS', label: 'Operations & Estates' },
      { value: 'HR', label: 'Human Resources' },
      { value: 'GOVERNANCE', label: 'Executive Governance' }
    ]},
    { id: 'description', label: 'Strategic Objective / Decree text', type: 'textarea', required: true, section: 'Execution Outline' },
    { id: 'startDate', label: 'Execution Start Date', type: 'date', required: true, section: 'Lifecycle' },
    { id: 'reviewDate', label: 'Evaluation Review Date', type: 'date', required: true, section: 'Lifecycle' },
    { id: 'budget', label: 'Authorized FAAP Budget (UGX / USD)', type: 'number', required: true, section: 'Lifecycle' }
  ],
  PEOPLE: [
    { id: 'fullName', label: 'Legal Full Names', type: 'text', required: true, section: 'Identity & Biodata' },
    { id: 'preferredName', label: 'Preferred / Call Name', type: 'text', section: 'Identity & Biodata' },
    { id: 'dob', label: 'Date of Birth', type: 'date', required: true, section: 'Identity & Biodata' },
    { id: 'gender', label: 'Gender Identification', type: 'select', required: true, section: 'Identity & Biodata', options: [
      { value: 'MALE', label: 'Male' },
      { value: 'FEMALE', label: 'Female' },
      { value: 'OTHER', label: 'Other' }
    ]},
    { id: 'nationality', label: 'Nationality / Citizenship', type: 'text', required: true, section: 'Identity & Biodata' },
    { id: 'nin', label: 'National ID / Passport Number', type: 'text', required: true, section: 'Identity & Biodata' },
    { id: 'email', label: 'Primary Email Address', type: 'email', required: true, section: 'Contact Information' },
    { id: 'phone', label: 'Primary Contact Telephone', type: 'text', required: true, section: 'Contact Information' },
    { id: 'address', label: 'Physical Residential Address', type: 'textarea', required: true, section: 'Contact Information' },
    { id: 'nokName', label: 'Emergency Contact / Next of Kin Full Name', type: 'text', required: true, section: 'Next of Kin / Guardian' },
    { id: 'nokRelation', label: 'Relationship to Member', type: 'text', required: true, section: 'Next of Kin / Guardian' },
    { id: 'nokPhone', label: 'Next of Kin Contact Telephone', type: 'text', required: true, section: 'Next of Kin / Guardian' }
  ],
  ACADEMICS: [
    { id: 'academicYear', label: 'Academic Calendar Year', type: 'text', required: true, section: 'Academic Year Config' },
    { id: 'term', label: 'Active Term / Semester', type: 'select', required: true, section: 'Academic Year Config', options: [
      { value: 'TERM_1', label: 'Term I' },
      { value: 'TERM_2', label: 'Term II' },
      { value: 'TERM_3', label: 'Term III' },
      { value: 'SEMESTER_1', label: 'Semester I' },
      { value: 'SEMESTER_2', label: 'Semester II' }
    ]},
    { id: 'className', label: 'Class / Grade Level', type: 'text', required: true, section: 'Structure' },
    { id: 'stream', label: 'Stream / Section', type: 'text', required: true, section: 'Structure' },
    { id: 'subject', label: 'Subject / Course Unit', type: 'text', required: true, section: 'Structure' },
    { id: 'teacher', label: 'Assigned Educator / Lecturer', type: 'text', required: true, section: 'Allocations' },
    { id: 'syllabusCode', label: 'National Curriculum Syllabus Code', type: 'text', required: true, section: 'Allocations' }
  ],
  ADMISSIONS: [
    { id: 'fullName', label: 'Applicant Legal Full Names', type: 'text', required: true, section: 'Candidate Details' },
    { id: 'dob', label: 'Date of Birth', type: 'date', required: true, section: 'Candidate Details' },
    { id: 'classLevel', label: 'Target Class / Grade Level', type: 'text', required: true, section: 'Candidate Details' },
    { id: 'previousSchool', label: 'Previous Educational Institution', type: 'text', section: 'Academic History' },
    { id: 'pleAggregate', label: 'Entry Examination / PLE Aggregate score', type: 'number', section: 'Academic History' },
    { id: 'guardianName', label: 'Primary Guardian Legal Full Names', type: 'text', required: true, section: 'Sponsorship & Guardian' },
    { id: 'guardianPhone', label: 'Primary Guardian Contact Phone', type: 'text', required: true, section: 'Sponsorship & Guardian' },
    { id: 'guardianEmail', label: 'Primary Guardian Email Address', type: 'email', required: true, section: 'Sponsorship & Guardian' }
  ],
  LEARNERS: [
    { id: 'regNo', label: 'Student Registration Number', type: 'text', required: true, section: 'Identity' },
    { id: 'fullName', label: 'Legal Full Names', type: 'text', required: true, section: 'Identity' },
    { id: 'classLevel', label: 'Active Class / Grade Level', type: 'text', required: true, section: 'Enrollment Status' },
    { id: 'stream', label: 'Assigned Stream / Section', type: 'text', required: true, section: 'Enrollment Status' },
    { id: 'house', label: 'Sports House / Dormitory affiliation', type: 'text', section: 'Enrollment Status' },
    { id: 'tuitionSponsorship', label: 'Tuition Sponsorship Status', type: 'select', required: true, section: 'Financial Mapping', options: [
      { value: 'FULL_PRIVATE', label: 'Full Private' },
      { value: 'HALF_SCHOLARSHIP', label: '50% Merit Scholarship' },
      { value: 'FULL_SCHOLARSHIP', label: '100% Foundation Scholarship' },
      { value: 'GOVERNMENT_SPONSORED', label: 'State Sponsored / Universal' }
    ]}
  ],
  STAFF: [
    { id: 'staffNo', label: 'Staff File / Payroll ID', type: 'text', required: true, section: 'Employment Record' },
    { id: 'fullName', label: 'Legal Full Names', type: 'text', required: true, section: 'Employment Record' },
    { id: 'jobTitle', label: 'Official Job Title', type: 'text', required: true, section: 'Employment Record' },
    { id: 'department', label: 'Assigned Department', type: 'text', required: true, section: 'Employment Record' },
    { id: 'contractType', label: 'Employment Contract Scheme', type: 'select', required: true, section: 'Contract details', options: [
      { value: 'PERMANENT', label: 'Permanent / Tenured' },
      { value: 'CONTRACTUAL', label: 'Fixed Term Contract' },
      { value: 'PART_TIME', label: 'Part-Time / Visiting' },
      { value: 'PROBATIONARY', label: 'Probationary Assignment' }
    ]},
    { id: 'salary', label: 'FAAP Authorized Gross Monthly Salary', type: 'number', required: true, section: 'Contract details' },
    { id: 'academicQualifications', label: 'Highest Professional Certifications', type: 'textarea', required: true, section: 'Professional Profile' }
  ],
  FINANCE: [
    { id: 'refNo', label: 'Double Entry Transaction Ref', type: 'text', required: true, section: 'Ledger Audit Parameters' },
    { id: 'accountDebit', label: 'Debit Ledger Account', type: 'select', required: true, section: 'Journal Entry Details', options: [
      { value: '1001-TUITION-RECEIVABLE', label: '1001 Tuition & Fees Receivable' },
      { value: '1100-OPERATIONAL-CASH', label: '1100 Operational Cash Bank' },
      { value: '5001-SALARY-EXPENSES', label: '5001 Salary & Wages Expense' },
      { value: '5100-SUPPLIES-EXPENSES', label: '5100 School Supplies Expense' }
    ]},
    { id: 'accountCredit', label: 'Credit Ledger Account', type: 'select', required: true, section: 'Journal Entry Details', options: [
      { value: '3001-TUITION-REVENUE', label: '3001 Tuition Revenue Control' },
      { value: '1100-OPERATIONAL-CASH', label: '1100 Operational Cash Bank' },
      { value: '2001-SALARIES-PAYABLE', label: '2001 Salaries & Benefits Payable' },
      { value: '2100-ACCOUNTS-PAYABLE', label: '2100 Accounts Payable Control' }
    ]},
    { id: 'amount', label: 'Transaction Monetary Volume (UGX/USD)', type: 'number', required: true, section: 'Journal Entry Details' },
    { id: 'description', label: 'Accounting Memo / Reference Detail', type: 'text', required: true, section: 'Journal Entry Details' }
  ],
  PROCUREMENT: [
    { id: 'reqNo', label: 'Requisition Voucher Number', type: 'text', required: true, section: 'Voucher Basics' },
    { id: 'itemName', label: 'Requested Materials / Stock Description', type: 'text', required: true, section: 'Voucher Basics' },
    { id: 'quantity', label: 'Quantity Demanded', type: 'number', required: true, section: 'Voucher Basics' },
    { id: 'unitPrice', label: 'Estimated Unit Price', type: 'number', required: true, section: 'Voucher Basics' },
    { id: 'vendorName', label: 'Approved Supplier / Vendor', type: 'text', required: true, section: 'Procurement Allocation' },
    { id: 'voteCode', label: 'FAAP Budget Vote Allocation Code', type: 'text', required: true, section: 'Procurement Allocation' }
  ],
  TRANSPORT: [
    { id: 'routeNo', label: 'Transport Route Number', type: 'text', required: true, section: 'Fleet Schedule' },
    { id: 'driverName', label: 'Assigned Sovereign Driver Name', type: 'text', required: true, section: 'Fleet Schedule' },
    { id: 'vehiclePlate', label: 'Authorized Vehicle Registration Plate', type: 'text', required: true, section: 'Fleet Schedule' },
    { id: 'capacity', label: 'Maximum Vehicle Seating Capacity', type: 'number', required: true, section: 'Fleet Schedule' },
    { id: 'pickupLocations', label: 'Pickup Coordinates & Waypoints', type: 'textarea', required: true, section: 'Route Planning' }
  ],
  HEALTH: [
    { id: 'caseNo', label: 'Medical Incident Ticket Ref', type: 'text', required: true, section: 'Clinical Registry' },
    { id: 'patientName', label: 'Patient Name (Student/Staff)', type: 'text', required: true, section: 'Clinical Registry' },
    { id: 'symptoms', label: 'Diagnosed Symptoms / Vitals', type: 'textarea', required: true, section: 'Clinical Registry' },
    { id: 'treatment', label: 'Sick Bay Treatment & Drugs Administered', type: 'textarea', required: true, section: 'Treatment Execution' },
    { id: 'referralRequired', label: 'Requires Referral to National Hospital', type: 'checkbox', section: 'Treatment Execution', placeholder: 'Yes, escalate case' }
  ],
  BOARDING: [
    { id: 'allocNo', label: 'Dormitory Allocation Ref', type: 'text', required: true, section: 'Residential Assignment' },
    { id: 'studentName', label: 'Learner Full Name', type: 'text', required: true, section: 'Residential Assignment' },
    { id: 'dormName', label: 'Dormitory House Name', type: 'text', required: true, section: 'Residential Assignment' },
    { id: 'bedNo', label: 'Assigned Bed / Cubicle Reference', type: 'text', required: true, section: 'Residential Assignment' },
    { id: 'exeatPassStatus', label: 'Authorized Exeat Pass', type: 'checkbox', section: 'Lifecycle Status', placeholder: 'Active' }
  ],
  COMMUNICATIONS: [
    { id: 'commNo', label: 'Communication Dispatch Ref', type: 'text', required: true, section: 'Dispatch Specs' },
    { id: 'channel', label: 'Primary Dispatch Channel', type: 'select', required: true, section: 'Dispatch Specs', options: [
      { value: 'SMS', label: 'Bulk Parent SMS Broadcast' },
      { value: 'EMAIL', label: 'Official Institutional Email List' },
      { value: 'PORTAL_ANNOUNCEMENT', label: 'Sovereign Portal Notice Board' }
    ]},
    { id: 'recipientGroup', label: 'Target Audience Group', type: 'text', required: true, section: 'Dispatch Specs' },
    { id: 'messageText', label: 'Official Notice Body text', type: 'textarea', required: true, section: 'Content Execution' }
  ],
  REPORTS: [
    { id: 'reportNo', label: 'Report Compilation ID', type: 'text', required: true, section: 'Metadata' },
    { id: 'reportName', label: 'Official Report Name', type: 'text', required: true, section: 'Metadata' },
    { id: 'format', label: 'Generated Export Format', type: 'select', required: true, section: 'Metadata', options: [
      { value: 'PDF', label: 'Cryptographically Sealed PDF' },
      { value: 'XLSX', label: 'Double-Entry Reconciled Spreadsheet (XLSX)' },
      { value: 'JSON', label: 'Secured System Exchange Schema (JSON)' }
    ]},
    { id: 'queryParameters', label: 'Query Filter Parameters', type: 'textarea', required: true, section: 'Data Query Criteria' }
  ],
  DOCUMENTS: [
    { id: 'docNo', label: 'Document Classification ID', type: 'text', required: true, section: 'Archive Metadata' },
    { id: 'docName', label: 'Document File Name', type: 'text', required: true, section: 'Archive Metadata' },
    { id: 'securityLevel', label: 'Zero-Trust Sensitivity Classification', type: 'select', required: true, section: 'Zero-Trust Gateways', options: [
      { value: 'PUBLIC', label: 'Public Release' },
      { value: 'RESTRICTED', label: 'Restricted Internal Office' },
      { value: 'CONFIDENTIAL', label: 'Confidential Executive Eyes Only' },
      { value: 'TOP_SECRET', label: 'Sealed AEGIS Cryptographic Core' }
    ]},
    { id: 'binaryHash', label: 'SHA-256 Storage Integrity Checksum', type: 'text', required: true, section: 'Zero-Trust Gateways' }
  ],
  SETTINGS: [
    { id: 'configId', label: 'Configuration Key', type: 'text', required: true, section: 'System Property' },
    { id: 'value', label: 'Property Execution Value', type: 'text', required: true, section: 'System Property' },
    { id: 'group', label: 'Administrative Registry Group', type: 'text', required: true, section: 'System Property' }
  ],
  ATTENDANCE: [
    { id: 'logNo', label: 'Attendance Roll Call ID', type: 'text', required: true, section: 'Attendance Context' },
    { id: 'className', label: 'Class / Department Room', type: 'text', required: true, section: 'Attendance Context' },
    { id: 'term', label: 'Academic Term / Quarter', type: 'text', required: true, section: 'Attendance Context' },
    { id: 'presentCount', label: 'Present headcount', type: 'number', required: true, section: 'Tally Check' },
    { id: 'absentCount', label: 'Absent headcount', type: 'number', required: true, section: 'Tally Check' },
    { id: 'rollDate', label: 'Roll Call Date', type: 'date', required: true, section: 'Tally Check' }
  ]
};

// Seed records perfectly sanitized of any benchmark data
export const INITIAL_SEED_RECORDS: Record<string, any[]> = {
  WORKSPACE: [
    { id: 'ST-DIR-001', title: 'Curriculum Harmonization Plan', category: 'ACADEMIC', description: 'Align teaching schedules with revised competence frameworks.', startDate: '2026-09-01', reviewDate: '2026-12-15', budget: 15000000, status: 'APPROVED', date: '2026-08-23', officer: 'Director Office' },
    { id: 'ST-DIR-002', title: 'Solar Array Backup Deployment', category: 'OPERATIONS', description: 'Procure and mount photovoltaic backup arrays for continuous classroom power.', startDate: '2026-10-01', reviewDate: '2026-11-30', budget: 45000000, status: 'SUBMITTED', date: '2026-08-22', officer: 'Operations Office' }
  ],
  PEOPLE: [
    { id: 'PPL-001', fullName: 'Director John Doe', preferredName: 'Director John', dob: '1978-04-12', gender: 'MALE', nationality: 'Ugandan', nin: 'CM780412XYZ101', email: 'john.doe@jumo.ai', phone: '+256701123456', address: 'Plot 42, Kampala Block C', nokName: 'Jane Doe', nokRelation: 'Spouse', nokPhone: '+256701123457', status: 'APPROVED' },
    { id: 'PPL-002', fullName: 'Dr. Sarah Smith', preferredName: 'Dr. Sarah', dob: '1982-11-30', gender: 'FEMALE', nationality: 'Ugandan', nin: 'CF821130ABC202', email: 'sarah.smith@jumo.ai', phone: '+256702987654', address: 'Sovereign Hilltop Estate', nokName: 'Robert Smith', nokRelation: 'Brother', nokPhone: '+256702987655', status: 'VALIDATED' }
  ],
  ACADEMICS: [
    { id: 'ACD-001', academicYear: '2026', term: 'TERM_3', className: 'Primary Seven (P.7)', stream: 'Eagle Stream', subject: 'Mathematics Core', teacher: 'Tr. David Mukasa', syllabusCode: 'MOES-PRI-M-07', status: 'APPROVED' },
    { id: 'ACD-002', academicYear: '2026', term: 'TERM_3', className: 'Nursery Blue', stream: 'Seedling Stream', subject: 'Thematic Phonics', teacher: 'Tr. Grace Nakato', syllabusCode: 'MOES-ECD-P-01', status: 'VALIDATED' }
  ],
  ADMISSIONS: [
    { id: 'ADM-001', fullName: 'Samuel Alinda', dob: '2016-05-18', classLevel: 'Primary Four (P.4)', previousSchool: 'Acacia Montessori Academy', pleAggregate: 4, guardianName: 'Agnes Alinda', guardianPhone: '+256700555666', guardianEmail: 'agnes.alinda@gmail.com', status: 'APPROVED' },
    { id: 'ADM-002', fullName: 'Sovereign Learner Junior', dob: '2021-02-11', classLevel: 'Toddlers Nursery', previousSchool: 'None', pleAggregate: 0, guardianName: 'Sovereign Parent', guardianPhone: '+256700111222', guardianEmail: 'sov.parent@gmail.com', status: 'VALIDATED' }
  ],
  LEARNERS: [
    { id: 'LRN-001', regNo: 'REG-2026-PRI-001', fullName: 'Samuel Alinda', classLevel: 'Primary Four (P.4)', stream: 'Eagle Stream', house: 'Red Crane House', tuitionSponsorship: 'FULL_PRIVATE', status: 'APPROVED' },
    { id: 'LRN-002', regNo: 'REG-2026-NUR-002', fullName: 'Sovereign Learner Junior', classLevel: 'Toddlers Nursery', stream: 'Seedling Stream', house: 'Blue Crested House', tuitionSponsorship: 'FULL_SCHOLARSHIP', status: 'APPROVED' }
  ],
  STAFF: [
    { id: 'STF-001', staffNo: 'PAY-STF-001', fullName: 'Tr. David Mukasa', jobTitle: 'Senior Mathematics Educator', department: 'Academic Science Dept', contractType: 'PERMANENT', salary: 1500000, academicQualifications: 'Bachelor of Science in Education (First Class Honors) - Makerere', status: 'APPROVED' },
    { id: 'STF-002', staffNo: 'PAY-STF-002', fullName: 'Tr. Grace Nakato', jobTitle: 'Early Childhood Specialist', department: 'Nursery Thematic Dept', contractType: 'CONTRACTUAL', salary: 1200000, academicQualifications: 'Diploma in Early Childhood Development - Kyambogo', status: 'APPROVED' }
  ],
  FINANCE: [
    { id: 'TX-FAAP-001', refNo: 'TX-REF-001', accountDebit: '1100-OPERATIONAL-CASH', accountCredit: '3001-TUITION-REVENUE', amount: 1500000, description: 'Term 3 Tuition Payment - Samuel Alinda', status: 'APPROVED' },
    { id: 'TX-FAAP-002', refNo: 'TX-REF-002', accountDebit: '5001-SALARY-EXPENSES', accountCredit: '1100-OPERATIONAL-CASH', amount: 1500000, description: 'August Salary Disbursement - David Mukasa', status: 'APPROVED' }
  ],
  PROCUREMENT: [
    { id: 'PRC-001', reqNo: 'REQ-2026-001', itemName: 'PLE Exam Mock Booklet Duplications', quantity: 200, unitPrice: 5000, vendorName: 'Universal Sovereign Printers', voteCode: 'VOTE-ACAD-EXAM-001', status: 'APPROVED' },
    { id: 'PRC-002', reqNo: 'REQ-2026-002', itemName: 'Infirmary Paracetamol & First Aid Supplies', quantity: 15, unitPrice: 15000, vendorName: 'Grace Medicals Uganda', voteCode: 'VOTE-WELFARE-HEALTH-003', status: 'VALIDATED' }
  ],
  TRANSPORT: [
    { id: 'TRP-001', routeNo: 'ROUTE-NORTH-A', driverName: 'Sovereign Driver Moses', vehiclePlate: 'UBA 101X', capacity: 45, pickupLocations: 'Ntinda Main St -> Kiwatule Corner -> Naalya Estate', status: 'APPROVED' },
    { id: 'TRP-002', routeNo: 'ROUTE-EAST-B', driverName: 'Sovereign Driver Paul', vehiclePlate: 'UBA 202Y', capacity: 30, pickupLocations: 'Kireka Market -> Bweyogerere Highway -> Seeta junction', status: 'APPROVED' }
  ],
  HEALTH: [
    { id: 'HLT-001', caseNo: 'CL-INC-001', patientName: 'Samuel Alinda', symptoms: 'Mild headache, slight fever spike 38.2C', treatment: 'Paracetamol 500mg administered, rest in Sick Bay for 2 hours', referralRequired: false, status: 'APPROVED' },
    { id: 'HLT-002', caseNo: 'CL-INC-002', patientName: 'Sovereign Learner Junior', symptoms: 'Superficial skin graze on playground swing', treatment: 'Antiseptic clean, dressing application, student returned to class', referralRequired: false, status: 'APPROVED' }
  ],
  BOARDING: [
    { id: 'BDG-001', allocNo: 'DORM-ALLOC-001', studentName: 'Samuel Alinda', dormName: 'Crested Crane Dorm Block A', bedNo: 'Cubicle 4 Bed B', exeatPassStatus: false, status: 'APPROVED' }
  ],
  COMMUNICATIONS: [
    { id: 'COM-001', commNo: 'DISP-SMS-001', channel: 'SMS', recipientGroup: 'P.7 Candidate Parents', messageText: 'Dear Parents, please be reminded that the Mock examinations commence tomorrow morning. Pupils should arrive by 7:00 AM.', status: 'APPROVED' }
  ],
  REPORTS: [
    { id: 'RPT-001', reportNo: 'RPT-PLE-2026-PREP', reportName: 'PLE Mock Performance Analytics', format: 'PDF', queryParameters: 'filter[className]=Primary Seven&filter[term]=TERM_2', status: 'APPROVED' }
  ],
  DOCUMENTS: [
    { id: 'DOC-001', docNo: 'ARCH-CERT-001', docName: 'UNEB Ple Candidate Center Permit 2026.pdf', securityLevel: 'CONFIDENTIAL', binaryHash: '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08', status: 'APPROVED' }
  ],
  SETTINGS: [
    { id: 'SET-001', configId: 'TERM_START_DATE', value: '2026-09-07', group: 'TERM_CONFIG', status: 'APPROVED' }
  ],
  ATTENDANCE: [
    { id: 'ATT-001', logNo: 'ROLL-2026-08-23', className: 'Primary Seven (P.7)', term: 'Term III', presentCount: 184, absentCount: 2, rollDate: '2026-08-23', status: 'APPROVED' }
  ]
};

// Map each of the horizontal tabs to its corresponding metadata-driven workspace configuration
export const OFFICE_WORKSPACES: Record<string, OfficeTabDefinition> = {
  WORKSPACE: {
    id: 'WORKSPACE',
    label: 'Executive Workspace',
    capability: 'EXECUTIVE_GOVERNANCE',
    fields: FORM_SCHEMAS.WORKSPACE,
    workflows: ERP_WORKFLOWS.STANDARD_APPROVAL
  },
  PEOPLE: {
    id: 'PEOPLE',
    label: 'People',
    capability: 'MEMBER_MANAGEMENT',
    fields: FORM_SCHEMAS.PEOPLE,
    workflows: ERP_WORKFLOWS.STANDARD_APPROVAL
  },
  ACADEMICS: {
    id: 'ACADEMICS',
    label: 'Academic Administration',
    capability: 'ACADEMIC_ADMINISTRATION',
    fields: FORM_SCHEMAS.ACADEMICS,
    workflows: ERP_WORKFLOWS.STANDARD_APPROVAL
  },
  ADMISSIONS: {
    id: 'ADMISSIONS',
    label: 'Admissions',
    capability: 'LEARNER_ADMISSIONS',
    fields: FORM_SCHEMAS.ADMISSIONS,
    workflows: ERP_WORKFLOWS.STANDARD_APPROVAL
  },
  LEARNERS: {
    id: 'LEARNERS',
    label: 'Learner Management',
    capability: 'LEARNER_MANAGEMENT',
    fields: FORM_SCHEMAS.LEARNERS,
    workflows: ERP_WORKFLOWS.STANDARD_APPROVAL
  },
  STAFF: {
    id: 'STAFF',
    label: 'Staff & HR',
    capability: 'STAFF_HR_MANAGEMENT',
    fields: FORM_SCHEMAS.STAFF,
    workflows: ERP_WORKFLOWS.STANDARD_APPROVAL
  },
  ATTENDANCE: {
    id: 'ATTENDANCE',
    label: 'Attendance',
    capability: 'ATTENDANCE_LOGGING',
    fields: FORM_SCHEMAS.ATTENDANCE,
    workflows: ERP_WORKFLOWS.STANDARD_APPROVAL
  },
  CURRICULUM: {
    id: 'CURRICULUM',
    label: 'Curriculum',
    capability: 'CURRICULUM_MANAGEMENT',
    fields: FORM_SCHEMAS.ACADEMICS,
    workflows: ERP_WORKFLOWS.STANDARD_APPROVAL
  },
  EXAMS: {
    id: 'EXAMS',
    label: 'Assessment & Examinations',
    capability: 'ASSESSMENT_EXAMINATIONS',
    fields: FORM_SCHEMAS.ACADEMICS,
    workflows: ERP_WORKFLOWS.STANDARD_APPROVAL
  },
  TIMETABLE: {
    id: 'TIMETABLE',
    label: 'Timetabling',
    capability: 'TIMETABLE_BUILDING',
    fields: FORM_SCHEMAS.ACADEMICS,
    workflows: ERP_WORKFLOWS.STANDARD_APPROVAL
  },
  FINANCE: {
    id: 'FINANCE',
    label: 'Finance / FAAP',
    capability: 'FINANCE_FAAP_INTEGRATION',
    fields: FORM_SCHEMAS.FINANCE,
    workflows: ERP_WORKFLOWS.STANDARD_APPROVAL,
    integrations: ['FAAP']
  },
  PROCUREMENT: {
    id: 'PROCUREMENT',
    label: 'Procurement & Stores',
    capability: 'PROCUREMENT_STORES',
    fields: FORM_SCHEMAS.PROCUREMENT,
    workflows: ERP_WORKFLOWS.STANDARD_APPROVAL
  },
  TRANSPORT: {
    id: 'TRANSPORT',
    label: 'Transport',
    capability: 'TRANSPORT_FLEET',
    fields: FORM_SCHEMAS.TRANSPORT,
    workflows: ERP_WORKFLOWS.STANDARD_APPROVAL
  },
  HEALTH: {
    id: 'HEALTH',
    label: 'Health & Safeguarding',
    capability: 'HEALTH_SAFEGUARDING',
    fields: FORM_SCHEMAS.HEALTH,
    workflows: ERP_WORKFLOWS.STANDARD_APPROVAL
  },
  BOARDING: {
    id: 'BOARDING',
    label: 'Boarding / Welfare',
    capability: 'BOARDING_WELFARE',
    fields: FORM_SCHEMAS.BOARDING,
    workflows: ERP_WORKFLOWS.STANDARD_APPROVAL
  },
  COMMUNICATIONS: {
    id: 'COMMUNICATIONS',
    label: 'Communications',
    capability: 'SMS_BULK_COMMUNICATIONS',
    fields: FORM_SCHEMAS.COMMUNICATIONS,
    workflows: ERP_WORKFLOWS.STANDARD_APPROVAL
  },
  REPORTS: {
    id: 'REPORTS',
    label: 'Reports',
    capability: 'ANALYTICS_REPORTING',
    fields: FORM_SCHEMAS.REPORTS,
    workflows: ERP_WORKFLOWS.STANDARD_APPROVAL
  },
  WORKFLOWS: {
    id: 'WORKFLOWS',
    label: 'Workflows',
    capability: 'WORKFLOW_STATUS',
    fields: FORM_SCHEMAS.WORKSPACE,
    workflows: ERP_WORKFLOWS.STANDARD_APPROVAL
  },
  DOCUMENTS: {
    id: 'DOCUMENTS',
    label: 'Documents',
    capability: 'DOCUMENT_ARCHIVE',
    fields: FORM_SCHEMAS.DOCUMENTS,
    workflows: ERP_WORKFLOWS.STANDARD_APPROVAL
  },
  SETTINGS: {
    id: 'SETTINGS',
    label: 'Office Settings',
    capability: 'OFFICE_CONFIGURATION',
    fields: FORM_SCHEMAS.SETTINGS,
    workflows: ERP_WORKFLOWS.STANDARD_APPROVAL
  }
};
