import React, { useState } from 'react';

export const NacobaMemberPortal: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'subscription' | 'events'>('overview');

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center sticky top-0 z-10">
        <div>
          <h1 className="text-xl font-bold text-slate-900">NACOBA Portal</h1>
          <p className="text-xs text-slate-500 uppercase tracking-wider">Namilyango College Old Boys Association</p>
        </div>
        <div className="flex items-center space-x-4">
          <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full border border-green-200">Active Member</span>
          <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center text-slate-600 font-bold border border-slate-300">
            JD
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Sidebar */}
        <aside className="md:col-span-1">
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm mb-6">
            <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">My Profile</h3>
            <div className="space-y-2 text-sm">
              <p><span className="text-slate-500">Cohort:</span> <span className="font-medium text-slate-900">Class of 2012</span></p>
              <p><span className="text-slate-500">House:</span> <span className="font-medium text-slate-900">Biikira House</span></p>
              <p><span className="text-slate-500">Chapter:</span> <span className="font-medium text-slate-900">Kampala Central</span></p>
            </div>
          </div>

          <nav className="space-y-1">
            <button 
              onClick={() => setActiveTab('overview')}
              className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeTab === 'overview' ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-slate-100'}`}
            >
              Overview
            </button>
            <button 
              onClick={() => setActiveTab('subscription')}
              className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeTab === 'subscription' ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-slate-100'}`}
            >
              Annual Subscriptions
            </button>
            <button 
              onClick={() => setActiveTab('events')}
              className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeTab === 'events' ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-slate-100'}`}
            >
              AGM & Events Ticketing
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="md:col-span-3">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-slate-900 mb-2">Welcome back, John</h2>
                <p className="text-sm text-slate-600 mb-6">PROVENANCE: SOURCE-OBSERVED (NACOBA Public Portal Reconstruction)</p>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-orange-50 rounded-lg border border-orange-100">
                    <h4 className="text-sm font-medium text-orange-800">Subscription Status</h4>
                    <p className="text-2xl font-bold text-orange-600 mt-1">UGX 50,000 <span className="text-sm font-normal">Arrears</span></p>
                    <button onClick={() => setActiveTab('subscription')} className="mt-3 text-xs font-semibold text-orange-700 underline">Settle now &rarr;</button>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                    <h4 className="text-sm font-medium text-blue-800">Upcoming Event</h4>
                    <p className="text-lg font-bold text-blue-900 mt-1">Annual General Meeting 2026</p>
                    <p className="text-xs text-blue-700 mt-1">March 14, Namilyango College Main Hall</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'subscription' && (
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="px-6 py-5 border-b border-slate-100 bg-slate-50">
                <h2 className="text-lg font-semibold text-slate-900">Subscription Ledger</h2>
                <p className="text-sm text-slate-500">Track your annual NACOBA contributions</p>
              </div>
              <div className="p-6">
                <table className="w-full text-left text-sm">
                  <thead className="text-slate-500 border-b border-slate-200">
                    <tr>
                      <th className="pb-3 font-medium">Year</th>
                      <th className="pb-3 font-medium">Amount</th>
                      <th className="pb-3 font-medium">Status</th>
                      <th className="pb-3 font-medium text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr>
                      <td className="py-4 font-medium text-slate-900">2026</td>
                      <td className="py-4 text-slate-600">UGX 50,000</td>
                      <td className="py-4"><span className="px-2 py-1 bg-yellow-50 text-yellow-700 rounded text-xs font-medium border border-yellow-200">Pending</span></td>
                      <td className="py-4 text-right">
                        <button className="px-3 py-1.5 bg-blue-600 text-white rounded-md text-xs font-medium hover:bg-blue-700">Pay via MoMo</button>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-4 font-medium text-slate-900">2025</td>
                      <td className="py-4 text-slate-600">UGX 50,000</td>
                      <td className="py-4"><span className="px-2 py-1 bg-green-50 text-green-700 rounded text-xs font-medium border border-green-200">Cleared</span></td>
                      <td className="py-4 text-right text-slate-400 text-xs">Receipt #1094</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
