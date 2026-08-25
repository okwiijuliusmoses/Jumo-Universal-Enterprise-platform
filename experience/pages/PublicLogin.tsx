/**
 * Authoritative Public Portal Login (/public-login or /public/login)
 * Standard JUMO Sovereign Enterprise Public Citizen & Customer access gateway.
 */

import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Shield, ArrowRight, AlertCircle, Lock, Globe, UserCheck, HelpCircle } from 'lucide-react';
import { JUMOEnterpriseHeader } from '../../src/components/JUMOEnterpriseHeader';
import { JUMOEnterpriseFooter } from '../../src/components/JUMOEnterpriseFooter';
import { SovereignPasswordInput } from '../../src/components/SovereignPasswordInput';
import { platformConfig } from '../config/platformConfig';

export const PublicLoginView: React.FC<{ onNavigate: (route: string) => void }> = ({ onNavigate }) => {
  const { login } = useAuth();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!identifier || !password) {
      setError('Please provide your citizen email, phone number, or National ID and password.');
      return;
    }

    setLoading(true);
    try {
      // Login as user or fallback citizen
      await login(identifier, password);
      onNavigate('/public');
    } catch (err: any) {
      setError(err.message || 'Authentication failed. Please verify your public portal credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col justify-between font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* Universal Enterprise Header */}
      <JUMOEnterpriseHeader
        onNavigate={onNavigate}
        titleOverride="Public Portal Login"
        subtitleOverride="Citizen & Public Customer Access"
      />

      {/* Main Sovereign Public Login Card */}
      <div className="max-w-md w-full mx-auto my-auto p-8 bg-white border border-slate-200 rounded-2xl shadow-xl space-y-6">
        <div className="text-center space-y-2 pb-2 border-b border-slate-100">
          <div className="inline-flex p-3 bg-cyan-50 text-cyan-700 rounded-2xl mb-1 shadow-inner border border-cyan-100">
            <Globe className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Public Portal Login</h2>
          <p className="text-xs text-slate-500">Access citizen services, student portals, healthcare appointments, and public registries</p>
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 block">
              Citizen ID / Email / Phone Number
            </label>
            <input
              type="text"
              required
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder="e.g. citizen@jumo.eu or +256700000000"
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between items-center mb-1">
              <span className="text-[11px] font-bold text-blue-600">Secure Citizen Password / PIN</span>
              <a href="#forgot" onClick={(e) => { e.preventDefault(); alert("Please contact the National Registry or JUMO Helpdesk for credential recovery."); }} className="text-[11px] text-blue-600 hover:underline">
                Forgot password?
              </a>
            </div>
            <SovereignPasswordInput
              value={password}
              onChange={setPassword}
              label="Password / Secure PIN"
              placeholder="••••••••••••"
              required
              showStrength={true}
              showValidation={false}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl text-xs font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <span>Authenticating...</span>
            ) : (
              <>
                <span>Sign In to Public Portal</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-[11px] text-slate-600 space-y-1">
          <div className="font-bold text-slate-800 flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-emerald-600" />
            <span>Sovereign Public Portal Access</span>
          </div>
          <p className="text-[10px] leading-relaxed">
            All public citizen logins are secured by JUMO UEOS Level 4 hardware encryption with zero-trust audit verification.
          </p>
        </div>

        <div className="text-center pt-2 border-t border-slate-100">
          <button
            onClick={() => onNavigate('/login')}
            className="text-xs font-bold text-indigo-600 hover:text-indigo-800 hover:underline inline-flex items-center gap-1"
          >
            <span>Are you an institutional staff member? Switch to Tenant Login</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Authoritative Sovereign Footer */}
      <JUMOEnterpriseFooter />
    </div>
  );
};
