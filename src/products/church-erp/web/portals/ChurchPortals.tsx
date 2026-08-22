import React, { useState } from 'react';
import { 
  Church, Users, Heart, Coins, Cross, MapPin, 
  Calendar, CheckCircle2, ShieldCheck, Music, 
  Plus, Search, Filter, Download, DollarSign, 
  TrendingUp, Landmark, FileText, ClipboardList, X,
  UserPlus, HeartHandshake, BookOpen, MessageSquare
} from 'lucide-react';
import { PortalAuthenticationGate } from '../../../PortalAuthenticationGate';
import { ChurchService, ChurchMember, ChurchTransaction, CounselingRequest, WelfareAssistance } from '../../domain/ChurchService';
import { JumoDataTable } from '../../../../core/enterprise/components/JumoDataTable';
import { JumoForm } from '../../../../core/enterprise/components/JumoForm';
import { JumoWorkflowStatus } from '../../../../core/enterprise/components/JumoWorkflowStatus';

export const ChurchSecretariatPortal: React.FC = () => {
  const service = ChurchService.getInstance();
  const [members, setMembers] = useState<ChurchMember[]>(service.getMembers());
  const [showForm, setShowForm] = useState(false);

  const handleRegister = (data: any) => {
    service.registerMember(data);
    setMembers([...service.getMembers()]);
    setShowForm(false);
  };

  return (
    <PortalAuthenticationGate
      portalId="church-secretariat"
      portalName="Church Secretariat & Membership Office"
      domainContext="JUMO-CHURCH-ERP"
      requiredRoles={['ROLE_CHURCH_SECRETARY', 'ROLE_PASTOR', 'ROLE_CHURCH_ADMIN']}
      onAuthenticated={() => {}}
    >
      <div className="space-y-6 animate-in fade-in duration-300 pb-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight uppercase italic">Ecclesia Secretariat</h1>
            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mt-1">
              Membership Census • Department Allocation • Institutional Records
            </p>
          </div>
          <button 
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 px-6 py-2.5 bg-emerald-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-700 transition shadow-sm"
          >
            <UserPlus className="w-3.5 h-3.5" /> Add Member
          </button>
        </div>

        <JumoDataTable
          data={members}
          title="Congregation Master Register"
          columns={[
            { header: 'ID', accessor: 'id', className: 'font-mono text-xs font-bold text-slate-400' },
            { header: 'Full Name', accessor: 'name', className: 'font-bold text-slate-900' },
            { header: 'Department', accessor: 'department' },
            { header: 'Contact', accessor: 'contact', className: 'font-mono text-xs' },
            { header: 'Status', accessor: (m) => (
              <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase border ${m.membershipStatus === 'ACTIVE' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-slate-50 text-slate-500 border-slate-100'}`}>
                {m.membershipStatus}
              </span>
            )}
          ]}
        />

        {showForm && (
          <JumoForm
            title="New Member Registration"
            fields={[
              { id: 'name', label: 'Full Name', type: 'text', required: true },
              { id: 'department', label: 'Department / Fellowship', type: 'select', required: true, options: [
                { value: 'Choir', label: 'Choir' },
                { value: 'Men\'s Fellowship', label: 'Men\'s Fellowship' },
                { value: 'Women\'s Guild', label: 'Women\'s Guild' },
                { value: 'Youth Ministry', label: 'Youth Ministry' },
                { value: 'Sunday School', label: 'Sunday School' }
              ]},
              { id: 'contact', label: 'Contact Phone', type: 'text', required: true },
              { id: 'membershipStatus', label: 'Status', type: 'select', required: true, options: [
                { value: 'ACTIVE', label: 'Active' },
                { value: 'VISITOR', label: 'Visitor' }
              ]}
            ]}
            onSubmit={handleRegister}
            onCancel={() => setShowForm(false)}
          />
        )}
      </div>
    </PortalAuthenticationGate>
  );
};

export const ChurchFinancePortal: React.FC = () => {
  const service = ChurchService.getInstance();
  const [members] = useState<ChurchMember[]>(service.getMembers());
  const [transactions, setTransactions] = useState<ChurchTransaction[]>(service.getTransactions());
  const [welfareRequests, setWelfareRequests] = useState<WelfareAssistance[]>(service.getWelfareRequests());
  const [activeTab, setActiveTab] = useState<'CONTRIBUTIONS' | 'WELFARE'>('CONTRIBUTIONS');
  const [showForm, setShowForm] = useState(false);
  const [showWelfareForm, setShowWelfareForm] = useState(false);

  const handlePost = (data: any) => {
    service.recordContribution(data.memberId, Number(data.amount), data.type);
    setTransactions([...service.getTransactions()]);
    setShowForm(false);
  };

  const handleWelfareRequest = (data: any) => {
    service.requestWelfare(data);
    setWelfareRequests([...service.getWelfareRequests()]);
    setShowWelfareForm(false);
  };

  const handleApproveWelfare = (id: string) => {
    service.approveWelfare(id);
    setWelfareRequests([...service.getWelfareRequests()]);
    setTransactions([...service.getTransactions()]); // Might reflect in cashbook
  };

  return (
    <PortalAuthenticationGate
      portalId="church-finance"
      portalName="Church Treasury & FAAP Finance Office"
      domainContext="JUMO-FINTECH"
      requiredRoles={['ROLE_CHURCH_TREASURER', 'ROLE_PASTOR', 'ROLE_CHURCH_ADMIN']}
      onAuthenticated={() => {}}
    >
      <div className="space-y-6 animate-in fade-in duration-300 pb-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight uppercase italic">Ecclesia Treasury</h1>
            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mt-1">
              Financial Stewardship • FAAP Integration • Welfare Distribution
            </p>
          </div>
          <div className="flex bg-slate-100 p-1 rounded-xl">
            <button 
              onClick={() => setActiveTab('CONTRIBUTIONS')}
              className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'CONTRIBUTIONS' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Collections
            </button>
            <button 
              onClick={() => setActiveTab('WELFARE')}
              className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'WELFARE' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Welfare Office
            </button>
          </div>
        </div>

        {activeTab === 'CONTRIBUTIONS' ? (
          <>
            <div className="flex justify-end">
              <button 
                onClick={() => setShowForm(true)}
                className="px-6 py-2.5 bg-amber-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-amber-700 transition shadow-sm"
              >
                Record Offering
              </button>
            </div>
            <JumoDataTable
              data={transactions}
              title="Ecclesia Financial Transactions"
              columns={[
                { header: 'Date', accessor: (t) => new Date(t.date).toLocaleDateString(), className: 'font-mono text-xs text-slate-400' },
                { header: 'Member', accessor: 'memberName', className: 'font-bold' },
                { header: 'Category', accessor: 'type', className: 'text-[10px] font-black text-slate-400' },
                { header: 'Amount', accessor: (t) => (
                  <span className="font-mono font-bold text-emerald-600">{t.amount.toLocaleString()} UGX</span>
                ), className: 'text-right' }
              ]}
            />
          </>
        ) : (
          <>
            <div className="flex justify-end">
              <button 
                onClick={() => setShowWelfareForm(true)}
                className="px-6 py-2.5 bg-rose-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-rose-700 transition shadow-sm"
              >
                Request Assistance
              </button>
            </div>
            <JumoDataTable
              data={welfareRequests}
              title="Member Welfare Assistance Requests"
              columns={[
                { header: 'Date', accessor: (r) => new Date(r.date).toLocaleDateString(), className: 'font-mono text-xs text-slate-400' },
                { header: 'Member', accessor: 'memberName', className: 'font-bold' },
                { header: 'Category', accessor: 'needCategory' },
                { header: 'Requested', accessor: (r) => (
                  <span className="font-mono font-bold text-slate-900">{r.requestedAmount.toLocaleString()} UGX</span>
                ), className: 'text-right' },
                { header: 'Status', accessor: (r) => <JumoWorkflowStatus status={r.status} /> }
              ]}
              actions={(r) => (
                r.status === 'PENDING' && (
                  <button 
                    onClick={() => handleApproveWelfare(r.id)}
                    className="text-[10px] font-black text-emerald-600 uppercase tracking-widest"
                  >
                    Disburse Fund
                  </button>
                )
              )}
            />
          </>
        )}

        {showForm && (
          <JumoForm
            title="Record Contribution"
            fields={[
              { id: 'memberId', label: 'Member', type: 'select', required: true, options: members.map(m => ({ value: m.id, label: m.name })) },
              { id: 'type', label: 'Category', type: 'select', required: true, options: [
                { value: 'TITHE', label: 'Tithe' },
                { value: 'OFFERING', label: 'Offering' },
                { value: 'PROJECT', label: 'Project Fund' },
                { value: 'THANKSGIVING', label: 'Thanksgiving' }
              ]},
              { id: 'amount', label: 'Amount (UGX)', type: 'number', required: true }
            ]}
            onSubmit={handlePost}
            onCancel={() => setShowForm(false)}
          />
        )}

        {showWelfareForm && (
          <JumoForm
            title="Welfare Assistance Application"
            fields={[
              { id: 'memberId', label: 'Applicant', type: 'select', required: true, options: members.map(m => ({ value: m.id, label: m.name })) },
              { id: 'needCategory', label: 'Category of Need', type: 'select', required: true, options: [
                { value: 'MEDICAL', label: 'Medical Emergency' },
                { value: 'EDUCATION', label: 'Education Support' },
                { value: 'BEREAVEMENT', label: 'Bereavement' },
                { value: 'FOOD', label: 'Food & Basic Needs' }
              ]},
              { id: 'requestedAmount', label: 'Requested Amount (UGX)', type: 'number', required: true },
              { id: 'description', label: 'Description of Circumstances', type: 'textarea', required: true }
            ]}
            onSubmit={handleWelfareRequest}
            onCancel={() => setShowWelfareForm(false)}
          />
        )}
      </div>
    </PortalAuthenticationGate>
  );
};

export const ChurchPastorPortal: React.FC = () => {
  const service = ChurchService.getInstance();
  const [counseling, setCounseling] = useState<CounselingRequest[]>(service.getCounselingRequests());
  const [showForm, setShowForm] = useState(false);
  const members = service.getMembers();

  const handleRequest = (data: any) => {
    service.requestCounseling(data);
    setCounseling([...service.getCounselingRequests()]);
    setShowForm(false);
  };

  const handleApprove = (id: string) => {
    service.approveCounseling(id);
    setCounseling([...service.getCounselingRequests()]);
  };

  return (
    <PortalAuthenticationGate
      portalId="church-pastor"
      portalName="Pastor & Ecclesiastical Leadership Office"
      domainContext="JUMO-CHURCH-ERP"
      requiredRoles={['ROLE_PASTOR', 'ROLE_CHURCH_ADMIN']}
      onAuthenticated={() => {}}
    >
      <div className="space-y-6 animate-in fade-in duration-300 pb-12">
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight uppercase italic">Pastor's Office</h1>
            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mt-1">
              Spiritual Guidance • Counseling Workflows • Ecclesiastical Oversight
            </p>
          </div>
          <button 
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-700 transition shadow-sm"
          >
            <MessageSquare className="w-3.5 h-3.5" /> Book Counseling
          </button>
        </div>

        <JumoDataTable
          data={counseling}
          title="Pastoral Counseling Queue"
          columns={[
            { header: 'ID', accessor: 'id', className: 'font-mono text-xs font-bold text-slate-400' },
            { header: 'Member', accessor: 'memberName', className: 'font-bold' },
            { header: 'Topic / Need', accessor: 'topic' },
            { header: 'Preferred Date', accessor: 'preferredDate', className: 'font-mono text-xs' },
            { header: 'Workflow', accessor: (c) => <JumoWorkflowStatus status={c.status} /> }
          ]}
          actions={(c) => (
            c.status === 'PENDING' && (
              <button 
                onClick={() => handleApprove(c.id)}
                className="text-[10px] font-black text-blue-600 uppercase tracking-widest"
              >
                Accept Appointment
              </button>
            )
          )}
        />

        {showForm && (
          <JumoForm
            title="Book Pastoral Counseling"
            fields={[
              { id: 'memberId', label: 'Member', type: 'select', required: true, options: members.map(m => ({ value: m.id, label: m.name })) },
              { id: 'topic', label: 'Primary Topic', type: 'text', required: true, placeholder: 'e.g. Family, Career, Spiritual growth' },
              { id: 'preferredDate', label: 'Preferred Date', type: 'date', required: true }
            ]}
            onSubmit={handleRequest}
            onCancel={() => setShowForm(false)}
          />
        )}
      </div>
    </PortalAuthenticationGate>
  );
};
