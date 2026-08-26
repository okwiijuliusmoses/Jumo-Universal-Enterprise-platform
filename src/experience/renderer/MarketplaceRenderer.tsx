import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { 
  ShoppingBag, Package, Settings, Shield, Zap, Search, LayoutGrid, Loader2, Star, Filter
} from "lucide-react";
import { UEOSRuntimeClient } from "../../ueos/runtime/UEOSRuntimeClient";

export function MarketplaceRenderer() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <div className="flex justify-center items-center h-96"><Loader2 className="w-8 h-8 animate-spin text-blue-600" /></div>;
  }

  const apps = [
    { name: "JUMO FAAP Enterprise", type: "Finance", rating: 4.9, icon: Package },
    { name: "Digital Auditor", type: "Security", rating: 4.8, icon: Shield },
    { name: "AEGIS Threat Intel", type: "Security", rating: 5.0, icon: Shield },
    { name: "JUMO Mobile Factory", type: "Dev", rating: 4.7, icon: Zap },
  ];

  return (
    <div className="space-y-12 animate-in fade-in duration-500 pb-20">
      <div className="bg-slate-900 rounded-[4rem] p-16 text-white relative overflow-hidden shadow-2xl border border-white/5">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(59,130,246,0.1),transparent)]" />
        <div className="relative z-10">
          <h2 className="text-5xl font-black tracking-tighter uppercase italic mb-6">JUMO <span className="text-blue-500">Marketplace</span></h2>
          <p className="text-slate-400 text-xl font-medium leading-relaxed max-w-2xl">
            Discover, install, and manage sovereign JUMO platforms, AI agents, and industrial extensions.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {apps.map((app) => (
          <div key={app.name} className="bg-white border border-slate-200 rounded-[3rem] p-10 shadow-sm hover:shadow-2xl transition-all group">
            <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-[2rem] flex items-center justify-center mb-8">
              <app.icon className="w-8 h-8" />
            </div>
            <h4 className="text-lg font-black text-slate-900 tracking-tight italic mb-1">{app.name}</h4>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-4">{app.type}</span>
            <div className="flex items-center gap-1 mb-8">
               <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
               <span className="text-xs font-black">{app.rating}</span>
            </div>
            <button className="w-full py-4 bg-slate-900 text-white rounded-[2rem] font-black text-[10px] uppercase tracking-widest hover:bg-blue-600 transition-all">
              Install
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
