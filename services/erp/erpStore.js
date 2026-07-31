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
    this.erpRegistry.updateLifecycle(id, 'installed');
    return { success: true, erpId: id, tenantId: tenantId };
  }

  enableERP(id) {
    console.log(`Enabling ERP ${id}`);
    this.erpRegistry.updateLifecycle(id, 'enabled');
  }

  disableERP(id) {
    console.log(`Disabling ERP ${id}`);
    this.erpRegistry.updateLifecycle(id, 'disabled');
  }
}
