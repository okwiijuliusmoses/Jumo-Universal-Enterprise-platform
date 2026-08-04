/**
 * JUMO UEOS
 * ERP Provisioning State Registry
 */

export class ERPProvisioningStateRegistry {
  constructor() {
    this.states = new Map();
  }

  setProvisioned(productId, instanceId) {
    this.states.set(productId, {
      instanceId,
      status: "PROVISIONED",
      timestamp: new Date().toISOString()
    });
  }

  getProvisionState(productId) {
    return this.states.get(productId) || { status: "UNPROVISIONED" };
  }

  isProvisioned(productId) {
    return this.states.has(productId) && this.states.get(productId).status === "PROVISIONED";
  }

  list() {
    return Array.from(this.states.entries()).map(([productId, state]) => ({
      productId,
      ...state
    }));
  }
}

export const erpProvisioningStateRegistry = new ERPProvisioningStateRegistry();
