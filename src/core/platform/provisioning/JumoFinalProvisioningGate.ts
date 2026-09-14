export interface JumoProvisioningReadiness {
  specificationApproved: boolean;
  configurationValid: boolean;
  integrationsValid: boolean;
  verificationPassed: boolean;
  testsPassed: boolean;
  architectureValid: boolean;
}

export class JumoFinalProvisioningGate {

  evaluate(
    readiness: JumoProvisioningReadiness
  ) {
    const checks = Object.entries(
      readiness
    );

    const failed =
      checks
        .filter(
          ([, passed]) => !passed
        )
        .map(
          ([name]) => name
        );

    return {
      ready:
        failed.length === 0,

      failedChecks: failed,

      installationAllowed:
        failed.length === 0,

      provisioningAllowed:
        failed.length === 0,
    };
  }
}

export const JUMO_FINAL_PROVISIONING_GATE =
  new JumoFinalProvisioningGate();
