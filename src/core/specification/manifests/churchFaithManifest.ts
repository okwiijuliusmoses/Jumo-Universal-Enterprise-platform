import { JumoAuthoritativeProductManifest } from './types';

export const JUMO_CHURCH_FAITH_AUTHORITATIVE_MANIFEST: JumoAuthoritativeProductManifest = {
  productId: 'prod-church-faith',
  productCode: 'CHU_FTH',
  productName: 'JUMO CHURCH & FAITH-BASED INSTITUTIONS ERP',
  edition: 'SOVEREIGN_ENTERPRISE_COMMERCIAL',
  version: '2026.1.0',
  classification: 'RESTRICTED',

  directorates: [
    { id: 'CHU-DIR-001', code: 'CHU-DIR-PASTORAL', name: 'Directorate of Pastoral Care, Sacraments & Clergy Ministry', description: 'Congregation census, pastoral visitation, baptisms, weddings, funerals, and clergy deployment.', leadRole: 'SENIOR_PASTOR_BISHOP' },
    { id: 'CHU-DIR-002', code: 'CHU-DIR-FIN', name: 'Directorate of Tithes, Offerings, Building Fund & Stewardship', description: 'Tithe recording, donor envelopes, building pledge tracking, and double-entry ministry accounting.', leadRole: 'CHURCH_TREASURER' },
    { id: 'CHU-DIR-003', code: 'CHU-DIR-EVANGEL', name: 'Directorate of Evangelism, Missions & Community Outreach', description: 'Mission stations, welfare benevolent distributions, community food banks, and youth ministry.', leadRole: 'DIRECTOR_OF_MISSIONS' },
    { id: 'CHU-DIR-004', code: 'CHU-DIR-ADMIN', name: 'Directorate of Church Administration, Properties & Media', description: 'Sanctuary maintenance, church land registry, multi-campus broadcasting, and volunteer rosters.', leadRole: 'CHURCH_ADMINISTRATOR' }
  ],

  departments: Array.from({ length: 12 }, (_, i) => {
    const num = i + 1;
    const pad = String(num).padStart(3, '0');
    return {
      id: `CHU-DEPT-${pad}`,
      directorateId: `CHU-DIR-00${Math.min(4, Math.floor(i / 3) + 1)}`,
      code: `CHU-DEPT-${pad}`,
      name: `Faith Department ${pad}`,
      description: `Faith institution operational or ministry department ${pad}`,
      headRole: `HEAD_CHU_DEPT_${pad}`
    };
  }),

  offices: Array.from({ length: 24 }, (_, i) => {
    const num = i + 1;
    const pad = String(num).padStart(3, '0');
    return {
      id: `CHU-OFF-${pad}`,
      departmentId: `CHU-DEPT-${String(Math.min(12, Math.floor(i / 2) + 1)).padStart(3, '0')}`,
      directorateId: `CHU-DIR-00${Math.min(4, Math.floor(i / 6) + 1)}`,
      code: `CHU-OFF-${pad}`,
      name: `Faith Office/Desk ${pad}`,
      description: `Church administrative desk ${pad}`,
      officerRole: `CHU_OFFICER_${pad}`
    };
  }),

  portals: [
    { id: 'CHU-PORTAL-001', code: 'CHU-PORTAL-CLERGY', name: 'Senior Pastor, Bishop & Clergy Leadership Portal', description: 'Pastoral care, sermon preparation notes, confidential counseling, and diocesan governance.', targetRole: 'SENIOR_CLERGY', authLevel: 'PKI_SOVEREIGN', route: '/portal/church/clergy' },
    { id: 'CHU-PORTAL-002', code: 'CHU-PORTAL-FIN', name: 'Church Finance, Tithes & Stewardship Portal', description: 'Tithe counting, bank slip reconciliation, building project fund, and financial reports.', targetRole: 'CHURCH_TREASURER', authLevel: 'FINANCIAL_DUAL', route: '/portal/church/finance' },
    { id: 'CHU-PORTAL-003', code: 'CHU-PORTAL-VOLUNTEER', name: 'Ministry Leaders & Volunteer Roster Portal', description: 'Service rosters, ushering, choir, Sunday school, and event logistics.', targetRole: 'VOLUNTEER_LEADER', authLevel: 'STAFF', route: '/portal/church/volunteer' },
    { id: 'CHU-PORTAL-004', code: 'CHU-PORTAL-MEMBER', name: 'Member Self-Service & Family Giving Portal', description: 'Giving statements, prayer requests, home cell fellowship, and event registration.', targetRole: 'CHURCH_MEMBER', authLevel: 'STAFF', route: '/portal/church/member' },
    { id: 'CHU-PORTAL-005', code: 'CHU-PORTAL-PUBLIC', name: 'Church Public Gateway & Livestream Portal', description: 'Service livestream, sermon audio archive, prayer request intake, and donation gateway.', targetRole: 'PUBLIC_VISITOR', authLevel: 'PUBLIC', route: '/portal/church/public' }
  ],

  modules: Array.from({ length: 30 }, (_, i) => {
    const num = i + 1;
    const pad = String(num).padStart(3, '0');
    return {
      id: `CHU-MOD-${pad}`,
      code: `CHU-MOD-${pad}`,
      title: `Church & Faith Module ${pad}`,
      purpose: `Purpose of faith module ${pad}`,
      directorateId: `CHU-DIR-00${Math.min(4, Math.floor(i / 8) + 1)}`,
      departmentId: `CHU-DEPT-${String(Math.min(12, Math.floor(i / 3) + 1)).padStart(3, '0')}`,
      officeId: `CHU-OFF-${String(Math.min(24, i + 1)).padStart(3, '0')}`,
      portalId: `CHU-PORTAL-00${Math.min(5, (i % 5) + 1)}`,
      capabilityIds: [`CHU-CAP-${String(i * 3 + 1).padStart(3, '0')}`, `CHU-CAP-${String(i * 3 + 2).padStart(3, '0')}`, `CHU-CAP-${String(i * 3 + 3).padStart(3, '0')}`],
      screenIds: [`CHU-SCR-${pad}`],
      formIds: [`CHU-FORM-${pad}`],
      dashboardIds: i < 12 ? [`CHU-DASH-${pad}`] : [],
      reportIds: i < 20 ? [`CHU-REP-${pad}`] : [],
      workflowIds: i < 16 ? [`CHU-WF-${pad}`] : [],
      databaseEntityIds: i < 22 ? [`CHU-DB-${pad}`] : [],
      apiIds: [`CHU-API-${pad}`],
      runtimeComponentIds: [`CHU-RTC-${pad}`],
      permissionIds: [`CHU-PERM-${String(Math.min(48, i + 1)).padStart(3, '0')}`]
    };
  }),

  capabilities: Array.from({ length: 90 }, (_, i) => {
    const num = i + 1;
    const pad = String(num).padStart(3, '0');
    return {
      id: `CHU-CAP-${pad}`,
      moduleId: `CHU-MOD-${String(Math.min(30, Math.floor(i / 3) + 1)).padStart(3, '0')}`,
      code: `CHU_CAP_${pad}`,
      name: `Faith Capability ${pad}`,
      description: `Faith institutional operational capability ${pad}`,
      serviceAction: `church.action.${pad}`,
      requiredPermission: `CHU-PERM-${String(Math.min(48, Math.floor(i / 2) + 1)).padStart(3, '0')}`
    };
  }),

  screens: Array.from({ length: 36 }, (_, i) => {
    const num = i + 1;
    const pad = String(num).padStart(3, '0');
    return {
      id: `CHU-SCR-${pad}`,
      moduleId: `CHU-MOD-${String(Math.min(30, i + 1)).padStart(3, '0')}`,
      title: `Faith Screen ${pad}`,
      viewType: i % 4 === 0 ? 'DASHBOARD' : i % 4 === 1 ? 'TABLE' : i % 4 === 2 ? 'FORM' : 'DETAIL',
      route: `/portal/church/screen-${pad}`
    };
  }),

  forms: Array.from({ length: 26 }, (_, i) => {
    const num = i + 1;
    const pad = String(num).padStart(3, '0');
    return {
      id: `CHU-FORM-${pad}`,
      moduleId: `CHU-MOD-${String(Math.min(30, i + 1)).padStart(3, '0')}`,
      title: `Faith Form ${pad}`,
      submitAction: `church.submit.${pad}`,
      fieldCount: 6 + (i % 6),
      validationRules: ['REQUIRED_FIELDS', 'MEMBER_FAMILY_CHECK']
    };
  }),

  dashboards: Array.from({ length: 12 }, (_, i) => {
    const num = i + 1;
    const pad = String(num).padStart(3, '0');
    return {
      id: `CHU-DASH-${pad}`,
      moduleId: `CHU-MOD-${String(Math.min(30, i * 2 + 1)).padStart(3, '0')}`,
      title: `Faith Dashboard ${pad}`,
      widgetCount: 4,
      kpiMetrics: ['TOTAL_CONGREGATION', 'TITHES_OFFERINGS_COLLECTED', 'HOME_CELL_ATTENDANCE', 'MISSION_OUTREACH_COUNT']
    };
  }),

  reports: Array.from({ length: 20 }, (_, i) => {
    const num = i + 1;
    const pad = String(num).padStart(3, '0');
    return {
      id: `CHU-REP-${pad}`,
      moduleId: `CHU-MOD-${String(Math.min(30, i + 1)).padStart(3, '0')}`,
      title: `Faith Report ${pad}`,
      format: i % 2 === 0 ? 'SUMMARY' : 'REGULATORY_RETURN',
      exportTypes: ['PDF', 'CSV', 'XLSX']
    };
  }),

  workflows: Array.from({ length: 16 }, (_, i) => {
    const num = i + 1;
    const pad = String(num).padStart(3, '0');
    return {
      id: `CHU-WF-${pad}`,
      moduleId: `CHU-MOD-${String(Math.min(30, i * 2 + 1)).padStart(3, '0')}`,
      title: `Faith Approval Workflow ${pad}`,
      stages: ['SUBMITTED', 'PASTORAL_REVIEW', 'TREASURY_DISBURSEMENT'],
      slaHours: 24,
      requiredApprovers: ['PASTOR', 'TREASURER']
    };
  }),

  databaseEntities: Array.from({ length: 22 }, (_, i) => {
    const num = i + 1;
    const pad = String(num).padStart(3, '0');
    return {
      id: `CHU-DB-${pad}`,
      moduleId: `CHU-MOD-${String(Math.min(30, i + 1)).padStart(3, '0')}`,
      tableName: `chu_table_${pad}`,
      primaryKey: 'id',
      fields: [
        { name: 'id', type: 'STRING', required: true, indexed: true },
        { name: 'member_id', type: 'STRING', required: true, indexed: true },
        { name: 'created_at', type: 'TIMESTAMP', required: true }
      ],
      auditLogged: true
    };
  }),

  apis: Array.from({ length: 32 }, (_, i) => {
    const num = i + 1;
    const pad = String(num).padStart(3, '0');
    return {
      id: `CHU-API-${pad}`,
      moduleId: `CHU-MOD-${String(Math.min(30, i + 1)).padStart(3, '0')}`,
      method: i % 2 === 0 ? 'POST' : 'GET',
      endpoint: `/api/v1/church/endpoint-${pad}`,
      requiredPermission: `CHU-PERM-${String(Math.min(48, (i % 48) + 1)).padStart(3, '0')}`,
      handlerName: `handleChurchApi${pad}`
    };
  }),

  runtimeComponents: Array.from({ length: 32 }, (_, i) => {
    const num = i + 1;
    const pad = String(num).padStart(3, '0');
    return {
      id: `CHU-RTC-${pad}`,
      moduleId: `CHU-MOD-${String(Math.min(30, i + 1)).padStart(3, '0')}`,
      componentName: `ChurchComponent${pad}`,
      renderStrategy: 'METADATA_UNIVERSAL',
      filePath: `/src/products/church/components/ChurchComponent${pad}.tsx`
    };
  }),

  aiAgents: [
    { id: 'CHU-AI-001', moduleId: 'CHU-MOD-001', name: 'Pastoral Care & Member Absenteeism Alert Sentinel', role: 'Flags congregation members missing services for consecutive weeks for pastoral care visitations.', capabilities: ['ABSENTEEISM_DETECTION'] },
    { id: 'CHU-AI-002', moduleId: 'CHU-MOD-005', name: 'Sermon Research & Scripture Reference Assistant', role: 'Provides cross-denominational biblical commentaries and sermon outlines.', capabilities: ['SCRIPTURE_RAG'] },
    { id: 'CHU-AI-003', moduleId: 'CHU-MOD-010', name: 'Tithe & Pledge Giving Predictive Agent', role: 'Forecasts annual church building fund contributions.', capabilities: ['GIVING_FORECAST'] },
    { id: 'CHU-AI-004', moduleId: 'CHU-MOD-015', name: 'Volunteer Roster & Spiritual Gifts Matcher', role: 'Matches congregation spiritual gift surveys to open ministry volunteer positions.', capabilities: ['VOLUNTEER_MATCHING'] }
  ],

  roles: [
    { id: 'CHU-ROLE-001', name: 'SENIOR_PASTOR', tier: 'EXECUTIVE', permissions: ['CHU-PERM-001', 'CHU-PERM-002'] },
    { id: 'CHU-ROLE-002', name: 'ASSOCIATE_PASTOR', tier: 'OPERATIONAL', permissions: ['CHU-PERM-001', 'CHU-PERM-003'] },
    { id: 'CHU-ROLE-003', name: 'CHURCH_TREASURER', tier: 'EXECUTIVE', permissions: ['CHU-PERM-005', 'CHU-PERM-006'] },
    { id: 'CHU-ROLE-004', name: 'CHURCH_ADMINISTRATOR', tier: 'OPERATIONAL', permissions: ['CHU-PERM-007'] },
    { id: 'CHU-ROLE-005', name: 'MINISTRY_LEADER', tier: 'OPERATIONAL', permissions: ['CHU-PERM-008'] },
    { id: 'CHU-ROLE-006', name: 'HOME_CELL_LEADER', tier: 'OPERATIONAL', permissions: ['CHU-PERM-009'] },
    { id: 'CHU-ROLE-007', name: 'VOLUNTEER_USHER', tier: 'OPERATIONAL', permissions: ['CHU-PERM-010'] },
    { id: 'CHU-ROLE-008', name: 'CHURCH_MEMBER', tier: 'CLIENT', permissions: ['CHU-PERM-011'] },
    { id: 'CHU-ROLE-009', name: 'ELDER_BOARD_MEMBER', tier: 'GOVERNANCE', permissions: ['CHU-PERM-001'] },
    { id: 'CHU-ROLE-010', name: 'FINANCE_AUDIT_COMMITTEE', tier: 'GOVERNANCE', permissions: ['CHU-PERM-005'] },
    { id: 'CHU-ROLE-011', name: 'MEDIA_DIRECTOR', tier: 'OPERATIONAL', permissions: ['CHU-PERM-012'] },
    { id: 'CHU-ROLE-012', name: 'MISSIONS_COORDINATOR', tier: 'OPERATIONAL', permissions: ['CHU-PERM-013'] }
  ],

  permissions: Array.from({ length: 48 }, (_, i) => {
    const num = i + 1;
    const pad = String(num).padStart(3, '0');
    return {
      id: `CHU-PERM-${pad}`,
      code: `PERM_CHU_${pad}`,
      description: `Permission grant for faith operation ${pad}`
    };
  }),

  integrations: [
    { id: 'CHU-INT-001', name: 'Mobile Tithes & Offerings Gateway (M-Pesa / Card)', serviceType: 'PAYMENT_SWITCH', status: 'REQUIRED' },
    { id: 'CHU-INT-002', name: 'Member SMS Broadcast & Prayer Hotline Switch', serviceType: 'SMS_GATEWAY', status: 'REQUIRED' },
    { id: 'CHU-INT-003', name: 'Live Stream Video Ingestion & YouTube/Vimeo API', serviceType: 'SMS_GATEWAY', status: 'REQUIRED' },
    { id: 'CHU-INT-004', name: 'Bank Automated Tithes Direct Deposit Feeds', serviceType: 'CORE_BANKING', status: 'REQUIRED' },
    { id: 'CHU-INT-005', name: 'FAAP Double-Entry Ministry & Dedicated Fund Accounting', serviceType: 'CORE_BANKING', status: 'REQUIRED' },
    { id: 'CHU-INT-006', name: 'AEGIS Secure Role Access & Privacy Guard', serviceType: 'HSM_VAULT', status: 'REQUIRED' },
    { id: 'CHU-INT-007', name: 'Biometric Sunday School Child Check-In Hardware API', serviceType: 'GOV_REGISTRY', status: 'REQUIRED' },
    { id: 'CHU-INT-008', name: 'Diocesan Central Synod Statistics Reporting Bridge', serviceType: 'GOV_REGISTRY', status: 'REQUIRED' }
  ],

  configurations: Array.from({ length: 14 }, (_, i) => {
    const num = i + 1;
    const pad = String(num).padStart(3, '0');
    return {
      id: `CHU-CFG-${pad}`,
      key: `chu.config.${pad}`,
      description: `Church configuration parameter ${pad}`,
      defaultValue: `DEFAULT_VALUE_${pad}`
    };
  }),

  testContracts: Array.from({ length: 30 }, (_, i) => {
    const num = i + 1;
    const pad = String(num).padStart(3, '0');
    return {
      id: `CHU-TEST-${pad}`,
      targetId: `CHU-MOD-${pad}`,
      testType: i % 2 === 0 ? 'UNIT' : 'INTEGRATION',
      expectedAssertion: `Module CHU-MOD-${pad} satisfies all contract assertions without errors.`
    };
  })
};
