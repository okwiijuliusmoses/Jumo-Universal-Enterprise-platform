const fs = require('fs');
const files = [
  'src/products/digital-pay/web/DigitalPayWebShell.tsx',
  'src/products/faap/web/FaapWebShell.tsx',
  'src/products/church-erp/web/ChurchErpWebShell.tsx',
  'src/products/education-erp/web/EducationErpWebShell.tsx'
];

files.forEach(f => {
  let c = fs.readFileSync(f, 'utf8');
  c = c.replace(/  \}\n  \};\n/g, '  };\n');
  fs.writeFileSync(f, c);
});
