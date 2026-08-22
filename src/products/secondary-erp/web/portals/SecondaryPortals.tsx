import React, { useState } from 'react';
import { 
  School, Users, BookOpen, Calculator, Microscope, Laptop, 
  Library, ShieldAlert, Award, Calendar, CheckCircle2, Plus, 
  Search, Filter, Download, DollarSign, TrendingUp, Landmark,
  FileText, ClipboardList
} from 'lucide-react';
import { PortalAuthenticationGate } from '../../../PortalAuthenticationGate';

export const SecondarySenatePortal: React.FC = () => {
  return (
    <PortalAuthenticationGate
      portalId="secondary-senate"
      portalName="Principal & Secondary Senate Governance Office"
      domainContext="JUMO-SCHOOL-ERP"
      requiredRoles={['ROLE_SECONDARY_HEADTEACHER', 'ROLE_HEADTEACHER', 'ROLE_SCHOOL_ADMIN']}
      onAuthenticated={() => {}}
    >
      <div className="space-y-6 animate-in fade-in duration-300 pb-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Principal's Office & Academic Senate</h1>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-indigo-100 text-indigo-800 border border-indigo-300 uppercase">
                St. Lawrence Sovereign
              </span>
            </div>
            <p className="text-slate-500 text-xs mt-1">
              High-level institutional governance, O & A Level academic policy, UNEB center administration & secondary staffing.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm uppercase tracking-tight">Academic Excellence</h3>
              <p className="text-2xl font-black text-slate-900 mt-1 font-mono">92% DIV 1</p>
              <p className="text-[11px] text-slate-500 mt-1">UCE 2025 Benchmarked Performance</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm uppercase tracking-tight">Total Student Roll</h3>
              <p className="text-2xl font-black text-slate-900 mt-1 font-mono">1,840 Students</p>
              <p className="text-[11px] text-slate-500 mt-1">O-Level: 1,200 | A-Level: 640</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Landmark className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm uppercase tracking-tight">FAAP Finance Status</h3>
              <p className="text-2xl font-black text-slate-900 mt-1 font-mono">96.5% Paid</p>
              <p className="text-[11px] text-emerald-600 font-bold mt-1">All Secondary Ledger Reconciled</p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl shadow-2xs overflow-hidden">
          <div className="p-4 border-b border-slate-100 bg-slate-50/50">
            <h3 className="font-bold text-slate-800 text-sm">Senate Session & Minutes Roll</h3>
          </div>
          <div className="p-8 text-center space-y-3">
            <div className="inline-flex p-3 rounded-full bg-slate-50 text-slate-300">
              <FileText className="w-8 h-8" />
            </div>
            <p className="text-xs text-slate-500 max-w-xs mx-auto">No senate sessions recorded for the current term. Initialize academic policy framework.</p>
          </div>
        </div>
      </div>
    </PortalAuthenticationGate>
  );
};

export const SecondaryRegistrarPortal: React.FC = () => {
  return (
    <PortalAuthenticationGate
      portalId="secondary-registrar"
      portalName="Secondary Registrar & UNEB Center Administration"
      domainContext="JUMO-SCHOOL-ERP"
      requiredRoles={['ROLE_SECONDARY_REGISTRAR', 'ROLE_HEADTEACHER', 'ROLE_SCHOOL_ADMIN']}
      onAuthenticated={() => {}}
    >
      <div className="space-y-6 animate-in fade-in duration-300">
        <div className="flex items-center gap-3 border-b border-slate-200 pb-4">
          <Users className="w-8 h-8 text-blue-600" />
          <div>
            <h2 className="text-xl font-bold text-slate-900">Registrar Office & Student Information (SIS)</h2>
            <p className="text-xs text-slate-500">Student enrollment, LIN verification, UCE/UACE registration & index numbers.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-sm">O-Level Enrollment (S.1 - S.4)</h3>
              <span className="text-[10px] font-mono font-bold bg-blue-50 text-blue-700 px-2 py-0.5 rounded">UCE 2026 Ready</span>
            </div>
            <div className="space-y-2">
              {[
                { class: 'Senior One', count: 320 },
                { class: 'Senior Two', count: 305 },
                { class: 'Senior Three', count: 295 },
                { class: 'Senior Four', count: 280 }
              ].map(c => (
                <div key={c.class} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
                  <span className="text-xs text-slate-600 font-medium">{c.class}</span>
                  <span className="text-xs font-mono font-bold text-slate-900">{c.count} Students</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-sm">A-Level Enrollment (S.5 - S.6)</h3>
              <span className="text-[10px] font-mono font-bold bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded">UACE 2026 Ready</span>
            </div>
            <div className="space-y-2">
              {[
                { class: 'Senior Five', count: 330 },
                { class: 'Senior Six', count: 310 }
              ].map(c => (
                <div key={c.class} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
                  <span className="text-xs text-slate-600 font-medium">{c.class}</span>
                  <span className="text-xs font-mono font-bold text-slate-900">{c.count} Students</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PortalAuthenticationGate>
  );
};

export const SecondaryAcademicDosPortal: React.FC = () => {
  return (
    <PortalAuthenticationGate
      portalId="secondary-dos"
      portalName="DOS Academic & Subject Combination Office"
      domainContext="JUMO-SCHOOL-ERP"
      requiredRoles={['ROLE_SECONDARY_DOS', 'ROLE_HEADTEACHER', 'ROLE_SCHOOL_ADMIN']}
      onAuthenticated={() => {}}
    >
      <div className="space-y-6 animate-in fade-in duration-300">
        <div className="flex items-center gap-3 border-b border-slate-200 pb-4">
          <BookOpen className="w-8 h-8 text-emerald-600" />
          <div>
            <h2 className="text-xl font-bold text-slate-900">Academic Director (DOS) & Gradebook</h2>
            <p className="text-xs text-slate-500">O/A Level subject combinations, NCDC curriculum tracking & teacher workloads.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <Microscope className="w-4 h-4 text-rose-600" />
              A-Level Subject Combinations
            </h3>
            <p className="text-[10px] text-slate-500">Benchmark monitoring for PCM, BCM, HEG, and Arts/Science clusters.</p>
            <div className="grid grid-cols-2 gap-2">
              {['PCM/Sub-Math', 'BCM/Sub-ICT', 'PEM/Sub-Math', 'HEG/Sub-ICT'].map(c => (
                <div key={c} className="p-2 border border-slate-100 rounded-lg text-center font-mono text-[10px] font-bold text-slate-700 bg-slate-50">
                  {c}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <ClipboardList className="w-4 h-4 text-emerald-600" />
              Teacher Performance & Gradebook
            </h3>
            <p className="text-[10px] text-slate-500">Automated marksheet generation and NCDC competency tracking.</p>
            <div className="pt-2">
              <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                <div className="bg-emerald-600 h-full w-[85%]" />
              </div>
              <div className="flex justify-between mt-1.5">
                <span className="text-[10px] text-slate-500 font-bold uppercase">Marks Entry Progress</span>
                <span className="text-[10px] text-emerald-600 font-black">85% Complete</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PortalAuthenticationGate>
  );
};

export const SecondaryBursarPortal: React.FC = () => {
  return (
    <PortalAuthenticationGate
      portalId="secondary-bursar"
      portalName="Secondary Bursar & FAAP Financial Ledger"
      domainContext="JUMO-FINTECH"
      requiredRoles={['ROLE_SECONDARY_BURSAR', 'ROLE_HEADTEACHER', 'ROLE_SCHOOL_ADMIN']}
      onAuthenticated={() => {}}
    >
      <div className="space-y-6 animate-in fade-in duration-300">
        <div className="flex items-center gap-3 border-b border-slate-200 pb-4">
          <Calculator className="w-8 h-8 text-amber-600" />
          <div>
            <h2 className="text-xl font-bold text-slate-900">Secondary Bursar Office (FAAP Integrated)</h2>
            <p className="text-xs text-slate-500">Boarding fees, science lab fees, UCE/UACE registration fees & staff payroll ledger.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs col-span-2">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Fee Collections (Term 1)</span>
              <TrendingUp className="w-4 h-4 text-emerald-500" />
            </div>
            <p className="text-3xl font-black text-slate-900 font-mono tracking-tight">1,240,500,000 UGX</p>
            <div className="mt-4 pt-4 border-t border-slate-50 flex items-center justify-between text-[11px]">
              <span className="text-slate-500">Collection Target: 1.35B</span>
              <span className="text-emerald-600 font-black">91.8% RECONCILED</span>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Lab Fees Pending</span>
            <p className="text-xl font-black text-rose-600 mt-2 font-mono">12.5M UGX</p>
            <p className="text-[11px] text-slate-400 mt-1">O & A Level Science</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Staff Payroll (FAAP)</span>
            <p className="text-xl font-black text-indigo-700 mt-2 font-mono">142M UGX</p>
            <p className="text-[11px] text-slate-400 mt-1">Term 1 Salary Budget</p>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl shadow-2xs overflow-hidden">
          <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
            <h3 className="font-bold text-slate-800 text-sm">Sovereign High Academy — FAAP Digital Cashbook</h3>
            <button className="text-[10px] font-black text-indigo-600 hover:text-indigo-700 uppercase tracking-widest">Open Ledger Console</button>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {[
                { ref: 'FAAP-SEC-9001', desc: 'Boarding Fee Collection - S.4 A', amt: '+ 850,000', status: 'VERIFIED' },
                { ref: 'FAAP-SEC-9002', desc: 'Science Lab Equipment - Procurement', amt: '- 4,200,000', status: 'AUDITED' },
                { ref: 'FAAP-SEC-9003', desc: 'UCE Exam Registration - UNEB', amt: '- 12,450,000', status: 'VERIFIED' }
              ].map(entry => (
                <div key={entry.ref} className="flex items-center justify-between text-xs py-1 border-b border-slate-50 last:border-0 pb-2">
                  <div className="flex flex-col">
                    <span className="font-mono text-[10px] text-slate-400">{entry.ref}</span>
                    <span className="font-bold text-slate-800">{entry.desc}</span>
                  </div>
                  <div className="text-right flex flex-col items-end">
                    <span className={`font-mono font-black ${entry.amt.startsWith('+') ? 'text-emerald-600' : 'text-rose-600'}`}>{entry.amt} UGX</span>
                    <span className="text-[9px] font-bold bg-slate-100 text-slate-500 px-1.5 rounded uppercase">{entry.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PortalAuthenticationGate>
  );
};
