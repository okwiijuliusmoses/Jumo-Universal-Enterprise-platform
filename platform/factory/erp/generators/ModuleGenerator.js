/**
 * JUMO UEOS
 * Enterprise Module Generator
 */

import { moduleRegistry } from "../../../registry/ModuleRegistry.js";

export class ModuleGenerator {
  generate(instance, portals = []) {
    const erpInstanceId = instance.id;

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

    const allModulesList = coreModules;

    allModulesList.forEach(modName => {
      moduleRegistry.register({
        id: `mod-${erpInstanceId}-${modName.toLowerCase().replace(/[^a-z0-9]/g, "-")}`,
        name: modName,
        erpId: erpInstanceId,
        category: "CORE",
        status: "ACTIVE"
      });
    });

    return allModulesList.map(name => ({ id: name.toLowerCase().replace(/[^a-z0-9]/g, "-"), name: name }));
  }
}

export const moduleGenerator = new ModuleGenerator();
