export class DomainRegistry {
  constructor() {
    this.domains = new Map([
      ["education", { id: "education", name: "Education ERP", status: "Active", description: "Student Information, LMS, Faculty, and Campus Finance", version: "2.1.0" }],
      ["government", { id: "government", name: "Government ERP", status: "Active", description: "Citizen Services, Public Records, Regulatory Compliance", version: "2.0.4" }],
      ["enterprise", { id: "enterprise", name: "Enterprise Resource Planning", status: "Active", description: "Supply Chain, HR, CRM, and Global Ledger", version: "3.0.0" }],
      ["finance", { id: "finance", name: "FAAP Financial Architecture", status: "Active", description: "Multi-Currency Banking, Treasury, and Settlement", version: "2.5.1" }],
      ["agriculture", { id: "agriculture", name: "Agriculture & Commodity ERP", status: "Active", description: "Supply Tracking, Cooperative Management, Crop Analytics", version: "1.8.0" }],
      ["healthcare", { id: "healthcare", name: "Healthcare & Hospital ERP", status: "Active", description: "Patient Records, Clinical Workflow, Medical Inventory", version: "2.2.0" }]
    ]);
  }

  listDomains() {
    return Array.from(this.domains.values());
  }

  getDomain(domainId) {
    return this.domains.get(domainId) || null;
  }

  registerDomain(domain) {
    this.domains.set(domain.id, domain);
    return domain;
  }
}
