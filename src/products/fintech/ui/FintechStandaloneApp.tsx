import React, { useState } from 'react';
import { 
  Landmark, Users, DollarSign, Shield, CreditCard, Briefcase, 
  Activity, Bell, Search, Menu, X, Sliders, LayoutGrid, CheckCircle2
} from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { FINTECH_MODULES } from '../modules';
import { FintechShell } from './FintechShell';
import { FintechWorkspace } from './FintechWorkspace';
import { faapEnterpriseRuntime } from '../../../core/faap/faapService';

// JUMO FTERP — FINTECH & SACCO ENTERPRISE OPERATING SYSTEM
const OFFICER_PORTALS = [
  {
    id: 'PORTAL-BANKING-OPS',
    name: 'Banking Operations',
    role: 'Operations Manager / Chief Teller',
    icon: Landmark,
    modules: ['FT-MOD-MEMBER-KYC', 'FT-MOD-SAVINGS-ACCOUNTS', 'FT-MOD-VAULT-CASH']
  },
  {
    id: 'PORTAL-CREDIT-RISK',
    name: 'Credit & Underwriting',
    role: 'Chief Credit Officer',
    icon: Briefcase,
    modules: ['FT-MOD-LOAN-UNDERWRITING', 'FT-MOD-CRB-COLLATERAL']
  },
  {
    id: 'PORTAL-PAYMENTS',
    name: 'Payments & Channels',
    role: 'Payments Officer',
    icon: CreditCard,
    modules: ['FT-MOD-DIGITAL-MOMO', 'FT-MOD-AGENT-BANKING']
  },
  {
    id: 'PORTAL-FINANCE',
    name: 'Finance & Compliance',
    role: 'CFO / Chief Accountant',
    icon: Activity,
    modules: ['FT-MOD-GENERAL-LEDGER', 'FT-MOD-UMRA-COMPLIANCE']
  }
];

export interface FintechStandaloneAppProps {
  onBackToLauncher?: () => void;
}

export function FintechStandaloneApp({ onBackToLauncher }: FintechStandaloneAppProps) {
  const [activePortalId, setActivePortalId] = useState(OFFICER_PORTALS[0].id);
  const [activeModuleId, setActiveModuleId] = useState('FT-MOD-MEMBER-KYC');
  const [activeTab, setActiveTab] = useState<'OVERVIEW' | 'RECORDS' | 'TERMINAL' | 'REPORTS' | 'WORKFLOW'>('RECORDS');
  const [executionMessage, setExecutionMessage] = useState<string | null>(null);
  const [selectedRecordId, setSelectedRecordId] = useState<string | null>(null);

  React.useEffect(() => {
    faapEnterpriseRuntime.ensureSeeded();
  }, []);

  // Operational State (Replacing static hardcoded stats)
  const [operationalMetrics] = useState({
    activeMembers: '1,248',
    loanPortfolio: 'UGX 1.42B',
    savingsDeposits: 'UGX 4.2B',
    portfolioAtRisk: '3.4%'
  });

  const currentPortal = OFFICER_PORTALS.find(p => p.id === activePortalId)!;
  const availableModules = FINTECH_MODULES.filter(m => currentPortal.modules.includes(m.id));
  const currentModule = FINTECH_MODULES.find(m => m.id === activeModuleId) || availableModules[0] || FINTECH_MODULES[0];

  const handlePortalSwitch = (id: string) => {
    setActivePortalId(id);
    const portal = OFFICER_PORTALS.find(p => p.id === id)!;
    setActiveModuleId(portal.modules[0]);
    setActiveTab('RECORDS');
    setExecutionMessage(null);
    setSelectedRecordId(null);
  };

  const handleSuccess = (msg: string) => {
    setExecutionMessage(msg);
    setActiveTab('RECORDS');
  };

  return (
    <FintechShell 
      activePortalId={activePortalId} 
      onPortalSwitch={handlePortalSwitch} 
      portals={OFFICER_PORTALS}
    >
      {/* Office Navigation */}
      <div className="bg-white border-b border-slate-200 px-8 flex items-center justify-between shrink-0">
        <div className="flex gap-8">
          {availableModules.map(mod => (
            <button
              key={mod.id}
              onClick={() => {
                setActiveModuleId(mod.id);
                setActiveTab('RECORDS');
                setSelectedRecordId(null);
              }}
              className={`py-4 text-xs font-black uppercase tracking-widest transition-all relative ${
                activeModuleId === mod.id ? 'text-emerald-600' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              {mod.name.replace('SACCO Member ', '').replace('General Ledger & ', '')}
              {activeModuleId === mod.id && (
                <motion.div layoutId="activeModule" className="absolute bottom-0 left-0 right-0 h-1 bg-emerald-600 rounded-t-full" />
              )}
            </button>
          ))}
        </div>
        
        <div className="flex gap-4">
          {(['OVERVIEW', 'RECORDS', 'TERMINAL', 'REPORTS', 'WORKFLOW'] as const)
            .filter(tab => tab !== 'WORKFLOW' || activeModuleId === 'FT-MOD-GENERAL-LEDGER')
            .map(tab => (
             <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                if (tab !== 'RECORDS') setSelectedRecordId(null);
              }}
              className={`px-4 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all ${
                activeTab === tab ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/20' : 'text-slate-400 hover:bg-slate-50'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-8 scrollbar-hide">
        <AnimatePresence mode="wait">
          {executionMessage && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-8 p-4 bg-emerald-600 text-white rounded-2xl flex items-center justify-between shadow-xl shadow-emerald-900/20"
            >
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-white" />
                <p className="text-xs font-black tracking-tight">{executionMessage}</p>
              </div>
              <button onClick={() => setExecutionMessage(null)} className="p-2 hover:bg-white/10 rounded-lg transition-all">
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <FintechWorkspace 
          moduleId={activeModuleId} 
          activeTab={activeTab} 
          onSuccess={handleSuccess} 
          onCancel={() => setActiveTab('RECORDS')}
          onNavigateToTerminal={() => setActiveTab('TERMINAL')}
          selectedRecordId={selectedRecordId}
          onSelectRecord={setSelectedRecordId}
          metrics={operationalMetrics}
        />
      </div>
    </FintechShell>
  );
}
