
import React from 'react';
import { 
  Building2, Users, BookOpen, DollarSign, Heart, ShieldCheck, 
  Clipboard, GraduationCap, Landmark, Activity, Zap, Search, Plus, Filter, Download
} from 'lucide-react';

export const NurseryHeadTeacherPortal: React.FC = () => (
  <div className="space-y-6">
    <div className="flex items-center justify-between border-b border-slate-200 pb-4">
      <div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">Head Teacher's Office</h1>
        <p className="text-slate-500 text-xs">Executive oversight, board reporting, and nursery strategic management.</p>
      </div>
      <div className="flex gap-2">
        <button className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold transition">Board Report</button>
      </div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Enrollment</h3>
        <p className="text-3xl font-black text-slate-900">142</p>
        <p className="text-[10px] text-emerald-600 font-bold mt-1">+5% from last term</p>
      </div>
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Financial Position</h3>
        <p className="text-3xl font-black text-slate-900">85.2M</p>
        <p className="text-[10px] text-slate-500 font-bold mt-1">Synced with FAAP Master Ledger</p>
      </div>
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Staff Complement</h3>
        <p className="text-3xl font-black text-slate-900">18</p>
        <p className="text-[10px] text-slate-500 font-bold mt-1">12 Caregivers, 6 Support Staff</p>
      </div>
    </div>
  </div>
);

export const NurseryBursarPortal: React.FC = () => (
  <div className="space-y-6">
    <div className="flex items-center justify-between border-b border-slate-200 pb-4">
      <div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">Nursery Bursar's Office</h1>
        <p className="text-slate-500 text-xs">Fee collections, cash books, vote book, and feeding budgets.</p>
      </div>
      <div className="flex gap-2">
        <button className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold transition">Receive Payment</button>
      </div>
    </div>
    
    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
      <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
        <span className="text-xs font-bold text-slate-700">Recent Fee Collections (Hillside Naalya Benchmark)</span>
        <div className="flex gap-2">
          <button className="p-1.5 hover:bg-slate-200 rounded transition"><Search className="w-3.5 h-3.5" /></button>
          <button className="p-1.5 hover:bg-slate-200 rounded transition"><Filter className="w-3.5 h-3.5" /></button>
        </div>
      </div>
      <table className="w-full text-left text-xs">
        <thead className="bg-slate-50 text-slate-500 font-black uppercase tracking-widest border-b border-slate-100 text-[9px]">
          <tr>
            <th className="px-6 py-3">Receipt No</th>
            <th className="px-6 py-3">Toddler</th>
            <th className="px-6 py-3">Category</th>
            <th className="px-6 py-3">Amount</th>
            <th className="px-6 py-3">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 font-medium">
          {[
            { id: 'REC-001', name: 'Liam K.', cat: 'Tuition', amt: '1,200,000', status: 'FAAP_SYNCED' },
            { id: 'REC-002', name: 'Maya N.', cat: 'Feeding', amt: '350,000', status: 'FAAP_SYNCED' },
            { id: 'REC-003', name: 'Ethan M.', cat: 'Transport', amt: '450,000', status: 'PENDING' }
          ].map(row => (
            <tr key={row.id} className="hover:bg-slate-50">
              <td className="px-6 py-3 font-mono font-bold">{row.id}</td>
              <td className="px-6 py-3 font-bold">{row.name}</td>
              <td className="px-6 py-3">{row.cat}</td>
              <td className="px-6 py-3 font-bold">{row.amt} UGX</td>
              <td className="px-6 py-3">
                <span className={`px-2 py-0.5 rounded-full text-[9px] font-black ${row.status === 'FAAP_SYNCED' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                  {row.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export const NurseryHealthPortal: React.FC = () => (
  <div className="space-y-6">
    <div className="flex items-center justify-between border-b border-slate-200 pb-4">
      <div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">Health & Nutrition Center</h1>
        <p className="text-slate-500 text-xs">Medical records, allergy logs, immunization tracking, and daily nutrition logs.</p>
      </div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-slate-900">Allergy & Dietary Alerts</h3>
          <span className="px-2 py-0.5 bg-red-100 text-red-800 text-[10px] font-black rounded-full">8 ACTIVE ALERTS</span>
        </div>
        <div className="space-y-3">
          {[
            { name: 'Liam Kiggundu', allergy: 'Nuts', level: 'SEVERE' },
            { name: 'Maya Nsubuga', allergy: 'Lactose', level: 'MODERATE' }
          ].map((a, i) => (
            <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
              <span className="font-bold text-slate-800 text-xs">{a.name}</span>
              <div className="flex gap-2">
                <span className="text-[10px] text-slate-500">{a.allergy}</span>
                <span className="text-[10px] font-black text-red-600">{a.level}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <h3 className="font-bold text-slate-900">Daily Feeding Log</h3>
        <div className="space-y-3">
          <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-xl">
            <p className="text-[10px] font-black text-emerald-800 mb-1">BREAKFAST (09:00 AM)</p>
            <p className="text-xs text-slate-600 font-medium">Porridge with milk, fresh bananas. 100% consumption reported by caregivers.</p>
          </div>
          <div className="p-3 bg-blue-50 border border-blue-100 rounded-xl">
            <p className="text-[10px] font-black text-blue-800 mb-1">LUNCH (12:30 PM)</p>
            <p className="text-xs text-slate-600 font-medium">Mashed potatoes, steamed vegetables, and minced beef. Scheduled.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export const PlaceholderOfficePortal: React.FC<{ name: string }> = ({ name }) => (
  <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center animate-in fade-in duration-500">
    <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center mx-auto mb-6 text-slate-300">
      <Building2 className="w-10 h-10" />
    </div>
    <h2 className="text-2xl font-black text-slate-900 tracking-tight">{name} Office Portal</h2>
    <p className="text-slate-500 text-sm max-w-md mx-auto mt-2">
      This office portal is being reconstructed into JUMO UEOS to reflect the benchmarked operational structure.
    </p>
    <div className="mt-8 grid grid-cols-2 gap-4 max-w-sm mx-auto">
      <div className="h-24 bg-slate-50 rounded-2xl animate-pulse" />
      <div className="h-24 bg-slate-50 rounded-2xl animate-pulse" />
      <div className="h-2 bg-slate-100 rounded-full col-span-2" />
      <div className="h-2 bg-slate-100 rounded-full col-span-2 w-2/3 mx-auto" />
    </div>
  </div>
);
