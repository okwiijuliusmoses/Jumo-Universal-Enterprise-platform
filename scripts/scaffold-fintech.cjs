const fs = require('fs');
const path = require('path');

const families = [
  { id: 'FAM_PAY_SWITCH', path: 'payment-switching', name: 'Universal Payment Switching' },
  { id: 'FAM_MOBILE_MONEY', path: 'mobile-money', name: 'Mobile Money' },
  { id: 'FAM_BANK_PAYMENTS', path: 'bank-payments', name: 'Bank Payments & Account Transfers' },
  { id: 'FAM_DIGITAL_WALLETS', path: 'digital-wallets', name: 'Digital Wallets' },
  { id: 'FAM_MULTI_CURRENCY', path: 'multi-currency', name: 'Multi-Currency Wallet' },
  { id: 'FAM_FX', path: 'fx', name: 'Foreign Exchange & FX Treasury' },
  { id: 'FAM_CROSS_BORDER', path: 'cross-border', name: 'Cross-Border Payments' },
  { id: 'FAM_REMITTANCE', path: 'remittances', name: 'Remittance Platform' },
  { id: 'FAM_COLLECTIONS', path: 'collections', name: 'Business Collections' },
  { id: 'FAM_PAYOUTS', path: 'payouts', name: 'Business Payouts' },
  { id: 'FAM_PAYMENT_GATEWAY', path: 'payment-gateway', name: 'Payment Gateway & Checkout' },
  { id: 'FAM_MERCHANT_SERVICES', path: 'merchant-services', name: 'Merchant Services' },
  { id: 'FAM_CARDS', path: 'cards', name: 'Cards & Virtual Cards' },
  { id: 'FAM_GLOBAL_ACCOUNTS', path: 'global-accounts', name: 'Global Accounts' },
  { id: 'FAM_AGENT_BANKING', path: 'agent-banking', name: 'Agent Banking' },
  { id: 'FAM_DIGITAL_BANKING', path: 'digital-banking', name: 'Digital Banking' },
  { id: 'FAM_SAVINGS', path: 'savings', name: 'Savings & Deposits' },
  { id: 'FAM_MICROFINANCE', path: 'microfinance', name: 'Microfinance' },
  { id: 'FAM_LENDING', path: 'lending', name: 'Lending & Credit' },
  { id: 'FAM_SACCO', path: 'sacco', name: 'SACCO & Cooperative Finance' },
  { id: 'FAM_TREASURY', path: 'treasury', name: 'Treasury & Liquidity' },
  { id: 'FAM_STABLECOIN', path: 'stablecoin', name: 'Stablecoin & Digital-Asset Rails' },
  { id: 'FAM_PAYROLL', path: 'payroll', name: 'Payroll & Mass Payments' },
  { id: 'FAM_BILLS', path: 'bill-payments', name: 'Bills, Utilities & Government Payments' },
  { id: 'FAM_INSURANCE', path: 'insurance', name: 'Insurance & Insurtech' },
  { id: 'FAM_INVESTMENT', path: 'investment', name: 'Investment, Wealth & Capital Markets' },
  { id: 'FAM_EMBEDDED_FINANCE', path: 'embedded-finance', name: 'Merchant Finance' },
  { id: 'FAM_DEVELOPER_API', path: 'developer-api', name: 'Financial API & Developer Platform' },
  { id: 'FAM_COMPLIANCE', path: 'compliance', name: 'Financial Compliance, Risk & Fraud' },
  { id: 'FAM_LEDGER', path: 'financial-accounting', name: 'Financial Accounting & FAAP Ledger' },
  // Adding explicitly requested distinct items if any missed:
  { id: 'FAM_MERCHANT_ACQUIRING', path: 'merchant-acquiring', name: 'Merchant Acquiring' },
  { id: 'FAM_TAX_REVENUE', path: 'tax-revenue', name: 'Tax & Revenue' },
  { id: 'FAM_DATA_INTELLIGENCE', path: 'data-intelligence', name: 'Financial Data & Intelligence' },
  { id: 'FAM_SECURITIES_CUSTODY', path: 'securities-custody', name: 'Securities & Custody' },
  { id: 'FAM_TRADE_FINANCE', path: 'trade-finance', name: 'Trade Finance' },
  { id: 'FAM_AGRICULTURAL_FINANCE', path: 'agricultural-finance', name: 'Agricultural Finance' },
  { id: 'FAM_ATM_SELF_SERVICE', path: 'atm-self-service', name: 'ATM & Self-Service Banking' },
  { id: 'FAM_CAPITAL_MARKETS', path: 'capital-markets', name: 'Capital Markets' },
];

const subdirs = [
  'domain', 'services', 'repositories', 'api', 'web', 'mobile',
  'integrations', 'workflows', 'reports', 'ai', 'security',
  'installer', 'tests', 'benchmarks'
];

families.forEach(f => {
  const base = path.join(__dirname, '..', 'src', 'products', 'fintech', f.path);
  
  if (!fs.existsSync(base)) {
    fs.mkdirSync(base, { recursive: true });
  }

  subdirs.forEach(sub => {
    const subPath = path.join(base, sub);
    if (!fs.existsSync(subPath)) {
      fs.mkdirSync(subPath, { recursive: true });
    }
  });

  const manifestContent = `export const ${f.id.replace(/_/g, '')}Manifest = {
  id: '${f.id}',
  name: '${f.name}',
  version: '1.0.0',
  description: 'Independent financial module for ${f.name}',
  status: 'REGISTERED',
  dependencies: [],
  capabilities: [],
  apis: [],
  workflows: [],
  reports: []
};
`;
  fs.writeFileSync(path.join(base, 'manifest.ts'), manifestContent);

  const indexContent = `export * from './manifest';\n`;
  fs.writeFileSync(path.join(base, 'index.ts'), indexContent);
});

console.log('Successfully scaffolded 30+ financial families with full modular structure.');
