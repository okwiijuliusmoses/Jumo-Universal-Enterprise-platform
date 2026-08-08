export interface TechStackItem {
  category: string; // e.g., "Frontend", "Backend", "Database", "Hosting"
  technology: string;
  reasoning: string;
}

export interface SchemaField {
  name: string;
  type: string;
  description: string;
  primaryKey: boolean;
  nullable: boolean;
}

export interface DatabaseTable {
  tableName: string;
  type: "Relational" | "Document" | "Key-Value";
  fields: SchemaField[];
  description: string;
}

export interface APIEndpoint {
  path: string;
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  description: string;
  requestBody?: string; // stringified JSON or description
  responseBody: string; // stringified JSON
}

export interface ArchitectureNode {
  id: string;
  label: string;
  type: "Client" | "Server" | "Database" | "Cache" | "ExternalService";
  x: number;
  y: number;
}

export interface ArchitectureConnection {
  from: string;
  to: string;
  label: string;
}

export interface ArchitectureDiagram {
  nodes: ArchitectureNode[];
  connections: ArchitectureConnection[];
}

export interface KanbanTask {
  id: string;
  title: string;
  description: string;
  phase: string; // e.g., "Phase 1: DB Setup", "Phase 2: Core APIs", etc.
  status: "todo" | "doing" | "done";
}

export interface SoftwareBlueprint {
  name: string;
  description: string;
  coreFeatures: string[];
  techStack: TechStackItem[];
  databaseSchema: DatabaseTable[];
  apiContract: APIEndpoint[];
  architectureDiagram: ArchitectureDiagram;
  kanbanTasks: KanbanTask[];
}

export interface ChatMessage {
  role: "user" | "model";
  content: string;
  timestamp: string;
}

export interface SavedProject {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  blueprint: SoftwareBlueprint;
  chatHistory: ChatMessage[];
}

export type WorkspaceId = "faap" | "church" | "sacco" | "ngo" | "alumni" | "owner_center" | "treasury" | "workflow" | "security" | "ai";

export interface WorkspaceNavRoute {
  id: string;
  label: string;
  iconName: string;
}

export interface Workspace {
  id: WorkspaceId;
  name: string;
  iconName: string;
  description: string;
  routes: WorkspaceNavRoute[];
  defaultWidgets: string[];
}

export interface Widget {
  id: string;
  title: string;
  description: string;
  category: string;
  defaultSize: "sm" | "md" | "lg" | "full";
}

export interface UserPreferences {
  theme: "dark" | "light";
  currentWorkspace: WorkspaceId;
  widgetOrder: Record<WorkspaceId, string[]>;
  enabledWidgets: Record<WorkspaceId, string[]>;
  recentItems: Array<{ id: string; name: string; type: string; timestamp: string }>;
  pinnedApps: string[];
  favorites: string[];
}

export interface NotificationItem {
  id: string;
  type: "info" | "success" | "warning" | "alert";
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}

// JUMO UEOS Operational & Manufacturing Types
export interface OperationalNode {
  id: string;
  name: string;
  status: "active" | "standby" | "maintenance" | "offline";
  load: number;
  region: string;
  type: "compute" | "storage" | "edge" | "network";
}

export interface FinancialModule {
  id: string;
  name: string;
  type: "GL" | "AP" | "AR" | "Budget" | "Assets" | "Payroll" | "Tax";
  status: "active" | "pending" | "auditing";
  balance?: string;
  lastSync: string;
}

export interface PaymentChannel {
  id: string;
  provider: string;
  type: "MobileMoney" | "Bank" | "Card" | "QR" | "Wallet";
  status: "active" | "maintenance";
  volume24h: string;
}

export interface SecurityLayer {
  id: string;
  name: string;
  type: "Identity" | "Threat" | "Compliance" | "DataProtection";
  status: "enforced" | "monitoring" | "alert";
  config: Record<string, any>;
}

export interface CloudService {
  id: string;
  name: string;
  category: "Compute" | "Storage" | "Database" | "AI_Ops" | "Integration";
  load: number;
  health: number;
  autoScaling: boolean;
}

export interface ManufacturingModule {
  id: string;
  name: string;
  category: "generator" | "validator" | "deployer" | "monitor";
  status: "idle" | "running" | "completed" | "error";
  progress: number;
  lastAction: string;
}

export interface AIAgent {
  id: string;
  role: string;
  specialization: string;
  status: "active" | "idle" | "thinking";
  capabilities: string[];
  lastInsight?: string;
}

export interface PlatformGovernanceRecord {
  id: string;
  platformName: string;
  version: string;
  status: "draft" | "review" | "approved" | "certified" | "retired";
  complianceScore: number;
  lastAudit: string;
  signatures: string[];
}

