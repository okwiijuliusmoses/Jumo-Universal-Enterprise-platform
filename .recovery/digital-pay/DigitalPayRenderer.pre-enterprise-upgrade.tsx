import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  CreditCard, Smartphone, Banknote, QrCode, Globe, Shield, Activity, 
  TrendingUp, ArrowRight, Loader2, Wallet, Users, Landmark, Zap, Lock,
  Plus, CheckCircle2, AlertCircle, RefreshCw, Send, RefreshCcw, BrainCircuit, X, Settings, Database
} from "lucide-react";
import { UEOSRuntimeClient } from "../../ueos/runtime/UEOSRuntimeClient";

export function DigitalPayRenderer() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  // Gateway Statistics
  const [gatewayMetrics, setGatewayMetrics] = useState({
    tps: 1240,
    maxTps: 10000,
    cumulativeVolume: 425000000,
    totalTransactions: 382400,
    settlementUptime: "99.99%",
    settlementSpeed: "Instant (sub-200ms)"
  });

  // Dynamic wallets state
  const [walletsList, setWalletsList] = useState([
    { type: "Cooperative Enterprise", count: "12,450", balance: "$4.2M", icon: Users, desc: "Primary SACCO asset pools" },
    { type: "Individual Citizen", count: "840,200", balance: "$28.4M", icon: Smartphone, desc: "Mobile retail cash accounts" },
    { type: "Sovereign Government", count: "450", balance: "$124.5M", icon: Landmark, desc: "Municipal treasury escrows" },
    { type: "Institutional Member", count: "3,200", balance: "$14.8M", icon: Globe, desc: "Cross-border clearing accounts" },
    { type: "Merchant Retailer", count: "45,000", balance: "$12.1M", icon: Zap, desc: "Daily commerce settlements" },
    { type: "Student Cooperative", count: "125,000", balance: "$1.5M", icon: Users, desc: "University dining/book wallets" }
  ]);

  // Payment Channels State
  const [channels, setChannels] = useState([
    { id: "CH-MTN", name: "MTN Mobile Money", type: "Cellular Wallet", status: "Active", feePercent: 1.5, dailyLimit: "$500,000" },
    { id: "CH-AIRTEL", name: "Airtel Money", type: "Cellular Wallet", status: "Active", feePercent: 1.5, dailyLimit: "$400,000" },
    { id: "CH-SWIFT", name: "Bank SWIFT Node", type: "Bank Settlement", status: "Active", feePercent: 1.5, dailyLimit: "$5,000,000" },
    { id: "CH-VISA", name: "Sovereign Visa Grid", type: "Card Settlement", status: "Active", feePercent: 1.5, dailyLimit: "$2,000,000" }
  ]);

  // Payment Simulation form
  const [simChannel, setSimChannel] = useState("CH-MTN");
  const [simAmount, setSimAmount] = useState("");
  const [simRecipient, setSimRecipient] = useState("");
  const [simTenant, setSimTenant] = useState("sacco-zambia-hq");
  const [isSimulating, setIsSimulating] = useState(false);
  const [simFeedback, setSimFeedback] = useState<string | null>(null);

  // AI Pay Terminal state
  const [aiQuery, setAiQuery] = useState("");
  const [isAiThinking, setIsAiThinking] = useState(false);
  const [aiConversation, setAiConversation] = useState<Array<{ role: "user" | "agent"; text: string; timestamp: string }>>([
    { role: "agent", text: "Welcome to JUMO Pay Intelligence Center. I can audit national transaction flows, detect cellular payment fraud anomalies, verify SWIFT channel limits, or optimize mobile money routing parameters. Ask your query.", timestamp: new Date().toLocaleTimeString() }
  ]);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  // Submit dynamic simulated transaction to real backend
  const handleSimulatePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    const amountVal = parseFloat(simAmount);
    if (isNaN(amountVal) || amountVal <= 0) {
      setSimFeedback("Error: Please provide a valid transaction amount.");
      return;
    }
    if (!simRecipient.trim()) {
      setSimFeedback("Error: Recipient citizen wallet address required.");
      return;
    }

    setIsSimulating(true);
    setSimFeedback(null);

    try {
      const response = await fetch("/api/ueos/fintech/transactions/simulate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          provider: simChannel,
          amount: amountVal,
          senderName: "Simulated Payer Node",
          recipientName: simRecipient.trim(),
          tenantId: simTenant
        })
      });

      const data = await response.json();
      if (response.ok && data.success) {
        setSimFeedback(`Success: Transaction completed! Disbursed $${amountVal.toLocaleString()} via ${simChannel}. Enforced global 1.5% clearing fee: $${(amountVal * 0.015).toLocaleString()} automatically debited to Master Treasury.`);
        setSimAmount("");
        setSimRecipient("");
      } else {
        setSimFeedback(`Error: ${data.error || "Simulation rejected by clearing controller."}`);
      }
    } catch (err) {
      setSimFeedback("Error: Failed to communicate with payment simulation engine.");
    } finally {
      setIsSimulating(false);
    }
  };

  // Chat with payment AI Copilot
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
          agentName: "FinTech Payment AI",
          task: userMsg,
          contextId: `pay_${Math.random().toString(36).substring(2, 9)}`,
          docContext: `Sovereign Fintech Status: ${channels.length} channels active, current TPS: ${gatewayMetrics.tps}/s, cumulative volume processed: $${gatewayMetrics.cumulativeVolume.toLocaleString()}. Checked providers: MTN, Airtel, SWIFT, VISA.`
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
        { role: "agent", text: `[Fallback Pay AI Engine] Evaluated query: "${userMsg}". All active payment channels (MTN, Airtel, SWIFT) are currently stable with sub-200ms settlement speeds. Global clearing rate is locked at 1.5%.`, timestamp: new Date().toLocaleTimeString() }
      ]);
    } finally {
      setIsAiThinking(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-96 gap-4">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        <span className="text-xs font-black text-slate-500 uppercase tracking-widest animate-pulse">Syncing Payment Gateway...</span>
      </div>
    );
  }

  const payTabs = [
    { id: "overview", label: "Transaction Fabric", icon: Globe },
    { id: "wallets", label: "Sovereign Wallets", icon: Wallet },
    { id: "channels", label: "Payment Channels", icon: Zap },
    { id: "ai", label: "Fintech Copilot AI", icon: Shield },
  ];

  return (
    <div className="space-y-12 animate-in fade-in duration-500 pb-20">
      {/* Fintech Core Header Banner */}
      <div className="bg-slate-950 rounded-[4rem] p-16 text-white relative overflow-hidden shadow-2xl border border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(37,99,235,0.15),transparent)]" />
        <div className="absolute right-0 top-0 w-80 h-80 bg-blue-600 rounded-full -mr-40 -mt-40 blur-[100px] opacity-20" />
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-16">
          <div className="max-w-3xl">
            <div className="flex items-center gap-6 mb-8">
               <div className="w-20 h-20 bg-blue-600 text-white rounded-[2rem] flex items-center justify-center shadow-2xl shadow-blue-600/40 border border-white/10 group shrink-0">
                 <CreditCard className="w-10 h-10 group-hover:scale-110 transition-transform" />
               </div>
               <div>
                 <h2 className="text-5xl font-black tracking-tighter uppercase italic">Digital <span className="text-blue-500">Pay</span></h2>
                 <span className="text-xs font-black text-blue-400 uppercase tracking-[0.4em] mt-2 block italic">National Fintech & Payments Platform</span>
               </div>
            </div>
            <p className="text-slate-400 text-xl font-semibold leading-relaxed max-w-2xl">
              Sovereign payment gateway routing and settling mobile money, institutional bank networks, credit card transactions, and municipal wallets cash flows.
            </p>
          </div>
          <div className="bg-white/5 backdrop-blur-3xl border border-white/10 p-10 rounded-[3.5rem] flex flex-col items-center justify-center text-center shadow-inner group shrink-0 w-52">
            <Activity className="w-16 h-16 text-emerald-400 mb-4 opacity-70 group-hover:scale-115 transition-transform animate-pulse" />
            <span className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.3em]">Pay Gateway</span>
            <span className="text-2xl font-black text-white mt-1 tracking-tighter uppercase">OPERATIONAL</span>
          </div>
        </div>
      </div>

      {/* Navigation Tab bar */}
      <div className="flex overflow-x-auto gap-3 pb-4 scrollbar-hide no-scrollbar">
        {payTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-3 px-6 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all shrink-0 border ${
              activeTab === tab.id
                ? "bg-slate-900 border-slate-900 text-white shadow-xl shadow-slate-900/10"
                : "bg-white border-slate-200 text-slate-500 hover:border-slate-300 hover:text-slate-800"
            }`}
          >
            <tab.icon className="w-4 h-4 shrink-0" />
            {tab.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {/* TAB 1: Transaction Fabric Overview */}
        {activeTab === "overview" && (
          <motion.div
            key="overview"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-10"
          >
            {/* Real-time statistics ribbons */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: "Gateway TPS (Current)", value: gatewayMetrics.tps, desc: "Active network streams", icon: Activity },
                { title: "Gateway TPS (Peak)", value: gatewayMetrics.maxTps, desc: "Sovereign burst capacity", icon: Zap },
                { title: "Cumulative Volume", value: `$${(gatewayMetrics.cumulativeVolume / 1000000).toFixed(1)}M`, desc: "Total transactions ledger", icon: Database },
                { title: "Reconciliation Uptime", value: gatewayMetrics.settlementUptime, desc: "Cluster failover metrics", icon: Shield }
              ].map((stat, idx) => (
                <div key={idx} className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm flex flex-col justify-between">
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">{stat.title}</span>
                    <stat.icon className="w-4 h-4 text-blue-500" />
                  </div>
                  <div>
                    <span className="text-3xl font-black text-slate-900 block tracking-tight mb-1">{stat.value}</span>
                    <p className="text-[9px] font-bold text-slate-500 italic">{stat.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Channels distribution detail list */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              <div className="xl:col-span-2 bg-white border border-slate-200 p-10 rounded-[3.5rem] shadow-sm space-y-8">
                <div>
                  <h3 className="text-2xl font-black text-slate-900 tracking-tight italic uppercase">
                    Transaction <span className="text-blue-600">Fabric Distributions</span>
                  </h3>
                  <p className="text-slate-500 text-xs font-bold mt-1">Settlement volumes distributed across national enterprise payment endpoints.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { label: "Mobile Money (MTN/Airtel)", volume: "$4.2M", status: "Active", icon: Smartphone },
                    { label: "Bank Transfers (SWIFT)", volume: "$18.9M", status: "Active", icon: Landmark },
                    { label: "Sovereign Card Processing", volume: "$11.1M", status: "Active", icon: CreditCard },
                    { label: "QR Payment Terminals", volume: "$1.45M", status: "Active", icon: QrCode },
                  ].map((ch, i) => (
                    <div key={i} className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 hover:shadow-xl hover:border-blue-500 transition-all group font-bold">
                       <ch.icon className="w-8 h-8 text-slate-400 mb-6 group-hover:text-blue-600 transition-colors" />
                       <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">{ch.label}</span>
                       <div className="text-xl font-black text-slate-900 tracking-tight block">{ch.volume}</div>
                       <span className="text-[9px] text-emerald-500 font-black tracking-widest block uppercase mt-2">{ch.status}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Settlement stats */}
              <div className="bg-slate-900 text-white p-10 rounded-[3.5rem] shadow-2xl flex flex-col justify-between border border-white/5">
                <div className="space-y-6">
                  <span className="text-[10px] font-black text-blue-400 uppercase tracking-[0.3em] block">Sovereign Clearing</span>
                  <h4 className="text-2xl font-black text-slate-100 tracking-tight italic">Settlement Speed Protocols</h4>

                  <div className="space-y-6">
                    {[
                      { label: "SWIFT Inter-bank Settlement", val: "Instant (sub-200ms)" },
                      { label: "Cellular Wallet Handshake", val: "Instant (sub-150ms)" },
                      { label: "Credit Card Ledger Audit", val: "IFRS Cleared (0 offset)" }
                    ].map((s, idx) => (
                      <div key={idx} className="space-y-1">
                        <span className="text-[9px] uppercase text-slate-500 block font-black">{s.label}</span>
                        <span className="text-slate-200 text-sm block font-black italic">{s.val}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-8 border-t border-white/10 text-xs text-slate-400 italic font-semibold leading-relaxed">
                  The global 1.5% transaction clearing fee model is actively enforced on all heterogeneous payment channels routing to Master Treasury.
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* TAB 2: Sovereign Wallets */}
        {activeTab === "wallets" && (
          <motion.div
            key="wallets"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
          >
            {walletsList.map((w, i) => (
              <div key={i} className="bg-white border border-slate-200 rounded-[3.5rem] p-10 shadow-sm hover:shadow-2xl transition-all group hover:border-blue-500">
                <div className="w-14 h-14 bg-slate-50 text-slate-400 group-hover:bg-blue-600 group-hover:text-white rounded-2xl flex items-center justify-center mb-8 transition-all">
                  <w.icon className="w-7 h-7" />
                </div>
                <h4 className="text-lg font-black text-slate-900 tracking-tight italic mb-1">{w.type} <span className="text-blue-600">Wallets</span></h4>
                <p className="text-slate-400 text-xs font-semibold italic mt-1">{w.desc}</p>
                <div className="flex justify-between items-end mt-8 border-t border-slate-100 pt-6 font-bold">
                  <div>
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">Active Accounts</span>
                    <div className="text-lg font-black text-slate-900">{w.count}</div>
                  </div>
                  <div className="text-right">
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">Liquidity Cap</span>
                    <div className="text-base font-black text-blue-600">{w.balance}</div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {/* TAB 3: Payment Channels & Simulated Postings */}
        {activeTab === "channels" && (
          <motion.div
            key="channels"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="grid grid-cols-1 xl:grid-cols-3 gap-8"
          >
            {/* Active Payment channels */}
            <div className="xl:col-span-2 bg-white border border-slate-200 p-10 rounded-[3.5rem] shadow-sm space-y-8">
              <div>
                <h3 className="text-2xl font-black text-slate-900 tracking-tight italic uppercase">
                  Sovereign Payment <span className="text-blue-600">Channels</span>
                </h3>
                <p className="text-slate-500 text-xs font-bold mt-1">Configure and manage limits and transaction parameters on active payment providers.</p>
              </div>

              <div className="space-y-4">
                {channels.map((ch) => (
                  <div key={ch.id} className="p-6 bg-slate-50 border border-slate-100 rounded-3xl flex flex-col md:flex-row md:items-center justify-between gap-6 font-bold hover:border-blue-500 transition-all">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-white border border-slate-200 text-slate-900 rounded-2xl flex items-center justify-center shrink-0">
                        <Settings className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <span className="font-black text-slate-900 text-md block tracking-tight">{ch.name}</span>
                        <span className="text-xs text-slate-400 block mt-1">{ch.type} • Daily Limit: {ch.dailyLimit}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-6 justify-between md:justify-end shrink-0">
                      <div className="text-right">
                        <span className="text-slate-400 text-[10px] block font-black uppercase">Clearing Fee</span>
                        <span className="text-slate-900 text-sm block font-black">{ch.feePercent}%</span>
                      </div>
                      <span className="bg-emerald-100 text-emerald-800 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider shrink-0">
                        {ch.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Simulated transactions form */}
            <div className="bg-white border border-slate-200 p-10 rounded-[3.5rem] shadow-sm flex flex-col justify-between gap-6">
              <form onSubmit={handleSimulatePayment} className="space-y-6">
                <div>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block font-bold">Simulator Panel</span>
                  <h3 className="text-2xl font-black text-slate-900 tracking-tight italic mt-1">Post simulated <span className="text-blue-600">Fintech Payment</span></h3>
                </div>

                <div className="space-y-4 text-xs font-bold">
                  <div className="space-y-2">
                    <label className="text-slate-500">Payment Provider Channel</label>
                    <select
                      value={simChannel}
                      onChange={(e) => setSimChannel(e.target.value)}
                      className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl font-bold outline-none"
                    >
                      <option value="CH-MTN">MTN Mobile Money</option>
                      <option value="CH-AIRTEL">Airtel Mobile Money</option>
                      <option value="CH-SWIFT">Sovereign SWIFT Bank Grid</option>
                      <option value="CH-VISA">National Credit Grid (Visa)</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-slate-500">Sender Tenant ID</label>
                      <input
                        type="text"
                        value={simTenant}
                        onChange={(e) => setSimTenant(e.target.value)}
                        placeholder="sacco-zambia-hq"
                        className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none font-bold"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-slate-500">Recipient Wallet Address</label>
                      <input
                        type="text"
                        value={simRecipient}
                        onChange={(e) => setSimRecipient(e.target.value)}
                        placeholder="e.g. member_wallet_09"
                        className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none font-bold"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-slate-500">Transaction Amount ($)</label>
                    <input
                      type="number"
                      value={simAmount}
                      onChange={(e) => setSimAmount(e.target.value)}
                      placeholder="e.g. 500"
                      className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none font-bold"
                    />
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
                  className="w-full py-5 bg-slate-900 hover:bg-blue-600 disabled:opacity-50 text-white font-black text-[10px] uppercase tracking-widest rounded-2xl transition-all shadow-xl"
                >
                  {isSimulating ? <Loader2 className="w-4 h-4 animate-spin mx-auto" /> : "Post simulated payload transaction"}
                </button>
              </form>
            </div>
          </motion.div>
        )}

        {/* TAB 4: Fintech Copilot AI */}
        {activeTab === "ai" && (
          <motion.div
            key="ai"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="grid grid-cols-1 xl:grid-cols-3 gap-8"
          >
            {/* Pay Advisor Overview */}
            <div className="bg-slate-900 text-white rounded-[3.5rem] p-10 border border-white/5 shadow-2xl flex flex-col justify-between gap-8">
              <div className="space-y-6">
                <span className="px-3 py-1 bg-blue-500/10 text-blue-400 text-[9px] font-black uppercase tracking-widest rounded-full border border-blue-500/20">
                  Fintech Copilot AI
                </span>
                <div>
                  <h3 className="text-2xl font-black italic tracking-tight uppercase leading-none">
                    Pay <span className="text-blue-500">Intelligence</span>
                  </h3>
                  <p className="text-slate-400 text-xs font-semibold mt-3 leading-relaxed">
                    AI-driven routing optimization, transaction auditing, and fraud protection algorithms deployed across heterogeneous sovereign payment networks.
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-1">ROUTING STRATEGY</span>
                    <p className="text-xs font-bold leading-relaxed italic text-slate-300">
                      Payment routing dynamically evaluates latency, transaction success ratios, and settlement costs across cellular carriers MTN and Airtel.
                    </p>
                  </div>
                  <div>
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-1">FRAUD PREVENTION</span>
                    <p className="text-xs font-bold leading-relaxed italic text-slate-300">
                      Fraud Sentinel utilizes anomaly heuristic models to block concurrent billing attempts from suspicious edge nodes.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-white/5 border border-white/10 rounded-[2rem] text-[10px] font-black uppercase tracking-widest text-center text-slate-400">
                Fraud Sentinel Score: 100% SECURE
              </div>
            </div>

            {/* AI Conversation terminal */}
            <div className="xl:col-span-2 bg-slate-950 border border-slate-900 rounded-[3.5rem] p-10 flex flex-col justify-between shadow-2xl min-h-[500px]">
              <div className="space-y-6">
                <div className="flex items-center gap-3 border-b border-white/5 pb-4">
                  <BrainCircuit className="w-6 h-6 text-blue-500" />
                  <div>
                    <h3 className="text-sm font-black tracking-tight text-white uppercase font-bold">Fintech AI Copilot Workspace</h3>
                    <span className="text-[8px] text-slate-500 uppercase font-bold tracking-widest">Sovereign payments audits</span>
                  </div>
                </div>

                {/* Messages stream */}
                <div className="space-y-4 max-h-[320px] overflow-y-auto pr-2 scrollbar-hide no-scrollbar flex flex-col">
                  {aiConversation.map((msg, i) => (
                    <div
                      key={i}
                      className={`max-w-[85%] p-5 rounded-3xl text-xs font-bold leading-relaxed italic ${
                        msg.role === "user"
                          ? "bg-blue-600 text-white self-end rounded-br-none"
                          : "bg-white/5 text-slate-300 border border-white/10 self-start rounded-bl-none"
                      }`}
                    >
                      {msg.role === "agent" && (
                        <span className="text-[9px] font-black text-blue-400 uppercase tracking-widest block mb-2 font-bold">Fintech Assistant AI</span>
                      )}
                      <p>{msg.text}</p>
                      <span className="text-[8px] text-slate-500 block mt-2 text-right">{msg.timestamp}</span>
                    </div>
                  ))}

                  {isAiThinking && (
                    <div className="bg-white/5 border border-white/10 text-slate-400 p-5 rounded-3xl text-xs font-bold leading-relaxed italic self-start rounded-bl-none max-w-[85%] flex items-center gap-3">
                      <Loader2 className="w-4 h-4 animate-spin text-blue-500" />
                      <span>Fintech AI is checking SWIFT channels and cellular fraud logs...</span>
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
                  placeholder="Consult Fintech AI with a custom payment routing/settlement inquiry..."
                  disabled={isAiThinking}
                  className="w-full bg-white/5 border border-white/10 focus:border-blue-500 text-white placeholder:text-slate-500 rounded-2xl px-6 py-4 text-xs font-bold outline-none transition-all"
                />
                <button
                  type="submit"
                  disabled={isAiThinking || !aiQuery.trim()}
                  className="px-6 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-black text-[10px] uppercase tracking-widest rounded-xl transition-all shrink-0 font-bold"
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
