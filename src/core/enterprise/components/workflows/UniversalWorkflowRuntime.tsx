import React, { useState } from 'react';
import { 
  CheckCircle, Clock, AlertCircle, ArrowRight, ShieldCheck, 
  UserCheck, History, CornerDownRight, MessageSquare, AlertTriangle,
  RotateCcw, Send, FileCheck, Check
} from 'lucide-react';
import { WorkflowEngine, WorkflowState as EngineState } from '../../services/WorkflowEngine';

export type RuntimeWorkflowState = 'DRAFT' | 'SUBMITTED' | 'VERIFIED' | 'APPROVED' | 'POSTED' | 'REJECTED';

export interface WorkflowTransitionProps {
  recordId: string;
  formId?: string;
  moduleName?: string;
  initialState?: RuntimeWorkflowState;
  onStateChange?: (newState: RuntimeWorkflowState) => void;
}

export const UniversalWorkflowRuntime: React.FC<WorkflowTransitionProps> = ({
  recordId,
  formId = 'GENERIC',
  moduleName = 'Institutional Module',
  initialState = 'DRAFT' as RuntimeWorkflowState,
  onStateChange
}) => {
  const [comments, setComments] = useState('');
  const [activeActor, setActiveActor] = useState('Senior Verification Officer');
  const [refreshKey, setRefreshKey] = useState(0);

  // Retrieve instance from WorkflowEngine
  let instance: any = WorkflowEngine.getInstance().getWorkflowForRecord(recordId);
  if (!instance && recordId) {
    try {
      instance = WorkflowEngine.getInstance().initialize(formId, recordId);
    } catch {
      // already exists
    }
  }

  const currentState: RuntimeWorkflowState = (instance?.currentState as RuntimeWorkflowState) || initialState;
  const history = instance?.history || [
    {
      from: 'DRAFT' as EngineState,
      to: 'DRAFT' as EngineState,
      actor: 'System Registrar',
      timestamp: new Date().toISOString(),
      justification: 'Initial record genesis in sovereign ledger.'
    }
  ];

  const handleTransition = (nextState: RuntimeWorkflowState) => {
    let rejectionReason = '';
    if (nextState === 'REJECTED') {
      rejectionReason = prompt('Please enter mandatory justification for rejection / remand:') || '';
      if (!rejectionReason) return;
    }

    try {
      if (instance) {
        const engineState: EngineState = nextState === 'POSTED' ? 'ACTIVE' : (nextState as EngineState);
        WorkflowEngine.getInstance().transition(
          instance.id, 
          engineState, 
          activeActor, 
          comments || rejectionReason || `Transitioned to ${nextState}`
        );
      }
      setComments('');
      setRefreshKey(k => k + 1);
      onStateChange?.(nextState);
    } catch (e: any) {
      alert(e.message || 'Workflow transition failed.');
    }
  };

  const steps: { state: RuntimeWorkflowState; label: string; role: string; desc: string }[] = [
    { state: 'DRAFT', label: '1. Draft Genesis', role: 'Data Clerk', desc: 'Record captured by desk officer' },
    { state: 'SUBMITTED', label: '2. Submitted for Review', role: 'Registrar / Maker', desc: 'Committed to verification queue' },
    { state: 'VERIFIED', label: '3. Compliance Verified', role: 'Senior Verification Lead', desc: 'Institutional audit check' },
    { state: 'APPROVED', label: '4. Executive Approval', role: 'Priest / Dean / Controller', desc: 'Authoritative sign-off' },
    { state: 'POSTED', label: '5. Ledger Finalized', role: 'Sovereign Kernel', desc: 'Immutable post to FAAP ledger' }
  ];

  const getStateIndex = (st: RuntimeWorkflowState) => {
    if (st === 'REJECTED') return -1;
    return steps.findIndex(s => s.state === st);
  };

  const currentIndex = getStateIndex(currentState);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
      {/* HEADER */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">
              {moduleName} — Institutional Workflow Pipeline
            </h3>
            <p className="text-[10px] text-slate-500 font-medium">
              Record ID: <span className="font-mono font-bold text-slate-700">{recordId}</span> | State: <span className="font-bold text-slate-900">{currentState}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
            currentState === 'POSTED' || currentState === 'APPROVED' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
            currentState === 'REJECTED' ? 'bg-red-50 text-red-700 border border-red-200' :
            'bg-amber-50 text-amber-700 border border-amber-200'
          }`}>
            Status: {currentState}
          </span>
        </div>
      </div>

      {/* PIPELINE VISUALIZER */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
        {steps.map((step, idx) => {
          const isPassed = currentIndex > idx;
          const isCurrent = currentIndex === idx;
          return (
            <div 
              key={step.state}
              className={`p-3 rounded-xl border transition-all ${
                isCurrent 
                  ? 'border-slate-900 bg-slate-900 text-white shadow-md' 
                  : isPassed 
                    ? 'border-emerald-200 bg-emerald-50/50 text-slate-800' 
                    : 'border-slate-100 bg-slate-50/50 text-slate-400'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className={`text-[10px] font-black uppercase tracking-tight ${isCurrent ? 'text-white' : isPassed ? 'text-emerald-700' : 'text-slate-500'}`}>
                  {step.label}
                </span>
                {isPassed && <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />}
                {isCurrent && <Clock className="w-3.5 h-3.5 text-amber-300 animate-spin" />}
              </div>
              <div className={`text-[9px] font-bold ${isCurrent ? 'text-slate-300' : 'text-slate-500'}`}>
                Role: {step.role}
              </div>
              <p className={`text-[9px] mt-1 line-clamp-2 ${isCurrent ? 'text-slate-400' : 'text-slate-400'}`}>
                {step.desc}
              </p>
            </div>
          );
        })}
      </div>

      {/* ACTION & ACTOR CONTROLS */}
      <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <UserCheck className="w-4 h-4 text-slate-600" />
            <span className="text-[10px] font-black text-slate-700 uppercase tracking-wider">Simulated Acting Officer:</span>
            <select
              value={activeActor}
              onChange={e => setActiveActor(e.target.value)}
              className="bg-white border border-slate-300 rounded-lg px-2.5 py-1 text-xs font-bold text-slate-800 focus:outline-none"
            >
              <option value="Senior Verification Officer">Senior Verification Officer</option>
              <option value="Institutional Bursar / Accountant">Institutional Bursar / Accountant</option>
              <option value="Parish Priest / Vicar">Parish Priest / Vicar</option>
              <option value="Headteacher / Principal">Headteacher / Principal</option>
              <option value="Compliance Auditor">Compliance Auditor</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            {currentState === 'DRAFT' && (
              <button
                onClick={() => handleTransition('SUBMITTED')}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-[10px] font-black uppercase tracking-wider flex items-center gap-2 shadow-sm transition-all"
              >
                <Send className="w-3.5 h-3.5" /> Submit for Verification
              </button>
            )}

            {currentState === 'SUBMITTED' && (
              <>
                <button
                  onClick={() => handleTransition('VERIFIED')}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-[10px] font-black uppercase tracking-wider flex items-center gap-2 shadow-sm transition-all"
                >
                  <FileCheck className="w-3.5 h-3.5" /> Verify & Recommend
                </button>
                <button
                  onClick={() => handleTransition('REJECTED')}
                  className="px-3 py-2 bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 rounded-xl text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5 transition-all"
                >
                  <AlertTriangle className="w-3.5 h-3.5" /> Reject / Remand
                </button>
              </>
            )}

            {currentState === 'VERIFIED' && (
              <>
                <button
                  onClick={() => handleTransition('APPROVED')}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-[10px] font-black uppercase tracking-wider flex items-center gap-2 shadow-sm transition-all"
                >
                  <Check className="w-3.5 h-3.5" /> Approve Institutional Record
                </button>
                <button
                  onClick={() => handleTransition('REJECTED')}
                  className="px-3 py-2 bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 rounded-xl text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5 transition-all"
                >
                  <AlertTriangle className="w-3.5 h-3.5" /> Remand
                </button>
              </>
            )}

            {currentState === 'APPROVED' && (
              <button
                onClick={() => handleTransition('POSTED')}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-[10px] font-black uppercase tracking-wider flex items-center gap-2 shadow-sm transition-all"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Post to Sovereign Ledger
              </button>
            )}

            {currentState === 'REJECTED' && (
              <button
                onClick={() => handleTransition('DRAFT')}
                className="px-4 py-2 bg-slate-700 hover:bg-slate-800 text-white rounded-xl text-[10px] font-black uppercase tracking-wider flex items-center gap-2 shadow-sm transition-all"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Re-open as Draft
              </button>
            )}

            {currentState === 'POSTED' && (
              <div className="flex items-center gap-1.5 text-emerald-700 font-bold text-xs bg-emerald-100/60 px-3 py-1.5 rounded-lg">
                <CheckCircle className="w-4 h-4 text-emerald-600" /> Sealed & Committed
              </div>
            )}
          </div>
        </div>

        <div>
          <input
            type="text"
            placeholder="Add transition audit comments / rationale..."
            value={comments}
            onChange={e => setComments(e.target.value)}
            className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900"
          />
        </div>
      </div>

      {/* AUDIT TRAIL HISTORY */}
      <div className="space-y-3">
        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
          <History className="w-3.5 h-3.5" /> Institutional Audit Trail & Transition Log
        </h4>
        <div className="border border-slate-100 rounded-xl divide-y divide-slate-100 bg-slate-50/50">
          {history.map((h: any, i: number) => (
            <div key={i} className="p-3 flex items-start justify-between text-xs">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[9px] bg-slate-200 px-2 py-0.5 rounded font-bold text-slate-700">
                    {h.from} → {h.to}
                  </span>
                  <span className="font-bold text-slate-800">{h.actor}</span>
                </div>
                <p className="text-slate-600 text-[11px] italic">
                  "{h.justification || h.comments || 'Status updated.'}"
                </p>
              </div>
              <span className="text-[9px] text-slate-400 font-medium">
                {new Date(h.timestamp).toLocaleTimeString()} · {new Date(h.timestamp).toLocaleDateString()}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
