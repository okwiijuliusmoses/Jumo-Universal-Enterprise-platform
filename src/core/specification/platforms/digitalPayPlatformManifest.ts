import { JumoPlatformAuthoritativeManifest } from './types';

export const JUMO_DIGITAL_PAY_PLATFORM_MANIFEST: JumoPlatformAuthoritativeManifest = {
  platformId: 'plat-digital-pay',
  platformCode: 'DIGITAL_PAY',
  platformName: 'JUMO DIGITAL PAY (Unified Sovereign Payment Switch & Multi-Rail Gateway)',
  classification: 'SHARED_INDEPENDENT_PLATFORM',
  version: '2026.4.0',
  description: 'Enterprise multi-rail payment switch supporting mobile money (M-Pesa, Airtel Money), national bank clearing (RTGS, ACH, EFT), card schemes (Visa, Mastercard), QR codes, and instant settlement reconciliation across all JUMO products.',
  subsystems: [
    {
      id: 'DPAY-SUB-001',
      code: 'DPAY_SWITCH_CORE',
      name: 'Transaction Routing & Ingestion Switch Core',
      description: 'Ultra-low latency idempotency-checked transaction switch with routing algorithms and fee calculations.',
      serviceIds: ['DPAY-SRV-001', 'DPAY-SRV-002'],
      capabilities: ['Dynamic Rail Routing', 'Idempotent Transaction Ingestion', 'Fee Splitting Engine', 'Velocity Checking'],
      databaseEntities: ['dpay_transactions', 'dpay_routing_rules']
    },
    {
      id: 'DPAY-SUB-002',
      code: 'DPAY_MOBILE_MONEY_RAIL',
      name: 'Mobile Money Gateway Subsystem (M-Pesa / USSD / STK Push)',
      description: 'Dedicated bridge for Daraja C2B/B2C, STK Push, Airtel Money APIs, and USSD session handlers.',
      serviceIds: ['DPAY-SRV-003'],
      capabilities: ['STK Push Initiation', 'C2B Instant Validation & Confirmation', 'B2C Payout Queuing', 'Reversal Handling'],
      databaseEntities: ['dpay_mpesa_callbacks', 'dpay_disbursements']
    },
    {
      id: 'DPAY-SUB-003',
      code: 'DPAY_SETTLEMENT_RECONCILER',
      name: 'Multi-Rail Automated Settlement & Reconciliation Subsystem',
      description: 'Automated 3-way reconciliation between merchant records, switch ledgers, and bank settlement files.',
      serviceIds: ['DPAY-SRV-004'],
      capabilities: ['End-of-Day Batch Settlement', 'Discrepancy Exception Resolution', 'Automated Escrow Splitting'],
      databaseEntities: ['dpay_settlement_batches', 'dpay_reconciliation_logs']
    }
  ],
  services: [
    {
      id: 'DPAY-SRV-001',
      code: 'PaymentSwitchRouter',
      name: 'Payment Switch Router Service',
      description: 'Routes payments to optimal rail based on cost, uptime, and currency.',
      serviceTier: 'CORE_ENGINE',
      endpoints: ['/api/v1/dpay/charge', '/api/v1/dpay/transfer']
    },
    {
      id: 'DPAY-SRV-002',
      code: 'IdempotencyVaultService',
      name: 'Idempotency & Nonce Guard Service',
      description: 'Guarantees exactly-once processing across high-frequency payment channels.',
      serviceTier: 'VAULT',
      endpoints: ['/api/v1/dpay/idempotency/verify', '/api/v1/dpay/idempotency/lock']
    },
    {
      id: 'DPAY-SRV-003',
      code: 'MpesaRailAdapter',
      name: 'M-Pesa & Mobile Money Adapter Service',
      description: 'Executes STK pushes, validates C2B webhooks, and manages IPN callbacks.',
      serviceTier: 'GATEWAY',
      endpoints: ['/api/v1/dpay/rails/mpesa/stk', '/api/v1/dpay/rails/mpesa/c2b-callback']
    },
    {
      id: 'DPAY-SRV-004',
      code: 'SettlementReconciliationEngine',
      name: 'Settlement Reconciliation Engine',
      description: 'Performs cryptographic matching of bank statements against internal ledgers.',
      serviceTier: 'ORCHESTRATOR',
      endpoints: ['/api/v1/dpay/settlement/reconcile', '/api/v1/dpay/settlement/export']
    }
  ],
  extensionPoints: [
    {
      id: 'DPAY-EXT-001',
      hookName: 'onPaymentCompleted',
      description: 'Fired immediately upon verified receipt of funds from any rail.',
      supportedProducts: [
        'prod-fintech',
        'prod-nursery-primary',
        'prod-secondary-school',
        'prod-university-tertiary',
        'prod-church-faith',
        'prod-alumni-community'
      ],
      requiredProtocol: 'DPAY_WEBHOOK_V1'
    },
    {
      id: 'DPAY-EXT-002',
      hookName: 'onDisbursementSettled',
      description: 'Fired when outbound bulk payment (e.g. salary, loan disbursement, dividend) reaches destination.',
      supportedProducts: ['prod-fintech', 'prod-university-tertiary', 'prod-alumni-community'],
      requiredProtocol: 'DPAY_RPC_V1'
    }
  ],
  databaseEntities: [
    {
      id: 'DPAY-DB-001',
      tableName: 'dpay_transactions',
      description: 'Master ledger of all inbound and outbound transactions across all products.',
      fields: [
        { name: 'id', type: 'VARCHAR(64)', required: true },
        { name: 'idempotency_key', type: 'VARCHAR(128)', required: true },
        { name: 'product_id', type: 'VARCHAR(64)', required: true },
        { name: 'tenant_id', type: 'VARCHAR(64)', required: true },
        { name: 'amount', type: 'DECIMAL(18,2)', required: true },
        { name: 'currency', type: 'VARCHAR(3)', required: true },
        { name: 'rail', type: 'VARCHAR(32)', required: true },
        { name: 'status', type: 'VARCHAR(32)', required: true },
        { name: 'external_reference', type: 'VARCHAR(128)', required: true }
      ]
    },
    {
      id: 'DPAY-DB-002',
      tableName: 'dpay_settlement_batches',
      description: 'Batch settlement and reconciliation journal.',
      fields: [
        { name: 'id', type: 'VARCHAR(64)', required: true },
        { name: 'batch_date', type: 'DATE', required: true },
        { name: 'total_volume', type: 'DECIMAL(18,2)', required: true },
        { name: 'total_fees', type: 'DECIMAL(18,2)', required: true },
        { name: 'reconciliation_status', type: 'VARCHAR(32)', required: true }
      ]
    }
  ],
  apis: [
    {
      id: 'DPAY-API-001',
      endpoint: '/api/v1/dpay/initiate',
      method: 'POST',
      description: 'Initiates a payment request across selected payment rail.',
      authLevel: 'STAFF'
    },
    {
      id: 'DPAY-API-002',
      endpoint: '/api/v1/dpay/verify/:ref',
      method: 'GET',
      description: 'Cryptographically verifies status of a payment reference.',
      authLevel: 'PUBLIC'
    }
  ],
  roles: [
    {
      id: 'DPAY-ROLE-001',
      name: 'Digital Pay Settlement Controller',
      description: 'Supervises payment rail connectivity, liquidity switches, and reconciliations.',
      permissions: ['dpay:admin:all', 'dpay:rail:toggle', 'dpay:settlement:override']
    }
  ],
  testContracts: [
    {
      id: 'DPAY-TEST-001',
      targetId: 'DPAY_SWITCH_CORE',
      testType: 'PLATFORM_COMPLIANCE',
      expectedAssertion: 'Duplicate transactions with identical idempotency keys must yield HTTP 409 or return cached result without double-charging.'
    }
  ]
};
