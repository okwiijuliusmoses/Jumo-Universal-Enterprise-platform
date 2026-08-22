import React, { useState } from 'react';
import { 
  Users, Award, Gift, Calendar, Plus, Search, 
  Filter, Download, DollarSign, TrendingUp, X,
  Globe, Briefcase, HeartHandshake, Link
} from 'lucide-react';
import { PortalAuthenticationGate } from '../../../PortalAuthenticationGate';
import { AlumniService, AlumniRecord, AlumniDonation, AlumniNetworkingRequest } from '../../domain/AlumniService';
import { JumoDataTable } from '../../../../core/enterprise/components/JumoDataTable';
import { JumoForm } from '../../../../core/enterprise/components/JumoForm';
import { JumoWorkflowStatus } from '../../../../core/enterprise/components/JumoWorkflowStatus';

export const AlumniRegistryPortal: React.FC = () => {
  const service = AlumniService.getInstance();
  const [alumni, setAlumni] = useState<AlumniRecord[]>(service.getAlumni());
  const [netRequests, setNetRequests] = useState<AlumniNetworkingRequest[]>(service.getNetworkingRequests());
  const [activeTab, setActiveTab] = useState<'DIRECTORY' | 'NETWORKING'>('DIRECTORY');
  const [showForm, setShowForm] = useState(false);
  const [showNetForm, setShowNetForm] = useState(false);

  const handleRegister = (data: any) => {
    service.registerAlumni({
      ...data,
      graduationYear: Number(data.graduationYear)
    });
    setAlumni([...service.getAlumni()]);
    setShowForm(false);
  };

  const handleNetRequest = (data: any) => {
    service.requestNetworking(data.requesterId, data.targetId, data.purpose);
    setNetRequests([...service.getNetworkingRequests()]);
    setShowNetForm(false);
  };

  const handleApproveNet = (id: string) => {
    service.approveNetworking(id);
    setNetRequests([...service.getNetworkingRequests()]);
  };

  return (
    <PortalAuthenticationGate
      portalId="alumni-registry"
      portalName="Alumni Registry & Life-Membership Office"
      domainContext="JUMO-ALUMNI-ERP"
      requiredRoles={['ROLE_ALUMNI_OFFICER', 'ROLE_ALUMNI_ADMIN']}
      onAuthenticated={() => {}}
    >
      <div className="space-y-6 animate-in fade-in duration-300 pb-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight uppercase italic">Alumni Global Registry</h1>
            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mt-1">
              Census • Professional Networking • Institutional Heritage
            </p>
          </div>
          <div className="flex bg-slate-100 p-1 rounded-xl">
            <button 
              onClick={() => setActiveTab('DIRECTORY')}
              className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'DIRECTORY' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Directory
            </button>
            <button 
              onClick={() => setActiveTab('NETWORKING')}
              className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'NETWORKING' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Networking
            </button>
          </div>
        </div>

        {activeTab === 'DIRECTORY' ? (
          <>
            <div className="flex justify-end gap-3">
              <button 
                onClick={() => setShowForm(true)}
                className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-700 transition shadow-sm"
              >
                <Plus className="w-3.5 h-3.5" /> Register Alumnus
              </button>
            </div>
            <JumoDataTable
              data={alumni}
              title="Global Alumni Database"
              columns={[
                { header: 'ID', accessor: 'id', className: 'font-mono text-xs font-bold text-slate-400' },
                { header: 'Full Name', accessor: 'name', className: 'font-bold' },
                { header: 'Year', accessor: 'graduationYear', className: 'font-mono' },
                { header: 'Profession', accessor: 'currentProfession' },
                { header: 'Status', accessor: (a) => (
                  <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase ${a.membershipStatus === 'LIFE' ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-100 text-slate-600'}`}>
                    {a.membershipStatus}
                  </span>
                )}
              ]}
            />
          </>
        ) : (
          <>
            <div className="flex justify-end gap-3">
              <button 
                onClick={() => setShowNetForm(true)}
                className="flex items-center gap-2 px-6 py-2.5 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-black transition shadow-sm"
              >
                <Link className="w-3.5 h-3.5" /> New Connection
              </button>
            </div>
            <JumoDataTable
              data={netRequests}
              title="Networking & Mentorship Connections"
              columns={[
                { header: 'ID', accessor: 'id', className: 'font-mono text-xs font-bold text-slate-400' },
                { header: 'Purpose', accessor: 'purpose', className: 'font-bold' },
                { header: 'Date', accessor: (r) => new Date(r.date).toLocaleDateString(), className: 'font-mono text-xs' },
                { header: 'Status', accessor: (r) => <JumoWorkflowStatus status={r.status} /> }
              ]}
              actions={(r) => (
                r.status === 'PENDING' && (
                  <button 
                    onClick={() => handleApproveNet(r.id)}
                    className="text-[10px] font-black text-indigo-600 uppercase tracking-widest"
                  >
                    Authorize Connect
                  </button>
                )
              )}
            />
          </>
        )}

        {showForm && (
          <JumoForm
            title="Alumnus Registration"
            fields={[
              { id: 'name', label: 'Full Name', type: 'text', required: true },
              { id: 'graduationYear', label: 'Graduation Year', type: 'number', required: true },
              { id: 'house', label: 'House / Hall', type: 'text' },
              { id: 'currentProfession', label: 'Current Profession', type: 'text', required: true },
              { id: 'contact', label: 'Contact Phone', type: 'text', required: true },
              { id: 'membershipStatus', label: 'Membership', type: 'select', required: true, options: [
                { value: 'REGULAR', label: 'Regular' },
                { value: 'LIFE', label: 'Life Member' },
                { value: 'ANNUAL', label: 'Annual Subscriber' }
              ]}
            ]}
            onSubmit={handleRegister}
            onCancel={() => setShowForm(false)}
          />
        )}

        {showNetForm && (
          <JumoForm
            title="Request Professional Networking"
            fields={[
              { id: 'requesterId', label: 'Requester (Alumnus ID)', type: 'text', required: true },
              { id: 'targetId', label: 'Target (Alumnus ID)', type: 'text', required: true },
              { id: 'purpose', label: 'Networking Purpose', type: 'select', required: true, options: [
                { value: 'Mentorship', label: 'Mentorship' },
                { value: 'Career Lead', label: 'Career Lead' },
                { value: 'Business Partnership', label: 'Business Partnership' }
              ]}
            ]}
            onSubmit={handleNetRequest}
            onCancel={() => setShowNetForm(false)}
          />
        )}
      </div>
    </PortalAuthenticationGate>
  );
};

export const AlumniDonationPortal: React.FC = () => {
  const service = AlumniService.getInstance();
  const [alumni] = useState<AlumniRecord[]>(service.getAlumni());
  const [donations, setDonations] = useState<AlumniDonation[]>(service.getDonations());
  const [showForm, setShowForm] = useState(false);

  const handleDonate = (data: any) => {
    service.recordDonation(data.alumniId, Number(data.amount), data.purpose);
    setDonations([...service.getDonations()]);
    setShowForm(false);
  };

  const handleApprove = (id: string) => {
    service.approveDonation(id);
    setDonations([...service.getDonations()]);
  };

  return (
    <PortalAuthenticationGate
      portalId="alumni-donations"
      portalName="Endowments & Alumni Fundraising Office"
      domainContext="JUMO-FINTECH"
      requiredRoles={['ROLE_ALUMNI_TREASURER', 'ROLE_ALUMNI_ADMIN']}
      onAuthenticated={() => {}}
    >
      <div className="space-y-6 animate-in fade-in duration-300 pb-12">
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight uppercase italic">Endowment Office</h1>
            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mt-1">
              Capital Fundraising • Institutional Endowments • FAAP Ledger
            </p>
          </div>
          <button 
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-700 transition shadow-sm"
          >
            <Gift className="w-3.5 h-3.5" /> Record Donation
          </button>
        </div>

        <JumoDataTable
          data={donations}
          title="Endowment & Donation Registry"
          columns={[
            { header: 'ID', accessor: 'id', className: 'font-mono text-xs font-bold text-slate-400' },
            { header: 'Alumnus', accessor: 'alumniName', className: 'font-bold' },
            { header: 'Purpose', accessor: 'purpose', className: 'text-[10px] font-black text-slate-400' },
            { header: 'Amount', accessor: (d) => (
              <span className="font-mono font-bold text-indigo-600">{d.amount.toLocaleString()} UGX</span>
            ), className: 'text-right' },
            { header: 'Status', accessor: (d) => <JumoWorkflowStatus status={d.status} /> }
          ]}
          actions={(d) => (
            d.status === 'PENDING' && (
              <button 
                onClick={() => handleApprove(d.id)}
                className="text-[10px] font-black text-emerald-600 uppercase tracking-widest"
              >
                Approve & Post
              </button>
            )
          )}
        />

        {showForm && (
          <JumoForm
            title="Record Endowment Contribution"
            fields={[
              { id: 'alumniId', label: 'Donor Alumnus', type: 'select', required: true, options: alumni.map(a => ({ value: a.id, label: `${a.name} (${a.graduationYear})` })) },
              { id: 'purpose', label: 'Endowment Purpose', type: 'select', required: true, options: [
                { value: 'ENDOWMENT', label: 'Endowment' },
                { value: 'INFRASTRUCTURE', label: 'Infrastructure' },
                { value: 'BURSARY', label: 'Bursary' },
                { value: 'GENERAL', label: 'General' }
              ]},
              { id: 'amount', label: 'Contribution Amount (UGX)', type: 'number', required: true }
            ]}
            onSubmit={handleDonate}
            onCancel={() => setShowForm(false)}
          />
        )}
      </div>
    </PortalAuthenticationGate>
  );
};
