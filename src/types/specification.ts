// JUMO UEOS — Dynamic Schema-Driven Specification Contract Types
// Authoritative definitions for the 31 layers of implementation-grade contracts.

export type ProductClassification = 'ERP_ECOSYSTEM' | 'COMMERCIAL_PLATFORM' | 'SOFTWARE_PROGRAM';

export type SpecificationSource = 'HUMAN_SELECTED' | 'MINIMUM_STANDARD' | 'CONTEXT_GENERATED' | 'ENGINEERING_RECOMMENDED' | 'REGULATORY_REQUIRED';

export interface TraceableValue<T> {
  value: T;
  source: SpecificationSource;
  timestamp: string;
  contributorId?: string;
  rationale?: string;
}

export interface DynamicQuestion {
  id: string;
  label: string;
  type: 'text' | 'number' | 'select' | 'boolean' | 'textarea' | 'list' | 'ecosystem_selector' | 'domain_selector' | 'guided_capacity' | 'guided_tenancy';
  placeholder?: string;
  options?: string[];
  required: boolean;
  defaultValue?: any;
  category: string;
  domainCategory?: 'PORTALS' | 'MODULES' | 'DEPARTMENTS' | 'AI_CAPABILITIES' | 'INTEGRATIONS' | 'WORKFLOWS' | 'REPORTS' | 'COMPLIANCE';
}

export interface SpecificationSectionSchema {
  id: string;
  title: string;
  description: string;
  questions: DynamicQuestion[];
}

export interface ProductSpecificationSchema {
  classification: ProductClassification;
  sections: SpecificationSectionSchema[];
}

// Complete Implementation-Grade Specification Contract with 31 Core Dimensions
export interface ImplementationGradeSpecificationContract {
  // 1. Ecosystem & Domain Classification
  classification: {
    ecosystem: TraceableValue<string>;
    domain: TraceableValue<string>;
    secondaryDomains?: TraceableValue<string[]>;
    scope: TraceableValue<string>;
  };

  // 2. Product Identity
  identity: {
    productId: string;
    productName: TraceableValue<string>;
    tenantName: TraceableValue<string>;
    productClassification: ProductClassification;
    productClass: TraceableValue<string>;
    brandIdentity: {
      primaryColor?: TraceableValue<string>;
      secondaryColor?: TraceableValue<string>;
      logoUrl?: TraceableValue<string>;
      typography?: TraceableValue<string>;
    };
    organizationIdentity: TraceableValue<string>;
    publicFacingName: TraceableValue<string>;
    internalSystemIdentity: string;
    productVersion: TraceableValue<string>;
    productDescription: TraceableValue<string>;
    productPurpose: TraceableValue<string>;
    targetAudience: TraceableValue<string>;
    geographicScope: TraceableValue<string>;
    operatingJurisdictions: TraceableValue<string[]>;
  };

  // 3. Business Specification
  businessSpecification: {
    tenancyModel: TraceableValue<'SINGLE_TENANT' | 'MULTI_TENANT' | 'HYBRID_TENANT'>;
    tenantHierarchy: TraceableValue<string>;
    organizationHierarchy: TraceableValue<string>;
    businessProcesses: TraceableValue<string[]>;
    operatingCalendars: TraceableValue<string>;
    capacity: {
      usersCount: TraceableValue<number>;
      concurrentUsersCount: TraceableValue<number>;
      transactionsPerSecond: TraceableValue<number>;
      storageGb: TraceableValue<number>;
    };
  };

  // 4. Domain Specification
  domainSpecification: {
    sector: TraceableValue<string>;
    domainRequirements: TraceableValue<string[]>;
    complianceStandards: TraceableValue<string[]>;
    industryProtocols: TraceableValue<string[]>;
  };

  // 5. Functional Specification
  functionalSpecification: {
    coreCapabilities: TraceableValue<string[]>;
    portals: TraceableValue<string[]>;
    modules: TraceableValue<string[]>;
    workflows: TraceableValue<string[]>;
    automationLevel: TraceableValue<'MANUAL_ASSISTED' | 'SEMI_AUTONOMOUS' | 'FULLY_AUTONOMOUS'>;
    reportingRequirements: TraceableValue<string[]>;
  };

  // 6. Digital Experience Specification
  digitalExperience: {
    publicExperience: {
      enabled: TraceableValue<boolean>;
      landingPage: {
        pagePurpose: TraceableValue<string>;
        heroTitle: TraceableValue<string>;
        heroSubtitle: TraceableValue<string>;
        primaryCTA: TraceableValue<string>;
        sections: TraceableValue<string[]>;
      };
      serviceDiscovery: {
        catalogEnabled: TraceableValue<boolean>;
        categories: TraceableValue<string[]>;
      };
    };
    authenticatedExperience: {
      onboardingRequired: TraceableValue<boolean>;
      dashboardLayout: TraceableValue<'GRID' | 'WIDGETS' | 'LIST'>;
      workspaceTheme: TraceableValue<'MODERN' | 'CLASSIC' | 'COMPACT'>;
      navigationModel: TraceableValue<'SIDEBAR' | 'TOPBAR' | 'HYBRID'>;
    };
    designSystem: {
      typography: TraceableValue<string>;
      density: TraceableValue<'COMPACT' | 'STANDARD' | 'SPACIOUS'>;
      radius: TraceableValue<number>;
    };
  };

  // 7. AI Experience Specification
  aiExperience: {
    publicAssistant: {
      enabled: TraceableValue<boolean>;
      assistantName: TraceableValue<string>;
      knowledgeScope: TraceableValue<string[]>;
    };
    authenticatedAssistant: {
      enabled: TraceableValue<boolean>;
      persona: TraceableValue<'EXECUTIVE' | 'ANALYST' | 'ADMINISTRATOR'>;
      tools: TraceableValue<string[]>;
    };
    safetyGuardrails: TraceableValue<string[]>;
  };

  // 8. Localization Specification
  localization: {
    defaultLanguage: TraceableValue<string>;
    supportedLanguages: TraceableValue<string[]>;
    timezone: TraceableValue<string>;
    rtlSupport: TraceableValue<boolean>;
  };

  // 9. Accessibility Specification
  accessibility: {
    targetStandard: TraceableValue<'WCAG_AA' | 'WCAG_AAA'>;
    screenReaderSupport: TraceableValue<boolean>;
    contrastTarget: TraceableValue<string>;
  };

  // 10. Security & Identity Experience
  securityExperience: {
    authenticationMethods: TraceableValue<string[]>;
    mfaRequired: TraceableValue<boolean>;
    identityVerification: TraceableValue<boolean>;
    privacyControlsEnabled: TraceableValue<boolean>;
    termsAcceptanceRequired: TraceableValue<boolean>;
  };

  // 11. Communication & Device Strategy
  communication: {
    channels: TraceableValue<Array<'IN_APP' | 'EMAIL' | 'SMS' | 'PUSH'>>;
    targets: TraceableValue<Array<'DESKTOP' | 'TABLET' | 'MOBILE' | 'PWA' | 'NATIVE'>>;
  };

  // 12. Data Specification
  dataSpecification: {
    entities: TraceableValue<string[]>;
    classification: TraceableValue<string>;
    retentionPolicy: TraceableValue<string>;
    residencyRequirements: TraceableValue<string>;
  };

  // 13. Integration Specification
  integrationSpecification: {
    externalSystems: TraceableValue<string[]>;
    apiProtocols: TraceableValue<string[]>;
    webhookEvents: TraceableValue<string[]>;
  };

  // 14. Financial & Transaction Specification
  financialSpecification: {
    currency: TraceableValue<string>;
    paymentGateways: TraceableValue<string[]>;
    taxationModels: TraceableValue<string[]>;
    billingIntervals: TraceableValue<string[]>;
  };

  // 15. Workflow & Automation Specification
  workflowSpecification: {
    businessProcesses: TraceableValue<string[]>;
    automationTriggers: TraceableValue<string[]>;
    approvalChains: TraceableValue<string[]>;
  };

  // 16. Reporting & Analytics Specification
  analyticsSpecification: {
    kpis: TraceableValue<string[]>;
    standardReports: TraceableValue<string[]>;
    dashboards: TraceableValue<string[]>;
  };

  // 17. Content & Knowledge Specification
  contentSpecification: {
    knowledgeBases: TraceableValue<string[]>;
    documentTypes: TraceableValue<string[]>;
    ragSources?: TraceableValue<string[]>;
  };

  // 18. Advertising & Engagement Specification
  engagementSpecification: {
    campaignTypes: TraceableValue<string[]>;
    adPlacements: TraceableValue<string[]>;
    loyaltyPrograms: TraceableValue<boolean>;
  };

  // 19. Search & Discovery Specification
  searchSpecification: {
    searchScopes: TraceableValue<string[]>;
    indexingFrequency: TraceableValue<string>;
    aiSearchEnabled: TraceableValue<boolean>;
  };

  // 20. Support & Help Specification
  supportSpecification: {
    supportChannels: TraceableValue<string[]>;
    slaLevels: TraceableValue<string[]>;
    helpPortalEnabled: TraceableValue<boolean>;
  };

  // 21. Compliance & Governance Specification
  complianceSpecification: {
    regulatoryFrameworks: TraceableValue<string[]>;
    auditRequirements: TraceableValue<string[]>;
    dataGovernancePolicy: TraceableValue<string>;
  };

  // 22. Deployment & Installation Specification
  deploymentSpecification: {
    targets: TraceableValue<string[]>;
    regions: TraceableValue<string[]>;
    infrastructureRequirements: TraceableValue<string>;
  };

  // 23. Verification Specification
  verificationSpecification: {
    acceptanceCriteria: TraceableValue<string[]>;
    verificationProtocols: TraceableValue<string[]>;
    automatedTestsRequired: TraceableValue<boolean>;
  };

  // 24. Manufacturing Specification
  manufacturingSpecification: {
    manufacturingProfile: TraceableValue<string>;
    qualityStandards: TraceableValue<string[]>;
    priority: TraceableValue<'NORMAL' | 'HIGH' | 'CRITICAL'>;
  };

  // 25. Release & Certification Specification
  certificationSpecification: {
    releaseGates: TraceableValue<string[]>;
    certificationTargets: TraceableValue<string[]>;
    humanSignOffRequired: TraceableValue<boolean>;
  };

  // 26. Evolution & Upgrade Specification
  evolutionSpecification: {
    upgradePolicy: TraceableValue<string>;
    featureEvolutionPath: TraceableValue<string>;
    maintenanceWindows: TraceableValue<string>;
  };

  // 27. HUMAN GOVERNANCE SPECIFICATION
  humanGovernance: {
    mandatoryApprovalGates: TraceableValue<string[]>;
    gatekeepers: TraceableValue<string[]>;
    rejectionWorkflows: TraceableValue<string>;
  };

  // 28. REQUIREMENT PRIORITY & CONSTRAINTS
  priorities: {
    criticalRequirements: TraceableValue<string[]>;
    technicalConstraints: TraceableValue<string[]>;
    budgetaryConstraints: TraceableValue<string>;
  };

  // 29. REQUIREMENT TRACEABILITY
  traceability: {
    mappingRequirement: TraceableValue<string>;
    auditTrailEnabled: TraceableValue<boolean>;
  };

  metadata: {
    createdAt: string;
    updatedAt: string;
    version: number;
    specificationCompleteness: number;
  };
}

// Global Authoritative Schemas for Specification Studio
export const ERP_SCHEMA: ProductSpecificationSchema = {
  classification: "ERP_ECOSYSTEM",
  sections: [
    {
      id: "classification",
      title: "1. Classification",
      description: "Define the architectural class and ecosystem of the product.",
      questions: [
        { id: "classification", label: "Product Classification", type: "select", required: true, options: ["ERP_ECOSYSTEM", "COMMERCIAL_PLATFORM", "SOFTWARE_PROGRAM"], category: "classification" }
      ]
    },
    {
      id: "identity",
      title: "2. Identity",
      description: "Define product naming, ownership, jurisdictions, and versioning variables.",
      questions: [
        { id: "productName", label: "Product Name", type: "text", required: true, placeholder: "e.g. National Healthcare ERP", category: "identity" },
        { id: "productVersion", label: "Product Version", type: "text", required: true, defaultValue: "v1.0.0", category: "identity" },
        { id: "productClass", label: "Product Class", type: "text", required: true, defaultValue: "Enterprise Resource Planning", category: "identity" },
        { id: "productFamily", label: "Product Family", type: "text", required: true, defaultValue: "National Sovereign Infrastructure", category: "identity" },
        { id: "productSubtype", label: "Product Subtype", type: "select", required: true, options: ["Health ERP", "Financial ERP", "Resource ERP", "Educational ERP"], category: "identity" },
        { id: "productPurpose", label: "Product Purpose", type: "textarea", required: true, placeholder: "Provide comprehensive national system integration...", category: "identity" },
        { id: "productOwner", label: "Product Owner", type: "text", required: true, placeholder: "e.g. Ministry of Finance", category: "identity" },
        { id: "operatingOrganization", label: "Operating Organization", type: "text", required: true, placeholder: "e.g. National IT Authority", category: "identity" },
        { id: "targetJurisdiction", label: "Target Jurisdiction(s)", type: "text", required: true, placeholder: "e.g. Sovereign National State", category: "identity" }
      ]
    },
    {
      id: "tenancy",
      title: "3. Tenancy",
      description: "Specify structural dimensions, isolation, and delegation boundaries.",
      questions: [
        { id: "tenantModel", label: "Tenant Model Type", type: "select", required: true, options: ["SINGLE_TENANT", "MULTI_TENANT", "HYBRID_TENANT"], defaultValue: "MULTI_TENANT", category: "tenancy" },
        { id: "tenantHierarchy", label: "Tenant Hierarchy Scope", type: "textarea", required: true, placeholder: "Federal -> State -> Municipal -> Departmental...", category: "tenancy" },
        { id: "tenantIsolationRequirements", label: "Tenant Isolation Protocol", type: "select", required: true, options: ["Database-level Separation", "Schema-level Isolation", "Logical Filter Separation"], category: "tenancy" },
        { id: "centralAdministrationModel", label: "Central Administration Model", type: "text", required: true, defaultValue: "Sovereign Root Administrator Delegation", category: "tenancy" }
      ]
    },
    {
      id: "capacity",
      title: "4. Capacity",
      description: "Measure structural engineering values to size computation models.",
      questions: [
        { id: "usersCount", label: "Total Registered Users", type: "number", required: true, defaultValue: 100000, category: "capacity" },
        { id: "concurrentUsersCount", label: "Peak Concurrent Users", type: "number", required: true, defaultValue: 5000, category: "capacity" },
        { id: "transactionsPerSecond", label: "Expected Transactions Per Second (TPS)", type: "number", required: true, defaultValue: 150, category: "capacity" },
        { id: "storageGb", label: "Initial Storage Capacity (GB)", type: "number", required: true, defaultValue: 50000, category: "capacity" },
        { id: "availabilityTargetPercentage", label: "SLA Availability Target (%)", type: "number", required: true, defaultValue: 99.99, category: "capacity" }
      ]
    },
    {
      id: "scope",
      title: "5. Scope",
      description: "Define the functional boundaries and mandatory capabilities.",
      questions: [
        { id: "coreCapabilities", label: "Core Functional Capabilities", type: "list", required: true, category: "scope" },
        { id: "excludedCapabilities", label: "Explicit Exclusions", type: "list", required: false, category: "scope" }
      ]
    },
    {
      id: "data",
      title: "6. Data",
      description: "Define the data domains, entities, and residency requirements.",
      questions: [
        { id: "dataDomains", label: "Primary Data Domains", type: "list", required: true, category: "data" },
        { id: "dataResidency", label: "Data Residency Jurisdiction", type: "text", required: true, category: "data" }
      ]
    },
    {
      id: "integrations",
      title: "7. Integrations",
      description: "List the authoritative integration points with other sovereign systems.",
      questions: [
        { id: "externalSystems", label: "External System Integrations", type: "list", required: true, category: "integrations" }
      ]
    },
    {
      id: "security",
      title: "8. Security",
      description: "Define authentication, authorization, and encryption standards.",
      questions: [
        { id: "authenticationModel", label: "Authentication Model", type: "text", required: true, category: "security" },
        { id: "mfaRequirements", label: "MFA Requirements", type: "text", required: true, category: "security" }
      ]
    },
    {
      id: "infrastructure",
      title: "9. Infrastructure",
      description: "Specify compute, storage, and networking requirements.",
      questions: [
        { id: "deploymentType", label: "Deployment Type", type: "select", required: true, options: ["CLOUD", "ON_PREMISE", "HYBRID"], category: "infrastructure" }
      ]
    },
    {
      id: "users_roles",
      title: "10. Users / Roles",
      description: "Define the user populations and role-based access models.",
      questions: [
        { id: "userPopulations", label: "User Populations", type: "list", required: true, category: "users_roles" }
      ]
    },
    {
      id: "workflow",
      title: "11. Workflow",
      description: "Define business processes and approval chains.",
      questions: [
        { id: "businessProcesses", label: "Business Processes", type: "list", required: true, category: "workflow" }
      ]
    },
    {
      id: "ai",
      title: "12. AI",
      description: "Define the AI workforce and reasoning requirements.",
      questions: [
        { id: "aiCapabilities", label: "Required AI Capabilities", type: "list", required: true, category: "ai" }
      ]
    },
    {
      id: "finance",
      title: "13. Finance",
      description: "Configure accounting models, ledgers, and taxation rules.",
      questions: [
        { id: "accountingModel", label: "Accounting Basis Model", type: "select", required: true, options: ["Accrual Basis", "Cash Basis", "Modified Accrual Basis"], category: "finance" }
      ]
    },
    {
      id: "operations",
      title: "14. Operations",
      description: "Define business hours, calendars, and support windows.",
      questions: [
        { id: "businessHours", label: "Standard Business Hours", type: "text", required: true, category: "operations" }
      ]
    },
    {
      id: "deployment",
      title: "15. Deployment",
      description: "Define deployment regions and availability zones.",
      questions: [
        { id: "targetRegions", label: "Target Regions", type: "list", required: true, category: "deployment" }
      ]
    },
    {
      id: "compliance",
      title: "16. Compliance",
      description: "Define regulatory standards and audit requirements.",
      questions: [
        { id: "complianceStandards", label: "Compliance Standards", type: "list", required: true, category: "compliance" }
      ]
    },
    {
      id: "lifecycle",
      title: "17. Lifecycle",
      description: "Define maintenance and evolution policies.",
      questions: [
        { id: "maintenancePolicy", label: "Maintenance Policy", type: "text", required: true, category: "lifecycle" }
      ]
    },
    {
      id: "traceability",
      title: "18. Traceability",
      description: "Define requirement to implementation mapping.",
      questions: [
        { id: "traceabilityMatrix", label: "Traceability Matrix Requirements", type: "textarea", required: true, category: "traceability" }
      ]
    },
    {
      id: "final_contract",
      title: "19. Final Contract",
      description: "Review and normalize the complete specification contract.",
      questions: []
    }
  ]
};

export const COMMERCIAL_SCHEMA: ProductSpecificationSchema = {
  classification: "COMMERCIAL_PLATFORM",
  sections: [
    {
      id: "identity",
      title: "2. Platform Identity",
      description: "Platform names, ownership, target markets, and currencies.",
      questions: [
        { id: "productName", label: "Platform Name", type: "text", required: true, placeholder: "e.g. JUMO Commercial Platform", category: "identity" },
        { id: "productVersion", label: "Platform Version", type: "text", required: true, defaultValue: "v1.0.0", category: "identity" },
        { id: "productClass", label: "Platform Class", type: "text", required: true, defaultValue: "Commercial Transaction Engine", category: "identity" },
        { id: "productPurpose", label: "Platform Purpose", type: "textarea", required: true, placeholder: "Drive multi-tenant commercial exchanges...", category: "identity" }
      ]
    },
    {
      id: "capacity",
      title: "4. Capacity and Throughput",
      description: "Expected transactional capacity and API requests.",
      questions: [
        { id: "concurrentUsersCount", label: "Concurrent Transactions Capability", type: "number", required: true, defaultValue: 25000, category: "capacity" },
        { id: "transactionsPerSecond", label: "Sustained Transactions/Sec", type: "number", required: true, defaultValue: 1000, category: "capacity" },
        { id: "storageGb", label: "Object Storage Scale (GB)", type: "number", required: true, defaultValue: 250000, category: "capacity" }
      ]
    }
  ]
};

export const SOFTWARE_SCHEMA: ProductSpecificationSchema = {
  classification: "SOFTWARE_PROGRAM",
  sections: [
    {
      id: "identity",
      title: "2. Program Identity",
      description: "Basic naming and scope parameters.",
      questions: [
        { id: "productName", label: "Program Name", type: "text", required: true, placeholder: "e.g. Real-Time Telemetry Daemon", category: "identity" },
        { id: "productVersion", label: "Program Version", type: "text", required: true, defaultValue: "v1.0.0", category: "identity" },
        { id: "productPurpose", label: "Program Objective", type: "textarea", required: true, placeholder: "Execute high-performance background telemetry logging...", category: "identity" }
      ]
    },
    {
      id: "capacity",
      title: "4. Capacity Metrics",
      description: "Resource targets.",
      questions: [
        { id: "apiRequestsPerSec", label: "API Ingress Capacity (req/sec)", type: "number", required: true, defaultValue: 100, category: "capacity" },
        { id: "availabilityTargetPercentage", label: "Program Availability Target (%)", type: "number", required: true, defaultValue: 99.9, category: "capacity" }
      ]
    }
  ]
};
