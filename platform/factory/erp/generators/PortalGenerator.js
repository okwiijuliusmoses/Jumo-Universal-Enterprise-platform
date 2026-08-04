/**
 * JUMO UEOS
 * Enterprise Portal Generator
 */

import { portalRegistry } from "../../../registry/portalRegistry.js";

export class PortalGenerator {
  generate(instance, departments = []) {
    const depts = Array.isArray(departments)
      ? departments
      : (departments && Array.isArray(departments.departments) ? departments.departments : []);

    const corePortals = [
      "Public Portal",
      "Executive Dashboard",
      "Control Center"
    ];

    const departmentPortals = depts.map(d => `${typeof d === 'string' ? d : (d.name || d)} Workspace`);
    
    const allPortals = [...corePortals, ...departmentPortals];

    allPortals.forEach(portalName => {
      portalRegistry.register({
        id: `portal-${instance.id}-${portalName.toLowerCase().replace(/[^a-z0-9]/g, "-")}`,
        name: portalName,
        owner: instance.id,
        modules: [],
        status: "ACTIVE"
      });
    });

    return allPortals.map(name => ({ id: name.toLowerCase().replace(/[^a-z0-9]/g, "-"), name: name }));
  }
}

export const portalGenerator = new PortalGenerator();
