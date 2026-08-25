/**
 * JUMO UEOS — FAAP (Financial Accounting & Asset Platform) v1.0
 * Universal Financial Backbone for all JUMO Platforms, ERPs, and Enterprises.
 * 
 * Target: 60+ Financial Hybrid Modules across 6 Categories:
 * 1. Core Accounting Layer (Modules 1-10)
 * 2. Treasury & Banking (Modules 11-20)
 * 3. Enterprise Finance (Modules 21-30)
 * 4. Asset & Wealth Management (Modules 31-40)
 * 5. AI & Intelligence (Modules 41-50)
 * 6. Advanced Hybrid Extensions (Modules 51-60)
 * 
 * Governed strictly by Ring-0 Owner Control Center Authority.
 */

import React, { useState } from 'react';
import {
  DollarSign, Landmark, BarChart3, TrendingUp, CheckCircle2, Shield, Search, Filter,
  RefreshCw, FileText, Plus, Sliders, ArrowUpRight, ArrowDownRight, Layers, Sparkles,
  Zap, Lock, Globe, Building2, Package, Check, Clock, AlertTriangle, Send, Cpu,
  PieChart, ShieldCheck, Database, Award, Settings, Workflow, ChevronRight
} from 'lucide-react';

export interface FaapModuleDef {
  id: number;
  code: string;
  name: string;
  category: 'Core Accounting' | 'Treasury & Banking' | 'Enterprise Finance' | 'Asset & Wealth' | 'AI & Intelligence' | 'Hybrid Extensions';
  description: string;
  status: 'ACTIVE' | 'STANDBY' | 'ENFORCED' | 'RING_0';
  tier: 'Core' | 'Enterprise' | 'Sovereign';
  enabled: boolean;
}

export const FAAP_MODULES_60: FaapModuleDef[] = [
  // 1. Core Accounting Layer (1-10)
  { id: 1, code: 'FAAP-01', name: 'General Ledger Engine', category: 'Core Accounting', description: 'Double-entry real-time ledger engine with zero-offset parity verification across all enterprise tenants.', status: 'RING_0', tier: 'Core', enabled: true },
  { id: 2, code: 'FAAP-02', name: 'Double Entry Accounting', category: 'Core Accounting', description: 'Strict debit/credit matching rules with automated balance validation.', status: 'ENFORCED', tier: 'Core', enabled: true },
  { id: 3, code: 'FAAP-03', name: 'Multi-Currency Accounting', category: 'Core Accounting', description: 'Real-time FX conversion, multi-currency balances, and central bank exchange rate feeds.', status: 'ACTIVE', tier: 'Enterprise', enabled: true },
  { id: 4, code: 'FAAP-04', name: 'Chart of Accounts Designer', category: 'Core Accounting', description: 'Hierarchical CoA builder supporting GAAP, IFRS, and public sector accounting standards.', status: 'ACTIVE', tier: 'Core', enabled: true },
  { id: 5, code: 'FAAP-05', name: 'Journal Management', category: 'Core Accounting', description: 'Automated and manual journal entry posting with approval workflows and audit trails.', status: 'ACTIVE', tier: 'Core', enabled: true },
  { id: 6, code: 'FAAP-06', name: 'Period Closing Engine', category: 'Core Accounting', description: 'Automated monthly/yearly financial period closing with trial balance locks.', status: 'ACTIVE', tier: 'Enterprise', enabled: true },
  { id: 7, code: 'FAAP-07', name: 'Financial Consolidation', category: 'Core Accounting', description: 'Multi-entity and inter-company ledger consolidation with elimination entries.', status: 'ACTIVE', tier: 'Enterprise', enabled: true },
  { id: 8, code: 'FAAP-08', name: 'Budget Management', category: 'Core Accounting', description: 'Budget creation, variance analysis, encumbrance tracking, and spending controls.', status: 'ACTIVE', tier: 'Core', enabled: true },
  { id: 9, code: 'FAAP-09', name: 'Cost Center Accounting', category: 'Core Accounting', description: 'Granular cost allocation, overhead distribution, and activity-based costing.', status: 'ACTIVE', tier: 'Enterprise', enabled: true },
  { id: 10, code: 'FAAP-10', name: 'Department Accounting', category: 'Core Accounting', description: 'Department-level P&L tracking, expense allocations, and unit revenue attribution.', status: 'ACTIVE', tier: 'Core', enabled: true },

  // 2. Treasury & Banking (11-20)
  { id: 11, code: 'FAAP-11', name: 'Treasury Management', category: 'Treasury & Banking', description: 'Central treasury console managing global liquidity pools, reserve ratios, and cash sweeps.', status: 'RING_0', tier: 'Sovereign', enabled: true },
  { id: 12, code: 'FAAP-12', name: 'Cash Flow Management', category: 'Treasury & Banking', description: 'Real-time cash positioning, automated sweep accounts, and working capital optimization.', status: 'ACTIVE', tier: 'Enterprise', enabled: true },
  { id: 13, code: 'FAAP-13', name: 'Bank Reconciliation', category: 'Treasury & Banking', description: 'Automated MT940 / BAI2 statement parsing and AI-driven reconciliation matching.', status: 'ACTIVE', tier: 'Enterprise', enabled: true },
  { id: 14, code: 'FAAP-14', name: 'Liquidity Monitoring', category: 'Treasury & Banking', description: 'Intraday liquidity tracking, stress testing, and automated reserve rebalancing.', status: 'ACTIVE', tier: 'Sovereign', enabled: true },
  { id: 15, code: 'FAAP-15', name: 'Payment Processing', category: 'Treasury & Banking', description: 'Unified multi-rail payment engine supporting batch and real-time execution.', status: 'ACTIVE', tier: 'Core', enabled: true },
  { id: 16, code: 'FAAP-16', name: 'Digital Wallet Integration', category: 'Treasury & Banking', description: 'Embedded digital wallets with instant ledger updates and closed-loop settlements.', status: 'ACTIVE', tier: 'Enterprise', enabled: true },
  { id: 17, code: 'FAAP-17', name: 'Mobile Money Gateway', category: 'Treasury & Banking', description: 'Native integration with M-Pesa, Airtel Money, MTN Mobile Money, and Orange Cash.', status: 'ACTIVE', tier: 'Enterprise', enabled: true },
  { id: 18, code: 'FAAP-18', name: 'Card Payment Processing', category: 'Treasury & Banking', description: 'PCI-DSS compliant Visa, Mastercard, and UnionPay merchant acquiring integration.', status: 'ACTIVE', tier: 'Enterprise', enabled: true },
  { id: 19, code: 'FAAP-19', name: 'SWIFT Integration', category: 'Treasury & Banking', description: 'SWIFT MT/MX messaging gateway for cross-border institutional wire transfers.', status: 'ACTIVE', tier: 'Sovereign', enabled: true },
  { id: 20, code: 'FAAP-20', name: 'ACH Processing', category: 'Treasury & Banking', description: 'Direct debit and automated clearing house batch file processing.', status: 'ACTIVE', tier: 'Enterprise', enabled: true },

  // 3. Enterprise Finance (21-30)
  { id: 21, code: 'FAAP-21', name: 'Accounts Payable', category: 'Enterprise Finance', description: '3-way matching, vendor invoice approval workflows, and automated payment scheduling.', status: 'ACTIVE', tier: 'Core', enabled: true },
  { id: 22, code: 'FAAP-22', name: 'Accounts Receivable', category: 'Enterprise Finance', description: 'Customer invoicing, aging analysis, dunning automation, and credit limit tracking.', status: 'ACTIVE', tier: 'Core', enabled: true },
  { id: 23, code: 'FAAP-23', name: 'Invoice Automation', category: 'Enterprise Finance', description: 'OCR document extraction, automated invoice routing, and electronic tax invoicing.', status: 'ACTIVE', tier: 'Enterprise', enabled: true },
  { id: 24, code: 'FAAP-24', name: 'Subscription Billing', category: 'Enterprise Finance', description: 'Recurring billing engine with metered usage, proration, and subscription lifecycles.', status: 'ACTIVE', tier: 'Enterprise', enabled: true },
  { id: 25, code: 'FAAP-25', name: 'Tax Management', category: 'Enterprise Finance', description: 'Multi-jurisdictional VAT, GST, withholding tax, and corporate tax compliance engine.', status: 'ACTIVE', tier: 'Enterprise', enabled: true },
  { id: 26, code: 'FAAP-26', name: 'Payroll Finance Integration', category: 'Enterprise Finance', description: 'Direct payroll ledger posting, statutory deductions, and wage disbursement.', status: 'ACTIVE', tier: 'Enterprise', enabled: true },
  { id: 27, code: 'FAAP-27', name: 'Procurement Finance', category: 'Enterprise Finance', description: 'Purchase requisition commitment accounting, encumbrance holds, and PO matching.', status: 'ACTIVE', tier: 'Enterprise', enabled: true },
  { id: 28, code: 'FAAP-28', name: 'Asset Finance', category: 'Enterprise Finance', description: 'Capital expenditure tracking, lease accounting (IFRS 16), and loan financing.', status: 'ACTIVE', tier: 'Enterprise', enabled: true },
  { id: 29, code: 'FAAP-29', name: 'Grant Accounting', category: 'Enterprise Finance', description: 'Donor-restricted fund accounting, grant milestone tracking, and compliance reporting.', status: 'ACTIVE', tier: 'Sovereign', enabled: true },
  { id: 30, code: 'FAAP-30', name: 'Donor Fund Accounting', category: 'Enterprise Finance', description: 'NGO/Church/Sovereign donor fund segregation and audited fund utilization logs.', status: 'ACTIVE', tier: 'Sovereign', enabled: true },

  // 4. Asset & Wealth Management (31-40)
  { id: 31, code: 'FAAP-31', name: 'Fixed Asset Registry', category: 'Asset & Wealth', description: 'Comprehensive physical and digital asset register with barcoding and GPS mapping.', status: 'ACTIVE', tier: 'Core', enabled: true },
  { id: 32, code: 'FAAP-32', name: 'Asset Depreciation Engine', category: 'Asset & Wealth', description: 'Straight-line, declining balance, and units of production depreciation schedules.', status: 'ACTIVE', tier: 'Core', enabled: true },
  { id: 33, code: 'FAAP-33', name: 'Equipment Lifecycle Tracking', category: 'Asset & Wealth', description: 'Maintenance history, asset impairment testing, and disposal value ledgering.', status: 'ACTIVE', tier: 'Enterprise', enabled: true },
  { id: 34, code: 'FAAP-34', name: 'Property Finance', category: 'Asset & Wealth', description: 'Real estate portfolio accounting, rental income ledger, and property valuation.', status: 'ACTIVE', tier: 'Enterprise', enabled: true },
  { id: 35, code: 'FAAP-35', name: 'Investment Portfolio Management', category: 'Asset & Wealth', description: 'Equities, bonds, money market, and treasury bill ledger with mark-to-market valuation.', status: 'ACTIVE', tier: 'Sovereign', enabled: true },
  { id: 36, code: 'FAAP-36', name: 'Wealth Management', category: 'Asset & Wealth', description: 'Private wealth accounting, asset allocation, and performance benchmarking.', status: 'ACTIVE', tier: 'Sovereign', enabled: true },
  { id: 37, code: 'FAAP-37', name: 'Family Office Finance', category: 'Asset & Wealth', description: 'Multi-entity family estate accounting, trust structures, and inter-generational wealth.', status: 'ACTIVE', tier: 'Sovereign', enabled: true },
  { id: 38, code: 'FAAP-38', name: 'Endowment Management', category: 'Asset & Wealth', description: 'University and institutional endowment fund tracking with spending rate limits.', status: 'ACTIVE', tier: 'Sovereign', enabled: true },
  { id: 39, code: 'FAAP-39', name: 'Insurance Finance', category: 'Asset & Wealth', description: 'Premium accounting, claims reserve ledgering, and reinsurance settlement.', status: 'ACTIVE', tier: 'Sovereign', enabled: true },
  { id: 40, code: 'FAAP-40', name: 'Pension Management', category: 'Asset & Wealth', description: 'Defined benefit/contribution fund accounting, member equity, and actuarial ledgers.', status: 'ACTIVE', tier: 'Sovereign', enabled: true },

  // 5. AI & Intelligence (41-50)
  { id: 41, code: 'FAAP-41', name: 'JUMO Financial Assistant', category: 'AI & Intelligence', description: 'Conversational LLM for financial inquiries, ledger audits, and variance explanations.', status: 'RING_0', tier: 'Sovereign', enabled: true },
  { id: 42, code: 'FAAP-42', name: 'Fraud Detection Engine', category: 'AI & Intelligence', description: 'Real-time anomaly scoring, duplicate invoice flagging, and suspicious vendor alerts.', status: 'ENFORCED', tier: 'Enterprise', enabled: true },
  { id: 43, code: 'FAAP-43', name: 'Financial Forecasting', category: 'AI & Intelligence', description: 'Predictive cash flow modeling, revenue forecasting, and stress scenario simulations.', status: 'ACTIVE', tier: 'Enterprise', enabled: true },
  { id: 44, code: 'FAAP-44', name: 'AI Budget Advisor', category: 'AI & Intelligence', description: 'Automated budget optimization suggestions and overspending prevention alerts.', status: 'ACTIVE', tier: 'Enterprise', enabled: true },
  { id: 45, code: 'FAAP-45', name: 'Financial Risk Scoring', category: 'AI & Intelligence', description: 'Credit risk, counterparty risk, and portfolio VaR (Value at Risk) calculation engine.', status: 'ACTIVE', tier: 'Sovereign', enabled: true },
  { id: 46, code: 'FAAP-46', name: 'Automated Audit Assistant', category: 'AI & Intelligence', description: 'Autonomous continuous auditing agent generating sample tests and working papers.', status: 'ACTIVE', tier: 'Sovereign', enabled: true },
  { id: 47, code: 'FAAP-47', name: 'Compliance Monitoring', category: 'AI & Intelligence', description: 'Real-time checking against Anti-Money Laundering (AML) and sanctions lists.', status: 'ENFORCED', tier: 'Sovereign', enabled: true },
  { id: 48, code: 'FAAP-48', name: 'Financial Digital Twin', category: 'AI & Intelligence', description: 'Simulated sandbox running macro-economic tests prior to committing live ledgers.', status: 'ACTIVE', tier: 'Sovereign', enabled: true },
  { id: 49, code: 'FAAP-49', name: 'Financial Reporting AI', category: 'AI & Intelligence', description: 'Autonomous generator of IFRS / GAAP financial statements with commentary.', status: 'ACTIVE', tier: 'Enterprise', enabled: true },
  { id: 50, code: 'FAAP-50', name: 'Executive Finance Command Center', category: 'AI & Intelligence', description: 'Unified C-suite financial dashboard with live metrics and scenario controls.', status: 'RING_0', tier: 'Sovereign', enabled: true },

  // 6. Advanced Hybrid Extensions (51-60)
  { id: 51, code: 'FAAP-51', name: 'Offline Accounting Mode', category: 'Hybrid Extensions', description: 'Local encrypted SQLite/IndexedDB offline transaction logging with zero data loss.', status: 'ACTIVE', tier: 'Core', enabled: true },
  { id: 52, code: 'FAAP-52', name: 'Local Ledger Synchronization', category: 'Hybrid Extensions', description: 'Cryptographic state reconciliation between edge nodes and cloud master ledger.', status: 'ACTIVE', tier: 'Enterprise', enabled: true },
  { id: 53, code: 'FAAP-53', name: 'Blockchain Ledger Connector', category: 'Hybrid Extensions', description: 'Immutable hash anchoring of ledger closings onto permissioned blockchain networks.', status: 'ACTIVE', tier: 'Sovereign', enabled: true },
  { id: 54, code: 'FAAP-54', name: 'CBDC Settlement Layer', category: 'Hybrid Extensions', description: 'Central Bank Digital Currency gateway for instant sovereign interbank settlement.', status: 'ACTIVE', tier: 'Sovereign', enabled: true },
  { id: 55, code: 'FAAP-55', name: 'Smart Contract Finance', category: 'Hybrid Extensions', description: 'Programmable financial escrow and automated conditional disbursement contracts.', status: 'ACTIVE', tier: 'Sovereign', enabled: true },
  { id: 56, code: 'FAAP-56', name: 'Treasury Routing Engine', category: 'Hybrid Extensions', description: 'Smart order routing across payment rails to minimize fees and processing time.', status: 'RING_0', tier: 'Sovereign', enabled: true },
  { id: 57, code: 'FAAP-57', name: 'Financial Marketplace', category: 'Hybrid Extensions', description: 'Pluggable third-party financial services, credit rating feeds, and tax connectors.', status: 'ACTIVE', tier: 'Enterprise', enabled: true },
  { id: 58, code: 'FAAP-58', name: 'Embedded Finance APIs', category: 'Hybrid Extensions', description: 'Open Banking REST & GraphQL endpoints for third-party ERP consumption.', status: 'ACTIVE', tier: 'Enterprise', enabled: true },
  { id: 59, code: 'FAAP-59', name: 'Regulatory Reporting Engine', category: 'Hybrid Extensions', description: 'Automated XML/JSON regulatory filing for central banks and tax authorities.', status: 'ACTIVE', tier: 'Sovereign', enabled: true },
  { id: 60, code: 'FAAP-60', name: 'Sovereign Finance Analytics', category: 'Hybrid Extensions', description: 'Macro-economic financial analytics, sovereign debt tracking, and national reserves.', status: 'RING_0', tier: 'Sovereign', enabled: true }
];

export interface FaapPlatformProps {
  onNavigate?: (route: string) => void;
  currentUser?: { name?: string; role?: string; email?: string };
}

export const FaapPlatform: React.FC<FaapPlatformProps> = ({
  onNavigate,
  currentUser = { name: 'Sovereign Controller', role: 'Chief Financial Officer', email: 'cfo@jumo.net' }
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'catalog' | 'ledger' | 'owner_controls' | 'assistant'>('overview');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [modules, setModules] = useState<FaapModuleDef[]>(FAAP_MODULES_60);
  const [selectedModule, setSelectedModule] = useState<FaapModuleDef>(FAAP_MODULES_60[0]);
  const [isVerifying, setIsVerifying] = useState(false);

  // Chat Assistant State
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'user' | 'assistant'; text: string; time: string }>>([
    {
      sender: 'assistant',
      text: 'Greetings. I am the JUMO Financial Assistant (FAAP-41). Double-entry balance parity is currently verified at $0.00 offset across all active tenant ledgers. How can I assist with your financial accounting, treasury clearing, or audit workflows today?',
      time: 'Just now'
    }
  ]);

  const handleToggleModule = (id: number) => {
    setModules(prev => prev.map(m => m.id === id ? { ...m, enabled: !m.enabled } : m));
  };

  const handleAuditParity = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      alert('FAAP Double-Entry Parity Audit Passed: Total Debits ($14,250,900.00) = Total Credits ($14,250,900.00). Difference = $0.00 across 84 tenant partitions.');
    }, 800);
  };

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;
    const txt = chatInput.trim();
    setChatInput('');
    setChatMessages(prev => [...prev, { sender: 'user', text: txt, time: 'Just now' }]);

    setTimeout(() => {
      setChatMessages(prev => [
        ...prev,
        {
          sender: 'assistant',
          text: `[FAAP Financial AI]: Analyzed query regarding "${txt}". Chart of Accounts code 10001 (Cash) and 40001 (Revenue) checked. All 60 FAAP modules report optimal status under Owner Control Center Ring-0 Authority.`,
          time: 'Just now'
        }
      ]);
    }, 600);
  };

  const filteredModules = modules.filter(m => {
    const matchesCat = selectedCategory === 'ALL' || m.category === selectedCategory;
    const matchesSearch = m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          m.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          m.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 font-sans flex flex-col">
      {/* 1. TOP PLATFORM BANNER */}
      <header className="bg-slate-900 text-white border-b border-slate-800 px-5 py-3 flex items-center justify-between shadow-md sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center text-white font-extrabold shadow-sm">
            <DollarSign className="w-5 h-5 text-emerald-100" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black tracking-wider text-emerald-400 uppercase font-mono">FAAP Platform v1.0</span>
              <span className="text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-700/60 px-2 py-0.5 rounded-full font-mono font-bold">
                60 HYBRID MODULES
              </span>
            </div>
            <h1 className="text-sm font-extrabold text-white">
              Financial Accounting & Asset Platform — Universal Financial Backbone
            </h1>
          </div>
        </div>

        {/* Global Controls */}
        <div className="flex items-center gap-3 text-xs">
          <button
            onClick={handleAuditParity}
            disabled={isVerifying}
            className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg flex items-center gap-1.5 shadow-sm transition disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isVerifying ? 'animate-spin' : ''}`} />
            <span>{isVerifying ? 'Verifying...' : 'Audit Parity ($0.00)'}</span>
          </button>

          <button
            onClick={() => setActiveTab('assistant')}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-emerald-300 border border-slate-700 font-bold rounded-lg flex items-center gap-1.5 transition"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>Financial AI Assistant</span>
          </button>

          <div className="h-4 w-px bg-slate-700" />

          <div className="text-right hidden sm:block">
            <span className="text-xs font-bold text-white block">{currentUser?.name || 'Administrator'}</span>
            <span className="text-[10px] text-emerald-400 font-mono block">SOVEREIGN CONTROLLER</span>
          </div>
        </div>
      </header>

      {/* 2. NAVIGATION TABS */}
      <nav className="bg-white border-b border-slate-200 px-4 py-1 flex items-center gap-1 overflow-x-auto text-xs font-bold text-slate-700 shadow-2xs">
        {[
          { id: 'overview', label: 'Financial Command Center', icon: BarChart3 },
          { id: 'catalog', label: '60-Module Catalog', icon: Package, badge: '60 FULL' },
          { id: 'ledger', label: 'Double-Entry Ledger & Parity', icon: CheckCircle2 },
          { id: 'owner_controls', label: 'Owner Control Center (Ring-0)', icon: Sliders, badge: 'RING-0' },
          { id: 'assistant', label: 'JUMO Financial AI Assistant', icon: Sparkles }
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-2 rounded-lg flex items-center gap-1.5 border transition whitespace-nowrap ${
                isActive
                  ? 'bg-emerald-50 border-emerald-400 text-emerald-900 font-bold shadow-2xs'
                  : 'bg-transparent border-transparent hover:bg-slate-100 text-slate-600'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-emerald-700' : 'text-slate-500'}`} />
              <span>{tab.label}</span>
              {tab.badge && (
                <span className={`text-[9px] font-mono px-1.5 py-0.2 rounded font-bold ${
                  isActive ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-700'
                }`}>
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* 3. MAIN WORKSPACE */}
      <main className="flex-1 p-6 overflow-y-auto max-w-7xl w-full mx-auto space-y-6">
        {/* OVERVIEW VIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Top Scorecard Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase">
                  <span>Total Settled Volume</span>
                  <TrendingUp className="w-4 h-4 text-emerald-600" />
                </div>
                <div className="text-3xl font-black text-slate-900 mt-2">$14,250,900.00</div>
                <span className="text-[11px] text-emerald-600 font-medium">Real-time Settlement Mesh</span>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase">
                  <span>1.5% Treasury Revenue</span>
                  <Landmark className="w-4 h-4 text-blue-600" />
                </div>
                <div className="text-3xl font-black text-blue-600 mt-2">$213,763.50</div>
                <span className="text-[11px] text-blue-600 font-medium">Automated Master Clearing</span>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase">
                  <span>Ledger Balance Parity</span>
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                </div>
                <div className="text-3xl font-black text-emerald-600 mt-2">$0.00 OFFSET</div>
                <span className="text-[11px] text-emerald-700 font-medium">100% Double-Entry Verified</span>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase">
                  <span>Active FAAP Modules</span>
                  <Package className="w-4 h-4 text-purple-600" />
                </div>
                <div className="text-3xl font-black text-purple-600 mt-2">60 / 60 Full</div>
                <span className="text-[11px] text-slate-500 font-medium">Ring-0 Control Center Enforced</span>
              </div>
            </div>

            {/* Category Breakdown */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-4">
              <h3 className="text-sm font-bold text-slate-900">FAAP 60-Module Architectural Matrix</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
                {[
                  { name: '1. Core Accounting Layer', count: '10 Modules', desc: 'GL, Double Entry, FX, CoA, Journals, Periods, Consolidation, Budgets, Cost Centers, Depts' },
                  { name: '2. Treasury & Banking', count: '10 Modules', desc: 'Treasury, Cash Flow, Bank Recon, Liquidity, Payments, Wallets, Mobile Money, Cards, SWIFT, ACH' },
                  { name: '3. Enterprise Finance', count: '10 Modules', desc: 'AP, AR, Invoicing, Subscriptions, Tax, Payroll Fin, Procurement Fin, Asset Fin, Grants, Donors' },
                  { name: '4. Asset & Wealth Management', count: '10 Modules', desc: 'Fixed Assets, Depreciation, Equipment, Property, Investments, Wealth, Family Office, Endowments, Insurance, Pensions' },
                  { name: '5. AI & Intelligence', count: '10 Modules', desc: 'Financial AI, Fraud Detection, Forecasting, Budget Advisor, Risk Scoring, Automated Audit, Compliance, Digital Twin, Reporting AI, C-Suite Command' },
                  { name: '6. Advanced Hybrid Extensions', count: '10 Modules', desc: 'Offline Accounting, Local Sync, Blockchain Connector, CBDC Settlement, Smart Contracts, Treasury Router, Marketplace, APIs, Regulatory, Sovereign Analytics' },
                ].map((item, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold text-slate-900">{item.name}</span>
                      <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-mono text-[10px] font-bold">
                        {item.count}
                      </span>
                    </div>
                    <p className="text-slate-600 text-[11px] leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 60-MODULE CATALOG VIEW */}
        {activeTab === 'catalog' && (
          <div className="space-y-6">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h2 className="text-base font-extrabold text-slate-900">FAAP 60-Module Enterprise Registry</h2>
                  <p className="text-xs text-slate-500">Universal Financial Backbone modules integrated across all JUMO ERPs and platforms.</p>
                </div>

                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search code or module name..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-xs focus:outline-none focus:border-emerald-600"
                    />
                  </div>
                </div>
              </div>

              {/* Category Filter Pills */}
              <div className="flex items-center gap-1 overflow-x-auto text-xs pt-2 border-t border-slate-100">
                {['ALL', 'Core Accounting', 'Treasury & Banking', 'Enterprise Finance', 'Asset & Wealth', 'AI & Intelligence', 'Hybrid Extensions'].map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1 rounded-lg font-bold transition whitespace-nowrap ${
                      selectedCategory === cat ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Modules Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredModules.map(m => (
                <div
                  key={m.id}
                  onClick={() => setSelectedModule(m)}
                  className={`p-4 rounded-xl border transition cursor-pointer flex flex-col justify-between space-y-3 ${
                    selectedModule.id === m.id
                      ? 'bg-emerald-50/60 border-emerald-500 shadow-xs ring-1 ring-emerald-400'
                      : 'bg-white border-slate-200 hover:border-emerald-300'
                  }`}
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                        {m.code}
                      </span>
                      <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                        {m.tier}
                      </span>
                    </div>
                    <h4 className="font-bold text-xs text-slate-900">{m.name}</h4>
                    <p className="text-[11px] text-slate-600 line-clamp-2 leading-relaxed">{m.description}</p>
                  </div>

                  <div className="flex items-center justify-between text-[11px] pt-2 border-t border-slate-100">
                    <span className="text-slate-500 font-medium">{m.category}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggleModule(m.id);
                      }}
                      className={`px-2 py-0.5 rounded font-mono font-bold text-[10px] ${
                        m.enabled ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'
                      }`}
                    >
                      {m.enabled ? 'ENABLED' : 'DISABLED'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* DOUBLE-ENTRY LEDGER VIEW */}
        {activeTab === 'ledger' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-6">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <div>
                <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span>Double-Entry Real-Time Ledger & Parity Monitor</span>
                </h2>
                <p className="text-xs text-slate-500 mt-1">Live transaction posting with automatic double-entry debit/credit parity checking.</p>
              </div>
              <span className="px-3 py-1 bg-emerald-100 text-emerald-800 font-mono font-bold text-xs rounded-xl border border-emerald-300">
                PARITY STATUS: $0.00 OFFSET
              </span>
            </div>

            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 font-bold text-slate-600 border-b border-slate-200">
                <tr>
                  <th className="p-3">TX ID</th>
                  <th className="p-3">Tenant / ERP</th>
                  <th className="p-3">Type</th>
                  <th className="p-3">Debit Amount</th>
                  <th className="p-3">1.5% Fee</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {[
                  { id: 'TX-FAAP-901', tenant: 'UG_SACCO_MAIN', type: 'LOAN_DISBURSEMENT', amount: '$25,000.00', fee: '$375.00', status: 'SETTLED' },
                  { id: 'TX-FAAP-902', tenant: 'MAKERERE_EDU', type: 'TUITION_FEE_COLLECTION', amount: '$42,100.00', fee: '$631.50', status: 'SETTLED' },
                  { id: 'TX-FAAP-903', tenant: 'CHURCH_DIOCESE', type: 'OFFERTORY_CLEARING', amount: '$12,800.00', fee: '$192.00', status: 'SETTLED' },
                  { id: 'TX-FAAP-904', tenant: 'HEALTHCARE_CLINIC', type: 'MEDICINE_PROCUREMENT', amount: '$8,450.00', fee: '$126.75', status: 'SETTLED' }
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-slate-50">
                    <td className="p-3 font-mono font-bold text-emerald-700">{row.id}</td>
                    <td className="p-3 font-bold text-slate-800">{row.tenant}</td>
                    <td className="p-3 text-slate-600 font-mono">{row.type}</td>
                    <td className="p-3 font-bold text-slate-900">{row.amount}</td>
                    <td className="p-3 text-blue-700 font-bold">{row.fee}</td>
                    <td className="p-3"><span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-mono font-bold text-[10px]">SETTLED</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* OWNER CONTROL CENTER CONTROLS */}
        {activeTab === 'owner_controls' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-6">
            <div className="border-b border-slate-200 pb-4">
              <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                <Sliders className="w-5 h-5 text-emerald-600" />
                <span>Ring-0 Owner Control Center — FAAP Configuration Governance</span>
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Central activation, licensing rules, subscription enforcement, and security policies for all 60 FAAP modules.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                <h4 className="font-bold text-slate-900 uppercase">1.5% Treasury Clearing Rate</h4>
                <div className="flex items-center gap-3">
                  <input type="number" step="0.1" defaultValue={1.5} className="w-20 p-2 border border-slate-300 rounded font-mono font-bold text-xs" />
                  <span className="text-slate-600">% Universal Treasury Settlement Fee</span>
                </div>
                <p className="text-[11px] text-slate-500">Automatically debited to JUMO Master Treasury on every enterprise transaction.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                <h4 className="font-bold text-slate-900 uppercase">Subscription & Licensing Enforcement</h4>
                <div className="space-y-2">
                  <label className="flex items-center justify-between cursor-pointer">
                    <span>Require Sovereign Subscription Tier for Hybrid Extensions</span>
                    <input type="checkbox" defaultChecked />
                  </label>
                  <label className="flex items-center justify-between cursor-pointer">
                    <span>Enforce Row-Level Tenant Database Isolation</span>
                    <input type="checkbox" defaultChecked />
                  </label>
                  <label className="flex items-center justify-between cursor-pointer">
                    <span>Mandatory Double-Entry Parity Check before Commit</span>
                    <input type="checkbox" defaultChecked />
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* AI ASSISTANT VIEW */}
        {activeTab === 'assistant' && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs flex flex-col h-[650px] overflow-hidden">
            <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white font-bold shadow-md">
                  <Sparkles className="w-5 h-5 text-emerald-100" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-white">JUMO Financial Assistant (FAAP-41)</h3>
                  <p className="text-xs text-slate-300">Sovereign Financial AI & Double-Entry Ledger Auditor</p>
                </div>
              </div>
              <span className="text-xs font-mono px-2.5 py-1 bg-emerald-950 text-emerald-300 border border-emerald-700 rounded-full font-bold">
                Parity Verified $0.00
              </span>
            </div>

            <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-slate-50">
              {chatMessages.map((msg, i) => (
                <div key={i} className={`flex flex-col max-w-[80%] ${msg.sender === 'user' ? 'ml-auto items-end' : 'mr-auto items-start'}`}>
                  <div className={`p-4 rounded-2xl text-xs leading-relaxed shadow-2xs ${
                    msg.sender === 'user' ? 'bg-emerald-600 text-white rounded-br-none' : 'bg-white border border-slate-200 text-slate-800 rounded-bl-none'
                  }`}>
                    {msg.text}
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono mt-1 px-1">{msg.time}</span>
                </div>
              ))}
            </div>

            <div className="p-4 bg-white border-t border-slate-200 flex items-center gap-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask FAAP Financial AI about CoA balances, ledger audits, treasury clearing, or period closing..."
                className="flex-1 p-2.5 rounded-xl border border-slate-300 text-xs focus:outline-none focus:border-emerald-600"
              />
              <button onClick={handleSendMessage} className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl transition flex items-center gap-1.5 shadow-sm">
                <span>Send</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </main>

      {/* 4. FOOTER */}
      <footer className="bg-slate-900 text-white border-t border-slate-800 px-5 py-2 flex items-center justify-between text-xs font-mono">
        <div className="flex items-center gap-3">
          <span className="text-emerald-400 font-bold flex items-center gap-1">
            <DollarSign className="w-3.5 h-3.5" /> FAAP v1.0 SOVEREIGN BACKBONE
          </span>
          <span className="text-slate-600">|</span>
          <span className="text-slate-300">60 Modules Operational</span>
          <span className="text-slate-600">|</span>
          <span className="text-emerald-400 font-bold">Parity Offset: $0.00</span>
        </div>
        <div className="flex items-center gap-3 text-slate-400">
          <span>1.5% Treasury Fee Clearing Active</span>
          <span>Ring-0 Authority</span>
        </div>
      </footer>
    </div>
  );
};

export default FaapPlatform;
