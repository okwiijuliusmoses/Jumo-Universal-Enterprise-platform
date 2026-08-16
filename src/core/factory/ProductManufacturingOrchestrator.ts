import { 
  ProductManufacturingJob, 
  ProductLifecycleState, 
  ProductArtifactManifest,
  ManufacturingCategory,
  ManufacturingJobStatus,
  ProductInstanceDefinition,
  ExperienceBlueprint,
  ArchitectureContract,
  ReviewGate,
  EngineeringVerificationReport
} from "./registry/HubRegistryTypes";
import { ImplementationGradeSpecificationContract } from "../../types/specification";
import { SovereignGovernanceRegistry } from "../../services/gov/SovereignGovernanceRegistry";
import { JumoAIAgentRegistry } from "../ai/registry/JumoAIAgentRegistry";
import { JumoEventBus } from "../common/events/JumoEventBus";
import { JumoModelRegistry } from "../registry/JumoModelRegistry";

export type ProductCommand = 
  | 'SUBMIT_SPECIFICATION'
  | 'APPROVE_SPECIFICATION'
  | 'START_ARCHITECTURE'
  | 'COMPLETE_ARCHITECTURE'
  | 'APPROVE_ARCHITECTURE'
  | 'START_ENGINEERING'
  | 'COMPLETE_ENGINEERING'
  | 'START_MANUFACTURING'
  | 'COMPLETE_MANUFACTURING'
  | 'START_BUILD'
  | 'COMPLETE_BUILD'
  | 'VERIFY_PRODUCT'
  | 'CERTIFY_PRODUCT'
  | 'PROVISION_PRODUCT'
  | 'DEPLOY_PRODUCT'
  | 'ACTIVATE_RUNTIME';

// Canonical 32-Stage Status Order
export const STATUS_ORDER: ManufacturingJobStatus[] = [
  "DIGITAL_INTAKE",
  "SPECIFICATION_NORMALIZATION",
  "PLATFORM_INSTANCE_DEFINITION",
  "PROVISIONING",
  "ARCHITECTURE_DISCOVERY",
  "ARCHITECTURE_EXPANSION",
  "ARCHITECTURE_VERIFICATION",
  "ARCHITECTURE_CONTRACT_GENERATION",
  "AWAITING_HUMAN_ENGINEERING_APPROVAL", // Stage 4 review gate
  "WORKFORCE_ORCHESTRATION",
  "REQUIREMENTS_DECOMPOSITION",
  "SYSTEM_DESIGN",
  "DATA_ARCHITECTURE",
  "API_AND_INTEGRATION_ENGINEERING",
  "SECURITY_ENGINEERING",
  "APPLICATION_ENGINEERING",
  "COMMERCIAL_PRODUCT_ENGINEERING",
  "AI_AND_AUTOMATION_ENGINEERING",
  "INFRASTRUCTURE_ENGINEERING",
  "DEPENDENCY_RESOLUTION",
  "SCHEMA_MANUFACTURING",
  "SOURCE_AND_ARTIFACT_GENERATION",
  "COMPILATION",
  "BUILD_ASSEMBLY",
  "APPLICATION_COMPLETENESS_VERIFICATION",
  "SECURITY_AND_ZERO_TRUST_VERIFICATION",
  "INTEGRATION_VERIFICATION",
  "END_TO_END_SYSTEM_TESTING",
  "REGRESSION_AND_RESILIENCE_TESTING",
  "AWAITING_HUMAN_MANUFACTURING_APPROVAL", // Stage 10 review gate
  "DEPLOYMENT_AND_PUBLISHING",
  "RUNTIME_ACTIVATION_AND_CONTINUOUS_AUDIT"
];

// 10 Internationally Understandable Manufacturing Stages mapping
export const TEN_HIGH_LEVEL_STAGES = [
  {
    id: 1,
    name: "Intake & Demands Analysis",
    description: "Ingesting raw specification, normalizing schema properties, and establishing runtime identifiers.",
    requiredWorkPackages: ["DIGITAL_INTAKE", "SPECIFICATION_NORMALIZATION", "PLATFORM_INSTANCE_DEFINITION"] as ManufacturingJobStatus[]
  },
  {
    id: 2,
    name: "Platform & Provisioning Setup",
    description: "Resolving template definitions, configuration scopes, and initiating system discovery.",
    requiredWorkPackages: ["PROVISIONING", "ARCHITECTURE_DISCOVERY"] as ManufacturingJobStatus[]
  },
  {
    id: 3,
    name: "Domain & Architecture Synthesis",
    description: "Formulating multi-layer structures, establishing boundaries, and generating secure system contracts.",
    requiredWorkPackages: ["ARCHITECTURE_EXPANSION", "ARCHITECTURE_VERIFICATION", "ARCHITECTURE_CONTRACT_GENERATION"] as ManufacturingJobStatus[]
  },
  {
    id: 4,
    name: "Human Blueprints Ratification",
    description: "Subjecting blueprints to institutional review and allocating the cognitive engineering swarm.",
    requiredWorkPackages: ["AWAITING_HUMAN_ENGINEERING_APPROVAL", "WORKFORCE_ORCHESTRATION"] as ManufacturingJobStatus[]
  },
  {
    id: 5,
    name: "Requirements Decomposition & System Design",
    description: "Splitting blueprints into engineering specs, structuring micro-services, and design domains.",
    requiredWorkPackages: ["REQUIREMENTS_DECOMPOSITION", "SYSTEM_DESIGN", "DATA_ARCHITECTURE"] as ManufacturingJobStatus[]
  },
  {
    id: 6,
    name: "Core Software & API Engineering",
    description: "Implementing user interfaces, writing workflow controllers, and deploying integration endpoints.",
    requiredWorkPackages: ["API_AND_INTEGRATION_ENGINEERING", "SECURITY_ENGINEERING", "APPLICATION_ENGINEERING"] as ManufacturingJobStatus[]
  },
  {
    id: 7,
    name: "Automation & Product Synthesis",
    description: "Configuring automated workflows, wiring cognitive logic, and establishing compute topologies.",
    requiredWorkPackages: ["COMMERCIAL_PRODUCT_ENGINEERING", "AI_AND_AUTOMATION_ENGINEERING", "INFRASTRUCTURE_ENGINEERING"] as ManufacturingJobStatus[]
  },
  {
    id: 8,
    name: "Compilation & Sealed Build Assembly",
    description: "Resolving library packages, compiling migrations, compiling sources, and sealing production bundles.",
    requiredWorkPackages: ["DEPENDENCY_RESOLUTION", "SCHEMA_MANUFACTURING", "SOURCE_AND_ARTIFACT_GENERATION", "COMPILATION", "BUILD_ASSEMBLY"] as ManufacturingJobStatus[]
  },
  {
    id: 9,
    name: "Rigorous Verification & Quality Auditing",
    description: "Validating completeness, auditing zero-trust security perimeters, and simulating high-load scenarios.",
    requiredWorkPackages: ["APPLICATION_COMPLETENESS_VERIFICATION", "SECURITY_AND_ZERO_TRUST_VERIFICATION", "INTEGRATION_VERIFICATION", "END_TO_END_SYSTEM_TESTING", "REGRESSION_AND_RESILIENCE_TESTING"] as ManufacturingJobStatus[]
  },
  {
    id: 10,
    name: "Sovereign Certification & Human Acceptance",
    description: "Final human acceptance gate, official cryptographic certification, and hot runtime activation.",
    requiredWorkPackages: ["AWAITING_HUMAN_MANUFACTURING_APPROVAL", "DEPLOYMENT_AND_PUBLISHING", "RUNTIME_ACTIVATION_AND_CONTINUOUS_AUDIT"] as ManufacturingJobStatus[]
  }
];

export const STATUS_TO_LIFECYCLE_MAP: Record<string, ProductLifecycleState> = {
  "DIGITAL_INTAKE": "SPECIFICATION_DRAFT",
  "SPECIFICATION_NORMALIZATION": "SPECIFICATION_NORMALIZED",
  "PLATFORM_INSTANCE_DEFINITION": "REQUIREMENTS_VALIDATED",
  "PROVISIONING": "SPECIFICATION_APPROVED",
  "ARCHITECTURE_DISCOVERY": "ARCHITECTURE_INTAKE",
  "ARCHITECTURE_EXPANSION": "ARCHITECTURAL_EXPANSION",
  "ARCHITECTURE_VERIFICATION": "AWAITING_ARCHITECTURE_APPROVAL",
  "ARCHITECTURE_CONTRACT_GENERATION": "ARCHITECTURE_APPROVED",
  "AWAITING_HUMAN_ENGINEERING_APPROVAL": "AWAITING_HUMAN_ENGINEERING_APPROVAL",
  "WORKFORCE_ORCHESTRATION": "ENGINEERING_INTAKE",
  "REQUIREMENTS_DECOMPOSITION": "ENGINEERING_IMPLEMENTATION",
  "SYSTEM_DESIGN": "ENGINEERING_IMPLEMENTATION",
  "DATA_ARCHITECTURE": "ENGINEERING_IMPLEMENTATION",
  "API_AND_INTEGRATION_ENGINEERING": "ENGINEERING_IMPLEMENTATION",
  "SECURITY_ENGINEERING": "ENGINEERING_IMPLEMENTATION",
  "APPLICATION_ENGINEERING": "ENGINEERING_IMPLEMENTATION",
  "COMMERCIAL_PRODUCT_ENGINEERING": "ENGINEERING_IMPLEMENTATION",
  "AI_AND_AUTOMATION_ENGINEERING": "ENGINEERING_IMPLEMENTATION",
  "INFRASTRUCTURE_ENGINEERING": "ENGINEERING_IMPLEMENTATION",
  "DEPENDENCY_RESOLUTION": "ENGINEERING_VERIFIED",
  "SCHEMA_MANUFACTURING": "FACTORY_READY",
  "SOURCE_AND_ARTIFACT_GENERATION": "MANUFACTURING_EXECUTION",
  "COMPILATION": "MANUFACTURING_EXECUTION",
  "BUILD_ASSEMBLY": "BUILDING",
  "APPLICATION_COMPLETENESS_VERIFICATION": "BUILD_VERIFIED",
  "SECURITY_AND_ZERO_TRUST_VERIFICATION": "PRODUCT_ASSURANCE",
  "INTEGRATION_VERIFICATION": "PRODUCT_ASSURANCE",
  "END_TO_END_SYSTEM_TESTING": "CERTIFICATION",
  "REGRESSION_AND_RESILIENCE_TESTING": "CERTIFICATION",
  "AWAITING_HUMAN_MANUFACTURING_APPROVAL": "AWAITING_HUMAN_MANUFACTURING_APPROVAL",
  "DEPLOYMENT_AND_PUBLISHING": "DEPLOYMENT",
  "RUNTIME_ACTIVATION_AND_CONTINUOUS_AUDIT": "OPERATING"
};

export class ProductManufacturingOrchestrator {
  private static instance: ProductManufacturingOrchestrator;
  private registry = SovereignGovernanceRegistry.getInstance();

  private constructor() {
    this.setupEventListeners();
  }

  public static getInstance(): ProductManufacturingOrchestrator {
    if (!ProductManufacturingOrchestrator.instance) {
      ProductManufacturingOrchestrator.instance = new ProductManufacturingOrchestrator();
    }
    return ProductManufacturingOrchestrator.instance;
  }

  private setupEventListeners() {
    JumoEventBus.subscribe("LIFECYCLE_EVENT", async (event: any) => {
      console.log(`[ORCHESTRATOR] Event received: ${event.type} for Job: ${event.jobId}`);
      await this.handleLifecycleEvent(event);
    });

    JumoEventBus.subscribe('LIFECYCLE_APPROVAL_GRANTED', async (approval: any) => {
      console.log(`[ORCHESTRATOR] Authoritative Approval Received:`, approval);
      const job = this.registry.getJob(approval.jobId) as ProductManufacturingJob;
      if (job) {
        if (approval.scope === 'SPECIFICATION_APPROVAL') {
          await this.transition(job, 'SPECIFICATION_APPROVED', 'APPROVE_SPECIFICATION', approval);
        } else if (approval.scope === 'ARCHITECTURE_APPROVAL') {
          await this.transition(job, 'ARCHITECTURE_APPROVED', 'APPROVE_ARCHITECTURE', approval);
        }
      }
    });
  }

  public async issueCommand(command: ProductCommand, payload: any): Promise<void> {
    console.log(`[ORCHESTRATOR] Command issued: ${command}`, payload);
    const { jobId } = payload;
    let job: ProductManufacturingJob | undefined;
    
    if (jobId) {
      job = this.registry.getJob(jobId) as ProductManufacturingJob;
    }

    switch (command) {
      case 'SUBMIT_SPECIFICATION':
        await this.submitSpecification(payload);
        break;
      case 'APPROVE_SPECIFICATION':
        if (job) await this.transition(job, 'SPECIFICATION_APPROVED', 'APPROVE_SPECIFICATION', payload);
        break;
      case 'START_ARCHITECTURE':
        if (job) await this.transition(job, 'ARCHITECTURE_INTAKE', 'START_ARCHITECTURE', payload);
        break;
      case 'COMPLETE_ARCHITECTURE':
        if (job) await this.transition(job, 'ARCHITECTURE_APPROVED', 'COMPLETE_ARCHITECTURE', payload);
        break;
      case 'APPROVE_ARCHITECTURE':
        if (job) await this.transition(job, 'ARCHITECTURE_APPROVED', 'APPROVE_ARCHITECTURE', payload);
        break;
      case 'START_ENGINEERING':
        if (job) await this.transition(job, 'ENGINEERING_INTAKE', 'START_ENGINEERING', payload);
        break;
      case 'COMPLETE_ENGINEERING':
        if (job) await this.transition(job, 'ENGINEERING_VERIFIED', 'COMPLETE_ENGINEERING', payload);
        break;
      case 'START_MANUFACTURING':
        if (jobId) await this.advanceJobPipeline(jobId);
        break;
      case 'START_BUILD':
        if (jobId) await this.advanceJobPipeline(jobId);
        break;
      case 'VERIFY_PRODUCT':
        if (jobId) await this.advanceJobPipeline(jobId);
        break;
      case 'CERTIFY_PRODUCT':
        if (jobId) await this.advanceJobPipeline(jobId);
        break;
      default:
        console.log(`[ORCHESTRATOR] Command ${command} mapped to automated pipeline loop.`);
    }
  }

  public async initiateManufacturingLifecycle(productId: string, specification: any): Promise<string> {
    const specId = specification?.identity?.productId || productId || `SPEC-${Date.now().toString(36).toUpperCase()}`;
    const payload = {
      productId: specId,
      specificationId: specId,
      specificationVersion: specification?.identity?.productVersion || '1.0.0',
      ecosystem: specification?.classification || 'ERP_ECOSYSTEM',
      specification,
      idempotencyKey: `INIT-${specId}-${Date.now()}`
    };
    const job = await this.submitSpecification(payload);
    return job.id || job.jobId;
  }

  public async submitSpecification(payload: any): Promise<ProductManufacturingJob> {
    const { productId, specificationId, specificationVersion, idempotencyKey } = payload;
    
    const existingJobs = Array.from(this.registry.getAllJobs()).filter(j => (j as ProductManufacturingJob).idempotencyKey === idempotencyKey);
    if (idempotencyKey && existingJobs.length > 0) {
      console.log(`[ORCHESTRATOR] Idempotent request. Returning existing job.`);
      return existingJobs[0] as ProductManufacturingJob;
    }

    const jobId = `JOB-${Date.now().toString(36).toUpperCase()}`;
    const job: ProductManufacturingJob = {
      id: jobId,
      jobId: jobId,
      productId,
      specificationId,
      specificationVersion: specificationVersion || '1.0.0',
      architectureId: "",
      ecosystem: (payload.ecosystem || 'SOFTWARE_ECOSYSTEM') as ManufacturingCategory,
      version: '1.0.0',
      status: 'DIGITAL_INTAKE',
      currentLifecycleState: 'SPECIFICATION_DRAFT',
      currentGlobalStage: 'Intake & Demands Analysis',
      currentManufacturingStage: "1",
      progress: 0,
      assignedWorkforce: [],
      repository: "",
      branch: "main",
      commitSha: "",
      evidence: [],
      logs: [`Specification submitted: ${specificationId}`],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      idempotencyKey,
      correlationId: `CORR-${jobId}`,
      stageStates: { 'DIGITAL_INTAKE': 'RUNNING' },
      artifacts: {},
      approvalStates: {},
      agentAssignments: {},
      providerAssignments: {},
      verificationEvidence: [],
      errors: [],
      timestamps: { 'DIGITAL_INTAKE': new Date().toISOString() },
      reviewGates: [],
      config: { specification: payload.specification }
    };

    // Pre-synthesize reports and blueprints so they are available in gates
    await this.synthesizeBlueprintsAndReports(job);

    this.registry.registerJob(job);

    // Trigger the auto-running pipeline
    setTimeout(() => {
      this.advanceJobPipeline(jobId);
    }, 500);

    return job;
  }

  /**
   * Main Pipeline Advancement Loop
   */
  public async advanceJobPipeline(jobId: string): Promise<void> {
    const job = this.registry.getJob(jobId) as ProductManufacturingJob;
    if (!job) return;

    const currentStatus = job.status;
    const currentIdx = STATUS_ORDER.indexOf(currentStatus);
    if (currentIdx === -1) return;

    // Check for human-gated blocks
    if (currentStatus === 'AWAITING_HUMAN_ENGINEERING_APPROVAL' || currentStatus === 'AWAITING_HUMAN_MANUFACTURING_APPROVAL') {
      console.log(`[ORCHESTRATOR] Job ${jobId} is currently parked at gate: ${currentStatus}`);
      return;
    }

    if (currentIdx >= STATUS_ORDER.length - 1) {
      console.log(`[ORCHESTRATOR] Job ${jobId} has completed the entire lifecycle.`);
      return;
    }

    const nextStatus = STATUS_ORDER[currentIdx + 1];
    const nextIdx = currentIdx + 1;
    console.log(`[ORCHESTRATOR] Advancing Job ${jobId} from ${currentStatus} to ${nextStatus}`);

    // Update job progress & statuses
    job.status = nextStatus;
    job.currentLifecycleState = STATUS_TO_LIFECYCLE_MAP[nextStatus] || job.currentLifecycleState;
    job.progress = Math.round((nextIdx / STATUS_ORDER.length) * 100);
    job.updatedAt = new Date().toISOString();

    if (!job.stageStates) job.stageStates = {};
    job.stageStates[nextStatus] = 'RUNNING';
    if (!job.timestamps) job.timestamps = {};
    job.timestamps[nextStatus] = job.updatedAt;

    // Map 32 work packages into 10 high-level stages
    const stageInfo = TEN_HIGH_LEVEL_STAGES.find(stg => stg.requiredWorkPackages.includes(nextStatus));
    if (stageInfo) {
      job.currentManufacturingStage = stageInfo.id.toString();
      job.currentGlobalStage = stageInfo.name;
    }

    // Dynamic model selection based on standard JUMO model registry capability routing
    const targetTaskType = nextStatus.includes('SECURITY') ? 'DEEP_REASONING' : nextStatus.includes('ENGINEERING') ? 'CODING' : 'FAST';
    const selectedModel = JumoModelRegistry.getDefaultModelForTask(targetTaskType);
    const agent = this.resolveAgent('ENGINEERING', 'CODE_GENERATION');

    const logEntry = `JUMO Workforce [Agent: ${agent.jumoName}] executed package [${nextStatus}] utilizing model [${selectedModel}]`;
    job.logs.push(logEntry);

    // Track artifact generation
    if (nextStatus === 'AWAITING_HUMAN_ENGINEERING_APPROVAL') {
      const art: ProductArtifactManifest = {
        artifactId: `ART-ARCH-${Date.now().toString(36).toUpperCase()}`,
        productId: job.productId,
        version: '1.0.0',
        type: 'SPECIFICATION_ARTIFACT',
        sourceJobId: job.jobId,
        sourceStage: 'ARCHITECTURE_CONTRACT_GENERATION',
        content: job.blueprint || {},
        integrityHash: `sha256:${Math.random().toString(36)}`,
        createdAt: new Date().toISOString(),
        status: 'VERIFIED',
        dependencies: [],
        evidence: []
      };
      if (!job.artifacts) job.artifacts = {};
      job.artifacts['ARCHITECTURE'] = art;
      job.blueprintId = art.artifactId;
    }

    if (nextStatus === 'SCHEMA_MANUFACTURING') {
      const art: ProductArtifactManifest = {
        artifactId: `ART-ENG-${Date.now().toString(36).toUpperCase()}`,
        productId: job.productId,
        version: '1.0.0',
        type: 'SPECIFICATION_ARTIFACT',
        sourceJobId: job.jobId,
        sourceStage: 'DEPENDENCY_RESOLUTION',
        content: job.engineeringReport || {},
        integrityHash: `sha256:${Math.random().toString(36)}`,
        createdAt: new Date().toISOString(),
        status: 'VERIFIED',
        dependencies: [],
        evidence: []
      };
      if (!job.artifacts) job.artifacts = {};
      job.artifacts['ENGINEERING'] = art;
      job.engineeringArtifactId = art.artifactId;
    }

    if (nextStatus === 'BUILD_ASSEMBLY') {
      const art: ProductArtifactManifest = {
        artifactId: `ART-MFG-${Date.now().toString(36).toUpperCase()}`,
        productId: job.productId,
        version: '1.0.0',
        type: 'BUILD_ARTIFACT',
        sourceJobId: job.jobId,
        sourceStage: 'COMPILATION',
        content: {},
        integrityHash: `sha256:${Math.random().toString(36)}`,
        createdAt: new Date().toISOString(),
        status: 'VERIFIED',
        dependencies: [],
        evidence: []
      };
      if (!job.artifacts) job.artifacts = {};
      job.artifacts['MANUFACTURING'] = art;
    }

    if (nextStatus === 'BUILD_ASSEMBLY') {
      await this.executeBuildStage(job);
    } else if (nextStatus === 'RUNTIME_ACTIVATION_AND_CONTINUOUS_AUDIT') {
      await this.createRuntimeInstance(job);
    }

    this.registry.registerJob(job);

    // Broadcast update
    JumoEventBus.publish("LIFECYCLE_EVENT", {
      type: 'STATE_TRANSITION',
      jobId: job.jobId,
      status: job.status,
      timestamp: job.updatedAt
    });

    // Check for gate blocks
    if (nextStatus === 'AWAITING_HUMAN_ENGINEERING_APPROVAL') {
      const gateId = `GATE-ENG-${Date.now().toString(36).toUpperCase()}`;
      const gate: ReviewGate = {
        id: gateId,
        jobId: job.jobId,
        lifecycleStage: 'ARCHITECTURE_INTAKE',
        gateType: 'ENGINEERING_APPROVAL',
        status: 'PENDING',
        artifactRefs: [job.blueprintId || '', job.experienceBlueprint?.id || ''],
        evidenceRefs: [],
        createdAt: new Date().toISOString(),
        revision: 1
      };
      if (!job.reviewGates) job.reviewGates = [];
      job.reviewGates.push(gate);
      this.registry.registerJob(job);
      return;
    }

    if (nextStatus === 'AWAITING_HUMAN_MANUFACTURING_APPROVAL') {
      const gateId = `GATE-MFG-${Date.now().toString(36).toUpperCase()}`;
      const gate: any = {
        id: gateId,
        jobId: job.jobId,
        lifecycleStage: 'MANUFACTURING_EXECUTION',
        gateType: 'FINAL_ASSEMBLY_APPROVAL',
        status: 'PENDING',
        artifactRefs: [],
        evidenceRefs: [],
        createdAt: new Date().toISOString(),
        revision: 1
      };
      if (!job.reviewGates) job.reviewGates = [];
      job.reviewGates.push(gate);
      this.registry.registerJob(job);
      return;
    }

    // Schedule next auto advance step
    setTimeout(() => {
      this.advanceJobPipeline(jobId);
    }, 500);
  }

  public async submitReviewDecision(jobId: string, gateId: string, decision: 'APPROVE' | 'REJECT', feedback?: any) {
    const job = this.registry.getJob(jobId) as ProductManufacturingJob;
    if (!job) throw new Error("Job not found");

    const gate = job.reviewGates.find(g => g.id === gateId);
    if (!gate) throw new Error("Gate not found");

    gate.status = decision === 'APPROVE' ? 'APPROVED' : 'REJECTED';
    gate.decision = decision;
    gate.feedback = feedback;
    gate.decidedAt = new Date().toISOString();

    if (decision === 'APPROVE') {
      if (gate.gateType === 'ENGINEERING_APPROVAL') {
        job.status = 'WORKFORCE_ORCHESTRATION';
        job.currentLifecycleState = 'ENGINEERING_INTAKE';
        job.logs.push("Human systems architect approved engineering and experience blueprints. Commencing autonomous workforce allocation.");
        this.registry.registerJob(job);
        // Resume automatic execution
        this.advanceJobPipeline(jobId);
      } else if (gate.gateType === 'FINAL_ASSEMBLY_APPROVAL') {
        job.status = 'DEPLOYMENT_AND_PUBLISHING';
        job.currentLifecycleState = 'DEPLOYMENT';
        job.logs.push("Sovereign certification seal issued by authority. Activating production deployment.");
        this.registry.registerJob(job);
        // Resume automatic execution
        this.advanceJobPipeline(jobId);
      }
    } else {
      job.status = 'FAILED';
      job.currentLifecycleState = 'FAILED';
      job.logs.push(`Rejection feedback received: ${feedback?.rejectionReason || 'No reason specified'}`);
      this.registry.registerJob(job);
    }
  }

  public getAllArtifacts(): ProductArtifactManifest[] {
    const allJobs = this.registry.getAllJobs() as ProductManufacturingJob[];
    const allArtifacts: ProductArtifactManifest[] = [];
    allJobs.forEach(job => {
      if (job.artifacts) {
        Object.values(job.artifacts).forEach(art => {
          if (art && typeof art === 'object' && 'artifactId' in art) {
            allArtifacts.push(art as ProductArtifactManifest);
          }
        });
      }
    });
    return allArtifacts;
  }

  private async transition(job: ProductManufacturingJob, nextState: ProductLifecycleState, transitionName: string, evidence: any) {
    console.log(`[ORCHESTRATOR] Transitioning Job ${job.jobId} from ${job.currentLifecycleState} to ${nextState} via ${transitionName}`);
    job.currentLifecycleState = nextState;
    job.updatedAt = new Date().toISOString();
    
    this.registry.registerJob(job);
    JumoEventBus.publish("LIFECYCLE_EVENT", {
      type: 'STATE_TRANSITION',
      jobId: job.jobId,
      from: job.currentLifecycleState,
      to: nextState,
      timestamp: job.updatedAt
    });
  }

  private async synthesizeBlueprintsAndReports(job: ProductManufacturingJob) {
    const spec = job.config?.specification as ImplementationGradeSpecificationContract;
    
    const v = <T>(tv: any, defaultValue: T): T => {
      if (!tv) return defaultValue;
      if (typeof tv === 'object' && 'value' in tv) return tv.value;
      return tv as T;
    };

    const experienceBlueprint: ExperienceBlueprint = {
      id: `EXP-BP-${job.jobId}`,
      jobId: job.jobId,
      productId: job.productId,
      publicExperience: {
        landingPage: {
          heroTitle: v(spec?.digitalExperience?.publicExperience?.landingPage?.heroTitle, "Sovereign Portal"),
          heroSubtitle: v(spec?.digitalExperience?.publicExperience?.landingPage?.heroSubtitle, "Institutional Excellence"),
          primaryCTA: v(spec?.digitalExperience?.publicExperience?.landingPage?.primaryCTA, "Get Started"),
          secondaryCTAs: [],
          sections: v(spec?.digitalExperience?.publicExperience?.landingPage?.sections, ["Hero", "Services", "About", "FAQ"]),
          seoMetadata: { 
            title: v(spec?.identity?.productName, "JUMO Product"), 
            description: v(spec?.identity?.productDescription, "") 
          }
        },
        serviceCatalogue: {
          categories: v(spec?.digitalExperience?.publicExperience?.serviceDiscovery?.categories, [job.ecosystem]),
          featuredServices: ["Core Operations", "Public Inquiry"],
          searchEnabled: true
        },
        assistant: {
          enabled: v(spec?.aiExperience?.publicAssistant?.enabled, true),
          name: v(spec?.aiExperience?.publicAssistant?.assistantName, "Sovereign Guide"),
          welcomeMessage: "How can I help you today?",
          knowledgeScope: v(spec?.aiExperience?.publicAssistant?.knowledgeScope, [])
        },
        footer: {
          legalLinks: ["Privacy", "Terms"],
          socialLinks: ["LinkedIn", "Twitter", "Official Portal"],
          siteMap: true
        }
      },
      authenticationExperience: {
        methods: v(spec?.securityExperience?.authenticationMethods, ['PASSWORD', 'MFA']),
        mfaRequired: v(spec?.securityExperience?.mfaRequired, true),
        onboardingRequired: v(spec?.digitalExperience?.authenticatedExperience?.onboardingRequired, true),
        identityVerification: v(spec?.securityExperience?.identityVerification, false),
        termsAcceptance: v(spec?.securityExperience?.termsAcceptanceRequired, true)
      },
      navigationExperience: {
        primaryNav: v(spec?.functionalSpecification?.portals, ["Dashboard", "Services", "Inbox"]),
        secondaryNav: ["Profile", "Settings", "Help"],
        sidebarEnabled: v(spec?.digitalExperience?.authenticatedExperience?.navigationModel, 'SIDEBAR') === 'SIDEBAR',
        breadcrumbs: true,
        roleAware: true,
        shortcuts: ["Alt+S (Search)", "Alt+H (Home)"]
      },
      workspaceExperience: {
        dashboardLayout: v(spec?.digitalExperience?.authenticatedExperience?.dashboardLayout, 'GRID'),
        widgets: v(spec?.functionalSpecification?.modules, []),
        dataDensity: v(spec?.digitalExperience?.designSystem?.density, 'STANDARD'),
        contextSwitching: true,
        toolbars: true
      },
      mobileExperience: {
        responsive: true,
        pwaEnabled: false,
        offlineCapability: false,
        touchOptimizations: true
      },
      localization: {
        defaultLanguage: v(spec?.localization?.defaultLanguage, "English"),
        supportedLanguages: v(spec?.localization?.supportedLanguages, ["English"]),
        currency: "USD",
        dateFormat: "YYYY-MM-DD",
        numberFormat: "STANDARD",
        timezone: v(spec?.localization?.timezone, "UTC"),
        rtlSupport: v(spec?.localization?.rtlSupport, false)
      },
      accessibility: {
        target: v(spec?.accessibility?.targetStandard, "WCAG_AA"),
        features: ["Screen Reader Optimized", "Keyboard Navigation", "Aria-Label Compliance"],
        contrastTarget: v(spec?.accessibility?.contrastTarget, "4.5:1"),
        reducedMotion: false
      },
      aiExperience: {
        persona: v(spec?.aiExperience?.authenticatedAssistant?.persona, "ANALYST"),
        capabilities: v(spec?.aiExperience?.authenticatedAssistant?.tools, []),
        safetyGuardrails: v(spec?.aiExperience?.safetyGuardrails, []),
        administrativeAssistant: true,
        domainReasoning: true
      },
      advertisingExperience: {
        enabled: false,
        placements: ["DASHBOARD_SIDEBAR", "LANDING_PAGE_BOTTOM"],
        revenueModel: "CPC_CPM"
      },
      communicationExperience: {
        channels: v(spec?.communication?.channels, ["IN_APP", "EMAIL"]),
        templates: ["WELCOME_EMAIL", "ALERT_NOTIFICATION"],
        preferencesEnabled: true,
        emergencyAlerts: true
      },
      searchExperience: {
        globalSearch: true,
        aiPowered: v(spec?.aiExperience?.authenticatedAssistant?.enabled, true),
        filters: ["Date", "Category", "Author"]
      },
      supportExperience: {
        helpCenter: true,
        ticketing: true,
        documentation: true,
        feedbackLoop: true
      },
      designSystem: {
        typography: v(spec?.digitalExperience?.designSystem?.typography, v(spec?.identity?.brandIdentity?.typography, "Inter")),
        primaryColor: v(spec?.identity?.brandIdentity?.primaryColor, "#2563eb"),
        secondaryColor: "#64748b",
        radius: `${v(spec?.digitalExperience?.designSystem?.radius, 16)}px`,
        motionLevel: 'DYNAMIC'
      },
      trustSecurityExperience: {
        verificationBadges: true,
        privacyDashboard: v(spec?.securityExperience?.privacyControlsEnabled, true),
        sessionTransparency: true,
        auditVisibility: true
      },
      analyticsExperience: {
        usageAnalytics: true,
        performanceMonitoring: true,
        businessROI: true
      }
    };

    job.experienceBlueprint = experienceBlueprint;

    const blueprint: ArchitectureContract = {
      id: `ARCH-BP-${job.jobId}`,
      jobId: job.jobId,
      productId: job.productId,
      version: "1.0.0",
      specificationId: job.specificationId,
      status: 'REVIEW',
      productIdentity: {
        name: v(spec?.identity?.productName, job.productId),
        ecosystem: job.ecosystem,
        sector: v(spec?.domainSpecification?.sector, "General"),
        organization: v(spec?.identity?.organizationIdentity, "Institutional Authority"),
        purpose: v(spec?.identity?.productPurpose, "General Purpose Sovereign System"),
        targetUsers: v(spec?.identity?.targetAudience, "Institutional Staff"),
        operatingJurisdiction: v(spec?.identity?.operatingJurisdictions, ["National"])[0],
        deploymentModel: v(spec?.identity?.geographicScope, "CENTRALIZED"),
        tenancyModel: v(spec?.businessSpecification?.tenancyModel, "SINGLE_TENANT")
      },
      experienceArchitecture: {
        portals: v(spec?.functionalSpecification?.portals, ["Default Portal"]),
        mobileExperience: false,
        apiExperience: true,
        experienceBlueprintId: experienceBlueprint.id
      },
      experienceBlueprint,
      organizationalArchitecture: {
        ministries: [],
        departments: v(spec?.businessSpecification?.organizationHierarchy, "Administration").split(' -> '),
        directorates: [],
        divisions: [],
        branches: [],
        offices: [],
        units: [],
        teams: [],
        committees: [],
        roles: ["Administrator", "Officer", "Auditor"],
        responsibilities: ["Data Management", "Workflow Approval", "System Monitoring"]
      },
      domainArchitecture: {
        domainIdentifier: v(spec?.domainSpecification?.sector, "GENERAL"),
        coreWorkflows: v(spec?.businessSpecification?.businessProcesses, ["Default Intake"]),
        dataEntitlements: ["Personal Data", "Financial Records", "Audit Logs"],
        businessRules: ["Mandatory Audit", "Role-based Access Control"]
      },
      technicalArchitecture: {
        computeTier: "T3.LARGE",
        databaseType: "PostgreSQL",
        cacheStrategy: "Redis-Cluster",
        eventBus: "Internal-Sync",
        apiGateway: "JUMO-Edge-Gateway",
        securityProtocol: "TLS 1.3 + JWT"
      },
      manufacturingDirectives: {
        requiredLayers: ["UI", "API", "DB", "AUTH", "WORKFLOW"],
        priorityModules: v(spec?.functionalSpecification?.modules, []),
        integrationTargets: v(spec?.domainSpecification?.industryProtocols, [])
      },
      functionalArchitecture: {
        modules: [], submodules: [], capabilities: [], services: [], components: [], forms: [], reports: [], dashboards: [], workflows: [], notifications: [], documents: [], search: true, analytics: true
      },
      dataArchitecture: {
        entities: [], relationships: [], schemas: [], databases: [], documentStorage: [], auditRecords: true, retention: "7y", backup: "daily", recovery: "standard", synchronization: "async"
      },
      integrationArchitecture: {
        jumoServices: [], internalProducts: [], externalApis: [], bankingSystems: false, governmentSystems: true, partnerSystems: false
      },
      aiArchitecture: {
        assignedAgents: [], agentResponsibilities: [], modelRequirements: "standard", ragRequirements: true, knowledgeSources: [], agentPermissions: [], humanApprovalPoints: [], aiSafetyBoundaries: [], auditRequirements: true
      },
      securityArchitecture: {
        authentication: "OIDC", authorization: "RBAC", rbac: true, mfa: true, zeroTrust: true, encryption: "AES-256", secrets: "Vault", keyManagement: "KMS", networkBoundaries: [], audit: true, threatMonitoring: true
      },
      deploymentArchitecture: {
        target: "Cloud", hybridMode: false, offlineCapability: false, privateInfrastructure: true, nodeRequirements: "standard", scaling: "auto", disasterRecovery: true, backup: "cloud", regionalDeployment: []
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    job.blueprint = blueprint;
    job.blueprintId = blueprint.id;

    const engineeringReport: EngineeringVerificationReport = {
      specification: {
        productName: job.productId,
        domain: job.ecosystem,
        requirements: ["Sovereign Compliance", "Experience Fidelity", "Architecture Consistency"]
      },
      expansion: {
        summary: `Full architecture expansion for ${blueprint.productIdentity.name}. Expanded into ${blueprint.manufacturingDirectives.requiredLayers.length} manufacturing layers.`,
        derivedRequirements: v(spec?.domainSpecification?.domainRequirements, []),
        domainDecomposition: blueprint.experienceArchitecture.portals.concat(blueprint.manufacturingDirectives.priorityModules)
      },
      architecture: {
        layers: blueprint.manufacturingDirectives.requiredLayers,
        patterns: ["Modular Monolith", "Experience-First Design"],
        securityModel: "Institutional RBAC with OAuth2/OIDC"
      },
      components: blueprint.manufacturingDirectives.priorityModules.map(m => ({
        id: `COMP-${m.substring(0, 3).toUpperCase()}`,
        name: m,
        type: "Microservice",
        responsibility: `Core ${m} operations`
      })),
      requirementsCoverage: [],
      dependencies: [
        { target: "JUMO-UEOS-Kernel", type: "RUNTIME", risk: "LOW" }
      ],
      risks: [
        { category: "COMPLIANCE", description: "Data sovereignty requirements", mitigation: "Encryption at rest and in transit with sovereign keys" }
      ],
      verificationPlan: ["Architecture Review", "Security Audit", "Experience QA"],
      manufacturingPlan: ["32-Stage Autonomous Factory Production"]
    };

    job.engineeringReport = engineeringReport;
  }

  private async executeBuildStage(job: ProductManufacturingJob) {
    const agent = this.resolveAgent('FACTORY', 'BUILD_ASSEMBLY');
    const artifact: ProductArtifactManifest = {
      artifactId: `ART-BUILD-${Date.now().toString(36).toUpperCase()}`,
      productId: job.productId,
      version: '1.0.0',
      type: 'BUILD_ARTIFACT',
      sourceJobId: job.jobId,
      sourceStage: 'BUILDING',
      content: { 
        productManifest: { name: 'DigitalProduct', version: '1.0.0' },
        applicationStructure: { modules: [], services: [] },
        deploymentMetadata: { region: 'JUMO-NODE-01' }
      },
      dependencies: [job.engineeringArtifactId || ''],
      integrityHash: `sha256:${Math.random().toString(36)}`,
      createdAt: new Date().toISOString(),
      status: 'VERIFIED',
      evidence: [{ agentId: agent.agentId, action: 'BUILD', result: 'SUCCESS' }]
    };

    if (!job.artifacts) job.artifacts = {};
    job.artifacts['BUILD'] = artifact;
    job.buildArtifactId = artifact.artifactId;
  }

  private async createRuntimeInstance(job: ProductManufacturingJob) {
    const defId = `DEF-${Date.now().toString(36).toUpperCase()}`;
    const definition: ProductInstanceDefinition = {
      instanceId: defId,
      id: defId,
      definitionId: defId,
      productId: job.productId,
      deploymentId: job.deploymentId || `DEP-AUTO-${job.jobId}`,
      buildArtifactId: job.buildArtifactId || '',
      certificationId: job.certificationId || '',
      version: job.version,
      manifest: job.artifacts?.['BUILD']?.content || {},
      configuration: {},
      config: {},
      endpoint: `https://${job.productId.toLowerCase()}.jumo.internal`,
      activatedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      status: 'PROVISIONED'
    };
    this.registry.registerInstanceDefinition(definition);

    const runtimeId = `RT-${Date.now().toString(36).toUpperCase()}`;
    const runtime: ProductInstanceDefinition = {
      instanceId: runtimeId,
      id: runtimeId,
      definitionId: defId,
      productId: job.productId,
      deploymentId: job.deploymentId || definition.deploymentId,
      jobId: job.jobId,
      environment: 'PRODUCTION',
      endpoint: definition.endpoint,
      status: 'RUNNING',
      config: {},
      configuration: {},
      telemetry: { status: 'HEALTHY', activeUsers: 0 },
      activatedAt: new Date().toISOString(),
      createdAt: new Date().toISOString()
    };
    this.registry.registerRuntimeInstance(runtime);
    
    job.runtimeInstanceId = runtimeId;
    this.registry.registerJob(job);
    console.log(`[ORCHESTRATOR] Runtime Instance ${runtimeId} activated for Product ${job.productId}`);
  }

  private resolveAgent(discipline: string, capability: string) {
    const agents = JumoAIAgentRegistry.getAllAgents();
    
    if (discipline === 'ARCHITECTURE') {
      const architect = agents.find(a => a.modelPolicy.preferredProvider === 'OPENAI' && a.division === 'ARCHITECTURE');
      if (architect) return architect;
    }

    if (discipline === 'SOFTWARE_ENGINEERING' || discipline === 'ENGINEERING') {
      const codex = agents.find(a => a.modelPolicy.preferredProvider === 'OPENAI_CODEX');
      if (codex) return codex;
      
      const gemini = agents.find(a => a.modelPolicy.preferredProvider === 'GOOGLE_GEMINI');
      if (gemini) return gemini;
    }

    if (discipline === 'TESTING_VERIFICATION') {
      const gemini = agents.find(a => a.modelPolicy.preferredProvider === 'GOOGLE_GEMINI' && a.division === 'TESTING_VERIFICATION');
      if (gemini) return gemini;
    }

    if (capability === 'GENERAL_REASONING') {
      const gpt = agents.find(a => a.jumoName.includes('JUMO GPT'));
      if (gpt) return gpt;
    }
    
    const qualified = agents.filter(a => a.division === (discipline as any) && a.capabilities.includes(capability));
    if (qualified.length > 0) return qualified[0];
    
    const fallback = agents.find(a => a.division === (discipline as any));
    return fallback || agents[0];
  }

  private async handleLifecycleEvent(event: any) {
    // Advanced hooks for live events
  }
}
