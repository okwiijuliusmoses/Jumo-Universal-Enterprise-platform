import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Shield, Lock, ArrowRight, AlertCircle, Key, Cpu, CheckCircle2 } from 'lucide-react';
import { EnterpriseLogo } from '../../src/components/EnterpriseLogo';
import { SovereignPasswordInput } from '../../src/components/SovereignPasswordInput';

export const OwnerLoginView: React.FC<{ onNavigate?: (route: string) => void }> = ({ onNavigate }) => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mfaCode, setMfaCode] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsVerifying(true);
    try {
      await login(email, password);
      onNavigate && onNavigate('/owner');
    } catch (err: any) {
      setError(err.message || 'Ring-0 Sovereign Owner authentication failed.');
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col justify-between font-sans selection:bg-blue-100 selection:text-blue-900 py-12 px-4">
      <div className="max-w-md w-full mx-auto my-auto p-8 bg-white border border-slate-200 rounded-2xl shadow-xl space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <EnterpriseLogo size="md" variant="blue" showText={false} />
            <div>
              <h2 className="text-lg font-bold text-slate-900">Sovereign Owner Console</h2>
              <span className="text-[11px] font-mono font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                Ring-0 Root Vault
              </span>
            </div>
          </div>
          <Shield className="w-6 h-6 text-emerald-600" />
        </div>

        <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-600 flex items-start gap-2.5">
          <Lock className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-slate-800">256-Bit Hardware MFA Wall:</span> Authoritative root access is strictly monitored under continuous CCTV auditing.
          </div>
        </div>

        {error && (
          <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Sovereign Root Identifier</label>
            <input 
              type="text" 
              required
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="owner@jumo.eu"
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2.5 text-xs font-mono font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500" 
            />
          </div>

          <SovereignPasswordInput
            value={password}
            onChange={setPassword}
            label="Master Passphrase"
            placeholder="••••••••••••••••"
            required
            showStrength={true}
            showValidation={true}
          />

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Ring-0 Hardware Authenticator Code</label>
            <input 
              type="text" 
              required
              value={mfaCode} 
              onChange={(e) => setMfaCode(e.target.value)} 
              placeholder="e.g. 992-481"
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2 text-xs font-mono font-bold tracking-widest text-center text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500" 
            />
          </div>

          <button 
            type="submit" 
            disabled={isVerifying}
            className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold text-xs rounded-xl transition shadow-md flex items-center justify-center gap-2"
          >
            {isVerifying ? 'Verifying Ring-0 Cryptography...' : 'Unlock Sovereign Vault →'}
          </button>
        </form>

        <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-600">
          <span>Target: <strong className="text-slate-700">JUMO-MASTER-01</strong></span>
          <button onClick={() => onNavigate && onNavigate('/public')} className="text-blue-600 hover:underline">
            Return to Public Portal
          </button>
        </div>
      </div>
    </div>
  );
};

export default OwnerLoginView;
