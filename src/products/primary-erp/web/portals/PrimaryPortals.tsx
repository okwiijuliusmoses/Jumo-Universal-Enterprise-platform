import React, { useState } from 'react';
import { 
  Users, BookOpen, Calculator, Plus, Search, 
  Filter, Download, DollarSign, TrendingUp, X,
  GraduationCap, ClipboardCheck, Award, FileSpreadsheet
} from 'lucide-react';
import { PortalAuthenticationGate } from '../../../PortalAuthenticationGate';
import { PrimaryService, PrimaryPupil, PLECandidate, AcademicAssessment } from '../../domain/PrimaryService';
import { JumoDataTable } from '../../../../core/enterprise/components/JumoDataTable';
import { JumoForm } from '../../../../core/enterprise/components/JumoForm';
import { JumoWorkflowStatus } from '../../../../core/enterprise/components/JumoWorkflowStatus';

export const PrimaryAdminPortal: React.FC = () => {
  const service = PrimaryService.getInstance();
  const [pupils, setPupils] = useState<PrimaryPupil[]>(service.getPupils());
  const [activeTab, setActiveTab] = useState<'PUPILS' | 'FINANCE'>('PUPILS');
  const [showForm, setShowForm] = useState(false);
  const [showPayForm, setShowPayForm] = useState(false);
  const [selectedPupil, setSelectedPupil] = useState<PrimaryPupil | null>(null);

  const handleRegister = (data: any) => {
    service.registerPupil(data);
    setPupils([...service.getPupils()]);
    setShowForm(false);
  };

  const handlePayment = (data: any) => {
    if (selectedPupil) {
      service.collectFee(selectedPupil.id, Number(data.amount), data.category);
      setPupils([...service.getPupils()]);
      setShowPayForm(false);
      setSelectedPupil(null);
    }
  };

  return (
    <PortalAuthenticationGate
      portalId="primary-admin"
      portalName="Primary Administration & PLE Registration Office"
      domainContext="JUMO-SCHOOL-ERP"
      requiredRoles={['ROLE_PRIMARY_ADMIN', 'ROLE_HEADTEACHER', 'ROLE_SCHOOL_ADMIN']}
      onAuthenticated={() => {}}
    >
      <div className="space-y-6 animate-in fade-in duration-300 pb-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight uppercase italic">Primary Admin Office</h1>
            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mt-1">
              Pupil Census • Fee Tracking • Institutional Logistics
            </p>
          </div>
          <div className="flex bg-slate-100 p-1 rounded-xl">
            <button 
              onClick={() => setActiveTab('PUPILS')}
              className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'PUPILS' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Pupil Register
            </button>
            <button 
              onClick={() => setActiveTab('FINANCE')}
              className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'FINANCE' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Fee Ledger
            </button>
          </div>
        </div>

        {activeTab === 'PUPILS' ? (
          <>
            <div className="flex justify-end gap-3">
              <button 
                onClick={() => setShowForm(true)}
                className="flex items-center gap-2 px-6 py-2.5 bg-emerald-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-700 transition"
              >
                <Plus className="w-3.5 h-3.5" /> Enroll Pupil
              </button>
            </div>
            <JumoDataTable<PrimaryPupil>
              data={pupils}
              title="Active Pupil Roster"
              columns={[
                { header: 'ID', accessor: 'id', className: 'font-mono text-xs font-bold text-slate-400' },
                { header: 'Name', accessor: 'name', className: 'font-bold text-slate-900' },
                { header: 'Class', accessor: 'class', className: 'text-emerald-700 font-bold' },
                { header: 'LIN', accessor: (p) => p.lin, className: 'font-mono text-xs' },
                { header: 'Guardian', accessor: (p) => p.guardian }
              ]}
            />
          </>
        ) : (
          <JumoDataTable<PrimaryPupil>
            data={pupils}
            title="School Fee Ledger"
            columns={[
              { header: 'Pupil Name', accessor: (p) => p.name, className: 'font-bold' },
              { header: 'Class', accessor: (p) => p.class },
              { header: 'Balance', accessor: (p) => (
                <span className="font-mono font-bold text-rose-600">{p.feeBalance.toLocaleString()} UGX</span>
              ), className: 'text-right' }
            ]}
            actions={(p) => (
              <button 
                onClick={() => { setSelectedPupil(p); setShowPayForm(true); }}
                className="text-[10px] font-black text-emerald-600 uppercase tracking-widest"
              >
                Collect Fee
              </button>
            )}
          />
        )}

        {showForm && (
          <JumoForm
            title="Pupil Enrollment"
            fields={[
              { id: 'name', label: 'Full Name', type: 'text', required: true },
              { id: 'class', label: 'Class Placement', type: 'select', required: true, options: [
                { value: 'Primary One', label: 'Primary One' },
                { value: 'Primary Two', label: 'Primary Two' },
                { value: 'Primary Three', label: 'Primary Three' },
                { value: 'Primary Four', label: 'Primary Four' },
                { value: 'Primary Five', label: 'Primary Five' },
                { value: 'Primary Six', label: 'Primary Six' },
                { value: 'Primary Seven', label: 'Primary Seven' }
              ]},
              { id: 'lin', label: 'LIN (Learner Identification Number)', type: 'text' },
              { id: 'guardian', label: 'Guardian Name', type: 'text', required: true },
              { id: 'contact', label: 'Guardian Contact', type: 'text', required: true }
            ]}
            onSubmit={handleRegister}
            onCancel={() => setShowForm(false)}
          />
        )}

        {showPayForm && selectedPupil && (
          <JumoForm
            title={`Post Payment — ${selectedPupil.name}`}
            fields={[
              { id: 'amount', label: 'Amount (UGX)', type: 'number', required: true },
              { id: 'category', label: 'Payment Category', type: 'select', required: true, options: [
                { value: 'Tuition', label: 'Tuition' },
                { value: 'PLE Fees', label: 'PLE Fees' },
                { value: 'Transport', label: 'Transport' },
                { value: 'Feeding', label: 'Feeding' }
              ]}
            ]}
            onSubmit={handlePayment}
            onCancel={() => setShowPayForm(false)}
          />
        )}
      </div>
    </PortalAuthenticationGate>
  );
};

export const PrimaryPleRegistrarPortal: React.FC = () => {
  const service = PrimaryService.getInstance();
  const [candidates, setCandidates] = useState<PLECandidate[]>(service.getPLECandidates());
  const [showForm, setShowForm] = useState(false);
  const [activeTab, setActiveTab] = useState<'CANDIDATES' | 'CENTERS'>('CANDIDATES');
  const pupils = service.getPupils().filter(p => p.class === 'Primary Seven');

  const handleRegister = (data: any) => {
    service.registerPLE(data.pupilId, data.centerNumber);
    setCandidates([...service.getPLECandidates()]);
    setShowForm(false);
  };

  const handleApprove = (id: string) => {
    const index = prompt('Enter UNEB Index Number (e.g. 001234/001):');
    if (index) {
      service.approvePLERegistration(id, index);
      setCandidates([...service.getPLECandidates()]);
    }
  };

  return (
    <PortalAuthenticationGate
      portalId="primary-ple"
      portalName="PLE Examination & Center Registrar Office"
      domainContext="JUMO-SCHOOL-ERP"
      requiredRoles={['ROLE_PRIMARY_ADMIN', 'ROLE_HEADTEACHER']}
      onAuthenticated={() => {}}
    >
      <div className="space-y-6 animate-in fade-in duration-300 pb-12">
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <div>
            <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight italic">PLE Registrar Office</h2>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">UNEB Center Logistics • Candidate Indexing • Exam Management</p>
          </div>
          <button 
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-700 transition"
          >
            <GraduationCap className="w-3.5 h-3.5" /> Register Candidate
          </button>
        </div>

        <JumoDataTable
          data={candidates}
          title="PLE Candidate Index"
          columns={[
            { header: 'Candidate ID', accessor: 'id', className: 'font-mono text-xs font-bold text-slate-400' },
            { header: 'Pupil Name', accessor: 'pupilName', className: 'font-bold' },
            { header: 'Center No.', accessor: 'centerNumber', className: 'font-mono' },
            { header: 'Index No.', accessor: (c) => c.indexNumber || 'NOT ASSIGNED', className: 'font-mono font-bold text-blue-600' },
            { header: 'Status', accessor: (c) => <JumoWorkflowStatus status={c.status} /> }
          ]}
          actions={(c) => (
            c.status === 'PENDING' && (
              <button 
                onClick={() => handleApprove(c.id)}
                className="text-[10px] font-black text-blue-600 uppercase tracking-widest"
              >
                Assign Index
              </button>
            )
          )}
        />

        {showForm && (
          <JumoForm
            title="PLE Candidate Registration"
            fields={[
              { id: 'pupilId', label: 'Select P.7 Pupil', type: 'select', required: true, options: pupils.map(p => ({ value: p.id, label: p.name })) },
              { id: 'centerNumber', label: 'UNEB Center Number', type: 'text', required: true, placeholder: 'e.g. U0123' }
            ]}
            onSubmit={handleRegister}
            onCancel={() => setShowForm(false)}
          />
        )}
      </div>
    </PortalAuthenticationGate>
  );
};
