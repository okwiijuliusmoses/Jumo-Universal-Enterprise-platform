export class NavigationGenerator {

  generateEnterpriseNavigation(instance = {}, governance = {}, departments = [], portals = [], modules = [], forms = [], workflows = []) {
    const safeDepts = Array.isArray(departments) ? departments : [];
    const safePortals = Array.isArray(portals) ? portals : [];
    const safeModules = Array.isArray(modules) ? modules : [];
    const safeForms = Array.isArray(forms) ? forms : [];
    const safeWorkflows = Array.isArray(workflows) ? workflows : [];

    const defaultNav = [
      { label: "Overview", type: "workspace" },
      { label: "Organization", children: ["Governance", "Executive Offices"] },
      { label: "Departments", children: safeDepts.map(d => (typeof d === 'string' ? d : (d && d.name) || '')) },
      { label: "Portals", children: safePortals.map(p => (typeof p === 'string' ? p : (p && p.name) || '')) },
      { label: "Modules", children: safeModules.map(m => (typeof m === 'string' ? m : (m && m.name) || '')) },
      { label: "Forms", children: safeForms.map(f => (typeof f === 'string' ? f : (f && f.name) || '')) },
      { label: "Workflows", children: safeWorkflows.map(w => (typeof w === 'string' ? w : (w && w.name) || '')) },
      { label: "AI Assistant", children: [] },
      { label: "Configuration", children: [] }
    ];
    return defaultNav;
  }

  generate(blueprint, directive){
    const depts = (directive && Array.isArray(directive.departments) ? directive.departments : []) || (blueprint && Array.isArray(blueprint.departments) ? blueprint.departments : []);
    return this.generateEnterpriseNavigation({}, {}, depts);
  }

}

export const navigationGenerator = new NavigationGenerator();
