import React, { useState } from 'react';
import { 
  Baby, HeartPulse, Sparkles, BookOpen, ShieldCheck, DollarSign, 
  Users, CheckCircle2, Award, Calendar, Clock, Plus, Search, Filter, Download, X,
  ShieldAlert, Camera, Phone, UserCheck
} from 'lucide-react';
import { PortalAuthenticationGate } from '../../../PortalAuthenticationGate';
import { NurseryService, NurseryLearner, ECDMilestone, PickupAuthorization } from '../../domain/NurseryService';
import { JumoDataTable } from '../../../../core/enterprise/components/JumoDataTable';
import { JumoForm } from '../../../../core/enterprise/components/JumoForm';
import { JumoWorkflowStatus } from '../../../../core/enterprise/components/JumoWorkflowStatus';

export const NurseryAdminPortal: React.FC = () => {
  const service = NurseryService.getInstance();
  const [learners, setLearners] = useState<NurseryLearner[]>(service.getLearners());
  const [pickups, setPickups] = useState<PickupAuthorization[]>(service.getPickupAuthorizations());
  const [activeTab, setActiveTab] = useState<'LEARNERS' | 'PICKUPS'>('LEARNERS');
  const [showForm, setShowForm] = useState(false);
  const [showPayForm, setShowPayForm] = useState(false);
  const [showPickupForm, setShowPickupForm] = useState(false);
  const [selectedLearner, setSelectedLearner] = useState<NurseryLearner | null>(null);

  const handleRegister = (data: any) => {
    service.registerLearner(data);
    setLearners([...service.getLearners()]);
    setShowForm(false);
  };

  const handlePayment = (data: any) => {
    if (selectedLearner) {
      service.collectFee(selectedLearner.id, Number(data.amount), data.category);
      setLearners([...service.getLearners()]);
      setShowPayForm(false);
      setSelectedLearner(null);
    }
  };

  const handlePickupAuth = (data: any) => {
    service.requestPickupAuthorization(data);
    setPickups([...service.getPickupAuthorizations()]);
    setShowPickupForm(false);
  };

  const handleApprovePickup = (id: string) => {
    service.approvePickup(id);
    setPickups([...service.getPickupAuthorizations()]);
  };

  return (
    <PortalAuthenticationGate
      portalId="nursery-admin"
      portalName="Nursery Administration & Infant Enrollment Office"
      domainContext="JUMO-SCHOOL-ERP"
      requiredRoles={['ROLE_NURSERY_ADMIN', 'ROLE_SCHOOL_ADMIN', 'ROLE_HEADTEACHER']}
      onAuthenticated={() => {}}
    >
      <div className="space-y-6 animate-in fade-in duration-300 pb-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight uppercase italic">Nursery Admin & Enrollment</h1>
            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mt-1">
              ECD Infrastructure • Learner Welfare • Institutional Logistics
            </p>
          </div>
          <div className="flex bg-slate-100 p-1 rounded-xl">
            <button 
              onClick={() => setActiveTab('LEARNERS')}
              className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'LEARNERS' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Toddler Register
            </button>
            <button 
              onClick={() => setActiveTab('PICKUPS')}
              className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'PICKUPS' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Pickup Control
            </button>
          </div>
        </div>

        {activeTab === 'LEARNERS' ? (
          <>
            <div className="flex justify-end gap-3">
              <button 
                onClick={() => setShowForm(true)}
                className="flex items-center gap-2 px-6 py-2.5 bg-pink-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-pink-700 transition"
              >
                <Plus className="w-3.5 h-3.5" /> Enroll Toddler
              </button>
            </div>
            <JumoDataTable<NurseryLearner>
              data={learners}
              title="Active Learner Roster"
              columns={[
                { header: 'ID', accessor: 'id', className: 'font-mono text-xs font-bold text-slate-400' },
                { header: 'Name', accessor: 'name', className: 'font-bold text-slate-900' },
                { header: 'Age', accessor: 'age' },
                { header: 'Class', accessor: 'nurseryClass', className: 'text-pink-600 font-bold' },
                { header: 'Guardian', accessor: (l) => (
                  <div>
                    <p className="font-bold">{l.guardian}</p>
                    <p className="text-[10px] text-slate-400 font-mono">{l.contact}</p>
                  </div>
                )},
                { header: 'Balance', accessor: (l) => (
                  <span className="font-mono font-bold text-rose-600">{l.feeBalance.toLocaleString()} UGX</span>
                ), className: 'text-right' }
              ]}
              actions={(l) => (
                <button 
                  onClick={() => { setSelectedLearner(l); setShowPayForm(true); }}
                  className="text-[10px] font-black text-pink-600 uppercase tracking-widest"
                >
                  Pay Fees
                </button>
              )}
            />
          </>
        ) : (
          <>
            <div className="flex justify-end gap-3">
              <button 
                onClick={() => setShowPickupForm(true)}
                className="flex items-center gap-2 px-6 py-2.5 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-black transition"
              >
                <ShieldAlert className="w-3.5 h-3.5" /> Authorize Pickup
              </button>
            </div>
            <JumoDataTable<PickupAuthorization>
              data={pickups}
              title="Pickup Security Authorizations"
              columns={[
                { header: 'ID', accessor: 'id', className: 'font-mono text-xs font-bold text-slate-400' },
                { header: 'Authorized Person', accessor: 'authorizedPerson', className: 'font-bold' },
                { header: 'Relation', accessor: (p) => p.relation },
                { header: 'ID / Card No.', accessor: 'idNumber', className: 'font-mono' },
                { header: 'Status', accessor: (p) => <JumoWorkflowStatus status={p.status} /> }
              ]}
              actions={(p) => (
                p.status === 'PENDING' && (
                  <button 
                    onClick={() => handleApprovePickup(p.id)}
                    className="text-[10px] font-black text-emerald-600 uppercase tracking-widest"
                  >
                    Approve Auth
                  </button>
                )
              )}
            />
          </>
        )}

        {showForm && (
          <JumoForm
            title="Toddler Enrollment"
            fields={[
              { id: 'name', label: 'Learner Name', type: 'text', required: true },
              { id: 'age', label: 'Current Age (e.g. 3 yrs)', type: 'text', required: true },
              { id: 'nurseryClass', label: 'Class Allocation', type: 'select', required: true, options: [
                { value: 'Baby Class A', label: 'Baby Class A' },
                { value: 'Middle Class B', label: 'Middle Class B' },
                { value: 'Top Class A', label: 'Top Class A' }
              ]},
              { id: 'guardian', label: 'Guardian Name', type: 'text', required: true },
              { id: 'contact', label: 'Guardian Contact', type: 'text', required: true }
            ]}
            onSubmit={handleRegister}
            onCancel={() => setShowForm(false)}
          />
        )}

        {showPayForm && selectedLearner && (
          <JumoForm
            title={`Collect Fee — ${selectedLearner.name}`}
            fields={[
              { id: 'amount', label: 'Amount to Pay (UGX)', type: 'number', required: true },
              { id: 'category', label: 'Fee Category', type: 'select', required: true, options: [
                { value: 'Tuition', label: 'Tuition' },
                { value: 'Feeding', label: 'Feeding' },
                { value: 'Transport', label: 'Transport' },
                { value: 'Uniform', label: 'Uniform' }
              ]}
            ]}
            onSubmit={handlePayment}
            onCancel={() => setShowPayForm(false)}
          />
        )}

        {showPickupForm && (
          <JumoForm
            title="Request Pickup Authorization"
            fields={[
              { id: 'learnerId', label: 'Learner', type: 'select', required: true, options: learners.map(l => ({ value: l.id, label: l.name })) },
              { id: 'authorizedPerson', label: 'Full Name of Authorized Person', type: 'text', required: true },
              { id: 'relation', label: 'Relation to Child', type: 'text', required: true },
              { id: 'idNumber', label: 'ID Card / NIN Number', type: 'text', required: true }
            ]}
            onSubmit={handlePickupAuth}
            onCancel={() => setShowPickupForm(false)}
          />
        )}
      </div>
    </PortalAuthenticationGate>
  );
};

export const NurseryEcdMilestonesPortal: React.FC = () => {
  const service = NurseryService.getInstance();
  const [milestones, setMilestones] = useState<ECDMilestone[]>(service.getAllMilestones());
  const [showForm, setShowForm] = useState(false);
  const learners = service.getLearners();

  const handleRecord = (data: any) => {
    service.recordMilestone({
      learnerId: data.learnerId,
      milestone: data.milestone,
      category: data.category,
      status: data.status,
      observer: 'Lead Caregiver'
    });
    setMilestones([...service.getAllMilestones()]);
    setShowForm(false);
  };

  const handleApprove = (id: string) => {
    service.approveMilestone(id);
    setMilestones([...service.getAllMilestones()]);
  };

  return (
    <PortalAuthenticationGate
      portalId="nursery-ecd"
      portalName="ECD Developmental Milestones & Safeguarding Console"
      domainContext="JUMO-SCHOOL-ERP"
      requiredRoles={['ROLE_NURSERY_ADMIN', 'ROLE_HEADTEACHER', 'ROLE_SCHOOL_ADMIN']}
      onAuthenticated={() => {}}
    >
      <div className="space-y-6 animate-in fade-in duration-300 pb-12">
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <div>
            <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">ECD Milestones Office</h2>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Motor Skills • Language Acquisition • Cognitive Evolution</p>
          </div>
          <button 
            onClick={() => setShowForm(true)}
            className="px-6 py-2.5 bg-purple-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-purple-700 transition"
          >
            Record Observation
          </button>
        </div>

        <JumoDataTable<ECDMilestone>
          data={milestones}
          title="Milestone Observations Registry"
          columns={[
            { header: 'Learner ID', accessor: (m) => m.learnerId, className: 'font-mono text-xs font-bold text-slate-400' },
            { header: 'Observation', accessor: (m) => m.milestone, className: 'font-bold' },
            { header: 'Category', accessor: (m) => m.category, className: 'text-[10px] font-black text-slate-400' },
            { header: 'Proficiency', accessor: (m) => (
              <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase ${m.status === 'EXCEEDED' ? 'bg-indigo-100 text-indigo-700' : 'bg-emerald-100 text-emerald-700'}`}>
                {m.status}
              </span>
            )},
            { header: 'Workflow', accessor: (m) => <JumoWorkflowStatus status={m.workflowStatus} /> }
          ]}
          actions={(m) => (
            m.workflowStatus === 'PENDING' && (
              <button 
                onClick={() => handleApprove(m.id)}
                className="text-[10px] font-black text-purple-600 uppercase tracking-widest"
              >
                Validate
              </button>
            )
          )}
        />

        {showForm && (
          <JumoForm
            title="Record ECD Observation"
            fields={[
              { id: 'learnerId', label: 'Learner', type: 'select', required: true, options: learners.map(l => ({ value: l.id, label: l.name })) },
              { id: 'milestone', label: 'Milestone Observation', type: 'textarea', required: true, placeholder: 'Describe the developmental achievement...' },
              { id: 'category', label: 'Category', type: 'select', required: true, options: [
                { value: 'MOTOR', label: 'Motor Skills' },
                { value: 'LANGUAGE', label: 'Language & Phonics' },
                { value: 'SOCIAL', label: 'Social & Emotional' },
                { value: 'COGNITIVE', label: 'Cognitive & Math' }
              ]},
              { id: 'status', label: 'Proficiency Level', type: 'select', required: true, options: [
                { value: 'DEVELOPING', label: 'Developing' },
                { value: 'ACHIEVED', label: 'Achieved' },
                { value: 'EXCEEDED', label: 'Exceeded' }
              ]}
            ]}
            onSubmit={handleRecord}
            onCancel={() => setShowForm(false)}
          />
        )}
      </div>
    </PortalAuthenticationGate>
  );
};
