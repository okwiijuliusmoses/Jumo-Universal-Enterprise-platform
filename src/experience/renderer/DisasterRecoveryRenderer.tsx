import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { ShieldAlert, RefreshCw, Database, Loader2, BrainCircuit } from "lucide-react";
import { UEOSRuntimeClient } from "../../ueos/runtime/UEOSRuntimeClient";

export function DisasterRecoveryRenderer() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <div className="flex justify-center items-center h-96"><Loader2 className="w-8 h-8 animate-spin text-rose-800" /></div>;
  }

  const agents = [
    { name: "Recovery Planner AI", status: "Active" },
    { name: "Infrastructure Guardian AI", status: "Operational" },
  ];

  return (
    <div className="space-y-12 animate-in fade-in duration-500 pb-20">
      <div className="bg-slate-900 rounded-[4rem] p-16 text-white relative overflow-hidden shadow-2xl border border-white/5">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(190,18,60,0.1),transparent)]" />
        <div className="relative z-10">
          <h2 className="text-5xl font-black tracking-tighter uppercase italic mb-6">JUMO <span className="text-rose-500">Disaster Recovery</span></h2>
          <p className="text-slate-400 text-xl font-medium leading-relaxed max-w-2xl">
            Sovereign national resilience platform, automated failover, and cryptographic backup verification.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {agents.map((agent) => (
          <div key={agent.name} className="bg-white border border-slate-200 rounded-[3rem] p-10 shadow-sm hover:shadow-2xl transition-all group flex items-center gap-8">
            <div className="w-20 h-20 bg-rose-50 text-rose-800 rounded-[2.5rem] flex items-center justify-center">
              <BrainCircuit className="w-10 h-10" />
            </div>
            <div>
                <h4 className="text-lg font-black text-slate-900 tracking-tight italic mb-1">{agent.name}</h4>
                <span className="text-[10px] font-black text-rose-800 uppercase tracking-widest block mb-4">{agent.status}</span>
                <button className="py-3 px-6 bg-slate-900 text-white rounded-[2rem] font-black text-[10px] uppercase tracking-widest hover:bg-rose-800 transition-all">
                Configure
                </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
