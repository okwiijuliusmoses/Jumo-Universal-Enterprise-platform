import React, { useState } from 'react';
import { 
  Sliders, Shield, Layers, Building2, DollarSign, Cpu, Globe, Lock, 
  CheckCircle2, AlertTriangle, RefreshCw, Power, Trash2, Edit3, Eye, 
  Activity, ArrowRight, Save, Plus
} from 'lucide-react';
import { DynamicConfigurationRegistry } from '../../core/governance/UniversalGovernanceEngine';

export interface OwnerConfigurationCenterProps {
  onNavigate?: (route: string) => void;
}

export const OwnerConfigurationCenter: React.FC<OwnerConfigurationCenterProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'platforms' | 'domains' | 'modules' | 'features' | 'branding' | 'security' | 'audit'>('platforms');
  
  // Platform Registry State
  const [platforms, setPlatforms] = useState([
    { id: 'erp', name: 'Universal ERP Ecosystem', category: 'Enterprise Applications', status: 'ACTIVE', tier: 'Sovereign Pro', auditLog: 'Modified 10m ago by Ring-0 Admin' },
    { id: 'faap', name: 'FAAP Financial Ledger Backbone', category: 'Ledger Authority', status: 'ACTIVE', tier: 'Core Foundation', auditLog: 'Rebalanced 1h ago' },
    { id: 'digital-pay', name: 'Digital Pay & Treasury Router', category: 'Payment Clearing', status: 'ACTIVE', tier: 'FinTech Switch', auditLog: 'Settlement 1.5% active' },
    { id: 'fintech', name: 'Universal FinTech Switch', category: 'Banking Gateway', status: 'ACTIVE', tier: 'Sovereign Switch', auditLog: 'Verified active' },
    { id: 'aegis', name: 'AEGIS Zero-Trust Security', category: 'Security Shield', status: 'ACTIVE', tier: 'Zero-Trust Shield', auditLog: 'Firewall active' },
    { id: 'trust', name: 'JUMO TRUST Integrity Platform', category: 'Certificates & Audit', status: 'ACTIVE', tier: 'Cryptographic Integrity', auditLog: 'Ledger synced' },
    { id: 'ai', name: 'JUMO AI Command Center', category: 'Cognitive Gateway', status: 'ACTIVE', tier: 'Multi-Model AI', auditLog: 'Gemini 3.6 Flash routed' },
    { id: 'cloud', name: 'JUMO Hybrid Cloud Platform', category: 'Multi-Cloud Controller', status: 'ACTIVE', tier: 'Hybrid Distributed', auditLog: 'Scale-to-zero active' },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [auditLogs, setAuditLogs] = useState([
    'CONFIG AUDIT [10:42]: Platform [ERP] configuration parameters updated.',
    'SECURITY AUDIT [10:30]: AEGIS Zero-Trust security rules evaluated with zero policy breaches.',
    'FAAP AUDIT [09:15]: FAAP Double-Entry balance parity verified at $0.00 offset.'
  ]);

  const handleToggleStatus = (id: string) => {
    setPlatforms(platforms.map(p => {
      if (p.id === id) {
        const nextStatus = p.status === 'ACTIVE' ? 'SUSPENDED' : 'ACTIVE';
        const updatedLog = `Status toggled to [${nextStatus}] by Ring-0 Admin`;
        setAuditLogs(prev => [`ADMIN ACTION [${new Date().toLocaleTimeString()}]: Toggled platform [${p.name}] to ${nextStatus}`, ...prev]);
        return { ...p, status: nextStatus, auditLog: updatedLog };
      }
      return p;
    }));
  };

  return (
    <div className="space-y-6 text-slate-900 font-sans">
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 bg-slate-900 text-white text-[10px] font-mono font-bold rounded">
              RING-0 GOVERNANCE
            </span>
            <span className="text-xs text-slate-500 font-medium">Master Configuration Authority</span>
          </div>
          <h2 className="text-xl font-black text-slate-900 mt-1">Owner Central Configuration Registry</h2>
          <p className="text-xs text-slate-500">Enable, disable, suspend, upgrade, configure, and audit all 10 Sovereign Platforms & Enterprise Domains</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate && onNavigate('/owner')}
            className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-bold transition flex items-center gap-1.5"
          >
            <ArrowRight className="w-4 h-4 rotate-180" /> Return to Owner Vault
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border border-slate-200 rounded-xl p-2 flex flex-wrap gap-1 text-xs font-bold">
        <button
          onClick={() => setActiveTab('platforms')}
          className={`px-3 py-2 rounded-lg transition ${activeTab === 'platforms' ? 'bg-[#0078D4] text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'}`}
        >
          Platforms Control (8)
        </button>
        <button
          onClick={() => setActiveTab('domains')}
          className={`px-3 py-2 rounded-lg transition ${activeTab === 'domains' ? 'bg-[#0078D4] text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'}`}
        >
          Domain Registry (20)
        </button>
        <button
          onClick={() => setActiveTab('modules')}
          className={`px-3 py-2 rounded-lg transition ${activeTab === 'modules' ? 'bg-[#0078D4] text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'}`}
        >
          Modules & Add-ons
        </button>
        <button
          onClick={() => setActiveTab('security')}
          className={`px-3 py-2 rounded-lg transition ${activeTab === 'security' ? 'bg-[#0078D4] text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'}`}
        >
          AEGIS Security Rules
        </button>
        <button
          onClick={() => setActiveTab('audit')}
          className={`px-3 py-2 rounded-lg transition ${activeTab === 'audit' ? 'bg-[#0078D4] text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'}`}
        >
          Audit History Logs
        </button>
      </div>

      {/* Content Panels */}
      {activeTab === 'platforms' && (
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#0078D4]" />
              Universal Platforms Master Registry
            </h3>
            <span className="text-[10px] font-mono bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded border border-emerald-200 font-bold">
              100% OPERATIONAL
            </span>
          </div>

          <div className="space-y-3">
            {platforms.map(plat => (
              <div key={plat.id} className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-slate-300 transition">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-slate-900 text-sm">{plat.name}</span>
                    <span className="text-[10px] bg-blue-50 text-[#0078D4] px-2 py-0.5 rounded font-mono font-bold border border-blue-200">{plat.category}</span>
                  </div>
                  <div className="text-xs text-slate-500 font-mono">
                    Tier: {plat.tier} • {plat.auditLog}
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => handleToggleStatus(plat.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold border cursor-pointer transition flex items-center gap-1 ${
                      plat.status === 'ACTIVE'
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-300 hover:bg-emerald-100'
                        : 'bg-rose-50 text-rose-700 border-rose-300 hover:bg-rose-100'
                    }`}
                  >
                    <Power className="w-3.5 h-3.5" />
                    {plat.status === 'ACTIVE' ? 'ENABLED (ACTIVE)' : 'SUSPENDED'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'audit' && (
        <div className="bg-slate-900 text-white p-5 rounded-xl space-y-3 font-mono text-xs">
          <div className="flex justify-between items-center border-b border-slate-800 pb-2">
            <span className="font-bold text-emerald-400">RING-0 REAL-TIME AUDIT STREAM</span>
            <span className="text-[10px] opacity-75">LOG VERIFIED BY AEGIS</span>
          </div>

          <div className="space-y-2">
            {auditLogs.map((log, idx) => (
              <div key={idx} className="p-2 bg-slate-800 rounded border border-slate-700 leading-relaxed text-slate-200">
                {log}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default OwnerConfigurationCenter;
