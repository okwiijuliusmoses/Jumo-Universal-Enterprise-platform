// JUMO UEOS — Native AI Engineering Workforce Architecture Types
// Authoritative JUMO-owned AI Workforce definitions & lifecycle types

export type AIWorkforceDivision = 
  | 'ARCHITECTURE'
  | 'ERP_ENGINEERING'
  | 'COMMERCIAL_PRODUCTS_ECOSYSTEM_ENGINEERING'
  | 'SOFTWARE_ENGINEERING'
  | 'INTELLIGENCE'
  | 'SECURITY_AEGIS'
  | 'TESTING_VERIFICATION'
  | 'GUARDIAN_GOVERNANCE'
  | 'SYSTEM_PROVISIONING';

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
  preferredProvider: 'GOOGLE_GENAI' | 'JUMO_LOCAL_RUNTIME' | 'CUSTOM_HYBRID' | 'OPENAI' | 'GEMINI' | 'COPILOT' | 'JUMO_LOCAL';
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

  // Mandatory data contract payload for UI & verification inspectors
  data?: Record<string, any>;

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

export interface ProvisioningTaskRequest {
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

export interface ProvisioningExecutionPlan {
  planId: string;
  request: ProvisioningTaskRequest;
  assignedOrchestratorId: string;
  assignedSwarmAgentIds: string[];
  pipelineGates: PipelineGateResult[];
  status: 'QUEUED' | 'IN_PROGRESS' | 'GUARDIAN_AUDIT' | 'APPROVED' | 'REJECTED' | 'DEPLOYED';
  createdAt: string;
  completedAt?: string;
}
