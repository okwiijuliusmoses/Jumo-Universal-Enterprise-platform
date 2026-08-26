
// JUMO DIGITAL HYBRID PLATFORM - CORE REGISTRIES

export type ProductDefinition = { id: string; name: string; description: string };
export type TenantDefinition = { id: string; name: string; productId: string };
export type TemplateDefinition = { id: string; name: string; displayName?: string; description: string; productId: string };
export type PortalDefinition = { id: string; displayName: string; productId: string; authorizedRoles: string[] };
export type OrganizationDefinition = { id: string; name: string; type: 'DIRECTORATE' | 'DEPARTMENT' | 'OFFICE'; parentId?: string };
export type RoleDefinition = { id: string; name: string; productId: string };
export type PermissionDefinition = { id: string; name: string; roleId: string };
export type ModuleDefinition = { id: string; name: string; displayName: string; description: string; productId: string };
export type SubmoduleDefinition = { id: string; name: string; moduleId: string };
export type CapabilityDefinition = { id: string; name: string; submoduleId: string };
export type WorkflowDefinition = { id: string; name: string; displayName: string; description: string; states: string[]; initialState: string; formFields: any[] };
export type FormDefinition = { id: string; name: string; moduleId: string };
export type NavigationGroup = { group: string; items: { id: string; label: string; iconName: string; path?: string }[] };
export type NavigationDefinition = { portalId: string; groups: NavigationGroup[] };
export type ConfigurationDefinition = { id: string; key: string; value: string };
export type ReportDefinition = { id: string; name: string; moduleId: string };
export type IntegrationDefinition = { id: string; name: string; type: string };
export type APIDefinition = { id: string; method: string; route: string };
export type NotificationDefinition = { id: string; type: string };
export type DeploymentDefinition = { id: string; environment: string };
export type CredentialDefinition = { username: string; portalId: string; role: string; tenantId: string };

export type BenchmarkTraceabilityEntry = {
  benchmarkSource: string;
  extractedCapability: string;
  jumoProduct: string;
  jumoModule: string;
  implementationStatus: 'DISCOVERED' | 'SPECIFIED' | 'SCAFFOLDED' | 'PARTIALLY IMPLEMENTED' | 'IMPLEMENTED' | 'VERIFIED' | 'CERTIFIED';
};

export const BenchmarkTraceabilityRegistry: BenchmarkTraceabilityEntry[] = [
  { benchmarkSource: 'QuickBooks', extractedCapability: 'Chart of Accounts', jumoProduct: 'JUMO-FINTECH', jumoModule: 'FAAP_MOD_COA', implementationStatus: 'CERTIFIED' },
  { benchmarkSource: 'QuickBooks', extractedCapability: 'General Ledger', jumoProduct: 'JUMO-FINTECH', jumoModule: 'FAAP_MOD_GL', implementationStatus: 'CERTIFIED' },
  { benchmarkSource: 'QuickBooks', extractedCapability: 'Accounts Payable', jumoProduct: 'JUMO-FINTECH', jumoModule: 'FAAP_MOD_AP', implementationStatus: 'VERIFIED' },
  { benchmarkSource: 'QuickBooks', extractedCapability: 'Accounts Receivable', jumoProduct: 'JUMO-FINTECH', jumoModule: 'FAAP_MOD_AR', implementationStatus: 'VERIFIED' },
  { benchmarkSource: 'QuickBooks', extractedCapability: 'Bank Reconciliation', jumoProduct: 'JUMO-FINTECH', jumoModule: 'FAAP_MOD_RECON', implementationStatus: 'VERIFIED' },
  { benchmarkSource: 'QuickBooks', extractedCapability: 'Vote Book Management', jumoProduct: 'JUMO-FINTECH', jumoModule: 'FAAP_MOD_VOTEBOOK', implementationStatus: 'CERTIFIED' },
  { benchmarkSource: 'SchoolPay', extractedCapability: 'Student Payment Reference Code', jumoProduct: 'JUMO-FINTECH', jumoModule: 'DP_MOD_REFGEN', implementationStatus: 'CERTIFIED' },
  { benchmarkSource: 'SchoolPay', extractedCapability: 'Tuition Fee Collector', jumoProduct: 'JUMO-FINTECH', jumoModule: 'DP_MOD_TUITION', implementationStatus: 'CERTIFIED' },
  { benchmarkSource: 'SchoolPay', extractedCapability: '1.5% Settlement Fee Engine', jumoProduct: 'JUMO-FINTECH', jumoModule: 'DP_MOD_SETTLEMENT', implementationStatus: 'CERTIFIED' },
  { benchmarkSource: 'Hillside Nalya', extractedCapability: 'Nursery Welfare & Early Childhood Development', jumoProduct: 'JUMO-EDU-ALUMNI', jumoModule: 'EDU_MOD_NURSERY', implementationStatus: 'VERIFIED' },
  { benchmarkSource: 'Alpha Academy', extractedCapability: 'O/A-Level Subject Combinations', jumoProduct: 'JUMO-EDU-ALUMNI', jumoModule: 'EDU_MOD_COMBOS', implementationStatus: 'VERIFIED' },
  { benchmarkSource: 'Alpha Academy', extractedCapability: 'UNEB Candidate Processing', jumoProduct: 'JUMO-EDU-ALUMNI', jumoModule: 'EDU_MOD_UNEB', implementationStatus: 'VERIFIED' },
  { benchmarkSource: 'IUIU / UCU', extractedCapability: 'Senate Governance & Academic Approval', jumoProduct: 'JUMO-EDU-ALUMNI', jumoModule: 'EDU_MOD_SENATE', implementationStatus: 'VERIFIED' },
  { benchmarkSource: 'IUIU / UCU', extractedCapability: 'GPA/CGPA Transcript Engine', jumoProduct: 'JUMO-EDU-ALUMNI', jumoModule: 'EDU_MOD_GPA', implementationStatus: 'CERTIFIED' },
  { benchmarkSource: 'Diocesan Systems', extractedCapability: 'Diocesan Hierarchy & Synod Manager', jumoProduct: 'JUMO-CHURCH', jumoModule: 'CH_MOD_DIOCESE', implementationStatus: 'VERIFIED' },
  { benchmarkSource: 'Diocesan Systems', extractedCapability: 'Sacramental Registers (Baptism, Confirmation, Matrimony)', jumoProduct: 'JUMO-CHURCH', jumoModule: 'CH_MOD_SACRAMENT', implementationStatus: 'VERIFIED' },
  { benchmarkSource: 'Diocesan Systems', extractedCapability: 'Tithes & Stewardship Management', jumoProduct: 'JUMO-CHURCH', jumoModule: 'CH_MOD_TITHE', implementationStatus: 'CERTIFIED' }
];

// 1. Authoritative JUMO Independent ERP Products Family
export const ProductRegistry: ProductDefinition[] = [
  { id: 'JUMO-FINTECH', name: 'Financial & Accounting Platform (FAAP)', description: 'Sovereign Treasury, General Ledger, Banking Switch, and Digital Payments Engine.' },
  { id: 'JUMO-NURSERY-PRIMARY-ERP', name: 'Sovereign ECD Nursery & Primary School ERP', description: 'Early Childhood Development, Primary Curriculum, Learner Records, and Parent Portals.' },
  { id: 'JUMO-SECONDARY-ERP', name: 'Sovereign Secondary School & College ERP', description: 'Secondary Education, O/A Level Academics, Senate, UNEB Analytics, and Boarding Operations.' },
  { id: 'JUMO-ALUMNI', name: 'Sovereign Global Alumni Association ERP', description: 'Global Alumni Registry, Career Mentorship, Endowment Funds, and Institutional Networking.' },
  { id: 'JUMO-CHURCH', name: 'Sovereign Church & Faith Community ERP', description: 'Parishioner Membership, Sacraments, Tithes & Offerings, Pastoral Care, and Ministry Operations.' },
  { id: 'JUMO-CONTROL', name: 'Sovereign Owner Control Center & Engine', description: 'System Control, Module Factory, Zero Trust Security, Telemetry, and AI Governance.' }
];

// Authoritative JUMO Platform Services (Non-ERP sovereign engines)
export const PlatformServiceRegistry: ProductDefinition[] = [];

// Authoritative Control Center Capabilities Registry
export interface ControlCenterCapabilityDefinition {
  id: string;
  name: string;
  category: string;
  description: string;
  route: string;
  parentProduct: 'JUMO-CONTROL';
  type: 'CONTROL_CENTER_CAPABILITY';
  status: 'ACTIVE_CORE' | 'OPERATIONAL' | 'ENFORCED';
}

export const ControlCenterCapabilityRegistry: ControlCenterCapabilityDefinition[] = [
  { id: 'platform-store', name: 'Platform Store & Capability Catalog', category: 'Catalog & Extensions', description: 'Official catalog for discovering, licensing, and installing sovereign enterprise capabilities and modules.', route: '/control-center/store', parentProduct: 'JUMO-CONTROL', type: 'CONTROL_CENTER_CAPABILITY', status: 'ACTIVE_CORE' },
  { id: 'aegis-security', name: 'AEGIS Ring-0 Security Operations', category: 'Security & Zero Trust', description: 'Zero-Trust continuous surveillance, RBAC/ABAC boundaries, secrets encryption vault, and administrative MFA.', route: '/control-center/security', parentProduct: 'JUMO-CONTROL', type: 'CONTROL_CENTER_CAPABILITY', status: 'ENFORCED' },
  { id: 'ai-command', name: 'AI Command Center & Cognitive Gateway', category: 'Cognitive & AI', description: 'Multi-model AI router, agent workforce registry, RAG memory buffers, and AI governance policies.', route: '/control-center/ai', parentProduct: 'JUMO-CONTROL', type: 'CONTROL_CENTER_CAPABILITY', status: 'OPERATIONAL' },
  { id: 'jumo-trust', name: 'JUMO TRUST & Governance Platform', category: 'Assurance & Integrity', description: 'Sovereign institutional integrity, board governance, evidence repository, and audit certification.', route: '/control-center/trust', parentProduct: 'JUMO-CONTROL', type: 'CONTROL_CENTER_CAPABILITY', status: 'OPERATIONAL' },
  { id: 'cloud-console', name: 'Cloud & Infrastructure Console', category: 'Infrastructure & Compute', description: 'Kubernetes/K8s cluster management, workloads, distributed databases, networking, and edge nodes.', route: '/control-center/cloud', parentProduct: 'JUMO-CONTROL', type: 'CONTROL_CENTER_CAPABILITY', status: 'OPERATIONAL' },
  { id: 'monitoring', name: 'Telemetry & Observability Center', category: 'Operations & Diagnostics', description: 'Real-time telemetry metrics, node health monitoring, and system logs.', route: '/control-center/monitoring', parentProduct: 'JUMO-CONTROL', type: 'CONTROL_CENTER_CAPABILITY', status: 'ACTIVE_CORE' },
  { id: 'configuration', name: 'System Settings & Configuration Center', category: 'Administration & Config', description: 'Global system configuration, environment variables, and tenant licensing parameters.', route: '/control-center/settings', parentProduct: 'JUMO-CONTROL', type: 'CONTROL_CENTER_CAPABILITY', status: 'ACTIVE_CORE' }
];

// 2. Tenants
export const TenantRegistry: TenantDefinition[] = [
  { id: 'TENANT_EDU_1', name: 'Sovereign Education Network', productId: 'JUMO-EDU-ALUMNI' },
  { id: 'TENANT_ALUMNI_1', name: 'Sovereign Global Alumni Association', productId: 'JUMO-EDU-ALUMNI' },
  { id: 'TENANT_CH_1', name: 'Grace Diocese', productId: 'JUMO-CHURCH' },
  { id: 'TENANT_FAAP_1', name: 'JUMO Master Treasury', productId: 'JUMO-FINTECH' },
  { id: 'TENANT_DP_1', name: 'JUMO Global Merchant & Payment Switch', productId: 'JUMO-FINTECH' }
];

// 3. Templates
export const EducationTemplateRegistry: TemplateDefinition[] = [
  { id: 'TMPL_EDU_PRE_PRIMARY', name: 'Pre-Primary & Primary', description: 'Early childhood and primary education', productId: 'JUMO-EDU-ALUMNI' },
  { id: 'TMPL_EDU_HIGH_SCHOOL', name: 'High School', description: 'Secondary education with boarding', productId: 'JUMO-EDU-ALUMNI' },
  { id: 'TMPL_EDU_VOCATIONAL', name: 'Vocational & Technical', description: 'Trades and practical training', productId: 'JUMO-EDU-ALUMNI' },
  { id: 'TMPL_EDU_UNIVERSITY', name: 'University / Institutional', description: 'Higher education management', productId: 'JUMO-EDU-ALUMNI' },
  { id: 'TMPL_EDU_HYBRID', name: 'Hybrid Institution', description: 'Combined primary, secondary, and vocational', productId: 'JUMO-EDU-ALUMNI' }
];

export const ChurchTemplateRegistry: TemplateDefinition[] = [
  { id: 'TMPL_CH_LOCAL', name: 'Local Church', description: 'Single congregation management', productId: 'JUMO-CHURCH' },
  { id: 'TMPL_CH_DIOCESE', name: 'Diocese', description: 'Regional administration', productId: 'JUMO-CHURCH' },
  { id: 'TMPL_CH_ARCHDIOCESE', name: 'Archdiocese', description: 'National administration', productId: 'JUMO-CHURCH' },
  { id: 'TMPL_CH_PROVINCE', name: 'Province / Conference', description: 'Provincial administration', productId: 'JUMO-CHURCH' },
  { id: 'TMPL_CH_HQ', name: 'Denominational Headquarters', description: 'Global administration', productId: 'JUMO-CHURCH' }
];

export const TemplateRegistry = [...EducationTemplateRegistry, ...ChurchTemplateRegistry];

// 4. Portals
export const PortalRegistry: PortalDefinition[] = [
  // Education Portals (11)
  { id: 'EDU-PORTAL-STUDENT-0001', displayName: 'Student/Parent Portal', productId: 'JUMO-EDU-ALUMNI', authorizedRoles: ['ROLE_STUDENT', 'ROLE_PARENT'] },
  { id: 'EDU-PORTAL-STAFF-0001', displayName: 'Staff & Lecturer Workspace', productId: 'JUMO-EDU-ALUMNI', authorizedRoles: ['ROLE_STAFF', 'ROLE_TEACHER', 'ROLE_LECTURER'] },
  { id: 'EDU-PORTAL-REG-0001', displayName: 'Academic Registrar Workspace', productId: 'JUMO-EDU-ALUMNI', authorizedRoles: ['ROLE_REGISTRAR'] },
  { id: 'EDU-PORTAL-BURSAR-0001', displayName: 'University Bursar Workspace', productId: 'JUMO-EDU-ALUMNI', authorizedRoles: ['ROLE_BURSAR'] },
  { id: 'EDU-PORTAL-ADMIN-0001', displayName: 'Education System Administration', productId: 'JUMO-EDU-ALUMNI', authorizedRoles: ['ROLE_ADMIN'] },
  { id: 'EDU-PORTAL-HEALTH-0001', displayName: 'University Health & Clinic Portal', productId: 'JUMO-EDU-ALUMNI', authorizedRoles: ['ROLE_HEALTH_OFFICER'] },
  { id: 'EDU-PORTAL-LIBRARY-0001', displayName: 'University Library Portal', productId: 'JUMO-EDU-ALUMNI', authorizedRoles: ['ROLE_LIBRARIAN'] },
  { id: 'EDU-PORTAL-EXAMS-0001', displayName: 'Examinations & Records Portal', productId: 'JUMO-EDU-ALUMNI', authorizedRoles: ['ROLE_EXAM_OFFICER'] },
  { id: 'EDU-PORTAL-DEAN-0001', displayName: 'Dean of Students Workspace', productId: 'JUMO-EDU-ALUMNI', authorizedRoles: ['ROLE_DEAN'] },
  { id: 'EDU-PORTAL-HOSTEL-0001', displayName: 'Hostel & Residential Life Portal', productId: 'JUMO-EDU-ALUMNI', authorizedRoles: ['ROLE_WARDEN'] },
  { id: 'EDU-PORTAL-GOV-0001', displayName: 'Governing Council & Senate Portal', productId: 'JUMO-EDU-ALUMNI', authorizedRoles: ['ROLE_COUNCIL'] },
  
  // Digital Pay Portals (6)
  { id: 'DP-PORTAL-MERCHANT-0001', displayName: 'Merchant Portal', productId: 'JUMO-FINTECH', authorizedRoles: ['ROLE_MERCHANT'] },
  { id: 'DP-PORTAL-AGENT-0001', displayName: 'Agency Banking & POS Portal', productId: 'JUMO-FINTECH', authorizedRoles: ['ROLE_AGENT'] },
  { id: 'DP-PORTAL-OPS-0001', displayName: 'Switch Operations Portal', productId: 'JUMO-FINTECH', authorizedRoles: ['ROLE_OPS'] },
  { id: 'DP-PORTAL-RISK-0001', displayName: 'Risk & Fraud Sentinel Portal', productId: 'JUMO-FINTECH', authorizedRoles: ['ROLE_RISK_ANALYST'] },
  { id: 'DP-PORTAL-DEV-0001', displayName: 'Developer & API Integration Hub', productId: 'JUMO-FINTECH', authorizedRoles: ['ROLE_DEVELOPER'] },
  { id: 'DP-PORTAL-SETTLE-0001', displayName: 'Settlement & Split Clearing Portal', productId: 'JUMO-FINTECH', authorizedRoles: ['ROLE_SETTLEMENT_OFFICER'] },
  { id: 'FINTECH-DEV-PORTAL', displayName: 'JUMO FINTECH Developer Portal', productId: 'JUMO-FINTECH', authorizedRoles: ['ROLE_DEVELOPER', 'ROLE_ADMIN'] },
  
  // FAAP Portals (6)
  { id: 'FAAP-PORTAL-CONTROLLER-0001', displayName: 'Financial Controller Portal', productId: 'JUMO-FINTECH', authorizedRoles: ['ROLE_CONTROLLER'] },
  { id: 'FAAP-PORTAL-ACCOUNTANT-0001', displayName: 'Chief Accountant Workspace', productId: 'JUMO-FINTECH', authorizedRoles: ['ROLE_ACCOUNTANT'] },
  { id: 'FAAP-PORTAL-AUDITOR-0001', displayName: 'Internal Audit & Compliance Portal', productId: 'JUMO-FINTECH', authorizedRoles: ['ROLE_AUDITOR'] },
  { id: 'FAAP-PORTAL-TREASURER-0001', displayName: 'Treasury & Liquidity Workspace', productId: 'JUMO-FINTECH', authorizedRoles: ['ROLE_TREASURER'] },
  { id: 'FAAP-PORTAL-BUDGET-0001', displayName: 'Budget & Vote Book Controller Portal', productId: 'JUMO-FINTECH', authorizedRoles: ['ROLE_BUDGET_OFFICER'] },
  { id: 'FAAP-PORTAL-TAX-0001', displayName: 'Tax & Statutory Compliance Portal', productId: 'JUMO-FINTECH', authorizedRoles: ['ROLE_TAX_OFFICER'] },
  { id: 'FAAP-PORTAL-CFO-0001', displayName: 'Chief Financial Officer Portal', productId: 'JUMO-FINTECH', authorizedRoles: ['ROLE_CFO'] },
  
  // Alumni Portals (5)
  { id: 'ALUM-PORTAL-DIR-0001', displayName: 'Alumni Director Workspace', productId: 'JUMO-EDU-ALUMNI', authorizedRoles: ['ROLE_ALUM_DIRECTOR'] },
  { id: 'ALUM-PORTAL-REG-0001', displayName: 'Graduate Records & Census Portal', productId: 'JUMO-EDU-ALUMNI', authorizedRoles: ['ROLE_ALUM_REGISTRAR'] },
  { id: 'ALUM-PORTAL-GIVE-0001', displayName: 'Endowment & Giving Portal', productId: 'JUMO-EDU-ALUMNI', authorizedRoles: ['ROLE_ALUM_GIVER'] },
  { id: 'ALUM-PORTAL-MENTOR-0001', displayName: 'Mentorship & Career Network', productId: 'JUMO-EDU-ALUMNI', authorizedRoles: ['ROLE_ALUM_MENTOR', 'ROLE_ALUM_STUDENT'] },
  { id: 'ALUM-PORTAL-MEMBER-0001', displayName: 'Alumni Member Self-Service', productId: 'JUMO-EDU-ALUMNI', authorizedRoles: ['ROLE_ALUM_MEMBER'] },

  // Church Portals (6)
  { id: 'CH-PORTAL-MEMBER-0001', displayName: 'Parishioner / Member Portal', productId: 'JUMO-CHURCH', authorizedRoles: ['ROLE_MEMBER'] },
  { id: 'CH-PORTAL-BISHOP-0001', displayName: 'Episcopal Bishop Portal', productId: 'JUMO-CHURCH', authorizedRoles: ['ROLE_BISHOP'] },
  { id: 'CH-PORTAL-ADMIN-0001', displayName: 'Diocesan Administrator Workspace', productId: 'JUMO-CHURCH', authorizedRoles: ['ROLE_CHURCH_ADMIN'] },
  { id: 'CH-PORTAL-CLERGY-0001', displayName: 'Clergy & Pastoral Care Portal', productId: 'JUMO-CHURCH', authorizedRoles: ['ROLE_CLERGY'] },
  { id: 'CH-PORTAL-FINANCE-0001', displayName: 'Diocesan Stewardship & Finance Portal', productId: 'JUMO-CHURCH', authorizedRoles: ['ROLE_CHURCH_TREASURER'] },
  { id: 'CH-PORTAL-PARISH-0001', displayName: 'Parish Priest & Vicar Workspace', productId: 'JUMO-CHURCH', authorizedRoles: ['ROLE_PARISH_PRIEST'] },
  { id: 'EDU-ALUMNI-DEV-PORTAL', displayName: 'JUMO Education & Alumni Developer Portal', productId: 'JUMO-EDU-ALUMNI', authorizedRoles: ['ROLE_ADMIN'] },
  { id: 'CHURCH-DEV-PORTAL', displayName: 'JUMO Church & Diocese Developer Portal', productId: 'JUMO-CHURCH', authorizedRoles: ['ROLE_ADMIN'] }
];

// 5. Credentials
export const CredentialRegistry: CredentialDefinition[] = [
  // Education Credentials
  { username: 'student', portalId: 'EDU-PORTAL-STUDENT-0001', role: 'ROLE_STUDENT', tenantId: 'TENANT_EDU_1' },
  { username: 'lecturer', portalId: 'EDU-PORTAL-STAFF-0001', role: 'ROLE_LECTURER', tenantId: 'TENANT_EDU_1' },
  { username: 'registrar', portalId: 'EDU-PORTAL-REG-0001', role: 'ROLE_REGISTRAR', tenantId: 'TENANT_EDU_1' },
  { username: 'bursar', portalId: 'EDU-PORTAL-BURSAR-0001', role: 'ROLE_BURSAR', tenantId: 'TENANT_EDU_1' },
  { username: 'admin', portalId: 'EDU-PORTAL-ADMIN-0001', role: 'ROLE_ADMIN', tenantId: 'TENANT_EDU_1' },
  { username: 'doctor', portalId: 'EDU-PORTAL-HEALTH-0001', role: 'ROLE_HEALTH_OFFICER', tenantId: 'TENANT_EDU_1' },
  { username: 'librarian', portalId: 'EDU-PORTAL-LIBRARY-0001', role: 'ROLE_LIBRARIAN', tenantId: 'TENANT_EDU_1' },
  { username: 'exams', portalId: 'EDU-PORTAL-EXAMS-0001', role: 'ROLE_EXAM_OFFICER', tenantId: 'TENANT_EDU_1' },
  { username: 'dean', portalId: 'EDU-PORTAL-DEAN-0001', role: 'ROLE_DEAN', tenantId: 'TENANT_EDU_1' },
  { username: 'warden', portalId: 'EDU-PORTAL-HOSTEL-0001', role: 'ROLE_WARDEN', tenantId: 'TENANT_EDU_1' },
  { username: 'council', portalId: 'EDU-PORTAL-GOV-0001', role: 'ROLE_COUNCIL', tenantId: 'TENANT_EDU_1' },

  // Digital Pay Credentials
  { username: 'merchant', portalId: 'DP-PORTAL-MERCHANT-0001', role: 'ROLE_MERCHANT', tenantId: 'TENANT_DP_1' },
  { username: 'agent', portalId: 'DP-PORTAL-AGENT-0001', role: 'ROLE_AGENT', tenantId: 'TENANT_DP_1' },
  { username: 'switchops', portalId: 'DP-PORTAL-OPS-0001', role: 'ROLE_OPS', tenantId: 'TENANT_DP_1' },
  { username: 'risk', portalId: 'DP-PORTAL-RISK-0001', role: 'ROLE_RISK_ANALYST', tenantId: 'TENANT_DP_1' },
  { username: 'developer', portalId: 'DP-PORTAL-DEV-0001', role: 'ROLE_DEVELOPER', tenantId: 'TENANT_DP_1' },
  { username: 'settlement', portalId: 'DP-PORTAL-SETTLE-0001', role: 'ROLE_SETTLEMENT_OFFICER', tenantId: 'TENANT_DP_1' },

  // FAAP Credentials (Including FAAP-CFO-001)
  { username: 'controller', portalId: 'FAAP-PORTAL-CONTROLLER-0001', role: 'ROLE_CONTROLLER', tenantId: 'TENANT_FAAP_1' },
  { username: 'accountant', portalId: 'FAAP-PORTAL-ACCOUNTANT-0001', role: 'ROLE_ACCOUNTANT', tenantId: 'TENANT_FAAP_1' },
  { username: 'auditor', portalId: 'FAAP-PORTAL-AUDITOR-0001', role: 'ROLE_AUDITOR', tenantId: 'TENANT_FAAP_1' },
  { username: 'treasurer', portalId: 'FAAP-PORTAL-TREASURER-0001', role: 'ROLE_TREASURER', tenantId: 'TENANT_FAAP_1' },
  { username: 'budget', portalId: 'FAAP-PORTAL-BUDGET-0001', role: 'ROLE_BUDGET_OFFICER', tenantId: 'TENANT_FAAP_1' },
  { username: 'tax', portalId: 'FAAP-PORTAL-TAX-0001', role: 'ROLE_TAX_OFFICER', tenantId: 'TENANT_FAAP_1' },
  { username: 'FAAP-CFO-001', portalId: 'FAAP-PORTAL-CFO-0001', role: 'ROLE_CFO', tenantId: 'TENANT_FAAP_1' },

  // Church Credentials
  { username: 'bishop', portalId: 'CH-PORTAL-BISHOP-0001', role: 'ROLE_BISHOP', tenantId: 'TENANT_CH_1' },
  { username: 'member', portalId: 'CH-PORTAL-MEMBER-0001', role: 'ROLE_MEMBER', tenantId: 'TENANT_CH_1' },
  { username: 'churchadmin', portalId: 'CH-PORTAL-ADMIN-0001', role: 'ROLE_CHURCH_ADMIN', tenantId: 'TENANT_CH_1' },
  { username: 'clergy', portalId: 'CH-PORTAL-CLERGY-0001', role: 'ROLE_CLERGY', tenantId: 'TENANT_CH_1' },
  { username: 'churchtreasurer', portalId: 'CH-PORTAL-FINANCE-0001', role: 'ROLE_CHURCH_TREASURER', tenantId: 'TENANT_CH_1' },
  { username: 'vicar', portalId: 'CH-PORTAL-PARISH-0001', role: 'ROLE_PARISH_PRIEST', tenantId: 'TENANT_CH_1' },

  // Approved Product Verification Identities
  { username: 'ALPHA-ADMIN-001', portalId: 'EDU-PORTAL-ADMIN-0001', role: 'ROLE_ADMIN', tenantId: 'TENANT_EDU_1' },
  { username: 'IUIU-REG-001', portalId: 'EDU-PORTAL-REG-0001', role: 'ROLE_REGISTRAR', tenantId: 'TENANT_EDU_1' },
  { username: 'CHURCH-BISHOP-001', portalId: 'CH-PORTAL-BISHOP-0001', role: 'ROLE_BISHOP', tenantId: 'TENANT_CH_1' },
  { username: 'ALUMNI-DIR-001', portalId: 'EDU-PORTAL-ADMIN-0001', role: 'ROLE_ADMIN', tenantId: 'TENANT_EDU_1' },
  { username: 'SCHOOLPAY-OPS-001', portalId: 'DP-PORTAL-OPS-0001', role: 'ROLE_OPS', tenantId: 'TENANT_DP_1' },
  { username: 'DIGITALPAY-MERCH-001', portalId: 'DP-PORTAL-MERCHANT-0001', role: 'ROLE_MERCHANT', tenantId: 'TENANT_DP_1' },
  { username: 'fintech.admin', portalId: 'FAAP-PORTAL-CFO-0001', role: 'ROLE_CFO', tenantId: 'TENANT_FAAP_1' },
  { username: 'np.headteacher', portalId: 'EDU-PORTAL-ADMIN-0001', role: 'ROLE_HEADTEACHER', tenantId: 'TENANT_EDU_1' },
  { username: 'sec.headteacher', portalId: 'EDU-PORTAL-ADMIN-0001', role: 'ROLE_HEADTEACHER', tenantId: 'TENANT_EDU_1' },
  { username: 'alumni.president', portalId: 'EDU-PORTAL-ADMIN-0001', role: 'ROLE_ADMIN', tenantId: 'TENANT_EDU_1' },
  { username: 'bishop.admin', portalId: 'CH-PORTAL-BISHOP-0001', role: 'ROLE_BISHOP', tenantId: 'TENANT_CH_1' },
  { username: 'sovereign.owner', portalId: 'FAAP-PORTAL-CONTROLLER-0001', role: 'ROLE_OWNER', tenantId: 'TENANT_FAAP_1' }
];

export const UserRegistry = CredentialRegistry;

// 6. Navigation
export const NavigationRegistry: NavigationDefinition[] = [
  // Education Navigations
  {
    portalId: 'EDU-PORTAL-STUDENT-0001',
    groups: [
      { group: 'Student Services', items: [
        { id: 'MOD_EDU_DASHBOARD', label: 'My Dashboard', iconName: 'LayoutDashboard' },
        { id: 'MOD_EDU_RESULTS', label: 'My Results', iconName: 'FileText' },
        { id: 'MOD_EDU_FEES', label: 'Fees & Invoices', iconName: 'CreditCard' },
        { id: 'MOD_EDU_TIMETABLE', label: 'Timetable', iconName: 'Calendar' },
        { id: 'MOD_EDU_HOSTEL', label: 'Hostel Accommodation', iconName: 'Home' }
      ]}
    ]
  },
  {
    portalId: 'EDU-PORTAL-STAFF-0001',
    groups: [
      { group: 'Faculty Workspace', items: [
        { id: 'MOD_EDU_DASHBOARD', label: 'Faculty Dashboard', iconName: 'LayoutDashboard' },
        { id: 'MOD_EDU_RESULTS_MGT', label: 'Marks Entry & Assessment', iconName: 'FileSpreadsheet' },
        { id: 'MOD_EDU_TIMETABLE_MGT', label: 'Class Schedules', iconName: 'Calendar' },
        { id: 'MOD_EDU_E_LEARNING', label: 'E-Learning Modules', iconName: 'BookOpen' }
      ]}
    ]
  },
  {
    portalId: 'EDU-PORTAL-REG-0001',
    groups: [
      { group: 'Registrar Operations', items: [
        { id: 'MOD_EDU_DASHBOARD', label: 'Dashboard', iconName: 'LayoutDashboard' },
        { id: 'MOD_EDU_ADMISSIONS', label: 'Admissions', iconName: 'Users' },
        { id: 'MOD_EDU_RESULTS_MGT', label: 'Results Management', iconName: 'FileText' },
        { id: 'MOD_EDU_TIMETABLE_MGT', label: 'Timetable Builder', iconName: 'Calendar' },
        { id: 'MOD_EDU_GRADUATION', label: 'Graduation Clearance', iconName: 'Award' }
      ]}
    ]
  },
  {
    portalId: 'EDU-PORTAL-BURSAR-0001',
    groups: [
      { group: 'Finance Operations', items: [
        { id: 'MOD_EDU_DASHBOARD', label: 'Dashboard', iconName: 'LayoutDashboard' },
        { id: 'MOD_EDU_FEES_MGT', label: 'Fees Management', iconName: 'DollarSign' },
        { id: 'MOD_EDU_INVOICING', label: 'Invoicing', iconName: 'FileText' },
        { id: 'MOD_EDU_VOTE_BOOK', label: 'Vote Book', iconName: 'BookOpen' },
        { id: 'MOD_EDU_CASH_BOOKS', label: 'Cash Books', iconName: 'Landmark' }
      ]}
    ]
  },
  {
    portalId: 'EDU-PORTAL-ADMIN-0001',
    groups: [
      { group: 'System Administration', items: [
        { id: 'MOD_EDU_DASHBOARD', label: 'Dashboard', iconName: 'LayoutDashboard' },
        { id: 'MOD_EDU_USERS', label: 'User Management', iconName: 'Users' },
        { id: 'MOD_EDU_SETTINGS', label: 'Configuration', iconName: 'Settings' },
        { id: 'MOD_EDU_AUDIT', label: 'Audit Trail', iconName: 'Shield' }
      ]}
    ]
  },
  {
    portalId: 'EDU-PORTAL-HEALTH-0001',
    groups: [
      { group: 'Clinical Services', items: [
        { id: 'MOD_EDU_DASHBOARD', label: 'Clinic Dashboard', iconName: 'LayoutDashboard' },
        { id: 'MOD_EDU_CLINIC', label: 'Patient Consultations', iconName: 'HeartPulse' },
        { id: 'MOD_EDU_STORES', label: 'Pharmacy & Medical Stores', iconName: 'Layers' }
      ]}
    ]
  },
  {
    portalId: 'EDU-PORTAL-LIBRARY-0001',
    groups: [
      { group: 'Library & Repository', items: [
        { id: 'MOD_EDU_DASHBOARD', label: 'Library Dashboard', iconName: 'LayoutDashboard' },
        { id: 'MOD_EDU_LIBRARY', label: 'Catalog & Circulations', iconName: 'BookOpen' }
      ]}
    ]
  },
  {
    portalId: 'EDU-PORTAL-EXAMS-0001',
    groups: [
      { group: 'Examinations Center', items: [
        { id: 'MOD_EDU_DASHBOARD', label: 'Exams Overview', iconName: 'LayoutDashboard' },
        { id: 'MOD_EDU_RESULTS_MGT', label: 'Score Moderation', iconName: 'FileSpreadsheet' },
        { id: 'MOD_EDU_TRANSCRIPTS', label: 'Transcript Generation', iconName: 'FileText' }
      ]}
    ]
  },
  {
    portalId: 'EDU-PORTAL-DEAN-0001',
    groups: [
      { group: 'Student Welfare', items: [
        { id: 'MOD_EDU_DASHBOARD', label: 'Welfare Dashboard', iconName: 'LayoutDashboard' },
        { id: 'MOD_EDU_DISCIPLINE', label: 'Disciplinary Records', iconName: 'Shield' },
        { id: 'MOD_EDU_COUNSELLING', label: 'Counseling & Guidance', iconName: 'HeartPulse' }
      ]}
    ]
  },
  {
    portalId: 'EDU-PORTAL-HOSTEL-0001',
    groups: [
      { group: 'Residential Services', items: [
        { id: 'MOD_EDU_DASHBOARD', label: 'Hostel Dashboard', iconName: 'LayoutDashboard' },
        { id: 'MOD_EDU_HOSTEL', label: 'Room Allocations', iconName: 'Home' }
      ]}
    ]
  },
  {
    portalId: 'EDU-PORTAL-GOV-0001',
    groups: [
      { group: 'Institutional Governance', items: [
        { id: 'MOD_EDU_DASHBOARD', label: 'Council Overview', iconName: 'LayoutDashboard' },
        { id: 'MOD_EDU_GOVERNANCE', label: 'Council Directives & Minutes', iconName: 'Building' },
        { id: 'MOD_EDU_AUDIT', label: 'Compliance & Audit', iconName: 'Shield' }
      ]}
    ]
  },

  // Digital Pay Navigations
  {
    portalId: 'DP-PORTAL-MERCHANT-0001',
    groups: [
      { group: 'Merchant Services', items: [
        { id: 'MOD_DP_DASHBOARD', label: 'Overview', iconName: 'LayoutDashboard' },
        { id: 'MOD_DP_TRANSACTIONS', label: 'Transactions', iconName: 'Activity' },
        { id: 'MOD_DP_PAYMENT_LINKS', label: 'Payment Links & PRN', iconName: 'CreditCard' },
        { id: 'MOD_DP_SETTLEMENTS', label: 'Settlements & Payouts', iconName: 'Landmark' }
      ]}
    ]
  },
  {
    portalId: 'DP-PORTAL-AGENT-0001',
    groups: [
      { group: 'Agent Banking', items: [
        { id: 'MOD_DP_DASHBOARD', label: 'Float & Cash Drawer', iconName: 'LayoutDashboard' },
        { id: 'MOD_DP_COLLECTIONS', label: 'Cash In / Cash Out', iconName: 'Activity' }
      ]}
    ]
  },
  {
    portalId: 'DP-PORTAL-OPS-0001',
    groups: [
      { group: 'Switch Operations', items: [
        { id: 'MOD_DP_DASHBOARD', label: 'Switch Telemetry', iconName: 'LayoutDashboard' },
        { id: 'MOD_DP_ROUTING', label: 'Routing & Gateway Config', iconName: 'Zap' },
        { id: 'MOD_DP_RECONCILIATION', label: 'Inter-Bank Reconciliation', iconName: 'ArrowRightLeft' }
      ]}
    ]
  },
  {
    portalId: 'DP-PORTAL-RISK-0001',
    groups: [
      { group: 'Risk & Fraud', items: [
        { id: 'MOD_DP_DASHBOARD', label: 'Fraud Radar', iconName: 'Shield' },
        { id: 'MOD_DP_DISPUTES', label: 'Disputes & Chargebacks', iconName: 'AlertTriangle' }
      ]}
    ]
  },
  {
    portalId: 'DP-PORTAL-DEV-0001',
    groups: [
      { group: 'Developer Hub', items: [
        { id: 'MOD_DP_DASHBOARD', label: 'API Telemetry', iconName: 'LayoutDashboard' },
        { id: 'MOD_DP_API_KEYS', label: 'API Keys & Webhooks', iconName: 'Zap' }
      ]}
    ]
  },
  {
    portalId: 'DP-PORTAL-SETTLE-0001',
    groups: [
      { group: 'Settlement Desk', items: [
        { id: 'MOD_DP_DASHBOARD', label: 'Settlement Queue', iconName: 'LayoutDashboard' },
        { id: 'MOD_DP_SPLITS', label: '1.5% Commission Split Ledger', iconName: 'Landmark' }
      ]}
    ]
  },

  // FAAP Navigations
  {
    portalId: 'FAAP-PORTAL-CFO-0001',
    groups: [
      { group: 'Executive Financial Control', items: [
        { id: 'MOD_FAAP_DASHBOARD', label: 'Financial Overview', iconName: 'LayoutDashboard' },
        { id: 'MOD_FAAP_CHART', label: 'Chart of Accounts', iconName: 'BookOpen' },
        { id: 'MOD_FAAP_JOURNAL', label: 'General Journal', iconName: 'ArrowRightLeft' },
        { id: 'MOD_FAAP_REPORTS', label: 'Financial Statements', iconName: 'FileText' }
      ]}
    ]
  },
  {
    portalId: 'FAAP-PORTAL-CONTROLLER-0001',
    groups: [
      { group: 'Financial Control', items: [
        { id: 'MOD_FAAP_DASHBOARD', label: 'Financial Overview', iconName: 'LayoutDashboard' },
        { id: 'MOD_FAAP_CHART', label: 'Chart of Accounts', iconName: 'BookOpen' },
        { id: 'MOD_FAAP_JOURNAL', label: 'General Journal', iconName: 'ArrowRightLeft' },
        { id: 'MOD_FAAP_REPORTS', label: 'Financial Statements', iconName: 'FileText' }
      ]}
    ]
  },
  {
    portalId: 'FAAP-PORTAL-ACCOUNTANT-0001',
    groups: [
      { group: 'Accounting Desk', items: [
        { id: 'MOD_FAAP_DASHBOARD', label: 'Ledger Dashboard', iconName: 'LayoutDashboard' },
        { id: 'MOD_FAAP_AP', label: 'Accounts Payable', iconName: 'FileText' },
        { id: 'MOD_FAAP_AR', label: 'Accounts Receivable', iconName: 'CreditCard' },
        { id: 'MOD_FAAP_BANKING', label: 'Cash Books & Bank Feeds', iconName: 'Landmark' }
      ]}
    ]
  },
  {
    portalId: 'FAAP-PORTAL-AUDITOR-0001',
    groups: [
      { group: 'Audit & Compliance', items: [
        { id: 'MOD_FAAP_DASHBOARD', label: 'Audit Trail Overview', iconName: 'LayoutDashboard' },
        { id: 'MOD_FAAP_TRIAL_BALANCE', label: 'Trial Balance Verification', iconName: 'FileSpreadsheet' },
        { id: 'MOD_FAAP_AUDIT', label: 'Transaction Audit Log', iconName: 'Shield' }
      ]}
    ]
  },
  {
    portalId: 'FAAP-PORTAL-TREASURER-0001',
    groups: [
      { group: 'Treasury & Liquidity', items: [
        { id: 'MOD_FAAP_DASHBOARD', label: 'Cash Flow Position', iconName: 'LayoutDashboard' },
        { id: 'MOD_FAAP_TREASURY', label: 'Master Treasury & Sweep', iconName: 'Landmark' }
      ]}
    ]
  },
  {
    portalId: 'FAAP-PORTAL-BUDGET-0001',
    groups: [
      { group: 'Budget Control', items: [
        { id: 'MOD_FAAP_DASHBOARD', label: 'Budget vs Actuals', iconName: 'LayoutDashboard' },
        { id: 'MOD_FAAP_VOTE_BOOK', label: 'Vote Book Commitments', iconName: 'BookOpen' }
      ]}
    ]
  },
  {
    portalId: 'FAAP-PORTAL-TAX-0001',
    groups: [
      { group: 'Taxation & Statutory', items: [
        { id: 'MOD_FAAP_DASHBOARD', label: 'Tax Position', iconName: 'LayoutDashboard' },
        { id: 'MOD_FAAP_TAX', label: 'VAT & WHT Schedules', iconName: 'FileText' }
      ]}
    ]
  },

  // Church Navigations
  {
    portalId: 'CH-PORTAL-MEMBER-0001',
    groups: [
      { group: 'Member Services', items: [
        { id: 'MOD_CH_DASHBOARD', label: 'My Overview', iconName: 'LayoutDashboard' },
        { id: 'MOD_CH_DONATIONS', label: 'My Giving & Tithes', iconName: 'Heart' },
        { id: 'MOD_CH_EVENTS', label: 'Events & Calendar', iconName: 'Calendar' }
      ]}
    ]
  },
  {
    portalId: 'CH-PORTAL-BISHOP-0001',
    groups: [
      { group: 'Diocesan Governance', items: [
        { id: 'MOD_CH_DASHBOARD', label: 'Diocese Overview', iconName: 'LayoutDashboard' },
        { id: 'MOD_CH_CLERGY', label: 'Clergy Management', iconName: 'Users' },
        { id: 'MOD_CH_FINANCE', label: 'Financial Oversight', iconName: 'DollarSign' },
        { id: 'MOD_CH_GOVERNANCE', label: 'Governance Directives', iconName: 'Building' }
      ]}
    ]
  },
  {
    portalId: 'CH-PORTAL-ADMIN-0001',
    groups: [
      { group: 'Diocesan Administration', items: [
        { id: 'MOD_CH_DASHBOARD', label: 'Admin Dashboard', iconName: 'LayoutDashboard' },
        { id: 'MOD_CH_PARISHES', label: 'Parishes & Deaneries', iconName: 'Building' },
        { id: 'MOD_CH_ASSETS', label: 'Diocesan Property & Assets', iconName: 'Landmark' }
      ]}
    ]
  },
  {
    portalId: 'CH-PORTAL-CLERGY-0001',
    groups: [
      { group: 'Pastoral Ministry', items: [
        { id: 'MOD_CH_DASHBOARD', label: 'Ministry Dashboard', iconName: 'LayoutDashboard' },
        { id: 'MOD_CH_PASTORAL_CARE', label: 'Pastoral Care & Counseling', iconName: 'HeartPulse' },
        { id: 'MOD_CH_SERMONS', label: 'Sermons & Liturgy', iconName: 'BookOpen' }
      ]}
    ]
  },
  {
    portalId: 'CH-PORTAL-FINANCE-0001',
    groups: [
      { group: 'Stewardship & Accounts', items: [
        { id: 'MOD_CH_DASHBOARD', label: 'Finance Overview', iconName: 'LayoutDashboard' },
        { id: 'MOD_CH_TITHES', label: 'Tithes & Offerings', iconName: 'DollarSign' },
        { id: 'MOD_CH_VOTE_BOOK', label: 'Parish Vote Book', iconName: 'BookOpen' }
      ]}
    ]
  },
  {
    portalId: 'CH-PORTAL-PARISH-0001',
    groups: [
      { group: 'Parish Administration', items: [
        { id: 'MOD_CH_DASHBOARD', label: 'Parish Overview', iconName: 'LayoutDashboard' },
        { id: 'MOD_CH_MEMBERS', label: 'Parish Register', iconName: 'Users' },
        { id: 'MOD_CH_SACRAMENTS', label: 'Baptisms & Marriages', iconName: 'FileText' }
      ]}
    ]
  }
];

// 7. Modules
export const ModuleRegistry: ModuleDefinition[] = [
  {"id":"MOD_EDU_ADMISSIONS_0","name":"Admissions","displayName":"Admissions","description":"Universal Education Admissions Module","productId":"JUMO-EDU-ALUMNI"},
  {"id":"MOD_EDU_STUDENT_INFORMATION_SYSTEM_1","name":"Student Information System","displayName":"Student Information System","description":"Universal Education Student Information System Module","productId":"JUMO-EDU-ALUMNI"},
  {"id":"MOD_EDU_STUDENT_PARENT_PORTAL_2","name":"Student/Parent Portal","displayName":"Student/Parent Portal","description":"Universal Education Student/Parent Portal Module","productId":"JUMO-EDU-ALUMNI"},
  {"id":"MOD_EDU_ACADEMIC_MANAGEMENT_3","name":"Academic Management","displayName":"Academic Management","description":"Universal Education Academic Management Module","productId":"JUMO-EDU-ALUMNI"},
  {"id":"MOD_EDU_CURRICULUM_MANAGEMENT_4","name":"Curriculum Management","displayName":"Curriculum Management","description":"Universal Education Curriculum Management Module","productId":"JUMO-EDU-ALUMNI"},
  {"id":"MOD_EDU_COURSES_5","name":"Courses","displayName":"Courses","description":"Universal Education Courses Module","productId":"JUMO-EDU-ALUMNI"},
  {"id":"MOD_EDU_SUBJECTS_6","name":"Subjects","displayName":"Subjects","description":"Universal Education Subjects Module","productId":"JUMO-EDU-ALUMNI"},
  {"id":"MOD_EDU_CLASSES_7","name":"Classes","displayName":"Classes","description":"Universal Education Classes Module","productId":"JUMO-EDU-ALUMNI"},
  {"id":"MOD_EDU_STREAMS_8","name":"Streams","displayName":"Streams","description":"Universal Education Streams Module","productId":"JUMO-EDU-ALUMNI"},
  {"id":"MOD_EDU_TIMETABLES_9","name":"Timetables","displayName":"Timetables","description":"Universal Education Timetables Module","productId":"JUMO-EDU-ALUMNI"},
  {"id":"MOD_EDU_ASSESSMENT_MANAGEMENT_10","name":"Assessment Management","displayName":"Assessment Management","description":"Universal Education Assessment Management Module","productId":"JUMO-EDU-ALUMNI"},
  {"id":"MOD_EDU_EXAMINATION_MANAGEMENT_11","name":"Examination Management","displayName":"Examination Management","description":"Universal Education Examination Management Module","productId":"JUMO-EDU-ALUMNI"},
  {"id":"MOD_EDU_RESULTS_MANAGEMENT_12","name":"Results Management","displayName":"Results Management","description":"Universal Education Results Management Module","productId":"JUMO-EDU-ALUMNI"},
  {"id":"MOD_EDU_TRANSCRIPT_MANAGEMENT_13","name":"Transcript Management","displayName":"Transcript Management","description":"Universal Education Transcript Management Module","productId":"JUMO-EDU-ALUMNI"},
  {"id":"MOD_EDU_GRADUATION_14","name":"Graduation","displayName":"Graduation","description":"Universal Education Graduation Module","productId":"JUMO-EDU-ALUMNI"},
  {"id":"MOD_EDU_DEGREE_AUDIT_15","name":"Degree Audit","displayName":"Degree Audit","description":"Universal Education Degree Audit Module","productId":"JUMO-EDU-ALUMNI"},
  {"id":"MOD_EDU_E_LEARNING_16","name":"E-Learning","displayName":"E-Learning","description":"Universal Education E-Learning Module","productId":"JUMO-EDU-ALUMNI"},
  {"id":"MOD_EDU_DIGITAL_TRAINING_17","name":"Digital Training","displayName":"Digital Training","description":"Universal Education Digital Training Module","productId":"JUMO-EDU-ALUMNI"},
  {"id":"MOD_EDU_DIGITAL_CONFERENCE_18","name":"Digital Conference","displayName":"Digital Conference","description":"Universal Education Digital Conference Module","productId":"JUMO-EDU-ALUMNI"},
  {"id":"MOD_EDU_LIBRARY_19","name":"Library","displayName":"Library","description":"Universal Education Library Module","productId":"JUMO-EDU-ALUMNI"},
  {"id":"MOD_EDU_HOSTEL_MANAGEMENT_20","name":"Hostel Management","displayName":"Hostel Management","description":"Universal Education Hostel Management Module","productId":"JUMO-EDU-ALUMNI"},
  {"id":"MOD_EDU_BOYS_HOSTEL_21","name":"Boys Hostel","displayName":"Boys Hostel","description":"Universal Education Boys Hostel Module","productId":"JUMO-EDU-ALUMNI"},
  {"id":"MOD_EDU_GIRLS_HOSTEL_22","name":"Girls Hostel","displayName":"Girls Hostel","description":"Universal Education Girls Hostel Module","productId":"JUMO-EDU-ALUMNI"},
  {"id":"MOD_EDU_HEALTH_CLINIC_23","name":"Health/Clinic","displayName":"Health/Clinic","description":"Universal Education Health/Clinic Module","productId":"JUMO-EDU-ALUMNI"},
  {"id":"MOD_EDU_LABORATORY_24","name":"Laboratory","displayName":"Laboratory","description":"Universal Education Laboratory Module","productId":"JUMO-EDU-ALUMNI"},
  {"id":"MOD_EDU_GAMES_25","name":"Games","displayName":"Games","description":"Universal Education Games Module","productId":"JUMO-EDU-ALUMNI"},
  {"id":"MOD_EDU_SPORTS_26","name":"Sports","displayName":"Sports","description":"Universal Education Sports Module","productId":"JUMO-EDU-ALUMNI"},
  {"id":"MOD_EDU_STUDENT_WELFARE_27","name":"Student Welfare","displayName":"Student Welfare","description":"Universal Education Student Welfare Module","productId":"JUMO-EDU-ALUMNI"},
  {"id":"MOD_EDU_COUNSELLING_28","name":"Counselling","displayName":"Counselling","description":"Universal Education Counselling Module","productId":"JUMO-EDU-ALUMNI"},
  {"id":"MOD_EDU_DISCIPLINE_29","name":"Discipline","displayName":"Discipline","description":"Universal Education Discipline Module","productId":"JUMO-EDU-ALUMNI"},
  {"id":"MOD_EDU_TRANSPORT_30","name":"Transport","displayName":"Transport","description":"Universal Education Transport Module","productId":"JUMO-EDU-ALUMNI"},
  {"id":"MOD_EDU_SCHOOL_FARM_31","name":"School Farm","displayName":"School Farm","description":"Universal Education School Farm Module","productId":"JUMO-EDU-ALUMNI"},
  {"id":"MOD_EDU_KITCHEN_32","name":"Kitchen","displayName":"Kitchen","description":"Universal Education Kitchen Module","productId":"JUMO-EDU-ALUMNI"},
  {"id":"MOD_EDU_MEALS_33","name":"Meals","displayName":"Meals","description":"Universal Education Meals Module","productId":"JUMO-EDU-ALUMNI"},
  {"id":"MOD_EDU_STORES_34","name":"Stores","displayName":"Stores","description":"Universal Education Stores Module","productId":"JUMO-EDU-ALUMNI"},
  {"id":"MOD_EDU_PROCUREMENT_35","name":"Procurement","displayName":"Procurement","description":"Universal Education Procurement Module","productId":"JUMO-EDU-ALUMNI"},
  {"id":"MOD_EDU_LOGISTICS_36","name":"Logistics","displayName":"Logistics","description":"Universal Education Logistics Module","productId":"JUMO-EDU-ALUMNI"},
  {"id":"MOD_EDU_ESTATES_MANAGEMENT_37","name":"Estates Management","displayName":"Estates Management","description":"Universal Education Estates Management Module","productId":"JUMO-EDU-ALUMNI"},
  {"id":"MOD_EDU_ASSET_MANAGEMENT_38","name":"Asset Management","displayName":"Asset Management","description":"Universal Education Asset Management Module","productId":"JUMO-EDU-ALUMNI"},
  {"id":"MOD_EDU_INSTITUTIONAL_DEVELOPMENT_39","name":"Institutional Development","displayName":"Institutional Development","description":"Universal Education Institutional Development Module","productId":"JUMO-EDU-ALUMNI"},
  {"id":"MOD_EDU_STAFF_MANAGEMENT_40","name":"Staff Management","displayName":"Staff Management","description":"Universal Education Staff Management Module","productId":"JUMO-EDU-ALUMNI"},
  {"id":"MOD_EDU_RECRUITMENT_41","name":"Recruitment","displayName":"Recruitment","description":"Universal Education Recruitment Module","productId":"JUMO-EDU-ALUMNI"},
  {"id":"MOD_EDU_PAYROLL_42","name":"Payroll","displayName":"Payroll","description":"Universal Education Payroll Module","productId":"JUMO-EDU-ALUMNI"},
  {"id":"MOD_EDU_STAFF_SACCO_43","name":"Staff SACCO","displayName":"Staff SACCO","description":"Universal Education Staff SACCO Module","productId":"JUMO-EDU-ALUMNI"},
  {"id":"MOD_EDU_FINANCE_44","name":"Finance","displayName":"Finance","description":"Universal Education Finance Module","productId":"JUMO-EDU-ALUMNI"},
  {"id":"MOD_EDU_BUDGET_45","name":"Budget","displayName":"Budget","description":"Universal Education Budget Module","productId":"JUMO-EDU-ALUMNI"},
  {"id":"MOD_EDU_VOTE_BOOK_46","name":"Vote Book","displayName":"Vote Book","description":"Universal Education Vote Book Module","productId":"JUMO-EDU-ALUMNI"},
  {"id":"MOD_EDU_CASH_BOOKS_47","name":"Cash Books","displayName":"Cash Books","description":"Universal Education Cash Books Module","productId":"JUMO-EDU-ALUMNI"},
  {"id":"MOD_EDU_ACCOUNTS_PAYABLE_48","name":"Accounts Payable","displayName":"Accounts Payable","description":"Universal Education Accounts Payable Module","productId":"JUMO-EDU-ALUMNI"},
  {"id":"MOD_EDU_ACCOUNTS_RECEIVABLE_49","name":"Accounts Receivable","displayName":"Accounts Receivable","description":"Universal Education Accounts Receivable Module","productId":"JUMO-EDU-ALUMNI"},
  {"id":"MOD_EDU_GENERAL_LEDGER_50","name":"General Ledger","displayName":"General Ledger","description":"Universal Education General Ledger Module","productId":"JUMO-EDU-ALUMNI"},
  {"id":"MOD_EDU_GRANTS_51","name":"Grants","displayName":"Grants","description":"Universal Education Grants Module","productId":"JUMO-EDU-ALUMNI"},
  {"id":"MOD_EDU_DONOR_MANAGEMENT_52","name":"Donor Management","displayName":"Donor Management","description":"Universal Education Donor Management Module","productId":"JUMO-EDU-ALUMNI"},
  {"id":"MOD_EDU_COMMUNICATIONS_53","name":"Communications","displayName":"Communications","description":"Universal Education Communications Module","productId":"JUMO-EDU-ALUMNI"},
  {"id":"MOD_EDU_SMS_54","name":"SMS","displayName":"SMS","description":"Universal Education SMS Module","productId":"JUMO-EDU-ALUMNI"},
  {"id":"MOD_EDU_EMAIL_55","name":"Email","displayName":"Email","description":"Universal Education Email Module","productId":"JUMO-EDU-ALUMNI"},
  {"id":"MOD_EDU_NOTIFICATIONS_56","name":"Notifications","displayName":"Notifications","description":"Universal Education Notifications Module","productId":"JUMO-EDU-ALUMNI"},
  {"id":"MOD_EDU_DATA___INFORMATION_MANAGEMENT_57","name":"Data & Information Management","displayName":"Data & Information Management","description":"Universal Education Data & Information Management Module","productId":"JUMO-EDU-ALUMNI"},
  {"id":"MOD_EDU_REPORTING_58","name":"Reporting","displayName":"Reporting","description":"Universal Education Reporting Module","productId":"JUMO-EDU-ALUMNI"},
  {"id":"MOD_EDU_ANALYTICS_59","name":"Analytics","displayName":"Analytics","description":"Universal Education Analytics Module","productId":"JUMO-EDU-ALUMNI"},
  {"id":"MOD_EDU_GOVERNANCE_60","name":"Governance","displayName":"Governance","description":"Universal Education Governance Module","productId":"JUMO-EDU-ALUMNI"},
  {"id":"MOD_EDU_AUDIT_61","name":"Audit","displayName":"Audit","description":"Universal Education Audit Module","productId":"JUMO-EDU-ALUMNI"},
  {"id":"MOD_EDU_COMPLIANCE_62","name":"Compliance","displayName":"Compliance","description":"Universal Education Compliance Module","productId":"JUMO-EDU-ALUMNI"},
  {"id":"MOD_EDU_SECURITY_63","name":"Security","displayName":"Security","description":"Universal Education Security Module","productId":"JUMO-EDU-ALUMNI"},
  {"id":"MOD_EDU_CONFIGURATION_64","name":"Configuration","displayName":"Configuration","description":"Universal Education Configuration Module","productId":"JUMO-EDU-ALUMNI"},
  {"id":"MOD_EDU_INTEGRATION_MANAGEMENT_65","name":"Integration Management","displayName":"Integration Management","description":"Universal Education Integration Management Module","productId":"JUMO-EDU-ALUMNI"},
  {"id":"MOD_DP_PAYMENT_INTENTS_0","name":"payment intents","displayName":"Payment intents","description":"Digital Pay payment intents Module","productId":"JUMO-FINTECH"},
  {"id":"MOD_DP_PAYMENT_LINKS_1","name":"payment links","displayName":"Payment links","description":"Digital Pay payment links Module","productId":"JUMO-FINTECH"},
  {"id":"MOD_DP_PRNS_2","name":"PRNs","displayName":"PRNs","description":"Digital Pay PRNs Module","productId":"JUMO-FINTECH"},
  {"id":"MOD_DP_COLLECTIONS_3","name":"collections","displayName":"Collections","description":"Digital Pay collections Module","productId":"JUMO-FINTECH"},
  {"id":"MOD_DP_MOBILE_MONEY_4","name":"mobile money","displayName":"Mobile money","description":"Digital Pay mobile money Module","productId":"JUMO-FINTECH"},
  {"id":"MOD_DP_CARDS_5","name":"cards","displayName":"Cards","description":"Digital Pay cards Module","productId":"JUMO-FINTECH"},
  {"id":"MOD_DP_BANK_TRANSFERS_6","name":"bank transfers","displayName":"Bank transfers","description":"Digital Pay bank transfers Module","productId":"JUMO-FINTECH"},
  {"id":"MOD_DP_WALLET_7","name":"wallet","displayName":"Wallet","description":"Digital Pay wallet Module","productId":"JUMO-FINTECH"},
  {"id":"MOD_DP_USSD_8","name":"USSD","displayName":"USSD","description":"Digital Pay USSD Module","productId":"JUMO-FINTECH"},
  {"id":"MOD_DP_MERCHANT_ONBOARDING_9","name":"merchant onboarding","displayName":"Merchant onboarding","description":"Digital Pay merchant onboarding Module","productId":"JUMO-FINTECH"},
  {"id":"MOD_DP_KYC_10","name":"KYC","displayName":"KYC","description":"Digital Pay KYC Module","productId":"JUMO-FINTECH"},
  {"id":"MOD_DP_ROUTING_11","name":"routing","displayName":"Routing","description":"Digital Pay routing Module","productId":"JUMO-FINTECH"},
  {"id":"MOD_DP_RETRIES_12","name":"retries","displayName":"Retries","description":"Digital Pay retries Module","productId":"JUMO-FINTECH"},
  {"id":"MOD_DP_FAILOVER_13","name":"failover","displayName":"Failover","description":"Digital Pay failover Module","productId":"JUMO-FINTECH"},
  {"id":"MOD_DP_FRAUD_14","name":"fraud","displayName":"Fraud","description":"Digital Pay fraud Module","productId":"JUMO-FINTECH"},
  {"id":"MOD_DP_SETTLEMENT_15","name":"settlement","displayName":"Settlement","description":"Digital Pay settlement Module","productId":"JUMO-FINTECH"},
  {"id":"MOD_DP_SPLIT_PAYMENTS_16","name":"split payments","displayName":"Split payments","description":"Digital Pay split payments Module","productId":"JUMO-FINTECH"},
  {"id":"MOD_DP_RECONCILIATION_17","name":"reconciliation","displayName":"Reconciliation","description":"Digital Pay reconciliation Module","productId":"JUMO-FINTECH"},
  {"id":"MOD_DP_REFUNDS_18","name":"refunds","displayName":"Refunds","description":"Digital Pay refunds Module","productId":"JUMO-FINTECH"},
  {"id":"MOD_DP_DISPUTES_19","name":"disputes","displayName":"Disputes","description":"Digital Pay disputes Module","productId":"JUMO-FINTECH"},
  {"id":"MOD_DP_CHARGEBACKS_20","name":"chargebacks","displayName":"Chargebacks","description":"Digital Pay chargebacks Module","productId":"JUMO-FINTECH"},
  {"id":"MOD_DP_REPORTING_21","name":"reporting","displayName":"Reporting","description":"Digital Pay reporting Module","productId":"JUMO-FINTECH"},
  {"id":"MOD_DP_API_MANAGEMENT_22","name":"API management","displayName":"API management","description":"Digital Pay API management Module","productId":"JUMO-FINTECH"},
  {"id":"MOD_DP_WEBHOOKS_23","name":"webhooks","displayName":"Webhooks","description":"Digital Pay webhooks Module","productId":"JUMO-FINTECH"},
  {"id":"MOD_DP_NOTIFICATIONS_24","name":"notifications","displayName":"Notifications","description":"Digital Pay notifications Module","productId":"JUMO-FINTECH"},
  {"id":"MOD_FAAP_CHART_OF_ACCOUNTS_0","name":"chart of accounts","displayName":"Chart Of Accounts","description":"FAAP chart of accounts Module","productId":"JUMO-FINTECH"},
  {"id":"MOD_FAAP_GENERAL_LEDGER_1","name":"general ledger","displayName":"General Ledger","description":"FAAP general ledger Module","productId":"JUMO-FINTECH"},
  {"id":"MOD_FAAP_JOURNAL_2","name":"journal","displayName":"Journal","description":"FAAP journal Module","productId":"JUMO-FINTECH"},
  {"id":"MOD_FAAP_ACCOUNTS_PAYABLE_3","name":"accounts payable","displayName":"Accounts Payable","description":"FAAP accounts payable Module","productId":"JUMO-FINTECH"},
  {"id":"MOD_FAAP_ACCOUNTS_RECEIVABLE_4","name":"accounts receivable","displayName":"Accounts Receivable","description":"FAAP accounts receivable Module","productId":"JUMO-FINTECH"},
  {"id":"MOD_FAAP_INVOICING_5","name":"invoicing","displayName":"Invoicing","description":"FAAP invoicing Module","productId":"JUMO-FINTECH"},
  {"id":"MOD_FAAP_BILLS_6","name":"bills","displayName":"Bills","description":"FAAP bills Module","productId":"JUMO-FINTECH"},
  {"id":"MOD_FAAP_RECEIPTS_7","name":"receipts","displayName":"Receipts","description":"FAAP receipts Module","productId":"JUMO-FINTECH"},
  {"id":"MOD_FAAP_BANK_ACCOUNTS_8","name":"bank accounts","displayName":"Bank Accounts","description":"FAAP bank accounts Module","productId":"JUMO-FINTECH"},
  {"id":"MOD_FAAP_BANK_FEEDS_9","name":"bank feeds","displayName":"Bank Feeds","description":"FAAP bank feeds Module","productId":"JUMO-FINTECH"},
  {"id":"MOD_FAAP_RECONCILIATION_10","name":"reconciliation","displayName":"Reconciliation","description":"FAAP reconciliation Module","productId":"JUMO-FINTECH"},
  {"id":"MOD_FAAP_BUDGETING_11","name":"budgeting","displayName":"Budgeting","description":"FAAP budgeting Module","productId":"JUMO-FINTECH"},
  {"id":"MOD_FAAP_BUDGET_BOOK_12","name":"budget book","displayName":"Budget Book","description":"FAAP budget book Module","productId":"JUMO-FINTECH"},
  {"id":"MOD_FAAP_VOTE_BOOK_13","name":"vote book","displayName":"Vote Book","description":"FAAP vote book Module","productId":"JUMO-FINTECH"},
  {"id":"MOD_FAAP_CASH_BOOK_14","name":"cash book","displayName":"Cash Book","description":"FAAP cash book Module","productId":"JUMO-FINTECH"},
  {"id":"MOD_FAAP_SINGLE_CASH_BOOK_15","name":"single cash book","displayName":"Single Cash Book","description":"FAAP single cash book Module","productId":"JUMO-FINTECH"},
  {"id":"MOD_FAAP_DOUBLE_CASH_BOOK_16","name":"double cash book","displayName":"Double Cash Book","description":"FAAP double cash book Module","productId":"JUMO-FINTECH"},
  {"id":"MOD_FAAP_TRIPLE_CASH_BOOK_17","name":"triple cash book","displayName":"Triple Cash Book","description":"FAAP triple cash book Module","productId":"JUMO-FINTECH"},
  {"id":"MOD_FAAP_PETTY_CASH_18","name":"petty cash","displayName":"Petty Cash","description":"FAAP petty cash Module","productId":"JUMO-FINTECH"},
  {"id":"MOD_FAAP_TREASURY_19","name":"treasury","displayName":"Treasury","description":"FAAP treasury Module","productId":"JUMO-FINTECH"},
  {"id":"MOD_FAAP_FIXED_ASSETS_20","name":"fixed assets","displayName":"Fixed Assets","description":"FAAP fixed assets Module","productId":"JUMO-FINTECH"},
  {"id":"MOD_FAAP_DEPRECIATION_21","name":"depreciation","displayName":"Depreciation","description":"FAAP depreciation Module","productId":"JUMO-FINTECH"},
  {"id":"MOD_FAAP_EXPENSES_22","name":"expenses","displayName":"Expenses","description":"FAAP expenses Module","productId":"JUMO-FINTECH"},
  {"id":"MOD_FAAP_GRANTS_23","name":"grants","displayName":"Grants","description":"FAAP grants Module","productId":"JUMO-FINTECH"},
  {"id":"MOD_FAAP_RESTRICTED_FUNDS_24","name":"restricted funds","displayName":"Restricted Funds","description":"FAAP restricted funds Module","productId":"JUMO-FINTECH"},
  {"id":"MOD_FAAP_DONOR_FUNDS_25","name":"donor funds","displayName":"Donor Funds","description":"FAAP donor funds Module","productId":"JUMO-FINTECH"},
  {"id":"MOD_FAAP_PROJECTS_26","name":"projects","displayName":"Projects","description":"FAAP projects Module","productId":"JUMO-FINTECH"},
  {"id":"MOD_FAAP_COST_CENTRES_27","name":"cost centres","displayName":"Cost Centres","description":"FAAP cost centres Module","productId":"JUMO-FINTECH"},
  {"id":"MOD_FAAP_DIMENSIONS_28","name":"dimensions","displayName":"Dimensions","description":"FAAP dimensions Module","productId":"JUMO-FINTECH"},
  {"id":"MOD_FAAP_TAX_29","name":"tax","displayName":"Tax","description":"FAAP tax Module","productId":"JUMO-FINTECH"},
  {"id":"MOD_FAAP_FISCAL_PERIODS_30","name":"fiscal periods","displayName":"Fiscal Periods","description":"FAAP fiscal periods Module","productId":"JUMO-FINTECH"},
  {"id":"MOD_FAAP_CLOSING_31","name":"closing","displayName":"Closing","description":"FAAP closing Module","productId":"JUMO-FINTECH"},
  {"id":"MOD_FAAP_CONSOLIDATION_32","name":"consolidation","displayName":"Consolidation","description":"FAAP consolidation Module","productId":"JUMO-FINTECH"},
  {"id":"MOD_FAAP_FINANCIAL_STATEMENTS_33","name":"financial statements","displayName":"Financial Statements","description":"FAAP financial statements Module","productId":"JUMO-FINTECH"},
  {"id":"MOD_FAAP_TRIAL_BALANCE_34","name":"trial balance","displayName":"Trial Balance","description":"FAAP trial balance Module","productId":"JUMO-FINTECH"},
  {"id":"MOD_FAAP_AUDIT_35","name":"audit","displayName":"Audit","description":"FAAP audit Module","productId":"JUMO-FINTECH"},
  {"id":"MOD_FAAP_MAKER_CHECKER_36","name":"maker-checker","displayName":"Maker-checker","description":"FAAP maker-checker Module","productId":"JUMO-FINTECH"},
  {"id":"MOD_FAAP_APPROVAL_37","name":"approval","displayName":"Approval","description":"FAAP approval Module","productId":"JUMO-FINTECH"},
  {"id":"MOD_FAAP_FINANCIAL_ANALYTICS_38","name":"financial analytics","displayName":"Financial Analytics","description":"FAAP financial analytics Module","productId":"JUMO-FINTECH"},
  {"id":"MOD_FAAP_FORECASTING_39","name":"forecasting","displayName":"Forecasting","description":"FAAP forecasting Module","productId":"JUMO-FINTECH"},
  {"id":"MOD_FAAP_REPORTING_40","name":"reporting","displayName":"Reporting","description":"FAAP reporting Module","productId":"JUMO-FINTECH"},
  {"id":"MOD_CH_CHURCH_MEMBERSHIP_0","name":"church membership","displayName":"Church Membership","description":"Church church membership Module","productId":"JUMO-CHURCH"},
  {"id":"MOD_CH_CLERGY_1","name":"clergy","displayName":"Clergy","description":"Church clergy Module","productId":"JUMO-CHURCH"},
  {"id":"MOD_CH_PARISHES_2","name":"parishes","displayName":"Parishes","description":"Church parishes Module","productId":"JUMO-CHURCH"},
  {"id":"MOD_CH_DIOCESES_3","name":"dioceses","displayName":"Dioceses","description":"Church dioceses Module","productId":"JUMO-CHURCH"},
  {"id":"MOD_CH_CONGREGATIONS_4","name":"congregations","displayName":"Congregations","description":"Church congregations Module","productId":"JUMO-CHURCH"},
  {"id":"MOD_CH_MINISTRIES_5","name":"ministries","displayName":"Ministries","description":"Church ministries Module","productId":"JUMO-CHURCH"},
  {"id":"MOD_CH_GROUPS_6","name":"groups","displayName":"Groups","description":"Church groups Module","productId":"JUMO-CHURCH"},
  {"id":"MOD_CH_VOLUNTEERS_7","name":"volunteers","displayName":"Volunteers","description":"Church volunteers Module","productId":"JUMO-CHURCH"},
  {"id":"MOD_CH_EVENTS_8","name":"events","displayName":"Events","description":"Church events Module","productId":"JUMO-CHURCH"},
  {"id":"MOD_CH_CALENDAR_9","name":"calendar","displayName":"Calendar","description":"Church calendar Module","productId":"JUMO-CHURCH"},
  {"id":"MOD_CH_WORSHIP_PLANNING_10","name":"worship planning","displayName":"Worship Planning","description":"Church worship planning Module","productId":"JUMO-CHURCH"},
  {"id":"MOD_CH_SERMONS_CONTENT_11","name":"sermons/content","displayName":"Sermons/content","description":"Church sermons/content Module","productId":"JUMO-CHURCH"},
  {"id":"MOD_CH_YOUTH_12","name":"youth","displayName":"Youth","description":"Church youth Module","productId":"JUMO-CHURCH"},
  {"id":"MOD_CH_CHILDREN_13","name":"children","displayName":"Children","description":"Church children Module","productId":"JUMO-CHURCH"},
  {"id":"MOD_CH_MISSIONS_14","name":"missions","displayName":"Missions","description":"Church missions Module","productId":"JUMO-CHURCH"},
  {"id":"MOD_CH_EVANGELISM_15","name":"evangelism","displayName":"Evangelism","description":"Church evangelism Module","productId":"JUMO-CHURCH"},
  {"id":"MOD_CH_OUTREACH_16","name":"outreach","displayName":"Outreach","description":"Church outreach Module","productId":"JUMO-CHURCH"},
  {"id":"MOD_CH_DONATIONS_17","name":"donations","displayName":"Donations","description":"Church donations Module","productId":"JUMO-CHURCH"},
  {"id":"MOD_CH_TITHES_18","name":"tithes","displayName":"Tithes","description":"Church tithes Module","productId":"JUMO-CHURCH"},
  {"id":"MOD_CH_OFFERINGS_19","name":"offerings","displayName":"Offerings","description":"Church offerings Module","productId":"JUMO-CHURCH"},
  {"id":"MOD_CH_PLEDGES_20","name":"pledges","displayName":"Pledges","description":"Church pledges Module","productId":"JUMO-CHURCH"},
  {"id":"MOD_CH_FUNDRAISING_21","name":"fundraising","displayName":"Fundraising","description":"Church fundraising Module","productId":"JUMO-CHURCH"},
  {"id":"MOD_CH_FINANCE_22","name":"finance","displayName":"Finance","description":"Church finance Module","productId":"JUMO-CHURCH"},
  {"id":"MOD_CH_BUDGET_23","name":"budget","displayName":"Budget","description":"Church budget Module","productId":"JUMO-CHURCH"},
  {"id":"MOD_CH_VOTE_BOOK_24","name":"vote book","displayName":"Vote Book","description":"Church vote book Module","productId":"JUMO-CHURCH"},
  {"id":"MOD_CH_CASH_BOOKS_25","name":"cash books","displayName":"Cash Books","description":"Church cash books Module","productId":"JUMO-CHURCH"},
  {"id":"MOD_CH_EXPENSES_26","name":"expenses","displayName":"Expenses","description":"Church expenses Module","productId":"JUMO-CHURCH"},
  {"id":"MOD_CH_PROCUREMENT_27","name":"procurement","displayName":"Procurement","description":"Church procurement Module","productId":"JUMO-CHURCH"},
  {"id":"MOD_CH_INVENTORY_28","name":"inventory","displayName":"Inventory","description":"Church inventory Module","productId":"JUMO-CHURCH"},
  {"id":"MOD_CH_ASSETS_29","name":"assets","displayName":"Assets","description":"Church assets Module","productId":"JUMO-CHURCH"},
  {"id":"MOD_CH_FACILITIES_30","name":"facilities","displayName":"Facilities","description":"Church facilities Module","productId":"JUMO-CHURCH"},
  {"id":"MOD_CH_HR_31","name":"HR","displayName":"HR","description":"Church HR Module","productId":"JUMO-CHURCH"},
  {"id":"MOD_CH_RECRUITMENT_32","name":"recruitment","displayName":"Recruitment","description":"Church recruitment Module","productId":"JUMO-CHURCH"},
  {"id":"MOD_CH_STAFF_SACCO_33","name":"staff SACCO","displayName":"Staff SACCO","description":"Church staff SACCO Module","productId":"JUMO-CHURCH"},
  {"id":"MOD_CH_COMMUNICATIONS_34","name":"communications","displayName":"Communications","description":"Church communications Module","productId":"JUMO-CHURCH"},
  {"id":"MOD_CH_SMS_35","name":"SMS","displayName":"SMS","description":"Church SMS Module","productId":"JUMO-CHURCH"},
  {"id":"MOD_CH_EMAIL_36","name":"email","displayName":"Email","description":"Church email Module","productId":"JUMO-CHURCH"},
  {"id":"MOD_CH_MEDIA_37","name":"media","displayName":"Media","description":"Church media Module","productId":"JUMO-CHURCH"},
  {"id":"MOD_CH_GOVERNANCE_38","name":"governance","displayName":"Governance","description":"Church governance Module","productId":"JUMO-CHURCH"},
  {"id":"MOD_CH_AUDIT_39","name":"audit","displayName":"Audit","description":"Church audit Module","productId":"JUMO-CHURCH"},
  {"id":"MOD_CH_REPORTS_40","name":"reports","displayName":"Reports","description":"Church reports Module","productId":"JUMO-CHURCH"},
  {"id":"MOD_CH_PASTORAL_CARE_41","name":"pastoral care","displayName":"Pastoral Care","description":"Church pastoral care Module","productId":"JUMO-CHURCH"},
  {"id":"MOD_CH_MEMBER_RECORDS_42","name":"member records","displayName":"Member Records","description":"Church member records Module","productId":"JUMO-CHURCH"},
  {"id":"MOD_CH_SACRAMENTS_ORDINANCES_43","name":"sacraments/ordinances","displayName":"Sacraments/ordinances","description":"Church sacraments/ordinances Module","productId":"JUMO-CHURCH"},
  {"id":"MOD_CH_CONFERENCES_44","name":"conferences","displayName":"Conferences","description":"Church conferences Module","productId":"JUMO-CHURCH"},
  {"id":"MOD_CH_TRAINING_45","name":"training","displayName":"Training","description":"Church training Module","productId":"JUMO-CHURCH"},
  {"id":"MOD_CH_SCHOOLS_INSTITUTIONAL_MINISTRIES_46","name":"schools/institutional ministries","displayName":"Schools/institutional Ministries","description":"Church schools/institutional ministries Module","productId":"JUMO-CHURCH"},
  {
    "id": "MOD_ALUM_DIRECTORY_0",
    "name": "alumni directory",
    "displayName": "Alumni Directory",
    "description": "Comprehensive graduate database & digital census",
    "productId": "JUMO-EDU-ALUMNI"
  },
  {
    "id": "MOD_ALUM_ENDOWMENT_1",
    "name": "endowment donation",
    "displayName": "Endowment & Giving",
    "description": "Institutional advancement & donation tracking",
    "productId": "JUMO-EDU-ALUMNI"
  },
  {
    "id": "MOD_ALUM_MENTORSHIP_2",
    "name": "mentorship matching",
    "displayName": "Mentorship Network",
    "description": "Peer-to-peer mentorship & career coaching",
    "productId": "JUMO-EDU-ALUMNI"
  },
  {
    "id": "MOD_ALUM_EVENTS_3",
    "name": "event ticketing",
    "displayName": "Events & Reunions",
    "description": "Ticketing and coordination for alumni gatherings",
    "productId": "JUMO-EDU-ALUMNI"
  },
  {
    "id": "MOD_ALUM_VERIFICATION_4",
    "name": "degree verification",
    "displayName": "Degree Verification",
    "description": "Cryptographic proof of graduation for employers",
    "productId": "JUMO-ALUMNI"
  },
  {"id":"MOD_CH_WEDDINGS_47","name":"weddings","displayName":"Wedding Registry","description":"Church marriage and wedding coordination Module","productId":"JUMO-CHURCH"},
  {"id":"MOD_CH_FUNERALS_48","name":"funerals","displayName":"Funeral Services","description":"Church funeral and bereavement coordination Module","productId":"JUMO-CHURCH"},
  {"id":"MOD_CH_COUNSELING_49","name":"counseling","displayName":"Pastoral Counseling","description":"Church counseling and spiritual guidance Module","productId":"JUMO-CHURCH"},
  {"id":"MOD_ALUM_CHAPTERS_5","name":"chapters","displayName":"Alumni Chapters","description":"Regional and global alumni chapter management Module","productId":"JUMO-ALUMNI"},
  {"id":"MOD_ALUM_CHAPTER_LEADERSHIP_6","name":"chapter leadership","displayName":"Chapter Leadership","description":"Management of alumni chapter executives and roles Module","productId":"JUMO-ALUMNI"},
  {"id":"MOD_ALUM_REGIONAL_CLUSTERS_7","name":"regional clusters","displayName":"Regional Clusters","description":"Grouping of alumni chapters by geographic region Module","productId":"JUMO-ALUMNI"},
  {"id":"MOD_ALUM_GLOBAL_COUNCIL_8","name":"global council","displayName":"Global Alumni Council","description":"Sovereign governance body for global alumni operations Module","productId":"JUMO-ALUMNI"},
  {"id":"MOD_ALUM_CENSUS_TRACKER_9","name":"census tracker","displayName":"Alumni Census","description":"Dynamic tracking of graduate population and location Module","productId":"JUMO-ALUMNI"},
  {"id":"MOD_ALUM_GRADUATE_DATABASE_10","name":"graduate database","displayName":"Graduate Registry","description":"Official institutional record of all graduated students Module","productId":"JUMO-ALUMNI"},
  {"id":"MOD_ALUM_VERIFICATION_PORTAL_11","name":"verification portal","displayName":"Verification Portal","description":"Employer access for verifying alumni credentials Module","productId":"JUMO-ALUMNI"},
  {"id":"MOD_ALUM_TRANSCRIPT_REQUESTS_12","name":"transcript requests","displayName":"Transcript Requests","description":"Ordering and tracking of academic transcripts for alumni Module","productId":"JUMO-ALUMNI"},
  {"id":"MOD_ALUM_DONATION_PORTAL_13","name":"donation portal","displayName":"Giving Portal","description":"Online collection of alumni donations and gifts Module","productId":"JUMO-ALUMNI"},
  {"id":"MOD_ALUM_CAPITAL_CAMPAIGNS_14","name":"capital campaigns","displayName":"Capital Campaigns","description":"Strategic fundraising for institutional infrastructure Module","productId":"JUMO-ALUMNI"},
  {"id":"MOD_ALUM_ENDOWMENT_MANAGEMENT_15","name":"endowment management","displayName":"Endowments","description":"Management of long-term institutional endowment funds Module","productId":"JUMO-ALUMNI"},
  {"id":"MOD_ALUM_SCHOLARSHIP_FUND_16","name":"scholarship fund","displayName":"Scholarship Fund","description":"Alumni-funded scholarships for current students Module","productId":"JUMO-ALUMNI"},
  {"id":"MOD_ALUM_REUNIONS_17","name":"reunions","displayName":"Reunions","description":"Coordination of alumni reunion events and gatherings Module","productId":"JUMO-ALUMNI"},
  {"id":"MOD_ALUM_HOMECOMING_PLANNER_18","name":"homecoming","displayName":"Homecoming","description":"Annual homecoming event planning and coordination Module","productId":"JUMO-ALUMNI"},
  {"id":"MOD_ALUM_EVENT_TICKETING_19","name":"ticketing","displayName":"Event Ticketing","description":"Ticketing and access control for alumni events Module","productId":"JUMO-ALUMNI"},
  {"id":"MOD_ALUM_ALUMNI_AWARDS_20","name":"awards","displayName":"Alumni Awards","description":"Recognition of outstanding alumni achievements Module","productId":"JUMO-ALUMNI"},
  {"id":"MOD_ALUM_HALL_OF_FAME_21","name":"hall of fame","displayName":"Hall of Fame","description":"Digital museum of legendary institutional alumni Module","productId":"JUMO-ALUMNI"},
  {"id":"MOD_ALUM_MENTORSHIP_MATCHING_22","name":"mentorship","displayName":"Mentorship Matching","description":"AI-driven matching of mentors and mentees in the network Module","productId":"JUMO-ALUMNI"},
  {"id":"MOD_ALUM_CAREER_COACHING_23","name":"career coaching","displayName":"Career Coaching","description":"Professional development services for recent graduates Module","productId":"JUMO-ALUMNI"},
  {"id":"MOD_ALUM_JOB_BOARD_24","name":"job board","displayName":"Alumni Job Board","description":"Exclusive job listings for the alumni community Module","productId":"JUMO-ALUMNI"},
  {"id":"MOD_ALUM_INTERNSHIPS_25","name":"internships","displayName":"Internships","description":"Placement of current students into alumni-led companies Module","productId":"JUMO-ALUMNI"},
  {"id":"MOD_ALUM_CONTINUING_EDUCATION_26","name":"cont-ed","displayName":"Continuing Education","description":"Lifelong learning opportunities for the alumni network Module","productId":"JUMO-ALUMNI"},
  {"id":"MOD_ALUM_NEWSLETTER_27","name":"newsletter","displayName":"Alumni Newsletter","description":"Regular updates and stories from the alumni community Module","productId":"JUMO-ALUMNI"},
  {"id":"MOD_ALUM_ALUMNI_MAGAZINE_28","name":"magazine","displayName":"Alumni Magazine","description":"Institutional advancement publication for alumni Module","productId":"JUMO-ALUMNI"},
  {"id":"MOD_ALUM_SOCIAL_NETWORK_29","name":"social network","displayName":"Alumni Social Network","description":"Private social platform for alumni interactions Module","productId":"JUMO-ALUMNI"},
  {"id":"MOD_ALUM_INTEREST_GROUPS_30","name":"interest groups","displayName":"SIGs","description":"Special Interest Groups (Professional, Hobby, Sports) Module","productId":"JUMO-ALUMNI"},
  {"id":"MOD_ALUM_CHAPTER_FINANCE_31","name":"chapter finance","displayName":"Chapter Finance","description":"Financial management for regional alumni chapters Module","productId":"JUMO-ALUMNI"},
  {"id":"MOD_ALUM_GRANT_MANAGEMENT_32","name":"grants","displayName":"Advancement Grants","description":"Grants awarded for alumni projects and research Module","productId":"JUMO-ALUMNI"},
  {"id":"MOD_ALUM_CHAPTER_AUDIT_33","name":"chapter audit","displayName":"Chapter Audit","description":"Audit and compliance for regional alumni chapters Module","productId":"JUMO-ALUMNI"},
  {"id":"MOD_ALUM_CONSTITUTIONAL_GOVERNANCE_34","name":"governance","displayName":"Alumni Governance","description":"Constitutional and legal framework for the association Module","productId":"JUMO-ALUMNI"},
  {"id":"MOD_ALUM_BOARD_NOMINATIONS_35","name":"nominations","displayName":"Board Nominations","description":"Selection process for the Alumni Board of Directors Module","productId":"JUMO-ALUMNI"},
  {"id":"MOD_ALUM_ELECTION_PORTAL_36","name":"elections","displayName":"Election Portal","description":"Secure voting system for alumni association elections Module","productId":"JUMO-ALUMNI"},
  {"id":"MOD_ALUM_ALUMNI_ID_CARDS_37","name":"id cards","displayName":"Alumni ID Cards","description":"Issuance of physical and digital alumni identification Module","productId":"JUMO-ALUMNI"},
  {"id":"MOD_ALUM_MEMBER_BENEFITS_38","name":"benefits","displayName":"Member Benefits","description":"Exclusive perks and access for registered alumni Module","productId":"JUMO-ALUMNI"},
  {"id":"MOD_ALUM_PARTNER_DISCOUNTS_39","name":"discounts","displayName":"Partner Discounts","description":"Corporate partnerships offering discounts to alumni Module","productId":"JUMO-ALUMNI"},
  {"id":"MOD_ALUM_TRAVEL_CLUB_40","name":"travel club","displayName":"Travel Club","description":"Group travel opportunities for the alumni community Module","productId":"JUMO-ALUMNI"},
  {"id":"MOD_ALUM_ALUMNI_MERCHANDISE_41","name":"merchandise","displayName":"Merchandise","description":"Institutional branding and alumni-exclusive apparel Module","productId":"JUMO-ALUMNI"},
  {"id":"MOD_ALUM_LEGACY_PROGRAM_42","name":"legacy","displayName":"Legacy Program","description":"Recognition for families with multiple alumni generations Module","productId":"JUMO-ALUMNI"},
  {"id":"MOD_ALUM_FAMILY_NETWORKS_43","name":"family networks","displayName":"Family Networks","description":"Support networks for alumni families and children Module","productId":"JUMO-ALUMNI"},
  {"id":"MOD_ALUM_RESEARCH_COLLABORATION_44","name":"research","displayName":"Research Collab","description":"Connecting alumni researchers with institutional projects Module","productId":"JUMO-ALUMNI"},
  {"id":"MOD_ALUM_INDUSTRY_ADVISORY_45","name":"industry advisory","displayName":"Industry Advisory","description":"Alumni advisory boards for academic curriculum Module","productId":"JUMO-ALUMNI"},
  {"id":"MOD_ALUM_GOVERNMENT_LIAISON_46","name":"government","displayName":"Govt Liaison","description":"Advocacy and government relations for the association Module","productId":"JUMO-ALUMNI"},
  {"id":"MOD_ALUM_PUBLIC_RELATIONS_47","name":"pr","displayName":"Public Relations","description":"Media and PR management for the alumni association Module","productId":"JUMO-ALUMNI"},
  {"id":"MOD_ALUM_ARCHIVES_HISTORY_48","name":"archives","displayName":"Association Archives","description":"Historical records and archival storage for the association Module","productId":"JUMO-ALUMNI"},
  {"id":"MOD_ALUM_MUSEUM_COLLECTIONS_49","name":"museum","displayName":"Alumni Museum","description":"Exhibition and preservation of alumni historical artifacts Module","productId":"JUMO-ALUMNI"},
  {"id":"MOD_ALUM_DIRECTORY_0","name":"alumni directory","displayName":"Alumni Directory","description":"Universal searchable database of all graduated alumni Module","productId":"JUMO-ALUMNI"},
  {"id":"MOD_ALUM_ENDOWMENT_1","name":"endowment donation","displayName":"Endowment & Giving","description":"Institutional advancement & donation tracking Module","productId":"JUMO-ALUMNI"},
  {"id":"MOD_ALUM_MENTORSHIP_2","name":"mentorship matching","displayName":"Mentorship Network","description":"Peer-to-peer mentorship & career coaching Module","productId":"JUMO-ALUMNI"},
  {"id":"MOD_ALUM_EVENTS_3","name":"event ticketing","displayName":"Events & Reunions","description":"Ticketing and coordination for alumni gatherings Module","productId":"JUMO-ALUMNI"},
  {"id":"MOD_PRI_ADMISSIONS_0","name":"admissions","displayName":"Admissions & Enrollment","description":"Nursery & Primary student admissions and registration Module","productId":"JUMO-NURSERY-PRIMARY-ERP"},
  {"id":"MOD_PRI_PUPIL_INFO_1","name":"pupil info","displayName":"Pupil Information System","description":"Primary pupil registry and biographical records Module","productId":"JUMO-NURSERY-PRIMARY-ERP"},
  {"id":"MOD_PRI_PARENT_PORTAL_2","name":"parent portal","displayName":"Parent Portal","description":"Parent access to progress, fees, and attendance Module","productId":"JUMO-NURSERY-PRIMARY-ERP"},
  {"id":"MOD_PRI_ACADEMICS_3","name":"academics","displayName":"Primary Academic Management","description":"Primary school curriculum and academic tracking Module","productId":"JUMO-NURSERY-PRIMARY-ERP"},
  {"id":"MOD_PRI_CURRICULUM_4","name":"curriculum","displayName":"ECD & Thematic Curriculum","description":"Early childhood development & thematic curriculum planning Module","productId":"JUMO-NURSERY-PRIMARY-ERP"},
  {"id":"MOD_PRI_ECD_ACTIVITIES_5","name":"ecd activities","displayName":"ECD Learning Corners","description":"Activity areas and developmental milestones tracking Module","productId":"JUMO-NURSERY-PRIMARY-ERP"},
  {"id":"MOD_PRI_SUBJECTS_6","name":"subjects","displayName":"Primary Subjects","description":"Primary subjects and learning areas management Module","productId":"JUMO-NURSERY-PRIMARY-ERP"},
  {"id":"MOD_PRI_CLASSES_7","name":"classes","displayName":"Classes (Baby to P7)","description":"Nursery and primary classes structure and enrollment Module","productId":"JUMO-NURSERY-PRIMARY-ERP"},
  {"id":"MOD_PRI_STREAMS_8","name":"streams","displayName":"Streams & Cohorts","description":"Class streams and cohort allocations Module","productId":"JUMO-NURSERY-PRIMARY-ERP"},
  {"id":"MOD_PRI_TIMETABLES_9","name":"timetables","displayName":"Primary Timetables","description":"Bell schedules and teacher class timetables Module","productId":"JUMO-NURSERY-PRIMARY-ERP"},
  {"id":"MOD_PRI_ASSESSMENT_10","name":"assessment","displayName":"Continuous Assessment","description":"Weekly quizzes, homework, and continuous assessments Module","productId":"JUMO-NURSERY-PRIMARY-ERP"},
  {"id":"MOD_PRI_EXAMS_11","name":"exams","displayName":"Mid-Term & End-Term Exams","description":"Terminal examination schedules and score entries Module","productId":"JUMO-NURSERY-PRIMARY-ERP"},
  {"id":"MOD_PRI_RESULTS_12","name":"results","displayName":"Progress Report Cards","description":"Termly pupil performance report generation Module","productId":"JUMO-NURSERY-PRIMARY-ERP"},
  {"id":"MOD_PRI_PLE_13","name":"ple center","displayName":"PLE Examination Center","description":"Primary Leaving Examination preparation and candidate registration Module","productId":"JUMO-NURSERY-PRIMARY-ERP"},
  {"id":"MOD_PRI_GRADUATION_14","name":"graduation","displayName":"Nursery Graduation","description":"Top class moving up and primary graduation ceremonies Module","productId":"JUMO-NURSERY-PRIMARY-ERP"},
  {"id":"MOD_PRI_LITERACY_AUDIT_15","name":"literacy audit","displayName":"Literacy & Numeracy Audit","description":"Tracking foundational literacy and numeracy benchmarks Module","productId":"JUMO-NURSERY-PRIMARY-ERP"},
  {"id":"MOD_PRI_E_LEARNING_16","name":"e-learning","displayName":"Interactive E-Learning & Phonics","description":"Digital phonics, games, and interactive learning Module","productId":"JUMO-NURSERY-PRIMARY-ERP"},
  {"id":"MOD_PRI_TEACHER_TRAINING_17","name":"teacher training","displayName":"Teacher CPD & Pedagogy","description":"Continuous professional development for primary educators Module","productId":"JUMO-NURSERY-PRIMARY-ERP"},
  {"id":"MOD_PRI_PTA_CONFERENCES_18","name":"pta conferences","displayName":"Parent-Teacher Conferences","description":"PTA meeting schedules and consultation notes Module","productId":"JUMO-NURSERY-PRIMARY-ERP"},
  {"id":"MOD_PRI_LIBRARY_19","name":"library","displayName":"Children's Library","description":"Storybooks and reading resources catalog Module","productId":"JUMO-NURSERY-PRIMARY-ERP"},
  {"id":"MOD_PRI_BOARDING_20","name":"boarding","displayName":"Boarding & Dormitory Care","description":"Primary boarding section and pastoral care Module","productId":"JUMO-NURSERY-PRIMARY-ERP"},
  {"id":"MOD_PRI_BOYS_DORM_21","name":"boys dorm","displayName":"Boys Dormitory","description":"Boys residential accommodation and hygiene monitoring Module","productId":"JUMO-NURSERY-PRIMARY-ERP"},
  {"id":"MOD_PRI_GIRLS_DORM_22","name":"girls dorm","displayName":"Girls Dormitory","description":"Girls residential accommodation and matron oversight Module","productId":"JUMO-NURSERY-PRIMARY-ERP"},
  {"id":"MOD_PRI_CLINIC_23","name":"clinic","displayName":"School Clinic & Immunization","description":"Child medical history, first aid, and immunizations Module","productId":"JUMO-NURSERY-PRIMARY-ERP"},
  {"id":"MOD_PRI_JUNIOR_LAB_24","name":"junior lab","displayName":"Junior Science Discovery Lab","description":"Hands-on science experiments and nature study Module","productId":"JUMO-NURSERY-PRIMARY-ERP"},
  {"id":"MOD_PRI_PE_GAMES_25","name":"pe games","displayName":"Physical Education & Play","description":"Outdoor games, motor skills, and play activities Module","productId":"JUMO-NURSERY-PRIMARY-ERP"},
  {"id":"MOD_PRI_SPORTS_26","name":"sports","displayName":"Inter-House Sports","description":"Annual sports gala, athletics, and awards Module","productId":"JUMO-NURSERY-PRIMARY-ERP"},
  {"id":"MOD_PRI_CHILD_WELFARE_27","name":"child welfare","displayName":"Child Welfare & Nurture","description":"Pupil well-being, nutrition, and pastoral support Module","productId":"JUMO-NURSERY-PRIMARY-ERP"},
  {"id":"MOD_PRI_COUNSELING_28","name":"counseling","displayName":"Child Guidance & Counseling","description":"Behavioral guidance and child counseling Module","productId":"JUMO-NURSERY-PRIMARY-ERP"},
  {"id":"MOD_PRI_SAFEGUARDING_29","name":"safeguarding","displayName":"Child Safeguarding","description":"Child protection protocols and incident escalation Module","productId":"JUMO-NURSERY-PRIMARY-ERP"},
  {"id":"MOD_PRI_TRANSPORT_30","name":"transport","displayName":"School Bus & Van Fleet","description":"Pupil pickup routes, bus tracking, and drivers Module","productId":"JUMO-NURSERY-PRIMARY-ERP"},
  {"id":"MOD_PRI_SCHOOL_FARM_31","name":"school farm","displayName":"School Garden & Farm","description":"Demonstration garden and agricultural learning Module","productId":"JUMO-NURSERY-PRIMARY-ERP"},
  {"id":"MOD_PRI_KITCHEN_32","name":"kitchen","displayName":"School Kitchen & Meals","description":"Kitchen inventory, food preparation, and menu planning Module","productId":"JUMO-NURSERY-PRIMARY-ERP"},
  {"id":"MOD_PRI_NUTRITION_33","name":"nutrition","displayName":"Nutrition & Dietetics","description":"Balanced diet and allergy management Module","productId":"JUMO-NURSERY-PRIMARY-ERP"},
  {"id":"MOD_PRI_STORES_34","name":"stores","displayName":"School Stores & Supplies","description":"Uniforms, stationery, and learning materials store Module","productId":"JUMO-NURSERY-PRIMARY-ERP"},
  {"id":"MOD_PRI_PROCUREMENT_35","name":"procurement","displayName":"Primary Procurement","description":"School purchasing and vendor requisitions Module","productId":"JUMO-NURSERY-PRIMARY-ERP"},
  {"id":"MOD_PRI_INVENTORY_36","name":"inventory","displayName":"Textbook & Asset Inventory","description":"Textbook tracking and classroom furniture inventory Module","productId":"JUMO-NURSERY-PRIMARY-ERP"},
  {"id":"MOD_PRI_CAMPUS_MAINTENANCE_37","name":"maintenance","displayName":"Campus Maintenance","description":"Facility repairs, playground safety, and cleaning Module","productId":"JUMO-NURSERY-PRIMARY-ERP"},
  {"id":"MOD_PRI_ASSETS_38","name":"assets","displayName":"School Asset Register","description":"Institutional fixed asset ledger Module","productId":"JUMO-NURSERY-PRIMARY-ERP"},
  {"id":"MOD_PRI_SMC_DEVELOPMENT_39","name":"smc development","displayName":"Institutional Development","description":"Strategic expansion and school infrastructure development Module","productId":"JUMO-NURSERY-PRIMARY-ERP"},
  {"id":"MOD_PRI_TEACHING_STAFF_40","name":"teaching staff","displayName":"Teaching Staff Management","description":"Primary teachers registry, assignments, and appraisals Module","productId":"JUMO-NURSERY-PRIMARY-ERP"},
  {"id":"MOD_PRI_RECRUITMENT_41","name":"recruitment","displayName":"Staff Recruitment","description":"Teacher hiring, interviews, and onboarding Module","productId":"JUMO-NURSERY-PRIMARY-ERP"},
  {"id":"MOD_PRI_PAYROLL_42","name":"payroll","displayName":"Staff Payroll","description":"Monthly salary processing and allowances Module","productId":"JUMO-NURSERY-PRIMARY-ERP"},
  {"id":"MOD_PRI_STAFF_WELFARE_43","name":"staff welfare","displayName":"Staff Welfare & SACCO","description":"Teacher welfare fund and savings scheme Module","productId":"JUMO-NURSERY-PRIMARY-ERP"},
  {"id":"MOD_PRI_BURSARY_44","name":"bursary","displayName":"School Bursar & Fees","description":"Student fees invoicing and collection Module","productId":"JUMO-NURSERY-PRIMARY-ERP"},
  {"id":"MOD_PRI_BUDGET_45","name":"budget","displayName":"Operating Budget","description":"Annual school budget and departmental limits Module","productId":"JUMO-NURSERY-PRIMARY-ERP"},
  {"id":"MOD_PRI_VOTE_BOOK_46","name":"vote book","displayName":"Vote Book Control","description":"Budget expenditure tracking and vote commitments Module","productId":"JUMO-NURSERY-PRIMARY-ERP"},
  {"id":"MOD_PRI_CASH_BOOKS_47","name":"cash books","displayName":"Cash Books & Petty Cash","description":"Cash and bank reconciliation accounts Module","productId":"JUMO-NURSERY-PRIMARY-ERP"},
  {"id":"MOD_PRI_ACCOUNTS_PAYABLE_48","name":"accounts payable","displayName":"Accounts Payable","description":"Vendor bills and supplier payments Module","productId":"JUMO-NURSERY-PRIMARY-ERP"},
  {"id":"MOD_PRI_ACCOUNTS_RECEIVABLE_49","name":"accounts receivable","displayName":"Accounts Receivable","description":"Fee arrears and payment receipts tracking Module","productId":"JUMO-NURSERY-PRIMARY-ERP"},
  {"id":"MOD_PRI_GENERAL_LEDGER_50","name":"general ledger","displayName":"Primary General Ledger","description":"Double-entry financial accounting ledger Module","productId":"JUMO-NURSERY-PRIMARY-ERP"},
  {"id":"MOD_PRI_CAPITATION_GRANTS_51","name":"capitation grants","displayName":"Capitation & Subsidies","description":"Government grants and educational subsidies Module","productId":"JUMO-NURSERY-PRIMARY-ERP"},
  {"id":"MOD_PRI_SPONSORS_52","name":"sponsors","displayName":"Sponsor & Donor Management","description":"Scholarship sponsors and donor tracking Module","productId":"JUMO-NURSERY-PRIMARY-ERP"},
  {"id":"MOD_PRI_SMS_BROADCAST_53","name":"sms broadcast","displayName":"SMS Communications","description":"Bulk SMS broadcasts to parents and staff Module","productId":"JUMO-NURSERY-PRIMARY-ERP"},
  {"id":"MOD_PRI_EMERGENCY_SMS_54","name":"emergency sms","displayName":"Emergency Alerts","description":"Rapid parent alerts and weather/safety notifications Module","productId":"JUMO-NURSERY-PRIMARY-ERP"},
  {"id":"MOD_PRI_EMAIL_NOTICES_55","name":"email notices","displayName":"Email Circulars","description":"Formal school newsletters and digital circulars Module","productId":"JUMO-NURSERY-PRIMARY-ERP"},
  {"id":"MOD_PRI_NOTIFICATIONS_56","name":"notifications","displayName":"Push Notifications","description":"Mobile app notifications and portal reminders Module","productId":"JUMO-NURSERY-PRIMARY-ERP"},
  {"id":"MOD_PRI_PUPIL_RECORDS_57","name":"pupil records","displayName":"Pupil Records & Archives","description":"Long-term student transcript and certificate archives Module","productId":"JUMO-NURSERY-PRIMARY-ERP"},
  {"id":"MOD_PRI_REPORTING_58","name":"reporting","displayName":"Termly Reporting","description":"Academic and administrative analytics reports Module","productId":"JUMO-NURSERY-PRIMARY-ERP"},
  {"id":"MOD_PRI_ANALYTICS_59","name":"analytics","displayName":"Performance Analytics","description":"Classroom performance trends and pass rate metrics Module","productId":"JUMO-NURSERY-PRIMARY-ERP"},
  {"id":"MOD_PRI_SMC_GOVERNANCE_60","name":"smc governance","displayName":"SMC Governance","description":"School Management Committee board and minutes Module","productId":"JUMO-NURSERY-PRIMARY-ERP"},
  {"id":"MOD_PRI_AUDIT_61","name":"audit","displayName":"Internal Audit","description":"Financial audit and inventory verification Module","productId":"JUMO-NURSERY-PRIMARY-ERP"},
  {"id":"MOD_PRI_COMPLIANCE_62","name":"compliance","displayName":"Standards & Compliance","description":"Ministry of Education regulatory compliance Module","productId":"JUMO-NURSERY-PRIMARY-ERP"},
  {"id":"MOD_PRI_SECURITY_63","name":"security","displayName":"Campus Security & Gatepass","description":"Gate security, visitor log, and pupil pickup verification Module","productId":"JUMO-NURSERY-PRIMARY-ERP"},
  {"id":"MOD_PRI_CONFIG_64","name":"config","displayName":"System Configuration","description":"Academic terms, grading scales, and school settings Module","productId":"JUMO-NURSERY-PRIMARY-ERP"},
  {"id":"MOD_PRI_EMIS_INTEGRATION_65","name":"emis integration","displayName":"EMIS Integration","description":"National Education Management Information System sync Module","productId":"JUMO-NURSERY-PRIMARY-ERP"},
  {"id":"MOD_SEC_ADMISSIONS_0","name":"admissions","displayName":"Secondary Admissions","description":"O-Level and A-Level student admissions and enrollment Module","productId":"JUMO-SECONDARY-ERP"},
  {"id":"MOD_SEC_STUDENT_INFO_1","name":"student info","displayName":"Student Information System","description":"Secondary student bio-data and academic history Module","productId":"JUMO-SECONDARY-ERP"},
  {"id":"MOD_SEC_PARENT_PORTAL_2","name":"parent portal","displayName":"Parent & Student Portal","description":"Online access to grades, discipline, and fee balances Module","productId":"JUMO-SECONDARY-ERP"},
  {"id":"MOD_SEC_ACADEMICS_3","name":"academics","displayName":"Academic Affairs","description":"Secondary academic administration and curriculum oversight Module","productId":"JUMO-SECONDARY-ERP"},
  {"id":"MOD_SEC_CURRICULUM_4","name":"curriculum","displayName":"O/A-Level Curriculum","description":"National lower and upper secondary curriculum standards Module","productId":"JUMO-SECONDARY-ERP"},
  {"id":"MOD_SEC_COMBINATIONS_5","name":"combinations","displayName":"A-Level Combinations","description":"Sciences, Arts, and vocational subject combinations Module","productId":"JUMO-SECONDARY-ERP"},
  {"id":"MOD_SEC_SUBJECTS_6","name":"subjects","displayName":"Secondary Subjects","description":"Subject department allocations and syllabi Module","productId":"JUMO-SECONDARY-ERP"},
  {"id":"MOD_SEC_CLASSES_7","name":"classes","displayName":"Classes (S1 to S6)","description":"Class register and form room allocations Module","productId":"JUMO-SECONDARY-ERP"},
  {"id":"MOD_SEC_STREAMS_8","name":"streams","displayName":"Streams & Houses","description":"Class streams and house system grouping Module","productId":"JUMO-SECONDARY-ERP"},
  {"id":"MOD_SEC_TIMETABLES_9","name":"timetables","displayName":"Master Timetable","description":"Automated secondary school master timetable Module","productId":"JUMO-SECONDARY-ERP"},
  {"id":"MOD_SEC_ASSESSMENT_10","name":"assessment","displayName":"Continuous Assessment","description":"Coursework, practical marks, and project scores Module","productId":"JUMO-SECONDARY-ERP"},
  {"id":"MOD_SEC_EXAMS_11","name":"exams","displayName":"Terminal & Mock Exams","description":"Internal examinations and mock national exam runs Module","productId":"JUMO-SECONDARY-ERP"},
  {"id":"MOD_SEC_RESULTS_12","name":"results","displayName":"Report Cards & Transcripts","description":"Grading, divisions, and termly academic reports Module","productId":"JUMO-SECONDARY-ERP"},
  {"id":"MOD_SEC_UNEB_13","name":"uneb","displayName":"UNEB Center (UCE & UACE)","description":"National exam candidate registration and index numbering Module","productId":"JUMO-SECONDARY-ERP"},
  {"id":"MOD_SEC_GRADUATION_14","name":"graduation","displayName":"Valedictory & Leavers","description":"Graduation, testimonial issuance, and leavers certificates Module","productId":"JUMO-SECONDARY-ERP"},
  {"id":"MOD_SEC_TRANSCRIPTS_15","name":"transcripts","displayName":"Official Transcripts","description":"Certified secondary school transcripts and records Module","productId":"JUMO-SECONDARY-ERP"},
  {"id":"MOD_SEC_E_LEARNING_16","name":"e-learning","displayName":"Virtual Classrooms & E-Learning","description":"LMS, lesson notes, and online assignments Module","productId":"JUMO-SECONDARY-ERP"},
  {"id":"MOD_SEC_TEACHER_TRAINING_17","name":"teacher training","displayName":"Faculty Pedagogy & CPD","description":"Teacher professional development and instructional coaching Module","productId":"JUMO-SECONDARY-ERP"},
  {"id":"MOD_SEC_CONFERENCES_18","name":"conferences","displayName":"Academic Seminars","description":"Interschool debates, symposiums, and science fairs Module","productId":"JUMO-SECONDARY-ERP"},
  {"id":"MOD_SEC_LIBRARY_19","name":"library","displayName":"Secondary School Library","description":"Textbook cataloging, lending, and digital journals Module","productId":"JUMO-SECONDARY-ERP"},
  {"id":"MOD_SEC_BOARDING_20","name":"boarding","displayName":"Boarding House System","description":"Hostel allocation and residential student welfare Module","productId":"JUMO-SECONDARY-ERP"},
  {"id":"MOD_SEC_BOYS_HOSTEL_21","name":"boys hostel","displayName":"Boys Hostels & Prefects","description":"Boys dormitory management and prefect leadership Module","productId":"JUMO-SECONDARY-ERP"},
  {"id":"MOD_SEC_GIRLS_HOSTEL_22","name":"girls hostel","displayName":"Girls Hostels & Matrons","description":"Girls dormitory management and matron care Module","productId":"JUMO-SECONDARY-ERP"},
  {"id":"MOD_SEC_CLINIC_23","name":"clinic","displayName":"School Sickbay & Clinic","description":"Student healthcare, triage, and medical referrals Module","productId":"JUMO-SECONDARY-ERP"},
  {"id":"MOD_SEC_SCIENCE_LABS_24","name":"science labs","displayName":"Science Laboratories","description":"Physics, Chemistry, and Biology practical labs and apparatus Module","productId":"JUMO-SECONDARY-ERP"},
  {"id":"MOD_SEC_ICT_LABS_25","name":"ict labs","displayName":"ICT & Computer Labs","description":"Computer labs, network access, and software licenses Module","productId":"JUMO-SECONDARY-ERP"},
  {"id":"MOD_SEC_SPORTS_26","name":"sports","displayName":"Athletics & Sports Complex","description":"Football, basketball, athletics, and trophy tracking Module","productId":"JUMO-SECONDARY-ERP"},
  {"id":"MOD_SEC_STUDENT_WELFARE_27","name":"student welfare","displayName":"Student Welfare & Dean","description":"Student affairs, diet, and pastoral care Module","productId":"JUMO-SECONDARY-ERP"},
  {"id":"MOD_SEC_CAREER_GUIDANCE_28","name":"career guidance","displayName":"Career Guidance & University Prep","description":"Higher education counseling, scholarships, and career days Module","productId":"JUMO-SECONDARY-ERP"},
  {"id":"MOD_SEC_DISCIPLINE_29","name":"discipline","displayName":"Disciplinary Committee","description":"Student code of conduct, hearings, and detentions Module","productId":"JUMO-SECONDARY-ERP"},
  {"id":"MOD_SEC_TRANSPORT_30","name":"transport","displayName":"Transport & Fleet Logistics","description":"School buses, field trip logistics, and maintenance Module","productId":"JUMO-SECONDARY-ERP"},
  {"id":"MOD_SEC_SCHOOL_FARM_31","name":"school farm","displayName":"Agricultural Demonstration Farm","description":"School farm production and practical agriculture lessons Module","productId":"JUMO-SECONDARY-ERP"},
  {"id":"MOD_SEC_KITCHEN_32","name":"kitchen","displayName":"Central Kitchen","description":"Food preparation, bulk catering, and hygiene audits Module","productId":"JUMO-SECONDARY-ERP"},
  {"id":"MOD_SEC_MEALS_34","name":"meals","displayName":"Dining Hall & Rations","description":"Meal shifts, dining hall management, and ration logs Module","productId":"JUMO-SECONDARY-ERP"},
  {"id":"MOD_SEC_STORES_35","name":"stores","displayName":"Central Warehousing & Stores","description":"Receiving, storage, and issuance of school supplies Module","productId":"JUMO-SECONDARY-ERP"},
  {"id":"MOD_SEC_PROCUREMENT_36","name":"procurement","displayName":"Procurement & Tender Board","description":"Vendor sourcing, quotations, and contract awards Module","productId":"JUMO-SECONDARY-ERP"},
  {"id":"MOD_SEC_LOGISTICS_37","name":"logistics","displayName":"Supply Chain Logistics","description":"Inventory distribution and logistics management Module","productId":"JUMO-SECONDARY-ERP"},
  {"id":"MOD_SEC_ESTATES_38","name":"estates","displayName":"Estates & Facilities Management","description":"Campus infrastructure, utilities, and building works Module","productId":"JUMO-SECONDARY-ERP"},
  {"id":"MOD_SEC_ASSET_REGISTER_39","name":"asset register","displayName":"Fixed Asset Register","description":"Secondary school property, lab equipment, and valuation Module","productId":"JUMO-SECONDARY-ERP"},
  {"id":"MOD_SEC_BOG_PLANNING_40","name":"bog planning","displayName":"BOG Strategic Planning","description":"Long-term school master plan and institutional goals Module","productId":"JUMO-SECONDARY-ERP"},
  {"id":"MOD_SEC_STAFF_MGMT_41","name":"staff mgmt","displayName":"Staff & Faculty Management","description":"Secondary teachers register, qualifications, and leaves Module","productId":"JUMO-SECONDARY-ERP"},
  {"id":"MOD_SEC_RECRUITMENT_42","name":"recruitment","displayName":"Teacher Recruitment","description":"Staff recruitment, interviews, and background checks Module","productId":"JUMO-SECONDARY-ERP"},
  {"id":"MOD_SEC_PAYROLL_43","name":"payroll","displayName":"Payroll & Statutory Deductions","description":"Salary computations, PAYE, and social security remittances Module","productId":"JUMO-SECONDARY-ERP"},
  {"id":"MOD_SEC_TEACHERS_SACCO_44","name":"teachers sacco","displayName":"Teachers SACCO & Credit","description":"School staff savings and cooperative society Module","productId":"JUMO-SECONDARY-ERP"},
  {"id":"MOD_SEC_BURSARY_45","name":"bursary","displayName":"School Bursar Office","description":"Tuition invoicing, bank pay slips, and fee collection Module","productId":"JUMO-SECONDARY-ERP"},
  {"id":"MOD_SEC_BUDGET_46","name":"budget","displayName":"Annual School Budget","description":"Departmental budget allocations and variance analysis Module","productId":"JUMO-SECONDARY-ERP"},
  {"id":"MOD_SEC_VOTE_BOOK_47","name":"vote book","displayName":"Vote Book & Commitments","description":"Requisition approvals against budget votes Module","productId":"JUMO-SECONDARY-ERP"},
  {"id":"MOD_SEC_CASH_BOOKS_48","name":"cash books","displayName":"Cash Books & Banking","description":"Multi-bank cash book maintenance and reconciliations Module","productId":"JUMO-SECONDARY-ERP"},
  {"id":"MOD_SEC_ACCOUNTS_PAYABLE_49","name":"accounts payable","displayName":"Accounts Payable","description":"Supplier invoices, aging analysis, and payment vouchers Module","productId":"JUMO-SECONDARY-ERP"},
  {"id":"MOD_SEC_ACCOUNTS_RECEIVABLE_50","name":"accounts receivable","displayName":"Accounts Receivable","description":"Student fee ledger and outstanding arrears Module","productId":"JUMO-SECONDARY-ERP"},
  {"id":"MOD_SEC_GENERAL_LEDGER_51","name":"general ledger","displayName":"General Ledger (FAAP)","description":"Double-entry financial accounting and trial balance Module","productId":"JUMO-SECONDARY-ERP"},
  {"id":"MOD_SEC_GRANTS_52","name":"grants","displayName":"USE & Capitation Grants","description":"Government capitation grant allocation and accountability Module","productId":"JUMO-SECONDARY-ERP"},
  {"id":"MOD_SEC_ALUMNI_FUND_53","name":"alumni fund","displayName":"Alumni & PTA Development Fund","description":"Old students association donations and PTA projects Module","productId":"JUMO-SECONDARY-ERP"},
  {"id":"MOD_SEC_COMMUNICATIONS_54","name":"communications","displayName":"Public Relations & Media","description":"School announcements, press releases, and media archive Module","productId":"JUMO-SECONDARY-ERP"},
  {"id":"MOD_SEC_SMS_GATEWAY_55","name":"sms gateway","displayName":"Bulk SMS Gateway","description":"Automated termly results SMS and urgent parent alerts Module","productId":"JUMO-SECONDARY-ERP"},
  {"id":"MOD_SEC_EMAIL_56","name":"email","displayName":"School Email System","description":"Staff domain email accounts and official dispatches Module","productId":"JUMO-SECONDARY-ERP"},
  {"id":"MOD_SEC_NOTIFICATIONS_57","name":"notifications","displayName":"Push Notification Hub","description":"Mobile app reminders for events, dues, and exams Module","productId":"JUMO-SECONDARY-ERP"},
  {"id":"MOD_SEC_DATA_MANAGEMENT_58","name":"data management","displayName":"Data & Statistics Center","description":"Central school statistical data repository Module","productId":"JUMO-SECONDARY-ERP"},
  {"id":"MOD_SEC_REPORTING_59","name":"reporting","displayName":"Institutional Reporting","description":"Academic and financial reports for BOG and Ministry Module","productId":"JUMO-SECONDARY-ERP"},
  {"id":"MOD_SEC_ANALYTICS_60","name":"analytics","displayName":"Predictive Performance Analytics","description":"National exam probability models and subject trends Module","productId":"JUMO-SECONDARY-ERP"},
  {"id":"MOD_SEC_GOVERNANCE_61","name":"governance","displayName":"BOG Governance Secretariat","description":"Board of Governors resolutions, policies, and minutes Module","productId":"JUMO-SECONDARY-ERP"},
  {"id":"MOD_SEC_AUDIT_62","name":"audit","displayName":"Internal Audit & Assurance","description":"Independent financial and operational auditing Module","productId":"JUMO-SECONDARY-ERP"},
  {"id":"MOD_SEC_COMPLIANCE_63","name":"compliance","displayName":"Standards & Quality Assurance","description":"Inspection checklists and Ministry compliance certificates Module","productId":"JUMO-SECONDARY-ERP"},
  {"id":"MOD_SEC_SECURITY_64","name":"security","displayName":"Campus Security & CCTV","description":"Campus perimeter security, CCTV logs, and gate control Module","productId":"JUMO-SECONDARY-ERP"},
  {"id":"MOD_SEC_CONFIGURATION_65","name":"configuration","displayName":"System Configuration","description":"Academic calendar, grading matrix, and permission roles Module","productId":"JUMO-SECONDARY-ERP"},
  {"id":"MOD_SEC_INTEGRATION_66","name":"integration","displayName":"UNEB & National API Integration","description":"Direct UNEB, EMIS, and bank payment switch APIs Module","productId":"JUMO-SECONDARY-ERP"},
];

export const DirectorateRegistry: OrganizationDefinition[] = [
  // Education Directorates (6)
  { id: 'DIR_EDU_ACADEMIC', name: 'Directorate of Academic Affairs', type: 'DIRECTORATE' },
  { id: 'DIR_EDU_FINANCE', name: 'Directorate of Financial Services & Investments', type: 'DIRECTORATE' },
  { id: 'DIR_EDU_STUDENT', name: 'Directorate of Student Affairs & Welfare', type: 'DIRECTORATE' },
  { id: 'DIR_EDU_RESEARCH', name: 'Directorate of Research, Innovation & Graduate Studies', type: 'DIRECTORATE' },
  { id: 'DIR_EDU_ICT', name: 'Directorate of Information & Communication Technology', type: 'DIRECTORATE' },
  { id: 'DIR_EDU_ESTATES', name: 'Directorate of Estates, Infrastructure & Security', type: 'DIRECTORATE' },

  // FAAP Directorates (4)
  { id: 'DIR_FAAP_TREASURY', name: 'Directorate of Sovereign Treasury & Liquidity', type: 'DIRECTORATE' },
  { id: 'DIR_FAAP_ACCOUNTING', name: 'Directorate of Financial Reporting & General Ledger', type: 'DIRECTORATE' },
  { id: 'DIR_FAAP_AUDIT', name: 'Directorate of Internal Audit & Compliance', type: 'DIRECTORATE' },
  { id: 'DIR_FAAP_BUDGET', name: 'Directorate of National & Enterprise Budgeting', type: 'DIRECTORATE' },

  // Digital Pay Directorates (3)
  { id: 'DIR_DP_SWITCH', name: 'Directorate of Payment Switching & Core Routing', type: 'DIRECTORATE' },
  { id: 'DIR_DP_MERCHANT', name: 'Directorate of Merchant Ecosystem & Acquiring', type: 'DIRECTORATE' },
  { id: 'DIR_DP_RISK', name: 'Directorate of Risk, Compliance & Fraud Prevention', type: 'DIRECTORATE' },

  // Church Directorates (3)
  { id: 'DIR_CH_EPISCOPAL', name: 'Directorate of Episcopal Affairs & Doctrine', type: 'DIRECTORATE' },
  { id: 'DIR_CH_MISSION', name: 'Directorate of Missions, Evangelism & Outreach', type: 'DIRECTORATE' },
  { id: 'DIR_CH_FINANCE', name: 'Directorate of Stewardship & Diocesan Finance', type: 'DIRECTORATE' },
  // Alumni Directorates (2)
  { id: 'DIR_ALUM_ADVANCEMENT', name: 'Directorate of Institutional Advancement', type: 'DIRECTORATE' },
  { id: 'DIR_ALUM_GIVING', name: 'Directorate of Alumni Giving & Endowments', type: 'DIRECTORATE' }
];

export const DepartmentRegistry: OrganizationDefinition[] = [
  // Education Departments (12)
  { id: 'DEPT_EDU_ADMISSIONS', name: 'Admissions & Student Records Department', type: 'DEPARTMENT', parentId: 'DIR_EDU_ACADEMIC' },
  { id: 'DEPT_EDU_EXAMS', name: 'Examinations & Assessments Department', type: 'DEPARTMENT', parentId: 'DIR_EDU_ACADEMIC' },
  { id: 'DEPT_EDU_COMPUTING', name: 'Faculty of Computing & Informatics Department', type: 'DEPARTMENT', parentId: 'DIR_EDU_ACADEMIC' },
  { id: 'DEPT_EDU_BUSINESS', name: 'Faculty of Business & Management Department', type: 'DEPARTMENT', parentId: 'DIR_EDU_ACADEMIC' },
  { id: 'DEPT_EDU_BURSARY', name: 'University Bursary & Student Accounts Department', type: 'DEPARTMENT', parentId: 'DIR_EDU_FINANCE' },
  { id: 'DEPT_EDU_HEALTH', name: 'University Health Services Department', type: 'DEPARTMENT', parentId: 'DIR_EDU_STUDENT' },
  { id: 'DEPT_EDU_LIBRARY', name: 'University Library & Information Resources Department', type: 'DEPARTMENT', parentId: 'DIR_EDU_ACADEMIC' },
  { id: 'DEPT_EDU_HOSTELS', name: 'Hostels & Residential Life Department', type: 'DEPARTMENT', parentId: 'DIR_EDU_STUDENT' },
  { id: 'DEPT_EDU_PROCUREMENT', name: 'Procurement & Asset Management Department', type: 'DEPARTMENT', parentId: 'DIR_EDU_FINANCE' },
  { id: 'DEPT_EDU_QA', name: 'Quality Assurance & Accreditation Department', type: 'DEPARTMENT', parentId: 'DIR_EDU_ACADEMIC' },
  { id: 'DEPT_EDU_WELFARE', name: 'Student Welfare & Counseling Department', type: 'DEPARTMENT', parentId: 'DIR_EDU_STUDENT' },
  { id: 'DEPT_EDU_ESTATES', name: 'Estates, Civil Works & Security Department', type: 'DEPARTMENT', parentId: 'DIR_EDU_ESTATES' },

  // FAAP Departments (8)
  { id: 'DEPT_FAAP_GL', name: 'General Journal & Ledger Office', type: 'DEPARTMENT', parentId: 'DIR_FAAP_ACCOUNTING' },
  { id: 'DEPT_FAAP_AP', name: 'Accounts Payable & Disbursements Office', type: 'DEPARTMENT', parentId: 'DIR_FAAP_ACCOUNTING' },
  { id: 'DEPT_FAAP_AR', name: 'Accounts Receivable & Billing Office', type: 'DEPARTMENT', parentId: 'DIR_FAAP_ACCOUNTING' },
  { id: 'DEPT_FAAP_CASH', name: 'Cash Books & Treasury Operations Office', type: 'DEPARTMENT', parentId: 'DIR_FAAP_TREASURY' },
  { id: 'DEPT_FAAP_VOTE', name: 'Vote Book & Expenditure Commitment Office', type: 'DEPARTMENT', parentId: 'DIR_FAAP_BUDGET' },
  { id: 'DEPT_FAAP_ASSETS', name: 'Fixed Assets & Depreciation Accounting Office', type: 'DEPARTMENT', parentId: 'DIR_FAAP_ACCOUNTING' },
  { id: 'DEPT_FAAP_GRANTS', name: 'Grants, Restricted & Donor Funds Office', type: 'DEPARTMENT', parentId: 'DIR_FAAP_TREASURY' },
  { id: 'DEPT_FAAP_TAX', name: 'Tax & Statutory Compliance Office', type: 'DEPARTMENT', parentId: 'DIR_FAAP_AUDIT' },

  // Digital Pay Departments (7)
  { id: 'DEPT_DP_PRN', name: 'PRN Generation & Lifecycle Engine', type: 'DEPARTMENT', parentId: 'DIR_DP_SWITCH' },
  { id: 'DEPT_DP_MOMO', name: 'Mobile Money & Telco Gateway Office', type: 'DEPARTMENT', parentId: 'DIR_DP_SWITCH' },
  { id: 'DEPT_DP_CARDS', name: 'Card Acquiring & 3DS Switch Office', type: 'DEPARTMENT', parentId: 'DIR_DP_SWITCH' },
  { id: 'DEPT_DP_MERCHANT', name: 'Merchant KYC & Onboarding Office', type: 'DEPARTMENT', parentId: 'DIR_DP_MERCHANT' },
  { id: 'DEPT_DP_SETTLE', name: 'Settlement & Split Clearing Office', type: 'DEPARTMENT', parentId: 'DIR_DP_SWITCH' },
  { id: 'DEPT_DP_DISPUTES', name: 'Chargebacks & Dispute Arbitration Office', type: 'DEPARTMENT', parentId: 'DIR_DP_RISK' },
  { id: 'DEPT_DP_FRAUD', name: 'Fraud Monitoring & AML Sentinel Office', type: 'DEPARTMENT', parentId: 'DIR_DP_RISK' },

  // Church Departments (8)
  { id: 'DEPT_CH_CLERGY', name: 'Diocesan Clergy Secretariat', type: 'DEPARTMENT', parentId: 'DIR_CH_EPISCOPAL' },
  { id: 'DEPT_CH_PARISH', name: 'Parish Pastoral Council', type: 'DEPARTMENT', parentId: 'DIR_CH_EPISCOPAL' },
  { id: 'DEPT_CH_TITHES', name: 'Tithes & Offerings Administration', type: 'DEPARTMENT', parentId: 'DIR_CH_FINANCE' },
  { id: 'DEPT_CH_SACRAMENTS', name: 'Sacraments & Baptisms Registry', type: 'DEPARTMENT', parentId: 'DIR_CH_EPISCOPAL' },
  { id: 'DEPT_CH_YOUTH', name: 'Youth & Sunday School Ministry', type: 'DEPARTMENT', parentId: 'DIR_CH_MISSION' },
  { id: 'DEPT_CH_WELFARE', name: 'Welfare & Pastoral Counseling', type: 'DEPARTMENT', parentId: 'DIR_CH_MISSION' },
  { id: 'DEPT_CH_EVENTS', name: 'Events & Convocation Management', type: 'DEPARTMENT', parentId: 'DIR_CH_MISSION' },
  { id: 'DEPT_CH_ASSETS', name: 'Diocesan Property & Facilities', type: 'DEPARTMENT', parentId: 'DIR_CH_FINANCE' },
  // Alumni Departments (4)
  { id: 'DEPT_ALUM_RECORDS', name: 'Alumni Records & Census Department', type: 'DEPARTMENT', parentId: 'DIR_ALUM_ADVANCEMENT' },
  { id: 'DEPT_ALUM_EVENTS', name: 'Reunions & Special Events Department', type: 'DEPARTMENT', parentId: 'DIR_ALUM_ADVANCEMENT' },
  { id: 'DEPT_ALUM_DONATIONS', name: 'Donations & Pledges Department', type: 'DEPARTMENT', parentId: 'DIR_ALUM_GIVING' },
  { id: 'DEPT_ALUM_MENTORSHIP', name: 'Career Services & Mentorship Department', type: 'DEPARTMENT', parentId: 'DIR_ALUM_ADVANCEMENT' }
];

export const OfficeRegistry: OrganizationDefinition[] = [
  // Education Offices (10)
  { id: 'OFF_EDU_VC', name: 'Office of the Vice Chancellor / Principal', type: 'OFFICE', parentId: 'DEPT_EDU_ADMISSIONS' },
  { id: 'OFF_EDU_REGISTRAR', name: 'Office of the Academic Registrar', type: 'OFFICE', parentId: 'DEPT_EDU_ADMISSIONS' },
  { id: 'OFF_EDU_BURSAR', name: 'Office of the University Bursar', type: 'OFFICE', parentId: 'DEPT_EDU_BURSARY' },
  { id: 'OFF_EDU_DEAN', name: 'Office of the Dean of Students', type: 'OFFICE', parentId: 'DEPT_EDU_WELFARE' },
  { id: 'OFF_EDU_CMO', name: 'Office of the Chief Medical Officer', type: 'OFFICE', parentId: 'DEPT_EDU_HEALTH' },
  { id: 'OFF_EDU_LIBRARIAN', name: 'Office of the University Librarian', type: 'OFFICE', parentId: 'DEPT_EDU_LIBRARY' },
  { id: 'OFF_EDU_WARDEN', name: 'Office of the Chief Warden', type: 'OFFICE', parentId: 'DEPT_EDU_HOSTELS' },
  { id: 'OFF_EDU_EXAMS_HEAD', name: 'Office of the Head of Examinations', type: 'OFFICE', parentId: 'DEPT_EDU_EXAMS' },
  { id: 'OFF_EDU_QA_HEAD', name: 'Office of the Quality Assurance Director', type: 'OFFICE', parentId: 'DEPT_EDU_QA' },
  { id: 'OFF_EDU_AUDITOR', name: 'Office of the Chief Internal Auditor', type: 'OFFICE', parentId: 'DEPT_EDU_BURSARY' },

  // FAAP Offices (8)
  { id: 'OFF_FAAP_CONTROLLER', name: 'Office of the Financial Controller', type: 'OFFICE', parentId: 'DEPT_FAAP_GL' },
  { id: 'OFF_FAAP_CHIEF_ACC', name: 'Office of the Chief Accountant', type: 'OFFICE', parentId: 'DEPT_FAAP_GL' },
  { id: 'OFF_FAAP_BUDGET_OFF', name: 'Office of the Senior Budget Officer', type: 'OFFICE', parentId: 'DEPT_FAAP_VOTE' },
  { id: 'OFF_FAAP_VOTE_OFF', name: 'Office of the Vote Book Officer', type: 'OFFICE', parentId: 'DEPT_FAAP_VOTE' },
  { id: 'OFF_FAAP_TREASURER', name: 'Office of the Treasury Manager', type: 'OFFICE', parentId: 'DEPT_FAAP_CASH' },
  { id: 'OFF_FAAP_ASSETS_CUST', name: 'Office of the Fixed Assets Custodian', type: 'OFFICE', parentId: 'DEPT_FAAP_ASSETS' },
  { id: 'OFF_FAAP_AUDIT_DIR', name: 'Office of the Internal Audit Director', type: 'OFFICE', parentId: 'DEPT_FAAP_TAX' },
  { id: 'OFF_FAAP_TAX_OFF', name: 'Office of the Tax Compliance Officer', type: 'OFFICE', parentId: 'DEPT_FAAP_TAX' },

  // Digital Pay Offices (6)
  { id: 'OFF_DP_OPS_LEAD', name: 'Office of Payment Operations Lead', type: 'OFFICE', parentId: 'DEPT_DP_PRN' },
  { id: 'OFF_DP_SETTLE_LEAD', name: 'Office of Chief Settlement Officer', type: 'OFFICE', parentId: 'DEPT_DP_SETTLE' },
  { id: 'OFF_DP_MERCHANT_LEAD', name: 'Office of Merchant Acquiring Head', type: 'OFFICE', parentId: 'DEPT_DP_MERCHANT' },
  { id: 'OFF_DP_RISK_LEAD', name: 'Office of Risk & Fraud Lead', type: 'OFFICE', parentId: 'DEPT_DP_FRAUD' },
  { id: 'OFF_DP_DEV_LEAD', name: 'Office of Developer Relations & API Gateway', type: 'OFFICE', parentId: 'DEPT_DP_PRN' },
  { id: 'OFF_DP_DISPUTE_LEAD', name: 'Office of Customer Dispute Arbitrator', type: 'OFFICE', parentId: 'DEPT_DP_DISPUTES' },

  // Church Offices (7)
  { id: 'OFF_CH_BISHOP', name: 'Office of the Diocesan Bishop', type: 'OFFICE', parentId: 'DEPT_CH_CLERGY' },
  { id: 'OFF_CH_CHANCELLOR', name: 'Office of the Diocesan Chancellor', type: 'OFFICE', parentId: 'DEPT_CH_CLERGY' },
  { id: 'OFF_CH_SECRETARY', name: 'Office of the Diocesan Secretary', type: 'OFFICE', parentId: 'DEPT_CH_CLERGY' },
  { id: 'OFF_CH_TREASURER', name: 'Office of the Diocesan Treasurer', type: 'OFFICE', parentId: 'DEPT_CH_TITHES' },
  { id: 'OFF_CH_VICAR', name: 'Office of the Parish Priest / Vicar', type: 'OFFICE', parentId: 'DEPT_CH_PARISH' },
  { id: 'OFF_CH_PASTORAL_CARE', name: 'Office of the Pastoral Care Coordinator', type: 'OFFICE', parentId: 'DEPT_CH_WELFARE' },
  { id: 'OFF_CH_SYNOD_BOARD', name: 'Office of the Diocesan Synod Board', type: 'OFFICE', parentId: 'DEPT_CH_CLERGY' },
  // Alumni Offices (6)
  { id: 'OFF_ALUM_DIRECTOR', name: 'Office of the Alumni Director', type: 'OFFICE', parentId: 'DEPT_ALUM_RECORDS' },
  { id: 'OFF_ALUM_REGISTRAR', name: 'Office of the Alumni Registrar', type: 'OFFICE', parentId: 'DEPT_ALUM_RECORDS' },
  { id: 'OFF_ALUM_GIVING_HEAD', name: 'Office of the Head of Giving', type: 'OFFICE', parentId: 'DEPT_ALUM_DONATIONS' },
  { id: 'OFF_ALUM_EVENT_COORD', name: 'Office of the Events Coordinator', type: 'OFFICE', parentId: 'DEPT_ALUM_EVENTS' },
  { id: 'OFF_ALUM_MENTOR_LEAD', name: 'Office of the Mentorship Lead', type: 'OFFICE', parentId: 'DEPT_ALUM_MENTORSHIP' },
  { id: 'OFF_ALUM_TRUSTEE', name: 'Office of the Endowment Trustee', type: 'OFFICE', parentId: 'DEPT_ALUM_DONATIONS' },
  
  // Nursery & Primary Offices
  { id: 'OFF_NP_HEAD', name: 'Office of the Headteacher (Nursery/Primary)', type: 'OFFICE', parentId: 'DIR_NP_GOVERNANCE' },
  { id: 'OFF_PRI_HEAD', name: 'Office of the Primary Headteacher', type: 'OFFICE', parentId: 'DIR_NP_GOVERNANCE' },
  { id: 'OFF_PRI_DOS', name: 'Director of Studies (Primary)', type: 'OFFICE', parentId: 'DIR_NP_ACADEMICS' },
  { id: 'OFF_PRI_BURSAR', name: 'Office of the School Bursar (Primary)', type: 'OFFICE', parentId: 'DIR_NP_FINANCE' },
  { id: 'OFF_PRI_ADMISSION', name: 'Office of Admissions (Primary)', type: 'OFFICE', parentId: 'DIR_NP_OPERATIONS' },
  { id: 'OFF_NUR_HEAD', name: 'Head of Nursery Section', type: 'OFFICE', parentId: 'DIR_NP_GOVERNANCE' },
  
  // Secondary Offices
  { id: 'OFF_SEC_PRINCIPAL', name: 'Office of the School Principal', type: 'OFFICE', parentId: 'DIR_SEC_GOVERNANCE' },
  { id: 'OFF_SEC_REGISTRAR', name: 'Office of the Secondary Registrar', type: 'OFFICE', parentId: 'DIR_SEC_REGISTRAR' },
  { id: 'OFF_SEC_BURSAR', name: 'Office of the Secondary Bursar', type: 'OFFICE', parentId: 'DIR_SEC_FINANCE' },
  { id: 'OFF_SEC_DOS', name: 'Director of Studies (Secondary)', type: 'OFFICE', parentId: 'DIR_SEC_ACADEMICS' }
];

export const WorkflowRegistry: WorkflowDefinition[] = [
  // Education Workflows (7)
  { id: 'WF_EDU_ADMISSIONS', name: 'Student Admissions Workflow', displayName: 'Admissions', description: 'Application -> Validation -> Review -> Approval -> Offer -> Acceptance -> Enrollment', states: ['APPLICATION', 'VALIDATION', 'REVIEW', 'APPROVAL', 'OFFER', 'ACCEPTANCE', 'ENROLLMENT'], initialState: 'APPLICATION', formFields: [] },
  { id: 'WF_EDU_RESULTS', name: 'Examinations Results Workflow', displayName: 'Results', description: 'Marks entry -> validation -> moderation -> board approval -> publication -> transcript', states: ['ENTRY', 'VALIDATION', 'MODERATION', 'BOARD_APPROVAL', 'PUBLICATION', 'TRANSCRIPT'], initialState: 'ENTRY', formFields: [] },
  { id: 'WF_EDU_GRADUATION', name: 'Graduation Clearance Workflow', displayName: 'Graduation Clearance', description: 'Academic Clearance -> Financial Clearance -> Library Clearance -> Senate Approval -> Award Conferment', states: ['ACADEMIC_AUDIT', 'BURSARY_CLEARANCE', 'LIBRARY_CLEARANCE', 'SENATE_APPROVAL', 'AWARD_CONFERRED'], initialState: 'ACADEMIC_AUDIT', formFields: [] },
  { id: 'WF_EDU_HOSTEL_ALLOCATION', name: 'Hostel Room Allocation Workflow', displayName: 'Hostel Allocation', description: 'Application -> Eligibility Check -> Room Assignment -> Key Issuance -> Check-In', states: ['APPLICATION', 'ELIGIBILITY_CHECK', 'ROOM_ASSIGNED', 'INVOICE_GENERATED', 'CHECKED_IN'], initialState: 'APPLICATION', formFields: [] },
  { id: 'WF_EDU_CURRICULUM_REVIEW', name: 'Curriculum & Course Approval Workflow', displayName: 'Curriculum Approval', description: 'Drafting -> Department Review -> Faculty Board -> Senate Accreditation', states: ['DRAFT', 'DEPARTMENT_REVIEW', 'FACULTY_APPROVAL', 'SENATE_ACCREDITATION'], initialState: 'DRAFT', formFields: [] },
  { id: 'WF_EDU_LEAVE_REQUEST', name: 'Staff Leave Approval Workflow', displayName: 'Staff Leave', description: 'Request -> HoD Recommendation -> Dean Endorsement -> HR Approval', states: ['REQUESTED', 'HOD_REVIEW', 'DEAN_ENDORSED', 'HR_APPROVED'], initialState: 'REQUESTED', formFields: [] },
  { id: 'WF_EDU_DISCIPLINARY', name: 'Student Disciplinary Hearing Workflow', displayName: 'Disciplinary Hearing', description: 'Incident Report -> Dean Review -> Committee Hearing -> Verdict & Sanction', states: ['REPORTED', 'DEAN_INVESTIGATION', 'COMMITTEE_HEARING', 'VERDICT_ISSUED'], initialState: 'REPORTED', formFields: [] },

  // FAAP Workflows (7)
  { id: 'WF_FAAP_VOTE_BOOK', name: 'Vote Book Commitment Workflow', displayName: 'Vote Book', description: 'Request -> vote validation -> commitment -> approval -> expenditure -> reconciliation', states: ['REQUEST', 'VOTE_VALIDATION', 'COMMITMENT', 'APPROVAL', 'EXPENDITURE', 'RECONCILIATION'], initialState: 'REQUEST', formFields: [] },
  { id: 'WF_FAAP_PROCUREMENT', name: 'Procurement & Purchase Order Workflow', displayName: 'Procurement', description: 'Requisition -> budget check -> approval -> sourcing -> purchase order -> receipt -> invoice -> payment', states: ['REQUISITION', 'BUDGET_CHECK', 'APPROVAL', 'SOURCING', 'PURCHASE_ORDER', 'RECEIPT', 'INVOICE', 'PAYMENT'], initialState: 'REQUISITION', formFields: [] },
  { id: 'WF_FAAP_JOURNAL_APPROVAL', name: 'General Journal Maker-Checker Workflow', displayName: 'Journal Approval', description: 'Draft Journal -> Reviewer Audit -> Controller Sign-off -> Ledger Posting', states: ['DRAFT', 'AUDIT_REVIEW', 'CONTROLLER_APPROVAL', 'POSTED_TO_GL'], initialState: 'DRAFT', formFields: [] },
  { id: 'WF_FAAP_BANK_RECONCILIATION', name: 'Bank Reconciliation Sign-off Workflow', displayName: 'Bank Reconciliation', description: 'Feed Import -> Auto Match -> Discrepancy Adjustment -> Auditor Sign-off', states: ['FEED_LOADED', 'AUTO_MATCHED', 'ADJUSTMENT_POSTED', 'AUDITOR_SIGNED'], initialState: 'FEED_LOADED', formFields: [] },
  { id: 'WF_FAAP_YEAR_END_CLOSE', name: 'Fiscal Period Year-End Close Workflow', displayName: 'Year-End Close', description: 'Sub-ledger Close -> Trial Balance Audit -> Retained Earnings Roll -> Period Lock', states: ['SUBLEDGER_LOCK', 'TRIAL_BALANCE_AUDIT', 'EARNINGS_ROLLED', 'PERIOD_CLOSED'], initialState: 'SUBLEDGER_LOCK', formFields: [] },
  { id: 'WF_FAAP_ASSET_DEPRECIATION', name: 'Fixed Asset Depreciation Schedule', displayName: 'Asset Depreciation', description: 'Valuation -> Depreciation Run -> Journal Posting -> Fixed Asset Register Update', states: ['VALUATION_AUDIT', 'DEPRECIATION_CALCULATED', 'JOURNAL_POSTED', 'REGISTER_UPDATED'], initialState: 'VALUATION_AUDIT', formFields: [] },
  { id: 'WF_FAAP_GRANT_ALLOCATION', name: 'Restricted Grant Fund Allocation', displayName: 'Grant Allocation', description: 'Award Notice -> Budget Setup -> Tranche Drawdown -> Expense Verification -> Audit Report', states: ['AWARD_NOTIFIED', 'BUDGET_ALLOCATED', 'TRANCHE_DISBURSED', 'EXPENSE_AUDITED'], initialState: 'AWARD_NOTIFIED', formFields: [] },

  // Digital Pay Workflows (5)
  { id: 'WF_DP_MERCHANT_ONBOARDING', name: 'Merchant Onboarding & KYC Workflow', displayName: 'Merchant Onboarding', description: 'Registration -> KYC -> Approval -> Activation', states: ['REGISTRATION', 'KYC', 'APPROVAL', 'ACTIVATION'], initialState: 'REGISTRATION', formFields: [] },
  { id: 'WF_DP_PRN_SETTLEMENT', name: 'PRN Real-Time Settlement Workflow', displayName: 'PRN Settlement', description: 'Payment Intent -> PRN Generated -> Payer Checkout -> Telco Switch -> Split Settlement', states: ['INTENT_CREATED', 'PRN_ISSUED', 'PAYMENT_CAPTURED', 'SWITCH_CLEARED', 'SPLIT_SETTLED'], initialState: 'INTENT_CREATED', formFields: [] },
  { id: 'WF_DP_CHARGEBACK_DISPUTE', name: 'Chargeback Dispute Resolution Workflow', displayName: 'Chargeback Dispute', description: 'Dispute Raised -> Evidence Upload -> Arbitrator Review -> Chargeback Decision', states: ['DISPUTE_OPENED', 'EVIDENCE_SUBMITTED', 'ARBITRATION_REVIEW', 'DECISION_FINALIZED'], initialState: 'DISPUTE_OPENED', formFields: [] },
  { id: 'WF_DP_FRAUD_HOLD', name: 'Fraud Risk Hold & Release Workflow', displayName: 'Fraud Hold', description: 'Flagged by Sentinel -> Suspended -> Compliance Review -> Released / Seized', states: ['SENTINEL_FLAGGED', 'HOLD_APPLIED', 'COMPLIANCE_INVESTIGATION', 'FUNDS_RELEASED'], initialState: 'SENTINEL_FLAGGED', formFields: [] },
  { id: 'WF_DP_SPLIT_PAYOUT', name: 'Automated Commission Split Payout', displayName: 'Split Payout', description: 'Gross Collected -> 1.5% Fee Withheld -> Merchant Balance Credited -> Bank Sweep', states: ['GROSS_CAPTURED', 'FEE_DEDUCTED', 'MERCHANT_CREDITED', 'BANK_SWEEP_EXECUTED'], initialState: 'GROSS_CAPTURED', formFields: [] },

  // Church Workflows (5)
  { id: 'WF_CH_MEMBER_REGISTRATION', name: 'Church Member Registration Workflow', displayName: 'Member Registration', description: 'Registration -> Verification -> Pastoral Approval', states: ['REGISTRATION', 'VERIFICATION', 'APPROVAL'], initialState: 'REGISTRATION', formFields: [] },
  { id: 'WF_CH_TITHE_ALLOCATION', name: 'Diocesan Tithe Remittance Workflow', displayName: 'Tithe Remittance', description: 'Parish Collection -> Diocesan Quota Deduction -> FAAP Master Sweep -> Bishop Sign-off', states: ['PARISH_RECORDED', 'DIOCESAN_SPLIT', 'SWEEP_POSTED', 'BISHOP_CONFIRMED'], initialState: 'PARISH_RECORDED', formFields: [] },
  { id: 'WF_CH_PASTORAL_CARE', name: 'Pastoral Counseling & Care Intake', displayName: 'Pastoral Care', description: 'Counseling Request -> Clergy Assigned -> Session Logged -> Case Resolution', states: ['REQUEST_RECEIVED', 'CLERGY_ASSIGNED', 'SESSION_CONDUCTED', 'CASE_RESOLVED'], initialState: 'REQUEST_RECEIVED', formFields: [] },
  { id: 'WF_CH_DIOCESAN_GRANT', name: 'Parish Development Grant Workflow', displayName: 'Diocesan Grant', description: 'Proposal -> Deanery Review -> Diocesan Council -> Disbursed', states: ['PROPOSAL_SUBMITTED', 'DEANERY_REVIEW', 'COUNCIL_APPROVED', 'GRANT_DISBURSED'], initialState: 'PROPOSAL_SUBMITTED', formFields: [] },
  { id: 'WF_CH_SACRAMENT_RECORD', name: 'Sacraments & Baptism Verification', displayName: 'Sacrament Verification', description: 'Record Entry -> Parish Register Match -> Clergy Seal -> Certificate Issued', states: ['ENTRY_MADE', 'REGISTER_CROSSMATCHED', 'SEAL_AFFIXED', 'CERTIFICATE_ISSUED'], initialState: 'ENTRY_MADE', formFields: [] },
  // Alumni Workflows (3)
  { id: 'WF_ALUM_MEMBERSHIP', name: 'Alumni Membership Enrollment', displayName: 'Alumni Enrollment', description: 'Graduation Data -> Portal Invitation -> Profile Update -> Membership Activation', states: ['GRADUATION_VERIFIED', 'INVITATION_SENT', 'PROFILE_UPDATED', 'ACTIVE_MEMBER'], initialState: 'GRADUATION_VERIFIED', formFields: [] },
  { id: 'WF_ALUM_DONATION', name: 'Endowment Donation Workflow', displayName: 'Donation Pipeline', description: 'Pledge -> Payment -> Verification -> Tax Receipt -> Impact Report', states: ['PLEDGE_MADE', 'PAYMENT_RECEIVED', 'VERIFIED', 'RECEIPTED', 'REPORTED'], initialState: 'PLEDGE_MADE', formFields: [] },
  { id: 'WF_ALUM_MENTORSHIP', name: 'Mentorship Pairing Workflow', displayName: 'Mentorship Pairing', description: 'Application -> Matching -> Connection -> Kick-off -> Follow-up', states: ['APPLICATION', 'MATCHING', 'CONNECTED', 'KICKOFF', 'FOLLOWUP'], initialState: 'APPLICATION', formFields: [] }
];

export const FormRegistry: (FormDefinition & { fields: any[] })[] = [
  // Education Forms (6)
  { id: 'FORM_EDU_ADMISSION_001', name: 'Student Admission Application', moduleId: 'MOD_EDU_ADMISSIONS_0', fields: [
      { id: 'f1', type: 'text', label: 'Full Legal Name', required: true },
      { id: 'f2', type: 'date', label: 'Date of Birth', required: true },
      { id: 'f3', type: 'email', label: 'Parent Email', required: true },
      { id: 'f4', type: 'select', label: 'Program Selection', options: ['Pre-Primary', 'Primary', 'Secondary', 'University', 'Vocational'], required: true }
  ]},
  { id: 'FORM_EDU_COURSE_REG_001', name: 'Semester Course Registration', moduleId: 'MOD_EDU_COURSES_5', fields: [
      { id: 'f1', type: 'text', label: 'Student ID Number', required: true },
      { id: 'f2', type: 'select', label: 'Academic Semester', options: ['Year 1 Sem 1', 'Year 1 Sem 2', 'Year 2 Sem 1', 'Year 2 Sem 2', 'Year 3 Sem 1'], required: true },
      { id: 'f3', type: 'select', label: 'Primary Course Unit', options: ['CS101 Intro to Computer Science', 'BA201 Corporate Finance', 'ENG102 Calculus & Algebra'], required: true }
  ]},
  { id: 'FORM_EDU_EXAM_SCORE_001', name: 'Continuous Assessment Score Entry', moduleId: 'MOD_EDU_RESULTS_MANAGEMENT_12', fields: [
      { id: 'f1', type: 'text', label: 'Course Unit Code', required: true },
      { id: 'f2', type: 'text', label: 'Student Registration Number', required: true },
      { id: 'f3', type: 'number', label: 'Coursework Score (out of 30)', required: true },
      { id: 'f4', type: 'number', label: 'Final Exam Score (out of 70)', required: true }
  ]},
  { id: 'FORM_EDU_CLINIC_INTAKE_001', name: 'Student Clinical Consultation Intake', moduleId: 'MOD_EDU_HEALTH_CLINIC_23', fields: [
      { id: 'f1', type: 'text', label: 'Student ID', required: true },
      { id: 'f2', type: 'text', label: 'Presenting Symptoms', required: true },
      { id: 'f3', type: 'text', label: 'Clinical Diagnosis', required: true },
      { id: 'f4', type: 'text', label: 'Prescribed Medication', required: true }
  ]},
  { id: 'FORM_EDU_HOSTEL_BOOKING_001', name: 'Hostel Room Allocation Request', moduleId: 'MOD_EDU_HOSTEL_MANAGEMENT_20', fields: [
      { id: 'f1', type: 'text', label: 'Student Reg Number', required: true },
      { id: 'f2', type: 'select', label: 'Hostel Preference', options: ['Alpha North Block (Boys)', 'Alpha South Block (Girls)', 'Executive Postgraduate Wing'], required: true },
      { id: 'f3', type: 'select', label: 'Room Occupancy Type', options: ['Single Room', 'Double Shared', 'Quad Room'], required: true }
  ]},
  { id: 'FORM_EDU_VOTE_BOOK_REQ_001', name: 'Institutional Department Vote Book Requisition', moduleId: 'MOD_EDU_VOTE_BOOK_46', fields: [
      { id: 'f1', type: 'select', label: 'Vote Code', options: ['VOTE-001 (Faculty Lab Equipment)', 'VOTE-002 (Staff Travel)', 'VOTE-003 (Library Subscriptions)'], required: true },
      { id: 'f2', type: 'number', label: 'Requisition Amount (UGX)', required: true },
      { id: 'f3', type: 'text', label: 'Expenditure Purpose & Justification', required: true }
  ]},

  // FAAP Forms (6)
  { id: 'FORM_FAAP_JOURNAL_001', name: 'General Journal Entry', moduleId: 'MOD_FAAP_GENERAL_LEDGER_1', fields: [
      { id: 'f1', type: 'select', label: 'Debit Account', options: ['1000 - Cash & Equivalents', '1200 - Accounts Receivable', '5000 - Operating Expenses'], required: true },
      { id: 'f2', type: 'number', label: 'Debit Amount', required: true },
      { id: 'f3', type: 'select', label: 'Credit Account', options: ['1000 - Cash & Equivalents', '2000 - Accounts Payable', '4000 - Revenue'], required: true },
      { id: 'f4', type: 'number', label: 'Credit Amount', required: true },
      { id: 'f5', type: 'text', label: 'Memo / Journal Reference', required: true }
  ]},
  { id: 'FORM_FAAP_VENDOR_INVOICE_001', name: 'Accounts Payable Vendor Invoice Voucher', moduleId: 'MOD_FAAP_ACCOUNTS_PAYABLE_3', fields: [
      { id: 'f1', type: 'text', label: 'Vendor Name', required: true },
      { id: 'f2', type: 'text', label: 'Vendor Tax PIN', required: true },
      { id: 'f3', type: 'number', label: 'Invoice Gross Total', required: true },
      { id: 'f4', type: 'date', label: 'Payment Due Date', required: true }
  ]},
  { id: 'FORM_FAAP_PAYMENT_REQ_001', name: 'Treasury Disbursement Voucher', moduleId: 'MOD_FAAP_TREASURY_19', fields: [
      { id: 'f1', type: 'select', label: 'Disbursement Bank Account', options: ['Stanbic Master Operating 001', 'Standard Chartered Liquidity 002', 'Centenary Revenue Collection 003'], required: true },
      { id: 'f2', type: 'text', label: 'Beneficiary Name & IBAN', required: true },
      { id: 'f3', type: 'number', label: 'Payment Sum', required: true }
  ]},
  { id: 'FORM_FAAP_BUDGET_APPROP_001', name: 'Fiscal Year Budget Appropriation Schedule', moduleId: 'MOD_FAAP_BUDGETING_11', fields: [
      { id: 'f1', type: 'text', label: 'Cost Centre / Directorate Code', required: true },
      { id: 'f2', type: 'number', label: 'Approved Annual Ceiling (UGX)', required: true },
      { id: 'f3', type: 'select', label: 'Fiscal Year', options: ['FY 2025/2026', 'FY 2026/2027', 'FY 2027/2028'], required: true }
  ]},
  { id: 'FORM_FAAP_FIXED_ASSET_001', name: 'Fixed Asset Capitalization Register', moduleId: 'MOD_FAAP_FIXED_ASSETS_20', fields: [
      { id: 'f1', type: 'text', label: 'Asset Tag Number', required: true },
      { id: 'f2', type: 'text', label: 'Asset Description', required: true },
      { id: 'f3', type: 'number', label: 'Historical Purchase Cost', required: true },
      { id: 'f4', type: 'number', label: 'Useful Life (Years)', required: true }
  ]},
  { id: 'FORM_FAAP_TAX_SCHEDULE_001', name: 'Statutory VAT & Withholding Return', moduleId: 'MOD_FAAP_TAX_29', fields: [
      { id: 'f1', type: 'select', label: 'Tax Category', options: ['VAT (18%)', 'WHT (6%)', 'PAYE (Employment Tax)'], required: true },
      { id: 'f2', type: 'number', label: 'Taxable Base Amount', required: true },
      { id: 'f3', type: 'number', label: 'Calculated Tax Liability', required: true }
  ]},

  // Digital Pay Forms (5)
  { id: 'FORM_DP_MERCHANT_001', name: 'Merchant Registration & KYC Form', moduleId: 'MOD_DP_MERCHANT_ONBOARDING_9', fields: [
      { id: 'f1', type: 'text', label: 'Business Name', required: true },
      { id: 'f2', type: 'text', label: 'Tax ID / TIN', required: true },
      { id: 'f3', type: 'select', label: 'Business Type', options: ['Sole Proprietor', 'LLC', 'Corporation', 'Educational Institution', 'Religious Non-Profit'], required: true },
      { id: 'f4', type: 'text', label: 'Settlement Bank Account', required: true }
  ]},
  { id: 'FORM_DP_PAYMENT_INTENT_001', name: 'Payment Intent & PRN Generator Form', moduleId: 'MOD_DP_PAYMENT_INTENTS_0', fields: [
      { id: 'f1', type: 'text', label: 'Payer Reference / Student ID', required: true },
      { id: 'f2', type: 'number', label: 'Amount Payable (UGX)', required: true },
      { id: 'f3', type: 'select', label: 'Payment Channel', options: ['MTN Mobile Money', 'Airtel Money', 'Visa/Mastercard', 'Bank Counter PRN'], required: true }
  ]},
  { id: 'FORM_DP_DISPUTE_001', name: 'Payment Dispute & Chargeback Claim', moduleId: 'MOD_DP_DISPUTES_19', fields: [
      { id: 'f1', type: 'text', label: 'Transaction Reference / PRN', required: true },
      { id: 'f2', type: 'select', label: 'Dispute Reason', options: ['Duplicate Debit', 'Service Not Rendered', 'Unauthorized Transaction'], required: true },
      { id: 'f3', type: 'text', label: 'Dispute Explanation', required: true }
  ]},
  { id: 'FORM_DP_API_KEY_001', name: 'Developer API Credentials Generator', moduleId: 'MOD_DP_API_MANAGEMENT_22', fields: [
      { id: 'f1', type: 'text', label: 'Application Name', required: true },
      { id: 'f2', type: 'select', label: 'Environment', options: ['Sandbox / Testnet', 'Production Live'], required: true },
      { id: 'f3', type: 'text', label: 'Webhook Callback URL', required: true }
  ]},
  { id: 'FORM_DP_SETTLE_CONFIG_001', name: 'Automated Commission Split Configuration', moduleId: 'MOD_DP_SPLIT_PAYMENTS_16', fields: [
      { id: 'f1', type: 'text', label: 'Merchant Account ID', required: true },
      { id: 'f2', type: 'number', label: 'Platform Clearing Fee % (Default 1.5%)', required: true },
      { id: 'f3', type: 'text', label: 'Master Treasury Routing Code', required: true }
  ]},

  // Church Forms (5)
  { id: 'FORM_CH_MEMBER_001', name: 'Church Member Registration', moduleId: 'MOD_CH_CHURCH_MEMBERSHIP_0', fields: [
      { id: 'f1', type: 'text', label: 'Full Legal Name', required: true },
      { id: 'f2', type: 'tel', label: 'Phone Number', required: true },
      { id: 'f3', type: 'select', label: 'Congregation / Parish', options: ['St. Paul Cathedral', 'St. Peters Parish', 'Grace Community Church'], required: true },
      { id: 'f4', type: 'date', label: 'Date of Baptism', required: false }
  ]},
  { id: 'FORM_CH_TITHE_ENTRY_001', name: 'Tithe & Special Offering Ledger Form', moduleId: 'MOD_CH_TITHES_18', fields: [
      { id: 'f1', type: 'text', label: 'Member Envelope / ID Number', required: true },
      { id: 'f2', type: 'select', label: 'Offering Type', options: ['Monthly Tithe', 'Building Fund Pledge', 'Missionary Outreach Offering', 'Thanksgiving'], required: true },
      { id: 'f3', type: 'number', label: 'Amount (UGX)', required: true }
  ]},
  { id: 'FORM_CH_PASTORAL_CARE_001', name: 'Pastoral Counseling & Home Visit Intake', moduleId: 'MOD_CH_PASTORAL_CARE_41', fields: [
      { id: 'f1', type: 'text', label: 'Member Name', required: true },
      { id: 'f2', type: 'select', label: 'Ministry Need', options: ['Bereavement & Grief', 'Pre-Marital Counseling', 'Hospital Visitation', 'Spiritual Guidance'], required: true },
      { id: 'f3', type: 'text', label: 'Confidential Notes & Prayer Points', required: true }
  ]},
  { id: 'FORM_CH_SACRAMENT_001', name: 'Baptism & Confirmation Registry Form', moduleId: 'MOD_CH_SACRAMENTS_ORDINANCES_43', fields: [
      { id: 'f1', type: 'text', label: 'Candidate Full Name', required: true },
      { id: 'f2', type: 'text', label: 'Godparents / Sponsors Names', required: true },
      { id: 'f3', type: 'text', label: 'Officiating Minister / Priest', required: true },
      { id: 'f4', type: 'date', label: 'Sacrament Date', required: true }
  ]},
  { id: 'FORM_CH_GRANT_APP_001', name: 'Parish Development Project Grant Application', moduleId: 'MOD_CH_FUNDRAISING_21', fields: [
      { id: 'f1', type: 'text', label: 'Parish Name', required: true },
      { id: 'f2', type: 'text', label: 'Project Title', required: true },
      { id: 'f3', type: 'number', label: 'Requested Diocesan Grant Sum (UGX)', required: true },
      { id: 'f4', type: 'text', label: 'Project Expected Impact', required: true }
  ]}
];

export const ReportRegistry: ReportDefinition[] = [
  // Education Reports (6)
  { id: 'REP_EDU_ENROLLMENT_LEDGER', name: 'Student Enrollment & Demographics Ledger', moduleId: 'MOD_EDU_REPORTING_58' },
  { id: 'REP_EDU_SEMESTER_RESULTS', name: 'Semester Examinations Results Sheet', moduleId: 'MOD_EDU_RESULTS_MANAGEMENT_12' },
  { id: 'REP_EDU_FEES_COLLECTION', name: 'Tuition Fees Collection & Balance Sheet', moduleId: 'MOD_EDU_FINANCE_44' },
  { id: 'REP_EDU_VOTE_BOOK_SUMMARY', name: 'Vote Book Expenditure & Commitment Report', moduleId: 'MOD_EDU_VOTE_BOOK_46' },
  { id: 'REP_EDU_CLINIC_MORBIDITY', name: 'University Health Clinic Morbidity Summary', moduleId: 'MOD_EDU_HEALTH_CLINIC_23' },
  { id: 'REP_EDU_LIBRARY_CIRCULATION', name: 'Library Circulation & Inventory Audit', moduleId: 'MOD_EDU_LIBRARY_19' },

  // FAAP Reports (8)
  { id: 'REP_FAAP_BALANCE_SHEET', name: 'Statement of Financial Position (Balance Sheet)', moduleId: 'MOD_FAAP_FINANCIAL_STATEMENTS_33' },
  { id: 'REP_FAAP_INCOME_STMT', name: 'Statement of Comprehensive Income (P&L)', moduleId: 'MOD_FAAP_FINANCIAL_STATEMENTS_33' },
  { id: 'REP_FAAP_TRIAL_BALANCE', name: 'Comprehensive General Ledger Trial Balance', moduleId: 'MOD_FAAP_TRIAL_BALANCE_34' },
  { id: 'REP_FAAP_CASH_FLOW', name: 'Cash Flow Statement & Liquidity Forecast', moduleId: 'MOD_FAAP_FINANCIAL_STATEMENTS_33' },
  { id: 'REP_FAAP_VOTE_BOOK_UTIL', name: 'Vote Book Utilization & Budget Variance Report', moduleId: 'MOD_FAAP_VOTE_BOOK_13' },
  { id: 'REP_FAAP_FIXED_ASSETS', name: 'Fixed Asset Register & Depreciation Schedule', moduleId: 'MOD_FAAP_FIXED_ASSETS_20' },
  { id: 'REP_FAAP_BANK_RECON', name: 'Monthly Bank Reconciliation Audit Statement', moduleId: 'MOD_FAAP_RECONCILIATION_10' },
  { id: 'REP_FAAP_TAX_SCHEDULE', name: 'Tax Liability & Withholding Summary', moduleId: 'MOD_FAAP_TAX_29' },

  // Digital Pay Reports (5)
  { id: 'REP_DP_DAILY_SETTLEMENT', name: 'Daily Switch Settlement & Clearing Journal', moduleId: 'MOD_DP_SETTLEMENT_15' },
  { id: 'REP_DP_PRN_STREAM', name: 'Real-Time PRN Transaction Flow & Success Rate', moduleId: 'MOD_DP_PRNS_2' },
  { id: 'REP_DP_COMMISSION_SPLIT', name: '1.5% Master Treasury Commission Split Summary', moduleId: 'MOD_DP_SPLIT_PAYMENTS_16' },
  { id: 'REP_DP_TELCO_LATENCY', name: 'Telco Gateway Latency & Failover Audit', moduleId: 'MOD_DP_ROUTING_11' },
  { id: 'REP_DP_CHARGEBACK_RATIO', name: 'Merchant Chargeback Ratio & Fraud Scorecard', moduleId: 'MOD_DP_DISPUTES_19' },

  // Church Reports (5)
  { id: 'REP_CH_TITHES_LEDGER', name: 'Diocesan Tithes & Remittances Ledger', moduleId: 'MOD_CH_TITHES_18' },
  { id: 'REP_CH_SACRAMENT_REGISTER', name: 'Parish Sacramental Register (Baptisms & Marriages)', moduleId: 'MOD_CH_SACRAMENTS_ORDINANCES_43' },
  { id: 'REP_CH_PASTORAL_LOG', name: 'Pastoral Care Counseling & Visitation Log', moduleId: 'MOD_CH_PASTORAL_CARE_41' },
  { id: 'REP_CH_FINANCIAL_SUMMARY', name: 'Parish Income, Expenditure & Building Fund Audit', moduleId: 'MOD_CH_FINANCE_22' },
  { id: 'REP_CH_ATTENDANCE_STATS', name: 'Congregational Attendance & Membership Growth Report', moduleId: 'MOD_CH_REPORTS_40' }
];

export const APIRegistry: APIDefinition[] = [
  // Education APIs (6)
  { id: 'API_EDU_STUDENTS_LIST', method: 'GET', route: '/api/ueos/education/students' },
  { id: 'API_EDU_STUDENT_REGISTER', method: 'POST', route: '/api/ueos/education/students/register' },
  { id: 'API_EDU_MARKS_POST', method: 'POST', route: '/api/ueos/education/assessments/marks' },
  { id: 'API_EDU_TRANSCRIPT_GET', method: 'GET', route: '/api/ueos/education/transcripts/:id' },
  { id: 'API_EDU_FEES_INVOICE', method: 'POST', route: '/api/ueos/education/fees/invoice' },
  { id: 'API_EDU_VOTE_COMMIT', method: 'POST', route: '/api/ueos/education/votebook/commit' },

  // FAAP APIs (6)
  { id: 'API_FAAP_JOURNAL_POST', method: 'POST', route: '/api/ueos/faap/journal/post' },
  { id: 'API_FAAP_TRIAL_BALANCE_GET', method: 'GET', route: '/api/ueos/faap/reports/trial-balance' },
  { id: 'API_FAAP_BALANCE_SHEET_GET', method: 'GET', route: '/api/ueos/faap/reports/balance-sheet' },
  { id: 'API_FAAP_VOTE_VALIDATE', method: 'POST', route: '/api/ueos/faap/votebook/validate' },
  { id: 'API_FAAP_TREASURY_SWEEP', method: 'POST', route: '/api/ueos/faap/treasury/sweep' },
  { id: 'API_FAAP_RECON_FEED', method: 'POST', route: '/api/ueos/faap/banking/recon-feed' },

  // Digital Pay APIs (6)
  { id: 'API_DP_INTENT_CREATE', method: 'POST', route: '/api/ueos/pay/intent/create' },
  { id: 'API_DP_PRN_RESOLVE', method: 'GET', route: '/api/ueos/pay/prn/:prn' },
  { id: 'API_DP_MOMO_CALLBACK', method: 'POST', route: '/api/ueos/pay/webhooks/momo' },
  { id: 'API_DP_CARD_AUTH', method: 'POST', route: '/api/ueos/pay/cards/authorize' },
  { id: 'API_DP_SETTLEMENT_EXEC', method: 'POST', route: '/api/ueos/pay/settlement/execute' },
  { id: 'API_DP_DISPUTE_FILE', method: 'POST', route: '/api/ueos/pay/disputes/file' },

  // Church APIs (4)
  { id: 'API_CH_MEMBERS_LIST', method: 'GET', route: '/api/ueos/church/members' },
  { id: 'API_CH_MEMBER_POST', method: 'POST', route: '/api/ueos/church/members/register' },
  { id: 'API_CH_TITHE_POST', method: 'POST', route: '/api/ueos/church/tithes/record' },
  { id: 'API_CH_SACRAMENT_GET', method: 'GET', route: '/api/ueos/church/sacraments' }
];

export const IntegrationRegistry: IntegrationDefinition[] = [
  // Education Integrations (4)
  { id: 'INT_EDU_FAAP_BRIDGE', name: 'FAAP Financial Ledger Direct Synapse', type: 'INTERNAL_LEDGER' },
  { id: 'INT_EDU_DIGITAL_PAY_BRIDGE', name: 'Digital Pay PRN Payment Switch Gateway', type: 'PAYMENT_GATEWAY' },
  { id: 'INT_EDU_NATIONAL_EXAMS', name: 'National Examinations Board & Transcript Sync', type: 'GOVERNMENT_API' },
  { id: 'INT_EDU_SMS_GATEWAY', name: 'Universal SMS & Email Broadcast Engine', type: 'TELECOM_SMS' },

  // FAAP Integrations (4)
  { id: 'INT_FAAP_COMMERCIAL_BANKS', name: 'Commercial Banking Direct Host-to-Host Feed', type: 'BANKING_API' },
  { id: 'INT_FAAP_REVENUE_AUTH', name: 'National Tax & Revenue Authority Bridge', type: 'TAX_GATEWAY' },
  { id: 'INT_FAAP_DIGITAL_PAY_SPLIT', name: 'Digital Pay 1.5% Settlement Clearing Synapse', type: 'INTERNAL_SETTLEMENT' },
  { id: 'INT_FAAP_SECURE_STORAGE', name: 'Owner-Only Cryptographic Ledger Storage Vault', type: 'ENCRYPTED_STORAGE' },

  // Digital Pay Integrations (4)
  { id: 'INT_DP_MTN_MOMO', name: 'MTN Mobile Money Open API Switch', type: 'TELCO_MOMO' },
  { id: 'INT_DP_AIRTEL_MONEY', name: 'Airtel Money Core Switch Connector', type: 'TELCO_MOMO' },
  { id: 'INT_DP_VISA_MASTERCARD', name: 'Visa/Mastercard 3D-Secure Acquiring Host', type: 'CARD_SWITCH' },
  { id: 'INT_DP_FAAP_TREASURY_SYNC', name: 'FAAP Real-Time Treasury Ledger Synapse', type: 'INTERNAL_FINTECH' },

  // Church Integrations (3)
  { id: 'INT_CH_FAAP_STEWARDSHIP', name: 'FAAP Diocesan Stewardship & Vote Book Synapse', type: 'INTERNAL_LEDGER' },
  { id: 'INT_CH_DIGITAL_PAY_GIVING', name: 'Digital Pay Giving & Tithe Collection Gateway', type: 'PAYMENT_GATEWAY' },
  { id: 'INT_CH_EPISCOPAL_CLOUD', name: 'Global Denominational Synod Document Sync', type: 'EPISCOPAL_CLOUD' }
];

export type AICapabilityDefinition = { id: string; name: string; description: string; productId: string; modelTarget: 'FLASH' | 'REASONING' | 'AGENT' };

export const AICapabilityRegistry: AICapabilityDefinition[] = [
  // Education AI Capabilities
  { id: 'AI_EDU_ADMISSIONS_ASSISTANT', name: 'Admissions Document Intelligence & Verification', description: 'Automated transcript parsing and candidate eligibility matching', productId: 'JUMO-EDU-ALUMNI', modelTarget: 'FLASH' },
  { id: 'AI_EDU_EARLY_WARNING_RISK', name: 'Student Academic Early-Warning Risk Detector', description: 'Predicts student academic failure risks from attendance & assessment trends', productId: 'JUMO-EDU-ALUMNI', modelTarget: 'REASONING' },
  { id: 'AI_EDU_TIMETABLE_OPTIMIZER', name: 'Constraint Satisfaction Timetable Optimizer', description: 'Solves complex faculty, room, and student group clash matrices', productId: 'JUMO-EDU-ALUMNI', modelTarget: 'AGENT' },
  { id: 'AI_EDU_EXAM_ANALYTICS', name: 'Examination Grade Distribution & Moderation AI', description: 'Identifies standard deviation anomalies and score skewness', productId: 'JUMO-EDU-ALUMNI', modelTarget: 'REASONING' },
  { id: 'AI_EDU_TRANSCRIPT_AUDITOR', name: 'Degree Audit & Transcript Cryptographic Verifier', description: 'Validates complete credit requirements prior to graduation conferment', productId: 'JUMO-EDU-ALUMNI', modelTarget: 'AGENT' },

  // FAAP AI Capabilities
  { id: 'AI_FAAP_LEDGER_AUDITOR', name: 'Double-Entry Ledger Real-Time Audit Sentinel', description: 'Verifies debit/credit balance parity and flags abnormal account postings', productId: 'JUMO-FINTECH', modelTarget: 'AGENT' },
  { id: 'AI_FAAP_CASHFLOW_FORECASTER', name: 'Predictive Cash Flow & Liquidity Forecaster', description: 'Forecasts 90-day cash position using historical burn rate and seasonality', productId: 'JUMO-FINTECH', modelTarget: 'REASONING' },
  { id: 'AI_FAAP_ANOMALY_DETECTOR', name: 'Disbursement & Expense Anomaly Radar', description: 'Flags potential fraudulent invoices or duplicated supplier billings', productId: 'JUMO-FINTECH', modelTarget: 'FLASH' },
  { id: 'AI_FAAP_VARIANCE_ANALYST', name: 'Vote Book Budget Variance Explainer', description: 'Generates narrative analysis of departmental vote book variances', productId: 'JUMO-FINTECH', modelTarget: 'FLASH' },
  { id: 'AI_FAAP_TREASURY_OPTIMIZER', name: 'Master Treasury Multi-Bank Sweep Optimizer', description: 'Calculates optimal account balance sweeps to minimize bank fees', productId: 'JUMO-FINTECH', modelTarget: 'AGENT' },

  // Digital Pay AI Capabilities
  { id: 'AI_DP_FRAUD_SENTINEL', name: 'Real-Time Transaction Risk & Velocity Sentinel', description: 'Evaluates transaction fraud probability in under 50ms', productId: 'JUMO-FINTECH', modelTarget: 'FLASH' },
  { id: 'AI_DP_ROUTING_OPTIMIZER', name: 'Smart Least-Cost Payment Routing Engine', description: 'Dynamically routes transactions to highest-success telco/card gateways', productId: 'JUMO-FINTECH', modelTarget: 'AGENT' },
  { id: 'AI_DP_RECONCILIATION_RESOLVER', name: 'Discrepancy Auto-Matching & Resolution AI', description: 'Matches unresolved telco clearing batches with internal PRN journals', productId: 'JUMO-FINTECH', modelTarget: 'REASONING' },
  { id: 'AI_DP_CHARGEBACK_PREDICTOR', name: 'Merchant Chargeback & Refund Predictor', description: 'Flags high-risk merchant accounts approaching dispute thresholds', productId: 'JUMO-FINTECH', modelTarget: 'FLASH' },

  // Church AI Capabilities
  { id: 'AI_CH_PASTORAL_CARE_SUMMARIZER', name: 'Pastoral Care & Counseling Intake Summarizer', description: 'Synthesizes confidential pastoral requests for clergy prioritization', productId: 'JUMO-CHURCH', modelTarget: 'FLASH' },
  { id: 'AI_CH_GIVING_ANALYTICS', name: 'Stewardship Giving & Tithe Trend Analytics', description: 'Analyzes seasonal giving patterns and generates pledge forecasts', productId: 'JUMO-CHURCH', modelTarget: 'REASONING' },
  { id: 'AI_CH_SERMON_CONTENT_INDEXER', name: 'Sermon Transcript & Liturgy Semantic Indexer', description: 'Embeds and indexes doctrinal teachings for fast topic retrieval', productId: 'JUMO-CHURCH', modelTarget: 'FLASH' },
  { id: 'AI_CH_DIOCESAN_GOVERNANCE_ADVISOR', name: 'Diocesan Synod & Policy Compliance Advisor', description: 'Advises parish leadership on canonical statutes and governance policies', productId: 'JUMO-CHURCH', modelTarget: 'AGENT' },
  // Alumni AI Capabilities
  { id: 'AI_ALUM_MENTORSHIP_MATCH', name: 'Semantic Mentorship Matching Engine', description: 'Connects alumni based on career trajectory, location, and industry skills', productId: 'JUMO-EDU-ALUMNI', modelTarget: 'AGENT' },
  { id: 'AI_ALUM_DONOR_PROPENSITY', name: 'Alumni Donor Propensity Scoring', description: 'Analyzes engagement history to predict likelihood of future endowment giving', productId: 'JUMO-EDU-ALUMNI', modelTarget: 'REASONING' },
  { id: 'AI_ALUM_CENSUS_INTEL', name: 'Digital Census & Employment Intelligence', description: 'Automatically updates alumni employment data from public record feeds', productId: 'JUMO-EDU-ALUMNI', modelTarget: 'FLASH' }
];

export const SubmoduleRegistry: SubmoduleDefinition[] = [
  {
    "id": "SUB_EDU_ADMISSIONS_0_OPS",
    "name": "Admissions Operations & Processing",
    "moduleId": "MOD_EDU_ADMISSIONS_0"
  },
  {
    "id": "SUB_EDU_ADMISSIONS_0_AUDIT",
    "name": "Admissions Audit & Reconciliation",
    "moduleId": "MOD_EDU_ADMISSIONS_0"
  },
  {
    "id": "SUB_EDU_STUDENT_INFORMATION_SYSTEM_1_OPS",
    "name": "Student Information System Operations & Processing",
    "moduleId": "MOD_EDU_STUDENT_INFORMATION_SYSTEM_1"
  },
  {
    "id": "SUB_EDU_STUDENT_INFORMATION_SYSTEM_1_AUDIT",
    "name": "Student Information System Audit & Reconciliation",
    "moduleId": "MOD_EDU_STUDENT_INFORMATION_SYSTEM_1"
  },
  {
    "id": "SUB_EDU_STUDENT_PARENT_PORTAL_2_OPS",
    "name": "Student/Parent Portal Operations & Processing",
    "moduleId": "MOD_EDU_STUDENT_PARENT_PORTAL_2"
  },
  {
    "id": "SUB_EDU_STUDENT_PARENT_PORTAL_2_AUDIT",
    "name": "Student/Parent Portal Audit & Reconciliation",
    "moduleId": "MOD_EDU_STUDENT_PARENT_PORTAL_2"
  },
  {
    "id": "SUB_EDU_ACADEMIC_MANAGEMENT_3_OPS",
    "name": "Academic Management Operations & Processing",
    "moduleId": "MOD_EDU_ACADEMIC_MANAGEMENT_3"
  },
  {
    "id": "SUB_EDU_ACADEMIC_MANAGEMENT_3_AUDIT",
    "name": "Academic Management Audit & Reconciliation",
    "moduleId": "MOD_EDU_ACADEMIC_MANAGEMENT_3"
  },
  {
    "id": "SUB_EDU_CURRICULUM_MANAGEMENT_4_OPS",
    "name": "Curriculum Management Operations & Processing",
    "moduleId": "MOD_EDU_CURRICULUM_MANAGEMENT_4"
  },
  {
    "id": "SUB_EDU_CURRICULUM_MANAGEMENT_4_AUDIT",
    "name": "Curriculum Management Audit & Reconciliation",
    "moduleId": "MOD_EDU_CURRICULUM_MANAGEMENT_4"
  },
  {
    "id": "SUB_EDU_COURSES_5_OPS",
    "name": "Courses Operations & Processing",
    "moduleId": "MOD_EDU_COURSES_5"
  },
  {
    "id": "SUB_EDU_COURSES_5_AUDIT",
    "name": "Courses Audit & Reconciliation",
    "moduleId": "MOD_EDU_COURSES_5"
  },
  {
    "id": "SUB_EDU_SUBJECTS_6_OPS",
    "name": "Subjects Operations & Processing",
    "moduleId": "MOD_EDU_SUBJECTS_6"
  },
  {
    "id": "SUB_EDU_SUBJECTS_6_AUDIT",
    "name": "Subjects Audit & Reconciliation",
    "moduleId": "MOD_EDU_SUBJECTS_6"
  },
  {
    "id": "SUB_EDU_CLASSES_7_OPS",
    "name": "Classes Operations & Processing",
    "moduleId": "MOD_EDU_CLASSES_7"
  },
  {
    "id": "SUB_EDU_CLASSES_7_AUDIT",
    "name": "Classes Audit & Reconciliation",
    "moduleId": "MOD_EDU_CLASSES_7"
  },
  {
    "id": "SUB_EDU_STREAMS_8_OPS",
    "name": "Streams Operations & Processing",
    "moduleId": "MOD_EDU_STREAMS_8"
  },
  {
    "id": "SUB_EDU_STREAMS_8_AUDIT",
    "name": "Streams Audit & Reconciliation",
    "moduleId": "MOD_EDU_STREAMS_8"
  },
  {
    "id": "SUB_EDU_TIMETABLES_9_OPS",
    "name": "Timetables Operations & Processing",
    "moduleId": "MOD_EDU_TIMETABLES_9"
  },
  {
    "id": "SUB_EDU_TIMETABLES_9_AUDIT",
    "name": "Timetables Audit & Reconciliation",
    "moduleId": "MOD_EDU_TIMETABLES_9"
  },
  {
    "id": "SUB_EDU_ASSESSMENT_MANAGEMENT_10_OPS",
    "name": "Assessment Management Operations & Processing",
    "moduleId": "MOD_EDU_ASSESSMENT_MANAGEMENT_10"
  },
  {
    "id": "SUB_EDU_ASSESSMENT_MANAGEMENT_10_AUDIT",
    "name": "Assessment Management Audit & Reconciliation",
    "moduleId": "MOD_EDU_ASSESSMENT_MANAGEMENT_10"
  },
  {
    "id": "SUB_EDU_EXAMINATION_MANAGEMENT_11_OPS",
    "name": "Examination Management Operations & Processing",
    "moduleId": "MOD_EDU_EXAMINATION_MANAGEMENT_11"
  },
  {
    "id": "SUB_EDU_EXAMINATION_MANAGEMENT_11_AUDIT",
    "name": "Examination Management Audit & Reconciliation",
    "moduleId": "MOD_EDU_EXAMINATION_MANAGEMENT_11"
  },
  {
    "id": "SUB_EDU_RESULTS_MANAGEMENT_12_OPS",
    "name": "Results Management Operations & Processing",
    "moduleId": "MOD_EDU_RESULTS_MANAGEMENT_12"
  },
  {
    "id": "SUB_EDU_RESULTS_MANAGEMENT_12_AUDIT",
    "name": "Results Management Audit & Reconciliation",
    "moduleId": "MOD_EDU_RESULTS_MANAGEMENT_12"
  },
  {
    "id": "SUB_EDU_TRANSCRIPT_MANAGEMENT_13_OPS",
    "name": "Transcript Management Operations & Processing",
    "moduleId": "MOD_EDU_TRANSCRIPT_MANAGEMENT_13"
  },
  {
    "id": "SUB_EDU_TRANSCRIPT_MANAGEMENT_13_AUDIT",
    "name": "Transcript Management Audit & Reconciliation",
    "moduleId": "MOD_EDU_TRANSCRIPT_MANAGEMENT_13"
  },
  {
    "id": "SUB_EDU_GRADUATION_14_OPS",
    "name": "Graduation Operations & Processing",
    "moduleId": "MOD_EDU_GRADUATION_14"
  },
  {
    "id": "SUB_EDU_GRADUATION_14_AUDIT",
    "name": "Graduation Audit & Reconciliation",
    "moduleId": "MOD_EDU_GRADUATION_14"
  },
  {
    "id": "SUB_EDU_DEGREE_AUDIT_15_OPS",
    "name": "Degree Audit Operations & Processing",
    "moduleId": "MOD_EDU_DEGREE_AUDIT_15"
  },
  {
    "id": "SUB_EDU_DEGREE_AUDIT_15_AUDIT",
    "name": "Degree Audit Audit & Reconciliation",
    "moduleId": "MOD_EDU_DEGREE_AUDIT_15"
  },
  {
    "id": "SUB_EDU_E_LEARNING_16_OPS",
    "name": "E-Learning Operations & Processing",
    "moduleId": "MOD_EDU_E_LEARNING_16"
  },
  {
    "id": "SUB_EDU_E_LEARNING_16_AUDIT",
    "name": "E-Learning Audit & Reconciliation",
    "moduleId": "MOD_EDU_E_LEARNING_16"
  },
  {
    "id": "SUB_EDU_DIGITAL_TRAINING_17_OPS",
    "name": "Digital Training Operations & Processing",
    "moduleId": "MOD_EDU_DIGITAL_TRAINING_17"
  },
  {
    "id": "SUB_EDU_DIGITAL_TRAINING_17_AUDIT",
    "name": "Digital Training Audit & Reconciliation",
    "moduleId": "MOD_EDU_DIGITAL_TRAINING_17"
  },
  {
    "id": "SUB_EDU_DIGITAL_CONFERENCE_18_OPS",
    "name": "Digital Conference Operations & Processing",
    "moduleId": "MOD_EDU_DIGITAL_CONFERENCE_18"
  },
  {
    "id": "SUB_EDU_DIGITAL_CONFERENCE_18_AUDIT",
    "name": "Digital Conference Audit & Reconciliation",
    "moduleId": "MOD_EDU_DIGITAL_CONFERENCE_18"
  },
  {
    "id": "SUB_EDU_LIBRARY_19_OPS",
    "name": "Library Operations & Processing",
    "moduleId": "MOD_EDU_LIBRARY_19"
  },
  {
    "id": "SUB_EDU_LIBRARY_19_AUDIT",
    "name": "Library Audit & Reconciliation",
    "moduleId": "MOD_EDU_LIBRARY_19"
  },
  {
    "id": "SUB_EDU_HOSTEL_MANAGEMENT_20_OPS",
    "name": "Hostel Management Operations & Processing",
    "moduleId": "MOD_EDU_HOSTEL_MANAGEMENT_20"
  },
  {
    "id": "SUB_EDU_HOSTEL_MANAGEMENT_20_AUDIT",
    "name": "Hostel Management Audit & Reconciliation",
    "moduleId": "MOD_EDU_HOSTEL_MANAGEMENT_20"
  },
  {
    "id": "SUB_EDU_BOYS_HOSTEL_21_OPS",
    "name": "Boys Hostel Operations & Processing",
    "moduleId": "MOD_EDU_BOYS_HOSTEL_21"
  },
  {
    "id": "SUB_EDU_BOYS_HOSTEL_21_AUDIT",
    "name": "Boys Hostel Audit & Reconciliation",
    "moduleId": "MOD_EDU_BOYS_HOSTEL_21"
  },
  {
    "id": "SUB_EDU_GIRLS_HOSTEL_22_OPS",
    "name": "Girls Hostel Operations & Processing",
    "moduleId": "MOD_EDU_GIRLS_HOSTEL_22"
  },
  {
    "id": "SUB_EDU_GIRLS_HOSTEL_22_AUDIT",
    "name": "Girls Hostel Audit & Reconciliation",
    "moduleId": "MOD_EDU_GIRLS_HOSTEL_22"
  },
  {
    "id": "SUB_EDU_HEALTH_CLINIC_23_OPS",
    "name": "Health/Clinic Operations & Processing",
    "moduleId": "MOD_EDU_HEALTH_CLINIC_23"
  },
  {
    "id": "SUB_EDU_HEALTH_CLINIC_23_AUDIT",
    "name": "Health/Clinic Audit & Reconciliation",
    "moduleId": "MOD_EDU_HEALTH_CLINIC_23"
  },
  {
    "id": "SUB_EDU_LABORATORY_24_OPS",
    "name": "Laboratory Operations & Processing",
    "moduleId": "MOD_EDU_LABORATORY_24"
  },
  {
    "id": "SUB_EDU_LABORATORY_24_AUDIT",
    "name": "Laboratory Audit & Reconciliation",
    "moduleId": "MOD_EDU_LABORATORY_24"
  },
  {
    "id": "SUB_EDU_GAMES_25_OPS",
    "name": "Games Operations & Processing",
    "moduleId": "MOD_EDU_GAMES_25"
  },
  {
    "id": "SUB_EDU_GAMES_25_AUDIT",
    "name": "Games Audit & Reconciliation",
    "moduleId": "MOD_EDU_GAMES_25"
  },
  {
    "id": "SUB_EDU_SPORTS_26_OPS",
    "name": "Sports Operations & Processing",
    "moduleId": "MOD_EDU_SPORTS_26"
  },
  {
    "id": "SUB_EDU_SPORTS_26_AUDIT",
    "name": "Sports Audit & Reconciliation",
    "moduleId": "MOD_EDU_SPORTS_26"
  },
  {
    "id": "SUB_EDU_STUDENT_WELFARE_27_OPS",
    "name": "Student Welfare Operations & Processing",
    "moduleId": "MOD_EDU_STUDENT_WELFARE_27"
  },
  {
    "id": "SUB_EDU_STUDENT_WELFARE_27_AUDIT",
    "name": "Student Welfare Audit & Reconciliation",
    "moduleId": "MOD_EDU_STUDENT_WELFARE_27"
  },
  {
    "id": "SUB_EDU_COUNSELLING_28_OPS",
    "name": "Counselling Operations & Processing",
    "moduleId": "MOD_EDU_COUNSELLING_28"
  },
  {
    "id": "SUB_EDU_COUNSELLING_28_AUDIT",
    "name": "Counselling Audit & Reconciliation",
    "moduleId": "MOD_EDU_COUNSELLING_28"
  },
  {
    "id": "SUB_EDU_DISCIPLINE_29_OPS",
    "name": "Discipline Operations & Processing",
    "moduleId": "MOD_EDU_DISCIPLINE_29"
  },
  {
    "id": "SUB_EDU_DISCIPLINE_29_AUDIT",
    "name": "Discipline Audit & Reconciliation",
    "moduleId": "MOD_EDU_DISCIPLINE_29"
  },
  {
    "id": "SUB_EDU_TRANSPORT_30_OPS",
    "name": "Transport Operations & Processing",
    "moduleId": "MOD_EDU_TRANSPORT_30"
  },
  {
    "id": "SUB_EDU_TRANSPORT_30_AUDIT",
    "name": "Transport Audit & Reconciliation",
    "moduleId": "MOD_EDU_TRANSPORT_30"
  },
  {
    "id": "SUB_EDU_SCHOOL_FARM_31_OPS",
    "name": "School Farm Operations & Processing",
    "moduleId": "MOD_EDU_SCHOOL_FARM_31"
  },
  {
    "id": "SUB_EDU_SCHOOL_FARM_31_AUDIT",
    "name": "School Farm Audit & Reconciliation",
    "moduleId": "MOD_EDU_SCHOOL_FARM_31"
  },
  {
    "id": "SUB_EDU_KITCHEN_32_OPS",
    "name": "Kitchen Operations & Processing",
    "moduleId": "MOD_EDU_KITCHEN_32"
  },
  {
    "id": "SUB_EDU_KITCHEN_32_AUDIT",
    "name": "Kitchen Audit & Reconciliation",
    "moduleId": "MOD_EDU_KITCHEN_32"
  },
  {
    "id": "SUB_EDU_MEALS_33_OPS",
    "name": "Meals Operations & Processing",
    "moduleId": "MOD_EDU_MEALS_33"
  },
  {
    "id": "SUB_EDU_MEALS_33_AUDIT",
    "name": "Meals Audit & Reconciliation",
    "moduleId": "MOD_EDU_MEALS_33"
  },
  {
    "id": "SUB_EDU_STORES_34_OPS",
    "name": "Stores Operations & Processing",
    "moduleId": "MOD_EDU_STORES_34"
  },
  {
    "id": "SUB_EDU_STORES_34_AUDIT",
    "name": "Stores Audit & Reconciliation",
    "moduleId": "MOD_EDU_STORES_34"
  },
  {
    "id": "SUB_EDU_PROCUREMENT_35_OPS",
    "name": "Procurement Operations & Processing",
    "moduleId": "MOD_EDU_PROCUREMENT_35"
  },
  {
    "id": "SUB_EDU_PROCUREMENT_35_AUDIT",
    "name": "Procurement Audit & Reconciliation",
    "moduleId": "MOD_EDU_PROCUREMENT_35"
  },
  {
    "id": "SUB_EDU_LOGISTICS_36_OPS",
    "name": "Logistics Operations & Processing",
    "moduleId": "MOD_EDU_LOGISTICS_36"
  },
  {
    "id": "SUB_EDU_LOGISTICS_36_AUDIT",
    "name": "Logistics Audit & Reconciliation",
    "moduleId": "MOD_EDU_LOGISTICS_36"
  },
  {
    "id": "SUB_EDU_ESTATES_MANAGEMENT_37_OPS",
    "name": "Estates Management Operations & Processing",
    "moduleId": "MOD_EDU_ESTATES_MANAGEMENT_37"
  },
  {
    "id": "SUB_EDU_ESTATES_MANAGEMENT_37_AUDIT",
    "name": "Estates Management Audit & Reconciliation",
    "moduleId": "MOD_EDU_ESTATES_MANAGEMENT_37"
  },
  {
    "id": "SUB_EDU_ASSET_MANAGEMENT_38_OPS",
    "name": "Asset Management Operations & Processing",
    "moduleId": "MOD_EDU_ASSET_MANAGEMENT_38"
  },
  {
    "id": "SUB_EDU_ASSET_MANAGEMENT_38_AUDIT",
    "name": "Asset Management Audit & Reconciliation",
    "moduleId": "MOD_EDU_ASSET_MANAGEMENT_38"
  },
  {
    "id": "SUB_EDU_INSTITUTIONAL_DEVELOPMENT_39_OPS",
    "name": "Institutional Development Operations & Processing",
    "moduleId": "MOD_EDU_INSTITUTIONAL_DEVELOPMENT_39"
  },
  {
    "id": "SUB_EDU_INSTITUTIONAL_DEVELOPMENT_39_AUDIT",
    "name": "Institutional Development Audit & Reconciliation",
    "moduleId": "MOD_EDU_INSTITUTIONAL_DEVELOPMENT_39"
  },
  {
    "id": "SUB_EDU_STAFF_MANAGEMENT_40_OPS",
    "name": "Staff Management Operations & Processing",
    "moduleId": "MOD_EDU_STAFF_MANAGEMENT_40"
  },
  {
    "id": "SUB_EDU_STAFF_MANAGEMENT_40_AUDIT",
    "name": "Staff Management Audit & Reconciliation",
    "moduleId": "MOD_EDU_STAFF_MANAGEMENT_40"
  },
  {
    "id": "SUB_EDU_RECRUITMENT_41_OPS",
    "name": "Recruitment Operations & Processing",
    "moduleId": "MOD_EDU_RECRUITMENT_41"
  },
  {
    "id": "SUB_EDU_RECRUITMENT_41_AUDIT",
    "name": "Recruitment Audit & Reconciliation",
    "moduleId": "MOD_EDU_RECRUITMENT_41"
  },
  {
    "id": "SUB_EDU_PAYROLL_42_OPS",
    "name": "Payroll Operations & Processing",
    "moduleId": "MOD_EDU_PAYROLL_42"
  },
  {
    "id": "SUB_EDU_PAYROLL_42_AUDIT",
    "name": "Payroll Audit & Reconciliation",
    "moduleId": "MOD_EDU_PAYROLL_42"
  },
  {
    "id": "SUB_EDU_STAFF_SACCO_43_OPS",
    "name": "Staff SACCO Operations & Processing",
    "moduleId": "MOD_EDU_STAFF_SACCO_43"
  },
  {
    "id": "SUB_EDU_STAFF_SACCO_43_AUDIT",
    "name": "Staff SACCO Audit & Reconciliation",
    "moduleId": "MOD_EDU_STAFF_SACCO_43"
  },
  {
    "id": "SUB_EDU_FINANCE_44_OPS",
    "name": "Finance Operations & Processing",
    "moduleId": "MOD_EDU_FINANCE_44"
  },
  {
    "id": "SUB_EDU_FINANCE_44_AUDIT",
    "name": "Finance Audit & Reconciliation",
    "moduleId": "MOD_EDU_FINANCE_44"
  },
  {
    "id": "SUB_EDU_BUDGET_45_OPS",
    "name": "Budget Operations & Processing",
    "moduleId": "MOD_EDU_BUDGET_45"
  },
  {
    "id": "SUB_EDU_BUDGET_45_AUDIT",
    "name": "Budget Audit & Reconciliation",
    "moduleId": "MOD_EDU_BUDGET_45"
  },
  {
    "id": "SUB_EDU_VOTE_BOOK_46_OPS",
    "name": "Vote Book Operations & Processing",
    "moduleId": "MOD_EDU_VOTE_BOOK_46"
  },
  {
    "id": "SUB_EDU_VOTE_BOOK_46_AUDIT",
    "name": "Vote Book Audit & Reconciliation",
    "moduleId": "MOD_EDU_VOTE_BOOK_46"
  },
  {
    "id": "SUB_EDU_CASH_BOOKS_47_OPS",
    "name": "Cash Books Operations & Processing",
    "moduleId": "MOD_EDU_CASH_BOOKS_47"
  },
  {
    "id": "SUB_EDU_CASH_BOOKS_47_AUDIT",
    "name": "Cash Books Audit & Reconciliation",
    "moduleId": "MOD_EDU_CASH_BOOKS_47"
  },
  {
    "id": "SUB_EDU_ACCOUNTS_PAYABLE_48_OPS",
    "name": "Accounts Payable Operations & Processing",
    "moduleId": "MOD_EDU_ACCOUNTS_PAYABLE_48"
  },
  {
    "id": "SUB_EDU_ACCOUNTS_PAYABLE_48_AUDIT",
    "name": "Accounts Payable Audit & Reconciliation",
    "moduleId": "MOD_EDU_ACCOUNTS_PAYABLE_48"
  },
  {
    "id": "SUB_EDU_ACCOUNTS_RECEIVABLE_49_OPS",
    "name": "Accounts Receivable Operations & Processing",
    "moduleId": "MOD_EDU_ACCOUNTS_RECEIVABLE_49"
  },
  {
    "id": "SUB_EDU_ACCOUNTS_RECEIVABLE_49_AUDIT",
    "name": "Accounts Receivable Audit & Reconciliation",
    "moduleId": "MOD_EDU_ACCOUNTS_RECEIVABLE_49"
  },
  {
    "id": "SUB_EDU_GENERAL_LEDGER_50_OPS",
    "name": "General Ledger Operations & Processing",
    "moduleId": "MOD_EDU_GENERAL_LEDGER_50"
  },
  {
    "id": "SUB_EDU_GENERAL_LEDGER_50_AUDIT",
    "name": "General Ledger Audit & Reconciliation",
    "moduleId": "MOD_EDU_GENERAL_LEDGER_50"
  },
  {
    "id": "SUB_EDU_GRANTS_51_OPS",
    "name": "Grants Operations & Processing",
    "moduleId": "MOD_EDU_GRANTS_51"
  },
  {
    "id": "SUB_EDU_GRANTS_51_AUDIT",
    "name": "Grants Audit & Reconciliation",
    "moduleId": "MOD_EDU_GRANTS_51"
  },
  {
    "id": "SUB_EDU_DONOR_MANAGEMENT_52_OPS",
    "name": "Donor Management Operations & Processing",
    "moduleId": "MOD_EDU_DONOR_MANAGEMENT_52"
  },
  {
    "id": "SUB_EDU_DONOR_MANAGEMENT_52_AUDIT",
    "name": "Donor Management Audit & Reconciliation",
    "moduleId": "MOD_EDU_DONOR_MANAGEMENT_52"
  },
  {
    "id": "SUB_EDU_COMMUNICATIONS_53_OPS",
    "name": "Communications Operations & Processing",
    "moduleId": "MOD_EDU_COMMUNICATIONS_53"
  },
  {
    "id": "SUB_EDU_COMMUNICATIONS_53_AUDIT",
    "name": "Communications Audit & Reconciliation",
    "moduleId": "MOD_EDU_COMMUNICATIONS_53"
  },
  {
    "id": "SUB_EDU_SMS_54_OPS",
    "name": "SMS Operations & Processing",
    "moduleId": "MOD_EDU_SMS_54"
  },
  {
    "id": "SUB_EDU_SMS_54_AUDIT",
    "name": "SMS Audit & Reconciliation",
    "moduleId": "MOD_EDU_SMS_54"
  },
  {
    "id": "SUB_EDU_EMAIL_55_OPS",
    "name": "Email Operations & Processing",
    "moduleId": "MOD_EDU_EMAIL_55"
  },
  {
    "id": "SUB_EDU_EMAIL_55_AUDIT",
    "name": "Email Audit & Reconciliation",
    "moduleId": "MOD_EDU_EMAIL_55"
  },
  {
    "id": "SUB_EDU_NOTIFICATIONS_56_OPS",
    "name": "Notifications Operations & Processing",
    "moduleId": "MOD_EDU_NOTIFICATIONS_56"
  },
  {
    "id": "SUB_EDU_NOTIFICATIONS_56_AUDIT",
    "name": "Notifications Audit & Reconciliation",
    "moduleId": "MOD_EDU_NOTIFICATIONS_56"
  },
  {
    "id": "SUB_EDU_DATA___INFORMATION_MANAGEMENT_57_OPS",
    "name": "Data & Information Management Operations & Processing",
    "moduleId": "MOD_EDU_DATA___INFORMATION_MANAGEMENT_57"
  },
  {
    "id": "SUB_EDU_DATA___INFORMATION_MANAGEMENT_57_AUDIT",
    "name": "Data & Information Management Audit & Reconciliation",
    "moduleId": "MOD_EDU_DATA___INFORMATION_MANAGEMENT_57"
  },
  {
    "id": "SUB_EDU_REPORTING_58_OPS",
    "name": "Reporting Operations & Processing",
    "moduleId": "MOD_EDU_REPORTING_58"
  },
  {
    "id": "SUB_EDU_REPORTING_58_AUDIT",
    "name": "Reporting Audit & Reconciliation",
    "moduleId": "MOD_EDU_REPORTING_58"
  },
  {
    "id": "SUB_EDU_ANALYTICS_59_OPS",
    "name": "Analytics Operations & Processing",
    "moduleId": "MOD_EDU_ANALYTICS_59"
  },
  {
    "id": "SUB_EDU_ANALYTICS_59_AUDIT",
    "name": "Analytics Audit & Reconciliation",
    "moduleId": "MOD_EDU_ANALYTICS_59"
  },
  {
    "id": "SUB_EDU_GOVERNANCE_60_OPS",
    "name": "Governance Operations & Processing",
    "moduleId": "MOD_EDU_GOVERNANCE_60"
  },
  {
    "id": "SUB_EDU_GOVERNANCE_60_AUDIT",
    "name": "Governance Audit & Reconciliation",
    "moduleId": "MOD_EDU_GOVERNANCE_60"
  },
  {
    "id": "SUB_EDU_AUDIT_61_OPS",
    "name": "Audit Operations & Processing",
    "moduleId": "MOD_EDU_AUDIT_61"
  },
  {
    "id": "SUB_EDU_AUDIT_61_AUDIT",
    "name": "Audit Audit & Reconciliation",
    "moduleId": "MOD_EDU_AUDIT_61"
  },
  {
    "id": "SUB_EDU_COMPLIANCE_62_OPS",
    "name": "Compliance Operations & Processing",
    "moduleId": "MOD_EDU_COMPLIANCE_62"
  },
  {
    "id": "SUB_EDU_COMPLIANCE_62_AUDIT",
    "name": "Compliance Audit & Reconciliation",
    "moduleId": "MOD_EDU_COMPLIANCE_62"
  },
  {
    "id": "SUB_EDU_SECURITY_63_OPS",
    "name": "Security Operations & Processing",
    "moduleId": "MOD_EDU_SECURITY_63"
  },
  {
    "id": "SUB_EDU_SECURITY_63_AUDIT",
    "name": "Security Audit & Reconciliation",
    "moduleId": "MOD_EDU_SECURITY_63"
  },
  {
    "id": "SUB_EDU_CONFIGURATION_64_OPS",
    "name": "Configuration Operations & Processing",
    "moduleId": "MOD_EDU_CONFIGURATION_64"
  },
  {
    "id": "SUB_EDU_CONFIGURATION_64_AUDIT",
    "name": "Configuration Audit & Reconciliation",
    "moduleId": "MOD_EDU_CONFIGURATION_64"
  },
  {
    "id": "SUB_EDU_INTEGRATION_MANAGEMENT_65_OPS",
    "name": "Integration Management Operations & Processing",
    "moduleId": "MOD_EDU_INTEGRATION_MANAGEMENT_65"
  },
  {
    "id": "SUB_EDU_INTEGRATION_MANAGEMENT_65_AUDIT",
    "name": "Integration Management Audit & Reconciliation",
    "moduleId": "MOD_EDU_INTEGRATION_MANAGEMENT_65"
  },
  {
    "id": "SUB_DP_PAYMENT_INTENTS_0_OPS",
    "name": "Payment intents Operations & Processing",
    "moduleId": "MOD_DP_PAYMENT_INTENTS_0"
  },
  {
    "id": "SUB_DP_PAYMENT_INTENTS_0_AUDIT",
    "name": "Payment intents Audit & Reconciliation",
    "moduleId": "MOD_DP_PAYMENT_INTENTS_0"
  },
  {
    "id": "SUB_DP_PAYMENT_LINKS_1_OPS",
    "name": "Payment links Operations & Processing",
    "moduleId": "MOD_DP_PAYMENT_LINKS_1"
  },
  {
    "id": "SUB_DP_PAYMENT_LINKS_1_AUDIT",
    "name": "Payment links Audit & Reconciliation",
    "moduleId": "MOD_DP_PAYMENT_LINKS_1"
  },
  {
    "id": "SUB_DP_PRNS_2_OPS",
    "name": "PRNs Operations & Processing",
    "moduleId": "MOD_DP_PRNS_2"
  },
  {
    "id": "SUB_DP_PRNS_2_AUDIT",
    "name": "PRNs Audit & Reconciliation",
    "moduleId": "MOD_DP_PRNS_2"
  },
  {
    "id": "SUB_DP_COLLECTIONS_3_OPS",
    "name": "Collections Operations & Processing",
    "moduleId": "MOD_DP_COLLECTIONS_3"
  },
  {
    "id": "SUB_DP_COLLECTIONS_3_AUDIT",
    "name": "Collections Audit & Reconciliation",
    "moduleId": "MOD_DP_COLLECTIONS_3"
  },
  {
    "id": "SUB_DP_MOBILE_MONEY_4_OPS",
    "name": "Mobile money Operations & Processing",
    "moduleId": "MOD_DP_MOBILE_MONEY_4"
  },
  {
    "id": "SUB_DP_MOBILE_MONEY_4_AUDIT",
    "name": "Mobile money Audit & Reconciliation",
    "moduleId": "MOD_DP_MOBILE_MONEY_4"
  },
  {
    "id": "SUB_DP_CARDS_5_OPS",
    "name": "Cards Operations & Processing",
    "moduleId": "MOD_DP_CARDS_5"
  },
  {
    "id": "SUB_DP_CARDS_5_AUDIT",
    "name": "Cards Audit & Reconciliation",
    "moduleId": "MOD_DP_CARDS_5"
  },
  {
    "id": "SUB_DP_BANK_TRANSFERS_6_OPS",
    "name": "Bank transfers Operations & Processing",
    "moduleId": "MOD_DP_BANK_TRANSFERS_6"
  },
  {
    "id": "SUB_DP_BANK_TRANSFERS_6_AUDIT",
    "name": "Bank transfers Audit & Reconciliation",
    "moduleId": "MOD_DP_BANK_TRANSFERS_6"
  },
  {
    "id": "SUB_DP_WALLET_7_OPS",
    "name": "Wallet Operations & Processing",
    "moduleId": "MOD_DP_WALLET_7"
  },
  {
    "id": "SUB_DP_WALLET_7_AUDIT",
    "name": "Wallet Audit & Reconciliation",
    "moduleId": "MOD_DP_WALLET_7"
  },
  {
    "id": "SUB_DP_USSD_8_OPS",
    "name": "USSD Operations & Processing",
    "moduleId": "MOD_DP_USSD_8"
  },
  {
    "id": "SUB_DP_USSD_8_AUDIT",
    "name": "USSD Audit & Reconciliation",
    "moduleId": "MOD_DP_USSD_8"
  },
  {
    "id": "SUB_DP_MERCHANT_ONBOARDING_9_OPS",
    "name": "Merchant onboarding Operations & Processing",
    "moduleId": "MOD_DP_MERCHANT_ONBOARDING_9"
  },
  {
    "id": "SUB_DP_MERCHANT_ONBOARDING_9_AUDIT",
    "name": "Merchant onboarding Audit & Reconciliation",
    "moduleId": "MOD_DP_MERCHANT_ONBOARDING_9"
  },
  {
    "id": "SUB_DP_KYC_10_OPS",
    "name": "KYC Operations & Processing",
    "moduleId": "MOD_DP_KYC_10"
  },
  {
    "id": "SUB_DP_KYC_10_AUDIT",
    "name": "KYC Audit & Reconciliation",
    "moduleId": "MOD_DP_KYC_10"
  },
  {
    "id": "SUB_DP_ROUTING_11_OPS",
    "name": "Routing Operations & Processing",
    "moduleId": "MOD_DP_ROUTING_11"
  },
  {
    "id": "SUB_DP_ROUTING_11_AUDIT",
    "name": "Routing Audit & Reconciliation",
    "moduleId": "MOD_DP_ROUTING_11"
  },
  {
    "id": "SUB_DP_RETRIES_12_OPS",
    "name": "Retries Operations & Processing",
    "moduleId": "MOD_DP_RETRIES_12"
  },
  {
    "id": "SUB_DP_RETRIES_12_AUDIT",
    "name": "Retries Audit & Reconciliation",
    "moduleId": "MOD_DP_RETRIES_12"
  },
  {
    "id": "SUB_DP_FAILOVER_13_OPS",
    "name": "Failover Operations & Processing",
    "moduleId": "MOD_DP_FAILOVER_13"
  },
  {
    "id": "SUB_DP_FAILOVER_13_AUDIT",
    "name": "Failover Audit & Reconciliation",
    "moduleId": "MOD_DP_FAILOVER_13"
  },
  {
    "id": "SUB_DP_FRAUD_14_OPS",
    "name": "Fraud Operations & Processing",
    "moduleId": "MOD_DP_FRAUD_14"
  },
  {
    "id": "SUB_DP_FRAUD_14_AUDIT",
    "name": "Fraud Audit & Reconciliation",
    "moduleId": "MOD_DP_FRAUD_14"
  },
  {
    "id": "SUB_DP_SETTLEMENT_15_OPS",
    "name": "Settlement Operations & Processing",
    "moduleId": "MOD_DP_SETTLEMENT_15"
  },
  {
    "id": "SUB_DP_SETTLEMENT_15_AUDIT",
    "name": "Settlement Audit & Reconciliation",
    "moduleId": "MOD_DP_SETTLEMENT_15"
  },
  {
    "id": "SUB_DP_SPLIT_PAYMENTS_16_OPS",
    "name": "Split payments Operations & Processing",
    "moduleId": "MOD_DP_SPLIT_PAYMENTS_16"
  },
  {
    "id": "SUB_DP_SPLIT_PAYMENTS_16_AUDIT",
    "name": "Split payments Audit & Reconciliation",
    "moduleId": "MOD_DP_SPLIT_PAYMENTS_16"
  },
  {
    "id": "SUB_DP_RECONCILIATION_17_OPS",
    "name": "Reconciliation Operations & Processing",
    "moduleId": "MOD_DP_RECONCILIATION_17"
  },
  {
    "id": "SUB_DP_RECONCILIATION_17_AUDIT",
    "name": "Reconciliation Audit & Reconciliation",
    "moduleId": "MOD_DP_RECONCILIATION_17"
  },
  {
    "id": "SUB_DP_REFUNDS_18_OPS",
    "name": "Refunds Operations & Processing",
    "moduleId": "MOD_DP_REFUNDS_18"
  },
  {
    "id": "SUB_DP_REFUNDS_18_AUDIT",
    "name": "Refunds Audit & Reconciliation",
    "moduleId": "MOD_DP_REFUNDS_18"
  },
  {
    "id": "SUB_DP_DISPUTES_19_OPS",
    "name": "Disputes Operations & Processing",
    "moduleId": "MOD_DP_DISPUTES_19"
  },
  {
    "id": "SUB_DP_DISPUTES_19_AUDIT",
    "name": "Disputes Audit & Reconciliation",
    "moduleId": "MOD_DP_DISPUTES_19"
  },
  {
    "id": "SUB_DP_CHARGEBACKS_20_OPS",
    "name": "Chargebacks Operations & Processing",
    "moduleId": "MOD_DP_CHARGEBACKS_20"
  },
  {
    "id": "SUB_DP_CHARGEBACKS_20_AUDIT",
    "name": "Chargebacks Audit & Reconciliation",
    "moduleId": "MOD_DP_CHARGEBACKS_20"
  },
  {
    "id": "SUB_DP_REPORTING_21_OPS",
    "name": "Reporting Operations & Processing",
    "moduleId": "MOD_DP_REPORTING_21"
  },
  {
    "id": "SUB_DP_REPORTING_21_AUDIT",
    "name": "Reporting Audit & Reconciliation",
    "moduleId": "MOD_DP_REPORTING_21"
  },
  {
    "id": "SUB_DP_API_MANAGEMENT_22_OPS",
    "name": "API management Operations & Processing",
    "moduleId": "MOD_DP_API_MANAGEMENT_22"
  },
  {
    "id": "SUB_DP_API_MANAGEMENT_22_AUDIT",
    "name": "API management Audit & Reconciliation",
    "moduleId": "MOD_DP_API_MANAGEMENT_22"
  },
  {
    "id": "SUB_DP_WEBHOOKS_23_OPS",
    "name": "Webhooks Operations & Processing",
    "moduleId": "MOD_DP_WEBHOOKS_23"
  },
  {
    "id": "SUB_DP_WEBHOOKS_23_AUDIT",
    "name": "Webhooks Audit & Reconciliation",
    "moduleId": "MOD_DP_WEBHOOKS_23"
  },
  {
    "id": "SUB_DP_NOTIFICATIONS_24_OPS",
    "name": "Notifications Operations & Processing",
    "moduleId": "MOD_DP_NOTIFICATIONS_24"
  },
  {
    "id": "SUB_DP_NOTIFICATIONS_24_AUDIT",
    "name": "Notifications Audit & Reconciliation",
    "moduleId": "MOD_DP_NOTIFICATIONS_24"
  },
  {
    "id": "SUB_FAAP_CHART_OF_ACCOUNTS_0_OPS",
    "name": "Chart Of Accounts Operations & Processing",
    "moduleId": "MOD_FAAP_CHART_OF_ACCOUNTS_0"
  },
  {
    "id": "SUB_FAAP_CHART_OF_ACCOUNTS_0_AUDIT",
    "name": "Chart Of Accounts Audit & Reconciliation",
    "moduleId": "MOD_FAAP_CHART_OF_ACCOUNTS_0"
  },
  {
    "id": "SUB_FAAP_GENERAL_LEDGER_1_OPS",
    "name": "General Ledger Operations & Processing",
    "moduleId": "MOD_FAAP_GENERAL_LEDGER_1"
  },
  {
    "id": "SUB_FAAP_GENERAL_LEDGER_1_AUDIT",
    "name": "General Ledger Audit & Reconciliation",
    "moduleId": "MOD_FAAP_GENERAL_LEDGER_1"
  },
  {
    "id": "SUB_FAAP_JOURNAL_2_OPS",
    "name": "Journal Operations & Processing",
    "moduleId": "MOD_FAAP_JOURNAL_2"
  },
  {
    "id": "SUB_FAAP_JOURNAL_2_AUDIT",
    "name": "Journal Audit & Reconciliation",
    "moduleId": "MOD_FAAP_JOURNAL_2"
  },
  {
    "id": "SUB_FAAP_ACCOUNTS_PAYABLE_3_OPS",
    "name": "Accounts Payable Operations & Processing",
    "moduleId": "MOD_FAAP_ACCOUNTS_PAYABLE_3"
  },
  {
    "id": "SUB_FAAP_ACCOUNTS_PAYABLE_3_AUDIT",
    "name": "Accounts Payable Audit & Reconciliation",
    "moduleId": "MOD_FAAP_ACCOUNTS_PAYABLE_3"
  },
  {
    "id": "SUB_FAAP_ACCOUNTS_RECEIVABLE_4_OPS",
    "name": "Accounts Receivable Operations & Processing",
    "moduleId": "MOD_FAAP_ACCOUNTS_RECEIVABLE_4"
  },
  {
    "id": "SUB_FAAP_ACCOUNTS_RECEIVABLE_4_AUDIT",
    "name": "Accounts Receivable Audit & Reconciliation",
    "moduleId": "MOD_FAAP_ACCOUNTS_RECEIVABLE_4"
  },
  {
    "id": "SUB_FAAP_INVOICING_5_OPS",
    "name": "Invoicing Operations & Processing",
    "moduleId": "MOD_FAAP_INVOICING_5"
  },
  {
    "id": "SUB_FAAP_INVOICING_5_AUDIT",
    "name": "Invoicing Audit & Reconciliation",
    "moduleId": "MOD_FAAP_INVOICING_5"
  },
  {
    "id": "SUB_FAAP_BILLS_6_OPS",
    "name": "Bills Operations & Processing",
    "moduleId": "MOD_FAAP_BILLS_6"
  },
  {
    "id": "SUB_FAAP_BILLS_6_AUDIT",
    "name": "Bills Audit & Reconciliation",
    "moduleId": "MOD_FAAP_BILLS_6"
  },
  {
    "id": "SUB_FAAP_RECEIPTS_7_OPS",
    "name": "Receipts Operations & Processing",
    "moduleId": "MOD_FAAP_RECEIPTS_7"
  },
  {
    "id": "SUB_FAAP_RECEIPTS_7_AUDIT",
    "name": "Receipts Audit & Reconciliation",
    "moduleId": "MOD_FAAP_RECEIPTS_7"
  },
  {
    "id": "SUB_FAAP_BANK_ACCOUNTS_8_OPS",
    "name": "Bank Accounts Operations & Processing",
    "moduleId": "MOD_FAAP_BANK_ACCOUNTS_8"
  },
  {
    "id": "SUB_FAAP_BANK_ACCOUNTS_8_AUDIT",
    "name": "Bank Accounts Audit & Reconciliation",
    "moduleId": "MOD_FAAP_BANK_ACCOUNTS_8"
  },
  {
    "id": "SUB_FAAP_BANK_FEEDS_9_OPS",
    "name": "Bank Feeds Operations & Processing",
    "moduleId": "MOD_FAAP_BANK_FEEDS_9"
  },
  {
    "id": "SUB_FAAP_BANK_FEEDS_9_AUDIT",
    "name": "Bank Feeds Audit & Reconciliation",
    "moduleId": "MOD_FAAP_BANK_FEEDS_9"
  },
  {
    "id": "SUB_FAAP_RECONCILIATION_10_OPS",
    "name": "Reconciliation Operations & Processing",
    "moduleId": "MOD_FAAP_RECONCILIATION_10"
  },
  {
    "id": "SUB_FAAP_RECONCILIATION_10_AUDIT",
    "name": "Reconciliation Audit & Reconciliation",
    "moduleId": "MOD_FAAP_RECONCILIATION_10"
  },
  {
    "id": "SUB_FAAP_BUDGETING_11_OPS",
    "name": "Budgeting Operations & Processing",
    "moduleId": "MOD_FAAP_BUDGETING_11"
  },
  {
    "id": "SUB_FAAP_BUDGETING_11_AUDIT",
    "name": "Budgeting Audit & Reconciliation",
    "moduleId": "MOD_FAAP_BUDGETING_11"
  },
  {
    "id": "SUB_FAAP_BUDGET_BOOK_12_OPS",
    "name": "Budget Book Operations & Processing",
    "moduleId": "MOD_FAAP_BUDGET_BOOK_12"
  },
  {
    "id": "SUB_FAAP_BUDGET_BOOK_12_AUDIT",
    "name": "Budget Book Audit & Reconciliation",
    "moduleId": "MOD_FAAP_BUDGET_BOOK_12"
  },
  {
    "id": "SUB_FAAP_VOTE_BOOK_13_OPS",
    "name": "Vote Book Operations & Processing",
    "moduleId": "MOD_FAAP_VOTE_BOOK_13"
  },
  {
    "id": "SUB_FAAP_VOTE_BOOK_13_AUDIT",
    "name": "Vote Book Audit & Reconciliation",
    "moduleId": "MOD_FAAP_VOTE_BOOK_13"
  },
  {
    "id": "SUB_FAAP_CASH_BOOK_14_OPS",
    "name": "Cash Book Operations & Processing",
    "moduleId": "MOD_FAAP_CASH_BOOK_14"
  },
  {
    "id": "SUB_FAAP_CASH_BOOK_14_AUDIT",
    "name": "Cash Book Audit & Reconciliation",
    "moduleId": "MOD_FAAP_CASH_BOOK_14"
  },
  {
    "id": "SUB_FAAP_SINGLE_CASH_BOOK_15_OPS",
    "name": "Single Cash Book Operations & Processing",
    "moduleId": "MOD_FAAP_SINGLE_CASH_BOOK_15"
  },
  {
    "id": "SUB_FAAP_SINGLE_CASH_BOOK_15_AUDIT",
    "name": "Single Cash Book Audit & Reconciliation",
    "moduleId": "MOD_FAAP_SINGLE_CASH_BOOK_15"
  },
  {
    "id": "SUB_FAAP_DOUBLE_CASH_BOOK_16_OPS",
    "name": "Double Cash Book Operations & Processing",
    "moduleId": "MOD_FAAP_DOUBLE_CASH_BOOK_16"
  },
  {
    "id": "SUB_FAAP_DOUBLE_CASH_BOOK_16_AUDIT",
    "name": "Double Cash Book Audit & Reconciliation",
    "moduleId": "MOD_FAAP_DOUBLE_CASH_BOOK_16"
  },
  {
    "id": "SUB_FAAP_TRIPLE_CASH_BOOK_17_OPS",
    "name": "Triple Cash Book Operations & Processing",
    "moduleId": "MOD_FAAP_TRIPLE_CASH_BOOK_17"
  },
  {
    "id": "SUB_FAAP_TRIPLE_CASH_BOOK_17_AUDIT",
    "name": "Triple Cash Book Audit & Reconciliation",
    "moduleId": "MOD_FAAP_TRIPLE_CASH_BOOK_17"
  },
  {
    "id": "SUB_FAAP_PETTY_CASH_18_OPS",
    "name": "Petty Cash Operations & Processing",
    "moduleId": "MOD_FAAP_PETTY_CASH_18"
  },
  {
    "id": "SUB_FAAP_PETTY_CASH_18_AUDIT",
    "name": "Petty Cash Audit & Reconciliation",
    "moduleId": "MOD_FAAP_PETTY_CASH_18"
  },
  {
    "id": "SUB_FAAP_TREASURY_19_OPS",
    "name": "Treasury Operations & Processing",
    "moduleId": "MOD_FAAP_TREASURY_19"
  },
  {
    "id": "SUB_FAAP_TREASURY_19_AUDIT",
    "name": "Treasury Audit & Reconciliation",
    "moduleId": "MOD_FAAP_TREASURY_19"
  },
  {
    "id": "SUB_FAAP_FIXED_ASSETS_20_OPS",
    "name": "Fixed Assets Operations & Processing",
    "moduleId": "MOD_FAAP_FIXED_ASSETS_20"
  },
  {
    "id": "SUB_FAAP_FIXED_ASSETS_20_AUDIT",
    "name": "Fixed Assets Audit & Reconciliation",
    "moduleId": "MOD_FAAP_FIXED_ASSETS_20"
  },
  {
    "id": "SUB_FAAP_DEPRECIATION_21_OPS",
    "name": "Depreciation Operations & Processing",
    "moduleId": "MOD_FAAP_DEPRECIATION_21"
  },
  {
    "id": "SUB_FAAP_DEPRECIATION_21_AUDIT",
    "name": "Depreciation Audit & Reconciliation",
    "moduleId": "MOD_FAAP_DEPRECIATION_21"
  },
  {
    "id": "SUB_FAAP_EXPENSES_22_OPS",
    "name": "Expenses Operations & Processing",
    "moduleId": "MOD_FAAP_EXPENSES_22"
  },
  {
    "id": "SUB_FAAP_EXPENSES_22_AUDIT",
    "name": "Expenses Audit & Reconciliation",
    "moduleId": "MOD_FAAP_EXPENSES_22"
  },
  {
    "id": "SUB_FAAP_GRANTS_23_OPS",
    "name": "Grants Operations & Processing",
    "moduleId": "MOD_FAAP_GRANTS_23"
  },
  {
    "id": "SUB_FAAP_GRANTS_23_AUDIT",
    "name": "Grants Audit & Reconciliation",
    "moduleId": "MOD_FAAP_GRANTS_23"
  },
  {
    "id": "SUB_FAAP_RESTRICTED_FUNDS_24_OPS",
    "name": "Restricted Funds Operations & Processing",
    "moduleId": "MOD_FAAP_RESTRICTED_FUNDS_24"
  },
  {
    "id": "SUB_FAAP_RESTRICTED_FUNDS_24_AUDIT",
    "name": "Restricted Funds Audit & Reconciliation",
    "moduleId": "MOD_FAAP_RESTRICTED_FUNDS_24"
  },
  {
    "id": "SUB_FAAP_DONOR_FUNDS_25_OPS",
    "name": "Donor Funds Operations & Processing",
    "moduleId": "MOD_FAAP_DONOR_FUNDS_25"
  },
  {
    "id": "SUB_FAAP_DONOR_FUNDS_25_AUDIT",
    "name": "Donor Funds Audit & Reconciliation",
    "moduleId": "MOD_FAAP_DONOR_FUNDS_25"
  },
  {
    "id": "SUB_FAAP_PROJECTS_26_OPS",
    "name": "Projects Operations & Processing",
    "moduleId": "MOD_FAAP_PROJECTS_26"
  },
  {
    "id": "SUB_FAAP_PROJECTS_26_AUDIT",
    "name": "Projects Audit & Reconciliation",
    "moduleId": "MOD_FAAP_PROJECTS_26"
  },
  {
    "id": "SUB_FAAP_COST_CENTRES_27_OPS",
    "name": "Cost Centres Operations & Processing",
    "moduleId": "MOD_FAAP_COST_CENTRES_27"
  },
  {
    "id": "SUB_FAAP_COST_CENTRES_27_AUDIT",
    "name": "Cost Centres Audit & Reconciliation",
    "moduleId": "MOD_FAAP_COST_CENTRES_27"
  },
  {
    "id": "SUB_FAAP_DIMENSIONS_28_OPS",
    "name": "Dimensions Operations & Processing",
    "moduleId": "MOD_FAAP_DIMENSIONS_28"
  },
  {
    "id": "SUB_FAAP_DIMENSIONS_28_AUDIT",
    "name": "Dimensions Audit & Reconciliation",
    "moduleId": "MOD_FAAP_DIMENSIONS_28"
  },
  {
    "id": "SUB_FAAP_TAX_29_OPS",
    "name": "Tax Operations & Processing",
    "moduleId": "MOD_FAAP_TAX_29"
  },
  {
    "id": "SUB_FAAP_TAX_29_AUDIT",
    "name": "Tax Audit & Reconciliation",
    "moduleId": "MOD_FAAP_TAX_29"
  },
  {
    "id": "SUB_FAAP_FISCAL_PERIODS_30_OPS",
    "name": "Fiscal Periods Operations & Processing",
    "moduleId": "MOD_FAAP_FISCAL_PERIODS_30"
  },
  {
    "id": "SUB_FAAP_FISCAL_PERIODS_30_AUDIT",
    "name": "Fiscal Periods Audit & Reconciliation",
    "moduleId": "MOD_FAAP_FISCAL_PERIODS_30"
  },
  {
    "id": "SUB_FAAP_CLOSING_31_OPS",
    "name": "Closing Operations & Processing",
    "moduleId": "MOD_FAAP_CLOSING_31"
  },
  {
    "id": "SUB_FAAP_CLOSING_31_AUDIT",
    "name": "Closing Audit & Reconciliation",
    "moduleId": "MOD_FAAP_CLOSING_31"
  },
  {
    "id": "SUB_FAAP_CONSOLIDATION_32_OPS",
    "name": "Consolidation Operations & Processing",
    "moduleId": "MOD_FAAP_CONSOLIDATION_32"
  },
  {
    "id": "SUB_FAAP_CONSOLIDATION_32_AUDIT",
    "name": "Consolidation Audit & Reconciliation",
    "moduleId": "MOD_FAAP_CONSOLIDATION_32"
  },
  {
    "id": "SUB_FAAP_FINANCIAL_STATEMENTS_33_OPS",
    "name": "Financial Statements Operations & Processing",
    "moduleId": "MOD_FAAP_FINANCIAL_STATEMENTS_33"
  },
  {
    "id": "SUB_FAAP_FINANCIAL_STATEMENTS_33_AUDIT",
    "name": "Financial Statements Audit & Reconciliation",
    "moduleId": "MOD_FAAP_FINANCIAL_STATEMENTS_33"
  },
  {
    "id": "SUB_FAAP_TRIAL_BALANCE_34_OPS",
    "name": "Trial Balance Operations & Processing",
    "moduleId": "MOD_FAAP_TRIAL_BALANCE_34"
  },
  {
    "id": "SUB_FAAP_TRIAL_BALANCE_34_AUDIT",
    "name": "Trial Balance Audit & Reconciliation",
    "moduleId": "MOD_FAAP_TRIAL_BALANCE_34"
  },
  {
    "id": "SUB_FAAP_AUDIT_35_OPS",
    "name": "Audit Operations & Processing",
    "moduleId": "MOD_FAAP_AUDIT_35"
  },
  {
    "id": "SUB_FAAP_AUDIT_35_AUDIT",
    "name": "Audit Audit & Reconciliation",
    "moduleId": "MOD_FAAP_AUDIT_35"
  },
  {
    "id": "SUB_FAAP_MAKER_CHECKER_36_OPS",
    "name": "Maker-checker Operations & Processing",
    "moduleId": "MOD_FAAP_MAKER_CHECKER_36"
  },
  {
    "id": "SUB_FAAP_MAKER_CHECKER_36_AUDIT",
    "name": "Maker-checker Audit & Reconciliation",
    "moduleId": "MOD_FAAP_MAKER_CHECKER_36"
  },
  {
    "id": "SUB_FAAP_APPROVAL_37_OPS",
    "name": "Approval Operations & Processing",
    "moduleId": "MOD_FAAP_APPROVAL_37"
  },
  {
    "id": "SUB_FAAP_APPROVAL_37_AUDIT",
    "name": "Approval Audit & Reconciliation",
    "moduleId": "MOD_FAAP_APPROVAL_37"
  },
  {
    "id": "SUB_FAAP_FINANCIAL_ANALYTICS_38_OPS",
    "name": "Financial Analytics Operations & Processing",
    "moduleId": "MOD_FAAP_FINANCIAL_ANALYTICS_38"
  },
  {
    "id": "SUB_FAAP_FINANCIAL_ANALYTICS_38_AUDIT",
    "name": "Financial Analytics Audit & Reconciliation",
    "moduleId": "MOD_FAAP_FINANCIAL_ANALYTICS_38"
  },
  {
    "id": "SUB_FAAP_FORECASTING_39_OPS",
    "name": "Forecasting Operations & Processing",
    "moduleId": "MOD_FAAP_FORECASTING_39"
  },
  {
    "id": "SUB_FAAP_FORECASTING_39_AUDIT",
    "name": "Forecasting Audit & Reconciliation",
    "moduleId": "MOD_FAAP_FORECASTING_39"
  },
  {
    "id": "SUB_FAAP_REPORTING_40_OPS",
    "name": "Reporting Operations & Processing",
    "moduleId": "MOD_FAAP_REPORTING_40"
  },
  {
    "id": "SUB_FAAP_REPORTING_40_AUDIT",
    "name": "Reporting Audit & Reconciliation",
    "moduleId": "MOD_FAAP_REPORTING_40"
  },
  {
    "id": "SUB_CH_CHURCH_MEMBERSHIP_0_OPS",
    "name": "Church Membership Operations & Processing",
    "moduleId": "MOD_CH_CHURCH_MEMBERSHIP_0"
  },
  {
    "id": "SUB_CH_CHURCH_MEMBERSHIP_0_AUDIT",
    "name": "Church Membership Audit & Reconciliation",
    "moduleId": "MOD_CH_CHURCH_MEMBERSHIP_0"
  },
  {
    "id": "SUB_CH_CLERGY_1_OPS",
    "name": "Clergy Operations & Processing",
    "moduleId": "MOD_CH_CLERGY_1"
  },
  {
    "id": "SUB_CH_CLERGY_1_AUDIT",
    "name": "Clergy Audit & Reconciliation",
    "moduleId": "MOD_CH_CLERGY_1"
  },
  {
    "id": "SUB_CH_PARISHES_2_OPS",
    "name": "Parishes Operations & Processing",
    "moduleId": "MOD_CH_PARISHES_2"
  },
  {
    "id": "SUB_CH_PARISHES_2_AUDIT",
    "name": "Parishes Audit & Reconciliation",
    "moduleId": "MOD_CH_PARISHES_2"
  },
  {
    "id": "SUB_CH_DIOCESES_3_OPS",
    "name": "Dioceses Operations & Processing",
    "moduleId": "MOD_CH_DIOCESES_3"
  },
  {
    "id": "SUB_CH_DIOCESES_3_AUDIT",
    "name": "Dioceses Audit & Reconciliation",
    "moduleId": "MOD_CH_DIOCESES_3"
  },
  {
    "id": "SUB_CH_CONGREGATIONS_4_OPS",
    "name": "Congregations Operations & Processing",
    "moduleId": "MOD_CH_CONGREGATIONS_4"
  },
  {
    "id": "SUB_CH_CONGREGATIONS_4_AUDIT",
    "name": "Congregations Audit & Reconciliation",
    "moduleId": "MOD_CH_CONGREGATIONS_4"
  },
  {
    "id": "SUB_CH_MINISTRIES_5_OPS",
    "name": "Ministries Operations & Processing",
    "moduleId": "MOD_CH_MINISTRIES_5"
  },
  {
    "id": "SUB_CH_MINISTRIES_5_AUDIT",
    "name": "Ministries Audit & Reconciliation",
    "moduleId": "MOD_CH_MINISTRIES_5"
  },
  {
    "id": "SUB_CH_GROUPS_6_OPS",
    "name": "Groups Operations & Processing",
    "moduleId": "MOD_CH_GROUPS_6"
  },
  {
    "id": "SUB_CH_GROUPS_6_AUDIT",
    "name": "Groups Audit & Reconciliation",
    "moduleId": "MOD_CH_GROUPS_6"
  },
  {
    "id": "SUB_CH_VOLUNTEERS_7_OPS",
    "name": "Volunteers Operations & Processing",
    "moduleId": "MOD_CH_VOLUNTEERS_7"
  },
  {
    "id": "SUB_CH_VOLUNTEERS_7_AUDIT",
    "name": "Volunteers Audit & Reconciliation",
    "moduleId": "MOD_CH_VOLUNTEERS_7"
  },
  {
    "id": "SUB_CH_EVENTS_8_OPS",
    "name": "Events Operations & Processing",
    "moduleId": "MOD_CH_EVENTS_8"
  },
  {
    "id": "SUB_CH_EVENTS_8_AUDIT",
    "name": "Events Audit & Reconciliation",
    "moduleId": "MOD_CH_EVENTS_8"
  },
  {
    "id": "SUB_CH_CALENDAR_9_OPS",
    "name": "Calendar Operations & Processing",
    "moduleId": "MOD_CH_CALENDAR_9"
  },
  {
    "id": "SUB_CH_CALENDAR_9_AUDIT",
    "name": "Calendar Audit & Reconciliation",
    "moduleId": "MOD_CH_CALENDAR_9"
  },
  {
    "id": "SUB_CH_WORSHIP_PLANNING_10_OPS",
    "name": "Worship Planning Operations & Processing",
    "moduleId": "MOD_CH_WORSHIP_PLANNING_10"
  },
  {
    "id": "SUB_CH_WORSHIP_PLANNING_10_AUDIT",
    "name": "Worship Planning Audit & Reconciliation",
    "moduleId": "MOD_CH_WORSHIP_PLANNING_10"
  },
  {
    "id": "SUB_CH_SERMONS_CONTENT_11_OPS",
    "name": "Sermons/content Operations & Processing",
    "moduleId": "MOD_CH_SERMONS_CONTENT_11"
  },
  {
    "id": "SUB_CH_SERMONS_CONTENT_11_AUDIT",
    "name": "Sermons/content Audit & Reconciliation",
    "moduleId": "MOD_CH_SERMONS_CONTENT_11"
  },
  {
    "id": "SUB_CH_YOUTH_12_OPS",
    "name": "Youth Operations & Processing",
    "moduleId": "MOD_CH_YOUTH_12"
  },
  {
    "id": "SUB_CH_YOUTH_12_AUDIT",
    "name": "Youth Audit & Reconciliation",
    "moduleId": "MOD_CH_YOUTH_12"
  },
  {
    "id": "SUB_CH_CHILDREN_13_OPS",
    "name": "Children Operations & Processing",
    "moduleId": "MOD_CH_CHILDREN_13"
  },
  {
    "id": "SUB_CH_CHILDREN_13_AUDIT",
    "name": "Children Audit & Reconciliation",
    "moduleId": "MOD_CH_CHILDREN_13"
  },
  {
    "id": "SUB_CH_MISSIONS_14_OPS",
    "name": "Missions Operations & Processing",
    "moduleId": "MOD_CH_MISSIONS_14"
  },
  {
    "id": "SUB_CH_MISSIONS_14_AUDIT",
    "name": "Missions Audit & Reconciliation",
    "moduleId": "MOD_CH_MISSIONS_14"
  },
  {
    "id": "SUB_CH_EVANGELISM_15_OPS",
    "name": "Evangelism Operations & Processing",
    "moduleId": "MOD_CH_EVANGELISM_15"
  },
  {
    "id": "SUB_CH_EVANGELISM_15_AUDIT",
    "name": "Evangelism Audit & Reconciliation",
    "moduleId": "MOD_CH_EVANGELISM_15"
  },
  {
    "id": "SUB_CH_OUTREACH_16_OPS",
    "name": "Outreach Operations & Processing",
    "moduleId": "MOD_CH_OUTREACH_16"
  },
  {
    "id": "SUB_CH_OUTREACH_16_AUDIT",
    "name": "Outreach Audit & Reconciliation",
    "moduleId": "MOD_CH_OUTREACH_16"
  },
  {
    "id": "SUB_CH_DONATIONS_17_OPS",
    "name": "Donations Operations & Processing",
    "moduleId": "MOD_CH_DONATIONS_17"
  },
  {
    "id": "SUB_CH_DONATIONS_17_AUDIT",
    "name": "Donations Audit & Reconciliation",
    "moduleId": "MOD_CH_DONATIONS_17"
  },
  {
    "id": "SUB_CH_TITHES_18_OPS",
    "name": "Tithes Operations & Processing",
    "moduleId": "MOD_CH_TITHES_18"
  },
  {
    "id": "SUB_CH_TITHES_18_AUDIT",
    "name": "Tithes Audit & Reconciliation",
    "moduleId": "MOD_CH_TITHES_18"
  },
  {
    "id": "SUB_CH_OFFERINGS_19_OPS",
    "name": "Offerings Operations & Processing",
    "moduleId": "MOD_CH_OFFERINGS_19"
  },
  {
    "id": "SUB_CH_OFFERINGS_19_AUDIT",
    "name": "Offerings Audit & Reconciliation",
    "moduleId": "MOD_CH_OFFERINGS_19"
  },
  {
    "id": "SUB_CH_PLEDGES_20_OPS",
    "name": "Pledges Operations & Processing",
    "moduleId": "MOD_CH_PLEDGES_20"
  },
  {
    "id": "SUB_CH_PLEDGES_20_AUDIT",
    "name": "Pledges Audit & Reconciliation",
    "moduleId": "MOD_CH_PLEDGES_20"
  },
  {
    "id": "SUB_CH_FUNDRAISING_21_OPS",
    "name": "Fundraising Operations & Processing",
    "moduleId": "MOD_CH_FUNDRAISING_21"
  },
  {
    "id": "SUB_CH_FUNDRAISING_21_AUDIT",
    "name": "Fundraising Audit & Reconciliation",
    "moduleId": "MOD_CH_FUNDRAISING_21"
  },
  {
    "id": "SUB_CH_FINANCE_22_OPS",
    "name": "Finance Operations & Processing",
    "moduleId": "MOD_CH_FINANCE_22"
  },
  {
    "id": "SUB_CH_FINANCE_22_AUDIT",
    "name": "Finance Audit & Reconciliation",
    "moduleId": "MOD_CH_FINANCE_22"
  },
  {
    "id": "SUB_CH_BUDGET_23_OPS",
    "name": "Budget Operations & Processing",
    "moduleId": "MOD_CH_BUDGET_23"
  },
  {
    "id": "SUB_CH_BUDGET_23_AUDIT",
    "name": "Budget Audit & Reconciliation",
    "moduleId": "MOD_CH_BUDGET_23"
  },
  {
    "id": "SUB_CH_VOTE_BOOK_24_OPS",
    "name": "Vote Book Operations & Processing",
    "moduleId": "MOD_CH_VOTE_BOOK_24"
  },
  {
    "id": "SUB_CH_VOTE_BOOK_24_AUDIT",
    "name": "Vote Book Audit & Reconciliation",
    "moduleId": "MOD_CH_VOTE_BOOK_24"
  },
  {
    "id": "SUB_CH_CASH_BOOKS_25_OPS",
    "name": "Cash Books Operations & Processing",
    "moduleId": "MOD_CH_CASH_BOOKS_25"
  },
  {
    "id": "SUB_CH_CASH_BOOKS_25_AUDIT",
    "name": "Cash Books Audit & Reconciliation",
    "moduleId": "MOD_CH_CASH_BOOKS_25"
  },
  {
    "id": "SUB_CH_EXPENSES_26_OPS",
    "name": "Expenses Operations & Processing",
    "moduleId": "MOD_CH_EXPENSES_26"
  },
  {
    "id": "SUB_CH_EXPENSES_26_AUDIT",
    "name": "Expenses Audit & Reconciliation",
    "moduleId": "MOD_CH_EXPENSES_26"
  },
  {
    "id": "SUB_CH_PROCUREMENT_27_OPS",
    "name": "Procurement Operations & Processing",
    "moduleId": "MOD_CH_PROCUREMENT_27"
  },
  {
    "id": "SUB_CH_PROCUREMENT_27_AUDIT",
    "name": "Procurement Audit & Reconciliation",
    "moduleId": "MOD_CH_PROCUREMENT_27"
  },
  {
    "id": "SUB_CH_INVENTORY_28_OPS",
    "name": "Inventory Operations & Processing",
    "moduleId": "MOD_CH_INVENTORY_28"
  },
  {
    "id": "SUB_CH_INVENTORY_28_AUDIT",
    "name": "Inventory Audit & Reconciliation",
    "moduleId": "MOD_CH_INVENTORY_28"
  },
  {
    "id": "SUB_CH_ASSETS_29_OPS",
    "name": "Assets Operations & Processing",
    "moduleId": "MOD_CH_ASSETS_29"
  },
  {
    "id": "SUB_CH_ASSETS_29_AUDIT",
    "name": "Assets Audit & Reconciliation",
    "moduleId": "MOD_CH_ASSETS_29"
  },
  {
    "id": "SUB_CH_FACILITIES_30_OPS",
    "name": "Facilities Operations & Processing",
    "moduleId": "MOD_CH_FACILITIES_30"
  },
  {
    "id": "SUB_CH_FACILITIES_30_AUDIT",
    "name": "Facilities Audit & Reconciliation",
    "moduleId": "MOD_CH_FACILITIES_30"
  },
  {
    "id": "SUB_CH_HR_31_OPS",
    "name": "HR Operations & Processing",
    "moduleId": "MOD_CH_HR_31"
  },
  {
    "id": "SUB_CH_HR_31_AUDIT",
    "name": "HR Audit & Reconciliation",
    "moduleId": "MOD_CH_HR_31"
  },
  {
    "id": "SUB_CH_RECRUITMENT_32_OPS",
    "name": "Recruitment Operations & Processing",
    "moduleId": "MOD_CH_RECRUITMENT_32"
  },
  {
    "id": "SUB_CH_RECRUITMENT_32_AUDIT",
    "name": "Recruitment Audit & Reconciliation",
    "moduleId": "MOD_CH_RECRUITMENT_32"
  },
  {
    "id": "SUB_CH_STAFF_SACCO_33_OPS",
    "name": "Staff SACCO Operations & Processing",
    "moduleId": "MOD_CH_STAFF_SACCO_33"
  },
  {
    "id": "SUB_CH_STAFF_SACCO_33_AUDIT",
    "name": "Staff SACCO Audit & Reconciliation",
    "moduleId": "MOD_CH_STAFF_SACCO_33"
  },
  {
    "id": "SUB_CH_COMMUNICATIONS_34_OPS",
    "name": "Communications Operations & Processing",
    "moduleId": "MOD_CH_COMMUNICATIONS_34"
  },
  {
    "id": "SUB_CH_COMMUNICATIONS_34_AUDIT",
    "name": "Communications Audit & Reconciliation",
    "moduleId": "MOD_CH_COMMUNICATIONS_34"
  },
  {
    "id": "SUB_CH_SMS_35_OPS",
    "name": "SMS Operations & Processing",
    "moduleId": "MOD_CH_SMS_35"
  },
  {
    "id": "SUB_CH_SMS_35_AUDIT",
    "name": "SMS Audit & Reconciliation",
    "moduleId": "MOD_CH_SMS_35"
  },
  {
    "id": "SUB_CH_EMAIL_36_OPS",
    "name": "Email Operations & Processing",
    "moduleId": "MOD_CH_EMAIL_36"
  },
  {
    "id": "SUB_CH_EMAIL_36_AUDIT",
    "name": "Email Audit & Reconciliation",
    "moduleId": "MOD_CH_EMAIL_36"
  },
  {
    "id": "SUB_CH_MEDIA_37_OPS",
    "name": "Media Operations & Processing",
    "moduleId": "MOD_CH_MEDIA_37"
  },
  {
    "id": "SUB_CH_MEDIA_37_AUDIT",
    "name": "Media Audit & Reconciliation",
    "moduleId": "MOD_CH_MEDIA_37"
  },
  {
    "id": "SUB_CH_GOVERNANCE_38_OPS",
    "name": "Governance Operations & Processing",
    "moduleId": "MOD_CH_GOVERNANCE_38"
  },
  {
    "id": "SUB_CH_GOVERNANCE_38_AUDIT",
    "name": "Governance Audit & Reconciliation",
    "moduleId": "MOD_CH_GOVERNANCE_38"
  },
  {
    "id": "SUB_CH_AUDIT_39_OPS",
    "name": "Audit Operations & Processing",
    "moduleId": "MOD_CH_AUDIT_39"
  },
  {
    "id": "SUB_CH_AUDIT_39_AUDIT",
    "name": "Audit Audit & Reconciliation",
    "moduleId": "MOD_CH_AUDIT_39"
  },
  {
    "id": "SUB_CH_REPORTS_40_OPS",
    "name": "Reports Operations & Processing",
    "moduleId": "MOD_CH_REPORTS_40"
  },
  {
    "id": "SUB_CH_REPORTS_40_AUDIT",
    "name": "Reports Audit & Reconciliation",
    "moduleId": "MOD_CH_REPORTS_40"
  },
  {
    "id": "SUB_CH_PASTORAL_CARE_41_OPS",
    "name": "Pastoral Care Operations & Processing",
    "moduleId": "MOD_CH_PASTORAL_CARE_41"
  },
  {
    "id": "SUB_CH_PASTORAL_CARE_41_AUDIT",
    "name": "Pastoral Care Audit & Reconciliation",
    "moduleId": "MOD_CH_PASTORAL_CARE_41"
  },
  {
    "id": "SUB_CH_MEMBER_RECORDS_42_OPS",
    "name": "Member Records Operations & Processing",
    "moduleId": "MOD_CH_MEMBER_RECORDS_42"
  },
  {
    "id": "SUB_CH_MEMBER_RECORDS_42_AUDIT",
    "name": "Member Records Audit & Reconciliation",
    "moduleId": "MOD_CH_MEMBER_RECORDS_42"
  },
  {
    "id": "SUB_CH_SACRAMENTS_ORDINANCES_43_OPS",
    "name": "Sacraments/ordinances Operations & Processing",
    "moduleId": "MOD_CH_SACRAMENTS_ORDINANCES_43"
  },
  {
    "id": "SUB_CH_SACRAMENTS_ORDINANCES_43_AUDIT",
    "name": "Sacraments/ordinances Audit & Reconciliation",
    "moduleId": "MOD_CH_SACRAMENTS_ORDINANCES_43"
  },
  {
    "id": "SUB_CH_CONFERENCES_44_OPS",
    "name": "Conferences Operations & Processing",
    "moduleId": "MOD_CH_CONFERENCES_44"
  },
  {
    "id": "SUB_CH_CONFERENCES_44_AUDIT",
    "name": "Conferences Audit & Reconciliation",
    "moduleId": "MOD_CH_CONFERENCES_44"
  },
  {
    "id": "SUB_CH_TRAINING_45_OPS",
    "name": "Training Operations & Processing",
    "moduleId": "MOD_CH_TRAINING_45"
  },
  {
    "id": "SUB_CH_TRAINING_45_AUDIT",
    "name": "Training Audit & Reconciliation",
    "moduleId": "MOD_CH_TRAINING_45"
  },
  {
    "id": "SUB_CH_SCHOOLS_INSTITUTIONAL_MINISTRIES_46_OPS",
    "name": "Schools/institutional Ministries Operations & Processing",
    "moduleId": "MOD_CH_SCHOOLS_INSTITUTIONAL_MINISTRIES_46"
  },
  {
    "id": "SUB_CH_SCHOOLS_INSTITUTIONAL_MINISTRIES_46_AUDIT",
    "name": "Schools/institutional Ministries Audit & Reconciliation",
    "moduleId": "MOD_CH_SCHOOLS_INSTITUTIONAL_MINISTRIES_46"
  }
];

export function calculateRegistryStats() {
  return {
    alumni: {
      portals: 5,
      roles: 4,
      directorates: 2,
      departments: 4,
      offices: 6,
      modules: 5,
      submodules: 12,
      workflows: 6,
      forms: 8,
      reports: 6,
      apis: 10,
      integrations: 6,
      webWorkspaces: 5,
      mobileWorkspaces: 1,
      aiCapabilities: 8,
      governanceStructures: 3
    },
    education: {
      templates: EducationTemplateRegistry.length,
      portals: PortalRegistry.filter(p => p.productId === 'JUMO-EDU-ALUMNI').length,
      roles: Array.from(new Set(PortalRegistry.filter(p => p.productId === 'JUMO-EDU-ALUMNI').flatMap(p => p.authorizedRoles))).length,
      directorates: DirectorateRegistry.filter(d => d.id.startsWith('DIR_EDU_')).length,
      departments: DepartmentRegistry.filter(d => d.id.startsWith('DEPT_EDU_')).length,
      offices: OfficeRegistry.filter(o => o.id.startsWith('OFF_EDU_')).length,
      modules: ModuleRegistry.filter(m => m.productId === 'JUMO-EDU-ALUMNI').length,
      submodules: SubmoduleRegistry.filter(s => s.id.startsWith('SUB_EDU_')).length,
      workflows: WorkflowRegistry.filter(w => w.id.includes('EDU')).length,
      forms: FormRegistry.filter(f => f.id.includes('EDU')).length,
      reports: ReportRegistry.filter(r => r.id.includes('EDU')).length,
      apis: APIRegistry.filter(a => a.id.includes('EDU')).length,
      integrations: IntegrationRegistry.filter(i => i.id.includes('EDU')).length,
      webWorkspaces: PortalRegistry.filter(p => p.productId === 'JUMO-EDU-ALUMNI').length,
      mobileWorkspaces: PortalRegistry.filter(p => p.productId === 'JUMO-EDU-ALUMNI').length,
      aiCapabilities: AICapabilityRegistry.filter(a => a.productId === 'JUMO-EDU-ALUMNI').length,
      governanceStructures: 4
    },
    digitalPay: {
      portals: PortalRegistry.filter(p => p.productId === 'JUMO-FINTECH').length,
      roles: Array.from(new Set(PortalRegistry.filter(p => p.productId === 'JUMO-FINTECH').flatMap(p => p.authorizedRoles))).length,
      directorates: DirectorateRegistry.filter(d => d.id.startsWith('DIR_DP_')).length,
      departments: DepartmentRegistry.filter(d => d.id.startsWith('DEPT_DP_')).length,
      offices: OfficeRegistry.filter(o => o.id.startsWith('OFF_DP_')).length,
      modules: ModuleRegistry.filter(m => m.productId === 'JUMO-FINTECH').length,
      submodules: SubmoduleRegistry.filter(s => s.id.startsWith('SUB_DP_')).length,
      workflows: WorkflowRegistry.filter(w => w.id.includes('DP')).length,
      forms: FormRegistry.filter(f => f.id.includes('DP')).length,
      reports: ReportRegistry.filter(r => r.id.includes('DP')).length,
      apis: APIRegistry.filter(a => a.id.includes('DP')).length,
      integrations: IntegrationRegistry.filter(i => i.id.includes('DP')).length,
      webWorkspaces: PortalRegistry.filter(p => p.productId === 'JUMO-FINTECH').length,
      mobileWorkspaces: PortalRegistry.filter(p => p.productId === 'JUMO-FINTECH').length,
      aiCapabilities: AICapabilityRegistry.filter(a => a.productId === 'JUMO-FINTECH').length,
      governanceStructures: 3
    },
    faap: {
      portals: PortalRegistry.filter(p => p.productId === 'JUMO-FINTECH').length,
      roles: Array.from(new Set(PortalRegistry.filter(p => p.productId === 'JUMO-FINTECH').flatMap(p => p.authorizedRoles))).length,
      directorates: DirectorateRegistry.filter(d => d.id.startsWith('DIR_FAAP_')).length,
      departments: DepartmentRegistry.filter(d => d.id.startsWith('DEPT_FAAP_')).length,
      offices: OfficeRegistry.filter(o => o.id.startsWith('OFF_FAAP_')).length,
      modules: ModuleRegistry.filter(m => m.productId === 'JUMO-FINTECH').length,
      submodules: SubmoduleRegistry.filter(s => s.id.startsWith('SUB_FAAP_')).length,
      workflows: WorkflowRegistry.filter(w => w.id.includes('FAAP') || w.id.includes('VOTE_BOOK')).length,
      forms: FormRegistry.filter(f => f.id.includes('FAAP')).length,
      reports: ReportRegistry.filter(r => r.id.includes('FAAP')).length,
      apis: APIRegistry.filter(a => a.id.includes('FAAP')).length,
      integrations: IntegrationRegistry.filter(i => i.id.includes('FAAP')).length,
      webWorkspaces: PortalRegistry.filter(p => p.productId === 'JUMO-FINTECH').length,
      mobileWorkspaces: PortalRegistry.filter(p => p.productId === 'JUMO-FINTECH').length,
      aiCapabilities: AICapabilityRegistry.filter(a => a.productId === 'JUMO-FINTECH').length,
      governanceStructures: 4
    },
    church: {
      templates: ChurchTemplateRegistry.length,
      portals: PortalRegistry.filter(p => p.productId === 'JUMO-CHURCH').length,
      roles: Array.from(new Set(PortalRegistry.filter(p => p.productId === 'JUMO-CHURCH').flatMap(p => p.authorizedRoles))).length,
      directorates: DirectorateRegistry.filter(d => d.id.startsWith('DIR_CH_')).length,
      departments: DepartmentRegistry.filter(d => d.id.startsWith('DEPT_CH_')).length,
      offices: OfficeRegistry.filter(o => o.id.startsWith('OFF_CH_')).length,
      modules: ModuleRegistry.filter(m => m.productId === 'JUMO-CHURCH').length,
      submodules: SubmoduleRegistry.filter(s => s.id.startsWith('SUB_CH_')).length,
      workflows: WorkflowRegistry.filter(w => w.id.includes('CH')).length,
      forms: FormRegistry.filter(f => f.id.includes('CH')).length,
      reports: ReportRegistry.filter(r => r.id.includes('CH')).length,
      apis: APIRegistry.filter(a => a.id.includes('CH')).length,
      integrations: IntegrationRegistry.filter(i => i.id.includes('CH')).length,
      webWorkspaces: PortalRegistry.filter(p => p.productId === 'JUMO-CHURCH').length,
      mobileWorkspaces: PortalRegistry.filter(p => p.productId === 'JUMO-CHURCH').length,
      aiCapabilities: AICapabilityRegistry.filter(a => a.productId === 'JUMO-CHURCH').length,
      governanceStructures: 3
    }
  };
}
