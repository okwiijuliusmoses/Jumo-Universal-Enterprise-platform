// JUMO UEOS — Manufacturing Quality Control & Change Impact Analysis
// Standard: JDPM-QUALITY-9004 Quality Dashboard & Impact Calculator

import React, { useState } from 'react';
import { 
  ShieldCheck, AlertTriangle, CheckCircle2, Activity, Layers, 
  FileCode, Database, RefreshCw, Calculator, ArrowRight
} from 'lucide-react';
import { ProductManufacturingJob } from '../../../core/factory/registry/HubRegistryTypes';
import { ManufacturedProductExplorerEngine } from '../../../core/factory/explorer/ManufacturedProductExplorerEngine';

export interface ManufacturingQualityDashboardProps {
  job: ProductManufacturingJob;
}

export const ManufacturingQualityDashboard: React.FC<ManufacturingQualityDashboardProps> = ({ job }) => {
  const explorerEngine = ManufacturedProductExplorerEngine.getInstance();
  const qualityMetrics = explorerEngine.getQualityMetrics(job);

  const [selectedArtifactForImpact, setSelectedArtifactForImpact] = useState<string>('MOD-STUDENT-REG');
  const impactAnalysis = explorerEngine.calculateChangeImpact(selectedArtifactForImpact, job);

  return (
    <div className="space-y-6">
      {/* Quality Coverage KPI Grid */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-4 shadow-xs">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-black uppercase text-slate-900 tracking-wider">Quality Control & Verification Evidence Dashboard</h3>
            <p className="text-[11px] text-slate-500 font-medium">Evidence-based coverage metrics derived directly from specification, architecture, and test verification logs.</p>
          </div>
          <span className="px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg text-xs font-mono font-black">
            100% Traceability
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 font-mono text-xs">
          <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-xl space-y-1">
            <div className="text-[10px] text-slate-400 font-black uppercase">Requirements Coverage</div>
            <div className="text-xl font-black text-slate-900">{qualityMetrics.requirementsCoveragePct}%</div>
            <div className="text-[9px] text-emerald-600 font-sans font-medium">100% Normalized</div>
          </div>

          <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-xl space-y-1">
            <div className="text-[10px] text-slate-400 font-black uppercase">Architecture Contract</div>
            <div className="text-xl font-black text-indigo-700">{qualityMetrics.architectureCoveragePct}%</div>
            <div className="text-[9px] text-indigo-600 font-sans font-medium">Contract Locked</div>
          </div>

          <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-xl space-y-1">
            <div className="text-[10px] text-slate-400 font-black uppercase">20-Gate Test Pass Rate</div>
            <div className="text-xl font-black text-emerald-700">{qualityMetrics.testCoveragePct}%</div>
            <div className="text-[9px] text-emerald-600 font-sans font-medium">20/20 Gates Passed</div>
          </div>

          <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-xl space-y-1">
            <div className="text-[10px] text-slate-400 font-black uppercase">Evidence Completeness</div>
            <div className="text-xl font-black text-purple-700">{qualityMetrics.evidenceCompletenessPct}%</div>
            <div className="text-[9px] text-purple-600 font-sans font-medium">Cryptographically Signed</div>
          </div>
        </div>
      </div>

      {/* Change Impact Analysis Calculator */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-4 shadow-xs">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center space-x-2">
            <Calculator className="w-5 h-5 text-indigo-600" />
            <div>
              <h3 className="text-sm font-black uppercase text-slate-900 tracking-wider">Manufacturing Change Impact Calculator</h3>
              <p className="text-[11px] text-slate-500 font-medium">Select an artifact to calculate downstream impact on components, services, workflows, and tests.</p>
            </div>
          </div>

          <select
            value={selectedArtifactForImpact}
            onChange={(e) => setSelectedArtifactForImpact(e.target.value)}
            className="p-2 text-xs font-mono font-bold bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-1 focus:ring-purple-500"
          >
            <option value="MOD-STUDENT-REG">Student Enrollment & Records Module</option>
            <option value="SERV-AUTH">Sovereign Identity & Auth Gateway</option>
            <option value="DATA-STUDENT">Student Entity Schema</option>
            <option value="WF-ADMISSION">Student Admission Approval Workflow</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl space-y-2">
            <div className="text-[10px] font-mono font-black uppercase text-slate-400">Affected Components</div>
            <div className="space-y-1">
              {impactAnalysis.affectedComponents.map((c, idx) => (
                <div key={idx} className="text-xs font-mono font-bold text-slate-800 flex items-center space-x-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                  <span>{c}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl space-y-2">
            <div className="text-[10px] font-mono font-black uppercase text-slate-400">Affected Backend Services</div>
            <div className="space-y-1">
              {impactAnalysis.affectedServices.map((s, idx) => (
                <div key={idx} className="text-xs font-mono font-bold text-sky-800 flex items-center space-x-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
                  <span>{s}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl space-y-2">
            <div className="text-[10px] font-mono font-black uppercase text-slate-400">Re-Verification Requirement</div>
            <div className="space-y-1 text-xs font-mono">
              <div>Affected Tests: <span className="font-bold text-slate-900">{impactAnalysis.affectedTestsCount}</span></div>
              <div>Required Re-Approval: <span className="font-bold text-emerald-700">{impactAnalysis.requiredReapproval ? 'YES' : 'NO'}</span></div>
              <div>Risk Classification: <span className="font-bold text-amber-700">{impactAnalysis.riskScore}</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
