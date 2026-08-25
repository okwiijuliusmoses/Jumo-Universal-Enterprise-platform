import React, { useEffect } from 'react';
import { Shield, Key, Lock, Building2, Globe, Users, ArrowRight, UserCheck } from 'lucide-react';
import { logMilestone } from '../../src/diagnostics/moduleTracer';

export const IdentityGateway: React.FC<{ onNavigate?: (route: string) => void }> = ({ onNavigate }) => {
  logMilestone('IDENTITY_GATEWAY_START', 'PASS');

  useEffect(() => {
    logMilestone('FIRST_RENDER_COMPLETE', 'PASS');
  }, []);
  return (
    <div className="min-h-[85vh] flex items-center justify-center p-6 bg-slate-50 text-slate-900 font-sans">
      <div className="max-w-3xl w-full bg-white border border-slate-200 p-8 rounded-xl shadow-sm">
        <div className="flex items-center gap-4 mb-6 border-b border-slate-100 pb-5">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl border border-blue-100">
            <Shield className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Enterprise Identity Gateway</h2>
            <p className="text-xs text-slate-500 font-medium mt-0.5">JUMO UEOS ZERO-TRUST MULTI-ZONE ACCESS CONTROL</p>
          </div>
        </div>
        
        <p className="text-sm text-slate-600 mb-6 leading-relaxed">
          Select your dedicated authentication tier to access your isolated workspace environment.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {/* Zone A */}
          <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl flex flex-col justify-between hover:border-slate-300 transition">
            <div>
              <div className="flex items-center gap-2 text-emerald-700 font-bold text-xs uppercase tracking-wider mb-2">
                <Lock className="w-4 h-4" /> Zone A: Owner Control
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1">Ring-0 Owner Vault</h3>
              <p className="text-xs text-slate-500 leading-relaxed mb-4">
                Private platform control center. Reserved for sovereign system administrators.
              </p>
            </div>
            <button 
              onClick={() => onNavigate && onNavigate('/owner-login')} 
              className="w-full py-2.5 px-3 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-semibold text-xs flex items-center justify-center gap-2 transition shadow-xs"
            >
              Access Owner Vault <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Zone B */}
          <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl flex flex-col justify-between hover:border-slate-300 transition">
            <div>
              <div className="flex items-center gap-2 text-blue-700 font-bold text-xs uppercase tracking-wider mb-2">
                <Building2 className="w-4 h-4" /> Zone B: Institution Access
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1">Institutional Portal</h3>
              <p className="text-xs text-slate-500 leading-relaxed mb-4">
                For Schools, Hospitals, Churches, SACCOs, Governments & Corporate Staff.
              </p>
            </div>
            <button 
              onClick={() => onNavigate && onNavigate('/login')} 
              className="w-full py-2.5 px-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold text-xs flex items-center justify-center gap-2 transition shadow-xs"
            >
              Institutional Login <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Zone C */}
          <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl flex flex-col justify-between hover:border-slate-300 transition">
            <div>
              <div className="flex items-center gap-2 text-indigo-700 font-bold text-xs uppercase tracking-wider mb-2">
                <Globe className="w-4 h-4" /> Zone C: Public & Citizen
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1">Public & Citizen Gateway</h3>
              <p className="text-xs text-slate-500 leading-relaxed mb-4">
                For Visitors, Applicants, Members, Parents, Citizens & Public Admissions.
              </p>
            </div>
            <button 
              onClick={() => onNavigate && onNavigate('/public')} 
              className="w-full py-2.5 px-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold text-xs flex items-center justify-center gap-2 transition shadow-xs"
            >
              Public & Citizen Login <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Partner & Developer Zone */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
            <div>
              <div className="flex items-center gap-1.5 text-purple-700 font-bold text-xs uppercase tracking-wider mb-1">
                <Users className="w-3.5 h-3.5" /> Zone D: Partner & Developer
              </div>
              <p className="text-xs text-slate-600">API keys, integration adapters & sandbox access</p>
            </div>
            <button 
              onClick={() => onNavigate && onNavigate('/developer-center')} 
              className="py-2 px-3 bg-white border border-slate-300 hover:bg-slate-100 text-slate-800 rounded-lg font-semibold text-xs flex items-center gap-1.5 transition"
            >
              Developer Portal <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Supplier & Vendor Zone */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
            <div>
              <div className="flex items-center gap-1.5 text-amber-700 font-bold text-xs uppercase tracking-wider mb-1">
                <UserCheck className="w-3.5 h-3.5" /> Zone E: Supplier & Vendor
              </div>
              <p className="text-xs text-slate-600">Procurement bids, LPO tracking & e-invoicing</p>
            </div>
            <button 
              onClick={() => onNavigate && onNavigate('/register?domain=supplier')} 
              className="py-2 px-3 bg-white border border-slate-300 hover:bg-slate-100 text-slate-800 rounded-lg font-semibold text-xs flex items-center gap-1.5 transition"
            >
              Supplier Gateway <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="mt-6 p-4 bg-blue-50/50 border border-blue-100 rounded-xl flex items-center justify-between text-xs">
          <span className="text-slate-700">Need a new institutional workspace or user account?</span>
          <button
            onClick={() => onNavigate && onNavigate('/register')}
            className="text-blue-700 font-bold hover:underline flex items-center gap-1"
          >
            Create Enterprise Account <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-mono">
          <span>SECURITY CLASSIFICATION: ENTERPRISE ZERO-TRUST</span>
          <span>SYSTEM VERSION: 1.0.4 PRODUCTION</span>
        </div>
      </div>
    </div>
  );
};

