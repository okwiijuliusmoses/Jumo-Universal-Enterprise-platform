import { JumoAuthoritativeProductManifest } from './types';

export const JUMO_SECONDARY_SCHOOL_AUTHORITATIVE_MANIFEST: JumoAuthoritativeProductManifest = {
  productId: 'prod-secondary-school',
  productCode: 'SEC_SCH',
  productName: 'JUMO SECONDARY SCHOOL & HIGH SCHOOL ERP',
  edition: 'SOVEREIGN_ENTERPRISE_COMMERCIAL',
  version: '2026.1.0',
  classification: 'RESTRICTED',

  directorates: [
    { id: 'SEC-DIR-001', code: 'SEC-DIR-ACAD', name: 'Directorate of Secondary Academics, Curriculum & National Examinations', description: 'Subject combinations, KNEC/UNEB national exam registration, grading curves, and termly transcripts.', leadRole: 'PRINCIPAL' },
    { id: 'SEC-DIR-002', code: 'SEC-DIR-BOARDING', name: 'Directorate of Boarding Facilities, Student Affairs & Discipline', description: 'Hostel dormitories, prefect body, discipline tribunal, co-curricular sports, and clubs.', leadRole: 'DEPUTY_PRINCIPAL_ADMIN' },
    { id: 'SEC-DIR-003', code: 'SEC-DIR-BURSARY', name: 'Directorate of School Bursary, Vote-Heads & Financial Control', description: 'Government capitation grants, school fees vote-heads, procurement tenders, and trial balances.', leadRole: 'SENIOR_BURSAR' },
    { id: 'SEC-DIR-004', code: 'SEC-DIR-FACILITIES', name: 'Directorate of Science Laboratories, ICT Infrastructure & Library', description: 'Science lab chemical stocks, computer laboratory workstations, and library cataloging.', leadRole: 'HEAD_OF_SCIENCE_ICT' }
  ],

  departments: Array.from({ length: 12 }, (_, i) => {
    const num = i + 1;
    const pad = String(num).padStart(3, '0');
    return {
      id: `SEC-DEPT-${pad}`,
      directorateId: `SEC-DIR-00${Math.min(4, Math.floor(i / 3) + 1)}`,
      code: `SEC-DEPT-${pad}`,
      name: `Secondary Department ${pad}`,
      description: `Secondary school academic/operational department ${pad}`,
      headRole: `HEAD_SEC_DEPT_${pad}`
    };
  }),

  offices: Array.from({ length: 26 }, (_, i) => {
    const num = i + 1;
    const pad = String(num).padStart(3, '0');
    return {
      id: `SEC-OFF-${pad}`,
      departmentId: `SEC-DEPT-${String(Math.min(12, Math.floor(i / 2) + 1)).padStart(3, '0')}`,
      directorateId: `SEC-DIR-00${Math.min(4, Math.floor(i / 6) + 1)}`,
      code: `SEC-OFF-${pad}`,
      name: `Secondary Office/Desk ${pad}`,
      description: `Secondary school administrative desk ${pad}`,
      officerRole: `SEC_OFFICER_${pad}`
    };
  }),

  portals: [
    { id: 'SEC-PORTAL-001', code: 'SEC-PORTAL-EXEC', name: 'Board of Management & Principal Executive Cockpit', description: 'Principal approvals, Board of Management resolutions, and ministry reporting.', targetRole: 'PRINCIPAL', authLevel: 'PKI_SOVEREIGN', route: '/portal/secondary/exec' },
    { id: 'SEC-PORTAL-002', code: 'SEC-PORTAL-FACULTY', name: 'Subject Teacher & Head of Department Workspace', description: 'Marks entry, class attendance, syllabus tracking, and laboratory requisitions.', targetRole: 'SUBJECT_TEACHER', authLevel: 'STAFF', route: '/portal/secondary/faculty' },
    { id: 'SEC-PORTAL-003', code: 'SEC-PORTAL-BURSARY', name: 'School Bursar & Vote-Head Accounting Portal', description: 'Vote-head allocation, capitation reconciliation, and fee receipts.', targetRole: 'BURSAR', authLevel: 'FINANCIAL_DUAL', route: '/portal/secondary/bursary' },
    { id: 'SEC-PORTAL-004', code: 'SEC-PORTAL-STUDENT', name: 'High School Student Self-Service Portal', description: 'Termly report cards, subject choices, fee status, and library catalog.', targetRole: 'STUDENT', authLevel: 'STAFF', route: '/portal/secondary/student' },
    { id: 'SEC-PORTAL-005', code: 'SEC-PORTAL-PARENT', name: 'Parent & Sponsor Online Portal', description: 'Student academic performance, discipline records, fee balances, and PTA voting.', targetRole: 'PARENT', authLevel: 'STAFF', route: '/portal/secondary/parent' },
    { id: 'SEC-PORTAL-006', code: 'SEC-PORTAL-PUBLIC', name: 'Secondary School Admissions & Public Portal', description: 'Form One intake, school history, and exam results rankings.', targetRole: 'PUBLIC_VISITOR', authLevel: 'PUBLIC', route: '/portal/secondary/public' }
  ],

  modules: Array.from({ length: 36 }, (_, i) => {
    const num = i + 1;
    const pad = String(num).padStart(3, '0');
    return {
      id: `SEC-MOD-${pad}`,
      code: `SEC-MOD-${pad}`,
      title: `Secondary School Module ${pad}`,
      purpose: `Purpose of secondary module ${pad}`,
      directorateId: `SEC-DIR-00${Math.min(4, Math.floor(i / 9) + 1)}`,
      departmentId: `SEC-DEPT-${String(Math.min(12, Math.floor(i / 3) + 1)).padStart(3, '0')}`,
      officeId: `SEC-OFF-${String(Math.min(26, i + 1)).padStart(3, '0')}`,
      portalId: `SEC-PORTAL-00${Math.min(6, (i % 6) + 1)}`,
      capabilityIds: [`SEC-CAP-${String(i * 3 + 1).padStart(3, '0')}`, `SEC-CAP-${String(i * 3 + 2).padStart(3, '0')}`, `SEC-CAP-${String(i * 3 + 3).padStart(3, '0')}`],
      screenIds: [`SEC-SCR-${pad}`],
      formIds: [`SEC-FORM-${pad}`],
      dashboardIds: i < 14 ? [`SEC-DASH-${pad}`] : [],
      reportIds: i < 24 ? [`SEC-REP-${pad}`] : [],
      workflowIds: i < 18 ? [`SEC-WF-${pad}`] : [],
      databaseEntityIds: i < 26 ? [`SEC-DB-${pad}`] : [],
      apiIds: [`SEC-API-${pad}`],
      runtimeComponentIds: [`SEC-RTC-${pad}`],
      permissionIds: [`SEC-PERM-${String(Math.min(56, i + 1)).padStart(3, '0')}`]
    };
  }),

  capabilities: Array.from({ length: 108 }, (_, i) => {
    const num = i + 1;
    const pad = String(num).padStart(3, '0');
    return {
      id: `SEC-CAP-${pad}`,
      moduleId: `SEC-MOD-${String(Math.min(36, Math.floor(i / 3) + 1)).padStart(3, '0')}`,
      code: `SEC_CAP_${pad}`,
      name: `Secondary Capability ${pad}`,
      description: `Secondary operational capability ${pad}`,
      serviceAction: `secondary.action.${pad}`,
      requiredPermission: `SEC-PERM-${String(Math.min(56, Math.floor(i / 2) + 1)).padStart(3, '0')}`
    };
  }),

  screens: Array.from({ length: 42 }, (_, i) => {
    const num = i + 1;
    const pad = String(num).padStart(3, '0');
    return {
      id: `SEC-SCR-${pad}`,
      moduleId: `SEC-MOD-${String(Math.min(36, i + 1)).padStart(3, '0')}`,
      title: `Secondary Screen ${pad}`,
      viewType: i % 4 === 0 ? 'DASHBOARD' : i % 4 === 1 ? 'TABLE' : i % 4 === 2 ? 'FORM' : 'DETAIL',
      route: `/portal/secondary/screen-${pad}`
    };
  }),

  forms: Array.from({ length: 32 }, (_, i) => {
    const num = i + 1;
    const pad = String(num).padStart(3, '0');
    return {
      id: `SEC-FORM-${pad}`,
      moduleId: `SEC-MOD-${String(Math.min(36, i + 1)).padStart(3, '0')}`,
      title: `Secondary Form ${pad}`,
      submitAction: `secondary.submit.${pad}`,
      fieldCount: 7 + (i % 6),
      validationRules: ['REQUIRED_FIELDS', 'STUDENT_INDEX_CHECK']
    };
  }),

  dashboards: Array.from({ length: 14 }, (_, i) => {
    const num = i + 1;
    const pad = String(num).padStart(3, '0');
    return {
      id: `SEC-DASH-${pad}`,
      moduleId: `SEC-MOD-${String(Math.min(36, i * 2 + 1)).padStart(3, '0')}`,
      title: `Secondary Dashboard ${pad}`,
      widgetCount: 4,
      kpiMetrics: ['TOTAL_STUDENTS', 'MEAN_GRADE', 'CAPITATION_RECEIVED', 'BOARDING_OCCUPANCY']
    };
  }),

  reports: Array.from({ length: 24 }, (_, i) => {
    const num = i + 1;
    const pad = String(num).padStart(3, '0');
    return {
      id: `SEC-REP-${pad}`,
      moduleId: `SEC-MOD-${String(Math.min(36, i + 1)).padStart(3, '0')}`,
      title: `Secondary Report ${pad}`,
      format: i % 2 === 0 ? 'SUMMARY' : 'REGULATORY_RETURN',
      exportTypes: ['PDF', 'CSV', 'XLSX']
    };
  }),

  workflows: Array.from({ length: 18 }, (_, i) => {
    const num = i + 1;
    const pad = String(num).padStart(3, '0');
    return {
      id: `SEC-WF-${pad}`,
      moduleId: `SEC-MOD-${String(Math.min(36, i * 2 + 1)).padStart(3, '0')}`,
      title: `Secondary Workflow ${pad}`,
      stages: ['SUBMITTED', 'HOD_REVIEW', 'PRINCIPAL_APPROVAL'],
      slaHours: 24,
      requiredApprovers: ['HOD', 'PRINCIPAL']
    };
  }),

  databaseEntities: Array.from({ length: 26 }, (_, i) => {
    const num = i + 1;
    const pad = String(num).padStart(3, '0');
    return {
      id: `SEC-DB-${pad}`,
      moduleId: `SEC-MOD-${String(Math.min(36, i + 1)).padStart(3, '0')}`,
      tableName: `sec_table_${pad}`,
      primaryKey: 'id',
      fields: [
        { name: 'id', type: 'STRING', required: true, indexed: true },
        { name: 'student_id', type: 'STRING', required: true, indexed: true },
        { name: 'created_at', type: 'TIMESTAMP', required: true }
      ],
      auditLogged: true
    };
  }),

  apis: Array.from({ length: 40 }, (_, i) => {
    const num = i + 1;
    const pad = String(num).padStart(3, '0');
    return {
      id: `SEC-API-${pad}`,
      moduleId: `SEC-MOD-${String(Math.min(36, i + 1)).padStart(3, '0')}`,
      method: i % 2 === 0 ? 'POST' : 'GET',
      endpoint: `/api/v1/secondary/endpoint-${pad}`,
      requiredPermission: `SEC-PERM-${String(Math.min(56, (i % 56) + 1)).padStart(3, '0')}`,
      handlerName: `handleSecondaryApi${pad}`
    };
  }),

  runtimeComponents: Array.from({ length: 38 }, (_, i) => {
    const num = i + 1;
    const pad = String(num).padStart(3, '0');
    return {
      id: `SEC-RTC-${pad}`,
      moduleId: `SEC-MOD-${String(Math.min(36, i + 1)).padStart(3, '0')}`,
      componentName: `SecondaryComponent${pad}`,
      renderStrategy: 'METADATA_UNIVERSAL',
      filePath: `/src/products/secondary/components/SecondaryComponent${pad}.tsx`
    };
  }),

  aiAgents: [
    { id: 'SEC-AI-001', moduleId: 'SEC-MOD-001', name: 'National Exam Prediction & Revision Advisor', role: 'Analyzes student termly marks and recommends targeted revision materials.', capabilities: ['EXAM_ANALYTICS', 'CONTENT_RECOMMENDER'] },
    { id: 'SEC-AI-002', moduleId: 'SEC-MOD-005', name: 'Subject Combination Optimization Agent', role: 'Matches student career goals with O-Level/A-Level subject requirements.', capabilities: ['CAREER_MATCHING'] },
    { id: 'SEC-AI-003', moduleId: 'SEC-MOD-010', name: 'Boarding House Welfare & Health Sentinel', role: 'Monitors sick bay visits, dorm attendance, and disciplinary trends.', capabilities: ['WELFARE_MONITORING'] },
    { id: 'SEC-AI-004', moduleId: 'SEC-MOD-015', name: 'Vote-Head Capitation Audit Agent', role: 'Verifies government ministry capitation allocations against student enrollments.', capabilities: ['FINANCIAL_AUDIT'] }
  ],

  roles: [
    { id: 'SEC-ROLE-001', name: 'PRINCIPAL', tier: 'EXECUTIVE', permissions: ['SEC-PERM-001', 'SEC-PERM-002'] },
    { id: 'SEC-ROLE-002', name: 'DEPUTY_PRINCIPAL', tier: 'EXECUTIVE', permissions: ['SEC-PERM-001', 'SEC-PERM-002'] },
    { id: 'SEC-ROLE-003', name: 'SENIOR_BURSAR', tier: 'OPERATIONAL', permissions: ['SEC-PERM-005', 'SEC-PERM-006'] },
    { id: 'SEC-ROLE-004', name: 'HOD_SCIENCES', tier: 'OPERATIONAL', permissions: ['SEC-PERM-003'] },
    { id: 'SEC-ROLE-005', name: 'HOD_HUMANITIES', tier: 'OPERATIONAL', permissions: ['SEC-PERM-003'] },
    { id: 'SEC-ROLE-006', name: 'HOD_LANGUAGES', tier: 'OPERATIONAL', permissions: ['SEC-PERM-003'] },
    { id: 'SEC-ROLE-007', name: 'SUBJECT_TEACHER', tier: 'OPERATIONAL', permissions: ['SEC-PERM-003', 'SEC-PERM-004'] },
    { id: 'SEC-ROLE-008', name: 'BOARDING_MASTER', tier: 'OPERATIONAL', permissions: ['SEC-PERM-007'] },
    { id: 'SEC-ROLE-009', name: 'LAB_TECHNICIAN', tier: 'OPERATIONAL', permissions: ['SEC-PERM-008'] },
    { id: 'SEC-ROLE-010', name: 'LIBRARIAN', tier: 'OPERATIONAL', permissions: ['SEC-PERM-009'] },
    { id: 'SEC-ROLE-011', name: 'STUDENT', tier: 'CLIENT', permissions: ['SEC-PERM-010'] },
    { id: 'SEC-ROLE-012', name: 'PARENT', tier: 'CLIENT', permissions: ['SEC-PERM-011'] },
    { id: 'SEC-ROLE-013', name: 'BOM_CHAIR', tier: 'GOVERNANCE', permissions: ['SEC-PERM-001'] },
    { id: 'SEC-ROLE-014', name: 'STORE_MANAGER', tier: 'OPERATIONAL', permissions: ['SEC-PERM-012'] }
  ],

  permissions: Array.from({ length: 56 }, (_, i) => {
    const num = i + 1;
    const pad = String(num).padStart(3, '0');
    return {
      id: `SEC-PERM-${pad}`,
      code: `PERM_SEC_${pad}`,
      description: `Permission grant for secondary school operation ${pad}`
    };
  }),

  integrations: [
    { id: 'SEC-INT-001', name: 'National Examination Council (KNEC/UNEB) Data Bridge', serviceType: 'GOV_REGISTRY', status: 'REQUIRED' },
    { id: 'SEC-INT-002', name: 'Ministry of Education NEMIS/EMIS Data Sync', serviceType: 'GOV_REGISTRY', status: 'REQUIRED' },
    { id: 'SEC-INT-003', name: 'School Fees Mobile Money Payment Switch', serviceType: 'PAYMENT_SWITCH', status: 'REQUIRED' },
    { id: 'SEC-INT-004', name: 'Bank EFT & Direct Deposit Automated Feeds', serviceType: 'CORE_BANKING', status: 'REQUIRED' },
    { id: 'SEC-INT-005', name: 'Parent SMS/Email Transcripts Dispatch Switch', serviceType: 'SMS_GATEWAY', status: 'REQUIRED' },
    { id: 'SEC-INT-006', name: 'Science Laboratory Barcode Equipment Tracking API', serviceType: 'CORE_BANKING', status: 'REQUIRED' },
    { id: 'SEC-INT-007', name: 'Library Barcode & RFID Book Circulation Gateway', serviceType: 'CORE_BANKING', status: 'REQUIRED' },
    { id: 'SEC-INT-008', name: 'FAAP Double-Entry Government Vote-Head Accounting', serviceType: 'CORE_BANKING', status: 'REQUIRED' }
  ],

  configurations: Array.from({ length: 16 }, (_, i) => {
    const num = i + 1;
    const pad = String(num).padStart(3, '0');
    return {
      id: `SEC-CFG-${pad}`,
      key: `sec.config.${pad}`,
      description: `Secondary school configuration parameter ${pad}`,
      defaultValue: `DEFAULT_VALUE_${pad}`
    };
  }),

  testContracts: Array.from({ length: 36 }, (_, i) => {
    const num = i + 1;
    const pad = String(num).padStart(3, '0');
    return {
      id: `SEC-TEST-${pad}`,
      targetId: `SEC-MOD-${pad}`,
      testType: i % 2 === 0 ? 'UNIT' : 'INTEGRATION',
      expectedAssertion: `Module SEC-MOD-${pad} satisfies all contract assertions without errors.`
    };
  })
};
