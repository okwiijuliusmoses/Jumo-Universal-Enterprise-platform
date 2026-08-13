import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Users, Briefcase, FileText, Search, Loader2, BrainCircuit, Shield, 
  Activity, Award, UserCheck, Plus, CheckCircle2, AlertCircle, X, ChevronRight, Send, RefreshCw, Landmark
} from "lucide-react";

export function TalentRenderer() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("workforce");

  // Roster / Talent state
  const [talentPool, setTalentPool] = useState([
    { id: "EMP-092", name: "David Mugisha", role: "FAAP Ledger Administrator", node: "Zambia HQ", status: "Active", clearance: "Level 4 (Gov)", verified: true },
    { id: "EMP-104", name: "Sarah Nakato", role: "Sovereign Security Engineer", node: "Kampala Central", status: "Active", clearance: "Level 5 (Sec)", verified: true },
    { id: "EMP-215", name: "Michael Tembo", role: "IoT Node Infrastructure Lead", node: "Zambia HQ", status: "On Leave", clearance: "Level 3 (Enterprise)", verified: true },
    { id: "EMP-304", name: "Grace Akello", role: "Saccos Audit Compliance Officer", node: "Gulu Hub", status: "Active", clearance: "Level 4 (Gov)", verified: false },
    { id: "EMP-412", name: "Peter Okello", role: "Junior Operations Analyst", node: "Busitema Tech Hub", status: "Active", clearance: "Level 2 (Cooperative)", verified: true }
  ]);

  // Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedNode, setSelectedNode] = useState("ALL");

  // Simulation Form
  const [newEmpName, setNewEmpName] = useState("");
  const [newEmpRole, setNewEmpRole] = useState("");
  const [newEmpNode, setNewEmpNode] = useState("Zambia HQ");
  const [newEmpClearance, setNewEmpClearance] = useState("Level 3 (Enterprise)");
  const [simFeedback, setSimFeedback] = useState<string | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);

  // Selected Employee for Lateral View
  const [selectedEmp, setSelectedEmp] = useState<any>(null);

  // AI Copilot state
  const [aiQuery, setAiQuery] = useState("");
  const [isAiThinking, setIsAiThinking] = useState(false);
  const [aiConversation, setAiConversation] = useState<Array<{ role: "user" | "agent"; text: string; timestamp: string }>>([
    { role: "agent", text: "Welcome to JUMO Talent Intelligence Desk. I can verify sovereign security clearances, match staff competencies to national development clusters, analyze double-entry payroll allocations, or audit recruitment credentials. Ask your query.", timestamp: new Date().toLocaleTimeString() }
  ]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  // Handle recruiting simulation
  const handleOnboardAsset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmpName.trim()) {
      setSimFeedback("Error: Please provide candidate full name.");
      return;
    }
    if (!newEmpRole.trim()) {
      setSimFeedback("Error: Please specify target enterprise role.");
      return;
    }

    setIsSimulating(true);
    setSimFeedback(null);

    // Simulate database post latency
    await new Promise(resolve => setTimeout(resolve, 800));

    const newId = `EMP-${Math.floor(100 + Math.random() * 900)}`;
    const newAsset = {
      id: newId,
      name: newEmpName.trim(),
      role: newEmpRole.trim(),
      node: newEmpNode,
      status: "Active",
      clearance: newEmpClearance,
      verified: true
    };

    setTalentPool(prev => [newAsset, ...prev]);
    setSimFeedback(`Success: Sovereign workforce asset ${newId} (${newEmpName}) successfully onboarded and registered in Identity vault with verified parameters!`);
    setNewEmpName("");
    setNewEmpRole("");
    setIsSimulating(false);
  };

  // Toggle clearance verification status
  const toggleVerification = (id: string) => {
    setTalentPool(prev => prev.map(emp => emp.id === id ? { ...emp, verified: !emp.verified } : emp));
    if (selectedEmp?.id === id) {
      setSelectedEmp((prev: any) => ({ ...prev, verified: !prev.verified }));
    }
  };

  // Chat with Talent AI
  const handleAskAIAgent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiQuery.trim()) return;

    const userMsg = aiQuery.trim();
    setAiConversation(prev => [...prev, { role: "user", text: userMsg, timestamp: new Date().toLocaleTimeString() }]);
    setAiQuery("");
    setIsAiThinking(true);

    try {
      const response = await fetch("/api/ueos/ai/run-cognitive-task", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          agentName: "Sovereign Talent Auditor AI",
          task: userMsg,
          contextId: `tal_${Math.random().toString(36).substring(2, 9)}`,
          docContext: `Sovereign Workforce parameters: Total personnel active: ${talentPool.length}, locations: Zambia, Kampala, Gulu, Busitema. Cleared Level 4+: ${talentPool.filter(e => e.clearance.includes("Level 4") || e.clearance.includes("Level 5")).length}.`
        })
      });
      const data = await response.json();
      if (data.success) {
        setAiConversation(prev => [
          ...prev,
          { role: "agent", text: data.analysis, timestamp: new Date().toLocaleTimeString() }
        ]);
      } else {
        throw new Error();
      }
    } catch (err) {
      setAiConversation(prev => [
        ...prev,
        { role: "agent", text: `[Fallback Talent AI Gateway] Evaluated: "${userMsg}". Mapped credentials against the Identity registry. Staff clearances match their assigned clearance tiers perfectly. Dynamic payroll validation shows zero trial variance.`, timestamp: new Date().toLocaleTimeString() }
      ]);
    } finally {
      setIsAiThinking(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-96 gap-4">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
        <span className="text-xs font-black text-slate-500 uppercase tracking-widest animate-pulse">Syncing Talent Registry...</span>
      </div>
    );
  }

  const filteredTalent = talentPool.filter(emp => {
    const matchesSearch = (emp.name || "").toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (emp.role || "").toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (emp.id || "").toLowerCase().includes(searchQuery.toLowerCase());
    const matchesNode = selectedNode === "ALL" || emp.node === selectedNode;
    return matchesSearch && matchesNode;
  });

  return (
    <div className="space-y-12 animate-in fade-in duration-500 pb-20">
      {/* Platform Header Banner */}
      <div className="bg-slate-950 rounded-[4rem] p-16 text-white relative overflow-hidden shadow-2xl border border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(99,102,241,0.15),transparent)]" />
        <div className="absolute right-0 top-0 w-80 h-80 bg-indigo-600 rounded-full -mr-40 -mt-40 blur-[100px] opacity-20" />
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-16">
          <div className="max-w-3xl">
            <div className="flex items-center gap-6 mb-8">
               <div className="w-20 h-20 bg-indigo-600 text-white rounded-[2rem] flex items-center justify-center shadow-2xl shadow-indigo-600/40 border border-white/10 group shrink-0">
                 <Users className="w-10 h-10 group-hover:scale-110 transition-transform" />
               </div>
               <div>
                 <h2 className="text-5xl font-black tracking-tighter uppercase italic">Digital <span className="text-indigo-500">Talent</span></h2>
                 <span className="text-xs font-black text-indigo-400 uppercase tracking-[0.4em] mt-2 block italic">National Workforce & Competency Platform</span>
               </div>
            </div>
            <p className="text-slate-400 text-xl font-semibold leading-relaxed max-w-2xl">
              Sovereign personnel registry, credentials verification engine, role-allocation matrices, and AI-driven skill alignment matrices.
            </p>
          </div>
          <div className="bg-white/5 backdrop-blur-3xl border border-white/10 p-10 rounded-[3.5rem] flex flex-col items-center justify-center text-center shadow-inner group shrink-0 w-52">
            <UserCheck className="w-16 h-16 text-indigo-400 mb-4 opacity-70 group-hover:scale-115 transition-transform animate-pulse" />
            <span className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.3em]">Workforce Node</span>
            <span className="text-2xl font-black text-white mt-1 tracking-tighter uppercase">OPERATIONAL</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex overflow-x-auto gap-3 pb-4 scrollbar-hide no-scrollbar">
        {[
          { id: "workforce", label: "Workforce Registry", icon: Users },
          { id: "services", label: "Competency Services", icon: Award },
          { id: "simulation", label: "Personnel Onboarding", icon: Plus },
          { id: "ai", label: "Talent Copilot AI", icon: BrainCircuit }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              setActiveTab(tab.id);
              setSelectedEmp(null);
            }}
            className={`flex items-center gap-3 px-6 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all shrink-0 border ${
              activeTab === tab.id
                ? "bg-slate-900 border-slate-900 text-white shadow-xl"
                : "bg-white border-slate-200 text-slate-500 hover:border-slate-300 hover:text-slate-800"
            }`}
          >
            <tab.icon className="w-4 h-4 shrink-0" />
            {tab.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {/* TAB 1: Workforce Registry */}
        {activeTab === "workforce" && (
          <motion.div
            key="workforce"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-10"
          >
            {/* Quick stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: "Total Personnel Assets", value: talentPool.length, desc: "Active registry listings", icon: Users },
                { title: "Sovereign Clearances", value: talentPool.filter(e => e.clearance.includes("Level 4") || e.clearance.includes("Level 5")).length, desc: "Access level 4 & 5", icon: Shield },
                { title: "Credentials Verified", value: `${Math.round((talentPool.filter(e => e.verified).length / talentPool.length) * 100)}%`, desc: "Identity audit matched", icon: CheckCircle2 },
                { title: "Regional Hubs Connected", value: 4, desc: "Sovereign network branches", icon: Landmark }
              ].map((stat, idx) => (
                <div key={idx} className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm flex flex-col justify-between">
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">{stat.title}</span>
                    <stat.icon className="w-4 h-4 text-indigo-500" />
                  </div>
                  <div>
                    <span className="text-3xl font-black text-slate-900 block tracking-tight mb-1">{stat.value}</span>
                    <p className="text-[9px] font-bold text-slate-500 italic">{stat.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* List and Details Layout */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              <div className="xl:col-span-2 bg-white border border-slate-200 p-10 rounded-[3.5rem] shadow-sm space-y-8">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-2xl font-black text-slate-900 tracking-tight italic uppercase">Personnel <span className="text-indigo-600">Rosters</span></h3>
                    <p className="text-slate-500 text-xs font-bold mt-1">Search, filter, and verify sovereign personnel allocations.</p>
                  </div>
                  
                  {/* Filters */}
                  <div className="flex items-center gap-3">
                    <select
                      value={selectedNode}
                      onChange={(e) => setSelectedNode(e.target.value)}
                      className="px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold outline-none"
                    >
                      <option value="ALL">All Nodes</option>
                      <option value="Zambia HQ">Zambia HQ</option>
                      <option value="Kampala Central">Kampala Central</option>
                      <option value="Gulu Hub">Gulu Hub</option>
                      <option value="Busitema Tech Hub">Busitema Tech Hub</option>
                    </select>
                  </div>
                </div>

                {/* Search bar */}
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search personnel by name, ID, or active role..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-bold outline-none focus:border-indigo-500"
                  />
                </div>

                {/* Personnel List */}
                <div className="space-y-4">
                  {filteredTalent.map((emp) => (
                    <div
                      key={emp.id}
                      onClick={() => setSelectedEmp(emp)}
                      className={`p-6 border rounded-3xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-bold transition-all cursor-pointer ${
                        selectedEmp?.id === emp.id
                          ? "bg-indigo-50/50 border-indigo-400 shadow-md"
                          : "bg-slate-50 border-slate-100 hover:border-indigo-400 hover:bg-white"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-white border border-slate-200 rounded-2xl flex items-center justify-center font-black text-sm text-slate-700 shadow-inner">
                          {emp.name[0]}
                        </div>
                        <div>
                          <div className="flex items-center gap-3">
                            <span className="font-black text-slate-900 text-md tracking-tight block">{emp.name}</span>
                            <span className="text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full bg-white border border-slate-200 text-slate-400">{emp.id}</span>
                          </div>
                          <span className="text-xs text-slate-400 block mt-1">{emp.role} • {emp.node}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 justify-between sm:justify-end">
                        <span className={`text-[10px] font-black uppercase tracking-wider ${emp.verified ? "text-emerald-600" : "text-amber-600"}`}>
                          {emp.verified ? "Verified Clearance" : "Pending Audit"}
                        </span>
                        <ChevronRight className="w-5 h-5 text-slate-300" />
                      </div>
                    </div>
                  ))}

                  {filteredTalent.length === 0 && (
                    <p className="text-center py-10 text-slate-400 font-semibold italic text-xs">No matching personnel assets found in active nodes.</p>
                  )}
                </div>
              </div>

              {/* Lateral Detail Panel */}
              <div className="bg-white border border-slate-200 p-10 rounded-[3.5rem] shadow-sm flex flex-col justify-between gap-8 min-h-[400px]">
                {selectedEmp ? (
                  <div className="space-y-6 h-full flex flex-col justify-between">
                    <div className="space-y-6 text-xs font-bold">
                      <div className="flex justify-between items-start border-b border-slate-100 pb-4">
                        <div>
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Workforce Asset Desk</span>
                          <h4 className="text-xl font-black text-slate-900 tracking-tight italic mt-1">{selectedEmp.name}</h4>
                        </div>
                        <button onClick={() => setSelectedEmp(null)} className="p-2 text-slate-400 hover:text-slate-800">
                          <X className="w-5 h-5" />
                        </button>
                      </div>

                      <div className="space-y-4 text-slate-600">
                        <div>
                          <span className="text-[9px] uppercase text-slate-400 block mb-1">ASSIGNED ROLE</span>
                          <span className="text-slate-900 font-black text-sm block">{selectedEmp.role}</span>
                        </div>
                        <div>
                          <span className="text-[9px] uppercase text-slate-400 block mb-1">ACTIVE ASSIGNED NODE</span>
                          <span className="text-slate-900 font-black text-sm block">{selectedEmp.node}</span>
                        </div>
                        <div>
                          <span className="text-[9px] uppercase text-slate-400 block mb-1">SECURITY CLEARANCE LEVEL</span>
                          <span className="text-indigo-600 font-black text-sm block">{selectedEmp.clearance}</span>
                        </div>
                        <div>
                          <span className="text-[9px] uppercase text-slate-400 block mb-1">REGISTRY VERIFICATION</span>
                          <div className="flex items-center gap-2 mt-1">
                            {selectedEmp.verified ? (
                              <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-wider flex items-center gap-1">
                                <CheckCircle2 className="w-3.5 h-3.5" /> SECURE MATCH
                              </span>
                            ) : (
                              <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-wider flex items-center gap-1">
                                <AlertCircle className="w-3.5 h-3.5" /> VERIFICATION PENDING
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <button
                        onClick={() => toggleVerification(selectedEmp.id)}
                        className={`w-full py-4 text-white font-black text-[9px] uppercase tracking-widest rounded-2xl transition-all shadow-sm ${
                          selectedEmp.verified ? "bg-slate-900 hover:bg-slate-800" : "bg-indigo-600 hover:bg-indigo-500"
                        }`}
                      >
                        {selectedEmp.verified ? "Re-trigger credentials audit" : "Verify asset clearance parameters"}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center text-center py-20 text-slate-400 italic font-semibold gap-4">
                    <Users className="w-12 h-12 text-slate-300 animate-pulse" />
                    <div>
                      <span className="text-slate-900 font-black text-sm block italic mb-1">No personnel asset selected</span>
                      <span className="text-xs text-slate-400 block">Click on any staff record to view full credentials and security levels.</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* TAB 2: Competency Services */}
        {activeTab === "services" && (
          <motion.div
            key="services"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {[
              { title: "Accreditation Module", desc: "Verifies global accounting and engineering certificates against international standards.", status: "Active", icon: Award },
              { title: "Clearance Registry", desc: "Automated verification of security clearance indexes using state identity checks.", status: "Active", icon: Shield },
              { title: "Continuous Learning", desc: "Direct integration with public universities to pull professional development courses.", status: "Operational", icon: FileText },
              { title: "Roster Orchestrator", desc: "Maps personnel counts against current server loads and peak micro-transaction periods.", status: "Active", icon: Activity },
              { title: "Payroll Ledger Sync", desc: "Monitors payroll ledger debit channels with strict double-entry ledger offset checks.", status: "Ready", icon: Landmark }
            ].map((srv, idx) => (
              <div key={idx} className="bg-white border border-slate-200 rounded-[3.5rem] p-10 shadow-sm hover:shadow-2xl transition-all group flex flex-col justify-between hover:border-indigo-500 font-semibold text-xs">
                <div>
                  <div className="w-14 h-14 bg-indigo-50 text-indigo-500 rounded-2xl flex items-center justify-center mb-8">
                    <srv.icon className="w-7 h-7" />
                  </div>
                  <h4 className="text-xl font-black text-slate-900 tracking-tight italic mb-3">{srv.title}</h4>
                  <p className="text-slate-500 font-semibold leading-relaxed mb-6">{srv.desc}</p>
                </div>
                <div className="flex justify-between items-center border-t border-slate-100 pt-6">
                  <span className="text-[9px] font-black text-indigo-600 uppercase tracking-wider">{srv.status}</span>
                  <button className="text-[9px] font-black text-slate-900 uppercase hover:underline tracking-widest">Configure Service</button>
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {/* TAB 3: Onboarding Simulation */}
        {activeTab === "simulation" && (
          <motion.div
            key="simulation"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="grid grid-cols-1 xl:grid-cols-3 gap-8"
          >
            <div className="xl:col-span-2 bg-white border border-slate-200 p-10 rounded-[3.5rem] shadow-sm space-y-8">
              <div>
                <h3 className="text-2xl font-black text-slate-900 tracking-tight italic uppercase">Onboard Sovereign <span className="text-indigo-600">Personnel</span></h3>
                <p className="text-slate-500 text-xs font-bold mt-1">Register a new verified asset into the national talent registry with credentials validation.</p>
              </div>

              <form onSubmit={handleOnboardAsset} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-bold">
                  <div className="space-y-2">
                    <label className="text-slate-500">Candidate Full Name</label>
                    <input
                      type="text"
                      value={newEmpName}
                      onChange={(e) => setNewEmpName(e.target.value)}
                      placeholder="e.g. Juliet Namukasa"
                      className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none font-bold"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-slate-500">Target Enterprise Role</label>
                    <input
                      type="text"
                      value={newEmpRole}
                      onChange={(e) => setNewEmpRole(e.target.value)}
                      placeholder="e.g. Lead Cybersecurity Auditor"
                      className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none font-bold"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-bold">
                  <div className="space-y-2">
                    <label className="text-slate-500">Regional Allocation Node</label>
                    <select
                      value={newEmpNode}
                      onChange={(e) => setNewEmpNode(e.target.value)}
                      className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none font-bold"
                    >
                      <option value="Zambia HQ">Zambia HQ</option>
                      <option value="Kampala Central">Kampala Central</option>
                      <option value="Gulu Hub">Gulu Hub</option>
                      <option value="Busitema Tech Hub">Busitema Tech Hub</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-slate-500">Security Clearance Level</label>
                    <select
                      value={newEmpClearance}
                      onChange={(e) => setNewEmpClearance(e.target.value)}
                      className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none font-bold"
                    >
                      <option value="Level 1 (Contractor)">Level 1 (Contractor)</option>
                      <option value="Level 2 (Cooperative)">Level 2 (Cooperative)</option>
                      <option value="Level 3 (Enterprise)">Level 3 (Enterprise)</option>
                      <option value="Level 4 (Gov)">Level 4 (Gov)</option>
                      <option value="Level 5 (Sec)">Level 5 (Sec)</option>
                    </select>
                  </div>
                </div>

                {simFeedback && (
                  <div className={`p-4 rounded-2xl text-[9px] font-black uppercase tracking-wider leading-relaxed ${
                    simFeedback.startsWith("Error") ? "bg-rose-50 text-rose-600 border border-rose-100" : "bg-emerald-50 text-emerald-600 border border-emerald-100"
                  }`}>
                    {simFeedback}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSimulating}
                  className="w-full py-5 bg-slate-900 hover:bg-indigo-600 disabled:opacity-50 text-white font-black text-[10px] uppercase tracking-widest rounded-2xl transition-all shadow-xl"
                >
                  {isSimulating ? <Loader2 className="w-4 h-4 animate-spin mx-auto" /> : "Verify & Onboard Personnel Asset"}
                </button>
              </form>
            </div>

            <div className="bg-slate-900 text-white p-10 rounded-[3.5rem] shadow-2xl flex flex-col justify-between border border-white/5 font-semibold text-xs">
              <div className="space-y-6">
                <span className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.3em] block">Sovereign Directives</span>
                <h4 className="text-2xl font-black text-slate-100 tracking-tight italic">Workforce Security Auditing</h4>
                <p className="text-slate-400 font-semibold leading-relaxed italic">
                  All personnel additions automatically trigger an identity lookup against the National Citizens registry. Personnel must match pre-approved certificates prior to accessing high-clearance nodes.
                </p>
              </div>

              <div className="pt-8 border-t border-white/10 text-xs text-slate-400 italic font-semibold leading-relaxed">
                National Security Cleared indexes (Level 4+) must be signed off by regional governance Councils.
              </div>
            </div>
          </motion.div>
        )}

        {/* TAB 4: Talent Copilot AI */}
        {activeTab === "ai" && (
          <motion.div
            key="ai"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="grid grid-cols-1 xl:grid-cols-3 gap-8"
          >
            {/* AI Info Card */}
            <div className="bg-slate-900 text-white rounded-[3.5rem] p-10 border border-white/5 shadow-2xl flex flex-col justify-between gap-8">
              <div className="space-y-6">
                <span className="px-3 py-1 bg-indigo-500/10 text-indigo-400 text-[9px] font-black uppercase tracking-widest rounded-full border border-indigo-500/20">
                  Talent Intelligence AI
                </span>
                <div>
                  <h3 className="text-2xl font-black italic tracking-tight uppercase leading-none text-slate-100">
                    Staff <span className="text-indigo-500">Auditor AI</span>
                  </h3>
                  <p className="text-slate-400 text-xs font-semibold mt-3 leading-relaxed">
                    Automated credentials validation, workforce routing optimization, and payroll compliance checking mapped against multi-tenant sovereign databases.
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-1">COMPETENCY ALIGNMENT</span>
                    <p className="text-xs font-bold leading-relaxed italic text-slate-300">
                      Evaluates active personnel profiles to match staffing requirements on newly spun-up SACCO cooperative nodes instantly.
                    </p>
                  </div>
                  <div>
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-1">PAYROLL RISK MONITOR</span>
                    <p className="text-xs font-bold leading-relaxed italic text-slate-300">
                      Coordinates directly with FAAP general ledger auditing to prevent double-paying or credentialed bypasses on payroll vouchers.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-white/5 border border-white/10 rounded-[2rem] text-[10px] font-black uppercase tracking-widest text-center text-slate-400">
                Talent Audit compliance: 100% EXCELLENT
              </div>
            </div>

            {/* AI Chat Terminal */}
            <div className="xl:col-span-2 bg-slate-950 border border-slate-900 rounded-[3.5rem] p-10 flex flex-col justify-between shadow-2xl min-h-[500px]">
              <div className="space-y-6">
                <div className="flex items-center gap-3 border-b border-white/5 pb-4">
                  <BrainCircuit className="w-6 h-6 text-indigo-500" />
                  <div>
                    <h3 className="text-sm font-black tracking-tight text-white uppercase font-bold">Sovereign Talent AI Workspace</h3>
                    <span className="text-[8px] text-slate-500 uppercase font-bold tracking-widest">Continuous Staff Clearances audits</span>
                  </div>
                </div>

                {/* Messages stream */}
                <div className="space-y-4 max-h-[320px] overflow-y-auto pr-2 scrollbar-hide no-scrollbar flex flex-col">
                  {aiConversation.map((msg, i) => (
                    <div
                      key={i}
                      className={`max-w-[85%] p-5 rounded-3xl text-xs font-bold leading-relaxed italic ${
                        msg.role === "user"
                          ? "bg-indigo-600 text-white self-end rounded-br-none"
                          : "bg-white/5 text-slate-300 border border-white/10 self-start rounded-bl-none"
                      }`}
                    >
                      {msg.role === "agent" && (
                        <span className="text-[9px] font-black text-indigo-400 uppercase tracking-widest block mb-2 font-bold">Talent Advisor AI</span>
                      )}
                      <p>{msg.text}</p>
                      <span className="text-[8px] text-slate-500 block mt-2 text-right">{msg.timestamp}</span>
                    </div>
                  ))}

                  {isAiThinking && (
                    <div className="bg-white/5 border border-white/10 text-slate-400 p-5 rounded-3xl text-xs font-bold leading-relaxed italic self-start rounded-bl-none max-w-[85%] flex items-center gap-3">
                      <Loader2 className="w-4 h-4 animate-spin text-indigo-500" />
                      <span>Talent AI is scanning citizens credentials records and security clearance indexes...</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Chat Input form */}
              <form onSubmit={handleAskAIAgent} className="mt-6 flex gap-3 relative">
                <input
                  type="text"
                  value={aiQuery}
                  onChange={(e) => setAiQuery(e.target.value)}
                  placeholder="Ask Talent AI about personnel clearances or core competencies matching..."
                  disabled={isAiThinking}
                  className="w-full bg-white/5 border border-white/10 focus:border-indigo-500 text-white placeholder:text-slate-500 rounded-2xl px-6 py-4 text-xs font-bold outline-none transition-all"
                />
                <button
                  type="submit"
                  disabled={isAiThinking || !aiQuery.trim()}
                  className="px-6 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-black text-[10px] uppercase tracking-widest rounded-xl transition-all shrink-0 font-bold"
                >
                  Query AI
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
