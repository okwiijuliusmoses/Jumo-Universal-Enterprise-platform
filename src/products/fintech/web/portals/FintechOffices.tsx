
import React from 'react';
import { 
  Building2, Users, BookOpen, DollarSign, Heart, ShieldCheck, 
  Clipboard, GraduationCap, Landmark, Activity, Zap, Search, Plus, Filter, Download, Globe, ShieldAlert
} from 'lucide-react';

export const FintechExecutivePortal: React.FC = () => (
  <div className="space-y-6">
    <div className="flex items-center justify-between border-b border-slate-200 pb-4">
      <div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">Executive Office (C-Suite)</h1>
        <p className="text-slate-500 text-xs">High-level capital allocation, license oversight, and financial strategy.</p>
      </div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center">
        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Assets (AUM)</h3>
        <p className="text-xl font-black text-slate-900">420.5B</p>
      </div>
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center">
        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Active Users</h3>
        <p className="text-xl font-black text-slate-900">1.2M</p>
      </div>
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center text-emerald-600">
        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Daily Volume</h3>
        <p className="text-xl font-black">12.4B</p>
      </div>
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center text-amber-600">
        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Risk Score</h3>
        <p className="text-xl font-black">98.2</p>
      </div>
    </div>
  </div>
);

export const FintechCompliancePortal: React.FC = () => (
  <div className="space-y-6">
    <div className="flex items-center justify-between border-b border-slate-200 pb-4">
      <div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">Compliance & Risk (AML/KYC)</h1>
        <p className="text-slate-500 text-xs">Regulatory reporting, anti-money laundering, and KYC verification logs.</p>
      </div>
    </div>
    <div className="bg-white border border-slate-200 rounded-2xl p-6">
      <div className="flex items-center gap-2 mb-4 text-amber-600 font-bold text-xs uppercase tracking-tight">
        <ShieldAlert className="w-4 h-4" />
        Critical Compliance Alerts
      </div>
      <div className="space-y-2">
        {[
          'High-value transaction alert: $42,000 (Account #9942)',
          'KYC Review Pending: 1,420 new signups',
          'Quarterly Regulator Report Due: 4 days'
        ].map((alert, idx) => (
          <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-[11px] text-slate-700 font-medium">
            {alert}
          </div>
        ))}
      </div>
    </div>
  </div>
);
