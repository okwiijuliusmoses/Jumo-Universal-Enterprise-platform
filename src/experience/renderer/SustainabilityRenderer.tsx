import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Leaf, BarChart2, Loader2, BrainCircuit } from "lucide-react";
import { UEOSRuntimeClient } from "../../ueos/runtime/UEOSRuntimeClient";

export function SustainabilityRenderer() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <div className="flex justify-center items-center h-96"><Loader2 className="w-8 h-8 animate-spin text-lime-700" /></div>;
  }

  const agents = [
    { name: "Sustainability Analyst AI", status: "Active" },
  ];

  return (
    <div className="space-y-12 animate-in fade-in duration-500 pb-20">
      <div className="bg-slate-900 rounded-[4rem] p-16 text-white relative overflow-hidden shadow-2xl border border-white/5">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(101,163,13,0.1),transparent)]" />
        <div className="relative z-10">
          <h2 className="text-5xl font-black tracking-tighter uppercase italic mb-6">JUMO <span className="text-lime-500">Sustainability</span></h2>
          <p className="text-slate-400 text-xl font-medium leading-relaxed max-w-2xl">
            Enterprise ESG compliance, carbon footprint monitoring, and energy optimization platform.
          </p>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-[4rem] p-12 shadow-sm text-center">
        <Leaf className="w-24 h-24 text-lime-700 mx-auto mb-8" />
        <h4 className="text-2xl font-black text-slate-900 tracking-tight italic mb-4">ESG Compliance Suite</h4>
        <p className="text-slate-500 max-w-xl mx-auto italic mb-10">
          Automated sustainability reporting and carbon emission tracking across all enterprise nodes.
        </p>
        <button className="py-5 px-10 bg-slate-900 text-white rounded-[2rem] font-black text-[10px] uppercase tracking-widest hover:bg-lime-700 transition-all">
          Configure ESG
        </button>
      </div>
    </div>
  );
}
