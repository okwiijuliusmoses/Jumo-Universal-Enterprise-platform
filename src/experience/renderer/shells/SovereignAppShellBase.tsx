import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Building2, Users, FileText, Database, Shield, Activity, Settings, 
  LayoutDashboard, Globe, ChevronRight, Workflow, BrainCircuit, BarChart, 
  ArrowLeft, CheckCircle2, AlertCircle, Send, Plus, Search, Eye, 
  Layers, Lock, CreditCard, School, BookOpen, GraduationCap, Church,
  Check, Sparkles, Filter, RefreshCw, Bell, Landmark, Zap, ShieldCheck,
  UserCheck, Award, TrendingUp, CheckSquare, Compass, LucideIcon, DollarSign
} from "lucide-react";
import { 
  JumoAuthoritativeProductManifest,
  JumoDirectorateManifest,
  JumoDepartmentManifest,
  JumoOfficeManifest,
  JumoPortalManifest,
  JumoModuleManifest
} from "../../../core/specification/manifests/types";

export interface SovereignAppShellBaseProps {
  manifest: JumoAuthoritativeProductManifest;
  productIcon: LucideIcon;
  themeColor: "amber" | "emerald" | "blue" | "purple" | "rose" | "cyan";
  onBack: () => void;
  onNavigateToPlatform?: (platformId: string) => void;
}

export function SovereignAppShellBase({
  manifest,
  productIcon: ProductIcon,
  themeColor,
  onBack,
  onNavigateToPlatform
}: SovereignAppShellBaseProps) {
  // Navigation & View States
  const [activeTab, setActiveTab] = useState<"app_home" | "directorates" | "offices" | "portals" | "modules" | "faap_sync" | "ai_copilot">("app_home");
  const [selectedDirectorateId, setSelectedDirectorateId] = useState<string>(manifest.directorates?.[0]?.id || "");
  const [selectedDepartmentId, setSelectedDepartmentId] = useState<string>(manifest.departments?.[0]?.id || "");
  const [selectedOfficeId, setSelectedOfficeId] = useState<string>(manifest.offices?.[0]?.id || "");
  const [selectedPortalId, setSelectedPortalId] = useState<string>(manifest.portals?.[0]?.id || "");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDepartmentFilter, setSelectedDepartmentFilter] = useState<string>("ALL");
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  // Live Audit Stream
  const [actionLogs, setActionLogs] = useState<Array<{ id: string; time: string; text: string; status: string }>>([
    { id: "LOG-01", time: "Just now", text: `Instance handshake verified with JUMO AEGIS HSM Keyring.`, status: "COMPLETED" },
    { id: "LOG-02", time: "2 min ago", text: `FAAP Ledger double-entry zero-variance parity confirmed.`, status: "COMPLETED" }
  ]);

  // AI Chat State
  const [aiInput, setAiInput] = useState("");
  const [aiConversation, setAiConversation] = useState<Array<{ role: "user" | "assistant"; text: string }>>([
    {
      role: "assistant",
      text: `Welcome to ${manifest.productName}. I am your dedicated AI domain copilot. All statutory directorates, role portals, and offices are active. How may I assist your administration today?`
    }
  ]);

  // Theme Styling Map
  const colorMap = {
    amber: {
      bg: "bg-amber-500",
      bgLight: "bg-amber-50",
      text: "text-amber-600",
      border: "border-amber-200",
      gradient: "from-amber-600 to-amber-700",
      badge: "bg-amber-100 text-amber-800"
    },
    emerald: {
      bg: "bg-emerald-600",
      bgLight: "bg-emerald-50",
      text: "text-emerald-600",
      border: "border-emerald-200",
      gradient: "from-emerald-600 to-emerald-700",
      badge: "bg-emerald-100 text-emerald-800"
    },
    blue: {
      bg: "bg-blue-600",
      bgLight: "bg-blue-50",
      text: "text-blue-600",
      border: "border-blue-200",
      gradient: "from-blue-600 to-blue-700",
      badge: "bg-blue-100 text-blue-800"
    },
    purple: {
      bg: "bg-purple-600",
      bgLight: "bg-purple-50",
      text: "text-purple-600",
      border: "border-purple-200",
      gradient: "from-purple-600 to-purple-700",
      badge: "bg-purple-100 text-purple-800"
    },
    rose: {
      bg: "bg-rose-600",
      bgLight: "bg-rose-50",
      text: "text-rose-600",
      border: "border-rose-200",
      gradient: "from-rose-600 to-rose-700",
      badge: "bg-rose-100 text-rose-800"
    },
    cyan: {
      bg: "bg-cyan-600",
      bgLight: "bg-cyan-50",
      text: "text-cyan-600",
      border: "border-cyan-200",
      gradient: "from-cyan-600 to-cyan-700",
      badge: "bg-cyan-100 text-cyan-800"
    }
  };

  const theme = colorMap[themeColor] || colorMap.blue;

  // Selected Entities
  const selectedDirectorate = manifest.directorates?.find((d: JumoDirectorateManifest) => d.id === selectedDirectorateId) || manifest.directorates?.[0];
  const selectedDepartment = manifest.departments?.find((d: JumoDepartmentManifest) => d.id === selectedDepartmentId) || manifest.departments?.[0];
  const selectedOffice = manifest.offices?.find((o: JumoOfficeManifest) => o.id === selectedOfficeId) || manifest.offices?.[0];
  const selectedPortal = manifest.portals?.find((p: JumoPortalManifest) => p.id === selectedPortalId) || manifest.portals?.[0];

  const directorateDepartments = manifest.departments?.filter((d: JumoDepartmentManifest) => d.directorateId === selectedDirectorate?.id) || [];
  const departmentOffices = manifest.offices?.filter((o: JumoOfficeManifest) => o.departmentId === selectedDepartment?.id) || [];

  // Filter Modules
  const filteredModules = useMemo(() => {
    return (manifest.modules || []).filter((m: JumoModuleManifest) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesQuery = !q || 
        m.title.toLowerCase().includes(q) || 
        m.code.toLowerCase().includes(q) ||
        m.purpose.toLowerCase().includes(q);
      const matchesDept = selectedDepartmentFilter === "ALL" || m.departmentId === selectedDepartmentFilter;
      return matchesQuery && matchesDept;
    });
  }, [manifest.modules, searchQuery, selectedDepartmentFilter]);

  // Action Execution Handler
  const handleExecuteAction = (actionName: string) => {
    const newLog = {
      id: `LOG-${Math.floor(1000 + Math.random() * 9000)}`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      text: `Executed "${actionName}" within ${manifest.productName}. Verified via AEGIS Security & FAAP Ledger.`,
      status: "EXECUTED"
    };
    setActionLogs(prev => [newLog, ...prev]);
  };

  // AI Chat Handler
  const handleSendAi = (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiInput.trim()) return;
    const msg = aiInput.trim();
    setAiInput("");
    setAiConversation(prev => [...prev, { role: "user", text: msg }]);

    setTimeout(() => {
      let reply = `Evaluated query regarding "${msg}": All active records in ${manifest.productName} comply with national statutory norms. FAAP ledger parity is 100% matched.`;
      if (msg.toLowerCase().includes("audit") || msg.toLowerCase().includes("security")) {
        reply = `Continuous audit status for ${manifest.productName}: Zero compliance discrepancy. Cryptographic SHA-256 state signatures are verified by JUMO Digital Auditor.`;
      } else if (msg.toLowerCase().includes("fee") || msg.toLowerCase().includes("budget") || msg.toLowerCase().includes("loan") || msg.toLowerCase().includes("finance")) {
        reply = `Fiscal telemetry for ${manifest.productName}: Double-entry trial balance offsets to zero. Inflows are cleared automatically through JUMO Digital Pay.`;
      }
      setAiConversation(prev => [...prev, { role: "assistant", text: reply }]);
    }, 450);
  };

  // Semantic Icon Mapping for Portals / Offices / Modules
  const getIconForTitle = (title: string, defaultIcon: LucideIcon = Building2): LucideIcon => {
    const t = title.toLowerCase();
    if (t.includes("student") || t.includes("pupil")) return GraduationCap;
    if (t.includes("admit") || t.includes("enroll") || t.includes("kyc")) return UserCheck;
    if (t.includes("acad") || t.includes("exam") || t.includes("grade") || t.includes("course")) return BookOpen;
    if (t.includes("fin") || t.includes("bursar") || t.includes("fee") || t.includes("treasury") || t.includes("bank") || t.includes("loan") || t.includes("tith")) return DollarSign;
    if (t.includes("senate") || t.includes("pastor") || t.includes("board") || t.includes("head")) return Landmark;
    if (t.includes("research") || t.includes("grant")) return BrainCircuit;
    if (t.includes("alumni") || t.includes("community") || t.includes("member")) return Users;
    if (t.includes("audit") || t.includes("compliance") || t.includes("security")) return ShieldCheck;
    return defaultIcon;
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 pb-20 font-sans">
      
      {/* 1. APP APPLICATION HEADER & BRANDING BAR */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 md:p-8 shadow-xl border border-slate-800 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-blue-600 rounded-full -mr-48 -mt-48 blur-[120px] opacity-25" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-800 pb-6 mb-6">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="p-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer shrink-0"
              title="Return to Kernel Telemetry"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>

            <div className={`w-14 h-14 rounded-2xl ${theme.bg} text-white flex items-center justify-center shadow-lg shrink-0`}>
              <ProductIcon className="w-7 h-7" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${theme.badge}`}>
                  Sovereign Application
                </span>
                <span className="text-xs font-bold text-slate-400">ID: {manifest.productId}</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight mt-1">
                {manifest.productName}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {/* Real-time Search */}
            <div className="relative hidden sm:block">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search app modules, offices & portals..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (activeTab === "app_home") setActiveTab("modules");
                }}
                className="pl-9 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-2xl text-xs font-bold text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 w-64"
              />
            </div>

            {/* Notifications Button */}
            <div className="relative">
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="p-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer relative"
                title="Operational Notifications"
              >
                <Bell className="w-5 h-5" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 absolute top-2 right-2 border-2 border-slate-900 animate-pulse" />
              </button>

              {notificationsOpen && (
                <div className="absolute right-0 mt-3 w-80 bg-slate-900 border border-slate-800 rounded-3xl p-4 shadow-2xl z-50 space-y-3 text-xs">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="font-black text-slate-200 uppercase text-[10px] tracking-wider">App Alerts</span>
                    <span className="text-[10px] text-emerald-400 font-bold">Live Synced</span>
                  </div>
                  <div className="space-y-2">
                    <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-[11px]">
                      <span className="font-bold text-slate-200 block">FAAP Ledger Zero-Parity</span>
                      <span className="text-slate-400 text-[10px]">All double-entry journals matched cleanly.</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-[11px]">
                      <span className="font-bold text-slate-200 block">AEGIS HSM Security Vetted</span>
                      <span className="text-slate-400 text-[10px]">Session keys valid for 24h.</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Copilot Shortcut */}
            <button
              onClick={() => setActiveTab("ai_copilot")}
              className="px-4 py-2.5 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs transition-all flex items-center gap-2 cursor-pointer shadow-md shadow-purple-900/40"
            >
              <BrainCircuit className="w-4 h-4" />
              <span className="hidden sm:inline">AI Copilot</span>
            </button>
          </div>
        </div>

        {/* High-Level Scope Telemetry */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 relative z-10">
          <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/60">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Directorates</span>
            <span className="text-xl font-black text-white">{manifest.directorates?.length || 0}</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/60">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Departments</span>
            <span className="text-xl font-black text-blue-400">{manifest.departments?.length || 0}</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/60">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Offices & Desks</span>
            <span className="text-xl font-black text-emerald-400">{manifest.offices?.length || 0}</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/60">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">Role Portals</span>
            <span className="text-xl font-black text-purple-400">{manifest.portals?.length || 0}</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/60">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">ERP Modules</span>
            <span className="text-xl font-black text-amber-400">{manifest.modules?.length || 0}</span>
          </div>
        </div>

        {/* Application Navigation Ribbon */}
        <div className="flex flex-wrap items-center gap-2 pt-6 mt-6 border-t border-slate-800 relative z-10">
          {[
            { id: "app_home", label: "App Home (Icon Grid)", icon: LayoutDashboard },
            { id: "directorates", label: `Directorates (${manifest.directorates?.length || 0})`, icon: Building2 },
            { id: "offices", label: `Offices & Desks (${manifest.offices?.length || 0})`, icon: Landmark },
            { id: "portals", label: `Role Portals (${manifest.portals?.length || 0})`, icon: Globe },
            { id: "modules", label: `Module Catalog (${manifest.modules?.length || 0})`, icon: Database },
            { id: "faap_sync", label: "FAAP Ledger", icon: CreditCard },
            { id: "ai_copilot", label: "AI Copilot", icon: BrainCircuit }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  isActive 
                    ? `${theme.bg} text-white shadow-md` 
                    : "bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. TAB WORKSPACE DISPATCHER */}
      <AnimatePresence mode="wait">
        
        {/* === APP HOME (PRIMARY ICON-BASED PRODUCT NAVIGATION GRID) === */}
        {activeTab === "app_home" && (
          <motion.div
            key="app_home"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="space-y-8"
          >
            {/* Primary Mobile App Style Icon Grid Header */}
            <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200/80 shadow-xs space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Independent Operational Workspace</span>
                  <h2 className="text-xl font-black text-slate-900 mt-0.5">Application Modules & Workflows</h2>
                </div>
                <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                  Icon Launcher Mode
                </span>
              </div>

              {/* ICON GRID: ROLE PORTALS */}
              <div className="space-y-3">
                <span className="text-xs font-black text-slate-400 uppercase tracking-wider block">
                  Role-Tailored Operational Portals
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                  {manifest.portals?.map((portal: JumoPortalManifest) => {
                    const Icon = getIconForTitle(portal.name, Globe);
                    return (
                      <button
                        key={portal.id}
                        onClick={() => {
                          setSelectedPortalId(portal.id);
                          setActiveTab("portals");
                        }}
                        className="p-4 rounded-3xl bg-slate-50 hover:bg-white border border-slate-200/80 hover:border-blue-400 hover:shadow-md transition-all flex flex-col items-center text-center group cursor-pointer"
                      >
                        <div className={`w-12 h-12 rounded-2xl ${theme.bgLight} ${theme.text} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-xs`}>
                          <Icon className="w-6 h-6" />
                        </div>
                        <span className="text-xs font-black text-slate-900 leading-snug line-clamp-2 group-hover:text-blue-600">
                          {portal.name}
                        </span>
                        <span className="text-[9px] font-bold text-slate-400 mt-1 uppercase block truncate">
                          {portal.targetRole || "All Roles"}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* ICON GRID: CONSTITUENT DIRECTORATES */}
              <div className="space-y-3 pt-4 border-t border-slate-100">
                <span className="text-xs font-black text-slate-400 uppercase tracking-wider block">
                  Institutional Directorates
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {manifest.directorates?.map((dir: JumoDirectorateManifest) => {
                    const depts = manifest.departments?.filter((d: JumoDepartmentManifest) => d.directorateId === dir.id) || [];
                    const Icon = getIconForTitle(dir.name, Building2);
                    return (
                      <button
                        key={dir.id}
                        onClick={() => {
                          setSelectedDirectorateId(dir.id);
                          setActiveTab("directorates");
                        }}
                        className="p-5 rounded-3xl bg-slate-50 hover:bg-white border border-slate-200/80 hover:border-slate-300 hover:shadow-md transition-all text-left flex items-start gap-4 group cursor-pointer"
                      >
                        <div className={`w-12 h-12 rounded-2xl ${theme.bgLight} ${theme.text} flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform`}>
                          <Icon className="w-6 h-6" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="text-xs font-black text-slate-900 block truncate group-hover:text-blue-600">
                            {dir.name}
                          </span>
                          <span className="text-[10px] text-slate-500 font-medium line-clamp-2 mt-0.5">
                            {dir.description}
                          </span>
                          <div className="flex items-center gap-2 mt-2 text-[10px] font-bold text-slate-400">
                            <span>{depts.length} Departments</span>
                            <span>•</span>
                            <span className="text-blue-600">Explore →</span>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* ICON GRID: 8 INTEGRATED SHARED PLATFORMS */}
              <div className="space-y-3 pt-4 border-t border-slate-100">
                <span className="text-xs font-black text-slate-400 uppercase tracking-wider block">
                  Connected Sovereign Shared Platforms
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { id: "faap", name: "JUMO FAAP", desc: "Double-Entry Ledger", icon: CreditCard, color: "text-emerald-600 bg-emerald-50" },
                    { id: "digital-pay", name: "JUMO Digital Pay", desc: "Payment Switch", icon: Zap, color: "text-blue-600 bg-blue-50" },
                    { id: "aegis", name: "JUMO AEGIS", desc: "Zero-Trust Security", icon: Shield, color: "text-rose-600 bg-rose-50" },
                    { id: "treasury", name: "JUMO Treasury", desc: "Cash & Liquidity", icon: Database, color: "text-amber-600 bg-amber-50" },
                    { id: "digital-auditor", name: "Digital Auditor", desc: "Continuous Audit", icon: CheckCircle2, color: "text-teal-600 bg-teal-50" },
                    { id: "ai-hybrid", name: "AI Digital Hybrid", desc: "Cognitive Mesh", icon: BrainCircuit, color: "text-purple-600 bg-purple-50" },
                    { id: "workflow", name: "Workflow Engine", desc: "BPMN Automation", icon: Workflow, color: "text-sky-600 bg-sky-50" },
                    { id: "cloud", name: "Cloud Compute", desc: "Hypervisor Mesh", icon: Globe, color: "text-slate-600 bg-slate-100" }
                  ].map(plat => {
                    const PlatIcon = plat.icon;
                    return (
                      <button
                        key={plat.id}
                        onClick={() => onNavigateToPlatform?.(plat.id)}
                        className="p-3.5 rounded-2xl border border-slate-200/70 bg-slate-50 hover:bg-white hover:border-slate-300 hover:shadow-xs transition-all text-left flex items-center gap-3 group cursor-pointer"
                      >
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${plat.color} shrink-0`}>
                          <PlatIcon className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <span className="text-xs font-black text-slate-800 block truncate group-hover:text-blue-600">{plat.name}</span>
                          <span className="text-[9px] font-bold text-slate-400 block truncate">{plat.desc}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>
          </motion.div>
        )}

        {/* === DIRECTORATES & DEPARTMENTS === */}
        {activeTab === "directorates" && (
          <motion.div
            key="directorates"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          >
            {/* Rail */}
            <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs space-y-2">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider px-2 block mb-3">
                Institutional Directorates ({manifest.directorates?.length || 0})
              </span>
              <div className="space-y-1.5">
                {manifest.directorates?.map((dir: JumoDirectorateManifest) => {
                  const isSelected = dir.id === selectedDirectorateId;
                  const deptCount = manifest.departments?.filter((d: JumoDepartmentManifest) => d.directorateId === dir.id).length || 0;
                  return (
                    <button
                      key={dir.id}
                      onClick={() => setSelectedDirectorateId(dir.id)}
                      className={`w-full text-left p-3.5 rounded-2xl text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                        isSelected 
                          ? "bg-slate-900 text-white shadow-xs" 
                          : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                      }`}
                    >
                      <div className="truncate pr-2">
                        <span className="block truncate">{dir.name}</span>
                        <span className={`text-[10px] block ${isSelected ? "text-slate-300" : "text-slate-400"}`}>
                          {deptCount} Departments • Lead: {dir.leadRole}
                        </span>
                      </div>
                      {isSelected && <ChevronRight className="w-4 h-4 text-blue-400 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Department Details */}
            <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-6">
              <div>
                <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Selected Directorate</span>
                <h3 className="text-xl font-black text-slate-900">{selectedDirectorate?.name}</h3>
                <p className="text-xs text-slate-500 mt-1">{selectedDirectorate?.description}</p>
              </div>

              <div className="space-y-4">
                <span className="text-xs font-black text-slate-400 uppercase tracking-wider block">
                  Departments ({directorateDepartments.length})
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {directorateDepartments.map((dept: JumoDepartmentManifest) => {
                    const deptModules = (manifest.modules || []).filter((m: JumoModuleManifest) => m.departmentId === dept.id);
                    const deptOffices = (manifest.offices || []).filter((o: JumoOfficeManifest) => o.departmentId === dept.id);
                    return (
                      <div key={dept.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
                        <div className="flex items-center justify-between">
                          <h4 className="text-xs font-black text-slate-800">{dept.name}</h4>
                          <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                            {deptOffices.length} Offices
                          </span>
                        </div>

                        <p className="text-[11px] text-slate-500 line-clamp-2">{dept.description}</p>

                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              setSelectedDepartmentId(dept.id);
                              setActiveTab("offices");
                            }}
                            className="flex-1 py-2 bg-white hover:bg-slate-100 text-slate-800 text-[11px] font-bold rounded-xl border border-slate-200 transition-colors cursor-pointer text-center"
                          >
                            View Offices →
                          </button>
                          <button
                            onClick={() => {
                              setSelectedDepartmentFilter(dept.id);
                              setActiveTab("modules");
                            }}
                            className="flex-1 py-2 bg-slate-900 hover:bg-slate-800 text-white text-[11px] font-bold rounded-xl transition-colors cursor-pointer text-center"
                          >
                            Modules ({deptModules.length})
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* === OFFICES & ADMINISTRATIVE DESKS === */}
        {activeTab === "offices" && (
          <motion.div
            key="offices"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          >
            {/* Department selection rail */}
            <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs space-y-2">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider px-2 block mb-3">
                Select Department ({manifest.departments?.length || 0})
              </span>
              <div className="space-y-1.5 max-h-[500px] overflow-y-auto">
                {manifest.departments?.map((dept: JumoDepartmentManifest) => {
                  const isSelected = dept.id === selectedDepartmentId;
                  const officeCount = manifest.offices?.filter((o: JumoOfficeManifest) => o.departmentId === dept.id).length || 0;
                  return (
                    <button
                      key={dept.id}
                      onClick={() => setSelectedDepartmentId(dept.id)}
                      className={`w-full text-left p-3 rounded-2xl text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                        isSelected 
                          ? "bg-slate-900 text-white shadow-xs" 
                          : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                      }`}
                    >
                      <div className="truncate pr-2">
                        <span className="block truncate">{dept.name}</span>
                        <span className={`text-[10px] block ${isSelected ? "text-slate-300" : "text-slate-400"}`}>
                          {officeCount} Offices
                        </span>
                      </div>
                      {isSelected && <Landmark className="w-4 h-4 text-blue-400 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Offices List */}
            <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-6">
              <div>
                <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Department Offices</span>
                <h3 className="text-xl font-black text-slate-900">{selectedDepartment?.name}</h3>
                <p className="text-xs text-slate-500 mt-0.5">{selectedDepartment?.description}</p>
              </div>

              <div className="space-y-3">
                {departmentOffices.map((office: JumoOfficeManifest) => (
                  <div key={office.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                          {office.code}
                        </span>
                        <h4 className="text-xs font-black text-slate-900">{office.name}</h4>
                      </div>
                      <span className="text-[10px] font-bold text-slate-500 bg-slate-200/70 px-2 py-0.5 rounded-full">
                        Officer: {office.officerRole}
                      </span>
                    </div>

                    <p className="text-[11px] text-slate-500">{office.description}</p>

                    <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-[10px]">
                      <span className="text-slate-400 font-medium">AEGIS Cryptographic Signer Active</span>
                      <button
                        onClick={() => handleExecuteAction(`Office Desk Action: ${office.name}`)}
                        className="px-3 py-1 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-lg cursor-pointer"
                      >
                        Invoke Officer Desk →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* === ROLE PORTALS === */}
        {activeTab === "portals" && (
          <motion.div
            key="portals"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          >
            {/* Portals Rail */}
            <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs space-y-2">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider px-2 block mb-3">
                Role-Tailored Portals ({manifest.portals?.length || 0})
              </span>
              <div className="space-y-1.5 max-h-[500px] overflow-y-auto">
                {manifest.portals?.map((p: JumoPortalManifest) => {
                  const isSelected = p.id === selectedPortalId;
                  return (
                    <button
                      key={p.id}
                      onClick={() => setSelectedPortalId(p.id)}
                      className={`w-full text-left p-3 rounded-2xl text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                        isSelected 
                          ? "bg-slate-900 text-white shadow-xs" 
                          : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                      }`}
                    >
                      <div className="truncate pr-2">
                        <span className="block truncate">{p.name}</span>
                        <span className={`text-[10px] block ${isSelected ? "text-slate-300" : "text-slate-400"}`}>
                          Role: {p.targetRole || "All Users"}
                        </span>
                      </div>
                      {isSelected && <Globe className="w-4 h-4 text-blue-400 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Portal Workspace */}
            <div className="lg:col-span-2 bg-white rounded-3xl p-6 md:p-8 border border-slate-200/80 shadow-xs space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-5">
                <div>
                  <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Active Portal Session</span>
                  <h3 className="text-2xl font-black text-slate-900">{selectedPortal?.name}</h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Target Role: <strong className="text-slate-700">{selectedPortal?.targetRole || "Authorized Official"}</strong> • Auth Level: <strong className="text-slate-700">{selectedPortal?.authLevel || "STAFF"}</strong>
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-xs font-bold">
                    Authenticated
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-xs text-slate-600">{selectedPortal?.description}</p>

                <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider">
                  Portal Capabilities & Quick Workflows
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    "Identity & Role Clearance Check",
                    "Electronic Fee Billing & Voucher Issuance",
                    "Automated Workflow Clearance Routing",
                    "Real-Time Journal Postings to FAAP"
                  ].map((feat: string, idx: number) => (
                    <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-start justify-between gap-3">
                      <div>
                        <span className="text-xs font-bold text-slate-800 block">{feat}</span>
                        <span className="text-[10px] text-slate-400">Zero-trust cryptographic validation</span>
                      </div>
                      <button
                        onClick={() => handleExecuteAction(feat)}
                        className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-[10px] font-bold rounded-xl transition-all cursor-pointer shrink-0"
                      >
                        Execute
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-100 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-blue-600 shrink-0" />
                  <div>
                    <span className="font-bold text-slate-800 block">JUMO AEGIS Guard Active</span>
                    <span className="text-[10px] text-slate-500">Every portal payload is signed and logged to immutable audit streams.</span>
                  </div>
                </div>
                <span className="font-bold text-blue-700 text-[11px]">Enforced</span>
              </div>
            </div>
          </motion.div>
        )}

        {/* === MODULE CATALOG === */}
        {activeTab === "modules" && (
          <motion.div
            key="modules"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-6"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-black text-slate-900">Authoritative Module Catalog</h3>
                <p className="text-xs text-slate-500">
                  Showing {filteredModules.length} of {manifest.modules?.length || 0} certified modules for {manifest.productName}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Filter modules..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-8 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                {selectedDepartmentFilter !== "ALL" && (
                  <button
                    onClick={() => setSelectedDepartmentFilter("ALL")}
                    className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl cursor-pointer"
                  >
                    Clear Filter
                  </button>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {filteredModules.map((mod: JumoModuleManifest) => {
                const dept = manifest.departments?.find((d: JumoDepartmentManifest) => d.id === mod.departmentId);
                return (
                  <div
                    key={mod.id || mod.code}
                    className="p-4 rounded-2xl bg-slate-50 hover:bg-white border border-slate-100 hover:border-slate-200 hover:shadow-xs transition-all space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] font-black text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                        {mod.code}
                      </span>
                      <span className="text-[9px] font-bold text-slate-400 uppercase">ACTIVE</span>
                    </div>
                    <h4 className="text-xs font-black text-slate-900 leading-snug">{mod.title}</h4>
                    <p className="text-[11px] text-slate-500 line-clamp-2">{mod.purpose}</p>
                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500 font-medium">
                      <span className="truncate max-w-[140px]">{dept?.name || "Operations"}</span>
                      <button
                        onClick={() => handleExecuteAction(`Module Launch: ${mod.title}`)}
                        className="text-blue-600 hover:text-blue-700 font-bold cursor-pointer"
                      >
                        Launch →
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* === FAAP LEDGER & PLATFORM SYNC === */}
        {activeTab === "faap_sync" && (
          <motion.div
            key="faap_sync"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          >
            <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-6">
              <div>
                <h3 className="text-lg font-black text-slate-900">FAAP Double-Entry Parity Journal</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Synchronized double-entry chart of accounts tied to {manifest.productName} transactions.
                </p>
              </div>

              <div className="space-y-3">
                {[
                  { code: "1010-00", name: "Operating Treasury Reserves", debit: "$1,450,000.00", credit: "$0.00", status: "MATCHED" },
                  { code: "2010-00", name: "Institutional Fee Inflow Clearance", debit: "$0.00", credit: "$820,000.00", status: "MATCHED" },
                  { code: "3010-00", name: "Statutory Capital & Reserve", debit: "$0.00", credit: "$630,000.00", status: "MATCHED" },
                  { code: "5010-00", name: "Directorate Operations & Logistics", debit: "$340,000.00", credit: "$0.00", status: "MATCHED" }
                ].map(acc => (
                  <div key={acc.code} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[10px] font-bold text-slate-500">{acc.code}</span>
                        <span className="font-bold text-slate-800">{acc.name}</span>
                      </div>
                      <div className="flex items-center gap-4 mt-1 text-[11px] text-slate-500">
                        <span>Debit: <strong className="text-slate-700">{acc.debit}</strong></span>
                        <span>Credit: <strong className="text-slate-700">{acc.credit}</strong></span>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black">
                      {acc.status}
                    </span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => onNavigateToPlatform?.("faap")}
                className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-all cursor-pointer flex items-center gap-2"
              >
                Open Full JUMO FAAP Standalone Platform →
              </button>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
              <h3 className="text-sm font-black text-slate-900">Continuous Audit Status</h3>
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-100 text-center space-y-1">
                <span className="text-2xl font-black text-emerald-600 block">100%</span>
                <span className="text-xs font-black text-slate-800 block">Zero-Discrepancy Baseline</span>
                <span className="text-[10px] text-slate-500 block">Verified by JUMO Digital Auditor</span>
              </div>
            </div>
          </motion.div>
        )}

        {/* === AI COPILOT === */}
        {activeTab === "ai_copilot" && (
          <motion.div
            key="ai_copilot"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200/80 shadow-xs space-y-6 max-w-4xl mx-auto"
          >
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <div className="w-10 h-10 rounded-2xl bg-purple-600 text-white flex items-center justify-center font-bold shadow-md shadow-purple-500/20">
                <BrainCircuit className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-900">{manifest.productName} AI Copilot</h3>
                <span className="text-xs text-slate-400 font-medium">Domain-specialized cognitive intelligence mesh</span>
              </div>
            </div>

            <div className="space-y-3 min-h-[260px] max-h-[360px] overflow-y-auto p-2">
              {aiConversation.map((chat, idx) => (
                <div
                  key={idx}
                  className={`flex ${chat.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-lg p-4 rounded-2xl text-xs font-medium leading-relaxed ${
                      chat.role === "user"
                        ? "bg-blue-600 text-white"
                        : "bg-slate-100 text-slate-800 border border-slate-200/60"
                    }`}
                  >
                    {chat.text}
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={handleSendAi} className="flex items-center gap-2 pt-2 border-t border-slate-100">
              <input
                type="text"
                placeholder={`Ask ${manifest.productName} AI about directorates, policies, fees, ledger...`}
                value={aiInput}
                onChange={(e) => setAiInput(e.target.value)}
                className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-bold text-slate-800 focus:outline-none focus:ring-1 focus:ring-purple-500"
              />
              <button
                type="submit"
                className="px-5 py-3 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold rounded-2xl transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send</span>
              </button>
            </form>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}
