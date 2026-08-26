/**
 * JUMO UEOS
 * PHASE 3 — SIX-PRODUCT UNIVERSAL UI / RUNTIME COMPLETION CONTRACT
 *
 * STATUS:
 *   AUTHORIZED FOR IMPLEMENTATION
 *
 * OBJECTIVE:
 *   Complete the recovered six approved JUMO products from:
 *
 *     Product
 *       -> Directorate
 *       -> Department
 *       -> Office
 *       -> Portal
 *       -> Module
 *       -> Capability
 *       -> UI Metadata
 *       -> Runtime Component
 *
 * This is an ADDITIVE completion and synchronization phase.
 *
 * NEVER:
 *   - delete recovered products
 *   - replace recovered modules with samples
 *   - reduce module counts
 *   - replace registries with hardcoded arrays
 *   - remove portals
 *   - remove offices
 *   - remove departments
 *   - remove capabilities
 *   - remove workflows
 *   - remove AI capabilities
 *   - replace working product architecture with mock/demo data
 *   - implement only Nursery & Primary
 *
 * ALL SIX PRODUCTS ARE IN SCOPE.
 */

export const JUMO_PHASE_3_CONTRACT = {
  phase: "PHASE_3_UNIVERSAL_UI_RUNTIME_COMPLETION",

  authoritativeProducts: [
    "FINTECH_ERP",
    "NURSERY_PRIMARY_CONSOLIDATED_ERP",
    "SECONDARY_SCHOOL_ERP",
    "ALUMNI_ERP",
    "CHURCH_ERP",
    "OWNERS_CONTROL_CENTER"
  ],

  canonicalHierarchy: [
    "PLATFORM_KERNEL",
    "SOVEREIGN_PRODUCT",
    "DIRECTORATE",
    "DEPARTMENT",
    "OFFICE",
    "PORTAL",
    "MODULE",
    "CAPABILITY",
    "UI_METADATA",
    "RUNTIME_COMPONENT"
  ],

  requiredMetadataFamilies: [
    "navigation",
    "dashboard",
    "forms",
    "tables",
    "reports",
    "workflows",
    "actions",
    "permissions",
    "ai",
    "runtimeComponents",
    "search",
    "filters",
    "charts",
    "KPIs",
    "notifications",
    "approvals",
    "documents",
    "exports",
    "imports",
    "audit",
    "settings",
    "help",
    "emptyStates",
    "loadingStates",
    "errorStates"
  ],

  requiredRuntimeLayers: [
    "authentication",
    "authorization",
    "productShell",
    "officeShell",
    "portalShell",
    "moduleWorkspace",
    "capabilityWorkspace",
    "metadataResolver",
    "dynamicRenderer",
    "workflowRuntime",
    "AIIntegration",
    "FAAPIntegration",
    "auditRuntime",
    "notificationRuntime"
  ]
} as const;

export const MODULE_IS_NOT_COMPLETION = {
  modulesRecovered: false,
  productRecovered: false,
  productComplete: false,

  completionRequires: [
    "product",
    "directorates",
    "departments",
    "offices",
    "portals",
    "modules",
    "capabilities",
    "uiMetadata",
    "dashboards",
    "forms",
    "tables",
    "reports",
    "workflows",
    "actions",
    "permissions",
    "AI capabilities",
    "runtime components",
    "navigation",
    "authentication",
    "authorization",
    "notifications",
    "audit",
    "search",
    "filters",
    "exports",
    "imports",
    "settings",
    "runtime integration"
  ]
} as const;

export const PRODUCT_RULES = {
  FINTECH_ERP: {
    independent: true,
    preserveAllExistingFintechFamilies: true,
    preserveFAAP: true,
    preserveAIWorkforce: true,
    preserveFinancialDomains: true
  },

  NURSERY_PRIMARY_CONSOLIDATED_ERP: {
    independent: true,
    nurseryAndPrimaryAreOneProduct: true,
    preserveECD: true,
    preservePrimary: true,
    preserveFinance: true,
    preserveAdmissions: true,
    preserveClinic: true,
    preserveCatering: true,
    preserveTransport: true,
    preserveSafeguarding: true
  },

  SECONDARY_SCHOOL_ERP: {
    independent: true,
    preserveSecondaryAcademics: true,
    preserveUNEB: true,
    preserveBoarding: true,
    preserveFinance: true,
    preserveGovernance: true,
    preserveSIS: true
  },

  ALUMNI_ERP: {
    independent: true,
    preserveAllRecoveredArchitecture: true,
    completeUniversalMetadata: true
  },

  CHURCH_ERP: {
    independent: true,
    preserveAllRecoveredArchitecture: true,
    completeUniversalMetadata: true
  },

  OWNERS_CONTROL_CENTER: {
    independent: true,
    sovereignControlProduct: true,
    preserveSecurity: true,
    preserveAI: true,
    preserveRegistryAdministration: true,
    preservePlatformAdministration: true
  }
} as const;

export const LOGIN_REGRESSION_ROUTES = [
  "/products/fintech/login",
  "/products/nursery-primary/login",
  "/products/secondary/login",
  "/products/alumni/login",
  "/products/church/login",
  "/products/owners-control-center/login"
] as const;

export default JUMO_PHASE_3_CONTRACT;
