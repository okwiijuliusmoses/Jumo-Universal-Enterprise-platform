import React, { useState, useMemo } from 'react';
import { 
  Building2, Users, ShieldCheck, Award, FileText, CheckCircle2, 
  AlertTriangle, Plus, Download, TrendingUp, Calendar, Clock, ChevronRight
} from 'lucide-react';
import { JumoDataTable } from '../../../../../core/enterprise/components/JumoDataTable';
import { JumoForm } from '../../../../../core/enterprise/components/JumoForm';
import { resolveModuleDataSummary } from '../../../../../core/enterprise/registry/JumoDataResolutionService';

// ==========================================
// 1. HEAD TEACHER EXECUTIVE OFFICE
// ==========================================
export const PrimaryHeadTeacherPortal: React.FC = () => {
  // Use dynamic data resolution
  const dataSummary = useMemo(() => resolveModuleDataSummary('MOD_EDU_ADMISSIONS'), []); // Enrollment data from Admissions module
  const academicSummary = useMemo(() => resolveModuleDataSummary('MOD_EDU_ACADEMICS'), []); // Attendance/PLE from Academics
  const financeSummary = useMemo(() => resolveModuleDataSummary('MOD_EDU_FINANCE'), []); // Finance from Finance module
  
  const [decisions, setDecisions] = useState([
    { id: 'DEC-01', title: 'Approval of Term 3 PLE Candidate Mock Budget', category: 'ACADEMIC', status: 'APPROVED', date: '2026-08-15', officer: 'Head Teacher' },
    { id: 'DEC-02', title: 'School Bus #3 Engine Overhaul Requisition', category: 'OPERATIONS', status: 'APPROVED', date: '2026-08-18', officer: 'Head Teacher' },
    { id: 'DEC-03', title: 'Recruitment of Senior Science Teacher', category: 'HR', status: 'IN_REVIEW', date: '2026-08-20', officer: 'Deputy Head Teacher' }
  ]);
  const [showForm, setShowForm] = useState(false);

  const handleCreateDecision = (data: any) => {
    setDecisions([...decisions, {
      id: `DEC-0${decisions.length + 1}`,
      title: data.title,
      category: data.category,
      status: 'APPROVED',
      date: new Date().toISOString().split('T')[0],
      officer: 'Head Teacher'
    }]);
    setShowForm(false);
  };

  const enrollmentKpi = dataSummary.kpis.find(k => k.title === 'Total Enrolled Learners');
  const attendanceKpi = academicSummary.kpis.find(k => k.title === 'Daily Attendance');
  const pleKpi = academicSummary.kpis.find(k => k.title === 'P.7 PLE Candidates');
  const tuitionKpi = financeSummary.kpis.find(k => k.title === 'Tuition Collections');

  return (
    <div className="h-full flex flex-col bg-slate-50 font-sans pb-12">
      <div className="bg-white border-b border-slate-200 px-6 py-4 shrink-0 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-indigo-100 text-indigo-700 rounded-xl">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-black text-slate-900 tracking-tight uppercase italic">Head Teacher Executive Office</h1>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">
              Sovereign Primary Executive Governance • Institutional KPIs • Decisions Register
            </p>
          </div>
        </div>
        <button 
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-700 transition"
        >
          <Plus className="w-3.5 h-3.5" /> Log Executive Decision
        </button>
      </div>

      <div className="flex-1 overflow-auto p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{enrollmentKpi?.title || 'Enrollment'}</span>
            <div className="text-2xl font-black text-slate-900 mt-1">{enrollmentKpi?.value || '---'} {enrollmentKpi?.unit || ''}</div>
            <span className="text-[10px] text-emerald-600 font-bold mt-1">{attendanceKpi?.value || '--'}% {attendanceKpi?.title || 'Attendance'}</span>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{pleKpi?.title || 'PLE'}</span>
            <div className="text-2xl font-black text-indigo-600 mt-1">{pleKpi?.value || '---'} {pleKpi?.unit || ''}</div>
            <span className="text-[10px] text-emerald-600 font-bold mt-1">100% PLE Registration Cleared</span>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Teaching & Non-Teaching Staff</span>
            <div className="text-2xl font-black text-slate-900 mt-1">68 Staff</div>
            <span className="text-[10px] text-slate-500 font-bold mt-1">Zero Staff Vacancies</span>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500">{tuitionKpi?.title || 'Collections'}</span>
            <div className="text-2xl font-black text-emerald-600 mt-1">94.2% Collected</div>
            <span className="text-[10px] text-slate-500 font-bold mt-1">FAAP Ledger Reconciled</span>
          </div>
        </div>

        <JumoDataTable
          data={decisions}
          title="Executive Decisions & Directives Registry"
          columns={[
            { header: 'Decision Ref', accessor: 'id', className: 'font-mono text-xs font-bold text-slate-400' },
            { header: 'Title / Subject Matter', accessor: 'title', className: 'font-bold' },
            { header: 'Category', accessor: 'category', className: 'font-mono text-xs font-bold text-indigo-600' },
            { header: 'Authorized By', accessor: 'officer', className: 'text-xs text-slate-700' },
            { header: 'Status', accessor: (d: any) => (
              <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase ${d.status === 'APPROVED' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                {d.status}
              </span>
            )},
            { header: 'Date', accessor: 'date', className: 'text-xs text-slate-400' }
          ]}
        />

        {showForm && (
          <JumoForm
            title="Log Executive Decision / Directive"
            fields={[
              { id: 'title', label: 'Decision Directive Title', type: 'text', required: true },
              { id: 'category', label: 'Department / Scope', type: 'select', required: true, options: [
                { value: 'ACADEMIC', label: 'Academic & Curriculum' },
                { value: 'FINANCE', label: 'Finance & Bursar' },
                { value: 'OPERATIONS', label: 'Operations & Estates' },
                { value: 'HR', label: 'Human Resources' },
                { value: 'WELFARE', label: 'Student Welfare & Safety' }
              ]}
            ]}
            onSubmit={handleCreateDecision}
            onCancel={() => setShowForm(false)}
          />
        )}
      </div>
    </div>
  );
};

// ==========================================
// 2. SCHOOL MANAGEMENT COMMITTEE (SMC)
// ==========================================
export const PrimarySmcPortal: React.FC = () => {
  const [resolutions] = useState([
    { id: 'SMC-RES-01', meeting: 'Term 2 AGM 2026', subject: 'Construction of New ICT & Robotics Wing', budget: '250,000,000 UGX', status: 'ADOPTED', date: '2026-06-12' },
    { id: 'SMC-RES-02', meeting: 'Special Committee Meeting', subject: 'Staff Welfare & Housing Allowance Increase', budget: '45,000,000 UGX', status: 'ADOPTED', date: '2026-07-20' },
    { id: 'SMC-RES-03', meeting: 'Quarterly Audit Committee', subject: 'External Financial Audit Review 2025/2026', budget: '12,000,000 UGX', status: 'IN_PROGRESS', date: '2026-08-10' }
  ]);

  return (
    <div className="h-full flex flex-col bg-slate-50 font-sans pb-12">
      <div className="bg-white border-b border-slate-200 px-6 py-4 shrink-0 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-purple-100 text-purple-700 rounded-xl">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-black text-slate-900 tracking-tight uppercase italic">School Management Committee (SMC)</h1>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">
              Board Resolutions • Foundation Body Oversight • Community Governance
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">SMC Committee Members</span>
            <div className="text-2xl font-black text-slate-900 mt-1">12 Members</div>
            <span className="text-[10px] text-slate-500 font-bold mt-1">Foundation Body, PTA, MoES Reps</span>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Approved Capital Projects</span>
            <div className="text-2xl font-black text-purple-600 mt-1">3 Active Projects</div>
            <span className="text-[10px] text-emerald-600 font-bold mt-1">All on Schedule</span>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Next Scheduled AGM</span>
            <div className="text-2xl font-black text-slate-900 mt-1">15 Oct 2026</div>
            <span className="text-[10px] text-indigo-600 font-bold mt-1">Term 3 Review Session</span>
          </div>
        </div>

        <JumoDataTable
          data={resolutions}
          title="Formal SMC Resolutions & Policy Decrees"
          columns={[
            { header: 'Resolution ID', accessor: 'id', className: 'font-mono text-xs font-bold text-slate-400' },
            { header: 'Meeting Reference', accessor: 'meeting', className: 'font-bold' },
            { header: 'Subject Matter', accessor: 'subject', className: 'text-xs text-slate-700 font-bold' },
            { header: 'Allocated Budget', accessor: 'budget', className: 'font-mono font-bold text-indigo-600 text-right' },
            { header: 'Status', accessor: (r: any) => (
              <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase ${r.status === 'ADOPTED' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                {r.status}
              </span>
            )},
            { header: 'Date', accessor: 'date', className: 'text-xs text-slate-400' }
          ]}
        />
      </div>
    </div>
  );
};

// ==========================================
// 3. QUALITY ASSURANCE & INSPECTION
// ==========================================
export const PrimaryQualityPortal: React.FC = () => {
  const [inspections] = useState([
    { id: 'QA-2026-01', subject: 'P.7 Mathematics Pedagogical Delivery', teacher: 'Tr. Musoke Timothy', score: '96%', verdict: 'EXEMPLARY', date: '2026-08-14' },
    { id: 'QA-2026-02', subject: 'P.4 Science Practical Demonstration', teacher: 'Tr. Babirye Prossy', score: '91%', verdict: 'EXEMPLARY', date: '2026-08-16' },
    { id: 'QA-2026-03', subject: 'Early Childhood Phonics & Reading Clinic', teacher: 'Tr. Akello Joyce', score: '88%', verdict: 'GOOD', date: '2026-08-19' }
  ]);

  return (
    <div className="h-full flex flex-col bg-slate-50 font-sans pb-12">
      <div className="bg-white border-b border-slate-200 px-6 py-4 shrink-0 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-emerald-100 text-emerald-700 rounded-xl">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-black text-slate-900 tracking-tight uppercase italic">Quality Assurance & Curriculum Inspection</h1>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">
              Pedagogical Standards • Classroom Audits • Teacher Scorecards • MoES Compliance
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Average QA Scorecard</span>
            <div className="text-2xl font-black text-emerald-600 mt-1">92.4% Score</div>
            <span className="text-[10px] text-emerald-600 font-bold mt-1">Top Tier National Rating</span>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Classrooms Audited This Term</span>
            <div className="text-2xl font-black text-slate-900 mt-1">24 / 28 Classes</div>
            <span className="text-[10px] text-indigo-600 font-bold mt-1">85% Audit Coverage</span>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Lesson Plans Submitted</span>
            <div className="text-2xl font-black text-slate-900 mt-1">100% on Time</div>
            <span className="text-[10px] text-emerald-600 font-bold mt-1">Verified by DOS</span>
          </div>
        </div>

        <JumoDataTable
          data={inspections}
          title="Classroom Observation & Inspection Reports"
          columns={[
            { header: 'Audit Ref', accessor: 'id', className: 'font-mono text-xs font-bold text-slate-400' },
            { header: 'Curriculum Area', accessor: 'subject', className: 'font-bold' },
            { header: 'Teacher Observed', accessor: 'teacher', className: 'text-xs text-slate-700 font-bold' },
            { header: 'Score', accessor: 'score', className: 'font-bold text-emerald-600 text-center' },
            { header: 'Verdict', accessor: (i: any) => (
              <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-700 text-[9px] font-black uppercase">{i.verdict}</span>
            )},
            { header: 'Date', accessor: 'date', className: 'text-xs text-slate-400' }
          ]}
        />
      </div>
    </div>
  );
};
