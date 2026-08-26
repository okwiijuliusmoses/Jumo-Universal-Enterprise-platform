import React, { useState } from 'react';
import { Building, Shield, FileText, CheckCircle2, AlertCircle, Plus, Search, X } from 'lucide-react';
import { EducationErpService } from '../../domain/EducationErpService';

export const GovernanceModule: React.FC = () => {
  const service = EducationErpService.getInstance();
  const [resolutions, setResolutions] = useState(service.getResolutions());

  // Form State
  const [showAddModal, setShowAddModal] = useState(false);
  const [resNumber, setResNumber] = useState('');
  const [title, setTitle] = useState('');
  const [campusScope, setCampusScope] = useState<'GLOBAL' | 'HUB_01' | 'HUB_02' | 'HUB_03'>('GLOBAL');

  const handleCreateDraft = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resNumber.trim()) return alert('Resolution number is required.');
    if (!title.trim()) return alert('Title is required.');

    try {
      service.createResolution({
        resolutionNumber: resNumber.toUpperCase().trim(),
        title: title.trim(),
        dateApproved: new Date().toISOString().split('T')[0],
        status: 'IMPLEMENTED',
        campusScope
      });

      setResolutions(service.getResolutions());
      setShowAddModal(false);
      setResNumber('');
      setTitle('');
      alert('University Council Resolution drafted and implemented successfully!');
    } catch (err: any) {
      alert(err.message || 'Error occurred.');
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-16">
      <div className="flex flex-col">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">University Council Governance & Policy</h1>
        <p className="text-slate-500 text-sm">Authoritative council resolutions, university statutes, and campus-wide directives.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="px-8 py-6 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-sm">Recent Council Resolutions</h3>
              <button 
                onClick={() => setShowAddModal(true)}
                className="flex items-center gap-2 bg-[#064e3b] text-white px-4 py-2.5 rounded-xl text-xs font-bold hover:bg-emerald-800 transition-all shadow-md"
              >
                <Plus className="w-4 h-4" />
                Draft Resolution
              </button>
            </div>
            <div>
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] tracking-widest border-b border-slate-100">
                  <tr>
                    <th className="px-8 py-4">Resolution #</th>
                    <th className="px-8 py-4">Title / Directive</th>
                    <th className="px-8 py-4">Scope</th>
                    <th className="px-8 py-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {resolutions.map((res) => (
                    <tr key={res.id} className="hover:bg-emerald-50/30 transition-colors">
                      <td className="px-8 py-5 font-mono text-xs font-black text-emerald-800">{res.resolutionNumber}</td>
                      <td className="px-8 py-5 font-bold text-slate-900">{res.title}</td>
                      <td className="px-8 py-5 text-slate-500 text-xs font-medium uppercase">{res.campusScope}</td>
                      <td className="px-8 py-5">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                          res.status === 'IMPLEMENTED' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-amber-50 text-amber-700 border-amber-200 animate-pulse'
                        }`}>
                          {res.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-[#064e3b] text-white p-8 rounded-2xl shadow-xl relative overflow-hidden group">
            <Shield className="absolute -right-8 -bottom-8 w-48 h-48 text-emerald-800/30 group-hover:scale-110 transition-transform duration-500" />
            <div className="relative z-10">
              <h3 className="text-xl font-bold mb-4 uppercase tracking-tight">Statutory Gazette</h3>
              <p className="text-emerald-100/70 text-sm leading-relaxed mb-8">Access the authoritative university statutes, land titles, and charter documents verified by the University Council Secretary.</p>
            </div>
          </div>

          <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm">
            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2 text-sm uppercase tracking-widest">
              <AlertCircle className="w-4 h-4 text-amber-500" />
              Policy Implementation Alerts
            </h3>
            <div className="space-y-4">
              {[
                { title: 'Campus Scope Audit', desc: 'Arua Campus node awaiting policy sync.', time: '1h ago' },
                { title: 'Resolution UC/2026/02', desc: 'Bursar signature required for implementation.', time: '4h ago' },
              ].map((alert, i) => (
                <div key={i} className="flex gap-3">
                  <div className="w-1 h-8 bg-amber-400 rounded-full shrink-0" />
                  <div>
                    <p className="text-xs font-black text-slate-900 leading-tight uppercase tracking-tight">{alert.title}</p>
                    <p className="text-[11px] text-slate-500 mt-1">{alert.desc}</p>
                    <p className="text-[10px] text-slate-400 mt-2 font-bold uppercase">{alert.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Add Resolution Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
              <h3 className="font-bold text-base">Draft Council Resolution</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateDraft} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Resolution Code</label>
                  <input 
                    type="text"
                    placeholder="e.g. RES/2026/05"
                    value={resNumber}
                    onChange={(e) => setResNumber(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Campus Scope</label>
                  <select 
                    value={campusScope}
                    onChange={(e) => setCampusScope(e.target.value as any)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="GLOBAL">Global / All Hubs</option>
                    <option value="HUB_01">Platform Hub 01</option>
                    <option value="HUB_02">Platform Hub 02</option>
                    <option value="HUB_03">Platform Hub 03</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Title / Directive Description</label>
                <textarea 
                  placeholder="e.g. Mandatory Tuition Sinking Fund for digital-pay collections integration."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 h-24 resize-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button 
                  type="button" 
                  onClick={() => setShowAddModal(false)}
                  className="bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-xl text-xs font-bold hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="bg-[#064e3b] text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-emerald-900"
                >
                  Publish Directive
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
