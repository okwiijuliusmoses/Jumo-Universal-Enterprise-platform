
import React from 'react';
import { 
  Building2, Users, BookOpen, DollarSign, Heart, ShieldCheck, 
  Clipboard, GraduationCap, Landmark, Activity, Zap, Search, Plus, Filter, Download
} from 'lucide-react';

export const SecondaryPrincipalPortal: React.FC = () => (
  <div className="space-y-6">
    <div className="flex items-center justify-between border-b border-slate-200 pb-4">
      <div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">Principal's Office</h1>
        <p className="text-slate-500 text-xs">Executive secondary governance and high school strategy.</p>
      </div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center">
        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Students</h3>
        <p className="text-2xl font-black text-slate-900">1,240</p>
      </div>
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center">
        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">UNEB Center</h3>
        <p className="text-2xl font-black text-slate-900">U0001</p>
      </div>
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center text-emerald-600">
        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">UCE Pass Rate</h3>
        <p className="text-2xl font-black">98.5%</p>
      </div>
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center text-blue-600">
        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">UACE 20pts</h3>
        <p className="text-2xl font-black">14</p>
      </div>
    </div>
  </div>
);

export const SecondaryRegistrarPortal: React.FC = () => (
  <div className="space-y-6">
    <div className="flex items-center justify-between border-b border-slate-200 pb-4">
      <div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">Registrar's Office (SIS)</h1>
        <p className="text-slate-500 text-xs">UNEB Center (UCE/UACE) administration and student records.</p>
      </div>
    </div>
    <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
      <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
        <span className="text-xs font-bold text-slate-700">UNEB Candidate Roll</span>
      </div>
      <div className="p-12 text-center text-slate-400 text-xs italic">
        Sovereign SIS Interface
      </div>
    </div>
  </div>
);
