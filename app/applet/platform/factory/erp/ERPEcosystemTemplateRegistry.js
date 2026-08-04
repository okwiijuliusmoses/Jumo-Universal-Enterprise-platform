/**
 * JUMO UEOS
 * ERP Ecosystem Template Registry
 * 
 * Powered by ERPFactoryArchitecture
 */

import { ERPFactoryArchitecture } from "./ERPFactoryArchitecture.config.js";
import { ERPBlueprintRegistry } from "./ERPBlueprintRegistry.js";
import { registryPersistenceEngine } from "../../storage/RegistryPersistenceEngine.js";

export class ERPEcosystemTemplateRegistry {
  constructor() {
    this.templates = [];

    ERPFactoryArchitecture.ecosystems.forEach(ecosystem => {
      ecosystem.templates.forEach(template => {
        const templateId = `${template.id}-erp`;
        const scopeName = template.name.replace(' ERP', '');
        
        if (!this.templates.find(t => t.id === templateId)) {
          this.templates.push({
            id: templateId,
            ecosystemId: ecosystem.id,
            name: template.name,
            description: `Automated national-grade enterprise platform for ${scopeName}.`,
            portals: [`Executive Portal`, `Administration Portal`, `Staff Portal`, `User Portal`, `Finance Portal`],
            departments: [`${scopeName} Directorate`, `Finance Directorate`, `Operations Directorate`, `Human Resources Directorate`, `ICT Directorate`],
            modules: ecosystem.sharedServices || [`Core ${scopeName} Management`],
            layers: ["Governance Layer", "Operational Layer", "Digital Layer"],
            components: [`${scopeName} Dashboard`],
            branches: ["National HQ", "Regional Node"],
            workflows: ["Standard Approval", "Audit Workflow", "Governance Workflow"]
          });
        }
      });
    });

    this.loadFromStorage();
  }

  loadFromStorage() {
    const stored = registryPersistenceEngine.load("erp-ecosystem-templates");
    if (Array.isArray(stored)) {
        this.templates = [...this.templates, ...stored];
    }
  }

  registerTemplate(template) {
    this.templates.push(template);
    const runtimeTemplates = this.templates.filter(t => !this.isDefaultTemplate(t.id));
    registryPersistenceEngine.save("erp-ecosystem-templates", runtimeTemplates);
  }

  isDefaultTemplate(id) {
    return true;
  }

  listTemplates() {
    return this.templates;
  }

  getTemplatesByEcosystem(ecosystemId) {
    return this.templates.filter(t => t.ecosystemId === ecosystemId);
  }

  getTemplate(id) {
    return this.templates.find(t => t.id === id || t.name === id || t.id.replace('-erp', '') === id);
  }

  getBlueprint(id) {
    return ERPBlueprintRegistry.getBlueprint(id);
  }
}

export const erpEcosystemTemplateRegistry = new ERPEcosystemTemplateRegistry();
