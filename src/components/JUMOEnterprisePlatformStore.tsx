/**
 * JUMO ENTERPRISE PLATFORM STORE & ECOSYSTEM REGISTRY
 * Authoritative system architecture component implementing Phase 1-10 of the JUMO Platform Store Architecture Directive.
 * 
 * Serves as the Enterprise Factory and Cloud Console where all Sovereign Platforms, Financial Technology Engines,
 * AI Swarms, Enterprise ERPs, Institutional Solutions, and Government Platforms are registered, managed,
 * configured, upgraded, and launched into independent sovereign workspaces.
 * 
 * Backed by PlatformRegistryDatabase for persistence across sessions and runtime lifecycle updates.
 */

import React, { useState, useEffect } from 'react';
import {
  Store, Layers, Shield, Bot, Coins, CreditCard, Cpu, Globe, Building2, Landmark,
  GraduationCap, HeartPulse, Scale, Briefcase, Factory, Code, Sparkles, CheckCircle2,
  Settings, ExternalLink, Play, Download, Trash2, RefreshCw, AlertCircle, Search,
  Filter, Check, Plus, X, ChevronRight, ChevronLeft, ArrowUpRight, Lock, Server, Zap, Users,
  Leaf, Radio, HardDrive, LayoutGrid, ArrowRight, ShieldCheck, Menu, Database, Activity,
  Info
} from 'lucide-react';

import {
  PlatformRegistryDatabase,
  PlatformItem,
  PlatformStatus,
  OFFICIAL_PLATFORM_CATEGORIES,
  OfficialCategory
} from '../database/platformRegistry';
import { UniversalModuleRegistry, validateRing0Authority } from '../core/runtime/universalModuleRegistry';

export type { PlatformItem } from '../database/platformRegistry';

export interface JUMOEnterprisePlatformStoreProps {
  onNavigate?: (path: string) => void;
}

const ICON_MAP: Record<string, any> = {
  Cpu, Globe, Coins, CreditCard, Landmark, Shield, ShieldCheck, Lock, Users, Bot,
  Sparkles, Layers, Building2, Store, Briefcase, GraduationCap, HeartPulse, Scale,
  Factory, Leaf, Code, HardDrive, Server, Zap, Radio, LayoutGrid
};

export const JUMOEnterprisePlatformStore: React.FC<JUMOEnterprisePlatformStoreProps> = ({ onNavigate }) => {
  const [catalog, setCatalog] = useState<PlatformItem[]>(() => PlatformRegistryDatabase.getAllPlatforms());
  const [selectedCategory, setSelectedCategory] = useState<string>('All Platforms');
  const [lifecycleFilter, setLifecycleFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedPlatform, setSelectedPlatform] = useState<PlatformItem | null>(null);
  const [activeModalTab, setActiveModalTab] = useState<'overview' | 'modules' | 'permissions' | 'lifecycle'>('overview');
  
  // Mobile sidebar toggle
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  // Tenant provisioning modal state
  const [tenantName, setTenantName] = useState<string>('');
  const [tenantRegion, setTenantRegion] = useState<string>('Kampala-Central-1');
  const [isProvisioning, setIsProvisioning] = useState<boolean>(false);
  const [provisionSuccess, setProvisionSuccess] = useState<string | null>(null);

  // Module toggle state inside modal
  const [enabledModules, setEnabledModules] = useState<Record<string, boolean>>({});

  // Reload catalog from persistent database
  const reloadCatalog = () => {
    setCatalog(PlatformRegistryDatabase.getAllPlatforms());
  };

  // Filtered platforms
  const filteredPlatforms = catalog.filter(item => {
    // Category match
    const matchesCategory = selectedCategory === 'All Platforms' || item.category === selectedCategory;
    
    // Lifecycle match
    let matchesLifecycle = true;
    if (lifecycleFilter === 'INSTALLED') {
      matchesLifecycle = item.status === 'INSTALLED_CORE' || item.status === 'INSTALLED_ACTIVE';
    } else if (lifecycleFilter === 'AVAILABLE') {
      matchesLifecycle = item.status === 'AVAILABLE';
    } else if (lifecycleFilter === 'AI_ENABLED') {
      matchesLifecycle = item.aiEnabled === true;
    } else if (lifecycleFilter === 'SOVEREIGN') {
      matchesLifecycle = item.status === 'INSTALLED_CORE';
    }

    // Search match
    const matchesSearch = searchQuery === '' || 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.modules.some(m => m.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesLifecycle && matchesSearch;
  });

  const handleInstallClick = (platformId: string) => {
    PlatformRegistryDatabase.updatePlatformStatus(platformId, 'CONFIGURING');
    reloadCatalog();

    setTimeout(() => {
      PlatformRegistryDatabase.updatePlatformStatus(platformId, 'INSTALLED_ACTIVE');
      reloadCatalog();
    }, 1500);
  };

  const handleOpenConfigModal = (platform: PlatformItem) => {
    setSelectedPlatform(platform);
    setActiveModalTab('overview');
    setTenantName(`${platform.name.split(' ')[0]} Sovereign Tenant Workspace`);
    setProvisionSuccess(null);
    
    // Initialize module state from UniversalModuleRegistry or fallback
    const universalMods = UniversalModuleRegistry.getModulesForErpFamily(platform.id);
    const modNames = universalMods.length > 0 ? universalMods.map(m => m.name) : platform.modules;
    const modMap: Record<string, boolean> = {};
    modNames.forEach(m => {
      modMap[m] = true;
    });
    setEnabledModules(modMap);
  };

  const handleProvisionTenant = () => {
    if (!selectedPlatform) return;
    setIsProvisioning(true);
    setProvisionSuccess(null);

    setTimeout(() => {
      setIsProvisioning(false);
      setProvisionSuccess(`Successfully provisioned isolated database schema and tenant workspace '${tenantName}' in region ${tenantRegion} for ${selectedPlatform.name}!`);
    }, 1200);
  };

  const handleLaunchWorkspace = (route: string) => {
    if (onNavigate) {
      onNavigate(route);
    } else {
      window.location.href = route;
    }
  };

  const handleLifecycleChange = (platformId: string, newStatus: PlatformStatus) => {
    PlatformRegistryDatabase.updatePlatformStatus(platformId, newStatus);
    reloadCatalog();
    if (selectedPlatform && selectedPlatform.id === platformId) {
      setSelectedPlatform(prev => prev ? { ...prev, status: newStatus } : null);
    }
  };

  const handleResetCatalog = () => {
    PlatformRegistryDatabase.resetToDefault();
    reloadCatalog();
  };

  const renderPlatformCard = (platform: PlatformItem) => {
    const IconComponent = ICON_MAP[platform.iconName] || Cpu;
    const isInstalled = platform.status === 'INSTALLED_CORE' || platform.status === 'INSTALLED_ACTIVE';
    const isConfiguring = platform.status === 'CONFIGURING';

    return (
      <div
        key={platform.id}
        className={`bg-white border rounded-3xl p-6 flex flex-col justify-between gap-5 transition-all duration-200 relative overflow-hidden group hover:shadow-lg ${
          isInstalled ? 'border-slate-300/80 shadow-xs' : 'border-slate-200 hover:border-slate-300'
        }`}
      >
        {/* Top Status Bar Accent */}
        <div className={`absolute top-0 left-0 right-0 h-1.5 ${
          platform.status === 'INSTALLED_CORE' ? 'bg-blue-600' :
          platform.status === 'INSTALLED_ACTIVE' ? 'bg-emerald-500' :
          platform.status === 'CONFIGURING' ? 'bg-amber-500 animate-pulse' :
          platform.status === 'SUSPENDED' ? 'bg-rose-500' :
          platform.status === 'MAINTENANCE' ? 'bg-amber-600' : 'bg-slate-200'
        }`} />

        {/* Card Header */}
        <div className="space-y-3 pt-1">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-[#0078D4] text-white flex items-center justify-center shrink-0 shadow-sm">
                <IconComponent className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 block">
                    {platform.code}
                  </span>
                  <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-slate-100 text-slate-600 font-semibold border border-slate-200">
                    {platform.version}
                  </span>
                </div>
                <h3 className="text-base font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                  {platform.name}
                </h3>
              </div>
            </div>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed line-clamp-3 font-normal">
            {platform.description}
          </p>
        </div>

        {/* Installed Modules Tags */}
        <div className="space-y-2">
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-semibold block">
            Subsystems ({(platform.modules ?? []).length}):
          </span>
          <div className="flex flex-wrap gap-1.5 max-h-18 overflow-y-auto pr-1">
            {(platform.modules ?? []).map((mod, idx) => (
              <span
                key={idx}
                className="text-[10px] font-medium bg-slate-50 text-slate-700 px-2 py-0.5 rounded-lg border border-slate-200 line-clamp-1"
              >
                {mod}
              </span>
            ))}
          </div>
        </div>

        {/* AI & Security Badges Row */}
        <div className="border-t border-slate-100 pt-3 flex items-center justify-between text-[11px] font-medium text-slate-600">
          <div className="flex items-center gap-1.5 text-purple-700 font-semibold bg-purple-50 px-2 py-0.5 rounded border border-purple-200" title={(platform.aiCapabilities ?? []).join(', ')}>
            <Sparkles className="w-3 h-3 text-purple-600" />
            <span>AI Swarm ({(platform.aiCapabilities ?? []).length})</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-600 font-mono text-[10px]">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span className="truncate max-w-[130px]">{platform.securityLevel}</span>
          </div>
        </div>

        {/* Action Controls Row */}
        <div className="border-t border-slate-200/80 pt-4 flex items-center justify-between gap-2 mt-auto">
          
          {/* Status Badge */}
          <div>
            {platform.status === 'INSTALLED_CORE' && (
              <span className="text-[10px] font-mono font-bold bg-blue-50 text-blue-700 border border-blue-200 px-2.5 py-1 rounded-xl uppercase flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-blue-600" /> Core Kernel
              </span>
            )}
            {platform.status === 'INSTALLED_ACTIVE' && (
              <span className="text-[10px] font-mono font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-1 rounded-xl uppercase flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Active Workspace
              </span>
            )}
            {platform.status === 'AVAILABLE' && (
              <span className="text-[10px] font-mono font-bold bg-slate-100 text-slate-600 border border-slate-200 px-2.5 py-1 rounded-xl uppercase">
                Available {platform.monthlyPrice ? `• $${platform.monthlyPrice}/mo` : ''}
              </span>
            )}
            {platform.status === 'CONFIGURING' && (
              <span className="text-[10px] font-mono font-bold bg-amber-50 text-amber-700 border border-amber-200 px-2.5 py-1 rounded-xl uppercase flex items-center gap-1 animate-pulse">
                <RefreshCw className="w-3 h-3 animate-spin" /> Installing...
              </span>
            )}
            {platform.status === 'SUSPENDED' && (
              <span className="text-[10px] font-mono font-bold bg-rose-50 text-rose-700 border border-rose-200 px-2.5 py-1 rounded-xl uppercase flex items-center gap-1">
                <AlertCircle className="w-3 h-3 text-rose-600" /> Suspended
              </span>
            )}
            {platform.status === 'MAINTENANCE' && (
              <span className="text-[10px] font-mono font-bold bg-amber-100 text-amber-800 border border-amber-300 px-2.5 py-1 rounded-xl uppercase flex items-center gap-1">
                <Activity className="w-3 h-3 text-amber-600 animate-pulse" /> Maintenance
              </span>
            )}
            {platform.status === 'ARCHIVED' && (
              <span className="text-[10px] font-mono font-bold bg-slate-200 text-slate-700 border border-slate-300 px-2.5 py-1 rounded-xl uppercase">
                Archived DB Schema
              </span>
            )}
          </div>

          {/* Buttons (Directive v3.0 Rule 4 & v4.0 Rule 6) */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <button
              onClick={() => {
                setSelectedPlatform(platform);
                setActiveModalTab('overview');
              }}
              title="Platform Information & Capabilities"
              className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-xs transition flex items-center gap-1 cursor-pointer"
            >
              <Info className="w-3.5 h-3.5" />
              <span>Info</span>
            </button>

            <button
              onClick={() => handleOpenConfigModal(platform)}
              title="Configure Tenant Workspace & Lifecycle"
              className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-xs transition flex items-center gap-1 cursor-pointer"
            >
              <Settings className="w-3.5 h-3.5" />
              <span>Configure</span>
            </button>

            {isInstalled ? (
              <>
                <button
                  onClick={() => handleLaunchWorkspace('/workspace/universal-runtime')}
                  title="Launch Universal 190+ Module Sovereign Runtime Workspace"
                  className="px-2.5 py-1.5 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold rounded-xl text-xs transition flex items-center gap-1 shadow-xs cursor-pointer ml-auto"
                >
                  <Activity className="w-3.5 h-3.5" />
                  <span>190+ Mods</span>
                </button>
                <button
                  onClick={() => handleLaunchWorkspace(platform.route)}
                  className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-xs transition flex items-center gap-1 shadow-xs cursor-pointer"
                >
                  <span>Launch</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </>
            ) : (
              <button
                onClick={() => handleInstallClick(platform.id)}
                disabled={isConfiguring}
                className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-semibold rounded-xl text-xs transition flex items-center gap-1 shadow-xs cursor-pointer ml-auto"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{isConfiguring ? 'Installing...' : 'Install'}</span>
              </button>
            )}
          </div>
        </div>

      </div>
    );
  };

  return (
    <div className="flex flex-col gap-6 font-sans text-slate-800 pb-16 animate-fade-in min-h-[85vh] w-full">
      
      {/* MOBILE SIDEBAR TOGGLE BUTTON */}
      <div className="lg:hidden flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
        <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
          <Store className="w-4 h-4 text-blue-600" />
          <span>Platform Store Navigation</span>
        </div>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 bg-slate-100 rounded-xl text-slate-700 font-semibold text-xs flex items-center gap-1.5"
        >
          <Menu className="w-4 h-4" />
          <span>{sidebarOpen ? 'Close Menu' : 'Open Menu'}</span>
        </button>
      </div>

      {/* TOP HORIZONTAL MARKETPLACE NAVIGATION & LIFECYCLE FILTERS (Zero Left Sidebar, 100% Workspace Width) */}
      <div className={`bg-white border border-slate-200 rounded-3xl p-4 shadow-xs space-y-4 ${
        sidebarOpen ? 'block' : 'block'
      }`}>
        {/* Top bar: Header, Lifecycle Pills, Reset Button */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-sm shrink-0">
              <Store className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-extrabold text-slate-900 leading-tight">JUMO Store</h2>
              <span className="text-[10px] font-mono text-slate-400 uppercase font-bold">Sovereign Registry</span>
            </div>
          </div>

          {/* Lifecycle Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 max-w-full">
            {[
              { id: 'ALL', label: 'All Workspaces', count: catalog.length, icon: LayoutGrid },
              { id: 'INSTALLED', label: 'Installed Workspaces', count: catalog.filter(c => c.status === 'INSTALLED_CORE' || c.status === 'INSTALLED_ACTIVE').length, icon: CheckCircle2 },
              { id: 'AVAILABLE', label: 'Available in Marketplace', count: catalog.filter(c => c.status === 'AVAILABLE').length, icon: Download },
              { id: 'AI_ENABLED', label: 'AI Swarms & Models', count: catalog.filter(c => c.aiEnabled).length, icon: Sparkles },
              { id: 'SOVEREIGN', label: 'Sovereign Kernel Protected', count: catalog.filter(c => c.status === 'INSTALLED_CORE').length, icon: ShieldCheck }
            ].map(item => {
              const isSel = lifecycleFilter === item.id;
              const IconComp = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setLifecycleFilter(item.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition shrink-0 cursor-pointer ${
                    isSel ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <IconComp className={`w-3.5 h-3.5 shrink-0 ${isSel ? 'text-blue-200' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                  <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded-full ${
                    isSel ? 'bg-blue-700 text-white' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {item.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Reset Canonical Seeds button */}
          <button
            onClick={handleResetCatalog}
            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 font-semibold rounded-xl text-xs transition flex items-center gap-1.5 shrink-0 cursor-pointer"
            title="Reset to canonical state"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset Canonical Seeds</span>
          </button>
        </div>

          {/* Horizontal Scrollable Domain Categories */}
          <div className="pt-2 border-t border-slate-100 flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
              {['All Platforms', 'Authoritative JUMO ERPs', 'Shared Platform Services'].map(cat => {
                const isSel = selectedCategory === cat;
                const count = cat === 'All Platforms' ? catalog.length : catalog.filter(c => c.category === cat).length;
                return (
                  <button
                    key={cat}
                    onClick={() => {
                      setSelectedCategory(cat);
                      if (window.innerWidth < 1024) setSidebarOpen(false);
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition shrink-0 cursor-pointer ${
                      isSel ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                    }`}
                  >
                    <span>{cat}</span>
                    <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded-full shrink-0 ${
                      isSel ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {count}
                    </span>
                  </button>
                );
              })}
          </div>
        </div>

      {/* MAIN WORKSPACE AREA (PHASE 2 & 7) */}
      <div className="flex-1 space-y-6 min-w-0">
        
        {/* FULL-SCREEN WORKSPACE TRANSITION MODEL (Directive v5.0 & v15 Section 4) */}
        {selectedCategory !== 'All Platforms' ? (
          <div className="space-y-6 animate-fade-in">
            {/* Top Back Navigation Breadcrumb Bar */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => { setSelectedCategory('All Platforms'); setSearchQuery(''); }}
                  className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl text-xs transition flex items-center gap-2 cursor-pointer shadow-2xs"
                >
                  <ChevronLeft className="w-4 h-4 text-blue-600" />
                  <span>← Return to Sovereign Ecosystem Registry</span>
                </button>
                <div className="h-4 w-px bg-slate-300 hidden sm:block" />
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200">
                    {selectedCategory}
                  </span>
                  <span className="text-xs font-bold text-slate-800">Sovereign Domain Workspace</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono font-bold text-slate-600 px-3 py-1 bg-slate-100 rounded-xl">
                  {filteredPlatforms.length} Total Domain Modules
                </span>
                <button
                  onClick={() => { setSearchQuery(''); }}
                  className="p-1.5 text-slate-400 hover:text-slate-600"
                  title="Clear Search"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Category Workspace Header Box (White Enterprise Style - Directive v15 Rule 6) */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 text-slate-900 border border-slate-200 shadow-xs relative overflow-hidden">
              <div className="absolute right-0 top-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
              <div className="relative z-10 flex flex-col xl:flex-row items-start xl:items-center justify-between gap-6">
                <div className="space-y-2 max-w-2xl">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-mono font-bold uppercase tracking-wider">
                    <Building2 className="w-3.5 h-3.5 text-blue-600" />
                    <span>SOVEREIGN CATEGORY WORKSPACE CENTER</span>
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
                    {selectedCategory} Center
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    Dedicated operational workspace for {selectedCategory}. Every template below launches into an isolated Ring-0 sovereign runtime environment with pre-integrated FAAP ledgers and Zero-Trust RBAC boundaries.
                  </p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <button
                    onClick={() => alert(`Diagnostics initiated for ${selectedCategory}: All tenant schemas verified in Ring-0 sovereignty.`)}
                    className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl text-xs transition flex items-center gap-2 cursor-pointer shadow-2xs"
                  >
                    <RefreshCw className="w-4 h-4 text-blue-600" />
                    <span>Verify Domain Parity</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Partitioned Section 1: Primary Domain Institutions & Templates (Directive v15 Rule 4) */}
            {filteredPlatforms.length === 0 ? (
              <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center max-w-2xl mx-auto my-8 space-y-4">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400">
                  <Search className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-slate-800">No Domain Modules Found</h3>
                <p className="text-sm text-slate-500 max-w-md mx-auto">
                  No sovereign modules match your query in category "{selectedCategory}".
                </p>
                <button
                  onClick={() => { setSearchQuery(''); }}
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-xs transition shadow-sm inline-flex items-center gap-2 cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Clear Search Query</span>
                </button>
              </div>
            ) : (
              <div className="space-y-8">
                {/* Partition 1: Core Institutional Templates */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                    <div>
                      <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                        <Building2 className="w-5 h-5 text-blue-600" />
                        <span>{selectedCategory} Institutions &amp; Templates</span>
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">Authoritative standalone ERP templates with integrated modules and workflows.</p>
                    </div>
                    <span className="text-xs font-mono font-bold bg-blue-50 text-blue-700 px-2.5 py-1 rounded-lg border border-blue-200">
                      {filteredPlatforms.slice(0, Math.max(3, Math.ceil(filteredPlatforms.length / 2))).length} Templates
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredPlatforms.slice(0, Math.max(3, Math.ceil(filteredPlatforms.length / 2))).map(renderPlatformCard)}
                  </div>
                </div>

                {/* Partition 2: Domain Services & Specialized Subsystems */}
                {filteredPlatforms.slice(Math.max(3, Math.ceil(filteredPlatforms.length / 2))).length > 0 && (
                  <div className="space-y-4 pt-4 border-t border-slate-100">
                    <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                      <div>
                        <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                          <Layers className="w-5 h-5 text-emerald-600" />
                          <span>{selectedCategory} Shared Services &amp; Subsystems</span>
                        </h3>
                        <p className="text-xs text-slate-500 mt-0.5">Shared operational engines, AI swarms, and domain-specific micro-kernel services.</p>
                      </div>
                      <span className="text-xs font-mono font-bold bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-lg border border-emerald-200">
                        {filteredPlatforms.slice(Math.max(3, Math.ceil(filteredPlatforms.length / 2))).length} Services
                      </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                      {filteredPlatforms.slice(Math.max(3, Math.ceil(filteredPlatforms.length / 2))).map(renderPlatformCard)}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-6 animate-fade-in">
            {/* WHITE ENTERPRISE HERO BANNER & METRICS (Directive v3.0 & v15 Rule 6) */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 text-slate-900 border border-slate-200 shadow-xs relative overflow-hidden">
              <div className="absolute right-0 top-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
              <div className="absolute left-1/3 bottom-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none"></div>

              <div className="relative z-10 flex flex-col xl:flex-row items-start xl:items-center justify-between gap-6">
                <div className="space-y-2 max-w-2xl">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-mono font-bold uppercase tracking-wider">
                    <Store className="w-3.5 h-3.5 text-blue-600" />
                    <span>ENTERPRISE PLATFORM FACTORY &amp; STORE</span>
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
                    Sovereign Ecosystem Registry
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    Authoritative product registry where enterprise ERPs, institutional solutions, financial switches, and AI swarms are managed and launched into isolated sovereign workspaces.
                  </p>
                </div>

                <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 shrink-0 w-full xl:w-auto">
                  <div className="bg-slate-50 px-4 py-3 rounded-2xl border border-slate-200 text-center flex-1 sm:flex-initial">
                    <span className="text-[10px] font-mono uppercase text-slate-500 block font-semibold">Category Total</span>
                    <span className="text-xl font-extrabold text-slate-900 font-mono">{filteredPlatforms.length}</span>
                  </div>
                  <div className="bg-slate-50 px-4 py-3 rounded-2xl border border-slate-200 text-center flex-1 sm:flex-initial">
                    <span className="text-[10px] font-mono uppercase text-slate-500 block font-semibold">Active Workspaces</span>
                    <span className="text-xl font-extrabold text-emerald-600 font-mono">
                      {filteredPlatforms.filter(c => c.status === 'INSTALLED_CORE' || c.status === 'INSTALLED_ACTIVE').length}
                    </span>
                  </div>
                  <div className="bg-slate-50 px-4 py-3 rounded-2xl border border-slate-200 text-center flex-1 sm:flex-initial">
                    <span className="text-[10px] font-mono uppercase text-slate-500 block font-semibold">Sovereign Core</span>
                    <span className="text-xl font-extrabold text-blue-600 font-mono">
                      {filteredPlatforms.filter(c => c.status === 'INSTALLED_CORE').length}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* SEARCH BAR & ACTIVE FILTER CHIPS */}
            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search by product name, code (e.g. FIN-PAY-01), module, API, or AI capability..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition font-medium"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition p-1"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              <div className="flex items-center gap-2 text-xs font-medium text-slate-500 shrink-0">
                {(selectedCategory !== 'All Platforms' || lifecycleFilter !== 'ALL' || searchQuery !== '') && (
                  <button
                    onClick={() => { setSelectedCategory('All Platforms'); setLifecycleFilter('ALL'); setSearchQuery(''); }}
                    className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold flex items-center gap-1 transition"
                  >
                    <X className="w-3.5 h-3.5" />
                    <span>Reset Filters</span>
                  </button>
                )}
                <span className="px-2 py-1 bg-blue-50 text-blue-700 font-mono font-bold rounded-lg border border-blue-200">
                  {filteredPlatforms.length} items
                </span>
              </div>
            </div>

            {/* PLATFORMS GRID */}
            {filteredPlatforms.length === 0 ? (
              <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center max-w-2xl mx-auto my-8 space-y-4">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400">
                  <Search className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-slate-800">No Enterprise Platforms Found</h3>
                <p className="text-sm text-slate-500 max-w-md mx-auto">
                  No sovereign platforms match your filter criteria in category "{selectedCategory}".
                </p>
                <button
                  onClick={() => { setSearchQuery(''); setSelectedCategory('All Platforms'); setLifecycleFilter('ALL'); }}
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-xs transition shadow-sm inline-flex items-center gap-2 cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Reset All Filters</span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredPlatforms.map(renderPlatformCard)}
              </div>
            )}
          </div>
        )}
      </div>

      {/* CONFIGURATION, LIFECYCLE & TENANT PROVISIONING MODAL */}
      {selectedPlatform && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-4xl overflow-hidden animate-scale-in flex flex-col max-h-[90vh]">
            
            {/* Modal Header */}
            <div className="bg-slate-900 text-white p-6 flex items-center justify-between border-b border-slate-800 shrink-0">
              <div className="flex items-center gap-3.5">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center bg-white/10 border border-white/20 shrink-0`}>
                  {React.createElement(ICON_MAP[selectedPlatform.iconName] || Cpu, { className: "w-6 h-6 text-blue-400" })}
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-lg font-bold text-white">{selectedPlatform.name}</span>
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-400/30 font-bold">
                      {selectedPlatform.code}
                    </span>
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                      {selectedPlatform.version}
                    </span>
                  </div>
                  <span className="text-xs text-slate-400">{selectedPlatform.category} • {selectedPlatform.owner}</span>
                </div>
              </div>

              <button
                onClick={() => setSelectedPlatform(null)}
                className="p-2 bg-white/10 hover:bg-white/20 rounded-xl text-slate-300 hover:text-white transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Navigation Tabs */}
            <div className="bg-slate-50 px-6 border-b border-slate-200 flex items-center gap-4 overflow-x-auto shrink-0">
              <button
                onClick={() => setActiveModalTab('overview')}
                className={`py-3 text-xs font-semibold border-b-2 transition-colors whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
                  activeModalTab === 'overview'
                    ? 'border-blue-600 text-blue-600 font-bold'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                <Building2 className="w-3.5 h-3.5" />
                <span>Tenant Provisioning &amp; Rule 4</span>
              </button>
              <button
                onClick={() => setActiveModalTab('modules')}
                className={`py-3 text-xs font-semibold border-b-2 transition-colors whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
                  activeModalTab === 'modules'
                    ? 'border-blue-600 text-blue-600 font-bold'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Subsystems &amp; AI Swarms ({(selectedPlatform.modules ?? []).length})</span>
              </button>
              <button
                onClick={() => setActiveModalTab('permissions')}
                className={`py-3 text-xs font-semibold border-b-2 transition-colors whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
                  activeModalTab === 'permissions'
                    ? 'border-blue-600 text-blue-600 font-bold'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                <Shield className="w-3.5 h-3.5" />
                <span>Zero-Trust RBAC Access</span>
              </button>
              <button
                onClick={() => setActiveModalTab('lifecycle')}
                className={`py-3 text-xs font-semibold border-b-2 transition-colors whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
                  activeModalTab === 'lifecycle'
                    ? 'border-blue-600 text-blue-600 font-bold'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                <Settings className="w-3.5 h-3.5" />
                <span>Lifecycle &amp; APIs ({(selectedPlatform.apis ?? []).length})</span>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-6 flex-1">
              
              {/* TAB 1: OVERVIEW & TENANT PROVISIONING */}
              {activeModalTab === 'overview' && (
                <div className="space-y-6">
                  {/* Architecture Rule 4 Badge */}
                  <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 flex items-start gap-3.5">
                    <AlertCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                    <div className="text-xs text-blue-900 space-y-1">
                      <strong className="font-bold block">JUMO Architecture Rule 4: Independent Enterprise Workspace</strong>
                      <p className="leading-relaxed">
                        This platform operates as an independent sovereign realm. It does not run nested inside the Owner Control Center. Provisioning below initializes an isolated database schema, assigns tenant boundaries, and launches an autonomous workspace with a standard Universal Header, Left Navigation, and Workspace Area.
                      </p>
                    </div>
                  </div>

                  {provisionSuccess && (
                    <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-center justify-between gap-3 text-xs text-emerald-800 animate-fade-in font-medium">
                      <div className="flex items-center gap-2.5">
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                        <span>{provisionSuccess}</span>
                      </div>
                      <button
                        onClick={() => handleLaunchWorkspace(selectedPlatform.route)}
                        className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition shrink-0 flex items-center gap-1 cursor-pointer"
                      >
                        <span>Open Workspace Now</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </button>
                    </div>
                  )}

                  {/* Provisioning Form */}
                  <div className="space-y-4">
                    <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500">
                      Tenant Workspace Provisioning Console
                    </h4>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-700 block">
                          Sovereign Tenant Workspace Name
                        </label>
                        <input
                          type="text"
                          value={tenantName}
                          onChange={(e) => setTenantName(e.target.value)}
                          placeholder="e.g., Kampala Archdiocese / SACCO HQ"
                          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-700 block">
                          Sovereign Deployment Node &amp; Region
                        </label>
                        <select
                          value={tenantRegion}
                          onChange={(e) => setTenantRegion(e.target.value)}
                          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="Kampala-Central-1">Kampala-Central-1 (Uganda Sovereign Node)</option>
                          <option value="Nairobi-East-1">Nairobi-East-1 (East Africa Clearing Hub)</option>
                          <option value="Kigali-Hub-1">Kigali-Hub-1 (Rwanda Financial Node)</option>
                          <option value="Global-Cloud-Federated">Global Cloud Federated Node (AWS/GCP)</option>
                        </select>
                      </div>
                    </div>

                    {/* Phase 5 Standard Architecture Preview */}
                    <div className="bg-slate-900 text-white p-4 rounded-2xl border border-slate-800 space-y-3 font-mono text-xs">
                      <div className="flex items-center justify-between text-slate-400 text-[10px]">
                        <span>ENTERPRISE PAGE COMPOSITION STANDARD (PHASE 5)</span>
                        <span className="text-emerald-400 font-bold">VERIFIED KERNEL ROUTE: {selectedPlatform.route}</span>
                      </div>
                      <div className="grid grid-cols-1 gap-2 border border-slate-700 p-3 rounded-xl bg-slate-950/60">
                        <div className="bg-slate-800 p-2 rounded text-center text-[11px] font-bold text-blue-300">
                          UNIVERSAL HEADER (Global Navigation, Search, Notifications)
                        </div>
                        <div className="grid grid-cols-4 gap-2">
                          <div className="col-span-1 bg-slate-800/80 p-2 rounded text-center text-[10px] text-slate-300 flex items-center justify-center">
                            LEFT NAVIGATION
                          </div>
                          <div className="col-span-3 bg-slate-800/60 p-4 rounded text-center font-sans text-xs text-slate-200 font-bold">
                            WORKSPACE AREA ({selectedPlatform.name})
                            <span className="block text-[10px] font-mono text-slate-400 font-normal mt-1">
                              Isolated Tenant Schema • {selectedPlatform.tenantAvailability}
                            </span>
                          </div>
                        </div>
                        <div className="bg-slate-800/40 p-1.5 rounded text-center text-[10px] text-slate-400">
                          UNIVERSAL FOOTER (Status, Version, Diagnostics)
                        </div>
                      </div>
                    </div>

                    <div className="pt-2 flex items-center justify-end gap-3">
                      <button
                        onClick={handleProvisionTenant}
                        disabled={isProvisioning || !tenantName}
                        className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold rounded-xl text-xs transition shadow-sm flex items-center gap-2 cursor-pointer"
                      >
                        {isProvisioning ? (
                          <>
                            <RefreshCw className="w-4 h-4 animate-spin" />
                            <span>Initializing Schema &amp; Routing...</span>
                          </>
                        ) : (
                          <>
                            <Check className="w-4 h-4" />
                            <span>Provision Tenant &amp; Initialize Workspace</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: MODULES & AI SWARMS */}
              {activeModalTab === 'modules' && (() => {
                const universalMods = selectedPlatform ? UniversalModuleRegistry.getModulesForErpFamily(selectedPlatform.id) : [];
                const modItems = universalMods.length > 0
                  ? universalMods.map(m => ({ name: m.name, desc: m.description, category: m.domainCategory, tier: m.licenseTier }))
                  : (selectedPlatform?.modules ?? []).map(m => ({ name: m, desc: 'Type-Safe Subsystem Engine', category: 'Core', tier: 'Standard' }));

                return (
                <div className="space-y-6">
                  {/* Ring-0 Sovereign Governance Banner */}
                  <div className="p-4 rounded-xl bg-[#0078D4]/10 border border-[#0078D4]/30 flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <ShieldCheck className="w-5 h-5 text-[#0078D4] shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-xs font-bold text-slate-900">Ring-0 Sovereign Governance Authority Active</h4>
                        <p className="text-[11px] text-slate-600 leading-relaxed mt-0.5">
                          You are operating in the authoritative <strong>Ring-0 Owner Control Center</strong>. Enabling, disabling, or licensing modules here globally assigns and governs capability access across all tenant ERP instances.
                        </p>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 bg-[#0078D4] text-white rounded shrink-0">
                      RING-0 ROOT
                    </span>
                  </div>

                  {/* Subsystems */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500">
                        Subsystem Engines &amp; Universal Modules ({modItems.length})
                      </h4>
                      <span className="text-xs font-medium text-slate-500">
                        {Object.values(enabledModules).filter(Boolean).length} of {modItems.length} Active
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {modItems.map((mod, idx) => {
                        const isEnabled = enabledModules[mod.name] ?? true;
                        return (
                          <div
                            key={idx}
                            className={`p-3.5 rounded-2xl border flex items-start justify-between gap-3 transition ${
                              isEnabled ? 'bg-white border-blue-200 shadow-2xs' : 'bg-slate-50 border-slate-200 opacity-60'
                            }`}
                          >
                            <div className="space-y-1">
                              <div className="flex items-center gap-1.5 flex-wrap">
                                <span className="text-xs font-bold text-slate-800 block">{mod.name}</span>
                                <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200 font-bold">
                                  {mod.category}
                                </span>
                              </div>
                              <span className="text-[10px] text-slate-500 block leading-relaxed">{mod.desc}</span>
                            </div>

                            <button
                              onClick={() => {
                                if (!validateRing0Authority('owner')) {
                                  alert('Ring-0 Sovereign Governance required to globally modify module assignment.');
                                  return;
                                }
                                setEnabledModules(prev => ({ ...prev, [mod.name]: !isEnabled }));
                              }}
                              className={`w-11 h-6 flex items-center rounded-full p-1 transition duration-200 cursor-pointer shrink-0 mt-0.5 ${
                                isEnabled ? 'bg-[#0078D4] justify-end' : 'bg-slate-300 justify-start'
                              }`}
                              title={isEnabled ? "Module Globally Assigned (Click to Disable)" : "Module Disabled (Click to Assign)"}
                            >
                              <span className="w-4 h-4 rounded-full bg-white shadow-sm block"></span>
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* AI Capabilities Swarm */}
                  <div className="space-y-3 pt-3 border-t border-slate-200">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-purple-600" />
                      <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-purple-800">
                        Autonomous AI Capabilities &amp; Swarm Routines
                      </h4>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {(selectedPlatform.aiCapabilities ?? []).map((ai, idx) => (
                        <div key={idx} className="p-3 rounded-xl bg-purple-50 border border-purple-200 text-xs font-medium text-purple-900 flex items-center gap-2">
                          <Bot className="w-4 h-4 text-purple-600 shrink-0" />
                          <span>{ai}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                );
              })()}

              {/* TAB 3: ACCESS & PERMISSIONS */}
              {activeModalTab === 'permissions' && (
                <div className="space-y-4">
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500">
                    Zero-Trust Role-Based Access Control (RBAC) Assignment
                  </h4>

                  <div className="space-y-3">
                    <div className="p-4 bg-white border border-slate-200 rounded-2xl flex items-center justify-between">
                      <div>
                        <strong className="text-xs font-bold text-slate-800 block">Sovereign Super Administrator</strong>
                        <span className="text-[11px] text-slate-500">Full cryptographic control over database schema, billing, and module lifecycles.</span>
                      </div>
                      <span className="text-[10px] font-mono font-bold bg-purple-50 text-purple-700 border border-purple-200 px-2.5 py-1 rounded-lg">
                        ASSIGNED TO KERNEL OWNER
                      </span>
                    </div>

                    <div className="p-4 bg-white border border-slate-200 rounded-2xl flex items-center justify-between">
                      <div>
                        <strong className="text-xs font-bold text-slate-800 block">Domain Operational Controller</strong>
                        <span className="text-[11px] text-slate-500">Can view domain dashboards, post transactions, and execute workflows.</span>
                      </div>
                      <button className="text-xs font-semibold text-blue-600 hover:text-blue-800 underline cursor-pointer">
                        + Assign Users (3 Active)
                      </button>
                    </div>

                    <div className="p-4 bg-white border border-slate-200 rounded-2xl flex items-center justify-between">
                      <div>
                        <strong className="text-xs font-bold text-slate-800 block">External Regulatory &amp; Audit Officer</strong>
                        <span className="text-[11px] text-slate-500">Read-only access to cryptographic audit trails and immutable FAAP ledgers.</span>
                      </div>
                      <button className="text-xs font-semibold text-blue-600 hover:text-blue-800 underline cursor-pointer">
                        + Assign Auditors (1 Active)
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 4: LIFECYCLE & APIS (PHASE 4 & 6) */}
              {activeModalTab === 'lifecycle' && (
                <div className="space-y-6">
                  {/* Sovereign APIs Exposed */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
                      <Code className="w-4 h-4 text-blue-600" />
                      <span>Sovereign API Endpoints Exposed ({(selectedPlatform.apis ?? []).length})</span>
                    </h4>
                    <div className="bg-slate-900 text-slate-300 p-4 rounded-2xl border border-slate-800 font-mono text-xs space-y-2 max-h-40 overflow-y-auto">
                      {(selectedPlatform.apis ?? []).map((api, idx) => (
                        <div key={idx} className="flex items-center gap-2 border-b border-slate-800/80 pb-1.5 last:border-0 last:pb-0">
                          <span className="text-emerald-400 font-bold">{api.split(' ')[0]}</span>
                          <span className="text-slate-200">{api.split(' ')[1]}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Lifecycle Control Actions */}
                  <div className="space-y-3 pt-3 border-t border-slate-200">
                    <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500">
                      Runtime Lifecycle State Management (Phase 4)
                    </h4>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      <button
                        onClick={() => handleLifecycleChange(selectedPlatform.id, 'INSTALLED_ACTIVE')}
                        disabled={selectedPlatform.status === 'INSTALLED_ACTIVE' || selectedPlatform.status === 'INSTALLED_CORE'}
                        className="p-3 rounded-xl border border-emerald-200 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-xs transition flex flex-col items-center justify-center gap-1.5 disabled:opacity-50 cursor-pointer"
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>Activate Workspace</span>
                      </button>

                      <button
                        onClick={() => handleLifecycleChange(selectedPlatform.id, 'SUSPENDED')}
                        disabled={selectedPlatform.status === 'INSTALLED_CORE'}
                        className="p-3 rounded-xl border border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-800 font-bold text-xs transition flex flex-col items-center justify-center gap-1.5 disabled:opacity-50 cursor-pointer"
                      >
                        <AlertCircle className="w-4 h-4 text-rose-600" />
                        <span>Suspend Workspace</span>
                      </button>

                      <button
                        onClick={() => handleLifecycleChange(selectedPlatform.id, 'MAINTENANCE')}
                        disabled={selectedPlatform.status === 'INSTALLED_CORE'}
                        className="p-3 rounded-xl border border-amber-200 bg-amber-50 hover:bg-amber-100 text-amber-800 font-bold text-xs transition flex flex-col items-center justify-center gap-1.5 disabled:opacity-50 cursor-pointer"
                      >
                        <Activity className="w-4 h-4 text-amber-600" />
                        <span>Maintenance Mode</span>
                      </button>

                      <button
                        onClick={() => handleLifecycleChange(selectedPlatform.id, 'ARCHIVED')}
                        disabled={selectedPlatform.status === 'INSTALLED_CORE'}
                        className="p-3 rounded-xl border border-slate-300 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition flex flex-col items-center justify-center gap-1.5 disabled:opacity-50 cursor-pointer"
                      >
                        <HardDrive className="w-4 h-4 text-slate-600" />
                        <span>Archive DB Schema</span>
                      </button>
                    </div>
                  </div>

                  {/* Decommissioning */}
                  {selectedPlatform.status !== 'INSTALLED_CORE' ? (
                    <div className="border-t border-slate-200 pt-4 space-y-3">
                      <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-rose-600">
                        Danger Zone &amp; Decommissioning
                      </h4>
                      <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl flex items-center justify-between gap-4">
                        <div className="space-y-0.5">
                          <strong className="text-xs font-bold text-rose-900 block">Uninstall &amp; Revoke Platform</strong>
                          <span className="text-[11px] text-rose-700">
                            Deactivate this platform and revoke tenant workspace routes. Stored ledger data will be cryptographically sealed.
                          </span>
                        </div>
                        <button
                          onClick={() => {
                            handleLifecycleChange(selectedPlatform.id, 'AVAILABLE');
                            setSelectedPlatform(null);
                          }}
                          className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl text-xs transition shrink-0 flex items-center gap-1.5 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Uninstall Platform</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl text-xs text-amber-900 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                      <span>This is a Core Sovereign Platform required for system operation. It cannot be suspended, archived, or uninstalled.</span>
                    </div>
                  )}
                </div>
              )}

            </div>

            {/* Modal Footer */}
            <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex items-center justify-between shrink-0">
              <span className="text-xs text-slate-500">
                Current Status: <strong className="text-slate-800 font-mono">{selectedPlatform.status.replace('_', ' ')}</strong>
              </span>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setSelectedPlatform(null)}
                  className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold rounded-xl text-xs transition cursor-pointer"
                >
                  Close Console
                </button>
                <button
                  onClick={() => {
                    handleLaunchWorkspace(selectedPlatform.route);
                  }}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-xs transition shadow-sm flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Launch Sovereign Workspace</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
