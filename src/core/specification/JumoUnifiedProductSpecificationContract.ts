/**
 * JUMO UNIFIED PRODUCT SPECIFICATION CONTRACT
 *
 * SINGLE AUTHORITATIVE CONTRACT FOR ALL STUDIOS.
 *
 * Digital Specification
 *      ↓
 * Architecture
 *      ↓
 * Manufacturing
 *      ↓
 * Assurance / Verification
 *      ↓
 * Certification
 *      ↓
 * Deployment
 *      ↓
 * Runtime / Operations
 *
 * No studio should maintain an independent competing specification form.
 */

export type ProductClassification =
  | "ERP_PRODUCT"
  | "JUMO_COMMERCIAL_PLATFORM"
  | "SOFTWARE_PROGRAM";

export type ProductGrade =
  | "ORDINARY"
  | "PREMIUM"
  | "GLOBAL_PACKAGE";

export type AIProviderId =
  | "GEMINI"
  | "OPENAI"
  | "COPILOT"
  | "JUMO_LOCAL";

export interface UnifiedAIConfiguration {
  enabled: boolean;
  primaryProvider: AIProviderId;
  fallbackProviders: AIProviderId[];
  localFallbackEnabled: boolean;
  conversationalAIEnabled: boolean;
  engineeringAgentsEnabled: boolean;
  verificationAIEnabled: boolean;
  modelPolicies: Record<string, {
    provider: AIProviderId;
    modelAlias: string;
    enabled: boolean;
  }>;
}

export interface UnifiedNavigationConfiguration {
  enabledStudios: string[];
  roleBasedAccess: Record<string, string[]>;
  featureFlags: Record<string, boolean>;
}

export interface UnifiedArchitectureConfiguration {
  layers: string[];
  domains: string[];
  modules: string[];
  integrations: string[];
  dataDomains: string[];
  securityControls: string[];
  verificationRequirements: string[];
}

export interface UnifiedManufacturingConfiguration {
  pipelineEnabled: boolean;
  lifecycleStages: string[];
  approvalGates: string[];
  verificationGates: string[];
  deploymentTargets: string[];
  offlineHybridEnabled: boolean;
}

export interface UnifiedProductSpecification {
  contractVersion: "1.0";

  identity: {
    productId: string;
    productName: string;
    description: string;
    classification: ProductClassification;
    grade: ProductGrade;
    ecosystem: string;
    tenantId: string;
  };

  requirements: {
    businessRequirements: string[];
    functionalRequirements: string[];
    nonFunctionalRequirements: string[];
    complianceRequirements: string[];
  };

  architecture: UnifiedArchitectureConfiguration;

  navigation: UnifiedNavigationConfiguration;

  manufacturing: UnifiedManufacturingConfiguration;

  ai: UnifiedAIConfiguration;

  data: {
    entities: string[];
    ownership: string;
    classification: string;
    residency: string;
    retention: string;
    replication: string;
  };

  security: {
    zeroTrust: boolean;
    encryptionAtRest: boolean;
    encryptionInTransit: boolean;
    rbac: boolean;
    auditLogging: boolean;
  };

  runtime: {
    offlineCapable: boolean;
    localHybridCapable: boolean;
    cloudCapable: boolean;
    selfHealingEnabled: boolean;
    telemetryEnabled: boolean;
  };

  governance: {
    humanApprovalRequired: boolean;
    verificationMandatory: boolean;
    certificationRequired: boolean;
    auditRequired: boolean;
  };

  metadata: {
    createdAt: string;
    updatedAt: string;
    source: "DIGITAL_SPECIFICATION_STUDIO";
    authoritative: true;
  };
}

/**
 * Creates a safe canonical specification.
 * Every studio can consume this contract without inventing
 * its own competing form.
 */
export function createUnifiedProductSpecification(
  overrides: Partial<UnifiedProductSpecification> = {}
): UnifiedProductSpecification {
  const now = new Date().toISOString();

  return {
    contractVersion: "1.0",

    identity: {
      productId: "",
      productName: "",
      description: "",
      classification: "ERP_PRODUCT",
      grade: "ORDINARY",
      ecosystem: "",
      tenantId: "",
      ...overrides.identity,
    },

    requirements: {
      businessRequirements: [],
      functionalRequirements: [],
      nonFunctionalRequirements: [],
      complianceRequirements: [],
      ...overrides.requirements,
    },

    architecture: {
      layers: [],
      domains: [],
      modules: [],
      integrations: [],
      dataDomains: [],
      securityControls: [],
      verificationRequirements: [],
      ...overrides.architecture,
    },

    navigation: {
      enabledStudios: [],
      roleBasedAccess: {},
      featureFlags: {},
      ...overrides.navigation,
    },

    manufacturing: {
      pipelineEnabled: true,
      lifecycleStages: [],
      approvalGates: [],
      verificationGates: [],
      deploymentTargets: [],
      offlineHybridEnabled: true,
      ...overrides.manufacturing,
    },

    ai: {
      enabled: true,
      primaryProvider: "JUMO_LOCAL",
      fallbackProviders: ["GEMINI", "OPENAI", "COPILOT"],
      localFallbackEnabled: true,
      conversationalAIEnabled: true,
      engineeringAgentsEnabled: true,
      verificationAIEnabled: true,
      modelPolicies: {},
      ...overrides.ai,
    },

    data: {
      entities: [],
      ownership: "",
      classification: "",
      residency: "",
      retention: "",
      replication: "",
      ...overrides.data,
    },

    security: {
      zeroTrust: true,
      encryptionAtRest: true,
      encryptionInTransit: true,
      rbac: true,
      auditLogging: true,
      ...overrides.security,
    },

    runtime: {
      offlineCapable: true,
      localHybridCapable: true,
      cloudCapable: true,
      selfHealingEnabled: true,
      telemetryEnabled: true,
      ...overrides.runtime,
    },

    governance: {
      humanApprovalRequired: true,
      verificationMandatory: true,
      certificationRequired: true,
      auditRequired: true,
      ...overrides.governance,
    },

    metadata: {
      createdAt: now,
      updatedAt: now,
      source: "DIGITAL_SPECIFICATION_STUDIO",
      authoritative: true,
    },
  };
}
