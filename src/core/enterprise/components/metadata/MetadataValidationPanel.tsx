import React from 'react';
import { CheckCircle2, AlertTriangle, XCircle, ShieldCheck } from 'lucide-react';
import { MetadataValidationItem } from './types';

interface MetadataValidationPanelProps {
  items: MetadataValidationItem[];
}

export const MetadataValidationPanel: React.FC<MetadataValidationPanelProps> = ({ items }) => {
  return (
    <div className="space-y-4 text-slate-200">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Registry Validation & Anti-Reduction Checks ({items.length})</span>
        </h3>
      </div>

      <div className="divide-y divide-slate-800 bg-slate-900/60 rounded-xl border border-slate-800 overflow-hidden font-mono text-xs">
        {items.map((item) => (
          <div key={item.id} className="p-3.5 flex items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              {item.status === 'VALID' ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              ) : item.status === 'WARNING' ? (
                <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              ) : (
                <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              )}
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-white">{item.name}</span>
                  <span className="text-[10px] text-slate-500">[{item.type}]</span>
                  <code className="text-[10px] text-slate-400 bg-slate-950 px-1 rounded">{item.id}</code>
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5">{item.message}</p>
              </div>
            </div>
            <span
              className={`px-2 py-0.5 text-[9px] font-bold rounded ${
                item.status === 'VALID'
                  ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                  : item.status === 'WARNING'
                  ? 'bg-amber-950 text-amber-400 border border-amber-800'
                  : 'bg-rose-950 text-rose-400 border border-rose-800'
              }`}
            >
              {item.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
