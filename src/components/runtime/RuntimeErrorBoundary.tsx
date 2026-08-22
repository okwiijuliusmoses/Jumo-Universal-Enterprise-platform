import React, { ErrorInfo, ReactNode } from 'react';
import { ShieldAlert, RefreshCw, ArrowLeft, Terminal } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
  runtimeId: string;
}

export class RuntimeErrorBoundary extends React.Component<Props, State> {
  readonly props!: Props;

  public state: State = {
    hasError: false,
    runtimeId: `ueos-err-${Math.random().toString(36).substring(2, 9)}`
  };

  public static getDerivedStateFromError(error: Error): State {
    return { 
      hasError: true, 
      error,
      runtimeId: `ueos-err-${Math.random().toString(36).substring(2, 9)}`
    };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("JUMO UEOS Production Runtime Failure Intercepted:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      const errorMsg = this.state.error?.message || 'Unknown runtime rendering exception or unhandled promise rejection.';

      return (
        <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-6 font-sans">
          <div className="max-w-xl w-full bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400">
                  <ShieldAlert className="h-6 w-6" />
                </div>
                <div>
                  <h1 className="text-sm font-bold text-slate-100 uppercase tracking-wide">JUMO UEOS Runtime Error</h1>
                  <p className="text-[11px] font-mono text-red-400 mt-0.5">Execution Interrupted • Zero-Trust Guard Active</p>
                </div>
              </div>
              <span className="text-[10px] font-mono bg-slate-950 border border-slate-800 text-slate-400 px-2.5 py-1 rounded-md">
                {this.state.runtimeId}
              </span>
            </div>

            <div className="space-y-3 bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs font-mono">
              <div className="flex justify-between py-1 border-b border-slate-900">
                <span className="text-slate-500">Path:</span>
                <span className="text-slate-300">{typeof window !== 'undefined' ? window.location.pathname : 'N/A'}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500">Error:</span>
                <span className="text-red-400 max-w-[300px] truncate">{errorMsg}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => {
                  localStorage.removeItem('jumo_current_user');
                  window.location.href = '/public';
                }}
                className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold px-4 py-2 rounded-xl text-xs flex items-center gap-2 transition cursor-pointer"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Return To Login</span>
              </button>
              
              <button
                onClick={() => window.location.reload()}
                className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-2 transition shadow-lg shadow-indigo-600/20 cursor-pointer"
              >
                <RefreshCw className="h-4 w-4" />
                <span>Retry Runtime</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
