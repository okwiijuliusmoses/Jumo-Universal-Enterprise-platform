import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { MessageSquare, Video, Megaphone, Loader2, BrainCircuit } from "lucide-react";
import { UEOSRuntimeClient } from "../../ueos/runtime/UEOSRuntimeClient";

export function CommunicationRenderer() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <div className="flex justify-center items-center h-96"><Loader2 className="w-8 h-8 animate-spin text-indigo-800" /></div>;
  }

  const agents = [
    { name: "Communication Assistant AI", status: "Active" },
    { name: "Translation AI", status: "Operational" },
    { name: "Meeting Summary AI", status: "Ready" },
  ];

  return (
    <div className="space-y-12 animate-in fade-in duration-500 pb-20">
      <div className="bg-slate-900 rounded-[4rem] p-16 text-white relative overflow-hidden shadow-2xl border border-white/5">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(67,56,202,0.1),transparent)]" />
        <div className="relative z-10">
          <h2 className="text-5xl font-black tracking-tighter uppercase italic mb-6">JUMO <span className="text-indigo-500">Communication</span></h2>
          <p className="text-slate-400 text-xl font-medium leading-relaxed max-w-2xl">
            Sovereign enterprise communication ecosystem, integrated messaging, and AI-powered collaboration tools.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {agents.map((agent) => (
          <div key={agent.name} className="bg-white border border-slate-200 rounded-[3rem] p-10 shadow-sm hover:shadow-2xl transition-all group flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-indigo-50 text-indigo-800 rounded-[2rem] flex items-center justify-center mb-8">
              <BrainCircuit className="w-8 h-8" />
            </div>
            <h4 className="text-lg font-black text-slate-900 tracking-tight italic mb-1">{agent.name}</h4>
            <span className="text-[10px] font-black text-indigo-800 uppercase tracking-widest block mb-4">{agent.status}</span>
            <button className="w-full py-4 bg-slate-900 text-white rounded-[2rem] font-black text-[10px] uppercase tracking-widest hover:bg-indigo-800 transition-all">
              Configure
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
