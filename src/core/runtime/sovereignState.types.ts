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
  latencyMs?: number;
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

export interface InstitutionalDomainConfig {
  institutionId: string;
  tenantId: string;
  primaryDomain: string;
  secondaryDomains: string[];
  subdomains: {
    erp: string;
    auth: string;
    api: string;
    ai: string;
    admin: string;
  };
  routingPolicy: 'DIRECT' | 'LOAD_BALANCED' | 'CDN_ACCELERATED' | 'AIR_GAPPED';
  sslCertStatus: 'VALID' | 'PROVISIONING' | 'EXPIRED' | 'RENEWAL_REQUIRED';
  dnsStatus: 'CONFIGURED' | 'PENDING' | 'VERIFIED' | 'PROPAGATING';
  environment: 'PRODUCTION' | 'STAGING' | 'DEVELOPMENT' | 'LOCAL';
  deploymentTarget: 'CLOUD' | 'INSTITUTIONAL_SERVER' | 'HYBRID' | 'EDGE' | 'LOCAL_RUNTIME';
  verificationToken: string;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AIProviderStatus {
  providerId: 'gemini' | 'openai' | 'copilot' | 'jumo_local';
  name: string;
  type: 'LOCAL' | 'EXTERNAL';
  status: 'HEALTHY' | 'DEGRADED' | 'QUOTA_EXHAUSTED' | 'OFFLINE';
  latencyMs: number;
  errorRate: number;
  activeModel: string;
  supportedModels: string[];
  isAvailable: boolean;
}

export interface AIGatewayState {
  registeredProviders: AIProviderStatus[];
  activePrimaryProvider: 'gemini' | 'openai' | 'copilot' | 'jumo_local';
  fallbackProviderOrder: Array<'gemini' | 'openai' | 'copilot' | 'jumo_local'>;
  localReasoningStatus: 'ENABLED' | 'STANDBY' | 'DISABLED';
  reasoningMode: 'HYBRID_AUTONOMOUS' | 'LOCAL_ONLY' | 'EXTERNAL_PREFERRED';
  isLocalRegistered: boolean;
  gatewayHealth: 'OPERATIONAL' | 'DEGRADED' | 'FAILOVER_ACTIVE';
  totalInferenceRequests: number;
  failedInferenceRequests: number;
}

export interface ProviderQuotaMetrics {
  providerId: 'gemini' | 'openai' | 'copilot' | 'jumo_local';
  tokensUsed: number;
  tokenLimit: number;
  requestsUsed: number;
  requestLimit: number;
  rateLimitPerMin: number;
  quotaResetTimestamp: string;
  isExhausted: boolean;
  status: 'NORMAL' | 'WARNING' | 'EXHAUSTED';
}

export interface ModelEvolutionRecord {
  id: string;
  provider: string;
  modelName: string;
  releaseDate: string;
  discoveryStatus: 'DISCOVERED' | 'TESTING' | 'BENCHMARKING' | 'SANDBOXED' | 'APPROVED' | 'PROMOTED' | 'REJECTED';
  capabilityScore: number;
  benchmarkLatencyMs: number;
  securityScore: number;
  architectureCompatibilityScore: number;
  approvalPolicy: 'AUTO_DETECT' | 'AUTO_TEST' | 'AUTO_BENCHMARK' | 'AUTO_APPROVE' | 'HUMAN_APPROVAL' | 'AUTO_ROLLOUT' | 'ROLLBACK';
  sandboxResult: string;
  timestamp: string;
}

export interface AgentContract {
  agentId: string;
  name: string;
  role: 'GOVERNANCE' | 'MANUFACTURING' | 'ARCHITECTURE' | 'SECURITY' | 'VERIFICATION' | 'FINANCE' | 'EDUCATION' | 'MAINTENANCE' | 'SUPPORT';
  purpose: string;
  capabilities: string[];
  tools: string[];
  permissions: string[];
  knowledgeSources: string[];
  reasoningPolicy: string;
  primaryModel: string;
  fallbackModels: string[];
  localModel: string;
  performanceSpec: { minAccuracyPercentage: number; maxLatencyMs: number };
  securitySpec: { isolationLevel: string; dataBoundary: string };
  status: 'ACTIVE' | 'STANDBY' | 'MAINTENANCE' | 'DEGRADED';
  version: string;
}

export interface MaintenanceAuthorizationToken {
  tokenId: string;
  institutionId: string;
  erpId: string;
  environment: string;
  scope: string;
  permissions: string[];
  issuedAt: string;
  expiresAt: string;
  isRevoked: boolean;
  signature: string;
}

export interface AutonomousMaintenanceSession {
  id: string;
  institutionId: string;
  erpId: string;
  component: string;
  fingerprint: string;
  authToken: MaintenanceAuthorizationToken;
  stage: 'DETECT' | 'DIAGNOSE' | 'PLAN' | 'VERIFY' | 'REPAIR' | 'TEST' | 'DEPLOY' | 'MONITOR' | 'COMPLETED' | 'FAILED' | 'ROLLED_BACK';
  repairLevel: 0 | 1 | 2 | 3 | 4 | 5; // 0: Observe, 1: Auto Safe Recovery, 2: Auto Non-Code Repair, 3: AI Code Repair, 4: Controlled Production Repair, 5: Emergency Rollback
  errorLog: string;
  rootCauseAnalysis: string;
  repairPlan: string[];
  patchCode?: string;
  testResults: Array<{ testName: string; passed: boolean; output: string }>;
  assignedAgents: string[];
  createdAt: string;
  updatedAt: string;
}

export interface StudioSettings {
  studioId: string;
  runtimeSettings: Record<string, any>;
  workflowSettings: Record<string, any>;
  agentSettings: Record<string, any>;
  securitySettings: Record<string, any>;
  automationSettings: Record<string, any>;
  verificationSettings: Record<string, any>;
  maintenanceSettings: Record<string, any>;
}

export interface ProductVersionControl {
  productVersion: string;
  architectureVersion: string;
  runtimeVersion: string;
  agentVersion: string;
  aiCompatibilityVersion: string;
  securityVersion: string;
  schemaVersion: string;
  lastCompatibilityCheck: string;
  updateChannel: 'STABLE' | 'LTS' | 'BETA' | 'CANARY';
  autoUpdatePolicy: 'STAGED_PROMOTION' | 'MANUAL_APPROVAL' | 'IMMEDIATE';
}

export interface OfflineSyncStatus {
  isOnline: boolean;
  lastSyncTimestamp: string;
  pendingLocalOperations: number;
  reconciliationStatus: 'IN_SYNC' | 'PENDING_SYNC' | 'RECONCILING' | 'SYNC_ERROR';
  offlineStorageUsageBytes: number;
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
  
  // AUTONOMOUS INSTITUTIONAL OPERATIONS & LIFECYCLE ARCHITECTURE EXTENSIONS
  domainConfig: InstitutionalDomainConfig;
  aiGateway: AIGatewayState;
  providerQuotas: ProviderQuotaMetrics[];
  modelEvolution: ModelEvolutionRecord[];
  agentContracts: AgentContract[];
  maintenanceSessions: AutonomousMaintenanceSession[];
  studioSettings: Record<string, StudioSettings>;
  productVersion: ProductVersionControl;
  offlineSync: OfflineSyncStatus;

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
    maintenance: number;
  };
  cryptographicKeys: {
    primaryKey: string;
    backupKey: string;
    algorithm: string;
    lastRotation: string;
  };
  emergencyMode: boolean;
}
