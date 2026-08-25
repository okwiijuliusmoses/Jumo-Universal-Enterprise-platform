import React, { useState } from 'react';
import { UserCheck, CheckSquare, List, Download } from 'lucide-react';
import { JumoDataTable, Column } from '../../../../core/enterprise/components/JumoDataTable';

export const TeacherGradebookPortal: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'ATTENDANCE' | 'GRADEBOOK'>('GRADEBOOK');

  const [selectedClass, setSelectedClass] = useState('S.4 East');

  const students = [
    { lin: 'LIN-2026-0891', name: 'Okello Brian', gender: 'M', attendance: 'Present', mark: 85, remark: 'Excellent' },
    { lin: 'LIN-2026-0892', name: 'Nassali Juliet', gender: 'F', attendance: 'Absent', mark: 75, remark: 'Good' },
    { lin: 'LIN-2026-0893', name: 'Tumwine Arthur', gender: 'M', attendance: 'Present', mark: 88, remark: 'Excellent' }
  ];

  const columns: Column<any>[] = [
    { header: 'LEARNER LIN', accessor: 'lin', className: 'font-mono text-slate-500 text-xs font-bold', sortable: true },
    { header: 'CANDIDATE NAME', accessor: 'name', className: 'font-bold text-slate-900 text-xs', sortable: true },
    { header: 'GENDER', accessor: 'gender', className: 'text-slate-600 text-xs text-center' },
    { 
      header: 'ATTENDANCE', 
      accessor: (row) => (
        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
          row.attendance === 'Present' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
        }`}>
          {row.attendance}
        </span>
      ),
      className: 'text-center'
    },
    { header: 'MARK (%)', accessor: 'mark', className: 'text-center font-mono font-bold' },
    { header: 'REMARKS', accessor: 'remark', className: 'text-slate-600 text-xs' }
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden pb-12 animate-in fade-in duration-300">
      <div className="border-b border-slate-200 bg-slate-50/50 px-6 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-teal-600 flex items-center justify-center text-white font-bold shadow-xs">
            <UserCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-slate-900 tracking-tight">TEACHER & GRADEBOOK</h2>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-teal-100 text-teal-800 border border-teal-300">
                CLASS TEACHER
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Class Attendance • Marksheets • Learner Reports
            </p>
          </div>
        </div>
      </div>

      <div className="flex border-b border-slate-200 bg-slate-50/40 px-6 gap-6 text-xs font-semibold">
        <button
          onClick={() => setActiveTab('GRADEBOOK')}
          className={`py-3 border-b-2 transition ${activeTab === 'GRADEBOOK' ? 'border-teal-600 text-teal-700 font-bold' : 'border-transparent text-slate-600 hover:text-slate-900'}`}
        >
          Assessment Marksheet
        </button>
      </div>

      <div className="p-6">
        {activeTab === 'GRADEBOOK' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-500 mb-1">Assigned Class</label>
                  <select
                    value={selectedClass}
                    onChange={(e) => setSelectedClass(e.target.value)}
                    className="text-xs bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-slate-700 font-semibold"
                  >
                    <option value="S.4 East">S.4 East</option>
                    <option value="S.4 West">S.4 West</option>
                  </select>
                </div>
              </div>
              <button className="flex items-center gap-1 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold self-end">
                <Download className="w-3.5 h-3.5" /> Download Template
              </button>
            </div>

            <JumoDataTable
              title={`${selectedClass} - Students`}
              data={students}
              columns={columns}
              searchPlaceholder="Find student..."
            />
          </div>
        )}
      </div>
    </div>
  );
};
