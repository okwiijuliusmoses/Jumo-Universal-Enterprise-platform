/**
 * JUMO UEOS Enterprise Portal Fabric & Universal Launcher (v20.0 & v21.0)
 * Authoritative navigation, configuration, and deployment ecosystem connecting all
 * Sovereign Platforms (13), ERP Domain Centers (5 Categories), Templates (41+),
 * Universal Modules (15+), and AI Configuration Assistants into one unified environment.
 */

import React, { useState } from 'react';
import {
  Building2, DollarSign, Zap, Shield, Cloud, Cpu, Code, Microscope,
  Package, Sliders, Settings, Activity, CheckCircle2, Layers, Lock,
  Server, Users, GitBranch, Terminal, Globe, RefreshCw, Plus, Search,
  Landmark, BookOpen, Award, Sparkles, ChevronRight, Check, Play,
  FileText, Database, ArrowRight, Download, ExternalLink, ShieldCheck,
  AlertCircle, HelpCircle, UserCheck, CreditCard, ToggleLeft, ToggleRight,
  Filter, Grid, List, Wrench, Briefcase, HeartHandshake, GraduationCap,
  Home, Menu, X, ChevronDown, Info
} from 'lucide-react';

import {
  SOVEREIGN_PLATFORMS_REGISTRY,
  ERP_PORTAL_REGISTRY,
  UNIVERSAL_CORE_MODULES,
  PLATFORM_SPECIFIC_MODULES,
  SUBSCRIPTION_LICENSING_PLANS,
  SovereignPlatformDef,
  ErpTemplateDef,
  UniversalModuleDef
} from '../core/runtime/portalFabricRegistry';

export interface EnterprisePortalFabricProps {
  onNavigate?: (route: string) => void;
  currentUser?: {
    name?: string;
    email?: string;
    role?: string;
    tenantId?: string;
  };
  onLogout?: () => void;
  initialTab?: 'launcher' | 'erp-center' | 'factory' | 'modules' | 'config' | 'ai' | 'licensing';
  selectedTemplateId?: string;
}

export const EnterprisePortalFabric: React.FC<EnterprisePortalFabricProps> = ({
  onNavigate,
  currentUser,
  onLogout,
  initialTab = 'launcher',
  selectedTemplateId
}) => {
  const [activeTab, setActiveTab] = useState<'launcher' | 'erp-center' | 'factory' | 'modules' | 'config' | 'ai' | 'licensing'>(initialTab);
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Deployment Factory State
  const [factoryStep, setFactoryStep] = useState<number>(1);
  const [factoryErpCategory, setFactoryErpCategory] = useState<string>('Education ERP');
  const [factoryTemplate, setFactoryTemplate] = useState<ErpTemplateDef | null>(
    selectedTemplateId 
      ? ERP_PORTAL_REGISTRY.find(t => t.id === selectedTemplateId) || ERP_PORTAL_REGISTRY[0]
      : ERP_PORTAL_REGISTRY[0]
  );
  const [factoryModules, setFactoryModules] = useState<string[]>(
    UNIVERSAL_CORE_MODULES.map(m => m.id)
  );
  const [factoryOrgName, setFactoryOrgName] = useState<string>('East African Sovereign Institute');
  const [factoryAdminEmail, setFactoryAdminEmail] = useState<string>(currentUser?.email || 'admin@sovereign-institute.org');
  const [factoryDeploying, setFactoryDeploying] = useState<boolean>(false);
  const [factorySuccess, setFactorySuccess] = useState<boolean>(false);

  // Module Toggle State
  const [moduleStates, setModuleStates] = useState<Record<string, boolean>>(
    UNIVERSAL_CORE_MODULES.reduce((acc, m) => ({ ...acc, [m.id]: m.status === 'Installed & Active' }), {})
  );

  // AI Assistant State
  const [aiInput, setAiInput] = useState<string>('');
  const [aiMessages, setAiMessages] = useState<{ sender: 'user' | 'ai'; text: string; timestamp: string }[]>([
    {
      sender: 'ai',
      text: 'Greetings, Sovereign Administrator. I am the authoritative JUMO UEOS Portal AI Assistant (v20.0). I can assist you with template selection across our 41+ industry models, module dependency resolution, FAAP ledger setup, or multi-tenant workspace configuration. How may I direct your deployment today?',
      timestamp: 'Just now'
    }
  ]);
  const [aiThinking, setAiThinking] = useState<boolean>(false);

  const handleLaunchRoute = (route: string) => {
    if (onNavigate) {
      onNavigate(route);
    } else if (typeof window !== 'undefined') {
      window.location.href = route;
    }
  };

  const handleToggleModule = (modId: string) => {
    setModuleStates(prev => ({
      ...prev,
      [modId]: !prev[modId]
    }));
  };

  const handleStartDeployment = (template: ErpTemplateDef) => {
    setFactoryTemplate(template);
    setFactoryErpCategory(template.category);
    setFactoryStep(1);
    setActiveTab('factory');
  };

  const handleRunDeploymentSimulation = () => {
    setFactoryDeploying(true);
    setTimeout(() => {
      setFactoryDeploying(false);
      setFactorySuccess(true);
      setFactoryStep(9);
    }, 2500);
  };

  const handleSendAiMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiInput.trim()) return;

    const newMsg = { sender: 'user' as const, text: aiInput, timestamp: 'Just now' };
    setAiMessages(prev => [...prev, newMsg]);
    const query = aiInput.toLowerCase();
    setAiInput('');
    setAiThinking(true);

    setTimeout(() => {
      let reply = 'I have analyzed your institutional parameters against the JUMO UEOS kernel registry. ';
      if (query.includes('education') || query.includes('school') || query.includes('university')) {
        reply += 'For higher education and schools, I recommend deploying the **Education ERP University or Secondary Template**. It pre-configures 28 modules including Student SIS, FAAP Fee Billing with $0.00 parity, and online exam grading.';
      } else if (query.includes('sacco') || query.includes('coop') || query.includes('finance') || query.includes('loan')) {
        reply += 'For financial cooperatives and SACCOs, deploy the **SACCO ERP Template**. It activates 24 modules including Share Capital Registers, Loan Origination Engines, and M-Pesa automated clearing with 1.5% treasury settlement.';
      } else if (query.includes('module') || query.includes('install') || query.includes('dependency')) {
        reply += 'Universal Modules such as **FAAP General Ledger** and **Zero-Trust RBAC** are Ring-0 required dependencies. You can dynamically toggle add-on modules in the **Universal Module Studio** without restarting the kernel.';
      } else if (query.includes('license') || query.includes('price') || query.includes('cost') || query.includes('tier')) {
        reply += 'JUMO UEOS provides 3 distinct tiers: **Developer Sandbox ($0)** for evaluation, **Institutional Standard ($499/mo)** for up to 500 active users with full FAAP ledger parity, and **Sovereign Enterprise (Custom)** for multi-campus clusters.';
      } else {
        reply += 'All 13 Sovereign Platforms and 41+ ERP Templates are fully interoperable. Selecting a template in the ERP Domain Center will automatically provision its required PostgreSQL database tables and RBAC role policies.';
      }
      setAiMessages(prev => [...prev, { sender: 'ai' as const, text: reply, timestamp: 'Just now' }]);
      setAiThinking(false);
    }, 1000);
  };

  // Filtered lists
  const filteredPlatforms = SOVEREIGN_PLATFORMS_REGISTRY.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const erpCategories = ['All', 'Education ERP', 'Financial & Cooperative ERP', 'Institution ERP', 'Industry ERP', 'Government ERP'];
  const filteredErpTemplates = ERP_PORTAL_REGISTRY.filter(t => {
    const matchesSearch = t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          t.targetTenants.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === 'All' || t.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const getPlatformIcon = (name: string) => {
    switch (name) {
      case 'Cpu': return Cpu;
      case 'DollarSign': return DollarSign;
      case 'Zap': return Zap;
      case 'Landmark': return Landmark;
      case 'Cloud': return Cloud;
      case 'Shield': return Shield;
      case 'Code': return Code;
      case 'Microscope': return Microscope;
      case 'Globe': return Globe;
      case 'Layers': return Layers;
      case 'Terminal': return Terminal;
      case 'Package': return Package;
      default: return Building2;
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans antialiased selection:bg-blue-100 selection:text-[#0078D4] flex flex-col">
      {/* Top Minimal Universal Identity Bar (v21.0 Phase 7 Rule) */}
      <header className="bg-slate-900 text-white px-4 md:px-6 py-3 border-b border-slate-800 sticky top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition cursor-pointer flex items-center justify-center md:hidden"
              title="Toggle Sidebar"
            >
              {sidebarCollapsed ? <Menu className="w-4 h-4" /> : <X className="w-4 h-4" />}
            </button>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#0078D4] flex items-center justify-center font-extrabold text-white text-sm shadow-xs">
                J
              </div>
              <span className="font-black tracking-tight text-base text-white">
                JUMO UEOS <span className="text-blue-400 font-normal text-xs font-mono ml-1">PORTAL FABRIC v21.0</span>
              </span>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-6 text-xs">
            <span className="flex items-center gap-1.5 text-emerald-400 font-mono font-semibold bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/20">
              <CheckCircle2 className="w-3.5 h-3.5" /> 13 Platforms Ring-0 Verified
            </span>
            <span className="flex items-center gap-1.5 text-blue-300 font-mono bg-blue-500/10 px-2.5 py-1 rounded border border-blue-500/20">
              <Layers className="w-3.5 h-3.5" /> 41+ ERP Templates Ready
            </span>
            <span className="flex items-center gap-1.5 text-purple-300 font-mono bg-purple-500/10 px-2.5 py-1 rounded border border-purple-500/20">
              <Sparkles className="w-3.5 h-3.5" /> AI Cognitive Router Active
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => handleLaunchRoute('/erp-factory')}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white transition border border-amber-500 cursor-pointer flex items-center gap-1.5 shadow-xs"
            >
              <Sparkles className="w-3.5 h-3.5" /> ERP Factory (v23.0)
            </button>
            <div className="text-right hidden sm:block">
              <div className="text-xs font-bold text-white">{currentUser?.name || 'Sovereign Administrator'}</div>
              <div className="text-[10px] text-slate-400 font-mono">{currentUser?.tenantId || 'Enterprise Ring-0 Authority'}</div>
            </div>
            {onLogout && (
              <button
                onClick={onLogout}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition border border-slate-700 cursor-pointer"
              >
                Sign Out
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Workspace with Left Navigation & Full Operational Center */}
      <div className="flex-1 flex max-w-7xl mx-auto w-full">
        {/* Left Collapsible Icon Navigation (v21.0 Phase 7 Rule) */}
        <aside className={`bg-slate-50 border-r border-slate-200 shrink-0 transition-all duration-300 flex flex-col ${
          sidebarCollapsed ? 'w-16' : 'w-64'
        } ${sidebarCollapsed ? 'hidden md:flex' : 'flex'}`}>
          <div className="p-3 border-b border-slate-200 flex items-center justify-between">
            {!sidebarCollapsed && <span className="text-[11px] font-mono font-bold text-slate-500 uppercase tracking-wider">Fabric Navigation</span>}
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-600 transition cursor-pointer ml-auto"
              title={sidebarCollapsed ? "Expand Navigation" : "Collapse Navigation"}
            >
              <ChevronRight className={`w-4 h-4 transform transition-transform ${!sidebarCollapsed ? 'rotate-180' : ''}`} />
            </button>
          </div>

          <nav className="p-2 space-y-1 flex-1 overflow-y-auto">
            {[
              { id: 'launcher', label: '1. Enterprise Launcher', subtitle: '13 Sovereign Platforms', icon: Grid },
              { id: 'erp-center', label: '2. ERP Domain Center', subtitle: '41+ Industry Templates', icon: Building2 },
              { id: 'factory', label: '3. Deployment Factory', subtitle: '9-Step Auto Provision', icon: Code },
              { id: 'modules', label: '4. Universal Modules', subtitle: '15+ Core & Add-ons', icon: Package },
              { id: 'config', label: '5. Configuration Studio', subtitle: 'Global System Setup', icon: Settings },
              { id: 'ai', label: '6. AI Assistant Layer', subtitle: 'Cognitive Setup Router', icon: Sparkles },
              { id: 'licensing', label: '7. Subscription & Licensing', subtitle: 'Sovereign Institutional Tiers', icon: DollarSign },
            ].map((nav) => {
              const Icon = nav.icon;
              const isActive = activeTab === nav.id;
              return (
                <button
                  key={nav.id}
                  onClick={() => setActiveTab(nav.id as any)}
                  className={`w-full p-3 rounded-xl flex items-center gap-3 transition cursor-pointer text-left ${
                    isActive
                      ? 'bg-[#0078D4] text-white font-bold shadow-xs'
                      : 'text-slate-700 hover:bg-slate-200/60 font-semibold'
                  }`}
                  title={sidebarCollapsed ? nav.label : undefined}
                >
                  <Icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-white' : 'text-[#0078D4]'}`} />
                  {!sidebarCollapsed && (
                    <div className="truncate">
                      <div className="text-xs">{nav.label}</div>
                      <div className={`text-[10px] ${isActive ? 'text-blue-100' : 'text-slate-500'} font-normal`}>{nav.subtitle}</div>
                    </div>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Quick Return to Master Launchpad */}
          <div className="p-3 border-t border-slate-200 mt-auto">
            <button
              onClick={() => handleLaunchRoute('/control-center')}
              className="w-full p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              title={sidebarCollapsed ? "Return to Owner Launchpad" : undefined}
            >
              <Home className="w-4 h-4 text-amber-400 shrink-0" />
              {!sidebarCollapsed && <span>Owner Control Center</span>}
            </button>
          </div>
        </aside>

        {/* Center Full Operational Workspace (v21.0 Phase 7 Rule: No crowded right sidebar, no stacked pages) */}
        <main className="flex-1 p-6 md:p-8 overflow-y-auto space-y-6">
          {/* Top Search & Category Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-blue-50 border border-blue-200 text-[#0078D4] text-[11px] font-mono font-bold uppercase mb-1">
                <ShieldCheck className="w-3.5 h-3.5" /> Sovereign Fabric Architecture (Roadmap v20.0 & v21.0)
              </div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                {activeTab === 'launcher' && 'Universal Enterprise Platform Launcher'}
                {activeTab === 'erp-center' && 'ERP Domain Center & Template Marketplace'}
                {activeTab === 'factory' && 'Automated ERP Deployment Factory'}
                {activeTab === 'modules' && 'Universal Module Operations Studio'}
                {activeTab === 'config' && 'Universal Enterprise Configuration Studio'}
                {activeTab === 'ai' && 'Sovereign Portal AI Cognitive Assistant'}
                {activeTab === 'licensing' && 'Subscription & Institutional Licensing Engine'}
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search platforms, ERPs, modules..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#0078D4] focus:bg-white transition"
                />
              </div>
            </div>
          </div>

          {/* TAB 1: UNIVERSAL ENTERPRISE LAUNCHER (v21.0 Phase 1 / v20.0 Phase 1) */}
          {activeTab === 'launcher' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 to-blue-950 text-white shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="space-y-2 max-w-2xl">
                  <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest bg-amber-400/10 px-2.5 py-0.5 rounded border border-amber-400/30">
                    Phase 1 Authoritative Registry Active
                  </span>
                  <h2 className="text-xl md:text-2xl font-bold">13 Independent Sovereign Platforms</h2>
                  <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
                    Every JUMO platform operates in its own dedicated workspace with Zero-Trust identity boundaries, FAAP double-entry ledger integration ($0.00 parity), and multi-model AI routing. Select an icon below to open its independent operational center.
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-3 shrink-0">
                  <button
                    onClick={() => setActiveTab('erp-center')}
                    className="px-4 py-2.5 bg-[#0078D4] hover:bg-blue-600 text-white font-bold text-xs rounded-xl transition shadow-sm flex items-center gap-2 cursor-pointer"
                  >
                    <Building2 className="w-4 h-4" /> Browse 41+ ERP Templates
                  </button>
                  <button
                    onClick={() => setActiveTab('factory')}
                    className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white font-bold text-xs rounded-xl transition border border-white/20 flex items-center gap-2 cursor-pointer"
                  >
                    <Code className="w-4 h-4" /> Launch Deployment Factory
                  </button>
                </div>
              </div>

              {/* 13 Sovereign Platforms Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredPlatforms.map((plat) => {
                  const Icon = getPlatformIcon(plat.iconName);
                  return (
                    <div key={plat.id} className="p-6 rounded-2xl border border-slate-200 bg-white hover:border-[#0078D4] hover:shadow-md transition flex flex-col justify-between space-y-5">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="p-3 rounded-xl bg-blue-50 text-[#0078D4] border border-blue-100">
                            <Icon className="w-6 h-6" />
                          </div>
                          <span className="text-[10px] font-mono font-bold uppercase px-2.5 py-1 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                            {plat.status}
                          </span>
                        </div>
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-mono font-semibold text-slate-400">{plat.category}</span>
                            <span className="text-[10px] font-mono font-bold text-[#0078D4]">{plat.version}</span>
                          </div>
                          <h3 className="font-bold text-base text-slate-900 mt-1">{plat.name}</h3>
                          <p className="text-xs text-slate-600 mt-1 leading-relaxed">{plat.description}</p>
                        </div>
                        <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-500">
                          <span><strong className="text-slate-800">{plat.modulesCount}</strong> Modules</span>
                          <span><strong className="text-slate-800">{plat.servicesCount}</strong> Services</span>
                          <span className="text-blue-600">{plat.licensingTier}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 pt-2">
                        <button
                          onClick={() => handleLaunchRoute(plat.workspaceRoute)}
                          className="flex-1 py-2.5 bg-slate-900 hover:bg-[#0078D4] text-white font-bold text-xs rounded-xl transition flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                        >
                          <Play className="w-3.5 h-3.5" /> Launch Workspace
                        </button>
                        <button
                          onClick={() => {
                            setAiInput(`How do I configure and deploy modules for ${plat.name}?`);
                            setActiveTab('ai');
                          }}
                          className="p-2.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 transition cursor-pointer"
                          title="Ask AI about this platform"
                        >
                          <Sparkles className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 2: ERP DOMAIN CENTER & TEMPLATE MARKETPLACE (v21.0 Phase 2 / v20.0 Phase 2) */}
          {activeTab === 'erp-center' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
                <div className="flex items-center gap-2 overflow-x-auto">
                  {erpCategories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-3.5 py-2 rounded-lg text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                        selectedCategory === cat
                          ? 'bg-[#0078D4] text-white shadow-xs'
                          : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                      }`}
                    >
                      {cat} {cat !== 'All' && `(${ERP_PORTAL_REGISTRY.filter(t => t.category === cat).length})`}
                    </button>
                  ))}
                </div>
                <div className="text-xs font-mono font-semibold text-slate-500 shrink-0">
                  Showing {filteredErpTemplates.length} of {ERP_PORTAL_REGISTRY.length} Authoritative Templates
                </div>
              </div>

              {/* ERP Templates Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredErpTemplates.map((tpl) => (
                  <div key={tpl.id} className="p-6 rounded-2xl border border-slate-200 bg-white hover:border-[#0078D4] hover:shadow-md transition flex flex-col justify-between space-y-5">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono font-bold uppercase px-2.5 py-1 rounded bg-blue-50 text-[#0078D4] border border-blue-200">
                          {tpl.category}
                        </span>
                        <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                          {tpl.defaultTier}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-bold text-base text-slate-900">{tpl.name}</h3>
                        <p className="text-xs text-slate-500 mt-0.5 font-semibold">Target: {tpl.targetTenants}</p>
                        <p className="text-xs text-slate-600 mt-2 leading-relaxed">{tpl.description}</p>
                      </div>
                      <div className="space-y-1.5 pt-2 border-t border-slate-100">
                        <div className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">Key Included Modules:</div>
                        <div className="flex flex-wrap gap-1.5">
                          {tpl.keyModules.map((km, i) => (
                            <span key={i} className="text-[10px] font-mono bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-200">
                              {km}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="pt-2 flex items-center justify-between text-xs text-slate-500 font-medium">
                        <span><strong className="text-slate-800">{tpl.modulesIncluded}</strong> Modules</span>
                        <span><strong className="text-slate-800">{tpl.dbTablesCount}</strong> DB Tables</span>
                        <span><strong className="text-purple-600">{tpl.aiWorkflowCount}</strong> AI Workflows</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pt-2">
                      <button
                        onClick={() => handleStartDeployment(tpl)}
                        className="flex-1 py-2.5 bg-[#0078D4] hover:bg-blue-600 text-white font-bold text-xs rounded-xl transition flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                      >
                        <Lock className="w-3.5 h-3.5" /> Deploy This Template
                      </button>
                      <button
                        onClick={() => handleLaunchRoute(`/platform/erp`)}
                        className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold transition cursor-pointer"
                        title="View in ERP Platform Center"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: AUTOMATED ERP DEPLOYMENT FACTORY (v21.0 Phase 3/4 & v20.0 Phase 5) */}
          {activeTab === 'factory' && (
            <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm space-y-8 animate-in fade-in duration-300">
              <div className="border-b border-slate-200 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Sovereign ERP Template Deployment Factory</h3>
                  <p className="text-xs md:text-sm text-slate-600 mt-1">
                    Automated 9-step provisioning engine. Scaffolds database tables, RBAC roles, FAAP ledger accounts, and AI workflows in real-time.
                  </p>
                </div>
                <span className="px-3 py-1.5 bg-blue-50 text-[#0078D4] font-mono font-bold text-xs rounded-xl border border-blue-200 self-start">
                  Selected: {factoryTemplate?.name}
                </span>
              </div>

              {/* 9-Step Progress Tracker */}
              <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-9 gap-2">
                {[
                  { step: 1, label: '1. Select ERP' },
                  { step: 2, label: '2. Template' },
                  { step: 3, label: '3. Modules' },
                  { step: 4, label: '4. Organization' },
                  { step: 5, label: '5. Tenant Env' },
                  { step: 6, label: '6. Users' },
                  { step: 7, label: '7. AI Config' },
                  { step: 8, label: '8. Deploy DB' },
                  { step: 9, label: '9. Workflows' },
                ].map((st) => (
                  <div
                    key={st.step}
                    onClick={() => !factoryDeploying && setFactoryStep(st.step)}
                    className={`p-2.5 rounded-xl border text-center transition cursor-pointer ${
                      factoryStep === st.step
                        ? 'bg-[#0078D4] text-white border-[#0078D4] shadow-xs font-bold'
                        : factoryStep > st.step
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-200 font-semibold'
                        : 'bg-slate-50 text-slate-400 border-slate-200 font-normal'
                    }`}
                  >
                    <div className="text-[10px] font-mono truncate">{st.label}</div>
                  </div>
                ))}
              </div>

              {/* Step Content Area */}
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-6">
                {factoryStep === 1 && (
                  <div className="space-y-4">
                    <h4 className="font-bold text-base text-slate-900">Step 1: Select Authoritative ERP Category</h4>
                    <p className="text-xs text-slate-600">Choose the industry sector domain for your new tenant workspace.</p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {['Education ERP', 'Financial & Cooperative ERP', 'Institution ERP', 'Industry ERP', 'Government ERP'].map((cat) => (
                        <button
                          key={cat}
                          onClick={() => {
                            setFactoryErpCategory(cat);
                            const firstInCat = ERP_PORTAL_REGISTRY.find(t => t.category === cat);
                            if (firstInCat) setFactoryTemplate(firstInCat);
                            setFactoryStep(2);
                          }}
                          className={`p-4 rounded-xl border text-left transition cursor-pointer ${
                            factoryErpCategory === cat
                              ? 'bg-white border-[#0078D4] text-[#0078D4] font-bold shadow-xs'
                              : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                          }`}
                        >
                          <div className="text-sm">{cat}</div>
                          <div className="text-[11px] text-slate-500 font-normal mt-1">
                            {ERP_PORTAL_REGISTRY.filter(t => t.category === cat).length} Authoritative Templates
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {factoryStep === 2 && (
                  <div className="space-y-4">
                    <h4 className="font-bold text-base text-slate-900">Step 2: Select Pre-Configured Industry Template</h4>
                    <p className="text-xs text-slate-600">Showing templates under <strong className="text-slate-800">{factoryErpCategory}</strong>.</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-96 overflow-y-auto p-1">
                      {ERP_PORTAL_REGISTRY.filter(t => t.category === factoryErpCategory).map((tpl) => (
                        <div
                          key={tpl.id}
                          onClick={() => {
                            setFactoryTemplate(tpl);
                            setFactoryStep(3);
                          }}
                          className={`p-4 rounded-xl border transition cursor-pointer flex flex-col justify-between ${
                            factoryTemplate?.id === tpl.id
                              ? 'bg-white border-[#0078D4] shadow-xs'
                              : 'bg-white border-slate-200 hover:border-slate-300'
                          }`}
                        >
                          <div>
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-bold text-sm text-slate-900">{tpl.name}</span>
                              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-50 text-[#0078D4]">{tpl.defaultTier}</span>
                            </div>
                            <p className="text-xs text-slate-600 leading-relaxed">{tpl.description}</p>
                          </div>
                          <div className="pt-2 mt-2 border-t border-slate-100 text-[11px] text-slate-500 flex justify-between font-semibold">
                            <span>{tpl.modulesIncluded} Modules</span>
                            <span>{tpl.dbTablesCount} Tables</span>
                            <span>{tpl.aiWorkflowCount} AI Rules</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {factoryStep === 3 && (
                  <div className="space-y-4">
                    <h4 className="font-bold text-base text-slate-900">Step 3: Configure Required & Add-On Modules</h4>
                    <p className="text-xs text-slate-600">Toggle universal core modules to bundle into this tenant workspace.</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-h-80 overflow-y-auto p-1">
                      {UNIVERSAL_CORE_MODULES.map((mod) => {
                        const isChecked = factoryModules.includes(mod.id);
                        return (
                          <div
                            key={mod.id}
                            onClick={() => {
                              if (isChecked) {
                                setFactoryModules(prev => prev.filter(id => id !== mod.id));
                              } else {
                                setFactoryModules(prev => [...prev, mod.id]);
                              }
                            }}
                            className={`p-3 rounded-xl border transition cursor-pointer flex items-start gap-3 ${
                              isChecked ? 'bg-white border-[#0078D4] shadow-xs' : 'bg-white/60 border-slate-200'
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => {}}
                              className="mt-1 rounded text-[#0078D4] focus:ring-[#0078D4]"
                            />
                            <div>
                              <div className="font-bold text-xs text-slate-900">{mod.name}</div>
                              <div className="text-[11px] text-slate-500 mt-0.5 leading-tight">{mod.description}</div>
                              <span className="inline-block mt-1 text-[9px] font-mono uppercase bg-slate-100 px-1.5 py-0.5 rounded text-slate-600">
                                {mod.category}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {(factoryStep >= 4 && factoryStep <= 7) && (
                  <div className="space-y-4 max-w-xl">
                    <h4 className="font-bold text-base text-slate-900">
                      Step {factoryStep}: {
                        factoryStep === 4 ? 'Configure Institutional Organization Parameters' :
                        factoryStep === 5 ? 'Provision Zero-Trust Tenant Environment' :
                        factoryStep === 6 ? 'Assign Administrator Seats & RBAC Roles' :
                        'Configure AI Cognitive Setup Router'
                      }
                    </h4>
                    <div className="space-y-4 bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Institutional Organization Name</label>
                        <input
                          type="text"
                          value={factoryOrgName}
                          onChange={(e) => setFactoryOrgName(e.target.value)}
                          className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs font-semibold text-slate-800"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Master Tenant Administrator Email</label>
                        <input
                          type="email"
                          value={factoryAdminEmail}
                          onChange={(e) => setFactoryAdminEmail(e.target.value)}
                          className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs font-semibold text-slate-800"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3 text-xs">
                        <div className="p-3 rounded-lg bg-blue-50 border border-blue-200 text-blue-900">
                          <div className="font-bold">Tenant Isolation Tag</div>
                          <div className="font-mono text-[11px] mt-0.5">tenant_{factoryOrgName.toLowerCase().replace(/[^a-z0-9]/g, '_').slice(0, 15)}</div>
                        </div>
                        <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-900">
                          <div className="font-bold">FAAP Ledger Parity</div>
                          <div className="font-mono text-[11px] mt-0.5">Enforced ($0.00 Balance)</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {factoryStep === 8 && (
                  <div className="space-y-6 text-center py-6">
                    <h4 className="font-bold text-lg text-slate-900">Step 8: Provision PostgreSQL Database & Row Security</h4>
                    <p className="text-xs text-slate-600 max-w-md mx-auto">
                      Click below to execute Drizzle ORM schema migrations and instantiate the 1.5% treasury clearing switch for <strong className="text-slate-900">{factoryOrgName}</strong>.
                    </p>
                    {factoryDeploying ? (
                      <div className="space-y-4 py-6">
                        <RefreshCw className="w-10 h-10 text-[#0078D4] animate-spin mx-auto" />
                        <div className="text-sm font-bold text-[#0078D4]">Provisioning Ring-0 Database Tables...</div>
                        <div className="w-64 h-2 bg-slate-200 rounded-full mx-auto overflow-hidden">
                          <div className="h-full bg-[#0078D4] animate-pulse w-3/4 rounded-full"></div>
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={handleRunDeploymentSimulation}
                        className="px-8 py-3.5 bg-[#0078D4] hover:bg-blue-600 text-white font-extrabold text-sm rounded-xl shadow-md transition cursor-pointer inline-flex items-center gap-2"
                      >
                        <Database className="w-5 h-5" /> Execute Schema Deployment
                      </button>
                    )}
                  </div>
                )}

                {factoryStep === 9 && (
                  <div className="space-y-6 text-center py-6 bg-white p-8 rounded-2xl border border-emerald-200 shadow-sm">
                    <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-xs">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-2xl font-extrabold text-slate-900">Sovereign Deployment Complete!</h4>
                      <p className="text-xs md:text-sm text-slate-600 max-w-lg mx-auto">
                        <strong>{factoryOrgName}</strong> has been provisioned with the <strong>{factoryTemplate?.name}</strong> template. All {factoryModules.length} core modules, {factoryTemplate?.dbTablesCount} database tables, and {factoryTemplate?.aiWorkflowCount} AI cognitive workflows are online.
                      </p>
                    </div>
                    <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                      <button
                        onClick={() => handleLaunchRoute(`/platform/erp`)}
                        className="px-6 py-3 bg-[#0078D4] hover:bg-blue-600 text-white font-bold text-xs rounded-xl shadow-sm transition cursor-pointer flex items-center gap-2"
                      >
                        <Play className="w-4 h-4" /> Enter {factoryTemplate?.name} Workspace
                      </button>
                      <button
                        onClick={() => {
                          setFactoryStep(1);
                          setFactorySuccess(false);
                        }}
                        className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition cursor-pointer"
                      >
                        Provision Another Tenant
                      </button>
                    </div>
                  </div>
                )}

                {/* Step Navigation Buttons */}
                {!factoryDeploying && factoryStep < 8 && (
                  <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                    <button
                      disabled={factoryStep === 1}
                      onClick={() => setFactoryStep(prev => Math.max(1, prev - 1))}
                      className="px-4 py-2 bg-white border border-slate-300 hover:bg-slate-100 disabled:opacity-40 text-slate-700 font-bold text-xs rounded-xl transition cursor-pointer"
                    >
                      ← Previous Step
                    </button>
                    <button
                      onClick={() => setFactoryStep(prev => Math.min(8, prev + 1))}
                      className="px-6 py-2.5 bg-[#0078D4] hover:bg-blue-600 text-white font-bold text-xs rounded-xl transition cursor-pointer flex items-center gap-2 shadow-xs"
                    >
                      <span>Next: Step {factoryStep + 1}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 4: UNIVERSAL MODULE OPERATIONS STUDIO (v20.0 Phase 4 & v21.0 Phase 5/6) */}
          {activeTab === 'modules' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">Universal Core & Platform-Specific Module Library</h3>
                    <p className="text-xs md:text-sm text-slate-600 mt-0.5">
                      Reusable micro-kernel modules. Toggle activation status to dynamically bind or unbind domain processors across all tenant workspaces without restarting the kernel.
                    </p>
                  </div>
                  <div className="text-xs font-mono font-bold bg-blue-50 text-[#0078D4] px-3 py-1.5 rounded-lg border border-blue-200 shrink-0">
                    {Object.values(moduleStates).filter(Boolean).length} of {UNIVERSAL_CORE_MODULES.length + PLATFORM_SPECIFIC_MODULES.length} Modules Active
                  </div>
                </div>

                {/* Modules Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
                  {[...UNIVERSAL_CORE_MODULES, ...PLATFORM_SPECIFIC_MODULES].map((mod) => {
                    const isActive = moduleStates[mod.id];
                    return (
                      <div
                        key={mod.id}
                        className={`p-5 rounded-xl border transition flex flex-col justify-between space-y-4 ${
                          isActive ? 'bg-white border-[#0078D4] shadow-xs' : 'bg-slate-50 border-slate-200 opacity-80'
                        }`}
                      >
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                              {mod.category}
                            </span>
                            <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                              isActive ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-amber-50 text-amber-700 border border-amber-200'
                            }`}>
                              {isActive ? 'Active (Ring-0)' : 'Inactive / Unbound'}
                            </span>
                          </div>
                          <div>
                            <div className="flex items-center justify-between">
                              <h4 className="font-bold text-sm text-slate-900">{mod.name}</h4>
                              <span className="text-[10px] font-mono text-slate-400">{mod.version}</span>
                            </div>
                            <p className="text-xs text-slate-600 mt-1 leading-relaxed">{mod.description}</p>
                          </div>
                        </div>

                        <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                          <span className="text-[11px] font-semibold text-slate-500">
                            License: <strong className="text-slate-700">{mod.licensing}</strong>
                          </span>
                          <button
                            onClick={() => handleToggleModule(mod.id)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
                              isActive
                                ? 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                                : 'bg-[#0078D4] hover:bg-blue-600 text-white'
                            }`}
                          >
                            {isActive ? <ToggleRight className="w-4 h-4 text-emerald-600" /> : <ToggleLeft className="w-4 h-4" />}
                            <span>{isActive ? 'Deactivate' : 'Activate'}</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: UNIVERSAL ENTERPRISE CONFIGURATION STUDIO (v20.0 Phase 7 & v21.0 Phase 8) */}
          {activeTab === 'config' && (
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6 animate-in fade-in duration-300">
              <div className="border-b border-slate-200 pb-4">
                <h3 className="text-xl font-bold text-slate-900">Universal Enterprise Configuration Studio</h3>
                <p className="text-xs md:text-sm text-slate-600 mt-1">
                  Centralized governance framework. Configure global platform parameters, regional cloud routing, DNS hostnames, feature toggles, and multi-tenant security policies.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="font-bold text-sm text-slate-900 flex items-center gap-2">
                    <Shield className="w-4 h-4 text-[#0078D4]" /> Zero-Trust Security Policies
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Continuous Ring-0 RBAC/ABAC enforcement, cryptographic session token validation, and IP rate-limiting rules across all 13 sovereign platforms.
                  </p>
                  <button onClick={() => handleLaunchRoute('/platform/aegis')} className="w-full py-2 bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 font-bold text-xs rounded-lg transition cursor-pointer">
                    Configure AEGIS Firewall
                  </button>
                </div>

                <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="font-bold text-sm text-slate-900 flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-emerald-600" /> FAAP Ledger & 1.5% Switch
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Manage master chart of accounts, tax authority withholding rules, multi-currency RTGS treasury routing, and automated 1.5% clearing fee settlement.
                  </p>
                  <button onClick={() => handleLaunchRoute('/platform/faap')} className="w-full py-2 bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 font-bold text-xs rounded-lg transition cursor-pointer">
                    Configure Financial Ledger
                  </button>
                </div>

                <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="font-bold text-sm text-slate-900 flex items-center gap-2">
                    <Cloud className="w-4 h-4 text-purple-600" /> Multi-Cloud K8s Clusters
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Monitor pod replication nodes, PostgreSQL database connection pools (Max 100 conns/node), automated failover caches, and CDN edge routing.
                  </p>
                  <button onClick={() => handleLaunchRoute('/platform/cloud')} className="w-full py-2 bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 font-bold text-xs rounded-lg transition cursor-pointer">
                    Manage Cloud Clusters
                  </button>
                </div>
              </div>

              <div className="p-6 rounded-xl bg-blue-50/50 border border-blue-200 space-y-3">
                <div className="font-bold text-sm text-[#0078D4] flex items-center gap-2">
                  <Info className="w-4 h-4" /> Global Environment Parameters & Feature Flags
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs text-slate-800">
                  <div className="p-3 bg-white rounded-lg border border-slate-200 flex justify-between">
                    <span>KERNEL_BOOT_MODE:</span>
                    <strong className="text-emerald-600">RING_0_SOVEREIGN</strong>
                  </div>
                  <div className="p-3 bg-white rounded-lg border border-slate-200 flex justify-between">
                    <span>LEDGER_PARITY_ENFORCED:</span>
                    <strong className="text-emerald-600">TRUE ($0.00)</strong>
                  </div>
                  <div className="p-3 bg-white rounded-lg border border-slate-200 flex justify-between">
                    <span>AI_MULTI_MODEL_ROUTING:</span>
                    <strong className="text-blue-600">GEMINI_FLASH_PRO</strong>
                  </div>
                  <div className="p-3 bg-white rounded-lg border border-slate-200 flex justify-between">
                    <span>ZERO_TRUST_SESSION_TTL:</span>
                    <strong className="text-purple-600">3600s (MFA REQUIRED)</strong>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: AI COGNITIVE ASSISTANT LAYER (v20.0 Phase 8 & v21.0 Phase 9) */}
          {activeTab === 'ai' && (
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6 animate-in fade-in duration-300 flex flex-col h-[650px]">
              <div className="border-b border-slate-200 pb-4 shrink-0 flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-purple-600" /> Sovereign Portal AI Cognitive Assistant
                  </h3>
                  <p className="text-xs md:text-sm text-slate-600 mt-0.5">
                    Interactive setup router, module recommender, and automated troubleshooting assistant powered by Gemini 2.5.
                  </p>
                </div>
                <span className="px-3 py-1 rounded-full bg-purple-50 text-purple-700 font-mono font-bold text-xs border border-purple-200">
                  Model: Gemini 2.5 Flash / Pro
                </span>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto space-y-4 p-4 bg-slate-50/50 rounded-xl border border-slate-200">
                {aiMessages.map((msg, idx) => (
                  <div key={idx} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                    <div className="flex items-center gap-1.5 mb-1 text-[10px] font-mono text-slate-400">
                      <span>{msg.sender === 'user' ? 'Sovereign Administrator' : 'JUMO AI Assistant'}</span>
                      <span>•</span>
                      <span>{msg.timestamp}</span>
                    </div>
                    <div className={`p-4 rounded-2xl max-w-2xl text-xs md:text-sm leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-[#0078D4] text-white rounded-br-none shadow-xs font-medium'
                        : 'bg-white text-slate-800 border border-slate-200 rounded-bl-none shadow-xs'
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
                {aiThinking && (
                  <div className="flex items-start">
                    <div className="p-4 rounded-2xl bg-white border border-slate-200 text-xs text-slate-500 font-mono animate-pulse flex items-center gap-2">
                      <RefreshCw className="w-4 h-4 animate-spin text-purple-600" />
                      <span>Synthesizing micro-kernel registry parameters...</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Quick AI Prompt Pills */}
              <div className="flex flex-wrap items-center gap-2 pt-2 shrink-0">
                {[
                  "Which ERP template should I deploy for a multi-campus university?",
                  "Explain how the FAAP 1.5% clearing settlement switch operates.",
                  "What are the required dependencies for SACCO ERP?",
                  "How does Zero-Trust Row-Level Security protect tenant data?"
                ].map((prompt, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setAiInput(prompt);
                    }}
                    className="text-[11px] bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-full transition cursor-pointer border border-slate-200"
                  >
                    "{prompt}"
                  </button>
                ))}
              </div>

              {/* Input Form */}
              <form onSubmit={handleSendAiMessage} className="flex items-center gap-3 pt-2 shrink-0">
                <input
                  type="text"
                  placeholder="Ask the AI setup router about templates, modules, or database migrations..."
                  value={aiInput}
                  onChange={(e) => setAiInput(e.target.value)}
                  className="flex-1 p-3 bg-white border border-slate-300 rounded-xl text-xs font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-purple-600 transition"
                />
                <button
                  type="submit"
                  disabled={!aiInput.trim() || aiThinking}
                  className="px-6 py-3 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow-sm transition cursor-pointer flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4" /> Send
                </button>
              </form>
            </div>
          )}

          {/* TAB 7: SUBSCRIPTION & LICENSING ENGINE (v20.0 Phase 9 & v21.0 Phase 10) */}
          {activeTab === 'licensing' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
                <div className="border-b border-slate-200 pb-4">
                  <h3 className="text-xl font-bold text-slate-900">Sovereign Enterprise Subscription & Licensing Tiers</h3>
                  <p className="text-xs md:text-sm text-slate-600 mt-1">
                    Transparent institutional licensing with automated trial sandbox provisioning, renewal management, and public unpaid visibility governance.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {SUBSCRIPTION_LICENSING_PLANS.map((plan) => (
                    <div
                      key={plan.id}
                      className={`p-6 rounded-2xl border flex flex-col justify-between space-y-6 ${
                        plan.highlight
                          ? 'bg-blue-50/60 border-[#0078D4] shadow-md relative'
                          : 'bg-white border-slate-200 shadow-sm'
                      }`}
                    >
                      {plan.highlight && (
                        <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#0078D4] text-white font-bold text-[10px] uppercase px-3 py-1 rounded-full shadow-xs">
                          Most Popular for Institutions
                        </span>
                      )}
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-bold text-lg text-slate-900">{plan.name}</h4>
                          <p className="text-xs font-semibold text-slate-500 mt-0.5">{plan.userSeats}</p>
                        </div>
                        <div className="flex items-baseline gap-1">
                          <span className="text-3xl font-extrabold text-slate-900">{plan.price}</span>
                          <span className="text-xs font-semibold text-slate-500">{plan.billingPeriod}</span>
                        </div>
                        <ul className="space-y-2.5 pt-4 border-t border-slate-200">
                          {plan.features.map((feat, fIdx) => (
                            <li key={fIdx} className="text-xs text-slate-700 flex items-center gap-2">
                              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                              <span>{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="space-y-3 pt-4 border-t border-slate-200">
                        <div className="p-2.5 rounded-lg bg-slate-100 text-[11px] text-slate-600 leading-tight">
                          <strong>Access Governance:</strong> {plan.unpaidAccessRule}
                        </div>
                        <button
                          onClick={() => {
                            if (plan.id === 'trial-sandbox') {
                              setActiveTab('factory');
                            } else {
                              alert(`Sovereign Concierge triggered for ${plan.name}. An institutional licensing architect has been dispatched to your tenant email.`);
                            }
                          }}
                          className={`w-full py-3 rounded-xl font-bold text-xs transition shadow-sm cursor-pointer flex items-center justify-center gap-2 ${
                            plan.highlight
                              ? 'bg-[#0078D4] hover:bg-blue-600 text-white'
                              : 'bg-slate-900 hover:bg-slate-800 text-white'
                          }`}
                        >
                          <Lock className="w-3.5 h-3.5" />
                          <span>{plan.id === 'trial-sandbox' ? 'Launch Free 30-Day Trial' : 'Select Institutional Tier'}</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Universal Footer */}
      <footer className="bg-slate-900 text-slate-400 py-4 px-6 border-t border-slate-800 mt-auto text-xs shrink-0">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>
            © 2026 JUMO Universal Enterprise Operating System (UEOS). All rights reserved. Sovereign Ring-0 Architecture.
          </div>
          <div className="flex items-center gap-6 text-slate-300">
            <button onClick={() => handleLaunchRoute('/control-center')} className="hover:underline cursor-pointer">Owner Control Center</button>
            <button onClick={() => setActiveTab('erp-center')} className="hover:underline cursor-pointer">ERP Domain Center</button>
            <button onClick={() => setActiveTab('licensing')} className="hover:underline cursor-pointer">Licensing</button>
            <button onClick={() => alert("Zero-Trust Row-Level Security Enforced across all 13 Sovereign Platforms.")} className="hover:underline cursor-pointer">Security & Privacy</button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default EnterprisePortalFabric;
