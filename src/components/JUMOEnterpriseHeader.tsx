/**
 * Authoritative JUMO UEOS Enterprise Header
 * Universal application header implementing JUMO Sovereign Enterprise styling.
 * Enforces single system identity: JUMO DIGITAL ENTERPRISE PLATFORM.
 */

import React, { useState, useEffect } from 'react';
import { 
  Search, Bell, Shield, Bot, User as UserIcon, LayoutGrid, Sparkles, 
  Home, Globe, LayoutDashboard, DollarSign, Store, Lock, HelpCircle, CheckCircle2,
  Layers, Phone, Cpu, Database, Sliders, ArrowLeft, ArrowRight, RefreshCw,
  Star, Zap, Clock, Keyboard, Menu, PanelRight, ChevronRight, Bookmark, X, Plus, FileText, Send, Calendar, Calculator, CheckSquare, AlertTriangle, Info, FileSpreadsheet, Building2,
  QrCode
} from 'lucide-react';
import { EnterpriseLogo } from './EnterpriseLogo';
import { AppLauncher } from '../../experience/components/AppLauncher';

export interface JUMOEnterpriseHeaderProps {
  onNavigate?: (path: string) => void;
  titleOverride?: string;
  subtitleOverride?: string;
  onOpenCommandPalette?: () => void;
  onNavigateTab?: (tabId: string) => void;
  theme?: {
    bannerActive?: boolean;
    bannerMessage?: string;
    platformName?: string;
    [key: string]: any;
  };
  user?: {
    name?: string;
    role?: string;
    email?: string;
    [key: string]: any;
  };
}

export const JUMOEnterpriseHeader: React.FC<JUMOEnterpriseHeaderProps> = ({
  onNavigate,
  titleOverride,
  subtitleOverride,
  onOpenCommandPalette,
  onNavigateTab,
  theme,
  user,
}) => {
  const [isLauncherOpen, setIsLauncherOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState(
    typeof window !== 'undefined' ? window.location.pathname : '/'
  );
  const [isLeftNavOpen, setIsLeftNavOpen] = useState(false);
  const [isRightUtilityOpen, setIsRightUtilityOpen] = useState(false);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const [isQuickActionsOpen, setIsQuickActionsOpen] = useState(false);
  const [isRecentlyOpenedOpen, setIsRecentlyOpenedOpen] = useState(false);
  const [isShortcutsModalOpen, setIsShortcutsModalOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [favorites, setFavorites] = useState<string[]>(['/workspace', '/treasury', '/ai-platform', '/security']);
  const [recentPaths, setRecentPaths] = useState<{ path: string; label: string; time: string }[]>([
    { path: '/workspace', label: 'Tenant Workspace Shell', time: '2 mins ago' },
    { path: '/treasury', label: 'Sovereign Treasury Switch', time: '15 mins ago' },
    { path: '/ai-platform', label: 'JUMO AI Enterprise Engine', time: '1 hr ago' },
  ]);
  const [utilityScratchpad, setUtilityScratchpad] = useState('Sovereign Note: All RTGS inter-bank ledgers balancing within normal tolerance.');
  const [calcInput, setCalcInput] = useState('25000 * 1.18');
  const [calcResult, setCalcResult] = useState('29,500.00');

  useEffect(() => {
    const handleLocationChange = () => {
      if (typeof window !== 'undefined') {
        setCurrentPath(window.location.pathname);
      }
    };
    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  const handleNavClick = (path: string) => {
    const label = navItems.find(n => n.path === path)?.label || path;
    setRecentPaths(prev => [
      { path, label: `${label} View`, time: 'Just now' },
      ...(Array.isArray(prev) ? prev : []).filter(p => p.path !== path).slice(0, 4)
    ]);
    if (onNavigate) {
      onNavigate(path);
    } else if (typeof window !== 'undefined') {
      window.history.pushState(null, '', path);
      window.dispatchEvent(new PopStateEvent('popstate'));
      if (window.location.pathname !== path) {
        window.location.href = path;
      }
    }
    setIsLeftNavOpen(false);
    setIsFavoritesOpen(false);
    setIsQuickActionsOpen(false);
    setIsRecentlyOpenedOpen(false);
  };

  const handleBack = () => {
    if (typeof window !== 'undefined' && window.history.length > 1) {
      window.history.back();
    } else {
      handleNavClick('/workspace');
    }
  };

  const handleForward = () => {
    if (typeof window !== 'undefined') {
      window.history.forward();
    }
  };

  const handleRefresh = () => {
    if (typeof window !== 'undefined') {
      window.location.reload();
    }
  };

  const handleHome = () => {
    handleNavClick('/workspace');
  };

  const toggleFavorite = (path: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites(prev => prev.includes(path) ? prev.filter(p => p !== path) : [...prev, path]);
  };

  const navItems = [
    { id: 'home', label: 'Home', path: '/workspace', icon: Home, match: ['/workspace', '/public', '/'] },
    { id: 'foundation', label: 'Foundation', path: '/foundation', icon: Layers, match: ['/foundation'] },
    { id: 'domains', label: 'Domains', path: '/domains', icon: Globe, match: ['/domains', '/domain/'] },
    { id: 'workspace', label: 'Workspace', path: '/tenant', icon: LayoutDashboard, match: ['/tenant', '/tenants'] },
    { id: 'finance', label: 'Finance', path: '/treasury', icon: DollarSign, match: ['/treasury', '/faap', '/fintech'] },
    { id: 'ai', label: 'AI Center', path: '/ai-platform', icon: Bot, match: ['/ai-platform', '/workspace/app/ai-center'] },
    { id: 'telecom', label: 'Telecom', path: '/telecommunications', icon: Phone, match: ['/telecommunications'] },
    { id: 'security', label: 'Security', path: '/security', icon: Shield, match: ['/security', '/workspace/app/aegis', '/operations'] },
    { id: 'marketplace', label: 'Marketplace', path: '/marketplace', icon: Store, match: ['/marketplace', '/developer-center'] },
    { id: 'control', label: 'Control Center', path: '/owner', icon: Cpu, match: ['/owner', '/owner-console', '/owner-login'] },
    { id: 'docs', label: 'Docs', path: '/documentation', icon: HelpCircle, match: ['/documentation'] },
  ];

  return (
    <>
      <header className="bg-[#0078D4] text-white border-b border-[#005a9e] shadow-xs sticky top-0 z-50 select-none h-11 min-h-[44px] max-h-[48px] px-3 md:px-4 flex items-center justify-between gap-3">
      {/* Left: Menu button, App Launcher & JUMO Logo */}
      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={() => setIsLeftNavOpen(!isLeftNavOpen)}
          className="p-1.5 hover:bg-[#005a9e] rounded-lg text-white transition-colors cursor-pointer flex items-center justify-center"
          title="Toggle Left Navigation Menu (☰)"
        >
          <Menu className="w-4 h-4" />
        </button>

        <button
          onClick={() => setIsLauncherOpen(!isLauncherOpen)}
          className="p-1.5 hover:bg-[#005a9e] rounded-lg text-blue-100 hover:text-white transition-colors cursor-pointer hidden sm:flex items-center justify-center"
          title="Enterprise App Launcher (⌘L)"
        >
          <LayoutGrid className="w-4 h-4 text-blue-200" />
        </button>
        <AppLauncher
          isOpen={isLauncherOpen}
          onClose={() => setIsLauncherOpen(false)}
          onNavigate={handleNavClick}
        />

        <div
          onClick={() => handleNavClick('/workspace')}
          className="cursor-pointer flex items-center gap-2 hover:opacity-90 transition-opacity ml-1"
          title="JUMO DIGITAL ENTERPRISE PLATFORM"
        >
          <EnterpriseLogo size="sm" variant="blue" showText={true} subtitle="ENTERPRISE PLATFORM" />
        </div>
      </div>

      {/* Center: Global Search Bar (Thin & Compact) */}
      <div className="flex-1 max-w-md mx-2 hidden md:block">
        <div className="relative w-full">
          <Search className="absolute left-2.5 top-2 w-3.5 h-3.5 text-blue-200" />
          <input
            type="text"
            readOnly={!!onOpenCommandPalette}
            onClick={onOpenCommandPalette || (() => setIsQuickActionsOpen(true))}
            placeholder="Search OS commands, nodes, records... (⌘K)"
            className="w-full pl-8 pr-3 py-1 bg-[#005a9e]/70 border border-blue-400/30 rounded-lg text-xs text-white placeholder-blue-200/70 focus:outline-none focus:bg-[#005a9e] transition-all cursor-pointer h-7"
          />
        </div>
      </div>

      {/* Right: Search (Mobile), Notifications, AI Copilot & User Profile */}
      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={onOpenCommandPalette || (() => setIsQuickActionsOpen(true))}
          className="md:hidden p-1.5 hover:bg-[#005a9e] rounded-lg text-blue-100 hover:text-white transition-colors cursor-pointer"
          title="Search (⌘K)"
        >
          <Search className="w-4 h-4" />
        </button>

        <button
          onClick={() => handleNavClick('/scanner')}
          className="p-1.5 hover:bg-[#005a9e] rounded-lg text-emerald-200 hover:text-white transition-colors relative cursor-pointer flex items-center justify-center"
          title="Scan Member QR ID Card (⌘Q)"
        >
          <QrCode className="w-4 h-4 text-emerald-300" />
        </button>

        <button
          onClick={() => handleNavClick('/ai-platform')}
          className="p-1.5 hover:bg-[#005a9e] rounded-lg text-blue-100 hover:text-white transition-colors relative cursor-pointer flex items-center justify-center"
          title="JUMO Enterprise AI Copilot"
        >
          <Bot className="w-4 h-4 text-cyan-300" />
          <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-cyan-400 rounded-full"></span>
        </button>

        <button
          onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
          className={`p-1.5 rounded-lg transition-colors relative cursor-pointer flex items-center justify-center ${
            isNotificationsOpen ? 'bg-[#005a9e] text-emerald-300 font-bold' : 'hover:bg-[#005a9e] text-blue-100 hover:text-white'
          }`}
          title="System Notifications"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
        </button>

        <div className="h-4 w-[1px] bg-blue-400/30 mx-0.5"></div>

        <div className="flex items-center gap-2 cursor-pointer group" onClick={() => handleNavClick('/owner-login')}>
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-inner border border-white/20 group-hover:scale-105 transition-transform" title="Switch Institutional Access">
            <UserIcon className="w-3.5 h-3.5 text-white" />
          </div>
          <div className="hidden lg:flex flex-col text-left leading-none">
            <span className="text-xs font-bold text-white truncate max-w-[120px]">
              {user?.name || 'Enterprise User'}
            </span>
            <span className="text-[9px] text-cyan-200 font-mono uppercase mt-0.5 tracking-wider truncate max-w-[120px]">
              {user?.role || 'Verified Tenant'}
            </span>
          </div>
        </div>
      </div>
    </header>

    {/* Left Navigation Drawer */}
      {isLeftNavOpen && (
        <div className="fixed inset-0 z-50 flex bg-slate-900/30 backdrop-blur-sm animate-in fade-in duration-200" onClick={() => setIsLeftNavOpen(false)}>
          <div className="w-80 bg-white border-r border-slate-200 p-6 space-y-6 overflow-y-auto text-slate-800 shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between pb-4 border-b border-blue-200/60">
              <div className="flex items-center gap-2">
                <LayoutGrid className="w-5 h-5 text-[#0078D4]" />
                <span className="font-bold text-sm tracking-wider uppercase font-mono text-white">Enterprise Left Nav</span>
              </div>
              <button onClick={() => setIsLeftNavOpen(false)} className="p-1.5 hover:bg-blue-100 rounded-lg text-blue-700 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="text-[11px] font-mono font-bold text-[#0078D4] uppercase tracking-wider">Core Institutional Suites</div>
              <div className="space-y-1">
                {navItems.map(item => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item.path)}
                      className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-blue-50 hover:text-[#0078D4] transition-all text-left group"
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className="w-4 h-4 text-[#0078D4] group-hover:scale-110 transition-transform" />
                        <span>{item.label}</span>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 text-blue-400 group-hover:translate-x-1 transition-transform" />
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-blue-200/60">
              <div className="text-[11px] font-mono font-bold text-[#0078D4] uppercase tracking-wider">Sovereign Portals</div>
              <button onClick={() => handleNavClick('/public')} className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold bg-slate-50/80 border border-blue-200/50 text-blue-700 hover:bg-blue-100 transition-all text-left">
                <Globe className="w-4 h-4 text-[#0078D4]" />
                <span>Public Citizen Services</span>
              </button>
              <button onClick={() => handleNavClick('/login')} className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold bg-blue-50 border border-blue-600/50 text-white hover:bg-blue-100 transition-all text-left">
                <Lock className="w-4 h-4 text-[#0078D4]" />
                <span>Institutional Tenant Login</span>
              </button>
              <button onClick={() => handleNavClick('/control-center/login')} className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold bg-white border border-emerald-200 text-emerald-700 hover:bg-white transition-all text-left">
                <Cpu className="w-4 h-4 text-emerald-400" />
                <span>JUMO UEOS Control Center</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Right Utility Panel Drawer */}
      {isRightUtilityOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/30 backdrop-blur-sm animate-in fade-in duration-200" onClick={() => setIsRightUtilityOpen(false)}>
          <div className="w-96 bg-white border-l border-slate-200 p-6 space-y-6 overflow-y-auto text-slate-800 shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between pb-4 border-b border-blue-200/60">
              <div className="flex items-center gap-2">
                <Sliders className="w-5 h-5 text-[#0078D4]" />
                <span className="font-bold text-sm tracking-wider uppercase font-mono text-white">Right Utility Panel</span>
              </div>
              <button onClick={() => setIsRightUtilityOpen(false)} className="p-1.5 hover:bg-blue-100 rounded-lg text-blue-700 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Sovereign Calculator */}
            <div className="p-4 bg-slate-50/80 border border-blue-200/80 rounded-2xl space-y-3">
              <div className="text-xs font-bold text-[#0078D4] flex items-center gap-1.5 font-mono">
                <Calculator className="w-4 h-4 text-emerald-400" />
                <span>Sovereign RTGS Financial Calculator</span>
              </div>
              <input
                type="text"
                value={calcInput}
                onChange={e => setCalcInput(e.target.value)}
                placeholder="e.g. 5000 * 1.18"
                className="w-full px-3 py-2 bg-white border border-blue-200/60 rounded-xl text-xs font-mono text-white focus:outline-none focus:ring-1 focus:ring-cyan-400"
              />
              <div className="flex items-center justify-between text-xs font-mono bg-blue-50 p-2 rounded-xl border border-blue-200/60">
                <span className="text-blue-700">Calculated Result:</span>
                <span className="font-bold text-emerald-400 text-sm">{calcResult}</span>
              </div>
            </div>

            {/* Sovereign Note / Scratchpad */}
            <div className="space-y-2">
              <div className="text-xs font-bold text-[#0078D4] flex items-center gap-1.5 font-mono">
                <FileText className="w-4 h-4 text-blue-400" />
                <span>Executive Scratchpad & Notes</span>
              </div>
              <textarea
                rows={4}
                value={utilityScratchpad}
                onChange={e => setUtilityScratchpad(e.target.value)}
                className="w-full p-3 bg-slate-50/80 border border-blue-200/80 rounded-2xl text-xs font-mono text-blue-100 focus:outline-none focus:ring-1 focus:ring-cyan-400 leading-relaxed"
                placeholder="Type temporary institutional notes here..."
              />
            </div>

            {/* System Status Quick Monitor */}
            <div className="p-4 bg-white/90 border border-emerald-200 rounded-2xl space-y-2 font-mono text-xs">
              <div className="flex items-center justify-between text-emerald-400 font-bold">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>JUMO UEOS LEVEL 5</span>
                </span>
                <span className="text-[10px] bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded border border-emerald-200">ONLINE</span>
              </div>
              <div className="text-[11px] text-blue-700 flex justify-between">
                <span>Hardware Encryption:</span>
                <span className="text-white">AES-256-GCM Active</span>
              </div>
              <div className="text-[11px] text-blue-700 flex justify-between">
                <span>Database Sync:</span>
                <span className="text-[#0078D4]">0ms Lag (Synchronous)</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Favorites Dropdown */}
      {isFavoritesOpen && (
        <div className="absolute top-14 right-32 z-50 w-72 bg-white border border-slate-200 rounded-2xl p-4 shadow-xl text-slate-800 space-y-3 animate-in fade-in duration-150">
          <div className="flex items-center justify-between pb-2 border-b border-blue-200/60 font-mono text-xs font-bold text-amber-700">
            <span className="flex items-center gap-1.5">
              <Star className="w-4 h-4" />
              <span>Bookmarked Enterprise Views</span>
            </span>
            <button onClick={() => setIsFavoritesOpen(false)} className="text-blue-700 hover:text-white"><X className="w-3.5 h-3.5" /></button>
          </div>
          <div className="space-y-1 max-h-60 overflow-y-auto">
            {favorites.map(path => {
              const item = navItems.find(n => n.path === path) || { label: path, icon: Star };
              const Icon = item.icon;
              return (
                <div key={path} className="flex items-center justify-between p-2 rounded-xl hover:bg-blue-100 group transition-colors">
                  <button onClick={() => handleNavClick(path)} className="flex items-center gap-2 text-xs text-blue-100 hover:text-white font-semibold">
                    <Icon className="w-3.5 h-3.5 text-[#0078D4]" />
                    <span>{item.label}</span>
                  </button>
                  <button onClick={(e) => toggleFavorite(path, e)} className="text-amber-400 hover:scale-110 transition-transform">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Quick Actions Dropdown */}
      {isQuickActionsOpen && (
        <div className="absolute top-14 right-24 z-50 w-72 bg-white border border-slate-200 rounded-2xl p-4 shadow-xl text-slate-800 space-y-3 animate-in fade-in duration-150">
          <div className="flex items-center justify-between pb-2 border-b border-blue-200/60 font-mono text-xs font-bold text-[#0078D4]">
            <span className="flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-[#0078D4]" />
              <span>Sovereign Quick Actions</span>
            </span>
            <button onClick={() => setIsQuickActionsOpen(false)} className="text-blue-700 hover:text-white"><X className="w-3.5 h-3.5" /></button>
          </div>
          <div className="grid grid-cols-1 gap-1.5 text-xs">
            <button onClick={() => handleNavClick('/treasury')} className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50/80 hover:bg-blue-100 text-blue-100 hover:text-white border border-blue-200/60 transition-all text-left">
              <DollarSign className="w-4 h-4 text-emerald-400" />
              <span className="font-semibold">New RTGS Payment Transfer</span>
            </button>
            <button onClick={() => handleNavClick('/ai-platform')} className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50/80 hover:bg-blue-100 text-blue-100 hover:text-white border border-blue-200/60 transition-all text-left">
              <Sparkles className="w-4 h-4 text-[#0078D4]" />
              <span className="font-semibold">Generate AI Enterprise Report</span>
            </button>
            <button onClick={() => handleNavClick('/tenant')} className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50/80 hover:bg-blue-100 text-blue-100 hover:text-white border border-blue-200/60 transition-all text-left">
              <Building2 className="w-4 h-4 text-blue-400" />
              <span className="font-semibold">Register Institutional Tenant</span>
            </button>
          </div>
        </div>
      )}

      {/* Recently Opened Dropdown */}
      {isRecentlyOpenedOpen && (
        <div className="absolute top-14 right-16 z-50 w-72 bg-white border border-slate-200 rounded-2xl p-4 shadow-xl text-slate-800 space-y-3 animate-in fade-in duration-150">
          <div className="flex items-center justify-between pb-2 border-b border-blue-200/60 font-mono text-xs font-bold text-slate-700">
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-[#0078D4]" />
              <span>Recently Opened Views</span>
            </span>
            <button onClick={() => setIsRecentlyOpenedOpen(false)} className="text-blue-700 hover:text-white"><X className="w-3.5 h-3.5" /></button>
          </div>
          <div className="space-y-1.5">
            {recentPaths.map((item, i) => (
              <button
                key={i}
                onClick={() => handleNavClick(item.path)}
                className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-blue-100 text-left transition-colors group"
              >
                <div className="space-y-0.5">
                  <div className="text-xs font-semibold text-white group-hover:text-[#0078D4] transition-colors">{item.label}</div>
                  <div className="text-[10px] text-blue-400 font-mono">{item.path}</div>
                </div>
                <span className="text-[10px] text-blue-700 font-mono shrink-0">{item.time}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Notifications Dropdown */}
      {isNotificationsOpen && (
        <div className="absolute top-14 right-12 z-50 w-80 bg-white border border-slate-200 rounded-2xl p-4 shadow-xl text-slate-800 space-y-3 animate-in fade-in duration-150">
          <div className="flex items-center justify-between pb-2 border-b border-blue-200/60 font-mono text-xs font-bold text-emerald-700">
            <span className="flex items-center gap-1.5">
              <Bell className="w-4 h-4 text-emerald-400 animate-pulse" />
              <span>System Notifications (3 New)</span>
            </span>
            <button onClick={() => setIsNotificationsOpen(false)} className="text-blue-700 hover:text-white"><X className="w-3.5 h-3.5" /></button>
          </div>
          <div className="space-y-2 text-xs">
            <div className="p-2.5 rounded-xl bg-slate-50/80 border border-blue-200/60 space-y-1">
              <div className="flex items-center justify-between font-bold text-[#0078D4]">
                <span>Sovereign Node Sync</span>
                <span className="text-[10px] text-blue-400">1m ago</span>
              </div>
              <p className="text-[11px] text-slate-700">Kampala Central Datacenter ledger sync completed with 0 errors.</p>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50/80 border border-blue-200/60 space-y-1">
              <div className="flex items-center justify-between font-bold text-emerald-400">
                <span>Level 5 Cryptographic Check</span>
                <span className="text-[10px] text-blue-400">14m ago</span>
              </div>
              <p className="text-[11px] text-slate-700">Hardware ring-0 zero-trust schema verified across all tenant partitions.</p>
            </div>
          </div>
        </div>
      )}

      {/* Keyboard Shortcuts Modal */}
      {isShortcutsModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 animate-in fade-in duration-200" onClick={() => setIsShortcutsModalOpen(false)}>
          <div className="max-w-lg w-full bg-white border border-slate-200 rounded-3xl p-6 shadow-2xl text-slate-800 space-y-6" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between pb-4 border-b border-blue-200/60">
              <div className="flex items-center gap-2.5">
                <Keyboard className="w-6 h-6 text-[#0078D4]" />
                <div>
                  <h3 className="text-base font-bold text-white tracking-tight">Sovereign Keyboard Shortcuts</h3>
                  <p className="text-xs text-blue-700">JUMO DIGITAL ENTERPRISE PLATFORM Navigation Bindings</p>
                </div>
              </div>
              <button onClick={() => setIsShortcutsModalOpen(false)} className="p-2 hover:bg-blue-100 rounded-xl text-blue-700 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs font-mono">
              <div className="p-3 bg-slate-50/80 rounded-xl border border-blue-200/60 flex items-center justify-between">
                <span className="text-slate-700">Universal Search</span>
                <kbd className="px-2 py-1 bg-slate-100 border border-slate-300 rounded font-bold text-slate-800">⌘ + K</kbd>
              </div>
              <div className="p-3 bg-slate-50/80 rounded-xl border border-blue-200/60 flex items-center justify-between">
                <span className="text-slate-700">App Launcher</span>
                <kbd className="px-2 py-1 bg-slate-100 border border-slate-300 rounded font-bold text-slate-800">⌘ + L</kbd>
              </div>
              <div className="p-3 bg-slate-50/80 rounded-xl border border-blue-200/60 flex items-center justify-between">
                <span className="text-slate-700">Left Navigation</span>
                <kbd className="px-2 py-1 bg-slate-100 border border-slate-300 rounded font-bold text-slate-800">⌘ + B</kbd>
              </div>
              <div className="p-3 bg-slate-50/80 rounded-xl border border-blue-200/60 flex items-center justify-between">
                <span className="text-slate-700">Utility Panel</span>
                <kbd className="px-2 py-1 bg-slate-100 border border-slate-300 rounded font-bold text-slate-800">⌘ + U</kbd>
              </div>
              <div className="p-3 bg-slate-50/80 rounded-xl border border-blue-200/60 flex items-center justify-between">
                <span className="text-slate-700">Home Workspace</span>
                <kbd className="px-2 py-1 bg-slate-100 border border-slate-300 rounded font-bold text-slate-800">⌘ + H</kbd>
              </div>
              <div className="p-3 bg-slate-50/80 rounded-xl border border-blue-200/60 flex items-center justify-between">
                <span className="text-slate-700">Refresh View</span>
                <kbd className="px-2 py-1 bg-slate-100 border border-slate-300 rounded font-bold text-slate-800">⌘ + R</kbd>
              </div>
            </div>

            <div className="text-center pt-2">
              <button onClick={() => setIsShortcutsModalOpen(false)} className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs transition-all shadow">
                Close Shortcuts Guide
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Mobile Navigation Bar (Fixed for Mobile devices) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-slate-200 z-50 px-2 py-2 flex items-center justify-around text-xs font-sans shadow-2xl">
        <button onClick={() => handleNavClick('/workspace')} className={`flex flex-col items-center gap-1 p-1 rounded-lg ${currentPath === '/workspace' || currentPath === '/' ? 'text-[#0078D4] font-bold' : 'text-blue-700'}`}>
          <Home className="w-5 h-5" />
          <span className="text-[10px]">Home</span>
        </button>
        <button onClick={() => setIsLeftNavOpen(true)} className="flex flex-col items-center gap-1 p-1 rounded-lg text-blue-700 hover:text-white">
          <LayoutGrid className="w-5 h-5" />
          <span className="text-[10px]">Nav</span>
        </button>
        <button onClick={() => handleNavClick('/ai-platform')} className={`flex flex-col items-center gap-1 p-1 rounded-lg ${currentPath.includes('/ai') ? 'text-[#0078D4] font-bold' : 'text-blue-700'}`}>
          <Bot className="w-5 h-5 text-[#0078D4]" />
          <span className="text-[10px]">AI Copilot</span>
        </button>
        <button onClick={() => setIsQuickActionsOpen(true)} className="flex flex-col items-center gap-1 p-1 rounded-lg text-blue-700 hover:text-white">
          <Zap className="w-5 h-5" />
          <span className="text-[10px]">Actions</span>
        </button>
        <button onClick={() => setIsRightUtilityOpen(true)} className="flex flex-col items-center gap-1 p-1 rounded-lg text-blue-700 hover:text-white">
          <Sliders className="w-5 h-5" />
          <span className="text-[10px]">Utility</span>
        </button>
      </div>
    </>
  );
};

export default JUMOEnterpriseHeader;
