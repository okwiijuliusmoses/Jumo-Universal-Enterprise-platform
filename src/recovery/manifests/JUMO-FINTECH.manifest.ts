/**
 * JUMO UEOS — AUTHORITATIVE PRODUCT MANIFEST
 * PRODUCT: FINTECH ERP (JUMO-FINTECH)
 *
 * Generated from authoritative repository evidence in /app/jumo-restored/
 */

export const JUMO_FINTECH_MANIFEST = Object.freeze({
  productId: "JUMO-FINTECH",
  productName: "FINTECH ERP",
  productType: "ERP",
  category: "FINTECH",
  version: "14.0.0",
  consolidated: false,
  canonicalRoute: "/fintech",
  directories: [
  "src/products/fintech"
],
  sourceFilesCount: 125,
  sourceFiles: [
  "products/fintech/FintechFamilyStore.tsx",
  "products/fintech/FintechShell.tsx",
  "products/fintech/UniversalFintechFamilyWorkspace.tsx",
  "products/fintech/agent-banking/domain/AgentModels.ts",
  "products/fintech/agent-banking/index.ts",
  "products/fintech/agent-banking/manifest.ts",
  "products/fintech/agent-banking/services/AgentFloatService.ts",
  "products/fintech/agent-banking/web/AgentNetworkWorkspace.tsx",
  "products/fintech/agricultural-finance/index.ts",
  "products/fintech/agricultural-finance/manifest.ts",
  "products/fintech/atm-self-service/index.ts",
  "products/fintech/atm-self-service/manifest.ts",
  "products/fintech/bank-payments/index.ts",
  "products/fintech/bank-payments/manifest.ts",
  "products/fintech/bill-payments/index.ts",
  "products/fintech/bill-payments/manifest.ts",
  "products/fintech/capital-markets/index.ts",
  "products/fintech/capital-markets/manifest.ts",
  "products/fintech/cards/index.ts",
  "products/fintech/cards/manifest.ts",
  "products/fintech/collections/index.ts",
  "products/fintech/collections/manifest.ts",
  "products/fintech/compliance/index.ts",
  "products/fintech/compliance/manifest.ts",
  "products/fintech/core/agents/FintechCapabilityRegistry.ts",
  "products/fintech/core/agents/FintechModuleAgentRegistry.ts",
  "products/fintech/core/agents/WorkforceOrchestrator.tsx",
  "products/fintech/core/agents/types.ts",
  "products/fintech/core/api/IdentityController.ts",
  "products/fintech/core/api/LedgerController.ts",
  "products/fintech/core/api/PaymentController.ts",
  "products/fintech/core/domain/ComplianceReport.ts",
  "products/fintech/core/domain/FinancialAccount.ts",
  "products/fintech/core/domain/FinancialModel.ts",
  "products/fintech/core/domain/Identity.ts",
  "products/fintech/core/domain/LedgerEntry.ts",
  "products/fintech/core/domain/PaymentGateway.ts",
  "products/fintech/core/interfaces/FinancialInfrastructure.ts",
  "products/fintech/core/services/ComplianceService.ts",
  "products/fintech/core/services/DataIntelligenceService.ts",
  "products/fintech/core/services/FinancialAccountService.ts",
  "products/fintech/core/services/IdentityService.ts",
  "products/fintech/core/services/LedgerService.ts",
  "products/fintech/core/services/PaymentGatewayService.ts",
  "products/fintech/core/workflows/KYCOnboardingWorkflow.ts",
  "products/fintech/core/workflows/PaymentProcessingWorkflow.ts",
  "products/fintech/cross-border/index.ts",
  "products/fintech/cross-border/manifest.ts",
  "products/fintech/data-intelligence/index.ts",
  "products/fintech/data-intelligence/manifest.ts",
  "products/fintech/developer-api/index.ts",
  "products/fintech/developer-api/manifest.ts",
  "products/fintech/digital-banking/index.ts",
  "products/fintech/digital-banking/manifest.ts",
  "products/fintech/digital-wallets/domain/Wallet.ts",
  "products/fintech/digital-wallets/index.ts",
  "products/fintech/digital-wallets/manifest.ts",
  "products/fintech/digital-wallets/services/WalletService.ts",
  "products/fintech/digital-wallets/web/DigitalWalletWorkspace.tsx",
  "products/fintech/domain/FintechService.ts",
  "products/fintech/embedded-finance/index.ts",
  "products/fintech/embedded-finance/manifest.ts",
  "products/fintech/financial-accounting/domain/FaapModels.ts",
  "products/fintech/financial-accounting/index.ts",
  "products/fintech/financial-accounting/manifest.ts",
  "products/fintech/financial-accounting/services/DoubleEntryService.ts",
  "products/fintech/financial-accounting/web/FaapControllerWorkspace.tsx",
  "products/fintech/fx/domain/Fx.ts",
  "products/fintech/fx/index.ts",
  "products/fintech/fx/manifest.ts",
  "products/fintech/fx/services/FxService.ts",
  "products/fintech/fx/web/FxWorkspace.tsx",
  "products/fintech/global-accounts/index.ts",
  "products/fintech/global-accounts/manifest.ts",
  "products/fintech/insurance/index.ts",
  "products/fintech/insurance/manifest.ts",
  "products/fintech/investment/index.ts",
  "products/fintech/investment/manifest.ts",
  "products/fintech/lending/index.ts",
  "products/fintech/lending/manifest.ts",
  "products/fintech/merchant-acquiring/index.ts",
  "products/fintech/merchant-acquiring/manifest.ts",
  "products/fintech/merchant-services/domain/Merchant.ts",
  "products/fintech/merchant-services/index.ts",
  "products/fintech/merchant-services/manifest.ts",
  "products/fintech/merchant-services/services/MerchantService.ts",
  "products/fintech/merchant-services/web/MerchantServicesWorkspace.tsx",
  "products/fintech/microfinance/domain/MicrofinanceModels.ts",
  "products/fintech/microfinance/index.ts",
  "products/fintech/microfinance/manifest.ts",
  "products/fintech/microfinance/services/LoanOriginationService.ts",
  "products/fintech/microfinance/web/MicrofinanceWorkspace.tsx",
  "products/fintech/mobile-money/index.ts",
  "products/fintech/mobile-money/manifest.ts",
  "products/fintech/multi-currency/index.ts",
  "products/fintech/multi-currency/manifest.ts",
  "products/fintech/payment-gateway/index.ts",
  "products/fintech/payment-gateway/manifest.ts",
  "products/fintech/payment-switching/index.ts",
  "products/fintech/payment-switching/manifest.ts",
  "products/fintech/payouts/index.ts",
  "products/fintech/payouts/manifest.ts",
  "products/fintech/payroll/index.ts",
  "products/fintech/payroll/manifest.ts",
  "products/fintech/registries/FintechBenchmarkRegistry.ts",
  "products/fintech/registries/FintechFamilyRegistry.ts",
  "products/fintech/registries/FintechTraceabilityMatrix.ts",
  "products/fintech/remittances/index.ts",
  "products/fintech/remittances/manifest.ts",
  "products/fintech/sacco/index.ts",
  "products/fintech/sacco/manifest.ts",
  "products/fintech/savings/index.ts",
  "products/fintech/savings/manifest.ts",
  "products/fintech/securities-custody/index.ts",
  "products/fintech/securities-custody/manifest.ts",
  "products/fintech/services/JumoFinanceService.ts",
  "products/fintech/stablecoin/index.ts",
  "products/fintech/stablecoin/manifest.ts",
  "products/fintech/tax-revenue/index.ts",
  "products/fintech/tax-revenue/manifest.ts",
  "products/fintech/trade-finance/index.ts",
  "products/fintech/trade-finance/manifest.ts",
  "products/fintech/treasury/index.ts",
  "products/fintech/treasury/manifest.ts",
  "products/fintech/web/portals/FintechOffices.tsx"
],
  directoratesCount: 6,
  directorates: [
  {
    "id": "DIR_FIN_EXECUTIVE",
    "name": "Financial Executive & Strategy Directorate",
    "productId": "JUMO-FINTECH"
  },
  {
    "id": "DIR_FIN_TREASURY",
    "name": "Treasury, Accounting & FAAP Directorate",
    "productId": "JUMO-FINTECH"
  },
  {
    "id": "DIR_FIN_RISK",
    "name": "Risk, Compliance & Tax Directorate",
    "productId": "JUMO-FINTECH"
  },
  {
    "id": "DIR_FIN_OPERATIONS",
    "name": "Retail Banking, Payments & Switch Directorate",
    "productId": "JUMO-FINTECH"
  },
  {
    "id": "DIR_FIN_INVESTMENT",
    "name": "Capital Markets & Investment Directorate",
    "productId": "JUMO-FINTECH"
  },
  {
    "id": "DIR_FIN_TECHNOLOGY",
    "name": "Fintech Platform Engineering Directorate",
    "productId": "JUMO-FINTECH"
  }
],
  departmentsCount: 15,
  departments: [
  {
    "id": "DEP_FIN_EXECUTIVE",
    "name": "Office of the Chief Financial Officer",
    "directorateId": "DIR_FIN_EXECUTIVE",
    "productId": "JUMO-FINTECH"
  },
  {
    "id": "DEP_FIN_ACCOUNTING",
    "name": "Financial Accounting & General Ledger (FAAP)",
    "directorateId": "DIR_FIN_TREASURY",
    "productId": "JUMO-FINTECH"
  },
  {
    "id": "DEP_FIN_TREASURY_MGMT",
    "name": "Corporate Treasury & FX Management",
    "directorateId": "DIR_FIN_TREASURY",
    "productId": "JUMO-FINTECH"
  },
  {
    "id": "DEP_FIN_COMPLIANCE",
    "name": "Anti-Money Laundering & Regulatory Compliance",
    "directorateId": "DIR_FIN_RISK",
    "productId": "JUMO-FINTECH"
  },
  {
    "id": "DEP_FIN_CREDIT",
    "name": "Credit, Underwriting & Agricultural Finance",
    "directorateId": "DIR_FIN_RISK",
    "productId": "JUMO-FINTECH"
  },
  {
    "id": "DEP_FIN_INSURANCE",
    "name": "Insurtech & Actuarial Management",
    "directorateId": "DIR_FIN_RISK",
    "productId": "JUMO-FINTECH"
  },
  {
    "id": "DEP_FIN_PAYMENTS",
    "name": "Payment Gateway, Switch & Disbursals",
    "directorateId": "DIR_FIN_OPERATIONS",
    "productId": "JUMO-FINTECH"
  },
  {
    "id": "DEP_FIN_RETAIL",
    "name": "Agency Banking, Cards, ATM & Merchant Acquiring",
    "directorateId": "DIR_FIN_OPERATIONS",
    "productId": "JUMO-FINTECH"
  },
  {
    "id": "DEP_FIN_COOPERATIVES",
    "name": "SACCO & Microfinance Operations",
    "directorateId": "DIR_FIN_OPERATIONS",
    "productId": "JUMO-FINTECH"
  },
  {
    "id": "DEP_FIN_DIGITAL",
    "name": "Digital Wallets & Neo-Banking Core",
    "directorateId": "DIR_FIN_OPERATIONS",
    "productId": "JUMO-FINTECH"
  },
  {
    "id": "DEP_FIN_CROSS_BORDER",
    "name": "Cross-Border Settlement & Trade Finance",
    "directorateId": "DIR_FIN_TREASURY",
    "productId": "JUMO-FINTECH"
  },
  {
    "id": "DEP_FIN_INVESTMENT",
    "name": "Securities Custody, Asset Management & Brokerage",
    "directorateId": "DIR_FIN_INVESTMENT",
    "productId": "JUMO-FINTECH"
  },
  {
    "id": "DEP_FIN_WEALTH",
    "name": "Wealth Management & Fixed Term Deposits",
    "directorateId": "DIR_FIN_INVESTMENT",
    "productId": "JUMO-FINTECH"
  },
  {
    "id": "DEP_FIN_INTELLIGENCE",
    "name": "Financial Data Intelligence & Telemetry",
    "directorateId": "DIR_FIN_TECHNOLOGY",
    "productId": "JUMO-FINTECH"
  },
  {
    "id": "DEP_FIN_TECHNOLOGY",
    "name": "Developer API Gateway & Integrations",
    "directorateId": "DIR_FIN_TECHNOLOGY",
    "productId": "JUMO-FINTECH"
  }
],
  officesCount: 38,
  offices: [
  {
    "id": "OFF_FIN_CFO",
    "name": "CFO Office Office",
    "departmentId": "DEP_FIN_EXECUTIVE",
    "directorateId": "DIR_FIN_EXECUTIVE",
    "productId": "JUMO-FINTECH"
  },
  {
    "id": "OFF_FIN_CONTROLLER",
    "name": "FAAP General Ledger Office",
    "departmentId": "DEP_FIN_ACCOUNTING",
    "directorateId": "DIR_FIN_TREASURY",
    "productId": "JUMO-FINTECH"
  },
  {
    "id": "OFF_FIN_TAX",
    "name": "Tax & Revenue Management Office",
    "departmentId": "DEP_FIN_COMPLIANCE",
    "directorateId": "DIR_FIN_RISK",
    "productId": "JUMO-FINTECH"
  },
  {
    "id": "OFF_FIN_AML",
    "name": "Financial Compliance (AML) Office",
    "departmentId": "DEP_FIN_COMPLIANCE",
    "directorateId": "DIR_FIN_RISK",
    "productId": "JUMO-FINTECH"
  },
  {
    "id": "OFF_FIN_ANALYTICS",
    "name": "Financial Data Intelligence Office",
    "departmentId": "DEP_FIN_INTELLIGENCE",
    "directorateId": "DIR_FIN_TECHNOLOGY",
    "productId": "JUMO-FINTECH"
  },
  {
    "id": "OFF_FIN_PAYROLL",
    "name": "Payroll & Salary Payments Office",
    "departmentId": "DEP_FIN_ACCOUNTING",
    "directorateId": "DIR_FIN_TREASURY",
    "productId": "JUMO-FINTECH"
  },
  {
    "id": "OFF_FIN_SWITCH",
    "name": "Universal Payment Switch Office",
    "departmentId": "DEP_FIN_PAYMENTS",
    "directorateId": "DIR_FIN_OPERATIONS",
    "productId": "JUMO-FINTECH"
  },
  {
    "id": "OFF_FIN_MOMO",
    "name": "Mobile Money Core (USSD) Office",
    "departmentId": "DEP_FIN_PAYMENTS",
    "directorateId": "DIR_FIN_OPERATIONS",
    "productId": "JUMO-FINTECH"
  },
  {
    "id": "OFF_FIN_GATEWAY",
    "name": "Payment Gateway Checkout Office",
    "departmentId": "DEP_FIN_PAYMENTS",
    "directorateId": "DIR_FIN_OPERATIONS",
    "productId": "JUMO-FINTECH"
  },
  {
    "id": "OFF_FIN_COLLECTIONS",
    "name": "Institutional Collections Office",
    "departmentId": "DEP_FIN_PAYMENTS",
    "directorateId": "DIR_FIN_OPERATIONS",
    "productId": "JUMO-FINTECH"
  },
  {
    "id": "OFF_FIN_PAYOUTS",
    "name": "Bulk Payouts & Disbursal Office",
    "departmentId": "DEP_FIN_PAYMENTS",
    "directorateId": "DIR_FIN_OPERATIONS",
    "productId": "JUMO-FINTECH"
  },
  {
    "id": "OFF_FIN_REMIT",
    "name": "Cross-Border Remittances Office",
    "departmentId": "DEP_FIN_CROSS_BORDER",
    "directorateId": "DIR_FIN_OPERATIONS",
    "productId": "JUMO-FINTECH"
  },
  {
    "id": "OFF_FIN_AGENT",
    "name": "Agency Banking Network Office",
    "departmentId": "DEP_FIN_RETAIL",
    "directorateId": "DIR_FIN_OPERATIONS",
    "productId": "JUMO-FINTECH"
  },
  {
    "id": "OFF_FIN_MERCHANT",
    "name": "Merchant Acquiring & POS Office",
    "departmentId": "DEP_FIN_RETAIL",
    "directorateId": "DIR_FIN_OPERATIONS",
    "productId": "JUMO-FINTECH"
  },
  {
    "id": "OFF_FIN_CARDS",
    "name": "Card Issuing & Management Office",
    "departmentId": "DEP_FIN_RETAIL",
    "directorateId": "DIR_FIN_OPERATIONS",
    "productId": "JUMO-FINTECH"
  },
  {
    "id": "OFF_FIN_ATM",
    "name": "ATM & Self-Service Kiosks Office",
    "departmentId": "DEP_FIN_RETAIL",
    "directorateId": "DIR_FIN_OPERATIONS",
    "productId": "JUMO-FINTECH"
  },
  {
    "id": "OFF_FIN_WALLETS",
    "name": "Digital Wallets System Office",
    "departmentId": "DEP_FIN_DIGITAL",
    "directorateId": "DIR_FIN_OPERATIONS",
    "productId": "JUMO-FINTECH"
  },
  {
    "id": "OFF_FIN_DIGIBANK",
    "name": "Digital Banking Core Office",
    "departmentId": "DEP_FIN_DIGITAL",
    "directorateId": "DIR_FIN_OPERATIONS",
    "productId": "JUMO-FINTECH"
  },
  {
    "id": "OFF_FIN_EMBEDDED",
    "name": "Embedded Finance (BaaS) Office",
    "departmentId": "DEP_FIN_DIGITAL",
    "directorateId": "DIR_FIN_TECHNOLOGY",
    "productId": "JUMO-FINTECH"
  },
  {
    "id": "OFF_FIN_SACCO",
    "name": "SACCO Core Banking Office",
    "departmentId": "DEP_FIN_COOPERATIVES",
    "directorateId": "DIR_FIN_RETAIL",
    "productId": "JUMO-FINTECH"
  },
  {
    "id": "OFF_FIN_MICRO",
    "name": "Microfinance Operations Office",
    "departmentId": "DEP_FIN_COOPERATIVES",
    "directorateId": "DIR_FIN_RETAIL",
    "productId": "JUMO-FINTECH"
  },
  {
    "id": "OFF_FIN_SAVINGS",
    "name": "Savings & Fixed Deposits Office",
    "departmentId": "DEP_FIN_WEALTH",
    "directorateId": "DIR_FIN_TREASURY",
    "productId": "JUMO-FINTECH"
  },
  {
    "id": "OFF_FIN_LENDING",
    "name": "Credit & Lending Platform Office",
    "departmentId": "DEP_FIN_CREDIT",
    "directorateId": "DIR_FIN_RISK",
    "productId": "JUMO-FINTECH"
  },
  {
    "id": "OFF_FIN_AGRI",
    "name": "Agricultural Finance Office",
    "departmentId": "DEP_FIN_CREDIT",
    "directorateId": "DIR_FIN_RISK",
    "productId": "JUMO-FINTECH"
  },
  {
    "id": "OFF_FIN_TRADE",
    "name": "Trade Finance & Escrow Office",
    "departmentId": "DEP_FIN_CROSS_BORDER",
    "directorateId": "DIR_FIN_TREASURY",
    "productId": "JUMO-FINTECH"
  },
  {
    "id": "OFF_FIN_TREASURY",
    "name": "Corporate Treasury & Liquidity Office",
    "departmentId": "DEP_FIN_TREASURY_MGMT",
    "directorateId": "DIR_FIN_TREASURY",
    "productId": "JUMO-FINTECH"
  },
  {
    "id": "OFF_FIN_FX",
    "name": "FX & Foreign Exchange Desk Office",
    "departmentId": "DEP_FIN_TREASURY_MGMT",
    "directorateId": "DIR_FIN_TREASURY",
    "productId": "JUMO-FINTECH"
  },
  {
    "id": "OFF_FIN_CAPMARKETS",
    "name": "Capital Markets & Brokerage Office",
    "departmentId": "DEP_FIN_INVESTMENT",
    "directorateId": "DIR_FIN_INVESTMENT",
    "productId": "JUMO-FINTECH"
  },
  {
    "id": "OFF_FIN_INVEST",
    "name": "Wealth & Investment Funds Office",
    "departmentId": "DEP_FIN_INVESTMENT",
    "directorateId": "DIR_FIN_INVESTMENT",
    "productId": "JUMO-FINTECH"
  },
  {
    "id": "OFF_FIN_CUSTODY",
    "name": "Securities Custody & Depository Office",
    "departmentId": "DEP_FIN_INVESTMENT",
    "directorateId": "DIR_FIN_INVESTMENT",
    "productId": "JUMO-FINTECH"
  },
  {
    "id": "OFF_FIN_INSURE",
    "name": "Insurtech & Micro-Insurance Office",
    "departmentId": "DEP_FIN_INSURANCE",
    "directorateId": "DIR_FIN_RISK",
    "productId": "JUMO-FINTECH"
  },
  {
    "id": "OFF_FIN_STABLECOIN",
    "name": "Stablecoin & Digital Asset Rails Office",
    "departmentId": "DEP_FIN_DIGITAL",
    "directorateId": "DIR_FIN_TECHNOLOGY",
    "productId": "JUMO-FINTECH"
  },
  {
    "id": "OFF_FIN_GLOBALACC",
    "name": "Multi-Currency Global Accounts Office",
    "departmentId": "DEP_FIN_CROSS_BORDER",
    "directorateId": "DIR_FIN_TREASURY",
    "productId": "JUMO-FINTECH"
  },
  {
    "id": "OFF_FIN_MULTICURR",
    "name": "Multi-Currency Clearing Office",
    "departmentId": "DEP_FIN_CROSS_BORDER",
    "directorateId": "DIR_FIN_TREASURY",
    "productId": "JUMO-FINTECH"
  },
  {
    "id": "OFF_FIN_DEV_API",
    "name": "Developer API Gateway Office",
    "departmentId": "DEP_FIN_TECHNOLOGY",
    "directorateId": "DIR_FIN_TECHNOLOGY",
    "productId": "JUMO-FINTECH"
  },
  {
    "id": "OFF_FIN_BANK_PAY",
    "name": "Commercial Bank Payments Office",
    "departmentId": "DEP_FIN_PAYMENTS",
    "directorateId": "DIR_FIN_OPERATIONS",
    "productId": "JUMO-FINTECH"
  },
  {
    "id": "OFF_FIN_BILL_PAY",
    "name": "Utility Bill Aggregator Office",
    "departmentId": "DEP_FIN_PAYMENTS",
    "directorateId": "DIR_FIN_OPERATIONS",
    "productId": "JUMO-FINTECH"
  },
  {
    "id": "OFF_FIN_MERCH_SERV",
    "name": "Merchant Solutions Hub Office",
    "departmentId": "DEP_FIN_RETAIL",
    "directorateId": "DIR_FIN_OPERATIONS",
    "productId": "JUMO-FINTECH"
  }
],
  portalsCount: 38,
  portals: [
  {
    "id": "PORTAL_FIN_CFO",
    "name": "CFO Office",
    "officeId": "OFF_FIN_CFO",
    "departmentId": "DEP_FIN_EXECUTIVE",
    "directorateId": "DIR_FIN_EXECUTIVE",
    "route": "/fintech/cfo",
    "roles": [
      "ROLE_CFO"
    ]
  },
  {
    "id": "PORTAL_FIN_LEDGER",
    "name": "FAAP General Ledger",
    "officeId": "OFF_FIN_CONTROLLER",
    "departmentId": "DEP_FIN_ACCOUNTING",
    "directorateId": "DIR_FIN_TREASURY",
    "route": "/fintech/gl",
    "roles": [
      "ROLE_CONTROLLER",
      "ROLE_ACCOUNTANT"
    ]
  },
  {
    "id": "PORTAL_FIN_TAX",
    "name": "Tax & Revenue Management",
    "officeId": "OFF_FIN_TAX",
    "departmentId": "DEP_FIN_COMPLIANCE",
    "directorateId": "DIR_FIN_RISK",
    "route": "/fintech/tax",
    "roles": [
      "ROLE_TAX_OFFICER"
    ]
  },
  {
    "id": "PORTAL_FIN_COMPLIANCE",
    "name": "Financial Compliance (AML)",
    "officeId": "OFF_FIN_AML",
    "departmentId": "DEP_FIN_COMPLIANCE",
    "directorateId": "DIR_FIN_RISK",
    "route": "/fintech/compliance",
    "roles": [
      "ROLE_COMPLIANCE_OFFICER"
    ]
  },
  {
    "id": "PORTAL_FIN_DATA_INT",
    "name": "Financial Data Intelligence",
    "officeId": "OFF_FIN_ANALYTICS",
    "departmentId": "DEP_FIN_INTELLIGENCE",
    "directorateId": "DIR_FIN_TECHNOLOGY",
    "route": "/fintech/data-int",
    "roles": [
      "ROLE_DATA_ANALYST"
    ]
  },
  {
    "id": "PORTAL_FIN_PAYROLL",
    "name": "Payroll & Salary Payments",
    "officeId": "OFF_FIN_PAYROLL",
    "departmentId": "DEP_FIN_ACCOUNTING",
    "directorateId": "DIR_FIN_TREASURY",
    "route": "/fintech/payroll",
    "roles": [
      "ROLE_PAYROLL_OFFICER"
    ]
  },
  {
    "id": "PORTAL_FIN_SWITCH",
    "name": "Universal Payment Switch",
    "officeId": "OFF_FIN_SWITCH",
    "departmentId": "DEP_FIN_PAYMENTS",
    "directorateId": "DIR_FIN_OPERATIONS",
    "route": "/fintech/switch",
    "roles": [
      "ROLE_SWITCH_OPERATOR"
    ]
  },
  {
    "id": "PORTAL_FIN_MOMO",
    "name": "Mobile Money Core (USSD)",
    "officeId": "OFF_FIN_MOMO",
    "departmentId": "DEP_FIN_PAYMENTS",
    "directorateId": "DIR_FIN_OPERATIONS",
    "route": "/fintech/momo",
    "roles": [
      "ROLE_MOMO_ADMIN"
    ]
  },
  {
    "id": "PORTAL_FIN_GATEWAY",
    "name": "Payment Gateway Checkout",
    "officeId": "OFF_FIN_GATEWAY",
    "departmentId": "DEP_FIN_PAYMENTS",
    "directorateId": "DIR_FIN_OPERATIONS",
    "route": "/fintech/gateway",
    "roles": [
      "ROLE_GATEWAY_ADMIN"
    ]
  },
  {
    "id": "PORTAL_FIN_COLLECTIONS",
    "name": "Institutional Collections",
    "officeId": "OFF_FIN_COLLECTIONS",
    "departmentId": "DEP_FIN_PAYMENTS",
    "directorateId": "DIR_FIN_OPERATIONS",
    "route": "/fintech/collections",
    "roles": [
      "ROLE_COLLECTIONS_OFFICER"
    ]
  },
  {
    "id": "PORTAL_FIN_PAYOUTS",
    "name": "Bulk Payouts & Disbursal",
    "officeId": "OFF_FIN_PAYOUTS",
    "departmentId": "DEP_FIN_PAYMENTS",
    "directorateId": "DIR_FIN_OPERATIONS",
    "route": "/fintech/payouts",
    "roles": [
      "ROLE_DISBURSAL_OFFICER"
    ]
  },
  {
    "id": "PORTAL_FIN_REMIT",
    "name": "Cross-Border Remittances",
    "officeId": "OFF_FIN_REMIT",
    "departmentId": "DEP_FIN_CROSS_BORDER",
    "directorateId": "DIR_FIN_OPERATIONS",
    "route": "/fintech/remit",
    "roles": [
      "ROLE_FX_TRADER"
    ]
  },
  {
    "id": "PORTAL_FIN_AGENT",
    "name": "Agency Banking Network",
    "officeId": "OFF_FIN_AGENT",
    "departmentId": "DEP_FIN_RETAIL",
    "directorateId": "DIR_FIN_OPERATIONS",
    "route": "/fintech/agent-banking",
    "roles": [
      "ROLE_AGENT_SUPERVISOR"
    ]
  },
  {
    "id": "PORTAL_FIN_MERCHANT",
    "name": "Merchant Acquiring & POS",
    "officeId": "OFF_FIN_MERCHANT",
    "departmentId": "DEP_FIN_RETAIL",
    "directorateId": "DIR_FIN_OPERATIONS",
    "route": "/fintech/merchant-acquiring",
    "roles": [
      "ROLE_MERCHANT_ADMIN"
    ]
  },
  {
    "id": "PORTAL_FIN_CARDS",
    "name": "Card Issuing & Management",
    "officeId": "OFF_FIN_CARDS",
    "departmentId": "DEP_FIN_RETAIL",
    "directorateId": "DIR_FIN_OPERATIONS",
    "route": "/fintech/cards",
    "roles": [
      "ROLE_CARD_OFFICER"
    ]
  },
  {
    "id": "PORTAL_FIN_ATM",
    "name": "ATM & Self-Service Kiosks",
    "officeId": "OFF_FIN_ATM",
    "departmentId": "DEP_FIN_RETAIL",
    "directorateId": "DIR_FIN_OPERATIONS",
    "route": "/fintech/atm",
    "roles": [
      "ROLE_ATM_ADMIN"
    ]
  },
  {
    "id": "PORTAL_FIN_WALLETS",
    "name": "Digital Wallets System",
    "officeId": "OFF_FIN_WALLETS",
    "departmentId": "DEP_FIN_DIGITAL",
    "directorateId": "DIR_FIN_OPERATIONS",
    "route": "/fintech/wallets",
    "roles": [
      "ROLE_WALLET_ADMIN"
    ]
  },
  {
    "id": "PORTAL_FIN_DIGIBANK",
    "name": "Digital Banking Core",
    "officeId": "OFF_FIN_DIGIBANK",
    "departmentId": "DEP_FIN_DIGITAL",
    "directorateId": "DIR_FIN_OPERATIONS",
    "route": "/fintech/digital-banking",
    "roles": [
      "ROLE_CORE_BANKER"
    ]
  },
  {
    "id": "PORTAL_FIN_EMBEDDED",
    "name": "Embedded Finance (BaaS)",
    "officeId": "OFF_FIN_EMBEDDED",
    "departmentId": "DEP_FIN_DIGITAL",
    "directorateId": "DIR_FIN_TECHNOLOGY",
    "route": "/fintech/embedded",
    "roles": [
      "ROLE_API_PARTNER"
    ]
  },
  {
    "id": "PORTAL_FIN_SACCO",
    "name": "SACCO Core Banking",
    "officeId": "OFF_FIN_SACCO",
    "departmentId": "DEP_FIN_COOPERATIVES",
    "directorateId": "DIR_FIN_RETAIL",
    "route": "/fintech/sacco",
    "roles": [
      "ROLE_SACCO_MANAGER"
    ]
  },
  {
    "id": "PORTAL_FIN_MICRO",
    "name": "Microfinance Operations",
    "officeId": "OFF_FIN_MICRO",
    "departmentId": "DEP_FIN_COOPERATIVES",
    "directorateId": "DIR_FIN_RETAIL",
    "route": "/fintech/microfinance",
    "roles": [
      "ROLE_LOAN_OFFICER"
    ]
  },
  {
    "id": "PORTAL_FIN_SAVINGS",
    "name": "Savings & Fixed Deposits",
    "officeId": "OFF_FIN_SAVINGS",
    "departmentId": "DEP_FIN_WEALTH",
    "directorateId": "DIR_FIN_TREASURY",
    "route": "/fintech/savings",
    "roles": [
      "ROLE_DEPOSIT_OFFICER"
    ]
  },
  {
    "id": "PORTAL_FIN_LENDING",
    "name": "Credit & Lending Platform",
    "officeId": "OFF_FIN_LENDING",
    "departmentId": "DEP_FIN_CREDIT",
    "directorateId": "DIR_FIN_RISK",
    "route": "/fintech/lending",
    "roles": [
      "ROLE_CREDIT_ANALYST"
    ]
  },
  {
    "id": "PORTAL_FIN_AGRI",
    "name": "Agricultural Finance",
    "officeId": "OFF_FIN_AGRI",
    "departmentId": "DEP_FIN_CREDIT",
    "directorateId": "DIR_FIN_RISK",
    "route": "/fintech/agri-finance",
    "roles": [
      "ROLE_AGRI_OFFICER"
    ]
  },
  {
    "id": "PORTAL_FIN_TRADE",
    "name": "Trade Finance & Escrow",
    "officeId": "OFF_FIN_TRADE",
    "departmentId": "DEP_FIN_CROSS_BORDER",
    "directorateId": "DIR_FIN_TREASURY",
    "route": "/fintech/trade-finance",
    "roles": [
      "ROLE_ESCROW_OFFICER"
    ]
  },
  {
    "id": "PORTAL_FIN_TREASURY",
    "name": "Corporate Treasury & Liquidity",
    "officeId": "OFF_FIN_TREASURY",
    "departmentId": "DEP_FIN_TREASURY_MGMT",
    "directorateId": "DIR_FIN_TREASURY",
    "route": "/fintech/treasury",
    "roles": [
      "ROLE_TREASURER"
    ]
  },
  {
    "id": "PORTAL_FIN_FX",
    "name": "FX & Foreign Exchange Desk",
    "officeId": "OFF_FIN_FX",
    "departmentId": "DEP_FIN_TREASURY_MGMT",
    "directorateId": "DIR_FIN_TREASURY",
    "route": "/fintech/fx",
    "roles": [
      "ROLE_FX_TRADER"
    ]
  },
  {
    "id": "PORTAL_FIN_CAPMARKETS",
    "name": "Capital Markets & Brokerage",
    "officeId": "OFF_FIN_CAPMARKETS",
    "departmentId": "DEP_FIN_INVESTMENT",
    "directorateId": "DIR_FIN_INVESTMENT",
    "route": "/fintech/capital-markets",
    "roles": [
      "ROLE_BROKER"
    ]
  },
  {
    "id": "PORTAL_FIN_INVEST",
    "name": "Wealth & Investment Funds",
    "officeId": "OFF_FIN_INVEST",
    "departmentId": "DEP_FIN_INVESTMENT",
    "directorateId": "DIR_FIN_INVESTMENT",
    "route": "/fintech/investment",
    "roles": [
      "ROLE_FUND_MANAGER"
    ]
  },
  {
    "id": "PORTAL_FIN_CUSTODY",
    "name": "Securities Custody & Depository",
    "officeId": "OFF_FIN_CUSTODY",
    "departmentId": "DEP_FIN_INVESTMENT",
    "directorateId": "DIR_FIN_INVESTMENT",
    "route": "/fintech/custody",
    "roles": [
      "ROLE_CUSTODIAN"
    ]
  },
  {
    "id": "PORTAL_FIN_INSURE",
    "name": "Insurtech & Micro-Insurance",
    "officeId": "OFF_FIN_INSURE",
    "departmentId": "DEP_FIN_INSURANCE",
    "directorateId": "DIR_FIN_RISK",
    "route": "/fintech/insurance",
    "roles": [
      "ROLE_UNDERWRITER"
    ]
  },
  {
    "id": "PORTAL_FIN_STABLECOIN",
    "name": "Stablecoin & Digital Asset Rails",
    "officeId": "OFF_FIN_STABLECOIN",
    "departmentId": "DEP_FIN_DIGITAL",
    "directorateId": "DIR_FIN_TECHNOLOGY",
    "route": "/fintech/stablecoin",
    "roles": [
      "ROLE_DIGITAL_ASSET_ADMIN"
    ]
  },
  {
    "id": "PORTAL_FIN_GLOBALACC",
    "name": "Multi-Currency Global Accounts",
    "officeId": "OFF_FIN_GLOBALACC",
    "departmentId": "DEP_FIN_CROSS_BORDER",
    "directorateId": "DIR_FIN_TREASURY",
    "route": "/fintech/global-accounts",
    "roles": [
      "ROLE_GLOBAL_ACC_OFFICER"
    ]
  },
  {
    "id": "PORTAL_FIN_MULTICURR",
    "name": "Multi-Currency Clearing",
    "officeId": "OFF_FIN_MULTICURR",
    "departmentId": "DEP_FIN_CROSS_BORDER",
    "directorateId": "DIR_FIN_TREASURY",
    "route": "/fintech/multi-currency",
    "roles": [
      "ROLE_CLEARING_OFFICER"
    ]
  },
  {
    "id": "PORTAL_FIN_DEV_API",
    "name": "Developer API Gateway",
    "officeId": "OFF_FIN_DEV_API",
    "departmentId": "DEP_FIN_TECHNOLOGY",
    "directorateId": "DIR_FIN_TECHNOLOGY",
    "route": "/fintech/dev-api",
    "roles": [
      "ROLE_DEV_LEAD"
    ]
  },
  {
    "id": "PORTAL_FIN_BANK_PAY",
    "name": "Commercial Bank Payments",
    "officeId": "OFF_FIN_BANK_PAY",
    "departmentId": "DEP_FIN_PAYMENTS",
    "directorateId": "DIR_FIN_OPERATIONS",
    "route": "/fintech/bank-payments",
    "roles": [
      "ROLE_BANK_SETTLEMENT_OFFICER"
    ]
  },
  {
    "id": "PORTAL_FIN_BILL_PAY",
    "name": "Utility Bill Aggregator",
    "officeId": "OFF_FIN_BILL_PAY",
    "departmentId": "DEP_FIN_PAYMENTS",
    "directorateId": "DIR_FIN_OPERATIONS",
    "route": "/fintech/bill-payments",
    "roles": [
      "ROLE_BILLING_ADMIN"
    ]
  },
  {
    "id": "PORTAL_FIN_MERCH_SERV",
    "name": "Merchant Solutions Hub",
    "officeId": "OFF_FIN_MERCH_SERV",
    "departmentId": "DEP_FIN_RETAIL",
    "directorateId": "DIR_FIN_OPERATIONS",
    "route": "/fintech/merchant-services",
    "roles": [
      "ROLE_MERCHANT_SUPPORT"
    ]
  }
],
  modulesCount: 38,
  modules: [
  {
    "id": "MOD_FT_AGENT_BANKING",
    "name": "Agent Banking",
    "code": "FT-AGENT-BANKING",
    "path": "products/fintech/agent-banking/manifest.ts"
  },
  {
    "id": "MOD_FT_AGRICULTURAL_FINANCE",
    "name": "Agricultural Finance",
    "code": "FT-AGRICULTURAL-FINANCE",
    "path": "products/fintech/agricultural-finance/manifest.ts"
  },
  {
    "id": "MOD_FT_ATM_SELF_SERVICE",
    "name": "Atm Self Service",
    "code": "FT-ATM-SELF-SERVICE",
    "path": "products/fintech/atm-self-service/manifest.ts"
  },
  {
    "id": "MOD_FT_BANK_PAYMENTS",
    "name": "Bank Payments",
    "code": "FT-BANK-PAYMENTS",
    "path": "products/fintech/bank-payments/manifest.ts"
  },
  {
    "id": "MOD_FT_BILL_PAYMENTS",
    "name": "Bill Payments",
    "code": "FT-BILL-PAYMENTS",
    "path": "products/fintech/bill-payments/manifest.ts"
  },
  {
    "id": "MOD_FT_CAPITAL_MARKETS",
    "name": "Capital Markets",
    "code": "FT-CAPITAL-MARKETS",
    "path": "products/fintech/capital-markets/manifest.ts"
  },
  {
    "id": "MOD_FT_CARDS",
    "name": "Cards",
    "code": "FT-CARDS",
    "path": "products/fintech/cards/manifest.ts"
  },
  {
    "id": "MOD_FT_COLLECTIONS",
    "name": "Collections",
    "code": "FT-COLLECTIONS",
    "path": "products/fintech/collections/manifest.ts"
  },
  {
    "id": "MOD_FT_COMPLIANCE",
    "name": "Compliance",
    "code": "FT-COMPLIANCE",
    "path": "products/fintech/compliance/manifest.ts"
  },
  {
    "id": "MOD_FT_CROSS_BORDER",
    "name": "Cross Border",
    "code": "FT-CROSS-BORDER",
    "path": "products/fintech/cross-border/manifest.ts"
  },
  {
    "id": "MOD_FT_DATA_INTELLIGENCE",
    "name": "Data Intelligence",
    "code": "FT-DATA-INTELLIGENCE",
    "path": "products/fintech/data-intelligence/manifest.ts"
  },
  {
    "id": "MOD_FT_DEVELOPER_API",
    "name": "Developer Api",
    "code": "FT-DEVELOPER-API",
    "path": "products/fintech/developer-api/manifest.ts"
  },
  {
    "id": "MOD_FT_DIGITAL_BANKING",
    "name": "Digital Banking",
    "code": "FT-DIGITAL-BANKING",
    "path": "products/fintech/digital-banking/manifest.ts"
  },
  {
    "id": "MOD_FT_DIGITAL_WALLETS",
    "name": "Digital Wallets",
    "code": "FT-DIGITAL-WALLETS",
    "path": "products/fintech/digital-wallets/manifest.ts"
  },
  {
    "id": "MOD_FT_EMBEDDED_FINANCE",
    "name": "Embedded Finance",
    "code": "FT-EMBEDDED-FINANCE",
    "path": "products/fintech/embedded-finance/manifest.ts"
  },
  {
    "id": "MOD_FT_FINANCIAL_ACCOUNTING",
    "name": "Financial Accounting",
    "code": "FT-FINANCIAL-ACCOUNTING",
    "path": "products/fintech/financial-accounting/manifest.ts"
  },
  {
    "id": "MOD_FT_FX",
    "name": "Fx",
    "code": "FT-FX",
    "path": "products/fintech/fx/manifest.ts"
  },
  {
    "id": "MOD_FT_GLOBAL_ACCOUNTS",
    "name": "Global Accounts",
    "code": "FT-GLOBAL-ACCOUNTS",
    "path": "products/fintech/global-accounts/manifest.ts"
  },
  {
    "id": "MOD_FT_INSURANCE",
    "name": "Insurance",
    "code": "FT-INSURANCE",
    "path": "products/fintech/insurance/manifest.ts"
  },
  {
    "id": "MOD_FT_INVESTMENT",
    "name": "Investment",
    "code": "FT-INVESTMENT",
    "path": "products/fintech/investment/manifest.ts"
  },
  {
    "id": "MOD_FT_LENDING",
    "name": "Lending",
    "code": "FT-LENDING",
    "path": "products/fintech/lending/manifest.ts"
  },
  {
    "id": "MOD_FT_MERCHANT_ACQUIRING",
    "name": "Merchant Acquiring",
    "code": "FT-MERCHANT-ACQUIRING",
    "path": "products/fintech/merchant-acquiring/manifest.ts"
  },
  {
    "id": "MOD_FT_MERCHANT_SERVICES",
    "name": "Merchant Services",
    "code": "FT-MERCHANT-SERVICES",
    "path": "products/fintech/merchant-services/manifest.ts"
  },
  {
    "id": "MOD_FT_MICROFINANCE",
    "name": "Microfinance",
    "code": "FT-MICROFINANCE",
    "path": "products/fintech/microfinance/manifest.ts"
  },
  {
    "id": "MOD_FT_MOBILE_MONEY",
    "name": "Mobile Money",
    "code": "FT-MOBILE-MONEY",
    "path": "products/fintech/mobile-money/manifest.ts"
  },
  {
    "id": "MOD_FT_MULTI_CURRENCY",
    "name": "Multi Currency",
    "code": "FT-MULTI-CURRENCY",
    "path": "products/fintech/multi-currency/manifest.ts"
  },
  {
    "id": "MOD_FT_PAYMENT_GATEWAY",
    "name": "Payment Gateway",
    "code": "FT-PAYMENT-GATEWAY",
    "path": "products/fintech/payment-gateway/manifest.ts"
  },
  {
    "id": "MOD_FT_PAYMENT_SWITCHING",
    "name": "Payment Switching",
    "code": "FT-PAYMENT-SWITCHING",
    "path": "products/fintech/payment-switching/manifest.ts"
  },
  {
    "id": "MOD_FT_PAYOUTS",
    "name": "Payouts",
    "code": "FT-PAYOUTS",
    "path": "products/fintech/payouts/manifest.ts"
  },
  {
    "id": "MOD_FT_PAYROLL",
    "name": "Payroll",
    "code": "FT-PAYROLL",
    "path": "products/fintech/payroll/manifest.ts"
  },
  {
    "id": "MOD_FT_REMITTANCES",
    "name": "Remittances",
    "code": "FT-REMITTANCES",
    "path": "products/fintech/remittances/manifest.ts"
  },
  {
    "id": "MOD_FT_SACCO",
    "name": "Sacco",
    "code": "FT-SACCO",
    "path": "products/fintech/sacco/manifest.ts"
  },
  {
    "id": "MOD_FT_SAVINGS",
    "name": "Savings",
    "code": "FT-SAVINGS",
    "path": "products/fintech/savings/manifest.ts"
  },
  {
    "id": "MOD_FT_SECURITIES_CUSTODY",
    "name": "Securities Custody",
    "code": "FT-SECURITIES-CUSTODY",
    "path": "products/fintech/securities-custody/manifest.ts"
  },
  {
    "id": "MOD_FT_STABLECOIN",
    "name": "Stablecoin",
    "code": "FT-STABLECOIN",
    "path": "products/fintech/stablecoin/manifest.ts"
  },
  {
    "id": "MOD_FT_TAX_REVENUE",
    "name": "Tax Revenue",
    "code": "FT-TAX-REVENUE",
    "path": "products/fintech/tax-revenue/manifest.ts"
  },
  {
    "id": "MOD_FT_TRADE_FINANCE",
    "name": "Trade Finance",
    "code": "FT-TRADE-FINANCE",
    "path": "products/fintech/trade-finance/manifest.ts"
  },
  {
    "id": "MOD_FT_TREASURY",
    "name": "Treasury",
    "code": "FT-TREASURY",
    "path": "products/fintech/treasury/manifest.ts"
  }
],
  capabilitiesCount: 38,
  capabilities: [
  {
    "id": "CAP_FT_AGENT_BANKING",
    "name": "Agent Banking Autonomous Engine",
    "moduleId": "MOD_FT_AGENT_BANKING",
    "productId": "JUMO-FINTECH",
    "enabled": true
  },
  {
    "id": "CAP_FT_AGRICULTURAL_FINANCE",
    "name": "Agricultural Finance Autonomous Engine",
    "moduleId": "MOD_FT_AGRICULTURAL_FINANCE",
    "productId": "JUMO-FINTECH",
    "enabled": true
  },
  {
    "id": "CAP_FT_ATM_SELF_SERVICE",
    "name": "Atm Self Service Autonomous Engine",
    "moduleId": "MOD_FT_ATM_SELF_SERVICE",
    "productId": "JUMO-FINTECH",
    "enabled": true
  },
  {
    "id": "CAP_FT_BANK_PAYMENTS",
    "name": "Bank Payments Autonomous Engine",
    "moduleId": "MOD_FT_BANK_PAYMENTS",
    "productId": "JUMO-FINTECH",
    "enabled": true
  },
  {
    "id": "CAP_FT_BILL_PAYMENTS",
    "name": "Bill Payments Autonomous Engine",
    "moduleId": "MOD_FT_BILL_PAYMENTS",
    "productId": "JUMO-FINTECH",
    "enabled": true
  },
  {
    "id": "CAP_FT_CAPITAL_MARKETS",
    "name": "Capital Markets Autonomous Engine",
    "moduleId": "MOD_FT_CAPITAL_MARKETS",
    "productId": "JUMO-FINTECH",
    "enabled": true
  },
  {
    "id": "CAP_FT_CARDS",
    "name": "Cards Autonomous Engine",
    "moduleId": "MOD_FT_CARDS",
    "productId": "JUMO-FINTECH",
    "enabled": true
  },
  {
    "id": "CAP_FT_COLLECTIONS",
    "name": "Collections Autonomous Engine",
    "moduleId": "MOD_FT_COLLECTIONS",
    "productId": "JUMO-FINTECH",
    "enabled": true
  },
  {
    "id": "CAP_FT_COMPLIANCE",
    "name": "Compliance Autonomous Engine",
    "moduleId": "MOD_FT_COMPLIANCE",
    "productId": "JUMO-FINTECH",
    "enabled": true
  },
  {
    "id": "CAP_FT_CROSS_BORDER",
    "name": "Cross Border Autonomous Engine",
    "moduleId": "MOD_FT_CROSS_BORDER",
    "productId": "JUMO-FINTECH",
    "enabled": true
  },
  {
    "id": "CAP_FT_DATA_INTELLIGENCE",
    "name": "Data Intelligence Autonomous Engine",
    "moduleId": "MOD_FT_DATA_INTELLIGENCE",
    "productId": "JUMO-FINTECH",
    "enabled": true
  },
  {
    "id": "CAP_FT_DEVELOPER_API",
    "name": "Developer Api Autonomous Engine",
    "moduleId": "MOD_FT_DEVELOPER_API",
    "productId": "JUMO-FINTECH",
    "enabled": true
  },
  {
    "id": "CAP_FT_DIGITAL_BANKING",
    "name": "Digital Banking Autonomous Engine",
    "moduleId": "MOD_FT_DIGITAL_BANKING",
    "productId": "JUMO-FINTECH",
    "enabled": true
  },
  {
    "id": "CAP_FT_DIGITAL_WALLETS",
    "name": "Digital Wallets Autonomous Engine",
    "moduleId": "MOD_FT_DIGITAL_WALLETS",
    "productId": "JUMO-FINTECH",
    "enabled": true
  },
  {
    "id": "CAP_FT_EMBEDDED_FINANCE",
    "name": "Embedded Finance Autonomous Engine",
    "moduleId": "MOD_FT_EMBEDDED_FINANCE",
    "productId": "JUMO-FINTECH",
    "enabled": true
  },
  {
    "id": "CAP_FT_FINANCIAL_ACCOUNTING",
    "name": "Financial Accounting Autonomous Engine",
    "moduleId": "MOD_FT_FINANCIAL_ACCOUNTING",
    "productId": "JUMO-FINTECH",
    "enabled": true
  },
  {
    "id": "CAP_FT_FX",
    "name": "Fx Autonomous Engine",
    "moduleId": "MOD_FT_FX",
    "productId": "JUMO-FINTECH",
    "enabled": true
  },
  {
    "id": "CAP_FT_GLOBAL_ACCOUNTS",
    "name": "Global Accounts Autonomous Engine",
    "moduleId": "MOD_FT_GLOBAL_ACCOUNTS",
    "productId": "JUMO-FINTECH",
    "enabled": true
  },
  {
    "id": "CAP_FT_INSURANCE",
    "name": "Insurance Autonomous Engine",
    "moduleId": "MOD_FT_INSURANCE",
    "productId": "JUMO-FINTECH",
    "enabled": true
  },
  {
    "id": "CAP_FT_INVESTMENT",
    "name": "Investment Autonomous Engine",
    "moduleId": "MOD_FT_INVESTMENT",
    "productId": "JUMO-FINTECH",
    "enabled": true
  },
  {
    "id": "CAP_FT_LENDING",
    "name": "Lending Autonomous Engine",
    "moduleId": "MOD_FT_LENDING",
    "productId": "JUMO-FINTECH",
    "enabled": true
  },
  {
    "id": "CAP_FT_MERCHANT_ACQUIRING",
    "name": "Merchant Acquiring Autonomous Engine",
    "moduleId": "MOD_FT_MERCHANT_ACQUIRING",
    "productId": "JUMO-FINTECH",
    "enabled": true
  },
  {
    "id": "CAP_FT_MERCHANT_SERVICES",
    "name": "Merchant Services Autonomous Engine",
    "moduleId": "MOD_FT_MERCHANT_SERVICES",
    "productId": "JUMO-FINTECH",
    "enabled": true
  },
  {
    "id": "CAP_FT_MICROFINANCE",
    "name": "Microfinance Autonomous Engine",
    "moduleId": "MOD_FT_MICROFINANCE",
    "productId": "JUMO-FINTECH",
    "enabled": true
  },
  {
    "id": "CAP_FT_MOBILE_MONEY",
    "name": "Mobile Money Autonomous Engine",
    "moduleId": "MOD_FT_MOBILE_MONEY",
    "productId": "JUMO-FINTECH",
    "enabled": true
  },
  {
    "id": "CAP_FT_MULTI_CURRENCY",
    "name": "Multi Currency Autonomous Engine",
    "moduleId": "MOD_FT_MULTI_CURRENCY",
    "productId": "JUMO-FINTECH",
    "enabled": true
  },
  {
    "id": "CAP_FT_PAYMENT_GATEWAY",
    "name": "Payment Gateway Autonomous Engine",
    "moduleId": "MOD_FT_PAYMENT_GATEWAY",
    "productId": "JUMO-FINTECH",
    "enabled": true
  },
  {
    "id": "CAP_FT_PAYMENT_SWITCHING",
    "name": "Payment Switching Autonomous Engine",
    "moduleId": "MOD_FT_PAYMENT_SWITCHING",
    "productId": "JUMO-FINTECH",
    "enabled": true
  },
  {
    "id": "CAP_FT_PAYOUTS",
    "name": "Payouts Autonomous Engine",
    "moduleId": "MOD_FT_PAYOUTS",
    "productId": "JUMO-FINTECH",
    "enabled": true
  },
  {
    "id": "CAP_FT_PAYROLL",
    "name": "Payroll Autonomous Engine",
    "moduleId": "MOD_FT_PAYROLL",
    "productId": "JUMO-FINTECH",
    "enabled": true
  },
  {
    "id": "CAP_FT_REMITTANCES",
    "name": "Remittances Autonomous Engine",
    "moduleId": "MOD_FT_REMITTANCES",
    "productId": "JUMO-FINTECH",
    "enabled": true
  },
  {
    "id": "CAP_FT_SACCO",
    "name": "Sacco Autonomous Engine",
    "moduleId": "MOD_FT_SACCO",
    "productId": "JUMO-FINTECH",
    "enabled": true
  },
  {
    "id": "CAP_FT_SAVINGS",
    "name": "Savings Autonomous Engine",
    "moduleId": "MOD_FT_SAVINGS",
    "productId": "JUMO-FINTECH",
    "enabled": true
  },
  {
    "id": "CAP_FT_SECURITIES_CUSTODY",
    "name": "Securities Custody Autonomous Engine",
    "moduleId": "MOD_FT_SECURITIES_CUSTODY",
    "productId": "JUMO-FINTECH",
    "enabled": true
  },
  {
    "id": "CAP_FT_STABLECOIN",
    "name": "Stablecoin Autonomous Engine",
    "moduleId": "MOD_FT_STABLECOIN",
    "productId": "JUMO-FINTECH",
    "enabled": true
  },
  {
    "id": "CAP_FT_TAX_REVENUE",
    "name": "Tax Revenue Autonomous Engine",
    "moduleId": "MOD_FT_TAX_REVENUE",
    "productId": "JUMO-FINTECH",
    "enabled": true
  },
  {
    "id": "CAP_FT_TRADE_FINANCE",
    "name": "Trade Finance Autonomous Engine",
    "moduleId": "MOD_FT_TRADE_FINANCE",
    "productId": "JUMO-FINTECH",
    "enabled": true
  },
  {
    "id": "CAP_FT_TREASURY",
    "name": "Treasury Autonomous Engine",
    "moduleId": "MOD_FT_TREASURY",
    "productId": "JUMO-FINTECH",
    "enabled": true
  }
],
  uiMetadataCount: 38,
  uiMetadata: [
  {
    "id": "UI_FT_CFO",
    "capabilityId": "CAP_FT_CFO",
    "componentType": "DASHBOARD",
    "route": "/fintech/cfo",
    "metadata": {
      "title": "CFO Office",
      "category": "Financial Operations"
    }
  },
  {
    "id": "UI_FT_LEDGER",
    "capabilityId": "CAP_FT_LEDGER",
    "componentType": "DASHBOARD",
    "route": "/fintech/gl",
    "metadata": {
      "title": "FAAP General Ledger",
      "category": "Financial Operations"
    }
  },
  {
    "id": "UI_FT_TAX",
    "capabilityId": "CAP_FT_TAX",
    "componentType": "DASHBOARD",
    "route": "/fintech/tax",
    "metadata": {
      "title": "Tax & Revenue Management",
      "category": "Financial Operations"
    }
  },
  {
    "id": "UI_FT_COMPLIANCE",
    "capabilityId": "CAP_FT_COMPLIANCE",
    "componentType": "DASHBOARD",
    "route": "/fintech/compliance",
    "metadata": {
      "title": "Financial Compliance (AML)",
      "category": "Financial Operations"
    }
  },
  {
    "id": "UI_FT_DATA_INT",
    "capabilityId": "CAP_FT_DATA_INT",
    "componentType": "DASHBOARD",
    "route": "/fintech/data-int",
    "metadata": {
      "title": "Financial Data Intelligence",
      "category": "Financial Operations"
    }
  },
  {
    "id": "UI_FT_PAYROLL",
    "capabilityId": "CAP_FT_PAYROLL",
    "componentType": "DASHBOARD",
    "route": "/fintech/payroll",
    "metadata": {
      "title": "Payroll & Salary Payments",
      "category": "Financial Operations"
    }
  },
  {
    "id": "UI_FT_SWITCH",
    "capabilityId": "CAP_FT_SWITCH",
    "componentType": "DASHBOARD",
    "route": "/fintech/switch",
    "metadata": {
      "title": "Universal Payment Switch",
      "category": "Financial Operations"
    }
  },
  {
    "id": "UI_FT_MOMO",
    "capabilityId": "CAP_FT_MOMO",
    "componentType": "DASHBOARD",
    "route": "/fintech/momo",
    "metadata": {
      "title": "Mobile Money Core (USSD)",
      "category": "Financial Operations"
    }
  },
  {
    "id": "UI_FT_GATEWAY",
    "capabilityId": "CAP_FT_GATEWAY",
    "componentType": "DASHBOARD",
    "route": "/fintech/gateway",
    "metadata": {
      "title": "Payment Gateway Checkout",
      "category": "Financial Operations"
    }
  },
  {
    "id": "UI_FT_COLLECTIONS",
    "capabilityId": "CAP_FT_COLLECTIONS",
    "componentType": "DASHBOARD",
    "route": "/fintech/collections",
    "metadata": {
      "title": "Institutional Collections",
      "category": "Financial Operations"
    }
  },
  {
    "id": "UI_FT_PAYOUTS",
    "capabilityId": "CAP_FT_PAYOUTS",
    "componentType": "DASHBOARD",
    "route": "/fintech/payouts",
    "metadata": {
      "title": "Bulk Payouts & Disbursal",
      "category": "Financial Operations"
    }
  },
  {
    "id": "UI_FT_REMIT",
    "capabilityId": "CAP_FT_REMIT",
    "componentType": "DASHBOARD",
    "route": "/fintech/remit",
    "metadata": {
      "title": "Cross-Border Remittances",
      "category": "Financial Operations"
    }
  },
  {
    "id": "UI_FT_AGENT",
    "capabilityId": "CAP_FT_AGENT",
    "componentType": "DASHBOARD",
    "route": "/fintech/agent-banking",
    "metadata": {
      "title": "Agency Banking Network",
      "category": "Financial Operations"
    }
  },
  {
    "id": "UI_FT_MERCHANT",
    "capabilityId": "CAP_FT_MERCHANT",
    "componentType": "DASHBOARD",
    "route": "/fintech/merchant-acquiring",
    "metadata": {
      "title": "Merchant Acquiring & POS",
      "category": "Financial Operations"
    }
  },
  {
    "id": "UI_FT_CARDS",
    "capabilityId": "CAP_FT_CARDS",
    "componentType": "DASHBOARD",
    "route": "/fintech/cards",
    "metadata": {
      "title": "Card Issuing & Management",
      "category": "Financial Operations"
    }
  },
  {
    "id": "UI_FT_ATM",
    "capabilityId": "CAP_FT_ATM",
    "componentType": "DASHBOARD",
    "route": "/fintech/atm",
    "metadata": {
      "title": "ATM & Self-Service Kiosks",
      "category": "Financial Operations"
    }
  },
  {
    "id": "UI_FT_WALLETS",
    "capabilityId": "CAP_FT_WALLETS",
    "componentType": "DASHBOARD",
    "route": "/fintech/wallets",
    "metadata": {
      "title": "Digital Wallets System",
      "category": "Financial Operations"
    }
  },
  {
    "id": "UI_FT_DIGIBANK",
    "capabilityId": "CAP_FT_DIGIBANK",
    "componentType": "DASHBOARD",
    "route": "/fintech/digital-banking",
    "metadata": {
      "title": "Digital Banking Core",
      "category": "Financial Operations"
    }
  },
  {
    "id": "UI_FT_EMBEDDED",
    "capabilityId": "CAP_FT_EMBEDDED",
    "componentType": "DASHBOARD",
    "route": "/fintech/embedded",
    "metadata": {
      "title": "Embedded Finance (BaaS)",
      "category": "Financial Operations"
    }
  },
  {
    "id": "UI_FT_SACCO",
    "capabilityId": "CAP_FT_SACCO",
    "componentType": "DASHBOARD",
    "route": "/fintech/sacco",
    "metadata": {
      "title": "SACCO Core Banking",
      "category": "Financial Operations"
    }
  },
  {
    "id": "UI_FT_MICRO",
    "capabilityId": "CAP_FT_MICRO",
    "componentType": "DASHBOARD",
    "route": "/fintech/microfinance",
    "metadata": {
      "title": "Microfinance Operations",
      "category": "Financial Operations"
    }
  },
  {
    "id": "UI_FT_SAVINGS",
    "capabilityId": "CAP_FT_SAVINGS",
    "componentType": "DASHBOARD",
    "route": "/fintech/savings",
    "metadata": {
      "title": "Savings & Fixed Deposits",
      "category": "Financial Operations"
    }
  },
  {
    "id": "UI_FT_LENDING",
    "capabilityId": "CAP_FT_LENDING",
    "componentType": "DASHBOARD",
    "route": "/fintech/lending",
    "metadata": {
      "title": "Credit & Lending Platform",
      "category": "Financial Operations"
    }
  },
  {
    "id": "UI_FT_AGRI",
    "capabilityId": "CAP_FT_AGRI",
    "componentType": "DASHBOARD",
    "route": "/fintech/agri-finance",
    "metadata": {
      "title": "Agricultural Finance",
      "category": "Financial Operations"
    }
  },
  {
    "id": "UI_FT_TRADE",
    "capabilityId": "CAP_FT_TRADE",
    "componentType": "DASHBOARD",
    "route": "/fintech/trade-finance",
    "metadata": {
      "title": "Trade Finance & Escrow",
      "category": "Financial Operations"
    }
  },
  {
    "id": "UI_FT_TREASURY",
    "capabilityId": "CAP_FT_TREASURY",
    "componentType": "DASHBOARD",
    "route": "/fintech/treasury",
    "metadata": {
      "title": "Corporate Treasury & Liquidity",
      "category": "Financial Operations"
    }
  },
  {
    "id": "UI_FT_FX",
    "capabilityId": "CAP_FT_FX",
    "componentType": "DASHBOARD",
    "route": "/fintech/fx",
    "metadata": {
      "title": "FX & Foreign Exchange Desk",
      "category": "Financial Operations"
    }
  },
  {
    "id": "UI_FT_CAPMARKETS",
    "capabilityId": "CAP_FT_CAPMARKETS",
    "componentType": "DASHBOARD",
    "route": "/fintech/capital-markets",
    "metadata": {
      "title": "Capital Markets & Brokerage",
      "category": "Financial Operations"
    }
  },
  {
    "id": "UI_FT_INVEST",
    "capabilityId": "CAP_FT_INVEST",
    "componentType": "DASHBOARD",
    "route": "/fintech/investment",
    "metadata": {
      "title": "Wealth & Investment Funds",
      "category": "Financial Operations"
    }
  },
  {
    "id": "UI_FT_CUSTODY",
    "capabilityId": "CAP_FT_CUSTODY",
    "componentType": "DASHBOARD",
    "route": "/fintech/custody",
    "metadata": {
      "title": "Securities Custody & Depository",
      "category": "Financial Operations"
    }
  },
  {
    "id": "UI_FT_INSURE",
    "capabilityId": "CAP_FT_INSURE",
    "componentType": "DASHBOARD",
    "route": "/fintech/insurance",
    "metadata": {
      "title": "Insurtech & Micro-Insurance",
      "category": "Financial Operations"
    }
  },
  {
    "id": "UI_FT_STABLECOIN",
    "capabilityId": "CAP_FT_STABLECOIN",
    "componentType": "DASHBOARD",
    "route": "/fintech/stablecoin",
    "metadata": {
      "title": "Stablecoin & Digital Asset Rails",
      "category": "Financial Operations"
    }
  },
  {
    "id": "UI_FT_GLOBALACC",
    "capabilityId": "CAP_FT_GLOBALACC",
    "componentType": "DASHBOARD",
    "route": "/fintech/global-accounts",
    "metadata": {
      "title": "Multi-Currency Global Accounts",
      "category": "Financial Operations"
    }
  },
  {
    "id": "UI_FT_MULTICURR",
    "capabilityId": "CAP_FT_MULTICURR",
    "componentType": "DASHBOARD",
    "route": "/fintech/multi-currency",
    "metadata": {
      "title": "Multi-Currency Clearing",
      "category": "Financial Operations"
    }
  },
  {
    "id": "UI_FT_DEV_API",
    "capabilityId": "CAP_FT_DEV_API",
    "componentType": "DASHBOARD",
    "route": "/fintech/dev-api",
    "metadata": {
      "title": "Developer API Gateway",
      "category": "Financial Operations"
    }
  },
  {
    "id": "UI_FT_BANK_PAY",
    "capabilityId": "CAP_FT_BANK_PAY",
    "componentType": "DASHBOARD",
    "route": "/fintech/bank-payments",
    "metadata": {
      "title": "Commercial Bank Payments",
      "category": "Financial Operations"
    }
  },
  {
    "id": "UI_FT_BILL_PAY",
    "capabilityId": "CAP_FT_BILL_PAY",
    "componentType": "DASHBOARD",
    "route": "/fintech/bill-payments",
    "metadata": {
      "title": "Utility Bill Aggregator",
      "category": "Financial Operations"
    }
  },
  {
    "id": "UI_FT_MERCH_SERV",
    "capabilityId": "CAP_FT_MERCH_SERV",
    "componentType": "DASHBOARD",
    "route": "/fintech/merchant-services",
    "metadata": {
      "title": "Merchant Solutions Hub",
      "category": "Financial Operations"
    }
  }
],
  runtimeComponentsCount: 38,
  runtimeComponents: [
  {
    "id": "RTC_FT_CFO",
    "capabilityId": "CAP_FT_CFO",
    "componentPath": "src/products/fintech/FintechShell.tsx",
    "loaded": true
  },
  {
    "id": "RTC_FT_LEDGER",
    "capabilityId": "CAP_FT_LEDGER",
    "componentPath": "src/products/fintech/FintechShell.tsx",
    "loaded": true
  },
  {
    "id": "RTC_FT_TAX",
    "capabilityId": "CAP_FT_TAX",
    "componentPath": "src/products/fintech/FintechShell.tsx",
    "loaded": true
  },
  {
    "id": "RTC_FT_COMPLIANCE",
    "capabilityId": "CAP_FT_COMPLIANCE",
    "componentPath": "src/products/fintech/FintechShell.tsx",
    "loaded": true
  },
  {
    "id": "RTC_FT_DATA_INT",
    "capabilityId": "CAP_FT_DATA_INT",
    "componentPath": "src/products/fintech/FintechShell.tsx",
    "loaded": true
  },
  {
    "id": "RTC_FT_PAYROLL",
    "capabilityId": "CAP_FT_PAYROLL",
    "componentPath": "src/products/fintech/FintechShell.tsx",
    "loaded": true
  },
  {
    "id": "RTC_FT_SWITCH",
    "capabilityId": "CAP_FT_SWITCH",
    "componentPath": "src/products/fintech/FintechShell.tsx",
    "loaded": true
  },
  {
    "id": "RTC_FT_MOMO",
    "capabilityId": "CAP_FT_MOMO",
    "componentPath": "src/products/fintech/FintechShell.tsx",
    "loaded": true
  },
  {
    "id": "RTC_FT_GATEWAY",
    "capabilityId": "CAP_FT_GATEWAY",
    "componentPath": "src/products/fintech/FintechShell.tsx",
    "loaded": true
  },
  {
    "id": "RTC_FT_COLLECTIONS",
    "capabilityId": "CAP_FT_COLLECTIONS",
    "componentPath": "src/products/fintech/FintechShell.tsx",
    "loaded": true
  },
  {
    "id": "RTC_FT_PAYOUTS",
    "capabilityId": "CAP_FT_PAYOUTS",
    "componentPath": "src/products/fintech/FintechShell.tsx",
    "loaded": true
  },
  {
    "id": "RTC_FT_REMIT",
    "capabilityId": "CAP_FT_REMIT",
    "componentPath": "src/products/fintech/FintechShell.tsx",
    "loaded": true
  },
  {
    "id": "RTC_FT_AGENT",
    "capabilityId": "CAP_FT_AGENT",
    "componentPath": "src/products/fintech/FintechShell.tsx",
    "loaded": true
  },
  {
    "id": "RTC_FT_MERCHANT",
    "capabilityId": "CAP_FT_MERCHANT",
    "componentPath": "src/products/fintech/FintechShell.tsx",
    "loaded": true
  },
  {
    "id": "RTC_FT_CARDS",
    "capabilityId": "CAP_FT_CARDS",
    "componentPath": "src/products/fintech/FintechShell.tsx",
    "loaded": true
  },
  {
    "id": "RTC_FT_ATM",
    "capabilityId": "CAP_FT_ATM",
    "componentPath": "src/products/fintech/FintechShell.tsx",
    "loaded": true
  },
  {
    "id": "RTC_FT_WALLETS",
    "capabilityId": "CAP_FT_WALLETS",
    "componentPath": "src/products/fintech/FintechShell.tsx",
    "loaded": true
  },
  {
    "id": "RTC_FT_DIGIBANK",
    "capabilityId": "CAP_FT_DIGIBANK",
    "componentPath": "src/products/fintech/FintechShell.tsx",
    "loaded": true
  },
  {
    "id": "RTC_FT_EMBEDDED",
    "capabilityId": "CAP_FT_EMBEDDED",
    "componentPath": "src/products/fintech/FintechShell.tsx",
    "loaded": true
  },
  {
    "id": "RTC_FT_SACCO",
    "capabilityId": "CAP_FT_SACCO",
    "componentPath": "src/products/fintech/FintechShell.tsx",
    "loaded": true
  },
  {
    "id": "RTC_FT_MICRO",
    "capabilityId": "CAP_FT_MICRO",
    "componentPath": "src/products/fintech/FintechShell.tsx",
    "loaded": true
  },
  {
    "id": "RTC_FT_SAVINGS",
    "capabilityId": "CAP_FT_SAVINGS",
    "componentPath": "src/products/fintech/FintechShell.tsx",
    "loaded": true
  },
  {
    "id": "RTC_FT_LENDING",
    "capabilityId": "CAP_FT_LENDING",
    "componentPath": "src/products/fintech/FintechShell.tsx",
    "loaded": true
  },
  {
    "id": "RTC_FT_AGRI",
    "capabilityId": "CAP_FT_AGRI",
    "componentPath": "src/products/fintech/FintechShell.tsx",
    "loaded": true
  },
  {
    "id": "RTC_FT_TRADE",
    "capabilityId": "CAP_FT_TRADE",
    "componentPath": "src/products/fintech/FintechShell.tsx",
    "loaded": true
  },
  {
    "id": "RTC_FT_TREASURY",
    "capabilityId": "CAP_FT_TREASURY",
    "componentPath": "src/products/fintech/FintechShell.tsx",
    "loaded": true
  },
  {
    "id": "RTC_FT_FX",
    "capabilityId": "CAP_FT_FX",
    "componentPath": "src/products/fintech/FintechShell.tsx",
    "loaded": true
  },
  {
    "id": "RTC_FT_CAPMARKETS",
    "capabilityId": "CAP_FT_CAPMARKETS",
    "componentPath": "src/products/fintech/FintechShell.tsx",
    "loaded": true
  },
  {
    "id": "RTC_FT_INVEST",
    "capabilityId": "CAP_FT_INVEST",
    "componentPath": "src/products/fintech/FintechShell.tsx",
    "loaded": true
  },
  {
    "id": "RTC_FT_CUSTODY",
    "capabilityId": "CAP_FT_CUSTODY",
    "componentPath": "src/products/fintech/FintechShell.tsx",
    "loaded": true
  },
  {
    "id": "RTC_FT_INSURE",
    "capabilityId": "CAP_FT_INSURE",
    "componentPath": "src/products/fintech/FintechShell.tsx",
    "loaded": true
  },
  {
    "id": "RTC_FT_STABLECOIN",
    "capabilityId": "CAP_FT_STABLECOIN",
    "componentPath": "src/products/fintech/FintechShell.tsx",
    "loaded": true
  },
  {
    "id": "RTC_FT_GLOBALACC",
    "capabilityId": "CAP_FT_GLOBALACC",
    "componentPath": "src/products/fintech/FintechShell.tsx",
    "loaded": true
  },
  {
    "id": "RTC_FT_MULTICURR",
    "capabilityId": "CAP_FT_MULTICURR",
    "componentPath": "src/products/fintech/FintechShell.tsx",
    "loaded": true
  },
  {
    "id": "RTC_FT_DEV_API",
    "capabilityId": "CAP_FT_DEV_API",
    "componentPath": "src/products/fintech/FintechShell.tsx",
    "loaded": true
  },
  {
    "id": "RTC_FT_BANK_PAY",
    "capabilityId": "CAP_FT_BANK_PAY",
    "componentPath": "src/products/fintech/FintechShell.tsx",
    "loaded": true
  },
  {
    "id": "RTC_FT_BILL_PAY",
    "capabilityId": "CAP_FT_BILL_PAY",
    "componentPath": "src/products/fintech/FintechShell.tsx",
    "loaded": true
  },
  {
    "id": "RTC_FT_MERCH_SERV",
    "capabilityId": "CAP_FT_MERCH_SERV",
    "componentPath": "src/products/fintech/FintechShell.tsx",
    "loaded": true
  }
],
  services: [
  "JumoFinanceService",
  "WalletService",
  "DoubleEntryService",
  "FxService",
  "MerchantService",
  "LoanOriginationService",
  "AgentFloatService"
],
  workflows: [
  "KYCOnboardingWorkflow",
  "PaymentProcessingWorkflow",
  "SettlementReconciliationWorkflow"
],
  agents: [
  "FintechModuleAgentRegistry",
  "FintechCapabilityRegistry",
  "WorkforceOrchestrator"
],
  reports: [
  "BalanceSheetReport",
  "ProfitLossStatement",
  "TrialBalanceReport",
  "ComplianceAuditTrail",
  "CashBookLedger"
],
  dashboards: [
  "FintechExecutiveDashboard",
  "FaapControllerWorkspace",
  "DigitalWalletWorkspace",
  "MerchantServicesWorkspace"
],
  authenticationBoundaries: [
  "FINTECH_RING_1_SECURITY",
  "ZERO_TRUST_FINANCIAL_SESSION",
  "ROLE_BASED_OFFICE_WALL"
],
  permissions: [
  "ROLE_CFO",
  "ROLE_CONTROLLER",
  "ROLE_ACCOUNTANT",
  "ROLE_SWITCH_OPERATOR",
  "ROLE_TREASURER",
  "ROLE_LOAN_OFFICER"
],
  dependencies: [
  "JUMO-PLATFORM-KERNEL",
  "FAAP-CORE-ENGINE"
],
  benchmarkReferences: [
  "FintechBenchmarkRegistry",
  "DoubleEntryParity-v1.4",
  "SovereignPaymentsStandard-v2"
],
  recoveryEvidence: "Discovered 38 distinct modular subdirectories with manifest.ts files, specialized services, and active portals.",
  implementationStatus: "RECONCILED"
} as const);

export default JUMO_FINTECH_MANIFEST;
