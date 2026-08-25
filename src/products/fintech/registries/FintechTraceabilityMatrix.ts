// Real Traceability Model linking Architecture to Code
export interface TraceabilityLink {
  familyId: string;
  capabilityId: string;
  capabilityName: string;
  benchmarkSource: string;
  legacyJumoCapability: string;
  newCapability: string;
  implementationStatus: 'MISSING' | 'SCAFFOLDED' | 'PARTIAL' | 'VERIFIED';
  targetModuleId: string;
  dependencies: string[];
  // Deep tracking
  services?: string[];
  apis?: string[];
  workflows?: string[];
  uiWorkspaces?: string[];
  verification: string;
}

export const FintechTraceabilityMatrix: TraceabilityLink[] = [
  {
    familyId: 'FAM_LEDGER',
    capabilityId: 'CAP_LEDG_01',
    capabilityName: 'Double-Entry Accounting / FAAP',
    benchmarkSource: 'Modern Treasury / QuickBooks',
    legacyJumoCapability: 'FAAP Core / Alpha Academy Bursar',
    newCapability: 'Cryptographic double-entry posting ensuring zero-parity across GL',
    implementationStatus: 'VERIFIED',
    targetModuleId: 'MOD_FAAP_CORE',
    dependencies: [],
    services: ['DoubleEntryService', 'JournalService'],
    uiWorkspaces: ['FaapControllerWorkspace'],
    verification: 'VERIFIED - Parity constraints active'
  },
  {
    familyId: 'FAM_PAY_SWITCH',
    capabilityId: 'CAP_SW_01',
    capabilityName: 'Universal Routing Engine',
    benchmarkSource: 'Cellulant / Flutterwave',
    legacyJumoCapability: 'SchoolPay Integrations / Digital Pay',
    newCapability: 'Dynamic routing based on rail availability, cost, and orchestration',
    implementationStatus: 'PARTIAL',
    targetModuleId: 'MOD_SW_ROUTER',
    dependencies: ['FAM_LEDGER'],
    services: ['PaymentOrchestrationService'],
    verification: 'SCAFFOLDED - Awaiting deep adapter implementation'
  },
  {
    familyId: 'FAM_AGENT_BANKING',
    capabilityId: 'CAP_AGT_01',
    capabilityName: 'Agent Liquidity & Float',
    benchmarkSource: 'OPay / Agency Banking',
    legacyJumoCapability: 'N/A',
    newCapability: 'Agent network topology, float balancing, and commission limits',
    implementationStatus: 'VERIFIED',
    targetModuleId: 'MOD_AGT_FLOAT',
    dependencies: ['FAM_MOBILE_MONEY', 'FAM_LEDGER'],
    services: ['AgentNetworkService'],
    uiWorkspaces: ['AgentNetworkWorkspace'],
    verification: 'VERIFIED - Float transfer & limits active'
  },
  {
    familyId: 'FAM_DIGITAL_WALLETS',
    capabilityId: 'CAP_WAL_01',
    capabilityName: 'Closed-Loop Stored Value',
    benchmarkSource: 'Marqeta / Starbucks Rewards',
    legacyJumoCapability: 'Digital Pay Stored Value',
    newCapability: 'Customer wallet provisioning, tiered KYC limits, and intra-wallet transfers',
    implementationStatus: 'VERIFIED',
    targetModuleId: 'MOD_WAL_CORE',
    dependencies: ['FAM_LEDGER', 'FAM_COMPLIANCE'],
    services: ['DigitalWalletService'],
    uiWorkspaces: ['DigitalWalletWorkspace'],
    verification: 'VERIFIED - Provisioning and Limits active'
  },
  {
    familyId: 'FAM_FX',
    capabilityId: 'CAP_FX_01',
    capabilityName: 'Dealing Desk Execution',
    benchmarkSource: 'Wise / Eversend',
    legacyJumoCapability: 'Standard Bank FX / JUMO ERP',
    newCapability: 'Live spread rates and immediate trade booking across currency pairs',
    implementationStatus: 'VERIFIED',
    targetModuleId: 'MOD_FX_RATES',
    dependencies: ['FAM_LEDGER'],
    services: ['FxService'],
    uiWorkspaces: ['FxWorkspace'],
    verification: 'VERIFIED - Trade booking and rate fetching'
  },
  {
    familyId: 'FAM_MERCHANT_SERVICES',
    capabilityId: 'CAP_MERCH_01',
    capabilityName: 'Merchant Acquiring & Settlement',
    benchmarkSource: 'Stripe',
    legacyJumoCapability: 'JUMO Pay Merchant POS',
    newCapability: 'Tiered commission deduction, settlement routing, and gross-net calculation',
    implementationStatus: 'VERIFIED',
    targetModuleId: 'MOD_MERCH_SETTLE',
    dependencies: ['FAM_LEDGER'],
    services: ['MerchantService'],
    uiWorkspaces: ['MerchantServicesWorkspace'],
    verification: 'VERIFIED - Commission engine and net settlement active'
  },
  {
    familyId: 'FAM_MICROFINANCE',
    capabilityId: 'CAP_MICRO_01',
    capabilityName: 'Group Lending (JLG)',
    benchmarkSource: 'Musoni / Kiva',
    legacyJumoCapability: 'N/A',
    newCapability: 'Joint Liability Group management and micro-loan disbursement',
    implementationStatus: 'VERIFIED',
    targetModuleId: 'MOD_MICRO_LENDING',
    dependencies: ['FAM_LEDGER', 'FAM_COMPLIANCE'],
    services: ['MicrofinanceService'],
    uiWorkspaces: ['MicrofinanceWorkspace'],
    verification: 'VERIFIED - Group appraisal and limits active'
  }
];
