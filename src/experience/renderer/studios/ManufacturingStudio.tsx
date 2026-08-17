import React, { useState, useEffect } from 'react';
import { 
  Activity, Layers, Database, ShieldCheck, CheckCircle2, 
  Terminal, Bot, FileText, Cpu, Compass
} from 'lucide-react';
import { ProductManufacturingJob } from '../../../core/factory/registry/HubRegistryTypes';
import { AutonomousManufacturingOrchestrator } from '../../../core/factory/execution/AutonomousManufacturingOrchestrator';
import { ManufacturingExecutionLedger } from '../../../core/factory/execution/ManufacturingExecutionLedger';
import { AIWorkforceRealityEngine } from '../../../core/ai/workforce/AIWorkforceRealityEngine';
import { useJobNavigation } from '../../shell/JobNavigationContext';

export interface ManufacturingStudioProps {
  initialTab?: 'overview' | 'execution' | 'structure' | 'evidence' | 'gates' | 'workforce' | 'lineage' | 'operations';
  jobs?: any[];
}

export const ManufacturingStudio: React.FC<ManufacturingStudioProps> = ({ 
  initialTab = 'overview',
}) => {
  const orchestrator = AutonomousManufacturingOrchestrator.getInstance();
  const ledger = ManufacturingExecutionLedger.getInstance();
  const workforce = AIWorkforceRealityEngine.getInstance();
  const { jobs, selectedJobId, setSelectedJobId } = useJobNavigation();

  const [activeTab, setActiveTab] = useState(initialTab);
  const [executions, setExecutions] = useState(ledger.getAllRecords());
  const [workers, setWorkers] = useState(workforce.getAllWorkers());

  const selectedJob = jobs.find(j => j.id === selectedJobId) as ProductManufacturingJob | undefined;

  useEffect(() => {
    const timer = setInterval(() => {
      setExecutions(ledger.getAllRecords());
      setWorkers(workforce.getAllWorkers());
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  const handleStartAutonomous = () => {
    if (selectedJob) {
      orchestrator.startAutonomousLoop(selectedJob.id);
    }
  };

  const handleApproveGate = () => {
    if (selectedJob) {
      orchestrator.approveHumanGate(selectedJob.id);
    }
  };

  if (!selectedJob) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-slate-500">
        <Database className="w-12 h-12 mb-4 opacity-20" />
        <p className="font-bold">No Manufacturing Job Selected.</p>
      </div>
    );
  }

  const jobExecutions = executions.filter(e => e.jobId === selectedJob.id);
  const activeExecutions = jobExecutions.filter(e => e.status === 'EXECUTING');

  return (
    <div className="space-y-6">
      <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 shadow-xl text-white flex flex-col md:flex-row justify-between items-center">
        <div>
          <h2 className="text-xl font-black tracking-tight">{selectedJob.productId} — Digital Factory</h2>
          <p className="text-xs text-slate-400 mt-1">Autonomous Execution & Evidence Registry</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-wider border border-blue-500/30">
            {selectedJob.status.replace(/_/g, ' ')}
          </span>
          <button 
            onClick={handleStartAutonomous}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-xs font-black uppercase transition-colors"
          >
            Start Autonomous Run
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 p-1 bg-slate-100 rounded-xl overflow-x-auto">
        {['overview', 'execution', 'structure', 'evidence', 'gates', 'workforce', 'lineage', 'operations'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${
              activeTab === tab ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm min-h-[400px]">
        
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <h3 className="text-sm font-black text-slate-800 uppercase border-b border-slate-100 pb-2">Factory Overview</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <p className="text-[10px] text-slate-500 font-bold uppercase">Total Executions</p>
                <p className="text-2xl font-black text-slate-900">{jobExecutions.length}</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <p className="text-[10px] text-slate-500 font-bold uppercase">Active Executions</p>
                <p className="text-2xl font-black text-blue-600">{activeExecutions.length}</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <p className="text-[10px] text-slate-500 font-bold uppercase">Produced Artifacts</p>
                <p className="text-2xl font-black text-emerald-600">{Object.keys(selectedJob.artifacts || {}).length}</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <p className="text-[10px] text-slate-500 font-bold uppercase">Governance Status</p>
                <p className="text-xs font-black text-amber-600 mt-2">
                  {selectedJob.status.includes('HUMAN') ? 'AWAITING APPROVAL' : 'AUTONOMOUS'}
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'execution' && (
          <div className="space-y-6">
            <h3 className="text-sm font-black text-slate-800 uppercase border-b border-slate-100 pb-2">Live & Historical Executions</h3>
            <div className="space-y-3">
              {jobExecutions.length === 0 ? (
                <p className="text-xs text-slate-500">No execution records found in ledger.</p>
              ) : (
                jobExecutions.slice().reverse().map(exec => (
                  <div key={exec.executionId} className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-black text-slate-900 uppercase">{exec.workPackage.replace(/_/g, ' ')}</h4>
                      <p className="text-[10px] text-slate-500 mt-1 font-mono">{exec.executionId} — Worker: {exec.workerId}</p>
                    </div>
                    <div className="text-right">
                      <span className={`text-[10px] font-black uppercase px-2 py-1 rounded border ${
                        exec.status === 'COMPLETED' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                        exec.status === 'EXECUTING' ? 'bg-blue-50 text-blue-700 border-blue-200 animate-pulse' :
                        'bg-slate-100 text-slate-600 border-slate-200'
                      }`}>
                        {exec.status}
                      </span>
                      {exec.durationMs && <p className="text-[10px] text-slate-400 mt-1">{exec.durationMs}ms</p>}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {activeTab === 'evidence' && (
          <div className="space-y-6">
            <h3 className="text-sm font-black text-slate-800 uppercase border-b border-slate-100 pb-2">Artifacts & Evidence</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {Object.values(selectedJob.artifacts || {}).map((art: any, i) => (
                <div key={i} className="p-4 border border-slate-200 rounded-xl bg-white shadow-sm flex items-start gap-3">
                  <FileText className="w-5 h-5 text-blue-500 shrink-0" />
                  <div>
                    <p className="text-xs font-black text-slate-900">{art.artifactId}</p>
                    <p className="text-[10px] text-slate-500 font-bold uppercase mt-1">{art.type}</p>
                    <p className="text-[10px] text-slate-400 mt-1 break-all">{art.url}</p>
                  </div>
                </div>
              ))}
              {Object.keys(selectedJob.artifacts || {}).length === 0 && (
                <p className="text-xs text-slate-500 col-span-2">No artifacts produced yet.</p>
              )}
            </div>
          </div>
        )}

        {activeTab === 'gates' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center border-b border-slate-100 pb-2">
              <h3 className="text-sm font-black text-slate-800 uppercase">Governance Gates</h3>
              {selectedJob.status.includes('HUMAN') && (
                <button onClick={handleApproveGate} className="px-4 py-1.5 bg-emerald-600 text-white rounded text-xs font-black uppercase hover:bg-emerald-500">
                  Approve Gate
                </button>
              )}
            </div>
            <div className="p-4 border border-amber-200 bg-amber-50 rounded-xl">
              <p className="text-xs font-bold text-amber-800 uppercase flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" />
                Current Status: {selectedJob.status.replace(/_/g, ' ')}
              </p>
              <p className="text-[10px] text-amber-700 mt-2">
                Human ratification must evaluate true evidence from the execution ledger before execution scope is released to downstream manufacturing stages.
              </p>
            </div>
          </div>
        )}

        {activeTab === 'workforce' && (
          <div className="space-y-6">
            <h3 className="text-sm font-black text-slate-800 uppercase border-b border-slate-100 pb-2">Workforce Fabric</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {workers.map(w => (
                <div key={w.id} className="p-4 rounded-xl border border-slate-200 bg-white">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-xs font-black text-slate-900">{w.name}</h4>
                    <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded border ${
                      w.status === 'REAL_EXECUTING_ENGINEER' ? 'bg-blue-50 text-blue-700 border-blue-200 animate-pulse' : 'bg-slate-50 text-slate-500 border-slate-200'
                    }`}>
                      {w.status.replace(/_/g, ' ')}
                    </span>
                  </div>
                  <p className="text-[10px] font-bold text-blue-600 uppercase">{w.discipline}</p>
                  <p className="text-[10px] text-slate-500 mt-2 font-mono bg-slate-50 p-1.5 rounded">{w.provider} - {w.model}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Placeholder for others */}
        {['structure', 'lineage', 'operations'].includes(activeTab) && (
          <div className="py-20 text-center">
            <Compass className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">{activeTab} Viewer</p>
            <p className="text-[10px] text-slate-400 mt-2">Authoritative runtime projection loading from Digital Thread ledger.</p>
          </div>
        )}
      </div>
    </div>
  );
};