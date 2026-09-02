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

import { faapEnterpriseRuntime } from '../../../core/faap/faapService';

export const JournalEntryForm = ({ onSuccess, onCancel }: FormProps) => {
  const [description, setDescription] = useState('');
  const [reference, setReference] = useState('');
  const [lines, setLines] = useState([
    { accountId: '', debit: 0, credit: 0 },
    { accountId: '', debit: 0, credit: 0 }
  ]);

  const accounts = faapEnterpriseRuntime.listAccounts();

  const totalDebit = lines.reduce((sum, l) => sum + l.debit, 0);
  const totalCredit = lines.reduce((sum, l) => sum + l.credit, 0);

  const addLine = () => setLines([...lines, { accountId: '', debit: 0, credit: 0 }]);

  const updateLine = (index: number, field: string, value: any) => {
    const newLines = [...lines];
    (newLines[index] as any)[field] = value;
    setLines(newLines);
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  const isBalanced = totalDebit === totalCredit && totalDebit > 0;
  const hasIncompleteLines = lines.some(l => !l.accountId || (l.debit === 0 && l.credit === 0));
  const isValid = isBalanced && !hasIncompleteLines && reference && description;

  const handlePost = async () => {
    if (!isValid) return alert('Cannot post: Ensure all fields are filled, lines have accounts, and entry is balanced.');
    setIsSubmitting(true);
    try {
      await faapEnterpriseRuntime.createJournal(
        { date: new Date().toISOString(), reference, description, source: 'manual' },
        lines.map(l => ({ ...l, currency: 'UGX' }))
      );
      onSuccess(`Journal posted successfully. Reference: ${reference}`);
    } catch (err: any) {
      alert(`Posting Failed: ${err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSaveDraft = async () => {
    if (!reference || !description) return alert('Reference and Description are required to save a draft.');
    setIsSubmitting(true);
    try {
      await faapEnterpriseRuntime.saveDraft(
        { date: new Date().toISOString(), reference, description, source: 'manual' },
        lines.map(l => ({ ...l, currency: 'UGX' }))
      );
      onSuccess(`Journal saved as DRAFT. Reference: ${reference}`);
    } catch (err: any) {
      alert(`Draft Save Failed: ${err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Reference</label>
          <input 
            type="text" 
            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold outline-none focus:ring-2 focus:ring-emerald-500" 
            placeholder="INV-001 or REF-XYZ"
            value={reference}
            onChange={e => setReference(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Description</label>
          <input 
            type="text" 
            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold outline-none focus:ring-2 focus:ring-emerald-500" 
            placeholder="Narrative..."
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
        </div>
      </div>

      <div className={`p-5 rounded-2xl flex items-center justify-between shadow-xl transition-all ${isBalanced ? 'bg-slate-900 text-white' : 'bg-rose-50 border border-rose-100 text-rose-900'}`}>
        <div className="flex items-center gap-3">
          <Calculator className={`w-5 h-5 ${isBalanced ? 'text-emerald-400' : 'text-rose-500'}`} />
          <span className="text-[10px] font-black uppercase tracking-widest">Parity Status: {isBalanced ? 'BALANCED' : 'IMBALANCED'}</span>
        </div>
        <div className="flex gap-8">
          <div className="text-right">
            <p className={`text-[9px] uppercase font-bold ${isBalanced ? 'text-slate-400' : 'text-rose-400'}`}>Total DR</p>
            <p className={`text-sm font-black ${isBalanced ? 'text-emerald-400' : 'text-rose-600'}`}>{totalDebit.toLocaleString()}</p>
          </div>
          <div className="text-right">
            <p className={`text-[9px] uppercase font-bold ${isBalanced ? 'text-slate-400' : 'text-rose-400'}`}>Total CR</p>
            <p className={`text-sm font-black ${isBalanced ? 'text-emerald-400' : 'text-rose-600'}`}>{totalCredit.toLocaleString()}</p>
          </div>
        </div>
      </div>

      <div className="space-y-4 max-h-60 overflow-y-auto pr-2 scrollbar-hide">
         {lines.map((line, i) => (
           <div key={i} className="grid grid-cols-12 gap-3 items-end p-3 hover:bg-slate-50 rounded-xl transition-all">
              <div className="col-span-6 space-y-1">
                 <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Account</label>
                 <select 
                  className={`w-full p-2.5 bg-white border rounded-lg text-[11px] font-bold outline-none ${!line.accountId ? 'border-rose-200 ring-2 ring-rose-50' : 'border-slate-200'}`}
                  value={line.accountId}
                  onChange={e => updateLine(i, 'accountId', e.target.value)}
                 >
                    <option value="">Select Account...</option>
                    {accounts.map((acc: any) => (
                      <option key={acc.code} value={acc.code}>{acc.code} - {acc.name}</option>
                    ))}
                 </select>
              </div>
              <div className="col-span-3 space-y-1">
                 <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Debit</label>
                 <input 
                  type="number" 
                  className="w-full p-2.5 bg-white border border-slate-200 rounded-lg text-[11px] font-bold outline-none focus:ring-2 focus:ring-emerald-500" 
                  value={line.debit}
                  onChange={e => updateLine(i, 'debit', Number(e.target.value))}
                 />
              </div>
              <div className="col-span-3 space-y-1">
                 <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Credit</label>
                 <input 
                  type="number" 
                  className="w-full p-2.5 bg-white border border-slate-200 rounded-lg text-[11px] font-bold outline-none focus:ring-2 focus:ring-emerald-500" 
                  value={line.credit}
                  onChange={e => updateLine(i, 'credit', Number(e.target.value))}
                 />
              </div>
           </div>
         ))}
      </div>

      <button onClick={addLine} className="w-full py-2 border-2 border-dashed border-slate-200 rounded-xl text-[10px] font-black text-slate-400 hover:border-emerald-200 hover:text-emerald-600 transition-all uppercase tracking-widest">
        Add Distribution Line
      </button>

      <div className="flex gap-4 pt-4 border-t border-slate-100">
        <button 
          onClick={handlePost} 
          disabled={!isValid || isSubmitting}
          className="flex-[2] py-4 bg-slate-900 text-white rounded-2xl text-xs font-black shadow-lg hover:bg-slate-800 transition-all disabled:opacity-50 disabled:grayscale"
        >
          {isSubmitting ? 'Processing...' : 'Direct Post to Ledger'}
        </button>
        <button 
          onClick={handleSaveDraft} 
          disabled={isSubmitting}
          className="flex-1 py-4 bg-white border-2 border-slate-900 text-slate-900 rounded-2xl text-xs font-black hover:bg-slate-50 transition-all disabled:opacity-50"
        >
          Save as Draft
        </button>
        <button onClick={onCancel} className="px-6 py-4 border border-slate-200 text-slate-600 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all">Cancel</button>
      </div>
    </div>
  );
};
