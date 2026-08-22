import React, { useState, useEffect } from 'react';
import { 
  Users, Award, Gift, Calendar, Plus, Search, 
  Filter, Download, DollarSign, TrendingUp, X
} from 'lucide-react';
import { PortalAuthenticationGate } from '../../../PortalAuthenticationGate';
import { AlumniService, AlumniRecord, AlumniDonation } from '../../domain/AlumniService';

export const AlumniRegistryPortal: React.FC = () => {
  const service = AlumniService.getInstance();
  const [alumni] = useState<AlumniRecord[]>(service.getAlumni());

  return (
    <PortalAuthenticationGate
      portalId="alumni-registry"
      portalName="Alumni Registry & Life-Membership Office"
      domainContext="JUMO-ALUMNI-ERP"
      requiredRoles={['ROLE_ALUMNI_OFFICER', 'ROLE_ALUMNI_ADMIN']}
      onAuthenticated={() => {}}
    >
      <div className="space-y-6 animate-in fade-in duration-300 pb-12">
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Alumni Registry</h1>
            <p className="text-xs text-slate-500">Global alumni database, life-membership tracking, and career mentoring networks.</p>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl shadow-2xs overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] tracking-widest border-b border-slate-100">
              <tr>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Graduation</th>
                <th className="px-6 py-4">Profession</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {alumni.map(a => (
                <tr key={a.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 font-bold text-slate-900">{a.name}</td>
                  <td className="px-6 py-4 text-slate-600 font-mono">{a.graduationYear}</td>
                  <td className="px-6 py-4 text-slate-600">{a.currentProfession}</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 text-[10px] font-black uppercase">
                      {a.membershipStatus}
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

export const AlumniDonationPortal: React.FC = () => {
  const service = AlumniService.getInstance();
  const [alumni] = useState<AlumniRecord[]>(service.getAlumni());
  const [donations, setDonations] = useState<AlumniDonation[]>(service.getDonations());
  const [showModal, setShowModal] = useState(false);

  // Form State
  const [selectedAlumniId, setSelectedAlumniId] = useState('');
  const [amount, setAmount] = useState<number>(0);
  const [purpose, setPurpose] = useState<AlumniDonation['purpose']>('ENDOWMENT');

  const handleDonate = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedAlumniId && amount > 0) {
      service.recordDonation(selectedAlumniId, amount, purpose);
      setDonations([...service.getDonations()]);
      setShowModal(false);
      setAmount(0);
    }
  };

  return (
    <PortalAuthenticationGate
      portalId="alumni-donations"
      portalName="Endowments & Alumni Fundraising Office"
      domainContext="JUMO-FINTECH"
      requiredRoles={['ROLE_ALUMNI_TREASURER', 'ROLE_ALUMNI_ADMIN']}
      onAuthenticated={() => {}}
    >
      <div className="space-y-6 animate-in fade-in duration-300">
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Institutional Endowments & Donations</h2>
            <p className="text-xs text-slate-500">Record alumni contributions, infrastructure funds, and bursary endowments.</p>
          </div>
          <button 
            onClick={() => setShowModal(true)}
            className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-700 transition shadow-sm"
          >
            Record Donation
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs col-span-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Endowment Fund</span>
            <p className="text-3xl font-black text-slate-900 font-mono tracking-tight mt-1">
              {donations.reduce((acc, d) => acc + d.amount, 0).toLocaleString()} UGX
            </p>
            <p className="text-[10px] text-emerald-600 font-bold mt-1 uppercase">FAAP Synchronized</p>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl shadow-2xs overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] tracking-widest border-b border-slate-100">
              <tr>
                <th className="px-6 py-4">Alumnus</th>
                <th className="px-6 py-4">Purpose</th>
                <th className="px-6 py-4 text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {donations.map(d => (
                <tr key={d.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 font-bold text-slate-900">{d.alumniName}</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 text-[10px] font-black uppercase">
                      {d.purpose}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right font-mono font-bold text-indigo-600">
                    {d.amount.toLocaleString()} UGX
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {showModal && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-slate-900">Record Alumni Donation</h3>
                <button onClick={() => setShowModal(false)}><X className="w-5 h-5" /></button>
              </div>
              <form onSubmit={handleDonate} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">Select Alumnus</label>
                  <select value={selectedAlumniId} onChange={e => setSelectedAlumniId(e.target.value)} required className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm">
                    <option value="">Choose alumnus...</option>
                    {alumni.map(a => <option key={a.id} value={a.id}>{a.name} ({a.graduationYear})</option>)}
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1">Purpose</label>
                    <select value={purpose} onChange={e => setPurpose(e.target.value as any)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm">
                      <option value="ENDOWMENT">Endowment</option>
                      <option value="INFRASTRUCTURE">Infrastructure</option>
                      <option value="BURSARY">Bursary</option>
                      <option value="GENERAL">General</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1">Amount (UGX)</label>
                    <input type="number" value={amount || ''} onChange={e => setAmount(Number(e.target.value))} required className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm font-mono font-bold" />
                  </div>
                </div>
                <button type="submit" className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold text-sm shadow-sm hover:bg-indigo-700 transition">
                  Authorize Ledger Posting
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </PortalAuthenticationGate>
  );
};
