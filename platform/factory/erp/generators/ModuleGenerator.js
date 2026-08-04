/**
 * JUMO UEOS
 * Enterprise Module Generator
 *
 * Generates core enterprise modules and sector-specific capabilities,
 * and registers them in the central Module Registry.
 */

import { moduleRegistry } from "../../../registry/ModuleRegistry.js";

export class ModuleGenerator {
  generate(blueprint, directive = {}) {
    const erpInstanceId = directive.instanceId || `${blueprint.id}-instance`;

    // Production core modules mandated by the consolidation directive
    const coreModules = [
      "Identity Management",
      "Administration",
      "Finance",
      "Human Resources",
      "Procurement",
      "Asset Management",
      "Document Management",
      "Workflow Management",
      "Reporting",
      "Analytics",
      "Compliance",
      "AI Assistant"
    ];

    // Sector-specific capabilities
    const sectorModules = blueprint.capabilities || [];

    const allModulesList = [...new Set([...coreModules, ...sectorModules])];

    allModulesList.forEach(modName => {
      moduleRegistry.register({
        id: `mod-${erpInstanceId}-${modName.toLowerCase().replace(/[^a-z0-9]/g, "-")}`,
        name: modName,
        erpId: erpInstanceId,
        category: coreModules.includes(modName) ? "CORE" : "SECTOR",
        status: "ACTIVE"
      });
    });

    return allModulesList;
  }
}

export const moduleGenerator = new ModuleGenerator();
