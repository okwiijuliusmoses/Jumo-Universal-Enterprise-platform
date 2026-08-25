/**
 * JUMO UEOS — Authoritative Enterprise Main Navigation Sidebar
 * Organized into logical groups with expandable sections, Lucide icons, and JUMO Enterprise Design System styling
 */

import React, { useState } from 'react';
import { 
  Globe, Building2, Shield, Layers, DollarSign, Bot, Landmark, FileText, 
  ChevronDown, ChevronRight, Activity, Server, Cpu, Lock, Settings, Code, 
  Terminal, Package, Sparkles, Database, Radio, GitBranch, Briefcase, Zap,
  BarChart3, Users, HardDrive
} from 'lucide-react';

export interface SidebarProps {
  currentRoute?: string;
  onNavigate?: (route: string) => void;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

interface NavGroup {
  id: string;
  title: string;
  icon: any;
  items: {
    label: string;
    route: string;
    icon: any;
    badge?: string;
  }[];
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  currentRoute = '/public', 
  onNavigate = (_route?: string) => {},
  isCollapsed = false,
  onToggleCollapse
}) => {
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({
    store: true,
    installed: true,
    domains: false,
    infra: true,
    ai: true,
    security: false,
    faap: true,
    admin: false,
  });

  const toggleGroup = (groupId: string) => {
    setExpandedGroups(prev => ({
      ...prev,
      [groupId]: !prev[groupId]
    }));
  };

  const navGroups: NavGroup[] = [
    {
      id: 'store',
      title: 'Platform Store',
      icon: Package,
      items: [
        { label: 'Platform Store & Catalogue', route: '/marketplace', icon: Package, badge: 'HEART' },
        { label: 'Public Discovery Gateway', route: '/public', icon: Globe },
        { label: 'Universal App Manufacturing', route: '/uamp', icon: Briefcase },
      ]
    },
    {
      id: 'installed',
      title: 'Installed Platforms',
      icon: Layers,
      items: [
        { label: 'Tenant Workspace Shell', route: '/tenant', icon: Building2 },
        { label: 'Sovereign Control Console', route: '/owner', icon: Shield, badge: 'RING-0' },
        { label: 'Domain Factory & Modules', route: '/domains', icon: Layers, badge: '16 ERPs' },
      ]
    },
    {
      id: 'domains',
      title: 'Enterprise Domains',
      icon: Building2,
      items: [
        { label: 'SACCO Enterprise ERP', route: '/domains/sacco', icon: DollarSign },
        { label: 'Church & Diocesan ERP', route: '/domains/church', icon: Landmark },
        { label: 'Education & Academic ERP', route: '/domains/edu', icon: FileText },
        { label: 'NGO Humanitarian Suite', route: '/domains/ngo', icon: Globe },
        { label: 'Healthcare & Clinic ERP', route: '/domains/health', icon: Activity },
        { label: 'Government Revenue ERP', route: '/domains/gov', icon: Shield },
      ]
    },
    {
      id: 'infra',
      title: 'Core Infrastructure & Kernel',
      icon: Server,
      items: [
        { label: 'Sovereign Operations Center', route: '/operations-center', icon: Activity, badge: 'LIVE' },
        { label: 'Kernel & Cluster Nodes', route: '/developer-center', icon: Server, badge: '256 Nodes' },
        { label: 'Workflow Orchestration', route: '/workflow', icon: GitBranch },
        { label: 'Integration Service Mesh', route: '/jumo-integration', icon: Cpu },
      ]
    },
    {
      id: 'ai',
      title: 'AI Command Center & Swarm',
      icon: Bot,
      items: [
        { label: 'AI Multi-Agent Swarm', route: '/ai-platform', icon: Bot, badge: 'Gemini 3.5' },
        { label: 'Intelligence Gateway', route: '/jumo-intelligence', icon: Sparkles },
        { label: 'DIRC Telemetry Lab', route: '/dirc', icon: Cpu },
        { label: 'Data Records Vault', route: '/jumo-data', icon: Database },
      ]
    },
    {
      id: 'security',
      title: 'Security & Identity',
      icon: Lock,
      items: [
        { label: 'AEGIS Zero-Trust Firewall', route: '/security', icon: Lock, badge: 'RING-0' },
        { label: 'Identity & RBAC Wallets', route: '/jumo-security', icon: Shield },
        { label: 'Unified Communications Bus', route: '/jumo-communications', icon: Radio },
        { label: 'API Management Lab', route: '/api-management', icon: Server },
      ]
    },
    {
      id: 'faap',
      title: 'Financial Backbone (FAAP)',
      icon: DollarSign,
      items: [
        { label: 'FAAP Consolidated Ledgers', route: '/faap', icon: DollarSign, badge: '1.5%' },
        { label: 'Sovereign Treasury Router', route: '/treasury', icon: Landmark },
        { label: 'FinTech Clearing Gateway', route: '/fintech', icon: Zap },
      ]
    },
    {
      id: 'admin',
      title: 'Settings & Administration',
      icon: Settings,
      items: [
        { label: 'Institutional Admin Center', route: '/admin', icon: Users },
        { label: 'Platform Global Settings', route: '/settings', icon: Settings },
        { label: 'Developer Documentation', route: '/documentation', icon: FileText },
      ]
    }
  ];

  return (
    <aside className={`${isCollapsed ? 'w-14' : 'w-64'} bg-white border-r border-slate-200 flex flex-col justify-between text-slate-700 font-sans select-none shrink-0 overflow-y-auto max-h-screen transition-all duration-200`}>
      <div className={`${isCollapsed ? 'p-2' : 'p-4'} space-y-4`}>
        <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'} px-2 pb-2 border-b border-slate-200`}>
          <div className="flex items-center gap-2 cursor-pointer" onClick={onToggleCollapse} title="Toggle Navigation">
            <div className="w-6 h-6 rounded-md bg-[#0078D4] flex items-center justify-center font-black text-white text-xs tracking-tighter shadow-sm shadow-blue-600/20">
              J
            </div>
            {!isCollapsed && <span className="font-bold text-xs text-slate-900 tracking-wide">UEOS KERNEL</span>}
          </div>
          {!isCollapsed && (
            <button
              onClick={onToggleCollapse}
              className="text-[10px] font-mono text-slate-500 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-1.5 py-0.5 rounded transition-colors"
              title="Collapse Navigation"
            >
              ❮
            </button>
          )}
        </div>

        <nav className="space-y-2">
          {navGroups.map((group) => {
            const GroupIcon = group.icon;
            const isExpanded = expandedGroups[group.id];
            const hasActiveChild = group.items.some(item => currentRoute === item.route || currentRoute.startsWith(`${item.route}/`));

            if (isCollapsed) {
              return (
                <div key={group.id} className="space-y-1.5 pt-1 border-t border-slate-100 first:border-0">
                  {group.items.map((item) => {
                    const Icon = item.icon;
                    const active = currentRoute === item.route;
                    return (
                      <button
                        key={item.route}
                        onClick={() => onNavigate(item.route)}
                        title={`${item.label}${item.badge ? ` (${item.badge})` : ''}`}
                        className={`w-full flex items-center justify-center p-2 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                          active 
                            ? 'bg-[#0078D4] text-white font-bold shadow-sm' 
                            : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                        }`}
                      >
                        <Icon className={`w-4 h-4 shrink-0 ${active ? 'text-white' : 'text-slate-500'}`} />
                      </button>
                    );
                  })}
                </div>
              );
            }

            return (
              <div key={group.id} className="space-y-1">
                <button
                  onClick={() => toggleGroup(group.id)}
                  className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                    hasActiveChild ? 'text-[#0078D4] bg-blue-50/80' : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <GroupIcon className={`w-3.5 h-3.5 ${hasActiveChild ? 'text-[#0078D4]' : 'text-slate-500'}`} />
                    <span>{group.title}</span>
                  </div>
                  {isExpanded ? (
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                  ) : (
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                  )}
                </button>

                {isExpanded && (
                  <div className="pl-3 space-y-0.5 border-l border-slate-200 ml-3 pt-0.5">
                    {group.items.map((item) => {
                      const Icon = item.icon;
                      const active = currentRoute === item.route;
                      return (
                        <button
                          key={item.route}
                          onClick={() => onNavigate(item.route)}
                          className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-md text-xs font-medium transition-all cursor-pointer ${
                            active 
                              ? 'bg-[#0078D4] text-white font-bold shadow-sm shadow-blue-600/20' 
                              : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                          }`}
                        >
                          <div className="flex items-center gap-2.5 truncate">
                            <Icon className={`w-3.5 h-3.5 shrink-0 ${active ? 'text-white' : 'text-slate-500'}`} />
                            <span className="truncate">{item.label}</span>
                          </div>
                          {item.badge && (
                            <span className={`text-[9px] font-mono px-1.5 py-0.2 rounded font-bold shrink-0 ${
                              active 
                                ? 'bg-blue-700 text-white border border-blue-500' 
                                : 'bg-slate-100 text-slate-600 border border-slate-200'
                            }`}>
                              {item.badge}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </div>

      {!isCollapsed && (
        <div className="p-3 bg-white border-t border-slate-200 text-xs text-slate-500 space-y-1">
          <div className="flex items-center justify-between">
            <span className="font-bold text-slate-700">AEGIS Zero-Trust</span>
            <span className="inline-flex items-center gap-1 font-mono text-[10px] text-emerald-600 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> RING-0
            </span>
          </div>
          <div className="text-[11px] text-slate-500 font-mono">AES-256 Secrets Vault Active</div>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
