// JUMO UEOS — Authoritative Job Node Dossier & Truth Audit View
// Provides deep engineering examination, configuration validation, standards mappings, and real-time truth mode analysis.
// Standard: JDPM-DOSSIER-UI-9003

import React from 'react';
import { 
  ShieldCheck, AlertTriangle, Cpu, Server, Layers, Database, 
  Workflow, FileText, Activity, Clock, CheckCircle2, Award, 
  Info, ExternalLink, RefreshCw, BarChart2, Check, Lock, Unlock, Zap
} from 'lucide-react';
import { useJobTree } from '../../shell/JobTreeProvider';

export const JobNodeDossier: React.FC = () => {
  const { selectedNode, artifactDetails, activeJob, qualityMetrics } = useJobTree();

  if (!activeJob || !selectedNode || !artifactDetails) {
    return (
      <div className="p-8 text-center bg-white border border-slate-200 rounded-3xl shadow-xs h-[580px] flex flex-col justify-center items-center">
        <Activity className="w-10 h-10 text-slate-400 mb-2 animate-pulse" />
        <p className="text-xs font-bold text-slate-800">Select an Artifact Node to Begin Examination</p>
        <p className="text-[10px] text-slate-400 mt-1">Select any item from the Active Job Artifact Tree to view its complete truth profile.</p>
      </div>
    );
  }

  const isEduOS = activeJob.productName?.toUpperCase().includes('ATUTUR') || activeJob.ecosystemDomain === 'EDUCATION_OS';

  return (
    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs h-[580px] flex flex-col">
      {/* Header Panel */}
      <div className="bg-slate-900 text-white p-4 shrink-0">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 bg-indigo-950 text-indigo-400 border border-indigo-900 rounded text-[9px] font-mono font-bold uppercase">
                {selectedNode.type}
              </span>
              <span className="text-[9px] text-slate-400 font-mono">ID: <strong className="text-slate-200">{selectedNode.id}</strong></span>
            </div>
            <h3 className="text-sm font-black uppercase text-white tracking-wide">{selectedNode.name}</h3>
          </div>
          <span className="px-2 py-1 bg-emerald-950 text-emerald-400 border border-emerald-900 rounded font-mono font-bold text-[10px] uppercase">
            TRUTH VALUE LOCKED
          </span>
        </div>
      </div>

      {/* Main Tabs Area */}
      <div className="flex-1 overflow-y-auto p-5 space-y-5 bg-slate-50/20">
        
        {/* SECTION 1: SYSTEM TRUTH AUDIT (TRUTH MODE) */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <h4 className="text-[10px] font-mono font-black uppercase text-slate-500 tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Sovereign Truth Mode Verification
            </h4>
            <span className="text-[8px] font-mono bg-slate-100 px-1.5 py-0.5 rounded text-slate-500">REAL-TIME DATA</span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
            <div className="bg-slate-50 border border-slate-200/50 p-2.5 rounded-lg text-center space-y-1">
              <span className="text-[8px] font-mono text-slate-400 uppercase font-black block">Operational State</span>
              <span className="font-bold text-slate-900 uppercase text-[10px]">{artifactDetails.status}</span>
            </div>
            <div className="bg-slate-50 border border-slate-200/50 p-2.5 rounded-lg text-center space-y-1">
              <span className="text-[8px] font-mono text-slate-400 uppercase font-black block">Evidence Digest</span>
              <span className="font-bold text-emerald-700 text-[10px] font-mono block truncate" title={artifactDetails.evidence.sha256Hash}>
                {artifactDetails.evidence.sha256Hash.substring(0, 16)}
              </span>
            </div>
            <div className="bg-slate-50 border border-slate-200/50 p-2.5 rounded-lg text-center space-y-1">
              <span className="text-[8px] font-mono text-slate-400 uppercase font-black block">Model Allocated</span>
              <span className="font-bold text-slate-900 text-[10px]">{artifactDetails.manufacturing.model}</span>
            </div>
            <div className="bg-slate-50 border border-slate-200/50 p-2.5 rounded-lg text-center space-y-1">
              <span className="text-[8px] font-mono text-slate-400 uppercase font-black block">Executor Mode</span>
              <span className="font-bold text-indigo-700 text-[10px]">REAL_EXECUTING</span>
            </div>
          </div>
        </div>

        {/* SECTION 2: ARCHITECTURAL DEVIATION & PROVENANCE CLUES */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs space-y-2.5">
            <h4 className="text-[10px] font-mono font-black uppercase text-slate-500 tracking-wider border-b border-slate-100 pb-1.5 flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-blue-600" />
              Provenance Tracking
            </h4>
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between items-center text-[10px]">
                <span className="text-slate-500 font-medium">JDPM Node Index</span>
                <span className="font-mono text-slate-800 font-bold">{artifactDetails.identity.jdpmId}</span>
              </div>
              <div className="flex justify-between items-center text-[10px]">
                <span className="text-slate-500 font-medium">Source File Reference</span>
                <span className="font-mono text-slate-600 truncate max-w-[200px]" title={artifactDetails.identity.sourceArtifact}>
                  {artifactDetails.identity.sourceArtifact}
                </span>
              </div>
              <div className="flex justify-between items-center text-[10px]">
                <span className="text-slate-500 font-medium">Operating Context</span>
                <span className="font-bold text-slate-800">{artifactDetails.identity.environment}</span>
              </div>
              <div className="flex justify-between items-center text-[10px]">
                <span className="text-slate-500 font-medium">Tenant Isolation Lock</span>
                <span className="font-bold text-emerald-800 bg-emerald-50 border border-emerald-100 px-1.5 py-0.5 rounded text-[9px]">ISOLATED</span>
              </div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs space-y-2.5">
            <h4 className="text-[10px] font-mono font-black uppercase text-slate-500 tracking-wider border-b border-slate-100 pb-1.5 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-amber-500" />
              Automation Engine Directives
            </h4>
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between items-center text-[10px]">
                <span className="text-slate-500 font-medium">Work Package Scope</span>
                <span className="font-bold text-slate-800 text-[9px] uppercase font-mono">{artifactDetails.manufacturing.workPackageKey}</span>
              </div>
              <div className="flex justify-between items-center text-[10px]">
                <span className="text-slate-500 font-medium">Owner Governance Role</span>
                <span className="font-bold text-slate-800">{artifactDetails.governance.ownerRole}</span>
              </div>
              <div className="flex justify-between items-center text-[10px]">
                <span className="text-slate-500 font-medium">Assigned AI Agent</span>
                <span className="font-bold text-indigo-700 bg-indigo-50 border border-indigo-100 px-1.5 py-0.5 rounded text-[9px]">{artifactDetails.manufacturing.assignedAgent}</span>
              </div>
              <div className="flex justify-between items-center text-[10px]">
                <span className="text-slate-500 font-medium">Target Phase ID</span>
                <span className="font-mono text-slate-800 font-bold">{artifactDetails.manufacturing.phaseId} of 17</span>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 3: IMMUTABLE CONFIGURATION ATTRIBUTES */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs space-y-2.5">
          <h4 className="text-[10px] font-mono font-black uppercase text-slate-500 tracking-wider border-b border-slate-100 pb-1.5 flex items-center gap-1.5">
            <Database className="w-3.5 h-3.5 text-teal-600" />
            Configurable Spec Parameters (Provenance Manifest)
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono text-[10px]">
            <div className="space-y-1 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
              <div className="font-bold text-slate-700">UPSTREAM DEPENDENCIES</div>
              <div className="text-[9px] text-slate-500 leading-relaxed">
                {artifactDetails.dependencies.upstream.length > 0 
                  ? artifactDetails.dependencies.upstream.join(', ') 
                  : 'Zero Upstream Dependencies (Direct Enclave Root)'}
              </div>
            </div>
            <div className="space-y-1 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
              <div className="font-bold text-slate-700">DOWNSTREAM IMPACT NODES</div>
              <div className="text-[9px] text-slate-500 leading-relaxed">
                {artifactDetails.dependencies.downstream.length > 0 
                  ? artifactDetails.dependencies.downstream.join(', ') 
                  : 'Zero Downstream Dependencies (Leaf Node)'}
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 4: INTEGRITY HISTORICAL TRAIL */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs space-y-2.5">
          <h4 className="text-[10px] font-mono font-black uppercase text-slate-500 tracking-wider border-b border-slate-100 pb-1.5 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-indigo-500" />
            Sovereign Ledger History
          </h4>
          <div className="space-y-2 font-mono text-[9px]">
            {artifactDetails.governance.changeHistory.map((item, idx) => (
              <div key={idx} className="flex justify-between items-start gap-4 p-1.5 rounded bg-slate-50 hover:bg-slate-100 transition-colors">
                <div className="space-y-0.5">
                  <div className="font-black text-slate-800">{item.action}</div>
                  <div className="text-slate-500">Operator: {item.author}</div>
                </div>
                <div className="text-slate-400 text-right">{new Date(item.timestamp).toLocaleTimeString()}</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
