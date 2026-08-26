import React from 'react';
import { Cpu, Sparkles, Brain, CheckCircle, ShieldCheck, Zap } from 'lucide-react';
import { ApprovedProductAiCapability } from '../../../../products/ApprovedProductRegistry';

interface AIAgentMetadataPanelProps {
  agent: ApprovedProductAiCapability;
}

export const AIAgentMetadataPanel: React.FC<AIAgentMetadataPanelProps> = ({
  agent
}) => {
  return (
    <div className="space-y-6 text-slate-200">
      <div className="flex items-start justify-between bg-slate-900/80 p-5 rounded-xl border border-slate-800">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-slate-800 flex items-center justify-center text-emerald-400 border border-slate-700">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-white tracking-tight">{agent.name}</h2>
              <span className="px-2 py-0.5 text-[10px] font-mono bg-emerald-950 text-emerald-400 border border-emerald-800 rounded">
                {agent.agentId}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl">{agent.description}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
        <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 space-y-1.5">
          <div className="text-[10px] text-slate-500 uppercase flex items-center gap-1.5">
            <Brain className="w-3.5 h-3.5 text-indigo-400" />
            <span>Target AI Model Alias</span>
          </div>
          <div className="text-emerald-400 font-semibold">{agent.modelAlias}</div>
        </div>

        <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 space-y-1.5">
          <div className="text-[10px] text-slate-500 uppercase flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
            <span>Security Boundary</span>
          </div>
          <div className="text-slate-200 font-semibold">Server-Side Proxy Gated</div>
        </div>

        <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 space-y-1.5">
          <div className="text-[10px] text-slate-500 uppercase flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>Autonomous Execution</span>
          </div>
          <div className="text-slate-200 font-semibold">Pre-Commit Verification</div>
        </div>
      </div>
    </div>
  );
};
