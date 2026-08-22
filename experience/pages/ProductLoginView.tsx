import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Shield, ArrowRight, AlertCircle, Lock, Building2 } from 'lucide-react';
import { JUMOEnterpriseHeader } from '../../src/components/JUMOEnterpriseHeader';
import { JUMOEnterpriseFooter } from '../../src/components/JUMOEnterpriseFooter';
import { SovereignPasswordInput } from '../../src/components/SovereignPasswordInput';

interface ProductLoginViewProps {
  productId: string;
  productName: string;
  productIcon: React.ReactNode;
  brandColor: string;
  onNavigate: (route: string) => void;
  defaultEmail?: string;
  redirectPath: string;
}

export const ProductLoginView: React.FC<ProductLoginViewProps> = ({
  productId,
  productName,
  productIcon,
  brandColor,
  onNavigate,
  defaultEmail = '',
  redirectPath
}) => {
  const { login } = useAuth();
  const [email, setEmail] = useState(defaultEmail);
  const [password, setPassword] = useState('jumo123');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await login(email, password);
      onNavigate(redirectPath);
    } catch (err: any) {
      setError(err.message || `Authentication failed for ${productName}. Please verify credentials.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col justify-between font-sans">
      <JUMOEnterpriseHeader
        onNavigate={onNavigate}
        titleOverride={`${productName} Login`}
        subtitleOverride="Sovereign Product Authentication Boundary"
      />

      <div className="max-w-md w-full mx-auto my-auto p-8 bg-white border border-slate-200 rounded-2xl shadow-xl space-y-6">
        <div className="text-center space-y-2 pb-2 border-b border-slate-100">
          <div className="inline-flex p-3 rounded-2xl mb-1 shadow-inner border border-slate-100" style={{ backgroundColor: `${brandColor}15`, color: brandColor }}>
            {productIcon}
          </div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">{productName}</h2>
          <p className="text-xs text-slate-500">Sign in to your standalone product runtime</p>
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700 block">Product Access Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@institution.edu"
              required
              className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all font-mono"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] text-slate-500 font-semibold mb-1 block">Security Token</label>
            <SovereignPasswordInput
              value={password}
              onChange={setPassword}
              label="Password"
              placeholder="••••••••••••"
              required
              showStrength={false}
              showValidation={false}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 text-white font-bold text-sm rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 uppercase tracking-wide"
            style={{ backgroundColor: brandColor }}
          >
            {loading ? 'Authenticating...' : `Enter ${productName} Workspace →`}
          </button>
        </form>

        <div className="pt-4 border-t border-slate-100 text-center">
          <button
            type="button"
            onClick={() => onNavigate('/')}
            className="text-[11px] text-slate-400 hover:text-slate-600 font-mono"
          >
            ← Return to JUMO Application Desktop
          </button>
        </div>
      </div>

      <JUMOEnterpriseFooter />
    </div>
  );
};
