import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  name?: string;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null
  };

  public static getDerivedStateFromError(error: Error): Partial<State> {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    (this as any).setState({ errorInfo });
    console.error(`JUMO UEOS APPLICATION RUNTIME ERROR [${(this as any).props.name || 'Component'}]`, {
      message: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      route: typeof window !== 'undefined' ? window.location.href : 'SSR',
      env: process.env.NODE_ENV || 'production',
      version: 'v18.0.0 Sovereign LTS'
    });
  }

  private detectPlatformName(): string {
    if (typeof window === 'undefined') return 'Sovereign Enterprise Runtime';
    const path = window.location.pathname;
    if (path.includes('/sacco')) return 'SACCO & Microfinance ERP';
    if (path.includes('/church')) return 'Church & Diocese ERP';
    if (path.includes('/education') || path.includes('/school')) return 'Education & University ERP';
    if (path.includes('/alumni')) return 'Alumni Association ERP';
    if (path.includes('/healthcare') || path.includes('/health')) return 'Healthcare & Hospital EHR';
    if (path.includes('/hospitality')) return 'Hospitality & Resort ERP';
    if (path.includes('/government') || path.includes('/gov')) return 'Government & Municipal ERP';
    if (path.includes('/legal')) return 'Legal & Law Firm ERP';
    if (path.includes('/manufacturing') || path.includes('/uamp')) return 'Manufacturing & UAMP ERP';
    if (path.includes('/logistics')) return 'Logistics & Supply Chain ERP';
    if (path.includes('/ngo')) return 'NGO & Humanitarian ERP';
    if (path.includes('/faap')) return 'FAAP Financial Backbone';
    if (path.includes('/fintech')) return 'Universal Fintech Switch';
    if (path.includes('/aegis')) return 'AEGIS Security Platform';
    if (path.includes('/cloud')) return 'JUMO Cloud Platform';
    if (path.includes('/ai')) return 'AI Command Center';
    if (path.includes('/erp')) return 'Enterprise ERP Center';
    return 'JUMO UEOS Sovereign Workspace';
  }

  private detectModuleName(): string {
    if (typeof window === 'undefined') return 'Runtime Shell';
    const path = window.location.pathname;
    const parts = path.split('/').filter(Boolean);
    return parts.length > 1 ? parts[parts.length - 1].toUpperCase() : 'CORE_ENGINE';
  }

  public render() {
    const state = (this as any).state as State;
    if (state.hasError) {
      const platformName = this.detectPlatformName();
      const moduleName = this.detectModuleName();
      const currentRoute = typeof window !== 'undefined' ? window.location.pathname + window.location.search : '/';
      const deployEnv = process.env.NODE_ENV || 'production';
      const versionId = 'v18.0.0 Sovereign LTS';
      const errorMsg = state.error?.message || 'Unknown runtime rendering exception or missing component dependency.';
      const errorStack = state.error?.stack || '';
      const compStack = state.errorInfo?.componentStack || '';

      return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-[#0f172a] text-[#f8fafc] font-sans selection:bg-indigo-900 selection:text-indigo-100">
          <div className="max-w-3xl w-full bg-[#1e293b] p-8 rounded-2xl shadow-2xl border border-slate-700 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-700 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-rose-600 flex items-center justify-center text-white font-black text-xl shadow-md">
                  !
                </div>
                <div>
                  <h1 className="text-base font-black text-white tracking-wide uppercase">JUMO UEOS</h1>
                  <h2 className="text-xs font-bold text-rose-400 font-mono tracking-wider uppercase">APPLICATION RUNTIME ERROR</h2>
                </div>
              </div>
              <span className="px-3 py-1 bg-rose-950 text-rose-300 font-mono text-[11px] font-bold rounded-lg border border-rose-800">
                CRITICAL_INTERCEPTION
              </span>
            </div>

            <div className="space-y-2.5 bg-slate-900 p-5 rounded-xl border border-slate-800 text-xs font-mono">
              <div className="grid grid-cols-3 gap-2 py-1 border-b border-slate-800">
                <span className="text-slate-400 font-semibold">Error Message:</span>
                <span className="col-span-2 font-bold text-rose-400 break-all">{errorMsg}</span>
              </div>
              <div className="grid grid-cols-3 gap-2 py-1 border-b border-slate-800">
                <span className="text-slate-400 font-semibold">Current Route:</span>
                <span className="col-span-2 text-indigo-300 font-bold">{currentRoute}</span>
              </div>
              <div className="grid grid-cols-3 gap-2 py-1 border-b border-slate-800">
                <span className="text-slate-400 font-semibold">Environment:</span>
                <span className="col-span-2 text-emerald-400 font-bold">{deployEnv}</span>
              </div>
              <div className="grid grid-cols-3 gap-2 py-1 border-b border-slate-800">
                <span className="text-slate-400 font-semibold">Build / Version:</span>
                <span className="col-span-2 text-slate-200 font-bold">{versionId}</span>
              </div>
              <div className="grid grid-cols-3 gap-2 py-1 border-b border-slate-800">
                <span className="text-slate-400 font-semibold">Target Platform:</span>
                <span className="col-span-2 text-slate-200">{platformName}</span>
              </div>
              <div className="grid grid-cols-3 gap-2 py-1">
                <span className="text-slate-400 font-semibold">Module Context:</span>
                <span className="col-span-2 text-slate-200">{moduleName}</span>
              </div>
            </div>

            {(errorStack || compStack) && (
              <details className="text-[11px] font-mono text-slate-300 bg-slate-950 p-4 rounded-xl border border-slate-800 max-h-56 overflow-y-auto">
                <summary className="cursor-pointer text-indigo-400 font-bold hover:text-indigo-300 mb-2 uppercase tracking-wider">
                  View Component Stack & Exception Details
                </summary>
                {compStack && (
                  <div className="mb-3">
                    <span className="text-slate-500 font-bold block mb-1">Component Stack:</span>
                    <pre className="whitespace-pre-wrap break-words text-amber-300/90">{compStack}</pre>
                  </div>
                )}
                {errorStack && (
                  <div>
                    <span className="text-slate-500 font-bold block mb-1">JS Call Stack:</span>
                    <pre className="whitespace-pre-wrap break-words text-rose-300/80">{errorStack}</pre>
                  </div>
                )}
              </details>
            )}

            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <div className="flex gap-3">
                <button 
                  onClick={() => window.location.reload()} 
                  className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition shadow-md cursor-pointer flex items-center gap-1.5 uppercase tracking-wider"
                >
                  Reload Runtime
                </button>
                <button 
                  onClick={() => { window.location.href = '/'; }} 
                  className="px-5 py-2.5 bg-slate-800 text-slate-200 border border-slate-700 rounded-xl hover:bg-slate-700 text-xs font-bold transition cursor-pointer flex items-center gap-1.5 uppercase tracking-wider"
                >
                  Return to Gateway
                </button>
              </div>
              <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                Parity Safety Active
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (this as any).props.children;
  }
}

