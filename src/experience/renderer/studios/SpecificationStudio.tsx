import React, { useState } from 'react';
import { 
  Lightbulb, Target, Building2, Layers, 
  Cpu, Rocket, Plus, Search, Filter,
  CheckCircle2, Clock, ShieldCheck, X
} from 'lucide-react';
import { ArchitectureRequest } from '../../../core/runtime/sovereignState';
import { CoordinationEvent } from '../../../core/runtime/sovereignState';
import { DigitalEcosystemSpecificationForm } from '../specification/DigitalEcosystemSpecificationForm';
import { CanonicalEcosystemSpecification } from '../../../core/specification/JumoSpecificationCompiler';

interface SpecificationStudioProps {
  requests: ArchitectureRequest[];
  onCreateRequest: (data: CanonicalEcosystemSpecification) => void;
  eventLog?: CoordinationEvent[];
}

export const SpecificationStudio: React.FC<SpecificationStudioProps> = ({
  requests,
  onCreateRequest,
  eventLog = []
}) => {
  const [isCreating, setIsCreating] = useState(false);

  const handleSubmit = (spec: CanonicalEcosystemSpecification) => {
    onCreateRequest(spec);
    setIsCreating(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white">
            <Lightbulb className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-black text-slate-900 tracking-tight uppercase">Specification Studio</h2>
            <p className="text-xs text-slate-500 font-medium">Authoritative Digital Ecosystem & Product Specification Compiler</p>
          </div>
        </div>
        {!isCreating && (
          <button 
            onClick={() => setIsCreating(true)}
            className="px-4 py-2.5 bg-slate-900 hover:bg-blue-600 text-white rounded-xl text-xs font-bold shadow-xs transition-all flex items-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            New Specification
          </button>
        )}
      </div>

      {isCreating ? (
        <div className="space-y-6">
          <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-slate-200">
             <div className="flex items-center gap-2">
               <div className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
               <span className="text-xs font-black uppercase text-slate-800 tracking-widest">Guided Product & Enterprise Specification Compiler Mode</span>
             </div>
             <button 
              onClick={() => setIsCreating(false)}
              className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 transition-colors cursor-pointer"
             >
              <X className="w-5 h-5" />
             </button>
          </div>
          <DigitalEcosystemSpecificationForm onSubmit={handleSubmit} />
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Active Requests */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-5">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-black uppercase text-slate-800 tracking-wider">Active Specification Intake Queue</h3>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input 
                      type="text" 
                      placeholder="Search specifications..."
                      className="bg-slate-50 border border-slate-200 text-slate-800 rounded-lg pl-8 pr-3 py-1.5 text-[10px] font-bold focus:ring-1 focus:ring-blue-500 outline-hidden w-40"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                {(requests ?? []).map((req) => (
                  <div key={req.id} className="p-5 bg-slate-50 rounded-2xl border border-slate-200 hover:border-blue-300 transition-all group">
                    <div className="flex flex-col md:flex-row justify-between gap-4">
                      <div className="space-y-3 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-black text-blue-600 uppercase tracking-tighter bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">{req.id}</span>
                          <span className={`text-[9px] font-black px-2 py-0.5 rounded-full border uppercase ${
                            req.status === 'APPROVED' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                            req.status === 'REVIEW' ? 'bg-amber-50 text-amber-700 border-amber-100' :
                            'bg-slate-100 text-slate-500 border-slate-200'
                          }`}>
                            {req.status === 'REVIEW' ? 'SPECIFICATION RECEIVED' : req.status}
                          </span>
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-auto">{req.ecosystemType}</span>
                        </div>
                        <h4 className="text-sm font-black text-slate-900 group-hover:text-blue-700 transition-colors">{req.title}</h4>
                        <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">{req.problem}</p>
                        
                        <div className="flex flex-wrap gap-2 pt-2">
                          {(req.capabilities ?? []).map((cap, i) => (
                            <span key={i} className="text-[9px] font-bold bg-white border border-slate-200 text-slate-500 px-2 py-0.5 rounded-md">
                              {cap}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="md:w-48 flex flex-col justify-between border-t md:border-t-0 md:border-l border-slate-200 pt-4 md:pt-0 md:pl-6 gap-4">
                        <div className="space-y-2">
                          <div className="flex justify-between text-[9px] font-black text-slate-400 uppercase">
                            <span>Organization</span>
                            <span className="text-slate-700">{req.organization}</span>
                          </div>
                          <div className="flex justify-between text-[9px] font-black text-slate-400 uppercase">
                            <span>Sector</span>
                            <span className="text-slate-700">{req.sector}</span>
                          </div>
                          <div className="flex justify-between text-[9px] font-black text-slate-400 uppercase">
                            <span>Created</span>
                            <span className="text-slate-700">{new Date(req.createdAt).toLocaleDateString()}</span>
                          </div>
                        </div>
                        <button className="w-full py-2 bg-white hover:bg-slate-900 hover:text-white border border-slate-900 text-slate-900 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer">
                          View Specification Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                {(requests ?? []).length === 0 && (
                  <div className="py-20 text-center space-y-4 opacity-40">
                    <Target className="w-16 h-16 mx-auto text-slate-300" />
                    <div>
                      <p className="text-sm font-black text-slate-900 uppercase">No intake requests detected</p>
                      <p className="text-xs font-bold text-slate-500 mt-1 uppercase">Initialize a new sovereign digital ecosystem specification compiler.</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar: Diagnostics & Activity */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
              <div className="space-y-2 border-b border-slate-100 pb-4">
                <h3 className="text-xs font-black uppercase text-slate-800 tracking-wider">Handoff Lifecycle Gate</h3>
                <p className="text-[11px] text-slate-500">Form intake compiles WHAT is required, then routes automatically to Architecture Studio for HOW engineering.</p>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-lg font-bold">
                  <span>Guided Input</span>
                  <span className="text-emerald-600">✓ VERIFIED</span>
                </div>
                <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-lg font-bold">
                  <span>Product Classification</span>
                  <span className="text-emerald-600">✓ AUTOMATED</span>
                </div>
                <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-lg font-bold">
                  <span>Architecture Studio Handoff</span>
                  <span className="text-indigo-600">AUTOMATIC</span>
                </div>
                <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-lg font-bold">
                  <span>420+ Cognitive Agent Review</span>
                  <span className="text-amber-600">POST-HANDOFF</span>
                </div>
                <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-lg font-bold">
                  <span>Human Architect Lock</span>
                  <span className="text-slate-400">REQUIRED BEFORE MFG</span>
                </div>
              </div>

              <div className="border-t border-slate-100 pt-6">
                <h3 className="text-xs font-black uppercase text-slate-800 tracking-wider mb-4">Coordination Fabric</h3>
                <div className="space-y-2 max-h-64 overflow-y-auto pr-2">
                  {eventLog.map(evt => (
                    <div key={evt.id} className="text-[10px] text-slate-500 font-medium">
                      <span className="font-bold text-slate-800">{evt.action}</span>
                      <p className="line-clamp-1">Target: {evt.entityId}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
