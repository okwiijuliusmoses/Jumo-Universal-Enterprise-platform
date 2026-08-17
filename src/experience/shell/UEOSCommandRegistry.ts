import { 
  FileText, Layers, Zap, Sliders, Shield, Award, Cloud, Home, 
  ShieldCheck, BookOpen, CreditCard, Settings, RefreshCw, LogOut,
  Terminal, Search, Cpu, HardDrive
} from "lucide-react";
import { NavigationRegistry } from "../../core/registry/NavigationRegistry";

export interface UEOSCommand {
  id: string;
  label: string;
  shortcut?: string;
  category: string;
  icon?: any;
  action: () => void;
  description?: string;
  contextRequired?: string;
}

export class UEOSCommandRegistry {
  private static baseCommands: Map<string, UEOSCommand> = new Map();
  private static dynamicContext: any = null;

  public static setContext(context: any): void {
    this.dynamicContext = context;
  }

  public static register(command: UEOSCommand): void {
    this.baseCommands.set(command.id, command);
  }

  public static getAll(): UEOSCommand[] {
    const commands = Array.from(this.baseCommands.values());
    
    // Dynamically inject contextual commands
    if (this.dynamicContext?.selectedJobId) {
      commands.push({
        id: `cmd-job-${this.dynamicContext.selectedJobId}-inspect`,
        label: `Inspect Requirements for ${this.dynamicContext.selectedJobId}`,
        category: "Dynamic Context",
        icon: Search,
        action: () => console.log('Inspect Job', this.dynamicContext.selectedJobId),
        description: "View specific artifacts for the active job"
      });
      commands.push({
        id: `cmd-job-${this.dynamicContext.selectedJobId}-verify`,
        label: `Verify Gates for ${this.dynamicContext.selectedJobId}`,
        category: "Dynamic Context",
        icon: ShieldCheck,
        action: () => console.log('Verify Job', this.dynamicContext.selectedJobId),
        description: "Execute assurance verification for the active job"
      });
    }

    return commands;
  }

  public static search(query: string): UEOSCommand[] {
    const all = this.getAll();
    if (!query || query.trim() === "") {
      return all;
    }
    const q = query.toLowerCase().trim();
    return all.filter(cmd => 
      cmd.label.toLowerCase().includes(q) || 
      cmd.category.toLowerCase().includes(q) ||
      (cmd.description && cmd.description.toLowerCase().includes(q)) ||
      cmd.id.toLowerCase().includes(q)
    );
  }

  public static execute(id: string): void {
    const cmd = this.getAll().find(c => c.id === id);
    if (cmd && typeof cmd.action === "function") {
      cmd.action();
    }
  }

  public static clear(): void {
    this.baseCommands.clear();
  }
}

export function initializeSovereignCommandRegistry(context: {
  navigate: (workspace: any) => void;
  toggleSidebar: () => void;
  openSettings: () => void;
  runTriggerAction: (actionId: string, params?: any) => void;
}): void {
  UEOSCommandRegistry.clear();

  // Navigation Commands generated from NavigationRegistry
  const navRegistry = NavigationRegistry.getInstance();
  const navItems = navRegistry.getNavigationItems();

  const navCommands: UEOSCommand[] = navItems.map(item => ({
    id: `cmd-nav-${item.id}`,
    label: `Navigate: ${item.title}`,
    category: "Navigation",
    icon: Layers,
    action: () => context.navigate(item.route),
    description: item.description
  }));

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
