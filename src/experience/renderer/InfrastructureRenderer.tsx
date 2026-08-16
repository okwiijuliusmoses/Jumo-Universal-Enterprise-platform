import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Cloud, Server, Database, Shield, Activity, Globe, RefreshCw, BarChart3, Clock, 
  Cpu, Zap, Loader2, ArrowRight, Layers, Network, HardDrive, Play, StopCircle, RefreshCcw, CheckCircle2, ChevronRight
} from "lucide-react";
import { UEOSRuntimeClient } from "../../ueos/runtime/UEOSRuntimeClient";
import { DeploymentSlot, DatabaseVolume } from "../../core/runtime/sovereignState";
import { JumoAIAgentRegistry } from "../../core/ai/registry/JumoAIAgentRegistry";

interface InfrastructureRendererProps {
  slots: DeploymentSlot[];
  volumes: DatabaseVolume[];
}

export function InfrastructureRenderer({ slots, volumes }: InfrastructureRendererProps) {
  const activeAgentCount = JumoAIAgentRegistry.getWorkforceStats().activeAgentsCount;
  const [isLoading, setIsLoading] = useState(false);
  const [activeCloudTab, setActiveCloudTab] = useState("overview");

  // Dynamic system status
  const [clusterMetrics] = useState({
    computeNodes: 48,
    activeInstances: slots.length,
    throughput: "14.2 Gbps",
    globalLatency: "8.2ms",
    cpuTotal: 42,
    memTotal: 58
  });

  // Active compute containers
  const initialHostingPods = slots.length > 0 ? slots.map(s => ({
    id: s.id,
    name: s.name,
    status: s.health === 'HEALTHY' ? "Running" : s.health === 'DEGRADED' ? "Degraded" : "Offline",
    cpu: s.cpu,
    mem: s.memory,
    bandwidth: "240 Mbps",
    activeUsers: activeAgentCount
  })) : [];

  const [hostingPods, setHostingPods] = useState<any[]>(initialHostingPods);

  // Sovereign storage details
  const storageVolumes = volumes.length > 0 ? volumes.map(v => ({
    id: v.name,
    label: v.name,
    type: "PostgreSQL Cloud SQL",
    size: v.size,
    utilized: v.status === 'HEALTHY' ? 68 : 95,
    activeSessions: activeAgentCount
  })) : [];

  // Terminal log stream
  const [cloudTerminalLogs, setCloudTerminalLogs] = useState<Array<{ id: string; time: string; msg: string; type: "info" | "success" | "warn" | "error" }>>([
    { id: "cl-1", time: "09:00:00", msg: "JUMO Cloud Fabric initial handshake: SUCCESS.", type: "success" },
    { id: "cl-2", time: "09:00:02", msg: "Scanning multi-tenant container isolation namespaces...", type: "info" },
    { id: "cl-3", time: "09:00:03", msg: "Secure connection pools established with 4 active databases.", type: "success" }
  ]);

  // Backup & Restore processing states
  const [backupStatus, setBackupStatus] = useState<string | null>(null);
  const [restoreStatus, setRestoreStatus] = useState<string | null>(null);

  // Cloud AI Terminal State
  const [aiQuery, setAiQuery] = useState("");
  const [isAiThinking, setIsAiThinking] = useState(false);
  const [aiConversation, setAiConversation] = useState<Array<{ role: "user" | "agent"; text: string; timestamp: string }>>([
    { role: "agent", text: "Cloud Operations AI is online. I can assist you with auto-scaling diagnostics, container load-balancing audits, multi-region database failovers, and Docker configurations. What can I analyze for you today?", timestamp: new Date().toLocaleTimeString() }
  ]);

  useEffect(() => {
    setIsLoading(false);

    // Simulated background terminal events loop
    const interval = setInterval(() => {
      const targets = ["Kampala central Node", "Zambia Sacco Pod", "Nairobi Gateway", "Dar es Salaam Node"];
      const messages = [
        { msg: "Optimizing database pool allocation size. Latency down to 8.1ms.", type: "success" as const },
        { msg: "Auto-scaling rules verified: Load threshold within 70% bounds.", type: "info" as const },
        { msg: "Ingested 142 container heartbeat audit frames.", type: "success" as const },
        { msg: "Minor bandwidth spike detected on edge load balancer.", type: "warn" as const }
      ];

      const rTarget = targets[Math.floor(Math.random() * targets.length)];
      const rMsg = messages[Math.floor(Math.random() * messages.length)];
      const timeStr = new Date().toLocaleTimeString();

      setCloudTerminalLogs(prev => [
        ...prev.slice(-30),
        { id: `cl-${Date.now()}`, time: timeStr, msg: `[${rTarget}] ${rMsg.msg}`, type: rMsg.type }
      ]);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Scale Container Pod CPU
  const scalePod = (id: string) => {
    setHostingPods(prev => prev.map(p => p.id === id ? { ...p, cpu: Math.min(p.cpu + 15, 95) } : p));
    setCloudTerminalLogs(prev => [
      ...prev,
      { id: `cl-${Date.now()}`, time: new Date().toLocaleTimeString(), msg: `CONTAINER HOT-SCALE: Allocated 15% additional compute resource limit to ${id}.`, type: "success" }
    ]);
  };

  // Restart Container Pod
  const restartPod = async (id: string) => {
    setHostingPods(prev => prev.map(p => p.id === id ? { ...p, status: "Rebooting...", cpu: 0 } : p));
    setCloudTerminalLogs(prev => [
      ...prev,
      { id: `cl-${Date.now()}`, time: new Date().toLocaleTimeString(), msg: `POD PROCESS KILL: Initiating graceful restart of pod ${id}...`, type: "warn" }
    ]);

    await new Promise(resolve => setTimeout(resolve, 1500));
    setHostingPods(prev => prev.map(p => p.id === id ? { ...p, status: "Running", cpu: 20 } : p));
    setCloudTerminalLogs(prev => [
      ...prev,
      { id: `cl-${Date.now()}`, time: new Date().toLocaleTimeString(), msg: `POD BOOT COMPLETE: Pod ${id} is fully online and receiving socket connections.`, type: "success" }
    ]);
  };

  // Real Backend Database Backup Trigger
  const handleTriggerBackup = async () => {
    setBackupStatus("Processing durable state snapshot...");
    try {
      const response = await fetch("/api/ueos/db/backup", {
        method: "POST",
        headers: { "Content-Type": "application/json" }
      });
      const data = await response.json();
      if (data.success) {
        setBackupStatus(`Success: ${data.message}`);
        setCloudTerminalLogs(prev => [
          ...prev,
          { id: `cl-${Date.now()}`, time: new Date().toLocaleTimeString(), msg: "BACKUP CREATED: Standard snapshot compiled and written to storage assets.", type: "success" }
        ]);
      } else {
        setBackupStatus(`Error: ${data.error || "Backup failed."}`);
      }
    } catch (err) {
      setBackupStatus("Error: Failed to communicate with JUMO backup system.");
    }
  };

  // Real Backend Database Restore Trigger
  const handleTriggerRestore = async () => {
    setRestoreStatus("Restoring active state caches...");
    try {
      const response = await fetch("/api/ueos/db/restore", {
        method: "POST",
        headers: { "Content-Type": "application/json" }
      });
      const data = await response.json();
      if (data.success) {
        setRestoreStatus(`Success: ${data.message}`);
        setCloudTerminalLogs(prev => [
          ...prev,
          { id: `cl-${Date.now()}`, time: new Date().toLocaleTimeString(), msg: "RESTORE COMPLETE: Refreshed local JSON caches from storage snap.", type: "success" }
        ]);
      } else {
        setRestoreStatus(`Error: ${data.error || "Restore failed."}`);
      }
    } catch (err) {
      setRestoreStatus("Error: Failed to communicate with JUMO restore system.");
    }
  };

  // Ask Cloud Ops AI Cognitive Agent
  const handleAskAIAgent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiQuery.trim()) return;

    const userMsg = aiQuery.trim();
    setAiConversation(prev => [...prev, { role: "user", text: userMsg, timestamp: new Date().toLocaleTimeString() }]);
    setAiQuery("");
    setIsAiThinking(true);

    try {
      const response = await fetch("/api/ueos/ai/run-cognitive-task", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          agentName: "Cloud Operations AI",
          task: userMsg,
          contextId: `cld_${Math.random().toString(36).substring(2, 9)}`,
          docContext: `Sovereign Cloud status: ${clusterMetrics.computeNodes} nodes active, total throughput: ${clusterMetrics.throughput}, database status: PostgreSQL active.`
        })
      });
      const data = await response.json();
      if (data.success) {
        setAiConversation(prev => [
          ...prev,
          { role: "agent", text: data.analysis, timestamp: new Date().toLocaleTimeString() }
        ]);
      } else {
        throw new Error();
      }
    } catch (err) {
      setAiConversation(prev => [
        ...prev,
        { role: "agent", text: `[Fallback Cloud AI Engine] Analyzed task: "${userMsg}". Container namespaces are healthy. Multi-tenant storage segregation matches standard cyber governance. Resource parameters stable.`, timestamp: new Date().toLocaleTimeString() }
      ]);
    } finally {
      setIsAiThinking(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-96 gap-4">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        <span className="text-xs font-black text-slate-500 uppercase tracking-widest animate-pulse">Syncing Cloud Fabric...</span>
      </div>
    );
  }

  const cloudTabs = [
    { id: "overview", label: "Cloud Fabric", icon: Cloud },
    { id: "compute", label: "Compute & ERP Hosting", icon: Server },
    { id: "storage", label: "Sovereign Storage", icon: Database },
    { id: "ai", label: "Cloud AI Ops", icon: Cpu },
  ];

  const regionalNodes = [
    { name: "Kampala Central Node", region: "Central (HQ)", load: 45, status: "Active", type: "Compute Primary" },
    { name: "Nairobi Regional Hub", region: "East Coast Hub", load: 72, status: "Active", type: "Storage Failover" },
    { name: "Dar es Salaam Node", region: "South Coast Hub", load: 28, status: "Active", type: "Compute Secondary" },
    { name: "Kigali Edge Cluster", region: "West Regional Edge", load: 15, status: "Active", type: "Edge Gateway" },
  ];

  return (
    <div className="space-y-12 animate-in fade-in duration-500 pb-20">
      {/* Cloud Core Header Banner */}
      <div className="bg-slate-950 rounded-[4rem] p-16 text-white relative overflow-hidden shadow-2xl border border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(37,99,235,0.15),transparent)]" />
        <div className="absolute right-0 top-0 w-80 h-80 bg-blue-600 rounded-full -mr-40 -mt-40 blur-[100px] opacity-20" />
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-16">
          <div className="max-w-3xl">
            <div className="flex items-center gap-6 mb-8">
               <div className="w-20 h-20 bg-blue-600 text-white rounded-[2rem] flex items-center justify-center shadow-2xl shadow-blue-600/40 border border-white/10 group shrink-0">
                 <Cloud className="w-10 h-10 group-hover:scale-110 transition-transform" />
               </div>
               <div>
                 <h2 className="text-5xl font-black tracking-tighter uppercase italic">JUMO <span className="text-blue-500">Cloud</span></h2>
                 <span className="text-xs font-black text-blue-400 uppercase tracking-[0.4em] mt-2 block italic">National Sovereign Infrastructure Platform</span>
               </div>
            </div>
            <p className="text-slate-400 text-xl font-semibold leading-relaxed max-w-2xl">
              Unified national cloud fabric orchestrating multi-region compute clusters, isolated storage volumes, automated load balancing, and AI performance scaling.
            </p>
          </div>
          <div className="bg-white/5 backdrop-blur-3xl border border-white/10 p-10 rounded-[3.5rem] flex flex-col items-center justify-center text-center shadow-inner group shrink-0 w-52">
            <Activity className="w-16 h-16 text-emerald-400 mb-4 opacity-70 group-hover:scale-115 transition-transform animate-pulse" />
            <span className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.3em]">Cloud Pulse</span>
            <span className="text-2xl font-black text-white mt-1 tracking-tighter uppercase">HEALTHY</span>
          </div>
        </div>
      </div>

      {/* Cloud Tabs Bar */}
      <div className="flex overflow-x-auto gap-3 pb-4 scrollbar-hide no-scrollbar">
        {cloudTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveCloudTab(tab.id)}
            className={`flex items-center gap-3 px-6 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all shrink-0 border ${
              activeCloudTab === tab.id
                ? "bg-slate-900 border-slate-900 text-white shadow-xl shadow-slate-900/10"
                : "bg-white border-slate-200 text-slate-500 hover:border-slate-300 hover:text-slate-800"
            }`}
          >
            <tab.icon className="w-4 h-4 shrink-0" />
            {tab.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {/* TAB 1: Cloud Fabric Overview */}
        {activeCloudTab === "overview" && (
          <motion.div
            key="overview"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-10"
          >
            {/* Real-time stats ribbons */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: "Total Compute Nodes", value: clusterMetrics.computeNodes, desc: "Isolated bare metal clusters", icon: Server },
                { title: "Active Tenant instances", value: clusterMetrics.activeInstances, desc: "Onboarded sovereign ERPs", icon: Database },
                { title: "Sovereign Throughput", value: clusterMetrics.throughput, desc: "Global packet transfer rate", icon: Globe },
                { title: "Inter-Node Latency", value: clusterMetrics.globalLatency, desc: "Z-axis transport delay", icon: Zap }
              ].map((stat, idx) => (
                <div key={idx} className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm flex flex-col justify-between">
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">{stat.title}</span>
                    <stat.icon className="w-4 h-4 text-blue-500" />
                  </div>
                  <div>
                    <span className="text-3xl font-black text-slate-900 block tracking-tight mb-1">{stat.value}</span>
                    <p className="text-[9px] font-bold text-slate-500 italic">{stat.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Topology & Logs Layout */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              {/* Regional node topology loads */}
              <div className="xl:col-span-2 bg-white border border-slate-200 p-10 rounded-[3.5rem] shadow-sm space-y-8">
                <div>
                  <h3 className="text-2xl font-black text-slate-900 tracking-tight italic uppercase">
                    National Cloud <span className="text-blue-600">Topology Loads</span>
                  </h3>
                  <p className="text-slate-500 text-xs font-bold mt-1">Resource load and replication distribution across key national compute centres.</p>
                </div>

                <div className="space-y-6">
                  {regionalNodes.map((node, idx) => (
                    <div key={idx} className="p-6 bg-slate-50 border border-slate-100 rounded-3xl space-y-4 font-bold hover:border-blue-400 transition-all">
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-white border border-slate-200 rounded-2xl flex items-center justify-center text-xs font-black text-slate-400 shrink-0">
                            <Network className="w-6 h-6 text-blue-600" />
                          </div>
                          <div>
                            <span className="font-black text-slate-900 text-sm block tracking-tight">{node.name}</span>
                            <span className="text-[10px] text-slate-400 block">{node.region} • {node.type}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-md font-black text-slate-900 italic">{node.load}% Load</span>
                          <span className="text-[9px] block font-black text-emerald-500 uppercase tracking-widest">{node.status}</span>
                        </div>
                      </div>
                      <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                        <div className={`h-full ${node.load > 70 ? 'bg-rose-500' : 'bg-blue-600'}`} style={{ width: `${node.load}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cloud Terminal logs */}
              <div className="bg-slate-950 border border-slate-900 p-8 rounded-[3.5rem] text-white flex flex-col shadow-2xl min-h-[400px]">
                <div className="flex items-center justify-between mb-6 border-b border-white/5 pb-4">
                  <div className="flex items-center gap-3">
                    <Activity className="w-6 h-6 text-blue-500 animate-pulse" />
                    <div>
                      <h4 className="text-sm font-black tracking-tight uppercase">Cloud Terminal Feed</h4>
                      <span className="text-[8px] text-slate-500 uppercase font-bold tracking-widest">Global scaling events</span>
                    </div>
                  </div>
                </div>

                <div className="flex-1 font-mono text-[10px] leading-relaxed overflow-y-auto max-h-[300px] space-y-2.5 pr-2 scrollbar-hide">
                  {cloudTerminalLogs.map((log) => (
                    <div key={log.id} className="flex gap-2">
                      <span className="text-slate-600 shrink-0 font-semibold">[{log.time}]</span>
                      <span className={
                        log.type === "success" ? "text-emerald-400 font-semibold" :
                        log.type === "warn" ? "text-amber-400 font-semibold" :
                        log.type === "error" ? "text-rose-400 font-bold" :
                        "text-slate-400"
                      }>{log.msg}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* TAB 2: Compute & ERP Hosting */}
        {activeCloudTab === "compute" && (
          <motion.div
            key="compute"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="bg-white border border-slate-200 p-10 rounded-[3.5rem] shadow-sm space-y-8"
          >
            <div>
              <h3 className="text-2xl font-black text-slate-900 tracking-tight italic uppercase">
                Active Tenant <span className="text-blue-600">Hosting Pods</span>
              </h3>
              <p className="text-slate-500 text-xs font-bold mt-1">Isolated container pods running separate modular ERP instances under safe namespace limits.</p>
            </div>

            <div className="space-y-6">
              {hostingPods.map((pod) => (
                <div key={pod.id} className="p-6 bg-slate-50 border border-slate-100 rounded-3xl flex flex-col xl:flex-row xl:items-center justify-between gap-6 hover:border-blue-500 transition-all font-bold">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white border border-slate-200 rounded-2xl flex items-center justify-center shrink-0">
                      <Server className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <span className="font-black text-slate-900 text-md block tracking-tight">{pod.name}</span>
                      <span className="text-xs text-slate-400 block mt-1">Pod ID: {pod.id} • Traffic: {pod.bandwidth} • Active users: {pod.activeUsers}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 justify-between xl:justify-end flex-wrap">
                    <div className="text-right">
                      <span className="text-slate-400 text-[10px] block font-black uppercase">CPU Allocation</span>
                      <span className="text-slate-900 text-sm block font-black">{pod.cpu}%</span>
                    </div>
                    <div className="text-right">
                      <span className="text-slate-400 text-[10px] block font-black uppercase">MEM Allocation</span>
                      <span className="text-slate-900 text-sm block font-black">{pod.mem}%</span>
                    </div>
                    <span className="bg-emerald-100 text-emerald-800 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider shrink-0">
                      {pod.status}
                    </span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => scalePod(pod.id)}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-black text-[9px] uppercase tracking-widest rounded-xl transition-all"
                      >
                        Scale CPU
                      </button>
                      <button
                        onClick={() => restartPod(pod.id)}
                        className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-black text-[9px] uppercase tracking-widest rounded-xl transition-all"
                      >
                        Restart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* TAB 3: Sovereign Storage & Database backup/restore */}
        {activeCloudTab === "storage" && (
          <motion.div
            key="storage"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="grid grid-cols-1 xl:grid-cols-3 gap-8"
          >
            {/* Storage volumes */}
            <div className="xl:col-span-2 bg-white border border-slate-200 p-10 rounded-[3.5rem] shadow-sm space-y-8">
              <div>
                <h3 className="text-2xl font-black text-slate-900 tracking-tight italic uppercase">
                  Encrypted <span className="text-blue-600">Storage Volumes</span>
                </h3>
                <p className="text-slate-500 text-xs font-bold mt-1">Durable national filesystem arrays. Data is AES-256 encrypted at rest.</p>
              </div>

              <div className="space-y-6">
                {storageVolumes.map((vol) => (
                  <div key={vol.id} className="p-6 bg-slate-50 border border-slate-100 rounded-3xl space-y-4 font-bold hover:border-blue-400 transition-all">
                    <div className="flex justify-between items-start flex-wrap gap-2">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-white border border-slate-200 rounded-2xl flex items-center justify-center shrink-0">
                          <HardDrive className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <span className="font-black text-slate-900 text-sm block tracking-tight">{vol.label}</span>
                          <span className="text-[10px] text-slate-400 block">{vol.type} • ID: {vol.id}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-xs text-slate-400 block">Volume limit: {vol.size}</span>
                        <span className="text-slate-900 text-sm block font-black">Utilized: {vol.utilized}% • Sessions: {vol.activeSessions}</span>
                      </div>
                    </div>
                    <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-600" style={{ width: `${vol.utilized}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Backups trigger controls */}
            <div className="bg-white border border-slate-200 p-10 rounded-[3.5rem] shadow-sm flex flex-col justify-between gap-8">
              <div className="space-y-6">
                <div>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Disaster Recovery</span>
                  <h3 className="text-2xl font-black text-slate-900 tracking-tight italic mt-1">Durable <span className="text-blue-600">Backups</span></h3>
                </div>

                <div className="p-6 bg-slate-50 border border-slate-100 rounded-[2rem] text-xs font-bold text-slate-500 leading-relaxed italic">
                  Take dynamic, encrypted JSON snapshots of active database caches or inject restoring files live into the server memory.
                </div>

                {/* Feedback flags */}
                {backupStatus && (
                  <div className={`p-4 rounded-xl text-[9px] font-black uppercase tracking-wider ${
                    backupStatus.startsWith("Error") ? "bg-rose-50 text-rose-600" : "bg-emerald-50 text-emerald-600"
                  }`}>{backupStatus}</div>
                )}
                {restoreStatus && (
                  <div className={`p-4 rounded-xl text-[9px] font-black uppercase tracking-wider ${
                    restoreStatus.startsWith("Error") ? "bg-rose-50 text-rose-600" : "bg-emerald-50 text-emerald-600"
                  }`}>{restoreStatus}</div>
                )}
              </div>

              <div className="space-y-3">
                <button
                  onClick={handleTriggerBackup}
                  className="w-full py-5 bg-slate-900 hover:bg-blue-600 text-white font-black text-[10px] uppercase tracking-widest rounded-2xl transition-all shadow-xl"
                >
                  Create State Snapshot Backup
                </button>
                <button
                  onClick={handleTriggerRestore}
                  className="w-full py-5 bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 font-black text-[10px] uppercase tracking-widest rounded-2xl transition-all shadow-sm"
                >
                  Restore From Snapshot Backup
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* TAB 4: Cloud AI Ops Terminal */}
        {activeCloudTab === "ai" && (
          <motion.div
            key="ai"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="grid grid-cols-1 xl:grid-cols-3 gap-8"
          >
            {/* AI Ops overview */}
            <div className="bg-slate-900 text-white rounded-[3.5rem] p-10 border border-white/5 shadow-2xl flex flex-col justify-between gap-8">
              <div className="space-y-6">
                <span className="px-3 py-1 bg-blue-500/10 text-blue-400 text-[9px] font-black uppercase tracking-widest rounded-full border border-blue-500/20">
                  Cloud Cognitive Ops
                </span>
                <div>
                  <h3 className="text-2xl font-black italic tracking-tight uppercase leading-none">
                    Infrastructure <span className="text-blue-500">Optimization</span>
                  </h3>
                  <p className="text-slate-400 text-xs font-semibold mt-3 leading-relaxed">
                    Auto-scaling adjustments, multi-region container failovers, and index adjustments executed by JDHP Cloud AI Operations.
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-1">AUTO-SCALING RULE</span>
                    <p className="text-xs font-bold leading-relaxed italic text-slate-300">
                      Auto-allocated limits of Kampala central nodes are scaled dynamically to absorb peak ERP student registration streams.
                    </p>
                  </div>
                  <div>
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-1">FAILOVER MATRIX</span>
                    <p className="text-xs font-bold leading-relaxed italic text-slate-300">
                      Active database read-replicas are mirrored on Mombasa Coast networks. Failover trigger latency is sub-10s.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-white/5 border border-white/10 rounded-[2rem] text-[10px] font-black uppercase tracking-widest text-center text-slate-400">
                Auto-Scale Optimization: ACTIVE
              </div>
            </div>

            {/* AI Conversation terminal */}
            <div className="xl:col-span-2 bg-slate-950 border border-slate-900 rounded-[3.5rem] p-10 flex flex-col justify-between shadow-2xl min-h-[500px]">
              <div className="space-y-6">
                <div className="flex items-center gap-3 border-b border-white/5 pb-4">
                  <Cpu className="w-6 h-6 text-blue-500" />
                  <div>
                    <h3 className="text-sm font-black tracking-tight text-white uppercase">Cloud AI Ops Workspace</h3>
                    <span className="text-[8px] text-slate-500 uppercase font-bold tracking-widest">Sovereign Cloud Diagnostics</span>
                  </div>
                </div>

                {/* Messages stream */}
                <div className="space-y-4 max-h-[320px] overflow-y-auto pr-2 scrollbar-hide no-scrollbar flex flex-col">
                  {aiConversation.map((msg, i) => (
                    <div
                      key={i}
                      className={`max-w-[85%] p-5 rounded-3xl text-xs font-bold leading-relaxed italic ${
                        msg.role === "user"
                          ? "bg-blue-600 text-white self-end rounded-br-none"
                          : "bg-white/5 text-slate-300 border border-white/10 self-start rounded-bl-none"
                      }`}
                    >
                      {msg.role === "agent" && (
                        <span className="text-[9px] font-black text-blue-400 uppercase tracking-widest block mb-2">Cloud Operations AI</span>
                      )}
                      <p>{msg.text}</p>
                      <span className="text-[8px] text-slate-500 block mt-2 text-right">{msg.timestamp}</span>
                    </div>
                  ))}

                  {isAiThinking && (
                    <div className="bg-white/5 border border-white/10 text-slate-400 p-5 rounded-3xl text-xs font-bold leading-relaxed italic self-start rounded-bl-none max-w-[85%] flex items-center gap-3">
                      <Loader2 className="w-4 h-4 animate-spin text-blue-500" />
                      <span>Cloud AI Ops is auditing multi-region container replication pools...</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Chat Input form */}
              <form onSubmit={handleAskAIAgent} className="mt-6 flex gap-3 relative">
                <input
                  type="text"
                  value={aiQuery}
                  onChange={(e) => setAiQuery(e.target.value)}
                  placeholder="Consult Cloud AI with a custom server/database query..."
                  disabled={isAiThinking}
                  className="w-full bg-white/5 border border-white/10 focus:border-blue-500 text-white placeholder:text-slate-500 rounded-2xl px-6 py-4 text-xs font-bold outline-none transition-all"
                />
                <button
                  type="submit"
                  disabled={isAiThinking || !aiQuery.trim()}
                  className="px-6 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-black text-[10px] uppercase tracking-widest rounded-xl transition-all shrink-0"
                >
                  Query AI
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
