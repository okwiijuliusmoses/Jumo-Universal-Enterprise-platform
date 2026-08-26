import React, { useState } from 'react';
import { 
  BookOpen, Award, Users, DollarSign, Bus, Stethoscope, 
  Library, Clock, Plus, Search, CheckCircle2, FileText, 
  TrendingUp, BarChart2, UserCheck, AlertCircle
} from 'lucide-react';

export const PrimarySchoolTemplateView: React.FC<{ activeSubmodule: string }> = ({ activeSubmodule }) => {
  const [pupils, setPupils] = useState([
    { id: 'PRI-P7-001', name: 'Nalubega Prossy', class: 'Primary 7 Alpha (PLE Candidate)', aggregate: '4 Aggregates (Distinction)', fees: 'Paid in Full ($160.00)', attendance: '99.2%', transportRoute: 'Route 3 - Naalya/Kira' },
    { id: 'PRI-P7-002', name: 'Mukisa Daniel', class: 'Primary 7 Beta (PLE Candidate)', aggregate: '6 Aggregates (Division 1)', fees: 'Paid in Full ($160.00)', attendance: '97.5%', transportRoute: 'Route 1 - Ntinda' },
    { id: 'PRI-P5-014', name: 'Alinda Rebecca', class: 'Primary 5 Streams Blue', aggregate: '82% Term Avg (Grade A)', fees: 'Balance $40.00', attendance: '95.0%', transportRoute: 'Route 5 - Kisaasi' },
    { id: 'PRI-P3-022', name: 'Okello Brian', class: 'Primary 3 Streams Green', aggregate: '76% Term Avg (Grade B+)', fees: 'Paid in Full ($140.00)', attendance: '98.0%', transportRoute: 'Walker (Parent Pickup)' }
  ]);

  const [assessments, setAssessments] = useState([
    { subject: 'Mathematics (P7 Mock I)', teacher: 'Tr. Okello Francis', avg: '84.2%', topScore: '98%', distinctionRate: '68% Div 1' },
    { subject: 'Integrated Science (P7 Mock I)', teacher: 'Tr. Namaganda Grace', avg: '79.5%', topScore: '94%', distinctionRate: '62% Div 1' },
    { subject: 'English Grammar & Comp (P7)', teacher: 'Tr. Peter Sserwadda', avg: '88.0%', topScore: '96%', distinctionRate: '75% Div 1' },
    { subject: 'Social Studies & R.E (P7)', teacher: 'Tr. Judith Akello', avg: '81.4%', topScore: '92%', distinctionRate: '59% Div 1' }
  ]);

  return (
    <div className="space-y-6">
      {/* Template Header Banner */}
      <div className="bg-gradient-to-r from-emerald-500/10 via-emerald-500/5 to-transparent p-5 rounded-2xl border border-emerald-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-md">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-slate-900">Primary School Academic & Operations Center</h2>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-300">P1 - P7 Curriculum</span>
            </div>
            <p className="text-xs text-slate-600">Continuous assessments (BOT, MOT, EOT), PLE national rankings, student transport & Alpha Cash Book fee records</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button className="px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl flex items-center gap-2 shadow-xs transition">
            <Plus className="w-4 h-4" /> New Pupil Admission
          </button>
        </div>
      </div>

      {/* Pupil Performance & Term Registry Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/60">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-emerald-600" />
            <h3 className="text-sm font-bold text-slate-900">Primary Class Streams & Pupil Continuous Assessment Registry</h3>
          </div>
          <span className="text-xs text-slate-500 font-mono">1,420 Active Pupils</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Pupil ID & Name</th>
                <th className="py-3 px-4">Class Stream</th>
                <th className="py-3 px-4">Term Performance Score</th>
                <th className="py-3 px-4">School Fees (FAAP)</th>
                <th className="py-3 px-4">Attendance</th>
                <th className="py-3 px-4">Transport Fleet Route</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {pupils.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-4">
                    <div className="font-bold text-slate-900">{p.name}</div>
                    <div className="text-[10px] font-mono text-slate-400">{p.id}</div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 bg-emerald-50 text-emerald-800 font-medium rounded border border-emerald-200 text-[11px]">{p.class}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="font-bold text-slate-900">{p.aggregate}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-0.5 rounded font-semibold text-[10px] inline-flex items-center gap-1 ${p.fees.includes('Paid') ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-amber-50 text-amber-700 border border-amber-200'}`}>
                      {p.fees}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="font-mono text-slate-700">{p.attendance}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-slate-600 font-medium">{p.transportRoute}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Assessment Breakdown Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-emerald-600" />
              <h3 className="text-sm font-bold text-slate-900">National Mock & Continuous Assessment (BOT/MOT/EOT)</h3>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">P7 Mock Results</span>
          </div>

          <div className="space-y-3">
            {assessments.map((a, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-slate-900">{a.subject}</span>
                  <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">{a.avg} Avg</span>
                </div>
                <div className="text-[11px] text-slate-500 font-medium">Instructor: {a.teacher}</div>
                <div className="flex items-center gap-4 pt-1 text-[11px] text-slate-600 font-medium">
                  <span>Top Mark: <strong className="text-slate-900">{a.topScore}</strong></span>
                  <span>Distinction Target: <strong className="text-emerald-700">{a.distinctionRate}</strong></span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Transport & School Feeding Summary */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Bus className="w-4 h-4 text-emerald-600" />
              <h3 className="text-sm font-bold text-slate-900">Transport Fleet & School Feeding Operations</h3>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800">14 Active Vans</span>
          </div>

          <div className="space-y-3">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-slate-800">Fleet Route 1 (Ntinda - Bukoto - Kamwokya)</span>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">All 32 Pupils Picked</span>
              </div>
              <p className="text-xs text-slate-500">Driver: John Bosco • Bus Attendant: Sarah N. • ETA School Gate: 07:15 AM</p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-slate-800">Fleet Route 3 (Naalya - Namugongo - Kira)</span>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">All 28 Pupils Picked</span>
              </div>
              <p className="text-xs text-slate-500">Driver: Emmanuel Kato • Bus Attendant: Mary A. • ETA School Gate: 07:22 AM</p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-slate-800">Midday Posho, Beans & Greens Meal Program</span>
                <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">1,420 Meals Prepped</span>
              </div>
              <p className="text-xs text-slate-500">Quality hygiene inspection certified by Primary Health Nurse at 10:45 AM.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
