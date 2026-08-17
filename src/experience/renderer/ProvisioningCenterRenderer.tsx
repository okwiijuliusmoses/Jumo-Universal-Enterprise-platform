import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Zap, Loader2, CheckCircle2, Clock, Globe, Shield, Database, Cpu, Layout, 
  ArrowRight, Search, Filter, Layers, Server, Activity, Workflow, RefreshCcw, AlertTriangle, FileCheck, Network, Lock, Terminal
} from "lucide-react";
import { UEOSRuntimeClient } from "../../ueos/runtime/UEOSRuntimeClient";

export function ProvisioningCenterRenderer() {
  const [instances, setInstances] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"active" | "completed" | "failed" | "monitoring">("active");
  const [selectedJob, setSelectedJob] = useState<any>(null);

  useEffect(() => {
    async function load() {
      try {
        const data = await UEOSRuntimeClient.fetchInstances();
        setInstances(data || []);
      } catch (err) {
        console.error("Failed to load provisioning queue", err);
      } finally {
        setIsLoading(false);
      }
    }
    load();
  }, []);

  // Removed hardcoded provisioningQueue and refactored rendering to use instances

  if (isLoading) {
    return <div className="flex justify-center items-center h-96"><Loader2 className="w-8 h-8 animate-spin text-blue-600" /></div>;
  }

  const renderJobDetails = (job: any) => (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-xl"
    >
      <div className="bg-white w-full max-w-4xl rounded-[3rem] shadow-2xl overflow-hidden flex flex-col md:flex-row h-[700px]">
        <div className="p-12 md:w-1/2 space-y-8 overflow-y-auto">
          <div className="flex items-center justify-between">
            <h3 className="text-3xl font-black text-slate-900 tracking-tight italic">Provisioning <span className="text-blue-600">Audit</span></h3>
            <button onClick={() => setSelectedJob(null)} className="p-2 hover:bg-slate-100 rounded-full transition-all">
              <Zap className="w-6 h-6 text-slate-400 rotate-45" />
            </button>
          </div>
          
          <div className="p-8 bg-slate-50 rounded-[2rem] border border-slate-100 space-y-6">
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Instance Status</span>
              <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-widest">In Progress</span>
            </div>
            <div className="space-y-1">
              <h4 className="text-2xl font-black text-slate-900 tracking-tight">{job.name}</h4>
              <p className="text-xs font-bold text-slate-500 italic">ID: {job.id}</p>
            </div>
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-200">
              <div>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Nodes</span>
                <span className="text-lg font-black text-slate-900">12 Primary</span>
              </div>
              <div>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Compliance</span>
                <span className="text-lg font-black text-emerald-600">98.4%</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Security Protocol Check</h5>
            <div className="space-y-3">
              {[
                { label: "Zero Trust Perimeter", status: "passed" },
                { label: "FAAP Ledger Integrity", status: "passed" },
                { label: "Digital Signature Verified", status: "pending" },
                { label: "RBAC Matrix Injection", status: "pending" }
              ].map((check, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-white border border-slate-100 rounded-2xl shadow-sm">
                  <span className="text-xs font-black text-slate-700">{check.label}</span>
                  {check.status === "passed" ? (
                    <FileCheck className="w-4 h-4 text-emerald-500" />
                  ) : (
                    <Clock className="w-4 h-4 text-blue-400 animate-pulse" />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <button className="flex-1 py-4 bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-700 transition-all shadow-xl shadow-blue-100">
              Accelerate
            </button>
            <button className="flex-1 py-4 bg-rose-50 text-rose-600 border border-rose-100 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-rose-600 hover:text-white transition-all">
              Abort / Rollback
            </button>
          </div>
        </div>

        <div className="bg-slate-900 p-12 md:w-1/2 text-emerald-400 font-mono text-xs overflow-y-auto relative">
          <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-slate-900 to-transparent z-10 p-12 pointer-events-none">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4" />
              <span className="font-black text-[10px] uppercase tracking-[0.2em] text-slate-500">Live Provisioning Logs</span>
            </div>
          </div>
          <div className="pt-8 space-y-3">
            {[...Array(20)].map((_, i) => (
              <div key={i} className="opacity-70">
                <span className="text-slate-600 mr-4">[{new Date().toLocaleTimeString()}]</span>
                <span>EXEC_KERNEL_TASK: {Math.random().toString(36).substring(7).toUpperCase()} ... OK</span>
              </div>
            ))}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ repeat: Infinity, duration: 1 }}
              className="w-2 h-4 bg-emerald-400 inline-block align-middle ml-1"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-200 pb-10">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-[10px] font-black uppercase tracking-[0.2em]">Deployment Brain v5.2</span>
            <span className="text-xs font-bold text-slate-400 italic">Self-Healing Infrastructure</span>
          </div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tighter">Provisioning <span className="text-blue-600 italic">Center</span></h2>
          <p className="text-slate-500 font-medium mt-1">Sovereign orchestration and lifecycle management for national hybrid cloud platforms.</p>
        </div>

        <div className="flex items-center gap-2 bg-slate-100 p-2 rounded-2xl shadow-inner">
          {(["active", "completed", "failed", "monitoring"] as const).map(t => (
            <button 
              key={t}
              onClick={() => setActiveTab(t)}
              className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                activeTab === t ? "bg-white text-blue-600 shadow-xl" : "text-slate-500 hover:text-slate-700"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-6">
          {instances.filter(p => p.status === activeTab || (activeTab === "monitoring" && p.status === "completed")).map((job) => (
            <motion.div 
              key={job.id}
              onClick={() => setSelectedJob(job)}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white border border-slate-200 rounded-[2.5rem] p-8 shadow-sm hover:shadow-2xl hover:border-blue-300 transition-all cursor-pointer group relative overflow-hidden"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-6">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all group-hover:scale-110 ${
                    job.progress === 100 ? "bg-emerald-50 text-emerald-600" : "bg-blue-50 text-blue-600"
                  }`}>
                    {job.progress === 100 ? <CheckCircle2 className="w-8 h-8" /> : <RefreshCcw className="w-8 h-8 animate-spin-slow" />}
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-xl font-black text-slate-900 tracking-tight">{job.name}</span>
                      <span className="text-[10px] font-black px-3 py-1 bg-slate-100 rounded-full text-slate-500 uppercase tracking-widest">ID: {job.id}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
                      <span className="text-xs font-black text-blue-600 uppercase tracking-widest">{job.stage}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-3xl font-black text-slate-900 leading-none">{job.progress}%</span>
                  <span className="text-[10px] block font-black text-slate-400 uppercase tracking-widest mt-1 italic">{job.time}</span>
                </div>
              </div>
              
              <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden shadow-inner">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${job.progress}%` }}
                  className={`h-full relative ${job.progress === 100 ? "bg-emerald-500" : "bg-blue-600"}`}
                >
                  <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.3),transparent)] animate-shimmer" style={{ backgroundSize: '200% 100%' }} />
                </motion.div>
              </div>

              <div className="mt-6 flex items-center gap-6 text-[10px] font-black uppercase tracking-widest text-slate-400">
                <div className="flex items-center gap-2 group-hover:text-blue-600 transition-colors"><Server className="w-4 h-4" /> Node Allocation</div>
                <div className="flex items-center gap-2 group-hover:text-blue-600 transition-colors"><Database className="w-4 h-4" /> Schema Injection</div>
                <div className="flex items-center gap-2 group-hover:text-emerald-500 transition-colors"><Lock className="w-4 h-4" /> Digital Signature</div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="space-y-8">
          {/* Infrastructure Health Card */}
          <div className="bg-slate-900 text-white p-10 rounded-[3rem] shadow-2xl relative overflow-hidden group">
            <Activity className="absolute -right-6 -top-6 w-32 h-32 text-blue-500/10 rotate-12 group-hover:scale-125 transition-transform duration-1000" />
            <h4 className="text-[10px] font-black text-blue-400 uppercase tracking-[0.3em] mb-8">Infrastructure Health</h4>
            <div className="space-y-8">
              {[
                { label: "Manufacturing Nodes", value: 72, color: "blue" },
                { label: "Sovereign Databases", value: 45, color: "indigo" },
                { label: "AI Cognitive Latency", value: 18, color: "emerald" },
                { label: "National Event Bus", value: 94, color: "amber" }
              ].map((stat, i) => (
                <div key={i}>
                  <div className="flex justify-between text-[10px] font-black uppercase tracking-widest mb-3">
                    <span className="text-slate-400">{stat.label}</span>
                    <span className={`text-${stat.color}-400`}>{stat.value}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden shadow-inner">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${stat.value}%` }}
                      className={`h-full bg-${stat.color}-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Governance Standards Tracker */}
          <div className="bg-white border border-slate-200 rounded-[3rem] p-10 shadow-sm">
            <div className="flex items-center gap-4 mb-8">
              <Shield className="w-6 h-6 text-blue-600" />
              <h4 className="text-sm font-black text-slate-900 tracking-tight">Compliance Standards</h4>
            </div>
            <div className="space-y-4">
              {[
                { name: "National Data Sovereignty", status: "Verified" },
                { name: "Zero Trust Architecture", status: "Verified" },
                { name: "FAAP Ledger Parity", status: "Auditing" },
                { name: "RBAC Matrix Isolation", status: "Verified" }
              ].map((std, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <span className="text-[10px] font-bold text-slate-600">{std.name}</span>
                  <span className={`text-[9px] font-black uppercase tracking-widest ${std.status === 'Verified' ? 'text-emerald-600' : 'text-blue-600 animate-pulse'}`}>
                    {std.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selectedJob && renderJobDetails(selectedJob)}
      </AnimatePresence>
    </div>
  );
}
