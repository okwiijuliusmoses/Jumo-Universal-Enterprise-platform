import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Cpu, Server, Activity, Shield, ArrowRight, Settings, Database, BrainCircuit, Network, Fingerprint, Lock, CheckCircle2, RefreshCw, BarChart3, Zap, Globe, MessageSquare, Terminal, X, Loader2 } from "lucide-react";
import { UEOSRuntimeClient } from "../../ueos/runtime/UEOSRuntimeClient";
import { JumoAIAgentRegistry } from "../../core/ai/registry/JumoAIAgentRegistry";
import { AIAgentRecord, AIWorkforceDivision } from "../../core/ai/types/JumoAITypes";
import { UniversalHubRegistry } from "../../core/factory/registry/UniversalHubRegistry";

export function AIGatewayRenderer() {
  const [activeTab, setActiveTab] = useState<"gateway" | "agents" | "models" | "memory" | "governance">("gateway");
  const [selectedDivision, setSelectedDivision] = useState<string>("ALL");
  const [metrics, setMetrics] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAgent, setSelectedAgent] = useState<AIAgentRecord | null>(null);

  const stats = JumoAIAgentRegistry.getWorkforceStats();
  const allAgents = JumoAIAgentRegistry.getAllAgents();

  const filteredAgents = selectedDivision === "ALL" 
    ? allAgents 
    : allAgents.filter(a => a.division === selectedDivision);

  useEffect(() => {
    async function loadData() {
      try {
        const m = await UEOSRuntimeClient.fetchDashboardMetrics();
        setMetrics(m);
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  const commandModules = [
    { id: "agents", title: "JUMO AI Workforce Registry", icon: Cpu, detail: `${stats.totalRegisteredAgents} Native JUMO Agents Registered`, status: "Active Swarm" },
    { id: "models", title: "JUMO Model Gateway", icon: BrainCircuit, detail: "Gemini 2.5 Pro / Flash & Sovereign Local Runtime", status: "Operational" },
    { id: "memory", title: "Semantic Memory & RAG", icon: Database, detail: "Tenant-Isolated Knowledge Scopes", status: "Enforced" },
    { id: "governance", title: "JUMO AEGIS Security & Audit", icon: Shield, detail: "Zero Trust & Anti-Deletion Guardian", status: "Active" },
    { id: "manufacturing", title: "JUMO National Manufacturing Hub", icon: Zap, detail: `${UniversalHubRegistry.getERPEcosystems().length} ERP Ecosystems Configured`, status: "Ready" },
    { id: "eval", title: "Reasoning & Cognitive Telemetry", icon: BarChart3, detail: "Model Policy & Pipeline Gates", status: "100% Passed" },
  ];

  if (isLoading) {
    return <div className="flex justify-center items-center h-96"><Loader2 className="w-8 h-8 animate-spin text-rose-600" /></div>;
  }

  const renderAgentSwarm = () => (
    <div className="space-y-10 animate-in fade-in duration-500">
       <div className="flex items-center justify-between">
        <div>
          <h3 className="text-3xl font-black text-slate-900 tracking-tight italic">JUMO Native <span className="text-rose-600">AI Workforce</span></h3>
          <p className="text-slate-500 font-bold mt-1">Sovereign 250+ JUMO AI Agent workforce across 9 governed engineering divisions.</p>
        </div>
        <button onClick={() => setActiveTab("gateway")} className="px-6 py-3 bg-slate-100 text-slate-600 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-200 transition-all">
          ← Back to Gateway
        </button>
      </div>

      {/* Division Selector Filter */}
      <div className="flex flex-wrap gap-3">
        {["ALL", "ARCHITECTURE", "ERP_ENGINEERING", "COMMERCIAL_PRODUCT_ENGINEERING", "SOFTWARE_ENGINEERING", "INTELLIGENCE", "SECURITY_AEGIS", "TESTING_VERIFICATION", "GUARDIAN_GOVERNANCE", "MANUFACTURING_ORCHESTRATION"].map(div => (
          <button
            key={div}
            onClick={() => setSelectedDivision(div)}
            className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all ${
              selectedDivision === div
                ? "bg-rose-600 text-white shadow-lg shadow-rose-600/30"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            {div.replace(/_/g, " ")}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {filteredAgents.map((agent) => (
            <motion.div 
              key={agent.agentId}
              onClick={() => setSelectedAgent(agent)}
              className="bg-white border border-slate-200 rounded-[2.5rem] p-8 shadow-sm hover:shadow-2xl hover:border-rose-400 transition-all cursor-pointer flex items-center justify-between group"
            >
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-all">
                  <BrainCircuit className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="text-xl font-black text-slate-900 tracking-tight mb-1">{agent.jumoName}</h4>
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-black text-rose-600 uppercase tracking-widest bg-rose-50 px-2.5 py-0.5 rounded-md border border-rose-100">{agent.division.replace(/_/g, " ")}</span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{agent.role}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center justify-end gap-2 mb-2">
                  <div className={`w-2.5 h-2.5 rounded-full ${agent.status === 'ACTIVE' ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-900">{agent.status}</span>
                </div>
                <span className="text-[10px] font-bold text-slate-400">{agent.modelPolicy.modelAlias}</span>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="bg-slate-900 rounded-[3rem] p-10 text-white space-y-8">
          <h4 className="text-[10px] font-black text-rose-400 uppercase tracking-[0.3em]">Workforce Telemetry</h4>
          <div className="space-y-6">
            {[
              { label: "Registered JUMO Agents", val: stats.totalRegisteredAgents.toString() },
              { label: "Active Operational Swarm", val: stats.activeAgentsCount.toString() },
              { label: "Virtual Capacity Ceiling", val: `${stats.virtualCapacitySlots} Slots` },
              { label: "Architecture Guardian", val: stats.guardianStatus }
            ].map((stat, i) => (
              <div key={i} className="flex justify-between items-center border-b border-white/10 pb-4">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</span>
                <span className="text-xs font-black text-white italic">{stat.val}</span>
              </div>
            ))}
          </div>
          <div className="p-6 bg-white/5 rounded-3xl border border-white/10">
            <p className="text-[10px] font-bold text-slate-400 leading-relaxed italic">
              "JUMO AI workforce operates with sovereign local ownership. Model gateway provides fallback routing and strict AEGIS zero-trust governance."
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-10 animate-in fade-in duration-500 pb-20">
      {activeTab === "gateway" && (
        <>
          <div className="bg-slate-900 rounded-[4rem] p-16 text-white relative overflow-hidden shadow-2xl border border-white/5">
            <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(225,29,72,0.1),transparent)]" />
            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-16">
              <div className="max-w-3xl">
                <div className="flex items-center gap-6 mb-8">
                   <div className="w-20 h-20 bg-rose-600 text-white rounded-[2rem] flex items-center justify-center shadow-2xl shadow-rose-600/40 border border-white/10 group">
                     <BrainCircuit className="w-10 h-10 group-hover:rotate-12 transition-transform" />
                   </div>
                   <div>
                     <h2 className="text-5xl font-black tracking-tighter uppercase italic">AI Command <span className="text-rose-500">Center</span></h2>
                     <span className="text-xs font-black text-rose-400 uppercase tracking-[0.4em] mt-2 block italic">National Cognitive Intelligence Headquarters</span>
                   </div>
                </div>
                <p className="text-slate-400 text-xl font-medium leading-relaxed max-w-2xl">
                  Universal cognitive gateway and sovereign agent orchestration layer. Managing national reasoning models, tenant-isolated vector memory, and autonomous AI manufacturing swarms.
                </p>
              </div>
              <div className="bg-white/5 backdrop-blur-3xl border border-white/10 p-12 rounded-[3.5rem] flex flex-col items-center justify-center text-center shadow-inner group min-w-[300px]">
                <div className="w-20 h-20 bg-rose-600/20 rounded-full flex items-center justify-center mb-6 animate-pulse">
                  <Network className="w-10 h-10 text-rose-400" />
                </div>
                <span className="text-xs font-black text-rose-400 uppercase tracking-widest mb-1">Active Swarm Agents</span>
                <span className="text-4xl font-black text-white mt-1 tracking-tighter">247</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {commandModules.map((card) => (
              <motion.div 
                key={card.id}
                onClick={() => { if (card.id === 'agents') setActiveTab('agents'); else if (card.id === 'models') setActiveTab('models'); }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group bg-white p-10 rounded-[3.5rem] border border-slate-200 shadow-sm hover:shadow-3xl hover:border-rose-400 transition-all flex flex-col items-center text-center cursor-pointer relative overflow-hidden"
              >
                <div className="w-20 h-20 bg-slate-50 text-slate-400 group-hover:bg-rose-600 group-hover:text-white rounded-3xl flex items-center justify-center mb-8 transition-all shadow-inner">
                  <card.icon className="w-10 h-10" />
                </div>
                <h4 className="font-black text-slate-900 text-2xl mb-2 tracking-tight italic">{card.title}</h4>
                <p className="text-sm font-bold text-slate-400 mb-8 leading-snug">{card.detail}</p>
                <div className="mt-auto flex items-center gap-2 text-[10px] font-black text-rose-600 uppercase tracking-[0.2em] group-hover:gap-4 transition-all">
                  Launch Controller <ArrowRight className="w-4 h-4" />
                </div>
                <div className="absolute top-6 right-8">
                  <span className="text-[8px] font-black bg-rose-50 text-rose-600 px-3 py-1 rounded-full uppercase tracking-widest border border-rose-100">{card.status}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </>
      )}

      {activeTab === "agents" && renderAgentSwarm()}

      <AnimatePresence>
        {selectedAgent && (
          <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-xl flex items-center justify-center p-6">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-[4rem] w-full max-w-4xl h-[700px] border border-slate-200 shadow-2xl flex overflow-hidden"
            >
              <div className="w-1/2 p-16 space-y-10 overflow-y-auto">
                <div className="flex justify-between items-start">
                  <div className="w-20 h-20 bg-rose-50 text-rose-600 rounded-3xl flex items-center justify-center">
                    <BrainCircuit className="w-10 h-10" />
                  </div>
                  <button onClick={() => setSelectedAgent(null)} className="p-3 bg-slate-50 rounded-2xl hover:bg-slate-100 transition-all">
                    <X className="w-6 h-6 text-slate-400" />
                  </button>
                </div>
                <div>
                  <h3 className="text-3xl font-black text-slate-900 tracking-tighter italic mb-1">{selectedAgent.jumoName}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] font-black text-rose-600 uppercase tracking-widest bg-rose-50 px-2 py-0.5 rounded border border-rose-100">{selectedAgent.division.replace(/_/g, " ")}</span>
                    <span className="text-xs font-bold text-slate-500">{selectedAgent.role}</span>
                  </div>
                </div>
                <p className="text-slate-500 font-bold leading-relaxed italic text-xs">
                  {selectedAgent.description}
                </p>
                <div className="space-y-4">
                  <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Capabilities & Authorized Tools</h5>
                  <div className="flex flex-wrap gap-2">
                    {selectedAgent.capabilities.map((c, idx) => (
                      <span key={idx} className="bg-slate-100 text-slate-700 text-[10px] font-black uppercase px-2.5 py-1 rounded-md">{c}</span>
                    ))}
                  </div>
                  <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mt-4">Architecture Constraints</h5>
                  <div className="p-4 bg-rose-50 border border-rose-100 rounded-2xl text-[11px] font-bold text-rose-800 space-y-1">
                    {selectedAgent.architectureConstraints.map((ac, idx) => (
                      <div key={idx}>• {ac}</div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="w-1/2 bg-slate-900 p-12 text-emerald-400 font-mono text-xs overflow-y-auto relative">
                <div className="flex items-center gap-2 mb-8 text-slate-500 uppercase tracking-widest font-black text-[10px]">
                  <Terminal className="w-4 h-4" /> Agent Thinking Log
                </div>
                <div className="space-y-3 opacity-80">
                   {[...Array(15)].map((_, i) => (
                    <div key={i} className="flex gap-4">
                      <span className="text-slate-700">[{new Date().toLocaleTimeString()}]</span>
                      <span>AGENT_CORE_EXEC: {Math.random().toString(36).substring(7).toUpperCase()} ... Grounded</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
