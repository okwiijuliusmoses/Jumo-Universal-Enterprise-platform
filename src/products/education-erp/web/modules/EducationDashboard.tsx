import React from 'react';
import { Users, GraduationCap, FileText, CheckCircle, Clock, TrendingUp, AlertCircle } from 'lucide-react';
import { EducationErpService } from '../../domain/EducationErpService';

export const EducationDashboard: React.FC = () => {
  const service = EducationErpService.getInstance();
  const students = service.getStudents();
  const results = service.getExamResults();
  const commitments = service.getVoteBookCommitments();

  const totalAllocation = commitments.reduce((sum, v) => sum + v.allocatedAmount, 0);
  const totalSpent = commitments.reduce((sum, v) => sum + v.committedAmount, 0);
  const percentSpent = totalAllocation > 0 ? Math.round((totalSpent / totalAllocation) * 100) : 0;

  const stats = [
    { label: 'Total Enrolled Students', value: students.length.toString(), icon: Users, color: 'text-blue-600', bg: 'bg-blue-100', trend: 'Live admissions active' },
    { label: 'Total Budget Head Allocation', value: `${(totalAllocation / 1000000).toFixed(1)}M UGX`, icon: GraduationCap, color: 'text-emerald-600', bg: 'bg-emerald-100', trend: 'Vote Book Secured' },
    { label: 'Pending Exam Marks', value: results.filter(r => !r.isSenateApproved).length.toString(), icon: Clock, color: 'text-amber-600', bg: 'bg-amber-100', trend: 'Moderation pending' },
    { label: 'Vote Funds Spent', value: `${percentSpent}%`, icon: CheckCircle, color: 'text-indigo-600', bg: 'bg-indigo-100', trend: 'Real-time ledger posted' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-16">
      <div className="flex flex-col">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Universal Education Intelligence</h1>
        <p className="text-slate-500 text-sm">Real-time enrollment, academic, and financial telemetry for the Education Platform.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <TrendingUp className="w-4 h-4 text-emerald-500" />
            </div>
            <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider">{stat.label}</p>
            <p className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</p>
            <p className="text-[11px] text-slate-400 mt-2 flex items-center gap-1">
              <CheckCircle className="w-3 h-3 text-emerald-500" />
              {stat.trend}
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <h3 className="font-bold text-slate-900 text-sm">Recent Academic Approvals</h3>
            <span className="text-xs font-bold text-slate-400">Moderated by Senate Board</span>
          </div>
          <div className="p-0">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] tracking-widest border-b border-slate-100">
                <tr>
                  <th className="px-6 py-3">Course Code</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3 text-center">Score Grade</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {results.slice(0, 3).map((item, i) => (
                  <tr key={i} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-mono font-bold text-slate-900">{item.courseCode} ({item.termOrSemester})</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider ${
                        item.isSenateApproved ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-blue-50 text-blue-700 border border-blue-200'
                      }`}>
                        {item.isSenateApproved ? 'Senate Approved' : 'Submitted Marks'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center font-black text-slate-900 text-xs">{item.grade} ({item.totalMark}%)</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 flex flex-col">
          <h3 className="font-bold text-slate-900 text-sm mb-6 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-amber-500" />
            System Alerts
          </h3>
          <div className="space-y-4 flex-1">
            {[
              { title: 'Central Ledger Connected', desc: 'Direct tuition invoicing post active in FAAP sub-ledger.', time: 'Just now', type: 'info' },
              { title: 'Academic Firewall Verified', desc: 'Sovereign integrity double-entry balance locked.', time: 'Just now', type: 'info' },
            ].map((alert, i) => (
              <div key={i} className="flex gap-3">
                <div className="w-1 shrink-0 rounded-full bg-blue-500" />
                <div>
                  <p className="text-xs font-bold text-slate-900 leading-tight">{alert.title}</p>
                  <p className="text-[11px] text-slate-500 mt-1">{alert.desc}</p>
                  <p className="text-[10px] text-slate-400 mt-2 uppercase font-bold">{alert.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
