import React, { useState } from 'react';
import { 
  Users, Search, Filter, Plus, Download, UserCheck, 
  Building2, ArrowRight, CheckCircle2, ShieldCheck, 
  FileText, GraduationCap, MapPin, Phone
} from 'lucide-react';

export const RegistrarOfficePortal: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'STUDENTS' | 'ADMISSIONS' | 'STREAMS' | 'PROMOTION'>('STUDENTS');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterClass, setFilterClass] = useState('ALL');

  const studentsList = [
    { lin: 'LIN-2026-0891', name: 'Okello Brian', gender: 'M', classStream: 'S.4 East', boarder: 'Boarding', parent: 'Mzee Okello J. (0772-112233)', status: 'ACTIVE', unebIndex: 'U0892/001' },
    { lin: 'LIN-2026-0892', name: 'Nakato Sarah', gender: 'F', classStream: 'S.3 North', boarder: 'Day Scholar', parent: 'Mrs. Nakato M. (0701-445566)', status: 'ACTIVE', unebIndex: 'PENDING' },
    { lin: 'LIN-2026-0893', name: 'Kato Emmanuel', gender: 'M', classStream: 'S.6 West (PCM)', boarder: 'Boarding', parent: 'Dr. Kato P. (0782-998877)', status: 'ACTIVE', unebIndex: 'U0892/045' },
    { lin: 'LIN-2026-0894', name: 'Achieng Grace', gender: 'F', classStream: 'S.2 South', boarder: 'Day Scholar', parent: 'Hon. Achieng R. (0752-332211)', status: 'ACTIVE', unebIndex: 'PENDING' },
    { lin: 'LIN-2026-0895', name: 'Mukasa David', gender: 'M', classStream: 'S.5 East (BCM)', boarder: 'Boarding', parent: 'Mr. Mukasa E. (0774-665544)', status: 'ACTIVE', unebIndex: 'U0892/102' },
    { lin: 'LIN-2026-0896', name: 'Akello Patricia', gender: 'F', classStream: 'S.1 North', boarder: 'Boarding', parent: 'Eng. Akello F. (0712-778899)', status: 'ACTIVE', unebIndex: 'PENDING' }
  ];

  const filteredStudents = studentsList.filter(s => {
    const matchSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) || s.lin.toLowerCase().includes(searchTerm.toLowerCase());
    const matchClass = filterClass === 'ALL' || s.classStream.includes(filterClass);
    return matchSearch && matchClass;
  });

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
      {/* Header */}
      <div className="border-b border-slate-200 bg-slate-50/50 px-6 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold shadow-xs">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-slate-900 tracking-tight">REGISTRAR OFFICE & ADMISSIONS</h2>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-blue-100 text-blue-800 border border-blue-300">
                NCDC / LIN CERTIFIED
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Student Information System (SIS) • Canonical Learner Identification Registry
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button 
            type="button"
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold shadow-xs transition"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Admit New Student</span>
          </button>
        </div>
      </div>

      {/* KPI Ribbon */}
      <div className="grid grid-cols-2 md:grid-cols-4 border-b border-slate-200 divide-x divide-slate-200 bg-white">
        <div className="p-4">
          <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wider block">Total Active Enrollment</span>
          <span className="text-lg font-bold text-slate-900 mt-1 block">1,280 Students</span>
          <span className="text-[10px] text-blue-600 font-medium">654 Boys • 626 Girls</span>
        </div>
        <div className="p-4">
          <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wider block">Boarding House Residents</span>
          <span className="text-lg font-bold text-slate-900 mt-1 block">840 Residents</span>
          <span className="text-[10px] text-slate-500">440 Day Scholars</span>
        </div>
        <div className="p-4">
          <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wider block">LIN Registration Status</span>
          <span className="text-lg font-bold text-emerald-600 mt-1 block">99.4% Verified</span>
          <span className="text-[10px] text-emerald-600 font-medium">Synced with Ministry of Education</span>
        </div>
        <div className="p-4">
          <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wider block">UNEB Registered Candidates</span>
          <span className="text-lg font-bold text-purple-700 mt-1 block">348 Candidates</span>
          <span className="text-[10px] text-purple-600 font-medium">UCE: 210 • UACE: 138</span>
        </div>
      </div>

      {/* Sub Tabs */}
      <div className="flex border-b border-slate-200 bg-slate-50/40 px-6 gap-6 text-xs font-semibold">
        <button
          type="button"
          onClick={() => setActiveTab('STUDENTS')}
          className={`py-3 border-b-2 transition ${activeTab === 'STUDENTS' ? 'border-blue-600 text-blue-700 font-bold' : 'border-transparent text-slate-600 hover:text-slate-900'}`}
        >
          Master Student Directory (SIS)
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('ADMISSIONS')}
          className={`py-3 border-b-2 transition ${activeTab === 'ADMISSIONS' ? 'border-blue-600 text-blue-700 font-bold' : 'border-transparent text-slate-600 hover:text-slate-900'}`}
        >
          New Admissions Intake Register
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('STREAMS')}
          className={`py-3 border-b-2 transition ${activeTab === 'STREAMS' ? 'border-blue-600 text-blue-700 font-bold' : 'border-transparent text-slate-600 hover:text-slate-900'}`}
        >
          Class Streams & Room Allocations
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('PROMOTION')}
          className={`py-3 border-b-2 transition ${activeTab === 'PROMOTION' ? 'border-blue-600 text-blue-700 font-bold' : 'border-transparent text-slate-600 hover:text-slate-900'}`}
        >
          End of Year Promotion & Transfers
        </button>
      </div>

      {/* Content */}
      <div className="p-6">
        {activeTab === 'STUDENTS' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Search by student name, LIN or UNEB Index..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-hidden text-slate-800 placeholder-slate-400"
                />
              </div>

              <div className="flex items-center gap-2">
                <select
                  value={filterClass}
                  onChange={(e) => setFilterClass(e.target.value)}
                  className="text-xs bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-slate-700 font-medium"
                >
                  <option value="ALL">All Classes</option>
                  <option value="S.1">Senior 1</option>
                  <option value="S.2">Senior 2</option>
                  <option value="S.3">Senior 3</option>
                  <option value="S.4">Senior 4</option>
                  <option value="S.5">Senior 5</option>
                  <option value="S.6">Senior 6</option>
                </select>

                <button 
                  type="button"
                  className="flex items-center gap-1 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export Bio-Data</span>
                </button>
              </div>
            </div>

            <div className="border border-slate-200 rounded-lg overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
                  <tr>
                    <th className="px-4 py-2.5">Learner LIN</th>
                    <th className="px-4 py-2.5">Full Student Name</th>
                    <th className="px-4 py-2.5 text-center">Gender</th>
                    <th className="px-4 py-2.5">Class / Stream</th>
                    <th className="px-4 py-2.5">Section</th>
                    <th className="px-4 py-2.5">Parent / Guardian Contact</th>
                    <th className="px-4 py-2.5 text-center">UNEB Index</th>
                    <th className="px-4 py-2.5 text-center">Status</th>
                    <th className="px-4 py-2.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                  {filteredStudents.map((s) => (
                    <tr key={s.lin} className="hover:bg-slate-50/80 transition">
                      <td className="px-4 py-2.5 font-mono text-blue-700 font-semibold">{s.lin}</td>
                      <td className="px-4 py-2.5 font-bold text-slate-900">{s.name}</td>
                      <td className="px-4 py-2.5 text-center">
                        <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${s.gender === 'M' ? 'bg-blue-50 text-blue-700' : 'bg-pink-50 text-pink-700'}`}>
                          {s.gender}
                        </span>
                      </td>
                      <td className="px-4 py-2.5 text-slate-700 font-semibold">{s.classStream}</td>
                      <td className="px-4 py-2.5 text-slate-600">{s.boarder}</td>
                      <td className="px-4 py-2.5 text-slate-600 text-[11px]">{s.parent}</td>
                      <td className="px-4 py-2.5 text-center font-mono text-purple-700 font-semibold">{s.unebIndex}</td>
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
                          Profile
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab !== 'STUDENTS' && (
          <div className="p-8 text-center bg-slate-50 rounded-lg border border-dashed border-slate-300">
            <GraduationCap className="w-10 h-10 text-slate-400 mx-auto mb-2" />
            <h3 className="text-sm font-bold text-slate-800">{activeTab} Workspace</h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto mt-1">
              Authoritative registrar operations including verification of national PLE/UCE transition slips, class stream capacity balancing, and automated batch promotions.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
