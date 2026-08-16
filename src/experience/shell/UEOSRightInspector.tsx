import React from 'react';
import { motion } from 'motion/react';
import { X, Info, Activity, Shield } from 'lucide-react';

interface UEOSRightInspectorProps {
  entity: {
    type: string;
    id: string;
    data: any;
  };
  onClose: () => void;
  onTriggerAction: (actionId: string, params?: any) => void;
}

export function UEOSRightInspector({ entity, onClose, onTriggerAction }: UEOSRightInspectorProps) {
  return (
    <motion.div 
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      className="h-full bg-white border-l border-slate-200 flex flex-col shadow-2xl"
    >
      <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-slate-900 text-white rounded-lg">
            <Info className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-black uppercase text-slate-800 tracking-wider">Entity Inspector</h3>
            <p className="text-[9px] text-slate-400 font-bold uppercase">{entity.type} • {entity.id}</p>
          </div>
        </div>
        <button onClick={onClose} className="p-1 rounded-md hover:bg-slate-100 text-slate-400">
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        <div className="bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden divide-y divide-slate-100">
          <div className="p-3 bg-slate-100/70 text-[10px] font-black uppercase text-slate-700 tracking-wider">
            Entity Metadata
          </div>
          {entity.data && typeof entity.data === 'object' && Object.keys(entity.data).length > 0 ? (
            Object.entries(entity.data).slice(0, 10).map(([key, val]) => (
              <div key={key} className="p-3 flex items-start justify-between gap-3 text-xs">
                <span className="font-bold text-slate-500 uppercase text-[10px]">{key}</span>
                <span className="font-semibold text-slate-900 text-right truncate max-w-[180px]">
                  {typeof val === 'object' ? JSON.stringify(val) : String(val)}
                </span>
              </div>
            ))
          ) : (
            <div className="p-4 text-xs text-slate-500 text-center font-medium">
              {String(entity.data || 'No extended metadata')}
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button 
            onClick={() => onTriggerAction('verify-hashes', { id: entity.id })}
            className="flex flex-col items-center gap-2 p-3 bg-white border border-slate-200 rounded-xl hover:border-blue-500 transition-all group"
          >
            <Shield className="w-4 h-4 text-slate-400 group-hover:text-blue-500" />
            <span className="text-[9px] font-bold text-slate-500 uppercase">Verify Hash</span>
          </button>
          <button 
            className="flex flex-col items-center gap-2 p-3 bg-white border border-slate-200 rounded-xl hover:border-blue-500 transition-all group"
          >
            <Activity className="w-4 h-4 text-slate-400 group-hover:text-blue-500" />
            <span className="text-[9px] font-bold text-slate-500 uppercase">Audit Logs</span>
          </button>
        </div>
      </div>

      <div className="p-4 border-t border-slate-100 bg-slate-50/50">
        <button 
          onClick={onClose}
          className="w-full py-2 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-xl"
        >
          Close Inspector
        </button>
      </div>
    </motion.div>
  );
}
