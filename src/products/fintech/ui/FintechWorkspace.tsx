import React from 'react';
import { 
  Users, Briefcase, Landmark, CreditCard, Activity, 
  Search, Plus, Eye, History, FileText, CheckCircle2,
  ArrowUpRight, ArrowDownLeft, RefreshCw
} from 'lucide-react';
import { MemberEnrollForm, LoanAppraisalForm, JournalEntryForm } from './FintechForms';
import { FintechRecordView } from './FintechRecordView';

interface WorkspaceProps {
  moduleId: string;
  activeTab: 'OVERVIEW' | 'RECORDS' | 'TERMINAL' | 'REPORTS' | 'WORKFLOW';
  onSuccess: (msg: string) => void;
  onCancel: () => void;
  onNavigateToTerminal: () => void;
  selectedRecordId: string | null;
  onSelectRecord: (id: string | null) => void;
  metrics: {
    activeMembers: string;
    loanPortfolio: string;
    savingsDeposits: string;
    portfolioAtRisk: string;
  };
}

import { faapEnterpriseRuntime } from '../../../core/faap/faapService';
import { LedgerDashboard } from './LedgerDashboard';
import { JournalWorkflowTerminal } from './JournalWorkflowTerminal';

export const FintechWorkspace = ({ 
  moduleId, activeTab, onSuccess, onCancel, onNavigateToTerminal, 
  selectedRecordId, onSelectRecord, metrics 
}: WorkspaceProps) => {

  const accounts = faapEnterpriseRuntime.listAccounts();
  const journals = faapEnterpriseRuntime.listJournals();

  if (selectedRecordId) {
    return <FintechRecordView type="MEMBER" id={selectedRecordId} onBack={() => onSelectRecord(null)} />;
  }

  if (activeTab === 'WORKFLOW') {
    return <JournalWorkflowTerminal onActionComplete={onSuccess} />;
  }

  if (activeTab === 'OVERVIEW') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Active Members', value: metrics.activeMembers, growth: '+12%', icon: Users },
          { label: 'Total Loan Portfolio', value: metrics.loanPortfolio, growth: '+5.2%', icon: Briefcase },
          { label: 'Savings Deposits', value: metrics.savingsDeposits, growth: '+8.1%', icon: Landmark },
          { label: 'Portfolio At Risk (PAR)', value: metrics.portfolioAtRisk, growth: '-0.2%', icon: Activity },
        ].map((stat, i) => (
          <div key={i} className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all group">
            <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 bg-slate-50 text-slate-400 group-hover:bg-emerald-50 group-hover:text-emerald-600 rounded-xl flex items-center justify-center transition-all">
                <stat.icon className="w-5 h-5" />
              </div>
              <span className={`text-[10px] font-black px-2 py-1 rounded-full ${stat.growth.startsWith('+') ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                {stat.growth}
              </span>
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
            <p className="text-2xl font-black text-slate-900 mt-1 tracking-tighter">{stat.value}</p>
          </div>
        ))}
      </div>
    );
  }

  if (activeTab === 'REPORTS') {
    if (moduleId === 'FT-MOD-GENERAL-LEDGER') {
      return <LedgerDashboard />;
    }
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { name: 'Trial Balance', category: 'General Ledger', type: 'FINANCIAL' },
          { name: 'Income Statement', category: 'General Ledger', type: 'FINANCIAL' },
          { name: 'Aging Summary', category: 'Accounts Receivable', type: 'OPERATIONAL' },
          { name: 'Portfolio Quality (PAR)', category: 'Credit', type: 'RISK' },
          { name: 'Switch Settlement Log', category: 'Payments', type: 'RECON' }
        ].map((report, i) => (
          <div key={i} className="bg-white border border-slate-200 p-6 rounded-2xl hover:border-emerald-200 transition-all cursor-pointer group">
            <div className="flex items-center gap-3 mb-4">
               <div className="w-8 h-8 bg-slate-50 text-slate-400 group-hover:bg-emerald-50 group-hover:text-emerald-600 rounded-lg flex items-center justify-center transition-all">
                  <FileText className="w-4 h-4" />
               </div>
               <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{report.category}</span>
            </div>
            <h4 className="text-sm font-black text-slate-900 tracking-tight">{report.name}</h4>
            <div className="mt-4 flex items-center justify-between">
               <span className="px-2 py-1 bg-slate-50 text-slate-500 rounded text-[9px] font-bold uppercase tracking-widest">{report.type}</span>
               <ArrowUpRight className="w-4 h-4 text-slate-300 group-hover:text-emerald-600 transition-all" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (activeTab === 'RECORDS') {
    return (
      <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <h3 className="text-xs font-black uppercase tracking-widest text-slate-500">Registry Snapshot</h3>
          <div className="flex gap-2">
            <button className="p-2 bg-white border border-slate-200 rounded-lg text-slate-400 hover:text-slate-900 transition-all shadow-sm">
              <History className="w-4 h-4" />
            </button>
            <button onClick={onNavigateToTerminal} className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-xs font-black flex items-center gap-2 shadow-lg shadow-emerald-600/20 hover:bg-emerald-700 transition-all">
              <Plus className="w-4 h-4" /> New Record
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50/50 text-[10px] font-black uppercase tracking-widest text-slate-400 border-b border-slate-100">
              <tr>
                <th className="px-6 py-4">{moduleId === 'FT-MOD-GENERAL-LEDGER' ? 'GL Code' : 'Reference'}</th>
                <th className="px-6 py-4">{moduleId === 'FT-MOD-GENERAL-LEDGER' ? 'Account Name' : 'Primary Subject'}</th>
                <th className="px-6 py-4">{moduleId === 'FT-MOD-GENERAL-LEDGER' ? 'Balance' : 'Metric / Status'}</th>
                <th className="px-6 py-4">{moduleId === 'FT-MOD-GENERAL-LEDGER' ? 'Audit Status' : 'Verification'}</th>
                <th className="px-6 py-4">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-xs font-medium text-slate-700">
              {moduleId === 'FT-MOD-MEMBER-KYC' ? (
                [
                  { id: 'MEM-10042', name: 'John Baptist Otim', phone: '+256 772 334455', status: 'VERIFIED' },
                  { id: 'MEM-10043', name: 'Harriet Namukasa', phone: '+256 782 112233', status: 'ACTIVE' },
                  { id: 'MEM-10044', name: 'Mbabazi Farmers Coop', phone: '+256 701 998877', status: 'CORPORATE' }
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-6 py-4 font-mono font-bold text-slate-400 group-hover:text-emerald-600">{row.id}</td>
                    <td className="px-6 py-4">
                      <p className="font-black text-slate-900 tracking-tight">{row.name}</p>
                      <p className="text-[10px] text-slate-400 font-bold">{row.phone}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded text-[9px] font-black uppercase tracking-widest">{row.status}</span>
                    </td>
                    <td className="px-6 py-4 flex items-center gap-2">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Compliant</span>
                    </td>
                    <td className="px-6 py-4">
                      <button onClick={() => onSelectRecord(row.id)} className="text-slate-400 hover:text-emerald-600 transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : moduleId === 'FT-MOD-GENERAL-LEDGER' ? (
                accounts.map((acc: any, i: number) => (
                  <tr key={i} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-6 py-4 font-mono font-bold text-slate-400 group-hover:text-slate-900">{acc.code}</td>
                    <td className="px-6 py-4">
                      <p className="font-black text-slate-900 tracking-tight">{acc.name}</p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{acc.category}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-black text-slate-900">UGX {acc.balance.toLocaleString()}</p>
                    </td>
                    <td className="px-6 py-4 flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${acc.balance === 0 ? 'bg-slate-200' : 'bg-emerald-500'}`} />
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Reconciled</span>
                    </td>
                    <td className="px-6 py-4">
                      <button className="text-slate-400 hover:text-emerald-600 transition-colors">
                        <History className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr className="bg-slate-50/50">
                  <td colSpan={5} className="px-6 py-20 text-center">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-200">
                      <RefreshCw className="w-6 h-6 text-slate-300 animate-spin-slow" />
                    </div>
                    <h4 className="text-sm font-black text-slate-900">Synchronizing Registry</h4>
                    <p className="text-[10px] text-slate-400 font-bold uppercase mt-1">Fetching authoritative financial records from JUMO Core...</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  if (activeTab === 'TERMINAL') {
    return (
      <div className="max-w-3xl mx-auto">
        <div className="bg-white border border-slate-200 rounded-3xl p-10 shadow-xl shadow-slate-200/50 space-y-8">
          <div className="flex items-center gap-4 pb-6 border-b border-slate-100">
            <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center shadow-inner">
              <Plus className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-2xl font-black text-slate-900 tracking-tighter">Operational Terminal</h3>
              <p className="text-xs text-slate-500 font-medium">Execute authorized financial actions for the active module.</p>
            </div>
          </div>

          {moduleId === 'FT-MOD-MEMBER-KYC' && <MemberEnrollForm onSuccess={onSuccess} onCancel={onCancel} />}
          {moduleId === 'FT-MOD-LOAN-UNDERWRITING' && <LoanAppraisalForm onSuccess={onSuccess} onCancel={onCancel} />}
          {moduleId === 'FT-MOD-GENERAL-LEDGER' && <JournalEntryForm onSuccess={onSuccess} onCancel={onCancel} />}
          
          {moduleId !== 'FT-MOD-MEMBER-KYC' && moduleId !== 'FT-MOD-LOAN-UNDERWRITING' && moduleId !== 'FT-MOD-GENERAL-LEDGER' && (
            <div className="py-20 text-center border-2 border-dashed border-slate-100 rounded-3xl">
              <FileText className="w-10 h-10 text-slate-200 mx-auto mb-4" />
              <p className="text-sm font-black text-slate-400 uppercase tracking-widest">Module Action Registry Empty</p>
              <p className="text-[10px] text-slate-400 font-bold mt-2">Reconstruction in progress for this specific functional area.</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  return null;
};
