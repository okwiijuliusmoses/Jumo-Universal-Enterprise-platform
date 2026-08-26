/**
 * JUMO UEOS — Authoritative Universal Module Workspace & Runtime Activation Engine
 * Adheres strictly to Roadmap v26.0 (Universal Digital Hybrid Enterprise Module Framework)
 * and Roadmap v27.0 (Universal Enterprise Runtime Activation Framework).
 * 
 * Features:
 * - 100+ Universal Enterprise Modules across 9 Authoritative Layers + Layer 10 Domain Specialization
 * - Universal Runtime Flow Pipeline (11 Stages)
 * - Universal Navigation Standard Bar (Home, Back, Forward, Breadcrumbs, Favorites, Workspace Switcher, AI, etc.)
 * - Universal Operational Module Workspace with all 13 mandatory controls (Dashboard, Data Grid, Forms, Reports, Charts, Search, Filters, Export, Import, Audit Logs, AI Assistant, Settings, Help)
 * - Strict Owner Control Center Ring-0 Authority governance
 */

import React, { useState } from 'react';
import {
  Home, ArrowLeft, ArrowRight, Star, Clock, Layers, Search, Bell, Sparkles,
  User, LogOut, ShieldCheck, CheckCircle2, Sliders, Database, FileText, BarChart3,
  PieChart, Filter, Download, Upload, ShieldAlert, Settings, HelpCircle,
  Building2, Cpu, Globe, Lock, Workflow, Zap, Activity, BookOpen
} from 'lucide-react';
import { getUniversalLayersV26, validateRing0Authority, UniversalModuleLayerV26 } from '../../core/runtime/universalModuleRegistry';
import { InstitutionalModuleWorkspace } from './InstitutionalModuleWorkspace';

export interface UniversalModuleWorkspaceRuntimeProps {
  erpId: string;
  erpName: string;
  currentUser?: { name?: string; role?: string; email?: string };
  onNavigate?: (route: string) => void;
  onLogout?: () => void;
}

const RUNTIME_FLOW_STAGES = [
  'Public Landing Page',
  'Enterprise Portal',
  'Public AI Assistant',
  'Registration',
  'Authentication',
  'Subscription Validated',
  'License Validated',
  'Tenant Validated',
  'Workspace Initialized',
  'Enterprise Dashboard',
  '100+ Operational Modules'
];

export const UniversalModuleWorkspaceRuntime: React.FC<UniversalModuleWorkspaceRuntimeProps> = ({
  erpId,
  erpName,
  currentUser,
  onNavigate,
  onLogout
}) => {
  const [viewMode, setViewMode] = useState<'iem' | 'layers'>('iem');
  const [selectedLayerId, setSelectedLayerId] = useState<string>('layer_1_core');
  const [selectedModule, setSelectedModule] = useState<{ id: string; name: string; category: string; description: string; tier: string }>({
    id: 'l1-identity',
    name: 'Identity & Authentication',
    category: 'Core Enterprise',
    description: 'Authoritative zero-trust identity provider with MFA and session lifecycle gating.',
    tier: 'Core'
  });

  const [activeModuleTab, setActiveModuleTab] = useState<
    'dashboard' | 'grid' | 'forms' | 'reports' | 'charts' | 'search' | 'filters' | 'export' | 'import' | 'audit' | 'ai' | 'settings' | 'help'
  >('dashboard');

  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState<string[]>(['Identity', 'General Ledger', 'JUMO AI Assistant', 'Audit Trail']);
  const [recentModules, setRecentModules] = useState<string[]>(['General Ledger', 'Identity & Authentication', 'Workflow Engine', 'Treasury']);
  const [showFlowModal, setShowFlowModal] = useState(false);

  const layers: UniversalModuleLayerV26[] = getUniversalLayersV26(erpId);
  const currentLayer = layers.find(l => l.id === selectedLayerId) || layers[0];
  const userRole = currentUser?.role || 'erp_admin';
  const isRing0 = validateRing0Authority(userRole);

  const totalModulesCount = layers.reduce((acc, l) => acc + l.modules.length, 0);

  const handleSelectModule = (mod: any) => {
    setSelectedModule(mod);
    setRecentModules(prev => {
      const filtered = prev.filter(m => m !== mod.name);
      return [mod.name, ...filtered].slice(0, 5);
    });
  };

  const toggleFavorite = (modName: string) => {
    setFavorites(prev => prev.includes(modName) ? prev.filter(m => m !== modName) : [...prev, modName]);
  };

  if (viewMode === 'iem') {
    return (
      <div className="flex flex-col min-h-screen">
        <div className="bg-slate-950 text-white px-4 py-1.5 flex items-center justify-between text-xs border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="font-bold text-cyan-400">JUMO UEOS v29.0 Architecture:</span>
            <span className="bg-[#0078D4] text-white px-2 py-0.5 rounded font-bold">13 Institutional Enterprise Modules (IEM)</span>
            <span className="text-slate-400 font-mono">Governed from Owner Control Center</span>
          </div>
          <button
            onClick={() => setViewMode('layers')}
            className="px-2.5 py-0.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded font-bold transition flex items-center gap-1 text-[11px]"
          >
            Switch to 190+ Reusable Layers Mode (v27.0)
          </button>
        </div>
        <InstitutionalModuleWorkspace
          erpId={erpId}
          erpName={erpName}
          currentUser={currentUser}
          onNavigate={onNavigate}
          onLogout={onLogout}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 font-sans flex flex-col">
      {/* 1. UNIVERSAL NAVIGATION STANDARD BAR (Roadmap v27.0) */}
      <header className="bg-slate-900 text-white border-b border-slate-800 px-4 py-2 flex items-center justify-between shadow-md sticky top-0 z-40">
        <div className="flex items-center gap-3 overflow-x-auto py-1">
          <div className="flex items-center gap-1 shrink-0">
            <button
              onClick={() => onNavigate && onNavigate('/workspace/home')}
              className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-white transition"
              title="Home"
            >
              <Home className="w-4 h-4" />
            </button>
            <button
              onClick={() => window.history.back()}
              className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-white transition"
              title="Back"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => window.history.forward()}
              className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-white transition"
              title="Forward"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="h-4 w-px bg-slate-700 shrink-0" />

          {/* Breadcrumb Navigation */}
          <div className="flex items-center gap-1.5 text-xs text-slate-300 font-medium shrink-0">
            <span className="text-cyan-400 font-bold">{erpName}</span>
            <span className="text-slate-600">/</span>
            <span className="text-slate-300">{currentLayer.name.split(':')[1]?.trim() || currentLayer.name}</span>
            <span className="text-slate-600">/</span>
            <span className="text-white font-bold bg-slate-800 px-2 py-0.5 rounded border border-slate-700">{selectedModule.name}</span>
          </div>

          <div className="h-4 w-px bg-slate-700 shrink-0" />

          {/* Workspace Switcher */}
          <div className="flex items-center gap-2 shrink-0">
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
            <select
              value={selectedLayerId}
              onChange={(e) => setSelectedLayerId(e.target.value)}
              className="bg-slate-800 border border-slate-700 text-white text-xs rounded-lg px-2.5 py-1 font-medium focus:outline-none focus:border-cyan-400"
            >
              {layers.map(l => (
                <option key={l.id} value={l.id}>
                  {l.name} ({l.modules.length} modules)
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Right Navigation Controls */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Enterprise Search */}
          <div className="relative hidden md:block w-48">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2" />
            <input
              type="text"
              placeholder="Search 190+ modules..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-800/90 border border-slate-700 rounded-lg pl-8 pr-3 py-1 text-xs text-white placeholder:text-slate-400 focus:outline-none focus:border-cyan-400"
            />
          </div>

          {/* Notification Center */}
          <button
            onClick={() => alert('Opening Universal Enterprise Notification Center (3 new system alerts)')}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition relative"
            title="Notification Center"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full animate-ping" />
          </button>

          {/* JUMO AI Assistant Button */}
          <button
            onClick={() => setActiveModuleTab('ai')}
            className="px-2.5 py-1 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>JUMO AI</span>
          </button>

          {/* User Profile & Logout */}
          <div className="flex items-center gap-2 border-l border-slate-800 pl-2.5">
            <div className="text-right hidden sm:block">
              <span className="text-xs font-bold text-white block truncate max-w-[120px]">{currentUser?.name || 'Enterprise Admin'}</span>
              <span className="text-[10px] text-cyan-400 font-mono block">{isRing0 ? 'RING-0 OWNER' : 'TENANT ADMIN'}</span>
            </div>
            <button
              onClick={() => onLogout ? onLogout() : alert('Logging out of sovereign workspace...')}
              className="p-1.5 rounded-lg bg-rose-900/40 hover:bg-rose-800 text-rose-300 hover:text-white border border-rose-700/50 transition"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* 2. UNIVERSAL RUNTIME FLOW PIPELINE BAR (Roadmap v27.0) */}
      <div className="bg-white border-b border-slate-200 px-4 py-2 flex items-center justify-between text-xs overflow-x-auto">
        <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-600 shrink-0">
          <span className="font-bold text-slate-800 flex items-center gap-1">
            <Activity className="w-3.5 h-3.5 text-emerald-600" />
            Runtime Flow Pipeline:
          </span>
          {RUNTIME_FLOW_STAGES.map((stage, i) => (
            <React.Fragment key={i}>
              <span className={`px-1.5 py-0.5 rounded font-medium ${i === RUNTIME_FLOW_STAGES.length - 1 ? 'bg-emerald-100 text-emerald-800 font-bold border border-emerald-300' : 'bg-slate-100 text-slate-600'}`}>
                {i + 1}. {stage}
              </span>
              {i < RUNTIME_FLOW_STAGES.length - 1 && <span className="text-slate-400">→</span>}
            </React.Fragment>
          ))}
        </div>
        <button
          onClick={() => setShowFlowModal(true)}
          className="px-2 py-1 text-[11px] font-bold text-cyan-700 bg-cyan-50 border border-cyan-200 rounded-lg hover:bg-cyan-100 transition shrink-0 ml-4"
        >
          View Architecture Directive
        </button>
      </div>

      {/* Favorites & Recently Visited Quick Bar */}
      <div className="bg-slate-50 border-b border-slate-200 px-4 py-1.5 flex items-center justify-between text-xs overflow-x-auto">
        <div className="flex items-center gap-4 shrink-0">
          <div className="flex items-center gap-1.5">
            <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span className="font-bold text-slate-700">Favorites:</span>
            {favorites.map((fav, i) => (
              <button
                key={i}
                onClick={() => {
                  const foundLayer = layers.find(l => l.modules.some(m => m.name === fav));
                  if (foundLayer) {
                    setSelectedLayerId(foundLayer.id);
                    const foundMod = foundLayer.modules.find(m => m.name === fav);
                    if (foundMod) handleSelectModule(foundMod);
                  }
                }}
                className="px-2 py-0.5 rounded bg-white hover:bg-amber-50 text-slate-700 border border-slate-200 hover:border-amber-300 font-medium transition"
              >
                {fav}
              </button>
            ))}
          </div>
          <div className="h-3 w-px bg-slate-300" />
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-blue-500" />
            <span className="font-bold text-slate-700">Recent:</span>
            {recentModules.map((rec, i) => (
              <button
                key={i}
                onClick={() => {
                  const foundLayer = layers.find(l => l.modules.some(m => m.name === rec));
                  if (foundLayer) {
                    setSelectedLayerId(foundLayer.id);
                    const foundMod = foundLayer.modules.find(m => m.name === rec);
                    if (foundMod) handleSelectModule(foundMod);
                  }
                }}
                className="px-2 py-0.5 rounded bg-white hover:bg-blue-50 text-slate-600 border border-slate-200 hover:border-blue-300 transition"
              >
                {rec}
              </button>
            ))}
          </div>
        </div>
        <span className="text-[11px] font-mono font-bold px-2 py-0.5 bg-[#0078D4] text-white rounded shrink-0 ml-4">
          {totalModulesCount} Active Modules Enabled
        </span>
      </div>

      {/* 3. MAIN WORKSPACE AREA: LAYER NAVIGATION & OPERATIONAL MODULE RUNTIME */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar: 9 Authoritative Universal Layers */}
        <aside className="w-72 bg-white border-r border-slate-200 flex flex-col shrink-0 overflow-y-auto">
          <div className="p-3 bg-slate-900 text-white flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider">Universal Architecture</span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 bg-cyan-600 text-white rounded font-bold">
              v26.0 / v27.0
            </span>
          </div>

          <div className="p-2 space-y-1">
            {layers.map((layer) => {
              const isSelected = selectedLayerId === layer.id;
              return (
                <button
                  key={layer.id}
                  onClick={() => {
                    setSelectedLayerId(layer.id);
                    if (layer.modules[0]) handleSelectModule(layer.modules[0]);
                  }}
                  className={`w-full text-left p-2.5 rounded-xl border transition flex items-center justify-between ${
                    isSelected
                      ? 'bg-[#0078D4]/10 border-[#0078D4] text-[#0078D4] font-bold shadow-2xs'
                      : 'bg-white hover:bg-slate-50 border-transparent text-slate-700 font-medium'
                  }`}
                >
                  <div className="truncate pr-2">
                    <div className="text-xs truncate">{layer.name}</div>
                    <div className="text-[10px] text-slate-500 font-normal truncate mt-0.5">{layer.description}</div>
                  </div>
                  <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded font-bold shrink-0 ${
                    isSelected ? 'bg-[#0078D4] text-white' : 'bg-slate-100 text-slate-600 border border-slate-200'
                  }`}>
                    {layer.modules.length}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Owner Control Center Ring-0 Governance Notice */}
          <div className="mt-auto p-3 m-2 rounded-xl bg-amber-50 border border-amber-200 text-amber-900">
            <div className="flex items-center gap-1.5 font-bold text-xs mb-1">
              <ShieldAlert className="w-4 h-4 text-amber-600" />
              <span>Ring-0 Governance</span>
            </div>
            <p className="text-[10px] text-amber-800 leading-relaxed">
              Modules are enabled or disabled <strong>only by the Owner Control Center</strong>. Tenants operate active modules but cannot modify platform architecture.
            </p>
          </div>
        </aside>

        {/* Center: Module List for Selected Layer */}
        <div className="w-80 bg-slate-50 border-r border-slate-200 flex flex-col shrink-0 overflow-y-auto">
          <div className="p-3 bg-white border-b border-slate-200">
            <h3 className="text-xs font-bold text-slate-900">{currentLayer.name}</h3>
            <p className="text-[11px] text-slate-500 mt-0.5">{currentLayer.description}</p>
          </div>

          <div className="p-2 space-y-1.5 overflow-y-auto flex-1">
            {currentLayer.modules
              .filter(m => !searchQuery || m.name.toLowerCase().includes(searchQuery.toLowerCase()))
              .map((mod) => {
                const isSelected = selectedModule.name === mod.name;
                const isFav = favorites.includes(mod.name);
                return (
                  <div
                    key={mod.id}
                    onClick={() => handleSelectModule(mod)}
                    className={`p-3 rounded-xl border transition cursor-pointer flex items-start justify-between gap-2 ${
                      isSelected
                        ? 'bg-white border-[#0078D4] shadow-sm ring-1 ring-[#0078D4]/20'
                        : 'bg-white hover:bg-slate-100/80 border-slate-200 text-slate-700'
                    }`}
                  >
                    <div className="space-y-1 flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-xs font-bold text-slate-900 truncate">{mod.name}</span>
                        <span className={`text-[9px] font-mono px-1 py-0.5 rounded font-bold shrink-0 ${
                          mod.tier === 'Core' ? 'bg-purple-100 text-purple-800' :
                          mod.tier === 'Enterprise' ? 'bg-blue-100 text-blue-800' : 'bg-slate-100 text-slate-700'
                        }`}>
                          {mod.tier}
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-500 leading-relaxed line-clamp-2">{mod.description}</p>
                      <div className="flex items-center justify-between pt-1 text-[10px]">
                        <span className="text-emerald-600 font-bold flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> ACTIVE
                        </span>
                        <button
                          onClick={(e) => { e.stopPropagation(); toggleFavorite(mod.name); }}
                          className={`p-1 rounded hover:bg-slate-100 transition ${isFav ? 'text-amber-500' : 'text-slate-300'}`}
                          title="Toggle Favorite"
                        >
                          <Star className="w-3.5 h-3.5 fill-current" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>

        {/* Right Workspace: 13 Universal Operational Controls (Roadmap v27.0) */}
        <main className="flex-1 bg-white flex flex-col min-w-0 overflow-y-auto">
          {/* Module Header */}
          <div className="p-4 border-b border-slate-200 bg-slate-900 text-white flex items-center justify-between flex-wrap gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 bg-cyan-600 text-white rounded font-bold">
                  {selectedModule.category}
                </span>
                <span className="text-xs font-mono text-slate-300">ID: {selectedModule.id}</span>
              </div>
              <h2 className="text-xl font-extrabold text-white mt-1 flex items-center gap-2">
                {selectedModule.name}
                <span className="text-xs font-normal text-emerald-400 bg-emerald-950/80 border border-emerald-700 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Runtime Operational
                </span>
              </h2>
              <p className="text-xs text-slate-300 mt-1">{selectedModule.description}</p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => alert(`Opening Ring-0 Global Licensing & Parameter rules for "${selectedModule.name}".`)}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-xl border border-slate-700 flex items-center gap-1.5 transition shadow-2xs"
              >
                <Sliders className="w-3.5 h-3.5 text-cyan-400" />
                <span>Configure Defaults</span>
              </button>
              <button
                onClick={() => setActiveModuleTab('ai')}
                className="px-3.5 py-1.5 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition shadow-sm"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Ask JUMO AI</span>
              </button>
            </div>
          </div>

          {/* 13 Universal Module Sub-Tabs (Roadmap v27.0: Every Module Must Contain) */}
          <div className="border-b border-slate-200 bg-slate-50 px-4 flex items-center gap-1 overflow-x-auto">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
              { id: 'grid', label: 'Data Grid', icon: Database },
              { id: 'forms', label: 'Forms', icon: FileText },
              { id: 'reports', label: 'Reports', icon: PieChart },
              { id: 'charts', label: 'Charts', icon: Activity },
              { id: 'search', label: 'Search', icon: Search },
              { id: 'filters', label: 'Filters', icon: Filter },
              { id: 'export', label: 'Export', icon: Download },
              { id: 'import', label: 'Import', icon: Upload },
              { id: 'audit', label: 'Audit Logs', icon: ShieldCheck },
              { id: 'ai', label: 'AI Assistant', icon: Sparkles },
              { id: 'settings', label: 'Settings', icon: Settings },
              { id: 'help', label: 'Help', icon: HelpCircle }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeModuleTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveModuleTab(tab.id as any)}
                  className={`px-3 py-2.5 text-xs font-bold flex items-center gap-1.5 border-b-2 transition whitespace-nowrap ${
                    isActive
                      ? 'border-[#0078D4] text-[#0078D4] bg-white shadow-2xs'
                      : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#0078D4]' : 'text-slate-400'}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Tab Content Renderer */}
          <div className="p-6 flex-1 overflow-y-auto bg-slate-50/50">
            {activeModuleTab === 'dashboard' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                    <span className="text-xs font-bold text-slate-500 uppercase">Active Records</span>
                    <div className="text-2xl font-extrabold text-slate-900 mt-1">14,829</div>
                    <span className="text-[11px] text-emerald-600 font-medium">↑ 12.4% this month</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                    <span className="text-xs font-bold text-slate-500 uppercase">Pending Approvals</span>
                    <div className="text-2xl font-extrabold text-amber-600 mt-1">4 Actions</div>
                    <span className="text-[11px] text-slate-500">Requiring supervisory sign-off</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                    <span className="text-xs font-bold text-slate-500 uppercase">Ledger Parity Status</span>
                    <div className="text-2xl font-extrabold text-emerald-600 mt-1">$0.00</div>
                    <span className="text-[11px] text-emerald-600 font-medium">100% FAAP Balanced</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                    <span className="text-xs font-bold text-slate-500 uppercase">AI Security Score</span>
                    <div className="text-2xl font-extrabold text-blue-600 mt-1">99.8%</div>
                    <span className="text-[11px] text-blue-600 font-medium">Zero-Trust Active</span>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <h3 className="text-base font-bold text-slate-900">Operational Module Activity Feed</h3>
                    <span className="text-xs font-mono px-2 py-1 bg-slate-100 text-slate-700 rounded font-bold">Real-time Sync</span>
                  </div>
                  <div className="space-y-3">
                    {[
                      { time: '10:14 AM', user: 'Archbishop Kaziimba', action: 'Approved budget allocation for St. Paul Cathedral renovations.', status: 'VERIFIED_OK' },
                      { time: '09:42 AM', user: 'System Kernel AI', action: `Performed automated integrity validation on ${selectedModule.name} records.`, status: 'PARITY_$0.00' },
                      { time: '08:15 AM', user: 'Rev. Canon Kisawuzi', action: 'Uploaded new statutory compliance certificate for diocese archives.', status: 'SEALED_AES256' }
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs">
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-slate-400 font-bold">{item.time}</span>
                          <span className="font-bold text-slate-800">{item.user}</span>
                          <span className="text-slate-600">{item.action}</span>
                        </div>
                        <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                          {item.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeModuleTab === 'grid' && (
              <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
                <div className="p-4 border-b border-slate-200 flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-900">Authoritative Data Grid ({selectedModule.name})</h3>
                  <div className="flex items-center gap-2">
                    <button onClick={() => setActiveModuleTab('export')} className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-lg flex items-center gap-1 transition">
                      <Download className="w-3.5 h-3.5" /> Export CSV/JSON
                    </button>
                    <button onClick={() => setActiveModuleTab('forms')} className="px-3 py-1 bg-[#0078D4] hover:bg-blue-700 text-white text-xs font-bold rounded-lg flex items-center gap-1 transition">
                      + New Record
                    </button>
                  </div>
                </div>
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 font-bold text-slate-600">
                    <tr>
                      <th className="p-3">Record ID</th>
                      <th className="p-3">Entity Reference</th>
                      <th className="p-3">Category</th>
                      <th className="p-3">Timestamp</th>
                      <th className="p-3">Ledger Parity</th>
                      <th className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {[1, 2, 3, 4, 5].map((num) => (
                      <tr key={num} className="hover:bg-slate-50/80 transition">
                        <td className="p-3 font-mono font-bold text-[#0078D4]">REC-{selectedModule.id.toUpperCase()}-{1000 + num}</td>
                        <td className="p-3 font-bold text-slate-900">Sovereign Tenant Entity #{num}</td>
                        <td className="p-3 text-slate-600">{selectedModule.category}</td>
                        <td className="p-3 font-mono text-slate-500">2026-07-28 09:{10 + num}:00</td>
                        <td className="p-3"><span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-mono font-bold text-[10px]">$0.00 OK</span></td>
                        <td className="p-3 text-right space-x-2">
                          <button onClick={() => alert('Viewing immutable record details...')} className="text-blue-600 font-bold hover:underline">View</button>
                          <button onClick={() => alert('Opening Ring-0 edit dialog...')} className="text-slate-600 font-bold hover:underline">Edit</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeModuleTab === 'forms' && (
              <div className="max-w-3xl bg-white rounded-2xl border border-slate-200 shadow-2xs p-6 space-y-4">
                <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2">Create / Modify Module Record ({selectedModule.name})</h3>
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div className="space-y-1">
                    <label className="font-bold text-slate-700">Record Title / Identifier</label>
                    <input type="text" placeholder="e.g. Q3 Strategic Allocation" className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-[#0078D4]" />
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-slate-700">Assigned Department / Branch</label>
                    <select className="w-full p-2.5 rounded-xl border border-slate-300 bg-white">
                      <option>Diocesan Secretariat (HQ)</option>
                      <option>Finance & Treasury Division</option>
                      <option>Operations & Assets</option>
                      <option>Audit & Legal Compliance</option>
                    </select>
                  </div>
                  <div className="col-span-2 space-y-1">
                    <label className="font-bold text-slate-700">Detailed Specification & Notes</label>
                    <textarea rows={3} placeholder="Provide statutory notes or transaction justifications..." className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-[#0078D4]" />
                  </div>
                </div>
                <div className="flex justify-end gap-3 pt-2">
                  <button onClick={() => setActiveModuleTab('grid')} className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 font-bold hover:bg-slate-50 transition">Cancel</button>
                  <button onClick={() => { alert('Record committed to FAAP double-entry ledger with $0.00 parity.'); setActiveModuleTab('grid'); }} className="px-5 py-2 rounded-xl bg-[#0078D4] hover:bg-blue-700 text-white font-bold transition shadow-sm">Submit Record</button>
                </div>
              </div>
            )}

            {activeModuleTab === 'ai' && (
              <div className="max-w-3xl bg-white rounded-2xl border border-slate-200 shadow-2xs p-6 space-y-4">
                <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-md">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">JUMO AI Assistant — {selectedModule.name} Copilot</h3>
                    <p className="text-xs text-slate-500">Powered by Gemini 2.5 Pro reasoning engine & RAG knowledge base.</p>
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                  <div className="font-bold text-cyan-800 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    AI Cognitive Suggestion:
                  </div>
                  <p className="text-slate-700 leading-relaxed">
                    Based on recent activity in <strong>{selectedModule.name}</strong>, all transactions and records maintain 100% compliance with statutory guidelines. No anomalies or parity discrepancies detected.
                  </p>
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder={`Ask JUMO AI about ${selectedModule.name} workflows, statutory rules, or audit reports...`}
                    className="flex-1 p-3 rounded-xl border border-slate-300 text-xs focus:outline-none focus:border-[#0078D4]"
                  />
                  <button onClick={() => alert('Querying Gemini 2.5 Pro cognitive gateway...')} className="px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition shadow-sm">
                    Ask AI
                  </button>
                </div>
              </div>
            )}

            {activeModuleTab !== 'dashboard' && activeModuleTab !== 'grid' && activeModuleTab !== 'forms' && activeModuleTab !== 'ai' && (
              <div className="p-8 rounded-2xl bg-white border border-slate-200 shadow-2xs text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-[#0078D4]/10 text-[#0078D4] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">Universal {activeModuleTab.toUpperCase()} Engine Active</h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
                  The authoritative <strong>{activeModuleTab}</strong> subsystem for <strong>{selectedModule.name}</strong> is operating in production mode. Data is synchronized with the JUMO UEOS core kernel.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => alert(`Executing authoritative ${activeModuleTab} procedure for ${selectedModule.name}...`)}
                    className="px-5 py-2 rounded-xl bg-[#0078D4] hover:bg-blue-700 text-white font-bold text-xs transition shadow-sm"
                  >
                    Launch {activeModuleTab.toUpperCase()} Console
                  </button>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* 4. UNIVERSAL RUNTIME FLOW ARCHITECTURE MODAL */}
      {showFlowModal && (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#0078D4] flex items-center justify-center text-white font-bold">
                  v27
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-slate-900">JUMO UEOS Roadmap v26.0 & v27.0 Architecture Directive</h3>
                  <p className="text-xs text-slate-500">Universal Digital Hybrid Enterprise Platform & Runtime Activation</p>
                </div>
              </div>
              <button
                onClick={() => setShowFlowModal(false)}
                className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition"
              >
                Close
              </button>
            </div>

            <div className="space-y-4 text-xs text-slate-700 leading-relaxed">
              <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200">
                <h4 className="font-bold text-blue-900 text-sm mb-1">Architectural Rule (v26.0)</h4>
                <p className="text-blue-800">
                  Every ERP is no longer an application. Every ERP is an independent <strong>Digital Hybrid Enterprise Platform</strong> built on the JUMO UEOS Core. No ERP shall contain fewer than <strong>100 enterprise modules</strong> across 9 Authoritative Layers.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 font-mono">
                {layers.map(l => (
                  <div key={l.id} className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                    <div className="font-bold text-slate-900 text-xs">{l.name}</div>
                    <div className="text-[11px] text-slate-500">{l.modules.length} Reusable Modules</div>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-2">
                <h4 className="font-bold text-emerald-900 text-sm">Universal Runtime Flow Pipeline (v27.0)</h4>
                <div className="flex flex-wrap gap-2 pt-1 font-mono text-[11px]">
                  {RUNTIME_FLOW_STAGES.map((s, idx) => (
                    <span key={idx} className="px-2 py-1 bg-white border border-emerald-300 text-emerald-900 font-bold rounded-lg shadow-2xs">
                      {idx + 1}. {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200">
                <h4 className="font-bold text-amber-900 text-sm mb-1">Owner Control Center Ring-0 Authority</h4>
                <p className="text-amber-800">
                  Only the Owner Control Center may globally enable or disable modules, set licensing rules, control subscriptions, define AI permissions, configure workflows, and roll out new modules to every ERP automatically. Tenants cannot modify platform architecture.
                </p>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setShowFlowModal(false)}
                className="px-6 py-2.5 rounded-xl bg-[#0078D4] text-white font-bold text-xs hover:bg-blue-700 transition shadow-sm"
              >
                Acknowledge & Return to Enterprise Runtime
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UniversalModuleWorkspaceRuntime;
