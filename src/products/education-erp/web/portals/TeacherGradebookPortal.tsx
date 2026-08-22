import React, { useState } from 'react';
import { 
  UserCheck, Clock, FileSpreadsheet, BookOpen, CheckCircle2, 
  XCircle, AlertCircle, Plus, Download, Printer, Search
} from 'lucide-react';

export const TeacherGradebookPortal: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'ATTENDANCE' | 'AOI_SCORES' | 'LESSONS'>('ATTENDANCE');
  const [selectedClass, setSelectedClass] = useState('S.4 East');

  const attendanceRoster = [
    { lin: 'LIN-2026-0891', name: 'Okello Brian', status: 'PRESENT', remark: 'On time' },
    { lin: 'LIN-2026-0892', name: 'Nakato Sarah', status: 'PRESENT', remark: 'On time' },
    { lin: 'LIN-2026-0893', name: 'Kato Emmanuel', status: 'PRESENT', remark: 'On time' },
    { lin: 'LIN-2026-0894', name: 'Achieng Grace', status: 'LATE', remark: 'Arrived 08:25 (Dispensary check)' },
    { lin: 'LIN-2026-0895', name: 'Mukasa David', status: 'ABSENT', remark: 'Exeat permit - Medical' },
    { lin: 'LIN-2026-0896', name: 'Akello Patricia', status: 'PRESENT', remark: 'On time' }
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
      {/* Header */}
      <div className="border-b border-slate-200 bg-slate-50/50 px-6 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-teal-600 flex items-center justify-center text-white font-bold shadow-xs">
            <UserCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-slate-900 tracking-tight">TEACHER & GRADEBOOK WORKSPACE</h2>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-teal-100 text-teal-800 border border-teal-300">
                CLASS TEACHER PORTAL
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Daily Class Roll Call • Continuous Assessment (AOI) • Schemes of Work & Lesson Plans
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button 
            type="button"
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-xs font-bold shadow-xs transition"
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Submit Roll Call</span>
          </button>
        </div>
      </div>

      {/* Sub Tabs */}
      <div className="flex border-b border-slate-200 bg-slate-50/40 px-6 gap-6 text-xs font-semibold">
        <button
          type="button"
          onClick={() => setActiveTab('ATTENDANCE')}
          className={`py-3 border-b-2 transition ${activeTab === 'ATTENDANCE' ? 'border-teal-600 text-teal-700 font-bold' : 'border-transparent text-slate-600 hover:text-slate-900'}`}
        >
          Daily Class Roll Call
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('AOI_SCORES')}
          className={`py-3 border-b-2 transition ${activeTab === 'AOI_SCORES' ? 'border-teal-600 text-teal-700 font-bold' : 'border-transparent text-slate-600 hover:text-slate-900'}`}
        >
          Activity of Integration (AOI) Score Sheet
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('LESSONS')}
          className={`py-3 border-b-2 transition ${activeTab === 'LESSONS' ? 'border-teal-600 text-teal-700 font-bold' : 'border-transparent text-slate-600 hover:text-slate-900'}`}
        >
          Schemes of Work & Lesson Notes
        </button>
      </div>

      {/* Content */}
      <div className="p-6">
        {activeTab === 'ATTENDANCE' ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-slate-500">Roll Call for:</span>
                <span className="text-xs font-bold text-slate-900 bg-slate-100 px-2.5 py-1 rounded">S.4 East — Friday, 22 August 2026 (Morning Period)</span>
              </div>
              <div className="text-xs font-semibold text-slate-600">
                Present: <span className="text-emerald-600 font-bold">4</span> • Late: <span className="text-amber-600 font-bold">1</span> • Absent: <span className="text-rose-600 font-bold">1</span>
              </div>
            </div>

            <div className="border border-slate-200 rounded-lg overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
                  <tr>
                    <th className="px-4 py-2.5">Learner LIN</th>
                    <th className="px-4 py-2.5">Student Name</th>
                    <th className="px-4 py-2.5 text-center">Attendance State</th>
                    <th className="px-4 py-2.5">Teacher Remark / Exeat Note</th>
                    <th className="px-4 py-2.5 text-right">Quick Toggle</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                  {attendanceRoster.map((r) => (
                    <tr key={r.lin} className="hover:bg-slate-50/80 transition">
                      <td className="px-4 py-2.5 font-mono text-slate-500">{r.lin}</td>
                      <td className="px-4 py-2.5 font-bold text-slate-900">{r.name}</td>
                      <td className="px-4 py-2.5 text-center">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          r.status === 'PRESENT' ? 'bg-emerald-100 text-emerald-800' :
                          r.status === 'LATE' ? 'bg-amber-100 text-amber-800' :
                          'bg-rose-100 text-rose-800'
                        }`}>
                          {r.status}
                        </span>
                      </td>
                      <td className="px-4 py-2.5 text-slate-600 text-xs">{r.remark}</td>
                      <td className="px-4 py-2.5 text-right">
                        <div className="inline-flex gap-1">
                          <button type="button" className="px-2 py-0.5 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded text-[10px] font-bold">Present</button>
                          <button type="button" className="px-2 py-0.5 bg-amber-50 text-amber-700 hover:bg-amber-100 rounded text-[10px] font-bold">Late</button>
                          <button type="button" className="px-2 py-0.5 bg-rose-50 text-rose-700 hover:bg-rose-100 rounded text-[10px] font-bold">Absent</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="p-8 text-center bg-slate-50 rounded-lg border border-dashed border-slate-300">
            <BookOpen className="w-10 h-10 text-slate-400 mx-auto mb-2" />
            <h3 className="text-sm font-bold text-slate-800">{activeTab} Workspace</h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto mt-1">
              Teacher continuous assessment scoring and NCDC competency tracking with real-time syllabus milestones.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
