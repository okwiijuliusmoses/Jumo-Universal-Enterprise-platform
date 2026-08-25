const fs = require('fs');
let c = fs.readFileSync('src/products/education-erp/web/EducationErpWebShell.tsx', 'utf8');
c = c.replace(/import \{ EducationTemplateRegistry, PortalRegistry, calculateRegistryStats, WorkflowRegistry, ModuleRegistry, FormRegistry, WorkflowRegistry, ReportRegistry \} from '\.\.\/\.\.\/registries';/, 
              "import { EducationTemplateRegistry, PortalRegistry, calculateRegistryStats, WorkflowRegistry, ModuleRegistry, FormRegistry, ReportRegistry } from '../../registries';");
fs.writeFileSync('src/products/education-erp/web/EducationErpWebShell.tsx', c);
console.log("Fixed Edu Imports");
