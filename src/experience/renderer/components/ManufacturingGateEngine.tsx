// JUMO UEOS — Authoritative Manufacturing Gate Review Component
// Replaces static buttons with a gate state machine, prerequisite validator, & decision matrix.

import React, { useState } from 'react';
import { 
  ShieldCheck, AlertTriangle, CheckCircle2, Clock, FileText, 
  UserCheck, Shield, ChevronRight, Lock, Unlock, AlertCircle, Sparkles
} from 'lucide-react';
import { 
  ManufacturingGateEngine as GateEngineService, 
  GateDecisionType, 
  GateExecutionResult 
} from '../../../core/factory/gates/ManufacturingGateEngine';
import { ProductManufacturingJob } from '../../../core/factory/registry/HubRegistryTypes';

export interface ManufacturingGateEngineProps {
  job: ProductManufacturingJob;
  onDecisionExecuted?: (result: GateExecutionResult) => void;
}

export const ManufacturingGateEngineComponent: React.FC<ManufacturingGateEngineProps> = ({ job, onDecisionExecuted }) => {
  const gateService = GateEngineService.getInstance();
  const evalResult = gateService.evaluateGate(job);

  const [selectedDecision, setSelectedDecision] = useState<GateDecisionType>('APPROVE');
  const [feedbackNotes, setFeedbackNotes] = useState<string>('');
  const [conditionsText, setConditionsText] = useState<string>('');
  const [reviewerName, setReviewerName] = useState<string>('National Chief Governor');
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [lastResult, setLastResult] = useState<GateExecutionResult | null>(null);

  const handleExecute = () => {
    setIsExecuting(true);
    const conditions = conditionsText ? conditionsText.split('\n').filter(Boolean) : undefined;

    const result = gateService.executeDecision({
      jobId: job.id,
      gateType: evalResult.gateType,
      decision: selectedDecision,
      reviewerName,
      reviewerRole: evalResult.requiredAuthorityRole,
      feedbackNotes,
      conditions,
      severity: evalResult.riskLevel
    });

    setIsExecuting(false);
    setLastResult(result);
    if (onDecisionExecuted) {
      onDecisionExecuted(result);
    }
  };

  const getDecisionBadge = (decision: GateDecisionType) => {
    switch (decision) {
      case 'APPROVE': return 'bg-emerald-600 text-white';
      case 'APPROVE_WITH_CONDITIONS': return 'bg-teal-600 text-white';
      case 'REJECT': return 'bg-red-600 text-white';
      case 'REQUEST_CORRECTION': return 'bg-amber-600 text-white';
      case 'REQUEST_EVIDENCE': return 'bg-blue-600 text-white';
      case 'ESCALATE': return 'bg-purple-600 text-white';
      case 'DELEGATE': return 'bg-indigo-600 text-white';
      case 'PAUSE': return 'bg-slate-700 text-white';
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-6 shadow-xs">
      {/* Header & Gate Status Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 bg-purple-50 text-purple-700 border border-purple-200 rounded font-mono font-bold text-[10px] uppercase">
              {evalResult.gateType}
            </span>
            <span className="text-xs font-mono text-slate-400">Target Authority: {evalResult.requiredAuthorityRole}</span>
          </div>
          <h2 className="text-base font-black uppercase text-slate-900 tracking-wider mt-1 flex items-center space-x-2">
            <ShieldCheck className="w-5 h-5 text-indigo-600" />
            <span>Authoritative Governance Review Gate</span>
          </h2>
        </div>

        <div className="flex items-center space-x-2">
          <span className={`px-3 py-1 rounded-lg border font-mono font-black text-xs uppercase ${
            evalResult.riskLevel === 'LOW' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
            evalResult.riskLevel === 'MEDIUM' ? 'bg-amber-50 text-amber-700 border-amber-200' :
            'bg-red-50 text-red-700 border-red-200'
          }`}>
            Risk Level: {evalResult.riskLevel}
          </span>
        </div>
      </div>

      {/* Prerequisites Checklist */}
      <div className="space-y-3">
        <h3 className="text-xs font-mono font-black uppercase text-slate-400">Gate Prerequisite Verification Matrix</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {evalResult.prerequisites.map((p) => (
            <div key={p.id} className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900">{p.name}</span>
                <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase ${
                  p.status === 'PASSED' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                }`}>
                  {p.status}
                </span>
              </div>
              <p className="text-[11px] text-slate-500">{p.details}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Evidence Snapshot */}
      <div className="p-4 bg-slate-900 text-white rounded-xl space-y-2 font-mono text-xs">
        <div className="text-[10px] text-slate-400 uppercase font-black">Attached Cryptographic Evidence Snapshot</div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-[11px]">
          <div><span className="text-slate-400">SPEC Verified:</span> <span className="text-emerald-400 font-bold">{evalResult.evidenceSnapshot.specVerified ? 'YES' : 'NO'}</span></div>
          <div><span className="text-slate-400">ARCH Contract:</span> <span className="text-emerald-400 font-bold">{evalResult.evidenceSnapshot.archContractLocked ? 'LOCKED' : 'OPEN'}</span></div>
          <div><span className="text-slate-400">Pass Rate:</span> <span className="text-emerald-400 font-bold">{evalResult.evidenceSnapshot.verificationPassRate}%</span></div>
          <div><span className="text-slate-400">Modules:</span> <span className="text-emerald-400 font-bold">{evalResult.evidenceSnapshot.compiledModulesCount}</span></div>
        </div>
        <div className="text-[10px] text-slate-400 truncate pt-1 border-t border-slate-800">
          SHA-256 Digest: {evalResult.evidenceSnapshot.sha256Digest}
        </div>
      </div>

      {/* Authoritative Decision Matrix */}
      <div className="space-y-4 border-t border-slate-100 pt-4">
        <h3 className="text-xs font-mono font-black uppercase text-slate-400">Authoritative Governance Decision Options</h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {evalResult.allowedDecisions.map((dec) => (
            <button
              key={dec}
              onClick={() => setSelectedDecision(dec)}
              className={`p-2.5 rounded-xl border text-xs font-mono font-bold uppercase transition-all ${
                selectedDecision === dec 
                  ? `${getDecisionBadge(dec)} border-transparent shadow-md` 
                  : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              {dec.replace(/_/g, ' ')}
            </button>
          ))}
        </div>

        {/* Conditional inputs */}
        {selectedDecision === 'APPROVE_WITH_CONDITIONS' && (
          <div className="space-y-1">
            <label className="text-[10px] font-mono font-bold text-slate-500 uppercase">Mandatory Compliance Conditions (One per line)</label>
            <textarea
              rows={2}
              value={conditionsText}
              onChange={(e) => setConditionsText(e.target.value)}
              placeholder="e.g. Continuous SLA telemetry logging enabled&#10;FAAP transaction journal audit active"
              className="w-full p-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-purple-500 font-mono"
            />
          </div>
        )}

        <div className="space-y-1">
          <label className="text-[10px] font-mono font-bold text-slate-500 uppercase">Reviewer Feedback & Audit Justification</label>
          <textarea
            rows={2}
            value={feedbackNotes}
            onChange={(e) => setFeedbackNotes(e.target.value)}
            placeholder="Provide engineering audit notes or corrective instructions..."
            className="w-full p-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-purple-500 font-sans"
          />
        </div>

        {/* Action Button */}
        <div className="flex items-center justify-between pt-2">
          <div className="text-xs font-mono text-slate-500">
            Reviewer: <span className="font-bold text-slate-800">{reviewerName}</span>
          </div>

          <button
            onClick={handleExecute}
            disabled={isExecuting}
            className={`px-6 py-2.5 rounded-xl text-xs font-mono font-black uppercase transition-all flex items-center space-x-2 shadow-md ${getDecisionBadge(selectedDecision)} hover:opacity-90`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Execute Decision ({selectedDecision.replace(/_/g, ' ')})</span>
          </button>
        </div>

        {lastResult && (
          <div className={`p-3 rounded-xl text-xs font-mono border ${lastResult.success ? 'bg-emerald-50 text-emerald-800 border-emerald-200' : 'bg-red-50 text-red-800 border-red-200'}`}>
            <div className="font-bold">{lastResult.message}</div>
            <div className="text-[10px] opacity-80 mt-0.5">Audit Hash: {lastResult.auditDigest}</div>
          </div>
        )}
      </div>
    </div>
  );
};
