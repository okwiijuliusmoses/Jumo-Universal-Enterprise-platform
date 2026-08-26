
import React, { useMemo } from 'react';
import { 
  CheckCircle, XCircle, AlertCircle, Shield, 
  Cpu, Layout, Database, Activity, FileText,
  Search, Filter, ChevronRight
} from 'lucide-react';
import { GlobalModuleRegistry, GlobalCapabilityRegistry } from '../../registry/JumoGlobalRegistry';
import { FormSchemaRegistry } from '../../registry/FormSchemaRegistry';

export const ImplementationAudit: React.FC = () => {
  const auditData = useMemo(() => {
    return GlobalCapabilityRegistry.map(cap => {
      const module = GlobalModuleRegistry.find(m => m.id === cap.moduleId);
      const form = cap.formId ? FormSchemaRegistry[cap.formId] : null;
      
      const hasForm = !!form;
      const hasWorkspace = !!cap.workspaceDefinition;
      const isVerified = cap.implementationStatus === 'VERIFIED';
      
      let score = 0;
      if (hasForm) score += 33;
      if (hasWorkspace) score += 33;
      if (isVerified) score += 34;

      return {
        ...cap,
        moduleName: module?.name || 'Unknown',
        product: module?.productId || 'N/A',
        hasForm,
        hasWorkspace,
        score
      };
    });
  }, []);

  const stats = useMemo(() => {
    const total = auditData.length;
    const passed = auditData.filter(d => d.score === 100).length;
    const partial = auditData.filter(d => d.score > 0 && d.score < 100).length;
    const failed = auditData.filter(d => d.score === 0).length;
    
    return { total, passed, partial, failed, percent: Math.round((passed / total) * 100) };
  }, [auditData]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 p-8 font-sans">
      <div className="max-w-[1400px] mx-auto space-y-8">
        {/* Audit Header */}
        <div className="flex items-end justify-between border-b border-slate-800 pb-8">
          <div>
            <div className="flex items-center gap-2 text-emerald-500 text-[10px] font-black uppercase tracking-[0.2em] mb-3">
               <Shield className="w-4 h-4" />
               <span>Sovereign Implementation Audit</span>
            </div>
            <h1 className="text-4xl font-black text-white tracking-tight">JUMO UEOS Capability Matrix</h1>
            <p className="text-slate-500 text-sm mt-2 max-w-xl">
               Real-time verification of institutional capabilities across all sovereign products. 
               Criteria: Registry Presence + Schema Definition + Operational Workspace.
            </p>
          </div>

          <div className="flex gap-4">
             <div className="bg-slate-900/50 border border-slate-800 p-4 rounded-2xl text-center min-w-[120px]">
                <div className="text-2xl font-black text-white">{stats.percent}%</div>
                <div className="text-[9px] font-bold text-slate-500 uppercase">Ready</div>
             </div>
             <div className="bg-emerald-900/20 border border-emerald-800/30 p-4 rounded-2xl text-center min-w-[120px]">
                <div className="text-2xl font-black text-emerald-500">{stats.passed}</div>
                <div className="text-[9px] font-bold text-emerald-600 uppercase">Verified</div>
             </div>
          </div>
        </div>

        {/* Audit Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
           {auditData.map(cap => (
              <div key={cap.id} className="bg-slate-900/30 border border-slate-800/50 rounded-2xl p-5 hover:border-slate-700 transition-all group">
                 <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                       <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-slate-400 group-hover:text-emerald-500 transition-colors">
                          <cap.icon className="w-5 h-5" />
                       </div>
                       <div>
                          <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest leading-none mb-1">{cap.product}</div>
                          <div className="text-xs font-bold text-white uppercase tracking-tight">{cap.name}</div>
                       </div>
                    </div>
                    {cap.score === 100 ? (
                       <div className="flex items-center gap-1.5 text-emerald-500 text-[9px] font-black uppercase">
                          <CheckCircle className="w-3.5 h-3.5" />
                          <span>Pass</span>
                       </div>
                    ) : (
                       <div className="flex items-center gap-1.5 text-amber-500 text-[9px] font-black uppercase">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>Audit</span>
                       </div>
                    )}
                 </div>

                 <div className="space-y-3">
                    <div className="flex items-center justify-between text-[10px]">
                       <span className="text-slate-500">Registry Definition</span>
                       <span className="text-slate-300 font-bold uppercase">{cap.implementationStatus}</span>
                    </div>
                    <div className="flex items-center justify-between text-[10px]">
                       <span className="text-slate-500">Form Schema</span>
                       {cap.hasForm ? (
                          <span className="text-emerald-500 font-bold uppercase">Defined ({cap.formId})</span>
                       ) : (
                          <span className="text-rose-500 font-bold uppercase">Missing</span>
                       )}
                    </div>
                    <div className="flex items-center justify-between text-[10px]">
                       <span className="text-slate-500">Workspace Layer</span>
                       {cap.hasWorkspace ? (
                          <span className="text-emerald-500 font-bold uppercase">Active</span>
                       ) : (
                          <span className="text-rose-500 font-bold uppercase">Missing</span>
                       )}
                    </div>
                 </div>

                 <div className="mt-5 h-1 bg-slate-800 rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-1000 ${cap.score === 100 ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]' : 'bg-amber-500'}`} 
                      style={{ width: `${cap.score}%` }} 
                    />
                 </div>
              </div>
           ))}
        </div>

        {/* Audit Legend */}
        <div className="flex items-center justify-center gap-12 py-12 border-t border-slate-900">
           <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-emerald-500" />
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Sovereign Ready</span>
           </div>
           <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-amber-500" />
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Infrastructure Only</span>
           </div>
           <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-rose-500" />
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Awaiting Definition</span>
           </div>
        </div>
      </div>
    </div>
  );
};
