import { createRegistryCollection, RegistryCollection, safeFind, safeFilter } from './UniversalRegistryContract';

export interface AuthoritativeRuntimeComponent {
  runtimeComponentId: string;
  uiMetadataId: string;
  capabilityId: string;
  productId: string;
  moduleId: string;
  componentName: string;
  importPath: string;
  exportName: string;
  renderMode: "HYBRID_METADATA_DRIVEN" | "SPECIALIZED_PORTAL" | "SHELL";
  props: Record<string, any>;
  status: "LOADABLE" | "MOUNTED" | "DEFERRED";
}

const RAW_RUNTIME_COMPONENTS: AuthoritativeRuntimeComponent[] = [
  {
    "runtimeComponentId": "RTC_CAP_FT_AGENT_BANKING",
    "uiMetadataId": "UIM_CAP_FT_AGENT_BANKING",
    "capabilityId": "CAP_FT_AGENT_BANKING",
    "productId": "JUMO-FINTECH",
    "moduleId": "MOD_FT_AGENT_BANKING",
    "componentName": "AgentBankingAutonomousEngineRuntime",
    "importPath": "src/core/enterprise/components/UniversalModuleWorkspace",
    "exportName": "UniversalModuleWorkspace",
    "renderMode": "HYBRID_METADATA_DRIVEN",
    "props": {
      "moduleId": "MOD_FT_AGENT_BANKING",
      "capabilityId": "CAP_FT_AGENT_BANKING",
      "productId": "JUMO-FINTECH"
    },
    "status": "LOADABLE"
  },
  {
    "runtimeComponentId": "RTC_CAP_FT_AGRICULTURAL_FINANCE",
    "uiMetadataId": "UIM_CAP_FT_AGRICULTURAL_FINANCE",
    "capabilityId": "CAP_FT_AGRICULTURAL_FINANCE",
    "productId": "JUMO-FINTECH",
    "moduleId": "MOD_FT_AGRICULTURAL_FINANCE",
    "componentName": "AgriculturalFinanceAutonomousEngineRuntime",
    "importPath": "src/core/enterprise/components/UniversalModuleWorkspace",
    "exportName": "UniversalModuleWorkspace",
    "renderMode": "HYBRID_METADATA_DRIVEN",
    "props": {
      "moduleId": "MOD_FT_AGRICULTURAL_FINANCE",
      "capabilityId": "CAP_FT_AGRICULTURAL_FINANCE",
      "productId": "JUMO-FINTECH"
    },
    "status": "LOADABLE"
  },
  {
    "runtimeComponentId": "RTC_CAP_FT_ATM_SELF_SERVICE",
    "uiMetadataId": "UIM_CAP_FT_ATM_SELF_SERVICE",
    "capabilityId": "CAP_FT_ATM_SELF_SERVICE",
    "productId": "JUMO-FINTECH",
    "moduleId": "MOD_FT_ATM_SELF_SERVICE",
    "componentName": "AtmSelfServiceAutonomousEngineRuntime",
    "importPath": "src/core/enterprise/components/UniversalModuleWorkspace",
    "exportName": "UniversalModuleWorkspace",
    "renderMode": "HYBRID_METADATA_DRIVEN",
    "props": {
      "moduleId": "MOD_FT_ATM_SELF_SERVICE",
      "capabilityId": "CAP_FT_ATM_SELF_SERVICE",
      "productId": "JUMO-FINTECH"
    },
    "status": "LOADABLE"
  },
  {
    "runtimeComponentId": "RTC_CAP_FT_BANK_PAYMENTS",
    "uiMetadataId": "UIM_CAP_FT_BANK_PAYMENTS",
    "capabilityId": "CAP_FT_BANK_PAYMENTS",
    "productId": "JUMO-FINTECH",
    "moduleId": "MOD_FT_BANK_PAYMENTS",
    "componentName": "BankPaymentsAutonomousEngineRuntime",
    "importPath": "src/core/enterprise/components/UniversalModuleWorkspace",
    "exportName": "UniversalModuleWorkspace",
    "renderMode": "HYBRID_METADATA_DRIVEN",
    "props": {
      "moduleId": "MOD_FT_BANK_PAYMENTS",
      "capabilityId": "CAP_FT_BANK_PAYMENTS",
      "productId": "JUMO-FINTECH"
    },
    "status": "LOADABLE"
  },
  {
    "runtimeComponentId": "RTC_CAP_FT_BILL_PAYMENTS",
    "uiMetadataId": "UIM_CAP_FT_BILL_PAYMENTS",
    "capabilityId": "CAP_FT_BILL_PAYMENTS",
    "productId": "JUMO-FINTECH",
    "moduleId": "MOD_FT_BILL_PAYMENTS",
    "componentName": "BillPaymentsAutonomousEngineRuntime",
    "importPath": "src/core/enterprise/components/UniversalModuleWorkspace",
    "exportName": "UniversalModuleWorkspace",
    "renderMode": "HYBRID_METADATA_DRIVEN",
    "props": {
      "moduleId": "MOD_FT_BILL_PAYMENTS",
      "capabilityId": "CAP_FT_BILL_PAYMENTS",
      "productId": "JUMO-FINTECH"
    },
    "status": "LOADABLE"
  },
  {
    "runtimeComponentId": "RTC_CAP_FT_CAPITAL_MARKETS",
    "uiMetadataId": "UIM_CAP_FT_CAPITAL_MARKETS",
    "capabilityId": "CAP_FT_CAPITAL_MARKETS",
    "productId": "JUMO-FINTECH",
    "moduleId": "MOD_FT_CAPITAL_MARKETS",
    "componentName": "CapitalMarketsAutonomousEngineRuntime",
    "importPath": "src/core/enterprise/components/UniversalModuleWorkspace",
    "exportName": "UniversalModuleWorkspace",
    "renderMode": "HYBRID_METADATA_DRIVEN",
    "props": {
      "moduleId": "MOD_FT_CAPITAL_MARKETS",
      "capabilityId": "CAP_FT_CAPITAL_MARKETS",
      "productId": "JUMO-FINTECH"
    },
    "status": "LOADABLE"
  },
  {
    "runtimeComponentId": "RTC_CAP_FT_CARDS",
    "uiMetadataId": "UIM_CAP_FT_CARDS",
    "capabilityId": "CAP_FT_CARDS",
    "productId": "JUMO-FINTECH",
    "moduleId": "MOD_FT_CARDS",
    "componentName": "CardsAutonomousEngineRuntime",
    "importPath": "src/core/enterprise/components/UniversalModuleWorkspace",
    "exportName": "UniversalModuleWorkspace",
    "renderMode": "HYBRID_METADATA_DRIVEN",
    "props": {
      "moduleId": "MOD_FT_CARDS",
      "capabilityId": "CAP_FT_CARDS",
      "productId": "JUMO-FINTECH"
    },
    "status": "LOADABLE"
  },
  {
    "runtimeComponentId": "RTC_CAP_FT_COLLECTIONS",
    "uiMetadataId": "UIM_CAP_FT_COLLECTIONS",
    "capabilityId": "CAP_FT_COLLECTIONS",
    "productId": "JUMO-FINTECH",
    "moduleId": "MOD_FT_COLLECTIONS",
    "componentName": "CollectionsAutonomousEngineRuntime",
    "importPath": "src/core/enterprise/components/UniversalModuleWorkspace",
    "exportName": "UniversalModuleWorkspace",
    "renderMode": "HYBRID_METADATA_DRIVEN",
    "props": {
      "moduleId": "MOD_FT_COLLECTIONS",
      "capabilityId": "CAP_FT_COLLECTIONS",
      "productId": "JUMO-FINTECH"
    },
    "status": "LOADABLE"
  },
  {
    "runtimeComponentId": "RTC_CAP_FT_COMPLIANCE",
    "uiMetadataId": "UIM_CAP_FT_COMPLIANCE",
    "capabilityId": "CAP_FT_COMPLIANCE",
    "productId": "JUMO-FINTECH",
    "moduleId": "MOD_FT_COMPLIANCE",
    "componentName": "ComplianceAutonomousEngineRuntime",
    "importPath": "src/core/enterprise/components/UniversalModuleWorkspace",
    "exportName": "UniversalModuleWorkspace",
    "renderMode": "HYBRID_METADATA_DRIVEN",
    "props": {
      "moduleId": "MOD_FT_COMPLIANCE",
      "capabilityId": "CAP_FT_COMPLIANCE",
      "productId": "JUMO-FINTECH"
    },
    "status": "LOADABLE"
  },
  {
    "runtimeComponentId": "RTC_CAP_FT_CROSS_BORDER",
    "uiMetadataId": "UIM_CAP_FT_CROSS_BORDER",
    "capabilityId": "CAP_FT_CROSS_BORDER",
    "productId": "JUMO-FINTECH",
    "moduleId": "MOD_FT_CROSS_BORDER",
    "componentName": "CrossBorderAutonomousEngineRuntime",
    "importPath": "src/core/enterprise/components/UniversalModuleWorkspace",
    "exportName": "UniversalModuleWorkspace",
    "renderMode": "HYBRID_METADATA_DRIVEN",
    "props": {
      "moduleId": "MOD_FT_CROSS_BORDER",
      "capabilityId": "CAP_FT_CROSS_BORDER",
      "productId": "JUMO-FINTECH"
    },
    "status": "LOADABLE"
  },
  {
    "runtimeComponentId": "RTC_CAP_FT_DATA_INTELLIGENCE",
    "uiMetadataId": "UIM_CAP_FT_DATA_INTELLIGENCE",
    "capabilityId": "CAP_FT_DATA_INTELLIGENCE",
    "productId": "JUMO-FINTECH",
    "moduleId": "MOD_FT_DATA_INTELLIGENCE",
    "componentName": "DataIntelligenceAutonomousEngineRuntime",
    "importPath": "src/core/enterprise/components/UniversalModuleWorkspace",
    "exportName": "UniversalModuleWorkspace",
    "renderMode": "HYBRID_METADATA_DRIVEN",
    "props": {
      "moduleId": "MOD_FT_DATA_INTELLIGENCE",
      "capabilityId": "CAP_FT_DATA_INTELLIGENCE",
      "productId": "JUMO-FINTECH"
    },
    "status": "LOADABLE"
  },
  {
    "runtimeComponentId": "RTC_CAP_FT_DEVELOPER_API",
    "uiMetadataId": "UIM_CAP_FT_DEVELOPER_API",
    "capabilityId": "CAP_FT_DEVELOPER_API",
    "productId": "JUMO-FINTECH",
    "moduleId": "MOD_FT_DEVELOPER_API",
    "componentName": "DeveloperApiAutonomousEngineRuntime",
    "importPath": "src/core/enterprise/components/UniversalModuleWorkspace",
    "exportName": "UniversalModuleWorkspace",
    "renderMode": "HYBRID_METADATA_DRIVEN",
    "props": {
      "moduleId": "MOD_FT_DEVELOPER_API",
      "capabilityId": "CAP_FT_DEVELOPER_API",
      "productId": "JUMO-FINTECH"
    },
    "status": "LOADABLE"
  },
  {
    "runtimeComponentId": "RTC_CAP_FT_DIGITAL_BANKING",
    "uiMetadataId": "UIM_CAP_FT_DIGITAL_BANKING",
    "capabilityId": "CAP_FT_DIGITAL_BANKING",
    "productId": "JUMO-FINTECH",
    "moduleId": "MOD_FT_DIGITAL_BANKING",
    "componentName": "DigitalBankingAutonomousEngineRuntime",
    "importPath": "src/core/enterprise/components/UniversalModuleWorkspace",
    "exportName": "UniversalModuleWorkspace",
    "renderMode": "HYBRID_METADATA_DRIVEN",
    "props": {
      "moduleId": "MOD_FT_DIGITAL_BANKING",
      "capabilityId": "CAP_FT_DIGITAL_BANKING",
      "productId": "JUMO-FINTECH"
    },
    "status": "LOADABLE"
  },
  {
    "runtimeComponentId": "RTC_CAP_FT_DIGITAL_WALLETS",
    "uiMetadataId": "UIM_CAP_FT_DIGITAL_WALLETS",
    "capabilityId": "CAP_FT_DIGITAL_WALLETS",
    "productId": "JUMO-FINTECH",
    "moduleId": "MOD_FT_DIGITAL_WALLETS",
    "componentName": "DigitalWalletsAutonomousEngineRuntime",
    "importPath": "src/core/enterprise/components/UniversalModuleWorkspace",
    "exportName": "UniversalModuleWorkspace",
    "renderMode": "HYBRID_METADATA_DRIVEN",
    "props": {
      "moduleId": "MOD_FT_DIGITAL_WALLETS",
      "capabilityId": "CAP_FT_DIGITAL_WALLETS",
      "productId": "JUMO-FINTECH"
    },
    "status": "LOADABLE"
  },
  {
    "runtimeComponentId": "RTC_CAP_FT_EMBEDDED_FINANCE",
    "uiMetadataId": "UIM_CAP_FT_EMBEDDED_FINANCE",
    "capabilityId": "CAP_FT_EMBEDDED_FINANCE",
    "productId": "JUMO-FINTECH",
    "moduleId": "MOD_FT_EMBEDDED_FINANCE",
    "componentName": "EmbeddedFinanceAutonomousEngineRuntime",
    "importPath": "src/core/enterprise/components/UniversalModuleWorkspace",
    "exportName": "UniversalModuleWorkspace",
    "renderMode": "HYBRID_METADATA_DRIVEN",
    "props": {
      "moduleId": "MOD_FT_EMBEDDED_FINANCE",
      "capabilityId": "CAP_FT_EMBEDDED_FINANCE",
      "productId": "JUMO-FINTECH"
    },
    "status": "LOADABLE"
  },
  {
    "runtimeComponentId": "RTC_CAP_FT_FINANCIAL_ACCOUNTING",
    "uiMetadataId": "UIM_CAP_FT_FINANCIAL_ACCOUNTING",
    "capabilityId": "CAP_FT_FINANCIAL_ACCOUNTING",
    "productId": "JUMO-FINTECH",
    "moduleId": "MOD_FT_FINANCIAL_ACCOUNTING",
    "componentName": "FinancialAccountingAutonomousEngineRuntime",
    "importPath": "src/core/enterprise/components/UniversalModuleWorkspace",
    "exportName": "UniversalModuleWorkspace",
    "renderMode": "HYBRID_METADATA_DRIVEN",
    "props": {
      "moduleId": "MOD_FT_FINANCIAL_ACCOUNTING",
      "capabilityId": "CAP_FT_FINANCIAL_ACCOUNTING",
      "productId": "JUMO-FINTECH"
    },
    "status": "LOADABLE"
  },
  {
    "runtimeComponentId": "RTC_CAP_FT_FX",
    "uiMetadataId": "UIM_CAP_FT_FX",
    "capabilityId": "CAP_FT_FX",
    "productId": "JUMO-FINTECH",
    "moduleId": "MOD_FT_FX",
    "componentName": "FxAutonomousEngineRuntime",
    "importPath": "src/core/enterprise/components/UniversalModuleWorkspace",
    "exportName": "UniversalModuleWorkspace",
    "renderMode": "HYBRID_METADATA_DRIVEN",
    "props": {
      "moduleId": "MOD_FT_FX",
      "capabilityId": "CAP_FT_FX",
      "productId": "JUMO-FINTECH"
    },
    "status": "LOADABLE"
  },
  {
    "runtimeComponentId": "RTC_CAP_FT_GLOBAL_ACCOUNTS",
    "uiMetadataId": "UIM_CAP_FT_GLOBAL_ACCOUNTS",
    "capabilityId": "CAP_FT_GLOBAL_ACCOUNTS",
    "productId": "JUMO-FINTECH",
    "moduleId": "MOD_FT_GLOBAL_ACCOUNTS",
    "componentName": "GlobalAccountsAutonomousEngineRuntime",
    "importPath": "src/core/enterprise/components/UniversalModuleWorkspace",
    "exportName": "UniversalModuleWorkspace",
    "renderMode": "HYBRID_METADATA_DRIVEN",
    "props": {
      "moduleId": "MOD_FT_GLOBAL_ACCOUNTS",
      "capabilityId": "CAP_FT_GLOBAL_ACCOUNTS",
      "productId": "JUMO-FINTECH"
    },
    "status": "LOADABLE"
  },
  {
    "runtimeComponentId": "RTC_CAP_FT_INSURANCE",
    "uiMetadataId": "UIM_CAP_FT_INSURANCE",
    "capabilityId": "CAP_FT_INSURANCE",
    "productId": "JUMO-FINTECH",
    "moduleId": "MOD_FT_INSURANCE",
    "componentName": "InsuranceAutonomousEngineRuntime",
    "importPath": "src/core/enterprise/components/UniversalModuleWorkspace",
    "exportName": "UniversalModuleWorkspace",
    "renderMode": "HYBRID_METADATA_DRIVEN",
    "props": {
      "moduleId": "MOD_FT_INSURANCE",
      "capabilityId": "CAP_FT_INSURANCE",
      "productId": "JUMO-FINTECH"
    },
    "status": "LOADABLE"
  },
  {
    "runtimeComponentId": "RTC_CAP_FT_INVESTMENT",
    "uiMetadataId": "UIM_CAP_FT_INVESTMENT",
    "capabilityId": "CAP_FT_INVESTMENT",
    "productId": "JUMO-FINTECH",
    "moduleId": "MOD_FT_INVESTMENT",
    "componentName": "InvestmentAutonomousEngineRuntime",
    "importPath": "src/core/enterprise/components/UniversalModuleWorkspace",
    "exportName": "UniversalModuleWorkspace",
    "renderMode": "HYBRID_METADATA_DRIVEN",
    "props": {
      "moduleId": "MOD_FT_INVESTMENT",
      "capabilityId": "CAP_FT_INVESTMENT",
      "productId": "JUMO-FINTECH"
    },
    "status": "LOADABLE"
  },
  {
    "runtimeComponentId": "RTC_CAP_FT_LENDING",
    "uiMetadataId": "UIM_CAP_FT_LENDING",
    "capabilityId": "CAP_FT_LENDING",
    "productId": "JUMO-FINTECH",
    "moduleId": "MOD_FT_LENDING",
    "componentName": "LendingAutonomousEngineRuntime",
    "importPath": "src/core/enterprise/components/UniversalModuleWorkspace",
    "exportName": "UniversalModuleWorkspace",
    "renderMode": "HYBRID_METADATA_DRIVEN",
    "props": {
      "moduleId": "MOD_FT_LENDING",
      "capabilityId": "CAP_FT_LENDING",
      "productId": "JUMO-FINTECH"
    },
    "status": "LOADABLE"
  },
  {
    "runtimeComponentId": "RTC_CAP_FT_MERCHANT_ACQUIRING",
    "uiMetadataId": "UIM_CAP_FT_MERCHANT_ACQUIRING",
    "capabilityId": "CAP_FT_MERCHANT_ACQUIRING",
    "productId": "JUMO-FINTECH",
    "moduleId": "MOD_FT_MERCHANT_ACQUIRING",
    "componentName": "MerchantAcquiringAutonomousEngineRuntime",
    "importPath": "src/core/enterprise/components/UniversalModuleWorkspace",
    "exportName": "UniversalModuleWorkspace",
    "renderMode": "HYBRID_METADATA_DRIVEN",
    "props": {
      "moduleId": "MOD_FT_MERCHANT_ACQUIRING",
      "capabilityId": "CAP_FT_MERCHANT_ACQUIRING",
      "productId": "JUMO-FINTECH"
    },
    "status": "LOADABLE"
  },
  {
    "runtimeComponentId": "RTC_CAP_FT_MERCHANT_SERVICES",
    "uiMetadataId": "UIM_CAP_FT_MERCHANT_SERVICES",
    "capabilityId": "CAP_FT_MERCHANT_SERVICES",
    "productId": "JUMO-FINTECH",
    "moduleId": "MOD_FT_MERCHANT_SERVICES",
    "componentName": "MerchantServicesAutonomousEngineRuntime",
    "importPath": "src/core/enterprise/components/UniversalModuleWorkspace",
    "exportName": "UniversalModuleWorkspace",
    "renderMode": "HYBRID_METADATA_DRIVEN",
    "props": {
      "moduleId": "MOD_FT_MERCHANT_SERVICES",
      "capabilityId": "CAP_FT_MERCHANT_SERVICES",
      "productId": "JUMO-FINTECH"
    },
    "status": "LOADABLE"
  },
  {
    "runtimeComponentId": "RTC_CAP_FT_MICROFINANCE",
    "uiMetadataId": "UIM_CAP_FT_MICROFINANCE",
    "capabilityId": "CAP_FT_MICROFINANCE",
    "productId": "JUMO-FINTECH",
    "moduleId": "MOD_FT_MICROFINANCE",
    "componentName": "MicrofinanceAutonomousEngineRuntime",
    "importPath": "src/core/enterprise/components/UniversalModuleWorkspace",
    "exportName": "UniversalModuleWorkspace",
    "renderMode": "HYBRID_METADATA_DRIVEN",
    "props": {
      "moduleId": "MOD_FT_MICROFINANCE",
      "capabilityId": "CAP_FT_MICROFINANCE",
      "productId": "JUMO-FINTECH"
    },
    "status": "LOADABLE"
  },
  {
    "runtimeComponentId": "RTC_CAP_FT_MOBILE_MONEY",
    "uiMetadataId": "UIM_CAP_FT_MOBILE_MONEY",
    "capabilityId": "CAP_FT_MOBILE_MONEY",
    "productId": "JUMO-FINTECH",
    "moduleId": "MOD_FT_MOBILE_MONEY",
    "componentName": "MobileMoneyAutonomousEngineRuntime",
    "importPath": "src/core/enterprise/components/UniversalModuleWorkspace",
    "exportName": "UniversalModuleWorkspace",
    "renderMode": "HYBRID_METADATA_DRIVEN",
    "props": {
      "moduleId": "MOD_FT_MOBILE_MONEY",
      "capabilityId": "CAP_FT_MOBILE_MONEY",
      "productId": "JUMO-FINTECH"
    },
    "status": "LOADABLE"
  },
  {
    "runtimeComponentId": "RTC_CAP_FT_MULTI_CURRENCY",
    "uiMetadataId": "UIM_CAP_FT_MULTI_CURRENCY",
    "capabilityId": "CAP_FT_MULTI_CURRENCY",
    "productId": "JUMO-FINTECH",
    "moduleId": "MOD_FT_MULTI_CURRENCY",
    "componentName": "MultiCurrencyAutonomousEngineRuntime",
    "importPath": "src/core/enterprise/components/UniversalModuleWorkspace",
    "exportName": "UniversalModuleWorkspace",
    "renderMode": "HYBRID_METADATA_DRIVEN",
    "props": {
      "moduleId": "MOD_FT_MULTI_CURRENCY",
      "capabilityId": "CAP_FT_MULTI_CURRENCY",
      "productId": "JUMO-FINTECH"
    },
    "status": "LOADABLE"
  },
  {
    "runtimeComponentId": "RTC_CAP_FT_PAYMENT_GATEWAY",
    "uiMetadataId": "UIM_CAP_FT_PAYMENT_GATEWAY",
    "capabilityId": "CAP_FT_PAYMENT_GATEWAY",
    "productId": "JUMO-FINTECH",
    "moduleId": "MOD_FT_PAYMENT_GATEWAY",
    "componentName": "PaymentGatewayAutonomousEngineRuntime",
    "importPath": "src/core/enterprise/components/UniversalModuleWorkspace",
    "exportName": "UniversalModuleWorkspace",
    "renderMode": "HYBRID_METADATA_DRIVEN",
    "props": {
      "moduleId": "MOD_FT_PAYMENT_GATEWAY",
      "capabilityId": "CAP_FT_PAYMENT_GATEWAY",
      "productId": "JUMO-FINTECH"
    },
    "status": "LOADABLE"
  },
  {
    "runtimeComponentId": "RTC_CAP_FT_PAYMENT_SWITCHING",
    "uiMetadataId": "UIM_CAP_FT_PAYMENT_SWITCHING",
    "capabilityId": "CAP_FT_PAYMENT_SWITCHING",
    "productId": "JUMO-FINTECH",
    "moduleId": "MOD_FT_PAYMENT_SWITCHING",
    "componentName": "PaymentSwitchingAutonomousEngineRuntime",
    "importPath": "src/core/enterprise/components/UniversalModuleWorkspace",
    "exportName": "UniversalModuleWorkspace",
    "renderMode": "HYBRID_METADATA_DRIVEN",
    "props": {
      "moduleId": "MOD_FT_PAYMENT_SWITCHING",
      "capabilityId": "CAP_FT_PAYMENT_SWITCHING",
      "productId": "JUMO-FINTECH"
    },
    "status": "LOADABLE"
  },
  {
    "runtimeComponentId": "RTC_CAP_FT_PAYOUTS",
    "uiMetadataId": "UIM_CAP_FT_PAYOUTS",
    "capabilityId": "CAP_FT_PAYOUTS",
    "productId": "JUMO-FINTECH",
    "moduleId": "MOD_FT_PAYOUTS",
    "componentName": "PayoutsAutonomousEngineRuntime",
    "importPath": "src/core/enterprise/components/UniversalModuleWorkspace",
    "exportName": "UniversalModuleWorkspace",
    "renderMode": "HYBRID_METADATA_DRIVEN",
    "props": {
      "moduleId": "MOD_FT_PAYOUTS",
      "capabilityId": "CAP_FT_PAYOUTS",
      "productId": "JUMO-FINTECH"
    },
    "status": "LOADABLE"
  },
  {
    "runtimeComponentId": "RTC_CAP_FT_PAYROLL",
    "uiMetadataId": "UIM_CAP_FT_PAYROLL",
    "capabilityId": "CAP_FT_PAYROLL",
    "productId": "JUMO-FINTECH",
    "moduleId": "MOD_FT_PAYROLL",
    "componentName": "PayrollAutonomousEngineRuntime",
    "importPath": "src/core/enterprise/components/UniversalModuleWorkspace",
    "exportName": "UniversalModuleWorkspace",
    "renderMode": "HYBRID_METADATA_DRIVEN",
    "props": {
      "moduleId": "MOD_FT_PAYROLL",
      "capabilityId": "CAP_FT_PAYROLL",
      "productId": "JUMO-FINTECH"
    },
    "status": "LOADABLE"
  },
  {
    "runtimeComponentId": "RTC_CAP_FT_REMITTANCES",
    "uiMetadataId": "UIM_CAP_FT_REMITTANCES",
    "capabilityId": "CAP_FT_REMITTANCES",
    "productId": "JUMO-FINTECH",
    "moduleId": "MOD_FT_REMITTANCES",
    "componentName": "RemittancesAutonomousEngineRuntime",
    "importPath": "src/core/enterprise/components/UniversalModuleWorkspace",
    "exportName": "UniversalModuleWorkspace",
    "renderMode": "HYBRID_METADATA_DRIVEN",
    "props": {
      "moduleId": "MOD_FT_REMITTANCES",
      "capabilityId": "CAP_FT_REMITTANCES",
      "productId": "JUMO-FINTECH"
    },
    "status": "LOADABLE"
  },
  {
    "runtimeComponentId": "RTC_CAP_FT_SACCO",
    "uiMetadataId": "UIM_CAP_FT_SACCO",
    "capabilityId": "CAP_FT_SACCO",
    "productId": "JUMO-FINTECH",
    "moduleId": "MOD_FT_SACCO",
    "componentName": "SaccoAutonomousEngineRuntime",
    "importPath": "src/core/enterprise/components/UniversalModuleWorkspace",
    "exportName": "UniversalModuleWorkspace",
    "renderMode": "HYBRID_METADATA_DRIVEN",
    "props": {
      "moduleId": "MOD_FT_SACCO",
      "capabilityId": "CAP_FT_SACCO",
      "productId": "JUMO-FINTECH"
    },
    "status": "LOADABLE"
  },
  {
    "runtimeComponentId": "RTC_CAP_FT_SAVINGS",
    "uiMetadataId": "UIM_CAP_FT_SAVINGS",
    "capabilityId": "CAP_FT_SAVINGS",
    "productId": "JUMO-FINTECH",
    "moduleId": "MOD_FT_SAVINGS",
    "componentName": "SavingsAutonomousEngineRuntime",
    "importPath": "src/core/enterprise/components/UniversalModuleWorkspace",
    "exportName": "UniversalModuleWorkspace",
    "renderMode": "HYBRID_METADATA_DRIVEN",
    "props": {
      "moduleId": "MOD_FT_SAVINGS",
      "capabilityId": "CAP_FT_SAVINGS",
      "productId": "JUMO-FINTECH"
    },
    "status": "LOADABLE"
  },
  {
    "runtimeComponentId": "RTC_CAP_FT_SECURITIES_CUSTODY",
    "uiMetadataId": "UIM_CAP_FT_SECURITIES_CUSTODY",
    "capabilityId": "CAP_FT_SECURITIES_CUSTODY",
    "productId": "JUMO-FINTECH",
    "moduleId": "MOD_FT_SECURITIES_CUSTODY",
    "componentName": "SecuritiesCustodyAutonomousEngineRuntime",
    "importPath": "src/core/enterprise/components/UniversalModuleWorkspace",
    "exportName": "UniversalModuleWorkspace",
    "renderMode": "HYBRID_METADATA_DRIVEN",
    "props": {
      "moduleId": "MOD_FT_SECURITIES_CUSTODY",
      "capabilityId": "CAP_FT_SECURITIES_CUSTODY",
      "productId": "JUMO-FINTECH"
    },
    "status": "LOADABLE"
  },
  {
    "runtimeComponentId": "RTC_CAP_FT_STABLECOIN",
    "uiMetadataId": "UIM_CAP_FT_STABLECOIN",
    "capabilityId": "CAP_FT_STABLECOIN",
    "productId": "JUMO-FINTECH",
    "moduleId": "MOD_FT_STABLECOIN",
    "componentName": "StablecoinAutonomousEngineRuntime",
    "importPath": "src/core/enterprise/components/UniversalModuleWorkspace",
    "exportName": "UniversalModuleWorkspace",
    "renderMode": "HYBRID_METADATA_DRIVEN",
    "props": {
      "moduleId": "MOD_FT_STABLECOIN",
      "capabilityId": "CAP_FT_STABLECOIN",
      "productId": "JUMO-FINTECH"
    },
    "status": "LOADABLE"
  },
  {
    "runtimeComponentId": "RTC_CAP_FT_TAX_REVENUE",
    "uiMetadataId": "UIM_CAP_FT_TAX_REVENUE",
    "capabilityId": "CAP_FT_TAX_REVENUE",
    "productId": "JUMO-FINTECH",
    "moduleId": "MOD_FT_TAX_REVENUE",
    "componentName": "TaxRevenueAutonomousEngineRuntime",
    "importPath": "src/core/enterprise/components/UniversalModuleWorkspace",
    "exportName": "UniversalModuleWorkspace",
    "renderMode": "HYBRID_METADATA_DRIVEN",
    "props": {
      "moduleId": "MOD_FT_TAX_REVENUE",
      "capabilityId": "CAP_FT_TAX_REVENUE",
      "productId": "JUMO-FINTECH"
    },
    "status": "LOADABLE"
  },
  {
    "runtimeComponentId": "RTC_CAP_FT_TRADE_FINANCE",
    "uiMetadataId": "UIM_CAP_FT_TRADE_FINANCE",
    "capabilityId": "CAP_FT_TRADE_FINANCE",
    "productId": "JUMO-FINTECH",
    "moduleId": "MOD_FT_TRADE_FINANCE",
    "componentName": "TradeFinanceAutonomousEngineRuntime",
    "importPath": "src/core/enterprise/components/UniversalModuleWorkspace",
    "exportName": "UniversalModuleWorkspace",
    "renderMode": "HYBRID_METADATA_DRIVEN",
    "props": {
      "moduleId": "MOD_FT_TRADE_FINANCE",
      "capabilityId": "CAP_FT_TRADE_FINANCE",
      "productId": "JUMO-FINTECH"
    },
    "status": "LOADABLE"
  },
  {
    "runtimeComponentId": "RTC_CAP_FT_TREASURY",
    "uiMetadataId": "UIM_CAP_FT_TREASURY",
    "capabilityId": "CAP_FT_TREASURY",
    "productId": "JUMO-FINTECH",
    "moduleId": "MOD_FT_TREASURY",
    "componentName": "TreasuryAutonomousEngineRuntime",
    "importPath": "src/core/enterprise/components/UniversalModuleWorkspace",
    "exportName": "UniversalModuleWorkspace",
    "renderMode": "HYBRID_METADATA_DRIVEN",
    "props": {
      "moduleId": "MOD_FT_TREASURY",
      "capabilityId": "CAP_FT_TREASURY",
      "productId": "JUMO-FINTECH"
    },
    "status": "LOADABLE"
  },
  {
    "runtimeComponentId": "RTC_CAP_NP_ECD_MILESTONES",
    "uiMetadataId": "UIM_CAP_NP_ECD_MILESTONES",
    "capabilityId": "CAP_NP_ECD_MILESTONES",
    "productId": "JUMO-NURSERY-PRIMARY-ERP",
    "moduleId": "MOD_NP_ECD_MILESTONES",
    "componentName": "EarlyChildhoodDevelopmentMilestonesEngineRuntime",
    "importPath": "src/core/enterprise/components/UniversalModuleWorkspace",
    "exportName": "UniversalModuleWorkspace",
    "renderMode": "HYBRID_METADATA_DRIVEN",
    "props": {
      "moduleId": "MOD_NP_ECD_MILESTONES",
      "capabilityId": "CAP_NP_ECD_MILESTONES",
      "productId": "JUMO-NURSERY-PRIMARY-ERP"
    },
    "status": "LOADABLE"
  },
  {
    "runtimeComponentId": "RTC_CAP_NP_PRIMARY_ACADEMICS",
    "uiMetadataId": "UIM_CAP_NP_PRIMARY_ACADEMICS",
    "capabilityId": "CAP_NP_PRIMARY_ACADEMICS",
    "productId": "JUMO-NURSERY-PRIMARY-ERP",
    "moduleId": "MOD_NP_PRIMARY_ACADEMICS",
    "componentName": "PrimaryCurriculumAssessmentEngineRuntime",
    "importPath": "src/core/enterprise/components/UniversalModuleWorkspace",
    "exportName": "UniversalModuleWorkspace",
    "renderMode": "HYBRID_METADATA_DRIVEN",
    "props": {
      "moduleId": "MOD_NP_PRIMARY_ACADEMICS",
      "capabilityId": "CAP_NP_PRIMARY_ACADEMICS",
      "productId": "JUMO-NURSERY-PRIMARY-ERP"
    },
    "status": "LOADABLE"
  },
  {
    "runtimeComponentId": "RTC_CAP_NP_PRIMARY_DOS",
    "uiMetadataId": "UIM_CAP_NP_PRIMARY_DOS",
    "capabilityId": "CAP_NP_PRIMARY_DOS",
    "productId": "JUMO-NURSERY-PRIMARY-ERP",
    "moduleId": "MOD_NP_PRIMARY_DOS",
    "componentName": "PrimaryStudiesTimetablingEngineRuntime",
    "importPath": "src/core/enterprise/components/UniversalModuleWorkspace",
    "exportName": "UniversalModuleWorkspace",
    "renderMode": "HYBRID_METADATA_DRIVEN",
    "props": {
      "moduleId": "MOD_NP_PRIMARY_DOS",
      "capabilityId": "CAP_NP_PRIMARY_DOS",
      "productId": "JUMO-NURSERY-PRIMARY-ERP"
    },
    "status": "LOADABLE"
  },
  {
    "runtimeComponentId": "RTC_CAP_NP_ADMISSIONS",
    "uiMetadataId": "UIM_CAP_NP_ADMISSIONS",
    "capabilityId": "CAP_NP_ADMISSIONS",
    "productId": "JUMO-NURSERY-PRIMARY-ERP",
    "moduleId": "MOD_NP_ADMISSIONS",
    "componentName": "ConsolidatedStudentAdmissionsEngineRuntime",
    "importPath": "src/core/enterprise/components/UniversalModuleWorkspace",
    "exportName": "UniversalModuleWorkspace",
    "renderMode": "HYBRID_METADATA_DRIVEN",
    "props": {
      "moduleId": "MOD_NP_ADMISSIONS",
      "capabilityId": "CAP_NP_ADMISSIONS",
      "productId": "JUMO-NURSERY-PRIMARY-ERP"
    },
    "status": "LOADABLE"
  },
  {
    "runtimeComponentId": "RTC_CAP_NP_BURSARY",
    "uiMetadataId": "UIM_CAP_NP_BURSARY",
    "capabilityId": "CAP_NP_BURSARY",
    "productId": "JUMO-NURSERY-PRIMARY-ERP",
    "moduleId": "MOD_NP_BURSARY",
    "componentName": "FeeInvoicingBursarLedgerEngineRuntime",
    "importPath": "src/core/enterprise/components/UniversalModuleWorkspace",
    "exportName": "UniversalModuleWorkspace",
    "renderMode": "HYBRID_METADATA_DRIVEN",
    "props": {
      "moduleId": "MOD_NP_BURSARY",
      "capabilityId": "CAP_NP_BURSARY",
      "productId": "JUMO-NURSERY-PRIMARY-ERP"
    },
    "status": "LOADABLE"
  },
  {
    "runtimeComponentId": "RTC_CAP_NP_SAFEGUARDING",
    "uiMetadataId": "UIM_CAP_NP_SAFEGUARDING",
    "capabilityId": "CAP_NP_SAFEGUARDING",
    "productId": "JUMO-NURSERY-PRIMARY-ERP",
    "moduleId": "MOD_NP_SAFEGUARDING",
    "componentName": "ChildProtectionSafeguardingEngineRuntime",
    "importPath": "src/core/enterprise/components/UniversalModuleWorkspace",
    "exportName": "UniversalModuleWorkspace",
    "renderMode": "HYBRID_METADATA_DRIVEN",
    "props": {
      "moduleId": "MOD_NP_SAFEGUARDING",
      "capabilityId": "CAP_NP_SAFEGUARDING",
      "productId": "JUMO-NURSERY-PRIMARY-ERP"
    },
    "status": "LOADABLE"
  },
  {
    "runtimeComponentId": "RTC_CAP_NP_CLINIC",
    "uiMetadataId": "UIM_CAP_NP_CLINIC",
    "capabilityId": "CAP_NP_CLINIC",
    "productId": "JUMO-NURSERY-PRIMARY-ERP",
    "moduleId": "MOD_NP_CLINIC",
    "componentName": "InfirmaryPediatricHealthEngineRuntime",
    "importPath": "src/core/enterprise/components/UniversalModuleWorkspace",
    "exportName": "UniversalModuleWorkspace",
    "renderMode": "HYBRID_METADATA_DRIVEN",
    "props": {
      "moduleId": "MOD_NP_CLINIC",
      "capabilityId": "CAP_NP_CLINIC",
      "productId": "JUMO-NURSERY-PRIMARY-ERP"
    },
    "status": "LOADABLE"
  },
  {
    "runtimeComponentId": "RTC_CAP_NP_CATERING",
    "uiMetadataId": "UIM_CAP_NP_CATERING",
    "capabilityId": "CAP_NP_CATERING",
    "productId": "JUMO-NURSERY-PRIMARY-ERP",
    "moduleId": "MOD_NP_CATERING",
    "componentName": "NutritionSchoolDiningEngineRuntime",
    "importPath": "src/core/enterprise/components/UniversalModuleWorkspace",
    "exportName": "UniversalModuleWorkspace",
    "renderMode": "HYBRID_METADATA_DRIVEN",
    "props": {
      "moduleId": "MOD_NP_CATERING",
      "capabilityId": "CAP_NP_CATERING",
      "productId": "JUMO-NURSERY-PRIMARY-ERP"
    },
    "status": "LOADABLE"
  },
  {
    "runtimeComponentId": "RTC_CAP_NP_TRANSPORT",
    "uiMetadataId": "UIM_CAP_NP_TRANSPORT",
    "capabilityId": "CAP_NP_TRANSPORT",
    "productId": "JUMO-NURSERY-PRIMARY-ERP",
    "moduleId": "MOD_NP_TRANSPORT",
    "componentName": "StudentBusRoutingTrackingEngineRuntime",
    "importPath": "src/core/enterprise/components/UniversalModuleWorkspace",
    "exportName": "UniversalModuleWorkspace",
    "renderMode": "HYBRID_METADATA_DRIVEN",
    "props": {
      "moduleId": "MOD_NP_TRANSPORT",
      "capabilityId": "CAP_NP_TRANSPORT",
      "productId": "JUMO-NURSERY-PRIMARY-ERP"
    },
    "status": "LOADABLE"
  },
  {
    "runtimeComponentId": "RTC_CAP_SEC_HOD",
    "uiMetadataId": "UIM_CAP_SEC_HOD",
    "capabilityId": "CAP_SEC_HOD",
    "productId": "JUMO-SECONDARY-ERP",
    "moduleId": "MOD_SEC_HOD",
    "componentName": "AcademicDepartmentalHeadsHODEngineRuntime",
    "importPath": "src/core/enterprise/components/UniversalModuleWorkspace",
    "exportName": "UniversalModuleWorkspace",
    "renderMode": "HYBRID_METADATA_DRIVEN",
    "props": {
      "moduleId": "MOD_SEC_HOD",
      "capabilityId": "CAP_SEC_HOD",
      "productId": "JUMO-SECONDARY-ERP"
    },
    "status": "LOADABLE"
  },
  {
    "runtimeComponentId": "RTC_CAP_SEC_REGISTRAR",
    "uiMetadataId": "UIM_CAP_SEC_REGISTRAR",
    "capabilityId": "CAP_SEC_REGISTRAR",
    "productId": "JUMO-SECONDARY-ERP",
    "moduleId": "MOD_SEC_REGISTRAR",
    "componentName": "SecondaryRegistryMatriculationEngineRuntime",
    "importPath": "src/core/enterprise/components/UniversalModuleWorkspace",
    "exportName": "UniversalModuleWorkspace",
    "renderMode": "HYBRID_METADATA_DRIVEN",
    "props": {
      "moduleId": "MOD_SEC_REGISTRAR",
      "capabilityId": "CAP_SEC_REGISTRAR",
      "productId": "JUMO-SECONDARY-ERP"
    },
    "status": "LOADABLE"
  },
  {
    "runtimeComponentId": "RTC_CAP_SEC_BURSARY",
    "uiMetadataId": "UIM_CAP_SEC_BURSARY",
    "capabilityId": "CAP_SEC_BURSARY",
    "productId": "JUMO-SECONDARY-ERP",
    "moduleId": "MOD_SEC_BURSARY",
    "componentName": "SecondaryBursarTuitionsEngineRuntime",
    "importPath": "src/core/enterprise/components/UniversalModuleWorkspace",
    "exportName": "UniversalModuleWorkspace",
    "renderMode": "HYBRID_METADATA_DRIVEN",
    "props": {
      "moduleId": "MOD_SEC_BURSARY",
      "capabilityId": "CAP_SEC_BURSARY",
      "productId": "JUMO-SECONDARY-ERP"
    },
    "status": "LOADABLE"
  },
  {
    "runtimeComponentId": "RTC_CAP_SEC_SENATE",
    "uiMetadataId": "UIM_CAP_SEC_SENATE",
    "capabilityId": "CAP_SEC_SENATE",
    "productId": "JUMO-SECONDARY-ERP",
    "moduleId": "MOD_SEC_SENATE",
    "componentName": "SecondaryAcademicSenateEngineRuntime",
    "importPath": "src/core/enterprise/components/UniversalModuleWorkspace",
    "exportName": "UniversalModuleWorkspace",
    "renderMode": "HYBRID_METADATA_DRIVEN",
    "props": {
      "moduleId": "MOD_SEC_SENATE",
      "capabilityId": "CAP_SEC_SENATE",
      "productId": "JUMO-SECONDARY-ERP"
    },
    "status": "LOADABLE"
  },
  {
    "runtimeComponentId": "RTC_CAP_SEC_SERVICE",
    "uiMetadataId": "UIM_CAP_SEC_SERVICE",
    "capabilityId": "CAP_SEC_SERVICE",
    "productId": "JUMO-SECONDARY-ERP",
    "moduleId": "MOD_SEC_SERVICE",
    "componentName": "SecondaryCoreDomainServiceEngineRuntime",
    "importPath": "src/core/enterprise/components/UniversalModuleWorkspace",
    "exportName": "UniversalModuleWorkspace",
    "renderMode": "HYBRID_METADATA_DRIVEN",
    "props": {
      "moduleId": "MOD_SEC_SERVICE",
      "capabilityId": "CAP_SEC_SERVICE",
      "productId": "JUMO-SECONDARY-ERP"
    },
    "status": "LOADABLE"
  },
  {
    "runtimeComponentId": "RTC_CAP_ALUM_REGISTRY",
    "uiMetadataId": "UIM_CAP_ALUM_REGISTRY",
    "capabilityId": "CAP_ALUM_REGISTRY",
    "productId": "JUMO-ALUMNI",
    "moduleId": "MOD_ALUM_REGISTRY",
    "componentName": "AlumniCensusGraduateRegistryEngineRuntime",
    "importPath": "src/core/enterprise/components/UniversalModuleWorkspace",
    "exportName": "UniversalModuleWorkspace",
    "renderMode": "HYBRID_METADATA_DRIVEN",
    "props": {
      "moduleId": "MOD_ALUM_REGISTRY",
      "capabilityId": "CAP_ALUM_REGISTRY",
      "productId": "JUMO-ALUMNI"
    },
    "status": "LOADABLE"
  },
  {
    "runtimeComponentId": "RTC_CAP_ALUM_GIVING",
    "uiMetadataId": "UIM_CAP_ALUM_GIVING",
    "capabilityId": "CAP_ALUM_GIVING",
    "productId": "JUMO-ALUMNI",
    "moduleId": "MOD_ALUM_GIVING",
    "componentName": "GivingCampaignsEndowmentsEngineRuntime",
    "importPath": "src/core/enterprise/components/UniversalModuleWorkspace",
    "exportName": "UniversalModuleWorkspace",
    "renderMode": "HYBRID_METADATA_DRIVEN",
    "props": {
      "moduleId": "MOD_ALUM_GIVING",
      "capabilityId": "CAP_ALUM_GIVING",
      "productId": "JUMO-ALUMNI"
    },
    "status": "LOADABLE"
  },
  {
    "runtimeComponentId": "RTC_CAP_ALUM_CHAPTERS",
    "uiMetadataId": "UIM_CAP_ALUM_CHAPTERS",
    "capabilityId": "CAP_ALUM_CHAPTERS",
    "productId": "JUMO-ALUMNI",
    "moduleId": "MOD_ALUM_CHAPTERS",
    "componentName": "GlobalChaptersDiasporaNetworkEngineRuntime",
    "importPath": "src/core/enterprise/components/UniversalModuleWorkspace",
    "exportName": "UniversalModuleWorkspace",
    "renderMode": "HYBRID_METADATA_DRIVEN",
    "props": {
      "moduleId": "MOD_ALUM_CHAPTERS",
      "capabilityId": "CAP_ALUM_CHAPTERS",
      "productId": "JUMO-ALUMNI"
    },
    "status": "LOADABLE"
  },
  {
    "runtimeComponentId": "RTC_CAP_ALUM_CAREER",
    "uiMetadataId": "UIM_CAP_ALUM_CAREER",
    "capabilityId": "CAP_ALUM_CAREER",
    "productId": "JUMO-ALUMNI",
    "moduleId": "MOD_ALUM_CAREER",
    "componentName": "CareerServicesMentorshipEngineRuntime",
    "importPath": "src/core/enterprise/components/UniversalModuleWorkspace",
    "exportName": "UniversalModuleWorkspace",
    "renderMode": "HYBRID_METADATA_DRIVEN",
    "props": {
      "moduleId": "MOD_ALUM_CAREER",
      "capabilityId": "CAP_ALUM_CAREER",
      "productId": "JUMO-ALUMNI"
    },
    "status": "LOADABLE"
  },
  {
    "runtimeComponentId": "RTC_CAP_ALUM_DASHBOARD",
    "uiMetadataId": "UIM_CAP_ALUM_DASHBOARD",
    "capabilityId": "CAP_ALUM_DASHBOARD",
    "productId": "JUMO-ALUMNI",
    "moduleId": "MOD_ALUM_DASHBOARD",
    "componentName": "AlumniIntelligenceDashboardEngineRuntime",
    "importPath": "src/core/enterprise/components/UniversalModuleWorkspace",
    "exportName": "UniversalModuleWorkspace",
    "renderMode": "HYBRID_METADATA_DRIVEN",
    "props": {
      "moduleId": "MOD_ALUM_DASHBOARD",
      "capabilityId": "CAP_ALUM_DASHBOARD",
      "productId": "JUMO-ALUMNI"
    },
    "status": "LOADABLE"
  },
  {
    "runtimeComponentId": "RTC_CAP_CH_MEMBERSHIP",
    "uiMetadataId": "UIM_CAP_CH_MEMBERSHIP",
    "capabilityId": "CAP_CH_MEMBERSHIP",
    "productId": "JUMO-CHURCH",
    "moduleId": "MOD_CH_MEMBERSHIP",
    "componentName": "CongregationDirectoryCensusEngineRuntime",
    "importPath": "src/core/enterprise/components/UniversalModuleWorkspace",
    "exportName": "UniversalModuleWorkspace",
    "renderMode": "HYBRID_METADATA_DRIVEN",
    "props": {
      "moduleId": "MOD_CH_MEMBERSHIP",
      "capabilityId": "CAP_CH_MEMBERSHIP",
      "productId": "JUMO-CHURCH"
    },
    "status": "LOADABLE"
  },
  {
    "runtimeComponentId": "RTC_CAP_CH_FINANCE",
    "uiMetadataId": "UIM_CAP_CH_FINANCE",
    "capabilityId": "CAP_CH_FINANCE",
    "productId": "JUMO-CHURCH",
    "moduleId": "MOD_CH_FINANCE",
    "componentName": "TithesOfferingsDiocesanLedgerEngineRuntime",
    "importPath": "src/core/enterprise/components/UniversalModuleWorkspace",
    "exportName": "UniversalModuleWorkspace",
    "renderMode": "HYBRID_METADATA_DRIVEN",
    "props": {
      "moduleId": "MOD_CH_FINANCE",
      "capabilityId": "CAP_CH_FINANCE",
      "productId": "JUMO-CHURCH"
    },
    "status": "LOADABLE"
  },
  {
    "runtimeComponentId": "RTC_CAP_CH_PASTORAL",
    "uiMetadataId": "UIM_CAP_CH_PASTORAL",
    "capabilityId": "CAP_CH_PASTORAL",
    "productId": "JUMO-CHURCH",
    "moduleId": "MOD_CH_PASTORAL",
    "componentName": "PastoralCareVisitationTrackingEngineRuntime",
    "importPath": "src/core/enterprise/components/UniversalModuleWorkspace",
    "exportName": "UniversalModuleWorkspace",
    "renderMode": "HYBRID_METADATA_DRIVEN",
    "props": {
      "moduleId": "MOD_CH_PASTORAL",
      "capabilityId": "CAP_CH_PASTORAL",
      "productId": "JUMO-CHURCH"
    },
    "status": "LOADABLE"
  },
  {
    "runtimeComponentId": "RTC_CAP_CH_EVENTS",
    "uiMetadataId": "UIM_CAP_CH_EVENTS",
    "capabilityId": "CAP_CH_EVENTS",
    "productId": "JUMO-CHURCH",
    "moduleId": "MOD_CH_EVENTS",
    "componentName": "LiturgicalCalendarEventOperationsEngineRuntime",
    "importPath": "src/core/enterprise/components/UniversalModuleWorkspace",
    "exportName": "UniversalModuleWorkspace",
    "renderMode": "HYBRID_METADATA_DRIVEN",
    "props": {
      "moduleId": "MOD_CH_EVENTS",
      "capabilityId": "CAP_CH_EVENTS",
      "productId": "JUMO-CHURCH"
    },
    "status": "LOADABLE"
  },
  {
    "runtimeComponentId": "RTC_CAP_CH_DASHBOARD",
    "uiMetadataId": "UIM_CAP_CH_DASHBOARD",
    "capabilityId": "CAP_CH_DASHBOARD",
    "productId": "JUMO-CHURCH",
    "moduleId": "MOD_CH_DASHBOARD",
    "componentName": "ExecutiveDiocesanDashboardEngineRuntime",
    "importPath": "src/core/enterprise/components/UniversalModuleWorkspace",
    "exportName": "UniversalModuleWorkspace",
    "renderMode": "HYBRID_METADATA_DRIVEN",
    "props": {
      "moduleId": "MOD_CH_DASHBOARD",
      "capabilityId": "CAP_CH_DASHBOARD",
      "productId": "JUMO-CHURCH"
    },
    "status": "LOADABLE"
  },
  {
    "runtimeComponentId": "RTC_CAP_OCC_VERIFICATION",
    "uiMetadataId": "UIM_CAP_OCC_VERIFICATION",
    "capabilityId": "CAP_OCC_VERIFICATION",
    "productId": "JUMO-CONTROL",
    "moduleId": "MOD_OCC_VERIFICATION",
    "componentName": "Ring0VerificationIntegrityEngineRuntime",
    "importPath": "src/core/enterprise/components/UniversalModuleWorkspace",
    "exportName": "UniversalModuleWorkspace",
    "renderMode": "HYBRID_METADATA_DRIVEN",
    "props": {
      "moduleId": "MOD_OCC_VERIFICATION",
      "capabilityId": "CAP_OCC_VERIFICATION",
      "productId": "JUMO-CONTROL"
    },
    "status": "LOADABLE"
  },
  {
    "runtimeComponentId": "RTC_CAP_OCC_TRUST",
    "uiMetadataId": "UIM_CAP_OCC_TRUST",
    "capabilityId": "CAP_OCC_TRUST",
    "productId": "JUMO-CONTROL",
    "moduleId": "MOD_OCC_TRUST",
    "componentName": "JUMOTrustEngineAntiTamperEngineRuntime",
    "importPath": "src/core/enterprise/components/UniversalModuleWorkspace",
    "exportName": "UniversalModuleWorkspace",
    "renderMode": "HYBRID_METADATA_DRIVEN",
    "props": {
      "moduleId": "MOD_OCC_TRUST",
      "capabilityId": "CAP_OCC_TRUST",
      "productId": "JUMO-CONTROL"
    },
    "status": "LOADABLE"
  },
  {
    "runtimeComponentId": "RTC_CAP_OCC_FACTORY",
    "uiMetadataId": "UIM_CAP_OCC_FACTORY",
    "capabilityId": "CAP_OCC_FACTORY",
    "productId": "JUMO-CONTROL",
    "moduleId": "MOD_OCC_FACTORY",
    "componentName": "ERPTemplateScaffoldingFactoryEngineRuntime",
    "importPath": "src/core/enterprise/components/UniversalModuleWorkspace",
    "exportName": "UniversalModuleWorkspace",
    "renderMode": "HYBRID_METADATA_DRIVEN",
    "props": {
      "moduleId": "MOD_OCC_FACTORY",
      "capabilityId": "CAP_OCC_FACTORY",
      "productId": "JUMO-CONTROL"
    },
    "status": "LOADABLE"
  },
  {
    "runtimeComponentId": "RTC_CAP_OCC_SHELL",
    "uiMetadataId": "UIM_CAP_OCC_SHELL",
    "capabilityId": "CAP_OCC_SHELL",
    "productId": "JUMO-CONTROL",
    "moduleId": "MOD_OCC_SHELL",
    "componentName": "UniversalSovereignPlatformHostEngineRuntime",
    "importPath": "src/core/enterprise/components/UniversalModuleWorkspace",
    "exportName": "UniversalModuleWorkspace",
    "renderMode": "HYBRID_METADATA_DRIVEN",
    "props": {
      "moduleId": "MOD_OCC_SHELL",
      "capabilityId": "CAP_OCC_SHELL",
      "productId": "JUMO-CONTROL"
    },
    "status": "LOADABLE"
  }
];

export const UniversalRuntimeComponentRegistry: RegistryCollection<AuthoritativeRuntimeComponent> = createRegistryCollection(
  RAW_RUNTIME_COMPONENTS,
  "UNIVERSAL_RUNTIME_COMPONENT_REGISTRY"
);

export function getRuntimeComponentById(runtimeComponentId: string): AuthoritativeRuntimeComponent | undefined {
  return safeFind(UniversalRuntimeComponentRegistry, r => r.runtimeComponentId === runtimeComponentId);
}

export function getRuntimeComponentByCapability(capabilityId: string): AuthoritativeRuntimeComponent | undefined {
  return safeFind(UniversalRuntimeComponentRegistry, r => r.capabilityId === capabilityId);
}
