import React from 'react';
import { Layers, ShieldCheck, Activity, Cpu, Sparkles, CheckCircle, Database, FileText, Lock } from 'lucide-react';
import { MasterModuleDefinition } from '../../registry/MasterModuleRegistry';

interface ModuleMetadataPanelProps {
  module: MasterModuleDefinition;
  onOpenWorkspace?: (moduleId: string) => void;
}

export const ModuleMetadataPanel: React.FC<ModuleMetadataPanelProps> = ({
  module,
  onOpenWorkspace
}) => {
  return (
    <div className="space-y-6 text-slate-200">
      {/* Header */}
      <div className="flex items-start justify-between bg-slate-900/80 p-5 rounded-xl border border-slate-800">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-slate-800 flex items-center justify-center text-indigo-400 border border-slate-700">
            {React.createElement(module.icon, { className: 'w-6 h-6' })}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-white tracking-tight">{module.name}</h2>
              <span className="px-2 py-0.5 text-[10px] font-mono bg-indigo-950 text-indigo-400 border border-indigo-800 rounded">
                {module.id}
              </span>
              {module.badge && (
                <span className="px-2 py-0.5 text-[10px] font-mono bg-slate-800 text-slate-300 border border-slate-700 rounded">
                  {module.badge}
                </span>
              )}
            </div>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl">{module.description}</p>
          </div>
        </div>
        {onOpenWorkspace && (
          <button
            onClick={() => onOpenWorkspace(module.id)}
            className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-mono font-medium transition-colors flex items-center gap-1.5 shadow-xs"
          >
            <span>Launch Workspace</span>
          </button>
        )}
      </div>

      {/* Attributes Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
        <div className="bg-slate-900/60 p-3 rounded-lg border border-slate-800">
          <div className="text-[10px] text-slate-500 uppercase">Product Scope</div>
          <div className="text-slate-200 font-semibold mt-0.5">{module.productId}</div>
        </div>
        <div className="bg-slate-900/60 p-3 rounded-lg border border-slate-800">
          <div className="text-[10px] text-slate-500 uppercase">Category</div>
          <div className="text-slate-200 font-semibold mt-0.5">{module.category || 'General Operations'}</div>
        </div>
        <div className="bg-slate-900/60 p-3 rounded-lg border border-slate-800">
          <div className="text-[10px] text-slate-500 uppercase">Version / Lifecycle</div>
          <div className="text-emerald-400 font-semibold mt-0.5">{module.version || 'v16.2.0'} ({module.status})</div>
        </div>
        <div className="bg-slate-900/60 p-3 rounded-lg border border-slate-800">
          <div className="text-[10px] text-slate-500 uppercase">Owner Directorate</div>
          <div className="text-slate-200 font-semibold mt-0.5">{module.owner || 'JUMO Platform'}</div>
        </div>
      </div>

      {/* Capabilities & Schema Bindings */}
      <div className="bg-slate-900/60 p-5 rounded-xl border border-slate-800 space-y-4">
        <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <Layers className="w-4 h-4 text-indigo-400" />
          <span>Operational Capabilities & Handlers ({module.capabilitiesCount || 4})</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 font-mono text-xs">
          <div className="p-3 bg-slate-950 rounded-lg border border-slate-800/80 space-y-1.5">
            <div className="flex items-center justify-between text-slate-300 font-medium">
              <span className="flex items-center gap-1.5">
                <Database className="w-3.5 h-3.5 text-blue-400" /> Data Grid & Ledger Storage
              </span>
              <span className="text-[10px] text-emerald-400">ACTIVE</span>
            </div>
            <p className="text-[11px] text-slate-500">Autonomous CRUD, row encryption, real-time audit ledger commits.</p>
          </div>

          <div className="p-3 bg-slate-950 rounded-lg border border-slate-800/80 space-y-1.5">
            <div className="flex items-center justify-between text-slate-300 font-medium">
              <span className="flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-purple-400" /> Schema Form Engine
              </span>
              <span className="text-[10px] text-emerald-400">VALIDATED</span>
            </div>
            <p className="text-[11px] text-slate-500">Auto-generated multi-field responsive form schema with field validation.</p>
          </div>

          <div className="p-3 bg-slate-950 rounded-lg border border-slate-800/80 space-y-1.5">
            <div className="flex items-center justify-between text-slate-300 font-medium">
              <span className="flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-amber-400" /> Workflow State Machine
              </span>
              <span className="text-[10px] text-emerald-400">ENFORCED</span>
            </div>
            <p className="text-[11px] text-slate-500">Multi-stage state transitions with role-based sign-off and action barriers.</p>
          </div>

          <div className="p-3 bg-slate-950 rounded-lg border border-slate-800/80 space-y-1.5">
            <div className="flex items-center justify-between text-slate-300 font-medium">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" /> Cognitive Agent Copilot
              </span>
              <span className="text-[10px] text-emerald-400">INTEGRATED</span>
            </div>
            <p className="text-[11px] text-slate-500">Autonomous AI decision recommendations and compliance anomaly scans.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
