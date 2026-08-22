import React, { useState } from 'react';
import { 
  GraduationCap, BookOpen, Users, CheckCircle2, Award, 
  Building2, Plus, Search, Filter, Download, ShieldCheck, DollarSign
} from 'lucide-react';
import { PortalAuthenticationGate } from '../../../PortalAuthenticationGate';

export const PrimaryHeadteacherPortal: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'STREAM_REGISTRY' | 'PLE_CENTER' | 'DISCIPLINE'>('STREAM_REGISTRY');

  const pupilStreams = [
    { class: 'Primary One (P.1)', streams: 4, pupils: 180, classTeacher: 'Tr. Agnes Namuleme', status: 'ACTIVE' },
    { class: 'Primary Two (P.2)', streams: 4, pupils: 175, classTeacher: 'Tr. Samuel Okello', status: 'ACTIVE' },
    { class: 'Primary Three (P.3)', streams: 4, pupils: 168, classTeacher: 'Tr. Joyce Kigozi', status: 'ACTIVE' },
    { class: 'Primary Four (P.4)', streams: 4, pupils: 172, classTeacher: 'Tr. Peter Mukasa', status: 'ACTIVE' },
    { class: 'Primary Five (P.5)', streams: 4, pupils: 165, classTeacher: 'Tr. Grace Nyanzi', status: 'ACTIVE' },
    { class: 'Primary Six (P.6)', streams: 4, pupils: 160, classTeacher: 'Tr. Charles Akello', status: 'ACTIVE' },
    { class: 'Primary Seven (P.7)', streams: 4, pupils: 155, classTeacher: 'Tr. Francis Kato', status: 'PLE_CANDIDATES' }
  ];

  return (
    <PortalAuthenticationGate
      portalId="primary-headteacher"
      portalName="Hillside Naalya Benchmark — Primary Headteacher & Governance Office"
      domainContext="JUMO-SCHOOL-ERP"
      requiredRoles={['ROLE_PRIMARY_HEADTEACHER', 'ROLE_HEADTEACHER', 'ROLE_SCHOOL_ADMIN']}
      onAuthenticated={() => {}}
    >
      <div className="space-y-6 animate-in fade-in duration-300 pb-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Primary School Governance & P.1–P.7 Streams</h1>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-blue-100 text-blue-800 border border-blue-300 uppercase">
                Hillside Naalya Benchmark
              </span>
            </div>
            <p className="text-slate-500 text-xs mt-1">
              Pupil stream allocations, PLE candidate registration, thematic curriculum governance & UNEB Primary Leaving Examination administration.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={() => alert('Exporting PLE Candidate Nominal Roll...')}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-bold shadow-2xs transition cursor-pointer"
            >
              <Download className="w-4 h-4 text-slate-500" />
              <span>Export PLE Roll</span>
            </button>
            <button 
              onClick={() => alert('Admitting new pupil to P.1 - P.7...')}
              className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-xs transition cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Admit Primary Pupil</span>
            </button>
          </div>
        </div>

        {/* Primary School KPI Ribbon */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Primary Enrollment</span>
            <p className="text-2xl font-black text-slate-900 mt-1 font-mono">1,155 Pupils</p>
            <p className="text-[11px] text-blue-600 font-bold mt-1">28 Class Streams (P.1–P.7)</p>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">PLE Candidate Class (P.7)</span>
            <p className="text-2xl font-black text-emerald-600 mt-1 font-mono">155 Registered</p>
            <p className="text-[11px] text-slate-500 mt-1">100% Index Numbers Verified</p>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Primary Fee Collection Rate</span>
            <p className="text-2xl font-black text-slate-900 mt-1 font-mono">92.4%</p>
            <p className="text-[11px] text-emerald-600 font-bold mt-1">FAAP Ledger Reconciled</p>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Academic Staffing</span>
            <p className="text-2xl font-black text-purple-700 mt-1 font-mono">48 Teachers</p>
            <p className="text-[11px] text-slate-500 mt-1">1:24 Teacher-to-Pupil Ratio</p>
          </div>
        </div>

        {/* Primary Class Streams Table */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-2xs overflow-hidden">
          <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
            <h3 className="font-bold text-slate-800 text-sm">Class Stream Allocations & Class Teachers</h3>
            <span className="text-xs font-mono font-bold text-blue-800 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">
              P.1–P.7 Structure
            </span>
          </div>

          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] tracking-widest border-b border-slate-100">
              <tr>
                <th className="px-6 py-4">Class Level</th>
                <th className="px-6 py-4 text-center">Number of Streams</th>
                <th className="px-6 py-4 text-center">Pupil Count</th>
                <th className="px-6 py-4">Senior Class Teacher</th>
                <th className="px-6 py-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {pupilStreams.map(s => (
                <tr key={s.class} className="hover:bg-slate-50 transition">
                  <td className="px-6 py-4 font-bold text-slate-900">{s.class}</td>
                  <td className="px-6 py-4 text-center font-mono font-semibold text-slate-700">{s.streams} Streams</td>
                  <td className="px-6 py-4 text-center font-mono font-bold text-blue-700">{s.pupils} Pupils</td>
                  <td className="px-6 py-4 text-slate-700">{s.classTeacher}</td>
                  <td className="px-6 py-4 text-center">
                    <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 text-[10px] font-black rounded-full uppercase">
                      {s.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </PortalAuthenticationGate>
  );
};

export const PrimaryThematicCurriculumPortal: React.FC = () => {
  return (
    <PortalAuthenticationGate
      portalId="primary-thematic"
      portalName="Thematic & Subject Curriculum Assessment Console"
      domainContext="JUMO-SCHOOL-ERP"
      requiredRoles={['ROLE_PRIMARY_HEADTEACHER', 'ROLE_DOS', 'ROLE_HEADTEACHER']}
      onAuthenticated={() => {}}
    >
      <div className="bg-white border border-slate-200 rounded-2xl p-8 space-y-6 animate-in fade-in duration-300">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <BookOpen className="w-8 h-8 text-blue-600" />
          <div>
            <h2 className="text-xl font-bold text-slate-900">Primary Curriculum & Assessment Framework</h2>
            <p className="text-xs text-slate-500">Thematic Curriculum (P.1–P.3) & Subject Curriculum (P.4–P.7) for English, Mathematics, Science, SST.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
            <h3 className="font-bold text-slate-900 text-sm">Lower Primary (P.1–P.3) Thematic Competencies</h3>
            <p className="text-xs text-slate-600">Literacy, Numeracy, News, Creative Arts & Physical Education.</p>
            <div className="pt-2 flex items-center justify-between font-mono text-xs">
              <span className="text-slate-500">Competency Mastery:</span>
              <span className="font-bold text-emerald-700">92.8% Average</span>
            </div>
          </div>

          <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
            <h3 className="font-bold text-slate-900 text-sm">Upper Primary (P.4–P.7) Four Core Subjects</h3>
            <p className="text-xs text-slate-600">English Language, Mathematics, Integrated Science, Social Studies (SST).</p>
            <div className="pt-2 flex items-center justify-between font-mono text-xs">
              <span className="text-slate-500">PLE Mock Aggregate 4–12 Rate:</span>
              <span className="font-bold text-blue-700">88.5% First Grade</span>
            </div>
          </div>
        </div>
      </div>
    </PortalAuthenticationGate>
  );
};
