import { CanonicalProductHierarchy } from './types';
import { FINTECH_HIERARCHY } from './fintech';

// Shared Sovereign Platform Layers (Mounted as FINTECH internal modules)
import { FAAP_HIERARCHY } from './faap';
import { DIGITAL_PAY_HIERARCHY } from './digitalPay';

export * from './types';
export { FINTECH_HIERARCHY } from './fintech';
export { FAAP_HIERARCHY } from './faap';
export { DIGITAL_PAY_HIERARCHY } from './digitalPay';

/**
 * 1. AUTHORITATIVE PRIMARY SOVEREIGN PRODUCT FAMILIES
 * Exclusively JUMO FINTECH for the current reconstruction phase.
 */
export const PRIMARY_SOVEREIGN_PRODUCTS: CanonicalProductHierarchy[] = [
  FINTECH_HIERARCHY,             // JUMO FINTECH
];

/**
 * 2. SHARED SOVEREIGN PLATFORM SUITE
 */
export const SHARED_SOVEREIGN_PLATFORMS: CanonicalProductHierarchy[] = [
  FAAP_HIERARCHY,                // JUMO FAAP
  DIGITAL_PAY_HIERARCHY,         // JUMO DIGITAL PAY
];

/**
 * 3. RECLASSIFIED HISTORICAL / DOMAIN SERVICES
 */
export const RECLASSIFIED_HISTORICAL_REGISTRIES: CanonicalProductHierarchy[] = [];

/**
 * ALL COMBINED HIERARCHIES FOR UNIFIED REGISTRY SCANNING
 */
export const ALL_CANONICAL_PRODUCT_HIERARCHIES: CanonicalProductHierarchy[] = [
  ...PRIMARY_SOVEREIGN_PRODUCTS,
  ...SHARED_SOVEREIGN_PLATFORMS
];

export const PRIMARY_PRODUCT_MAP: Record<string, CanonicalProductHierarchy> = {
  'JUMO-FINTECH': FINTECH_HIERARCHY,
  'prod-fintech': FINTECH_HIERARCHY
};

export const CANONICAL_PRODUCT_MAP: Record<string, CanonicalProductHierarchy> = {
  ...PRIMARY_PRODUCT_MAP,
  'prod-faap': FAAP_HIERARCHY,
  'JUMO-FAAP': FAAP_HIERARCHY,
  'prod-digital-pay': DIGITAL_PAY_HIERARCHY,
  'JUMO-DIGITAL-PAY': DIGITAL_PAY_HIERARCHY
};

export function getCanonicalProduct(productId: string): CanonicalProductHierarchy | undefined {
  return CANONICAL_PRODUCT_MAP[productId];
}

export function getPrimaryProduct(productId: string): CanonicalProductHierarchy | undefined {
  return PRIMARY_PRODUCT_MAP[productId];
}

/**
 * Authoritative Product-Isolated Census for Primary Sovereign Products
 */
export function getProductIsolatedCensus(productId: string) {
  const hierarchy = CANONICAL_PRODUCT_MAP[productId];
  if (!hierarchy) return null;

  return {
    productId: hierarchy.product.id,
    code: hierarchy.product.code,
    name: hierarchy.product.name,
    category: hierarchy.product.category,
    directorates: hierarchy.directorates.length,
    departments: hierarchy.departments.length,
    offices: hierarchy.offices.length,
    portals: hierarchy.portals.length,
    modules: hierarchy.modules.length,
    capabilities: hierarchy.capabilities.length,
    screens: hierarchy.screens.length,
    forms: hierarchy.forms.length,
    dashboards: hierarchy.dashboards.length,
    reports: hierarchy.reports.length,
    workflows: hierarchy.workflows.length,
    databaseEntities: hierarchy.databaseEntities.length,
    apis: hierarchy.apis.length,
    runtimeComponents: hierarchy.runtimeComponents.length,
    permissions: hierarchy.permissions.length,
    roles: hierarchy.roles.length
  };
}

export function getCanonicalCensus() {
  const totals = {
    primaryProducts: PRIMARY_SOVEREIGN_PRODUCTS.length,
    sharedPlatforms: SHARED_SOVEREIGN_PLATFORMS.length,
    products: ALL_CANONICAL_PRODUCT_HIERARCHIES.length,
    directorates: 0,
    departments: 0,
    offices: 0,
    portals: 0,
    modules: 0,
    capabilities: 0,
    screens: 0,
    forms: 0,
    dashboards: 0,
    reports: 0,
    workflows: 0,
    databaseEntities: 0,
    apis: 0,
    runtimeComponents: 0,
    permissions: 0,
    roles: 0
  };

  const primaryBreakdown = PRIMARY_SOVEREIGN_PRODUCTS.map(h => {
    totals.directorates += h.directorates.length;
    totals.departments += h.departments.length;
    totals.offices += h.offices.length;
    totals.portals += h.portals.length;
    totals.modules += h.modules.length;
    totals.capabilities += h.capabilities.length;
    totals.screens += h.screens.length;
    totals.forms += h.forms.length;
    totals.dashboards += h.dashboards.length;
    totals.reports += h.reports.length;
    totals.workflows += h.workflows.length;
    totals.databaseEntities += h.databaseEntities.length;
    totals.apis += h.apis.length;
    totals.runtimeComponents += h.runtimeComponents.length;
    totals.permissions += h.permissions.length;
    totals.roles += h.roles.length;

    return {
      id: h.product.id,
      code: h.product.code,
      name: h.product.name,
      category: h.product.category,
      directoratesCount: h.directorates.length,
      departmentsCount: h.departments.length,
      officesCount: h.offices.length,
      portalsCount: h.portals.length,
      modulesCount: h.modules.length,
      capabilitiesCount: h.capabilities.length,
      screensCount: h.screens.length,
      formsCount: h.forms.length,
      dashboardsCount: h.dashboards.length,
      reportsCount: h.reports.length,
      workflowsCount: h.workflows.length,
      databaseEntitiesCount: h.databaseEntities.length,
      apisCount: h.apis.length,
      runtimeComponentsCount: h.runtimeComponents.length,
      permissionsCount: h.permissions.length,
      rolesCount: h.roles.length
    };
  });

  return {
    totals,
    primaryBreakdown
  };
}
