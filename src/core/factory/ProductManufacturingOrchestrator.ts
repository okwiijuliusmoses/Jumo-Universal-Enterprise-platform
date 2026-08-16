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
        if (job) await this.transition(job, 'ARCHITECTURE_APPROVED', 'COMPLETE_ARCHITECTURE', payload); // Simplified for now, usually goes to AWAITING_APPROVAL
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
        if (job) await this.transition(job, 'MANUFACTURING_EXECUTION', 'START_MANUFACTURING', payload);
        break;
      case 'COMPLETE_MANUFACTURING':
        if (job) await this.transition(job, 'MANUFACTURING_VERIFIED', 'COMPLETE_MANUFACTURING', payload);
        break;
      case 'START_BUILD':
        if (job) await this.transition(job, 'BUILDING', 'START_BUILD', payload);
        break;
      case 'COMPLETE_BUILD':
        if (job) await this.transition(job, 'BUILD_VERIFIED', 'COMPLETE_BUILD', payload);
        break;
      case 'VERIFY_PRODUCT':
        if (job) await this.transition(job, 'PRODUCT_ASSURANCE', 'VERIFY_PRODUCT', payload);
        break;
      case 'CERTIFY_PRODUCT':
        if (job) await this.transition(job, 'CERTIFIED', 'CERTIFY_PRODUCT', payload);
        break;
      case 'PROVISION_PRODUCT':
        if (job) await this.transition(job, 'PROVISIONING', 'PROVISION_PRODUCT', payload);
        break;
      case 'DEPLOY_PRODUCT':
        if (job) await this.transition(job, 'DEPLOYMENT', 'DEPLOY_PRODUCT', payload);
        break;
      case 'ACTIVATE_RUNTIME':
        if (job) await this.transition(job, 'OPERATING', 'ACTIVATE_RUNTIME', payload);
        break;
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
    
    // Idempotency check
    const existingJobs = Array.from(this.registry.getAllJobs()).filter(j => (j as ProductManufacturingJob).idempotencyKey === idempotencyKey);
    if (idempotencyKey && existingJobs.length > 0) {
      console.log(`[ORCHESTRATOR] Idempotent request for specification: ${specificationId}. Returning existing job.`);
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
      currentLifecycleState: 'SPECIFICATION_APPROVED',
      currentGlobalStage: 'Intake',
      currentManufacturingStage: 'SPECIFICATION_MAPPING',
      progress: 5,
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
      stageStates: { 'SPECIFICATION_APPROVED': 'COMPLETED' },
      artifacts: {},
      approvalStates: {},
      agentAssignments: {},
      providerAssignments: {},
      verificationEvidence: [],
      errors: [],
      timestamps: { 'SPECIFICATION_APPROVED': new Date().toISOString() },
      reviewGates: [],
      config: { specification: payload.specification }
    };

    this.registry.registerJob(job);
    await this.transition(job, 'SPECIFICATION_NORMALIZED', 'SUBMIT_SPECIFICATION', payload);
    return job;
  }

  private lifecycleToExecutionMap: Record<string, ManufacturingJobStatus> = {
    'SPECIFICATION_DRAFT': 'DIGITAL_INTAKE',
    'SPECIFICATION_NORMALIZED': 'SPECIFICATION_MAPPING',
    'REQUIREMENTS_VALIDATED': 'REQUIREMENTS_NORMALIZATION',
    'AWAITING_SPECIFICATION_APPROVAL': 'GOVERNANCE_POLICY_MAPPING',
    'SPECIFICATION_APPROVED': 'PROVISIONING',
    'ARCHITECTURE_INTAKE': 'ARCHITECTURE_DISCOVERY',
    'ARCHITECTURAL_EXPANSION': 'ARCHITECTURE_EXPANSION',
    'AWAITING_ARCHITECTURE_APPROVAL': 'HUMAN_ARCHITECT_APPROVAL',
    'ARCHITECTURE_APPROVED': 'ARCHITECTURE_CONTRACT_GENERATION',
    'ENGINEERING_INTAKE': 'WORKFORCE_ORCHESTRATION',
    'ENGINEERING_IMPLEMENTATION': 'APPLICATION_ENGINEERING',
    'ENGINEERING_VERIFIED': 'APPLICATION_COMPLETENESS_VERIFICATION',
    'FACTORY_READY': 'DEPENDENCY_RESOLUTION',
    'MANUFACTURING_EXECUTION': 'SOURCE_AND_ARTIFACT_GENERATION',
    'MANUFACTURING_VERIFIED': 'COMPILATION',
    'BUILDING': 'BUILD_ASSEMBLY',
    'BUILD_VERIFIED': 'UNIT_TESTING',
    'PRODUCT_ASSURANCE': 'SECURITY_AND_ZERO_TRUST_VERIFICATION',
    'CERTIFICATION': 'CERTIFICATION_AND_HUMAN_ACCEPTANCE',
    'CERTIFIED': 'CERTIFICATION_ACCEPTANCE',
    'PROVISIONING': 'PROVISIONING',
    'DEPLOYMENT': 'DEPLOYMENT_AND_PUBLISHING',
    'RUNTIME_READY': 'PUBLISHING_ACTIVATION',
    'OPERATING': 'RUNTIME_ACTIVATION_AND_CONTINUOUS_AUDIT',
    'FAILED': 'FAILED'
  };

  private async transition(job: ProductManufacturingJob, nextState: ProductLifecycleState, transitionName: string, evidence: any) {
    console.log(`[ORCHESTRATOR] Transitioning Job ${job.jobId} from ${job.currentLifecycleState} to ${nextState} via ${transitionName}`);
    
    // Validation
    if (job.currentLifecycleState === 'FAILED' && nextState !== 'SPECIFICATION_DRAFT') {
       // Allow retry from start
    }

    job.currentLifecycleState = nextState;
    job.status = this.lifecycleToExecutionMap[nextState] || job.status;
    job.updatedAt = new Date().toISOString();
    
    if (!job.stageStates) job.stageStates = {};
    job.stageStates[nextState] = 'RUNNING';
    if (!job.timestamps) job.timestamps = {};
    job.timestamps[nextState] = job.updatedAt;
    
    this.registry.registerJob(job); // Update registry

    JumoEventBus.publish("LIFECYCLE_EVENT", {
      type: 'STATE_TRANSITION',
      jobId: job.jobId,
      from: job.currentLifecycleState,
      to: nextState,
      status: job.status,
      transition: transitionName,
      timestamp: job.updatedAt
    });

    // Automatic orchestration of next steps
    await this.autoOrchestrate(job);
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

  private async autoOrchestrate(job: ProductManufacturingJob) {
    switch (job.currentLifecycleState) {
      case 'SPECIFICATION_NORMALIZED':
        await this.transition(job, 'REQUIREMENTS_VALIDATED', 'AUTO_VALIDATE', { system: 'JUMO_VALIDATOR' });
        break;
      case 'REQUIREMENTS_VALIDATED':
        await this.transition(job, 'AWAITING_SPECIFICATION_APPROVAL', 'AUTO_REQUEST_APPROVAL', { role: 'GOVERNANCE_OFFICER' });
        break;
      case 'SPECIFICATION_APPROVED':
        await this.transition(job, 'ARCHITECTURE_INTAKE', 'AUTO_START_ARCHITECTURE', {});
        break;
      case 'ARCHITECTURE_INTAKE':
        // Now performs full Architecture & Engineering Expansion
        await this.executeArchitectureAndEngineeringExpansion(job);
        break;
      case 'AWAITING_HUMAN_ENGINEERING_APPROVAL':
        // STOP: Wait for human decision
        console.log(`[ORCHESTRATOR] Job ${job.jobId} is parked at AWAITING_HUMAN_ENGINEERING_APPROVAL`);
        break;
      case 'ENGINEERING_APPROVED':
        await this.transition(job, 'ENGINEERING_INTAKE', 'AUTO_START_ENGINEERING', {});
        break;
      case 'ENGINEERING_REJECTED':
        console.log(`[ORCHESTRATOR] Job ${job.jobId} rejected at Engineering. Requires reconciliation.`);
        break;
      case 'ARCHITECTURE_APPROVED':
        await this.transition(job, 'ENGINEERING_INTAKE', 'AUTO_START_ENGINEERING', {});
        break;
      case 'ENGINEERING_INTAKE':
        await this.executeEngineeringStage(job);
        break;
      case 'ENGINEERING_VERIFIED':
        await this.transition(job, 'FACTORY_READY', 'AUTO_READY_FOR_FACTORY', {});
        break;
      case 'FACTORY_READY':
        // Initialize the 32-stage progress
        job.currentManufacturingStage = "1";
        job.progress = 30;
        await this.transition(job, 'MANUFACTURING_EXECUTION', 'AUTO_START_MANUFACTURING', {});
        break;
      case 'MANUFACTURING_EXECUTION':
        // Instead of executing all at once, we should execute one stage if it's automated
        await this.executeManufacturingStage(job);
        break;
      case 'AWAITING_HUMAN_MANUFACTURING_APPROVAL':
        // STOP: Wait for final assembly review
        console.log(`[ORCHESTRATOR] Job ${job.jobId} is parked at AWAITING_HUMAN_MANUFACTURING_APPROVAL`);
        break;
      case 'MANUFACTURING_APPROVED':
        await this.transition(job, 'MANUFACTURING_VERIFIED', 'APPROVE_MANUFACTURING', {});
        break;
      case 'MANUFACTURING_VERIFIED':
        await this.transition(job, 'BUILDING', 'AUTO_START_BUILD', {});
        break;
      case 'BUILDING':
        await this.executeBuildStage(job);
        break;
      case 'BUILD_VERIFIED':
        await this.transition(job, 'PRODUCT_ASSURANCE', 'AUTO_START_ASSURANCE', {});
        break;
      case 'PRODUCT_ASSURANCE':
        await this.transition(job, 'CERTIFICATION', 'AUTO_START_CERTIFICATION', {});
        break;
      case 'CERTIFICATION':
        await this.transition(job, 'CERTIFIED', 'AUTO_CERTIFY', {});
        break;
      case 'CERTIFIED':
        await this.transition(job, 'PROVISIONING', 'AUTO_START_PROVISIONING', {});
        break;
      case 'PROVISIONING':
        await this.transition(job, 'DEPLOYMENT', 'AUTO_START_DEPLOYMENT', {});
        break;
      case 'DEPLOYMENT':
        await this.transition(job, 'RUNTIME_READY', 'AUTO_READY_RUNTIME', {});
        break;
      case 'RUNTIME_READY':
        await this.transition(job, 'OPERATING', 'AUTO_ACTIVATE', {});
        break;
      case 'OPERATING':
        await this.createRuntimeInstance(job);
        break;
    }
  }

  private async executeArchitectureAndEngineeringExpansion(job: ProductManufacturingJob) {
    const agent = this.resolveAgent('ARCHITECTURE', 'SYSTEM_DESIGN');
    console.log(`[ORCHESTRATOR] Expanding Architecture & Engineering for Job ${job.jobId}`);
    
    const spec = job.config?.specification as ImplementationGradeSpecificationContract;
    
    // Helper to extract value from TraceableValue
    const v = <T>(tv: any, defaultValue: T): T => {
      if (!tv) return defaultValue;
      if (typeof tv === 'object' && 'value' in tv) return tv.value;
      return tv as T;
    };

    // 1. Digital Product Experience Blueprint Generation
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

    // 2. Architectural Blueprint Generation
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

    // 3. Engineering Report Synthesis
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
    
    // Create the Review Gate
    const gateId = `GATE-ENG-${Date.now().toString(36).toUpperCase()}`;
    const gate: ReviewGate = {
      id: gateId,
      jobId: job.jobId,
      lifecycleStage: 'ARCHITECTURE_INTAKE',
      gateType: 'ENGINEERING_APPROVAL',
      status: 'PENDING',
      artifactRefs: [blueprint.id, experienceBlueprint.id],
      evidenceRefs: [],
      createdAt: new Date().toISOString(),
      revision: 1
    };

    if (!job.reviewGates) job.reviewGates = [];
    job.reviewGates.push(gate);

    await this.transition(job, 'AWAITING_HUMAN_ENGINEERING_APPROVAL', 'COMPLETE_ARCHITECTURE_EXPANSION', { gateId });
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

    if (gate.gateType === 'ENGINEERING_APPROVAL') {
      if (decision === 'APPROVE') {
        await this.transition(job, 'ENGINEERING_APPROVED', 'HUMAN_APPROVAL_GRANTED', { gateId });
      } else {
        await this.transition(job, 'ENGINEERING_REJECTED', 'HUMAN_REJECTION', { gateId });
      }
    } else if (gate.gateType === 'FINAL_ASSEMBLY_APPROVAL') {
      if (decision === 'APPROVE') {
        await this.transition(job, 'MANUFACTURING_APPROVED', 'HUMAN_APPROVAL_GRANTED', { gateId });
      } else {
        await this.transition(job, 'MANUFACTURING_REJECTED', 'HUMAN_REJECTION', { gateId });
      }
    }

    this.registry.registerJob(job);
  }

  private async executeManufacturingStage(job: ProductManufacturingJob) {
    const currentStage = parseInt(job.currentManufacturingStage || "1");
    console.log(`[ORCHESTRATOR] Executing Manufacturing Stage ${currentStage}/32 for Job ${job.jobId}`);
    
    // Simulate stage work
    await new Promise(resolve => setTimeout(resolve, 500));
    
    job.progress = 30 + Math.floor((currentStage / 32) * 50);
    
    if (currentStage < 32) {
      job.currentManufacturingStage = (currentStage + 1).toString();
      this.registry.registerJob(job);
      // Continue to next stage automatically for now, or could pause if we wanted per-stage gating
      await this.autoOrchestrate(job);
    } else {
      // Completed all 32 stages
      console.log(`[ORCHESTRATOR] Completed all 32 manufacturing stages for Job ${job.jobId}. Awaiting final assembly review.`);
      
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
      
      await this.transition(job, 'AWAITING_HUMAN_MANUFACTURING_APPROVAL', 'COMPLETE_32_STAGES', { gateId });
    }
  }

  private async executeBuildStage(job: ProductManufacturingJob) {
    if (!job.artifacts?.['MANUFACTURING']) {
       console.error(`[ORCHESTRATOR] Build blocked: Missing Manufacturing Artifact`);
       return;
    }

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
      dependencies: [job.manufacturingArtifactId || ''],
      integrityHash: `sha256:${Math.random().toString(36)}`,
      createdAt: new Date().toISOString(),
      status: 'VERIFIED',
      evidence: [{ agentId: agent.agentId, action: 'BUILD', result: 'SUCCESS' }]
    };

    if (!job.artifacts) job.artifacts = {};
    job.artifacts['BUILD'] = artifact;
    job.buildArtifactId = artifact.artifactId;

    await this.transition(job, 'BUILD_VERIFIED', 'COMPLETE_BUILD', { artifactId: artifact.artifactId });
  }

  private resolveAgent(discipline: string, capability: string) {
    const agents = JumoAIAgentRegistry.getAllAgents();
    
    // Authoritative Provider Fabric Selection
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
    
    // Fallback to division and capability filter
    const qualified = agents.filter(a => a.division === (discipline as any) && a.capabilities.includes(capability));
    if (qualified.length > 0) return qualified[0];
    
    // Final fallback
    const fallback = agents.find(a => a.division === (discipline as any));
    return fallback || agents[0];
  }

  private async executeEngineeringStage(job: ProductManufacturingJob) {
    const agent = this.resolveAgent('ENGINEERING', 'CODE_GENERATION');
    console.log(`[ORCHESTRATOR] Engineering Stage: Assigned Agent ${agent.agentId} via ${agent.modelPolicy.provider}`);

    const artifact: ProductArtifactManifest = {
      artifactId: `ART-ENG-${Date.now().toString(36).toUpperCase()}`,
      productId: job.productId,
      version: '1.0.0',
      type: 'ENGINEERING_ARTIFACT',
      sourceJobId: job.jobId,
      sourceStage: 'ENGINEERING_IMPLEMENTATION',
      content: { components: ['CoreModule', 'SecurityGateway'], routes: 50 },
      dependencies: [job.blueprintId || ''],
      integrityHash: `sha256:${Math.random().toString(36)}`,
      createdAt: new Date().toISOString(),
      status: 'VERIFIED',
      evidence: [{ agentId: agent.agentId, action: 'IMPLEMENTATION', result: 'SUCCESS' }]
    };

    if (!job.artifacts) job.artifacts = {};
    job.artifacts['ENGINEERING'] = artifact;
    job.engineeringArtifactId = artifact.artifactId;

    await this.transition(job, 'ENGINEERING_VERIFIED', 'COMPLETE_ENGINEERING', { artifactId: artifact.artifactId });
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

  private async handleLifecycleEvent(event: any) {
    // This could trigger more automation or external integrations
  }
}
