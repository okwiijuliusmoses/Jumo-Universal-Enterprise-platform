
/**
 * JUMO UEOS Runtime Client
 * Authoritative bridge between Experience Layer and Kernel Runtime API.
 */
export class UEOSRuntimeClient {
  private static BASE_URL = "/api/ueos/registry";

  static async fetchDashboardMetrics() {
    const response = await fetch("/api/ueos/runtime/telemetry");
    if (!response.ok) throw new Error("Failed to fetch runtime telemetry");
    return response.json();
  }

  static async fetchEcosystems() {
    const response = await fetch(`${this.BASE_URL}/ecosystems`);
    if (!response.ok) throw new Error("Failed to fetch ecosystems");
    return response.json();
  }

  static async fetchTemplates() {
    const response = await fetch(`${this.BASE_URL}/templates`);
    if (!response.ok) throw new Error("Failed to fetch ERP templates");
    return response.json();
  }

  static async fetchInstances() {
    const response = await fetch(`${this.BASE_URL}/instances`);
    if (!response.ok) throw new Error("Failed to fetch ERP instances");
    return response.json();
  }

  static async fetchWorkflows() {
    const response = await fetch(`${this.BASE_URL}/workflows`);
    if (!response.ok) throw new Error("Failed to fetch workflows");
    return response.json();
  }

  static async fetchModules() {
    const response = await fetch(`${this.BASE_URL}/modules`);
    if (!response.ok) throw new Error("Failed to fetch modules");
    return response.json();
  }

  static async fetchForms() {
    const response = await fetch(`${this.BASE_URL}/forms`);
    if (!response.ok) throw new Error("Failed to fetch forms");
    return response.json();
  }

  static async fetchComponents() {
    const response = await fetch(`${this.BASE_URL}/components`);
    if (!response.ok) throw new Error("Failed to fetch components");
    return response.json();
  }

  static async provisionPlatform(templateId: string, config: any, signature: string) {
    const response = await fetch(`${this.BASE_URL}/factory/provision`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ templateId, config, signature })
    });
    if (!response.ok) throw new Error("Platform provisioning failed");
    return response.json();
  }

  static async fetchFactoryMetadata() {
    const response = await fetch(`${this.BASE_URL}/factory/metadata`);
    if (!response.ok) throw new Error("Failed to fetch factory metadata");
    return response.json();
  }

  static async fetchDigitalTwin(id: string) {
    const response = await fetch(`${this.BASE_URL}/digital-twin/${id}`);
    if (!response.ok) throw new Error("Failed to fetch digital twin");
    return response.json();
  }

  static async runManufacturingPipeline(templateId: string, ecosystemId: string) {
    const response = await fetch(`${this.BASE_URL}/factory/pipeline`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ templateId, ecosystemId })
    });
    if (!response.ok) throw new Error("Manufacturing pipeline failed");
    return response.json();
  }
}
