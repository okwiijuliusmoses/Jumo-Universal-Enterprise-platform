import { 
  FileText, Layers, Zap, Sliders, Shield, Award, Cloud, Home, 
  ShieldCheck, BookOpen, CreditCard, Settings, RefreshCw, LogOut,
  Terminal, Search, Cpu, HardDrive
} from "lucide-react";

export interface UEOSCommand {
  id: string;
  label: string;
  shortcut?: string;
  category: string;
  icon?: any;
  action: () => void;
  description?: string;
}

export class UEOSCommandRegistry {
  private static commands: Map<string, UEOSCommand> = new Map();

  public static register(command: UEOSCommand): void {
    this.commands.set(command.id, command);
  }

  public static getAll(): UEOSCommand[] {
    return Array.from(this.commands.values());
  }

  public static search(query: string): UEOSCommand[] {
    if (!query || query.trim() === "") {
      return this.getAll();
    }
    const q = query.toLowerCase().trim();
    return this.getAll().filter(cmd => 
      cmd.label.toLowerCase().includes(q) || 
      cmd.category.toLowerCase().includes(q) ||
      (cmd.description && cmd.description.toLowerCase().includes(q)) ||
      cmd.id.toLowerCase().includes(q)
    );
  }

  public static execute(id: string): void {
    const cmd = this.commands.get(id);
    if (cmd && typeof cmd.action === "function") {
      cmd.action();
    }
  }

  public static clear(): void {
    this.commands.clear();
  }
}

export function initializeSovereignCommandRegistry(context: {
  navigate: (workspace: any) => void;
  toggleSidebar: () => void;
  openSettings: () => void;
  runTriggerAction: (actionId: string, params?: any) => void;
}): void {
  UEOSCommandRegistry.clear();

  // Navigation Commands
  const navCommands: UEOSCommand[] = [
    {
      id: "cmd-nav-spec",
      label: "Navigate: Specification & Intake Studio",
      category: "Navigation",
      icon: FileText,
      shortcut: "G S",
      action: () => context.navigate("specification"),
      description: "Open the 19-section institutional specification compiler"
    },
    {
      id: "cmd-nav-arch",
      label: "Navigate: Architecture Studio",
      category: "Navigation",
      icon: Layers,
      shortcut: "G A",
      action: () => context.navigate("architecture"),
      description: "Inspect sovereign architecture contracts and layers"
    },
    {
      id: "cmd-nav-mfg",
      label: "Navigate: Manufacturing Factory",
      category: "Navigation",
      icon: Zap,
      shortcut: "G M",
      action: () => context.navigate("manufacturing"),
      description: "Monitor the 20-stage enterprise manufacturing pipeline"
    },
    {
      id: "cmd-nav-config",
      label: "Navigate: Configuration & Branding Studio",
      category: "Navigation",
      icon: Sliders,
      action: () => context.navigate("config"),
      description: "Configure product parameters, capability matrix, and theme"
    },
    {
      id: "cmd-nav-verif",
      label: "Navigate: Verification & Testing Gates",
      category: "Navigation",
      icon: Shield,
      shortcut: "G V",
      action: () => context.navigate("verification"),
      description: "Run 16-stage integrity and architecture conformance gates"
    },
    {
      id: "cmd-nav-cert",
      label: "Navigate: Certification & Assurance",
      category: "Navigation",
      icon: Award,
      action: () => context.navigate("certification"),
      description: "Issue sovereign certification seals and audit compliance"
    },
    {
      id: "cmd-nav-deploy",
      label: "Navigate: Provision & Deployment",
      category: "Navigation",
      icon: Cloud,
      shortcut: "G D",
      action: () => context.navigate("deployment"),
      description: "Manage runtime deployment slots and scaling"
    },
    {
      id: "cmd-nav-ops",
      label: "Navigate: Runtime Operations",
      category: "Navigation",
      icon: Home,
      shortcut: "G O",
      action: () => context.navigate("overview"),
      description: "Real-time telemetry, memory, and cluster health"
    },
    {
      id: "cmd-nav-control",
      label: "Navigate: Sovereign Control & Governance",
      category: "Navigation",
      icon: ShieldCheck,
      action: () => context.navigate("control"),
      description: "National emergency controls and panic switch"
    },
    {
      id: "cmd-nav-templates",
      label: "Navigate: Registries & Standards",
      category: "Navigation",
      icon: BookOpen,
      action: () => context.navigate("templates"),
      description: "Browse ERP ecosystem registry and commercial products"
    },
    {
      id: "cmd-nav-faap",
      label: "Navigate: Sovereign FAAP Ledger",
      category: "Navigation",
      icon: CreditCard,
      shortcut: "G F",
      action: () => context.navigate("faap"),
      description: "Access sovereign double-entry accounting and treasury"
    }
  ];

  navCommands.forEach(cmd => UEOSCommandRegistry.register(cmd));

  // System Action Commands
  const actionCommands: UEOSCommand[] = [
    {
      id: "cmd-sys-sidebar",
      label: "Toggle Navigation Rail",
      category: "System",
      icon: HardDrive,
      shortcut: "Ctrl B",
      action: () => context.toggleSidebar(),
      description: "Collapse or expand sidebar navigation"
    },
    {
      id: "cmd-sys-settings",
      label: "Open Operating Preferences",
      category: "System",
      icon: Settings,
      shortcut: "Ctrl ,",
      action: () => context.openSettings(),
      description: "Configure shell theme, density, and operator identity"
    },
    {
      id: "cmd-sys-sync",
      label: "Synchronize Sovereign Registries",
      category: "System",
      icon: RefreshCw,
      action: () => {
        window.dispatchEvent(new CustomEvent("ueos_registry_sync"));
        context.runTriggerAction("SYSTEM_SYNC_ALL", { timestamp: Date.now() });
      },
      description: "Trigger real-time state synchronization across all nodes"
    },
    {
      id: "cmd-sys-emergency",
      label: "Trigger Sovereign Panic Lockdown",
      category: "Emergency",
      icon: ShieldCheck,
      action: () => {
        context.navigate("control");
        context.runTriggerAction("SOVEREIGN_EMERGENCY_LOCKDOWN", { reason: "Operator manual invocation" });
      },
      description: "Activate immutable fail-safe lockdown mode"
    }
  ];

  actionCommands.forEach(cmd => UEOSCommandRegistry.register(cmd));
}
