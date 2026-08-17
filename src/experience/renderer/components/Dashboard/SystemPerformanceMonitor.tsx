import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Activity, Cpu, Database, Zap, Shield, AlertCircle } from 'lucide-react';
import { TelemetryAggregationService, TelemetryMetric } from '../../../../core/telemetry/TelemetryAggregationService';

export const SystemPerformanceMonitor: React.FC = () => {
  const [metrics, setMetrics] = useState<TelemetryMetric[]>([]);

  useEffect(() => {
    const service = TelemetryAggregationService.getInstance();
    
    const updateMetrics = () => {
      setMetrics(service.getAllMetrics().filter(m => m.category === 'PLATFORM' || m.category === 'AI'));
    };

    updateMetrics();
    const interval = setInterval(updateMetrics, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl relative overflow-hidden group">
      <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
        <Activity size={80} className="text-blue-500" />
      </div>

      <div className="relative z-10 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600/20 border border-blue-500/30 rounded-xl flex items-center justify-center">
              <Activity className="text-blue-400" size={20} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-widest">JUMO UEOS Kernel</h3>
              <p className="text-[10px] text-slate-500 font-mono">REAL-TIME TELEMETRY ENGINE</p>
            </div>
          </div>
          <div className="px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-[10px] font-black text-emerald-400 uppercase animate-pulse">
            Optimal
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {metrics.map((m) => (
            <div key={m.id} className="bg-slate-950 border border-slate-800/50 p-4 rounded-2xl hover:border-slate-700 transition-all">
              <div className="flex justify-between items-start mb-2">
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{m.name}</span>
                <span className={`text-[10px] font-mono ${m.status === 'HEALTHY' ? 'text-blue-400' : 'text-slate-400'}`}>
                  {m.status === 'HEALTHY' ? '●' : '•'}
                </span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-mono font-black text-white">{m.value}</span>
                <span className="text-[10px] font-bold text-slate-500 uppercase">{m.unit}</span>
              </div>
              
              <div className="mt-4 flex items-end gap-1 h-2">
                <div className="flex-1 rounded-sm bg-blue-500/30 h-full"></div>
                <div className="flex-1 rounded-sm bg-blue-500/50 h-full"></div>
                <div className="flex-1 rounded-sm bg-blue-500 h-full"></div>
              </div>
            </div>
          ))}
        </div>

        <div className="pt-4 border-t border-slate-800/50 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-[10px] text-slate-500 font-bold uppercase">
              <Shield size={12} className="text-indigo-400" />
              Security: SEALED
            </div>
            <div className="flex items-center gap-1.5 text-[10px] text-slate-500 font-bold uppercase">
              <Database size={12} className="text-emerald-400" />
              Sovereignty: 100%
            </div>
          </div>
          <div className="text-[9px] font-mono text-slate-600">
            LOAD_AVG: 0.24, 0.28, 0.31
          </div>
        </div>
      </div>
    </div>
  );
};
