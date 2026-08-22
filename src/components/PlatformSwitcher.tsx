import React, { useState } from 'react';
import { 
  LayoutGrid, GraduationCap, DollarSign, Award,
  ShieldCheck, Cpu, Cloud, Sliders, Package, Shield, ChevronRight,
  QrCode
} from 'lucide-react';
import { ApprovedProductRegistry, ApprovedProductDefinition } from '../products/ApprovedProductRegistry';

interface CapabilityItem {
  id: string;
  name: string;
  path: string;
  icon: React.ElementType;
  badge: string;
  color: string;
}

const controlCenterWorkspaces: CapabilityItem[] = [
  { id: 'scanner', name: 'QR Member ID Scanner', path: '/scanner', icon: QrCode, badge: 'VERIFIER', color: 'text-emerald-400' },
  { id: 'store', name: 'Platform & Capability Store', path: '/control-center/store', icon: Package, badge: 'CATALOG', color: 'text-cyan-600' },
  { id: 'security', name: 'AEGIS Security Operations', path: '/control-center/security', icon: Shield, badge: 'ZERO-TRUST', color: 'text-purple-600' },
  { id: 'ai', name: 'AI Command Center', path: '/control-center/ai', icon: Cpu, badge: 'ROUTER', color: 'text-violet-600' },
  { id: 'trust', name: 'JUMO TRUST Platform', path: '/control-center/trust', icon: ShieldCheck, badge: 'INTEGRITY', color: 'text-amber-600' },
  { id: 'cloud', name: 'Cloud & Infrastructure', path: '/control-center/cloud', icon: Cloud, badge: 'K8S/INFRA', color: 'text-sky-600' },
];

export const PlatformSwitcher: React.FC<{ onNavigate?: (path: string) => void }> = ({ onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (path: string) => {
    setIsOpen(false);
    if (onNavigate) {
      onNavigate(path);
    } else if (typeof window !== 'undefined') {
      window.location.href = path;
    }
  };

  // Top 3 Authoritative Products + Sovereign Control Center
  const approvedProducts = ApprovedProductRegistry;

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors flex items-center justify-center cursor-pointer"
        title="Switch JUMO Product or Control Center Workspace"
      >
        <LayoutGrid className="w-5 h-5 text-amber-400" />
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 sm:left-0 mt-2 w-84 sm:w-96 bg-white border border-slate-200 rounded-2xl shadow-2xl z-50 p-4 animate-in fade-in zoom-in-95 duration-150 text-slate-900 max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
              <div className="flex items-center gap-2 font-black text-slate-900 text-xs uppercase tracking-wider">
                <LayoutGrid className="w-4 h-4 text-emerald-600" />
                <span>JUMO Authoritative Products</span>
              </div>
              <span className="text-[10px] font-mono bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded border border-emerald-200">
                3 APPROVED PRODUCTS
              </span>
            </div>

            {/* Approved Top-Level Products */}
            <div className="mb-4">
              <h4 className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 mb-2 px-1 flex items-center justify-between">
                <span>APPROVED PRODUCTS</span>
                <span className="text-emerald-600 font-semibold">Sovereign Ecosystem</span>
              </h4>
              <div className="space-y-1.5">
                {approvedProducts.map((p) => {
                  const Icon = p.icon || Package;
                  return (
                    <button
                      key={p.id}
                      onClick={() => handleSelect(p.route)}
                      className="w-full flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-all border border-slate-100 hover:border-slate-200 text-left group cursor-pointer"
                    >
                      <div className={`w-8 h-8 ${p.bgAccent || 'bg-slate-900'} rounded-lg flex items-center justify-center text-white shrink-0 shadow-xs group-hover:scale-105 transition-transform`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-xs text-slate-900 group-hover:text-emerald-600 transition-colors truncate">
                            {p.name}
                          </span>
                          <span className="text-[9px] font-mono font-bold text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">
                            {p.badge}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 truncate mt-0.5">
                          {p.description}
                        </p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-700 group-hover:translate-x-0.5 transition-all" />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Sovereign Workspaces & Utilities */}
            <div>
              <h4 className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 mb-2 px-1">
                PLATFORM CAPABILITIES & STORE
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {controlCenterWorkspaces.map((ws) => {
                  const Icon = ws.icon || Package;
                  return (
                    <button
                      key={ws.id}
                      onClick={() => handleSelect(ws.path)}
                      className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-100 transition-colors text-left group cursor-pointer"
                    >
                      <Icon className={`w-4 h-4 shrink-0 ${ws.color}`} />
                      <div className="min-w-0">
                        <div className="font-bold text-[11px] text-slate-800 truncate group-hover:text-slate-950">
                          {ws.name}
                        </div>
                        <span className="text-[8px] font-mono text-slate-400 uppercase">
                          {ws.badge}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
