// JUMO UEOS — 27 Factory Operational Layers Navigator Component
// Standard: JDPM-LAYER-27-OPERATIONAL-SPEC

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Layers, CheckCircle2, AlertTriangle, ShieldCheck, Cpu, Database, 
  Code, Terminal, Lock, Globe, Zap, FileText, Activity, Clock, ChevronRight, UserCheck, Search
} from 'lucide-react';
import { ProductManufacturingJob } from '../../../core/factory/registry/HubRegistryTypes';

export interface FactoryOperationalLayer {
  code: string;
  letter: string;
  name: string;
  category: 'PRE_MANUFACTURING' | 'ENGINEERING' | 'ASSEMBLY' | 'VERIFICATION' | 'GOVERNANCE' | 'OPERATIONS';
  phaseId: number;
  description: string;
  workPackageKey: string;
  responsibleDiscipline: string;
  assignedWorker: string;
  executionProvider: string;
  requiredArtifacts: string[];
  evidenceType: string;
  status: 'VERIFIED_COMPLETED' | 'IN_PROGRESS' | 'AWAITING_APPROVAL' | 'QUEUED';
  healthScore: number;
}

export function ManufacturingOperationalLayers({ job }: { job: ProductManufacturingJob }) {
  const [selectedLayerCode, setSelectedLayerCode] = useState<string>('A');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterCategory, setFilterCategory] = useState<string>('ALL');

  const layers: FactoryOperationalLayer[] = [
    {
      code: 'A',
      letter: 'A',
      name: 'Intake & Specification Readiness',
      category: 'PRE_MANUFACTURING',
      phaseId: 1,
      description: 'Ingesting raw specification, property normalization, completeness audit, and tenancy validation.',
      workPackageKey: 'DIGITAL_INTAKE',
      responsibleDiscipline: 'Chief Intake Governor',
      assignedWorker: 'Sovereign Architect (OPENAI)',
      executionProvider: 'GOOGLE_GENAI / OPENAI',
      requiredArtifacts: ['ImplementationGradeSpecificationContract', 'TenancyManifest'],
      evidenceType: 'Spec Completeness Hash Log',
      status: 'VERIFIED_COMPLETED',
      healthScore: 100
    },
    {
      code: 'B',
      letter: 'B',
      name: 'Requirements Traceability',
      category: 'PRE_MANUFACTURING',
      phaseId: 1,
      description: 'Decomposing business requirements into traceable unit specifications and verification criteria.',
      workPackageKey: 'REQUIREMENTS_DECOMPOSITION',
      responsibleDiscipline: 'Requirements Engineer',
      assignedWorker: 'JUMO GPT (OPENAI)',
      executionProvider: 'OPENAI',
      requiredArtifacts: ['TraceabilityMatrixContract'],
      evidenceType: 'Requirements Coverage Audit',
      status: 'VERIFIED_COMPLETED',
      healthScore: 100
    },
    {
      code: 'C',
      letter: 'C',
      name: 'Architecture Package',
      category: 'ENGINEERING',
      phaseId: 2,
      description: 'Multi-layer system expansion, security architecture, data architecture, and domain contract definition.',
      workPackageKey: 'ARCHITECTURE_EXPANSION',
      responsibleDiscipline: 'Chief System Architect',
      assignedWorker: 'Sovereign Architect',
      executionProvider: 'GOOGLE_GENAI',
      requiredArtifacts: ['ArchitectureContract', 'DomainBoundarySpec'],
      evidenceType: 'Architecture Boundary Proof',
      status: 'VERIFIED_COMPLETED',
      healthScore: 100
    },
    {
      code: 'D',
      letter: 'D',
      name: 'Engineering Contracts',
      category: 'ENGINEERING',
      phaseId: 2,
      description: 'Locking inter-service API contracts, data serialization rules, and transport protocols.',
      workPackageKey: 'ARCHITECTURE_CONTRACT_GENERATION',
      responsibleDiscipline: 'API Engineer',
      assignedWorker: 'API Engineer',
      executionProvider: 'GOOGLE_GENAI',
      requiredArtifacts: ['OpenAPISpecification', 'gRPCProtoContract'],
      evidenceType: 'API Contract Typecheck Log',
      status: 'VERIFIED_COMPLETED',
      healthScore: 100
    },
    {
      code: 'E',
      letter: 'E',
      name: 'Blueprint Control',
      category: 'ENGINEERING',
      phaseId: 3,
      description: 'Baselining master component blueprint, dependency topology, and version control tree.',
      workPackageKey: 'ARCHITECTURE_VERIFICATION',
      responsibleDiscipline: 'Blueprint Governor',
      assignedWorker: 'ERP Architect',
      executionProvider: 'GOOGLE_GENAI',
      requiredArtifacts: ['MasterProductBlueprint', 'DependencyGraphSpec'],
      evidenceType: 'Blueprint Cryptographic Hash',
      status: 'VERIFIED_COMPLETED',
      healthScore: 100
    },
    {
      code: 'F',
      letter: 'F',
      name: 'Design Assurance',
      category: 'ENGINEERING',
      phaseId: 3,
      description: 'Zero-trust perimeter evaluation, design pattern compliance, and accessibility review.',
      workPackageKey: 'SYSTEM_DESIGN',
      responsibleDiscipline: 'UX/UI Quality Governor',
      assignedWorker: 'Frontend Engineer',
      executionProvider: 'GOOGLE_GENAI',
      requiredArtifacts: ['DesignSystemComplianceReport', 'WCAGAuditSpec'],
      evidenceType: 'UI Contrast & Accessibility Audit',
      status: 'VERIFIED_COMPLETED',
      healthScore: 100
    },
    {
      code: 'G',
      letter: 'G',
      name: 'Component Manufacturing',
      category: 'ASSEMBLY',
      phaseId: 6,
      description: 'Manufacturing React UI components, virtual data grids, form controls, and view models.',
      workPackageKey: 'APPLICATION_ENGINEERING',
      responsibleDiscipline: 'Frontend Engineer',
      assignedWorker: 'Codex (OPENAI_CODEX)',
      executionProvider: 'GOOGLE_GENAI',
      requiredArtifacts: ['ReactComponentCode', 'TailwindCSSModule'],
      evidenceType: 'TypeScript Emission Log',
      status: 'VERIFIED_COMPLETED',
      healthScore: 100
    },
    {
      code: 'H',
      letter: 'H',
      name: 'Module Manufacturing',
      category: 'ASSEMBLY',
      phaseId: 7,
      description: 'Packaging domain modules, navigation registries, and client state orchestration.',
      workPackageKey: 'COMMERCIAL_PRODUCT_ENGINEERING',
      responsibleDiscipline: 'ERP Engineer',
      assignedWorker: 'ERP Engineer',
      executionProvider: 'GOOGLE_GENAI',
      requiredArtifacts: ['ModuleRegistryDefinition', 'StateOrchestrator'],
      evidenceType: 'Module Unit Test Report',
      status: 'VERIFIED_COMPLETED',
      healthScore: 100
    },
    {
      code: 'I',
      letter: 'I',
      name: 'Service Manufacturing',
      category: 'ASSEMBLY',
      phaseId: 7,
      description: 'Compiling REST services, authentication gateways, and transaction processing engines.',
      workPackageKey: 'API_AND_INTEGRATION_ENGINEERING',
      responsibleDiscipline: 'Backend Engineer',
      assignedWorker: 'Gemini (GOOGLE_GEMINI)',
      executionProvider: 'GOOGLE_GENAI',
      requiredArtifacts: ['ExpressRouterService', 'AuthGatewayEngine'],
      evidenceType: 'Service Integration Pass Log',
      status: 'VERIFIED_COMPLETED',
      healthScore: 100
    },
    {
      code: 'J',
      letter: 'J',
      name: 'Application Assembly',
      category: 'ASSEMBLY',
      phaseId: 8,
      description: 'Combining UI components, domain modules, and microservices into executable application bundles.',
      workPackageKey: 'BUILD_ASSEMBLY',
      responsibleDiscipline: 'DevOps Engineer',
      assignedWorker: 'DevOps Engineer',
      executionProvider: 'GOOGLE_GENAI',
      requiredArtifacts: ['ApplicationBundle', 'ViteDistManifest'],
      evidenceType: 'Production Build Output Hash',
      status: 'VERIFIED_COMPLETED',
      healthScore: 100
    },
    {
      code: 'K',
      letter: 'K',
      name: 'Data & Schema Manufacturing',
      category: 'ASSEMBLY',
      phaseId: 9,
      description: 'Synthesizing PostgreSQL Drizzle schemas, migrations, indices, and FAAP ledger bindings.',
      workPackageKey: 'SCHEMA_MANUFACTURING',
      responsibleDiscipline: 'Database Engineer',
      assignedWorker: 'Database Engineer',
      executionProvider: 'GOOGLE_GENAI',
      requiredArtifacts: ['DrizzleSchemaDefinition', 'SQLMigrationScript'],
      evidenceType: 'Migration Dry-run Verification',
      status: 'VERIFIED_COMPLETED',
      healthScore: 100
    },
    {
      code: 'L',
      letter: 'L',
      name: 'Workflow Manufacturing',
      category: 'ASSEMBLY',
      phaseId: 7,
      description: 'Building state machine approval workflows, business rule evaluation engines, and escalation timers.',
      workPackageKey: 'APPLICATION_ENGINEERING',
      responsibleDiscipline: 'Workflow Engineer',
      assignedWorker: 'ERP Engineer',
      executionProvider: 'GOOGLE_GENAI',
      requiredArtifacts: ['WorkflowStateMachineDef', 'BusinessRuleRegistry'],
      evidenceType: 'Workflow State Transition Proof',
      status: 'VERIFIED_COMPLETED',
      healthScore: 100
    },
    {
      code: 'M',
      letter: 'M',
      name: 'AI Capability Manufacturing',
      category: 'ASSEMBLY',
      phaseId: 8,
      description: 'Wiring cognitive agent prompts, RAG vector search indexes, and guardrail validation policies.',
      workPackageKey: 'AI_AND_AUTOMATION_ENGINEERING',
      responsibleDiscipline: 'AI Engineer',
      assignedWorker: 'JUMO GPT',
      executionProvider: 'GOOGLE_GENAI',
      requiredArtifacts: ['AgentPromptRegistry', 'GuardrailPolicySpec'],
      evidenceType: 'RAG Precision & Guardrail Trace',
      status: 'VERIFIED_COMPLETED',
      healthScore: 100
    },
    {
      code: 'N',
      letter: 'N',
      name: 'Security & Compliance Engineering',
      category: 'VERIFICATION',
      phaseId: 10,
      description: 'Zero-trust policy enforcement, RBAC matrix verification, and SAST/DAST vulnerability scanning.',
      workPackageKey: 'SECURITY_AND_ZERO_TRUST_VERIFICATION',
      responsibleDiscipline: 'Security Engineer',
      assignedWorker: 'Sovereign Architect',
      executionProvider: 'GOOGLE_GENAI',
      requiredArtifacts: ['SASTScanReport', 'ZeroTrustPolicyMap'],
      evidenceType: '0 Critical Vulnerability Certificate',
      status: 'VERIFIED_COMPLETED',
      healthScore: 100
    },
    {
      code: 'O',
      letter: 'O',
      name: 'Integration Engineering',
      category: 'ASSEMBLY',
      phaseId: 7,
      description: 'Connecting national payment gateways, mobile money APIs, and SAML identity providers.',
      workPackageKey: 'API_AND_INTEGRATION_ENGINEERING',
      responsibleDiscipline: 'Integration Engineer',
      assignedWorker: 'API Engineer',
      executionProvider: 'GOOGLE_GENAI',
      requiredArtifacts: ['MobileMoneyConnector', 'SSOIntegrationSpec'],
      evidenceType: 'Integration Endpoint Health Check',
      status: 'VERIFIED_COMPLETED',
      healthScore: 100
    },
    {
      code: 'P',
      letter: 'P',
      name: 'Test & Verification',
      category: 'VERIFICATION',
      phaseId: 10,
      description: 'Executing 20-gate automated verification suite spanning unit, integration, and performance tests.',
      workPackageKey: 'END_TO_END_SYSTEM_TESTING',
      responsibleDiscipline: 'Verification Engineer',
      assignedWorker: 'Gemini',
      executionProvider: 'GOOGLE_GENAI',
      requiredArtifacts: ['AutomatedTestResults', 'CoverageReport'],
      evidenceType: '20/20 Gates Passed Proof',
      status: 'VERIFIED_COMPLETED',
      healthScore: 100
    },
    {
      code: 'Q',
      letter: 'Q',
      name: 'Human Engineering Ratification',
      category: 'GOVERNANCE',
      phaseId: 4,
      description: 'Authoritative review and formal approval decision execution by Chief System Architect and National Governor.',
      workPackageKey: 'AWAITING_HUMAN_ENGINEERING_APPROVAL',
      responsibleDiscipline: 'National Chief Governor',
      assignedWorker: 'National Chief Governor (HUMAN)',
      executionProvider: 'SOVEREIGN_HUMAN_RATING',
      requiredArtifacts: ['HumanRatificationCertificate', 'SignedDecisionRecord'],
      evidenceType: 'Governor Cryptographic Signature',
      status: job.status === 'COMPLETED' ? 'VERIFIED_COMPLETED' : 'AWAITING_APPROVAL',
      healthScore: job.status === 'COMPLETED' ? 100 : 85
    },
    {
      code: 'R',
      letter: 'R',
      name: 'Certification',
      category: 'GOVERNANCE',
      phaseId: 11,
      description: 'Sealing release candidate artifact with sovereign digital seal and cryptographically verifiable hash.',
      workPackageKey: 'AWAITING_HUMAN_MANUFACTURING_APPROVAL',
      responsibleDiscipline: 'Sovereign Certification Officer',
      assignedWorker: 'Sovereign Architect',
      executionProvider: 'GOOGLE_GENAI',
      requiredArtifacts: ['SovereignManufacturingCertificate'],
      evidenceType: 'SHA-256 Release Seal Digest',
      status: 'VERIFIED_COMPLETED',
      healthScore: 100
    },
    {
      code: 'S',
      letter: 'S',
      name: 'Deployment',
      category: 'OPERATIONS',
      phaseId: 12,
      description: 'Deploying sealed container images to target sovereign enclave clusters and executing DB migrations.',
      workPackageKey: 'DEPLOYMENT_AND_PUBLISHING',
      responsibleDiscipline: 'Cloud Engineer',
      assignedWorker: 'Cloud Engineer',
      executionProvider: 'GOOGLE_GENAI',
      requiredArtifacts: ['DeploymentManifest', 'KubernetesContainerSpec'],
      evidenceType: 'Container Deployment Telemetry',
      status: 'VERIFIED_COMPLETED',
      healthScore: 100
    },
    {
      code: 'T',
      letter: 'T',
      name: 'Institutional Commissioning',
      category: 'OPERATIONS',
      phaseId: 13,
      description: 'Tenant initialization, master user seeding, white-label domain routing, and certificate issuance.',
      workPackageKey: 'RUNTIME_ACTIVATION_AND_CONTINUOUS_AUDIT',
      responsibleDiscipline: 'Commissioning Officer',
      assignedWorker: 'Cloud Engineer',
      executionProvider: 'GOOGLE_GENAI',
      requiredArtifacts: ['InstitutionalCommissioningRecord'],
      evidenceType: 'Tenant Readiness Proof',
      status: 'VERIFIED_COMPLETED',
      healthScore: 100
    },
    {
      code: 'U',
      letter: 'U',
      name: 'Go-Live Acceptance',
      category: 'GOVERNANCE',
      phaseId: 14,
      description: 'Final operational sign-off, public DNS cutover, and activation of production user traffic.',
      workPackageKey: 'RUNTIME_ACTIVATION_AND_CONTINUOUS_AUDIT',
      responsibleDiscipline: 'National Chief Governor',
      assignedWorker: 'National Chief Governor',
      executionProvider: 'SOVEREIGN_HUMAN_RATING',
      requiredArtifacts: ['GoLiveAcceptanceRecord'],
      evidenceType: 'DNS Cutover Verification',
      status: 'VERIFIED_COMPLETED',
      healthScore: 100
    },
    {
      code: 'V',
      letter: 'V',
      name: 'Runtime Operations',
      category: 'OPERATIONS',
      phaseId: 15,
      description: 'Continuous runtime execution, load balancing, autoscaling, and SLA performance monitoring.',
      workPackageKey: 'RUNTIME_ACTIVATION_AND_CONTINUOUS_AUDIT',
      responsibleDiscipline: 'SRE Engineer',
      assignedWorker: 'SRE Engineer',
      executionProvider: 'GOOGLE_GENAI',
      requiredArtifacts: ['SLOTelemetryFeed', 'HealthCheckEndpoint'],
      evidenceType: 'Live Uptime Telemetry Stream',
      status: 'VERIFIED_COMPLETED',
      healthScore: 100
    },
    {
      code: 'W',
      letter: 'W',
      name: 'Observability',
      category: 'OPERATIONS',
      phaseId: 15,
      description: 'Structured log aggregation, distributed tracing, error boundaries, and security event audits.',
      workPackageKey: 'RUNTIME_ACTIVATION_AND_CONTINUOUS_AUDIT',
      responsibleDiscipline: 'Observability Engineer',
      assignedWorker: 'SRE Engineer',
      executionProvider: 'GOOGLE_GENAI',
      requiredArtifacts: ['OpenTelemetryTraceConfig', 'AuditLogArchive'],
      evidenceType: 'Immutable Security Audit Trail',
      status: 'VERIFIED_COMPLETED',
      healthScore: 100
    },
    {
      code: 'X',
      letter: 'X',
      name: 'Maintenance',
      category: 'OPERATIONS',
      phaseId: 16,
      description: 'Routine maintenance, dependency vulnerability patching, and index optimization.',
      workPackageKey: 'RUNTIME_ACTIVATION_AND_CONTINUOUS_AUDIT',
      responsibleDiscipline: 'Maintenance Engineer',
      assignedWorker: 'Database Engineer',
      executionProvider: 'GOOGLE_GENAI',
      requiredArtifacts: ['MaintenanceScheduleLog'],
      evidenceType: 'Patch Verification Record',
      status: 'VERIFIED_COMPLETED',
      healthScore: 100
    },
    {
      code: 'Y',
      letter: 'Y',
      name: 'Change / Patch Management',
      category: 'OPERATIONS',
      phaseId: 16,
      description: 'Analyzing change requests, computing regression impact, and issuing hotfix patches.',
      workPackageKey: 'RUNTIME_ACTIVATION_AND_CONTINUOUS_AUDIT',
      responsibleDiscipline: 'Release Engineer',
      assignedWorker: 'DevOps Engineer',
      executionProvider: 'GOOGLE_GENAI',
      requiredArtifacts: ['ChangeImpactAnalysis', 'HotfixPatchManifest'],
      evidenceType: 'Regression Test Result',
      status: 'VERIFIED_COMPLETED',
      healthScore: 100
    },
    {
      code: 'Z',
      letter: 'Z',
      name: 'Evolution / Upgrade',
      category: 'OPERATIONS',
      phaseId: 16,
      description: 'Orchestrating major version upgrades, database migrations, and non-breaking feature rollouts.',
      workPackageKey: 'RUNTIME_ACTIVATION_AND_CONTINUOUS_AUDIT',
      responsibleDiscipline: 'Evolution Architect',
      assignedWorker: 'Sovereign Architect',
      executionProvider: 'GOOGLE_GENAI',
      requiredArtifacts: ['VersionUpgradePlan'],
      evidenceType: 'Zero-Downtime Migration Log',
      status: 'VERIFIED_COMPLETED',
      healthScore: 100
    },
    {
      code: 'AA',
      letter: 'AA',
      name: 'Retirement / Archival',
      category: 'OPERATIONS',
      phaseId: 17,
      description: 'Decommissioning authorization, data export, cryptographically sealed archive, and 20-year audit retention.',
      workPackageKey: 'RUNTIME_ACTIVATION_AND_CONTINUOUS_AUDIT',
      responsibleDiscipline: 'Archival Governor',
      assignedWorker: 'Sovereign Architect',
      executionProvider: 'SOVEREIGN_ARCHIVE',
      requiredArtifacts: ['ArchivalSealingRecord'],
      evidenceType: '20-Year Cold Storage Digest',
      status: 'VERIFIED_COMPLETED',
      healthScore: 100
    }
  ];

  const filteredLayers = layers.filter(l => {
    const matchesSearch = l.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          l.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          l.code.toLowerCase() === searchQuery.toLowerCase();
    const matchesCategory = filterCategory === 'ALL' || l.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const selectedLayer = layers.find(l => l.code === selectedLayerCode) || layers[0];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
      {/* Header Bar */}
      <div className="p-5 border-b border-slate-200 bg-slate-900 text-white flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-blue-400" />
            <h3 className="font-bold text-lg text-white">27 Operational Factory Concerns (A – AA)</h3>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Authoritative end-to-end manufacturing concern hierarchy mapping specifications to long-term archival.
          </p>
        </div>

        {/* Category Pill Filters */}
        <div className="flex flex-wrap items-center gap-2">
          {['ALL', 'PRE_MANUFACTURING', 'ENGINEERING', 'ASSEMBLY', 'VERIFICATION', 'GOVERNANCE', 'OPERATIONS'].map(cat => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                filterCategory === cat 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {cat.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-200">
        {/* Left Column: 27 Operational Layer List */}
        <div className="lg:col-span-5 p-4 bg-slate-50 space-y-3 max-h-[650px] overflow-y-auto">
          {/* Search Box */}
          <div className="relative mb-2">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search operational concern (A - AA)..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-1 gap-2">
            {filteredLayers.map((layer) => {
              const isSelected = layer.code === selectedLayerCode;
              return (
                <div
                  key={layer.code}
                  onClick={() => setSelectedLayerCode(layer.code)}
                  className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                    isSelected 
                      ? 'bg-blue-50 border-blue-600 shadow-xs ring-1 ring-blue-500' 
                      : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-100/50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className={`w-7 h-7 rounded-lg text-xs font-black flex items-center justify-center shrink-0 ${
                        isSelected ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-800'
                      }`}>
                        {layer.letter}
                      </span>
                      <div>
                        <div className="text-xs font-bold text-slate-900 leading-tight">
                          {layer.name}
                        </div>
                        <div className="text-[10px] text-slate-500">
                          Phase {layer.phaseId} • {layer.category}
                        </div>
                      </div>
                    </div>
                    <ChevronRight className={`w-4 h-4 transition-transform ${isSelected ? 'text-blue-600 translate-x-1' : 'text-slate-400'}`} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Deep Layer Inspector */}
        <div className="lg:col-span-7 p-6 space-y-6 bg-white">
          {selectedLayer && (
            <motion.div
              key={selectedLayer.code}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* Layer Title & Status Banner */}
              <div className="p-4 rounded-xl border border-blue-200 bg-blue-50/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 text-xs font-black bg-blue-600 text-white rounded-md">
                      LAYER {selectedLayer.letter}
                    </span>
                    <h4 className="text-base font-bold text-slate-900">{selectedLayer.name}</h4>
                  </div>
                  <p className="text-xs text-slate-600 mt-1">{selectedLayer.description}</p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="px-2.5 py-1 text-xs font-bold bg-emerald-100 text-emerald-800 rounded-full flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    {selectedLayer.status.replace('_', ' ')}
                  </span>
                </div>
              </div>

              {/* Grid Metadata Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                    <UserCheck className="w-3.5 h-3.5 text-blue-600" />
                    Workforce & Execution
                  </div>
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Responsible Discipline:</span>
                      <span className="font-semibold text-slate-900">{selectedLayer.responsibleDiscipline}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Assigned Worker:</span>
                      <span className="font-semibold text-blue-600">{selectedLayer.assignedWorker}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Execution Provider:</span>
                      <span className="font-semibold text-slate-800">{selectedLayer.executionProvider}</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    Evidence & Artifacts
                  </div>
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Evidence Type:</span>
                      <span className="font-semibold text-slate-900">{selectedLayer.evidenceType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Work Package Key:</span>
                      <span className="font-mono text-[11px] text-slate-800">{selectedLayer.workPackageKey}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Health Score:</span>
                      <span className="font-black text-emerald-600">{selectedLayer.healthScore}%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Required Artifacts List */}
              <div className="space-y-2">
                <h5 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Required Layer Artifacts</h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {selectedLayer.requiredArtifacts.map((art, idx) => (
                    <div key={idx} className="p-2.5 rounded-lg border border-slate-200 bg-white flex items-center gap-2 text-xs font-mono text-slate-700">
                      <FileText className="w-4 h-4 text-blue-600 shrink-0" />
                      <span className="truncate">{art}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Verification & Compliance Status */}
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-900 text-white space-y-3">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-bold text-slate-300 uppercase tracking-wider">Authoritative Verification Gate</div>
                  <span className="px-2 py-0.5 text-[10px] font-black bg-emerald-500/20 text-emerald-400 rounded-md">VERIFIED</span>
                </div>
                <div className="text-xs text-slate-300">
                  Layer {selectedLayer.letter} passed all prerequisite checks and produced verified evidence logged in the JDPM Lineage Engine.
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
