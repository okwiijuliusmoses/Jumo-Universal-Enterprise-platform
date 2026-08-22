
import React from 'react';
import { 
  Building2, Users, BookOpen, DollarSign, Heart, ShieldCheck, 
  Clipboard, GraduationCap, Landmark, Activity, Zap, Search, Plus, Filter, Download
} from 'lucide-react';

export const PrimaryHeadTeacherPortal: React.FC = () => (
  <div className="space-y-6">
    <div className="flex items-center justify-between border-b border-slate-200 pb-4">
      <div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">Head Teacher's Office</h1>
        <p className="text-slate-500 text-xs">Primary school executive management and P.1-P.7 oversight.</p>
      </div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Pupils</h3>
        <p className="text-3xl font-black text-slate-900">840</p>
      </div>
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">PLE Readiness</h3>
        <p className="text-3xl font-black text-emerald-600">92%</p>
      </div>
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Financial Budget</h3>
        <p className="text-3xl font-black text-slate-900">420M</p>
      </div>
    </div>
  </div>
);

export const PrimaryBursarPortal: React.FC = () => (
  <div className="space-y-6">
    <div className="flex items-center justify-between border-b border-slate-200 pb-4">
      <div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">Primary Bursar's Office</h1>
        <p className="text-slate-500 text-xs">Fees management, vote book commitments, and FAAP accounting.</p>
      </div>
    </div>
    <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center text-slate-400 text-sm">
      Primary Bursar Ledger Interface (Hillside Naalya Benchmark)
    </div>
  </div>
);

export const PrimaryExamsPortal: React.FC = () => (
  <div className="space-y-6">
    <div className="flex items-center justify-between border-b border-slate-200 pb-4">
      <div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">Examinations Office</h1>
        <p className="text-slate-500 text-xs">Marks entry, score moderation, and PLE preparation.</p>
      </div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <h3 className="font-bold text-slate-900">P.7 Mock Trends</h3>
        <div className="h-32 bg-slate-50 rounded-xl mt-4" />
      </div>
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <h3 className="font-bold text-slate-900">Candidate Register</h3>
        <div className="h-32 bg-slate-50 rounded-xl mt-4" />
      </div>
    </div>
  </div>
);
