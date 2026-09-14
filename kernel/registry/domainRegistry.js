export class DomainRegistry {
  constructor() {
    // Hierarchical Registry Engine
    this.organizations = new Map();
  }

  // Register an Enterprise Organization
  registerOrganization(org) {
    this.organizations.set(org.id, { ...org, institutions: new Map() });
  }

  // Add Institution to Organization
  addInstitution(orgId, institution) {
    const org = this.organizations.get(orgId);
    if (!org) throw new Error("Organization not found");
    
    org.institutions.set(institution.id, { 
      ...institution, 
      governance: "Executive Board",
      portals: new Map() 
    });
  }

  // Define a Portal within an Institution
  addPortal(orgId, instId, portal) {
    const org = this.organizations.get(orgId);
    const inst = org?.institutions.get(instId);
    if (!inst) throw new Error("Institution not found");
    
    inst.portals.set(portal.id, {
      ...portal,
      modules: [],
      permissions: ["view_dashboard"]
    });
  }

  getHierarchy() {
    // Return structured registry view
    return Array.from(this.organizations.values()).map(org => ({
      ...org,
      institutions: Array.from(org.institutions.values()).map(inst => ({
        ...inst,
        portals: Array.from(inst.portals.values())
      }))
    }));
  }
}
