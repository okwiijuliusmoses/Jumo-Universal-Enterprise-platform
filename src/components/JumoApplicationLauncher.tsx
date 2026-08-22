import React from 'react';
import { CreditCard, GraduationCap, Users, Bell, User, Settings, ArrowUpRight } from 'lucide-react';

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
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-white">
      {/* Top Header */}
      <header className="border-b border-slate-900 bg-slate-950 px-6 sm:px-12 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-slate-950 font-black text-sm tracking-wider shadow-sm">
            J
          </div>
          <div>
            <span className="font-bold text-sm tracking-tight text-white">JUMO DIGITAL HYBRID PLATFORM</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button 
            type="button"
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-900 rounded-lg transition-colors cursor-pointer"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
          </button>
          
          <div className="flex items-center gap-2 pl-2 border-l border-slate-850">
            <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 text-xs font-medium">
              <User className="w-4 h-4" />
            </div>
            {currentUser?.name && (
              <span className="text-xs text-slate-300 hidden md:inline font-medium">{currentUser.name}</span>
            )}
          </div>

          <button
            onClick={() => onNavigate('/owner')}
            className="ml-2 p-2 text-slate-500 hover:text-slate-300 hover:bg-slate-900 rounded-lg transition-colors cursor-pointer"
            title="System Settings & Administration"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Applications Shelf */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-16 max-w-4xl mx-auto w-full">
        {/* Title */}
        <div className="text-center mb-12">
          <h1 className="text-xs font-mono font-bold tracking-widest text-slate-400 uppercase mb-2">
            APPLICATIONS
          </h1>
          <p className="text-slate-500 text-xs">
            Select an application to launch
          </p>
        </div>

        {/* 3 Installed Application Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-3xl mb-12">
          {/* 1. JUMO FINTECH */}
          <button
            type="button"
            onClick={() => onNavigate('/fintech')}
            className="group bg-slate-900/70 hover:bg-slate-900 border border-slate-800 hover:border-emerald-500/60 rounded-2xl p-7 text-center transition-all duration-150 flex flex-col items-center justify-center cursor-pointer shadow-lg hover:shadow-emerald-950/20"
          >
            <div className="w-16 h-16 rounded-2xl bg-emerald-950/60 border border-emerald-800/60 flex items-center justify-center text-emerald-400 mb-5 group-hover:scale-105 group-hover:bg-emerald-950 transition-transform">
              <CreditCard className="w-8 h-8" />
            </div>
            <h2 className="text-base font-bold text-white mb-1 group-hover:text-emerald-400 transition-colors">
              JUMO FINTECH
            </h2>
            <p className="text-slate-400 text-xs font-normal">
              Financial Services
            </p>
          </button>

          {/* 2. SCHOOL ERP */}
          <button
            type="button"
            onClick={() => onNavigate('/education')}
            className="group bg-slate-900/70 hover:bg-slate-900 border border-slate-800 hover:border-blue-500/60 rounded-2xl p-7 text-center transition-all duration-150 flex flex-col items-center justify-center cursor-pointer shadow-lg hover:shadow-blue-950/20"
          >
            <div className="w-16 h-16 rounded-2xl bg-blue-950/60 border border-blue-800/60 flex items-center justify-center text-blue-400 mb-5 group-hover:scale-105 group-hover:bg-blue-950 transition-transform">
              <GraduationCap className="w-8 h-8" />
            </div>
            <h2 className="text-base font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">
              SCHOOL ERP
            </h2>
            <p className="text-slate-400 text-xs font-normal">
              Education Management
            </p>
          </button>

          {/* 3. ALUMNI ERP */}
          <button
            type="button"
            onClick={() => onNavigate('/alumni')}
            className="group bg-slate-900/70 hover:bg-slate-900 border border-slate-800 hover:border-violet-500/60 rounded-2xl p-7 text-center transition-all duration-150 flex flex-col items-center justify-center cursor-pointer shadow-lg hover:shadow-violet-950/20"
          >
            <div className="w-16 h-16 rounded-2xl bg-violet-950/60 border border-violet-800/60 flex items-center justify-center text-violet-400 mb-5 group-hover:scale-105 group-hover:bg-violet-950 transition-transform">
              <Users className="w-8 h-8" />
            </div>
            <h2 className="text-base font-bold text-white mb-1 group-hover:text-violet-400 transition-colors">
              ALUMNI ERP
            </h2>
            <p className="text-slate-400 text-xs font-normal">
              Alumni & Association
            </p>
          </button>
        </div>
      </main>

      {/* Minimal Footer */}
      <footer className="border-t border-slate-900/80 py-4 px-6 text-center text-[11px] text-slate-600 font-mono">
        JUMO UEOS • Sovereign Hybrid Platform
      </footer>
    </div>
  );
};
