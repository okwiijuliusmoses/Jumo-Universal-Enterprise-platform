// JUMO UEOS — Centralized Universal OS Command Registry
// Single source of truth for both keyboard commands and Command Palette search indexing.

import { 
  Command, FileText, Users, Server, Layers, CheckSquare, Globe, 
  RefreshCw, Shield, History, Settings, Menu, Zap, School, BookOpen,
  GraduationCap, Church, CreditCard, DollarSign, Lock, BrainCircuit, Workflow, Cloud, Landmark
} from "lucide-react";

export interface UEOSCommand {
  id: string;
  label: string;
  description: string;
  icon: any;
  category: "COMMAND" | "PRODUCTS" | "PLATFORMS" | "INTELLIGENCE" | "CLOUD" | "OPERATIONS" | "GOVERNANCE" | "FINANCE" | "SYSTEM";
  shortcut?: string;
  requiredPermission?: string;
  auditClassification: "QUERY" | "MUTATION" | "SYSTEM_RELOAD" | "SECURITY_ENFORCEMENT" | "CONFIG";
  action: (context: any) => void;
}

export class UEOSCommandRegistry {
  private static commands: Map<string, UEOSCommand> = new Map();

  static register(cmd: UEOSCommand) {
    this.commands.set(cmd.id, cmd);
  }

  static getCommand(id: string): UEOSCommand | undefined {
    return this.commands.get(id);
  }

  static getAll(): UEOSCommand[] {
    return Array.from(this.commands.values());
  }

  static search(query: string): UEOSCommand[] {
    const q = query.toLowerCase().trim();
    if (!q) return this.getAll();
    return this.getAll().filter(cmd => 
      cmd.label.toLowerCase().includes(q) || 
      cmd.description.toLowerCase().includes(q) ||
      cmd.category.toLowerCase().includes(q)
    );
  }
}

// Register baseline JUMO Sovereign commands
export const initializeSovereignCommandRegistry = (navigationActions: {
  navigate: (workspace: any) => void;
  toggleSidebar: () => void;
  openSettings: () => void;
  runTriggerAction?: (actionId: string, params?: any) => void;
}) => {
  const commands: UEOSCommand[] = [
    {
      id: "kernel.open",
      label: "Open Sovereign Kernel Dashboard",
      description: "Inspect live telemetry, health metrics, and ledger parity across the sovereign kernel",
      icon: Command,
      category: "COMMAND",
      shortcut: "Alt + ↑",
      auditClassification: "QUERY",
      action: () => navigationActions.navigate("overview")
    },
    {
      id: "products.open",
      label: "Open Commercial Products Ecosystem",
      description: "Browse all 6 Sovereign Products and 8 Independent Shared Platforms",
      icon: Layers,
      category: "PRODUCTS",
      auditClassification: "QUERY",
      action: () => navigationActions.navigate("products")
    },
    {
      id: "fintech.open",
      label: "Open JUMO FINTECH SACCO ERP",
      description: "Manage savings, credit scoring, loan underwriting, share capital, and USSD banking",
      icon: Zap,
      category: "PRODUCTS",
      auditClassification: "QUERY",
      action: () => navigationActions.navigate("fintech")
    },
    {
      id: "nursery.open",
      label: "Open JUMO Nursery & Primary ERP",
      description: "Manage pupil enrollment, continuous assessment, competency matrix, and fee billing",
      icon: School,
      category: "PRODUCTS",
      auditClassification: "QUERY",
      action: () => navigationActions.navigate("nursery-primary")
    },
    {
      id: "secondary.open",
      label: "Open JUMO Secondary School ERP",
      description: "Manage departments, national examinations, boarding houses, and academic timetables",
      icon: BookOpen,
      category: "PRODUCTS",
      auditClassification: "QUERY",
      action: () => navigationActions.navigate("secondary-school")
    },
    {
      id: "university.open",
      label: "Open JUMO University & Tertiary ERP",
      description: "Manage collegiate faculties, credit hours, senate grading, research grants, and housing",
      icon: GraduationCap,
      category: "PRODUCTS",
      auditClassification: "QUERY",
      action: () => navigationActions.navigate("university")
    },
    {
      id: "church.open",
      label: "Open JUMO Church & Faith ERP",
      description: "Manage diocesan ministries, member registries, electronic tithes, and pastoral care",
      icon: Church,
      category: "PRODUCTS",
      auditClassification: "QUERY",
      action: () => navigationActions.navigate("church")
    },
    {
      id: "alumni.open",
      label: "Open JUMO Alumni & Community ERP",
      description: "Manage alumni chapters, endowment funds, career mentorship, and reunion conventions",
      icon: Users,
      category: "PRODUCTS",
      auditClassification: "QUERY",
      action: () => navigationActions.navigate("alumni")
    },
    {
      id: "faap.open",
      label: "Open JUMO FAAP Ledger",
      description: "Access zero-parity double-entry accounting, chart of accounts, budget control, and taxes",
      icon: DollarSign,
      category: "FINANCE",
      auditClassification: "QUERY",
      action: () => navigationActions.navigate("faap")
    },
    {
      id: "pay.open",
      label: "Open JUMO Digital Pay Switch",
      description: "Monitor multi-rail transactions, mobile money settlements, and banking gateway routing",
      icon: CreditCard,
      category: "FINANCE",
      auditClassification: "QUERY",
      action: () => navigationActions.navigate("digital-pay")
    },
    {
      id: "aegis.open",
      label: "Open JUMO AEGIS Security Console",
      description: "Inspect zero-trust policy enforcement, cryptographic HSM keys, and session protection",
      icon: Lock,
      category: "GOVERNANCE",
      auditClassification: "QUERY",
      action: () => navigationActions.navigate("aegis")
    },
    {
      id: "ai.open",
      label: "Open JUMO AI Digital Hybrid Mesh",
      description: "Inspect multi-model cognitive routing, domain assistants, and semantic RAG intelligence",
      icon: BrainCircuit,
      category: "INTELLIGENCE",
      auditClassification: "QUERY",
      action: () => navigationActions.navigate("ai-hybrid")
    },
    {
      id: "auditor.open",
      label: "Open JUMO Digital Auditor",
      description: "Run continuous forensic ledger parity audit and statutory compliance verification",
      icon: Shield,
      category: "GOVERNANCE",
      auditClassification: "QUERY",
      action: () => navigationActions.navigate("digital-auditor")
    },
    {
      id: "workflow.open",
      label: "Open JUMO Workflow Engine",
      description: "Inspect BPMN process state machines, multi-tier approvals, and SLA escalations",
      icon: Workflow,
      category: "OPERATIONS",
      auditClassification: "QUERY",
      action: () => navigationActions.navigate("workflow")
    },
    {
      id: "cloud.open",
      label: "Open JUMO Cloud & Compute Fabric",
      description: "Inspect sovereign container nodes, multi-tenant isolation, and cluster telemetry",
      icon: Cloud,
      category: "CLOUD",
      auditClassification: "QUERY",
      action: () => navigationActions.navigate("cloud")
    },
    {
      id: "sidebar.toggle",
      label: "Toggle Sidebar Rails",
      description: "Toggle sidebar between expanded and icons-only collapsed state",
      icon: Menu,
      category: "SYSTEM",
      shortcut: "Ctrl + B",
      auditClassification: "CONFIG",
      action: () => navigationActions.toggleSidebar()
    },
    {
      id: "settings.open",
      label: "Open Settings Center",
      description: "Configure layout densities, visual modes, offline preferences, and keys",
      icon: Settings,
      category: "SYSTEM",
      shortcut: "Ctrl + ,",
      auditClassification: "CONFIG",
      action: () => navigationActions.openSettings()
    }
  ];

  commands.forEach(cmd => UEOSCommandRegistry.register(cmd));
};
