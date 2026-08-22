import React, { useState } from 'react';
import { 
  Building2, Users, ShieldCheck, CheckCircle2, FileText, 
  BarChart2, Award, Calendar, Briefcase, Plus, Search, 
  Printer, ArrowUpRight
} from 'lucide-react';

export const HeadTeacherPortal: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'GOVERNANCE' | 'STAFF' | 'COMPLIANCE'>('GOVERNANCE');

  const staffRoster = [
    { id: 'STF-01', name: 'Dr. Joseph Mukwaya', role: 'Head Teacher / Principal', dept: 'Administration', qualification: 'Ph.D. Education Leadership', workload: '4 Periods / Wk', status: 'ACTIVE' },
    { id: 'STF-02', name: 'Mrs. Florence Nabirye', role: 'Deputy Head Teacher (Academics)', dept: 'Sciences', qualification: 'M.Ed. Curriculum Studies', workload: '12 Periods / Wk', status: 'ACTIVE' },
    { id: 'STF-03', name: 'Mr. Peter Okot', role: 'Director of Studies (DOS)', dept: 'Mathematics', qualification: 'B.Sc. Ed (Hons)', workload: '16 Periods / Wk', status: 'ACTIVE' },
    { id: 'STF-04', name: 'Ms. Sarah Kembabazi', role: 'Chief School Bursar', dept: 'Finance & Accounts', qualification: 'CPA (U), B.Com', workload: 'Full-Time Finance', status: 'ACTIVE' },
    { id: 'STF-05', name: 'Mr. David Ssemakula', role: 'Senior House Master & Warden', dept: 'Student Welfare', qualification: 'B.A. Ed (Literature)', workload: '14 Periods / Wk', status: 'ACTIVE' }
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
      {/* Header */}
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
          <button 
            type="button"
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-bold shadow-xs transition"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Statutory Resolution</span>
          </button>
        </div>
      </div>

      {/* KPI Ribbon */}
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

      {/* Sub Tabs */}
      <div className="flex border-b border-slate-200 bg-slate-50/40 px-6 gap-6 text-xs font-semibold">
        <button
          type="button"
          onClick={() => setActiveTab('GOVERNANCE')}
          className={`py-3 border-b-2 transition ${activeTab === 'GOVERNANCE' ? 'border-amber-600 text-amber-700 font-bold' : 'border-transparent text-slate-600 hover:text-slate-900'}`}
        >
          Board of Governors & PTA Resolutions
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('STAFF')}
          className={`py-3 border-b-2 transition ${activeTab === 'STAFF' ? 'border-amber-600 text-amber-700 font-bold' : 'border-transparent text-slate-600 hover:text-slate-900'}`}
        >
          Teaching & Administrative Staff Roster
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('COMPLIANCE')}
          className={`py-3 border-b-2 transition ${activeTab === 'COMPLIANCE' ? 'border-amber-600 text-amber-700 font-bold' : 'border-transparent text-slate-600 hover:text-slate-900'}`}
        >
          Ministry of Education Statutory Compliance
        </button>
      </div>

      {/* Content */}
      <div className="p-6">
        {activeTab === 'STAFF' ? (
          <div className="space-y-4">
            <div className="border border-slate-200 rounded-lg overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
                  <tr>
                    <th className="px-4 py-2.5">Staff Code</th>
                    <th className="px-4 py-2.5">Full Name</th>
                    <th className="px-4 py-2.5">Designation</th>
                    <th className="px-4 py-2.5">Department</th>
                    <th className="px-4 py-2.5">Academic Qualification</th>
                    <th className="px-4 py-2.5">Teaching Load</th>
                    <th className="px-4 py-2.5 text-center">Status</th>
                    <th className="px-4 py-2.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                  {staffRoster.map((s) => (
                    <tr key={s.id} className="hover:bg-slate-50/80 transition">
                      <td className="px-4 py-2.5 font-mono text-slate-500">{s.id}</td>
                      <td className="px-4 py-2.5 font-bold text-slate-900">{s.name}</td>
                      <td className="px-4 py-2.5 text-amber-700 font-semibold">{s.role}</td>
                      <td className="px-4 py-2.5 text-slate-600">{s.dept}</td>
                      <td className="px-4 py-2.5 text-slate-600">{s.qualification}</td>
                      <td className="px-4 py-2.5 text-slate-700 font-mono">{s.workload}</td>
                      <td className="px-4 py-2.5 text-center">
                        <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded text-[10px] font-bold">
                          {s.status}
                        </span>
                      </td>
                      <td className="px-4 py-2.5 text-right">
                        <button 
                          type="button"
                          className="px-2 py-1 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 rounded text-[11px] font-semibold"
                        >
                          Appraisal
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="p-8 text-center bg-slate-50 rounded-lg border border-dashed border-slate-300">
            <Building2 className="w-10 h-10 text-slate-400 mx-auto mb-2" />
            <h3 className="text-sm font-bold text-slate-800">{activeTab} Executive Register</h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto mt-1">
              Statutory governance minutes, Teacher Management & Information System (TMIS) registration logs, and institutional capital development project oversight.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
