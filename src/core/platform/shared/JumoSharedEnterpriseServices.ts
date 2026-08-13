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
