import React, { useState } from 'react';
import { 
  CreditCard, Search, Key, ShieldCheck, RefreshCw, Smartphone, Receipt, 
  Landmark, AlertTriangle, Building, Wallet, ChevronLeft, ChevronRight, ArrowLeft, CheckCircle
} from 'lucide-react';
import { SchoolPayViews } from './SchoolPayViews';
import { SPDatabase } from './SchoolPayStore';

export function SchoolPayApp({ onBackToHub, prefilledCode }: { onBackToHub?: () => void; prefilledCode?: string }) {
  const [activeView, setActiveView] = useState('PUBLIC_GATEWAY');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [sidebarSearchTerm, setSidebarSearchTerm] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // 14 verified capabilities with proper JUMO-owned codes
  const rawCategories = [
    {
      groupLabel: "Consumer Rail",
      items: [
        { id: 'PUBLIC_GATEWAY', code: 'JUMO-DPAY-PUB-001', label: 'Payment Gateway', icon: CreditCard },
        { id: 'PUBLIC_GATEWAY', code: 'JUMO-DPAY-PUB-002', label: 'USSD & Channel Directory', icon: Smartphone },
        { id: 'CODE_RESOLVER', code: 'JUMO-DPAY-ID-001', label: 'Payment Code Resolver', icon: Search },
        { id: 'CODE_RESOLVER', code: 'JUMO-DPAY-RAIL-001', label: 'Multi-Rail Switcher', icon: Landmark },
        { id: 'GUARDIAN_MOBILE', code: 'JUMO-DPAY-MOB-001', label: 'Guardian Mobile App', icon: Smartphone },
        { id: 'SWALLET', code: 'JUMO-DPAY-WLT-001', label: 'S-Wallet Digital Pocket', icon: Wallet },
      ]
    },
    {
      groupLabel: "Settlement & Merchants",
      items: [
        { id: 'MERCHANT_LOGIN', code: 'JUMO-DPAY-AUTH-001', label: 'Merchant SSO Gateway', icon: Key },
        { id: 'STATE_MACHINE', code: 'JUMO-DPAY-LFC-001', label: 'Transaction State Machine', icon: RefreshCw },
        { id: 'RECEIPTS', code: 'JUMO-DPAY-RCP-001', label: 'Receipt Verification Center', icon: Receipt },
        { id: 'ESCROW', code: 'JUMO-DPAY-STL-001', label: 'Escrow Settlement Engine', icon: Landmark },
        { id: 'DISPUTES', code: 'JUMO-DPAY-DJDP-001', label: 'Dispute Exception Console', icon: AlertTriangle },
      ]
    },
    {
      groupLabel: "Integrations & Developer BI",
      items: [
        { id: 'ERP_BINDING', code: 'JUMO-DPAY-ERP-001', label: 'ERP Identity Binding', icon: Building },
        { id: 'RECON_BI', code: 'JUMO-DPAY-ERP-002', label: 'Reconciliation BI Analytics', icon: RefreshCw },
        { id: 'ADMIN_WEBHOOKS', code: 'JUMO-DPAY-ADMIN-001', label: 'Developer Webhooks & API', icon: ShieldCheck },
      ]
    }
  ];

  // Filter categories by sidebar search term
  const navCategories = rawCategories.map(group => {
    const items = group.items.filter(item => 
      item.label.toLowerCase().includes(sidebarSearchTerm.toLowerCase()) ||
      item.code.toLowerCase().includes(sidebarSearchTerm.toLowerCase())
    );
    return { ...group, items };
  }).filter(group => group.items.length > 0);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* NATIVE SCHOOLPAY FINTECH TOP NAV BAR */}
      <header className="bg-stone-900 text-white border-b border-stone-800 h-14 px-4 flex items-center justify-between sticky top-0 z-40 select-none shadow-md">
        
        {/* Left Side: SchoolPay Fintech Brand Identity */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-amber-500 text-stone-950 rounded-xl flex items-center justify-center font-black text-sm shadow-md shadow-amber-500/20 shrink-0">
            💳
          </div>
          <div className="min-w-0">
            <span className="font-extrabold tracking-tight text-white text-xs block truncate">JUMO DIGITAL PAY</span>
            <span className="text-[9px] font-bold text-amber-400 uppercase tracking-wider block leading-none">Universal Fee Payment & Settlement Gateway</span>
          </div>
        </div>

        {/* Middle: Integrated Search */}
        <div className="hidden md:flex items-center gap-4 flex-1 max-w-md mx-6">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search payment shortcode, TX ID, student name..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full h-8 bg-stone-800 border border-stone-700 rounded-xl pl-8 pr-3 text-stone-100 placeholder-stone-400 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-amber-500 transition-all"
            />
            <Search className="w-3.5 h-3.5 text-amber-400 absolute left-2.5 top-2.2" />
          </div>
        </div>

        {/* Right Side: Settlement Rail Badge & Return to Launcher */}
        <div className="flex items-center gap-3">
          <span className="px-2.5 py-1 bg-amber-500/20 border border-amber-400/30 text-amber-300 rounded-lg text-[10px] font-extrabold uppercase tracking-wider">
            Switch Rail: Active (UGX)
          </span>
          {onBackToHub && (
            <button
              onClick={onBackToHub}
              className="px-3 py-1.5 bg-stone-800 hover:bg-stone-700 border border-stone-700 text-white rounded-xl text-xs font-bold shadow-xs flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Launcher Hub</span>
            </button>
          )}
        </div>
      </header>

      {/* MAIN LAYOUT CONTAINER */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* LEFT FINTECH SIDEBAR */}
        <aside 
          className={`bg-white border-r border-slate-200 flex flex-col justify-between transition-all duration-200 shrink-0 hidden md:flex ${
            sidebarCollapsed ? "w-16" : "w-64"
          }`}
        >
          <div className="flex-1 overflow-y-auto py-4 px-2 space-y-4">
            {/* Sidebar toggle and search */}
            <div className="space-y-3">
              <div className={`flex items-center justify-between px-2 ${sidebarCollapsed ? "justify-center" : ""}`}>
                {!sidebarCollapsed && (
                  <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">
                    Capabilities
                  </span>
                )}
                <button
                  onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                  className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 cursor-pointer transition-all"
                  title={sidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
                >
                  {sidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
                </button>
              </div>

              {!sidebarCollapsed && (
                <div className="px-2 relative">
                  <input
                    type="text"
                    placeholder="Search capabilities..."
                    value={sidebarSearchTerm}
                    onChange={e => setSidebarSearchTerm(e.target.value)}
                    className="w-full h-8 bg-slate-50 border border-slate-200 rounded-lg pl-8 pr-2 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-amber-500 transition-all text-slate-700"
                  />
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-4 top-2.5" />
                </div>
              )}
            </div>

            {/* Navigation Groups */}
            <div className="space-y-4 pt-2">
              {navCategories.map((group, idx) => (
                <div key={idx} className="space-y-1">
                  {!sidebarCollapsed && (
                    <span className="text-[9px] font-black uppercase text-slate-400 tracking-wider px-3 py-1 block border-b border-slate-50">
                      {group.groupLabel}
                    </span>
                  )}
                  {group.items.map(item => {
                    const Icon = item.icon;
                    const isActive = activeView === item.id;
                    return (
                      <button
                        key={item.code}
                        onClick={() => setActiveView(item.id)}
                        title={`${item.label} (${item.code})`}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          isActive 
                            ? "bg-amber-50 text-amber-950 font-black border border-amber-100 shadow-2xs" 
                            : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <Icon className={`w-4 h-4 shrink-0 ${isActive ? "text-amber-600" : "text-slate-400"}`} />
                          {!sidebarCollapsed && (
                            <div className="text-left min-w-0">
                              <span className="block truncate text-slate-800 font-extrabold">{item.label}</span>
                              <span className="block text-[8px] font-mono text-slate-400 truncate uppercase">{item.code}</span>
                            </div>
                          )}
                        </div>
                        {!sidebarCollapsed && (
                          <CheckCircle className="w-3.5 h-3.5 text-amber-500 shrink-0 ml-1 opacity-80" />
                        )}
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar Footer */}
          {!sidebarCollapsed && (
            <div className="p-4 border-t border-slate-100 bg-slate-50 text-[10px] text-slate-500 font-mono flex flex-col gap-1">
              <div className="flex items-center gap-2 font-bold text-amber-600 uppercase">
                <CheckCircle className="w-3.5 h-3.5" /> Checked & Certified
              </div>
              <span>Digital Pay • v2026.4</span>
            </div>
          )}
        </aside>

        {/* WORKSPACE VIEW AREA */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-slate-100/60">
          <SchoolPayViews
            activeView={activeView}
            onNavigate={setActiveView}
            prefilledCode={prefilledCode}
          />
        </main>
      </div>
    </div>
  );
}
