/**
 * JUMO UEOS — JUMO DIGITAL PAY Platform v1.0
 * Universal Payment Switch, Global Treasury Router, and Multi-Rail Settlement Engine.
 * 
 * Target: 50 Payment & Treasury Modules across 5 Categories:
 * 1. Payment Infrastructure (Modules 1-10)
 * 2. Financial Services (Modules 11-20)
 * 3. Enterprise Commerce (Modules 21-30)
 * 4. Intelligence & Security (Modules 31-40)
 * 5. Hybrid Extensions (Modules 41-50)
 * 
 * Governed strictly by Ring-0 Owner Control Center Authority.
 */

import React, { useState } from 'react';
import {
  CreditCard, Wallet, Landmark, DollarSign, TrendingUp, CheckCircle2, Shield, Search, Filter,
  RefreshCw, FileText, Send, Sliders, Sparkles, Layers, Package, Zap, Globe, ArrowUpRight,
  ShieldCheck, Database, Award, Settings, Workflow, ChevronRight
} from 'lucide-react';

export interface DigitalPayModuleDef {
  id: number;
  code: string;
  name: string;
  category: 'Payment Infrastructure' | 'Financial Services' | 'Enterprise Commerce' | 'Intelligence & Security' | 'Hybrid Extensions';
  description: string;
  status: 'ACTIVE' | 'ENFORCED' | 'RING_0' | 'CLEARING';
  tier: 'Core' | 'Enterprise' | 'Sovereign';
  enabled: boolean;
}

export const DIGITAL_PAY_MODULES_50: DigitalPayModuleDef[] = [
  // 1. Payment Infrastructure (1-10)
  { id: 1, code: 'PAY-01', name: 'Digital Wallet Engine', category: 'Payment Infrastructure', description: 'Multi-currency digital wallet ledger with instant balance updates and closed-loop transfers.', status: 'RING_0', tier: 'Core', enabled: true },
  { id: 2, code: 'PAY-02', name: 'Merchant Payments Gateway', category: 'Payment Infrastructure', description: 'Unified merchant checkout supporting cards, mobile money, QR codes, and bank transfers.', status: 'ACTIVE', tier: 'Core', enabled: true },
  { id: 3, code: 'PAY-03', name: 'Customer Checkout Engine', category: 'Payment Infrastructure', description: 'Low-latency one-click payment processing with embedded fraud checks.', status: 'ACTIVE', tier: 'Core', enabled: true },
  { id: 4, code: 'PAY-04', name: 'QR Payments Processor', category: 'Payment Infrastructure', description: 'Dynamic EMVCo static and dynamic QR code generation and instant payment notification.', status: 'ACTIVE', tier: 'Core', enabled: true },
  { id: 5, code: 'PAY-05', name: 'Mobile Money Hub', category: 'Payment Infrastructure', description: 'Direct API rails for M-Pesa, Airtel Money, MTN Mobile Money, and Orange Cash.', status: 'ENFORCED', tier: 'Enterprise', enabled: true },
  { id: 6, code: 'PAY-06', name: 'Card Processing Gateway', category: 'Payment Infrastructure', description: '3D-Secure 2.0 Visa, Mastercard, and UnionPay merchant acquiring gateway.', status: 'ACTIVE', tier: 'Enterprise', enabled: true },
  { id: 7, code: 'PAY-07', name: 'Bank Transfer Clearing Hub', category: 'Payment Infrastructure', description: 'Direct real-time interbank settlement and instant EFT processing.', status: 'ACTIVE', tier: 'Enterprise', enabled: true },
  { id: 8, code: 'PAY-08', name: 'Cross-Border Wire Gateway', category: 'Payment Infrastructure', description: 'Institutional FX exchange and cross-border SWIFT/ACH wire transfer routing.', status: 'ACTIVE', tier: 'Sovereign', enabled: true },
  { id: 9, code: 'PAY-09', name: 'Payment Gateway Router', category: 'Payment Infrastructure', description: 'Intelligent payment routing engine selecting lowest-fee rails dynamically.', status: 'RING_0', tier: 'Sovereign', enabled: true },
  { id: 10, code: 'PAY-10', name: 'Settlement & Clearing Engine', category: 'Payment Infrastructure', description: 'Automated 1.5% master treasury fee routing and real-time merchant payouts.', status: 'RING_0', tier: 'Sovereign', enabled: true },

  // 2. Financial Services (11-20)
  { id: 11, code: 'PAY-11', name: 'Savings & Deposit Wallets', category: 'Financial Services', description: 'Interest-bearing digital savings products with interest calculation schedules.', status: 'ACTIVE', tier: 'Enterprise', enabled: true },
  { id: 12, code: 'PAY-12', name: 'Micro-Lending Engine', category: 'Financial Services', description: 'Automated micro-loan disbursements, repayment tracking, and penalty calculations.', status: 'ACTIVE', tier: 'Enterprise', enabled: true },
  { id: 13, code: 'PAY-13', name: 'Credit Scoring Engine', category: 'Financial Services', description: 'AI-driven credit scoring evaluating wallet transaction velocity and repayment history.', status: 'ACTIVE', tier: 'Enterprise', enabled: true },
  { id: 14, code: 'PAY-14', name: 'Insurance Payment Gateway', category: 'Financial Services', description: 'Micro-insurance premium collection and instant claim payout disbursement.', status: 'ACTIVE', tier: 'Enterprise', enabled: true },
  { id: 15, code: 'PAY-15', name: 'Subscription Billing Engine', category: 'Financial Services', description: 'Automated recurring card and mobile money debit for subscription services.', status: 'ACTIVE', tier: 'Core', enabled: true },
  { id: 16, code: 'PAY-16', name: 'Automated Invoice Settlement', category: 'Financial Services', description: 'E-invoicing payment links with automatic GL posting in FAAP upon receipt.', status: 'ACTIVE', tier: 'Core', enabled: true },
  { id: 17, code: 'PAY-17', name: 'Payroll Mass Disbursement', category: 'Financial Services', description: 'Bulk salary payouts to thousands of mobile wallets and bank accounts in one click.', status: 'ACTIVE', tier: 'Enterprise', enabled: true },
  { id: 18, code: 'PAY-18', name: 'Government Tax Collection', category: 'Financial Services', description: 'Direct integration with Revenue Authorities for customs duty and VAT payments.', status: 'ACTIVE', tier: 'Sovereign', enabled: true },
  { id: 19, code: 'PAY-19', name: 'Education Tuition Hub', category: 'Financial Services', description: 'Student fee payment processing with automatic student account reconciliation.', status: 'ACTIVE', tier: 'Core', enabled: true },
  { id: 20, code: 'PAY-20', name: 'Healthcare Claims Gateway', category: 'Financial Services', description: 'Hospital bill settlement, health insurance co-pay processing, and pharmacy payouts.', status: 'ACTIVE', tier: 'Enterprise', enabled: true },

  // 3. Enterprise Commerce (21-30)
  { id: 21, code: 'PAY-21', name: 'Marketplace Payments Engine', category: 'Enterprise Commerce', description: 'Multi-vendor split payments, escrow holds, and automated vendor commission payouts.', status: 'ACTIVE', tier: 'Enterprise', enabled: true },
  { id: 22, code: 'PAY-22', name: 'E-Commerce Checkout API', category: 'Enterprise Commerce', description: 'REST and JS SDK for seamless website and mobile app checkout integration.', status: 'ACTIVE', tier: 'Core', enabled: true },
  { id: 23, code: 'PAY-23', name: 'POS Terminal Integration', category: 'Enterprise Commerce', description: 'Android POS terminal SDK with chip-and-pin, NFC contactless, and barcode support.', status: 'ACTIVE', tier: 'Enterprise', enabled: true },
  { id: 24, code: 'PAY-24', name: 'Retail Payment Engine', category: 'Enterprise Commerce', description: 'High-volume supermarket checkout payment processing with sub-second response times.', status: 'ACTIVE', tier: 'Enterprise', enabled: true },
  { id: 25, code: 'PAY-25', name: 'Hospitality & Booking Payments', category: 'Enterprise Commerce', description: 'Hotel reservation pre-authorizations, room charge settlements, and tourism payments.', status: 'ACTIVE', tier: 'Enterprise', enabled: true },
  { id: 26, code: 'PAY-26', name: 'Transport & Toll Payments', category: 'Enterprise Commerce', description: 'Contactless transit card payments, highway tolling, and fleet fuel disbursements.', status: 'ACTIVE', tier: 'Enterprise', enabled: true },
  { id: 27, code: 'PAY-27', name: 'SACCO Member Payments', category: 'Enterprise Commerce', description: 'SACCO share capital contributions, loan repayments, and dividend disbursements.', status: 'ACTIVE', tier: 'Enterprise', enabled: true },
  { id: 28, code: 'PAY-28', name: 'Cooperative Produce Payouts', category: 'Enterprise Commerce', description: 'Direct farmer payouts upon crop delivery with SMS payment confirmations.', status: 'ACTIVE', tier: 'Sovereign', enabled: true },
  { id: 29, code: 'PAY-29', name: 'Non-Profit Donation Gateway', category: 'Enterprise Commerce', description: 'Global multi-currency donor portals with automated tax receipt generation.', status: 'ACTIVE', tier: 'Core', enabled: true },
  { id: 30, code: 'PAY-30', name: 'Church Tithe & Offering Hub', category: 'Enterprise Commerce', description: 'Digital tithe collections, project pledges, and diocese fund consolidation.', status: 'ACTIVE', tier: 'Core', enabled: true },

  // 4. Intelligence & Security (31-40)
  { id: 31, code: 'PAY-31', name: 'JUMO Pay AI Assistant', category: 'Intelligence & Security', description: 'Conversational LLM copilot analyzing payment settlement trends and clearing velocity.', status: 'RING_0', tier: 'Sovereign', enabled: true },
  { id: 32, code: 'PAY-32', name: 'AI Fraud Prevention Engine', category: 'Intelligence & Security', description: 'Real-time velocity checking, IP proxy detection, and machine learning fraud scoring.', status: 'ENFORCED', tier: 'Enterprise', enabled: true },
  { id: 33, code: 'PAY-33', name: 'Real-Time Transaction Analytics', category: 'Intelligence & Security', description: 'Live transaction volume heatmaps, peak load tracking, and success rate metrics.', status: 'ACTIVE', tier: 'Enterprise', enabled: true },
  { id: 34, code: 'PAY-34', name: 'Payment Risk Engine', category: 'Intelligence & Security', description: 'Chargeback prevention, merchant risk profiling, and holdback reserve management.', status: 'ACTIVE', tier: 'Enterprise', enabled: true },
  { id: 35, code: 'PAY-35', name: 'AI Merchant Advisory Copilot', category: 'Intelligence & Security', description: 'Automated advice helping merchants optimize payment success rates and reduce fees.', status: 'ACTIVE', tier: 'Enterprise', enabled: true },
  { id: 36, code: 'PAY-36', name: 'Revenue Analytics Hub', category: 'Intelligence & Security', description: 'Granular processing fee analytics, GMV trends, and interchange revenue reports.', status: 'ACTIVE', tier: 'Enterprise', enabled: true },
  { id: 37, code: 'PAY-37', name: 'Digital Commerce Intelligence', category: 'Intelligence & Security', description: 'Consumer spending behavior insights and cross-merchant purchasing trends.', status: 'ACTIVE', tier: 'Sovereign', enabled: true },
  { id: 38, code: 'PAY-38', name: 'Payment Digital Twin Sandbox', category: 'Intelligence & Security', description: 'Simulated payment rail testing environment for developer integration validation.', status: 'ACTIVE', tier: 'Core', enabled: true },
  { id: 39, code: 'PAY-39', name: 'Smart Rail Optimization AI', category: 'Intelligence & Security', description: 'Dynamic routing algorithm directing transactions over the fastest available gateway.', status: 'ACTIVE', tier: 'Sovereign', enabled: true },
  { id: 40, code: 'PAY-40', name: 'Automated Reconciliation AI', category: 'Intelligence & Security', description: 'AI matching processor matching bank settlement files with digital wallet transactions.', status: 'ACTIVE', tier: 'Enterprise', enabled: true },

  // 5. Hybrid Extensions (41-50)
  { id: 41, code: 'PAY-41', name: 'Offline Store-and-Forward Payments', category: 'Hybrid Extensions', description: 'Cryptographically signed offline transactions queued locally during internet outages.', status: 'ACTIVE', tier: 'Core', enabled: true },
  { id: 42, code: 'PAY-42', name: 'Edge Settlement Nodes', category: 'Hybrid Extensions', description: 'Local payment processing nodes maintaining transaction logs independently.', status: 'ACTIVE', tier: 'Enterprise', enabled: true },
  { id: 43, code: 'PAY-43', name: 'Multi-Currency Digital Vaults', category: 'Hybrid Extensions', description: 'Secure holding vaults supporting USD, EUR, GBP, KES, UGX, TZS, and NGN.', status: 'ACTIVE', tier: 'Sovereign', enabled: true },
  { id: 44, code: 'PAY-44', name: 'Developer API Marketplace', category: 'Hybrid Extensions', description: 'Public and partner API catalog for custom payment gateway integrations.', status: 'ACTIVE', tier: 'Enterprise', enabled: true },
  { id: 45, code: 'PAY-45', name: 'Developer Sandbox & Docs', category: 'Hybrid Extensions', description: 'Interactive web sandbox with test credit card numbers and mobile money simulators.', status: 'ACTIVE', tier: 'Core', enabled: true },
  { id: 46, code: 'PAY-46', name: 'Payment Encryption Layer', category: 'Hybrid Extensions', description: 'End-to-end tokenization and HSM hardware security module key protection.', status: 'ENFORCED', tier: 'Sovereign', enabled: true },
  { id: 47, code: 'PAY-47', name: 'Regulatory Compliance (AML/KYC)', category: 'Hybrid Extensions', description: 'Automated PEP screening, sanctions list checks, and identity document verification.', status: 'ENFORCED', tier: 'Sovereign', enabled: true },
  { id: 48, code: 'PAY-48', name: 'Central Bank Reporting', category: 'Hybrid Extensions', description: 'Automated daily regulatory reporting files submitted to national central banks.', status: 'ACTIVE', tier: 'Sovereign', enabled: true },
  { id: 49, code: 'PAY-49', name: 'Global Clearing Mesh Network', category: 'Hybrid Extensions', description: 'Distributed inter-region liquidity clearing network connecting global enterprise hubs.', status: 'RING_0', tier: 'Sovereign', enabled: true },
  { id: 50, code: 'PAY-50', name: 'Sovereign Payment Control Plane', category: 'Hybrid Extensions', description: 'Ring-0 master control panel governing all payment rails across JUMO UEOS.', status: 'RING_0', tier: 'Sovereign', enabled: true }
];

export interface DigitalPayPlatformProps {
  onNavigate?: (route: string) => void;
  currentUser?: { name?: string; role?: string; email?: string };
}

export const DigitalPayPlatform: React.FC<DigitalPayPlatformProps> = ({
  onNavigate,
  currentUser = { name: 'Sovereign Payment Director', role: 'Head of Digital Treasury', email: 'pay@jumo.net' }
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'catalog' | 'clearing' | 'owner_controls' | 'assistant'>('overview');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [modules, setModules] = useState<DigitalPayModuleDef[]>(DIGITAL_PAY_MODULES_50);
  const [selectedModule, setSelectedModule] = useState<DigitalPayModuleDef>(DIGITAL_PAY_MODULES_50[0]);
  const [isClearing, setIsClearing] = useState(false);

  // Chat Assistant State
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'user' | 'assistant'; text: string; time: string }>>([
    {
      sender: 'assistant',
      text: 'Greetings. I am the JUMO Pay AI Assistant (PAY-31). Universal payment rails and 1.5% master treasury clearing router are fully operational. All 50 digital pay modules are active under Ring-0 Owner Control Center authority. How can I assist with transaction routing or clearing settlement today?',
      time: 'Just now'
    }
  ]);

  const handleToggleModule = (id: number) => {
    setModules(prev => prev.map(m => m.id === id ? { ...m, enabled: !m.enabled } : m));
  };

  const handleTriggerClearing = () => {
    setIsClearing(true);
    setTimeout(() => {
      setIsClearing(false);
      alert('JUMO Digital Pay Clearing Complete: $450,200.00 processed across M-Pesa, Visa, and SWIFT rails. $6,753.00 credited to JUMO Master Treasury (1.5% Fee).');
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
          text: `[JUMO Pay AI]: Processed query regarding "${txt}". Payment Gateway Router (PAY-09) and AML Compliance (PAY-47) verified. Transaction success rate currently stands at 99.98% across all active merchant wallets.`,
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
          <div className="w-9 h-9 rounded-xl bg-purple-600 flex items-center justify-center text-white font-extrabold shadow-sm">
            <CreditCard className="w-5 h-5 text-purple-100" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black tracking-wider text-purple-400 uppercase font-mono">DIGITAL PAY v1.0</span>
              <span className="text-[10px] bg-purple-950 text-purple-300 border border-purple-700/60 px-2 py-0.5 rounded-full font-mono font-bold">
                50 PAYMENT MODULES
              </span>
            </div>
            <h1 className="text-sm font-extrabold text-white">
              JUMO DIGITAL PAY — Global Treasury & Payment Switch
            </h1>
          </div>
        </div>

        {/* Global Controls */}
        <div className="flex items-center gap-3 text-xs">
          <button
            onClick={handleTriggerClearing}
            disabled={isClearing}
            className="px-3 py-1.5 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-lg flex items-center gap-1.5 shadow-sm transition disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isClearing ? 'animate-spin' : ''}`} />
            <span>{isClearing ? 'Clearing...' : 'Trigger Clearing Mesh'}</span>
          </button>

          <button
            onClick={() => setActiveTab('assistant')}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-purple-300 border border-slate-700 font-bold rounded-lg flex items-center gap-1.5 transition"
          >
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>Pay AI Assistant</span>
          </button>

          <div className="h-4 w-px bg-slate-700" />

          <div className="text-right hidden sm:block">
            <span className="text-xs font-bold text-white block">{currentUser?.name || 'Administrator'}</span>
            <span className="text-[10px] text-purple-400 font-mono block">TREASURY DIRECTOR</span>
          </div>
        </div>
      </header>

      {/* 2. NAVIGATION TABS */}
      <nav className="bg-white border-b border-slate-200 px-4 py-1 flex items-center gap-1 overflow-x-auto text-xs font-bold text-slate-700 shadow-2xs">
        {[
          { id: 'overview', label: 'Treasury & Payment Switch', icon: Landmark },
          { id: 'catalog', label: '50 Payment Modules', icon: Package, badge: '50 FULL' },
          { id: 'clearing', label: 'Live Multi-Rail Clearing Stream', icon: TrendingUp },
          { id: 'owner_controls', label: 'Owner Control Center (Ring-0)', icon: Sliders, badge: 'RING-0' },
          { id: 'assistant', label: 'JUMO Pay AI Assistant', icon: Sparkles }
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-2 rounded-lg flex items-center gap-1.5 border transition whitespace-nowrap ${
                isActive
                  ? 'bg-purple-50 border-purple-400 text-purple-900 font-bold shadow-2xs'
                  : 'bg-transparent border-transparent hover:bg-slate-100 text-slate-600'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-purple-700' : 'text-slate-500'}`} />
              <span>{tab.label}</span>
              {tab.badge && (
                <span className={`text-[9px] font-mono px-1.5 py-0.2 rounded font-bold ${
                  isActive ? 'bg-purple-600 text-white' : 'bg-slate-200 text-slate-700'
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
                  <span>24-Hour GMV Processed</span>
                  <TrendingUp className="w-4 h-4 text-emerald-600" />
                </div>
                <div className="text-3xl font-black text-slate-900 mt-2">$8,940,250.00</div>
                <span className="text-[11px] text-emerald-600 font-medium">Sub-Second Processing Velocity</span>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase">
                  <span>1.5% Treasury Clearing Fee</span>
                  <Landmark className="w-4 h-4 text-purple-600" />
                </div>
                <div className="text-3xl font-black text-purple-600 mt-2">$134,103.75</div>
                <span className="text-[11px] text-purple-600 font-medium">JUMO Master Treasury Credit</span>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase">
                  <span>Payment Success Rate</span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                </div>
                <div className="text-3xl font-black text-emerald-600 mt-2">99.98%</div>
                <span className="text-[11px] text-emerald-700 font-medium">Multi-Rail Auto Routing</span>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase">
                  <span>Active Payment Modules</span>
                  <Package className="w-4 h-4 text-purple-600" />
                </div>
                <div className="text-3xl font-black text-purple-600 mt-2">50 / 50 Full</div>
                <span className="text-[11px] text-slate-500 font-medium">Ring-0 Owner Control Enforced</span>
              </div>
            </div>

            {/* Category Breakdown */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-4">
              <h3 className="text-sm font-bold text-slate-900">JUMO DIGITAL PAY 50-Module Architecture</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
                {[
                  { name: '1. Payment Infrastructure', count: '10 Modules', desc: 'Digital Wallets, Merchant Gateway, Checkout Engine, QR Payments, Mobile Money Hub, Cards, Interbank, Wire Gateway, Smart Router, Settlement' },
                  { name: '2. Financial Services', count: '10 Modules', desc: 'Savings Wallets, Micro-Lending, Credit Scoring, Insurance Gateway, Subscription Engine, Invoicing, Mass Payroll, Tax Collection, Education, Healthcare' },
                  { name: '3. Enterprise Commerce', count: '10 Modules', desc: 'Marketplace Payments, E-Commerce SDK, POS Terminals, Supermarket Retail, Hospitality, Transit Tolls, SACCO Payments, Farm Payouts, Donations, Church Tithes' },
                  { name: '4. Intelligence & Security', count: '10 Modules', desc: 'Pay AI Assistant, Fraud Prevention, Real-Time Analytics, Risk Engine, Merchant Advisory, Revenue Hub, Commerce Intelligence, Digital Twin, Smart Rails, Recon AI' },
                  { name: '5. Hybrid Extensions', count: '10 Modules', desc: 'Offline Payments, Edge Settlement Nodes, Multi-Currency Vaults, API Marketplace, Developer Portal, Payment Encryption, AML/KYC, Central Bank Files, Clearing Mesh, Control Plane' },
                ].map((item, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold text-slate-900">{item.name}</span>
                      <span className="px-2 py-0.5 rounded bg-purple-100 text-purple-800 font-mono text-[10px] font-bold">
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

        {/* 50-MODULE CATALOG VIEW */}
        {activeTab === 'catalog' && (
          <div className="space-y-6">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h2 className="text-base font-extrabold text-slate-900">JUMO DIGITAL PAY 50-Module Registry</h2>
                  <p className="text-xs text-slate-500">Universal Digital Payment and Treasury modules powering all enterprise transactions.</p>
                </div>

                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search code or module name..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-xs focus:outline-none focus:border-purple-600"
                    />
                  </div>
                </div>
              </div>

              {/* Category Filter Pills */}
              <div className="flex items-center gap-1 overflow-x-auto text-xs pt-2 border-t border-slate-100">
                {['ALL', 'Payment Infrastructure', 'Financial Services', 'Enterprise Commerce', 'Intelligence & Security', 'Hybrid Extensions'].map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1 rounded-lg font-bold transition whitespace-nowrap ${
                      selectedCategory === cat ? 'bg-purple-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
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
                      ? 'bg-purple-50/60 border-purple-500 shadow-xs ring-1 ring-purple-400'
                      : 'bg-white border-slate-200 hover:border-purple-300'
                  }`}
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-purple-700 bg-purple-100 px-2 py-0.5 rounded">
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
                        m.enabled ? 'bg-purple-100 text-purple-800' : 'bg-slate-200 text-slate-600'
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

        {/* CLEARING STREAM VIEW */}
        {activeTab === 'clearing' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-6">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <div>
                <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-purple-600" />
                  <span>Live Multi-Rail Clearing Stream</span>
                </h2>
                <p className="text-xs text-slate-500 mt-1">Real-time payment clearing stream with automatic 1.5% master treasury fee routing.</p>
              </div>
              <span className="px-3 py-1 bg-purple-100 text-purple-800 font-mono font-bold text-xs rounded-xl border border-purple-300">
                TREASURY CLEARING: ACTIVE
              </span>
            </div>

            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 font-bold text-slate-600 border-b border-slate-200">
                <tr>
                  <th className="p-3">Reference ID</th>
                  <th className="p-3">Payment Rail</th>
                  <th className="p-3">Merchant / Tenant</th>
                  <th className="p-3">Gross Amount</th>
                  <th className="p-3">1.5% Fee Credit</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {[
                  { ref: 'PAY-REF-7701', rail: 'M-PESA (PAY-05)', tenant: 'SACCO_SUPERMARKET', gross: '$1,200.00', fee: '$18.00', status: 'CLEARED' },
                  { ref: 'PAY-REF-7702', rail: 'VISA 3DS2 (PAY-06)', tenant: 'HOTEL_RESORT_01', gross: '$4,850.00', fee: '$72.75', status: 'CLEARED' },
                  { ref: 'PAY-REF-7703', rail: 'INTERBANK (PAY-07)', tenant: 'UNIVERSITY_TUITION', gross: '$18,900.00', fee: '$283.50', status: 'CLEARED' },
                  { ref: 'PAY-REF-7704', rail: 'QR PAY (PAY-04)', tenant: 'RETAIL_STORE_44', gross: '$320.00', fee: '$4.80', status: 'CLEARED' }
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-slate-50">
                    <td className="p-3 font-mono font-bold text-purple-700">{row.ref}</td>
                    <td className="p-3 font-bold text-slate-800">{row.rail}</td>
                    <td className="p-3 text-slate-600 font-mono">{row.tenant}</td>
                    <td className="p-3 font-bold text-slate-900">{row.gross}</td>
                    <td className="p-3 text-purple-700 font-bold">{row.fee}</td>
                    <td className="p-3"><span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-mono font-bold text-[10px]">CLEARED</span></td>
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
                <Sliders className="w-5 h-5 text-purple-600" />
                <span>Ring-0 Owner Control Center — JUMO DIGITAL PAY Governance</span>
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Central payment switch configuration, treasury settlement rules, and API rate limits.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                <h4 className="font-bold text-slate-900 uppercase">1.5% Treasury Settlement Rate</h4>
                <div className="flex items-center gap-3">
                  <input type="number" step="0.1" defaultValue={1.5} className="w-20 p-2 border border-slate-300 rounded font-mono font-bold text-xs" />
                  <span className="text-slate-600">% Master Treasury Clearing Fee</span>
                </div>
                <p className="text-[11px] text-slate-500">Automatically credited to JUMO Master Treasury account on all processed transactions.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                <h4 className="font-bold text-slate-900 uppercase">Fraud & AML Enforcement</h4>
                <div className="space-y-2">
                  <label className="flex items-center justify-between cursor-pointer">
                    <span>Enforce Mandatory Real-Time AML/KYC Sanctions Checks</span>
                    <input type="checkbox" defaultChecked />
                  </label>
                  <label className="flex items-center justify-between cursor-pointer">
                    <span>Activate AI Velocity Fraud Shield on High-Risk Transactions</span>
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
                <div className="w-10 h-10 rounded-xl bg-purple-600 flex items-center justify-center text-white font-bold shadow-md">
                  <Sparkles className="w-5 h-5 text-purple-100" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-white">JUMO Pay AI Assistant (PAY-31)</h3>
                  <p className="text-xs text-slate-300">Sovereign Payment AI & Treasury Clearing Copilot</p>
                </div>
              </div>
              <span className="text-xs font-mono px-2.5 py-1 bg-purple-950 text-purple-300 border border-purple-700 rounded-full font-bold">
                Clearing Status: 99.98%
              </span>
            </div>

            <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-slate-50">
              {chatMessages.map((msg, i) => (
                <div key={i} className={`flex flex-col max-w-[80%] ${msg.sender === 'user' ? 'ml-auto items-end' : 'mr-auto items-start'}`}>
                  <div className={`p-4 rounded-2xl text-xs leading-relaxed shadow-2xs ${
                    msg.sender === 'user' ? 'bg-purple-600 text-white rounded-br-none' : 'bg-white border border-slate-200 text-slate-800 rounded-bl-none'
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
                placeholder="Ask JUMO Pay AI about gateway routing, M-Pesa fees, Visa 3DS2 rates, or clearing velocity..."
                className="flex-1 p-2.5 rounded-xl border border-slate-300 text-xs focus:outline-none focus:border-purple-600"
              />
              <button onClick={handleSendMessage} className="px-5 py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs rounded-xl transition flex items-center gap-1.5 shadow-sm">
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
          <span className="text-purple-400 font-bold flex items-center gap-1">
            <CreditCard className="w-3.5 h-3.5" /> DIGITAL PAY v1.0 GLOBAL SWITCH
          </span>
          <span className="text-slate-600">|</span>
          <span className="text-slate-300">50 Payment Modules Operational</span>
          <span className="text-slate-600">|</span>
          <span className="text-emerald-400 font-bold">1.5% Treasury Fee Clearing Active</span>
        </div>
        <div className="flex items-center gap-3 text-slate-400">
          <span>99.98% Success Rate</span>
          <span>Ring-0 Authority</span>
        </div>
      </footer>
    </div>
  );
};

export default DigitalPayPlatform;
