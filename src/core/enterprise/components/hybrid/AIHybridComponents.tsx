import React from 'react';
import { 
  Activity, TrendingUp, Users, DollarSign, 
  ArrowUpRight, ArrowDownRight, AlertCircle,
  MoreVertical, RefreshCw
} from 'lucide-react';
import { formatNumber } from '../../../../utils/formatters';
import { AIHybridComponentProps } from '../../registry/types';
import { JumoDataTable } from '../JumoDataTable';
import { JumoForm } from '../JumoForm';

export const AIHybridKPIComponent: React.FC<AIHybridComponentProps & { 
  valueResolver?: () => number | string,
  trend?: number,
  unit?: string 
}> = ({ title, valueResolver, trend, unit, config }) => {
  const value = valueResolver ? valueResolver() : '---';
  
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow group relative overflow-hidden">
      <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
        <Activity className="w-12 h-12" />
      </div>
      
      <div className="flex justify-between items-start mb-2">
        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{title}</span>
        <button className="text-slate-300 hover:text-slate-600 transition-colors">
          <MoreVertical className="w-4 h-4" />
        </button>
      </div>
      
      <div className="flex items-baseline gap-1 mt-1">
        <span className="text-2xl font-black text-slate-900 tracking-tight">
          {typeof value === 'number' ? formatNumber(value) : value}
        </span>
        {unit && <span className="text-[10px] font-bold text-slate-400 uppercase">{unit}</span>}
      </div>
      
      {trend !== undefined && (
        <div className="flex items-center gap-1 mt-2">
          {trend >= 0 ? (
            <ArrowUpRight className="w-3.5 h-3.5 text-emerald-500" />
          ) : (
            <ArrowDownRight className="w-3.5 h-3.5 text-rose-500" />
          )}
          <span className={`text-[10px] font-black ${trend >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
            {Math.abs(trend)}% vs last month
          </span>
        </div>
      )}

      <div className="mt-4 pt-4 border-t border-slate-50 flex items-center justify-between">
        <span className="text-[8px] font-bold text-slate-300 uppercase italic">Hybrid AI Insight: Active</span>
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[8px] font-black text-slate-400 uppercase">Live Registry</span>
        </div>
      </div>
    </div>
  );
};

export const AIHybridDataGrid: React.FC<AIHybridComponentProps & { 
  data: any[], 
  columns: any[],
  onAction?: (record: any) => void 
}> = ({ title, data, columns, onAction }) => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <JumoDataTable
        title={title || 'System Registry Data'}
        data={data}
        columns={columns}
        onRowClick={onAction}
      />
    </div>
  );
};

export const AIHybridDecisionPanel: React.FC<AIHybridComponentProps & { 
  decisions: any[] 
}> = ({ title, decisions }) => {
  return (
    <div className="bg-slate-950 text-white rounded-3xl p-8 border border-slate-800 shadow-2xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-xl font-black italic tracking-tight uppercase">Sovereign Decision Registry</h3>
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">Authorized Executive Directives</p>
        </div>
        <button className="p-2 bg-slate-900 rounded-xl hover:bg-slate-800 transition">
          <RefreshCw className="w-5 h-5 text-indigo-400" />
        </button>
      </div>
      
      <div className="space-y-4">
        {decisions.map((dec, idx) => (
          <div key={idx} className="group p-5 bg-slate-900/50 border border-slate-800 rounded-2xl hover:border-indigo-500/50 hover:bg-slate-900 transition-all">
            <div className="flex justify-between items-start mb-2">
              <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest ${
                dec.priority === 'CRITICAL' ? 'bg-rose-500/20 text-rose-400' : 'bg-indigo-500/20 text-indigo-400'
              }`}>
                {dec.priority}
              </span>
              <span className="text-[9px] font-mono text-slate-500">{dec.date}</span>
            </div>
            <h4 className="text-sm font-bold text-slate-200 group-hover:text-white transition-colors">{dec.title}</h4>
            <p className="text-xs text-slate-500 mt-1 line-clamp-2">{dec.description}</p>
            <div className="mt-4 flex items-center justify-between border-t border-slate-800 pt-4">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-indigo-600 flex items-center justify-center text-[10px] font-bold">A</div>
                <span className="text-[10px] font-black uppercase text-slate-400">{dec.officer}</span>
              </div>
              <button className="text-[9px] font-black uppercase text-indigo-400 hover:text-indigo-300 transition-colors">
                Inspect Directive
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
