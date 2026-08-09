// JUMO UEOS — Centralized Universal OS Command Registry
// Single source of truth for both keyboard commands and Command Palette search indexing.

import { 
  Command, Cpu, FileText, Users, Server, Layers, CheckSquare, Globe, 
  RefreshCw, Shield, History, Settings, Menu
} from "lucide-react";

export interface UEOSCommand {
  id: string;
  label: string;
  description: string;
  icon: any;
  category: "COMMAND" | "BUILD" | "ENTERPRISE" | "INTELLIGENCE" | "CLOUD" | "OPERATIONS" | "GOVERNANCE" | "FINANCE" | "SYSTEM";
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

// Register baseline JUMO commands
export const initializeSovereignCommandRegistry = (navigationActions: {
  navigate: (workspace: any) => void;
  toggleSidebar: () => void;
  openSettings: () => void;
  runTriggerAction?: (actionId: string, params?: any) => void;
}) => {
  const commands: UEOSCommand[] = [
    {
      id: "hub.open",
      label: "Open Command Center",
      description: "Return to the sovereign JUMO UEOS National Command Center dashboard",
      icon: Command,
      category: "COMMAND",
      shortcut: "Alt + ↑",
      auditClassification: "QUERY",
      action: () => navigationActions.navigate("command")
    },
    {
      id: "manufacturing.queue.open",
      label: "Open Manufacturing Planner",
      description: "Open the active Manufacturing Queue, Intake requirements and compile blueprints",
      icon: Cpu,
      category: "BUILD",
      auditClassification: "QUERY",
      action: () => navigationActions.navigate("manufacturing")
    },
    {
      id: "blueprints.open",
      label: "Open Blueprint Factory",
      description: "Inspect sovereign modular compilation templates and generated blueprints",
      icon: FileText,
      category: "BUILD",
      auditClassification: "QUERY",
      action: () => navigationActions.navigate("blueprints")
    },
    {
      id: "workforce.open",
      label: "Open AI Workforce Registry",
      description: "Inspect and command all 252 JUMO AI agents across 9 specializations",
      icon: Users,
      category: "INTELLIGENCE",
      auditClassification: "QUERY",
      action: () => navigationActions.navigate("workforce")
    },
    {
      id: "cloud.open",
      label: "Open Cloud Control",
      description: "Configure virtual slots, allocate hypervisor memory and scaling weights",
      icon: Server,
      category: "CLOUD",
      auditClassification: "QUERY",
      action: () => navigationActions.navigate("cloud")
    },
    {
      id: "registries.open",
      label: "Open Registries Fabric",
      description: "Inspect enterprise databases, systems, ERP ecosystems and static products catalog",
      icon: Layers,
      category: "GOVERNANCE",
      auditClassification: "QUERY",
      action: () => navigationActions.navigate("registries")
    },
    {
      id: "verification.open",
      label: "Open Verification Console",
      description: "Monitor and run the sovereign 20-Gate cryptographic audit verification suite",
      icon: CheckSquare,
      category: "GOVERNANCE",
      auditClassification: "QUERY",
      action: () => navigationActions.navigate("verification")
    },
    {
      id: "deployment.open",
      label: "Open Deployment Center",
      description: "Observe staging builds, promote stable releases, or execute live container rollbacks",
      icon: Globe,
      category: "OPERATIONS",
      auditClassification: "QUERY",
      action: () => navigationActions.navigate("deployment")
    },
    {
      id: "migration.open",
      label: "Open Migration & Upgrade",
      description: "Trigger secure memory-backed DDL schema upgrades and verifiable database migrations",
      icon: RefreshCw,
      category: "OPERATIONS",
      auditClassification: "QUERY",
      action: () => navigationActions.navigate("migration")
    },
    {
      id: "audit.open",
      label: "Open Audit & Guardian",
      description: "Execute baseline directory hashing verification and integrity scanning loops",
      icon: Shield,
      category: "GOVERNANCE",
      auditClassification: "QUERY",
      action: () => navigationActions.navigate("audit")
    },
    {
      id: "lifecycle.open",
      label: "Open Lifecycle Center",
      description: "Observe system event streams and recent operating logs",
      icon: History,
      category: "OPERATIONS",
      auditClassification: "QUERY",
      action: () => navigationActions.navigate("lifecycle")
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
      id: "audit.verify_hash",
      label: "Trigger Integrity Drift Scan",
      description: "Execute live SHA-256 baseline verification audit on key platform files",
      icon: Shield,
      category: "GOVERNANCE",
      auditClassification: "SECURITY_ENFORCEMENT",
      action: () => {
        navigationActions.navigate("audit");
        if (navigationActions.runTriggerAction) {
          navigationActions.runTriggerAction("verify-hashes");
        }
      }
    },
    {
      id: "verification.run_all",
      label: "Run Full 20-Gate Suite",
      description: "Execute the unified compliance verification logic to sign and seal release candidates",
      icon: CheckSquare,
      category: "GOVERNANCE",
      auditClassification: "SECURITY_ENFORCEMENT",
      action: () => {
        navigationActions.navigate("verification");
        if (navigationActions.runTriggerAction) {
          navigationActions.runTriggerAction("run-verification-suite");
        }
      }
    }
  ];

  commands.forEach(cmd => UEOSCommandRegistry.register(cmd));
};
