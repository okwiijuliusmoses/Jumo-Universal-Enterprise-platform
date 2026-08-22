import React, { useState } from 'react';
import { 
  Baby, HeartPulse, Sparkles, BookOpen, ShieldCheck, DollarSign, 
  Users, CheckCircle2, Award, Calendar, Clock, Plus, Search, Filter, Download
} from 'lucide-react';
import { PortalAuthenticationGate } from '../../../PortalAuthenticationGate';

export const NurseryAdminPortal: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'REGISTER' | 'GUARDIANS' | 'CLASSES' | 'FEES'>('REGISTER');

  const infants = [
    { id: 'NUR-2026-001', name: 'Liam Kiggundu', age: '3 yrs 2 mos', class: 'Baby Class A', guardian: 'Sarah Kiggundu', contact: '+256 701 445522', status: 'PRESENT', feeStatus: 'PAID_FAAP' },
    { id: 'NUR-2026-002', name: 'Maya Nsubuga', age: '4 yrs 1 mo', class: 'Middle Class B', guardian: 'Eng. David Nsubuga', contact: '+256 772 889911', status: 'PRESENT', feeStatus: 'PAID_FAAP' },
    { id: 'NUR-2026-003', name: 'Ethan Musoke', age: '5 yrs 0 mos', class: 'Top Class A', guardian: 'Dr. Rita Musoke', contact: '+256 752 334411', status: 'PRESENT', feeStatus: 'PARTIAL' }
  ];

  return (
    <PortalAuthenticationGate
      portalId="nursery-admin"
      portalName="Nursery Administration & Infant Enrollment Office"
      domainContext="JUMO-SCHOOL-ERP"
      requiredRoles={['ROLE_NURSERY_ADMIN', 'ROLE_SCHOOL_ADMIN', 'ROLE_HEADTEACHER']}
      onAuthenticated={() => {}}
    >
      <div className="space-y-6 animate-in fade-in duration-300 pb-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Nursery & Pre-Primary Administration</h1>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-pink-100 text-pink-800 border border-pink-300 uppercase">
                ECD Sovereign Core
              </span>
            </div>
            <p className="text-slate-500 text-xs mt-1">
              Early Childhood Development (ECD) learner registration, guardian pickup authorizations, teacher allocations & nursery fees.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={() => alert('Registering new toddler/infant...')}
              className="flex items-center gap-1.5 px-4 py-2 bg-pink-600 hover:bg-pink-700 text-white rounded-xl text-xs font-bold shadow-xs transition cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Register Toddler</span>
            </button>
          </div>
        </div>

        {/* Nursery KPI Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Enrolled Toddlers</span>
            <p className="text-2xl font-black text-slate-900 mt-1 font-mono">142 Learners</p>
            <p className="text-[11px] text-pink-600 font-bold mt-1">Baby, Middle & Top Classes</p>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Today's Attendance</span>
            <p className="text-2xl font-black text-emerald-600 mt-1 font-mono">98.5%</p>
            <p className="text-[11px] text-slate-500 mt-1">140 Present / 2 Excused Sick</p>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Nursery Fee Collections</span>
            <p className="text-2xl font-black text-slate-900 mt-1 font-mono">85,200,000 UGX</p>
            <p className="text-[11px] text-emerald-600 font-bold mt-1">Direct FAAP Cashbook Synced</p>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Active ECD Caregivers</span>
            <p className="text-2xl font-black text-purple-700 mt-1 font-mono">12 Caregivers</p>
            <p className="text-[11px] text-slate-500 mt-1">1:12 Caregiver-to-Child Ratio</p>
          </div>
        </div>

        {/* Toddler Roster Table */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-2xs overflow-hidden">
          <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
            <h3 className="font-bold text-slate-800 text-sm">Learner Register & Guardian Contacts</h3>
            <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              FAAP Fee Ledger Linked
            </span>
          </div>

          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] tracking-widest border-b border-slate-100">
              <tr>
                <th className="px-6 py-4">Reg Code</th>
                <th className="px-6 py-4">Learner Name</th>
                <th className="px-6 py-4">Age / Stage</th>
                <th className="px-6 py-4">Nursery Class</th>
                <th className="px-6 py-4">Primary Guardian</th>
                <th className="px-6 py-4 text-center">FAAP Fee Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {infants.map(i => (
                <tr key={i.id} className="hover:bg-slate-50 transition">
                  <td className="px-6 py-4 font-mono font-bold text-slate-800 text-xs">{i.id}</td>
                  <td className="px-6 py-4 font-bold text-slate-900">{i.name}</td>
                  <td className="px-6 py-4 text-slate-600">{i.age}</td>
                  <td className="px-6 py-4 font-sans text-xs font-semibold text-slate-700">{i.class}</td>
                  <td className="px-6 py-4 text-slate-700">{i.guardian} <span className="text-[10px] text-slate-400 block">{i.contact}</span></td>
                  <td className="px-6 py-4 text-center">
                    <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 text-[10px] font-black rounded-full uppercase">
                      {i.feeStatus}
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

export const NurseryEcdMilestonesPortal: React.FC = () => {
  return (
    <PortalAuthenticationGate
      portalId="nursery-ecd"
      portalName="ECD Developmental Milestones & Safeguarding Console"
      domainContext="JUMO-SCHOOL-ERP"
      requiredRoles={['ROLE_NURSERY_ADMIN', 'ROLE_HEADTEACHER', 'ROLE_SCHOOL_ADMIN']}
      onAuthenticated={() => {}}
    >
      <div className="bg-white border border-slate-200 rounded-2xl p-8 space-y-6 animate-in fade-in duration-300">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <Baby className="w-8 h-8 text-pink-600" />
          <div>
            <h2 className="text-xl font-bold text-slate-900">ECD Early Learning & Developmental Tracking</h2>
            <p className="text-xs text-slate-500">Motor skills, language acquisition, social interactions, nutrition & health logs.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 bg-pink-50/50 border border-pink-200 rounded-2xl space-y-2">
            <h3 className="font-bold text-slate-900 text-sm">Fine & Gross Motor Skills</h3>
            <p className="text-xs text-slate-600">Drawing, building blocks, outdoor play coordination tracking.</p>
            <span className="inline-block px-2 py-0.5 bg-pink-100 text-pink-800 font-bold text-[10px] rounded">94% Target Achieved</span>
          </div>

          <div className="p-5 bg-purple-50/50 border border-purple-200 rounded-2xl space-y-2">
            <h3 className="font-bold text-slate-900 text-sm">Phonics & Early Language</h3>
            <p className="text-xs text-slate-600">Sound recognition, story listening, vocabulary expansion.</p>
            <span className="inline-block px-2 py-0.5 bg-purple-100 text-purple-800 font-bold text-[10px] rounded">91% Target Achieved</span>
          </div>

          <div className="p-5 bg-emerald-50/50 border border-emerald-200 rounded-2xl space-y-2">
            <h3 className="font-bold text-slate-900 text-sm">Health, Diets & Safeguarding</h3>
            <p className="text-xs text-slate-600">Immunization checks, allergy logs, authorized pickup security.</p>
            <span className="inline-block px-2 py-0.5 bg-emerald-100 text-emerald-800 font-bold text-[10px] rounded">100% Safeguarding Verified</span>
          </div>
        </div>
      </div>
    </PortalAuthenticationGate>
  );
};
