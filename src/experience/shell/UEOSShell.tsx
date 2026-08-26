import React from "react";
import { motion } from "motion/react";
import { 
  Zap, School, BookOpen, GraduationCap, Church, Users, HeartPulse, Fingerprint,
  DollarSign, CreditCard, Lock, Landmark, ShieldCheck, BrainCircuit, Workflow, Cloud,
  LogOut, Activity
} from "lucide-react";
import { JumoMasterManifestRegistry } from "../../core/specification/manifests/masterManifestRegistry";

interface UEOSShellProps {
  user: {
    name: string;
    clearance: string;
    role: string;
  };
  onLogout: () => void;
}

export function UEOSShell({ user, onLogout }: UEOSShellProps) {
  const allManifests = JumoMasterManifestRegistry.getAll();

  const navigateTo = (path: string) => {
    window.history.pushState({}, "", path);
    window.dispatchEvent(new PopStateEvent("popstate"));
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-blue-100 selection:text-blue-900" id="ueos-hub-root">
      {/* 1. MINIMALIST HUB HEADER */}
      <header className="h-16 border-b border-slate-200 bg-white/80 backdrop-blur-md sticky top-0 z-50 px-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-slate-900 text-white rounded-xl flex items-center justify-center font-black text-sm shadow-lg shadow-slate-900/10">
            J
          </div>
          <div>
            <h1 className="text-sm font-black text-slate-900 tracking-tight leading-none">JUMO HUB</h1>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mt-0.5">Sovereign Enterprise Suite</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-black text-slate-900 leading-none">{user.name}</p>
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">{user.clearance} CLEARANCE</p>
          </div>
          <button
            onClick={onLogout}
            className="p-2 rounded-xl text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition-all cursor-pointer"
            title="Logout"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* 2. CENTRAL HUB GRID */}
      <main className="flex-1 max-w-6xl w-full mx-auto p-8 md:p-12 lg:p-20 space-y-16">
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter leading-[0.9]">
            Select Sovereign Application
          </h2>
          <p className="text-slate-500 font-medium text-lg">
            Access independent operating environments for national infrastructure.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {allManifests.map((manifest) => {
            let Icon = Zap;
            let color = "from-amber-500 to-amber-700";
            let shadow = "shadow-amber-500/20";
            let path = "/fintech";

            if (manifest.productId === "prod-national-identity") {
              Icon = Fingerprint;
              color = "from-indigo-500 to-indigo-700";
              shadow = "shadow-indigo-500/20";
              path = "/identity";
            } else if (manifest.productId === "prod-national-health") {
              Icon = HeartPulse;
              color = "from-rose-500 to-rose-700";
              shadow = "shadow-rose-500/20";
              path = "/health";
            } else if (manifest.productId === "prod-national-education") {
              Icon = GraduationCap;
              color = "from-blue-500 to-blue-700";
              shadow = "shadow-blue-500/20";
              path = "/education";
            } else if (manifest.productId === "prod-faap-product") {
              Icon = DollarSign;
              color = "from-emerald-500 to-emerald-700";
              shadow = "shadow-emerald-500/20";
              path = "/faap";
            } else if (manifest.productId.includes("fintech")) { 
              Icon = Zap;
              color = "from-amber-500 to-amber-700";
              shadow = "shadow-amber-500/20";
              path = "/fintech";
            } else if (manifest.productId.includes("nursery-primary")) {
              Icon = School;
              color = "from-emerald-500 to-emerald-700";
              shadow = "shadow-emerald-500/20";
              path = "/nursery-primary";
            } else if (manifest.productId.includes("secondary-school")) {
              Icon = BookOpen;
              color = "from-blue-600 to-blue-800";
              shadow = "shadow-blue-500/20";
              path = "/secondary-school";
            } else if (manifest.productId.includes("university-tertiary")) {
              Icon = GraduationCap;
              color = "from-purple-600 to-purple-800";
              shadow = "shadow-purple-500/20";
              path = "/university";
            } else if (manifest.productId.includes("church-faith")) {
              Icon = Church;
              color = "from-rose-600 to-rose-800";
              shadow = "shadow-rose-500/20";
              path = "/church";
            } else if (manifest.productId.includes("alumni-community")) {
              Icon = Users;
              color = "from-cyan-600 to-cyan-800";
              shadow = "shadow-cyan-500/20";
              path = "/alumni";
            }

            return (
              <motion.button
                key={manifest.productId}
                whileHover={{ y: -8, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigateTo(path)}
                className="bg-white border border-slate-200 rounded-[40px] p-8 md:p-10 text-left shadow-sm hover:shadow-2xl hover:border-slate-300 transition-all cursor-pointer group flex flex-col items-center text-center space-y-6"
              >
                <div className={`w-20 h-20 bg-gradient-to-br ${color} text-white rounded-3xl flex items-center justify-center shadow-xl ${shadow} group-hover:scale-110 transition-transform`}>
                  <Icon className="w-10 h-10" />
                </div>

                <div className="space-y-2">
                  <h3 className="text-2xl font-black text-slate-900 leading-tight">{manifest.productName}</h3>
                  <p className="text-sm text-slate-500 font-medium leading-relaxed line-clamp-2">
                    {manifest.productCode} • {manifest.directorates?.[0]?.name || "Sovereign Operating Environment"}
                  </p>
                </div>
              </motion.button>
            );
          })}
        </div>
      </main>

      {/* 3. SHARED PLATFORM FABRICS (SUBSTRATE) */}
      <footer className="p-8 md:p-12 bg-slate-100/50 border-t border-slate-200 space-y-8">
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">JUMO Kernel Substrate Platforms</h4>
            <div className="flex items-center gap-2 text-emerald-600">
              <Activity className="w-3 h-3 animate-pulse" />
              <span className="text-[9px] font-black tracking-widest uppercase">System Operational</span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
            {[
              { name: "FAAP", id: "faap", icon: DollarSign, color: "bg-emerald-100 text-emerald-700" },
              { name: "Pay", id: "digital-pay", icon: CreditCard, color: "bg-blue-100 text-blue-700" },
              { name: "Aegis", id: "aegis", icon: Lock, color: "bg-rose-100 text-rose-700" },
              { name: "Treasury", id: "treasury", icon: Landmark, color: "bg-amber-100 text-amber-700" },
              { name: "Audit", id: "digital-auditor", icon: ShieldCheck, color: "bg-teal-100 text-teal-700" },
              { name: "AI Mesh", id: "ai-hybrid", icon: BrainCircuit, color: "bg-purple-100 text-purple-700" },
              { name: "Workflow", id: "workflow", icon: Workflow, color: "bg-sky-100 text-sky-700" },
              { name: "Cloud", id: "cloud", icon: Cloud, color: "bg-slate-200 text-slate-600" }
            ].map(plat => {
              const PlatIcon = plat.icon;
              return (
                <button 
                  key={plat.name} 
                  onClick={() => navigateTo(`/${plat.id}`)}
                  className="flex flex-col items-center gap-2 group cursor-pointer focus:outline-none"
                >
                  <div className={`w-12 h-12 ${plat.color} rounded-2xl flex items-center justify-center transition-transform group-hover:-translate-y-1 group-hover:shadow-lg group-hover:shadow-current/20`}>
                    <PlatIcon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{plat.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </footer>
    </div>
  );
}
