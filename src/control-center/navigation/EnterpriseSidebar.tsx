import React, { useState } from 'react';
import { 
  Building2, DollarSign, Zap, Shield, ShieldCheck, Cloud, Cpu, 
  Code, Microscope, Package, Sliders, Settings, Activity, 
  ChevronLeft, ChevronRight, X, Layers, Users, GitBranch, Terminal,
  Globe, Sparkles, GraduationCap, Church, Landmark, Lock, QrCode
} from 'lucide-react';

export interface EnterpriseSidebarProps {
  currentRoute: string;
  onNavigate?: (route: string) => void;
  isOpenOnMobile?: boolean;
  onCloseMobile?: () => void;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

export const EnterpriseSidebar: React.FC<EnterpriseSidebarProps> = ({
  currentRoute,
  onNavigate,
  isOpenOnMobile = false,
  onCloseMobile,
  isCollapsed: controlledCollapsed,
  onToggleCollapse
}) => {
  const [internalCollapsed, setInternalCollapsed] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('jumo_sidebar_collapsed') === 'true';
    }
    return false;
  });

  const isCollapsed = controlledCollapsed !== undefined ? controlledCollapsed : internalCollapsed;

  const handleToggle = () => {
    if (onToggleCollapse) {
      onToggleCollapse();
    } else {
      setInternalCollapsed(!internalCollapsed);
      if (typeof window !== 'undefined') {
        localStorage.setItem('jumo_sidebar_collapsed', String(!internalCollapsed));
      }
    }
  };

  const navGroups = [
    {
      groupTitle: 'Approved Products (Commercial)',
      items: [
        { id: 'fintech', label: 'JUMO Fintech', route: '/platform/finpay', icon: Landmark, badge: 'FINTECH', badgeColor: 'bg-emerald-50 text-emerald-700' },
        { id: 'education-erp', label: 'Universal School ERP', route: '/platform/edu-alumni', icon: GraduationCap, badge: 'SCHOOL ERP', badgeColor: 'bg-blue-50 text-blue-700' },
        { id: 'church-erp', label: 'JUMO Church ERP', route: '/platform/church', icon: Church, badge: 'CHURCH ERP', badgeColor: 'bg-purple-50 text-purple-700' },
      ]
    },
    {
      groupTitle: 'Control Center Command Plane',
      items: [
        { id: 'control-center', label: 'Control Center Hub', route: '/control-center', icon: Sliders, badge: 'RING-0', badgeColor: 'bg-slate-900 text-white' },
        { id: 'scanner', label: 'QR Member ID Scanner', route: '/scanner', icon: QrCode, badge: 'SCANNER', badgeColor: 'bg-emerald-50 text-emerald-700' },
        { id: 'store', label: 'Platform & Capability Store', route: '/control-center/store', icon: Package, badge: 'CATALOG', badgeColor: 'bg-cyan-50 text-cyan-700' },
        { id: 'aegis', label: 'AEGIS Security Operations', route: '/control-center/security', icon: Shield, badge: 'ZERO-TRUST', badgeColor: 'bg-purple-50 text-purple-700' },
        { id: 'trust', label: 'JUMO TRUST Platform', route: '/control-center/trust', icon: ShieldCheck, badge: 'INTEGRITY', badgeColor: 'bg-amber-50 text-amber-800' },
        { id: 'ai', label: 'AI Command Center', route: '/control-center/ai', icon: Cpu, badge: 'ROUTER', badgeColor: 'bg-violet-50 text-violet-700' },
        { id: 'cloud', label: 'Cloud & Infrastructure', route: '/control-center/cloud', icon: Cloud, badge: 'MULTI-CLOUD', badgeColor: 'bg-sky-50 text-sky-700' },
        { id: 'tenants', label: 'Tenant Administration', route: '/control-center/tenants', icon: Building2, badge: 'TENANTS', badgeColor: 'bg-indigo-50 text-indigo-700' },
        { id: 'monitoring', label: 'Telemetry & Observability', route: '/control-center/monitoring', icon: Activity, badge: 'NODES', badgeColor: 'bg-emerald-50 text-emerald-700' },
        { id: 'settings', label: 'System Configuration', route: '/control-center/settings', icon: Settings },
      ]
    }
  ];

  const handleNavClick = (route: string) => {
    if (onNavigate) {
      onNavigate(route);
    } else if (typeof window !== 'undefined') {
      window.location.href = route;
    }
    if (onCloseMobile) {
      onCloseMobile();
    }
  };

  const isRouteActive = (route: string) => {
    if (route === '/control-center' && (currentRoute === '/owner' || currentRoute === '/control-center' || currentRoute === '/')) {
      return true;
    }
    if (route !== '/control-center' && currentRoute.startsWith(route)) {
      return true;
    }
    // Mapping compatibility
    if (route === '/platform/finpay' && (currentRoute.startsWith('/platform/finpay') || currentRoute.startsWith('/finance') || currentRoute.startsWith('/pay') || currentRoute.startsWith('/faap') || currentRoute.startsWith('/treasury') || currentRoute.includes('fintech'))) return true;
    if (route === '/platform/edu-alumni' && (currentRoute.startsWith('/platform/edu-alumni') || currentRoute.startsWith('/education') || currentRoute.startsWith('/edu') || currentRoute.startsWith('/alumni'))) return true;
    if (route === '/platform/church' && (currentRoute.startsWith('/platform/church') || currentRoute.startsWith('/church') || currentRoute.includes('church') || currentRoute.includes('diocese'))) return true;
    if (route === '/control-center/security' && (currentRoute.startsWith('/platform/aegis') || currentRoute.startsWith('/security') || currentRoute.startsWith('/jumo-security'))) return true;
    if (route === '/control-center/cloud' && (currentRoute.startsWith('/platform/cloud') || currentRoute.startsWith('/cloud') || currentRoute.startsWith('/jumo-cloud'))) return true;
    if (route === '/control-center/ai' && (currentRoute.startsWith('/platform/ai') || currentRoute.startsWith('/ai') || currentRoute.startsWith('/jumo-intelligence'))) return true;
    if (route === '/control-center/trust' && (currentRoute.startsWith('/platform/trust') || currentRoute.startsWith('/trust'))) return true;
    if (route === '/control-center/store' && (currentRoute.startsWith('/platform/store') || currentRoute.startsWith('/store') || currentRoute.startsWith('/marketplace'))) return true;
    if (route === '/control-center/monitoring' && (currentRoute.startsWith('/operations') || currentRoute.startsWith('/developer-center'))) return true;
    if (route === '/control-center/settings' && currentRoute.startsWith('/settings')) return true;
    if (route === '/control-center/tenants' && currentRoute.startsWith('/tenant')) return true;
    return false;
  };

  const renderNavContent = () => (
    <div className="flex flex-col h-full bg-white text-slate-700 font-sans select-none">
      {/* Mobile Drawer Header */}
      {isOpenOnMobile && (
        <div className="flex items-center justify-between p-4 border-b border-slate-200 lg:hidden">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded bg-[#0078D4] text-white flex items-center justify-center font-bold font-mono">
              J
            </div>
            <span className="font-bold text-sm text-slate-900">JUMO UEOS Navigation</span>
          </div>
          <button
            onClick={onCloseMobile}
            className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Navigation Groups List */}
      <div className="flex-1 overflow-y-auto p-3 space-y-6">
        {navGroups.map((group) => (
          <div key={group.groupTitle} className="space-y-1">
            {!isCollapsed && (
              <div className="px-2 text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">
                {group.groupTitle}
              </div>
            )}
            <div className="space-y-1">
              {group.items.map((item) => {
                const Icon = item.icon;
                const active = isRouteActive(item.route);

                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.route)}
                    title={isCollapsed ? `${item.label}${item.badge ? ` (${item.badge})` : ''}` : undefined}
                    className={`w-full flex items-center ${isCollapsed ? 'justify-center p-2.5' : 'justify-between px-3 py-2'} rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      active
                        ? 'bg-[#0078D4] text-white font-bold shadow-xs'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                    }`}
                  >
                    <div className={`flex items-center gap-3 ${isCollapsed ? 'justify-center' : ''} min-w-0`}>
                      <Icon className={`w-4 h-4 shrink-0 ${active ? 'text-white' : 'text-slate-500'}`} />
                      {!isCollapsed && <span className="truncate">{item.label}</span>}
                    </div>
                    {!isCollapsed && item.badge && (
                      <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded font-bold shrink-0 ml-2 border ${
                        active
                          ? 'bg-blue-700 text-white border-blue-500'
                          : `${item.badgeColor || 'bg-slate-100 text-slate-600 border-slate-200'}`
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Sidebar Collapse/Expand Footer Button (Desktop) */}
      <div className="p-3 border-t border-slate-200 hidden lg:flex items-center justify-between">
        {!isCollapsed && (
          <div className="text-[11px] text-slate-500 font-mono truncate">
            <span className="font-bold text-slate-700">RING-0 ROOT</span> • AES-256
          </div>
        )}
        <button
          onClick={handleToggle}
          className={`p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-slate-900 transition-colors ${isCollapsed ? 'w-full flex justify-center' : ''}`}
          title={isCollapsed ? 'Expand Navigation (⌘B)' : 'Collapse Navigation (⌘B)'}
        >
          {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside className={`hidden lg:flex flex-col border-r border-slate-200 bg-white transition-all duration-200 ${
        isCollapsed ? 'w-16' : 'w-64'
      } shrink-0`}>
        {renderNavContent()}
      </aside>

      {/* Mobile Slide-over Drawer */}
      {isOpenOnMobile && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div 
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity"
            onClick={onCloseMobile}
          />
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white shadow-xl z-50">
            {renderNavContent()}
          </div>
        </div>
      )}
    </>
  );
};

export default EnterpriseSidebar;
