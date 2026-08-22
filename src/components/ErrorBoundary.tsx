import React, { ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  name?: string;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends React.Component<Props, State> {
  readonly props!: Props;

  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error(`JUMO UEOS Runtime Uncaught Error in ${this.props.name || 'Component'}:`, error, errorInfo);
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
    if (this.state.hasError) {
      const platformName = this.detectPlatformName();
      const moduleName = this.detectModuleName();
      const errorMsg = this.state.error?.message || 'Unknown runtime rendering exception or missing component dependency.';
      const errorStack = this.state.error?.stack || '';

      return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-[#FFFFFF] text-[#1F1F1F] font-sans selection:bg-blue-100">
          <div className="max-w-2xl w-full bg-[#F8F9FA] p-8 rounded-xl shadow-md border border-[#E5E5E5] space-y-6">
            <div className="flex items-center justify-between border-b border-[#E5E5E5] pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-red-600 flex items-center justify-center text-white font-bold text-lg shadow-sm">
                  !
                </div>
                <div>
                  <h1 className="text-lg font-bold text-[#1F1F1F] tracking-tight uppercase">JUMO PLATFORM RUNTIME ERROR</h1>
                  <p className="text-xs text-slate-500 font-mono">Sovereign Layer-13 Execution Interrupted</p>
                </div>
              </div>
              <span className="px-2.5 py-1 bg-red-100 text-red-700 font-mono text-[11px] font-semibold rounded border border-red-200">
                ERR_RUNTIME_PARITY
              </span>
            </div>

            <div className="space-y-3 bg-white p-5 rounded-lg border border-[#E5E5E5] text-xs">
              <div className="grid grid-cols-3 gap-2 py-1 border-b border-slate-100">
                <span className="text-slate-500 font-semibold">Platform:</span>
                <span className="col-span-2 font-bold text-[#1F1F1F]">{platformName}</span>
              </div>
              <div className="grid grid-cols-3 gap-2 py-1 border-b border-slate-100">
                <span className="text-slate-500 font-semibold">Module:</span>
                <span className="col-span-2 font-mono text-[#0078D4] font-medium">{moduleName}</span>
              </div>
              <div className="grid grid-cols-3 gap-2 py-1">
                <span className="text-slate-500 font-semibold">Error Details:</span>
                <span className="col-span-2 text-red-600 font-mono break-all">{errorMsg}</span>
              </div>
            </div>

            {errorStack && (
              <details className="text-[11px] font-mono text-slate-600 bg-white p-3 rounded border border-[#E5E5E5] max-h-40 overflow-y-auto">
                <summary className="cursor-pointer text-slate-500 font-semibold hover:text-[#0078D4] mb-2">View Diagnostics Stack Trace</summary>
                <pre className="whitespace-pre-wrap break-words">{errorStack}</pre>
              </details>
            )}

            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#E5E5E5]">
              <div className="flex gap-2">
                <button 
                  onClick={() => window.location.reload()} 
                  className="px-4 py-2 bg-[#0078D4] text-white rounded-lg hover:bg-blue-700 text-xs font-semibold transition shadow-xs cursor-pointer flex items-center gap-1.5"
                >
                  Reload Runtime
                </button>
                <button 
                  onClick={() => { window.location.href = '/platform/store'; }} 
                  className="px-4 py-2 bg-white text-[#1F1F1F] border border-[#E5E5E5] rounded-lg hover:bg-slate-100 text-xs font-semibold transition cursor-pointer flex items-center gap-1.5"
                >
                  Return to Platform Store
                </button>
              </div>
              <button 
                onClick={() => {
                  alert(`DIAGNOSTICS REPORT:\nPlatform: ${platformName}\nModule: ${moduleName}\nPath: ${window.location.pathname}\nError: ${errorMsg}\n\nSolution: Check domain routing table and ensure platform is running in an isolated sovereign workspace shell.`);
                }} 
                className="px-4 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 text-xs font-semibold transition cursor-pointer"
              >
                View Diagnostics
              </button>
            </div>
          </div>
        </div>
      );
    }

    return (this.props as Props).children;
  }
}
