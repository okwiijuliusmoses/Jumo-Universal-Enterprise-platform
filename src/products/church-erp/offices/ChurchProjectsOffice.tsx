import React, { useState } from 'react';
import { 
  Building, HeartHandshake, CheckCircle2, Search, 
  Filter, Plus, Printer, DollarSign, Calendar
} from 'lucide-react';

export const ChurchProjectsOffice: React.FC = () => {
  const projects = [
    { code: 'PRJ-2026-01', name: 'Cathedral Jubilee Expansion & Youth Center', budget: '$250,000.00', raised: '$142,500.00 (57%)', committeeLead: 'Eng. Patrick Byaruhanga', contractor: 'Roko Construction Ltd', status: 'Active (Roofing Phase)' },
    { code: 'PRJ-2026-02', name: 'Diocesan Medical Outreach & Mission Clinic', budget: '$80,000.00', raised: '$68,000.00 (85%)', committeeLead: 'Dr. Stella Nakalema', contractor: 'MedEquip Africa', status: 'Equipment Installation' },
    { code: 'PRJ-2026-03', name: 'Rural Community Clean Solar Water Well Boreholes', budget: '$35,000.00', raised: '$35,000.00 (100%)', committeeLead: 'Rev. Mary Nabakooza', contractor: 'SolarWater Uganda', status: 'Commissioned' }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-amber-600 flex items-center justify-center text-white font-bold shadow-xs">
            <Building className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold text-slate-900 tracking-tight">PARISH DEVELOPMENT PROJECTS & CAPITAL WORKS</h1>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800 border border-amber-200">
                Building & Mission Funds
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Cathedral restoration, youth center building projects, solar water boreholes, and contractor payment vouchers.
            </p>
          </div>
        </div>

        <button 
          type="button"
          className="flex items-center gap-1.5 px-3.5 py-1.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-lg shadow-xs transition"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New Capital Project</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {projects.map((p) => (
          <div key={p.code} className="p-5 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono font-bold text-xs text-amber-700">{p.code}</span>
              <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 font-bold rounded text-[10px]">{p.status}</span>
            </div>
            <div className="font-bold text-sm text-slate-900">{p.name}</div>
            <div className="text-xs text-slate-600">Chairperson: <strong>{p.committeeLead}</strong></div>
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Budget Target:</span>
                <span className="font-bold text-slate-900 font-mono">{p.budget}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Funds Raised:</span>
                <span className="font-bold text-emerald-600 font-mono">{p.raised}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
