const fs = require('fs');
let content = fs.readFileSync('platform/factory/erp/ERPBlueprintRegistry.js', 'utf8');

content = content.replace(/configurableScope:\s*\[([\s\S]*?)\]/g, (match, p1) => {
  const items = p1.split(',').map(s => s.trim().replace(/"/g, '')).filter(s => s);
  const templates = items.map(item => `        { id: "${item.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}", name: "${item} ERP" }`).join(',\n');
  return `templates: [\n${templates}\n      ]`;
});

fs.writeFileSync('platform/factory/erp/ERPBlueprintRegistry.js', content);
console.log('Blueprints rewritten');
