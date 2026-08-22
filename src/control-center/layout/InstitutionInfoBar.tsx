import React from 'react';
import { 
  Building2, ShieldCheck, DollarSign, Activity, CheckCircle2, 
  RefreshCw, Wifi, Shield, Layers, User, Network
} from 'lucide-react';

export interface InstitutionInfoBarProps {
  institutionName?: string;
  erpEdition?: string;
  branch?: string;
  department?: string;
  currentWorkspace?: string;
  userRole?: string;
  isOnline?: boolean;
  syncStatus?: 'synced' | 'syncing' | 'pending';
  trustStatus?: string;
  faapStatus?: string;
  aegisStatus?: string;
}

export const InstitutionInfoBar: React.FC<InstitutionInfoBarProps> = ({
  institutionName = 'JUMO Universal Enterprise System',
  erpEdition = 'Enterprise Hybrid v14.0',
  branch = 'Headquarters (HQ)',
  department = 'Global Administration',
  currentWorkspace = 'Sovereign Control Plane',
  userRole = 'Ring-0 Administrator',
  isOnline = true,
  syncStatus = 'synced',
  trustStatus = 'VERIFIED (100%)',
  faapStatus = 'BALANCED (1.5% CLEARING)',
  aegisStatus = 'ZERO-TRUST ENFORCED'
}) => {
  return (
    <div className="bg-slate-100 border-b border-slate-200 px-4 py-1.5 text-xs text-slate-700 flex flex-wrap items-center justify-between gap-y-1 font-sans select-none shrink-0 shadow-2xs">
      {/* Left Group: Institution & Workspace Context */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-1.5 font-bold text-slate-900">
          <Building2 className="w-3.5 h-3.5 text-blue-600" />
          <span>{institutionName}</span>
          <span className="text-[10px] font-mono px-1.5 py-0.2 bg-blue-50 text-blue-700 border border-blue-200 rounded font-semibold">
            {erpEdition}
          </span>
        </div>

        <span className="text-slate-300 hidden sm:inline">|</span>

        <div className="flex items-center gap-2 text-slate-600 text-[11px]">
          <span>Branch: <strong className="text-slate-800 font-semibold">{branch}</strong></span>
          <span className="text-slate-300">•</span>
          <span>Dept: <strong className="text-slate-800 font-semibold">{department}</strong></span>
          <span className="text-slate-300">•</span>
          <span>Workspace: <strong className="text-blue-700 font-semibold">{currentWorkspace}</strong></span>
        </div>
      </div>

      {/* Right Group: Real-time Status Engines (Trust, FAAP, AEGIS, Sync) */}
      <div className="flex items-center gap-3 text-[11px] font-mono flex-wrap">
        {/* Role Badge */}
        <div className="flex items-center gap-1 text-slate-600">
          <User className="w-3 h-3 text-slate-500" />
          <span className="font-semibold text-slate-800">{userRole}</span>
        </div>

        {/* Sync Status */}
        <div className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-white border border-slate-200 text-slate-700">
          <RefreshCw className={`w-3 h-3 ${syncStatus === 'syncing' ? 'animate-spin text-blue-600' : 'text-emerald-600'}`} />
          <span className="uppercase text-[10px] font-bold">
            {syncStatus === 'synced' ? 'SYNCED' : syncStatus === 'syncing' ? 'SYNCING...' : 'OFFLINE QUEUE'}
          </span>
        </div>

        {/* AEGIS Zero Trust */}
        <div className="hidden lg:flex items-center gap-1 text-purple-700 font-bold bg-purple-50 px-1.5 py-0.5 rounded border border-purple-200">
          <Shield className="w-3 h-3 text-purple-600" />
          <span>AEGIS: {aegisStatus}</span>
        </div>

        {/* FAAP Ledger Status */}
        <div className="hidden xl:flex items-center gap-1 text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
          <DollarSign className="w-3 h-3 text-emerald-600" />
          <span>FAAP: {faapStatus}</span>
        </div>

        {/* Trust Status */}
        <div className="hidden md:flex items-center gap-1 text-amber-800 font-bold bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
          <ShieldCheck className="w-3 h-3 text-amber-600" />
          <span>TRUST: {trustStatus}</span>
        </div>

        {/* Online Indicator */}
        <div className="flex items-center gap-1">
          <span className={`w-2 h-2 rounded-full ${isOnline ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`} />
          <span className="text-slate-600 font-semibold">{isOnline ? 'ONLINE' : 'OFFLINE'}</span>
        </div>
      </div>
    </div>
  );
};

export default InstitutionInfoBar;
