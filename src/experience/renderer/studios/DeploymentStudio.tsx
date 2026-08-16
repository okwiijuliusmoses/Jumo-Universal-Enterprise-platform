import React from 'react';
import { motion } from 'motion/react';
import { 
  Cloud, Globe, Server, Network, Shield, HardDrive,
  Activity, CheckCircle2, AlertCircle, Terminal, 
  Settings, Sliders, ArrowRight, Zap, Database,
  Cpu, Key, ExternalLink
} from 'lucide-react';
import { DeploymentRecord } from '../../../core/factory/registry/HubRegistryTypes';
import { StudioLifecycleNavBar } from '../../components/StudioLifecycleNavBar';

interface DeploymentSlot {
  id: string;
  name: string;
  activeRelease: string;
  health: 'HEALTHY' | 'DEGRADED' | 'OFFLINE';
  cpu: number;
  memory: number;
  trafficWeight: number;
}

interface DeploymentStudioProps {
  records: DeploymentRecord[];
  slots: DeploymentSlot[];
  isDeploying: boolean;
  deploymentLogs: string[];
  onScaleSlot?: (slotId: string, cpu: number, memory: number) => void;
  onTogglePowerSlot?: (slotId: string) => void;
  onDeploySlot?: (slotId: string, jobId: string) => void;
  jobs?: any[];
}

export const DeploymentStudio: React.FC<DeploymentStudioProps> = ({
  records,
  slots,
  isDeploying,
  deploymentLogs,
  onScaleSlot,
  onTogglePowerSlot,
  onDeploySlot,
  jobs = []
}) => {
  const [selectedJobId, setSelectedJobId] = React.useState<string>("");

  const healthyJobs = (jobs ?? []).filter(j => j.status === 'RUNTIME_ACTIVE' || j.status === 'CERTIFYING' || j.status === 'DEPLOYING' || j.status === 'VERIFYING');
  return (
    <div className="space-y-6">
      <StudioLifecycleNavBar studioId="deployment" />
      {/* Header */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white">
            <Cloud className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-black text-slate-900 tracking-tight uppercase">Deployment Studio</h2>
            <p className="text-xs text-slate-500 font-medium">Sovereign Infrastructure & Zero-Trust Release Control Surface</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-full uppercase tracking-wider">
            {(slots ?? []).filter(s => s.health === 'HEALTHY').length} / {(slots ?? []).length} Nodes Healthy
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Infrastructure Nodes */}
        <div className="lg:col-span-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {(slots ?? []).map((slot) => (
              <div key={slot.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-5">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-blue-600">
                      <Server className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-black text-slate-900 uppercase tracking-tight">{slot.name}</h4>
                      <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">{slot.id}</span>
                    </div>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest border ${
                    slot.health === 'HEALTHY' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-rose-50 text-rose-700 border-rose-100'
                  }`}>
                    {slot.health}
                  </span>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-[9px] font-black text-slate-400 uppercase">
                        <span>CPU UTILIZATION</span>
                        <span>{slot.cpu}%</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-1 overflow-hidden">
                        <div className="bg-blue-600 h-full transition-all duration-1000" style={{ width: `${slot.cpu}%` }} />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-[9px] font-black text-slate-400 uppercase">
                        <span>MEMORY UTILIZATION</span>
                        <span>{slot.memory}%</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-1 overflow-hidden">
                        <div className="bg-indigo-600 h-full transition-all duration-1000" style={{ width: `${slot.memory}%` }} />
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/60 flex items-center justify-between">
                    <div>
                      <span className="text-[9px] font-black text-slate-400 uppercase block">Active Release</span>
                      <span className="text-[10px] font-bold text-slate-800 font-mono">{slot.activeRelease}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[9px] font-black text-slate-400 uppercase block">Traffic Weight</span>
                      <span className="text-[10px] font-bold text-slate-800">{slot.trafficWeight}%</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                  <button 
                    onClick={() => onTogglePowerSlot?.(slot.id)}
                    className={`p-1.5 rounded-lg transition-all cursor-pointer ${slot.health === 'OFFLINE' ? 'text-emerald-600 bg-emerald-50' : 'text-rose-600 bg-rose-50'}`}
                    title={slot.health === 'OFFLINE' ? "Power ON" : "Power OFF"}
                  >
                    <Zap className="w-3.5 h-3.5" />
                  </button>
                  <button 
                    onClick={() => onScaleSlot?.(slot.id, Math.min(100, slot.cpu + 10), Math.min(100, slot.memory + 10))}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-all cursor-pointer"
                    title="Scale Up (+10%)"
                  >
                    <Sliders className="w-3.5 h-3.5" />
                  </button>
                  
                  <div className="flex-1 flex items-center gap-2 ml-4">
                    <select 
                      value={selectedJobId}
                      onChange={(e) => setSelectedJobId(e.target.value)}
                      className="bg-slate-50 border border-slate-200 text-slate-700 rounded-lg px-2 py-1 text-[9px] font-bold outline-hidden flex-1"
                    >
                      <option value="">Select Release...</option>
                      {healthyJobs.map(j => (
                        <option key={j.id} value={j.id}>{j.title} (v{j.version})</option>
                      ))}
                    </select>
                    <button 
                      disabled={isDeploying || !selectedJobId}
                      onClick={() => onDeploySlot?.(slot.id, selectedJobId)}
                      className="px-3 py-1.5 bg-slate-900 disabled:bg-slate-300 text-white rounded-lg text-[9px] font-black uppercase tracking-wider hover:bg-blue-600 transition-all cursor-pointer"
                    >
                      {isDeploying ? 'Deploying...' : 'Deploy'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-xs font-black uppercase text-slate-800 tracking-wider">Deployment History</h3>
            <div className="space-y-3">
              {(records ?? []).slice(0, 5).map((record) => (
                <div key={record.deploymentId} className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl border border-slate-200/80">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-emerald-600">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] font-black text-slate-900 uppercase block leading-tight">{record.deploymentId}</span>
                      <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">{record.environment} • {record.target}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[9px] font-bold text-slate-400 uppercase block">{new Date(record.timestamp).toLocaleDateString()}</span>
                    <span className="text-[9px] font-black text-emerald-600 uppercase">SUCCESS</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Deployment Console */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 shadow-xl space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-xs font-black uppercase text-slate-400 tracking-wider flex items-center gap-2">
                <Terminal className="w-4 h-4 text-emerald-500" />
                Zero-Trust Deployment Stream
              </h3>
              {isDeploying && <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />}
            </div>
            <div className="h-[500px] overflow-y-auto font-mono text-[10px] space-y-2.5 pr-2 scrollbar-thin scrollbar-thumb-slate-800">
              {(deploymentLogs ?? []).map((log, i) => (
                <div key={i} className="flex gap-2 text-emerald-400/90 leading-relaxed">
                  <span className="text-slate-700 shrink-0 select-none">›</span>
                  <span className="break-all">{log}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-xs font-black uppercase text-slate-800 tracking-wider">Release Integrity Gate</h3>
            <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 space-y-3">
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-emerald-600" />
                <span className="text-[10px] font-black text-emerald-900 uppercase">Cryptographic Release Lock ACTIVE</span>
              </div>
              <p className="text-[10px] text-emerald-700 leading-relaxed font-semibold">Only artifacts signed with JUMO-UEOS-AUTH-v4 keys can be promoted to regional production nodes.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
