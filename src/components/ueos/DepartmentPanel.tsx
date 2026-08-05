import React, { useState } from "react";
import { 
  Building, Sliders, Bell, CheckSquare, Bot, Zap, ChevronRight, 
  Layers, ArrowRight, ShieldCheck, AlertCircle
} from "lucide-react";

export interface ModuleItem {
  id: string;
  name: string;
  code?: string;
  description?: string;
  status?: string;
  icon?: any;
}

export interface DepartmentPanelProps {
  deptId: string;
  deptName: string;
  code?: string;
  headName?: string;
  modules: ModuleItem[];
  activeModuleId: string;
  onSelectModule: (moduleId: string) => void;
  notifications?: string[];
  pendingApprovals?: { id: string; title: string; amount?: string; requester: string }[];
  children?: React.ReactNode; // Center working module content
}

export const DepartmentPanel: React.FC<DepartmentPanelProps> = ({
  deptId,
  deptName,
  code = "DEPT-01",
  headName = "Department Head",
  modules,
  activeModuleId,
  onSelectModule,
  notifications = [
    "Fee billing reconciliation completed for Semester II.",
    "Budget threshold notification: FAAP Ledger updated."
  ],
  pendingApprovals = [
    { id: "app-101", title: "Procurement Requisition #842", amount: "$12,450.00", requester: "ICT Directorate" },
    { id: "app-102", title: "Faculty Research Grant Stipend", amount: "$3,200.00", requester: "Dr. A. Okello" }
  ],
  children,
}) => {
  const [activeTab, setActiveTab] = useState<"modules" | "approvals" | "ai">("modules");

  return (
    <div id={`department-panel-${deptId}`} className="space-y-4">
      
      {/* Department Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <Building className="h-5 w-5 text-teal-600" />
            <h2 className="text-base font-extrabold text-slate-900 tracking-tight">{deptName} Workspace</h2>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
              [{code}]
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Department Head: <span className="font-bold text-slate-700">{headName}</span> • Standard Operational Isolation
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="px-2.5 py-1 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold">
            Status: ACTIVE
          </span>
          <span className="px-2.5 py-1 rounded bg-slate-100 text-slate-700 border border-slate-200">
            {modules.length} Working Modules
          </span>
        </div>
      </div>

      {/* 3-Column Department Layout (LEFT Navigation | CENTER Working Modules | RIGHT Context Panel) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        
        {/* LEFT: Navigation & Functions list (3 Cols) */}
        <div className="lg:col-span-3 bg-white border border-slate-200 rounded-xl p-4 shadow-2xs space-y-3">
          <div className="text-xs font-extrabold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-2">
            Working Modules
          </div>

          <div className="space-y-1">
            {modules.map((mod) => {
              const isActive = activeModuleId === mod.id;
              return (
                <button
                  key={mod.id}
                  onClick={() => onSelectModule(mod.id)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold flex items-center justify-between transition cursor-pointer ${
                    isActive 
                      ? "bg-slate-900 text-white font-bold shadow-xs" 
                      : "text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Sliders className={`h-3.5 w-3.5 ${isActive ? "text-teal-400" : "text-slate-400"}`} />
                    <span className="truncate">{mod.name}</span>
                  </div>
                  <ChevronRight className={`h-3.5 w-3.5 ${isActive ? "text-teal-400" : "text-slate-300"}`} />
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-100 space-y-2">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Quick Department Actions
            </div>
            <button className="w-full text-left px-2.5 py-1.5 rounded bg-teal-50 hover:bg-teal-100 text-teal-800 border border-teal-200 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer">
              <Zap className="h-3.5 w-3.5 text-teal-600" />
              <span>New Entry / Transaction</span>
            </button>
          </div>
        </div>

        {/* CENTER: Working Modules Container (6 Cols) */}
        <div className="lg:col-span-6 space-y-4">
          {children ? (
            children
          ) : (
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-2xs text-center space-y-3">
              <Building className="h-8 w-8 text-slate-400 mx-auto" />
              <div className="font-bold text-slate-800 text-sm">Select a Module to Load Operational Component</div>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Choose a module from the left menu to view data tables, forms, and workflow pipelines.
              </p>
            </div>
          )}
        </div>

        {/* RIGHT: Context Panel (3 Cols) */}
        <div className="lg:col-span-3 space-y-4">
          
          {/* Notifications Card */}
          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs space-y-3">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
              <Bell className="h-4 w-4 text-teal-600" />
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Department Alerts</h4>
            </div>

            <div className="space-y-2 text-xs">
              {notifications.map((note, i) => (
                <div key={i} className="p-2.5 bg-slate-50 border border-slate-200/80 rounded-lg text-slate-700 leading-snug">
                  {note}
                </div>
              ))}
            </div>
          </div>

          {/* Pending Approvals Queue */}
          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <div className="flex items-center gap-2">
                <CheckSquare className="h-4 w-4 text-amber-600" />
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Pending Approvals</h4>
              </div>
              <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 bg-amber-100 text-amber-900 rounded">
                {pendingApprovals.length}
              </span>
            </div>

            <div className="space-y-2 text-xs">
              {pendingApprovals.map((app) => (
                <div key={app.id} className="p-2.5 bg-amber-50/50 border border-amber-200 rounded-lg space-y-1">
                  <div className="font-bold text-slate-900 text-[11px]">{app.title}</div>
                  <div className="flex items-center justify-between text-[10px] text-slate-600">
                    <span>{app.requester}</span>
                    {app.amount && <span className="font-mono font-bold text-emerald-700">{app.amount}</span>}
                  </div>
                  <div className="flex items-center gap-1 pt-1">
                    <button className="px-2 py-0.5 bg-slate-900 text-white rounded text-[10px] font-bold hover:bg-slate-800 transition cursor-pointer">
                      Approve
                    </button>
                    <button className="px-2 py-0.5 bg-slate-100 text-slate-700 border border-slate-200 rounded text-[10px] hover:bg-slate-200 transition cursor-pointer">
                      Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contextual AI Assistant Card */}
          <div className="bg-slate-900 text-white rounded-xl p-4 space-y-3">
            <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
              <Bot className="h-4 w-4 text-teal-400" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-teal-300">Department AI Helper</h4>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Active contextual agent analyzing FAAP balances and operational compliance for {deptName}.
            </p>

            <button className="w-full px-3 py-1.5 bg-teal-600 hover:bg-teal-500 text-white font-bold rounded text-xs transition cursor-pointer flex items-center justify-center gap-1.5">
              <span>Ask Department AI</span>
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
