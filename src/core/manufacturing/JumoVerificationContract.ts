export type JumoVerificationStatus =
  | 'PENDING'
  | 'RUNNING'
  | 'PASSED'
  | 'FAILED'
  | 'BLOCKED';

export interface JumoVerificationRequirement {
  id: string;

  familyId: string;

  name: string;

  description: string;

  mandatory: boolean;

  blocking: boolean;

  engineerRoles: string[];

  tests: string[];

  evidenceRequired: boolean;
}

export interface JumoVerificationResult {
  requirementId: string;

  status: JumoVerificationStatus;

  passedTests: string[];

  failedTests: string[];

  evidence: string[];

  engineer?: string;

  notes?: string;
}

export interface JumoVerificationContract {
  productId: string;

  requirements: JumoVerificationRequirement[];

  results: JumoVerificationResult[];

  approved: boolean;
}

export class JumoVerificationContractEngine {

  create(
    productId: string,
    requirements: JumoVerificationRequirement[]
  ): JumoVerificationContract {

    return {
      productId,
      requirements,
      results: [],
      approved: false,
    };
  }

  evaluate(
    contract: JumoVerificationContract
  ): JumoVerificationContract {

    const blockingRequirements =
      contract.requirements.filter(
        requirement =>
          requirement.blocking
      );

    const passedBlocking =
      blockingRequirements.every(
        requirement =>
          contract.results.some(
            result =>
              result.requirementId === requirement.id &&
              result.status === 'PASSED'
          )
      );

    contract.approved =
      passedBlocking;

    return contract;
  }
}

export const JUMO_VERIFICATION_CONTRACT_ENGINE =
  new JumoVerificationContractEngine();
