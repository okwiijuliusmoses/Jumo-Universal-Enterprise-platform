// Strongly-typed interfaces representing database records in JUMO UEOS

export interface UserRecord {
  email: string;
  name: string;
  role: string;
  tenantId: string;
  trustLevel: string;
}

export interface LedgerAccountRecord {
  code: string;
  name: string;
  category: string;
  balance: number;
}

export interface RegistryRecord {
  name: string;
  type: string;
  status: string;
  tenant: string;
  version: string;
  permissions: string;
  updatedBy: string;
}

export interface AuditLogRecord {
  id: string;
  timestamp: string;
  actor: string;
  action: string;
  status: string;
  details: string;
}

export interface WorkflowRecord {
  id: string;
  name: string;
  triggerEvent: string;
  status: string;
  approvers: string; // Serialized array or raw string of approvers
  lastTriggered: string;
}

export interface AIAgentMemoryRecord {
  id: string;
  agentName: string;
  contextId: string;
  memoryText: string;
  timestamp: string;
}

export interface SecretRecord {
  key: string;
  value: string;
  category: string;
  description: string;
  status: string;
  versionHistory: string; // JSON-serialized array of { value, rotatedAt, rotatedBy }
  lastRotated: string;
  expiresAt?: string;
  createdBy: string;
  updatedBy: string;
}
