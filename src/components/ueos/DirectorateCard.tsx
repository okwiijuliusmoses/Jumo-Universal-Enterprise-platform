import React from "react";
import { Building, Users, Activity, ChevronRight, CheckCircle2, Clock, ShieldAlert } from "lucide-react";

export interface DepartmentSummary {
  id: string;
  name: string;
  code?: string;
  headName?: string;
  pendingActionsCount?: number;
  activeModulesCount?: number;
  status?: string;
}

export interface DirectorateCardProps {
  id: string;
  name: string;
  managerName: string;
  managerTitle?: string;
  performanceSummary: {
    kpiScore: string;
    budgetExecution: string;
    pendingApprovals: number;
    activeWorkflows: number;
  };
  departments: DepartmentSummary[];
  onSelectDepartment?: (deptId: string) => void;
}

export const DirectorateCard: React.FC<DirectorateCardProps> = ({
  id,
  name,
  managerName,
  managerTitle = "Director",
  performanceSummary,
  departments,
  onSelectDepartment,
}) => {
  return (
    <div id={`directorate-card-${id}`} className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs space-y-4">
      
      {/* Directorate Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <Building className="h-4 w-4 text-teal-600" />
            <h3 className="font-extrabold text-sm text-slate-900 uppercase tracking-wide">{name}</h3>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            <span className="font-semibold text-slate-700">Manager:</span> {managerName} ({managerTitle})
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="px-2.5 py-1 rounded bg-teal-50 text-teal-800 border border-teal-200 font-bold font-mono">
            KPI: {performanceSummary.kpiScore}
          </span>
          <span className="px-2.5 py-1 rounded bg-slate-100 text-slate-700 border border-slate-200 font-mono">
            Budget: {performanceSummary.budgetExecution}
          </span>
        </div>
      </div>

      {/* Performance Summary Indicators */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        <div className="p-2.5 bg-slate-50 border border-slate-200/80 rounded-lg">
          <div className="text-[10px] text-slate-500 uppercase font-semibold">Departments</div>
          <div className="text-base font-black text-slate-900">{departments.length}</div>
        </div>
        <div className="p-2.5 bg-slate-50 border border-slate-200/80 rounded-lg">
          <div className="text-[10px] text-slate-500 uppercase font-semibold">Active Workflows</div>
          <div className="text-base font-black text-slate-900">{performanceSummary.activeWorkflows}</div>
        </div>
        <div className="p-2.5 bg-amber-50/60 border border-amber-200 rounded-lg">
          <div className="text-[10px] text-amber-800 uppercase font-bold">Pending Approvals</div>
          <div className="text-base font-black text-amber-900">{performanceSummary.pendingApprovals}</div>
        </div>
        <div className="p-2.5 bg-emerald-50/60 border border-emerald-200 rounded-lg">
          <div className="text-[10px] text-emerald-800 uppercase font-bold">FAAP Audit</div>
          <div className="text-base font-black text-emerald-900">PASS ($0.00)</div>
        </div>
      </div>

      {/* Departments Sub-Grid */}
      <div className="space-y-2">
        <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
          Managed Departments ({departments.length})
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
          {departments.map((dept) => (
            <div
              key={dept.id}
              onClick={() => onSelectDepartment && onSelectDepartment(dept.id)}
              className="p-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg flex items-center justify-between cursor-pointer transition"
            >
              <div>
                <div className="font-bold text-xs text-slate-900 flex items-center gap-1.5">
                  <span>{dept.name}</span>
                  {dept.code && <span className="text-[10px] font-mono text-slate-500">[{dept.code}]</span>}
                </div>
                {dept.headName && <div className="text-[11px] text-slate-500">Head: {dept.headName}</div>}
              </div>

              <div className="flex items-center gap-2">
                {dept.pendingActionsCount ? (
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800">
                    {dept.pendingActionsCount} pending
                  </span>
                ) : (
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                    Operational
                  </span>
                )}
                <ChevronRight className="h-4 w-4 text-slate-400" />
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
