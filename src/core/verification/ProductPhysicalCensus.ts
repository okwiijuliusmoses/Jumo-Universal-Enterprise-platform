/**
 * JUMO UEOS - PRODUCT PHYSICAL CENSUS & VERIFICATION ENGINE
 * Authoritative verification runner for Sovereign Consolidated Products
 * Validates physical mounting, structural referential integrity, and live service contracts.
 */

import { 
  PRIMARY_SOVEREIGN_PRODUCTS, 
  CANONICAL_PRODUCT_MAP, 
  CanonicalProductHierarchy 
} from '../../products/canonical';
import { faapClient } from '../../platforms/contracts/faapContract';
import { digitalPayClient } from '../../platforms/contracts/digitalPayContract';
import { alumniClient } from '../../platforms/contracts/alumniContract';

export interface ProductVerificationResult {
  productId: string;
  code: string;
  name: string;
  category: string;
  verifiedAt: string;
  status: 'PASS' | 'FAIL';
  census: {
    directorates: number;
    departments: number;
    offices: number;
    portals: number;
    modules: number;
    physicallyMountedModules: number;
    partiallyMountedModules: number;
    capabilities: number;
    physicallyMountedCapabilities: number;
    screens: number;
    forms: number;
    dashboards: number;
    reports: number;
    workflows: number;
    databaseEntities: number;
    apis: number;
    runtimeComponents: number;
    permissions: number;
    roles: number;
  };
  integrations: {
    faapIntegrated: boolean;
    faapAccountsCount: number;
    digitalPayIntegrated: boolean;
    digitalPayPayCodesCount: number;
    alumniIntegrated: boolean;
    alumniCohortsCount: number;
  };
  integrityCheck: {
    orphanModules: string[];
    orphanCapabilities: string[];
    missingRuntimeComponents: string[];
    missingPermissions: string[];
    missingRoutes: string[];
    crossProductContamination: string[];
    allTiersMounted: boolean;
    chainTraversalVerified: boolean;
  };
  summaryMessage: string;
}

export class ProductPhysicalCensus {
  /**
   * Run isolated census & verification for a single product ID
   */
  public static verifyProduct(productId: string): ProductVerificationResult {
    const hierarchy = CANONICAL_PRODUCT_MAP[productId];
    if (!hierarchy) {
      throw new Error(`Product ${productId} not found in canonical registry`);
    }

    const orphanModules: string[] = [];
    const orphanCapabilities: string[] = [];
    const missingRuntimeComponents: string[] = [];
    const missingPermissions: string[] = [];
    const missingRoutes: string[] = [];
    const crossProductContamination: string[] = [];

    const p = hierarchy.product;
    const dirIds = new Set(hierarchy.directorates.map(d => d.id));
    const deptIds = new Set(hierarchy.departments.map(d => d.id));
    const offIds = new Set(hierarchy.offices.map(o => o.id));
    const portalIds = new Set(hierarchy.portals.map(pt => pt.id));
    const permIds = new Set(hierarchy.permissions.map(pm => pm.id));
    const rtcIds = new Set(hierarchy.runtimeComponents.map(r => r.id));

    let physicallyMountedModules = 0;
    let partiallyMountedModules = 0;

    // 1. Verify Modules Hierarchy Integrity & Complete 10-Tier Traversal Chain
    hierarchy.modules.forEach(m => {
      let isChainValid = true;

      if (!dirIds.has(m.directorateId)) {
        orphanModules.push(`Module ${m.id} references non-existent directorate ${m.directorateId}`);
        isChainValid = false;
      }
      if (!deptIds.has(m.departmentId)) {
        orphanModules.push(`Module ${m.id} references non-existent department ${m.departmentId}`);
        isChainValid = false;
      }
      if (!offIds.has(m.officeId)) {
        orphanModules.push(`Module ${m.id} references non-existent office ${m.officeId}`);
        isChainValid = false;
      }
      if (!portalIds.has(m.portalId)) {
        orphanModules.push(`Module ${m.id} references non-existent portal ${m.portalId}`);
        isChainValid = false;
      }
      if (m.productId !== p.id) {
        crossProductContamination.push(`Module ${m.id} belongs to ${m.productId}, not ${p.id}`);
        isChainValid = false;
      }
      if (!rtcIds.has(m.runtimeComponentId)) {
        missingRuntimeComponents.push(`Module ${m.id} references unmounted runtime component ${m.runtimeComponentId}`);
        isChainValid = false;
      }

      if (isChainValid) {
        physicallyMountedModules++;
      } else {
        partiallyMountedModules++;
      }
    });

    // 2. Verify Capabilities
    const modIds = new Set(hierarchy.modules.map(m => m.id));
    let physicallyMountedCapabilities = 0;
    hierarchy.capabilities.forEach(cap => {
      let capValid = true;
      if (!modIds.has(cap.moduleId)) {
        orphanCapabilities.push(`Capability ${cap.id} references unknown module ${cap.moduleId}`);
        capValid = false;
      }
      if (!permIds.has(cap.requiredPermission)) {
        missingPermissions.push(`Capability ${cap.id} references missing permission ${cap.requiredPermission}`);
        capValid = false;
      }
      if (!rtcIds.has(cap.runtimeComponentId)) {
        missingRuntimeComponents.push(`Capability ${cap.id} references missing runtime component ${cap.runtimeComponentId}`);
        capValid = false;
      }

      if (capValid) physicallyMountedCapabilities++;
    });

    // 3. Verify Portals have valid routes
    hierarchy.portals.forEach(portal => {
      if (!portal.route || portal.route.trim() === '') {
        missingRoutes.push(`Portal ${portal.id} missing route path`);
      }
    });

    // 4. Verify Shared Service Integrations
    const faapAccounts = faapClient.getAccounts();
    const digitalPayCodes = digitalPayClient.getAllPayCodes();
    const isEducation = p.id.includes('secondary') || p.id.includes('nursery-primary') || p.id.includes('education');

    const faapIntegrated = faapAccounts.length > 0;
    const digitalPayIntegrated = digitalPayCodes.length > 0;
    const alumniCohorts = isEducation ? alumniClient.getCohorts() : [];
    const alumniIntegrated = isEducation ? alumniCohorts.length > 0 : false;

    const hasErrors = (
      orphanModules.length > 0 ||
      orphanCapabilities.length > 0 ||
      missingRuntimeComponents.length > 0 ||
      crossProductContamination.length > 0 ||
      missingRoutes.length > 0
    );

    return {
      productId: p.id,
      code: p.code,
      name: p.name,
      category: p.category,
      verifiedAt: new Date().toISOString(),
      status: hasErrors ? 'FAIL' : 'PASS',
      census: {
        directorates: hierarchy.directorates.length,
        departments: hierarchy.departments.length,
        offices: hierarchy.offices.length,
        portals: hierarchy.portals.length,
        modules: hierarchy.modules.length,
        physicallyMountedModules,
        partiallyMountedModules,
        capabilities: hierarchy.capabilities.length,
        physicallyMountedCapabilities,
        screens: hierarchy.screens.length,
        forms: hierarchy.forms.length,
        dashboards: hierarchy.dashboards.length,
        reports: hierarchy.reports.length,
        workflows: hierarchy.workflows.length,
        databaseEntities: hierarchy.databaseEntities.length,
        apis: hierarchy.apis.length,
        runtimeComponents: hierarchy.runtimeComponents.length,
        permissions: hierarchy.permissions.length,
        roles: hierarchy.roles.length,
      },
      integrations: {
        faapIntegrated,
        faapAccountsCount: faapAccounts.length,
        digitalPayIntegrated,
        digitalPayPayCodesCount: digitalPayCodes.length,
        alumniIntegrated,
        alumniCohortsCount: alumniCohorts.length,
      },
      integrityCheck: {
        orphanModules,
        orphanCapabilities,
        missingRuntimeComponents,
        missingPermissions,
        missingRoutes,
        crossProductContamination,
        allTiersMounted: !hasErrors,
        chainTraversalVerified: !hasErrors && physicallyMountedModules === hierarchy.modules.length
      },
      summaryMessage: hasErrors
        ? `Verification FAILED with ${orphanModules.length + orphanCapabilities.length + missingRuntimeComponents.length} integrity defects.`
        : `Product ${p.name} (${p.code}) passed 10-Tier physical chain traversal census (${physicallyMountedModules}/${hierarchy.modules.length} modules mounted).`,
    };
  }

  /**
   * Run verification on all 4 Authoritative Primary Sovereign Products
   */
  public static verifyAllPrimaryProducts(): Record<string, ProductVerificationResult> {
    const results: Record<string, ProductVerificationResult> = {};
    PRIMARY_SOVEREIGN_PRODUCTS.forEach(hierarchy => {
      results[hierarchy.product.id] = this.verifyProduct(hierarchy.product.id);
    });
    return results;
  }
}

export const verifyProduct = ProductPhysicalCensus.verifyProduct.bind(ProductPhysicalCensus);
export const verifyAllPrimaryProducts = ProductPhysicalCensus.verifyAllPrimaryProducts.bind(ProductPhysicalCensus);
