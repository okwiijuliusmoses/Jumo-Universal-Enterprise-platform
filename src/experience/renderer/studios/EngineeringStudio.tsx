import React from 'react';
import { motion } from 'motion/react';
import { 
  Users, Sparkles, Activity, Shield, Cpu, Zap, 
  Terminal, Search, Settings, RefreshCw, Layers,
  CheckCircle2, AlertCircle, HardDrive, Brain
} from 'lucide-react';
import { EngineeringAgent } from '../../../core/factory/registry/HubRegistryTypes';

interface EngineeringStudioProps {
  agents: EngineeringAgent[];
}

export const EngineeringStudio: React.FC<EngineeringStudioProps> = ({ agents }) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-600 flex items-center justify-center text-white">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-black text-slate-900 tracking-tight uppercase">Engineering Workforce</h2>
            <p className="text-xs text-slate-500 font-medium">JUMO-AI Swarm Intelligence & Workforce Management Control Surface</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Swarm Health</span>
            <span className="text-xs font-black text-emerald-600 uppercase flex items-center justify-end gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              98.4% Nominal
            </span>
          </div>
          <div className="h-8 w-px bg-slate-200"></div>
          <button className="p-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-400 hover:text-blue-600 transition-all">
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Workforce Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {(agents ?? []).map((agent) => (
          <motion.div 
            key={agent.agentId}
            whileHover={{ y: -4 }}
            className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-5 flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                  agent.health === 'HEALTHY' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                }`}>
                  <Brain className="w-7 h-7" />
                </div>
                <span className={`px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest border ${
                  agent.status === 'AVAILABLE' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-blue-50 text-blue-700 border-blue-100'
                }`}>
                  {agent.status}
                </span>
              </div>

              <div>
                <h4 className="text-sm font-black text-slate-900 flex items-center gap-2">
                  {agent.agentId.split('-').pop()?.toUpperCase()}
                  {agent.status === 'ACTIVE' && <Sparkles className="w-3 h-3 text-purple-500 animate-pulse" />}
                </h4>
                <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">{agent.division.replace('_', ' ')}</span>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-[9px] font-black text-slate-400 uppercase tracking-tighter">
                  <span>Logic Capacity</span>
                  <span className="text-slate-900">{agent.workload}%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-1 overflow-hidden">
                  <div className="bg-slate-900 h-full transition-all duration-1000" style={{ width: `${agent.workload}%` }} />
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/60 space-y-2">
                <div className="flex items-center gap-1.5">
                  <Shield className="w-3 h-3 text-slate-400" />
                  <span className="text-[9px] font-bold text-slate-600 uppercase tracking-tight">Capabilities</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {(agent.capabilities ?? []).map((cap, i) => (
                    <span key={i} className="text-[8px] font-black text-slate-500 bg-white px-1.5 py-0.5 rounded border border-slate-200 uppercase">
                      {cap}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                Job ID: {agent.agentId.split('-').pop()?.toUpperCase()}-NODE
              </span>
              <button className="text-[10px] font-black text-blue-600 hover:text-blue-700 uppercase tracking-wider cursor-pointer">
                View Logs
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Swarm Intelligence Console */}
      <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 shadow-2xl space-y-5">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <Terminal className="w-5 h-5 text-emerald-500" />
            <h3 className="text-sm font-black text-slate-200 uppercase tracking-widest">Global Swarm Intelligence Feed</h3>
          </div>
          <div className="flex items-center gap-4 text-[10px] font-bold text-slate-500">
            <span className="flex items-center gap-1.5"><Activity className="w-3 h-3 text-emerald-500" /> 12ms LATENCY</span>
            <span className="flex items-center gap-1.5"><Shield className="w-3 h-3 text-blue-500" /> ZERO-TRUST ENCRYPTED</span>
          </div>
        </div>
        
        <div className="h-48 overflow-y-auto font-mono text-[10px] space-y-2.5 pr-4 scrollbar-thin scrollbar-thumb-slate-800">
          {[
            "› [SWARM] Agent node ARCHITECT-001 finalized schema validation on SACCO-CORE-v4.",
            "› [SWARM] Parallelizing source generation for 4 microservices on JOB-2026-000905.",
            "› [SWARM] Security node CYBER-01 detected non-standard closure in FAAP ledger interface. Refactoring...",
            "› [SWARM] Refactoring complete. Regression testing initiated across 500+ logic gates.",
            "› [SWARM] Consensus reached on deployment strategy for Region-01 sovereign cluster.",
            "› [SWARM] Standing by for operator next-stage promotion command."
          ].map((log, i) => (
            <div key={i} className="flex gap-3 text-emerald-400/80">
              <span className="text-slate-700 shrink-0 select-none">[{new Date().toLocaleTimeString()}]</span>
              <span className="text-emerald-500">›</span>
              <span className="leading-relaxed">{log}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
