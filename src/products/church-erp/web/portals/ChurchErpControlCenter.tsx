import React, { useState } from 'react';
import { 
  Sliders, Church, Calendar, BookOpen, ShieldCheck, 
  Save, CheckCircle2, Building2, Users, DollarSign
} from 'lucide-react';

export const ChurchErpControlCenter: React.FC = () => {
  const [dioceseName, setDioceseName] = useState('Diocese of Kampala & Central Archdeaconry');
  const [bishopName, setBishopName] = useState('Rt. Rev. Joseph Mukwaya');
  const [liturgicalCalendar, setLiturgicalCalendar] = useState('Anglican / Episcopal Common Lectionary 2026');
  const [quotaPercent, setQuotaPercent] = useState('15');
  const [savedStatus, setSavedStatus] = useState<string | null>(null);

  const handleSave = () => {
    setSavedStatus('Diocesan governance parameters saved successfully.');
    setTimeout(() => setSavedStatus(null), 3000);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
      {/* Header */}
      <div className="border-b border-slate-200 bg-slate-50/50 px-6 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-purple-600 flex items-center justify-center text-white font-bold shadow-xs">
            <Sliders className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-slate-900 tracking-tight">CHURCH ERP CONTROL CENTER</h2>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-purple-100 text-purple-800 border border-purple-300">
                ECCLESIASTICAL GOVERNANCE
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Diocesan Synod Parameters • Deanery Hierarchy • Liturgical Lectionary • Diocesan Quota
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {savedStatus && (
            <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" /> {savedStatus}
            </span>
          )}
          <button 
            type="button"
            onClick={handleSave}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-xs font-bold shadow-xs transition"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save Diocesan Settings</span>
          </button>
        </div>
      </div>

      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600">Diocese Hierarchy & Episcoapte</h4>
            
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Diocese Legal Title</label>
              <input
                type="text"
                value={dioceseName}
                onChange={(e) => setDioceseName(e.target.value)}
                className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 text-slate-800"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Presiding Bishop / Diocesan Ordinary</label>
              <input
                type="text"
                value={bishopName}
                onChange={(e) => setBishopName(e.target.value)}
                className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 text-slate-800"
              />
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600">Stewardship & Lectionary Parameters</h4>
            
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Active Liturgical Lectionary</label>
              <input
                type="text"
                value={liturgicalCalendar}
                onChange={(e) => setLiturgicalCalendar(e.target.value)}
                className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 text-slate-800"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Diocesan Quota Assessment Assessment (%)</label>
              <input
                type="number"
                value={quotaPercent}
                onChange={(e) => setQuotaPercent(e.target.value)}
                className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 text-slate-800"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
