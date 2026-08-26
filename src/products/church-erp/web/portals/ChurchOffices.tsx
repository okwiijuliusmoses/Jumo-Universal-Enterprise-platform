
import React from 'react';
import { 
  Building2, Users, BookOpen, DollarSign, Heart, ShieldCheck, 
  Clipboard, GraduationCap, Landmark, Activity, Zap, Search, Plus, Filter, Download
} from 'lucide-react';

export const ChurchBishopPortal: React.FC = () => (
  <div className="space-y-6">
    <div className="flex items-center justify-between border-b border-slate-200 pb-4">
      <div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">Bishop's Office</h1>
        <p className="text-slate-500 text-xs">Episcopal oversight, synod directives, and clergy appointments.</p>
      </div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center">
        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Archdeaconries</h3>
        <p className="text-2xl font-black text-slate-900">8</p>
      </div>
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center">
        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Parishes</h3>
        <p className="text-2xl font-black text-slate-900">42</p>
      </div>
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center">
        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Clergy</h3>
        <p className="text-2xl font-black text-slate-900">64</p>
      </div>
    </div>
  </div>
);

export const ChurchParishPortal: React.FC = () => (
  <div className="space-y-6">
    <div className="flex items-center justify-between border-b border-slate-200 pb-4">
      <div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">Parish Office</h1>
        <p className="text-slate-500 text-xs">Parish register, pastoral care, and community outreach.</p>
      </div>
    </div>
    <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center text-slate-400 text-xs">
      Sovereign Parish Management Interface
    </div>
  </div>
);
