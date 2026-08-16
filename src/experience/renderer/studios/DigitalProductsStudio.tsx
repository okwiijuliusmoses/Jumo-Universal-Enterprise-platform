import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Package,
  Layers,
  CheckCircle2,
  ExternalLink,
  Plus,
  Search,
  Filter,
  Activity,
  Server,
  Wrench,
  ShieldCheck,
  Building2,
  GraduationCap,
  Landmark,
  Cpu,
  Boxes
} from 'lucide-react';
import { StudioLifecycleNavBar } from '../../components/StudioLifecycleNavBar';

export const DigitalProductsStudio: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const manufacturedProducts = [
    {
      id: 'PROD-EDU-001',
      name: 'Wiggins Secondary School ERP',
      classification: 'ERP_ECOSYSTEM',
      domain: 'EDUCATION',
      version: '1.0.4-sovereign',
      status: 'COMMISSIONED',
      organization: 'Wiggins Secondary School / Ministry of Education',
      activeNodes: 4,
      usersCount: 1500,
      blueprintRef: 'BP-EDU-WIGGINS-2026',
      sla: '99.95%'
    },
    {
      id: 'PROD-HEALTH-002',
      name: 'Central Hospital Clinical & EHR Network',
      classification: 'ERP_ECOSYSTEM',
      domain: 'HEALTHCARE',
      version: '2.1.0-release',
      status: 'COMMISSIONED',
      organization: 'National Referral Hospital Board',
      activeNodes: 8,
      usersCount: 12000,
      blueprintRef: 'BP-HEALTH-CENTRAL-2026',
      sla: '99.99%'
    },
    {
      id: 'PROD-FIN-003',
      name: 'Commercial Core Banking & FAAP Settlement Engine',
      classification: 'COMMERCIAL_PLATFORM',
      domain: 'FINANCE',
      version: '3.0.1-certified',
      status: 'COMMISSIONED',
      organization: 'Apex Sovereign Trust Bank',
      activeNodes: 12,
      usersCount: 85000,
      blueprintRef: 'BP-FIN-APEX-2026',
      sla: '99.999%'
    },
    {
      id: 'PROD-GOV-004',
      name: 'Integrated Public Procurement & Tender Board',
      classification: 'SOFTWARE_PROGRAM',
      domain: 'GOVERNMENT',
      version: '1.2.0',
      status: 'COMMISSIONED',
      organization: 'Public Procurement & Asset Disposal Authority',
      activeNodes: 6,
      usersCount: 4500,
      blueprintRef: 'BP-GOV-PROCURE-2026',
      sla: '99.9%'
    },
    {
      id: 'PROD-MFG-005',
      name: 'Plant Floor SCADA & Material Requirements ERP',
      classification: 'ERP_ECOSYSTEM',
      domain: 'MANUFACTURING',
      version: '1.0.0',
      status: 'IN_MANUFACTURING',
      organization: 'National Agro-Industrial Milling Corporation',
      activeNodes: 2,
      usersCount: 800,
      blueprintRef: 'BP-MFG-AGRO-2026',
      sla: '99.9%'
    }
  ];

  const filteredProducts = manufacturedProducts.filter(p => {
    if (selectedCategory !== 'ALL' && p.classification !== selectedCategory) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return p.name.toLowerCase().includes(q) || p.organization.toLowerCase().includes(q) || p.domain.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto" id="digital-products-studio">
      <StudioLifecycleNavBar studioId="products" />

      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 text-white relative overflow-hidden shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-700 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/20 border border-indigo-400/20">
              <Boxes className="w-7 h-7 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl md:text-2xl font-black tracking-tight">JUMO Digital Products Catalogue</h1>
                <span className="px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 text-[10px] font-black uppercase tracking-wider border border-indigo-500/30">
                  Manufactured Systems
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium mt-1">
                Catalogue of Manufactured Sovereign ERP Ecosystems, Commercial Platforms, and Software Programs
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-indigo-600/30 flex items-center gap-2 cursor-pointer">
              <Plus className="w-3.5 h-3.5" />
              <span>Manufacture New Product</span>
            </button>
          </div>
        </div>

        {/* Global Summary */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-slate-800/80">
          <div className="bg-slate-950/40 rounded-xl p-3 border border-slate-800/60">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Manufactured Products</span>
            <div className="flex items-center justify-between mt-1">
              <span className="text-lg font-black text-white">{manufacturedProducts.length} Systems</span>
              <Package className="w-4 h-4 text-indigo-400" />
            </div>
          </div>
          <div className="bg-slate-950/40 rounded-xl p-3 border border-slate-800/60">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Active Compute Nodes</span>
            <div className="flex items-center justify-between mt-1">
              <span className="text-lg font-black text-emerald-400">32 Clustered</span>
              <Server className="w-4 h-4 text-emerald-400" />
            </div>
          </div>
          <div className="bg-slate-950/40 rounded-xl p-3 border border-slate-800/60">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Sovereign Users</span>
            <div className="flex items-center justify-between mt-1">
              <span className="text-lg font-black text-blue-400">103,800 Active</span>
              <Building2 className="w-4 h-4 text-blue-400" />
            </div>
          </div>
          <div className="bg-slate-950/40 rounded-xl p-3 border border-slate-800/60">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Average SLA Target</span>
            <div className="flex items-center justify-between mt-1">
              <span className="text-lg font-black text-amber-400">99.97%</span>
              <ShieldCheck className="w-4 h-4 text-amber-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2 overflow-x-auto">
          {['ALL', 'ERP_ECOSYSTEM', 'COMMERCIAL_PLATFORM', 'SOFTWARE_PROGRAM'].map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
              }`}
            >
              {cat.replace(/_/g, ' ')}
            </button>
          ))}
        </div>

        <div className="relative flex-1 max-w-xs">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium focus:outline-none"
          />
        </div>
      </div>

      {/* Product Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredProducts.map(p => (
          <div
            key={p.id}
            className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 space-y-4 shadow-xs hover:border-indigo-500/50 transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[9px] font-black uppercase text-indigo-500 tracking-wider">{p.classification.replace(/_/g, ' ')}</span>
                  <h3 className="text-sm font-black text-slate-900 dark:text-white">{p.name}</h3>
                </div>
                <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase ${
                  p.status === 'COMMISSIONED' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300' : 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
                }`}>
                  {p.status}
                </span>
              </div>

              <div className="text-xs text-slate-500 dark:text-slate-400 space-y-1 font-mono text-[11px]">
                <div className="flex justify-between">
                  <span>Organization:</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200 truncate max-w-[150px]">{p.organization}</span>
                </div>
                <div className="flex justify-between">
                  <span>Version:</span>
                  <span className="text-blue-500 font-bold">{p.version}</span>
                </div>
                <div className="flex justify-between">
                  <span>SLA Contract:</span>
                  <span className="text-emerald-500 font-bold">{p.sla}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl text-[10px] font-mono text-slate-600 dark:text-slate-300">
                <div>
                  <span className="text-slate-400 block text-[9px]">Cluster Nodes</span>
                  <span className="font-bold">{p.activeNodes} Active</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[9px]">Users</span>
                  <span className="font-bold">{p.usersCount.toLocaleString()} Registered</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-indigo-600 dark:text-indigo-400">
              <span className="text-[10px] font-mono text-slate-400">{p.blueprintRef}</span>
              <button className="hover:underline flex items-center gap-1 cursor-pointer">
                <span>Manage Instance</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
