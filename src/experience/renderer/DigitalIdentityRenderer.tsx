import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Users, Fingerprint, Lock, Loader2, BrainCircuit } from "lucide-react";
import { UEOSRuntimeClient } from "../../ueos/runtime/UEOSRuntimeClient";

export function DigitalIdentityRenderer() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <div className="flex justify-center items-center h-96"><Loader2 className="w-8 h-8 animate-spin text-sky-600" /></div>;
  }

  return (
    <div className="space-y-12 animate-in fade-in duration-500 pb-20">
      <div className="bg-slate-900 rounded-[4rem] p-16 text-white relative overflow-hidden shadow-2xl border border-white/5">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(2,132,199,0.1),transparent)]" />
        <div className="relative z-10">
          <h2 className="text-5xl font-black tracking-tighter uppercase italic mb-6">JUMO <span className="text-sky-500">Identity</span></h2>
          <p className="text-slate-400 text-xl font-medium leading-relaxed max-w-2xl">
            Sovereign digital identity management for enterprises, citizens, and autonomous AI agents.
          </p>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-[4rem] p-12 shadow-sm text-center">
        <Fingerprint className="w-24 h-24 text-sky-600 mx-auto mb-8" />
        <h4 className="text-2xl font-black text-slate-900 tracking-tight italic mb-4">Zero-Trust Identity Fabric</h4>
        <p className="text-slate-500 max-w-xl mx-auto italic mb-10">
          Unified SSO, biometric verification, and cryptographic identity issuance across all JUMO platforms.
        </p>
        <button className="py-5 px-10 bg-slate-900 text-white rounded-[2rem] font-black text-[10px] uppercase tracking-widest hover:bg-sky-600 transition-all">
          Manage Identities
        </button>
      </div>
    </div>
  );
}
