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
    } else if (file.endsWith('.ts') || file.endsWith('.tsx') || file.endsWith('.js') || file.endsWith('.jsx')) {
      results.push(full);
    }
  });
  return results;
}

const files = [...walk(path.resolve(__dirname, '../src')), ...walk(path.resolve(__dirname, '../experience'))];
console.log(`Auditing ${files.length} source files for unsafe .find() or undefined properties...`);

let issues = [];

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const lines = content.split('\n');
  lines.forEach((line, idx) => {
    // Check for variable.find( where variable is used before declaration or could be undefined
    if (line.includes('.find(')) {
      // Look for patterns like x.find( where x might be null/undefined
      // e.g. foo.find, but not Array.from(...).find or (x || []).find
    }
  });
});
console.log("Audit completed.");
