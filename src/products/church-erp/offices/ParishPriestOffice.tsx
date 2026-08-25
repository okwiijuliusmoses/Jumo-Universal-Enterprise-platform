import React, { useState } from 'react';
import { 
  Church, Users, Heart, Calendar, Clock, Phone,
  CheckCircle2, Search, Filter, Plus, Printer, BookOpen
} from 'lucide-react';

export const ParishPriestOffice: React.FC = () => {
  const parishStations = [
    { name: 'St. Paul Main Sanctuary', curate: 'Rev. Canon Emmanuel O.', massSchedule: 'Sunday 07:00 AM (Luganda), 09:00 AM (English), 11:00 AM (Youth)', communicants: '2,450' },
    { name: 'St. Stephen Sub-Parish Outreach', curate: 'Rev. Mary Nabakooza', massSchedule: 'Sunday 08:30 AM (Luganda/English)', communicants: '840' },
    { name: 'Bethany Chapel of Praise', curate: 'Pastor David Kigozi', massSchedule: 'Sunday 10:00 AM (English)', communicants: '520' }
  ];

  const pastoralCareLogs = [
    { ref: 'PAS-2026-081', parishioner: 'Elder Patrick Byaruhanga', reason: 'Hospital Visitation & Holy Communion at Bedside (Nakasero Hospital)', minister: 'Rev. Canon Emmanuel O.', date: 'Today, 02:00 PM', status: 'Completed' },
    { ref: 'PAS-2026-082', parishioner: 'Mrs. Rebecca Nabatanzi', reason: 'Bereavement Pastoral Counseling & Funeral Prayers', minister: 'Rev. Mary Nabakooza', date: 'Yesterday, 04:30 PM', status: 'In Progress' }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-purple-600 flex items-center justify-center text-white font-bold shadow-xs">
            <Church className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold text-slate-900 tracking-tight">PARISH PRIEST & CURATE OPERATIONS</h1>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-purple-100 text-purple-800 border border-purple-200">
                St. Paul Cathedral Parish
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Parish congregation rolls, Sunday liturgy schedules, sub-parishes, and pastoral care visits.
            </p>
          </div>
        </div>

        <button 
          type="button"
          className="flex items-center gap-1.5 px-3.5 py-1.5 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold rounded-lg shadow-xs transition"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Record Pastoral Visit</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs space-y-3">
          <h3 className="text-sm font-bold text-slate-900 border-b border-slate-200 pb-2">
            Parish Stations & Liturgical Mass Rosters
          </h3>
          <div className="space-y-2.5">
            {parishStations.map((s, idx) => (
              <div key={idx} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">{s.name}</span>
                  <span className="font-mono text-purple-700 font-bold text-[10px]">{s.communicants} Members</span>
                </div>
                <div className="text-slate-600">Officiant: <strong>{s.curate}</strong></div>
                <div className="text-[11px] text-slate-500 bg-white p-2 rounded border border-slate-200 font-mono">
                  {s.massSchedule}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs space-y-3">
          <h3 className="text-sm font-bold text-slate-900 border-b border-slate-200 pb-2">
            Pastoral Visitation & Counselling Log
          </h3>
          <div className="space-y-2.5">
            {pastoralCareLogs.map((p) => (
              <div key={p.ref} className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">{p.parishioner}</span>
                  <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 font-bold text-[10px] rounded">{p.status}</span>
                </div>
                <div className="text-purple-900 bg-purple-50 p-2 rounded border border-purple-200">{p.reason}</div>
                <div className="text-[11px] text-slate-500">{p.minister} • {p.date}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
