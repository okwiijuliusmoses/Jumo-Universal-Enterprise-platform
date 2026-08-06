
import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { 
  Plus, 
  Terminal, 
  Cpu, 
  Shield, 
  Database, 
  AlertCircle,
  ChevronRight,
  Activity,
  Workflow,
  Globe
} from "lucide-react";
import { UEOSRuntimeClient } from "../../ueos/runtime/UEOSRuntimeClient";

export function KernelDashboard() {
  const [metrics, setMetrics] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadMetrics() {
      try {
        const data = await UEOSRuntimeClient.fetchDashboardMetrics();
        setMetrics(data);
      } catch (err) {
        console.error("Failed to load kernel metrics", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadMetrics();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Activity className="w-8 h-8 text-blue-500 animate-pulse" />
      </div>
    );
  }

  const statCards = [
    { label: "Active Institutions", value: metrics?.instances || 0, icon: Globe, color: "blue" },
    { label: "Ecosystems", value: metrics?.ecosystems || 0, icon: Shield, color: "emerald" },
    { label: "Templates", value: metrics?.templates || 0, icon: Activity, color: "violet" },
    { label: "Modules", value: metrics?.modulesCount || 0, icon: Cpu, color: "amber" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Kernel Control</h2>
          <p className="text-slate-500">Real-time enterprise orchestration and runtime telemetry.</p>
        </div>
        <button className="bg-white border border-slate-200 px-4 py-2 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors flex items-center gap-2 shadow-sm">
          <Terminal className="w-4 h-4" />
          Open Kernel CLI
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm"
          >
            <div className={`w-12 h-12 bg-${stat.color}-50 rounded-xl flex items-center justify-center text-${stat.color}-600 mb-4`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <div className="flex flex-col">
              <span className="text-3xl font-black text-slate-900 leading-tight">{stat.value}</span>
              <span className="text-sm font-bold text-slate-400 uppercase tracking-wider">{stat.label}</span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-50 flex items-center justify-between">
              <h3 className="font-bold text-slate-800">Recent Security & Audit Logs</h3>
              <button className="text-blue-600 text-xs font-bold hover:underline">View All</button>
            </div>
            <div className="divide-y divide-slate-50">
              {metrics?.recentAuditEvents?.map((log: any) => (
                <div key={log.id} className="p-4 flex items-center gap-4 hover:bg-slate-50 transition-colors">
                  <div className={`w-2 h-2 rounded-full ${log.status === 'success' ? 'bg-emerald-400' : 'bg-amber-400'}`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-slate-800 truncate">{log.details}</p>
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <span className="font-medium text-slate-500">{log.actor}</span>
                      <span>•</span>
                      <span>{new Date(log.timestamp).toLocaleTimeString()}</span>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-300" />
                </div>
              )) || (
                <div className="p-8 text-center text-slate-400 italic text-sm">
                  No security events recorded in the current session.
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Activity className="w-4 h-4 text-blue-500" />
              Runtime Telemetry
            </h3>
            <div className="space-y-4">
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-bold text-slate-500 uppercase tracking-wider">
                  <span>Workflows Active</span>
                  <span className="text-blue-600">{metrics?.workflowsCount || 0}</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: `${Math.min(100, (metrics?.workflowsCount || 0) * 20)}%` }} />
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-bold text-slate-500 uppercase tracking-wider">
                  <span>Forms Registered</span>
                  <span className="text-emerald-600">{metrics?.formsCount || 0}</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${Math.min(100, (metrics?.formsCount || 0) * 15)}%` }} />
                </div>
              </div>
              <div className="pt-4 grid grid-cols-2 gap-4">
                <div className="bg-slate-50 p-3 rounded-xl">
                  <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Active Nodes</span>
                  <span className="text-sm font-black text-slate-700">{metrics?.activeNodes || 0}</span>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl">
                  <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Uptime</span>
                  <span className="text-sm font-black text-slate-700 truncate">{Math.floor((metrics?.uptime || 0) / 60)}m</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-100 p-6 rounded-2xl">
             <div className="flex items-start gap-4 text-amber-800">
               <AlertCircle className="w-6 h-6 flex-shrink-0" />
               <div>
                 <h4 className="font-bold">System Directive</h4>
                 <p className="text-sm opacity-80 leading-relaxed mt-1">
                   All runtime modifications must be authorized via valid SecOps signature.
                 </p>
               </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
