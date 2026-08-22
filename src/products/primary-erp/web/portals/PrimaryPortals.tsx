import React, { useState, useEffect } from 'react';
import { 
  Users, BookOpen, Calculator, Plus, Search, 
  Filter, Download, DollarSign, TrendingUp, X
} from 'lucide-react';
import { PortalAuthenticationGate } from '../../../PortalAuthenticationGate';
import { PrimaryService, PrimaryPupil } from '../../domain/PrimaryService';

export const PrimaryAdminPortal: React.FC = () => {
  const service = PrimaryService.getInstance();
  const [pupils, setPupils] = useState<PrimaryPupil[]>(service.getPupils());
  const [showModal, setShowModal] = useState(false);
  const [showPayModal, setShowPayModal] = useState(false);
  const [selectedPupil, setSelectedPupil] = useState<PrimaryPupil | null>(null);

  // Form State
  const [name, setName] = useState('');
  const [pupilClass, setPupilClass] = useState('Primary One');
  const [guardian, setGuardian] = useState('');
  const [payAmount, setPayAmount] = useState<number>(0);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    service.registerPupil({ name, class: pupilClass, guardian });
    setPupils([...service.getPupils()]);
    setShowModal(false);
    setName('');
  };

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedPupil && payAmount > 0) {
      service.collectFee(selectedPupil.id, payAmount, 'Tuition');
      setPupils([...service.getPupils()]);
      setShowPayModal(false);
      setSelectedPupil(null);
      setPayAmount(0);
    }
  };

  return (
    <PortalAuthenticationGate
      portalId="primary-admin"
      portalName="Primary Administration & PLE Registration Office"
      domainContext="JUMO-SCHOOL-ERP"
      requiredRoles={['ROLE_PRIMARY_ADMIN', 'ROLE_HEADTEACHER', 'ROLE_SCHOOL_ADMIN']}
      onAuthenticated={() => {}}
    >
      <div className="space-y-6 animate-in fade-in duration-300 pb-12">
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Primary Education Administration</h1>
            <p className="text-xs text-slate-500">Pupil enrollment, PLE center management, and fee collection tracking.</p>
          </div>
          <button 
            onClick={() => setShowModal(true)}
            className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold hover:bg-emerald-700 transition"
          >
            Enroll Pupil
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Pupils</span>
            <p className="text-2xl font-black text-slate-900 mt-1 font-mono">{pupils.length}</p>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">PLE Candidates</span>
            <p className="text-2xl font-black text-blue-600 mt-1 font-mono">
              {pupils.filter(p => p.class === 'Primary Seven').length}
            </p>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Outstanding</span>
            <p className="text-2xl font-black text-rose-600 mt-1 font-mono">
              {pupils.reduce((acc, p) => acc + p.feeBalance, 0).toLocaleString()} UGX
            </p>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl shadow-2xs overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] tracking-widest border-b border-slate-100">
              <tr>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Class</th>
                <th className="px-6 py-4">Guardian</th>
                <th className="px-6 py-4 text-right">Balance</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {pupils.map(p => (
                <tr key={p.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 font-bold text-slate-900">{p.name}</td>
                  <td className="px-6 py-4 text-slate-600">{p.class}</td>
                  <td className="px-6 py-4 text-slate-600">{p.guardian}</td>
                  <td className="px-6 py-4 text-right font-mono font-bold text-rose-600">{p.feeBalance.toLocaleString()} UGX</td>
                  <td className="px-6 py-4 text-center">
                    <button 
                      onClick={() => { setSelectedPupil(p); setShowPayModal(true); }}
                      className="text-[10px] font-black text-emerald-600 uppercase tracking-widest"
                    >
                      Collect
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {showModal && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-slate-900">New Pupil Enrollment</h3>
                <button onClick={() => setShowModal(false)}><X className="w-5 h-5" /></button>
              </div>
              <form onSubmit={handleRegister} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">Full Name</label>
                  <input value={name} onChange={e => setName(e.target.value)} required className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1">Class</label>
                    <select value={pupilClass} onChange={e => setPupilClass(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm">
                      {['Primary One', 'Primary Two', 'Primary Three', 'Primary Four', 'Primary Five', 'Primary Six', 'Primary Seven'].map(c => (
                        <option key={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1">Guardian</label>
                    <input value={guardian} onChange={e => setGuardian(e.target.value)} required className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm" />
                  </div>
                </div>
                <button type="submit" className="w-full py-3 bg-emerald-600 text-white rounded-xl font-bold text-sm">Register Pupil</button>
              </form>
            </div>
          </div>
        )}

        {showPayModal && selectedPupil && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-slate-900">Collect Fee — {selectedPupil.name}</h3>
                <button onClick={() => setShowPayModal(false)}><X className="w-5 h-5" /></button>
              </div>
              <form onSubmit={handlePayment} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">Amount (UGX)</label>
                  <input type="number" value={payAmount || ''} onChange={e => setPayAmount(Number(e.target.value))} required className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm font-mono font-bold" />
                </div>
                <button type="submit" className="w-full py-3 bg-emerald-600 text-white rounded-xl font-bold text-sm">Post to FAAP</button>
              </form>
            </div>
          </div>
        )}
      </div>
    </PortalAuthenticationGate>
  );
};
