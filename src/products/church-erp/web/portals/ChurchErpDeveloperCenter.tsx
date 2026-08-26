import React, { useState } from 'react';
import { 
  Code, Terminal, Key, Webhook, Database, Play, 
  CheckCircle2, Copy, ExternalLink, ShieldCheck, Layers
} from 'lucide-react';

export const ChurchErpDeveloperCenter: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'ENDPOINTS' | 'KEYS' | 'WEBHOOKS'>('ENDPOINTS');

  const endpoints = [
    { method: 'POST', path: '/api/v1/church/tithes/give', desc: 'Registers electronic tithe or thanksgiving giving into FAAP general ledger' },
    { method: 'GET', path: '/api/v1/church/parishes', desc: 'Lists diocesan parishes, archdeaconries, communicant numbers, and quotas' },
    { method: 'POST', path: '/api/v1/church/sacraments/record', desc: 'Creates certified Holy Baptism, Confirmation, or Matrimony records' },
    { method: 'GET', path: '/api/v1/church/clergy/roster', desc: 'Retrieves active diocesan clergy credentials and pastoral appointments' },
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
      {/* Header */}
      <div className="border-b border-slate-200 bg-slate-50/50 px-6 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-slate-900 flex items-center justify-center text-white font-bold shadow-xs">
            <Code className="w-5 h-5 text-purple-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-slate-900 tracking-tight">CHURCH ERP DEVELOPER CENTER</h2>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-100 text-slate-800 border border-slate-300">
                REST / WEBHOOKS
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Diocesan Giving Gateway APIs • Sacramental Verification • Member SMS Sync
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button 
            type="button"
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold shadow-xs transition"
          >
            <Key className="w-3.5 h-3.5 text-purple-400" />
            <span>Generate Church API Key</span>
          </button>
        </div>
      </div>

      <div className="p-6 space-y-4">
        <div className="border border-slate-200 rounded-lg overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
              <tr>
                <th className="px-4 py-2.5">HTTP Method</th>
                <th className="px-4 py-2.5">Endpoint Path</th>
                <th className="px-4 py-2.5">Description</th>
                <th className="px-4 py-2.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {endpoints.map((ep, idx) => (
                <tr key={idx} className="hover:bg-slate-50/80 transition">
                  <td className="px-4 py-2.5">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                      ep.method === 'POST' ? 'bg-purple-100 text-purple-800' : 'bg-emerald-100 text-emerald-800'
                    }`}>
                      {ep.method}
                    </span>
                  </td>
                  <td className="px-4 py-2.5 font-mono text-slate-900 font-bold">{ep.path}</td>
                  <td className="px-4 py-2.5 text-slate-600">{ep.desc}</td>
                  <td className="px-4 py-2.5 text-right">
                    <button type="button" className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded text-[11px] font-semibold">
                      Test Call
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
