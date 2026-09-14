import React, { useState } from 'react';
import { 
  Smile, Users, Award, ShoppingBag, Heart, Coffee, ArrowLeft, 
  Search, Plus, CheckCircle2, ChevronRight, UserCheck, Send, Eye, BookOpen
} from 'lucide-react';
import { NPERP_MANIFEST } from '../manifest';
import { NPERP_MODULES } from '../modules';
import { EnterpriseWorkspaceLayout } from '../../../components/EnterpriseWorkspaceLayout';

export interface NperpStandaloneAppProps {
  onBackToLauncher?: () => void;
}

// NPERP Officer Portals Definition
const NPERP_PORTALS = [
  {
    id: 'NP-PORTAL-HEADTEACHER',
    code: 'HEADTEACHER_COCKPIT',
    title: 'Headteacher & Primary Governance Cockpit',
    role: 'Headteacher / School Principal',
    office: 'Headteacher Executive Suite',
    directorate: 'Directorate of Primary School Governance & Administration',
    moduleIds: ['NP-MOD-PUPIL-DIRECTORY', 'NP-MOD-ECD-NURSERY', 'NP-MOD-PLE-CENTER', 'NP-MOD-FEES-STORE']
  },
  {
    id: 'NP-PORTAL-ECD',
    code: 'ECD_COORDINATOR_PORTAL',
    title: 'ECD & Nursery Learning Coordinator Portal',
    role: 'ECD Coordinator / Nursery Headteacher',
    office: 'Nursery & Early Learning Desk',
    directorate: 'Directorate of Early Childhood Development & Phonics',
    moduleIds: ['NP-MOD-PUPIL-DIRECTORY', 'NP-MOD-ECD-NURSERY', 'NP-MOD-HEALTH-SICKBAY']
  },
  {
    id: 'NP-PORTAL-DOS',
    code: 'PRIMARY_DOS_PORTAL',
    title: 'Primary DOS & UNEB PLE Examination Control',
    role: 'Primary Director of Studies (DOS)',
    office: 'Primary DOS & Assessment Desk',
    directorate: 'Directorate of Primary Curriculum & PLE Center',
    moduleIds: ['NP-MOD-PUPIL-DIRECTORY', 'NP-MOD-PLE-CENTER', 'NP-MOD-FEES-STORE']
  },
  {
    id: 'NP-PORTAL-BURSAR',
    code: 'ACCOUNTANT_STORE_TERMINAL',
    title: 'School Accountant & Store Management Terminal',
    role: 'School Accountant / Bursar',
    office: 'Bursary & Scholastic Store Desk',
    directorate: 'Directorate of Finance, Stores & Catering',
    moduleIds: ['NP-MOD-FEES-STORE', 'NP-MOD-CATERING-MEALS']
  }
];

export function NperpStandaloneApp({ onBackToLauncher }: NperpStandaloneAppProps) {
  const [activePortalId, setActivePortalId] = useState<string>('NP-PORTAL-DOS');
  const [activeModuleId, setActiveModuleId] = useState<string>('NP-MOD-PLE-CENTER');
  const [activeTab, setActiveTab] = useState<'RECORDS' | 'FORM' | 'ANALYTICS'>('RECORDS');
  const [searchQuery, setSearchQuery] = useState('');
  const [executionMessage, setExecutionMessage] = useState<string | null>(null);

  const [formState, setFormState] = useState<Record<string, string>>({});

  const currentPortal = NPERP_PORTALS.find(p => p.id === activePortalId) || NPERP_PORTALS[1];
  const availableModules = NPERP_MODULES.filter(m => currentPortal.moduleIds.includes(m.id));
  const currentModule = NPERP_MODULES.find(m => m.id === activeModuleId) || availableModules[0] || NPERP_MODULES[0];

  // Live Primary School Datasets (Hillside Primary Naalya Benchmark)
  const [pupils, setPupils] = useState([
    { id: 'HIL-4001', name: 'Alvin K. Kato', classLevel: 'P.7 Eagle', parentName: 'Mr. Patrick Kato', parentPhone: '+256 772 889900', pleAggregate: 'Aggregate 4 (Div 1)', feeStatus: 'CLEARED' },
    { id: 'HIL-4002', name: 'Chloe N. Namutebi', classLevel: 'Top Class (ECD)', parentName: 'Dr. Sarah Namutebi', parentPhone: '+256 782 445566', pleAggregate: 'N/A (Nursery)', feeStatus: 'CLEARED' },
    { id: 'HIL-4003', name: 'Ethan M. Sserwadda', classLevel: 'P.7 Lion', parentName: 'Eng. Isaac Sserwadda', parentPhone: '+256 752 112233', pleAggregate: 'Aggregate 6 (Div 1)', feeStatus: 'PARTIAL' }
  ]);

  const [pleCandidates] = useState([
    { id: 'PLE-01', pupil: 'Alvin K. Kato', indexNo: '002145/004', engScore: 'D1', mathScore: 'D1', sciScore: 'D1', sstScore: 'D1', totalAgg: 4, division: 'Division 1' },
    { id: 'PLE-02', pupil: 'Ethan M. Sserwadda', indexNo: '002145/019', engScore: 'D1', mathScore: 'D2', sciScore: 'D1', sstScore: 'D2', totalAgg: 6, division: 'Division 1' }
  ]);

  const handleSwitchPortal = (portalId: string) => {
    setActivePortalId(portalId);
    const targetPortal = NPERP_PORTALS.find(p => p.id === portalId);
    if (targetPortal && targetPortal.moduleIds.length > 0) {
      setActiveModuleId(targetPortal.moduleIds[0]);
    }
    setExecutionMessage(null);
  };

  const handleExecuteAction = (actionName: string) => {
    setExecutionMessage(null);

    if (activeModuleId === 'NP-MOD-PUPIL-DIRECTORY') {
      const name = formState['pupilName'] || 'New Primary Learner';
      const level = formState['classLevel'] || 'P.1 Blue';
      const parent = formState['parentName'] || 'Parent Guardian';

      const newPupil = {
        id: `HIL-${Math.floor(4000 + Math.random() * 5000)}`,
        name,
        classLevel: level,
        parentName: parent,
        parentPhone: formState['parentPhone'] || '+256 700 000000',
        pleAggregate: 'Pending Assessment',
        feeStatus: 'PARTIAL'
      };

      setPupils([newPupil, ...pupils]);
      setExecutionMessage(`Enrolled primary pupil [${name}] into ${level}. Linked Parent Guardian [${parent}].`);
    }

    setFormState({});
    setActiveTab('RECORDS');
  };

  const moduleSidebarOptions = availableModules.map(m => ({
    id: m.id,
    code: m.code,
    name: m.name,
    description: m.description,
    icon: Smile
  }));

  return (
    <EnterpriseWorkspaceLayout
      productCode={NPERP_MANIFEST.code}
      productName={NPERP_MANIFEST.name}
      benchmarkBadge="HILLSIDE PRIMARY NAALYA BENCHMARK"
      productIcon={Smile}
      badgeThemeClass="bg-pink-50 text-pink-900 border-pink-300"
      portals={NPERP_PORTALS}
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
            {activeModuleId === 'NP-MOD-PLE-CENTER' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-sm text-slate-800">UNEB PLE Examination Center 002145 Candidate Register</h3>
                </div>

                <div className="border border-slate-200 rounded-xl overflow-hidden">
                  <table className="w-full text-left text-xs font-sans">
                    <thead className="bg-slate-50 border-b border-slate-200 font-mono text-[11px] text-slate-500">
                      <tr>
                        <th className="p-3">Ref ID</th>
                        <th className="p-3">Candidate Pupil Name</th>
                        <th className="p-3">PLE Index No</th>
                        <th className="p-3">ENG</th>
                        <th className="p-3">MTC</th>
                        <th className="p-3">SCI</th>
                        <th className="p-3">SST</th>
                        <th className="p-3">Total Agg</th>
                        <th className="p-3">Division</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
                      {pleCandidates
                        .filter(p => searchQuery === '' || p.pupil.toLowerCase().includes(searchQuery.toLowerCase()))
                        .map(p => (
                          <tr key={p.id} className="hover:bg-slate-50/80">
                            <td className="p-3 font-mono font-bold text-slate-500">{p.id}</td>
                            <td className="p-3 font-bold text-slate-900">{p.pupil}</td>
                            <td className="p-3 font-mono font-bold text-pink-900">{p.indexNo}</td>
                            <td className="p-3 font-mono">{p.engScore}</td>
                            <td className="p-3 font-mono">{p.mathScore}</td>
                            <td className="p-3 font-mono">{p.sciScore}</td>
                            <td className="p-3 font-mono">{p.sstScore}</td>
                            <td className="p-3 font-mono font-bold text-emerald-800">{p.totalAgg}</td>
                            <td className="p-3">
                              <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-mono font-bold">
                                {p.division}
                              </span>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeModuleId === 'NP-MOD-PUPIL-DIRECTORY' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-sm text-slate-800">Primary Pupil Directory & Guardian Registry</h3>
                  <button
                    onClick={() => setActiveTab('FORM')}
                    className="px-3 py-1.5 bg-pink-600 hover:bg-pink-700 text-white rounded-lg text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" /> Enroll Primary Learner
                  </button>
                </div>

                <div className="border border-slate-200 rounded-xl overflow-hidden">
                  <table className="w-full text-left text-xs font-sans">
                    <thead className="bg-slate-50 border-b border-slate-200 font-mono text-[11px] text-slate-500">
                      <tr>
                        <th className="p-3">Pupil ID</th>
                        <th className="p-3">Pupil Name</th>
                        <th className="p-3">Class Level</th>
                        <th className="p-3">Parent / Guardian</th>
                        <th className="p-3">Guardian Phone</th>
                        <th className="p-3">Assessment</th>
                        <th className="p-3">Fees</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
                      {pupils
                        .filter(p => searchQuery === '' || p.name.toLowerCase().includes(searchQuery.toLowerCase()))
                        .map(p => (
                          <tr key={p.id} className="hover:bg-slate-50/80">
                            <td className="p-3 font-mono font-bold text-slate-500">{p.id}</td>
                            <td className="p-3 font-bold text-slate-900">{p.name}</td>
                            <td className="p-3 font-bold text-pink-900">{p.classLevel}</td>
                            <td className="p-3">{p.parentName}</td>
                            <td className="p-3 font-mono text-slate-600">{p.parentPhone}</td>
                            <td className="p-3">{p.pleAggregate}</td>
                            <td className="p-3">
                              <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-mono font-bold">
                                {p.feeStatus}
                              </span>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeModuleId !== 'NP-MOD-PLE-CENTER' && activeModuleId !== 'NP-MOD-PUPIL-DIRECTORY' && (
              <div className="p-6 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 space-y-2">
                <div className="font-bold text-slate-900">Module [<strong>{currentModule.name}</strong>] Active</div>
                <p>Nursery & Primary workspace active for {currentPortal.role}. Execute capability actions to post data.</p>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: DATA ENTRY & FORMS */}
        {activeTab === 'FORM' && (
          <div className="space-y-4 max-w-2xl">
            <h3 className="font-bold text-sm text-slate-800">Primary ERP Action Form</h3>

            {activeModuleId === 'NP-MOD-PUPIL-DIRECTORY' && (
              <div className="space-y-4 p-5 bg-slate-50 rounded-xl border border-slate-200">
                <div className="font-bold text-xs text-slate-800">Enroll Primary / ECD Pupil</div>
                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Pupil Full Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Alvin K. Kato"
                      value={formState['pupilName'] || ''}
                      onChange={e => setFormState({ ...formState, pupilName: e.target.value })}
                      className="w-full p-2.5 bg-white border border-slate-300 rounded-lg text-xs"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">Class Level</label>
                      <input
                        type="text"
                        placeholder="e.g. P.7 Eagle / Baby Class"
                        value={formState['classLevel'] || ''}
                        onChange={e => setFormState({ ...formState, classLevel: e.target.value })}
                        className="w-full p-2.5 bg-white border border-slate-300 rounded-lg text-xs"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">Parent Guardian Name</label>
                      <input
                        type="text"
                        placeholder="e.g. Mr. Patrick Kato"
                        value={formState['parentName'] || ''}
                        onChange={e => setFormState({ ...formState, parentName: e.target.value })}
                        className="w-full p-2.5 bg-white border border-slate-300 rounded-lg text-xs"
                      />
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => handleExecuteAction('Enroll Learner')}
                  className="w-full py-2.5 bg-pink-600 hover:bg-pink-700 text-white rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4" /> Save Pupil Record & Issue Hillside Registration ID
                </button>
              </div>
            )}

            {activeModuleId !== 'NP-MOD-PUPIL-DIRECTORY' && (
              <div className="space-y-3 p-5 bg-slate-50 rounded-xl border border-slate-200">
                <p className="text-xs text-slate-600">
                  Form binding for <strong>{currentModule.name}</strong> is synchronized with primary school schema.
                </p>
                <button
                  onClick={() => handleExecuteAction(`Submit ${currentModule.name} Form`)}
                  className="w-full py-2.5 bg-pink-600 hover:bg-pink-700 text-white rounded-xl text-xs font-bold transition-all cursor-pointer"
                >
                  Execute Primary ERP Action
                </button>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: ANALYTICS */}
        {activeTab === 'ANALYTICS' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 bg-pink-50 rounded-xl border border-pink-200">
                <div className="text-[10px] font-mono font-bold text-pink-800 uppercase">Enrolled Pupils</div>
                <div className="text-2xl font-black text-pink-900 mt-1">{pupils.length}</div>
                <div className="text-[11px] text-pink-700 mt-1">Hillside Primary Roll</div>
              </div>
              <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200">
                <div className="text-[10px] font-mono font-bold text-emerald-800 uppercase">PLE Candidates</div>
                <div className="text-xl font-black text-emerald-900 mt-1">{pleCandidates.length} Registered</div>
                <div className="text-[11px] text-emerald-700 mt-1">Center 002145 Active</div>
              </div>
              <div className="p-4 bg-purple-50 rounded-xl border border-purple-200">
                <div className="text-[10px] font-mono font-bold text-purple-800 uppercase">ECD / Nursery Stream</div>
                <div className="text-xl font-black text-purple-900 mt-1">Phonics & Early Care</div>
                <div className="text-[11px] text-purple-700 mt-1">Top, Middle & Baby Classes</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </EnterpriseWorkspaceLayout>
  );
}
