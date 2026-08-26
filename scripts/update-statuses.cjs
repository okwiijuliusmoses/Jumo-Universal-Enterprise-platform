const fs = require('fs');
const path = require('path');

const regPath = path.join(__dirname, '../src/products/fintech/registries/FintechFamilyRegistry.ts');
let content = fs.readFileSync(regPath, 'utf8');

// Update interface
content = content.replace(/status: 'ACTIVE' \| 'IN_DEVELOPMENT' \| 'PLANNED';/, "status: 'SCAFFOLDED' | 'PARTIALLY_IMPLEMENTED' | 'FUNCTIONALLY_IMPLEMENTED' | 'INTEGRATED' | 'BENCHMARK_VERIFIED' | 'PRODUCTION_VERIFIED';");

// Reset all to SCAFFOLDED
content = content.replace(/status: 'ACTIVE'/g, "status: 'SCAFFOLDED'");

// Set specific ones to PARTIALLY_IMPLEMENTED or PRODUCTION_VERIFIED
const verified = ['FAM_LEDGER', 'FAM_AGENT_BANKING', 'FAM_MICROFINANCE', 'FAM_PAY_SWITCH', 'FAM_MOBILE_MONEY'];

verified.forEach(id => {
  const regex = new RegExp(`(id:\\s*'${id}',[\\s\\S]*?status:\\s*)'SCAFFOLDED'`);
  content = content.replace(regex, "$1'PARTIALLY_IMPLEMENTED'");
});

fs.writeFileSync(regPath, content);
console.log('Statuses updated');
