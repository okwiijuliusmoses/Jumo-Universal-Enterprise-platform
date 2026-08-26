/**
 * Authoritative Sovereign State Types
 * Houses the core state definitions for the JUMO UEOS Sovereign Platform.
 */

export type ProvisioningCategory = 
  | 'GOVERNMENT'
  | 'EDUCATION'
  | 'FINANCIAL'
  | 'RELIGIOUS'
  | 'NON_PROFIT'
  | 'COMMUNITY'
  | 'ERP_ECOSYSTEM'
  | 'SOFTWARE_ECOSYSTEM';

export type ProvisioningJobStatus = 
  | 'DIGITAL_INTAKE'
  | 'ARCHITECTURE_SPECIFICATION'
  | 'GOVERNANCE_REVIEW'
  | 'ENGINEERING_ASSIGNMENT'
  | 'IMPLEMENTATION_CONSTRUCTION'
  | 'COMPILE_AND_BUILD'
  | 'QUALITY_ASSURANCE'
  | 'CERTIFICATION_STAGING'
  | 'RUNTIME_ACTIVATION_AND_CONTINUOUS_AUDIT'
  | 'FAILED'
  | 'IDLE'
  | 'INTAKE'
  | 'NORMALIZING'
  | 'REQUIREMENTS_NORMALIZATION'
  | 'INSTANCE_DEFINED'
  | 'ARCHITECTURE_RESOLVING'
  | 'CONTRACT_GENERATED'
  | 'GOVERNANCE_POLICY_MAPPING'
  | 'SECURITY_CLASSIFICATION'
  | 'INTEGRATION_CONTRACTING'
  | 'EXPERIENCE_SPECIFICATION'
  | 'AI_WORKFORCE_ASSIGNMENT'
  | 'LAYERS_ASSEMBLING'
  | 'INFRASTRUCTURE_DESIGN'
  | 'ARTIFACT_GENERATION'
  | 'COMPILING_BUILDING'
  | 'COMPILING'
  | 'STATIC_SUPPLY_CHAIN_ANALYSIS'
  | 'UNIT_TESTING'
  | 'SECURITY_VERIFICATION'
  | 'PERFORMANCE_RESILIENCE_TESTING'
  | 'SYSTEM_E2E_VERIFICATION'
  | 'COMPLIANCE_VERIFICATION'
  | 'CERTIFICATION_ACCEPTANCE'
  | 'CERTIFYING'
  | 'RELEASE_CANDIDATE'
  | 'PRODUCTION_DEPLOYMENT'
  | 'DEPLOYING'
  | 'PRODUCTION_VERIFICATION'
  | 'PUBLISHING_ACTIVATION'
  | 'RUNTIME_ACTIVE'
  | 'CONTINUOUS_OPERATIONS'
  | 'SECURITY_HARDENING'
  | 'DEPENDENCIES_RESOLVING'
  | 'AI_ASSIGNED'
  | 'INFRASTRUCTURE_ASSEMBLING'
  | 'VERIFYING'
  | 'SECURITY_COMPLIANCE_VERIFYING'
  | 'INTEGRATION_VERIFYING'
  | 'SYSTEM_VERIFYING'
  | 'BLOCKED'
  | 'DRAFT'
  | 'REVIEW'
  | 'APPROVED'
  | 'COMPILED'
  | 'SPECIFICATION_NORMALIZATION'
  | 'PLATFORM_INSTANCE_DEFINITION'
  | 'ARCHITECTURE_DISCOVERY'
  | 'ARCHITECTURE_EXPANSION'
  | 'ARCHITECTURE_VERIFICATION'
  | 'ARCHITECTURE_CONTRACT_GENERATION'
  | 'HUMAN_ARCHITECT_APPROVAL'
  | 'WORKFORCE_ORCHESTRATION'
  | 'REQUIREMENTS_DECOMPOSITION'
  | 'SYSTEM_DESIGN'
  | 'DATA_ARCHITECTURE'
  | 'API_AND_INTEGRATION_ENGINEERING'
  | 'SECURITY_ENGINEERING'
  | 'APPLICATION_ENGINEERING'
  | 'COMMERCIAL_PRODUCT_ENGINEERING'
  | 'AI_AND_AUTOMATION_ENGINEERING'
  | 'INFRASTRUCTURE_ENGINEERING'
  | 'DEPENDENCY_RESOLUTION'
  | 'SCHEMA_MANUFACTURING'
  | 'SOURCE_AND_ARTIFACT_GENERATION'
  | 'COMPILATION'
  | 'BUILD_ASSEMBLY'
  | 'APPLICATION_COMPLETENESS_VERIFICATION'
  | 'SECURITY_AND_ZERO_TRUST_VERIFICATION'
  | 'INTEGRATION_VERIFICATION'
  | 'END_TO_END_SYSTEM_TESTING'
  | 'REGRESSION_AND_RESILIENCE_TESTING'
  | 'CERTIFICATION_AND_HUMAN_ACCEPTANCE'
  | 'DEPLOYMENT_AND_PUBLISHING'
  | 'PROVISIONING'
  | 'SPECIFICATION_NORMALIZATION'
  | 'PLATFORM_INSTANCE_DEFINITION'
  | 'ARCHITECTURE_DISCOVERY';

export interface ArchitectureContract {
  id: string;
  specificationId: string;
  version: string;
  status: 'PROPOSED' | 'APPROVED' | 'ACTIVE' | 'ARCHIVED' | 'DRAFT' | 'REVIEW' | 'COMPILED';
  productIdentity: {
    name: string;
    acronym?: string;
    ecosystem?: any;
    sector?: string;
    organization?: string;
    purpose?: string;
    targetUsers?: string;
    operatingJurisdiction?: string;
    deploymentModel?: string;
    tenancyModel?: string;
    governmentScale?: string;
    applicationType?: string;
    governmentStandard?: string;
  };
  experienceArchitecture?: any;
  organizationalArchitecture?: any;
  functionalArchitecture?: any;
  dataArchitecture?: any;
  integrationArchitecture?: any;
  aiArchitecture?: {
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
  securityArchitecture?: any;
  deploymentArchitecture?: any;
  governanceHash?: string;
  timestamp: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProvisioningJob {
  id: string;
  architectureId: string;
  productId: string;
  ecosystem: ProvisioningCategory;
  version: string;
  status: ProvisioningJobStatus;
  progress: number;
  assignedWorkforce: any[];
  repository: string;
  branch: string;
  commitSha: string;
  evidence: any[];
  logs: string[];
  createdAt: string;
  updatedAt: string;
  buildArtifactId?: string;
  deploymentId?: string;
}

export interface EngineeringAgent {
  id?: string;
  agentId?: string;
  jumoName: string;
  role: string;
  specialization: string;
  status: 'AVAILABLE' | 'OCCUPIED' | 'MAINTENANCE' | 'OFFLINE' | 'IDLE';
  currentJob?: string;
  workload: number;
  displayName?: string;
  division?: string;
  description?: string;
  capabilities?: string[];
  health?: string;
  modelPolicy?: any;
}

export interface EngineeringAssignment {
  id?: string;
  agentId?: string;
  engineerId?: string;
  jobId?: string;
  assignedAt?: string;
  role?: string;
  responsibility?: string;
  status?: string;
  progress?: number;
  tasks?: any[];
}

export interface EngineeringTask {
  id: string;
  jobId: string;
  title: string;
  description: string;
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
}

export interface BuildArtifact {
  id?: string;
  artifactId?: string;
  jobId: string;
  type?: string;
  uri?: string;
  checksum?: string;
  hash?: string;
  size?: number;
  timestamp: string;
  status?: string;
  logs?: string[];
}

export interface DeploymentRecord {
  id?: string;
  deploymentId?: string;
  jobId: string;
  environment: string;
  status: 'SUCCESS' | 'FAILED';
  target?: string;
  healthCheck?: string;
  nodeId?: string;
  timestamp: string;
}

export interface VerificationFailureRecord {
  id?: string;
  failureId?: string;
  jobId: string;
  stage?: string;
  layerId?: string;
  architectureRequirement?: string;
  actualResult?: string;
  expectedResult?: string;
  affectedComponent?: string;
  severity?: string;
  evidence?: string;
  diagnostic?: string;
  assignedEngineerId?: string;
  correctionStatus?: string;
  retryCount?: number;
  reason?: string;
  timestamp: string;
}

export interface CertificationRecord {
  id?: string;
  certificationId?: string;
  jobId: string;
  productId?: string;
  architectureId?: string;
  version?: string;
  commitSha?: string;
  artifactId?: string;
  deploymentId?: string;
  verificationPolicyVersion?: string;
  evidenceHashes?: string[];
  approvalAuthority?: string;
  status?: 'CERTIFIED' | 'REVOKED';
  issuedBy?: string;
  timestamp: string;
}

export interface VerificationLayer {
  layerId: string;
  name: string;
  category: string;
  gate: string;
  enabled: boolean;
  blocking: boolean;
  standards: string[];
}

import { JumoArchitectureLayer } from "../hub/architecture/JumoHybridArchitectureLayers";

export interface ArchitectureRequest {
  id: string;
  title: string;
  problem: string;
  targetUsers: string;
  organization: string;
  capabilities: string[];
  infrastructure: string;
  integrations: string[];
  aiRequirements: string;
  ecosystemType: ProvisioningCategory;
  sector: string;
  governmentScale?: string;
  applicationType?: string;
  detailedSpecification?: any;
  status: 'DRAFT' | 'REVIEW' | 'APPROVED' | 'COMPILED';
  createdAt: string;
}

export interface JumoBlueprint {
  blueprintId: string;
  name: string;
  type: string;
  version: string;
  lastBuildTime: string;
  compilerStatus: 'OK' | 'DRAFT' | 'ERROR';
  content: string;
  lifecycleState: 'DRAFT' | 'REVIEW' | 'VALIDATED' | 'VERIFIED' | 'APPROVED' | 'COMPILED' | 'READY' | 'PROVISIONED' | 'RETIRED';
}

export interface VerificationGateResult {
  id: string;
  name: string;
  status: 'PASS' | 'FAIL' | 'WARNING' | 'BLOCKED' | 'NOT_RUN';
  evidence: string;
  timestamp: string;
  logs: string[];
}

export interface DeploymentSlot {
  id: string;
  name: string;
  activeRelease: string;
  health: 'HEALTHY' | 'DEGRADED' | 'OFFLINE';
  cpu: number;
  memory: number;
  trafficWeight: number;
}

export interface JumoIncident {
  id: string;
  title: string;
  severity: 'CRITICAL' | 'WARNING' | 'RESOLVED';
  component: string;
  timestamp: string;
}

export interface DatabaseVolume {
  name: string;
  tenant: string;
  pool: string;
  size: string;
  status: 'HEALTHY' | 'DEGRADED' | 'OFFLINE';
}

export interface SchemaMigration {
  id: string;
  name: string;
  type: string;
  status: 'PENDING' | 'RUNNING' | 'COMPLETED' | 'FAILED';
  progress: number;
}

export interface LifecycleAsset {
  name: string;
  type: string;
  status: string;
  step: string;
}

export interface AuditEvent {
  id: string;
  actor: string;
  operation: string;
  details: string;
  timestamp: string;
}

export interface ArchitectureExpansionTrace {
  id: string;
  specificationId: string;
  requirement: string;
  gap: string;
  proposedLayerId: string;
  dependencies: string[];
  assignedAgents: string[];
  reason: string;
  recommendation: string;
  evidenceHash: string;
  status: 'PROPOSED' | 'REVIEWED' | 'APPROVED' | 'IMPLEMENTED';
  timestamp: string;
}

export interface ApplicationBranding {
  name: string;
  productIdentity: string;
  institutionIdentity: string;
  logo: string;
  favicon: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    text: string;
  };
  typography: {
    fontFamily: string;
    baseSize: string;
  };
  theme: 'light' | 'dark' | 'system';
  density: 'compact' | 'comfortable' | 'spacious';
  publicLoginEnabled: boolean;
  publicLandingEnabled: boolean;
  portalAppearance: string;
  navigationAppearance: string;
  footerLegalIdentity: string;
  emailBranding: string;
}

export interface InstallationConfig {
  institution: {
    name: string;
    legalName: string;
    acronym: string;
    country: string;
    region: string;
    administrativeHierarchy: string;
    type: string;
    ownership: string;
    operatingModel: string;
  };
  application: {
    product: string;
    ecosystem: string;
    edition: string;
    grade: string;
    capacity: string;
    deploymentProfile: string;
    tenant: string;
    environment: string;
  };
  enabledModules: string[];
  enabledPortals: string[];
  enabledServices: string[];
  navigation: {
    hierarchy: any[];
    roleBasedAccess: Record<string, string[]>;
    featureFlags: Record<string, boolean>;
  };
  systemDefaults: {
    workflow: string;
    security: string;
    notifications: string;
    dataPolicy: string;
    localization: string;
  };
}

export interface AgentWorkLog {
  id: string;
  agentId: string;
  division: string;
  specialization: string;
  jobId: string;
  architectureId?: string;
  task: string;
  timestamp: string;
  status: 'STARTED' | 'IN_PROGRESS' | 'COMPLETED' | 'FAILED' | 'VERIFIED';
  toolsUsed: string[];
  providerUsed: string;
  result: string;
  verificationResult?: string;
  evidenceHash?: string;
  errors?: string;
  humanApprovalRequired: boolean;
}
export interface CoordinationEvent {
  id: string;
  timestamp: string;
  sourceStudio: string;
  destinationStudio: string;
  entityId: string;
  action: string;
  status: 'PENDING' | 'EXECUTED' | 'FAILED' | 'BLOCKED';
  payload: any;
}

export interface SovereignState {
  branding: ApplicationBranding;
  installation: InstallationConfig;
  architectureRequests: ArchitectureRequest[];
  architectureContracts: ArchitectureContract[];
  blueprints: JumoBlueprint[];
  engineeringAgents: EngineeringAgent[];
  agentWorkLogs: AgentWorkLog[];
  jobs: ProvisioningJob[];
  buildArtifacts: BuildArtifact[];
  deploymentRecords: DeploymentRecord[];
  verificationFailures: VerificationFailureRecord[];
  certificationRecords: CertificationRecord[];
  incidents: JumoIncident[];
  cloudSlots: DeploymentSlot[];
  auditEvents: AuditEvent[];
  eventLog: CoordinationEvent[];
  verificationGates: VerificationGateResult[];
  databaseVolumes: DatabaseVolume[];
  migrations: SchemaMigration[];
  assets: LifecycleAsset[];
  archLayers?: JumoArchitectureLayer[];
  expansionTraces: ArchitectureExpansionTrace[];
  counters: {
    audit: number;
    event: number;
    archReq: number;
    archContract: number;
    job: number;
    artifact: number;
    deployment: number;
    failure: number;
    certification: number;
  };
  cryptographicKeys: {
    primaryKey: string;
    backupKey: string;
    algorithm: string;
    lastRotation: string;
  };
  emergencyMode: boolean;
}
