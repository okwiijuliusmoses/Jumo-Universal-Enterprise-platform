import React from "react";
import { 
  LayoutDashboard, Cpu, UserCheck, Box, Factory, Server, 
  Sliders, GitMerge, Bot, Landmark, Lock, BarChart3, Activity,
  LucideIcon
} from "lucide-react";

export interface NavItem {
  id: string;
  label: string;
  icon: LucideIcon;
}

export interface UEOSNavigationRailProps {
  items: NavItem[];
  activeId: string;
  onSelect: (id: string) => void;
  mobileOpen?: boolean;
  onMobileClose?: () => void;
  tenantScope?: string;
}

export const UEOSNavigationRail: React.FC<UEOSNavigationRailProps> = ({
  items,
  activeId,
  onSelect,
  mobileOpen = false,
  onMobileClose,
  tenantScope = "CORE",
}) => {
  return (
    <>
      {/* Desktop Navigation Rail & Drawer */}
      <aside
        id="ueos-nav-rail-sidebar"
        className={`
          fixed md:sticky top-[45px] left-0 z-40 h-[calc(100vh-45px)] w-60 md:w-16 lg:w-56 bg-slate-900 text-slate-300 border-r border-slate-800 flex-shrink-0 flex flex-col transition-transform duration-200 ease-in-out
          ${mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        <div id="ueos-nav-rail-header" className="p-2.5 border-b border-slate-800 text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider hidden lg:block">
          Platform Workspace Navigation
        </div>

        <nav id="ueos-nav-rail-items" className="flex-1 overflow-y-auto py-2 space-y-1 px-1.5">
          {items.map((item) => {
            const Icon = item.icon;
            const isActive = activeId === item.id;
            return (
              <button
                key={item.id}
                id={`ueos-nav-item-${item.id}`}
                onClick={() => {
                  onSelect(item.id);
                  if (onMobileClose) onMobileClose();
                }}
                className={`w-full flex items-center gap-3 px-2.5 py-2 rounded transition cursor-pointer text-xs font-medium ${
                  isActive 
                    ? "bg-slate-800 text-white font-bold border-l-2 border-teal-400 shadow-xs" 
                    : "text-slate-400 hover:text-slate-100 hover:bg-slate-800/60"
                }`}
                title={item.label}
              >
                <Icon className={`h-4 w-4 shrink-0 ${isActive ? "text-teal-400" : "text-slate-400"}`} />
                <span className="truncate md:hidden lg:inline text-[12px]">{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div id="ueos-nav-rail-footer" className="p-3 border-t border-slate-800 text-[10px] font-mono text-slate-400 space-y-0.5 hidden lg:block">
          <div className="text-teal-400 font-bold">FAAP $0.00 Parity Verified</div>
          <div className="truncate">Zero-Trust Scope: {tenantScope}</div>
        </div>
      </aside>

      {/* Mobile Bottom Navigation Bar */}
      <nav id="ueos-mobile-bottom-bar" className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-900 border-t border-slate-800 flex items-center justify-around py-2 text-[10px] text-slate-400 shadow-lg">
        {items.slice(0, 5).map((item) => {
          const Icon = item.icon;
          const isActive = activeId === item.id;
          return (
            <button 
              key={item.id}
              id={`ueos-mobile-nav-item-${item.id}`}
              onClick={() => onSelect(item.id)}
              className={`flex flex-col items-center gap-0.5 ${isActive ? "text-teal-400 font-bold" : "text-slate-400"}`}
            >
              <Icon className="h-4 w-4" />
              <span className="text-[9px]">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </>
  );
};
