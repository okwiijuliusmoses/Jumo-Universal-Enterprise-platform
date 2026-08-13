import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { 
  Network, Key, Shield, Globe, Terminal, Loader2, ArrowRight
} from "lucide-react";
import { UEOSRuntimeClient } from "../../ueos/runtime/UEOSRuntimeClient";

export function APIManagementRenderer() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <div className="flex justify-center items-center h-96"><Loader2 className="w-8 h-8 animate-spin text-cyan-600" /></div>;
  }

  const apis = [
    { name: "National Treasury API", status: "Active", calls: "2.4M" },
    { name: "SACCO Ledger API", status: "Active", calls: "850K" },
    { name: "Digital Pay Gateway", status: "Maintenance", calls: "1.1M" },
  ];

  return (
    <div className="space-y-12 animate-in fade-in duration-500 pb-20">
      <div className="bg-slate-900 rounded-[4rem] p-16 text-white relative overflow-hidden shadow-2xl border border-white/5">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(6,182,212,0.1),transparent)]" />
        <div className="relative z-10">
          <h2 className="text-5xl font-black tracking-tighter uppercase italic mb-6">JUMO <span className="text-cyan-500">API Gateway</span></h2>
          <p className="text-slate-400 text-xl font-medium leading-relaxed max-w-2xl">
            Secure, scalable, and sovereign integration interface for national institutions and third-party partners.
          </p>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-[4rem] p-12 shadow-sm">
         <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-10">Registered API Services</h4>
         <div className="space-y-6">
            {apis.map((api) => (
              <div key={api.name} className="flex items-center justify-between p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 bg-white border border-slate-200 rounded-2xl flex items-center justify-center">
                    <Network className="w-8 h-8 text-cyan-600" />
                  </div>
                  <div>
                    <span className="text-xl font-black text-slate-900 block italic">{api.name}</span>
                    <span className="text-[10px] font-black text-cyan-600 uppercase tracking-widest">{api.status}</span>
                  </div>
                </div>
                <div className="text-right">
                   <span className="text-2xl font-black text-slate-900 block italic">{api.calls}</span>
                   <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Calls / Day</span>
                </div>
              </div>
            ))}
         </div>
      </div>
    </div>
  );
}
