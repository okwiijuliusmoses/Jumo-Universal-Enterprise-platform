export class OrganizationService {
  constructor() {
    this.organizations = [
      { id: "org-01", name: "Jumo Global Headquarters", type: "Enterprise", status: "Active" },
      { id: "org-02", name: "Ministry of Technology", type: "Government", status: "Active" }
    ];
  }
  listOrganizations() { return this.organizations; }
}
