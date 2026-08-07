const fs = require('fs');

let content = `import React, { useState } from "react";
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
  Shield
} from "lucide-react";

export function SettingsRenderer() {
  const [isSaved, setIsSaved] = useState(false);
  const [activeCategory, setActiveCategory] = useState("gateway");

  const categories = [
    { id: "gateway", label: "AI Gateway Router", icon: Brain },
    { id: "models", label: "Model Registry", icon: Database },
    { id: "memory", label: "Semantic Memory", icon: MessageSquare },
    { id: "security", label: "Cognitive Firewall", icon: Shield },
    { id: "telemetry", label: "Execution Analytics", icon: Activity },
  ];

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      <div className="flex items-center justify-between mb-8 flex-shrink-0">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">AI Governance Center</h2>
          <p className="text-slate-500">Multi-model cognitive routing and AI gateway management.</p>
        </div>
        <button 
          onClick={handleSave}
          className={\`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold transition-all shadow-lg \${
            isSaved ? "bg-emerald-500 text-white shadow-emerald-100" : "bg-slate-900 text-white shadow-slate-200 hover:bg-slate-800"
          }\`}
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
              className={\`w-full flex items-center justify-between p-4 rounded-2xl transition-all \${
                activeCategory === cat.id 
                  ? "bg-white border border-slate-100 text-slate-900 font-bold shadow-sm ring-1 ring-slate-50" 
                  : "text-slate-500 hover:bg-white/50 hover:text-slate-700"
              }\`}
            >
              <div className="flex items-center gap-3">
                <cat.icon className={\`w-4 h-4 \${activeCategory === cat.id ? "text-blue-600" : "text-slate-400"}\`} />
                <span className="text-sm truncate">{cat.label}</span>
              </div>
            </button>
          ))}
        </div>
        
        <div className="lg:col-span-3 bg-white rounded-3xl border border-slate-100 shadow-sm p-10 overflow-y-auto">
          {activeCategory === "gateway" && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">Cognitive Gateway Routing</h3>
                <p className="text-sm text-slate-500">Manage LLM vendor fallback strategies and semantic routing rules.</p>
              </div>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Primary Model Engine</label>
                    <select className="w-full bg-slate-50 border border-slate-100 p-3 rounded-xl text-sm font-medium outline-none focus:ring-2 focus:ring-blue-100 transition-all">
                      <option>Gemini 1.5 Pro (Google)</option>
                      <option>Gemini 1.5 Flash (Google)</option>
                      <option>Legacy Text Bison</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Fallback Engine</label>
                    <select className="w-full bg-slate-50 border border-slate-100 p-3 rounded-xl text-sm font-medium outline-none focus:ring-2 focus:ring-blue-100 transition-all">
                      <option>Gemini 1.5 Flash (Google)</option>
                      <option>None (Fail Fast)</option>
                    </select>
                  </div>
                </div>
                
                <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="text-sm font-bold text-slate-800">Dynamic Task Routing</h4>
                      <p className="text-xs text-slate-500">Route complex queries to Pro and simple queries to Flash automatically.</p>
                    </div>
                    <div className="w-12 h-6 bg-blue-600 rounded-full relative flex items-center px-1">
                       <div className="w-4 h-4 bg-white rounded-full ml-auto shadow-sm" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeCategory !== "gateway" && (
            <div className="h-full flex flex-col items-center justify-center text-center p-20 animate-in fade-in duration-300">
               <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center text-slate-300 mb-6">
                  {React.createElement(categories.find(c => c.id === activeCategory)?.icon || Brain, { className: "w-10 h-10" })}
               </div>
               <h3 className="text-xl font-bold text-slate-800 mb-2">{categories.find(c => c.id === activeCategory)?.label}</h3>
               <p className="text-slate-500 max-w-sm">
                  This cognitive subsystem is managed by the JUMO AI Gateway. 
                  Direct modifications are restricted to Sovereign AI Administrators.
               </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
`;
fs.writeFileSync('src/experience/renderer/SettingsRenderer.tsx', content);
