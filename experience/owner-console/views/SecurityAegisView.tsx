import React from 'react';
import { Shield, Lock, Activity, Eye, AlertTriangle, CheckCircle, Server, Key } from 'lucide-react';

export const SecurityAegisView: React.FC = () => {
  const policies = [
    { name: 'Zero-Trust RBAC Enforcement', status: 'ACTIVE', desc: 'Strict role-based and attribute-based access control across all 12 ERP domains.' },
    { name: 'Row-Level Tenant Isolation', status: 'ACTIVE', desc: 'Cryptographic database segregation preventing cross-tenant data leakage.' },
    { name: 'AES-256 Secrets Encryption', status: 'ACTIVE', desc: 'Production API keys (Gemini, Stripe, FAAP) sealed inside Owner Vault.' },
    { name: 'Continuous Threat Telemetry', status: 'ACTIVE', desc: 'Automated anomaly detection and intrusion mitigation sweeps.' },
  ];

  return (
    <div className="space-y-6 text-slate-900">
      <div className="flex items-center justify-between border-b border-slate-200 pb-5">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-rose-500/10 border border-rose-500/20 rounded-xl text-rose-400">
            <Shield className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">AEGIS Sovereign Accountability & Zero-Trust Security</h1>
            <p className="text-xs text-slate-600 font-mono mt-0.5">CONTINUOUS ENTERPRISE SURVEILLANCE & THREAT MITIGATION</p>
          </div>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full text-xs font-semibold">
          <Activity className="w-3.5 h-3.5 animate-pulse" />
          System Hardened & Secure
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 p-4 rounded-xl">
          <div className="flex items-center justify-between text-xs text-slate-600 mb-2">
            <span>Firewall Integrity</span>
            <Lock className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-xl font-black text-emerald-400">100% SECURE</div>
          <div className="text-[10px] text-slate-500 mt-1">Zero unauthorized access logs</div>
        </div>
        <div className="bg-white border border-slate-200 p-4 rounded-xl">
          <div className="flex items-center justify-between text-xs text-slate-600 mb-2">
            <span>RBAC Verification</span>
            <CheckCircle className="w-4 h-4 text-[#0078D4]" />
          </div>
          <div className="text-xl font-black text-[#0078D4]">ACTIVE</div>
          <div className="text-[10px] text-slate-500 mt-1">Sovereign identity boundaries</div>
        </div>
        <div className="bg-white border border-slate-200 p-4 rounded-xl">
          <div className="flex items-center justify-between text-xs text-slate-600 mb-2">
            <span>CCTV & Surveillance</span>
            <Eye className="w-4 h-4 text-teal-400" />
          </div>
          <div className="text-xl font-black text-teal-400">ONLINE</div>
          <div className="text-[10px] text-slate-500 mt-1">Intelligent video analysis ready</div>
        </div>
        <div className="bg-white border border-slate-200 p-4 rounded-xl">
          <div className="flex items-center justify-between text-xs text-slate-600 mb-2">
            <span>Key Management</span>
            <Key className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-xl font-black text-amber-400">LOCKED</div>
          <div className="text-[10px] text-slate-500 mt-1">Hardware security module status</div>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl p-6">
        <h3 className="text-base font-bold mb-4 flex items-center gap-2">
          <Server className="w-5 h-5 text-[#0078D4]" />
          Active Zero-Trust Security Policies
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {policies.map((p, idx) => (
            <div key={idx} className="p-4 bg-white border border-slate-200/80 rounded-lg flex items-start justify-between">
              <div>
                <div className="text-sm font-semibold text-slate-900">{p.name}</div>
                <div className="text-xs text-slate-600 mt-1 leading-relaxed">{p.desc}</div>
              </div>
              <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded text-[10px] font-mono font-bold">
                {p.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
