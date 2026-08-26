import React, { useState } from 'react';
import { 
  LayoutDashboard, Building2, Users, FileText, CheckSquare, 
  HelpCircle, Settings, LogOut, ChevronLeft, ChevronRight,
  ShieldCheck, Zap, Activity, Cpu, Bell, Search, Sparkles,
  Globe, Database, Layers, ArrowRight, Package, Lock, CheckCircle2
} from 'lucide-react';

export interface OfficeNavigationItem {
  id: string;
  label: string;
  iconName?: string;
  badge?: string;
  children?: { id: string; label: string; badge?: string }[];
}

export interface JumoStandaloneProductShellProps {
  productId: 'PROD_EDU' | 'PROD_CH' | 'PROD_ALUMNI' | 'PROD_FAAP' | 'PROD_DP';
  productName: string;
  productTagline: string;
  version?: string;
  tenantName?: string;
  userRole?: string;
  userName?: string;
  offices: OfficeNavigationItem[];
  activeOfficeId: string;
  onOfficeSelect: (officeId: string) => void;
  children: React.ReactNode;
}

export const JumoStandaloneProductShell: React.FC<JumoStandaloneProductShellProps> = ({
  productId,
  productName,
  productTagline,
  version = 'v1.0.4 Enterprise',
  tenantName = 'Sovereign Institutional Workspace',
  userRole = 'System Administrator',
  userName = 'Julius Moses',
  offices,
  activeOfficeId,
  onOfficeSelect,
  children
}) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [showAiAssistant, setShowAiAssistant] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const getProductColor = () => {
    switch (productId) {
      case 'PROD_EDU': return 'border-indigo-600 text-indigo-600 bg-indigo-50';
      case 'PROD_CH': return 'border-amber-600 text-amber-600 bg-amber-50';
      case 'PROD_ALUMNI': return 'border-rose-600 text-rose-600 bg-rose-50';
      case 'PROD_FAAP': return 'border-emerald-600 text-emerald-600 bg-emerald-50';
      case 'PROD_DP': return 'border-blue-600 text-blue-600 bg-blue-50';
      default: return 'border-slate-800 text-slate-800 bg-slate-50';
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-900 flex flex-col">
      {/* Top Header */}
      <header className="h-14 bg-slate-900 text-white border-b border-slate-800 flex items-center justify-between px-4 sticky top-0 z-40 shrink-0">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white font-black flex items-center justify-center text-sm shadow-md">
              J
            </div>
            <div>
              <span className="font-extrabold text-sm tracking-tight text-white block leading-none">{productName}</span>
              <span className="text-[10px] text-slate-400 font-mono block mt-0.5">{productTagline}</span>
            </div>
          </div>

          <div className="h-4 w-px bg-slate-800 mx-1 hidden sm:block" />

          {/* Tenant Indicator */}
          <div className="hidden md:flex items-center gap-2 bg-slate-800/80 px-2.5 py-1 rounded-lg border border-slate-700/60 text-xs">
            <Building2 className="w-3.5 h-3.5 text-emerald-400" />
            <span className="font-semibold text-slate-200">{tenantName}</span>
          </div>
        </div>

        {/* Global Search & Actions */}
        <div className="flex items-center gap-3">
          <div className="relative hidden lg:block w-64">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
            <input 
              type="text"
              placeholder={`Search ${productName}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-800/90 border border-slate-700 rounded-lg pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500 font-medium"
            />
          </div>

          {/* AI Toggle */}
          <button 
            onClick={() => setShowAiAssistant(!showAiAssistant)}
            className={`p-1.5 rounded-lg border text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
              showAiAssistant ? 'bg-emerald-600 text-white border-emerald-500' : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">AI Copilot</span>
          </button>

          {/* Security Status */}
          <div className="flex items-center gap-1 text-[10px] font-mono font-bold text-emerald-400 bg-emerald-950/80 px-2 py-1 rounded border border-emerald-800">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden xl:inline">AEGIS RING-0 OK</span>
          </div>

          {/* User Profile */}
          <div className="flex items-center gap-2 bg-slate-800 px-2.5 py-1 rounded-lg border border-slate-700">
            <div className="w-6 h-6 rounded-full bg-emerald-600 text-white text-[10px] font-black flex items-center justify-center">
              {userName.split(' ').map(n => n[0]).join('')}
            </div>
            <div className="hidden xl:block text-left">
              <p className="text-xs font-bold leading-none text-white">{userName}</p>
              <p className="text-[9px] text-slate-400 font-mono mt-0.5">{userRole}</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Office Navigation */}
        <aside className={`bg-white border-r border-slate-200 transition-all duration-200 flex flex-col shrink-0 ${
          isSidebarCollapsed ? 'w-16' : 'w-64'
        }`}>
          <div className="p-3 border-b border-slate-100 flex items-center justify-between">
            {!isSidebarCollapsed && (
              <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">Offices & Functional Modules</span>
            )}
            <button 
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              className="p-1 hover:bg-slate-100 rounded text-slate-500 hover:text-slate-900 transition-colors mx-auto cursor-pointer"
            >
              {isSidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto p-2 space-y-1">
            {offices.map((off) => {
              const isActive = activeOfficeId === off.id;
              return (
                <button
                  key={off.id}
                  onClick={() => onOfficeSelect(off.id)}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between transition-all cursor-pointer ${
                    isActive 
                      ? 'bg-slate-900 text-white shadow-sm font-bold' 
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                  title={off.label}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <Layers className={`w-4 h-4 shrink-0 ${isActive ? 'text-emerald-400' : 'text-slate-400'}`} />
                    {!isSidebarCollapsed && <span className="truncate">{off.label}</span>}
                  </div>
                  {!isSidebarCollapsed && off.badge && (
                    <span className={`text-[9px] px-1.5 py-0.5 rounded-md font-mono font-bold ${
                      isActive ? 'bg-emerald-500 text-slate-900' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {off.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Standalone Product Footer Link */}
          {!isSidebarCollapsed && (
            <div className="p-3 border-t border-slate-100 bg-slate-50 text-[10px] text-slate-500 space-y-1">
              <div className="flex justify-between items-center font-mono">
                <span>Product Mode:</span>
                <span className="font-bold text-emerald-700">STANDALONE</span>
              </div>
              <div className="flex justify-between items-center font-mono">
                <span>Database Status:</span>
                <span className="font-bold text-slate-700">ONLINE</span>
              </div>
            </div>
          )}
        </aside>

        {/* Workspace Area */}
        <main className="flex-1 overflow-y-auto p-6 bg-slate-50">
          {children}
        </main>

        {/* Optional Contextual AI Panel */}
        {showAiAssistant && (
          <aside className="w-80 bg-white border-l border-slate-200 p-4 flex flex-col shrink-0 animate-in slide-in-from-right duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <h3 className="text-xs font-bold text-slate-900">JUMO AI Domain Assistant</h3>
              </div>
              <button onClick={() => setShowAiAssistant(false)} className="text-xs text-slate-400 hover:text-slate-600 cursor-pointer">✕</button>
            </div>
            <div className="flex-1 py-4 text-xs text-slate-600 space-y-3">
              <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-xl text-emerald-900 leading-relaxed">
                👋 Hello {userName.split(' ')[0]}! I am monitoring domain transactions and compliance rules for <strong>{productName}</strong>.
              </div>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                <p className="font-bold text-slate-900">Suggested Actions:</p>
                <ul className="list-disc list-inside text-slate-600 space-y-1">
                  <li>Run automated ledger reconciliation</li>
                  <li>Verify uncommitted Vote Book allocations</li>
                  <li>Generate statutory compliance exports</li>
                </ul>
              </div>
            </div>
            <div className="pt-2 border-t border-slate-100">
              <input 
                type="text"
                placeholder="Ask domain copilot..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900"
              />
            </div>
          </aside>
        )}
      </div>

      {/* Universal Status Bar */}
      <footer className="h-7 bg-slate-900 text-slate-400 text-[10px] font-mono border-t border-slate-800 px-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> SYSTEM READY</span>
          <span>SYNC: 100%</span>
          <span>SECURITY: ZERO-TRUST</span>
        </div>
        <div className="flex items-center gap-4">
          <span>{productName} {version}</span>
          <span>MODE: INDEPENDENT PRODUCT</span>
        </div>
      </footer>
    </div>
  );
};
