/**
 * JUMO UEOS — SIX PRODUCT RECOVERY REGISTRY
 * Authoritative runtime lookup for recovered product hierarchies, directorates, departments, offices, and portals.
 */

import { ALL_SIX_PRODUCT_MANIFESTS } from "./manifests";
import { JUMO_SIX_APPROVED_PRODUCTS, ApprovedProductDeclaration } from "./JUMOSixApprovedProducts";

export interface RecoveredProductSummary {
  productId: string;
  name: string;
  category: string;
  route: string;
  directoratesCount: number;
  departmentsCount: number;
  officesCount: number;
  portalsCount: number;
  modulesCount: number;
  capabilitiesCount: number;
  uiMetadataCount: number;
  runtimeComponentsCount: number;
}

export class SixProductRecoveryRegistry {
  public static getApprovedProducts(): readonly ApprovedProductDeclaration[] {
    return JUMO_SIX_APPROVED_PRODUCTS;
  }

  public static getManifests() {
    return ALL_SIX_PRODUCT_MANIFESTS;
  }

  public static getManifest(productId: string) {
    return ALL_SIX_PRODUCT_MANIFESTS.find(m => m.productId === productId);
  }

  public static getSummaries(): RecoveredProductSummary[] {
    return ALL_SIX_PRODUCT_MANIFESTS.map(m => ({
      productId: m.productId,
      name: m.productName,
      category: m.category,
      route: m.canonicalRoute,
      directoratesCount: m.directoratesCount,
      departmentsCount: m.departmentsCount,
      officesCount: m.officesCount,
      portalsCount: m.portalsCount,
      modulesCount: m.modulesCount,
      capabilitiesCount: m.capabilitiesCount,
      uiMetadataCount: m.uiMetadataCount,
      runtimeComponentsCount: m.runtimeComponentsCount
    }));
  }

  public static getPortalsForProduct(productId: string) {
    const manifest = this.getManifest(productId);
    return manifest ? manifest.portals : [];
  }

  public static getOfficesForProduct(productId: string) {
    const manifest = this.getManifest(productId);
    return manifest ? manifest.offices : [];
  }

  public static getDepartmentsForProduct(productId: string) {
    const manifest = this.getManifest(productId);
    return manifest ? manifest.departments : [];
  }

  public static getDirectoratesForProduct(productId: string) {
    const manifest = this.getManifest(productId);
    return manifest ? manifest.directorates : [];
  }
}

export default SixProductRecoveryRegistry;
