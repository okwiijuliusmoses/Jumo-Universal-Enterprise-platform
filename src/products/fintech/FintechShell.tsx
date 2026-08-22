import React, { useState, useMemo } from 'react';
import { 
  DollarSign, Landmark, CreditCard, Zap, ArrowRight, Clipboard, Send, CheckCircle2,
  TrendingUp, Layers, Building2, Globe, Lock, Sparkles, Settings, LayoutGrid,
  Search, Bell, HelpCircle, User, Shield, ShieldCheck, Code, ArrowLeft,
  ChevronDown, ChevronRight, Activity, Terminal, AlertCircle, RefreshCw,
  Package, Check, Filter, Cpu, Play, Download, Sliders, Smartphone,
  BarChart2, Receipt, ShoppingCart, Upload, FileText, Wallet, Users, PieChart,
  BookOpen, Eye, Plus, ArrowUpRight, ArrowDownRight, Award, ChevronLeft, Menu, X,
  BadgeAlert, Radio, Database, SlidersHorizontal, Home
} from 'lucide-react';
import { AppLauncherPopup } from '../../components/AppLauncherPopup';
import { FintechFamilyRegistry, FintechFamilyManifest, getFintechFamily, calculateFamilyCapabilityCoverage } from './registries/FintechFamilyRegistry';
import { FintechFamilyStore } from './FintechFamilyStore';
import { UniversalFintechFamilyWorkspace } from './UniversalFintechFamilyWorkspace';
import { FaapControllerWorkspace } from './financial-accounting/web/FaapControllerWorkspace';
import { AgentNetworkWorkspace } from './agent-banking/web/AgentNetworkWorkspace';
import { MicrofinanceWorkspace } from './microfinance/web/MicrofinanceWorkspace';
import { DigitalWalletWorkspace } from './digital-wallets/web/DigitalWalletWorkspace';
import { FxWorkspace } from './fx/web/FxWorkspace';
import { MerchantServicesWorkspace } from './merchant-services/web/MerchantServicesWorkspace';

// Integrated FAAP and Digital Pay Submodules
import { FaapDashboard } from '../faap/web/modules/FaapDashboard';
import { ChartOfAccounts } from '../faap/web/modules/ChartOfAccounts';
import { GeneralJournal } from '../faap/web/modules/GeneralJournal';
import { AccountsPayable } from '../faap/web/modules/AccountsPayable';
import { AccountsReceivable } from '../faap/web/modules/AccountsReceivable';
import { BankingModule } from '../faap/web/modules/BankingModule';
import { InstitutionalFinanceSuite } from '../faap/web/modules/InstitutionalFinanceSuite';

import { TransactionsModule } from '../digital-pay/web/modules/TransactionsModule';
import { MerchantsModule } from '../digital-pay/web/modules/MerchantsModule';
import { GatewayModule } from '../digital-pay/web/modules/GatewayModule';
import { RiskModule } from '../digital-pay/web/modules/RiskModule';

import { PlatformSwitcher } from '../../components/PlatformSwitcher';

// Safe Icon Resolver
const ICON_MAP: Record<string, React.ElementType> = {
  Scale: Landmark,
  Receipt: Receipt,
  Network: Zap,
  Smartphone: Smartphone,
  ShoppingCart: ShoppingCart,
  ArrowDownOnSquare: Download,
  ArrowUpOnSquare: Upload,
  BuildingLibrary: Landmark,
  PaperAirplane: Send,
  ArrowPath: RefreshCw,
  Storefront: Building2,
  CreditCard: CreditCard,
  Calculator: DollarSign,
  DocumentText: FileText,
  Wallet: Wallet,
  Globe: Globe,
  GlobeAlt: Globe,
  Users: Users,
  BuildingStorefront: Landmark,
  Banknotes: DollarSign,
  Briefcase: Layers,
  ChartBar: TrendingUp,
  UserGroup: Users,
  PuzzlePiece: Package,
  Sprout: Layers,
  ChartPie: PieChart,
  CurrencyExchange: Globe,
  TrendingUp: TrendingUp,
  Lock: Lock,
  ShieldCheck: ShieldCheck,
  ClipboardCheck: Clipboard,
  CubeTransparent: Package,
  Monitor: LayoutGrid,
  CommandLine: Code,
  MagnifyingGlass: Search,
  Sparkles: Sparkles,
};

function getSafeIcon(iconName?: string): React.ElementType {
  if (!iconName) return DollarSign;
  return ICON_MAP[iconName] || DollarSign;
}

interface FintechShellProps {
  onNavigate?: (route: string) => void;
  currentUser?: {
    name?: string;
    role?: string;
    email?: string;
  };
  onLogout?: () => void;
}

export const FintechShell: React.FC<FintechShellProps> = ({
  onNavigate,
  currentUser = { name: 'Julius Moses Okwii', role: 'CHIEF FINANCIAL OFFICER', email: 'okwiijuliusmoses@gmail.com' },
  onLogout
}) => {
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [selectedFamilyId, setSelectedFamilyId] = useState<string | null>(null);
  const [faapSubTab, setFaapSubTab] = useState<string>('controller');
  const [dpSubTab, setDpSubTab] = useState<string>('switch');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const [isAiModalOpen, setIsAiModalOpen] = useState<boolean>(false);
  const [aiContext, setAiContext] = useState<string>('FINTECH_GLOBAL');
  const [aiPrompt, setAiPrompt] = useState<string>('');
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [aiThinking, setAiThinking] = useState<boolean>(false);

  const [installedFamilyIds, setInstalledFamilyIds] = useState<string[]>([
    'FAM_LEDGER',
    'FAM_TAX_REVENUE',
    'FAM_PAY_SWITCH',
    'FAM_MOBILE_MONEY',
    'FAM_PAYMENT_GATEWAY',
    'FAM_COLLECTIONS',
    'FAM_PAYOUTS',
    'FAM_DIGITAL_WALLETS',
    'FAM_AGENT_BANKING',
    'FAM_DIGITAL_BANKING',
    'FAM_MICROFINANCE',
    'FAM_LENDING',
    'FAM_SACCO',
    'FAM_FX',
    'FAM_TREASURY',
    'FAM_DEVELOPER_API',
    'FAM_COMPLIANCE',
    'FAM_DATA_INTELLIGENCE'
  ]);

  const toggleInstallFamily = (familyId: string) => {
    setInstalledFamilyIds(prev => 
      prev.includes(familyId) ? prev.filter(id => id !== familyId) : [...prev, familyId]
    );
  };

  const handleRunAiAudit = () => {
    if (!aiPrompt.trim()) return;
    setAiThinking(true);
    setTimeout(() => {
      setAiThinking(false);
      setAiResponse(`JUMO AI Contextual Financial Intelligence (${aiContext}):
• Double-Entry Parity Certified: Debits $54,210,000.00 = Credits $54,210,000.00 (Net $0.00 offset).
• Switching Rail Latency: MTN MoMo (180ms), M-Pesa (210ms), Airtel (190ms), Visa Direct (320ms).
• Compliance & Sanctions Clearance: 0 high-risk anomalies detected across 42,910 automated batch screens.`);
    }, 850);
  };

  const openContextualAi = (contextName: string) => {
    setAiContext(contextName);
    setAiPrompt(`Provide contextual AI analysis for ${contextName} ledger parity and settlement velocity...`);
    setIsAiModalOpen(true);
  };

  const handleSelectFamily = (familyId: string) => {
    setSelectedFamilyId(familyId);
    setActiveTab('family_workspace');
  };

  // Grouped Navigation Categories from Registry
  const groupedFamilies = useMemo(() => {
    const groups: Record<string, { label: string; items: FintechFamilyManifest[] }> = {
      CORE: { label: 'FINANCIAL CORE', items: [] },
      PAYMENTS: { label: 'PAYMENTS', items: [] },
      BANKING: { label: 'BANKING', items: [] },
      CREDIT: { label: 'CREDIT', items: [] },
      MARKETS: { label: 'MARKETS', items: [] },
      PROTECTION: { label: 'PROTECTION', items: [] },
      CROSS_BORDER: { label: 'CROSS-BORDER', items: [] },
      INTELLIGENCE: { label: 'INTELLIGENCE', items: [] },
      PLATFORM: { label: 'PLATFORM', items: [] }
    };

    FintechFamilyRegistry.forEach(fam => {
      const cat = fam.category.toUpperCase();
      if (fam.id === 'FAM_LEDGER' || fam.id === 'FAM_TAX_REVENUE' || fam.id === 'FAM_PAYROLL' || fam.id === 'FAM_TREASURY') {
        groups.CORE.items.push(fam);
      } else if (cat.includes('PAYMENT') || cat.includes('CARD') || fam.id === 'FAM_PAY_SWITCH' || fam.id === 'FAM_PAYMENT_GATEWAY' || fam.id === 'FAM_COLLECTIONS' || fam.id === 'FAM_PAYOUTS' || fam.id === 'FAM_CARDS' || fam.id === 'FAM_MERCHANT_ACQUIRING' || fam.id === 'FAM_MERCHANT_SERVICES' || fam.id === 'FAM_BILLS' || fam.id === 'FAM_STABLECOIN') {
        groups.PAYMENTS.items.push(fam);
      } else if (fam.id === 'FAM_DIGITAL_BANKING' || fam.id === 'FAM_MOBILE_MONEY' || fam.id === 'FAM_AGENT_BANKING' || fam.id === 'FAM_DIGITAL_WALLETS' || fam.id === 'FAM_GLOBAL_ACCOUNTS' || fam.id === 'FAM_MULTI_CURRENCY' || fam.id === 'FAM_SAVINGS') {
        groups.BANKING.items.push(fam);
      } else if (fam.id === 'FAM_LENDING' || fam.id === 'FAM_MICROFINANCE' || fam.id === 'FAM_SACCO' || fam.id === 'FAM_AGRICULTURAL_FINANCE' || fam.id === 'FAM_EMBEDDED_FINANCE') {
        groups.CREDIT.items.push(fam);
      } else if (fam.id === 'FAM_INVESTMENT' || fam.id === 'FAM_SECURITIES_CUSTODY' || fam.id === 'FAM_CAPITAL_MARKETS' || fam.id === 'FAM_FX' || fam.id === 'FAM_TRADE_FINANCE') {
        groups.MARKETS.items.push(fam);
      } else if (fam.id === 'FAM_INSURANCE' || fam.id === 'FAM_COMPLIANCE' || cat.includes('RISK')) {
        groups.PROTECTION.items.push(fam);
      } else if (fam.id === 'FAM_REMITTANCES' || fam.id === 'FAM_CROSS_BORDER') {
        groups.CROSS_BORDER.items.push(fam);
      } else if (fam.id === 'FAM_DATA_INTELLIGENCE') {
        groups.INTELLIGENCE.items.push(fam);
      } else {
        groups.PLATFORM.items.push(fam);
      }
    });

    return groups;
  }, []);

  // Filtered families by search
  const filteredFamilies = useMemo(() => {
    if (!searchQuery.trim()) return FintechFamilyRegistry;
    const q = searchQuery.toLowerCase();
    return FintechFamilyRegistry.filter(f => 
      f.name.toLowerCase().includes(q) ||
      f.shortName.toLowerCase().includes(q) ||
      f.code.toLowerCase().includes(q) ||
      f.category.toLowerCase().includes(q) ||
      f.description.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  // Render workspace content
  const renderWorkspace = () => {
    if (activeTab === 'family_workspace' && selectedFamilyId) {
      const family = getFintechFamily(selectedFamilyId);
      
      // 1. FAAP General Ledger Suite
      if (selectedFamilyId === 'FAM_LEDGER') {
        return (
          <div className="p-6 max-w-7xl mx-auto space-y-6 animate-in fade-in duration-150">
            {/* Breadcrumb Context */}
            <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
              <span className="cursor-pointer hover:text-slate-900" onClick={() => { setSelectedFamilyId(null); setActiveTab('overview'); }}>FINTECH</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
              <span>FINANCIAL CORE</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
              <span className="text-emerald-700 font-bold">Financial Accounting & General Ledger (FAAP)</span>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                  <Landmark className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold text-slate-400">FT-ACC-01</span>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      FAAP CORE LEDGER
                    </span>
                  </div>
                  <h1 className="text-2xl font-black text-slate-900 tracking-tight">
                    Financial Accounting & General Ledger
                  </h1>
                </div>
              </div>

              {/* Sub-tab Navigation */}
              <div className="flex items-center gap-1.5 overflow-x-auto bg-slate-100 p-1.5 rounded-xl border border-slate-200">
                {[
                  { id: 'controller', label: 'Parity Controller' },
                  { id: 'dashboard', label: 'Dashboard' },
                  { id: 'coa', label: 'Chart of Accounts' },
                  { id: 'journal', label: 'General Journal' },
                  { id: 'ap', label: 'Accounts Payable' },
                  { id: 'ar', label: 'Accounts Receivable' },
                  { id: 'banking', label: 'Banking' },
                  { id: 'suite', label: 'Institutional Suite' }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setFaapSubTab(tab.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                      faapSubTab === tab.id
                        ? 'bg-white text-emerald-700 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Sub-module View */}
            <div>
              {faapSubTab === 'controller' && <FaapControllerWorkspace />}
              {faapSubTab === 'dashboard' && <FaapDashboard />}
              {faapSubTab === 'coa' && <ChartOfAccounts />}
              {faapSubTab === 'journal' && <GeneralJournal />}
              {faapSubTab === 'ap' && <AccountsPayable />}
              {faapSubTab === 'ar' && <AccountsReceivable />}
              {faapSubTab === 'banking' && <BankingModule />}
              {faapSubTab === 'suite' && <InstitutionalFinanceSuite />}
            </div>
          </div>
        );
      }

      // 2. Universal Payment Switching & Digital Pay Suite
      if (selectedFamilyId === 'FAM_PAY_SWITCH' || selectedFamilyId === 'FAM_PAYMENT_GATEWAY' || selectedFamilyId === 'FAM_COLLECTIONS') {
        return (
          <div className="p-6 max-w-7xl mx-auto space-y-6 animate-in fade-in duration-150">
            {/* Breadcrumb Context */}
            <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
              <span className="cursor-pointer hover:text-slate-900" onClick={() => { setSelectedFamilyId(null); setActiveTab('overview'); }}>FINTECH</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
              <span>PAYMENTS</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
              <span className="text-indigo-700 font-bold">{family.name}</span>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
                  <Zap className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold text-slate-400">{family.code}</span>
                    <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                      UNIVERSAL PAYMENT SWITCH
                    </span>
                  </div>
                  <h1 className="text-2xl font-black text-slate-900 tracking-tight">
                    {family.name}
                  </h1>
                </div>
              </div>

              {/* Sub-tab Navigation */}
              <div className="flex items-center gap-1.5 overflow-x-auto bg-slate-100 p-1.5 rounded-xl border border-slate-200">
                {[
                  { id: 'switch', label: 'Switch Matrix' },
                  { id: 'txns', label: 'Transactions' },
                  { id: 'merchants', label: 'Merchants' },
                  { id: 'gateway', label: 'Gateway Config' },
                  { id: 'risk', label: 'Risk Shield' },
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setDpSubTab(tab.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                      dpSubTab === tab.id
                        ? 'bg-white text-indigo-700 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Sub-module View */}
            <div>
              {dpSubTab === 'switch' && (
                <UniversalFintechFamilyWorkspace 
                  family={family} 
                  onBack={() => {
                    setSelectedFamilyId(null);
                    setActiveTab('overview');
                  }} 
                />
              )}
              {dpSubTab === 'txns' && <TransactionsModule transactions={[]} />}
              {dpSubTab === 'merchants' && <MerchantsModule merchants={[]} />}
              {dpSubTab === 'gateway' && <GatewayModule />}
              {dpSubTab === 'risk' && <RiskModule />}
            </div>
          </div>
        );
      }

      // 3. Agent Banking Network
      if (selectedFamilyId === 'FAM_AGENT_BANKING') {
        return <AgentNetworkWorkspace />;
      }

      // 4. Microfinance & JLG Lending
      if (selectedFamilyId === 'FAM_MICROFINANCE') {
        return <MicrofinanceWorkspace />;
      }

      // 5. Digital Wallets
      if (selectedFamilyId === 'FAM_DIGITAL_WALLETS') {
        return <DigitalWalletWorkspace />;
      }

      // 6. FX & Dealing Desk
      if (selectedFamilyId === 'FAM_FX') {
        return <FxWorkspace />;
      }

      // 7. Merchant Services & Dynamic QR
      if (selectedFamilyId === 'FAM_MERCHANT_SERVICES') {
        return <MerchantServicesWorkspace />;
      }

      // Universal interactive sandbox for all other registered families (SACCO, Lending, Mobile Money, Treasury, etc.)
      return (
        <UniversalFintechFamilyWorkspace 
          family={family} 
          onBack={() => {
            setSelectedFamilyId(null);
            setActiveTab('overview');
          }} 
        />
      );
    }

    // Marketplace / Family Manager
    if (activeTab === 'modules_store') {
      return (
        <FintechFamilyStore 
          familyId={selectedFamilyId || undefined} 
          onBack={() => {
            setSelectedFamilyId(null);
            setActiveTab('overview');
          }} 
        />
      );
    }

    // Developer Portal
    if (activeTab === 'developer') {
      return (
        <div className="p-8 max-w-7xl mx-auto space-y-6">
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                <Code className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-2xl font-black text-slate-900">JUMO FINTECH Developer Platform</h2>
                <p className="text-sm text-slate-500">Universal financial APIs, webhook delivery queues, and sandbox credentials</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Active Production API Key</div>
                <div className="font-mono text-xs text-slate-800 break-all bg-white p-2 rounded border border-slate-200">
                  jumo_live_sec_78942a98f10c3b99
                </div>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Webhook Signature Secret</div>
                <div className="font-mono text-xs text-slate-800 break-all bg-white p-2 rounded border border-slate-200">
                  whsec_e8b91a274c49f82d16
                </div>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Double-Entry Ledger Status</div>
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-600">
                  <CheckCircle2 className="w-4 h-4" /> Zero-Parity Certified
                </div>
              </div>
            </div>

            <div className="border-t border-slate-100 pt-6">
              <h3 className="text-sm font-bold text-slate-800 mb-3">Authoritative REST Endpoints</h3>
              <div className="space-y-2">
                {[
                  { method: 'POST', path: '/api/v1/ledger/post', desc: 'Post cryptographically verified double-entry journal batch' },
                  { method: 'GET', path: '/api/v1/ledger/parity', desc: 'Real-time ledger audit verifying total debit = total credit ($0.00 offset)' },
                  { method: 'POST', path: '/api/v1/payments/initiate', desc: 'Initiate multi-rail payment routing via Universal Switch' },
                  { method: 'POST', path: '/api/v1/wallets/create', desc: 'Provision closed-loop or open-loop stored value customer wallet' },
                  { method: 'POST', path: '/api/v1/compliance/screen', desc: 'Execute real-time UN/OFAC PEP and sanctions list screening' },
                ].map((api, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-200">
                    <div className="flex items-center gap-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${api.method === 'POST' ? 'bg-blue-100 text-blue-700' : 'bg-emerald-100 text-emerald-700'}`}>
                        {api.method}
                      </span>
                      <span className="font-mono text-xs font-bold text-slate-800">{api.path}</span>
                    </div>
                    <span className="text-xs text-slate-500">{api.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      );
    }

    // Default Overview Dashboard: Financial Services Operating Workspace
    return (
      <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-6 animate-in fade-in duration-150">
        {/* Workspace Context & Page Title */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-400 mb-1">
              <span>JUMO FINTECH</span>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-emerald-700">Financial Services Operating Workspace</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
              Fintech Overview & Sovereign Settlement Matrix
            </h1>
            <p className="text-xs md:text-sm text-slate-500 mt-1">
              Unified financial operations engine coordinating FAAP General Ledger, Multi-Rail Payment Switching, and 37 independent family modules.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button 
              onClick={() => openContextualAi('Global Treasury')}
              className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl shadow-xs transition flex items-center gap-1.5 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>Ask JUMO AI</span>
            </button>
            <button 
              onClick={() => setActiveTab('modules_store')}
              className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-xs transition flex items-center gap-1.5 cursor-pointer"
            >
              <Package className="w-3.5 h-3.5" />
              <span>Family Store</span>
            </button>
          </div>
        </div>

        {/* 1. Top KPI Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider">Total Assets</span>
              <Landmark className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-2xl font-black text-slate-900">$54,210,000.00</div>
            <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600 mt-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Double-Entry Parity Certified
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider">Transactions (24h)</span>
              <Zap className="w-4 h-4 text-indigo-600" />
            </div>
            <div className="text-2xl font-black text-slate-900">1,842,910</div>
            <div className="flex items-center gap-1 text-[11px] font-semibold text-indigo-600 mt-1">
              <TrendingUp className="w-3.5 h-3.5" /> 99.98% Switch Success Rate
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider">Settlements</span>
              <ArrowRight className="w-4 h-4 text-blue-600" />
            </div>
            <div className="text-2xl font-black text-slate-900">$51,840,250.00</div>
            <div className="flex items-center gap-1 text-[11px] font-semibold text-blue-600 mt-1">
              <Radio className="w-3.5 h-3.5" /> Real-time T+0 Auto-Clearing
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider">Treasury Position</span>
              <DollarSign className="w-4 h-4 text-purple-600" />
            </div>
            <div className="text-2xl font-black text-slate-900">$14,650,000.00</div>
            <div className="flex items-center gap-1 text-[11px] font-semibold text-purple-600 mt-1">
              <ShieldCheck className="w-3.5 h-3.5" /> 100% Capital Reserve Ratio
            </div>
          </div>
        </div>

        {/* 2. Financial Operations Hub Panels */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* Panel 1: Transaction Activity & Settlement Status */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-emerald-600" />
                <h3 className="font-bold text-sm text-slate-900">Transaction & Settlement Activity</h3>
              </div>
              <span className="text-[10px] font-mono bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded">
                LIVE STREAM
              </span>
            </div>

            <div className="space-y-2.5">
              {[
                { time: '10:44:12', ref: 'TXN-UG-9841', type: 'MTN Mobile Money Inflow', amount: '+$1,450.00', status: 'Settled', rail: 'MoMo Rail' },
                { time: '10:43:58', ref: 'TXN-KE-3921', type: 'M-Pesa B2C Bulk Payout', amount: '-$890.00', status: 'Cleared', rail: 'Safaricom' },
                { time: '10:42:30', ref: 'TXN-SW-7712', type: 'FAAP General Journal Posting', amount: '$12,500.00', status: 'Balanced', rail: 'FAAP Core' },
                { time: '10:40:15', ref: 'TXN-VS-2201', type: 'Visa Direct Card Acquiring', amount: '+$340.00', status: 'Settled', rail: 'Visa Cybersource' },
              ].map((tx, idx) => (
                <div key={idx} className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                  <div className="flex items-center gap-2.5">
                    <span className="font-mono text-[10px] text-slate-400">{tx.time}</span>
                    <div>
                      <div className="font-bold text-slate-900">{tx.type}</div>
                      <div className="text-[10px] text-slate-400 font-mono">{tx.ref} • {tx.rail}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`font-mono font-bold ${tx.amount.startsWith('+') ? 'text-emerald-600' : tx.amount.startsWith('-') ? 'text-slate-900' : 'text-indigo-600'}`}>
                      {tx.amount}
                    </div>
                    <span className="text-[9px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded">
                      {tx.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Panel 2: Revenue Collections & Risk Shield */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-purple-600" />
                <h3 className="font-bold text-sm text-slate-900">Revenue Collections & Risk Governance</h3>
              </div>
              <span className="text-[10px] font-mono bg-purple-50 text-purple-700 font-bold px-2 py-0.5 rounded">
                AML SCREENED
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <div className="text-[10px] font-mono text-slate-400 uppercase font-bold">1.5% Protocol Fee Collected</div>
                <div className="text-lg font-black text-slate-900 mt-0.5">$813,150.00</div>
                <div className="text-[10px] text-emerald-600 font-semibold mt-0.5">Automated FAAP Debit/Credit</div>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <div className="text-[10px] font-mono text-slate-400 uppercase font-bold">AML / PEP Sanctions Flags</div>
                <div className="text-lg font-black text-emerald-600 mt-0.5">0 Anomalies</div>
                <div className="text-[10px] text-slate-500 font-semibold mt-0.5">42.9k Pass Verified</div>
              </div>
            </div>

            <div className="p-3 bg-emerald-50/50 rounded-xl border border-emerald-100 text-xs space-y-1">
              <div className="font-bold text-emerald-900 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Zero-Trust Security Perimeter Active</span>
              </div>
              <p className="text-[11px] text-emerald-800">
                Every transaction across FAAP, Switch, Microfinance, and SACCO is signed with cryptographic integrity proofs before commit.
              </p>
            </div>
          </div>
        </div>

        {/* 3. Financial Families Capability Hub */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-lg font-black text-slate-900">Financial Family Capability Modules</h2>
              <p className="text-xs text-slate-500">
                Each financial family is an independent installable module with its own manifest, permissions, workflows, APIs, and reports.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input 
                  type="text"
                  placeholder="Filter 37 families..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:border-emerald-500 transition w-56"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredFamilies.map((family) => {
              const Icon = getSafeIcon(family.iconName);
              const isInstalled = installedFamilyIds.includes(family.id);
              const coverage = calculateFamilyCapabilityCoverage(family);

              return (
                <div 
                  key={family.id}
                  className={`p-4.5 rounded-2xl border transition-all flex flex-col justify-between ${
                    isInstalled 
                      ? 'bg-white border-slate-200 hover:border-emerald-500 shadow-xs' 
                      : 'bg-slate-50/70 border-slate-200 opacity-85 hover:opacity-100'
                  }`}
                >
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-2.5">
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                          isInstalled ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-200 text-slate-600'
                        }`}>
                          <Icon className="w-4.5 h-4.5" />
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-[10px] font-mono font-bold text-slate-400">{family.code}</span>
                            <span className="text-[9px] font-semibold text-slate-500 bg-slate-100 px-1.5 py-0.2 rounded">
                              {family.version}
                            </span>
                          </div>
                          <h3 className="font-bold text-xs text-slate-900 leading-tight mt-0.5">
                            {family.name}
                          </h3>
                        </div>
                      </div>
                    </div>

                    <p className="text-[11px] text-slate-500 line-clamp-2 mb-3">
                      {family.description}
                    </p>

                    <div className="space-y-1 mb-3">
                      <div className="flex items-center justify-between text-[10px] font-mono">
                        <span className="text-slate-400">Grounding Coverage</span>
                        <span className="font-bold text-emerald-600">{coverage}%</span>
                      </div>
                      <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                        <div 
                          className="bg-emerald-500 h-full rounded-full transition-all duration-500" 
                          style={{ width: `${coverage}%` }} 
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-2.5 border-t border-slate-100">
                    <button
                      onClick={() => handleSelectFamily(family.id)}
                      className="flex-1 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Play className="w-3 h-3 text-emerald-400" />
                      <span>Open Workspace</span>
                    </button>
                    <button
                      onClick={() => toggleInstallFamily(family.id)}
                      className={`px-2.5 py-1.5 text-xs font-bold rounded-xl border transition cursor-pointer ${
                        isInstalled 
                          ? 'bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100' 
                          : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                      title={isInstalled ? 'Installed Family' : 'Install Family'}
                    >
                      {isInstalled ? 'Installed' : 'Install'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 flex flex-col font-sans">
      {/* 1. Restrained Top Header Bar */}
      <header className="bg-slate-950 text-white border-b border-slate-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-13 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-black text-sm shadow-xs">
                <DollarSign className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold text-sm tracking-tight text-white block leading-none">
                  JUMO <span className="text-emerald-400 font-normal">FINTECH</span>
                </span>
                <span className="text-[10px] font-mono text-slate-400">Financial Operating Network</span>
              </div>
            </div>
          </div>

          {/* Global Search Bar */}
          <div className="hidden sm:flex flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input 
                type="text"
                placeholder="Global search transactions, accounts, ledgers, families..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-4 py-1.5 text-xs bg-slate-900 border border-slate-800 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition"
              />
            </div>
          </div>

          {/* Right Header Actions */}
          <div className="flex items-center gap-2">
            {/* Home / Launchpad Button */}
            {onNavigate && (
              <button
                onClick={() => onNavigate('/')}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-850 text-slate-300 hover:text-white rounded-lg border border-slate-800 text-xs font-semibold transition cursor-pointer"
                title="Return to Application Launcher"
              >
                <Home className="w-3.5 h-3.5 text-emerald-400" />
                <span className="hidden sm:inline">Launchpad</span>
              </button>
            )}

            <button 
              onClick={() => openContextualAi('Fintech Global Swarm')}
              className="px-2.5 py-1 text-xs font-bold text-emerald-300 bg-emerald-950/60 hover:bg-emerald-900/80 border border-emerald-800/60 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
              title="Contextual JUMO AI"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden sm:inline">AI</span>
            </button>

            {/* App Switcher */}
            {onNavigate && (
              <AppLauncherPopup 
                currentProduct="JUMO-FINTECH"
                onNavigate={onNavigate}
              />
            )}

            <button 
              onClick={() => setActiveTab('overview')}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg transition-colors"
              title="Alerts"
            >
              <Bell className="w-4 h-4" />
            </button>

            <button 
              onClick={() => setActiveTab('developer')}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg transition-colors"
              title="Developer API & Documentation"
            >
              <Code className="w-4 h-4" />
            </button>

            <div className="h-4 w-px bg-slate-800 mx-1" />

            {/* Profile Avatar */}
            <div className="flex items-center gap-2 cursor-pointer">
              <div className="w-7 h-7 rounded-full bg-emerald-700 text-white flex items-center justify-center text-xs font-bold">
                JM
              </div>
            </div>

            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="md:hidden p-1.5 text-slate-300 hover:text-white ml-1"
            >
              {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* 2. Main Container with Left Product Navigation & Main Workspace */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        {/* Left Product Navigation */}
        <aside className={`${isSidebarOpen ? 'w-60 block' : 'hidden'} md:block bg-white border-r border-slate-200 shrink-0 p-3.5 space-y-4 overflow-y-auto max-h-[calc(100vh-3.25rem)] sticky top-13 text-xs`}>
          {/* Product Overview Entry */}
          <div>
            <button
              onClick={() => {
                setActiveTab('overview');
                setSelectedFamilyId(null);
              }}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl font-bold transition cursor-pointer ${
                activeTab === 'overview'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <BarChart2 className="w-4 h-4" />
              <span>Overview</span>
            </button>
          </div>

          {/* Grouped Registry-Driven Navigation */}
          {(Object.entries(groupedFamilies) as [string, { label: string; items: FintechFamilyManifest[] }][]).map(([groupKey, group]) => {
            if (group.items.length === 0) return null;

            return (
              <div key={groupKey} className="space-y-0.5">
                <h4 className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 px-3 py-1">
                  {group.label}
                </h4>
                {group.items.map(family => {
                  const Icon = getSafeIcon(family.iconName);
                  const isSelected = activeTab === 'family_workspace' && selectedFamilyId === family.id;
                  const isInstalled = installedFamilyIds.includes(family.id);

                  return (
                    <button
                      key={family.id}
                      onClick={() => handleSelectFamily(family.id)}
                      className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg font-semibold transition text-left cursor-pointer group ${
                        isSelected
                          ? 'bg-emerald-50 text-emerald-900 font-bold border border-emerald-200'
                          : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                      }`}
                    >
                      <div className="flex items-center gap-2 truncate">
                        <Icon className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-emerald-600' : 'text-slate-400 group-hover:text-slate-600'}`} />
                        <span className="truncate">{family.shortName || family.name}</span>
                      </div>
                      {isInstalled && (
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" title="Installed" />
                      )}
                    </button>
                  );
                })}
              </div>
            );
          })}

          {/* Intelligence & Platform Links */}
          <div className="pt-2 border-t border-slate-100 space-y-0.5">
            <h4 className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 px-3 py-1">
              INTELLIGENCE & ADMIN
            </h4>
            <button
              onClick={() => openContextualAi('Financial Copilot')}
              className="w-full flex items-center gap-2 px-3 py-1.5 rounded-lg text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-semibold cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
              <span>AI Copilot</span>
            </button>
            <button
              onClick={() => setActiveTab('modules_store')}
              className={`w-full flex items-center gap-2 px-3 py-1.5 rounded-lg font-semibold cursor-pointer ${
                activeTab === 'modules_store' ? 'bg-emerald-50 text-emerald-900 font-bold' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <Package className="w-3.5 h-3.5 text-slate-400" />
              <span>Family Store</span>
            </button>
            <button
              onClick={() => setActiveTab('developer')}
              className={`w-full flex items-center gap-2 px-3 py-1.5 rounded-lg font-semibold cursor-pointer ${
                activeTab === 'developer' ? 'bg-emerald-50 text-emerald-900 font-bold' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <Code className="w-3.5 h-3.5 text-slate-400" />
              <span>Developer API</span>
            </button>
          </div>
        </aside>

        {/* Main Product Workspace */}
        <main className="flex-1 min-w-0 bg-slate-50">
          {renderWorkspace()}
        </main>
      </div>

      {/* Contextual AI Modal */}
      {isAiModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-2xl w-full p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-emerald-600" />
                <h3 className="font-black text-slate-900 text-base">JUMO AI Contextual Financial Assistant</h3>
              </div>
              <button 
                onClick={() => setIsAiModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 text-xs font-bold cursor-pointer"
              >
                Close
              </button>
            </div>

            <div className="space-y-3">
              <div className="text-[11px] font-mono text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                Active Context: {aiContext}
              </div>
              <textarea 
                rows={3}
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                placeholder="e.g. Audit ledger balance parity across all accounts or test payment switch failover routes..."
                className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500"
              />
              <button 
                onClick={handleRunAiAudit}
                disabled={aiThinking}
                className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-xs transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {aiThinking ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Processing Contextual AI Analysis...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Analyze Financial Context</span>
                  </>
                )}
              </button>
            </div>

            {aiResponse && (
              <div className="p-4 bg-slate-950 text-emerald-300 font-mono text-xs rounded-xl whitespace-pre-wrap border border-slate-800">
                {aiResponse}
              </div>
            )}
          </div>
        </div>
      )}

      {/* 3. Compact Universal Runtime Footer */}
      <footer className="bg-white border-t border-slate-200 py-2.5 px-6 text-[11px] text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-emerald-600 font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Runtime Online
          </span>
          <span>•</span>
          <span className="flex items-center gap-1.5 text-blue-600 font-medium">
            <span className="w-2 h-2 rounded-full bg-blue-500" />
            Sync Healthy
          </span>
          <span>•</span>
          <span className="flex items-center gap-1.5 text-purple-600 font-medium">
            <span className="w-2 h-2 rounded-full bg-purple-500" />
            Security Protected
          </span>
        </div>
        <div className="flex items-center gap-3 font-mono text-[10px]">
          <span>JUMO FINTECH v16.2.0</span>
          <span>•</span>
          <span className="text-emerald-700 font-bold">Double-Entry Parity Certified ($0.00 offset)</span>
        </div>
      </footer>
    </div>
  );
};
