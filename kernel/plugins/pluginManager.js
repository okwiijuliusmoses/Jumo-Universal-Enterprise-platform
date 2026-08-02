export class PluginManager {
  constructor() {
    this.plugins = new Map([
      ["plugin-oauth", { id: "plugin-oauth", name: "OAuth2 Enterprise Federation", version: "1.2.0", status: "Active" }],
      ["plugin-pdf", { id: "plugin-pdf", name: "Document Generation & PDF Engine", version: "2.0.1", status: "Active" }],
      ["plugin-crypto", { id: "plugin-crypto", name: "HSM Hardware Security Module Bridge", version: "1.0.4", status: "Active" }]
    ]);
  }

  listPlugins() {
    return Array.from(this.plugins.values());
  }

  loadPlugin(plugin) {
    this.plugins.set(plugin.id, { ...plugin, status: "Active", loadedAt: new Date().toISOString() });
    return plugin;
  }
}
