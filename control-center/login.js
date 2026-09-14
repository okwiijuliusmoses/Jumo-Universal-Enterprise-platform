import React from 'react';

export const ControlCenterLogin = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-50 font-sans">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-xl border border-slate-200 p-8 md:p-10 space-y-8">
        
        <div className="text-center space-y-2">
            <div className="text-2xl font-bold text-emerald-700">JUMO UEOS</div>
            <h1 className="text-lg font-semibold text-slate-900">Control Center</h1>
            <p className="text-xs text-slate-500 font-medium tracking-wide uppercase">Secure Platform Operations Gateway</p>
        </div>

        <form className="space-y-5">
            <div className="space-y-1">
                <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider">Email / Identity</label>
                <input type="email" required className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-600 text-sm bg-slate-50 font-medium text-slate-900" placeholder="admin@jumo.ueos" />
            </div>

            <div className="space-y-1">
                <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider">Password</label>
                <input type="password" required className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-600 text-sm bg-slate-50 font-medium text-slate-900" placeholder="••••••••" />
            </div>

            <button type="submit" className="w-full py-3 bg-emerald-600 text-white text-sm font-bold rounded-xl hover:bg-emerald-700 transition shadow-sm cursor-pointer">
                Sign In
            </button>
        </form>

        <div className="text-center">
            <p className="text-[11px] text-slate-400 font-medium">Secure verification required for all operations.</p>
        </div>
      </div>
    </div>
  );
};
