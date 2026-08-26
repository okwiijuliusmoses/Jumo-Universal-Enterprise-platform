
import React from 'react';
import { TraceabilityMatrixRegistry } from './TraceabilityMatrixRegistry';
import { CheckCircle2, Search, ArrowRight, BookOpen, Layers } from 'lucide-react';

export const TraceabilityMatrix: React.FC = () => {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="border-b border-slate-200 pb-6">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">UEOS Traceability Matrix</h1>
        <p className="text-slate-500 text-sm mt-2 max-w-3xl">
          Mapping JUMO Universal Enterprise Operating System modules to industry-standard benchmarks. 
          Each component is verified against global best practices in enterprise resource planning and financial technology.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {TraceabilityMatrixRegistry.map((entry, idx) => (
          <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-4 flex-1">
                <div className="flex items-center gap-3">
                  <div className="px-2.5 py-1 bg-slate-900 text-white text-[10px] font-black rounded uppercase tracking-widest">
                    {entry.jumoModule}
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-300" />
                  <h3 className="text-lg font-black text-slate-900">{entry.jumoComponent}</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                      <BookOpen className="w-3 h-3" />
                      Benchmark Source
                    </div>
                    <div className="text-sm font-bold text-slate-800 bg-slate-50 px-3 py-2 rounded-xl border border-slate-100">
                      {entry.benchmarkSource}
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                      <Layers className="w-3 h-3" />
                      Mapped Capabilities
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {entry.sourceCapabilities.map((cap, cidx) => (
                        <span key={cidx} className="text-[10px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                          {cap}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center justify-center p-6 bg-slate-50 rounded-2xl border border-slate-100 min-w-[140px]">
                <CheckCircle2 className="w-8 h-8 text-emerald-500 mb-2" />
                <span className="text-[10px] font-black text-emerald-700 uppercase tracking-widest">{entry.jumoStatus}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
