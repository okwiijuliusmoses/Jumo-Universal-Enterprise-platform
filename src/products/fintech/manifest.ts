export interface ProductManifest {
  productId: string;
  code: string;
  name: string;
  category: string;
  description: string;
  version: string;
  leadExecutiveRole: string;
  governingLegislation: string;
  standaloneRoute: string;
  theme: {
    primaryColor: string;
    accentBg: string;
    badgeStyle: string;
    headerBg: string;
  };
  benchmarkSources: string[];
}

export const FINTECH_MANIFEST: ProductManifest = {
  productId: 'prod-fintech',
  code: 'FTERP',
  name: 'JUMO Sovereign FINTECH & SACCO OS',
  category: 'FINANCIAL_SERVICES',
  description: 'Sovereign financial services & SACCO operating system: Customer / Member financial accounts, savings & fixed deposits, microfinance loan origination & credit scoring, Mobile Money & Digital Pay paycode collections, FAAP general ledger & journal posting, treasury & liquidity management, risk & AML monitoring, trial balance and financial statement generation.',
  version: '2026.4.0',
  leadExecutiveRole: 'Chief Financial Officer & SACCO Operations Lead',
  governingLegislation: 'Financial Institutions Act & Microfinance SACCO Regulations 2026',
  standaloneRoute: '/app/fintech',
  theme: {
    primaryColor: 'emerald',
    accentBg: 'bg-emerald-600',
    badgeStyle: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    headerBg: 'bg-white border-emerald-200'
  },
  benchmarkSources: [
    'QuickBooks Enterprise Accounting Benchmark & Financial Standards',
    'Uganda Microfinance Regulatory Authority (UMRA) SACCO Operating Guidelines 2026'
  ]
};
