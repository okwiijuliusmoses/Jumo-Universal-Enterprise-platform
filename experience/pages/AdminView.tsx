/**
 * JUMO UEOS — Authoritative Institutional Admin Center
 * Microsoft 365 / Google Cloud enterprise aesthetic
 */

import React, { useState } from 'react';
import { Shield, Users, Settings, Activity, Building2, Lock, Key, Sliders, ExternalLink, Search, Plus } from 'lucide-react';
import { EnterpriseLogo } from '../../src/components/EnterpriseLogo';

export const AdminView: React.FC<{ onNavigate?: (route: string) => void }> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'users' | 'roles' | 'policies' | 'audit'>('users');
  const [searchQuery, setSearchQuery] = useState('');

  const mockUsers = [
    { id: '1', name: 'Dr. Julius Moses Okwii', email: 'owner@jumo.eu', role: 'SOVEREIGN_OWNER', status: 'ACTIVE', mfa: 'RING_0_HARDWARE' },
    { id: '2', name: 'Sarah Kintu', email: 'admin@finbank.com', role: 'TENANT_ADMIN', status: 'ACTIVE', mfa: 'AUTHENTICATOR' },
    { id: '3', name: 'David Mukasa', email: 'finance@makerere.edu', role: 'FINANCE_AUDITOR', status: 'ACTIVE', mfa: 'AUTHENTICATOR' },
    { id: '4', name: 'Grace Nakato', email: 'clerk@church.org', role: 'OPERATIONS_CLERK', status: 'ACTIVE', mfa: 'SMS_OTP' },
  ];

  return (
    <div className="p-8 bg-slate-50 min-h-screen text-slate-900 font-sans">
      <div className="max-w-7xl mx-auto space-y-6">
        <header className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <EnterpriseLogo size="md" variant="blue" showText={false} />
            <div>
              <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
                Institutional Admin Center
                <span className="px-2 py-0.5 bg-blue-50 text-blue-700 font-mono text-[11px] font-semibold rounded border border-blue-200">
                  Tenant Governance
                </span>
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">Sovereign Tenant Administration, Zero-Trust RBAC & ABAC Policy Management</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => onNavigate && onNavigate('/operations-center')}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition shadow-xs flex items-center gap-1.5"
            >
              Master Control Center <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
            <div className="text-xs font-bold text-slate-500 uppercase">Total Active Identities</div>
            <div className="text-2xl font-black text-slate-900 mt-1">1,420 Users</div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
            <div className="text-xs font-bold text-slate-500 uppercase">Zero-Trust Policies</div>
            <div className="text-2xl font-black text-slate-900 mt-1">380 Enforced</div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
            <div className="text-xs font-bold text-slate-500 uppercase">Hardware MFA Gate</div>
            <div className="text-2xl font-black text-emerald-600 mt-1">100% Compliant</div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
            <div className="text-xs font-bold text-slate-500 uppercase">Tenant Partitions</div>
            <div className="text-2xl font-black text-blue-600 mt-1">84 Organizations</div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="border-b border-slate-200 px-6 py-4 flex items-center justify-between">
            <div className="flex gap-2">
              {(['users', 'roles', 'policies', 'audit'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition ${
                    activeTab === tab 
                      ? 'bg-blue-600 text-white shadow-2xs' 
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {tab.toUpperCase()}
                </button>
              ))}
            </div>
            <div className="relative">
              <Search className="w-4 h-4 text-slate-600 absolute left-3 top-2.5" />
              <input 
                type="text"
                placeholder="Search identities..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs w-64 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="p-6">
            {activeTab === 'users' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-sm text-slate-900">Sovereign Tenant User Directory</h3>
                  <button onClick={() => alert('Add User Form: Please use Settings Center -> User Administration to provision Ring-0 identities.')} className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold flex items-center gap-1">
                    <Plus className="w-3.5 h-3.5" /> Provision Identity
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase">
                        <th className="py-3 px-4">User Identity</th>
                        <th className="py-3 px-4">Email Address</th>
                        <th className="py-3 px-4">RBAC Role</th>
                        <th className="py-3 px-4">MFA Security Gate</th>
                        <th className="py-3 px-4">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-xs">
                      {mockUsers.filter(u => u.name.toLowerCase().includes(searchQuery.toLowerCase()) || u.email.toLowerCase().includes(searchQuery.toLowerCase())).map((u) => (
                        <tr key={u.id} className="hover:bg-slate-50">
                          <td className="py-3 px-4 font-bold text-slate-900">{u.name}</td>
                          <td className="py-3 px-4 font-mono text-slate-600">{u.email}</td>
                          <td className="py-3 px-4">
                            <span className="px-2 py-0.5 bg-blue-50 text-blue-700 font-mono text-[10px] font-bold rounded">
                              {u.role}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <span className="px-2 py-0.5 bg-purple-50 text-purple-700 font-mono text-[10px] font-bold rounded">
                              {u.mfa}
                            </span>
                          </td>
                          <td className="py-3 px-4 font-bold text-emerald-600">
                            <span className="inline-flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> {u.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab !== 'users' && (
              <div className="text-center py-12 text-slate-500 space-y-2">
                <Shield className="w-10 h-10 text-blue-600 mx-auto" />
                <div className="font-bold text-sm text-slate-800">Governance Partition Active</div>
                <p className="text-xs max-w-md mx-auto">This section is dynamically governed by the JUMO UEOS Control Center. Switch to the Master Control Center to inspect live ABAC policy rules and audit streams.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminView;
