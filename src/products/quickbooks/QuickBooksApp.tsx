import React, { useState } from 'react';
import { 
  BarChart3, Globe, Key, Settings, LayoutDashboard, FileText, BookOpen, 
  Landmark, Receipt, CreditCard, Package, Briefcase, Users, Building, 
  PieChart, Zap, ShieldCheck, ChevronLeft, ChevronRight, Search, ArrowLeft,
  CheckCircle, Play, FileSpreadsheet, ShieldAlert
} from 'lucide-react';
import { QuickBooksViews } from './QuickBooksViews';
import { QBDatabase } from './QuickBooksStore';

export function QuickBooksApp({ onBackToHub }: { onBackToHub?: () => void }) {
  const [activeView, setActiveView] = useState('DASHBOARD');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [sidebarSearchTerm, setSidebarSearchTerm] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // 17 benchmark + 12 expanded capabilities, total 29, using JUMO-owned capability codes
  const rawCategories = [
    {
      groupLabel: "Corporate & Identity",
      items: [
        { id: 'PUBLIC_LANDING', code: 'JUMO-FAAP-PUB-001', label: 'Product Showcase', icon: Globe },
        { id: 'AUTH_SSO', code: 'JUMO-FAAP-AUTH-001', label: 'Intuit SSO Gateway', icon: Key },
        { id: 'SETUP_WIZARD', code: 'JUMO-FAAP-SETUP-001', label: 'Company Setup Wizard', icon: Settings },
      ]
    },
    {
      groupLabel: "General Ledger & Core",
      items: [
        { id: 'DASHBOARD', code: 'JUMO-FAAP-DASH-001', label: 'Executive Financial Center', icon: LayoutDashboard },
        { id: 'COA', code: 'JUMO-FAAP-COA-001', label: 'Chart of Accounts Register', icon: FileText },
        { id: 'JOURNAL', code: 'JUMO-FAAP-GL-001', label: 'Double-Entry General Ledger', icon: BookOpen },
        { id: 'BANK_FEEDS', code: 'JUMO-FAAP-BANK-001', label: 'Bank Feeds & Matcher', icon: Landmark },
      ]
    },
    {
      groupLabel: "Sub-Ledgers & Payroll",
      items: [
        { id: 'INVOICES', code: 'JUMO-FAAP-AR-001', label: 'Accounts Receivable (Invoices)', icon: Receipt },
        { id: 'BILLS', code: 'JUMO-FAAP-AP-001', label: 'Accounts Payable (Bills)', icon: CreditCard },
        { id: 'INVENTORY', code: 'JUMO-FAAP-INV-001', label: 'Inventory Control & Catalog', icon: Package },
        { id: 'PROJECTS', code: 'JUMO-FAAP-PRJ-001', label: 'Project Job Costing', icon: Briefcase },
        { id: 'PAYROLL', code: 'JUMO-FAAP-PAY-001', label: 'Faculty Payroll & Taxes', icon: Users },
      ]
    },
    {
      groupLabel: "Tax, Reporting & Admin",
      items: [
        { id: 'TAXES', code: 'JUMO-FAAP-TAX-001', label: 'Sales Tax & VAT Center', icon: Building },
        { id: 'BUDGETING', code: 'JUMO-FAAP-BDG-001', label: 'Budget Variance Analysis', icon: PieChart },
        { id: 'STATEMENTS', code: 'JUMO-FAAP-REP-001', label: 'Financial Statements Hub', icon: BarChart3 },
        { id: 'AUTOMATION', code: 'JUMO-FAAP-AUTO-001', label: 'Workflow Automation Rules', icon: Zap },
        { id: 'ADMIN_SECURITY', code: 'JUMO-FAAP-ADMIN-001', label: 'Audit Trail & Security', icon: ShieldCheck },
      ]
    },
    {
      groupLabel: "Sovereign Statutories",
      items: [
        { id: 'BUDGET_BOOK', code: 'JUMO-FAAP-BDG-002', label: 'Master Budget Book', icon: FileSpreadsheet },
        { id: 'VOTE_BOOK', code: 'JUMO-FAAP-VOTE-001', label: 'Commitment Vote Book', icon: ShieldCheck },
        { id: 'CASH_BOOKS', code: 'JUMO-FAAP-CASH-001', label: 'Statutory Cash Books', icon: BookOpen },
        { id: 'AUDITOR_BOOKS', code: 'JUMO-FAAP-AUDIT-001', label: 'Internal Auditor Books', icon: ShieldAlert },
        { id: 'FINANCIAL_ANALYSIS', code: 'JUMO-FAAP-ANALYSIS-001', label: 'Financial Analysis Digest', icon: BarChart3 }
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
      {/* NATIVE QUICKBOOKS ENTERPRISE TOP NAV BAR */}
      <header className="bg-slate-900 text-white border-b border-slate-800 h-14 px-4 flex items-center justify-between sticky top-0 z-40 select-none shadow-md">
        
        {/* Left Side: QuickBooks Brand Identity */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-emerald-600 text-white rounded-xl flex items-center justify-center font-black text-sm shadow-md shadow-emerald-500/20 shrink-0">
            📊
          </div>
          <div className="min-w-0">
            <span className="font-extrabold tracking-tight text-white text-xs block truncate">JUMO FAAP</span>
            <span className="text-[9px] font-bold text-emerald-400 uppercase tracking-wider block leading-none">Financial Accounting & Admin Platform • {QBDatabase.activeCompany}</span>
          </div>
        </div>

        {/* Middle: Integrated Accounting Search */}
        <div className="hidden md:flex items-center gap-4 flex-1 max-w-md mx-6">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search account code, voucher, invoice number..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full h-8 bg-slate-800 border border-slate-700 rounded-xl pl-8 pr-3 text-slate-100 placeholder-slate-400 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-all"
            />
            <Search className="w-3.5 h-3.5 text-emerald-400 absolute left-2.5 top-2.2" />
          </div>
        </div>

        {/* Right Side: Ledger Engine Badge & Return to Launcher */}
        <div className="flex items-center gap-3">
          <span className="px-2.5 py-1 bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 rounded-lg text-[10px] font-extrabold uppercase tracking-wider">
            Double-Entry Engine: Balanced
          </span>
          {onBackToHub && (
            <button
              onClick={onBackToHub}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white rounded-xl text-xs font-bold shadow-xs flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Launcher Hub</span>
            </button>
          )}
        </div>
      </header>

      {/* MAIN LAYOUT CONTAINER */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* LEFT FINANCIAL SIDEBAR */}
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
                    className="w-full h-8 bg-slate-50 border border-slate-200 rounded-lg pl-8 pr-2 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-all text-slate-700"
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
                        key={item.id}
                        onClick={() => setActiveView(item.id)}
                        title={`${item.label} (${item.code})`}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          isActive 
                            ? "bg-emerald-50 text-emerald-950 font-black border border-emerald-100 shadow-2xs" 
                            : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <Icon className={`w-4 h-4 shrink-0 ${isActive ? "text-emerald-600" : "text-slate-400"}`} />
                          {!sidebarCollapsed && (
                            <div className="text-left min-w-0">
                              <span className="block truncate text-slate-800 font-extrabold">{item.label}</span>
                              <span className="block text-[8px] font-mono text-slate-400 truncate uppercase">{item.code}</span>
                            </div>
                          )}
                        </div>
                        {!sidebarCollapsed && (
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0 ml-1 opacity-80" />
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
              <div className="flex items-center gap-2 font-bold text-emerald-700 uppercase">
                <CheckCircle className="w-3.5 h-3.5" /> Checked & Certified
              </div>
              <span>FAAP Engine • v2026.2</span>
            </div>
          )}
        </aside>

        {/* WORKSPACE VIEW AREA */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-slate-100/60">
          <QuickBooksViews
            activeView={activeView}
            onNavigate={setActiveView}
          />
        </main>
      </div>
    </div>
  );
}
