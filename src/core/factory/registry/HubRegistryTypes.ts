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
  | 'JUMO_CLOUD_ECOSYSTEM'
  | 'SOFTWARE_ECOSYSTEM'
  | 'COMMERCIAL_PRODUCTS_ECOSYSTEM'
  | 'RESEARCH_INNOVATION_ECOSYSTEM';

export type VerificationGate = 
  | 'GATE_01' | 'GATE_02' | 'GATE_03' | 'GATE_04' | 'GATE_05'
  | 'GATE_06' | 'GATE_07' | 'GATE_08' | 'GATE_09' | 'GATE_10'
  | 'GATE_11' | 'GATE_12' | 'GATE_13' | 'GATE_14' | 'GATE_15'
  | 'GATE_16' | 'GATE_17' | 'GATE_18' | 'GATE_19' | 'GATE_20';

export interface VerificationLayer {
  layerId: string;
  name: string;
  description: string;
  category: string;
  gate: VerificationGate;
  enabled: boolean;
  mandatory: boolean;
  blocking: boolean;
  severity: 'CRITICAL' | 'WARNING' | 'INFO';
  standards: string[];
}

export interface VerificationProfile {
  profileId: string;
  name: string;
  description: string;
  layerIds: string[];
}

export interface ArchitectureContract {
  id: string;
  version: string;
  specificationId: string;
  status: 'DRAFT' | 'REVIEW' | 'APPROVED';
  productDetails: any; // Simplified for now
  createdAt: string;
  updatedAt: string;
}

export interface EngineeringJob {
  id: string;
  architectureId: string;
  status: 'UNASSIGNED' | 'ASSIGNED' | 'ACTIVE' | 'BLOCKED' | 'COMPLETED';
  assignedEngineers: string[];
  tasks: EngineeringTask[];
  createdAt: string;
}

export interface EngineeringTask {
  id: string;
  title: string;
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
}

export interface EngineeringAgent {
  id: string;
  name: string;
  division: string;
  status: 'ACTIVE' | 'BUSY' | 'OFFLINE';
}

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

export interface CommercialProductsEcosystemRegistryRecord extends AuthoritativeRegistryRecord {
  category: 'COMMERCIAL_PRODUCTS_ECOSYSTEM';
  engineService: string;
  faapLedgerAuthority: boolean;
  digitalPaySettlementBridge: boolean;
}

export interface SoftwareEcosystemRegistryRecord extends AuthoritativeRegistryRecord {
  category: 'SOFTWARE_ECOSYSTEM';
  framework: string;
  targetPlatform: string;
}

export interface ResearchInnovationEcosystemRegistryRecord extends AuthoritativeRegistryRecord {
  category: 'RESEARCH_INNOVATION_ECOSYSTEM';
  experimentalStage: string;
  boundaryGuardsEnforced: boolean;
}

export interface JumoCloudEcosystemRegistryRecord extends AuthoritativeRegistryRecord {
  category: 'JUMO_CLOUD_ECOSYSTEM';
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
