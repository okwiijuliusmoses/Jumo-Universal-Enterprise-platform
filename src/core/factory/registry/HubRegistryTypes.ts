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

export interface EcosystemVerificationProfile {
  id: string;
  ecosystem: ManufacturingCategory;
  name: string;
  description: string;
  layerIds: string[];
  mandatoryLayerIds: string[];
  config: any;
  version: string;
}

export interface ArchitectureContract {
  id: string;
  version: string;
  specificationId: string;
  status: 'DRAFT' | 'REVIEW' | 'APPROVED' | 'LOCKED';
  productIdentity: {
    name: string;
    ecosystem: ManufacturingCategory;
    sector: string;
    organization: string;
    purpose: string;
    targetUsers: string;
    operatingJurisdiction: string;
    deploymentModel: string;
    tenancyModel: string;
    governmentScale?: string;
    applicationType?: string;
    governmentStandard?: string;
  };
  experienceArchitecture: {
    portals: string[];
    mobileExperience: boolean;
    apiExperience: boolean;
  };
  organizationalArchitecture: {
    ministries: string[];
    departments: string[];
    directorates: string[];
    divisions: string[];
    branches: string[];
    offices: string[];
    units: string[];
    teams: string[];
    committees: string[];
    roles: string[];
    responsibilities: string[];
  };
  functionalArchitecture: {
    modules: string[];
    submodules: string[];
    capabilities: string[];
    services: string[];
    components: string[];
    forms: string[];
    reports: string[];
    dashboards: string[];
    workflows: string[];
    notifications: string[];
    documents: string[];
    search: boolean;
    analytics: boolean;
  };
  dataArchitecture: {
    entities: string[];
    relationships: string[];
    schemas: string[];
    databases: string[];
    documentStorage: string[];
    auditRecords: boolean;
    retention: string;
    backup: string;
    recovery: string;
    synchronization: string;
  };
  integrationArchitecture: {
    jumoServices: string[];
    internalProducts: string[];
    externalApis: string[];
    bankingSystems: boolean;
    governmentSystems: boolean;
    partnerSystems: boolean;
  };
  aiArchitecture: {
    assignedAgents: string[];
    agentResponsibilities: string[];
    modelRequirements: string;
    ragRequirements: boolean;
    knowledgeSources: string[];
    agentPermissions: string[];
    humanApprovalPoints: string[];
    aiSafetyBoundaries: string[];
    auditRequirements: boolean;
  };
  securityArchitecture: {
    authentication: string;
    authorization: string;
    rbac: boolean;
    mfa: boolean;
    zeroTrust: boolean;
    encryption: string;
    secrets: string;
    keyManagement: string;
    networkBoundaries: string[];
    audit: boolean;
    threatMonitoring: boolean;
  };
  deploymentArchitecture: {
    target: string;
    hybridMode: boolean;
    offlineCapability: boolean;
    privateInfrastructure: boolean;
    nodeRequirements: string;
    scaling: string;
    disasterRecovery: boolean;
    backup: string;
    regionalDeployment: string[];
  };
  createdAt: string;
  updatedAt: string;
}

export interface ManufacturingJob {
  id: string;
  architectureId: string;
  productId: string;
  ecosystem: ManufacturingCategory;
  version: string;
  status: ManufacturingJobStatus;
  progress: number;
  assignedWorkforce: EngineeringAssignment[];
  repository: string;
  branch: string;
  commitSha: string;
  buildArtifactId?: string;
  deploymentId?: string;
  verificationProfileId?: string;
  evidence: string[];
  logs: string[];
  createdAt: string;
  updatedAt: string;
}

export type ManufacturingJobStatus =
  | 'DIGITAL_INTAKE'                  // STAGE 01 — DIGITAL INTAKE
  | 'REQUIREMENTS_NORMALIZATION'      // STAGE 02 — REQUIREMENTS NORMALIZATION
  | 'INSTANCE_DEFINED'                // STAGE 03 — PLATFORM INSTANCE DEFINITION
  | 'PROVISIONING'                    // STAGE 04 — PROVISIONING CONFIGURATION
  | 'ARCHITECTURE_RESOLVING'          // STAGE 05 — ARCHITECTURE RESOLUTION
  | 'CONTRACT_GENERATED'              // STAGE 06 — ARCHITECTURE CONTRACT GENERATION
  | 'GOVERNANCE_POLICY_MAPPING'       // STAGE 07 — GOVERNANCE POLICY MAPPING
  | 'SECURITY_CLASSIFICATION'         // STAGE 08 — SECURITY CLASSIFICATION
  | 'DATA_ARCHITECTURE'               // STAGE 09 — DATA ARCHITECTURE
  | 'INTEGRATION_CONTRACTING'         // STAGE 10 — INTEGRATION CONTRACTING
  | 'EXPERIENCE_SPECIFICATION'        // STAGE 11 — EXPERIENCE SPECIFICATION
  | 'AI_WORKFORCE_ASSIGNMENT'         // STAGE 12 — AI WORKFORCE ASSIGNMENT
  | 'DEPENDENCY_RESOLUTION'           // STAGE 13 — DEPENDENCY RESOLUTION
  | 'LAYERS_ASSEMBLING'               // STAGE 14 — LAYERS ASSEMBLY
  | 'INFRASTRUCTURE_DESIGN'           // STAGE 15 — INFRASTRUCTURE DESIGN
  | 'SCHEMA_MANUFACTURING'            // STAGE 16 — SCHEMA MANUFACTURING
  | 'ARTIFACT_GENERATION'             // STAGE 17 — ARTIFACT GENERATION
  | 'COMPILING_BUILDING'              // STAGE 18 — COMPILING & BUILDING
  | 'STATIC_SUPPLY_CHAIN_ANALYSIS'    // STAGE 19 — STATIC SUPPLY CHAIN ANALYSIS
  | 'UNIT_TESTING'                    // STAGE 20 — UNIT TESTING
  | 'INTEGRATION_TESTING'             // STAGE 21 — INTEGRATION TESTING
  | 'SECURITY_VERIFICATION'           // STAGE 22 — SECURITY VERIFICATION
  | 'PERFORMANCE_RESILIENCE_TESTING'  // STAGE 23 — PERFORMANCE & RESILIENCE TESTING
  | 'SYSTEM_E2E_VERIFICATION'         // STAGE 24 — SYSTEM E2E VERIFICATION
  | 'COMPLIANCE_VERIFICATION'         // STAGE 25 — COMPLIANCE VERIFICATION
  | 'CERTIFICATION_ACCEPTANCE'        // STAGE 26 — CERTIFICATION ACCEPTANCE
  | 'RELEASE_CANDIDATE'               // STAGE 27 — RELEASE CANDIDATE
  | 'PRODUCTION_DEPLOYMENT'           // STAGE 28 — PRODUCTION DEPLOYMENT
  | 'PRODUCTION_VERIFICATION'         // STAGE 29 — PRODUCTION VERIFICATION
  | 'PUBLISHING_ACTIVATION'           // STAGE 30 — PUBLISHING / ACTIVATION
  | 'RUNTIME_ACTIVE'                  // STAGE 31 — RUNTIME ACTIVE
  | 'CONTINUOUS_OPERATIONS'           // STAGE 32 — CONTINUOUS OPERATIONS
  // Legacy Aliases for backwards compatibility
  | 'INTAKE' | 'NORMALIZING' | 'SECURITY_HARDENING' | 'DEPENDENCIES_RESOLVING' | 'AI_ASSIGNED' | 'COMPILING' | 'INFRASTRUCTURE_ASSEMBLING' | 'VERIFYING' | 'SECURITY_COMPLIANCE_VERIFYING' | 'INTEGRATION_VERIFYING' | 'SYSTEM_VERIFYING' | 'CERTIFYING' | 'DEPLOYING'
  | 'FAILED'
  | 'BLOCKED';

export interface EngineeringAssignment {
  engineerId: string;
  role: string;
  responsibility: string;
  assignedModule?: string;
  status: 'UNASSIGNED' | 'ASSIGNED' | 'ACTIVE' | 'BLOCKED' | 'WAITING_REVIEW' | 'COMPLETED' | 'REASSIGNED';
  progress: number;
  tasks: EngineeringTask[];
}

export interface EngineeringTask {
  id: string;
  title: string;
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
  architectureRequirementId?: string;
}

export interface EngineeringAgent {
  agentId: string;
  jumoName: string;
  displayName: string;
  role: string;
  division: string;
  specialization: string;
  description: string;
  capabilities: string[];
  status: string;
  workload: number;
  health: 'HEALTHY' | 'DEGRADED' | 'OFFLINE';
  modelPolicy?: any;
  memoryPolicy?: any;
}

export interface BuildArtifact {
  artifactId: string;
  jobId: string;
  hash: string;
  size: number;
  timestamp: string;
  status: 'PASSED' | 'FAILED';
  logs: string[];
}

export interface DeploymentRecord {
  deploymentId: string;
  jobId: string;
  environment: 'SANDBOX' | 'STAGING' | 'PRODUCTION' | 'HYBRID' | 'OFFLINE';
  target: string;
  status: 'QUEUED' | 'RUNNING' | 'SUCCESS' | 'FAILED';
  healthCheck?: 'PASSED' | 'FAILED';
  timestamp: string;
}

export interface VerificationFailureRecord {
  failureId: string;
  jobId: string;
  layerId: string;
  architectureRequirement: string;
  actualResult: string;
  expectedResult: string;
  affectedComponent: string;
  severity: 'CRITICAL' | 'WARNING';
  evidence: string;
  diagnostic: string;
  assignedEngineerId: string;
  correctionStatus: 'PENDING' | 'IN_PROGRESS' | 'RESOLVED';
  retryCount: number;
  timestamp: string;
}

export interface CertificationRecord {
  certificationId: string;
  jobId: string;
  productId: string;
  architectureId: string;
  version: string;
  commitSha: string;
  artifactId: string;
  deploymentId: string;
  verificationPolicyVersion: string;
  evidenceHashes: string[];
  approvalAuthority: string;
  timestamp: string;
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
