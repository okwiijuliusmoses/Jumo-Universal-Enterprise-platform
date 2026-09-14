export class ServiceRegistry {
  constructor() {
    this.registry = {};
  }

  register(name, service) {
    this.registry[name] = service;
  }

  get(name) {
    return this.registry[name];
  }

  list() {
    return Object.keys(this.registry);
  }
}
