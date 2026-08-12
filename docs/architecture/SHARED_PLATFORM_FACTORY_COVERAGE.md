# JUMO UEOS Shared Platform Coverage

Generated: Wed Aug 12 23:54:02 EAT 2026

## Shared Platform Source Coverage

### FOUND: src/core/platform/shared
src/core/platform/shared/JumoSharedEnterpriseServices.ts
src/core/platform/shared/JumoSharedServiceContract.ts
src/core/platform/shared/JumoSharedServiceResolver.ts
src/core/platform/shared/JumoSharedServices.ts
src/core/platform/shared/JumoSharedServicesFactoryContract.ts
src/core/platform/shared/JumoSharedServicesRegistry.ts
src/core/platform/shared/index.ts

### FOUND: src/core/ai
src/core/ai/architecture/JumoArchitectureReasoner.ts
src/core/ai/conversational/GeneralPurposeReasoningAI.ts
src/core/ai/conversational/JumoConversationalReasoningService.ts
src/core/ai/conversational/LocalHybridReasoningProvider.ts
src/core/ai/conversational/OpenAIReasoningProvider.ts
src/core/ai/conversational/ReasoningProviderFactory.ts
src/core/ai/financialAuditor.ts
src/core/ai/gateway/JumoModelGateway.ts
src/core/ai/orchestrator/JumoManufacturingOrchestrator.ts
src/core/ai/providers/CopilotEngineeringProvider.ts
src/core/ai/providers/GeminiEngineeringProvider.ts
src/core/ai/providers/JumoAIExecutionPolicy.ts
src/core/ai/providers/JumoAIProvider.ts
src/core/ai/providers/JumoAIProviderRegistry.ts
src/core/ai/providers/JumoModelRegistry.ts
src/core/ai/providers/LocalJumoProvider.ts
src/core/ai/providers/OpenAIPrimaryProvider.ts
src/core/ai/providers/index.ts
src/core/ai/registry/JumoAIAgentRegistry.ts
src/core/ai/runtime/JumoAIIdentity.ts
src/core/ai/runtime/JumoAIRuntime.ts
src/core/ai/runtime/JumoReasoningContext.ts
src/core/ai/types/JumoAITypes.ts
src/core/ai/universal/JumoEvidencePolicy.ts
src/core/ai/universal/JumoLifecycleInspectionAdapter.ts
src/core/ai/universal/JumoRepositoryInspectionAdapter.ts
src/core/ai/universal/JumoUniversalInspectionBootstrap.ts
src/core/ai/universal/JumoUniversalInspectionRegistry.ts
src/core/ai/universal/JumoUniversalIntelligence.ts
src/core/ai/universal/JumoUniversalIntelligenceBootstrap.ts
src/core/ai/verification/JumoAIVerificationDetectionRegistry.ts

### FOUND: src/core/digitalpay
src/core/digitalpay/digitalPayGateway.ts
src/core/digitalpay/digitalPayIdentityRuntime.ts
src/core/digitalpay/digitalPayIntegrationService.ts
src/core/digitalpay/digitalPayOrchestrator.ts
src/core/digitalpay/digitalPayRuntime.ts
src/core/digitalpay/digitalPayService.ts
src/core/digitalpay/digitalPayServiceRegistry.ts
src/core/digitalpay/digitalPayUIAdapter.ts
src/core/digitalpay/faapSettlementBridge.ts
src/core/digitalpay/feeDistributionService.ts
src/core/digitalpay/feePolicyService.ts
src/core/digitalpay/hybridSyncService.ts
src/core/digitalpay/index.ts
src/core/digitalpay/institutionalPaymentService.ts
src/core/digitalpay/merchantAgentService.ts
src/core/digitalpay/payeeIdentityService.ts
src/core/digitalpay/paymentAuthorizationService.ts
src/core/digitalpay/paymentCapabilityRegistry.ts
src/core/digitalpay/paymentDomainService.ts
src/core/digitalpay/paymentIdentityRegistry.ts
src/core/digitalpay/paymentIdentityResolver.ts
src/core/digitalpay/paymentIdentityService.ts
src/core/digitalpay/paymentLedgerBridge.ts
src/core/digitalpay/paymentLifecycleService.ts
src/core/digitalpay/paymentOrchestrator.ts
src/core/digitalpay/paymentReconciliationService.ts
src/core/digitalpay/paymentRoutingService.ts
src/core/digitalpay/paymentTransactionService.ts
src/core/digitalpay/productPaymentProfileService.ts
src/core/digitalpay/reconciliationService.ts
src/core/digitalpay/revenueEngine.ts
src/core/digitalpay/settlementOrchestrator.ts
src/core/digitalpay/universalPaymentOrchestrator.ts
src/core/digitalpay/walletAccountService.ts
src/core/digitalpay/walletBankingLendingService.ts

### FOUND: src/core/platform/treasury
src/core/platform/treasury/JumoAutomatedTreasuryEngine.ts

### FOUND: src/core/transactions
src/core/transactions/LedgerPostingEngine.ts
src/core/transactions/RevenueRecognitionService.ts
src/core/transactions/TransactionOrchestrator.ts
src/core/transactions/TreasuryQueue.ts

### FOUND: src/core/security
src/core/security/AuditSystem.ts
src/core/security/JumoSecretVault.ts
src/core/security/SecurityGovernor.ts
src/core/security/securityService.ts

### FOUND: src/core/provisioning
src/core/provisioning/AIProvisioner.ts
src/core/provisioning/DeploymentManager.ts
src/core/provisioning/FormInstaller.ts
src/core/provisioning/ModuleInstaller.ts
src/core/provisioning/PlatformProvisioner.ts
src/core/provisioning/SecurityProvisioner.ts
src/core/provisioning/TenantProvisioner.ts
src/core/provisioning/WorkflowInstaller.ts

### NOT FOUND: src/core/communication
### FOUND: src/core/workflow
src/core/workflow/workflowService.ts

### FOUND: src/core/factory
src/core/factory/ComponentGenerator.ts
src/core/factory/ERPFactoryEngine.ts
src/core/factory/FormGenerator.ts
src/core/factory/InstitutionGenerator.ts
src/core/factory/ModuleGenerator.ts
src/core/factory/PortalGenerator.ts
src/core/factory/SchemaGenerator.ts
src/core/factory/TemplateCompiler.ts
src/core/factory/WorkflowGenerator.ts
src/core/factory/divisions/BlueprintDivision.ts
src/core/factory/divisions/ComponentDivision.ts
src/core/factory/divisions/FormDivision.ts
src/core/factory/divisions/GovernanceDivision.ts
src/core/factory/divisions/ModuleDivision.ts
src/core/factory/divisions/PortalDivision.ts
src/core/factory/divisions/SchemaDivision.ts
src/core/factory/divisions/WorkflowDivision.ts
src/core/factory/registry/HubRegistryTypes.ts
src/core/factory/registry/UniversalHubRegistry.ts

### NOT FOUND: src/core/cloud
### NOT FOUND: src/core/data
### NOT FOUND: src/core/identity
### NOT FOUND: src/core/tenant
### FOUND: src/integrations
src/integrations/ai/AuditTriggers.ts
src/integrations/firebase/auth.ts
src/integrations/firebase/firebaseConfig.ts
src/integrations/firebase/firestore.ts
src/integrations/firebase/storage.ts

## Shared Service Registry
export type JumoSharedServiceId =
  | "IDENTITY"
  | "SECURITY_AEGIS"
  | "ACCOUNTING_FAAP"
  | "PAYMENTS"
  | "TREASURY"
  | "AUDITING"
  | "INTELLIGENCE"
  | "COMMUNICATION"
  | "WORKFLOW"
  | "DATA"
  | "STORAGE"
  | "SPECIFICATION"
  | "MANUFACTURING"
  | "TESTING"
  | "VERIFICATION"
  | "ACCEPTANCE"
  | "DEPLOYMENT"
  | "REGISTRY"
  | "CLOUD"
  | "OBSERVABILITY"
  | "NOTIFICATION"
  | "INTEGRATION";

export type JumoServiceMode =
  | "CENTRAL"
  | "TENANT_CONFIGURABLE"
  | "HYBRID"
  | "LOCAL"
  | "EXTERNAL";

export interface JumoSharedServiceConfiguration {
  enabled: boolean;
  mode: JumoServiceMode;
  provider?: string;
  endpoint?: string;
  features?: Record<string, boolean>;
  settings?: Record<string, unknown>;
}

export interface JumoSharedEnterpriseService {
  id: JumoSharedServiceId;
  name: string;
  description: string;
  configuration: JumoSharedServiceConfiguration;
  dependencies: JumoSharedServiceId[];
  required: boolean;
}

const definitions: JumoSharedEnterpriseService[] = [
  {
    id: "IDENTITY",
    name: "JUMO Identity",
    description: "Universal identity, authentication, authorization and tenant identity.",
    configuration: { enabled: true, mode: "CENTRAL" },
    dependencies: [],
    required: true,
  },
  {
    id: "SECURITY_AEGIS",
    name: "JUMO AEGIS",
    description: "Zero-trust security, secrets, policies, threat protection and security governance.",
    configuration: { enabled: true, mode: "CENTRAL" },
    dependencies: ["IDENTITY", "AUDITING"],
    required: true,
  },
  {
    id: "ACCOUNTING_FAAP",
    name: "JUMO FAAP",
    description: "Universal accounting, ledgers, journals, budgets, reconciliation and financial reporting.",
    configuration: { enabled: true, mode: "CENTRAL" },
    dependencies: ["IDENTITY", "AUDITING"],
    required: true,
  },
  {
    id: "PAYMENTS",
    name: "JUMO DIGITAL PAY",
    description: "Universal payment orchestration and provider routing.",
    configuration: { enabled: true, mode: "HYBRID" },
    dependencies: ["IDENTITY", "SECURITY_AEGIS", "ACCOUNTING_FAAP", "TREASURY"],
    required: true,
  },
  {
    id: "TREASURY",
    name: "JUMO Treasury",
    description: "Cash, bank, wallet, FX, liquidity and multi-currency treasury routing.",
    configuration: { enabled: true, mode: "CENTRAL" },
    dependencies: ["ACCOUNTING_FAAP", "AUDITING"],
    required: true,
  },
  {
    id: "AUDITING",
    name: "JUMO Audit Fabric",
    description: "Universal immutable operational, financial, AI, security and deployment audit trail.",
    configuration: { enabled: true, mode: "CENTRAL" },
    dependencies: ["IDENTITY"],
    required: true,
  },
  {
    id: "INTELLIGENCE",
    name: "JUMO Intelligence Gateway",
    description: "Primary reasoning, engineering agents, local intelligence, RAG and AI governance.",
    configuration: { enabled: true, mode: "HYBRID" },
    dependencies: ["SECURITY_AEGIS", "AUDITING"],
    required: true,
  },
  {
    id: "COMMUNICATION",
    name: "JUMO Communication Fabric",
    description: "Email, SMS, push, messaging, announcements and institutional communication.",
    configuration: { enabled: true, mode: "EXTERNAL" },
    dependencies: ["IDENTITY", "AUDITING"],
    required: false,
  },
  {
    id: "WORKFLOW",
    name: "JUMO Workflow Engine",
    description: "Universal approvals, routing, escalation, automation and delegation.",
    configuration: { enabled: true, mode: "CENTRAL" },
    dependencies: ["IDENTITY", "AUDITING", "INTELLIGENCE"],
    required: true,
  },
  {
    id: "DATA",
    name: "JUMO Data Fabric",
    description: "Tenant-isolated data, schemas, migrations, search and data governance.",
    configuration: { enabled: true, mode: "HYBRID" },
    dependencies: ["SECURITY_AEGIS", "AUDITING"],
    required: true,
  },
  {
    id: "STORAGE",
    name: "JUMO Storage",
    description: "Objects, backups, durable storage, archival and recovery.",
    configuration: { enabled: true, mode: "HYBRID" },
    dependencies: ["SECURITY_AEGIS", "DATA"],
    required: true,
  },
  {
    id: "SPECIFICATION",
    name: "JUMO Specification Fabric",
    description: "Universal product, architecture, security, financial and deployment specifications.",
    configuration: { enabled: true, mode: "CENTRAL" },
    dependencies: ["INTELLIGENCE", "AUDITING"],
    required: true,
  },
  {
    id: "MANUFACTURING",
    name: "JUMO Manufacturing Fabric",
    description: "Universal product and application manufacturing orchestration.",
    configuration: { enabled: true, mode: "CENTRAL" },
    dependencies: ["SPECIFICATION", "WORKFLOW", "INTELLIGENCE"],
    required: true,
  },
  {
    id: "TESTING",
    name: "JUMO Testing Fabric",
    description: "Application, integration, security, regression and end-to-end testing.",
    configuration: { enabled: true, mode: "CENTRAL" },
    dependencies: ["MANUFACTURING", "AUDITING"],
    required: true,
  },
  {
    id: "VERIFICATION",
    name: "JUMO Verification Fabric",
    description: "Universal deep verification and AI-assisted diagnosis.",
    configuration: { enabled: true, mode: "CENTRAL" },
    dependencies: ["TESTING", "INTELLIGENCE", "AUDITING"],
    required: true,
  },
  {
    id: "ACCEPTANCE",
    name: "JUMO Acceptance Gate",
    description: "Final acceptance and release qualification.",
    configuration: { enabled: true, mode: "CENTRAL" },
    dependencies: ["VERIFICATION", "AUDITING"],
    required: true,
  },
  {
    id: "DEPLOYMENT",
    name: "JUMO Deployment Fabric",
    description: "Build, release, deployment, rollback and environment orchestration.",
    configuration: { enabled: true, mode: "HYBRID" },
    dependencies: ["ACCEPTANCE", "SECURITY_AEGIS", "AUDITING"],
    required: true,
  },
  {
    id: "REGISTRY",
    name: "JUMO Universal Registry",
    description: "Registry for products, ERP instances, services, agents, providers and deployments.",
    configuration: { enabled: true, mode: "CENTRAL" },
    dependencies: ["IDENTITY", "AUDITING"],
    required: true,
  },
  {
    id: "CLOUD",
    name: "JUMO Cloud Fabric",
    description: "Configurable cloud, hybrid, local and external infrastructure providers.",
    configuration: { enabled: true, mode: "HYBRID" },
    dependencies: ["DEPLOYMENT", "SECURITY_AEGIS"],
    required: true,
  },
  {
    id: "OBSERVABILITY",
    name: "JUMO Observability",
    description: "Logs, metrics, traces, health, performance and operational telemetry.",
    configuration: { enabled: true, mode: "CENTRAL" },
    dependencies: ["SECURITY_AEGIS", "AUDITING"],
    required: true,
  },
  {
    id: "NOTIFICATION",
    name: "JUMO Notification Fabric",
    description: "Universal event-driven notifications and alerts.",
    configuration: { enabled: true, mode: "HYBRID" },
    dependencies: ["COMMUNICATION", "WORKFLOW"],
    required: false,
  },
  {
    id: "INTEGRATION",
    name: "JUMO Integration Fabric",
    description: "External APIs, webhooks, adapters and enterprise integrations.",
    configuration: { enabled: true, mode: "EXTERNAL" },
    dependencies: ["SECURITY_AEGIS", "AUDITING"],
    required: true,
  },
];

export class JumoSharedEnterpriseServices {
  private static instance: JumoSharedEnterpriseServices;
  private readonly services = new Map<
    JumoSharedServiceId,
    JumoSharedEnterpriseService
  >();

  private constructor() {
    for (const service of definitions) {
      this.services.set(service.id, structuredClone(service));
    }
  }

  static getInstance(): JumoSharedEnterpriseServices {
    if (!this.instance) {
      this.instance = new JumoSharedEnterpriseServices();
    }
    return this.instance;
  }

  get(id: JumoSharedServiceId) {
    return this.services.get(id);
  }

  getAll() {
    return Array.from(this.services.values());
  }

  configure(
    id: JumoSharedServiceId,
    configuration: Partial<JumoSharedServiceConfiguration>,
  ) {
    const service = this.services.get(id);

    if (!service) {
      throw new Error(`Unknown JUMO shared service: ${id}`);
    }

    service.configuration = {
      ...service.configuration,
      ...configuration,
      features: {
        ...service.configuration.features,
        ...configuration.features,
      },
      settings: {
        ...service.configuration.settings,
        ...configuration.settings,
      },
    };

    return service;
  }

  isEnabled(id: JumoSharedServiceId): boolean {
    return this.services.get(id)?.configuration.enabled === true;
  }

  snapshot() {
    return {
      serviceCount: this.services.size,
      services: this.getAll(),
    };
  }
}

export const jumoSharedEnterpriseServices =
  JumoSharedEnterpriseServices.getInstance();

export default JumoSharedEnterpriseServices;

## Factory Sources
src/core/ai/conversational/ReasoningProviderFactory.ts
src/core/factory
src/core/factory/ERPFactoryEngine.ts
src/core/manufacturing/JumoProductFactory.ts
src/core/manufacturing/quality/JumoCloudQualityProvisioningEngine.ts
src/core/platform/provisioning
src/core/platform/provisioning/JumoFinalProvisioningGate.ts
src/core/platform/shared/JumoSharedServicesFactoryContract.ts
src/core/provisioning
src/core/provisioning/AIProvisioner.ts
src/core/provisioning/PlatformProvisioner.ts
src/core/provisioning/SecurityProvisioner.ts
src/core/provisioning/TenantProvisioner.ts
src/core/runtime/universalERPFactory.ts
