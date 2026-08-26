import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Sliders, Settings2, Shield, Network, Database, 
  Cpu, Zap, Lock, Save, RefreshCw, Layers, 
  Globe, Package, Server, Key
} from 'lucide-react';

export const ConfigStudio: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'general' | 'runtime' | 'capabilities'>('general');
  const [deploying, setDeploying] = useState(false);

  const handleDeploy = () => {
    setDeploying(true);
    setTimeout(() => setDeploying(false), 2000);
  };

  return (
    <div className="space-y-6 animate-fadeIn" id="installation-config-studio">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-slate-900 text-white rounded-xl flex items-center justify-center shadow-lg shadow-slate-500/20">
            <Sliders className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-black text-slate-900 tracking-tight">Installation, Navigation & Configuration Studio</h2>
            <p className="text-xs text-slate-500 font-semibold">Tenant Environment, Platform Capabilities & Deployment Orchestration</p>
          </div>
        </div>
        <button
          onClick={handleDeploy}
          disabled={deploying}
          className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-black uppercase tracking-wider hover:bg-blue-600 transition-all flex items-center gap-2 shadow-xs disabled:opacity-50 cursor-pointer"
        >
          {deploying ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          <span>Apply Configuration</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Navigation Sidebar */}
        <div className="lg:col-span-3 space-y-2">
          {[
            { id: 'general', label: 'General Installation', icon: Package },
            { id: 'runtime', label: 'Runtime & Clusters', icon: Server },
            { id: 'capabilities', label: 'Capability Matrix', icon: Layers },
            { id: 'environment', label: 'Env Variables', icon: Database },
            { id: 'security', label: 'Identity & Secrets', icon: Key },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as any)}
              className={`w-full flex items-center gap-3 p-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeCategory === cat.id 
                  ? 'bg-slate-900 text-white shadow-md' 
                  : 'bg-white text-slate-600 border border-slate-200/80 hover:border-slate-300'
              }`}
            >
              <cat.icon className={`w-4 h-4 ${activeCategory === cat.id ? 'text-white' : 'text-slate-400'}`} />
              {cat.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="lg:col-span-9 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6">
            {activeCategory === 'general' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div>
                    <h3 className="text-sm font-black text-slate-900 uppercase tracking-tight">Installation Profile</h3>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">Global Instance Identity</p>
                  </div>
                  <span className="text-[9px] font-mono font-black bg-blue-50 text-blue-700 px-2 py-1 rounded border border-blue-100">INSTANCE_ID: JUMO-SOV-01</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Application Handle</label>
                    <input 
                      type="text" 
                      defaultValue="JUMO Universal Enterprise OS"
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold outline-none focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Deployment Environment</label>
                    <select className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold outline-none">
                      <option>National Production (Sealed)</option>
                      <option>Sovereign Staging (Audited)</option>
                      <option>Development Sandbox</option>
                    </select>
                  </div>
                </div>

                <div className="pt-4 space-y-4">
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Navigation Structure</h4>
                  <div className="space-y-2">
                    {[
                      { id: 'overview', label: 'Unified Command Center', enabled: true },
                      { id: 'manufacturing', label: 'Manufacturing Hub', enabled: true },
                      { id: 'governance', label: 'Governance Registry', enabled: true },
                      { id: 'faap', label: 'Sovereign Ledger', enabled: false },
                    ].map((nav) => (
                      <div key={nav.id} className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-xl">
                        <div className="flex items-center gap-3">
                          <div className={`w-2 h-2 rounded-full ${nav.enabled ? 'bg-emerald-500' : 'bg-slate-300'}`}></div>
                          <span className="text-xs font-extrabold text-slate-800">{nav.label}</span>
                        </div>
                        <input type="checkbox" defaultChecked={nav.enabled} className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeCategory === 'capabilities' && (
              <div className="space-y-6">
                 <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div>
                    <h3 className="text-sm font-black text-slate-900 uppercase tracking-tight">Capability Matrix</h3>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">Enable/Disable System-Wide Functional Layers</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { id: 'ai', label: 'Cognitive Workforce (JUMO GPT)', desc: 'Enable 420+ agent automated engineering swarm.', enabled: true, icon: Cpu },
                    { id: 'analytics', label: 'National Telemetry & Analytics', desc: 'Real-time operational visibility across all nodes.', enabled: true, icon: Zap },
                    { id: 'federation', label: 'Inter-Agency Data Federation', desc: 'Secure data bridge for cross-departmental sharing.', enabled: false, icon: Network },
                    { id: 'erp', label: 'Unified ERP Integration Engine', desc: 'Canonical adapter for SAP, Oracle, and legacy systems.', enabled: true, icon: Layers },
                  ].map((cap) => (
                    <div key={cap.id} className="p-4 border border-slate-200 rounded-2xl hover:border-blue-300 transition-all space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center text-slate-600">
                          <cap.icon className="w-4 h-4" />
                        </div>
                        <input type="checkbox" defaultChecked={cap.enabled} className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                      </div>
                      <div>
                        <h4 className="text-xs font-black text-slate-900 uppercase tracking-tight">{cap.label}</h4>
                        <p className="text-[10px] text-slate-500 font-medium leading-relaxed mt-1">{cap.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeCategory === 'runtime' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div>
                    <h3 className="text-sm font-black text-slate-900 uppercase tracking-tight">Runtime & Cluster Configuration</h3>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">Underlying Compute & Scaling Parameters</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-slate-900 rounded-xl space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Active Cluster Topology</span>
                      <span className="text-[9px] font-mono font-bold text-emerald-400">HEALTH: 100%</span>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center p-3 bg-white/5 rounded-lg border border-white/10">
                        <span className="text-[8px] font-black text-slate-500 uppercase block mb-1">Compute Nodes</span>
                        <span className="text-lg font-black text-white">12</span>
                      </div>
                      <div className="text-center p-3 bg-white/5 rounded-lg border border-white/10">
                        <span className="text-[8px] font-black text-slate-500 uppercase block mb-1">Total vCPU</span>
                        <span className="text-lg font-black text-white">480</span>
                      </div>
                      <div className="text-center p-3 bg-white/5 rounded-lg border border-white/10">
                        <span className="text-[8px] font-black text-slate-500 uppercase block mb-1">Allocated RAM</span>
                        <span className="text-lg font-black text-white">1.2 TB</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Auto-Scaling Threshold</label>
                      <input type="range" className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600" />
                      <div className="flex justify-between text-[8px] font-black text-slate-500 uppercase">
                        <span>Conservative</span>
                        <span>Balanced</span>
                        <span>Aggressive</span>
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Max Concurrent Sessions</label>
                      <input 
                        type="number" 
                        defaultValue="50000"
                        className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="bg-amber-50 border border-amber-100 p-4 rounded-2xl flex items-start gap-4">
            <Shield className="w-6 h-6 text-amber-600 shrink-0 mt-1" />
            <div>
              <h4 className="text-xs font-black text-amber-900 uppercase tracking-tight">Configuration Drift Protection</h4>
              <p className="text-[10px] text-amber-800 font-medium leading-relaxed mt-1">
                This instance is currently locked by the JUMO Sovereign Control Center. Any changes made here must be verified by the National Treasury signature key before deployment.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
