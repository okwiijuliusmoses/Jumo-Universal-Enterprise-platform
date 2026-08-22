import React, { useState } from 'react';
import { 
  Shield, Key, Server, Activity, ArrowRight, ShieldCheck, 
  CheckCircle2, Building2, Eye, Database, FileText, Lock, Sparkles, Sliders, Users, Layers
} from 'lucide-react';
import { ownerVerificationService } from '../../core/security/ownerVerificationService';
import { OwnerProductLaunchpad } from './OwnerProductLaunchpad';

interface OwnerControlCenterLaunchpadProps {
  onNavigate: (route: string) => void;
  currentUser?: {
    name?: string;
    email?: string;
    role?: string;
  };
  onLogout?: () => void;
}

export const OwnerControlCenterLaunchpad: React.FC<OwnerControlCenterLaunchpadProps> = ({
  onNavigate,
  currentUser,
  onLogout
}) => {
  const [activeTab, setActiveTab] = useState<'products' | 'workspaces' | 'pillars'>('products');
  const [searchQuery, setSearchQuery] = useState('');

  const handleLaunch = (route: string) => {
    onNavigate(route);
  };

  const controlCenterCapabilities = [
    {
      id: 'store',
      name: 'JUMO Platform Store',
      desc: 'Marketplace for domain modules and enterprise capabilities.',
      icon: Building2,
      route: '/store',
      color: 'text-indigo-700 bg-indigo-50 border-indigo-200',
      badge: 'MARKETPLACE'
    },
    {
      id: 'aegis',
      name: 'AEGIS Zero-Trust Security',
      desc: 'Centralized identity, MFA, and perimeter defense controls.',
      icon: Shield,
      route: '/control-center/security',
      color: 'text-rose-700 bg-rose-50 border-rose-200',
      badge: 'SECURITY'
    },
    {
      id: 'ai-command',
      name: 'AI Command Center',
      desc: 'Multi-model routing, knowledge base, and agent registry.',
      icon: Sparkles,
      route: '/control-center/ai',
      color: 'text-amber-700 bg-amber-50 border-amber-200',
      badge: 'INTELLIGENCE'
    },
    {
      id: 'cloud',
      name: 'Cloud Infrastructure Console',
      desc: 'Deployment orchestration and edge cluster management.',
      icon: Server,
      route: '/control-center/cloud',
      color: 'text-blue-700 bg-blue-50 border-blue-200',
      badge: 'INFRASTRUCTURE'
    },
    {
      id: 'telemetry',
      name: 'Operations & Telemetry',
      desc: 'Real-time observability, health checks, and system logs.',
      icon: Activity,
      route: '/control-center/monitoring',
      color: 'text-emerald-700 bg-emerald-50 border-emerald-200',
      badge: 'OBSERVABILITY'
    },
    {
      id: 'traceability',
      name: 'Traceability Matrix',
      desc: 'Benchmark mapping of JUMO modules to industry-standard systems.',
      icon: FileText,
      route: '/control-center/traceability',
      color: 'text-purple-700 bg-purple-50 border-purple-200',
      badge: 'BENCHMARK'
    },
    {
      id: 'settings',
      name: 'System Settings Vault',
      desc: 'Global configurations, secrets, and environment parameters.',
      icon: Sliders,
      route: '/control-center/settings',
      color: 'text-slate-700 bg-slate-50 border-slate-200',
      badge: 'CONFIGURATION'
    }
  ];

  const pillars = [
    {
      id: 'aegis-pillar',
      title: 'AEGIS Security Fabric',
      subtitle: 'Zero-Trust Perimeter',
      description: 'Unified RBAC, MFA, and token rotation governing all API boundaries and user sessions.',
      icon: ShieldCheck,
      badge: 'ACTIVE',
      badgeColor: 'text-emerald-700 bg-emerald-50 border-emerald-200',
      onClick: () => handleLaunch('/control-center/security'),
      actionLabel: 'Open Security Fabric'
    },
    {
      id: 'ai-pillar',
      title: 'Cognitive AI Gateway',
      subtitle: 'Multi-Model Router',
      description: 'Dynamic load balancing across Gemini and proprietary models for autonomous workflows.',
      icon: Sparkles,
      badge: 'ROUTING',
      badgeColor: 'text-blue-700 bg-blue-50 border-blue-200',
      onClick: () => handleLaunch('/control-center/ai'),
      actionLabel: 'Manage AI Gateway'
    },
    {
      id: 'trust-pillar',
      title: 'JUMO TRUST System',
      subtitle: 'Immutable Ledger',
      description: 'Cryptographically sealed audit trails verifying data integrity across all tenants.',
      icon: Lock,
      badge: 'SEALED',
      badgeColor: 'text-amber-700 bg-amber-50 border-amber-200',
      onClick: () => handleLaunch('/control-center/monitoring'),
      actionLabel: 'Inspect Ledgers'
    }
  ];

  const filteredCapabilities = controlCenterCapabilities.filter(cap => 
    cap.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    cap.desc.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8 space-y-6 md:space-y-8 font-sans pb-24">
      {/* Header and User Navigation */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-black tracking-tight text-slate-900">
            JUMO DIGITAL HYBRID PLATFORM
          </h2>
          <p className="text-xs text-slate-500 font-mono mt-1">
            v2.4.0 (Enterprise Sovereign Build)
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab('workspaces')}
            className={`px-4 py-2.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-xs ${
              activeTab === 'workspaces'
                ? 'bg-[#0078D4] text-white'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Control Center Workspaces</span>
          </button>
          {onLogout && (
            <button
              onClick={onLogout}
              className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 transition-colors cursor-pointer"
            >
              Sign Out
            </button>
          )}
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('products')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'products'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Approved Platforms (3)</span>
          </button>
          
          <button
            onClick={() => setActiveTab('workspaces')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'workspaces'
                ? 'bg-[#0078D4] text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>Control Center Capabilities & Workspaces</span>
          </button>

          <button
            onClick={() => setActiveTab('pillars')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'pillars'
                ? 'bg-slate-800 text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Sliders className="w-4 h-4" />
            <span>Master Governance Pillars (3)</span>
          </button>
        </div>
      </div>

      {/* View 0: 3 Approved Sovereign Platforms */}
      {activeTab === 'products' && (
        <OwnerProductLaunchpad onNavigate={handleLaunch} currentUser={currentUser} />
      )}

      {/* View 1: Control Center Capabilities & Workspaces */}
      {activeTab === 'workspaces' && (
        <div className="space-y-6">
          <div className="bg-blue-50/60 border border-blue-200 rounded-xl p-4 flex items-center justify-between">
            <div className="text-xs text-blue-900 font-medium">
              <span className="font-bold">Privileged Control Plane:</span> All management capabilities (Store, AEGIS Security, AI Command, JUMO TRUST, Cloud Console) are centrally governed inside JUMO Control Center.
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCapabilities.map((cap) => {
              const Icon = cap.icon;
              return (
                <div
                  key={cap.id}
                  onClick={() => handleLaunch(cap.route)}
                  className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs hover:shadow-md hover:border-[#0078D4] transition-all flex flex-col justify-between group cursor-pointer"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-xl bg-slate-50 text-slate-800 flex items-center justify-center border border-slate-200 group-hover:bg-blue-50 group-hover:text-[#0078D4] transition-colors">
                        <Icon className="w-6 h-6" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-900 group-hover:text-[#0078D4] transition-colors">
                        {cap.name}
                      </h3>
                      <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                        {cap.desc}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* View 2: Master Governance Pillars */}
      {activeTab === 'pillars' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.id}
                onClick={pillar.onClick}
                className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs hover:shadow-md hover:border-[#0078D4] transition-all flex flex-col justify-between group cursor-pointer"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#0078D4] flex items-center justify-center border border-blue-100 group-hover:scale-105 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mt-1 group-hover:text-[#0078D4] transition-colors">
                      {pillar.title}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
