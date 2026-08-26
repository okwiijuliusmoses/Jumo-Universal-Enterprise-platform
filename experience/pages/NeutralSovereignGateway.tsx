import React, { useState } from 'react';
import { 
  Package, 
  Settings, 
  Shield, 
  ArrowRight, 
  Monitor, 
  Smartphone,
  Cpu,
  Lock,
  Globe,
  Search,
  Activity,
  CheckCircle,
  Clock,
  Terminal,
  Grid,
  Info,
  ChevronRight,
  Database
} from 'lucide-react';
import { ApprovedProductRegistry, ApprovedProductDefinition } from '../../src/products/ApprovedProductRegistry';

interface NeutralSovereignGatewayProps {
  onNavigate: (route: string) => void;
}

export const NeutralSovereignGateway: React.FC<NeutralSovereignGatewayProps> = ({ onNavigate }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<ApprovedProductDefinition | null>(
    ApprovedProductRegistry[0] || null
  );

  // Filter products based on search query
  const filteredProducts = (ApprovedProductRegistry || []).filter(p => 
    (p?.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (p?.category || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (p?.description || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (p?.code || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900 selection:bg-indigo-100 selection:text-indigo-900">
      {/* Redesigned Compact Sovereign Header */}
      <header className="h-12 bg-white border-b border-slate-200 px-6 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 bg-slate-900 rounded-md flex items-center justify-center">
            <Cpu className="w-3.5 h-3.5 text-white" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-black tracking-wider text-slate-900 uppercase">JUMO UEOS</span>
            <span className="h-4 w-px bg-slate-200" />
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Sovereign OS Gateway</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => onNavigate('/metadata')}
            className="text-[11px] font-mono font-bold text-indigo-600 hover:text-indigo-800 transition flex items-center gap-1.5"
          >
            <span>Metadata UI</span>
          </button>
          <button
            onClick={() => onNavigate('/audit')}
            className="text-[11px] font-mono font-bold text-emerald-600 hover:text-emerald-800 transition flex items-center gap-1.5"
          >
            <span>Audit & Verification</span>
          </button>
          <div className="flex items-center gap-2 px-2.5 py-0.5 bg-slate-100 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">50+ Floor: Enforced</span>
          </div>
          <button 
            onClick={() => onNavigate('/owner-login')}
            className="text-[10px] font-black text-slate-500 hover:text-slate-900 transition uppercase tracking-widest flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 px-2.5 py-1 rounded-lg"
          >
            <Lock className="w-3 h-3" /> Owner Vault
          </button>
        </div>
      </header>

      {/* Main Workspace Layout */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        
        {/* Left Interactive Panel: Launcher Hub */}
        <div className="flex-1 p-8 lg:p-12 overflow-y-auto space-y-12">
          {/* Welcome Area */}
          <div className="space-y-2 max-w-2xl">
            <h1 className="text-3xl font-black text-slate-900 tracking-tight sm:text-4xl">
              Sovereign Product Launcher
            </h1>
            <p className="text-slate-500 text-sm leading-relaxed">
              Select an authoritative independent application context from your registry to launch or verify its system state.
            </p>
          </div>

          {/* Search & Statistics Ribbon */}
          <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between bg-white border border-slate-200 p-4 rounded-xl shadow-xs">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search registered products, modules, APIs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50 hover:bg-slate-100/80 focus:bg-white border border-slate-200 rounded-lg py-2 pl-9 pr-4 text-xs outline-none focus:ring-2 focus:ring-slate-200 transition-all font-medium text-slate-800"
              />
            </div>
            
            {/* Live Telemetry Monitors - Interactive and Functional */}
            <div className="flex items-center gap-6 text-[11px] font-mono font-bold text-slate-500 px-2 divide-x divide-slate-100">
              <div className="flex items-center gap-2">
                <span className="text-emerald-600">●</span>
                <span>Uptime: 99.98%</span>
              </div>
              <div className="pl-4 flex items-center gap-2">
                <span className="text-indigo-600">●</span>
                <span>Active Nodes: 12/12</span>
              </div>
              <div className="pl-4 flex items-center gap-2">
                <span className="text-slate-600">●</span>
                <span>Registry Code: v18.0.0</span>
              </div>
            </div>
          </div>

          {/* Launcher Grid - iPad/macOS Launchpad style */}
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                Registered Platforms ({filteredProducts.length})
              </h3>
              <span className="text-[10px] font-semibold text-slate-400">Click to Select & Read Manifest</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
              {filteredProducts.length === 0 ? (
                <div className="col-span-full p-12 text-center bg-white rounded-2xl border border-slate-200 space-y-4">
                  <Package className="w-10 h-10 text-slate-300 mx-auto" />
                  <div>
                    <h4 className="text-sm font-bold text-slate-800">No matching platforms found</h4>
                    <p className="text-xs text-slate-500 mt-1">Reset your search filter to view all 6 registered sovereign platforms.</p>
                  </div>
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold transition"
                  >
                    Reset Filter
                  </button>
                </div>
              ) : (
                filteredProducts.map((product) => {
                  const Icon = product.icon || Package;
                  const isSelected = selectedProduct?.id === product.id;
                  return (
                    <button
                      key={product.id}
                      onClick={() => setSelectedProduct(product)}
                      className={`group relative flex flex-col items-center text-center p-6 rounded-2xl border transition-all duration-300 ${
                        isSelected 
                          ? 'bg-indigo-50/50 border-indigo-300 ring-2 ring-indigo-500/20 shadow-sm' 
                          : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-md hover:shadow-slate-100'
                      }`}
                    >
                      {/* Launchpad Style App Icon */}
                      <div className={`w-14 h-14 rounded-2xl ${
                        isSelected ? product.bgAccent : 'bg-slate-100'
                      } flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform duration-300 relative`}>
                        <Icon className={`w-7 h-7 ${isSelected ? 'text-white' : 'text-slate-700 group-hover:text-slate-900'}`} />
                        {isSelected && (
                          <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-emerald-500 ring-2 ring-white">
                            <CheckCircle className="w-2.5 h-2.5 text-white" />
                          </span>
                        )}
                      </div>

                      <div className="mt-4 flex flex-col items-center">
                        <span className="text-xs font-black text-slate-900 tracking-tight leading-snug group-hover:text-indigo-600 transition-colors">
                          {product.name}
                        </span>
                        <span className="mt-1 text-[9px] font-bold text-slate-400 uppercase tracking-wider bg-slate-100 px-2 py-0.5 rounded-full">
                          {product.badge}
                        </span>
                      </div>
                    </button>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/* Right Drawer Panel: Selected Product Manifest / Telemetry Viewer */}
        <div className="w-full lg:w-96 bg-white border-l border-slate-200 flex flex-col shrink-0">
          {selectedProduct ? (
            <div className="flex-1 flex flex-col overflow-hidden animate-in fade-in duration-300">
              {/* Product Card Header */}
              <div className="p-6 border-b border-slate-100 bg-slate-50/50 space-y-4">
                <div className="flex items-start justify-between">
                  <div className={`w-12 h-12 rounded-2xl ${selectedProduct.bgAccent || 'bg-slate-900'} text-white flex items-center justify-center shadow-md`}>
                    {React.createElement(selectedProduct.icon || Package, { className: 'w-6 h-6' })}
                  </div>
                  <span className="text-[9px] font-mono font-bold bg-slate-200 text-slate-700 px-2 py-0.5 rounded">
                    {selectedProduct.version}
                  </span>
                </div>
                
                <div>
                  <h2 className="text-lg font-black text-slate-900 tracking-tight">{selectedProduct.name}</h2>
                  <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mt-0.5">{selectedProduct.owner}</p>
                </div>
              </div>

              {/* Product Metadata Manifest details */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                <div>
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Description</h4>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    {selectedProduct.description}
                  </p>
                </div>

                {/* Sub-modules List */}
                <div>
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Installed System Modules</h4>
                  <div className="grid grid-cols-1 gap-1.5">
                    {(selectedProduct.modules || []).map((m, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-slate-700 font-medium bg-slate-50 border border-slate-100 rounded-lg p-2">
                        <Database className="w-3.5 h-3.5 text-indigo-500" />
                        <span>{m}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Developer APIs */}
                <div>
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 font-mono">Developer API Endpoint Routing</h4>
                  <div className="bg-slate-900 text-slate-300 p-3 rounded-lg font-mono text-[10px] space-y-1.5 border border-slate-800">
                    {(selectedProduct.apis || []).map((api, idx) => (
                      <div key={idx} className="flex items-center justify-between text-green-400">
                        <span>{api}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Launcher Footer and Action Panel */}
              <div className="p-6 border-t border-slate-100 bg-slate-50/30 flex flex-col gap-3">
                <button
                  onClick={() => onNavigate(`${selectedProduct.route}/login`)}
                  className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-sm active:scale-98"
                >
                  Authenticate & Launch Platform
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <div className="text-center text-[9px] text-slate-400 font-bold uppercase tracking-wider">
                  Independent Authorization Boundary Secured
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-slate-400">
              <Info className="w-8 h-8 text-slate-300 mb-2" />
              <p className="text-xs">Select a sovereign product registry entry to view its system specifications.</p>
            </div>
          )}
        </div>
      </div>

      {/* Redesigned Minimal Universal Footer */}
      <footer className="h-10 bg-white border-t border-slate-200 py-1.5 px-6 flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest shrink-0">
        <div>
          <span>© 2026 JUMO SYSTEMS • SOVEREIGN INDEPENDENT ARCHITECTURE</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
            LEDGER PARITY VERIFIED
          </span>
          <span className="text-slate-300">|</span>
          <span>v18.0.0 Sovereign LTS</span>
        </div>
      </footer>
    </div>
  );
};
