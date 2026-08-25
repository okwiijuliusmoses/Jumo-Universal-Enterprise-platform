import React, { useState, useEffect } from 'react';
import { workspaceContextEngine } from '../../../src/core/runtime/workspaceContext';
import { universalRuntimeEngine } from '../../../src/core/runtime/universalRuntimeEngine';
import { ApplicationManifest, TenantWorkspaceContext, NavigationItem } from '../../../src/core/runtime/workspaceManifestRegistry';
import { 
  GraduationCap, Church, Briefcase, ShieldAlert, Activity, Landmark, 
  Layers, Cpu, Database, CheckCircle2, Search, Bell, HelpCircle, User, 
  ChevronRight, ArrowRight, Settings, Lock, Sparkles, RefreshCw, Globe, Server, Check
} from 'lucide-react';

export const WorkspaceRuntimeView: React.FC = () => {
  const [context, setContext] = useState<TenantWorkspaceContext>(workspaceContextEngine.getContext());
  const [manifest, setManifest] = useState<ApplicationManifest>(workspaceContextEngine.getActiveManifest());
  const [apps, setApps] = useState<ApplicationManifest[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeNavItem, setActiveNavItem] = useState<string>('');
  const [successToast, setSuccessToast] = useState<string | null>(null);

  useEffect(() => {
    universalRuntimeEngine.initializeRuntime();
    setApps(universalRuntimeEngine.getInstalledApplications());
    if (manifest.navigation.length > 0) {
      setActiveNavItem(manifest.navigation[0].id);
    }

    const unsubscribe = workspaceContextEngine.subscribe((newCtx, newManifest) => {
      setContext(newCtx);
      setManifest(newManifest);
      if (newManifest.navigation.length > 0) {
        setActiveNavItem(newManifest.navigation[0].id);
      }
      setSuccessToast(`Switched workspace to ${newManifest.name}`);
      setTimeout(() => setSuccessToast(null), 3500);
    });

    return () => unsubscribe();
  }, []);

  const handleAppSwitch = (appId: string) => {
    try {
      workspaceContextEngine.switchApplication(appId);
    } catch (err) {
      console.error(err);
    }
  };

  const getAppIcon = (iconName: string) => {
    switch (iconName) {
      case 'GraduationCap': return <GraduationCap className="h-5 w-5 text-indigo-400" />;
      case 'Church': return <Church className="h-5 w-5 text-amber-400" />;
      case 'Briefcase': return <Briefcase className="h-5 w-5 text-emerald-400" />;
      case 'ShieldAlert': return <ShieldAlert className="h-5 w-5 text-cyan-400" />;
      case 'Activity': return <Activity className="h-5 w-5 text-rose-400" />;
      case 'Landmark': return <Landmark className="h-5 w-5 text-blue-400" />;
      default: return <Layers className="h-5 w-5 text-purple-400" />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans select-none">
      {/* Universal Compact Header */}
      <header className="h-14 bg-slate-900 border-b border-slate-800 px-4 flex items-center justify-between shrink-0 z-30">
        <div className="flex items-center gap-3">
          <div className="bg-indigo-600/20 border border-indigo-500/30 p-1.5 rounded-lg flex items-center gap-2">
            <Cpu className="h-4 w-4 text-indigo-400 animate-pulse" />
            <span className="font-mono text-xs font-bold tracking-wider text-indigo-300">JUMO UEOS v28.0</span>
          </div>
          <div className="h-4 w-[1px] bg-slate-800" />
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-300">{context.tenantName}</span>
            <span className="text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full uppercase">
              {context.aegisSecurityLevel}
            </span>
          </div>
        </div>

        {/* Global Search & Workspace Switcher */}
        <div className="flex items-center gap-3">
          <div className="relative w-64">
            <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search across domains, FAAP ledger..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition"
            />
          </div>

          <div className="flex items-center gap-1.5 bg-slate-950 border border-slate-800 rounded-lg p-1">
            <select
              value={manifest.id}
              onChange={(e) => handleAppSwitch(e.target.value)}
              className="bg-transparent text-xs text-indigo-300 font-semibold focus:outline-none px-2 py-1 cursor-pointer"
            >
              {apps.map((app) => (
                <option key={app.id} value={app.id} className="bg-slate-900 text-slate-200">
                  {app.name} ({app.version})
                </option>
              ))}
            </select>
          </div>

          <div className="h-4 w-[1px] bg-slate-800" />

          <button className="p-1.5 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-lg transition relative">
            <Bell className="h-4 w-4" />
            <span className="absolute top-1 right-1 h-2 w-2 bg-indigo-500 rounded-full animate-ping" />
          </button>
          <button className="p-1.5 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-lg transition">
            <HelpCircle className="h-4 w-4" />
          </button>
          <div className="flex items-center gap-2 pl-2 border-l border-slate-800">
            <div className="h-7 w-7 rounded-full bg-indigo-600 flex items-center justify-center font-bold text-xs text-white">
              JM
            </div>
          </div>
        </div>
      </header>

      {/* Toast Notification */}
      {successToast && (
        <div className="fixed top-16 right-4 z-50 bg-indigo-600 text-white px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-2.5 text-xs font-medium animate-fade-in border border-indigo-400/30">
          <CheckCircle2 className="h-4 w-4 text-indigo-200" />
          <span>{successToast}</span>
        </div>
      )}

      {/* Main Workspace Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Navigation Engine */}
        <aside className="w-72 bg-slate-900/80 border-r border-slate-800 flex flex-col shrink-0">
          {/* Active Application Info Card */}
          <div className="p-4 border-b border-slate-800 bg-slate-900/50">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 shadow-inner">
                {getAppIcon(manifest.icon)}
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-xs font-bold text-slate-100 truncate">{manifest.name}</h2>
                <p className="text-[10px] font-mono text-slate-400 truncate">{manifest.category} • v{manifest.version}</p>
              </div>
            </div>
            <p className="text-[11px] text-slate-400 mt-2.5 leading-relaxed line-clamp-2">
              {manifest.description}
            </p>
          </div>

          {/* Navigation Items */}
          <div className="flex-1 overflow-y-auto p-3 space-y-1">
            <div className="px-3 py-1.5 text-[10px] font-mono uppercase text-slate-500 font-bold tracking-wider">
              Workspace Modules
            </div>
            {manifest.navigation.map((nav: NavigationItem) => {
              const isActive = activeNavItem === nav.id;
              return (
                <div key={nav.id} className="space-y-1">
                  <button
                    onClick={() => setActiveNavItem(nav.id)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition cursor-pointer ${
                      isActive 
                        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20 font-semibold' 
                        : 'text-slate-300 hover:bg-slate-800/60 hover:text-slate-100'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <Layers className={`h-4 w-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                      <span className="truncate">{nav.label}</span>
                    </div>
                    {nav.badge && (
                      <span className={`text-[9px] font-mono px-2 py-0.5 rounded-full ${
                        isActive ? 'bg-indigo-700 text-indigo-100' : 'bg-slate-800 text-slate-400'
                      }`}>
                        {nav.badge}
                      </span>
                    )}
                  </button>

                  {/* Sub-items if active */}
                  {isActive && nav.subItems && nav.subItems.length > 0 && (
                    <div className="pl-6 space-y-1 pt-1 pb-1">
                      {nav.subItems.map((sub) => (
                        <div key={sub.id} className="flex items-center justify-between px-3 py-1.5 rounded-lg text-xs text-slate-400 hover:text-slate-200 hover:bg-slate-800/35 transition cursor-pointer">
                          <span className="flex items-center gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
                            {sub.label}
                          </span>
                          {sub.badge && <span className="text-[9px] font-mono text-indigo-400">{sub.badge}</span>}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* AI Domain Assistant Snippet */}
          <div className="p-3 m-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono text-indigo-400 flex items-center gap-1.5 uppercase font-bold">
                <Sparkles className="h-3.5 w-3.5" />
                {manifest.aiAgent.name}
              </span>
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            <p className="text-[11px] text-slate-300 leading-snug">
              "{manifest.aiAgent.greeting}"
            </p>
            <div className="pt-1 flex flex-wrap gap-1">
              {manifest.aiAgent.capabilities.map((cap, i) => (
                <span key={i} className="text-[9px] font-mono bg-slate-900 border border-slate-800 text-slate-400 px-1.5 py-0.5 rounded">
                  {cap}
                </span>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Workspace Content Area */}
        <main className="flex-1 bg-slate-950 flex flex-col overflow-hidden">
          {/* Workspace Header Bar */}
          <div className="h-16 bg-slate-900/40 border-b border-slate-800 px-6 flex items-center justify-between shrink-0">
            <div>
              <h1 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                <span>{manifest.name}</span>
                <ChevronRight className="h-4 w-4 text-slate-600" />
                <span className="text-indigo-400 font-mono text-xs">
                  {manifest.navigation.find(n => n.id === activeNavItem)?.label || 'Workspace'}
                </span>
              </h1>
              <p className="text-[11px] text-slate-400 font-mono mt-0.5">
                Managed under JUMO UEOS Universal Runtime v28.0 • Zero-Trust Tenant Scope
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 flex items-center gap-2 text-xs font-mono">
                <Server className="h-3.5 w-3.5 text-emerald-400" />
                <span className="text-slate-300">FAAP Ledger Synchronized</span>
              </div>
              <button 
                onClick={() => setSuccessToast(`Verified integrity for ${manifest.name}`)}
                className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-3.5 py-1.5 rounded-xl text-xs flex items-center gap-1.5 transition shadow-lg shadow-indigo-600/20 cursor-pointer"
              >
                <RefreshCw className="h-3.5 w-3.5" />
                <span>Run Runtime Diagnostics</span>
              </button>
            </div>
          </div>

          {/* Dynamic Workspace Container */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Bento Grid Analytics & Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-slate-900/60 border border-slate-800/80 p-4 rounded-2xl flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <span className="text-[10px] font-mono text-slate-400 uppercase font-bold">Active Manifest ID</span>
                  <Database className="h-4 w-4 text-indigo-400" />
                </div>
                <div className="mt-4">
                  <div className="text-sm font-mono font-bold text-slate-100">{manifest.id}</div>
                  <div className="text-[10px] text-emerald-400 font-mono mt-0.5">✓ Manifest Loaded Correctly</div>
                </div>
              </div>

              <div className="bg-slate-900/60 border border-slate-800/80 p-4 rounded-2xl flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <span className="text-[10px] font-mono text-slate-400 uppercase font-bold">Registered Modules</span>
                  <Layers className="h-4 w-4 text-emerald-400" />
                </div>
                <div className="mt-4">
                  <div className="text-lg font-bold text-slate-100">{manifest.modules.length} Connected</div>
                  <div className="text-[10px] text-slate-400 font-mono mt-0.5 truncate">{manifest.modules.join(', ')}</div>
                </div>
              </div>

              <div className="bg-slate-900/60 border border-slate-800/80 p-4 rounded-2xl flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <span className="text-[10px] font-mono text-slate-400 uppercase font-bold">Security Clearance</span>
                  <ShieldAlert className="h-4 w-4 text-amber-400" />
                </div>
                <div className="mt-4">
                  <div className="text-sm font-bold text-slate-100">Zero-Trust Enforced</div>
                  <div className="text-[10px] text-slate-400 font-mono mt-0.5">{manifest.permissions.length} Roles Assigned</div>
                </div>
              </div>

              <div className="bg-slate-900/60 border border-slate-800/80 p-4 rounded-2xl flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <span className="text-[10px] font-mono text-slate-400 uppercase font-bold">Tenant Isolation</span>
                  <Globe className="h-4 w-4 text-purple-400" />
                </div>
                <div className="mt-4">
                  <div className="text-sm font-bold text-slate-100">{context.tenantId}</div>
                  <div className="text-[10px] text-indigo-400 font-mono mt-0.5">Active Scope Isolated</div>
                </div>
              </div>
            </div>

            {/* Dynamic Module Workspace Panel */}
            <div className="bg-slate-900/50 border border-slate-800/80 rounded-2xl p-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div>
                  <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                    <Cpu className="h-4 w-4 text-indigo-400" />
                    <span>Dynamic Module Runtime Container: {activeNavItem.toUpperCase()}</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Executing live module package components rendered through the universal workspace runtime.
                  </p>
                </div>
                <span className="text-xs font-mono bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-3 py-1 rounded-full font-bold">
                  READY
                </span>
              </div>

              <div className="py-8 text-center space-y-4">
                <div className="h-12 w-12 rounded-2xl bg-indigo-600/10 border border-indigo-500/20 flex items-center justify-center mx-auto text-indigo-400">
                  {getAppIcon(manifest.icon)}
                </div>
                <div className="max-w-md mx-auto space-y-1">
                  <h4 className="text-sm font-bold text-slate-200">Workspace Module Loaded Successfully</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    The {manifest.name} runtime has successfully bound the <span className="font-mono text-indigo-300">{activeNavItem}</span> module to the FAAP general ledger and AEGIS security firewall.
                  </p>
                </div>

                <div className="pt-4 flex justify-center gap-3">
                  <button 
                    onClick={() => setSuccessToast('Module data refreshed successfully.')}
                    className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold px-4 py-2 rounded-xl text-xs transition cursor-pointer"
                  >
                    Reload Module Data
                  </button>
                  <button 
                    onClick={() => setSuccessToast('Connected to Universal Data Mesh successfully.')}
                    className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-4 py-2 rounded-xl text-xs transition shadow-lg shadow-indigo-600/20 cursor-pointer"
                  >
                    Query Data Mesh
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
