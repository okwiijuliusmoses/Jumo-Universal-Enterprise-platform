// JUMO UEOS — Sovereign Command Operating Shell & Navigation Fabric
// Authoritative Sovereign Enterprise Platform Implementation

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Command, Users, Layers, Shield, Settings, LogOut, ChevronLeft, ChevronRight, 
  Menu, Search, X, ArrowLeft, ArrowRight, ArrowUp, Home, HelpCircle, Keyboard,
  Cloud, Zap, Database, BookOpen, ShieldCheck, Activity, CreditCard, School,
  GraduationCap, Church, DollarSign, Lock, BrainCircuit, Workflow, Landmark
} from "lucide-react";

import { SovereignProductDetailRenderer } from "../renderer/SovereignProductDetailRenderer";
import { FAAPRenderer } from "../renderer/FAAPRenderer";
import { DigitalPayRenderer } from "../renderer/DigitalPayRenderer";
import { SecurityRegistryRenderer } from "../renderer/SecurityRegistryRenderer";
import { AuditRenderer } from "../renderer/AuditRenderer";
import { AIGatewayRenderer } from "../renderer/AIGatewayRenderer";
import { WorkflowRegistryRenderer } from "../renderer/WorkflowRegistryRenderer";
import { InfrastructureRenderer } from "../renderer/InfrastructureRenderer";
import { LegalComplianceRenderer } from "../renderer/LegalComplianceRenderer";
import { SettingsRenderer } from "../renderer/SettingsRenderer";

import { initializeSovereignCommandRegistry, UEOSCommandRegistry, UEOSCommand } from "./UEOSCommandRegistry";
import { UEOSSettingsCenter, UEOSSettings } from "./UEOSSettingsCenter";
import { UEOSRightInspector } from "./UEOSRightInspector";
import { JumoFloatingAssistant } from "./JumoFloatingAssistant";

export type SovereignWorkspace =
  | "overview"
  | "products"
  | "fintech"
  | "nursery-primary"
  | "secondary-school"
  | "university"
  | "church"
  | "alumni"
  | "faap"
  | "digital-pay"
  | "aegis"
  | "treasury"
  | "digital-auditor"
  | "ai-hybrid"
  | "workflow"
  | "cloud"
  | "compliance"
  | "settings";

interface UEOSShellProps {
  user: {
    name: string;
    clearance: string;
    role: string;
    signatureKey?: string;
  };
  onLogout: () => void;
}

export function UEOSShell({ user, onLogout }: UEOSShellProps) {
  // === 1. BASIC SHELL STATES ===
  const [activeTab, setActiveTab] = useState<SovereignWorkspace>(() => {
    const saved = localStorage.getItem("jumo_ueos_active_workspace");
    const validWorkspaces: SovereignWorkspace[] = [
      "overview", "products", "fintech", "nursery-primary", "secondary-school",
      "university", "church", "alumni", "faap", "digital-pay", "aegis",
      "treasury", "digital-auditor", "ai-hybrid", "workflow", "cloud",
      "compliance", "settings"
    ];
    if (saved && validWorkspaces.includes(saved as SovereignWorkspace)) {
      return saved as SovereignWorkspace;
    }
    return "fintech";
  });

  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(() => {
    return localStorage.getItem("ueos_sidebar_collapsed") === "true";
  });

  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // === 2. NAVIGATION STACK STATES ===
  const [backStack, setBackStack] = useState<SovereignWorkspace[]>([]);
  const [forwardStack, setForwardStack] = useState<SovereignWorkspace[]>([]);

  // === 3. MODAL & DIALOG STATES ===
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [keyboardGuideOpen, setKeyboardGuideOpen] = useState(false);

  // === 4. GLOBAL PREFERENCES ===
  const [preferences, setPreferences] = useState<UEOSSettings>(() => {
    const saved = localStorage.getItem("jumo_ueos_settings_v1");
    if (saved) {
      try { return JSON.parse(saved); } catch {}
    }
    return {
      lightTheme: true,
      uiDensity: "comfortable",
      animationsEnabled: true,
      sidebarDefaultState: "expanded",
      defaultLandingWorkspace: "overview",
      rememberLastWorkspace: true,
      tableDensity: "comfortable",
      rememberedTabs: ["overview"],
      inspectorPosition: "side",
      notifyOps: true,
      notifySecurity: true,
      notifyDeploy: true,
      notifyAI: true,
      notifyMigration: true,
      sessionTimeoutMinutes: 60,
      rbacVisibility: true,
      requireSignatureKey: false,
      operatorIdentityName: user.name || "Sovereign Operator Alpha",
      refreshStrategy: "polling",
      realtimeConnectionEnabled: true,
      offlineSyncSchedule: "instant",
      keyboardNavActive: true,
      reducedMotion: false,
      focusIndicatorsEnabled: true
    };
  });

  // === 5. RIGHT INSPECTOR STATE ===
  const [inspectedEntity, setInspectedEntity] = useState<{
    type: "ecosystem" | "product" | "blueprint" | "agent" | "job";
    id: string;
    data: any;
  } | null>(null);

  // === 6. SEARCH & PALETTE RESULTS ===
  const [paletteSearchQuery, setPaletteSearchQuery] = useState("");
  const [paletteSelectedIndex, setPaletteSelectedIndex] = useState(0);

  // Refs for focus management
  const searchInputRef = useRef<HTMLInputElement>(null);
  const sidebarToggleRef = useRef<HTMLButtonElement>(null);

  // === 7. INITIALIZE COMMAND REGISTRY ===
  useEffect(() => {
    initializeSovereignCommandRegistry({
      navigate: (workspace: SovereignWorkspace) => navigateTo(workspace),
      toggleSidebar: () => setSidebarCollapsed(prev => {
        const next = !prev;
        localStorage.setItem("ueos_sidebar_collapsed", String(next));
        return next;
      }),
      openSettings: () => setSettingsOpen(true),
      runTriggerAction: (actionId: string, params?: any) => {
        console.log(`[ACTION_TRIGGER] Command execution: ${actionId}`, params);
      }
    });
  }, []);

  // === 8. NAVIGATION TRANSITION ENGINE ===
  const navigateTo = (workspace: SovereignWorkspace, isBackOrForward = false) => {
    if (workspace === activeTab) return;

    if (!isBackOrForward) {
      setForwardStack([]);
      setBackStack(prev => {
        if (prev.length > 0 && prev[prev.length - 1] === activeTab) return prev;
        return [...prev, activeTab];
      });
    }

    setActiveTab(workspace);
    localStorage.setItem("jumo_ueos_active_workspace", workspace);
    setMobileSidebarOpen(false);
  };

  const handleBack = () => {
    if (backStack.length === 0) return;
    const previous = backStack[backStack.length - 1];
    setBackStack(prev => prev.slice(0, -1));
    setForwardStack(prev => [...prev, activeTab]);
    navigateTo(previous, true);
  };

  const handleForward = () => {
    if (forwardStack.length === 0) return;
    const next = forwardStack[forwardStack.length - 1];
    setForwardStack(prev => prev.slice(0, -1));
    setBackStack(prev => [...prev, activeTab]);
    navigateTo(next, true);
  };

  const handleParent = () => {
    navigateTo("overview");
  };

  // === 9. UNIFIED KEYBOARD CONTROLLER ===
  useEffect(() => {
    if (!preferences.keyboardNavActive) return;

    const handleGlobalKeys = (e: KeyboardEvent) => {
      // 1. Command Palette Toggle (Ctrl + K or Cmd + K)
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setCommandPaletteOpen(prev => !prev);
        return;
      }

      // 2. Settings Toggle (Ctrl + ,)
      if ((e.ctrlKey || e.metaKey) && e.key === ",") {
        e.preventDefault();
        setSettingsOpen(prev => !prev);
        return;
      }

      // 3. Sidebar Toggle (Ctrl + B)
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "b") {
        e.preventDefault();
        setSidebarCollapsed(prev => {
          const next = !prev;
          localStorage.setItem("ueos_sidebar_collapsed", String(next));
          return next;
        });
        return;
      }

      // 4. Keyboard Shortcuts Guide (? or Shift + /)
      if (e.key === "?" && !commandPaletteOpen && document.activeElement?.tagName !== "INPUT" && document.activeElement?.tagName !== "TEXTAREA") {
        e.preventDefault();
        setKeyboardGuideOpen(prev => !prev);
        return;
      }

      // 5. Back Navigation (Alt + Left Arrow)
      if (e.altKey && e.key === "ArrowLeft") {
        e.preventDefault();
        handleBack();
        return;
      }

      // 6. Forward Navigation (Alt + Right Arrow)
      if (e.altKey && e.key === "ArrowRight") {
        e.preventDefault();
        handleForward();
        return;
      }

      // 7. Parent Workspace (Alt + Up Arrow)
      if (e.altKey && e.key === "ArrowUp") {
        e.preventDefault();
        handleParent();
        return;
      }

      // 8. Command Palette Search Keyboard Navigation
      if (commandPaletteOpen) {
        if (e.key === "Escape") {
          e.preventDefault();
          setCommandPaletteOpen(false);
          return;
        }

        const filtered = getFilteredPaletteItems();
        if (e.key === "ArrowDown") {
          e.preventDefault();
          setPaletteSelectedIndex(prev => (prev + 1) % (filtered.length || 1));
        } else if (e.key === "ArrowUp") {
          e.preventDefault();
          setPaletteSelectedIndex(prev => (prev - 1 + (filtered.length || 1)) % (filtered.length || 1));
        } else if (e.key === "Enter") {
          e.preventDefault();
          if (filtered[paletteSelectedIndex]) {
            handleSelectPaletteItem(filtered[paletteSelectedIndex]);
          }
        }
      }
    };

    window.addEventListener("keydown", handleGlobalKeys);
    return () => window.removeEventListener("keydown", handleGlobalKeys);
  }, [activeTab, backStack, forwardStack, commandPaletteOpen, paletteSelectedIndex, paletteSearchQuery, preferences]);

  // Focus Search Input on palette open
  useEffect(() => {
    if (commandPaletteOpen) {
      setPaletteSearchQuery("");
      setPaletteSelectedIndex(0);
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 50);
    }
  }, [commandPaletteOpen]);

  // === 10. SEARCH INDEX & INTEGRATIONS ===
  const getFilteredPaletteItems = () => {
    const commands = UEOSCommandRegistry.search(paletteSearchQuery);
    return commands.map((cmd: UEOSCommand) => ({
      id: cmd.id,
      name: cmd.label,
      type: `Command • ${cmd.category}`,
      status: "SYSTEM",
      workspace: cmd.category.toLowerCase(),
      icon: cmd.icon,
      isCommand: true,
      action: cmd.action
    }));
  };

  const handleSelectPaletteItem = (item: any) => {
    setCommandPaletteOpen(false);
    if (item.isCommand && item.action) {
      item.action();
    } else if (item.workspace) {
      navigateTo(item.workspace);
    }
  };

  const handleSaveSettings = (nextSettings: UEOSSettings) => {
    setPreferences(nextSettings);
  };

  // === 11. AUTHORITATIVE SOVEREIGN SIDEBAR GROUPS ===
  const sidebarGroups = [
    {
      id: "INDEPENDENT APPLICATIONS",
      items: [
        { id: "fintech" as SovereignWorkspace, label: "JUMO FINTECH SACCO", icon: Zap, color: "text-amber-500" },
        { id: "nursery-primary" as SovereignWorkspace, label: "Nursery & Primary ERP", icon: School, color: "text-emerald-500" },
        { id: "secondary-school" as SovereignWorkspace, label: "Secondary School ERP", icon: BookOpen, color: "text-blue-500" },
        { id: "university" as SovereignWorkspace, label: "University & Tertiary ERP", icon: GraduationCap, color: "text-purple-500" },
        { id: "church" as SovereignWorkspace, label: "Church & Faith ERP", icon: Church, color: "text-rose-500" },
        { id: "alumni" as SovereignWorkspace, label: "Alumni & Community ERP", icon: Users, color: "text-cyan-500" }
      ]
    },
    {
      id: "SHARED PLATFORMS",
      items: [
        { id: "faap" as SovereignWorkspace, label: "FAAP Double-Entry Ledger", icon: DollarSign, color: "text-emerald-600" },
        { id: "digital-pay" as SovereignWorkspace, label: "Digital Pay Switch", icon: CreditCard, color: "text-blue-600" },
        { id: "aegis" as SovereignWorkspace, label: "Aegis Zero-Trust Security", icon: Lock, color: "text-rose-600" },
        { id: "treasury" as SovereignWorkspace, label: "Treasury & Liquidity", icon: Landmark, color: "text-amber-600" },
        { id: "digital-auditor" as SovereignWorkspace, label: "Digital Forensic Auditor", icon: Shield, color: "text-teal-600" },
        { id: "ai-hybrid" as SovereignWorkspace, label: "AI Digital Hybrid Mesh", icon: BrainCircuit, color: "text-purple-600" },
        { id: "workflow" as SovereignWorkspace, label: "Workflow Engine", icon: Workflow, color: "text-sky-600" },
        { id: "cloud" as SovereignWorkspace, label: "Cloud & Compute Fabric", icon: Cloud, color: "text-slate-600" }
      ]
    },
    {
      id: "GOVERNANCE & SETTINGS",
      items: [
        { id: "compliance" as SovereignWorkspace, label: "Legal & Compliance", icon: ShieldCheck, color: "text-emerald-700" },
        { id: "settings" as SovereignWorkspace, label: "Settings & Preferences", icon: Settings, color: "text-slate-500" }
      ]
    }
  ];

  const compactStylesClass = preferences.uiDensity === "compact" ? "ueos-compact text-[11px]" : "";

  // === 12. WORKSPACE COMPONENT DISPATCHER ===
  const renderActiveWorkspace = () => {
    switch (activeTab) {
      case "overview":
      case "products":
        return (
          <div className="p-8 max-w-6xl mx-auto space-y-6">
            <div>
              <h1 className="text-2xl font-black text-slate-900 tracking-tight">Independent Sovereign Applications</h1>
              <p className="text-sm text-slate-500">Launch any of the standalone JUMO enterprise applications directly into its dedicated operating environment.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { id: "fintech", title: "JUMO FINTECH", category: "SACCO & Financial Services", icon: Zap, color: "from-amber-500 to-amber-700", badge: "Fintech", desc: "Dedicated financial operations, savings deposits, loan underwriting & FAAP double-entry ledger." },
                { id: "nursery-primary", title: "JUMO NURSERY & PRIMARY", category: "Early Education ERP", icon: School, color: "from-emerald-500 to-emerald-700", badge: "Primary", desc: "Pupil roster, daily attendance roll call, early literacy curriculum & term fee receipts." },
                { id: "secondary-school", title: "JUMO SECONDARY SCHOOL", category: "Secondary & Boarding ERP", icon: BookOpen, color: "from-blue-600 to-blue-800", badge: "Secondary", desc: "UNEB O & A-Level curriculum, boarding house management, science labs & exam analytics." },
                { id: "university", title: "JUMO UNIVERSITY & TERTIARY", category: "Higher Education ERP", icon: GraduationCap, color: "from-purple-600 to-purple-900", badge: "University", desc: "8 academic faculties, student registry, research grant tracker & Senate transcript certification." },
                { id: "church", title: "JUMO CHURCH & FAITH", category: "Ministry Operations ERP", icon: Church, color: "from-rose-600 to-rose-900", badge: "Ministry", desc: "Congregation directory, cell groups, weekly tithe & offering ledger & pastoral prayer queue." },
                { id: "alumni", title: "JUMO ALUMNI & COMMUNITY", category: "Alumni Network ERP", icon: Users, color: "from-cyan-600 to-cyan-900", badge: "Alumni", desc: "Global graduate search, regional chapters, endowment campaigns & employer degree verification." },
              ].map((app) => {
                const Icon = app.icon;
                return (
                  <button
                    key={app.id}
                    onClick={() => navigateTo(app.id as SovereignWorkspace)}
                    className="bg-white border border-slate-200 rounded-2xl p-6 text-left shadow-xs hover:shadow-lg hover:border-slate-300 transition-all cursor-pointer space-y-4 group"
                  >
                    <div className="flex items-center justify-between">
                      <div className={`w-12 h-12 bg-gradient-to-br ${app.color} text-white rounded-2xl flex items-center justify-center font-black shadow-md group-hover:scale-105 transition-transform`}>
                        <Icon className="w-6 h-6 stroke-[2.5]" />
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 bg-slate-100 text-slate-700 rounded-full">
                        {app.badge}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-extrabold text-base text-slate-900 group-hover:text-blue-600 transition-colors">{app.title}</h3>
                      <p className="text-xs text-slate-500 mt-1">{app.desc}</p>
                    </div>
                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-600">
                      <span>Launch Application</span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        );
      // 6 Sovereign Products
      case "fintech":
        return <SovereignProductDetailRenderer productId="prod-fintech" onBack={() => navigateTo("fintech")} onNavigateToPlatform={(p: string) => navigateTo(p as SovereignWorkspace)} />;
      case "nursery-primary":
        return <SovereignProductDetailRenderer productId="prod-nursery-primary" onBack={() => navigateTo("nursery-primary")} onNavigateToPlatform={(p: string) => navigateTo(p as SovereignWorkspace)} />;
      case "secondary-school":
        return <SovereignProductDetailRenderer productId="prod-secondary-school" onBack={() => navigateTo("secondary-school")} onNavigateToPlatform={(p: string) => navigateTo(p as SovereignWorkspace)} />;
      case "university":
        return <SovereignProductDetailRenderer productId="prod-university-tertiary" onBack={() => navigateTo("university")} onNavigateToPlatform={(p: string) => navigateTo(p as SovereignWorkspace)} />;
      case "church":
        return <SovereignProductDetailRenderer productId="prod-church-faith" onBack={() => navigateTo("church")} onNavigateToPlatform={(p: string) => navigateTo(p as SovereignWorkspace)} />;
      case "alumni":
        return <SovereignProductDetailRenderer productId="prod-alumni-community" onBack={() => navigateTo("alumni")} onNavigateToPlatform={(p: string) => navigateTo(p as SovereignWorkspace)} />;
      // 8 Independent Shared Platforms
      case "faap":
      case "treasury":
        return <FAAPRenderer />;
      case "digital-pay":
        return <DigitalPayRenderer />;
      case "aegis":
        return <SecurityRegistryRenderer />;
      case "digital-auditor":
        return <AuditRenderer incidents={[]} institutions={[]} />;
      case "ai-hybrid":
        return <AIGatewayRenderer />;
      case "workflow":
        return <WorkflowRegistryRenderer />;
      case "cloud":
        return <InfrastructureRenderer slots={[]} volumes={[]} />;
      case "compliance":
        return <LegalComplianceRenderer />;
      case "settings":
        return <SettingsRenderer />;
      default:
        return <SovereignProductDetailRenderer productId="prod-fintech" onBack={() => navigateTo("fintech")} onNavigateToPlatform={(p: string) => navigateTo(p as SovereignWorkspace)} />;
    }
  };

  return (
    <div 
      className={`min-h-screen bg-slate-50 flex flex-col font-sans transition-all duration-150 ${compactStylesClass}`} 
      id="ueos-shell-root"
    >
      {/* 1. TOP OPERATING NAV BAR */}
      <header className="bg-blue-950 text-white border-b border-blue-900 h-14 px-4 flex items-center justify-between sticky top-0 z-40 select-none shadow-md" id="ueos-shell-header">
        
        {/* Left Side: Navigation Keys & Toggles */}
        <div className="flex items-center gap-1.5 md:gap-3">
          
          {/* Mobile Rails Toggle */}
          <button
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className="p-1.5 rounded-lg hover:bg-blue-900 text-blue-200 md:hidden cursor-pointer"
            aria-label="Toggle Mobile Sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Core Navigation controls */}
          <div className="hidden md:flex items-center gap-1 bg-blue-900/40 p-0.5 rounded-xl border border-blue-800/50">
            <button
              onClick={handleBack}
              disabled={backStack.length === 0}
              className="p-1.5 rounded-lg text-blue-200 hover:text-white hover:bg-blue-800 transition-all disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer"
              title="Back (Alt + ←)"
              aria-label="Navigate Back"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleForward}
              disabled={forwardStack.length === 0}
              className="p-1.5 rounded-lg text-blue-200 hover:text-white hover:bg-blue-800 transition-all disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer"
              title="Forward (Alt + →)"
              aria-label="Navigate Forward"
            >
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleParent}
              className="p-1.5 rounded-lg text-blue-200 hover:text-white hover:bg-blue-800 transition-all cursor-pointer"
              title="Parent Workspace (Alt + ↑)"
              aria-label="Navigate to Parent"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => navigateTo("overview")}
              className={`p-1.5 rounded-lg text-blue-200 hover:text-white hover:bg-blue-800 transition-all cursor-pointer ${activeTab === "overview" ? "bg-blue-600 text-white shadow-xs" : ""}`}
              title="Sovereign Command Center"
              aria-label="Command Center Home"
            >
              <Home className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="h-4 w-px bg-blue-800 hidden md:block"></div>

          {/* Host brand identity */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigateTo("overview")}>
            <div className="w-7 h-7 bg-blue-600 text-white rounded-lg flex items-center justify-center font-black text-xs shadow-md shadow-blue-500/20">
              J
            </div>
            <div className="min-w-0">
              <span className="font-extrabold tracking-tight text-slate-100 text-xs block">JUMO UEOS</span>
              <span className="text-[8px] font-bold text-blue-400 uppercase tracking-widest block leading-none">Sovereign Enterprise Platform</span>
            </div>
          </div>
        </div>

        {/* Middle: Integrated Search Trigger Bar */}
        <div className="flex-1 max-w-md mx-4 lg:mx-8">
          <button
            onClick={() => setCommandPaletteOpen(true)}
            className="w-full h-9 bg-blue-900/40 hover:bg-blue-900/60 border border-blue-850/60 rounded-xl px-3 flex items-center justify-between text-blue-100 text-xs font-bold transition-all text-left cursor-pointer focus:outline-none focus:ring-1 focus:ring-blue-500"
            title="Search products and platforms (Ctrl + K)"
          >
            <div className="flex items-center gap-2">
              <Search className="w-3.5 h-3.5 text-blue-300" />
              <span className="text-blue-200">Search products, platforms, commands...</span>
            </div>
            <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 bg-blue-950 border border-blue-800 text-blue-300 font-bold rounded-lg text-[9px] shadow-2xs font-mono uppercase">
              Ctrl K
            </kbd>
          </button>
        </div>

        {/* Right Side: Keyboard Guide, Settings, and Identity */}
        <div className="flex items-center gap-2">
          
          {/* Keyboard Help Guide */}
          <button
            onClick={() => setKeyboardGuideOpen(true)}
            className="p-2 rounded-xl text-blue-300 hover:text-white hover:bg-blue-900/60 transition-all cursor-pointer"
            title="Keyboard Shortcuts (?)"
            aria-label="Keyboard Shortcuts"
          >
            <Keyboard className="w-4 h-4" />
          </button>

          {/* Settings Trigger */}
          <button
            onClick={() => setSettingsOpen(true)}
            className="p-2 rounded-xl text-blue-300 hover:text-white hover:bg-blue-900/60 transition-all cursor-pointer"
            title="Settings Center (Ctrl + ,)"
            aria-label="Settings Center"
          >
            <Settings className="w-4 h-4" />
          </button>

          <div className="h-4 w-px bg-blue-800"></div>

          {/* User profile dropdown pill */}
          <div className="flex items-center gap-2 pl-1">
            <div className="w-7 h-7 rounded-full bg-blue-800 flex items-center justify-center font-bold text-xs text-blue-100 border border-blue-600">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div className="hidden lg:block text-left">
              <span className="font-extrabold text-xs text-slate-100 block leading-tight truncate max-w-[120px]">
                {preferences.operatorIdentityName || user.name}
              </span>
              <span className="text-[8px] font-bold text-blue-300 uppercase block tracking-wider leading-none">
                {user.clearance} CLEARANCE
              </span>
            </div>
            <button
              onClick={onLogout}
              className="p-1.5 rounded-lg text-blue-300 hover:text-rose-300 hover:bg-blue-900/60 transition-all cursor-pointer ml-1"
              title="Logout session"
              aria-label="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>

        </div>

      </header>

      {/* 2. BODY CONTAINER: SIDEBAR + MAIN CANVAS */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* DESKTOP COLLAPSIBLE SIDEBAR */}
        <aside 
          className={`hidden md:flex flex-col bg-white border-r border-slate-200 transition-all duration-200 z-30 select-none ${
            sidebarCollapsed ? "w-16" : "w-64"
          }`}
          id="shell-desktop-sidebar"
        >
          <div className="flex-1 overflow-y-auto py-4 px-2 space-y-5">
            
            {/* Sidebar toggle button */}
            <div className={`flex justify-end pb-2 px-1 border-b border-slate-100 ${sidebarCollapsed ? "justify-center" : ""}`}>
              <button
                ref={sidebarToggleRef}
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 cursor-pointer transition-all focus:outline-none focus:ring-1 focus:ring-blue-500"
                title={sidebarCollapsed ? "Expand Sidebar (Ctrl + B)" : "Collapse Sidebar (Ctrl + B)"}
                aria-label={sidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
              >
                {sidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
              </button>
            </div>

            {/* Navigation Groups */}
            <div className="space-y-4">
              {sidebarGroups.map((group) => (
                <div key={group.id} className="space-y-1">
                  {!sidebarCollapsed ? (
                    <span className="text-[9px] font-black uppercase text-slate-400 tracking-widest px-3 block mb-1">
                      {group.id}
                    </span>
                  ) : (
                    <div className="w-full h-px bg-slate-100 my-2"></div>
                  )}

                  {group.items.map((item) => {
                    const isSelected = activeTab === item.id;
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        onClick={() => navigateTo(item.id)}
                        className={`w-full flex items-center gap-3 p-2 rounded-xl text-left text-xs font-bold transition-all cursor-pointer relative focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                          isSelected 
                            ? "bg-slate-100 text-slate-950" 
                            : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
                        }`}
                        title={`${item.label} (${sidebarCollapsed ? "Collapsed" : "Expanded"})`}
                        aria-label={item.label}
                      >
                        <Icon className={`w-4 h-4 shrink-0 ${item.color} ${isSelected ? "stroke-[2.5px]" : ""}`} />
                        {!sidebarCollapsed && <span className="truncate">{item.label}</span>}
                        
                        {isSelected && (
                          <motion.div 
                            layoutId="active-indicator"
                            className="absolute left-0 top-1/5 bottom-1/5 w-1 bg-blue-600 rounded-r"
                          />
                        )}
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>

          </div>

          {/* Mini system footprint at sidebar bottom */}
          <div className="p-3 border-t border-slate-100 bg-slate-50/50 text-center">
            <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest block">
              {!sidebarCollapsed ? "JUMO UEOS v6.0" : "V6"}
            </span>
          </div>
        </aside>

        {/* MOBILE SIDEBAR DRAWER (OVERLAY) */}
        <AnimatePresence>
          {mobileSidebarOpen && (
            <div className="fixed inset-0 z-50 flex md:hidden" id="mobile-sidebar-drawer">
              {/* Backdrop */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setMobileSidebarOpen(false)}
                className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs"
              />
              
              {/* Drawer Box */}
              <motion.div 
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "spring", bounce: 0, duration: 0.3 }}
                className="relative w-64 bg-white h-full flex flex-col justify-between py-5 px-3 z-50 border-r border-slate-200"
              >
                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 bg-slate-900 text-white rounded-lg flex items-center justify-center font-black text-xs">
                        J
                      </div>
                      <span className="font-extrabold text-xs text-slate-900">JUMO UEOS</span>
                    </div>
                    <button 
                      onClick={() => setMobileSidebarOpen(false)}
                      className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <nav className="space-y-4">
                    {sidebarGroups.map((group) => (
                      <div key={group.id} className="space-y-1">
                        <span className="text-[9px] font-black uppercase text-slate-400 tracking-wider px-2 block">
                          {group.id}
                        </span>
                        {group.items.map((item) => {
                          const isSelected = activeTab === item.id;
                          const Icon = item.icon;
                          return (
                            <button
                              key={item.id}
                              onClick={() => navigateTo(item.id)}
                              className={`w-full flex items-center gap-3 p-2.5 rounded-xl text-left text-xs font-bold transition-all cursor-pointer ${
                                isSelected 
                                  ? "bg-slate-100 text-slate-900" 
                                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
                              }`}
                            >
                              <Icon className={`w-4 h-4 shrink-0 ${item.color}`} />
                              <span>{item.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    ))}
                  </nav>
                </div>

                <div className="p-3 border-t border-slate-100 bg-slate-50 rounded-xl flex items-center justify-between">
                  <div>
                    <span className="font-extrabold text-[10px] text-slate-800 block truncate max-w-[120px]">
                      {preferences.operatorIdentityName || user.name}
                    </span>
                    <span className="text-[8px] text-slate-400 font-bold block uppercase">{user.clearance} clearance</span>
                  </div>
                  <button 
                    onClick={onLogout}
                    className="p-1.5 rounded bg-rose-50 text-rose-600 hover:bg-rose-100 cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* WORKSPACE CANVAS WRAPPER */}
        <div className="flex-1 flex overflow-hidden">
          
          {/* Main workspace scrollable area */}
          <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 max-w-7xl mx-auto" id="shell-main-workspace-canvas">
            {preferences.animationsEnabled ? (
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
              >
                {renderActiveWorkspace()}
              </motion.div>
            ) : (
              renderActiveWorkspace()
            )}
          </main>

          {/* RIGHT SIDE INSPECTOR PANEL */}
          <AnimatePresence>
            {inspectedEntity && (
              <div 
                className={`${
                  preferences.inspectorPosition === "side" 
                    ? "w-80 lg:w-96 shrink-0 relative hidden lg:block" 
                    : "fixed inset-y-14 right-0 z-40 w-80 lg:w-96"
                }`}
                id="ueos-right-inspector-drawer-host"
              >
                <UEOSRightInspector 
                  entity={inspectedEntity} 
                  onClose={() => setInspectedEntity(null)}
                  onTriggerAction={(actionId, payload) => console.log(`[ACTION] ${actionId}`, payload)}
                />
              </div>
            )}
          </AnimatePresence>

        </div>

      </div>

      {/* === 3. COMMAND PALETTE SEARCH DIALOG OVERLAY (Ctrl + K) === */}
      <AnimatePresence>
        {commandPaletteOpen && (
          <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-start justify-center z-50 pt-20 px-4" id="command-palette-backdrop">
            <motion.div 
              initial={{ opacity: 0, y: -20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.98 }}
              className="bg-white rounded-2xl border border-slate-200/80 shadow-2xl max-w-xl w-full flex flex-col overflow-hidden max-h-[480px]"
            >
              {/* Search inputs */}
              <div className="px-4 py-3.5 border-b border-slate-100 flex items-center gap-2">
                <Search className="w-5 h-5 text-slate-400 shrink-0" />
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Type a sovereign command, product name, or platform query..."
                  value={paletteSearchQuery}
                  onChange={(e) => {
                    setPaletteSearchQuery(e.target.value);
                    setPaletteSelectedIndex(0);
                  }}
                  className="w-full bg-transparent border-0 font-bold text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-0"
                />
                <button 
                  onClick={() => setCommandPaletteOpen(false)}
                  className="p-1 rounded-md hover:bg-slate-100 text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Indexed results list */}
              <div className="flex-1 overflow-y-auto py-2">
                {getFilteredPaletteItems().length > 0 ? (
                  <div className="space-y-1 px-2">
                    {getFilteredPaletteItems().map((item, idx) => {
                      const isSelected = idx === paletteSelectedIndex;
                      const ItemIcon = item.icon || Layers;
                      return (
                        <button
                          key={item.id + "-" + idx}
                          onClick={() => handleSelectPaletteItem(item)}
                          className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left text-xs transition-all cursor-pointer ${
                            isSelected 
                              ? "bg-blue-600 text-white font-black shadow-xs" 
                              : "hover:bg-slate-50 text-slate-700 font-bold"
                          }`}
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <ItemIcon className={`w-4 h-4 shrink-0 ${isSelected ? "text-white" : "text-slate-400"}`} />
                            <span className="truncate">{item.name}</span>
                          </div>
                          <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full shrink-0 ml-2 ${
                            isSelected ? "bg-blue-700 text-white" : "bg-slate-100 text-slate-500"
                          }`}>
                            {item.type}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  <div className="p-8 text-center text-slate-400 text-xs font-bold">
                    No matching commands or resources found.
                  </div>
                )}
              </div>

              {/* Footer guide */}
              <div className="p-2.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[9px] font-bold text-slate-400 px-4">
                <span>Use <kbd className="font-mono bg-white px-1 py-0.5 rounded border border-slate-200">↑</kbd> <kbd className="font-mono bg-white px-1 py-0.5 rounded border border-slate-200">↓</kbd> to navigate</span>
                <span>Press <kbd className="font-mono bg-white px-1 py-0.5 rounded border border-slate-200">Enter</kbd> to execute</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* === 4. KEYBOARD SHORTCUTS GUIDE MODAL (?) === */}
      <AnimatePresence>
        {keyboardGuideOpen && (
          <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center z-50 p-4" id="keyboard-guide-backdrop">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-lg w-full p-6 space-y-6"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2">
                  <Keyboard className="w-5 h-5 text-blue-600" />
                  <h3 className="font-black text-slate-900 text-base">Sovereign Keyboard Shortcuts</h3>
                </div>
                <button 
                  onClick={() => setKeyboardGuideOpen(false)}
                  className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                {[
                  { key: "Ctrl + K", desc: "Open Command Palette" },
                  { key: "Ctrl + ,", desc: "Open Settings Center" },
                  { key: "Ctrl + B", desc: "Toggle Sidebar Expansion" },
                  { key: "?", desc: "Open Shortcuts Reference" },
                  { key: "Alt + ←", desc: "Navigate Back in History" },
                  { key: "Alt + →", desc: "Navigate Forward in History" },
                  { key: "Alt + ↑", desc: "Jump to Kernel Overview" },
                  { key: "Escape", desc: "Dismiss Open Modal/Drawer" }
                ].map((sc, i) => (
                  <div key={i} className="p-3 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
                    <kbd className="font-mono text-[10px] font-black text-blue-700 bg-white px-2 py-0.5 rounded border border-slate-200 inline-block shadow-2xs">
                      {sc.key}
                    </kbd>
                    <p className="text-[11px] font-bold text-slate-600">{sc.desc}</p>
                  </div>
                ))}
              </div>

              <div className="text-center pt-2">
                <button
                  onClick={() => setKeyboardGuideOpen(false)}
                  className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-all cursor-pointer"
                >
                  Close Guide
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* === 5. SETTINGS CENTER DIALOG (Ctrl + ,) === */}
      <UEOSSettingsCenter
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        settings={preferences}
        onSave={handleSaveSettings}
      />

      {/* === 6. FLOATING COGNITIVE ASSISTANT === */}
      <JumoFloatingAssistant 
        currentWorkspace={activeTab}
        onCommandAction={(actionId) => {
          if (actionId.startsWith("nav:")) {
            const target = actionId.replace("nav:", "") as SovereignWorkspace;
            navigateTo(target);
          }
        }}
      />

    </div>
  );
}
