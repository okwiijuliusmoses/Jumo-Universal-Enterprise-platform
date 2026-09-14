/**
 * JUMO UEOS — Authoritative Contract Definitions & Validators
 * 
 * Strict runtime validators that verify contracts and reject empty scaffolding,
 * fake placeholders (e.g. "Coming soon", empty objects `{}`), or stub implementations.
 */

export interface JumoModuleIdentity {
  moduleId: string;
  productCode: string;
  directorateId: string;
  departmentId: string;
  officeId: string;
  portalId: string;
  title: string;
  purpose: string;
  version: string;
}

export interface JumoModuleCapabilityContract {
  capabilityId: string;
  name: string;
  description: string;
  serviceAction: string;
  requiredPermission: string;
}

export interface JumoScreenContract {
  screenId: string;
  title: string;
  viewType: 'DASHBOARD' | 'TABLE' | 'FORM' | 'KANBAN' | 'DETAIL' | 'DOCUMENT';
  route: string;
  metadataConfig?: Record<string, any>;
}

export interface JumoFormContract {
  formId: string;
  title: string;
  submitAction: string;
  fields: {
    name: string;
    label: string;
    type: 'text' | 'number' | 'select' | 'date' | 'file' | 'currency' | 'textarea';
    required: boolean;
  }[];
}

export interface JumoDashboardContract {
  dashboardId: string;
  title: string;
  widgets: {
    widgetId: string;
    title: string;
    type: 'KPI_CARD' | 'CHART' | 'TABLE' | 'FEED';
    metricKey: string;
  }[];
}

export interface JumoReportContract {
  reportId: string;
  title: string;
  format: 'TABULAR' | 'SUMMARY' | 'FINANCIAL_STATEMENT' | 'REGULATORY_RETURN';
  exportTypes: ('PDF' | 'CSV' | 'XLSX')[];
  querySchema: Record<string, any>;
}

export interface JumoWorkflowContract {
  workflowId: string;
  title: string;
  stages: {
    stageId: string;
    name: string;
    requiredRole: string;
    slaHours?: number;
  }[];
}

export interface JumoDatabaseContract {
  tableName: string;
  primaryKey: string;
  fields: Record<string, string>;
  foreignKeys?: Record<string, string>;
  indexes?: string[];
}

export interface JumoAPIContract {
  apiId: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  endpoint: string;
  requiredPermission: string;
  handlerSignature: string;
}

export interface JumoTestContract {
  testId: string;
  targetId: string;
  testType: 'UNIT' | 'INTEGRATION' | 'CONTRACT' | 'SECURITY';
  assertions: string[];
}

export interface JumoFullModuleContract {
  identity: JumoModuleIdentity;
  capabilities: JumoModuleCapabilityContract[];
  screens: JumoScreenContract[];
  forms: JumoFormContract[];
  dashboards: JumoDashboardContract[];
  reports: JumoReportContract[];
  workflows: JumoWorkflowContract[];
  databaseEntities: JumoDatabaseContract[];
  apis: JumoAPIContract[];
  tests: JumoTestContract[];
  permissions: string[];
  runtimeComponent: {
    componentId: string;
    renderStrategy: 'METADATA_UNIVERSAL' | 'BESPOKE_INTERACTIVE';
  };
}

export class JumoContractValidator {
  /**
   * Validates that a module contract is real and not a stub.
   */
  public static validateModuleContract(contract: any): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!contract || typeof contract !== 'object') {
      return { valid: false, errors: ['Contract is null or not an object'] };
    }

    // Check identity
    if (!contract.identity?.moduleId || !contract.identity?.title || !contract.identity?.portalId) {
      errors.push('Missing required module identity fields (moduleId, title, portalId)');
    }

    // Check capabilities
    if (!Array.isArray(contract.capabilities) || contract.capabilities.length === 0) {
      errors.push('Module contract must provide at least one valid capability');
    } else {
      contract.capabilities.forEach((cap: any, idx: number) => {
        if (!cap.capabilityId || !cap.name || !cap.serviceAction) {
          errors.push(`Capability at index ${idx} is missing required contract fields`);
        }
      });
    }

    // Check UI Metadata / Screens
    if (!Array.isArray(contract.screens) || contract.screens.length === 0) {
      errors.push('Module contract must provide at least one screen definition');
    } else {
      contract.screens.forEach((scr: any, idx: number) => {
        if (!scr.screenId || !scr.title || !scr.route) {
          errors.push(`Screen at index ${idx} is missing required contract fields`);
        }
      });
    }

    // Check for placeholder anti-patterns
    const contractString = JSON.stringify(contract).toLowerCase();
    if (contractString.includes('coming soon') || contractString.includes('todo: implement') || contractString.includes('placeholder')) {
      errors.push('Contract contains forbidden placeholder tokens ("coming soon", "todo", "placeholder")');
    }

    return {
      valid: errors.length === 0,
      errors
    };
  }
}
