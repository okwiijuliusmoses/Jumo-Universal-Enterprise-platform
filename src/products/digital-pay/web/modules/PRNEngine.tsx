import React, { useState } from 'react';
import { 
  Zap, Search, ArrowRight, CheckCircle2, AlertCircle, FileText, 
  Plus, Smartphone, CreditCard, Landmark, CheckSquare, RefreshCw, X 
} from 'lucide-react';
import { DigitalPayService } from '../../domain/DigitalPayService';
import { DigitalPayReference } from '../../domain/types';

export const PRNEngine: React.FC = () => {
  const service = DigitalPayService.getInstance();
  const [references, setReferences] = useState<DigitalPayReference[]>(service.getReferences());
  const [searchQuery, setSearchQuery] = useState('');
  const [resolvedRef, setResolvedRef] = useState<DigitalPayReference | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  // Form states - Create reference
  const [showAddRefModal, setShowAddRefModal] = useState(false);
  const [newRefCode, setNewRefCode] = useState('');
  const [payerName, setPayerName] = useState('');
  const [payerId, setPayerId] = useState('');
  const [institutionCode, setInstitutionCode] = useState('ALPHA');
  const [amount, setAmount] = useState<number>(0);

  // Form states - Process payment
  const [showPayModal, setShowPayModal] = useState(false);
  const [paymentChannel, setPaymentChannel] = useState<'MOBILE_MONEY' | 'BANK_TRANSFER' | 'CARD' | 'WALLET'>('MOBILE_MONEY');
  const [paymentAmount, setPaymentAmount] = useState<number>(0);

  const handleResolve = () => {
    setHasSearched(true);
    const found = service.resolveReference(searchQuery.trim());
    setResolvedRef(found || null);
  };

  const handleCreateReference = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRefCode.trim()) return alert('Reference is required.');
    if (!payerName.trim()) return alert('Payer Name is required.');
    if (amount <= 0) return alert('Amount must be greater than 0.');

    try {
      const added = service.createReference({
        reference: newRefCode.trim(),
        payerId: payerId.trim() || 'P_GUEST',
        payerName: payerName.trim(),
        merchantCode: institutionCode,
        totalAmount: amount,
        balanceDue: amount,
        expiryDate: new Date(Date.now() + 365 * 24 * 3600 * 1000).toISOString().split('T')[0], // 1 year
      });
      setReferences(service.getReferences());
      setShowAddRefModal(false);
      setNewRefCode('');
      setPayerName('');
      setPayerId('');
      setAmount(0);
      alert(`Payment Reference ${added.reference} generated successfully and linked with JUMO Central Clearing!`);
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleProcessPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resolvedRef) return;

    if (paymentAmount <= 0) {
      alert('Payment amount must be greater than 0.');
      return;
    }

    try {
      const tx = service.processCollection({
        reference: resolvedRef.reference,
        amount: paymentAmount,
        channel: paymentChannel,
        paymentDate: new Date().toISOString().split('T')[0]
      });

      // Refresh states
      setReferences(service.getReferences());
      const updated = service.resolveReference(resolvedRef.reference);
      setResolvedRef(updated || null);
      setShowPayModal(false);
      alert(`Payment of UGX ${tx.amount.toLocaleString()} received! Status: SUCCESS. JUMO split commission fee (1.5%) allocated to general journal.`);
    } catch (err: any) {
      alert(err.message);
    }
  };

  const openPaymentForm = () => {
    if (!resolvedRef) return;
    setPaymentAmount(resolvedRef.balanceDue);
    setShowPayModal(true);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-16">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">PRN Resolution Engine</h1>
          <p className="text-slate-500 text-sm">Verify and collect payment reference numbers securely across multi-tenant educational institutions.</p>
        </div>
        <button 
          onClick={() => setShowAddRefModal(true)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-sm font-bold transition-all shadow-lg shadow-blue-500/10"
        >
          <Plus className="w-4 h-4" />
          Generate Reference
        </button>
      </div>

      {/* Lookup Bar */}
      <div className="bg-white border border-slate-200 rounded-3xl p-1 shadow-xl shadow-slate-900/5 max-w-3xl mx-auto">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 p-2">
          <div className="flex-1 flex items-center gap-3 px-3">
            <Search className="w-5 h-5 text-slate-400 shrink-0" />
            <input 
              type="text" 
              placeholder="Enter Payment Reference Number (e.g. REF-11022-Y)..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent border-none outline-none text-base font-bold text-slate-900 placeholder:text-slate-300"
            />
          </div>
          <button 
            onClick={handleResolve}
            className="bg-slate-900 text-white px-8 py-3.5 rounded-2xl font-bold text-sm uppercase tracking-widest hover:bg-slate-800 transition-all active:scale-95 whitespace-nowrap"
          >
            Resolve PRN
          </button>
        </div>
      </div>

      {/* Results Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {hasSearched ? (
            resolvedRef ? (
              <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm relative overflow-hidden">
                <div className="relative z-10 space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-black tracking-widest uppercase text-slate-400">PRN Code</span>
                      <h3 className="font-mono text-xl font-bold text-slate-900">{resolvedRef.reference}</h3>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                      resolvedRef.status === 'PAID' 
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                        : 'bg-blue-50 text-blue-700 border-blue-200 animate-pulse'
                    }`}>
                      {resolvedRef.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Payer Profile</p>
                      <p className="text-base font-bold text-slate-900">{resolvedRef.payerName}</p>
                      <p className="text-xs text-slate-500 font-mono">ID: {resolvedRef.payerId}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Clearing Institution</p>
                      <p className="text-base font-bold text-slate-900">
                        {resolvedRef.merchantCode === 'ALPHA' ? 'Sovereign Academy Primary' : 'Sovereign University'}
                      </p>
                      <p className="text-xs text-slate-500 font-mono">Merchant: {resolvedRef.merchantCode}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Total Obligation</p>
                      <p className="text-lg font-bold font-mono text-slate-700">{resolvedRef.totalAmount.toLocaleString()} UGX</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Outstanding Balance</p>
                      <p className={`text-2xl font-black font-mono ${resolvedRef.balanceDue > 0 ? 'text-rose-600' : 'text-emerald-600'}`}>
                        {resolvedRef.balanceDue.toLocaleString()} UGX
                      </p>
                    </div>
                  </div>

                  {resolvedRef.status !== 'PAID' && (
                    <div className="pt-6 border-t border-slate-100 flex justify-end">
                      <button 
                        onClick={openPaymentForm}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm px-6 py-3 rounded-xl flex items-center gap-2 shadow-lg shadow-blue-500/15"
                      >
                        <Zap className="w-4 h-4 fill-white" />
                        Collect Offline Payment
                      </button>
                    </div>
                  )}
                </div>
                <Zap className="absolute -right-8 -bottom-8 w-48 h-48 text-slate-50" />
              </div>
            ) : (
              <div className="bg-slate-50 border border-slate-200 border-dashed rounded-2xl p-12 text-center flex flex-col items-center justify-center space-y-3">
                <AlertCircle className="w-10 h-10 text-amber-500" />
                <h3 className="font-bold text-slate-800 text-base">Unresolved Payment Reference</h3>
                <p className="text-slate-500 text-sm max-w-md">
                  We could not find reference "<span className="font-mono font-bold">{searchQuery}</span>" inside our active clearing database. Check typo or register it below.
                </p>
              </div>
            )
          ) : (
            <div className="bg-slate-50 border border-slate-200 border-dashed rounded-2xl p-12 text-center flex flex-col items-center justify-center space-y-2">
              <FileText className="w-10 h-10 text-slate-300" />
              <h3 className="font-bold text-slate-700 text-sm">Awaiting Reference Search</h3>
              <p className="text-slate-400 text-xs">Enter a valid Payment Reference Code above to run real-time clearing diagnostics.</p>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className="bg-slate-950 text-white p-6 rounded-2xl shadow-xl">
            <h3 className="font-bold mb-4 flex items-center gap-2 text-sm text-blue-400">
              <CheckSquare className="w-4 h-4 text-emerald-400" />
              PRN Validation Standards
            </h3>
            <ul className="space-y-3 text-xs text-slate-400">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5 shrink-0" />
                <div>
                  <p className="font-bold text-slate-300">Live Merchant matching</p>
                  <p className="text-[10px]">References are instantly validated against the institution's designated JUMO profile.</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5 shrink-0" />
                <div>
                  <p className="font-bold text-slate-300">Zero-Overdraft Bounds</p>
                  <p className="text-[10px]">Payment gateway blocks excess collection amounts preventing customer discrepancies.</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5 shrink-0" />
                <div>
                  <p className="font-bold text-slate-300">Commission split ledgering</p>
                  <p className="text-[10px]">Every processed transaction triggers a dual ledger entry accounting for the 1.5% switch clearing fee.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Generate Reference Modal */}
      {showAddRefModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
              <h3 className="font-bold text-base">Generate Payment Reference</h3>
              <button onClick={() => setShowAddRefModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateReference} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Reference / PRN Code</label>
                <input 
                  type="text"
                  placeholder="e.g. REF-10029-X"
                  value={newRefCode}
                  onChange={(e) => setNewRefCode(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Payer ID</label>
                  <input 
                    type="text"
                    placeholder="e.g. REG-001"
                    value={payerId}
                    onChange={(e) => setPayerId(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Institution Code</label>
                  <select 
                    value={institutionCode}
                    onChange={(e) => setInstitutionCode(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="ALPHA">Sovereign Academy Primary</option>
                    <option value="IUIU">Sovereign University</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Payer Full Name</label>
                <input 
                  type="text"
                  placeholder="e.g. Joshua Mugabi"
                  value={payerName}
                  onChange={(e) => setPayerName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Outstanding Fee (UGX)</label>
                <input 
                  type="number"
                  placeholder="0"
                  value={amount || ''}
                  onChange={(e) => setAmount(Math.max(0, Number(e.target.value) || 0))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm font-mono text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button 
                  type="button" 
                  onClick={() => setShowAddRefModal(false)}
                  className="bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-xl text-xs font-bold hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-blue-700"
                >
                  Post Reference
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Payment Processing Modal */}
      {showPayModal && resolvedRef && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
              <h3 className="font-bold text-base">Authorize PRN Collection</h3>
              <button onClick={() => setShowPayModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleProcessPayment} className="p-6 space-y-4">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-1">
                <p className="text-[10px] font-bold text-slate-400 uppercase">Debtor / Payer</p>
                <p className="text-sm font-bold text-slate-900">{resolvedRef.payerName}</p>
                <p className="text-xs text-slate-500 font-mono">Reference: {resolvedRef.reference}</p>
                <div className="flex justify-between pt-2 border-t border-slate-200 mt-2">
                  <span className="text-xs text-slate-500">Total Outstanding</span>
                  <span className="text-xs font-bold font-mono text-rose-600">{resolvedRef.balanceDue.toLocaleString()} UGX</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Payment Method Channel</label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'MOBILE_MONEY', label: 'Mobile Money', icon: Smartphone },
                    { id: 'CARD', label: 'Visa / Card', icon: CreditCard },
                    { id: 'BANK_TRANSFER', label: 'Bank Transfer', icon: Landmark },
                  ].map((chan) => (
                    <button
                      key={chan.id}
                      type="button"
                      onClick={() => setPaymentChannel(chan.id as any)}
                      className={`flex items-center gap-2 p-3 rounded-xl border text-left transition-all ${
                        paymentChannel === chan.id 
                          ? 'border-blue-600 bg-blue-50 text-blue-800 font-bold' 
                          : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <chan.icon className="w-4 h-4 text-blue-600 shrink-0" />
                      <span className="text-xs">{chan.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Collection Amount (UGX)</label>
                <input 
                  type="number"
                  value={paymentAmount || ''}
                  onChange={(e) => setPaymentAmount(Math.min(resolvedRef.balanceDue, Math.max(0, Number(e.target.value) || 0)))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm font-mono text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button 
                  type="button" 
                  onClick={() => setShowPayModal(false)}
                  className="bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-xl text-xs font-bold hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="bg-[#2ca01c] text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-emerald-700"
                >
                  Post Payment Success
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
