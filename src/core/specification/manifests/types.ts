/**
 * JUMO UEOS — Authoritative Product Manifest Schema & Types
 * 
 * Defines immutable, machine-readable manifests for all JUMO Sovereign Products.
 * Every artifact has a stable, globally unique architectural ID.
 */

export interface JumoDirectorateManifest {
  id: string; // e.g. FIN-DIR-001
  code: string;
  name: string;
  description: string;
  leadRole: string;
}

export interface JumoDepartmentManifest {
  id: string; // e.g. FIN-DEPT-001
  directorateId: string;
  code: string;
  name: string;
  description: string;
  headRole: string;
}

export interface JumoOfficeManifest {
  id: string; // e.g. FIN-OFF-001
  departmentId: string;
  directorateId: string;
  code: string;
  name: string;
  description: string;
  officerRole: string;
}

export interface JumoPortalManifest {
  id: string; // e.g. FIN-PORTAL-001
  code: string;
  name: string;
  description: string;
  targetRole: string;
  authLevel: 'PUBLIC' | 'STAFF' | 'FINANCIAL_DUAL' | 'PKI_SOVEREIGN';
  route: string;
}

export interface JumoCapabilityManifest {
  id: string; // e.g. FIN-CAP-001
  moduleId: string;
  code: string;
  name: string;
  description: string;
  serviceAction: string;
  requiredPermission: string;
}

export interface JumoScreenManifest {
  id: string; // e.g. FIN-SCR-001
  moduleId: string;
  title: string;
  viewType: 'DASHBOARD' | 'TABLE' | 'FORM' | 'KANBAN' | 'DETAIL' | 'DOCUMENT';
  route: string;
}

export interface JumoFormManifest {
  id: string; // e.g. FIN-FORM-001
  moduleId: string;
  title: string;
  submitAction: string;
  fieldCount: number;
  validationRules: string[];
}

export interface JumoDashboardManifest {
  id: string; // e.g. FIN-DASH-001
  moduleId: string;
  title: string;
  widgetCount: number;
  kpiMetrics: string[];
}

export interface JumoReportManifest {
  id: string; // e.g. FIN-REP-001
  moduleId: string;
  title: string;
  format: 'TABULAR' | 'SUMMARY' | 'FINANCIAL_STATEMENT' | 'REGULATORY_RETURN';
  exportTypes: ('PDF' | 'CSV' | 'XLSX')[];
}

export interface JumoWorkflowManifest {
  id: string; // e.g. FIN-WF-001
  moduleId: string;
  title: string;
  stages: string[];
  slaHours: number;
  requiredApprovers: string[];
}

export interface JumoDatabaseFieldManifest {
  name: string;
  type: string;
  required: boolean;
  indexed?: boolean;
}

export interface JumoDatabaseEntityManifest {
  id: string; // e.g. FIN-DB-001
  moduleId: string;
  tableName: string;
  primaryKey: string;
  fields: JumoDatabaseFieldManifest[];
  auditLogged: boolean;
}

export interface JumoAPIManifest {
  id: string; // e.g. FIN-API-001
  moduleId: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  endpoint: string;
  requiredPermission: string;
  handlerName: string;
}

export interface JumoRuntimeComponentManifest {
  id: string; // e.g. FIN-RTC-001
  moduleId: string;
  componentName: string;
  renderStrategy: 'METADATA_UNIVERSAL' | 'BESPOKE_INTERACTIVE';
  filePath: string;
}

export interface JumoAIAgentManifest {
  id: string; // e.g. FIN-AI-001
  moduleId: string;
  name: string;
  role: string;
  capabilities: string[];
}

export interface JumoRoleManifest {
  id: string; // e.g. FIN-ROLE-001
  name: string;
  tier: 'GOVERNANCE' | 'EXECUTIVE' | 'OPERATIONAL' | 'CLIENT' | 'PUBLIC';
  permissions: string[];
}

export interface JumoPermissionManifest {
  id: string; // e.g. FIN-PERM-001
  code: string;
  description: string;
}

export interface JumoIntegrationManifest {
  id: string; // e.g. FIN-INT-001
  name: string;
  serviceType: 'PAYMENT_SWITCH' | 'SMS_GATEWAY' | 'CORE_BANKING' | 'GOV_REGISTRY' | 'HSM_VAULT';
  status: 'REQUIRED' | 'OPTIONAL';
}

export interface JumoConfigObjectManifest {
  id: string; // e.g. FIN-CFG-001
  key: string;
  description: string;
  defaultValue: any;
}

export interface JumoTestContractManifest {
  id: string; // e.g. FIN-TEST-001
  targetId: string;
  testType: 'UNIT' | 'INTEGRATION' | 'CONTRACT' | 'SECURITY';
  expectedAssertion: string;
}

export interface JumoModuleManifest {
  id: string; // e.g. FIN-MOD-001
  code: string;
  title: string;
  purpose: string;
  directorateId: string;
  departmentId: string;
  officeId: string;
  portalId: string;
  capabilityIds: string[];
  screenIds: string[];
  formIds: string[];
  dashboardIds: string[];
  reportIds: string[];
  workflowIds: string[];
  databaseEntityIds: string[];
  apiIds: string[];
  runtimeComponentIds: string[];
  aiAgentIds?: string[];
  permissionIds: string[];
}

export interface JumoAuthoritativeProductManifest {
  productId: string; // e.g. prod-fintech
  productCode: string;
  productName: string;
  edition: 'SOVEREIGN_ENTERPRISE_COMMERCIAL';
  version: string;
  classification: 'RESTRICTED';
  
  // 10-Tier Hierarchy Artifacts
  directorates: JumoDirectorateManifest[];
  departments: JumoDepartmentManifest[];
  offices: JumoOfficeManifest[];
  portals: JumoPortalManifest[];
  modules: JumoModuleManifest[];
  capabilities: JumoCapabilityManifest[];
  
  // UI & Runtime Metadata
  screens: JumoScreenManifest[];
  forms: JumoFormManifest[];
  dashboards: JumoDashboardManifest[];
  reports: JumoReportManifest[];
  runtimeComponents: JumoRuntimeComponentManifest[];
  
  // Backend & Persistence
  workflows: JumoWorkflowManifest[];
  databaseEntities: JumoDatabaseEntityManifest[];
  apis: JumoAPIManifest[];
  
  // Intelligence, Security & Config
  aiAgents: JumoAIAgentManifest[];
  roles: JumoRoleManifest[];
  permissions: JumoPermissionManifest[];
  integrations: JumoIntegrationManifest[];
  configurations: JumoConfigObjectManifest[];
  testContracts: JumoTestContractManifest[];
}
