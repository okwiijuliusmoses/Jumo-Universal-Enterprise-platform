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
  | 'MANUFACTURING_ORCHESTRATION';

export type AgentLifecycleStatus = 
  | 'REGISTERED'
  | 'CONFIGURED'
  | 'EVALUATED'
  | 'APPROVED'
  | 'ACTIVE'
  | 'MONITORED'
  | 'UPGRADED'
  | 'RE_EVALUATED'
  | 'RETIRED';

export interface ModelPolicy {
  preferredProvider: 'GOOGLE_GENAI' | 'JUMO_LOCAL_RUNTIME' | 'CUSTOM_HYBRID';
  modelAlias: string; // e.g. 'gemini-2.5-flash', 'gemini-2.5-pro'
  maxOutputTokens: number;
  temperature: number;
  offlineFallbackEnabled: boolean;
}

export interface SecurityPolicy {
  rbacRoles: string[];
  abacAttributes: Record<string, any>;
  zeroTrustVerified: boolean;
  aegisGovernanceApproved: boolean;
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


export interface AgentWorkLog {
  id: string;
  agentId: string;
  division: AIWorkforceDivision | string;
  specialization: string;
  jobId: string;
  architectureId?: string;
  task: string;
  timestamp: string;
  status: 'STARTED' | 'IN_PROGRESS' | 'COMPLETED' | 'FAILED';
  toolsUsed: string[];
  providerUsed: string;
  result: string;
  evidenceHash?: string;
  verificationResult?: string;
  errors?: string;
  humanApprovalRequired: boolean;
}
