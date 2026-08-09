import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Database, Search, Filter, Globe, Cpu, Shield, 
  Layers, Zap, ExternalLink, HardDrive, Settings,
  CheckCircle2, Activity, Box, Terminal, RefreshCw
} from 'lucide-react';

interface RegistryStudioProps {
  registryFilter: string;
  setRegistryFilter: (filter: string) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  erpEcosystems: any[];
  commercialProducts: any[];
  softwareProducts: any[];
  jobs: any[];
}

export const RegistryStudio: React.FC<RegistryStudioProps> = ({
  registryFilter,
  setRegistryFilter,
  searchTerm,
  setSearchTerm,
  erpEcosystems,
  commercialProducts,
  softwareProducts,
  jobs
}) => {
  const [activeTab, setActiveTab] = useState<'ecosystems' | 'products' | 'infrastructure'>('ecosystems');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-white">
            <Database className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-black text-slate-900 tracking-tight uppercase">Unified Registry</h2>
            <p className="text-xs text-slate-500 font-medium">Authoritative National Digital Manufacturing Registry</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3 bg-slate-50 p-1 rounded-2xl border border-slate-200">
          {(['ecosystems', 'products', 'infrastructure'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                activeTab === tab ? 'bg-white text-slate-900 shadow-sm border border-slate-200' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Filter & Sidebar */}
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
            <div className="space-y-2">
              <span className="text-[10px] font-black uppercase text-slate-800 tracking-widest block">Quick Search</span>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                  type="text" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Registry ID or Product Name..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs font-bold focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="space-y-2 pt-2 border-t border-slate-100">
              <span className="text-[10px] font-black uppercase text-slate-800 tracking-widest block">Ecosystem Segments</span>
              <div className="flex flex-col gap-1.5">
                {[
                  { id: 'erp', name: 'ERP Ecosystem', icon: Cpu },
                  { id: 'commercial', name: 'Commercial Products', icon: Zap },
                  { id: 'software', name: 'Software Ecosystem', icon: Box },
                  { id: 'production', name: 'Live Production', icon: Activity },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setRegistryFilter(item.id)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all border ${
                      registryFilter === item.id ? 'bg-blue-50 text-blue-700 border-blue-200' : 'bg-white text-slate-500 border-transparent hover:bg-slate-50'
                    }`}
                  >
                    <item.icon className={`w-4 h-4 ${registryFilter === item.id ? 'text-blue-600' : 'text-slate-400'}`} />
                    {item.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-3">
              <span className="text-[9px] font-black uppercase text-slate-400 tracking-widest block">Registry Governance</span>
              <p className="text-[10px] text-slate-500 leading-relaxed font-medium">The registry is an immutable ledger of all verified sovereign artifacts. It serves as the single source of truth for deployment auth.</p>
              <button className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-[9px] font-black uppercase tracking-widest transition-all">
                Audit Registry
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Registry List */}
        <div className="lg:col-span-9 space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-[10px] uppercase font-black text-slate-400 tracking-wider">
                    <th className="p-4 px-6">Product & Registry ID</th>
                    <th className="p-4 px-6">Architecture Baseline</th>
                    <th className="p-4 px-6">Verification Hash</th>
                    <th className="p-4 px-6">Lifecycle Status</th>
                    <th className="p-4 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <AnimatePresence mode="popLayout">
                    {/* Render based on active filter and active tab */}
                    {registryFilter === 'erp' && activeTab === 'ecosystems' && (erpEcosystems ?? []).map((record) => (
                      <motion.tr 
                        key={record.registryId}
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="hover:bg-slate-50/50 transition-colors"
                      >
                        <td className="p-4 px-6">
                          <span className="text-[11px] font-black text-slate-900 block">{record.name}</span>
                          <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">{record.registryId} • v{record.version}</span>
                        </td>
                        <td className="p-4 px-6">
                          <span className="text-[10px] font-bold text-blue-600 font-mono tracking-tight">{record.architectureBaseline}</span>
                        </td>
                        <td className="p-4 px-6">
                          <span className="text-[9px] font-mono text-slate-400 truncate max-w-[120px] block">SHA256:06dfbc2...</span>
                        </td>
                        <td className="p-4 px-6">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full font-black text-[9px] bg-emerald-50 text-emerald-700 border border-emerald-100 uppercase tracking-wider">
                            {record.lifecycleState}
                          </span>
                        </td>
                        <td className="p-4 px-6 text-right">
                          <button className="p-2 rounded-lg bg-slate-50 text-slate-400 hover:text-blue-600 border border-slate-200 transition-all cursor-pointer">
                            <ExternalLink className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </motion.tr>
                    ))}

                    {registryFilter === 'commercial' && (commercialProducts ?? []).map((record) => (
                      <motion.tr 
                        key={record.registryId}
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="hover:bg-slate-50/50 transition-colors"
                      >
                        <td className="p-4 px-6">
                          <span className="text-[11px] font-black text-slate-900 block">{record.name}</span>
                          <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">{record.registryId} • v{record.version}</span>
                        </td>
                        <td className="p-4 px-6">
                          <span className="text-[10px] font-bold text-blue-600 font-mono tracking-tight">{record.architectureBaseline}</span>
                        </td>
                        <td className="p-4 px-6">
                          <span className="text-[9px] font-mono text-slate-400 truncate max-w-[120px] block">SHA256:06dfbc2...</span>
                        </td>
                        <td className="p-4 px-6">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full font-black text-[9px] bg-emerald-50 text-emerald-700 border border-emerald-100 uppercase tracking-wider">
                            {record.lifecycleState}
                          </span>
                        </td>
                        <td className="p-4 px-6 text-right">
                          <button className="p-2 rounded-lg bg-slate-50 text-slate-400 hover:text-blue-600 border border-slate-200 transition-all cursor-pointer">
                            <ExternalLink className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </motion.tr>
                    ))}
                    
                    {/* Fallback empty states */}
                    {((registryFilter === 'erp' && (erpEcosystems ?? []).length === 0) || (registryFilter === 'commercial' && (commercialProducts ?? []).length === 0)) && (
                       <tr>
                         <td colSpan={5} className="p-20 text-center space-y-4 opacity-40">
                           <Database className="w-16 h-16 mx-auto text-slate-300" />
                           <div>
                             <p className="text-sm font-black text-slate-900 uppercase">No matching registry records</p>
                             <p className="text-xs font-bold text-slate-500 mt-1 uppercase tracking-tight">Expand search parameters or sync registry nodes.</p>
                           </div>
                         </td>
                       </tr>
                    )}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
