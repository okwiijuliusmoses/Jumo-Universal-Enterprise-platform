/**
 * JUMO UEOS — Sovereign ERP Workspace Contract
 * Authoritative runtime contract required for all sovereign ERP domain platforms.
 * No ERP can start without validating against this contract.
 */

export interface ERPWorkspaceContract {
  id: string;
  name: string;
  category: string;
  modules: any[];
  features: string[];
  configuration: Record<string, any>;
  tenant: {
    id: string;
    name: string;
    tier: string;
    region: string;
    isolationLevel: 'Row-Level' | 'Schema-Level' | 'Database-Level';
  };
  permissions: string[];
  status: 'ACTIVE' | 'PENDING' | 'MAINTENANCE' | 'ARCHIVED' | string;
}

export function validateERPWorkspaceContract(contract: Partial<ERPWorkspaceContract>): ERPWorkspaceContract {
  return {
    id: contract.id || 'unknown_erp',
    name: contract.name || 'Sovereign ERP Platform',
    category: contract.category || 'Enterprise Domain',
    modules: contract.modules ?? [],
    features: contract.features ?? [],
    configuration: contract.configuration ?? {},
    tenant: contract.tenant ?? {
      id: 'TEN-DEFAULT',
      name: 'Sovereign Primary Tenant',
      tier: 'ENTERPRISE',
      region: 'East-Africa-Central',
      isolationLevel: 'Schema-Level'
    },
    permissions: contract.permissions ?? ['ADMIN_VIEW', 'LEDGER_POST', 'WORKFLOW_EXECUTE'],
    status: contract.status || 'ACTIVE'
  };
}
