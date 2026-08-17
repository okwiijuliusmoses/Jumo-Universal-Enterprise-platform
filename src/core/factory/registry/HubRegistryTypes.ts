// JUMO National Manufacturing Hub — Authoritative Registry Types

export type ManufacturingCategory =
  | 'ERP_ECOSYSTEM'
  | 'JUMO_CLOUD_ECOSYSTEM'
  | 'SOFTWARE_ECOSYSTEM'
  | 'COMMERCIAL_PRODUCTS_ECOSYSTEM'
  | 'RESEARCH_INNOVATION_ECOSYSTEM';

export type ProductLifecycleState =
  | 'DRAFT'
  | 'SPECIFICATION_DRAFT'
  | 'SPECIFICATION_NORMALIZED'
  | 'REQUIREMENTS_VALIDATED'
  | 'AWAITING_SPECIFICATION_APPROVAL'
  | 'SPECIFICATION_APPROVED'
  | 'ARCHITECTURE_INTAKE'
  | 'ARCHITECTURAL_EXPANSION'
  | 'AWAITING_HUMAN_ENGINEERING_APPROVAL'
  | 'ENGINEERING_APPROVED'
  | 'ENGINEERING_REJECTED'
  | 'AWAITING_ARCHITECTURE_APPROVAL'
  | 'ARCHITECTURE_APPROVED'
  | 'ENGINEERING_INTAKE'
  | 'ENGINEERING_IMPLEMENTATION'
  | 'ENGINEERING_VERIFIED'
  | 'FACTORY_READY'
  | 'MANUFACTURING_EXECUTION'
  | 'AWAITING_HUMAN_MANUFACTURING_APPROVAL'
  | 'MANUFACTURING_APPROVED'
  | 'MANUFACTURING_REJECTED'
  | 'MANUFACTURING_VERIFIED'
  | 'BUILDING'
  | 'BUILD_VERIFIED'
  | 'PRODUCT_ASSURANCE'
  | 'CERTIFICATION'
  | 'CERTIFIED'
  | 'PROVISIONING'
  | 'DEPLOYMENT'
  | 'RUNTIME_READY'
  | 'OPERATING'
  | 'FAILED'
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

export type ManufacturingJobStatus = 
  | 'INTAKE'
  | 'SPECIFICATION'
  | 'ARCHITECTURE'
  | 'ENGINEERING'
  | 'AWAITING_HUMAN_ENGINEERING_APPROVAL'
  | 'ENGINEERING_APPROVED'
  | 'ENGINEERING_REJECTED'
  | 'MANUFACTURING'
  | 'BUILD'
  | 'VERIFICATION'
  | 'CERTIFICATION'
  | 'DEPLOYMENT'
  | 'RUNTIME_ACTIVE'
  | 'FAILED'
  | 'BLOCKED'
  | 'DIGITAL_INTAKE'
  | 'SPECIFICATION_NORMALIZATION'
  | 'PLATFORM_INSTANCE_DEFINITION'
  | 'PROVISIONING'
  | 'ARCHITECTURE_DISCOVERY'
  | 'ARCHITECTURE_EXPANSION'
  | 'ARCHITECTURE_VERIFICATION'
  | 'ARCHITECTURE_CONTRACT_GENERATION'
  | 'HUMAN_ARCHITECT_APPROVAL'
  | 'WORKFORCE_ORCHESTRATION'
  | 'REQUIREMENTS_DECOMPOSITION'
  | 'SYSTEM_DESIGN' | 'DATA_ARCHITECTURE' | 'API_AND_INTEGRATION_ENGINEERING' | 'SECURITY_ENGINEERING' | 'APPLICATION_ENGINEERING' | 'COMMERCIAL_PRODUCT_ENGINEERING' | 'AI_AND_AUTOMATION_ENGINEERING' | 'INFRASTRUCTURE_ENGINEERING' | 'DEPENDENCY_RESOLUTION' | 'SCHEMA_MANUFACTURING' | 'SOURCE_AND_ARTIFACT_GENERATION' | 'COMPILATION' | 'BUILD_ASSEMBLY' | 'APPLICATION_COMPLETENESS_VERIFICATION' | 'SECURITY_AND_ZERO_TRUST_VERIFICATION' | 'INTEGRATION_VERIFICATION' | 'END_TO_END_SYSTEM_TESTING' | 'REGRESSION_AND_RESILIENCE_TESTING' | 'CERTIFICATION_AND_HUMAN_ACCEPTANCE' | 'DEPLOYMENT_AND_PUBLISHING' | 'RUNTIME_ACTIVATION_AND_CONTINUOUS_AUDIT' | 'VERIFYING' | 'CERTIFYING' | 'SYSTEM_VERIFYING' | 'FACTORY_READY' | 'MANUFACTURING_VERIFIED' | 'BUILD_VERIFIED' | 'AI_ASSIGNED' | 'COMPILING' | 'DEPLOYING' | 'SPECIFICATION_MAPPING' | 'REQUIREMENTS_NORMALIZATION' | 'GOVERNANCE_POLICY_MAPPING' | 'UNIT_TESTING' | 'CERTIFICATION_ACCEPTANCE' | 'PUBLISHING_ACTIVATION'
  | 'AWAITING_HUMAN_MANUFACTURING_APPROVAL'
  | 'MANUFACTURING_APPROVED'
  | 'MANUFACTURING_REJECTED';

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
  profileId: string;
  name: string;
  ecosystem: ManufacturingCategory;
  layers: VerificationLayer[];
}

export interface EngineeringAssignment {
  engineerId: string;
  agentId?: string;
  discipline?: string;
  role: string;
  status: 'PENDING' | 'ACTIVE' | 'COMPLETED' | 'FAILED' | 'IDLE' | 'AVAILABLE' | 'ASSIGNED' | 'EXECUTING';
  tasks: any[];
  division?: string;
  specialization?: string;
  health?: string;
  jumoName?: string;
  displayName?: string;
  workload?: number;
  capabilities?: string[];
  description?: string;
  modelPolicy?: any;
}

// Aliases for backwards compatibility
export type EngineeringTask = any;
export type EngineeringAgent = EngineeringAssignment;

export interface ReviewGate {
  id: string;
  jobId: string;
  lifecycleStage: string;
  manufacturingStage?: string;
  lifecyclePhaseId?: number;
  lifecyclePhaseName?: string;
  gateType: 'ENGINEERING_APPROVAL' | 'STAGE_APPROVAL' | 'FINAL_ASSEMBLY_APPROVAL' | 'GO_LIVE_APPROVAL';
  status: 'PENDING' | 'APPROVED' | 'APPROVED_WITH_CONDITIONS' | 'REJECTED' | 'CORRECTION_REQUESTED' | 'EVIDENCE_REQUESTED' | 'ESCALATED' | 'DELEGATED' | 'PAUSED';
  riskLevel?: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  requiredAuthority?: string;
  requiredEvidence?: string[];
  artifactRefs: string[];
  evidenceRefs: string[];
  reviewer?: string;
  reviewerRole?: string;
  decision?: 'APPROVE' | 'APPROVE_WITH_CONDITIONS' | 'REJECT' | 'REQUEST_CORRECTION' | 'REQUEST_EVIDENCE' | 'ESCALATE' | 'DELEGATE' | 'PAUSE';
  feedback?: {
    rejectionReason?: string;
    requiredCorrection?: string;
    affectedRequirement?: string;
    affectedArchitectureElement?: string;
    priority?: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
    additionalInstructions?: string;
    conditions?: string[];
  };
  evidenceSnapshot?: Record<string, any>;
  artifactHash?: string;
  previousRevision?: string;
  newRevision?: string;
  auditEvents?: Array<{
    timestamp: string;
    actor: string;
    action: string;
    notes?: string;
  }>;
  createdAt: string;
  decidedAt?: string;
  nextTransition?: string;
  revision: number;
}

export interface EngineeringVerificationReport {
  specification: {
    productName: string;
    domain: string;
    requirements: string[];
  };
  expansion: {
    summary: string;
    derivedRequirements: string[];
    domainDecomposition: string[];
  };
  architecture: {
    layers: string[];
    patterns: string[];
    securityModel: string;
  };
  components: Array<{
    id: string;
    name: string;
    type: string;
    responsibility: string;
  }>;
  requirementsCoverage: Array<{
    requirementId: string;
    satisfiedBy: string[];
  }>;
  dependencies: Array<{
    target: string;
    type: string;
    risk: 'LOW' | 'MEDIUM' | 'HIGH';
  }>;
  risks: Array<{
    category: string;
    description: string;
    mitigation: string;
  }>;
  verificationPlan: string[];
  manufacturingPlan: string[];
}

export interface ExperienceBlueprint {
  id: string;
  jobId: string;
  productId: string;
  publicExperience: {
    landingPage: {
      heroTitle: string;
      heroSubtitle: string;
      primaryCTA: string;
      secondaryCTAs: string[];
      sections: string[];
      seoMetadata: Record<string, string>;
    };
    serviceCatalogue: {
      categories: string[];
      featuredServices: string[];
      searchEnabled: boolean;
    };
    assistant: {
      enabled: boolean;
      name: string;
      welcomeMessage: string;
      knowledgeScope: string[];
    };
    footer: {
      legalLinks: string[];
      socialLinks: string[];
      siteMap: boolean;
    };
  };
  authenticationExperience: {
    methods: string[];
    mfaRequired: boolean;
    onboardingRequired: boolean;
    identityVerification: boolean;
    termsAcceptance: boolean;
  };
  navigationExperience: {
    primaryNav: string[];
    secondaryNav: string[];
    sidebarEnabled: boolean;
    breadcrumbs: boolean;
    roleAware: boolean;
    shortcuts: string[];
  };
  workspaceExperience: {
    dashboardLayout: 'GRID' | 'WIDGETS' | 'LIST';
    widgets: string[];
    dataDensity: 'COMPACT' | 'STANDARD' | 'SPACIOUS';
    contextSwitching: boolean;
    toolbars: boolean;
  };
  mobileExperience: {
    responsive: boolean;
    pwaEnabled: boolean;
    offlineCapability: boolean;
    touchOptimizations: boolean;
  };
  localization: {
    defaultLanguage: string;
    supportedLanguages: string[];
    currency: string;
    dateFormat: string;
    numberFormat: string;
    timezone: string;
    rtlSupport: boolean;
  };
  accessibility: {
    target: 'WCAG_AA' | 'WCAG_AAA';
    features: string[];
    contrastTarget: string;
    reducedMotion: boolean;
  };
  aiExperience: {
    persona: string;
    capabilities: string[];
    safetyGuardrails: string[];
    administrativeAssistant: boolean;
    domainReasoning: boolean;
  };
  advertisingExperience: {
    enabled: boolean;
    placements: string[];
    revenueModel: string;
  };
  communicationExperience: {
    channels: string[];
    templates: string[];
    preferencesEnabled: boolean;
    emergencyAlerts: boolean;
  };
  searchExperience: {
    globalSearch: boolean;
    aiPowered: boolean;
    filters: string[];
  };
  supportExperience: {
    helpCenter: boolean;
    ticketing: boolean;
    documentation: boolean;
    feedbackLoop: boolean;
  };
  designSystem: {
    typography: string;
    primaryColor: string;
    secondaryColor: string;
    radius: string;
    motionLevel: 'NONE' | 'SUBTLE' | 'DYNAMIC';
  };
  trustSecurityExperience: {
    verificationBadges: boolean;
    privacyDashboard: boolean;
    sessionTransparency: boolean;
    auditVisibility: boolean;
  };
  analyticsExperience: {
    usageAnalytics: boolean;
    performanceMonitoring: boolean;
    businessROI: boolean;
  };
}

export interface ManufacturingJob {
  id: string;
  architectureId?: string;
  blueprintId?: string;
  productId: string;
  ecosystem: ManufacturingCategory;
  version: string;
  status: ManufacturingJobStatus;
  currentLifecycleState?: ProductLifecycleState;
  progress: number;
  assignedWorkforce: EngineeringAssignment[];
  repository: string;
  branch: string;
  commitSha: string;
  buildArtifactId?: string;
  deploymentId?: string;
  verificationProfileId?: string;
  evidence: any[];
  logs: string[];
  reviewGates?: ReviewGate[];
  engineeringReport?: EngineeringVerificationReport;
  blueprint?: ArchitectureContract;
  experienceBlueprint?: ExperienceBlueprint;
  createdAt: string;
  updatedAt: string;
  name?: string;
  description?: string;
  layerIds?: string[];
  mandatoryLayerIds?: string[];
  config?: any;
}

export interface ProductManufacturingJob extends ManufacturingJob {
  jobId: string;
  currentLifecycleState: ProductLifecycleState;
  currentGlobalStage: string;
  currentManufacturingStage: string;
  stageStates: Record<string, string>;
  approvalStates: Record<string, string>;
  agentAssignments: Record<string, string[]>;
  providerAssignments: Record<string, any>;
  artifacts: Record<string, any>;
  verificationEvidence: any[];
  errors: any[];
  timestamps: Record<string, string>;
  correlationId: string;
  idempotencyKey: string;
  specificationId: string;
  specificationVersion: string;
  blueprintVersion?: string;
  engineeringArtifactId?: string;
  manufacturingArtifactId?: string;
  certificationId?: string;
  runtimeInstanceId?: string;
}

export interface ArchitectureContract {
  id: string;
  jobId?: string;
  productId?: string;
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
  };
  experienceArchitecture: {
    portals: string[];
    mobileExperience: boolean;
    apiExperience: boolean;
    experienceBlueprintId: string;
  };
  experienceBlueprint: ExperienceBlueprint;
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
  domainArchitecture: {
    domainIdentifier: string;
    coreWorkflows: string[];
    dataEntitlements: string[];
    businessRules: string[];
  };
  technicalArchitecture: {
    computeTier: string;
    databaseType: string;
    cacheStrategy: string;
    eventBus: string;
    apiGateway: string;
    securityProtocol: string;
  };
  manufacturingDirectives: {
    requiredLayers: string[];
    priorityModules: string[];
    integrationTargets: string[];
  };
  createdAt: string;
  updatedAt: string;
}

export interface ProductArtifactManifest {
  artifactId: string;
  productId: string;
  version: string;
  type: 
    | 'SPECIFICATION_ARTIFACT'
    | 'ARCHITECTURE_ARTIFACT'
    | 'ENGINEERING_ARTIFACT'
    | 'MANUFACTURING_ARTIFACT'
    | 'BUILD_ARTIFACT'
    | 'CERTIFICATION_ARTIFACT'
    | 'DEPLOYMENT_ARTIFACT'
    | 'RUNTIME_ARTIFACT';
  sourceJobId: string;
  sourceStage: string;
  content: any;
  dependencies: string[];
  integrityHash: string;
  createdAt: string;
  status: 'PENDING' | 'VALID' | 'VERIFIED' | 'FAILED';
  evidence: any[];
}

export interface ProductInstanceDefinition {
  instanceId: string;
  productId: string;
  deploymentId: string;
  status: 'INITIALIZING' | 'ACTIVE' | 'TERMINATED' | 'UPGRADING' | 'PROVISIONED' | 'RUNNING';
  config: any;
  endpoint: string;
  activatedAt: string;
  version?: string;
  id?: string;
  buildArtifactId?: string;
  certificationId?: string;
  manifest?: any;
  configuration?: any;
  createdAt?: string;
  definitionId?: string;
  jobId?: string;
  environment?: string;
  telemetry?: any;
}

// Aliases
export type RuntimeInstance = ProductInstanceDefinition;

export interface CertificationRecord {
  certificationId: string;
  jobId: string;
  productId: string;
  authority: string;
  timestamp: string;
  seal: string;
  evidence: any[];
  id?: string;
  architectureId?: string;
  version?: string;
  commitSha?: string;
  artifactId?: string;
  deploymentId?: string;
  verificationPolicyVersion?: string;
  evidenceHashes?: string[];
  approvalAuthority?: string;
}

export interface DeploymentRecord {
  deploymentId: string;
  jobId: string;
  productId: string;
  target: string;
  status: 'SUCCESS' | 'FAILED' | 'PENDING';
  timestamp: string;
  logs: string[];
  slotId?: string;
  id?: string;
  environment?: string;
  healthCheck?: any;
}

export interface BuildArtifact {
  artifactId: string;
  jobId: string;
  productId: string;
  version: string;
  hash: string;
  size: number;
  timestamp: string;
  status?: string;
  logs?: string[];
}

export interface VerificationFailureRecord {
  failureId: string;
  jobId: string;
  stage: string;
  reason: string;
  evidence: any;
  timestamp: string;
  severity?: string;
  diagnostic?: string;
  affectedComponent?: string;
  assignedEngineerId?: string;
  layerId?: string;
  architectureRequirement?: string;
  actualResult?: string;
  expectedResult?: string;
  correctionStatus?: string;
  retryCount?: number;
}

export interface AuthoritativeRegistryRecord {
  id: string;
  productId: string;
  name: string;
  version: string;
  ecosystem: ManufacturingCategory;
  verificationStatus: 'VERIFIED' | 'UNVERIFIED' | 'AUDIT_REQUIRED';
  lastAuditTimestamp: string;
  metadata?: Record<string, any>;
  registryId?: string;
  lifecycleState?: string;
  category?: string;
  repository?: string;
  branch?: string;
  implementationVersion?: string;
  architectureBaseline?: string;
  dependencies?: string[];
  capabilities?: string[];
  services?: string[];
  apis?: string[];
  testStatus?: string;
  deploymentStatus?: string;
  upgradeStatus?: string;
  maintenanceStatus?: string;
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
