import { 
  Cpu, Shield, ShieldCheck, Activity, Search, Code, Layout, 
  Terminal, Database, Lock, Settings, BarChart3, Globe, 
  TestTube, CheckCircle, Boxes, Workflow, FileText
} from 'lucide-react';
import { JumoAgent, ModuleWorkforce, JumoModule } from './types';
import { GlobalCapabilityRegistry, getCapabilitiesForModule } from './JumoGlobalRegistry';

const SHARED_AGENTS: Record<string, JumoAgent> = {
  ARCHITECT: {
    id: 'AGENT_ARCHITECT',
    name: 'Module System Architect',
    role: 'ARCHITECT',
    icon: Cpu,
    description: 'Defines module architecture, capability decomposition, and business layers.'
  },
  SECURITY: {
    id: 'AGENT_SECURITY',
    name: 'AEGIS Security Guard',
    role: 'SECURITY',
    icon: Lock,
    description: 'Enforces zero-trust RBAC/ABAC and audit controls.'
  },
  RELIABILITY: {
    id: 'AGENT_RELIABILITY',
    name: 'Uptime Reliability Agent',
    role: 'RELIABILITY',
    icon: Activity,
    description: 'Monitors runtime integrity and ensures absolute zero-parity.'
  },
  VERIFICATION: {
    id: 'AGENT_VERIFICATION',
    name: 'Compliance Verifier',
    role: 'VERIFICATION',
    icon: ShieldCheck,
    description: 'Validates implementation against institutional business specifications.'
  },
  WORKSPACE: {
    id: 'AGENT_WORKSPACE',
    name: 'Workspace Engineer',
    role: 'WORKSPACE',
    icon: Layout,
    description: 'Designs independent workspaces and horizontal capability navigation.'
  },
  FORM_ENGINEER: {
    id: 'AGENT_FORM',
    name: 'Digital Form Manufacturer',
    role: 'FORM',
    icon: FileText,
    description: 'Automatically generates executable digital forms and validation schemas.'
  },
  WORKFLOW_ORCHESTRATOR: {
    id: 'AGENT_WORKFLOW',
    name: 'Process Orchestrator',
    role: 'WORKFLOW',
    icon: Workflow,
    description: 'Manages capability-specific state transitions and approval pipelines.'
  },
  DATA_SCIENTIST: {
    id: 'AGENT_DATA',
    name: 'Ledger Data Scientist',
    role: 'DATA',
    icon: Database,
    description: 'Connects components to registered business services and live data.'
  },
  REPORTING_AGENT: {
    id: 'AGENT_REPORTING',
    name: 'Analytics Engine',
    role: 'REPORTING',
    icon: BarChart3,
    description: 'Compiles operational and financial reports from runtime records.'
  }
};

export const provisionModuleWorkforce = (module: JumoModule): ModuleWorkforce => {
  const moduleCaps = getCapabilitiesForModule(module.id);
  const capabilities = moduleCaps.map(c => c.id);

  // Core agents assigned to EVERY module
  const baseAgents = [
    SHARED_AGENTS.ARCHITECT,
    SHARED_AGENTS.SECURITY,
    SHARED_AGENTS.RELIABILITY,
    SHARED_AGENTS.VERIFICATION
  ];

  // specialized agents based on module profile
  const specializedAgents: JumoAgent[] = [];
  
  if (module.isCore) {
    specializedAgents.push(
      SHARED_AGENTS.WORKSPACE,
      SHARED_AGENTS.FORM_ENGINEER,
      SHARED_AGENTS.WORKFLOW_ORCHESTRATOR,
      SHARED_AGENTS.DATA_SCIENTIST,
      SHARED_AGENTS.REPORTING_AGENT
    );
  }

  // Calculate completeness based on capability status
  const totalWeight = moduleCaps.length * 100;
  const currentWeight = moduleCaps.reduce((acc, cap) => {
    switch (cap.implementationStatus) {
      case 'VERIFIED': return acc + 100;
      case 'EXECUTABLE': return acc + 90;
      case 'IMPLEMENTED': return acc + 80;
      case 'PARTIALLY_IMPLEMENTED': return acc + 40;
      case 'SCAFFOLDED': return acc + 20;
      case 'REGISTERED_ONLY': return acc + 5;
      default: return acc;
    }
  }, 0);

  const score = totalWeight > 0 ? Math.round((currentWeight / totalWeight) * 100) : 0;

  return {
    moduleId: module.id,
    moduleName: module.name,
    agents: [...baseAgents, ...specializedAgents],
    capabilitiesUnderManagement: capabilities,
    lastReconciliation: new Date().toISOString(),
    completenessScore: score,
    verificationStatus: score >= 90 ? 'CERTIFIED' : score >= 60 ? 'VERIFIED' : 'PENDING'
  };
};
