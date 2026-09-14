import React, { ErrorInfo, ReactNode } from "react";
import { AlertCircle, RefreshCw, Terminal } from "lucide-react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  componentName?: string;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class UEOSErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error(`UEOS Runtime Exception [${this.props.componentName || "Unknown"}]:`, error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="bg-white border-2 border-rose-100 rounded-[3rem] p-12 shadow-xl flex flex-col items-center justify-center text-center animate-in fade-in zoom-in duration-500 min-h-[400px]">
          <div className="w-20 h-20 bg-rose-50 text-rose-600 rounded-[2rem] flex items-center justify-center mb-8 border border-rose-100 shadow-inner">
            <AlertCircle className="w-10 h-10" />
          </div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-4 uppercase italic">Runtime Exception Detected</h2>
          <p className="text-slate-500 font-bold text-lg max-w-xl mb-8 leading-relaxed">
            The {this.props.componentName || "active workspace"} encountered a critical failure. JUMO UEOS kernel remains stable.
          </p>
          
          <div className="bg-slate-900 text-rose-400 p-6 rounded-2xl font-mono text-[10px] text-left w-full max-w-2xl mb-8 overflow-x-auto border border-slate-800 shadow-2xl">
            <div className="flex items-center gap-2 mb-3 border-b border-slate-800 pb-2">
              <Terminal className="w-3 h-3" />
              <span className="uppercase tracking-widest font-black">Kernel Panic Trace</span>
            </div>
            <p className="break-words font-bold">{this.state.error?.message}</p>
            <p className="text-slate-500 mt-2 opacity-50">Stack trace suppressed for security. Check SecOps audit logs.</p>
          </div>

          <button 
            onClick={() => this.setState({ hasError: false, error: null })}
            className="flex items-center gap-3 px-8 py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-600 transition-all shadow-xl active:scale-95"
          >
            <RefreshCw className="w-4 h-4" /> Reset Workspace State
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
