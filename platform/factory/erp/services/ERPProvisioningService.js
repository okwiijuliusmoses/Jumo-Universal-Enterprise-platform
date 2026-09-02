/**
 * JUMO UEOS
 * ERP Runtime Provisioning Service
 */

import { erpInstanceRegistry } from "../../../registry/ERPInstanceRegistry.js";
import { erpWorkspaceResolver } from "../../../workspace/ERPWorkspaceResolver.js";
import { moduleRegistry } from "../../../registry/ModuleRegistry.js";
import { portalRegistry } from "../../../registry/PortalRegistry.js";
import { workflowRegistry } from "../../../registry/workflowRegistry.js";

export class ERPProvisioningService {
  constructor() {
    this.status = "ONLINE";
  }

  async provisionERP(instanceId) {
    console.log(`[UEOS] Provisioning ERP Instance: ${instanceId}`);
    const instance = erpInstanceRegistry.get(instanceId);
    if (!instance) throw new Error("ERP Instance not found");

    // Phase 1: Provision Tenant & Infrastructure (Mocked for runtime)
    erpInstanceRegistry.updateLifecycle(instanceId, "PROVISIONED");

    // Phase 2: Attach Core Components
    this.configureERP(instanceId);
    
    return instance;
  }

  async configureERP(instanceId) {
    console.log(`[UEOS] Configuring ERP Instance: ${instanceId}`);
    erpInstanceRegistry.updateLifecycle(instanceId, "CONFIGURED");
    return erpInstanceRegistry.get(instanceId);
  }

  async launchERP(instanceId) {
    console.log(`[UEOS] Launching ERP Instance: ${instanceId}`);
    
    const instance = erpInstanceRegistry.get(instanceId);
    if (!instance) throw new Error("ERP Instance not found");

    // Ensure it's ready & running
    erpInstanceRegistry.updateLifecycle(instanceId, "READY");
    erpInstanceRegistry.activate(instanceId);
    erpInstanceRegistry.updateLifecycle(instanceId, "RUNNING");

    const workspaceResult = erpWorkspaceResolver.resolveWorkspace("system", instanceId);

    return {
      erpId: instance.id,
      name: instance.name,
      status: "RUNNING",
      lifecycle: "RUNNING",
      workspace: workspaceResult.workspace,
      portals: workspaceResult.workspace.portals,
      modules: workspaceResult.workspace.modules,
      workflows: workspaceResult.workspace.workflows,
      settings: workspaceResult.workspace.settings,
      configuration: workspaceResult.configuration
    };
  }

  health() {
    return {
      service: "JUMO ERP Provisioning Service",
      status: this.status
    };
  }
}

export const erpProvisioningService = new ERPProvisioningService();
