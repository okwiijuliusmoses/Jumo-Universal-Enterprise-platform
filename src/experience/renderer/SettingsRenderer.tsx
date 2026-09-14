import React, { useState } from "react";
import { motion } from "motion/react";
import { 
  Save, 
  CheckCircle2, 
  Terminal, 
  Brain, 
  MessageSquare, 
  Globe, 
  Database, 
  Lock, 
  Zap, 
  Activity, 
  Shield,
  Layers,
  Bot
} from "lucide-react";

export function SettingsRenderer() {
  const [isSaved, setIsSaved] = useState(false);
  const [activeCategory, setActiveCategory] = useState("models");

  const categories = [
    { id: "models", label: "Model Governance", icon: Database },
    { id: "agents", label: "Agent Registry", icon: Bot },
    { id: "rag", label: "Semantic RAG & Memory", icon: Layers },
    { id: "security", label: "Cognitive Security", icon: Shield },
    { id: "ops", label: "Ops & Telemetry", icon: Activity },
  ];

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      <div className="flex items-center justify-between mb-8 flex-shrink-0">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">JUMO AI Command Center</h2>
          <p className="text-slate-500">Universal orchestration for multi-model governance, specialized agents, and cognitive RAG pipelines.</p>
        </div>
        <button 
          onClick={handleSave}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold transition-all shadow-lg ${
            isSaved ? "bg-emerald-500 text-white shadow-emerald-100" : "bg-slate-900 text-white shadow-slate-200 hover:bg-slate-800"
          }`}
        >
          {isSaved ? <CheckCircle2 className="w-4 h-4" /> : <Save className="w-4 h-4" />}
          {isSaved ? "Settings Applied" : "Save Configurations"}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 flex-1 min-h-0">
        <div className="lg:col-span-1 space-y-1">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all ${
                activeCategory === cat.id 
                  ? "bg-white border border-slate-100 text-slate-900 font-bold shadow-sm ring-1 ring-slate-50" 
                  : "text-slate-500 hover:bg-white/50 hover:text-slate-700"
              }`}
            >
              <div className="flex items-center gap-3">
                <cat.icon className={`w-4 h-4 ${activeCategory === cat.id ? "text-blue-600" : "text-slate-400"}`} />
                <span className="text-sm truncate">{cat.label}</span>
              </div>
            </button>
          ))}
        </div>
        
        <div className="lg:col-span-3 bg-white rounded-3xl border border-slate-100 shadow-sm p-10 overflow-y-auto">
          {activeCategory === "models" && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">Model Governance & Routing</h3>
                <p className="text-sm text-slate-500">Manage cognitive vendor logic, dynamic routing, and fallback pipelines.</p>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Master Reasoning Engine</label>
                    <select className="w-full bg-slate-50 border border-slate-100 p-3 rounded-xl text-sm font-medium outline-none focus:ring-2 focus:ring-blue-100 transition-all">
                      <option>Gemini 1.5 Pro (Google)</option>
                      <option>Gemini 1.5 Flash (Google)</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest">High-Velocity Engine</label>
                    <select className="w-full bg-slate-50 border border-slate-100 p-3 rounded-xl text-sm font-medium outline-none focus:ring-2 focus:ring-blue-100 transition-all">
                      <option>Gemini 1.5 Flash (Google)</option>
                      <option>Gemini 1.5 Pro (Google)</option>
                    </select>
                  </div>
                </div>
                
                <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="text-sm font-bold text-slate-800">Dynamic Task Routing (JUMO Engine)</h4>
                      <p className="text-xs text-slate-500">Automatically direct complex financial ledgers to Pro and routine translations to Flash to optimize performance.</p>
                    </div>
                    <div className="w-12 h-6 bg-blue-600 rounded-full relative flex items-center px-1">
                       <div className="w-4 h-4 bg-white rounded-full ml-auto shadow-sm" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeCategory === "agents" && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">Autonomous Agent Registry</h3>
                <p className="text-sm text-slate-500">Deploy, pause, and monitor specialized AI agents operating across enterprise domains.</p>
              </div>

              <div className="space-y-4">
                {[
                  { name: "Ledger Auditor", status: "Active", calls: "12,400", latency: "310ms" },
                  { name: "Compliance Officer", status: "Active", calls: "8,211", latency: "420ms" },
                  { name: "Support Auto-Responder", status: "Paused", calls: "0", latency: "N/A" }
                ].map(agent => (
                  <div key={agent.name} className="flex items-center justify-between p-4 bg-slate-50 border border-slate-100 rounded-2xl">
                    <div className="flex items-center gap-4">
                      <div className={`w-2 h-2 rounded-full ${agent.status === "Active" ? "bg-emerald-500 animate-pulse" : "bg-slate-300"}`} />
                      <div>
                        <h4 className="font-bold text-slate-800 text-sm">{agent.name}</h4>
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{agent.status}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-6 text-sm">
                      <div className="text-right">
                        <span className="block text-slate-400 text-xs">API Calls</span>
                        <span className="font-bold text-slate-700">{agent.calls}</span>
                      </div>
                      <div className="text-right">
                        <span className="block text-slate-400 text-xs">Avg Latency</span>
                        <span className="font-bold text-slate-700">{agent.latency}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeCategory === "rag" && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">Semantic Knowledge & RAG</h3>
                <p className="text-sm text-slate-500">Configure embedding models, vector indices, and tenant-scoped knowledge bases.</p>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-slate-50 border border-slate-100 p-6 rounded-2xl">
                  <Database className="w-6 h-6 text-indigo-500 mb-4" />
                  <h4 className="font-bold text-slate-800 mb-1">Vector Index</h4>
                  <p className="text-xs text-slate-500 mb-4">PostgreSQL + pgvector</p>
                  <span className="bg-emerald-100 text-emerald-700 font-bold text-xs px-2 py-1 rounded uppercase">Synced</span>
                </div>
                <div className="bg-slate-50 border border-slate-100 p-6 rounded-2xl">
                  <Brain className="w-6 h-6 text-blue-500 mb-4" />
                  <h4 className="font-bold text-slate-800 mb-1">Embedding Model</h4>
                  <p className="text-xs text-slate-500 mb-4">text-embedding-004</p>
                  <span className="bg-emerald-100 text-emerald-700 font-bold text-xs px-2 py-1 rounded uppercase">Active</span>
                </div>
              </div>
            </div>
          )}

          {activeCategory === "security" && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">Cognitive Firewall</h3>
                <p className="text-sm text-slate-500">Set boundaries for AI data access, PII redaction, and tenant isolation.</p>
              </div>
              <div className="space-y-3">
                {["Strict Tenant Isolation (Row-Level Policy enforced in queries)", "Automated PII Redaction (Social Security, Cards)", "Prompt Injection Filters"].map(rule => (
                  <div key={rule} className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl border border-slate-100">
                    <Shield className="w-4 h-4 text-emerald-500" />
                    <span className="text-sm font-bold text-slate-700">{rule}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeCategory === "ops" && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">Ops & Telemetry</h3>
                <p className="text-sm text-slate-500">Real-time metrics on token usage, costs, and cognitive request volumes.</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                 <div className="p-6 bg-slate-50 border border-slate-100 rounded-2xl">
                    <span className="block text-2xl font-black text-slate-900 mb-1">2.4M</span>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Tokens Today</span>
                 </div>
                 <div className="p-6 bg-slate-50 border border-slate-100 rounded-2xl">
                    <span className="block text-2xl font-black text-slate-900 mb-1">$4.12</span>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Est. Cost Today</span>
                 </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
