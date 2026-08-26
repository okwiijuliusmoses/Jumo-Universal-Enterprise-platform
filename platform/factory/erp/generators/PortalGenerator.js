/**
 * JUMO UEOS
 * Enterprise Portal Generator
 *
 * Generates the full production portal suite and registers them in the Portal Registry.
 */

import { portalRegistry } from "../../../registry/portalRegistry.js";

export class PortalGenerator {
  generate(blueprint, directive = {}) {
    const erpInstanceId = directive.instanceId || `${blueprint.id}-instance`;
    
    // Exact enterprise portals required by the production directive
    const corePortals = [
      "Public Portal",
      "Authentication Portal",
      "Executive Portal",
      "Administrative Portal",
      "Staff Workspace",
      "Operational Workspace",
      "Finance Workspace",
      "Management Workspace",
      "Reporting Portal",
      "AI Assistant Portal",
      "Mobile Experience Portal"
    ];

    corePortals.forEach(portalName => {
      portalRegistry.register({
        id: `portal-${erpInstanceId}-${portalName.toLowerCase().replace(/[^a-z0-9]/g, "-")}`,
        name: portalName,
        owner: erpInstanceId,
        modules: blueprint.capabilities || [],
        status: "ACTIVE"
      });
    });

    return corePortals;
  }
}

export const portalGenerator = new PortalGenerator();
