import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Server, Cloud, Database, Activity, Globe, 
  Terminal, Shield, Zap, Search, RefreshCw,
  Box, CheckCircle2, AlertCircle, Play, Pause,
  HardDrive, Network, Key, Cpu, BarChart4, History as HistoryIcon
} from 'lucide-react';

interface OperationsStudioProps {
  deploymentRecords: any[];
  cloudSlots: any[];
}

export const RuntimeOperationsStudio: React.FC<OperationsStudioProps> = ({
  deploymentRecords = [],
  cloudSlots = []
}) => {
  const [activeTab, setActiveTab] = useState<'deployment' | 'infrastructure' | 'telemetry'>('deployment');

  return (
    <div className="flex flex-col h-full space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg">
            <Server size={24} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">Runtime Operations Studio</h2>
            <p className="text-sm text-slate-500 font-medium">Authoritative Provisioning, Deployment & Live Telemetry</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2 p-1 bg-slate-100 rounded-lg">
          {(['deployment', 'infrastructure', 'telemetry'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-md transition-all ${
                activeTab === tab 
                ? 'bg-white text-slate-900 shadow-sm' 
                : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        <AnimatePresence mode="wait">
          {activeTab === 'deployment' && (
            <motion.div
              key="deployment"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-6"
            >
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
                   <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
                     <Cloud size={18} className="text-blue-600" />
                     Sovereign Deployment Slots
                   </h3>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     {cloudSlots.length > 0 ? cloudSlots.map(slot => (
                        <SlotCard key={slot.id} slot={slot} />
                     )) : (
                        <>
                          <SlotCard slot={{ id: 'SLOT-01', name: 'Production Node 01', activeRelease: 'v2026.04.B', health: 'HEALTHY', cpu: 12, memory: 45, trafficWeight: 100 }} />
                          <SlotCard slot={{ id: 'SLOT-02', name: 'Production Node 02', activeRelease: 'v2026.04.B', health: 'HEALTHY', cpu: 8, memory: 38, trafficWeight: 0 }} />
                          <SlotCard slot={{ id: 'SLOT-03', name: 'Staging Node', activeRelease: 'v2026.05.A-RC', health: 'HEALTHY', cpu: 4, memory: 12, trafficWeight: 0 }} />
                        </>
                     )}
                   </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
                   <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                     <HistoryIcon size={18} className="text-slate-400" />
                     Deployment History
                   </h3>
                   <div className="space-y-3">
                      {deploymentRecords.length > 0 ? deploymentRecords.map(record => (
                        <div key={record.id} className="p-3 bg-slate-50 rounded-xl flex items-center justify-between border border-slate-100">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-emerald-100 text-emerald-600 rounded flex items-center justify-center">
                              <CheckCircle2 size={16} />
                            </div>
                            <div>
                              <div className="text-xs font-bold text-slate-900">{record.environment} Release</div>
                              <div className="text-[10px] text-slate-500">{record.timestamp}</div>
                            </div>
                          </div>
                          <div className="text-[10px] font-mono text-slate-400">{record.id}</div>
                        </div>
                      )) : (
                        <div className="text-center py-8 text-slate-400 text-xs font-medium italic">
                          No recent deployment records found.
                        </div>
                      )}
                   </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl text-white">
                  <h3 className="font-bold mb-6 flex items-center gap-2">
                    <Activity size={18} className="text-emerald-400" />
                    Global Runtime Health
                  </h3>
                  <div className="space-y-6">
                    <Metric label="Uptime" value="99.999%" trend="Last 30 days" color="text-emerald-400" />
                    <Metric label="Active Users" value="12,480" trend="+5.2% session growth" color="text-blue-400" />
                    <Metric label="Latency (Avg)" value="42ms" trend="Optimal" color="text-emerald-400" />
                    <Metric label="Error Rate" value="0.002%" trend="Stable" color="text-emerald-400" />
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
                   <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                     <Shield size={18} className="text-slate-400" />
                     VPC Topology
                   </h3>
                   <div className="p-4 bg-slate-50 rounded-xl space-y-4">
                      <div className="flex items-center gap-3 text-xs font-bold text-slate-600">
                         <Network size={16} className="text-blue-500" />
                         JUMO-SOVEREIGN-NET-01
                      </div>
                      <div className="space-y-2">
                         <div className="text-[10px] text-slate-400 font-bold uppercase">Subnets</div>
                         <div className="flex flex-wrap gap-2">
                            <span className="px-2 py-1 bg-white border border-slate-200 rounded text-[9px] font-bold text-slate-600">Public-Ingress</span>
                            <span className="px-2 py-1 bg-white border border-slate-200 rounded text-[9px] font-bold text-slate-600">App-Service</span>
                            <span className="px-2 py-1 bg-white border border-slate-200 rounded text-[9px] font-bold text-slate-600">Database-Tier</span>
                         </div>
                      </div>
                   </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'telemetry' && (
            <motion.div
              key="telemetry"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col h-[600px]"
            >
               <div className="flex items-center justify-between mb-8">
                  <h3 className="font-bold text-slate-900 text-lg">Real-time Performance Metrics</h3>
                  <div className="flex gap-2">
                     <button className="px-3 py-1.5 bg-slate-100 text-slate-900 text-xs font-bold rounded-lg">1h</button>
                     <button className="px-3 py-1.5 text-slate-500 text-xs font-bold hover:bg-slate-50 rounded-lg">24h</button>
                     <button className="px-3 py-1.5 text-slate-500 text-xs font-bold hover:bg-slate-50 rounded-lg">7d</button>
                  </div>
               </div>
               
               <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="border border-slate-100 rounded-2xl p-6 bg-slate-50/50 flex flex-col">
                     <div className="flex justify-between items-center mb-4">
                        <span className="text-xs font-black uppercase text-slate-400">Request Throughput</span>
                        <BarChart4 size={16} className="text-blue-500" />
                     </div>
                     <div className="flex-1 flex items-end gap-1 pb-4">
                        {[40, 65, 45, 90, 75, 55, 80, 60, 45, 70, 85, 95, 65, 50, 40, 30, 55, 75, 80, 60].map((h, i) => (
                          <div key={i} className="flex-1 bg-blue-500 rounded-t-[2px]" style={{ height: `${h}%` }}></div>
                        ))}
                     </div>
                  </div>
                  
                  <div className="border border-slate-100 rounded-2xl p-6 bg-slate-50/50 flex flex-col">
                     <div className="flex justify-between items-center mb-4">
                        <span className="text-xs font-black uppercase text-slate-400">Memory Utilization</span>
                        <Activity size={16} className="text-indigo-500" />
                     </div>
                     <div className="flex-1 flex items-end gap-1 pb-4">
                        {[60, 58, 62, 65, 63, 64, 66, 68, 67, 65, 64, 63, 65, 67, 68, 69, 70, 68, 65, 64].map((h, i) => (
                          <div key={i} className="flex-1 bg-indigo-500 rounded-t-[2px]" style={{ height: `${h}%` }}></div>
                        ))}
                     </div>
                  </div>
               </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const SlotCard = ({ slot }: { slot: any }) => (
  <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100 hover:border-slate-200 transition-all group">
    <div className="flex justify-between items-start mb-4">
      <div className="flex items-center gap-3">
        <div className={`w-3 h-3 rounded-full ${slot.health === 'HEALTHY' ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'} shadow-[0_0_8px_rgba(16,185,129,0.5)]`}></div>
        <div className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{slot.name}</div>
      </div>
      <div className="text-[10px] font-mono text-slate-400 bg-white px-2 py-0.5 rounded border border-slate-200">
        {slot.id}
      </div>
    </div>
    
    <div className="mb-4">
       <div className="text-[10px] font-black uppercase text-slate-400 mb-1">Active Release</div>
       <div className="text-xs font-black text-slate-700">{slot.activeRelease}</div>
    </div>
    
    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-200">
       <div className="space-y-1">
          <div className="flex justify-between text-[9px] font-black uppercase text-slate-400">
             <span>CPU</span>
             <span className="text-slate-700">{slot.cpu}%</span>
          </div>
          <div className="h-1 w-full bg-slate-200 rounded-full overflow-hidden">
             <div className="h-full bg-blue-500" style={{ width: `${slot.cpu}%` }}></div>
          </div>
       </div>
       <div className="space-y-1">
          <div className="flex justify-between text-[9px] font-black uppercase text-slate-400">
             <span>MEM</span>
             <span className="text-slate-700">{slot.memory}%</span>
          </div>
          <div className="h-1 w-full bg-slate-200 rounded-full overflow-hidden">
             <div className="h-full bg-indigo-500" style={{ width: `${slot.memory}%` }}></div>
          </div>
       </div>
    </div>
  </div>
);

const Metric = ({ label, value, trend, color }: { label: string, value: string, trend: string, color: string }) => (
  <div className="flex justify-between items-center">
    <div className="space-y-0.5">
      <div className="text-[10px] font-black uppercase tracking-widest text-slate-500">{label}</div>
      <div className={`text-xl font-black ${color}`}>{value}</div>
    </div>
    <div className="text-[10px] font-bold text-slate-400 text-right">
       {trend}
    </div>
  </div>
);
