export class NavigationGenerator {

  generateEnterpriseNavigation(instance, governance, departments, portals = [], modules = [], forms = [], workflows = []) {
    const defaultNav = [
      { label: "Overview", type: "workspace" },
      { label: "Organization", children: ["Governance", "Executive Offices"] },
      { label: "Departments", children: departments.map(d => d.name || d) },
      { label: "Portals", children: portals.map(p => p.name || p) },
      { label: "Modules", children: modules.map(m => m.name || m) },
      { label: "Forms", children: forms.map(f => f.name || f) },
      { label: "Workflows", children: workflows.map(w => w.name || w) },
      { label: "AI Assistant", children: [] },
      { label: "Configuration", children: [] }
    ];
    return defaultNav;
  }

  generate(){
    return this.generateEnterpriseNavigation({}, {}, []);
  }

}

export const navigationGenerator = new NavigationGenerator();
