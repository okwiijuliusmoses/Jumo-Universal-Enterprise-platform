import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertTriangle, RefreshCw, ShieldAlert, Terminal } from "lucide-react";
import { UEOSErrorBoundary } from "../experience/components/UEOSErrorBoundary";

interface Props {
  children: ReactNode;
  fallbackTitle?: string;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("[UEOS ErrorBoundary Caught Error]:", error, errorInfo);
    this.setState({ error, errorInfo });
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  private handleClearAndReload = () => {
    if (typeof window !== "undefined") {
      localStorage.clear();
      window.location.reload();
    }
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-6 font-sans">
          <div className="max-w-2xl w-full bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden">
            <div className="bg-red-950/50 border-b border-red-900/50 p-6 flex items-center space-x-4">
              <div className="w-12 h-12 rounded-xl bg-red-600/20 border border-red-500/30 flex items-center justify-center text-red-400 shrink-0">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white tracking-tight">
                  {this.props.fallbackTitle || "JUMO UEOS Runtime Isolation Handler"}
                </h1>
                <p className="text-xs text-red-300/80 mt-1">
                  A subsystem exception occurred. Kernel boundary protection activated.
                </p>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div className="bg-slate-950 rounded-xl p-4 border border-slate-800 font-mono text-xs text-slate-300 space-y-2 overflow-x-auto">
                <div className="flex items-center space-x-2 text-red-400 font-semibold">
                  <AlertTriangle className="w-4 h-4" />
                  <span>{this.state.error?.name || "Runtime Error"}: {this.state.error?.message || "Unknown error"}</span>
                </div>
                {this.state.error?.stack && (
                  <pre className="text-[10px] text-slate-500 whitespace-pre-wrap leading-relaxed max-h-48 overflow-y-auto pt-2 border-t border-slate-800/80">
                    {this.state.error.stack}
                  </pre>
                )}
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                <button
                  onClick={this.handleReset}
                  className="w-full sm:w-auto px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold tracking-wider uppercase transition-all flex items-center justify-center space-x-2 shadow-lg shadow-blue-600/20"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Retry Subsystem</span>
                </button>
                <button
                  onClick={this.handleClearAndReload}
                  className="w-full sm:w-auto px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold tracking-wider uppercase transition-all flex items-center justify-center space-x-2 border border-slate-700"
                >
                  <Terminal className="w-4 h-4" />
                  <span>Reset Cache & Reload Kernel</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export { UEOSErrorBoundary };
export default ErrorBoundary;

