import { 
  ArchitectureContract, 
  ManufacturingJob, 
  ManufacturingJobStatus, 
  EngineeringAssignment, 
  EngineeringTask, 
  EngineeringAgent,
  BuildArtifact,
  DeploymentRecord,
  VerificationFailureRecord,
  CertificationRecord,
  ManufacturingCategory
} from "../factory/registry/HubRegistryTypes";
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
  ecosystemType: ManufacturingCategory;
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
  jobs: ManufacturingJob[];
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
