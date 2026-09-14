const fs = require('fs');
const path = require('path');

const minimumStandards = {
  directorates: 40,
  departments: 200,
  offices: 1000,
  portals: 5,
  modules: 210,
  capabilities: 25000,
  uiMetadata: 210,
  runtimeComponents: 210,
  forms: 150,
  workflows: 50,
  reports: 100,
  dashboards: 25,
  tables: 100,
  actions: 500,
  permissions: 500,
  apiEndpoints: 100,
  databaseSchemas: 25
};

const products = [
  { id: 'national-identity', name: 'NATIONAL IDENTITY & BIOMETRICS', path: 'src/products/national-identity' },
  { id: 'national-health', name: 'NATIONAL HEALTH', path: 'src/products/national-health' },
  { id: 'national-education', name: 'NATIONAL EDUCATION', path: 'src/products/national-education' },
  { id: 'fintech', name: 'JUMO FINTECH', path: 'src/platforms/fintech' },
  { id: 'faap', name: 'JUMO FAAP', path: 'src/platforms/faap' },
  { id: 'digital-pay', name: 'JUMO DIGITAL PAY', path: 'src/platforms/digitalPay' },
  { id: 'nursery-primary', name: 'NURSERY & PRIMARY ERP', path: 'src/products/nursery-primary' },
  { id: 'secondary-school', name: 'SECONDARY SCHOOL ERP', path: 'src/products/secondary-school' },
  { id: 'university', name: 'UNIVERSITY / HIGHER EDUCATION ERP', path: 'src/products/university' },
  { id: 'church', name: 'CHURCH & FAITH ERP', path: 'src/products/church' },
  { id: 'alumni', name: 'ALUMNI & COMMUNITY ERP', path: 'src/products/alumni' }
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

let report = '### PRODUCT-BY-PRODUCT GAP REPORT\n\n';

products.forEach((product) => {
  const productDir = path.join(__dirname, product.path);
  
  const counts = {
    directorates: countFiles(productDir, 'Directorate'),
    departments: countFiles(productDir, 'Department'),
    offices: countFiles(productDir, 'Office'),
    portals: countFiles(productDir, 'Portal'),
    modules: countFiles(productDir, 'Module'),
    capabilities: countFiles(productDir, 'Capability'),
    uiMetadata: countFiles(productDir, 'UI'),
    runtimeComponents: countFiles(productDir, 'Component'),
    forms: countFiles(productDir, 'Form'),
    workflows: countFiles(productDir, 'Workflow'),
    reports: countFiles(productDir, 'Report'),
    dashboards: countFiles(productDir, 'Dashboard'),
    tables: countFiles(productDir, 'Table'),
    actions: countFiles(productDir, 'Action'),
    permissions: countFiles(productDir, 'Permission'),
    apiEndpoints: countFiles(productDir, 'API'),
    databaseSchemas: countFiles(productDir, 'Schema')
  };

  report += `#### ${product.name}\n`;
  report += `*Physical Evidence Path: \`${product.path}/\`*\n\n`;
  report += `| Metric | Actual | Required Minimum | Gap | Physical Evidence |\n`;
  report += `| :--- | :--- | :--- | :--- | :--- |\n`;
  
  Object.keys(minimumStandards).forEach(key => {
    const actual = counts[key];
    const required = minimumStandards[key];
    const gap = actual - required;
    const metricName = key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1');
    const gapDisplay = gap >= 0 ? `+${gap}` : `${gap}`;
    report += `| ${metricName} | **${actual}** | ${required} | ${gapDisplay} | \`${product.path}\` |\n`;
  });
  report += '\n';
});

fs.writeFileSync('GAP_REPORT.md', report);
console.log('Report generated');
