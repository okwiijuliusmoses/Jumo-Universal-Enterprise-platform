import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldCheck, FileCheck, AlertTriangle, CheckCircle2, 
  Search, Sliders, Activity, Terminal, Eye, History,
  Award, ShieldAlert, Fingerprint, Zap, Lock, Info
} from 'lucide-react';

interface AssuranceStudioProps {
  verifications: any[];
  certifications: any[];
  onCertify: (jobId: string) => void;
}

export const ProductAssuranceStudio: React.FC<AssuranceStudioProps> = ({
  verifications = [],
  certifications = [],
  onCertify
}) => {
  const [activeTab, setActiveTab] = useState<'gates' | 'certification' | 'audit'>('gates');

  return (
    <div className="flex flex-col h-full space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-emerald-600 rounded-xl flex items-center justify-center text-white shadow-lg">
            <ShieldCheck size={24} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">Product Assurance Studio</h2>
            <p className="text-sm text-slate-500 font-medium">Authoritative Verification, Certification & Release Seal</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2 p-1 bg-slate-100 rounded-lg">
          {(['gates', 'certification', 'audit'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-md transition-all ${
                activeTab === tab 
                ? 'bg-white text-slate-900 shadow-sm' 
                : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        <AnimatePresence mode="wait">
          {activeTab === 'gates' && (
            <motion.div
              key="gates"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-6"
            >
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
                   <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
                     <Activity size={18} className="text-emerald-600" />
                     Authoritative Verification Gates
                   </h3>
                   <div className="space-y-4">
                     {[1,2,3,4,5,6,7,8].map(gate => (
                       <div key={gate} className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between hover:border-slate-200 transition-colors">
                         <div className="flex items-center gap-4">
                           <div className="w-8 h-8 bg-white border border-slate-200 rounded-lg flex items-center justify-center text-xs font-black text-slate-400">
                             0{gate}
                           </div>
                           <div>
                             <div className="text-sm font-bold text-slate-900">
                               {gate === 1 && "Architecture Compliance Gate"}
                               {gate === 2 && "Zero-Trust Perimeter Scan"}
                               {gate === 3 && "PII/PHI Data Leak Verification"}
                               {gate === 4 && "National Standard Compliance Audit"}
                               {gate === 5 && "FAAP Ledger Integrity Check"}
                               {gate === 6 && "Cross-Platform Interop Stress Test"}
                               {gate === 7 && "Supply Chain Air-Gap Verification"}
                               {gate === 8 && "Final Factory Acceptance Gate"}
                             </div>
                             <div className="text-[10px] text-slate-500 font-medium">Verification standard: JUMO-GOV-STD-2026-B</div>
                           </div>
                         </div>
                         <div className="flex items-center gap-2">
                           <div className="px-2 py-1 bg-emerald-50 text-emerald-700 text-[10px] font-black uppercase rounded border border-emerald-100 flex items-center gap-1">
                             <CheckCircle2 size={10} /> PASSED
                           </div>
                           <button className="p-2 hover:bg-white rounded-lg text-slate-400 hover:text-slate-600 transition-colors">
                             <Eye size={16} />
                           </button>
                         </div>
                       </div>
                     ))}
                   </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl text-white">
                  <h3 className="font-bold mb-6 flex items-center gap-2">
                    <Terminal size={18} className="text-blue-400" />
                    Verification Log Ingress
                  </h3>
                  <div className="space-y-3 font-mono text-[10px] text-slate-400">
                    <div className="border-l-2 border-emerald-500 pl-3 py-1">
                      <div className="text-emerald-400 font-bold">[SUCCESS] Gate 01: Compliance Verified</div>
                      <div>Hash: SHA256_F44E_92...</div>
                    </div>
                    <div className="border-l-2 border-emerald-500 pl-3 py-1">
                      <div className="text-emerald-400 font-bold">[SUCCESS] Gate 02: Zero-Trust Validated</div>
                      <div>No unauthorized ingress detected.</div>
                    </div>
                    <div className="border-l-2 border-blue-500 pl-3 py-1">
                      <div className="text-blue-400 font-bold">[INFO] Gate 03: Scanning PII domains...</div>
                      <div>Active Agents: SECURITY-01, AUDITOR-04</div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
                   <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                     <Award size={18} className="text-amber-500" />
                     Certification Eligibility
                   </h3>
                   <div className="space-y-4">
                     <div className="flex justify-between items-end">
                        <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">Readiness Score</div>
                        <div className="text-2xl font-black text-slate-900">92%</div>
                     </div>
                     <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500" style={{ width: '92%' }}></div>
                     </div>
                     <p className="text-[10px] text-slate-500 leading-relaxed">
                       Awaiting final human signature for Release Candidate 2026.04.B. All technical gates are green.
                     </p>
                     <button 
                       onClick={() => setActiveTab('certification')}
                       className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-emerald-200"
                     >
                       Proceed to Certification
                     </button>
                   </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'certification' && (
             <motion.div
              key="certification"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="max-w-3xl mx-auto space-y-8 py-8"
             >
               <div className="text-center space-y-2">
                 <div className="inline-flex p-3 bg-emerald-100 text-emerald-600 rounded-full mb-4">
                   <Fingerprint size={48} />
                 </div>
                 <h3 className="text-2xl font-black text-slate-900">National Product Certification</h3>
                 <p className="text-slate-500">Official Release Authorization & Cryptographic Signing</p>
               </div>

               <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl space-y-6">
                 <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 space-y-4">
                    <div className="flex justify-between items-center pb-4 border-b border-slate-200">
                      <span className="text-sm font-bold text-slate-500">Product Name</span>
                      <span className="text-sm font-black text-slate-900">Sovereign ERP National Instance</span>
                    </div>
                    <div className="flex justify-between items-center pb-4 border-b border-slate-200">
                      <span className="text-sm font-bold text-slate-500">Release Version</span>
                      <span className="text-sm font-black text-slate-900">2026.04.B-STABLE</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-bold text-slate-500">Integrity Hash</span>
                      <span className="text-xs font-mono text-slate-600 bg-white px-2 py-1 rounded border border-slate-200">SHA256:88ae...93ae</span>
                    </div>
                 </div>

                 <div className="p-6 bg-amber-50 rounded-2xl border border-amber-100 text-amber-900 text-sm flex gap-4">
                   <AlertTriangle className="shrink-0" />
                   <div>
                     <span className="font-bold block mb-1">Certification Clause</span>
                     By signing this release, you certify that the product has passed all 20 sovereign verification gates and adheres to the National Enterprise Factory standards.
                   </div>
                 </div>

                 <div className="pt-6">
                   <button 
                     onClick={() => onCertify('current-job')}
                     className="w-full py-4 bg-slate-900 hover:bg-black text-white text-sm font-black uppercase tracking-widest rounded-2xl transition-all shadow-xl shadow-slate-200 flex items-center justify-center gap-3"
                   >
                     <FileCheck size={20} />
                     Sign & Certify Release
                   </button>
                 </div>
               </div>
             </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
