// JUMO UEOS — Native AI Engineering Workforce Architecture Types
// Authoritative JUMO-owned AI Workforce definitions & lifecycle types

export type AgentWorkforceClassification = 
  | 'REAL_EXECUTING_ENGINEER'
  | 'REAL_REGISTERED_IDLE'
  | 'REAL_CAPABILITY_NO_EXECUTOR'
  | 'CONFIGURATION_PLACEHOLDER'
  | 'MOCK_SIMULATED_AGENT';

export type AIWorkforceDivision = 
  | 'ARCHITECTURE'
  | 'ERP_ENGINEERING'
  | 'COMMERCIAL_PRODUCTS_ECOSYSTEM_ENGINEERING'
  | 'SOFTWARE_ENGINEERING'
  | 'INTELLIGENCE'
  | 'SECURITY_AEGIS'
  | 'TESTING_VERIFICATION'
  | 'GUARDIAN_GOVERNANCE'
  | 'MANUFACTURING_ORCHESTRATION';

export type SpecializedEngineeringFamily =
  | 'Enterprise Architecture'
  | 'Solution Architecture'
  | 'Product Architecture'
  | 'Domain Architecture'
  | 'Data Architecture'
  | 'Integration Architecture'
  | 'Security Architecture'
  | 'Zero-Trust Engineering'
  | 'Financial Architecture'
  | 'AI Architecture'
  | 'Infrastructure Architecture'
  | 'Cloud/Hybrid Architecture'
  | 'Offline/Edge Architecture'
  | 'UX Architecture'
  | 'Frontend Engineering'
  | 'Backend Engineering'
  | 'API Engineering'
  | 'Database Engineering'
  | 'Workflow Engineering'
  | 'Manufacturing Engineering'
  | 'Configuration Engineering'
  | 'Verification Engineering'
  | 'Test Engineering'
  | 'Compliance Engineering'
  | 'Regulatory Analysis'
  | 'Performance Engineering'
  | 'Reliability Engineering'
  | 'Deployment Engineering'
  | 'Runtime Engineering'
  | 'Observability'
  | 'Documentation/Traceability'
  | 'Certification'
  | 'Release Engineering'
  | 'Migration Engineering'
  | 'Upgrade Engineering'
  | 'Recovery Engineering';

export type AgentLifecycleStatus = 
  | 'REGISTERED'
  | 'AVAILABLE'
  | 'ASSIGNED'
  | 'EXECUTING'
  | 'COMPLETED'
  | 'FAILED'
  | 'BLOCKED'
  | 'CONFIGURED'
  | 'EVALUATED'
  | 'APPROVED'
  | 'ACTIVE'
  | 'MONITORED'
  | 'UPGRADED'
  | 'RE_EVALUATED'
  | 'RETIRED';

export interface ModelPolicy {
  preferredProvider: 'GOOGLE_GENAI' | 'JUMO_LOCAL_RUNTIME' | 'CUSTOM_HYBRID' | 'OPENAI' | 'OPENAI_CODEX' | 'GOOGLE_GEMINI' | 'GITHUB_COPILOT' | 'JUMO_LOCAL';
  provider?: string; // Authoritative provider string
  modelAlias: string; // e.g. 'gemini-3.6-flash', 'gemini-3.1-pro-preview'
  maxOutputTokens: number;
  temperature: number;
  offlineFallbackEnabled: boolean;
}

export interface SecurityPolicy {
  rbacRoles: string[];
  abacAttributes: Record<string, any>;
  zeroTrustVerified: boolean;
  aegisGovernanceApproved: boolean;
  securityClearance?: string; // e.g. "TOP_SECRET_LEVEL_5"
}

export interface AIAgentRecord {
  agentId: string;
  jumoName: string; // e.g. "JUMO Sovereign Architect"
  displayName: string;
  role: string;
  division: AIWorkforceDivision;
  discipline?: SpecializedEngineeringFamily;
  specialization: string;
  description: string;
  capabilities: string[];
  authorizedTools: string[];
  modelPolicy: ModelPolicy;
  knowledgeScopes: string[];
  memoryPolicy: {
    isolationLevel: 'TENANT' | 'GLOBAL_JUMO' | 'PRODUCT_SCOPED' | 'EPHEMERAL_TASK';
    persistentMemoryKey?: string;
  };
  securityPolicy: SecurityPolicy;
  architectureConstraints: string[];
  assignedProducts: string[];
  assignedEcosystems: string[];
  assignedTemplates: string[];
  assignedTasks: string[];
  assignedStudio?: string;
  status: AgentLifecycleStatus;
  version: string;
  createdAt: string;
  updatedAt: string;
  lastEvaluation: string;
  lastAudit: string;
  workload: number;
  currentJob: string | null;
  health: 'HEALTHY' | 'DEGRADED' | 'OFFLINE';
  executionHistory: string[];

  // Operational metrics
  confidenceScore?: number; // 0.0 to 1.0
  outputArtifacts?: string[];
  evidenceLogs?: string[];

  // Mandatory data contract payload for UI & verification inspectors
  data?: Record<string, any>;

  // Workforce Audit & Phase Assignment Extensions
  workforceClassification?: AgentWorkforceClassification;
  assignedPhaseId?: number;
  assignedPhaseName?: string;
  executionAdapter?: string;
  evidenceGeneratedCount?: number;

  // Highly-Detailed Operational Extensions for 420+ cognitive agents
  responsibilities?: string[];
  requiredInputs?: string[];
  architectureDomains?: string[];
  pipelineStages?: string[];
  verificationGates?: string[];
  requiredSkills?: string[];
  dependencies?: string[];
  outputContract?: string;
  evidenceRequirements?: string[];
  escalationRules?: string[];
}

export interface ArchitectureProposal {
  proposalId: string;
  title: string;
  authorAgentId: string;
  authorAgentName: string;
  targetModelId: string;
  proposalType: 'EXPANSION' | 'UPGRADE' | 'REFACTOR' | 'SECURITY_HARDENING' | 'COMPLIANCE_ALIGNMENT';
  status: 'DRAFT' | 'ANALYZING' | 'PENDING_APPROVAL' | 'APPROVED' | 'REJECTED' | 'IMPLEMENTED';
  description: string;
  affectedComponents: string[];
  affectedContracts: string[];
  affectedStudios: string[];
  compatibilityScore: number; // 0 - 100
  invariantsCheckPassed: boolean;
  reasoning: string;
  createdAt: string;
  updatedAt: string;
}

export interface StudioCoordinationEvent {
  eventId: string;
  sourceStudio: 'specification' | 'architecture' | 'manufacturing' | 'verification' | 'deployment' | 'control' | string;
  targetStudios: string[];
  eventType: 'SPECIFICATION_UPDATED' | 'ARCHITECTURE_EXPANDED' | 'MANUFACTURING_JOB_STARTED' | 'VERIFICATION_PASSED' | 'DEPLOYMENT_TRIGGERED' | 'GOVERNANCE_AUDITED';
  payload: Record<string, any>;
  timestamp: string;
  agentId?: string;
}

export interface ArchitectureModelRecord {
  modelId: string;
  name: string;
  category: 
    | 'Product Architecture'
    | 'Enterprise Architecture'
    | 'Domain Architecture'
    | 'Capability Architecture'
    | 'Application Architecture'
    | 'Service Architecture'
    | 'Data Architecture'
    | 'Integration Architecture'
    | 'Security Architecture'
    | 'Infrastructure Architecture'
    | 'Deployment Architecture'
    | 'Runtime Architecture'
    | 'AI Architecture'
    | 'Workforce Architecture'
    | 'Financial Architecture'
    | 'Workflow Architecture'
    | 'Compliance Architecture'
    | 'Verification Architecture'
    | 'Resilience Architecture'
    | 'Offline/Hybrid Architecture'
    | 'Sovereignty Architecture'
    | 'Manufacturing Architecture'
    | 'Product Lifecycle Architecture';
  version: string;
  nodeCount: number;
  contractCount: number;
  verificationScore: number;
  lastExpansionTimestamp: string;
  upgradeProposalCount: number;
  status: 'STABLE' | 'EXPANDING' | 'UPGRADE_PENDING' | 'VERIFIED';
  nodes: { id: string; name: string; type: string; status: string }[];
  contracts: { id: string; name: string; source: string; target: string; verified: boolean }[];
}

export interface ManufacturingTaskRequest {
  taskId: string;
  requestorRole: string;
  institutionType?: string;
  institutionName?: string;
  targetCategory: 'ERP_ECOSYSTEM' | 'JUMO_CLOUD_ECOSYSTEM' | 'SOFTWARE_ECOSYSTEM' | 'COMMERCIAL_PRODUCTS_ECOSYSTEM' | 'RESEARCH_INNOVATION_ECOSYSTEM';
  requestedCapabilities: string[];
  architectureConstraints: string[];
  requestedBy: string;
  timestamp: string;
}

export interface PipelineGateResult {
  gateName: string;
  passed: boolean;
  evaluatorAgentId: string;
  evaluatorAgentName: string;
  comments: string;
  timestamp: string;
}

export interface ManufacturingExecutionPlan {
  planId: string;
  request: ManufacturingTaskRequest;
  assignedOrchestratorId: string;
  assignedSwarmAgentIds: string[];
  pipelineGates: PipelineGateResult[];
  status: 'QUEUED' | 'IN_PROGRESS' | 'GUARDIAN_AUDIT' | 'APPROVED' | 'REJECTED' | 'DEPLOYED';
  createdAt: string;
  completedAt?: string;
}

