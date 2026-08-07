const fs = require('fs');

let shell = fs.readFileSync('src/experience/shell/UEOSShell.tsx', 'utf8');

const navItemsOld = `  const navItems = [
    { id: "dashboard", label: "Command Center", icon: Terminal },
    { id: "ecosystems", label: "Ecosystem Factory", icon: Globe },
    { id: "templates", label: "Template Marketplace", icon: Layers },
    { id: "factory", label: "ERP Factory", icon: Cpu },
    { id: "instances", label: "Institution Management", icon: Database },
    { id: "security", label: "Security Operations", icon: Shield },
    { id: "workflows", label: "Runtime Operations", icon: Workflow },
    { id: "diagnostics", label: "Kernel Diagnostics", icon: Activity },
    { id: "settings", label: "AI Platform", icon: Settings },
  ];`;

const navItemsNew = `  const navItems = [
    { id: "dashboard", label: "Command Center", icon: Terminal },
    { id: "ecosystems", label: "Ecosystem Factory", icon: Globe },
    { id: "factory", label: "ERP Factory", icon: Cpu },
    { id: "templates", label: "Template Marketplace", icon: Layers },
    { id: "instances", label: "Institution Management", icon: Database },
    { id: "workflows", label: "Runtime Operations", icon: Workflow },
    { id: "security", label: "Security Operations", icon: Shield },
    { id: "settings", label: "AI Platform", icon: Cpu },
    { id: "diagnostics", label: "Analytics", icon: Activity },
  ];`;

shell = shell.replace(navItemsOld, navItemsNew);

// Rename "Kernel Dashboard" text to "JUMO UEOS CONTROL CENTER"
// Or we can just update the Header to say "JUMO UEOS CONTROL CENTER"
shell = shell.replace(
  `JUMO UEOS</span>`,
  `JUMO UEOS CONTROL CENTER</span>`
);

fs.writeFileSync('src/experience/shell/UEOSShell.tsx', shell);
