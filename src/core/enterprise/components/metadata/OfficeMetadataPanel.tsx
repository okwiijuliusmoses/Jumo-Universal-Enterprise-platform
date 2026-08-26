import React from 'react';
import { Building2, Shield, Users, ArrowRight, Layers, Lock, CheckCircle } from 'lucide-react';
import { OFFICE_TO_MODULE_MAP } from '../../../../products/OfficeModuleMapping';

interface OfficeMetadataPanelProps {
  officeId: string;
  onSelectModule?: (moduleId: string) => void;
}

export const OfficeMetadataPanel: React.FC<OfficeMetadataPanelProps> = ({
  officeId,
  onSelectModule
}) => {
  const mappedModuleId = OFFICE_TO_MODULE_MAP[officeId] || 'MOD_FAAP_CORE';
  
  // Format readable label
  const readableTitle = officeId
    .replace(/^OFF_/, '')
    .replace(/_/g, ' ')
    .toLowerCase()
    .replace(/\b\w/g, l => l.toUpperCase());

  return (
    <div className="space-y-6 text-slate-200">
      {/* Header */}
      <div className="flex items-start justify-between bg-slate-900/80 p-5 rounded-xl border border-slate-800">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-slate-800 flex items-center justify-center text-amber-400 border border-slate-700">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-white tracking-tight">{readableTitle} Office</h2>
              <span className="px-2 py-0.5 text-[10px] font-mono bg-amber-950 text-amber-400 border border-amber-800 rounded">
                {officeId}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl">
              Designated administrative department with scoped operational jurisdiction, role segregation, and secure ledger access.
            </p>
          </div>
        </div>
      </div>

      {/* Office Mappings */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
        <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 space-y-3">
          <div className="text-[10px] text-slate-500 uppercase flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-indigo-400" />
            <span>Bound Operational Module</span>
          </div>
          <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 flex items-center justify-between">
            <span className="text-slate-200 font-semibold">{mappedModuleId}</span>
            {onSelectModule && (
              <button
                onClick={() => onSelectModule(mappedModuleId)}
                className="text-[10px] text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
              >
                <span>Inspect Module</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>

        <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 space-y-3">
          <div className="text-[10px] text-slate-500 uppercase flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-emerald-400" />
            <span>Zero-Trust Authority</span>
          </div>
          <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
            <div className="text-slate-200 font-semibold">Strict Tenant Isolation</div>
            <div className="text-[11px] text-slate-500">Autonomous workflow approval barriers enabled</div>
          </div>
        </div>
      </div>
    </div>
  );
};
