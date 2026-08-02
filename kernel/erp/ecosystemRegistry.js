export class EcosystemRegistry {
  constructor() {
    this.ecosystems = {
      Education: {
        templates: ["University", "College", "Vocational", "Secondary", "Nursery"],
        installedInstances: 0
      },
      Hospitality: {
        templates: ["Hotel", "Resort", "Restaurant"],
        installedInstances: 0
      }
      // Add other ecosystems as needed
    };
  }

  getEcosystems() {
    return Object.keys(this.ecosystems);
  }

  getTemplates(ecosystem) {
    return this.ecosystems[ecosystem]?.templates || [];
  }
}
