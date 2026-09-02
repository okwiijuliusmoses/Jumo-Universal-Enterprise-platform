import { CanonicalProductHierarchy } from './types';
import { FINTECH_HIERARCHY } from './fintech';
import { CHURCH_FAITH_HIERARCHY } from './churchFaith';
import { SECONDARY_SCHOOL_HIERARCHY } from './secondarySchool';
import { NURSERY_PRIMARY_HIERARCHY } from './nurseryPrimary';

// Shared Sovereign Platform Layers
import { FAAP_HIERARCHY } from './faap';
import { DIGITAL_PAY_HIERARCHY } from './digitalPay';
import { ALUMNI_COMMUNITY_HIERARCHY } from './alumniCommunity';

// Historical / Reclassified Reference Hierarchies
import { NATIONAL_IDENTITY_HIERARCHY } from './nationalIdentity';
import { NATIONAL_HEALTH_HIERARCHY } from './nationalHealth';
import { NATIONAL_EDUCATION_HIERARCHY } from './nationalEducation';
import { UNIVERSITY_TERTIARY_HIERARCHY } from './universityTertiary';

export * from './types';
export { FINTECH_HIERARCHY } from './fintech';
export { CHURCH_FAITH_HIERARCHY } from './churchFaith';
export { SECONDARY_SCHOOL_HIERARCHY } from './secondarySchool';
export { NURSERY_PRIMARY_HIERARCHY } from './nurseryPrimary';
export { FAAP_HIERARCHY } from './faap';
export { DIGITAL_PAY_HIERARCHY } from './digitalPay';
export { ALUMNI_COMMUNITY_HIERARCHY } from './alumniCommunity';
export { NATIONAL_IDENTITY_HIERARCHY } from './nationalIdentity';
export { NATIONAL_HEALTH_HIERARCHY } from './nationalHealth';
export { NATIONAL_EDUCATION_HIERARCHY } from './nationalEducation';
export { UNIVERSITY_TERTIARY_HIERARCHY } from './universityTertiary';

/**
 * 1. AUTHORITATIVE PRIMARY SOVEREIGN PRODUCT FAMILIES
 * Exclusively 4 Consolidated Primary Products
 */
export const PRIMARY_SOVEREIGN_PRODUCTS: CanonicalProductHierarchy[] = [
  CHURCH_FAITH_HIERARCHY,        // JUMO CHURCH ERP
  FINTECH_HIERARCHY,             // JUMO FINTECH
  SECONDARY_SCHOOL_HIERARCHY,    // JUMO SECONDARY SCHOOL ERP
  NURSERY_PRIMARY_HIERARCHY      // JUMO NURSERY & PRIMARY SCHOOL ERP
];

/**
 * 2. SHARED SOVEREIGN PLATFORM SUITE
 */
export const SHARED_SOVEREIGN_PLATFORMS: CanonicalProductHierarchy[] = [
  FAAP_HIERARCHY,                // JUMO FAAP
  DIGITAL_PAY_HIERARCHY,         // JUMO DIGITAL PAY
  ALUMNI_COMMUNITY_HIERARCHY     // JUMO ALUMNI PLATFORM
];

/**
 * 3. RECLASSIFIED HISTORICAL / DOMAIN SERVICES
 */
export const RECLASSIFIED_HISTORICAL_REGISTRIES: CanonicalProductHierarchy[] = [
  NATIONAL_IDENTITY_HIERARCHY,
  NATIONAL_HEALTH_HIERARCHY,
  NATIONAL_EDUCATION_HIERARCHY,
  UNIVERSITY_TERTIARY_HIERARCHY
];

/**
 * ALL COMBINED HIERARCHIES FOR UNIFIED REGISTRY SCANNING
 */
export const ALL_CANONICAL_PRODUCT_HIERARCHIES: CanonicalProductHierarchy[] = [
  ...PRIMARY_SOVEREIGN_PRODUCTS,
  ...SHARED_SOVEREIGN_PLATFORMS,
  ...RECLASSIFIED_HISTORICAL_REGISTRIES
];

export const PRIMARY_PRODUCT_MAP: Record<string, CanonicalProductHierarchy> = {
  'JUMO-CHURCH': CHURCH_FAITH_HIERARCHY,
  'prod-church-faith': CHURCH_FAITH_HIERARCHY,
  'JUMO-FINTECH': FINTECH_HIERARCHY,
  'prod-fintech': FINTECH_HIERARCHY,
  'JUMO-SECONDARY-ERP': SECONDARY_SCHOOL_HIERARCHY,
  'prod-secondary-school': SECONDARY_SCHOOL_HIERARCHY,
  'JUMO-NURSERY-PRIMARY-ERP': NURSERY_PRIMARY_HIERARCHY,
  'prod-nursery-primary': NURSERY_PRIMARY_HIERARCHY,
};

export const CANONICAL_PRODUCT_MAP: Record<string, CanonicalProductHierarchy> = {
  ...PRIMARY_PRODUCT_MAP,
  'prod-faap': FAAP_HIERARCHY,
  'JUMO-FAAP': FAAP_HIERARCHY,
  'prod-digital-pay': DIGITAL_PAY_HIERARCHY,
  'JUMO-DIGITAL-PAY': DIGITAL_PAY_HIERARCHY,
  'prod-alumni-community': ALUMNI_COMMUNITY_HIERARCHY,
  'JUMO-ALUMNI': ALUMNI_COMMUNITY_HIERARCHY,
  'prod-national-id': NATIONAL_IDENTITY_HIERARCHY,
  'prod-national-health': NATIONAL_HEALTH_HIERARCHY,
  'prod-national-education': NATIONAL_EDUCATION_HIERARCHY,
  'prod-university-tertiary': UNIVERSITY_TERTIARY_HIERARCHY
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
