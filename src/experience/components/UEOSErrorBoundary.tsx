import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle } from 'lucide-react';

interface Props {
  children: ReactNode;
  componentName?: string;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class UEOSErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error(`[UEOS_ERROR_BOUNDARY] Error in ${this.props.componentName || 'component'}:`, error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="p-8 bg-rose-50 border border-rose-200 rounded-2xl flex flex-col items-center justify-center text-center">
          <AlertTriangle className="w-12 h-12 text-rose-500 mb-4" />
          <h2 className="text-lg font-black text-rose-900 uppercase tracking-tight">Studio Failure</h2>
          <p className="text-xs text-rose-600 mt-2 max-w-md">
            The {this.props.componentName || 'requested component'} encountered a fatal exception and was quarantined by the shell.
          </p>
          <div className="mt-6 p-3 bg-white/50 rounded-xl text-[10px] font-mono text-rose-800 text-left w-full overflow-x-auto">
            {this.state.error?.message}
          </div>
          <button 
            onClick={() => this.setState({ hasError: false, error: null })}
            className="mt-6 px-6 py-2 bg-rose-600 text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-rose-700 transition-all"
          >
            Attempt Reconciliation
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
