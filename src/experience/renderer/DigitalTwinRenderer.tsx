import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { 
  Building2, Server, Database, Cpu, Activity, ShieldAlert, 
  Workflow, FileCheck, Layers, Terminal, ChevronRight, Layout 
} from "lucide-react";
import { UEOSRuntimeClient } from "../../ueos/runtime/UEOSRuntimeClient";

export function DigitalTwinRenderer({ institutionId }: { institutionId: string }) {
  const [twin, setTwin] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadTwin() {
      try {
        const data = await UEOSRuntimeClient.fetchDigitalTwin(institutionId);
        setTwin(data);
      } catch (err) {
        console.error("Failed to load digital twin", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadTwin();
  }, [institutionId]);

  if (isLoading) return <div className="text-center p-20 text-slate-500 font-bold">Synchronizing Digital Twin...</div>;
  if (!twin) return <div className="text-center p-20 text-rose-500 font-bold">Digital Twin Not Found.</div>;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8 p-8">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight italic uppercase">{twin.name}</h2>
          <p className="text-slate-500 font-bold">Digital Twin Runtime Registry: {twin.status}</p>
        </div>
        <div className="bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full font-black text-xs uppercase tracking-widest">
          {twin.healthScore}% Operational
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Departments", value: twin.metrics.departments, icon: Building2 },
          { label: "AI Agents", value: twin.metrics.aiAgents, icon: Cpu },
          { label: "Workflows", value: twin.metrics.workflows, icon: Workflow },
          { label: "Cloud Nodes", value: twin.metrics.nodes, icon: Server },
        ].map(m => (
          <div key={m.label} className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm">
            <m.icon className="w-8 h-8 text-indigo-600 mb-4" />
            <div className="text-sm font-black text-slate-400 uppercase tracking-widest">{m.label}</div>
            <div className="text-2xl font-black text-slate-900">{m.value}</div>
          </div>
        ))}
      </div>

      <div className="bg-white p-8 rounded-[2rem] border border-slate-200">
        <h3 className="text-lg font-black text-slate-900 mb-6 uppercase tracking-tight">Enterprise Infrastructure</h3>
        <div className="space-y-4">
            {twin.infrastructure.map((inf: any) => (
                <div key={inf.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                    <span className="font-bold text-slate-700">{inf.name}</span>
                    <span className="text-xs font-black text-indigo-600 uppercase tracking-widest">{inf.status}</span>
                </div>
            ))}
        </div>
      </div>
    </motion.div>
  );
}
