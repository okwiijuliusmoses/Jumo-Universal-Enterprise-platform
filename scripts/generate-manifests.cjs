const fs = require('fs');
const path = require('path');

const regPath = path.join(__dirname, '../src/products/fintech/registries/FintechFamilyRegistry.ts');
const content = fs.readFileSync(regPath, 'utf8');

// Quick regex to extract families
const familyRegex = /id:\s*'([^']+)',\s*code:\s*'([^']+)',\s*name:\s*'([^']+)',\s*description:\s*'([^']+)'/g;

let match;
const families = [];
while ((match = familyRegex.exec(content)) !== null) {
  families.push({
    id: match[1],
    code: match[2],
    name: match[3],
    description: match[4]
  });
}

const toKebabCase = str =>
    str &&
    str
      .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
      .map(x => x.toLowerCase())
      .join('-');

families.forEach(fam => {
  // Edge cases for existing directory names if they don't match exactly
  let dirName = toKebabCase(fam.name);
  if (fam.id === 'FAM_PAY_SWITCH') dirName = 'payment-switching';
  if (fam.id === 'FAM_MOBILE_MONEY') dirName = 'mobile-money';
  if (fam.id === 'FAM_LEDGER') dirName = 'financial-accounting';
  if (fam.id === 'FAM_AGENT_BANKING') dirName = 'agent-banking';
  if (fam.id === 'FAM_MICROFINANCE') dirName = 'microfinance';

  // Overrides based on scaffold script
  const nameMap = {
    'Universal Payment Switching': 'payment-switching',
    'Bank Payments & Account Transfers': 'bank-payments',
    'Digital Wallets': 'digital-wallets',
    'Multi-Currency Wallet & Currency Accounts': 'multi-currency',
    'Foreign Exchange & FX Treasury': 'fx',
    'Cross-Border Payments': 'cross-border',
    'Remittance Platform': 'remittance',
    'Business Collections': 'collections',
    'Business Payouts & Disbursements': 'payouts',
    'Payment Gateway & Checkout': 'payment-gateway',
    'Merchant Services': 'merchant-services',
    'Cards & Virtual Cards': 'cards',
    'Global Accounts': 'global-accounts',
    'Agent Banking': 'agent-banking',
    'Digital Banking': 'digital-banking',
    'Savings & Deposits': 'savings',
    'Microfinance': 'microfinance',
    'Lending & Credit': 'lending',
    'SACCO & Cooperative Finance': 'sacco',
    'Treasury & Liquidity': 'treasury',
    'Stablecoin & Digital-Asset Rails': 'stablecoin',
    'Payroll & Mass Payments': 'payroll',
    'Bills, Utilities & Government Payments': 'bills',
    'Insurance & Insurtech': 'insurance',
    'Investment, Wealth & Capital Markets': 'investment',
    'Merchant Finance & Embedded Finance': 'embedded-finance',
    'Financial API & Developer Platform': 'developer-api',
    'Financial Compliance, Risk & Fraud': 'compliance',
    'Ledger & Financial Accounting': 'financial-accounting',
    'Revenue & Fee Management': 'revenue-management',
    'Data, AI & Alternative Credit Scoring': 'ai-credit'
  };

  dirName = nameMap[fam.name] || dirName;

  const manifestPath = path.join(__dirname, `../src/products/fintech/${dirName}/manifest.ts`);
  
  if (fs.existsSync(path.dirname(manifestPath))) {
    // Check if it's already implemented by looking at the content
    let existing = '';
    if (fs.existsSync(manifestPath)) existing = fs.readFileSync(manifestPath, 'utf8');

    if (!existing.includes('capabilities: [') || existing.includes('capabilities: []')) {
      const tsId = fam.id.replace(/_/g, '') + 'Manifest';
      
      const newManifest = `export const ${tsId} = {
  id: '${fam.id}',
  name: '${fam.name}',
  version: '1.0.0',
  description: '${fam.description.replace(/'/g, "\\'")}',
  status: 'SCAFFOLDED',
  dependencies: [],
  capabilities: [],
  apis: [],
  workflows: [],
  reports: []
};
`;
      fs.writeFileSync(manifestPath, newManifest);
    }
  } else {
    console.warn('Dir not found:', dirName);
  }
});
console.log('Manifests updated');
