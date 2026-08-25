import React, { useState } from 'react';
import { 
  Heart, Award, FileText, CheckCircle2, Search, 
  Filter, Plus, Printer, Download, Sparkles
} from 'lucide-react';

export const SacramentalOffice: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'BAPTISM' | 'CONFIRMATION' | 'MATRIMONY' | 'BURIALS'>('BAPTISM');

  const baptismRecords = [
    { ref: 'BAP-2026-081', recipient: 'Gabriel Arthur Mukisa', parents: 'Eng. Patrick & Dr. Stella Mukisa', godparents: 'Mr. David & Mrs. Sarah Kigozi', officiant: 'Rev. Canon Emmanuel O.', date: '2026-08-15', status: 'Registered & Certified' },
    { ref: 'BAP-2026-082', recipient: 'Zuri Isabella Namutebi', parents: 'Mr. Robert & Mrs. Prossy Namutebi', godparents: 'Ms. Brenda Nalwoga', officiant: 'Rev. Mary Nabakooza', date: '2026-08-08', status: 'Registered & Certified' }
  ];

  const matrimonyRecords = [
    { ref: 'MAT-2026-042', groom: 'Dr. Julius Ochen', bride: 'Dr. Sarah Nabakooza', bannsPublished: '3 Consecutive Sundays (Cleared)', licenseNo: 'CIV-MAT-99014', officiant: 'Rt. Rev. Bishop Joseph M.', date: '2026-08-08', status: 'Canonical Certificate Issued' }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-pink-600 flex items-center justify-center text-white font-bold shadow-xs">
            <Heart className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold text-slate-900 tracking-tight">CANONICAL SACRAMENTAL REGISTRAR</h1>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-pink-100 text-pink-800 border border-pink-200">
                Official Ecclesiastical Register
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Holy Baptism, Confirmation, Holy Matrimony Banns, and Christian Funeral registries with QR verification.
            </p>
          </div>
        </div>

        <button 
          type="button"
          className="flex items-center gap-1.5 px-3.5 py-1.5 bg-pink-600 hover:bg-pink-700 text-white text-xs font-bold rounded-lg shadow-xs transition"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Issue Sacramental Certificate</span>
        </button>
      </div>

      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto">
        {[
          { id: 'BAPTISM', label: 'Holy Baptism Register' },
          { id: 'CONFIRMATION', label: 'Episcopal Confirmation Register' },
          { id: 'MATRIMONY', label: 'Holy Matrimony & Banns of Marriage' },
          { id: 'BURIALS', label: 'Christian Funerals & Memorials' }
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-3.5 py-2 rounded-lg text-xs font-bold transition whitespace-nowrap cursor-pointer ${
              activeTab === tab.id
                ? 'bg-pink-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'BAPTISM' && (
        <div className="bg-white border border-slate-200 rounded-xl shadow-2xs overflow-hidden">
          <div className="p-4 border-b border-slate-200 bg-slate-50/50 flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900">Canonical Register of Holy Baptism</h3>
            <span className="text-xs text-slate-500 font-mono">Diocesan Verified</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase text-[10px]">
                <tr>
                  <th className="px-4 py-2.5">Register Ref</th>
                  <th className="px-4 py-2.5">Recipient Full Name</th>
                  <th className="px-4 py-2.5">Parents</th>
                  <th className="px-4 py-2.5">Godparents</th>
                  <th className="px-4 py-2.5">Officiating Minister</th>
                  <th className="px-4 py-2.5">Date</th>
                  <th className="px-4 py-2.5 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {baptismRecords.map((b) => (
                  <tr key={b.ref} className="hover:bg-slate-50/80 transition">
                    <td className="px-4 py-3 font-mono font-bold text-purple-700">{b.ref}</td>
                    <td className="px-4 py-3 font-bold text-slate-900">{b.recipient}</td>
                    <td className="px-4 py-3 text-slate-700">{b.parents}</td>
                    <td className="px-4 py-3 text-slate-600">{b.godparents}</td>
                    <td className="px-4 py-3 text-slate-800">{b.officiant}</td>
                    <td className="px-4 py-3 font-mono text-slate-500">{b.date}</td>
                    <td className="px-4 py-3 text-center">
                      <span className="px-2 py-0.5 bg-purple-100 text-purple-800 rounded font-bold text-[10px]">
                        {b.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'MATRIMONY' && (
        <div className="bg-white border border-slate-200 rounded-xl shadow-2xs overflow-hidden">
          <div className="p-4 border-b border-slate-200 bg-slate-50/50 flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900">Canonical Register of Holy Matrimony</h3>
            <span className="text-xs text-slate-500 font-mono">Banns Cleared</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase text-[10px]">
                <tr>
                  <th className="px-4 py-2.5">Register Ref</th>
                  <th className="px-4 py-2.5">Groom & Bride</th>
                  <th className="px-4 py-2.5">Publication of Banns</th>
                  <th className="px-4 py-2.5">Civil License No</th>
                  <th className="px-4 py-2.5">Officiant</th>
                  <th className="px-4 py-2.5">Date</th>
                  <th className="px-4 py-2.5 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {matrimonyRecords.map((m) => (
                  <tr key={m.ref} className="hover:bg-slate-50/80 transition">
                    <td className="px-4 py-3 font-mono font-bold text-pink-700">{m.ref}</td>
                    <td className="px-4 py-3 font-bold text-slate-900">{m.groom} & {m.bride}</td>
                    <td className="px-4 py-3 text-emerald-700 font-semibold">{m.bannsPublished}</td>
                    <td className="px-4 py-3 font-mono text-slate-600">{m.licenseNo}</td>
                    <td className="px-4 py-3 text-slate-800">{m.officiant}</td>
                    <td className="px-4 py-3 font-mono text-slate-500">{m.date}</td>
                    <td className="px-4 py-3 text-center">
                      <span className="px-2 py-0.5 bg-pink-100 text-pink-800 rounded font-bold text-[10px]">
                        {m.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
