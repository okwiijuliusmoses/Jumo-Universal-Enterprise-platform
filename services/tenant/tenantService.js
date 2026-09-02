export class TenantService {
  constructor() {
    this.tenants = [
      { id: "tenant-default-001", name: "Jumo Global Enterprise Corp", status: "Active", tier: "Platinum" }
    ];
  }
  listTenants() { return this.tenants; }
}
