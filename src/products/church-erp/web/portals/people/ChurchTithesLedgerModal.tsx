import React, { useState } from 'react';
import { 
  X, DollarSign, CheckCircle2, AlertCircle, Printer, 
  Sparkles, Landmark, User, FileText, ArrowRight
} from 'lucide-react';
import ChurchPeopleService, { 
  ChurchMemberRecord, 
  TitheCategory, 
  TitheRecord 
} from '../../../domain/ChurchPeopleService';

interface TithesModalProps {
  member?: ChurchMemberRecord | null;
  onClose: () => void;
  onTitheLogged: (tithe: TitheRecord) => void;
}

export const ChurchTithesLedgerModal: React.FC<TithesModalProps> = ({
  member: initialMember,
  onClose,
  onTitheLogged
}) => {
  const service = ChurchPeopleService.getInstance();
  const members = service.getMembers();
  const [selectedMemberId, setSelectedMemberId] = useState(initialMember?.id || members[0]?.id || '');
  
  const [category, setCategory] = useState<TitheCategory>('TITHE');
  const [amount, setAmount] = useState<number>(200000);
  const [currency, setCurrency] = useState('UGX');
  const [paymentMethod, setPaymentMethod] = useState<'CASH' | 'M-PESA' | 'AIRTEL_MONEY' | 'BANK_TRANSFER' | 'FAAP_LEDGER'>('M-PESA');
  const [notes, setNotes] = useState('');
  const [recordedBy, setRecordedBy] = useState('Parish Treasury Office');

  const [issuedReceipt, setIssuedReceipt] = useState<TitheRecord | null>(null);
  const [error, setError] = useState('');

  const selectedMember = members.find(m => m.id === selectedMemberId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMember) {
      setError('Please select a valid parishioner.');
      return;
    }
    if (!amount || amount <= 0) {
      setError('Please enter a valid contribution amount.');
      return;
    }

    const newTithe = service.addTithe({
      memberId: selectedMember.id,
      memberName: `${selectedMember.title} ${selectedMember.firstName} ${selectedMember.lastName}`,
      memberClassification: selectedMember.classification,
      category,
      amount: Number(amount),
      currency,
      paymentMethod,
      status: 'POSTED_TO_FAAP',
      notes: notes.trim() || undefined,
      recordedBy
    });

    setIssuedReceipt(newTithe);
    onTitheLogged(newTithe);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-xl max-h-[92vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-600/30 border border-purple-500/40 flex items-center justify-center text-purple-300">
              <DollarSign className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white tracking-wide">
                FAAP Tithe & Stewardship Ledger
              </h2>
              <p className="text-xs text-slate-400">
                Direct double-entry ledger posting with instant receipt generation
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          {error && (
            <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {!issuedReceipt ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Member Selection */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Parishioner / Contributor *
                </label>
                <select
                  value={selectedMemberId}
                  onChange={(e) => setSelectedMemberId(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white font-medium focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  required
                >
                  {members.map(m => (
                    <option key={m.id} value={m.id}>
                      {m.title} {m.firstName} {m.lastName} ({m.classification}) — {m.id}
                    </option>
                  ))}
                </select>
              </div>

              {/* Contribution Category */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Giving Category *
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'TITHE', label: 'Tithe (10%)' },
                    { id: 'OFFERING', label: 'Offertory' },
                    { id: 'BUILDING_FUND', label: 'Building Fund' },
                    { id: 'PLEDGE', label: 'Pledge' },
                    { id: 'THANKSGIVING', label: 'Thanksgiving' },
                    { id: 'CLERGY_WELFARE', label: 'Clergy Welfare' },
                    { id: 'DIOCESAN_QUOTA', label: 'Diocesan Quota' },
                    { id: 'EASTER_CHRISTMAS_APPEAL', label: 'Festal Appeal' }
                  ].map(cat => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setCategory(cat.id as any)}
                      className={`p-2 rounded-lg text-xs font-bold transition text-center ${
                        category === cat.id
                          ? 'bg-purple-600 text-white shadow-sm'
                          : 'bg-slate-50 text-slate-700 border border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Amount & Currency */}
              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Amount *
                  </label>
                  <input
                    type="number"
                    min="1000"
                    step="1000"
                    value={amount}
                    onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 text-xs font-bold rounded-lg border border-slate-300 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Currency
                  </label>
                  <select
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    className="w-full px-3 py-2 text-xs font-bold rounded-lg border border-slate-300 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  >
                    <option value="UGX">UGX</option>
                    <option value="USD">USD</option>
                    <option value="KES">KES</option>
                    <option value="TZS">TZS</option>
                    <option value="GBP">GBP</option>
                  </select>
                </div>
              </div>

              {/* Payment Channel */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Payment Channel / Settlement
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                  {['M-PESA', 'AIRTEL_MONEY', 'CASH', 'BANK_TRANSFER', 'FAAP_LEDGER'].map(meth => (
                    <button
                      key={meth}
                      type="button"
                      onClick={() => setPaymentMethod(meth as any)}
                      className={`p-2 rounded-lg text-[11px] font-bold transition text-center ${
                        paymentMethod === meth
                          ? 'bg-slate-900 text-white shadow-sm'
                          : 'bg-slate-50 text-slate-700 border border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {meth.replace('_', ' ')}
                    </button>
                  ))}
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Contribution Notes / Intention
                </label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. August 2026 Monthly Tithe"
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-2.5 bg-purple-600 text-white rounded-xl text-xs font-bold hover:bg-purple-700 transition shadow-md flex items-center justify-center gap-2"
                >
                  <Landmark className="w-4 h-4" /> Post To FAAP Ledger & Issue Receipt
                </button>
              </div>
            </form>
          ) : (
            /* RECEIPT VIEW */
            <div className="space-y-4">
              <div className="p-6 bg-purple-50/50 border-2 border-dashed border-purple-300 rounded-2xl text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-sm font-black text-slate-900 uppercase">
                  Tithe Posting Verified
                </h3>
                <div className="font-mono text-xs font-bold text-purple-700 bg-purple-100 py-1 px-3 rounded-full inline-block">
                  {issuedReceipt.receiptNumber}
                </div>

                <div className="text-xs text-slate-700 space-y-1 py-2 border-y border-purple-200">
                  <p>Contributor: <strong className="text-slate-900">{issuedReceipt.memberName}</strong></p>
                  <p>Category: <strong className="text-purple-900 uppercase">{issuedReceipt.category}</strong></p>
                  <p className="text-base font-black text-slate-900">
                    {issuedReceipt.currency} {issuedReceipt.amount.toLocaleString()}
                  </p>
                  <p>Method: {issuedReceipt.paymentMethod} • Status: {issuedReceipt.status}</p>
                </div>

                <p className="text-[10px] text-slate-500">
                  Transaction reconciled in FAAP Master General Ledger.
                </p>

                <div className="flex items-center justify-center gap-3 pt-2">
                  <button
                    onClick={() => window.print()}
                    className="px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-bold hover:bg-slate-800 transition flex items-center gap-2"
                  >
                    <Printer className="w-3.5 h-3.5" /> Print Official Receipt
                  </button>
                  <button
                    onClick={() => setIssuedReceipt(null)}
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg text-xs font-bold hover:bg-purple-700 transition"
                  >
                    Log Another
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-slate-200 px-6 py-3 bg-slate-50 flex items-center justify-between shrink-0">
          <span className="text-[11px] text-slate-500">Financial Integrity: FAAP Zero-Drift Ledger Protocol</span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold hover:bg-slate-300 transition"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
