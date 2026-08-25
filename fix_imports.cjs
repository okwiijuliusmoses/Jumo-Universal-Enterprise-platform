const fs = require('fs');

const files = [
  'src/products/digital-pay/web/DigitalPayWebShell.tsx',
  'src/products/faap/web/FaapWebShell.tsx',
  'src/products/church-erp/web/ChurchErpWebShell.tsx',
  'src/products/education-erp/web/EducationErpWebShell.tsx'
];

files.forEach(f => {
  let c = fs.readFileSync(f, 'utf8');
  // ensure we have the right imports from '../../registries'
  // I will just add an extra import line for FormRegistry, WorkflowRegistry, ReportRegistry
  if (!c.includes('import { FormRegistry, WorkflowRegistry, ReportRegistry } from')) {
    c = c.replace(/import \{ AuthService \} from '\.\.\/\.\.\/AuthService';/, 
                  "import { AuthService } from '../../AuthService';\nimport { FormRegistry, WorkflowRegistry, ReportRegistry } from '../../registries';");
  }
  fs.writeFileSync(f, c);
});
console.log("Imports fixed");
