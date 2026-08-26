import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  Cpu, 
  ArrowRight,
  Database,
  Lock,
  ChevronRight,
  Info,
  GitBranch,
  Layers,
  Box,
  ArrowLeft
} from 'lucide-react';
import { FintechModuleAgentRegistry } from './FintechModuleAgentRegistry';
import { FintechModuleRegistry, FintechCapabilityRegistry } from '../../registries/FintechBenchmarkRegistry';
import { ModuleWorkforce, FintechModuleAgent } from './types';
import { formatPercentage } from '../../../../utils/formatters';

interface WorkforceOrchestratorProps {
  moduleId?: string;
  onLaunchCapability?: (capabilityId: string) => void;
}

export const WorkforceOrchestrator: React.FC<WorkforceOrchestratorProps> = ({ moduleId, onLaunchCapability }) => {
  const [activeModuleId, setActiveModuleId] = useState<string | null>(moduleId || null);
  const [workforce, setWorkforce] = useState<ModuleWorkforce | null>(null);
  const [selectedAgent, setSelectedAgent] = useState<FintechModuleAgent | null>(null);

  useEffect(() => {
    if (activeModuleId) {
      const entry = FintechModuleAgentRegistry[activeModuleId];
      if (entry) {
        setWorkforce(entry.workforce);
        setSelectedAgent(entry.workforce.agents[0] || null);
      }
    } else {
      setWorkforce(null);
      setSelectedAgent(null);
    }
  }, [activeModuleId]);

  if (!activeModuleId) {
    return (
      <div className="space-y-8 animate-in fade-in duration-500 pb-20">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-black text-slate-900 tracking-tight uppercase italic">Fintech AI Agent Workforce</h1>
          <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Autonomous Engineering & Verification Command Center</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FintechModuleRegistry.map(mod => {
            const entry = FintechModuleAgentRegistry[mod.id];
            const wf = entry?.workforce;
            return (
              <button
                key={mod.id}
                onClick={() => setActiveModuleId(mod.id)}
                className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:border-indigo-300 hover:shadow-xl transition-all text-left group"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className={`p-3 rounded-2xl ${mod.isCore ? 'bg-indigo-50 text-indigo-600' : 'bg-slate-50 text-slate-600'} group-hover:bg-indigo-600 group-hover:text-white transition-colors`}>
                    <Box className="w-6 h-6" />
                  </div>
                  {wf && (
                    <div className="text-right">
                      <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Verification</div>
                      <div className={`text-xs font-black ${wf.verificationStatus === 'VERIFIED' ? 'text-emerald-500' : 'text-amber-500'}`}>{wf.verificationStatus}</div>
                    </div>
                  )}
                </div>
                <h3 className="text-lg font-black text-slate-900 mb-1 group-hover:text-indigo-600 transition-colors">{mod.name}</h3>
                <p className="text-xs text-slate-500 line-clamp-2 mb-4">{mod.description}</p>
                
                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <div className="flex -space-x-2">
                    {wf?.agents.slice(0, 4).map(agent => (
                      <div key={agent.id} className="w-6 h-6 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center" title={agent.name}>
                        <agent.icon className="w-3 h-3 text-slate-400" />
                      </div>
                    ))}
                    {(wf?.agents.length || 0) > 4 && (
                      <div className="w-6 h-6 rounded-full bg-slate-50 border-2 border-white flex items-center justify-center text-[8px] font-bold text-slate-400">
                        +{(wf?.agents.length || 0) - 4}
                      </div>
                    )}
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-500 transition-all group-hover:translate-x-1" />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  if (!workforce) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center bg-slate-50 border border-dashed border-slate-300 rounded-3xl">
        <AlertTriangle className="w-12 h-12 text-amber-500 mb-4" />
        <h3 className="text-xl font-bold text-slate-900">Module Workforce Not Provisioned</h3>
        <p className="text-slate-500 max-w-md mt-2">
          The requested module ID "{activeModuleId}" does not have an assigned AI engineering workforce in the registry.
        </p>
        <button 
          onClick={() => setActiveModuleId(null)}
          className="mt-6 text-indigo-600 font-black text-xs uppercase tracking-widest hover:underline"
        >
          Return to Registry
        </button>
      </div>
    );
  }

  const moduleCapabilities = FintechCapabilityRegistry.filter(c => c.targetModuleId === activeModuleId);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* 1. WORKFORCE COMMAND HEADER */}
      <div className="flex items-center gap-4 mb-4">
        <button 
          onClick={() => setActiveModuleId(null)}
          className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Workforce
        </button>
      </div>
      <div className="bg-slate-950 text-white p-6 rounded-3xl border border-slate-800 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <Cpu className="w-32 h-32" />
        </div>
        
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <div className="flex items-center gap-2 text-indigo-400 text-[10px] font-black uppercase tracking-[0.2em] mb-2">
              <Activity className="w-3 h-3 animate-pulse" />
              Live Module AI Workforce Active
            </div>
            <h2 className="text-3xl font-black tracking-tight">{workforce.moduleName}</h2>
            <div className="flex items-center gap-4 mt-3">
              <div className="flex items-center gap-1.5 px-2 py-1 bg-white/10 rounded-lg border border-white/5">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Completeness</span>
                <span className="text-sm font-black text-emerald-400">{formatPercentage(workforce.completenessScore)}</span>
              </div>
              <div className="flex items-center gap-1.5 px-2 py-1 bg-white/10 rounded-lg border border-white/5">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Status</span>
                <span className="text-sm font-black text-indigo-400 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  {workforce.verificationStatus}
                </span>
              </div>
            </div>
          </div>

          <div className="flex -space-x-2">
            {(workforce?.agents || []).map((agent) => (
              <button
                key={agent.id}
                onClick={() => setSelectedAgent(agent)}
                className={`w-10 h-10 rounded-full border-2 border-slate-950 flex items-center justify-center transition-all hover:scale-110 hover:z-20 ${
                  selectedAgent?.id === agent.id ? 'bg-indigo-600 scale-110 ring-4 ring-indigo-500/20' : 'bg-slate-800'
                }`}
                title={`${agent.name} (${agent.role})`}
              >
                <agent.icon className="w-5 h-5 text-white" />
              </button>
            ))}
            <div className="w-10 h-10 rounded-full bg-slate-900 border-2 border-slate-950 flex items-center justify-center text-[10px] font-bold text-slate-400">
              +{workforce?.agents?.length > 5 ? workforce.agents.length - 5 : 0}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 2. AGENT FOCUS PANEL */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          {selectedAgent ? (
            <>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600">
                  <selectedAgent.icon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-black text-slate-900 tracking-tight">{selectedAgent.name}</h4>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{selectedAgent.role}</span>
                </div>
              </div>

              <div className="space-y-4">
                <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Primary Responsibilities</h5>
                <div className="space-y-2">
                  {(selectedAgent?.responsibilities || []).map((resp, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      {resp}
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <button className="w-full py-3 bg-slate-900 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-slate-800 transition flex items-center justify-center gap-2">
                  Request Task Audit
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </>
          ) : (
            <div className="h-64 flex flex-col items-center justify-center text-center text-slate-400">
              <Info className="w-8 h-8 mb-2" />
              <p className="text-xs">Select an agent to view its specific focus and responsibilities for this module.</p>
            </div>
          )}
        </div>

        {/* 3. CAPABILITY DISCOVERY & MANAGEMENT */}
        <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-black text-slate-900 tracking-tight flex items-center gap-2">
              <GitBranch className="w-5 h-5 text-indigo-500" />
              Module Capabilities Under Management
            </h3>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              Last Reconciled: {new Date(workforce.lastReconciliation).toLocaleTimeString()}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {moduleCapabilities.map((cap) => (
              <button
                key={cap.id}
                onClick={() => onLaunchCapability?.(cap.id)}
                className="group p-4 bg-slate-50 border border-slate-200 rounded-2xl text-left hover:bg-white hover:border-indigo-200 hover:shadow-md transition-all flex items-center justify-between"
              >
                <div>
                  <div className="text-xs font-black text-slate-900 uppercase tracking-tight group-hover:text-indigo-600">
                    {cap.name}
                  </div>
                  <div className="text-[10px] font-bold text-slate-400 mt-0.5">Benchmark Count: {cap?.benchmarks?.length || 0}</div>
                  <div className="mt-2 flex items-center gap-1.5">
                    <span className="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-700 text-[8px] font-black uppercase tracking-widest">
                      {cap.implementationStatus}
                    </span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-500 transition-colors" />
              </button>
            ))}
            
            <div className="p-4 border border-dashed border-slate-300 rounded-2xl flex items-center justify-center">
              <button className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-indigo-600 transition">
                + Discover New Capability
              </button>
            </div>
          </div>

          <div className="space-y-4 pt-6 border-t border-slate-100">
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Generated Artifact Registry</h4>
            <div className="flex flex-wrap gap-2">
              {(workforce?.artifacts || []).map((art) => (
                <div 
                  key={art.id} 
                  className="flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-100 border border-slate-200 rounded-lg"
                >
                  <Database className="w-3 h-3 text-slate-500" />
                  <span className="text-[10px] font-bold text-slate-600">{art.type}:</span>
                  <span className="text-[10px] font-mono font-medium text-slate-900">{art.id}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
