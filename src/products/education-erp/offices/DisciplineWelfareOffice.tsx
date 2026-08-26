import React, { useState } from 'react';
import { 
  ShieldCheck, Users, AlertTriangle, Scale, Heart,
  CheckCircle2, Search, Filter, Plus, Printer, FileText
} from 'lucide-react';

export const DisciplineWelfareOffice: React.FC = () => {
  const disciplineCases = [
    { id: 'DIS-2026-012', student: 'Kasumba Brian', class: 'Senior 3 East', offence: 'Possession of contraband phone during prep hours', verdict: 'Community service (14 Days Grounds Maintenance) + Parental counselling conference', disciplinaryPanel: 'Prefects Court & Deputy Head Teacher', status: 'Concluded & Monitored' },
    { id: 'DIS-2026-013', student: 'Opio Derrick', class: 'Senior 5 Arts', offence: 'Late arrival to morning national anthem assembly', verdict: 'Verbal caution & library duty assignment', disciplinaryPanel: 'Head Prefect & Duty Master', status: 'Resolved' }
  ];

  const prefectsCouncil = [
    { role: 'Head Boy', name: 'Kabugo Joshua (S.6 Science)', responsibility: 'Overall Student Governance & Assembly Leadership' },
    { role: 'Head Girl', name: 'Nalubwama Fiona (S.6 Arts)', responsibility: 'Student Welfare, Assemblies & Protocol' },
    { role: 'Academic Prefect', name: 'Ainebyoona Timothy (S.6 Science)', responsibility: 'Prep Supervision & Academic Integrity' },
    { role: 'Sanitation & Health', name: 'Babirye Christine (S.6 Science)', responsibility: 'Dormitory & Campus Cleanliness' }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-orange-600 flex items-center justify-center text-white font-bold shadow-xs">
            <Scale className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold text-slate-900 tracking-tight">DISCIPLINE, PREFECTS & STUDENT WELFARE</h1>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-orange-100 text-orange-800 border border-orange-200">
                Peer Governance & Guidance
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Disciplinary committee hearings, prefects council roster, student leadership, and pastoral guidance.
            </p>
          </div>
        </div>

        <button 
          type="button"
          className="flex items-center gap-1.5 px-3.5 py-1.5 bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold rounded-lg shadow-xs transition"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Record Disciplinary Hearing</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs space-y-3">
          <h3 className="text-sm font-bold text-slate-900 border-b border-slate-200 pb-2 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-orange-600" />
            <span>Active Disciplinary Panel Records</span>
          </h3>
          <div className="space-y-3">
            {disciplineCases.map((c) => (
              <div key={c.id} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">{c.student} ({c.class})</span>
                  <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded font-bold text-[10px]">{c.status}</span>
                </div>
                <div className="text-slate-700"><strong>Offence:</strong> {c.offence}</div>
                <div className="text-orange-900 bg-orange-50 p-2 rounded border border-orange-200">
                  <strong>Verdict:</strong> {c.verdict}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs space-y-3">
          <h3 className="text-sm font-bold text-slate-900 border-b border-slate-200 pb-2 flex items-center gap-2">
            <Users className="w-4 h-4 text-blue-600" />
            <span>Executive Prefects Council</span>
          </h3>
          <div className="space-y-2.5">
            {prefectsCouncil.map((p, idx) => (
              <div key={idx} className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-slate-900">{p.name}</div>
                  <div className="text-slate-500 text-[11px]">{p.responsibility}</div>
                </div>
                <span className="px-2 py-0.5 bg-blue-100 text-blue-800 font-bold rounded text-[10px]">{p.role}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
