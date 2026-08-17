// JUMO UEOS — Manufacturing Resource Planning (MRP) & Cognitive Workforce Matrix
// Real agent capacity, provider bindings, and workload distribution.

import React from 'react';
import { Cpu, CheckCircle2, AlertTriangle, Activity, Clock, ShieldCheck, Server } from 'lucide-react';
import { JumoAIAgentRegistry } from '../../../core/ai/registry/JumoAIAgentRegistry';

export const ManufacturingResourcePlanning: React.FC = () => {
  const audit = JumoAIAgentRegistry.auditCognitiveWorkforce();
  const allAgents = JumoAIAgentRegistry.getAllAgents();

  return (
    <div className="space-y-5">
      {/* MRP Summary Header */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 flex items-center justify-between shadow-xs">
        <div>
          <h3 className="text-sm font-black uppercase text-slate-900 tracking-wider">Manufacturing Resource Planning (MRP)</h3>
          <p className="text-[11px] text-slate-500 font-medium">Authoritative cognitive workforce allocation, execution provider bindings, and agent workload distribution.</p>
        </div>
        <div className="flex items-center space-x-2">
          <span className="px-3 py-1 bg-purple-50 text-purple-700 border border-purple-200 rounded-lg text-xs font-mono font-black">
            {audit.totalRegistered} Registered Workforce
          </span>
        </div>
      </div>

      {/* Workforce Reality Classification Grid */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        <div className="bg-emerald-50 border border-emerald-200 p-3.5 rounded-xl">
          <div className="text-[10px] font-black uppercase text-emerald-800">Real Executing</div>
          <div className="text-xl font-black text-emerald-700 font-mono mt-1">{audit.executingEngineers}</div>
          <div className="text-[9px] text-emerald-600 font-medium mt-0.5">Connected to @google/genai</div>
        </div>

        <div className="bg-blue-50 border border-blue-200 p-3.5 rounded-xl">
          <div className="text-[10px] font-black uppercase text-blue-800">Registered Idle</div>
          <div className="text-xl font-black text-blue-700 font-mono mt-1">{audit.registeredIdle}</div>
          <div className="text-[9px] text-blue-600 font-medium mt-0.5">Tools authorized</div>
        </div>

        <div className="bg-purple-50 border border-purple-200 p-3.5 rounded-xl">
          <div className="text-[10px] font-black uppercase text-purple-800">Capability Only</div>
          <div className="text-xl font-black text-purple-700 font-mono mt-1">{audit.capabilityNoExecutor}</div>
          <div className="text-[9px] text-purple-600 font-medium mt-0.5">Capability registered</div>
        </div>

        <div className="bg-amber-50 border border-amber-200 p-3.5 rounded-xl">
          <div className="text-[10px] font-black uppercase text-amber-800">Config Templates</div>
          <div className="text-xl font-black text-amber-700 font-mono mt-1">{audit.configurationPlaceholders}</div>
          <div className="text-[9px] text-amber-600 font-medium mt-0.5">Pending binding</div>
        </div>

        <div className="bg-slate-100 border border-slate-200 p-3.5 rounded-xl">
          <div className="text-[10px] font-black uppercase text-slate-700">Simulated / Fallback</div>
          <div className="text-xl font-black text-slate-800 font-mono mt-1">{audit.mockSimulated}</div>
          <div className="text-[9px] text-slate-500 font-medium mt-0.5">Fallback simulation</div>
        </div>
      </div>

      {/* Agents Roster Table */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse font-sans text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 font-mono text-[10px] uppercase text-slate-500">
                <th className="p-3 font-black">Agent ID & Name</th>
                <th className="p-3 font-black">Division</th>
                <th className="p-3 font-black">Lifecycle Phase</th>
                <th className="p-3 font-black">Execution Provider</th>
                <th className="p-3 font-black">Classification</th>
                <th className="p-3 font-black">Workload</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono text-[10px]">
              {allAgents.slice(0, 10).map((agent, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition-colors">
                  <td className="p-3 font-bold text-slate-900 whitespace-nowrap flex items-center space-x-1.5">
                    <Cpu className="w-3.5 h-3.5 text-purple-600" />
                    <span>{agent.jumoName}</span>
                  </td>
                  <td className="p-3 text-slate-600 uppercase font-sans">{agent.division}</td>
                  <td className="p-3 text-indigo-700 font-bold whitespace-nowrap">{agent.assignedPhaseName || 'Phase 02'}</td>
                  <td className="p-3 text-slate-800 font-bold">{agent.executionAdapter || 'GOOGLE_GENAI'}</td>
                  <td className="p-3 whitespace-nowrap">
                    <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded font-bold uppercase text-[9px]">
                      {agent.workforceClassification || 'REAL_REGISTERED_IDLE'}
                    </span>
                  </td>
                  <td className="p-3 font-bold text-slate-700">{agent.workload || 0} active jobs</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
