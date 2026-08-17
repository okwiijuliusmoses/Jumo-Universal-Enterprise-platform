import React, { useState, useEffect } from 'react';
import { useJobNavigation } from '../../shell/JobNavigationContext';
import { ManufacturingStudio } from './ManufacturingStudio';
import { CertificationStudio } from './CertificationStudio';
import { SovereignGovernanceRegistry } from '../../../services/gov/SovereignGovernanceRegistry';
import { DigitalProductManufacturingOrchestrator } from '../../../services/factory/DigitalProductManufacturingOrchestrator';
import { Zap, Award, ShieldCheck, Box, Settings, Play, Sliders } from 'lucide-react';

export function ManufacturingVerificationCertificationStudio() {
  const { selectedJob, jobs } = useJobNavigation();
  const [activeTab, setActiveTab] = useState<'factory' | 'explorer' | 'certification'>('factory');
  const [certificationRecords, setCertificationRecords] = useState<any[]>([]);

  const govRegistry = SovereignGovernanceRegistry.getInstance();
  const orchestrator = DigitalProductManufacturingOrchestrator.getInstance();

  useEffect(() => {
    setCertificationRecords(govRegistry.getCertificationRecords());
    const interval = setInterval(() => {
      setCertificationRecords(govRegistry.getCertificationRecords());
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleCertify = async (jobId: string, authority: string) => {
    await orchestrator.certifyProduct(jobId, authority);
    setCertificationRecords(govRegistry.getCertificationRecords());
  };

  return (
    <div className="space-y-6">
      {/* Master Studio Header */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-black uppercase text-emerald-600 tracking-wider">Studio 2</span>
            <h2 className="text-xl font-black text-slate-950 tracking-tight mt-0.5">
              Manufacturing, Verification & Certification Studio
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Active operational control surface orchestrating component compilation, testing, multi-layer verification, and regulatory sign-offs.
            </p>
          </div>
          {selectedJob && (
            <div className="flex items-center gap-3 bg-slate-50 border border-slate-100 rounded-xl px-4 py-2">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <div>
                <span className="text-[9px] font-bold text-slate-400 uppercase block tracking-wider leading-none">Running Job</span>
                <span className="text-xs font-black text-slate-800">{selectedJob.productName || selectedJob.id}</span>
              </div>
            </div>
          )}
        </div>

        {/* Master Tab Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-6 pt-6 border-t border-slate-100">
          <button
            onClick={() => setActiveTab('factory')}
            className={`flex flex-col p-3 rounded-xl border text-left transition-all ${
              activeTab === 'factory' 
                ? 'bg-slate-950 border-slate-950 text-white shadow-xs' 
                : 'bg-slate-50 hover:bg-slate-100/70 border-slate-250/50 text-slate-700'
            }`}
          >
            <div className="flex items-center gap-2">
              <Zap className={`w-4 h-4 ${activeTab === 'factory' ? 'text-emerald-400' : 'text-slate-500'}`} />
              <span className="text-xs font-black">1. Factory Control & Pipelines</span>
            </div>
            <span className={`text-[9px] font-medium mt-1 ${activeTab === 'factory' ? 'text-slate-300' : 'text-slate-400'}`}>
              Monitor active state transitions and internal automated build packages
            </span>
          </button>

          <button
            onClick={() => setActiveTab('explorer')}
            className={`flex flex-col p-3 rounded-xl border text-left transition-all ${
              activeTab === 'explorer' 
                ? 'bg-slate-950 border-slate-950 text-white shadow-xs' 
                : 'bg-slate-50 hover:bg-slate-100/70 border-slate-250/50 text-slate-700'
            }`}
          >
            <div className="flex items-center gap-2">
              <Box className={`w-4 h-4 ${activeTab === 'explorer' ? 'text-indigo-400' : 'text-slate-500'}`} />
              <span className="text-xs font-black">2. Product Hierarchy Explorer</span>
            </div>
            <span className={`text-[9px] font-medium mt-1 ${activeTab === 'explorer' ? 'text-slate-300' : 'text-slate-400'}`}>
              Drill down into compiled modules, APIs, workflows, and verification evidence
            </span>
          </button>

          <button
            onClick={() => setActiveTab('certification')}
            className={`flex flex-col p-3 rounded-xl border text-left transition-all ${
              activeTab === 'certification' 
                ? 'bg-slate-950 border-slate-950 text-white shadow-xs' 
                : 'bg-slate-50 hover:bg-slate-100/70 border-slate-250/50 text-slate-700'
            }`}
          >
            <div className="flex items-center gap-2">
              <Award className={`w-4 h-4 ${activeTab === 'certification' ? 'text-amber-400' : 'text-slate-500'}`} />
              <span className="text-xs font-black">3. Certification & Release</span>
            </div>
            <span className={`text-[9px] font-medium mt-1 ${activeTab === 'certification' ? 'text-slate-300' : 'text-slate-400'}`}>
              Issue sovereign certificates and authorize release to national registries
            </span>
          </button>
        </div>
      </div>

      {/* Main Workspace Frame */}
      <div className="min-h-[50vh]">
        {activeTab === 'factory' && (
          <ManufacturingStudio initialTab="overview" />
        )}

        {activeTab === 'explorer' && (
          <ManufacturingStudio initialTab="evidence" />
        )}

        {activeTab === 'certification' && (
          <CertificationStudio 
            certifications={certificationRecords} 
            jobs={jobs} 
            onCertify={handleCertify} 
          />
        )}
      </div>
    </div>
  );
}
