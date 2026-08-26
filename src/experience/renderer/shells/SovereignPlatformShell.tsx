import React from "react";
import { motion } from "motion/react";
import { ArrowLeft, Box, Shield, CreditCard, PieChart, Search, Brain, Zap, HardDrive } from "lucide-react";

interface SovereignPlatformShellProps {
  platformId: string;
  onBack: () => void;
}

const PLATFORM_METADATA: Record<string, { title: string; icon: any; color: string; description: string }> = {
  "faap": { 
    title: "JUMO FAAP", 
    icon: PieChart, 
    color: "text-blue-600", 
    description: "Financial Accounting & Double-Entry Ledger Engine" 
  },
  "digital-pay": { 
    title: "JUMO Digital Pay", 
    icon: CreditCard, 
    color: "text-emerald-600", 
    description: "Universal Payment Switch & Settlement Engine" 
  },
  "aegis": { 
    title: "JUMO Aegis", 
    icon: Shield, 
    color: "text-red-600", 
    description: "Zero-Trust Security & Identity Platform" 
  },
  "treasury": { 
    title: "JUMO Treasury", 
    icon: Box, 
    color: "text-amber-600", 
    description: "Automated Treasury & Liquidity Engine" 
  },
  "digital-auditor": { 
    title: "JUMO Digital Auditor", 
    icon: Search, 
    color: "text-indigo-600", 
    description: "Digital Forensic Audit & Compliance Evidence" 
  },
  "ai-hybrid": { 
    title: "JUMO AI Digital Hybrid", 
    icon: Brain, 
    color: "text-purple-600", 
    description: "Cognitive AI Mesh & Agent Swarm Gateway" 
  },
  "workflow": { 
    title: "JUMO Workflow Engine", 
    icon: Zap, 
    color: "text-orange-600", 
    description: "Business Process Automation & State Transitions" 
  },
  "cloud": { 
    title: "JUMO Cloud / Infrastructure", 
    icon: HardDrive, 
    color: "text-slate-600", 
    description: "Infrastructure Telemetry & Container Health" 
  }
};

export const SovereignPlatformShell: React.FC<SovereignPlatformShellProps> = ({ platformId, onBack }) => {
  const metadata = PLATFORM_METADATA[platformId] || { 
    title: "Sovereign Platform", 
    icon: Box, 
    color: "text-gray-600", 
    description: "JUMO Independent Shared Platform" 
  };

  const Icon = metadata.icon;

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Platform Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-500"
            id={`platform-back-${platformId}`}
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-xl bg-white shadow-sm border border-slate-100 ${metadata.color}`}>
              <Icon className="w-6 h-6" />
            </div>
            <div>
              <h1 className="font-bold text-xl tracking-tight">{metadata.title}</h1>
              <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">{metadata.description}</p>
            </div>
          </div>
        </div>
      </header>

      {/* Independent Platform Workspace */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {/* Platform Capabilities would be mapped here from Registry */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center justify-center text-center space-y-4">
            <div className={`p-4 rounded-full bg-slate-50 ${metadata.color}`}>
              <Icon className="w-12 h-12" />
            </div>
            <h2 className="text-2xl font-bold">Platform Initialized</h2>
            <p className="text-slate-500 max-w-xs">
              The {metadata.title} sovereign workspace is operational and ready for capability mounting.
            </p>
          </div>
        </motion.div>
      </main>

      {/* Substrate Footer */}
      <footer className="fixed bottom-0 left-0 right-0 p-6 flex justify-center pointer-events-none">
        <div className="bg-white/80 backdrop-blur-md border border-white/20 shadow-2xl px-6 py-3 rounded-full pointer-events-auto">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
            JUMO Sovereign Substrate // UEOS Kernel 2.0.0
          </p>
        </div>
      </footer>
    </div>
  );
};
