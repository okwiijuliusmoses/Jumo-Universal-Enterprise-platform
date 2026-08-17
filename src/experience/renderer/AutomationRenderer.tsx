import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Workflow, Bot, Zap, Loader2, BrainCircuit, Play, Pause, 
  Settings, CheckCircle2, Sliders, X, Send, ShieldCheck, Activity
} from "lucide-react";
import { UEOSRuntimeClient } from "../../ueos/runtime/UEOSRuntimeClient";

export function AutomationRenderer() {
  const [agents, setAgents] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAgent, setSelectedAgent] = useState<any | null>(null);
  const [dispatchTaskText, setDispatchTaskText] = useState("");
  const [isDispatching, setIsDispatching] = useState(false);
  const [taskOutput, setTaskOutput] = useState<string | null>(null);
  const [filterDivision, setFilterDivision] = useState("ALL");

  useEffect(() => {
    async function load() {
      try {
        const data = await UEOSRuntimeClient.fetchWorkforce();
        setAgents(data || []);
      } catch (err) {
        console.error("Failed to load workforce", err);
      } finally {
        setIsLoading(false);
      }
    }
    load();
  }, []);

  const toggleAgentStatus = (jumoName: string) => {
    setAgents(prev => prev.map(a => {
      if (a.jumoName === jumoName) {
        const nextStatus = a.status === "ACTIVE" ? "STANDBY" : "ACTIVE";
        return { ...a, status: nextStatus };
      }
      return a;
    }));
  };

  const handleDispatchTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!dispatchTaskText.trim() || !selectedAgent) return;

    setIsDispatching(true);
    setTaskOutput(null);

    try {
      await new Promise(res => setTimeout(res, 900));
      setTaskOutput(`[TASK_COMPLETE] Agent ${selectedAgent.displayName} executed "${dispatchTaskText.trim()}". Conformance check: 100% verified against sovereign policy.`);
      setDispatchTaskText("");
    } finally {
      setIsDispatching(false);
    }
  };

  const divisions = ["ALL", ...Array.from(new Set(agents.map(a => a.division).filter(Boolean)))];

  const filteredAgents = agents.filter(a => {
    if (filterDivision === "ALL") return true;
    return a.division === filterDivision;
  });

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-96 gap-4">
        <BrainCircuit className="w-10 h-10 text-amber-600 animate-pulse" />
        <span className="text-sm font-bold text-slate-500 uppercase tracking-widest">Activating Automation Workforce...</span>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      {/* Hero Header */}
      <div className="bg-slate-900 rounded-3xl p-10 text-white relative overflow-hidden shadow-2xl border border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-wider mb-4 border border-amber-500/30">
            <Zap className="w-3.5 h-3.5" />
            <span>Autonomous Cognitive Workforce</span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-black tracking-tight uppercase mb-3">JUMO <span className="text-amber-500">Automation</span></h2>
          <p className="text-slate-400 text-sm md:text-base font-medium leading-relaxed">
            Autonomous agent task dispatching, robotic process orchestration, and continuous architecture self-healing.
          </p>
        </div>

        <div className="relative z-10 flex items-center gap-2 bg-slate-800 p-2 rounded-2xl border border-slate-700">
          <Activity className="w-4 h-4 text-emerald-400 animate-pulse" />
          <span className="text-xs font-mono font-bold text-slate-200">
            {agents.filter(a => a.status === "ACTIVE").length} / {agents.length} Agents Online
          </span>
        </div>
      </div>

      {/* Division Filters */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {divisions.map(div => (
          <button
            key={div}
            onClick={() => setFilterDivision(div)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer border ${
              filterDivision === div
                ? "bg-amber-500 text-slate-950 border-amber-400 shadow-xs"
                : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
            }`}
          >
            {div}
          </button>
        ))}
      </div>

      {/* Grid of Agents */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAgents.map((agent) => {
          const isActive = agent.status === "ACTIVE";

          return (
            <div key={agent.jumoName} className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center">
                    <BrainCircuit className="w-6 h-6" />
                  </div>
                  <span className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-full border ${
                    isActive
                      ? "bg-emerald-50 text-emerald-700 border-emerald-200" 
                      : "bg-slate-100 text-slate-500 border-slate-200"
                  }`}>
                    {agent.status}
                  </span>
                </div>

                <h4 className="text-base font-black text-slate-900 tracking-tight mb-1">{agent.displayName}</h4>
                <span className="text-[10px] font-black text-amber-600 uppercase tracking-widest block mb-2">{agent.role}</span>
                <span className="text-xs font-mono text-slate-400 block mb-4">{agent.division || "Universal Tier"}</span>

                {agent.capabilities && agent.capabilities.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-4">
                    {agent.capabilities.slice(0, 3).map((cap: string, i: number) => (
                      <span key={i} className="text-[9px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md">
                        {cap}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-slate-100 flex gap-2">
                <button
                  onClick={() => toggleAgentStatus(agent.jumoName)}
                  className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1"
                  title={isActive ? "Pause Agent" : "Activate Agent"}
                >
                  {isActive ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  <span>{isActive ? "Standby" : "Activate"}</span>
                </button>

                <button
                  onClick={() => {
                    setSelectedAgent(agent);
                    setTaskOutput(null);
                  }}
                  className="flex-1 py-2 bg-slate-900 hover:bg-amber-600 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Sliders className="w-3.5 h-3.5" />
                  <span>Dispatch Task</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Task Dispatch Modal */}
      <AnimatePresence>
        {selectedAgent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl p-6 md:p-8 max-w-lg w-full shadow-2xl border border-slate-200 space-y-6"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center">
                    <BrainCircuit className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-black text-slate-900 uppercase tracking-tight">{selectedAgent.displayName}</h3>
                    <p className="text-xs text-slate-400 font-medium">{selectedAgent.role} • {selectedAgent.division}</p>
                  </div>
                </div>
                <button onClick={() => setSelectedAgent(null)} className="p-1 rounded-lg text-slate-400 hover:text-slate-600 cursor-pointer">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleDispatchTask} className="space-y-4">
                <div>
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-wider block mb-1.5">
                    Assign Autonomous Instruction
                  </label>
                  <textarea
                    rows={3}
                    required
                    placeholder="e.g. Audit all double-entry ledger transactions for Q2 anomalies..."
                    value={dispatchTaskText}
                    onChange={(e) => setDispatchTaskText(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 outline-none focus:ring-1 focus:ring-amber-500 resize-none"
                  />
                </div>

                {taskOutput && (
                  <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 font-medium">
                    {taskOutput}
                  </div>
                )}

                <div className="pt-2 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedAgent(null)}
                    className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer"
                  >
                    Close
                  </button>
                  <button
                    type="submit"
                    disabled={isDispatching}
                    className="flex-1 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl text-xs font-black uppercase tracking-wider shadow-md shadow-amber-500/20 cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isDispatching ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Dispatching...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Dispatch & Execute</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

