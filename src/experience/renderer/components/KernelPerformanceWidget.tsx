import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Activity, Cpu, Database, Zap, ArrowUp, ArrowDown } from 'lucide-react';

export const KernelPerformanceWidget: React.FC = () => {
  const [cpuUsage, setCpuUsage] = useState<number>(4.2);
  const [memUsage, setMemUsage] = useState<number>(1.8);
  const [latency, setLatency] = useState<number>(12);
  const [history, setHistory] = useState<number[]>(new Array(20).fill(0).map(() => Math.random() * 5 + 2));

  useEffect(() => {
    const interval = setInterval(() => {
      setCpuUsage(prev => {
        const next = Math.max(1, Math.min(100, prev + (Math.random() - 0.5) * 5));
        setHistory(h => [...h.slice(1), next]);
        return next;
      });
      setMemUsage(prev => Math.max(0.5, Math.min(64, prev + (Math.random() - 0.5) * 0.2)));
      setLatency(prev => Math.max(5, Math.min(150, prev + (Math.random() - 0.5) * 2)));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const maxHistory = Math.max(...history, 10);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-indigo-600" />
          <h3 className="text-xs font-black uppercase tracking-widest text-slate-900">Kernel Performance Monitor</h3>
        </div>
        <div className="px-2 py-0.5 bg-emerald-50 text-[9px] font-black text-emerald-600 rounded-full border border-emerald-200 uppercase tracking-tighter">
          Nominal Operational State
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase">
            <span className="flex items-center gap-1"><Cpu className="w-3 h-3" /> CPU Usage</span>
            <span className={cpuUsage > 70 ? 'text-rose-600' : 'text-slate-900'}>{cpuUsage.toFixed(1)}%</span>
          </div>
          <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
            <motion.div 
              animate={{ width: `${cpuUsage}%` }}
              className={`h-full ${cpuUsage > 70 ? 'bg-rose-500' : 'bg-indigo-600'}`}
            />
          </div>
        </div>

        <div className="space-y-1">
          <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase">
            <span className="flex items-center gap-1"><Database className="w-3 h-3" /> Memory (GB)</span>
            <span className="text-slate-900">{memUsage.toFixed(2)} / 64.0</span>
          </div>
          <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
            <motion.div 
              animate={{ width: `${(memUsage / 64) * 100}%` }}
              className="h-full bg-blue-500"
            />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between text-[9px] font-black text-slate-400 uppercase tracking-widest">
          <span>Processing Latency History</span>
          <span className="text-indigo-600">{latency.toFixed(0)} ms AVG</span>
        </div>
        <div className="h-16 flex items-end gap-1 px-1">
          {history.map((val, i) => (
            <motion.div
              key={i}
              initial={{ height: 0 }}
              animate={{ height: `${(val / maxHistory) * 100}%` }}
              className="flex-1 bg-indigo-100/50 rounded-t-sm border-x border-t border-indigo-200/30"
            />
          ))}
        </div>
      </div>

      <div className="pt-2 border-t border-slate-100 grid grid-cols-3 gap-2">
        <div className="text-center p-2 bg-slate-50 rounded-lg">
          <div className="text-[8px] font-black text-slate-400 uppercase">IOPS</div>
          <div className="text-xs font-black text-slate-900">1.2k</div>
        </div>
        <div className="text-center p-2 bg-slate-50 rounded-lg">
          <div className="text-[8px] font-black text-slate-400 uppercase">Threads</div>
          <div className="text-xs font-black text-slate-900">156</div>
        </div>
        <div className="text-center p-2 bg-slate-50 rounded-lg">
          <div className="text-[8px] font-black text-slate-400 uppercase">Uptime</div>
          <div className="text-xs font-black text-slate-900">12d 4h</div>
        </div>
      </div>
    </div>
  );
};
