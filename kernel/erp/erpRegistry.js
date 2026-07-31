export class ERPRegistry {
  constructor() {
    this.erpRegistry = {};
    this.families = {};
  }

  register(id, config) {
    this.erpRegistry[id] = config;
    if (config.family) {
      if (!this.families[config.family]) this.families[config.family] = [];
      this.families[config.family].push(id);
    }
  }
  
  install(id, config) {
    console.log(`Installing ERP: ${id}`);
    this.register(id, config);
  }

  get(id) {
    return this.erpRegistry[id];
  }

  list() {
    return Object.keys(this.erpRegistry);
  }

  getFamilies() {
    return Object.keys(this.families);
  }

  getByFamily(family) {
    return this.families[family] || [];
  }
}
