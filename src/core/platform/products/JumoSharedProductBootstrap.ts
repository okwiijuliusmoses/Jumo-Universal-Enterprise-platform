import {
  JUMO_SHARED_PRODUCT_REGISTRY,
} from './JumoSharedProductRegistry';

const SHARED_PRODUCTS = [
  {
    id: 'prod-faap',
    name: 'JUMO FAAP',
    description: 'Authoritative financial accounting and asset platform.',
    kind: 'SHARED_PLATFORM_SERVICE',
    category: 'FINANCE_ACCOUNTING',
    tiers: ['ORDINARY', 'PREMIUM', 'GLOBAL'],
    ordinaryIncluded: true,
    premiumAvailable: true,
    globalAvailable: true,
    authoritative: true,
    shared: true,
    manufacturable: true,
    configurable: true,
    upgradeable: true,
    provisionable: true,
    capabilityIds: [
      'FAAP_LEDGER',
      'FAAP_JOURNAL',
      'FAAP_ASSETS',
      'FAAP_ACCOUNTING',
      'FAAP_AUDIT',
    ],
    architectureLayerIds: [],
    
    sharedServiceIds: [
      'prod-digital-pay',
      'prod-aegis',
      'prod-treasury',
      'prod-auditor',
    ],
  },

  {
    id: 'prod-digital-pay',
    name: 'JUMO DIGITAL PAY',
    description: 'Authoritative payment routing and settlement platform.',
    kind: 'SHARED_PLATFORM_SERVICE',
    category: 'PAYMENTS',
    tiers: ['ORDINARY', 'PREMIUM', 'GLOBAL'],
    ordinaryIncluded: true,
    premiumAvailable: true,
    globalAvailable: true,
    authoritative: true,
    shared: true,
    manufacturable: true,
    configurable: true,
    upgradeable: true,
    provisionable: true,
    capabilityIds: [
      'PAYMENT_INTENT',
      'PAYMENT_ROUTING',
      'PAYMENT_SETTLEMENT',
      'PAYMENT_RECONCILIATION',
    ],
    architectureLayerIds: [],
    
    sharedServiceIds: [
      'prod-faap',
      'prod-aegis',
      'prod-treasury',
      'prod-auditor',
    ],
  },

  {
    id: 'prod-aegis',
    name: 'JUMO AEGIS',
    description: 'Sovereign security, threat and protection platform.',
    kind: 'SHARED_PLATFORM_SERVICE',
    category: 'SECURITY',
    tiers: ['ORDINARY', 'PREMIUM', 'GLOBAL'],
    ordinaryIncluded: true,
    premiumAvailable: true,
    globalAvailable: true,
    authoritative: true,
    shared: true,
    manufacturable: true,
    configurable: true,
    upgradeable: true,
    provisionable: true,
    capabilityIds: [
      'AEGIS_THREAT',
      'AEGIS_INTRUSION',
      'AEGIS_SIGNATURE',
      'AEGIS_SHIELD',
      'AEGIS_SECURITY_LOG',
    ],
    architectureLayerIds: [],
    
    sharedServiceIds: [
      'prod-faap',
      'prod-digital-pay',
      'prod-auditor',
    ],
  },

  {
    id: 'prod-treasury',
    name: 'JUMO TREASURY',
    description: 'Central treasury, liquidity and automated deduction authority.',
    kind: 'SHARED_PLATFORM_SERVICE',
    category: 'TREASURY',
    tiers: ['PREMIUM', 'GLOBAL'],
    ordinaryIncluded: false,
    premiumAvailable: true,
    globalAvailable: true,
    authoritative: true,
    shared: true,
    manufacturable: true,
    configurable: true,
    upgradeable: true,
    provisionable: true,
    capabilityIds: [
      'TREASURY_LIQUIDITY',
      'TREASURY_RESERVES',
      'TREASURY_SETTLEMENT',
      'TREASURY_AUTO_DEDUCTION',
      'TREASURY_RECONCILIATION',
    ],
    architectureLayerIds: [],
    
    sharedServiceIds: [
      'prod-faap',
      'prod-digital-pay',
      'prod-auditor',
    ],
  },

  {
    id: 'prod-auditor',
    name: 'JUMO DIGITAL AUDITOR',
    description: 'Continuous evidence, audit and compliance platform.',
    kind: 'SHARED_PLATFORM_SERVICE',
    category: 'AUDIT',
    tiers: ['ORDINARY', 'PREMIUM', 'GLOBAL'],
    ordinaryIncluded: true,
    premiumAvailable: true,
    globalAvailable: true,
    authoritative: true,
    shared: true,
    manufacturable: true,
    configurable: true,
    upgradeable: true,
    provisionable: true,
    capabilityIds: [
      'AUDIT_EVIDENCE',
      'AUDIT_CHAIN',
      'AUDIT_PROOF',
      'AUDIT_REPORT',
      'AUDIT_ARCHIVE',
    ],
    architectureLayerIds: [],
    
    sharedServiceIds: [
      'prod-faap',
      'prod-aegis',
    ],
  },

  {
    id: 'prod-cloud',
    name: 'JUMO CLOUD',
    description: 'Sovereign cloud and infrastructure orchestration platform.',
    kind: 'SHARED_PLATFORM_SERVICE',
    category: 'CLOUD_INFRASTRUCTURE',
    tiers: ['PREMIUM', 'GLOBAL'],
    ordinaryIncluded: false,
    premiumAvailable: true,
    globalAvailable: true,
    authoritative: true,
    shared: true,
    manufacturable: true,
    configurable: true,
    upgradeable: true,
    provisionable: true,
    capabilityIds: [
      'CLOUD_RUNTIME',
      'CLOUD_NODES',
      'CLOUD_PROVISIONING',
      'CLOUD_ORCHESTRATION',
    ],
    architectureLayerIds: [],
    
    sharedServiceIds: [
      'prod-aegis',
      'prod-auditor',
    ],
  },
] as const;

for (const product of SHARED_PRODUCTS) {
  JUMO_SHARED_PRODUCT_REGISTRY.upsert(product as any);
}

export {
  SHARED_PRODUCTS,
};
