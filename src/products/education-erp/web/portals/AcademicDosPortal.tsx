import React, { useState } from 'react';
import { BookOpen, Download } from 'lucide-react';
import { JumoDataTable, Column } from '../../../../core/enterprise/components/JumoDataTable';

export const AcademicDosPortal: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'MARKS' | 'REPORT_CARDS'>('MARKS');

  const [selectedClass, setSelectedClass] = useState('S.4 East');
  const [selectedSubject, setSelectedSubject] = useState('MATHEMATICS');

  const assessmentMarks = [
    { lin: 'LIN-2026-0891', name: 'Okello Brian', botMark: 78, motMark: 82, eotMark: 85, aoiScore: 2.8, finalGrade: 'D1', unebGrade: 'Distinction' },
    { lin: 'LIN-2026-0892', name: 'Nassali Juliet', botMark: 65, motMark: 70, eotMark: 75, aoiScore: 2.5, finalGrade: 'C3', unebGrade: 'Credit' },
    { lin: 'LIN-2026-0893', name: 'Tumwine Arthur', botMark: 82, motMark: 85, eotMark: 88, aoiScore: 2.9, finalGrade: 'D1', unebGrade: 'Distinction' },
    { lin: 'LIN-2026-0894', name: 'Achieng Mary', botMark: 50, motMark: 55, eotMark: 62, aoiScore: 2.0, finalGrade: 'P8', unebGrade: 'Pass' }
  ];

  const columns: Column<any>[] = [
    { header: 'LEARNER LIN', accessor: 'lin', className: 'font-mono text-slate-500 text-xs font-bold', sortable: true },
    { header: 'CANDIDATE NAME', accessor: 'name', className: 'font-bold text-slate-900 text-xs', sortable: true },
    { header: 'BOT (30%)', accessor: (row) => <span className="font-mono text-xs">{row.botMark}%</span>, className: 'text-center' },
    { header: 'MOT (30%)', accessor: (row) => <span className="font-mono text-xs">{row.motMark}%</span>, className: 'text-center' },
    { header: 'EOT (40%)', accessor: (row) => <span className="font-mono text-xs font-bold">{row.eotMark}%</span>, className: 'text-center' },
    { header: 'AOI SCORE', accessor: (row) => <span className="font-mono text-xs font-bold text-indigo-700">{row.aoiScore}</span>, className: 'text-center' },
    { header: 'FINAL GRADE', accessor: (row) => <span className="px-2 py-0.5 bg-indigo-100 text-indigo-800 rounded text-[10px] font-bold">{row.finalGrade}</span>, className: 'text-center' },
    { header: 'UNEB CLASS', accessor: 'unebGrade', className: 'text-slate-700 text-xs font-semibold' }
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden pb-12 animate-in fade-in duration-300">
      <div className="border-b border-slate-200 bg-slate-50/50 px-6 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold shadow-xs">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-slate-900 tracking-tight">DIRECTOR OF STUDIES (DOS)</h2>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-indigo-100 text-indigo-800 border border-indigo-300">
                ACADEMIC EXECUTIVE
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Curriculum Management • Assessment & Grading • Report Cards Formulation
            </p>
          </div>
        </div>
      </div>

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

      <div className="flex border-b border-slate-200 bg-slate-50/40 px-6 gap-6 text-xs font-semibold">
        <button
          onClick={() => setActiveTab('MARKS')}
          className={`py-3 border-b-2 transition ${activeTab === 'MARKS' ? 'border-indigo-600 text-indigo-700 font-bold' : 'border-transparent text-slate-600 hover:text-slate-900'}`}
        >
          Continuous Assessment
        </button>
      </div>

      <div className="p-6">
        {activeTab === 'MARKS' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
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
                  </select>
                </div>
              </div>
              <button className="flex items-center gap-1 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold self-end">
                <Download className="w-3.5 h-3.5" /> Download Template
              </button>
            </div>

            <JumoDataTable
              title={`${selectedSubject} - ${selectedClass} Marksheet`}
              data={assessmentMarks}
              columns={columns}
              searchPlaceholder="Find student..."
            />
          </div>
        )}
      </div>
    </div>
  );
};
