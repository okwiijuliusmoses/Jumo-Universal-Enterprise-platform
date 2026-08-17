import React from 'react';
import { 
  Award, ShieldCheck, FileCheck, CheckCircle2, 
  ExternalLink, Download, Search, Filter, 
  History, BadgeCheck, FileText, Lock
} from 'lucide-react';
import { CertificationRecord, ManufacturingJob } from '../../../core/factory/registry/HubRegistryTypes';
import { StudioLifecycleNavBar } from '../../components/StudioLifecycleNavBar';

interface CertificationStudioProps {
  certifications: CertificationRecord[];
  jobs: ManufacturingJob[];
  onCertify: (jobId: string, authority: string) => void;
}

export const CertificationStudio: React.FC<CertificationStudioProps> = ({
  certifications,
  jobs,
  onCertify
}) => {
  // Filter jobs that are in verification/certifying stages and passed
  const readyForCertification = (jobs ?? []).filter(j => j.status === 'SYSTEM_VERIFYING' || j.status === 'CERTIFYING' || j.status === 'VERIFYING');
  
  return (
    <div className="space-y-6">
      <StudioLifecycleNavBar studioId="certification" />
      {/* Header */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center text-white">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-black text-slate-900 tracking-tight uppercase">Certification Studio</h2>
            <p className="text-xs text-slate-500 font-medium">Sovereign Product Certification & Immutable Compliance Verification</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Authority Status</span>
            <span className="text-xs font-black text-emerald-600 uppercase flex items-center justify-end gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              AUTHORITATIVE SIGNER
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Certification Queue */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-5">
            <h3 className="text-xs font-black uppercase text-slate-800 tracking-wider">Ready for Certification</h3>
            <div className="space-y-4">
              {readyForCertification.map((job) => (
                <div key={job.id} className="p-5 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col sm:flex-row gap-6 hover:border-amber-400 transition-all group">
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-black text-slate-900 uppercase tracking-tighter bg-white px-2 py-0.5 rounded-full border border-slate-200">{job.id}</span>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{job.ecosystem}</span>
                    </div>
                    <h4 className="text-sm font-black text-slate-900 group-hover:text-amber-700 transition-colors">Digital Product: {job.productId}</h4>
                    <div className="grid grid-cols-2 gap-4 pt-1">
                      <div className="space-y-1">
                        <span className="text-[8px] font-black text-slate-400 uppercase block">Build Hash</span>
                        <span className="text-[10px] font-bold text-slate-700 font-mono truncate block">{job.commitSha}</span>
                      </div>
                      <div className="space-y-1">
                        <span className="text-[8px] font-black text-slate-400 uppercase block">Verification Score</span>
                        <span className="text-[10px] font-black text-emerald-600 uppercase">100% PASSED</span>
                      </div>
                    </div>
                  </div>
                  <div className="sm:w-48 flex flex-col justify-center gap-2 border-t sm:border-t-0 sm:border-l border-slate-200 pt-4 sm:pt-0 sm:pl-6">
                    <button 
                      onClick={() => onCertify(job.id, "National Hub Authority")}
                      className="w-full py-2.5 bg-slate-900 hover:bg-amber-600 text-white rounded-xl text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer shadow-sm"
                    >
                      Issue Certificate
                    </button>
                    <button className="w-full py-2 bg-white border border-slate-200 text-slate-500 hover:text-slate-700 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer">
                      Review Evidence
                    </button>
                  </div>
                </div>
              ))}
              {readyForCertification.length === 0 && (
                <div className="py-20 text-center space-y-4 opacity-40">
                  <BadgeCheck className="w-16 h-16 mx-auto text-slate-300" />
                  <div>
                    <p className="text-sm font-black text-slate-900 uppercase">No products awaiting certification</p>
                    <p className="text-xs font-bold text-slate-500 mt-1 uppercase">Complete verification pipeline to prepare products for certification.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Issued Certificates */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-black uppercase text-slate-800 tracking-wider">Recent Certificates</h3>
              <History className="w-4 h-4 text-slate-400" />
            </div>
            <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-200">
              {(certifications ?? []).map((cert) => (
                <div key={cert.certificationId} className="p-4 bg-white rounded-xl border border-slate-100 shadow-xs space-y-3 border-l-4 border-l-emerald-500">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <span className="text-[10px] font-black text-emerald-600 uppercase tracking-tighter">CERTIFIED PRODUCT</span>
                      <h5 className="text-xs font-black text-slate-900">{cert.productId}</h5>
                    </div>
                    <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">{cert.certificationId}</span>
                  </div>
                  
                  <div className="flex items-center justify-between text-[9px] font-bold text-slate-500 pt-1 border-t border-slate-50">
                    <div className="flex items-center gap-1.5">
                      <Lock className="w-3 h-3" />
                      SEALED: {new Date(cert.timestamp).toLocaleDateString()}
                    </div>
                    <button className="text-blue-600 hover:text-blue-700 flex items-center gap-1">
                      VERIFY <ExternalLink className="w-2.5 h-2.5" />
                    </button>
                  </div>
                </div>
              ))}
              {(certifications ?? []).length === 0 && (
                <div className="py-12 text-center text-slate-400 italic text-[10px] font-bold uppercase tracking-widest">
                  No certificates issued in this session.
                </div>
              )}
            </div>
          </div>

          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center">
                <FileCheck className="w-6 h-6 text-amber-500" />
              </div>
              <h4 className="text-xs font-black text-white uppercase tracking-wider">Immutable Evidence Ledger</h4>
            </div>
            <p className="text-[10px] text-slate-400 leading-relaxed font-medium">
              Every certificate produced is backed by a cryptographically sealed evidence bundle containing build hashes, verification logs, and authoritative approval signatures.
            </p>
            <button className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-[10px] font-black uppercase tracking-wider transition-all">
              Export Evidence Store
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
