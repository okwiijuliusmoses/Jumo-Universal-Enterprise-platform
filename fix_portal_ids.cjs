const fs = require('fs');

const files = [
  'src/products/digital-pay/web/DigitalPayWebShell.tsx',
  'src/products/faap/web/FaapWebShell.tsx',
  'src/products/church-erp/web/ChurchErpWebShell.tsx',
  'src/products/education-erp/web/EducationErpWebShell.tsx'
];

files.forEach(f => {
  let c = fs.readFileSync(f, 'utf8');
  c = c.replace(/useState<string>\('EDU_EXECUTIVE'\)/, "useState<string>('')");
  c = c.replace(/useState<string>\('DP_MERCHANT'\)/, "useState<string>('')");
  c = c.replace(/useState<string>\('FAAP_CFO'\)/, "useState<string>('')");
  c = c.replace(/useState<string>\('CH_BISHOP'\)/, "useState<string>('')");
  fs.writeFileSync(f, c);
});
console.log("Portal IDs cleared");
