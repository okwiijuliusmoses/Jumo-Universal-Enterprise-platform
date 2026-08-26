/**
 * JUMO UEOS — Authoritative Enterprise Global Navigation Bar
 * Microsoft 365 / Azure Portal inspired compact white header (h-14)
 * Enforces clean typography, zero dark mode styling, and essential global controls only.
 * Includes Microsoft Office 365 style 9-dots Platform Launcher (Waffle Menu).
 */

import React, { useState } from 'react';
import { 
  Search, Bell, HelpCircle, Settings, User as UserIcon, Menu, 
  CheckCircle2, Globe, Shield, Sparkles, Sliders, LayoutGrid,
  Building2, DollarSign, Zap, Cloud, Cpu, Code, Microscope, Package, Landmark, X,
  GraduationCap, Church, Factory, Users
} from 'lucide-react';

export interface EnterpriseNavbarProps {
  currentRoute?: string;
  onNavigate?: (path: string) => void;
  onToggleSidebar?: () => void;
  user?: {
    name?: string;
    role?: string;
    email?: string;
    [key: string]: any;
  };
}

export const EnterpriseNavbar: React.FC<EnterpriseNavbarProps> = ({
  currentRoute = '/',
  onNavigate,
  onToggleSidebar,
  user
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showPlatformLauncher, setShowPlatformLauncher] = useState(false);

  // Derive current platform identity from route
  const getPlatformIdentity = () => {
    if (currentRoute.includes('/erp') || currentRoute.includes('/domains')) return { name: 'ERP Platform Center', badge: '16 DOMAINS', color: 'bg-blue-50 text-blue-700 border-blue-200' };
    if (currentRoute.includes('/faap')) return { name: 'FAAP Financial Backbone', badge: '1.5% CLEARING', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' };
    if (currentRoute.includes('/fintech')) return { name: 'Fintech Payment Gateway', badge: 'M-PESA SWITCH', color: 'bg-teal-50 text-teal-700 border-teal-200' };
    if (currentRoute.includes('/digital-pay') || currentRoute.includes('/treasury')) return { name: 'JUMO Digital Pay & Treasury', badge: 'RTGS CLEARING', color: 'bg-indigo-50 text-indigo-700 border-indigo-200' };
    if (currentRoute.includes('/aegis') || currentRoute.includes('/security') || currentRoute.includes('/jumo-security')) return { name: 'AEGIS Security Platform', badge: 'ZERO TRUST RING-0', color: 'bg-purple-50 text-purple-700 border-purple-200' };
    if (currentRoute.includes('/cloud') || currentRoute.includes('/jumo-cloud')) return { name: 'JUMO Cloud Infrastructure', badge: 'MULTI-CLOUD K8S', color: 'bg-sky-50 text-sky-700 border-sky-200' };
    if (currentRoute.includes('/factory') || currentRoute.includes('/sovereign') || currentRoute.includes('/uamp')) return { name: 'Software Factory Studio', badge: 'NO-CODE STUDIO', color: 'bg-amber-50 text-amber-700 border-amber-200' };
    if (currentRoute.includes('/ai')) return { name: 'AI Command Center', badge: 'MULTI-MODEL ROUTER', color: 'bg-violet-50 text-violet-700 border-violet-200' };
    if (currentRoute.includes('/research') || currentRoute.includes('/innovation') || currentRoute.includes('/dirc')) return { name: 'Innovation & Research Labs', badge: 'DIGITAL TWIN', color: 'bg-rose-50 text-rose-700 border-rose-200' };
    if (currentRoute.includes('/store') || currentRoute.includes('/marketplace')) return { name: 'Platform Store & Registry', badge: 'ECOSYSTEM STORE', color: 'bg-cyan-50 text-cyan-700 border-cyan-200' };
    if (currentRoute.includes('/owner') || currentRoute.includes('/control-center')) return { name: 'Sovereign Control Center', badge: 'LAUNCHPAD', color: 'bg-blue-50 text-[#0078D4] border-blue-200' };
    if (currentRoute.includes('/settings')) return { name: 'System Settings Console', badge: 'GLOBAL CONFIG', color: 'bg-slate-100 text-slate-700 border-slate-200' };
    if (currentRoute.includes('/operations') || currentRoute.includes('/monitoring') || currentRoute.includes('/developer-center')) return { name: 'Operations & Telemetry', badge: 'LIVE MONITORING', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' };
    return { name: 'Enterprise Control Plane', badge: 'SOVEREIGN OS', color: 'bg-slate-100 text-slate-700 border-slate-200' };
  };

  const identity = getPlatformIdentity();

  const handleNav = (path: string) => {
    setShowPlatformLauncher(false);
    setShowNotifications(false);
    setShowProfileMenu(false);
    if (onNavigate) {
      onNavigate(path);
    } else if (typeof window !== 'undefined') {
      window.location.href = path;
    }
  };

  const launcherPlatforms = [
    { name: 'Control Center', route: '/control-center', icon: Sliders, color: 'text-[#0078D4] bg-blue-50' },
    { name: 'Education ERP', route: '/education-erp', icon: GraduationCap, color: 'text-indigo-700 bg-indigo-50' },
    { name: 'Church & Diocese ERP', route: '/church-erp', icon: Church, color: 'text-amber-700 bg-amber-50' },
    { name: 'Alumni ERP', route: '/alumni-erp', icon: Users, color: 'text-rose-700 bg-rose-50' },
    { name: 'JUMO FAAP', route: '/faap', icon: DollarSign, color: 'text-emerald-700 bg-emerald-50' },
    { name: 'Digital Pay', route: '/digital-pay', icon: Zap, color: 'text-indigo-700 bg-indigo-50' },
    { name: 'AEGIS Security', route: '/control-center/security', icon: Shield, color: 'text-purple-700 bg-purple-50' },
    { name: 'AI Command Center', route: '/control-center/ai', icon: Cpu, color: 'text-violet-700 bg-violet-50' },
    { name: 'JUMO TRUST', route: '/control-center/trust', icon: Shield, color: 'text-amber-700 bg-amber-50' },
    { name: 'Platform Store', route: '/control-center/store', icon: Package, color: 'text-cyan-700 bg-cyan-50' },
    { name: 'Cloud Console', route: '/control-center/cloud', icon: Cloud, color: 'text-sky-700 bg-sky-50' },
  ];

  return (
    <header className="h-14 bg-white border-b border-slate-200 px-4 flex items-center justify-between sticky top-0 z-40 select-none shadow-xs font-sans">
      {/* Left Section: 9-Dots Launcher, Navigation Toggle, Brand & Active Platform Identity */}
      <div className="flex items-center gap-2">
        {/* Microsoft Office 365 / Azure Style 9-Dots Platform Launcher */}
        <div className="relative">
          <button
            onClick={() => setShowPlatformLauncher(!showPlatformLauncher)}
            className={`p-2 rounded-lg transition-colors cursor-pointer flex items-center justify-center ${
              showPlatformLauncher ? 'bg-[#0078D4] text-white' : 'hover:bg-slate-100 text-slate-700'
            }`}
            title="Sovereign Platform Launcher (Office 365 Waffle)"
          >
            <LayoutGrid className="w-5 h-5" />
          </button>

          {/* Platform Launcher Waffle Modal Overlay */}
          {showPlatformLauncher && (
            <div className="absolute left-0 mt-2 w-80 sm:w-96 bg-white border border-slate-200 rounded-2xl shadow-xl p-4 z-50 text-xs animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
                <div className="font-black text-slate-900 text-sm flex items-center gap-2">
                  <LayoutGrid className="w-4 h-4 text-[#0078D4]" />
                  <span>JUMO UEOS Platform Launcher</span>
                </div>
                <button
                  onClick={() => setShowPlatformLauncher(false)}
                  className="p-1 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-700 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-3 gap-2 max-h-[380px] overflow-y-auto p-1">
                {launcherPlatforms.map((p) => {
                  const Icon = p.icon;
                  return (
                    <button
                      key={p.name}
                      onClick={() => handleNav(p.route)}
                      className="flex flex-col items-center justify-center p-3 rounded-xl hover:bg-slate-50 hover:shadow-xs border border-transparent hover:border-slate-200 transition-all text-center group cursor-pointer"
                    >
                      <div className={`w-10 h-10 rounded-xl ${p.color} flex items-center justify-center mb-2 group-hover:scale-105 transition-transform shadow-2xs`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="font-semibold text-slate-800 text-[11px] leading-tight group-hover:text-[#0078D4] line-clamp-2">
                        {p.name}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold">
                <span className="text-slate-500">6 Approved Products & Capabilities Active</span>
                <button
                  onClick={() => handleNav('/control-center/store')}
                  className="text-[#0078D4] hover:underline cursor-pointer"
                >
                  Explore Platform Store →
                </button>
              </div>
            </div>
          )}
        </div>

        {onToggleSidebar && (
          <button
            onClick={onToggleSidebar}
            className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-600 hover:text-slate-900 transition-colors cursor-pointer flex items-center justify-center"
            title="Toggle Left Navigation"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}

        <div 
          onClick={() => handleNav('/control-center')} 
          className="flex items-center gap-2.5 cursor-pointer group ml-1"
          title="Return to Sovereign Control Center Launchpad"
        >
          <div className="w-8 h-8 rounded-lg bg-[#0078D4] flex items-center justify-center text-white font-mono font-bold text-base shadow-sm group-hover:bg-[#005a9e] transition-colors">
            J
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm tracking-tight text-slate-900">JUMO UEOS</span>
              <span className="text-[10px] font-mono font-semibold px-1.5 py-0.5 bg-slate-100 text-slate-600 rounded border border-slate-200 uppercase hidden sm:inline">
                v14.0 LTS
              </span>
            </div>
            <span className="text-[10px] text-slate-500 font-medium tracking-wide">
              Sovereign Cloud Console
            </span>
          </div>
        </div>

        <div className="h-5 w-px bg-slate-200 mx-2 hidden sm:block" />

        {/* Dynamic Platform Identity Badge */}
        <div className="hidden md:flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-800">
            {identity.name}
          </span>
          <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border uppercase ${identity.color}`}>
            {identity.badge}
          </span>
        </div>
      </div>

      {/* Center Section: Compact Global Search Bar */}
      <div className="flex-1 max-w-md mx-4 hidden lg:block">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search enterprise platforms, tenants, ledgers, security policies... (⌘K)"
            className="w-full pl-9 pr-4 py-1.5 bg-slate-50 border border-slate-200 hover:border-slate-300 focus:border-[#0078D4] focus:bg-white rounded-lg text-xs text-slate-900 placeholder-slate-400 focus:outline-none transition-all h-8"
          />
        </div>
      </div>

      {/* Right Section: System Status, Notifications, Help & User Profile */}
      <div className="flex items-center gap-2">
        {/* Live Status Indicator */}
        <div className="hidden xl:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          <span>System Healthy</span>
        </div>

        {/* Platform Store Shortcut */}
        <button
          onClick={() => handleNav('/control-center/store')}
          className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-600 hover:text-[#0078D4] transition-colors cursor-pointer flex items-center gap-1 text-xs font-semibold px-2"
          title="Open Platform Store"
        >
          <Sliders className="w-4 h-4 text-[#0078D4]" />
          <span className="hidden sm:inline">Store</span>
        </button>

        {/* System Settings Shortcut */}
        <button
          onClick={() => handleNav('/control-center/settings')}
          className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
          title="System Settings"
        >
          <Settings className="w-4 h-4" />
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-600 hover:text-slate-900 transition-colors relative cursor-pointer flex items-center justify-center"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-[#0078D4] rounded-full" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white border border-slate-200 rounded-xl shadow-lg p-4 z-50 text-xs text-slate-700">
              <div className="font-bold text-slate-900 border-b border-slate-100 pb-2 mb-2 flex justify-between items-center">
                <span>System Notifications</span>
                <span className="text-[10px] text-[#0078D4] cursor-pointer">Mark all read</span>
              </div>
              <div className="space-y-2">
                <div className="p-2 bg-blue-50/50 rounded-lg border border-blue-100">
                  <div className="font-semibold text-blue-900">FAAP Clearing Switch</div>
                  <div className="text-slate-600 text-[11px] mt-0.5">All RTGS settlement ledgers balanced across 12 enterprise domains.</div>
                  <div className="text-[10px] text-slate-400 mt-1">2 mins ago</div>
                </div>
                <div className="p-2 bg-emerald-50/50 rounded-lg border border-emerald-100">
                  <div className="font-semibold text-emerald-900">AEGIS Zero-Trust Enforced</div>
                  <div className="text-slate-600 text-[11px] mt-0.5">Automated MFA verification passed for 256 cluster nodes.</div>
                  <div className="text-[10px] text-slate-400 mt-1">15 mins ago</div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="h-5 w-px bg-slate-200 mx-1" />

        {/* User Profile Pill */}
        <div className="relative">
          <div 
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-2 px-2 py-1 hover:bg-slate-100 rounded-lg cursor-pointer transition-colors"
          >
            <div className="w-7 h-7 rounded-full bg-[#0078D4] text-white flex items-center justify-center text-xs font-bold shadow-xs">
              {user?.name ? user.name.charAt(0).toUpperCase() : 'A'}
            </div>
            <div className="hidden xl:flex flex-col text-left leading-none">
              <span className="text-xs font-semibold text-slate-900 truncate max-w-[120px]">
                {user?.name || 'Sovereign Admin'}
              </span>
              <span className="text-[10px] text-slate-500 font-mono uppercase mt-0.5 tracking-wider truncate max-w-[120px]">
                {user?.role || 'Ring-0 Root'}
              </span>
            </div>
          </div>

          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-56 bg-white border border-slate-200 rounded-xl shadow-lg p-2 z-50 text-xs">
              <div className="p-2 border-b border-slate-100 mb-1">
                <div className="font-bold text-slate-900">{user?.name || 'Sovereign Administrator'}</div>
                <div className="text-slate-500 text-[11px] font-mono mt-0.5">{user?.email || 'admin@jumo.eu'}</div>
              </div>
              <button 
                onClick={() => handleNav('/control-center')}
                className="w-full text-left px-3 py-2 hover:bg-slate-50 rounded-lg text-slate-700 font-medium flex items-center gap-2 cursor-pointer"
              >
                <Sliders className="w-4 h-4 text-[#0078D4]" />
                <span>Control Center Launchpad</span>
              </button>
              <button 
                onClick={() => handleNav('/control-center/settings')}
                className="w-full text-left px-3 py-2 hover:bg-slate-50 rounded-lg text-slate-700 font-medium flex items-center gap-2 cursor-pointer"
              >
                <Settings className="w-4 h-4 text-slate-500" />
                <span>Platform Settings</span>
              </button>
              <div className="border-t border-slate-100 my-1" />
              <button 
                onClick={() => { 
                  localStorage.removeItem('jumo_current_user'); 
                  localStorage.removeItem('jumo_session_token'); 
                  window.location.href = '/public'; 
                }}
                className="w-full text-left px-3 py-2 hover:bg-rose-50 text-rose-600 rounded-lg font-semibold flex items-center gap-2 cursor-pointer"
              >
                <span>Sign Out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default EnterpriseNavbar;
