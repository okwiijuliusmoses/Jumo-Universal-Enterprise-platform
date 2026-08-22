
import React, { useState } from 'react';
import { 
  Building2, Users, BookOpen, DollarSign, Heart, ShieldCheck, 
  Clipboard, GraduationCap, Landmark, Activity, Zap, Search, Plus, Filter, Download, Globe, ShieldAlert,
  PieChart, History, HandCoins, FileCheck
} from 'lucide-react';
import { PortalAuthenticationGate } from '../../../PortalAuthenticationGate';
import { FintechService, SaccoMember, SaccoLoan, TreasuryAsset } from '../../domain/FintechService';
import { JumoDataTable } from '../../../../core/enterprise/components/JumoDataTable';
import { JumoForm } from '../../../../core/enterprise/components/JumoForm';
import { JumoWorkflowStatus } from '../../../../core/enterprise/components/JumoWorkflowStatus';

export const FintechExecutivePortal: React.FC = () => {
  const service = FintechService.getInstance();
  const [assets] = useState<TreasuryAsset[]>(service.getAssets());
  const totalValuation = assets.reduce((acc, a) => acc + a.valuation, 0);

  return (
    <PortalAuthenticationGate
      portalId="fintech-exec"
      portalName="Fintech Executive Office (C-Suite)"
      domainContext="JUMO-FINTECH"
      requiredRoles={['ROLE_FINTECH_ADMIN', 'ROLE_CEO']}
      onAuthenticated={() => {}}
    >
      <div className="space-y-6 animate-in fade-in duration-300 pb-12">
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight uppercase italic">Fintech Treasury Office</h1>
            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mt-1">
              Capital Markets • Institutional Assets • Master Ledger
            </p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest">
            <PieChart className="w-3.5 h-3.5" /> Total AUM: {totalValuation.toLocaleString()} UGX
          </div>
        </div>

        <JumoDataTable
          data={assets}
          title="Institutional Asset Registry"
          columns={[
            { header: 'Asset ID', accessor: 'id', className: 'font-mono text-xs font-bold text-slate-400' },
            { header: 'Asset Name', accessor: 'name', className: 'font-bold' },
            { header: 'Type', accessor: (a) => (
              <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 text-[9px] font-black uppercase">{a.type}</span>
            )},
            { header: 'Valuation', accessor: (a) => (
              <span className="font-mono font-bold text-slate-900">{a.valuation.toLocaleString()} UGX</span>
            ), className: 'text-right' },
            { header: 'Last Audit', accessor: (a) => new Date(a.lastAudited).toLocaleDateString(), className: 'text-xs text-slate-400' }
          ]}
        />
      </div>
    </PortalAuthenticationGate>
  );
};

export const SaccoManagementPortal: React.FC = () => {
  const service = FintechService.getInstance();
  const [members, setMembers] = useState<SaccoMember[]>(service.getMembers());
  const [loans, setLoans] = useState<SaccoLoan[]>(service.getLoans());
  const [activeTab, setActiveTab] = useState<'MEMBERS' | 'LOANS'>('MEMBERS');
  const [showMemberForm, setShowMemberForm] = useState(false);
  const [showLoanForm, setShowLoanForm] = useState(false);

  const handleRegisterMember = (data: any) => {
    service.registerMember(data);
    setMembers([...service.getMembers()]);
    setShowMemberForm(false);
  };

  const handleRequestLoan = (data: any) => {
    service.requestLoan(data.memberId, Number(data.amount));
    setLoans([...service.getLoans()]);
    setShowLoanForm(false);
  };

  const handleApproveLoan = (id: string) => {
    service.approveLoan(id);
    setLoans([...service.getLoans()]);
    setMembers([...service.getMembers()]);
  };

  return (
    <PortalAuthenticationGate
      portalId="sacco-mgmt"
      portalName="SACCO & Microfinance Operations Office"
      domainContext="JUMO-FINTECH"
      requiredRoles={['ROLE_FINTECH_USER', 'ROLE_FINTECH_ADMIN']}
      onAuthenticated={() => {}}
    >
      <div className="space-y-6 animate-in fade-in duration-300 pb-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight uppercase italic">SACCO Operations Office</h1>
            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mt-1">
              Member Savings • Credit Underwriting • JLG Microfinance
            </p>
          </div>
          <div className="flex bg-slate-100 p-1 rounded-xl">
            <button 
              onClick={() => setActiveTab('MEMBERS')}
              className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'MEMBERS' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Members
            </button>
            <button 
              onClick={() => setActiveTab('LOANS')}
              className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'LOANS' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Loan Registry
            </button>
          </div>
        </div>

        {activeTab === 'MEMBERS' ? (
          <>
            <div className="flex justify-end gap-3">
              <button 
                onClick={() => setShowMemberForm(true)}
                className="flex items-center gap-2 px-6 py-2.5 bg-emerald-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-700 transition"
              >
                <Plus className="w-3.5 h-3.5" /> Register Member
              </button>
            </div>
            <JumoDataTable
              data={members}
              title="SACCO Member Directory"
              columns={[
                { header: 'No.', accessor: 'memberNumber', className: 'font-mono text-xs font-bold text-slate-400' },
                { header: 'Name', accessor: 'name', className: 'font-bold' },
                { header: 'Savings', accessor: (m) => (
                  <span className="font-mono font-bold text-slate-900">{m.savingsBalance.toLocaleString()}</span>
                ), className: 'text-right' },
                { header: 'Loan Bal.', accessor: (m) => (
                  <span className="font-mono font-bold text-rose-600">{m.loanBalance.toLocaleString()}</span>
                ), className: 'text-right' },
                { header: 'Shares', accessor: 'shares', className: 'text-center font-bold' },
                { header: 'Status', accessor: (m) => <JumoWorkflowStatus status={m.status} /> }
              ]}
              actions={(m) => (
                m.status === 'PENDING' && (
                  <button 
                    onClick={() => { service.approveMember(m.id); setMembers([...service.getMembers()]); }}
                    className="text-[10px] font-black text-emerald-600 uppercase tracking-widest"
                  >
                    Authorize
                  </button>
                )
              )}
            />
          </>
        ) : (
          <>
            <div className="flex justify-end gap-3">
              <button 
                onClick={() => setShowLoanForm(true)}
                className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-700 transition"
              >
                <HandCoins className="w-3.5 h-3.5" /> Request Loan
              </button>
            </div>
            <JumoDataTable
              data={loans}
              title="SACCO Loan Application Index"
              columns={[
                { header: 'Loan ID', accessor: 'id', className: 'font-mono text-xs font-bold text-slate-400' },
                { header: 'Member', accessor: 'memberName', className: 'font-bold' },
                { header: 'Principal', accessor: (l) => (
                  <span className="font-mono font-bold text-slate-900">{l.amount.toLocaleString()}</span>
                ), className: 'text-right' },
                { header: 'Interest', accessor: (l) => `${l.interestRate}%`, className: 'text-center' },
                { header: 'Status', accessor: (l) => <JumoWorkflowStatus status={l.status} /> }
              ]}
              actions={(l) => (
                l.status === 'PENDING' && (
                  <button 
                    onClick={() => handleApproveLoan(l.id)}
                    className="text-[10px] font-black text-indigo-600 uppercase tracking-widest"
                  >
                    Approve & Disburse
                  </button>
                )
              )}
            />
          </>
        )}

        {showMemberForm && (
          <JumoForm
            title="Member Registration"
            fields={[
              { id: 'name', label: 'Full Name', type: 'text', required: true },
              { id: 'memberNumber', label: 'Membership No.', type: 'text', required: true, placeholder: 'SAC-2026-XXX' },
              { id: 'shares', label: 'Initial Shares', type: 'number', required: true }
            ]}
            onSubmit={handleRegisterMember}
            onCancel={() => setShowMemberForm(false)}
          />
        )}

        {showLoanForm && (
          <JumoForm
            title="Loan Application"
            fields={[
              { id: 'memberId', label: 'Select Member', type: 'select', required: true, options: members.filter(m => m.status === 'APPROVED').map(m => ({ value: m.id, label: `${m.name} (${m.memberNumber})` })) },
              { id: 'amount', label: 'Loan Amount (UGX)', type: 'number', required: true },
              { id: 'tenureMonths', label: 'Tenure (Months)', type: 'number', required: true }
            ]}
            onSubmit={handleRequestLoan}
            onCancel={() => setShowLoanForm(false)}
          />
        )}
      </div>
    </PortalAuthenticationGate>
  );
};

export const FintechCompliancePortal: React.FC = () => (
  <PortalAuthenticationGate
    portalId="fintech-compliance"
    portalName="Compliance & Risk Office (AML/KYC)"
    domainContext="JUMO-FINTECH"
    requiredRoles={['ROLE_FINTECH_ADMIN', 'ROLE_COMPLIANCE_OFFICER']}
    onAuthenticated={() => {}}
  >
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight uppercase italic">Compliance & Risk Office</h1>
          <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mt-1">
            AML Monitoring • KYC Verification • Regulatory Reporting
          </p>
        </div>
      </div>
      <div className="bg-white border border-slate-200 rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-4 text-rose-600 font-black text-[10px] uppercase tracking-widest">
          <ShieldAlert className="w-4 h-4" />
          Critical Security & Compliance Alerts
        </div>
        <div className="space-y-2">
          {[
            { msg: 'High-value transaction alert: 150,000,000 UGX (Account #9942)', priority: 'HIGH' },
            { msg: 'KYC Review Pending: 1,420 new signups from Regional Chapters', priority: 'MEDIUM' },
            { msg: 'Quarterly FIA Regulatory Report Due: 4 days', priority: 'URGENT' }
          ].map((alert, idx) => (
            <div key={idx} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100 hover:border-slate-200 transition-colors">
              <span className="text-xs text-slate-700 font-bold">{alert.msg}</span>
              <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase ${alert.priority === 'URGENT' ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-700'}`}>
                {alert.priority}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </PortalAuthenticationGate>
);
