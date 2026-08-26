const fs = require('fs');
const path = require('path');

const fintechDir = path.join(__dirname, '../src/products/fintech');
const dirs = fs.readdirSync(fintechDir).filter(f => fs.statSync(path.join(fintechDir, f)).isDirectory() && f !== 'registries');

dirs.forEach(dir => {
  const manifestPath = path.join(fintechDir, dir, 'manifest.ts');
  if (fs.existsSync(manifestPath)) {
    let content = fs.readFileSync(manifestPath, 'utf8');
    let needsUpdate = false;
    
    // Simple heuristic: if capabilities array is empty, it should be SCAFFOLDED
    if (content.includes('capabilities: []') && !content.includes("status: 'SCAFFOLDED'")) {
      content = content.replace(/status: '[^']+'/, "status: 'SCAFFOLDED'");
      needsUpdate = true;
    } else if (!content.includes('capabilities: []') && content.includes("status: 'SCAFFOLDED'")) {
      // If it has capabilities but is SCAFFOLDED, it might be partially implemented
      // (Unless it really is just scaffolded with planned capabilities. Let's assume partially for now)
      content = content.replace(/status: 'SCAFFOLDED'/, "status: 'PARTIALLY_IMPLEMENTED'");
      needsUpdate = true;
    }

    if (needsUpdate) {
      fs.writeFileSync(manifestPath, content);
      console.log(`Updated ${dir}/manifest.ts`);
    }
  }
});
console.log('Manifest audit complete');
