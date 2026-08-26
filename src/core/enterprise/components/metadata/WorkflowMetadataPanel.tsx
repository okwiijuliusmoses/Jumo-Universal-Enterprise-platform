import React from 'react';
import { Activity, CheckCircle, ArrowRight, Shield, Layers } from 'lucide-react';

interface WorkflowMetadataPanelProps {
  workflow: {
    id: string;
    name: string;
    description: string;
    stages: string[];
  };
}

export const WorkflowMetadataPanel: React.FC<WorkflowMetadataPanelProps> = ({
  workflow
}) => {
  return (
    <div className="space-y-6 text-slate-200">
      <div className="flex items-start justify-between bg-slate-900/80 p-5 rounded-xl border border-slate-800">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-slate-800 flex items-center justify-center text-amber-400 border border-slate-700">
            <Activity className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-white tracking-tight">{workflow.name}</h2>
              <span className="px-2 py-0.5 text-[10px] font-mono bg-amber-950 text-amber-400 border border-amber-800 rounded">
                {workflow.id}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl">{workflow.description}</p>
          </div>
        </div>
      </div>

      {/* Stages Flow */}
      <div className="bg-slate-900/60 p-5 rounded-xl border border-slate-800 space-y-4">
        <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <Layers className="w-4 h-4 text-amber-400" />
          <span>Workflow Execution Pipeline ({workflow.stages?.length || 0} Stages)</span>
        </h3>
        <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
          {workflow.stages?.map((stage, idx) => (
            <React.Fragment key={idx}>
              <div className="px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-slate-800 text-slate-300 text-[10px] font-bold flex items-center justify-center">
                  {idx + 1}
                </span>
                <span className="text-slate-200 font-medium">{stage}</span>
              </div>
              {idx < (workflow.stages?.length || 0) - 1 && (
                <ArrowRight className="w-4 h-4 text-slate-600" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};
