/**
 * JUMO UEOS
 * Universal Shared Services Fabric
 *
 * Architectural rule:
 *
 * Every manufactured JUMO product, ERP, platform, application,
 * ecosystem and institutional deployment consumes shared services
 * through this contract.
 *
 * Implementations remain configurable.
 * Providers are replaceable.
 * No individual ERP is permitted to reinvent sovereign services.
 */

export type SharedServiceDomain =
  | "IDENTITY"
  | "SECURITY"
  | "ACCOUNTING"
  | "FAAP"
  | "TREASURY"
  | "PAYMENTS"
  | "COMMUNICATION"
  | "AI"
  | "CLOUD"
  | "DATA"
  | "STORAGE"
  | "INTEGRATION"
  | "WORKFLOW"
  | "AUTOMATION"
  | "AUDIT"
  | "OBSERVABILITY"
  | "BACKUP"
  | "DISASTER_RECOVERY"
  | "COMPLIANCE"
  | "DOCUMENTS"
  | "SEARCH"
  | "NOTIFICATION"
  | "VERIFICATION"
  | "REGISTRY"
  | "DEPLOYMENT"
  | "CONFIGURATION";

export type SharedServiceMode =
  | "LOCAL"
  | "PRIVATE_CLOUD"
  | "PUBLIC_CLOUD"
  | "HYBRID"
  | "MULTI_CLOUD"
  | "EXTERNAL"
  | "DISABLED";

export type ServiceHealth =
  | "HEALTHY"
  | "DEGRADED"
  | "OFFLINE"
  | "NOT_CONFIGURED";

export interface JumoProviderConfiguration {
  providerId: string;
  displayName: string;
  mode: SharedServiceMode;
  enabled: boolean;
  priority: number;
  endpoint?: string;
  region?: string;
  model?: string;
  credentialReference?: string;
  capabilities: string[];
  metadata?: Record<string, unknown>;
}

export interface JumoSharedServiceDefinition {
  serviceId: string;
  domain: SharedServiceDomain;
  name: string;
  description: string;

  required: boolean;

  configurable: boolean;

  defaultMode: SharedServiceMode;

  providers: JumoProviderConfiguration[];

  health: ServiceHealth;

  capabilities: string[];

  dependencies: string[];

  securityPolicies: string[];

  auditEnabled: boolean;

  tenantIsolated: boolean;

  sovereignControlled: boolean;

  metadata?: Record<string, unknown>;
}

export interface JumoSharedServicesProfile {
  profileId: string;
  name: string;
  description: string;

  services: Record<string, JumoSharedServiceDefinition>;

  globalPolicies: {
    zeroTrust: boolean;
    auditEverything: boolean;
    tenantIsolation: boolean;
    encryptionRequired: boolean;
    providerFailover: boolean;
    humanApprovalForCriticalActions: boolean;
    verificationRequired: boolean;
    regressionRequired: boolean;
  };

  createdAt: string;
  updatedAt: string;
}

export const JUMO_SHARED_SERVICE_IDS = {
  IDENTITY: "identity",
  SECURITY: "security",
  ACCOUNTING: "accounting",
  FAAP: "faap",
  TREASURY: "treasury",
  PAYMENTS: "payments",
  COMMUNICATION: "communication",
  AI: "ai",
  CLOUD: "cloud",
  DATA: "data",
  STORAGE: "storage",
  INTEGRATION: "integration",
  WORKFLOW: "workflow",
  AUTOMATION: "automation",
  AUDIT: "audit",
  OBSERVABILITY: "observability",
  BACKUP: "backup",
  DISASTER_RECOVERY: "disaster-recovery",
  COMPLIANCE: "compliance",
  DOCUMENTS: "documents",
  SEARCH: "search",
  NOTIFICATION: "notification",
  VERIFICATION: "verification",
  REGISTRY: "registry",
  DEPLOYMENT: "deployment",
  CONFIGURATION: "configuration",
} as const;

function provider(
  providerId: string,
  displayName: string,
  mode: SharedServiceMode,
  priority: number,
  capabilities: string[],
  extra: Partial<JumoProviderConfiguration> = {},
): JumoProviderConfiguration {
  return {
    providerId,
    displayName,
    mode,
    enabled: true,
    priority,
    capabilities,
    ...extra,
  };
}

function service(
  serviceId: string,
  domain: SharedServiceDomain,
  name: string,
  description: string,
  capabilities: string[],
  dependencies: string[],
  providers: JumoProviderConfiguration[],
  extra: Partial<JumoSharedServiceDefinition> = {},
): JumoSharedServiceDefinition {
  return {
    serviceId,
    domain,
    name,
    description,
    required: true,
    configurable: true,
    defaultMode: "HYBRID",
    providers,
    health: "NOT_CONFIGURED",
    capabilities,
    dependencies,
    securityPolicies: [
      "AEGIS_ZERO_TRUST",
      "TENANT_ISOLATION",
      "AUDIT_TRAIL",
      "ENCRYPTION_AT_REST",
      "ENCRYPTION_IN_TRANSIT",
    ],
    auditEnabled: true,
    tenantIsolated: true,
    sovereignControlled: true,
    ...extra,
  };
}

/**
 * Canonical shared-services profile.
 *
 * This is intentionally provider-neutral.
 */
export function createDefaultJumoSharedServicesProfile(): JumoSharedServicesProfile {
  const services: Record<string, JumoSharedServiceDefinition> = {};

  services.identity = service(
    "identity",
    "IDENTITY",
    "JUMO Identity Fabric",
    "Universal identity, authentication, authorization and tenant identity.",
    [
      "AUTHENTICATION",
      "AUTHORIZATION",
      "RBAC",
      "ABAC",
      "SSO",
      "MFA",
      "IDENTITY_VERIFICATION",
      "TENANT_IDENTITY",
    ],
    [],
    [
      provider(
        "jumo-identity",
        "JUMO Sovereign Identity",
        "LOCAL",
        1,
        ["AUTH", "RBAC", "ABAC", "MFA", "SSO"],
      ),
      provider(
        "external-identity",
        "External Identity Provider",
        "EXTERNAL",
        20,
        ["OIDC", "SAML", "SSO"],
      ),
    ],
  );

  services.security = service(
    "security",
    "SECURITY",
    "JUMO AEGIS Security Fabric",
    "Universal security, zero-trust enforcement, secrets and threat governance.",
    [
      "ZERO_TRUST",
      "SECRETS",
      "KEY_MANAGEMENT",
      "POLICY_ENFORCEMENT",
      "THREAT_DETECTION",
      "INCIDENT_RESPONSE",
      "SECURITY_TELEMETRY",
    ],
    ["identity"],
    [
      provider(
        "jumo-aegis",
        "JUMO AEGIS",
        "LOCAL",
        1,
        [
          "ZERO_TRUST",
          "SECRETS",
          "KEYS",
          "POLICY",
          "THREAT_DETECTION",
        ],
      ),
    ],
  );

  services.accounting = service(
    "accounting",
    "ACCOUNTING",
    "JUMO Universal Accounting",
    "Single accounting layer shared across every JUMO product.",
    [
      "GENERAL_LEDGER",
      "CHART_OF_ACCOUNTS",
      "JOURNALS",
      "RECEIVABLES",
      "PAYABLES",
      "ASSET_ACCOUNTING",
      "FINANCIAL_REPORTING",
      "RECONCILIATION",
    ],
    ["identity", "security"],
    [
      provider(
        "jumo-accounting",
        "JUMO Universal Accounting",
        "LOCAL",
        1,
        [
          "GENERAL_LEDGER",
          "AR",
          "AP",
          "REPORTING",
          "RECONCILIATION",
        ],
      ),
    ],
  );

  services.faap = service(
    "faap",
    "FAAP",
    "JUMO FAAP Financial Architecture",
    "Universal financial accounting and application platform layer.",
    [
      "FINANCIAL_CONTROL",
      "ACCOUNTING",
      "BUDGETS",
      "APPROVALS",
      "FINANCIAL_WORKFLOWS",
      "FINANCIAL_AUDIT",
    ],
    ["accounting", "security", "audit"],
    [
      provider(
        "jumo-faap",
        "JUMO FAAP",
        "LOCAL",
        1,
        [
          "FINANCE",
          "ACCOUNTING",
          "BUDGET",
          "CONTROL",
          "AUDIT",
        ],
      ),
    ],
  );

  services.treasury = service(
    "treasury",
    "TREASURY",
    "JUMO Treasury Router",
    "Universal treasury, liquidity, currency and settlement orchestration.",
    [
      "MULTI_CURRENCY",
      "LIQUIDITY",
      "BANK_ACCOUNTS",
      "CASH_MANAGEMENT",
      "FX",
      "SETTLEMENT_ROUTING",
      "TREASURY_RECONCILIATION",
    ],
    ["accounting", "faap", "payments", "security"],
    [
      provider(
        "jumo-treasury",
        "JUMO Multi-Currency Treasury Router",
        "LOCAL",
        1,
        [
          "TREASURY",
          "FX",
          "LIQUIDITY",
          "SETTLEMENT",
        ],
      ),
    ],
  );

  services.payments = service(
    "payments",
    "PAYMENTS",
    "JUMO Universal Payment Fabric",
    "Universal payment abstraction shared by every product and ERP.",
    [
      "MOBILE_MONEY",
      "CARD",
      "BANK_TRANSFER",
      "ACH",
      "SWIFT",
      "MERCHANT_PAYMENTS",
      "QR_PAYMENTS",
      "SETTLEMENT",
      "REFUNDS",
      "RECONCILIATION",
    ],
    ["identity", "security", "accounting", "faap", "treasury"],
    [
      provider(
        "jumo-digital-pay",
        "JUMO DIGITAL PAY",
        "LOCAL",
        1,
        [
          "MOBILE_MONEY",
          "CARD",
          "QR",
          "MERCHANT",
          "SETTLEMENT",
        ],
      ),
      provider(
        "banking-connectors",
        "Banking Connector Fabric",
        "EXTERNAL",
        10,
        ["BANK_TRANSFER", "ACH", "SWIFT"],
      ),
    ],
  );

  services.communication = service(
    "communication",
    "COMMUNICATION",
    "JUMO Communication Fabric",
    "Universal outbound and inbound communication service.",
    [
      "EMAIL",
      "SMS",
      "PUSH",
      "IN_APP",
      "VOICE",
      "MESSAGING",
      "TEMPLATES",
      "DELIVERY_TRACKING",
    ],
    ["identity", "security"],
    [
      provider(
        "jumo-communication",
        "JUMO Communication Gateway",
        "HYBRID",
        1,
        ["EMAIL", "SMS", "PUSH", "IN_APP"],
      ),
      provider(
        "external-messaging",
        "External Messaging Providers",
        "EXTERNAL",
        20,
        ["EMAIL", "SMS", "VOICE"],
      ),
    ],
  );

  services.ai = service(
    "ai",
    "AI",
    "JUMO Universal Intelligence Fabric",
    "Governed AI provider and agent orchestration layer.",
    [
      "PRIMARY_REASONING",
      "ENGINEERING",
      "LOCAL_REASONING",
      "RAG",
      "AGENTS",
      "MODEL_ROUTING",
      "AI_GOVERNANCE",
      "AI_AUDIT",
    ],
    ["identity", "security", "audit"],
    [
      provider(
        "openai-primary",
        "OpenAI / ChatGPT Primary Reasoning",
        "EXTERNAL",
        1,
        [
          "REASONING",
          "PLANNING",
          "ARCHITECTURE",
          "COORDINATION",
        ],
      ),
      provider(
        "gemini-engineering",
        "Gemini Engineering Provider",
        "EXTERNAL",
        10,
        ["ENGINEERING", "CODE_ANALYSIS", "IMPLEMENTATION"],
      ),
      provider(
        "copilot-engineering",
        "Copilot Engineering Provider",
        "EXTERNAL",
        20,
        ["ENGINEERING", "CODE_ASSISTANCE", "IMPLEMENTATION"],
      ),
      provider(
        "jumo-local",
        "JUMO Sovereign Local Runtime",
        "LOCAL",
        100,
        ["LOCAL_REASONING", "OFFLINE_FALLBACK"],
      ),
    ],
  );

  services.cloud = service(
    "cloud",
    "CLOUD",
    "JUMO Cloud Abstraction Fabric",
    "Provider-neutral cloud and infrastructure orchestration.",
    [
      "COMPUTE",
      "CONTAINERS",
      "SERVERLESS",
      "OBJECT_STORAGE",
      "DATABASES",
      "NETWORKING",
      "CDN",
      "DNS",
      "LOAD_BALANCING",
      "INFRASTRUCTURE_AS_CODE",
      "CLOUD_MONITORING",
    ],
    ["security", "identity", "observability"],
    [
      provider(
        "local-infrastructure",
        "Local / On-Prem Infrastructure",
        "LOCAL",
        1,
        ["COMPUTE", "STORAGE", "NETWORK"],
      ),
      provider(
        "aws",
        "Amazon Web Services",
        "PUBLIC_CLOUD",
        10,
        ["COMPUTE", "DATABASE", "STORAGE", "NETWORK"],
      ),
      provider(
        "azure",
        "Microsoft Azure",
        "PUBLIC_CLOUD",
        20,
        ["COMPUTE", "DATABASE", "STORAGE", "NETWORK"],
      ),
      provider(
        "google-cloud",
        "Google Cloud",
        "PUBLIC_CLOUD",
        30,
        ["COMPUTE", "DATABASE", "STORAGE", "NETWORK"],
      ),
    ],
  );

  services.data = service(
    "data",
    "DATA",
    "JUMO Universal Data Fabric",
    "Shared persistence, governance and data-access abstraction.",
    [
      "RELATIONAL",
      "NOSQL",
      "CACHE",
      "VECTOR",
      "SEARCH",
      "WAREHOUSE",
      "DATA_GOVERNANCE",
      "MIGRATION",
    ],
    ["security", "cloud"],
    [
      provider(
        "jumo-data",
        "JUMO Data Runtime",
        "HYBRID",
        1,
        ["RELATIONAL", "CACHE", "VECTOR", "SEARCH"],
      ),
    ],
  );

  services.storage = service(
    "storage",
    "STORAGE",
    "JUMO Universal Storage",
    "Documents, files, evidence and durable object storage.",
    [
      "OBJECT_STORAGE",
      "DOCUMENT_STORAGE",
      "ARCHIVE",
      "RETENTION",
      "EVIDENCE",
    ],
    ["security", "data", "cloud"],
    [
      provider(
        "jumo-storage",
        "JUMO Durable Storage",
        "HYBRID",
        1,
        ["OBJECTS", "DOCUMENTS", "ARCHIVE"],
      ),
    ],
  );

  services.integration = service(
    "integration",
    "INTEGRATION",
    "JUMO Integration Fabric",
    "Universal APIs, connectors, events and external system integration.",
    [
      "API_GATEWAY",
      "WEBHOOKS",
      "EVENTS",
      "MESSAGE_QUEUE",
      "CONNECTORS",
      "EXTERNAL_APIS",
    ],
    ["security", "identity"],
    [
      provider(
        "jumo-integration",
        "JUMO Integration Gateway",
        "HYBRID",
        1,
        ["API", "EVENTS", "WEBHOOKS", "CONNECTORS"],
      ),
    ],
  );

  services.workflow = service(
    "workflow",
    "WORKFLOW",
    "JUMO Universal Workflow Engine",
    "Cross-domain workflow, approvals and lifecycle orchestration.",
    [
      "WORKFLOW",
      "APPROVALS",
      "STATE_MACHINE",
      "ESCALATION",
      "SCHEDULING",
    ],
    ["identity", "security", "audit"],
    [
      provider(
        "jumo-workflow",
        "JUMO Workflow Engine",
        "LOCAL",
        1,
        ["WORKFLOW", "APPROVALS", "ESCALATION"],
      ),
    ],
  );

  services.automation = service(
    "automation",
    "AUTOMATION",
    "JUMO Automation Fabric",
    "Automated execution of approved platform operations.",
    [
      "JOB_EXECUTION",
      "SCHEDULING",
      "TRIGGERS",
      "PIPELINE_AUTOMATION",
      "SELF_HEALING",
    ],
    ["workflow", "security", "audit", "observability"],
    [
      provider(
        "jumo-automation",
        "JUMO Automation Engine",
        "LOCAL",
        1,
        ["JOBS", "PIPELINES", "SCHEDULER"],
      ),
    ],
  );

  services.audit = service(
    "audit",
    "AUDIT",
    "JUMO Universal Audit Fabric",
    "Immutable operational, financial, security and AI audit trail.",
    [
      "AUDIT_EVENTS",
      "IMMUTABLE_LOGGING",
      "ACTOR_TRACKING",
      "CHANGE_TRACKING",
      "EVIDENCE",
      "AUDIT_REPORTING",
    ],
    ["security", "data"],
    [
      provider(
        "jumo-audit",
        "JUMO Audit Fabric",
        "LOCAL",
        1,
        ["AUDIT", "EVIDENCE", "REPORTING"],
      ),
    ],
  );

  services.observability = service(
    "observability",
    "OBSERVABILITY",
    "JUMO Observability Fabric",
    "Unified metrics, logs, traces, health and performance telemetry.",
    [
      "LOGGING",
      "METRICS",
      "TRACING",
      "HEALTH",
      "PERFORMANCE",
      "COST_TELEMETRY",
    ],
    ["security", "cloud"],
    [
      provider(
        "jumo-observability",
        "JUMO Observability",
        "HYBRID",
        1,
        ["LOGS", "METRICS", "TRACES", "HEALTH"],
      ),
    ],
  );

  services.backup = service(
    "backup",
    "BACKUP",
    "JUMO Backup Fabric",
    "Universal backup and restore service.",
    [
      "SNAPSHOTS",
      "INCREMENTAL_BACKUP",
      "FULL_BACKUP",
      "RESTORE",
      "BACKUP_VERIFICATION",
    ],
    ["storage", "data", "security"],
    [
      provider(
        "jumo-backup",
        "JUMO Backup Service",
        "HYBRID",
        1,
        ["BACKUP", "RESTORE", "VERIFICATION"],
      ),
    ],
  );

  services["disaster-recovery"] = service(
    "disaster-recovery",
    "DISASTER_RECOVERY",
    "JUMO Disaster Recovery",
    "Business continuity, failover and recovery orchestration.",
    [
      "FAILOVER",
      "RECOVERY",
      "REPLICATION",
      "RTO",
      "RPO",
      "DR_TESTING",
    ],
    ["backup", "cloud", "observability", "security"],
    [
      provider(
        "jumo-dr",
        "JUMO Disaster Recovery",
        "HYBRID",
        1,
        ["FAILOVER", "RECOVERY", "REPLICATION"],
      ),
    ],
  );

  services.compliance = service(
    "compliance",
    "COMPLIANCE",
    "JUMO Compliance Fabric",
    "Universal compliance, governance and evidence management.",
    [
      "POLICY",
      "CONTROL",
      "COMPLIANCE_CHECKS",
      "EVIDENCE",
      "REPORTING",
      "RETENTION",
    ],
    ["security", "audit", "documents"],
    [
      provider(
        "jumo-compliance",
        "JUMO Compliance Engine",
        "LOCAL",
        1,
        ["POLICY", "CONTROLS", "EVIDENCE"],
      ),
    ],
  );

  services.documents = service(
    "documents",
    "DOCUMENTS",
    "JUMO Document Fabric",
    "Universal documents, signatures, records and evidence.",
    [
      "DOCUMENTS",
      "TEMPLATES",
      "SIGNATURES",
      "RECORDS",
      "EVIDENCE",
    ],
    ["storage", "security", "audit"],
    [
      provider(
        "jumo-documents",
        "JUMO Document Service",
        "HYBRID",
        1,
        ["DOCUMENTS", "SIGNATURES", "RECORDS"],
      ),
    ],
  );

  services.search = service(
    "search",
    "SEARCH",
    "JUMO Universal Search",
    "Cross-platform search and indexed discovery.",
    [
      "FULL_TEXT",
      "SEMANTIC",
      "FILTERING",
      "TENANT_SCOPING",
    ],
    ["data", "security"],
    [
      provider(
        "jumo-search",
        "JUMO Search",
        "HYBRID",
        1,
        ["FULL_TEXT", "SEMANTIC"],
      ),
    ],
  );

  services.notification = service(
    "notification",
    "NOTIFICATION",
    "JUMO Notification Service",
    "Universal event-driven notification routing.",
    [
      "EMAIL",
      "SMS",
      "PUSH",
      "IN_APP",
      "ALERTS",
    ],
    ["communication", "workflow", "security"],
    [
      provider(
        "jumo-notifications",
        "JUMO Notifications",
        "HYBRID",
        1,
        ["EMAIL", "SMS", "PUSH", "ALERTS"],
      ),
    ],
  );

  services.verification = service(
    "verification",
    "VERIFICATION",
    "JUMO Universal Verification Fabric",
    "Mandatory verification layer for every manufactured product.",
    [
      "ARCHITECTURE_VERIFICATION",
      "CODE_VERIFICATION",
      "SECURITY_VERIFICATION",
      "UI_VERIFICATION",
      "DATA_VERIFICATION",
      "AI_VERIFICATION",
      "INTEGRATION_VERIFICATION",
      "REGRESSION",
    ],
    ["security", "audit", "ai", "observability"],
    [
      provider(
        "jumo-verification",
        "JUMO Verification Pipeline",
        "LOCAL",
        1,
        ["VERIFICATION", "REGRESSION", "EVIDENCE"],
      ),
    ],
    {
      required: true,
    },
  );

  services.registry = service(
    "registry",
    "REGISTRY",
    "JUMO Universal Registry",
    "Authoritative registry for approved products, deployments and services.",
    [
      "PRODUCT_REGISTRY",
      "ERP_REGISTRY",
      "SERVICE_REGISTRY",
      "VERSION_REGISTRY",
      "CERTIFICATION_RECORDS",
    ],
    ["identity", "security", "audit", "verification"],
    [
      provider(
        "jumo-registry",
        "JUMO Registry",
        "LOCAL",
        1,
        ["REGISTRY", "CERTIFICATION", "VERSIONING"],
      ),
    ],
  );

  services.deployment = service(
    "deployment",
    "DEPLOYMENT",
    "JUMO Deployment Fabric",
    "Controlled promotion of verified artifacts into target environments.",
    [
      "BUILD",
      "RELEASE",
      "DEPLOY",
      "ROLLBACK",
      "PROMOTION",
      "ENVIRONMENT_MANAGEMENT",
    ],
    ["verification", "registry", "cloud", "security", "audit"],
    [
      provider(
        "jumo-deployment",
        "JUMO Deployment Engine",
        "HYBRID",
        1,
        ["BUILD", "RELEASE", "DEPLOY", "ROLLBACK"],
      ),
    ],
  );

  services.configuration = service(
    "configuration",
    "CONFIGURATION",
    "JUMO Configuration Fabric",
    "Centralized configurable runtime and provider configuration.",
    [
      "TENANT_CONFIGURATION",
      "PROVIDER_CONFIGURATION",
      "FEATURE_FLAGS",
      "POLICIES",
      "ENVIRONMENT_CONFIGURATION",
    ],
    ["identity", "security", "audit"],
    [
      provider(
        "jumo-configuration",
        "JUMO Configuration Engine",
        "LOCAL",
        1,
        ["CONFIGURATION", "POLICIES", "FEATURE_FLAGS"],
      ),
    ],
  );

  const now = new Date().toISOString();

  return {
    profileId: "jumo-universal-shared-services-v1",
    name: "JUMO Universal Shared Services Fabric",
    description:
      "Provider-neutral shared-services control plane for all JUMO products, platforms, ERPs and manufactured applications.",
    services,
    globalPolicies: {
      zeroTrust: true,
      auditEverything: true,
      tenantIsolation: true,
      encryptionRequired: true,
      providerFailover: true,
      humanApprovalForCriticalActions: true,
      verificationRequired: true,
      regressionRequired: true,
    },
    createdAt: now,
    updatedAt: now,
  };
}
