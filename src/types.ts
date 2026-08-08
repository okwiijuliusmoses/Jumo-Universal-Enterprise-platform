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

// 07. JUMO SOFTWARE MANUFACTURING FACTORY
export interface SoftwareBlueprint {
  id: string;
  name: string;
  type: string;
  version: string;
  lastBuildStatus: 'SUCCESS' | 'FAILED' | 'BUILDING' | 'IDLE';
  lastBuildTime: string;
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
