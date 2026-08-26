import React from 'react';
import { Activity, ShieldCheck, CheckCircle2, AlertTriangle, Layers, Database, Cpu } from 'lucide-react';
import { RegistryHealthStats } from './types';

interface RegistryHealthPanelProps {
  stats: RegistryHealthStats;
}

export const RegistryHealthPanel: React.FC<RegistryHealthPanelProps> = ({ stats }) => {
  return (
    <div className="space-y-6 text-slate-200">
      {/* Top Banner */}
      <div className="flex items-center justify-between bg-slate-900/90 p-5 rounded-xl border border-slate-800">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-emerald-950/80 text-emerald-400 border border-emerald-800 flex items-center justify-center">
            <Activity className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-white tracking-tight">Canonical Registry Health Engine</h2>
              <span className="px-2 py-0.5 text-[10px] font-mono bg-emerald-950 text-emerald-400 border border-emerald-800 rounded">
                SCORE: {stats.healthScore}%
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Continuous validation of sovereign products, ERP modules, offices, and security schemas.
            </p>
          </div>
        </div>
        <div className="text-right font-mono">
          <div className="text-[10px] text-slate-500 uppercase">Verification Status</div>
          <div className="text-emerald-400 font-bold text-sm">100% OPERATIONAL</div>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
        <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 space-y-1">
          <div className="text-[10px] text-slate-500 uppercase">Sovereign Products</div>
          <div className="text-xl font-bold text-white">{stats.totalProducts}</div>
          <div className="text-[10px] text-emerald-400">All Reconstructed</div>
        </div>

        <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 space-y-1">
          <div className="text-[10px] text-slate-500 uppercase">Registered Modules</div>
          <div className="text-xl font-bold text-white">{stats.totalModules}</div>
          <div className="text-[10px] text-emerald-400">50+ Floor Enforced</div>
        </div>

        <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 space-y-1">
          <div className="text-[10px] text-slate-500 uppercase">Operational Offices</div>
          <div className="text-xl font-bold text-white">{stats.totalOffices}</div>
          <div className="text-[10px] text-emerald-400">Jurisdictions Mapped</div>
        </div>

        <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 space-y-1">
          <div className="text-[10px] text-slate-500 uppercase">AI Copilot Workforce</div>
          <div className="text-xl font-bold text-white">{stats.totalAIAgents}</div>
          <div className="text-[10px] text-emerald-400">Multi-Model Active</div>
        </div>
      </div>
    </div>
  );
};
