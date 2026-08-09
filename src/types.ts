export type PlatformStatus =
  | 'REGISTERED'
  | 'PROVISIONING'
  | 'ACTIVATING'
  | 'ACTIVE'
  | 'UPGRADING'
  | 'DEGRADED'
  | 'OFFLINE'
  | 'SYNCING'
  | 'SUSPENDED'
  | 'FAILED'
  | 'PARTIALLY IMPLEMENTED';

export interface PlatformScores {
  identity: number;
  runtime: number;
  modules: number;
  workflows: number;
  ai: number;
  integrations: number;
  digitalHybrid: number;
  security: number;
}

export interface PlatformTelemetry {
  uptime: number; // in %
  requests: number; // in requests/sec
  nodeCount: number;
  errorRate: number; // in %
}

export interface Platform {
  id: string;
  name: string;
  version: string;
  description: string;
  status: PlatformStatus;
  health: number; // 0 - 100
  scores: PlatformScores;
  telemetry: PlatformTelemetry;
  aiProfile: {
    name: string;
    model: string;
    activeAgentsCount: number;
    tools: string[];
  };
  isActivated: boolean;
  tenantId: string;
  domain: string;
  instanceId: string;
  // Locked Architecture Properties (Section 5)
  capabilities: string[];
  runtimeState: 'ACTIVE' | 'DEGRADED' | 'STANDBY' | 'STOPPED' | 'PARTIAL';
  activationState: 'DISCOVER' | 'VALIDATE' | 'DEPENDENCY_CHECK' | 'CONFIGURATION_CHECK' | 'IDENTITY_CHECK' | 'DATABASE_CHECK' | 'AI_SERVICE_CHECK' | 'CRYPTOGRAPHIC_CONFIGURATION_CHECK' | 'OFFLINE_HYBRID_CHECK' | 'REGISTER' | 'INITIALIZE' | 'HEALTH_CHECK' | 'TELEMETRY' | 'ACTIVE' | 'INACTIVE';
  lifecycleState: 'DISCOVERED' | 'PROVISIONED' | 'INITIALIZED' | 'RUNNING' | 'DEGRADED' | 'OFFLINE' | 'SUSPENDED';
  dependencies: string[];
  requiredServices: string[];
  configuration: Record<string, any>;
  permissions: string[];
  routes: string[];
  apiBindings: string[];
  offlineCapability: boolean;
  hybridSyncState: 'RECONCILED' | 'PENDING_SYNC' | 'CONFLICT' | 'DISABLED';
}

// Domain-Specific Data Models

// 01. JUMO FAAP
export interface FAAPAccount {
  id: string;
  code: string;
  name: string;
  type: 'ASSET' | 'LIABILITY' | 'EQUITY' | 'REVENUE' | 'EXPENSE';
  balance: number;
}

export interface FAAPTransaction {
  id: string;
  timestamp: string;
  accountCode: string;
  type: 'DEBIT' | 'CREDIT';
  amount: number;
  reference: string;
  approvedBy: string;
  isSynced: boolean;
}

// 02. JUMO DIGITAL PAY
export interface PaymentIntent {
  id: string;
  amount: number;
  currency: string;
  customer: string;
  status: 'SUCCEEDED' | 'PENDING' | 'REFUNDED' | 'FAILED';
  gateway: string;
  timestamp: string;
}

// 03. JUMO TREASURY
export interface LiquidityPool {
  id: string;
  name: string;
  balance: number;
  currency: string;
  allocation: number; // %
}

// 05. JUMO AEGIS
export interface SecurityThreat {
  id: string;
  timestamp: string;
  source: string;
  type: 'DDOS_ATTACK' | 'SPOOFING_ATTEMPT' | 'EXFILTRATION_ALERT' | 'PORT_SCAN';
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  status: 'MITIGATED' | 'QUARANTINED' | 'UNDER_INVESTIGATION';
}

// 09. JUMO AI PLATFORM
export interface AIAgent {
  id: string;
  name: string;
  role: string;
  model: string;
  tools: string[];
  status: 'IDLE' | 'ANALYZING' | 'EXECUTING' | 'OFFLINE';
  lastActive: string;
}

// 07. JUMO UNIVERSAL MANUFACTURING HUB
export interface SoftwareBlueprint {
  id: string;
  name: string;
  type: string;
  version: string;
  lastBuildStatus: 'SUCCESS' | 'FAILED' | 'BUILDING' | 'IDLE';
  lastBuildTime: string;
}

export interface ERPEcosystem {
  id: string;
  name: string;
  category: 'FINANCIAL' | 'PUBLIC_SECTOR' | 'HEALTHCARE' | 'AGRICULTURE' | 'LOGISTICS' | 'DEFENSE';
  version: string;
  status: 'REGISTERED' | 'MIGRATED' | 'VERIFIED' | 'ACTIVE';
  modulesCount: number;
  portalsCount: number;
  lastSync: string;
}

export interface ERPTemplate {
  id: string;
  name: string;
  ecosystemId: string;
  version: string;
  description: string;
  status: 'VERIFIED' | 'STAGING' | 'DEPLOYED';
  requiredServices: string[];
}

export interface ManufacturingSpecification {
  id: string;
  title: string;
  category: 'ERP' | 'COMMERCIAL_PRODUCT' | 'SOFTWARE' | 'INTELLIGENCE' | 'CLOUD';
  architect: string; // 'ChatGPT Architect'
  implementationEngine: string; // 'Gemini Implementation'
  stage: 'DISCOVERY' | 'SPECIFICATION' | 'IMPLEMENTATION' | 'TESTING' | 'AUDIT' | 'DEPLOYED';
  buildStatus: 'SUCCESS' | 'IN_PROGRESS' | 'QUEUED';
  timestamp: string;
}

// 19. JUMO DEVELOPER & API PLATFORM
export interface APIKey {
  id: string;
  key: string;
  label: string;
  permissions: 'READ' | 'WRITE' | 'ADMIN';
  createdAt: string;
  requestsCount: number;
}

// Global Audit Log and Sync Queue
export interface AuditLogEntry {
  id: string;
  timestamp: string;
  platformId: string;
  actor: string;
  action: string;
  details: string;
  severity: 'INFO' | 'WARNING' | 'CRITICAL';
}

export interface SyncItem {
  id: string;
  platformId: string;
  actionType: 'CREATE_TRANSACTION' | 'CREATE_PAYMENT' | 'TRANSFER_LIQUIDITY' | 'ADD_AGENT' | 'CREATE_API_KEY';
  payload: any;
  timestamp: string;
  status: 'PENDING' | 'RESOLVED' | 'CONFLICT_DETECTED';
}
