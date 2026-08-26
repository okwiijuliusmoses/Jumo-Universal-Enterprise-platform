import React, { useState } from 'react';
import { 
  Building2, Users, ShieldCheck, Award, Calendar, FileText,
  Search, Filter, Plus, Printer, CheckCircle2, ChevronRight
} from 'lucide-react';

export const BishopOffice: React.FC = () => {
  const synodResolutions = [
    { ref: 'SYN-2026-04', title: 'Diocesan 10-Year Strategic Mission & Expansion', status: 'Promulgated', passedBy: 'Diocesan Synod Assembly', effectiveDate: '2026-01-15' },
    { ref: 'SYN-2026-05', title: 'Standard Clergy Stipend & Housing Policy', status: 'Active Law', passedBy: 'Diocesan Council', effectiveDate: '2026-03-01' },
    { ref: 'SYN-2026-06', title: 'Diocesan Cathedral Jubilee Restoration Fund', status: 'Fundraising Active', passedBy: 'Bishop & Finance Board', effectiveDate: '2026-06-10' }
  ];

  const archdeaconries = [
    { name: 'Central Archdeaconry', archdeacon: 'Ven. Canon Dr. James Mukwaya', parishes: 6, communicants: '4,850', quotaCleared: '100% ($24,000)' },
    { name: 'Northern Archdeaconry', archdeacon: 'Ven. Canon Patrick Kigozi', parishes: 4, communicants: '2,620', quotaCleared: '95% ($16,200)' },
    { name: 'Eastern Archdeaconry', archdeacon: 'Ven. Canon George Ssenfuma', parishes: 5, communicants: '3,110', quotaCleared: '92% ($14,500)' },
    { name: 'Southern Outreach Archdeaconry', archdeacon: 'Ven. Canon Moses Luwaga', parishes: 3, communicants: '1,680', quotaCleared: '88% ($9,800)' }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-purple-700 flex items-center justify-center text-white font-bold shadow-xs">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold text-slate-900 tracking-tight">EPISCOPAL CHANCERY & BISHOPRIC OFFICE</h1>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-purple-100 text-purple-800 border border-purple-200">
                Diocese Jurisdiction
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Diocesan Synod governance, Episcopal decrees, Archdeaconries administration, and canonical clergy appointments.
            </p>
          </div>
        </div>

        <button 
          type="button"
          className="flex items-center gap-1.5 px-3.5 py-1.5 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold rounded-lg shadow-xs transition"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Issue Episcopal Mandate</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs space-y-3">
          <h3 className="text-sm font-bold text-slate-900 border-b border-slate-200 pb-2">
            Diocesan Archdeaconries Oversight
          </h3>
          <div className="space-y-2.5">
            {archdeaconries.map((a, idx) => (
              <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">{a.name}</span>
                  <span className="px-2 py-0.5 bg-purple-100 text-purple-800 font-bold text-[10px] rounded">
                    {a.quotaCleared}
                  </span>
                </div>
                <div className="text-slate-600">Archdeacon: <strong>{a.archdeacon}</strong></div>
                <div className="text-[11px] text-slate-500">{a.parishes} Parishes • {a.communicants} Active Communicants</div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs space-y-3">
          <h3 className="text-sm font-bold text-slate-900 border-b border-slate-200 pb-2">
            Diocesan Synod Statutes & Decrees
          </h3>
          <div className="space-y-2.5">
            {synodResolutions.map((s) => (
              <div key={s.ref} className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-purple-700">{s.ref}</span>
                  <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 font-bold text-[10px] rounded">
                    {s.status}
                  </span>
                </div>
                <div className="font-bold text-slate-900">{s.title}</div>
                <div className="text-[11px] text-slate-500">{s.passedBy} • Effective: {s.effectiveDate}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
