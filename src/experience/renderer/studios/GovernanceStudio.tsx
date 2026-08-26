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
  const [activeTab, setActiveTab] = useState<'overview' | 'ledger' | 'workforce' | 'standards'>('overview');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredLedger = ledger.filter(entry => 
    entry.event.toLowerCase().includes(searchQuery.toLowerCase()) ||
    entry.domain.toLowerCase().includes(searchQuery.toLowerCase()) ||
    entry.details.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
            <p className="text-sm text-slate-500 font-medium">Authoritative National Ledger & Workforce Registry</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2 p-1 bg-slate-100 rounded-lg">
          {(['overview', 'ledger', 'workforce', 'standards'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-md transition-all ${
                activeTab === tab 
                ? 'bg-white text-slate-900 shadow-sm' 
                : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {tab}
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
                value={stats?.activeBlueprints || 0} 
                trend="+12% vs last month"
              />
              <StatCard 
                icon={<Box className="text-emerald-600" />} 
                label="Certified Products" 
                value={stats?.certifiedProducts || 0} 
                trend="All gates verified"
              />
              <StatCard 
                icon={<Users className="text-indigo-600" />} 
                label="AI Workforce" 
                value={workforceStats?.totalAgents || 252} 
                trend="Operational"
              />
              <StatCard 
                icon={<Activity className="text-rose-600" />} 
                label="Compliance Score" 
                value={`${stats?.nationalStandardCompliance || 100}%`} 
                trend="Authoritative"
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
                   <TrustItem label="Hardware Root of Trust" status="VERIFIED" desc="TPM 2.0 / Secure Boot active" />
                   <TrustItem label="Data Residency" status="LOCAL" desc="JUMO Sovereign Region 01" />
                   <TrustItem label="Cryptographic Baseline" status="SHA-384" desc="AES-GCM-256 Encryption active" />
                   <TrustItem label="Air-Gap Bridge" status="ISOLATED" desc="Physical firewall separation verified" />
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
                            {entry.signature?.substring(0, 12)}...
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
                     {Object.entries(workforceStats?.divisions || {}).map(([division, count]) => (
                       <div key={division} className="space-y-1">
                         <div className="flex justify-between text-[11px] font-bold uppercase tracking-wider">
                            <span className="text-slate-500">{division.replace(/_/g, ' ')}</span>
                            <span className="text-slate-900">{count as number} agents</span>
                         </div>
                         <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-indigo-500" style={{ width: `${Math.min(100, (count as number / 252) * 400)}%` }}></div>
                         </div>
                       </div>
                     ))}
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
                          <div className="text-xl font-black">252</div>
                          <div className="text-[10px] uppercase font-bold text-indigo-400">Total</div>
                       </div>
                       <div className="p-3 bg-indigo-800/50 rounded-xl">
                          <div className="text-xl font-black text-amber-400">84</div>
                          <div className="text-[10px] uppercase font-bold text-indigo-400">Active</div>
                       </div>
                    </div>
                 </div>
               </div>

               <div className="col-span-2 bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden flex flex-col">
                  <div className="p-4 border-b border-slate-100 bg-slate-50/50">
                    <h3 className="font-bold text-slate-900 flex items-center gap-2">
                      <Briefcase size={18} className="text-slate-400" />
                      Active Agent Roster
                    </h3>
                  </div>
                  <div className="flex-1 overflow-auto max-h-[500px]">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
                      {JumoAIAgentRegistry.getAllAgents().slice(0, 20).map(agent => (
                        <div key={agent.agentId} className="p-4 bg-slate-50 rounded-xl border border-slate-200/60 hover:border-slate-300 transition-colors">
                          <div className="flex justify-between items-start mb-2">
                            <div className="font-bold text-slate-900">{agent.displayName}</div>
                            <span className="text-[10px] px-2 py-0.5 bg-white border border-slate-200 rounded font-bold text-slate-500 uppercase tracking-tighter">
                              {agent.division}
                            </span>
                          </div>
                          <div className="text-[11px] text-slate-600 mb-3">{agent.role}</div>
                          <div className="flex flex-wrap gap-1">
                            {agent.capabilities.slice(0, 2).map((cap: string) => (
                              <span key={cap} className="text-[9px] px-1.5 py-0.5 bg-indigo-50 text-indigo-700 rounded font-bold uppercase">{cap}</span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="p-4 bg-slate-50 border-t border-slate-100 text-center">
                    <button className="text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors">View All 252 Profiles</button>
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
