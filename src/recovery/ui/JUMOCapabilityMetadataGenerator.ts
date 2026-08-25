/**
 * JUMO UEOS — PHASE 3A
 * JUMO Capability Metadata Generator
 *
 * Infers and constructs domain-aware, product-specific UI metadata contracts
 * (Navigation, Dashboards, Tables, Forms, Workflows, Reports, AI Actions, Permissions, Filters)
 * tailored to each domain (Fintech, Nursery/Primary, Secondary, Alumni, Church, OCC).
 */

export interface NavigationMetadata {
  label: string;
  icon: string;
  route: string;
}

export interface DashboardMetadata {
  title: string;
  layout: 'grid' | 'flex' | 'tabs';
  widgets: Array<{
    id: string;
    title: string;
    type: 'kpi' | 'chart' | 'table' | 'feed';
    span?: number;
  }>;
}

export interface KPIWidgetMetadata {
  id: string;
  label: string;
  value: string | number;
  trend?: string;
  category: string;
}

export interface TableMetadata {
  id: string;
  title: string;
  columns: Array<{
    key: string;
    header: string;
    type: 'string' | 'number' | 'date' | 'badge' | 'actions';
  }>;
  actions: string[];
  filters: string[];
  pagination: boolean;
  export: boolean;
}

export interface FormMetadata {
  id: string;
  title: string;
  fields: Array<{
    name: string;
    label: string;
    type: 'text' | 'number' | 'select' | 'date' | 'textarea' | 'checkbox';
    required: boolean;
    options?: string[];
  }>;
}

export interface ReportMetadata {
  id: string;
  title: string;
  format: 'PDF' | 'EXCEL' | 'CSV' | 'INTERACTIVE';
  parameters: string[];
}

export interface ChartMetadata {
  id: string;
  title: string;
  chartType: 'bar' | 'line' | 'pie' | 'donut' | 'area';
  xAxis: string;
  yAxis: string;
}

export interface WorkflowMetadata {
  id: string;
  name: string;
  steps: Array<{
    stepNumber: number;
    title: string;
    assigneeRole: string;
  }>;
}

export interface ActionMetadata {
  id: string;
  label: string;
  actionType: 'PRIMARY' | 'SECONDARY' | 'DANGEROUS';
  handler: string;
}

export interface ApprovalMetadata {
  id: string;
  level: number;
  approverRole: string;
}

export interface PermissionMetadata {
  capabilityId: string;
  rolesAllowed: string[];
}

export interface AIActionMetadata {
  id: string;
  capabilityName: string;
  promptTemplate: string;
  modelTarget: string;
}

export interface SearchMetadata {
  searchableFields: string[];
  placeholder: string;
}

export interface FilterMetadata {
  field: string;
  label: string;
  type: 'select' | 'date-range' | 'text';
}

export interface ExportMetadata {
  formats: Array<'CSV' | 'EXCEL' | 'PDF' | 'JSON'>;
}

export interface ImportMetadata {
  allowedExtensions: string[];
  schemaMappingId: string;
}

export interface NotificationMetadata {
  channel: 'EMAIL' | 'SMS' | 'PUSH' | 'IN_APP';
  triggerEvent: string;
}

export interface AuditMetadata {
  logLevel: 'INFO' | 'WARN' | 'CRITICAL';
  trackChanges: boolean;
}

export interface RuntimeComponentMetadata {
  componentId: string;
  resolver: string;
  props?: Record<string, any>;
}

export interface UniversalCapabilityUIContract {
  capabilityId: string;
  productId: string;
  domainCategory: string;
  navigation?: NavigationMetadata;
  dashboard?: DashboardMetadata;
  kpis?: KPIWidgetMetadata[];
  tables?: TableMetadata[];
  forms?: FormMetadata[];
  reports?: ReportMetadata[];
  charts?: ChartMetadata[];
  workflows?: WorkflowMetadata[];
  actions?: ActionMetadata[];
  approvals?: ApprovalMetadata[];
  permissions?: PermissionMetadata[];
  ai?: AIActionMetadata[];
  search?: SearchMetadata;
  filters?: FilterMetadata[];
  exports?: ExportMetadata[];
  imports?: ImportMetadata[];
  notifications?: NotificationMetadata[];
  audit?: AuditMetadata;
  runtimeComponent: RuntimeComponentMetadata;
}

export class JUMOCapabilityMetadataGenerator {
  public static generateForCapability(
    productId: string,
    capabilityId: string,
    capabilityName: string
  ): UniversalCapabilityUIContract {
    const domainCategory = JUMOCapabilityMetadataGenerator.getDomainCategory(productId);

    return {
      capabilityId,
      productId,
      domainCategory,
      navigation: {
        label: capabilityName,
        icon: JUMOCapabilityMetadataGenerator.getIconForDomain(domainCategory),
        route: `/workspace/${productId.toLowerCase()}/${capabilityId}`
      },
      dashboard: {
        title: `${capabilityName} Overview`,
        layout: 'grid',
        widgets: [
          { id: `${capabilityId}-kpi-1`, title: 'Active Volume', type: 'kpi', span: 4 },
          { id: `${capabilityId}-chart-1`, title: 'Performance Trend', type: 'chart', span: 8 },
          { id: `${capabilityId}-table-1`, title: 'Recent Audit Log', type: 'table', span: 12 }
        ]
      },
      kpis: [
        { id: `${capabilityId}-kpi-main`, label: 'Total Operations', value: 1250, trend: '+12.4%', category: domainCategory }
      ],
      tables: [
        {
          id: `${capabilityId}-table-main`,
          title: `${capabilityName} Ledger`,
          columns: [
            { key: 'id', header: 'Reference', type: 'string' },
            { key: 'title', header: 'Description', type: 'string' },
            { key: 'status', header: 'Status', type: 'badge' },
            { key: 'createdAt', header: 'Timestamp', type: 'date' },
            { key: 'actions', header: 'Actions', type: 'actions' }
          ],
          actions: ['VIEW', 'EDIT', 'EXPORT'],
          filters: ['status', 'dateRange'],
          pagination: true,
          export: true
        }
      ],
      forms: [
        {
          id: `${capabilityId}-form-new`,
          title: `Create New ${capabilityName}`,
          fields: [
            { name: 'title', label: 'Item Name / Reference', type: 'text', required: true },
            { name: 'category', label: 'Category', type: 'select', required: true, options: ['Standard', 'High Priority', 'Audit Required'] },
            { name: 'description', label: 'Description', type: 'textarea', required: false }
          ]
        }
      ],
      reports: [
        { id: `${capabilityId}-report-monthly`, title: `Monthly ${capabilityName} Statement`, format: 'PDF', parameters: ['startDate', 'endDate'] }
      ],
      charts: [
        { id: `${capabilityId}-chart-vol`, title: 'Weekly Volume Breakdown', chartType: 'bar', xAxis: 'Day', yAxis: 'Count' }
      ],
      workflows: [
        {
          id: `${capabilityId}-wf-main`,
          name: `${capabilityName} Approval Process`,
          steps: [
            { stepNumber: 1, title: 'Draft Submission', assigneeRole: 'Operator' },
            { stepNumber: 2, title: 'Supervisor Authorization', assigneeRole: 'Manager' },
            { stepNumber: 3, title: 'Ledger Settlement', assigneeRole: 'System' }
          ]
        }
      ],
      actions: [
        { id: `${capabilityId}-act-submit`, label: 'Submit Transaction', actionType: 'PRIMARY', handler: 'handleSubmit' },
        { id: `${capabilityId}-act-export`, label: 'Export Data', actionType: 'SECONDARY', handler: 'handleExport' }
      ],
      permissions: [
        { capabilityId, rolesAllowed: ['ADMIN', 'OPERATOR', 'SUPERVISOR'] }
      ],
      ai: [
        { id: `${capabilityId}-ai-audit`, capabilityName: 'Cognitive Anomaly Detection', promptTemplate: `Analyze ${capabilityName} metrics for potential compliance discrepancies.`, modelTarget: 'gemini-3.7-flash' }
      ],
      search: {
        searchableFields: ['id', 'title', 'status'],
        placeholder: `Search ${capabilityName}...`
      },
      filters: [
        { field: 'status', label: 'Status Filter', type: 'select' }
      ],
      exports: [
        { formats: ['CSV', 'EXCEL', 'PDF'] }
      ],
      imports: [
        { allowedExtensions: ['.csv', '.xlsx'], schemaMappingId: `${capabilityId}-schema` }
      ],
      notifications: [
        { channel: 'IN_APP', triggerEvent: 'CAPABILITY_UPDATED' }
      ],
      audit: {
        logLevel: 'INFO',
        trackChanges: true
      },
      runtimeComponent: {
        componentId: JUMOCapabilityMetadataGenerator.getRuntimeComponentForProduct(productId),
        resolver: 'RegistryResolver'
      }
    };
  }

  private static getDomainCategory(productId: string): string {
    switch (productId) {
      case 'JUMO-FINTECH': return 'FINTECH';
      case 'JUMO-NURSERY-PRIMARY-ERP': return 'PRIMARY_EDUCATION';
      case 'JUMO-SECONDARY-ERP': return 'SECONDARY_EDUCATION';
      case 'JUMO-ALUMNI': return 'ALUMNI_COMMUNITY';
      case 'JUMO-CHURCH': return 'ECCLESIASTICAL';
      case 'JUMO-CONTROL': return 'SOVEREIGN_GOVERNANCE';
      default: return 'ENTERPRISE';
    }
  }

  private static getIconForDomain(category: string): string {
    switch (category) {
      case 'FINTECH': return 'Landmark';
      case 'PRIMARY_EDUCATION': return 'School';
      case 'SECONDARY_EDUCATION': return 'GraduationCap';
      case 'ALUMNI_COMMUNITY': return 'Users';
      case 'ECCLESIASTICAL': return 'Church';
      case 'SOVEREIGN_GOVERNANCE': return 'ShieldCheck';
      default: return 'Layers';
    }
  }

  private static getRuntimeComponentForProduct(productId: string): string {
    switch (productId) {
      case 'JUMO-FINTECH': return 'FintechWorkspace';
      case 'JUMO-NURSERY-PRIMARY-ERP': return 'EducationWorkspace';
      case 'JUMO-SECONDARY-ERP': return 'EducationWorkspace';
      case 'JUMO-ALUMNI': return 'AlumniWorkspace';
      case 'JUMO-CHURCH': return 'ChurchWorkspace';
      case 'JUMO-CONTROL': return 'OwnerControlWorkspace';
      default: return 'UniversalWorkspace';
    }
  }
}

export default JUMOCapabilityMetadataGenerator;
