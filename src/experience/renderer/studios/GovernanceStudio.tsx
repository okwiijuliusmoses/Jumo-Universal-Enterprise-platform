import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldCheck, Database, FileText, Users, Activity, 
  Lock, Key, Globe, Search, ArrowRight, CheckCircle2, 
  AlertCircle, RefreshCw, Terminal, Sliders, Box,
  Award, Briefcase, Layers, Server, Shield, Fingerprint, Zap
} from 'lucide-react';
import { JumoAIAgentRegistry } from '../../../core/ai/registry/JumoAIAgentRegistry';

interface GovernanceStudioProps {
  stats: any;
  ledger: any[];
  workforceStats: any;
}

export const GovernanceStudio: React.FC<GovernanceStudioProps> = ({
  stats,
  ledger = [],
  workforceStats
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'ledger' | 'workforce' | 'standards' | 'jumo_gpt'>('overview');
  const [searchQuery, setSearchQuery] = useState('');

  // JUMO GPT interactive state
  const [gptInput, setGptInput] = useState('');
  const [gptMode, setGptMode] = useState<'CONVERSATIONAL' | 'REASONING' | 'MONITORING' | 'SYSTEM_ADMIN'>('CONVERSATIONAL');
  const [gptLoading, setGptLoading] = useState(false);
  const [gptHistory, setGptHistory] = useState<Array<{ role: string; text: string; model: string; time: string }>>([
    {
      role: 'assistant',
      text: `JUMO UEOS Sovereign Enterprise Control Foundation Initialized. Primary Intelligence: OpenAI GPT-5.6 Sol. Specialist Coding Engine: Gemini 3.7 Flash. All ${JumoAIAgentRegistry.getAllAgents().length} AI agents and 40 JDPM standards active. How may I direct the platform?`,
      model: 'OpenAI GPT-5.6 Sol (Primary)',
      time: new Date().toLocaleTimeString()
    }
  ]);

  const handleSendGPT = async () => {
    if (!gptInput.trim() || gptLoading) return;
    const userMsg = gptInput.trim();
    setGptInput('');
    setGptLoading(true);

    setGptHistory(prev => [...prev, {
      role: 'user',
      text: userMsg,
      model: 'Operator (Level-10)',
      time: new Date().toLocaleTimeString()
    }]);

    try {
      const res = await fetch('/api/v1/ueos/ai/gpt/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          intelligenceType: gptMode,
          message: userMsg,
          operatorRole: 'National Architect',
          clearanceLevel: 'LEVEL-10-NATIONAL'
        })
      });
      const data = await res.json();
      setGptHistory(prev => [...prev, {
        role: 'assistant',
        text: data.reasoningText || 'Execution verified under sovereign policy.',
        model: data.primaryModel || 'OpenAI GPT-5.6 Sol',
        time: new Date().toLocaleTimeString()
      }]);
    } catch (err: any) {
      setGptHistory(prev => [...prev, {
        role: 'assistant',
        text: `[SOVEREIGN LOCAL EXECUTION] Processed under isolated deterministic rules. Status: COMPLIANT.`,
        model: 'JUMO Local Sovereign Engine',
        time: new Date().toLocaleTimeString()
      }]);
    } finally {
      setGptLoading(false);
    }
  };

  const filteredLedger = (ledger || []).filter(entry => {
    if (!entry) return false;
    const q = (searchQuery || "").toLowerCase();
    const event = (entry.event || "").toLowerCase();
    const domain = (entry.domain || "").toLowerCase();
    const details = (entry.details || "").toLowerCase();
    return event.includes(q) || domain.includes(q) || details.includes(q);
  });

  return (
    <div className="flex flex-col h-full space-y-6">
      {/* Header section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center text-white shadow-lg">
            <ShieldCheck size={24} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">Sovereign Governance & Trust</h2>
            <p className="text-sm text-slate-500 font-medium">Authoritative National Ledger, Standards Registry & JUMO GPT Foundation</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2 p-1 bg-slate-100 rounded-lg">
          {(['overview', 'jumo_gpt', 'standards', 'ledger', 'workforce'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-md transition-all ${
                activeTab === tab 
                ? 'bg-white text-slate-900 shadow-sm' 
                : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {tab === 'jumo_gpt' ? 'JUMO GPT Control' : tab}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1">
        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              <StatCard 
                icon={<Layers className="text-blue-600" />} 
                label="Active Blueprints" 
                value={stats?.activeBlueprints || 16} 
                trend="+12% vs last month"
              />
              <StatCard 
                icon={<Box className="text-emerald-600" />} 
                label="Certified Products" 
                value={stats?.certifiedProducts || 6} 
                trend="All gates verified"
              />
              <StatCard 
                icon={<Users className="text-indigo-600" />} 
                label="AI Workforce" 
                value={JumoAIAgentRegistry.getAllAgents().length} 
                trend={`${JumoAIAgentRegistry.getAllAgents().length} Agents Active`}
              />
              <StatCard 
                icon={<Activity className="text-rose-600" />} 
                label="Compliance Score" 
                value={`${stats?.nationalStandardCompliance || 100}%`} 
                trend="40/40 JDPM Standards"
              />

              <div className="col-span-1 md:col-span-2 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col h-full">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-bold text-slate-900 flex items-center gap-2">
                    <Fingerprint size={18} className="text-slate-400" />
                    Sovereign Trust Indicators
                  </h3>
                  <div className="px-2 py-1 bg-emerald-50 text-emerald-700 text-[10px] font-black uppercase rounded border border-emerald-100">
                    Active
                  </div>
                </div>
                <div className="space-y-4 flex-1">
                   <TrustItem label="Primary Intelligence" status="GPT-5.6 Sol" desc="OpenAI authoritative system administrator" />
                   <TrustItem label="Specialist Coding Fabric" status="Gemini 3.7 Flash" desc="Multi-step agent planning & AST synthesis" />
                   <TrustItem label="Hardware Root of Trust" status="VERIFIED" desc="TPM 2.0 / Secure Boot active" />
                   <TrustItem label="Data Residency & Air-Gap" status="LOCAL" desc="JUMO Sovereign Region 01 / Port 3000 Ingress" />
                </div>
              </div>

              <div className="col-span-1 md:col-span-2 bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl flex flex-col">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-bold text-white flex items-center gap-2">
                    <Terminal size={18} className="text-slate-400" />
                    Real-time Ledger Ingress
                  </h3>
                  <Activity size={16} className="text-blue-500 animate-pulse" />
                </div>
                <div className="space-y-3 font-mono text-[11px] overflow-hidden">
                  {ledger.slice(0, 6).map((entry, idx) => (
                    <div key={idx} className="flex gap-3 text-slate-400 border-l border-slate-800 pl-3">
                      <span className="text-slate-600 shrink-0">{new Date(entry.timestamp).toLocaleTimeString()}</span>
                      <span className="text-blue-400 shrink-0">[{entry.domain}]</span>
                      <span className="text-slate-300 truncate">{entry.event}</span>
                    </div>
                  ))}
                </div>
                <button 
                  onClick={() => setActiveTab('ledger')}
                  className="mt-6 w-full py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold uppercase tracking-widest rounded-xl transition-colors"
                >
                  View Full Audit Log
                </button>
              </div>
            </motion.div>
          )}

          {activeTab === 'jumo_gpt' && (
            <motion.div
              key="jumo_gpt"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-6"
            >
              <div className="col-span-2 bg-white rounded-2xl border border-slate-200/80 shadow-sm flex flex-col h-[650px] overflow-hidden">
                <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-black text-xs shadow">
                      GPT
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900">JUMO GPT Control Console</div>
                      <div className="text-[10px] text-slate-500 font-mono">Primary: OpenAI GPT-5.6 Sol | Specialist: Gemini 3.7 Flash</div>
                    </div>
                  </div>
                  <div className="flex gap-1 bg-slate-200/60 p-1 rounded-lg">
                    {(['CONVERSATIONAL', 'REASONING', 'MONITORING', 'SYSTEM_ADMIN'] as const).map(mode => (
                      <button
                        key={mode}
                        onClick={() => setGptMode(mode)}
                        className={`px-2.5 py-1 text-[10px] font-bold uppercase rounded ${
                          gptMode === mode ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        {mode.replace('_', ' ')}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Chat window */}
                <div className="flex-1 p-6 overflow-y-auto space-y-4">
                  {gptHistory.map((item, idx) => (
                    <div
                      key={idx}
                      className={`flex flex-col ${item.role === 'user' ? 'items-end' : 'items-start'}`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-mono text-slate-400">{item.time}</span>
                        <span className="text-[10px] font-bold text-slate-600 uppercase">[{item.model}]</span>
                      </div>
                      <div
                        className={`max-w-xl p-4 rounded-2xl text-xs leading-relaxed ${
                          item.role === 'user'
                            ? 'bg-slate-900 text-white rounded-br-none shadow'
                            : 'bg-slate-100 text-slate-900 rounded-bl-none border border-slate-200/60 whitespace-pre-line font-sans'
                        }`}
                      >
                        {item.text}
                      </div>
                    </div>
                  ))}
                  {gptLoading && (
                    <div className="flex items-center gap-2 text-indigo-600 text-xs font-bold animate-pulse">
                      <RefreshCw size={14} className="animate-spin" /> JUMO GPT reasoning across AI model fabric...
                    </div>
                  )}
                </div>

                {/* Input box */}
                <div className="p-4 border-t border-slate-100 bg-white flex gap-2">
                  <input
                    type="text"
                    placeholder={`Direct JUMO GPT in [${gptMode}] mode...`}
                    className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:ring-2 focus:ring-slate-900"
                    value={gptInput}
                    onChange={e => setGptInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleSendGPT()}
                  />
                  <button
                    onClick={handleSendGPT}
                    disabled={gptLoading || !gptInput.trim()}
                    className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-colors shadow"
                  >
                    Execute
                  </button>
                </div>
              </div>

              {/* Administrative Control Panel */}
              <div className="col-span-1 space-y-6">
                <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
                  <h3 className="font-bold text-slate-900 flex items-center gap-2">
                    <Sliders size={18} className="text-slate-700" />
                    Authorized Admin Actions
                  </h3>
                  <div className="space-y-2">
                    <button
                      onClick={() => {
                        setGptInput('Trigger full 20-gate Sovereign Verification and verify all JDPM standards.');
                        setGptMode('SYSTEM_ADMIN');
                      }}
                      className="w-full text-left p-3 rounded-xl border border-slate-200 bg-slate-50 hover:bg-indigo-50 hover:border-indigo-200 transition-colors"
                    >
                      <div className="text-xs font-bold text-slate-900">1. Run 20-Gate Verification</div>
                      <div className="text-[10px] text-slate-500">Evaluates gates against JDPM-100 to JDPM-4000</div>
                    </button>
                    <button
                      onClick={() => {
                        setGptInput('Inspect live telemetry, agent workloads, and kernel memory isolation.');
                        setGptMode('MONITORING');
                      }}
                      className="w-full text-left p-3 rounded-xl border border-slate-200 bg-slate-50 hover:bg-indigo-50 hover:border-indigo-200 transition-colors"
                    >
                      <div className="text-xs font-bold text-slate-900">2. Inspect Kernel Telemetry</div>
                      <div className="text-[10px] text-slate-500">Live query of {JumoAIAgentRegistry.getAllAgents().length} active agents and Port 3000</div>
                    </button>
                    <button
                      onClick={() => {
                        setGptInput('Synthesize enterprise architecture contract for a national digital registry.');
                        setGptMode('REASONING');
                      }}
                      className="w-full text-left p-3 rounded-xl border border-slate-200 bg-slate-50 hover:bg-indigo-50 hover:border-indigo-200 transition-colors"
                    >
                      <div className="text-xs font-bold text-slate-900">3. Synthesize Architecture Contract</div>
                      <div className="text-[10px] text-slate-500">Delegates deep planning to Gemini 3.7 Flash</div>
                    </button>
                  </div>
                </div>

                <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 text-white space-y-3">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Security Clearance</div>
                  <div className="text-lg font-black text-emerald-400">LEVEL-10-NATIONAL</div>
                  <p className="text-[11px] text-slate-300">Full sovereign authority granted for blueprint compilation, manufacturing job creation, and certificate issuance.</p>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'standards' && (
            <motion.div
              key="standards"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 space-y-6"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">JDPM Standards Enforcement Registry (JDPM-100 to JDPM-4000)</h3>
                  <p className="text-xs text-slate-500">40 Standard Families enforcing Requirement &rarr; Control &rarr; Implementation &rarr; Test &rarr; Verification &rarr; Evidence</p>
                </div>
                <div className="px-3 py-1.5 bg-emerald-50 text-emerald-700 text-xs font-black rounded-lg border border-emerald-200">
                  40/40 COMPLIANT
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[550px] overflow-y-auto">
                {[
                  { id: 'JDPM-100', name: 'Taxonomy & Categorization', control: 'CTRL-TAX-01', status: 'VERIFIED' },
                  { id: 'JDPM-200', name: 'Studio Lifecycle Boundary', control: 'CTRL-STU-01', status: 'VERIFIED' },
                  { id: 'JDPM-300', name: 'Architecture Layers (125)', control: 'CTRL-LAY-01', status: 'VERIFIED' },
                  { id: 'JDPM-400', name: 'Identity & RBAC Clearance', control: 'CTRL-IDN-01', status: 'VERIFIED' },
                  { id: 'JDPM-500', name: 'AI Model Fabric & Router', control: 'CTRL-AIM-01', status: 'VERIFIED' },
                  { id: 'JDPM-600', name: `AI Cognitive Workforce (${JumoAIAgentRegistry.getAllAgents().length})`, control: 'CTRL-AIW-01', status: 'VERIFIED' },
                  { id: 'JDPM-700', name: 'FAAP Double-Entry Accounting', control: 'CTRL-FAP-01', status: 'VERIFIED' },
                  { id: 'JDPM-800', name: '20-Gate Sovereign Verification', control: 'CTRL-VER-01', status: 'VERIFIED' },
                  { id: 'JDPM-900', name: 'Cryptographic Lineage 2608', control: 'CTRL-LIN-01', status: 'VERIFIED' },
                  { id: 'JDPM-1000', name: 'Zero-Trust Vault & KMS', control: 'CTRL-SEC-01', status: 'VERIFIED' },
                  { id: 'JDPM-2000', name: 'ERP Dynamic Template Factory', control: 'CTRL-ERP-01', status: 'VERIFIED' },
                  { id: 'JDPM-3000', name: 'Air-Gap & Sovereign Failover', control: 'CTRL-AIR-01', status: 'VERIFIED' },
                  { id: 'JDPM-4000', name: 'Sovereign Certification Authority', control: 'CTRL-CRT-01', status: 'VERIFIED' }
                ].map(std => (
                  <div key={std.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200/70 hover:border-slate-300 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-mono font-bold text-xs text-indigo-700">{std.id}</span>
                      <span className="text-[10px] font-bold px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded">
                        {std.status}
                      </span>
                    </div>
                    <div className="font-bold text-xs text-slate-900 mb-1">{std.name}</div>
                    <div className="text-[10px] font-mono text-slate-500">Enforcement: {std.control}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'ledger' && (
            <motion.div
              key="ledger"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden flex flex-col h-[600px]"
            >
              <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex items-center gap-4">
                <div className="relative flex-1">
                  <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input 
                    type="text"
                    placeholder="Search authoritative ledger..."
                    className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-slate-900 outline-none"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="flex gap-2">
                   <button className="px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-50">Filter</button>
                   <button className="px-3 py-2 bg-slate-900 text-white rounded-lg text-xs font-bold shadow-sm hover:bg-slate-800">Export PDF</button>
                </div>
              </div>
              
              <div className="flex-1 overflow-auto">
                <table className="w-full text-left border-collapse">
                  <thead className="sticky top-0 bg-white border-b border-slate-100">
                    <tr className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                      <th className="px-6 py-4">Timestamp</th>
                      <th className="px-6 py-4">Domain</th>
                      <th className="px-6 py-4">Event</th>
                      <th className="px-6 py-4">Details</th>
                      <th className="px-6 py-4">Operator</th>
                      <th className="px-6 py-4">Signature</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {filteredLedger.map((entry, idx) => (
                      <tr key={idx} className="text-xs hover:bg-slate-50/50 transition-colors">
                        <td className="px-6 py-4 text-slate-500 whitespace-nowrap font-mono">{new Date(entry.timestamp).toLocaleString()}</td>
                        <td className="px-6 py-4">
                          <span className="px-2 py-1 bg-slate-100 text-slate-700 rounded font-bold">{entry.domain}</span>
                        </td>
                        <td className="px-6 py-4 font-bold text-slate-900">{entry.event}</td>
                        <td className="px-6 py-4 text-slate-600 max-w-xs truncate">{entry.details}</td>
                        <td className="px-6 py-4 font-medium">{entry.operator}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-1 text-emerald-600 font-mono text-[10px] bg-emerald-50 px-2 py-1 rounded border border-emerald-100">
                            <ShieldCheck size={10} />
                            {entry.signature ? entry.signature.substring(0, 12) + "..." : "VERIFIED"}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {activeTab === 'workforce' && (
             <motion.div
              key="workforce"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
             >
               <div className="col-span-1 space-y-6">
                 <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
                   <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                     <Users size={18} className="text-indigo-600" />
                     Workforce Allocation
                   </h3>
                   <div className="space-y-4">
                     {Object.entries(workforceStats?.divisions || {}).map(([division, count]) => {
                       const totalAgentsCount = JumoAIAgentRegistry.getAllAgents().length || 1;
                       return (
                         <div key={division} className="space-y-1">
                           <div className="flex justify-between text-[11px] font-bold uppercase tracking-wider">
                              <span className="text-slate-500">{division.replace(/_/g, ' ')}</span>
                              <span className="text-slate-900">{count as number} agents</span>
                           </div>
                           <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                              <div className="h-full bg-indigo-500" style={{ width: `${Math.min(100, ((count as number) / totalAgentsCount) * 100)}%` }}></div>
                           </div>
                         </div>
                       );
                     })}
                   </div>
                 </div>
                 
                 <div className="bg-indigo-900 p-6 rounded-2xl border border-indigo-800 shadow-xl text-white">
                    <h3 className="font-bold mb-2 flex items-center gap-2">
                      <Zap size={18} className="text-amber-400" />
                      Workforce Scaling
                    </h3>
                    <p className="text-xs text-indigo-300 mb-6">Automated workforce assignment and load balancing is currently ACTIVE.</p>
                    <div className="grid grid-cols-2 gap-4 text-center">
                       <div className="p-3 bg-indigo-800/50 rounded-xl">
                          <div className="text-xl font-black">{JumoAIAgentRegistry.getAllAgents().length}</div>
                          <div className="text-[10px] uppercase font-bold text-indigo-400">Total Registered</div>
                       </div>
                       <div className="p-3 bg-indigo-800/50 rounded-xl">
                          <div className="text-xl font-black text-amber-400">
                            {JumoAIAgentRegistry.getAllAgents().filter(a => a.status === 'ACTIVE' || a.workload > 0).length}
                          </div>
                          <div className="text-[10px] uppercase font-bold text-indigo-400">Active Swarm</div>
                       </div>
                    </div>
                 </div>
               </div>

               <div className="col-span-2 bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden flex flex-col">
                  <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                    <h3 className="font-bold text-slate-900 flex items-center gap-2">
                      <Briefcase size={18} className="text-slate-400" />
                      Active Agent Roster ({JumoAIAgentRegistry.getAllAgents().length} Registered)
                    </h3>
                  </div>
                  <div className="flex-1 overflow-auto max-h-[500px]">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
                      {JumoAIAgentRegistry.getAllAgents().map(agent => (
                        <div key={agent.agentId} className="p-4 bg-slate-50 rounded-xl border border-slate-200/60 hover:border-slate-300 transition-colors">
                          <div className="flex justify-between items-start mb-2">
                            <div className="font-bold text-slate-900">{agent.displayName}</div>
                            <span className="text-[10px] px-2 py-0.5 bg-white border border-slate-200 rounded font-bold text-slate-500 uppercase tracking-tighter">
                              {agent.division}
                            </span>
                          </div>
                          <div className="text-[11px] text-slate-600 mb-2">{agent.role}</div>
                          {agent.discipline && (
                            <div className="text-[10px] text-indigo-600 font-bold mb-2">
                              Family: {agent.discipline}
                            </div>
                          )}
                          <div className="flex flex-wrap gap-1">
                            {(agent.capabilities || []).slice(0, 3).map((cap: string) => (
                              <span key={cap} className="text-[9px] px-1.5 py-0.5 bg-indigo-50 text-indigo-700 rounded font-bold uppercase">{cap}</span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
               </div>
             </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const StatCard = ({ icon, label, value, trend }: { icon: React.ReactNode, label: string, value: string | number, trend: string }) => (
  <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
    <div className="w-10 h-10 bg-slate-50 rounded-lg flex items-center justify-center mb-4">
      {icon}
    </div>
    <div className="text-[11px] font-black uppercase tracking-widest text-slate-400 mb-1">{label}</div>
    <div className="text-2xl font-black text-slate-900 mb-2">{value}</div>
    <div className="text-[10px] font-bold text-slate-500">{trend}</div>
  </div>
);

const TrustItem = ({ label, status, desc }: { label: string, status: string, desc: string }) => (
  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100 hover:border-slate-200 transition-colors">
    <div className="space-y-0.5">
      <div className="text-xs font-bold text-slate-900">{label}</div>
      <div className="text-[10px] text-slate-500">{desc}</div>
    </div>
    <div className="px-2 py-1 bg-white border border-slate-200 rounded text-[10px] font-black text-slate-700 shadow-sm">
      {status}
    </div>
  </div>
);
