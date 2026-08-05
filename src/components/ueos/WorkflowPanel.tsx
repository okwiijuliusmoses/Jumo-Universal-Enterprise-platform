import React from "react";
import { GitMerge, CheckCircle2, Clock, AlertTriangle, ArrowRight, Play } from "lucide-react";

export interface WorkflowStep {
  id: string;
  name: string;
  status: "completed" | "in_progress" | "pending" | "failed";
  assignedTo?: string;
  updatedAt?: string;
}

export interface WorkflowPanelProps {
  workflowId?: string;
  workflowName?: string;
  steps?: WorkflowStep[];
  onTriggerStep?: (stepId: string) => void;
}

const DEFAULT_STEPS: WorkflowStep[] = [
  { id: "wf-1", name: "Application Submission", status: "completed", assignedTo: "Public Portal Gateway", updatedAt: "10 mins ago" },
  { id: "wf-2", name: "Credential Verification", status: "completed", assignedTo: "Registrar Operations", updatedAt: "5 mins ago" },
  { id: "wf-3", name: "FAAP Fee Settlement Check", status: "in_progress", assignedTo: "Bursary Ledger Engine", updatedAt: "Just now" },
  { id: "wf-4", name: "Faculty Senate Endorsement", status: "pending", assignedTo: "Academic Senate", updatedAt: "-" },
  { id: "wf-5", name: "Registration Dispatch & SIS Entry", status: "pending", assignedTo: "SIS System Automation", updatedAt: "-" },
];

export const WorkflowPanel: React.FC<WorkflowPanelProps> = ({
  workflowId = "WF-2026-881",
  workflowName = "Admissions & FAAP Clearance Pipeline",
  steps = DEFAULT_STEPS,
  onTriggerStep,
}) => {
  return (
    <div id="workflow-panel" className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs space-y-4">
      
      {/* Panel Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <GitMerge className="h-4 w-4 text-purple-600" />
            <h3 className="font-extrabold text-sm text-slate-900">{workflowName}</h3>
          </div>
          <p className="text-xs text-slate-500 font-mono">Workflow ID: {workflowId}</p>
        </div>

        <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded bg-purple-50 text-purple-800 border border-purple-200 shrink-0">
          State Authoritative Engine
        </span>
      </div>

      {/* Step Pipeline Visualization */}
      <div className="space-y-3">
        {steps.map((step, idx) => {
          const isCompleted = step.status === "completed";
          const isInProgress = step.status === "in_progress";
          const isPending = step.status === "pending";

          return (
            <div
              key={step.id}
              className={`p-3.5 border rounded-lg flex items-center justify-between text-xs transition ${
                isInProgress
                  ? "bg-purple-50/40 border-purple-300 ring-1 ring-purple-400/20"
                  : isCompleted
                  ? "bg-slate-50 border-slate-200"
                  : "bg-white border-slate-200 opacity-70"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-7 h-7 rounded-full text-xs font-bold font-mono flex items-center justify-center shrink-0 ${
                  isCompleted 
                    ? "bg-emerald-600 text-white" 
                    : isInProgress 
                    ? "bg-purple-600 text-white animate-pulse" 
                    : "bg-slate-200 text-slate-600"
                }`}>
                  {isCompleted ? "✓" : idx + 1}
                </div>

                <div>
                  <div className="font-bold text-slate-900 text-xs">{step.name}</div>
                  <div className="text-[11px] text-slate-500">
                    Assigned: <span className="font-semibold text-slate-700">{step.assignedTo || "System"}</span> • {step.updatedAt}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border uppercase ${
                  isCompleted
                    ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                    : isInProgress
                    ? "bg-purple-50 text-purple-800 border-purple-200"
                    : "bg-slate-100 text-slate-600 border-slate-200"
                }`}>
                  {step.status}
                </span>

                {isInProgress && onTriggerStep && (
                  <button
                    onClick={() => onTriggerStep(step.id)}
                    className="p-1 bg-purple-600 hover:bg-purple-700 text-white rounded cursor-pointer"
                    title="Advance Step"
                  >
                    <Play className="h-3 w-3" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
