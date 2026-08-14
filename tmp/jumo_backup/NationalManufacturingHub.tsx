import React, { useState, useEffect } from "react";
import { JUMO_STUDIO_REGISTRY } from '../../core/hub/studios/JumoStudioRegistry';
import { JUMO_HYBRID_ARCHITECTURE_REGISTRY } from '../../core/hub/architecture/JumoHybridArchitectureLayers';
import { motion, AnimatePresence } from "motion/react";
import { 
  Cpu, Shield, Database, Activity, Server, Settings, Layers, Terminal, Globe, Sparkles, MessageSquare, 
  Box, FileText, CheckCircle2, AlertCircle, Play, Pause, RefreshCw, Plus, Search, 
  ChevronRight, X, ArrowRight, Check, Sliders, AlertTriangle, FileCheck, Trash2, Send, 
  History, RefreshCcw, Command, Zap, ExternalLink, HardDrive, Key, Network, Users, Cloud,
  CheckSquare, HelpCircle, ActivitySquare, AlertOctagon, Compass, BookOpen, Binary,
  FileSignature, GitCommit, GitPullRequest, WifiOff, Award, ShieldCheck, Briefcase, FlaskConical,
  Home
} from "lucide-react";
import { UniversalHubRegistry } from "../../core/factory/registry/UniversalHubRegistry";
import { JumoAIAgentRegistry } from "../../core/ai/registry/JumoAIAgentRegistry";
import { EcosystemWorkspace } from "./ecosystem/EcosystemWorkspace";

import { ArchitectureStudio } from './studios/ArchitectureStudio';
import { ManufacturingStudio } from './studios/ManufacturingStudio';
import { ProductAssuranceStudio } from './studios/AssuranceStudio';
import { RuntimeOperationsStudio } from './studios/OperationsStudio';
import { GovernanceStudio } from './studios/GovernanceStudio';

import { 
  ArchitectureContract, 
  ManufacturingJob, 
  BuildArtifact,
  DeploymentRecord,
  VerificationFailureRecord,
  CertificationRecord,
  ManufacturingCategory
} from "../../core/factory/registry/HubRegistryTypes";

import { SovereignGovernanceRegistry } from "../../services/gov/SovereignGovernanceRegistry";
import { JumoEventBus } from "../../core/common/events/JumoEventBus";
import { SpecificationStudio } from "./studios/SpecificationStudio";
import { UEOSErrorBoundary } from "../components/UEOSErrorBoundary";

export type HubWorkspace = 
  | 'specification'
  | 'architecture'
  | 'factory'
  | 'manufacturing'
  | 'config'
  | 'assurance'
  | 'verification'
  | 'certification'
  | 'deployment'
  | 'operations'
  | 'overview'
  | 'governance'
  | 'control'
  | 'templates'
  | 'faap'
  | 'settings';

import { DigitalProductManufacturingOrchestrator } from "../../services/factory/DigitalProductManufacturingOrchestrator";
import { architectureEngine } from "../../services/architecture/ArchitectureEngine";
import { ManufacturingJobEngine } from "../../services/factory/ManufacturingJobEngine";

export function NationalManufacturingHub({ activeWorkspace, onNavigate }: { activeWorkspace: HubWorkspace; onNavigate?: (ws: HubWorkspace) => void }) {
  const [activeWorkspaceState, setActiveWorkspaceState] = useState<HubWorkspace>(activeWorkspace || 'specification');
  const [archContracts, setArchContracts] = useState<ArchitectureContract[]>([]);
  const [jobs, setJobs] = useState<ManufacturingJob[]>([]);
  const [deploymentRecords, setDeploymentRecords] = useState<DeploymentRecord[]>([]);
  const [certificationRecords, setCertificationRecords] = useState<CertificationRecord[]>([]);
  const [auditEvents, setAuditEvents] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const registry = SovereignGovernanceRegistry.getInstance();
  const orchestrator = DigitalProductManufacturingOrchestrator.getInstance();
  const jobEngine = new ManufacturingJobEngine();

  useEffect(() => {
    const fetchData = () => {
      setArchContracts(registry.getAllBlueprints());
      setJobs(registry.getAllJobs());
      setDeploymentRecords(registry.getDeploymentRecords());
      setCertificationRecords(registry.getCertificationRecords());
      setAuditEvents(registry.getLedger());
      setIsLoading(false);
    };

    fetchData();
    const interval = setInterval(fetchData, 2000);
    return () => clearInterval(interval);
  }, []);

  const onNavigateInternal = (ws: HubWorkspace) => {
    setActiveWorkspaceState(ws);
    onNavigate?.(ws);
  };

  const renderStudio = () => {
    const ws = activeWorkspaceState;
    switch (ws) {
      case 'specification':
        return (
          <UEOSErrorBoundary componentName="Specification Studio">
            <SpecificationStudio />
          </UEOSErrorBoundary>
        );
      case 'architecture':
        return (
          <UEOSErrorBoundary componentName="Architecture Studio">
            <ArchitectureStudio 
              requests={[]} 
              contracts={archContracts}
              expansionTraces={[]}
              onCreateContract={async (requestId: string) => {
                await orchestrator.initiateManufacturingLifecycle(requestId, {
                  title: "Injected Project",
                  problem: "Self-healing architecture recovery",
                  ecosystem: "ERP_ECOSYSTEM"
                });
              }}
              onApproveContract={async (contractId: string) => {
                await architectureEngine.approveArchitecture(contractId);
                const job = jobs.find(j => j.architectureId === contractId);
                if (job) {
                  JumoEventBus.publish("HUMAN_APPROVAL_GRANTED", { jobId: job.id });
                }
              }}
              onLaunchManufacturing={async (contractId: string) => {
                const job = jobs.find(j => j.architectureId === contractId);
                if (job) {
                  JumoEventBus.publish("HUMAN_APPROVAL_GRANTED", { jobId: job.id });
                }
              }}
              onCreateRequest={async () => {}}
            />
          </UEOSErrorBoundary>
        );
      case 'factory':
      case 'manufacturing':
        return (
          <UEOSErrorBoundary componentName="Manufacturing Factory Studio">
            <ManufacturingStudio 
              jobs={jobs}
              contracts={archContracts}
              onPromoteJob={async (jobId: string) => {
                JumoEventBus.publish("HUMAN_APPROVAL_GRANTED", { jobId });
              }}
              onPauseJob={async (jobId: string) => {
                await jobEngine.pauseJob(jobId);
              }}
              eventLog={[]}
            />
          </UEOSErrorBoundary>
        );
      case 'assurance':
      case 'verification':
      case 'certification':
        return (
          <UEOSErrorBoundary componentName="Product Assurance Studio">
            <ProductAssuranceStudio 
              verifications={[]}
              certifications={certificationRecords}
              onCertify={async () => {}}
            />
          </UEOSErrorBoundary>
        );
      case 'operations':
      case 'deployment':
      case 'overview':
        return (
          <UEOSErrorBoundary componentName="Runtime Operations Studio">
            <RuntimeOperationsStudio 
              deploymentRecords={deploymentRecords}
              cloudSlots={[]}
            />
          </UEOSErrorBoundary>
        );
      case 'governance':
      case 'control':
      case 'templates':
      case 'faap':
        return (
          <UEOSErrorBoundary componentName="Governance & Trust Studio">
            <GovernanceStudio 
              stats={{
                activeBlueprints: archContracts.length,
                certifiedProducts: certificationRecords.length,
                nationalStandardCompliance: 100
              }}
              ledger={auditEvents}
              workforceStats={{
                totalAgents: JumoAIAgentRegistry.getAllAgents().length,
                divisions: JumoAIAgentRegistry.getDivisions()
              }}
            />
          </UEOSErrorBoundary>
        );
      default:
        return (
          <div className="flex items-center justify-center h-64 bg-slate-100 rounded-2xl border-2 border-dashed border-slate-300">
            <div className="text-center">
              <AlertTriangle className="w-12 h-12 text-amber-500 mx-auto mb-4" />
              <h3 className="text-lg font-black text-slate-800 uppercase tracking-tight">Studio Unavailable</h3>
              <p className="text-sm text-slate-500 mt-2">Requested Workspace: <span className="text-blue-600 font-bold uppercase">{ws}</span></p>
              <button 
                onClick={() => onNavigateInternal('specification')}
                className="mt-6 px-6 py-2 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-xl shadow-lg hover:bg-blue-600 transition-all"
              >
                Return to Command Center
              </button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="space-y-8 bg-slate-50 min-h-screen p-8 font-sans">
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-slate-200">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center text-white shadow-xl rotate-3">
             <Cpu size={24} />
          </div>
          <div>
            <h1 className="text-xl font-black text-slate-900 tracking-tight">
              National Enterprise Factory
            </h1>
            <p className="text-xs text-slate-500 mt-1 font-medium">
              Sovereign Digital Operating Platform
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl border border-slate-200 mt-4 md:mt-0 overflow-x-auto max-w-full">
          {(['specification', 'architecture', 'manufacturing', 'verification', 'deployment', 'governance'] as HubWorkspace[]).map(ws => (
            <button
              key={ws}
              onClick={() => onNavigateInternal(ws)}
              className={`px-4 py-2 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all whitespace-nowrap ${
                activeWorkspaceState === ws || 
                (ws === 'manufacturing' && activeWorkspaceState === 'factory') ||
                (ws === 'verification' && (activeWorkspaceState === 'assurance' || activeWorkspaceState === 'certification')) ||
                (ws === 'deployment' && (activeWorkspaceState === 'operations' || activeWorkspaceState === 'overview')) ||
                (ws === 'governance' && (activeWorkspaceState === 'control' || activeWorkspaceState === 'templates' || activeWorkspaceState === 'faap'))
                ? 'bg-white text-slate-900 shadow-sm' 
                : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              {ws}
            </button>
          ))}
        </div>
      </div>

      <div className="min-h-[70vh]">
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <RefreshCw className="w-8 h-8 animate-spin text-slate-400" />
          </div>
        ) : (
          renderStudio()
        )}
      </div>
    </div>
  );
}
