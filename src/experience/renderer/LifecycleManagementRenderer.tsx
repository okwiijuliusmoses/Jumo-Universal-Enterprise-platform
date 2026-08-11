import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  GitBranch, Beaker, Award, Package, Factory, Truck, Cloud, Activity, 
  ArrowUpCircle, Wrench, Trash2, Archive, ChevronRight, Search, Filter, 
  Clock, CheckCircle2, AlertCircle, Play, MoreVertical, Settings, Shield, Cpu
} from "lucide-react";

type LifecycleStage = 
  | "Development" | "Testing" | "Certification" | "Release" 
  | "Manufacturing" | "Provisioning" | "Deployment" | "Monitoring" 
  | "Upgrade" | "Maintenance" | "Retirement" | "Archival";

interface LifecycleProject {
  id: string;
  name: string;
  type: "Platform" | "Module" | "Extension";
  stage: LifecycleStage;
  version: string;
  health: number;
  lastUpdated: string;
  owner: string;
}

export function LifecycleManagementRenderer() {
  const [selectedStage, setSelectedStage] = useState<LifecycleStage | "All">("All");
  const [searchQuery, setSearchQuery] = useState("");

  const stages: { stage: LifecycleStage; icon: any; color: string; description: string }[] = [
    { stage: "Development", icon: GitBranch, color: "blue", description: "Active architectural engineering and module construction." },
    { stage: "Testing", icon: Beaker, color: "indigo", description: "Automated regression, load, and security penetration testing." },
    { stage: "Certification", icon: Award, color: "emerald", description: "Sovereign compliance and AEGIS security certification." },
    { stage: "Release", icon: Package, color: "purple", description: "Versioning, changelog finalization, and artifact tagging." },
    { stage: "Manufacturing", icon: Factory, color: "violet", description: "Enterprise factory assembly and blueprint normalization." },
    { stage: "Provisioning", icon: Truck, color: "sky", description: "Infrastructure allocation and environment bootstrapping." },
    { stage: "Deployment", icon: Cloud, color: "cyan", description: "Live production roll-out and traffic orchestration." },
    { stage: "Monitoring", icon: Activity, color: "rose", description: "Real-time telemetry, log auditing, and performance tracking." },
    { stage: "Upgrade", icon: ArrowUpCircle, color: "amber", description: "Patch management, migration, and feature roll-forward." },
    { stage: "Maintenance", icon: Wrench, color: "slate", description: "Optimization, bug fixing, and technical debt resolution." },
    { stage: "Retirement", icon: Trash2, color: "orange", description: "Deprecation notice, traffic draining, and sunsetting." },
    { stage: "Archival", icon: Archive, color: "zinc", description: "Permanent storage of state, data, and source history." },
  ];

  const projects: LifecycleProject[] = [
    { id: "1", name: "JUMO SACCO ERP", type: "Platform", stage: "Monitoring", version: "v5.2.1", health: 98, lastUpdated: "2m ago", owner: "FinTech Directorate" },
    { id: "2", name: "AEGIS Threat Engine", type: "Module", stage: "Upgrade", version: "v12.0.4", health: 100, lastUpdated: "15m ago", owner: "SecOps Command" },
    { id: "3", name: "National Edu-Core", type: "Platform", stage: "Testing", version: "v4.0.0-rc", health: 85, lastUpdated: "1h ago", owner: "Education Ministry" },
    { id: "4", name: "FAAP Ledger V2", type: "Module", stage: "Development", version: "v2.0.0-alpha", health: 100, lastUpdated: "5s ago", owner: "Treasury Directorate" },
    { id: "5", name: "HealthCare Connect", type: "Platform", stage: "Certification", version: "v3.1.0", health: 92, lastUpdated: "4h ago", owner: "Health Ministry" },
    { id: "6", name: "Logistics Gateway", type: "Extension", stage: "Archival", version: "v1.4.0", health: 0, lastUpdated: "12d ago", owner: "Trade Authority" },
    { id: "7", name: "AI Reasoning Core", type: "Module", stage: "Manufacturing", version: "v0.9.0", health: 100, lastUpdated: "10m ago", owner: "AI Command Center" },
    { id: "8", name: "Mobile Money Bridge", type: "Extension", stage: "Provisioning", version: "v2.2.0", health: 100, lastUpdated: "30m ago", owner: "Telecom Authority" },
  ];

  const filteredProjects = projects.filter(p => {
    const matchesStage = selectedStage === "All" || p.stage === selectedStage;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         p.type.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStage && matchesSearch;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-800 text-[10px] font-black uppercase tracking-widest">
              Lifecycle Governance
            </span>
            <span className="text-xs font-bold text-slate-400">Enterprise Product Lifecycle Management (PLM)</span>
          </div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Platform Lifecycle Center</h2>
          <p className="text-slate-500 font-medium mt-1">
            End-to-end management of sovereign platforms from development to archival.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-slate-100 p-1.5 rounded-2xl flex items-center text-xs font-bold text-slate-600 gap-1">
            <Clock className="w-4 h-4 text-indigo-600 ml-2" />
            <span className="px-3 py-1.5 bg-white text-slate-900 rounded-xl shadow-sm">{projects.length} Tracked Objects</span>
          </div>
        </div>
      </div>

      {/* Lifecycle Navigation Ribbon */}
      <div className="overflow-x-auto pb-4 -mx-2 px-2 scrollbar-hide">
        <div className="flex items-center gap-3 min-w-max">
          <button
            onClick={() => setSelectedStage("All")}
            className={`px-4 py-2.5 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${
              selectedStage === "All" 
                ? "bg-slate-900 text-white shadow-lg" 
                : "bg-white border border-slate-200 text-slate-500 hover:bg-slate-50"
            }`}
          >
            All Stages
          </button>
          <div className="h-8 w-px bg-slate-200 mx-2" />
          {stages.map((s) => {
            const Icon = s.icon;
            const isActive = selectedStage === s.stage;
            const colorClasses: Record<string, string> = {
              blue: "text-blue-600 bg-blue-50 border-blue-100",
              indigo: "text-indigo-600 bg-indigo-50 border-indigo-100",
              emerald: "text-emerald-600 bg-emerald-50 border-emerald-100",
              purple: "text-purple-600 bg-purple-50 border-purple-100",
              violet: "text-violet-600 bg-violet-50 border-violet-100",
              sky: "text-sky-600 bg-sky-50 border-sky-100",
              cyan: "text-cyan-600 bg-cyan-50 border-cyan-100",
              rose: "text-rose-600 bg-rose-50 border-rose-100",
              amber: "text-amber-600 bg-amber-50 border-amber-100",
              slate: "text-slate-600 bg-slate-50 border-slate-100",
              orange: "text-orange-600 bg-orange-50 border-orange-100",
              zinc: "text-zinc-600 bg-zinc-50 border-zinc-100"
            };

            const activeColorClasses: Record<string, string> = {
              blue: "bg-blue-600 text-white border-blue-600 shadow-blue-200",
              indigo: "bg-indigo-600 text-white border-indigo-600 shadow-indigo-200",
              emerald: "bg-emerald-600 text-white border-emerald-600 shadow-emerald-200",
              purple: "bg-purple-600 text-white border-purple-600 shadow-purple-200",
              violet: "bg-violet-600 text-white border-violet-600 shadow-violet-200",
              sky: "bg-sky-600 text-white border-sky-600 shadow-sky-200",
              cyan: "bg-cyan-600 text-white border-cyan-600 shadow-cyan-200",
              rose: "bg-rose-600 text-white border-rose-600 shadow-rose-200",
              amber: "bg-amber-600 text-white border-amber-600 shadow-amber-200",
              slate: "bg-slate-600 text-white border-slate-600 shadow-slate-200",
              orange: "bg-orange-600 text-white border-orange-600 shadow-orange-200",
              zinc: "bg-zinc-600 text-white border-zinc-600 shadow-zinc-200"
            };

            return (
              <button
                key={s.stage}
                onClick={() => setSelectedStage(s.stage)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest border transition-all shadow-sm ${
                  isActive 
                    ? activeColorClasses[s.color]
                    : `bg-white border-slate-200 text-slate-500 hover:bg-slate-50`
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? "text-white" : colorClasses[s.color].split(' ')[0]}`} />
                {s.stage}
              </button>
            );
          })}
        </div>
      </div>

      {/* Stage Detail Context */}
      {selectedStage !== "All" && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 bg-slate-900 text-white rounded-3xl shadow-xl flex items-center justify-between"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
              {React.createElement(stages.find(s => s.stage === selectedStage)?.icon || Package, { className: "w-6 h-6" })}
            </div>
            <div>
              <h3 className="text-xl font-black">{selectedStage} Operations</h3>
              <p className="text-slate-400 text-xs font-bold mt-0.5">{stages.find(s => s.stage === selectedStage)?.description}</p>
            </div>
          </div>
          <div className="flex gap-3">
            <button className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-xl text-xs font-bold transition-all flex items-center gap-2">
              <Settings className="w-3.5 h-3.5" /> Stage Config
            </button>
            <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shadow-lg shadow-indigo-600/20">
              <Play className="w-3.5 h-3.5 fill-current" /> Initialize Workflow
            </button>
          </div>
        </motion.div>
      )}

      {/* Project Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all overflow-hidden"
            >
              <div className="p-5 flex items-center justify-between border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-xl ${
                    project.type === "Platform" ? "bg-blue-100 text-blue-700" :
                    project.type === "Module" ? "bg-purple-100 text-purple-700" :
                    "bg-amber-100 text-amber-700"
                  }`}>
                    {project.type === "Platform" ? <Cpu className="w-4 h-4" /> :
                     project.type === "Module" ? <Shield className="w-4 h-4" /> :
                     <Truck className="w-4 h-4" />}
                  </div>
                  <div>
                    <h4 className="text-lg font-black text-slate-900 tracking-tight">{project.name}</h4>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{project.type} • {project.version}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Health</span>
                    <span className={`text-xs font-black ${
                      project.health > 90 ? "text-emerald-600" :
                      project.health > 70 ? "text-amber-600" :
                      "text-rose-600"
                    }`}>{project.health}%</span>
                  </div>
                  <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-400">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active Stage</span>
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 bg-slate-900 text-white rounded-lg text-[10px] font-black uppercase tracking-widest">
                        {project.stage}
                      </span>
                      <ChevronRight className="w-3 h-3 text-slate-300" />
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Next: {stages[(stages.findIndex(s => s.stage === project.stage) + 1) % stages.length].stage}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Last Activity</span>
                    <span className="text-xs font-bold text-slate-700">{project.lastUpdated}</span>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Sovereign Owner</span>
                    <span className="text-xs font-bold text-slate-700">{project.owner}</span>
                  </div>
                  <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-blue-600 h-full w-[65%] rounded-full" />
                  </div>
                  <div className="flex justify-between mt-1.5">
                    <span className="text-[9px] font-bold text-slate-500">Stage Progress</span>
                    <span className="text-[9px] font-black text-blue-600">65%</span>
                  </div>
                </div>
              </div>

              <div className="px-5 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                <button className="text-xs font-black text-indigo-600 hover:text-indigo-700 flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5" /> Full Audit Log
                </button>
                <button className="px-4 py-2 bg-white border border-slate-200 text-slate-900 text-xs font-black rounded-xl hover:bg-slate-50 transition-all shadow-sm">
                  Command Workspace
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
