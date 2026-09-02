/**
 * JUMO UEOS — BENCHMARK TRACEABILITY REGISTRY
 * 
 * Provides end-to-end evidence traceability from physical benchmark sources to
 * canonical sovereign products, directorates, departments, offices, portals,
 * modules, capabilities, and runtime components.
 */

export interface BenchmarkTraceRecord {
  id: string;
  benchmarkSource: 'HILLSIDE_PRIMARY_NALYA' | 'NAMIRYANGO_COLLEGE' | 'NAMIREMBE_DIOCESE' | 'QUICKBOOKS_ENTERPRISE' | 'SCHOOLPAY_SWITCH';
  benchmarkCategory: 'NURSERY_PRIMARY' | 'SECONDARY_EDUCATION' | 'ECCLESIASTICAL_CHURCH' | 'FINTECH_ACCOUNTING' | 'PAYMENT_COLLECTION';
  evidenceReference: string;
  extractedDomain: string;
  extractedFunction: string;
  jumoProduct: 'prod-nursery-primary' | 'prod-secondary-school' | 'prod-church-faith' | 'prod-fintech';
  jumoProductCode: string;
  directorate: string;
  department: string;
  office: string;
  portal: string;
  module: string;
  capability: string;
  implementationStatus: 'VERIFIED' | 'IMPLEMENTED' | 'PARTIALLY_IMPLEMENTED' | 'SCAFFOLDED' | 'SPECIFIED';
  runtimeComponent: string;
  verificationStatus: 'PASSED' | 'AUDITED' | 'IN_REVIEW';
}

export const BENCHMARK_TRACEABILITY_REGISTRY: BenchmarkTraceRecord[] = [
  // ==========================================
  // PRODUCT 1: JUMO NURSERY & PRIMARY SCHOOL ERP
  // Benchmark: Hillside Nursery & Primary School / Nalya + NCDC Primary Curriculum + PLE Regulations
  // ==========================================
  {
    id: 'TRACE-NP-01',
    benchmarkSource: 'HILLSIDE_PRIMARY_NALYA',
    benchmarkCategory: 'NURSERY_PRIMARY',
    evidenceReference: 'Hillside Nalya ECD Learning Framework & NCDC Early Childhood Development Policy Sec 4.2',
    extractedDomain: 'Early Childhood Development & Nursery Learning',
    extractedFunction: 'Baby, Middle, and Top Class Phonics, Gross/Fine Motor Skills & Montessori Milestones',
    jumoProduct: 'prod-nursery-primary',
    jumoProductCode: 'NPERP',
    directorate: 'Directorate of Early Childhood Development (ECD) & Nursery',
    department: 'Department of Infant Daycare & Baby/Middle Phonics',
    office: 'Office of the ECD Learning Coordinator',
    portal: 'Portal of ECD Learning & Child Assessment',
    module: 'Nursery Baby & Middle Phonics Module (NP-MOD-ECD-PHONICS)',
    capability: 'Record Nursery Child Learning Progress & Motor Skills (CAP-NP-001)',
    implementationStatus: 'IMPLEMENTED',
    runtimeComponent: 'NPPhonicsAndSensoryProgressEngine',
    verificationStatus: 'PASSED'
  },
  {
    id: 'TRACE-NP-02',
    benchmarkSource: 'HILLSIDE_PRIMARY_NALYA',
    benchmarkCategory: 'NURSERY_PRIMARY',
    evidenceReference: 'Uganda National Examinations Board (UNEB) Primary Leaving Examination (PLE) Rules & Regulations',
    extractedDomain: 'Primary Academics & National Standardized Testing',
    extractedFunction: 'P.7 Mock Examination Series, Aggregate Computation, and UNEB PLE Indexing',
    jumoProduct: 'prod-nursery-primary',
    jumoProductCode: 'NPERP',
    directorate: 'Directorate of Primary Academics & National Assessment (P1–P7)',
    department: 'Department of PLE Candidate Preparation & Mock Series',
    office: 'Office of the PLE Mock Center Coordinator',
    portal: 'Portal of Primary Examination Standards & PLE',
    module: 'P7 UNEB Mock Exams & National Indexing Module (NP-MOD-PLE-CENTER)',
    capability: 'Generate PLE Aggregate Transcripts & Mock Rankings (CAP-NP-004)',
    implementationStatus: 'IMPLEMENTED',
    runtimeComponent: 'NPPLETranscriptGeneratorEngine',
    verificationStatus: 'PASSED'
  },
  {
    id: 'TRACE-NP-03',
    benchmarkSource: 'SCHOOLPAY_SWITCH',
    benchmarkCategory: 'PAYMENT_COLLECTION',
    evidenceReference: 'SchoolPay Automated Bank and Mobile Money Student Payment Code Architecture v3.1',
    extractedDomain: 'School Bursary, Fee Payments & Mobile Money Collection',
    extractedFunction: 'Student Termly Invoicing, PRN Paycode Generation, Bank Reconciliations',
    jumoProduct: 'prod-nursery-primary',
    jumoProductCode: 'NPERP',
    directorate: 'Directorate of School Bursary, Fees & Food Stores',
    department: 'Department of Fees Billing & Cashbook Collection',
    office: 'Office of the Primary School Head Bursar',
    portal: 'Portal of School Bursary & Fee Collections',
    module: 'Fees Billing & Mobile Money Paycode Module (NP-MOD-FEES-PAYCODE)',
    capability: 'Reconcile SchoolPay PRN Bank & Telecom Feed (CAP-NP-005)',
    implementationStatus: 'IMPLEMENTED',
    runtimeComponent: 'NPFeesAndSchoolPayReconciler',
    verificationStatus: 'PASSED'
  },
  {
    id: 'TRACE-NP-04',
    benchmarkSource: 'HILLSIDE_PRIMARY_NALYA',
    benchmarkCategory: 'NURSERY_PRIMARY',
    evidenceReference: 'Primary School Boarding & Day School Operational Standards, Ministry of Education and Sports',
    extractedDomain: 'Child Health, Pediatric Sickbay & Nutrition Tracking',
    extractedFunction: 'Deworming Schedules, Sickbay Inpatient Registry, Food Rations & POSHO Stores',
    jumoProduct: 'prod-nursery-primary',
    jumoProductCode: 'NPERP',
    directorate: 'Directorate of Child Protection, Health & Boarding Welfare',
    department: 'Department of Pediatric Sickbay & Pupil Wellness',
    office: 'Office of the School Clinic Matron',
    portal: 'Portal of Child Health & Dormitory Welfare',
    module: 'Pupil Clinic & Sickbay Operations Module (NP-MOD-PEDIATRIC-CLINIC)',
    capability: 'Issue Sickbay Clinical Admission & Triage Slip (CAP-NP-007)',
    implementationStatus: 'IMPLEMENTED',
    runtimeComponent: 'NPPediatricSickbayEngine',
    verificationStatus: 'PASSED'
  },

  // ==========================================
  // PRODUCT 2: JUMO SECONDARY SCHOOL ERP
  // Benchmark: Namiryango College + UNEB UCE/UACE Regulations + NCDC New Secondary Curriculum
  // ==========================================
  {
    id: 'TRACE-SEC-01',
    benchmarkSource: 'NAMIRYANGO_COLLEGE',
    benchmarkCategory: 'SECONDARY_EDUCATION',
    evidenceReference: 'Namiryango College Academic Senate Framework & NCDC Competence-Based Lower Secondary Curriculum (2020/2024)',
    extractedDomain: 'Lower Secondary Academics & Activity-Based Continuous Assessment',
    extractedFunction: 'S1–S4 20% Project Assessment, Integration Activities, Formative Descriptors',
    jumoProduct: 'prod-secondary-school',
    jumoProductCode: 'SECERP',
    directorate: 'Directorate of Secondary Academics & Curriculum Innovation',
    department: 'Department of Lower Secondary NCDC Curriculum (S1–S4)',
    office: 'Office of the Director of Studies (DOS) Lower Secondary',
    portal: 'Portal of Secondary Academic Affairs & Examinations',
    module: 'Lower Secondary NCDC Competence & Projects Module (SEC-MOD-NCDC-S1-S4)',
    capability: 'Record 20% Learner Project Continuous Assessment (CAP-SEC-001)',
    implementationStatus: 'IMPLEMENTED',
    runtimeComponent: 'SECLowerSecondaryNCDCContinuousAssessmentEngine',
    verificationStatus: 'PASSED'
  },
  {
    id: 'TRACE-SEC-02',
    benchmarkSource: 'NAMIRYANGO_COLLEGE',
    benchmarkCategory: 'SECONDARY_EDUCATION',
    evidenceReference: 'Namiryango College Advanced Level Subject Combination Matrix & UNEB UACE Entry Requirements',
    extractedDomain: 'Advanced Level Subject Combinations & GPA Tracking',
    extractedFunction: 'S5–S6 Combinations (PCM, PCB, BCM, PEM, HEG, MEK), Principal Passes, Mock Series',
    jumoProduct: 'prod-secondary-school',
    jumoProductCode: 'SECERP',
    directorate: 'Directorate of Secondary Academics & Curriculum Innovation',
    department: 'Department of Advanced Level Combinations & Academics (S5–S6)',
    office: 'Office of the Director of Studies (DOS) Upper Secondary',
    portal: 'Portal of Secondary Academic Affairs & Examinations',
    module: 'A-Level Subject Combination & Principal Points Module (SEC-MOD-A-LEVEL-COMB)',
    capability: 'Validate A-Level Combination Eligibility & Points (CAP-SEC-002)',
    implementationStatus: 'IMPLEMENTED',
    runtimeComponent: 'SECUpperSecondarySubjectCombinationEngine',
    verificationStatus: 'PASSED'
  },
  {
    id: 'TRACE-SEC-03',
    benchmarkSource: 'NAMIRYANGO_COLLEGE',
    benchmarkCategory: 'SECONDARY_EDUCATION',
    evidenceReference: 'National Center Examination Protocols, UNEB Center Number Certification Rules',
    extractedDomain: 'National Examination Center Management',
    extractedFunction: 'UCE & UACE Candidate e-Registration, Random Numbers, Center Invigilation Roster',
    jumoProduct: 'prod-secondary-school',
    jumoProductCode: 'SECERP',
    directorate: 'Directorate of Secondary Academics & Curriculum Innovation',
    department: 'Department of National Examination Center & UNEB Registration',
    office: 'Office of the UNEB Examination Center Supervisor',
    portal: 'Portal of Secondary Academic Affairs & Examinations',
    module: 'UNEB National Examination Center Module (SEC-MOD-UNEB-CENTER)',
    capability: 'Generate UNEB Center E-Registration Roster & Index (CAP-SEC-003)',
    implementationStatus: 'IMPLEMENTED',
    runtimeComponent: 'SECUNEBRegistrationAndCandidateEngine',
    verificationStatus: 'PASSED'
  },
  {
    id: 'TRACE-SEC-04',
    benchmarkSource: 'NAMIRYANGO_COLLEGE',
    benchmarkCategory: 'SECONDARY_EDUCATION',
    evidenceReference: 'Secondary School Science Laboratory Safety and Dangerous Reagents Storage Guidelines',
    extractedDomain: 'Science Laboratory Infrastructure & Dangerous Reagents Control',
    extractedFunction: 'Physics, Chemistry, Biology Apparatus, Reagent Vault Logging, Practical Sessions',
    jumoProduct: 'prod-secondary-school',
    jumoProductCode: 'SECERP',
    directorate: 'Directorate of Science Laboratories & E-Library Resources',
    department: 'Department of Science Laboratories & Apparatus',
    office: 'Office of the Chief Science Laboratory Technician',
    portal: 'Portal of Science Laboratories & Digital Library',
    module: 'Science Laboratories & Chemical Inventory Module (SEC-MOD-SCIENCE-LABS)',
    capability: 'Issue Science Lab Reagents & Chemical Safety Log (CAP-SEC-004)',
    implementationStatus: 'IMPLEMENTED',
    runtimeComponent: 'SECScienceLabReagentsAndInventoryEngine',
    verificationStatus: 'PASSED'
  },
  {
    id: 'TRACE-SEC-05',
    benchmarkSource: 'NAMIRYANGO_COLLEGE',
    benchmarkCategory: 'SECONDARY_EDUCATION',
    evidenceReference: 'Namiryango College Old Boys Association (NACOBA) Constitution & Exit Cohort Guidelines',
    extractedDomain: 'Graduation Cohorts & Alumni Transition to Shared Platform',
    extractedFunction: 'S6 Graduate Exit Census, Alumni Directory Enrollment, Mentorship Bridge',
    jumoProduct: 'prod-secondary-school',
    jumoProductCode: 'SECERP',
    directorate: 'Directorate of Institutional Advancement & Alumni Relations',
    department: 'Department of Alumni Relations & S6 Graduate Exit',
    office: 'Office of the Secondary Alumni Advancement Secretary',
    portal: 'Portal of Alumni Transition & Mentorship',
    module: 'Graduate Exit & Alumni Bridge Module (SEC-MOD-ALUMNI-BRIDGE)',
    capability: 'Enroll S6 Cohort into JUMO ALUMNI Shared Network (CAP-SEC-008)',
    implementationStatus: 'IMPLEMENTED',
    runtimeComponent: 'SECAlumniBridgeAndExitCohortEngine',
    verificationStatus: 'PASSED'
  },

  // ==========================================
  // PRODUCT 3: JUMO CHURCH ERP
  // Benchmark: Namirembe Diocese / Church of Uganda Diocesan Administration + Canonical Law
  // ==========================================
  {
    id: 'TRACE-CH-01',
    benchmarkSource: 'NAMIREMBE_DIOCESE',
    benchmarkCategory: 'ECCLESIASTICAL_CHURCH',
    evidenceReference: 'Namirembe Diocese Diocesan Synod Constitution, Archdeaconry & Parish Governance Code',
    extractedDomain: 'Diocesan Governance & Synod Resolutions',
    extractedFunction: 'Synod Session Resolutions, Archdeaconry Boundary Registers, Parish Councils',
    jumoProduct: 'prod-church-faith',
    jumoProductCode: 'CHERP',
    directorate: 'Directorate of Diocesan Governance, Synod & Parishes',
    department: 'Department of Synod Administration & Archdeaconries',
    office: 'Office of the Diocesan Synod Secretary & Chancellor',
    portal: 'Portal of Diocesan Governance & Archdeaconries',
    module: 'Diocesan Synod & Governance Module (CH-MOD-SYNOD-GOV)',
    capability: 'Promulgate Synod Resolution & Diocesan Statute (CAP-CH-001)',
    implementationStatus: 'IMPLEMENTED',
    runtimeComponent: 'CHDiocesanSynodAndParishEngine',
    verificationStatus: 'PASSED'
  },
  {
    id: 'TRACE-CH-02',
    benchmarkSource: 'NAMIREMBE_DIOCESE',
    benchmarkCategory: 'ECCLESIASTICAL_CHURCH',
    evidenceReference: 'Church of Uganda Canonical Registers for Holy Matrimony, Holy Baptism & Confirmation',
    extractedDomain: 'Ecclesiastical Sacraments & Certified Registers',
    extractedFunction: 'Holy Baptism Numbers, Banns of Marriage, Confirmation Lists, Holy Orders Licensure',
    jumoProduct: 'prod-church-faith',
    jumoProductCode: 'CHERP',
    directorate: 'Directorate of Sacraments, Liturgy & Pastoral Records',
    department: 'Department of Holy Sacraments & Registers',
    office: 'Office of the Sacramental Registry Officer',
    portal: 'Portal of Sacraments & Canonical Registers',
    module: 'Sacramental Registry & Certificates Module (CH-MOD-SACRAMENTS)',
    capability: 'Issue Canonical Marriage Certificate & Banns Registry (CAP-CH-003)',
    implementationStatus: 'IMPLEMENTED',
    runtimeComponent: 'CHSacramentalRegistryEngine',
    verificationStatus: 'PASSED'
  },
  {
    id: 'TRACE-CH-03',
    benchmarkSource: 'NAMIREMBE_DIOCESE',
    benchmarkCategory: 'ECCLESIASTICAL_CHURCH',
    evidenceReference: 'Namirembe Diocese Stewardship, Tithes, Offertories and Quotas Financial Manual',
    extractedDomain: 'Ecclesiastical Stewardship, Tithe Envelopes & Parish Quotas',
    extractedFunction: 'Numbered Tithe Tracking, Thanksgiving Offerings, Diocesan Assessment Quota Settlement',
    jumoProduct: 'prod-church-faith',
    jumoProductCode: 'CHERP',
    directorate: 'Directorate of Diocesan Stewardship, Tithes & Assets',
    department: 'Department of Tithes, Offerings & Diocesan Quotas',
    office: 'Office of the Diocesan Treasurer & Stewardship Dean',
    portal: 'Portal of Stewardship, Tithes & Project Finance',
    module: 'Tithes & Stewardship Collections Module (CH-MOD-TITHES)',
    capability: 'Record Member Tithe Envelope with FAAP Cashbook Entry (CAP-CH-005)',
    implementationStatus: 'IMPLEMENTED',
    runtimeComponent: 'CHTithesAndStewardshipEngine',
    verificationStatus: 'PASSED'
  },
  {
    id: 'TRACE-CH-04',
    benchmarkSource: 'NAMIREMBE_DIOCESE',
    benchmarkCategory: 'ECCLESIASTICAL_CHURCH',
    evidenceReference: 'Diocesan Land Board, Title Deed Audits, and Capital Sanctuary Construction Rules',
    extractedDomain: 'Church Estate, Land Registry & Sanctuary Building Projects',
    extractedFunction: 'Plot Deed Boundary Audits, Sanctuary Roof Capital Pledges, Contractor Valuations',
    jumoProduct: 'prod-church-faith',
    jumoProductCode: 'CHERP',
    directorate: 'Directorate of Diocesan Stewardship, Tithes & Assets',
    department: 'Department of Church Lands, Estates & Capital Projects',
    office: 'Office of the Diocesan Estates Officer',
    portal: 'Portal of Stewardship, Tithes & Project Finance',
    module: 'Church Land & Sanctuary Projects Module (CH-MOD-LAND-PROJECTS)',
    capability: 'Record Church Land Title Deed & Survey Boundary (CAP-CH-006)',
    implementationStatus: 'IMPLEMENTED',
    runtimeComponent: 'CHLandEstatesAndSanctuaryProjectsEngine',
    verificationStatus: 'PASSED'
  },

  // ==========================================
  // PRODUCT 4: JUMO FINTECH
  // Benchmark: QuickBooks Enterprise (Double-Entry GL) + SchoolPay/Telecom Payment Switch
  // ==========================================
  {
    id: 'TRACE-FT-01',
    benchmarkSource: 'QUICKBOOKS_ENTERPRISE',
    benchmarkCategory: 'FINTECH_ACCOUNTING',
    evidenceReference: 'QuickBooks Enterprise General Ledger Architecture, Chart of Accounts Hierarchy & Multi-Currency Trial Balance',
    extractedDomain: 'Double-Entry General Ledger & Chart of Accounts',
    extractedFunction: 'Debit/Credit Balance Enforcement, Journal Posting, Multi-Currency Real-time Trial Balance',
    jumoProduct: 'prod-fintech',
    jumoProductCode: 'FINTECH',
    directorate: 'Directorate of Core Banking, Ledgers & Asset Accounting',
    department: 'Department of General Ledger & Double-Entry Accounting',
    office: 'Office of the Chief Financial Officer (CFO)',
    portal: 'Portal of Core Banking, General Ledger & FAAP',
    module: 'Double-Entry General Ledger & Trial Balance Module (FT-MOD-GL-FAAP)',
    capability: 'Post Balanced Double-Entry Journal to FAAP Ledger (CAP-FT-001)',
    implementationStatus: 'IMPLEMENTED',
    runtimeComponent: 'FTGeneralLedgerAndFAAPEngine',
    verificationStatus: 'PASSED'
  },
  {
    id: 'TRACE-FT-02',
    benchmarkSource: 'QUICKBOOKS_ENTERPRISE',
    benchmarkCategory: 'FINTECH_ACCOUNTING',
    evidenceReference: 'QuickBooks Accounts Payable / Receivable Aging Analysis, 3-Way Match & Bank Reconciliation Protocols',
    extractedDomain: 'Accounts Payable, Receivable Aging & Automated Reconciliation',
    extractedFunction: 'Vendor Invoice 3-Way Match, Customer Invoicing, Bank Statement MT940 / CAMT.053 Reconciliation',
    jumoProduct: 'prod-fintech',
    jumoProductCode: 'FINTECH',
    directorate: 'Directorate of Core Banking, Ledgers & Asset Accounting',
    department: 'Department of Accounts Payable, Receivable & Reconciliation',
    office: 'Office of the Chief Financial Officer (CFO)',
    portal: 'Portal of Core Banking, General Ledger & FAAP',
    module: 'Accounts Payable, Receivable & Bank Recon Module (FT-MOD-AP-AR-RECON)',
    capability: 'Execute Bank Statement Automated Reconciliation (CAP-FT-002)',
    implementationStatus: 'IMPLEMENTED',
    runtimeComponent: 'FTAccountsPayableReceivableAndReconEngine',
    verificationStatus: 'PASSED'
  },
  {
    id: 'TRACE-FT-03',
    benchmarkSource: 'SCHOOLPAY_SWITCH',
    benchmarkCategory: 'PAYMENT_COLLECTION',
    evidenceReference: 'Universal Payment Switch Spec v4.0 (ISO 8583 / ISO 20022 Mobile Money & Bank Rails)',
    extractedDomain: 'Payment Switching & Institutional PRN Routing',
    extractedFunction: 'Telecom Webhooks (MTN MoMo, Airtel Money), Multi-Rail Switching, Fee Splitting',
    jumoProduct: 'prod-fintech',
    jumoProductCode: 'FINTECH',
    directorate: 'Directorate of Payment Switching, Mobile Money & Clearing',
    department: 'Department of Universal Payment Switch & Mobile Money',
    office: 'Office of the Head of Payment Switching Operations',
    portal: 'Portal of Payment Switch & Digital Settlements',
    module: 'Universal Payment Switch & Telecom Gateway Module (FT-MOD-PAY-SWITCH)',
    capability: 'Route Inter-Bank / Telecom Instant Payment via Digital Pay (CAP-FT-003)',
    implementationStatus: 'IMPLEMENTED',
    runtimeComponent: 'FTPaymentSwitchAndDigitalPayEngine',
    verificationStatus: 'PASSED'
  },
  {
    id: 'TRACE-FT-04',
    benchmarkSource: 'QUICKBOOKS_ENTERPRISE',
    benchmarkCategory: 'FINTECH_ACCOUNTING',
    evidenceReference: 'SACCO / Tier 4 Microfinance Institutions and Money Lenders Act 2016 (Uganda)',
    extractedDomain: 'Microfinance & SACCO Core Banking',
    extractedFunction: 'Share Capital, Voluntary Savings, JLG Group Loans, Reducing Balance Amortization',
    jumoProduct: 'prod-fintech',
    jumoProductCode: 'FINTECH',
    directorate: 'Directorate of Microfinance, SACCOs & Digital Wallets',
    department: 'Department of SACCO Core Banking & Member Shares',
    office: 'Office of the SACCO Operations Manager',
    portal: 'Portal of SACCO Operations & Microfinance Lending',
    module: 'SACCO Core Banking & Share Capital Module (FT-MOD-SACCO-CORE)',
    capability: 'Process Member Voluntary Savings Deposit (CAP-FT-005)',
    implementationStatus: 'IMPLEMENTED',
    runtimeComponent: 'FTSACCOCoreBankingEngine',
    verificationStatus: 'PASSED'
  }
];

export function getBenchmarkTraceByProduct(productId: string): BenchmarkTraceRecord[] {
  return BENCHMARK_TRACEABILITY_REGISTRY.filter(r => r.jumoProduct === productId);
}

export function getAllBenchmarkTraces(): BenchmarkTraceRecord[] {
  return BENCHMARK_TRACEABILITY_REGISTRY;
}
