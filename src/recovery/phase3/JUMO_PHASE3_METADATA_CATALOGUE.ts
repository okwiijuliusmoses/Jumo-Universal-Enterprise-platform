/**
 * JUMO UEOS — PHASE 3B
 * JUMO_PHASE3_METADATA_CATALOGUE.ts
 *
 * Reconstructs the extensible, registry-driven universal UI metadata types.
 * Every metadata type strictly maintains identity and ownership references:
 * productId -> directorateId -> departmentId -> officeId -> portalId -> moduleId -> capabilityId
 */

export interface MetadataIdentityChain {
  productId: string;
  directorateId: string;
  departmentId: string;
  officeId: string;
  portalId: string;
  moduleId: string;
  capabilityId?: string;
}

export interface UniversalModuleMetadata extends MetadataIdentityChain {
  title: string;
  code: string;
  description: string;
  category: string;
  status: 'ACTIVE' | 'MAINTENANCE' | 'DEPRECATED';
  icon: string;
  route: string;
}

export interface UniversalOfficeMetadata extends MetadataIdentityChain {
  officeName: string;
  headRole: string;
  description: string;
  allowedPortals: string[];
}

export interface UniversalPortalMetadata extends MetadataIdentityChain {
  portalName: string;
  portalType: 'ADMIN' | 'STAFF' | 'OPERATIONAL' | 'ANALYTICS' | 'PUBLIC';
  navGroups: Array<{
    groupId: string;
    label: string;
    icon: string;
    modules: string[];
  }>;
}

export interface UniversalCapabilityMetadata extends MetadataIdentityChain {
  capabilityName: string;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  isCore: boolean;
  requiredRoles: string[];
}

export interface UniversalActionMetadata extends MetadataIdentityChain {
  actionId: string;
  label: string;
  actionType: 'PRIMARY' | 'SECONDARY' | 'DANGEROUS' | 'WORKFLOW_TRIGGER';
  handlerKey: string;
  requiresApproval: boolean;
}

export interface UniversalFieldMetadata extends MetadataIdentityChain {
  fieldKey: string;
  label: string;
  type: 'text' | 'number' | 'select' | 'date' | 'textarea' | 'checkbox' | 'file' | 'currency';
  required: boolean;
  options?: Array<{ label: string; value: string }>;
  validationRegex?: string;
}

export interface UniversalFormMetadata extends MetadataIdentityChain {
  formId: string;
  title: string;
  fields: UniversalFieldMetadata[];
  submitActionId: string;
}

export interface UniversalColumnMetadata extends MetadataIdentityChain {
  columnKey: string;
  header: string;
  type: 'string' | 'number' | 'date' | 'badge' | 'currency' | 'actions';
  sortable: boolean;
  filterable: boolean;
}

export interface UniversalTableMetadata extends MetadataIdentityChain {
  tableId: string;
  title: string;
  columns: UniversalColumnMetadata[];
  defaultSortField?: string;
  enableExport: boolean;
  enablePagination: boolean;
  pageSize: number;
}

export interface UniversalFilterMetadata extends MetadataIdentityChain {
  filterId: string;
  fieldKey: string;
  label: string;
  filterType: 'SELECT' | 'DATE_RANGE' | 'TEXT_SEARCH' | 'NUMBER_RANGE';
  options?: Array<{ label: string; value: string }>;
}

export interface UniversalWidgetMetadata extends MetadataIdentityChain {
  widgetId: string;
  title: string;
  widgetType: 'KPI' | 'CHART' | 'TABLE_SUMMARY' | 'ACTIVITY_FEED' | 'QUICK_ACTIONS';
  gridSpan: number;
  dataBindingKey: string;
}

export interface UniversalDashboardMetadata extends MetadataIdentityChain {
  dashboardId: string;
  title: string;
  layout: 'GRID' | 'FLEX' | 'TABBED';
  widgets: UniversalWidgetMetadata[];
}

export interface UniversalReportMetadata extends MetadataIdentityChain {
  reportId: string;
  title: string;
  supportedFormats: Array<'PDF' | 'EXCEL' | 'CSV' | 'INTERACTIVE'>;
  parameters: UniversalFieldMetadata[];
}

export interface UniversalWorkflowStepMetadata extends MetadataIdentityChain {
  stepNumber: number;
  stepName: string;
  assigneeRole: string;
  approvalCondition?: string;
}

export interface UniversalWorkflowMetadata extends MetadataIdentityChain {
  workflowId: string;
  workflowName: string;
  steps: UniversalWorkflowStepMetadata[];
  autoTriggerOnFormId?: string;
}

export interface UniversalPermissionMetadata extends MetadataIdentityChain {
  permissionKey: string;
  description: string;
  grantedRoles: string[];
}

export interface UniversalRoleMetadata extends MetadataIdentityChain {
  roleKey: string;
  roleName: string;
  permissions: string[];
}

export interface UniversalAICapabilityMetadata extends MetadataIdentityChain {
  aiCapabilityId: string;
  capabilityName: string;
  modelTarget: string;
  promptTemplate: string;
  triggers: string[];
}

export interface UniversalAIActionMetadata extends MetadataIdentityChain {
  aiActionId: string;
  label: string;
  targetCapabilityId: string;
  isAutomated: boolean;
}

export interface UniversalRuntimeComponentMetadata extends MetadataIdentityChain {
  componentId: string;
  componentName: string;
  importPath: string;
  isLazyLoaded: boolean;
}

export interface UniversalNavigationMetadata extends MetadataIdentityChain {
  label: string;
  icon: string;
  route: string;
  badge?: string;
}

export interface UniversalNotificationMetadata extends MetadataIdentityChain {
  eventTrigger: string;
  channels: Array<'EMAIL' | 'SMS' | 'IN_APP' | 'PUSH'>;
  template: string;
}

export interface UniversalSearchMetadata extends MetadataIdentityChain {
  searchFields: string[];
  placeholderText: string;
}

export interface UniversalExportMetadata extends MetadataIdentityChain {
  allowedFormats: Array<'CSV' | 'XLSX' | 'PDF' | 'JSON'>;
  exportEndpoint: string;
}

export interface UniversalAuditMetadata extends MetadataIdentityChain {
  trackChanges: boolean;
  logSeverity: 'INFO' | 'WARN' | 'CRITICAL';
}

export interface UniversalDataSourceMetadata extends MetadataIdentityChain {
  dataSourceKey: string;
  entityName: string;
  primaryKey: string;
}

export interface UniversalValidationMetadata extends MetadataIdentityChain {
  ruleId: string;
  expression: string;
  errorMessage: string;
}

export interface UniversalStateMetadata extends MetadataIdentityChain {
  stateKey: string;
  initialValue: any;
  persistKey?: string;
}

/**
 * Universal Capability UI Contract Graph Node
 */
export interface UniversalCapabilityContractGraph {
  identity: MetadataIdentityChain;
  module: UniversalModuleMetadata;
  office?: UniversalOfficeMetadata;
  portal?: UniversalPortalMetadata;
  capability: UniversalCapabilityMetadata;
  actions: UniversalActionMetadata[];
  forms: UniversalFormMetadata[];
  tables: UniversalTableMetadata[];
  dashboards: UniversalDashboardMetadata[];
  reports: UniversalReportMetadata[];
  workflows: UniversalWorkflowMetadata[];
  permissions: UniversalPermissionMetadata[];
  aiCapabilities: UniversalAICapabilityMetadata[];
  runtimeComponent: UniversalRuntimeComponentMetadata;
}
