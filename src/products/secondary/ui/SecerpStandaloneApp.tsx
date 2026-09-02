import React, { useState } from 'react';
import { 
  BookOpen, Users, GraduationCap, Building2, Shield, ArrowLeft, 
  Search, Plus, CheckCircle2, ChevronRight, UserCheck, Send, Eye, Award
} from 'lucide-react';
import { SECERP_MANIFEST } from '../manifest';
import { SECERP_MODULES } from '../modules';
import { alumniClient } from '../../../platforms/contracts/alumniContract';
import { EnterpriseWorkspaceLayout } from '../../../components/EnterpriseWorkspaceLayout';

export interface SecerpStandaloneAppProps {
  onBackToLauncher?: () => void;
}

// SECERP Officer Portals Definition
const SECERP_PORTALS = [
  {
    id: 'SEC-PORTAL-HEADMASTER',
    code: 'HEADMASTER_COCKPIT',
    title: 'Headteacher & Principal Governance Cockpit',
    role: 'Principal / Headmaster',
    office: 'Headteacher Executive Suite',
    directorate: 'Directorate of School Governance & Institutional Planning',
    moduleIds: ['SEC-MOD-STUDENT-REGISTRY', 'SEC-MOD-CURRICULUM-UNEB', 'SEC-MOD-BOARDING-HOUSE', 'SEC-MOD-ALUMNI-TRANSITION', 'SEC-MOD-FEES-ACCOUNTING']
  },
  {
    id: 'SEC-PORTAL-DOS',
    code: 'ACADEMIC_MASTER_PORTAL',
    title: 'Director of Studies (DOS) & UNEB Center Control',
    role: 'Academic Master / DOS',
    office: 'Academic Registry & Examinations Office',
    directorate: 'Directorate of Academic Affairs & UNEB Center',
    moduleIds: ['SEC-MOD-STUDENT-REGISTRY', 'SEC-MOD-CURRICULUM-UNEB', 'SEC-MOD-LABORATORY-STORES']
  },
  {
    id: 'SEC-PORTAL-HOUSEMASTER',
    code: 'BOARDING_WELFARE_PORTAL',
    title: 'Housemaster & Boarding Student Welfare Portal',
    role: 'Senior Housemaster / Dormitory Warden',
    office: 'Boarding Housemaster Office',
    directorate: 'Directorate of Student Welfare & Boarding Life',
    moduleIds: ['SEC-MOD-STUDENT-REGISTRY', 'SEC-MOD-BOARDING-HOUSE', 'SEC-MOD-DISCIPLINE-PREFECTS']
  },
  {
    id: 'SEC-PORTAL-BURSAR',
    code: 'SCHOOL_BURSAR_TERMINAL',
    title: 'School Bursar & Financial Accounts Terminal',
    role: 'School Bursar / Finance Officer',
    office: 'Bursary & Accounts Desk',
    directorate: 'Directorate of Finance & Alumni Handoff',
    moduleIds: ['SEC-MOD-FEES-ACCOUNTING', 'SEC-MOD-ALUMNI-TRANSITION']
  }
];

export function SecerpStandaloneApp({ onBackToLauncher }: SecerpStandaloneAppProps) {
  const [activePortalId, setActivePortalId] = useState<string>('SEC-PORTAL-DOS');
  const [activeModuleId, setActiveModuleId] = useState<string>('SEC-MOD-CURRICULUM-UNEB');
  const [activeTab, setActiveTab] = useState<'RECORDS' | 'FORM' | 'ANALYTICS'>('RECORDS');
  const [searchQuery, setSearchQuery] = useState('');
  const [executionMessage, setExecutionMessage] = useState<string | null>(null);

  const [formState, setFormState] = useState<Record<string, string>>({});

  const currentPortal = SECERP_PORTALS.find(p => p.id === activePortalId) || SECERP_PORTALS[1];
  const availableModules = SECERP_MODULES.filter(m => currentPortal.moduleIds.includes(m.id));
  const currentModule = SECERP_MODULES.find(m => m.id === activeModuleId) || availableModules[0] || SECERP_MODULES[0];

  // Live Secondary School Datasets (Namilyango College Benchmark)
  const [students, setStudents] = useState([
    { id: 'NAM-3001', name: 'Andrew Ssebaggala', classStream: 'S.4 West', unebIndex: 'U0048/012', house: 'Mutesa House', combination: 'PCM/ICT', feeStatus: 'CLEARED' },
    { id: 'NAM-3002', name: 'David K. Ochieng', classStream: 'S.6 Physics', unebIndex: 'U0048/504', house: 'Kuipers House', combination: 'BCM/SubMath', feeStatus: 'PARTIAL' },
    { id: 'NAM-3003', name: 'Emmanuel Kato', classStream: 'S.6 Arts', unebIndex: 'U0048/519', house: 'Biermans House', combination: 'HEL/Divinity', feeStatus: 'CLEARED' }
  ]);

  const [unebCandidates] = useState([
    { id: 'UNEB-01', student: 'David K. Ochieng', centerNo: 'U0048', indexNo: 'U0048/504', level: 'UACE (A-Level)', subjectsCount: 4, status: 'REGISTERED' },
    { id: 'UNEB-02', student: 'Emmanuel Kato', centerNo: 'U0048', indexNo: 'U0048/519', level: 'UACE (A-Level)', subjectsCount: 4, status: 'REGISTERED' },
    { id: 'UNEB-03', student: 'Andrew Ssebaggala', centerNo: 'U0048', indexNo: 'U0048/012', level: 'UCE (O-Level)', subjectsCount: 8, status: 'VERIFIED' }
  ]);

  const [alumniTransfers, setAlumniTransfers] = useState([
    { id: 'ALUM-101', student: 'Emmanuel Kato', classCohort: 'Class of 2026', alumniNo: 'NAM-ALUM-2026-044', status: 'HANDOVER_COMPLETE' }
  ]);

  const handleSwitchPortal = (portalId: string) => {
    setActivePortalId(portalId);
    const targetPortal = SECERP_PORTALS.find(p => p.id === portalId);
    if (targetPortal && targetPortal.moduleIds.length > 0) {
      setActiveModuleId(targetPortal.moduleIds[0]);
    }
    setExecutionMessage(null);
  };

  const handleExecuteAction = (actionName: string) => {
    setExecutionMessage(null);

    if (activeModuleId === 'SEC-MOD-ALUMNI-TRANSITION') {
      const studentName = formState['studentName'] || 'Graduating Learner';
      const cohort = formState['cohort'] || 'Class of 2026';

      // Call JUMO Alumni Contract
      const record = alumniClient.registerProfile({
        fullName: studentName,
        email: 'alumni@namilyango.sc.ug',
        phoneNumber: formState['phone'] || '+256 700 000000',
        institutionId: 'U0048-NAMILYANGO',
        institutionName: 'Namilyango College',
        graduationYear: 2026,
        level: 'A_LEVEL',
        cohortName: cohort,
        currentProfession: 'Student / Graduate Candidate',
        chapterId: 'CHAP-KAMPALA',
        isMentorAvailable: true,
        totalDonationsUGX: 0
      });

      setAlumniTransfers([
        { id: `ALUM-${Math.floor(100 + Math.random() * 900)}`, student: studentName, classCohort: cohort, alumniNo: record.id, status: 'HANDOVER_COMPLETE' },
        ...alumniTransfers
      ]);

      setExecutionMessage(`Graduating student [${studentName}] handed over to JUMO Alumni Sovereign Network. Alumni ID: ${record.id}.`);
    }
    else if (activeModuleId === 'SEC-MOD-STUDENT-REGISTRY') {
      const name = formState['studentName'] || 'New Secondary Learner';
      const stream = formState['classStream'] || 'S.1 North';
      const house = formState['house'] || 'Mutesa House';

      const newStudent = {
        id: `NAM-${Math.floor(3000 + Math.random() * 9000)}`,
        name,
        classStream: stream,
        unebIndex: `U0048/${Math.floor(100 + Math.random() * 800)}`,
        house,
        combination: formState['combination'] || 'General O-Level',
        feeStatus: 'PARTIAL'
      };

      setStudents([newStudent, ...students]);
      setExecutionMessage(`Enrolled secondary student [${name}] into ${stream} and allocated to ${house}.`);
    }

    setFormState({});
    setActiveTab('RECORDS');
  };

  const moduleSidebarOptions = availableModules.map(m => ({
    id: m.id,
    code: m.code,
    name: m.name,
    description: m.description,
    icon: BookOpen
  }));

  return (
    <EnterpriseWorkspaceLayout
      productCode={SECERP_MANIFEST.code}
      productName={SECERP_MANIFEST.name}
      benchmarkBadge="NAMILYANGO COLLEGE BENCHMARK"
      productIcon={BookOpen}
      badgeThemeClass="bg-indigo-50 text-indigo-900 border-indigo-300"
      portals={SECERP_PORTALS}
      activePortalId={activePortalId}
      onPortalChange={handleSwitchPortal}
      modules={moduleSidebarOptions}
      activeModuleId={activeModuleId}
      onModuleChange={(modId) => {
        setActiveModuleId(modId);
        setExecutionMessage(null);
        setActiveTab('RECORDS');
      }}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      searchQuery={searchQuery}
      onSearchChange={setSearchQuery}
      executionMessage={executionMessage}
      onDismissExecutionMessage={() => setExecutionMessage(null)}
      onBackToLauncher={onBackToLauncher}
    >
      <div className="space-y-6">
        {/* TAB 1: OPERATIONAL RECORDS TABLE */}
        {activeTab === 'RECORDS' && (
          <div className="space-y-4">
            {activeModuleId === 'SEC-MOD-CURRICULUM-UNEB' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-sm text-slate-800">UNEB Examination Center U0048 Candidate Roll</h3>
                </div>

                <div className="border border-slate-200 rounded-xl overflow-hidden">
                  <table className="w-full text-left text-xs font-sans">
                    <thead className="bg-slate-50 border-b border-slate-200 font-mono text-[11px] text-slate-500">
                      <tr>
                        <th className="p-3">Candidate ID</th>
                        <th className="p-3">Student Name</th>
                        <th className="p-3">Center No</th>
                        <th className="p-3">UNEB Index No</th>
                        <th className="p-3">Exam Level</th>
                        <th className="p-3">Subjects</th>
                        <th className="p-3">Center Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
                      {unebCandidates
                        .filter(c => searchQuery === '' || c.student.toLowerCase().includes(searchQuery.toLowerCase()))
                        .map(c => (
                          <tr key={c.id} className="hover:bg-slate-50/80">
                            <td className="p-3 font-mono font-bold text-slate-500">{c.id}</td>
                            <td className="p-3 font-bold text-slate-900">{c.student}</td>
                            <td className="p-3 font-mono text-slate-700">{c.centerNo}</td>
                            <td className="p-3 font-mono font-bold text-indigo-900">{c.indexNo}</td>
                            <td className="p-3">{c.level}</td>
                            <td className="p-3 font-mono font-bold">{c.subjectsCount} Papers</td>
                            <td className="p-3">
                              <span className="px-2 py-0.5 rounded bg-indigo-50 text-indigo-800 border border-indigo-200 text-[10px] font-mono font-bold">
                                {c.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeModuleId === 'SEC-MOD-STUDENT-REGISTRY' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-sm text-slate-800">Namilyango Student Register & House Allocations</h3>
                  <button
                    onClick={() => setActiveTab('FORM')}
                    className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" /> Register Student
                  </button>
                </div>

                <div className="border border-slate-200 rounded-xl overflow-hidden">
                  <table className="w-full text-left text-xs font-sans">
                    <thead className="bg-slate-50 border-b border-slate-200 font-mono text-[11px] text-slate-500">
                      <tr>
                        <th className="p-3">Admission No</th>
                        <th className="p-3">Student Name</th>
                        <th className="p-3">Class & Stream</th>
                        <th className="p-3">UNEB Index</th>
                        <th className="p-3">Dormitory House</th>
                        <th className="p-3">Combination</th>
                        <th className="p-3">Fees Ledger</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
                      {students
                        .filter(s => searchQuery === '' || s.name.toLowerCase().includes(searchQuery.toLowerCase()))
                        .map(s => (
                          <tr key={s.id} className="hover:bg-slate-50/80">
                            <td className="p-3 font-mono font-bold text-slate-500">{s.id}</td>
                            <td className="p-3 font-bold text-slate-900">{s.name}</td>
                            <td className="p-3 font-bold text-indigo-900">{s.classStream}</td>
                            <td className="p-3 font-mono text-slate-600">{s.unebIndex}</td>
                            <td className="p-3">{s.house}</td>
                            <td className="p-3 font-mono">{s.combination}</td>
                            <td className="p-3">
                              <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-mono font-bold">
                                {s.feeStatus}
                              </span>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeModuleId === 'SEC-MOD-ALUMNI-TRANSITION' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-sm text-slate-800">JUMO Alumni Network Graduation & Handover Stream</h3>
                  <button
                    onClick={() => setActiveTab('FORM')}
                    className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" /> Graduate Student to Alumni Network
                  </button>
                </div>

                <div className="border border-slate-200 rounded-xl overflow-hidden">
                  <table className="w-full text-left text-xs font-sans">
                    <thead className="bg-slate-50 border-b border-slate-200 font-mono text-[11px] text-slate-500">
                      <tr>
                        <th className="p-3">Transfer Ref</th>
                        <th className="p-3">Graduate Name</th>
                        <th className="p-3">Graduation Cohort</th>
                        <th className="p-3">Sovereign Alumni ID</th>
                        <th className="p-3">Network Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
                      {alumniTransfers.map(a => (
                        <tr key={a.id} className="hover:bg-slate-50/80">
                          <td className="p-3 font-mono font-bold text-slate-500">{a.id}</td>
                          <td className="p-3 font-bold text-slate-900">{a.student}</td>
                          <td className="p-3">{a.classCohort}</td>
                          <td className="p-3 font-mono font-bold text-indigo-900">{a.alumniNo}</td>
                          <td className="p-3">
                            <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-mono font-bold">
                              {a.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeModuleId !== 'SEC-MOD-CURRICULUM-UNEB' && 
             activeModuleId !== 'SEC-MOD-STUDENT-REGISTRY' && 
             activeModuleId !== 'SEC-MOD-ALUMNI-TRANSITION' && (
              <div className="p-6 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 space-y-2">
                <div className="font-bold text-slate-900">Module [<strong>{currentModule.name}</strong>] Active</div>
                <p>Secondary school workspace active for {currentPortal.role}. Execute capability actions to post data.</p>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: DATA ENTRY & FORMS */}
        {activeTab === 'FORM' && (
          <div className="space-y-4 max-w-2xl">
            <h3 className="font-bold text-sm text-slate-800">Secondary ERP Action Form</h3>

            {activeModuleId === 'SEC-MOD-STUDENT-REGISTRY' && (
              <div className="space-y-4 p-5 bg-slate-50 rounded-xl border border-slate-200">
                <div className="font-bold text-xs text-slate-800">Register Secondary School Student</div>
                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Student Full Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Andrew Ssebaggala"
                      value={formState['studentName'] || ''}
                      onChange={e => setFormState({ ...formState, studentName: e.target.value })}
                      className="w-full p-2.5 bg-white border border-slate-300 rounded-lg text-xs"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">Class & Stream</label>
                      <input
                        type="text"
                        placeholder="e.g. S.4 West"
                        value={formState['classStream'] || ''}
                        onChange={e => setFormState({ ...formState, classStream: e.target.value })}
                        className="w-full p-2.5 bg-white border border-slate-300 rounded-lg text-xs"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">Dormitory House</label>
                      <input
                        type="text"
                        placeholder="e.g. Mutesa House"
                        value={formState['house'] || ''}
                        onChange={e => setFormState({ ...formState, house: e.target.value })}
                        className="w-full p-2.5 bg-white border border-slate-300 rounded-lg text-xs"
                      />
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => handleExecuteAction('Register Student')}
                  className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4" /> Save Student Record & Issue UNEB Index
                </button>
              </div>
            )}

            {activeModuleId === 'SEC-MOD-ALUMNI-TRANSITION' && (
              <div className="space-y-4 p-5 bg-slate-50 rounded-xl border border-slate-200">
                <div className="font-bold text-xs text-slate-800">Handover Student to JUMO Alumni Network</div>
                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Graduating Learner Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Emmanuel Kato"
                      value={formState['studentName'] || ''}
                      onChange={e => setFormState({ ...formState, studentName: e.target.value })}
                      className="w-full p-2.5 bg-white border border-slate-300 rounded-lg text-xs"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">Graduation Cohort</label>
                      <input
                        type="text"
                        placeholder="e.g. Class of 2026"
                        value={formState['cohort'] || ''}
                        onChange={e => setFormState({ ...formState, cohort: e.target.value })}
                        className="w-full p-2.5 bg-white border border-slate-300 rounded-lg text-xs"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">Phone Number</label>
                      <input
                        type="text"
                        placeholder="e.g. +256 700 000000"
                        value={formState['phone'] || ''}
                        onChange={e => setFormState({ ...formState, phone: e.target.value })}
                        className="w-full p-2.5 bg-white border border-slate-300 rounded-lg text-xs"
                      />
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => handleExecuteAction('Handover to Alumni')}
                  className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" /> Transfer to Sovereign Alumni Network
                </button>
              </div>
            )}

            {activeModuleId !== 'SEC-MOD-STUDENT-REGISTRY' && activeModuleId !== 'SEC-MOD-ALUMNI-TRANSITION' && (
              <div className="space-y-3 p-5 bg-slate-50 rounded-xl border border-slate-200">
                <p className="text-xs text-slate-600">
                  Form binding for <strong>{currentModule.name}</strong> is synchronized with secondary school schema.
                </p>
                <button
                  onClick={() => handleExecuteAction(`Submit ${currentModule.name} Form`)}
                  className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all cursor-pointer"
                >
                  Execute Secondary ERP Action
                </button>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: ANALYTICS */}
        {activeTab === 'ANALYTICS' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 bg-indigo-50 rounded-xl border border-indigo-200">
                <div className="text-[10px] font-mono font-bold text-indigo-800 uppercase">Enrolled Students</div>
                <div className="text-2xl font-black text-indigo-900 mt-1">{students.length}</div>
                <div className="text-[11px] text-indigo-700 mt-1">Namilyango Roll</div>
              </div>
              <div className="p-4 bg-purple-50 rounded-xl border border-purple-200">
                <div className="text-[10px] font-mono font-bold text-purple-800 uppercase">UNEB Candidates</div>
                <div className="text-xl font-black text-purple-900 mt-1">{unebCandidates.length} Candidates</div>
                <div className="text-[11px] text-purple-700 mt-1">Center U0048 Verified</div>
              </div>
              <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200">
                <div className="text-[10px] font-mono font-bold text-emerald-800 uppercase">JUMO Alumni Network</div>
                <div className="text-xl font-black text-emerald-900 mt-1">{alumniTransfers.length} Transferred</div>
                <div className="text-[11px] text-emerald-700 mt-1">Graduate Network Active</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </EnterpriseWorkspaceLayout>
  );
}
