export class AppRegistry {
  constructor() {
    this.applications = new Map([
      ["app-workspace", { id: "app-workspace", name: "UEOS Workspace Shell", category: "Core", status: "Installed", icon: "LayoutDashboard" }],
      ["app-finance", { id: "app-finance", name: "FAAP Financial Ledger", category: "Finance", status: "Installed", icon: "DollarSign" }],
      ["app-workflow", { id: "app-workflow", name: "Enterprise Workflow Engine", category: "Operations", status: "Installed", icon: "Workflow" }],
      ["app-aegis", { id: "app-aegis", name: "AEGIS Audit & Compliance", category: "Security", status: "Installed", icon: "ShieldCheck" }],
      ["app-ai", { id: "app-ai", name: "Jumo AI Assistant", category: "Intelligence", status: "Installed", icon: "Bot" }],
      ["app-education", { id: "app-education", name: "Education Campus Suite", category: "Education", status: "Available", icon: "GraduationCap" }],
      ["app-government", { id: "app-government", name: "Government Citizen Portal", category: "Government", status: "Available", icon: "Building2" }],
      ["app-healthcare", { id: "app-healthcare", name: "Healthcare Clinical Suite", category: "Health", status: "Available", icon: "Stethoscope" }]
    ]);
  }

  listApps() {
    return Array.from(this.applications.values());
  }

  installApp(appId) {
    const app = this.applications.get(appId);
    if (app) {
      app.status = "Installed";
      return app;
    }
    return null;
  }
}
