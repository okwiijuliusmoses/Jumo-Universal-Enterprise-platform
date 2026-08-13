import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldCheck, CheckCircle2, AlertCircle, AlertTriangle, 
  Activity, Layers, Search, Terminal, Sliders, Settings,
  ArrowRight, Shield, Zap, FileCheck, HelpCircle, RefreshCw
} from 'lucide-react';
import { VerificationFailureRecord } from '../../../core/factory/registry/HubRegistryTypes';

interface VerificationGateResult {
  id: string;
  name: string;
  status: 'PASS' | 'FAIL' | 'WARNING' | 'BLOCKED' | 'NOT_RUN';
  evidence: string;
  timestamp: string;
  logs: string[];
}

interface VerificationStudioProps {
  gates: VerificationGateResult[];
  failures: VerificationFailureRecord[];
  isVerifying: boolean;
  verifyingIndex: number;
  onRunSuite: () => void;
}

export const VerificationStudio: React.FC<VerificationStudioProps> = ({
  gates,
  failures,
  isVerifying,
  verifyingIndex,
  onRunSuite
}) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-black text-slate-900 tracking-tight uppercase">Verification Center</h2>
            <p className="text-xs text-slate-500 font-medium">Authoritative Dynamic Verification & Validation Engine</p>
          </div>
        </div>
        <button 
          onClick={onRunSuite}
          disabled={isVerifying}
          className="px-6 py-2 bg-slate-900 hover:bg-emerald-600 text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all disabled:opacity-50 shadow-sm flex items-center gap-2 cursor-pointer"
        >
          {isVerifying ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Shield className="w-4 h-4" />}
          {isVerifying ? "Executing Suite..." : "Execute Verification Suite"}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Gate Matrix */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="text-xs font-black uppercase text-slate-800 tracking-wider">Universal Verification Matrix</h3>
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-bold text-emerald-600">{(gates ?? []).filter(g => g.status === 'PASS').length} Passed</span>
                <span className="text-[10px] font-bold text-rose-600">{(gates ?? []).filter(g => g.status === 'FAIL').length} Failed</span>
                <span className="text-[10px] font-bold text-slate-400">{(gates ?? []).filter(g => g.status === 'NOT_RUN').length} Pending</span>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 max-h-[600px] overflow-y-auto pr-2 scrollbar-thin">
              {(gates ?? []).map((gate, i) => (
                <motion.div 
                  key={gate.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={`p-3 rounded-xl border transition-all relative group ${
                    gate.status === 'PASS' ? 'bg-emerald-50/50 border-emerald-100 hover:border-emerald-300' :
                    gate.status === 'FAIL' ? 'bg-rose-50/50 border-rose-100 hover:border-rose-300' :
                    gate.status === 'WARNING' ? 'bg-amber-50/50 border-amber-100 hover:border-amber-300' :
                    i === verifyingIndex ? 'bg-blue-50 border-blue-300 shadow-sm animate-pulse' :
                    'bg-slate-50/50 border-slate-100'
                  }`}
                >
                  <div className="flex flex-col gap-1.5 h-full">
                    <div className="flex items-center justify-between">
                      <span className="text-[8px] font-black text-slate-400 uppercase tracking-tighter">LAYER {i + 1}</span>
                      {gate.status === 'PASS' && <CheckCircle2 className="w-3 h-3 text-emerald-500" />}
                      {gate.status === 'FAIL' && <AlertCircle className="w-3 h-3 text-rose-500" />}
                      {gate.status === 'WARNING' && <AlertTriangle className="w-3 h-3 text-amber-500" />}
                    </div>
                    <span className="text-[10px] font-black text-slate-800 line-clamp-1 group-hover:line-clamp-none transition-all">{gate.name}</span>
                    <div className="mt-auto pt-1 flex items-center justify-between">
                      <span className={`text-[8px] font-black uppercase ${
                        gate.status === 'PASS' ? 'text-emerald-600' :
                        gate.status === 'FAIL' ? 'text-rose-600' :
                        gate.status === 'WARNING' ? 'text-amber-600' :
                        'text-slate-400'
                      }`}>
                        {(gate.status || 'UNKNOWN').replace('_', ' ')}
                      </span>
                    </div>
                  </div>
                  
                  {/* Tooltip on hover */}
                  <div className="absolute inset-x-0 bottom-full mb-2 p-2 bg-slate-900 text-white text-[9px] rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-10 shadow-xl border border-slate-700">
                    <p className="font-bold">{gate.name}</p>
                    <p className="text-slate-400 mt-1">{gate.evidence}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Failures & Policy */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-xs font-black uppercase text-slate-800 tracking-wider">Active Failure Log</h3>
            <div className="space-y-3">
              {(failures ?? []).map((fail) => (
                <div key={fail.failureId} className="p-4 bg-rose-50 rounded-xl border border-rose-100 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-black text-rose-700 uppercase tracking-widest">{fail.failureId}</span>
                    <span className="px-1.5 py-0.5 bg-rose-200 text-rose-800 text-[8px] font-black rounded uppercase">{fail.severity}</span>
                  </div>
                  <h4 className="text-[11px] font-black text-rose-900">{fail.diagnostic}</h4>
                  <p className="text-[9px] text-rose-700/80 leading-relaxed font-medium">Target: {fail.affectedComponent}</p>
                  <div className="pt-2 flex items-center justify-between border-t border-rose-200/60">
                    <span className="text-[9px] font-bold text-rose-600">Assigned: {fail.assignedEngineerId}</span>
                    <button className="text-[9px] font-black text-rose-900 uppercase hover:underline cursor-pointer">Resolution Path</button>
                  </div>
                </div>
              ))}
              {(failures ?? []).length === 0 && (
                <div className="py-10 text-center space-y-2 opacity-40">
                  <CheckCircle2 className="w-10 h-10 mx-auto text-emerald-300" />
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Zero Critical Failures</p>
                </div>
              )}
            </div>
          </div>

          <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 shadow-xl space-y-4 text-white">
            <h3 className="text-xs font-black uppercase text-slate-400 tracking-wider flex items-center gap-2">
              <Terminal className="w-4 h-4 text-emerald-500" />
              Verification Policy v4.2
            </h3>
            <div className="space-y-4 text-[10px] text-slate-400 leading-relaxed font-medium">
              <p>The JUMO-UEOS verification policy enforces absolute congruence between the locked architecture contract and the generated source artifacts.</p>
              <ul className="space-y-2 list-disc pl-4 marker:text-emerald-500">
                <li>Mandatory FAAP ledger consistency checks.</li>
                <li>Zero-Trust network route assertion.</li>
                <li>Cryptographic signature provenance matching.</li>
                <li>Sovereign data boundary validation.</li>
              </ul>
              <div className="p-3 bg-slate-800/50 rounded-lg border border-slate-700/50 flex items-center justify-between">
                <span className="text-emerald-500 font-black">REGULATORY COMPLIANT</span>
                <HelpCircle className="w-3.5 h-3.5 text-slate-500 cursor-help" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
