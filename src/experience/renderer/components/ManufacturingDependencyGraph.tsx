// JUMO UEOS — Manufacturing Dependency Graph Component
// Visual dependency graph representation & blocker detector.

import React from 'react';
import { Layers, Server, Database, Cpu, ArrowRight, CheckCircle2, AlertTriangle, ShieldCheck } from 'lucide-react';
import { ProductManufacturingJob } from '../../../core/factory/registry/HubRegistryTypes';
import { ManufacturingDependencyGraphEngine } from '../../../core/factory/graph/ManufacturingDependencyGraphEngine';

export interface ManufacturingDependencyGraphProps {
  job: ProductManufacturingJob;
}

export const ManufacturingDependencyGraph: React.FC<ManufacturingDependencyGraphProps> = ({ job }) => {
  const engine = ManufacturingDependencyGraphEngine.getInstance();
  const analysis = engine.analyzeDependencyGraph(job);

  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-5 shadow-xs">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-black uppercase text-slate-900 tracking-wider">Manufacturing Dependency Topology Graph</h3>
          <p className="text-[11px] text-slate-500 font-medium">Topological dependency sequence from Infrastructure through Product Root.</p>
        </div>
        <div className="flex items-center space-x-2 text-xs font-mono">
          <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg font-bold">
            {analysis.readyNodesCount} / {analysis.totalNodes} Nodes Ready
          </span>
        </div>
      </div>

      {/* Dependency Flow Pipeline View */}
      <div className="grid grid-cols-1 md:grid-cols-7 gap-2">
        {analysis.nodes.map((node, idx) => (
          <div key={node.id} className="relative flex flex-col items-center">
            <div className={`w-full p-3 rounded-xl border flex flex-col items-center text-center space-y-1.5 transition-all ${
              node.status === 'READY' 
                ? 'bg-emerald-50/50 border-emerald-200 text-slate-800' 
                : 'bg-amber-50/50 border-amber-200 text-amber-900'
            }`}>
              <span className="text-[9px] font-mono font-black uppercase text-slate-400">{node.category}</span>
              <div className="text-xs font-black truncate w-full">{node.name}</div>
              <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded font-mono font-bold text-[8px] uppercase">
                {node.status}
              </span>
            </div>
            {idx < analysis.nodes.length - 1 && (
              <ArrowRight className="hidden md:block w-4 h-4 text-slate-300 absolute -right-2.5 top-1/2 -translate-y-1/2 z-10" />
            )}
          </div>
        ))}
      </div>

      {/* Blocker Detector Panel */}
      {analysis.blockerSummary.length > 0 ? (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl space-y-2">
          <div className="text-xs font-bold text-red-900 uppercase flex items-center space-x-2">
            <AlertTriangle className="w-4 h-4 text-red-600" />
            <span>Dependency Blockers Identified</span>
          </div>
          {analysis.blockerSummary.map((b, idx) => (
            <div key={idx} className="text-xs text-red-700 font-mono">
              Node <span className="font-bold">{b.nodeName}</span> is blocked by <span className="font-bold">{b.blockedByNodeName}</span> ({b.reason})
            </div>
          ))}
        </div>
      ) : (
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs font-bold text-emerald-800 flex items-center space-x-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Dependency Topology Clean: No unfulfilled upstream dependencies or build blockers.</span>
        </div>
      )}
    </div>
  );
};
