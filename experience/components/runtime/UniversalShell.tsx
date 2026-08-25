import React, { useState } from 'react';
import { 
  Building2, Layers, Grid, Search, Bell, Sparkles, User, ShieldCheck, 
  Settings, LogOut, ChevronDown, Monitor, Cpu, PackageCheck, Sliders, Command
} from 'lucide-react';
import { domainRegistryService } from '../../../src/core/runtime/domainRegistry';

export interface UniversalShellProps {
  children: React.ReactNode;
  activePlatformId?: string;
  activePlatformName?: string;
  tenantIdentity?: string;
  onNavigate: (route: string) => void;
  currentUser?: any;
  onLogout?: () => void;
}

export const UniversalShell: React.FC<UniversalShellProps> = ({
  children,
  activePlatformId = 'ueos-kernel',
  activePlatformName = 'JUMO UEOS Universal Kernel',
  tenantIdentity = 'Universal Enterprise Tenant',
  onNavigate,
  currentUser,
  onLogout
}) => {
  const [workspaceOpen, setWorkspaceOpen] = useState(false);
  const [appLauncherOpen, setAppLauncherOpen] = useState(false);
  const [aiAssistantOpen, setAiAssistantOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const installedPackages = domainRegistryService.getAllPackages().filter(p => p.status === 'installed');

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-900 flex flex-col">
      {/* Compact Enterprise Universal Header */}
      <header className="bg-slate-900 text-white border-b border-slate-800 px-4 py-2 flex items-center justify-between sticky top-0 z-40 text-xs select-none">
        {/* Left Brand & Workspace Switcher */}
        <div className="flex items-center gap-3">
          <div 
            onClick={() => onNavigate('/public')}
            className="flex items-center gap-2 cursor-pointer font-black tracking-tight text-white hover:opacity-90"
          >
            <div className="w-7 h-7 bg-[#0078D4] text-white rounded font-extrabold flex items-center justify-center text-xs shadow-xs">
              J
            </div>
            <div className="flex flex-col">
              <span className="leading-tight font-extrabold text-sm">JUMO UEOS</span>
              <span className="text-[9px] font-mono text-blue-300 tracking-wider">UNIVERSAL KERNEL v28.0</span>
            </div>
          </div>

          <div className="h-5 w-px bg-slate-800 hidden sm:block" />

          {/* Active Workspace Switcher Dropdown */}
          <div className="relative">
            <button
              onClick={() => setWorkspaceOpen(!workspaceOpen)}
              className="bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-md border border-slate-700 font-medium flex items-center gap-2 text-slate-200 transition"
            >
              <Building2 className="w-3.5 h-3.5 text-blue-400" />
              <span className="truncate max-w-[140px] font-semibold">{tenantIdentity}</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {workspaceOpen && (
              <div className="absolute left-0 mt-1 w-64 bg-white text-slate-900 rounded-lg shadow-xl border border-slate-200 py-2 z-50">
                <div className="px-3 py-1 text-[10px] font-mono font-bold text-slate-400 uppercase border-b border-slate-100">
                  Switch Enterprise Workspace
                </div>
                {installedPackages.map(pkg => (
                  <div
                    key={pkg.id}
                    onClick={() => {
                      setWorkspaceOpen(false);
                      onNavigate(`/platform/erp`);
                    }}
                    className="px-3 py-2 hover:bg-slate-50 cursor-pointer flex items-center justify-between transition"
                  >
                    <div>
                      <div className="font-bold text-xs text-slate-900">{pkg.installedTenant || pkg.name}</div>
                      <div className="text-[10px] text-slate-500 font-mono">{pkg.family} • {pkg.installedEdition}</div>
                    </div>
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  </div>
                ))}
                <div 
                  onClick={() => { setWorkspaceOpen(false); onNavigate('/platform/erp/install'); }}
                  className="px-3 py-2 bg-blue-50 text-[#0078D4] font-bold text-xs hover:bg-blue-100 cursor-pointer border-t border-slate-100 flex items-center gap-1.5"
                >
                  + Provision New Workspace
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Center Platform Search & Navigation Controls */}
        <div className="hidden md:flex items-center gap-3 max-w-md w-full mx-4">
          <div className="relative w-full">
            <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search platforms, modules, enterprise APIs, ledger accounts..."
              className="w-full bg-slate-800 border border-slate-700 text-slate-200 text-xs rounded-md pl-9 pr-8 py-1.5 focus:outline-none focus:border-blue-500 placeholder-slate-500"
            />
            <span className="absolute right-2.5 top-2 text-[10px] font-mono text-slate-500 bg-slate-700 px-1 rounded">⌘K</span>
          </div>
        </div>

        {/* Right Tools & Identity Menu */}
        <div className="flex items-center gap-2">
          {/* Marketplace Launcher */}
          <button
            onClick={() => onNavigate('/platform/erp')}
            className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 rounded-md border border-slate-700 text-slate-200 font-bold flex items-center gap-1.5 transition"
            title="JUMO Enterprise Marketplace"
          >
            <Grid className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden lg:inline">Marketplace</span>
          </button>

          {/* AI Concierge */}
          <button
            onClick={() => setAiAssistantOpen(!aiAssistantOpen)}
            className="px-2.5 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-md font-bold flex items-center gap-1.5 transition cursor-pointer shadow-xs"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">AI Concierge</span>
          </button>

          {/* Owner Control Center Link */}
          <button
            onClick={() => onNavigate('/owner-configuration')}
            className="p-1.5 text-slate-300 hover:text-white hover:bg-slate-800 rounded-md transition"
            title="Owner Configuration Registry"
          >
            <Settings className="w-4 h-4" />
          </button>

          {/* User Profile */}
          <div className="relative">
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="w-7 h-7 bg-slate-700 hover:bg-slate-600 text-white rounded-full flex items-center justify-center font-bold text-xs border border-slate-600 transition"
            >
              {currentUser?.email ? currentUser.email.charAt(0).toUpperCase() : 'A'}
            </button>

            {userMenuOpen && (
              <div className="absolute right-0 mt-1 w-56 bg-white text-slate-900 rounded-lg shadow-xl border border-slate-200 py-2 z-50 text-xs">
                <div className="px-3 py-2 border-b border-slate-100">
                  <div className="font-bold text-slate-900">{currentUser?.email || 'Ring-0 Administrator'}</div>
                  <div className="text-[10px] text-slate-500 font-mono">Role: UEOS Kernel Operator</div>
                </div>
                <button
                  onClick={() => { setUserMenuOpen(false); onNavigate('/owner'); }}
                  className="w-full text-left px-3 py-2 hover:bg-slate-50 flex items-center gap-2 font-medium"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-600" /> Owner Ring-0 Console
                </button>
                <button
                  onClick={() => { setUserMenuOpen(false); onNavigate('/mobile'); }}
                  className="w-full text-left px-3 py-2 hover:bg-slate-50 flex items-center gap-2 font-medium"
                >
                  <Monitor className="w-3.5 h-3.5 text-purple-600" /> Mobile Workspace
                </button>
                <div className="border-t border-slate-100 my-1" />
                <button
                  onClick={() => { setUserMenuOpen(false); if (onLogout) onLogout(); else onNavigate('/public'); }}
                  className="w-full text-left px-3 py-2 hover:bg-rose-50 text-rose-600 flex items-center gap-2 font-bold"
                >
                  <LogOut className="w-3.5 h-3.5" /> Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Container Shell Workspace */}
      <main className="flex-1 w-full max-w-full">
        {children}
      </main>

      {/* Ultra-compact Universal Footer */}
      <footer className="bg-white border-t border-slate-200 px-4 py-2 text-[11px] font-mono text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 font-bold text-emerald-600">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> UEOS KERNEL ACTIVE
          </span>
          <span>•</span>
          <span>FAAP Ledger Balanced ($0.00 offset)</span>
          <span>•</span>
          <span>AEGIS Zero-Trust Active</span>
        </div>
        <div>
          JUMO Universal Enterprise Operating System © 2026 • v28.0 Sovereign Release
        </div>
      </footer>
    </div>
  );
};

export default UniversalShell;
