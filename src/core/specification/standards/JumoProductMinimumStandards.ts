/**
 * JUMO UEOS
 * AUTHORITATIVE PRODUCT-SPECIFIC MINIMUM STANDARDS
 *
 * This registry is NOT a universal-count registry.
 *
 * Every sovereign product is independently accountable for its own
 * institutional hierarchy and physical runtime implementation.
 *
 * Canonical hierarchy:
 *
 * Platform Kernel
 *   → Sovereign Product
 *     → Directorate
 *       → Department
 *         → Office
 *           → Portal
 *             → Module
 *               → Capability
 *                 → UI Metadata
 *                   → Runtime Component
 *
 * IMPORTANT:
 * - Universal registry totals MUST NOT be used as product compliance.
 * - A module registered globally does NOT mean that every product owns it.
 * - A capability registered globally does NOT mean that every product implements it.
 * - Product compliance requires physical, traceable implementation.
 * - Shared platforms such as JUMO DIGITAL PAY may be consumed by products
 *   but must not be falsely counted as product-owned modules.
 */

export type ProductTier =
  | 'SOVEREIGN'
  | 'ENTERPRISE'
  | 'SHARED_PLATFORM';

export type ProductStandard = {
  productId: string;
  productCode: string;
  productName: string;
  tier: ProductTier;
  domain: string;

  hierarchy: {
    directorates: number;
    departments: number;
    offices: number;
    portals: number;
    modules: number;
    capabilities: number;
    uiMetadata: number;
    runtimeComponents: number;
  };

  operations: {
    forms: number;
    workflows: number;
    reports: number;
    dashboards: number;
    tables: number;
    actions: number;
    permissions: number;
    apiEndpoints: number;
    databaseSchemas: number;
  };

  runtimeRequirements: {
    everyPortalMustBeRoutable: boolean;
    everyModuleMustBeReachable: boolean;
    everyCapabilityMustHaveRuntimeComponent: boolean;
    everyCapabilityMustHavePermission: boolean;
    everyModuleMustHaveUI: boolean;
    everyModuleMustHaveAtLeastOneCapability: boolean;
    everyPortalMustHaveAuthentication: boolean;
    everyOfficeMustHavePortalAssignment: boolean;
    everyDepartmentMustHaveOfficeAssignment: boolean;
    everyDirectorateMustHaveDepartmentAssignment: boolean;
  };

  evidenceRequirements: {
    registryEvidence: boolean;
    sourceFileEvidence: boolean;
    routeEvidence: boolean;
    componentEvidence: boolean;
    metadataEvidence: boolean;
    workflowEvidence: boolean;
    apiEvidence: boolean;
    schemaEvidence: boolean;
  };

  reconstructionPolicy: {
    allowUniversalCountSubstitution: false;
    allowSyntheticInflation: false;
    allowPlaceholderCompliance: false;
    allowEmptyPortalCompliance: false;
    allowEmptyModuleCompliance: false;
    allowUnroutedModuleCompliance: false;
  };
};

/**
 * The following values are PRODUCT-SPECIFIC minimums.
 *
 * They are intentionally repeated per product because each product must
 * independently satisfy its own standard.
 *
 * These are standards, NOT current census results.
 * Actual implementation counts must be obtained from the physical repository.
 */

const ENTERPRISE_HIERARCHY = {
  directorates: 40,
  departments: 200,
  offices: 1000,
  portals: 5,
  modules: 210,
  capabilities: 25000,
  uiMetadata: 210,
  runtimeComponents: 210,
};

const ENTERPRISE_OPERATIONS = {
  forms: 150,
  workflows: 50,
  reports: 100,
  dashboards: 25,
  tables: 100,
  actions: 500,
  permissions: 500,
  apiEndpoints: 100,
  databaseSchemas: 25,
};

const RUNTIME_REQUIREMENTS = {
  everyPortalMustBeRoutable: true,
  everyModuleMustBeReachable: true,
  everyCapabilityMustHaveRuntimeComponent: true,
  everyCapabilityMustHavePermission: true,
  everyModuleMustHaveUI: true,
  everyModuleMustHaveAtLeastOneCapability: true,
  everyPortalMustHaveAuthentication: true,
  everyOfficeMustHavePortalAssignment: true,
  everyDepartmentMustHaveOfficeAssignment: true,
  everyDirectorateMustHaveDepartmentAssignment: true,
};

const EVIDENCE_REQUIREMENTS = {
  registryEvidence: true,
  sourceFileEvidence: true,
  routeEvidence: true,
  componentEvidence: true,
  metadataEvidence: true,
  workflowEvidence: true,
  apiEvidence: true,
  schemaEvidence: true,
};

const RECONSTRUCTION_POLICY = {
  allowUniversalCountSubstitution: false as const,
  allowSyntheticInflation: false as const,
  allowPlaceholderCompliance: false as const,
  allowEmptyPortalCompliance: false as const,
  allowEmptyModuleCompliance: false as const,
  allowUnroutedModuleCompliance: false as const,
};

/**
 * National Identity
 */
export const NATIONAL_IDENTITY_MINIMUM_STANDARD: ProductStandard = {
  productId: 'prod-national-identity',
  productCode: 'NATIONAL-IDENTITY',
  productName: 'JUMO National Identity & Biometrics Platform',
  tier: 'SOVEREIGN',
  domain: 'SOVEREIGN_IDENTITY',

  hierarchy: {
    ...ENTERPRISE_HIERARCHY,
  },

  operations: {
    ...ENTERPRISE_OPERATIONS,
  },

  runtimeRequirements: {
    ...RUNTIME_REQUIREMENTS,
  },

  evidenceRequirements: {
    ...EVIDENCE_REQUIREMENTS,
  },

  reconstructionPolicy: {
    ...RECONSTRUCTION_POLICY,
  },
};

/**
 * National Health
 */
export const NATIONAL_HEALTH_MINIMUM_STANDARD: ProductStandard = {
  productId: 'prod-national-health',
  productCode: 'NATIONAL-HEALTH',
  productName: 'JUMO National Health EMR & Disease Surveillance Platform',
  tier: 'SOVEREIGN',
  domain: 'NATIONAL_HEALTHCARE',

  hierarchy: {
    ...ENTERPRISE_HIERARCHY,
  },

  operations: {
    ...ENTERPRISE_OPERATIONS,
  },

  runtimeRequirements: {
    ...RUNTIME_REQUIREMENTS,
  },

  evidenceRequirements: {
    ...EVIDENCE_REQUIREMENTS,
  },

  reconstructionPolicy: {
    ...RECONSTRUCTION_POLICY,
  },
};

/**
 * National Education
 */
export const NATIONAL_EDUCATION_MINIMUM_STANDARD: ProductStandard = {
  productId: 'prod-national-education',
  productCode: 'NATIONAL-EDUCATION',
  productName: 'JUMO National Education Standards & Certification Platform',
  tier: 'SOVEREIGN',
  domain: 'NATIONAL_EDUCATION',

  hierarchy: {
    ...ENTERPRISE_HIERARCHY,
  },

  operations: {
    ...ENTERPRISE_OPERATIONS,
  },

  runtimeRequirements: {
    ...RUNTIME_REQUIREMENTS,
  },

  evidenceRequirements: {
    ...EVIDENCE_REQUIREMENTS,
  },

  reconstructionPolicy: {
    ...RECONSTRUCTION_POLICY,
  },
};

/**
 * FINTECH
 */
export const FINTECH_MINIMUM_STANDARD: ProductStandard = {
  productId: 'prod-fintech',
  productCode: 'FINTECH',
  productName: 'JUMO FINTECH SACCO & Core Banking Platform',
  tier: 'SOVEREIGN',
  domain: 'FINANCIAL_SERVICES',

  hierarchy: {
    ...ENTERPRISE_HIERARCHY,
  },

  operations: {
    ...ENTERPRISE_OPERATIONS,
  },

  runtimeRequirements: {
    ...RUNTIME_REQUIREMENTS,
  },

  evidenceRequirements: {
    ...EVIDENCE_REQUIREMENTS,
  },

  reconstructionPolicy: {
    ...RECONSTRUCTION_POLICY,
  },
};

/**
 * FAAP
 */
export const FAAP_MINIMUM_STANDARD: ProductStandard = {
  productId: 'prod-faap',
  productCode: 'FAAP',
  productName: 'JUMO FAAP Statutory Accounting & Financial Administration Platform',
  tier: 'SOVEREIGN',
  domain: 'STATUTORY_FINANCE',

  hierarchy: {
    ...ENTERPRISE_HIERARCHY,
  },

  operations: {
    ...ENTERPRISE_OPERATIONS,
  },

  runtimeRequirements: {
    ...RUNTIME_REQUIREMENTS,
  },

  evidenceRequirements: {
    ...EVIDENCE_REQUIREMENTS,
  },

  reconstructionPolicy: {
    ...RECONSTRUCTION_POLICY,
  },
};

/**
 * Nursery & Primary ERP
 */
export const NURSERY_PRIMARY_MINIMUM_STANDARD: ProductStandard = {
  productId: 'prod-nursery-primary',
  productCode: 'NURSERY-PRIMARY-ERP',
  productName: 'JUMO Nursery & Primary School ERP',
  tier: 'ENTERPRISE',
  domain: 'PRIMARY_EDUCATION',

  hierarchy: {
    ...ENTERPRISE_HIERARCHY,
  },

  operations: {
    ...ENTERPRISE_OPERATIONS,
  },

  runtimeRequirements: {
    ...RUNTIME_REQUIREMENTS,
  },

  evidenceRequirements: {
    ...EVIDENCE_REQUIREMENTS,
  },

  reconstructionPolicy: {
    ...RECONSTRUCTION_POLICY,
  },
};

/**
 * Secondary School ERP
 */
export const SECONDARY_SCHOOL_MINIMUM_STANDARD: ProductStandard = {
  productId: 'prod-secondary-school',
  productCode: 'SECONDARY-SCHOOL-ERP',
  productName: 'JUMO Secondary School ERP',
  tier: 'ENTERPRISE',
  domain: 'SECONDARY_EDUCATION',

  hierarchy: {
    ...ENTERPRISE_HIERARCHY,
  },

  operations: {
    ...ENTERPRISE_OPERATIONS,
  },

  runtimeRequirements: {
    ...RUNTIME_REQUIREMENTS,
  },

  evidenceRequirements: {
    ...EVIDENCE_REQUIREMENTS,
  },

  reconstructionPolicy: {
    ...RECONSTRUCTION_POLICY,
  },
};

/**
 * University / Higher Education ERP
 */
export const UNIVERSITY_TERTIARY_MINIMUM_STANDARD: ProductStandard = {
  productId: 'prod-university-tertiary',
  productCode: 'UNIVERSITY-TERTIARY-ERP',
  productName: 'JUMO University & Higher Education ERP',
  tier: 'ENTERPRISE',
  domain: 'HIGHER_EDUCATION',

  hierarchy: {
    ...ENTERPRISE_HIERARCHY,
  },

  operations: {
    ...ENTERPRISE_OPERATIONS,
  },

  runtimeRequirements: {
    ...RUNTIME_REQUIREMENTS,
  },

  evidenceRequirements: {
    ...EVIDENCE_REQUIREMENTS,
  },

  reconstructionPolicy: {
    ...RECONSTRUCTION_POLICY,
  },
};

/**
 * Church & Faith ERP
 */
export const CHURCH_FAITH_MINIMUM_STANDARD: ProductStandard = {
  productId: 'prod-church-faith',
  productCode: 'CHURCH-FAITH-ERP',
  productName: 'JUMO Church & Faith-Based Institutions ERP',
  tier: 'ENTERPRISE',
  domain: 'FAITH_COMMUNITY',

  hierarchy: {
    ...ENTERPRISE_HIERARCHY,
  },

  operations: {
    ...ENTERPRISE_OPERATIONS,
  },

  runtimeRequirements: {
    ...RUNTIME_REQUIREMENTS,
  },

  evidenceRequirements: {
    ...EVIDENCE_REQUIREMENTS,
  },

  reconstructionPolicy: {
    ...RECONSTRUCTION_POLICY,
  },
};

/**
 * Alumni & Community Advancement ERP
 */
export const ALUMNI_COMMUNITY_MINIMUM_STANDARD: ProductStandard = {
  productId: 'prod-alumni-community',
  productCode: 'ALUMNI-COMMUNITY-ERP',
  productName: 'JUMO Alumni & Community Advancement ERP',
  tier: 'ENTERPRISE',
  domain: 'ADVANCEMENT_COMMUNITY',

  hierarchy: {
    ...ENTERPRISE_HIERARCHY,
  },

  operations: {
    ...ENTERPRISE_OPERATIONS,
  },

  runtimeRequirements: {
    ...RUNTIME_REQUIREMENTS,
  },

  evidenceRequirements: {
    ...EVIDENCE_REQUIREMENTS,
  },

  reconstructionPolicy: {
    ...RECONSTRUCTION_POLICY,
  },
};

/**
 * Authoritative sovereign product collection.
 *
 * IMPORTANT:
 * This array contains standards only.
 * It does NOT represent current implementation counts.
 */
export const JUMO_SOVEREIGN_PRODUCT_MINIMUM_STANDARDS: ProductStandard[] = [
  NATIONAL_IDENTITY_MINIMUM_STANDARD,
  NATIONAL_HEALTH_MINIMUM_STANDARD,
  NATIONAL_EDUCATION_MINIMUM_STANDARD,
  FINTECH_MINIMUM_STANDARD,
  FAAP_MINIMUM_STANDARD,
  NURSERY_PRIMARY_MINIMUM_STANDARD,
  SECONDARY_SCHOOL_MINIMUM_STANDARD,
  UNIVERSITY_TERTIARY_MINIMUM_STANDARD,
  CHURCH_FAITH_MINIMUM_STANDARD,
  ALUMNI_COMMUNITY_MINIMUM_STANDARD,
];

/**
 * JUMO DIGITAL PAY is a shared platform.
 *
 * It is intentionally excluded from the sovereign-product census above.
 * Products may consume Digital Pay capabilities without those capabilities
 * being counted as product-owned capabilities.
 */
export const JUMO_SHARED_PLATFORM_IDS = [
  'digital-pay',
  'aegis',
  'treasury',
  'digital-auditor',
  'ai-hybrid',
  'workflow',
  'cloud',
] as const;

/**
 * Retrieve the authoritative standard for one sovereign product.
 */
export function getProductMinimumStandard(
  productId: string,
): ProductStandard | undefined {
  return JUMO_SOVEREIGN_PRODUCT_MINIMUM_STANDARDS.find(
    (standard) =>
      standard.productId.toLowerCase() === productId.toLowerCase() ||
      standard.productCode.toLowerCase() === productId.toLowerCase(),
  );
}

/**
 * Return only sovereign products.
 */
export function getSovereignProductMinimumStandards(): ProductStandard[] {
  return [...JUMO_SOVEREIGN_PRODUCT_MINIMUM_STANDARDS];
}

/**
 * Determine whether an identifier belongs to a shared platform.
 */
export function isSharedPlatform(productId: string): boolean {
  return JUMO_SHARED_PLATFORM_IDS.some(
    (id) => id.toLowerCase() === productId.toLowerCase(),
  );
}

/**
 * Minimum-standard interpretation:
 *
 * A product passes only when its OWN physical census satisfies its OWN
 * standard. Global registry counts cannot satisfy this function.
 */
export function minimumStandardRequirementMet(
  required: number,
  actualPhysicalCount: number,
): boolean {
  return actualPhysicalCount >= required;
}

/**
 * Explicitly documents the compliance rule so that verification code,
 * dashboards, AI agents and reconstruction agents cannot reinterpret it.
 */
export const JUMO_MINIMUM_STANDARDS_COMPLIANCE_RULE = Object.freeze({
  productIsolation: true,
  physicalEvidenceRequired: true,
  registryOnlyEvidenceInsufficient: true,
  universalTotalsAreNotProductCounts: true,
  sharedPlatformCountsAreExcludedFromProductOwnership: true,
  emptyPortalsFailCompliance: true,
  emptyModulesFailCompliance: true,
  missingRuntimeComponentsFailCompliance: true,
  missingPermissionsFailCompliance: true,
  missingRoutesFailCompliance: true,
  missingApiEvidenceFailsCompliance: true,
  missingSchemaEvidenceFailsCompliance: true,
});
