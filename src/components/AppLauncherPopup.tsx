import React, { useState, useRef, useEffect } from 'react';
import { 
  CreditCard, GraduationCap, Users, LayoutGrid, ArrowRight,
  Settings, ChevronRight, X, Sparkles, Terminal, Home
} from 'lucide-react';

interface AppLauncherPopupProps {
  currentProductId?: 'fintech' | 'education' | 'alumni' | 'owner';
  onNavigate?: (route: string) => void;
}

export const AppLauncherPopup: React.FC<AppLauncherPopupProps> = ({
  currentProductId,
  onNavigate
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleSelectApp = (route: string) => {
    setIsOpen(false);
    if (onNavigate) {
      onNavigate(route);
    }
  };

  const getProductInfo = () => {
    switch (currentProductId) {
      case 'fintech':
        return { name: 'JUMO FINTECH', icon: CreditCard, color: 'text-emerald-400', badge: 'Financial Platform' };
      case 'education':
        return { name: 'JUMO SCHOOL ERP', icon: GraduationCap, color: 'text-blue-400', badge: 'Education ERP' };
      case 'alumni':
        return { name: 'JUMO ALUMNI ERP', icon: Users, color: 'text-violet-400', badge: 'Alumni Network' };
      case 'owner':
        return { name: 'JUMO UEOS', icon: Settings, color: 'text-amber-400', badge: 'Owner Console' };
      default:
        return { name: 'JUMO UEOS', icon: LayoutGrid, color: 'text-slate-400', badge: 'Platform' };
    }
  };

  const current = getProductInfo();
  const CurrentIcon = current.icon;

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* Trigger Button in Header */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg bg-slate-900/90 hover:bg-slate-800 border border-slate-800 text-white transition-colors cursor-pointer group"
        title="JUMO Application Launcher"
      >
        <div className="w-5 h-5 rounded bg-slate-800 group-hover:bg-slate-700 flex items-center justify-center text-slate-300">
          <LayoutGrid className="w-3.5 h-3.5" />
        </div>
        <div className="text-left hidden sm:block">
          <div className="text-xs font-bold leading-none tracking-tight flex items-center gap-1.5">
            <span>{current.name}</span>
          </div>
          <div className="text-[10px] text-slate-400 leading-tight font-mono">{current.badge}</div>
        </div>
      </button>

      {/* App Launcher Modal Popover */}
      {isOpen && (
        <div className="absolute left-0 mt-2 w-80 rounded-2xl bg-slate-950 border border-slate-800 shadow-2xl shadow-black/80 z-50 p-3.5 text-slate-100 animate-in fade-in zoom-in-95 duration-100">
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-800/80 mb-3 px-1">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <LayoutGrid className="w-3.5 h-3.5" />
              </div>
              <span className="text-xs font-bold text-slate-200 tracking-wider">JUMO APPLICATIONS</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-500 hover:text-white p-1 rounded-lg hover:bg-slate-900 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* 3 Approved Independent Applications */}
          <div className="space-y-1.5">
            {/* Fintech */}
            <button
              onClick={() => handleSelectApp('/fintech')}
              className={`w-full flex items-center justify-between p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                currentProductId === 'fintech'
                  ? 'bg-emerald-950/40 border-emerald-800/80 text-white'
                  : 'bg-slate-900/40 border-slate-800/60 text-slate-300 hover:bg-slate-900 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-emerald-950 border border-emerald-800/60 flex items-center justify-center text-emerald-400 shrink-0">
                  <CreditCard className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white flex items-center gap-1.5">
                    <span>JUMO FINTECH</span>
                    {currentProductId === 'fintech' && (
                      <span className="text-[9px] px-1.5 py-0.2 bg-emerald-900 text-emerald-300 rounded font-mono">ACTIVE</span>
                    )}
                  </div>
                  <div className="text-[10px] text-slate-400">FAAP Ledger • Switch • 37 Families</div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-500 shrink-0" />
            </button>

            {/* Universal School ERP */}
            <button
              onClick={() => handleSelectApp('/education')}
              className={`w-full flex items-center justify-between p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                currentProductId === 'education'
                  ? 'bg-blue-950/40 border-blue-800/80 text-white'
                  : 'bg-slate-900/40 border-slate-800/60 text-slate-300 hover:bg-slate-900 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-blue-950 border border-blue-800/60 flex items-center justify-center text-blue-400 shrink-0">
                  <GraduationCap className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white flex items-center gap-1.5">
                    <span>JUMO SCHOOL ERP</span>
                    {currentProductId === 'education' && (
                      <span className="text-[9px] px-1.5 py-0.2 bg-blue-900 text-blue-300 rounded font-mono">ACTIVE</span>
                    )}
                  </div>
                  <div className="text-[10px] text-slate-400">SIS • Bursary • Senate • Campus</div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-500 shrink-0" />
            </button>

            {/* Alumni ERP */}
            <button
              onClick={() => handleSelectApp('/alumni')}
              className={`w-full flex items-center justify-between p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                currentProductId === 'alumni'
                  ? 'bg-violet-950/40 border-violet-800/80 text-white'
                  : 'bg-slate-900/40 border-slate-800/60 text-slate-300 hover:bg-slate-900 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-violet-950 border border-violet-800/60 flex items-center justify-center text-violet-400 shrink-0">
                  <Users className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white flex items-center gap-1.5">
                    <span>JUMO ALUMNI ERP</span>
                    {currentProductId === 'alumni' && (
                      <span className="text-[9px] px-1.5 py-0.2 bg-violet-900 text-violet-300 rounded font-mono">ACTIVE</span>
                    )}
                  </div>
                  <div className="text-[10px] text-slate-400">Advancement • Giving • Chapters</div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-500 shrink-0" />
            </button>
          </div>

          {/* Divider and Operating Console Options */}
          <div className="mt-3 pt-3 border-t border-slate-800/80 space-y-1">
            <button
              onClick={() => handleSelectApp('/')}
              className="w-full flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900 transition-colors text-xs cursor-pointer"
            >
              <Home className="w-3.5 h-3.5 text-slate-400" />
              <span>Application Launcher</span>
            </button>

            <button
              onClick={() => handleSelectApp('/owner')}
              className="w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-slate-400 hover:text-emerald-400 hover:bg-slate-900 transition-colors text-xs cursor-pointer font-mono"
            >
              <div className="flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5" />
                <span>JUMO UEOS Owner Console</span>
              </div>
              <span className="text-[10px] text-slate-600">v14.0</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
