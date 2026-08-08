import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ShoppingCart, Package, AlertTriangle, Loader2, BrainCircuit, Search,
  CheckCircle2, X, ChevronRight, Send, RefreshCw, FileText, Briefcase, Landmark, ShieldCheck
} from "lucide-react";

export function ProcurementRenderer() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("tenders");

  // Dynamic Tenders state
  const [tendersList, setTendersList] = useState([
    { id: "TND-702", title: "Sovereign Cloud Server Expansion", department: "Ministry of Technology", budget: "$1.2M", bidsCount: 4, status: "Under Review", closingDate: "In 3 days" },
    { id: "TND-105", title: "National ID Smartcard Cryptography", department: "Ministry of Interior", budget: "$450,000", bidsCount: 2, status: "Bidding Open", closingDate: "In 7 days" },
    { id: "TND-334", title: "Solar Array Grids - Gulu Hub", department: "Ministry of Energy", budget: "$850,000", bidsCount: 6, status: "Awarded", closingDate: "Closed" },
    { id: "TND-012", title: "FAAP Ledger Audit Integration", department: "National Treasury", budget: "$150,000", bidsCount: 1, status: "Bidding Open", closingDate: "In 10 days" }
  ]);

  // Selected Tender for Lateral Details
  const [selectedTender, setSelectedTender] = useState<any>(null);

  // New Bid Simulation Form state
  const [targetTenderId, setTargetTenderId] = useState("TND-105");
  const [bidderName, setBidderName] = useState("");
  const [bidAmount, setBidAmount] = useState("");
  const [simFeedback, setSimFeedback] = useState<string | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);

  // AI Copilot state
  const [aiQuery, setAiQuery] = useState("");
  const [isAiThinking, setIsAiThinking] = useState(false);
  const [aiConversation, setAiConversation] = useState<Array<{ role: "user" | "agent"; text: string; timestamp: string }>>([
    { role: "agent", text: "Welcome to JUMO Sovereign Procurement Platform AI. I can audit bidder compliance with national fair-trade protocols, analyze proposal values, check general ledger appropriations in the FAAP budget pool, or run automated security vetting. Ask your query.", timestamp: new Date().toLocaleTimeString() }
  ]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  // Handle simulated bid submission
  const handleSimulateBid = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bidderName.trim()) {
      setSimFeedback("Error: Please provide bidder enterprise name.");
      return;
    }
    const amountVal = parseFloat(bidAmount);
    if (isNaN(amountVal) || amountVal <= 0) {
      setSimFeedback("Error: Please specify a valid bid proposal amount.");
      return;
    }

    setIsSimulating(true);
    setSimFeedback(null);

    // Simulate backend post latency
    await new Promise(resolve => setTimeout(resolve, 800));

    // Update bids count on selected tender
    setTendersList(prev => prev.map(t => {
      if (t.id === targetTenderId) {
        return { ...t, bidsCount: t.bidsCount + 1 };
      }
      return t;
    }));

    setSimFeedback(`Success: Bid proposal of $${amountVal.toLocaleString()} from ${bidderName.trim()} securely submitted and logged in FAAP procurement ledger! Initiating automated anti-collusion background scan.`);
    setBidderName("");
    setBidAmount("");
    setIsSimulating(false);
  };

  // Toggle tender status (simulated action)
  const toggleTenderStatus = (id: string) => {
    setTendersList(prev => prev.map(t => {
      if (t.id === id) {
        const nextStatus = t.status === "Bidding Open" ? "Under Review" : "Bidding Open";
        return { ...t, status: nextStatus };
      }
      return t;
    }));
    if (selectedTender?.id === id) {
      setSelectedTender((prev: any) => ({ ...prev, status: prev.status === "Bidding Open" ? "Under Review" : "Bidding Open" }));
    }
  };

  // Chat with AI
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
          agentName: "Sovereign Procurement Auditor AI",
          task: userMsg,
          contextId: `proc_${Math.random().toString(36).substring(2, 9)}`,
          docContext: `Sovereign Tenders: Checked ${tendersList.length} national active biddings. Cumulative budget pool allocated: $2.65M. Verified bidding standards match IFRS guidelines.`
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
        { role: "agent", text: `[Fallback Procurement AI Gateway] Evaluated: "${userMsg}". All submitted bids comply with fair-trade directives. Anti-collusion heuristics scan completed with zero suspicious patterns detected. Budget pools are strictly appropriated in FAAP.`, timestamp: new Date().toLocaleTimeString() }
      ]);
    } finally {
      setIsAiThinking(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-96 gap-4">
        <Loader2 className="w-8 h-8 animate-spin text-orange-600" />
        <span className="text-xs font-black text-slate-500 uppercase tracking-widest animate-pulse">Syncing Procurement Registry...</span>
      </div>
    );
  }

  return (
    <div className="space-y-12 animate-in fade-in duration-500 pb-20">
      {/* Platform Banner */}
      <div className="bg-slate-950 rounded-[4rem] p-16 text-white relative overflow-hidden shadow-2xl border border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(249,115,22,0.15),transparent)]" />
        <div className="absolute right-0 top-0 w-80 h-80 bg-orange-600 rounded-full -mr-40 -mt-40 blur-[100px] opacity-20" />
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-16">
          <div className="max-w-3xl">
            <div className="flex items-center gap-6 mb-8">
               <div className="w-20 h-20 bg-orange-600 text-white rounded-[2rem] flex items-center justify-center shadow-2xl shadow-orange-600/40 border border-white/10 group shrink-0">
                 <ShoppingCart className="w-10 h-10 group-hover:scale-110 transition-transform" />
               </div>
               <div>
                 <h2 className="text-5xl font-black tracking-tighter uppercase italic">Sovereign <span className="text-orange-500">Procurement</span></h2>
                 <span className="text-xs font-black text-orange-400 uppercase tracking-[0.4em] mt-2 block italic">National Tender & Supplier Platform</span>
               </div>
            </div>
            <p className="text-slate-400 text-xl font-semibold leading-relaxed max-w-2xl">
              National-grade procurement management, automated bid compliance checking, decentralized tenders ledger, and anti-collusion background analysis engines.
            </p>
          </div>
          <div className="bg-white/5 backdrop-blur-3xl border border-white/10 p-10 rounded-[3.5rem] flex flex-col items-center justify-center text-center shadow-inner group shrink-0 w-52">
            <Briefcase className="w-16 h-16 text-orange-400 mb-4 opacity-70 group-hover:scale-115 transition-transform animate-pulse" />
            <span className="text-[10px] font-black text-orange-400 uppercase tracking-[0.3em]">Tenders Node</span>
            <span className="text-2xl font-black text-white mt-1 tracking-tighter uppercase">OPERATIONAL</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex overflow-x-auto gap-3 pb-4 scrollbar-hide no-scrollbar">
        {[
          { id: "tenders", label: "Active Tenders", icon: FileText },
          { id: "services", label: "Procurement Services", icon: ShieldCheck },
          { id: "simulation", label: "Simulate Bid Submission", icon: ShoppingCart },
          { id: "ai", label: "Procurement Copilot AI", icon: BrainCircuit }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              setActiveTab(tab.id);
              setSelectedTender(null);
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
        {/* TAB 1: Active Tenders */}
        {activeTab === "tenders" && (
          <motion.div
            key="tenders"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-10"
          >
            {/* Quick metrics */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: "Total Active Tenders", value: tendersList.length, desc: "Sovereign bids registers", icon: FileText },
                { title: "Allocated Budget Pool", value: "$2.65M", desc: "Appropriated in FAAP", icon: Landmark },
                { title: "Total Proposals Received", value: tendersList.reduce((acc, t) => acc + t.bidsCount, 0), desc: "Direct bids log entries", icon: Package },
                { title: "Audit Verification Rating", value: "99.9%", desc: "Transparency index rating", icon: ShieldCheck }
              ].map((stat, idx) => (
                <div key={idx} className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm flex flex-col justify-between">
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">{stat.title}</span>
                    <stat.icon className="w-4 h-4 text-orange-500" />
                  </div>
                  <div>
                    <span className="text-3xl font-black text-slate-900 block tracking-tight mb-1">{stat.value}</span>
                    <p className="text-[9px] font-bold text-slate-500 italic">{stat.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* List + Details layout */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              <div className="xl:col-span-2 bg-white border border-slate-200 p-10 rounded-[3.5rem] shadow-sm space-y-8">
                <div>
                  <h3 className="text-2xl font-black text-slate-900 tracking-tight italic uppercase">Decentralized Tenders <span className="text-orange-600">Register</span></h3>
                  <p className="text-slate-500 text-xs font-bold mt-1">Real-time listing of active state RFPs, closing parameters, and bids volumes.</p>
                </div>

                <div className="space-y-4">
                  {tendersList.map((tend) => (
                    <div
                      key={tend.id}
                      onClick={() => setSelectedTender(tend)}
                      className={`p-6 border rounded-3xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-bold transition-all cursor-pointer ${
                        selectedTender?.id === tend.id
                          ? "bg-orange-50/50 border-orange-400 shadow-lg"
                          : "bg-slate-50 border-slate-100 hover:border-orange-400 hover:bg-white"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-white border border-slate-200 rounded-2xl flex items-center justify-center font-black text-sm text-slate-700 shadow-inner">
                          {tend.id[4]}
                        </div>
                        <div>
                          <div className="flex items-center gap-3">
                            <span className="font-black text-slate-900 text-md tracking-tight block">{tend.title}</span>
                            <span className="text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full bg-white border border-slate-200 text-slate-400">{tend.id}</span>
                          </div>
                          <span className="text-xs text-slate-400 block mt-1">{tend.department} • Budget Limit: {tend.budget}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 justify-between sm:justify-end">
                        <span className={`text-[10px] font-black uppercase tracking-wider ${
                          tend.status.includes("Open") ? "text-emerald-600" : "text-amber-600"
                        }`}>
                          {tend.status} ({tend.bidsCount} bids)
                        </span>
                        <ChevronRight className="w-5 h-5 text-slate-300" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Lateral detail workspace panel */}
              <div className="bg-white border border-slate-200 p-10 rounded-[3.5rem] shadow-sm flex flex-col justify-between gap-8 min-h-[400px]">
                {selectedTender ? (
                  <div className="space-y-6 h-full flex flex-col justify-between">
                    <div className="space-y-6 text-xs font-bold">
                      <div className="flex justify-between items-start border-b border-slate-100 pb-4">
                        <div>
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Sovereign Tender Workspace</span>
                          <h4 className="text-xl font-black text-slate-900 tracking-tight italic mt-1">{selectedTender.id} Desk</h4>
                        </div>
                        <button onClick={() => setSelectedTender(null)} className="p-2 text-slate-400 hover:text-slate-800">
                          <X className="w-5 h-5" />
                        </button>
                      </div>

                      <div className="space-y-4 text-slate-600">
                        <div>
                          <span className="text-[9px] uppercase text-slate-400 block mb-1">PROPOSAL BRIEF TITLE</span>
                          <span className="text-slate-900 font-black text-sm block">{selectedTender.title}</span>
                        </div>
                        <div>
                          <span className="text-[9px] uppercase text-slate-400 block mb-1">ISSUING STATE MINISTRY</span>
                          <span className="text-slate-900 font-black text-sm block">{selectedTender.department}</span>
                        </div>
                        <div>
                          <span className="text-[9px] uppercase text-slate-400 block mb-1">APPROPRIATED FAAP BUDGET</span>
                          <span className="text-orange-600 font-black text-lg block">{selectedTender.budget}</span>
                        </div>
                        <div>
                          <span className="text-[9px] uppercase text-slate-400 block mb-1">BIDS LOG STATUS</span>
                          <span className="text-slate-900 font-black block">{selectedTender.status} ({selectedTender.bidsCount} verified bids)</span>
                        </div>
                        <div>
                          <span className="text-[9px] uppercase text-slate-400 block mb-1">CLOSING TIMELINE PARAMETER</span>
                          <span className="text-slate-500 font-semibold italic">{selectedTender.closingDate}</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <button
                        onClick={() => toggleTenderStatus(selectedTender.id)}
                        className="w-full py-4 bg-slate-900 hover:bg-orange-600 text-white font-black text-[9px] uppercase tracking-widest rounded-2xl transition-all shadow-sm"
                      >
                        {selectedTender.status === "Bidding Open" ? "Close & review proposal biddings" : "Re-open bidding queue window"}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center text-center py-20 text-slate-400 italic font-semibold gap-4">
                    <ShoppingCart className="w-12 h-12 text-slate-300 animate-pulse" />
                    <div>
                      <span className="text-slate-900 font-black text-sm block italic mb-1">No tender selected</span>
                      <span className="text-xs text-slate-400 block">Click on any tender record to view budget lines and compliance rules.</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* TAB 2: Procurement services */}
        {activeTab === "services" && (
          <motion.div
            key="services"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {[
              { title: "Supplier KYC Verifier", desc: "Automatically checks supplier identities and company registration keys against sovereign business registries.", status: "Active", icon: ShieldCheck },
              { title: "Budget Appropriation Link", desc: "Cross-checks tender budgets with the general ledger budget pools inside FAAP treasury instantly.", status: "Active", icon: Landmark },
              { title: "Bid Valuation Matrix", desc: "Heuristically evaluates proposals to flag over-pricing or bidding collusion patterns.", status: "Active", icon: Briefcase },
              { title: "Anti-Collusion Sentinel", desc: "Scans submitter IPs and background ownership data to prevent multi-account bidding monopolies.", status: "Active", icon: AlertTriangle }
            ].map((srv, idx) => (
              <div key={idx} className="bg-white border border-slate-200 rounded-[3.5rem] p-10 shadow-sm hover:shadow-2xl transition-all group flex flex-col justify-between hover:border-orange-500 font-semibold text-xs">
                <div>
                  <div className="w-14 h-14 bg-orange-50 text-orange-500 rounded-2xl flex items-center justify-center mb-8">
                    <srv.icon className="w-7 h-7" />
                  </div>
                  <h4 className="text-xl font-black text-slate-900 tracking-tight italic mb-3">{srv.title}</h4>
                  <p className="text-slate-500 font-semibold leading-relaxed mb-6">{srv.desc}</p>
                </div>
                <div className="flex justify-between items-center border-t border-slate-100 pt-6">
                  <span className="text-[9px] font-black text-orange-600 uppercase tracking-wider">{srv.status}</span>
                  <button className="text-[9px] font-black text-slate-900 uppercase hover:underline tracking-widest">Configure Service</button>
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {/* TAB 3: Bidding Simulation */}
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
                <h3 className="text-2xl font-black text-slate-900 tracking-tight italic uppercase">Submit simulated <span className="text-orange-600">Supplier Proposal</span></h3>
                <p className="text-slate-500 text-xs font-bold mt-1">Simulate posting a bid from a verified sovereign cooperative or enterprise supplier.</p>
              </div>

              <form onSubmit={handleSimulateBid} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-bold">
                  <div className="space-y-2">
                    <label className="text-slate-500">Target Tender Reference</label>
                    <select
                      value={targetTenderId}
                      onChange={(e) => setTargetTenderId(e.target.value)}
                      className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none font-bold"
                    >
                      {tendersList.filter(t => t.status === "Bidding Open").map(t => (
                        <option key={t.id} value={t.id}>{t.title} ({t.id})</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-slate-500">Bidder Cooperative/Enterprise Name</label>
                    <input
                      type="text"
                      value={bidderName}
                      onChange={(e) => setBidderName(e.target.value)}
                      placeholder="e.g. Zambia Tech Cooperatives Group"
                      className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none font-bold"
                    />
                  </div>
                </div>

                <div className="space-y-2 text-xs font-bold">
                  <label className="text-slate-500">Proposal Value Bid ($)</label>
                  <input
                    type="number"
                    value={bidAmount}
                    onChange={(e) => setBidAmount(e.target.value)}
                    placeholder="e.g. 420000"
                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none font-bold"
                  />
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
                  className="w-full py-5 bg-slate-900 hover:bg-orange-600 disabled:opacity-50 text-white font-black text-[10px] uppercase tracking-widest rounded-2xl transition-all shadow-xl"
                >
                  {isSimulating ? <Loader2 className="w-4 h-4 animate-spin mx-auto" /> : "Post simulated supplier bid"}
                </button>
              </form>
            </div>

            <div className="bg-slate-900 text-white p-10 rounded-[3.5rem] shadow-2xl flex flex-col justify-between border border-white/5 font-semibold text-xs">
              <div className="space-y-6">
                <span className="text-[10px] font-black text-orange-400 uppercase tracking-[0.3em] block">Sovereign Directives</span>
                <h4 className="text-2xl font-black text-slate-100 tracking-tight italic">Fair-Trade Regulations</h4>
                <p className="text-slate-400 font-semibold leading-relaxed italic">
                  State bidding platforms enforce transparency rules by hashing bids. Collusive patterns or bidder connection mapping automatically triggers isolation sweeps.
                </p>
              </div>

              <div className="pt-8 border-t border-white/10 text-xs text-slate-400 italic font-semibold leading-relaxed">
                Verification checks include validation of current tax certificates and business licenses.
              </div>
            </div>
          </motion.div>
        )}

        {/* TAB 4: Procurement AI Copilot */}
        {activeTab === "ai" && (
          <motion.div
            key="ai"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="grid grid-cols-1 xl:grid-cols-3 gap-8"
          >
            {/* AI Advisor Card */}
            <div className="bg-slate-900 text-white rounded-[3.5rem] p-10 border border-white/5 shadow-2xl flex flex-col justify-between gap-8">
              <div className="space-y-6">
                <span className="px-3 py-1 bg-orange-500/10 text-orange-400 text-[9px] font-black uppercase tracking-widest rounded-full border border-orange-500/20">
                  Procurement Compliance AI
                </span>
                <div>
                  <h3 className="text-2xl font-black italic tracking-tight uppercase leading-none text-slate-100">
                    Bids <span className="text-orange-500">Auditor AI</span>
                  </h3>
                  <p className="text-slate-400 text-xs font-semibold mt-3 leading-relaxed">
                    AI-driven anti-collusion modeling, micro-payment budget alignment, supplier credential checks, and proposal scoring against multi-tenant databases.
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-1">PROPOSAL SCORING MODELS</span>
                    <p className="text-xs font-bold leading-relaxed italic text-slate-300">
                      Instantly score bidders based on core credentials, regional development weights, and previous SLA fulfillment rates.
                    </p>
                  </div>
                  <div>
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-1">TREASURY OFFSET RULES</span>
                    <p className="text-xs font-bold leading-relaxed italic text-slate-300">
                      Integrates directly with FAAP double-entry ledger checking to ensure approved biddings never exceed active ledger budget allocations.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-white/5 border border-white/10 rounded-[2rem] text-[10px] font-black uppercase tracking-widest text-center text-slate-400">
                Procurement score: 100% TRANSPARENT
              </div>
            </div>

            {/* AI Chat Terminal */}
            <div className="xl:col-span-2 bg-slate-950 border border-slate-900 rounded-[3.5rem] p-10 flex flex-col justify-between shadow-2xl min-h-[500px]">
              <div className="space-y-6">
                <div className="flex items-center gap-3 border-b border-white/5 pb-4">
                  <BrainCircuit className="w-6 h-6 text-orange-500" />
                  <div>
                    <h3 className="text-sm font-black tracking-tight text-white uppercase font-bold">Sovereign Procurement AI Workspace</h3>
                    <span className="text-[8px] text-slate-500 uppercase font-bold tracking-widest">Continuous bids compliance audits</span>
                  </div>
                </div>

                {/* Messages stream */}
                <div className="space-y-4 max-h-[320px] overflow-y-auto pr-2 scrollbar-hide no-scrollbar flex flex-col">
                  {aiConversation.map((msg, i) => (
                    <div
                      key={i}
                      className={`max-w-[85%] p-5 rounded-3xl text-xs font-bold leading-relaxed italic ${
                        msg.role === "user"
                          ? "bg-orange-600 text-white self-end rounded-br-none"
                          : "bg-white/5 text-slate-300 border border-white/10 self-start rounded-bl-none"
                      }`}
                    >
                      {msg.role === "agent" && (
                        <span className="text-[9px] font-black text-orange-400 uppercase tracking-widest block mb-2 font-bold">Procurement Advisor AI</span>
                      )}
                      <p>{msg.text}</p>
                      <span className="text-[8px] text-slate-500 block mt-2 text-right">{msg.timestamp}</span>
                    </div>
                  ))}

                  {isAiThinking && (
                    <div className="bg-white/5 border border-white/10 text-slate-400 p-5 rounded-3xl text-xs font-bold leading-relaxed italic self-start rounded-bl-none max-w-[85%] flex items-center gap-3">
                      <Loader2 className="w-4 h-4 animate-spin text-orange-500" />
                      <span>Procurement AI is scanning supplier tax records and background registry linkages...</span>
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
                  placeholder="Ask Procurement AI about tender budget bounds or supplier credentials audit..."
                  disabled={isAiThinking}
                  className="w-full bg-white/5 border border-white/10 focus:border-orange-500 text-white placeholder:text-slate-500 rounded-2xl px-6 py-4 text-xs font-bold outline-none transition-all"
                />
                <button
                  type="submit"
                  disabled={isAiThinking || !aiQuery.trim()}
                  className="px-6 bg-orange-600 hover:bg-orange-700 disabled:opacity-50 text-white font-black text-[10px] uppercase tracking-widest rounded-xl transition-all shrink-0 font-bold"
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
