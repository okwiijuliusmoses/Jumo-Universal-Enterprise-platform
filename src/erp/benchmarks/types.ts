/**
 * JUMO UEOS — Authoritative Benchmark Extraction & Forensic Architecture Schema
 * Strict Type System for Multi-Product, Multi-Tier Institutional Benchmarking.
 * 
 * Hierarchy:
 * Product -> Ecosystem -> Portals -> Directorates -> Departments -> Offices 
 * -> Roles -> Applications -> Modules -> Submodules -> Capabilities -> Operations 
 * -> Workflows -> Screens -> Forms -> Data Objects -> Reports -> Notifications 
 * -> Integrations -> Permissions -> Audit Controls -> AI Opportunities.
 */

export type ProvenanceType = 
  | 'OBSERVED' 
  | 'DOCUMENTED' 
  | 'STRUCTURALLY_INFERRED' 
  | 'BENCHMARK_DERIVED' 
  | 'CANONICAL_JUMO' 
  | 'REQUIRED_TO_SUPPORT' 
  | 'RECOMMENDED' 
  | 'UNKNOWN';

export type ImplementationStatus = 
  | 'IMPLEMENTED' 
  | 'PARTIALLY_IMPLEMENTED' 
  | 'BENCHMARK_OBSERVED' 
  | 'REFERENCED_ONLY' 
  | 'MISSING' 
  | 'PLANNED' 
  | 'NEEDS_VALIDATION';

export type PriorityLevel = 'P0' | 'P1' | 'P2' | 'P3' | 'P4';

export interface BenchmarkSourceInfo {
  sourceId: string;
  name: string;
  category: 'K12_ACADEMY' | 'COMMERCIAL_FINANCE' | 'PAYMENT_GATEWAY' | 'HIGHER_ED_UNIVERSITY' | 'JUMO_PLATFORM_CORE';
  description: string;
  targetScale: string;
  provenance: ProvenanceType;
  confidence: 'HIGH' | 'MEDIUM' | 'LOW';
  evidenceBase: string[];
}

export interface BenchmarkPortalDef {
  portalId: string;
  sourceId: string;
  name: string;
  targetAudience: string;
  authenticationType: 'SSO_SAML_OIDC' | 'STUDENT_PORTAL_AUTH' | 'PARENT_MOBILE_OTP' | 'PUBLIC_ANONYMOUS' | 'STAFF_MFA_HSM';
  workspaceBoundary: string;
  keyApplications: string[];
  provenance: ProvenanceType;
}

export interface BenchmarkDirectorateDef {
  directorateId: string;
  sourceId: string;
  name: string;
  mandate: string;
  parentOrganization: string;
  departmentsCount: number;
  provenance: ProvenanceType;
}

export interface BenchmarkDepartmentDef {
  departmentId: string;
  directorateId: string;
  sourceId: string;
  name: string;
  purpose: string;
  officesCount: number;
  provenance: ProvenanceType;
}

export interface BenchmarkOfficeDef {
  officeId: string;
  departmentId: string;
  directorateId: string;
  sourceId: string;
  name: string;
  mandate: string;
  owningRole: string;
  workspaceRoute: string;
  applications: string[];
  modulesCount: number;
  capabilitiesCount: number;
  isolationBoundary: 'RING_0_SOVEREIGN' | 'EXECUTIVE' | 'ACADEMIC' | 'FINANCIAL' | 'OPERATIONAL' | 'CLINICAL' | 'PUBLIC';
  provenance: ProvenanceType;
}

export interface BenchmarkRoleDef {
  roleId: string;
  sourceId: string;
  name: string;
  officeId: string;
  portalId: string;
  hierarchyLevel: 'EXECUTIVE_COUNCIL' | 'DIRECTOR_DEAN' | 'OFFICE_HEAD' | 'SENIOR_OFFICER' | 'OPERATIONAL_CLERK' | 'STUDENT_PARENT' | 'AUDITOR';
  permissionsCount: number;
  financialAuthorityLimit?: string;
  makerCheckerRole?: 'MAKER' | 'CHECKER' | 'DUAL_SIGNATORY' | 'AUDITOR_ONLY';
  provenance: ProvenanceType;
}

export interface BenchmarkApplicationDef {
  appId: string;
  sourceId: string;
  name: string;
  owningOfficeId: string;
  portalId: string;
  purpose: string;
  modules: string[];
  provenance: ProvenanceType;
}

export interface BenchmarkOperationDef {
  operationId: string;
  name: string;
  actionType: 'CREATE' | 'SUBMIT' | 'APPROVE' | 'REJECT' | 'POST_LEDGER' | 'RECONCILE' | 'ALLOCATE' | 'TRANSFER' | 'REVERSE' | 'CERTIFY' | 'PUBLISH' | 'AUDIT' | 'CLOSE_PERIOD';
  initiatorRole: string;
  targetEntity: string;
  accountingEffect?: string;
}

export interface BenchmarkWorkflowDef {
  workflowId: string;
  sourceId: string;
  name: string;
  trigger: string;
  initiatingOffice: string;
  initiatingRole: string;
  stepsCount: number;
  approvalStages: string[];
  rejectionPath: string;
  notifications: string[];
  resultingRecords: string[];
  accountingEffects?: string;
  provenance: ProvenanceType;
}

export interface BenchmarkScreenDef {
  screenId: string;
  sourceId: string;
  name: string;
  officeId: string;
  portalId: string;
  routePath: string;
  layoutType: 'DASHBOARD_GRID' | 'DATA_TABLE_EXPANDABLE' | 'MULTI_STEP_FORM' | 'SPLIT_VIEW_MASTER_DETAIL' | 'LEDGER_SPREADSHEET' | 'MODAL_DRAWER';
  primaryControls: string[];
  provenance: ProvenanceType;
}

export interface BenchmarkFormFieldDef {
  name: string;
  type: 'TEXT' | 'NUMBER' | 'SELECT' | 'DATE' | 'CURRENCY' | 'FILE_UPLOAD' | 'SIGNATURE' | 'MULTI_SELECT' | 'BARCODE_SCAN';
  required: boolean;
  validationRule?: string;
}

export interface BenchmarkFormDef {
  formId: string;
  sourceId: string;
  name: string;
  owningOfficeId: string;
  initiatingRole: string;
  fields: BenchmarkFormFieldDef[];
  approvalRequirements?: string;
  resultingRecord: string;
  provenance: ProvenanceType;
}

export interface BenchmarkDataObjectDef {
  entityId: string;
  sourceId: string;
  name: string;
  owningDomain: string;
  primaryKey: string;
  fieldsCount: number;
  relationships: string[];
  persistenceType: 'POSTGRESQL_RELATIONAL' | 'IMMUTABLE_SHA256_LEDGER' | 'VECTOR_EMBEDDING' | 'REDIS_CACHE_BLOB';
  provenance: ProvenanceType;
}

export interface BenchmarkReportDef {
  reportId: string;
  sourceId: string;
  name: string;
  category: 'OPERATIONAL' | 'DEPARTMENTAL' | 'MANAGEMENT' | 'EXECUTIVE' | 'FINANCIAL_IFRS' | 'ACADEMIC_SENATE' | 'REGULATORY_STATUTORY' | 'AUDIT_ASSURANCE';
  owningOfficeId: string;
  targetAudience: string[];
  dataSources: string[];
  exportFormats: ('PDF' | 'EXCEL_XLSX' | 'CSV' | 'JSON' | 'PRINT_LAYOUT')[];
  provenance: ProvenanceType;
}

export interface BenchmarkNotificationDef {
  notifId: string;
  sourceId: string;
  name: string;
  triggerEvent: string;
  channels: ('SMS' | 'EMAIL' | 'PUSH' | 'IN_APP' | 'WHATSAPP' | 'WEBHOOK')[];
  recipientType: 'STUDENT' | 'PARENT' | 'LECTURER' | 'OFFICE_HEAD' | 'BURSAR' | 'REGISTRAR' | 'SUPPLIER' | 'AUDITOR';
  provenance: ProvenanceType;
}

export interface BenchmarkIntegrationDef {
  integrationId: string;
  sourceId: string;
  name: string;
  protocol: 'REST_JSON' | 'SOAP_XML' | 'ISO_8583' | 'SWIFT_MT_MX' | 'OFX_BAI2' | 'WEBRTC' | 'OPAC_Z39_50' | 'SMPP_SMS';
  externalSystem: string;
  flowDirection: 'INBOUND' | 'OUTBOUND' | 'BI_DIRECTIONAL';
  securityProtocol: 'MUTUAL_TLS' | 'OAUTH2_BEARER' | 'HMAC_SHA256_SIGNATURE' | 'IP_WHITELIST_STATIC';
  provenance: ProvenanceType;
}

export interface BenchmarkCapabilityDef {
  capabilityId: string;
  sourceId: string;
  code: string;
  name: string;
  domain: string;
  directorateId: string;
  departmentId: string;
  officeId: string;
  applicationId: string;
  moduleId: string;
  submoduleId: string;
  description: string;
  operations: BenchmarkOperationDef[];
  associatedWorkflows: string[];
  associatedScreens: string[];
  associatedForms: string[];
  associatedReports: string[];
  rolesWithAccess: string[];
  permissionsRequired: string[];
  integrationsUsed: string[];
  jumoStatus: ImplementationStatus;
  priority: PriorityLevel;
  provenance: ProvenanceType;
  confidence: 'HIGH' | 'MEDIUM' | 'LOW';
  aiOpportunity?: string;
}

export interface CrossProductGapItem {
  gapId: string;
  capabilityName: string;
  sourceSystem: string;
  affectedDirectorate: string;
  affectedOffice: string;
  jumoTargetMapping: string;
  gapSeverity: 'CRITICAL_P0' | 'HIGH_P1' | 'MEDIUM_P2' | 'LOW_P3';
  architecturalRemedy: string;
  priority: PriorityLevel;
}

export interface BenchmarkPackageExtraction {
  source: BenchmarkSourceInfo;
  portals: BenchmarkPortalDef[];
  directorates: BenchmarkDirectorateDef[];
  departments: BenchmarkDepartmentDef[];
  offices: BenchmarkOfficeDef[];
  roles: BenchmarkRoleDef[];
  applications: BenchmarkApplicationDef[];
  workflows: BenchmarkWorkflowDef[];
  screens: BenchmarkScreenDef[];
  forms: BenchmarkFormDef[];
  dataObjects: BenchmarkDataObjectDef[];
  reports: BenchmarkReportDef[];
  notifications: BenchmarkNotificationDef[];
  integrations: BenchmarkIntegrationDef[];
  capabilities: BenchmarkCapabilityDef[];
}
