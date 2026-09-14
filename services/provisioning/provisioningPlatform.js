export class ProvisioningPlatform {
  constructor() {
    this.clusters = [
      { id: "cluster-global-east", region: "Europe-West1", status: "Operational", nodes: 8 }
    ];
  }
  listClusters() { return this.clusters; }
}
