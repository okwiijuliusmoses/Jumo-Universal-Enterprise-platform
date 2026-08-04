/**
 * JUMO UEOS
 * ERP Discovery Service
 */
import { erpInstanceRegistry } from "../../../registry/ERPInstanceRegistry.js";
import { ERPBlueprintRegistry } from "../ERPBlueprintRegistry.js";
import { erpFamilyRegistry } from "../ERPFamilyRegistry.js";
import { erpEcosystemTemplateRegistry } from "../ERPEcosystemTemplateRegistry.js";
import { erpProductRegistry } from "../../../registry/ERPProductRegistry.js";
import { erpProvisioningStateRegistry } from "../../../registry/ERPProvisioningStateRegistry.js";
import { erpRecoveryEngine } from "../recovery/ERPRecoveryEngine.js";

export class ERPDiscoveryService {
  
  ensureProvisioning() {
    erpRecoveryEngine.auditAndRecover();
  }

  listFamilies() {
    return erpFamilyRegistry.listFamilies();
  }

  listTemplates() {
    return erpEcosystemTemplateRegistry.listTemplates();
  }

  listProducts() {
    return erpProductRegistry.list();
  }

  listERPs() {
    this.ensureProvisioning();
    const instances = erpInstanceRegistry.list();
    return instances.map(instance => {
      const product = erpProductRegistry.get(instance.templateId);
      const blueprint = ERPBlueprintRegistry.getBlueprint(instance.blueprintId) || {};
      
      return {
        id: instance.id,
        name: instance.name,
        blueprintId: instance.blueprintId,
        templateId: instance.templateId,
        productId: product ? product.id : null,
        tenant: instance.tenant,
        domain: instance.domain,
        status: instance.status || "ACTIVE",
        lifecycle: instance.lifecycle || "RUNNING",
        configurationStatus: instance.configurationStatus || "CONFIGURED",
        deploymentStatus: instance.deploymentStatus || "DEPLOYED",
        runtimeStatus: instance.runtimeStatus || "ONLINE",
        modules: instance.modules || [],
        portals: instance.portals || [],
        workflows: instance.workflows || [],
        components: instance.components || [],
        forms: instance.forms || [],
        departments: instance.departments || [],
        agents: instance.agents || ["UEOS Enterprise AI Assistant"],
        configuration: {
          settings: instance.settings || {},
          configuration: instance.configuration || {},
          features: instance.features || {},
          permissions: instance.permissions || [],
          policies: instance.policies || {}
        }
      };
    });
  }

  getERP(id) {
    this.ensureProvisioning();
    const instance = erpInstanceRegistry.get(id);
    if (!instance) return null;
    
    return instance;
  }

  getEcosystemTree() {
    this.ensureProvisioning();
    const blueprints = ERPBlueprintRegistry.list();
    const products = erpProductRegistry.list();
    const instances = erpInstanceRegistry.list();

    const ecosystemTree = blueprints.map(blueprint => {
      const blueprintProducts = products.filter(p => p.ecosystemId === blueprint.id);
      const activeInstances = instances.filter(i => i.blueprintId === blueprint.id);
      
      return {
        ...blueprint,
        products: blueprintProducts,
        activeInstances
      };
    });

    return {
      ecosystem: "JUMO UEOS ERP Ecosystem",
      families: ecosystemTree,
      totalProducts: products.length,
      totalInstances: instances.length,
      totalBlueprints: blueprints.length
    };
  }

  getEcosystem() {
    this.ensureProvisioning();
    const instances = erpInstanceRegistry.list();
    const blueprints = ERPBlueprintRegistry.list();
    const products = erpProductRegistry.list();
    
    return {
      ecosystem: "JUMO UEOS ERP Ecosystem",
      instances: instances.length,
      productsCount: products.length,
      blueprintsCount: blueprints.length,
      erps: instances,
      products: products,
      blueprints: blueprints
    };
  }

  health() {
    return {
      status: "ONLINE",
      instances: erpInstanceRegistry.count ? erpInstanceRegistry.count() : erpInstanceRegistry.list().length,
      products: erpProductRegistry.list().length,
      blueprints: ERPBlueprintRegistry.list().length
    };
  }
}

export const erpDiscoveryService = new ERPDiscoveryService();
