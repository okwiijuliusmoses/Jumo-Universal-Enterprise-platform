import { JumoAuthoritativeProductManifest } from './types';

export const JUMO_NURSERY_PRIMARY_AUTHORITATIVE_MANIFEST: JumoAuthoritativeProductManifest = {
  productId: 'prod-nursery-primary',
  productCode: 'NUR_PRI',
  productName: 'JUMO NURSERY & PRIMARY SCHOOL ERP',
  edition: 'SOVEREIGN_ENTERPRISE_COMMERCIAL',
  version: '2026.1.0',
  classification: 'RESTRICTED',

  directorates: [
    { id: 'NP-DIR-001', code: 'NP-DIR-ACAD', name: 'Directorate of Early Childhood & Primary Academics', description: 'Curriculum, continuous assessment, competency-based grading, and termly report cards.', leadRole: 'HEAD_TEACHER' },
    { id: 'NP-DIR-002', code: 'NP-DIR-STUDENT', name: 'Directorate of Pupil Welfare, Safeguarding & Health', description: 'Immunization, dietary tracking, daily attendance biometric register, and guardian pickup security.', leadRole: 'DEPUTY_HEAD_WELFARE' },
    { id: 'NP-DIR-003', code: 'NP-DIR-FIN', name: 'Directorate of School Bursary, Fees & Financial Accounting', description: 'Fee billing, transport fees, lunch fees, uniform sales, and double-entry school accounting.', leadRole: 'SCHOOL_BURSAR' },
    { id: 'NP-DIR-004', code: 'NP-DIR-OPS', name: 'Directorate of School Operations, Fleet & Inventory', description: 'School bus fleet tracking, kitchen stores inventory, classroom assets, and facility maintenance.', leadRole: 'OPERATIONS_MANAGER' }
  ],

  departments: Array.from({ length: 10 }, (_, i) => {
    const num = i + 1;
    const pad = String(num).padStart(3, '0');
    return {
      id: `NP-DEPT-${pad}`,
      directorateId: `NP-DIR-00${Math.floor(i / 3) + 1}`,
      code: `NP-DEPT-${pad}`,
      name: `Nursery & Primary Department ${pad}`,
      description: `Operational department ${pad} for nursery/primary operations`,
      headRole: `HEAD_DEPT_${pad}`
    };
  }),

  offices: Array.from({ length: 20 }, (_, i) => {
    const num = i + 1;
    const pad = String(num).padStart(3, '0');
    return {
      id: `NP-OFF-${pad}`,
      departmentId: `NP-DEPT-${String(Math.min(10, Math.floor(i / 2) + 1)).padStart(3, '0')}`,
      directorateId: `NP-DIR-00${Math.min(4, Math.floor(i / 5) + 1)}`,
      code: `NP-OFF-${pad}`,
      name: `Nursery & Primary Desk ${pad}`,
      description: `Operational desk ${pad} for pupil & institutional administration`,
      officerRole: `OFFICER_ROLE_${pad}`
    };
  }),

  portals: [
    { id: 'NP-PORTAL-001', code: 'NP-PORTAL-ADMIN', name: 'School Executive & Head Teacher Portal', description: 'Executive cockpit, term dates, approvals, and board reports.', targetRole: 'HEAD_TEACHER', authLevel: 'PKI_SOVEREIGN', route: '/portal/nursery-primary/admin' },
    { id: 'NP-PORTAL-002', code: 'NP-PORTAL-TEACHER', name: 'Teacher & Class Master Workspace Portal', description: 'Attendance, gradebook, report card remarks, and lesson plans.', targetRole: 'CLASS_TEACHER', authLevel: 'STAFF', route: '/portal/nursery-primary/teacher' },
    { id: 'NP-PORTAL-003', code: 'NP-PORTAL-BURSAR', name: 'School Bursar & Fee Billing Portal', description: 'Fee invoices, bank slip reconciliation, and ledger postings.', targetRole: 'BURSAR', authLevel: 'FINANCIAL_DUAL', route: '/portal/nursery-primary/bursar' },
    { id: 'NP-PORTAL-004', code: 'NP-PORTAL-PARENT', name: 'Parent & Guardian Mobile Portal', description: 'Child report cards, attendance alerts, fee balance, and pickup authorizations.', targetRole: 'PARENT_GUARDIAN', authLevel: 'STAFF', route: '/portal/nursery-primary/parent' },
    { id: 'NP-PORTAL-005', code: 'NP-PORTAL-PUBLIC', name: 'School Public Intake & Admissions Portal', description: 'Online registration, prospectus, and fee structure calculator.', targetRole: 'PUBLIC_VISITOR', authLevel: 'PUBLIC', route: '/portal/nursery-primary/public' }
  ],

  modules: Array.from({ length: 28 }, (_, i) => {
    const num = i + 1;
    const pad = String(num).padStart(3, '0');
    return {
      id: `NP-MOD-${pad}`,
      code: `NP-MOD-${pad}`,
      title: `Nursery & Primary Module ${pad}`,
      purpose: `Purpose of nursery/primary module ${pad}`,
      directorateId: `NP-DIR-00${Math.min(4, Math.floor(i / 7) + 1)}`,
      departmentId: `NP-DEPT-${String(Math.min(10, Math.floor(i / 3) + 1)).padStart(3, '0')}`,
      officeId: `NP-OFF-${String(Math.min(20, i + 1)).padStart(3, '0')}`,
      portalId: `NP-PORTAL-00${Math.min(5, (i % 5) + 1)}`,
      capabilityIds: [`NP-CAP-${String(i * 3 + 1).padStart(3, '0')}`, `NP-CAP-${String(i * 3 + 2).padStart(3, '0')}`, `NP-CAP-${String(i * 3 + 3).padStart(3, '0')}`],
      screenIds: [`NP-SCR-${pad}`],
      formIds: [`NP-FORM-${pad}`],
      dashboardIds: i < 10 ? [`NP-DASH-${pad}`] : [],
      reportIds: i < 18 ? [`NP-REP-${pad}`] : [],
      workflowIds: i < 14 ? [`NP-WF-${pad}`] : [],
      databaseEntityIds: i < 20 ? [`NP-DB-${pad}`] : [],
      apiIds: [`NP-API-${pad}`],
      runtimeComponentIds: [`NP-RTC-${pad}`],
      permissionIds: [`NP-PERM-${String(Math.min(40, i + 1)).padStart(3, '0')}`]
    };
  }),

  capabilities: Array.from({ length: 84 }, (_, i) => {
    const num = i + 1;
    const pad = String(num).padStart(3, '0');
    return {
      id: `NP-CAP-${pad}`,
      moduleId: `NP-MOD-${String(Math.min(28, Math.floor(i / 3) + 1)).padStart(3, '0')}`,
      code: `NP_CAP_${pad}`,
      name: `Primary Capability ${pad}`,
      description: `Primary School operational capability ${pad}`,
      serviceAction: `nursery.action.${pad}`,
      requiredPermission: `NP-PERM-${String(Math.min(40, Math.floor(i / 2) + 1)).padStart(3, '0')}`
    };
  }),

  screens: Array.from({ length: 32 }, (_, i) => {
    const num = i + 1;
    const pad = String(num).padStart(3, '0');
    return {
      id: `NP-SCR-${pad}`,
      moduleId: `NP-MOD-${String(Math.min(28, i + 1)).padStart(3, '0')}`,
      title: `Nursery Primary Screen ${pad}`,
      viewType: i % 4 === 0 ? 'DASHBOARD' : i % 4 === 1 ? 'TABLE' : i % 4 === 2 ? 'FORM' : 'DETAIL',
      route: `/portal/nursery-primary/screen-${pad}`
    };
  }),

  forms: Array.from({ length: 24 }, (_, i) => {
    const num = i + 1;
    const pad = String(num).padStart(3, '0');
    return {
      id: `NP-FORM-${pad}`,
      moduleId: `NP-MOD-${String(Math.min(28, i + 1)).padStart(3, '0')}`,
      title: `Nursery Primary Form ${pad}`,
      submitAction: `nursery.submit.${pad}`,
      fieldCount: 6 + (i % 6),
      validationRules: ['REQUIRED_FIELDS', 'PUPIL_ID_CHECK']
    };
  }),

  dashboards: Array.from({ length: 10 }, (_, i) => {
    const num = i + 1;
    const pad = String(num).padStart(3, '0');
    return {
      id: `NP-DASH-${pad}`,
      moduleId: `NP-MOD-${String(Math.min(28, i * 2 + 1)).padStart(3, '0')}`,
      title: `Nursery Primary Dashboard ${pad}`,
      widgetCount: 4,
      kpiMetrics: ['TOTAL_PUPILS', 'FEE_COLLECTION_RATE', 'DAILY_ATTENDANCE', 'BUS_FLEET_STATUS']
    };
  }),

  reports: Array.from({ length: 18 }, (_, i) => {
    const num = i + 1;
    const pad = String(num).padStart(3, '0');
    return {
      id: `NP-REP-${pad}`,
      moduleId: `NP-MOD-${String(Math.min(28, i + 1)).padStart(3, '0')}`,
      title: `Nursery Primary Report ${pad}`,
      format: i % 2 === 0 ? 'SUMMARY' : 'REGULATORY_RETURN',
      exportTypes: ['PDF', 'CSV', 'XLSX']
    };
  }),

  workflows: Array.from({ length: 14 }, (_, i) => {
    const num = i + 1;
    const pad = String(num).padStart(3, '0');
    return {
      id: `NP-WF-${pad}`,
      moduleId: `NP-MOD-${String(Math.min(28, i * 2 + 1)).padStart(3, '0')}`,
      title: `Pupil Approval Workflow ${pad}`,
      stages: ['SUBMITTED', 'HEAD_REVIEW', 'APPROVED'],
      slaHours: 24,
      requiredApprovers: ['HEAD_TEACHER']
    };
  }),

  databaseEntities: Array.from({ length: 20 }, (_, i) => {
    const num = i + 1;
    const pad = String(num).padStart(3, '0');
    return {
      id: `NP-DB-${pad}`,
      moduleId: `NP-MOD-${String(Math.min(28, i + 1)).padStart(3, '0')}`,
      tableName: `np_table_${pad}`,
      primaryKey: 'id',
      fields: [
        { name: 'id', type: 'STRING', required: true, indexed: true },
        { name: 'pupil_id', type: 'STRING', required: true, indexed: true },
        { name: 'created_at', type: 'TIMESTAMP', required: true }
      ],
      auditLogged: true
    };
  }),

  apis: Array.from({ length: 30 }, (_, i) => {
    const num = i + 1;
    const pad = String(num).padStart(3, '0');
    return {
      id: `NP-API-${pad}`,
      moduleId: `NP-MOD-${String(Math.min(28, i + 1)).padStart(3, '0')}`,
      method: i % 2 === 0 ? 'POST' : 'GET',
      endpoint: `/api/v1/nursery-primary/endpoint-${pad}`,
      requiredPermission: `NP-PERM-${String(Math.min(40, (i % 40) + 1)).padStart(3, '0')}`,
      handlerName: `handleNurseryPrimaryApi${pad}`
    };
  }),

  runtimeComponents: Array.from({ length: 30 }, (_, i) => {
    const num = i + 1;
    const pad = String(num).padStart(3, '0');
    return {
      id: `NP-RTC-${pad}`,
      moduleId: `NP-MOD-${String(Math.min(28, i + 1)).padStart(3, '0')}`,
      componentName: `NurseryPrimaryComponent${pad}`,
      renderStrategy: 'METADATA_UNIVERSAL',
      filePath: `/src/products/nursery_primary/components/NurseryPrimaryComponent${pad}.tsx`
    };
  }),

  aiAgents: [
    { id: 'NP-AI-001', moduleId: 'NP-MOD-001', name: 'Early Literacy & Numeracy Progress Agent', role: 'Analyzes pupil phonics progress and flags learning milestones.', capabilities: ['LEARNING_ANALYTICS'] },
    { id: 'NP-AI-002', moduleId: 'NP-MOD-005', name: 'Child Safeguarding & Health Agent', role: 'Monitors dietary allergies, medication schedules, and immunization dates.', capabilities: ['HEALTH_MONITOR'] },
    { id: 'NP-AI-003', moduleId: 'NP-MOD-010', name: 'Automated Fee Balance & SMS Chaser Agent', role: 'Generates gentle payment reminder notices for parents.', capabilities: ['AUTOMATED_MESSAGING'] }
  ],

  roles: [
    { id: 'NP-ROLE-001', name: 'HEAD_TEACHER', tier: 'EXECUTIVE', permissions: ['NP-PERM-001', 'NP-PERM-002'] },
    { id: 'NP-ROLE-002', name: 'DEPUTY_HEAD', tier: 'EXECUTIVE', permissions: ['NP-PERM-001', 'NP-PERM-002'] },
    { id: 'NP-ROLE-003', name: 'CLASS_TEACHER', tier: 'OPERATIONAL', permissions: ['NP-PERM-003', 'NP-PERM-004'] },
    { id: 'NP-ROLE-004', name: 'BURSAR', tier: 'OPERATIONAL', permissions: ['NP-PERM-005', 'NP-PERM-006'] },
    { id: 'NP-ROLE-005', name: 'SCHOOL_NURSE', tier: 'OPERATIONAL', permissions: ['NP-PERM-007'] },
    { id: 'NP-ROLE-006', name: 'TRANSPORT_COORDINATOR', tier: 'OPERATIONAL', permissions: ['NP-PERM-008'] },
    { id: 'NP-ROLE-007', name: 'PARENT_GUARDIAN', tier: 'CLIENT', permissions: ['NP-PERM-009'] },
    { id: 'NP-ROLE-008', name: 'STORE_KEEPER', tier: 'OPERATIONAL', permissions: ['NP-PERM-010'] },
    { id: 'NP-ROLE-009', name: 'BOARD_MEMBER', tier: 'GOVERNANCE', permissions: ['NP-PERM-001'] },
    { id: 'NP-ROLE-010', name: 'SECURITY_GATE_OFFICER', tier: 'OPERATIONAL', permissions: ['NP-PERM-011'] }
  ],

  permissions: Array.from({ length: 40 }, (_, i) => {
    const num = i + 1;
    const pad = String(num).padStart(3, '0');
    return {
      id: `NP-PERM-${pad}`,
      code: `PERM_NP_${pad}`,
      description: `Permission grant for nursery/primary operation ${pad}`
    };
  }),

  integrations: [
    { id: 'NP-INT-001', name: 'Mobile Fee Payment Gateway (M-Pesa/Airtel)', serviceType: 'PAYMENT_SWITCH', status: 'REQUIRED' },
    { id: 'NP-INT-002', name: 'School Bus GPS & Telematics Ingestion', serviceType: 'CORE_BANKING', status: 'REQUIRED' },
    { id: 'NP-INT-003', name: 'Parent SMS/WhatsApp Notification Gateway', serviceType: 'SMS_GATEWAY', status: 'REQUIRED' },
    { id: 'NP-INT-004', name: 'Biometric Gate Attendance Scanner API', serviceType: 'GOV_REGISTRY', status: 'REQUIRED' },
    { id: 'NP-INT-005', name: 'FAAP Double-Entry Accounting Bridge', serviceType: 'CORE_BANKING', status: 'REQUIRED' },
    { id: 'NP-INT-006', name: 'Ministry of Education NEMIS Registration Bridge', serviceType: 'GOV_REGISTRY', status: 'REQUIRED' }
  ],

  configurations: Array.from({ length: 12 }, (_, i) => {
    const num = i + 1;
    const pad = String(num).padStart(3, '0');
    return {
      id: `NP-CFG-${pad}`,
      key: `np.config.${pad}`,
      description: `Nursery & Primary system configuration parameter ${pad}`,
      defaultValue: `DEFAULT_VALUE_${pad}`
    };
  }),

  testContracts: Array.from({ length: 28 }, (_, i) => {
    const num = i + 1;
    const pad = String(num).padStart(3, '0');
    return {
      id: `NP-TEST-${pad}`,
      targetId: `NP-MOD-${pad}`,
      testType: i % 2 === 0 ? 'UNIT' : 'INTEGRATION',
      expectedAssertion: `Module NP-MOD-${pad} satisfies all contract assertions without errors.`
    };
  })
};
