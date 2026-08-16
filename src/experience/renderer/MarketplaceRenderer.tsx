import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ShoppingBag, Package, Settings, Shield, Zap, Search, LayoutGrid, Loader2, Star, Filter,
  CheckCircle2, Download, ExternalLink, ArrowRight, Sparkles, Building2, BrainCircuit
} from "lucide-react";
import { UEOSRuntimeClient } from "../../ueos/runtime/UEOSRuntimeClient";
import { JumoAIAgentRegistry } from "../../core/ai/registry/JumoAIAgentRegistry";

export function MarketplaceRenderer({ onLaunchFactory }: { onLaunchFactory?: (templateId: string) => void }) {
  const agentCount = JumoAIAgentRegistry.getAllAgents().length;
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("ALL");
  const [installedApps, setInstalledApps] = useState<string[]>(["JUMO FAAP Enterprise", "AEGIS Threat Intel"]);
  const [installingApp, setInstallingApp] = useState<string | null>(null);
  const [selectedApp, setSelectedApp] = useState<any>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 400);
    return () => clearTimeout(timer);
  }, []);

  const apps = [
    { 
      id: "app-faap", 
      name: "JUMO FAAP Enterprise", 
      type: "Finance", 
      rating: 4.9, 
      icon: Package, 
      description: "Sovereign double-entry accounting ledger, real-time treasury clearing, and institutional audit trail.",
      version: "v5.2.0",
      category: "Finance"
    },
    { 
      id: "app-auditor", 
      name: "Digital Auditor", 
      type: "Security", 
      rating: 4.8, 
      icon: Shield, 
      description: "Cryptographic state verification and immutable compliance logging for sovereign cloud clusters.",
      version: "v4.1.0",
      category: "Security"
    },
    { 
      id: "app-aegis", 
      name: "AEGIS Threat Intel", 
      type: "Security", 
      rating: 5.0, 
      icon: Shield, 
      description: "Continuous AI perimeter defense, intrusion analysis, and automated quarantine orchestration.",
      version: "v3.8.0",
      category: "Security"
    },
    { 
      id: "app-mfg", 
      name: "JUMO Mobile Factory", 
      type: "Dev", 
      rating: 4.7, 
      icon: Zap, 
      description: "Rapid mobile product generator with cross-platform React Native and PWA packaging pipelines.",
      version: "v2.4.0",
      category: "Development"
    },
    { 
      id: "app-gov-erp", 
      name: "Sovereign Governance Suite", 
      type: "Governance", 
      rating: 4.9, 
      icon: Building2, 
      description: "Cabinet & senate legislative workflow engine, digital signature vaults, and policy gazettes.",
      version: "v5.0.0",
      category: "Governance"
    },
    { 
      id: "app-ai-swarm", 
      name: "Cognitive Workforce Swarm", 
      type: "AI", 
      rating: 5.0, 
      icon: BrainCircuit, 
      description: `${agentCount}+ specialized JUMO GPT cognitive engineering agents with auto-repair and multi-model synthesis.`,
      version: "v6.0.0",
      category: "AI"
    }
  ];

  const handleInstall = async (appName: string) => {
    setInstallingApp(appName);
    try {
      await new Promise(res => setTimeout(res, 800));
      setInstalledApps(prev => prev.includes(appName) ? prev : [...prev, appName]);
    } finally {
      setInstallingApp(null);
    }
  };

  const filteredApps = apps.filter(app => {
    const matchesSearch = app.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          app.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = categoryFilter === "ALL" || app.category === categoryFilter;
    return matchesSearch && matchesCat;
  });

  if (isLoading) {
    return <div className="flex justify-center items-center h-96"><Loader2 className="w-8 h-8 animate-spin text-blue-600" /></div>;
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      {/* Hero Header */}
      <div className="bg-slate-900 rounded-3xl p-10 text-white relative overflow-hidden shadow-2xl border border-white/5">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(59,130,246,0.1),transparent)]" />
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold uppercase tracking-wider mb-4 border border-blue-500/30">
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Sovereign App Ecosystem</span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-black tracking-tight uppercase mb-3">JUMO <span className="text-blue-500">Marketplace</span></h2>
          <p className="text-slate-400 text-sm md:text-base font-medium leading-relaxed">
            Discover, install, and manage verified sovereign JUMO platforms, AI cognitive agents, and industrial extensions.
          </p>
        </div>
      </div>

      {/* Search & Filtering Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search verified extensions, tools, AI agents..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-xs font-bold text-slate-800 outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
          {["ALL", "Finance", "Security", "Development", "Governance", "AI"].map(cat => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                categoryFilter === cat
                  ? "bg-slate-900 text-white shadow-xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Apps */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredApps.map((app) => {
          const isInstalled = installedApps.includes(app.name);
          const isBusy = installingApp === app.name;

          return (
            <div key={app.name} className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center shadow-xs">
                    <app.icon className="w-6 h-6" />
                  </div>
                  <div className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-lg border border-amber-100">
                    <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                    <span className="text-xs font-black text-amber-900">{app.rating}</span>
                  </div>
                </div>

                <h4 className="text-base font-black text-slate-900 tracking-tight mb-1">{app.name}</h4>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md uppercase tracking-wider">{app.type}</span>
                  <span className="text-[10px] font-mono text-slate-400">{app.version}</span>
                </div>
                <p className="text-xs text-slate-500 font-medium leading-relaxed mb-6">
                  {app.description}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100">
                {isInstalled ? (
                  <button 
                    onClick={() => onLaunchFactory?.(app.id)}
                    className="w-full py-2.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-emerald-100 transition-all cursor-pointer"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Installed • Launch</span>
                  </button>
                ) : (
                  <button 
                    onClick={() => handleInstall(app.name)}
                    disabled={isBusy}
                    className="w-full py-2.5 bg-slate-900 hover:bg-blue-600 text-white rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
                  >
                    {isBusy ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Verifying & Installing...</span>
                      </>
                    ) : (
                      <>
                        <Download className="w-4 h-4" />
                        <span>Install Sovereign Package</span>
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

