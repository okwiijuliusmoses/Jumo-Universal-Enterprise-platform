import React, { useState } from 'react';
import { 
  BookOpen, Award, Layers, Calendar, Clock, FileSpreadsheet, 
  CheckCircle2, Search, Filter, Plus, Printer, Download, Eye,
  Sparkles, Compass, AlertCircle, RefreshCw, BarChart2, UserCheck,
  Building2, SlidersHorizontal, ChevronRight, X, FileText
} from 'lucide-react';

export const AcademicDosOffice: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'EXAMS' | 'UNEB' | 'CURRICULUM' | 'TIMETABLE' | 'REPORT_CARDS'>('EXAMS');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClass, setSelectedClass] = useState('ALL');
  const [selectedCandidate, setSelectedCandidate] = useState<any | null>(null);

  // 1. Examination Marks Register
  const examRecords = [
    { id: 'EXM-2026-001', student: 'Ainebyoona Timothy', class: 'Senior 6 Science', stream: 'S.6 Alpha', indexNo: 'U0023/501', subject: 'Physics (P510)', bot: 84, mot: 88, eot: 92, grade: 'D1 (A)', status: 'Approved' },
    { id: 'EXM-2026-002', student: 'Ainebyoona Timothy', class: 'Senior 6 Science', stream: 'S.6 Alpha', indexNo: 'U0023/501', subject: 'Chemistry (P525)', bot: 79, mot: 85, eot: 89, grade: 'D1 (A)', status: 'Approved' },
    { id: 'EXM-2026-003', student: 'Ainebyoona Timothy', class: 'Senior 6 Science', stream: 'S.6 Alpha', indexNo: 'U0023/501', subject: 'Pure Mathematics (P425)', bot: 91, mot: 94, eot: 95, grade: 'D1 (A)', status: 'Approved' },
    { id: 'EXM-2026-004', student: 'Babirye Christine', class: 'Senior 6 Science', stream: 'S.6 Beta', indexNo: 'U0023/502', subject: 'Biology (P530)', bot: 82, mot: 86, eot: 90, grade: 'D1 (A)', status: 'Approved' },
    { id: 'EXM-2026-005', student: 'Kato Derrick', class: 'Senior 4', stream: 'S.4 East', indexNo: 'U0023/014', subject: 'English Language (112)', bot: 74, mot: 78, eot: 81, grade: 'D1', status: 'Approved' },
    { id: 'EXM-2026-006', student: 'Nassuna Gloria', class: 'Senior 4', stream: 'S.4 West', indexNo: 'U0023/029', subject: 'Geography (273)', bot: 68, mot: 72, eot: 76, grade: 'C3', status: 'Pending Review' }
  ];

  // 2. UNEB Centre Candidates (U0023 / U0892)
  const unebCandidates = [
    { index: 'U0023/501', name: 'Ainebyoona Timothy', lin: 'LIN-9902341-UG', level: 'UACE (A-Level)', combination: 'PCM/ICT', mockScore: '20 Points (AAAA)', feesStatus: '100% Cleared', photo: 'Verified', biometric: 'Captured' },
    { index: 'U0023/502', name: 'Babirye Christine', lin: 'LIN-8834921-UG', level: 'UACE (A-Level)', combination: 'PCB/Sub-Math', mockScore: '19 Points (AAAB)', feesStatus: '100% Cleared', photo: 'Verified', biometric: 'Captured' },
    { index: 'U0023/503', name: 'Mukasa Ronald', lin: 'LIN-7721839-UG', level: 'UACE (A-Level)', combination: 'HEG/Div', mockScore: '18 Points (AABB)', feesStatus: '100% Cleared', photo: 'Verified', biometric: 'Captured' },
    { index: 'U0023/014', name: 'Kato Derrick', lin: 'LIN-6612984-UG', level: 'UCE (O-Level)', combination: '10 Core Subjects', mockScore: '8 in 8 (Div 1)', feesStatus: '100% Cleared', photo: 'Verified', biometric: 'Captured' },
    { index: 'U0023/029', name: 'Nassuna Gloria', lin: 'LIN-5523910-UG', level: 'UCE (O-Level)', combination: '10 Core Subjects', mockScore: '12 in 8 (Div 1)', feesStatus: 'Pending Clearance', photo: 'Verified', biometric: 'Pending' }
  ];

  // 3. Competency-Based NCDC Syllabus Strands
  const ncdcStrands = [
    { subject: 'Senior 1 Mathematics', topic: 'Coordinate Geometry & Linear Graphs', aoiTitle: 'Designing a Model Community Football Pitch', rubric: 'Level 3: Exceeds Competency', status: 'Assessed' },
    { subject: 'Senior 1 Chemistry', topic: 'Particulate Nature of Matter', aoiTitle: 'Purification of Contaminated Well Water', rubric: 'Level 3: Exceeds Competency', status: 'Assessed' },
    { subject: 'Senior 2 Biology', topic: 'Nutrition in Flowering Plants', aoiTitle: 'Constructing an Organic Vegetable Greenhouse', rubric: 'Level 2: Achieved Competency', status: 'In Progress' },
    { subject: 'Senior 2 Physics', topic: 'Heat Transfer & Thermal Expansion', aoiTitle: 'Fabrication of Energy-Saving Charcoal Stove', rubric: 'Level 3: Exceeds Competency', status: 'Assessed' }
  ];

  // 4. Timetable Matrix
  const timetableSlots = [
    { time: '08:00 - 08:40 AM', s1: 'Math (Rm 101)', s2: 'Physics (Rm 102)', s3: 'Chemistry Lab', s4: 'Biology (Rm 104)', s5: 'Pure Math (S5 Sci)', s6: 'Physics Practicals' },
    { time: '08:40 - 09:20 AM', s1: 'English (Rm 101)', s2: 'Math (Rm 102)', s3: 'Physics (Rm 103)', s4: 'Chemistry (Rm 104)', s5: 'Chemistry (S5 Sci)', s6: 'Physics Practicals' },
    { time: '09:20 - 10:00 AM', s1: 'Biology (Rm 101)', s2: 'English (Rm 102)', s3: 'Geography (Rm 103)', s4: 'Math (Rm 104)', s5: 'Biology (S5 Sci)', s6: 'Pure Math (S6 Sci)' },
    { time: '10:30 - 11:10 AM', s1: 'History (Rm 101)', s2: 'Biology (Rm 102)', s3: 'English (Rm 103)', s4: 'History (Rm 104)', s5: 'Sub-ICT Lab', s6: 'Economics (S6 Arts)' }
  ];

  return (
    <div className="space-y-6">
      {/* Office Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold shadow-xs">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold text-slate-900 tracking-tight">ACADEMIC OFFICE & DIRECTOR OF STUDIES</h1>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800 border border-blue-200">
                UNEB CENTRE # U0023
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Curriculum delivery, continuous assessment, UNEB candidate indexation, and terminal report card certification.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button 
            type="button"
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg border border-slate-200 transition"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Master BroadSheet</span>
          </button>
          <button 
            type="button"
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg shadow-xs transition"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Enter Assessment Marks</span>
          </button>
        </div>
      </div>

      {/* KPI Overview Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4.5 rounded-xl border border-slate-200 shadow-2xs">
          <div className="text-[11px] font-mono font-bold text-slate-400 uppercase">National Candidates (UCE/UACE)</div>
          <div className="text-2xl font-black text-slate-900 mt-1">428</div>
          <div className="text-[11px] font-semibold text-emerald-600 mt-1">100% Bio-Data Registered with UNEB</div>
        </div>
        <div className="bg-white p-4.5 rounded-xl border border-slate-200 shadow-2xs">
          <div className="text-[11px] font-mono font-bold text-slate-400 uppercase">NCDC Continuous Assessment (AOI)</div>
          <div className="text-2xl font-black text-blue-600 mt-1">98.4%</div>
          <div className="text-[11px] font-semibold text-slate-500 mt-1">Activities of Integration recorded</div>
        </div>
        <div className="bg-white p-4.5 rounded-xl border border-slate-200 shadow-2xs">
          <div className="text-[11px] font-mono font-bold text-slate-400 uppercase">A-Level Subject Combinations</div>
          <div className="text-2xl font-black text-slate-900 mt-1">38 Active</div>
          <div className="text-[11px] font-semibold text-purple-600 mt-1">Sciences, Arts & Commercials</div>
        </div>
        <div className="bg-white p-4.5 rounded-xl border border-slate-200 shadow-2xs">
          <div className="text-[11px] font-mono font-bold text-slate-400 uppercase">Average Academic Term Pass</div>
          <div className="text-2xl font-black text-emerald-600 mt-1">94.2%</div>
          <div className="text-[11px] font-semibold text-emerald-600 mt-1">+2.8% vs Term II Baseline</div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto">
        {[
          { id: 'EXAMS', label: 'Continuous Assessment & Marks' },
          { id: 'UNEB', label: 'UNEB Centre & Candidate Index' },
          { id: 'CURRICULUM', label: 'Competency Syllabus (NCDC)' },
          { id: 'TIMETABLE', label: 'Master Academic Timetable' },
          { id: 'REPORT_CARDS', label: 'Terminal Report Card Engine' }
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-3.5 py-2 rounded-lg text-xs font-bold transition whitespace-nowrap cursor-pointer ${
              activeTab === tab.id
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Main Tab Workspaces */}
      {activeTab === 'EXAMS' && (
        <div className="bg-white border border-slate-200 rounded-xl shadow-2xs overflow-hidden">
          <div className="p-4 border-b border-slate-200 bg-slate-50/50 flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Search className="w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search candidate name, index number, subject..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="text-xs bg-transparent focus:outline-none text-slate-800 placeholder-slate-400 w-64"
              />
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-500 font-medium">Filter Class:</span>
              <select 
                value={selectedClass} 
                onChange={(e) => setSelectedClass(e.target.value)}
                className="border border-slate-200 rounded-lg px-2.5 py-1 text-xs bg-white font-semibold text-slate-700"
              >
                <option value="ALL">All Classes (S.1–S.6)</option>
                <option value="S6">Senior 6 (A-Level)</option>
                <option value="S5">Senior 5 (A-Level)</option>
                <option value="S4">Senior 4 (UCE)</option>
                <option value="S3">Senior 3</option>
                <option value="S2">Senior 2</option>
                <option value="S1">Senior 1</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase font-mono text-[10px]">
                <tr>
                  <th className="px-4 py-3">Record ID</th>
                  <th className="px-4 py-3">Candidate / Student</th>
                  <th className="px-4 py-3">Class & Stream</th>
                  <th className="px-4 py-3">Subject</th>
                  <th className="px-4 py-3 text-center">BOT (30%)</th>
                  <th className="px-4 py-3 text-center">MOT (30%)</th>
                  <th className="px-4 py-3 text-center">EOT (40%)</th>
                  <th className="px-4 py-3 text-center">Final Grade</th>
                  <th className="px-4 py-3 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
                {examRecords.map((rec) => (
                  <tr key={rec.id} className="hover:bg-slate-50/80 transition">
                    <td className="px-4 py-3 font-mono text-blue-700 font-bold">{rec.id}</td>
                    <td className="px-4 py-3">
                      <div className="font-bold text-slate-900">{rec.student}</div>
                      <div className="text-[10px] font-mono text-slate-400">{rec.indexNo}</div>
                    </td>
                    <td className="px-4 py-3 text-slate-600">{rec.stream}</td>
                    <td className="px-4 py-3 font-semibold text-slate-800">{rec.subject}</td>
                    <td className="px-4 py-3 text-center font-mono">{rec.bot}%</td>
                    <td className="px-4 py-3 text-center font-mono">{rec.mot}%</td>
                    <td className="px-4 py-3 text-center font-mono">{rec.eot}%</td>
                    <td className="px-4 py-3 text-center">
                      <span className="px-2 py-0.5 bg-blue-50 text-blue-800 font-mono font-bold rounded border border-blue-200">
                        {rec.grade}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded font-bold text-[10px]">
                        {rec.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'UNEB' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Candidate Index Table */}
          <div className="lg:col-span-2 bg-white border border-slate-200 rounded-xl shadow-2xs overflow-hidden">
            <div className="p-4 border-b border-slate-200 bg-slate-50/50 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-blue-600" />
                <h3 className="text-sm font-bold text-slate-900">Official UNEB Candidate Register (UCE / UACE)</h3>
              </div>
              <span className="text-[10px] font-mono bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold">
                Centre Active
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
                  <tr>
                    <th className="px-4 py-2.5">Index No</th>
                    <th className="px-4 py-2.5">Candidate Name</th>
                    <th className="px-4 py-2.5">Level & Combo</th>
                    <th className="px-4 py-2.5 text-center">Mock Agg</th>
                    <th className="px-4 py-2.5 text-center">Fees Status</th>
                    <th className="px-4 py-2.5 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {unebCandidates.map((cand) => (
                    <tr 
                      key={cand.index} 
                      onClick={() => setSelectedCandidate(cand)}
                      className="hover:bg-blue-50/50 transition cursor-pointer"
                    >
                      <td className="px-4 py-3 font-mono font-bold text-slate-900">{cand.index}</td>
                      <td className="px-4 py-3">
                        <div className="font-bold text-slate-900">{cand.name}</div>
                        <div className="text-[10px] font-mono text-slate-400">{cand.lin}</div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="text-slate-800 font-semibold">{cand.level}</div>
                        <div className="text-[10px] text-blue-600 font-bold">{cand.combination}</div>
                      </td>
                      <td className="px-4 py-3 text-center font-mono font-bold text-emerald-600">{cand.mockScore}</td>
                      <td className="px-4 py-3 text-center">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          cand.feesStatus.includes('100%') ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {cand.feesStatus}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button className="px-2.5 py-1 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded text-xs font-semibold">
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Candidate Dossier Split Pane */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs space-y-4">
            <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900">Candidate Examination Dossier</h3>
              <span className="text-[10px] font-mono text-slate-400">UNEB e-Registration</span>
            </div>

            {selectedCandidate ? (
              <div className="space-y-3.5 text-xs">
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
                  <div className="font-bold text-slate-900 text-sm">{selectedCandidate.name}</div>
                  <div className="text-slate-500 font-mono text-[11px]">{selectedCandidate.index} • {selectedCandidate.lin}</div>
                  <div className="text-blue-700 font-semibold">{selectedCandidate.level} ({selectedCandidate.combination})</div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div className="p-2.5 bg-slate-50 rounded border border-slate-200">
                    <span className="text-slate-400 block uppercase font-mono text-[9px]">Passport Photo</span>
                    <span className="text-emerald-700 font-bold">{selectedCandidate.photo}</span>
                  </div>
                  <div className="p-2.5 bg-slate-50 rounded border border-slate-200">
                    <span className="text-slate-400 block uppercase font-mono text-[9px]">Biometrics</span>
                    <span className="text-emerald-700 font-bold">{selectedCandidate.biometric}</span>
                  </div>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-200">
                  <button className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold text-xs shadow-xs transition">
                    Generate UNEB Candidate Slip
                  </button>
                  <button className="w-full py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-semibold text-xs transition">
                    Download e-Marking Barcode
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-8 text-center text-slate-400 text-xs">
                Select a candidate from the register to inspect UNEB index dossier and verification status.
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'CURRICULUM' && (
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div>
              <h3 className="text-sm font-bold text-slate-900">National Curriculum Development Centre (NCDC) Competency Strands</h3>
              <p className="text-xs text-slate-500">Activities of Integration (AOI), project-based rubrics, and continuous formative assessment</p>
            </div>
            <button className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg shadow-xs transition">
              + New Activity of Integration
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {ncdcStrands.map((strand, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900">{strand.subject}</span>
                  <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded">
                    {strand.status}
                  </span>
                </div>
                <div className="text-xs text-slate-600"><strong>Topic:</strong> {strand.topic}</div>
                <div className="text-xs text-blue-700 font-semibold"><strong>AOI Project:</strong> {strand.aoiTitle}</div>
                <div className="text-[11px] font-mono text-purple-700 bg-purple-50 p-2 rounded border border-purple-200">
                  {strand.rubric}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'TIMETABLE' && (
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Master Academic Timetable Matrix (Clash Detection Active)</h3>
              <p className="text-xs text-slate-500">Room allocations, laboratory sessions, and teacher period rosters</p>
            </div>
            <button className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg border border-slate-200">
              Export Timetable PDF
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold font-mono text-[10px]">
                <tr>
                  <th className="px-3 py-2.5">Period Time</th>
                  <th className="px-3 py-2.5">Senior 1</th>
                  <th className="px-3 py-2.5">Senior 2</th>
                  <th className="px-3 py-2.5">Senior 3</th>
                  <th className="px-3 py-2.5">Senior 4</th>
                  <th className="px-3 py-2.5">Senior 5</th>
                  <th className="px-3 py-2.5">Senior 6</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
                {timetableSlots.map((slot, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/80 transition">
                    <td className="px-3 py-3 font-mono font-bold text-slate-900 bg-slate-50/50">{slot.time}</td>
                    <td className="px-3 py-3">{slot.s1}</td>
                    <td className="px-3 py-3">{slot.s2}</td>
                    <td className="px-3 py-3">{slot.s3}</td>
                    <td className="px-3 py-3">{slot.s4}</td>
                    <td className="px-3 py-3 text-blue-700 font-semibold">{slot.s5}</td>
                    <td className="px-3 py-3 text-purple-700 font-semibold">{slot.s6}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'REPORT_CARDS' && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-2xs space-y-4 text-center">
          <div className="max-w-md mx-auto space-y-3">
            <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mx-auto">
              <FileText className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Automated Terminal Report Card Engine</h3>
            <p className="text-xs text-slate-500">
              Compile, stamp, and certify official terminal report cards with class teacher remarks, head teacher endorsement, and QR verification codes.
            </p>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg shadow-xs transition">
                Compile All Class Reports (S.1–S.6)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
