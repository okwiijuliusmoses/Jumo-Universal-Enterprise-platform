import React from 'react';
import { motion } from 'motion/react';
import { 
  Zap, Play, Pause, RefreshCw, Box, Sliders, Settings, 
  Terminal, Activity, Shield, CheckCircle2, AlertTriangle,
  GitCommit, GitPullRequest, GitBranch, Binary, Cpu, Network
} from 'lucide-react';
import { ManufacturingJob, ManufacturingJobStatus } from '../../../core/factory/registry/HubRegistryTypes';

interface ManufacturingStudioProps {
  jobs: ManufacturingJob[];
  onPromoteJob: (jobId: string) => void;
  onPauseJob: (jobId: string) => void;
}

export const ManufacturingStudio: React.FC<ManufacturingStudioProps> = ({
  jobs,
  onPromoteJob,
  onPauseJob
}) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white">
            <Zap className="w-6 h-6 fill-current" />
          </div>
          <div>
            <h2 className="text-lg font-black text-slate-900 tracking-tight uppercase">Manufacturing Studio</h2>
            <p className="text-xs text-slate-500 font-medium">Live Orchestration & Job Lifecycle Control Surface</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold px-3 py-1 bg-blue-50 text-blue-700 border border-blue-100 rounded-full uppercase tracking-wider">
            {(jobs ?? []).filter(j => j.status !== 'PRODUCTION' && j.status !== 'RETIRED').length} Active Jobs
          </span>
          <span className="text-[10px] font-bold px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-full uppercase tracking-wider">
            {(jobs ?? []).filter(j => j.status === 'PRODUCTION').length} Operational
          </span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[10px] uppercase font-black text-slate-400 tracking-wider">
                <th className="p-4 px-6">Pipeline Job</th>
                <th className="p-4 px-6">Architecture Baseline</th>
                <th className="p-4 px-6">Runtime Execution Stage</th>
                <th className="p-4 px-6">Orchestration Progress</th>
                <th className="p-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {(jobs ?? []).map((job) => (
                <motion.tr 
                  key={job.id} 
                  layout
                  className="hover:bg-slate-50/50 transition-colors group"
                >
                  <td className="p-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${job.status === 'BLOCKED' ? 'bg-rose-50 text-rose-600' : 'bg-blue-50 text-blue-600'}`}>
                        <Binary className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-[11px] font-black text-slate-900 block tracking-tight">{job.id}</span>
                        <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">{job.productId}</span>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 px-6">
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] font-bold text-slate-700 font-mono flex items-center gap-1.5">
                        <Shield className="w-3 h-3 text-blue-500" />
                        {job.architectureId}
                      </span>
                      <span className="text-[9px] text-slate-400 font-bold uppercase">v{job.version} • {job.ecosystem}</span>
                    </div>
                  </td>
                  <td className="p-4 px-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full font-black text-[9px] bg-slate-900 text-white uppercase tracking-widest">
                      <span className={`w-1.5 h-1.5 rounded-full ${job.status === 'BLOCKED' ? 'bg-rose-500' : 'bg-emerald-500 animate-pulse'}`}></span>
                      {job.status.replace('_', ' ')}
                    </div>
                  </td>
                  <td className="p-4 px-6">
                    <div className="w-48 space-y-2">
                      <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${job.progress}%` }}
                          className={`h-full rounded-full transition-all duration-1000 ${job.status === 'BLOCKED' ? 'bg-rose-500' : 'bg-blue-600'}`}
                        />
                      </div>
                      <div className="flex justify-between text-[9px] font-black text-slate-400 uppercase tracking-tighter">
                        <span>Progress: {job.progress}%</span>
                        <span>{job.progress === 100 ? 'COMPLETE' : 'EXECUTING'}</span>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => onPauseJob(job.id)}
                        className={`p-2 rounded-xl border transition-all ${
                          job.status === 'BLOCKED' 
                            ? 'bg-emerald-50 text-emerald-600 border-emerald-200 hover:bg-emerald-100' 
                            : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                        }`}
                        title={job.status === 'BLOCKED' ? "Resume Pipeline" : "Pause Pipeline"}
                      >
                        {job.status === 'BLOCKED' ? <Play className="w-3.5 h-3.5 fill-current" /> : <Pause className="w-3.5 h-3.5 fill-current" />}
                      </button>
                      <button 
                        onClick={() => onPromoteJob(job.id)}
                        disabled={job.status === 'PRODUCTION' || job.status === 'BLOCKED'}
                        className="px-4 py-1.5 bg-slate-900 hover:bg-blue-600 text-white rounded-xl text-[10px] font-black uppercase tracking-wider transition-all disabled:opacity-30 disabled:cursor-not-allowed shadow-sm"
                      >
                        Promote Stage
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
              {(jobs ?? []).length === 0 && (
                <tr>
                  <td colSpan={5} className="p-20 text-center space-y-4 opacity-40">
                    <Activity className="w-16 h-16 mx-auto text-slate-300" />
                    <div>
                      <p className="text-sm font-black text-slate-900 uppercase">No active manufacturing jobs</p>
                      <p className="text-xs font-bold text-slate-500 mt-1 uppercase tracking-tight">Initiate a job from an approved architecture contract.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Real-time Logistics & Logs Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-xs font-black uppercase text-slate-400 tracking-wider flex items-center gap-2">
              <Terminal className="w-4 h-4 text-emerald-500" />
              Runtime Orchestration Logs
            </h3>
            <span className="text-[10px] font-bold text-emerald-500 font-mono">LIVE_STREAM_v4</span>
          </div>
          <div className="h-64 overflow-y-auto font-mono text-[10px] space-y-2 pr-2 scrollbar-thin scrollbar-thumb-slate-700">
            {(jobs ?? []).length > 0 ? (
              (jobs ?? []).find(j => j.status !== 'PRODUCTION')?.logs.map((log, i) => (
                <div key={i} className="flex gap-2 text-emerald-400/90 leading-relaxed">
                  <span className="text-slate-600 shrink-0">[{new Date().toLocaleTimeString()}]</span>
                  <span className="text-emerald-500 font-bold">›</span>
                  <span className="break-all">{log}</span>
                </div>
              ))
            ) : (
              <div className="text-slate-600 italic">Standing by for job initialization...</div>
            )}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
          <h3 className="text-xs font-black uppercase text-slate-800 tracking-wider border-b border-slate-100 pb-3 flex items-center gap-2">
            <Network className="w-4 h-4 text-blue-600" />
            Ecosystem Resource Allocation
          </h3>
          
          <div className="space-y-5">
            {[
              { name: "CPU Hypervisor Threads", value: 78, color: "bg-blue-600" },
              { name: "Sovereign Memory Pools", value: 42, color: "bg-indigo-600" },
              { name: "Ledger Settlement Bandwidth", value: 91, color: "bg-emerald-600" },
              { name: "Encrypted Data Channels", value: 55, color: "bg-purple-600" }
            ].map((stat, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between text-[10px] font-black text-slate-600 uppercase tracking-tight">
                  <span>{stat.name}</span>
                  <span className="text-slate-900">{stat.value}%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${stat.value}%` }}
                    className={`h-full rounded-full ${stat.color}`}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/60 flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-black text-slate-900 block">Orchestrator Health: 100%</span>
              <p className="text-[10px] text-slate-500 font-medium">System fully operational. All manufacturing nodes active.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
