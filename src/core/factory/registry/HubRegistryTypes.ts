// JUMO National Manufacturing Hub — Authoritative Registry Types
// Phase 1: Registry Foundation Only

export type ProductLifecycleState = 
  | 'DRAFT'
  | 'DESIGNED'
  | 'IN_MANUFACTURING'
  | 'TESTING'
  | 'AUDIT'
  | 'APPROVED'
  | 'DEPLOYED'
  | 'OPERATIONAL'
  | 'MAINTENANCE'
  | 'UPGRADE_PENDING'
  | 'UPGRADING'
  | 'DEPRECATED'
  | 'RETIRED';

export type ManufacturingCategory =
  | 'ERP_ECOSYSTEM'
  | 'COMMERCIAL_PRODUCT'
  | 'SOFTWARE_PRODUCT'
  | 'INTELLIGENCE_AI'
  | 'PLATFORM'
  | 'CLOUD_SERVICE'
  | 'FUTURE_MANUFACTURING';

export interface AuthoritativeRegistryRecord {
  registryId: string;
  name: string;
  category: ManufacturingCategory;
  lifecycleState: ProductLifecycleState;
  version: string;
  repository?: string;
  branch?: string;
  implementationVersion: string;
  architectureBaseline: string;
  dependencies: string[];
  capabilities: string[];
  services: string[];
  apis: string[];
  testStatus: 'PASSED' | 'FAILED' | 'PENDING' | 'SKIPPED';
  deploymentStatus: 'PROVISIONED' | 'DEPLOYED' | 'STANDBY' | 'OFFLINE';
  upgradeStatus: 'UP_TO_DATE' | 'UPGRADE_AVAILABLE' | 'UPGRADING' | 'FAILED';
  maintenanceStatus: 'HEALTHY' | 'WARNING' | 'MAINTENANCE_REQUIRED';
  verificationStatus: 'VERIFIED' | 'UNVERIFIED' | 'AUDIT_REQUIRED';
  lastAuditTimestamp: string;
  metadata?: Record<string, any>;
}

export interface ERPEcosystemRegistryRecord extends AuthoritativeRegistryRecord {
  category: 'ERP_ECOSYSTEM';
  supportedTemplates: string[];
  supportedModules: string[];
  supportedPortals: string[];
  supportedWorkflows: string[];
  governanceModel: string;
}

export interface CommercialProductRegistryRecord extends AuthoritativeRegistryRecord {
  category: 'COMMERCIAL_PRODUCT';
  engineService: string;
  faapLedgerAuthority: boolean;
  digitalPaySettlementBridge: boolean;
}

export interface SoftwareProductRegistryRecord extends AuthoritativeRegistryRecord {
  category: 'SOFTWARE_PRODUCT';
  framework: string;
  targetPlatform: string;
}

export interface IntelligenceRegistryRecord extends AuthoritativeRegistryRecord {
  category: 'INTELLIGENCE_AI';
  agentSwarmId?: string;
  boundaryGuardsEnforced: boolean;
  modelFamily: string;
}

export interface CloudServiceRegistryRecord extends AuthoritativeRegistryRecord {
  category: 'CLOUD_SERVICE';
  nodeCluster: string;
  autoScaling: boolean;
}

export interface BlueprintRegistryRecord {
  blueprintId: string;
  name: string;
  type: string;
  version: string;
  lastBuildTime: string;
  compilerStatus: 'OK' | 'ERROR' | 'COMPILING';
  sourceCodeHash?: string;
}

export interface ComponentRegistryRecord {
  componentId: string;
  name: string;
  type: string;
  version: string;
  propsContract: Record<string, any>;
}

export interface ModuleRegistryRecord {
  moduleId: string;
  name: string;
  category: string;
  config: Record<string, any>;
}

export interface PortalRegistryRecord {
  portalId: string;
  name: string;
  roles: string[];
  modules: string[];
}

export interface FormRegistryRecord {
  formId: string;
  name: string;
  fields: Array<{ name: string; type: string; required: boolean }>;
}

export interface WorkflowRegistryRecord {
  workflowId: string;
  name: string;
  steps: Array<{ stepId: string; action: string; role: string }>;
}

export interface DeploymentRegistryRecord {
  deploymentId: string;
  targetEnvironment: 'PRODUCTION' | 'STAGING' | 'SANDBOX';
  deployedBy: string;
  deployedAt: string;
  healthStatus: 'HEALTHY' | 'DEGRADED' | 'DOWN';
}

export interface VerificationRegistryRecord {
  verificationId: string;
  recordId: string;
  auditor: string;
  passed: boolean;
  score: number;
  report: string;
  timestamp: string;
}

export interface UpgradeRegistryRecord {
  upgradeId: string;
  recordId: string;
  fromVersion: string;
  toVersion: string;
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'ROLLED_BACK';
  executedAt: string;
}

export interface MaintenanceRegistryRecord {
  maintenanceId: string;
  recordId: string;
  type: 'ROUTINE' | 'EMERGENCY' | 'PATCH';
  scheduledAt: string;
  completedAt?: string;
  logs: string[];
}
