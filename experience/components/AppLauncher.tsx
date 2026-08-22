/**
 * JUMO UEOS — Authoritative Enterprise App Launcher (9 Dots)
 * JUMO Enterprise Design System White/Slate aesthetic, responsive grid
 */

import React from 'react';
import { 
  LayoutGrid, X, Building2, HeartPulse, GraduationCap, 
  Landmark, Globe, Shield, DollarSign, Cpu, Sparkles, ArrowRight,
  Activity, Terminal, Lock, Bot, Package, Layers, Zap
} from 'lucide-react';

export interface AppLauncherProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate?: (path: string) => void;
}

const APPS = [
  { id: 'sacco', name: 'SACCO & Microfinance ERP', category: 'Financial ERP', icon: DollarSign, path: '/tenant?domain=sacco', color: 'text-emerald-600 bg-emerald-50 border-emerald-200' },
  { id: 'church', name: 'Church & Diocese ERP', category: 'Community ERP', icon: Building2, path: '/tenant?domain=church', color: 'text-purple-600 bg-purple-50 border-purple-200' },
  { id: 'healthcare', name: 'Healthcare & Hospital EHR', category: 'Medical ERP', icon: HeartPulse, path: '/tenant?domain=healthcare', color: 'text-cyan-600 bg-cyan-50 border-cyan-200' },
  { id: 'education', name: 'Education & University ERP', category: 'Academic ERP', icon: GraduationCap, path: '/tenant?domain=education', color: 'text-blue-600 bg-blue-50 border-blue-200' },
  { id: 'ngo', name: 'NGO & Humanitarian ERP', category: 'Non-Profit ERP', icon: Globe, path: '/tenant?domain=ngo', color: 'text-amber-600 bg-amber-50 border-amber-200' },
  { id: 'gov', name: 'Government & Municipal ERP', category: 'Sovereign GovTech', icon: Landmark, path: '/tenant?domain=government', color: 'text-indigo-600 bg-indigo-50 border-indigo-200' },
  { id: 'ops', name: 'Master Control Center', category: 'Core Platform', icon: Activity, path: '/operations-center', color: 'text-blue-600 bg-blue-50 border-blue-200' },
  { id: 'dev', name: 'DevOps & Hybrid Runtime', category: 'Core Platform', icon: Terminal, path: '/developer-center', color: 'text-slate-700 bg-slate-100 border-slate-300' },
  { id: 'faap', name: 'FAAP Financial Backbone', category: 'FinTech Gateway', icon: DollarSign, path: '/faap', color: 'text-emerald-600 bg-emerald-50 border-emerald-200' },
  { id: 'ai', name: 'AI Command Center', category: 'Cognitive Gateway', icon: Bot, path: '/ai-platform', color: 'text-purple-600 bg-purple-50 border-purple-200' },
  { id: 'aegis', name: 'AEGIS Zero-Trust Security', category: 'Governance', icon: Lock, path: '/security', color: 'text-rose-600 bg-rose-50 border-rose-200' },
  { id: 'marketplace', name: 'Enterprise Marketplace', category: 'Ecosystem', icon: Package, path: '/marketplace', color: 'text-blue-600 bg-blue-50 border-blue-200' },
];

export const AppLauncher: React.FC<AppLauncherProps> = ({ isOpen, onClose, onNavigate }) => {
  if (!isOpen) return null;

  const handleLaunch = (path: string) => {
    onClose();
    if (onNavigate) {
      onNavigate(path);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end p-4 sm:p-6 bg-white/40 backdrop-blur-xs animate-in fade-in duration-150">
      <div 
        className="w-full max-w-2xl bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] font-sans text-slate-900"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 px-6 border-b border-slate-200 flex items-center justify-between bg-slate-50 sticky top-0">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-blue-600 text-white shadow-xs">
              <LayoutGrid className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-900 font-sans">JUMO Enterprise App Launcher</h3>
              <p className="text-[11px] text-slate-500 font-mono">Select enterprise domain or kernel runtime to launch (#Ring-0)</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-600 hover:text-slate-700 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {APPS.map((app) => {
            const Icon = app.icon;
            return (
              <button
                key={app.id}
                onClick={() => handleLaunch(app.path)}
                className="group flex flex-col items-start p-3.5 rounded-xl border border-slate-200 hover:border-blue-400 bg-white hover:bg-blue-50/30 transition-all text-left shadow-2xs hover:shadow-sm relative"
              >
                <div className="flex items-center justify-between w-full mb-2">
                  <div className={`p-2 rounded-lg border ${app.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-[9px] font-mono uppercase tracking-wider text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded font-bold">
                    {app.category}
                  </span>
                </div>
                <h4 className="font-bold text-xs text-slate-900 group-hover:text-blue-600 transition-colors flex items-center justify-between w-full">
                  <span>{app.name}</span>
                  <ArrowRight className="w-3.5 h-3.5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-blue-600" />
                </h4>
              </button>
            );
          })}
        </div>

        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-1.5 font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>12 Core Domains Registered</span>
          </div>
          <button 
            onClick={() => handleLaunch('/domains')}
            className="text-blue-600 hover:text-blue-700 font-bold flex items-center gap-1"
          >
            <span>View Domain Registry</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AppLauncher;
