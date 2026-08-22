/**
 * JUMO UEOS Phase 26 — Sovereign Alumni Network & Endowment Governance Platform
 * Upgraded from ordinary dashboard to an AI-Enterprise Operating System.
 */

import React, { useState } from 'react';
import { Users, DollarSign, Award, BookOpen, Bot, ShieldCheck, QrCode, Sparkles, Globe, CheckCircle2 } from 'lucide-react';

export const AlumniDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'endowment' | 'mentorship' | 'verification'>('overview');
  const [pledgeAmount, setPledgeAmount] = useState('1000');
  const [donors, setDonors] = useState([
    { name: 'Dr. Robert Mukasa', classYear: '1998', tier: 'Benefactor Tier 1', amount: '$25,000.00', method: 'SWIFT ACH' },
    { name: 'Eng. Sarah Kiconco', classYear: '2005', tier: 'Patron Tier 2', amount: '$5,000.00', method: 'M-Pesa Mobile Money' },
    { name: 'Global Tech Chapter Hub', classYear: 'Multi-year', tier: 'Sponsor Tier 1', amount: '$120,000.00', method: 'Wire Transfer' }
  ]);

  return (
    <div className="max-w-7xl mx-auto space-y-6 p-6 bg-slate-50 text-slate-900 min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 rounded-2xl p-6 text-white shadow-md flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-cyan-400/20 text-[#0078D4] border border-cyan-400/30">
            Sovereign Alumni Domain Active
          </span>
          <h1 className="text-2xl font-bold mt-2">National University Alumni Network & Endowment Hub</h1>
          <p className="text-xs text-slate-700">
            Connecting 38,450 verified alumni across 42 global chapter hubs with automated endowment pledge sweeps and AI mentorship matching.
          </p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => alert("Alumni QR Code Check-in & Networking card generated for your Apple/Google Wallet.")}
            className="px-4 py-2 rounded-xl bg-cyan-400 text-slate-950 font-bold text-xs hover:bg-cyan-300 transition-all flex items-center gap-2 shadow-sm"
          >
            <QrCode className="w-4 h-4" /> Digital Alumni ID Card
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex gap-2 border-b border-slate-200 pb-2 overflow-x-auto">
        {[
          { id: 'overview', label: '1. Executive Alumni Dashboard', icon: Users },
          { id: 'endowment', label: '2. Endowment Fund & M-Pesa/SWIFT Pledges', icon: DollarSign },
          { id: 'mentorship', label: '3. AI Student Mentorship Matching', icon: Bot },
          { id: 'verification', label: '4. Degree & Transcript Verification Seal', icon: ShieldCheck }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2.5 rounded-lg text-xs font-bold flex items-center gap-2 transition-all ${
              activeTab === tab.id ? 'bg-blue-600 text-white shadow-sm' : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab 1: Overview */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { label: 'Verified Alumni Souls', value: '38,450', change: '+12% YoY', icon: Users, bg: 'bg-blue-50 text-blue-600' },
              { label: 'Global Chapter Hubs', value: '42 Chapters', change: 'London, Nairobi, NYC', icon: Globe, bg: 'bg-emerald-50 text-emerald-600' },
              { label: 'Endowment Fund Volume', value: '$14.8M USD', change: '100% Tax Deductible', icon: DollarSign, bg: 'bg-blue-50 text-blue-600' },
              { label: 'Active Mentorships', value: '1,420 Pairs', change: 'AI Matched (JUMO AI Engine)', icon: Bot, bg: 'bg-purple-50 text-purple-600' }
            ].map((stat, i) => (
              <div key={i} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xs font-semibold text-slate-500 uppercase">{stat.label}</h3>
                    <p className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</p>
                    <p className="text-xs font-medium text-emerald-600 mt-1">{stat.change}</p>
                  </div>
                  <div className={`w-10 h-10 rounded-lg ${stat.bg} flex items-center justify-center`}>
                    <stat.icon className="w-5 h-5" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 rounded-xl text-white shadow-md">
            <h3 className="text-base font-bold flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#0078D4]" />
              AI Alumni Assistant (JUMO AI Enterprise Engine)
            </h3>
            <p className="text-xs text-slate-700 mt-2 leading-relaxed">
              "Based on Q3 engagement telemetrics, donation likelihood among engineering cohorts from Class of 2010–2015 has increased by 34%. I recommend launching an automated M-Pesa & SWIFT capital campaign targeting renewable energy scholarship endowments."
            </p>
          </div>
        </div>
      )}

      {/* Tab 2: Endowment & Payments */}
      {activeTab === 'endowment' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm md:col-span-1 space-y-4">
            <h3 className="text-base font-bold text-slate-900">Make an Endowment Contribution</h3>
            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Pledge Amount (USD)</label>
                <input 
                  type="number" 
                  value={pledgeAmount} 
                  onChange={e => setPledgeAmount(e.target.value)} 
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 font-mono font-bold"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Payment Gateway</label>
                <select className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white font-medium">
                  <option>📱 M-Pesa Mobile Money (Safaricom)</option>
                  <option>📱 MTN Mobile Money (MoMo API)</option>
                  <option>🏦 SWIFT ACH International Wire</option>
                  <option>💳 Visa / Mastercard Merchant</option>
                </select>
              </div>
              <button 
                onClick={() => alert(`Successfully processed endowment contribution of $${pledgeAmount} via Mobile Money/SWIFT. Tax receipt issued.`)}
                className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg transition-all"
              >
                Authorize Endowment Contribution
              </button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm md:col-span-2 space-y-4">
            <h3 className="text-base font-bold text-slate-900">Recent Sovereign Endowment Benefactors</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b bg-slate-50 text-slate-500">
                    <th className="py-2 px-3">Benefactor Name</th>
                    <th className="py-2 px-3">Class Year</th>
                    <th className="py-2 px-3">Recognition Tier</th>
                    <th className="py-2 px-3">Gateway</th>
                    <th className="py-2 px-3 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {donors.map((d, idx) => (
                    <tr key={idx} className="hover:bg-slate-50">
                      <td className="py-3 px-3 font-bold text-slate-900">{d.name}</td>
                      <td className="py-3 px-3 font-mono">{d.classYear}</td>
                      <td className="py-3 px-3"><span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-medium">{d.tier}</span></td>
                      <td className="py-3 px-3 text-slate-600">{d.method}</td>
                      <td className="py-3 px-3 text-right font-mono font-bold text-emerald-600">{d.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Mentorship */}
      {activeTab === 'mentorship' && (
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Bot className="w-5 h-5 text-purple-600" />
            AI Student-Alumni Mentorship Matching Engine
          </h3>
          <p className="text-xs text-slate-600">
            Our JUMO AI Enterprise Engine neural matcher analyzes career trajectories, academic specializations, and geographic proximity to automatically pair graduating students with executive alumni mentors.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-xl border bg-purple-50/50 space-y-2">
              <span className="text-[10px] font-bold uppercase bg-purple-200 text-purple-900 px-2 py-0.5 rounded">Matched Pair #104</span>
              <p className="text-sm font-bold text-slate-900">Mentor: Eng. David Ochieng (VP of Engineering, London)</p>
              <p className="text-xs text-slate-600">Student Mentee: John Kato (Final Year BSc Electrical Engineering)</p>
              <button onClick={() => alert("Mentorship introduction email and calendar invite dispatched via automated workflow.")} className="px-3 py-1 bg-purple-600 text-white rounded text-xs font-bold">Initiate Introduction</button>
            </div>
            <div className="p-4 rounded-xl border bg-blue-50/50 space-y-2">
              <span className="text-[10px] font-bold uppercase bg-blue-200 text-blue-900 px-2 py-0.5 rounded">Matched Pair #105</span>
              <p className="text-sm font-bold text-slate-900">Mentor: Dr. Grace Nambi (Chief Medical Officer, Nairobi)</p>
              <p className="text-xs text-slate-600">Student Mentee: Sarah Musoke (4th Year MBChB Medical School)</p>
              <button onClick={() => alert("Mentorship introduction email and calendar invite dispatched via automated workflow.")} className="px-3 py-1 bg-blue-600 text-white rounded text-xs font-bold">Initiate Introduction</button>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Verification */}
      {activeTab === 'verification' && (
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4 text-center">
          <ShieldCheck className="w-12 h-12 text-emerald-600 mx-auto" />
          <h3 className="text-lg font-bold text-slate-900">Cryptographic Degree & Transcript Verification Seal</h3>
          <p className="text-xs text-slate-600 max-w-lg mx-auto">
            Employers and academic institutions can instantly verify the authenticity of any university degree, diploma, or transcript using our immutable SHA-256 blockchain seal.
          </p>
          <div className="p-4 rounded bg-white text-emerald-400 font-mono text-xs max-w-xl mx-auto break-all">
            SHA256:8f41e9a2b7c0d38194e6f21a009c814b7e21fa90356149814421b8c001e9a2b1
          </div>
          <button onClick={() => alert("Official university verification seal downloaded as digitally signed PDF.")} className="px-6 py-2.5 bg-emerald-600 text-white font-bold rounded-lg text-xs">
            Download Verification Certificate
          </button>
        </div>
      )}
    </div>
  );
};
