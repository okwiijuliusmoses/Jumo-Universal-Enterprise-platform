import React from "react";
import { Brain, Sparkles, CheckCircle2, AlertTriangle, ShieldCheck, ArrowRight, Terminal } from "lucide-react";

export interface StructuredAIResponseProps {
  response: any;
  className?: string;
  theme?: "dark" | "light";
}

/**
 * Safely renders any AI response object or string.
 * Converts complex reasoning payloads ({ requestId, mode, understoodIntent, response, plan, delegation, ... })
 * into structured UI blocks without ever risking React Error #31 (Objects as React children).
 */
export function StructuredAIResponseRenderer({
  response,
  className = "",
  theme = "dark"
}: StructuredAIResponseProps) {
  if (response === null || response === undefined) {
    return null;
  }

  // Helper to safely format text/objects into printable strings
  const safeText = (val: any): string => {
    if (val === null || val === undefined) return "";
    if (typeof val === "string") return val;
    if (typeof val === "number" || typeof val === "boolean") return String(val);
    try {
      return JSON.stringify(val, null, 2);
    } catch {
      return String(val);
    }
  };

  const isDark = theme === "dark";

  // If response is a simple string or primitive
  if (typeof response !== "object") {
    return (
      <div className={`whitespace-pre-wrap leading-relaxed text-xs font-mono ${isDark ? "text-emerald-400" : "text-slate-800"} ${className}`}>
        {safeText(response)}
      </div>
    );
  }

  // If response is an array
  if (Array.isArray(response)) {
    return (
      <div className={`space-y-2 ${className}`}>
        {response.map((item, idx) => (
          <div key={idx} className={`p-2.5 rounded-lg border text-xs font-mono ${isDark ? "bg-slate-900/60 border-slate-800 text-slate-300" : "bg-slate-50 border-slate-200 text-slate-800"}`}>
            <StructuredAIResponseRenderer response={item} theme={theme} />
          </div>
        ))}
      </div>
    );
  }

  // Response is a structured object
  const {
    requestId,
    understoodIntent,
    response: mainText,
    plan,
    delegation,
    requiresHumanApproval,
    timestamp
  } = response;

  return (
    <div className={`space-y-3.5 font-sans ${className}`}>
      {/* Header Info Bar */}
      {(requestId || understoodIntent || timestamp) && (
        <div className={`flex items-center justify-between gap-2 border-b pb-2 text-[10px] uppercase tracking-wider font-mono ${isDark ? "border-slate-800 text-slate-400" : "border-slate-200 text-slate-500"}`}>
          <div className="flex items-center gap-1.5">
            <Brain className="w-3.5 h-3.5 text-blue-500 shrink-0" />
            {understoodIntent ? (
              <span className="font-black text-blue-400 bg-blue-950/40 px-2 py-0.5 rounded border border-blue-900/40">
                INTENT: {safeText(understoodIntent)}
              </span>
            ) : (
              <span>Reasoning Stream</span>
            )}
          </div>
          <div className="flex items-center gap-2">
            {requestId && <span>ID: {safeText(requestId).slice(0, 8)}</span>}
            {timestamp && <span className="opacity-60">{safeText(timestamp)}</span>}
          </div>
        </div>
      )}

      {/* Main Response Content */}
      {mainText !== undefined && (
        <div className={`whitespace-pre-wrap leading-relaxed text-xs font-mono ${isDark ? "text-emerald-300/90" : "text-slate-800"}`}>
          {safeText(mainText)}
        </div>
      )}

      {/* Fallback rendering if no 'response' field exists on the object */}
      {mainText === undefined && !plan && !delegation && (
        <pre className={`p-3 rounded-lg overflow-x-auto text-[11px] font-mono leading-snug ${isDark ? "bg-slate-900 text-emerald-400 border border-slate-800" : "bg-slate-100 text-slate-900 border border-slate-200"}`}>
          {safeText(response)}
        </pre>
      )}

      {/* Cognitive Action Plan Steps */}
      {Array.isArray(plan) && plan.length > 0 && (
        <div className={`p-3.5 rounded-xl border space-y-2.5 ${isDark ? "bg-slate-900/80 border-slate-800" : "bg-slate-50 border-slate-200"}`}>
          <div className="flex items-center gap-1.5 border-b pb-1.5 border-slate-800/40 text-[10px] font-black uppercase tracking-widest text-amber-500">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Reasoned Cognitive Action Items ({plan.length} Steps)</span>
          </div>
          <div className="space-y-2">
            {plan.map((step: any, idx: number) => (
              <div key={idx} className="flex items-start gap-2 text-xs">
                <span className="text-amber-500 font-extrabold shrink-0 mt-0.5">•</span>
                <div className="space-y-0.5">
                  <div className={`font-bold ${isDark ? "text-slate-200" : "text-slate-900"}`}>
                    {safeText(step?.title || step?.name || `Step ${idx + 1}`)}
                  </div>
                  {(step?.description || step?.desc) && (
                    <div className={`text-[11px] leading-relaxed ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                      {safeText(step.description || step.desc)}
                    </div>
                  )}
                  {step?.responsibleLayer && (
                    <span className="inline-block text-[9px] font-mono uppercase px-1.5 py-0.5 bg-blue-950/60 border border-blue-800/40 text-blue-300 rounded font-bold mt-1">
                      Target Layer: {safeText(step.responsibleLayer)}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Swarm Delegation Info */}
      {delegation?.required && (
        <div className={`p-2.5 rounded-lg border text-[10px] font-bold flex items-center justify-between gap-2 ${isDark ? "bg-indigo-950/40 border-indigo-900/60 text-indigo-300" : "bg-indigo-50 border-indigo-100 text-indigo-800"}`}>
          <div className="flex items-center gap-2">
            <Terminal className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
            <span>Workforce Swarm Delegated to Node: <strong className="font-mono text-indigo-200">{safeText(delegation.agentId)}</strong></span>
          </div>
          {delegation.reason && <span className="opacity-80 italic">({safeText(delegation.reason)})</span>}
        </div>
      )}

      {/* Human Approval Required Notice */}
      {requiresHumanApproval && (
        <div className={`p-2.5 rounded-lg border text-[10px] font-black uppercase tracking-wider flex items-center gap-2 ${isDark ? "bg-amber-950/40 border-amber-900/60 text-amber-300" : "bg-amber-50 border-amber-200 text-amber-800"}`}>
          <AlertTriangle className="w-3.5 h-3.5 text-amber-500 shrink-0" />
          <span>Requires Human Architect Gate Authorization Before Lock</span>
        </div>
      )}
    </div>
  );
}
