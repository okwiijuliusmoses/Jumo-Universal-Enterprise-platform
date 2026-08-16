import { registerJumoManufacturingCatalog } from './JumoManufacturingCatalog';

import {
  JUMO_DIGITAL_SPECIFICATION_ENGINE,
} from './specification/JumoDigitalSpecificationEngine';
import {
  JumoAISpecificationArchitect,
} from './ai/JumoAISpecificationArchitect';
import {
  JUMO_APPLICATION_TESTING_ENGINE,
  JumoApplicationTestingEngine,
} from './testing/JumoApplicationTestingEngine';
import {
  JumoEndToEndTestingEngine,
} from './testing/JumoEndToEndTestingEngine';
import {
  JUMO_VERIFICATION_DETECTION_REGISTRY,
} from './quality/JumoVerificationDetectionRegistry';
import {
  JUMO_ENGINEER_ASSIGNMENT_ENGINE,
} from './engineering/JumoEngineerAssignmentEngine';
import {
  JUMO_CLOUD_QUALITY_PROVISIONING_ENGINE,
} from './quality/JumoCloudQualityProvisioningEngine';
import {
  JumoDigitalManufacturingLifecycle,
} from './lifecycle/JumoDigitalManufacturingLifecycle';

export class JumoDigitalManufacturingPlatform {
  private catalogStats: ReturnType<typeof registerJumoManufacturingCatalog> | null = null;

  private catalogInitialized = false;

  readonly specification =
    JUMO_DIGITAL_SPECIFICATION_ENGINE;

  readonly architecture =
    new JumoAISpecificationArchitect(this.specification);

  readonly applicationTesting =
    JUMO_APPLICATION_TESTING_ENGINE;

  readonly endToEndTesting =
    new JumoEndToEndTestingEngine(
      this.applicationTesting,
    );

  readonly detections =
    JUMO_VERIFICATION_DETECTION_REGISTRY;

  readonly engineers =
    JUMO_ENGINEER_ASSIGNMENT_ENGINE;

  readonly cloudProvisioning =
    JUMO_CLOUD_QUALITY_PROVISIONING_ENGINE;

  readonly lifecycle =
    new JumoDigitalManufacturingLifecycle(
      this.specification,
      this.architecture,
      this.applicationTesting,
      this.endToEndTesting,
      this.detections,
      this.engineers,
      this.cloudProvisioning,
    );

  initializeCatalog() {
    if (!this.catalogInitialized) {
      this.catalogStats = registerJumoManufacturingCatalog(
        this.detections,
        this.engineers,
        this.applicationTesting,
        this.endToEndTesting,
        this.cloudProvisioning,
        this.specification,
      );

      this.catalogInitialized = true;
    }

    return this.catalogStats;
  }

  status() {
    this.initializeCatalog();

    return {
      specificationSchemas:
        this.specification.listSchemas().length,

      architectureBlueprints:
        this.architecture.list().length,

      applicationTestDefinitions:
        this.applicationTesting.listDefinitions().length,

      e2eScenarios:
        this.endToEndTesting.listScenarios().length,

      verificationDetections:
        this.detections.count(),

      automatedDetections:
        this.detections.automated().length,

      blockingDetections:
        this.detections.blocking().length,

      engineerFamilies:
        this.engineers.listEngineerFamilies().length,

      provisioningRequirements:
        this.cloudProvisioning.listRequirements().length,

      lifecycleProducts:
        this.lifecycle.list().length,
    };
  }
}

export const JUMO_DIGITAL_MANUFACTURING_PLATFORM =
  new JumoDigitalManufacturingPlatform();
