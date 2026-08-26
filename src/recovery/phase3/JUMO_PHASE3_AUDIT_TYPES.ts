/**
 * JUMO UEOS — PHASE 3
 * JUMO_PHASE3_AUDIT_TYPES.ts
 *
 * Defines the authoritative status classifications, audit criteria, and gap definitions
 * for Phase 3 forensic auditing and universal metadata reconstruction across all 6 products.
 */

export type ImplementationStatus =
  | "PRESENT_AND_IMPLEMENTED"
  | "PRESENT_BUT_STATIC"
  | "PRESENT_BUT_INCOMPLETE"
  | "REGISTERED_ONLY"
  | "PLACEHOLDER"
  | "MISSING"
  | "BROKEN"
  | "UNREACHABLE"
  | "RUNTIME_ERROR";

export type ModuleClassification =
  | "STATIC_PLACEHOLDER"
  | "STATIC_SHELL"
  | "DYNAMIC_METADATA_ONLY"
  | "PARTIAL_RUNTIME"
  | "FUNCTIONAL_RUNTIME";

export interface ModuleAuditCriterion {
  criterionId: string;
  name: string;
  description: string;
  category: "IDENTITY" | "STRUCTURE" | "CAPABILITY" | "UI_METADATA" | "WORKFLOW" | "AI" | "RUNTIME" | "SECURITY" | "DATA";
  status: ImplementationStatus;
}

export interface ModuleForensicRecord {
  moduleId: string;
  moduleName: string;
  productId: string;
  directorateId: string;
  departmentId: string;
  officeId: string;
  portalId: string;
  classification: ModuleClassification;
  criteria: Record<string, ImplementationStatus>;
  missingMetadataTypes: string[];
  hasRuntimeComponent: boolean;
  hasCapabilityRegistry: boolean;
  hasFunctionalForms: boolean;
  hasFunctionalTables: boolean;
  hasWorkflows: boolean;
  hasReports: boolean;
  hasAICapabilities: boolean;
  hasPermissions: boolean;
  hasAuditTrail: boolean;
}

export interface ProductAuditRecord {
  productId: string;
  productName: string;
  totalModules: number;
  functionalModules: number;
  partialModules: number;
  staticModules: number;
  placeholderModules: number;
  missingMetadataCount: number;
  totalCapabilities: number;
  totalWorkflows: number;
  totalForms: number;
  totalTables: number;
  totalReports: number;
  totalAICapabilities: number;
  totalRuntimeComponents: number;
  loginRouteStatus: "PASS" | "FAIL";
  loginRouteError?: string;
  modules: ModuleForensicRecord[];
}

export interface UniversalPhase3AuditReport {
  generatedAt: string;
  version: string;
  phase: "PHASE_3_FORENSIC_AUDIT_AND_RECONSTRUCTION";
  overallParityPercentage: number;
  totalModulesAudited: number;
  functionalRuntimeModules: number;
  staticPlaceholderModules: number;
  loginRoutesAudited: Array<{
    route: string;
    productId: string;
    status: "PASS" | "FAIL";
    error?: string;
  }>;
  products: ProductAuditRecord[];
}
