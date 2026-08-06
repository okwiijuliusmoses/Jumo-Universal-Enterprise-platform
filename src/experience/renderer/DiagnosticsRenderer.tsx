
import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { 
  Activity, 
  Cpu, 
  Database, 
  Network, 
  Zap, 
  HardDrive,
  RefreshCw,
  Server,
  Cloud,
  CheckCircle2
} from "lucide-react";
import { UEOSRuntimeClient } from "../../ueos/runtime/UEOSRuntimeClient";

export function DiagnosticsRenderer() {
  const [metrics, setMetrics] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadDiagnostics() {
      try {
        const data = await UEOSRuntimeClient.fetchDashboardMetrics();
        setMetrics(data);
      } catch (err) {
        console.error("Diagnostics loading failed", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadDiagnostics();
  }, []);

  if (isLoading) {
    return <div className="flex items-center justify-center h-96">
      <RefreshCw className="w-8 h-8 text-blue-500 animate-spin" />
    </div>;
  }

  const systemMetrics = [
    { label: "Memory Usage", value: metrics?.systemHealth?.memoryUsage || "---", icon: HardDrive, color: "blue" },
    { label: "CPU Load", value: metrics?.systemHealth?.cpuUsage || "---", icon: Cpu, color: "violet" },
    { label: "Query Latency", value: metrics?.systemHealth?.queryLatencyMs || "---", icon: Zap, color: "amber" },
    { label: "Node Uptime", value: `${Math.floor((metrics?.uptime || 0) / 60)}m`, icon: Server, color: "emerald" }
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Kernel Diagnostics</h2>
          <p className="text-slate-500">Live telemetry and health status of the UEOS Runtime.</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-xl border border-emerald-100 text-sm font-bold">
           <CheckCircle2 className="w-4 h-4" />
           Kernel System: Healthy
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {systemMetrics.map((m) => (
          <div key={m.label} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
             <div className={`w-10 h-10 bg-${m.color}-50 rounded-xl flex items-center justify-center text-${m.color}-600 mb-4`}>
                <m.icon className="w-5 h-5" />
             </div>
             <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{m.label}</span>
             <span className="text-2xl font-black text-slate-800">{m.value}</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8">
            <h3 className="font-bold text-slate-800 mb-8 flex items-center gap-2">
              <Activity className="w-4 h-4 text-blue-500" />
              Runtime Telemetry Stream
            </h3>
            <div className="h-48 flex items-end gap-1 px-2 pb-2">
               {[...Array(40)].map((_, i) => (
                 <div 
                  key={i} 
                  className="flex-1 bg-blue-500 rounded-t-sm" 
                  style={{ height: `${20 + Math.random() * 80}%`, opacity: 0.1 + (i / 40) * 0.9 }} 
                 />
               ))}
            </div>
            <div className="flex justify-between mt-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
               <span>60 mins ago</span>
               <span>Now</span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-6">
             <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                <h4 className="font-bold text-slate-800 text-sm mb-4 flex items-center gap-2">
                   <Database className="w-4 h-4 text-emerald-500" />
                   Storage Profile
                </h4>
                <div className="space-y-4">
                   <div className="flex justify-between text-xs font-bold text-slate-500">
                      <span>Database Engine</span>
                      <span className="text-slate-800 uppercase">{metrics?.systemHealth?.databaseMode}</span>
                   </div>
                   <div className="flex justify-between text-xs font-bold text-slate-500">
                      <span>Postgres Sync</span>
                      <span className={metrics?.systemHealth?.postgresSynced ? "text-emerald-600" : "text-slate-400"}>
                        {metrics?.systemHealth?.postgresSynced ? "CONNECTED" : "OFFLINE"}
                      </span>
                   </div>
                </div>
             </div>
             <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                <h4 className="font-bold text-slate-800 text-sm mb-4 flex items-center gap-2">
                   <Network className="w-4 h-4 text-violet-500" />
                   Registry Integrity
                </h4>
                <div className="space-y-4">
                   <div className="flex justify-between text-xs font-bold text-slate-500">
                      <span>Active Objects</span>
                      <span className="text-slate-800">{(metrics?.templates || 0) + (metrics?.instances || 0) + (metrics?.modulesCount || 0)}</span>
                   </div>
                   <div className="flex justify-between text-xs font-bold text-slate-500">
                      <span>Last Heartbeat</span>
                      <span className="text-slate-800">Just Now</span>
                   </div>
                </div>
             </div>
          </div>
        </div>

        <div className="bg-slate-900 rounded-3xl p-8 text-white">
           <h3 className="font-bold text-white mb-6 flex items-center gap-2">
              <Cloud className="w-4 h-4 text-blue-400" />
              Distributed Node Status
           </h3>
           <div className="space-y-6">
              {(metrics?.distributedNodes || [
                { name: "Central Registry Node", status: "Primary", load: "12%" },
                { name: "Enterprise Edge Node (EU)", status: "Active", load: "8%" },
                { name: "Financial Ledger Sync", status: "Active", load: "4%" },
                { name: "Identity Bridge", status: "Active", load: "2%" }
              ]).map((node: any) => (
                <div key={node.name} className="flex flex-col gap-2">
                   <div className="flex items-center justify-between text-xs font-bold">
                      <span className="text-slate-300">{node.name}</span>
                      <span className="text-emerald-400">{node.status}</span>
                   </div>
                   <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500" style={{ width: node.load }} />
                   </div>
                </div>
              ))}
           </div>
           
           <div className="mt-12 p-6 bg-slate-800/50 rounded-2xl border border-slate-700/50">
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Diagnostic Commands</h4>
              <div className="space-y-2">
                 <button className="w-full text-left text-xs p-2 hover:bg-slate-700 rounded-lg transition-colors text-slate-300">
                    Run Memory Garbage Collection
                 </button>
                 <button className="w-full text-left text-xs p-2 hover:bg-slate-700 rounded-lg transition-colors text-slate-300">
                    Verify Registry Checksums
                 </button>
                 <button className="w-full text-left text-xs p-2 hover:bg-slate-700 rounded-lg transition-colors text-slate-300">
                    Sync Edge Node Local Cache
                 </button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
