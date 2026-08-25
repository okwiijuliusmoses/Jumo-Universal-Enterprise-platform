import * as React from 'react';
import { AlertTriangle, RefreshCw, Activity, Cpu } from 'lucide-react';

interface Props {
  children: React.ReactNode;
  capabilityId?: string;
  moduleId?: string;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
}

export class RuntimeReliabilityAgentBoundary extends React.Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  public componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    (this as any).setState({ errorInfo });
    
    // Log to autonomous diagnostics
    console.error("Runtime Reliability Agent Detected Failure:", {
      error: error.message,
      moduleId: (this as any).props.moduleId,
      capabilityId: (this as any).props.capabilityId,
      stack: errorInfo.componentStack
    });
  }

  private handleReset = () => {
    (this as any).setState({ hasError: false, error: null, errorInfo: null });
  };

  public render() {
    if ((this as any).state.hasError) {
      return (
        <div className="p-8 bg-white border-2 border-rose-100 rounded-3xl shadow-xl space-y-6 animate-in zoom-in duration-300">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-rose-50 rounded-2xl flex items-center justify-center text-rose-600 border border-rose-100">
              <Activity className="w-8 h-8 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2 text-rose-600 text-[10px] font-black uppercase tracking-[0.2em] mb-1">
                <Cpu className="w-3.5 h-3.5" />
                Runtime Reliability Agent Intervention
              </div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">System Parity Failure Detected</h2>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl font-mono text-xs text-slate-600 space-y-2">
            <div className="flex items-center gap-2 text-rose-700 font-bold">
              <AlertTriangle className="w-4 h-4" />
              DIAGNOSIS: {(this as any).state.error?.message || "Uncaught property access failure"}
            </div>
            <div className="pt-2 border-t border-slate-200">
              <span className="text-slate-400">Target Module:</span> <span className="font-bold text-slate-900">{(this as any).props.moduleId || "UNKNOWN"}</span>
            </div>
            <div>
              <span className="text-slate-400">Component Context:</span> <span className="font-bold text-slate-900">{(this as any).props.capabilityId || "ROOT_CONTEXT"}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={this.handleReset}
              className="flex-1 py-3 bg-slate-900 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-slate-800 transition flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Attempt Autonomous Repair
            </button>
            <button
              onClick={() => window.location.reload()}
              className="flex-1 py-3 bg-white border border-slate-200 text-slate-900 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-slate-50 transition"
            >
              Hard Reset Runtime
            </button>
          </div>

          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider text-center">
            Independent Verification Boundary Maintained • Parity Offset: $0.00
          </p>
        </div>
      );
    }

    return (this as any).props.children;
  }
}
