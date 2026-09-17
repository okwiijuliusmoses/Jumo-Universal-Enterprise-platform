import React, { useState } from 'react';
import { Play, CheckCircle2, ShieldCheck, Database, Layers, Activity } from 'lucide-react';
import { CanonicalModule, CanonicalCapability, CanonicalForm, CanonicalDatabaseEntity } from '../../../products/canonical/types';

export interface StandardModuleWorkspaceProps {
  module: CanonicalModule;
  capabilities: CanonicalCapability[];
  forms: CanonicalForm[];
  databaseEntities: CanonicalDatabaseEntity[];
  accentColor: 'amber' | 'emerald' | 'indigo' | 'blue';
  onExecuteAction?: (actionName: string, formData: Record<string, string>) => void;
  executionMessage?: string | null;
}

export function StandardModuleWorkspace({
  module,
  capabilities,
  forms,
  databaseEntities,
  accentColor,
  onExecuteAction,
  executionMessage
}: StandardModuleWorkspaceProps) {
  const [formState, setFormState] = useState<Record<string, string>>({});

  const primaryForm = forms[0];
  const targetEntity = databaseEntities[0];

  const colorClasses = {
    amber: {
      codeText: 'text-amber-700',
      badgeBg: 'bg-amber-50 text-amber-800 border-amber-200',
      btnBg: 'bg-amber-600 hover:bg-amber-700 text-white',
      ring: 'focus:ring-amber-500',
      entityTag: 'bg-amber-50 text-amber-900 border-amber-200'
    },
    emerald: {
      codeText: 'text-emerald-700',
      badgeBg: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      btnBg: 'bg-emerald-600 hover:bg-emerald-700 text-white',
      ring: 'focus:ring-emerald-500',
      entityTag: 'bg-emerald-50 text-emerald-900 border-emerald-200'
    },
    indigo: {
      codeText: 'text-indigo-700',
      badgeBg: 'bg-indigo-50 text-indigo-800 border-indigo-200',
      btnBg: 'bg-indigo-600 hover:bg-indigo-700 text-white',
      ring: 'focus:ring-indigo-500',
      entityTag: 'bg-indigo-50 text-indigo-900 border-indigo-200'
    },
    blue: {
      codeText: 'text-blue-700',
      badgeBg: 'bg-blue-50 text-blue-800 border-blue-200',
      btnBg: 'bg-blue-600 hover:bg-blue-700 text-white',
      ring: 'focus:ring-blue-500',
      entityTag: 'bg-blue-50 text-blue-900 border-blue-200'
    }
  }[accentColor];

  const handleRunForm = () => {
    if (onExecuteAction) {
      onExecuteAction(primaryForm ? primaryForm.title : capabilities[0]?.name || 'Execute Module Workflows', formState);
    }
    setFormState({});
  };

  return (
    <div className="space-y-6">
      {/* 1. OPERATIONAL CAPABILITIES WORKSPACE */}
      <div className="p-5 bg-slate-50 rounded-xl border border-slate-200 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
            <Layers className="w-4 h-4 text-slate-600" />
            Active Module Capabilities
          </h3>
          <span className={`text-[10px] font-mono px-2 py-0.5 rounded border font-bold ${colorClasses.badgeBg}`}>
            {capabilities.length} Verified Capabilities
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          {capabilities.map(cap => (
            <div key={cap.id} className="p-3 bg-white rounded-xl border border-slate-200 space-y-1.5 shadow-2xs">
              <div className="flex items-center justify-between">
                <span className={`font-mono font-bold text-[10px] ${colorClasses.codeText}`}>{cap.code}</span>
                <span className="text-[9px] font-mono bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-bold">
                  {cap.requiredPermission}
                </span>
              </div>
              <div className="font-bold text-slate-900">{cap.name}</div>
              <div className="text-[10px] text-slate-500 leading-relaxed">{cap.description}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. INTERACTIVE ENTRY FORM */}
      {primaryForm && (
        <div className="p-5 bg-slate-50 rounded-xl border border-slate-200 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200/80 pb-3">
            <div>
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">{primaryForm.title}</h4>
              <p className="text-[11px] text-slate-500 font-mono">Action Handler: {primaryForm.submitAction}</p>
            </div>
            <span className="text-[10px] font-mono bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded border border-emerald-200 font-bold">
              Form Bound
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {primaryForm.fields.map(field => (
              <div key={field.name} className="space-y-1">
                <label className="text-[11px] font-bold text-slate-700">{field.label}</label>
                <input
                  type={field.type === 'number' ? 'number' : 'text'}
                  placeholder={field.placeholder || `Enter ${field.label.toLowerCase()}...`}
                  value={formState[field.name] || ''}
                  onChange={e => setFormState({ ...formState, [field.name]: e.target.value })}
                  className={`w-full p-2.5 bg-white border border-slate-300 rounded-lg text-xs focus:outline-none focus:ring-2 ${colorClasses.ring}`}
                />
              </div>
            ))}
          </div>

          <button
            onClick={handleRunForm}
            className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${colorClasses.btnBg}`}
          >
            <Play className="w-4 h-4 fill-current" /> Submit Record Entry
          </button>
        </div>
      )}

      {/* 3. DATABASE SCHEMA TARGET */}
      {targetEntity && (
        <div className="p-4 bg-white rounded-xl border border-slate-200 text-xs space-y-2">
          <div className="flex items-center justify-between font-mono">
            <span className="font-bold text-slate-700 flex items-center gap-1.5">
              <Database className="w-3.5 h-3.5 text-slate-500" /> DB Table Binding:
            </span>
            <span className={`px-2 py-0.5 rounded border text-[10px] font-bold ${colorClasses.entityTag}`}>
              {targetEntity.tableName}
            </span>
          </div>
          {targetEntity.fields && targetEntity.fields.length > 0 && (
            <div className="text-[10px] text-slate-500 font-mono">
              FIELDS: {targetEntity.fields.map(f => `${f.name} (${f.type})`).join(', ')}
            </div>
          )}
        </div>
      )}

      {/* 4. EXECUTION FEEDBACK BANNER */}
      {executionMessage && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900 space-y-1 font-mono">
          <div className="font-bold flex items-center gap-1 text-emerald-800">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Operational Record Sealed
          </div>
          <div>{executionMessage}</div>
        </div>
      )}
    </div>
  );
}
