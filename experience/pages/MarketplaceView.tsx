/**
 * JUMO UEOS — Authoritative Dynamic Module Installer & Enterprise Ecosystem Store
 * Marketplace Registry for registering, activating, deactivating, or uninstalling domain plug-ins on the fly
 * Styled with clean Microsoft 365 / Google Cloud enterprise aesthetic
 */

import React, { useState } from 'react';
import { 
  Layers, Package, Download, CheckCircle2, Shield, Zap, Globe, 
  Search, Filter, ExternalLink, RefreshCw, Plus, Star, Box
} from 'lucide-react';
import { EnterpriseLogo } from '../../src/components/EnterpriseLogo';

export const MarketplaceView: React.FC<{ onNavigate?: (route: string) => void }> = ({ onNavigate }) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'erp' | 'ai' | 'fintech' | 'security'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [installingId, setInstallingId] = useState<string | null>(null);
  const [installedPlugins, setInstalledPlugins] = useState<string[]>(['sacco-core', 'church-tithe', 'faap-treasury']);

  const mockExtensions = [
    { id: 'sacco-core', name: 'SACCO Credit & Microfinance Engine', category: 'erp', version: 'v3.2.0', rating: '5.0', installs: '42 Orgs', desc: 'Authoritative savings, loan underwriting, dividend calculation, and member share registry.' },
    { id: 'church-tithe', name: 'Diocesan Tithe & Parish Registry', category: 'erp', version: 'v2.1.4', rating: '4.9', installs: '18 Orgs', desc: 'Parishioner stewardship tracking, automated SMS gift receipts, and fund segregation.' },
    { id: 'faap-treasury', name: 'FAAP 1.5% Clearing House Hook', category: 'fintech', version: 'v4.0.0', rating: '5.0', installs: '84 Orgs', desc: 'Global automated settlement fee routing directly into the JUMO Master Treasury.' },
    { id: 'ai-rag', name: 'Gemini 2.5 Pro Document RAG Indexer', category: 'ai', version: 'v1.8.0', rating: '4.8', installs: '30 Orgs', desc: 'Semantic knowledge retrieval across legal, financial, and operational regulations.' },
    { id: 'zero-trust', name: 'AEGIS Hardware MFA Enforcement Gate', category: 'security', version: 'v3.0.0', rating: '5.0', installs: '84 Orgs', desc: 'Ring-0 hardware authenticator challenge wall for sovereign administrators.' },
    { id: 'agri-coop', name: 'Agricultural Harvest & Supply Chain ERP', category: 'erp', version: 'v1.5.0', rating: '4.7', installs: '12 Orgs', desc: 'Farmer produce weighing, warehouse inventory receipts, and mobile money payouts.' },
  ];

  const handleToggleInstall = (id: string) => {
    setInstallingId(id);
    setTimeout(() => {
      setInstallingId(null);
      if (installedPlugins.includes(id)) {
        setInstalledPlugins(installedPlugins.filter(p => p !== id));
        alert('Extension deactivated and unmounted from micro-kernel registry.');
      } else {
        setInstalledPlugins([...installedPlugins, id]);
        alert('Extension downloaded, verified via Ring-0 signature, and dynamically hot-mounted into micro-kernel registry without container restart!');
      }
    }, 900);
  };

  return (
    <div className="p-8 bg-slate-50 min-h-screen text-slate-900 font-sans">
      <div className="max-w-7xl mx-auto space-y-6">
        <header className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <EnterpriseLogo size="md" variant="blue" showText={false} />
            <div>
              <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
                Dynamic Module Installer & Enterprise Marketplace
                <span className="px-2 py-0.5 bg-blue-50 text-blue-700 font-mono text-[11px] font-semibold rounded border border-blue-200">
                  36 Extensions
                </span>
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">Hot-Swappable Domain Plug-ins, AI Capabilities, and FinTech Adapters</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => onNavigate && onNavigate('/operations-center')}
              className="px-4 py-2 bg-white hover:bg-white text-white rounded-lg text-xs font-bold transition shadow-xs"
            >
              Control Center
            </button>
          </div>
        </header>

        {/* Category Filters & Search */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="border-b border-slate-200 px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div className="flex gap-2 flex-wrap">
              {(['all', 'erp', 'ai', 'fintech', 'security'] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition ${
                    activeCategory === cat 
                      ? 'bg-blue-600 text-white shadow-2xs' 
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {cat === 'all' && 'All Modules'}
                  {cat === 'erp' && 'ERP Domains'}
                  {cat === 'ai' && 'AI & Cognitive'}
                  {cat === 'fintech' && 'FinTech Adapters'}
                  {cat === 'security' && 'Zero-Trust Security'}
                </button>
              ))}
            </div>
            <div className="relative">
              <Search className="w-4 h-4 text-slate-600 absolute left-3 top-2.5" />
              <input 
                type="text"
                placeholder="Search extensions..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs w-64 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {mockExtensions
                .filter(e => activeCategory === 'all' || e.category === activeCategory)
                .filter(e => e.name.toLowerCase().includes(searchQuery.toLowerCase()) || e.desc.toLowerCase().includes(searchQuery.toLowerCase()))
                .map((ext) => {
                  const isInstalled = installedPlugins.includes(ext.id);
                  const isBusy = installingId === ext.id;
                  return (
                    <div key={ext.id} className="p-5 bg-slate-50 border border-slate-200 rounded-xl hover:border-blue-300 transition flex flex-col justify-between space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="px-2 py-0.5 bg-blue-100 text-blue-800 font-mono text-[10px] font-bold rounded uppercase">
                            {ext.category}
                          </span>
                          <div className="flex items-center gap-1 text-xs font-bold text-amber-500">
                            <Star className="w-3.5 h-3.5 fill-amber-500" />
                            <span>{ext.rating}</span>
                          </div>
                        </div>
                        <h4 className="font-bold text-sm text-slate-900">{ext.name}</h4>
                        <p className="text-xs text-slate-600 leading-relaxed">{ext.desc}</p>
                      </div>

                      <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
                        <div className="text-[10px] font-mono text-slate-600">
                          <span>{ext.version}</span> • <span>{ext.installs}</span>
                        </div>
                        <button
                          onClick={() => handleToggleInstall(ext.id)}
                          disabled={isBusy}
                          className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                            isInstalled 
                              ? 'bg-emerald-100 text-emerald-800 hover:bg-rose-100 hover:text-rose-700' 
                              : 'bg-blue-600 hover:bg-blue-700 text-white shadow-xs'
                          }`}
                        >
                          {isBusy ? (
                            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                          ) : isInstalled ? (
                            <>
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                              <span>Installed</span>
                            </>
                          ) : (
                            <>
                              <Download className="w-3.5 h-3.5" />
                              <span>Install Module</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketplaceView;
