import React, { useState } from 'react';
import { Building2, Plus, Download } from 'lucide-react';
import { JumoDataTable, Column } from '../../../../core/enterprise/components/JumoDataTable';
import { JumoWorkflowStatus } from '../../../../core/enterprise/components/JumoWorkflowStatus';

export const HeadTeacherPortal: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'GOVERNANCE' | 'STAFF' | 'COMPLIANCE'>('STAFF');

  const staffRoster = [
    { id: 'STF-01', name: 'Dr. Joseph Mukwaya', role: 'Head Teacher (O & A Level)', dept: 'Institution Leadership', qualification: 'Ph.D. Education Mgt', workload: '4 Periods / Wk', status: 'ACTIVE' },
    { id: 'STF-02', name: 'Mrs. Florence Nabirye', role: 'Deputy Head Teacher (Academics)', dept: 'Sciences', qualification: 'M.Ed. Curriculum Studies', workload: '12 Periods / Wk', status: 'ACTIVE' },
    { id: 'STF-03', name: 'Mr. Peter Okot', role: 'Director of Studies (DOS)', dept: 'Mathematics', qualification: 'B.Sc. Ed (Hons)', workload: '16 Periods / Wk', status: 'ACTIVE' }
  ];

  const columns: Column<any>[] = [
    { header: 'STAFF CODE', accessor: 'id', className: 'font-mono text-slate-500 text-xs font-bold', sortable: true },
    { header: 'FULL NAME', accessor: 'name', className: 'font-bold text-slate-900 text-xs', sortable: true },
    { header: 'DESIGNATION', accessor: 'role', className: 'text-amber-700 text-xs font-semibold' },
    { header: 'DEPARTMENT', accessor: 'dept', className: 'text-slate-600 text-xs' },
    { header: 'QUALIFICATION', accessor: 'qualification', className: 'text-slate-600 text-xs' },
    { header: 'TEACHING LOAD', accessor: 'workload', className: 'text-slate-700 text-xs font-mono' },
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
          <div className="w-10 h-10 rounded-lg bg-amber-600 flex items-center justify-center text-white font-bold shadow-xs">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-slate-900 tracking-tight">HEAD TEACHER & EXECUTIVE OFFICE</h2>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-100 text-amber-800 border border-amber-300">
                BOARD OF GOVERNORS EXECUTIVE
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Institutional Governance • Staff Appraisal • Statutory Regulatory Compliance
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 px-3.5 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-bold shadow-xs transition">
            <Plus className="w-3.5 h-3.5" /> New Statutory Resolution
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 border-b border-slate-200 divide-x divide-slate-200 bg-white">
        <div className="p-4">
          <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wider block">Total Academic & Support Staff</span>
          <span className="text-lg font-bold text-slate-900 mt-1 block">84 Staff Members</span>
          <span className="text-[10px] text-emerald-600 font-medium">100% Teacher Registration (TMIS)</span>
        </div>
        <div className="p-4">
          <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wider block">PTA & Council Resolutions</span>
          <span className="text-lg font-bold text-amber-700 mt-1 block">18 Implemented</span>
          <span className="text-[10px] text-slate-500">3 Pending Council Review</span>
        </div>
        <div className="p-4">
          <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wider block">Institutional Performance Index</span>
          <span className="text-lg font-bold text-blue-700 mt-1 block">94.2 / 100</span>
          <span className="text-[10px] text-blue-600 font-medium">Grade A MoES Rating</span>
        </div>
        <div className="p-4">
          <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wider block">Approved Annual Budget</span>
          <span className="text-lg font-bold text-slate-900 mt-1 block">UGX 3.2 Billion</span>
          <span className="text-[10px] text-slate-500">Capital & Recurrent Expenditure</span>
        </div>
      </div>

      <div className="flex border-b border-slate-200 bg-slate-50/40 px-6 gap-6 text-xs font-semibold">
        <button
          onClick={() => setActiveTab('GOVERNANCE')}
          className={`py-3 border-b-2 transition ${activeTab === 'GOVERNANCE' ? 'border-amber-600 text-amber-700 font-bold' : 'border-transparent text-slate-600 hover:text-slate-900'}`}
        >
          Board of Governors & PTA
        </button>
        <button
          onClick={() => setActiveTab('STAFF')}
          className={`py-3 border-b-2 transition ${activeTab === 'STAFF' ? 'border-amber-600 text-amber-700 font-bold' : 'border-transparent text-slate-600 hover:text-slate-900'}`}
        >
          Teaching Staff Roster
        </button>
      </div>

      <div className="p-6">
        {activeTab === 'STAFF' ? (
          <JumoDataTable
            title="Teaching & Administrative Staff"
            data={staffRoster}
            columns={columns}
            searchPlaceholder="Search by name, dept..."
            actions={() => (
              <button className="px-2 py-1 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 rounded text-[11px] font-semibold">
                Appraisal
              </button>
            )}
          />
        ) : (
          <div className="p-8 text-center bg-slate-50 rounded-lg border border-dashed border-slate-300">
            <Building2 className="w-10 h-10 text-slate-400 mx-auto mb-2" />
            <h3 className="text-sm font-bold text-slate-800">{activeTab} Dashboard</h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto mt-1">
              Select Teaching Staff Roster to view the actual data.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
