import React, { useState } from 'react';
import { 
  BookOpen, Award, FileSpreadsheet, FileText, Calendar, 
  Search, Filter, Plus, Download, Printer, CheckCircle2,
  AlertTriangle, Clock, Layers, Sparkles
} from 'lucide-react';

export const AcademicDosPortal: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'MARKS' | 'REPORT_CARDS' | 'TIMETABLE' | 'UNEB'>('MARKS');
  const [selectedSubject, setSelectedSubject] = useState('MATHEMATICS');
  const [selectedClass, setSelectedClass] = useState('S.4 East');

  const assessmentMarks = [
    { lin: 'LIN-2026-0891', name: 'Okello Brian', botMark: 78, motMark: 82, eotMark: 85, aoiScore: 2.8, finalGrade: 'D1', unebGrade: 'Distinction 1' },
    { lin: 'LIN-2026-0892', name: 'Nakato Sarah', botMark: 65, motMark: 70, eotMark: 72, aoiScore: 2.4, finalGrade: 'C3', unebGrade: 'Credit 3' },
    { lin: 'LIN-2026-0893', name: 'Kato Emmanuel', botMark: 88, motMark: 92, eotMark: 90, aoiScore: 3.0, finalGrade: 'D1', unebGrade: 'Distinction 1' },
    { lin: 'LIN-2026-0894', name: 'Achieng Grace', botMark: 54, motMark: 58, eotMark: 60, aoiScore: 2.1, finalGrade: 'C6', unebGrade: 'Credit 6' },
    { lin: 'LIN-2026-0895', name: 'Mukasa David', botMark: 72, motMark: 75, eotMark: 80, aoiScore: 2.7, finalGrade: 'D2', unebGrade: 'Distinction 2' },
    { lin: 'LIN-2026-0896', name: 'Akello Patricia', botMark: 81, motMark: 84, eotMark: 88, aoiScore: 2.9, finalGrade: 'D1', unebGrade: 'Distinction 1' },
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
      {/* Header */}
      <div className="border-b border-slate-200 bg-slate-50/50 px-6 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold shadow-xs">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-slate-900 tracking-tight">ACADEMIC OFFICE & DIRECTOR OF STUDIES</h2>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-indigo-100 text-indigo-800 border border-indigo-300">
                UNEB CENTRE U0892
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Curriculum Management • Continuous Assessment • National Examination Registry
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button 
            type="button"
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 rounded-lg text-xs font-semibold shadow-2xs transition"
          >
            <Printer className="w-3.5 h-3.5 text-slate-500" />
            <span>Print Marksheets</span>
          </button>
          <button 
            type="button"
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold shadow-xs transition"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Enter Assessment Scores</span>
          </button>
        </div>
      </div>

      {/* KPI Ribbon */}
      <div className="grid grid-cols-2 md:grid-cols-4 border-b border-slate-200 divide-x divide-slate-200 bg-white">
        <div className="p-4">
          <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wider block">Assessment Entry Status</span>
          <span className="text-lg font-bold text-emerald-600 mt-1 block">94.8% Submitted</span>
          <span className="text-[10px] text-slate-500">Term 1 EOT Continuous Assessment</span>
        </div>
        <div className="p-4">
          <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wider block">Division 1 Projection (UCE)</span>
          <span className="text-lg font-bold text-indigo-700 mt-1 block">68.2% of Candidates</span>
          <span className="text-[10px] text-indigo-600 font-medium">+4.1% vs previous year</span>
        </div>
        <div className="p-4">
          <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wider block">Curriculum Syllabus Coverage</span>
          <span className="text-lg font-bold text-slate-900 mt-1 block">89.4% On Track</span>
          <span className="text-[10px] text-slate-500">Week 9 of 12 Teaching Weeks</span>
        </div>
        <div className="p-4">
          <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wider block">UNEB E-Registration</span>
          <span className="text-lg font-bold text-purple-700 mt-1 block">Verified & Locked</span>
          <span className="text-[10px] text-purple-600 font-medium">348 Candidates registered</span>
        </div>
      </div>

      {/* Sub-Tabs */}
      <div className="flex border-b border-slate-200 bg-slate-50/40 px-6 gap-6 text-xs font-semibold">
        <button
          type="button"
          onClick={() => setActiveTab('MARKS')}
          className={`py-3 border-b-2 transition ${activeTab === 'MARKS' ? 'border-indigo-600 text-indigo-700 font-bold' : 'border-transparent text-slate-600 hover:text-slate-900'}`}
        >
          Continuous Assessment & Marksheets
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('REPORT_CARDS')}
          className={`py-3 border-b-2 transition ${activeTab === 'REPORT_CARDS' ? 'border-indigo-600 text-indigo-700 font-bold' : 'border-transparent text-slate-600 hover:text-slate-900'}`}
        >
          Terminal Report Cards Compiler
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('TIMETABLE')}
          className={`py-3 border-b-2 transition ${activeTab === 'TIMETABLE' ? 'border-indigo-600 text-indigo-700 font-bold' : 'border-transparent text-slate-600 hover:text-slate-900'}`}
        >
          Master Academic Timetable
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('UNEB')}
          className={`py-3 border-b-2 transition ${activeTab === 'UNEB' ? 'border-indigo-600 text-indigo-700 font-bold' : 'border-transparent text-slate-600 hover:text-slate-900'}`}
        >
          UNEB Candidate Centre (UCE / UACE)
        </button>
      </div>

      {/* Content */}
      <div className="p-6">
        {activeTab === 'MARKS' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-500 mb-1">Class Stream</label>
                  <select
                    value={selectedClass}
                    onChange={(e) => setSelectedClass(e.target.value)}
                    className="text-xs bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-slate-700 font-semibold"
                  >
                    <option value="S.4 East">S.4 East (Sciences)</option>
                    <option value="S.4 West">S.4 West (Arts)</option>
                    <option value="S.3 North">S.3 North</option>
                    <option value="S.6 PCM">S.6 PCM (West)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-500 mb-1">Subject</label>
                  <select
                    value={selectedSubject}
                    onChange={(e) => setSelectedSubject(e.target.value)}
                    className="text-xs bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-slate-700 font-semibold"
                  >
                    <option value="MATHEMATICS">Mathematics (456/1 & 456/2)</option>
                    <option value="PHYSICS">Physics (535/1 & 535/2)</option>
                    <option value="CHEMISTRY">Chemistry (545/1 & 545/2)</option>
                    <option value="BIOLOGY">Biology (553/1 & 553/2)</option>
                    <option value="ENGLISH">English Language (112/1)</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end">
                <button 
                  type="button"
                  className="flex items-center gap-1 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Marksheet Template</span>
                </button>
              </div>
            </div>

            <div className="border border-slate-200 rounded-lg overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
                  <tr>
                    <th className="px-4 py-2.5">Learner LIN</th>
                    <th className="px-4 py-2.5">Candidate Name</th>
                    <th className="px-4 py-2.5 text-center">BOT (30%)</th>
                    <th className="px-4 py-2.5 text-center">MOT (30%)</th>
                    <th className="px-4 py-2.5 text-center">EOT (40%)</th>
                    <th className="px-4 py-2.5 text-center">AOI Score (/3.0)</th>
                    <th className="px-4 py-2.5 text-center">Final Grade</th>
                    <th className="px-4 py-2.5">UNEB Classification</th>
                    <th className="px-4 py-2.5 text-right">Remarks</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                  {assessmentMarks.map((m) => (
                    <tr key={m.lin} className="hover:bg-slate-50/80 transition">
                      <td className="px-4 py-2.5 font-mono text-slate-500">{m.lin}</td>
                      <td className="px-4 py-2.5 font-bold text-slate-900">{m.name}</td>
                      <td className="px-4 py-2.5 text-center font-mono">{m.botMark}%</td>
                      <td className="px-4 py-2.5 text-center font-mono">{m.motMark}%</td>
                      <td className="px-4 py-2.5 text-center font-mono font-bold text-slate-900">{m.eotMark}%</td>
                      <td className="px-4 py-2.5 text-center font-mono text-indigo-700 font-bold">{m.aoiScore}</td>
                      <td className="px-4 py-2.5 text-center font-bold">
                        <span className="px-2 py-0.5 bg-indigo-100 text-indigo-800 rounded text-[10px]">
                          {m.finalGrade}
                        </span>
                      </td>
                      <td className="px-4 py-2.5 text-slate-700 font-semibold">{m.unebGrade}</td>
                      <td className="px-4 py-2.5 text-right text-slate-500 italic text-[11px]">Excellent mastery of concepts</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab !== 'MARKS' && (
          <div className="p-8 text-center bg-slate-50 rounded-lg border border-dashed border-slate-300">
            <Award className="w-10 h-10 text-slate-400 mx-auto mb-2" />
            <h3 className="text-sm font-bold text-slate-800">{activeTab} Workspace</h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto mt-1">
              Academic operations managing NCDC revised curriculum frameworks, automated report card compiles with personalized teacher comments, and candidate national index verification.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
