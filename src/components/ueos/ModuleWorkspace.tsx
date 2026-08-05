import React, { useState } from "react";
import { Sliders, Layers, FileText, BarChart3, Plus, RefreshCw, CheckCircle2 } from "lucide-react";
import { EnterpriseTable } from "./EnterpriseTable";
import { EnterpriseFormWizard } from "./EnterpriseFormWizard";
import { WorkflowPanel } from "./WorkflowPanel";

export interface ModuleWorkspaceProps {
  moduleId: string;
  moduleName: string;
  status?: string;
  description?: string;
  tableColumns?: any[];
  tableData?: any[];
  workflowSteps?: any[];
  onActionClick?: (actionName: string) => void;
}

export const ModuleWorkspace: React.FC<ModuleWorkspaceProps> = ({
  moduleId,
  moduleName,
  status = "OPERATIONAL",
  description = "Module workspace executing sovereign domain functions with FAAP ledger consistency.",
  tableColumns,
  tableData,
  workflowSteps,
  onActionClick,
}) => {
  const [activeTab, setActiveTab] = useState<"table" | "form" | "workflow" | "reports">("table");

  const defaultColumns = tableColumns || [
    { key: "id", label: "Record ID" },
    { key: "name", label: "Entity Name" },
    { key: "category", label: "Category" },
    { key: "status", label: "Status" },
    { key: "amount", label: "FAAP Balance" }
  ];

  const defaultData = tableData || [
    { id: "REC-101", name: "Student Admissions File", category: "Academic SIS", status: "Active", amount: "$50.00 Cleared" },
    { id: "REC-102", name: "Faculty Research Allocation", category: "FAAP Ledger", status: "Approved", amount: "$12,400.00" },
    { id: "REC-103", name: "Campus Procurement Requisition", category: "Supply Chain", status: "Pending", amount: "$3,800.00" }
  ];

  return (
    <div id={`module-workspace-${moduleId}`} className="space-y-5">
      
      {/* Module Workspace Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <Sliders className="h-5 w-5 text-teal-600" />
              <h2 className="text-base font-extrabold text-slate-900 tracking-tight">{moduleName} Workspace</h2>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold">
                {status}
              </span>
            </div>
            <p className="text-xs text-slate-600 mt-0.5">{description}</p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab("form")}
              className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-3 py-1.5 rounded-lg text-xs flex items-center gap-1.5 transition cursor-pointer shrink-0"
            >
              <Plus className="h-3.5 w-3.5 text-teal-400" />
              <span>New Record / Entry</span>
            </button>
          </div>
        </div>

        {/* View Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto py-1">
          <button
            onClick={() => setActiveTab("table")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition ${
              activeTab === "table" ? "bg-slate-900 text-white font-bold" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            Records Registry
          </button>
          <button
            onClick={() => setActiveTab("form")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition ${
              activeTab === "form" ? "bg-slate-900 text-white font-bold" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            Entry Wizard
          </button>
          <button
            onClick={() => setActiveTab("workflow")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition ${
              activeTab === "workflow" ? "bg-slate-900 text-white font-bold" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            Workflow Pipeline
          </button>
        </div>
      </div>

      {/* Module Workspace Content */}
      {activeTab === "table" && (
        <EnterpriseTable
          title={`${moduleName} Records Registry`}
          columns={defaultColumns}
          data={defaultData}
        />
      )}

      {activeTab === "form" && (
        <EnterpriseFormWizard
          title={`${moduleName} Entry Form Wizard`}
        />
      )}

      {activeTab === "workflow" && (
        <WorkflowPanel
          workflowName={`${moduleName} Operational Workflow`}
          steps={workflowSteps}
        />
      )}

    </div>
  );
};
