import { JumoAuthoritativeProductManifest } from './types';

export const JUMO_UNIVERSITY_TERTIARY_AUTHORITATIVE_MANIFEST: JumoAuthoritativeProductManifest = {
  productId: 'prod-university-tertiary',
  productCode: 'UNI_TERT',
  productName: 'JUMO UNIVERSITY & HIGHER EDUCATION ERP',
  edition: 'SOVEREIGN_ENTERPRISE_COMMERCIAL',
  version: '2026.1.0',
  classification: 'RESTRICTED',

  directorates: [
    { id: 'UNI-DIR-001', code: 'UNI-DIR-ACAD', name: 'Directorate of Academic Affairs, Faculties & Senate Governance', description: 'Degree programs, course units, credit transfer, grading senate boards, and graduation clearance.', leadRole: 'DEPUTY_VICE_CHANCELLOR_ACAD' },
    { id: 'UNI-DIR-002', code: 'UNI-DIR-RESEARCH', name: 'Directorate of Research, Innovation & Postgraduate Studies', description: 'Grant applications, peer-reviewed journals, thesis defense committees, and intellectual property.', leadRole: 'DIRECTOR_OF_RESEARCH' },
    { id: 'UNI-DIR-003', code: 'UNI-DIR-FIN', name: 'Directorate of University Bursary, Endowments & Treasury', description: 'Tuition fees billing, research grant accounting, endowment investments, and departmental vote-heads.', leadRole: 'UNIVERSITY_BURSAR' },
    { id: 'UNI-DIR-004', code: 'UNI-DIR-STUDENT', name: 'Directorate of Dean of Students, Hostels & Campus Security', description: 'Campus accommodation, student guild government, bursary allocations, and health center.', leadRole: 'DEAN_OF_STUDENTS' },
    { id: 'UNI-DIR-005', code: 'UNI-DIR-ADVANCE', name: 'Directorate of University Advancement, Alumni & Global Relations', description: 'Capital campaigns, alumni chapters, international student exchange, and corporate partnerships.', leadRole: 'DIRECTOR_OF_ADVANCEMENT' }
  ],

  departments: Array.from({ length: 16 }, (_, i) => {
    const num = i + 1;
    const pad = String(num).padStart(3, '0');
    return {
      id: `UNI-DEPT-${pad}`,
      directorateId: `UNI-DIR-00${Math.min(5, Math.floor(i / 3) + 1)}`,
      code: `UNI-DEPT-${pad}`,
      name: `University Department ${pad}`,
      description: `University operational or faculty department ${pad}`,
      headRole: `HEAD_UNI_DEPT_${pad}`
    };
  }),

  offices: Array.from({ length: 34 }, (_, i) => {
    const num = i + 1;
    const pad = String(num).padStart(3, '0');
    return {
      id: `UNI-OFF-${pad}`,
      departmentId: `UNI-DEPT-${String(Math.min(16, Math.floor(i / 2) + 1)).padStart(3, '0')}`,
      directorateId: `UNI-DIR-00${Math.min(5, Math.floor(i / 7) + 1)}`,
      code: `UNI-OFF-${pad}`,
      name: `University Office/Desk ${pad}`,
      description: `Higher education administrative desk ${pad}`,
      officerRole: `UNI_OFFICER_${pad}`
    };
  }),

  portals: [
    { id: 'UNI-PORTAL-001', code: 'UNI-PORTAL-SENATE', name: 'University Senate & Vice-Chancellor Executive Cockpit', description: 'Senate resolutions, degree conferment approvals, and financial governance.', targetRole: 'VICE_CHANCELLOR', authLevel: 'PKI_SOVEREIGN', route: '/portal/university/senate' },
    { id: 'UNI-PORTAL-002', code: 'UNI-PORTAL-FACULTY', name: 'Faculty Dean, Chair & Lecturer Academic Portal', description: 'Course grading, semester marks approval, student supervision, and research grants.', targetRole: 'FACULTY_LECTURER', authLevel: 'STAFF', route: '/portal/university/faculty' },
    { id: 'UNI-PORTAL-003', code: 'UNI-PORTAL-BURSARY', name: 'University Bursary & Student Finance Portal', description: 'Tuition ledgers, sponsor invoices, fee clearance certificates, and grant disbursements.', targetRole: 'BURSAR', authLevel: 'FINANCIAL_DUAL', route: '/portal/university/bursary' },
    { id: 'UNI-PORTAL-004', code: 'UNI-PORTAL-STUDENT', name: 'Undergraduate & Postgraduate Student Portal', description: 'Course registration, timetable, e-learning access, fees statement, and graduation audit.', targetRole: 'STUDENT', authLevel: 'STAFF', route: '/portal/university/student' },
    { id: 'UNI-PORTAL-005', code: 'UNI-PORTAL-ALUMNI', name: 'University Alumni Advancement & Giving Portal', description: 'Alumni networking, donations, job board, and transcript requests.', targetRole: 'ALUMNI', authLevel: 'STAFF', route: '/portal/university/alumni' },
    { id: 'UNI-PORTAL-006', code: 'UNI-PORTAL-PUBLIC', name: 'Public Admissions & University Prospectus Portal', description: 'Degree admissions, international student intake, and public research archive.', targetRole: 'PUBLIC_VISITOR', authLevel: 'PUBLIC', route: '/portal/university/public' }
  ],

  modules: Array.from({ length: 44 }, (_, i) => {
    const num = i + 1;
    const pad = String(num).padStart(3, '0');
    return {
      id: `UNI-MOD-${pad}`,
      code: `UNI-MOD-${pad}`,
      title: `University Module ${pad}`,
      purpose: `Purpose of university module ${pad}`,
      directorateId: `UNI-DIR-00${Math.min(5, Math.floor(i / 9) + 1)}`,
      departmentId: `UNI-DEPT-${String(Math.min(16, Math.floor(i / 3) + 1)).padStart(3, '0')}`,
      officeId: `UNI-OFF-${String(Math.min(34, i + 1)).padStart(3, '0')}`,
      portalId: `UNI-PORTAL-00${Math.min(6, (i % 6) + 1)}`,
      capabilityIds: [`UNI-CAP-${String(i * 3 + 1).padStart(3, '0')}`, `UNI-CAP-${String(i * 3 + 2).padStart(3, '0')}`, `UNI-CAP-${String(i * 3 + 3).padStart(3, '0')}`],
      screenIds: [`UNI-SCR-${pad}`],
      formIds: [`UNI-FORM-${pad}`],
      dashboardIds: i < 18 ? [`UNI-DASH-${pad}`] : [],
      reportIds: i < 30 ? [`UNI-REP-${pad}`] : [],
      workflowIds: i < 22 ? [`UNI-WF-${pad}`] : [],
      databaseEntityIds: i < 32 ? [`UNI-DB-${pad}`] : [],
      apiIds: [`UNI-API-${pad}`],
      runtimeComponentIds: [`UNI-RTC-${pad}`],
      permissionIds: [`UNI-PERM-${String(Math.min(72, i + 1)).padStart(3, '0')}`]
    };
  }),

  capabilities: Array.from({ length: 132 }, (_, i) => {
    const num = i + 1;
    const pad = String(num).padStart(3, '0');
    return {
      id: `UNI-CAP-${pad}`,
      moduleId: `UNI-MOD-${String(Math.min(44, Math.floor(i / 3) + 1)).padStart(3, '0')}`,
      code: `UNI_CAP_${pad}`,
      name: `University Capability ${pad}`,
      description: `University operational capability ${pad}`,
      serviceAction: `university.action.${pad}`,
      requiredPermission: `UNI-PERM-${String(Math.min(72, Math.floor(i / 2) + 1)).padStart(3, '0')}`
    };
  }),

  screens: Array.from({ length: 52 }, (_, i) => {
    const num = i + 1;
    const pad = String(num).padStart(3, '0');
    return {
      id: `UNI-SCR-${pad}`,
      moduleId: `UNI-MOD-${String(Math.min(44, i + 1)).padStart(3, '0')}`,
      title: `University Screen ${pad}`,
      viewType: i % 4 === 0 ? 'DASHBOARD' : i % 4 === 1 ? 'TABLE' : i % 4 === 2 ? 'FORM' : 'DETAIL',
      route: `/portal/university/screen-${pad}`
    };
  }),

  forms: Array.from({ length: 40 }, (_, i) => {
    const num = i + 1;
    const pad = String(num).padStart(3, '0');
    return {
      id: `UNI-FORM-${pad}`,
      moduleId: `UNI-MOD-${String(Math.min(44, i + 1)).padStart(3, '0')}`,
      title: `University Form ${pad}`,
      submitAction: `university.submit.${pad}`,
      fieldCount: 8 + (i % 6),
      validationRules: ['REQUIRED_FIELDS', 'STUDENT_REG_CHECK']
    };
  }),

  dashboards: Array.from({ length: 18 }, (_, i) => {
    const num = i + 1;
    const pad = String(num).padStart(3, '0');
    return {
      id: `UNI-DASH-${pad}`,
      moduleId: `UNI-MOD-${String(Math.min(44, i * 2 + 1)).padStart(3, '0')}`,
      title: `University Dashboard ${pad}`,
      widgetCount: 4,
      kpiMetrics: ['TOTAL_ENROLLMENT', 'RESEARCH_GRANTS_VALUE', 'TUITION_COLLECTED', 'HOSTEL_OCCUPANCY']
    };
  }),

  reports: Array.from({ length: 30 }, (_, i) => {
    const num = i + 1;
    const pad = String(num).padStart(3, '0');
    return {
      id: `UNI-REP-${pad}`,
      moduleId: `UNI-MOD-${String(Math.min(44, i + 1)).padStart(3, '0')}`,
      title: `University Report ${pad}`,
      format: i % 2 === 0 ? 'SUMMARY' : 'REGULATORY_RETURN',
      exportTypes: ['PDF', 'CSV', 'XLSX']
    };
  }),

  workflows: Array.from({ length: 22 }, (_, i) => {
    const num = i + 1;
    const pad = String(num).padStart(3, '0');
    return {
      id: `UNI-WF-${pad}`,
      moduleId: `UNI-MOD-${String(Math.min(44, i * 2 + 1)).padStart(3, '0')}`,
      title: `University Senate Workflow ${pad}`,
      stages: ['SUBMITTED', 'DEPARTMENT_BOARD', 'FACULTY_BOARD', 'SENATE_CONFIRMATION'],
      slaHours: 48,
      requiredApprovers: ['HOD', 'DEAN', 'DVC_ACADEMIC']
    };
  }),

  databaseEntities: Array.from({ length: 32 }, (_, i) => {
    const num = i + 1;
    const pad = String(num).padStart(3, '0');
    return {
      id: `UNI-DB-${pad}`,
      moduleId: `UNI-MOD-${String(Math.min(44, i + 1)).padStart(3, '0')}`,
      tableName: `uni_table_${pad}`,
      primaryKey: 'id',
      fields: [
        { name: 'id', type: 'STRING', required: true, indexed: true },
        { name: 'registration_number', type: 'STRING', required: true, indexed: true },
        { name: 'created_at', type: 'TIMESTAMP', required: true }
      ],
      auditLogged: true
    };
  }),

  apis: Array.from({ length: 48 }, (_, i) => {
    const num = i + 1;
    const pad = String(num).padStart(3, '0');
    return {
      id: `UNI-API-${pad}`,
      moduleId: `UNI-MOD-${String(Math.min(44, i + 1)).padStart(3, '0')}`,
      method: i % 2 === 0 ? 'POST' : 'GET',
      endpoint: `/api/v1/university/endpoint-${pad}`,
      requiredPermission: `UNI-PERM-${String(Math.min(72, (i % 72) + 1)).padStart(3, '0')}`,
      handlerName: `handleUniversityApi${pad}`
    };
  }),

  runtimeComponents: Array.from({ length: 46 }, (_, i) => {
    const num = i + 1;
    const pad = String(num).padStart(3, '0');
    return {
      id: `UNI-RTC-${pad}`,
      moduleId: `UNI-MOD-${String(Math.min(44, i + 1)).padStart(3, '0')}`,
      componentName: `UniversityComponent${pad}`,
      renderStrategy: 'METADATA_UNIVERSAL',
      filePath: `/src/products/university/components/UniversityComponent${pad}.tsx`
    };
  }),

  aiAgents: [
    { id: 'UNI-AI-001', moduleId: 'UNI-MOD-001', name: 'Curriculum Audit & Degree Clearance Agent', role: 'Performs graduation credit audits against university senate requirements.', capabilities: ['DEGREE_AUDIT', 'TRANSCRIPT_PARSING'] },
    { id: 'UNI-AI-002', moduleId: 'UNI-MOD-005', name: 'Research Grant Discovery & Grant Proposal Assistant', role: 'Matches faculty research profiles with global grant RFPs.', capabilities: ['RFP_MATCHING', 'PROPOSAL_SYNTHESIS'] },
    { id: 'UNI-AI-003', moduleId: 'UNI-MOD-010', name: 'Timetable & Room Scheduling Neural Optimizer', role: 'Solves complex multi-faculty course clash constraints.', capabilities: ['CONSTRAINT_OPTIMIZATION'] },
    { id: 'UNI-AI-004', moduleId: 'UNI-MOD-015', name: 'Endowment Investment Yield Forecaster', role: 'Simulates university endowment portfolio returns and risk exposure.', capabilities: ['PORTFOLIO_SIMULATION'] },
    { id: 'UNI-AI-005', moduleId: 'UNI-MOD-020', name: 'Campus Health & Mental Wellness Companion', role: 'Confidential student triage for health center appointments.', capabilities: ['WELLNESS_TRIAGE'] },
    { id: 'UNI-AI-006', moduleId: 'UNI-MOD-025', name: 'Alumni Giving & Major Donor Matching Agent', role: 'Identifies prospective major donors for capital campaigns.', capabilities: ['DONOR_SCORING'] }
  ],

  roles: [
    { id: 'UNI-ROLE-001', name: 'VICE_CHANCELLOR', tier: 'EXECUTIVE', permissions: ['UNI-PERM-001', 'UNI-PERM-002'] },
    { id: 'UNI-ROLE-002', name: 'DVC_ACADEMIC', tier: 'EXECUTIVE', permissions: ['UNI-PERM-001', 'UNI-PERM-002'] },
    { id: 'UNI-ROLE-003', name: 'UNIVERSITY_BURSAR', tier: 'EXECUTIVE', permissions: ['UNI-PERM-005', 'UNI-PERM-006'] },
    { id: 'UNI-ROLE-004', name: 'ACADEMIC_REGISTRAR', tier: 'EXECUTIVE', permissions: ['UNI-PERM-001', 'UNI-PERM-003'] },
    { id: 'UNI-ROLE-005', name: 'FACULTY_DEAN', tier: 'OPERATIONAL', permissions: ['UNI-PERM-003', 'UNI-PERM-004'] },
    { id: 'UNI-ROLE-006', name: 'HOD', tier: 'OPERATIONAL', permissions: ['UNI-PERM-003', 'UNI-PERM-004'] },
    { id: 'UNI-ROLE-007', name: 'PROFESSOR_LECTURER', tier: 'OPERATIONAL', permissions: ['UNI-PERM-004'] },
    { id: 'UNI-ROLE-008', name: 'RESEARCH_DIRECTOR', tier: 'OPERATIONAL', permissions: ['UNI-PERM-007'] },
    { id: 'UNI-ROLE-009', name: 'DEAN_OF_STUDENTS', tier: 'OPERATIONAL', permissions: ['UNI-PERM-008'] },
    { id: 'UNI-ROLE-010', name: 'CHIEF_LIBRARIAN', tier: 'OPERATIONAL', permissions: ['UNI-PERM-009'] },
    { id: 'UNI-ROLE-011', name: 'ESTATES_MANAGER', tier: 'OPERATIONAL', permissions: ['UNI-PERM-010'] },
    { id: 'UNI-ROLE-012', name: 'STUDENT', tier: 'CLIENT', permissions: ['UNI-PERM-011'] },
    { id: 'UNI-ROLE-013', name: 'POSTGRAD_RESEARCHER', tier: 'CLIENT', permissions: ['UNI-PERM-012'] },
    { id: 'UNI-ROLE-014', name: 'ALUMNI_MEMBER', tier: 'CLIENT', permissions: ['UNI-PERM-013'] },
    { id: 'UNI-ROLE-015', name: 'COUNCIL_MEMBER', tier: 'GOVERNANCE', permissions: ['UNI-PERM-001'] },
    { id: 'UNI-ROLE-016', name: 'SENATE_MEMBER', tier: 'GOVERNANCE', permissions: ['UNI-PERM-001'] },
    { id: 'UNI-ROLE-017', name: 'CHIEF_INTERNAL_AUDITOR', tier: 'GOVERNANCE', permissions: ['UNI-PERM-014'] },
    { id: 'UNI-ROLE-018', name: 'ADVANCEMENT_OFFICER', tier: 'OPERATIONAL', permissions: ['UNI-PERM-015'] }
  ],

  permissions: Array.from({ length: 72 }, (_, i) => {
    const num = i + 1;
    const pad = String(num).padStart(3, '0');
    return {
      id: `UNI-PERM-${pad}`,
      code: `PERM_UNI_${pad}`,
      description: `Permission grant for university operation ${pad}`
    };
  }),

  integrations: [
    { id: 'UNI-INT-001', name: 'University Bank Direct Integration Switch', serviceType: 'CORE_BANKING', status: 'REQUIRED' },
    { id: 'UNI-INT-002', name: 'Mobile Tuition Fee Clearing Gateway', serviceType: 'PAYMENT_SWITCH', status: 'REQUIRED' },
    { id: 'UNI-INT-003', name: 'National Higher Education Regulatory Commission Bridge', serviceType: 'GOV_REGISTRY', status: 'REQUIRED' },
    { id: 'UNI-INT-004', name: 'Government Student Loan Board (HELB/HESLB) Bridge', serviceType: 'GOV_REGISTRY', status: 'REQUIRED' },
    { id: 'UNI-INT-005', name: 'IEEE / Elsevier / Scopus Research Journal Ingestion API', serviceType: 'GOV_REGISTRY', status: 'REQUIRED' },
    { id: 'UNI-INT-006', name: 'Plagiarism & Originality Verification Gateway (Turnitin API)', serviceType: 'GOV_REGISTRY', status: 'REQUIRED' },
    { id: 'UNI-INT-007', name: 'AEGIS Zero-Trust Identity & Single Sign-On (SSO)', serviceType: 'HSM_VAULT', status: 'REQUIRED' },
    { id: 'UNI-INT-008', name: 'Campus Smart Card & RFID Hostel Access Controller', serviceType: 'CORE_BANKING', status: 'REQUIRED' },
    { id: 'UNI-INT-009', name: 'SMS & Email Multi-Channel Broadcast Switch', serviceType: 'SMS_GATEWAY', status: 'REQUIRED' },
    { id: 'UNI-INT-010', name: 'FAAP Multi-Fund University Endowment Accounting', serviceType: 'CORE_BANKING', status: 'REQUIRED' }
  ],

  configurations: Array.from({ length: 20 }, (_, i) => {
    const num = i + 1;
    const pad = String(num).padStart(3, '0');
    return {
      id: `UNI-CFG-${pad}`,
      key: `uni.config.${pad}`,
      description: `University configuration parameter ${pad}`,
      defaultValue: `DEFAULT_VALUE_${pad}`
    };
  }),

  testContracts: Array.from({ length: 44 }, (_, i) => {
    const num = i + 1;
    const pad = String(num).padStart(3, '0');
    return {
      id: `UNI-TEST-${pad}`,
      targetId: `UNI-MOD-${pad}`,
      testType: i % 2 === 0 ? 'UNIT' : 'INTEGRATION',
      expectedAssertion: `Module UNI-MOD-${pad} satisfies all contract assertions without errors.`
    };
  })
};
