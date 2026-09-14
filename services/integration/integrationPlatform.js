export class IntegrationPlatform {
  constructor() {
    this.connectors = [
      { id: "conn-swift", name: "SWIFT Financial Gateway", status: "Active" },
      { id: "conn-gov", name: "National ID Registry Bridge", status: "Active" }
    ];
  }
  listConnectors() { return this.connectors; }
}
