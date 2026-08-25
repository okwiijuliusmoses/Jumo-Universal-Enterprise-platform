const fs = require('fs');
const path = require('path');

const srcDir = path.resolve(__dirname, '..');
const dstDir = '/app/applet';

function copyRecursive(src, dst) {
  if (!fs.existsSync(src)) return;
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    if (!fs.existsSync(dst)) {
      fs.mkdirSync(dst, { recursive: true });
    }
    const entries = fs.readdirSync(src);
    entries.forEach(entry => {
      if (entry === 'node_modules' || entry === '.git') return;
      copyRecursive(path.join(src, entry), path.join(dst, entry));
    });
  } else {
    fs.copyFileSync(src, dst);
  }
}

console.log("Synchronizing /app/jumo-restored -> /app/applet...");
copyRecursive(srcDir, dstDir);
console.log("✓ Synchronization complete.");
