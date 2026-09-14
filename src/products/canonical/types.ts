/**
 * JUMO UEOS — Canonical Product Hierarchy & Registry Types
 * 
 * 10-Tier Non-Negotiable Canonical Hierarchy:
 * Platform Kernel → Sovereign Product → Directorate → Department → Office → Portal → Module → Capability → UI Metadata → Runtime Component
 */

export type ProductStatus = 'ACTIVE_CORE' | 'OPERATIONAL' | 'VERIFIED' | 'CERTIFIED';
export type AuthClearanceLevel = 'PUBLIC' | 'STAFF' | 'OFFICER' | 'EXECUTIVE' | 'FINANCIAL_DUAL' | 'PKI_SOVEREIGN' | 'AUDITOR';
export type ViewType = 'DASHBOARD' | 'TABLE' | 'FORM' | 'KANBAN' | 'DETAIL' | 'DOCUMENT' | 'WORKFLOW_MONITOR' | 'CALENDAR';

export interface CanonicalProduct {
  id: string; // e.g. 'prod-national-identity'
  code: string; // e.g. 'NID'
  name: string;
  category: 'SOVEREIGN_PLATFORM' | 'ENTERPRISE_PRODUCT' | 'FINANCIAL_ENGINE' | 'INSTITUTIONAL_ERP' | 'PAYMENT_SWITCH' | string;
  description: string;
  version: string;
  iconName: string;
  status: ProductStatus;
  leadExecutiveRole: string;
  governingLegislation: string;
  directorateIds: string[];
}

export interface CanonicalDirectorate {
  id: string;
  productId: string;
  code: string;
  name: string;
  description: string;
  leadRole: string;
  departmentIds: string[];
}

export interface CanonicalDepartment {
  id: string;
  productId: string;
  directorateId: string;
  code: string;
  name: string;
  description: string;
  headRole: string;
  officeIds: string[];
}

export interface CanonicalOffice {
  id: string;
  productId: string;
  directorateId: string;
  departmentId: string;
  code: string;
  name: string;
  description: string;
  officerRole: string;
  portalIds: string[];
  moduleIds: string[];
}

export interface CanonicalPortal {
  id: string;
  productId: string;
  directorateId: string;
  departmentId: string;
  officeId: string;
  code: string;
  name: string;
  description: string;
  portalType?: string;
  targetRole?: string;
  authLevel: AuthClearanceLevel | string;
  route: string;
  moduleIds: string[];
}

export interface CanonicalModule {
  id: string;
  productId: string;
  directorateId: string;
  departmentId: string;
  officeId: string;
  portalId: string;
  code: string;
  name: string;
  description: string;
  status: ProductStatus;
  capabilityIds: string[];
  screenIds: string[];
  formIds: string[];
  dashboardIds: string[];
  reportIds: string[];
  workflowIds: string[];
  databaseEntityIds: string[];
  apiIds: string[];
  runtimeComponentId: string;
  permissionIds: string[];
}

export interface CanonicalCapability {
  id: string;
  productId: string;
  directorateId: string;
  departmentId: string;
  officeId: string;
  portalId: string;
  moduleId: string;
  code: string;
  name: string;
  description: string;
  serviceAction: string;
  requiredPermission: string;
  runtimeComponentId: string;
  status: ProductStatus;
  inputs?: { name: string; type: string; description: string; required: boolean }[];
  outputType?: string;
  auditLevel?: 'STANDARD' | 'CRYPTOGRAPHIC_LEDGER' | 'NATIONAL_SECURITY';
}

export interface CanonicalScreen {
  id: string;
  productId: string;
  moduleId: string;
  code: string;
  title: string;
  description: string;
  viewType: ViewType;
  route: string;
}

export interface CanonicalForm {
  id: string;
  productId: string;
  moduleId: string;
  code: string;
  title: string;
  name?: string;
  submitAction: string;
  fieldCount: number;
  fields: { name: string; label: string; type: string; required: boolean; placeholder?: string }[];
  validationRules: string[];
}

export interface CanonicalDashboard {
  id: string;
  productId: string;
  moduleId: string;
  code: string;
  title: string;
  widgetCount: number;
  kpiMetrics: { label: string; value: string; trend?: string; change?: string }[];
}

export interface CanonicalReport {
  id: string;
  productId: string;
  moduleId: string;
  code: string;
  title: string;
  format: 'TABULAR' | 'SUMMARY' | 'FINANCIAL_STATEMENT' | 'REGULATORY_RETURN' | 'FORENSIC_TRAIL';
  exportTypes: ('PDF' | 'CSV' | 'XLSX' | 'JSON')[];
}

export interface CanonicalWorkflow {
  id: string;
  productId: string;
  moduleId: string;
  code: string;
  title: string;
  stages: string[];
  slaHours: number;
  requiredApprovers: string[];
  initialState: string;
}

export interface CanonicalDatabaseEntity {
  id: string;
  productId: string;
  moduleId: string;
  tableName: string;
  primaryKey: string;
  fields: { name: string; type: string; required: boolean; indexed?: boolean }[];
  auditLogged: boolean;
}

export interface CanonicalAPI {
  id: string;
  productId: string;
  moduleId: string;
  code: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  endpoint: string;
  requiredPermission: string;
  handlerName: string;
  summary: string;
}

export interface CanonicalRuntimeComponent {
  id: string;
  productId: string;
  moduleId: string;
  componentKey: string;
  name: string;
  description: string;
  renderStrategy: 'METADATA_UNIVERSAL' | 'BESPOKE_INTERACTIVE';
  category: string;
}

export interface CanonicalPermission {
  id: string;
  productId: string;
  code: string;
  name: string;
  description: string;
}

export interface CanonicalRole {
  id: string;
  productId: string;
  code: string;
  name: string;
  tier: 'GOVERNANCE' | 'EXECUTIVE' | 'OPERATIONAL' | 'CLIENT' | 'PUBLIC' | 'AUDITOR' | string;
  permissionIds: string[];
}

export interface CanonicalProductHierarchy {
  product: CanonicalProduct;
  directorates: CanonicalDirectorate[];
  departments: CanonicalDepartment[];
  offices: CanonicalOffice[];
  portals: CanonicalPortal[];
  modules: CanonicalModule[];
  capabilities: CanonicalCapability[];
  screens: CanonicalScreen[];
  forms: CanonicalForm[];
  dashboards: CanonicalDashboard[];
  reports: CanonicalReport[];
  workflows: CanonicalWorkflow[];
  databaseEntities: CanonicalDatabaseEntity[];
  apis: CanonicalAPI[];
  runtimeComponents: CanonicalRuntimeComponent[];
  permissions: CanonicalPermission[];
  roles: CanonicalRole[];
}

export interface ProductPhysicalCensusSummary {
  productId: string;
  productCode: string;
  productName: string;
  category: string;
  directorates: number;
  departments: number;
  offices: number;
  portals: number;
  modules: number;
  capabilities: number;
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
  orphanedEntitiesCount: number;
  integrityPercentage: number;
  status: 'COMPLIANT' | 'NON_COMPLIANT';
}
