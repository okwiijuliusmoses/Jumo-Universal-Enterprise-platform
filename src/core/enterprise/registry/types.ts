import { LucideIcon } from 'lucide-react';

export type ImplementationStatus = 'REGISTERED_ONLY' | 'SCAFFOLDED' | 'PARTIALLY_IMPLEMENTED' | 'IMPLEMENTED' | 'EXECUTABLE' | 'VERIFIED' | 'MISSING' | 'DEFERRED';
export type SecurityLevel = 'PUBLIC' | 'RESTRICTED' | 'CONFIDENTIAL' | 'TOP_SECRET' | 'CRITICAL';

export interface JumoCapability {
  id: string;
  moduleId: string;
  name: string;
  description: string;
  icon?: LucideIcon;
  implementationStatus: ImplementationStatus;
  securityLevel: SecurityLevel;
  benchmarks?: string[];
  configSchema?: any;
  workflowId?: string;
  formId?: string;
  reportId?: string;
  serviceId?: string;
  workspaceDefinition?: {
    type: 'DASHBOARD' | 'LEDGER' | 'REGISTRY' | 'PROCESS' | 'ANALYTICS' | 'CUSTOM';
    components: string[];
  };
}

export interface JumoModule {
  id: string;
  productId: string;
  name: string;
  description: string;
  icon: LucideIcon;
  isCore: boolean;
  status: 'ACTIVE' | 'INACTIVE' | 'INSTALLING';
  version: string;
  owner: string;
}

export interface JumoAgent {
  id: string;
  name: string;
  role: 'ARCHITECT' | 'CAPABILITY' | 'WORKSPACE' | 'FORM' | 'NAVIGATION' | 'COMPONENT' | 'SERVICE' | 'CONFIGURATION' | 'SECURITY' | 'WORKFLOW' | 'DATA' | 'REPORTING' | 'WEB' | 'TEST' | 'RELIABILITY' | 'VERIFICATION' | 'COMPLIANCE';
  icon: LucideIcon;
  description: string;
}

export interface ModuleWorkforce {
  moduleId: string;
  moduleName: string;
  agents: JumoAgent[];
  capabilitiesUnderManagement: string[];
  lastReconciliation: string;
  completenessScore: number;
  verificationStatus: 'PENDING' | 'VERIFIED' | 'CERTIFIED';
}

export interface AIHybridComponentProps {
  capabilityId: string;
  moduleId: string;
  type: 'KPI' | 'GRID' | 'FORM' | 'CHART' | 'WORKFLOW' | 'APPROVAL' | 'CONFIG';
  title?: string;
  config?: any;
}
