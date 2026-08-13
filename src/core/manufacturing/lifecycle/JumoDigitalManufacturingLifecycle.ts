import {
  JumoDigitalSpecificationEngine,
} from '../specification/JumoDigitalSpecificationEngine';
import {
  JumoAISpecificationArchitect,
} from '../ai/JumoAISpecificationArchitect';
import {
  JumoApplicationTestingEngine,
} from '../testing/JumoApplicationTestingEngine';
import {
  JumoEndToEndTestingEngine,
} from '../testing/JumoEndToEndTestingEngine';
import {
  JumoVerificationDetectionRegistry,
} from '../quality/JumoVerificationDetectionRegistry';
import {
  JumoCloudQualityProvisioningEngine,
} from '../quality/JumoCloudQualityProvisioningEngine';
import {
  JumoEngineerAssignmentEngine,
} from '../engineering/JumoEngineerAssignmentEngine';

export interface ManufacturingLifecycleState {
  productId: string;
  specificationId?: string;
  architectureId?: string;
  applicationTestRunId?: string;
  endToEndTestRunId?: string;
  provisioningRequestId?: string;
  stage:
    | 'SPECIFICATION'
    | 'ARCHITECTURE'
    | 'MANUFACTURING'
    | 'TESTING'
    | 'VERIFICATION'
    | 'ENGINEER_REVIEW'
    | 'ACCEPTANCE'
    | 'PROVISIONING'
    | 'OPERATIONS'
    | 'UPGRADE'
    | 'RETIREMENT';
  status:
    | 'ACTIVE'
    | 'BLOCKED'
    | 'READY'
    | 'COMPLETED';
  updatedAt: string;
}

export class JumoDigitalManufacturingLifecycle {
  private readonly lifecycles =
    new Map<string, ManufacturingLifecycleState>();

  constructor(
    private readonly specificationEngine: JumoDigitalSpecificationEngine,
    private readonly architectureArchitect: JumoAISpecificationArchitect,
    private readonly applicationTestingEngine: JumoApplicationTestingEngine,
    private readonly endToEndTestingEngine: JumoEndToEndTestingEngine,
    private readonly detectionRegistry: JumoVerificationDetectionRegistry,
    private readonly engineerAssignmentEngine: JumoEngineerAssignmentEngine,
    private readonly provisioningEngine: JumoCloudQualityProvisioningEngine,
  ) {}

  begin(productId: string): ManufacturingLifecycleState {
    const state: ManufacturingLifecycleState = {
      productId,
      stage: 'SPECIFICATION',
      status: 'ACTIVE',
      updatedAt: new Date().toISOString(),
    };

    this.lifecycles.set(productId, state);
    return state;
  }

  attachSpecification(
    productId: string,
    specificationId: string,
  ): ManufacturingLifecycleState {
    const state = this.require(productId);

    if (!this.specificationEngine.get(specificationId)) {
      throw new Error(`Specification not found: ${specificationId}`);
    }

    state.specificationId = specificationId;
    state.stage = 'SPECIFICATION';
    state.updatedAt = new Date().toISOString();

    return state;
  }

  generateArchitecture(
    productId: string,
  ): ManufacturingLifecycleState {
    const state = this.require(productId);

    if (!state.specificationId) {
      throw new Error(
        `Product ${productId} has no specification attached.`,
      );
    }

    const blueprint = this.architectureArchitect.generate(
      state.specificationId,
    );

    state.architectureId = blueprint.id;
    state.stage = 'ARCHITECTURE';
    state.updatedAt = new Date().toISOString();

    return state;
  }

  createApplicationTestRun(
    productId: string,
  ): ManufacturingLifecycleState {
    const state = this.require(productId);

    const run = this.applicationTestingEngine.createRun(productId);

    state.applicationTestRunId = run.id;
    state.stage = 'TESTING';
    state.updatedAt = new Date().toISOString();

    return state;
  }

  createEndToEndTestRun(
    productId: string,
  ): ManufacturingLifecycleState {
    const state = this.require(productId);

    const run = this.endToEndTestingEngine.createRun(productId);

    state.endToEndTestRunId = run.id;
    state.stage = 'TESTING';
    state.updatedAt = new Date().toISOString();

    return state;
  }

  authorizeProvisioning(
    productId: string,
    verificationId: string,
    verificationPassed: boolean,
  ): ManufacturingLifecycleState {
    const state = this.require(productId);

    if (!verificationPassed) {
      state.status = 'BLOCKED';
      state.stage = 'VERIFICATION';
      state.updatedAt = new Date().toISOString();

      throw new Error(
        `Provisioning blocked: product ${productId} has not passed verification.`,
      );
    }

    if (!state.architectureId) {
      throw new Error(
        `Provisioning blocked: product ${productId} has no approved architecture.`,
      );
    }

    const request = this.provisioningEngine.createRequest(
      productId,
      verificationId,
      true,
    );

    state.provisioningRequestId = request.id;
    state.stage = 'PROVISIONING';
    state.status = 'READY';
    state.updatedAt = new Date().toISOString();

    return state;
  }

  require(productId: string): ManufacturingLifecycleState {
    const state = this.lifecycles.get(productId);

    if (!state) {
      throw new Error(
        `Manufacturing lifecycle not found: ${productId}`,
      );
    }

    return state;
  }

  list(): ManufacturingLifecycleState[] {
    return Array.from(this.lifecycles.values());
  }

  registryStatus() {
    return {
      detectionCount: this.detectionRegistry.count(),
      automatedDetections:
        this.detectionRegistry.automated().length,
      blockingDetections:
        this.detectionRegistry.blocking().length,
      engineerFamilies:
        this.engineerAssignmentEngine.listEngineerFamilies().length,
      lifecycleCount: this.lifecycles.size,
    };
  }
}
