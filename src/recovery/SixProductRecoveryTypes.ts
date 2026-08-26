/**
 * JUMO UEOS — SIX PRODUCT RECOVERY TYPES
 * Canonical architectural contracts for recovered entity registries and manifests.
 */

export type CanonicalHierarchyLevel =
  | "PLATFORM_KERNEL"
  | "SOVEREIGN_PRODUCT"
  | "DIRECTORATE"
  | "DEPARTMENT"
  | "OFFICE"
  | "PORTAL"
  | "MODULE"
  | "CAPABILITY"
  | "UI_METADATA"
  | "RUNTIME_COMPONENT";

export interface RecoveredEntity {
  id: string;
  name: string;
  level: CanonicalHierarchyLevel;
  productId: string;
  parentId?: string;
  sourceFile: string;
  sourceType: string;
  route?: string;
  roles?: string[];
  status: "PRESERVED" | "RECONCILED" | "VERIFIED";
  metadata?: Record<string, any>;
}

export interface RecoveredProductHierarchy {
  productId: string;
  productName: string;
  kind: "ERP" | "CONTROL_CENTER";
  consolidated: boolean;
  directorates: RecoveredEntity[];
  departments: RecoveredEntity[];
  offices: RecoveredEntity[];
  portals: RecoveredEntity[];
  modules: RecoveredEntity[];
  capabilities: RecoveredEntity[];
  uiMetadata: RecoveredEntity[];
  runtimeComponents: RecoveredEntity[];
}
