export class ERPRegistry {
  constructor() {
    this.erpRegistry = {};
    this.families = {};
    this.lifecycle = {}; // Track state: 'installed', 'enabled', 'disabled'
  }

  register(id, config) {
    this.erpRegistry[id] = {
      ...config,
      dependencies: config.dependencies || [] // Bind to platform services
    };
    this.lifecycle[id] = 'installed';
    if (config.family) {
      if (!this.families[config.family]) this.families[config.family] = [];
      this.families[config.family].push(id);
    }
  }
  
  install(id, config) {
    console.log(`Installing ERP: ${id}`);
    this.register(id, config);
  }

  updateLifecycle(id, state) {
    if (this.erpRegistry[id]) {
      this.lifecycle[id] = state;
    }
  }

  getLifecycle(id) {
    return this.lifecycle[id];
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
