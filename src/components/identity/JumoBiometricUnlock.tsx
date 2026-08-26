import React, { useState, useEffect } from 'react';
import { Fingerprint, Scan, Lock, ShieldCheck, Zap } from 'lucide-react';

interface JumoBiometricUnlockProps {
  onUnlock: () => void;
}

export const JumoBiometricUnlock: React.FC<JumoBiometricUnlockProps> = ({ onUnlock }) => {
  const [status, setStatus] = useState<'idle' | 'scanning' | 'verifying' | 'success'>('idle');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Start scanning sequence
    const timer = setTimeout(() => {
      setStatus('scanning');
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setStatus('verifying');
            setTimeout(() => {
              setStatus('success');
              setTimeout(onUnlock, 800);
            }, 1200);
            return 100;
          }
          return prev + 2;
        });
      }, 30);
    }, 500);

    return () => clearTimeout(timer);
  }, [onUnlock]);

  return (
    <div className="fixed inset-0 z-[9999] bg-slate-950 flex flex-col items-center justify-center p-6 select-none overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="relative w-full max-w-sm flex flex-col items-center space-y-12">
        {/* Biometric Icon Container */}
        <div className="relative group">
          <div className={`w-32 h-32 rounded-3xl border-2 flex items-center justify-center transition-all duration-700 ${
            status === 'success' ? 'bg-emerald-500/20 border-emerald-500 scale-110' : 
            status === 'scanning' ? 'bg-indigo-500/10 border-indigo-500 shadow-[0_0_30px_rgba(99,102,241,0.2)]' : 
            'bg-slate-900 border-slate-800'
          }`}>
            {status === 'success' ? (
              <ShieldCheck className="w-16 h-16 text-emerald-500 animate-in zoom-in duration-300" />
            ) : status === 'verifying' ? (
              <div className="flex flex-col items-center gap-2">
                <div className="flex gap-1">
                  <div className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce" />
                  <div className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce [animation-delay:0.2s]" />
                  <div className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            ) : (
              <div className="relative">
                <Fingerprint className={`w-16 h-16 transition-colors duration-500 ${
                  status === 'scanning' ? 'text-indigo-400' : 'text-slate-600'
                }`} />
                {status === 'scanning' && (
                  <div 
                    className="absolute inset-0 bg-indigo-500/20 animate-pulse pointer-events-none rounded-lg" 
                    style={{ clipPath: `inset(${100 - progress}% 0 0 0)` }}
                  />
                )}
              </div>
            )}
          </div>

          {/* Scanning Line */}
          {status === 'scanning' && (
            <div 
              className="absolute left-0 right-0 h-1 bg-indigo-400 shadow-[0_0_15px_rgba(129,140,248,0.8)] z-10 transition-all duration-30"
              style={{ top: `${progress}%` }}
            />
          )}

          {/* Corner Decorations */}
          <div className="absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-slate-700 rounded-tl-lg" />
          <div className="absolute -top-2 -right-2 w-6 h-6 border-t-2 border-r-2 border-slate-700 rounded-tr-lg" />
          <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-2 border-l-2 border-slate-700 rounded-bl-lg" />
          <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-slate-700 rounded-br-lg" />
        </div>

        {/* Status Text */}
        <div className="text-center space-y-3">
          <h2 className={`text-xl font-black tracking-tight uppercase transition-colors duration-500 ${
            status === 'success' ? 'text-emerald-400' : 'text-white'
          }`}>
            {status === 'success' ? 'Identity Verified' : 
             status === 'verifying' ? 'Verifying Bio-Sign...' :
             status === 'scanning' ? 'Scanning Biometrics' : 'Locked'}
          </h2>
          <p className="text-[10px] font-mono font-bold text-slate-500 tracking-[0.2em] uppercase">
            JUMO Sovereign Identity Gateway
          </p>
        </div>

        {/* Progress Bar (at bottom) */}
        <div className="w-full h-1 bg-slate-900 rounded-full overflow-hidden">
          <div 
            className={`h-full transition-all duration-300 ${
              status === 'success' ? 'bg-emerald-500 w-full' : 'bg-indigo-500'
            }`}
            style={{ width: status === 'scanning' ? `${progress}%` : status === 'verifying' || status === 'success' ? '100%' : '0%' }}
          />
        </div>

        {/* Info badges */}
        <div className="flex items-center gap-4 pt-4">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800">
            <Lock className="w-3 h-3 text-slate-500" />
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">AES-256</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800">
            <Zap className="w-3 h-3 text-indigo-500" />
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Quantum-Safe</span>
          </div>
        </div>
      </div>
    </div>
  );
};
