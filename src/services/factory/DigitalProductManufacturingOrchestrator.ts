import { 
  ManufacturingJob, 
  ManufacturingJobStatus, 
  ArchitectureContract,
  ManufacturingCategory
} from "../../core/factory/registry/HubRegistryTypes";
import { SovereignGovernanceRegistry } from "../gov/SovereignGovernanceRegistry";
import { ManufacturingEngine } from "./ManufacturingEngine";
import { ArchitectureEngine } from "../architecture/ArchitectureEngine";
import { JumoEventBus } from "../../core/common/events/JumoEventBus";

export class DigitalProductManufacturingOrchestrator {
  private static instance: DigitalProductManufacturingOrchestrator;
  private registry = SovereignGovernanceRegistry.getInstance();
  private manufacturingEngine = ManufacturingEngine.getInstance();
  private architectureEngine = ArchitectureEngine.getInstance();

  private constructor() {
    this.setupEventListeners();
  }

  public static getInstance(): DigitalProductManufacturingOrchestrator {
    if (!DigitalProductManufacturingOrchestrator.instance) {
      DigitalProductManufacturingOrchestrator.instance = new DigitalProductManufacturingOrchestrator();
    }
    return DigitalProductManufacturingOrchestrator.instance;
  }

  private setupEventListeners() {
    JumoEventBus.subscribe("PRODUCT_SUBMITTED", async (event: any) => {
      await this.initiateManufacturingLifecycle(event.productId, event.specification);
    });

    JumoEventBus.subscribe("STAGE_COMPLETED", async (event: any) => {
      await this.evaluateTransition(event.jobId);
    });

    JumoEventBus.subscribe("HUMAN_APPROVAL_GRANTED", async (event: any) => {
      await this.resumeJob(event.jobId);
    });
  }

  public async initiateManufacturingLifecycle(productId: string, spec: any): Promise<string> {
    const job: ManufacturingJob = {
      id: `job-${Math.random().toString(36).substr(2, 9)}`,
      architectureId: "",
      productId,
      ecosystem: spec.ecosystem as ManufacturingCategory,
      version: "1.0.0",
      status: "DIGITAL_INTAKE",
      progress: 0,
      assignedWorkforce: [],
      repository: "",
      branch: "main",
      commitSha: "",
      evidence: [],
      logs: [`Job initiated for product: ${productId}`],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    this.registry.registerJob(job);
    
    // Start the process
    setTimeout(() => this.executeStage(job.id, "DIGITAL_INTAKE"), 0);
    
    return job.id;
  }

  private async executeStage(jobId: string, stage: ManufacturingJobStatus) {
    const job = this.registry.getJob(jobId);
    if (!job) return;

    console.log(`[ORCHESTRATOR] Executing stage: ${stage} for job: ${jobId}`);
    
    this.registry.updateJobStatus(jobId, stage);
    this.registry.addJobLog(jobId, `[SOVEREIGN ORCHESTRATOR] Entering Stage: ${stage}`);

    try {
      switch (stage) {
        case "DIGITAL_INTAKE":
          await this.handleIntake(jobId);
          break;
        case "SPECIFICATION_NORMALIZATION":
          await this.handleNormalization(jobId);
          break;
        case "ARCHITECTURE_DISCOVERY":
          await this.handleArchitectureDiscovery(jobId);
          break;
        case "ARCHITECTURE_EXPANSION":
          await this.handleArchitectureExpansion(jobId);
          break;
        case "ARCHITECTURE_VERIFICATION":
          await this.handleArchitectureVerification(jobId);
          break;
        case "ARCHITECTURE_CONTRACT_GENERATION":
          await this.handleContractGeneration(jobId);
          break;
        case "HUMAN_ARCHITECT_APPROVAL":
          // Pause here for human interaction
          this.registry.addJobLog(jobId, "WAITING FOR AUTHORITATIVE HUMAN APPROVAL. ARCHITECTURE LOCKED.");
          return;
        case "WORKFORCE_ORCHESTRATION":
          await this.handleWorkforceOrchestration(jobId);
          break;
        case "REQUIREMENTS_DECOMPOSITION":
          await this.handleRequirementsDecomposition(jobId);
          break;
        case "SOURCE_AND_ARTIFACT_GENERATION":
          await this.handleManufacturing(jobId);
          break;
        case "COMPILATION":
          await this.handleCompilation(jobId);
          break;
        case "BUILD_ASSEMBLY":
          await this.handleBuildAssembly(jobId);
          break;
        case "DEPLOYMENT_AND_PUBLISHING":
          await this.handleDeployment(jobId);
          break;
        case "RUNTIME_ACTIVATION_AND_CONTINUOUS_AUDIT":
          await this.handleRuntimeActivation(jobId);
          break;
        default:
          // Standard progression for intermediate stages
          await this.simulateStageWork(jobId, stage);
          break;
      }

      // Automatically transition to next stage if applicable
      await this.evaluateTransition(jobId);
    } catch (error: any) {
      this.registry.updateJobStatus(jobId, "FAILED");
      this.registry.addJobLog(jobId, `CRITICAL SYSTEM FAILURE in stage ${stage}: ${error.message}`);
    }
  }

  private async evaluateTransition(jobId: string) {
    const job = this.registry.getJob(jobId);
    if (!job || job.status === "FAILED" || job.status === "BLOCKED") return;

    const nextStage = this.getNextStage(job.status);
    if (nextStage) {
      await this.executeStage(jobId, nextStage);
    } else {
      this.registry.addJobLog(jobId, "Manufacturing lifecycle complete.");
    }
  }

  private getNextStage(current: ManufacturingJobStatus): ManufacturingJobStatus | null {
    const stages: ManufacturingJobStatus[] = [
      "DIGITAL_INTAKE",
      "SPECIFICATION_NORMALIZATION",
      "PLATFORM_INSTANCE_DEFINITION",
      "PROVISIONING",
      "ARCHITECTURE_DISCOVERY",
      "ARCHITECTURE_EXPANSION",
      "ARCHITECTURE_VERIFICATION",
      "ARCHITECTURE_CONTRACT_GENERATION",
      "HUMAN_ARCHITECT_APPROVAL",
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
      "CERTIFICATION_AND_HUMAN_ACCEPTANCE",
      "DEPLOYMENT_AND_PUBLISHING",
      "RUNTIME_ACTIVATION_AND_CONTINUOUS_AUDIT"
    ];

    const index = stages.indexOf(current);
    if (index >= 0 && index < stages.length - 1) {
      return stages[index + 1];
    }
    return null;
  }

  private async resumeJob(jobId: string) {
    const job = this.registry.getJob(jobId);
    if (job && job.status === "HUMAN_ARCHITECT_APPROVAL") {
      await this.evaluateTransition(jobId);
    }
  }

  // --- Stage Handlers ---

  private async handleIntake(jobId: string) {
    this.registry.addJobLog(jobId, "Ingesting digital specification into sovereign vault...");
    await new Promise(r => setTimeout(r, 1000));
    this.registry.updateJobProgress(jobId, 3);
  }

  private async handleNormalization(jobId: string) {
    this.registry.addJobLog(jobId, "Normalizing specification against national standards...");
    await new Promise(r => setTimeout(r, 1500));
    this.registry.updateJobProgress(jobId, 6);
  }

  private async handleArchitectureDiscovery(jobId: string) {
    const job = this.registry.getJob(jobId);
    if (!job) return;
    
    const contract = await this.architectureEngine.generateInitialContract(jobId, job.productId);
    this.registry.updateJobArchitecture(jobId, contract.id);
    this.registry.updateJobProgress(jobId, 9);
  }

  private async handleArchitectureExpansion(jobId: string) {
    const job = this.registry.getJob(jobId);
    if (!job || !job.architectureId) return;
    
    await this.architectureEngine.expandArchitecture(jobId, job.architectureId);
    this.registry.updateJobProgress(jobId, 15);
  }

  private async handleArchitectureVerification(jobId: string) {
    const job = this.registry.getJob(jobId);
    if (!job || !job.architectureId) return;
    
    await this.architectureEngine.verifyArchitecture(jobId, job.architectureId);
    this.registry.updateJobProgress(jobId, 21);
  }

  private async handleContractGeneration(jobId: string) {
    this.registry.addJobLog(jobId, "Generating final architecture contract evidence...");
    await new Promise(r => setTimeout(r, 1000));
    this.registry.updateJobProgress(jobId, 25);
  }

  private async handleWorkforceOrchestration(jobId: string) {
    this.registry.addJobLog(jobId, "Orchestrating AI workforce swarms for implementation...");
    await new Promise(r => setTimeout(r, 1000));
    this.registry.updateJobProgress(jobId, 31);
  }

  private async handleRequirementsDecomposition(jobId: string) {
    this.registry.addJobLog(jobId, "Decomposing high-level architecture into executable agent tasks...");
    await new Promise(r => setTimeout(r, 1000));
    this.registry.updateJobProgress(jobId, 34);
  }

  private async handleManufacturing(jobId: string) {
    const job = this.registry.getJob(jobId);
    if (!job) return;
    
    this.registry.addJobLog(jobId, "Initiating core manufacturing engine...");
    await this.manufacturingEngine.executeManufacturing(jobId);
    this.registry.updateJobProgress(jobId, 68);
  }

  private async handleCompilation(jobId: string) {
    this.registry.addJobLog(jobId, "Compiling enterprise artifacts into executable binaries...");
    await new Promise(r => setTimeout(r, 2000));
    this.registry.updateJobProgress(jobId, 71);
  }

  private async handleBuildAssembly(jobId: string) {
    this.registry.addJobLog(jobId, "Assembling build containers for sovereign deployment...");
    await new Promise(r => setTimeout(r, 2000));
    this.registry.updateJobProgress(jobId, 75);
  }

  private async handleDeployment(jobId: string) {
    this.registry.addJobLog(jobId, "Publishing artifacts to national container registry...");
    await new Promise(r => setTimeout(r, 2000));
    this.registry.updateJobProgress(jobId, 96);
  }

  private async handleRuntimeActivation(jobId: string) {
    this.registry.addJobLog(jobId, "Activating product runtime. Beginning continuous audit loop.");
    await new Promise(r => setTimeout(r, 1000));
    this.registry.updateJobProgress(jobId, 100);
  }

  private async simulateStageWork(jobId: string, stage: string) {
    // Simulate cognitive workforce activity
    await new Promise(r => setTimeout(r, 800));
    this.registry.addJobLog(jobId, `Stage ${stage} processed by cognitive workforce.`);
  }
}
