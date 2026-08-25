import React, { useState } from 'react';
import { 
  Settings, ShieldAlert, Plus, ToggleLeft, ToggleRight, CheckCircle2, 
  Key, Lock, Landmark, Server, ShieldCheck, Layers, ClipboardList
} from 'lucide-react';

interface ActiveModule {
  id: string;
  name: string;
  active: boolean;
  category: string;
}

interface TenantNode {
  id: string;
  name: string;
  tier: string;
  region: string;
}

export const ChurchSettings: React.FC = () => {
  const [modules, setModules] = useState<ActiveModule[]>([
    { id: 'mod_membership', name: 'Identity & Household Intelligence', active: true, category: 'Core Operations' },
    { id: 'mod_clergy', name: 'Clergy & Ministers Lifecycles', active: true, category: 'Core Operations' },
    { id: 'mod_departments', name: 'Ministry Department Operating System', active: true, category: 'Core Operations' },
    { id: 'mod_governance', name: 'Synod Governance & Elections Box', active: true, category: 'Governance Administration' },
    { id: 'mod_finance', name: 'FAAP Double-Entry Treasury & M-Pesa', active: true, category: 'Finance & Stewardship' },
    { id: 'mod_assets', name: 'Sovereign Physical Real Estate Ledger', active: true, category: 'Asset Management' },
    { id: 'mod_documents', name: 'AI Cryptographic Sacramental Seals', active: true, category: 'Document Intelligence' },
    { id: 'mod_education', name: 'Theological Education & Seminars', active: true, category: 'Education & Formation' },
    { id: 'mod_missions', name: 'Rural Outposts & Missionary Deployments', active: true, category: 'Missions & Outreach' },
    { id: 'mod_events', name: 'Service Calendars & Volunteer Duty Allocation', active: true, category: 'Events Management' }
  ]);

  const [tenants, setTenants] = useState<TenantNode[]>([
    { id: 'TEN-01', name: 'Anglican Province of Uganda (Namirembe Diocese)', tier: 'Diocese Tier', region: 'East Africa Province' },
    { id: 'TEN-02', name: 'St. Paul Cathedral Parish', tier: 'Parish Tier', region: 'Namirembe Archdeaconry' },
    { id: 'TEN-03', name: 'St. Jude Mission Outpost', tier: 'Outpost Tier', region: 'Gulu Archdeaconry' }
  ]);

  // Form states
  const [nodeName, setNodeName] = useState('');
  const [nodeTier, setNodeTier] = useState('Parish Tier');
  const [nodeRegion, setNodeRegion] = useState('');

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorKeys: true,
    biometricVerify: true,
    cryptographicWatermark: true,
    aegisLogRetentionDays: 365
  });

  const [activeTenantId, setActiveTenantId] = useState('TEN-01');

  const handleToggleModule = (id: string) => {
    setModules((modules ?? []).map(mod => {
      if (mod.id === id) {
        return { ...mod, active: !mod.active };
      }
      return mod;
    }));
  };

  const handleAddNode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nodeName.trim() || !nodeRegion.trim()) return;

    const added: TenantNode = {
      id: `TEN-0${(tenants ?? []).length + 1}`,
      name: nodeName,
      tier: nodeTier,
      region: nodeRegion
    };

    setTenants([...(tenants ?? []), added]);
    setNodeName('');
    setNodeRegion('');
    alert(`New multi-tenant hierarchical node provisioned: "${added.name}"`);
  };

  const activeTenant = (tenants ?? []).find(t => t.id === activeTenantId) || (tenants && tenants[0]) || { id: 'TEN-01', name: 'Default Tenant', tier: 'PRO', region: 'Local' };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Configuration and Nodes */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4 lg:col-span-1 text-xs">
        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5 border-b pb-2">
          <Server className="w-4 h-4 text-purple-600" />
          Multi-Tenant Sovereign Node Instances
        </h3>

        <div className="space-y-2">
          {(tenants ?? []).map(t => {
            const isActive = activeTenantId === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTenantId(t.id)}
                className={`w-full p-3 rounded-lg border text-left transition-all flex justify-between items-start ${
                  isActive
                    ? 'border-purple-500 bg-purple-50/50 ring-1 ring-purple-500 shadow-sm'
                    : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <div>
                  <strong className="text-slate-900 font-bold block">{t.name}</strong>
                  <span className="text-[10px] text-slate-500 block mt-0.5">{t.tier} • Region: {t.region}</span>
                </div>
                <span className="text-[10px] font-mono text-slate-600 font-bold">{t.id}</span>
              </button>
            );
          })}
        </div>

        {/* Create new Node form */}
        <h4 className="text-xs font-bold text-slate-800 border-t pt-4">Provision Hierarchical Node</h4>
        <form onSubmit={handleAddNode} className="space-y-3">
          <div>
            <label className="block text-slate-600 font-semibold mb-1">Ecclesiastical Node Title Name</label>
            <input
              type="text"
              value={nodeName}
              onChange={(e) => setNodeName(e.target.value)}
              placeholder="e.g. Mukono Diocese Synod"
              className="w-full p-2 rounded border border-slate-300"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-600 font-semibold mb-1">Hierarchy Level</label>
              <select
                value={nodeTier}
                onChange={(e) => setNodeTier(e.target.value)}
                className="w-full p-2 rounded border border-slate-300 bg-white"
              >
                <option value="Diocese Tier">Diocese Tier</option>
                <option value="Parish Tier">Parish Tier</option>
                <option value="Outpost Tier">Outpost Tier</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-600 font-semibold mb-1">Province Territory</label>
              <input
                type="text"
                value={nodeRegion}
                onChange={(e) => setNodeRegion(e.target.value)}
                placeholder="e.g. East Uganda"
                className="w-full p-2 rounded border border-slate-300"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded shadow"
          >
            Deploy Tenant Node
          </button>
        </form>
      </div>

      {/* Module and Security Activation */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-6 lg:col-span-2 text-xs">
        {/* Modules Toggles */}
        <div className="space-y-3.5">
          <div className="border-b pb-2">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-purple-600" />
              Ecclesiastical Digital Operating Modules
            </h3>
            <p className="text-xs text-slate-500">Toggle active structural components deployed for: <strong className="text-purple-700 font-bold">{activeTenant.name}</strong></p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {(modules ?? []).map(mod => (
              <div key={mod.id} className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between">
                <div>
                  <strong className="text-slate-800 font-bold block">{mod.name}</strong>
                  <span className="text-[10px] text-slate-600 font-semibold uppercase">{mod.category}</span>
                </div>

                <button
                  onClick={() => handleToggleModule(mod.id)}
                  className="text-slate-600 hover:text-purple-600 transition-all"
                >
                  {mod.active ? (
                    <ToggleRight className="w-8 h-8 text-purple-600" />
                  ) : (
                    <ToggleLeft className="w-8 h-8 text-slate-700" />
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Security policies */}
        <div className="space-y-4 pt-4 border-t border-slate-100">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5 border-b pb-2">
            <Lock className="w-4 h-4 text-purple-600" />
            AEGIS 10-W Security & Cryptographic Accountability Policies
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <strong className="text-slate-800 block">Dual-Key Bishop Mandates</strong>
                  <p className="text-[10px] text-slate-500">Enforce dual clerical signatures for land trades or vicar transfers.</p>
                </div>
                <input
                  type="checkbox"
                  checked={securitySettings.twoFactorKeys}
                  onChange={(e) => setSecuritySettings({ ...securitySettings, twoFactorKeys: e.target.checked })}
                  className="rounded border-slate-300 text-purple-600 h-4.5 w-4.5"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <strong className="text-slate-800 block">AI Biometric & Signature Verification</strong>
                  <p className="text-[10px] text-slate-500">Verifies sacramental document scans against historical ink records.</p>
                </div>
                <input
                  type="checkbox"
                  checked={securitySettings.biometricVerify}
                  onChange={(e) => setSecuritySettings({ ...securitySettings, biometricVerify: e.target.checked })}
                  className="rounded border-slate-300 text-purple-600 h-4.5 w-4.5"
                />
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <strong className="text-slate-800 block">JUMO Watermark Stamp Seals</strong>
                  <p className="text-[10px] text-slate-500">Emboss cryptographic hashes on certificates & synod papers.</p>
                </div>
                <input
                  type="checkbox"
                  checked={securitySettings.cryptographicWatermark}
                  onChange={(e) => setSecuritySettings({ ...securitySettings, cryptographicWatermark: e.target.checked })}
                  className="rounded border-slate-300 text-purple-600 h-4.5 w-4.5"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <strong className="text-slate-800 block">AEGIS Audit Log Retention</strong>
                  <p className="text-[10px] text-slate-500">Number of days security logs are preserved in zero-trust isolation.</p>
                </div>
                <select
                  value={securitySettings.aegisLogRetentionDays}
                  onChange={(e) => setSecuritySettings({ ...securitySettings, aegisLogRetentionDays: parseInt(e.target.value) })}
                  className="p-1 border bg-white rounded font-mono font-bold"
                >
                  <option value={90}>90 Days</option>
                  <option value={180}>180 Days</option>
                  <option value={365}>365 Days</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
