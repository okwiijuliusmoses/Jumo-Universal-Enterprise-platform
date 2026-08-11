import React from 'react';
import { 
  Cloud, HardDrive, Network, Cpu, 
  Activity, Shield, Zap, Globe, 
  BarChart3, Settings2, Power, RefreshCw
} from 'lucide-react';
import { DeploymentSlot } from '../../../core/runtime/sovereignState';

interface CloudStudioProps {
  slots: DeploymentSlot[];
  onScale: (slotId: string, cpu: number, memory: number) => void;
  onTogglePower: (slotId: string) => void;
}

export const CloudStudio: React.FC<CloudStudioProps> = ({
  slots,
  onScale,
  onTogglePower
}) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white">
            <Cloud className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-black text-slate-900 tracking-tight uppercase">JUMO Cloud Studio</h2>
            <p className="text-xs text-slate-500 font-medium">Sovereign Infrastructure, Compute & Runtime Provisioning</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-lg text-[10px] font-black uppercase border border-emerald-100">
            <Globe className="w-3.5 h-3.5" />
            Global Node Network: ACTIVE
          </span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Nodes", value: (slots ?? []).length.toString(), icon: Globe, color: "text-blue-600" },
          { 
            label: "Compute Usage", 
            value: (slots.length > 0 ? Math.round(slots.reduce((acc, s) => acc + s.cpu, 0) / slots.length) : 0) + "%", 
            icon: Cpu, 
            color: "text-amber-600" 
          },
          { label: "Storage Allocated", value: (slots.length * 32) + "TB", icon: HardDrive, color: "text-emerald-600" },
          { label: "Network Throughput", value: (slots.filter(s => s.health === 'HEALTHY').length * 0.8).toFixed(1) + "GB/s", icon: Zap, color: "text-purple-600" },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4">
            <div className={`w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center ${stat.color}`}>
              <stat.icon className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">{stat.label}</span>
              <span className="text-lg font-black text-slate-900">{stat.value}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Infrastructure Panel */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="text-xs font-black uppercase text-slate-800 tracking-wider">Active Infrastructure Slots</h3>
              <button className="text-[10px] font-black text-blue-600 uppercase tracking-wider flex items-center gap-1 hover:text-blue-700">
                <RefreshCw className="w-3.5 h-3.5" />
                Refresh State
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {(slots ?? []).map((slot) => (
                <div key={slot.id} className="p-5 bg-slate-50 rounded-2xl border border-slate-200 hover:border-blue-300 transition-all space-y-5 group">
                  <div className="flex items-center justify-between border-b border-slate-200/60 pb-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-2.5 h-2.5 rounded-full ${slot.health === 'HEALTHY' ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
                      <span className="font-black text-sm text-slate-900 uppercase tracking-tight">{slot.name}</span>
                    </div>
                    <div className="flex gap-1.5">
                      <button 
                        onClick={() => onTogglePower(slot.id)}
                        className="p-1.5 bg-white border border-slate-200 rounded-lg text-slate-400 hover:text-rose-600 transition-all cursor-pointer"
                      >
                        <Power className="w-3.5 h-3.5" />
                      </button>
                      <button className="p-1.5 bg-white border border-slate-200 rounded-lg text-slate-400 hover:text-blue-600 transition-all cursor-pointer">
                        <Settings2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-[9px] font-black text-slate-400 uppercase">
                        <span>CPU Load</span>
                        <span className="text-slate-900">{slot.cpu}%</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-1">
                        <div className="bg-slate-900 h-full rounded-full transition-all duration-1000" style={{ width: `${slot.cpu}%` }} />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-[9px] font-black text-slate-400 uppercase">
                        <span>Memory</span>
                        <span className="text-slate-900">{slot.memory}%</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-1">
                        <div className="bg-slate-900 h-full rounded-full transition-all duration-1000" style={{ width: `${slot.memory}%` }} />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[10px] font-bold">
                    <div className="flex items-center gap-1.5 text-slate-500 uppercase">
                      <Zap className="w-3.5 h-3.5 fill-current" />
                      Active Release
                    </div>
                    <span className="text-blue-600 font-black">{slot.activeRelease}</span>
                  </div>

                  <div className="pt-2">
                    <button className="w-full py-2 bg-white border border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white rounded-xl text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer">
                      Direct Instance Control
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Diagnostic Panel */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
            <h3 className="text-xs font-black uppercase text-slate-800 tracking-wider">Node Diagnostics</h3>
            
            <div className="space-y-4">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black text-slate-400 uppercase">Latency Floor</span>
                  <span className="text-xs font-black text-emerald-600">12ms</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black text-slate-400 uppercase">Packet Integrity</span>
                  <span className="text-xs font-black text-emerald-600">100.00%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black text-slate-400 uppercase">Zero-Trust State</span>
                  <span className="text-xs font-black text-emerald-600">LOCKED</span>
                </div>
              </div>

              <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <h4 className="text-[10px] font-black uppercase text-amber-500 tracking-wider">Security Telemetry</h4>
                  <Shield className="w-3.5 h-3.5 text-amber-500" />
                </div>
                <div className="space-y-3 max-h-[200px] overflow-y-auto pr-1">
                  {[
                    "NODE-AUTH-SUCCESS: user-admin-01",
                    "TRAFFIC-FILTER: Dropped 4 invalid packets",
                    "ENCRYPTION-ROTATION: Keys cycled successfully",
                    "LOAD-BALANCER: Weight adjusted to 100%",
                    "MTLS-HANDSHAKE: SVR-01 -> CLD-CANARY"
                  ].map((log, i) => (
                    <div key={i} className="flex gap-2 text-[9px] font-mono text-slate-400">
                      <span className="text-slate-700 shrink-0 select-none">›</span>
                      <span className="break-all">{log}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-4 bg-blue-50 border border-blue-100 rounded-2xl flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shrink-0">
                <Activity className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="text-[10px] font-black text-blue-900 uppercase">Orchestration Contract</h4>
                <p className="text-[10px] text-blue-700/80 mt-1 leading-relaxed">
                  Autoscaling and failover policies are actively enforced by the Sovereign Infrastructure Agent.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
