const fs = require('fs');
let content = fs.readFileSync('experience/erp/index.js', 'utf8');

content = content.replace(/hover:bg-slate-850/g, 'hover:bg-slate-50');
content = content.replace(/text-emerald-400/g, 'text-emerald-600');
content = content.replace(/bg-rose-950\/30/g, 'bg-rose-50');
content = content.replace(/border-rose-900/g, 'border-rose-200');
content = content.replace(/text-rose-400/g, 'text-rose-600');

fs.writeFileSync('experience/erp/index.js', content);
