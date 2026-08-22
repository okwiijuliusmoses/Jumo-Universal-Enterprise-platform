import React, { useState } from 'react';
import { Users, Plus, Download } from 'lucide-react';
import { JumoDataTable, Column } from '../../../../core/enterprise/components/JumoDataTable';
import { JumoWorkflowStatus } from '../../../../core/enterprise/components/JumoWorkflowStatus';

export const RegistrarOfficePortal: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'STUDENTS' | 'ADMISSIONS'>('STUDENTS');

  const studentsList = [
    { id: 'LIN-2026-0891', name: 'Okello Brian', class: 'S.4 East', gender: 'Male', status: 'ACTIVE', type: 'Boarding' },
    { id: 'LIN-2026-0892', name: 'Nassali Juliet', class: 'S.4 West', gender: 'Female', status: 'ACTIVE', type: 'Day' },
    { id: 'LIN-2026-0893', name: 'Tumwine Arthur', class: 'S.3 North', gender: 'Male', status: 'ACTIVE', type: 'Boarding' },
    { id: 'LIN-2026-0894', name: 'Achieng Mary', class: 'S.1 East', gender: 'Female', status: 'ACTIVE', type: 'Boarding' }
  ];

  const columns: Column<any>[] = [
    { header: 'LIN / REG NO', accessor: 'id', className: 'font-mono text-slate-500 text-xs font-bold', sortable: true },
    { header: 'STUDENT NAME', accessor: 'name', className: 'font-bold text-slate-900 text-xs', sortable: true },
    { header: 'CLASS / STREAM', accessor: 'class', className: 'text-indigo-700 text-xs font-semibold' },
    { header: 'GENDER', accessor: 'gender', className: 'text-slate-600 text-xs' },
    { header: 'TYPE', accessor: 'type', className: 'text-slate-600 text-xs font-mono' },
    { 
      header: 'STATUS', 
      accessor: (row) => <JumoWorkflowStatus status={row.status} />,
      className: 'text-center'
    }
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden pb-12 animate-in fade-in duration-300">
      <div className="border-b border-slate-200 bg-slate-50/50 px-6 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold shadow-xs">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-slate-900 tracking-tight">REGISTRAR & ADMISSIONS</h2>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-indigo-100 text-indigo-800 border border-indigo-300">
                LIN VERIFIED
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Student Registration • Bio-Data Management • Termly Enrollment
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold shadow-xs transition">
            <Plus className="w-3.5 h-3.5" /> Register Student
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 border-b border-slate-200 divide-x divide-slate-200 bg-white">
        <div className="p-4">
          <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wider block">Total Enrollment</span>
          <span className="text-lg font-bold text-slate-900 mt-1 block">1,248 Students</span>
          <span className="text-[10px] text-emerald-600 font-medium">+42 this academic year</span>
        </div>
        <div className="p-4">
          <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wider block">Boarding vs Day</span>
          <span className="text-lg font-bold text-indigo-700 mt-1 block">850 / 398</span>
          <span className="text-[10px] text-slate-500">Boarding Majority (68%)</span>
        </div>
        <div className="p-4">
          <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wider block">Gender Parity Ratio</span>
          <span className="text-lg font-bold text-slate-900 mt-1 block">602 Boys / 646 Girls</span>
          <span className="text-[10px] text-slate-500">Female majority (52%)</span>
        </div>
        <div className="p-4">
          <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wider block">UNEB Candidates</span>
          <span className="text-lg font-bold text-rose-700 mt-1 block">214 Registered</span>
          <span className="text-[10px] text-rose-600 font-medium">S.4 (120) • S.6 (94)</span>
        </div>
      </div>

      <div className="flex border-b border-slate-200 bg-slate-50/40 px-6 gap-6 text-xs font-semibold">
        <button
          onClick={() => setActiveTab('STUDENTS')}
          className={`py-3 border-b-2 transition ${activeTab === 'STUDENTS' ? 'border-indigo-600 text-indigo-700 font-bold' : 'border-transparent text-slate-600 hover:text-slate-900'}`}
        >
          Master Student Nominal Roll
        </button>
        <button
          onClick={() => setActiveTab('ADMISSIONS')}
          className={`py-3 border-b-2 transition ${activeTab === 'ADMISSIONS' ? 'border-indigo-600 text-indigo-700 font-bold' : 'border-transparent text-slate-600 hover:text-slate-900'}`}
        >
          New Admissions Pipeline
        </button>
      </div>

      <div className="p-6">
        {activeTab === 'STUDENTS' ? (
          <JumoDataTable
            title="Active Student Roll"
            data={studentsList}
            columns={columns}
            searchPlaceholder="Search by name, LIN, class..."
            actions={() => (
              <button className="px-2 py-1 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 rounded text-[11px] font-semibold">
                Profile
              </button>
            )}
          />
        ) : (
          <div className="p-8 text-center bg-slate-50 rounded-lg border border-dashed border-slate-300">
            <Users className="w-10 h-10 text-slate-400 mx-auto mb-2" />
            <h3 className="text-sm font-bold text-slate-800">Admissions Pipeline</h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto mt-1">
              Select Master Student Nominal Roll to view the actual data.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
