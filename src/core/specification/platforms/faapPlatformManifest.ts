import { JumoPlatformAuthoritativeManifest } from './types';

export const JUMO_FAAP_PLATFORM_MANIFEST: JumoPlatformAuthoritativeManifest = {
  platformId: 'plat-faap',
  platformCode: 'FAAP',
  platformName: 'JUMO FAAP (Financing & Asset Origination as a Platform)',
  classification: 'SHARED_INDEPENDENT_PLATFORM',
  version: '2026.4.0',
  description: 'Independent, multi-tenant credit underwriting, asset financing, repayment scheduling, and loan ledger platform installable across banking, SACCOs, and education ecosystems.',
  subsystems: [
    {
      id: 'FAAP-SUB-001',
      code: 'FAAP_CREDIT_ENGINE',
      name: 'Credit Scoring & Risk Evaluation Subsystem',
      description: 'Algorithmic credit worthiness appraisal, debt-to-income ratio computation, and scoring matrix.',
      serviceIds: ['FAAP-SRV-001', 'FAAP-SRV-002'],
      capabilities: ['Credit Scoring', 'Risk Tiering', 'Collateral Valuation', 'Guarantor Verification'],
      databaseEntities: ['faap_credit_profiles', 'faap_risk_assessments']
    },
    {
      id: 'FAAP-SUB-002',
      code: 'FAAP_LEDGER_ENGINE',
      name: 'Amortization & Loan Ledger Subsystem',
      description: 'Multi-currency loan ledger, interest amortization calculators, penalty logic, and restructuring.',
      serviceIds: ['FAAP-SRV-003', 'FAAP-SRV-004'],
      capabilities: ['Schedule Generation', 'Interest Accrual', 'Early Payoff Valuation', 'Arrears Tracking'],
      databaseEntities: ['faap_loan_accounts', 'faap_amortization_schedules', 'faap_loan_transactions']
    },
    {
      id: 'FAAP-SUB-003',
      code: 'FAAP_DISBURSEMENT_SETTLEMENT',
      name: 'Disbursement & Automated Settlement Subsystem',
      description: 'Direct multi-rail fund disbursement, automatic recurring collections, and fee deductions.',
      serviceIds: ['FAAP-SRV-005'],
      capabilities: ['Disbursement Queuing', 'Split Routing', 'Reversal Handling'],
      databaseEntities: ['faap_disbursement_batches', 'faap_settlement_logs']
    }
  ],
  services: [
    {
      id: 'FAAP-SRV-001',
      code: 'CreditUnderwritingService',
      name: 'Credit Underwriting Service',
      description: 'Automated and manual underwriting workflow orchestrator.',
      serviceTier: 'CORE_ENGINE',
      endpoints: ['/api/v1/faap/underwrite', '/api/v1/faap/score']
    },
    {
      id: 'FAAP-SRV-002',
      code: 'CollateralValuationService',
      name: 'Collateral Valuation & Lien Service',
      description: 'Lien perfection, physical custody verification, and haircut computation.',
      serviceTier: 'CORE_ENGINE',
      endpoints: ['/api/v1/faap/collateral/register', '/api/v1/faap/collateral/evaluate']
    },
    {
      id: 'FAAP-SRV-003',
      code: 'AmortizationScheduleService',
      name: 'Amortization Schedule Engine',
      description: 'Generates reducing balance, flat rate, and custom balloon amortization schedules.',
      serviceTier: 'CORE_ENGINE',
      endpoints: ['/api/v1/faap/schedule/generate', '/api/v1/faap/schedule/recalculate']
    },
    {
      id: 'FAAP-SRV-004',
      code: 'LoanLedgerService',
      name: 'Loan Ledger Transaction Service',
      description: 'Double-entry bookkeeping and principal-interest splitting.',
      serviceTier: 'VAULT',
      endpoints: ['/api/v1/faap/ledger/post', '/api/v1/faap/ledger/statement']
    },
    {
      id: 'FAAP-SRV-005',
      code: 'DisbursementGatewayAdapter',
      name: 'Disbursement Gateway Adapter',
      description: 'Interfaces with payment rails for immediate loan payouts.',
      serviceTier: 'GATEWAY',
      endpoints: ['/api/v1/faap/disburse/execute', '/api/v1/faap/disburse/status']
    }
  ],
  extensionPoints: [
    {
      id: 'FAAP-EXT-001',
      hookName: 'onCreditApplicationSubmitted',
      description: 'Invoked when any host product submits a credit request (e.g. Student Tuition Loan, Member SACCO Loan).',
      supportedProducts: ['prod-fintech', 'prod-university-tertiary', 'prod-secondary-school'],
      requiredProtocol: 'FAAP_RPC_V1'
    },
    {
      id: 'FAAP-EXT-002',
      hookName: 'onLoanDefaultThresholdReached',
      description: 'Triggered when loan arrears exceed policy grace period.',
      supportedProducts: ['prod-fintech', 'prod-university-tertiary'],
      requiredProtocol: 'FAAP_EVENT_V1'
    }
  ],
  databaseEntities: [
    {
      id: 'FAAP-DB-001',
      tableName: 'faap_loan_accounts',
      description: 'Master ledger table for all active and archived financing accounts.',
      fields: [
        { name: 'id', type: 'VARCHAR(64)', required: true },
        { name: 'tenant_id', type: 'VARCHAR(64)', required: true },
        { name: 'borrower_id', type: 'VARCHAR(64)', required: true },
        { name: 'principal_amount', type: 'DECIMAL(18,2)', required: true },
        { name: 'interest_rate', type: 'DECIMAL(8,4)', required: true },
        { name: 'tenor_months', type: 'INTEGER', required: true },
        { name: 'outstanding_balance', type: 'DECIMAL(18,2)', required: true },
        { name: 'status', type: 'VARCHAR(32)', required: true }
      ]
    },
    {
      id: 'FAAP-DB-002',
      tableName: 'faap_amortization_schedules',
      description: 'Period-by-period repayment breakdown.',
      fields: [
        { name: 'id', type: 'VARCHAR(64)', required: true },
        { name: 'loan_id', type: 'VARCHAR(64)', required: true },
        { name: 'installment_number', type: 'INTEGER', required: true },
        { name: 'due_date', type: 'TIMESTAMP', required: true },
        { name: 'principal_due', type: 'DECIMAL(18,2)', required: true },
        { name: 'interest_due', type: 'DECIMAL(18,2)', required: true },
        { name: 'paid_amount', type: 'DECIMAL(18,2)', required: true },
        { name: 'status', type: 'VARCHAR(32)', required: true }
      ]
    }
  ],
  apis: [
    {
      id: 'FAAP-API-001',
      endpoint: '/api/v1/faap/loans',
      method: 'POST',
      description: 'Creates and registers a new loan facility.',
      authLevel: 'FINANCIAL_DUAL'
    },
    {
      id: 'FAAP-API-002',
      endpoint: '/api/v1/faap/loans/:id/schedule',
      method: 'GET',
      description: 'Fetches full repayment schedule.',
      authLevel: 'STAFF'
    }
  ],
  roles: [
    {
      id: 'FAAP-ROLE-001',
      name: 'FAAP Platform Credit Administrator',
      description: 'Global authority over underwriting policies and risk ceilings.',
      permissions: ['faap:admin:all', 'faap:underwrite:override', 'faap:rates:configure']
    }
  ],
  testContracts: [
    {
      id: 'FAAP-TEST-001',
      targetId: 'FAAP_LEDGER_ENGINE',
      testType: 'PLATFORM_COMPLIANCE',
      expectedAssertion: 'Amortization schedule principal + interest sums must match exact total payable to 4 decimal places.'
    }
  ]
};
