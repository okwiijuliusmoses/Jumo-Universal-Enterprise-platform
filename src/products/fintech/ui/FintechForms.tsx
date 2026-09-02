import React, { useState } from 'react';
import { FileText, UserPlus, Calculator, Wallet, CheckCircle2 } from 'lucide-react';

interface FormProps {
  onSuccess: (message: string) => void;
  onCancel: () => void;
}

export const MemberEnrollForm = ({ onSuccess, onCancel }: FormProps) => {
  const [formData, setFormData] = useState({
    fullName: '',
    nin: '',
    phone: '',
    subscription: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.nin) return alert('Legal Name and NIN are mandatory for KYC compliance.');
    onSuccess(`Member CIF created for ${formData.fullName}. Verified via National ID.`);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest">Full Legal Name</label>
          <input 
            type="text" 
            required
            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold outline-none focus:ring-2 focus:ring-emerald-500 transition-all" 
            placeholder="As per National ID"
            value={formData.fullName}
            onChange={e => setFormData({...formData, fullName: e.target.value})}
          />
        </div>
        <div className="space-y-2">
          <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest">National ID (NIN)</label>
          <input 
            type="text" 
            required
            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold outline-none focus:ring-2 focus:ring-emerald-500 transition-all" 
            placeholder="CM000000000..."
            value={formData.nin}
            onChange={e => setFormData({...formData, nin: e.target.value})}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest">Mobile Phone (KYC)</label>
          <input 
            type="tel" 
            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold outline-none focus:ring-2 focus:ring-emerald-500 transition-all" 
            placeholder="+256 7..."
            value={formData.phone}
            onChange={e => setFormData({...formData, phone: e.target.value})}
          />
        </div>
        <div className="space-y-2">
          <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest">Initial Share Subscription (UGX)</label>
          <input 
            type="number" 
            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold outline-none focus:ring-2 focus:ring-emerald-500 transition-all" 
            placeholder="Min: 20,000"
            value={formData.subscription}
            onChange={e => setFormData({...formData, subscription: e.target.value})}
          />
        </div>
      </div>
      <div className="flex gap-4 pt-4">
        <button type="submit" className="flex-1 py-4 bg-emerald-600 text-white rounded-2xl text-xs font-black shadow-lg shadow-emerald-600/20 hover:bg-emerald-700 transition-all">Submit CIF Enrollment</button>
        <button type="button" onClick={onCancel} className="px-8 py-4 border border-slate-200 text-slate-600 rounded-2xl text-xs font-black hover:bg-slate-50 transition-all">Cancel</button>
      </div>
    </form>
  );
};

export const LoanAppraisalForm = ({ onSuccess, onCancel }: FormProps) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest">Borrower Selection</label>
          <select className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold outline-none focus:ring-2 focus:ring-emerald-500 appearance-none">
            <option>John Baptist Otim (MEM-10042)</option>
            <option>Harriet Namukasa (MEM-10043)</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest">Loan Product</label>
          <select className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold outline-none focus:ring-2 focus:ring-emerald-500 appearance-none">
            <option>Business Capital Loan (15% p.a.)</option>
            <option>Agriculture Season Loan (12% p.a.)</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest">Principal Amount (UGX)</label>
          <input type="number" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold outline-none focus:ring-2 focus:ring-emerald-500 transition-all" />
        </div>
        <div className="space-y-2">
          <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest">Collateral Pledged</label>
          <input type="text" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold outline-none focus:ring-2 focus:ring-emerald-500 transition-all" placeholder="e.g., Logbook, Title" />
        </div>
      </div>
      <div className="flex gap-4 pt-4">
        <button onClick={() => onSuccess('Loan application appraisal initiated. State: PENDING_CREDIT_REVIEW')} className="flex-1 py-4 bg-emerald-600 text-white rounded-2xl text-xs font-black shadow-lg shadow-emerald-600/20 hover:bg-emerald-700 transition-all">Submit for Appraisal</button>
        <button onClick={onCancel} className="px-8 py-4 border border-slate-200 text-slate-600 rounded-2xl text-xs font-black hover:bg-slate-50 transition-all">Cancel</button>
      </div>
    </div>
  );
};

export const JournalEntryForm = ({ onSuccess, onCancel }: FormProps) => {
  const [totalDebit, setTotalDebit] = useState(0);
  const [totalCredit, setTotalCredit] = useState(0);

  const handlePost = () => {
    if (totalDebit !== totalCredit || totalDebit === 0) {
      return alert('Accounting Error: Total Debits must equal Total Credits and be greater than zero.');
    }
    onSuccess('Journal posting successful. Synchronized with JUMO FAAP Ledger.');
  };

  return (
    <div className="space-y-8">
      <div className="p-5 bg-slate-900 text-white rounded-2xl flex items-center justify-between shadow-xl">
        <div className="flex items-center gap-3">
          <Calculator className="w-5 h-5 text-emerald-400" />
          <span className="text-[10px] font-black uppercase tracking-widest">Parity Check</span>
        </div>
        <div className="flex gap-8">
          <div className="text-right">
            <p className="text-[9px] text-slate-400 uppercase font-bold">Total DR</p>
            <p className="text-sm font-black text-emerald-400">{totalDebit.toLocaleString()}</p>
          </div>
          <div className="text-right">
            <p className="text-[9px] text-slate-400 uppercase font-bold">Total CR</p>
            <p className="text-sm font-black text-emerald-400">{totalCredit.toLocaleString()}</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
         <div className="grid grid-cols-12 gap-4">
            <div className="col-span-6 space-y-2">
               <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Ledger Account</label>
               <select className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold">
                  <option>1001 - Cash in Vault</option>
                  <option>2001 - Member Savings</option>
               </select>
            </div>
            <div className="col-span-3 space-y-2">
               <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Debit (DR)</label>
               <input 
                type="number" 
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold" 
                onChange={e => setTotalDebit(Number(e.target.value))}
               />
            </div>
            <div className="col-span-3 space-y-2">
               <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Credit (CR)</label>
               <input 
                type="number" 
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold" 
                onChange={e => setTotalCredit(Number(e.target.value))}
               />
            </div>
         </div>
      </div>

      <div className="flex gap-4 pt-4 border-t border-slate-100">
        <button onClick={handlePost} className="flex-1 py-4 bg-slate-900 text-white rounded-2xl text-xs font-black shadow-lg hover:bg-slate-800 transition-all">Post to Ledger</button>
        <button onClick={onCancel} className="px-8 py-4 border border-slate-200 text-slate-600 rounded-2xl text-xs font-black hover:bg-slate-50 transition-all">Cancel</button>
      </div>
    </div>
  );
};
