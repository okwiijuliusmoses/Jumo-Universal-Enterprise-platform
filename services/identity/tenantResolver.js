export class TenantResolver {
  constructor() {
    this.tenants = new Map([
      ["tenant-default-001", { id: "tenant-default-001", name: "Jumo Global Enterprise Corp", type: "Enterprise", status: "Active" }],
      ["tenant-gov-002", { id: "tenant-gov-002", name: "Ministry of Digital Transformation", type: "Government", status: "Active" }],
      ["tenant-edu-003", { id: "tenant-edu-003", name: "Global Institute of Technology", type: "Education", status: "Active" }]
    ]);
  }

  resolve(tenantId) {
    return this.tenants.get(tenantId) || this.tenants.get("tenant-default-001");
  }

  registerTenant(tenant) {
    const id = tenant.id || "tenant-" + Math.random().toString(36).substring(2, 8);
    const newTenant = { id, ...tenant, createdAt: new Date().toISOString() };
    this.tenants.set(id, newTenant);
    return newTenant;
  }

  listTenants() {
    return Array.from(this.tenants.values());
  }
}
