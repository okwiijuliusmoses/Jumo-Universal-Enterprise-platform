import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Workflow, Bot, Zap, Loader2, BrainCircuit } from "lucide-react";
import { UEOSRuntimeClient } from "../../ueos/runtime/UEOSRuntimeClient";

export function AutomationRenderer() {
  const [agents, setAgents] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-96 gap-4">
        <BrainCircuit className="w-10 h-10 text-amber-600 animate-pulse" />
        <span className="text-sm font-bold text-slate-500 uppercase tracking-widest">Activating Automation Workforce...</span>
      </div>
    );
  }

  return (
    <div className="space-y-12 animate-in fade-in duration-500 pb-20">
      <div className="bg-slate-900 rounded-[4rem] p-16 text-white relative overflow-hidden shadow-2xl border border-white/5">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(217,119,6,0.1),transparent)]" />
        <div className="relative z-10">
          <h2 className="text-5xl font-black tracking-tighter uppercase italic mb-6">JUMO <span className="text-amber-500">Automation</span></h2>
          <p className="text-slate-400 text-xl font-medium leading-relaxed max-w-2xl">
            Enterprise business process automation, robotic task orchestration, and intelligent workflow generation.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {agents.map((agent) => (
          <div key={agent.jumoName} className="bg-white border border-slate-200 rounded-[3rem] p-10 shadow-sm hover:shadow-2xl transition-all group flex items-center gap-8">
            <div className="w-20 h-20 bg-amber-50 text-amber-600 rounded-[2.5rem] flex items-center justify-center">
              <BrainCircuit className="w-10 h-10" />
            </div>
            <div>
                <h4 className="text-lg font-black text-slate-900 tracking-tight italic mb-1">{agent.displayName}</h4>
                <span className="text-[10px] font-black text-amber-600 uppercase tracking-widest block mb-4">{agent.status} • {agent.role}</span>
                <button className="py-3 px-6 bg-slate-900 text-white rounded-[2rem] font-black text-[10px] uppercase tracking-widest hover:bg-amber-600 transition-all">
                Configure
                </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
