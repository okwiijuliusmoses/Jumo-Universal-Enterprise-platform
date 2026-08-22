const fs = require('fs');

const files = [
  'src/products/digital-pay/web/DigitalPayWebShell.tsx',
  'src/products/faap/web/FaapWebShell.tsx',
  'src/products/church-erp/web/ChurchErpWebShell.tsx',
  'src/products/education-erp/web/EducationErpWebShell.tsx'
];

files.forEach(f => {
  let c = fs.readFileSync(f, 'utf8');
  c = c.replace(/setActivePortalId\(authResult\.portalId\);(\s*)setAppState\('APP'\);/, "setActivePortalId(authResult.portalId);\n            const navs = AuthService.getNavigationForPortal(authResult.portalId);\n            if (navs.length > 0 && navs[0].items.length > 0) { setActiveTab(navs[0].items[0].id); }\n            setAppState('APP');");
  fs.writeFileSync(f, c);
});
console.log("activeTab logic fixed");
