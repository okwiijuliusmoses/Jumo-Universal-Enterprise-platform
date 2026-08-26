/**
 * JUMO UEOS — Authoritative Platform Loading Boundaries
 * Guarantees fault-tolerant rendering for sovereign ERP domain suites.
 * Microsoft 365 / Azure Console styling: White (#FFFFFF) backgrounds, slate (#F8F9FA) panels, clean borders (#E5E5E5).
 */

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Layers, ShieldAlert, Cpu } from 'lucide-react';

export interface PlatformErrorBoundaryProps {
  children: ReactNode;
  platformName?: string;
  onReset?: () => void;
}

interface PlatformErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class PlatformErrorBoundary extends React.Component<PlatformErrorBoundaryProps, PlatformErrorBoundaryState> {
  readonly props!: PlatformErrorBoundaryProps;
  public state: PlatformErrorBoundaryState = { hasError: false, error: null };
  public setState!: any;

  static getDerivedStateFromError(error: Error): PlatformErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error(`[JUMO UEOS Platform Boundary Error] ${this.props.platformName || 'ERP Domain'}:`, error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
    if (this.props.onReset) {
      this.props.onReset();
    }
  };

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className="min-h-[400px] w-full flex items-center justify-center p-8 bg-[#FFFFFF] border border-[#E5E5E5] rounded-xl font-sans">
          <div className="max-w-lg w-full text-center space-y-5">
            <div className="w-12 h-12 bg-rose-50 border border-rose-200 rounded-full flex items-center justify-center mx-auto text-rose-600 shadow-xs">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div className="space-y-1.5">
              <h3 className="text-lg font-bold text-[#1F1F1F]">
                {this.props.platformName || 'Sovereign ERP'} — Runtime Exception
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                An isolated execution fault occurred while processing this domain runtime. The AEGIS Zero-Trust kernel has isolated the fault to preserve database state integrity.
              </p>
            </div>
            {this.state.error && (
              <div className="p-3 bg-[#F8F9FA] border border-[#E5E5E5] rounded-lg text-left font-mono text-[11px] text-rose-700 overflow-x-auto max-h-32">
                {this.state.error.toString()}
              </div>
            )}
            <div className="pt-2">
              <button
                onClick={this.handleRetry}
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#0078D4] hover:bg-[#106EBE] text-white text-xs font-semibold rounded-lg shadow-xs transition cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Re-Initialize Runtime Workspace</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return (this.props as PlatformErrorBoundaryProps).children;
  }
}

export const PlatformLoadingState: React.FC<{ platformName?: string }> = ({ platformName }) => (
  <div className="min-h-[350px] w-full flex flex-col items-center justify-center p-8 bg-[#FFFFFF] border border-[#E5E5E5] rounded-xl space-y-4">
    <div className="w-10 h-10 border-3 border-[#0078D4] border-t-transparent rounded-full animate-spin" />
    <div className="text-center space-y-1">
      <h4 className="text-sm font-bold text-[#1F1F1F]">
        Initializing {platformName || 'Sovereign ERP'} Runtime...
      </h4>
      <p className="text-xs text-slate-500">
        Mounting micro-kernel boundaries, verifying Zero-Trust RBAC scopes, and connecting FAAP ledger streams.
      </p>
    </div>
  </div>
);

export const PlatformEmptyState: React.FC<{ title?: string; message?: string; onAction?: () => void; actionLabel?: string }> = ({
  title = "No Records Available",
  message = "No domain records or transactions have been posted to this workspace ledger yet.",
  onAction,
  actionLabel = "Provision First Record"
}) => (
  <div className="min-h-[280px] w-full flex flex-col items-center justify-center p-8 bg-[#F8F9FA] border border-[#E5E5E5] rounded-xl text-center space-y-3">
    <div className="w-10 h-10 bg-white border border-[#E5E5E5] rounded-full flex items-center justify-center text-slate-400 shadow-2xs">
      <Layers className="w-5 h-5" />
    </div>
    <div className="space-y-1 max-w-md">
      <h4 className="text-sm font-bold text-[#1F1F1F]">{title}</h4>
      <p className="text-xs text-slate-500 leading-relaxed">{message}</p>
    </div>
    {onAction && (
      <button
        onClick={onAction}
        className="mt-2 px-3.5 py-1.5 bg-[#0078D4] hover:bg-[#106EBE] text-white text-xs font-semibold rounded-lg shadow-xs transition cursor-pointer"
      >
        {actionLabel}
      </button>
    )}
  </div>
);

export const PlatformNotConfiguredState: React.FC<{ platformName?: string; onConfigure?: () => void }> = ({
  platformName = "Sovereign ERP",
  onConfigure
}) => (
  <div className="min-h-[320px] w-full flex flex-col items-center justify-center p-8 bg-[#FFFFFF] border border-[#E5E5E5] rounded-xl text-center space-y-4">
    <div className="w-12 h-12 bg-amber-50 border border-amber-200 rounded-full flex items-center justify-center text-amber-600 shadow-xs">
      <ShieldAlert className="w-6 h-6" />
    </div>
    <div className="space-y-1 max-w-md">
      <h3 className="text-base font-bold text-[#1F1F1F]">
        {platformName} — Configuration Pending
      </h3>
      <p className="text-xs text-slate-600 leading-relaxed">
        This domain workspace is provisioned but requires initial administrative setup and chart of accounts mapping before operations can commence.
      </p>
    </div>
    <div className="pt-1 flex items-center gap-3">
      <button
        onClick={onConfigure || (() => alert("Opening domain administrator setup wizard..."))}
        className="px-4 py-2 bg-[#0078D4] hover:bg-[#106EBE] text-white text-xs font-semibold rounded-lg shadow-xs transition cursor-pointer"
      >
        Launch Administrator Setup
      </button>
      <span className="text-xs font-mono text-slate-400">AEGIS Status: UNCONFIGURED</span>
    </div>
  </div>
);
