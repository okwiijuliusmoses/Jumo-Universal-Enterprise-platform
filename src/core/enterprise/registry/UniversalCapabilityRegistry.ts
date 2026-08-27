import { createRegistryCollection, RegistryCollection, safeFind, safeFilter } from './UniversalRegistryContract';

export interface AuthoritativeCapability {
  capabilityId: string;
  productId: string;
  directorateId: string;
  departmentId: string;
  officeId: string;
  portalId: string;
  moduleId: string;
  name: string;
  description: string;
  route: string;
  actionIds: string[];
  workflowIds: string[];
  aiCapabilityIds: string[];
  permissionIds: string[];
  uiMetadataId: string;
  runtimeComponentId: string;
  status: "VERIFIED" | "RECONCILED" | "PARTIAL" | "UNRESOLVED";
}

const RAW_CAPABILITIES: AuthoritativeCapability[] = [
  {
    "capabilityId": "CAP_FT_AGENT_BANKING",
    "productId": "JUMO-FINTECH",
    "directorateId": "DIR_FIN_EXECUTIVE",
    "departmentId": "DEP_FIN_EXECUTIVE",
    "officeId": "OFF_FIN_CFO",
    "portalId": "PORTAL_FIN_CFO",
    "moduleId": "MOD_FT_AGENT_BANKING",
    "name": "Agent Banking Autonomous Engine",
    "description": "Authoritative capability providing enterprise operations for Agent Banking Autonomous Engine",
    "route": "/products/fintech/mod-ft-agent-banking",
    "actionIds": [
      "ACT_CAP_FT_AGENT_BANKING_EXECUTE",
      "ACT_CAP_FT_AGENT_BANKING_EXPORT",
      "ACT_CAP_FT_AGENT_BANKING_REFRESH"
    ],
    "workflowIds": [
      "WF_KYCONBOARDINGWORKFLOW",
      "WF_PAYMENTPROCESSINGWORKFLOW"
    ],
    "aiCapabilityIds": [
      "AI_FINTECHMODULEAGENTREGISTRY",
      "AI_FINTECHCAPABILITYREGISTRY"
    ],
    "permissionIds": [
      "ROLE_CFO",
      "ROLE_CONTROLLER",
      "ROLE_ACCOUNTANT"
    ],
    "uiMetadataId": "UIM_CAP_FT_AGENT_BANKING",
    "runtimeComponentId": "RTC_CAP_FT_AGENT_BANKING",
    "status": "VERIFIED"
  },
  {
    "capabilityId": "CAP_FT_AGRICULTURAL_FINANCE",
    "productId": "JUMO-FINTECH",
    "directorateId": "DIR_FIN_EXECUTIVE",
    "departmentId": "DEP_FIN_EXECUTIVE",
    "officeId": "OFF_FIN_CFO",
    "portalId": "PORTAL_FIN_CFO",
    "moduleId": "MOD_FT_AGRICULTURAL_FINANCE",
    "name": "Agricultural Finance Autonomous Engine",
    "description": "Authoritative capability providing enterprise operations for Agricultural Finance Autonomous Engine",
    "route": "/products/fintech/mod-ft-agricultural-finance",
    "actionIds": [
      "ACT_CAP_FT_AGRICULTURAL_FINANCE_EXECUTE",
      "ACT_CAP_FT_AGRICULTURAL_FINANCE_EXPORT",
      "ACT_CAP_FT_AGRICULTURAL_FINANCE_REFRESH"
    ],
    "workflowIds": [
      "WF_KYCONBOARDINGWORKFLOW",
      "WF_PAYMENTPROCESSINGWORKFLOW"
    ],
    "aiCapabilityIds": [
      "AI_FINTECHMODULEAGENTREGISTRY",
      "AI_FINTECHCAPABILITYREGISTRY"
    ],
    "permissionIds": [
      "ROLE_CFO",
      "ROLE_CONTROLLER",
      "ROLE_ACCOUNTANT"
    ],
    "uiMetadataId": "UIM_CAP_FT_AGRICULTURAL_FINANCE",
    "runtimeComponentId": "RTC_CAP_FT_AGRICULTURAL_FINANCE",
    "status": "VERIFIED"
  },
  {
    "capabilityId": "CAP_FT_ATM_SELF_SERVICE",
    "productId": "JUMO-FINTECH",
    "directorateId": "DIR_FIN_EXECUTIVE",
    "departmentId": "DEP_FIN_EXECUTIVE",
    "officeId": "OFF_FIN_CFO",
    "portalId": "PORTAL_FIN_CFO",
    "moduleId": "MOD_FT_ATM_SELF_SERVICE",
    "name": "Atm Self Service Autonomous Engine",
    "description": "Authoritative capability providing enterprise operations for Atm Self Service Autonomous Engine",
    "route": "/products/fintech/mod-ft-atm-self-service",
    "actionIds": [
      "ACT_CAP_FT_ATM_SELF_SERVICE_EXECUTE",
      "ACT_CAP_FT_ATM_SELF_SERVICE_EXPORT",
      "ACT_CAP_FT_ATM_SELF_SERVICE_REFRESH"
    ],
    "workflowIds": [
      "WF_KYCONBOARDINGWORKFLOW",
      "WF_PAYMENTPROCESSINGWORKFLOW"
    ],
    "aiCapabilityIds": [
      "AI_FINTECHMODULEAGENTREGISTRY",
      "AI_FINTECHCAPABILITYREGISTRY"
    ],
    "permissionIds": [
      "ROLE_CFO",
      "ROLE_CONTROLLER",
      "ROLE_ACCOUNTANT"
    ],
    "uiMetadataId": "UIM_CAP_FT_ATM_SELF_SERVICE",
    "runtimeComponentId": "RTC_CAP_FT_ATM_SELF_SERVICE",
    "status": "VERIFIED"
  },
  {
    "capabilityId": "CAP_FT_BANK_PAYMENTS",
    "productId": "JUMO-FINTECH",
    "directorateId": "DIR_FIN_EXECUTIVE",
    "departmentId": "DEP_FIN_EXECUTIVE",
    "officeId": "OFF_FIN_CFO",
    "portalId": "PORTAL_FIN_CFO",
    "moduleId": "MOD_FT_BANK_PAYMENTS",
    "name": "Bank Payments Autonomous Engine",
    "description": "Authoritative capability providing enterprise operations for Bank Payments Autonomous Engine",
    "route": "/products/fintech/mod-ft-bank-payments",
    "actionIds": [
      "ACT_CAP_FT_BANK_PAYMENTS_EXECUTE",
      "ACT_CAP_FT_BANK_PAYMENTS_EXPORT",
      "ACT_CAP_FT_BANK_PAYMENTS_REFRESH"
    ],
    "workflowIds": [
      "WF_KYCONBOARDINGWORKFLOW",
      "WF_PAYMENTPROCESSINGWORKFLOW"
    ],
    "aiCapabilityIds": [
      "AI_FINTECHMODULEAGENTREGISTRY",
      "AI_FINTECHCAPABILITYREGISTRY"
    ],
    "permissionIds": [
      "ROLE_CFO",
      "ROLE_CONTROLLER",
      "ROLE_ACCOUNTANT"
    ],
    "uiMetadataId": "UIM_CAP_FT_BANK_PAYMENTS",
    "runtimeComponentId": "RTC_CAP_FT_BANK_PAYMENTS",
    "status": "VERIFIED"
  },
  {
    "capabilityId": "CAP_FT_BILL_PAYMENTS",
    "productId": "JUMO-FINTECH",
    "directorateId": "DIR_FIN_EXECUTIVE",
    "departmentId": "DEP_FIN_EXECUTIVE",
    "officeId": "OFF_FIN_CFO",
    "portalId": "PORTAL_FIN_CFO",
    "moduleId": "MOD_FT_BILL_PAYMENTS",
    "name": "Bill Payments Autonomous Engine",
    "description": "Authoritative capability providing enterprise operations for Bill Payments Autonomous Engine",
    "route": "/products/fintech/mod-ft-bill-payments",
    "actionIds": [
      "ACT_CAP_FT_BILL_PAYMENTS_EXECUTE",
      "ACT_CAP_FT_BILL_PAYMENTS_EXPORT",
      "ACT_CAP_FT_BILL_PAYMENTS_REFRESH"
    ],
    "workflowIds": [
      "WF_KYCONBOARDINGWORKFLOW",
      "WF_PAYMENTPROCESSINGWORKFLOW"
    ],
    "aiCapabilityIds": [
      "AI_FINTECHMODULEAGENTREGISTRY",
      "AI_FINTECHCAPABILITYREGISTRY"
    ],
    "permissionIds": [
      "ROLE_CFO",
      "ROLE_CONTROLLER",
      "ROLE_ACCOUNTANT"
    ],
    "uiMetadataId": "UIM_CAP_FT_BILL_PAYMENTS",
    "runtimeComponentId": "RTC_CAP_FT_BILL_PAYMENTS",
    "status": "VERIFIED"
  },
  {
    "capabilityId": "CAP_FT_CAPITAL_MARKETS",
    "productId": "JUMO-FINTECH",
    "directorateId": "DIR_FIN_EXECUTIVE",
    "departmentId": "DEP_FIN_EXECUTIVE",
    "officeId": "OFF_FIN_CFO",
    "portalId": "PORTAL_FIN_CFO",
    "moduleId": "MOD_FT_CAPITAL_MARKETS",
    "name": "Capital Markets Autonomous Engine",
    "description": "Authoritative capability providing enterprise operations for Capital Markets Autonomous Engine",
    "route": "/products/fintech/mod-ft-capital-markets",
    "actionIds": [
      "ACT_CAP_FT_CAPITAL_MARKETS_EXECUTE",
      "ACT_CAP_FT_CAPITAL_MARKETS_EXPORT",
      "ACT_CAP_FT_CAPITAL_MARKETS_REFRESH"
    ],
    "workflowIds": [
      "WF_KYCONBOARDINGWORKFLOW",
      "WF_PAYMENTPROCESSINGWORKFLOW"
    ],
    "aiCapabilityIds": [
      "AI_FINTECHMODULEAGENTREGISTRY",
      "AI_FINTECHCAPABILITYREGISTRY"
    ],
    "permissionIds": [
      "ROLE_CFO",
      "ROLE_CONTROLLER",
      "ROLE_ACCOUNTANT"
    ],
    "uiMetadataId": "UIM_CAP_FT_CAPITAL_MARKETS",
    "runtimeComponentId": "RTC_CAP_FT_CAPITAL_MARKETS",
    "status": "VERIFIED"
  },
  {
    "capabilityId": "CAP_FT_CARDS",
    "productId": "JUMO-FINTECH",
    "directorateId": "DIR_FIN_EXECUTIVE",
    "departmentId": "DEP_FIN_EXECUTIVE",
    "officeId": "OFF_FIN_CFO",
    "portalId": "PORTAL_FIN_CFO",
    "moduleId": "MOD_FT_CARDS",
    "name": "Cards Autonomous Engine",
    "description": "Authoritative capability providing enterprise operations for Cards Autonomous Engine",
    "route": "/products/fintech/mod-ft-cards",
    "actionIds": [
      "ACT_CAP_FT_CARDS_EXECUTE",
      "ACT_CAP_FT_CARDS_EXPORT",
      "ACT_CAP_FT_CARDS_REFRESH"
    ],
    "workflowIds": [
      "WF_KYCONBOARDINGWORKFLOW",
      "WF_PAYMENTPROCESSINGWORKFLOW"
    ],
    "aiCapabilityIds": [
      "AI_FINTECHMODULEAGENTREGISTRY",
      "AI_FINTECHCAPABILITYREGISTRY"
    ],
    "permissionIds": [
      "ROLE_CFO",
      "ROLE_CONTROLLER",
      "ROLE_ACCOUNTANT"
    ],
    "uiMetadataId": "UIM_CAP_FT_CARDS",
    "runtimeComponentId": "RTC_CAP_FT_CARDS",
    "status": "VERIFIED"
  },
  {
    "capabilityId": "CAP_FT_COLLECTIONS",
    "productId": "JUMO-FINTECH",
    "directorateId": "DIR_FIN_EXECUTIVE",
    "departmentId": "DEP_FIN_EXECUTIVE",
    "officeId": "OFF_FIN_CFO",
    "portalId": "PORTAL_FIN_CFO",
    "moduleId": "MOD_FT_COLLECTIONS",
    "name": "Collections Autonomous Engine",
    "description": "Authoritative capability providing enterprise operations for Collections Autonomous Engine",
    "route": "/products/fintech/mod-ft-collections",
    "actionIds": [
      "ACT_CAP_FT_COLLECTIONS_EXECUTE",
      "ACT_CAP_FT_COLLECTIONS_EXPORT",
      "ACT_CAP_FT_COLLECTIONS_REFRESH"
    ],
    "workflowIds": [
      "WF_KYCONBOARDINGWORKFLOW",
      "WF_PAYMENTPROCESSINGWORKFLOW"
    ],
    "aiCapabilityIds": [
      "AI_FINTECHMODULEAGENTREGISTRY",
      "AI_FINTECHCAPABILITYREGISTRY"
    ],
    "permissionIds": [
      "ROLE_CFO",
      "ROLE_CONTROLLER",
      "ROLE_ACCOUNTANT"
    ],
    "uiMetadataId": "UIM_CAP_FT_COLLECTIONS",
    "runtimeComponentId": "RTC_CAP_FT_COLLECTIONS",
    "status": "VERIFIED"
  },
  {
    "capabilityId": "CAP_FT_COMPLIANCE",
    "productId": "JUMO-FINTECH",
    "directorateId": "DIR_FIN_EXECUTIVE",
    "departmentId": "DEP_FIN_EXECUTIVE",
    "officeId": "OFF_FIN_CFO",
    "portalId": "PORTAL_FIN_CFO",
    "moduleId": "MOD_FT_COMPLIANCE",
    "name": "Compliance Autonomous Engine",
    "description": "Authoritative capability providing enterprise operations for Compliance Autonomous Engine",
    "route": "/products/fintech/mod-ft-compliance",
    "actionIds": [
      "ACT_CAP_FT_COMPLIANCE_EXECUTE",
      "ACT_CAP_FT_COMPLIANCE_EXPORT",
      "ACT_CAP_FT_COMPLIANCE_REFRESH"
    ],
    "workflowIds": [
      "WF_KYCONBOARDINGWORKFLOW",
      "WF_PAYMENTPROCESSINGWORKFLOW"
    ],
    "aiCapabilityIds": [
      "AI_FINTECHMODULEAGENTREGISTRY",
      "AI_FINTECHCAPABILITYREGISTRY"
    ],
    "permissionIds": [
      "ROLE_CFO",
      "ROLE_CONTROLLER",
      "ROLE_ACCOUNTANT"
    ],
    "uiMetadataId": "UIM_CAP_FT_COMPLIANCE",
    "runtimeComponentId": "RTC_CAP_FT_COMPLIANCE",
    "status": "VERIFIED"
  },
  {
    "capabilityId": "CAP_FT_CROSS_BORDER",
    "productId": "JUMO-FINTECH",
    "directorateId": "DIR_FIN_EXECUTIVE",
    "departmentId": "DEP_FIN_EXECUTIVE",
    "officeId": "OFF_FIN_CFO",
    "portalId": "PORTAL_FIN_CFO",
    "moduleId": "MOD_FT_CROSS_BORDER",
    "name": "Cross Border Autonomous Engine",
    "description": "Authoritative capability providing enterprise operations for Cross Border Autonomous Engine",
    "route": "/products/fintech/mod-ft-cross-border",
    "actionIds": [
      "ACT_CAP_FT_CROSS_BORDER_EXECUTE",
      "ACT_CAP_FT_CROSS_BORDER_EXPORT",
      "ACT_CAP_FT_CROSS_BORDER_REFRESH"
    ],
    "workflowIds": [
      "WF_KYCONBOARDINGWORKFLOW",
      "WF_PAYMENTPROCESSINGWORKFLOW"
    ],
    "aiCapabilityIds": [
      "AI_FINTECHMODULEAGENTREGISTRY",
      "AI_FINTECHCAPABILITYREGISTRY"
    ],
    "permissionIds": [
      "ROLE_CFO",
      "ROLE_CONTROLLER",
      "ROLE_ACCOUNTANT"
    ],
    "uiMetadataId": "UIM_CAP_FT_CROSS_BORDER",
    "runtimeComponentId": "RTC_CAP_FT_CROSS_BORDER",
    "status": "VERIFIED"
  },
  {
    "capabilityId": "CAP_FT_DATA_INTELLIGENCE",
    "productId": "JUMO-FINTECH",
    "directorateId": "DIR_FIN_EXECUTIVE",
    "departmentId": "DEP_FIN_EXECUTIVE",
    "officeId": "OFF_FIN_CFO",
    "portalId": "PORTAL_FIN_CFO",
    "moduleId": "MOD_FT_DATA_INTELLIGENCE",
    "name": "Data Intelligence Autonomous Engine",
    "description": "Authoritative capability providing enterprise operations for Data Intelligence Autonomous Engine",
    "route": "/products/fintech/mod-ft-data-intelligence",
    "actionIds": [
      "ACT_CAP_FT_DATA_INTELLIGENCE_EXECUTE",
      "ACT_CAP_FT_DATA_INTELLIGENCE_EXPORT",
      "ACT_CAP_FT_DATA_INTELLIGENCE_REFRESH"
    ],
    "workflowIds": [
      "WF_KYCONBOARDINGWORKFLOW",
      "WF_PAYMENTPROCESSINGWORKFLOW"
    ],
    "aiCapabilityIds": [
      "AI_FINTECHMODULEAGENTREGISTRY",
      "AI_FINTECHCAPABILITYREGISTRY"
    ],
    "permissionIds": [
      "ROLE_CFO",
      "ROLE_CONTROLLER",
      "ROLE_ACCOUNTANT"
    ],
    "uiMetadataId": "UIM_CAP_FT_DATA_INTELLIGENCE",
    "runtimeComponentId": "RTC_CAP_FT_DATA_INTELLIGENCE",
    "status": "VERIFIED"
  },
  {
    "capabilityId": "CAP_FT_DEVELOPER_API",
    "productId": "JUMO-FINTECH",
    "directorateId": "DIR_FIN_EXECUTIVE",
    "departmentId": "DEP_FIN_EXECUTIVE",
    "officeId": "OFF_FIN_CFO",
    "portalId": "PORTAL_FIN_CFO",
    "moduleId": "MOD_FT_DEVELOPER_API",
    "name": "Developer Api Autonomous Engine",
    "description": "Authoritative capability providing enterprise operations for Developer Api Autonomous Engine",
    "route": "/products/fintech/mod-ft-developer-api",
    "actionIds": [
      "ACT_CAP_FT_DEVELOPER_API_EXECUTE",
      "ACT_CAP_FT_DEVELOPER_API_EXPORT",
      "ACT_CAP_FT_DEVELOPER_API_REFRESH"
    ],
    "workflowIds": [
      "WF_KYCONBOARDINGWORKFLOW",
      "WF_PAYMENTPROCESSINGWORKFLOW"
    ],
    "aiCapabilityIds": [
      "AI_FINTECHMODULEAGENTREGISTRY",
      "AI_FINTECHCAPABILITYREGISTRY"
    ],
    "permissionIds": [
      "ROLE_CFO",
      "ROLE_CONTROLLER",
      "ROLE_ACCOUNTANT"
    ],
    "uiMetadataId": "UIM_CAP_FT_DEVELOPER_API",
    "runtimeComponentId": "RTC_CAP_FT_DEVELOPER_API",
    "status": "VERIFIED"
  },
  {
    "capabilityId": "CAP_FT_DIGITAL_BANKING",
    "productId": "JUMO-FINTECH",
    "directorateId": "DIR_FIN_EXECUTIVE",
    "departmentId": "DEP_FIN_EXECUTIVE",
    "officeId": "OFF_FIN_CFO",
    "portalId": "PORTAL_FIN_CFO",
    "moduleId": "MOD_FT_DIGITAL_BANKING",
    "name": "Digital Banking Autonomous Engine",
    "description": "Authoritative capability providing enterprise operations for Digital Banking Autonomous Engine",
    "route": "/products/fintech/mod-ft-digital-banking",
    "actionIds": [
      "ACT_CAP_FT_DIGITAL_BANKING_EXECUTE",
      "ACT_CAP_FT_DIGITAL_BANKING_EXPORT",
      "ACT_CAP_FT_DIGITAL_BANKING_REFRESH"
    ],
    "workflowIds": [
      "WF_KYCONBOARDINGWORKFLOW",
      "WF_PAYMENTPROCESSINGWORKFLOW"
    ],
    "aiCapabilityIds": [
      "AI_FINTECHMODULEAGENTREGISTRY",
      "AI_FINTECHCAPABILITYREGISTRY"
    ],
    "permissionIds": [
      "ROLE_CFO",
      "ROLE_CONTROLLER",
      "ROLE_ACCOUNTANT"
    ],
    "uiMetadataId": "UIM_CAP_FT_DIGITAL_BANKING",
    "runtimeComponentId": "RTC_CAP_FT_DIGITAL_BANKING",
    "status": "VERIFIED"
  },
  {
    "capabilityId": "CAP_FT_DIGITAL_WALLETS",
    "productId": "JUMO-FINTECH",
    "directorateId": "DIR_FIN_EXECUTIVE",
    "departmentId": "DEP_FIN_EXECUTIVE",
    "officeId": "OFF_FIN_CFO",
    "portalId": "PORTAL_FIN_CFO",
    "moduleId": "MOD_FT_DIGITAL_WALLETS",
    "name": "Digital Wallets Autonomous Engine",
    "description": "Authoritative capability providing enterprise operations for Digital Wallets Autonomous Engine",
    "route": "/products/fintech/mod-ft-digital-wallets",
    "actionIds": [
      "ACT_CAP_FT_DIGITAL_WALLETS_EXECUTE",
      "ACT_CAP_FT_DIGITAL_WALLETS_EXPORT",
      "ACT_CAP_FT_DIGITAL_WALLETS_REFRESH"
    ],
    "workflowIds": [
      "WF_KYCONBOARDINGWORKFLOW",
      "WF_PAYMENTPROCESSINGWORKFLOW"
    ],
    "aiCapabilityIds": [
      "AI_FINTECHMODULEAGENTREGISTRY",
      "AI_FINTECHCAPABILITYREGISTRY"
    ],
    "permissionIds": [
      "ROLE_CFO",
      "ROLE_CONTROLLER",
      "ROLE_ACCOUNTANT"
    ],
    "uiMetadataId": "UIM_CAP_FT_DIGITAL_WALLETS",
    "runtimeComponentId": "RTC_CAP_FT_DIGITAL_WALLETS",
    "status": "VERIFIED"
  },
  {
    "capabilityId": "CAP_FT_EMBEDDED_FINANCE",
    "productId": "JUMO-FINTECH",
    "directorateId": "DIR_FIN_EXECUTIVE",
    "departmentId": "DEP_FIN_EXECUTIVE",
    "officeId": "OFF_FIN_CFO",
    "portalId": "PORTAL_FIN_CFO",
    "moduleId": "MOD_FT_EMBEDDED_FINANCE",
    "name": "Embedded Finance Autonomous Engine",
    "description": "Authoritative capability providing enterprise operations for Embedded Finance Autonomous Engine",
    "route": "/products/fintech/mod-ft-embedded-finance",
    "actionIds": [
      "ACT_CAP_FT_EMBEDDED_FINANCE_EXECUTE",
      "ACT_CAP_FT_EMBEDDED_FINANCE_EXPORT",
      "ACT_CAP_FT_EMBEDDED_FINANCE_REFRESH"
    ],
    "workflowIds": [
      "WF_KYCONBOARDINGWORKFLOW",
      "WF_PAYMENTPROCESSINGWORKFLOW"
    ],
    "aiCapabilityIds": [
      "AI_FINTECHMODULEAGENTREGISTRY",
      "AI_FINTECHCAPABILITYREGISTRY"
    ],
    "permissionIds": [
      "ROLE_CFO",
      "ROLE_CONTROLLER",
      "ROLE_ACCOUNTANT"
    ],
    "uiMetadataId": "UIM_CAP_FT_EMBEDDED_FINANCE",
    "runtimeComponentId": "RTC_CAP_FT_EMBEDDED_FINANCE",
    "status": "VERIFIED"
  },
  {
    "capabilityId": "CAP_FT_FINANCIAL_ACCOUNTING",
    "productId": "JUMO-FINTECH",
    "directorateId": "DIR_FIN_EXECUTIVE",
    "departmentId": "DEP_FIN_EXECUTIVE",
    "officeId": "OFF_FIN_CFO",
    "portalId": "PORTAL_FIN_CFO",
    "moduleId": "MOD_FT_FINANCIAL_ACCOUNTING",
    "name": "Financial Accounting Autonomous Engine",
    "description": "Authoritative capability providing enterprise operations for Financial Accounting Autonomous Engine",
    "route": "/products/fintech/mod-ft-financial-accounting",
    "actionIds": [
      "ACT_CAP_FT_FINANCIAL_ACCOUNTING_EXECUTE",
      "ACT_CAP_FT_FINANCIAL_ACCOUNTING_EXPORT",
      "ACT_CAP_FT_FINANCIAL_ACCOUNTING_REFRESH"
    ],
    "workflowIds": [
      "WF_KYCONBOARDINGWORKFLOW",
      "WF_PAYMENTPROCESSINGWORKFLOW"
    ],
    "aiCapabilityIds": [
      "AI_FINTECHMODULEAGENTREGISTRY",
      "AI_FINTECHCAPABILITYREGISTRY"
    ],
    "permissionIds": [
      "ROLE_CFO",
      "ROLE_CONTROLLER",
      "ROLE_ACCOUNTANT"
    ],
    "uiMetadataId": "UIM_CAP_FT_FINANCIAL_ACCOUNTING",
    "runtimeComponentId": "RTC_CAP_FT_FINANCIAL_ACCOUNTING",
    "status": "VERIFIED"
  },
  {
    "capabilityId": "CAP_FT_FX",
    "productId": "JUMO-FINTECH",
    "directorateId": "DIR_FIN_EXECUTIVE",
    "departmentId": "DEP_FIN_EXECUTIVE",
    "officeId": "OFF_FIN_CFO",
    "portalId": "PORTAL_FIN_CFO",
    "moduleId": "MOD_FT_FX",
    "name": "Fx Autonomous Engine",
    "description": "Authoritative capability providing enterprise operations for Fx Autonomous Engine",
    "route": "/products/fintech/mod-ft-fx",
    "actionIds": [
      "ACT_CAP_FT_FX_EXECUTE",
      "ACT_CAP_FT_FX_EXPORT",
      "ACT_CAP_FT_FX_REFRESH"
    ],
    "workflowIds": [
      "WF_KYCONBOARDINGWORKFLOW",
      "WF_PAYMENTPROCESSINGWORKFLOW"
    ],
    "aiCapabilityIds": [
      "AI_FINTECHMODULEAGENTREGISTRY",
      "AI_FINTECHCAPABILITYREGISTRY"
    ],
    "permissionIds": [
      "ROLE_CFO",
      "ROLE_CONTROLLER",
      "ROLE_ACCOUNTANT"
    ],
    "uiMetadataId": "UIM_CAP_FT_FX",
    "runtimeComponentId": "RTC_CAP_FT_FX",
    "status": "VERIFIED"
  },
  {
    "capabilityId": "CAP_FT_GLOBAL_ACCOUNTS",
    "productId": "JUMO-FINTECH",
    "directorateId": "DIR_FIN_EXECUTIVE",
    "departmentId": "DEP_FIN_EXECUTIVE",
    "officeId": "OFF_FIN_CFO",
    "portalId": "PORTAL_FIN_CFO",
    "moduleId": "MOD_FT_GLOBAL_ACCOUNTS",
    "name": "Global Accounts Autonomous Engine",
    "description": "Authoritative capability providing enterprise operations for Global Accounts Autonomous Engine",
    "route": "/products/fintech/mod-ft-global-accounts",
    "actionIds": [
      "ACT_CAP_FT_GLOBAL_ACCOUNTS_EXECUTE",
      "ACT_CAP_FT_GLOBAL_ACCOUNTS_EXPORT",
      "ACT_CAP_FT_GLOBAL_ACCOUNTS_REFRESH"
    ],
    "workflowIds": [
      "WF_KYCONBOARDINGWORKFLOW",
      "WF_PAYMENTPROCESSINGWORKFLOW"
    ],
    "aiCapabilityIds": [
      "AI_FINTECHMODULEAGENTREGISTRY",
      "AI_FINTECHCAPABILITYREGISTRY"
    ],
    "permissionIds": [
      "ROLE_CFO",
      "ROLE_CONTROLLER",
      "ROLE_ACCOUNTANT"
    ],
    "uiMetadataId": "UIM_CAP_FT_GLOBAL_ACCOUNTS",
    "runtimeComponentId": "RTC_CAP_FT_GLOBAL_ACCOUNTS",
    "status": "VERIFIED"
  },
  {
    "capabilityId": "CAP_FT_INSURANCE",
    "productId": "JUMO-FINTECH",
    "directorateId": "DIR_FIN_EXECUTIVE",
    "departmentId": "DEP_FIN_EXECUTIVE",
    "officeId": "OFF_FIN_CFO",
    "portalId": "PORTAL_FIN_CFO",
    "moduleId": "MOD_FT_INSURANCE",
    "name": "Insurance Autonomous Engine",
    "description": "Authoritative capability providing enterprise operations for Insurance Autonomous Engine",
    "route": "/products/fintech/mod-ft-insurance",
    "actionIds": [
      "ACT_CAP_FT_INSURANCE_EXECUTE",
      "ACT_CAP_FT_INSURANCE_EXPORT",
      "ACT_CAP_FT_INSURANCE_REFRESH"
    ],
    "workflowIds": [
      "WF_KYCONBOARDINGWORKFLOW",
      "WF_PAYMENTPROCESSINGWORKFLOW"
    ],
    "aiCapabilityIds": [
      "AI_FINTECHMODULEAGENTREGISTRY",
      "AI_FINTECHCAPABILITYREGISTRY"
    ],
    "permissionIds": [
      "ROLE_CFO",
      "ROLE_CONTROLLER",
      "ROLE_ACCOUNTANT"
    ],
    "uiMetadataId": "UIM_CAP_FT_INSURANCE",
    "runtimeComponentId": "RTC_CAP_FT_INSURANCE",
    "status": "VERIFIED"
  },
  {
    "capabilityId": "CAP_FT_INVESTMENT",
    "productId": "JUMO-FINTECH",
    "directorateId": "DIR_FIN_EXECUTIVE",
    "departmentId": "DEP_FIN_EXECUTIVE",
    "officeId": "OFF_FIN_CFO",
    "portalId": "PORTAL_FIN_CFO",
    "moduleId": "MOD_FT_INVESTMENT",
    "name": "Investment Autonomous Engine",
    "description": "Authoritative capability providing enterprise operations for Investment Autonomous Engine",
    "route": "/products/fintech/mod-ft-investment",
    "actionIds": [
      "ACT_CAP_FT_INVESTMENT_EXECUTE",
      "ACT_CAP_FT_INVESTMENT_EXPORT",
      "ACT_CAP_FT_INVESTMENT_REFRESH"
    ],
    "workflowIds": [
      "WF_KYCONBOARDINGWORKFLOW",
      "WF_PAYMENTPROCESSINGWORKFLOW"
    ],
    "aiCapabilityIds": [
      "AI_FINTECHMODULEAGENTREGISTRY",
      "AI_FINTECHCAPABILITYREGISTRY"
    ],
    "permissionIds": [
      "ROLE_CFO",
      "ROLE_CONTROLLER",
      "ROLE_ACCOUNTANT"
    ],
    "uiMetadataId": "UIM_CAP_FT_INVESTMENT",
    "runtimeComponentId": "RTC_CAP_FT_INVESTMENT",
    "status": "VERIFIED"
  },
  {
    "capabilityId": "CAP_FT_LENDING",
    "productId": "JUMO-FINTECH",
    "directorateId": "DIR_FIN_EXECUTIVE",
    "departmentId": "DEP_FIN_EXECUTIVE",
    "officeId": "OFF_FIN_CFO",
    "portalId": "PORTAL_FIN_CFO",
    "moduleId": "MOD_FT_LENDING",
    "name": "Lending Autonomous Engine",
    "description": "Authoritative capability providing enterprise operations for Lending Autonomous Engine",
    "route": "/products/fintech/mod-ft-lending",
    "actionIds": [
      "ACT_CAP_FT_LENDING_EXECUTE",
      "ACT_CAP_FT_LENDING_EXPORT",
      "ACT_CAP_FT_LENDING_REFRESH"
    ],
    "workflowIds": [
      "WF_KYCONBOARDINGWORKFLOW",
      "WF_PAYMENTPROCESSINGWORKFLOW"
    ],
    "aiCapabilityIds": [
      "AI_FINTECHMODULEAGENTREGISTRY",
      "AI_FINTECHCAPABILITYREGISTRY"
    ],
    "permissionIds": [
      "ROLE_CFO",
      "ROLE_CONTROLLER",
      "ROLE_ACCOUNTANT"
    ],
    "uiMetadataId": "UIM_CAP_FT_LENDING",
    "runtimeComponentId": "RTC_CAP_FT_LENDING",
    "status": "VERIFIED"
  },
  {
    "capabilityId": "CAP_FT_MERCHANT_ACQUIRING",
    "productId": "JUMO-FINTECH",
    "directorateId": "DIR_FIN_EXECUTIVE",
    "departmentId": "DEP_FIN_EXECUTIVE",
    "officeId": "OFF_FIN_CFO",
    "portalId": "PORTAL_FIN_CFO",
    "moduleId": "MOD_FT_MERCHANT_ACQUIRING",
    "name": "Merchant Acquiring Autonomous Engine",
    "description": "Authoritative capability providing enterprise operations for Merchant Acquiring Autonomous Engine",
    "route": "/products/fintech/mod-ft-merchant-acquiring",
    "actionIds": [
      "ACT_CAP_FT_MERCHANT_ACQUIRING_EXECUTE",
      "ACT_CAP_FT_MERCHANT_ACQUIRING_EXPORT",
      "ACT_CAP_FT_MERCHANT_ACQUIRING_REFRESH"
    ],
    "workflowIds": [
      "WF_KYCONBOARDINGWORKFLOW",
      "WF_PAYMENTPROCESSINGWORKFLOW"
    ],
    "aiCapabilityIds": [
      "AI_FINTECHMODULEAGENTREGISTRY",
      "AI_FINTECHCAPABILITYREGISTRY"
    ],
    "permissionIds": [
      "ROLE_CFO",
      "ROLE_CONTROLLER",
      "ROLE_ACCOUNTANT"
    ],
    "uiMetadataId": "UIM_CAP_FT_MERCHANT_ACQUIRING",
    "runtimeComponentId": "RTC_CAP_FT_MERCHANT_ACQUIRING",
    "status": "VERIFIED"
  },
  {
    "capabilityId": "CAP_FT_MERCHANT_SERVICES",
    "productId": "JUMO-FINTECH",
    "directorateId": "DIR_FIN_EXECUTIVE",
    "departmentId": "DEP_FIN_EXECUTIVE",
    "officeId": "OFF_FIN_CFO",
    "portalId": "PORTAL_FIN_CFO",
    "moduleId": "MOD_FT_MERCHANT_SERVICES",
    "name": "Merchant Services Autonomous Engine",
    "description": "Authoritative capability providing enterprise operations for Merchant Services Autonomous Engine",
    "route": "/products/fintech/mod-ft-merchant-services",
    "actionIds": [
      "ACT_CAP_FT_MERCHANT_SERVICES_EXECUTE",
      "ACT_CAP_FT_MERCHANT_SERVICES_EXPORT",
      "ACT_CAP_FT_MERCHANT_SERVICES_REFRESH"
    ],
    "workflowIds": [
      "WF_KYCONBOARDINGWORKFLOW",
      "WF_PAYMENTPROCESSINGWORKFLOW"
    ],
    "aiCapabilityIds": [
      "AI_FINTECHMODULEAGENTREGISTRY",
      "AI_FINTECHCAPABILITYREGISTRY"
    ],
    "permissionIds": [
      "ROLE_CFO",
      "ROLE_CONTROLLER",
      "ROLE_ACCOUNTANT"
    ],
    "uiMetadataId": "UIM_CAP_FT_MERCHANT_SERVICES",
    "runtimeComponentId": "RTC_CAP_FT_MERCHANT_SERVICES",
    "status": "VERIFIED"
  },
  {
    "capabilityId": "CAP_FT_MICROFINANCE",
    "productId": "JUMO-FINTECH",
    "directorateId": "DIR_FIN_EXECUTIVE",
    "departmentId": "DEP_FIN_EXECUTIVE",
    "officeId": "OFF_FIN_CFO",
    "portalId": "PORTAL_FIN_CFO",
    "moduleId": "MOD_FT_MICROFINANCE",
    "name": "Microfinance Autonomous Engine",
    "description": "Authoritative capability providing enterprise operations for Microfinance Autonomous Engine",
    "route": "/products/fintech/mod-ft-microfinance",
    "actionIds": [
      "ACT_CAP_FT_MICROFINANCE_EXECUTE",
      "ACT_CAP_FT_MICROFINANCE_EXPORT",
      "ACT_CAP_FT_MICROFINANCE_REFRESH"
    ],
    "workflowIds": [
      "WF_KYCONBOARDINGWORKFLOW",
      "WF_PAYMENTPROCESSINGWORKFLOW"
    ],
    "aiCapabilityIds": [
      "AI_FINTECHMODULEAGENTREGISTRY",
      "AI_FINTECHCAPABILITYREGISTRY"
    ],
    "permissionIds": [
      "ROLE_CFO",
      "ROLE_CONTROLLER",
      "ROLE_ACCOUNTANT"
    ],
    "uiMetadataId": "UIM_CAP_FT_MICROFINANCE",
    "runtimeComponentId": "RTC_CAP_FT_MICROFINANCE",
    "status": "VERIFIED"
  },
  {
    "capabilityId": "CAP_FT_MOBILE_MONEY",
    "productId": "JUMO-FINTECH",
    "directorateId": "DIR_FIN_EXECUTIVE",
    "departmentId": "DEP_FIN_EXECUTIVE",
    "officeId": "OFF_FIN_CFO",
    "portalId": "PORTAL_FIN_CFO",
    "moduleId": "MOD_FT_MOBILE_MONEY",
    "name": "Mobile Money Autonomous Engine",
    "description": "Authoritative capability providing enterprise operations for Mobile Money Autonomous Engine",
    "route": "/products/fintech/mod-ft-mobile-money",
    "actionIds": [
      "ACT_CAP_FT_MOBILE_MONEY_EXECUTE",
      "ACT_CAP_FT_MOBILE_MONEY_EXPORT",
      "ACT_CAP_FT_MOBILE_MONEY_REFRESH"
    ],
    "workflowIds": [
      "WF_KYCONBOARDINGWORKFLOW",
      "WF_PAYMENTPROCESSINGWORKFLOW"
    ],
    "aiCapabilityIds": [
      "AI_FINTECHMODULEAGENTREGISTRY",
      "AI_FINTECHCAPABILITYREGISTRY"
    ],
    "permissionIds": [
      "ROLE_CFO",
      "ROLE_CONTROLLER",
      "ROLE_ACCOUNTANT"
    ],
    "uiMetadataId": "UIM_CAP_FT_MOBILE_MONEY",
    "runtimeComponentId": "RTC_CAP_FT_MOBILE_MONEY",
    "status": "VERIFIED"
  },
  {
    "capabilityId": "CAP_FT_MULTI_CURRENCY",
    "productId": "JUMO-FINTECH",
    "directorateId": "DIR_FIN_EXECUTIVE",
    "departmentId": "DEP_FIN_EXECUTIVE",
    "officeId": "OFF_FIN_CFO",
    "portalId": "PORTAL_FIN_CFO",
    "moduleId": "MOD_FT_MULTI_CURRENCY",
    "name": "Multi Currency Autonomous Engine",
    "description": "Authoritative capability providing enterprise operations for Multi Currency Autonomous Engine",
    "route": "/products/fintech/mod-ft-multi-currency",
    "actionIds": [
      "ACT_CAP_FT_MULTI_CURRENCY_EXECUTE",
      "ACT_CAP_FT_MULTI_CURRENCY_EXPORT",
      "ACT_CAP_FT_MULTI_CURRENCY_REFRESH"
    ],
    "workflowIds": [
      "WF_KYCONBOARDINGWORKFLOW",
      "WF_PAYMENTPROCESSINGWORKFLOW"
    ],
    "aiCapabilityIds": [
      "AI_FINTECHMODULEAGENTREGISTRY",
      "AI_FINTECHCAPABILITYREGISTRY"
    ],
    "permissionIds": [
      "ROLE_CFO",
      "ROLE_CONTROLLER",
      "ROLE_ACCOUNTANT"
    ],
    "uiMetadataId": "UIM_CAP_FT_MULTI_CURRENCY",
    "runtimeComponentId": "RTC_CAP_FT_MULTI_CURRENCY",
    "status": "VERIFIED"
  },
  {
    "capabilityId": "CAP_FT_PAYMENT_GATEWAY",
    "productId": "JUMO-FINTECH",
    "directorateId": "DIR_FIN_EXECUTIVE",
    "departmentId": "DEP_FIN_EXECUTIVE",
    "officeId": "OFF_FIN_CFO",
    "portalId": "PORTAL_FIN_CFO",
    "moduleId": "MOD_FT_PAYMENT_GATEWAY",
    "name": "Payment Gateway Autonomous Engine",
    "description": "Authoritative capability providing enterprise operations for Payment Gateway Autonomous Engine",
    "route": "/products/fintech/mod-ft-payment-gateway",
    "actionIds": [
      "ACT_CAP_FT_PAYMENT_GATEWAY_EXECUTE",
      "ACT_CAP_FT_PAYMENT_GATEWAY_EXPORT",
      "ACT_CAP_FT_PAYMENT_GATEWAY_REFRESH"
    ],
    "workflowIds": [
      "WF_KYCONBOARDINGWORKFLOW",
      "WF_PAYMENTPROCESSINGWORKFLOW"
    ],
    "aiCapabilityIds": [
      "AI_FINTECHMODULEAGENTREGISTRY",
      "AI_FINTECHCAPABILITYREGISTRY"
    ],
    "permissionIds": [
      "ROLE_CFO",
      "ROLE_CONTROLLER",
      "ROLE_ACCOUNTANT"
    ],
    "uiMetadataId": "UIM_CAP_FT_PAYMENT_GATEWAY",
    "runtimeComponentId": "RTC_CAP_FT_PAYMENT_GATEWAY",
    "status": "VERIFIED"
  },
  {
    "capabilityId": "CAP_FT_PAYMENT_SWITCHING",
    "productId": "JUMO-FINTECH",
    "directorateId": "DIR_FIN_EXECUTIVE",
    "departmentId": "DEP_FIN_EXECUTIVE",
    "officeId": "OFF_FIN_CFO",
    "portalId": "PORTAL_FIN_CFO",
    "moduleId": "MOD_FT_PAYMENT_SWITCHING",
    "name": "Payment Switching Autonomous Engine",
    "description": "Authoritative capability providing enterprise operations for Payment Switching Autonomous Engine",
    "route": "/products/fintech/mod-ft-payment-switching",
    "actionIds": [
      "ACT_CAP_FT_PAYMENT_SWITCHING_EXECUTE",
      "ACT_CAP_FT_PAYMENT_SWITCHING_EXPORT",
      "ACT_CAP_FT_PAYMENT_SWITCHING_REFRESH"
    ],
    "workflowIds": [
      "WF_KYCONBOARDINGWORKFLOW",
      "WF_PAYMENTPROCESSINGWORKFLOW"
    ],
    "aiCapabilityIds": [
      "AI_FINTECHMODULEAGENTREGISTRY",
      "AI_FINTECHCAPABILITYREGISTRY"
    ],
    "permissionIds": [
      "ROLE_CFO",
      "ROLE_CONTROLLER",
      "ROLE_ACCOUNTANT"
    ],
    "uiMetadataId": "UIM_CAP_FT_PAYMENT_SWITCHING",
    "runtimeComponentId": "RTC_CAP_FT_PAYMENT_SWITCHING",
    "status": "VERIFIED"
  },
  {
    "capabilityId": "CAP_FT_PAYOUTS",
    "productId": "JUMO-FINTECH",
    "directorateId": "DIR_FIN_EXECUTIVE",
    "departmentId": "DEP_FIN_EXECUTIVE",
    "officeId": "OFF_FIN_CFO",
    "portalId": "PORTAL_FIN_CFO",
    "moduleId": "MOD_FT_PAYOUTS",
    "name": "Payouts Autonomous Engine",
    "description": "Authoritative capability providing enterprise operations for Payouts Autonomous Engine",
    "route": "/products/fintech/mod-ft-payouts",
    "actionIds": [
      "ACT_CAP_FT_PAYOUTS_EXECUTE",
      "ACT_CAP_FT_PAYOUTS_EXPORT",
      "ACT_CAP_FT_PAYOUTS_REFRESH"
    ],
    "workflowIds": [
      "WF_KYCONBOARDINGWORKFLOW",
      "WF_PAYMENTPROCESSINGWORKFLOW"
    ],
    "aiCapabilityIds": [
      "AI_FINTECHMODULEAGENTREGISTRY",
      "AI_FINTECHCAPABILITYREGISTRY"
    ],
    "permissionIds": [
      "ROLE_CFO",
      "ROLE_CONTROLLER",
      "ROLE_ACCOUNTANT"
    ],
    "uiMetadataId": "UIM_CAP_FT_PAYOUTS",
    "runtimeComponentId": "RTC_CAP_FT_PAYOUTS",
    "status": "VERIFIED"
  },
  {
    "capabilityId": "CAP_FT_PAYROLL",
    "productId": "JUMO-FINTECH",
    "directorateId": "DIR_FIN_EXECUTIVE",
    "departmentId": "DEP_FIN_EXECUTIVE",
    "officeId": "OFF_FIN_CFO",
    "portalId": "PORTAL_FIN_CFO",
    "moduleId": "MOD_FT_PAYROLL",
    "name": "Payroll Autonomous Engine",
    "description": "Authoritative capability providing enterprise operations for Payroll Autonomous Engine",
    "route": "/products/fintech/mod-ft-payroll",
    "actionIds": [
      "ACT_CAP_FT_PAYROLL_EXECUTE",
      "ACT_CAP_FT_PAYROLL_EXPORT",
      "ACT_CAP_FT_PAYROLL_REFRESH"
    ],
    "workflowIds": [
      "WF_KYCONBOARDINGWORKFLOW",
      "WF_PAYMENTPROCESSINGWORKFLOW"
    ],
    "aiCapabilityIds": [
      "AI_FINTECHMODULEAGENTREGISTRY",
      "AI_FINTECHCAPABILITYREGISTRY"
    ],
    "permissionIds": [
      "ROLE_CFO",
      "ROLE_CONTROLLER",
      "ROLE_ACCOUNTANT"
    ],
    "uiMetadataId": "UIM_CAP_FT_PAYROLL",
    "runtimeComponentId": "RTC_CAP_FT_PAYROLL",
    "status": "VERIFIED"
  },
  {
    "capabilityId": "CAP_FT_REMITTANCES",
    "productId": "JUMO-FINTECH",
    "directorateId": "DIR_FIN_EXECUTIVE",
    "departmentId": "DEP_FIN_EXECUTIVE",
    "officeId": "OFF_FIN_CFO",
    "portalId": "PORTAL_FIN_CFO",
    "moduleId": "MOD_FT_REMITTANCES",
    "name": "Remittances Autonomous Engine",
    "description": "Authoritative capability providing enterprise operations for Remittances Autonomous Engine",
    "route": "/products/fintech/mod-ft-remittances",
    "actionIds": [
      "ACT_CAP_FT_REMITTANCES_EXECUTE",
      "ACT_CAP_FT_REMITTANCES_EXPORT",
      "ACT_CAP_FT_REMITTANCES_REFRESH"
    ],
    "workflowIds": [
      "WF_KYCONBOARDINGWORKFLOW",
      "WF_PAYMENTPROCESSINGWORKFLOW"
    ],
    "aiCapabilityIds": [
      "AI_FINTECHMODULEAGENTREGISTRY",
      "AI_FINTECHCAPABILITYREGISTRY"
    ],
    "permissionIds": [
      "ROLE_CFO",
      "ROLE_CONTROLLER",
      "ROLE_ACCOUNTANT"
    ],
    "uiMetadataId": "UIM_CAP_FT_REMITTANCES",
    "runtimeComponentId": "RTC_CAP_FT_REMITTANCES",
    "status": "VERIFIED"
  },
  {
    "capabilityId": "CAP_FT_SACCO",
    "productId": "JUMO-FINTECH",
    "directorateId": "DIR_FIN_EXECUTIVE",
    "departmentId": "DEP_FIN_EXECUTIVE",
    "officeId": "OFF_FIN_CFO",
    "portalId": "PORTAL_FIN_CFO",
    "moduleId": "MOD_FT_SACCO",
    "name": "Sacco Autonomous Engine",
    "description": "Authoritative capability providing enterprise operations for Sacco Autonomous Engine",
    "route": "/products/fintech/mod-ft-sacco",
    "actionIds": [
      "ACT_CAP_FT_SACCO_EXECUTE",
      "ACT_CAP_FT_SACCO_EXPORT",
      "ACT_CAP_FT_SACCO_REFRESH"
    ],
    "workflowIds": [
      "WF_KYCONBOARDINGWORKFLOW",
      "WF_PAYMENTPROCESSINGWORKFLOW"
    ],
    "aiCapabilityIds": [
      "AI_FINTECHMODULEAGENTREGISTRY",
      "AI_FINTECHCAPABILITYREGISTRY"
    ],
    "permissionIds": [
      "ROLE_CFO",
      "ROLE_CONTROLLER",
      "ROLE_ACCOUNTANT"
    ],
    "uiMetadataId": "UIM_CAP_FT_SACCO",
    "runtimeComponentId": "RTC_CAP_FT_SACCO",
    "status": "VERIFIED"
  },
  {
    "capabilityId": "CAP_FT_SAVINGS",
    "productId": "JUMO-FINTECH",
    "directorateId": "DIR_FIN_EXECUTIVE",
    "departmentId": "DEP_FIN_EXECUTIVE",
    "officeId": "OFF_FIN_CFO",
    "portalId": "PORTAL_FIN_CFO",
    "moduleId": "MOD_FT_SAVINGS",
    "name": "Savings Autonomous Engine",
    "description": "Authoritative capability providing enterprise operations for Savings Autonomous Engine",
    "route": "/products/fintech/mod-ft-savings",
    "actionIds": [
      "ACT_CAP_FT_SAVINGS_EXECUTE",
      "ACT_CAP_FT_SAVINGS_EXPORT",
      "ACT_CAP_FT_SAVINGS_REFRESH"
    ],
    "workflowIds": [
      "WF_KYCONBOARDINGWORKFLOW",
      "WF_PAYMENTPROCESSINGWORKFLOW"
    ],
    "aiCapabilityIds": [
      "AI_FINTECHMODULEAGENTREGISTRY",
      "AI_FINTECHCAPABILITYREGISTRY"
    ],
    "permissionIds": [
      "ROLE_CFO",
      "ROLE_CONTROLLER",
      "ROLE_ACCOUNTANT"
    ],
    "uiMetadataId": "UIM_CAP_FT_SAVINGS",
    "runtimeComponentId": "RTC_CAP_FT_SAVINGS",
    "status": "VERIFIED"
  },
  {
    "capabilityId": "CAP_FT_SECURITIES_CUSTODY",
    "productId": "JUMO-FINTECH",
    "directorateId": "DIR_FIN_EXECUTIVE",
    "departmentId": "DEP_FIN_EXECUTIVE",
    "officeId": "OFF_FIN_CFO",
    "portalId": "PORTAL_FIN_CFO",
    "moduleId": "MOD_FT_SECURITIES_CUSTODY",
    "name": "Securities Custody Autonomous Engine",
    "description": "Authoritative capability providing enterprise operations for Securities Custody Autonomous Engine",
    "route": "/products/fintech/mod-ft-securities-custody",
    "actionIds": [
      "ACT_CAP_FT_SECURITIES_CUSTODY_EXECUTE",
      "ACT_CAP_FT_SECURITIES_CUSTODY_EXPORT",
      "ACT_CAP_FT_SECURITIES_CUSTODY_REFRESH"
    ],
    "workflowIds": [
      "WF_KYCONBOARDINGWORKFLOW",
      "WF_PAYMENTPROCESSINGWORKFLOW"
    ],
    "aiCapabilityIds": [
      "AI_FINTECHMODULEAGENTREGISTRY",
      "AI_FINTECHCAPABILITYREGISTRY"
    ],
    "permissionIds": [
      "ROLE_CFO",
      "ROLE_CONTROLLER",
      "ROLE_ACCOUNTANT"
    ],
    "uiMetadataId": "UIM_CAP_FT_SECURITIES_CUSTODY",
    "runtimeComponentId": "RTC_CAP_FT_SECURITIES_CUSTODY",
    "status": "VERIFIED"
  },
  {
    "capabilityId": "CAP_FT_STABLECOIN",
    "productId": "JUMO-FINTECH",
    "directorateId": "DIR_FIN_EXECUTIVE",
    "departmentId": "DEP_FIN_EXECUTIVE",
    "officeId": "OFF_FIN_CFO",
    "portalId": "PORTAL_FIN_CFO",
    "moduleId": "MOD_FT_STABLECOIN",
    "name": "Stablecoin Autonomous Engine",
    "description": "Authoritative capability providing enterprise operations for Stablecoin Autonomous Engine",
    "route": "/products/fintech/mod-ft-stablecoin",
    "actionIds": [
      "ACT_CAP_FT_STABLECOIN_EXECUTE",
      "ACT_CAP_FT_STABLECOIN_EXPORT",
      "ACT_CAP_FT_STABLECOIN_REFRESH"
    ],
    "workflowIds": [
      "WF_KYCONBOARDINGWORKFLOW",
      "WF_PAYMENTPROCESSINGWORKFLOW"
    ],
    "aiCapabilityIds": [
      "AI_FINTECHMODULEAGENTREGISTRY",
      "AI_FINTECHCAPABILITYREGISTRY"
    ],
    "permissionIds": [
      "ROLE_CFO",
      "ROLE_CONTROLLER",
      "ROLE_ACCOUNTANT"
    ],
    "uiMetadataId": "UIM_CAP_FT_STABLECOIN",
    "runtimeComponentId": "RTC_CAP_FT_STABLECOIN",
    "status": "VERIFIED"
  },
  {
    "capabilityId": "CAP_FT_TAX_REVENUE",
    "productId": "JUMO-FINTECH",
    "directorateId": "DIR_FIN_EXECUTIVE",
    "departmentId": "DEP_FIN_EXECUTIVE",
    "officeId": "OFF_FIN_CFO",
    "portalId": "PORTAL_FIN_CFO",
    "moduleId": "MOD_FT_TAX_REVENUE",
    "name": "Tax Revenue Autonomous Engine",
    "description": "Authoritative capability providing enterprise operations for Tax Revenue Autonomous Engine",
    "route": "/products/fintech/mod-ft-tax-revenue",
    "actionIds": [
      "ACT_CAP_FT_TAX_REVENUE_EXECUTE",
      "ACT_CAP_FT_TAX_REVENUE_EXPORT",
      "ACT_CAP_FT_TAX_REVENUE_REFRESH"
    ],
    "workflowIds": [
      "WF_KYCONBOARDINGWORKFLOW",
      "WF_PAYMENTPROCESSINGWORKFLOW"
    ],
    "aiCapabilityIds": [
      "AI_FINTECHMODULEAGENTREGISTRY",
      "AI_FINTECHCAPABILITYREGISTRY"
    ],
    "permissionIds": [
      "ROLE_CFO",
      "ROLE_CONTROLLER",
      "ROLE_ACCOUNTANT"
    ],
    "uiMetadataId": "UIM_CAP_FT_TAX_REVENUE",
    "runtimeComponentId": "RTC_CAP_FT_TAX_REVENUE",
    "status": "VERIFIED"
  },
  {
    "capabilityId": "CAP_FT_TRADE_FINANCE",
    "productId": "JUMO-FINTECH",
    "directorateId": "DIR_FIN_EXECUTIVE",
    "departmentId": "DEP_FIN_EXECUTIVE",
    "officeId": "OFF_FIN_CFO",
    "portalId": "PORTAL_FIN_CFO",
    "moduleId": "MOD_FT_TRADE_FINANCE",
    "name": "Trade Finance Autonomous Engine",
    "description": "Authoritative capability providing enterprise operations for Trade Finance Autonomous Engine",
    "route": "/products/fintech/mod-ft-trade-finance",
    "actionIds": [
      "ACT_CAP_FT_TRADE_FINANCE_EXECUTE",
      "ACT_CAP_FT_TRADE_FINANCE_EXPORT",
      "ACT_CAP_FT_TRADE_FINANCE_REFRESH"
    ],
    "workflowIds": [
      "WF_KYCONBOARDINGWORKFLOW",
      "WF_PAYMENTPROCESSINGWORKFLOW"
    ],
    "aiCapabilityIds": [
      "AI_FINTECHMODULEAGENTREGISTRY",
      "AI_FINTECHCAPABILITYREGISTRY"
    ],
    "permissionIds": [
      "ROLE_CFO",
      "ROLE_CONTROLLER",
      "ROLE_ACCOUNTANT"
    ],
    "uiMetadataId": "UIM_CAP_FT_TRADE_FINANCE",
    "runtimeComponentId": "RTC_CAP_FT_TRADE_FINANCE",
    "status": "VERIFIED"
  },
  {
    "capabilityId": "CAP_FT_TREASURY",
    "productId": "JUMO-FINTECH",
    "directorateId": "DIR_FIN_EXECUTIVE",
    "departmentId": "DEP_FIN_EXECUTIVE",
    "officeId": "OFF_FIN_CFO",
    "portalId": "PORTAL_FIN_CFO",
    "moduleId": "MOD_FT_TREASURY",
    "name": "Treasury Autonomous Engine",
    "description": "Authoritative capability providing enterprise operations for Treasury Autonomous Engine",
    "route": "/products/fintech/mod-ft-treasury",
    "actionIds": [
      "ACT_CAP_FT_TREASURY_EXECUTE",
      "ACT_CAP_FT_TREASURY_EXPORT",
      "ACT_CAP_FT_TREASURY_REFRESH"
    ],
    "workflowIds": [
      "WF_KYCONBOARDINGWORKFLOW",
      "WF_PAYMENTPROCESSINGWORKFLOW"
    ],
    "aiCapabilityIds": [
      "AI_FINTECHMODULEAGENTREGISTRY",
      "AI_FINTECHCAPABILITYREGISTRY"
    ],
    "permissionIds": [
      "ROLE_CFO",
      "ROLE_CONTROLLER",
      "ROLE_ACCOUNTANT"
    ],
    "uiMetadataId": "UIM_CAP_FT_TREASURY",
    "runtimeComponentId": "RTC_CAP_FT_TREASURY",
    "status": "VERIFIED"
  },
  {
    "capabilityId": "CAP_NP_ECD_MILESTONES",
    "productId": "JUMO-NURSERY-PRIMARY-ERP",
    "directorateId": "DIR_NP_GOVERNANCE",
    "departmentId": "DEP_NP_EXECUTIVE",
    "officeId": "OFF_NP_HEAD",
    "portalId": "PORTAL_EDU_HEAD",
    "moduleId": "MOD_NP_ECD_MILESTONES",
    "name": "Early Childhood Development & Milestones Engine",
    "description": "Authoritative capability providing enterprise operations for Early Childhood Development & Milestones Engine",
    "route": "/products/nursery-primary/mod-np-ecd-milestones",
    "actionIds": [
      "ACT_CAP_NP_ECD_MILESTONES_EXECUTE",
      "ACT_CAP_NP_ECD_MILESTONES_EXPORT",
      "ACT_CAP_NP_ECD_MILESTONES_REFRESH"
    ],
    "workflowIds": [
      "WF_STUDENTENROLLMENTWORKFLOW",
      "WF_FEEBILLINGWORKFLOW"
    ],
    "aiCapabilityIds": [
      "AI_PRIMARYACADEMICAGENT",
      "AI_ECDMILESTONETRACKERAGENT"
    ],
    "permissionIds": [
      "ROLE_HEAD_TEACHER",
      "ROLE_PRIMARY_DOS",
      "ROLE_ECD_TEACHER"
    ],
    "uiMetadataId": "UIM_CAP_NP_ECD_MILESTONES",
    "runtimeComponentId": "RTC_CAP_NP_ECD_MILESTONES",
    "status": "VERIFIED"
  },
  {
    "capabilityId": "CAP_NP_PRIMARY_ACADEMICS",
    "productId": "JUMO-NURSERY-PRIMARY-ERP",
    "directorateId": "DIR_NP_GOVERNANCE",
    "departmentId": "DEP_NP_EXECUTIVE",
    "officeId": "OFF_NP_HEAD",
    "portalId": "PORTAL_EDU_HEAD",
    "moduleId": "MOD_NP_PRIMARY_ACADEMICS",
    "name": "Primary Curriculum & Assessment Engine",
    "description": "Authoritative capability providing enterprise operations for Primary Curriculum & Assessment Engine",
    "route": "/products/nursery-primary/mod-np-primary-academics",
    "actionIds": [
      "ACT_CAP_NP_PRIMARY_ACADEMICS_EXECUTE",
      "ACT_CAP_NP_PRIMARY_ACADEMICS_EXPORT",
      "ACT_CAP_NP_PRIMARY_ACADEMICS_REFRESH"
    ],
    "workflowIds": [
      "WF_STUDENTENROLLMENTWORKFLOW",
      "WF_FEEBILLINGWORKFLOW"
    ],
    "aiCapabilityIds": [
      "AI_PRIMARYACADEMICAGENT",
      "AI_ECDMILESTONETRACKERAGENT"
    ],
    "permissionIds": [
      "ROLE_HEAD_TEACHER",
      "ROLE_PRIMARY_DOS",
      "ROLE_ECD_TEACHER"
    ],
    "uiMetadataId": "UIM_CAP_NP_PRIMARY_ACADEMICS",
    "runtimeComponentId": "RTC_CAP_NP_PRIMARY_ACADEMICS",
    "status": "VERIFIED"
  },
  {
    "capabilityId": "CAP_NP_PRIMARY_DOS",
    "productId": "JUMO-NURSERY-PRIMARY-ERP",
    "directorateId": "DIR_NP_GOVERNANCE",
    "departmentId": "DEP_NP_EXECUTIVE",
    "officeId": "OFF_NP_HEAD",
    "portalId": "PORTAL_EDU_HEAD",
    "moduleId": "MOD_NP_PRIMARY_DOS",
    "name": "Primary Studies & Timetabling Engine",
    "description": "Authoritative capability providing enterprise operations for Primary Studies & Timetabling Engine",
    "route": "/products/nursery-primary/mod-np-primary-dos",
    "actionIds": [
      "ACT_CAP_NP_PRIMARY_DOS_EXECUTE",
      "ACT_CAP_NP_PRIMARY_DOS_EXPORT",
      "ACT_CAP_NP_PRIMARY_DOS_REFRESH"
    ],
    "workflowIds": [
      "WF_STUDENTENROLLMENTWORKFLOW",
      "WF_FEEBILLINGWORKFLOW"
    ],
    "aiCapabilityIds": [
      "AI_PRIMARYACADEMICAGENT",
      "AI_ECDMILESTONETRACKERAGENT"
    ],
    "permissionIds": [
      "ROLE_HEAD_TEACHER",
      "ROLE_PRIMARY_DOS",
      "ROLE_ECD_TEACHER"
    ],
    "uiMetadataId": "UIM_CAP_NP_PRIMARY_DOS",
    "runtimeComponentId": "RTC_CAP_NP_PRIMARY_DOS",
    "status": "VERIFIED"
  },
  {
    "capabilityId": "CAP_NP_ADMISSIONS",
    "productId": "JUMO-NURSERY-PRIMARY-ERP",
    "directorateId": "DIR_NP_GOVERNANCE",
    "departmentId": "DEP_NP_EXECUTIVE",
    "officeId": "OFF_NP_HEAD",
    "portalId": "PORTAL_EDU_HEAD",
    "moduleId": "MOD_NP_ADMISSIONS",
    "name": "Consolidated Student Admissions Engine",
    "description": "Authoritative capability providing enterprise operations for Consolidated Student Admissions Engine",
    "route": "/products/nursery-primary/mod-np-admissions",
    "actionIds": [
      "ACT_CAP_NP_ADMISSIONS_EXECUTE",
      "ACT_CAP_NP_ADMISSIONS_EXPORT",
      "ACT_CAP_NP_ADMISSIONS_REFRESH"
    ],
    "workflowIds": [
      "WF_STUDENTENROLLMENTWORKFLOW",
      "WF_FEEBILLINGWORKFLOW"
    ],
    "aiCapabilityIds": [
      "AI_PRIMARYACADEMICAGENT",
      "AI_ECDMILESTONETRACKERAGENT"
    ],
    "permissionIds": [
      "ROLE_HEAD_TEACHER",
      "ROLE_PRIMARY_DOS",
      "ROLE_ECD_TEACHER"
    ],
    "uiMetadataId": "UIM_CAP_NP_ADMISSIONS",
    "runtimeComponentId": "RTC_CAP_NP_ADMISSIONS",
    "status": "VERIFIED"
  },
  {
    "capabilityId": "CAP_NP_BURSARY",
    "productId": "JUMO-NURSERY-PRIMARY-ERP",
    "directorateId": "DIR_NP_GOVERNANCE",
    "departmentId": "DEP_NP_EXECUTIVE",
    "officeId": "OFF_NP_HEAD",
    "portalId": "PORTAL_EDU_HEAD",
    "moduleId": "MOD_NP_BURSARY",
    "name": "Fee Invoicing & Bursar Ledger Engine",
    "description": "Authoritative capability providing enterprise operations for Fee Invoicing & Bursar Ledger Engine",
    "route": "/products/nursery-primary/mod-np-bursary",
    "actionIds": [
      "ACT_CAP_NP_BURSARY_EXECUTE",
      "ACT_CAP_NP_BURSARY_EXPORT",
      "ACT_CAP_NP_BURSARY_REFRESH"
    ],
    "workflowIds": [
      "WF_STUDENTENROLLMENTWORKFLOW",
      "WF_FEEBILLINGWORKFLOW"
    ],
    "aiCapabilityIds": [
      "AI_PRIMARYACADEMICAGENT",
      "AI_ECDMILESTONETRACKERAGENT"
    ],
    "permissionIds": [
      "ROLE_HEAD_TEACHER",
      "ROLE_PRIMARY_DOS",
      "ROLE_ECD_TEACHER"
    ],
    "uiMetadataId": "UIM_CAP_NP_BURSARY",
    "runtimeComponentId": "RTC_CAP_NP_BURSARY",
    "status": "VERIFIED"
  },
  {
    "capabilityId": "CAP_NP_SAFEGUARDING",
    "productId": "JUMO-NURSERY-PRIMARY-ERP",
    "directorateId": "DIR_NP_GOVERNANCE",
    "departmentId": "DEP_NP_EXECUTIVE",
    "officeId": "OFF_NP_HEAD",
    "portalId": "PORTAL_EDU_HEAD",
    "moduleId": "MOD_NP_SAFEGUARDING",
    "name": "Child Protection & Safeguarding Engine",
    "description": "Authoritative capability providing enterprise operations for Child Protection & Safeguarding Engine",
    "route": "/products/nursery-primary/mod-np-safeguarding",
    "actionIds": [
      "ACT_CAP_NP_SAFEGUARDING_EXECUTE",
      "ACT_CAP_NP_SAFEGUARDING_EXPORT",
      "ACT_CAP_NP_SAFEGUARDING_REFRESH"
    ],
    "workflowIds": [
      "WF_STUDENTENROLLMENTWORKFLOW",
      "WF_FEEBILLINGWORKFLOW"
    ],
    "aiCapabilityIds": [
      "AI_PRIMARYACADEMICAGENT",
      "AI_ECDMILESTONETRACKERAGENT"
    ],
    "permissionIds": [
      "ROLE_HEAD_TEACHER",
      "ROLE_PRIMARY_DOS",
      "ROLE_ECD_TEACHER"
    ],
    "uiMetadataId": "UIM_CAP_NP_SAFEGUARDING",
    "runtimeComponentId": "RTC_CAP_NP_SAFEGUARDING",
    "status": "VERIFIED"
  },
  {
    "capabilityId": "CAP_NP_CLINIC",
    "productId": "JUMO-NURSERY-PRIMARY-ERP",
    "directorateId": "DIR_NP_GOVERNANCE",
    "departmentId": "DEP_NP_EXECUTIVE",
    "officeId": "OFF_NP_HEAD",
    "portalId": "PORTAL_EDU_HEAD",
    "moduleId": "MOD_NP_CLINIC",
    "name": "Infirmary & Pediatric Health Engine",
    "description": "Authoritative capability providing enterprise operations for Infirmary & Pediatric Health Engine",
    "route": "/products/nursery-primary/mod-np-clinic",
    "actionIds": [
      "ACT_CAP_NP_CLINIC_EXECUTE",
      "ACT_CAP_NP_CLINIC_EXPORT",
      "ACT_CAP_NP_CLINIC_REFRESH"
    ],
    "workflowIds": [
      "WF_STUDENTENROLLMENTWORKFLOW",
      "WF_FEEBILLINGWORKFLOW"
    ],
    "aiCapabilityIds": [
      "AI_PRIMARYACADEMICAGENT",
      "AI_ECDMILESTONETRACKERAGENT"
    ],
    "permissionIds": [
      "ROLE_HEAD_TEACHER",
      "ROLE_PRIMARY_DOS",
      "ROLE_ECD_TEACHER"
    ],
    "uiMetadataId": "UIM_CAP_NP_CLINIC",
    "runtimeComponentId": "RTC_CAP_NP_CLINIC",
    "status": "VERIFIED"
  },
  {
    "capabilityId": "CAP_NP_CATERING",
    "productId": "JUMO-NURSERY-PRIMARY-ERP",
    "directorateId": "DIR_NP_GOVERNANCE",
    "departmentId": "DEP_NP_EXECUTIVE",
    "officeId": "OFF_NP_HEAD",
    "portalId": "PORTAL_EDU_HEAD",
    "moduleId": "MOD_NP_CATERING",
    "name": "Nutrition & School Dining Engine",
    "description": "Authoritative capability providing enterprise operations for Nutrition & School Dining Engine",
    "route": "/products/nursery-primary/mod-np-catering",
    "actionIds": [
      "ACT_CAP_NP_CATERING_EXECUTE",
      "ACT_CAP_NP_CATERING_EXPORT",
      "ACT_CAP_NP_CATERING_REFRESH"
    ],
    "workflowIds": [
      "WF_STUDENTENROLLMENTWORKFLOW",
      "WF_FEEBILLINGWORKFLOW"
    ],
    "aiCapabilityIds": [
      "AI_PRIMARYACADEMICAGENT",
      "AI_ECDMILESTONETRACKERAGENT"
    ],
    "permissionIds": [
      "ROLE_HEAD_TEACHER",
      "ROLE_PRIMARY_DOS",
      "ROLE_ECD_TEACHER"
    ],
    "uiMetadataId": "UIM_CAP_NP_CATERING",
    "runtimeComponentId": "RTC_CAP_NP_CATERING",
    "status": "VERIFIED"
  },
  {
    "capabilityId": "CAP_NP_TRANSPORT",
    "productId": "JUMO-NURSERY-PRIMARY-ERP",
    "directorateId": "DIR_NP_GOVERNANCE",
    "departmentId": "DEP_NP_EXECUTIVE",
    "officeId": "OFF_NP_HEAD",
    "portalId": "PORTAL_EDU_HEAD",
    "moduleId": "MOD_NP_TRANSPORT",
    "name": "Student Bus Routing & Tracking Engine",
    "description": "Authoritative capability providing enterprise operations for Student Bus Routing & Tracking Engine",
    "route": "/products/nursery-primary/mod-np-transport",
    "actionIds": [
      "ACT_CAP_NP_TRANSPORT_EXECUTE",
      "ACT_CAP_NP_TRANSPORT_EXPORT",
      "ACT_CAP_NP_TRANSPORT_REFRESH"
    ],
    "workflowIds": [
      "WF_STUDENTENROLLMENTWORKFLOW",
      "WF_FEEBILLINGWORKFLOW"
    ],
    "aiCapabilityIds": [
      "AI_PRIMARYACADEMICAGENT",
      "AI_ECDMILESTONETRACKERAGENT"
    ],
    "permissionIds": [
      "ROLE_HEAD_TEACHER",
      "ROLE_PRIMARY_DOS",
      "ROLE_ECD_TEACHER"
    ],
    "uiMetadataId": "UIM_CAP_NP_TRANSPORT",
    "runtimeComponentId": "RTC_CAP_NP_TRANSPORT",
    "status": "VERIFIED"
  },
  {
    "capabilityId": "CAP_SEC_HOD",
    "productId": "JUMO-SECONDARY-ERP",
    "directorateId": "DIR_SEC_GOVERNANCE",
    "departmentId": "DEP_SEC_EXECUTIVE",
    "officeId": "OFF_SEC_PRINCIPAL",
    "portalId": "PORTAL_SEC_PRINCIPAL",
    "moduleId": "MOD_SEC_HOD",
    "name": "Academic Departmental Heads (HOD) Engine",
    "description": "Authoritative capability providing enterprise operations for Academic Departmental Heads (HOD) Engine",
    "route": "/products/secondary/mod-sec-hod",
    "actionIds": [
      "ACT_CAP_SEC_HOD_EXECUTE",
      "ACT_CAP_SEC_HOD_EXPORT",
      "ACT_CAP_SEC_HOD_REFRESH"
    ],
    "workflowIds": [
      "WF_SECONDARYMATRICULATIONWORKFLOW",
      "WF_TERMEXAMINATIONGRADINGWORKFLOW"
    ],
    "aiCapabilityIds": [
      "AI_SECONDARYACADEMICAGENT",
      "AI_DEPARTMENTALHODCOORDINATOR"
    ],
    "permissionIds": [
      "ROLE_PRINCIPAL",
      "ROLE_SENATE_MEMBER",
      "ROLE_REGISTRAR"
    ],
    "uiMetadataId": "UIM_CAP_SEC_HOD",
    "runtimeComponentId": "RTC_CAP_SEC_HOD",
    "status": "VERIFIED"
  },
  {
    "capabilityId": "CAP_SEC_REGISTRAR",
    "productId": "JUMO-SECONDARY-ERP",
    "directorateId": "DIR_SEC_GOVERNANCE",
    "departmentId": "DEP_SEC_REGISTRAR",
    "officeId": "OFF_SEC_REGISTRAR",
    "portalId": "PORTAL_SEC_REGISTRAR",
    "moduleId": "MOD_SEC_REGISTRAR",
    "name": "Secondary Registry & Matriculation Engine",
    "description": "Authoritative capability providing enterprise operations for Secondary Registry & Matriculation Engine",
    "route": "/products/secondary/mod-sec-registrar",
    "actionIds": [
      "ACT_CAP_SEC_REGISTRAR_EXECUTE",
      "ACT_CAP_SEC_REGISTRAR_EXPORT",
      "ACT_CAP_SEC_REGISTRAR_REFRESH"
    ],
    "workflowIds": [
      "WF_SECONDARYMATRICULATIONWORKFLOW",
      "WF_TERMEXAMINATIONGRADINGWORKFLOW"
    ],
    "aiCapabilityIds": [
      "AI_SECONDARYACADEMICAGENT",
      "AI_DEPARTMENTALHODCOORDINATOR"
    ],
    "permissionIds": [
      "ROLE_PRINCIPAL",
      "ROLE_SENATE_MEMBER",
      "ROLE_REGISTRAR"
    ],
    "uiMetadataId": "UIM_CAP_SEC_REGISTRAR",
    "runtimeComponentId": "RTC_CAP_SEC_REGISTRAR",
    "status": "VERIFIED"
  },
  {
    "capabilityId": "CAP_SEC_BURSARY",
    "productId": "JUMO-SECONDARY-ERP",
    "directorateId": "DIR_SEC_GOVERNANCE",
    "departmentId": "DEP_SEC_EXECUTIVE",
    "officeId": "OFF_SEC_PRINCIPAL",
    "portalId": "PORTAL_SEC_PRINCIPAL",
    "moduleId": "MOD_SEC_BURSARY",
    "name": "Secondary Bursar & Tuitions Engine",
    "description": "Authoritative capability providing enterprise operations for Secondary Bursar & Tuitions Engine",
    "route": "/products/secondary/mod-sec-bursary",
    "actionIds": [
      "ACT_CAP_SEC_BURSARY_EXECUTE",
      "ACT_CAP_SEC_BURSARY_EXPORT",
      "ACT_CAP_SEC_BURSARY_REFRESH"
    ],
    "workflowIds": [
      "WF_SECONDARYMATRICULATIONWORKFLOW",
      "WF_TERMEXAMINATIONGRADINGWORKFLOW"
    ],
    "aiCapabilityIds": [
      "AI_SECONDARYACADEMICAGENT",
      "AI_DEPARTMENTALHODCOORDINATOR"
    ],
    "permissionIds": [
      "ROLE_PRINCIPAL",
      "ROLE_SENATE_MEMBER",
      "ROLE_REGISTRAR"
    ],
    "uiMetadataId": "UIM_CAP_SEC_BURSARY",
    "runtimeComponentId": "RTC_CAP_SEC_BURSARY",
    "status": "VERIFIED"
  },
  {
    "capabilityId": "CAP_SEC_SENATE",
    "productId": "JUMO-SECONDARY-ERP",
    "directorateId": "DIR_SEC_GOVERNANCE",
    "departmentId": "DEP_SEC_EXECUTIVE",
    "officeId": "OFF_SEC_SENATE",
    "portalId": "PORTAL_SEC_SENATE",
    "moduleId": "MOD_SEC_SENATE",
    "name": "Secondary Academic Senate Engine",
    "description": "Authoritative capability providing enterprise operations for Secondary Academic Senate Engine",
    "route": "/products/secondary/mod-sec-senate",
    "actionIds": [
      "ACT_CAP_SEC_SENATE_EXECUTE",
      "ACT_CAP_SEC_SENATE_EXPORT",
      "ACT_CAP_SEC_SENATE_REFRESH"
    ],
    "workflowIds": [
      "WF_SECONDARYMATRICULATIONWORKFLOW",
      "WF_TERMEXAMINATIONGRADINGWORKFLOW"
    ],
    "aiCapabilityIds": [
      "AI_SECONDARYACADEMICAGENT",
      "AI_DEPARTMENTALHODCOORDINATOR"
    ],
    "permissionIds": [
      "ROLE_PRINCIPAL",
      "ROLE_SENATE_MEMBER",
      "ROLE_REGISTRAR"
    ],
    "uiMetadataId": "UIM_CAP_SEC_SENATE",
    "runtimeComponentId": "RTC_CAP_SEC_SENATE",
    "status": "VERIFIED"
  },
  {
    "capabilityId": "CAP_SEC_SERVICE",
    "productId": "JUMO-SECONDARY-ERP",
    "directorateId": "DIR_SEC_GOVERNANCE",
    "departmentId": "DEP_SEC_EXECUTIVE",
    "officeId": "OFF_SEC_PRINCIPAL",
    "portalId": "PORTAL_SEC_PRINCIPAL",
    "moduleId": "MOD_SEC_SERVICE",
    "name": "Secondary Core Domain Service Engine",
    "description": "Authoritative capability providing enterprise operations for Secondary Core Domain Service Engine",
    "route": "/products/secondary/mod-sec-service",
    "actionIds": [
      "ACT_CAP_SEC_SERVICE_EXECUTE",
      "ACT_CAP_SEC_SERVICE_EXPORT",
      "ACT_CAP_SEC_SERVICE_REFRESH"
    ],
    "workflowIds": [
      "WF_SECONDARYMATRICULATIONWORKFLOW",
      "WF_TERMEXAMINATIONGRADINGWORKFLOW"
    ],
    "aiCapabilityIds": [
      "AI_SECONDARYACADEMICAGENT",
      "AI_DEPARTMENTALHODCOORDINATOR"
    ],
    "permissionIds": [
      "ROLE_PRINCIPAL",
      "ROLE_SENATE_MEMBER",
      "ROLE_REGISTRAR"
    ],
    "uiMetadataId": "UIM_CAP_SEC_SERVICE",
    "runtimeComponentId": "RTC_CAP_SEC_SERVICE",
    "status": "VERIFIED"
  },
  {
    "capabilityId": "CAP_ALUM_REGISTRY",
    "productId": "JUMO-ALUMNI",
    "directorateId": "DIR_ALUM_GOVERNANCE",
    "departmentId": "DEP_ALUM_EXECUTIVE",
    "officeId": "OFF_ALUM_DIR",
    "portalId": "PORTAL_ALUM_DIR",
    "moduleId": "MOD_ALUM_REGISTRY",
    "name": "Alumni Census & Graduate Registry Engine",
    "description": "Authoritative capability providing enterprise operations for Alumni Census & Graduate Registry Engine",
    "route": "/products/alumni/mod-alum-registry",
    "actionIds": [
      "ACT_CAP_ALUM_REGISTRY_EXECUTE",
      "ACT_CAP_ALUM_REGISTRY_EXPORT",
      "ACT_CAP_ALUM_REGISTRY_REFRESH"
    ],
    "workflowIds": [
      "WF_ALUMNIVERIFICATIONWORKFLOW",
      "WF_GIVINGCAMPAIGNPLEDGEWORKFLOW"
    ],
    "aiCapabilityIds": [
      "AI_ALUMNIADVANCEMENTAGENT",
      "AI_ENDOWMENTYIELDCALCULATOR"
    ],
    "permissionIds": [
      "ROLE_ALUMNI_DIRECTOR",
      "ROLE_BOARD_MEMBER",
      "ROLE_CHAPTER_LEAD"
    ],
    "uiMetadataId": "UIM_CAP_ALUM_REGISTRY",
    "runtimeComponentId": "RTC_CAP_ALUM_REGISTRY",
    "status": "VERIFIED"
  },
  {
    "capabilityId": "CAP_ALUM_GIVING",
    "productId": "JUMO-ALUMNI",
    "directorateId": "DIR_ALUM_GOVERNANCE",
    "departmentId": "DEP_ALUM_EXECUTIVE",
    "officeId": "OFF_ALUM_GIVING",
    "portalId": "PORTAL_ALUM_GIVING",
    "moduleId": "MOD_ALUM_GIVING",
    "name": "Giving Campaigns & Endowments Engine",
    "description": "Authoritative capability providing enterprise operations for Giving Campaigns & Endowments Engine",
    "route": "/products/alumni/mod-alum-giving",
    "actionIds": [
      "ACT_CAP_ALUM_GIVING_EXECUTE",
      "ACT_CAP_ALUM_GIVING_EXPORT",
      "ACT_CAP_ALUM_GIVING_REFRESH"
    ],
    "workflowIds": [
      "WF_ALUMNIVERIFICATIONWORKFLOW",
      "WF_GIVINGCAMPAIGNPLEDGEWORKFLOW"
    ],
    "aiCapabilityIds": [
      "AI_ALUMNIADVANCEMENTAGENT",
      "AI_ENDOWMENTYIELDCALCULATOR"
    ],
    "permissionIds": [
      "ROLE_ALUMNI_DIRECTOR",
      "ROLE_BOARD_MEMBER",
      "ROLE_CHAPTER_LEAD"
    ],
    "uiMetadataId": "UIM_CAP_ALUM_GIVING",
    "runtimeComponentId": "RTC_CAP_ALUM_GIVING",
    "status": "VERIFIED"
  },
  {
    "capabilityId": "CAP_ALUM_CHAPTERS",
    "productId": "JUMO-ALUMNI",
    "directorateId": "DIR_ALUM_GOVERNANCE",
    "departmentId": "DEP_ALUM_CHAPTERS",
    "officeId": "OFF_ALUM_CHAPTERS",
    "portalId": "PORTAL_ALUM_CHAPTERS",
    "moduleId": "MOD_ALUM_CHAPTERS",
    "name": "Global Chapters & Diaspora Network Engine",
    "description": "Authoritative capability providing enterprise operations for Global Chapters & Diaspora Network Engine",
    "route": "/products/alumni/mod-alum-chapters",
    "actionIds": [
      "ACT_CAP_ALUM_CHAPTERS_EXECUTE",
      "ACT_CAP_ALUM_CHAPTERS_EXPORT",
      "ACT_CAP_ALUM_CHAPTERS_REFRESH"
    ],
    "workflowIds": [
      "WF_ALUMNIVERIFICATIONWORKFLOW",
      "WF_GIVINGCAMPAIGNPLEDGEWORKFLOW"
    ],
    "aiCapabilityIds": [
      "AI_ALUMNIADVANCEMENTAGENT",
      "AI_ENDOWMENTYIELDCALCULATOR"
    ],
    "permissionIds": [
      "ROLE_ALUMNI_DIRECTOR",
      "ROLE_BOARD_MEMBER",
      "ROLE_CHAPTER_LEAD"
    ],
    "uiMetadataId": "UIM_CAP_ALUM_CHAPTERS",
    "runtimeComponentId": "RTC_CAP_ALUM_CHAPTERS",
    "status": "VERIFIED"
  },
  {
    "capabilityId": "CAP_ALUM_CAREER",
    "productId": "JUMO-ALUMNI",
    "directorateId": "DIR_ALUM_GOVERNANCE",
    "departmentId": "DEP_ALUM_EXECUTIVE",
    "officeId": "OFF_ALUM_CAREER",
    "portalId": "PORTAL_ALUM_CAREER",
    "moduleId": "MOD_ALUM_CAREER",
    "name": "Career Services & Mentorship Engine",
    "description": "Authoritative capability providing enterprise operations for Career Services & Mentorship Engine",
    "route": "/products/alumni/mod-alum-career",
    "actionIds": [
      "ACT_CAP_ALUM_CAREER_EXECUTE",
      "ACT_CAP_ALUM_CAREER_EXPORT",
      "ACT_CAP_ALUM_CAREER_REFRESH"
    ],
    "workflowIds": [
      "WF_ALUMNIVERIFICATIONWORKFLOW",
      "WF_GIVINGCAMPAIGNPLEDGEWORKFLOW"
    ],
    "aiCapabilityIds": [
      "AI_ALUMNIADVANCEMENTAGENT",
      "AI_ENDOWMENTYIELDCALCULATOR"
    ],
    "permissionIds": [
      "ROLE_ALUMNI_DIRECTOR",
      "ROLE_BOARD_MEMBER",
      "ROLE_CHAPTER_LEAD"
    ],
    "uiMetadataId": "UIM_CAP_ALUM_CAREER",
    "runtimeComponentId": "RTC_CAP_ALUM_CAREER",
    "status": "VERIFIED"
  },
  {
    "capabilityId": "CAP_ALUM_DASHBOARD",
    "productId": "JUMO-ALUMNI",
    "directorateId": "DIR_ALUM_GOVERNANCE",
    "departmentId": "DEP_ALUM_EXECUTIVE",
    "officeId": "OFF_ALUM_DIR",
    "portalId": "PORTAL_ALUM_DIR",
    "moduleId": "MOD_ALUM_DASHBOARD",
    "name": "Alumni Intelligence Dashboard Engine",
    "description": "Authoritative capability providing enterprise operations for Alumni Intelligence Dashboard Engine",
    "route": "/products/alumni/mod-alum-dashboard",
    "actionIds": [
      "ACT_CAP_ALUM_DASHBOARD_EXECUTE",
      "ACT_CAP_ALUM_DASHBOARD_EXPORT",
      "ACT_CAP_ALUM_DASHBOARD_REFRESH"
    ],
    "workflowIds": [
      "WF_ALUMNIVERIFICATIONWORKFLOW",
      "WF_GIVINGCAMPAIGNPLEDGEWORKFLOW"
    ],
    "aiCapabilityIds": [
      "AI_ALUMNIADVANCEMENTAGENT",
      "AI_ENDOWMENTYIELDCALCULATOR"
    ],
    "permissionIds": [
      "ROLE_ALUMNI_DIRECTOR",
      "ROLE_BOARD_MEMBER",
      "ROLE_CHAPTER_LEAD"
    ],
    "uiMetadataId": "UIM_CAP_ALUM_DASHBOARD",
    "runtimeComponentId": "RTC_CAP_ALUM_DASHBOARD",
    "status": "VERIFIED"
  },
  {
    "capabilityId": "CAP_CH_MEMBERSHIP",
    "productId": "JUMO-CHURCH",
    "directorateId": "DIR_CH_ECCLESIASTICAL",
    "departmentId": "DEP_CH_EPISCOPAL",
    "officeId": "OFF_CH_BISHOP",
    "portalId": "PORTAL_CH_BISHOP",
    "moduleId": "MOD_CH_MEMBERSHIP",
    "name": "Congregation Directory & Census Engine",
    "description": "Authoritative capability providing enterprise operations for Congregation Directory & Census Engine",
    "route": "/products/church/mod-ch-membership",
    "actionIds": [
      "ACT_CAP_CH_MEMBERSHIP_EXECUTE",
      "ACT_CAP_CH_MEMBERSHIP_EXPORT",
      "ACT_CAP_CH_MEMBERSHIP_REFRESH"
    ],
    "workflowIds": [
      "WF_SACRAMENTALREGISTRATIONWORKFLOW",
      "WF_TITHECONTRIBUTIONWORKFLOW"
    ],
    "aiCapabilityIds": [
      "AI_DIOCESANCENSUSAGENT",
      "AI_TITHESAUDITAGENT"
    ],
    "permissionIds": [
      "ROLE_BISHOP",
      "ROLE_CHANCELLOR",
      "ROLE_PARISH_PRIEST"
    ],
    "uiMetadataId": "UIM_CAP_CH_MEMBERSHIP",
    "runtimeComponentId": "RTC_CAP_CH_MEMBERSHIP",
    "status": "VERIFIED"
  },
  {
    "capabilityId": "CAP_CH_FINANCE",
    "productId": "JUMO-CHURCH",
    "directorateId": "DIR_CH_ECCLESIASTICAL",
    "departmentId": "DEP_CH_EPISCOPAL",
    "officeId": "OFF_CH_BISHOP",
    "portalId": "PORTAL_CH_BISHOP",
    "moduleId": "MOD_CH_FINANCE",
    "name": "Tithes, Offerings & Diocesan Ledger Engine",
    "description": "Authoritative capability providing enterprise operations for Tithes, Offerings & Diocesan Ledger Engine",
    "route": "/products/church/mod-ch-finance",
    "actionIds": [
      "ACT_CAP_CH_FINANCE_EXECUTE",
      "ACT_CAP_CH_FINANCE_EXPORT",
      "ACT_CAP_CH_FINANCE_REFRESH"
    ],
    "workflowIds": [
      "WF_SACRAMENTALREGISTRATIONWORKFLOW",
      "WF_TITHECONTRIBUTIONWORKFLOW"
    ],
    "aiCapabilityIds": [
      "AI_DIOCESANCENSUSAGENT",
      "AI_TITHESAUDITAGENT"
    ],
    "permissionIds": [
      "ROLE_BISHOP",
      "ROLE_CHANCELLOR",
      "ROLE_PARISH_PRIEST"
    ],
    "uiMetadataId": "UIM_CAP_CH_FINANCE",
    "runtimeComponentId": "RTC_CAP_CH_FINANCE",
    "status": "VERIFIED"
  },
  {
    "capabilityId": "CAP_CH_PASTORAL",
    "productId": "JUMO-CHURCH",
    "directorateId": "DIR_CH_ECCLESIASTICAL",
    "departmentId": "DEP_CH_EPISCOPAL",
    "officeId": "OFF_CH_PASTORAL",
    "portalId": "PORTAL_CH_PASTORAL",
    "moduleId": "MOD_CH_PASTORAL",
    "name": "Pastoral Care & Visitation Tracking Engine",
    "description": "Authoritative capability providing enterprise operations for Pastoral Care & Visitation Tracking Engine",
    "route": "/products/church/mod-ch-pastoral",
    "actionIds": [
      "ACT_CAP_CH_PASTORAL_EXECUTE",
      "ACT_CAP_CH_PASTORAL_EXPORT",
      "ACT_CAP_CH_PASTORAL_REFRESH"
    ],
    "workflowIds": [
      "WF_SACRAMENTALREGISTRATIONWORKFLOW",
      "WF_TITHECONTRIBUTIONWORKFLOW"
    ],
    "aiCapabilityIds": [
      "AI_DIOCESANCENSUSAGENT",
      "AI_TITHESAUDITAGENT"
    ],
    "permissionIds": [
      "ROLE_BISHOP",
      "ROLE_CHANCELLOR",
      "ROLE_PARISH_PRIEST"
    ],
    "uiMetadataId": "UIM_CAP_CH_PASTORAL",
    "runtimeComponentId": "RTC_CAP_CH_PASTORAL",
    "status": "VERIFIED"
  },
  {
    "capabilityId": "CAP_CH_EVENTS",
    "productId": "JUMO-CHURCH",
    "directorateId": "DIR_CH_ECCLESIASTICAL",
    "departmentId": "DEP_CH_EPISCOPAL",
    "officeId": "OFF_CH_BISHOP",
    "portalId": "PORTAL_CH_EVENTS",
    "moduleId": "MOD_CH_EVENTS",
    "name": "Liturgical Calendar & Event Operations Engine",
    "description": "Authoritative capability providing enterprise operations for Liturgical Calendar & Event Operations Engine",
    "route": "/products/church/mod-ch-events",
    "actionIds": [
      "ACT_CAP_CH_EVENTS_EXECUTE",
      "ACT_CAP_CH_EVENTS_EXPORT",
      "ACT_CAP_CH_EVENTS_REFRESH"
    ],
    "workflowIds": [
      "WF_SACRAMENTALREGISTRATIONWORKFLOW",
      "WF_TITHECONTRIBUTIONWORKFLOW"
    ],
    "aiCapabilityIds": [
      "AI_DIOCESANCENSUSAGENT",
      "AI_TITHESAUDITAGENT"
    ],
    "permissionIds": [
      "ROLE_BISHOP",
      "ROLE_CHANCELLOR",
      "ROLE_PARISH_PRIEST"
    ],
    "uiMetadataId": "UIM_CAP_CH_EVENTS",
    "runtimeComponentId": "RTC_CAP_CH_EVENTS",
    "status": "VERIFIED"
  },
  {
    "capabilityId": "CAP_CH_DASHBOARD",
    "productId": "JUMO-CHURCH",
    "directorateId": "DIR_CH_ECCLESIASTICAL",
    "departmentId": "DEP_CH_EPISCOPAL",
    "officeId": "OFF_CH_BISHOP",
    "portalId": "PORTAL_CH_BISHOP",
    "moduleId": "MOD_CH_DASHBOARD",
    "name": "Executive Diocesan Dashboard Engine",
    "description": "Authoritative capability providing enterprise operations for Executive Diocesan Dashboard Engine",
    "route": "/products/church/mod-ch-dashboard",
    "actionIds": [
      "ACT_CAP_CH_DASHBOARD_EXECUTE",
      "ACT_CAP_CH_DASHBOARD_EXPORT",
      "ACT_CAP_CH_DASHBOARD_REFRESH"
    ],
    "workflowIds": [
      "WF_SACRAMENTALREGISTRATIONWORKFLOW",
      "WF_TITHECONTRIBUTIONWORKFLOW"
    ],
    "aiCapabilityIds": [
      "AI_DIOCESANCENSUSAGENT",
      "AI_TITHESAUDITAGENT"
    ],
    "permissionIds": [
      "ROLE_BISHOP",
      "ROLE_CHANCELLOR",
      "ROLE_PARISH_PRIEST"
    ],
    "uiMetadataId": "UIM_CAP_CH_DASHBOARD",
    "runtimeComponentId": "RTC_CAP_CH_DASHBOARD",
    "status": "VERIFIED"
  },
  {
    "capabilityId": "CAP_OCC_VERIFICATION",
    "productId": "JUMO-CONTROL",
    "directorateId": "DIR_OCC_SOVEREIGN",
    "departmentId": "DEP_OCC_SOVEREIGN",
    "officeId": "OFF_OCC_COMMAND",
    "portalId": "PORTAL_OCC_CORE",
    "moduleId": "MOD_OCC_VERIFICATION",
    "name": "Ring-0 Verification & Integrity Engine",
    "description": "Authoritative capability providing enterprise operations for Ring-0 Verification & Integrity Engine",
    "route": "/products/control/mod-occ-verification",
    "actionIds": [
      "ACT_CAP_OCC_VERIFICATION_EXECUTE",
      "ACT_CAP_OCC_VERIFICATION_EXPORT",
      "ACT_CAP_OCC_VERIFICATION_REFRESH"
    ],
    "workflowIds": [
      "WF_RING0VERIFICATIONWORKFLOW",
      "WF_TENANTPROVISIONINGWORKFLOW"
    ],
    "aiCapabilityIds": [
      "AI_RUNTIMERELIABILITYAGENT",
      "AI_SOVEREIGNVERIFICATIONAGENT"
    ],
    "permissionIds": [
      "ROLE_SOVEREIGN_OWNER"
    ],
    "uiMetadataId": "UIM_CAP_OCC_VERIFICATION",
    "runtimeComponentId": "RTC_CAP_OCC_VERIFICATION",
    "status": "VERIFIED"
  },
  {
    "capabilityId": "CAP_OCC_TRUST",
    "productId": "JUMO-CONTROL",
    "directorateId": "DIR_OCC_SOVEREIGN",
    "departmentId": "DEP_OCC_SOVEREIGN",
    "officeId": "OFF_OCC_TRUST",
    "portalId": "PORTAL_OCC_TRUST",
    "moduleId": "MOD_OCC_TRUST",
    "name": "JUMO Trust Engine & Anti-Tamper Engine",
    "description": "Authoritative capability providing enterprise operations for JUMO Trust Engine & Anti-Tamper Engine",
    "route": "/products/control/mod-occ-trust",
    "actionIds": [
      "ACT_CAP_OCC_TRUST_EXECUTE",
      "ACT_CAP_OCC_TRUST_EXPORT",
      "ACT_CAP_OCC_TRUST_REFRESH"
    ],
    "workflowIds": [
      "WF_RING0VERIFICATIONWORKFLOW",
      "WF_TENANTPROVISIONINGWORKFLOW"
    ],
    "aiCapabilityIds": [
      "AI_RUNTIMERELIABILITYAGENT",
      "AI_SOVEREIGNVERIFICATIONAGENT"
    ],
    "permissionIds": [
      "ROLE_SOVEREIGN_OWNER"
    ],
    "uiMetadataId": "UIM_CAP_OCC_TRUST",
    "runtimeComponentId": "RTC_CAP_OCC_TRUST",
    "status": "VERIFIED"
  },
  {
    "capabilityId": "CAP_OCC_FACTORY",
    "productId": "JUMO-CONTROL",
    "directorateId": "DIR_OCC_SOVEREIGN",
    "departmentId": "DEP_OCC_SOVEREIGN",
    "officeId": "OFF_OCC_FACTORY",
    "portalId": "PORTAL_OCC_FACTORY",
    "moduleId": "MOD_OCC_FACTORY",
    "name": "ERP Template & Scaffolding Factory Engine",
    "description": "Authoritative capability providing enterprise operations for ERP Template & Scaffolding Factory Engine",
    "route": "/products/control/mod-occ-factory",
    "actionIds": [
      "ACT_CAP_OCC_FACTORY_EXECUTE",
      "ACT_CAP_OCC_FACTORY_EXPORT",
      "ACT_CAP_OCC_FACTORY_REFRESH"
    ],
    "workflowIds": [
      "WF_RING0VERIFICATIONWORKFLOW",
      "WF_TENANTPROVISIONINGWORKFLOW"
    ],
    "aiCapabilityIds": [
      "AI_RUNTIMERELIABILITYAGENT",
      "AI_SOVEREIGNVERIFICATIONAGENT"
    ],
    "permissionIds": [
      "ROLE_SOVEREIGN_OWNER"
    ],
    "uiMetadataId": "UIM_CAP_OCC_FACTORY",
    "runtimeComponentId": "RTC_CAP_OCC_FACTORY",
    "status": "VERIFIED"
  },
  {
    "capabilityId": "CAP_OCC_SHELL",
    "productId": "JUMO-CONTROL",
    "directorateId": "DIR_OCC_SOVEREIGN",
    "departmentId": "DEP_OCC_SOVEREIGN",
    "officeId": "OFF_OCC_COMMAND",
    "portalId": "PORTAL_OCC_CORE",
    "moduleId": "MOD_OCC_SHELL",
    "name": "Universal Sovereign Platform Host Engine",
    "description": "Authoritative capability providing enterprise operations for Universal Sovereign Platform Host Engine",
    "route": "/products/control/mod-occ-shell",
    "actionIds": [
      "ACT_CAP_OCC_SHELL_EXECUTE",
      "ACT_CAP_OCC_SHELL_EXPORT",
      "ACT_CAP_OCC_SHELL_REFRESH"
    ],
    "workflowIds": [
      "WF_RING0VERIFICATIONWORKFLOW",
      "WF_TENANTPROVISIONINGWORKFLOW"
    ],
    "aiCapabilityIds": [
      "AI_RUNTIMERELIABILITYAGENT",
      "AI_SOVEREIGNVERIFICATIONAGENT"
    ],
    "permissionIds": [
      "ROLE_SOVEREIGN_OWNER"
    ],
    "uiMetadataId": "UIM_CAP_OCC_SHELL",
    "runtimeComponentId": "RTC_CAP_OCC_SHELL",
    "status": "VERIFIED"
  },
  {
    "capabilityId": "CAP_PRI_ADMISSIONS_CORE",
    "productId": "JUMO-NURSERY-PRIMARY-ERP",
    "directorateId": "DIR_NP_GOVERNANCE",
    "departmentId": "DEP_NP_EXECUTIVE",
    "officeId": "OFF_NP_HEAD",
    "portalId": "PORTAL_EDU_HEAD",
    "moduleId": "MOD_PRI_ADMISSIONS_0",
    "name": "Sovereign Learner Enrollment & Admission Registry",
    "description": "Authoritative institutional registry for new learner intake, document verification, and sovereign enrollment certification.",
    "route": "/products/nursery-primary/admissions",
    "actionIds": ["ACT_PRI_ADMIT_LEARNER", "ACT_PRI_VERIFY_DOCS", "ACT_PRI_ISSUE_LIN"],
    "workflowIds": ["WF_EDU_ADMISSIONS"],
    "aiCapabilityIds": ["AI_EDU_ADMISSIONS_ASSISTANT"],
    "permissionIds": ["ROLE_ADMIN", "ROLE_REGISTRAR"],
    "uiMetadataId": "UIM_PRI_ADMISSIONS",
    "runtimeComponentId": "RTC_PRI_ADMISSIONS",
    "status": "VERIFIED"
  },
  {
    "capabilityId": "CAP_PRI_ACCOUNTS_LEDGER",
    "productId": "JUMO-NURSERY-PRIMARY-ERP",
    "directorateId": "DIR_NP_GOVERNANCE",
    "departmentId": "DEP_NP_EXECUTIVE",
    "officeId": "OFF_NP_HEAD",
    "portalId": "PORTAL_EDU_HEAD",
    "moduleId": "MOD_PRI_FINANCE_0",
    "name": "Sovereign School Accounts & Fee Ledger",
    "description": "FAAP-integrated school accounting engine for fee collection, vote book management, and institutional financial reporting.",
    "route": "/products/nursery-primary/accounts",
    "actionIds": ["ACT_PRI_POST_FEE", "ACT_PRI_RECONCILE", "ACT_PRI_GEN_RECEIPT"],
    "workflowIds": ["WF_FAAP_VOTE_BOOK"],
    "aiCapabilityIds": ["AI_FINTECH_AUDITOR"],
    "permissionIds": ["ROLE_BURSAR", "ROLE_ADMIN"],
    "uiMetadataId": "UIM_PRI_ACCOUNTS",
    "runtimeComponentId": "RTC_PRI_ACCOUNTS",
    "status": "VERIFIED"
  }
];

export const UniversalCapabilityRegistry: RegistryCollection<AuthoritativeCapability> = createRegistryCollection(
  RAW_CAPABILITIES,
  "UNIVERSAL_CAPABILITY_REGISTRY"
);

export function getCapabilitiesByProduct(productId: string): AuthoritativeCapability[] {
  const upper = (productId || '').toUpperCase();
  return safeFilter(UniversalCapabilityRegistry, c =>
    c.productId.toUpperCase() === upper ||
    (upper.includes('NURSERY') && c.productId.includes('NURSERY')) ||
    (upper.includes('FINTECH') && c.productId.includes('FINTECH')) ||
    (upper.includes('SECONDARY') && c.productId.includes('SECONDARY')) ||
    (upper.includes('ALUMNI') && c.productId.includes('ALUMNI')) ||
    (upper.includes('CHURCH') && c.productId.includes('CHURCH')) ||
    (upper.includes('CONTROL') && c.productId.includes('CONTROL'))
  );
}

export function getCapabilityById(capabilityId: string): AuthoritativeCapability | undefined {
  return safeFind(UniversalCapabilityRegistry, c => c.capabilityId === capabilityId);
}

export function getCapabilitiesByModule(moduleId: string): AuthoritativeCapability[] {
  return safeFilter(UniversalCapabilityRegistry, c => c.moduleId === moduleId);
}
