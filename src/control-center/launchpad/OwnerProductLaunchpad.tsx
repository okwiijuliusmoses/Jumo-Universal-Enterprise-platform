import React, { useState } from 'react';
import { Landmark, GraduationCap, Church, ArrowRight, Layers } from 'lucide-react';
import { ownerVerificationService } from '../../core/security/ownerVerificationService';

interface OwnerProductLaunchpadProps {
  onNavigate: (route: string) => void;
  currentUser?: {
    name?: string;
    email?: string;
    role?: string;
  };
}

export const SOVEREIGN_PRODUCTS = [
  {
    id: 'JUMO-FINTECH',
    name: 'JUMO FINTECH',
    subtitle: 'Universal financial technology platform',
    desc: 'Financial Accounting, Universal Payment Switch, Microfinance, Wallets, FX, and 30+ Financial Module Families.',
    route: '/platform/finpay',
    icon: Landmark,
    accentColor: 'border-emerald-500 bg-emerald-50/50 text-emerald-900',
    badge: 'FINANCE & PAYMENTS',
    badgeStyle: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    buttonLabel: 'Open JUMO FINTECH',
    navItems: ['Financial Core', 'Payments', 'Banking', 'Treasury', 'Risk & Compliance']
  },
  {
    id: 'JUMO-EDU-ALUMNI',
    name: 'JUMO UNIVERSAL SCHOOL ERP',
    subtitle: 'Universal education & school enterprise platform',
    desc: 'Unified education operating system spanning Pre-Primary to Higher Education, combined with graduates directory and alumni networking.',
    route: '/platform/edu-alumni',
    icon: GraduationCap,
    accentColor: 'border-blue-500 bg-blue-50/50 text-blue-900',
    badge: 'EDUCATION & ALUMNI',
    badgeStyle: 'bg-blue-100 text-blue-800 border-blue-300',
    buttonLabel: 'Open Universal School ERP',
    navItems: ['Student Information', 'Academics', 'Alumni', 'Finance', 'Administration']
  },
  {
    id: 'JUMO-CHURCH',
    name: 'JUMO CHURCH ERP',
    subtitle: 'Universal church & diocese enterprise platform',
    desc: 'Complete Diocesan and Parish architecture supporting Episcopal Bishop portal, Sacramental Registers, Tithes, and Clergy deployment.',
    route: '/platform/church',
    icon: Church,
    accentColor: 'border-amber-500 bg-amber-50/50 text-amber-900',
    badge: 'DIOCESE & PARISH',
    badgeStyle: 'bg-amber-100 text-amber-800 border-amber-300',
    buttonLabel: 'Open Church ERP',
    navItems: ['Bishop Portal', 'Synod', 'Registers', 'Tithes', 'Clergy Deployment']
  }
];

export const OwnerProductLaunchpad: React.FC<OwnerProductLaunchpadProps> = ({
  onNavigate,
  currentUser
}) => {
  const handleOpenProduct = (prod: typeof SOVEREIGN_PRODUCTS[0]) => {
    ownerVerificationService.setActiveProductContext(prod.id);
    onNavigate(prod.route);
  };

  return (
    <div className="space-y-8 font-sans">
      {/* Top Welcome Header */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 bg-amber-100 text-amber-900 font-mono font-bold text-xs rounded border border-amber-300 uppercase tracking-wider">
                Platform Owner Verification Mode Active
              </span>
              <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                UNRESTRICTED INSPECTION
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
              JUMO DIGITAL HYBRID PLATFORM
            </h1>
            <p className="text-xs md:text-sm text-slate-600 max-w-3xl leading-relaxed">
              Welcome, <strong className="text-slate-900">{currentUser?.name || 'Platform Owner'}</strong>. 
              Select any of the 3 approved sovereign products below to launch and inspect its complete independent workspace, portals, and domain navigation.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-slate-700 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200">
              3 APPROVED PLATFORMS
            </span>
          </div>
        </div>
      </div>

      {/* Product Selection Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SOVEREIGN_PRODUCTS.map((prod) => {
          const Icon = prod.icon;
          return (
            <div
              key={prod.id}
              className={`bg-white border-2 rounded-2xl p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group ${prod.accentColor}`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="p-3 bg-white rounded-xl shadow-xs border border-slate-200 text-slate-900 group-hover:scale-105 transition-transform">
                    <Icon className="w-6 h-6 text-slate-900" />
                  </div>
                  <span className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded border uppercase ${prod.badgeStyle}`}>
                    {prod.badge}
                  </span>
                </div>
                
                <div>
                  <h3 className="text-lg font-bold text-slate-900 tracking-tight group-hover:text-blue-700 transition-colors">
                    {prod.name}
                  </h3>
                  <div className="text-[11px] font-mono text-slate-500 mt-0.5 mb-2">
                    {prod.subtitle}
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {prod.desc}
                  </p>
                </div>

                {/* Domain Specific Navigation Tags */}
                <div className="pt-2">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                    Dynamic Registry Capabilities:
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {prod.navItems.map((nav, idx) => (
                      <span key={idx} className="text-[10px] bg-white border border-slate-200 text-slate-700 px-2 py-0.5 rounded font-mono">
                        {nav}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-200 flex items-center justify-between">
                <button
                  onClick={() => handleOpenProduct(prod)}
                  className="w-full py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  <span>{prod.buttonLabel}</span>
                  <ArrowRight className="w-4 h-4 text-amber-400" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
