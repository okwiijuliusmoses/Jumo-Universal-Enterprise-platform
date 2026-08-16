import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  FileText, Landmark, Building2, Laptop, Check, AlertTriangle, 
  Layers, Zap, Cpu, Bot, CheckCircle2, ArrowRight, X, ChevronLeft, ChevronRight,
  Database, Shield, Globe, Terminal, Activity, GitBranch, History, Search, Settings, Sparkles, Server, Users, ShoppingBag, Code,
  Eye, Download, Sliders, CheckSquare
} from 'lucide-react';
import { JumoEventBus } from '../../../core/common/events/JumoEventBus';
import { ProductManufacturingOrchestrator } from '../../../core/factory/ProductManufacturingOrchestrator';
import { ImplementationGradeSpecificationContract, ProductClassification } from '../../../types/specification';
import { JumoFloatingAssistant } from '../../shell/JumoFloatingAssistant';
import { StudioLifecycleNavBar } from '../../components/StudioLifecycleNavBar';
import { SpecificationApprovalPanel } from '../components/SpecificationApprovalPanel';
import { JumoDomainOptionRegistry } from '../../../core/specification/JumoDomainOptionRegistry';
import { JumoProductTaxonomyRegistry, ProductEcosystemId } from '../../../core/specification/JumoProductTaxonomyRegistry';

// Authoritative Schema for Products with 31 Core Dimensions
const SPECIFICATION_SCHEMA = {
  sections: [
    {
      id: 'classification',
      title: '01. Ecosystem & Domain Classification',
      description: 'Select the sovereign Product Ecosystem and its authoritative domain taxonomy.',
      questions: [
        { id: 'ecosystem', label: 'Top-Level Product Ecosystem', type: 'ecosystem_selector', required: true },
        { id: 'domain', label: 'Primary Domain / Sector', type: 'domain_selector', required: true },
        { id: 'secondaryDomains', label: 'Secondary Domains (Cross-Domain)', type: 'list' },
        { id: 'scope', label: 'Ecosystem Scope', type: 'select', options: ['REGIONAL', 'NATIONAL', 'SOVEREIGN_CRITICAL'], required: true }
      ]
    },
    {
      id: 'identity',
      title: '02. Product Identity',
      description: 'Authoritative identification of the manufactured workspace asset.',
      questions: [
        { id: 'productName', label: 'Public-Facing Product Name', type: 'text', placeholder: 'e.g. Wiggins Secondary School Management ERP', required: true },
        { id: 'tenantName', label: 'Tenant / Organization Name', type: 'text', placeholder: 'e.g. Wiggins Secondary School', required: true },
        { id: 'productClass', label: 'Product Family / Class', type: 'text', defaultValue: 'Enterprise Resource Planning' },
        { id: 'productVersion', label: 'Initial Version', type: 'text', defaultValue: '1.0.0', required: true },
        { id: 'productPurpose', label: 'Purpose & Sovereign Vision', type: 'textarea', placeholder: 'Describe the sovereign value proposition...', required: true },
        { id: 'targetAudience', label: 'Target Audience', type: 'text', placeholder: 'e.g. National Citizens & Clinicians' },
        { id: 'geographicScope', label: 'Geographic Scope', type: 'text', placeholder: 'e.g. Sovereign National Territory' }
      ]
    },
    {
      id: 'business',
      title: '03. Business Specification',
      description: 'Structural hierarchy and capacity targets mapped into the system database.',
      questions: [
        { id: 'tenancyModel', label: 'Tenancy Model', type: 'guided_tenancy', required: true },
        { id: 'tenantHierarchy', label: 'Tenant Hierarchy Logic', type: 'text', placeholder: 'e.g. Headquarters -> Region -> District Unit' },
        { id: 'businessProcesses', label: 'Standard Business Processes', type: 'list', domainCategory: 'WORKFLOWS' },
        { id: 'capacity', label: 'Capacity Profile', type: 'guided_capacity', required: true }
      ]
    },
    {
      id: 'domain_spec',
      title: '04. Domain Specification',
      description: 'Sector-specific requirements and compliance protocols.',
      questions: [
        { id: 'sector', label: 'Sector Focus', type: 'text' },
        { id: 'domainRequirements', label: 'Domain Specific Requirements', type: 'list' },
        { id: 'complianceStandards', label: 'Target Regulatory Frameworks', type: 'list', domainCategory: 'COMPLIANCE' }
      ]
    },
    {
      id: 'functional',
      title: '05. Functional Specification',
      description: 'Domain-specific capabilities, portals and modules that this system must deliver.',
      questions: [
        { id: 'portals', label: 'Role-Based Portals', type: 'list', domainCategory: 'PORTALS' },
        { id: 'modules', label: 'Core Functional Modules', type: 'list', domainCategory: 'MODULES' },
        { id: 'automationLevel', label: 'Target Automation Level', type: 'select', options: ['MANUAL_ASSISTED', 'SEMI_AUTONOMOUS', 'FULLY_AUTONOMOUS'] }
      ]
    },
    {
      id: 'digital_experience',
      title: '06. Digital Experience Specification',
      description: 'Define the intended public and authenticated product experience dimensions.',
      questions: [
        { id: 'publicExperienceEnabled', label: 'Enable Public Experience', type: 'boolean', defaultValue: true },
        { id: 'heroTitle', label: 'Landing Hero Title', type: 'text' },
        { id: 'heroSubtitle', label: 'Landing Hero Subtitle', type: 'text' },
        { id: 'dashboardLayout', label: 'Workspace Dashboard Layout', type: 'select', options: ['GRID', 'WIDGETS', 'LIST'], defaultValue: 'GRID' },
        { id: 'navigationModel', label: 'Navigation Model', type: 'select', options: ['SIDEBAR', 'TOPBAR', 'HYBRID'], defaultValue: 'SIDEBAR' },
        { id: 'designDensity', label: 'Design System Density', type: 'select', options: ['COMPACT', 'STANDARD', 'SPACIOUS'], defaultValue: 'STANDARD' }
      ]
    },
    {
      id: 'ai_experience',
      title: '07. AI Experience Specification',
      description: 'Configure public and authenticated AI assistant boundaries.',
      questions: [
        { id: 'publicAssistantEnabled', label: 'Enable Public JUMO Assistant', type: 'boolean', defaultValue: true },
        { id: 'assistantName', label: 'Assistant Persona Name', type: 'text', defaultValue: 'Sovereign Guide' },
        { id: 'aiCapabilities', label: 'AI Cognitive Capabilities', type: 'list', domainCategory: 'AI_CAPABILITIES' }
      ]
    },
    {
      id: 'localization',
      title: '08. Localization Specification',
      description: 'Authoritative regionalization and language mandates.',
      questions: [
        { id: 'defaultLanguage', label: 'Default Language', type: 'text', defaultValue: 'English' },
        { id: 'supportedLanguages', label: 'Supported Languages', type: 'list' },
        { id: 'timezone', label: 'Primary Timezone', type: 'text' },
        { id: 'rtlSupport', label: 'RTL (Right-to-Left) Support', type: 'boolean', defaultValue: false }
      ]
    },
    {
      id: 'accessibility',
      title: '09. Accessibility Specification',
      description: 'Accessibility mandates and verification targets.',
      questions: [
        { id: 'targetStandard', label: 'Accessibility Standard Target', type: 'select', options: ['WCAG_AA', 'WCAG_AAA'], defaultValue: 'WCAG_AA' },
        { id: 'screenReaderSupport', label: 'Full Screen Reader Support', type: 'boolean', defaultValue: true }
      ]
    },
    {
      id: 'security_experience',
      title: '10. Security & Identity Experience',
      description: 'User-facing security, privacy controls, and identity verification.',
      questions: [
        { id: 'mfaRequired', label: 'Mandatory MFA (Multi-Factor)', type: 'boolean', defaultValue: true },
        { id: 'identityVerificationRequired', label: 'Digital Identity Verification (KYC)', type: 'boolean', defaultValue: false },
        { id: 'privacyControlsEnabled', label: 'User Privacy Control Center', type: 'boolean', defaultValue: true }
      ]
    },
    {
      id: 'communication_device',
      title: '11. Communication & Device Strategy',
      description: 'Define how the product communicates and which devices it targets.',
      questions: [
        { id: 'channels', label: 'Notification Channels', type: 'list', options: ['IN_APP', 'EMAIL', 'SMS', 'PUSH'] },
        { id: 'targets', label: 'Target Device Experiences', type: 'list', options: ['DESKTOP', 'TABLET', 'MOBILE', 'PWA'] }
      ]
    },
    {
      id: 'data_spec',
      title: '12. Data Specification',
      description: 'Data classification, residency and retention mandates.',
      questions: [
        { id: 'entities', label: 'Core Data Entities', type: 'list' },
        { id: 'classification', label: 'Data Sensitivity Level', type: 'select', options: ['PUBLIC', 'INTERNAL', 'RESTRICTED', 'SOVEREIGN_CONFIDENTIAL'] },
        { id: 'residency', label: 'Data Residency Requirement', type: 'text' }
      ]
    },
    {
      id: 'integrations',
      title: '13. Integration Specification',
      description: 'Authoritative integration points with external systems.',
      questions: [
        { id: 'externalSystems', label: 'Integration Targets', type: 'list', domainCategory: 'INTEGRATIONS' },
        { id: 'apiProtocols', label: 'Supported Protocols', type: 'list', options: ['REST', 'GRAPHQL', 'GRPC', 'SOAP'] }
      ]
    },
    {
      id: 'financial',
      title: '14. Financial & Transaction Specification',
      description: 'Accounting models, currencies and payment rules.',
      questions: [
        { id: 'currency', label: 'Primary Currency', type: 'text', defaultValue: 'USD' },
        { id: 'accountingBasis', label: 'Accounting Basis', type: 'select', options: ['ACCRUAL', 'CASH', 'MODIFIED_ACCRUAL'] }
      ]
    },
    {
      id: 'workflow',
      title: '15. Workflow & Automation Specification',
      description: 'State machines, approval chains and triggers.',
      questions: [
        { id: 'workflows', label: 'Critical Path Workflows', type: 'list', domainCategory: 'WORKFLOWS' },
        { id: 'automationTriggers', label: 'Event-Driven Triggers', type: 'list' }
      ]
    },
    {
      id: 'analytics',
      title: '16. Reporting & Analytics Specification',
      description: 'KPIs, standard reports and dashboard metrics.',
      questions: [
        { id: 'reports', label: 'Standard Operational Reports', type: 'list', domainCategory: 'REPORTS' },
        { id: 'kpis', label: 'Core Dashboard KPIs', type: 'list' }
      ]
    },
    {
      id: 'content',
      title: '17. Content & Knowledge Specification',
      description: 'Knowledge bases, documentation and RAG sources.',
      questions: [
        { id: 'knowledgeBases', label: 'Primary Knowledge Domains', type: 'list' },
        { id: 'documentTypes', label: 'Managed Document Types', type: 'list' }
      ]
    },
    {
      id: 'engagement',
      title: '18. Advertising & Engagement Specification',
      description: 'Campaign models and user engagement strategy.',
      questions: [
        { id: 'advertisingEnabled', label: 'Enable Advertising Hub', type: 'boolean', defaultValue: false },
        { id: 'campaignTypes', label: 'Supported Campaign Types', type: 'list' }
      ]
    },
    {
      id: 'search',
      title: '19. Search & Discovery Specification',
      description: 'Global search scopes and indexing mandates.',
      questions: [
        { id: 'searchScopes', label: 'Search Index Scopes', type: 'list' },
        { id: 'aiSearchEnabled', label: 'Enable AI-Powered Semantic Search', type: 'boolean', defaultValue: true }
      ]
    },
    {
      id: 'support',
      title: '20. Support & Help Specification',
      description: 'Help center configuration and support SLAs.',
      questions: [
        { id: 'helpPortalEnabled', label: 'Enable Integrated Help Center', type: 'boolean', defaultValue: true },
        { id: 'slaLevels', label: 'Support Response SLAs', type: 'list' }
      ]
    },
    {
      id: 'compliance',
      title: '21. Compliance & Governance Specification',
      description: 'Regulatory alignment and audit trail mandates.',
      questions: [
        { id: 'regulatoryFrameworks', label: 'Regulatory Framework Alignment', type: 'list', domainCategory: 'COMPLIANCE' },
        { id: 'auditTrailEnabled', label: 'Enable Full Immutable Audit Trail', type: 'boolean', defaultValue: true }
      ]
    },
    {
      id: 'deployment',
      title: '22. Deployment & Installation Specification',
      description: 'Infrastructure targets and regional availability.',
      questions: [
        { id: 'deploymentType', label: 'Infrastructure Strategy', type: 'select', options: ['CLOUD', 'ON_PREMISE', 'HYBRID'] },
        { id: 'availabilityTarget', label: 'Availability Target (SLA %)', type: 'number', defaultValue: 99.9 }
      ]
    },
    {
      id: 'verification',
      title: '23. Verification Specification',
      description: 'Quality assurance and acceptance criteria.',
      questions: [
        { id: 'acceptanceCriteria', label: 'Core Acceptance Criteria', type: 'list' },
        { id: 'automatedTestsRequired', label: 'Mandatory Automated Test Coverage', type: 'boolean', defaultValue: true }
      ]
    },
    {
      id: 'manufacturing_spec',
      title: '24. Manufacturing Specification',
      description: 'Factory profile and manufacturing priority.',
      questions: [
        { id: 'priority', label: 'Manufacturing Priority', type: 'select', options: ['NORMAL', 'HIGH', 'CRITICAL'] },
        { id: 'requiredStudios', label: 'Required Specialist Studios', type: 'list' }
      ]
    },
    {
      id: 'certification',
      title: '25. Release & Certification Specification',
      description: 'Release gates and quality sign-off mandates.',
      questions: [
        { id: 'releaseGates', label: 'Mandatory Release Gates', type: 'list' },
        { id: 'humanSignOffRequired', label: 'Human Engineering Sign-Off Required', type: 'boolean', defaultValue: true }
      ]
    },
    {
      id: 'evolution',
      title: '26. Evolution & Upgrade Specification',
      description: 'Upgrade policy and feature evolution roadmap.',
      questions: [
        { id: 'upgradePolicy', label: 'Platform Upgrade Policy', type: 'select', options: ['AUTOMATIC', 'SCHEDULED', 'MANUAL_DEFERRED'] }
      ]
    },
    {
      id: 'human_governance',
      title: '27. HUMAN GOVERNANCE SPECIFICATION',
      description: 'Approval gates and manual verification mandates.',
      questions: [
        { id: 'mandatoryApprovalGates', label: 'Mandatory Approval Gates', type: 'list' },
        { id: 'gatekeepers', label: 'Authorized Gatekeeper Roles', type: 'list' }
      ]
    },
    {
      id: 'priorities',
      title: '28. REQUIREMENT PRIORITY & CONSTRAINTS',
      description: 'Identify critical requirements and hard technical constraints.',
      questions: [
        { id: 'criticalRequirements', label: 'Critical "Must-Have" Requirements', type: 'list' },
        { id: 'technicalConstraints', label: 'Hard Technical Constraints', type: 'list' }
      ]
    },
    {
      id: 'traceability_spec',
      title: '29. REQUIREMENT TRACEABILITY',
      description: 'Traceability mandates for audit and verification.',
      questions: [
        { id: 'mappingRequirement', label: 'Traceability Mapping Requirement', type: 'select', options: ['STANDARD', 'DEEP', 'CRITICAL_ONLY'] }
      ]
    },
    {
      id: 'final_review',
      title: '30. Digital Product Contract Summary',
      description: 'Authoritative review of the assembled Digital Product Experience Specification.',
      questions: []
    }
  ]
};

export function SpecificationStudio() {
  const [activeTab, setActiveTab] = useState('classification');
  const [contractData, setContractData] = useState<any>(() => {
    const saved = localStorage.getItem('jumo_specification_draft');
    return saved ? JSON.parse(saved) : { 
      classification: { 
        ecosystem: 'ERP_ECOSYSTEM', 
        domain: 'EDUCATION' 
      } 
    };
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedJobId, setSubmittedJobId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'designer' | 'assistant'>('designer');

  const orchestrator = useMemo(() => ProductManufacturingOrchestrator.getInstance(), []);

  useEffect(() => {
    localStorage.setItem('jumo_specification_draft', JSON.stringify(contractData));
  }, [contractData]);

  const activeEcosystemId: ProductEcosystemId = contractData.classification?.ecosystem || 'ERP_ECOSYSTEM';
  const activeDomainId: string = contractData.classification?.domain || 'EDUCATION';

  const availableDomainsForEcosystem = useMemo(() => {
    return JumoDomainOptionRegistry.getAvailableDomains(activeEcosystemId);
  }, [activeEcosystemId]);

  // Derived metrics
  const completeness = useMemo(() => {
    let filledCount = 0;
    let totalQuestions = 0;
    SPECIFICATION_SCHEMA.sections.forEach(section => {
      section.questions.forEach(q => {
        totalQuestions++;
        const val = contractData[section.id]?.[q.id];
        if (val !== undefined && val !== '' && (Array.isArray(val) ? val.length > 0 : true)) {
          filledCount++;
        }
      });
    });
    return Math.round((filledCount / (totalQuestions || 1)) * 100);
  }, [contractData]);

  const updateSection = (sectionId: string, data: any) => {
    setContractData((prev: any) => ({
      ...prev,
      [sectionId]: { ...(prev[sectionId] || {}), ...data }
    }));
  };

  const compileFinalContract = (): ImplementationGradeSpecificationContract => {
    // Combine all sections into a flat params object for the registry synthesizer
    const params: any = {};
    Object.values(contractData).forEach(section => {
      Object.entries(section).forEach(([key, val]) => {
        params[key] = val;
      });
    });

    // Handle guided selections for Capacity and Tenancy
    if (contractData.business?.capacityProfile) {
      params.capacityProfileId = contractData.business.capacityProfile;
    }
    if (contractData.business?.tenancyModel) {
      params.tenancyProfileId = contractData.business.tenancyModel;
    }

    // Use the Authoritative Registry to synthesize the contract with TraceableValue wrappers
    return JumoDomainOptionRegistry.synthesizeSpecificationContract({
      domain: activeDomainId,
      ecosystemClassification: activeEcosystemId as any,
      ...params,
      selectedModules: contractData.functional?.modules || [],
      selectedPortals: contractData.functional?.portals || [],
      selectedWorkflows: contractData.workflow?.workflows || [],
      selectedAICapabilities: contractData.ai_experience?.aiCapabilities || [],
      selectedIntegrations: contractData.integrations?.externalSystems || []
    });
  };

  const handlePublishContract = async () => {
    setIsSubmitting(true);
    const contract = compileFinalContract();
    
    // Publish via EventBus and orchestrator
    JumoEventBus.publish('SPECIFICATION_APPROVED', {
      contract,
      timestamp: new Date().toISOString()
    });

    const productId = contract.identity?.productId || `PROD-${Date.now()}`;
    const jobId = await orchestrator.initiateManufacturingLifecycle(productId, contract);
    setSubmittedJobId(jobId);
    setIsSubmitting(false);
  };

  const activeSection = SPECIFICATION_SCHEMA.sections.find(s => s.id === activeTab) || SPECIFICATION_SCHEMA.sections[0];
  const activeSectionIdx = SPECIFICATION_SCHEMA.sections.findIndex(s => s.id === activeTab);

  if (submittedJobId) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[500px] space-y-6 animate-fadeIn p-8 bg-white rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center border border-emerald-100 shadow-xs">
          <CheckCircle2 size={36} />
        </div>
        <div className="text-center space-y-2 max-w-md">
          <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-100">
            Pipeline Initialized
          </span>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Contract Transmitted to Manufacturing Hub</h2>
          <p className="text-slate-500 text-xs leading-relaxed">
            Your authoritative specification has been compiled and submitted into the JUMO 32-stage manufacturing pipeline.
          </p>
        </div>
        <div className="w-full max-w-md bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2.5">
          <div className="flex justify-between text-xs">
            <span className="text-slate-500 font-medium">Tracking Job ID</span>
            <span className="text-slate-900 font-mono font-bold">{submittedJobId}</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-slate-500 font-medium">Ecosystem Class</span>
            <span className="text-blue-600 font-bold">{activeEcosystemId.replace(/_/g, ' ')}</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-slate-500 font-medium">Target Domain</span>
            <span className="text-slate-900 font-bold">{activeDomainId}</span>
          </div>
          <button 
            onClick={() => {
              setSubmittedJobId(null);
              setActiveTab('classification');
            }}
            className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-bold transition-all flex items-center justify-center gap-2 mt-3 text-xs cursor-pointer shadow-xs"
          >
            Configure Another System <ArrowRight size={14} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fadeIn h-full flex flex-col space-y-6 pb-12" id="jumo-specification-studio">
      <StudioLifecycleNavBar studioId="specification" />

      {/* 1. RESTORED APPROVED STUDIO HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-600 text-white rounded-xl flex items-center justify-center shadow-xs">
            <FileText size={24} />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <span className="text-[10px] font-black uppercase tracking-wider text-blue-700 bg-blue-50 border border-blue-100 px-2 py-0.5 rounded">
                Stage 01 • Intake
              </span>
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-700 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded">
                {activeEcosystemId.replace(/_/g, ' ')}
              </span>
            </div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">Specification Studio</h1>
            <p className="text-xs text-slate-500 font-medium">Authoritative Taxonomy-Driven Digital Contract Engine</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center bg-slate-100 p-1 rounded-lg border border-slate-200">
            <button 
              onClick={() => setViewMode('designer')}
              className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all cursor-pointer ${
                viewMode === 'designer' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Designer
            </button>
            <button 
              onClick={() => setViewMode('assistant')}
              className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all cursor-pointer ${
                viewMode === 'assistant' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Contract
            </button>
          </div>

          <button 
            onClick={handlePublishContract}
            disabled={isSubmitting}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-all shadow-xs flex items-center gap-2 cursor-pointer disabled:opacity-40"
          >
            <CheckCircle2 size={14} />
            <span>{isSubmitting ? 'Compiling...' : 'Submit to Factory'}</span>
          </button>
        </div>
      </div>

      {/* 2. THREE-COLUMN RESTORED COMPOSITION */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 overflow-hidden min-h-[700px]">
        
        {/* Left: Stage Navigation (2 Columns) */}
        <div className="lg:col-span-2 space-y-1 bg-white p-3 rounded-2xl border border-slate-200/80 shadow-xs overflow-y-auto">
          <div className="px-3 py-2 text-[10px] font-black uppercase tracking-wider text-slate-400 border-b border-slate-100 mb-2">
            Manufacturing Stages
          </div>
          <div className="space-y-1">
            {SPECIFICATION_SCHEMA.sections.map((section, idx) => {
              const isCurrent = section.id === activeTab;
              const hasData = contractData[section.id] && Object.keys(contractData[section.id]).length > 0;
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveTab(section.id)}
                  className={`w-full text-left px-3 py-2.5 rounded-xl text-[11px] transition-all flex items-center justify-between cursor-pointer ${
                    isCurrent
                      ? 'bg-blue-50 border border-blue-200 text-blue-900 font-bold shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <span className={`w-5 h-5 rounded-md text-[9px] flex items-center justify-center font-bold font-mono ${
                      isCurrent ? 'bg-blue-600 text-white' : hasData ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-500'
                    }`}>
                      {(idx + 1).toString().padStart(2, '0')}
                    </span>
                    <span className="truncate">{section.title.split('. ')[1] || section.title}</span>
                  </div>
                  {hasData && <Check size={12} className="text-emerald-600 shrink-0" />}
                </button>
              );
            })}
          </div>

          <div className="mt-6 p-3 bg-slate-50 rounded-xl border border-slate-200">
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Completeness</div>
            <div className="flex items-center justify-between text-xs font-mono font-bold text-slate-900 mb-1.5">
              <span>{completeness}%</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
              <div className="bg-blue-600 h-full transition-all duration-300" style={{ width: `${completeness}%` }}></div>
            </div>
          </div>
        </div>

        {/* Center: Stage Content / Form Workspace (7 Columns) */}
        <div className="lg:col-span-7 bg-white p-8 rounded-2xl border border-slate-200/80 shadow-xs overflow-y-auto">
          <div className="space-y-8">
            <div className="border-b border-slate-100 pb-5">
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">{activeSection.title}</h2>
              <p className="text-sm text-slate-500 mt-1">{activeSection.description}</p>
            </div>

            <div className="space-y-8">
              {activeSection.questions.map((q: any) => (
                <div key={q.id} className="space-y-3">
                  <label className="block text-xs font-black uppercase tracking-wider text-slate-700">
                    {q.label} {q.required && <span className="text-rose-500">*</span>}
                  </label>

                  {/* ECOSYSTEM SELECTOR */}
                  {q.type === 'ecosystem_selector' && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {[
                        { id: 'ERP_ECOSYSTEM', label: '1. ERP Products', sub: 'Institutional OS', icon: Building2 },
                        { id: 'COMMERCIAL_PLATFORM', label: '2. Commercial Platforms', sub: 'Marketplaces & Pay', icon: Globe },
                        { id: 'SOFTWARE_PROGRAM', label: '3. Software Programs', sub: 'Standalone Apps', icon: Laptop }
                      ].map(eco => {
                        const isSelected = activeEcosystemId === eco.id;
                        return (
                          <button
                            type="button"
                            key={eco.id}
                            onClick={() => {
                              const newDomains = JumoDomainOptionRegistry.getAvailableDomains(eco.id as ProductEcosystemId);
                              updateSection('classification', {
                                ecosystem: eco.id,
                                domain: newDomains[0]?.id || 'EDUCATION'
                              });
                            }}
                            className={`p-5 rounded-2xl border text-left transition-all cursor-pointer group ${
                              isSelected
                                ? 'bg-blue-50/70 border-blue-400 text-slate-900 shadow-md ring-1 ring-blue-400/20'
                                : 'bg-slate-50/60 border-slate-200 text-slate-600 hover:bg-white hover:border-blue-200 hover:shadow-xs'
                            }`}
                          >
                            <eco.icon className={`w-6 h-6 mb-3 transition-colors ${isSelected ? 'text-blue-600' : 'text-slate-400 group-hover:text-blue-400'}`} />
                            <div className="text-sm font-bold text-slate-900">{eco.label}</div>
                            <div className="text-[11px] text-slate-500 mt-1">{eco.sub}</div>
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {/* DOMAIN SELECTOR */}
                  {q.type === 'domain_selector' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {availableDomainsForEcosystem.map(d => {
                        const isSelected = activeDomainId === d.id;
                        return (
                          <button
                            type="button"
                            key={d.id}
                            onClick={() => {
                              updateSection('classification', { domain: d.id });
                              if (!contractData.identity?.productName) {
                                updateSection('identity', {
                                  productName: `${d.name} Sovereign System`,
                                  productPurpose: d.description
                                });
                              }
                            }}
                            className={`p-4 rounded-xl border text-left transition-all flex items-start justify-between cursor-pointer ${
                              isSelected
                                ? 'bg-emerald-50/70 border-emerald-500 text-slate-900 shadow-xs'
                                : 'bg-slate-50/60 border-slate-200 text-slate-700 hover:bg-white hover:border-emerald-200'
                            }`}
                          >
                            <div className="min-w-0">
                              <div className="text-xs font-bold text-slate-900 truncate">{d.name}</div>
                              <div className="text-[10px] text-slate-500 line-clamp-1 mt-0.5">{d.description}</div>
                            </div>
                            {isSelected && <CheckCircle2 size={14} className="text-emerald-600 shrink-0 ml-2" />}
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {/* Guided Capacity */}
                  {q.type === 'guided_capacity' && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {JumoDomainOptionRegistry.CAPACITY_PROFILES.map(profile => (
                        <button
                          type="button"
                          key={profile.id}
                          onClick={() => {
                            updateSection('capacity', {
                              capacityProfile: profile.id,
                              usersCount: profile.usersCount,
                              concurrentUsersCount: profile.concurrentUsersCount,
                              storageGb: profile.storageGb,
                              availabilityTargetPercentage: profile.availabilityTargetPercentage
                            });
                          }}
                          className={`text-left p-5 rounded-2xl border transition-all cursor-pointer ${
                            contractData.capacity?.capacityProfile === profile.id
                              ? 'bg-blue-50/70 border-blue-400 text-slate-900 shadow-md ring-1 ring-blue-400/20'
                              : 'bg-slate-50/60 border-slate-200 text-slate-700 hover:bg-white hover:border-blue-200'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-bold text-slate-900">{profile.displayName}</span>
                            <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">{profile.tier}</span>
                          </div>
                          <p className="text-[11px] text-slate-500 leading-relaxed mb-4">{profile.description}</p>
                          <div className="pt-3 border-t border-slate-200/60 grid grid-cols-2 gap-y-2 text-[10px] font-mono font-bold text-slate-600">
                            <div>{profile.usersCount.toLocaleString()} Users</div>
                            <div className="text-right text-emerald-600">{profile.availabilityTargetPercentage}% SLA</div>
                            <div>{profile.storageGb}GB Storage</div>
                            <div className="text-right">{profile.concurrentUsersCount.toLocaleString()} Peak</div>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Guided Tenancy */}
                  {q.type === 'guided_tenancy' && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {JumoDomainOptionRegistry.TENANCY_PROFILES.map(profile => (
                        <button
                          type="button"
                          key={profile.id}
                          onClick={() => {
                            updateSection('tenancy', {
                              tenantProfile: profile.id,
                              tenantModel: profile.tenantModel,
                              tenantHierarchy: profile.hierarchyType
                            });
                          }}
                          className={`text-left p-5 rounded-2xl border transition-all cursor-pointer ${
                            contractData.tenancy?.tenantProfile === profile.id
                              ? 'bg-purple-50/70 border-purple-400 text-slate-900 shadow-md ring-1 ring-purple-400/20'
                              : 'bg-slate-50/60 border-slate-200 text-slate-700 hover:bg-white hover:border-purple-200'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-bold text-slate-900">{profile.displayName}</span>
                            <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded-full bg-purple-100 text-purple-800">{profile.isolationLevel}</span>
                          </div>
                          <p className="text-[11px] text-slate-500 leading-relaxed">{profile.description}</p>
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Boolean / Toggle */}
                  {q.type === 'boolean' && (
                    <div className="flex items-center gap-4">
                      <button
                        type="button"
                        onClick={() => updateSection(activeSection.id, { [q.id]: true })}
                        className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                          contractData[activeSection.id]?.[q.id] === true
                            ? 'bg-blue-600 text-white shadow-md'
                            : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                        }`}
                      >
                        Enabled
                      </button>
                      <button
                        type="button"
                        onClick={() => updateSection(activeSection.id, { [q.id]: false })}
                        className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                          contractData[activeSection.id]?.[q.id] === false
                            ? 'bg-rose-600 text-white shadow-md'
                            : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                        }`}
                      >
                        Disabled
                      </button>
                    </div>
                  )}

                  {/* Guided Capacity */}
                  {q.type === 'guided_capacity' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {JumoDomainOptionRegistry.CAPACITY_PROFILES.map(profile => (
                        <button
                          key={profile.id}
                          type="button"
                          onClick={() => updateSection(activeSection.id, { capacityProfile: profile.id, usersCount: profile.usersCount, storageGb: profile.storageGb })}
                          className={`text-left p-4 rounded-xl border transition-all ${
                            contractData[activeSection.id]?.capacityProfile === profile.id 
                              ? 'bg-blue-50 border-blue-300 shadow-sm' 
                              : 'bg-white border-slate-100 hover:border-blue-200'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs font-bold text-slate-900">{profile.displayName}</span>
                            <span className="text-[10px] font-black bg-blue-100 text-blue-600 px-2 py-0.5 rounded uppercase">{profile.tier}</span>
                          </div>
                          <p className="text-[10px] text-slate-500 leading-relaxed">{profile.description}</p>
                          <div className="mt-3 flex items-center gap-3 text-[9px] font-bold text-slate-400">
                            <span>{profile.usersCount} Users</span>
                            <span>•</span>
                            <span>{profile.storageGb}GB Storage</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Guided Tenancy */}
                  {q.type === 'guided_tenancy' && (
                    <div className="space-y-3">
                      {JumoDomainOptionRegistry.TENANCY_PROFILES.map(profile => (
                        <button
                          key={profile.id}
                          type="button"
                          onClick={() => updateSection(activeSection.id, { tenancyModel: profile.id, tenantHierarchy: profile.hierarchyType })}
                          className={`w-full text-left p-4 rounded-xl border transition-all ${
                            contractData[activeSection.id]?.tenancyModel === profile.id 
                              ? 'bg-blue-50 border-blue-300 shadow-sm' 
                              : 'bg-white border-slate-100 hover:border-blue-200'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs font-bold text-slate-900">{profile.displayName}</span>
                            <span className="text-[10px] font-black bg-indigo-100 text-indigo-600 px-2 py-0.5 rounded uppercase">{profile.tenantModel}</span>
                          </div>
                          <p className="text-[10px] text-slate-500 leading-relaxed mb-2">{profile.description}</p>
                          <div className="flex items-center gap-2">
                            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Hierarchy:</span>
                            <span className="text-[9px] font-bold text-slate-600">{profile.hierarchyType}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Text inputs */}
                  {q.type === 'text' && (
                    <input 
                      type="text"
                      value={contractData[activeSection.id]?.[q.id] || ''}
                      onChange={(e) => updateSection(activeSection.id, { [q.id]: e.target.value })}
                      placeholder={q.placeholder}
                      className="w-full bg-slate-50/80 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium"
                    />
                  )}

                  {/* Select */}
                  {q.type === 'select' && (
                    <select 
                      value={contractData[activeSection.id]?.[q.id] || ''}
                      onChange={(e) => updateSection(activeSection.id, { [q.id]: e.target.value })}
                      className="w-full bg-slate-50/80 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium"
                    >
                      <option value="" disabled>Select option...</option>
                      {q.options?.map((opt: string) => (
                        <option key={opt} value={opt}>{opt.replace(/_/g, ' ')}</option>
                      ))}
                    </select>
                  )}

                  {/* Textarea */}
                  {q.type === 'textarea' && (
                    <textarea 
                      rows={4}
                      value={contractData[activeSection.id]?.[q.id] || ''}
                      onChange={(e) => updateSection(activeSection.id, { [q.id]: e.target.value })}
                      placeholder={q.placeholder}
                      className="w-full bg-slate-50/80 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none font-medium"
                    />
                  )}

                  {/* List */}
                  {q.type === 'list' && (
                    <div className="space-y-4">
                      {q.domainCategory && (
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
                            <Sparkles size={12} className="text-blue-500" />
                            <span>Catalog Suggestions for {activeDomainId}</span>
                          </div>
                          <div className="flex flex-wrap gap-2 p-4 bg-slate-50/50 rounded-2xl border border-slate-200 max-h-48 overflow-y-auto">
                            {(q.domainCategory === 'PORTALS'
                              ? JumoDomainOptionRegistry.getPortalsForDomain(activeDomainId)
                              : q.domainCategory === 'DEPARTMENTS'
                              ? JumoDomainOptionRegistry.getDepartmentsForDomain(activeDomainId)
                              : q.domainCategory === 'MODULES'
                              ? JumoDomainOptionRegistry.getModulesForDomain(activeDomainId)
                              : q.domainCategory === 'AI_CAPABILITIES'
                              ? JumoDomainOptionRegistry.getAICapabilitiesForDomain(activeDomainId)
                              : JumoDomainOptionRegistry.getIntegrationsForDomain(activeDomainId)
                            ).map(opt => {
                              const currentList: string[] = contractData[activeSection.id]?.[q.id] || [];
                              const isSelected = currentList.includes(opt.name);
                              return (
                                <button
                                  type="button"
                                  key={opt.id}
                                  onClick={() => {
                                    if (isSelected) {
                                      updateSection(activeSection.id, { [q.id]: currentList.filter(x => x !== opt.name) });
                                    } else {
                                      updateSection(activeSection.id, { [q.id]: [...currentList, opt.name] });
                                    }
                                  }}
                                  className={`px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all cursor-pointer flex items-center gap-2 ${
                                    isSelected
                                      ? 'bg-blue-600 text-white shadow-sm'
                                      : 'bg-white border border-slate-200 text-slate-700 hover:border-blue-300'
                                  }`}
                                >
                                  {isSelected ? <Check size={12} /> : <div className="w-1.5 h-1.5 rounded-full bg-slate-300" />}
                                  {opt.name}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      <div className="flex flex-wrap gap-2 p-4 bg-slate-100/30 border border-slate-200 border-dashed rounded-2xl min-h-[64px]">
                        {(() => {
                          const val = contractData[activeSection.id]?.[q.id];
                          const list = Array.isArray(val) ? val : (typeof val === 'string' && val.length > 0 ? [val] : []);
                          
                          if (list.length === 0) {
                            return (
                              <div className="w-full flex flex-col items-center justify-center py-2 opacity-40">
                                <Database size={16} className="mb-1" />
                                <span className="text-[11px] font-bold uppercase tracking-wider">No selections committed</span>
                              </div>
                            );
                          }

                          return list.map((item: string, idx: number) => (
                            <span key={idx} className="inline-flex items-center gap-2 px-3 py-1.5 bg-white text-slate-800 border border-slate-200 rounded-xl text-[11px] font-bold shadow-xs">
                              {item}
                              <button 
                                type="button"
                                onClick={() => {
                                  updateSection(activeSection.id, { [q.id]: list.filter((x: string) => x !== item) });
                                }}
                                className="text-slate-400 hover:text-rose-500 cursor-pointer p-0.5 hover:bg-rose-50 rounded-md transition-colors"
                              >
                                <X size={12} />
                              </button>
                            </span>
                          ));
                        })()}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Navigation Footer */}
            <div className="pt-8 border-t border-slate-100 flex items-center justify-between">
              <button
                type="button"
                disabled={activeSectionIdx === 0}
                onClick={() => setActiveTab(SPECIFICATION_SCHEMA.sections[activeSectionIdx - 1].id)}
                className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-2xl text-xs font-black uppercase tracking-widest flex items-center gap-2 disabled:opacity-30 cursor-pointer transition-all"
              >
                <ChevronLeft size={16} />
                Previous Stage
              </button>

              {activeSectionIdx < SPECIFICATION_SCHEMA.sections.length - 1 ? (
                <button
                  type="button"
                  onClick={() => setActiveTab(SPECIFICATION_SCHEMA.sections[activeSectionIdx + 1].id)}
                  className="px-8 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl text-xs font-black uppercase tracking-widest flex items-center gap-2 cursor-pointer transition-all shadow-md active:scale-95"
                >
                  Next Stage
                  <ChevronRight size={16} />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handlePublishContract}
                  className="px-10 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl text-xs font-black uppercase tracking-widest flex items-center gap-2 cursor-pointer shadow-md active:scale-95 transition-all"
                >
                  <CheckCircle2 size={16} />
                  Submit Contract
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Right: Contract Context & Real-time Synthesis (3 Columns) */}
        <div className="lg:col-span-3 flex flex-col space-y-4 overflow-hidden">
          
          {/* Engineering Synthesis Panel */}
          <div className="bg-slate-900 text-white rounded-2xl p-5 shadow-xl border border-slate-800 flex flex-col flex-1">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Terminal size={14} className="text-blue-400" />
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Contract Synthesis</span>
              </div>
              <span className="text-[9px] bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded border border-blue-500/30 font-bold uppercase">Live</span>
            </div>

            <div className="flex-1 font-mono text-[10px] space-y-4 overflow-y-auto pr-2 custom-scrollbar">
              <div className="text-blue-400/80"># JUMO UEOS Specification Compiler v1.4.2</div>
              <div className="text-slate-400"># Ecosystem: {activeEcosystemId}</div>
              <div className="text-slate-400"># Domain: {activeDomainId}</div>
              
              <div className="space-y-1">
                <div className="text-emerald-400">{'>'} Identity derived...</div>
                <div className="pl-4 text-slate-300">"productId": "SOV-{activeDomainId.slice(0, 3)}-{Date.now().toString().slice(-6)}"</div>
              </div>

              {contractData.capacity?.capacityProfile && (
                <div className="space-y-1">
                  <div className="text-emerald-400">{'>'} Sizing engine triggered...</div>
                  <div className="pl-4 text-slate-300">"computeTier": "{contractData.capacity.capacityProfile === 'SMALL_INSTITUTION' ? 'T1.MICRO' : 'T2.MEDIUM'}"</div>
                  <div className="pl-4 text-slate-300">"storageCluster": "DEDICATED_{contractData.capacity.storageGb}GB"</div>
                </div>
              )}

              {contractData.functional?.coreCapabilities?.length > 0 && (
                <div className="space-y-1">
                  <div className="text-emerald-400">{'>'} Module resolution...</div>
                  {contractData.functional.coreCapabilities.slice(0, 5).map((m: string) => (
                    <div key={m} className="pl-4 text-slate-300">"+ {m}"</div>
                  ))}
                </div>
              )}

              <div className="pt-4 mt-4 border-t border-slate-800">
                <div className="text-blue-400 font-bold uppercase tracking-widest text-[9px] mb-2">JSON RAW BUFFER</div>
                <pre className="text-slate-500 break-all whitespace-pre-wrap leading-tight">
                  {JSON.stringify(compileFinalContract(), null, 2).slice(0, 500)}...
                </pre>
              </div>
            </div>

            <button 
              onClick={() => setViewMode('assistant')}
              className="mt-4 w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-white text-[10px] font-black uppercase tracking-widest rounded-xl border border-slate-700 transition-all flex items-center justify-center gap-2"
            >
              <Eye size={12} />
              Inspect Full Contract
            </button>
          </div>

          {/* Assistant / Context Helper */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center border border-blue-100">
                <Bot size={18} />
              </div>
              <div>
                <div className="text-xs font-black uppercase text-slate-800 tracking-wider">JUMO Assistant</div>
                <div className="text-[10px] text-emerald-600 font-bold">READY TO GUIDE</div>
              </div>
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed italic">
              "Based on your selection of {activeDomainId.toLowerCase()}, I recommend ensuring the regulatory frameworks include {activeDomainId === 'EDUCATION' ? 'National Education Standards' : 'Healthcare Data Privacy'}. Shall I auto-fill the compliance section?"
            </p>
          </div>

        </div>

      </div>
      
      {/* 4. MODAL PREVIEW FOR FULL CONTRACT */}
      <AnimatePresence>
        {viewMode === 'assistant' && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-white w-full max-w-4xl max-h-[80vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden"
            >
              <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-600 text-white rounded-xl">
                    <FileText size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">Synthesized Implementation-Grade Contract</h3>
                    <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Authoritative Digital Sovereign Blueprint v1.0.0</p>
                  </div>
                </div>
                <button 
                  onClick={() => setViewMode('designer')}
                  className="p-2 hover:bg-slate-200 rounded-full transition-colors cursor-pointer"
                >
                  <X size={20} className="text-slate-500" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-6 bg-slate-50">
                <pre className="p-6 bg-slate-900 text-blue-300 rounded-2xl border border-slate-800 text-[11px] font-mono overflow-x-auto leading-relaxed shadow-inner">
                  {JSON.stringify(compileFinalContract(), null, 2)}
                </pre>
              </div>
              <div className="p-6 border-t border-slate-100 flex justify-end gap-3 bg-white">
                <button 
                  onClick={() => setViewMode('designer')}
                  className="px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-black uppercase tracking-widest cursor-pointer transition-all"
                >
                  Back to Designer
                </button>
                <button 
                  onClick={handlePublishContract}
                  className="px-8 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-black uppercase tracking-widest cursor-pointer shadow-md transition-all active:scale-95"
                >
                  Confirm & Submit to Factory
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <JumoFloatingAssistant activeStudio="specification" />
    </div>
  );
}
