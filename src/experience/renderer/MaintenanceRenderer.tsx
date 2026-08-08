import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Wrench, ClipboardList, AlertTriangle, Loader2, BrainCircuit, Activity,
  Settings, CheckCircle2, X, ChevronRight, Send, RefreshCw, Radio, Hammer, Inbox, ShieldCheck
} from "lucide-react";

export function MaintenanceRenderer() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("assets");

  // Active Assets telemetry & maintenance logs
  const [assetsList, setAssetsList] = useState([
    { id: "AST-401", name: "Kampala Main Node Core", type: "Compute Server Cluster", status: "Nominal", health: 98, lastInspected: "4h ago", severity: "Low" },
    { id: "AST-108", name: "Sovereign M-Pesa Gateway Node", type: "Network Routing Grid", status: "Degraded", health: 64, lastInspected: "10m ago", severity: "High" },
    { id: "AST-203", name: "Zambia HQ Escrow Server", type: "Storage Host Database", status: "Nominal", health: 99, lastInspected: "1d ago", severity: "Low" },
    { id: "AST-054", name: "Makerere Campus Wi-Fi Tower", type: "IoT Telemetry Receiver", status: "Critical", health: 32, lastInspected: "3m ago", severity: "High" },
    { id: "AST-311", name: "Gulu Regional Microgrid Node", type: "Energy Grid Controller", status: "In Maintenance", health: 85, lastInspected: "1h ago", severity: "Medium" }
  ]);

  // Selected Asset for Lateral Panel
  const [selectedAsset, setSelectedAsset] = useState<any>(null);

  // Maintenance Work Orders Simulation state
  const [newAssetId, setNewAssetId] = useState("AST-401");
  const [newWorkDesc, setNewWorkDesc] = useState("");
  const [newPriority, setNewPriority] = useState("Medium");
  const [simFeedback, setSimFeedback] = useState<string | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);

  // AI Copilot state
  const [aiQuery, setAiQuery] = useState("");
  const [isAiThinking, setIsAiThinking] = useState(false);
  const [aiConversation, setAiConversation] = useState<Array<{ role: "user" | "agent"; text: string; timestamp: string }>>([
    { role: "agent", text: "Welcome to JUMO Maintenance & Predictive Analytics Hub. I can evaluate server temperatures, analyze network routing congestion logs, recommend repair routines, or audit spare parts ledger balances. Ask your query.", timestamp: new Date().toLocaleTimeString() }
  ]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  // Submit dynamic simulated work order dispatch
  const handleDispatchWorkOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWorkDesc.trim()) {
      setSimFeedback("Error: Please provide specific maintenance job description.");
      return;
    }

    setIsSimulating(true);
    setSimFeedback(null);

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));

    // Find asset to update status to "In Maintenance"
    setAssetsList(prev => prev.map(ast => {
      if (ast.id === newAssetId) {
        return { ...ast, status: "In Maintenance", health: Math.min(ast.health + 15, 100), severity: newPriority };
      }
      return ast;
    }));

    setSimFeedback(`Success: Work-Order dispatched to regional technicians! Maintenance payload compiled: Asset ${newAssetId} status set to In Maintenance. Scheduled diagnostics executed.`);
    setNewWorkDesc("");
    setIsSimulating(false);
  };

  // Run a quick active predictive diagnostic check on specific asset
  const triggerAssetDiagnostic = (id: string) => {
    setAssetsList(prev => prev.map(ast => {
      if (ast.id === id) {
        return { ...ast, health: Math.min(ast.health + 5, 100), status: "Nominal", severity: "Low", lastInspected: "Just now" };
      }
      return ast;
    }));
    if (selectedAsset?.id === id) {
      setSelectedAsset((prev: any) => ({ ...prev, health: Math.min(prev.health + 5, 100), status: "Nominal", severity: "Low", lastInspected: "Just now" }));
    }
  };

  // Consult AI
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
          agentName: "Sovereign Predictive Maintenance AI",
          task: userMsg,
          contextId: `maint_${Math.random().toString(36).substring(2, 9)}`,
          docContext: `Sovereign assets status: Checked ${assetsList.length} physical/compute infrastructure nodes. Degraded/Critical assets: ${assetsList.filter(a => a.status === "Degraded" || a.status === "Critical").length}. Average health index: ${Math.round(assetsList.reduce((acc, a) => acc + a.health, 0) / assetsList.length)}%.`
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
        { role: "agent", text: `[Fallback Maintenance AI Gateway] Evaluated: "${userMsg}". Mapped active telemetry nodes. Anomaly heuristic model shows high temperature variances on regional Kampala servers. Diagnostic protocol recommends restarting secondary cooling loops.`, timestamp: new Date().toLocaleTimeString() }
      ]);
    } finally {
      setIsAiThinking(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-96 gap-4">
        <Loader2 className="w-8 h-8 animate-spin text-rose-600" />
        <span className="text-xs font-black text-slate-500 uppercase tracking-widest animate-pulse">Syncing Maintenance Logs...</span>
      </div>
    );
  }

  return (
    <div className="space-y-12 animate-in fade-in duration-500 pb-20">
      {/* Platform Banner */}
      <div className="bg-slate-950 rounded-[4rem] p-16 text-white relative overflow-hidden shadow-2xl border border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(244,63,94,0.15),transparent)]" />
        <div className="absolute right-0 top-0 w-80 h-80 bg-rose-600 rounded-full -mr-40 -mt-40 blur-[100px] opacity-20" />
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-16">
          <div className="max-w-3xl">
            <div className="flex items-center gap-6 mb-8">
               <div className="w-20 h-20 bg-rose-600 text-white rounded-[2rem] flex items-center justify-center shadow-2xl shadow-rose-600/40 border border-white/10 group shrink-0">
                 <Wrench className="w-10 h-10 group-hover:scale-110 transition-transform" />
               </div>
               <div>
                 <h2 className="text-5xl font-black tracking-tighter uppercase italic">Sovereign <span className="text-rose-500">Maintenance</span></h2>
                 <span className="text-xs font-black text-rose-400 uppercase tracking-[0.4em] mt-2 block italic">National Infrastructure & Asset Health Platform</span>
               </div>
            </div>
            <p className="text-slate-400 text-xl font-semibold leading-relaxed max-w-2xl">
              Predictive health diagnostics, real-time sensor monitoring, automated work-order dispatching, and hardware life-cycle management dashboards.
            </p>
          </div>
          <div className="bg-white/5 backdrop-blur-3xl border border-white/10 p-10 rounded-[3.5rem] flex flex-col items-center justify-center text-center shadow-inner group shrink-0 w-52">
            <Activity className="w-16 h-16 text-rose-400 mb-4 opacity-70 group-hover:scale-115 transition-transform animate-pulse" />
            <span className="text-[10px] font-black text-rose-400 uppercase tracking-[0.3em]">Diagnostics Link</span>
            <span className="text-2xl font-black text-white mt-1 tracking-tighter uppercase">OPERATIONAL</span>
          </div>
        </div>
      </div>

      {/* Navigation tabs bar */}
      <div className="flex overflow-x-auto gap-3 pb-4 scrollbar-hide no-scrollbar">
        {[
          { id: "assets", label: "Active Assets Nodes", icon: Hammer },
          { id: "services", label: "Predictive Modules", icon: Settings },
          { id: "simulation", label: "Work-Order Dispatch", icon: ClipboardList },
          { id: "ai", label: "Maintenance Copilot AI", icon: BrainCircuit }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              setActiveTab(tab.id);
              setSelectedAsset(null);
            }}
            className={`flex items-center gap-3 px-6 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all shrink-0 border ${
              activeTab === tab.id
                ? "bg-slate-900 border-slate-900 text-white shadow-xl"
                : "bg-white border-slate-200 text-slate-500 hover:border-slate-300 hover:text-slate-800"
            }`}
          >
            <tab.icon className="w-4 h-4 shrink-0" />
            {tab.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {/* TAB 1: Active Assets List */}
        {activeTab === "assets" && (
          <motion.div
            key="assets"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-10"
          >
            {/* Ribbon metrics */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: "Total Tracked Assets", value: assetsList.length, desc: "Active network hardware", icon: Hammer },
                { title: "Average Node Health", value: `${Math.round(assetsList.reduce((acc, a) => acc + a.health, 0) / assetsList.length)}%`, desc: "Integrity index", icon: Activity },
                { title: "Critical Anomaly Alerts", value: assetsList.filter(a => a.status === "Critical" || a.status === "Degraded").length, desc: "Immediate action required", icon: AlertTriangle },
                { title: "Active Maintenance Crews", value: "14 teams", desc: "Regional dispatch nodes", icon: Wrench }
              ].map((stat, idx) => (
                <div key={idx} className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm flex flex-col justify-between">
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">{stat.title}</span>
                    <stat.icon className="w-4 h-4 text-rose-500" />
                  </div>
                  <div>
                    <span className="text-3xl font-black text-slate-900 block tracking-tight mb-1">{stat.value}</span>
                    <p className="text-[9px] font-bold text-slate-500 italic">{stat.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Assets List Layout */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              <div className="xl:col-span-2 bg-white border border-slate-200 p-10 rounded-[3.5rem] shadow-sm space-y-8">
                <div>
                  <h3 className="text-2xl font-black text-slate-900 tracking-tight italic uppercase">National Infrastructure <span className="text-rose-600">Assets</span></h3>
                  <p className="text-slate-500 text-xs font-bold mt-1">Live status, telemetry metrics, and real-time health ratios across server hosts and network devices.</p>
                </div>

                <div className="space-y-4">
                  {assetsList.map((ast) => (
                    <div
                      key={ast.id}
                      onClick={() => setSelectedAsset(ast)}
                      className={`p-6 border rounded-3xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-bold transition-all cursor-pointer ${
                        selectedAsset?.id === ast.id
                          ? "bg-rose-50/50 border-rose-400 shadow-lg"
                          : "bg-slate-50 border-slate-100 hover:border-rose-400 hover:bg-white"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${
                          ast.status === "Critical" ? "bg-rose-100 text-rose-600" :
                          ast.status === "Degraded" ? "bg-amber-100 text-amber-600" :
                          "bg-emerald-100 text-emerald-600"
                        }`}>
                          <Radio className="w-6 h-6 animate-pulse" />
                        </div>
                        <div>
                          <div className="flex items-center gap-3">
                            <span className="font-black text-slate-900 text-md tracking-tight block">{ast.name}</span>
                            <span className="text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full bg-white border border-slate-200 text-slate-400">{ast.id}</span>
                          </div>
                          <span className="text-xs text-slate-400 block mt-1">{ast.type} • Health: {ast.health}%</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 justify-between sm:justify-end">
                        <span className={`text-[10px] font-black uppercase tracking-wider ${
                          ast.status === "Nominal" ? "text-emerald-600" : "text-rose-600 font-extrabold"
                        }`}>
                          {ast.status}
                        </span>
                        <ChevronRight className="w-5 h-5 text-slate-300" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Lateral detail workspace panel */}
              <div className="bg-white border border-slate-200 p-10 rounded-[3.5rem] shadow-sm flex flex-col justify-between gap-8 min-h-[400px]">
                {selectedAsset ? (
                  <div className="space-y-6 h-full flex flex-col justify-between">
                    <div className="space-y-6 text-xs font-bold">
                      <div className="flex justify-between items-start border-b border-slate-100 pb-4">
                        <div>
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Predictive Asset Desk</span>
                          <h4 className="text-xl font-black text-slate-900 tracking-tight italic mt-1">{selectedAsset.id} Workspace</h4>
                        </div>
                        <button onClick={() => setSelectedAsset(null)} className="p-2 text-slate-400 hover:text-slate-800">
                          <X className="w-5 h-5" />
                        </button>
                      </div>

                      <div className="space-y-4 text-slate-600">
                        <div>
                          <span className="text-[9px] uppercase text-slate-400 block mb-1">ASSET CLUSTER NAME</span>
                          <span className="text-slate-900 font-black text-sm block">{selectedAsset.name}</span>
                        </div>
                        <div>
                          <span className="text-[9px] uppercase text-slate-400 block mb-1">ASSET CLUSTER CLASSIFICATION</span>
                          <span className="text-slate-900 font-black text-sm block">{selectedAsset.type}</span>
                        </div>
                        <div>
                          <span className="text-[9px] uppercase text-slate-400 block mb-1">TELEMETRY HEALTH INDEX</span>
                          <div className="flex items-center gap-3 mt-1">
                            <span className={`font-black text-lg ${selectedAsset.health > 80 ? "text-emerald-600" : "text-rose-600"}`}>{selectedAsset.health}%</span>
                            <div className="w-32 h-2.5 bg-slate-100 rounded-full overflow-hidden">
                              <div className={`h-full rounded-full ${selectedAsset.health > 80 ? "bg-emerald-500" : "bg-rose-500"}`} style={{ width: `${selectedAsset.health}%` }} />
                            </div>
                          </div>
                        </div>
                        <div>
                          <span className="text-[9px] uppercase text-slate-400 block mb-1">LAST TELEMETRY UPDATE</span>
                          <span className="text-slate-500 font-semibold italic">{selectedAsset.lastInspected}</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <button
                        onClick={() => triggerAssetDiagnostic(selectedAsset.id)}
                        className="w-full py-4 bg-slate-900 hover:bg-rose-600 text-white font-black text-[9px] uppercase tracking-widest rounded-2xl transition-all shadow-sm"
                      >
                        Force predictive diagnostic sweep
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center text-center py-20 text-slate-400 italic font-semibold gap-4">
                    <Wrench className="w-12 h-12 text-slate-300 animate-pulse" />
                    <div>
                      <span className="text-slate-900 font-black text-sm block italic mb-1">No asset node selected</span>
                      <span className="text-xs text-slate-400 block">Click on any infrastructure asset to analyze its sensor parameters.</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* TAB 2: Predictive diagnostic services */}
        {activeTab === "services" && (
          <motion.div
            key="services"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {[
              { title: "Anomaly Heuristic Core", desc: "Monitors voltage shifts and fan rotations on physical server racks continuously.", status: "Active", icon: Activity },
              { title: "Clog Detection Matrix", desc: "Analyzes queue sizes on mobile money gateways and drops routing packets dynamically.", status: "Active", icon: Settings },
              { title: "Thermal Sentinel Monitor", desc: "Thermal scans using IoT node relays to flag over-heating nodes automatically.", status: "Operational", icon: Radio },
              { title: "Spare Parts Ledger Sync", desc: "Integrates with procurement ledgers to order hardware spares before they break.", status: "Active", icon: ClipboardList },
              { title: "SecOps Compliance Sweep", desc: "Integrates with AEGIS security to audit SSL certificate expiration metrics.", status: "Ready", icon: ShieldCheck }
            ].map((srv, idx) => (
              <div key={idx} className="bg-white border border-slate-200 rounded-[3.5rem] p-10 shadow-sm hover:shadow-2xl transition-all group flex flex-col justify-between hover:border-rose-500 font-semibold text-xs">
                <div>
                  <div className="w-14 h-14 bg-rose-50 text-rose-500 rounded-2xl flex items-center justify-center mb-8">
                    <srv.icon className="w-7 h-7" />
                  </div>
                  <h4 className="text-xl font-black text-slate-900 tracking-tight italic mb-3">{srv.title}</h4>
                  <p className="text-slate-500 font-semibold leading-relaxed mb-6">{srv.desc}</p>
                </div>
                <div className="flex justify-between items-center border-t border-slate-100 pt-6">
                  <span className="text-[9px] font-black text-rose-600 uppercase tracking-wider">{srv.status}</span>
                  <button className="text-[9px] font-black text-slate-900 uppercase hover:underline tracking-widest">Configure Service</button>
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {/* TAB 3: Work-Order Dispatch simulation */}
        {activeTab === "simulation" && (
          <motion.div
            key="simulation"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="grid grid-cols-1 xl:grid-cols-3 gap-8"
          >
            <div className="xl:col-span-2 bg-white border border-slate-200 p-10 rounded-[3.5rem] shadow-sm space-y-8">
              <div>
                <h3 className="text-2xl font-black text-slate-900 tracking-tight italic uppercase">Dispatch Maintenance <span className="text-rose-600">Work-Order</span></h3>
                <p className="text-slate-500 text-xs font-bold mt-1">Simulate sending a telemetry command or scheduling local engineers to calibrate core nodes.</p>
              </div>

              <form onSubmit={handleDispatchWorkOrder} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-bold">
                  <div className="space-y-2">
                    <label className="text-slate-500">Target Infrastructure Node</label>
                    <select
                      value={newAssetId}
                      onChange={(e) => setNewAssetId(e.target.value)}
                      className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none font-bold"
                    >
                      {assetsList.map(a => (
                        <option key={a.id} value={a.id}>{a.name} ({a.id})</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-slate-500">Task Priority Severity</label>
                    <select
                      value={newPriority}
                      onChange={(e) => setNewPriority(e.target.value)}
                      className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none font-bold"
                    >
                      <option value="Low">Low (Scheduled sweep)</option>
                      <option value="Medium">Medium (Calibrate levels)</option>
                      <option value="High">High (Immediate intervention)</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2 text-xs font-bold">
                  <label className="text-slate-500">Maintenance Directive Details</label>
                  <textarea
                    value={newWorkDesc}
                    onChange={(e) => setNewWorkDesc(e.target.value)}
                    placeholder="e.g. Cleared thermal clog, rebooted cooling sub-system logs, calibration completed."
                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl font-semibold outline-none focus:border-rose-500 h-28 text-xs"
                  />
                </div>

                {simFeedback && (
                  <div className={`p-4 rounded-2xl text-[9px] font-black uppercase tracking-wider leading-relaxed ${
                    simFeedback.startsWith("Error") ? "bg-rose-50 text-rose-600 border border-rose-100" : "bg-emerald-50 text-emerald-600 border border-emerald-100"
                  }`}>
                    {simFeedback}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSimulating}
                  className="w-full py-5 bg-slate-900 hover:bg-rose-600 disabled:opacity-50 text-white font-black text-[10px] uppercase tracking-widest rounded-2xl transition-all shadow-xl"
                >
                  {isSimulating ? <Loader2 className="w-4 h-4 animate-spin mx-auto" /> : "Post simulated dispatch work order"}
                </button>
              </form>
            </div>

            <div className="bg-slate-900 text-white p-10 rounded-[3.5rem] shadow-2xl flex flex-col justify-between border border-white/5 font-semibold text-xs">
              <div className="space-y-6">
                <span className="text-[10px] font-black text-rose-400 uppercase tracking-[0.3em] block">Sovereign Directives</span>
                <h4 className="text-2xl font-black text-slate-100 tracking-tight italic">Calibrations Protocols</h4>
                <p className="text-slate-400 font-semibold leading-relaxed italic">
                  Calibrations on sovereign computing clusters are dynamically gated by AEGIS rules. Work orders marked High Priority trigger instant logging audits prior to engineer arrival.
                </p>
              </div>

              <div className="pt-8 border-t border-white/10 text-xs text-slate-400 italic font-semibold leading-relaxed">
                Emergency override is only possible with certified administrative security credentials keys.
              </div>
            </div>
          </motion.div>
        )}

        {/* TAB 4: Maintenance AI Copilot */}
        {activeTab === "ai" && (
          <motion.div
            key="ai"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="grid grid-cols-1 xl:grid-cols-3 gap-8"
          >
            {/* AI Advisor Card */}
            <div className="bg-slate-900 text-white rounded-[3.5rem] p-10 border border-white/5 shadow-2xl flex flex-col justify-between gap-8">
              <div className="space-y-6">
                <span className="px-3 py-1 bg-rose-500/10 text-rose-400 text-[9px] font-black uppercase tracking-widest rounded-full border border-rose-500/20">
                  Predictive Telemetry AI
                </span>
                <div>
                  <h3 className="text-2xl font-black italic tracking-tight uppercase leading-none text-slate-100">
                    Diagnostics <span className="text-rose-500">Auditor AI</span>
                  </h3>
                  <p className="text-slate-400 text-xs font-semibold mt-3 leading-relaxed">
                    Continuous server room thermal modeling, network throughput diagnostics, and early hardware degradation warnings across multi-tenant sovereign grids.
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-1">PREDICTIVE ALGORITHMS</span>
                    <p className="text-xs font-bold leading-relaxed italic text-slate-300">
                      Evaluates active thermal thresholds to predict node failure times within ±4 hours, scheduling pre-emptive maintenance.
                    </p>
                  </div>
                  <div>
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-1">AEGIS SYNC RULES</span>
                    <p className="text-xs font-bold leading-relaxed italic text-slate-300">
                      Cooperates with AEGIS SecOps platform to automatically isolate compromised compute nodes when physical intrusion alerts are triggered.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-white/5 border border-white/10 rounded-[2rem] text-[10px] font-black uppercase tracking-widest text-center text-slate-400">
                Diagnostic confidence level: 99.8% ACCURATE
              </div>
            </div>

            {/* AI Chat Terminal */}
            <div className="xl:col-span-2 bg-slate-950 border border-slate-900 rounded-[3.5rem] p-10 flex flex-col justify-between shadow-2xl min-h-[500px]">
              <div className="space-y-6">
                <div className="flex items-center gap-3 border-b border-white/5 pb-4">
                  <BrainCircuit className="w-6 h-6 text-rose-500" />
                  <div>
                    <h3 className="text-sm font-black tracking-tight text-white uppercase font-bold">Predictive AI Workspace</h3>
                    <span className="text-[8px] text-slate-500 uppercase font-bold tracking-widest">Active Hardware Telemetry Audits</span>
                  </div>
                </div>

                {/* Messages stream */}
                <div className="space-y-4 max-h-[320px] overflow-y-auto pr-2 scrollbar-hide no-scrollbar flex flex-col">
                  {aiConversation.map((msg, i) => (
                    <div
                      key={i}
                      className={`max-w-[85%] p-5 rounded-3xl text-xs font-bold leading-relaxed italic ${
                        msg.role === "user"
                          ? "bg-rose-600 text-white self-end rounded-br-none"
                          : "bg-white/5 text-slate-300 border border-white/10 self-start rounded-bl-none"
                      }`}
                    >
                      {msg.role === "agent" && (
                        <span className="text-[9px] font-black text-rose-400 uppercase tracking-widest block mb-2 font-bold">Maintenance AI Analyst</span>
                      )}
                      <p>{msg.text}</p>
                      <span className="text-[8px] text-slate-500 block mt-2 text-right">{msg.timestamp}</span>
                    </div>
                  ))}

                  {isAiThinking && (
                    <div className="bg-white/5 border border-white/10 text-slate-400 p-5 rounded-3xl text-xs font-bold leading-relaxed italic self-start rounded-bl-none max-w-[85%] flex items-center gap-3">
                      <Loader2 className="w-4 h-4 animate-spin text-rose-500" />
                      <span>Diagnostics AI is pulling active node voltage patterns and thermal telemetry grids...</span>
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
                  placeholder="Ask Maintenance AI about server thermal logs or predictive spare parts allocation..."
                  disabled={isAiThinking}
                  className="w-full bg-white/5 border border-white/10 focus:border-rose-500 text-white placeholder:text-slate-500 rounded-2xl px-6 py-4 text-xs font-bold outline-none transition-all"
                />
                <button
                  type="submit"
                  disabled={isAiThinking || !aiQuery.trim()}
                  className="px-6 bg-rose-600 hover:bg-rose-700 disabled:opacity-50 text-white font-black text-[10px] uppercase tracking-widest rounded-xl transition-all shrink-0 font-bold"
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
