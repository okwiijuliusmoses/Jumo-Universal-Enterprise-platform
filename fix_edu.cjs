const fs = require('fs');
let c = fs.readFileSync('src/products/education-erp/web/EducationErpWebShell.tsx', 'utf8');
// Find the exact broken piece
const broken = `    );
  }
  };`;
const fixed = `    );
  };`;
c = c.replace(broken, fixed);
// Just in case it's something else, let's fix all occurrences of "} };"
c = c.replace(/  \}\n  \};\n/g, '  };\n');
fs.writeFileSync('src/products/education-erp/web/EducationErpWebShell.tsx', c);
