
import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { 
  Plus, 
  Database, 
  Shield, 
  ChevronRight, 
  Cpu, 
  Activity,
  Globe,
  Settings,
  HardDrive
} from "lucide-react";
import { UEOSRuntimeClient } from "../../ueos/runtime/UEOSRuntimeClient";

export function PlatformInstanceRenderer({ onSelectInstance }: { onSelectInstance: (instance: any) => void }) {
  const [instances, setInstances] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadInstances() {
      try {
        const data = await UEOSRuntimeClient.fetchInstances();
        setInstances(data || []);
      } catch (err) {
        console.error("Instance loading failed", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadInstances();
  }, []);

  if (isLoading) {
    return <div className="animate-pulse grid grid-cols-1 md:grid-cols-2 gap-6">
      {[1, 2, 3, 4].map(i => <div key={i} className="h-48 bg-slate-200 rounded-3xl" />)}
    </div>;
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Platform Instances</h2>
          <p className="text-slate-500">Live operational deployments of enterprise platforms.</p>
        </div>
        <button className="bg-blue-600 text-white px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all">
          <Plus className="w-5 h-5" />
          Deploy New Instance
        </button>
      </div>

      {instances.length === 0 ? (
        <div className="bg-white border border-slate-100 rounded-3xl p-20 text-center">
          <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
            <Database className="w-10 h-10" />
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-2">No Live Instances</h3>
          <p className="text-slate-500 max-w-sm mx-auto">
            The instance registry is empty. Deploy an enterprise platform from an approved blueprint to see it here.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {instances.map((instance, i) => (
            <EnterprisePlatformCard 
              key={instance.id} 
              instance={instance} 
              i={i} 
              onSelect={() => onSelectInstance(instance)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function EnterprisePlatformCard({ instance, i, onSelect }: any) {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: i * 0.1 }}
      className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all group"
    >
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600">
            <HardDrive className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-bold text-slate-900 truncate">{instance.name}</h4>
              <span className="text-[10px] font-black bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full uppercase">
                Active
              </span>
            </div>
            <p className="text-xs text-slate-400 font-medium tracking-tight">ID: {instance.id} | {instance.ecosystemId}</p>
          </div>
        </div>
        <button className="p-2 hover:bg-slate-50 rounded-lg text-slate-400 transition-colors">
          <Settings className="w-5 h-5" />
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-slate-50 p-3 rounded-2xl">
          <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-tighter mb-1">Modules</span>
          <span className="text-sm font-black text-slate-700">{instance.modules?.length || 0}</span>
        </div>
        <div className="bg-slate-50 p-3 rounded-2xl">
          <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-tighter mb-1">Users</span>
          <span className="text-sm font-black text-slate-700">{instance.userCount || instance.users?.length || '0'}</span>
        </div>
        <div className="bg-slate-50 p-3 rounded-2xl">
          <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-tighter mb-1">Uptime</span>
          <span className="text-sm font-black text-slate-700">99.9%</span>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-slate-50">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-emerald-500" />
          <span className="text-xs font-bold text-slate-500">Latency: 24ms</span>
        </div>
        <button 
          onClick={onSelect}
          className="bg-slate-900 text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 hover:bg-slate-800 transition-all opacity-0 group-hover:opacity-100 shadow-lg shadow-slate-200"
        >
          Enter Platform
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
}
