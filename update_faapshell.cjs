const fs = require('fs');

const shellContent = `/**
 * JUMO FAAP — Sovereign Web Shell & Universal Product Portal
 * Double-entry engine with universal product integrations.
 */
import React, { useState, useEffect } from 'react';
import { 
  DollarSign, Activity, FileText, ArrowRightLeft, BookOpen, User, 
  Settings, Menu, Search, Bell, Home, ChevronRight, CheckCircle2,
  Lock, LogIn, UserPlus, Layers, LayoutDashboard, Briefcase, Landmark
} from 'lucide-react';
import { PlatformSwitcher } from '../../../components/PlatformSwitcher';
import { FaapService } from '../domain/FaapService';
import { PortalRegistry, calculateRegistryStats, ModuleRegistry } from '../../registries';

import { FaapDashboard } from './modules/FaapDashboard';
import { ChartOfAccounts } from './modules/ChartOfAccounts';
import { GeneralJournal } from './modules/GeneralJournal';
import { AccountsPayable } from './modules/AccountsPayable';
import { AccountsReceivable } from './modules/AccountsReceivable';
import { BankingModule } from './modules/BankingModule';

type AppState = 'LANDING' | 'REGISTRATION' | 'LOGIN' | 'APP';

export const FaapWebShell: React.FC<{ onNavigate?: (route: string) => void }> = ({ onNavigate }) => {
  const service = FaapService.getInstance();
  const stats = calculateRegistryStats().faap;
  
  const [appState, setAppState] = useState<AppState>('LANDING');
  const [activePortalId, setActivePortalId] = useState<string>('FAAP_CFO');
  const [activeTab, setActiveTab] = useState<string>('DASHBOARD');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  const [metrics, setMetrics] = useState(service.getMetrics());
  const [chartOfAccounts, setChartOfAccounts] = useState(service.getChartOfAccounts());
  const [transactions, setTransactions] = useState(service.getUniversalTransactions());

  const handlePortalChange = (portalId: string) => {
    setActivePortalId(portalId);
    setActiveTab('DASHBOARD');
  };

  const renderLandingPage = () => (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col">
      <header className="px-8 py-4 bg-white border-b border-slate-200 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <div className="bg-emerald-600 p-2 rounded-lg">
            <DollarSign className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900 leading-tight">JUMO FAAP</h1>
            <p className="text-xs text-slate-500">Financial & Accounting Platform</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={() => setAppState('LOGIN')} className="text-sm font-medium text-slate-600 hover:text-slate-900">Sign In</button>
          <button onClick={() => setAppState('REGISTRATION')} className="text-sm font-medium text-white bg-emerald-600 px-4 py-2 rounded-lg hover:bg-emerald-700">Initialize Ledger</button>
        </div>
      </header>
      
      <main className="flex-1 flex flex-col items-center justify-center p-8 text-center max-w-4xl mx-auto">
        <h2 className="text-4xl font-extrabold text-slate-900 mb-6">The Financial Backbone of the Enterprise</h2>
        <p className="text-lg text-slate-600 mb-10">
          A rigid $0.00-offset verified double-entry accounting engine providing unified General Ledger, Budgeting, and Vote Book functionality to all JUMO Digital Hybrid Platforms.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full text-left">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <Activity className="w-8 h-8 text-emerald-600 mb-4" />
            <h3 className="font-semibold text-slate-900 mb-2">Double-Entry Engine</h3>
            <p className="text-sm text-slate-600">Strictly blocks commits unless debit exactly matches credit in memory.</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <Layers className="w-8 h-8 text-emerald-600 mb-4" />
            <h3 className="font-semibold text-slate-900 mb-2">Multi-Ledger Portals</h3>
            <p className="text-sm text-slate-600">Specialized portals for CFO, AR, AP, Procurement, and Tax offices.</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <CheckCircle2 className="w-8 h-8 text-emerald-600 mb-4" />
            <h3 className="font-semibold text-slate-900 mb-2">Universal Integration</h3>
            <p className="text-sm text-slate-600">Seamlessly posts ledgers from Education ERP and Church ERP instantly.</p>
          </div>
        </div>
      </main>
      
      <footer className="py-6 border-t border-slate-200 bg-white text-center text-sm text-slate-500">
        &copy; {new Date().getFullYear()} JUMO Universal Enterprise Operating System. All rights reserved.
      </footer>
    </div>
  );

  const renderRegistrationPage = () => (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-lg max-w-lg w-full">
        <div className="flex justify-center mb-6">
          <div className="bg-emerald-600 p-3 rounded-xl">
            <UserPlus className="w-8 h-8 text-white" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-center text-slate-900 mb-2">Initialize Organization Ledger</h2>
        <form onSubmit={(e) => { e.preventDefault(); setAppState('LOGIN'); }} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Company / Organization Name</label>
            <input type="text" required className="w-full px-4 py-2 border border-slate-300 rounded-lg text-sm" placeholder="e.g. JUMO Global" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Base Currency</label>
            <select required className="w-full px-4 py-2 border border-slate-300 rounded-lg text-sm">
              <option value="UGX">UGX - Uganda Shilling</option>
              <option value="KES">KES - Kenyan Shilling</option>
              <option value="USD">USD - US Dollar</option>
            </select>
          </div>
          <button type="submit" className="w-full py-3 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700">Provision Ledger</button>
        </form>
        <div className="mt-6 text-center">
          <button onClick={() => setAppState('LANDING')} className="text-sm text-emerald-600 font-medium">Cancel</button>
        </div>
      </div>
    </div>
  );

  const renderLoginPage = () => (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-lg max-w-md w-full">
        <div className="flex justify-center mb-6">
          <div className="bg-emerald-600 p-3 rounded-xl">
            <Lock className="w-8 h-8 text-white" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-center text-slate-900 mb-2">Secure Finance Access</h2>
        <form onSubmit={(e) => { e.preventDefault(); setAppState('APP'); }} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Workspace Portal</label>
            <select 
              className="w-full px-4 py-2 border border-slate-300 rounded-lg text-sm"
              value={activePortalId}
              onChange={(e) => handlePortalChange(e.target.value)}
            >
              {PortalRegistry.filter(p => p.id.startsWith('FAAP_')).map(p => (
                <option key={p.id} value={p.id}>{p.displayName}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Access Credential</label>
            <input type="password" required className="w-full px-4 py-2 border border-slate-300 rounded-lg text-sm" placeholder="••••••••" defaultValue="password" />
          </div>
          <button type="submit" className="w-full py-3 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 flex items-center justify-center gap-2">
            <LogIn className="w-4 h-4" /> Enter Workspace
          </button>
        </form>
        <div className="mt-6 text-center">
          <button onClick={() => setAppState('LANDING')} className="text-sm text-slate-500 hover:text-slate-700">Back to Home</button>
        </div>
      </div>
    </div>
  );

  const renderCurrentPage = () => {
    switch (activeTab) {
      case 'DASHBOARD': return <FaapDashboard metrics={metrics} transactions={transactions} />;
      case 'COA': return <ChartOfAccounts accounts={chartOfAccounts} />;
      case 'JOURNAL': return <GeneralJournal transactions={transactions} onPost={() => {
        setTransactions(service.getUniversalTransactions());
        setMetrics(service.getMetrics());
      }} />;
      case 'AP': return <AccountsPayable />;
      case 'AR': return <AccountsReceivable />;
      case 'BANKING': return <BankingModule />;
      case 'SETTINGS': return (
        <div className="p-6">
          <h2 className="text-xl font-bold text-slate-800 mb-6">Financial Configuration</h2>
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm max-w-3xl">
            <h3 className="font-semibold text-slate-800 mb-4 border-b pb-2">Enabled FAAP Modules ({ModuleRegistry.filter(m => m.id.startsWith('MOD_FAAP_')).length} available)</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {ModuleRegistry.filter(m => m.id.startsWith('MOD_FAAP_')).slice(0, 24).map(mod => (
                <div key={mod.id} className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked className="rounded text-emerald-600" />
                  <span className="text-sm text-slate-700 truncate">{mod.displayName}</span>
                </div>
              ))}
            </div>
            
            <h3 className="font-semibold text-slate-800 mb-4 border-b pb-2 mt-8">Cash Book Types</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center gap-2"><input type="checkbox" defaultChecked className="rounded text-emerald-600" /><span className="text-sm text-slate-700">Single Cash Book</span></div>
              <div className="flex items-center gap-2"><input type="checkbox" defaultChecked className="rounded text-emerald-600" /><span className="text-sm text-slate-700">Double Cash Book</span></div>
              <div className="flex items-center gap-2"><input type="checkbox" defaultChecked className="rounded text-emerald-600" /><span className="text-sm text-slate-700">Triple Cash Book</span></div>
              <div className="flex items-center gap-2"><input type="checkbox" defaultChecked className="rounded text-emerald-600" /><span className="text-sm text-slate-700">Petty Cash Book</span></div>
              <div className="flex items-center gap-2"><input type="checkbox" defaultChecked className="rounded text-emerald-600" /><span className="text-sm text-slate-700">Bank Cash Book</span></div>
              <div className="flex items-center gap-2"><input type="checkbox" defaultChecked className="rounded text-emerald-600" /><span className="text-sm text-slate-700">Electronic Cash Book</span></div>
            </div>
          </div>
        </div>
      );
      default: return <FaapDashboard metrics={metrics} transactions={transactions} />;
    }
  };

  const menuGroups = [
    {
      group: 'Portals',
      items: PortalRegistry.filter(p => p.id.startsWith('FAAP_')).map(p => ({
        id: p.id,
        label: p.displayName,
        icon: User
      }))
    },
    {
      group: 'Core Financials',
      items: [
        { id: 'DASHBOARD', label: 'Financial Control Center', icon: LayoutDashboard },
        { id: 'COA', label: 'Chart of Accounts', icon: Briefcase },
        { id: 'JOURNAL', label: 'General Journal', icon: BookOpen }
      ]
    },
    {
      group: 'Subledgers',
      items: [
        { id: 'AP', label: 'Accounts Payable', icon: ArrowRightLeft },
        { id: 'AR', label: 'Accounts Receivable', icon: FileText },
        { id: 'BANKING', label: 'Bank Feeds & Recon', icon: Landmark }
      ]
    },
    {
      group: 'Administration',
      items: [
        { id: 'SETTINGS', label: 'Platform Configuration', icon: Settings }
      ]
    }
  ];

  if (appState === 'LANDING') return renderLandingPage();
  if (appState === 'REGISTRATION') return renderRegistrationPage();
  if (appState === 'LOGIN') return renderLoginPage();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900">
      <header className="h-14 bg-slate-900 text-white flex items-center justify-between px-4 shrink-0 shadow-sm z-20">
        <div className="flex items-center gap-4">
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-1.5 hover:bg-slate-800 rounded-md transition-colors">
            <Menu className="w-5 h-5 text-slate-300" />
          </button>
          <div className="flex items-center gap-2">
            <div className="bg-emerald-600 p-1.5 rounded text-white flex items-center justify-center">
              <DollarSign className="w-4 h-4" />
            </div>
            <span className="font-bold text-[15px] tracking-tight">
              JUMO <span className="font-medium text-slate-300">FAAP</span>
            </span>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {onNavigate && <PlatformSwitcher onNavigate={onNavigate} />}
          <button onClick={() => setAppState('LANDING')} className="ml-2 flex items-center gap-2 pl-2 border-l border-slate-700 hover:opacity-80 transition-opacity text-[13px] font-medium">
            Sign Out
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <aside className={\`\${isSidebarOpen ? 'w-64' : 'w-0 hidden'} flex-shrink-0 bg-white border-r border-slate-200 flex flex-col overflow-y-auto transition-all duration-300 ease-in-out z-10\`}>
          <div className="p-4 border-b border-slate-100 bg-slate-50/50">
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Portal Context</div>
            <select 
              className="w-full text-sm bg-white border border-slate-200 rounded-md p-2 focus:ring-1 focus:ring-emerald-500 focus:outline-none"
              value={activePortalId}
              onChange={(e) => handlePortalChange(e.target.value)}
            >
              {PortalRegistry.filter(p => p.id.startsWith('FAAP_')).map(p => (
                <option key={p.id} value={p.id}>{p.displayName}</option>
              ))}
            </select>
          </div>

          <div className="flex-1 py-4">
            {menuGroups.map((group, idx) => (
              <div key={idx} className="mb-6 px-3">
                <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-3 mb-2">{group.group}</h3>
                <div className="space-y-0.5">
                  {group.items.map(item => {
                    const isSelected = activeTab === item.id;
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          if (group.group === 'Portals') handlePortalChange(item.id);
                          else setActiveTab(item.id);
                        }}
                        className={\`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors \${
                          isSelected || (group.group === 'Portals' && activePortalId === item.id)
                            ? 'bg-emerald-50 text-emerald-700' 
                            : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                        }\`}
                      >
                        <Icon className={\`w-4 h-4 \${isSelected || (group.group === 'Portals' && activePortalId === item.id) ? 'text-emerald-600' : 'text-slate-400'}\`} />
                        <span className="truncate">{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </aside>

        <main className="flex-1 flex flex-col min-w-0 bg-slate-50 overflow-y-auto">
          <div className="flex-1 p-6">
            {renderCurrentPage()}
          </div>
        </main>
      </div>
    </div>
  );
};
`;
fs.writeFileSync('src/products/faap/web/FaapWebShell.tsx', shellContent);
