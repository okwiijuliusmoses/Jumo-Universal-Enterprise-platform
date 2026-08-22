export interface BenchmarkEvidence {
  source: string;
  url?: string;
  notes: string;
}

export interface FintechCapability {
  id: string;
  familyId: string;
  name: string;
  description: string;
  benchmarks: BenchmarkEvidence[];
  implementationStatus: 'EXISTING' | 'PARTIAL' | 'MISSING' | 'IMPLEMENTED' | 'VERIFIED' | 'DEFERRED';
  targetModuleId?: string;
  isExtractedFromPrevious: boolean;
}

export const FintechCapabilityRegistry: FintechCapability[] = [
  // --- PRESERVED HISTORICAL EXTRACTS ---
  {
    id: 'CAP_LEDG_01',
    familyId: 'FAM_LEDGER',
    name: 'Double-Entry Accounting Core',
    description: 'Cryptographically sealed double-entry postings requiring zero parity.',
    benchmarks: [
      { source: 'Modern Treasury', notes: 'Ledger API architecture.' },
      { source: 'QuickBooks', notes: 'Core accounting principles (Extracted from JUMO QuickBooks Benchmark)' },
      { source: 'FAAP', notes: 'JUMO Financial & Accounting Platform core extracted.' }
    ],
    implementationStatus: 'VERIFIED',
    targetModuleId: 'MOD_FAAP_CORE',
    isExtractedFromPrevious: true
  },
  {
    id: 'CAP_LEDG_02',
    familyId: 'FAM_LEDGER',
    name: 'Triple-Column Cash Book',
    description: 'Advanced cash and bank reconciliation cashbook.',
    benchmarks: [
      { source: 'Alpha Academy / SchoolPay', notes: 'Bursar cash book requirements (Extracted)' }
    ],
    implementationStatus: 'VERIFIED',
    targetModuleId: 'MOD_FAAP_CASHBOOK',
    isExtractedFromPrevious: true
  },
  {
    id: 'CAP_SW_01',
    familyId: 'FAM_PAY_SWITCH',
    name: 'Universal Routing Engine',
    description: 'Dynamic routing of transactions across multiple payment rails based on cost and uptime.',
    benchmarks: [
      { source: 'Cellulant', notes: 'Tingg payment gateway routing.' },
      { source: 'Flutterwave', notes: 'Multi-rail checkout orchestration.' },
      { source: 'SchoolPay', notes: 'Universal digital payments integration (Extracted)' }
    ],
    implementationStatus: 'VERIFIED',
    targetModuleId: 'MOD_SW_ROUTER',
    isExtractedFromPrevious: true
  },
  {
    id: 'CAP_SW_02',
    familyId: 'FAM_PAY_SWITCH',
    name: 'Merchant Settlement Splits',
    description: 'Configurable commission and multi-party settlement splits.',
    benchmarks: [
      { source: 'Stripe Connect', notes: 'Complex split payments.' }
    ],
    implementationStatus: 'EXISTING',
    targetModuleId: 'MOD_SW_SETTLE',
    isExtractedFromPrevious: true
  },
  {
    id: 'CAP_SACCO_01',
    familyId: 'FAM_SACCO',
    name: 'BOSA / FOSA Management',
    description: 'Back Office and Front Office Savings Activity management for Cooperatives.',
    benchmarks: [
      { source: 'Kweli SACCO / Regional Systems', notes: 'Core cooperative accounting.' }
    ],
    implementationStatus: 'EXISTING',
    targetModuleId: 'MOD_SACCO_CORE',
    isExtractedFromPrevious: true
  },
  {
    id: 'CAP_WAL_01',
    familyId: 'FAM_DIGITAL_WALLETS',
    name: 'Virtual Wallet Provisioning',
    description: 'Create individual and business closed-loop wallets.',
    benchmarks: [
      { source: 'Marqeta', notes: 'Just-in-time funding and wallet ledger.' },
      { source: 'Digital Pay Stored Value', notes: 'JUMO Digital Pay closed-loop wallets (Extracted)' }
    ],
    implementationStatus: 'VERIFIED',
    targetModuleId: 'MOD_WAL_CORE',
    isExtractedFromPrevious: true
  },

  // --- NEW FAMILY-SPECIFIC BENCHMARKS ---
  {
    id: 'CAP_MM_01',
    familyId: 'FAM_MOBILE_MONEY',
    name: 'Mobile Money Issuance & Wallets',
    description: 'Issuing e-money into digital wallets for registered MSISDNs.',
    benchmarks: [
      { source: 'MTN MoMo API', notes: 'Core wallet issuance functionality.' },
      { source: 'M-Pesa API', notes: 'Customer account creation and balance management.' }
    ],
    implementationStatus: 'PARTIAL',
    targetModuleId: 'MOD_MM_CORE',
    isExtractedFromPrevious: false
  },
  {
    id: 'CAP_MM_03',
    familyId: 'FAM_MOBILE_MONEY',
    name: 'Cash-In / Cash-Out (CICO)',
    description: 'Agent-assisted deposits and withdrawals.',
    benchmarks: [
      { source: 'Airtel Money API', notes: 'Agent till management and cash out.' }
    ],
    implementationStatus: 'PARTIAL',
    targetModuleId: 'MOD_MM_AGENT',
    isExtractedFromPrevious: false
  },
  {
    id: 'CAP_LEND_01',
    familyId: 'FAM_LENDING',
    name: 'Amortization Engine',
    description: 'Calculates loan schedules (reducing balance, flat rate).',
    benchmarks: [
      { source: 'Mambu', notes: 'Loan schedule generation.' },
      { source: 'ThoughtMachine', notes: 'Smart contracts for lending products.' }
    ],
    implementationStatus: 'PARTIAL',
    targetModuleId: 'MOD_LEND_SCHEDULE',
    isExtractedFromPrevious: false
  },
  {
    id: 'CAP_FX_01',
    familyId: 'FAM_FX',
    name: 'Real-Time FX Quoting & Dealing',
    description: 'Provide real-time executable FX quotes for cross-border transactions.',
    benchmarks: [
      { source: 'Eversend', notes: 'In-app currency conversion.' },
      { source: 'Wise', notes: 'Mid-market rate API.' },
      { source: 'Standard Bank FX', notes: 'Enterprise dealing desk (Extracted)' }
    ],
    implementationStatus: 'VERIFIED',
    targetModuleId: 'MOD_FX_RATES',
    isExtractedFromPrevious: true
  },
  {
    id: 'CAP_MERCH_01',
    familyId: 'FAM_MERCHANT_SERVICES',
    name: 'Merchant Acquiring & Settlement',
    description: 'Tiered commission deduction, settlement routing, and gross-net calculation.',
    benchmarks: [
      { source: 'Stripe', notes: 'Merchant onboarding and acquiring.' },
      { source: 'JUMO Pay Merchant POS', notes: 'Historical JUMO Pay capability.' }
    ],
    implementationStatus: 'VERIFIED',
    targetModuleId: 'MOD_MERCH_SETTLE',
    isExtractedFromPrevious: true
  },
  {
    id: 'CAP_AGT_01',
    familyId: 'FAM_AGENT_BANKING',
    name: 'Agent Liquidity & Float Management',
    description: 'Management of agent tills, hierarchical super-agents, and float rebalancing.',
    benchmarks: [
      { source: 'Agency Banking / OPay', notes: 'Super-agent till hierarchy.' }
    ],
    implementationStatus: 'VERIFIED',
    targetModuleId: 'MOD_AGT_FLOAT',
    isExtractedFromPrevious: false
  },
  {
    id: 'CAP_MICRO_01',
    familyId: 'FAM_MICROFINANCE',
    name: 'Group Lending (JLG / VSLA)',
    description: 'Joint Liability Groups and VSLA methodology for microfinance.',
    benchmarks: [
      { source: 'Musoni System', notes: 'Cloud microfinance group lending.' },
      { source: 'Kiva', notes: 'Microfinance disbursement.' }
    ],
    implementationStatus: 'VERIFIED',
    targetModuleId: 'MOD_MICRO_LENDING',
    isExtractedFromPrevious: false
  },
  {
    id: 'CAP_REM_01',
    familyId: 'FAM_REMITTANCE',
    name: 'International Remittance Corridors',
    description: 'Multi-corridor cross border remittance delivery (Cash pickup, Bank, Wallet).',
    benchmarks: [
      { source: 'WorldRemit', notes: 'Remittance corridors and delivery methods.' },
      { source: 'Sendwave', notes: 'Instant mobile money remittance.' }
    ],
    implementationStatus: 'MISSING',
    targetModuleId: 'MOD_REM_CORRIDOR',
    isExtractedFromPrevious: false
  },
  {
    id: 'CAP_CARD_01',
    familyId: 'FAM_CARDS',
    name: 'Virtual Card Issuing',
    description: 'Dynamic virtual card creation and lifecycle management.',
    benchmarks: [
      { source: 'Marqeta', notes: 'Modern card issuing API.' },
      { source: 'Lithic', notes: 'Privacy.com virtual cards.' }
    ],
    implementationStatus: 'MISSING',
    targetModuleId: 'MOD_CARD_ISSUE',
    isExtractedFromPrevious: false
  },
  {
    id: 'CAP_COMP_01',
    familyId: 'FAM_COMPLIANCE',
    name: 'KYC & AML Transaction Monitoring',
    description: 'Customer risk scoring and sanctions screening.',
    benchmarks: [
      { source: 'ComplyAdvantage', notes: 'AML/PEP screening.' },
      { source: 'Sardine', notes: 'Fraud and compliance.' }
    ],
    implementationStatus: 'MISSING',
    targetModuleId: 'MOD_COMP_AML',
    isExtractedFromPrevious: false
  }
];

export interface FintechModule {
  id: string;
  familyId: string;
  name: string;
  description: string;
  status: 'ACTIVE' | 'INACTIVE' | 'INSTALLING';
  version: string;
  isCore: boolean;
}

export const FintechModuleRegistry: FintechModule[] = [
  { id: 'MOD_MM_CORE', familyId: 'FAM_MOBILE_MONEY', name: 'Mobile Money Core API', description: 'Core wallet and MSISDN management.', status: 'ACTIVE', version: 'v2.0.0', isCore: true },
  { id: 'MOD_MM_TRANSFER', familyId: 'FAM_MOBILE_MONEY', name: 'P2P Transfer Engine', description: 'Real-time peer-to-peer transfers.', status: 'ACTIVE', version: 'v2.0.0', isCore: true },
  { id: 'MOD_MM_AGENT', familyId: 'FAM_MOBILE_MONEY', name: 'Agent Network Operations', description: 'Agent float and commission tracking.', status: 'ACTIVE', version: 'v1.5.0', isCore: false },
  
  { id: 'MOD_SW_ROUTER', familyId: 'FAM_PAY_SWITCH', name: 'Universal Routing Engine', description: 'Multi-rail orchestrator.', status: 'ACTIVE', version: 'v3.1.0', isCore: true },
  { id: 'MOD_SW_SETTLE', familyId: 'FAM_PAY_SWITCH', name: 'Settlement Splitting', description: 'Commission and multi-party payout rules.', status: 'ACTIVE', version: 'v2.5.0', isCore: false },
  
  { id: 'MOD_FAAP_CORE', familyId: 'FAM_LEDGER', name: 'FAAP General Ledger', description: 'Double-entry cryptographic ledger.', status: 'ACTIVE', version: 'v4.0.0', isCore: true },
  { id: 'MOD_FAAP_CASHBOOK', familyId: 'FAM_LEDGER', name: 'Multi-Column Cashbook', description: 'Advanced cash reconciliation.', status: 'ACTIVE', version: 'v4.0.0', isCore: false },
  
  { id: 'MOD_SACCO_CORE', familyId: 'FAM_SACCO', name: 'BOSA/FOSA Core', description: 'SACCO operations management.', status: 'ACTIVE', version: 'v1.2.0', isCore: true },
  
  { id: 'MOD_FX_RATES', familyId: 'FAM_FX', name: 'FX Treasury Engine', description: 'Currency pair management and rate quoting.', status: 'ACTIVE', version: 'v1.0.0', isCore: true },
  { id: 'MOD_WAL_CORE', familyId: 'FAM_DIGITAL_WALLETS', name: 'Stored Value Ledger', description: 'Closed/Open loop wallet management.', status: 'ACTIVE', version: 'v2.0.0', isCore: true },
  
  { id: 'MOD_MERCH_SETTLE', familyId: 'FAM_MERCHANT_SERVICES', name: 'Merchant Settlement Engine', description: 'Gross-net calculation and acquiring.', status: 'ACTIVE', version: 'v1.0.0', isCore: true },
  { id: 'MOD_AGT_FLOAT', familyId: 'FAM_AGENT_BANKING', name: 'Agent Liquidity Node', description: 'Float management for agents.', status: 'ACTIVE', version: 'v1.0.0', isCore: true },
  { id: 'MOD_MICRO_LENDING', familyId: 'FAM_MICROFINANCE', name: 'Micro-Credit Disburser', description: 'Micro-loan decisioning.', status: 'ACTIVE', version: 'v1.0.0', isCore: true }
];
