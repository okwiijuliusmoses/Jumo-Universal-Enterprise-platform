// JUMO UEOS — Dynamic Schema-Driven Specification Contract Types
// Authoritative definitions for the 19 layers of implementation-grade contracts.

export type ProductClassification = 'ERP_ECOSYSTEM' | 'COMMERCIAL_PLATFORM' | 'SOFTWARE_PROGRAM';

export interface DynamicQuestion {
  id: string;
  label: string;
  type: 'text' | 'number' | 'select' | 'boolean' | 'textarea' | 'list';
  placeholder?: string;
  options?: string[];
  required: boolean;
  defaultValue?: any;
  category: string; // Maps to one of the 19 layers
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

// Complete Implementation-Grade Specification Contract with 12 Core Dimensions
export interface ImplementationGradeSpecificationContract {
  // 1. Product Identity
  identity: {
    productId: string;
    productName: string;
    tenantName: string;
    productClassification: ProductClassification;
    productClass: string;
    brandIdentity: {
      primaryColor?: string;
      secondaryColor?: string;
      logoUrl?: string;
      faviconUrl?: string;
      typography?: string;
    };
    organizationIdentity: string;
    publicFacingName: string;
    internalSystemIdentity: string;
    productVersion: string;
    productDescription: string;
    productPurpose: string;
    targetAudience: string;
    geographicScope: string;
    operatingJurisdictions: string[];
  };

  // 2. Business Specification
  businessSpecification: {
    tenancyModel: 'SINGLE_TENANT' | 'MULTI_TENANT' | 'HYBRID_TENANT';
    tenantHierarchy: string;
    organizationHierarchy: string;
    businessProcesses: string[];
    operatingCalendars: string;
    capacity: {
      usersCount: number;
      concurrentUsersCount: number;
      transactionsPerSecond: number;
      storageGb: number;
    };
  };

  // 3. Domain Specification
  domainSpecification: {
    sector: string;
    domainRequirements: string[];
    complianceStandards: string[];
    industryProtocols: string[];
  };

  // 4. Functional Specification
  functionalSpecification: {
    coreCapabilities: string[];
    portals: string[];
    modules: string[];
    workflows: string[];
    automationLevel: 'MANUAL_ASSISTED' | 'SEMI_AUTONOMOUS' | 'FULLY_AUTONOMOUS';
    reportingRequirements: string[];
  };

  // 5. Digital Experience Specification
  digitalExperience: {
    publicExperience: {
      enabled: boolean;
      landingPage: {
        pagePurpose: string;
        heroTitle: string;
        heroSubtitle: string;
        primaryCTA: string;
        secondaryCTAs: string[];
        featuredServices: boolean;
        sections: string[];
      };
      serviceDiscovery: {
        catalogEnabled: boolean;
        categories: string[];
        searchEnabled: boolean;
      };
      footer: {
        links: string[];
        socialEnabled: boolean;
        legalLinks: string[];
      };
    };
    authenticatedExperience: {
      onboardingRequired: boolean;
      dashboardLayout: 'GRID' | 'WIDGETS' | 'LIST';
      workspaceTheme: 'MODERN' | 'CLASSIC' | 'COMPACT';
      navigationModel: 'SIDEBAR' | 'TOPBAR' | 'HYBRID';
    };
    headerArchitecture: {
      brandLogoEnabled: boolean;
      searchEnabled: boolean;
      notificationsEnabled: boolean;
      accountSwitching: boolean;
      languageSelection: boolean;
      contextSwitching: boolean;
    };
    navigationArchitecture: {
      primaryNav: string[];
      secondaryNav: string[];
      breadcrumbs: boolean;
      roleAware: boolean;
    };
    designSystem: {
      typography: string;
      density: 'COMPACT' | 'STANDARD' | 'SPACIOUS';
      radius: number;
    };
    advertisingEnabled: boolean;
  };

  // 6. AI Experience Specification
  aiExperience: {
    publicAssistant: {
      enabled: boolean;
      assistantName: string;
      welcomeBehavior: string;
      knowledgeScope: string[];
    };
    authenticatedAssistant: {
      enabled: boolean;
      persona: 'EXECUTIVE' | 'ANALYST' | 'ADMINISTRATOR';
      tools: string[];
    };
    domainAssistant: {
      enabled: boolean;
      domainFocus: string;
    };
    administrativeAssistant: {
      enabled: boolean;
    };
    safetyGuardrails: string[];
  };

  // 7. Localization Specification
  localization: {
    defaultLanguage: string;
    supportedLanguages: string[];
    locale: string;
    dateFormat: string;
    numberFormat: string;
    currency: string;
    timezone: string;
    rtlSupport: boolean;
  };

  // 8. Accessibility Specification
  accessibility: {
    targetStandard: 'WCAG_AA' | 'WCAG_AAA';
    keyboardNavigation: boolean;
    screenReaderSupport: boolean;
    reducedMotionSupport: boolean;
    contrastTarget: string;
  };

  // 9. Security Experience Specification
  securityExperience: {
    authenticationMethods: string[];
    mfaRequired: boolean;
    identityVerification: boolean;
    privacyControlsEnabled: boolean;
    sessionManagement: string;
    termsAcceptanceRequired: boolean;
  };

  // 10. Communication Specification
  communication: {
    channels: Array<'IN_APP' | 'EMAIL' | 'SMS' | 'PUSH'>;
    templatesRequired: boolean;
    notificationPreferences: boolean;
    criticalAlertsEnabled: boolean;
  };

  // 11. Device Specification
  deviceExperience: {
    targets: Array<'DESKTOP' | 'TABLET' | 'MOBILE' | 'PWA' | 'NATIVE'>;
    offlineCapability: boolean;
    lowBandwidthOptimization: boolean;
  };

  // 12. Operational Specification
  operational: {
    deploymentType: 'CLOUD' | 'ON_PREMISE' | 'HYBRID';
    availabilityTarget: number;
    backupPolicy: string;
    monitoringRequirements: string[];
    analyticsExperience: {
      usageAnalytics: boolean;
      performanceMonitoring: boolean;
      errorTracking: boolean;
    };
  };

  // Manufacturing Specification
  manufacturing: {
    requiredStudios: string[];
    verificationGates: string[];
    priority: 'NORMAL' | 'HIGH' | 'CRITICAL';
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
