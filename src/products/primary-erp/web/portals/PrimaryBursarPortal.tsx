import React, { useState } from 'react';
import { 
  Calculator, DollarSign, TrendingUp, Landmark, 
  Plus, Search, Filter, Download, CheckCircle2 
} from 'lucide-react';
import { PortalAuthenticationGate } from '../../../PortalAuthenticationGate';

export const PrimaryBursarPortal: React.FC = () => {
  return (
    <PortalAuthenticationGate
      portalId="primary-bursar"
      portalName="Primary Bursar & P.1–P.7 Fee Console"
      domainContext="JUMO-FINTECH"
      requiredRoles={['ROLE_PRIMARY_BURSAR', 'ROLE_HEADTEACHER', 'ROLE_SCHOOL_ADMIN']}
      onAuthenticated={() => {}}
    >
      <div className="space-y-6 animate-in fade-in duration-300 pb-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Primary Bursar Office & Finance</h1>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-blue-100 text-blue-800 border border-blue-300 uppercase">
                Primary FAAP Integration
              </span>
            </div>
            <p className="text-slate-500 text-xs mt-1">
              P.1–P.7 tuition collections, PLE candidate exam fees, teacher gradebook rewards & school operational ledger.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs col-span-2">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Primary Fee Collections</span>
              <TrendingUp className="w-4 h-4 text-emerald-500" />
            </div>
            <p className="text-3xl font-black text-slate-900 font-mono tracking-tight">412,850,000 UGX</p>
            <div className="mt-4 pt-4 border-t border-slate-50 flex items-center justify-between text-[11px]">
              <span className="text-slate-500">Term Target: 450M</span>
              <span className="text-emerald-600 font-black">91.7% RECONCILED</span>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">PLE Examination Fund</span>
            <p className="text-xl font-black text-blue-600 mt-2 font-mono">38.5M UGX</p>
            <p className="text-[11px] text-slate-400 mt-1">P.7 Candidate Registry Fees</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Primary Staff Payroll</span>
            <p className="text-xl font-black text-purple-700 mt-2 font-mono">68.2M UGX</p>
            <p className="text-[11px] text-slate-400 mt-1">Termly Ledger - FAAP</p>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl shadow-2xs overflow-hidden">
          <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
            <h3 className="font-bold text-slate-800 text-sm">Hillside Naalya Benchmark — Digital Alpha Cashbook</h3>
            <button className="text-[10px] font-black text-blue-600 hover:text-blue-700 uppercase tracking-widest">FAAP Ledger Link</button>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {[
                { ref: 'FAAP-PRI-2001', desc: 'Tuition Payment - P.7 Blue', amt: '+ 850,000', status: 'VERIFIED' },
                { ref: 'FAAP-PRI-2002', desc: 'UNEB PLE Center Registration', amt: '- 4,500,000', status: 'AUDITED' },
                { ref: 'FAAP-PRI-2003', desc: 'Tuition Payment - P.1 Green', amt: '+ 720,000', status: 'VERIFIED' }
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
