
import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { 
  Layout, 
  ChevronRight, 
  Activity, 
  Users, 
  Workflow, 
  FileText,
  Briefcase,
  Monitor,
  ArrowLeft
} from "lucide-react";

interface PortalRendererProps {
  instance: any;
  onBack: () => void;
}

export function PortalRenderer({ instance, onBack }: PortalRendererProps) {
  const [activePortal, setActivePortal] = useState<any>(instance?.portals?.[0] || null);

  if (!instance) return null;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="p-2 hover:bg-slate-100 rounded-xl text-slate-500 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">{instance.name} Workspace</h2>
            <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">
              <span className="font-bold text-slate-600">Instance ID: {instance.id}</span>
              <span>•</span>
              <span>{instance.templateName}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Portal Navigation Side Rail */}
        <div className="lg:col-span-1 space-y-4">
          <div className="p-4 bg-white border border-slate-100 rounded-2xl shadow-sm">
             <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-4 px-2">Operational Portals</span>
             <div className="space-y-1">
                {instance.portals?.map((portal: any) => (
                  <button
                    key={portal.id}
                    onClick={() => setActivePortal(portal)}
                    className={`w-full text-left p-3 rounded-xl text-sm font-bold transition-all flex items-center justify-between group ${
                      activePortal?.id === portal.id 
                        ? "bg-slate-900 text-white shadow-lg shadow-slate-200" 
                        : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Monitor className={`w-4 h-4 ${activePortal?.id === portal.id ? "text-blue-400" : "text-slate-300 group-hover:text-slate-400"}`} />
                      {portal.name}
                    </div>
                    {activePortal?.id === portal.id && <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />}
                  </button>
                ))}
             </div>
          </div>

          <div className="p-4 bg-indigo-900 rounded-2xl text-white">
             <div className="flex items-center gap-3 mb-4">
                <Users className="w-5 h-5 text-indigo-300" />
                <span className="font-bold text-sm">Governance Body</span>
             </div>
             <div className="space-y-1">
                <p className="text-xs font-bold text-indigo-200 uppercase tracking-wider">{instance.governance?.title || "Governing Authority"}</p>
                <p className="text-xs text-indigo-400">{instance.governance?.role || "EXECUTIVE_OFFICE"}</p>
             </div>
          </div>
        </div>

        {/* Portal Content Viewport */}
        <div className="lg:col-span-3 space-y-8">
          {activePortal ? (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-400">
               <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm mb-8 flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-slate-800">{activePortal.name}</h3>
                    <p className="text-sm text-slate-500 mt-1">Operational view for {activePortal.roles?.join(", ") || "Authorized Staff"}.</p>
                  </div>
                  <div className="flex items-center gap-3">
                     <div className="text-right">
                        <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Portal Health</span>
                        <span className="text-xs font-black text-emerald-500">OPTIMIZED</span>
                     </div>
                  </div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {activePortal.navigation?.map((nav: any, i: number) => (
                    <motion.button
                      key={i}
                      whileHover={{ y: -4 }}
                      className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all text-left group"
                    >
                      <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600 mb-4 transition-colors">
                        <Monitor className="w-5 h-5" />
                      </div>
                      <span className="block font-bold text-slate-800 mb-1">{nav.title}</span>
                      <span className="text-xs text-slate-400 font-medium">Launch application module</span>
                    </motion.button>
                  )) || (
                    <>
                      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
                         <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center"><Layout className="w-5 h-5" /></div>
                         <div><span className="block font-bold text-slate-800">Dashboard</span><span className="text-[10px] text-slate-400 font-black uppercase">Core View</span></div>
                      </div>
                      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
                         <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center"><FileText className="w-5 h-5" /></div>
                         <div><span className="block font-bold text-slate-800">Reports</span><span className="text-[10px] text-slate-400 font-black uppercase">Analytics</span></div>
                      </div>
                      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
                         <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center"><Workflow className="w-5 h-5" /></div>
                         <div><span className="block font-bold text-slate-800">Tasks</span><span className="text-[10px] text-slate-400 font-black uppercase">Workflows</span></div>
                      </div>
                    </>
                  )}
               </div>

               <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                     <h4 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
                        <Briefcase className="w-4 h-4 text-blue-500" />
                        Operational Directorate
                     </h4>
                     <div className="space-y-4">
                        {instance.directorates?.slice(0, 3).map((dir: any) => (
                          <div key={dir.id} className="p-4 bg-slate-50 rounded-2xl flex items-center justify-between">
                             <div>
                                <span className="block text-xs font-bold text-slate-800">{dir.name}</span>
                                <span className="text-[10px] text-slate-400 font-medium">Head: {dir.governanceHead || "Administrator"}</span>
                             </div>
                             <ChevronRight className="w-4 h-4 text-slate-300" />
                          </div>
                        ))}
                     </div>
                  </div>

                  <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                     <h4 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
                        <Activity className="w-4 h-4 text-emerald-500" />
                        Live Instance Metrics
                     </h4>
                     <div className="space-y-6">
                        <div className="space-y-2">
                           <div className="flex justify-between text-xs font-bold text-slate-500 uppercase">
                              <span>Workflows Completion</span>
                              <span className="text-emerald-600">92%</span>
                           </div>
                           <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                              <div className="h-full bg-emerald-500 w-[92%]" />
                           </div>
                        </div>
                        <div className="space-y-2">
                           <div className="flex justify-between text-xs font-bold text-slate-500 uppercase">
                              <span>Resource Allocation</span>
                              <span className="text-blue-600">64%</span>
                           </div>
                           <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                              <div className="h-full bg-blue-500 w-[64%]" />
                           </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 mt-6">
                           <div className="bg-slate-50 p-4 rounded-2xl text-center">
                              <span className="block text-2xl font-black text-slate-800">{instance.modules?.length || 0}</span>
                              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Active Modules</span>
                           </div>
                           <div className="bg-slate-50 p-4 rounded-2xl text-center">
                              <span className="block text-2xl font-black text-slate-800">{instance.users?.length || 0}</span>
                              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total Users</span>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
          ) : (
            <div className="h-96 bg-white border border-slate-100 rounded-3xl flex flex-col items-center justify-center text-center p-10">
               <Monitor className="w-12 h-12 text-slate-200 mb-4" />
               <h3 className="font-bold text-slate-800">No Active Portal Selected</h3>
               <p className="text-slate-400 text-sm max-w-xs mt-2">Please select an operational portal from the navigation rail to access institutional modules.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
