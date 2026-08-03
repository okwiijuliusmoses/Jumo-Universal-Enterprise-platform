/**
 * JUMO UEOS
 * ERP Discovery Service
 */

import { erpInstanceRegistry } from "../../../registry/ERPInstanceRegistry.js";
import { erpBlueprintRegistry } from "../ERPBlueprintRegistry.js";

export class ERPDiscoveryService {

  listERPs() {
    const instances = erpInstanceRegistry.list();
    return instances.map(instance => ({
      id: instance.instanceId,
      name: instance.name,
      domain: instance.domain || "Institutional ERP",
      status: instance.status || "ACTIVE"
    }));
  }

  getERP(id) {
    const instance = erpInstanceRegistry.get(id);
    if (!instance) return null;
    
    const blueprint = erpBlueprintRegistry.get(instance.templateId);
    return {
      ...instance,
      blueprint: blueprint || null
    };
  }

  getEcosystem() {
    const erps = this.listERPs();
    return {
      ecosystem: "JUMO UEOS ERP Ecosystem",
      total: erps.length,
      erps: erps
    };
  }

  health() {
    return {
      status: "ONLINE",
      instances: erpInstanceRegistry.count(),
      blueprints: erpBlueprintRegistry.count()
    };
  }
}

export const erpDiscoveryService = new ERPDiscoveryService();
