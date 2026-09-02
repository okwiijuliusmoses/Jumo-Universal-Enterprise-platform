import React, { ReactNode, useState, useEffect, useMemo } from 'react';
import { 
  ArrowLeft, Search, CheckCircle2, ShieldCheck, UserCheck, 
  ChevronRight, LayoutGrid, FileText, BarChart3, Layers, Sliders, Shield, RefreshCw
} from 'lucide-react';

export interface OfficerPortalOption {
  id: string;
  code: string;
  title: string;
  role: string;
  office: string;
  directorate: string;
  moduleIds: string[];
  icon?: any;
}

export interface SidebarModuleOption {
  id: string;
  code: string;
  name: string;
  description?: string;
  icon?: any;
}

export interface EnterpriseWorkspaceLayoutProps {
  productCode: string;
  productName: string;
  benchmarkBadge: string;
  productIcon: any;
  badgeThemeClass?: string;
  
  // Officer Portals
  portals: OfficerPortalOption[];
  activePortalId: string;
  onPortalChange: (portalId: string) => void;

  // Sidebar Modules
  modules: SidebarModuleOption[];
  activeModuleId: string;
  onModuleChange: (moduleId: string) => void;

  // Tabs
  activeTab: 'RECORDS' | 'FORM' | 'ANALYTICS' | string;
  onTabChange: (tab: any) => void;
  customTabs?: Array<{ id: string; label: string; icon?: any }>;

  // Search
  searchQuery?: string;
  onSearchChange?: (q: string) => void;

  // Execution Toast / Status
  executionMessage?: string | null;
  onDismissExecutionMessage?: () => void;

  // Navigation
  onBackToLauncher?: () => void;

  // Main Workspace Content
  children: ReactNode;

  // Extra Header Actions
  headerActions?: ReactNode;
}

export function EnterpriseWorkspaceLayout({
  productCode,
  productName,
  benchmarkBadge,
  productIcon: ProductIcon,
  badgeThemeClass = 'bg-slate-100 text-slate-800 border-slate-300',
  portals,
  activePortalId,
  onPortalChange,
  modules,
  activeModuleId,
  onModuleChange,
  activeTab,
  onTabChange,
  customTabs,
  searchQuery = '',
  onSearchChange,
  executionMessage,
  onDismissExecutionMessage,
  onBackToLauncher,
  children,
  headerActions
}: EnterpriseWorkspaceLayoutProps) {
  const currentPortal = portals.find(p => p.id === activePortalId) || portals[0];
  const currentModule = modules.find(m => m.id === activeModuleId) || modules[0];

  const [isWorkspaceLoading, setIsWorkspaceLoading] = useState(false);

  // Trigger loading overlay on module or portal or tab transitions to eliminate layout shifts
  useEffect(() => {
    setIsWorkspaceLoading(true);
    const timer = setTimeout(() => {
      setIsWorkspaceLoading(false);
    }, 180);
    return () => clearTimeout(timer);
  }, [activeModuleId, activePortalId, activeTab]);

  // Compute dynamic sidebar grid track width based on product name and longest module title length
  const dynamicSidebarWidthPx = useMemo(() => {
    const nameLength = productName.length;
    const maxModuleLen = Math.max(0, ...modules.map(m => (m.name || '').length));
    const combinedMax = Math.max(nameLength, maxModuleLen);

    if (combinedMax > 34) return '336px';
    if (combinedMax > 26) return '300px';
    if (combinedMax > 18) return '268px';
    return '240px';
  }, [productName, modules]);

  const defaultTabs = [
    { id: 'RECORDS', label: 'Operational Records', icon: FileText },
    { id: 'FORM', label: 'Data Entry & Actions', icon: Sliders },
    { id: 'ANALYTICS', label: 'Analytics & Compliance', icon: BarChart3 }
  ];

  const renderTabs = customTabs || defaultTabs;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans antialiased selection:bg-slate-900 selection:text-white" id="jumo-ueos-app-root">
      
      {/* 1. TOP BRANDING & APPS LAUNCHER BAR */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex flex-wrap items-center justify-between gap-4">
          
          <div className="flex items-center gap-3.5">
            {onBackToLauncher && (
              <button
                onClick={onBackToLauncher}
                className="p-2 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 transition-all cursor-pointer flex items-center gap-1.5 text-xs font-bold tracking-tight"
                title="Return to Sovereign Products Grid"
              >
                <ArrowLeft className="w-4 h-4 text-slate-600" />
                <span className="hidden sm:inline font-mono text-[11px] uppercase tracking-wider">Launcher</span>
              </button>
            )}

            <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold shadow-xs shrink-0">
              <ProductIcon className="w-5 h-5 text-emerald-400" />
            </div>

            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[11px] font-mono font-bold tracking-wider text-slate-500 uppercase">{productCode}</span>
                <span className={`text-[10px] font-bold font-sans tracking-wide px-2 py-0.5 rounded-md border ${badgeThemeClass}`}>
                  {benchmarkBadge}
                </span>
                <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-mono font-bold tracking-wider px-2 py-0.5 rounded-md flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" /> SYSTEM ONLINE
                </span>
              </div>
              <h1 className="mt-0.5">{productName}</h1>
            </div>
          </div>

          {/* RIGHT SIDE ACTIONS / QUICK SEARCH */}
          <div className="flex items-center gap-3">
            {onSearchChange && (
              <div className="relative w-48 sm:w-64">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Search workspace..."
                  value={searchQuery}
                  onChange={e => onSearchChange(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-slate-400 font-medium tracking-normal text-slate-900 placeholder:text-slate-400"
                />
              </div>
            )}
            {headerActions}
          </div>
        </div>

        {/* 2. OFFICER PORTAL SWITCHER STRIP */}
        <div className="bg-slate-900 text-white px-4 sm:px-6 py-2 overflow-x-auto border-t border-slate-800">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 min-w-max text-xs">
            <div className="flex items-center gap-2.5">
              <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-widest shrink-0 flex items-center gap-1.5">
                <UserCheck className="w-3.5 h-3.5 text-emerald-400" /> OFFICER PORTAL:
              </span>
              <div className="flex items-center gap-1.5 overflow-x-auto">
                {portals.map(portal => {
                  const isActive = portal.id === activePortalId;
                  return (
                    <button
                      key={portal.id}
                      onClick={() => onPortalChange(portal.id)}
                      className={`px-3 py-1 rounded-lg text-xs font-bold tracking-tight transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                        isActive
                          ? 'bg-emerald-500 text-slate-950 font-black shadow-xs'
                          : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-700/50'
                      }`}
                    >
                      <span>{portal.title.split(' ')[0]} {portal.title.split(' ')[1]}</span>
                      {isActive && <ChevronRight className="w-3 h-3 text-slate-950" />}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="hidden lg:flex items-center gap-4 text-[11px] font-mono tracking-tight text-slate-400 border-l border-slate-800 pl-4">
              <span>OFFICE: <strong className="text-slate-200 font-semibold">{currentPortal.office}</strong></span>
              <span>•</span>
              <span>DESK: <strong className="text-slate-200 font-semibold">{currentPortal.role}</strong></span>
            </div>
          </div>
        </div>

        {/* 3. ACTIVE OFFICER BANNER */}
        <div className="bg-slate-100 border-b border-slate-200 px-4 sm:px-6 py-2">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2 text-xs font-mono tracking-tight text-slate-700">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span><strong className="font-bold text-slate-900">ACTIVE OFFICER PORTAL:</strong> {currentPortal.title}</span>
            </div>
            <div className="text-[11px] text-slate-500 font-mono tracking-tight">
              DIRECTORATE: <span className="text-slate-900 font-bold uppercase">{currentPortal.directorate}</span>
            </div>
          </div>
        </div>
      </header>

      {/* 4. TWO-COLUMN MAIN BODY: CSS GRID WITH DYNAMIC SIDEBAR + DEDICATED WORKSPACE LAYOUT AREA */}
      <div 
        className="jumo-enterprise-grid max-w-7xl w-full mx-auto flex-1 gap-6 p-4 sm:p-6 md:p-8"
        style={{
          gridTemplateColumns: `minmax(0, ${dynamicSidebarWidthPx}) minmax(0, 1fr)`
        }}
      >
        
        {/* LEFT SIDEBAR NAVIGATION AREA */}
        <aside className="jumo-sidebar-area w-full shrink-0 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-4 space-y-3">
            <div className="flex items-center justify-between pb-2.5 border-b border-slate-100">
              <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                <LayoutGrid className="w-3.5 h-3.5 text-slate-500" />
                PORTAL MODULES
              </span>
              <span className="text-[10px] font-mono font-bold bg-slate-100 px-2 py-0.5 rounded-md text-slate-600 border border-slate-200">
                {modules.length} Active
              </span>
            </div>

            <nav className="space-y-1">
              {modules.map(module => {
                const isActive = module.id === activeModuleId;
                const ModuleIcon = module.icon || Layers;
                return (
                  <button
                    key={module.id}
                    onClick={() => onModuleChange(module.id)}
                    className={`w-full p-2.5 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-3 ${
                      isActive 
                        ? 'bg-slate-900 text-white border-slate-900 shadow-xs font-bold' 
                        : 'bg-white border-slate-100 text-slate-700 hover:bg-slate-50 hover:border-slate-200'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                      isActive ? 'bg-slate-800 text-emerald-400' : 'bg-slate-100 text-slate-600'
                    }`}>
                      <ModuleIcon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="opacity-75 module-code">{module.code}</div>
                      <div className="truncate module-title">{module.name}</div>
                    </div>
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-xs space-y-2 text-emerald-950">
            <div className="font-bold flex items-center gap-1.5 tracking-tight">
              <Shield className="w-4 h-4 text-emerald-700" /> Statutory Compliance
            </div>
            <p className="text-[11px] text-emerald-800 leading-relaxed font-normal">
              Operating under authenticated RBAC credentials for <strong className="font-semibold text-emerald-950">{currentPortal.role}</strong>.
            </p>
          </div>
        </aside>

        {/* RIGHT DEDICATED WORKSPACE MODULE LAYOUT AREA */}
        <main className="jumo-workspace-area space-y-6 min-w-0">
          
          {/* WORKSPACE BREADCRUMBS */}
          <div className="breadcrumb-container flex items-center gap-1.5 text-xs text-slate-500 font-medium px-1">
            <span>{productName}</span>
            <ChevronRight className="w-3 h-3 text-slate-400" />
            <span>{currentPortal.title}</span>
            <ChevronRight className="w-3 h-3 text-slate-400" />
            <span className="breadcrumb-active text-slate-900 font-bold">{currentModule?.name}</span>
          </div>

          {/* WORKSPACE HEADER BAR */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold tracking-wider text-slate-400 uppercase">{currentModule?.code}</span>
                <span className="text-[10px] font-bold font-mono tracking-wide px-2 py-0.5 bg-slate-100 text-slate-700 rounded-md border border-slate-200 uppercase">
                  {currentPortal.code}
                </span>
              </div>
              <h2 className="mt-1">{currentModule?.name}</h2>
              {currentModule?.description && (
                <p className="text-xs font-medium text-slate-600 mt-1 leading-relaxed">{currentModule.description}</p>
              )}
            </div>

            {/* TAB SELECTOR */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 shrink-0 self-start md:self-auto">
              {renderTabs.map(tab => {
                const TabIcon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => onTabChange(tab.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold tracking-tight transition-all cursor-pointer flex items-center gap-1.5 ${
                      isActive 
                        ? 'bg-white text-slate-900 shadow-xs border border-slate-200 font-extrabold' 
                        : 'text-slate-600 hover:text-slate-900 font-semibold'
                    }`}
                  >
                    {TabIcon && <TabIcon className="w-3.5 h-3.5" />}
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* EXECUTION MESSAGE TOAST */}
          {executionMessage && (
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-xs text-emerald-900 flex items-start justify-between gap-3 shadow-xs font-sans">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div className="font-semibold leading-relaxed tracking-tight">{executionMessage}</div>
              </div>
              {onDismissExecutionMessage && (
                <button 
                  onClick={onDismissExecutionMessage} 
                  className="text-emerald-700 hover:text-emerald-950 font-bold text-xs shrink-0 cursor-pointer tracking-tight"
                >
                  Dismiss
                </button>
              )}
            </div>
          )}

          {/* WORKSPACE CHILDREN CONTENT WITH CONSISTENT CSS-BASED LOADING OVERLAY */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 md:p-8 min-h-[480px] relative">
            {isWorkspaceLoading && (
              <div className="jumo-loading-overlay">
                <div className="flex items-center gap-3 bg-slate-900 text-white px-4 py-2.5 rounded-xl text-xs font-bold shadow-md font-sans tracking-tight">
                  <RefreshCw className="w-4 h-4 text-emerald-400 animate-spin" />
                  <span>Loading {currentModule?.name || 'Workspace'}...</span>
                </div>
              </div>
            )}
            {children}
          </div>
        </main>
      </div>

      {/* 5. FOOTER */}
      <footer className="bg-white border-t border-slate-200 py-4 px-6 text-xs text-slate-500 font-mono mt-auto tracking-tight">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>
            <strong className="font-bold text-slate-900">JUMO ENTERPRISE SYSTEM</strong> — {productName} ({productCode})
          </div>
          <div className="flex items-center gap-4 text-[11px] font-mono">
            <span>FAAP Ledger: <strong className="text-slate-700 font-bold">ONLINE</strong></span>
            <span>Digital Pay Switch: <strong className="text-slate-700 font-bold">CONNECTED</strong></span>
            <span>Security Encryption: <strong className="text-emerald-600 font-bold">ACTIVE</strong></span>
          </div>
        </div>
      </footer>
    </div>
  );
}
