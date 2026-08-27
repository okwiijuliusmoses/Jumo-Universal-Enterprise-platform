/**
 * JUMO UEOS — PRODUCT PHYSICAL CENSUS
 *
 * This service reports the PHYSICAL implementation of each product.
 *
 * IMPORTANT:
 * 1. Each product is counted independently.
 * 2. Global registry totals are never substituted for product counts.
 * 3. Shared platforms are independently censused when they are sovereign
 *    products/platforms in their own right.
 * 4. A registry declaration is not physical implementation evidence.
 * 5. Placeholder, empty, or merely named modules do not constitute compliance.
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
 */

export interface ProductPhysicalCounts {
  directorates: number;
  departments: number;
  offices: number;
  portals: number;
  modules: number;
  capabilities: number;
  uiMetadata: number;
  runtimeComponents: number;

  forms: number;
  workflows: number;
  reports: number;
  dashboards: number;
  tables: number;
  actions: number;
  permissions: number;
  apiEndpoints: number;
  databaseSchemas: number;
}

export interface ProductPhysicalCensus {
  productId: string;
  productCode: string;
  productName: string;
  category:
    | 'SOVEREIGN_PRODUCT'
    | 'ENTERPRISE_PRODUCT'
    | 'SOVEREIGN_PLATFORM';

  counts: ProductPhysicalCounts;

  evidence: {
    sourceFiles: string[];
    registryFiles: string[];
    routeFiles: string[];
    componentFiles: string[];
  };

  compliance: {
    censusCompleted: boolean;
    physicalEvidenceFound: boolean;
    registryOnly: boolean;
    compliant: boolean;
    deficiencies: string[];
  };
}

/**
 * Canonical product inventory.
 *
 * FAAP and JUMO DIGITAL PAY are deliberately included as independent
 * sovereign platforms/products. Their use by other products does not
 * eliminate their own physical census.
 */
export const JUMO_CENSUS_PRODUCTS = [
  {
    productId: 'prod-national-identity',
    productCode: 'NATIONAL-IDENTITY',
    productName: 'JUMO National Identity & Biometrics Platform',
    category: 'SOVEREIGN_PRODUCT',
  },
  {
    productId: 'prod-national-health',
    productCode: 'NATIONAL-HEALTH',
    productName: 'JUMO National Health EMR & Disease Surveillance Platform',
    category: 'SOVEREIGN_PRODUCT',
  },
  {
    productId: 'prod-national-education',
    productCode: 'NATIONAL-EDUCATION',
    productName:
      'JUMO National Education Standards & Certification Platform',
    category: 'SOVEREIGN_PRODUCT',
  },
  {
    productId: 'prod-fintech',
    productCode: 'FINTECH',
    productName: 'JUMO FINTECH SACCO & Core Banking Platform',
    category: 'SOVEREIGN_PRODUCT',
  },
  {
    productId: 'prod-faap',
    productCode: 'FAAP',
    productName:
      'JUMO FAAP Statutory Accounting & Financial Administration Platform',
    category: 'SOVEREIGN_PLATFORM',
  },
  {
    productId: 'prod-digital-pay',
    productCode: 'DIGITAL-PAY',
    productName: 'JUMO DIGITAL PAY Payment Platform',
    category: 'SOVEREIGN_PLATFORM',
  },
  {
    productId: 'prod-nursery-primary',
    productCode: 'NURSERY-PRIMARY-ERP',
    productName: 'JUMO Nursery & Primary School ERP',
    category: 'ENTERPRISE_PRODUCT',
  },
  {
    productId: 'prod-secondary-school',
    productCode: 'SECONDARY-SCHOOL-ERP',
    productName: 'JUMO Secondary School ERP',
    category: 'ENTERPRISE_PRODUCT',
  },
  {
    productId: 'prod-university-tertiary',
    productCode: 'UNIVERSITY-TERTIARY-ERP',
    productName: 'JUMO University & Higher Education ERP',
    category: 'ENTERPRISE_PRODUCT',
  },
  {
    productId: 'prod-church-faith',
    productCode: 'CHURCH-FAITH-ERP',
    productName: 'JUMO Church & Faith-Based Institutions ERP',
    category: 'ENTERPRISE_PRODUCT',
  },
  {
    productId: 'prod-alumni-community',
    productCode: 'ALUMNI-COMMUNITY-ERP',
    productName: 'JUMO Alumni & Community Advancement ERP',
    category: 'ENTERPRISE_PRODUCT',
  },
] as const;

/**
 * Empty census template.
 *
 * Zero is an actual physical finding when the repository contains no
 * evidence. It must NEVER be replaced by a standard/target value.
 */
export function createEmptyPhysicalCounts(): ProductPhysicalCounts {
  return {
    directorates: 0,
    departments: 0,
    offices: 0,
    portals: 0,
    modules: 0,
    capabilities: 0,
    uiMetadata: 0,
    runtimeComponents: 0,

    forms: 0,
    workflows: 0,
    reports: 0,
    dashboards: 0,
    tables: 0,
    actions: 0,
    permissions: 0,
    apiEndpoints: 0,
    databaseSchemas: 0,
  };
}

/**
 * Create an empty physical census for a product.
 */
export function createEmptyProductPhysicalCensus(
  productId: string,
  productCode: string,
  productName: string,
  category:
    | 'SOVEREIGN_PRODUCT'
    | 'ENTERPRISE_PRODUCT'
    | 'SOVEREIGN_PLATFORM',
): ProductPhysicalCensus {
  return {
    productId,
    productCode,
    productName,
    category,

    counts: createEmptyPhysicalCounts(),

    evidence: {
      sourceFiles: [],
      registryFiles: [],
      routeFiles: [],
      componentFiles: [],
    },

    compliance: {
      censusCompleted: false,
      physicalEvidenceFound: false,
      registryOnly: false,
      compliant: false,
      deficiencies: [],
    },
  };
}

/**
 * A physical count must come from repository evidence.
 *
 * This helper intentionally does not accept registry totals or minimum
 * standards as evidence.
 */
export function recordPhysicalCount(
  counts: ProductPhysicalCounts,
  key: keyof ProductPhysicalCounts,
  amount = 1,
): ProductPhysicalCounts {
  if (!Number.isFinite(amount) || amount < 0) {
    throw new Error(`Invalid physical count for ${String(key)}: ${amount}`);
  }

  return {
    ...counts,
    [key]: counts[key] + Math.floor(amount),
  };
}

/**
 * Mark physical evidence for a product.
 */
export function addPhysicalEvidence(
  census: ProductPhysicalCensus,
  type:
    | 'sourceFiles'
    | 'registryFiles'
    | 'routeFiles'
    | 'componentFiles',
  filePath: string,
): ProductPhysicalCensus {
  if (!filePath.trim()) {
    return census;
  }

  if (!census.evidence[type].includes(filePath)) {
    census.evidence[type].push(filePath);
  }

  census.compliance.physicalEvidenceFound =
    census.evidence.sourceFiles.length > 0 ||
    census.evidence.componentFiles.length > 0;

  return census;
}

/**
 * Determine whether the product has genuine physical implementation
 * evidence.
 */
export function hasPhysicalImplementationEvidence(
  census: ProductPhysicalCensus,
): boolean {
  return (
    census.evidence.sourceFiles.length > 0 ||
    census.evidence.componentFiles.length > 0 ||
    census.evidence.routeFiles.length > 0
  );
}

/**
 * Produce explicit deficiencies without inventing missing counts.
 */
export function evaluatePhysicalCensus(
  census: ProductPhysicalCensus,
): ProductPhysicalCensus {
  const deficiencies: string[] = [];

  if (census.counts.directorates === 0) {
    deficiencies.push('No physical directorates detected.');
  }

  if (census.counts.departments === 0) {
    deficiencies.push('No physical departments detected.');
  }

  if (census.counts.offices === 0) {
    deficiencies.push('No physical offices detected.');
  }

  if (census.counts.portals === 0) {
    deficiencies.push('No physical portals detected.');
  }

  if (census.counts.modules === 0) {
    deficiencies.push('No physical modules detected.');
  }

  if (census.counts.capabilities === 0) {
    deficiencies.push('No physical capabilities detected.');
  }

  if (census.counts.uiMetadata === 0) {
    deficiencies.push('No physical UI metadata detected.');
  }

  if (census.counts.runtimeComponents === 0) {
    deficiencies.push('No physical runtime components detected.');
  }

  if (!hasPhysicalImplementationEvidence(census)) {
    deficiencies.push('No physical implementation evidence detected.');
  }

  census.compliance.censusCompleted = true;
  census.compliance.physicalEvidenceFound =
    hasPhysicalImplementationEvidence(census);
  census.compliance.registryOnly =
    census.evidence.registryFiles.length > 0 &&
    !census.compliance.physicalEvidenceFound;

  census.compliance.deficiencies = deficiencies;

  /**
   * This function only establishes physical census integrity.
   * Minimum-standard comparison must be performed separately against the
   * product-specific standard.
   */
  census.compliance.compliant =
    census.compliance.physicalEvidenceFound &&
    deficiencies.length === 0;

  return census;
}

/**
 * Convert a product census into a concise audit record.
 */
export function summarizeProductPhysicalCensus(
  census: ProductPhysicalCensus,
) {
  return {
    productId: census.productId,
    productCode: census.productCode,
    productName: census.productName,
    category: census.category,

    directorates: census.counts.directorates,
    departments: census.counts.departments,
    offices: census.counts.offices,
    portals: census.counts.portals,
    modules: census.counts.modules,
    capabilities: census.counts.capabilities,
    uiMetadata: census.counts.uiMetadata,
    runtimeComponents: census.counts.runtimeComponents,

    forms: census.counts.forms,
    workflows: census.counts.workflows,
    reports: census.counts.reports,
    dashboards: census.counts.dashboards,
    tables: census.counts.tables,
    actions: census.counts.actions,
    permissions: census.counts.permissions,
    apiEndpoints: census.counts.apiEndpoints,
    databaseSchemas: census.counts.databaseSchemas,

    physicalEvidenceFound: census.compliance.physicalEvidenceFound,
    registryOnly: census.compliance.registryOnly,
    compliant: census.compliance.compliant,
    deficiencies: [...census.compliance.deficiencies],
  };
}

/**
 * Build the initial independent census set.
 *
 * These are deliberately empty until the repository scanner discovers
 * actual implementation evidence.
 */
export function createInitialJumoPhysicalCensus(): ProductPhysicalCensus[] {
  return JUMO_CENSUS_PRODUCTS.map((product) =>
    createEmptyProductPhysicalCensus(
      product.productId,
      product.productCode,
      product.productName,
      product.category,
    ),
  );
}

/**
 * Guard against the old architectural error:
 *
 * A universal number cannot be presented as the count of every product.
 */
export function assertProductSpecificCensus(
  censuses: ProductPhysicalCensus[],
): void {
  const productIds = new Set<string>();

  for (const census of censuses) {
    if (productIds.has(census.productId)) {
      throw new Error(
        `Duplicate product census detected: ${census.productId}`,
      );
    }

    productIds.add(census.productId);

    if (!census.productCode || !census.productName) {
      throw new Error(
        `Incomplete product census identity: ${census.productId}`,
      );
    }
  }
}

/**
 * Authoritative statement for AI agents and audit interfaces.
 */
export const PRODUCT_PHYSICAL_CENSUS_POLICY = Object.freeze({
  independentProductCounts: true,
  physicalEvidenceRequired: true,
  universalTotalsProhibited: true,
  registryTotalsCannotSubstituteForPhysicalCounts: true,
  standardsCannotBeUsedAsActualCounts: true,
  sharedPlatformsHaveIndependentCensuses: true,
  faapHasIndependentCensus: true,
  digitalPayHasIndependentCensus: true,
  zeroIsValidPhysicalFinding: true,
  syntheticInflationProhibited: true,
  placeholderComplianceProhibited: true,
});
