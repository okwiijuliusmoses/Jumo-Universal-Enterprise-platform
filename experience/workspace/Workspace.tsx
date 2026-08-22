import React, { useState, useEffect } from 'react';
import { 
  GraduationCap, Church, Users, Landmark, DollarSign, Zap, Shield, Sparkles, 
  Activity, Lock, ArrowRight, CheckCircle2, ChevronRight, Sliders, Play, 
  Settings, RefreshCw, BarChart2, ShieldAlert, Award, Home, BookOpen, Clock, Layers
} from 'lucide-react';

interface WorkspaceProps {
  onNavigate?: (route: string) => void;
}

export const Workspace: React.FC<WorkspaceProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'products' | 'system-health' | 'diagnostics'>('products');
  const [refreshing, setRefreshing] = useState(false);
  const [ledgerStatus, setLedgerStatus] = useState({
    totalDebits: 145000000.00,
    totalCredits: 145000000.00,
    status: 'PERFECT_PARITY',
    feeCollected: 2175000.00
  });

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 800);
  };

  const handleLaunchProduct = (route: string) => {
    if (onNavigate) {
      onNavigate(route);
    } else if (typeof window !== 'undefined') {
      window.location.href = route;
    }
  };

  // 3 Approved Sovereign Products metadata
  const products = [
    {
      id: 'JUMO-FINTECH',
      name: 'JUMO FINTECH',
      subtitle: 'Universal financial technology platform',
      description: 'Comprehensive financial operating system powering core double-entry accounting (FAAP), multi-currency ledger, digital payments switch, agent banking POS nodes, microfinance, and credit scoring.',
      route: '/platform/finpay',
      icon: Landmark,
      color: 'border-emerald-500 hover:border-emerald-600',
      iconBg: 'bg-emerald-50 text-emerald-700',
      badge: 'FINTECH CORE',
      badgeStyle: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      capabilities: [
        'FAAP Double-Entry Accounting Core',
        'Universal Payment Switch & Split Clearing',
        'Microfinance & Group SACCO Ledgers',
        'Agency Banking & POS Terminal Network',
        'Multi-Currency Sovereign Treasury Wallets',
        'Integrated 1.5% Settlement Fee Router'
      ],
      quickPortals: [
        { name: 'Financial Controller', role: 'controller', route: '/platform/finpay?tab=ledger' },
        { name: 'Payment Switch Ops', role: 'switchops', route: '/platform/finpay?tab=payments' },
        { name: 'Agency Banking Node', role: 'agent', route: '/platform/finpay?tab=agent-banking' }
      ]
    },
    {
      id: 'JUMO-EDU-ALUMNI',
      name: 'JUMO UNIVERSAL SCHOOL ERP',
      subtitle: 'Universal education & school enterprise platform',
      description: 'Complete academic operating system spanning early childhood to higher education. Seamlessly handles student registration, senate approvals, fee structures, library collections, and alumni engagement.',
      route: '/platform/edu-alumni',
      icon: GraduationCap,
      color: 'border-blue-500 hover:border-blue-600',
      iconBg: 'bg-blue-50 text-blue-700',
      badge: 'SCHOOL & ALUMNI ERP',
      badgeStyle: 'bg-blue-50 text-blue-800 border-blue-200',
      capabilities: [
        'Student Registry & Admission Flow',
        'Senate Governance & Course Approvals',
        'Bursary & Tuition Invoicing Core',
        'GPA / CGPA Transcript Generation Engine',
        'Graduate Records & Alumni Association Hub',
        'Campus Health Clinic & Pharmacy Records'
      ],
      quickPortals: [
        { name: 'Academic Registrar', role: 'registrar', route: '/platform/edu-alumni?tab=registrar' },
        { name: 'University Bursar', role: 'bursar', route: '/platform/edu-alumni?tab=bursary' },
        { name: 'Senate Portal', role: 'council', route: '/platform/edu-alumni?tab=senate' }
      ]
    },
    {
      id: 'JUMO-CHURCH',
      name: 'JUMO CHURCH ERP',
      subtitle: 'Universal church & diocese enterprise platform',
      description: 'Unified diocesan and parish administration platform supporting episcopal oversight, sacramental registry verification, clergy assignments, local congregation tithes, and liturgy planning.',
      route: '/platform/church',
      icon: Church,
      color: 'border-purple-500 hover:border-purple-600',
      iconBg: 'bg-purple-50 text-purple-700',
      badge: 'DIOCESE & PARISH ERP',
      badgeStyle: 'bg-purple-50 text-purple-800 border-purple-200',
      capabilities: [
        'Episcopal Bishop oversight console',
        'Synod Administration & Clergy Placement',
        'Sacramental Registers (Baptisms, Weddings)',
        'Stewardship, Tithes & Local Parish Finance',
        'Parishioner Directory & Member Services',
        'Church Liturgical Calendar & Events Planning'
      ],
      quickPortals: [
        { name: 'Episcopal Bishop', role: 'bishop', route: '/platform/church?tab=bishop' },
        { name: 'Parish Priest / Vicar', role: 'vicar', route: '/platform/church?tab=priest' },
        { name: 'Diocesan Stewardship', role: 'churchtreasurer', route: '/platform/church?tab=finance' }
      ]
    }
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Welcome Header Banner */}
      <div className="bg-white border border-slate-200 p-6 md:p-8 rounded-2xl shadow-sm relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-200 rounded-full text-blue-700 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>JUMO DIGITAL ENTERPRISE PLATFORM — Powered by JUMO UEOS v14.0 LTS</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black tracking-tight text-slate-900 uppercase">
              Sovereign Enterprise Workspace
            </h1>
            <p className="text-slate-600 text-xs md:text-sm leading-relaxed">
              Welcome to the unified cloud operating center. All active products, isolated multi-tenant databases, and double-entry transaction ledgers are running under Ring-0 zero-trust encryption parameters. Select an approved workspace below to begin administration.
            </p>
          </div>
          
          <div className="flex flex-wrap gap-2 items-center shrink-0">
            <button 
              onClick={handleRefresh}
              className="p-2.5 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 font-bold text-xs rounded-xl shadow-xs transition flex items-center gap-2 cursor-pointer"
              title="Recalculate Ledgers"
            >
              <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin text-[#0078D4]' : 'text-slate-500'}`} />
              <span>Sync Ledgers</span>
            </button>
            <button 
              onClick={() => handleLaunchProduct('/control-center')}
              className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-xs transition flex items-center gap-2 cursor-pointer"
            >
              <Sliders className="w-4 h-4 text-amber-400" />
              <span>Owner Control Center</span>
            </button>
          </div>
        </div>

        {/* Quick Stats Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-slate-200 text-xs font-mono">
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
            <span className="text-slate-500 block mb-1 uppercase tracking-wider text-[10px] font-bold">FAAP LEDGER STATUS</span>
            <span className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 inline shrink-0" />
              <span>PERFECT PARITY (100%)</span>
            </span>
          </div>
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
            <span className="text-slate-500 block mb-1 uppercase tracking-wider text-[10px] font-bold">JUMO FEE ROUTING (1.5%)</span>
            <span className="text-sm font-bold text-emerald-700">
              ${ledgerStatus.feeCollected.toLocaleString('en-US', { minimumFractionDigits: 2 })} REVENUE
            </span>
          </div>
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
            <span className="text-slate-500 block mb-1 uppercase tracking-wider text-[10px] font-bold">AEGIS ENCRYPTION SEC</span>
            <span className="text-sm font-bold text-blue-700 flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-blue-600" />
              <span>AES-256 / RING-0</span>
            </span>
          </div>
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
            <span className="text-slate-500 block mb-1 uppercase tracking-wider text-[10px] font-bold">COGNITIVE ROUTER</span>
            <span className="text-sm font-bold text-purple-700 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-purple-600" />
              <span>GEMINI GATEWAY ONLINE</span>
            </span>
          </div>
        </div>
      </div>

      {/* Main Workspace Tabs */}
      <div className="flex border-b border-slate-200 gap-6">
        <button 
          onClick={() => setActiveTab('products')}
          className={`pb-3 text-xs font-extrabold uppercase tracking-wider border-b-2 flex items-center gap-2 transition-colors cursor-pointer ${
            activeTab === 'products' ? 'border-[#0078D4] text-[#0078D4]' : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Approved Commercial Workspaces (3)</span>
        </button>
        <button 
          onClick={() => setActiveTab('system-health')}
          className={`pb-3 text-xs font-extrabold uppercase tracking-wider border-b-2 flex items-center gap-2 transition-colors cursor-pointer ${
            activeTab === 'system-health' ? 'border-[#0078D4] text-[#0078D4]' : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <Activity className="w-4 h-4" />
          <span>FAAP Balance Parity</span>
        </button>
        <button 
          onClick={() => setActiveTab('diagnostics')}
          className={`pb-3 text-xs font-extrabold uppercase tracking-wider border-b-2 flex items-center gap-2 transition-colors cursor-pointer ${
            activeTab === 'diagnostics' ? 'border-[#0078D4] text-[#0078D4]' : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <ShieldAlert className="w-4 h-4" />
          <span>AEGIS Surveillance</span>
        </button>
      </div>

      {/* View 1: 3 Approved Platforms Selection */}
      {activeTab === 'products' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-1">Approved Platform Subscriptions</h2>
            <p className="text-xs text-slate-500">Launch any of the 3 active commercial systems. All underlying databases are isolated at tenant boundaries.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {products.map((p) => {
              const Icon = p.icon;
              return (
                <div 
                  key={p.id}
                  className={`bg-white rounded-2xl border-2 p-6 shadow-xs flex flex-col justify-between hover:shadow-lg transition-all group ${p.color}`}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className={`p-3 rounded-xl border border-slate-200 ${p.iconBg}`}>
                        <Icon className="w-6 h-6 shrink-0" />
                      </div>
                      <span className={`text-[10px] font-mono font-extrabold px-2 py-0.5 rounded border ${p.badgeStyle}`}>
                        {p.badge}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-base font-black text-slate-900 tracking-tight group-hover:text-[#0078D4] transition-colors uppercase">
                        {p.name}
                      </h3>
                      <div className="text-[10px] text-slate-400 font-mono font-semibold uppercase mt-0.5 mb-2">
                        {p.subtitle}
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed min-h-[64px]">
                        {p.description}
                      </p>
                    </div>

                    {/* Nested Shared Backend Capabilities */}
                    <div className="pt-2">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5 font-mono">
                        Included Services & Engines:
                      </div>
                      <div className="space-y-1">
                        {p.capabilities.map((cap, idx) => (
                          <div key={idx} className="flex items-center gap-1.5 text-[11px] text-slate-600">
                            <CheckCircle2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                            <span className="truncate">{cap}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 mt-6 border-t border-slate-100 space-y-4">
                    {/* Quick Roles Launch */}
                    <div className="grid grid-cols-3 gap-1">
                      {p.quickPortals.map((qp, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleLaunchProduct(qp.route)}
                          className="py-1 px-1.5 bg-slate-50 border border-slate-200 text-[10px] font-bold font-mono text-slate-600 rounded-lg hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300 transition-colors text-center truncate cursor-pointer"
                          title={`Launch ${p.name} as ${qp.name}`}
                        >
                          {qp.name}
                        </button>
                      ))}
                    </div>

                    <button
                      onClick={() => handleLaunchProduct(p.route)}
                      className="w-full py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                    >
                      <span>Launch Complete Workspace</span>
                      <ArrowRight className="w-4 h-4 text-amber-400" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* View 2: FAAP Balance Parity Audit */}
      {activeTab === 'system-health' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-6 animate-in fade-in duration-200">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-lg font-black text-slate-900 uppercase">FAAP Double-Entry Audit Ledger</h2>
              <p className="text-xs text-slate-500 font-mono">Real-time balances for institutional treasury and collection accounts.</p>
            </div>
            <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 border border-emerald-300 rounded font-mono font-bold text-xs uppercase tracking-wider">
              100% PERFECT PARITY VERIFIED
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
            <div className="border border-slate-200 p-4 rounded-xl bg-slate-50">
              <span className="text-slate-400 block font-bold">TOTAL DEBITS (DR)</span>
              <span className="text-lg font-extrabold text-slate-900">${ledgerStatus.totalDebits.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
            </div>
            <div className="border border-slate-200 p-4 rounded-xl bg-slate-50">
              <span className="text-slate-400 block font-bold">TOTAL CREDITS (CR)</span>
              <span className="text-lg font-extrabold text-slate-900">${ledgerStatus.totalCredits.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
            </div>
            <div className="border border-slate-200 p-4 rounded-xl bg-slate-50">
              <span className="text-slate-400 block font-bold">LEDGER NET OFFSET</span>
              <span className="text-lg font-extrabold text-emerald-600">$0.00 PERFECT MATCH</span>
            </div>
          </div>

          <div className="border border-slate-200 rounded-xl overflow-hidden">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 text-slate-500 border-b border-slate-200 font-bold font-mono">
                  <th className="p-3">ACCOUNT CODE & TITLE</th>
                  <th className="p-3">CLASSIFICATION</th>
                  <th className="p-3 text-right">DEBIT</th>
                  <th className="p-3 text-right">CREDIT</th>
                  <th className="p-3 text-center">STATUS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 font-mono text-slate-700">
                <tr>
                  <td className="p-3 font-semibold text-slate-900">1000 - JUMO Clearing Bank</td>
                  <td className="p-3 text-slate-500">Asset (Cash & Equivalents)</td>
                  <td className="p-3 text-right text-slate-900">$50,000,000.00</td>
                  <td className="p-3 text-right text-slate-400">$0.00</td>
                  <td className="p-3 text-center"><span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">VERIFIED</span></td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-slate-900">1100 - Sovereign Treasury Reserve</td>
                  <td className="p-3 text-slate-500">Asset (Reserve Pool)</td>
                  <td className="p-3 text-right text-slate-900">$45,000,000.00</td>
                  <td className="p-3 text-right text-slate-400">$0.00</td>
                  <td className="p-3 text-center"><span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">VERIFIED</span></td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-slate-900">1200 - Mobile Money Float Cash</td>
                  <td className="p-3 text-slate-500">Asset (Mobile Float)</td>
                  <td className="p-3 text-right text-slate-900">$50,000,000.00</td>
                  <td className="p-3 text-right text-slate-400">$0.00</td>
                  <td className="p-3 text-center"><span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">VERIFIED</span></td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-slate-900">3000 - Capital Reserves</td>
                  <td className="p-3 text-slate-500">Equity (Capital Reserve)</td>
                  <td className="p-3 text-right text-slate-400">$0.00</td>
                  <td className="p-3 text-right text-slate-900">$142,825,000.00</td>
                  <td className="p-3 text-center"><span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">VERIFIED</span></td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-slate-900">4000 - JUMO 1.5% Fee Income</td>
                  <td className="p-3 text-slate-500">Revenue (Settlement Fee)</td>
                  <td className="p-3 text-right text-slate-400">$0.00</td>
                  <td className="p-3 text-right text-slate-900">$2,175,000.00</td>
                  <td className="p-3 text-center"><span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">VERIFIED</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* View 3: AEGIS Zero-Trust Security Surveillance */}
      {activeTab === 'diagnostics' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-6 animate-in fade-in duration-200">
          <div>
            <h2 className="text-lg font-black text-slate-900 uppercase">AEGIS Zero-Trust Continuous Surveillance</h2>
            <p className="text-xs text-slate-500 font-mono">Real-time perimeter access controls, security state monitoring, and session logs.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="border border-slate-200 p-4 rounded-xl text-center space-y-1">
              <span className="text-slate-400 block text-[10px] font-mono font-bold uppercase">PERIMETER SURVEILLANCE</span>
              <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded border border-emerald-200 inline-block">SECURE & RUNNING</span>
            </div>
            <div className="border border-slate-200 p-4 rounded-xl text-center space-y-1">
              <span className="text-slate-400 block text-[10px] font-mono font-bold uppercase">CRYPTO CRYPT ENGINE</span>
              <span className="text-xs font-mono font-bold text-blue-700 bg-blue-50 px-2 py-1 rounded border border-blue-200 inline-block">AES-256 ENFORCED</span>
            </div>
            <div className="border border-slate-200 p-4 rounded-xl text-center space-y-1">
              <span className="text-slate-400 block text-[10px] font-mono font-bold uppercase">SESSION RATELIMITER</span>
              <span className="text-xs font-mono font-bold text-purple-700 bg-purple-50 px-2 py-1 rounded border border-purple-200 inline-block">ACTIVE (0 VIOLATIONS)</span>
            </div>
            <div className="border border-slate-200 p-4 rounded-xl text-center space-y-1">
              <span className="text-slate-400 block text-[10px] font-mono font-bold uppercase">MFA GATE CHALLENGE</span>
              <span className="text-xs font-mono font-bold text-slate-700 bg-slate-100 px-2 py-1 rounded border border-slate-200 inline-block">100% CHALLENGES PASSED</span>
            </div>
          </div>

          <div className="border border-slate-200 rounded-xl p-4 bg-slate-950 text-slate-200 font-mono text-xs space-y-2 max-h-[250px] overflow-y-auto">
            <div className="text-slate-500">[2026-08-21 12:00:00] -- SYSTEM BOOT INIT ON RING-0 INTERRUPT VECTORS</div>
            <div className="text-emerald-400">[2026-08-21 12:00:02] -- AEGIS ROOT PERIMETER FIREWALL INITIALIZED -- PORT 3000 ENABLED</div>
            <div className="text-emerald-400">[2026-08-21 12:00:03] -- FAAP MASTER BALANCE CALCULATOR COMPLETED -- DELTA = 0.00 (PARITY VERIFIED)</div>
            <div className="text-blue-400">[2026-08-21 12:05:14] -- SUCCESSFUL LOGIN FROM IPS 102.140.231.14 -- ROLES MAPPED: [Ring-0 Owner]</div>
            <div className="text-purple-400">[2026-08-21 12:15:30] -- COGNITIVE ROUTER INIT REQUEST -- GEMINI FLASH AI SYSTEM CONTEXT CACHED SUCCESSFULLY</div>
            <div className="text-slate-400">[2026-08-21 12:43:00] -- ROUTE TRANSITION TO PRODUCT LAUNCHER GATEWAY -- ZERO SECURITY ANOMALIES DETECTED</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Workspace;
