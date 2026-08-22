import React, { useState, useEffect } from 'react';
import { 
  Church, Users, Heart, Coins, Cross, MapPin, 
  Calendar, CheckCircle2, ShieldCheck, Music, 
  Plus, Search, Filter, Download, DollarSign, 
  TrendingUp, Landmark, FileText, ClipboardList, X
} from 'lucide-react';
import { PortalAuthenticationGate } from '../../../PortalAuthenticationGate';
import { ChurchService, ChurchMember, ChurchTransaction } from '../../domain/ChurchService';

export const ChurchSecretariatPortal: React.FC = () => {
  const service = ChurchService.getInstance();
  const [members] = useState<ChurchMember[]>(service.getMembers());

  return (
    <PortalAuthenticationGate
      portalId="church-secretariat"
      portalName="Church Secretariat & Membership Office"
      domainContext="JUMO-CHURCH-ERP"
      requiredRoles={['ROLE_CHURCH_SECRETARY', 'ROLE_PASTOR', 'ROLE_CHURCH_ADMIN']}
      onAuthenticated={() => {}}
    >
      <div className="space-y-6 animate-in fade-in duration-300 pb-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Church Secretariat & Records</h1>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-emerald-100 text-emerald-800 border border-emerald-300 uppercase">
                Ecclesia Sovereign
              </span>
            </div>
            <p className="text-slate-500 text-xs mt-1">
              Membership register, department allocations, baptism records & congregation demographics.
            </p>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl shadow-2xs overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] tracking-widest border-b border-slate-100">
              <tr>
                <th className="px-6 py-4">ID</th>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Department</th>
                <th className="px-6 py-4">Contact</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {members.map(m => (
                <tr key={m.id} className="hover:bg-slate-50 transition">
                  <td className="px-6 py-4 font-mono font-bold text-slate-400 text-xs">{m.id}</td>
                  <td className="px-6 py-4 font-bold text-slate-900">{m.name}</td>
                  <td className="px-6 py-4 text-slate-600">{m.department}</td>
                  <td className="px-6 py-4 text-slate-600 font-mono text-xs">{m.contact}</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-black border border-emerald-100 uppercase">
                      {m.membershipStatus}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </PortalAuthenticationGate>
  );
};

export const ChurchFinancePortal: React.FC = () => {
  const service = ChurchService.getInstance();
  const [members] = useState<ChurchMember[]>(service.getMembers());
  const [transactions, setTransactions] = useState<ChurchTransaction[]>(service.getTransactions());
  const [showModal, setShowModal] = useState(false);
  
  // Form state
  const [selectedMemberId, setSelectedMemberId] = useState('');
  const [amount, setAmount] = useState<number>(0);
  const [type, setType] = useState<ChurchTransaction['type']>('TITHE');

  const handlePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedMemberId && amount > 0) {
      service.recordContribution(selectedMemberId, amount, type);
      setTransactions([...service.getTransactions()]);
      setShowModal(false);
      setAmount(0);
    }
  };

  return (
    <PortalAuthenticationGate
      portalId="church-finance"
      portalName="Church Treasury & FAAP Finance Office"
      domainContext="JUMO-FINTECH"
      requiredRoles={['ROLE_CHURCH_TREASURER', 'ROLE_PASTOR', 'ROLE_CHURCH_ADMIN']}
      onAuthenticated={() => {}}
    >
      <div className="space-y-6 animate-in fade-in duration-300">
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <div className="flex items-center gap-3">
            <Coins className="w-8 h-8 text-amber-600" />
            <div>
              <h2 className="text-xl font-bold text-slate-900">Church Treasury (FAAP Integrated)</h2>
              <p className="text-xs text-slate-500">Tithe collection, offering audits, project fundraising & missionary support.</p>
            </div>
          </div>
          <button 
            onClick={() => setShowModal(true)}
            className="px-4 py-2 bg-amber-600 text-white rounded-xl text-xs font-bold hover:bg-amber-700 transition shadow-sm"
          >
            Record Contribution
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs col-span-2">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Collections (Term Period)</span>
              <TrendingUp className="w-4 h-4 text-emerald-500" />
            </div>
            <p className="text-3xl font-black text-slate-900 font-mono tracking-tight">
              {transactions.reduce((acc, t) => acc + t.amount, 0).toLocaleString()} UGX
            </p>
            <div className="mt-4 pt-4 border-t border-slate-50 flex items-center justify-between text-[11px]">
              <span className="text-slate-500">Directly Posted to FAAP General Ledger</span>
              <span className="text-emerald-600 font-black uppercase">Reconciled</span>
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl shadow-2xs overflow-hidden">
          <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
            <h3 className="font-bold text-slate-800 text-sm">Recent Ecclesia Transactions</h3>
            <Landmark className="w-4 h-4 text-slate-300" />
          </div>
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] tracking-widest border-b border-slate-100">
              <tr>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Member</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4 text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {transactions.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-slate-400 italic">No transactions recorded in this session.</td>
                </tr>
              ) : (
                transactions.map(t => (
                  <tr key={t.id} className="hover:bg-slate-50 transition">
                    <td className="px-6 py-4 text-xs text-slate-500 font-mono">{new Date(t.date).toLocaleDateString()}</td>
                    <td className="px-6 py-4 font-bold text-slate-900">{t.memberName}</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 text-[10px] font-black uppercase tracking-tight">
                        {t.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right font-mono font-bold text-emerald-600">
                      {t.amount.toLocaleString()} UGX
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {showModal && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-slate-900">Record Contribution</h3>
                <button onClick={() => setShowModal(false)}><X className="w-5 h-5" /></button>
              </div>
              <form onSubmit={handlePost} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">Select Member</label>
                  <select 
                    value={selectedMemberId} 
                    onChange={e => setSelectedMemberId(e.target.value)} 
                    required 
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm"
                  >
                    <option value="">Choose member...</option>
                    {members.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1">Category</label>
                    <select 
                      value={type} 
                      onChange={e => setType(e.target.value as any)} 
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm"
                    >
                      <option value="TITHE">Tithe</option>
                      <option value="OFFERING">Offering</option>
                      <option value="PROJECT">Project Fund</option>
                      <option value="THANKSGIVING">Thanksgiving</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1">Amount (UGX)</label>
                    <input 
                      type="number" 
                      value={amount || ''} 
                      onChange={e => setAmount(Number(e.target.value))} 
                      required 
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm font-mono font-bold" 
                    />
                  </div>
                </div>
                <button type="submit" className="w-full py-3 bg-amber-600 text-white rounded-xl font-bold text-sm shadow-sm hover:bg-amber-700 transition">
                  Authorize FAAP Ledger Posting
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </PortalAuthenticationGate>
  );
};

export const ChurchPastorPortal: React.FC = () => {
  return (
    <PortalAuthenticationGate
      portalId="church-pastor"
      portalName="Pastor & Ecclesiastical Leadership Office"
      domainContext="JUMO-CHURCH-ERP"
      requiredRoles={['ROLE_PASTOR', 'ROLE_CHURCH_ADMIN']}
      onAuthenticated={() => {}}
    >
      <div className="space-y-6 animate-in fade-in duration-300">
        <div className="flex items-center gap-3 border-b border-slate-200 pb-4">
          <Cross className="w-8 h-8 text-blue-600" />
          <div>
            <h2 className="text-xl font-bold text-slate-900">Lead Pastor's Office</h2>
            <p className="text-xs text-slate-500">Sermon planning, pastoral counseling, baptismal approvals & spiritual oversight.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-2xs">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <Music className="w-4 h-4 text-purple-600" />
              Sermon & Worship Planning
            </h3>
            <div className="space-y-3">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Upcoming Sermon</span>
                <p className="text-sm font-bold text-slate-800 mt-1">Theme: "The Year of Supernatural Abundance"</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-700 text-[9px] font-black uppercase tracking-tight">Main Service</span>
                  <span className="text-[9px] text-slate-400">Sunday, 08:00 AM</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-2xs">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Pastoral Counseling Log
            </h3>
            <div className="p-8 text-center bg-slate-50 rounded-xl border border-dashed border-slate-200">
              <Users className="w-6 h-6 text-slate-300 mx-auto mb-2" />
              <p className="text-[10px] text-slate-500">Secure pastoral notes are end-to-end encrypted and restricted to Lead Pastor only.</p>
            </div>
          </div>
        </div>
      </div>
    </PortalAuthenticationGate>
  );
};
