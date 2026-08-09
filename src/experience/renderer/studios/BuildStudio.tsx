import React from 'react';
import { motion } from 'motion/react';
import { 
  Box, Cpu, Terminal, Layers, Zap, CheckCircle2, 
  AlertCircle, RefreshCw, HardDrive, Binary, GitCommit,
  Shield, Key, Network, Search, ExternalLink
} from 'lucide-react';
import { BuildArtifact } from '../../../core/factory/registry/HubRegistryTypes';

interface BuildStudioProps {
  artifacts: BuildArtifact[];
  isCompiling: boolean;
  compilerLogs: string[];
}

export const BuildStudio: React.FC<BuildStudioProps> = ({
  artifacts,
  isCompiling,
  compilerLogs
}) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-white">
            <Box className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-black text-slate-900 tracking-tight uppercase">Build Studio</h2>
            <p className="text-xs text-slate-500 font-medium">Authoritative Compilation, Hashing & Artifact Sealing Control Surface</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Compiler Status</span>
            <span className="text-xs font-black text-emerald-600 uppercase flex items-center justify-end gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              OK / NOMINAL
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Artifacts */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-5">
            <h3 className="text-xs font-black uppercase text-slate-800 tracking-wider">Sealed Build Artifacts</h3>
            <div className="space-y-3">
              {(Array.isArray(artifacts) ? artifacts : []).map((artifact) => (
                <div key={artifact.artifactId} className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-blue-300 transition-all">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-400">
                      <Binary className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-black text-slate-900 uppercase block tracking-tight">{artifact.artifactId}</span>
                      <span className="text-[9px] text-slate-500 font-mono block">SHA256:{String(artifact?.hash ?? "UNSEALED").substring(0, 16)}...</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <span className="text-[9px] font-black text-slate-400 uppercase block">Size</span>
                      <span className="text-[10px] font-bold text-slate-700">{(Number(artifact?.size ?? 0) / 1024 / 1024).toFixed(2)} MB</span>
                    </div>
                    <div className="h-8 w-px bg-slate-200"></div>
                    <button className="p-2 rounded-lg bg-white border border-slate-200 text-slate-400 hover:text-blue-600 transition-all">
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
              {(artifacts ?? []).length === 0 && (
                <div className="py-20 text-center space-y-4 opacity-40">
                  <Layers className="w-16 h-16 mx-auto text-slate-300" />
                  <div>
                    <p className="text-sm font-black text-slate-900 uppercase">No artifacts sealed yet</p>
                    <p className="text-xs font-bold text-slate-500 mt-1 uppercase">Run a compilation job to generate sealed artifacts.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Console */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 shadow-xl space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-xs font-black uppercase text-slate-400 tracking-wider flex items-center gap-2">
                <Terminal className="w-4 h-4 text-emerald-500" />
                JUMO-UEOS Compiler Console
              </h3>
              {isCompiling && <RefreshCw className="w-3.5 h-3.5 text-emerald-500 animate-spin" />}
            </div>
            <div className="h-[400px] overflow-y-auto font-mono text-[10px] space-y-2.5 pr-2 scrollbar-thin scrollbar-thumb-slate-800">
              {(compilerLogs ?? []).length === 0 ? (
                <div className="text-slate-600 italic">Compiler standing by for source stream...</div>
              ) : (
                (compilerLogs ?? []).map((log, i) => (
                  <div key={i} className="flex gap-2 text-emerald-400/90 leading-relaxed">
                    <span className="text-slate-700 shrink-0 select-none">›</span>
                    <span className="break-all">{log}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
