import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Activity, Cpu, Database, Zap, Shield, AlertCircle } from 'lucide-react';

interface Metric {
  label: string;
  value: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  history: number[];
}

export const SystemPerformanceMonitor: React.FC = () => {
  const [metrics, setMetrics] = useState<Record<string, Metric>>({
    cpu: { label: 'Kernel CPU', value: 42, unit: '%', trend: 'stable', history: Array(20).fill(40).map(v => v + Math.random() * 10) },
    memory: { label: 'System RAM', value: 68, unit: '%', trend: 'stable', history: Array(20).fill(65).map(v => v + Math.random() * 5) },
    latency: { label: 'AI Latency', value: 124, unit: 'ms', trend: 'stable', history: Array(20).fill(120).map(v => v + Math.random() * 20) },
    io: { label: 'Ledger I/O', value: 850, unit: 'ops/s', trend: 'stable', history: Array(20).fill(800).map(v => v + Math.random() * 100) }
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => {
        const next = { ...prev };
        Object.keys(next).forEach(key => {
          const m = next[key];
          const variance = key === 'io' ? 50 : 2;
          const newVal = Math.max(0, Math.min(key === 'io' ? 2000 : 100, m.value + (Math.random() - 0.5) * variance));
          
          next[key] = {
            ...m,
            value: Number(newVal.toFixed(1)),
            trend: newVal > m.value ? 'up' : (newVal < m.value ? 'down' : 'stable'),
            history: [...m.history.slice(1), newVal]
          };
        });
        return next;
      });
    }, 2000);

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
          {Object.entries(metrics).map(([key, m]) => (
            <div key={key} className="bg-slate-950 border border-slate-800/50 p-4 rounded-2xl hover:border-slate-700 transition-all">
              <div className="flex justify-between items-start mb-2">
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{m.label}</span>
                <span className={`text-[10px] font-mono ${m.trend === 'up' ? 'text-blue-400' : (m.trend === 'down' ? 'text-amber-400' : 'text-slate-400')}`}>
                  {m.trend === 'up' ? '↑' : (m.trend === 'down' ? '↓' : '•')}
                </span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-mono font-black text-white">{m.value}</span>
                <span className="text-[10px] font-bold text-slate-500 uppercase">{m.unit}</span>
              </div>
              
              <div className="mt-4 flex items-end gap-1 h-8">
                {m.history.map((val, i) => {
                  const max = key === 'io' ? 2000 : 100;
                  const height = (val / max) * 100;
                  return (
                    <div 
                      key={i} 
                      className={`flex-1 rounded-t-sm transition-all duration-500 ${i === m.history.length - 1 ? 'bg-blue-500' : 'bg-slate-800'}`}
                      style={{ height: `${height}%` }}
                    />
                  );
                })}
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
