export class UniversalERPRegistry {
  constructor() {
    // Top-level Registry: Organization -> Institution -> ERP Family -> Architecture
    this.organizations = new Map();
  }

  registerOrganization(org) {
    this.organizations.set(org.id, { 
      ...org, 
      institutions: new Map(),
      createdAt: new Date().toISOString() 
    });
  }

  addInstitution(orgId, institution) {
    const org = this.organizations.get(orgId);
    if (!org) throw new Error("Organization not found");
    org.institutions.set(institution.id, { 
      ...institution, 
      erpFamilies: new Map(),
      governanceModel: "Executive Board" 
    });
  }

  addERPFamily(orgId, instId, erpFamily) {
    const org = this.organizations.get(orgId);
    const inst = org?.institutions.get(instId);
    if (!inst) throw new Error("Institution not found");
    
    inst.erpFamilies.set(erpFamily.id, {
      ...erpFamily,
      portals: new Map(),
      departments: new Map(),
      moduleRegistry: new Map(),
      formRegistry: new Map(),
      workflowRegistry: new Map()
    });
  }

  // Portal Management
  addPortal(orgId, instId, erpId, portal) {
    const erp = this._getERP(orgId, instId, erpId);
    erp.portals.set(portal.id, {
      ...portal,
      dashboard: "default",
      permissions: ["view_dashboard"]
    });
  }

  // Department Management
  addDepartment(orgId, instId, erpId, department) {
    const erp = this._getERP(orgId, instId, erpId);
    erp.departments.set(department.id, {
      ...department,
      modules: [],
      workflows: []
    });
  }

  // Module Management
  registerModule(orgId, instId, erpId, module) {
    const erp = this._getERP(orgId, instId, erpId);
    erp.moduleRegistry.set(module.id, {
      ...module,
      dataObjects: [],
      interfaces: [],
      auditControls: true
    });
  }

  _getERP(orgId, instId, erpId) {
    const org = this.organizations.get(orgId);
    const inst = org?.institutions.get(instId);
    const erp = inst?.erpFamilies.get(erpId);
    if (!erp) throw new Error("ERP Family not found");
    return erp;
  }

  getArchitectureRegistry() {
    return Array.from(this.organizations.values()).map(org => ({
      ...org,
      institutions: Array.from(org.institutions.values()).map(inst => ({
        ...inst,
        erpFamilies: Array.from(inst.erpFamilies.values()).map(erp => ({
          ...erp,
          portals: Array.from(erp.portals.values()),
          departments: Array.from(erp.departments.values()),
          modules: Array.from(erp.moduleRegistry.values())
        }))
      }))
    }));
  }
}
