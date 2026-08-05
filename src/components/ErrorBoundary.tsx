import React, { Component, ErrorInfo, ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state: ErrorBoundaryState = { hasError: false };

  constructor(props: ErrorBoundaryProps) {
    super(props);
  }

  public static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('[UEOS Workspace Shell ErrorBoundary Caught Error]:', error, errorInfo);
    this.setState({ hasError: true, error });
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-6 font-sans text-slate-100">
          <div className="max-w-lg w-full bg-slate-800 p-8 rounded-2xl border border-rose-500/30 shadow-2xl text-center space-y-4">
            <div className="w-12 h-12 bg-rose-500/20 text-rose-400 rounded-full flex items-center justify-center mx-auto text-xl font-bold">
              !
            </div>
            <h2 className="text-xl font-bold text-rose-400">UEOS Workspace Runtime Exception</h2>
            <div className="text-xs text-slate-300 text-left overflow-auto max-h-40 bg-slate-950 p-2 rounded">
              <p className="font-bold">{this.state.error?.message}</p>
              <pre className="mt-2">{this.state.error?.stack}</pre>
            </div>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-lg transition shadow-sm cursor-pointer"
            >
              Reload Application Workspace
            </button>
          </div>
        </div>
      );
    }

    return this.props.children || null;
  }
}
