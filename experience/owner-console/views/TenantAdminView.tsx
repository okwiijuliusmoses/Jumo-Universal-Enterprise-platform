import React, { useState } from 'react';
import { 
  Building2, Users, CreditCard, UserCheck, Search, Filter, 
  Plus, CheckCircle2, Shield, Lock, Globe, ExternalLink, 
  MoreVertical, Edit3, Trash2, ArrowUpDown
} from 'lucide-react';

interface TenantOrg {
  id: string;
  name: string;
  domain: string;
  tier: 'SOVEREIGN_ENTERPRISE' | 'HYBRID_PRO' | 'SANDBOX';
  status: 'ACTIVE' | 'PROVISIONING' | 'SUSPENDED';
  userCount: number;
  region: string;
}

export const TenantAdminView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'orgs' | 'users' | 'roles'>('orgs');
  const [searchQuery, setSearchQuery] = useState('');
  const [actionFeedback, setActionFeedback] = useState<string | null>(null);

  const [orgs, setOrgs] = useState<TenantOrg[]>([
    { id: 'org_root_eu', name: 'JUMO Digital Enterprise Authority', domain: 'jumo.eu', tier: 'SOVEREIGN_ENTERPRISE', status: 'ACTIVE', userCount: 1420, region: 'EU-West (Frankfurt)' },
    { id: 'org_m365_gov', name: 'Federal Public Sector Gateway', domain: 'gov.jumo.eu', tier: 'SOVEREIGN_ENTERPRISE', status: 'ACTIVE', userCount: 850, region: 'EU-West (Dublin)' },
    { id: 'org_fintech_hub', name: 'EuroClear Sovereign Banking', domain: 'fintech.jumo.eu', tier: 'SOVEREIGN_ENTERPRISE', status: 'ACTIVE', userCount: 310, region: 'EU-West (Frankfurt)' },
    { id: 'org_ai_labs', name: 'JUMO Research Intelligence Agent Labs', domain: 'ai.jumo.eu', tier: 'HYBRID_PRO', status: 'ACTIVE', userCount: 95, region: 'US-East (Virginia)' },
    { id: 'org_sandbox_01', name: 'External Vendor Integration Sandbox', domain: 'sandbox.jumo.eu', tier: 'SANDBOX', status: 'PROVISIONING', userCount: 12, region: 'EU-West (Frankfurt)' },
  ]);

  const handleAddOrg = () => {
    const name = prompt('Enter New Tenant Organization Name:', 'Global Sovereign Affiliate');
    if (!name) return;
    const domain = prompt('Enter Primary Sovereign Domain:', 'affiliate.jumo.eu');
    if (!domain) return;

    const added: TenantOrg = {
      id: `org_${Date.now().toString().slice(-4)}`,
      name,
      domain,
      tier: 'SOVEREIGN_ENTERPRISE',
      status: 'PROVISIONING',
      userCount: 1,
      region: 'EU-West (Frankfurt)'
    };

    setOrgs([added, ...orgs]);
    setActionFeedback(`Tenant organization "${name}" queued for RING-0 hardware namespace provisioning.`);
    setTimeout(() => setActionFeedback(null), 4000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">Organizations, Tenants & RBAC Governance</h1>
          <p className="text-xs text-slate-500">Manage tenant organizations, cryptographic database schema boundaries, licensed seat allocations, and RBAC roles.</p>
        </div>
        <div className="flex items-center gap-3">
          {actionFeedback && (
            <span className="px-3 py-1.5 bg-emerald-100 text-emerald-800 rounded-lg text-xs font-bold flex items-center gap-1.5 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>{actionFeedback}</span>
            </span>
          )}
          <button
            onClick={handleAddOrg}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow transition-colors flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Provision Tenant Organization</span>
          </button>
        </div>
      </div>

      {/* Sub-Tabs */}
      <div className="flex border-b border-slate-200 gap-6">
        <button
          onClick={() => setActiveTab('orgs')}
          className={`pb-3 text-xs font-bold border-b-2 flex items-center gap-2 transition-colors ${
            activeTab === 'orgs' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Building2 className="w-4 h-4" />
          <span>Tenant Organizations ({orgs.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('users')}
          className={`pb-3 text-xs font-bold border-b-2 flex items-center gap-2 transition-colors ${
            activeTab === 'users' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Licensed User Directory (2,687)</span>
        </button>
        <button
          onClick={() => setActiveTab('roles')}
          className={`pb-3 text-xs font-bold border-b-2 flex items-center gap-2 transition-colors ${
            activeTab === 'roles' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <UserCheck className="w-4 h-4" />
          <span>RBAC Roles & Permission Matrix</span>
        </button>
      </div>

      {/* TAB 1: ORGANIZATIONS GRID */}
      {activeTab === 'orgs' && (
        <div className="space-y-4 animate-in fade-in duration-200">
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs flex items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-600 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search organization name, domain, or ID..."
                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white"
              />
            </div>
            <div className="text-xs font-bold text-slate-500 font-mono">
              Total Active Seats: <span className="text-slate-900">2,687 / 5,000 Licensed</span>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 font-bold text-slate-600 uppercase text-[11px]">
                    <th className="p-3">Organization Name & ID</th>
                    <th className="p-3">Primary Domain</th>
                    <th className="p-3">Subscription Tier</th>
                    <th className="p-3">Licensed Seats</th>
                    <th className="p-3">Sovereign Cluster Region</th>
                    <th className="p-3">Status</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {orgs.filter(o => o.name.toLowerCase().includes(searchQuery.toLowerCase()) || o.domain.toLowerCase().includes(searchQuery.toLowerCase())).map(org => (
                    <tr key={org.id} className="hover:bg-slate-50 transition-colors">
                      <td className="p-3">
                        <div className="font-bold text-slate-900 text-sm">{org.name}</div>
                        <div className="text-[10px] text-slate-600 font-mono mt-0.5">ID: {org.id}</div>
                      </td>
                      <td className="p-3 font-mono text-slate-600">
                        <a href={`https://${org.domain}`} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline flex items-center gap-1">
                          <span>{org.domain}</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 bg-purple-50 border border-purple-200 text-purple-800 font-bold rounded text-[10px]">
                          {org.tier.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="p-3 font-bold text-slate-800 font-mono">
                        {org.userCount.toLocaleString()} Users
                      </td>
                      <td className="p-3 text-slate-600 text-[11px]">
                        {org.region}
                      </td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          org.status === 'ACTIVE' ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-800 animate-pulse'
                        }`}>
                          {org.status}
                        </span>
                      </td>
                      <td className="p-3 text-right">
                        <button onClick={() => alert(`Opening administrative console for ${org.name}...`)} className="text-blue-600 font-bold hover:underline text-xs">
                          Manage Tenant &rarr;
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2 & 3: USERS / ROLES */}
      {(activeTab === 'users' || activeTab === 'roles') && (
        <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-2xs text-center space-y-3">
          <Shield className="w-10 h-10 text-blue-600 mx-auto" />
          <h3 className="font-bold text-base text-slate-900">Zero-Trust Identity & Access Governance</h3>
          <p className="text-xs text-slate-500 max-w-lg mx-auto leading-relaxed">
            All 2,687 licensed seats across 5 sovereign organizations are governed by AES-256-GCM encrypted RBAC policies. Root Authority badges are strictly immutable and auditable in real-time.
          </p>
          <div className="pt-2">
            <button onClick={() => alert('Exporting complete RBAC permission matrix...')} className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-sm transition-colors cursor-pointer">
              Export Complete RBAC Matrix (JSON / CSV)
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
