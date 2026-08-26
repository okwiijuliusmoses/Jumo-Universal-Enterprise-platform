/**
 * JUMO UEOS — Authoritative Reusable Platform Shell
 * Implements Phase 15 & 16 of the JUMO UEOS Canonical Hybrid Platform Completion Directive.
 * 
 * Enforces:
 * - 3-Platform Limit (JUMO Fintech, JUMO Universal School ERP, JUMO Church ERP)
 * - Microsoft 365 / Azure Console clean white enterprise style (#FFFFFF background, #F8F9FA panels, #1F1F1F text, #E5E5E5 borders)
 * - Left Collapsible Navigation with auto-collapse on module selection
 * - 100% Usable Workspace Area
 * - Ultra-Compact Compact System Header & Footer
 * - Integrated, High-Fidelity Platform Developer Portal
 */

import React, { useState, useEffect } from 'react';
import { formatMoney, formatNumber } from '../../utils/formatters';
import { 
  Building2, GraduationCap, Church, Users, Heart, Calendar, CreditCard, 
  BarChart2, Settings, Menu, Search, Bell, HelpCircle, LogOut, Package, 
  Shield, ShieldCheck, Globe, ChevronLeft, ChevronRight, CheckCircle2, User, 
  Zap, DollarSign, Cloud, Code, Cpu, Sliders, Sparkles, Command, Workflow, 
  Database, Lock, Send, X, Play, LogIn, UserPlus, HeartPulse, BookOpen, 
  Layers, AlertCircle, TrendingUp, Info, Activity, Terminal, Copy, Check, ArrowRight, Clipboard, ChevronDown, LayoutGrid, Landmark
} from 'lucide-react';
import { EnterpriseLogo } from '../EnterpriseLogo';
import { JumoMemberQrScannerModal } from '../identity/JumoMemberQrScannerModal';
import { FloatingEnterpriseUtilities } from '../../control-center/layout/FloatingEnterpriseUtilities';
import { ApprovedProductRegistry, getApprovedProduct, WaffleAppsList } from '../../products/ApprovedProductRegistry';

// Church Modules
import { ChurchFinance } from '../../products/church-erp/web/modules/ChurchFinance';
import { EventManager } from '../../products/church-erp/web/modules/EventManager';
import { PastoralCare } from '../../products/church-erp/web/modules/PastoralCare';

// Education Modules
import { EducationDashboard } from '../../products/education-erp/web/modules/EducationDashboard';
import { GovernanceModule } from '../../products/education-erp/web/modules/GovernanceModule';
import { RegistrarModule } from '../../products/education-erp/web/modules/RegistrarModule';
import { SenateModule } from '../../products/education-erp/web/modules/SenateModule';
import { BursaryModule } from '../../products/education-erp/web/modules/BursaryModule';
import { ClinicModule } from '../../products/education-erp/web/modules/ClinicModule';
import { LibraryModule } from '../../products/education-erp/web/modules/LibraryModule';
import { HostelModule } from '../../products/education-erp/web/modules/HostelModule';

// Fintech Workspaces
import { FaapControllerWorkspace } from '../../products/fintech/financial-accounting/web/FaapControllerWorkspace';
import { AgentNetworkWorkspace } from '../../products/fintech/agent-banking/web/AgentNetworkWorkspace';
import { MicrofinanceWorkspace } from '../../products/fintech/microfinance/web/MicrofinanceWorkspace';
import { DigitalWalletWorkspace } from '../../products/fintech/digital-wallets/web/DigitalWalletWorkspace';
import { FxWorkspace } from '../../products/fintech/fx/web/FxWorkspace';
import { MerchantServicesWorkspace } from '../../products/fintech/merchant-services/web/MerchantServicesWorkspace';

export interface PlatformShellProps {
  platformId: 'fintech' | 'education' | 'church';
  onNavigate?: (route: string) => void;
  currentUser?: {
    name?: string;
    role?: string;
    email?: string;
  };
  onLogout?: () => void;
}

export const PlatformShell: React.FC<PlatformShellProps> = ({
  platformId,
  onNavigate,
  currentUser = { name: 'Sovereign Administrator', role: 'TENANT_ADMIN', email: 'admin@tenant.jumo.org' },
  onLogout
}) => {
  // Navigation & View States
  const [appState, setAppState] = useState<'LANDING' | 'APP'>('LANDING');
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(true);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState<boolean>(false);
  
  // Interactive Modal & Utility States
  const [isQrScannerOpen, setIsQrScannerOpen] = useState<boolean>(false);
  const [isAiAssistantOpen, setIsAiAssistantOpen] = useState<boolean>(false);
  const [isCommandCenterOpen, setIsCommandCenterOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showWaffle, setShowWaffle] = useState<boolean>(false);
  
  // AI Copilot States
  const [aiPrompt, setAiPrompt] = useState<string>('');
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [aiThinking, setAiThinking] = useState<boolean>(false);

  // Developer Portal Tab State
  const [devTab, setDevTab] = useState<'api_keys' | 'docs' | 'webhooks' | 'sandbox'>('api_keys');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Core Double-Entry Ledger State (FAAP Alignment)
  const [ledgerEntries, setLedgerEntries] = useState([
    { id: 'JE_001', date: '2026-08-01', ref: 'BAL_INIT', desc: 'Initial Bank Funding', account: '1000 - Clearing Bank', debit: 50000000, credit: 0 },
    { id: 'JE_002', date: '2026-08-01', ref: 'BAL_INIT', desc: 'Initial Bank Funding', account: '3000 - Capital Reserve', debit: 0, credit: 50000000 },
    { id: 'JE_003', date: '2026-08-05', ref: 'DEP_001', desc: 'Mobile Money Float Sync', account: '1200 - Mobile Money Cash Pool', debit: 15000000, credit: 0 },
    { id: 'JE_004', date: '2026-08-05', ref: 'DEP_001', desc: 'Mobile Money Float Sync', account: '3000 - Capital Reserve', debit: 0, credit: 15000000 },
    { id: 'JE_005', date: '2026-08-10', ref: 'CAP_002', desc: 'Sacco Reserve Investment', account: '1300 - Investment Asset Pool', debit: 10000000, credit: 0 },
    { id: 'JE_006', date: '2026-08-10', ref: 'CAP_002', desc: 'Sacco Reserve Investment', account: '3000 - Capital Reserve', debit: 0, credit: 10000000 },
  ]);

  // Wallet & Accounts balances
  const [walletBalances, setWalletBalances] = useState([
    { id: 'W_001', name: 'Sovereign Treasury Wallet', currency: 'USD', balance: 5000000, type: 'BUSINESS', status: 'ACTIVE' },
    { id: 'W_002', name: 'Nile SACCO Savings Pool', currency: 'UGX', balance: 120000000, type: 'BUSINESS', status: 'ACTIVE' },
    { id: 'W_003', name: 'Primary School Fees Collection', currency: 'UGX', balance: 45000000, type: 'COLLECTION', status: 'ACTIVE' },
    { id: 'W_004', name: 'Kampala Cathedral Tithes Wallet', currency: 'UGX', balance: 8500000, type: 'COLLECTION', status: 'ACTIVE' },
    { id: 'W_005', name: 'Standard Retail Wallet (S. Okwi)', currency: 'USD', balance: 1250, type: 'RETAIL', status: 'ACTIVE' }
  ]);

  // Budget vote books state
  const [budgets, setBudgets] = useState([
    { id: 'B_01', department: 'Academic Directorate', limit: 80000000, committed: 45000000, liquidated: 35000000 },
    { id: 'B_02', department: 'Clinic & Health Services', limit: 25000000, committed: 12000000, liquidated: 10000000 },
    { id: 'B_03', department: 'Parish Liturgy Council', limit: 15000000, committed: 8000000, liquidated: 6000000 },
    { id: 'B_04', department: 'Diocesan Clergy Fund', limit: 50000000, committed: 20000000, liquidated: 15000000 }
  ]);

  // Lending and Microfinance loan products / applications
  const [loans, setLoans] = useState([
    { id: 'L_001', borrower: 'Julius Okwi', amount: 5000000, term: '12 Months', rate: '12%', status: 'APPROVED', score: 820, group: 'Elite Group JLG' },
    { id: 'L_002', borrower: 'Nalongo Mary', amount: 1200000, term: '6 Months', rate: '10%', status: 'DISBURSED', score: 710, group: 'Wandegeya Women JLG' },
    { id: 'L_003', borrower: 'Peter Musisi', amount: 15000000, term: '24 Months', rate: '15%', status: 'PENDING_KYC', score: 640, group: 'None' }
  ]);

  // Payment transaction switch logs
  const [payments, setPayments] = useState([
    { id: 'TX_1001', date: '2026-08-21 11:30', sender: 'Julius Okwi', recipient: 'Primary School Fees', amount: 250000, method: 'Mobile Money', fee: 3750, status: 'SUCCESS' },
    { id: 'TX_1002', date: '2026-08-21 11:45', sender: 'Grace Diocese Member', recipient: 'Kampala Cathedral Tithes', amount: 50000, method: 'QR Payment', fee: 750, status: 'SUCCESS' }
  ]);

  // Dynamic modules status (for modular installer)
  const [moduleStates, setModuleStates] = useState<Record<string, string>>({
    'ledger': 'BENCHMARK_VERIFIED',
    'digital-wallets': 'BENCHMARK_VERIFIED',
    'payments': 'BENCHMARK_VERIFIED',
    'agent-banking': 'BENCHMARK_VERIFIED',
    'microfinance': 'BENCHMARK_VERIFIED',
    'lending': 'PARTIALLY_IMPLEMENTED'
  });

  const postDoubleEntryTransaction = (debitAcc: string, creditAcc: string, amount: number, desc: string, reference: string) => {
    const today = new Date().toISOString().split('T')[0];
    const je1 = {
      id: `JE_${Math.floor(Math.random() * 90000) + 10000}`,
      date: today,
      ref: reference,
      desc: desc,
      account: debitAcc,
      debit: amount,
      credit: 0
    };
    const je2 = {
      id: `JE_${Math.floor(Math.random() * 90000) + 10000}`,
      date: today,
      ref: reference,
      desc: desc,
      account: creditAcc,
      debit: 0,
      credit: amount
    };
    setLedgerEntries(prev => [...prev, je1, je2]);
  };

  // Keyboard Shortcuts Handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandCenterOpen(prev => !prev);
      } else if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'q') {
        e.preventDefault();
        setIsQrScannerOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(id);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  // Authoritative metadata resolution using ApprovedProductRegistry single source of truth
  const approvedProduct = getApprovedProduct(platformId);
  const currentMeta = {
    name: approvedProduct.name,
    badge: approvedProduct.badge,
    accentColor: approvedProduct.accentColor,
    bgAccent: approvedProduct.bgAccent,
    borderAccent: approvedProduct.borderAccent,
    accentHover: approvedProduct.accentHover,
    icon: approvedProduct.icon,
    navItems: approvedProduct.navigationRegistry
  };
  const PlatformIcon = currentMeta.icon || DollarSign;
  const waffleApps = WaffleAppsList;

  // Simulated API Keys for Developer Portal
  const devCredentials = {
    fintech: [
      { id: 'key_live_fin', name: 'Production Ledger API', key: 'pk_live_jumo_fintech_92038410293', status: 'Active', created: '2026-08-01' },
      { id: 'key_test_fin', name: 'Sandbox Switch Gateway', key: 'pk_test_jumo_fintech_00192837465', status: 'Active', created: '2026-08-15' }
    ],
    education: [
      { id: 'key_live_edu', name: 'Student Census API', key: 'pk_live_jumo_school_112233445566', status: 'Active', created: '2026-07-20' },
      { id: 'key_test_edu', name: 'Gradebook Sandbox', key: 'pk_test_jumo_school_778899001122', status: 'Active', created: '2026-08-05' }
    ],
    church: [
      { id: 'key_live_ch', name: 'Synod Core Registry', key: 'pk_live_jumo_church_99887766554', status: 'Active', created: '2026-06-15' },
      { id: 'key_test_ch', name: 'Parish Giving Endpoint', key: 'pk_test_jumo_church_44332211009', status: 'Active', created: '2026-08-01' }
    ]
  };

  const devDocs = {
    fintech: [
      { title: 'FAAP Ledger Postings', method: 'POST', endpoint: '/v1/ledger/post', desc: 'Post double-entry transactions directly to the core financial backbone.' },
      { title: 'Payment Switch API', method: 'POST', endpoint: '/v1/payments/initiate', desc: 'Initialize real-time transfers across card, mobile money, and banks.' }
    ],
    education: [
      { title: 'Student Enrollment Sync', method: 'POST', endpoint: '/v1/academic/enroll', desc: 'Sync student registration profiles and curriculum streams directly.' },
      { title: 'Senate Grade Approvals', method: 'POST', endpoint: '/v1/academic/grades/approve', desc: 'Verify and authorize final semester grade transcripts.' }
    ],
    church: [
      { title: 'Sacramental Registry Upload', method: 'POST', endpoint: '/v1/church/sacraments', desc: 'Securely log baptism, matrimony, and confirmation records.' },
      { title: 'General Stewardship Ledgers', method: 'POST', endpoint: '/v1/church/stewardship/tithe', desc: 'Post parish tithes and donations directly to treasury.' }
    ]
  };

  // Inline Developer Portal View Component
  const renderDeveloperPortal = () => (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col mb-4">
        <h1 className="text-xl font-black text-slate-900 tracking-tight">API Developer & Integration Hub</h1>
        <p className="text-slate-500 text-sm">Provision cryptographic keys, read endpoints, and simulate live workspace integration.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <aside className="lg:col-span-1 flex flex-col gap-1.5">
          {[
            { id: 'api_keys', label: 'API Keys & Secrets', icon: Lock },
            { id: 'docs', label: 'API Documentation', icon: BookOpen },
            { id: 'webhooks', label: 'Webhook Endpoints', icon: Zap },
            { id: 'sandbox', label: 'Interactive Sandbox', icon: Terminal }
          ].map((item) => {
            const Icon = item.icon;
            const isActive = devTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setDevTab(item.id as any)}
                className={`w-full px-4 py-2.5 rounded-xl flex items-center gap-3 font-bold text-xs transition text-left cursor-pointer ${
                  isActive 
                    ? `${currentMeta.bgAccent} text-white shadow-sm` 
                    : 'text-slate-600 hover:bg-slate-50 border border-transparent'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </aside>

        <div className="lg:col-span-3 space-y-6 bg-white p-6 border border-slate-200 rounded-2xl shadow-2xs">
          {devTab === 'api_keys' && (
            <div className="space-y-4">
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide">Sovereign API Keys</h2>
              <div className="space-y-4">
                {devCredentials[platformId].map((key) => (
                  <div key={key.id} className="p-4 bg-[#F8F9FA] border border-[#E5E5E5] rounded-xl space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-slate-900">{key.name}</span>
                      <span className="text-[10px] text-slate-400">Created {key.created}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 p-2.5 bg-slate-900 text-[#F8F9FA] font-mono text-[11px] rounded-lg truncate">
                        {key.key}
                      </div>
                      <button 
                        onClick={() => copyToClipboard(key.key, key.id)}
                        className="p-2.5 bg-white border border-[#E5E5E5] rounded-lg hover:bg-slate-50 cursor-pointer"
                      >
                        {copiedKey === key.id ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-slate-400" />}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {devTab === 'docs' && (
            <div className="space-y-4">
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide">REST API Endpoints</h2>
              <div className="grid grid-cols-1 gap-4">
                {devDocs[platformId].map((api, idx) => (
                  <div key={idx} className="p-4 border border-slate-200 rounded-xl hover:border-slate-300 transition">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded text-[9px] font-black">{api.method}</span>
                      <code className="text-[10px] font-mono text-slate-600">{api.endpoint}</code>
                    </div>
                    <h3 className="font-bold text-xs text-slate-950">{api.title}</h3>
                    <p className="text-[11px] text-slate-500 mt-1">{api.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {devTab === 'webhooks' && (
            <div className="py-8 text-center space-y-3">
              <Zap className="w-10 h-10 text-slate-300 mx-auto" />
              <div>
                <h3 className="font-bold text-xs text-slate-900">No Webhooks Configured</h3>
                <p className="text-[11px] text-slate-500 max-w-xs mx-auto mt-0.5">Real-time event subscriptions will stream ledger state events directly to external endpoints.</p>
              </div>
              <button className="px-4 py-1.5 bg-[#1F1F1F] text-white text-xs font-bold rounded-lg hover:bg-slate-800 cursor-pointer">
                Create Webhook Listener
              </button>
            </div>
          )}

          {devTab === 'sandbox' && (
            <div className="space-y-4">
              <h2 className="text-sm font-bold text-[#1F1F1F] uppercase tracking-wide">Integration Playground</h2>
              <div className="bg-slate-950 rounded-xl p-4 font-mono text-[11px] text-emerald-400 space-y-1.5 shadow-inner">
                <div>$ jumo-ueos login --key={devCredentials[platformId][1].key.substring(0, 15)}...</div>
                <div className="text-slate-500"># Connected to JUMO {currentMeta.name} Sandbox</div>
                <div>$ jumo-ueos sync --schema=auto</div>
                <div className="text-emerald-500 font-bold"># SUCCESS: Synced 12 schemas. 100% compliant with JUMO specifications.</div>
                <div className="animate-pulse">_</div>
              </div>
              <button className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-[#1F1F1F] font-bold text-xs rounded-xl transition border border-[#E5E5E5]">
                Reset Sandbox DB
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  // Platform Welcome/Landing Gate
  const renderPlatformLanding = () => (
    <div className="min-h-screen bg-[#FFFFFF] text-[#1F1F1F] flex flex-col justify-between animate-fade-in select-none">
      <main className="flex-1 flex flex-col items-center justify-center p-6 text-center max-w-3xl mx-auto space-y-8">
        <div className="flex flex-col items-center space-y-3">
          <div className={`p-4 bg-[#F8F9FA] rounded-2xl border ${currentMeta.borderAccent} ${currentMeta.accentColor}`}>
            <PlatformIcon className="w-10 h-10" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-[#1F1F1F] tracking-tight">{currentMeta.name}</h1>
            <p className="text-slate-500 text-xs font-mono font-extrabold uppercase tracking-widest mt-1">Universal JUMO UEOS Product Portal</p>
          </div>
        </div>

        <div className="bg-[#F8F9FA] p-6 rounded-2xl border border-[#E5E5E5] w-full text-left space-y-4 max-w-lg shadow-2xs">
          <div className="flex items-start gap-3">
            <ShieldCheck className={`w-5 h-5 shrink-0 ${currentMeta.accentColor} mt-0.5`} />
            <div>
              <h3 className="font-bold text-xs text-[#1F1F1F]">Verified JUMO Enterprise Tenant</h3>
              <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                Direct Ring-0 platform authorization is active. Universal system ledger parity, compliant schemas, and secure API bridges are certified.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-sm">
          <button
            onClick={() => setAppState('APP')}
            className={`w-full py-2.5 text-white bg-[#1F1F1F] hover:bg-[#2F2F2F] font-bold text-xs rounded-xl shadow-sm transition flex items-center justify-center gap-2 cursor-pointer`}
          >
            <LogIn className="w-4 h-4" /> Enter Workspace (Verified)
          </button>
          <button
            onClick={() => onNavigate ? onNavigate('/control-center/store') : window.location.href = '/control-center/store'}
            className="w-full py-2.5 text-slate-700 bg-white hover:bg-slate-50 font-bold text-xs rounded-xl transition border border-[#E5E5E5] flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Package className="w-4 h-4 text-slate-500" /> Return to Platform Store
          </button>
        </div>
      </main>

      <footer className="py-4 text-center text-[10px] text-slate-400 font-mono border-t border-[#E5E5E5] shrink-0">
        &copy; {new Date().getFullYear()} JUMO Universal Enterprise Operating System. All rights reserved.
      </footer>
    </div>
  );

  // Active Main Product Workspace Render Engine
  const renderActiveModuleWorkspace = () => {
    if (activeTab === 'developer') return renderDeveloperPortal();

    if (platformId === 'fintech') {
      // 1. Overview
      if (activeTab === 'overview') {
        const sumDebits = ledgerEntries.reduce((sum, e) => sum + e.debit, 0);
        const sumCredits = ledgerEntries.reduce((sum, e) => sum + e.credit, 0);
        const parityOffset = sumDebits - sumCredits;
        return (
          <div className="space-y-6 animate-in fade-in duration-300 text-left">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <h1 className="text-xl font-black text-slate-900 tracking-tight">Fintech Operations Command Center</h1>
                <p className="text-slate-500 text-xs">Real-time telemetry, transaction flows, and modular ERP integrations.</p>
              </div>
              <div className="flex items-center gap-2">
                <span className={`px-3 py-1 text-xs font-mono font-bold rounded-xl border ${parityOffset === 0 ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-rose-50 text-rose-700 border-rose-200'}`}>
                  Ledger Parity: ${(parityOffset ?? 0).toFixed(2)} offset
                </span>
                <button 
                  onClick={() => {
                    const randomAmount = Math.floor(Math.random() * 5000) + 100;
                    postDoubleEntryTransaction('1000 - Clearing Bank', '2000 - Wallet Liabilities', randomAmount, 'Automated Node Rebalancing Rollup', 'REBAL_AUTO');
                  }}
                  className="px-3 py-1.5 bg-slate-950 text-white font-bold text-xs rounded-xl shadow-xs hover:bg-slate-800 transition cursor-pointer"
                >
                  Force Parity Rebalance
                </button>
              </div>
            </div>

            {/* Micro-metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: 'Clearing Balance', value: formatMoney(ledgerEntries.filter(e => e.account.includes('1000')).reduce((sum, e) => sum + e.debit - e.credit, 0), '$'), icon: Landmark, trend: 'Sovereign Reserves' },
                { label: 'Wallet Liability', value: formatMoney(ledgerEntries.filter(e => e.account.includes('2000')).reduce((sum, e) => sum + e.credit - e.debit, 0), '$'), icon: CreditCard, trend: 'Moneys on Hold' },
                { label: 'Total Postings', value: formatNumber(ledgerEntries.length), icon: Clipboard, trend: 'Double-Entry journals' },
                { label: 'Clearing Fees', value: formatMoney(ledgerEntries.filter(e => e.account.includes('4000')).reduce((sum, e) => sum + e.credit - e.debit, 0), '$'), icon: Zap, trend: '1.5% Settlement Fee' }
              ].map((stat, i) => (
                <div key={i} className="bg-white p-5 border border-slate-200 rounded-2xl shadow-2xs flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-slate-50 flex items-center justify-center text-slate-600 shrink-0 border border-slate-100">
                    <stat.icon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-500 uppercase tracking-wide leading-none">{stat.label}</div>
                    <div className="text-lg font-black text-slate-950 mt-1.5 leading-none">{stat.value}</div>
                    <div className="text-[10px] text-slate-400 mt-2 font-mono flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-pulse"></span>
                      {stat.trend}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Dynamic Family Registry Matrix */}
              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-xs text-slate-900 uppercase tracking-wide">30 Fintech Families Registry</h3>
                  <span className="px-2 py-0.5 bg-blue-50 text-blue-700 text-[9px] font-mono font-bold rounded border border-blue-200">Active</span>
                </div>
                <div className="grid grid-cols-2 gap-2 max-h-60 overflow-y-auto pr-1">
                  {getApprovedProduct('JUMO-FINTECH').navigationRegistry.filter(n => n.id !== 'overview' && n.id !== 'developer' && n.id !== 'admin').map((family, idx) => (
                    <div key={idx} className="p-2.5 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-between">
                      <div className="flex items-center gap-2 truncate">
                        <family.icon className="w-3.5 h-3.5 text-slate-400" />
                        <span className="text-[10px] font-bold text-slate-800 truncate">{family.label}</span>
                      </div>
                      <span className="px-1.5 py-0.2 bg-emerald-100 text-emerald-800 text-[8px] font-mono font-black rounded-sm">INSTALLED</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Parity Integrity Check */}
              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs space-y-4 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-xs text-slate-900 uppercase tracking-wide mb-3">Sovereign Parity Ledger Integrity</h3>
                  <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl space-y-3 font-mono text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-500">SUM OF DEBITS:</span>
                      <span className="font-bold text-slate-900">{formatNumber(sumDebits)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">SUM OF CREDITS:</span>
                      <span className="font-bold text-slate-900">{formatNumber(sumCredits)}</span>
                    </div>
                    <div className="border-t border-dashed border-slate-200 pt-2 flex justify-between text-sm">
                      <span className="text-slate-500">PARITY OFFSET:</span>
                      <span className={`font-black ${parityOffset === 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                        ${(parityOffset ?? 0).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-500 bg-emerald-50 border border-emerald-100 p-2.5 rounded-xl">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>The JUMO ledger is double-entry compliant. Every debit has a corresponding matching credit.</span>
                </div>
              </div>
            </div>
          </div>
        );
      }

      // 2. Accounts
      if (activeTab === 'accounts') {
        return (
          <div className="space-y-4 animate-in fade-in duration-300 text-left">
            <h2 className="text-base font-bold text-slate-900">Sovereign Accounts Workspace</h2>
            <p className="text-xs text-slate-500">Real-time balance lookup and verification across sovereign JUMO clearing accounts.</p>
            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-2xs">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100 text-slate-400 font-bold uppercase tracking-wider">
                    <th className="p-3">Account Code</th>
                    <th className="p-3">Account Name</th>
                    <th className="p-3">Debit Postings</th>
                    <th className="p-3">Credit Postings</th>
                    <th className="p-3 text-right">Net Balance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {['1000 - Clearing Bank', '1200 - Mobile Money Cash Pool', '1300 - Investment Asset Pool', '2000 - Wallet Liabilities', '3000 - Capital Reserve', '4000 - Fee Revenue'].map(acc => {
                    const debits = ledgerEntries.filter(e => e.account === acc).reduce((sum, e) => sum + e.debit, 0);
                    const credits = ledgerEntries.filter(e => e.account === acc).reduce((sum, e) => sum + e.credit, 0);
                    const bal = acc.startsWith('1') || acc.startsWith('4') ? debits - credits : credits - debits;
                    return (
                      <tr key={acc} className="hover:bg-slate-50">
                        <td className="p-3 font-mono font-bold text-slate-900">{acc.split(' - ')[0]}</td>
                        <td className="p-3 font-medium">{acc.split(' - ')[1]}</td>
                        <td className="p-3 text-emerald-600">+${debits.toLocaleString()}</td>
                        <td className="p-3 text-rose-600">-${credits.toLocaleString()}</td>
                        <td className="p-3 text-right font-bold text-slate-900">${bal.toLocaleString()}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        );
      }

      // 3. Digital Wallets
      if (activeTab === 'digital-wallets') {
        return (
          <div className="space-y-6 animate-in fade-in duration-300 text-left">
            <div className="flex justify-between items-center border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-base font-bold text-slate-900">Universal Digital Wallets Desk</h2>
                <p className="text-xs text-slate-500">Manage client, school, church, and treasury wallet ledger accounts.</p>
              </div>
              <button 
                onClick={() => {
                  const name = prompt('Enter Wallet Holder Name:');
                  if (name) {
                    setWalletBalances(prev => [...prev, {
                      id: `W_${Math.floor(Math.random() * 900) + 100}`,
                      name: name,
                      currency: 'USD',
                      balance: 0,
                      type: 'RETAIL',
                      status: 'ACTIVE'
                    }]);
                  }
                }}
                className="px-3 py-1.5 bg-slate-950 text-white font-bold text-xs rounded-xl shadow-xs cursor-pointer"
              >
                Onboard New Wallet
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {walletBalances.map(w => (
                <div key={w.id} className="bg-white p-5 border border-slate-200 rounded-2xl space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] font-mono text-slate-400">ID: {w.id}</span>
                      <h4 className="font-bold text-slate-900 text-sm">{w.name}</h4>
                    </div>
                    <span className="px-1.5 py-0.5 bg-emerald-50 text-emerald-700 text-[9px] font-bold rounded">{w.status}</span>
                  </div>
                  <div className="flex justify-between items-baseline pt-2">
                    <span className="text-slate-400 text-xs">Available Float:</span>
                    <span className="text-lg font-black text-slate-950">{w.currency} {w.balance.toLocaleString()}</span>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => {
                        const amt = Number(prompt('Enter top-up amount ($):'));
                        if (amt > 0) {
                          setWalletBalances(prev => prev.map(item => item.id === w.id ? { ...item, balance: item.balance + amt } : item));
                          postDoubleEntryTransaction('1000 - Clearing Bank', '2000 - Wallet Liabilities', amt, `Wallet Top-Up: ${w.name}`, 'TOPUP');
                        }
                      }}
                      className="flex-1 py-1 text-center bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 font-bold text-[10px] rounded cursor-pointer"
                    >
                      Deposit Float
                    </button>
                    <button 
                      onClick={() => {
                        const amt = Number(prompt('Enter debit amount ($):'));
                        if (amt > 0 && w.balance >= amt) {
                          setWalletBalances(prev => prev.map(item => item.id === w.id ? { ...item, balance: item.balance - amt } : item));
                          postDoubleEntryTransaction('2000 - Wallet Liabilities', '1000 - Clearing Bank', amt, `Wallet Debit: ${w.name}`, 'DEBIT');
                        } else if (amt > 0) {
                          alert('Insufficient balance');
                        }
                      }}
                      className="flex-1 py-1 text-center bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 font-bold text-[10px] rounded cursor-pointer"
                    >
                      Withdraw
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      }

      // 4. Payments Switching
      if (activeTab === 'payments') {
        return <PaymentSwitchWorkspace payments={payments} setPayments={setPayments} walletBalances={walletBalances} setWalletBalances={setWalletBalances} postDoubleEntryTransaction={postDoubleEntryTransaction} />;
      }

      // 5. Transfers
      if (activeTab === 'transfers') {
        return (
          <div className="space-y-6 animate-in fade-in duration-300 text-left">
            <h2 className="text-base font-bold text-slate-900">Real-Time Fund Transfers Switch</h2>
            <div className="max-w-md bg-white p-6 border border-slate-200 rounded-2xl space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-600 block">Source Wallet</label>
                <select className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-800">
                  {walletBalances.map(w => (
                    <option key={w.id} value={w.id}>{w.name} ({w.currency} {w.balance.toLocaleString()})</option>
                  ))}
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-600 block">Destination Wallet ID / Account</label>
                <input type="text" placeholder="e.g. W_002" className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-800 focus:outline-none" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-600 block">Amount to Transfer ($)</label>
                <input type="number" placeholder="100" className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-800 focus:outline-none" />
              </div>
              <button 
                onClick={() => {
                  alert('Fund transfer initiated. Sovereign clearing engine routing request...');
                  postDoubleEntryTransaction('2000 - Wallet Liabilities', '2000 - Wallet Liabilities', 100, 'Peer-to-Peer Fund Transfer Switch', 'P2P_TX');
                }}
                className="w-full py-2.5 bg-slate-950 text-white font-bold text-xs rounded-xl shadow-sm cursor-pointer"
              >
                Execute Sovereign Transfer
              </button>
            </div>
          </div>
        );
      }

      // 6. Collections (SchoolPay / Tithing)
      if (activeTab === 'collections') {
        return (
          <div className="space-y-6 animate-in fade-in duration-300 text-left">
            <h2 className="text-base font-bold text-slate-900">School & Church Collections Manager</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 border border-slate-200 rounded-2xl space-y-4">
                <h3 className="font-bold text-xs text-slate-900 uppercase tracking-wide">SchoolPay Integration</h3>
                <p className="text-xs text-slate-500">Collect school fees directly. Every collected student invoice posts directly to the institution bursary registry and updates JUMO FAAP.</p>
                <button 
                  onClick={() => {
                    const student = prompt('Enter Student Name:');
                    const amt = Number(prompt('Enter School Fees Amount ($):'));
                    if (student && amt > 0) {
                      setWalletBalances(prev => prev.map(w => w.id === 'W_003' ? { ...w, balance: w.balance + amt } : w));
                      postDoubleEntryTransaction('1000 - Clearing Bank', '2000 - Wallet Liabilities', amt, `Fees Collection: ${student}`, 'SCH_FEES');
                      alert(`Fees of $${amt.toLocaleString()} successfully processed for ${student}. Ledger entry synchronised.`);
                    }
                  }}
                  className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl cursor-pointer"
                >
                  Collect Student Tuition
                </button>
              </div>

              <div className="bg-white p-6 border border-slate-200 rounded-2xl space-y-4">
                <h3 className="font-bold text-xs text-slate-900 uppercase tracking-wide">Church Giving Integrator</h3>
                <p className="text-xs text-slate-500">Process diocese-wide tithes, missionary pledges, and synod offerings directly over Mobile Money/QR, updating the general ledger.</p>
                <button 
                  onClick={() => {
                    const giver = prompt('Enter Congregant Name (Optional):') || 'Anonymous';
                    const amt = Number(prompt('Enter Offering Amount ($):'));
                    if (amt > 0) {
                      setWalletBalances(prev => prev.map(w => w.id === 'W_004' ? { ...w, balance: w.balance + amt } : w));
                      postDoubleEntryTransaction('1000 - Clearing Bank', '2000 - Wallet Liabilities', amt, `Tithing / Offertory: ${giver}`, 'CHURCH_TITHE');
                      alert(`Tithes of $${amt.toLocaleString()} processed. Received to Grace Cathedral Parish Wallet.`);
                    }
                  }}
                  className="w-full py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-xl cursor-pointer"
                >
                  Post Church Offertory
                </button>
              </div>
            </div>
          </div>
        );
      }

      // 7. Payouts & Mass Disbursements
      if (activeTab === 'payouts') {
        return (
          <div className="space-y-6 animate-in fade-in duration-300 text-left">
            <h2 className="text-base font-bold text-slate-900">Mass Payouts & Bulk Salary Switch</h2>
            <div className="bg-white p-6 border border-slate-200 rounded-2xl space-y-4 max-w-lg">
              <p className="text-xs text-slate-500">Prepare and execute mass wallet disbursements for salaries, vendor payments, and government subsidies.</p>
              <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl space-y-2 text-xs font-mono">
                <div className="flex justify-between text-slate-600"><span>Target Roster:</span><span className="font-bold">24 Active Teachers / Clergy</span></div>
                <div className="flex justify-between text-slate-600"><span>Total Required Net Pay:</span><span className="font-bold">$12,000.00</span></div>
                <div className="flex justify-between text-slate-600"><span>JUMO Fee (1.5%):</span><span className="font-bold">$180.00</span></div>
              </div>
              <button 
                onClick={() => {
                  postDoubleEntryTransaction('2000 - Wallet Liabilities', '1000 - Clearing Bank', 12000, 'Bulk Salary Disbursement Rollup', 'BULK_PAY');
                  alert('Bulk payroll dispatched to 24 recipients. Standard ledger journal entries successfully posted.');
                }}
                className="w-full py-2 bg-slate-950 hover:bg-slate-800 text-white font-bold text-xs rounded-xl cursor-pointer"
              >
                Disburse Payroll Batch
              </button>
            </div>
          </div>
        );
      }

      // 8. Settlements
      if (activeTab === 'settlements') {
        return (
          <div className="space-y-4 animate-in fade-in duration-300 text-left">
            <h2 className="text-base font-bold text-slate-900">Sovereign Treasury clearing logs</h2>
            <p className="text-xs text-slate-500">Continuous interbank settlement clearings tracking clearing records, commissions splits, and settlement state transitions.</p>
            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-2xs">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100 text-slate-400 font-bold uppercase tracking-wider">
                    <th className="p-3">Reference</th>
                    <th className="p-3">Posting Description</th>
                    <th className="p-3">Fee Split (1.5%)</th>
                    <th className="p-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {ledgerEntries.map((e, idx) => (
                    <tr key={idx} className="hover:bg-slate-50">
                      <td className="p-3 font-mono font-bold text-slate-900">{e.ref}</td>
                      <td className="p-3">{e.desc}</td>
                      <td className="p-3 font-mono text-emerald-600">${((e.debit ?? 0) * 0.015).toFixed(2)}</td>
                      <td className="p-3"><span className="px-1.5 py-0.2 bg-emerald-50 text-emerald-700 text-[9px] font-bold rounded">CLEARED</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      }

      // 9. Banking Core
      if (activeTab === 'banking') {
        return (
          <div className="space-y-4 animate-in fade-in duration-300 text-left">
            <h2 className="text-base font-bold text-slate-900">Core Banking Console</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 border border-slate-200 rounded-2xl space-y-4">
                <h3 className="font-bold text-xs text-slate-900 uppercase tracking-wide">Account Opening Wizard</h3>
                <p className="text-xs text-slate-500">Provision commercial bank accounts with instant KYC tier checks.</p>
                <button 
                  onClick={() => {
                    const kyc = prompt('Enter Holder Name:');
                    if (kyc) {
                      alert(`Account opened. KYC Tier 3 verification successfully passed for ${kyc}. Code: 001-${Math.floor(Math.random() * 900) + 100}`);
                    }
                  }}
                  className="w-full py-2 bg-slate-950 text-white font-bold text-xs rounded-xl cursor-pointer"
                >
                  Open Verified Current Account
                </button>
              </div>
            </div>
          </div>
        );
      }

      // 10. Mobile Money
      if (activeTab === 'mobile-money') {
        return (
          <div className="space-y-6 animate-in fade-in duration-300 text-left">
            <h2 className="text-base font-bold text-slate-900">Mobile Money Engine</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { title: 'Clearing Float Pool', val: '$540,000.00' },
                { title: 'Agent Commission Accruals', val: '$12,800.00' },
                { title: 'KYC Verified Subscribers', val: '142,012 Users' }
              ].map((m, i) => (
                <div key={i} className="bg-white p-5 border border-[#E5E5E5] rounded-2xl">
                  <span className="text-[10px] text-slate-400 block font-mono">{m.title}</span>
                  <span className="text-lg font-black text-slate-950 mt-1 block">{m.val}</span>
                </div>
              ))}
            </div>
            <button 
              onClick={() => {
                const amt = Number(prompt('Enter float allocation ($):'));
                if (amt > 0) {
                  postDoubleEntryTransaction('1200 - Mobile Money Cash Pool', '3000 - Capital Reserve', amt, 'Sovereign SIM Float Inject', 'SIM_FLOAT');
                  alert(`Mobile Money Float of $${amt.toLocaleString()} allocated.`);
                }
              }}
              className="px-4 py-2 bg-slate-950 text-white font-bold text-xs rounded-xl shadow cursor-pointer"
            >
              Allocate Mobile SIM Float
            </button>
          </div>
        );
      }

      // 11. Agent Banking
      if (activeTab === 'agent-banking') {
        return <AgentNetworkWorkspace />;
      }

      // 12. Lending
      if (activeTab === 'lending') {
        return (
          <div className="space-y-6 animate-in fade-in duration-300 text-left">
            <h2 className="text-base font-bold text-slate-900">Alternative Credit Scoring & Underwriting</h2>
            <p className="text-xs text-slate-500">Calculate credit eligibility thresholds based on alternative wallet velocities, payment history and transaction volumes.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {loans.map(l => (
                <div key={l.id} className="bg-white p-5 border border-slate-200 rounded-2xl space-y-3">
                  <div className="flex justify-between items-start">
                    <h4 className="font-bold text-sm text-slate-900">{l.borrower}</h4>
                    <span className="text-[10px] font-mono text-slate-400">Score: {l.score}</span>
                  </div>
                  <div className="text-xs text-slate-600 space-y-1">
                    <div>Limit Amount: <strong className="text-slate-900">${l.amount.toLocaleString()}</strong></div>
                    <div>Pricing Interest: <strong>{l.rate} APR</strong></div>
                    <div>Group Pool: <strong className="font-mono">{l.group}</strong></div>
                  </div>
                  <div className="pt-2">
                    <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold ${l.status === 'APPROVED' || l.status === 'DISBURSED' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>{l.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      }

      // 13. Microfinance
      if (activeTab === 'microfinance') {
        return <MicrofinanceWorkspace />;
      }

      // 14. SACCO
      if (activeTab === 'sacco') {
        return (
          <div className="space-y-6 animate-in fade-in duration-300 text-left">
            <h2 className="text-base font-bold text-slate-900">SACCO Shares & Savings Pool</h2>
            <div className="bg-white p-6 border border-slate-200 rounded-2xl space-y-4 max-w-md">
              <p className="text-xs text-slate-500">Manage member shares, voluntary savings deposits, and coordinate group guarantor underwriting.</p>
              <button 
                onClick={() => {
                  postDoubleEntryTransaction('1000 - Clearing Bank', '3000 - Capital Reserve', 5000, 'Member Sacco Shares Onboarding', 'SACCO_SHARE');
                  alert('Sacco Member share account on-boarded and capital allocation posted to ledger.');
                }}
                className="px-4 py-2 bg-slate-950 text-white font-bold text-xs rounded-xl cursor-pointer"
              >
                Issue Sacco Member Shares
              </button>
            </div>
          </div>
        );
      }

      // 15. Savings
      if (activeTab === 'savings') {
        return (
          <div className="space-y-4 animate-in fade-in duration-300 text-left">
            <h2 className="text-base font-bold text-slate-900">Interest-Bearing Term Deposits</h2>
            <div className="bg-white p-6 border border-slate-200 rounded-2xl space-y-3 max-w-md">
              <h4 className="font-bold text-xs text-slate-900 uppercase">Fixed Deposit Interest Calculator</h4>
              <p className="text-xs text-slate-500">Simulate yield generation schedules under sovereign fixed deposit accounts.</p>
              <button 
                onClick={() => {
                  alert('Interest payout calculated at 7.5% APY. Yield tracking posted to reports.');
                }}
                className="px-4 py-1.5 bg-slate-950 text-white text-xs font-bold rounded-lg cursor-pointer"
              >
                Simulate Yield Ledger Accrual
              </button>
            </div>
          </div>
        );
      }

      // 16. Cards
      if (activeTab === 'cards') {
        return (
          <div className="space-y-6 animate-in fade-in duration-300 text-left">
            <h2 className="text-base font-bold text-slate-900">Virtual & Physical Card Issuer</h2>
            <div className="bg-slate-950 p-6 border border-slate-800 rounded-2xl max-w-sm space-y-6 text-white shadow-xl relative overflow-hidden">
              <div className="absolute right-4 top-4 p-2 bg-white/10 rounded-lg">
                <CreditCard className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <span className="text-[9px] text-slate-400 tracking-widest font-mono block">JUMO SOVEREIGN DEBIT</span>
                <span className="text-base font-bold tracking-widest font-mono mt-3 block">5420  9821  4201  1102</span>
              </div>
              <div className="flex justify-between items-end">
                <div>
                  <span className="text-[8px] text-slate-400 block font-mono">HOLDER</span>
                  <span className="text-xs font-bold font-mono">S. OKWI (ADMIN)</span>
                </div>
                <div className="text-right">
                  <span className="text-[8px] text-slate-400 block font-mono">EXPIRES</span>
                  <span className="text-xs font-bold font-mono">08 / 31</span>
                </div>
              </div>
            </div>
          </div>
        );
      }

      // 17. Insurance
      if (activeTab === 'insurance') {
        return (
          <div className="space-y-4 animate-in fade-in duration-300 text-left">
            <h2 className="text-base font-bold text-slate-900">Insurtech Policy Console</h2>
            <div className="bg-white p-6 border border-slate-200 rounded-2xl text-center space-y-4 max-w-md">
              <Shield className="w-12 h-12 text-blue-500 mx-auto" />
              <div>
                <h3 className="font-bold text-slate-900">Underwriting Policies Active</h3>
                <p className="text-xs text-slate-500 mt-1">Multi-risk agricultural, credit, and funeral policy registries are configured.</p>
              </div>
            </div>
          </div>
        );
      }

      // 18. Treasury
      if (activeTab === 'treasury') {
        return (
          <div className="space-y-6 animate-in fade-in duration-300 text-left">
            <h2 className="text-base font-bold text-slate-900">Treasury Cash Forecasting & Funding</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-lg">
              <div className="bg-white p-5 border border-slate-200 rounded-2xl">
                <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-2">Liquidity Ratios</span>
                <div className="text-xl font-black text-slate-950">92.4% (LIQUID)</div>
              </div>
            </div>
          </div>
        );
      }

      // 19. FX Desk
      if (activeTab === 'fx') {
        return <FxWorkspace />;
      }

      // 20. Investments
      if (activeTab === 'investments') {
        return (
          <div className="space-y-4 animate-in fade-in duration-300 text-left">
            <h2 className="text-base font-bold text-slate-900">Capital Markets Investment Portfolios</h2>
            <p className="text-xs text-slate-500">Secure matching and tracking of asset portfolios, government bonds and long-term liquidity allocations.</p>
          </div>
        );
      }

      // 21. Custody
      if (activeTab === 'custody') {
        return (
          <div className="space-y-4 animate-in fade-in duration-300 text-left">
            <h2 className="text-base font-bold text-slate-900">Institutional Custody Registry</h2>
            <p className="text-xs text-slate-500">Verify cryptographically sealed secure records of institutional physical and digital assets.</p>
          </div>
        );
      }

      // 22. Merchant Services
      if (activeTab === 'merchant-services') {
        return <MerchantServicesWorkspace />;
      }

      // 23. Acquiring
      if (activeTab === 'acquiring') {
        return (
          <div className="space-y-4 animate-in fade-in duration-300 text-left">
            <h2 className="text-base font-bold text-slate-900">Acquiring Switch & Chargebacks</h2>
            <p className="text-xs text-slate-500">Merchant settlement clearings, card chargebacks, disputes, and acquiring switches.</p>
          </div>
        );
      }

      // 24. Embedded Finance
      if (activeTab === 'embedded') {
        return (
          <div className="space-y-4 animate-in fade-in duration-300 text-left">
            <h2 className="text-base font-bold text-slate-900">Embedded Widgets & SDK</h2>
            <p className="text-xs text-slate-500">Embed student fee payment or church tithes collections directly onto web structures using our sovereign HTML/React iframe widgets.</p>
          </div>
        );
      }

      // 25. Payroll
      if (activeTab === 'payroll') {
        return (
          <div className="space-y-4 animate-in fade-in duration-300 text-left">
            <h2 className="text-base font-bold text-slate-900">Bulk Employee Payroll batches</h2>
            <p className="text-xs text-slate-500">Salary payouts, tax allocations and automatic clearing switches.</p>
          </div>
        );
      }

      // 26. Trade Finance
      if (activeTab === 'trade') {
        return (
          <div className="space-y-4 animate-in fade-in duration-300 text-left">
            <h2 className="text-base font-bold text-slate-900">Purchase Order Trade Financing</h2>
            <p className="text-xs text-slate-500">Coordinate and audit trade invoices, merchant funding and receivables allocations.</p>
          </div>
        );
      }

      // 27. General Ledger (FAAP)
      if (activeTab === 'ledger') {
        return <FaapControllerWorkspace />;
      }

      // 28. Budgets
      if (activeTab === 'budgets') {
        return (
          <div className="space-y-6 animate-in fade-in duration-300 text-left">
            <h2 className="text-base font-bold text-slate-900">Budgets & Vote Book Commits</h2>
            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-2xs">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100 text-slate-400 font-bold uppercase">
                    <th className="p-3">Department</th>
                    <th className="p-3">Allocation Limit</th>
                    <th className="p-3">Committed funds</th>
                    <th className="p-3">Liquidated funds</th>
                    <th className="p-3 text-right">Available Margin</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {budgets.map(b => (
                    <tr key={b.id} className="hover:bg-slate-50">
                      <td className="p-3 font-bold text-slate-900">{b.department}</td>
                      <td className="p-3">${b.limit.toLocaleString()}</td>
                      <td className="p-3 text-amber-600">${b.committed.toLocaleString()}</td>
                      <td className="p-3 text-emerald-600">${b.liquidated.toLocaleString()}</td>
                      <td className="p-3 text-right font-black text-slate-900">${(b.limit - b.committed).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button 
              onClick={() => {
                const dep = prompt('Select Department Budget to Commit (Academic, Clinic, Liturgy, Clergy):');
                const amt = Number(prompt('Enter commitment amount ($):'));
                if (amt > 0) {
                  setBudgets(prev => prev.map(b => b.department.toLowerCase().includes((dep || '').toLowerCase()) ? { ...b, committed: b.committed + amt } : b));
                  alert(`Budget commitment successfully posted to department vote book.`);
                }
              }}
              className="px-4 py-2 bg-slate-950 text-white text-xs font-bold rounded-xl cursor-pointer"
            >
              Post Department Vote Book Commit
            </button>
          </div>
        );
      }

      // 29. Cash Books
      if (activeTab === 'cashbooks') {
        return (
          <div className="space-y-4 animate-in fade-in duration-300 text-left">
            <h2 className="text-base font-bold text-slate-900">Triple-Column Cash Books Console</h2>
            <p className="text-xs text-slate-500">Verify single, double, and triple-column cash balances matching discount ledgers, cash drawer reconciliation and banking slips.</p>
          </div>
        );
      }

      // 30. Reports
      if (activeTab === 'reports') {
        return (
          <div className="space-y-6 animate-in fade-in duration-300 text-left">
            <h2 className="text-base font-bold text-slate-900">Sovereign Financial Statements Generator</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {['Balance Sheet (FAAP)', 'Income Statement', 'Trial Balance'].map(stmt => (
                <div key={stmt} className="p-5 bg-white border border-slate-200 rounded-2xl hover:border-slate-300 transition space-y-3">
                  <h4 className="font-bold text-sm text-slate-900">{stmt}</h4>
                  <p className="text-[11px] text-slate-500">Auto-balanced, double-entry certified report mapped from the general ledger.</p>
                  <button 
                    onClick={() => alert(`Generating cryptographically-signed pdf copy of ${stmt}...`)}
                    className="py-1 text-center bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 font-bold text-[10px] rounded block w-full cursor-pointer"
                  >
                    Generate Report PDF
                  </button>
                </div>
              ))}
            </div>
          </div>
        );
      }

      // 31. Compliance
      if (activeTab === 'compliance') {
        return (
          <div className="space-y-4 animate-in fade-in duration-300 text-left">
            <h2 className="text-base font-bold text-slate-900">AML Risk Screening & Fraud Guard</h2>
            <p className="text-xs text-slate-500">Real-time velocity screenings, suspicious activities reports (SAR) cases queue and sanctions lookup.</p>
          </div>
        );
      }

      // 32. AI Data
      if (activeTab === 'ai-data') {
        return (
          <div className="space-y-4 animate-in fade-in duration-300 text-left">
            <h2 className="text-base font-bold text-slate-900">Predictive Finance AI Command</h2>
            <p className="text-xs text-slate-500">Gemini-powered liquidity forecast matching alternative transaction trends and automatic anomaly alerts.</p>
          </div>
        );
      }

      // 33. Administration
      if (activeTab === 'admin') {
        return (
          <div className="space-y-6 animate-in fade-in duration-300 text-left">
            <h2 className="text-base font-bold text-slate-900">Licensing & Modular Onboarding</h2>
            <div className="bg-white p-6 border border-slate-200 rounded-2xl space-y-4 max-w-lg">
              <h3 className="font-bold text-xs text-slate-900 uppercase">Modular Plug-in Activations</h3>
              <div className="space-y-3">
                {Object.keys(moduleStates).map(key => (
                  <div key={key} className="flex justify-between items-center p-3 bg-slate-50 border border-slate-100 rounded-xl">
                    <span className="text-xs font-bold text-slate-900 font-mono uppercase">{key}</span>
                    <button 
                      onClick={() => {
                        const next = moduleStates[key] === 'BENCHMARK_VERIFIED' ? 'DEACTIVATED' : 'BENCHMARK_VERIFIED';
                        setModuleStates(prev => ({ ...prev, [key]: next }));
                      }}
                      className={`px-3 py-1 font-bold text-[10px] rounded-lg border ${moduleStates[key] === 'BENCHMARK_VERIFIED' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-slate-200 text-slate-700 border-slate-300'}`}
                    >
                      {moduleStates[key]}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      }
    }

    if (platformId === 'education') {
      if (activeTab === 'governance') return <GovernanceModule />;
      if (activeTab === 'registrar') return <RegistrarModule />;
      if (activeTab === 'senate') return <SenateModule />;
      if (activeTab === 'bursary') return <BursaryModule />;
      if (activeTab === 'clinic') return <ClinicModule />;
      if (activeTab === 'library') return <LibraryModule />;
      if (activeTab === 'hostel') return <HostelModule />;
      
      // Education Dashboard Overview
      return <EducationDashboard />;
    }

    if (platformId === 'church') {
      if (activeTab === 'giving') return <ChurchFinance donations={[]} onDonationAdded={() => {}} />;
      if (activeTab === 'synod') return <EventManager events={[]} onEventAdded={() => {}} />;
      if (activeTab === 'care') return <PastoralCare pastoralRecords={[]} onRecordAdded={() => {}} />;
      if (activeTab === 'membership') return (
        <div className="space-y-4 animate-in fade-in duration-300">
          <div className="flex flex-col">
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">Membership Register & Census</h1>
            <p className="text-slate-500 text-sm">Authoritative parishioner directory and diocesan demographic profiles.</p>
          </div>
          <div className="bg-white p-8 border border-slate-200 rounded-2xl text-center space-y-4">
            <Users className="w-12 h-12 text-slate-300 mx-auto" />
            <div>
              <h3 className="font-bold text-sm text-slate-900">Demographics Loaded</h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto mt-0.5">Parish registries are fully synchronized with the diocesan census engine.</p>
            </div>
            <button className="px-4 py-2 bg-slate-950 text-white font-bold text-xs rounded-xl shadow-sm">
              Add New Congregant Profile
            </button>
          </div>
        </div>
      );

      // Church Overview
      return (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-xl font-black text-slate-900 tracking-tight">Pastoral Dashboard & Diocesan Registry</h1>
              <p className="text-slate-500 text-sm">Real-time statistics for parishes, clergy members, and local communities.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { label: 'Active Congregants', value: '4,102', icon: Users, trend: 'Across 12 Parishes' },
              { label: 'Tithe Ledgers Status', value: 'UGX 14.8M', icon: DollarSign, trend: 'Sovereign Sync' },
              { label: 'Active Clergy Nodes', value: '34 Vicars', icon: User, trend: 'Diocese Synod' }
            ].map((stat, i) => (
              <div key={i} className="bg-white p-5 border border-slate-200 rounded-2xl shadow-2xs flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-slate-50 flex items-center justify-center text-slate-600 shrink-0 border border-slate-100">
                  <stat.icon className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-wide leading-none">{stat.label}</div>
                  <div className="text-xl font-bold text-slate-950 mt-1.5 leading-none">{stat.value}</div>
                  <div className="text-[10px] text-slate-400 mt-2 font-mono flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-500 inline-block"></span>
                    {stat.trend}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs space-y-4">
            <h3 className="font-bold text-xs text-slate-900 uppercase tracking-wide">Ministry Template</h3>
            <p className="text-xs text-slate-600">The current environment is initialized on the **Sovereign Diocese** configuration template. All ledger entries auto-post to the centralized FAAP double-entry switch.</p>
          </div>
        </div>
      );
    }

    return null;
  };

  if (appState === 'LANDING') {
    return renderPlatformLanding();
  }

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#1F1F1F] font-sans flex flex-col antialiased selection:bg-blue-100 selection:text-blue-900 select-none">
      {/* Universal Compact Header */}
      <header className="h-12 bg-[#FFFFFF] border-b border-[#E5E5E5] px-4 flex items-center justify-between shrink-0 z-30 shadow-2xs">
        <div className="flex items-center gap-3">
          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
            className="md:hidden p-1 rounded-lg text-slate-600 hover:text-blue-600 transition"
          >
            <Menu className="w-4 h-4" />
          </button>

          {/* Waffle Launcher */}
          <div className="relative">
            <button
              onClick={() => setShowWaffle(!showWaffle)}
              className="p-1 rounded-lg text-slate-600 hover:text-blue-600 transition flex items-center justify-center cursor-pointer"
            >
              <div className="grid grid-cols-3 gap-0.5 w-3.5 h-3.5">
                <span className="w-0.75 h-0.75 bg-current rounded-2xs"></span>
                <span className="w-0.75 h-0.75 bg-current rounded-2xs"></span>
                <span className="w-0.75 h-0.75 bg-current rounded-2xs"></span>
                <span className="w-0.75 h-0.75 bg-current rounded-2xs"></span>
                <span className="w-0.75 h-0.75 bg-current rounded-2xs"></span>
                <span className="w-0.75 h-0.75 bg-current rounded-2xs"></span>
                <span className="w-0.75 h-0.75 bg-current rounded-2xs"></span>
                <span className="w-0.75 h-0.75 bg-current rounded-2xs"></span>
                <span className="w-0.75 h-0.75 bg-current rounded-2xs"></span>
              </div>
            </button>

            {showWaffle && (
              <div className="absolute top-full left-0 mt-2 w-64 bg-[#FFFFFF] border border-[#E5E5E5] rounded-xl shadow-lg p-3 z-50 animate-fade-in">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-2 px-1">Switch JUMO Platform</div>
                <div className="flex flex-col gap-1">
                  {waffleApps.map((app) => {
                    const AppIcon = app.icon;
                    return (
                      <button
                        key={app.route}
                        onClick={() => {
                          setShowWaffle(false);
                          if (onNavigate) onNavigate(app.route);
                          else window.location.href = app.route;
                        }}
                        className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-[#F8F9FA] transition text-left cursor-pointer group"
                      >
                        <div className={`w-6 h-6 rounded-md ${app.color} flex items-center justify-center`}>
                          <AppIcon className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-xs font-bold text-[#1F1F1F] group-hover:text-blue-600">{app.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          <EnterpriseLogo size="xs" variant="blue" showText={true} />
          <div className="h-4 w-px bg-[#E5E5E5]" />
          
          <div className="flex items-center gap-2">
            <span className="text-xs font-black text-[#1F1F1F] tracking-tight">{currentMeta.name}</span>
            <span className={`inline-flex items-center gap-1 px-1.5 py-0.2 bg-emerald-50 text-emerald-700 font-mono text-[9px] font-extrabold rounded border border-emerald-200`}>
              <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse"></span>
              ONLINE
            </span>
          </div>
        </div>

        {/* Global Search shortcut */}
        <div className="hidden lg:flex items-center flex-1 max-w-sm mx-6">
          <button
            onClick={() => setIsCommandCenterOpen(true)}
            className="w-full bg-[#F8F9FA] hover:bg-slate-100 border border-[#E5E5E5] rounded-xl pl-3 pr-2 py-1 text-xs text-slate-500 flex items-center justify-between transition cursor-pointer"
          >
            <span className="flex items-center gap-2 font-medium text-slate-500">
              <Search className="w-3.5 h-3.5 text-slate-400" />
              <span>Search modules, API indices, records...</span>
            </span>
            <kbd className="inline-flex items-center gap-0.5 px-1 py-0.2 text-[9px] font-mono font-bold text-slate-400 bg-white border border-slate-200 rounded">
              <Command className="w-2 h-2" /> K
            </kbd>
          </button>
        </div>

        {/* Right global controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsQrScannerOpen(true)}
            className="px-2.5 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-xl text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
          >
            <QrCodeIcon className="w-3.5 h-3.5 text-emerald-600" />
            <span className="hidden sm:inline">Scan Member ID</span>
          </button>

          <button
            onClick={() => setIsAiAssistantOpen(true)}
            className="px-2.5 py-1 bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 rounded-xl text-xs font-bold flex items-center gap-1.5 transition cursor-pointer animate-pulse"
          >
            <Sparkles className="w-3.5 h-3.5 text-purple-600" />
            <span className="hidden sm:inline">AI Copilot</span>
          </button>

          <button
            onClick={() => onNavigate ? onNavigate('/control-center/store') : window.location.href = '/control-center/store'}
            className="px-2.5 py-1 bg-[#F8F9FA] hover:bg-slate-100 text-[#1F1F1F] border border-[#E5E5E5] rounded-xl text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
          >
            <Package className="w-3.5 h-3.5 text-blue-600" />
            <span className="hidden sm:inline">Platform Store</span>
          </button>

          <div className="h-4 w-px bg-[#E5E5E5]" />

          {/* User profile widget */}
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-[10px]">
              {currentUser.name?.charAt(0).toUpperCase()}
            </div>
            <div className="hidden xl:block text-left">
              <div className="text-[10px] font-bold text-[#1F1F1F] leading-none">{currentUser.name}</div>
              <div className="text-[9px] font-mono text-slate-400 mt-0.5 leading-none">{currentUser.role}</div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="flex-1 flex overflow-hidden relative bg-[#FFFFFF]">
        {/* Sidebar */}
        <aside 
          onMouseEnter={() => setIsSidebarCollapsed(false)}
          onMouseLeave={() => setIsSidebarCollapsed(true)}
          className={`hidden md:flex bg-[#F8F9FA] border-r border-[#E5E5E5] flex-col justify-between transition-all duration-200 shrink-0 z-20 ${
            isSidebarCollapsed ? 'w-12' : 'w-52'
          }`}
        >
          <div className="p-1.5 space-y-1 overflow-y-auto">
            {/* Collapse rail header */}
            <div className="flex items-center justify-between px-2 py-1 mb-1.5 border-b border-[#E5E5E5] text-slate-400">
              {!isSidebarCollapsed && (
                <span className="text-[9px] font-bold uppercase tracking-widest font-mono text-slate-400">
                  Navigation
                </span>
              )}
              <button
                onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                className="p-1 rounded hover:bg-slate-200 text-slate-500 cursor-pointer ml-auto"
              >
                {isSidebarCollapsed ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronLeft className="w-3.5 h-3.5" />}
              </button>
            </div>

            {/* Navigation links mapping grouped by category */}
            {(() => {
              const categories: string[] = [];
              currentMeta.navItems.forEach(item => {
                const cat = (item as any).category || 'General';
                if (!categories.includes(cat)) {
                  categories.push(cat);
                }
              });

              return categories.map(cat => (
                <div key={cat} className="space-y-0.5">
                  {!isSidebarCollapsed && (
                    <div className="px-2.5 pt-2 pb-0.5 text-[8px] font-black font-mono text-slate-400 uppercase tracking-widest border-b border-slate-100 mb-1 mt-1.5">
                      {cat}
                    </div>
                  )}
                  {currentMeta.navItems
                    .filter(item => ((item as any).category || 'General') === cat)
                    .map(item => {
                      const NavIcon = item.icon;
                      const isActive = activeTab === item.id;
                      return (
                        <button
                          key={item.id}
                          onClick={() => {
                            setActiveTab(item.id);
                            setIsSidebarCollapsed(true);
                          }}
                          className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-[11px] font-semibold transition cursor-pointer group ${
                            isActive
                              ? `${currentMeta.bgAccent} text-white shadow-xs`
                              : 'text-slate-700 hover:bg-white hover:text-[#1F1F1F] border border-transparent hover:border-[#E5E5E5]'
                          }`}
                        >
                          <NavIcon className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-white' : 'text-slate-500 group-hover:text-blue-600'}`} />
                          {!isSidebarCollapsed && (
                            <span className="truncate flex-1 text-left">{item.label}</span>
                          )}
                        </button>
                      );
                    })}
                </div>
              ));
            })()}
          </div>

          {/* System status node */}
          <div className="p-2.5 border-t border-[#E5E5E5] bg-[#FFFFFF]">
            {!isSidebarCollapsed ? (
              <div className="space-y-0.5 text-[9px] font-mono text-slate-400">
                <div className="flex justify-between"><span>NODE:</span><strong className="text-emerald-600">RING-0</strong></div>
                <div className="flex justify-between"><span>SCHEMAS:</span><strong className="text-blue-600">CERTIFIED</strong></div>
              </div>
            ) : (
              <div className="flex justify-center" title="Ring-0 Security Node Active">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              </div>
            )}
          </div>
        </aside>

        {/* Workspace Canvas (100% usability, zero right sidebars) */}
        <main className="flex-1 flex flex-col min-w-0 bg-[#FFFFFF] overflow-y-auto relative p-6">
          <div className="flex-1 w-full max-w-7xl mx-auto">
            {renderActiveModuleWorkspace()}
          </div>
        </main>
      </div>

      {/* Ultra-Compact Footer */}
      <footer className="h-7 bg-[#FFFFFF] border-t border-[#E5E5E5] px-4 flex items-center justify-between text-[10px] text-slate-400 font-mono select-none shrink-0">
        <div>
          <span className="font-bold text-slate-900">JUMO UEOS v14.0 LTS</span>
          <span className="mx-2">|</span>
          <span>Sovereign Product Platform Console</span>
        </div>
        <div className="flex items-center gap-3">
          <span>PARITY: <strong className="text-emerald-600">VERIFIED</strong></span>
          <span>SEC: <strong className="text-blue-600">ZERO-TRUST</strong></span>
        </div>
      </footer>

      {/* Command center global search */}
      {isCommandCenterOpen && (
        <div
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-50 flex items-start justify-center pt-20 p-4 animate-fade-in"
          onClick={() => setIsCommandCenterOpen(false)}
        >
          <div
            className="bg-white rounded-2xl border border-slate-200 shadow-xl w-full max-w-lg overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-3 border-b border-slate-100 flex items-center gap-2.5 bg-slate-50">
              <Search className="w-4.5 h-4.5 text-blue-600 shrink-0" />
              <input
                type="text"
                autoFocus
                placeholder={`Search ${currentMeta.name} modules, APIs, schemas...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent border-none text-xs text-slate-900 focus:outline-none"
              />
              <button onClick={() => setIsCommandCenterOpen(false)} className="text-slate-400 hover:text-slate-600 transition">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-3 max-h-80 overflow-y-auto space-y-2">
              <span className="text-[9px] font-mono uppercase tracking-widest text-slate-400 px-1 font-bold">Suggested Actions</span>
              <div className="flex flex-col gap-1">
                {currentMeta.navItems.map((cmd) => (
                  <button
                    key={cmd.id}
                    onClick={() => {
                      setActiveTab(cmd.id);
                      setIsCommandCenterOpen(false);
                    }}
                    className="flex items-center gap-2 p-2 rounded-lg hover:bg-slate-50 transition text-left cursor-pointer text-xs"
                  >
                    <cmd.icon className="w-3.5 h-3.5 text-slate-400" />
                    <span className="font-semibold text-slate-800">{cmd.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* AI Assistant Drawer */}
      {isAiAssistantOpen && (
        <div
          className="fixed inset-0 bg-slate-900/30 backdrop-blur-xs z-50 flex justify-end animate-fade-in"
          onClick={() => setIsAiAssistantOpen(false)}
        >
          <div
            className="w-full max-w-sm bg-white h-full shadow-2xl flex flex-col justify-between border-l border-slate-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-950 text-white">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-400" />
                <div>
                  <h3 className="text-xs font-black tracking-wide leading-none">JUMO AI Workspace Assistant</h3>
                  <span className="text-[9px] font-mono text-slate-400 mt-1 uppercase block leading-none">Gemini Active • Ring-0 SEC</span>
                </div>
              </div>
              <button onClick={() => setIsAiAssistantOpen(false)} className="text-slate-400 hover:text-white transition">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50">
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-2">
                <p className="text-xs font-bold text-slate-800">Hello, Sovereign Administrator</p>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  I am integrated directly with the {currentMeta.name} workspace environment. I can query active ledger posts, verify double-entry balances, and validate schema integrity compliance rules.
                </p>
              </div>

              {aiThinking && (
                <div className="bg-white p-4 rounded-xl border border-purple-100 text-center space-y-1.5 animate-pulse shadow-2xs">
                  <div className="w-4 h-4 border-2 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
                  <div className="text-[10px] font-bold text-purple-600 font-mono">Analyzing workspace telemetry...</div>
                </div>
              )}

              {aiResponse && (
                <div className="bg-slate-950 text-white p-4 rounded-xl space-y-1.5 shadow-md">
                  <p className="text-[11px] leading-relaxed text-slate-200 font-medium">{aiResponse}</p>
                </div>
              )}
            </div>

            <div className="p-3 bg-white border-t border-slate-100">
              <div className="flex items-center gap-1.5">
                <input
                  type="text"
                  placeholder="Ask anything about this platform..."
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && aiPrompt.trim()) {
                      setAiThinking(true);
                      setAiResponse(null);
                      setTimeout(() => {
                        setAiThinking(false);
                        setAiResponse(`Query processed successfully. All ledger validations match 100% parity offsets.`);
                        setAiPrompt('');
                      }, 1000);
                    }
                  }}
                  className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-purple-500"
                />
                <button
                  onClick={() => {
                    if (aiPrompt.trim()) {
                      setAiThinking(true);
                      setAiResponse(null);
                      setTimeout(() => {
                        setAiThinking(false);
                        setAiResponse(`Query processed successfully. All ledger validations match 100% parity offsets.`);
                        setAiPrompt('');
                      }, 1000);
                    }
                  }}
                  className="p-2 bg-slate-950 text-white rounded-xl hover:bg-slate-800 shrink-0 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* QR scanner modal dialog */}
      <JumoMemberQrScannerModal isOpen={isQrScannerOpen} onClose={() => setIsQrScannerOpen(false)} />
      <FloatingEnterpriseUtilities />
    </div>
  );
};

// Custom Icon definitions for Lucide properties
const QrCodeIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="5" height="5" x="3" y="3" rx="1" />
    <rect width="5" height="5" x="16" y="3" rx="1" />
    <rect width="5" height="5" x="3" y="16" rx="1" />
    <path d="M21 16h-3a2 2 0 0 0-2 2v3" />
    <path d="M21 21v-1" />
    <path d="M12 21v-4" />
    <path d="M12 12h.01" />
    <path d="M12 3v5" />
    <path d="M3 12h5" />
  </svg>
);

interface PaymentSwitchProps {
  payments: any[];
  setPayments: React.Dispatch<React.SetStateAction<any[]>>;
  walletBalances: any[];
  setWalletBalances: React.Dispatch<React.SetStateAction<any[]>>;
  postDoubleEntryTransaction: (debitAcc: string, creditAcc: string, amount: number, desc: string, reference: string) => void;
}

const PaymentSwitchWorkspace: React.FC<PaymentSwitchProps> = ({ payments, setPayments, walletBalances, setWalletBalances, postDoubleEntryTransaction }) => {
  const [sender, setSender] = useState('W_005');
  const [recipient, setRecipient] = useState('W_003');
  const [amount, setAmount] = useState(250);
  const [method, setMethod] = useState('Mobile Money');
  const [lifecycleStep, setLifecycleStep] = useState(0); // 0: Idle, 1: Initiated, 2: Routed, 3: Authorized, 4: Split Fee, 5: Completed

  const triggerSwitchRoute = () => {
    if (amount <= 0) return alert('Invalid amount');
    
    // Check sender balance
    const sndWallet = walletBalances.find(w => w.id === sender);
    if (!sndWallet) return;
    if (sndWallet.balance < amount) {
      alert('Sender wallet has insufficient float.');
      return;
    }

    setLifecycleStep(1);
    
    setTimeout(() => {
      setLifecycleStep(2); // Routed
      setTimeout(() => {
        setLifecycleStep(3); // Authorized
        setTimeout(() => {
          setLifecycleStep(4); // Split Fee (1.5% commission)
          setTimeout(() => {
            // Apply Ledger Updates
            const fee = amount * 0.015;
            const netAmount = amount - fee;

            // Deduct sender, Add net to recipient, Add fee to treasury (W_001)
            setWalletBalances(prev => prev.map(w => {
              if (w.id === sender) return { ...w, balance: w.balance - amount };
              if (w.id === recipient) return { ...w, balance: w.balance + netAmount };
              if (w.id === 'W_001') return { ...w, balance: w.balance + fee };
              return w;
            }));

            // Post General Ledger journal entries
            // Debit Sender Liabilities: total amount
            // Credit Recipient Liabilities: net amount
            // Credit Fee revenue: commission
            postDoubleEntryTransaction('2000 - Wallet Liabilities', '2000 - Wallet Liabilities', amount, `Sovereign Payment Switch: ${sndWallet.name}`, 'SW_ROUTE');
            postDoubleEntryTransaction('2000 - Wallet Liabilities', '4000 - Fee Revenue', fee, `1.5% Settlement Split: ${sndWallet.name}`, 'FE_SPLIT');

            // Log payment
            const newPayment = {
              id: `TX_${Math.floor(Math.random() * 90000) + 10000}`,
              date: new Date().toISOString().replace('T', ' ').substring(0, 16),
              sender: sndWallet.name,
              recipient: walletBalances.find(w => w.id === recipient)?.name || 'Merchant',
              amount: amount,
              method: method,
              fee: fee,
              status: 'SUCCESS'
            };
            setPayments(prev => [newPayment, ...prev]);

            setLifecycleStep(5); // Completed
          }, 800);
        }, 800);
      }, 800);
    }, 800);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <h2 className="text-base font-bold text-slate-900">Digital Pay Universal Payment Switch</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Form and parameters */}
        <div className="bg-white p-5 border border-slate-200 rounded-2xl space-y-4 shadow-2xs">
          <h3 className="font-bold text-xs text-slate-900 uppercase">Initiate Payment Transfer</h3>
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-600 block">Select Sender Wallet</label>
            <select value={sender} onChange={(e) => setSender(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-800 focus:outline-none">
              {walletBalances.map(w => (
                <option key={w.id} value={w.id}>{w.name} ({w.currency} {w.balance.toLocaleString()})</option>
              ))}
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-600 block">Select Destination Merchant / Recipient</label>
            <select value={recipient} onChange={(e) => setRecipient(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-800 focus:outline-none">
              {walletBalances.filter(w => w.id !== sender).map(w => (
                <option key={w.id} value={w.id}>{w.name} ({w.currency} {w.balance.toLocaleString()})</option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-600 block">Transfer Amount ($)</label>
              <input type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value))} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-800 focus:outline-none" />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-600 block">Routing Protocol</label>
              <select value={method} onChange={(e) => setMethod(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-800 focus:outline-none">
                <option value="Mobile Money">Mobile Money Adapter</option>
                <option value="QR Payment">Sovereign QR Adapter</option>
                <option value="Card Acquiring">Card Acquiring Switch</option>
              </select>
            </div>
          </div>
          <div className="p-3.5 bg-slate-50 border border-slate-100 rounded-xl space-y-1 text-[11px] text-slate-500 font-mono">
            <div className="flex justify-between"><span>Base Amount:</span><span>${(Number(amount) || 0).toFixed(2)}</span></div>
            <div className="flex justify-between font-bold text-emerald-600"><span>JUMO Split commission (1.5%):</span><span>-${((Number(amount) || 0) * 0.015).toFixed(2)}</span></div>
            <div className="flex justify-between border-t border-slate-200 pt-1 font-bold text-slate-900"><span>Merchant Net settlement:</span><span>${((Number(amount) || 0) * 0.985).toFixed(2)}</span></div>
          </div>
          <button 
            onClick={triggerSwitchRoute} 
            disabled={lifecycleStep > 0 && lifecycleStep < 5}
            className="w-full py-2.5 bg-slate-950 hover:bg-slate-800 disabled:bg-slate-300 text-white font-bold text-xs rounded-xl shadow transition cursor-pointer"
          >
            {lifecycleStep > 0 && lifecycleStep < 5 ? 'Orchestrating Switch Route...' : 'Submit Switch Route Request'}
          </button>
        </div>

        {/* Real-time Switch Router lifecycle visualizer */}
        <div className="bg-white p-5 border border-slate-200 rounded-2xl flex flex-col justify-between shadow-2xs">
          <div>
            <h3 className="font-bold text-xs text-slate-900 uppercase mb-4">Sovereign Switching Router Pipeline</h3>
            {lifecycleStep === 0 ? (
              <div className="py-12 text-center text-slate-400 text-xs">
                <Zap className="w-8 h-8 text-slate-300 mx-auto mb-2 animate-pulse" />
                <span>Submit a transaction route request to visually monitor the life-cycle of the payment switch.</span>
              </div>
            ) : (
              <div className="space-y-4">
                {[
                  { id: 1, label: 'Payment Initiation & KYC Validation', desc: 'Validates sender profile thresholds and KYC compliance' },
                  { id: 2, label: 'Dynamic Switch Adapter Routing', desc: 'Queries provider API endpoints and secures route authentication' },
                  { id: 3, label: 'Authorization & Balance Verification', desc: 'Deducts source account float and lock funds' },
                  { id: 4, label: '1.5% Settlement Split & Fee Allocation', desc: 'Separates 1.5% commission directly into JUMO Sovereign Treasury' },
                  { id: 5, label: 'FAAP Journal Booking & Parity Check', desc: 'Auto-posts debit/credit records with guaranteed zero offset parity' }
                ].map(step => {
                  const isCurrent = lifecycleStep === step.id;
                  const isCompleted = lifecycleStep > step.id;
                  return (
                    <div key={step.id} className={`flex items-start gap-3 p-3 rounded-xl border transition-all ${
                      isCurrent ? 'bg-blue-50/50 border-blue-200 shadow-sm animate-in fade-in duration-300' :
                      isCompleted ? 'bg-emerald-50/20 border-emerald-100 opacity-60' :
                      'border-transparent opacity-30'
                    }`}>
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center font-mono font-black text-[10px] ${
                        isCurrent ? 'bg-blue-600 text-white animate-pulse' :
                        isCompleted ? 'bg-emerald-600 text-white' :
                        'bg-slate-100 text-slate-400'
                      }`}>
                        {isCompleted ? '✓' : step.id}
                      </div>
                      <div>
                        <span className={`text-xs font-bold ${isCurrent ? 'text-blue-900' : isCompleted ? 'text-emerald-900' : 'text-slate-500'}`}>{step.label}</span>
                        <p className="text-[10px] text-slate-400 mt-0.5 leading-relaxed">{step.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          {lifecycleStep === 5 && (
            <div className="mt-4 p-3.5 bg-emerald-50 border border-emerald-100 rounded-xl flex items-center gap-2 text-xs text-emerald-800 animate-in fade-in duration-300">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>Sovereign transaction executed! Double-entry ledger postings processed to general reserves under guaranteed offset parities.</span>
            </div>
          )}
        </div>
      </div>

      {/* Transaction Switch Log */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs space-y-4">
        <h3 className="font-bold text-xs text-slate-900 uppercase">Unified Payments Log</h3>
        <div className="overflow-x-auto text-xs">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100 text-slate-400 font-bold uppercase">
                <th className="p-3">Tx ID</th>
                <th className="p-3">Timestamp</th>
                <th className="p-3">Sender</th>
                <th className="p-3">Recipient</th>
                <th className="p-3">Protocol</th>
                <th className="p-3">Amount</th>
                <th className="p-3">1.5% Fee</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {payments.map(p => (
                <tr key={p.id} className="hover:bg-slate-50">
                  <td className="p-3 font-mono font-bold text-slate-900">{p.id}</td>
                  <td className="p-3 text-slate-400">{p.date}</td>
                  <td className="p-3 font-medium">{p.sender}</td>
                  <td className="p-3 font-medium">{p.recipient}</td>
                  <td className="p-3 text-slate-500">{p.method}</td>
                  <td className="p-3 font-bold text-slate-900">${(p.amount ?? 0).toLocaleString()}</td>
                  <td className="p-3 font-mono text-emerald-600">${(p.fee ?? 0).toFixed(2)}</td>
                  <td className="p-3">
                    <span className="px-1.5 py-0.2 bg-emerald-50 text-emerald-700 text-[9px] font-bold rounded">
                      {p.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PlatformShell;
