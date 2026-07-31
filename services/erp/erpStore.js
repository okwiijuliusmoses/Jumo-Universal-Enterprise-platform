export class ERPStore {
  constructor(erpRegistry, erpConfigEngine) {
    this.erpRegistry = erpRegistry;
    this.erpConfigEngine = erpConfigEngine;
  }

  listAvailableERPs() {
    return this.erpRegistry.list();
  }

  listFamilies() {
    return this.erpRegistry.getFamilies();
  }

  listERPsByFamily(family) {
    return this.erpRegistry.getByFamily(family);
  }

  installERP(id, tenantId) {
    console.log(`Installing ERP ${id} for tenant ${tenantId}`);
    // Logic to activate ERP for a specific tenant
    return { success: true, erpId: id, tenantId: tenantId };
  }
}
