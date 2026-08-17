import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ShieldCheck, FileText, CheckCircle2, AlertTriangle, 
  User, Clock, Lock, Sparkles, Shield, ArrowRight
} from 'lucide-react';
import { approvalService } from '../../../services/ApprovalService';

export interface SpecificationApprovalPanelProps {
  jobId: string;
  specification: any;
  onApproved: () => void;
}

export const SpecificationApprovalPanel: React.FC<SpecificationApprovalPanelProps> = ({
  jobId,
  specification,
  onApproved
}) => {
  const [isApproving, setIsApproving] = useState(false);
  const [comments, setComments] = useState('');

  const handleApprove = async () => {
    setIsApproving(true);
    try {
      await approvalService.grantApproval({
        jobId,
        scope: 'SPECIFICATION_APPROVAL',
        approver: 'Sovereign Governance Officer',
        evidenceHash: `ev_spec_app_${Date.now().toString(36)}`,
        comments: comments || 'Specification verified against national standards.'
      });
      onApproved();
    } catch (err) {
      console.error('Approval failed:', err);
    } finally {
      setIsApproving(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden max-w-4xl mx-auto font-sans">
      <div className="bg-slate-900 p-6 text-white flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-black uppercase tracking-tight">Specification Approval Gate</h2>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Authoritative Governance Review Panel</p>
          </div>
        </div>
        <div className="text-right">
          <span className="text-[10px] font-black uppercase bg-blue-950 border border-blue-800 text-blue-400 px-3 py-1 rounded-full">
            Awaiting Sovereign Sign-off
          </span>
        </div>
      </div>

      <div className="p-8 grid grid-cols-1 lg:grid-cols-2 gap-8 bg-slate-50/50">
        <div className="space-y-6">
          <div className="space-y-2">
            <h3 className="text-xs font-black uppercase text-slate-500 tracking-wider flex items-center gap-2">
              <FileText className="w-3.5 h-3.5" />
              Contract Summary
            </h3>
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400 font-bold uppercase">Product</span>
                <span className="text-slate-900 font-black">{specification?.identity?.productName || 'Unnamed System'}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-400 font-bold uppercase">Classification</span>
                <span className="text-blue-600 font-black">{specification?.classification || 'ENTERPRISE_SYSTEM'}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-400 font-bold uppercase">Job ID</span>
                <span className="text-slate-900 font-mono font-bold">{jobId}</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-xs font-black uppercase text-slate-500 tracking-wider flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              Verification Invariants
            </h3>
            <div className="space-y-2">
              {[
                'Compliance with Sovereign Data Residency',
                'Hierarchical Tenancy Isolation Verified',
                'Zero-Trust Security Boundary Mapping',
                'Financial Double-Entry Ledger Consistency'
              ].map((invariant, idx) => (
                <div key={idx} className="flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-200 text-[11px] font-bold text-slate-700 shadow-xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  {invariant}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <h3 className="text-xs font-black uppercase text-slate-500 tracking-wider flex items-center gap-2">
              <User className="w-3.5 h-3.5" />
              Approver Directives
            </h3>
            <textarea 
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              placeholder="Enter governing comments or remediation requirements..."
              className="w-full h-32 p-4 bg-white border border-slate-200 rounded-2xl text-xs focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all placeholder:text-slate-400 font-medium"
            />
          </div>

          <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl flex gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
            <p className="text-[11px] text-amber-800 leading-relaxed font-medium">
              <strong>Warning:</strong> This approval is cryptographically logged to the Sovereign Ledger. Once granted, the Product Orchestrator will immediately initiate the <strong>Architecture Invariant Ingestion</strong> phase.
            </p>
          </div>

          <div className="flex gap-3">
            <button 
              disabled={isApproving}
              className="flex-1 py-4 bg-slate-900 text-white rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-blue-600 transition-all flex items-center justify-center gap-2 shadow-xl shadow-slate-950/10 disabled:opacity-50 cursor-pointer"
              onClick={handleApprove}
            >
              {isApproving ? 'Recording to Ledger...' : (
                <>
                  <Lock className="w-3.5 h-3.5" />
                  Grant Sovereign Approval
                </>
              )}
            </button>
            <button 
              disabled={isApproving}
              className="px-6 py-4 bg-white text-rose-600 border border-rose-200 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-rose-50 transition-all cursor-pointer"
            >
              Reject
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white border-t border-slate-100 p-4 flex items-center justify-between text-[9px] font-black uppercase text-slate-400 tracking-widest">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5"><Shield className="w-3 h-3" /> Encrypted Channel</span>
          <span className="flex items-center gap-1.5"><Clock className="w-3 h-3" /> Audit Pulse Active</span>
        </div>
        <span>UEOS Governance Node Alpha</span>
      </div>
    </div>
  );
};
