import React from 'react';
import { 
  CreditCard, GraduationCap, Users, Bell, User, Settings, 
  Church, ArrowRight, ShieldCheck, Sparkles, Building2,
  Lock, CheckCircle2, Sliders
} from 'lucide-react';

interface JumoApplicationLauncherProps {
  onNavigate: (route: string) => void;
  currentUser?: {
    name?: string;
    email?: string;
    role?: string;
  };
}

export const JumoApplicationLauncher: React.FC<JumoApplicationLauncherProps> = ({
  onNavigate,
  currentUser
}) => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* Top Header - Clean White Enterprise Theme */}
      <header className="border-b border-slate-200 bg-white px-6 sm:px-12 h-16 flex items-center justify-between shadow-2xs">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-black text-sm tracking-wider shadow-xs">
            J
          </div>
          <div>
            <span className="font-bold text-sm tracking-tight text-slate-900 block leading-tight">
              JUMO <span className="text-emerald-700 font-semibold">ENTERPRISE PLATFORM</span>
            </span>
            <span className="text-[10px] font-mono text-slate-500">Universal Operating Environment</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button 
            type="button"
            className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            title="System Notifications"
          >
            <Bell className="w-4 h-4" />
          </button>
          
          <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
            <div className="w-8 h-8 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 text-xs font-semibold">
              <User className="w-4 h-4" />
            </div>
            {currentUser?.name && (
              <div className="hidden md:block text-left">
                <span className="text-xs text-slate-900 font-bold block leading-tight">{currentUser.name}</span>
                <span className="text-[10px] text-slate-500">{currentUser.role || 'Enterprise User'}</span>
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={() => onNavigate('/owner')}
            className="ml-1 p-2 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            title="Owner & System Control Center"
          >
            <Sliders className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Applications Shelf */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-12 max-w-6xl mx-auto w-full">
        {/* Title */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-800 rounded-full border border-emerald-200 text-xs font-semibold mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Authenticated Micro-Kernel Active</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 mb-2">
            Independent Enterprise Applications
          </h1>
          <p className="text-slate-500 text-xs max-w-lg mx-auto">
            Select a sovereign product workspace to launch. Each application operates with dedicated control centers, developer APIs, and data domains.
          </p>
        </div>

        {/* 4 Sovereign Application Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full mb-12">
          {/* 1. JUMO FINTECH */}
          <div className="bg-white hover:bg-slate-50/60 border border-slate-200 hover:border-emerald-500 rounded-2xl p-6 transition-all duration-200 flex flex-col justify-between shadow-xs hover:shadow-md group">
            <div>
              <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 mb-4 group-hover:scale-105 transition-transform">
                <CreditCard className="w-6 h-6" />
              </div>
              <div className="flex items-center justify-between mb-1">
                <h2 className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                  JUMO FINTECH
                </h2>
                <span className="text-[10px] font-mono font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">
                  FAAP v14.0
                </span>
              </div>
              <p className="text-slate-500 text-xs mb-4 leading-relaxed">
                Complete financial operating platform including General Ledger, Treasury, Digital Payments, Banking APIs & FAAP Core.
              </p>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('/fintech')}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition shadow-xs cursor-pointer"
            >
              <span>Launch Workspace</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* 2. UNIVERSAL SCHOOL ERP */}
          <div className="bg-white hover:bg-slate-50/60 border border-slate-200 hover:border-blue-500 rounded-2xl p-6 transition-all duration-200 flex flex-col justify-between shadow-xs hover:shadow-md group">
            <div>
              <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 mb-4 group-hover:scale-105 transition-transform">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div className="flex items-center justify-between mb-1">
                <h2 className="text-base font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                  SCHOOL ERP
                </h2>
                <span className="text-[10px] font-mono font-bold bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
                  NCDC / UNEB
                </span>
              </div>
              <p className="text-slate-500 text-xs mb-4 leading-relaxed">
                Universal educational platform with dedicated Bursar, Registrar, DOS, Head Teacher, and Gradebook portals for Nursery to Higher Ed.
              </p>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('/education')}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition shadow-xs cursor-pointer"
            >
              <span>Launch Workspace</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* 3. ALUMNI ERP */}
          <div className="bg-white hover:bg-slate-50/60 border border-slate-200 hover:border-rose-500 rounded-2xl p-6 transition-all duration-200 flex flex-col justify-between shadow-xs hover:shadow-md group">
            <div>
              <div className="w-12 h-12 rounded-xl bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600 mb-4 group-hover:scale-105 transition-transform">
                <Users className="w-6 h-6" />
              </div>
              <div className="flex items-center justify-between mb-1">
                <h2 className="text-base font-bold text-slate-900 group-hover:text-rose-700 transition-colors">
                  ALUMNI ERP
                </h2>
                <span className="text-[10px] font-mono font-bold bg-rose-100 text-rose-800 px-2 py-0.5 rounded">
                  ADVANCE
                </span>
              </div>
              <p className="text-slate-500 text-xs mb-4 leading-relaxed">
                Institutional advancement, alumni directory, endowment fund drives, chapters, and career mentorship platform.
              </p>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('/alumni')}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold transition shadow-xs cursor-pointer"
            >
              <span>Launch Workspace</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* 4. CHURCH ERP */}
          <div className="bg-white hover:bg-slate-50/60 border border-slate-200 hover:border-purple-500 rounded-2xl p-6 transition-all duration-200 flex flex-col justify-between shadow-xs hover:shadow-md group">
            <div>
              <div className="w-12 h-12 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-600 mb-4 group-hover:scale-105 transition-transform">
                <Church className="w-6 h-6" />
              </div>
              <div className="flex items-center justify-between mb-1">
                <h2 className="text-base font-bold text-slate-900 group-hover:text-purple-700 transition-colors">
                  CHURCH ERP
                </h2>
                <span className="text-[10px] font-mono font-bold bg-purple-100 text-purple-800 px-2 py-0.5 rounded">
                  DIOCESE
                </span>
              </div>
              <p className="text-slate-500 text-xs mb-4 leading-relaxed">
                Ecclesiastical parish registers, canonical sacramental records, clergy management, and diocesan quota tithe remittances.
              </p>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('/church')}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold transition shadow-xs cursor-pointer"
            >
              <span>Launch Workspace</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </main>

      {/* Ultra-compact Footer */}
      <footer className="border-t border-slate-200 bg-white py-3.5 px-6 text-center text-[11px] text-slate-500 font-mono">
        JUMO UEOS • Sovereign Hybrid Platform Architecture • All Systems Operating Normally
      </footer>
    </div>
  );
};
