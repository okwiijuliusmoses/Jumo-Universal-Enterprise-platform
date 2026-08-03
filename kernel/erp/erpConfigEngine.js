export class ERPConfigEngine {
  constructor(erpRegistry) {
    this.erpRegistry = erpRegistry;
  }
  
  resolveConfig(erpId, tenantId) {
    const baseConfig = this.erpRegistry.get(erpId);
    if (!baseConfig) throw new Error(`ERP ${erpId} not registered`);
    
    // Logic to merge base config with tenant-specific overrides
    return {
      ...baseConfig,
      tenantId: tenantId
    };
  }
}
