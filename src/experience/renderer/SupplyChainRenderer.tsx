import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Truck, Box, Map, Loader2, BrainCircuit, BarChart3,
  CheckCircle2, X, ChevronRight, Send, RefreshCw, Layers, ShieldCheck, Landmark, AlertTriangle
} from "lucide-react";

export function SupplyChainRenderer() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("shipments");

  // Dynamic Shipment / Consignments state
  const [shipmentsList, setShipmentsList] = useState([
    { id: "SHP-202", cargo: "Solar Panels Inverters", origin: "Kampala Port", destination: "Gulu Hub", status: "In Transit", eta: "4h", driver: "A. Masembe", value: "$450,000" },
    { id: "SHP-105", cargo: "Compute Server Racks", origin: "Dar Es Salaam Node", destination: "Zambia HQ", status: "Delayed", eta: "1d 2h", driver: "P. Lungu", value: "$1.2M" },
    { id: "SHP-304", cargo: "Cellular Telemetry Spares", origin: "Entebbe Depot", destination: "Kampala Central", status: "Delivered", eta: "Completed", driver: "J. Okello", value: "$80,000" },
    { id: "SHP-512", cargo: "Smart Card Encoders", origin: "Sovereign Mint Node", destination: "Ministry of Interior", status: "In Transit", eta: "12h", driver: "M. Tembo", value: "$220,000" }
  ]);

  // Selected Shipment for Lateral view
  const [selectedShipment, setSelectedShipment] = useState<any>(null);

  // New Shipment Simulation Form state
  const [cargoName, setCargoName] = useState("");
  const [targetDestination, setTargetDestination] = useState("Gulu Hub");
  const [cargoValue, setCargoValue] = useState("");
  const [simFeedback, setSimFeedback] = useState<string | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);

  // AI Copilot state
  const [aiQuery, setAiQuery] = useState("");
  const [isAiThinking, setIsAiThinking] = useState(false);
  const [aiConversation, setAiConversation] = useState<Array<{ role: "user" | "agent"; text: string; timestamp: string }>>([
    { role: "agent", text: "Welcome to JUMO Sovereign Supply Chain Platform AI. I can run routing optimization models, analyze warehouse inventory turnover ratios, check procurement approvals, or monitor cargo transit compliance checkpoints. Ask your query.", timestamp: new Date().toLocaleTimeString() }
  ]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  // Handle simulated shipment dispatch
  const handleSimulateDispatch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cargoName.trim()) {
      setSimFeedback("Error: Please provide specific cargo freight description.");
      return;
    }
    const valAmt = parseFloat(cargoValue);
    if (isNaN(valAmt) || valAmt <= 0) {
      setSimFeedback("Error: Please specify valid cargo valuation parameter.");
      return;
    }

    setIsSimulating(true);
    setSimFeedback(null);

    // Simulate backend post latency
    await new Promise(resolve => setTimeout(resolve, 800));

    const newId = `SHP-${Math.floor(100 + Math.random() * 900)}`;
    const newShipment = {
      id: newId,
      cargo: cargoName.trim(),
      origin: "National Central Warehouse",
      destination: targetDestination,
      status: "In Transit",
      eta: "1d",
      driver: "Sovereign Automated Freight",
      value: `$${valAmt.toLocaleString()}`
    };

    setShipmentsList(prev => [newShipment, ...prev]);
    setSimFeedback(`Success: Sovereign freight shipment ${newId} dispatched securely! Automated route optimization logged cargo value in treasury clearing ledgers.`);
    setCargoName("");
    setCargoValue("");
    setIsSimulating(false);
  };

  // Run routing optimization (simulated action)
  const triggerRouteOptimization = (id: string) => {
    setShipmentsList(prev => prev.map(shp => {
      if (shp.id === id) {
        return { ...shp, eta: "Optimized (saving 2h)", status: "In Transit" };
      }
      return shp;
    }));
    if (selectedShipment?.id === id) {
      setSelectedShipment((prev: any) => ({ ...prev, eta: "Optimized (saving 2h)", status: "In Transit" }));
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
          agentName: "Sovereign Supply Chain Auditor AI",
          task: userMsg,
          contextId: `shp_${Math.random().toString(36).substring(2, 9)}`,
          docContext: `Supply Chain status: Active shipments: ${shipmentsList.length}. Total cargo value: $1.95M. Locations: Kampala, Gulu, Zambia, Entebbe. Routing heuristic models configured.`
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
        { role: "agent", text: `[Fallback Supply Chain AI Gateway] Evaluated: "${userMsg}". Cargo transits checked against border checkpoints clearance codes. Optimal routes mapped. Inventory turnover values match current FAAP general ledger buffers.`, timestamp: new Date().toLocaleTimeString() }
      ]);
    } finally {
      setIsAiThinking(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-96 gap-4">
        <Loader2 className="w-8 h-8 animate-spin text-teal-600" />
        <span className="text-xs font-black text-slate-500 uppercase tracking-widest animate-pulse">Syncing Logistics Ledger...</span>
      </div>
    );
  }

  return (
    <div className="space-y-12 animate-in fade-in duration-500 pb-20">
      {/* Platform Banner */}
      <div className="bg-slate-950 rounded-[4rem] p-16 text-white relative overflow-hidden shadow-2xl border border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(20,184,166,0.15),transparent)]" />
        <div className="absolute right-0 top-0 w-80 h-80 bg-teal-600 rounded-full -mr-40 -mt-40 blur-[100px] opacity-20" />
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-16">
          <div className="max-w-3xl">
            <div className="flex items-center gap-6 mb-8">
               <div className="w-20 h-20 bg-teal-600 text-white rounded-[2rem] flex items-center justify-center shadow-2xl shadow-teal-600/40 border border-white/10 group shrink-0">
                 <Truck className="w-10 h-10 group-hover:scale-110 transition-transform" />
               </div>
               <div>
                 <h2 className="text-5xl font-black tracking-tighter uppercase italic">Sovereign <span className="text-teal-500">Supply Chain</span></h2>
                 <span className="text-xs font-black text-teal-400 uppercase tracking-[0.4em] mt-2 block italic">National Logistics & Inventory Platform</span>
               </div>
            </div>
            <p className="text-slate-400 text-xl font-semibold leading-relaxed max-w-2xl">
              National logistical intelligence, automated route optimization, warehousing inventory trackers, transit custom compliance grids, and ledger valuations.
            </p>
          </div>
          <div className="bg-white/5 backdrop-blur-3xl border border-white/10 p-10 rounded-[3.5rem] flex flex-col items-center justify-center text-center shadow-inner group shrink-0 w-52">
            <Box className="w-16 h-16 text-teal-400 mb-4 opacity-70 group-hover:scale-115 transition-transform animate-pulse" />
            <span className="text-[10px] font-black text-teal-400 uppercase tracking-[0.3em]">Logistics Hub</span>
            <span className="text-2xl font-black text-white mt-1 tracking-tighter uppercase">OPERATIONAL</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex overflow-x-auto gap-3 pb-4 scrollbar-hide no-scrollbar">
        {[
          { id: "shipments", label: "Active Shipments", icon: Truck },
          { id: "services", label: "Logistical Services", icon: ShieldCheck },
          { id: "simulation", label: "Simulate Shipment Dispatch", icon: Box },
          { id: "ai", label: "Supply Chain Copilot AI", icon: BrainCircuit }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              setActiveTab(tab.id);
              setSelectedShipment(null);
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
        {/* TAB 1: Active Shipments */}
        {activeTab === "shipments" && (
          <motion.div
            key="shipments"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-10"
          >
            {/* Quick metrics */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: "Total Active Shipments", value: shipmentsList.length, desc: "In-transit consignments", icon: Truck },
                { title: "Total Consignment Value", value: "$1.95M", desc: "Appropriated logistics assets", icon: Landmark },
                { title: "Delayed Node Alerts", value: shipmentsList.filter(s => s.status === "Delayed").length, desc: "SLA delays", icon: AlertTriangle },
                { title: "Warehouse Storage Load", value: "64%", desc: "Central storage utilization", icon: Box }
              ].map((stat, idx) => (
                <div key={idx} className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm flex flex-col justify-between">
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">{stat.title}</span>
                    <stat.icon className="w-4 h-4 text-teal-500" />
                  </div>
                  <div>
                    <span className="text-3xl font-black text-slate-900 block tracking-tight mb-1">{stat.value}</span>
                    <p className="text-[9px] font-bold text-slate-500 italic">{stat.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* List + Details Layout */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              <div className="xl:col-span-2 bg-white border border-slate-200 p-10 rounded-[3.5rem] shadow-sm space-y-8">
                <div>
                  <h3 className="text-2xl font-black text-slate-900 tracking-tight italic uppercase">Freight & Consignments <span className="text-teal-600">Ledger</span></h3>
                  <p className="text-slate-500 text-xs font-bold mt-1">Real-time listing of active logistics transits, driver assignments, and ETA statistics.</p>
                </div>

                <div className="space-y-4">
                  {shipmentsList.map((shp) => (
                    <div
                      key={shp.id}
                      onClick={() => setSelectedShipment(shp)}
                      className={`p-6 border rounded-3xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-bold transition-all cursor-pointer ${
                        selectedShipment?.id === shp.id
                          ? "bg-teal-50/50 border-teal-400 shadow-lg"
                          : "bg-slate-50 border-slate-100 hover:border-teal-400 hover:bg-white"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-white border border-slate-200 rounded-2xl flex items-center justify-center font-black text-sm text-slate-700 shadow-inner">
                          {shp.id[4]}
                        </div>
                        <div>
                          <div className="flex items-center gap-3">
                            <span className="font-black text-slate-900 text-md tracking-tight block">{shp.cargo}</span>
                            <span className="text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full bg-white border border-slate-200 text-slate-400">{shp.id}</span>
                          </div>
                          <span className="text-xs text-slate-400 block mt-1">{shp.origin} ➔ {shp.destination} • Driver: {shp.driver}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 justify-between sm:justify-end">
                        <span className={`text-[10px] font-black uppercase tracking-wider ${
                          shp.status === "Delivered" ? "text-emerald-600" :
                          shp.status === "Delayed" ? "text-rose-600 font-extrabold" :
                          "text-blue-600"
                        }`}>
                          {shp.status} ({shp.eta})
                        </span>
                        <ChevronRight className="w-5 h-5 text-slate-300" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Lateral Detail workspace panel */}
              <div className="bg-white border border-slate-200 p-10 rounded-[3.5rem] shadow-sm flex flex-col justify-between gap-8 min-h-[400px]">
                {selectedShipment ? (
                  <div className="space-y-6 h-full flex flex-col justify-between">
                    <div className="space-y-6 text-xs font-bold">
                      <div className="flex justify-between items-start border-b border-slate-100 pb-4">
                        <div>
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Sovereign Freight Desk</span>
                          <h4 className="text-xl font-black text-slate-900 tracking-tight italic mt-1">{selectedShipment.id} Workspace</h4>
                        </div>
                        <button onClick={() => setSelectedShipment(null)} className="p-2 text-slate-400 hover:text-slate-800">
                          <X className="w-5 h-5" />
                        </button>
                      </div>

                      <div className="space-y-4 text-slate-600">
                        <div>
                          <span className="text-[9px] uppercase text-slate-400 block mb-1">CARGO FREIGHT CONTENTS</span>
                          <span className="text-slate-900 font-black text-sm block">{selectedShipment.cargo}</span>
                        </div>
                        <div>
                          <span className="text-[9px] uppercase text-slate-400 block mb-1">ROUTE PATHWAY ORIGIN</span>
                          <span className="text-slate-900 font-black text-sm block">{selectedShipment.origin}</span>
                        </div>
                        <div>
                          <span className="text-[9px] uppercase text-slate-400 block mb-1">ROUTE PATHWAY TARGET</span>
                          <span className="text-slate-900 font-black text-sm block">{selectedShipment.destination}</span>
                        </div>
                        <div>
                          <span className="text-[9px] uppercase text-slate-400 block mb-1">CARGO VALUE PARAMETER</span>
                          <span className="text-teal-600 font-black text-lg block">{selectedShipment.value}</span>
                        </div>
                        <div>
                          <span className="text-[9px] uppercase text-slate-400 block mb-1">ETA STATUS TIMELINE</span>
                          <span className="text-slate-500 font-semibold block">{selectedShipment.eta} ({selectedShipment.status})</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <button
                        onClick={() => triggerRouteOptimization(selectedShipment.id)}
                        className="w-full py-4 bg-slate-900 hover:bg-teal-600 text-white font-black text-[9px] uppercase tracking-widest rounded-2xl transition-all shadow-sm"
                      >
                        Optimize logistical route parameters
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center text-center py-20 text-slate-400 italic font-semibold gap-4">
                    <Truck className="w-12 h-12 text-slate-300 animate-pulse" />
                    <div>
                      <span className="text-slate-900 font-black text-sm block italic mb-1">No shipment selected</span>
                      <span className="text-xs text-slate-400 block">Click on any shipment record to view logistics paths and ETA values.</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* TAB 2: Logistical services */}
        {activeTab === "services" && (
          <motion.div
            key="services"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {[
              { title: "Dynamic Routing Engine", desc: "Computes optimal logistics routes based on carrier traffic parameters and border clearances.", status: "Active", icon: Map },
              { title: "Warehouse Inventory Core", desc: "Live monitoring of hardware spare stock, computer spares, and smart card blanks.", status: "Active", icon: Box },
              { title: "Logistics SLA Monitor", desc: "Audits freight arrival delays to flag carrier penalties in general accounts automatically.", status: "Active", icon: BarChart3 },
              { title: "Transit Compliance Link", desc: "Integrates with national security border checkpoints to authorize sealed cargos.", status: "Active", icon: ShieldCheck }
            ].map((srv, idx) => (
              <div key={idx} className="bg-white border border-slate-200 rounded-[3.5rem] p-10 shadow-sm hover:shadow-2xl transition-all group flex flex-col justify-between hover:border-teal-500 font-semibold text-xs">
                <div>
                  <div className="w-14 h-14 bg-teal-50 text-teal-500 rounded-2xl flex items-center justify-center mb-8">
                    <srv.icon className="w-7 h-7" />
                  </div>
                  <h4 className="text-xl font-black text-slate-900 tracking-tight italic mb-3">{srv.title}</h4>
                  <p className="text-slate-500 font-semibold leading-relaxed mb-6">{srv.desc}</p>
                </div>
                <div className="flex justify-between items-center border-t border-slate-100 pt-6">
                  <span className="text-[9px] font-black text-teal-600 uppercase tracking-wider">{srv.status}</span>
                  <button className="text-[9px] font-black text-slate-900 uppercase hover:underline tracking-widest">Configure Service</button>
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {/* TAB 3: Shipment Dispatch simulation */}
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
                <h3 className="text-2xl font-black text-slate-900 tracking-tight italic uppercase">Dispatch Simulated <span className="text-teal-600">Freight Shipment</span></h3>
                <p className="text-slate-500 text-xs font-bold mt-1">Simulate sealing and dispatching a cargo container transit across regional hubs.</p>
              </div>

              <form onSubmit={handleSimulateDispatch} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-bold">
                  <div className="space-y-2">
                    <label className="text-slate-500">Cargo Contents Brief</label>
                    <input
                      type="text"
                      value={cargoName}
                      onChange={(e) => setCargoName(e.target.value)}
                      placeholder="e.g. 500 Cryptographic Smartcards"
                      className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none font-bold"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-slate-500">Destination Hub Node</label>
                    <select
                      value={targetDestination}
                      onChange={(e) => setTargetDestination(e.target.value)}
                      className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none font-bold"
                    >
                      <option value="Gulu Hub">Gulu Hub</option>
                      <option value="Zambia HQ">Zambia HQ</option>
                      <option value="Kampala Central">Kampala Central</option>
                      <option value="Busitema Tech Hub">Busitema Tech Hub</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2 text-xs font-bold">
                  <label className="text-slate-500">Consignment Value Valuation ($)</label>
                  <input
                    type="number"
                    value={cargoValue}
                    onChange={(e) => setCargoValue(e.target.value)}
                    placeholder="e.g. 150000"
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
                  className="w-full py-5 bg-slate-900 hover:bg-teal-600 disabled:opacity-50 text-white font-black text-[10px] uppercase tracking-widest rounded-2xl transition-all shadow-xl"
                >
                  {isSimulating ? <Loader2 className="w-4 h-4 animate-spin mx-auto" /> : "Dispatch Cargo Consignment"}
                </button>
              </form>
            </div>

            <div className="bg-slate-900 text-white p-10 rounded-[3.5rem] shadow-2xl flex flex-col justify-between border border-white/5 font-semibold text-xs">
              <div className="space-y-6">
                <span className="text-[10px] font-black text-teal-400 uppercase tracking-[0.3em] block">Sovereign Directives</span>
                <h4 className="text-2xl font-black text-slate-100 tracking-tight italic">Consignment Security Sealing</h4>
                <p className="text-slate-400 font-semibold leading-relaxed italic">
                  Sovereign freight is sealed with cryptographic RFID trackers. Breaking seals prior to reaching destinations triggers AEGIS SecOps alarms instantly.
                </p>
              </div>

              <div className="pt-8 border-t border-white/10 text-xs text-slate-400 italic font-semibold leading-relaxed">
                Logistics ledgers match freight allocations with active procurement authorizations automatically.
              </div>
            </div>
          </motion.div>
        )}

        {/* TAB 4: Supply Chain AI Copilot */}
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
                <span className="px-3 py-1 bg-teal-500/10 text-teal-400 text-[9px] font-black uppercase tracking-widest rounded-full border border-teal-500/20">
                  Logistical Intelligence AI
                </span>
                <div>
                  <h3 className="text-2xl font-black italic tracking-tight uppercase leading-none text-slate-100">
                    Logistics <span className="text-teal-500">Auditor AI</span>
                  </h3>
                  <p className="text-slate-400 text-xs font-semibold mt-3 leading-relaxed">
                    AI-driven demand predictive models, optimal multi-carrier route tracking, and warehousing inventory audit reports across multi-tenant networks.
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-1">ROUTE OPTIMIZATION</span>
                    <p className="text-xs font-bold leading-relaxed italic text-slate-300">
                      Predicts border delays based on active checkpoint queues, rerouting cargo dynamically to secure average lead time saving of 14%.
                    </p>
                  </div>
                  <div>
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-1">INVENTORY COMPLIANCE</span>
                    <p className="text-xs font-bold leading-relaxed italic text-slate-300">
                      Syncs with Procurement modules automatically to prevent hardware spare shortages, ensuring critical servers uptime is sustained.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-white/5 border border-white/10 rounded-[2rem] text-[10px] font-black uppercase tracking-widest text-center text-slate-400">
                Logistics precision: 99.4% RELIABLE
              </div>
            </div>

            {/* AI Chat Terminal */}
            <div className="xl:col-span-2 bg-slate-950 border border-slate-900 rounded-[3.5rem] p-10 flex flex-col justify-between shadow-2xl min-h-[500px]">
              <div className="space-y-6">
                <div className="flex items-center gap-3 border-b border-white/5 pb-4">
                  <BrainCircuit className="w-6 h-6 text-teal-500" />
                  <div>
                    <h3 className="text-sm font-black tracking-tight text-white uppercase font-bold">Sovereign Supply Chain AI Workspace</h3>
                    <span className="text-[8px] text-slate-500 uppercase font-bold tracking-widest">Continuous logistics routing audits</span>
                  </div>
                </div>

                {/* Messages stream */}
                <div className="space-y-4 max-h-[320px] overflow-y-auto pr-2 scrollbar-hide no-scrollbar flex flex-col">
                  {aiConversation.map((msg, i) => (
                    <div
                      key={i}
                      className={`max-w-[85%] p-5 rounded-3xl text-xs font-bold leading-relaxed italic ${
                        msg.role === "user"
                          ? "bg-teal-600 text-white self-end rounded-br-none"
                          : "bg-white/5 text-slate-300 border border-white/10 self-start rounded-bl-none"
                      }`}
                    >
                      {msg.role === "agent" && (
                        <span className="text-[9px] font-black text-teal-400 uppercase tracking-widest block mb-2 font-bold">Supply Chain Advisor AI</span>
                      )}
                      <p>{msg.text}</p>
                      <span className="text-[8px] text-slate-500 block mt-2 text-right">{msg.timestamp}</span>
                    </div>
                  ))}

                  {isAiThinking && (
                    <div className="bg-white/5 border border-white/10 text-slate-400 p-5 rounded-3xl text-xs font-bold leading-relaxed italic self-start rounded-bl-none max-w-[85%] flex items-center gap-3">
                      <Loader2 className="w-4 h-4 animate-spin text-teal-500" />
                      <span>Supply Chain AI is evaluating optimal routing vectors and scanning border transit logs...</span>
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
                  placeholder="Consult Supply Chain AI about freight status or dynamic routing delays..."
                  disabled={isAiThinking}
                  className="w-full bg-white/5 border border-white/10 focus:border-teal-500 text-white placeholder:text-slate-500 rounded-2xl px-6 py-4 text-xs font-bold outline-none transition-all"
                />
                <button
                  type="submit"
                  disabled={isAiThinking || !aiQuery.trim()}
                  className="px-6 bg-teal-600 hover:bg-teal-700 disabled:opacity-50 text-white font-black text-[10px] uppercase tracking-widest rounded-xl transition-all shrink-0 font-bold"
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
