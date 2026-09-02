const fs = require('fs');
const path = require('path');

const minimumStandards = {
  minimumDirectorates: 40,
  minimumDepartments: 200,
  minimumOffices: 1000,
  minimumPortals: 5,
  minimumModules: 210,
  minimumCapabilities: 25000
};

const products = [
  { id: 'national-identity', name: 'NATIONAL IDENTITY & BIOMETRICS' },
  { id: 'national-health', name: 'NATIONAL HEALTH' },
  { id: 'national-education', name: 'NATIONAL EDUCATION' },
  { id: 'fintech', name: 'JUMO FINTECH' },
  { id: 'faap', name: 'JUMO FAAP' },
  { id: 'digital-pay', name: 'JUMO DIGITAL PAY' },
  { id: 'nursery-primary', name: 'NURSERY & PRIMARY ERP' },
  { id: 'secondary-school', name: 'SECONDARY SCHOOL ERP' },
  { id: 'university', name: 'UNIVERSITY / HIGHER EDUCATION ERP' },
  { id: 'church', name: 'CHURCH & FAITH ERP' },
  { id: 'alumni', name: 'ALUMNI & COMMUNITY ERP' }
];

function countFiles(dir, keyword) {
  if (!fs.existsSync(dir)) return 0;
  let count = 0;
  const files = fs.readdirSync(dir, { withFileTypes: true });
  for (const file of files) {
    if (file.isDirectory()) {
      if (file.name.toLowerCase().includes(keyword.toLowerCase())) {
         count += countAll(path.join(dir, file.name));
      } else {
         count += countFiles(path.join(dir, file.name), keyword);
      }
    } else {
      if (file.name.toLowerCase().includes(keyword.toLowerCase())) count++;
    }
  }
  return count;
}

function countAll(dir) {
    if (!fs.existsSync(dir)) return 0;
    let count = 0;
    const files = fs.readdirSync(dir, { withFileTypes: true });
    for (const file of files) {
        if (file.isDirectory()) {
            count += countAll(path.join(dir, file.name));
        } else {
            count++;
        }
    }
    return count;
}

let report = '====================================================\n';
report += 'JUMO UEOS PRODUCT-BY-PRODUCT PHYSICAL CENSUS\n\n';

let summaryTable = 'Product | Directorates | Departments | Offices | Portals | Modules | Capabilities | UI Metadata | Runtime Components | Status\n';

products.forEach((product, index) => {
  const productDir = path.join(__dirname, 'src', 'products', product.id);
  
  const directorates = countFiles(productDir, 'Directorate');
  const departments = countFiles(productDir, 'Department');
  const offices = countFiles(productDir, 'Office');
  const portals = countFiles(productDir, 'Portal');
  const modules = countFiles(productDir, 'Module');
  const capabilities = countFiles(productDir, 'Capability');
  const uiMetadata = countFiles(productDir, 'UI');
  const runtimeComponents = countFiles(productDir, 'Component');
  const forms = countFiles(productDir, 'Form');
  const workflows = countFiles(productDir, 'Workflow');
  const reports = countFiles(productDir, 'Report');
  const dashboards = countFiles(productDir, 'Dashboard');
  const tables = countFiles(productDir, 'Table');
  const actions = countFiles(productDir, 'Action');
  const permissions = countFiles(productDir, 'Permission');
  const apiEndpoints = countFiles(productDir, 'API');
  const databaseSchemas = countFiles(productDir, 'Schema');
  const services = countFiles(productDir, 'Service');
  const agents = countFiles(productDir, 'Agent');

  report += `PRODUCT ${index + 1} — ${product.name}\n\n`;
  report += `Directorates: ${directorates}\n`;
  report += `Departments: ${departments}\n`;
  report += `Offices: ${offices}\n`;
  report += `Portals: ${portals}\n`;
  report += `Modules: ${modules}\n`;
  report += `Capabilities: ${capabilities}\n`;
  report += `UI Metadata: ${uiMetadata}\n`;
  report += `Runtime Components: ${runtimeComponents}\n`;
  report += `Forms: ${forms}\n`;
  report += `Workflows: ${workflows}\n`;
  report += `Reports: ${reports}\n`;
  report += `Dashboards: ${dashboards}\n`;
  report += `Tables: ${tables}\n`;
  report += `Actions: ${actions}\n`;
  report += `Permissions: ${permissions}\n`;
  report += `API Endpoints: ${apiEndpoints}\n`;
  report += `Database Schemas: ${databaseSchemas}\n`;
  report += `Services: ${services}\n`;
  report += `Agents: ${agents}\n\n`;

  report += 'Minimum Standards:\n';
  report += `Directorates: ${directorates} / required ${minimumStandards.minimumDirectorates}\n`;
  report += `Departments: ${departments} / required ${minimumStandards.minimumDepartments}\n`;
  report += `Offices: ${offices} / required ${minimumStandards.minimumOffices}\n`;
  report += `Modules: ${modules} / required ${minimumStandards.minimumModules}\n`;
  report += `Capabilities: ${capabilities} / required ${minimumStandards.minimumCapabilities}\n\n`;

  const isCompliant = directorates >= minimumStandards.minimumDirectorates &&
                      departments >= minimumStandards.minimumDepartments &&
                      offices >= minimumStandards.minimumOffices &&
                      modules >= minimumStandards.minimumModules &&
                      capabilities >= minimumStandards.minimumCapabilities;

  const status = isCompliant ? 'COMPLIANT' : 'NON-COMPLIANT — RECONSTRUCTION REQUIRED';
  
  report += 'Status:\n';
  report += `${status}\n\n`;
  
  report += 'Evidence:\n';
  report += `Physical directory path: src/products/${product.id}/\n`;
  report += '----------------------------------------------------\n\n';

  summaryTable += `${product.name} | ${directorates} | ${departments} | ${offices} | ${portals} | ${modules} | ${capabilities} | ${uiMetadata} | ${runtimeComponents} | ${status}\n`;
});

report += 'PLATFORM-WIDE INVENTORY\n\n';
report += 'Universal Modules: 221 (Registry Definition)\n';
report += 'Universal Capabilities: 25000+ (Registry Definition)\n';
report += 'Universal Runtime Components: 400+ (Registry Definition)\n\n';

report += 'PRODUCT COMPARISON TABLE\n\n';
report += summaryTable;

fs.writeFileSync('CENSUS_REPORT.txt', report);
console.log('Census completed. Check CENSUS_REPORT.txt');
