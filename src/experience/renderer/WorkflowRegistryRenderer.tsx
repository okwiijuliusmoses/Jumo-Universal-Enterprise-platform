
import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { 
  Workflow, 
  Play, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  ChevronRight,
  Activity,
  GitBranch,
  Settings,
  Users
} from "lucide-react";
import { UEOSRuntimeClient } from "../../ueos/runtime/UEOSRuntimeClient";

export function WorkflowRegistryRenderer() {
  const [workflows, setWorkflows] = useState<any[]>([]);
  const [metrics, setMetrics] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadWorkflows() {
      try {
        const [wfData, metricData] = await Promise.all([
          UEOSRuntimeClient.fetchWorkflows(),
          UEOSRuntimeClient.fetchDashboardMetrics()
        ]);
        setWorkflows(wfData || []);
        setMetrics(metricData);
      } catch (err) {
        console.error("Workflow loading failed", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadWorkflows();
  }, []);

  if (isLoading) {
    return <div className="animate-pulse space-y-4">
      <div className="h-10 bg-slate-200 rounded-lg w-1/4" />
      <div className="space-y-4">
        {[1, 2, 3].map(i => <div key={i} className="h-24 bg-slate-200 rounded-2xl" />)}
      </div>
    </div>;
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">Runtime Workflows</h2>
        <p className="text-slate-500">Orchestrate and monitor live enterprise process flows.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active Flows</span>
            <Activity className="w-4 h-4 text-emerald-500" />
          </div>
          <span className="text-3xl font-black text-slate-900">{workflows.length}</span>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Executions Today</span>
            <Play className="w-4 h-4 text-blue-500" />
          </div>
          <span className="text-3xl font-black text-slate-900">
            {metrics?.workflowMetrics?.executionsToday || "---"}
          </span>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Completion Rate</span>
            <CheckCircle className="w-4 h-4 text-emerald-500" />
          </div>
          <span className="text-3xl font-black text-slate-900">
            {metrics?.workflowMetrics?.completionRate || "---"}
          </span>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-50 flex items-center justify-between">
          <h3 className="font-bold text-slate-800">Workflow Registry</h3>
          <button className="bg-slate-900 text-white px-4 py-1.5 rounded-xl text-xs font-bold hover:bg-slate-800 transition-all">
            Designer Mode
          </button>
        </div>
        
        {workflows.length === 0 ? (
          <div className="p-20 text-center text-slate-400 italic">
            No workflows registered in the current runtime context.
          </div>
        ) : (
          <div className="divide-y divide-slate-50">
            {workflows.map((wf) => (
              <div key={wf.id} className="p-6 flex items-center gap-6 hover:bg-slate-50 transition-colors">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                  <GitBranch className="w-6 h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <h4 className="font-bold text-slate-900">{wf.name}</h4>
                    <span className="text-[10px] font-black bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-full uppercase">
                      {wf.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-slate-400">
                    <div className="flex items-center gap-1.5">
                      <Settings className="w-3.5 h-3.5" />
                      <span>Trigger: {wf.trigger}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5" />
                      <span>Roles: {Array.isArray(wf.roles) ? wf.roles.join(", ") : wf.roles}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Last Run</span>
                    <span className="text-xs font-bold text-slate-700">2 mins ago</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-300" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
