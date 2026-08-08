import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Plus, Database, Shield, ChevronRight, Cpu, Activity, Globe, Settings, HardDrive, Search,
  Filter, CheckCircle2, AlertCircle, PauseCircle, Archive, Trash2, ExternalLink, Users,
  Layers, FileText, X, Building2, BrainCircuit, Workflow, Lock, ArrowRight, Palette, Fingerprint, Network, Key, RefreshCcw, Zap
} from "lucide-react";
import { UEOSRuntimeClient } from "../../ueos/runtime/UEOSRuntimeClient";

export function PlatformInstanceRenderer({ 
  onSelectInstance,
  onLaunchFactory 
}: { 
  onSelectInstance: (instance: any) => void;
  onLaunchFactory?: () => void; 
}) {
  const [instances, setInstances] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [selectedInstanceForOps, setSelectedInstanceForOps] = useState<any>(null);
  const [activeConfigTab, setActiveConfigTab] = useState<"lifecycle" | "identity" | "branding" | "security" | "api">("lifecycle");

  const defaultInstitutions = [
    {
      id: "inst-abc-uni",
      name: "ABC National University",
      domain: "abc.jumo.net",
      platform: "University National ERP",
      ecosystem: "Education",
      country: "Uganda",
      status: "Active",
      usersCount: "15,000",
      modulesCount: 245,
      aiAgentsCount: 30,
      workflowsCount: 420,
      databaseStatus: "PostgreSQL - Healthy",
      securityProfile: "AEGIS Zero-Trust Active",
      lastAudit: "Today, 04:12"
    },
    // ... other defaults
  ];

  const loadInstances = async () => {
    setIsLoading(true);
    try {
      const data = await UEOSRuntimeClient.fetchInstances();
      setInstances(data && data.length > 0 ? data : defaultInstitutions);
    } catch (err) {
      setInstances(defaultInstitutions);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadInstances();
    const handleSync = () => {
      loadInstances();
    };
    window.addEventListener("ueos_registry_sync", handleSync);
    return () => {
      window.removeEventListener("ueos_registry_sync", handleSync);
    };
  }, []);

  const handleUpdateStatus = async (instanceId: string, newStatus: string) => {
    // Logic to update status
    setInstances(prev => prev.map(i => i.id === instanceId ? { ...i, status: newStatus } : i));
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-96 gap-4">
        <Cpu className="w-10 h-10 text-blue-600 animate-spin" />
        <span className="text-sm font-black text-slate-500 uppercase tracking-widest italic">Querying National Instance Registry...</span>
      </div>
    );
  }

  const filteredInstances = instances.filter(inst => {
    const matchesSearch = searchQuery === "" || inst.name?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "ALL" || (inst.status || "Active").toUpperCase() === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const configTabs = [
    { id: "lifecycle", label: "Lifecycle", icon: RefreshCcw },
    { id: "identity", label: "Identity", icon: Fingerprint },
    { id: "branding", label: "Branding", icon: Palette },
    { id: "security", label: "Security", icon: Shield },
    { id: "api", label: "API Gateway", icon: Network }
  ];

  return (
    <div className="space-y-10 animate-in fade-in duration-500 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-200 pb-10">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-[10px] font-black uppercase tracking-[0.2em]">
              Sovereign Instance Registry v5.2
            </span>
            <span className="text-xs font-bold text-slate-400 italic">Live Operational Nodes</span>
          </div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tighter italic">Enterprise <span className="text-blue-600">Instances</span></h2>
          <p className="text-slate-500 font-medium mt-1">Real-time management of deployed institutional platform instances across national cloud infrastructure.</p>
        </div>

        <button 
          onClick={onLaunchFactory}
          className="bg-blue-600 text-white px-8 py-4 rounded-[2rem] font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 shadow-2xl shadow-blue-200 hover:bg-slate-900 transition-all shrink-0"
        >
          <Plus className="w-5 h-5" />
          Manufacture New Platform
        </button>
      </div>

      {/* Filter & Search */}
      <div className="flex flex-col lg:flex-row items-center gap-6 bg-white p-6 rounded-[3rem] border border-slate-200 shadow-sm">
        <div className="relative flex-1 w-full">
          <Search className="w-6 h-6 absolute left-6 top-4 text-slate-300" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search deployed institutions, domains, or instance IDs..."
            className="w-full pl-16 pr-8 py-4 bg-slate-50 border border-slate-100 rounded-[2rem] text-sm font-black outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all placeholder:text-slate-300 italic"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full lg:w-auto pb-2 lg:pb-0 scrollbar-hide">
          {["ALL", "ACTIVE", "CONFIGURING", "SUSPENDED", "MAINTENANCE"].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all shrink-0 ${
                statusFilter === status 
                  ? "bg-slate-900 text-white shadow-xl" 
                  : "bg-slate-100 text-slate-500 hover:bg-white hover:border hover:border-slate-200"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Instances Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {filteredInstances.map((inst) => (
          <motion.div
            key={inst.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-[3rem] border border-slate-200 shadow-sm hover:shadow-2xl hover:border-blue-400 transition-all overflow-hidden flex flex-col group"
          >
            <div className="p-10 border-b border-slate-50 bg-slate-50/30 flex items-start justify-between">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                    <div className="w-2 h-2 bg-emerald-600 rounded-full animate-pulse" /> {inst.status || "Active"}
                  </span>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{inst.country || "National"}</span>
                </div>
                <h3 className="text-3xl font-black text-slate-900 tracking-tight italic">{inst.name}</h3>
                <div className="flex items-center gap-4 mt-2">
                  <span className="text-xs font-black text-blue-600 flex items-center gap-2 group-hover:underline cursor-pointer">
                    <Globe className="w-4 h-4" /> {inst.domain}
                  </span>
                  <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">ID: {inst.id}</span>
                </div>
              </div>
              <div className="w-16 h-16 bg-white border border-slate-100 rounded-3xl flex items-center justify-center text-blue-600 shadow-sm">
                <Building2 className="w-8 h-8" />
              </div>
            </div>

            <div className="p-10 flex-1 space-y-8">
              <div className="grid grid-cols-4 gap-4">
                {[
                  { label: "Users", val: inst.usersCount || "12.5k", icon: Users },
                  { label: "Modules", val: inst.modulesCount || 210, icon: Layers },
                  { label: "AI Agents", val: inst.aiAgentsCount || 32, icon: BrainCircuit },
                  { label: "Workflows", val: inst.workflowsCount || 410, icon: Workflow }
                ].map((stat, i) => (
                  <div key={i} className="p-5 bg-slate-50 rounded-[2rem] border border-slate-100 text-center group/stat hover:bg-blue-600 transition-all cursor-default">
                    <stat.icon className="w-5 h-5 text-slate-300 mx-auto mb-2 group-hover/stat:text-white/50" />
                    <span className="block font-black text-xl text-slate-900 tracking-tighter group-hover/stat:text-white">{stat.val}</span>
                    <span className="text-[8px] text-slate-400 font-black uppercase tracking-widest group-hover/stat:text-blue-100">{stat.label}</span>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-5 bg-white border border-slate-100 rounded-3xl flex items-center gap-4 shadow-sm group-hover:border-blue-200">
                  <Database className="w-6 h-6 text-indigo-600" />
                  <div>
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1">Infrastructure</span>
                    <span className="text-xs font-black text-slate-900">{inst.databaseStatus || "PostgreSQL Cluster"}</span>
                  </div>
                </div>
                <div className="p-5 bg-white border border-slate-100 rounded-3xl flex items-center gap-4 shadow-sm group-hover:border-emerald-200">
                  <Lock className="w-6 h-6 text-emerald-600" />
                  <div>
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1">Security Wall</span>
                    <span className="text-xs font-black text-slate-900">{inst.securityProfile || "AEGIS Zero-Trust"}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-10 py-8 bg-slate-50/50 border-t border-slate-50 flex items-center justify-between">
              <button
                onClick={() => setSelectedInstanceForOps(inst)}
                className="px-8 py-3 bg-white border border-slate-200 text-slate-900 font-black text-[10px] uppercase tracking-widest rounded-2xl hover:bg-slate-900 hover:text-white transition-all shadow-sm"
              >
                Operational Config
              </button>

              <button
                onClick={() => onSelectInstance(inst)}
                className="px-10 py-3 bg-blue-600 text-white font-black text-[10px] uppercase tracking-widest rounded-2xl hover:bg-slate-900 transition-all shadow-xl shadow-blue-100 flex items-center gap-2 group-hover:scale-105"
              >
                Launch Platform <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Advanced Configuration Modal */}
      <AnimatePresence>
        {selectedInstanceForOps && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xl flex items-center justify-center p-6">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-[4rem] w-full max-w-5xl h-[800px] border border-slate-200 shadow-2xl flex overflow-hidden"
            >
              {/* Sidebar Tabs */}
              <div className="w-80 bg-slate-50 border-r border-slate-100 p-12 flex flex-col justify-between">
                <div>
                  <div className="mb-12">
                    <h3 className="text-2xl font-black text-slate-900 tracking-tighter italic">Live <span className="text-blue-600">Config</span></h3>
                    <p className="text-[10px] font-bold text-slate-400 mt-2 italic">{selectedInstanceForOps.name}</p>
                  </div>
                  
                  <nav className="space-y-4">
                    {configTabs.map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveConfigTab(tab.id as any)}
                        className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all ${
                          activeConfigTab === tab.id 
                            ? "bg-blue-600 text-white shadow-xl shadow-blue-100" 
                            : "bg-white text-slate-500 hover:bg-white hover:border hover:border-slate-200"
                        }`}
                      >
                        <tab.icon className="w-5 h-5" />
                        <span className="text-[10px] font-black uppercase tracking-widest">{tab.label}</span>
                      </button>
                    ))}
                  </nav>
                </div>

                <div className="p-8 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm text-center">
                  <Fingerprint className="w-10 h-10 text-emerald-500 mx-auto mb-4" />
                  <p className="text-[10px] font-black text-slate-900 uppercase tracking-widest mb-1 italic">Digital Signature</p>
                  <p className="text-[9px] font-bold text-slate-400 break-all">UEOS-SIG-{Math.random().toString(36).substring(7).toUpperCase()}</p>
                </div>
              </div>

              {/* Main Config Area */}
              <div className="flex-1 p-16 overflow-y-auto relative">
                <button onClick={() => setSelectedInstanceForOps(null)} className="absolute top-12 right-12 p-3 bg-slate-100 hover:bg-slate-200 rounded-2xl transition-all">
                  <X className="w-6 h-6 text-slate-500" />
                </button>

                {activeConfigTab === "lifecycle" && (
                  <div className="space-y-12 animate-in fade-in duration-500">
                    <div className="space-y-4">
                      <h4 className="text-3xl font-black text-slate-900 tracking-tight italic">Platform <span className="text-blue-600">Lifecycle</span></h4>
                      <p className="text-slate-500 font-bold leading-relaxed">Control the operational status and lifecycle transitions of the enterprise node.</p>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      {[
                        { label: "Active Operations", val: "Active", desc: "Production environment is live and serving traffic.", icon: Zap, color: "emerald" },
                        { label: "Maintenance Mode", val: "Maintenance", desc: "Read-only access while system upgrades are performed.", icon: Settings, color: "blue" },
                        { label: "Suspended", val: "Suspended", desc: "Instance is paused. Data is preserved but access is denied.", icon: PauseCircle, color: "amber" },
                        { label: "Archived", val: "Archived", desc: "Instance is decommissioned and data is cold-stored.", icon: Archive, color: "slate" }
                      ].map((st) => (
                        <button
                          key={st.val}
                          onClick={() => handleUpdateStatus(selectedInstanceForOps.id, st.val)}
                          className={`p-10 rounded-[3rem] border-2 text-left transition-all relative overflow-hidden group ${
                            (selectedInstanceForOps.status || "Active") === st.val 
                              ? `border-${st.color}-600 bg-${st.color}-50/30` 
                              : "border-slate-50 bg-slate-50/30 hover:bg-white hover:border-blue-400"
                          }`}
                        >
                          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-all ${
                             (selectedInstanceForOps.status || "Active") === st.val ? `bg-${st.color}-600 text-white` : "bg-white text-slate-400"
                          }`}>
                            <st.icon className="w-7 h-7" />
                          </div>
                          <h5 className="text-xl font-black text-slate-900 tracking-tight mb-2">{st.label}</h5>
                          <p className="text-[10px] font-bold text-slate-500 leading-relaxed">{st.desc}</p>
                          {(selectedInstanceForOps.status || "Active") === st.val && (
                            <div className={`absolute top-8 right-8 w-8 h-8 bg-${st.color}-600 text-white rounded-full flex items-center justify-center`}>
                              <CheckCircle2 className="w-5 h-5" />
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {activeConfigTab === "identity" && (
                  <div className="space-y-12 animate-in fade-in duration-500">
                    <div className="space-y-4">
                      <h4 className="text-3xl font-black text-slate-900 tracking-tight italic">Platform <span className="text-blue-600">Identity</span></h4>
                      <p className="text-slate-500 font-bold leading-relaxed">Configure the institutional identity and organizational hierarchy.</p>
                    </div>
                    <div className="space-y-8 max-w-2xl">
                      <div className="space-y-4">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] block mb-2">Legal Enterprise Name</label>
                        <input type="text" defaultValue={selectedInstanceForOps.name} className="w-full px-8 py-5 bg-slate-50 border border-slate-100 rounded-3xl text-lg font-black italic outline-none focus:ring-4 focus:ring-blue-100 transition-all" />
                      </div>
                      <div className="space-y-4">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] block mb-2">Primary Operational Domain</label>
                        <div className="flex gap-4">
                          <input type="text" defaultValue={selectedInstanceForOps.domain} className="flex-1 px-8 py-5 bg-slate-50 border border-slate-100 rounded-3xl text-lg font-black italic outline-none focus:ring-4 focus:ring-blue-100 transition-all" />
                          <button className="px-8 py-5 bg-slate-900 text-white rounded-3xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-600 transition-all shadow-xl">Verify Domain</button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeConfigTab === "branding" && (
                  <div className="space-y-12 animate-in fade-in duration-500">
                    <div className="space-y-4">
                      <h4 className="text-3xl font-black text-slate-900 tracking-tight italic">Platform <span className="text-blue-600">Branding</span></h4>
                      <p className="text-slate-500 font-bold leading-relaxed">Customize the visual identity and workspace themes for this instance.</p>
                    </div>
                    <div className="grid grid-cols-2 gap-8">
                      <div className="p-8 bg-slate-50 rounded-[3rem] border border-slate-100 space-y-6">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Primary Brand Color</span>
                        <div className="flex gap-4">
                          {["#2563eb", "#db2777", "#059669", "#7c3aed", "#ea580c"].map(color => (
                            <div key={color} style={{ backgroundColor: color }} className="w-12 h-12 rounded-2xl cursor-pointer hover:scale-110 transition-transform shadow-lg" />
                          ))}
                        </div>
                      </div>
                      <div className="p-8 bg-slate-50 rounded-[3rem] border border-slate-100 space-y-6">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Institutional Logo</span>
                        <div className="w-full h-32 bg-white border-2 border-dashed border-slate-200 rounded-[2rem] flex flex-col items-center justify-center text-slate-400 gap-2 hover:border-blue-400 hover:text-blue-600 cursor-pointer transition-all">
                          <Plus className="w-8 h-8" />
                          <span className="text-[10px] font-black uppercase tracking-widest">Upload SVG/PNG</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeConfigTab === "security" && (
                  <div className="space-y-12 animate-in fade-in duration-500">
                    <div className="space-y-4">
                      <h4 className="text-3xl font-black text-slate-900 tracking-tight italic">Platform <span className="text-blue-600">Security</span></h4>
                      <p className="text-slate-500 font-bold leading-relaxed">Enforce national security standards and Zero-Trust access policies.</p>
                    </div>
                    <div className="space-y-6">
                      {[
                        { label: "MFA Enforcement", status: "Enabled", desc: "Require Multi-Factor Authentication for all administrative sessions." },
                        { label: "IP Whitelisting", status: "Disabled", desc: "Restrict access to specific national data center IP ranges." },
                        { label: "Data Encryption", status: "AES-256-GCM", desc: "Configure field-level encryption for sensitive PII data." }
                      ].map((policy, i) => (
                        <div key={i} className="p-8 bg-white border border-slate-100 rounded-[2.5rem] flex items-center justify-between shadow-sm hover:shadow-xl transition-all">
                          <div className="flex items-center gap-6">
                            <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center">
                              <Shield className="w-7 h-7" />
                            </div>
                            <div>
                              <h5 className="text-lg font-black text-slate-900 tracking-tight italic">{policy.label}</h5>
                              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{policy.desc}</p>
                            </div>
                          </div>
                          <button className="px-6 py-2 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 transition-all">
                            {policy.status === "Enabled" ? "Configure" : "Activate"}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeConfigTab === "api" && (
                  <div className="space-y-12 animate-in fade-in duration-500">
                    <div className="space-y-4">
                      <h4 className="text-3xl font-black text-slate-900 tracking-tight italic">API <span className="text-blue-600">Gateway</span></h4>
                      <p className="text-slate-500 font-bold leading-relaxed">Manage external integrations and third-party API consumption.</p>
                    </div>
                    <div className="grid grid-cols-2 gap-8">
                       <div className="p-10 bg-slate-900 text-white rounded-[3rem] space-y-6">
                        <span className="text-[10px] font-black text-blue-400 uppercase tracking-[0.2em]">API Health</span>
                        <div className="text-4xl font-black tracking-tight italic">100% <span className="text-sm text-slate-500 uppercase not-italic">Uptime</span></div>
                        <div className="space-y-3">
                          <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-400">
                            <span>Requests / Hr</span>
                            <span className="text-white">12,450</span>
                          </div>
                          <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                            <motion.div initial={{ width: 0 }} animate={{ width: "65%" }} className="h-full bg-blue-500" />
                          </div>
                        </div>
                      </div>
                      <div className="p-10 bg-white border border-slate-200 rounded-[3rem] space-y-6">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Integration Hub</span>
                        <div className="space-y-4">
                          {["M-Pesa Gateway", "National ID Registry", "Ministry API"].map(int => (
                            <div key={int} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                              <span className="text-xs font-black text-slate-900 italic">{int}</span>
                              <span className="text-[8px] font-black bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full uppercase">Active</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="mt-16 pt-12 border-t border-slate-100 flex justify-end gap-6">
                  <button onClick={() => setSelectedInstanceForOps(null)} className="px-10 py-5 bg-slate-100 text-slate-600 rounded-[2rem] font-black text-[10px] uppercase tracking-widest hover:bg-slate-200 transition-all">Close</button>
                  <button className="px-12 py-5 bg-blue-600 text-white rounded-[2rem] font-black text-[10px] uppercase tracking-widest hover:bg-slate-900 transition-all shadow-2xl shadow-blue-200">Commit Configuration Changes</button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
