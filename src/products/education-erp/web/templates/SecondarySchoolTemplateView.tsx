import React, { useState } from 'react';
import { 
  Building2, Users, BookOpen, Award, Flame, Home, 
  DollarSign, Stethoscope, Compass, Clock, Plus, Search, 
  Layers, CheckCircle2, ShieldAlert, FileText, Activity
} from 'lucide-react';

export const SecondarySchoolTemplateView: React.FC<{ activeSubmodule: string }> = ({ activeSubmodule }) => {
  const [combinations, setCombinations] = useState([
    { code: 'PCM/ICT', stream: 'Senior 5 Science Alpha', subjects: 'Physics, Chemistry, Pure Math & Sub-ICT', students: '48 Students', labAllocation: 'Physics Lab 2 & Chem Lab 1', leadTeacher: 'Mr. Patrick Byaruhanga' },
    { code: 'PCB/Sub-Math', stream: 'Senior 5 Science Beta', subjects: 'Physics, Chemistry, Biology & Subsidiary Math', students: '42 Students', labAllocation: 'Biology Lab 1 & Chem Lab 2', leadTeacher: 'Dr. Jane Kaggwa' },
    { code: 'HEG/Div', stream: 'Senior 6 Arts Alpha', subjects: 'History, Economics, Geography & Divinity', students: '56 Students', labAllocation: 'Geography Resource Room', leadTeacher: 'Mrs. Florence Namatovu' },
    { code: 'MEG/ICT', stream: 'Senior 6 Arts Beta', subjects: 'Pure Math, Economics, Geography & Sub-ICT', students: '38 Students', labAllocation: 'Computer Lab 3 (40 Workstations)', leadTeacher: 'Mr. Allan Ssali' }
  ]);

  const [candidates, setCandidates] = useState([
    { index: 'U0023/501', name: 'Ainebyoona Timothy', level: 'UACE (A-Level S6)', combo: 'PCM/ICT', mockAggregate: '19 Points (AAA/A)', status: 'Cleared (Exams & Fees)', hostel: 'Lumumba Hall (Room 14)' },
    { index: 'U0023/502', name: 'Babirye Christine', level: 'UACE (A-Level S6)', combo: 'PCB/Sub-Math', mockAggregate: '18 Points (AAB/A)', status: 'Cleared (Exams & Fees)', hostel: 'Mary Stuart Hall (Room 08)' },
    { index: 'U0023/014', name: 'Kato Derrick', level: 'UCE (O-Level S4)', combo: '10 Core Subjects', mockAggregate: '8 in 8 (Div 1 Dist)', status: 'Cleared (Exams & Fees)', hostel: 'Livingstone Hall (Room 22)' },
    { index: 'U0023/029', name: 'Nassuna Gloria', level: 'UCE (O-Level S4)', combo: '10 Core Subjects', mockAggregate: '11 in 8 (Div 1)', status: 'Fees Pending ($60.00)', hostel: 'Africa Hall (Room 11)' }
  ]);

  const [labs, setLabs] = useState([
    { name: 'Advanced Chemistry Laboratory', status: 'Active (Safety Approved)', fumeHoods: '4 Operational', reagentSafety: 'Acid / Base Segregated & Locked', upcomingPractical: 'Titration Volumetric Analysis (S6 PCM)' },
    { name: 'Physics Mechanics & Optics Lab', status: 'Active (Calibrated)', apparatus: 'Spectrometers, Galvanometers, Verniers', upcomingPractical: 'Refraction & Triangular Prisms (S4 O-Level)' },
    { name: 'Microbiology & Dissection Lab', status: 'Active (Sterilized)', safety: 'Formalin Dissection Trays & Microscopes', upcomingPractical: 'Toad & Small Mammal Circulatory System' },
    { name: 'Main ICT Computer Laboratory', status: 'Active (Gigabit Network)', workstations: '85 Core i7 Terminals Online', upcomingPractical: 'Relational Database SQL Practical (S6 MEG/ICT)' }
  ]);

  return (
    <div className="space-y-6">
      {/* Template Header Banner */}
      <div className="bg-gradient-to-r from-blue-500/10 via-blue-500/5 to-transparent p-5 rounded-2xl border border-blue-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-slate-900">Secondary & High School Academic Operations</h2>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800 border border-blue-300">O-Level & A-Level Ready</span>
            </div>
            <p className="text-xs text-slate-600">A-Level subject combinations, national examination index numbers, science labs & boarding house management</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl flex items-center gap-2 shadow-xs transition">
            <Plus className="w-4 h-4" /> Register Examination Candidate
          </button>
        </div>
      </div>

      {/* A-Level Subject Combinations Grid */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/60">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-blue-600" />
            <h3 className="text-sm font-bold text-slate-900">A-Level Subject Combination Matrix & Stream Allocations</h3>
          </div>
          <span className="text-xs text-slate-500 font-mono">24 Active Combinations</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Combo Code</th>
                <th className="py-3 px-4">Class Stream</th>
                <th className="py-3 px-4">Principal & Subsidiary Subjects</th>
                <th className="py-3 px-4">Enrolled Candidates</th>
                <th className="py-3 px-4">Specialist Lab / Room</th>
                <th className="py-3 px-4">Lead Combination Master</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {combinations.map((c) => (
                <tr key={c.code} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-4">
                    <span className="px-2.5 py-1 bg-blue-50 text-blue-800 font-mono font-bold rounded border border-blue-200 text-xs">
                      {c.code}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-bold text-slate-900">{c.stream}</div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="text-slate-700 font-medium">{c.subjects}</div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="font-bold text-slate-900">{c.students}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-slate-600 font-medium">{c.labAllocation}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-slate-800 font-medium">{c.leadTeacher}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Candidates and Laboratories */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* UNEB Candidate Index Directory */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-blue-600" />
              <h3 className="text-sm font-bold text-slate-900">National Examination (UCE & UACE) Candidate Index</h3>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">Registration Verified</span>
          </div>

          <div className="space-y-3">
            {candidates.map((cand) => (
              <div key={cand.index} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 bg-slate-900 text-blue-400 font-mono text-[10px] font-bold rounded">{cand.index}</span>
                    <span className="font-bold text-xs text-slate-900">{cand.name}</span>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">{cand.mockAggregate}</span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-600">
                  <span>Level: <strong className="text-slate-800">{cand.level} ({cand.combo})</strong></span>
                  <span className="text-slate-500 font-medium">{cand.hostel}</span>
                </div>
                <div className="text-[10px] text-slate-500 font-mono">Status: {cand.status}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Science Laboratories & Reagent Safety */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Flame className="w-4 h-4 text-rose-600" />
              <h3 className="text-sm font-bold text-slate-900">Science Laboratories & Equipment Readiness</h3>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800">4 Active Labs</span>
          </div>

          <div className="space-y-3">
            {labs.map((lab, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-slate-900">{lab.name}</span>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">{lab.status}</span>
                </div>
                <p className="text-xs text-slate-600">Upcoming Session: <strong className="text-blue-700">{lab.upcomingPractical}</strong></p>
                <div className="text-[11px] text-slate-500 font-mono">
                  {lab.reagentSafety || lab.apparatus || lab.safety || lab.workstations}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
