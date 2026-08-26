// JUMO UEOS Database Table Schemas & Validation Rule Definitions

export interface TableField {
  name: string;
  type: string;
  primaryKey: boolean;
  nullable: boolean;
  description: string;
}

export interface TableSchema {
  tableName: string;
  fields: TableField[];
  description: string;
}

// Canonical Schemas for FAAP, Identity, Registries, Workflows, and AI Memory
export const UEOS_SCHEMAS: Record<string, TableSchema> = {
  users: {
    tableName: "users",
    description: "Multi-tenant user profile details with RBAC role metadata.",
    fields: [
      { name: "email", type: "VARCHAR(255)", primaryKey: true, nullable: false, description: "Unique email identifier" },
      { name: "name", type: "VARCHAR(255)", primaryKey: false, nullable: false, description: "User full display name" },
      { name: "role", type: "VARCHAR(100)", primaryKey: false, nullable: false, description: "Assigned Security Role (e.g., FAAP_Controller, SecOps_Administrator)" },
      { name: "tenantId", type: "VARCHAR(100)", primaryKey: false, nullable: false, description: "Associated tenant node domain ID" },
      { name: "trustLevel", type: "VARCHAR(50)", primaryKey: false, nullable: false, description: "Security sandbox clearance status" }
    ]
  },
  ledger_accounts: {
    tableName: "ledger_accounts",
    description: "FAAP Double-Entry Chart of Accounts containing current balances.",
    fields: [
      { name: "code", type: "VARCHAR(50)", primaryKey: true, nullable: false, description: "Unique General Ledger Account Code" },
      { name: "name", type: "VARCHAR(255)", primaryKey: false, nullable: false, description: "Account display name" },
      { name: "category", type: "VARCHAR(100)", primaryKey: false, nullable: false, description: "Asset, Liability, Equity, Revenue, or Expense" },
      { name: "balance", type: "DOUBLE PRECISION", primaryKey: false, nullable: false, description: "Current account balance (Debit/Credit-adjusted)" }
    ]
  },
  registries: {
    tableName: "registries",
    description: "JUMO UEOS dynamic platform capabilities, domains, services, and extensions.",
    fields: [
      { name: "name", type: "VARCHAR(255)", primaryKey: true, nullable: false, description: "Registry component unique identifier name" },
      { name: "type", type: "VARCHAR(100)", primaryKey: false, nullable: false, description: "Domain, Service, AI, Security, Module, etc." },
      { name: "status", type: "VARCHAR(50)", primaryKey: false, nullable: false, description: "Active, Inactive, Standby, or Deprecated" },
      { name: "tenant", type: "VARCHAR(100)", primaryKey: false, nullable: false, description: "Tenant bounding ID or Global" },
      { name: "version", type: "VARCHAR(50)", primaryKey: false, nullable: false, description: "Version semantic tag" },
      { name: "permissions", type: "VARCHAR(255)", primaryKey: false, nullable: false, description: "RBAC permission requirements for invocation" },
      { name: "updatedBy", type: "VARCHAR(255)", primaryKey: false, nullable: false, description: "User or agent that executed the registry transaction" }
    ]
  },
  audit_logs: {
    tableName: "audit_logs",
    description: "Immutable, chronological ledger of all platform and transaction audits.",
    fields: [
      { name: "id", type: "VARCHAR(50)", primaryKey: true, nullable: false, description: "Cryptographically verifiable log event ID" },
      { name: "timestamp", type: "TIMESTAMP", primaryKey: false, nullable: false, description: "ISO 8601 creation timestamp" },
      { name: "actor", type: "VARCHAR(255)", primaryKey: false, nullable: false, description: "User, machine role, or AI agent that triggered the action" },
      { name: "action", type: "VARCHAR(100)", primaryKey: false, nullable: false, description: "Event action descriptor (e.g., LEDGER_POST, REGISTRY_INJECT)" },
      { name: "status", type: "VARCHAR(50)", primaryKey: false, nullable: false, description: "success, failed, or blocked" },
      { name: "details", type: "TEXT", primaryKey: false, nullable: false, description: "Full diagnostic detail string for auditing" }
    ]
  },
  workflows: {
    tableName: "workflows",
    description: "Automation definitions and active triggers loaded in the orchestration engine.",
    fields: [
      { name: "id", type: "VARCHAR(50)", primaryKey: true, nullable: false, description: "Workflow configuration ID" },
      { name: "name", type: "VARCHAR(255)", primaryKey: false, nullable: false, description: "Workflow human-readable title" },
      { name: "triggerEvent", type: "VARCHAR(255)", primaryKey: false, nullable: false, description: "System trigger metric boundary" },
      { name: "status", type: "VARCHAR(50)", primaryKey: false, nullable: false, description: "Active or Inactive" },
      { name: "approvers", type: "TEXT", primaryKey: false, nullable: false, description: "JSON list of required human/AI approver profiles" },
      { name: "lastTriggered", type: "VARCHAR(100)", primaryKey: false, nullable: false, description: "ISO timestamp or Never" }
    ]
  },
  ai_agent_memory: {
    tableName: "ai_agent_memory",
    description: "Durable memory and decision log for multi-agent enterprise helpers.",
    fields: [
      { name: "id", type: "VARCHAR(100)", primaryKey: true, nullable: false, description: "Durable memory ID" },
      { name: "agentName", type: "VARCHAR(100)", primaryKey: false, nullable: false, description: "Name of the AI Agent (e.g. LedgerAuditor, ComplianceOfficer)" },
      { name: "contextId", type: "VARCHAR(100)", primaryKey: false, nullable: false, description: "Session or workflow reference ID" },
      { name: "memoryText", type: "TEXT", primaryKey: false, nullable: false, description: "Short/long-term context string" },
      { name: "timestamp", type: "TIMESTAMP", primaryKey: false, nullable: false, description: "Timestamp of logging" }
    ]
  },
  secrets_vault: {
    tableName: "secrets_vault",
    description: "JUMO UEOS secure, encrypted secrets and credentials store.",
    fields: [
      { name: "key", type: "VARCHAR(255)", primaryKey: true, nullable: false, description: "Unique configuration credential key" },
      { name: "value", type: "TEXT", primaryKey: false, nullable: false, description: "AES-256 encrypted value of the credential" },
      { name: "category", type: "VARCHAR(100)", primaryKey: false, nullable: false, description: "Category classification of secret" },
      { name: "description", type: "TEXT", primaryKey: false, nullable: true, description: "Credential description and usage context" },
      { name: "status", type: "VARCHAR(50)", primaryKey: false, nullable: false, description: "Active, Expiring, or Expired" },
      { name: "versionHistory", type: "TEXT", primaryKey: false, nullable: false, description: "JSON list representing version history of rotations" },
      { name: "lastRotated", type: "VARCHAR(100)", primaryKey: false, nullable: false, description: "ISO timestamp or date of last rotation" },
      { name: "expiresAt", type: "VARCHAR(100)", primaryKey: false, nullable: true, description: "Optional credential expiration date" },
      { name: "createdBy", type: "VARCHAR(255)", primaryKey: false, nullable: false, description: "User or system agent that registered key" },
      { name: "updatedBy", type: "VARCHAR(255)", primaryKey: false, nullable: false, description: "User or system agent that updated key" }
    ]
  }
};
