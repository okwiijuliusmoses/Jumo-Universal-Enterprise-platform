/**
 * JUMO UEOS
 * Enterprise Component Registry
 */

export class EnterpriseComponentRegistry {
  constructor() {
    this.components = [
      "Dashboard Engine",
      "Workflow Engine",
      "Notification Centre",
      "Document Management System",
      "Search Engine",
      "Reporting Engine",
      "Approval Engine",
      "Calendar & Scheduling",
      "Communication Centre",
      "AI Enterprise Assistant",
      "Audit Viewer",
      "Configuration Centre",
      "Unified Identity Engine",
      "Data Export & Analytics"
    ];
  }

  listComponents() {
    return this.components;
  }
}

export const enterpriseComponentRegistry = new EnterpriseComponentRegistry();
