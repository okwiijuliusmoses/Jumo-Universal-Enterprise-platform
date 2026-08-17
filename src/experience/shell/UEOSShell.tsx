// JUMO UEOS — Sovereign Command Operating Shell & Navigation Fabric
// Phase 6 Authoritative Implementation

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Command, Cpu, FileText, Users, Server, Layers, CheckSquare, Globe, 
  RefreshCw, Shield, History, Settings, LogOut, ChevronLeft, ChevronRight, 
  User, Key, Menu, Search, X, Sliders, ArrowLeft, ArrowRight, ArrowUp, Home, HelpCircle, Keyboard,
  Edit3, Hexagon, Code, Award, Copy, Box, Cloud, Terminal, Briefcase, FlaskConical, Zap, Database, BookOpen,
  ShieldCheck, Activity, RefreshCcw, CreditCard, Wrench, Bot, Landmark, Boxes, Building2, DollarSign, Lock
} from "lucide-react";
import { NationalManufacturingHub, HubWorkspace } from "../renderer/NationalManufacturingHub";
import { UniversalHubRegistry } from "../../core/factory/registry/UniversalHubRegistry";
import { JumoAIAgentRegistry } from "../../core/ai/registry/JumoAIAgentRegistry";
import { JumoStudioRegistry, JUMO_STUDIO_REGISTRY } from "../../core/hub/studios/JumoStudioRegistry";
import { initializeSovereignCommandRegistry, UEOSCommandRegistry, UEOSCommand } from "./UEOSCommandRegistry";
import { UEOSSettingsCenter, UEOSSettings } from "./UEOSSettingsCenter";
import { UEOSRightInspector } from "./UEOSRightInspector";
import { JumoFloatingAssistant } from "./JumoFloatingAssistant";
import { JobNavigationProvider, useJobNavigation } from "./JobNavigationContext";
import { JobTreeProvider } from "./JobTreeProvider";
import { NavigationRegistry } from "../../core/registry/NavigationRegistry";

interface UEOSShellProps {
  user: {
    name: string;
    clearance: string;
    role: string;
    signatureKey?: string;
  };
  onLogout: () => void;
}

export function UEOSShell(props: UEOSShellProps) {
  return (
    <JobNavigationProvider>
      <JobTreeProvider>
        <UEOSShellContent {...props} />
      </JobTreeProvider>
    </JobNavigationProvider>
  );
}

function UEOSShellContent({ user, onLogout }: UEOSShellProps) {
  const { jobs, selectedJobId, setSelectedJobId } = useJobNavigation();

  useEffect(() => {
    UEOSCommandRegistry.setContext({ selectedJobId });
  }, [selectedJobId]);

  // === 1. BASIC SHELL STATES ===
  const [activeTab, setActiveTab] = useState<HubWorkspace>(() => {
    const saved = localStorage.getItem("jumo_ueos_active_workspace");
    return (saved as HubWorkspace) || "overview";
  });

  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(() => {
    return localStorage.getItem("ueos_sidebar_collapsed") === "true";
  });

  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // === 2. NAVIGATION STACK STATES ===
  const [backStack, setBackStack] = useState<HubWorkspace[]>([]);
  const [forwardStack, setForwardStack] = useState<HubWorkspace[]>([]);

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
      navigate: (workspace: HubWorkspace) => navigateTo(workspace),
      toggleSidebar: () => setSidebarCollapsed(prev => {
        const next = !prev;
        localStorage.setItem("ueos_sidebar_collapsed", String(next));
        return next;
      }),
      openSettings: () => setSettingsOpen(true),
      runTriggerAction: (actionId: string, params?: any) => {
        // Bubble up custom administrative commands to the Inspector
        console.log(`[ACTION_TRIGGER] Command execution: ${actionId}`, params);
        if (actionId === "verify-hashes") {
          // Deep link into verification
          setInspectedEntity(null);
        }
      }
    });
  }, []);

  // === 8. NAVIGATION TRANSITION ENGINE ===
  const navigateTo = (workspace: HubWorkspace, isBackOrForward = false) => {
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
    navigateTo("spec-arch-eng" as HubWorkspace);
  };

  // === 9. UNIFIED KEYBOARD CONTROLLER ===
  useEffect(() => {
    const handleGlobalKeys = (e: KeyboardEvent) => {
      if (!preferences.keyboardNavActive) return;

      const activeEl = document.activeElement;
      const isInputActive = activeEl && (
        activeEl.tagName.toLowerCase() === "input" || 
        activeEl.tagName.toLowerCase() === "textarea" ||
        activeEl.getAttribute("contenteditable") === "true"
      );

      // ESC key works globally to clear focus and dismiss modals
      if (e.key === "Escape") {
        e.preventDefault();
        setCommandPaletteOpen(false);
        setSettingsOpen(false);
        setInspectedEntity(null);
        setKeyboardGuideOpen(false);
        if (isInputActive) (activeEl as HTMLElement).blur();
        return;
      }

      // Block shortcuts while typing in forms
      if (isInputActive) {
        // Inside the search palette input, capture ArrowDown, ArrowUp, and Enter keys
        if (commandPaletteOpen && activeEl === searchInputRef.current) {
          const itemsCount = getFilteredPaletteItems().length;
          if (e.key === "ArrowDown") {
            e.preventDefault();
            setPaletteSelectedIndex(prev => (prev + 1) % itemsCount);
          } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setPaletteSelectedIndex(prev => (prev - 1 + itemsCount) % itemsCount);
          } else if (e.key === "Enter") {
            e.preventDefault();
            const items = getFilteredPaletteItems();
            if (items[paletteSelectedIndex]) {
              handleSelectPaletteItem(items[paletteSelectedIndex]);
            }
          }
        }
        return;
      }

      // Alt combinations for navigation
      if (e.altKey) {
        if (e.key === "ArrowLeft") {
          e.preventDefault();
          handleBack();
        } else if (e.key === "ArrowRight") {
          e.preventDefault();
          handleForward();
        } else if (e.key === "ArrowUp") {
          e.preventDefault();
          handleParent();
        }
      }

      // Ctrl / Cmd combinations
      if (e.ctrlKey || e.metaKey) {
        if (e.key.toLowerCase() === "b") {
          e.preventDefault();
          setSidebarCollapsed(prev => {
            const next = !prev;
            localStorage.setItem("ueos_sidebar_collapsed", String(next));
            return next;
          });
        } else if (e.key.toLowerCase() === "k") {
          e.preventDefault();
          setCommandPaletteOpen(prev => !prev);
        } else if (e.key === ",") {
          e.preventDefault();
          setSettingsOpen(prev => !prev);
        } else if (e.key === "/") {
          e.preventDefault();
          setKeyboardGuideOpen(prev => !prev);
        } else if (e.key.toLowerCase() === "f") {
          e.preventDefault();
          setCommandPaletteOpen(true);
        }
      }

      // General utility keys
      if (e.key === "Home") {
        window.scrollTo({ top: 0, behavior: preferences.reducedMotion ? "auto" : "smooth" });
      } else if (e.key === "End") {
        window.scrollTo({ top: document.body.scrollHeight, behavior: preferences.reducedMotion ? "auto" : "smooth" });
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
    const q = paletteSearchQuery.toLowerCase().trim();
    const results: any[] = [];

    // Index Commands
    const commands = UEOSCommandRegistry.search(paletteSearchQuery);
    commands.forEach((cmd: UEOSCommand) => {
      results.push({
        id: cmd.id,
        name: cmd.label,
        type: `Command • ${cmd.category}`,
        status: "SYSTEM",
        workspace: cmd.category.toLowerCase(),
        icon: cmd.icon,
        isCommand: true,
        action: cmd.action
      });
    });

    // Index Jobs
    jobs.forEach((j) => {
      if (!q || j.id.toLowerCase().includes(q) || (j.productName && j.productName.toLowerCase().includes(q))) {
        results.push({
          id: j.id,
          name: j.productName || `Job ${j.id}`,
          type: `Manufacturing Job • Stage ${j.currentManufacturingStage || 1}`,
          status: j.status || "ACTIVE",
          workspace: "factory",
          icon: Zap,
          isJob: true,
          data: j
        });
      }
    });

    return results;
  };

  const handleSelectPaletteItem = (item: any) => {
    setCommandPaletteOpen(false);
    if (item.isCommand) {
      item.action();
    } else if (item.isJob) {
      setSelectedJobId(item.id);
      navigateTo("factory");
    } else {
      // It's a registry resource item — navigate to workspace and open in Right Inspector!
      navigateTo(item.workspace);
      setInspectedEntity({
        type: item.entityType,
        id: item.id,
        data: item.data
      });
    }
  };

  const handleSaveSettings = (nextSettings: UEOSSettings) => {
    setPreferences(nextSettings);
  };

  // === 11. SIDEBAR NAVIGATION GROUPS (CONSOLIDATED TO EXACTLY THREE MASTER STUDIOS) ===
  const getCategoryOfTab = (tab: HubWorkspace): string => {
    switch (tab) {
      case 'specification':
      case 'architecture':
      case 'arch-verification':
      case 'engineering':
      case 'templates':
      case 'spec-arch-eng' as HubWorkspace:
        return 'STUDIO_1';

      case 'factory':
      case 'manufacturing':
      case 'assurance':
      case 'verification':
      case 'certification':
      case 'job-review':
      case 'mfg-ver-cert' as HubWorkspace:
        return 'STUDIO_2';

      default:
        return 'STUDIO_3';
    }
  };

  const [expandedCategory, setExpandedCategory] = useState<string | null>(() => {
    return getCategoryOfTab(activeTab);
  });

  useEffect(() => {
    setExpandedCategory(getCategoryOfTab(activeTab));
  }, [activeTab]);

  const navigationRegistry = NavigationRegistry.getInstance();
  const rawItems = navigationRegistry.getNavigationItems();

  const categories = [
    {
      id: "STUDIO_1",
      label: "1. SPEC & ARCHITECTURE",
      icon: FileText,
      color: "text-indigo-600",
      items: rawItems.filter(i => i.studio === 'STUDIO_1').map(i => ({
        id: i.route as HubWorkspace,
        label: i.title,
        description: i.description,
        icon: FileText,
        color: "text-indigo-600"
      }))
    },
    {
      id: "STUDIO_2",
      label: "2. MFG & VERIFICATION",
      icon: Zap,
      color: "text-emerald-600",
      items: rawItems.filter(i => i.studio === 'STUDIO_2').map(i => ({
        id: i.route as HubWorkspace,
        label: i.title,
        description: i.description,
        icon: Zap,
        color: "text-emerald-600"
      }))
    },
    {
      id: "STUDIO_3",
      label: "3. INST & DEPLOYMENT",
      icon: Globe,
      color: "text-indigo-600",
      items: rawItems.filter(i => i.studio === 'STUDIO_3').map(i => ({
        id: i.route as HubWorkspace,
        label: i.title,
        description: i.description,
        icon: Globe,
        color: "text-indigo-600"
      }))
    }
  ];

  const handleInspectorTriggerAction = (actionId: string, payload: any) => {
    console.log(`[INSPECTOR_ACTION] Intercepted in shell: ${actionId}`, payload);
  };

  // Apply compact scale classes
  const compactStylesClass = preferences.uiDensity === "compact" ? "ueos-compact text-[11px]" : "";

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
          </div>

          <div className="h-4 w-px bg-blue-800 hidden md:block"></div>

          {/* Host brand identity */}
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-blue-600 text-white rounded-lg flex items-center justify-center font-black text-xs shadow-md shadow-blue-500/20">
              J
            </div>
            <div className="min-w-0">
              <span className="font-extrabold tracking-tight text-slate-100 text-xs block">JUMO UEOS</span>
              <span className="text-[8px] font-bold text-blue-400 uppercase tracking-widest block leading-none">Sovereign Command</span>
            </div>
          </div>
        </div>

        {/* Middle: Integrated Search Trigger Bar */}
        <div className="flex-1 max-w-md mx-4 lg:mx-8">
          <button
            onClick={() => setCommandPaletteOpen(true)}
            className="w-full h-9 bg-blue-900/40 hover:bg-blue-900/60 border border-blue-850/60 rounded-xl px-3 flex items-center justify-between text-blue-100 text-xs font-bold transition-all text-left cursor-pointer focus:outline-none focus:ring-1 focus:ring-blue-500"
            title="Search registries and commands (Ctrl + K)"
          >
            <div className="flex items-center gap-2">
              <Search className="w-3.5 h-3.5 text-blue-300" />
              <span className="text-blue-200">Search ecosystems, products, commands...</span>
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
            className="p-2 rounded-xl text-blue-200 hover:text-white hover:bg-blue-900/50 cursor-pointer transition-colors"
            title="Keyboard Shortcuts Guide (Ctrl + /)"
            aria-label="Shortcuts Help"
          >
            <Keyboard className="w-4 h-4" />
          </button>

          {/* Unified Settings Gear */}
          <button
            onClick={() => setSettingsOpen(true)}
            className={`p-2 rounded-xl text-blue-200 hover:text-white hover:bg-blue-900/50 cursor-pointer transition-colors ${settingsOpen ? "bg-blue-900 text-white" : ""}`}
            title="Settings Center (Ctrl + ,)"
            aria-label="Platform Settings"
          >
            <Settings className="w-4 h-4" />
          </button>

          <div className="h-4 w-px bg-blue-800"></div>

          {/* Authorized Identity Label */}
          <div className="flex items-center gap-2">
            <div className="hidden lg:block text-right">
              <span className="font-extrabold text-[10px] text-blue-50 block truncate max-w-[150px]">
                {preferences.operatorIdentityName || user.name}
              </span>
              <span className="text-[8px] text-blue-400 font-black block uppercase tracking-wider leading-none">
                {user.clearance} clearance
              </span>
            </div>
            <button
              onClick={onLogout}
              className="p-2 rounded-xl text-blue-200 hover:text-rose-400 hover:bg-blue-900/50 cursor-pointer transition-all"
              title="Secure Logout"
              aria-label="Secure Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>

        </div>
      </header>

      {/* 2. MAIN CORE LAYOUT FRAME */}
      <div className="flex-1 flex overflow-hidden relative">

        {/* LEFT COMMAND SIDEBAR — COLLAPSIBLE & RESPONSIVE */}
        <aside 
          className={`bg-white border-r border-slate-200/80 flex flex-col justify-between transition-all duration-200 shrink-0 hidden md:flex ${
            sidebarCollapsed ? "w-16" : "w-64"
          }`}
          id="shell-desktop-sidebar"
        >
          <div className="flex-1 overflow-y-auto py-4 px-2 space-y-5">
            
            {/* Sidebar toggle button (Mandatory) */}
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
            <div className="space-y-3">
              {categories.map((group) => {
                const isGroupExpanded = expandedCategory === group.id;
                const GroupIcon = group.icon;
                return (
                  <div key={group.id} className="space-y-1">
                    {!sidebarCollapsed ? (
                      <button
                        onClick={() => setExpandedCategory(isGroupExpanded ? null : group.id)}
                        className="w-full flex items-center justify-between px-3 py-1.5 text-[10px] font-black uppercase text-slate-400 tracking-wider hover:text-slate-700 cursor-pointer transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <GroupIcon className={`w-4 h-4 ${group.color}`} />
                          <span>{group.label}</span>
                        </div>
                        <span className="text-[8px] font-bold text-slate-300">
                          {isGroupExpanded ? "▼" : "►"}
                        </span>
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          setSidebarCollapsed(false);
                          setExpandedCategory(group.id);
                        }}
                        className="w-full flex justify-center py-2 text-slate-400 hover:text-slate-700 transition-colors"
                        title={group.label}
                      >
                        <GroupIcon className={`w-5 h-5 ${group.color}`} />
                      </button>
                    )}

                    {/* Render child items if group is expanded and sidebar is expanded */}
                    {!sidebarCollapsed && isGroupExpanded && (
                      <div className="pl-3 space-y-1 pt-1 border-l border-slate-100 ml-5">
                        {group.items.map((item) => {
                          const isSelected = activeTab === item.id;
                          const ItemIcon = item.icon;
                          return (
                            <button
                              key={item.id}
                              onClick={() => navigateTo(item.id)}
                              className={`w-full flex items-center gap-3 p-2 rounded-xl text-left text-xs font-bold transition-all cursor-pointer relative focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                                isSelected 
                                  ? "bg-slate-100 text-slate-950" 
                                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
                              }`}
                              title={item.description}
                            >
                              <ItemIcon className={`w-4 h-4 shrink-0 ${item.color} ${isSelected ? "stroke-[2.5px]" : ""}`} />
                              <span className="truncate">{item.label}</span>
                              {isSelected && (
                                <motion.div 
                                  layoutId="active-indicator"
                                  className="absolute left-0 top-[20%] bottom-[20%] w-1 bg-blue-600 rounded-r"
                                />
                              )}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

          </div>

          {/* Mini system footprint at sidebar bottom */}
          <div className="p-3 border-t border-slate-100 bg-slate-50/50 text-center">
            <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest block">
              {!sidebarCollapsed ? "JUMO CORE v6" : "V6"}
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
                    {categories.map((group) => {
                      const isGroupExpanded = expandedCategory === group.id;
                      const GroupIcon = group.icon;
                      return (
                        <div key={group.id} className="space-y-1">
                          <button
                            onClick={() => setExpandedCategory(isGroupExpanded ? null : group.id)}
                            className="w-full flex items-center justify-between px-2 py-1.5 text-[10px] font-black uppercase text-slate-400 tracking-wider hover:text-slate-700 cursor-pointer"
                          >
                            <div className="flex items-center gap-1.5">
                              <GroupIcon className={`w-3.5 h-3.5 ${group.color}`} />
                              <span>{group.label}</span>
                            </div>
                            <span>{isGroupExpanded ? "▼" : "►"}</span>
                          </button>
                          
                          {isGroupExpanded && (
                            <div className="pl-3 space-y-1 pt-1 border-l border-slate-100 ml-3">
                              {group.items.map((item) => {
                                const isSelected = activeTab === item.id;
                                const ItemIcon = item.icon;
                                return (
                                  <button
                                    key={item.id}
                                    onClick={() => {
                                      navigateTo(item.id);
                                      setMobileSidebarOpen(false);
                                    }}
                                    className={`w-full flex items-center gap-3 p-2 rounded-xl text-left text-xs font-bold transition-all cursor-pointer ${
                                      isSelected 
                                        ? "bg-slate-100 text-slate-900" 
                                        : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
                                    }`}
                                  >
                                    <ItemIcon className={`w-4 h-4 shrink-0 ${item.color}`} />
                                    <span>{item.label}</span>
                                  </button>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      );
                    })}
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

        {/* WORKSPACE CANVAS WRAPPER — INTEGRATED RIGHT INSPECTOR splitscreen */}
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
                <NationalManufacturingHub 
                  activeWorkspace={activeTab} 
                  onNavigate={(ws) => navigateTo(ws)}
                />
              </motion.div>
            ) : (
              <NationalManufacturingHub 
                activeWorkspace={activeTab} 
                onNavigate={(ws) => navigateTo(ws)}
              />
            )}
          </main>

          {/* RIGHT SIDE INSPECTOR PANEL — SLIDES IN OR SPLITS DYNAMICALLY */}
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
                  onTriggerAction={handleInspectorTriggerAction}
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
                  placeholder="Type a sovereign command or registry query..."
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
                              ? "bg-slate-100 text-slate-900" 
                              : "hover:bg-slate-50/60 text-slate-600"
                          }`}
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <div className={`p-1.5 rounded-lg ${isSelected ? "bg-white text-slate-900 shadow-2xs" : "bg-slate-50 text-slate-400"}`}>
                              <ItemIcon className="w-3.5 h-3.5" />
                            </div>
                            <div className="min-w-0">
                              <span className="font-extrabold text-slate-800 block truncate">{item.name}</span>
                              <span className="text-[9px] text-slate-400 font-bold block uppercase">{item.type}</span>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-1.5 shrink-0">
                            <span className={`text-[9px] font-black px-2 py-0.5 rounded-md border ${
                              item.status === "OPERATIONAL" || item.status === "OK" || item.status === "SYSTEM"
                                ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                                : item.status === "EXEC"
                                ? "bg-blue-50 text-blue-700 border-blue-100"
                                : "bg-slate-100 text-slate-500 border-slate-200"
                            }`}>
                              {item.status}
                            </span>
                            {isSelected && (
                              <span className="text-[10px] text-slate-400 font-bold font-mono">↵ Enter</span>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  <div className="p-12 text-center text-slate-400">
                    <HelpCircle className="w-8 h-8 mx-auto text-slate-300 mb-2" />
                    <span className="text-xs font-bold block">No commands or registry results found</span>
                    <span className="text-[10px] text-slate-400 block mt-1">Try searching for "deploy", "sacco", "verify", or "identity"</span>
                  </div>
                )}
              </div>

              {/* Palette footer */}
              <div className="px-4 py-2 bg-slate-50 border-t border-slate-100 flex justify-between text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                <span>Use ↑↓ arrows to navigate</span>
                <span>ESC to close</span>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* === 4. CONSOLIDATED SETTINGS CENTER DIALOG (Ctrl + ,) === */}
      <UEOSSettingsCenter 
        isOpen={settingsOpen} 
        onClose={() => setSettingsOpen(false)}
        onSave={handleSaveSettings}
      />

      {/* === 5. KEYBOARD SHORTCUTS GUIDE OVERLAY (Ctrl + /) === */}
      <AnimatePresence>
        {keyboardGuideOpen && (
          <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center z-50 p-4" id="keyboard-guide-overlay">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl border border-slate-200/80 shadow-2xl max-w-md w-full p-6 space-y-5"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <Keyboard className="w-5 h-5 text-slate-800" />
                  <div>
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-wider">UEOS Shortcut Registry</h3>
                    <p className="text-[10px] text-slate-400 font-bold leading-none mt-0.5">Sovereign keyboard commander</p>
                  </div>
                </div>
                <button 
                  onClick={() => setKeyboardGuideOpen(false)}
                  className="p-1 rounded hover:bg-slate-100 text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-3.5 text-xs text-slate-600">
                <div className="flex justify-between items-center border-b border-slate-100 pb-1.5">
                  <span className="font-semibold">Navigate Back</span>
                  <kbd className="px-2 py-0.5 bg-slate-100 border border-slate-200 text-slate-700 font-extrabold text-[10px] rounded-md font-mono uppercase">Alt + ←</kbd>
                </div>
                <div className="flex justify-between items-center border-b border-slate-100 pb-1.5">
                  <span className="font-semibold">Navigate Forward</span>
                  <kbd className="px-2 py-0.5 bg-slate-100 border border-slate-200 text-slate-700 font-extrabold text-[10px] rounded-md font-mono uppercase">Alt + →</kbd>
                </div>
                <div className="flex justify-between items-center border-b border-slate-100 pb-1.5">
                  <span className="font-semibold">Parent Workspace (Command Center)</span>
                  <kbd className="px-2 py-0.5 bg-slate-100 border border-slate-200 text-slate-700 font-extrabold text-[10px] rounded-md font-mono uppercase">Alt + ↑</kbd>
                </div>
                <div className="flex justify-between items-center border-b border-slate-100 pb-1.5">
                  <span className="font-semibold">Search / Open Command Palette</span>
                  <kbd className="px-2 py-0.5 bg-slate-100 border border-slate-200 text-slate-700 font-extrabold text-[10px] rounded-md font-mono uppercase">Ctrl + K</kbd>
                </div>
                <div className="flex justify-between items-center border-b border-slate-100 pb-1.5">
                  <span className="font-semibold">Open Settings Center</span>
                  <kbd className="px-2 py-0.5 bg-slate-100 border border-slate-200 text-slate-700 font-extrabold text-[10px] rounded-md font-mono uppercase">Ctrl + ,</kbd>
                </div>
                <div className="flex justify-between items-center border-b border-slate-100 pb-1.5">
                  <span className="font-semibold">Toggle Sidebar Rail</span>
                  <kbd className="px-2 py-0.5 bg-slate-100 border border-slate-200 text-slate-700 font-extrabold text-[10px] rounded-md font-mono uppercase">Ctrl + B</kbd>
                </div>
                <div className="flex justify-between items-center border-b border-slate-100 pb-1.5">
                  <span className="font-semibold">Toggle This Shortcuts Guide</span>
                  <kbd className="px-2 py-0.5 bg-slate-100 border border-slate-200 text-slate-700 font-extrabold text-[10px] rounded-md font-mono uppercase">Ctrl + /</kbd>
                </div>
                <div className="flex justify-between items-center pb-1">
                  <span className="font-semibold">Dismiss overlay / modal / inspector</span>
                  <kbd className="px-2 py-0.5 bg-slate-100 border border-slate-200 text-slate-700 font-extrabold text-[10px] rounded-md font-mono uppercase">Esc</kbd>
                </div>
              </div>

              <div className="p-3 bg-blue-50/50 border border-blue-100 rounded-xl text-[10px] text-blue-700 font-semibold leading-relaxed">
                Note: Keyboard shortcut captures are bypassed automatically when entering text fields, inputs, or content editable consoles.
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <JumoFloatingAssistant activeStudio={activeTab} />

    </div>
  );
}
