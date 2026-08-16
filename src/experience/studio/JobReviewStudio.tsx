import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CheckCircle2, XCircle, AlertTriangle, Eye, FileText, Layers, Zap, 
  ShieldCheck, ArrowRight, ChevronRight, Search, Filter, History, 
  MessageSquare, User, Clock, Terminal, Database, Activity, Cpu, 
  Smartphone, Monitor, ChevronDown, Check, Settings, Code, FileCode, Play,
  ExternalLink, Globe, Layout, ShieldAlert
} from 'lucide-react';
import { JumoEventBus } from '../../core/common/events/JumoEventBus';
import { SovereignGovernanceRegistry } from '../../services/gov/SovereignGovernanceRegistry';
import { ManufacturingJob, ArchitectureContract, ExperienceBlueprint } from '../../core/factory/registry/HubRegistryTypes';
import { DigitalProductManufacturingOrchestrator } from '../../services/factory/DigitalProductManufacturingOrchestrator';

// Define the 32-stage history details
interface ManufacturingStageDetails {
  stage: number;
  name: string;
  category: 'SPECIFICATION' | 'ARCHITECTURE' | 'ENGINEERING' | 'MANUFACTURE' | 'VERIFICATION' | 'DEPLOYMENT';
  description: string;
  artifactName: string;
  artifactPreview: any;
  durationMs: number;
  operator: string;
  checksum: string;
}

const MANUFACTURE_32_STAGES: ManufacturingStageDetails[] = [
  { stage: 1, name: 'Digital Intake', category: 'SPECIFICATION', description: 'Receive and parse sovereign requirements briefing.', artifactName: 'intake_manifest.json', durationMs: 450, operator: 'Intake Orcherstrator', checksum: 'sha256:01bf9e...', artifactPreview: { format: 'JSON', lines: ['{', '  "source": "Human Governor Briefing",', '  "integrity": "verified",', '  "priority": "normal"', '}'] } },
  { stage: 2, name: 'Specification Normalization', category: 'SPECIFICATION', description: 'Normalize user inputs and map to standard taxonomies.', artifactName: 'specification_normalized.json', durationMs: 820, operator: 'Specification Compiler', checksum: 'sha256:4a8bc3...', artifactPreview: { format: 'JSON', lines: ['{', '  "standard": "JUMO_CORE_V6",', '  "taxonomy_count": 31,', '  "violations": 0', '}'] } },
  { stage: 3, name: 'Sovereign Compliance Mapping', category: 'SPECIFICATION', description: 'Align domain specification with national privacy policies.', artifactName: 'sovereign_isolation_checks.json', durationMs: 610, operator: 'Compliance Auditor', checksum: 'sha256:b1d83f...', artifactPreview: { format: 'JSON', lines: ['{', '  "data_residency": "SOVEREIGN_NATIONAL",', '  "isolation_mode": "logical_namespace",', '  "policy_match": true', '}'] } },
  { stage: 4, name: 'Capacity Profiling & Synthesis', category: 'SPECIFICATION', description: 'Synthesize tenant capacity metrics and storage profile.', artifactName: 'capacity_blueprint.json', durationMs: 400, operator: 'Sizing Engine', checksum: 'sha256:882dd1...', artifactPreview: { format: 'JSON', lines: ['{', '  "target_concurrency": 1500,', '  "allocated_storage_gb": 1000,', '  "tps_threshold": 150', '}'] } },
  { stage: 5, name: 'Traceability Matrix Seeding', category: 'SPECIFICATION', description: 'Generate lineage links for every selected module.', artifactName: 'traceability_manifest.json', durationMs: 310, operator: 'Lineage Watcher', checksum: 'sha256:fa2349...', artifactPreview: { format: 'JSON', lines: ['{', '  "total_requirements": 14,', '  "active_anchors": 14,', '  "unmapped_nodes": 0', '}'] } },
  
  { stage: 6, name: 'Architecture Discovery', category: 'ARCHITECTURE', description: 'Query Jumo Option Registry for architectural options.', artifactName: 'discovery_ledger.json', durationMs: 720, operator: 'Option Discoverer', checksum: 'sha256:cc99ab...', artifactPreview: { format: 'JSON', lines: ['{', '  "discovered_patterns": ["Modular Monolith", "Event-Driven Gateway"],', '  "compatibility_score": 100', '}'] } },
  { stage: 7, name: 'Ecosystem Decomposition', category: 'ARCHITECTURE', description: 'Decompose required product into modular layers.', artifactName: 'layer_decomposition.json', durationMs: 510, operator: 'System Decomposition Agent', checksum: 'sha256:d82ab4...', artifactPreview: { format: 'JSON', lines: ['{', '  "allocated_layers": ["UI", "API", "DB", "AUTH", "WORKFLOW"],', '  "interdependencies": 8', '}'] } },
  { stage: 8, name: 'Domain Blueprint Design', category: 'ARCHITECTURE', description: 'Assemble core workflow sequences and gateways.', artifactName: 'workflow_graphs.json', durationMs: 910, operator: 'Workflow Designer', checksum: 'sha256:ea2a8c...', artifactPreview: { format: 'JSON', lines: ['{', '  "graphs": ["Standard Intake Approval", "Service Catalog Search"],', '  "vertices": 12,', '  "edges": 11', '}'] } },
  { stage: 9, name: 'Security Architecture Design', category: 'ARCHITECTURE', description: 'Establish RBAC rules and cryptographic models.', artifactName: 'security_architecture.json', durationMs: 580, operator: 'Cyber Architect', checksum: 'sha256:ee0443...', artifactPreview: { format: 'JSON', lines: ['{', '  "auth_protocol": "OIDC",', '  "encryption_level": "AES-256",', '  "zero_trust": true', '}'] } },
  { stage: 10, name: 'Integration Topology Planning', category: 'ARCHITECTURE', description: 'Map external APIs and payment gateway topologies.', artifactName: 'integration_topology.json', durationMs: 440, operator: 'Interface Designer', checksum: 'sha256:b0098f...', artifactPreview: { format: 'JSON', lines: ['{', '  "integrations": ["STRIPE", "JUMO_PAY", "MINISTRY_EMIS"],', '  "protocols": ["REST", "GRAPHQL"]', '}'] } },
  { stage: 11, name: 'Architecture Contract Sign-off', category: 'ARCHITECTURE', description: 'Verify architecture structure and generate full contract.', artifactName: 'architecture_signoff.json', durationMs: 380, operator: 'Chief Architect Agent', checksum: 'sha256:ee4f98...', artifactPreview: { format: 'JSON', lines: ['{', '  "verification_status": "APPROVED",', '  "signoff_time": "2026-08-16T08:15:22Z",', '  "digest_hash": "6ffea91..."', '}'] } },

  { stage: 12, name: 'Workforce Allocation', category: 'ENGINEERING', description: 'Allocate AI Engineering agents per specialization.', artifactName: 'agent_assignments.json', durationMs: 490, operator: 'Resource Allocator', checksum: 'sha256:22a89c...', artifactPreview: { format: 'JSON', lines: ['{', '  "allocated_agents": 4,', '  "total_budget_hours": 12,', '  "roles": ["DatabaseEngineer", "SecurityEngineer", "UIEngineer"]', '}'] } },
  { stage: 13, name: 'Database Model Engineering', category: 'ENGINEERING', description: 'Design SQL schema models, entities, and indexes.', artifactName: 'drizzle_schema.ts', durationMs: 1200, operator: 'Database Engineer', checksum: 'sha256:d9b231...', artifactPreview: { format: 'TS', lines: ['import { pgTable, text, timestamp } from "drizzle-orm";', 'export const profiles = pgTable("profiles", {', '  id: text("id").primaryKey(),', '  role: text("role").default("USER"),', '  updatedAt: timestamp("updated_at")', '});'] } },
  { stage: 14, name: 'Auth & Session Engineering', category: 'ENGINEERING', description: 'Configure session, cookie handling, and MFA routes.', artifactName: 'session_config.ts', durationMs: 810, operator: 'Security Engineer', checksum: 'sha256:a0bc9d...', artifactPreview: { format: 'TS', lines: ['export const sessionConfig = {', '  maxAge: "30m",', '  sameSite: "strict",', '  mfaRequired: true,', '  provider: "OIDC"', '};'] } },
  { stage: 15, name: 'Domain Logic Implementation', category: 'ENGINEERING', description: 'Implement core controllers and workflow executors.', artifactName: 'workflow_controller.ts', durationMs: 1150, operator: 'Backend Engineer', checksum: 'sha256:f4ff2b...', artifactPreview: { format: 'TS', lines: ['export class WorkflowController {', '  async executeStandardIntake(params: any) {', '    logger.log("Intake started", params.id);', '    return { success: true, trackingId: "TRK-" + Date.now() };', '  }', '}'] } },
  { stage: 16, name: 'API Gateway Routing', category: 'ENGINEERING', description: 'Engineer endpoint definitions, rate limiters, and proxies.', artifactName: 'api_routes.ts', durationMs: 650, operator: 'Platform Engineer', checksum: 'sha256:22bb9a...', artifactPreview: { format: 'TS', lines: ['export const apiRouter = Router();', 'apiRouter.post("/api/intake", rateLimiter, intakeHandler);', 'apiRouter.get("/api/catalog", cache("5m"), catalogHandler);'] } },
  { stage: 17, name: 'Design System Adaptation', category: 'ENGINEERING', description: 'Synthesize custom Tailwind properties and styles.', artifactName: 'tailwind_theme.json', durationMs: 410, operator: 'UI Designer Agent', checksum: 'sha256:eeab8c...', artifactPreview: { format: 'JSON', lines: ['{', '  "primary": "#2563eb",', '  "secondary": "#64748b",', '  "radius": "16px",', '  "typography": "Inter, sans-serif"', '}'] } },
  { stage: 18, name: 'AI Capabilities Integration', category: 'ENGINEERING', description: 'Integrate LLM safety guardrails and system RAG scope.', artifactName: 'ai_guardrails.ts', durationMs: 880, operator: 'AI Architect', checksum: 'sha256:3a4bc8...', artifactPreview: { format: 'TS', lines: ['export const aiGuardrails = {', '  safetyFilters: ["PII", "EXPLICIT", "OUT_OF_BOUNDS"],', '  knowledgeBases: ["System Documentation"],', '  persona: "ANALYST"', '};'] } },
  { stage: 19, name: 'Sovereign Logging Setup', category: 'ENGINEERING', description: 'Configure ledger audit hooks and performance telemetry.', artifactName: 'audit_telemetry.ts', durationMs: 490, operator: 'QA Automation', checksum: 'sha256:dd001a...', artifactPreview: { format: 'TS', lines: ['export const auditHooks = {', '  beforeAction: async (action: string, actor: string) => {', '    await SovereignLedger.log(action, actor);', '  }', '};'] } },
  
  { stage: 20, name: 'Schema Compilation', category: 'MANUFACTURE', description: 'Validate database schema and perform dry-run migrations.', artifactName: 'migration_ledger.sql', durationMs: 950, operator: 'Schema Compiler', checksum: 'sha256:99ffab...', artifactPreview: { format: 'SQL', lines: ['-- Migration dry-run', 'CREATE TABLE IF NOT EXISTS "profiles" (', '  "id" text PRIMARY KEY,', '  "role" text DEFAULT \'USER\',', '  "updated_at" timestamp', ');'] } },
  { stage: 21, name: 'Binary Artifact Generation', category: 'MANUFACTURE', description: 'Compile backend models and optimize tree shaking.', artifactName: 'compiled_server.js', durationMs: 1500, operator: 'Build System', checksum: 'sha256:2a883b...', artifactPreview: { format: 'JS', lines: ['// Compiled production bundle size: 2.14MB', 'const express = require("express");', 'const app = express();', 'app.listen(3000, () => console.log("Host ready"));'] } },
  { stage: 22, name: 'Asset Assembly', category: 'MANUFACTURE', description: 'Assemble static UI files, client scripts, and optimized imagery.', artifactName: 'index.html', durationMs: 1100, operator: 'UI Packager', checksum: 'sha256:f12a3d...', artifactPreview: { format: 'HTML', lines: ['<!DOCTYPE html>', '<html lang="en">', '  <head><title>Sovereign System</title></head>', '  <body><div id="root"></div></body>', '</html>'] } },
  { stage: 23, name: 'Assembly Integration', category: 'MANUFACTURE', description: 'Bind client modules, backend logic, and schemas.', artifactName: 'system_manifest.json', durationMs: 530, operator: 'Linker Engine', checksum: 'sha256:77bc2a...', artifactPreview: { format: 'JSON', lines: ['{', '  "bundle_id": "BNDL-883a",', '  "version": "1.0.0",', '  "compiled_at": "2026-08-16T08:18:00Z"', '}'] } },
  
  { stage: 24, name: 'Static Code Validation', category: 'VERIFICATION', description: 'Run linter suite and type checks across compiled code.', artifactName: 'linter_report.json', durationMs: 620, operator: 'Linter Service', checksum: 'sha256:00889c...', artifactPreview: { format: 'JSON', lines: ['{', '  "exit_code": 0,', '  "errors": 0,', '  "warnings": 2', '}'] } },
  { stage: 25, name: 'Unit Testing Suite', category: 'VERIFICATION', description: 'Verify unit contracts and service actions.', artifactName: 'unit_tests.log', durationMs: 1350, operator: 'Test Suite', checksum: 'sha256:c0cb2a...', artifactPreview: { format: 'LOG', lines: ['PASS  src/core/tests/architecture.test.ts (2.4s)', 'PASS  src/core/tests/specification.test.ts (1.8s)', 'Test Suites: 2 passed, 2 total', 'Tests:       18 passed, 18 total'] } },
  { stage: 26, name: 'Zero Trust Security Scan', category: 'VERIFICATION', description: 'Audit security configuration and trace authentication rules.', artifactName: 'security_audit.report', durationMs: 820, operator: 'Security Scanner', checksum: 'sha256:aa2a3c...', artifactPreview: { format: 'TEXT', lines: ['[SECURITY REPORT]', '- Zero-Trust Boundaries: VALID', '- Token Expiry: 1800s', '- SQL Injection Vector Scan: CLEAN', '- Vulnerability Count: 0'] } },
  { stage: 27, name: 'E2E Flow Simulation', category: 'VERIFICATION', description: 'Simulate human workflow interactions and verify portal fidelity.', artifactName: 'e2e_playback.json', durationMs: 1450, operator: 'End-to-End Assurer', checksum: 'sha256:ee3312...', artifactPreview: { format: 'JSON', lines: ['{', '  "scenarios_tested": ["discover_service", "submit_intake", "admin_approve"],', '  "completion_rate": 1.0,', '  "avg_latency_ms": 42', '}'] } },
  { stage: 28, name: 'Sovereign Compliance Check', category: 'VERIFICATION', description: 'Confirm data governance and sovereignty policy rules match output.', artifactName: 'governance_ledger.json', durationMs: 510, operator: 'Sovereign Governor Auditor', checksum: 'sha256:4a4f8b...', artifactPreview: { format: 'JSON', lines: ['{', '  "national_data_isolation": "PASS",', '  "audit_trail_enabled": true,', '  "sovereign_keys_verified": true', '}'] } },

  { stage: 29, name: 'Publishing Manifest Setup', category: 'DEPLOYMENT', description: 'Generate publication instructions and platform slots mapping.', artifactName: 'publish_manifest.json', durationMs: 400, operator: 'Publishing Agent', checksum: 'sha256:f0f12d...', artifactPreview: { format: 'JSON', lines: ['{', '  "target_slots": ["CLOUD_SLOT_01"],', '  "canary_enabled": false,', '  "health_check_url": "/health"', '}'] } },
  { stage: 30, name: 'Platform Provisioning', category: 'DEPLOYMENT', description: 'Configure cloud slots, memory partitions, and security containers.', artifactName: 'provision_report.json', durationMs: 980, operator: 'Cloud Provisioner', checksum: 'sha256:ddab8c...', artifactPreview: { format: 'JSON', lines: ['{', '  "allocation": "SUCCESS",', '  "vcpus": 4,', '  "ram_mb": 8192,', '  "environment": "Sovereign Private Cloud"', '}'] } },
  { stage: 31, name: 'Active Deployment', category: 'DEPLOYMENT', description: 'Upload artifacts, start services, and wire Jumo Edge gateway.', artifactName: 'deployment_status.json', durationMs: 1600, operator: 'Deployment Engine', checksum: 'sha256:aa99f1...', artifactPreview: { format: 'JSON', lines: ['{', '  "deployment_id": "DEP-773a",', '  "status": "ACTIVE",', '  "endpoints": ["https://healthcare-os.national.gov.internal"],', '  "ssl_status": "VALID_TRUSTED"', '}'] } },
  { stage: 32, name: 'Continuous Audit Loop Activation', category: 'DEPLOYMENT', description: 'Establish secure real-time logging and performance watching.', artifactName: 'audit_daemon.json', durationMs: 480, operator: 'Audit Watchdog', checksum: 'sha256:ee88ca...', artifactPreview: { format: 'JSON', lines: ['{', '  "audit_frequency": "REAL_TIME",', '  "ledger_hooks": "ACTIVE",', '  "compliance_status": "OPTIMAL"', '}'] } }
];

export function JobReviewStudio() {
  const [jobs, setJobs] = useState<ManufacturingJob[]>([]);
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'brief' | 'specification' | 'history32' | 'preview'>('brief');
  
  // Specification sections selection for interactive specification tree
  const [expandedSpecSection, setExpandedSpecSection] = useState<string>('identity');
  
  // Selected manufacturing stage from the 32-stage history
  const [selectedStageNumber, setSelectedStageNumber] = useState<number>(1);
  
  // Preview configuration (Mobile vs Desktop)
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'mobile'>('desktop');
  const [activePreviewTab, setActivePreviewTab] = useState<'landing' | 'catalog' | 'portal'>('landing');
  const [searchQuery, setSearchQuery] = useState('');
  const [mockSelectedService, setMockSelectedService] = useState<string | null>(null);
  
  // Custom interactive RAG assistant state in Preview
  const [chatbotOpen, setChatbotOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'user' | 'assistant'; text: string }>>([
    { sender: 'assistant', text: 'Welcome to JUMO Sovereign Digital Services. I am your context-bound assistant. How can I help you discover and access our institutional services today?' }
  ]);
  const [chatInput, setChatInput] = useState('');

  // Rejection state
  const [rejectionFeedback, setRejectionFeedback] = useState('');
  const [isRejecting, setIsRejecting] = useState(false);
  const [affectedStage, setAffectedStage] = useState('01_SPECIFICATION');
  const [affectedRequirement, setAffectedRequirement] = useState('REQ-001 Sovereign Isolation');
  const [severityLevel, setSeverityLevel] = useState('CRITICAL');
  const [requestedCorrection, setRequestedCorrection] = useState('');

  const registry = SovereignGovernanceRegistry.getInstance();
  const orchestrator = DigitalProductManufacturingOrchestrator.getInstance();

  useEffect(() => {
    const fetchData = () => {
      setJobs(registry.getAllJobs().filter(j => j.status !== 'FAILED'));
    };
    fetchData();
    const interval = setInterval(fetchData, 3000);
    return () => clearInterval(interval);
  }, []);

  const selectedJob = jobs.find(j => j.id === selectedJobId);
  const blueprint = selectedJob ? registry.getBlueprint(selectedJob.blueprintId || '') : null;
  const specContract = selectedJob ? (selectedJob.config?.specification || registry.getProductSpecification(selectedJob.productId)) : null;

  const handleApprove = async () => {
    if (!selectedJobId) return;
    const currentState = selectedJob?.currentLifecycleState || 'AWAITING_SPECIFICATION_APPROVAL';
    
    // Auto-promote based on state
    let targetState = 'SPECIFICATION_APPROVED';
    if (currentState === 'AWAITING_ARCHITECTURE_APPROVAL') {
      targetState = 'ARCHITECTURE_APPROVED';
    } else if (currentState === 'AWAITING_HUMAN_ENGINEERING_APPROVAL') {
      targetState = 'ENGINEERING_APPROVED';
    } else if (currentState === 'AWAITING_HUMAN_MANUFACTURING_APPROVAL') {
      targetState = 'MANUFACTURING_APPROVED';
    }

    await orchestrator.grantApproval(selectedJobId, targetState as any, 'Sovereign Reviewer Alpha');
    
    // Publish standard approval notification
    JumoEventBus.publish('JOB_APPROVED', {
      jobId: selectedJobId,
      approver: 'Sovereign Reviewer Alpha',
      stage: currentState,
      timestamp: new Date().toISOString()
    });
    
    setSelectedJobId(null);
  };

  const handleReject = async () => {
    if (!selectedJobId || !rejectionFeedback) return;
    
    JumoEventBus.publish('JOB_REJECTED', {
      jobId: selectedJobId,
      reason: rejectionFeedback,
      affectedStage,
      affectedRequirement,
      severity: severityLevel,
      correction: requestedCorrection,
      timestamp: new Date().toISOString()
    });

    registry.addLedgerEntry(
      "Job Rejected", 
      "GOVERNANCE", 
      `Job ${selectedJobId} rejected at stage ${affectedStage}. Severity: ${severityLevel}. Reason: ${rejectionFeedback}`
    );

    setIsRejecting(false);
    setRejectionFeedback('');
    setRequestedCorrection('');
    setSelectedJobId(null);
  };

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMsg = chatInput;
    setChatMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
    setChatInput('');

    setTimeout(() => {
      let reply = "Your request has been routed to the appropriate sovereign authority. Thank you for utilizing the digital service corridor.";
      if (userMsg.toLowerCase().includes('data') || userMsg.toLowerCase().includes('sovereign')) {
        reply = "All system operations are hosted on localized private infrastructure. Compliance with local storage policy has been fully verified and registered in the immutable ledger.";
      } else if (userMsg.toLowerCase().includes('help') || userMsg.toLowerCase().includes('support')) {
        reply = "Support tickets are automatically created and assigned SLA tier P2_24H. You will be notified in-app.";
      }
      setChatMessages(prev => [...prev, { sender: 'assistant', text: reply }]);
    }, 800);
  };

  // Safe TraceableValue reader
  const renderTraceable = (tv: any) => {
    if (!tv) return <span className="text-slate-400 font-bold">N/A</span>;
    const value = (typeof tv === 'object' && 'value' in tv) ? tv.value : tv;
    const source = (typeof tv === 'object' && 'source' in tv) ? tv.source : 'SYSTEM_GENERATED';
    const timestamp = (typeof tv === 'object' && 'timestamp' in tv) ? tv.timestamp : '';

    const sourceBadgeColor = 
      source === 'HUMAN_SELECTED' ? 'bg-blue-100 text-blue-700 border-blue-200' :
      source === 'REGULATORY_REQUIRED' ? 'bg-red-100 text-red-700 border-red-200' :
      source === 'MINIMUM_STANDARD' ? 'bg-purple-100 text-purple-700 border-purple-200' :
      'bg-slate-100 text-slate-700 border-slate-200';

    return (
      <div className="space-y-1 bg-slate-50 p-2.5 rounded-lg border border-slate-200/60">
        <div className="flex items-center justify-between text-[10px]">
          <span className="font-bold text-slate-800">
            {Array.isArray(value) ? value.join(', ') : String(value)}
          </span>
          <span className={`text-[8px] font-black tracking-wider px-1.5 py-0.5 rounded border ${sourceBadgeColor}`}>
            {source}
          </span>
        </div>
        {timestamp && (
          <p className="text-[8px] text-slate-400 font-medium flex items-center gap-1">
            <Clock size={8} /> {new Date(timestamp).toLocaleTimeString()}
          </p>
        )}
      </div>
    );
  };

  // Safe value getter for preview
  const getVal = <T,>(tv: any, fallback: T): T => {
    if (!tv) return fallback;
    if (typeof tv === 'object' && 'value' in tv) return tv.value;
    return tv as T;
  };

  const getPrimaryColor = () => {
    if (!specContract) return '#2563eb';
    const bIdentity = getVal(specContract.identity?.brandIdentity, null);
    if (bIdentity && bIdentity.primaryColor) return getVal(bIdentity.primaryColor, '#2563eb');
    return '#2563eb';
  };

  const getDesignRadius = () => {
    if (!specContract) return '12px';
    const dSystem = getVal(specContract.digitalExperience?.designSystem, null);
    if (dSystem && dSystem.radius) {
      const radiusVal = getVal(dSystem.radius, 16);
      return `${radiusVal}px`;
    }
    return '12px';
  };

  return (
    <div className="animate-fadeIn space-y-6 h-full flex flex-col" id="job-review-studio-root">
      {/* Top Banner Row */}
      <div className="bg-slate-900 text-white p-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 border border-slate-800 shadow-lg">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-md shadow-blue-500/20">
            <ShieldCheck size={24} />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-white">Job Review & Verification Studio</h1>
            <p className="text-xs text-blue-300 font-medium uppercase tracking-wider">Authoritative Sovereign Quality Assurance & Governance Corridor</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="bg-blue-950/60 border border-blue-900/60 px-3.5 py-1.5 rounded-xl flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-wider text-blue-200">
              Active Queue: {jobs.length} Job{jobs.length === 1 ? '' : 's'}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 overflow-hidden min-h-[580px]">
        {/* Left Side: Job Queue Panel */}
        <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 shadow-xs flex flex-col overflow-hidden">
          <div className="p-4 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Awaiting Verification</span>
            <Filter size={12} className="text-slate-400" />
          </div>
          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            {jobs.length === 0 ? (
              <div className="p-8 text-center space-y-2 opacity-50 my-auto">
                <CheckCircle2 size={36} className="mx-auto text-emerald-500" />
                <p className="text-xs font-bold text-slate-800">Corridor Clear</p>
                <p className="text-[10px] text-slate-500 leading-relaxed">No manufacturing jobs are pending human governor review.</p>
              </div>
            ) : (
              jobs.map(job => (
                <button
                  key={job.id}
                  onClick={() => {
                    setSelectedJobId(job.id);
                    setActiveTab('brief');
                  }}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all cursor-pointer ${
                    selectedJobId === job.id 
                      ? 'bg-blue-50/50 border-blue-300 shadow-sm' 
                      : 'bg-white border-slate-100 hover:border-blue-200 hover:bg-slate-50/40'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[9px] font-black uppercase bg-slate-100 border border-slate-200 text-slate-600 px-1.5 py-0.5 rounded">
                      {job.id}
                    </span>
                    <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded ${
                      (job.currentLifecycleState || '').includes('AWAITING') ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'
                    }`}>
                      {(job.currentLifecycleState || job.status || '').replace(/_/g, ' ')}
                    </span>
                  </div>
                  
                  <h3 className="text-xs font-bold text-slate-900 truncate mb-1">
                    {getVal(job.blueprint?.productIdentity?.name, job.productId)}
                  </h3>
                  
                  <div className="flex items-center gap-1.5 text-[9px] font-bold text-slate-400">
                    <span className="uppercase tracking-wide">{job.ecosystem.replace(/_/g, ' ')}</span>
                  </div>

                  <div className="mt-3 flex items-center justify-between text-[10px] font-medium text-slate-500 pt-2 border-t border-slate-100/50">
                    <div className="flex items-center gap-1">
                      <Clock size={11} className="text-slate-400" />
                      <span>{new Date(job.createdAt).toLocaleTimeString()}</span>
                    </div>
                    <span className="text-blue-600 font-bold bg-blue-50 px-1.5 py-0.5 rounded">
                      {job.progress}% Complete
                    </span>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>

        {/* Right Side: Primary Central Workspace Workspace */}
        <div className="lg:col-span-9 bg-white rounded-2xl border border-slate-200 shadow-xs flex flex-col overflow-hidden">
          {selectedJob ? (
            <>
              {/* Central Workspace Tab Header */}
              <div className="p-4 border-b border-slate-100 bg-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-slate-900 rounded-lg flex items-center justify-center text-white font-black text-xs">
                    J
                  </div>
                  <div>
                    <h2 className="text-sm font-extrabold text-slate-900">{getVal(selectedJob.blueprint?.productIdentity?.name, selectedJob.productId)}</h2>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Product Scope ID: {selectedJob.productId}</p>
                  </div>
                </div>

                <div className="flex items-center gap-1 bg-slate-200/50 p-1 rounded-xl border border-slate-200">
                  <button 
                    onClick={() => setActiveTab('brief')}
                    className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase transition-all ${activeTab === 'brief' ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
                  >
                    Requirements Brief
                  </button>
                  <button 
                    onClick={() => setActiveTab('specification')}
                    className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase transition-all ${activeTab === 'specification' ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
                  >
                    Specifications
                  </button>
                  <button 
                    onClick={() => setActiveTab('history32')}
                    className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase transition-all ${activeTab === 'history32' ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
                  >
                    32-Stage History
                  </button>
                  <button 
                    onClick={() => setActiveTab('preview')}
                    className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase transition-all ${activeTab === 'preview' ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
                  >
                    Product Preview
                  </button>
                </div>
              </div>

              {/* Central Workspace Tab Body */}
              <div className="flex-1 overflow-y-auto p-6 bg-slate-50/20">
                
                {/* 1. Requirements Brief Tab */}
                {activeTab === 'brief' && (
                  <div className="space-y-6 max-w-4xl">
                    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-4">
                      <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                        <FileText size={16} className="text-blue-600" />
                        <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest">Original Human Briefing</h3>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-1">
                          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Domain Sector</span>
                          <p className="text-xs font-bold text-slate-900 bg-slate-50 p-2.5 rounded-lg border border-slate-200/50 uppercase tracking-wide">
                            {getVal(selectedJob.blueprint?.productIdentity?.sector, selectedJob.ecosystem)}
                          </p>
                        </div>
                        <div className="space-y-1">
                          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Organization</span>
                          <p className="text-xs font-bold text-slate-900 bg-slate-50 p-2.5 rounded-lg border border-slate-200/50">
                            {getVal(selectedJob.blueprint?.productIdentity?.organization, 'Institutional Authority')}
                          </p>
                        </div>
                        <div className="space-y-1">
                          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Version Standard</span>
                          <p className="text-xs font-bold text-slate-900 bg-slate-50 p-2.5 rounded-lg border border-slate-200/50">
                            v{selectedJob.version || '1.0.0'}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Statement of Purpose</span>
                        <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3.5 rounded-lg border border-slate-200/50">
                          {getVal(selectedJob.blueprint?.productIdentity?.purpose, 'Establish a private national service platform aligned with security parameters.')}
                        </p>
                      </div>

                      <div className="space-y-2">
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block font-black">Target Operational Audience</span>
                        <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3.5 rounded-lg border border-slate-200/50">
                          {getVal(selectedJob.blueprint?.productIdentity?.targetUsers, 'National Institutional Workforce and Public Constituents.')}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Left: Security Isolation Mandates */}
                      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-3">
                        <h4 className="text-[10px] font-black uppercase text-slate-800 tracking-wider flex items-center gap-2 pb-2 border-b border-slate-100">
                          <ShieldCheck size={14} className="text-emerald-500" />
                          Sovereignty Controls
                        </h4>
                        <div className="space-y-2 text-xs">
                          <div className="flex justify-between items-center bg-slate-50 p-2.5 rounded-lg">
                            <span className="text-slate-500 font-medium">Data Residency</span>
                            <span className="font-bold text-slate-800">LOCAL_ONLY</span>
                          </div>
                          <div className="flex justify-between items-center bg-slate-50 p-2.5 rounded-lg">
                            <span className="text-slate-500 font-medium">Isolation Level</span>
                            <span className="font-bold text-slate-800">ENCLAVE_ISOLATED</span>
                          </div>
                          <div className="flex justify-between items-center bg-slate-50 p-2.5 rounded-lg">
                            <span className="text-slate-500 font-medium">Compliance Framework</span>
                            <span className="font-bold text-slate-800 text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-black border border-emerald-200">GDPR_Sovereign</span>
                          </div>
                        </div>
                      </div>

                      {/* Right: Technical Topology */}
                      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-3">
                        <h4 className="text-[10px] font-black uppercase text-slate-800 tracking-wider flex items-center gap-2 pb-2 border-b border-slate-100">
                          <Cpu size={14} className="text-blue-500" />
                          Platform Directives
                        </h4>
                        <div className="space-y-2 text-xs">
                          <div className="flex justify-between items-center bg-slate-50 p-2.5 rounded-lg">
                            <span className="text-slate-500 font-medium">Host Cluster Model</span>
                            <span className="font-bold text-slate-800">Modular Monolith</span>
                          </div>
                          <div className="flex justify-between items-center bg-slate-50 p-2.5 rounded-lg">
                            <span className="text-slate-500 font-medium">Primary DB Engine</span>
                            <span className="font-bold text-slate-800">PostgreSQL (Drizzle)</span>
                          </div>
                          <div className="flex justify-between items-center bg-slate-50 p-2.5 rounded-lg">
                            <span className="text-slate-500 font-medium">API Gateway Standard</span>
                            <span className="font-bold text-slate-800">TLS 1.3 / JWT Token</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 2. AI-Generated Specification Objects Tab */}
                {activeTab === 'specification' && (
                  <div className="space-y-6 max-w-5xl">
                    <div className="bg-blue-900 text-white p-5 rounded-xl border border-blue-800 flex items-center justify-between shadow-xs">
                      <div className="space-y-1">
                        <h3 className="text-xs font-black uppercase tracking-wider text-blue-200">Implementation-Grade Digital Contract</h3>
                        <p className="text-[11px] text-white">Interactive inspection of synthesized specifications containing detailed Traceable Lineage.</p>
                      </div>
                      <span className="text-[10px] font-black bg-blue-950 text-blue-300 border border-blue-800 px-3 py-1 rounded-lg">
                        Total Traceable Fields: 31 sections
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                      {/* Left Sidebar: Contract Sections */}
                      <div className="md:col-span-4 bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs flex flex-col divide-y divide-slate-100">
                        <div className="p-3 bg-slate-50 text-[10px] font-black uppercase tracking-widest text-slate-400">
                          Contract Sections
                        </div>
                        {[
                          { id: 'classification', label: '01. Classification', icon: Tag },
                          { id: 'identity', label: '02. Identity Specifications', icon: ShieldCheck },
                          { id: 'business', label: '03. Business Operations', icon: Activity },
                          { id: 'domain', label: '04. Domain Standards', icon: Globe },
                          { id: 'functional', label: '05. Functional Architecture', icon: Layers },
                          { id: 'experience', label: '06. Digital Experience', icon: Layout },
                          { id: 'ai', label: '07. AI Guardrails', icon: Cpu },
                          { id: 'localization', label: '08. Localization Standard', icon: Settings },
                          { id: 'security', label: '09. Security & Access', icon: ShieldAlert },
                          { id: 'financial', label: '10. Financial Operations', icon: Database }
                        ].map((sect) => (
                          <button
                            key={sect.id}
                            onClick={() => setExpandedSpecSection(sect.id)}
                            className={`w-full text-left p-3.5 text-xs font-bold flex items-center justify-between transition-all cursor-pointer ${
                              expandedSpecSection === sect.id 
                                ? 'bg-blue-50/50 text-blue-700' 
                                : 'bg-white text-slate-600 hover:bg-slate-50/50 hover:text-slate-800'
                            }`}
                          >
                            <span>{sect.label}</span>
                            <ChevronRight size={14} className={expandedSpecSection === sect.id ? 'text-blue-600' : 'text-slate-400'} />
                          </button>
                        ))}
                      </div>

                      {/* Right Panel: Section Details with Lineage */}
                      <div className="md:col-span-8 bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-4">
                        <h4 className="text-xs font-black uppercase text-slate-800 tracking-wider pb-2 border-b border-slate-100">
                          {expandedSpecSection.toUpperCase()} Traceability Matrix
                        </h4>

                        {!specContract ? (
                          <div className="p-8 text-center bg-slate-50 rounded-xl border border-dashed border-slate-200">
                            <Code className="mx-auto text-slate-400 mb-2" size={24} />
                            <p className="text-xs font-bold text-slate-900">No Custom Contract Compiled</p>
                            <p className="text-[10px] text-slate-500 mt-1">Select a valid job from the queue to load the compiled specifications.</p>
                          </div>
                        ) : (
                          <div className="space-y-4">
                            {/* Classification */}
                            {expandedSpecSection === 'classification' && (
                              <div className="space-y-4">
                                <div className="space-y-1">
                                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Product Ecosystem Model</label>
                                  {renderTraceable(specContract.classification?.ecosystem)}
                                </div>
                                <div className="space-y-1">
                                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Target Service Domain</label>
                                  {renderTraceable(specContract.classification?.domain)}
                                </div>
                                <div className="space-y-1">
                                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Geographic Operating Scope</label>
                                  {renderTraceable(specContract.classification?.scope)}
                                </div>
                              </div>
                            )}

                            {/* Identity */}
                            {expandedSpecSection === 'identity' && (
                              <div className="space-y-4">
                                <div className="space-y-1">
                                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Product System Name</label>
                                  {renderTraceable(specContract.identity?.productName)}
                                </div>
                                <div className="space-y-1">
                                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Tenant Authority Name</label>
                                  {renderTraceable(specContract.identity?.tenantName)}
                                </div>
                                <div className="space-y-1">
                                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Target Operating Jurisdictions</label>
                                  {renderTraceable(specContract.identity?.operatingJurisdictions)}
                                </div>
                                <div className="space-y-1">
                                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Sovereign Description</label>
                                  {renderTraceable(specContract.identity?.productDescription)}
                                </div>
                              </div>
                            )}

                            {/* Business */}
                            {expandedSpecSection === 'business' && (
                              <div className="space-y-4">
                                <div className="space-y-1">
                                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Operating Tenancy Model</label>
                                  {renderTraceable(specContract.businessSpecification?.tenancyModel)}
                                </div>
                                <div className="space-y-1">
                                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Administrative Hierarchy Level</label>
                                  {renderTraceable(specContract.businessSpecification?.tenantHierarchy)}
                                </div>
                                <div className="space-y-1">
                                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Assigned Business Processes</label>
                                  {renderTraceable(specContract.businessSpecification?.businessProcesses)}
                                </div>
                                <div className="space-y-1">
                                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">User Count Allocation Threshold</label>
                                  {renderTraceable(specContract.businessSpecification?.capacity?.usersCount)}
                                </div>
                              </div>
                            )}

                            {/* Domain */}
                            {expandedSpecSection === 'domain' && (
                              <div className="space-y-4">
                                <div className="space-y-1">
                                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Assigned Service Sector</label>
                                  {renderTraceable(specContract.domainSpecification?.sector)}
                                </div>
                                <div className="space-y-1">
                                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Mapped Compliance Frameworks</label>
                                  {renderTraceable(specContract.domainSpecification?.complianceStandards)}
                                </div>
                                <div className="space-y-1">
                                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Standard Protocols & APIs</label>
                                  {renderTraceable(specContract.domainSpecification?.industryProtocols)}
                                </div>
                              </div>
                            )}

                            {/* Functional */}
                            {expandedSpecSection === 'functional' && (
                              <div className="space-y-4">
                                <div className="space-y-1">
                                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Activated Platform Portals</label>
                                  {renderTraceable(specContract.functionalSpecification?.portals)}
                                </div>
                                <div className="space-y-1">
                                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Standard Capabilities & Modules</label>
                                  {renderTraceable(specContract.functionalSpecification?.modules)}
                                </div>
                                <div className="space-y-1">
                                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Core Operations Workflows</label>
                                  {renderTraceable(specContract.functionalSpecification?.workflows)}
                                </div>
                              </div>
                            )}

                            {/* Experience */}
                            {expandedSpecSection === 'experience' && (
                              <div className="space-y-4">
                                <div className="space-y-1">
                                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Default Portal Theme</label>
                                  {renderTraceable(specContract.digitalExperience?.authenticatedExperience?.workspaceTheme)}
                                </div>
                                <div className="space-y-1">
                                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Dashboard Grid Layout</label>
                                  {renderTraceable(specContract.digitalExperience?.authenticatedExperience?.dashboardLayout)}
                                </div>
                                <div className="space-y-1">
                                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Interactive Font Archetype</label>
                                  {renderTraceable(specContract.digitalExperience?.designSystem?.typography)}
                                </div>
                              </div>
                            )}

                            {/* AI */}
                            {expandedSpecSection === 'ai' && (
                              <div className="space-y-4">
                                <div className="space-y-1">
                                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Cognitive Assistant Status</label>
                                  {renderTraceable(specContract.aiExperience?.publicAssistant?.enabled)}
                                </div>
                                <div className="space-y-1">
                                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Custom Assistant Persona</label>
                                  {renderTraceable(specContract.aiExperience?.authenticatedAssistant?.persona)}
                                </div>
                                <div className="space-y-1">
                                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">AI Operational Safety Guardrails</label>
                                  {renderTraceable(specContract.aiExperience?.safetyGuardrails)}
                                </div>
                              </div>
                            )}

                            {/* Localization */}
                            {expandedSpecSection === 'localization' && (
                              <div className="space-y-4">
                                <div className="space-y-1">
                                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Sovereign Default Language</label>
                                  {renderTraceable(specContract.localization?.defaultLanguage)}
                                </div>
                                <div className="space-y-1">
                                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Supported Language Matrices</label>
                                  {renderTraceable(specContract.localization?.supportedLanguages)}
                                </div>
                              </div>
                            )}

                            {/* Security */}
                            {expandedSpecSection === 'security' && (
                              <div className="space-y-4">
                                <div className="space-y-1">
                                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Core Authentication Model</label>
                                  {renderTraceable(specContract.securityExperience?.authenticationMethods)}
                                </div>
                                <div className="space-y-1">
                                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Multi-Factor Authentication (MFA)</label>
                                  {renderTraceable(specContract.securityExperience?.mfaRequired)}
                                </div>
                                <div className="space-y-1">
                                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Terms Acceptance Mandate</label>
                                  {renderTraceable(specContract.securityExperience?.termsAcceptanceRequired)}
                                </div>
                              </div>
                            )}

                            {/* Financial */}
                            {expandedSpecSection === 'financial' && (
                              <div className="space-y-4">
                                <div className="space-y-1">
                                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Sovereign Accounting Currency</label>
                                  {renderTraceable(specContract.financialSpecification?.currency)}
                                </div>
                                <div className="space-y-1">
                                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Standard Gateways Integration</label>
                                  {renderTraceable(specContract.financialSpecification?.paymentGateways)}
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* 3. 32-Stage History Tab */}
                {activeTab === 'history32' && (
                  <div className="space-y-6">
                    <div className="bg-slate-900 text-white p-5 rounded-xl border border-slate-800 flex items-center justify-between shadow-xs">
                      <div>
                        <h3 className="text-xs font-black uppercase tracking-wider text-slate-400">32-Stage Sovereign Assembly Line</h3>
                        <p className="text-[11px] text-slate-300">Detailed lineage audit of compiled files, cryptographic checksums, and verification metrics.</p>
                      </div>
                      <span className="text-[10px] font-bold bg-blue-900 text-blue-200 px-3 py-1 rounded-lg">
                        Sovereign Ledger Synced
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                      {/* Left: Interactive 32-Stage timeline map */}
                      <div className="md:col-span-7 bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col h-[480px]">
                        <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-3 block">Assembly Timeline</span>
                        
                        <div className="flex-1 overflow-y-auto pr-2 space-y-2.5 scrollbar-thin">
                          {MANUFACTURE_32_STAGES.map((step) => {
                            const isSelected = selectedStageNumber === step.stage;
                            const isCurrent = step.stage <= Math.floor(selectedJob.progress / 3) + 1;
                            const categoryColor = 
                              step.category === 'SPECIFICATION' ? 'text-blue-600 bg-blue-50' :
                              step.category === 'ARCHITECTURE' ? 'text-amber-600 bg-amber-50' :
                              step.category === 'ENGINEERING' ? 'text-purple-600 bg-purple-50' :
                              step.category === 'MANUFACTURE' ? 'text-emerald-600 bg-emerald-50' :
                              step.category === 'VERIFICATION' ? 'text-teal-600 bg-teal-50' :
                              'text-slate-600 bg-slate-50';

                            return (
                              <button
                                key={step.stage}
                                onClick={() => setSelectedStageNumber(step.stage)}
                                className={`w-full text-left p-3 rounded-xl border flex items-center justify-between transition-all cursor-pointer ${
                                  isSelected 
                                    ? 'bg-slate-900 border-slate-950 text-white shadow-md' 
                                    : 'bg-white border-slate-100 hover:border-slate-300 text-slate-800'
                                }`}
                              >
                                <div className="flex items-center gap-3 min-w-0">
                                  <div className={`w-6 h-6 rounded-md font-black text-xs flex items-center justify-center shrink-0 ${
                                    isSelected ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-600'
                                  }`}>
                                    {String(step.stage).padStart(2, '0')}
                                  </div>
                                  <div className="truncate">
                                    <h4 className="text-xs font-bold truncate leading-snug">{step.name}</h4>
                                    <p className={`text-[8px] font-black uppercase tracking-widest mt-0.5 inline-block px-1.5 py-0.2 rounded shrink-0 ${
                                      isSelected ? 'bg-slate-800 text-slate-300' : categoryColor
                                    }`}>
                                      {step.category}
                                    </p>
                                  </div>
                                </div>

                                <div className="flex items-center gap-2 shrink-0">
                                  {isCurrent ? (
                                    <span className="text-[9px] font-black text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded uppercase">Verified</span>
                                  ) : (
                                    <span className="text-[9px] font-black text-slate-400 bg-slate-100 px-2 py-0.5 rounded uppercase">Pending</span>
                                  )}
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Right: Stage Artifact & Code Preview */}
                      <div className="md:col-span-5 bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col h-[480px]">
                        {(() => {
                          const stageData = MANUFACTURE_32_STAGES.find(s => s.stage === selectedStageNumber);
                          if (!stageData) return null;

                          return (
                            <div className="h-full flex flex-col">
                              <div className="border-b border-slate-100 pb-3 mb-4 shrink-0">
                                <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Stage Artifact</span>
                                <h4 className="text-sm font-extrabold text-slate-900 mt-1">{stageData.name}</h4>
                                <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">{stageData.description}</p>
                              </div>

                              <div className="flex-1 overflow-hidden flex flex-col space-y-4">
                                <div className="grid grid-cols-2 gap-3 text-[10px] shrink-0 bg-slate-50 p-2.5 rounded-lg border border-slate-200/50">
                                  <div>
                                    <span className="text-slate-400 font-bold block uppercase tracking-wider">Operator ID</span>
                                    <span className="font-extrabold text-slate-800">{stageData.operator}</span>
                                  </div>
                                  <div>
                                    <span className="text-slate-400 font-bold block uppercase tracking-wider">Artifact Name</span>
                                    <span className="font-extrabold text-slate-800 text-[10px] font-mono select-all truncate block">{stageData.artifactName}</span>
                                  </div>
                                  <div className="col-span-2 pt-1 border-t border-slate-200/50">
                                    <span className="text-slate-400 font-bold block uppercase tracking-wider">Digest Checksum</span>
                                    <span className="font-mono text-slate-600 block select-all text-[9px] truncate">{stageData.checksum}</span>
                                  </div>
                                </div>

                                <div className="flex-1 bg-slate-950 rounded-xl p-4 font-mono text-[10px] text-slate-300 overflow-y-auto border border-slate-900 flex flex-col">
                                  <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-2">
                                    <span className="text-slate-500 text-[9px] font-bold tracking-widest uppercase">{stageData.artifactPreview.format} Source</span>
                                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                  </div>
                                  <pre className="flex-1 leading-relaxed select-all">
                                    {stageData.artifactPreview.lines.join('\n')}
                                  </pre>
                                </div>
                              </div>
                            </div>
                          );
                        })()}
                      </div>
                    </div>
                  </div>
                )}

                {/* 4. Product Preview Tab (Interactive Final Product Simulator) */}
                {activeTab === 'preview' && (
                  <div className="space-y-6">
                    <div className="bg-slate-900 text-white p-5 rounded-xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
                      <div>
                        <h3 className="text-xs font-black uppercase tracking-wider text-slate-400">Assembled Application Preview</h3>
                        <p className="text-[11px] text-slate-300">Live, sandboxed interactive preview rendering with variables compiled from the specifications.</p>
                      </div>

                      <div className="flex items-center gap-2">
                        {/* Device selector */}
                        <div className="flex items-center bg-slate-850 p-1 rounded-lg border border-slate-800">
                          <button
                            onClick={() => setPreviewDevice('desktop')}
                            className={`p-1.5 rounded-md ${previewDevice === 'desktop' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'}`}
                          >
                            <Monitor size={14} />
                          </button>
                          <button
                            onClick={() => setPreviewDevice('mobile')}
                            className={`p-1.5 rounded-md ${previewDevice === 'mobile' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'}`}
                          >
                            <Smartphone size={14} />
                          </button>
                        </div>

                        {/* Interactive Section Toggles */}
                        <div className="flex items-center bg-slate-850 p-1 rounded-lg border border-slate-800">
                          <button 
                            onClick={() => { setActivePreviewTab('landing'); setMockSelectedService(null); }}
                            className={`px-3 py-1 rounded-md text-[10px] font-black uppercase ${activePreviewTab === 'landing' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'}`}
                          >
                            Landing Page
                          </button>
                          <button 
                            onClick={() => { setActivePreviewTab('catalog'); setMockSelectedService(null); }}
                            className={`px-3 py-1 rounded-md text-[10px] font-black uppercase ${activePreviewTab === 'catalog' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'}`}
                          >
                            Service Catalog
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Frame container */}
                    <div className="flex justify-center bg-slate-100 p-8 rounded-2xl border border-slate-200">
                      <div className={`bg-white shadow-2xl transition-all duration-300 border border-slate-200/80 overflow-hidden flex flex-col ${
                        previewDevice === 'mobile' 
                          ? 'w-[375px] h-[640px] rounded-[36px] border-8 border-slate-900' 
                          : 'w-full max-w-5xl h-[560px] rounded-xl'
                      }`} style={{ borderRadius: previewDevice === 'mobile' ? undefined : getDesignRadius() }}>
                        
                        {/* App Mock Top Header bar */}
                        <header className="bg-slate-900 text-white px-4 py-3 shrink-0 flex items-center justify-between border-b border-slate-800">
                          <div className="flex items-center gap-2">
                            <div className="w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-black text-white" style={{ backgroundColor: getPrimaryColor() }}>
                              S
                            </div>
                            <span className="text-[11px] font-black uppercase tracking-wider truncate max-w-[140px]">
                              {getVal(specContract?.identity?.productName, 'Sovereign Portal')}
                            </span>
                          </div>

                          <div className="flex items-center gap-4 text-[10px] text-slate-400 font-bold">
                            <span className="hover:text-white transition-all cursor-pointer">Support</span>
                            <span className="hover:text-white transition-all cursor-pointer bg-slate-800 px-2 py-0.5 rounded border border-slate-700/50">OIDC Auth</span>
                          </div>
                        </header>

                        {/* App Content simulator */}
                        <div className="flex-1 overflow-y-auto bg-slate-50 relative flex flex-col">
                          
                          {/* Chatbot trigger button */}
                          <button 
                            onClick={() => setChatbotOpen(!chatbotOpen)}
                            className="fixed bottom-4 right-4 sm:absolute z-20 w-10 h-10 rounded-full text-white shadow-lg flex items-center justify-center hover:scale-105 transition-all cursor-pointer"
                            style={{ backgroundColor: getPrimaryColor() }}
                          >
                            <MessageSquare size={18} />
                          </button>

                          {/* Chatbot box overlay */}
                          {chatbotOpen && (
                            <div className="absolute bottom-16 right-4 z-35 w-80 bg-white border border-slate-200 rounded-2xl shadow-2xl flex flex-col overflow-hidden max-h-[340px]">
                              <div className="p-3 text-white flex items-center justify-between shrink-0" style={{ backgroundColor: getPrimaryColor() }}>
                                <div className="flex items-center gap-2">
                                  <Cpu size={14} />
                                  <span className="text-[10px] font-black uppercase tracking-wider">
                                    {getVal(specContract?.aiExperience?.publicAssistant?.assistantName, 'Sovereign Assistant')}
                                  </span>
                                </div>
                                <button onClick={() => setChatbotOpen(false)} className="text-white hover:text-slate-200">
                                  <XCircle size={14} />
                                </button>
                              </div>

                              <div className="flex-1 overflow-y-auto p-3 space-y-2 text-[10px] leading-relaxed max-h-[220px]">
                                {chatMessages.map((msg, i) => (
                                  <div key={i} className={`p-2.5 rounded-xl max-w-[85%] ${
                                    msg.sender === 'user' 
                                      ? 'bg-slate-100 text-slate-800 ml-auto font-medium' 
                                      : 'bg-blue-50 text-blue-900 border border-blue-100'
                                  }`}>
                                    {msg.text}
                                  </div>
                                ))}
                              </div>

                              <form onSubmit={handleSendChat} className="p-2 border-t border-slate-100 flex gap-1.5 shrink-0">
                                <input 
                                  type="text" 
                                  value={chatInput}
                                  onChange={(e) => setChatInput(e.target.value)}
                                  placeholder="Ask about data rules..." 
                                  className="flex-1 border border-slate-200 px-2.5 py-1.5 rounded-lg text-[10px] outline-none"
                                />
                                <button 
                                  type="submit" 
                                  className="text-white px-3 py-1.5 rounded-lg text-[10px] font-bold hover:opacity-90 transition-all cursor-pointer"
                                  style={{ backgroundColor: getPrimaryColor() }}
                                >
                                  Send
                                </button>
                              </form>
                            </div>
                          )}

                          {/* LANDING PAGE SIMULATION */}
                          {activePreviewTab === 'landing' && (
                            <div className="flex-1 flex flex-col justify-between">
                              <div className="px-6 py-12 text-center space-y-4 max-w-lg mx-auto">
                                <span className="text-[9px] font-black uppercase tracking-widest bg-blue-50 border border-blue-100 px-2.5 py-0.5 rounded text-blue-700">
                                  Sovereign Secure Corridor
                                </span>
                                <h1 className="text-xl md:text-2xl font-black text-slate-900 leading-tight">
                                  {getVal(specContract?.digitalExperience?.publicExperience?.landingPage?.heroTitle, 'Welcome to Jumo Sovereign Portal')}
                                </h1>
                                <p className="text-xs text-slate-500 leading-relaxed">
                                  {getVal(specContract?.digitalExperience?.publicExperience?.landingPage?.heroSubtitle, 'Providing transparent, secure, and compliant public digital infrastructures.')}
                                </p>
                                
                                <div className="pt-2">
                                  <button 
                                    onClick={() => setActivePreviewTab('catalog')}
                                    className="text-white px-6 py-2 rounded-xl text-xs font-bold shadow-md hover:opacity-90 transition-all cursor-pointer"
                                    style={{ backgroundColor: getPrimaryColor(), borderRadius: getDesignRadius() }}
                                  >
                                    {getVal(specContract?.digitalExperience?.publicExperience?.landingPage?.primaryCTA, 'Explore Catalog')}
                                  </button>
                                </div>
                              </div>

                              <div className="p-6 bg-slate-100 border-t border-slate-200/50 text-center text-[10px] text-slate-400 font-bold uppercase tracking-wider shrink-0">
                                Authorized by {getVal(specContract?.identity?.tenantName, 'Institutional Authority')} • Local Storage Assured
                              </div>
                            </div>
                          )}

                          {/* SERVICE CATALOG SIMULATION */}
                          {activePreviewTab === 'catalog' && (
                            <div className="p-6 space-y-4 flex-1">
                              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                                <div>
                                  <h2 className="text-sm font-black text-slate-900 uppercase tracking-wide">Public Service Catalogue</h2>
                                  <p className="text-[10px] text-slate-400">Discover and query active compliance verified service endpoints.</p>
                                </div>
                                <span className="text-[10px] font-black bg-blue-50 text-blue-700 px-2.5 py-0.5 rounded border border-blue-100 uppercase">
                                  {getVal(specContract?.domainSpecification?.sector, 'GENERAL')}
                                </span>
                              </div>

                              {mockSelectedService ? (
                                <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-4 shadow-sm animate-fadeIn">
                                  <button 
                                    onClick={() => setMockSelectedService(null)}
                                    className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-slate-800 transition-all flex items-center gap-1 cursor-pointer"
                                  >
                                    ← Back to catalog
                                  </button>
                                  <div>
                                    <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">{mockSelectedService} Service</h3>
                                    <p className="text-[10px] text-slate-500 mt-0.5">Sovereign compliance protocol verification completed under Ledger Hash verify_ok.</p>
                                  </div>
                                  <div className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-200/50">
                                    <div className="space-y-1">
                                      <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block">Submit Intake Form</label>
                                      <input 
                                        type="text" 
                                        placeholder="Enter authorized credential code..." 
                                        className="w-full bg-white border border-slate-200 px-3 py-2 rounded-xl text-[10px] outline-none"
                                      />
                                    </div>
                                    <button 
                                      type="button" 
                                      onClick={() => alert('Sovereign Sandbox Mode: No actions are executed in reviewer preview.')}
                                      className="text-white px-5 py-2 rounded-xl text-[10px] font-bold hover:opacity-95 transition-all cursor-pointer"
                                      style={{ backgroundColor: getPrimaryColor(), borderRadius: getDesignRadius() }}
                                    >
                                      Execute Action
                                    </button>
                                  </div>
                                </div>
                              ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  {[
                                    { title: 'Standard Intake Registry', desc: 'Secure repository for official digital intakes and resident submissions.' },
                                    { title: 'Interactive Inquiry Hub', desc: 'Submit and resolve administrative questions through end-to-end telemetry.' },
                                    { title: 'Public Resource Map', desc: 'Sovereign location catalog referencing local facilities and municipal services.' },
                                    { title: 'Compliance Report Ledger', desc: 'Immutable index of public safety audits and infrastructure metrics.' }
                                  ].map((srv, idx) => (
                                    <button
                                      key={idx}
                                      onClick={() => setMockSelectedService(srv.title)}
                                      className="text-left bg-white border border-slate-200 p-4 rounded-xl hover:border-slate-300 transition-all shadow-xs space-y-2 cursor-pointer"
                                      style={{ borderRadius: getDesignRadius() }}
                                    >
                                      <h4 className="text-xs font-bold text-slate-900 flex items-center justify-between">
                                        <span>{srv.title}</span>
                                        <ArrowRight size={12} className="text-slate-400" />
                                      </h4>
                                      <p className="text-[10px] text-slate-500 leading-relaxed">{srv.desc}</p>
                                    </button>
                                  ))}
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Action and Human Review Bar */}
              <div className="p-4 border-t border-slate-200 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-2.5 text-xs text-slate-500 font-semibold">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>32-Stage Build Verified</span>
                </div>

                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => setIsRejecting(true)}
                    className="px-5 py-2.5 rounded-xl border border-rose-200 text-rose-600 text-xs font-bold hover:bg-rose-50 transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <XCircle size={14} />
                    Reject Job Build
                  </button>
                  <button 
                    onClick={handleApprove}
                    className="px-7 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold shadow-lg hover:bg-slate-800 transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <CheckCircle2 size={14} />
                    Verify & Release
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-12 text-center space-y-4 opacity-40 my-auto">
              <div className="w-20 h-20 bg-slate-100 rounded-3xl flex items-center justify-center text-slate-300">
                <ShieldCheck size={40} />
              </div>
              <div className="max-w-xs">
                <h3 className="text-sm font-extrabold text-slate-950">Select Job for Inspection</h3>
                <p className="text-xs text-slate-500 mt-1">Select an active manufacturing job from the left queue queue to inspect specifications, lineage, and preview the sandboxed app.</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Rejection Workflow Overlay Dialog */}
      <AnimatePresence>
        {isRejecting && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-xs">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-md overflow-hidden"
            >
              <div className="p-5 bg-rose-50 border-b border-rose-100 flex items-center gap-3">
                <div className="w-9 h-9 bg-white rounded-xl flex items-center justify-center text-rose-600 shadow-sm border border-rose-100">
                  <AlertTriangle size={18} />
                </div>
                <div>
                  <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-wide">Sovereign Rejection Workflow</h3>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Mandatory Feedback Loop Required</p>
                </div>
              </div>
              <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[9px] font-black uppercase text-slate-700 tracking-wider">Affected Stage</label>
                    <select 
                      value={affectedStage}
                      onChange={(e) => setAffectedStage(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-[11px] outline-none"
                    >
                      <option>01_SPECIFICATION</option>
                      <option>02_ARCHITECTURE</option>
                      <option>03_ENGINEERING</option>
                      <option>04_MANUFACTURING</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-black uppercase text-slate-700 tracking-wider">Severity Level</label>
                    <select 
                      value={severityLevel}
                      onChange={(e) => setSeverityLevel(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-[11px] outline-none"
                    >
                      <option>MINOR</option>
                      <option>MODERATE</option>
                      <option>CRITICAL</option>
                      <option>BLOCKING</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] font-black uppercase text-slate-700 tracking-wider">Affected Requirement / Component</label>
                  <input 
                    type="text"
                    value={affectedRequirement}
                    onChange={(e) => setAffectedRequirement(e.target.value)}
                    placeholder="e.g. REQ-001 Sovereign Isolation"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-[11px] outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] font-black uppercase text-slate-700 tracking-wider">Detailed Rejection Reason</label>
                  <textarea 
                    rows={3}
                    value={rejectionFeedback}
                    onChange={(e) => setRejectionFeedback(e.target.value)}
                    placeholder="Describe the structural or policy violation..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-[11px] outline-none resize-none transition-all"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] font-black uppercase text-slate-700 tracking-wider">Requested Correction</label>
                  <textarea 
                    rows={2}
                    value={requestedCorrection}
                    onChange={(e) => setRequestedCorrection(e.target.value)}
                    placeholder="Describe exact corrections required to pass."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-[11px] outline-none resize-none transition-all"
                  />
                </div>

                <div className="pt-2 flex items-center gap-4">
                  <button 
                    onClick={() => {
                      setIsRejecting(false);
                      setRejectionFeedback('');
                      setRequestedCorrection('');
                    }}
                    className="flex-1 py-2 rounded-xl border border-slate-200 text-slate-500 text-xs font-bold hover:bg-slate-50 transition-all cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handleReject}
                    disabled={!rejectionFeedback}
                    className="flex-1 py-2 rounded-xl bg-rose-600 text-white text-xs font-bold shadow-lg hover:bg-rose-700 transition-all disabled:opacity-40 cursor-pointer"
                  >
                    Confirm Rejection
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Inline fallback lucide components just in case they aren't exported
function Tag(props: any) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z"/>
      <path d="M6 6h.01"/>
    </svg>
  );
}
