import React from 'react';
import { 
  User, Phone, MapPin, ShieldCheck, CreditCard, 
  History, ArrowUpRight, ArrowDownLeft, FileText,
  ChevronRight, BadgeCheck, Clock, ExternalLink,
  Activity, Briefcase
} from 'lucide-react';

interface RecordViewProps {
  type: 'MEMBER' | 'TRANSACTION' | 'AGENT';
  id: string;
  onBack: () => void;
}

export const FintechRecordView = ({ type, id, onBack }: RecordViewProps) => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* HEADER SECTION */}
      <div className="flex items-center justify-between">
        <button onClick={onBack} className="flex items-center gap-2 text-xs font-black text-slate-400 hover:text-slate-900 transition-all uppercase tracking-widest">
           <History className="w-4 h-4 rotate-180" /> Back to Registry
        </button>
        <div className="flex gap-3">
           <button className="px-4 py-2 border border-slate-200 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all">Print Statement</button>
           <button className="px-4 py-2 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all">Operational Audit</button>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-[32px] overflow-hidden shadow-xl shadow-slate-200/50">
        <div className="p-10 border-b border-slate-100 bg-slate-50/50 flex items-start justify-between">
          <div className="flex gap-6">
            <div className="w-20 h-20 bg-slate-900 rounded-3xl flex items-center justify-center text-white text-2xl font-black shadow-2xl">
              {id.substring(0, 2)}
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h3 className="text-3xl font-black text-slate-900 tracking-tighter">John Baptist Otim</h3>
                <span className="px-3 py-1 bg-emerald-600 text-white rounded-full text-[9px] font-black uppercase tracking-widest shadow-lg shadow-emerald-600/20">Verified CIF</span>
              </div>
              <p className="text-slate-400 font-bold mt-2 flex items-center gap-4 text-xs uppercase tracking-widest">
                <span className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5" /> NIN: CM0000214B</span>
                <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5" /> +256 772 334455</span>
              </p>
            </div>
          </div>
          <div className="text-right">
             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Savings Value</p>
             <p className="text-4xl font-black text-slate-900 mt-1 tracking-tighter">UGX 12,450,000</p>
          </div>
        </div>

        <div className="grid grid-cols-12">
          <div className="col-span-8 p-10 space-y-10 border-r border-slate-100">
             <section className="space-y-6">
                <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <Activity className="w-4 h-4" /> Transaction History
                </h4>
                <div className="space-y-4">
                  {[
                    { type: 'DEPOSIT', amt: '500,000', date: 'Oct 12, 2023', status: 'COMPLETED' },
                    { type: 'LOAN_PMT', amt: '1,200,000', date: 'Oct 05, 2023', status: 'COMPLETED' },
                    { type: 'WITHDRAW', amt: '200,000', date: 'Sep 28, 2023', status: 'REVERSED', isRed: true },
                  ].map((txn, i) => (
                    <div key={i} className="flex items-center justify-between p-4 rounded-2xl border border-slate-100 hover:border-emerald-200 transition-all group">
                       <div className="flex items-center gap-4">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${txn.isRed ? 'bg-rose-50 text-rose-600' : 'bg-emerald-50 text-emerald-600'}`}>
                             {txn.type === 'DEPOSIT' ? <ArrowDownLeft className="w-5 h-5" /> : <ArrowUpRight className="w-5 h-5" />}
                          </div>
                          <div>
                             <p className="text-xs font-black text-slate-900 uppercase tracking-widest">{txn.type.replace('_', ' ')}</p>
                             <p className="text-[10px] text-slate-400 font-bold mt-1">{txn.date}</p>
                          </div>
                       </div>
                       <div className="text-right">
                          <p className={`text-sm font-black ${txn.isRed ? 'text-rose-600' : 'text-slate-900'}`}>
                            {txn.type === 'WITHDRAW' ? '-' : '+'} UGX {txn.amt}
                          </p>
                          <p className="text-[9px] font-black text-slate-400 mt-1 uppercase tracking-widest">{txn.status}</p>
                       </div>
                    </div>
                  ))}
                </div>
             </section>
          </div>

          <div className="col-span-4 p-10 bg-slate-50/30 space-y-10">
             <section className="space-y-6">
                <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <Briefcase className="w-4 h-4" /> Credit Position
                </h4>
                <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4">
                   <div>
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Active Loan Principal</p>
                      <p className="text-xl font-black text-slate-900 tracking-tighter">UGX 5,000,000</p>
                   </div>
                   <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 w-[65%]" />
                   </div>
                   <div className="flex justify-between text-[10px] font-bold">
                      <span className="text-slate-400">Repaid: 65%</span>
                      <span className="text-emerald-600">On Track</span>
                   </div>
                </div>
             </section>

             <section className="space-y-6">
                <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <CreditCard className="w-4 h-4" /> Shareholding
                </h4>
                <div className="flex items-center justify-between p-4 bg-emerald-600 text-white rounded-2xl shadow-lg shadow-emerald-900/20">
                   <div>
                      <p className="text-[9px] font-black text-emerald-200 uppercase tracking-widest">Subscription</p>
                      <p className="text-lg font-black tracking-tighter">250 Shares</p>
                   </div>
                   <div className="text-right">
                      <p className="text-[9px] text-emerald-200 uppercase font-bold">Value</p>
                      <p className="text-sm font-black">UGX 2.5M</p>
                   </div>
                </div>
             </section>
          </div>
        </div>
      </div>
    </div>
  );
};
