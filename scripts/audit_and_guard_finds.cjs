const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);
    if (stat && stat.isDirectory()) {
      if (!full.includes('node_modules') && !full.includes('.git') && !full.includes('dist')) {
        results = results.concat(walk(full));
      }
    } else if (file.endsWith('.ts') || file.endsWith('.tsx')) {
      results.push(full);
    }
  });
  return results;
}

const files = [...walk(path.resolve(__dirname, '../src')), ...walk(path.resolve(__dirname, '../experience'))];

let modifiedCount = 0;

files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  let original = content;

  // Let's check common vulnerable patterns like:
  // ApprovedProductRegistry.find(...) -> (ApprovedProductRegistry || []).find(...)
  // PortalRegistry.find(...) -> (PortalRegistry || []).find(...)
  // CredentialRegistry.find(...) -> (CredentialRegistry || []).find(...)
  // NavigationRegistry.find(...) -> (NavigationRegistry || []).find(...)
  // MasterModuleRegistry.find -> ...
  // OWNER_PRODUCTS.find(...) -> (OWNER_PRODUCTS || []).find(...)

  content = content.replace(/ApprovedProductRegistry\.find\(/g, '(ApprovedProductRegistry || []).find(');
  content = content.replace(/PortalRegistry\.find\(/g, '(PortalRegistry || []).find(');
  content = content.replace(/CredentialRegistry\.find\(/g, '(CredentialRegistry || []).find(');
  content = content.replace(/NavigationRegistry\.find\(/g, '(NavigationRegistry || []).find(');
  content = content.replace(/OWNER_PRODUCTS\.find\(/g, '(OWNER_PRODUCTS || []).find(');

  if (content !== original) {
    fs.writeFileSync(f, content, 'utf8');
    modifiedCount++;
    console.log(`Guarded registries in: ${path.relative(path.resolve(__dirname, '..'), f)}`);
  }
});

console.log(`Safeguarded ${modifiedCount} files.`);
