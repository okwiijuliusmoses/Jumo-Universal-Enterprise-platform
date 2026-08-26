import { 
  Shield, 
  Cpu, 
  Layout, 
  FormInput, 
  Navigation, 
  Box, 
  Server, 
  Settings, 
  Lock, 
  GitBranch, 
  Database, 
  BarChart3, 
  Globe, 
  Smartphone, 
  TestTube, 
  Activity, 
  CheckCircle, 
  ClipboardCheck 
} from 'lucide-react';
import { 
  FintechModuleRegistry, 
  FintechCapabilityRegistry 
} from '../../registries/FintechBenchmarkRegistry';
import { ModuleAgentRegistryEntry, FintechModuleAgent, ModuleWorkforce } from './types';

const SHARED_AGENTS: Record<string, FintechModuleAgent> = {
  ARCHITECT: {
    id: 'agent-arch-001',
    name: 'Module Architect',
    role: 'ARCHITECT',
    icon: Cpu,
    responsibilities: ['Architecture Discovery', 'Capability Decomposition', 'Technical Contracts'],
    status: 'ACTIVE'
  },
  CAPABILITY: {
    id: 'agent-cap-001',
    name: 'Capability Engineer',
    role: 'CAPABILITY_ENGINEER',
    icon: Shield,
    responsibilities: ['Discovery', 'Ownership Mapping', 'Contract Definition'],
    status: 'ACTIVE'
  },
  WORKSPACE: {
    id: 'agent-ws-001',
    name: 'Workspace Engineer',
    role: 'WORKSPACE_ENGINEER',
    icon: Layout,
    responsibilities: ['UI Layouts', 'State Management', 'Workspace Navigation'],
    status: 'ACTIVE'
  },
  FORM: {
    id: 'agent-form-001',
    name: 'Form Engineer',
    role: 'FORM_ENGINEER',
    icon: FormInput,
    responsibilities: ['Schema Generation', 'Validation Rules', 'Submission Flows'],
    status: 'ACTIVE'
  },
  NAVIGATION: {
    id: 'agent-nav-001',
    name: 'Navigation Agent',
    role: 'NAVIGATION_ENGINEER',
    icon: Navigation,
    responsibilities: ['Route Construction', 'Breadcrumbs', 'Contextual Menus'],
    status: 'ACTIVE'
  },
  COMPONENT: {
    id: 'agent-ui-001',
    name: 'Component Engineer',
    role: 'COMPONENT_ENGINEER',
    icon: Box,
    responsibilities: ['Business Components', 'Data Visualizations', 'Tables'],
    status: 'ACTIVE'
  },
  SERVICE: {
    id: 'agent-srv-001',
    name: 'Service Agent',
    role: 'SERVICE_ENGINEER',
    icon: Server,
    responsibilities: ['API Bindings', 'Data Access', 'Command/Query Generation'],
    status: 'ACTIVE'
  },
  CONFIGURATION: {
    id: 'agent-cfg-001',
    name: 'Configuration Engineer',
    role: 'CONFIGURATION_ENGINEER',
    icon: Settings,
    responsibilities: ['Policy Schemas', 'Tenant Defaults', 'Operational Settings'],
    status: 'ACTIVE'
  },
  SECURITY: {
    id: 'agent-sec-001',
    name: 'Security Agent',
    role: 'SECURITY_ENGINEER',
    icon: Lock,
    responsibilities: ['RBAC Generation', 'Permission Mapping', 'Audit Policy'],
    status: 'ACTIVE'
  },
  WORKFLOW: {
    id: 'agent-wf-001',
    name: 'Workflow Engineer',
    role: 'WORKFLOW_ENGINEER',
    icon: GitBranch,
    responsibilities: ['Approval Chains', 'State Transitions', 'Notifications'],
    status: 'ACTIVE'
  },
  DATA: {
    id: 'agent-data-001',
    name: 'Data Engineer',
    role: 'DATA_ENGINEER',
    icon: Database,
    responsibilities: ['Schema Design', 'Relationships', 'Data Lifecycle'],
    status: 'ACTIVE'
  },
  REPORTING: {
    id: 'agent-rep-001',
    name: 'Reporting Agent',
    role: 'REPORTING_ENGINEER',
    icon: BarChart3,
    responsibilities: ['Analytics Discovery', 'Report Generation', 'Exports'],
    status: 'ACTIVE'
  },
  WEB: {
    id: 'agent-web-001',
    name: 'Web Experience Agent',
    role: 'WEB_EXPERIENCE_AGENT',
    icon: Globe,
    responsibilities: ['Web Optimization', 'Responsive Layouts'],
    status: 'ACTIVE'
  },
  MOBILE: {
    id: 'agent-mob-001',
    name: 'Mobile Experience Agent',
    role: 'MOBILE_EXPERIENCE_AGENT',
    icon: Smartphone,
    responsibilities: ['Mobile UX', 'Native Patterns'],
    status: 'ACTIVE'
  },
  TEST: {
    id: 'agent-test-001',
    name: 'Test Engineer',
    role: 'TEST_ENGINEER',
    icon: TestTube,
    responsibilities: ['Unit/Integration Tests', 'Regression Automation'],
    status: 'ACTIVE'
  },
  RELIABILITY: {
    id: 'agent-rel-001',
    name: 'Reliability Agent',
    role: 'RELIABILITY_AGENT',
    icon: Activity,
    responsibilities: ['Runtime Diagnosis', 'Parity Detection', 'Safe Ops Enforcement'],
    status: 'ACTIVE'
  },
  VERIFICATION: {
    id: 'agent-ver-001',
    name: 'Verification Agent',
    role: 'VERIFICATION_AGENT',
    icon: CheckCircle,
    responsibilities: ['Independent Audit', 'Implementation Certification'],
    status: 'ACTIVE'
  },
  COMPLIANCE: {
    id: 'agent-comp-001',
    name: 'Compliance Agent',
    role: 'COMPLIANCE_AGENT',
    icon: ClipboardCheck,
    responsibilities: ['Financial Auditability', 'Traceability', 'Legal Alignment'],
    status: 'ACTIVE'
  }
};

// Dynamic Workforce Generator
// This logic ensures every approved module is assigned a workforce that inspects its specification.
const generateWorkforceForModule = (moduleId: string): ModuleWorkforce => {
  const moduleSpec = FintechModuleRegistry.find(m => m.id === moduleId);
  if (!moduleSpec) throw new Error(`Module ${moduleId} not found in benchmark registry.`);

  const capabilities = FintechCapabilityRegistry
    .filter(c => c.targetModuleId === moduleId)
    .map(c => c.id);

  // Assign agents based on module profile
  const agents = [
    SHARED_AGENTS.ARCHITECT,
    SHARED_AGENTS.CAPABILITY,
    SHARED_AGENTS.SECURITY,
    SHARED_AGENTS.RELIABILITY,
    SHARED_AGENTS.VERIFICATION,
    SHARED_AGENTS.COMPLIANCE
  ];

  // If it's a core module, it gets the full workforce
  if (moduleSpec.isCore) {
    agents.push(
      SHARED_AGENTS.WORKSPACE,
      SHARED_AGENTS.FORM,
      SHARED_AGENTS.NAVIGATION,
      SHARED_AGENTS.COMPONENT,
      SHARED_AGENTS.SERVICE,
      SHARED_AGENTS.CONFIGURATION,
      SHARED_AGENTS.WORKFLOW,
      SHARED_AGENTS.DATA,
      SHARED_AGENTS.REPORTING,
      SHARED_AGENTS.WEB,
      SHARED_AGENTS.TEST
    );
  }

  return {
    moduleId: moduleSpec.id,
    moduleName: moduleSpec.name,
    moduleOwner: 'JUMO UEOS Platform',
    agents,
    capabilitiesUnderManagement: capabilities,
    lastReconciliation: new Date().toISOString(),
    completenessScore: moduleSpec.status === 'ACTIVE' ? 100 : 0,
    verificationStatus: moduleSpec.status === 'ACTIVE' ? 'VERIFIED' : 'PENDING',
    artifacts: capabilities.map(c => ({
      type: 'CAPABILITY',
      id: `art-${c}`,
      status: 'GENERATED'
    }))
  };
};

export const FintechModuleAgentRegistry: Record<string, ModuleAgentRegistryEntry> = 
  FintechModuleRegistry.reduce((acc, mod) => ({
    ...acc,
    [mod.id]: {
      moduleId: mod.id,
      workforce: generateWorkforceForModule(mod.id)
    }
  }), {});
