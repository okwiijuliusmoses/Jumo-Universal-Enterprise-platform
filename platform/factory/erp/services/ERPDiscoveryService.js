/**
 * JUMO UEOS
 * ERP Discovery Service
 */

import { erpInstanceRegistry } from "../../../registry/ERPInstanceRegistry.js";
import { ERPBlueprintRegistry } from "../ERPBlueprintRegistry.js";

export class ERPDiscoveryService {

  listERPs() {
    const instances = erpInstanceRegistry.list();
    return instances.map(instance => ({
      id: instance.id,
      name: instance.blueprintId,
      blueprintId: instance.blueprintId,
      tenant: instance.tenant,
      domain: instance.domain || "Institutional ERP",
      status: instance.status || "ACTIVE",
      lifecycle: instance.lifecycle || "INSTALLED"
    }));
  }

  getERP(id) {
    const instance = erpInstanceRegistry.get(id);
    if (!instance) return null;
    
    const blueprint = ERPBlueprintRegistry.getBlueprint(instance.blueprintId);
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
      instances: erpInstanceRegistry.count ? erpInstanceRegistry.count() : erpInstanceRegistry.list().length,
      blueprints: ERPBlueprintRegistry.list().length
    };
  }
}

export const erpDiscoveryService = new ERPDiscoveryService();
