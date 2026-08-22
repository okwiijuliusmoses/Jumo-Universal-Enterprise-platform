import React, { useState } from 'react';
import { 
  School, Users, BookOpen, Calculator, Microscope, Laptop, 
  Library, ShieldAlert, Award, Calendar, CheckCircle2, Plus, 
  Search, Filter, Download, DollarSign, TrendingUp, Landmark,
  FileText, ClipboardList, X, ArrowRight, Wallet, History
} from 'lucide-react';
import { PortalAuthenticationGate } from '../../../PortalAuthenticationGate';
import { 
  SecondaryService, 
  SecondaryStudent, 
  AcademicAssessment, 
  FeeWaiverRequest 
} from '../../domain/SecondaryService';
import { JumoDataTable } from '../../../../core/enterprise/components/JumoDataTable';
import { JumoForm } from '../../../../core/enterprise/components/JumoForm';
import { JumoWorkflowStatus } from '../../../../core/enterprise/components/JumoWorkflowStatus';

export const SecondarySenatePortal: React.FC = () => {
  const service = SecondaryService.getInstance();
  const students = service.getStudents();
  const assessments = service.getAssessments();
  
  return (
    <PortalAuthenticationGate
      portalId="secondary-senate"
      portalName="Principal & Secondary Senate Governance Office"
      domainContext="JUMO-SCHOOL-ERP"
      requiredRoles={['ROLE_SECONDARY_HEADTEACHER', 'ROLE_HEADTEACHER', 'ROLE_SCHOOL_ADMIN']}
      onAuthenticated={() => {}}
    >
      <div className="space-y-6 animate-in fade-in duration-300 pb-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight uppercase">Principal's Office & Senate</h1>
            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mt-1">
              Institutional Governance • Academic Policy • Financial Oversight
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Enrollment Status</span>
            <div className="flex items-end justify-between mt-2">
              <p className="text-3xl font-black text-slate-900 font-mono leading-none">{students.length}</p>
              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">Active</span>
            </div>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Financial Health</span>
            <div className="flex items-end justify-between mt-2">
              <p className="text-xl font-black text-slate-900 font-mono leading-none">
                {((1 - (students.reduce((acc, s) => acc + s.feeBalance, 0) / (students.length * 1500000))) * 100).toFixed(1)}%
              </p>
              <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">Collections</span>
            </div>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Academic Pulse</span>
            <div className="flex items-end justify-between mt-2">
              <p className="text-3xl font-black text-slate-900 font-mono leading-none">{assessments.length}</p>
              <span className="text-[10px] font-bold text-amber-600 uppercase tracking-widest">Assessments</span>
            </div>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">System Integrity</span>
            <div className="flex items-end justify-between mt-2 text-emerald-600">
              <ShieldAlert className="w-6 h-6" />
              <span className="text-[10px] font-black uppercase tracking-widest">Sovereign Active</span>
            </div>
          </div>
        </div>

        <div className="bg-slate-900 p-8 rounded-3xl text-white overflow-hidden relative">
          <div className="relative z-10 space-y-4">
            <h2 className="text-2xl font-black uppercase tracking-tighter max-w-md">Governance Control Center</h2>
            <p className="text-slate-400 text-sm max-w-sm font-medium">
              Oversee cross-departmental workflows, authorize high-value expenditures, and monitor real-time institutional performance metrics.
            </p>
            <div className="flex gap-3 pt-2">
              <button className="bg-white text-slate-900 px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-100 transition-colors">
                Senate Reports
              </button>
              <button className="bg-slate-800 text-white border border-slate-700 px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-700 transition-colors">
                Audit Logs
              </button>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/20 rounded-full blur-3xl -mr-20 -mt-20" />
        </div>
      </div>
    </PortalAuthenticationGate>
  );
};

export const SecondaryRegistrarPortal: React.FC = () => {
  const service = SecondaryService.getInstance();
  const [students, setStudents] = useState<SecondaryStudent[]>(service.getStudents());
  const [showForm, setShowForm] = useState(false);
  const [editingStudent, setEditingStudent] = useState<SecondaryStudent | null>(null);

  const handleRegister = (data: any) => {
    if (editingStudent) {
      service.updateStudent(editingStudent.id, data);
    } else {
      service.registerStudent(data);
    }
    setStudents([...service.getStudents()]);
    setShowForm(false);
    setEditingStudent(null);
  };

  return (
    <PortalAuthenticationGate
      portalId="secondary-registrar"
      portalName="Secondary Registrar & UNEB Center Administration"
      domainContext="JUMO-SCHOOL-ERP"
      requiredRoles={['ROLE_SECONDARY_REGISTRAR', 'ROLE_HEADTEACHER', 'ROLE_SCHOOL_ADMIN']}
      onAuthenticated={() => {}}
    >
      <div className="space-y-6 animate-in fade-in duration-300 pb-12">
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <div>
            <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">Student Information System (SIS)</h2>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Enrollment • Academic Tracks • LIN Verification</p>
          </div>
          <button 
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-700 transition shadow-lg shadow-blue-100"
          >
            <Plus className="w-3.5 h-3.5" /> Register Student
          </button>
        </div>

        <JumoDataTable
          data={students}
          columns={[
            { header: 'Student ID', accessor: 'id', className: 'font-mono text-xs font-bold text-slate-400' },
            { header: 'Full Name', accessor: 'name', className: 'font-bold text-slate-900' },
            { header: 'Class', accessor: 'class' },
            { header: 'Combination', accessor: (s) => s.combination || 'N/A', className: 'text-slate-500 italic' },
            { header: 'Status', accessor: (s) => (
              <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase ${s.status === 'ACTIVE' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-50 text-slate-400'}`}>
                {s.status}
              </span>
            )}
          ]}
          actions={(s) => (
            <button 
              onClick={() => { setEditingStudent(s); setShowForm(true); }}
              className="text-[10px] font-black text-blue-600 uppercase tracking-widest"
            >
              Update
            </button>
          )}
        />

        {showForm && (
          <JumoForm
            title={editingStudent ? "Update Student Profile" : "Admit New Student"}
            initialData={editingStudent || { class: 'Senior One' }}
            fields={[
              { id: 'name', label: 'Full Legal Name', type: 'text', required: true, placeholder: 'e.g. John Doe' },
              { id: 'class', label: 'Current Class', type: 'select', required: true, options: [
                { value: 'Senior One', label: 'Senior One' },
                { value: 'Senior Two', label: 'Senior Two' },
                { value: 'Senior Three', label: 'Senior Three' },
                { value: 'Senior Four', label: 'Senior Four' },
                { value: 'Senior Five', label: 'Senior Five' },
                { value: 'Senior Six', label: 'Senior Six' }
              ]},
              { id: 'guardian', label: 'Primary Guardian', type: 'text', required: true },
              { id: 'combination', label: 'A-Level Combination', type: 'text', placeholder: 'e.g. PCM/Sub-Math (For S5/S6)' },
              { id: 'indexNumber', label: 'UNEB Index Number', type: 'text', placeholder: 'e.g. U0001/001' }
            ]}
            onSubmit={handleRegister}
            onCancel={() => { setShowForm(false); setEditingStudent(null); }}
          />
        )}
      </div>
    </PortalAuthenticationGate>
  );
};

export const SecondaryBursarPortal: React.FC = () => {
  const service = SecondaryService.getInstance();
  const [students] = useState<SecondaryStudent[]>(service.getStudents());
  const [waivers, setWaivers] = useState<FeeWaiverRequest[]>(service.getWaivers());
  const [activeTab, setActiveTab] = useState<'FEES' | 'WAIVERS'>('FEES');
  const [showPayForm, setShowPayForm] = useState(false);
  const [showWaiverForm, setShowWaiverForm] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<SecondaryStudent | null>(null);

  const handlePayment = (data: any) => {
    if (selectedStudent) {
      service.collectFee(selectedStudent.id, Number(data.amount), data.category);
      setShowPayForm(false);
      setSelectedStudent(null);
    }
  };

  const handleWaiver = (data: any) => {
    service.requestWaiver({
      studentId: data.studentId,
      amount: Number(data.amount),
      reason: data.reason
    });
    setWaivers([...service.getWaivers()]);
    setShowWaiverForm(false);
  };

  const handleApproveWaiver = (id: string) => {
    service.approveWaiver(id, 'Headteacher (Authorized)');
    setWaivers([...service.getWaivers()]);
  };

  return (
    <PortalAuthenticationGate
      portalId="secondary-bursar"
      portalName="Secondary Bursar & FAAP Financial Ledger"
      domainContext="JUMO-FINTECH"
      requiredRoles={['ROLE_SECONDARY_BURSAR', 'ROLE_HEADTEACHER', 'ROLE_SCHOOL_ADMIN']}
      onAuthenticated={() => {}}
    >
      <div className="space-y-6 animate-in fade-in duration-300 pb-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">Finance & Bursar Office</h2>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Fee Collections • Sub-Ledgers • FAAP Integration</p>
          </div>
          <div className="flex bg-slate-100 p-1 rounded-xl">
            <button 
              onClick={() => setActiveTab('FEES')}
              className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'FEES' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Fee Accounts
            </button>
            <button 
              onClick={() => setActiveTab('WAIVERS')}
              className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'WAIVERS' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Waiver Workflows
            </button>
          </div>
        </div>

        {activeTab === 'FEES' ? (
          <JumoDataTable
            data={students}
            title="Student Financial Ledgers"
            columns={[
              { header: 'Student', accessor: 'name', className: 'font-bold text-slate-900' },
              { header: 'Class', accessor: 'class' },
              { header: 'Outstanding Balance', accessor: (s) => (
                <span className="font-mono font-bold text-rose-600">{s.feeBalance.toLocaleString()} UGX</span>
              ), className: 'text-right' },
              { header: 'Payment Status', accessor: (s) => (
                <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase ${s.feeBalance <= 0 ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                  {s.feeBalance <= 0 ? 'Fully Paid' : 'Balance Due'}
                </span>
              )}
            ]}
            actions={(s) => (
              <div className="flex items-center justify-end gap-3">
                <button 
                  onClick={() => { setSelectedStudent(s); setShowPayForm(true); }}
                  className="text-[10px] font-black text-amber-600 uppercase tracking-widest"
                >
                  Post Payment
                </button>
              </div>
            )}
          />
        ) : (
          <div className="space-y-4">
            <div className="flex justify-end">
              <button 
                onClick={() => setShowWaiverForm(true)}
                className="px-6 py-2 bg-indigo-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-700 transition"
              >
                Request Waiver
              </button>
            </div>
            <JumoDataTable
              data={waivers}
              title="Waiver Approval Queue"
              columns={[
                { header: 'Waiver ID', accessor: 'id', className: 'font-mono text-xs font-bold text-slate-400' },
                { header: 'Student ID', accessor: 'studentId' },
                { header: 'Requested Amount', accessor: (w) => `${w.amount.toLocaleString()} UGX`, className: 'font-mono font-bold text-slate-900' },
                { header: 'Reason', accessor: 'reason', className: 'max-w-xs truncate' },
                { header: 'Workflow Status', accessor: (w) => <JumoWorkflowStatus status={w.status} /> }
              ]}
              actions={(w) => (
                w.status === 'PENDING' && (
                  <button 
                    onClick={() => handleApproveWaiver(w.id)}
                    className="text-[10px] font-black text-emerald-600 uppercase tracking-widest"
                  >
                    Authorize
                  </button>
                )
              )}
            />
          </div>
        )}

        {showPayForm && selectedStudent && (
          <JumoForm
            title={`Post Payment — ${selectedStudent.name}`}
            fields={[
              { id: 'amount', label: 'Amount (UGX)', type: 'number', required: true },
              { id: 'category', label: 'Payment Category', type: 'select', required: true, options: [
                { value: 'Tuition', label: 'Tuition Fees' },
                { value: 'Boarding', label: 'Boarding Fees' },
                { value: 'Uniform', label: 'Uniform & Essentials' },
                { value: 'Functional', label: 'Functional Fees' }
              ]},
              { id: 'ref', label: 'Receipt Reference', type: 'text', placeholder: 'e.g. BNK-123456' }
            ]}
            onSubmit={handlePayment}
            onCancel={() => { setShowPayForm(false); setSelectedStudent(null); }}
          />
        )}

        {showWaiverForm && (
          <JumoForm
            title="Fee Waiver Request"
            fields={[
              { id: 'studentId', label: 'Student ID', type: 'select', required: true, options: students.map(s => ({ value: s.id, label: `${s.name} (${s.id})` })) },
              { id: 'amount', label: 'Waiver Amount (UGX)', type: 'number', required: true },
              { id: 'reason', label: 'Reason for Waiver', type: 'textarea', required: true }
            ]}
            onSubmit={handleWaiver}
            onCancel={() => setShowWaiverForm(false)}
          />
        )}
      </div>
    </PortalAuthenticationGate>
  );
};

export const SecondaryHodPortal: React.FC = () => {
  const service = SecondaryService.getInstance();
  const students = service.getStudents();
  const [assessments, setAssessments] = useState<AcademicAssessment[]>(service.getAssessments());
  const [showForm, setShowForm] = useState(false);

  const handleRecord = (data: any) => {
    service.recordScore({
      studentId: data.studentId,
      subject: data.subject,
      score: Number(data.score),
      type: data.type,
      term: 'Term 1',
      year: 2026
    });
    setAssessments([...service.getAssessments()]);
    setShowForm(false);
  };

  const handleApprove = (id: string) => {
    service.approveAssessment(id, 'Academic Director (Authorized)');
    setAssessments([...service.getAssessments()]);
  };

  return (
    <PortalAuthenticationGate
      portalId="secondary-dos"
      portalName="DOS Academic & Subject Combination Office"
      domainContext="JUMO-SCHOOL-ERP"
      requiredRoles={['ROLE_SECONDARY_DOS', 'ROLE_HEADTEACHER', 'ROLE_SCHOOL_ADMIN']}
      onAuthenticated={() => {}}
    >
      <div className="space-y-6 animate-in fade-in duration-300 pb-12">
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <div>
            <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">Academic Department (HOD/DOS)</h2>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Gradebook • Assessments • Results Validation</p>
          </div>
          <button 
            onClick={() => setShowForm(true)}
            className="px-6 py-2.5 bg-emerald-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-700 transition"
          >
            Record Score
          </button>
        </div>

        <JumoDataTable
          data={assessments}
          title="Gradebook & Assessment Registry"
          columns={[
            { header: 'Student ID', accessor: 'studentId', className: 'font-mono text-xs font-bold text-slate-400' },
            { header: 'Subject', accessor: 'subject', className: 'font-bold' },
            { header: 'Score', accessor: (a) => <span className="font-mono font-black">{a.score}%</span> },
            { header: 'Type', accessor: 'type' },
            { header: 'Workflow', accessor: (a) => <JumoWorkflowStatus status={a.status} /> }
          ]}
          actions={(a) => (
            a.status === 'PENDING' && (
              <button 
                onClick={() => handleApprove(a.id)}
                className="text-[10px] font-black text-emerald-600 uppercase tracking-widest"
              >
                Validate
              </button>
            )
          )}
        />

        {showForm && (
          <JumoForm
            title="Record Student Assessment"
            fields={[
              { id: 'studentId', label: 'Student', type: 'select', required: true, options: students.map(s => ({ value: s.id, label: s.name })) },
              { id: 'subject', label: 'Subject', type: 'select', required: true, options: [
                { value: 'Mathematics', label: 'Mathematics' },
                { value: 'English', label: 'English' },
                { value: 'Physics', label: 'Physics' },
                { value: 'Chemistry', label: 'Chemistry' },
                { value: 'Biology', label: 'Biology' },
                { value: 'Geography', label: 'Geography' },
                { value: 'History', label: 'History' }
              ]},
              { id: 'score', label: 'Score Percentage', type: 'number', required: true },
              { id: 'type', label: 'Assessment Type', type: 'select', required: true, options: [
                { value: 'MID-TERM', label: 'Mid-Term Exam' },
                { value: 'END-OF-TERM', label: 'End of Term Exam' },
                { value: 'MOCK', label: 'Mock Exam' }
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
