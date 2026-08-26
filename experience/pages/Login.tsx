/**
 * Authoritative Tenant & Institutional Public Login (/login)
 * Standard JUMO Sovereign Enterprise Work/School design without mixing Sovereign Owner credentials.
 */

import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Shield, ArrowRight, AlertCircle, Lock, Building2, UserCheck, HelpCircle } from 'lucide-react';
import { EnterpriseLogo } from '../../src/components/EnterpriseLogo';
import { JUMOEnterpriseHeader } from '../../src/components/JUMOEnterpriseHeader';
import { JUMOEnterpriseFooter } from '../../src/components/JUMOEnterpriseFooter';
import { SovereignPasswordInput } from '../../src/components/SovereignPasswordInput';
import { platformConfig } from '../config/platformConfig';

export const LoginView: React.FC<{ onNavigate: (route: string) => void }> = ({ onNavigate }) => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const user = await login(email, password);
      if (user.role === 'OWNER') {
        onNavigate('/owner');
      } else if (user.role === 'TENANT') {
        onNavigate('/tenant');
      } else if (user.role === 'SECURITY') {
        onNavigate('/security');
      } else {
        onNavigate('/documentation');
      }
    } catch (err: any) {
      setError(err.message || 'Authentication failed. Please verify institutional credentials.');
    } finally {
      setLoading(false);
    }
  };

  const setPreset = (roleEmail: string) => {
    setEmail(roleEmail);
    setPassword('jumo123');
  };

  const [selectedCategory, setSelectedCategory] = useState<string>('universities');

  const institutionCategories = [
    { id: 'schools', name: 'Schools', icon: '🏫', email: 'admin@hillside-school.edu', desc: 'Primary & Secondary Academies' },
    { id: 'universities', name: 'Universities', icon: '🎓', email: 'admin@makerere.edu', desc: 'Universities & Higher Ed' },
    { id: 'hospitals', name: 'Hospitals', icon: '🏥', email: 'director@referralhospital.health', desc: 'Hospitals & Health Centers' },
    { id: 'churches', name: 'Churches', icon: '⛪', email: 'chancellor@archdiocese.org', desc: 'Churches & Faith Dioceses' },
    { id: 'saccos', name: 'SACCOs', icon: '🏦', email: 'manager@sovereignsacco.coop', desc: 'SACCOs & Credit Unions' },
    { id: 'governments', name: 'Governments', icon: '🏛️', email: 'governor@ministry.gov', desc: 'Ministries & Municipalities' },
    { id: 'corporations', name: 'Corporations', icon: '🏢', email: 'tenant@finbank.com', desc: 'Enterprise & Holding Firms' },
    { id: 'hotels', name: 'Hotels', icon: '🏨', email: 'gm@grandresort.com', desc: 'Hotels & Hospitality Chains' },
    { id: 'retail', name: 'Retail', icon: '🛒', email: 'manager@supermarket.com', desc: 'Supermarkets & Stores' },
    { id: 'agriculture', name: 'Agriculture', icon: '🌾', email: 'admin@agricooperative.coop', desc: 'Agribusiness & Cooperatives' },
    { id: 'alumni', name: 'Alumni', icon: '📜', email: 'secretary@alumni.org', desc: 'Alumni Associations' },
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col justify-between font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* Universal Enterprise Header */}
      <JUMOEnterpriseHeader
        onNavigate={onNavigate}
        titleOverride="Institution Login Gateway"
        subtitleOverride="Sovereign Multi-Zone Access Engine"
      />

      {/* Main Sovereign Enterprise Work/School style card */}
      <div className="max-w-xl w-full mx-auto my-auto p-8 bg-white border border-slate-200 rounded-2xl shadow-xl space-y-6">
        <div className="text-center space-y-2 pb-2 border-b border-slate-100">
          <div className="inline-flex p-3 bg-blue-50 text-[#0078D4] rounded-2xl mb-1 shadow-inner border border-blue-100">
            <Building2 className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Institution Login Gateway</h2>
          <p className="text-xs text-slate-500">Sign in to your isolated institutional workspace environment</p>
        </div>

        {/* Institution Type Selector Grid */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-700 block">Select Institution Category</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
            {institutionCategories.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => {
                    setSelectedCategory(cat.id);
                    setPreset(cat.email);
                  }}
                  className={`p-2 rounded-xl border text-left transition flex items-center gap-2 cursor-pointer ${
                    isSelected
                      ? 'bg-blue-50 border-blue-600 text-blue-900 font-bold shadow-xs'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <span className="text-base">{cat.icon}</span>
                  <div className="truncate">
                    <div className="text-xs font-extrabold truncate">{cat.name}</div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700 block">Organizational Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. user@finbank.com or admin@makerere.edu"
              required
              className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-[#0078D4] focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all font-mono"
            />
          </div>

          <div className="space-y-1">
            <div className="flex justify-between items-center mb-1">
              <span className="text-[11px] text-[#0078D4] font-semibold">Institutional Security Token</span>
              <a href="#help" onClick={(e) => { e.preventDefault(); alert('Please contact institutional IT helpdesk: support@jumo.ug'); }} className="text-[11px] text-[#0078D4] hover:underline">Forgot password?</a>
            </div>
            <SovereignPasswordInput
              value={password}
              onChange={setPassword}
              label="Password / Token"
              placeholder="••••••••••••"
              required
              showStrength={true}
              showValidation={false}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-[#0078D4] hover:bg-[#005a9e] text-white font-bold text-sm rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 uppercase tracking-wide"
          >
            {loading ? 'Verifying Identity...' : 'Sign In to Workspace →'}
          </button>
        </form>

        {/* Institutional Enterprise Credentials (Tenants Only) */}
        <div className="pt-4 border-t border-slate-100 space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-600 font-medium">
            <span>Institutional Enterprise Credentials</span>
            <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-mono">TENANTS ONLY</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setPreset('tenant@finbank.com')}
              className="p-2.5 bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 rounded-xl text-xs text-slate-700 transition-all text-left flex flex-col"
            >
              <span className="font-bold text-[#0078D4]">Commercial Bank</span>
              <span className="text-[10px] text-slate-500 font-mono truncate">tenant@finbank.com</span>
            </button>
            <button
              type="button"
              onClick={() => setPreset('admin@makerere.edu')}
              className="p-2.5 bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 rounded-xl text-xs text-slate-700 transition-all text-left flex flex-col"
            >
              <span className="font-bold text-emerald-600">University Admin</span>
              <span className="text-[10px] text-slate-500 font-mono truncate">admin@makerere.edu</span>
            </button>
          </div>
        </div>

        {/* Independent Owner Access Separation Link */}
        <div className="pt-4 border-t border-slate-200 text-center">
          <button
            type="button"
            onClick={() => onNavigate('/owner-login')}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-white hover:bg-white text-[#0078D4] rounded-xl text-xs font-mono font-bold transition-all shadow-sm"
          >
            <Lock className="w-3.5 h-3.5 text-[#0078D4]" />
            <span>🔒 Sovereign Platform Owner Portal →</span>
          </button>
        </div>
      </div>

      {/* Official Universal Enterprise Footer */}
      <JUMOEnterpriseFooter />
    </div>
  );
};

