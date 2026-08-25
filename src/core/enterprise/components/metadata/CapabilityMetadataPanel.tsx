import React from 'react';
import { Layers, ShieldCheck, Activity, Database, CheckCircle, Lock, Code } from 'lucide-react';
import { JumoCapability } from '../../registry/types';

interface CapabilityMetadataPanelProps {
  capability: JumoCapability;
}

export const CapabilityMetadataPanel: React.FC<CapabilityMetadataPanelProps> = ({
  capability
}) => {
  return (
    <div className="space-y-6 text-slate-200">
      {/* Header */}
      <div className="flex items-start justify-between bg-slate-900/80 p-5 rounded-xl border border-slate-800">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-slate-800 flex items-center justify-center text-indigo-400 border border-slate-700">
            {capability.icon ? React.createElement(capability.icon, { className: 'w-6 h-6' }) : <Layers className="w-6 h-6" />}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-white tracking-tight">{capability.name}</h2>
              <span className="px-2 py-0.5 text-[10px] font-mono bg-indigo-950 text-indigo-400 border border-indigo-800 rounded">
                {capability.id}
              </span>
              <span className="px-2 py-0.5 text-[10px] font-mono bg-emerald-950 text-emerald-400 border border-emerald-800 rounded">
                {capability.implementationStatus}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl">{capability.description}</p>
          </div>
        </div>
      </div>

      {/* Grid Properties */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
        <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 space-y-1.5">
          <div className="text-[10px] text-slate-500 uppercase">Bound Module ID</div>
          <div className="text-slate-200 font-semibold">{capability.moduleId}</div>
        </div>
        <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 space-y-1.5">
          <div className="text-[10px] text-slate-500 uppercase">Security Clearance Level</div>
          <div className="text-amber-400 font-semibold">{capability.securityLevel}</div>
        </div>
        <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 space-y-1.5">
          <div className="text-[10px] text-slate-500 uppercase">Form Schema ID</div>
          <div className="text-indigo-300 font-semibold">{capability.formId || 'DEFAULT_DYNAMIC_SCHEMA'}</div>
        </div>
      </div>
    </div>
  );
};
