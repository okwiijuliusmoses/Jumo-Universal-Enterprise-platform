import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { ScrollText, Building, Loader2, BrainCircuit } from "lucide-react";
import { UEOSRuntimeClient } from "../../ueos/runtime/UEOSRuntimeClient";

export function NationalRegistryRenderer() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <div className="flex justify-center items-center h-96"><Loader2 className="w-8 h-8 animate-spin text-slate-700" /></div>;
  }

  return (
    <div className="space-y-12 animate-in fade-in duration-500 pb-20">
      <div className="bg-slate-900 rounded-[4rem] p-16 text-white relative overflow-hidden shadow-2xl border border-white/5">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(51,65,85,0.1),transparent)]" />
        <div className="relative z-10">
          <h2 className="text-5xl font-black tracking-tighter uppercase italic mb-6">JUMO <span className="text-slate-400">National Registry</span></h2>
          <p className="text-slate-400 text-xl font-medium leading-relaxed max-w-2xl">
            Sovereign trusted registries for institutions, professionals, assets, and businesses.
          </p>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-[4rem] p-12 shadow-sm">
         <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-10">Trusted Registries</h4>
         <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {["Institutions", "Businesses", "Professionals", "Assets"].map((reg) => (
                <div key={reg} className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 text-center">
                    <ScrollText className="w-10 h-10 text-slate-700 mx-auto mb-6" />
                    <span className="text-lg font-black text-slate-900 italic">{reg}</span>
                </div>
            ))}
         </div>
      </div>
    </div>
  );
}
