
import React from 'react';
import { 
  Building2, Users, BookOpen, DollarSign, Heart, ShieldCheck, 
  Clipboard, GraduationCap, Landmark, Activity, Zap, Search, Plus, Filter, Download, Globe
} from 'lucide-react';

export const AlumniDirectorPortal: React.FC = () => (
  <div className="space-y-6">
    <div className="flex items-center justify-between border-b border-slate-200 pb-4">
      <div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">Alumni Director's Office</h1>
        <p className="text-slate-500 text-xs">Institutional advancement strategy and global chapter relations.</p>
      </div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center">
        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Alumni</h3>
        <p className="text-2xl font-black text-slate-900">24,500</p>
      </div>
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center">
        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Active Chapters</h3>
        <p className="text-2xl font-black text-slate-900">12</p>
      </div>
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center text-emerald-600">
        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Endowment Fund</h3>
        <p className="text-2xl font-black">1.2B UGX</p>
      </div>
    </div>
  </div>
);

export const AlumniChaptersPortal: React.FC = () => (
  <div className="space-y-6">
    <div className="flex items-center justify-between border-b border-slate-200 pb-4">
      <div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">Global Chapters Office</h1>
        <p className="text-slate-500 text-xs">Regional hub management, leadership elections, and alumni meetups.</p>
      </div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <h3 className="font-bold text-slate-900 flex items-center gap-2">
          <Globe className="w-4 h-4 text-blue-600" />
          Active Regions
        </h3>
        <div className="mt-4 space-y-2">
          {['Uganda Central', 'UK & Europe', 'North America', 'Middle East'].map(reg => (
            <div key={reg} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
              <span className="text-xs font-bold text-slate-800">{reg}</span>
              <span className="text-[10px] text-slate-500 font-mono">CHAPTER-ACTIVE</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);
