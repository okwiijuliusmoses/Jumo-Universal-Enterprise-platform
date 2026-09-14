// JUMO UEOS — Contextual Right-Side Operational Inspector
// Displays detailed status, capabilities, and allows trigger executions for any registered system entity.

import React from "react";
import { 
  X, Shield, Info, Cpu, CheckSquare, Layers, Users, Zap, Terminal, Globe, Sliders
} from "lucide-react";

interface UEOSRightInspectorProps {
  entity: {
    type: "ecosystem" | "product" | "blueprint" | "agent" | "job";
    id: string;
    data: any;
  } | null;
  onClose: () => void;
  onTriggerAction?: (actionId: string, params?: any) => void;
}

export function UEOSRightInspector({ entity, onClose, onTriggerAction }: UEOSRightInspectorProps) {
  if (!entity) return null;

  const { type, id } = entity;
  const data = entity.data || {};

  return (
    <div 
      className="h-full bg-white border-l border-slate-200/80 flex flex-col shadow-2xl relative animate-in slide-in-from-right duration-200"
      id="ueos-right-inspector"
    >
      {/* Inspector Header */}
      <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
        <div className="flex items-center gap-2">
          {type === "ecosystem" && <Layers className="w-4 h-4 text-teal-600" />}
          {type === "product" && <Globe className="w-4 h-4 text-sky-600" />}
          {type === "blueprint" && <Sliders className="w-4 h-4 text-indigo-600" />}
          {type === "agent" && <Users className="w-4 h-4 text-violet-600" />}
          {type === "job" && <Cpu className="w-4 h-4 text-blue-600" />}
          
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
              {type} INSPECTOR
            </span>
            <h3 className="text-xs font-black text-slate-800 truncate max-w-xs" title={id}>
              {id}
            </h3>
          </div>
        </div>

        <button 
          onClick={onClose}
          className="p-1 rounded-md hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
          aria-label="Close Inspector"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Inspector Content Scroll Area */}
      <div className="flex-1 overflow-y-auto p-5 space-y-6 text-slate-700">
        
        {/* Render Ecosystem details */}
        {type === "ecosystem" && (
          <div className="space-y-5 animate-in fade-in-50 duration-150">
            <div>
              <span className="text-[10px] font-black uppercase text-slate-400">System Name</span>
              <h4 className="text-xs font-extrabold text-slate-900 mt-0.5">{data.name}</h4>
              <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                Registered JUMO Sovereign core tenant running v{data.version}.
              </p>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl space-y-2 text-[11px]">
              <div className="flex justify-between border-b border-slate-200/50 pb-1.5">
                <span className="text-slate-400 font-bold">Category:</span>
                <span className="font-extrabold text-slate-800 uppercase">{data.category}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200/50 pb-1.5">
                <span className="text-slate-400 font-bold">Branch:</span>
                <span className="font-semibold text-slate-800 font-mono">{data.branch}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200/50 pb-1.5">
                <span className="text-slate-400 font-bold">Base Hash:</span>
                <span className="font-bold text-slate-800 font-mono text-[10px]">{data.architectureBaseline}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400 font-bold">Last Audited:</span>
                <span className="font-semibold text-slate-800">{new Date(data.lastAuditTimestamp).toLocaleTimeString()}</span>
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-[10px] font-black uppercase text-slate-400">Registered Capabilities</span>
              <div className="flex flex-wrap gap-1">
                {data.capabilities?.map((cap: string, i: number) => (
                  <span key={i} className="text-[10px] bg-blue-50 text-blue-700 border border-blue-100/60 px-2.5 py-1 rounded-md font-extrabold">
                    {cap}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-[10px] font-black uppercase text-slate-400">Exposed API Endpoints</span>
              <div className="bg-slate-950 rounded-xl p-3 font-mono text-[10px] text-emerald-400 border border-slate-800 space-y-1">
                {data.apis?.map((api: string, i: number) => (
                  <div key={i} className="flex justify-between">
                    <span>GET</span>
                    <span className="text-slate-300">{api}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => onTriggerAction?.("integrate-ecosystem", data)}
              className="w-full py-2 bg-slate-900 hover:bg-blue-600 text-white rounded-xl text-xs font-bold shadow-xs cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Zap className="w-3.5 h-3.5" />
              Force System Synchronize
            </button>
          </div>
        )}

        {/* Render Commercial Product details */}
        {type === "product" && (
          <div className="space-y-5 animate-in fade-in-50 duration-150">
            <div>
              <span className="text-[10px] font-black uppercase text-slate-400">Product Title</span>
              <h4 className="text-xs font-extrabold text-slate-900 mt-0.5">{data.name}</h4>
              <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                Authorized platform product module serving sovereign operations.
              </p>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl space-y-2 text-[11px]">
              <div className="flex justify-between border-b border-slate-200/50 pb-1.5">
                <span className="text-slate-400 font-bold">Category:</span>
                <span className="font-extrabold text-slate-800 uppercase">{data.category}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200/50 pb-1.5">
                <span className="text-slate-400 font-bold">Engine Service:</span>
                <span className="font-semibold text-slate-800">{data.engineService}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200/50 pb-1.5">
                <span className="text-slate-400 font-bold">Version:</span>
                <span className="font-bold text-slate-800 font-mono">{data.version}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400 font-bold">Deployment State:</span>
                <span className="font-extrabold text-emerald-600">{data.deploymentStatus}</span>
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-[10px] font-black uppercase text-slate-400">Core Integrations</span>
              <div className="flex flex-wrap gap-1">
                {data.dependencies?.map((dep: string, i: number) => (
                  <span key={i} className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-200/60 font-semibold">
                    {dep}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-[10px] font-black uppercase text-slate-400">Exposed API Routes</span>
              <div className="bg-slate-950 rounded-xl p-3 font-mono text-[10px] text-emerald-400 border border-slate-800 space-y-1">
                {data.apis?.map((api: string, i: number) => (
                  <div key={i} className="flex justify-between">
                    <span>POST</span>
                    <span className="text-slate-300">{api}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => onTriggerAction?.("test-product", data)}
              className="w-full py-2 bg-slate-900 hover:bg-sky-600 text-white rounded-xl text-xs font-bold shadow-xs cursor-pointer flex items-center justify-center gap-1.5"
            >
              <CheckSquare className="w-3.5 h-3.5" />
              Execute Compliance Test
            </button>
          </div>
        )}

        {/* Render Blueprint details */}
        {type === "blueprint" && (
          <div className="space-y-5 animate-in fade-in-50 duration-150">
            <div>
              <span className="text-[10px] font-black uppercase text-slate-400">Blueprint template</span>
              <h4 className="text-xs font-extrabold text-slate-900 mt-0.5">{data.name}</h4>
              <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                Modular blueprint containing hypervisor constraints and template requirements.
              </p>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl space-y-2 text-[11px]">
              <div className="flex justify-between border-b border-slate-200/50 pb-1.5">
                <span className="text-slate-400 font-bold">Blueprint ID:</span>
                <span className="font-extrabold text-slate-800 font-mono">{data.blueprintId}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200/50 pb-1.5">
                <span className="text-slate-400 font-bold">Type:</span>
                <span className="font-semibold text-slate-800">{data.type}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200/50 pb-1.5">
                <span className="text-slate-400 font-bold">Version:</span>
                <span className="font-bold text-slate-800 font-mono">{data.version}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400 font-bold">Compiler Status:</span>
                <span className="font-extrabold text-emerald-600">{data.compilerStatus}</span>
              </div>
            </div>

            {data.content && (
              <div className="space-y-2">
                <span className="text-[10px] font-black uppercase text-slate-400">Spec Content Preview</span>
                <pre className="bg-slate-950 text-[10px] font-mono text-slate-300 rounded-xl p-3 border border-slate-800 overflow-x-auto max-h-40 overflow-y-auto leading-relaxed">
                  {data.content}
                </pre>
              </div>
            )}

            <button
              onClick={() => onTriggerAction?.("compile-blueprint", data)}
              className="w-full py-2 bg-slate-900 hover:bg-indigo-600 text-white rounded-xl text-xs font-bold shadow-xs cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Zap className="w-3.5 h-3.5" />
              Compile JUMO Blueprint
            </button>
          </div>
        )}

        {/* Render AI Agent details */}
        {type === "agent" && (
          <div className="space-y-5 animate-in fade-in-50 duration-150">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-violet-100 text-violet-800 flex items-center justify-center text-sm font-black uppercase border border-violet-200">
                {String(data?.displayName || data?.jumoName || "AI").substring(0, 2)}
              </div>
              <div>
                <span className="text-[10px] font-black uppercase text-slate-400">Cognitive Worker</span>
                <h4 className="text-xs font-extrabold text-slate-900">{data?.displayName || data?.jumoName || "AI Specialist"}</h4>
                <span className="text-[10px] text-slate-500 font-bold uppercase">{data?.jumoName || "JUMO AI Agent"}</span>
              </div>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl space-y-2 text-[11px]">
              <div className="flex justify-between border-b border-slate-200/50 pb-1.5">
                <span className="text-slate-400 font-bold">Specialization:</span>
                <span className="font-extrabold text-violet-700">{data?.specialization || "Sovereign Engineering"}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200/50 pb-1.5">
                <span className="text-slate-400 font-bold">Operating Role:</span>
                <span className="font-bold text-slate-800">{data?.role || "Specialist Agent"}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200/50 pb-1.5">
                <span className="text-slate-400 font-bold">Status:</span>
                <span className="font-extrabold text-emerald-600 uppercase">{data?.status || "ACTIVE"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400 font-bold">Memory Pool:</span>
                <span className="font-semibold text-slate-800">Isolated 4GB</span>
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-[10px] font-black uppercase text-slate-400">Assigned Capabilities</span>
              <div className="flex flex-wrap gap-1">
                {(data?.assignedSkills || data?.capabilities || []).map((skill: string, i: number) => (
                  <span key={i} className="text-[10px] bg-violet-50 text-violet-700 border border-violet-100/60 px-2.5 py-1 rounded-md font-extrabold">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {data?.latestInsight && (
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/60 text-xs space-y-2 text-slate-600 leading-relaxed">
                <div className="flex items-center gap-1.5 text-slate-800 font-extrabold text-[11px]">
                  <Info className="w-3.5 h-3.5 text-violet-600" />
                  <span>Latest Cognitive Insight</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed italic">
                  "{data.latestInsight}"
                </p>
              </div>
            )}

            <button
              onClick={() => onTriggerAction?.("command-agent", data)}
              className="w-full py-2 bg-slate-900 hover:bg-violet-600 text-white rounded-xl text-xs font-bold shadow-xs cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Zap className="w-3.5 h-3.5" />
              Command Agent Task
            </button>
          </div>
        )}


      </div>
    </div>
  );
}
