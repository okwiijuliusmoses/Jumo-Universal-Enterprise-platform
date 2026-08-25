import React from 'react';
import { GitFork, ArrowRight, Layers, Box, Cpu } from 'lucide-react';

interface DependencyNode {
  id: string;
  label: string;
  type: 'PRODUCT' | 'MODULE' | 'OFFICE' | 'SCHEMA';
  dependsOn: string[];
}

interface DependencyGraphProps {
  nodes: DependencyNode[];
}

export const DependencyGraph: React.FC<DependencyGraphProps> = ({ nodes }) => {
  return (
    <div className="space-y-4 text-slate-200 font-mono text-xs">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <GitFork className="w-4 h-4 text-indigo-400" />
          <span>Cross-Domain Dependency Hierarchy & Topology</span>
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {nodes.map((node) => (
          <div key={node.id} className="p-4 bg-slate-900/60 rounded-xl border border-slate-800 space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Box className="w-4 h-4 text-indigo-400" />
                <span className="font-bold text-white">{node.label}</span>
              </div>
              <span className="text-[10px] px-1.5 py-0.5 bg-slate-950 text-slate-400 border border-slate-800 rounded">
                {node.type}
              </span>
            </div>

            <div className="text-[11px] text-slate-400 space-y-1">
              <div className="text-slate-500 text-[10px] uppercase">Upstream Dependencies:</div>
              {(node.dependsOn?.length || 0) === 0 ? (
                <div className="text-slate-500 italic">Root platform service (Zero upstream dependencies)</div>
              ) : (
                <div className="flex flex-wrap gap-1.5">
                  {node.dependsOn.map((dep) => (
                    <span
                      key={dep}
                      className="px-2 py-0.5 bg-slate-950 text-indigo-300 border border-slate-800 rounded text-[10px]"
                    >
                      {dep}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
