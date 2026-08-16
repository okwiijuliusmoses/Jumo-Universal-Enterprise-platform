import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Radio, Cpu, Loader2, BrainCircuit, Shield, Activity, Network, Sliders, 
  Workflow, Database, Play, Check, Plus, AlertTriangle, RefreshCw, BarChart3, 
  Settings, Zap, Sparkles, Server, Trash2
} from "lucide-react";

interface IoTDevice {
  id: string;
  name: string;
  type: string;
  location: string;
  status: "ONLINE" | "OFFLINE" | "MAINTENANCE";
  telemetry: string;
}

export function IoTPlatformRenderer() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"operations" | "services" | "studio" | "marketplace">("operations");
  
  // Dynamic Live State
  const [devices, setDevices] = useState<IoTDevice[]>([
    { id: "DEV-UG-KLA-101", name: "Sovereign Water Station Alpha", type: "Flow Sensor", location: "Kampala, Uganda", status: "ONLINE", telemetry: "45.8 L/s" },
    { id: "DEV-UG-ENT-202", name: "National Grid Power Node 4", type: "Voltage Regulator", location: "Entebbe, Uganda", status: "ONLINE", telemetry: "240.4 V" },
    { id: "DEV-UG-JIN-303", name: "Smart Agriculture Climate Dome", type: "Soil Moisture Unit", location: "Jinja, Uganda", status: "MAINTENANCE", telemetry: "12% RH" },
    { id: "DEV-UG-KUM-404", name: "Kumi Smart Cold Storage Monitor", type: "Thermal Collector", location: "Kumi, Uganda", status: "ONLINE", telemetry: "-4.2 °C" }
  ]);

  const [newDeviceName, setNewDeviceName] = useState("");
  const [newDeviceType, setNewDeviceType] = useState("Flow Sensor");
  const [newDeviceLocation, setNewDeviceLocation] = useState("Kampala, Uganda");

  // AI Command Chat State
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState<Array<{ sender: "user" | "ai", text: string }>>([
    { sender: "ai", text: "Salutations! I am the JUMO IoT Platform Commander AI. Specify any physical infrastructure parameters you wish to optimize." }
  ]);

  // Architecture Studio State
  const [selectedSubsystem, setSelectedSubsystem] = useState("smartgrid");
  const [selectedSize, setSelectedSize] = useState("Large");
  const [approvedArchitecture, setApprovedArchitecture] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-96">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  // IoT AI Agents Suite
  const iotAgents = [
    { name: "IoT Operations Agent", role: "Device registry and message brokers mapping", status: "ACTIVE" },
    { name: "Sensor Intelligence Agent", role: "Raw signal anomaly checking and telemetry normalizer", status: "ACTIVE" },
    { name: "Predictive Maintenance Agent", role: "Ecosystem failure model forecasts (FAAP-integrated)", status: "ACTIVE" },
    { name: "Energy Optimization Agent", role: "Smart grid node balancing controller", status: "STANDBY" },
    { name: "Infrastructure Health Agent", role: "Sovereign pipeline physical integrity supervisor", status: "ACTIVE" },
    { name: "Security Monitoring Agent", role: "AEGIS zero-trust hardware keys rotater", status: "ACTIVE" }
  ];

  // Platform Modules
  const platformModules = [
    { id: "mod-telemetry", label: "IoT Monitoring Intelligence Service", status: "Running", model: "JUMO IoT Intelligence v1", assets: "245,000", events: "18,500/sec", policy: "AEGIS Protected" },
    { id: "mod-twin", label: "Sovereign Digital Twin Simulation Engine", status: "Active", model: "Twin-Synth v2", assets: "12,400 Nodes", events: "Real-time Parity", policy: "Simulation Sandboxed" },
    { id: "mod-edge", label: "Edge Computing Hub Synchronization Layer", status: "Active", model: "Edge-Glow Node-V13", assets: "850 Clusters", events: "Sync Active", policy: "Zero-Trust Sealed" }
  ];

  const handleAddDevice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDeviceName.trim()) return;
    const newDev: IoTDevice = {
      id: `DEV-UG-${Math.random().toString(36).substr(2, 4).toUpperCase()}-${Math.floor(Math.random() * 900) + 100}`,
      name: newDeviceName,
      type: newDeviceType,
      location: newDeviceLocation,
      status: "ONLINE",
      telemetry: newDeviceType === "Flow Sensor" ? "32.0 L/s" : newDeviceType === "Voltage Regulator" ? "220.0 V" : "65% RH"
    };
    setDevices([newDev, ...devices]);
    setNewDeviceName("");
  };

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;
    const userMsg = chatInput;
    setChatInput("");
    setChatMessages(prev => [...prev, { sender: "user", text: userMsg }]);

    setTimeout(() => {
      let reply = "Processing telemetry streams. Sovereign hardware registers are nominal under JUMO UEOS v13.";
      if (userMsg.toLowerCase().includes("status") || userMsg.toLowerCase().includes("device")) {
        reply = "Active Device Catalog: 4 core telemetry systems are transmitting telemetry securely. All AEGIS cryptographic handshakes are fully verified.";
      } else if (userMsg.toLowerCase().includes("error") || userMsg.toLowerCase().includes("issue")) {
        reply = "Anomaly Analysis: Jinja Smart Climate Unit is showing moist deficiency (12% RH). Predictive Maintenance scheduler has alerted the technical pipeline.";
      }
      setChatMessages(prev => [...prev, { sender: "ai", text: reply }]);
    }, 400);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-24">
      {/* Platform Header */}
      <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white relative overflow-hidden shadow-xl border border-slate-800">
        <div className="absolute right-0 top-0 w-96 h-96 bg-blue-600 rounded-full -mr-48 -mt-48 blur-3xl opacity-20" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="bg-blue-500/20 text-blue-300 border border-blue-500/30 px-3 py-1 rounded-full text-[9px] font-bold tracking-widest uppercase">
                National infrastructure Command
              </span>
            </div>
            <h2 className="text-4xl font-black tracking-tight uppercase italic">
              JUMO <span className="text-blue-500">IoT Platform</span>
            </h2>
            <p className="text-slate-400 text-sm font-medium leading-relaxed max-w-2xl">
              Sovereign hardware connectivity, real-time sensor network orchestration, and predictive maintenance engines.
            </p>
          </div>

          <div className="bg-slate-800/80 border border-slate-700 p-4 rounded-2xl space-y-1 font-mono text-[11px] min-w-[220px]">
            <div className="flex justify-between"><span className="text-slate-400">Platform ID:</span> <span className="text-white font-bold">JUMO-IOT-01</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Kernel Version:</span> <span className="text-blue-400 font-bold">v13.2-LOCKED</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Security Index:</span> <span className="text-emerald-400 font-bold">AEGIS-M2</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Active Sensors:</span> <span className="text-white font-bold">245,000</span></div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-slate-200">
        <button 
          onClick={() => setActiveTab("operations")}
          className={`px-6 py-4 font-black text-xs uppercase tracking-widest border-b-2 transition-all ${
            activeTab === "operations" ? "border-blue-600 text-slate-900" : "border-transparent text-slate-400 hover:text-slate-900"
          }`}
        >
          Live Operations
        </button>
        <button 
          onClick={() => setActiveTab("services")}
          className={`px-6 py-4 font-black text-xs uppercase tracking-widest border-b-2 transition-all ${
            activeTab === "services" ? "border-blue-600 text-slate-900" : "border-transparent text-slate-400 hover:text-slate-900"
          }`}
        >
          Runtime Modules
        </button>
        <button 
          onClick={() => setActiveTab("studio")}
          className={`px-6 py-4 font-black text-xs uppercase tracking-widest border-b-2 transition-all ${
            activeTab === "studio" ? "border-blue-600 text-slate-900" : "border-transparent text-slate-400 hover:text-slate-900"
          }`}
        >
          Architecture Studio
        </button>
        <button 
          onClick={() => setActiveTab("marketplace")}
          className={`px-6 py-4 font-black text-xs uppercase tracking-widest border-b-2 transition-all ${
            activeTab === "marketplace" ? "border-blue-600 text-slate-900" : "border-transparent text-slate-400 hover:text-slate-900"
          }`}
        >
          IoT Marketplace
        </button>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === "operations" && (
          <motion.div 
            key="operations" 
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -10 }}
            className="space-y-8"
          >
            {/* Live Operations KPIs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Total Devices Registered</span>
                <span className="text-3xl font-black text-slate-900">4,821</span>
                <div className="flex items-center gap-1.5 mt-2 text-emerald-600 text-xs font-bold">
                  <span>99.8% Online State</span>
                </div>
              </div>
              <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Active Data Streams</span>
                <span className="text-3xl font-black text-slate-900">245,000</span>
                <div className="flex items-center gap-1.5 mt-2 text-blue-600 text-xs font-bold">
                  <span>18,500 transactions / s</span>
                </div>
              </div>
              <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">SecOps Status</span>
                <span className="text-lg font-black text-emerald-600 flex items-center gap-1 mt-1 uppercase italic">
                  <Shield className="w-4.5 h-4.5" /> AEGIS Gated
                </span>
                <span className="text-[10px] font-semibold text-slate-400 block mt-1">Sovereign hardware certs rotating</span>
              </div>
              <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">IoT Compliance Score</span>
                <span className="text-3xl font-black text-slate-900">100%</span>
                <div className="flex items-center gap-1.5 mt-2 text-emerald-600 text-xs font-bold">
                  <span>UN-ECE Standard Compliance</span>
                </div>
              </div>
            </div>

            {/* Core Device Registry */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 bg-white border border-slate-200 rounded-[2rem] p-8 shadow-sm space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
                    <Radio className="w-5 h-5 text-blue-600" /> National Hardware Registry
                  </h3>
                  <span className="text-xs bg-slate-100 px-3 py-1 rounded-full font-bold text-slate-600">
                    Live Connections
                  </span>
                </div>

                <div className="divide-y divide-slate-100 overflow-x-auto">
                  <table className="w-full text-left text-xs font-semibold">
                    <thead>
                      <tr className="text-[10px] text-slate-400 uppercase tracking-widest border-b border-slate-100">
                        <th className="py-3">Device Identity</th>
                        <th className="py-3">Type</th>
                        <th className="py-3">Location</th>
                        <th className="py-3">Telemetry</th>
                        <th className="py-3 text-right">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {devices.map((device) => (
                        <tr key={device.id} className="hover:bg-slate-50/50">
                          <td className="py-4">
                            <span className="text-slate-900 font-bold block">{device.name}</span>
                            <span className="text-slate-400 font-mono text-[10px]">{device.id}</span>
                          </td>
                          <td className="py-4 text-slate-600">{device.type}</td>
                          <td className="py-4 text-slate-600">{device.location}</td>
                          <td className="py-4 font-mono text-blue-600 font-bold">{device.telemetry}</td>
                          <td className="py-4 text-right">
                            <span className={`px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-wider ${
                              device.status === "ONLINE" ? "bg-emerald-100 text-emerald-800" :
                              device.status === "OFFLINE" ? "bg-slate-100 text-slate-600" : "bg-amber-100 text-amber-800"
                            }`}>
                              {device.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Add Device Form */}
                <form onSubmit={handleAddDevice} className="bg-slate-50 rounded-2xl p-6 space-y-4 border border-slate-100">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Register Physical Asset Node</span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <input 
                      type="text" 
                      placeholder="Device Name (e.g. Entebbe Air Grid)" 
                      value={newDeviceName}
                      onChange={(e) => setNewDeviceName(e.target.value)}
                      className="bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-bold text-slate-700 outline-none focus:border-blue-500"
                    />
                    <select 
                      value={newDeviceType} 
                      onChange={(e) => setNewDeviceType(e.target.value)}
                      className="bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-bold text-slate-700 outline-none focus:border-blue-500"
                    >
                      <option value="Flow Sensor">Flow Sensor</option>
                      <option value="Voltage Regulator">Voltage Regulator</option>
                      <option value="Soil Moisture Unit">Soil Moisture Unit</option>
                      <option value="Thermal Collector">Thermal Collector</option>
                    </select>
                    <input 
                      type="text" 
                      placeholder="Location" 
                      value={newDeviceLocation}
                      onChange={(e) => setNewDeviceLocation(e.target.value)}
                      className="bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-bold text-slate-700 outline-none focus:border-blue-500"
                    />
                  </div>
                  <button type="submit" className="w-full bg-slate-900 text-white font-black text-xs uppercase tracking-widest py-3 rounded-xl hover:bg-slate-800 transition-all shadow-sm flex items-center justify-center gap-2">
                    <Plus className="w-4 h-4" /> Deploy Device and Rotated Hardware Certs
                  </button>
                </form>
              </div>

              {/* AI Commands & Chat */}
              <div className="bg-white border border-slate-200 rounded-[2rem] p-8 shadow-sm flex flex-col h-[520px]">
                <h3 className="text-lg font-black text-slate-900 uppercase tracking-wider flex items-center gap-2 mb-4">
                  <BrainCircuit className="w-5 h-5 text-blue-600" /> IoT Commander AI
                </h3>

                <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2 scrollbar-thin">
                  {chatMessages.map((msg, idx) => (
                    <div key={idx} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                      <div className={`p-4 rounded-2xl max-w-[85%] text-xs font-semibold leading-relaxed ${
                        msg.sender === "user" ? "bg-blue-600 text-white rounded-tr-none" : "bg-slate-100 text-slate-800 rounded-tl-none border border-slate-200"
                      }`}>
                        {msg.text}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <input 
                    type="text" 
                    placeholder="Ask IoT AI Commander..." 
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                    className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-bold outline-none focus:border-blue-500"
                  />
                  <button 
                    onClick={handleSendMessage}
                    className="bg-slate-900 hover:bg-slate-800 text-white p-3 rounded-xl transition-all"
                  >
                    <Play className="w-4 h-4 text-white" />
                  </button>
                </div>
              </div>
            </div>

            {/* AI Agents Registry */}
            <div className="bg-white border border-slate-200 rounded-[2rem] p-8 shadow-sm space-y-6">
              <h3 className="text-lg font-black text-slate-900 uppercase tracking-wider">
                System-Critical IoT Autonomous AI Swarm
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {iotAgents.map((agent) => (
                  <div key={agent.name} className="border border-slate-150 rounded-2xl p-5 hover:border-blue-500 transition-all flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-4">
                        <h4 className="font-bold text-slate-800 text-sm">{agent.name}</h4>
                        <span className={`px-2 py-0.5 rounded text-[8px] font-black ${
                          agent.status === "ACTIVE" ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"
                        }`}>{agent.status}</span>
                      </div>
                      <p className="text-xs text-slate-500 mt-2 font-medium leading-relaxed">
                        {agent.role}
                      </p>
                    </div>
                    <div className="pt-4 border-t border-slate-100 mt-4 flex justify-between items-center">
                      <span className="text-[10px] text-slate-400 font-mono">Scope: Tenant Bound</span>
                      <button className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:underline">
                        Audit Agent
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === "services" && (
          <motion.div 
            key="services" 
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -10 }}
            className="space-y-8"
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {platformModules.map((mod) => (
                <div key={mod.id} className="bg-white border border-slate-200 rounded-[2rem] p-8 shadow-sm flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                        <Cpu className="w-5 h-5" />
                      </div>
                      <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-full text-[9px] font-black uppercase tracking-wider">
                        {mod.status}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <h4 className="font-black text-slate-900 text-base tracking-tight leading-tight">{mod.label}</h4>
                      <span className="text-[10px] text-slate-400 font-bold block">Engine Model: {mod.model}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-2 text-[11px] font-semibold">
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Connected Capacity</span>
                        <span className="text-slate-800">{mod.assets}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Traffic Operations</span>
                        <span className="text-slate-800">{mod.events}</span>
                      </div>
                      <div className="col-span-2">
                        <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Security Mandate</span>
                        <span className="text-slate-800">{mod.policy}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-slate-100 flex gap-2">
                    <button className="flex-1 py-2.5 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all">
                      Configure Service
                    </button>
                    <button className="py-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-[10px] font-black uppercase">
                      Inspect
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === "studio" && (
          <motion.div 
            key="studio" 
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -10 }}
            className="bg-white border border-slate-200 rounded-[2.5rem] p-10 shadow-sm max-w-4xl mx-auto space-y-8"
          >
            <div className="space-y-2 border-b border-slate-100 pb-6">
              <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Sovereign IoT Architecture Studio</h3>
              <p className="text-slate-500 text-sm font-semibold">
                Compose autonomous telemetry grids based on high-trust geographical templates under UEOS control.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Geographical Topology</label>
                  <select 
                    value={selectedSubsystem} 
                    onChange={(e) => setSelectedSubsystem(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs font-bold outline-none focus:border-blue-500"
                  >
                    <option value="smartgrid">Smart Grid Power Topology (Uganda National Standard)</option>
                    <option value="waternet">Sovereign Water Distribution Network</option>
                    <option value="coldchain">Agricultural Cold Chain Logistic Grid</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Deployment Scale</label>
                  <div className="grid grid-cols-3 gap-3">
                    {["Small", "Medium", "Large"].map((sz) => (
                      <button
                        key={sz}
                        type="button"
                        onClick={() => setSelectedSize(sz)}
                        className={`py-3 rounded-xl text-xs font-black uppercase tracking-widest border transition-all ${
                          selectedSize === sz ? "bg-blue-600 text-white border-blue-600" : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                        }`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-4">
                  <button 
                    onClick={() => setApprovedArchitecture(true)}
                    className="w-full bg-slate-950 text-white font-black text-xs uppercase tracking-widest py-4 rounded-xl hover:bg-slate-800 transition-all shadow-md flex items-center justify-center gap-2"
                  >
                    <Sliders className="w-4 h-4 text-blue-400" /> Synthesize IoT Architecture recommendation
                  </button>
                </div>
              </div>

              {/* Composition Preview */}
              <div className="bg-slate-900 text-white rounded-3xl p-6 relative overflow-hidden flex flex-col justify-between font-mono text-[11px] h-[320px]">
                <div className="absolute right-0 top-0 w-32 h-32 bg-blue-600 rounded-full -mr-16 -mt-16 blur-2xl opacity-25" />
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                    <span className="text-[10px] text-blue-400 uppercase tracking-widest font-black">Architecture Snapshot</span>
                    <span className="text-slate-500 text-[9px]">LOCKED COMPONENT</span>
                  </div>

                  {approvedArchitecture ? (
                    <div className="space-y-2 animate-in fade-in duration-300">
                      <div className="text-emerald-400 font-bold">✓ RECOMMENDED TOPOLOGY GENERATED</div>
                      <div>• Grid Controller Node: DEV-UG-GRID-MAIN</div>
                      <div>• AEGIS Cryptographic Handshake: Rotating Key set</div>
                      <div>• DB Shard: telemetry_shard_east_01</div>
                      <div>• Estimated Transactions: 1.2M metrics / day</div>
                      <div>• Auto-Reconciling general ledger: ACTIVE via FAAP</div>
                    </div>
                  ) : (
                    <div className="text-slate-500 text-center py-16">
                      Click the button to synthesize and approve recommended geographical topology map.
                    </div>
                  )}
                </div>

                <div className="bg-slate-800 p-3 rounded-xl flex items-center gap-2">
                  <Shield className="w-4.5 h-4.5 text-blue-400" />
                  <span className="text-[9px] text-slate-300">COMPILER READY FOR ZERO-TRUST FLIGHT CHECK</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === "marketplace" && (
          <motion.div 
            key="marketplace" 
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -10 }}
            className="space-y-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { title: "National Power Grid Telemetry Packet", desc: "Sovereign hardware sensor definitions designed for electric utility telemetry mapping.", price: "JUMO Native", category: "Infrastructure" },
                { title: "Smart Water Meter Core Firmware", desc: "Secure local processing logic compliant with zero-trust key management metrics.", price: "JUMO Native", category: "Utilities" },
                { title: "Agricultural Soil Sensor Interface", desc: "Telemetry interfaces to map moisture and soil metrics directly to central databases.", price: "JUMO Native", category: "Agriculture" }
              ].map((prod) => (
                <div key={prod.title} className="bg-white border border-slate-200 rounded-[2rem] p-8 shadow-sm flex flex-col justify-between space-y-6">
                  <div className="space-y-3">
                    <span className="px-2 py-0.5 bg-blue-50 text-blue-600 rounded text-[9px] font-black uppercase tracking-widest inline-block">{prod.category}</span>
                    <h4 className="font-black text-slate-900 text-lg tracking-tight leading-tight">{prod.title}</h4>
                    <p className="text-xs text-slate-500 font-medium leading-relaxed">{prod.desc}</p>
                  </div>
                  <div className="flex justify-between items-center pt-4 border-t border-slate-100">
                    <span className="text-sm font-black text-slate-900">{prod.price}</span>
                    <button className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-[10px] font-black uppercase tracking-wider">
                      Deploy Package
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
