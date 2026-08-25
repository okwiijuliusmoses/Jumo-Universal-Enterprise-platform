export interface FintechCapability {
  id: string;
  name: string;
  description: string;
  ownerModuleId: string;
  minimumBenchmark: string;
  securityLevel: 'STANDARD' | 'HIGH' | 'CRITICAL';
  status: 'IMPLEMENTED' | 'UI_ONLY' | 'PENDING';
}

export const FintechCapabilityRegistry: Record<string, FintechCapability> = {
  'merchant-onboarding': {
    id: 'merchant-onboarding',
    name: 'Merchant Onboarding',
    description: 'Autonomous KYM (Know Your Merchant) and settlement account provisioning.',
    ownerModuleId: 'merch-settlement',
    minimumBenchmark: 'Sovereign Payments Standard v2',
    securityLevel: 'HIGH',
    status: 'IMPLEMENTED'
  },
  'settlement-processing': {
    id: 'settlement-processing',
    name: 'Settlement Processing',
    description: 'Batch and real-time settlement of merchant funds with FAAP ledger integration.',
    ownerModuleId: 'merch-settlement',
    minimumBenchmark: 'Double-Entry Parity v1.4',
    securityLevel: 'CRITICAL',
    status: 'IMPLEMENTED'
  },
  'float-allocation': {
    id: 'float-allocation',
    name: 'Float Allocation',
    description: 'Dynamic distribution of mobile money float across agent networks.',
    ownerModuleId: 'float-management',
    minimumBenchmark: 'Liquidity Management v3',
    securityLevel: 'CRITICAL',
    status: 'IMPLEMENTED'
  },
  'momo-clearing': {
    id: 'momo-clearing',
    name: 'M-Pesa/MTN Clearing',
    description: 'High-speed clearing and 1.5% fee collection from cellular money networks.',
    ownerModuleId: 'payment-switch',
    minimumBenchmark: 'Universal Switch Architecture v1',
    securityLevel: 'CRITICAL',
    status: 'IMPLEMENTED'
  }
};
