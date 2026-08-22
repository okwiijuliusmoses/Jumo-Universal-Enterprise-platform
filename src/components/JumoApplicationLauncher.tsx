import React from 'react';
import { 
  CreditCard, GraduationCap, Users, ArrowRight, Shield, ShieldCheck, 
  Sparkles, CheckCircle2, Landmark, Zap, Layers, Globe, Settings, Lock,
  ChevronRight, Activity, Terminal, ArrowUpRight, Cpu
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
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-white">
      {/* Top Universal Minimal Header */}
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-slate-950 font-black tracking-wider text-sm shadow-sm">
              J
            </div>
            <div>
              <span className="font-bold tracking-tight text-white text-sm">JUMO UEOS</span>
              <span className="text-slate-500 text-xs ml-2 hidden sm:inline font-mono">HYBRID PLATFORM</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {currentUser && (
              <div className="text-right hidden sm:block">
                <div className="text-xs font-semibold text-slate-200">{currentUser.name || 'System User'}</div>
                <div className="text-[10px] text-emerald-400 font-mono">{currentUser.role || 'AUTHENTICATED'}</div>
              </div>
            )}
            <button
              onClick={() => onNavigate('/owner')}
              className="px-3 py-1.5 text-xs font-medium text-slate-400 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Settings className="w-3.5 h-3.5 text-slate-400" />
              <span>Owner Console</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Launcher Center */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-12 max-w-5xl mx-auto w-full">
        {/* Launcher Hero Heading */}
        <div className="text-center mb-10 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-800/60 text-emerald-400 text-xs font-medium mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Digital Hybrid Operating System</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            JUMO Application Launcher
          </h1>
          <p className="text-slate-400 text-sm max-w-lg mx-auto">
            Select an independent enterprise application to enter its dedicated operating workspace and runtime.
          </p>
        </div>

        {/* 3 Large Product Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-12">
          {/* Card 1: JUMO FINTECH */}
          <div 
            onClick={() => onNavigate('/fintech')}
            className="group relative bg-slate-950 border border-slate-800 hover:border-emerald-500/80 rounded-2xl p-6 transition-all duration-200 hover:shadow-xl hover:shadow-emerald-950/40 flex flex-col justify-between cursor-pointer"
          >
            <div>
              <div className="w-14 h-14 rounded-xl bg-emerald-950 border border-emerald-800/80 flex items-center justify-center text-emerald-400 mb-5 group-hover:scale-105 group-hover:bg-emerald-900 transition-all duration-200">
                <CreditCard className="w-7 h-7" />
              </div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-400">FINANCIAL ENGINE</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800 font-mono">37 FAMILIES</span>
              </div>
              <h2 className="text-xl font-bold text-white mb-2 group-hover:text-emerald-300 transition-colors">
                JUMO FINTECH
              </h2>
              <p className="text-slate-400 text-xs leading-relaxed mb-4">
                Sovereign financial operating platform with General Ledger, Payments Switch, Mobile Money, Lending, Microfinance, Digital Wallets, FX, and Treasury.
              </p>
              <div className="space-y-1.5 border-t border-slate-900 pt-3 mb-6">
                <div className="text-[11px] text-slate-400 flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  <span>FAAP Ledger & Cash Book</span>
                </div>
                <div className="text-[11px] text-slate-400 flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Universal Payments & Switching</span>
                </div>
                <div className="text-[11px] text-slate-400 flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Zero-Offset Double Entry Parity</span>
                </div>
              </div>
            </div>

            <button 
              onClick={(e) => {
                e.stopPropagation();
                onNavigate('/fintech');
              }}
              className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition cursor-pointer"
            >
              <span>OPEN FINTECH</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Card 2: JUMO UNIVERSAL SCHOOL ERP */}
          <div 
            onClick={() => onNavigate('/education')}
            className="group relative bg-slate-950 border border-slate-800 hover:border-blue-500/80 rounded-2xl p-6 transition-all duration-200 hover:shadow-xl hover:shadow-blue-950/40 flex flex-col justify-between cursor-pointer"
          >
            <div>
              <div className="w-14 h-14 rounded-xl bg-blue-950 border border-blue-800/80 flex items-center justify-center text-blue-400 mb-5 group-hover:scale-105 group-hover:bg-blue-900 transition-all duration-200">
                <GraduationCap className="w-7 h-7" />
              </div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-blue-400">INSTITUTIONAL ERP</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-950 text-blue-300 border border-blue-800 font-mono">CAMPUS READY</span>
              </div>
              <h2 className="text-xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">
                JUMO SCHOOL ERP
              </h2>
              <p className="text-slate-400 text-xs leading-relaxed mb-4">
                Full-lifecycle academic management for primary, secondary, and higher institutions with SIS, Bursary, Senate, Examinations, and Campus Services.
              </p>
              <div className="space-y-1.5 border-t border-slate-900 pt-3 mb-6">
                <div className="text-[11px] text-slate-400 flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-500" />
                  <span>Student Information System (SIS)</span>
                </div>
                <div className="text-[11px] text-slate-400 flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-500" />
                  <span>Tuition PRN & Bursary Accounting</span>
                </div>
                <div className="text-[11px] text-slate-400 flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-500" />
                  <span>Senate Curricula & Exam Grading</span>
                </div>
              </div>
            </div>

            <button 
              onClick={(e) => {
                e.stopPropagation();
                onNavigate('/education');
              }}
              className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition cursor-pointer"
            >
              <span>OPEN SCHOOL ERP</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Card 3: JUMO ALUMNI ERP */}
          <div 
            onClick={() => onNavigate('/alumni')}
            className="group relative bg-slate-950 border border-slate-800 hover:border-violet-500/80 rounded-2xl p-6 transition-all duration-200 hover:shadow-xl hover:shadow-violet-950/40 flex flex-col justify-between cursor-pointer"
          >
            <div>
              <div className="w-14 h-14 rounded-xl bg-violet-950 border border-violet-800/80 flex items-center justify-center text-violet-400 mb-5 group-hover:scale-105 group-hover:bg-violet-900 transition-all duration-200">
                <Users className="w-7 h-7" />
              </div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-violet-400">ADVANCEMENT & NETWORK</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-violet-950 text-violet-300 border border-violet-800 font-mono">GLOBAL CHAPTERS</span>
              </div>
              <h2 className="text-xl font-bold text-white mb-2 group-hover:text-violet-300 transition-colors">
                JUMO ALUMNI ERP
              </h2>
              <p className="text-slate-400 text-xs leading-relaxed mb-4">
                Institutional advancement platform for graduate census, endowment campaigns, global regional chapters, mentorship pairings, and verifiable credentials.
              </p>
              <div className="space-y-1.5 border-t border-slate-900 pt-3 mb-6">
                <div className="text-[11px] text-slate-400 flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-violet-500" />
                  <span>Graduate Census & Regional Chapters</span>
                </div>
                <div className="text-[11px] text-slate-400 flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-violet-500" />
                  <span>Endowment & Capital Campaigns</span>
                </div>
                <div className="text-[11px] text-slate-400 flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-violet-500" />
                  <span>QR Verifiable Transcripts</span>
                </div>
              </div>
            </div>

            <button 
              onClick={(e) => {
                e.stopPropagation();
                onNavigate('/alumni');
              }}
              className="w-full py-2.5 px-4 bg-violet-600 hover:bg-violet-500 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition cursor-pointer"
            >
              <span>OPEN ALUMNI ERP</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Operating Environment Bottom Bar */}
        <div className="w-full bg-slate-950/60 border border-slate-800/80 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3 text-slate-400">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-mono text-[11px] text-slate-300">UEOS Micro-Kernel Active</span>
            </div>
            <span className="text-slate-700">|</span>
            <span className="text-[11px]">Zero-Trust Security</span>
            <span className="text-slate-700">|</span>
            <span className="text-[11px]">Multi-Model AI Gateway</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigate('/owner')}
              className="px-3 py-1.5 text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg transition font-medium text-[11px] flex items-center gap-1.5 cursor-pointer"
            >
              <Terminal className="w-3 h-3 text-emerald-400" />
              <span>Owner & System Administration →</span>
            </button>
          </div>
        </div>
      </main>

      {/* Ultra-compact Footer */}
      <footer className="border-t border-slate-800 py-3 text-center text-[11px] text-slate-500 font-mono">
        JUMO Universal Enterprise Operating System (UEOS) • Sovereign Enterprise Architecture
      </footer>
    </div>
  );
};
