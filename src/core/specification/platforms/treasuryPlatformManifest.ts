import { JumoPlatformAuthoritativeManifest } from './types';

export const JUMO_TREASURY_PLATFORM_MANIFEST: JumoPlatformAuthoritativeManifest = {
  platformId: 'plat-treasury',
  platformCode: 'TREASURY',
  platformName: 'JUMO TREASURY (Enterprise Liquidity, Multi-Currency Vault & Settlement Platform)',
  classification: 'SHARED_INDEPENDENT_PLATFORM',
  version: '2026.4.0',
  description: 'Shared liquidity management, foreign exchange dealing, central bank reserve ratio monitoring, vault balance management, and automated inter-bank clearing platform.',
  subsystems: [
    {
      id: 'TRS-SUB-001',
      code: 'TRS_LIQUIDITY_CORE',
      name: 'Real-Time Liquidity & Cash Ratio Subsystem',
      description: 'Monitors net cash position across multiple banking partners and calculates statutory reserve ratios.',
      serviceIds: ['TRS-SRV-001', 'TRS-SRV-002'],
      capabilities: ['Cash Ratio Monitoring', 'Inter-Bank Transfer Scheduling', 'Liquidity Stress Testing'],
      databaseEntities: ['trs_vault_balances', 'trs_liquidity_ratios']
    },
    {
      id: 'TRS-SUB-002',
      code: 'TRS_FX_VAULT',
      name: 'Multi-Currency & FX Exchange Subsystem',
      description: 'Real-time exchange rate feed ingestion, multi-currency balance revaluation, and FX risk hedging.',
      serviceIds: ['TRS-SRV-003'],
      capabilities: ['FX Rate Ingestion', 'Currency Revaluation', 'Exposure Hedging'],
      databaseEntities: ['trs_fx_rates', 'trs_currency_positions']
    }
  ],
  services: [
    {
      id: 'TRS-SRV-001',
      code: 'LiquidityPositionService',
      name: 'Liquidity Position Service',
      description: 'Calculates real-time net liquidity across all operational bank accounts.',
      serviceTier: 'CORE_ENGINE',
      endpoints: ['/api/v1/treasury/liquidity/summary', '/api/v1/treasury/liquidity/forecast']
    },
    {
      id: 'TRS-SRV-002',
      code: 'VaultManagementService',
      name: 'Physical & Virtual Vault Management Service',
      description: 'Tracks till limits, vault deposits, and cash-in-transit movements.',
      serviceTier: 'VAULT',
      endpoints: ['/api/v1/treasury/vaults/balance', '/api/v1/treasury/vaults/transfer']
    },
    {
      id: 'TRS-SRV-003',
      code: 'FxRevaluationService',
      name: 'FX Revaluation & Currency Rate Service',
      description: 'Performs mark-to-market calculations and multi-currency conversions.',
      serviceTier: 'CORE_ENGINE',
      endpoints: ['/api/v1/treasury/fx/rates', '/api/v1/treasury/fx/convert']
    }
  ],
  extensionPoints: [
    {
      id: 'TRS-EXT-001',
      hookName: 'onLiquidityThresholdBreached',
      description: 'Fired when a tenant’s liquid reserves fall below statutory floor.',
      supportedProducts: ['prod-fintech', 'prod-university-tertiary'],
      requiredProtocol: 'TREASURY_ALERT_V1'
    }
  ],
  databaseEntities: [
    {
      id: 'TRS-DB-001',
      tableName: 'trs_vault_balances',
      description: 'Current real-time balances across physical vaults and bank accounts.',
      fields: [
        { name: 'id', type: 'VARCHAR(64)', required: true },
        { name: 'vault_name', type: 'VARCHAR(128)', required: true },
        { name: 'currency', type: 'VARCHAR(3)', required: true },
        { name: 'balance', type: 'DECIMAL(18,2)', required: true },
        { name: 'updated_at', type: 'TIMESTAMP', required: true }
      ]
    }
  ],
  apis: [
    {
      id: 'TRS-API-001',
      endpoint: '/api/v1/treasury/liquidity/summary',
      method: 'GET',
      description: 'Returns real-time aggregated liquidity breakdown.',
      authLevel: 'FINANCIAL_DUAL'
    }
  ],
  roles: [
    {
      id: 'TRS-ROLE-001',
      name: 'Treasury & Liquidity Controller',
      description: 'Manages interbank transfers, statutory reserves, and FX transactions.',
      permissions: ['treasury:liquidity:view', 'treasury:transfer:execute', 'treasury:fx:trade']
    }
  ],
  testContracts: [
    {
      id: 'TRS-TEST-001',
      targetId: 'TRS_LIQUIDITY_CORE',
      testType: 'PLATFORM_COMPLIANCE',
      expectedAssertion: 'Liquidity summation across all active vault balances must match ledger balances exactly.'
    }
  ]
};
