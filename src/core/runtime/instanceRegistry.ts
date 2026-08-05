/**
 * JUMO UEOS ERP Instance Registry
 *
 * Stores manufactured ERP instances.
 *
 * Instances are created by Universal ERP Factory.
 * Runtime systems consume instances dynamically.
 */

import UniversalERPFactory, { ERPInstance } from "./universalERPFactory";

const instances: ERPInstance[] = [];

export class ERPInstanceRegistry {
  static register(instance: ERPInstance) {
    const exists = instances.find(item => item.instanceId === instance.instanceId);
    if (!exists) {
      instances.push(instance);
    }
    return instance;
  }

  static getAll(): ERPInstance[] {
    const factoryInstances = UniversalERPFactory.getInstances();
    const map = new Map<string, ERPInstance>();
    factoryInstances.forEach(inst => map.set(inst.instanceId, inst));
    instances.forEach(inst => map.set(inst.instanceId, inst));
    return Array.from(map.values());
  }

  static getById(instanceId: string): ERPInstance | undefined {
    const foundLocal = instances.find(instance => instance.instanceId === instanceId);
    if (foundLocal) return foundLocal;
    return UniversalERPFactory.getInstance(instanceId);
  }

  static getByInstitution(institutionId: string): ERPInstance[] {
    return this.getAll().filter(instance => instance.institution.institutionId === institutionId);
  }

  static activate(instanceId: string): ERPInstance | undefined {
    const instance = this.getById(instanceId);
    if (instance) {
      instance.status = "ACTIVE";
    }
    return instance;
  }

  static suspend(instanceId: string): ERPInstance | undefined {
    const instance = this.getById(instanceId);
    if (instance) {
      instance.status = "SUSPENDED";
    }
    return instance;
  }

  static remove(instanceId: string): ERPInstance | undefined {
    const index = instances.findIndex(instance => instance.instanceId === instanceId);
    if (index >= 0) {
      return instances.splice(index, 1)[0];
    }
    return undefined;
  }
}

export default ERPInstanceRegistry;
