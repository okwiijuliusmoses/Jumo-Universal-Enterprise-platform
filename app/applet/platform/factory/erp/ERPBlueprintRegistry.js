/**
 * JUMO UEOS
 * Configurable AI ERP Blueprint Registry
 * 
 * Powered by ERPFactoryArchitecture
 */

import { ERPFactoryArchitecture } from "./ERPFactoryArchitecture.config.js";

export const ERPBlueprintRegistry = {
  version: ERPFactoryArchitecture.version,
  standards: {
    portals: 20,
    modules: 200,
    forms: 500,
    workflows: 100,
    components: 100,
    aiAgents: 20
  },
  blueprints: ERPFactoryArchitecture.ecosystems.map(eco => ({
    id: eco.id,
    name: eco.name,
    category: "Institutional ERP Ecosystem",
    templates: eco.templates,
    capabilities: eco.sharedServices,
    portals: [
      "Executive Portal",
      "Administration Portal",
      "Staff Portal",
      "User Portal",
      "Finance Portal"
    ],
    settings: { theme: "JUMO Enterprise Light" },
    generationRules: { configurable: true }
  })),

  getBlueprint(id) {
    return this.blueprints.find(blueprint => blueprint.id === id);
  },

  list() {
    return this.blueprints;
  }
};
