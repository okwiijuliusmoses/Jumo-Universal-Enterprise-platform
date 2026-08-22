/**
 * JUMO UEOS Phase 2 — Authoritative JUMO UEOS Control Center & Sovereign Operations Hub
 * 4 Navigation Pillars: Enterprise Management, Configuration, Administration, Monitoring
 * 29 Interactive Subsections styled with clean Microsoft 365 / Google Cloud enterprise aesthetic
 */

import React, { useState } from 'react';
import { 
  Shield, Layers, Sliders, Users, Activity, Building2, Cpu, Globe, Key, 
  Lock, Bell, HardDrive, RefreshCw, Terminal, CheckCircle2, AlertTriangle, 
  Search, Filter, ExternalLink, Play, Database, Zap, DollarSign, Clock, Check, FileText
} from 'lucide-react';
import { EnterpriseLogo } from '../../src/components/EnterpriseLogo';

export const OperationsCenterView: React.FC<{ onNavigate?: (route: string) => void }> = ({ onNavigate }) => {
  const [activePillar, setActivePillar] = useState<'management' | 'configuration' | 'administration' | 'monitoring'>('management');
  const [activeSection, setActiveSection] = useState<string>('platform-reg');
  const [searchQuery, setSearchQuery] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const pillars = [
    { id: 'management', label: 'Enterprise Management', icon: Layers, description: 'Sovereign platform, domain, and workspace registries.' },
    { id: 'configuration', label: 'System Configuration', icon: Sliders, description: 'Global runtime, security, and integration parameters.' },
    { id: 'administration', label: 'Tenant Administration', icon: Users, description: 'User roles, permissions, RBAC policies, and licensing.' },
    { id: 'monitoring', label: 'Telemetry & Monitoring', icon: Activity, description: 'Real-time kernel health, logs, events, and AI node status.' },
  ];

  const sectionsByPillar = {
    management: [
      { id: 'platform-reg', label: 'Platform Registry', icon: Cpu, status: 'ONLINE', itemsCount: '1 Platform Core' },
      { id: 'domain-reg', label: 'Domain Registry', icon: Layers, status: 'ONLINE', itemsCount: '12 Sectors' },
      { id: 'erp-reg', label: 'ERP Registry', icon: Building2, status: 'ONLINE', itemsCount: '48 Modules' },
      { id: 'module-reg', label: 'Module Registry', icon: Layers, status: 'ONLINE', itemsCount: '142 Plugins' },
      { id: 'workspace-reg', label: 'Workspace Registry', icon: Globe, status: 'ONLINE', itemsCount: '84 Tenants' },
      { id: 'marketplace-reg', label: 'Marketplace Registry', icon: Layers, status: 'ONLINE', itemsCount: '36 Extensions' },
    ],
    configuration: [
      { id: 'global-cfg', label: 'Global Config', icon: Sliders, status: 'ACTIVE', itemsCount: 'Root Partition' },
      { id: 'runtime-cfg', label: 'Runtime Config', icon: Cpu, status: 'ACTIVE', itemsCount: 'Node 18.x / tsx' },
      { id: 'env-cfg', label: 'Environment Config', icon: Globe, status: 'ACTIVE', itemsCount: 'Production Ring-0' },
      { id: 'identity-cfg', label: 'Identity Config', icon: Key, status: 'ACTIVE', itemsCount: 'Zero-Trust JWT' },
      { id: 'security-cfg', label: 'Security Config', icon: Shield, status: 'ACTIVE', itemsCount: 'AES-256 Enabled' },
      { id: 'workflow-cfg', label: 'Workflow Config', icon: Zap, status: 'ACTIVE', itemsCount: 'Event Mesh v9' },
      { id: 'branding-cfg', label: 'Branding Config', icon: Globe, status: 'ACTIVE', itemsCount: 'JUMO Enterprise Logo' },
      { id: 'notification-cfg', label: 'Notification Config', icon: Bell, status: 'ACTIVE', itemsCount: 'SMS / Email / Push' },
      { id: 'integration-cfg', label: 'Integration Config', icon: Cpu, status: 'ACTIVE', itemsCount: '14 Gateway APIs' },
      { id: 'deployment-cfg', label: 'Deployment Config', icon: HardDrive, status: 'ACTIVE', itemsCount: 'Cloud Run Ingress' },
      { id: 'cloud-cfg', label: 'Cloud Config', icon: Globe, status: 'ACTIVE', itemsCount: 'Multi-Region Mesh' },
    ],
    administration: [
      { id: 'user-admin', label: 'User Administration', icon: Users, status: 'SECURED', itemsCount: '1,420 Active Users' },
      { id: 'roles-admin', label: 'Roles & RBAC', icon: Shield, status: 'SECURED', itemsCount: '14 Sovereign Roles' },
      { id: 'perm-admin', label: 'Permissions Matrix', icon: Lock, status: 'SECURED', itemsCount: '380 ABAC Rules' },
      { id: 'idp-admin', label: 'Identity Providers', icon: Key, status: 'SECURED', itemsCount: 'SAML / OIDC / LDAP' },
      { id: 'access-admin', label: 'Access Policies', icon: Shield, status: 'SECURED', itemsCount: 'Zero-Trust Gate' },
      { id: 'tenant-admin', label: 'Multi-Tenancy', icon: Building2, status: 'SECURED', itemsCount: '84 Org Partitions' },
      { id: 'license-admin', label: 'Licensing & Billing', icon: DollarSign, status: 'SECURED', itemsCount: 'Enterprise Tier-1' },
      { id: 'flags-admin', label: 'Feature Flags', icon: Sliders, status: 'SECURED', itemsCount: '24 Toggles Active' },
    ],
    monitoring: [
      { id: 'health-mon', label: 'Platform Health', icon: Activity, status: 'HEALTHY', itemsCount: '99.999% SLA' },
      { id: 'services-mon', label: 'Services Telemetry', icon: Cpu, status: 'HEALTHY', itemsCount: '14 APIs Online' },
      { id: 'runtime-mon', label: 'Runtime Status', icon: Terminal, status: 'HEALTHY', itemsCount: '142 Node Replicas' },
      { id: 'logs-mon', label: 'System Logs', icon: FileText, status: 'STREAMING', itemsCount: '14.2 GB/day' },
      { id: 'events-mon', label: 'Security Events', icon: Shield, status: 'AUDITING', itemsCount: '0 Threats Detected' },
      { id: 'ai-mon', label: 'AI Health Status', icon: Zap, status: 'HEALTHY', itemsCount: '30 Swarm Agents' },
      { id: 'infra-mon', label: 'Infrastructure Status', icon: HardDrive, status: 'HEALTHY', itemsCount: '48 Cloud SQL Pools' },
    ]
  };

  const currentSections = sectionsByPillar[activePillar];

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1200);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased pb-16">
      {/* Header Banner */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 sticky top-0 z-20 shadow-xs">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <EnterpriseLogo size="md" variant="blue" showText={false} />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-slate-900 tracking-tight">JUMO UEOS Control Center</h1>
                <span className="px-2 py-0.5 bg-blue-50 text-blue-700 font-mono text-[11px] font-semibold rounded border border-blue-200">
                  Ring-0 Master Console
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Authoritative governance over registries, configuration, tenant administration, and real-time CCTV telemetry.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-600 absolute left-3 top-2.5" />
              <input 
                type="text"
                placeholder="Search 29 system partitions..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 py-1.5 bg-slate-100 border border-slate-200 rounded-lg text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
              />
            </div>
            <button 
              onClick={handleRefresh}
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold transition flex items-center gap-1.5"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-blue-600' : ''}`} />
              Refresh
            </button>
            <button 
              onClick={() => onNavigate && onNavigate('/workspace')}
              className="px-3 py-1.5 bg-white hover:bg-white text-white rounded-lg text-xs font-semibold transition shadow-xs"
            >
              Workspace
            </button>
          </div>
        </div>

        {/* 4 Pillar Navigation Tabs */}
        <div className="max-w-7xl mx-auto mt-4 pt-2 border-t border-slate-100 grid grid-cols-2 md:grid-cols-4 gap-2">
          {pillars.map((p) => {
            const Icon = p.icon;
            const isActive = activePillar === p.id;
            return (
              <button
                key={p.id}
                onClick={() => { setActivePillar(p.id as any); setActiveSection(sectionsByPillar[p.id as keyof typeof sectionsByPillar][0].id); }}
                className={`p-3 rounded-xl border text-left transition flex items-center gap-3 ${
                  isActive 
                    ? 'bg-blue-600 border-blue-600 text-white shadow-sm font-bold' 
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className={`p-2 rounded-lg ${isActive ? 'bg-blue-700 text-white' : 'bg-blue-50 text-blue-600'}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs truncate">{p.label}</div>
                  <div className={`text-[10px] truncate ${isActive ? 'text-blue-100' : 'text-slate-600 font-normal'}`}>
                    {sectionsByPillar[p.id as keyof typeof sectionsByPillar].length} Partitions
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Subsection Sidebar */}
          <div className="lg:col-span-4 bg-white border border-slate-200 rounded-xl p-4 shadow-xs space-y-2">
            <div className="text-xs font-mono font-bold text-slate-600 uppercase tracking-wider mb-2 px-2 flex items-center justify-between">
              <span>{pillars.find(p => p.id === activePillar)?.label}</span>
              <span className="text-blue-600">{currentSections.length} Active</span>
            </div>
            <div className="space-y-1">
              {currentSections.filter(s => s.label.toLowerCase().includes(searchQuery.toLowerCase())).map((sec) => {
                const Icon = sec.icon;
                const isSelected = activeSection === sec.id;
                return (
                  <button
                    key={sec.id}
                    onClick={() => setActiveSection(sec.id)}
                    className={`w-full text-left p-3 rounded-lg border text-xs transition flex items-center justify-between ${
                      isSelected 
                        ? 'bg-blue-50 border-blue-300 text-blue-900 font-bold shadow-2xs' 
                        : 'bg-white border-transparent text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className={`w-4 h-4 ${isSelected ? 'text-blue-600' : 'text-slate-600'}`} />
                      <span>{sec.label}</span>
                    </div>
                    <span className="font-mono text-[10px] px-2 py-0.5 bg-slate-100 text-slate-600 rounded">
                      {sec.itemsCount}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Main Workspace Area for Selected Partition */}
          <div className="lg:col-span-8 bg-white border border-slate-200 rounded-xl p-8 shadow-xs space-y-6">
            <div className="border-b border-slate-200 pb-4 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 bg-blue-100 text-blue-800 font-mono text-[10px] font-bold rounded">
                    {activePillar.toUpperCase()}
                  </span>
                  <h2 className="text-lg font-bold text-slate-900">
                    {currentSections.find(s => s.id === activeSection)?.label}
                  </h2>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Authoritative Ring-0 partition control and live operational state synchronization.
                </p>
              </div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 font-mono text-xs font-bold rounded-full border border-emerald-200">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                {currentSections.find(s => s.id === activeSection)?.status}
              </span>
            </div>

            {/* Pillar 1: Enterprise Management Overview */}
            {activePillar === 'management' && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                    <div className="text-xs font-bold text-slate-500 uppercase">Registered Partition Units</div>
                    <div className="text-2xl font-black text-slate-900 mt-1">{currentSections.find(s => s.id === activeSection)?.itemsCount}</div>
                  </div>
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                    <div className="text-xs font-bold text-slate-500 uppercase">Ledger Integrity Lock</div>
                    <div className="text-sm font-bold text-emerald-600 mt-2 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4" /> Double-Entry Parity Enforced
                    </div>
                  </div>
                </div>

                <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-xs space-y-3">
                  <h4 className="font-bold text-sm text-slate-900">Partition Synchronization Hook</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    This registry partition is dynamically discoverable by the micro-kernel. When new enterprise domains or plugins are installed via the Marketplace or Sovereign Factory, their manifest schemas are automatically compiled into this registry.
                  </p>
                  <div className="pt-2 flex justify-end">
                    <button onClick={() => onNavigate && onNavigate('/domains')} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold transition flex items-center gap-1.5">
                      Inspect Domain Runtimes <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Pillar 2: System Configuration Overview */}
            {activePillar === 'configuration' && (
              <div className="space-y-6">
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Sliders className="w-6 h-6 text-blue-600" />
                    <div>
                      <div className="font-bold text-sm text-blue-950">Dynamic Runtime Hot-Reloading Active</div>
                      <div className="text-xs text-blue-800">Changes to feature flags and environment parameters take effect instantly without restarting container nodes.</div>
                    </div>
                  </div>
                  <button onClick={() => onNavigate && onNavigate('/settings')} className="px-4 py-2 bg-white hover:bg-blue-100 text-blue-700 border border-blue-300 rounded-lg text-xs font-bold transition">
                    Open Settings Center
                  </button>
                </div>

                <div className="space-y-3">
                  <div className="p-4 border border-slate-200 rounded-xl flex items-center justify-between">
                    <div>
                      <div className="font-bold text-xs text-slate-900">Zero-Trust Security Headers</div>
                      <div className="text-[11px] text-slate-500">Strict-Transport-Security (HSTS) & Content Security Policy (CSP) enforced.</div>
                    </div>
                    <span className="text-xs font-bold text-emerald-600">ENFORCED</span>
                  </div>
                  <div className="p-4 border border-slate-200 rounded-xl flex items-center justify-between">
                    <div>
                      <div className="font-bold text-xs text-slate-900">FAAP 1.5% Clearing Fee Treasury Hook</div>
                      <div className="text-[11px] text-slate-500">Global settlement clearing fee automatically routed to JUMO Master Treasury.</div>
                    </div>
                    <span className="text-xs font-bold text-emerald-600">ENFORCED</span>
                  </div>
                </div>
              </div>
            )}

            {/* Pillar 3: Tenant Administration Overview */}
            {activePillar === 'administration' && (
              <div className="space-y-6">
                <div className="grid grid-cols-3 gap-4">
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-center">
                    <div className="text-[11px] text-slate-500 font-bold uppercase">Total Users</div>
                    <div className="text-xl font-black text-slate-900 mt-1">1,420</div>
                  </div>
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-center">
                    <div className="text-[11px] text-slate-500 font-bold uppercase">RBAC Roles</div>
                    <div className="text-xl font-black text-slate-900 mt-1">14</div>
                  </div>
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-center">
                    <div className="text-[11px] text-slate-500 font-bold uppercase">ABAC Rules</div>
                    <div className="text-xl font-black text-slate-900 mt-1">380</div>
                  </div>
                </div>

                <div className="p-5 bg-white text-slate-900 rounded-xl font-mono text-xs space-y-2 border border-slate-200">
                  <div className="text-[#0078D4] font-bold flex items-center gap-2">
                    <Shield className="w-4 h-4" /> Row-Level Tenant Segregation (RLS)
                  </div>
                  <p className="text-slate-700 text-[11px] leading-relaxed">
                    All administrative operations are governed by PostgreSQL Row-Level Security (RLS) policies. Tenants cannot query or modify ledger rows belonging to another organization.
                  </p>
                </div>
              </div>
            )}

            {/* Pillar 4: Telemetry & Monitoring Overview */}
            {activePillar === 'monitoring' && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
                    <div className="text-xs font-bold text-emerald-800">Kernel Replication Nodes</div>
                    <div className="text-xl font-black text-emerald-950 mt-1">142 / 142 Healthy</div>
                  </div>
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
                    <div className="text-xs font-bold text-blue-800">AI Cognitive Swarm</div>
                    <div className="text-xl font-black text-blue-950 mt-1">30 Agents Online</div>
                  </div>
                </div>

                <div className="bg-white text-emerald-400 rounded-xl p-4 font-mono text-xs min-h-[180px] border border-slate-200">
                  <div className="text-slate-600 mb-2">// Live Micro-Kernel Operational CCTV Log</div>
                  <div>[09:12:04.102] INFO: Parity verified for UG_SACCO_01 ($0.00 offset)</div>
                  <div>[09:12:05.819] INFO: Gemini 2.5 Pro reasoning inference routed for Diocesan Tithe RAG</div>
                  <div>[09:12:07.301] INFO: Zero-Trust RBAC token issued for admin@makerere.edu</div>
                  <div>[09:12:08.910] SUCCESS: 14 JUMO APIs reporting 99.999% SLA uptime</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default OperationsCenterView;
