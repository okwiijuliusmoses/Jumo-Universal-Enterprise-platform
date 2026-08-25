import React, { useState } from 'react';
import { 
  Layers, Search, Filter, Download, RefreshCw, CheckCircle2, 
  Plus, Settings, Cpu, Database, Activity, ShieldCheck, 
  Terminal, Globe, Sparkles, FolderTree, FileSpreadsheet, 
  DollarSign, Wrench, Key, HardDrive, Bell, Mail, Smartphone,
  ExternalLink, ArrowRight, Sliders
} from 'lucide-react';
import { AppRegistryService } from '../../../core/application-runtime/registry';

interface GenericSectionViewProps {
  tabId: string;
  onNavigateTab: (tabId: string) => void;
}

export const GenericSectionView: React.FC<GenericSectionViewProps> = ({
  tabId,
  onNavigateTab
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [actionFeedback, setActionFeedback] = useState<string | null>(null);

  const getSectionMetadata = (id: string) => {
    const map: Record<string, { title: string; subtitle: string; category: string; icon: React.ReactNode; stats: string[] }> = {
      'apps-list': {
        title: 'Enterprise Application Registry & Runtimes',
        subtitle: 'Complete inventory of all provisioned and pending domain modules in the JUMO ecosystem.',
        category: 'Platform Administration',
        icon: <Layers className="w-5 h-5 text-blue-600" />,
        stats: ['15 Modules Indexed', '10 Active Runtimes', '0 Deprecated']
      },
      'app-registry': {
        title: 'M365 & AI Domain Application Registry',
        subtitle: 'Configure dynamic module indexing, category metadata, and sovereign routing endpoints.',
        category: 'Platform Administration',
        icon: <Database className="w-5 h-5 text-indigo-600" />,
        stats: ['M365 Hybrid Hub', 'FinTech Gateway', 'AI Center']
      },
      'marketplace': {
        title: 'Sovereign Module Marketplace',
        subtitle: 'Review, certify, and publish third-party enterprise integrations to the JUMO catalog.',
        category: 'Platform Administration',
        icon: <Globe className="w-5 h-5 text-purple-600" />,
        stats: ['24 Certified Vendors', '0 Unverified', 'AES-256 Validated']
      },
      'domain-registry': {
        title: 'Sovereign Domain Registry & DNS CAA',
        subtitle: 'Manage custom tenant domain bindings, SSL/TLS certificates, and sovereign routing tables.',
        category: 'Platform Administration',
        icon: <Globe className="w-5 h-5 text-emerald-600" />,
        stats: ['5 Sovereign Domains', '100% SSL Validated', 'DNSSEC Enforced']
      },
      'runtime-mgmt': {
        title: 'Application Runtime Management & Scaling',
        subtitle: 'Monitor container resource consumption, auto-scaling policies, and memory limits across EU-West clusters.',
        category: 'Platform Administration',
        icon: <Cpu className="w-5 h-5 text-blue-600" />,
        stats: ['48.2 GB Utilized', '5 Edge Nodes Active', '0 OOM Events']
      },
      'subscriptions': {
        title: 'Tenant Subscription & Tier Governance',
        subtitle: 'Audit tenant billing tiers, seat licenses, SLA agreements, and resource quotas.',
        category: 'Tenant Administration',
        icon: <DollarSign className="w-5 h-5 text-emerald-600" />,
        stats: ['5 Active Subscriptions', '$142,500 MRR Equivalent', '100% SLA Compliance']
      },
      'users': {
        title: 'Licensed Enterprise User Directory',
        subtitle: 'Manage 2,687 licensed user accounts across all tenant organizations with zero-trust MFA enforcement.',
        category: 'Identity & Access',
        icon: <ShieldCheck className="w-5 h-5 text-blue-600" />,
        stats: ['2,687 Total Users', '1,420 Active Today', '100% MFA Enforced']
      },
      'roles': {
        title: 'RBAC Roles & Permission Governance',
        subtitle: 'Configure fine-grained role definitions (Root Owner, Tenant Admin, Auditor, Standard User).',
        category: 'Identity & Access',
        icon: <Key className="w-5 h-5 text-purple-600" />,
        stats: ['12 Defined Roles', '0 Privilege Escalations', 'AES-256 Cryptographic Audit']
      },
      'permissions': {
        title: 'Granular Permission Matrix',
        subtitle: 'Inspect and customize cross-module access control lists (ACLs) and API scope authorizations.',
        category: 'Identity & Access',
        icon: <Lock className="w-5 h-5 text-emerald-600" />,
        stats: ['84 Permission Scopes', 'Zero-Trust Enforced', 'Ring-0 Root Authority']
      },
      'theme-engine': {
        title: 'Enterprise Theme Token Engine',
        subtitle: 'Fine-tune color palettes, typography scales, contrast levels, and UI border radii.',
        category: 'Configuration',
        icon: <Settings className="w-5 h-5 text-blue-600" />,
        stats: ['4 Mode Presets', 'WCAG AA Compliant', 'Dynamic Propagator']
      },
      'nav-builder': {
        title: 'Enterprise Navigation Panel Builder',
        subtitle: 'Customize permanent menu structures, accordion groups, and quick-access items for Tenant Portal.',
        category: 'Configuration',
        icon: <Sliders className="w-5 h-5 text-indigo-600" />,
        stats: ['11 Navigation Groups', '42 Module Links', 'Configurable Order']
      },
      'footer-config': {
        title: 'Footer & Legal Disclaimer Configuration',
        subtitle: 'Manage platform compliance links, SLA notices, support contact numbers, and environment stamps.',
        category: 'Configuration',
        icon: <Settings className="w-5 h-5 text-slate-700" />,
        stats: ['4-Column Enterprise Layout', '100% Compliance', 'Dynamic Versioning']
      },
      'news-center': {
        title: 'Sovereign News & Release Broadcasts',
        subtitle: 'Publish platform updates, feature announcements, and maintenance schedules to Tenant Workspace.',
        category: 'Communication',
        icon: <Bell className="w-5 h-5 text-blue-600" />,
        stats: ['3 Active Broadcasts', '100% Delivery Rate', 'EU-West Synchronized']
      },
      'notice-board': {
        title: 'Global Notice Board & Alerts',
        subtitle: 'Manage high-priority security banners, governance alerts, and urgent system notifications.',
        category: 'Communication',
        icon: <Bell className="w-5 h-5 text-blue-600" />,
        stats: ['1 High Alert Active', 'Zero Unread Alerts', 'SLA Verified']
      },
      'broadcast-center': {
        title: 'Emergency Broadcast Center',
        subtitle: 'Execute immediate cross-tenant popup bulletins and SMS/email emergency notification campaigns.',
        category: 'Communication',
        icon: <Smartphone className="w-5 h-5 text-red-600" />,
        stats: ['0 Active Emergencies', 'SMS Gateway Online', 'SMTP Gateway Online']
      },
      'tpl-email': {
        title: 'Automated Email Branding Templates',
        subtitle: 'Configure HTML templates for onboarding, invoice receipts, password resets, and alert summaries.',
        category: 'Communication',
        icon: <Mail className="w-5 h-5 text-purple-600" />,
        stats: ['8 Email Templates', 'DKIM / SPF Verified', 'Zero Bounce Rate']
      },
      'tpl-sms': {
        title: 'SMS & OTP Notification Templates',
        subtitle: 'Manage concise text messaging layouts for multi-factor authentication (MFA) and urgent security alerts.',
        category: 'Communication',
        icon: <Smartphone className="w-5 h-5 text-emerald-600" />,
        stats: ['4 SMS Templates', 'Twilio Sovereign Gateway', '100% Delivery']
      },
      'ai-agents': {
        title: 'Sovereign AI Agent Registry',
        subtitle: 'Deploy and govern specialized AI agents powered by JUMO AI Enterprise Engine and JUMO Research Intelligence Agent.',
        category: 'Sovereign AI Platform',
        icon: <Sparkles className="w-5 h-5 text-purple-600" />,
        stats: ['4 Agents Active', '0% Hallucination Guardrail', 'Sovereign Sandbox']
      },
      'knowledge-center': {
        title: 'Sovereign AI Knowledge Center & RAG',
        subtitle: 'Manage vector database embeddings, corporate documentation indexing, and zero-trust retrieval guardrails.',
        category: 'Sovereign AI Platform',
        icon: <Database className="w-5 h-5 text-blue-600" />,
        stats: ['14,200 Embeddings Indexed', 'PGVector Online', 'AES-256 Encrypted']
      },
      'prompt-lib': {
        title: 'Enterprise System Prompt Library',
        subtitle: 'Standardize system instructions, security constraints, and domain personas across all AI applications.',
        category: 'Sovereign AI Platform',
        icon: <Terminal className="w-5 h-5 text-slate-700" />,
        stats: ['28 Verified Prompts', 'JUMO UEOS v12.9 Compliant', 'Zero Injection Vulnerability']
      },
      'model-registry': {
        title: 'LLM & Foundation Model Registry',
        subtitle: 'Configure API routing, temperature defaults, token limits, and fallback endpoints for JUMO AI Enterprise Engine.',
        category: 'Sovereign AI Platform',
        icon: <Cpu className="w-5 h-5 text-purple-600" />,
        stats: ['JUMO AI Enterprise Engine Active', 'Token Shield Online', '99.999% SLA']
      },
      'workflow': {
        title: 'Sovereign Workflow & Engine Orchestrator',
        subtitle: 'Automate cross-module event triggers, multi-stage approval chains, and scheduled enterprise jobs.',
        category: 'Platform Services',
        icon: <FolderTree className="w-5 h-5 text-blue-600" />,
        stats: ['18 Active Workflows', '100% Execution Success', 'Zero Latency Spikes']
      },
      'documents': {
        title: 'Document Management & PDF Engine',
        subtitle: 'Configure watermark stamps, OCR indexing pipelines, and encrypted blob storage allocations.',
        category: 'Platform Services',
        icon: <FileSpreadsheet className="w-5 h-5 text-emerald-600" />,
        stats: ['142,000 Documents Stored', 'S3 Sovereign Bucket', 'AES-256-GCM']
      },
      'notifications-svc': {
        title: 'Unified Notification Service Gateway',
        subtitle: 'Monitor push notification queues, webhook deliveries, and real-time WebSocket broadcasting.',
        category: 'Platform Services',
        icon: <Bell className="w-5 h-5 text-blue-600" />,
        stats: ['WebSocket Online', '0 Dropped Packets', '12ms Latency']
      },
      'currency': {
        title: 'Multi-Currency & Forex Rate Engine',
        subtitle: 'Configure European Central Bank (ECB) synchronization intervals, conversion spreads, and currency tables.',
        category: 'Platform Services',
        icon: <DollarSign className="w-5 h-5 text-emerald-600" />,
        stats: ['32 Currencies Supported', 'ECB Sync Active', '0 Spread Variance']
      },
      'localization': {
        title: 'Internationalization & Locale Matrix',
        subtitle: 'Manage multi-language translation dictionaries, date/time formatting, and jurisdictional tax rules.',
        category: 'Platform Services',
        icon: <Globe className="w-5 h-5 text-blue-600" />,
        stats: ['EN-US & DE-EU Active', '100% String Coverage', 'ISO-8601 Compliant']
      },
      'api-mgmt': {
        title: 'API Gateway & Developer Access Control',
        subtitle: 'Manage OAuth 2.0 client credentials, API key rate limits, OpenAPI definitions, and developer webhooks.',
        category: 'Platform Services',
        icon: <Terminal className="w-5 h-5 text-slate-800" />,
        stats: ['4,200 API Requests/min', 'Rate Limit Shield Online', '0 Auth Failures']
      },
      'telemetry-logs': {
        title: 'Comprehensive Telemetry & System Logs',
        subtitle: 'Deep-dive hardware logs, network ingress packets, and error stack traces across sovereign clusters.',
        category: 'Monitoring',
        icon: <Activity className="w-5 h-5 text-emerald-600" />,
        stats: ['100% Log Retention', 'Elastic Search Indexed', 'Immutable Audit']
      },
      'performance': {
        title: 'Cluster Performance & Resource Profiler',
        subtitle: 'Analyze CPU load averages, memory fragmentation, network throughput, and database query latency.',
        category: 'Monitoring',
        icon: <Activity className="w-5 h-5 text-blue-600" />,
        stats: ['Avg Latency: 14.2ms', 'CPU Load: 18%', 'Memory: 24.1 GB / 128 GB']
      },
      'health': {
        title: 'Platform Health & Diagnostic Center',
        subtitle: 'Real-time diagnostic checks across PostgreSQL schemas, Redis caches, and edge nginx proxies.',
        category: 'Monitoring',
        icon: <Activity className="w-5 h-5 text-emerald-600" />,
        stats: ['100% Systems Normal', '0 Degraded Nodes', 'EU-West Hardened']
      },
      'backups': {
        title: 'Automated Snapshots & Disaster Recovery',
        subtitle: 'Manage point-in-time database snapshots, cross-region replication schedules, and recovery drills.',
        category: 'System & Infrastructure',
        icon: <HardDrive className="w-5 h-5 text-blue-600" />,
        stats: ['Last Snapshot: 12:00 UTC', 'Recovery Time Objective: < 1m', 'Encrypted']
      },
      'updates': {
        title: 'Sovereign UEOS System Update Engine',
        subtitle: 'Review pending container firmware patches, zero-downtime rolling deployments, and rollback points.',
        category: 'System & Infrastructure',
        icon: <RefreshCw className="w-5 h-5 text-indigo-600" />,
        stats: ['JUMO UEOS v12.9 Current', '0 Pending Patches', 'Rolling Deploy Active']
      },
      'licensing': {
        title: 'Sovereign License Authority & Audits',
        subtitle: 'Verify enterprise seat licenses, cryptographic certificate expiration dates, and hardware bindings.',
        category: 'System & Infrastructure',
        icon: <Key className="w-5 h-5 text-purple-600" />,
        stats: ['License Valid until 2030', '5,000 Seat Capacity', 'Ring-0 Verified']
      },
      'dev-tools': {
        title: 'Sovereign Developer & Diagnostics Suite',
        subtitle: 'Execute SQL diagnostic queries, inspect GraphQL schemas, test webhooks, and simulate edge failure modes.',
        category: 'System & Infrastructure',
        icon: <Wrench className="w-5 h-5 text-slate-700" />,
        stats: ['Sandbox CLI Active', 'GraphiQL IDE Ready', 'Zero Production Risk']
      }
    };

    return map[id] || {
      title: `Enterprise Module: ${id.toUpperCase()}`,
      subtitle: 'Sovereign administration workspace for managing platform parameters and hardware configurations.',
      category: 'Enterprise Platform Module',
      icon: <Layers className="w-5 h-5 text-blue-600" />,
      stats: ['100% Operational', 'Sovereign Encrypted', 'Ring-0 Compliant']
    };
  };

  const meta = getSectionMetadata(tabId);
  const allApps = AppRegistryService.getAllApps();

  const handleAction = (actionName: string) => {
    setActionFeedback(`Executed administrative operation "${actionName}" on module [${tabId}].`);
    setTimeout(() => setActionFeedback(null), 3000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1.5 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="p-2 bg-blue-50 rounded-lg">{meta.icon}</span>
            <span className="text-[11px] font-extrabold text-blue-600 uppercase font-mono tracking-wider">{meta.category}</span>
          </div>
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">{meta.title}</h1>
          <p className="text-xs text-slate-500 leading-relaxed">{meta.subtitle}</p>
        </div>

        <div className="flex flex-wrap items-center gap-2 shrink-0">
          {actionFeedback && (
            <span className="px-3 py-1.5 bg-emerald-100 text-emerald-800 rounded-lg text-xs font-bold flex items-center gap-1.5 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>{actionFeedback}</span>
            </span>
          )}
          <button
            onClick={() => handleAction('Sync Configuration')}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-colors flex items-center gap-1.5"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Sync Module</span>
          </button>
          <button
            onClick={() => handleAction('Update Policies')}
            className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow transition-colors flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Configure Parameters</span>
          </button>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {meta.stats.map((stat, idx) => (
          <div key={idx} className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-emerald-500 shrink-0"></div>
            <span className="font-bold text-xs text-slate-800 font-mono">{stat}</span>
          </div>
        ))}
      </div>

      {/* Enterprise Table / Configuration Grid for this Module */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="p-4 border-b border-slate-200 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-600 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder={`Search ${meta.title} records...`}
              className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => alert(`Exporting ${meta.title} data grid to CSV...`)}
              className="px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-lg flex items-center gap-1"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 font-bold text-slate-600 uppercase text-[11px]">
                <th className="p-3">Resource / Module Name</th>
                <th className="p-3">Category / Tier</th>
                <th className="p-3">Sovereign Cluster Node</th>
                <th className="p-3">Security & Encryption</th>
                <th className="p-3">Governance Status</th>
                <th className="p-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {allApps.filter(a => a.name.toLowerCase().includes(searchQuery.toLowerCase()) || a.category.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 6).map((app, idx) => (
                <tr key={app.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-3">
                    <div className="font-bold text-slate-900 text-sm">{app.name}</div>
                    <div className="text-[10px] text-slate-600 font-mono mt-0.5">ID: {app.id} &bull; {meta.category}</div>
                  </td>
                  <td className="p-3 font-semibold text-slate-700">
                    <span className="px-2 py-0.5 bg-slate-100 rounded text-[11px]">{app.category}</span>
                  </td>
                  <td className="p-3 font-mono text-slate-600 text-[11px]">
                    EU-West-{idx % 2 === 0 ? '01 (Frankfurt)' : '02 (Dublin)'}
                  </td>
                  <td className="p-3">
                    <span className="inline-flex items-center gap-1 text-emerald-700 font-bold text-[11px] font-mono">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      <span>AES-256 RING-0</span>
                    </span>
                  </td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 font-bold text-[10px] rounded uppercase">
                      ACTIVE &bull; 100% SLA
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    <button
                      onClick={() => handleAction(`Inspect ${app.name}`)}
                      className="text-blue-600 font-bold hover:underline text-xs"
                    >
                      Inspect Module &rarr;
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
