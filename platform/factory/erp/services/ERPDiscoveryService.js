/**
 * JUMO UEOS
 * ERP Discovery Service
 */

import { erpInstanceRegistry } from "../../../registry/ERPInstanceRegistry.js";
import { ERPBlueprintRegistry } from "../ERPBlueprintRegistry.js";
import { erpFamilyRegistry } from "../ERPFamilyRegistry.js";
import { erpEcosystemTemplateRegistry } from "../ERPEcosystemTemplateRegistry.js";
import { ERPEnterpriseStandard } from "../ERPEnterpriseStandard.js";

export class ERPDiscoveryService {

  listFamilies() {
    return erpFamilyRegistry.listFamilies();
  }

  listTemplates() {
    return erpEcosystemTemplateRegistry.listTemplates();
  }

  listERPs() {
    const instances = erpInstanceRegistry.list();
    return instances.map(instance => {
      const blueprintId = instance.blueprintId || instance.templateId;
      const blueprint = ERPBlueprintRegistry.getBlueprint(blueprintId) || {};
      const standard = ERPEnterpriseStandard.getStandardProfile(blueprint);
      const template = erpEcosystemTemplateRegistry.getTemplate(instance.templateId || blueprint.templateId);
      const family = template ? erpFamilyRegistry.getFamily(template.familyId) : null;
      
      return {
        id: instance.id,
        name: instance.name || instance.blueprintId,
        blueprintId: instance.blueprintId,
        templateId: instance.templateId || (blueprint ? blueprint.templateId : null),
        familyId: family ? family.id : null,
        familyName: family ? family.name : "Institutional ERP Family",
        tenant: instance.tenant,
        domain: instance.domain || blueprint.domain || "Institutional ERP",
        status: instance.status || "ACTIVE",
        lifecycle: instance.lifecycle || "RUNNING",
        configurationStatus: instance.configurationStatus || "CONFIGURED",
        deploymentStatus: instance.deploymentStatus || "DEPLOYED",
        runtimeStatus: instance.runtimeStatus || "ONLINE",
        modules: instance.modules || blueprint.modules || standard.modules,
        portals: instance.portals || blueprint.portals || standard.portals,
        workflows: instance.workflows || blueprint.workflows || standard.workflows,
        components: instance.components || blueprint.components || standard.components,
        forms: instance.forms || blueprint.forms || standard.forms,
        departments: instance.departments || blueprint.departments || standard.departments,
        agents: instance.agents || blueprint.agents || ["UEOS Enterprise AI Assistant"],
        configuration: {
          settings: instance.settings || blueprint.settings || standard.settings,
          configuration: instance.configuration || blueprint.configuration || {},
          features: instance.features || blueprint.features || {},
          permissions: instance.permissions || blueprint.permissions || standard.permissions,
          policies: instance.policies || blueprint.policies || {}
        }
      };
    });
  }

  getERP(id) {
    const instance = erpInstanceRegistry.get(id);
    if (!instance) return null;
    
    const blueprint = ERPBlueprintRegistry.getBlueprint(instance.blueprintId) || {};
    const standard = ERPEnterpriseStandard.getStandardProfile(blueprint);
    return {
      ...instance,
      blueprint: blueprint || null,
      modules: instance.modules || blueprint.modules || standard.modules,
      portals: instance.portals || blueprint.portals || standard.portals,
      workflows: instance.workflows || blueprint.workflows || standard.workflows,
      components: instance.components || blueprint.components || standard.components,
      forms: instance.forms || blueprint.forms || standard.forms,
      departments: instance.departments || blueprint.departments || standard.departments,
      settings: instance.settings || blueprint.settings || standard.settings
    };
  }

  getEcosystemTree() {
    const families = erpFamilyRegistry.listFamilies();
    const templates = erpEcosystemTemplateRegistry.listTemplates();
    const blueprints = ERPBlueprintRegistry.list();
    const instances = this.listERPs();

    const familyTree = families.map(family => {
      const familyTemplates = templates.filter(t => t.familyId === family.id);
      const enrichedTemplates = familyTemplates.map(template => {
        const blueprint = blueprints.find(b => b.id === template.blueprintId);
        const activeInstances = instances.filter(i => i.blueprintId === template.blueprintId || i.templateId === template.id);
        return {
          ...template,
          blueprint: blueprint || null,
          activeInstances
        };
      });

      const familyInstances = instances.filter(i => enrichedTemplates.some(t => t.activeInstances.some(ai => ai.id === i.id)));

      return {
        ...family,
        templates: enrichedTemplates,
        activeInstances: familyInstances
      };
    });

    return {
      ecosystem: "JUMO UEOS ERP Ecosystem",
      families: familyTree,
      totalInstances: instances.length,
      totalBlueprints: blueprints.length,
      totalTemplates: templates.length
    };
  }

  getEcosystem() {
    const erps = this.listERPs();
    const blueprints = ERPBlueprintRegistry.list();
    return {
      ecosystem: "JUMO UEOS ERP Ecosystem",
      instances: erps.length,
      blueprintsCount: blueprints.length,
      erps: erps,
      blueprints: blueprints
    };
  }

  health() {
    return {
      status: "ONLINE",
      instances: erpInstanceRegistry.count ? erpInstanceRegistry.count() : erpInstanceRegistry.list().length,
      blueprints: ERPBlueprintRegistry.list().length,
      families: erpFamilyRegistry.listFamilies().length,
      templates: erpEcosystemTemplateRegistry.listTemplates().length
    };
  }
}

export const erpDiscoveryService = new ERPDiscoveryService();
