export interface QualityProvisioningRequirement {
  id: string;
  category:
    | 'RUNTIME'
    | 'DATABASE'
    | 'STORAGE'
    | 'NETWORK'
    | 'IDENTITY'
    | 'CONFIGURATION'
    | 'OBSERVABILITY'
    | 'BACKUP'
    | 'RECOVERY'
    | 'SECURITY'
    | 'DEPLOYMENT'
    | 'OFFLINE'
    | 'CAPACITY';
  name: string;
  required: boolean;
  metadata?: Record<string, unknown>;
}

export interface QualityProvisioningRequest {
  id: string;
  productId: string;
  requirements: QualityProvisioningRequirement[];
  verificationId: string;
  accepted: boolean;
  status:
    | 'BLOCKED'
    | 'READY'
    | 'PROVISIONING'
    | 'PROVISIONED'
    | 'FAILED';
  createdAt: string;
  metadata?: Record<string, unknown>;
}

export class JumoCloudQualityProvisioningEngine {
  private readonly requirements =
    new Map<string, QualityProvisioningRequirement>();

  private readonly requests =
    new Map<string, QualityProvisioningRequest>();

  registerRequirement(
    requirement: QualityProvisioningRequirement,
  ): QualityProvisioningRequirement {
    this.requirements.set(requirement.id, requirement);
    return requirement;
  }

  listRequirements(): QualityProvisioningRequirement[] {
    return Array.from(this.requirements.values());
  }

  createRequest(
    productId: string,
    verificationId: string,
    accepted: boolean,
  ): QualityProvisioningRequest {
    const request: QualityProvisioningRequest = {
      id: `quality-provisioning-${productId}-${Date.now()}`,
      productId,
      verificationId,
      requirements: this.listRequirements(),
      accepted,
      status: accepted ? 'READY' : 'BLOCKED',
      createdAt: new Date().toISOString(),
    };

    this.requests.set(request.id, request);
    return request;
  }

  authorize(requestId: string): QualityProvisioningRequest {
    const request = this.requests.get(requestId);

    if (!request) {
      throw new Error(`Provisioning request not found: ${requestId}`);
    }

    if (!request.accepted) {
      throw new Error(
        `Provisioning request ${requestId} is not authorized.`,
      );
    }

    request.status = 'PROVISIONING';
    return request;
  }

  markProvisioned(requestId: string): QualityProvisioningRequest {
    const request = this.requests.get(requestId);

    if (!request) {
      throw new Error(`Provisioning request not found: ${requestId}`);
    }

    if (request.status !== 'PROVISIONING') {
      throw new Error(
        `Provisioning request ${requestId} is not currently provisioning.`,
      );
    }

    request.status = 'PROVISIONED';
    return request;
  }

  get(id: string): QualityProvisioningRequest | undefined {
    return this.requests.get(id);
  }
}

export const JUMO_CLOUD_QUALITY_PROVISIONING_ENGINE =
  new JumoCloudQualityProvisioningEngine();
