import { CanonicalProductHierarchy } from './types';

export const NATIONAL_EDUCATION_HIERARCHY: CanonicalProductHierarchy = {
  product: {
    id: 'prod-national-education',
    code: 'EDU',
    name: 'National Education Platform',
    category: 'SOVEREIGN_PLATFORM',
    description: 'National Education Management Information System (EMIS), teacher payroll registration, national UNEB examination grading, school licensing standards, and curriculum analytics.',
    version: '2026.4.0',
    iconName: 'GraduationCap',
    status: 'ACTIVE_CORE',
    leadExecutiveRole: 'Permanent Secretary of Education & Sports',
    governingLegislation: 'Education Act & National Curriculum Standards 2026',
    directorateIds: ['EDU-DIR-001', 'EDU-DIR-002', 'EDU-DIR-003', 'EDU-DIR-004']
  },
  directorates: [
    {
      id: 'EDU-DIR-001',
      productId: 'prod-national-education',
      code: 'EDU-DIR-EMIS',
      name: 'Directorate of National EMIS & School Census',
      description: 'Annual school census, learner NIN identification, teacher staff establishment, and capitation grants.',
      leadRole: 'DIRECTOR_EMIS_STATISTICS',
      departmentIds: ['EDU-DEPT-001', 'EDU-DEPT-002']
    },
    {
      id: 'EDU-DIR-002',
      productId: 'prod-national-education',
      code: 'EDU-DIR-EXAMS',
      name: 'Directorate of National Examination & UNEB Assessment',
      description: 'National PLE, UCE, and UACE candidate registration, secure e-marking, and digital result slips.',
      leadRole: 'EXECUTIVE_DIRECTOR_UNEB',
      departmentIds: ['EDU-DEPT-003', 'EDU-DEPT-004']
    },
    {
      id: 'EDU-DIR-003',
      productId: 'prod-national-education',
      code: 'EDU-DIR-STANDARDS',
      name: 'Directorate of Education Standards & School Inspection',
      description: 'Teacher competence appraisals, school infrastructure safety audits, and licensing accreditation.',
      leadRole: 'DIRECTOR_EDUCATION_STANDARDS',
      departmentIds: ['EDU-DEPT-005', 'EDU-DEPT-006']
    },
    {
      id: 'EDU-DIR-004',
      productId: 'prod-national-education',
      code: 'EDU-DIR-HIGHER-ED',
      name: 'Directorate of Higher Education & TVET Skills',
      description: 'University accreditation, student loan board allocations, TVET vocational skills certification.',
      leadRole: 'DIRECTOR_HIGHER_EDUCATION',
      departmentIds: ['EDU-DEPT-007', 'EDU-DEPT-008']
    }
  ],
  departments: [
    { id: 'EDU-DEPT-001', productId: 'prod-national-education', directorateId: 'EDU-DIR-001', code: 'EDU-DEPT-LEARNER-REG', name: 'Department of Learner Tracking & NIN Identification', description: 'Tracks learners from Nursery to Higher Ed with unique LIN numbers.', headRole: 'HEAD_LEARNER_REGISTRY', officeIds: ['EDU-OFF-001'] },
    { id: 'EDU-DEPT-002', productId: 'prod-national-education', directorateId: 'EDU-DIR-001', code: 'EDU-DEPT-CAPITATION', name: 'Department of Universal Primary & Secondary Capitation Grants', description: 'Headcount audits and per-pupil funding disbursements via FAAP.', headRole: 'HEAD_CAPITATION_GRANTS', officeIds: ['EDU-OFF-002'] },
    { id: 'EDU-DEPT-003', productId: 'prod-national-education', directorateId: 'EDU-DIR-002', code: 'EDU-DEPT-CANDIDATE-REG', name: 'Department of National Examination Candidate Registration', description: 'PLE, UCE, and UACE candidate index numbers and biometric e-verification.', headRole: 'HEAD_UNEB_REGISTRATION', officeIds: ['EDU-OFF-003'] },
    { id: 'EDU-DEPT-004', productId: 'prod-national-education', directorateId: 'EDU-DIR-002', code: 'EDU-DEPT-GRADING', name: 'Department of Secure e-Marking & Result Certification', description: 'Anonymized digital script grading, curve normalization, and cryptographic result certificates.', headRole: 'HEAD_EXAMINATION_GRADING', officeIds: ['EDU-OFF-004'] },
    { id: 'EDU-DEPT-005', productId: 'prod-national-education', directorateId: 'EDU-DIR-003', code: 'EDU-DEPT-INSPECTORATE', name: 'Department of Field School Inspection & Quality Assurance', description: 'Tablet-based school inspection visits, teacher attendance GPS tracking, and facility ratings.', headRole: 'CHIEF_SCHOOL_INSPECTOR', officeIds: ['EDU-OFF-005'] },
    { id: 'EDU-DEPT-006', productId: 'prod-national-education', directorateId: 'EDU-DIR-003', code: 'EDU-DEPT-LICENSING', name: 'Department of School Licensing & Teacher Registration (TMIS)', description: 'Accreditation of private & public institutions and teacher professional registration.', headRole: 'HEAD_TEACHER_REGISTRATION', officeIds: ['EDU-OFF-006'] },
    { id: 'EDU-DEPT-007', productId: 'prod-national-education', directorateId: 'EDU-DIR-004', code: 'EDU-DEPT-STUDENT-LOANS', name: 'Department of Higher Education Student Financing (HESFB)', description: 'Means-tested loan allocations, tuition disbursements, and salary deduction tracking.', headRole: 'HEAD_STUDENT_LOANS', officeIds: ['EDU-OFF-007'] },
    { id: 'EDU-DEPT-008', productId: 'prod-national-education', directorateId: 'EDU-DIR-004', code: 'EDU-DEPT-TVET', name: 'Department of TVET Qualifications & Industrial Placement', description: 'Vocational competence assessments, apprenticeship logs, and DIT certificates.', headRole: 'HEAD_TVET_CERTIFICATION', officeIds: ['EDU-OFF-008'] }
  ],
  offices: [
    { id: 'EDU-OFF-001', productId: 'prod-national-education', directorateId: 'EDU-DIR-001', departmentId: 'EDU-DEPT-001', code: 'EDU-OFF-LIN-DESK', name: 'Learner Identification Number (LIN) Desk', description: 'Generation and biometric validation of school learner identification numbers.', officerRole: 'LEARNER_REGISTRY_OFFICER', portalIds: ['EDU-PORTAL-001', 'EDU-PORTAL-002'], moduleIds: ['EDU-MOD-001'] },
    { id: 'EDU-OFF-002', productId: 'prod-national-education', directorateId: 'EDU-DIR-001', departmentId: 'EDU-DEPT-002', code: 'EDU-OFF-GRANT-CALCULATOR', name: 'Capitation Grant Allocation & Disbursal Desk', description: 'Verification of termly school pupil censuses for Treasury release.', officerRole: 'CAPITATION_OFFICER', portalIds: ['EDU-PORTAL-001'], moduleIds: ['EDU-MOD-002'] },
    { id: 'EDU-OFF-003', productId: 'prod-national-education', directorateId: 'EDU-DIR-002', departmentId: 'EDU-DEPT-003', code: 'EDU-OFF-UNEB-INTAKE', name: 'National Candidate Indexing Desk', description: 'Biometric verification of exam candidates and e-registration.', officerRole: 'UNEB_REGISTRATION_OFFICER', portalIds: ['EDU-PORTAL-002'], moduleIds: ['EDU-MOD-003'] },
    { id: 'EDU-OFF-004', productId: 'prod-national-education', directorateId: 'EDU-DIR-002', departmentId: 'EDU-DEPT-004', code: 'EDU-OFF-RESULT-PUBLISH', name: 'National Examination Results & Verification Desk', description: 'Cryptographic result signing and instant SMS/QR code result publication.', officerRole: 'EXAMINATION_CONTROLLER', portalIds: ['EDU-PORTAL-001', 'EDU-PORTAL-003'], moduleIds: ['EDU-MOD-004'] },
    { id: 'EDU-OFF-005', productId: 'prod-national-education', directorateId: 'EDU-DIR-003', departmentId: 'EDU-DEPT-005', code: 'EDU-OFF-FIELD-INSPECT', name: 'Mobile School Inspection Command Desk', description: 'Live monitoring of district inspectors across 135 districts.', officerRole: 'DISTRICT_INSPECTION_LEAD', portalIds: ['EDU-PORTAL-001', 'EDU-PORTAL-002'], moduleIds: ['EDU-MOD-005'] },
    { id: 'EDU-OFF-006', productId: 'prod-national-education', directorateId: 'EDU-DIR-003', departmentId: 'EDU-DEPT-006', code: 'EDU-OFF-TEACHER-LICENSING', name: 'Teacher Professional Registration & TMIS Desk', description: 'Verification of academic qualifications, police clear checks, and teaching licenses.', officerRole: 'TMIS_REGISTRAR', portalIds: ['EDU-PORTAL-002'], moduleIds: ['EDU-MOD-006'] },
    { id: 'EDU-OFF-007', productId: 'prod-national-education', directorateId: 'EDU-DIR-004', departmentId: 'EDU-DEPT-007', code: 'EDU-OFF-LOAN-DISBURSEMENT', name: 'Higher Education Student Loans Desk', description: 'Scoring loan applications and managing university tuition remittances.', officerRole: 'HESFB_LOANS_OFFICER', portalIds: ['EDU-PORTAL-001', 'EDU-PORTAL-003'], moduleIds: ['EDU-MOD-007'] },
    { id: 'EDU-OFF-008', productId: 'prod-national-education', directorateId: 'EDU-DIR-004', departmentId: 'EDU-DEPT-008', code: 'EDU-OFF-TVET-SKILLS', name: 'TVET Vocational Assessment Desk', description: 'Issuing national modular vocational competence certificates.', officerRole: 'TVET_ASSESSOR', portalIds: ['EDU-PORTAL-002'], moduleIds: ['EDU-MOD-008'] }
  ],
  portals: [
    { id: 'EDU-PORTAL-001', productId: 'prod-national-education', directorateId: 'EDU-DIR-001', departmentId: 'EDU-DEPT-001', officeId: 'EDU-OFF-001', code: 'EDU-PORTAL-MINISTRY', name: 'Ministry of Education & Sports Executive Portal', description: 'National education statistics, capitation grant approval, and policy directives.', targetRole: 'MINISTRY_EXECUTIVE', authLevel: 'PKI_SOVEREIGN', route: '/education/executive', moduleIds: ['EDU-MOD-001', 'EDU-MOD-002', 'EDU-MOD-004', 'EDU-MOD-005', 'EDU-MOD-007'] },
    { id: 'EDU-PORTAL-002', productId: 'prod-national-education', directorateId: 'EDU-DIR-002', departmentId: 'EDU-DEPT-003', officeId: 'EDU-OFF-003', code: 'EDU-PORTAL-SCHOOL-HEAD', name: 'Headteacher, Inspector & Teacher Workspace', description: 'Termly EMIS pupil uploads, exam registrations, and inspection reports.', targetRole: 'HEADTEACHER_OR_INSPECTOR', authLevel: 'STAFF', route: '/education/schools', moduleIds: ['EDU-MOD-001', 'EDU-MOD-003', 'EDU-MOD-005', 'EDU-MOD-006', 'EDU-MOD-008'] },
    { id: 'EDU-PORTAL-003', productId: 'prod-national-education', directorateId: 'EDU-DIR-002', departmentId: 'EDU-DEPT-004', officeId: 'EDU-OFF-004', code: 'EDU-PORTAL-PUBLIC', name: 'Public UNEB Results & Student Loan Portal', description: 'Online exam result checking and student loan application portal.', targetRole: 'STUDENT_OR_PARENT', authLevel: 'PUBLIC', route: '/education/public-services', moduleIds: ['EDU-MOD-004', 'EDU-MOD-007'] }
  ],
  modules: [
    { id: 'EDU-MOD-001', productId: 'prod-national-education', directorateId: 'EDU-DIR-001', departmentId: 'EDU-DEPT-001', officeId: 'EDU-OFF-001', portalId: 'EDU-PORTAL-001', code: 'EDU-MOD-EMIS-CENSUS', name: 'National EMIS School & Learner Census Engine', description: 'Unique LIN generation, termly enrollment tracking, and dropout rate analytics.', status: 'ACTIVE_CORE', capabilityIds: ['EDU-CAP-001', 'EDU-CAP-002'], screenIds: ['EDU-SCR-001'], formIds: ['EDU-FORM-001'], dashboardIds: ['EDU-DASH-001'], reportIds: ['EDU-REP-001'], workflowIds: ['EDU-WF-001'], databaseEntityIds: ['EDU-DB-001'], apiIds: ['EDU-API-001'], runtimeComponentId: 'EDU-RTC-001', permissionIds: ['EDU-PERM-001'] },
    { id: 'EDU-MOD-002', productId: 'prod-national-education', directorateId: 'EDU-DIR-001', departmentId: 'EDU-DEPT-002', officeId: 'EDU-OFF-002', portalId: 'EDU-PORTAL-001', code: 'EDU-MOD-CAPITATION-DISBURSE', name: 'Capitation Grant Formula & Payment Bridge', description: 'Automated per-pupil calculation, ghost student deduction, and FAAP direct Treasury release.', status: 'ACTIVE_CORE', capabilityIds: ['EDU-CAP-003', 'EDU-CAP-004'], screenIds: ['EDU-SCR-002'], formIds: ['EDU-FORM-002'], dashboardIds: ['EDU-DASH-001'], reportIds: ['EDU-REP-002'], workflowIds: ['EDU-WF-002'], databaseEntityIds: ['EDU-DB-002'], apiIds: ['EDU-API-002'], runtimeComponentId: 'EDU-RTC-002', permissionIds: ['EDU-PERM-002'] },
    { id: 'EDU-MOD-003', productId: 'prod-national-education', directorateId: 'EDU-DIR-002', departmentId: 'EDU-DEPT-003', officeId: 'EDU-OFF-003', portalId: 'EDU-PORTAL-002', code: 'EDU-MOD-UNEB-REGISTRATION', name: 'National Examination Candidate Registration', description: 'PLE, UCE, and UACE candidate photo/biometric upload and index assignment.', status: 'ACTIVE_CORE', capabilityIds: ['EDU-CAP-005', 'EDU-CAP-006'], screenIds: ['EDU-SCR-003'], formIds: ['EDU-FORM-003'], dashboardIds: ['EDU-DASH-002'], reportIds: ['EDU-REP-003'], workflowIds: ['EDU-WF-003'], databaseEntityIds: ['EDU-DB-003'], apiIds: ['EDU-API-003'], runtimeComponentId: 'EDU-RTC-003', permissionIds: ['EDU-PERM-003'] },
    { id: 'EDU-MOD-004', productId: 'prod-national-education', directorateId: 'EDU-DIR-002', departmentId: 'EDU-DEPT-004', officeId: 'EDU-OFF-004', portalId: 'EDU-PORTAL-001', code: 'EDU-MOD-UNEB-RESULTS', name: 'UNEB Results e-Grading & Certification', description: 'National exam score processing, division classification, and tamper-proof QR certification.', status: 'ACTIVE_CORE', capabilityIds: ['EDU-CAP-007', 'EDU-CAP-008'], screenIds: ['EDU-SCR-004'], formIds: [], dashboardIds: ['EDU-DASH-002'], reportIds: ['EDU-REP-004'], workflowIds: ['EDU-WF-004'], databaseEntityIds: ['EDU-DB-004'], apiIds: ['EDU-API-004'], runtimeComponentId: 'EDU-RTC-004', permissionIds: ['EDU-PERM-004'] },
    { id: 'EDU-MOD-005', productId: 'prod-national-education', directorateId: 'EDU-DIR-003', departmentId: 'EDU-DEPT-005', officeId: 'EDU-OFF-005', portalId: 'EDU-PORTAL-001', code: 'EDU-MOD-INSPECTORATE', name: 'School Quality Standards & Field Inspection', description: 'Digital inspection forms, lesson observation ratings, and infrastructure safety audits.', status: 'ACTIVE_CORE', capabilityIds: ['EDU-CAP-009', 'EDU-CAP-010'], screenIds: ['EDU-SCR-005'], formIds: ['EDU-FORM-004'], dashboardIds: ['EDU-DASH-003'], reportIds: ['EDU-REP-005'], workflowIds: ['EDU-WF-005'], databaseEntityIds: ['EDU-DB-005'], apiIds: ['EDU-API-005'], runtimeComponentId: 'EDU-RTC-005', permissionIds: ['EDU-PERM-005'] },
    { id: 'EDU-MOD-006', productId: 'prod-national-education', directorateId: 'EDU-DIR-003', departmentId: 'EDU-DEPT-006', officeId: 'EDU-OFF-006', portalId: 'EDU-PORTAL-002', code: 'EDU-MOD-TMIS-LICENSING', name: 'Teacher Management Information System (TMIS)', description: 'Teacher registration, pedagogical credentials verification, and code of conduct tracking.', status: 'ACTIVE_CORE', capabilityIds: ['EDU-CAP-011', 'EDU-CAP-012'], screenIds: ['EDU-SCR-006'], formIds: ['EDU-FORM-005'], dashboardIds: ['EDU-DASH-003'], reportIds: ['EDU-REP-006'], workflowIds: ['EDU-WF-006'], databaseEntityIds: ['EDU-DB-006'], apiIds: ['EDU-API-006'], runtimeComponentId: 'EDU-RTC-006', permissionIds: ['EDU-PERM-006'] },
    { id: 'EDU-MOD-007', productId: 'prod-national-education', directorateId: 'EDU-DIR-004', departmentId: 'EDU-DEPT-007', officeId: 'EDU-OFF-007', portalId: 'EDU-PORTAL-001', code: 'EDU-MOD-STUDENT-LOANS', name: 'Higher Education Student Financing Engine', description: 'Socio-economic means test scoring, tuition loan approval, and recovery via NSSF/URA.', status: 'ACTIVE_CORE', capabilityIds: ['EDU-CAP-013', 'EDU-CAP-014'], screenIds: ['EDU-SCR-007'], formIds: ['EDU-FORM-006'], dashboardIds: ['EDU-DASH-004'], reportIds: ['EDU-REP-007'], workflowIds: ['EDU-WF-007'], databaseEntityIds: ['EDU-DB-007'], apiIds: ['EDU-API-007'], runtimeComponentId: 'EDU-RTC-007', permissionIds: ['EDU-PERM-007'] },
    { id: 'EDU-MOD-008', productId: 'prod-national-education', directorateId: 'EDU-DIR-004', departmentId: 'EDU-DEPT-008', officeId: 'EDU-OFF-008', portalId: 'EDU-PORTAL-002', code: 'EDU-MOD-TVET-SKILLS', name: 'TVET Modular Vocational Certification', description: 'Assessment of practical skills, industrial workplace logs, and DIT certificates.', status: 'ACTIVE_CORE', capabilityIds: ['EDU-CAP-015', 'EDU-CAP-016'], screenIds: ['EDU-SCR-008'], formIds: ['EDU-FORM-007'], dashboardIds: ['EDU-DASH-004'], reportIds: ['EDU-REP-008'], workflowIds: ['EDU-WF-008'], databaseEntityIds: ['EDU-DB-008'], apiIds: ['EDU-API-008'], runtimeComponentId: 'EDU-RTC-008', permissionIds: ['EDU-PERM-008'] }
  ],
  capabilities: [
    { id: 'EDU-CAP-001', productId: 'prod-national-education', directorateId: 'EDU-DIR-001', departmentId: 'EDU-DEPT-001', officeId: 'EDU-OFF-001', portalId: 'EDU-PORTAL-001', moduleId: 'EDU-MOD-001', code: 'EDU_CAP_GENERATE_LIN', name: 'Issue Unique Learner Identification Number (LIN)', description: 'Links learner to Mother/Father NIN and issues permanent 10-digit LIN.', serviceAction: 'edu.emis.generateLin', requiredPermission: 'EDU-PERM-001', runtimeComponentId: 'EDU-RTC-001', status: 'ACTIVE_CORE' },
    { id: 'EDU-CAP-002', productId: 'prod-national-education', directorateId: 'EDU-DIR-001', departmentId: 'EDU-DEPT-001', officeId: 'EDU-OFF-001', portalId: 'EDU-PORTAL-001', moduleId: 'EDU-MOD-001', code: 'EDU_CAP_ENROLLMENT_CENSUS', name: 'Compile Annual National School Census', description: 'Aggregates enrollment across all 40,000 schools by gender, grade, and district.', serviceAction: 'edu.emis.compileCensus', requiredPermission: 'EDU-PERM-001', runtimeComponentId: 'EDU-RTC-001', status: 'ACTIVE_CORE' },
    { id: 'EDU-CAP-003', productId: 'prod-national-education', directorateId: 'EDU-DIR-001', departmentId: 'EDU-DEPT-002', officeId: 'EDU-OFF-002', portalId: 'EDU-PORTAL-001', moduleId: 'EDU-MOD-002', code: 'EDU_CAP_CALCULATE_CAPITATION', name: 'Calculate Termly Capitation Grant Allocations', description: 'Applies national funding formula with biometric head-count deduplication.', serviceAction: 'edu.capitation.calculateAllocations', requiredPermission: 'EDU-PERM-002', runtimeComponentId: 'EDU-RTC-002', status: 'ACTIVE_CORE' },
    { id: 'EDU-CAP-004', productId: 'prod-national-education', directorateId: 'EDU-DIR-001', departmentId: 'EDU-DEPT-002', officeId: 'EDU-OFF-002', portalId: 'EDU-PORTAL-001', moduleId: 'EDU-MOD-002', code: 'EDU_CAP_DISBURSE_GRANTS', name: 'Authorize Treasury Direct Capitation Transfer', description: 'Executes bulk payment instruction via FAAP to school bank accounts.', serviceAction: 'edu.capitation.disburseTreasuryFunds', requiredPermission: 'EDU-PERM-002', runtimeComponentId: 'EDU-RTC-002', status: 'ACTIVE_CORE' },
    { id: 'EDU-CAP-005', productId: 'prod-national-education', directorateId: 'EDU-DIR-002', departmentId: 'EDU-DEPT-003', officeId: 'EDU-OFF-003', portalId: 'EDU-PORTAL-002', moduleId: 'EDU-MOD-003', code: 'EDU_CAP_REGISTER_CANDIDATE', name: 'Register National Examination Candidate', description: 'Uploads continuous assessment scores, passport photo, and subject combinations.', serviceAction: 'edu.uneb.registerCandidate', requiredPermission: 'EDU-PERM-003', runtimeComponentId: 'EDU-RTC-003', status: 'ACTIVE_CORE' },
    { id: 'EDU-CAP-006', productId: 'prod-national-education', directorateId: 'EDU-DIR-002', departmentId: 'EDU-DEPT-003', officeId: 'EDU-OFF-003', portalId: 'EDU-PORTAL-002', moduleId: 'EDU-MOD-003', code: 'EDU_CAP_ALLOCATE_INDEX_NUMBERS', name: 'Generate UNEB Center & Candidate Index Numbers', description: 'Assigns tamper-proof sequential index numbers conforming to national security standards.', serviceAction: 'edu.uneb.allocateIndexNumbers', requiredPermission: 'EDU-PERM-003', runtimeComponentId: 'EDU-RTC-003', status: 'ACTIVE_CORE' },
    { id: 'EDU-CAP-007', productId: 'prod-national-education', directorateId: 'EDU-DIR-002', departmentId: 'EDU-DEPT-004', officeId: 'EDU-OFF-004', portalId: 'EDU-PORTAL-001', moduleId: 'EDU-MOD-004', code: 'EDU_CAP_PROCESS_UNEB_GRADES', name: 'Process UNEB Normalized Grades & Divisions', description: 'Applies statistical standard error smoothing and calculates Division 1, 2, 3, 4, U, X.', serviceAction: 'edu.uneb.processGrades', requiredPermission: 'EDU-PERM-004', runtimeComponentId: 'EDU-RTC-004', status: 'ACTIVE_CORE' },
    { id: 'EDU-CAP-008', productId: 'prod-national-education', directorateId: 'EDU-DIR-002', departmentId: 'EDU-DEPT-004', officeId: 'EDU-OFF-004', portalId: 'EDU-PORTAL-001', moduleId: 'EDU-MOD-004', code: 'EDU_CAP_SIGN_RESULT_SLIPS', name: 'Cryptographically Sign National Result Slips', description: 'Signs PDF certificates using UNEB Sovereign Key with verification QR code.', serviceAction: 'edu.uneb.signCertificates', requiredPermission: 'EDU-PERM-004', runtimeComponentId: 'EDU-RTC-004', status: 'ACTIVE_CORE' },
    { id: 'EDU-CAP-009', productId: 'prod-national-education', directorateId: 'EDU-DIR-003', departmentId: 'EDU-DEPT-005', officeId: 'EDU-OFF-005', portalId: 'EDU-PORTAL-001', moduleId: 'EDU-MOD-005', code: 'EDU_CAP_SUBMIT_INSPECTION', name: 'Submit Tablet Field School Inspection Dossier', description: 'Captures GPS check-in, photo evidence of facilities, and teacher attendance roster.', serviceAction: 'edu.inspect.submitDossier', requiredPermission: 'EDU-PERM-005', runtimeComponentId: 'EDU-RTC-005', status: 'ACTIVE_CORE' },
    { id: 'EDU-CAP-010', productId: 'prod-national-education', directorateId: 'EDU-DIR-003', departmentId: 'EDU-DEPT-005', officeId: 'EDU-OFF-005', portalId: 'EDU-PORTAL-001', moduleId: 'EDU-MOD-005', code: 'EDU_CAP_SCORE_SCHOOL_STANDARDS', name: 'Calculate School Quality Standards Rating', description: 'Scores school on curriculum delivery, hygiene, teacher ratio, and science laboratories.', serviceAction: 'edu.inspect.scoreRating', requiredPermission: 'EDU-PERM-005', runtimeComponentId: 'EDU-RTC-005', status: 'ACTIVE_CORE' },
    { id: 'EDU-CAP-011', productId: 'prod-national-education', directorateId: 'EDU-DIR-003', departmentId: 'EDU-DEPT-006', officeId: 'EDU-OFF-006', portalId: 'EDU-PORTAL-002', moduleId: 'EDU-MOD-006', code: 'EDU_CAP_VERIFY_TEACHER_CREDS', name: 'Verify Teacher Academic Credentials & TMIS', description: 'Cross-verifies NCDC curriculum qualifications and grants national teaching license.', serviceAction: 'edu.tmis.verifyCredentials', requiredPermission: 'EDU-PERM-006', runtimeComponentId: 'EDU-RTC-006', status: 'ACTIVE_CORE' },
    { id: 'EDU-CAP-012', productId: 'prod-national-education', directorateId: 'EDU-DIR-003', departmentId: 'EDU-DEPT-006', officeId: 'EDU-OFF-006', portalId: 'EDU-PORTAL-002', moduleId: 'EDU-MOD-006', code: 'EDU_CAP_DISCIPLINARY_ACTION', name: 'Log Teacher Code of Conduct Infractions', description: 'Maintains national teacher disciplinary registry with license suspension enforcement.', serviceAction: 'edu.tmis.logDiscipline', requiredPermission: 'EDU-PERM-006', runtimeComponentId: 'EDU-RTC-006', status: 'ACTIVE_CORE' },
    { id: 'EDU-CAP-013', productId: 'prod-national-education', directorateId: 'EDU-DIR-004', departmentId: 'EDU-DEPT-007', officeId: 'EDU-OFF-007', portalId: 'EDU-PORTAL-001', moduleId: 'EDU-MOD-007', code: 'EDU_CAP_SCORE_STUDENT_LOAN', name: 'Evaluate Higher Education Loan Means Test', description: 'Scores applicant poverty proxy indicators and approves science/humanities quotas.', serviceAction: 'edu.hesfb.scoreMeansTest', requiredPermission: 'EDU-PERM-007', runtimeComponentId: 'EDU-RTC-007', status: 'ACTIVE_CORE' },
    { id: 'EDU-CAP-014', productId: 'prod-national-education', directorateId: 'EDU-DIR-004', departmentId: 'EDU-DEPT-007', officeId: 'EDU-OFF-007', portalId: 'EDU-PORTAL-001', moduleId: 'EDU-MOD-007', code: 'EDU_CAP_TRACK_LOAN_RECOVERY', name: 'Track Graduate Loan Repayment via Payroll', description: 'Deducts loan repayments automatically from formal payroll via URA/NSSF gateway.', serviceAction: 'edu.hesfb.trackRepayment', requiredPermission: 'EDU-PERM-007', runtimeComponentId: 'EDU-RTC-007', status: 'ACTIVE_CORE' },
    { id: 'EDU-CAP-015', productId: 'prod-national-education', directorateId: 'EDU-DIR-004', departmentId: 'EDU-DEPT-008', officeId: 'EDU-OFF-008', portalId: 'EDU-PORTAL-002', moduleId: 'EDU-MOD-008', code: 'EDU_CAP_ASSESS_TVET_COMPETENCE', name: 'Assess Modular TVET Vocational Competence', description: 'Scores practical workshop demonstrations for plumbing, electrical, tailoring, and automotive.', serviceAction: 'edu.tvet.assessCompetence', requiredPermission: 'EDU-PERM-008', runtimeComponentId: 'EDU-RTC-008', status: 'ACTIVE_CORE' },
    { id: 'EDU-CAP-016', productId: 'prod-national-education', directorateId: 'EDU-DIR-004', departmentId: 'EDU-DEPT-008', officeId: 'EDU-OFF-008', portalId: 'EDU-PORTAL-002', moduleId: 'EDU-MOD-008', code: 'EDU_CAP_ISSUE_DIT_CERT', name: 'Issue Directorate of Industrial Training Certificate', description: 'Generates level 1 to 5 UVQF national vocational qualification award.', serviceAction: 'edu.tvet.issueDitCert', requiredPermission: 'EDU-PERM-008', runtimeComponentId: 'EDU-RTC-008', status: 'ACTIVE_CORE' }
  ],
  screens: [
    { id: 'EDU-SCR-001', productId: 'prod-national-education', moduleId: 'EDU-MOD-001', code: 'EDU-SCR-EMIS', title: 'National EMIS Census & Learner Ledger', description: 'Real-time database of all learners and schools.', viewType: 'TABLE', route: '/education/emis' },
    { id: 'EDU-SCR-002', productId: 'prod-national-education', moduleId: 'EDU-MOD-002', code: 'EDU-SCR-GRANTS', title: 'Capitation Grants Allocation & Treasury Release', description: 'Per-pupil funding formulas and disbursement records.', viewType: 'TABLE', route: '/education/capitation' },
    { id: 'EDU-SCR-003', productId: 'prod-national-education', moduleId: 'EDU-MOD-003', code: 'EDU-SCR-UNEB-REG', title: 'National Examination Candidate Registration', description: 'PLE, UCE, and UACE candidate rosters.', viewType: 'TABLE', route: '/education/candidates' },
    { id: 'EDU-SCR-004', productId: 'prod-national-education', moduleId: 'EDU-MOD-004', code: 'EDU-SCR-RESULTS', title: 'UNEB National Examination Results & Grading', description: 'Exam scores, grade distributions, and slip verification.', viewType: 'DASHBOARD', route: '/education/results' },
    { id: 'EDU-SCR-005', productId: 'prod-national-education', moduleId: 'EDU-MOD-005', code: 'EDU-SCR-INSPECT', title: 'School Standards & Field Inspection Console', description: 'District inspection visits and facility ratings.', viewType: 'DASHBOARD', route: '/education/inspections' },
    { id: 'EDU-SCR-006', productId: 'prod-national-education', moduleId: 'EDU-MOD-006', code: 'EDU-SCR-TMIS', title: 'Teacher Management & Professional Licensing (TMIS)', description: 'Registered teachers, qualifications, and licensing status.', viewType: 'TABLE', route: '/education/teachers' },
    { id: 'EDU-SCR-007', productId: 'prod-national-education', moduleId: 'EDU-MOD-007', code: 'EDU-SCR-LOANS', title: 'Higher Education Student Financing Board (HESFB)', description: 'Student loan applications, disbursements, and recovery.', viewType: 'TABLE', route: '/education/loans' },
    { id: 'EDU-SCR-008', productId: 'prod-national-education', moduleId: 'EDU-MOD-008', code: 'EDU-SCR-TVET', title: 'TVET Vocational Skills & DIT Certification', description: 'Competence assessment scores and vocational certificates.', viewType: 'TABLE', route: '/education/tvet' }
  ],
  forms: [
    { id: 'EDU-FORM-001', productId: 'prod-national-education', moduleId: 'EDU-MOD-001', code: 'EDU-FORM-LIN', title: 'Learner Identification Number (LIN) Enrollment', submitAction: 'edu.emis.generateLin', fieldCount: 5, fields: [{ name: 'learnerName', label: 'Learner Full Name', type: 'text', required: true }, { name: 'dob', label: 'Date of Birth', type: 'date', required: true }, { name: 'gender', label: 'Gender', type: 'select', required: true }, { name: 'parentNIN', label: 'Parent / Guardian NIN', type: 'text', required: true }, { name: 'schoolEmisNo', label: 'School EMIS Center Number', type: 'text', required: true }], validationRules: ['PARENT_NIN_VALID', 'EMIS_CENTER_EXISTS'] },
    { id: 'EDU-FORM-002', productId: 'prod-national-education', moduleId: 'EDU-MOD-002', code: 'EDU-FORM-CAPITATION', title: 'Capitation Grant Disbursement Authorization', submitAction: 'edu.capitation.disburseTreasuryFunds', fieldCount: 4, fields: [{ name: 'academicTerm', label: 'Academic Term / Year', type: 'text', required: true }, { name: 'totalPupilsAudited', label: 'Audited Pupil Count', type: 'number', required: true }, { name: 'grantPerPupilUgx', label: 'Statutory Rate (UGX)', type: 'number', required: true }, { name: 'schoolAccount', label: 'School Treasury Bank Account', type: 'text', required: true }], validationRules: ['TREASURY_ACCOUNT_ACTIVE'] },
    { id: 'EDU-FORM-003', productId: 'prod-national-education', moduleId: 'EDU-MOD-003', code: 'EDU-FORM-CANDIDATE', title: 'UNEB Examination Candidate Registration', submitAction: 'edu.uneb.registerCandidate', fieldCount: 5, fields: [{ name: 'candidateName', label: 'Candidate Legal Name', type: 'text', required: true }, { name: 'linNumber', label: 'Learner LIN Number', type: 'text', required: true }, { name: 'examLevel', label: 'Exam Level (PLE/UCE/UACE)', type: 'select', required: true }, { name: 'centerNumber', label: 'Exam Center Number', type: 'text', required: true }, { name: 'subjectCodes', label: 'Registered Subject Codes', type: 'text', required: true }], validationRules: ['LIN_EXISTS', 'SUBJECT_COMBINATION_VALID'] },
    { id: 'EDU-FORM-004', productId: 'prod-national-education', moduleId: 'EDU-MOD-005', code: 'EDU-FORM-INSPECTION', title: 'School Field Inspection Dossier Submission', submitAction: 'edu.inspect.submitDossier', fieldCount: 5, fields: [{ name: 'schoolEmisNo', label: 'School EMIS Number', type: 'text', required: true }, { name: 'inspectorStaffId', label: 'Inspector Staff ID', type: 'text', required: true }, { name: 'teacherAttendancePercent', label: 'Teacher Attendance (%)', type: 'number', required: true }, { name: 'pupilSanitationRating', label: 'Sanitation Facility Score (1-5)', type: 'number', required: true }, { name: 'inspectionSummary', label: 'Inspection Findings & Actions', type: 'textarea', required: true }], validationRules: ['INSPECTOR_CREDENTIALS_VALID'] },
    { id: 'EDU-FORM-005', productId: 'prod-national-education', moduleId: 'EDU-MOD-006', code: 'EDU-FORM-TEACHER-REG', title: 'TMIS Teacher Professional Registration', submitAction: 'edu.tmis.verifyCredentials', fieldCount: 5, fields: [{ name: 'teacherNIN', label: 'Teacher National ID (NIN)', type: 'text', required: true }, { name: 'fullName', label: 'Full Legal Name', type: 'text', required: true }, { name: 'qualificationDegree', label: 'Highest Academic Qualification', type: 'text', required: true }, { name: 'institutionAttended', label: 'Graduating University / College', type: 'text', required: true }, { name: 'primaryTeachingSubject', label: 'Specialization Subject', type: 'text', required: true }], validationRules: ['ACADEMIC_CERTIFICATE_VERIFIED'] },
    { id: 'EDU-FORM-006', productId: 'prod-national-education', moduleId: 'EDU-MOD-007', code: 'EDU-FORM-LOAN-APP', title: 'Higher Education Student Loan Application', submitAction: 'edu.hesfb.scoreMeansTest', fieldCount: 5, fields: [{ name: 'applicantNIN', label: 'Student National ID (NIN)', type: 'text', required: true }, { name: 'universityAdmitted', label: 'University / Tertiary Institution', type: 'text', required: true }, { name: 'courseName', label: 'Degree / Diploma Program', type: 'text', required: true }, { name: 'annualTuitionFee', label: 'Approved Tuition Fee (UGX)', type: 'number', required: true }, { name: 'householdIncomeBracket', label: 'Household Income Bracket', type: 'select', required: true }], validationRules: ['ADMISSION_LETTER_VALID'] },
    { id: 'EDU-FORM-007', productId: 'prod-national-education', moduleId: 'EDU-MOD-008', code: 'EDU-FORM-TVET-ASSESS', title: 'TVET Practical Competence Evaluation', submitAction: 'edu.tvet.assessCompetence', fieldCount: 4, fields: [{ name: 'candidateLin', label: 'Trainee LIN Number', type: 'text', required: true }, { name: 'tradeCode', label: 'Vocational Trade Code', type: 'select', required: true }, { name: 'practicalScore', label: 'Practical Workshop Score (1-100)', type: 'number', required: true }, { name: 'assessorLicense', label: 'Certified Assessor License ID', type: 'text', required: true }], validationRules: ['ASSESSOR_ACCREDITED'] }
  ],
  dashboards: [
    {
      id: 'EDU-DASH-001',
      productId: 'prod-national-education',
      moduleId: 'EDU-MOD-001',
      code: 'EDU-DASH-EMIS-CENSUS',
      title: 'National School Census & Capitation Telemetry',
      widgetCount: 4,
      kpiMetrics: [
        { label: 'Total Enrolled Learners', value: '11,420,800 Learners', trend: 'up', change: '+2.4% YoY' },
        { label: 'Registered Educational Institutions', value: '38,450 Schools', trend: 'up', change: '100% Geo-Tagged' },
        { label: 'Termly Capitation Disbursed', value: 'UGX 145 Billion', trend: 'up', change: 'Zero Ghost Leakage' },
        { label: 'Primary Completion Rate', value: '78.2%', trend: 'up', change: '+3.1% Improvement' }
      ]
    },
    {
      id: 'EDU-DASH-002',
      productId: 'prod-national-education',
      moduleId: 'EDU-MOD-004',
      code: 'EDU-DASH-UNEB',
      title: 'National Examination Performance & Grading Trends',
      widgetCount: 4,
      kpiMetrics: [
        { label: 'Annual UNEB Candidates', value: '1,280,000 Candidates', trend: 'up', change: 'PLE/UCE/UACE' },
        { label: 'Division 1 Pass Rate', value: '14.8%', trend: 'up', change: '+1.2% STEM Focus' },
        { label: 'Exam Malpractice Infractions', value: '0.01%', trend: 'down', change: 'Biometric Sealed' },
        { label: 'Digital Result Slips Verified', value: '980,000 Verified', trend: 'up', change: 'Instant QR' }
      ]
    },
    {
      id: 'EDU-DASH-003',
      productId: 'prod-national-education',
      moduleId: 'EDU-MOD-005',
      code: 'EDU-DASH-STANDARDS',
      title: 'School Quality Inspection & Teacher Deployment',
      widgetCount: 4,
      kpiMetrics: [
        { label: 'Schools Inspected This Term', value: '28,400 Schools', trend: 'up', change: '73.8% Inspected' },
        { label: 'Teacher Attendance Rate', value: '92.4%', trend: 'up', change: 'GPS Tracked' },
        { label: 'Licensed TMIS Teachers', value: '240,000 Teachers', trend: 'up', change: '100% Vetted' },
        { label: 'Pupil-Teacher Ratio (PTR)', value: '42 : 1', trend: 'down', change: 'Improved' }
      ]
    },
    {
      id: 'EDU-DASH-004',
      productId: 'prod-national-education',
      moduleId: 'EDU-MOD-007',
      code: 'EDU-DASH-HIGHER-ED',
      title: 'Higher Education Student Loans & TVET Vocational Impact',
      widgetCount: 4,
      kpiMetrics: [
        { label: 'Active Student Loan Beneficiaries', value: '18,400 Students', trend: 'up', change: '84% STEM Programs' },
        { label: 'Annual Loan Recovery Rate', value: '78.5%', trend: 'up', change: 'Payroll Deducted' },
        { label: 'Certified TVET Craftsmen', value: '42,000 Certified', trend: 'up', change: '+14% YoY' },
        { label: 'Graduate Industrial Employment', value: '81.2%', trend: 'up', change: 'Within 6 Months' }
      ]
    }
  ],
  reports: [
    { id: 'EDU-REP-001', productId: 'prod-national-education', moduleId: 'EDU-MOD-001', code: 'EDU-REP-EMIS-ANNUAL', title: 'Annual National Education Statistical Abstract', format: 'SUMMARY', exportTypes: ['PDF', 'XLSX'] },
    { id: 'EDU-REP-002', productId: 'prod-national-education', moduleId: 'EDU-MOD-002', code: 'EDU-REP-CAPITATION-PAYROLL', title: 'District Capitation Grant Disbursal Treasury Schedule', format: 'FINANCIAL_STATEMENT', exportTypes: ['PDF', 'CSV', 'XLSX'] },
    { id: 'EDU-REP-003', productId: 'prod-national-education', moduleId: 'EDU-MOD-003', code: 'EDU-REP-CANDIDATES-ROSTER', title: 'National Examination Candidate Center Attendance Roster', format: 'TABULAR', exportTypes: ['PDF', 'CSV'] },
    { id: 'EDU-REP-004', productId: 'prod-national-education', moduleId: 'EDU-MOD-004', code: 'EDU-REP-UNEB-GAZETTE', title: 'UNEB National Examination Results Official Gazette', format: 'REGULATORY_RETURN', exportTypes: ['PDF'] },
    { id: 'EDU-REP-005', productId: 'prod-national-education', moduleId: 'EDU-MOD-005', code: 'EDU-REP-INSPECTION-AUDIT', title: 'School Basic Standards & Safety Quality Assurance Audit', format: 'SUMMARY', exportTypes: ['PDF', 'XLSX'] },
    { id: 'EDU-REP-006', productId: 'prod-national-education', moduleId: 'EDU-MOD-006', code: 'EDU-REP-TEACHER-CENSUS', title: 'National Teacher Staff Establishment & TMIS Registry', format: 'TABULAR', exportTypes: ['PDF', 'CSV'] },
    { id: 'EDU-REP-007', productId: 'prod-national-education', moduleId: 'EDU-MOD-007', code: 'EDU-REP-LOAN-RECOVERY', title: 'HESFB Student Loan Disbursement & Recovery Ledger', format: 'FINANCIAL_STATEMENT', exportTypes: ['PDF', 'CSV'] },
    { id: 'EDU-REP-008', productId: 'prod-national-education', moduleId: 'EDU-MOD-008', code: 'EDU-REP-TVET-SKILLS', title: 'DIT National Vocational Competence Certification Register', format: 'TABULAR', exportTypes: ['PDF', 'CSV'] }
  ],
  workflows: [
    { id: 'EDU-WF-001', productId: 'prod-national-education', moduleId: 'EDU-MOD-001', code: 'EDU-WF-EMIS', title: 'Annual School EMIS Data Census Cycle', stages: ['School Submission', 'District Verification', 'National Aggregation', 'Census Gazette'], slaHours: 120, requiredApprovers: ['HEADTEACHER', 'DISTRICT_EDUCATION_OFFICER'], initialState: 'School Submission' },
    { id: 'EDU-WF-002', productId: 'prod-national-education', moduleId: 'EDU-MOD-002', code: 'EDU-WF-CAPITATION', title: 'Termly Capitation Grants Approval & Disbursal', stages: ['Headcount Audit', 'Grant Calculation', 'Permanent Secretary Approval', 'Treasury Direct EFT'], slaHours: 48, requiredApprovers: ['CAPITATION_OFFICER', 'PERMANENT_SECRETARY'], initialState: 'Headcount Audit' },
    { id: 'EDU-WF-003', productId: 'prod-national-education', moduleId: 'EDU-MOD-003', code: 'EDU-WF-CANDIDATES', title: 'UNEB Exam Candidate Registration & Verification', stages: ['Biometric Upload', 'Continuous Assessment Ingest', 'Index Numbering', 'Timetable Issuance'], slaHours: 72, requiredApprovers: ['UNEB_REGISTRATION_OFFICER'], initialState: 'Biometric Upload' },
    { id: 'EDU-WF-004', productId: 'prod-national-education', moduleId: 'EDU-MOD-004', code: 'EDU-WF-GRADING', title: 'National Examination e-Grading & Release Cycle', stages: ['Blind Script Scan', 'Digital Marking', 'Grade Moderation', 'Ministerial Release'], slaHours: 336, requiredApprovers: ['EXECUTIVE_DIRECTOR_UNEB'], initialState: 'Blind Script Scan' },
    { id: 'EDU-WF-005', productId: 'prod-national-education', moduleId: 'EDU-MOD-005', code: 'EDU-WF-INSPECTION', title: 'School Quality Inspection & Corrective Action', stages: ['Field Inspection', 'Tablet Report Upload', 'School Notice Issuance', 'Compliance Re-visit'], slaHours: 48, requiredApprovers: ['CHIEF_SCHOOL_INSPECTOR'], initialState: 'Field Inspection' },
    { id: 'EDU-WF-006', productId: 'prod-national-education', moduleId: 'EDU-MOD-006', code: 'EDU-WF-TMIS', title: 'Teacher Registration & Licensing Assessment', stages: ['Application Ingest', 'Credential Verification', 'Police Record Check', 'License Generation'], slaHours: 96, requiredApprovers: ['TMIS_REGISTRAR'], initialState: 'Application Ingest' },
    { id: 'EDU-WF-007', productId: 'prod-national-education', moduleId: 'EDU-MOD-007', code: 'EDU-WF-LOANS', title: 'Higher Education Student Loan Scoring & Award', stages: ['Means Test Scoring', 'Board Selection', 'Tuition EFT to University', 'Loan Agreement Signing'], slaHours: 120, requiredApprovers: ['HESFB_LOANS_OFFICER'], initialState: 'Means Test Scoring' },
    { id: 'EDU-WF-008', productId: 'prod-national-education', moduleId: 'EDU-MOD-008', code: 'EDU-WF-TVET', title: 'TVET Vocational Assessment & Certification', stages: ['Practical Demonstration', 'Assessor Grading', 'DIT Verification', 'National UVQF Award'], slaHours: 48, requiredApprovers: ['TVET_ASSESSOR'], initialState: 'Practical Demonstration' }
  ],
  databaseEntities: [
    { id: 'EDU-DB-001', productId: 'prod-national-education', moduleId: 'EDU-MOD-001', tableName: 'edu_learners', primaryKey: 'lin', fields: [{ name: 'lin', type: 'VARCHAR(16)', required: true, indexed: true }, { name: 'full_name', type: 'VARCHAR(128)', required: true }, { name: 'school_emis_no', type: 'VARCHAR(32)', required: true }], auditLogged: true },
    { id: 'EDU-DB-002', productId: 'prod-national-education', moduleId: 'EDU-MOD-002', tableName: 'edu_capitation_grants', primaryKey: 'grant_id', fields: [{ name: 'grant_id', type: 'VARCHAR(64)', required: true }, { name: 'school_emis_no', type: 'VARCHAR(32)', required: true }, { name: 'amount', type: 'DECIMAL(18,2)', required: true }], auditLogged: true },
    { id: 'EDU-DB-003', productId: 'prod-national-education', moduleId: 'EDU-MOD-003', tableName: 'edu_uneb_candidates', primaryKey: 'index_number', fields: [{ name: 'index_number', type: 'VARCHAR(32)', required: true, indexed: true }, { name: 'lin', type: 'VARCHAR(16)', required: true }, { name: 'exam_level', type: 'VARCHAR(16)', required: true }], auditLogged: true },
    { id: 'EDU-DB-004', productId: 'prod-national-education', moduleId: 'EDU-MOD-004', tableName: 'edu_uneb_results', primaryKey: 'result_id', fields: [{ name: 'result_id', type: 'VARCHAR(64)', required: true }, { name: 'index_number', type: 'VARCHAR(32)', required: true, indexed: true }, { name: 'division', type: 'VARCHAR(8)', required: true }], auditLogged: true },
    { id: 'EDU-DB-005', productId: 'prod-national-education', moduleId: 'EDU-MOD-005', tableName: 'edu_inspection_dossiers', primaryKey: 'inspection_id', fields: [{ name: 'inspection_id', type: 'VARCHAR(64)', required: true }, { name: 'school_emis_no', type: 'VARCHAR(32)', required: true }, { name: 'overall_score', type: 'FLOAT', required: true }], auditLogged: true },
    { id: 'EDU-DB-006', productId: 'prod-national-education', moduleId: 'EDU-MOD-006', tableName: 'edu_tmis_teachers', primaryKey: 'tmis_id', fields: [{ name: 'tmis_id', type: 'VARCHAR(64)', required: true }, { name: 'nin', type: 'VARCHAR(14)', required: true, indexed: true }, { name: 'license_status', type: 'VARCHAR(32)', required: true }], auditLogged: true },
    { id: 'EDU-DB-007', productId: 'prod-national-education', moduleId: 'EDU-MOD-007', tableName: 'edu_student_loans', primaryKey: 'loan_id', fields: [{ name: 'loan_id', type: 'VARCHAR(64)', required: true }, { name: 'nin', type: 'VARCHAR(14)', required: true, indexed: true }, { name: 'loan_balance', type: 'DECIMAL(18,2)', required: true }], auditLogged: true },
    { id: 'EDU-DB-008', productId: 'prod-national-education', moduleId: 'EDU-MOD-008', tableName: 'edu_tvet_certifications', primaryKey: 'cert_id', fields: [{ name: 'cert_id', type: 'VARCHAR(64)', required: true }, { name: 'lin', type: 'VARCHAR(16)', required: true }, { name: 'trade_code', type: 'VARCHAR(32)', required: true }], auditLogged: true }
  ],
  apis: [
    { id: 'EDU-API-001', productId: 'prod-national-education', moduleId: 'EDU-MOD-001', code: 'EDU_API_LIN', method: 'POST', endpoint: '/api/v1/education/emis/learners', requiredPermission: 'EDU-PERM-001', handlerName: 'registerLearnerHandler', summary: 'Register learner and issue LIN' },
    { id: 'EDU-API-002', productId: 'prod-national-education', moduleId: 'EDU-MOD-002', code: 'EDU_API_CAPITATION', method: 'POST', endpoint: '/api/v1/education/grants/disburse', requiredPermission: 'EDU-PERM-002', handlerName: 'disburseCapitationHandler', summary: 'Authorize capitation transfer' },
    { id: 'EDU-API-003', productId: 'prod-national-education', moduleId: 'EDU-MOD-003', code: 'EDU_API_CANDIDATE', method: 'POST', endpoint: '/api/v1/education/uneb/candidates', requiredPermission: 'EDU-PERM-003', handlerName: 'registerCandidateHandler', summary: 'Register UNEB exam candidate' },
    { id: 'EDU-API-004', productId: 'prod-national-education', moduleId: 'EDU-MOD-004', code: 'EDU_API_RESULTS', method: 'GET', endpoint: '/api/v1/education/uneb/results/:index', requiredPermission: 'EDU-PERM-004', handlerName: 'getUnebResultHandler', summary: 'Lookup verified exam result' },
    { id: 'EDU-API-005', productId: 'prod-national-education', moduleId: 'EDU-MOD-005', code: 'EDU_API_INSPECT', method: 'POST', endpoint: '/api/v1/education/standards/inspection', requiredPermission: 'EDU-PERM-005', handlerName: 'submitInspectionHandler', summary: 'Post school inspection dossier' },
    { id: 'EDU-API-006', productId: 'prod-national-education', moduleId: 'EDU-MOD-006', code: 'EDU_API_TMIS', method: 'POST', endpoint: '/api/v1/education/tmis/license', requiredPermission: 'EDU-PERM-006', handlerName: 'verifyTeacherHandler', summary: 'Verify and license teacher' },
    { id: 'EDU-API-007', productId: 'prod-national-education', moduleId: 'EDU-MOD-007', code: 'EDU_API_LOANS', method: 'POST', endpoint: '/api/v1/education/hesfb/apply', requiredPermission: 'EDU-PERM-007', handlerName: 'applyStudentLoanHandler', summary: 'Submit student loan application' },
    { id: 'EDU-API-008', productId: 'prod-national-education', moduleId: 'EDU-MOD-008', code: 'EDU_API_TVET', method: 'POST', endpoint: '/api/v1/education/tvet/certify', requiredPermission: 'EDU-PERM-008', handlerName: 'certifyTvetHandler', summary: 'Issue DIT vocational certificate' }
  ],
  runtimeComponents: [
    { id: 'EDU-RTC-001', productId: 'prod-national-education', moduleId: 'EDU-MOD-001', componentKey: 'NationalEducationEmisEngine', name: 'National EMIS Census & Learner Identification Engine', description: 'Interactive school census and LIN generation workbench.', renderStrategy: 'BESPOKE_INTERACTIVE', category: 'EMIS_ENGINE' },
    { id: 'EDU-RTC-002', productId: 'prod-national-education', moduleId: 'EDU-MOD-002', componentKey: 'NationalEducationCapitationEngine', name: 'Capitation Grants Allocation & Payment Bridge', description: 'Per-pupil funding simulator and Treasury transfer bridge.', renderStrategy: 'BESPOKE_INTERACTIVE', category: 'FINANCIAL_ENGINE' },
    { id: 'EDU-RTC-003', productId: 'prod-national-education', moduleId: 'EDU-MOD-003', componentKey: 'NationalEducationCandidateRegEngine', name: 'National Examination Candidate Registration Engine', description: 'UNEB index allocation and candidate verification desk.', renderStrategy: 'BESPOKE_INTERACTIVE', category: 'ASSESSMENT_ENGINE' },
    { id: 'EDU-RTC-004', productId: 'prod-national-education', moduleId: 'EDU-MOD-004', componentKey: 'NationalEducationUnebResultsEngine', name: 'UNEB Results e-Grading & QR Certification Engine', description: 'Score normalization and certified digital slip issuer.', renderStrategy: 'BESPOKE_INTERACTIVE', category: 'ASSESSMENT_ENGINE' },
    { id: 'EDU-RTC-005', productId: 'prod-national-education', moduleId: 'EDU-MOD-005', componentKey: 'NationalEducationInspectorateEngine', name: 'School Quality Standards & Tablet Inspection Console', description: 'Field inspection tracking and compliance rating engine.', renderStrategy: 'BESPOKE_INTERACTIVE', category: 'QUALITY_ASSURANCE' },
    { id: 'EDU-RTC-006', productId: 'prod-national-education', moduleId: 'EDU-MOD-006', componentKey: 'NationalEducationTmisEngine', name: 'Teacher Professional Registration & TMIS Engine', description: 'Teacher licensing, qualification audits, and discipline ledger.', renderStrategy: 'BESPOKE_INTERACTIVE', category: 'HUMAN_RESOURCES' },
    { id: 'EDU-RTC-007', productId: 'prod-national-education', moduleId: 'EDU-MOD-007', componentKey: 'NationalEducationStudentLoansEngine', name: 'Higher Education Student Financing Board Engine', description: 'Means-tested loan allocations and payroll deduction manager.', renderStrategy: 'BESPOKE_INTERACTIVE', category: 'STUDENT_FINANCE' },
    { id: 'EDU-RTC-008', productId: 'prod-national-education', moduleId: 'EDU-MOD-008', componentKey: 'NationalEducationTvetEngine', name: 'TVET Modular Skills & DIT Certification Engine', description: 'Vocational practical assessment and UVQF qualification issuer.', renderStrategy: 'BESPOKE_INTERACTIVE', category: 'VOCATIONAL_SKILLS' }
  ],
  permissions: [
    { id: 'EDU-PERM-001', productId: 'prod-national-education', code: 'edu:emis:census', name: 'EMIS Census & Learner Registry Access', description: 'Authority to create learner LINs and manage school census' },
    { id: 'EDU-PERM-002', productId: 'prod-national-education', code: 'edu:capitation:grants', name: 'Capitation Grants Allocation Access', description: 'Authority to approve and disburse school capitation funding' },
    { id: 'EDU-PERM-003', productId: 'prod-national-education', code: 'edu:uneb:candidates', name: 'UNEB Candidate Registration Access', description: 'Authority to register examination candidates' },
    { id: 'EDU-PERM-004', productId: 'prod-national-education', code: 'edu:uneb:results', name: 'UNEB Results e-Grading Access', description: 'Authority to process exam marks and sign certificates' },
    { id: 'EDU-PERM-005', productId: 'prod-national-education', code: 'edu:standards:inspect', name: 'School Quality Inspection Access', description: 'Authority to inspect schools and score standard ratings' },
    { id: 'EDU-PERM-006', productId: 'prod-national-education', code: 'edu:tmis:teachers', name: 'TMIS Teacher Licensing Access', description: 'Authority to license teachers and manage professional registry' },
    { id: 'EDU-PERM-007', productId: 'prod-national-education', code: 'edu:hesfb:loans', name: 'Student Loan Financing Access', description: 'Authority to score student loans and track recovery' },
    { id: 'EDU-PERM-008', productId: 'prod-national-education', code: 'edu:tvet:certify', name: 'TVET Vocational Certification Access', description: 'Authority to assess skills and issue DIT certificates' }
  ],
  roles: [
    { id: 'EDU-ROLE-001', productId: 'prod-national-education', code: 'PERMANENT_SECRETARY_EDU', name: 'Permanent Secretary of Education', tier: 'GOVERNANCE', permissionIds: ['EDU-PERM-001', 'EDU-PERM-002', 'EDU-PERM-004', 'EDU-PERM-005', 'EDU-PERM-007'] },
    { id: 'EDU-ROLE-002', productId: 'prod-national-education', code: 'UNEB_EXECUTIVE_DIRECTOR', name: 'Executive Director UNEB', tier: 'EXECUTIVE', permissionIds: ['EDU-PERM-003', 'EDU-PERM-004'] },
    { id: 'EDU-ROLE-003', productId: 'prod-national-education', code: 'DISTRICT_INSPECTOR_SCHOOLS', name: 'District Inspector of Schools', tier: 'OPERATIONAL', permissionIds: ['EDU-PERM-001', 'EDU-PERM-005', 'EDU-PERM-006'] },
    { id: 'EDU-ROLE-004', productId: 'prod-national-education', code: 'HEADTEACHER_ADMIN', name: 'School Headteacher', tier: 'OPERATIONAL', permissionIds: ['EDU-PERM-001', 'EDU-PERM-003'] },
    { id: 'EDU-ROLE-005', productId: 'prod-national-education', code: 'STUDENT_OR_PARENT_USER', name: 'Student / Parent Public User', tier: 'PUBLIC', permissionIds: [] }
  ]
};
