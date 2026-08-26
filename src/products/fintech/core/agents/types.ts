import { LucideIcon } from 'lucide-react';

export type FintechAgentRole = 
  | 'ARCHITECT'
  | 'CAPABILITY_ENGINEER'
  | 'WORKSPACE_ENGINEER'
  | 'FORM_ENGINEER'
  | 'NAVIGATION_ENGINEER'
  | 'COMPONENT_ENGINEER'
  | 'SERVICE_ENGINEER'
  | 'CONFIGURATION_ENGINEER'
  | 'SECURITY_ENGINEER'
  | 'WORKFLOW_ENGINEER'
  | 'DATA_ENGINEER'
  | 'REPORTING_ENGINEER'
  | 'WEB_EXPERIENCE_AGENT'
  | 'MOBILE_EXPERIENCE_AGENT'
  | 'TEST_ENGINEER'
  | 'RELIABILITY_AGENT'
  | 'VERIFICATION_AGENT'
  | 'COMPLIANCE_AGENT';

export interface FintechModuleAgent {
  id: string;
  name: string;
  role: FintechAgentRole;
  icon: LucideIcon;
  responsibilities: string[];
  status: 'ACTIVE' | 'IDLE' | 'BUSY' | 'ERROR';
}

export interface ModuleWorkforce {
  moduleId: string;
  moduleName: string;
  moduleOwner: string;
  agents: FintechModuleAgent[];
  capabilitiesUnderManagement: string[];
  lastReconciliation: string;
  completenessScore: number;
  verificationStatus: 'PENDING' | 'VERIFIED' | 'FAILED' | 'CERTIFIED';
  artifacts: {
    type: string;
    id: string;
    status: 'GENERATED' | 'RECONCILED' | 'OUTSTANDING';
  }[];
}

export interface ModuleAgentRegistryEntry {
  moduleId: string;
  workforce: ModuleWorkforce;
}
