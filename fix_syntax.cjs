const fs = require('fs');
const files = [
  'src/products/digital-pay/web/DigitalPayWebShell.tsx',
  'src/products/faap/web/FaapWebShell.tsx',
  'src/products/church-erp/web/ChurchErpWebShell.tsx',
  'src/products/education-erp/web/EducationErpWebShell.tsx'
];

files.forEach(f => {
  let c = fs.readFileSync(f, 'utf8');
  // I need to replace '  }  };' with '  };' at the end of renderCurrentPage
  c = c.replace(/  \}\n  \};\n  const menuGroups = /g, '  };\n  const menuGroups = ');
  fs.writeFileSync(f, c);
});
