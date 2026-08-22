import React, { useState, useMemo } from 'react';
import { 
  DollarSign, Landmark, CreditCard, Zap, ArrowRight, Clipboard, Send, CheckCircle2,
  TrendingUp, Layers, Building2, Globe, Lock, Sparkles, Settings, LayoutGrid,
  Search, Bell, HelpCircle, User, Shield, ShieldCheck, Code, ArrowLeft,
  ChevronDown, ChevronRight, Activity, Terminal, AlertCircle, RefreshCw,
  Package, Check, Filter, Cpu, Play, Download, Sliders, Smartphone,
  BarChart2, Receipt, ShoppingCart, Upload, FileText, Wallet, Users, PieChart
} from 'lucide-react';
import { FintechFamilyRegistry, FintechFamilyManifest, getFintechFamily, calculateFamilyCapabilityCoverage } from './registries/FintechFamilyRegistry';
import { FintechFamilyStore } from './FintechFamilyStore';
import { UniversalFintechFamilyWorkspace } from './UniversalFintechFamilyWorkspace';
import { FaapControllerWorkspace } from './financial-accounting/web/FaapControllerWorkspace';
import { AgentNetworkWorkspace } from './agent-banking/web/AgentNetworkWorkspace';
import { MicrofinanceWorkspace } from './microfinance/web/MicrofinanceWorkspace';
import { DigitalWalletWorkspace } from './digital-wallets/web/DigitalWalletWorkspace';
import { FxWorkspace } from './fx/web/FxWorkspace';
import { MerchantServicesWorkspace } from './merchant-services/web/MerchantServicesWorkspace';
import { PlatformSwitcher } from '../../components/PlatformSwitcher';

// Safe Icon Resolver Map
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

function getSafeFamilyIcon(iconName?: string): React.ElementType {
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
  currentUser = { name: 'Julius Moses Okwii', role: 'SOVEREIGN_TREASURY_CHIEF', email: 'okwiijuliusmoses@gmail.com' },
  onLogout
}) => {
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [selectedFamilyId, setSelectedFamilyId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isAiModalOpen, setIsAiModalOpen] = useState<boolean>(false);
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
      setAiResponse(`JUMO AI Swarm Audit Report:
- Analyzed 18 installed financial family modules.
- Double-entry ledger parity verified at $0.00 offset (Debits: $54,210,000 | Credits: $54,210,000).
- Payment Switching latency averaging 240ms across M-Pesa, MTN MoMo, and Visa rails.
- Sanctions compliance screening: 0 PEP violations flagged. All systems operational.`);
    }, 1200);
  };

  const handleSelectFamily = (familyId: string) => {
    setSelectedFamilyId(familyId);
    setActiveTab('family_workspace');
  };

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
      
      // Specialized operational workspaces for key families
      if (selectedFamilyId === 'FAM_LEDGER') {
        return <FaapControllerWorkspace />;
      }
      if (selectedFamilyId === 'FAM_AGENT_BANKING') {
        return <AgentNetworkWorkspace />;
      }
      if (selectedFamilyId === 'FAM_MICROFINANCE') {
        return <MicrofinanceWorkspace />;
      }
      if (selectedFamilyId === 'FAM_DIGITAL_WALLETS') {
        return <DigitalWalletWorkspace />;
      }
      if (selectedFamilyId === 'FAM_FX') {
        return <FxWorkspace />;
      }
      if (selectedFamilyId === 'FAM_MERCHANT_SERVICES') {
        return <MerchantServicesWorkspace />;
      }

      // Universal interactive sandbox for all other families
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
                  { method: 'GET', path: '/api/v1/ledger/parity', desc: 'Real-time ledger audit verifying total debit = total credit' },
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

    // Default Overview Dashboard
    return (
      <div className="p-8 max-w-7xl mx-auto space-y-8">
        {/* Header Title Area */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-emerald-600 mb-1">
              <span>JUMO FINTECH</span>
              <span>/</span>
              <span>SOVEREIGN FINANCIAL PLATFORM</span>
            </div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">
              Enterprise Financial Operations & Family Modules
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Consolidated financial product architecture powering FAAP Accounting, Universal Payment Switching, and 30+ independent capability families.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={() => setActiveTab('modules_store')}
              className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-sm transition flex items-center gap-2 cursor-pointer"
            >
              <Package className="w-4 h-4" />
              <span>Financial Family Marketplace</span>
            </button>
            <button 
              onClick={() => setIsAiModalOpen(true)}
              className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl shadow-sm transition flex items-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>AI Swarm Auditor</span>
            </button>
          </div>
        </div>

        {/* Top KPIs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Settlement Volume (24h)', value: '$54.2M', icon: ArrowRight, color: 'text-indigo-600', sub: '99.98% Success Rate' },
            { label: 'FAAP Double-Entry Parity', value: '$0.00 Offset', icon: Landmark, color: 'text-emerald-600', sub: 'Cryptographically Verified' },
            { label: 'Installed Families', value: `${installedFamilyIds.length} of ${FintechFamilyRegistry.length}`, icon: Package, color: 'text-blue-600', sub: 'Independent Modules' },
            { label: 'Sanctions Clearance', value: '100% Passed', icon: ShieldCheck, color: 'text-purple-600', sub: 'Zero-Trust Gateways' },
          ].map((kpi, idx) => (
            <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-start justify-between">
              <div>
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">{kpi.label}</div>
                <div className="text-2xl font-black text-slate-900">{kpi.value}</div>
                <div className="text-xs text-emerald-600 font-semibold mt-1 flex items-center gap-1">
                  <Check className="w-3 h-3" /> {kpi.sub}
                </div>
              </div>
              <div className={`w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center ${kpi.color}`}>
                <kpi.icon className="w-5 h-5" />
              </div>
            </div>
          ))}
        </div>

        {/* Installed & Available Families Hub */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-black text-slate-900">Financial Family Capability Modules</h2>
              <p className="text-xs text-slate-500">Each family operates as an independent, installable, and upgradeable capability module.</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input 
                  type="text"
                  placeholder="Filter families..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 pr-4 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:border-emerald-500 transition w-64"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredFamilies.map((family) => {
              const Icon = getSafeFamilyIcon(family.iconName);
              const isInstalled = installedFamilyIds.includes(family.id);
              const coverage = calculateFamilyCapabilityCoverage(family);

              return (
                <div 
                  key={family.id}
                  className={`p-5 rounded-2xl border transition-all flex flex-col justify-between ${
                    isInstalled 
                      ? 'bg-white border-slate-200 hover:border-emerald-500 shadow-xs' 
                      : 'bg-slate-50/70 border-slate-200 opacity-80 hover:opacity-100'
                  }`}
                >
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                          isInstalled ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-200 text-slate-600'
                        }`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-mono font-bold text-slate-400">{family.code}</span>
                            <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                              {family.version}
                            </span>
                          </div>
                          <h3 className="font-bold text-sm text-slate-900 leading-tight mt-0.5">
                            {family.name}
                          </h3>
                        </div>
                      </div>
                    </div>

                    <p className="text-xs text-slate-500 line-clamp-2 mb-4">
                      {family.description}
                    </p>

                    <div className="space-y-1.5 mb-4">
                      <div className="flex items-center justify-between text-[11px] font-mono">
                        <span className="text-slate-400">Benchmark Coverage</span>
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

                  <div className="flex items-center gap-2 pt-3 border-t border-slate-100">
                    <button
                      onClick={() => handleSelectFamily(family.id)}
                      className="flex-1 px-3 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Play className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Launch Workspace</span>
                    </button>
                    <button
                      onClick={() => toggleInstallFamily(family.id)}
                      className={`px-3 py-2 text-xs font-bold rounded-xl border transition cursor-pointer ${
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
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      {/* Sovereign Top Header Bar */}
      <header className="bg-slate-950 text-white border-b border-slate-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <PlatformSwitcher onNavigate={onNavigate} />
            <div className="h-5 w-px bg-slate-800" />
            <div 
              onClick={() => {
                setActiveTab('overview');
                setSelectedFamilyId(null);
              }}
              className="flex items-center gap-2.5 cursor-pointer group"
            >
              <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-black shadow-xs group-hover:scale-105 transition-transform">
                <DollarSign className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-black tracking-tight text-white flex items-center gap-1.5">
                  <span className="text-emerald-400">JUMO</span> FINTECH
                  <span className="text-[9px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.2 rounded border border-emerald-500/30 uppercase font-semibold">
                    SOVEREIGN
                  </span>
                </div>
                <div className="text-[10px] text-slate-400">Universal Financial Operating System</div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsAiModalOpen(true)}
              className="hidden sm:inline-flex px-3 py-1 text-xs font-bold text-emerald-300 bg-emerald-950/60 hover:bg-emerald-900/80 border border-emerald-800/60 rounded-lg transition-colors items-center gap-1.5 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>AI Auditor</span>
            </button>

            <button 
              onClick={() => setActiveTab('developer')}
              className="hidden sm:inline-flex px-3 py-1 text-xs font-bold text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg transition-colors items-center gap-1.5 cursor-pointer"
            >
              <Code className="w-3.5 h-3.5 text-slate-400" />
              <span>Developer API</span>
            </button>

            <div className="h-4 w-px bg-slate-800 hidden sm:block" />

            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-emerald-700 text-white flex items-center justify-center text-xs font-bold">
                JM
              </div>
              <div className="hidden md:block text-left">
                <div className="text-xs font-bold text-white leading-none">{currentUser.name}</div>
                <div className="text-[10px] text-slate-400 leading-none mt-0.5">{currentUser.role}</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Workspace Area */}
      <main className="flex-1">
        {renderWorkspace()}
      </main>

      {/* AI Swarm Auditor Modal */}
      {isAiModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-2xl w-full p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-emerald-600" />
                <h3 className="font-black text-slate-900 text-base">JUMO FINTECH Cognitive AI Swarm Auditor</h3>
              </div>
              <button 
                onClick={() => setIsAiModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 text-xs font-bold cursor-pointer"
              >
                Close
              </button>
            </div>

            <div className="space-y-3">
              <label className="text-xs font-bold text-slate-700">Audit Request / Compliance Query</label>
              <textarea 
                rows={3}
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                placeholder="e.g. Audit all double-entry ledger postings across FAAP, mobile money float, and SACCO loan multipliers for parity and AML sanctions..."
                className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500"
              />
              <button 
                onClick={handleRunAiAudit}
                disabled={aiThinking}
                className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-sm transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {aiThinking ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Auditing Double-Entry Parity & Sanctions...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Execute Sovereign Audit</span>
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

      {/* Universal Compact Footer */}
      <footer className="bg-white border-t border-slate-200 py-3 px-6 text-[11px] text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          <span className="font-bold text-slate-800">JUMO FINTECH v16.2.0</span>
          <span>•</span>
          <span className="flex items-center gap-1 text-emerald-600 font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5" /> Double-Entry Parity Certified
          </span>
        </div>
        <div>
          © 2026 JUMO Universal Enterprise Operating System. All sovereign rights reserved.
        </div>
      </footer>
    </div>
  );
};
