import React, { useState } from 'react';
import { 
  Heart, DollarSign, BookOpen, Award, FileText, Download, 
  Printer, CreditCard, CheckCircle2, AlertCircle, Calendar
} from 'lucide-react';

export const ParentStudentPortal: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'RESULTS' | 'FEES' | 'TIMETABLE'>('RESULTS');

  const subjects = [
    { code: 'MTC', name: 'Mathematics', bot: 78, mot: 82, eot: 85, final: 'D1', aoi: 2.8, teacher: 'Mr. Okot P.' },
    { code: 'PHY', name: 'Physics', bot: 74, mot: 79, eot: 80, final: 'D2', aoi: 2.7, teacher: 'Dr. Mukwaya J.' },
    { code: 'CHM', name: 'Chemistry', bot: 70, mot: 72, eot: 75, final: 'C3', aoi: 2.5, teacher: 'Mrs. Nabirye F.' },
    { code: 'BIO', name: 'Biology', bot: 82, mot: 86, eot: 88, final: 'D1', aoi: 2.9, teacher: 'Mr. Ssemakula D.' },
    { code: 'ENG', name: 'English Language', bot: 80, mot: 83, eot: 84, final: 'D1', aoi: 2.8, teacher: 'Ms. Akello V.' },
    { code: 'GEO', name: 'Geography', bot: 68, mot: 71, eot: 74, final: 'C3', aoi: 2.4, teacher: 'Mr. Kato H.' }
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
      {/* Header */}
      <div className="border-b border-slate-200 bg-slate-50/50 px-6 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-rose-600 flex items-center justify-center text-white font-bold shadow-xs">
            <Heart className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-slate-900 tracking-tight">PARENT & STUDENT PORTAL</h2>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-rose-100 text-rose-800 border border-rose-300">
                GUARDIAN VERIFIED
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Student: <strong className="text-slate-800">Okello Brian</strong> (LIN: LIN-2026-0891) • Class: S.4 East (Boarding)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button 
            type="button"
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 rounded-lg text-xs font-semibold shadow-2xs transition"
          >
            <Printer className="w-3.5 h-3.5 text-slate-500" />
            <span>Print Terminal Report</span>
          </button>
          <button 
            type="button"
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-bold shadow-xs transition"
          >
            <CreditCard className="w-3.5 h-3.5" />
            <span>Pay Fees Online (PRN)</span>
          </button>
        </div>
      </div>

      {/* Sub Tabs */}
      <div className="flex border-b border-slate-200 bg-slate-50/40 px-6 gap-6 text-xs font-semibold">
        <button
          type="button"
          onClick={() => setActiveTab('RESULTS')}
          className={`py-3 border-b-2 transition ${activeTab === 'RESULTS' ? 'border-rose-600 text-rose-700 font-bold' : 'border-transparent text-slate-600 hover:text-slate-900'}`}
        >
          Terminal Academic Report Card
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('FEES')}
          className={`py-3 border-b-2 transition ${activeTab === 'FEES' ? 'border-rose-600 text-rose-700 font-bold' : 'border-transparent text-slate-600 hover:text-slate-900'}`}
        >
          School Fees Statement & Receipts
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('TIMETABLE')}
          className={`py-3 border-b-2 transition ${activeTab === 'TIMETABLE' ? 'border-rose-600 text-rose-700 font-bold' : 'border-transparent text-slate-600 hover:text-slate-900'}`}
        >
          Weekly Timetable & Attendance
        </button>
      </div>

      {/* Content */}
      <div className="p-6">
        {activeTab === 'RESULTS' ? (
          <div className="space-y-6">
            {/* Student Report Header */}
            <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 flex flex-col md:flex-row justify-between gap-4">
              <div>
                <span className="text-[11px] font-bold text-slate-500 uppercase">Term Assessment Summary</span>
                <div className="text-sm font-bold text-slate-900 mt-1">2026 Academic Year • Term 1 Report Card</div>
                <div className="text-xs text-slate-600 mt-0.5">Aggregate (Best 8): <strong className="text-emerald-700">12 (Division 1)</strong> • Class Position: <strong>3rd of 84</strong></div>
              </div>
              <div className="text-right">
                <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded font-bold text-xs">
                  PROMOTED ON MERIT
                </span>
              </div>
            </div>

            {/* Results Table */}
            <div className="border border-slate-200 rounded-lg overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
                  <tr>
                    <th className="px-4 py-2.5">Code</th>
                    <th className="px-4 py-2.5">Subject</th>
                    <th className="px-4 py-2.5 text-center">BOT (30%)</th>
                    <th className="px-4 py-2.5 text-center">MOT (30%)</th>
                    <th className="px-4 py-2.5 text-center">EOT (40%)</th>
                    <th className="px-4 py-2.5 text-center">AOI Score</th>
                    <th className="px-4 py-2.5 text-center">Grade</th>
                    <th className="px-4 py-2.5">Subject Teacher</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                  {subjects.map((s) => (
                    <tr key={s.code} className="hover:bg-slate-50/80 transition">
                      <td className="px-4 py-2.5 font-mono text-slate-500 font-bold">{s.code}</td>
                      <td className="px-4 py-2.5 font-bold text-slate-900">{s.name}</td>
                      <td className="px-4 py-2.5 text-center font-mono">{s.bot}%</td>
                      <td className="px-4 py-2.5 text-center font-mono">{s.mot}%</td>
                      <td className="px-4 py-2.5 text-center font-mono font-bold text-slate-900">{s.eot}%</td>
                      <td className="px-4 py-2.5 text-center font-mono text-indigo-700 font-bold">{s.aoi}</td>
                      <td className="px-4 py-2.5 text-center font-bold">
                        <span className="px-2 py-0.5 bg-indigo-100 text-indigo-800 rounded text-[10px]">
                          {s.final}
                        </span>
                      </td>
                      <td className="px-4 py-2.5 text-slate-600">{s.teacher}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Remarks Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                <span className="text-[11px] font-bold text-slate-500 uppercase block mb-1">Class Teacher's Remarks</span>
                <p className="text-xs text-slate-700 italic">
                  "Brian is a disciplined and hardworking learner who consistently excels in the sciences. Keep up this momentum into the national candidate class."
                </p>
                <div className="mt-2 text-[10px] font-bold text-slate-500">— Mr. Okot Peter (Class Teacher)</div>
              </div>
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                <span className="text-[11px] font-bold text-slate-500 uppercase block mb-1">Head Teacher's Remarks</span>
                <p className="text-xs text-slate-700 italic">
                  "An exemplary student of exceptional academic caliber and leadership. Recommended for UNEB candidate registration with distinction honors."
                </p>
                <div className="mt-2 text-[10px] font-bold text-slate-500">— Dr. Joseph Mukwaya (Head Teacher)</div>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-8 text-center bg-slate-50 rounded-lg border border-dashed border-slate-300">
            <DollarSign className="w-10 h-10 text-slate-400 mx-auto mb-2" />
            <h3 className="text-sm font-bold text-slate-800">{activeTab} Details</h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto mt-1">
              Official fees ledger records showing complete zero-balance status and instantaneous digital payment reconciliation with URA PRN tokens.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
