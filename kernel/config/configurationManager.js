export class ConfigurationManager {
  constructor() {
    this.configs = new Map([
      ["env", "production"],
      ["cluster", "global-east-1"],
      ["maxTenants", 10000],
      ["securityMode", "AEGIS_STRICT"],
      ["telemetryEnabled", true],
      ["aiGatewayRateLimit", 1000]
    ]);
  }

  get(key) {
    return this.configs.get(key);
  }

  set(key, value) {
    this.configs.set(key, value);
    return true;
  }

  getAll() {
    return Object.fromEntries(this.configs.entries());
  }
}
