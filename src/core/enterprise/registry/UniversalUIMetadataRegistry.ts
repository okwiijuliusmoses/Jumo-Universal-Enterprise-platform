import { createRegistryCollection, RegistryCollection, safeFind, safeFilter } from './UniversalRegistryContract';

export interface AuthoritativeUIMetadata {
  uiMetadataId: string;
  capabilityId: string;
  productId: string;
  moduleId: string;
  portalId: string;
  pageTitle: string;
  navLabel: string;
  icon: string;
  route: string;
  breadcrumbs: string[];
  layout: string;
  sections: Array<{ id: string; title: string; type: string }>;
  cards: Array<{ id: string; title: string; value: string; status: string }>;
  forms: string[];
  tables: string[];
  dashboards: string[];
  reports: string[];
  workflows: string[];
  aiCapabilities: string[];
  permissions: string[];
  runtimeComponentId: string;
  mobileParity: {
    hasMobileView: boolean;
    mobileComponentId: string;
    mobileRoute: string;
  };
}

const RAW_UI_METADATA: AuthoritativeUIMetadata[] = [
  {
    "uiMetadataId": "UIM_CAP_FT_AGENT_BANKING",
    "capabilityId": "CAP_FT_AGENT_BANKING",
    "productId": "JUMO-FINTECH",
    "moduleId": "MOD_FT_AGENT_BANKING",
    "portalId": "PORTAL_FIN_CFO",
    "pageTitle": "Agent Banking Autonomous Engine",
    "navLabel": "Agent Banking",
    "icon": "LayoutGrid",
    "route": "/products/fintech/mod-ft-agent-banking",
    "breadcrumbs": [
      "Enterprise",
      "JUMO-FINTECH",
      "Agent Banking Autonomous Engine"
    ],
    "layout": "STANDARD_DASHBOARD_GRID",
    "sections": [
      {
        "id": "SEC_KPI",
        "title": "Executive KPI Metrics",
        "type": "KPI_ROW"
      },
      {
        "id": "SEC_DATA",
        "title": "Operational Records Ledger",
        "type": "GRID_TABLE"
      },
      {
        "id": "SEC_ACTIONS",
        "title": "Action Dispatcher & Approvals",
        "type": "ACTION_BAR"
      }
    ],
    "cards": [
      {
        "id": "CARD_1",
        "title": "Active Work Items",
        "value": "28",
        "status": "NORMAL"
      },
      {
        "id": "CARD_2",
        "title": "Sovereign Audit Parity",
        "value": "100%",
        "status": "VERIFIED"
      }
    ],
    "forms": [
      "FORM_MOD_FT_AGENT_BANKING_ENTRY"
    ],
    "tables": [
      "TABLE_MOD_FT_AGENT_BANKING_GRID"
    ],
    "dashboards": [
      "DASH_MOD_FT_AGENT_BANKING_EXECUTIVE"
    ],
    "reports": [
      "REP_MOD_FT_AGENT_BANKING_SUMMARY"
    ],
    "workflows": [
      "WF_KYCONBOARDINGWORKFLOW",
      "WF_PAYMENTPROCESSINGWORKFLOW"
    ],
    "aiCapabilities": [
      "AI_FINTECHMODULEAGENTREGISTRY",
      "AI_FINTECHCAPABILITYREGISTRY"
    ],
    "permissions": [
      "ROLE_CFO",
      "ROLE_CONTROLLER",
      "ROLE_ACCOUNTANT"
    ],
    "runtimeComponentId": "RTC_CAP_FT_AGENT_BANKING",
    "mobileParity": {
      "hasMobileView": true,
      "mobileComponentId": "M_RTC_CAP_FT_AGENT_BANKING",
      "mobileRoute": "/products/fintech/mod-ft-agent-banking/mobile"
    }
  },
  {
    "uiMetadataId": "UIM_CAP_FT_AGRICULTURAL_FINANCE",
    "capabilityId": "CAP_FT_AGRICULTURAL_FINANCE",
    "productId": "JUMO-FINTECH",
    "moduleId": "MOD_FT_AGRICULTURAL_FINANCE",
    "portalId": "PORTAL_FIN_CFO",
    "pageTitle": "Agricultural Finance Autonomous Engine",
    "navLabel": "Agricultural Finance",
    "icon": "LayoutGrid",
    "route": "/products/fintech/mod-ft-agricultural-finance",
    "breadcrumbs": [
      "Enterprise",
      "JUMO-FINTECH",
      "Agricultural Finance Autonomous Engine"
    ],
    "layout": "STANDARD_DASHBOARD_GRID",
    "sections": [
      {
        "id": "SEC_KPI",
        "title": "Executive KPI Metrics",
        "type": "KPI_ROW"
      },
      {
        "id": "SEC_DATA",
        "title": "Operational Records Ledger",
        "type": "GRID_TABLE"
      },
      {
        "id": "SEC_ACTIONS",
        "title": "Action Dispatcher & Approvals",
        "type": "ACTION_BAR"
      }
    ],
    "cards": [
      {
        "id": "CARD_1",
        "title": "Active Work Items",
        "value": "28",
        "status": "NORMAL"
      },
      {
        "id": "CARD_2",
        "title": "Sovereign Audit Parity",
        "value": "100%",
        "status": "VERIFIED"
      }
    ],
    "forms": [
      "FORM_MOD_FT_AGRICULTURAL_FINANCE_ENTRY"
    ],
    "tables": [
      "TABLE_MOD_FT_AGRICULTURAL_FINANCE_GRID"
    ],
    "dashboards": [
      "DASH_MOD_FT_AGRICULTURAL_FINANCE_EXECUTIVE"
    ],
    "reports": [
      "REP_MOD_FT_AGRICULTURAL_FINANCE_SUMMARY"
    ],
    "workflows": [
      "WF_KYCONBOARDINGWORKFLOW",
      "WF_PAYMENTPROCESSINGWORKFLOW"
    ],
    "aiCapabilities": [
      "AI_FINTECHMODULEAGENTREGISTRY",
      "AI_FINTECHCAPABILITYREGISTRY"
    ],
    "permissions": [
      "ROLE_CFO",
      "ROLE_CONTROLLER",
      "ROLE_ACCOUNTANT"
    ],
    "runtimeComponentId": "RTC_CAP_FT_AGRICULTURAL_FINANCE",
    "mobileParity": {
      "hasMobileView": true,
      "mobileComponentId": "M_RTC_CAP_FT_AGRICULTURAL_FINANCE",
      "mobileRoute": "/products/fintech/mod-ft-agricultural-finance/mobile"
    }
  },
  {
    "uiMetadataId": "UIM_CAP_FT_ATM_SELF_SERVICE",
    "capabilityId": "CAP_FT_ATM_SELF_SERVICE",
    "productId": "JUMO-FINTECH",
    "moduleId": "MOD_FT_ATM_SELF_SERVICE",
    "portalId": "PORTAL_FIN_CFO",
    "pageTitle": "Atm Self Service Autonomous Engine",
    "navLabel": "Atm Self",
    "icon": "LayoutGrid",
    "route": "/products/fintech/mod-ft-atm-self-service",
    "breadcrumbs": [
      "Enterprise",
      "JUMO-FINTECH",
      "Atm Self Service Autonomous Engine"
    ],
    "layout": "STANDARD_DASHBOARD_GRID",
    "sections": [
      {
        "id": "SEC_KPI",
        "title": "Executive KPI Metrics",
        "type": "KPI_ROW"
      },
      {
        "id": "SEC_DATA",
        "title": "Operational Records Ledger",
        "type": "GRID_TABLE"
      },
      {
        "id": "SEC_ACTIONS",
        "title": "Action Dispatcher & Approvals",
        "type": "ACTION_BAR"
      }
    ],
    "cards": [
      {
        "id": "CARD_1",
        "title": "Active Work Items",
        "value": "28",
        "status": "NORMAL"
      },
      {
        "id": "CARD_2",
        "title": "Sovereign Audit Parity",
        "value": "100%",
        "status": "VERIFIED"
      }
    ],
    "forms": [
      "FORM_MOD_FT_ATM_SELF_SERVICE_ENTRY"
    ],
    "tables": [
      "TABLE_MOD_FT_ATM_SELF_SERVICE_GRID"
    ],
    "dashboards": [
      "DASH_MOD_FT_ATM_SELF_SERVICE_EXECUTIVE"
    ],
    "reports": [
      "REP_MOD_FT_ATM_SELF_SERVICE_SUMMARY"
    ],
    "workflows": [
      "WF_KYCONBOARDINGWORKFLOW",
      "WF_PAYMENTPROCESSINGWORKFLOW"
    ],
    "aiCapabilities": [
      "AI_FINTECHMODULEAGENTREGISTRY",
      "AI_FINTECHCAPABILITYREGISTRY"
    ],
    "permissions": [
      "ROLE_CFO",
      "ROLE_CONTROLLER",
      "ROLE_ACCOUNTANT"
    ],
    "runtimeComponentId": "RTC_CAP_FT_ATM_SELF_SERVICE",
    "mobileParity": {
      "hasMobileView": true,
      "mobileComponentId": "M_RTC_CAP_FT_ATM_SELF_SERVICE",
      "mobileRoute": "/products/fintech/mod-ft-atm-self-service/mobile"
    }
  },
  {
    "uiMetadataId": "UIM_CAP_FT_BANK_PAYMENTS",
    "capabilityId": "CAP_FT_BANK_PAYMENTS",
    "productId": "JUMO-FINTECH",
    "moduleId": "MOD_FT_BANK_PAYMENTS",
    "portalId": "PORTAL_FIN_CFO",
    "pageTitle": "Bank Payments Autonomous Engine",
    "navLabel": "Bank Payments",
    "icon": "LayoutGrid",
    "route": "/products/fintech/mod-ft-bank-payments",
    "breadcrumbs": [
      "Enterprise",
      "JUMO-FINTECH",
      "Bank Payments Autonomous Engine"
    ],
    "layout": "STANDARD_DASHBOARD_GRID",
    "sections": [
      {
        "id": "SEC_KPI",
        "title": "Executive KPI Metrics",
        "type": "KPI_ROW"
      },
      {
        "id": "SEC_DATA",
        "title": "Operational Records Ledger",
        "type": "GRID_TABLE"
      },
      {
        "id": "SEC_ACTIONS",
        "title": "Action Dispatcher & Approvals",
        "type": "ACTION_BAR"
      }
    ],
    "cards": [
      {
        "id": "CARD_1",
        "title": "Active Work Items",
        "value": "28",
        "status": "NORMAL"
      },
      {
        "id": "CARD_2",
        "title": "Sovereign Audit Parity",
        "value": "100%",
        "status": "VERIFIED"
      }
    ],
    "forms": [
      "FORM_MOD_FT_BANK_PAYMENTS_ENTRY"
    ],
    "tables": [
      "TABLE_MOD_FT_BANK_PAYMENTS_GRID"
    ],
    "dashboards": [
      "DASH_MOD_FT_BANK_PAYMENTS_EXECUTIVE"
    ],
    "reports": [
      "REP_MOD_FT_BANK_PAYMENTS_SUMMARY"
    ],
    "workflows": [
      "WF_KYCONBOARDINGWORKFLOW",
      "WF_PAYMENTPROCESSINGWORKFLOW"
    ],
    "aiCapabilities": [
      "AI_FINTECHMODULEAGENTREGISTRY",
      "AI_FINTECHCAPABILITYREGISTRY"
    ],
    "permissions": [
      "ROLE_CFO",
      "ROLE_CONTROLLER",
      "ROLE_ACCOUNTANT"
    ],
    "runtimeComponentId": "RTC_CAP_FT_BANK_PAYMENTS",
    "mobileParity": {
      "hasMobileView": true,
      "mobileComponentId": "M_RTC_CAP_FT_BANK_PAYMENTS",
      "mobileRoute": "/products/fintech/mod-ft-bank-payments/mobile"
    }
  },
  {
    "uiMetadataId": "UIM_CAP_FT_BILL_PAYMENTS",
    "capabilityId": "CAP_FT_BILL_PAYMENTS",
    "productId": "JUMO-FINTECH",
    "moduleId": "MOD_FT_BILL_PAYMENTS",
    "portalId": "PORTAL_FIN_CFO",
    "pageTitle": "Bill Payments Autonomous Engine",
    "navLabel": "Bill Payments",
    "icon": "LayoutGrid",
    "route": "/products/fintech/mod-ft-bill-payments",
    "breadcrumbs": [
      "Enterprise",
      "JUMO-FINTECH",
      "Bill Payments Autonomous Engine"
    ],
    "layout": "STANDARD_DASHBOARD_GRID",
    "sections": [
      {
        "id": "SEC_KPI",
        "title": "Executive KPI Metrics",
        "type": "KPI_ROW"
      },
      {
        "id": "SEC_DATA",
        "title": "Operational Records Ledger",
        "type": "GRID_TABLE"
      },
      {
        "id": "SEC_ACTIONS",
        "title": "Action Dispatcher & Approvals",
        "type": "ACTION_BAR"
      }
    ],
    "cards": [
      {
        "id": "CARD_1",
        "title": "Active Work Items",
        "value": "28",
        "status": "NORMAL"
      },
      {
        "id": "CARD_2",
        "title": "Sovereign Audit Parity",
        "value": "100%",
        "status": "VERIFIED"
      }
    ],
    "forms": [
      "FORM_MOD_FT_BILL_PAYMENTS_ENTRY"
    ],
    "tables": [
      "TABLE_MOD_FT_BILL_PAYMENTS_GRID"
    ],
    "dashboards": [
      "DASH_MOD_FT_BILL_PAYMENTS_EXECUTIVE"
    ],
    "reports": [
      "REP_MOD_FT_BILL_PAYMENTS_SUMMARY"
    ],
    "workflows": [
      "WF_KYCONBOARDINGWORKFLOW",
      "WF_PAYMENTPROCESSINGWORKFLOW"
    ],
    "aiCapabilities": [
      "AI_FINTECHMODULEAGENTREGISTRY",
      "AI_FINTECHCAPABILITYREGISTRY"
    ],
    "permissions": [
      "ROLE_CFO",
      "ROLE_CONTROLLER",
      "ROLE_ACCOUNTANT"
    ],
    "runtimeComponentId": "RTC_CAP_FT_BILL_PAYMENTS",
    "mobileParity": {
      "hasMobileView": true,
      "mobileComponentId": "M_RTC_CAP_FT_BILL_PAYMENTS",
      "mobileRoute": "/products/fintech/mod-ft-bill-payments/mobile"
    }
  },
  {
    "uiMetadataId": "UIM_CAP_FT_CAPITAL_MARKETS",
    "capabilityId": "CAP_FT_CAPITAL_MARKETS",
    "productId": "JUMO-FINTECH",
    "moduleId": "MOD_FT_CAPITAL_MARKETS",
    "portalId": "PORTAL_FIN_CFO",
    "pageTitle": "Capital Markets Autonomous Engine",
    "navLabel": "Capital Markets",
    "icon": "LayoutGrid",
    "route": "/products/fintech/mod-ft-capital-markets",
    "breadcrumbs": [
      "Enterprise",
      "JUMO-FINTECH",
      "Capital Markets Autonomous Engine"
    ],
    "layout": "STANDARD_DASHBOARD_GRID",
    "sections": [
      {
        "id": "SEC_KPI",
        "title": "Executive KPI Metrics",
        "type": "KPI_ROW"
      },
      {
        "id": "SEC_DATA",
        "title": "Operational Records Ledger",
        "type": "GRID_TABLE"
      },
      {
        "id": "SEC_ACTIONS",
        "title": "Action Dispatcher & Approvals",
        "type": "ACTION_BAR"
      }
    ],
    "cards": [
      {
        "id": "CARD_1",
        "title": "Active Work Items",
        "value": "28",
        "status": "NORMAL"
      },
      {
        "id": "CARD_2",
        "title": "Sovereign Audit Parity",
        "value": "100%",
        "status": "VERIFIED"
      }
    ],
    "forms": [
      "FORM_MOD_FT_CAPITAL_MARKETS_ENTRY"
    ],
    "tables": [
      "TABLE_MOD_FT_CAPITAL_MARKETS_GRID"
    ],
    "dashboards": [
      "DASH_MOD_FT_CAPITAL_MARKETS_EXECUTIVE"
    ],
    "reports": [
      "REP_MOD_FT_CAPITAL_MARKETS_SUMMARY"
    ],
    "workflows": [
      "WF_KYCONBOARDINGWORKFLOW",
      "WF_PAYMENTPROCESSINGWORKFLOW"
    ],
    "aiCapabilities": [
      "AI_FINTECHMODULEAGENTREGISTRY",
      "AI_FINTECHCAPABILITYREGISTRY"
    ],
    "permissions": [
      "ROLE_CFO",
      "ROLE_CONTROLLER",
      "ROLE_ACCOUNTANT"
    ],
    "runtimeComponentId": "RTC_CAP_FT_CAPITAL_MARKETS",
    "mobileParity": {
      "hasMobileView": true,
      "mobileComponentId": "M_RTC_CAP_FT_CAPITAL_MARKETS",
      "mobileRoute": "/products/fintech/mod-ft-capital-markets/mobile"
    }
  },
  {
    "uiMetadataId": "UIM_CAP_FT_CARDS",
    "capabilityId": "CAP_FT_CARDS",
    "productId": "JUMO-FINTECH",
    "moduleId": "MOD_FT_CARDS",
    "portalId": "PORTAL_FIN_CFO",
    "pageTitle": "Cards Autonomous Engine",
    "navLabel": "Cards Autonomous",
    "icon": "LayoutGrid",
    "route": "/products/fintech/mod-ft-cards",
    "breadcrumbs": [
      "Enterprise",
      "JUMO-FINTECH",
      "Cards Autonomous Engine"
    ],
    "layout": "STANDARD_DASHBOARD_GRID",
    "sections": [
      {
        "id": "SEC_KPI",
        "title": "Executive KPI Metrics",
        "type": "KPI_ROW"
      },
      {
        "id": "SEC_DATA",
        "title": "Operational Records Ledger",
        "type": "GRID_TABLE"
      },
      {
        "id": "SEC_ACTIONS",
        "title": "Action Dispatcher & Approvals",
        "type": "ACTION_BAR"
      }
    ],
    "cards": [
      {
        "id": "CARD_1",
        "title": "Active Work Items",
        "value": "28",
        "status": "NORMAL"
      },
      {
        "id": "CARD_2",
        "title": "Sovereign Audit Parity",
        "value": "100%",
        "status": "VERIFIED"
      }
    ],
    "forms": [
      "FORM_MOD_FT_CARDS_ENTRY"
    ],
    "tables": [
      "TABLE_MOD_FT_CARDS_GRID"
    ],
    "dashboards": [
      "DASH_MOD_FT_CARDS_EXECUTIVE"
    ],
    "reports": [
      "REP_MOD_FT_CARDS_SUMMARY"
    ],
    "workflows": [
      "WF_KYCONBOARDINGWORKFLOW",
      "WF_PAYMENTPROCESSINGWORKFLOW"
    ],
    "aiCapabilities": [
      "AI_FINTECHMODULEAGENTREGISTRY",
      "AI_FINTECHCAPABILITYREGISTRY"
    ],
    "permissions": [
      "ROLE_CFO",
      "ROLE_CONTROLLER",
      "ROLE_ACCOUNTANT"
    ],
    "runtimeComponentId": "RTC_CAP_FT_CARDS",
    "mobileParity": {
      "hasMobileView": true,
      "mobileComponentId": "M_RTC_CAP_FT_CARDS",
      "mobileRoute": "/products/fintech/mod-ft-cards/mobile"
    }
  },
  {
    "uiMetadataId": "UIM_CAP_FT_COLLECTIONS",
    "capabilityId": "CAP_FT_COLLECTIONS",
    "productId": "JUMO-FINTECH",
    "moduleId": "MOD_FT_COLLECTIONS",
    "portalId": "PORTAL_FIN_CFO",
    "pageTitle": "Collections Autonomous Engine",
    "navLabel": "Collections Autonomous",
    "icon": "LayoutGrid",
    "route": "/products/fintech/mod-ft-collections",
    "breadcrumbs": [
      "Enterprise",
      "JUMO-FINTECH",
      "Collections Autonomous Engine"
    ],
    "layout": "STANDARD_DASHBOARD_GRID",
    "sections": [
      {
        "id": "SEC_KPI",
        "title": "Executive KPI Metrics",
        "type": "KPI_ROW"
      },
      {
        "id": "SEC_DATA",
        "title": "Operational Records Ledger",
        "type": "GRID_TABLE"
      },
      {
        "id": "SEC_ACTIONS",
        "title": "Action Dispatcher & Approvals",
        "type": "ACTION_BAR"
      }
    ],
    "cards": [
      {
        "id": "CARD_1",
        "title": "Active Work Items",
        "value": "28",
        "status": "NORMAL"
      },
      {
        "id": "CARD_2",
        "title": "Sovereign Audit Parity",
        "value": "100%",
        "status": "VERIFIED"
      }
    ],
    "forms": [
      "FORM_MOD_FT_COLLECTIONS_ENTRY"
    ],
    "tables": [
      "TABLE_MOD_FT_COLLECTIONS_GRID"
    ],
    "dashboards": [
      "DASH_MOD_FT_COLLECTIONS_EXECUTIVE"
    ],
    "reports": [
      "REP_MOD_FT_COLLECTIONS_SUMMARY"
    ],
    "workflows": [
      "WF_KYCONBOARDINGWORKFLOW",
      "WF_PAYMENTPROCESSINGWORKFLOW"
    ],
    "aiCapabilities": [
      "AI_FINTECHMODULEAGENTREGISTRY",
      "AI_FINTECHCAPABILITYREGISTRY"
    ],
    "permissions": [
      "ROLE_CFO",
      "ROLE_CONTROLLER",
      "ROLE_ACCOUNTANT"
    ],
    "runtimeComponentId": "RTC_CAP_FT_COLLECTIONS",
    "mobileParity": {
      "hasMobileView": true,
      "mobileComponentId": "M_RTC_CAP_FT_COLLECTIONS",
      "mobileRoute": "/products/fintech/mod-ft-collections/mobile"
    }
  },
  {
    "uiMetadataId": "UIM_CAP_FT_COMPLIANCE",
    "capabilityId": "CAP_FT_COMPLIANCE",
    "productId": "JUMO-FINTECH",
    "moduleId": "MOD_FT_COMPLIANCE",
    "portalId": "PORTAL_FIN_CFO",
    "pageTitle": "Compliance Autonomous Engine",
    "navLabel": "Compliance Autonomous",
    "icon": "LayoutGrid",
    "route": "/products/fintech/mod-ft-compliance",
    "breadcrumbs": [
      "Enterprise",
      "JUMO-FINTECH",
      "Compliance Autonomous Engine"
    ],
    "layout": "STANDARD_DASHBOARD_GRID",
    "sections": [
      {
        "id": "SEC_KPI",
        "title": "Executive KPI Metrics",
        "type": "KPI_ROW"
      },
      {
        "id": "SEC_DATA",
        "title": "Operational Records Ledger",
        "type": "GRID_TABLE"
      },
      {
        "id": "SEC_ACTIONS",
        "title": "Action Dispatcher & Approvals",
        "type": "ACTION_BAR"
      }
    ],
    "cards": [
      {
        "id": "CARD_1",
        "title": "Active Work Items",
        "value": "28",
        "status": "NORMAL"
      },
      {
        "id": "CARD_2",
        "title": "Sovereign Audit Parity",
        "value": "100%",
        "status": "VERIFIED"
      }
    ],
    "forms": [
      "FORM_MOD_FT_COMPLIANCE_ENTRY"
    ],
    "tables": [
      "TABLE_MOD_FT_COMPLIANCE_GRID"
    ],
    "dashboards": [
      "DASH_MOD_FT_COMPLIANCE_EXECUTIVE"
    ],
    "reports": [
      "REP_MOD_FT_COMPLIANCE_SUMMARY"
    ],
    "workflows": [
      "WF_KYCONBOARDINGWORKFLOW",
      "WF_PAYMENTPROCESSINGWORKFLOW"
    ],
    "aiCapabilities": [
      "AI_FINTECHMODULEAGENTREGISTRY",
      "AI_FINTECHCAPABILITYREGISTRY"
    ],
    "permissions": [
      "ROLE_CFO",
      "ROLE_CONTROLLER",
      "ROLE_ACCOUNTANT"
    ],
    "runtimeComponentId": "RTC_CAP_FT_COMPLIANCE",
    "mobileParity": {
      "hasMobileView": true,
      "mobileComponentId": "M_RTC_CAP_FT_COMPLIANCE",
      "mobileRoute": "/products/fintech/mod-ft-compliance/mobile"
    }
  },
  {
    "uiMetadataId": "UIM_CAP_FT_CROSS_BORDER",
    "capabilityId": "CAP_FT_CROSS_BORDER",
    "productId": "JUMO-FINTECH",
    "moduleId": "MOD_FT_CROSS_BORDER",
    "portalId": "PORTAL_FIN_CFO",
    "pageTitle": "Cross Border Autonomous Engine",
    "navLabel": "Cross Border",
    "icon": "LayoutGrid",
    "route": "/products/fintech/mod-ft-cross-border",
    "breadcrumbs": [
      "Enterprise",
      "JUMO-FINTECH",
      "Cross Border Autonomous Engine"
    ],
    "layout": "STANDARD_DASHBOARD_GRID",
    "sections": [
      {
        "id": "SEC_KPI",
        "title": "Executive KPI Metrics",
        "type": "KPI_ROW"
      },
      {
        "id": "SEC_DATA",
        "title": "Operational Records Ledger",
        "type": "GRID_TABLE"
      },
      {
        "id": "SEC_ACTIONS",
        "title": "Action Dispatcher & Approvals",
        "type": "ACTION_BAR"
      }
    ],
    "cards": [
      {
        "id": "CARD_1",
        "title": "Active Work Items",
        "value": "28",
        "status": "NORMAL"
      },
      {
        "id": "CARD_2",
        "title": "Sovereign Audit Parity",
        "value": "100%",
        "status": "VERIFIED"
      }
    ],
    "forms": [
      "FORM_MOD_FT_CROSS_BORDER_ENTRY"
    ],
    "tables": [
      "TABLE_MOD_FT_CROSS_BORDER_GRID"
    ],
    "dashboards": [
      "DASH_MOD_FT_CROSS_BORDER_EXECUTIVE"
    ],
    "reports": [
      "REP_MOD_FT_CROSS_BORDER_SUMMARY"
    ],
    "workflows": [
      "WF_KYCONBOARDINGWORKFLOW",
      "WF_PAYMENTPROCESSINGWORKFLOW"
    ],
    "aiCapabilities": [
      "AI_FINTECHMODULEAGENTREGISTRY",
      "AI_FINTECHCAPABILITYREGISTRY"
    ],
    "permissions": [
      "ROLE_CFO",
      "ROLE_CONTROLLER",
      "ROLE_ACCOUNTANT"
    ],
    "runtimeComponentId": "RTC_CAP_FT_CROSS_BORDER",
    "mobileParity": {
      "hasMobileView": true,
      "mobileComponentId": "M_RTC_CAP_FT_CROSS_BORDER",
      "mobileRoute": "/products/fintech/mod-ft-cross-border/mobile"
    }
  },
  {
    "uiMetadataId": "UIM_CAP_FT_DATA_INTELLIGENCE",
    "capabilityId": "CAP_FT_DATA_INTELLIGENCE",
    "productId": "JUMO-FINTECH",
    "moduleId": "MOD_FT_DATA_INTELLIGENCE",
    "portalId": "PORTAL_FIN_CFO",
    "pageTitle": "Data Intelligence Autonomous Engine",
    "navLabel": "Data Intelligence",
    "icon": "LayoutGrid",
    "route": "/products/fintech/mod-ft-data-intelligence",
    "breadcrumbs": [
      "Enterprise",
      "JUMO-FINTECH",
      "Data Intelligence Autonomous Engine"
    ],
    "layout": "STANDARD_DASHBOARD_GRID",
    "sections": [
      {
        "id": "SEC_KPI",
        "title": "Executive KPI Metrics",
        "type": "KPI_ROW"
      },
      {
        "id": "SEC_DATA",
        "title": "Operational Records Ledger",
        "type": "GRID_TABLE"
      },
      {
        "id": "SEC_ACTIONS",
        "title": "Action Dispatcher & Approvals",
        "type": "ACTION_BAR"
      }
    ],
    "cards": [
      {
        "id": "CARD_1",
        "title": "Active Work Items",
        "value": "28",
        "status": "NORMAL"
      },
      {
        "id": "CARD_2",
        "title": "Sovereign Audit Parity",
        "value": "100%",
        "status": "VERIFIED"
      }
    ],
    "forms": [
      "FORM_MOD_FT_DATA_INTELLIGENCE_ENTRY"
    ],
    "tables": [
      "TABLE_MOD_FT_DATA_INTELLIGENCE_GRID"
    ],
    "dashboards": [
      "DASH_MOD_FT_DATA_INTELLIGENCE_EXECUTIVE"
    ],
    "reports": [
      "REP_MOD_FT_DATA_INTELLIGENCE_SUMMARY"
    ],
    "workflows": [
      "WF_KYCONBOARDINGWORKFLOW",
      "WF_PAYMENTPROCESSINGWORKFLOW"
    ],
    "aiCapabilities": [
      "AI_FINTECHMODULEAGENTREGISTRY",
      "AI_FINTECHCAPABILITYREGISTRY"
    ],
    "permissions": [
      "ROLE_CFO",
      "ROLE_CONTROLLER",
      "ROLE_ACCOUNTANT"
    ],
    "runtimeComponentId": "RTC_CAP_FT_DATA_INTELLIGENCE",
    "mobileParity": {
      "hasMobileView": true,
      "mobileComponentId": "M_RTC_CAP_FT_DATA_INTELLIGENCE",
      "mobileRoute": "/products/fintech/mod-ft-data-intelligence/mobile"
    }
  },
  {
    "uiMetadataId": "UIM_CAP_FT_DEVELOPER_API",
    "capabilityId": "CAP_FT_DEVELOPER_API",
    "productId": "JUMO-FINTECH",
    "moduleId": "MOD_FT_DEVELOPER_API",
    "portalId": "PORTAL_FIN_CFO",
    "pageTitle": "Developer Api Autonomous Engine",
    "navLabel": "Developer Api",
    "icon": "LayoutGrid",
    "route": "/products/fintech/mod-ft-developer-api",
    "breadcrumbs": [
      "Enterprise",
      "JUMO-FINTECH",
      "Developer Api Autonomous Engine"
    ],
    "layout": "STANDARD_DASHBOARD_GRID",
    "sections": [
      {
        "id": "SEC_KPI",
        "title": "Executive KPI Metrics",
        "type": "KPI_ROW"
      },
      {
        "id": "SEC_DATA",
        "title": "Operational Records Ledger",
        "type": "GRID_TABLE"
      },
      {
        "id": "SEC_ACTIONS",
        "title": "Action Dispatcher & Approvals",
        "type": "ACTION_BAR"
      }
    ],
    "cards": [
      {
        "id": "CARD_1",
        "title": "Active Work Items",
        "value": "28",
        "status": "NORMAL"
      },
      {
        "id": "CARD_2",
        "title": "Sovereign Audit Parity",
        "value": "100%",
        "status": "VERIFIED"
      }
    ],
    "forms": [
      "FORM_MOD_FT_DEVELOPER_API_ENTRY"
    ],
    "tables": [
      "TABLE_MOD_FT_DEVELOPER_API_GRID"
    ],
    "dashboards": [
      "DASH_MOD_FT_DEVELOPER_API_EXECUTIVE"
    ],
    "reports": [
      "REP_MOD_FT_DEVELOPER_API_SUMMARY"
    ],
    "workflows": [
      "WF_KYCONBOARDINGWORKFLOW",
      "WF_PAYMENTPROCESSINGWORKFLOW"
    ],
    "aiCapabilities": [
      "AI_FINTECHMODULEAGENTREGISTRY",
      "AI_FINTECHCAPABILITYREGISTRY"
    ],
    "permissions": [
      "ROLE_CFO",
      "ROLE_CONTROLLER",
      "ROLE_ACCOUNTANT"
    ],
    "runtimeComponentId": "RTC_CAP_FT_DEVELOPER_API",
    "mobileParity": {
      "hasMobileView": true,
      "mobileComponentId": "M_RTC_CAP_FT_DEVELOPER_API",
      "mobileRoute": "/products/fintech/mod-ft-developer-api/mobile"
    }
  },
  {
    "uiMetadataId": "UIM_CAP_FT_DIGITAL_BANKING",
    "capabilityId": "CAP_FT_DIGITAL_BANKING",
    "productId": "JUMO-FINTECH",
    "moduleId": "MOD_FT_DIGITAL_BANKING",
    "portalId": "PORTAL_FIN_CFO",
    "pageTitle": "Digital Banking Autonomous Engine",
    "navLabel": "Digital Banking",
    "icon": "LayoutGrid",
    "route": "/products/fintech/mod-ft-digital-banking",
    "breadcrumbs": [
      "Enterprise",
      "JUMO-FINTECH",
      "Digital Banking Autonomous Engine"
    ],
    "layout": "STANDARD_DASHBOARD_GRID",
    "sections": [
      {
        "id": "SEC_KPI",
        "title": "Executive KPI Metrics",
        "type": "KPI_ROW"
      },
      {
        "id": "SEC_DATA",
        "title": "Operational Records Ledger",
        "type": "GRID_TABLE"
      },
      {
        "id": "SEC_ACTIONS",
        "title": "Action Dispatcher & Approvals",
        "type": "ACTION_BAR"
      }
    ],
    "cards": [
      {
        "id": "CARD_1",
        "title": "Active Work Items",
        "value": "28",
        "status": "NORMAL"
      },
      {
        "id": "CARD_2",
        "title": "Sovereign Audit Parity",
        "value": "100%",
        "status": "VERIFIED"
      }
    ],
    "forms": [
      "FORM_MOD_FT_DIGITAL_BANKING_ENTRY"
    ],
    "tables": [
      "TABLE_MOD_FT_DIGITAL_BANKING_GRID"
    ],
    "dashboards": [
      "DASH_MOD_FT_DIGITAL_BANKING_EXECUTIVE"
    ],
    "reports": [
      "REP_MOD_FT_DIGITAL_BANKING_SUMMARY"
    ],
    "workflows": [
      "WF_KYCONBOARDINGWORKFLOW",
      "WF_PAYMENTPROCESSINGWORKFLOW"
    ],
    "aiCapabilities": [
      "AI_FINTECHMODULEAGENTREGISTRY",
      "AI_FINTECHCAPABILITYREGISTRY"
    ],
    "permissions": [
      "ROLE_CFO",
      "ROLE_CONTROLLER",
      "ROLE_ACCOUNTANT"
    ],
    "runtimeComponentId": "RTC_CAP_FT_DIGITAL_BANKING",
    "mobileParity": {
      "hasMobileView": true,
      "mobileComponentId": "M_RTC_CAP_FT_DIGITAL_BANKING",
      "mobileRoute": "/products/fintech/mod-ft-digital-banking/mobile"
    }
  },
  {
    "uiMetadataId": "UIM_CAP_FT_DIGITAL_WALLETS",
    "capabilityId": "CAP_FT_DIGITAL_WALLETS",
    "productId": "JUMO-FINTECH",
    "moduleId": "MOD_FT_DIGITAL_WALLETS",
    "portalId": "PORTAL_FIN_CFO",
    "pageTitle": "Digital Wallets Autonomous Engine",
    "navLabel": "Digital Wallets",
    "icon": "LayoutGrid",
    "route": "/products/fintech/mod-ft-digital-wallets",
    "breadcrumbs": [
      "Enterprise",
      "JUMO-FINTECH",
      "Digital Wallets Autonomous Engine"
    ],
    "layout": "STANDARD_DASHBOARD_GRID",
    "sections": [
      {
        "id": "SEC_KPI",
        "title": "Executive KPI Metrics",
        "type": "KPI_ROW"
      },
      {
        "id": "SEC_DATA",
        "title": "Operational Records Ledger",
        "type": "GRID_TABLE"
      },
      {
        "id": "SEC_ACTIONS",
        "title": "Action Dispatcher & Approvals",
        "type": "ACTION_BAR"
      }
    ],
    "cards": [
      {
        "id": "CARD_1",
        "title": "Active Work Items",
        "value": "28",
        "status": "NORMAL"
      },
      {
        "id": "CARD_2",
        "title": "Sovereign Audit Parity",
        "value": "100%",
        "status": "VERIFIED"
      }
    ],
    "forms": [
      "FORM_MOD_FT_DIGITAL_WALLETS_ENTRY"
    ],
    "tables": [
      "TABLE_MOD_FT_DIGITAL_WALLETS_GRID"
    ],
    "dashboards": [
      "DASH_MOD_FT_DIGITAL_WALLETS_EXECUTIVE"
    ],
    "reports": [
      "REP_MOD_FT_DIGITAL_WALLETS_SUMMARY"
    ],
    "workflows": [
      "WF_KYCONBOARDINGWORKFLOW",
      "WF_PAYMENTPROCESSINGWORKFLOW"
    ],
    "aiCapabilities": [
      "AI_FINTECHMODULEAGENTREGISTRY",
      "AI_FINTECHCAPABILITYREGISTRY"
    ],
    "permissions": [
      "ROLE_CFO",
      "ROLE_CONTROLLER",
      "ROLE_ACCOUNTANT"
    ],
    "runtimeComponentId": "RTC_CAP_FT_DIGITAL_WALLETS",
    "mobileParity": {
      "hasMobileView": true,
      "mobileComponentId": "M_RTC_CAP_FT_DIGITAL_WALLETS",
      "mobileRoute": "/products/fintech/mod-ft-digital-wallets/mobile"
    }
  },
  {
    "uiMetadataId": "UIM_CAP_FT_EMBEDDED_FINANCE",
    "capabilityId": "CAP_FT_EMBEDDED_FINANCE",
    "productId": "JUMO-FINTECH",
    "moduleId": "MOD_FT_EMBEDDED_FINANCE",
    "portalId": "PORTAL_FIN_CFO",
    "pageTitle": "Embedded Finance Autonomous Engine",
    "navLabel": "Embedded Finance",
    "icon": "LayoutGrid",
    "route": "/products/fintech/mod-ft-embedded-finance",
    "breadcrumbs": [
      "Enterprise",
      "JUMO-FINTECH",
      "Embedded Finance Autonomous Engine"
    ],
    "layout": "STANDARD_DASHBOARD_GRID",
    "sections": [
      {
        "id": "SEC_KPI",
        "title": "Executive KPI Metrics",
        "type": "KPI_ROW"
      },
      {
        "id": "SEC_DATA",
        "title": "Operational Records Ledger",
        "type": "GRID_TABLE"
      },
      {
        "id": "SEC_ACTIONS",
        "title": "Action Dispatcher & Approvals",
        "type": "ACTION_BAR"
      }
    ],
    "cards": [
      {
        "id": "CARD_1",
        "title": "Active Work Items",
        "value": "28",
        "status": "NORMAL"
      },
      {
        "id": "CARD_2",
        "title": "Sovereign Audit Parity",
        "value": "100%",
        "status": "VERIFIED"
      }
    ],
    "forms": [
      "FORM_MOD_FT_EMBEDDED_FINANCE_ENTRY"
    ],
    "tables": [
      "TABLE_MOD_FT_EMBEDDED_FINANCE_GRID"
    ],
    "dashboards": [
      "DASH_MOD_FT_EMBEDDED_FINANCE_EXECUTIVE"
    ],
    "reports": [
      "REP_MOD_FT_EMBEDDED_FINANCE_SUMMARY"
    ],
    "workflows": [
      "WF_KYCONBOARDINGWORKFLOW",
      "WF_PAYMENTPROCESSINGWORKFLOW"
    ],
    "aiCapabilities": [
      "AI_FINTECHMODULEAGENTREGISTRY",
      "AI_FINTECHCAPABILITYREGISTRY"
    ],
    "permissions": [
      "ROLE_CFO",
      "ROLE_CONTROLLER",
      "ROLE_ACCOUNTANT"
    ],
    "runtimeComponentId": "RTC_CAP_FT_EMBEDDED_FINANCE",
    "mobileParity": {
      "hasMobileView": true,
      "mobileComponentId": "M_RTC_CAP_FT_EMBEDDED_FINANCE",
      "mobileRoute": "/products/fintech/mod-ft-embedded-finance/mobile"
    }
  },
  {
    "uiMetadataId": "UIM_CAP_FT_FINANCIAL_ACCOUNTING",
    "capabilityId": "CAP_FT_FINANCIAL_ACCOUNTING",
    "productId": "JUMO-FINTECH",
    "moduleId": "MOD_FT_FINANCIAL_ACCOUNTING",
    "portalId": "PORTAL_FIN_CFO",
    "pageTitle": "Financial Accounting Autonomous Engine",
    "navLabel": "Financial Accounting",
    "icon": "LayoutGrid",
    "route": "/products/fintech/mod-ft-financial-accounting",
    "breadcrumbs": [
      "Enterprise",
      "JUMO-FINTECH",
      "Financial Accounting Autonomous Engine"
    ],
    "layout": "STANDARD_DASHBOARD_GRID",
    "sections": [
      {
        "id": "SEC_KPI",
        "title": "Executive KPI Metrics",
        "type": "KPI_ROW"
      },
      {
        "id": "SEC_DATA",
        "title": "Operational Records Ledger",
        "type": "GRID_TABLE"
      },
      {
        "id": "SEC_ACTIONS",
        "title": "Action Dispatcher & Approvals",
        "type": "ACTION_BAR"
      }
    ],
    "cards": [
      {
        "id": "CARD_1",
        "title": "Active Work Items",
        "value": "28",
        "status": "NORMAL"
      },
      {
        "id": "CARD_2",
        "title": "Sovereign Audit Parity",
        "value": "100%",
        "status": "VERIFIED"
      }
    ],
    "forms": [
      "FORM_MOD_FT_FINANCIAL_ACCOUNTING_ENTRY"
    ],
    "tables": [
      "TABLE_MOD_FT_FINANCIAL_ACCOUNTING_GRID"
    ],
    "dashboards": [
      "DASH_MOD_FT_FINANCIAL_ACCOUNTING_EXECUTIVE"
    ],
    "reports": [
      "REP_MOD_FT_FINANCIAL_ACCOUNTING_SUMMARY"
    ],
    "workflows": [
      "WF_KYCONBOARDINGWORKFLOW",
      "WF_PAYMENTPROCESSINGWORKFLOW"
    ],
    "aiCapabilities": [
      "AI_FINTECHMODULEAGENTREGISTRY",
      "AI_FINTECHCAPABILITYREGISTRY"
    ],
    "permissions": [
      "ROLE_CFO",
      "ROLE_CONTROLLER",
      "ROLE_ACCOUNTANT"
    ],
    "runtimeComponentId": "RTC_CAP_FT_FINANCIAL_ACCOUNTING",
    "mobileParity": {
      "hasMobileView": true,
      "mobileComponentId": "M_RTC_CAP_FT_FINANCIAL_ACCOUNTING",
      "mobileRoute": "/products/fintech/mod-ft-financial-accounting/mobile"
    }
  },
  {
    "uiMetadataId": "UIM_CAP_FT_FX",
    "capabilityId": "CAP_FT_FX",
    "productId": "JUMO-FINTECH",
    "moduleId": "MOD_FT_FX",
    "portalId": "PORTAL_FIN_CFO",
    "pageTitle": "Fx Autonomous Engine",
    "navLabel": "Fx Autonomous",
    "icon": "LayoutGrid",
    "route": "/products/fintech/mod-ft-fx",
    "breadcrumbs": [
      "Enterprise",
      "JUMO-FINTECH",
      "Fx Autonomous Engine"
    ],
    "layout": "STANDARD_DASHBOARD_GRID",
    "sections": [
      {
        "id": "SEC_KPI",
        "title": "Executive KPI Metrics",
        "type": "KPI_ROW"
      },
      {
        "id": "SEC_DATA",
        "title": "Operational Records Ledger",
        "type": "GRID_TABLE"
      },
      {
        "id": "SEC_ACTIONS",
        "title": "Action Dispatcher & Approvals",
        "type": "ACTION_BAR"
      }
    ],
    "cards": [
      {
        "id": "CARD_1",
        "title": "Active Work Items",
        "value": "28",
        "status": "NORMAL"
      },
      {
        "id": "CARD_2",
        "title": "Sovereign Audit Parity",
        "value": "100%",
        "status": "VERIFIED"
      }
    ],
    "forms": [
      "FORM_MOD_FT_FX_ENTRY"
    ],
    "tables": [
      "TABLE_MOD_FT_FX_GRID"
    ],
    "dashboards": [
      "DASH_MOD_FT_FX_EXECUTIVE"
    ],
    "reports": [
      "REP_MOD_FT_FX_SUMMARY"
    ],
    "workflows": [
      "WF_KYCONBOARDINGWORKFLOW",
      "WF_PAYMENTPROCESSINGWORKFLOW"
    ],
    "aiCapabilities": [
      "AI_FINTECHMODULEAGENTREGISTRY",
      "AI_FINTECHCAPABILITYREGISTRY"
    ],
    "permissions": [
      "ROLE_CFO",
      "ROLE_CONTROLLER",
      "ROLE_ACCOUNTANT"
    ],
    "runtimeComponentId": "RTC_CAP_FT_FX",
    "mobileParity": {
      "hasMobileView": true,
      "mobileComponentId": "M_RTC_CAP_FT_FX",
      "mobileRoute": "/products/fintech/mod-ft-fx/mobile"
    }
  },
  {
    "uiMetadataId": "UIM_CAP_FT_GLOBAL_ACCOUNTS",
    "capabilityId": "CAP_FT_GLOBAL_ACCOUNTS",
    "productId": "JUMO-FINTECH",
    "moduleId": "MOD_FT_GLOBAL_ACCOUNTS",
    "portalId": "PORTAL_FIN_CFO",
    "pageTitle": "Global Accounts Autonomous Engine",
    "navLabel": "Global Accounts",
    "icon": "LayoutGrid",
    "route": "/products/fintech/mod-ft-global-accounts",
    "breadcrumbs": [
      "Enterprise",
      "JUMO-FINTECH",
      "Global Accounts Autonomous Engine"
    ],
    "layout": "STANDARD_DASHBOARD_GRID",
    "sections": [
      {
        "id": "SEC_KPI",
        "title": "Executive KPI Metrics",
        "type": "KPI_ROW"
      },
      {
        "id": "SEC_DATA",
        "title": "Operational Records Ledger",
        "type": "GRID_TABLE"
      },
      {
        "id": "SEC_ACTIONS",
        "title": "Action Dispatcher & Approvals",
        "type": "ACTION_BAR"
      }
    ],
    "cards": [
      {
        "id": "CARD_1",
        "title": "Active Work Items",
        "value": "28",
        "status": "NORMAL"
      },
      {
        "id": "CARD_2",
        "title": "Sovereign Audit Parity",
        "value": "100%",
        "status": "VERIFIED"
      }
    ],
    "forms": [
      "FORM_MOD_FT_GLOBAL_ACCOUNTS_ENTRY"
    ],
    "tables": [
      "TABLE_MOD_FT_GLOBAL_ACCOUNTS_GRID"
    ],
    "dashboards": [
      "DASH_MOD_FT_GLOBAL_ACCOUNTS_EXECUTIVE"
    ],
    "reports": [
      "REP_MOD_FT_GLOBAL_ACCOUNTS_SUMMARY"
    ],
    "workflows": [
      "WF_KYCONBOARDINGWORKFLOW",
      "WF_PAYMENTPROCESSINGWORKFLOW"
    ],
    "aiCapabilities": [
      "AI_FINTECHMODULEAGENTREGISTRY",
      "AI_FINTECHCAPABILITYREGISTRY"
    ],
    "permissions": [
      "ROLE_CFO",
      "ROLE_CONTROLLER",
      "ROLE_ACCOUNTANT"
    ],
    "runtimeComponentId": "RTC_CAP_FT_GLOBAL_ACCOUNTS",
    "mobileParity": {
      "hasMobileView": true,
      "mobileComponentId": "M_RTC_CAP_FT_GLOBAL_ACCOUNTS",
      "mobileRoute": "/products/fintech/mod-ft-global-accounts/mobile"
    }
  },
  {
    "uiMetadataId": "UIM_CAP_FT_INSURANCE",
    "capabilityId": "CAP_FT_INSURANCE",
    "productId": "JUMO-FINTECH",
    "moduleId": "MOD_FT_INSURANCE",
    "portalId": "PORTAL_FIN_CFO",
    "pageTitle": "Insurance Autonomous Engine",
    "navLabel": "Insurance Autonomous",
    "icon": "LayoutGrid",
    "route": "/products/fintech/mod-ft-insurance",
    "breadcrumbs": [
      "Enterprise",
      "JUMO-FINTECH",
      "Insurance Autonomous Engine"
    ],
    "layout": "STANDARD_DASHBOARD_GRID",
    "sections": [
      {
        "id": "SEC_KPI",
        "title": "Executive KPI Metrics",
        "type": "KPI_ROW"
      },
      {
        "id": "SEC_DATA",
        "title": "Operational Records Ledger",
        "type": "GRID_TABLE"
      },
      {
        "id": "SEC_ACTIONS",
        "title": "Action Dispatcher & Approvals",
        "type": "ACTION_BAR"
      }
    ],
    "cards": [
      {
        "id": "CARD_1",
        "title": "Active Work Items",
        "value": "28",
        "status": "NORMAL"
      },
      {
        "id": "CARD_2",
        "title": "Sovereign Audit Parity",
        "value": "100%",
        "status": "VERIFIED"
      }
    ],
    "forms": [
      "FORM_MOD_FT_INSURANCE_ENTRY"
    ],
    "tables": [
      "TABLE_MOD_FT_INSURANCE_GRID"
    ],
    "dashboards": [
      "DASH_MOD_FT_INSURANCE_EXECUTIVE"
    ],
    "reports": [
      "REP_MOD_FT_INSURANCE_SUMMARY"
    ],
    "workflows": [
      "WF_KYCONBOARDINGWORKFLOW",
      "WF_PAYMENTPROCESSINGWORKFLOW"
    ],
    "aiCapabilities": [
      "AI_FINTECHMODULEAGENTREGISTRY",
      "AI_FINTECHCAPABILITYREGISTRY"
    ],
    "permissions": [
      "ROLE_CFO",
      "ROLE_CONTROLLER",
      "ROLE_ACCOUNTANT"
    ],
    "runtimeComponentId": "RTC_CAP_FT_INSURANCE",
    "mobileParity": {
      "hasMobileView": true,
      "mobileComponentId": "M_RTC_CAP_FT_INSURANCE",
      "mobileRoute": "/products/fintech/mod-ft-insurance/mobile"
    }
  },
  {
    "uiMetadataId": "UIM_CAP_FT_INVESTMENT",
    "capabilityId": "CAP_FT_INVESTMENT",
    "productId": "JUMO-FINTECH",
    "moduleId": "MOD_FT_INVESTMENT",
    "portalId": "PORTAL_FIN_CFO",
    "pageTitle": "Investment Autonomous Engine",
    "navLabel": "Investment Autonomous",
    "icon": "LayoutGrid",
    "route": "/products/fintech/mod-ft-investment",
    "breadcrumbs": [
      "Enterprise",
      "JUMO-FINTECH",
      "Investment Autonomous Engine"
    ],
    "layout": "STANDARD_DASHBOARD_GRID",
    "sections": [
      {
        "id": "SEC_KPI",
        "title": "Executive KPI Metrics",
        "type": "KPI_ROW"
      },
      {
        "id": "SEC_DATA",
        "title": "Operational Records Ledger",
        "type": "GRID_TABLE"
      },
      {
        "id": "SEC_ACTIONS",
        "title": "Action Dispatcher & Approvals",
        "type": "ACTION_BAR"
      }
    ],
    "cards": [
      {
        "id": "CARD_1",
        "title": "Active Work Items",
        "value": "28",
        "status": "NORMAL"
      },
      {
        "id": "CARD_2",
        "title": "Sovereign Audit Parity",
        "value": "100%",
        "status": "VERIFIED"
      }
    ],
    "forms": [
      "FORM_MOD_FT_INVESTMENT_ENTRY"
    ],
    "tables": [
      "TABLE_MOD_FT_INVESTMENT_GRID"
    ],
    "dashboards": [
      "DASH_MOD_FT_INVESTMENT_EXECUTIVE"
    ],
    "reports": [
      "REP_MOD_FT_INVESTMENT_SUMMARY"
    ],
    "workflows": [
      "WF_KYCONBOARDINGWORKFLOW",
      "WF_PAYMENTPROCESSINGWORKFLOW"
    ],
    "aiCapabilities": [
      "AI_FINTECHMODULEAGENTREGISTRY",
      "AI_FINTECHCAPABILITYREGISTRY"
    ],
    "permissions": [
      "ROLE_CFO",
      "ROLE_CONTROLLER",
      "ROLE_ACCOUNTANT"
    ],
    "runtimeComponentId": "RTC_CAP_FT_INVESTMENT",
    "mobileParity": {
      "hasMobileView": true,
      "mobileComponentId": "M_RTC_CAP_FT_INVESTMENT",
      "mobileRoute": "/products/fintech/mod-ft-investment/mobile"
    }
  },
  {
    "uiMetadataId": "UIM_CAP_FT_LENDING",
    "capabilityId": "CAP_FT_LENDING",
    "productId": "JUMO-FINTECH",
    "moduleId": "MOD_FT_LENDING",
    "portalId": "PORTAL_FIN_CFO",
    "pageTitle": "Lending Autonomous Engine",
    "navLabel": "Lending Autonomous",
    "icon": "LayoutGrid",
    "route": "/products/fintech/mod-ft-lending",
    "breadcrumbs": [
      "Enterprise",
      "JUMO-FINTECH",
      "Lending Autonomous Engine"
    ],
    "layout": "STANDARD_DASHBOARD_GRID",
    "sections": [
      {
        "id": "SEC_KPI",
        "title": "Executive KPI Metrics",
        "type": "KPI_ROW"
      },
      {
        "id": "SEC_DATA",
        "title": "Operational Records Ledger",
        "type": "GRID_TABLE"
      },
      {
        "id": "SEC_ACTIONS",
        "title": "Action Dispatcher & Approvals",
        "type": "ACTION_BAR"
      }
    ],
    "cards": [
      {
        "id": "CARD_1",
        "title": "Active Work Items",
        "value": "28",
        "status": "NORMAL"
      },
      {
        "id": "CARD_2",
        "title": "Sovereign Audit Parity",
        "value": "100%",
        "status": "VERIFIED"
      }
    ],
    "forms": [
      "FORM_MOD_FT_LENDING_ENTRY"
    ],
    "tables": [
      "TABLE_MOD_FT_LENDING_GRID"
    ],
    "dashboards": [
      "DASH_MOD_FT_LENDING_EXECUTIVE"
    ],
    "reports": [
      "REP_MOD_FT_LENDING_SUMMARY"
    ],
    "workflows": [
      "WF_KYCONBOARDINGWORKFLOW",
      "WF_PAYMENTPROCESSINGWORKFLOW"
    ],
    "aiCapabilities": [
      "AI_FINTECHMODULEAGENTREGISTRY",
      "AI_FINTECHCAPABILITYREGISTRY"
    ],
    "permissions": [
      "ROLE_CFO",
      "ROLE_CONTROLLER",
      "ROLE_ACCOUNTANT"
    ],
    "runtimeComponentId": "RTC_CAP_FT_LENDING",
    "mobileParity": {
      "hasMobileView": true,
      "mobileComponentId": "M_RTC_CAP_FT_LENDING",
      "mobileRoute": "/products/fintech/mod-ft-lending/mobile"
    }
  },
  {
    "uiMetadataId": "UIM_CAP_FT_MERCHANT_ACQUIRING",
    "capabilityId": "CAP_FT_MERCHANT_ACQUIRING",
    "productId": "JUMO-FINTECH",
    "moduleId": "MOD_FT_MERCHANT_ACQUIRING",
    "portalId": "PORTAL_FIN_CFO",
    "pageTitle": "Merchant Acquiring Autonomous Engine",
    "navLabel": "Merchant Acquiring",
    "icon": "LayoutGrid",
    "route": "/products/fintech/mod-ft-merchant-acquiring",
    "breadcrumbs": [
      "Enterprise",
      "JUMO-FINTECH",
      "Merchant Acquiring Autonomous Engine"
    ],
    "layout": "STANDARD_DASHBOARD_GRID",
    "sections": [
      {
        "id": "SEC_KPI",
        "title": "Executive KPI Metrics",
        "type": "KPI_ROW"
      },
      {
        "id": "SEC_DATA",
        "title": "Operational Records Ledger",
        "type": "GRID_TABLE"
      },
      {
        "id": "SEC_ACTIONS",
        "title": "Action Dispatcher & Approvals",
        "type": "ACTION_BAR"
      }
    ],
    "cards": [
      {
        "id": "CARD_1",
        "title": "Active Work Items",
        "value": "28",
        "status": "NORMAL"
      },
      {
        "id": "CARD_2",
        "title": "Sovereign Audit Parity",
        "value": "100%",
        "status": "VERIFIED"
      }
    ],
    "forms": [
      "FORM_MOD_FT_MERCHANT_ACQUIRING_ENTRY"
    ],
    "tables": [
      "TABLE_MOD_FT_MERCHANT_ACQUIRING_GRID"
    ],
    "dashboards": [
      "DASH_MOD_FT_MERCHANT_ACQUIRING_EXECUTIVE"
    ],
    "reports": [
      "REP_MOD_FT_MERCHANT_ACQUIRING_SUMMARY"
    ],
    "workflows": [
      "WF_KYCONBOARDINGWORKFLOW",
      "WF_PAYMENTPROCESSINGWORKFLOW"
    ],
    "aiCapabilities": [
      "AI_FINTECHMODULEAGENTREGISTRY",
      "AI_FINTECHCAPABILITYREGISTRY"
    ],
    "permissions": [
      "ROLE_CFO",
      "ROLE_CONTROLLER",
      "ROLE_ACCOUNTANT"
    ],
    "runtimeComponentId": "RTC_CAP_FT_MERCHANT_ACQUIRING",
    "mobileParity": {
      "hasMobileView": true,
      "mobileComponentId": "M_RTC_CAP_FT_MERCHANT_ACQUIRING",
      "mobileRoute": "/products/fintech/mod-ft-merchant-acquiring/mobile"
    }
  },
  {
    "uiMetadataId": "UIM_CAP_FT_MERCHANT_SERVICES",
    "capabilityId": "CAP_FT_MERCHANT_SERVICES",
    "productId": "JUMO-FINTECH",
    "moduleId": "MOD_FT_MERCHANT_SERVICES",
    "portalId": "PORTAL_FIN_CFO",
    "pageTitle": "Merchant Services Autonomous Engine",
    "navLabel": "Merchant Services",
    "icon": "LayoutGrid",
    "route": "/products/fintech/mod-ft-merchant-services",
    "breadcrumbs": [
      "Enterprise",
      "JUMO-FINTECH",
      "Merchant Services Autonomous Engine"
    ],
    "layout": "STANDARD_DASHBOARD_GRID",
    "sections": [
      {
        "id": "SEC_KPI",
        "title": "Executive KPI Metrics",
        "type": "KPI_ROW"
      },
      {
        "id": "SEC_DATA",
        "title": "Operational Records Ledger",
        "type": "GRID_TABLE"
      },
      {
        "id": "SEC_ACTIONS",
        "title": "Action Dispatcher & Approvals",
        "type": "ACTION_BAR"
      }
    ],
    "cards": [
      {
        "id": "CARD_1",
        "title": "Active Work Items",
        "value": "28",
        "status": "NORMAL"
      },
      {
        "id": "CARD_2",
        "title": "Sovereign Audit Parity",
        "value": "100%",
        "status": "VERIFIED"
      }
    ],
    "forms": [
      "FORM_MOD_FT_MERCHANT_SERVICES_ENTRY"
    ],
    "tables": [
      "TABLE_MOD_FT_MERCHANT_SERVICES_GRID"
    ],
    "dashboards": [
      "DASH_MOD_FT_MERCHANT_SERVICES_EXECUTIVE"
    ],
    "reports": [
      "REP_MOD_FT_MERCHANT_SERVICES_SUMMARY"
    ],
    "workflows": [
      "WF_KYCONBOARDINGWORKFLOW",
      "WF_PAYMENTPROCESSINGWORKFLOW"
    ],
    "aiCapabilities": [
      "AI_FINTECHMODULEAGENTREGISTRY",
      "AI_FINTECHCAPABILITYREGISTRY"
    ],
    "permissions": [
      "ROLE_CFO",
      "ROLE_CONTROLLER",
      "ROLE_ACCOUNTANT"
    ],
    "runtimeComponentId": "RTC_CAP_FT_MERCHANT_SERVICES",
    "mobileParity": {
      "hasMobileView": true,
      "mobileComponentId": "M_RTC_CAP_FT_MERCHANT_SERVICES",
      "mobileRoute": "/products/fintech/mod-ft-merchant-services/mobile"
    }
  },
  {
    "uiMetadataId": "UIM_CAP_FT_MICROFINANCE",
    "capabilityId": "CAP_FT_MICROFINANCE",
    "productId": "JUMO-FINTECH",
    "moduleId": "MOD_FT_MICROFINANCE",
    "portalId": "PORTAL_FIN_CFO",
    "pageTitle": "Microfinance Autonomous Engine",
    "navLabel": "Microfinance Autonomous",
    "icon": "LayoutGrid",
    "route": "/products/fintech/mod-ft-microfinance",
    "breadcrumbs": [
      "Enterprise",
      "JUMO-FINTECH",
      "Microfinance Autonomous Engine"
    ],
    "layout": "STANDARD_DASHBOARD_GRID",
    "sections": [
      {
        "id": "SEC_KPI",
        "title": "Executive KPI Metrics",
        "type": "KPI_ROW"
      },
      {
        "id": "SEC_DATA",
        "title": "Operational Records Ledger",
        "type": "GRID_TABLE"
      },
      {
        "id": "SEC_ACTIONS",
        "title": "Action Dispatcher & Approvals",
        "type": "ACTION_BAR"
      }
    ],
    "cards": [
      {
        "id": "CARD_1",
        "title": "Active Work Items",
        "value": "28",
        "status": "NORMAL"
      },
      {
        "id": "CARD_2",
        "title": "Sovereign Audit Parity",
        "value": "100%",
        "status": "VERIFIED"
      }
    ],
    "forms": [
      "FORM_MOD_FT_MICROFINANCE_ENTRY"
    ],
    "tables": [
      "TABLE_MOD_FT_MICROFINANCE_GRID"
    ],
    "dashboards": [
      "DASH_MOD_FT_MICROFINANCE_EXECUTIVE"
    ],
    "reports": [
      "REP_MOD_FT_MICROFINANCE_SUMMARY"
    ],
    "workflows": [
      "WF_KYCONBOARDINGWORKFLOW",
      "WF_PAYMENTPROCESSINGWORKFLOW"
    ],
    "aiCapabilities": [
      "AI_FINTECHMODULEAGENTREGISTRY",
      "AI_FINTECHCAPABILITYREGISTRY"
    ],
    "permissions": [
      "ROLE_CFO",
      "ROLE_CONTROLLER",
      "ROLE_ACCOUNTANT"
    ],
    "runtimeComponentId": "RTC_CAP_FT_MICROFINANCE",
    "mobileParity": {
      "hasMobileView": true,
      "mobileComponentId": "M_RTC_CAP_FT_MICROFINANCE",
      "mobileRoute": "/products/fintech/mod-ft-microfinance/mobile"
    }
  },
  {
    "uiMetadataId": "UIM_CAP_FT_MOBILE_MONEY",
    "capabilityId": "CAP_FT_MOBILE_MONEY",
    "productId": "JUMO-FINTECH",
    "moduleId": "MOD_FT_MOBILE_MONEY",
    "portalId": "PORTAL_FIN_CFO",
    "pageTitle": "Mobile Money Autonomous Engine",
    "navLabel": "Mobile Money",
    "icon": "LayoutGrid",
    "route": "/products/fintech/mod-ft-mobile-money",
    "breadcrumbs": [
      "Enterprise",
      "JUMO-FINTECH",
      "Mobile Money Autonomous Engine"
    ],
    "layout": "STANDARD_DASHBOARD_GRID",
    "sections": [
      {
        "id": "SEC_KPI",
        "title": "Executive KPI Metrics",
        "type": "KPI_ROW"
      },
      {
        "id": "SEC_DATA",
        "title": "Operational Records Ledger",
        "type": "GRID_TABLE"
      },
      {
        "id": "SEC_ACTIONS",
        "title": "Action Dispatcher & Approvals",
        "type": "ACTION_BAR"
      }
    ],
    "cards": [
      {
        "id": "CARD_1",
        "title": "Active Work Items",
        "value": "28",
        "status": "NORMAL"
      },
      {
        "id": "CARD_2",
        "title": "Sovereign Audit Parity",
        "value": "100%",
        "status": "VERIFIED"
      }
    ],
    "forms": [
      "FORM_MOD_FT_MOBILE_MONEY_ENTRY"
    ],
    "tables": [
      "TABLE_MOD_FT_MOBILE_MONEY_GRID"
    ],
    "dashboards": [
      "DASH_MOD_FT_MOBILE_MONEY_EXECUTIVE"
    ],
    "reports": [
      "REP_MOD_FT_MOBILE_MONEY_SUMMARY"
    ],
    "workflows": [
      "WF_KYCONBOARDINGWORKFLOW",
      "WF_PAYMENTPROCESSINGWORKFLOW"
    ],
    "aiCapabilities": [
      "AI_FINTECHMODULEAGENTREGISTRY",
      "AI_FINTECHCAPABILITYREGISTRY"
    ],
    "permissions": [
      "ROLE_CFO",
      "ROLE_CONTROLLER",
      "ROLE_ACCOUNTANT"
    ],
    "runtimeComponentId": "RTC_CAP_FT_MOBILE_MONEY",
    "mobileParity": {
      "hasMobileView": true,
      "mobileComponentId": "M_RTC_CAP_FT_MOBILE_MONEY",
      "mobileRoute": "/products/fintech/mod-ft-mobile-money/mobile"
    }
  },
  {
    "uiMetadataId": "UIM_CAP_FT_MULTI_CURRENCY",
    "capabilityId": "CAP_FT_MULTI_CURRENCY",
    "productId": "JUMO-FINTECH",
    "moduleId": "MOD_FT_MULTI_CURRENCY",
    "portalId": "PORTAL_FIN_CFO",
    "pageTitle": "Multi Currency Autonomous Engine",
    "navLabel": "Multi Currency",
    "icon": "LayoutGrid",
    "route": "/products/fintech/mod-ft-multi-currency",
    "breadcrumbs": [
      "Enterprise",
      "JUMO-FINTECH",
      "Multi Currency Autonomous Engine"
    ],
    "layout": "STANDARD_DASHBOARD_GRID",
    "sections": [
      {
        "id": "SEC_KPI",
        "title": "Executive KPI Metrics",
        "type": "KPI_ROW"
      },
      {
        "id": "SEC_DATA",
        "title": "Operational Records Ledger",
        "type": "GRID_TABLE"
      },
      {
        "id": "SEC_ACTIONS",
        "title": "Action Dispatcher & Approvals",
        "type": "ACTION_BAR"
      }
    ],
    "cards": [
      {
        "id": "CARD_1",
        "title": "Active Work Items",
        "value": "28",
        "status": "NORMAL"
      },
      {
        "id": "CARD_2",
        "title": "Sovereign Audit Parity",
        "value": "100%",
        "status": "VERIFIED"
      }
    ],
    "forms": [
      "FORM_MOD_FT_MULTI_CURRENCY_ENTRY"
    ],
    "tables": [
      "TABLE_MOD_FT_MULTI_CURRENCY_GRID"
    ],
    "dashboards": [
      "DASH_MOD_FT_MULTI_CURRENCY_EXECUTIVE"
    ],
    "reports": [
      "REP_MOD_FT_MULTI_CURRENCY_SUMMARY"
    ],
    "workflows": [
      "WF_KYCONBOARDINGWORKFLOW",
      "WF_PAYMENTPROCESSINGWORKFLOW"
    ],
    "aiCapabilities": [
      "AI_FINTECHMODULEAGENTREGISTRY",
      "AI_FINTECHCAPABILITYREGISTRY"
    ],
    "permissions": [
      "ROLE_CFO",
      "ROLE_CONTROLLER",
      "ROLE_ACCOUNTANT"
    ],
    "runtimeComponentId": "RTC_CAP_FT_MULTI_CURRENCY",
    "mobileParity": {
      "hasMobileView": true,
      "mobileComponentId": "M_RTC_CAP_FT_MULTI_CURRENCY",
      "mobileRoute": "/products/fintech/mod-ft-multi-currency/mobile"
    }
  },
  {
    "uiMetadataId": "UIM_CAP_FT_PAYMENT_GATEWAY",
    "capabilityId": "CAP_FT_PAYMENT_GATEWAY",
    "productId": "JUMO-FINTECH",
    "moduleId": "MOD_FT_PAYMENT_GATEWAY",
    "portalId": "PORTAL_FIN_CFO",
    "pageTitle": "Payment Gateway Autonomous Engine",
    "navLabel": "Payment Gateway",
    "icon": "LayoutGrid",
    "route": "/products/fintech/mod-ft-payment-gateway",
    "breadcrumbs": [
      "Enterprise",
      "JUMO-FINTECH",
      "Payment Gateway Autonomous Engine"
    ],
    "layout": "STANDARD_DASHBOARD_GRID",
    "sections": [
      {
        "id": "SEC_KPI",
        "title": "Executive KPI Metrics",
        "type": "KPI_ROW"
      },
      {
        "id": "SEC_DATA",
        "title": "Operational Records Ledger",
        "type": "GRID_TABLE"
      },
      {
        "id": "SEC_ACTIONS",
        "title": "Action Dispatcher & Approvals",
        "type": "ACTION_BAR"
      }
    ],
    "cards": [
      {
        "id": "CARD_1",
        "title": "Active Work Items",
        "value": "28",
        "status": "NORMAL"
      },
      {
        "id": "CARD_2",
        "title": "Sovereign Audit Parity",
        "value": "100%",
        "status": "VERIFIED"
      }
    ],
    "forms": [
      "FORM_MOD_FT_PAYMENT_GATEWAY_ENTRY"
    ],
    "tables": [
      "TABLE_MOD_FT_PAYMENT_GATEWAY_GRID"
    ],
    "dashboards": [
      "DASH_MOD_FT_PAYMENT_GATEWAY_EXECUTIVE"
    ],
    "reports": [
      "REP_MOD_FT_PAYMENT_GATEWAY_SUMMARY"
    ],
    "workflows": [
      "WF_KYCONBOARDINGWORKFLOW",
      "WF_PAYMENTPROCESSINGWORKFLOW"
    ],
    "aiCapabilities": [
      "AI_FINTECHMODULEAGENTREGISTRY",
      "AI_FINTECHCAPABILITYREGISTRY"
    ],
    "permissions": [
      "ROLE_CFO",
      "ROLE_CONTROLLER",
      "ROLE_ACCOUNTANT"
    ],
    "runtimeComponentId": "RTC_CAP_FT_PAYMENT_GATEWAY",
    "mobileParity": {
      "hasMobileView": true,
      "mobileComponentId": "M_RTC_CAP_FT_PAYMENT_GATEWAY",
      "mobileRoute": "/products/fintech/mod-ft-payment-gateway/mobile"
    }
  },
  {
    "uiMetadataId": "UIM_CAP_FT_PAYMENT_SWITCHING",
    "capabilityId": "CAP_FT_PAYMENT_SWITCHING",
    "productId": "JUMO-FINTECH",
    "moduleId": "MOD_FT_PAYMENT_SWITCHING",
    "portalId": "PORTAL_FIN_CFO",
    "pageTitle": "Payment Switching Autonomous Engine",
    "navLabel": "Payment Switching",
    "icon": "LayoutGrid",
    "route": "/products/fintech/mod-ft-payment-switching",
    "breadcrumbs": [
      "Enterprise",
      "JUMO-FINTECH",
      "Payment Switching Autonomous Engine"
    ],
    "layout": "STANDARD_DASHBOARD_GRID",
    "sections": [
      {
        "id": "SEC_KPI",
        "title": "Executive KPI Metrics",
        "type": "KPI_ROW"
      },
      {
        "id": "SEC_DATA",
        "title": "Operational Records Ledger",
        "type": "GRID_TABLE"
      },
      {
        "id": "SEC_ACTIONS",
        "title": "Action Dispatcher & Approvals",
        "type": "ACTION_BAR"
      }
    ],
    "cards": [
      {
        "id": "CARD_1",
        "title": "Active Work Items",
        "value": "28",
        "status": "NORMAL"
      },
      {
        "id": "CARD_2",
        "title": "Sovereign Audit Parity",
        "value": "100%",
        "status": "VERIFIED"
      }
    ],
    "forms": [
      "FORM_MOD_FT_PAYMENT_SWITCHING_ENTRY"
    ],
    "tables": [
      "TABLE_MOD_FT_PAYMENT_SWITCHING_GRID"
    ],
    "dashboards": [
      "DASH_MOD_FT_PAYMENT_SWITCHING_EXECUTIVE"
    ],
    "reports": [
      "REP_MOD_FT_PAYMENT_SWITCHING_SUMMARY"
    ],
    "workflows": [
      "WF_KYCONBOARDINGWORKFLOW",
      "WF_PAYMENTPROCESSINGWORKFLOW"
    ],
    "aiCapabilities": [
      "AI_FINTECHMODULEAGENTREGISTRY",
      "AI_FINTECHCAPABILITYREGISTRY"
    ],
    "permissions": [
      "ROLE_CFO",
      "ROLE_CONTROLLER",
      "ROLE_ACCOUNTANT"
    ],
    "runtimeComponentId": "RTC_CAP_FT_PAYMENT_SWITCHING",
    "mobileParity": {
      "hasMobileView": true,
      "mobileComponentId": "M_RTC_CAP_FT_PAYMENT_SWITCHING",
      "mobileRoute": "/products/fintech/mod-ft-payment-switching/mobile"
    }
  },
  {
    "uiMetadataId": "UIM_CAP_FT_PAYOUTS",
    "capabilityId": "CAP_FT_PAYOUTS",
    "productId": "JUMO-FINTECH",
    "moduleId": "MOD_FT_PAYOUTS",
    "portalId": "PORTAL_FIN_CFO",
    "pageTitle": "Payouts Autonomous Engine",
    "navLabel": "Payouts Autonomous",
    "icon": "LayoutGrid",
    "route": "/products/fintech/mod-ft-payouts",
    "breadcrumbs": [
      "Enterprise",
      "JUMO-FINTECH",
      "Payouts Autonomous Engine"
    ],
    "layout": "STANDARD_DASHBOARD_GRID",
    "sections": [
      {
        "id": "SEC_KPI",
        "title": "Executive KPI Metrics",
        "type": "KPI_ROW"
      },
      {
        "id": "SEC_DATA",
        "title": "Operational Records Ledger",
        "type": "GRID_TABLE"
      },
      {
        "id": "SEC_ACTIONS",
        "title": "Action Dispatcher & Approvals",
        "type": "ACTION_BAR"
      }
    ],
    "cards": [
      {
        "id": "CARD_1",
        "title": "Active Work Items",
        "value": "28",
        "status": "NORMAL"
      },
      {
        "id": "CARD_2",
        "title": "Sovereign Audit Parity",
        "value": "100%",
        "status": "VERIFIED"
      }
    ],
    "forms": [
      "FORM_MOD_FT_PAYOUTS_ENTRY"
    ],
    "tables": [
      "TABLE_MOD_FT_PAYOUTS_GRID"
    ],
    "dashboards": [
      "DASH_MOD_FT_PAYOUTS_EXECUTIVE"
    ],
    "reports": [
      "REP_MOD_FT_PAYOUTS_SUMMARY"
    ],
    "workflows": [
      "WF_KYCONBOARDINGWORKFLOW",
      "WF_PAYMENTPROCESSINGWORKFLOW"
    ],
    "aiCapabilities": [
      "AI_FINTECHMODULEAGENTREGISTRY",
      "AI_FINTECHCAPABILITYREGISTRY"
    ],
    "permissions": [
      "ROLE_CFO",
      "ROLE_CONTROLLER",
      "ROLE_ACCOUNTANT"
    ],
    "runtimeComponentId": "RTC_CAP_FT_PAYOUTS",
    "mobileParity": {
      "hasMobileView": true,
      "mobileComponentId": "M_RTC_CAP_FT_PAYOUTS",
      "mobileRoute": "/products/fintech/mod-ft-payouts/mobile"
    }
  },
  {
    "uiMetadataId": "UIM_CAP_FT_PAYROLL",
    "capabilityId": "CAP_FT_PAYROLL",
    "productId": "JUMO-FINTECH",
    "moduleId": "MOD_FT_PAYROLL",
    "portalId": "PORTAL_FIN_CFO",
    "pageTitle": "Payroll Autonomous Engine",
    "navLabel": "Payroll Autonomous",
    "icon": "LayoutGrid",
    "route": "/products/fintech/mod-ft-payroll",
    "breadcrumbs": [
      "Enterprise",
      "JUMO-FINTECH",
      "Payroll Autonomous Engine"
    ],
    "layout": "STANDARD_DASHBOARD_GRID",
    "sections": [
      {
        "id": "SEC_KPI",
        "title": "Executive KPI Metrics",
        "type": "KPI_ROW"
      },
      {
        "id": "SEC_DATA",
        "title": "Operational Records Ledger",
        "type": "GRID_TABLE"
      },
      {
        "id": "SEC_ACTIONS",
        "title": "Action Dispatcher & Approvals",
        "type": "ACTION_BAR"
      }
    ],
    "cards": [
      {
        "id": "CARD_1",
        "title": "Active Work Items",
        "value": "28",
        "status": "NORMAL"
      },
      {
        "id": "CARD_2",
        "title": "Sovereign Audit Parity",
        "value": "100%",
        "status": "VERIFIED"
      }
    ],
    "forms": [
      "FORM_MOD_FT_PAYROLL_ENTRY"
    ],
    "tables": [
      "TABLE_MOD_FT_PAYROLL_GRID"
    ],
    "dashboards": [
      "DASH_MOD_FT_PAYROLL_EXECUTIVE"
    ],
    "reports": [
      "REP_MOD_FT_PAYROLL_SUMMARY"
    ],
    "workflows": [
      "WF_KYCONBOARDINGWORKFLOW",
      "WF_PAYMENTPROCESSINGWORKFLOW"
    ],
    "aiCapabilities": [
      "AI_FINTECHMODULEAGENTREGISTRY",
      "AI_FINTECHCAPABILITYREGISTRY"
    ],
    "permissions": [
      "ROLE_CFO",
      "ROLE_CONTROLLER",
      "ROLE_ACCOUNTANT"
    ],
    "runtimeComponentId": "RTC_CAP_FT_PAYROLL",
    "mobileParity": {
      "hasMobileView": true,
      "mobileComponentId": "M_RTC_CAP_FT_PAYROLL",
      "mobileRoute": "/products/fintech/mod-ft-payroll/mobile"
    }
  },
  {
    "uiMetadataId": "UIM_CAP_FT_REMITTANCES",
    "capabilityId": "CAP_FT_REMITTANCES",
    "productId": "JUMO-FINTECH",
    "moduleId": "MOD_FT_REMITTANCES",
    "portalId": "PORTAL_FIN_CFO",
    "pageTitle": "Remittances Autonomous Engine",
    "navLabel": "Remittances Autonomous",
    "icon": "LayoutGrid",
    "route": "/products/fintech/mod-ft-remittances",
    "breadcrumbs": [
      "Enterprise",
      "JUMO-FINTECH",
      "Remittances Autonomous Engine"
    ],
    "layout": "STANDARD_DASHBOARD_GRID",
    "sections": [
      {
        "id": "SEC_KPI",
        "title": "Executive KPI Metrics",
        "type": "KPI_ROW"
      },
      {
        "id": "SEC_DATA",
        "title": "Operational Records Ledger",
        "type": "GRID_TABLE"
      },
      {
        "id": "SEC_ACTIONS",
        "title": "Action Dispatcher & Approvals",
        "type": "ACTION_BAR"
      }
    ],
    "cards": [
      {
        "id": "CARD_1",
        "title": "Active Work Items",
        "value": "28",
        "status": "NORMAL"
      },
      {
        "id": "CARD_2",
        "title": "Sovereign Audit Parity",
        "value": "100%",
        "status": "VERIFIED"
      }
    ],
    "forms": [
      "FORM_MOD_FT_REMITTANCES_ENTRY"
    ],
    "tables": [
      "TABLE_MOD_FT_REMITTANCES_GRID"
    ],
    "dashboards": [
      "DASH_MOD_FT_REMITTANCES_EXECUTIVE"
    ],
    "reports": [
      "REP_MOD_FT_REMITTANCES_SUMMARY"
    ],
    "workflows": [
      "WF_KYCONBOARDINGWORKFLOW",
      "WF_PAYMENTPROCESSINGWORKFLOW"
    ],
    "aiCapabilities": [
      "AI_FINTECHMODULEAGENTREGISTRY",
      "AI_FINTECHCAPABILITYREGISTRY"
    ],
    "permissions": [
      "ROLE_CFO",
      "ROLE_CONTROLLER",
      "ROLE_ACCOUNTANT"
    ],
    "runtimeComponentId": "RTC_CAP_FT_REMITTANCES",
    "mobileParity": {
      "hasMobileView": true,
      "mobileComponentId": "M_RTC_CAP_FT_REMITTANCES",
      "mobileRoute": "/products/fintech/mod-ft-remittances/mobile"
    }
  },
  {
    "uiMetadataId": "UIM_CAP_FT_SACCO",
    "capabilityId": "CAP_FT_SACCO",
    "productId": "JUMO-FINTECH",
    "moduleId": "MOD_FT_SACCO",
    "portalId": "PORTAL_FIN_CFO",
    "pageTitle": "Sacco Autonomous Engine",
    "navLabel": "Sacco Autonomous",
    "icon": "LayoutGrid",
    "route": "/products/fintech/mod-ft-sacco",
    "breadcrumbs": [
      "Enterprise",
      "JUMO-FINTECH",
      "Sacco Autonomous Engine"
    ],
    "layout": "STANDARD_DASHBOARD_GRID",
    "sections": [
      {
        "id": "SEC_KPI",
        "title": "Executive KPI Metrics",
        "type": "KPI_ROW"
      },
      {
        "id": "SEC_DATA",
        "title": "Operational Records Ledger",
        "type": "GRID_TABLE"
      },
      {
        "id": "SEC_ACTIONS",
        "title": "Action Dispatcher & Approvals",
        "type": "ACTION_BAR"
      }
    ],
    "cards": [
      {
        "id": "CARD_1",
        "title": "Active Work Items",
        "value": "28",
        "status": "NORMAL"
      },
      {
        "id": "CARD_2",
        "title": "Sovereign Audit Parity",
        "value": "100%",
        "status": "VERIFIED"
      }
    ],
    "forms": [
      "FORM_MOD_FT_SACCO_ENTRY"
    ],
    "tables": [
      "TABLE_MOD_FT_SACCO_GRID"
    ],
    "dashboards": [
      "DASH_MOD_FT_SACCO_EXECUTIVE"
    ],
    "reports": [
      "REP_MOD_FT_SACCO_SUMMARY"
    ],
    "workflows": [
      "WF_KYCONBOARDINGWORKFLOW",
      "WF_PAYMENTPROCESSINGWORKFLOW"
    ],
    "aiCapabilities": [
      "AI_FINTECHMODULEAGENTREGISTRY",
      "AI_FINTECHCAPABILITYREGISTRY"
    ],
    "permissions": [
      "ROLE_CFO",
      "ROLE_CONTROLLER",
      "ROLE_ACCOUNTANT"
    ],
    "runtimeComponentId": "RTC_CAP_FT_SACCO",
    "mobileParity": {
      "hasMobileView": true,
      "mobileComponentId": "M_RTC_CAP_FT_SACCO",
      "mobileRoute": "/products/fintech/mod-ft-sacco/mobile"
    }
  },
  {
    "uiMetadataId": "UIM_CAP_FT_SAVINGS",
    "capabilityId": "CAP_FT_SAVINGS",
    "productId": "JUMO-FINTECH",
    "moduleId": "MOD_FT_SAVINGS",
    "portalId": "PORTAL_FIN_CFO",
    "pageTitle": "Savings Autonomous Engine",
    "navLabel": "Savings Autonomous",
    "icon": "LayoutGrid",
    "route": "/products/fintech/mod-ft-savings",
    "breadcrumbs": [
      "Enterprise",
      "JUMO-FINTECH",
      "Savings Autonomous Engine"
    ],
    "layout": "STANDARD_DASHBOARD_GRID",
    "sections": [
      {
        "id": "SEC_KPI",
        "title": "Executive KPI Metrics",
        "type": "KPI_ROW"
      },
      {
        "id": "SEC_DATA",
        "title": "Operational Records Ledger",
        "type": "GRID_TABLE"
      },
      {
        "id": "SEC_ACTIONS",
        "title": "Action Dispatcher & Approvals",
        "type": "ACTION_BAR"
      }
    ],
    "cards": [
      {
        "id": "CARD_1",
        "title": "Active Work Items",
        "value": "28",
        "status": "NORMAL"
      },
      {
        "id": "CARD_2",
        "title": "Sovereign Audit Parity",
        "value": "100%",
        "status": "VERIFIED"
      }
    ],
    "forms": [
      "FORM_MOD_FT_SAVINGS_ENTRY"
    ],
    "tables": [
      "TABLE_MOD_FT_SAVINGS_GRID"
    ],
    "dashboards": [
      "DASH_MOD_FT_SAVINGS_EXECUTIVE"
    ],
    "reports": [
      "REP_MOD_FT_SAVINGS_SUMMARY"
    ],
    "workflows": [
      "WF_KYCONBOARDINGWORKFLOW",
      "WF_PAYMENTPROCESSINGWORKFLOW"
    ],
    "aiCapabilities": [
      "AI_FINTECHMODULEAGENTREGISTRY",
      "AI_FINTECHCAPABILITYREGISTRY"
    ],
    "permissions": [
      "ROLE_CFO",
      "ROLE_CONTROLLER",
      "ROLE_ACCOUNTANT"
    ],
    "runtimeComponentId": "RTC_CAP_FT_SAVINGS",
    "mobileParity": {
      "hasMobileView": true,
      "mobileComponentId": "M_RTC_CAP_FT_SAVINGS",
      "mobileRoute": "/products/fintech/mod-ft-savings/mobile"
    }
  },
  {
    "uiMetadataId": "UIM_CAP_FT_SECURITIES_CUSTODY",
    "capabilityId": "CAP_FT_SECURITIES_CUSTODY",
    "productId": "JUMO-FINTECH",
    "moduleId": "MOD_FT_SECURITIES_CUSTODY",
    "portalId": "PORTAL_FIN_CFO",
    "pageTitle": "Securities Custody Autonomous Engine",
    "navLabel": "Securities Custody",
    "icon": "LayoutGrid",
    "route": "/products/fintech/mod-ft-securities-custody",
    "breadcrumbs": [
      "Enterprise",
      "JUMO-FINTECH",
      "Securities Custody Autonomous Engine"
    ],
    "layout": "STANDARD_DASHBOARD_GRID",
    "sections": [
      {
        "id": "SEC_KPI",
        "title": "Executive KPI Metrics",
        "type": "KPI_ROW"
      },
      {
        "id": "SEC_DATA",
        "title": "Operational Records Ledger",
        "type": "GRID_TABLE"
      },
      {
        "id": "SEC_ACTIONS",
        "title": "Action Dispatcher & Approvals",
        "type": "ACTION_BAR"
      }
    ],
    "cards": [
      {
        "id": "CARD_1",
        "title": "Active Work Items",
        "value": "28",
        "status": "NORMAL"
      },
      {
        "id": "CARD_2",
        "title": "Sovereign Audit Parity",
        "value": "100%",
        "status": "VERIFIED"
      }
    ],
    "forms": [
      "FORM_MOD_FT_SECURITIES_CUSTODY_ENTRY"
    ],
    "tables": [
      "TABLE_MOD_FT_SECURITIES_CUSTODY_GRID"
    ],
    "dashboards": [
      "DASH_MOD_FT_SECURITIES_CUSTODY_EXECUTIVE"
    ],
    "reports": [
      "REP_MOD_FT_SECURITIES_CUSTODY_SUMMARY"
    ],
    "workflows": [
      "WF_KYCONBOARDINGWORKFLOW",
      "WF_PAYMENTPROCESSINGWORKFLOW"
    ],
    "aiCapabilities": [
      "AI_FINTECHMODULEAGENTREGISTRY",
      "AI_FINTECHCAPABILITYREGISTRY"
    ],
    "permissions": [
      "ROLE_CFO",
      "ROLE_CONTROLLER",
      "ROLE_ACCOUNTANT"
    ],
    "runtimeComponentId": "RTC_CAP_FT_SECURITIES_CUSTODY",
    "mobileParity": {
      "hasMobileView": true,
      "mobileComponentId": "M_RTC_CAP_FT_SECURITIES_CUSTODY",
      "mobileRoute": "/products/fintech/mod-ft-securities-custody/mobile"
    }
  },
  {
    "uiMetadataId": "UIM_CAP_FT_STABLECOIN",
    "capabilityId": "CAP_FT_STABLECOIN",
    "productId": "JUMO-FINTECH",
    "moduleId": "MOD_FT_STABLECOIN",
    "portalId": "PORTAL_FIN_CFO",
    "pageTitle": "Stablecoin Autonomous Engine",
    "navLabel": "Stablecoin Autonomous",
    "icon": "LayoutGrid",
    "route": "/products/fintech/mod-ft-stablecoin",
    "breadcrumbs": [
      "Enterprise",
      "JUMO-FINTECH",
      "Stablecoin Autonomous Engine"
    ],
    "layout": "STANDARD_DASHBOARD_GRID",
    "sections": [
      {
        "id": "SEC_KPI",
        "title": "Executive KPI Metrics",
        "type": "KPI_ROW"
      },
      {
        "id": "SEC_DATA",
        "title": "Operational Records Ledger",
        "type": "GRID_TABLE"
      },
      {
        "id": "SEC_ACTIONS",
        "title": "Action Dispatcher & Approvals",
        "type": "ACTION_BAR"
      }
    ],
    "cards": [
      {
        "id": "CARD_1",
        "title": "Active Work Items",
        "value": "28",
        "status": "NORMAL"
      },
      {
        "id": "CARD_2",
        "title": "Sovereign Audit Parity",
        "value": "100%",
        "status": "VERIFIED"
      }
    ],
    "forms": [
      "FORM_MOD_FT_STABLECOIN_ENTRY"
    ],
    "tables": [
      "TABLE_MOD_FT_STABLECOIN_GRID"
    ],
    "dashboards": [
      "DASH_MOD_FT_STABLECOIN_EXECUTIVE"
    ],
    "reports": [
      "REP_MOD_FT_STABLECOIN_SUMMARY"
    ],
    "workflows": [
      "WF_KYCONBOARDINGWORKFLOW",
      "WF_PAYMENTPROCESSINGWORKFLOW"
    ],
    "aiCapabilities": [
      "AI_FINTECHMODULEAGENTREGISTRY",
      "AI_FINTECHCAPABILITYREGISTRY"
    ],
    "permissions": [
      "ROLE_CFO",
      "ROLE_CONTROLLER",
      "ROLE_ACCOUNTANT"
    ],
    "runtimeComponentId": "RTC_CAP_FT_STABLECOIN",
    "mobileParity": {
      "hasMobileView": true,
      "mobileComponentId": "M_RTC_CAP_FT_STABLECOIN",
      "mobileRoute": "/products/fintech/mod-ft-stablecoin/mobile"
    }
  },
  {
    "uiMetadataId": "UIM_CAP_FT_TAX_REVENUE",
    "capabilityId": "CAP_FT_TAX_REVENUE",
    "productId": "JUMO-FINTECH",
    "moduleId": "MOD_FT_TAX_REVENUE",
    "portalId": "PORTAL_FIN_CFO",
    "pageTitle": "Tax Revenue Autonomous Engine",
    "navLabel": "Tax Revenue",
    "icon": "LayoutGrid",
    "route": "/products/fintech/mod-ft-tax-revenue",
    "breadcrumbs": [
      "Enterprise",
      "JUMO-FINTECH",
      "Tax Revenue Autonomous Engine"
    ],
    "layout": "STANDARD_DASHBOARD_GRID",
    "sections": [
      {
        "id": "SEC_KPI",
        "title": "Executive KPI Metrics",
        "type": "KPI_ROW"
      },
      {
        "id": "SEC_DATA",
        "title": "Operational Records Ledger",
        "type": "GRID_TABLE"
      },
      {
        "id": "SEC_ACTIONS",
        "title": "Action Dispatcher & Approvals",
        "type": "ACTION_BAR"
      }
    ],
    "cards": [
      {
        "id": "CARD_1",
        "title": "Active Work Items",
        "value": "28",
        "status": "NORMAL"
      },
      {
        "id": "CARD_2",
        "title": "Sovereign Audit Parity",
        "value": "100%",
        "status": "VERIFIED"
      }
    ],
    "forms": [
      "FORM_MOD_FT_TAX_REVENUE_ENTRY"
    ],
    "tables": [
      "TABLE_MOD_FT_TAX_REVENUE_GRID"
    ],
    "dashboards": [
      "DASH_MOD_FT_TAX_REVENUE_EXECUTIVE"
    ],
    "reports": [
      "REP_MOD_FT_TAX_REVENUE_SUMMARY"
    ],
    "workflows": [
      "WF_KYCONBOARDINGWORKFLOW",
      "WF_PAYMENTPROCESSINGWORKFLOW"
    ],
    "aiCapabilities": [
      "AI_FINTECHMODULEAGENTREGISTRY",
      "AI_FINTECHCAPABILITYREGISTRY"
    ],
    "permissions": [
      "ROLE_CFO",
      "ROLE_CONTROLLER",
      "ROLE_ACCOUNTANT"
    ],
    "runtimeComponentId": "RTC_CAP_FT_TAX_REVENUE",
    "mobileParity": {
      "hasMobileView": true,
      "mobileComponentId": "M_RTC_CAP_FT_TAX_REVENUE",
      "mobileRoute": "/products/fintech/mod-ft-tax-revenue/mobile"
    }
  },
  {
    "uiMetadataId": "UIM_CAP_FT_TRADE_FINANCE",
    "capabilityId": "CAP_FT_TRADE_FINANCE",
    "productId": "JUMO-FINTECH",
    "moduleId": "MOD_FT_TRADE_FINANCE",
    "portalId": "PORTAL_FIN_CFO",
    "pageTitle": "Trade Finance Autonomous Engine",
    "navLabel": "Trade Finance",
    "icon": "LayoutGrid",
    "route": "/products/fintech/mod-ft-trade-finance",
    "breadcrumbs": [
      "Enterprise",
      "JUMO-FINTECH",
      "Trade Finance Autonomous Engine"
    ],
    "layout": "STANDARD_DASHBOARD_GRID",
    "sections": [
      {
        "id": "SEC_KPI",
        "title": "Executive KPI Metrics",
        "type": "KPI_ROW"
      },
      {
        "id": "SEC_DATA",
        "title": "Operational Records Ledger",
        "type": "GRID_TABLE"
      },
      {
        "id": "SEC_ACTIONS",
        "title": "Action Dispatcher & Approvals",
        "type": "ACTION_BAR"
      }
    ],
    "cards": [
      {
        "id": "CARD_1",
        "title": "Active Work Items",
        "value": "28",
        "status": "NORMAL"
      },
      {
        "id": "CARD_2",
        "title": "Sovereign Audit Parity",
        "value": "100%",
        "status": "VERIFIED"
      }
    ],
    "forms": [
      "FORM_MOD_FT_TRADE_FINANCE_ENTRY"
    ],
    "tables": [
      "TABLE_MOD_FT_TRADE_FINANCE_GRID"
    ],
    "dashboards": [
      "DASH_MOD_FT_TRADE_FINANCE_EXECUTIVE"
    ],
    "reports": [
      "REP_MOD_FT_TRADE_FINANCE_SUMMARY"
    ],
    "workflows": [
      "WF_KYCONBOARDINGWORKFLOW",
      "WF_PAYMENTPROCESSINGWORKFLOW"
    ],
    "aiCapabilities": [
      "AI_FINTECHMODULEAGENTREGISTRY",
      "AI_FINTECHCAPABILITYREGISTRY"
    ],
    "permissions": [
      "ROLE_CFO",
      "ROLE_CONTROLLER",
      "ROLE_ACCOUNTANT"
    ],
    "runtimeComponentId": "RTC_CAP_FT_TRADE_FINANCE",
    "mobileParity": {
      "hasMobileView": true,
      "mobileComponentId": "M_RTC_CAP_FT_TRADE_FINANCE",
      "mobileRoute": "/products/fintech/mod-ft-trade-finance/mobile"
    }
  },
  {
    "uiMetadataId": "UIM_CAP_FT_TREASURY",
    "capabilityId": "CAP_FT_TREASURY",
    "productId": "JUMO-FINTECH",
    "moduleId": "MOD_FT_TREASURY",
    "portalId": "PORTAL_FIN_CFO",
    "pageTitle": "Treasury Autonomous Engine",
    "navLabel": "Treasury Autonomous",
    "icon": "LayoutGrid",
    "route": "/products/fintech/mod-ft-treasury",
    "breadcrumbs": [
      "Enterprise",
      "JUMO-FINTECH",
      "Treasury Autonomous Engine"
    ],
    "layout": "STANDARD_DASHBOARD_GRID",
    "sections": [
      {
        "id": "SEC_KPI",
        "title": "Executive KPI Metrics",
        "type": "KPI_ROW"
      },
      {
        "id": "SEC_DATA",
        "title": "Operational Records Ledger",
        "type": "GRID_TABLE"
      },
      {
        "id": "SEC_ACTIONS",
        "title": "Action Dispatcher & Approvals",
        "type": "ACTION_BAR"
      }
    ],
    "cards": [
      {
        "id": "CARD_1",
        "title": "Active Work Items",
        "value": "28",
        "status": "NORMAL"
      },
      {
        "id": "CARD_2",
        "title": "Sovereign Audit Parity",
        "value": "100%",
        "status": "VERIFIED"
      }
    ],
    "forms": [
      "FORM_MOD_FT_TREASURY_ENTRY"
    ],
    "tables": [
      "TABLE_MOD_FT_TREASURY_GRID"
    ],
    "dashboards": [
      "DASH_MOD_FT_TREASURY_EXECUTIVE"
    ],
    "reports": [
      "REP_MOD_FT_TREASURY_SUMMARY"
    ],
    "workflows": [
      "WF_KYCONBOARDINGWORKFLOW",
      "WF_PAYMENTPROCESSINGWORKFLOW"
    ],
    "aiCapabilities": [
      "AI_FINTECHMODULEAGENTREGISTRY",
      "AI_FINTECHCAPABILITYREGISTRY"
    ],
    "permissions": [
      "ROLE_CFO",
      "ROLE_CONTROLLER",
      "ROLE_ACCOUNTANT"
    ],
    "runtimeComponentId": "RTC_CAP_FT_TREASURY",
    "mobileParity": {
      "hasMobileView": true,
      "mobileComponentId": "M_RTC_CAP_FT_TREASURY",
      "mobileRoute": "/products/fintech/mod-ft-treasury/mobile"
    }
  },
  {
    "uiMetadataId": "UIM_CAP_NP_ECD_MILESTONES",
    "capabilityId": "CAP_NP_ECD_MILESTONES",
    "productId": "JUMO-NURSERY-PRIMARY-ERP",
    "moduleId": "MOD_NP_ECD_MILESTONES",
    "portalId": "PORTAL_EDU_HEAD",
    "pageTitle": "Early Childhood Development & Milestones Engine",
    "navLabel": "Early Childhood",
    "icon": "LayoutGrid",
    "route": "/products/nursery-primary/mod-np-ecd-milestones",
    "breadcrumbs": [
      "Enterprise",
      "JUMO-NURSERY-PRIMARY-ERP",
      "Early Childhood Development & Milestones Engine"
    ],
    "layout": "STANDARD_DASHBOARD_GRID",
    "sections": [
      {
        "id": "SEC_KPI",
        "title": "Executive KPI Metrics",
        "type": "KPI_ROW"
      },
      {
        "id": "SEC_DATA",
        "title": "Operational Records Ledger",
        "type": "GRID_TABLE"
      },
      {
        "id": "SEC_ACTIONS",
        "title": "Action Dispatcher & Approvals",
        "type": "ACTION_BAR"
      }
    ],
    "cards": [
      {
        "id": "CARD_1",
        "title": "Active Work Items",
        "value": "28",
        "status": "NORMAL"
      },
      {
        "id": "CARD_2",
        "title": "Sovereign Audit Parity",
        "value": "100%",
        "status": "VERIFIED"
      }
    ],
    "forms": [
      "FORM_MOD_NP_ECD_MILESTONES_ENTRY"
    ],
    "tables": [
      "TABLE_MOD_NP_ECD_MILESTONES_GRID"
    ],
    "dashboards": [
      "DASH_MOD_NP_ECD_MILESTONES_EXECUTIVE"
    ],
    "reports": [
      "REP_MOD_NP_ECD_MILESTONES_SUMMARY"
    ],
    "workflows": [
      "WF_STUDENTENROLLMENTWORKFLOW",
      "WF_FEEBILLINGWORKFLOW"
    ],
    "aiCapabilities": [
      "AI_PRIMARYACADEMICAGENT",
      "AI_ECDMILESTONETRACKERAGENT"
    ],
    "permissions": [
      "ROLE_HEAD_TEACHER",
      "ROLE_PRIMARY_DOS",
      "ROLE_ECD_TEACHER"
    ],
    "runtimeComponentId": "RTC_CAP_NP_ECD_MILESTONES",
    "mobileParity": {
      "hasMobileView": true,
      "mobileComponentId": "M_RTC_CAP_NP_ECD_MILESTONES",
      "mobileRoute": "/products/nursery-primary/mod-np-ecd-milestones/mobile"
    }
  },
  {
    "uiMetadataId": "UIM_CAP_NP_PRIMARY_ACADEMICS",
    "capabilityId": "CAP_NP_PRIMARY_ACADEMICS",
    "productId": "JUMO-NURSERY-PRIMARY-ERP",
    "moduleId": "MOD_NP_PRIMARY_ACADEMICS",
    "portalId": "PORTAL_EDU_HEAD",
    "pageTitle": "Primary Curriculum & Assessment Engine",
    "navLabel": "Primary Curriculum",
    "icon": "LayoutGrid",
    "route": "/products/nursery-primary/mod-np-primary-academics",
    "breadcrumbs": [
      "Enterprise",
      "JUMO-NURSERY-PRIMARY-ERP",
      "Primary Curriculum & Assessment Engine"
    ],
    "layout": "STANDARD_DASHBOARD_GRID",
    "sections": [
      {
        "id": "SEC_KPI",
        "title": "Executive KPI Metrics",
        "type": "KPI_ROW"
      },
      {
        "id": "SEC_DATA",
        "title": "Operational Records Ledger",
        "type": "GRID_TABLE"
      },
      {
        "id": "SEC_ACTIONS",
        "title": "Action Dispatcher & Approvals",
        "type": "ACTION_BAR"
      }
    ],
    "cards": [
      {
        "id": "CARD_1",
        "title": "Active Work Items",
        "value": "28",
        "status": "NORMAL"
      },
      {
        "id": "CARD_2",
        "title": "Sovereign Audit Parity",
        "value": "100%",
        "status": "VERIFIED"
      }
    ],
    "forms": [
      "FORM_MOD_NP_PRIMARY_ACADEMICS_ENTRY"
    ],
    "tables": [
      "TABLE_MOD_NP_PRIMARY_ACADEMICS_GRID"
    ],
    "dashboards": [
      "DASH_MOD_NP_PRIMARY_ACADEMICS_EXECUTIVE"
    ],
    "reports": [
      "REP_MOD_NP_PRIMARY_ACADEMICS_SUMMARY"
    ],
    "workflows": [
      "WF_STUDENTENROLLMENTWORKFLOW",
      "WF_FEEBILLINGWORKFLOW"
    ],
    "aiCapabilities": [
      "AI_PRIMARYACADEMICAGENT",
      "AI_ECDMILESTONETRACKERAGENT"
    ],
    "permissions": [
      "ROLE_HEAD_TEACHER",
      "ROLE_PRIMARY_DOS",
      "ROLE_ECD_TEACHER"
    ],
    "runtimeComponentId": "RTC_CAP_NP_PRIMARY_ACADEMICS",
    "mobileParity": {
      "hasMobileView": true,
      "mobileComponentId": "M_RTC_CAP_NP_PRIMARY_ACADEMICS",
      "mobileRoute": "/products/nursery-primary/mod-np-primary-academics/mobile"
    }
  },
  {
    "uiMetadataId": "UIM_CAP_NP_PRIMARY_DOS",
    "capabilityId": "CAP_NP_PRIMARY_DOS",
    "productId": "JUMO-NURSERY-PRIMARY-ERP",
    "moduleId": "MOD_NP_PRIMARY_DOS",
    "portalId": "PORTAL_EDU_HEAD",
    "pageTitle": "Primary Studies & Timetabling Engine",
    "navLabel": "Primary Studies",
    "icon": "LayoutGrid",
    "route": "/products/nursery-primary/mod-np-primary-dos",
    "breadcrumbs": [
      "Enterprise",
      "JUMO-NURSERY-PRIMARY-ERP",
      "Primary Studies & Timetabling Engine"
    ],
    "layout": "STANDARD_DASHBOARD_GRID",
    "sections": [
      {
        "id": "SEC_KPI",
        "title": "Executive KPI Metrics",
        "type": "KPI_ROW"
      },
      {
        "id": "SEC_DATA",
        "title": "Operational Records Ledger",
        "type": "GRID_TABLE"
      },
      {
        "id": "SEC_ACTIONS",
        "title": "Action Dispatcher & Approvals",
        "type": "ACTION_BAR"
      }
    ],
    "cards": [
      {
        "id": "CARD_1",
        "title": "Active Work Items",
        "value": "28",
        "status": "NORMAL"
      },
      {
        "id": "CARD_2",
        "title": "Sovereign Audit Parity",
        "value": "100%",
        "status": "VERIFIED"
      }
    ],
    "forms": [
      "FORM_MOD_NP_PRIMARY_DOS_ENTRY"
    ],
    "tables": [
      "TABLE_MOD_NP_PRIMARY_DOS_GRID"
    ],
    "dashboards": [
      "DASH_MOD_NP_PRIMARY_DOS_EXECUTIVE"
    ],
    "reports": [
      "REP_MOD_NP_PRIMARY_DOS_SUMMARY"
    ],
    "workflows": [
      "WF_STUDENTENROLLMENTWORKFLOW",
      "WF_FEEBILLINGWORKFLOW"
    ],
    "aiCapabilities": [
      "AI_PRIMARYACADEMICAGENT",
      "AI_ECDMILESTONETRACKERAGENT"
    ],
    "permissions": [
      "ROLE_HEAD_TEACHER",
      "ROLE_PRIMARY_DOS",
      "ROLE_ECD_TEACHER"
    ],
    "runtimeComponentId": "RTC_CAP_NP_PRIMARY_DOS",
    "mobileParity": {
      "hasMobileView": true,
      "mobileComponentId": "M_RTC_CAP_NP_PRIMARY_DOS",
      "mobileRoute": "/products/nursery-primary/mod-np-primary-dos/mobile"
    }
  },
  {
    "uiMetadataId": "UIM_CAP_NP_ADMISSIONS",
    "capabilityId": "CAP_NP_ADMISSIONS",
    "productId": "JUMO-NURSERY-PRIMARY-ERP",
    "moduleId": "MOD_NP_ADMISSIONS",
    "portalId": "PORTAL_EDU_HEAD",
    "pageTitle": "Consolidated Student Admissions Engine",
    "navLabel": "Consolidated Student",
    "icon": "LayoutGrid",
    "route": "/products/nursery-primary/mod-np-admissions",
    "breadcrumbs": [
      "Enterprise",
      "JUMO-NURSERY-PRIMARY-ERP",
      "Consolidated Student Admissions Engine"
    ],
    "layout": "STANDARD_DASHBOARD_GRID",
    "sections": [
      {
        "id": "SEC_KPI",
        "title": "Executive KPI Metrics",
        "type": "KPI_ROW"
      },
      {
        "id": "SEC_DATA",
        "title": "Operational Records Ledger",
        "type": "GRID_TABLE"
      },
      {
        "id": "SEC_ACTIONS",
        "title": "Action Dispatcher & Approvals",
        "type": "ACTION_BAR"
      }
    ],
    "cards": [
      {
        "id": "CARD_1",
        "title": "Active Work Items",
        "value": "28",
        "status": "NORMAL"
      },
      {
        "id": "CARD_2",
        "title": "Sovereign Audit Parity",
        "value": "100%",
        "status": "VERIFIED"
      }
    ],
    "forms": [
      "FORM_MOD_NP_ADMISSIONS_ENTRY"
    ],
    "tables": [
      "TABLE_MOD_NP_ADMISSIONS_GRID"
    ],
    "dashboards": [
      "DASH_MOD_NP_ADMISSIONS_EXECUTIVE"
    ],
    "reports": [
      "REP_MOD_NP_ADMISSIONS_SUMMARY"
    ],
    "workflows": [
      "WF_STUDENTENROLLMENTWORKFLOW",
      "WF_FEEBILLINGWORKFLOW"
    ],
    "aiCapabilities": [
      "AI_PRIMARYACADEMICAGENT",
      "AI_ECDMILESTONETRACKERAGENT"
    ],
    "permissions": [
      "ROLE_HEAD_TEACHER",
      "ROLE_PRIMARY_DOS",
      "ROLE_ECD_TEACHER"
    ],
    "runtimeComponentId": "RTC_CAP_NP_ADMISSIONS",
    "mobileParity": {
      "hasMobileView": true,
      "mobileComponentId": "M_RTC_CAP_NP_ADMISSIONS",
      "mobileRoute": "/products/nursery-primary/mod-np-admissions/mobile"
    }
  },
  {
    "uiMetadataId": "UIM_CAP_NP_BURSARY",
    "capabilityId": "CAP_NP_BURSARY",
    "productId": "JUMO-NURSERY-PRIMARY-ERP",
    "moduleId": "MOD_NP_BURSARY",
    "portalId": "PORTAL_EDU_HEAD",
    "pageTitle": "Fee Invoicing & Bursar Ledger Engine",
    "navLabel": "Fee Invoicing",
    "icon": "LayoutGrid",
    "route": "/products/nursery-primary/mod-np-bursary",
    "breadcrumbs": [
      "Enterprise",
      "JUMO-NURSERY-PRIMARY-ERP",
      "Fee Invoicing & Bursar Ledger Engine"
    ],
    "layout": "STANDARD_DASHBOARD_GRID",
    "sections": [
      {
        "id": "SEC_KPI",
        "title": "Executive KPI Metrics",
        "type": "KPI_ROW"
      },
      {
        "id": "SEC_DATA",
        "title": "Operational Records Ledger",
        "type": "GRID_TABLE"
      },
      {
        "id": "SEC_ACTIONS",
        "title": "Action Dispatcher & Approvals",
        "type": "ACTION_BAR"
      }
    ],
    "cards": [
      {
        "id": "CARD_1",
        "title": "Active Work Items",
        "value": "28",
        "status": "NORMAL"
      },
      {
        "id": "CARD_2",
        "title": "Sovereign Audit Parity",
        "value": "100%",
        "status": "VERIFIED"
      }
    ],
    "forms": [
      "FORM_MOD_NP_BURSARY_ENTRY"
    ],
    "tables": [
      "TABLE_MOD_NP_BURSARY_GRID"
    ],
    "dashboards": [
      "DASH_MOD_NP_BURSARY_EXECUTIVE"
    ],
    "reports": [
      "REP_MOD_NP_BURSARY_SUMMARY"
    ],
    "workflows": [
      "WF_STUDENTENROLLMENTWORKFLOW",
      "WF_FEEBILLINGWORKFLOW"
    ],
    "aiCapabilities": [
      "AI_PRIMARYACADEMICAGENT",
      "AI_ECDMILESTONETRACKERAGENT"
    ],
    "permissions": [
      "ROLE_HEAD_TEACHER",
      "ROLE_PRIMARY_DOS",
      "ROLE_ECD_TEACHER"
    ],
    "runtimeComponentId": "RTC_CAP_NP_BURSARY",
    "mobileParity": {
      "hasMobileView": true,
      "mobileComponentId": "M_RTC_CAP_NP_BURSARY",
      "mobileRoute": "/products/nursery-primary/mod-np-bursary/mobile"
    }
  },
  {
    "uiMetadataId": "UIM_CAP_NP_SAFEGUARDING",
    "capabilityId": "CAP_NP_SAFEGUARDING",
    "productId": "JUMO-NURSERY-PRIMARY-ERP",
    "moduleId": "MOD_NP_SAFEGUARDING",
    "portalId": "PORTAL_EDU_HEAD",
    "pageTitle": "Child Protection & Safeguarding Engine",
    "navLabel": "Child Protection",
    "icon": "LayoutGrid",
    "route": "/products/nursery-primary/mod-np-safeguarding",
    "breadcrumbs": [
      "Enterprise",
      "JUMO-NURSERY-PRIMARY-ERP",
      "Child Protection & Safeguarding Engine"
    ],
    "layout": "STANDARD_DASHBOARD_GRID",
    "sections": [
      {
        "id": "SEC_KPI",
        "title": "Executive KPI Metrics",
        "type": "KPI_ROW"
      },
      {
        "id": "SEC_DATA",
        "title": "Operational Records Ledger",
        "type": "GRID_TABLE"
      },
      {
        "id": "SEC_ACTIONS",
        "title": "Action Dispatcher & Approvals",
        "type": "ACTION_BAR"
      }
    ],
    "cards": [
      {
        "id": "CARD_1",
        "title": "Active Work Items",
        "value": "28",
        "status": "NORMAL"
      },
      {
        "id": "CARD_2",
        "title": "Sovereign Audit Parity",
        "value": "100%",
        "status": "VERIFIED"
      }
    ],
    "forms": [
      "FORM_MOD_NP_SAFEGUARDING_ENTRY"
    ],
    "tables": [
      "TABLE_MOD_NP_SAFEGUARDING_GRID"
    ],
    "dashboards": [
      "DASH_MOD_NP_SAFEGUARDING_EXECUTIVE"
    ],
    "reports": [
      "REP_MOD_NP_SAFEGUARDING_SUMMARY"
    ],
    "workflows": [
      "WF_STUDENTENROLLMENTWORKFLOW",
      "WF_FEEBILLINGWORKFLOW"
    ],
    "aiCapabilities": [
      "AI_PRIMARYACADEMICAGENT",
      "AI_ECDMILESTONETRACKERAGENT"
    ],
    "permissions": [
      "ROLE_HEAD_TEACHER",
      "ROLE_PRIMARY_DOS",
      "ROLE_ECD_TEACHER"
    ],
    "runtimeComponentId": "RTC_CAP_NP_SAFEGUARDING",
    "mobileParity": {
      "hasMobileView": true,
      "mobileComponentId": "M_RTC_CAP_NP_SAFEGUARDING",
      "mobileRoute": "/products/nursery-primary/mod-np-safeguarding/mobile"
    }
  },
  {
    "uiMetadataId": "UIM_CAP_NP_CLINIC",
    "capabilityId": "CAP_NP_CLINIC",
    "productId": "JUMO-NURSERY-PRIMARY-ERP",
    "moduleId": "MOD_NP_CLINIC",
    "portalId": "PORTAL_EDU_HEAD",
    "pageTitle": "Infirmary & Pediatric Health Engine",
    "navLabel": "Infirmary &",
    "icon": "LayoutGrid",
    "route": "/products/nursery-primary/mod-np-clinic",
    "breadcrumbs": [
      "Enterprise",
      "JUMO-NURSERY-PRIMARY-ERP",
      "Infirmary & Pediatric Health Engine"
    ],
    "layout": "STANDARD_DASHBOARD_GRID",
    "sections": [
      {
        "id": "SEC_KPI",
        "title": "Executive KPI Metrics",
        "type": "KPI_ROW"
      },
      {
        "id": "SEC_DATA",
        "title": "Operational Records Ledger",
        "type": "GRID_TABLE"
      },
      {
        "id": "SEC_ACTIONS",
        "title": "Action Dispatcher & Approvals",
        "type": "ACTION_BAR"
      }
    ],
    "cards": [
      {
        "id": "CARD_1",
        "title": "Active Work Items",
        "value": "28",
        "status": "NORMAL"
      },
      {
        "id": "CARD_2",
        "title": "Sovereign Audit Parity",
        "value": "100%",
        "status": "VERIFIED"
      }
    ],
    "forms": [
      "FORM_MOD_NP_CLINIC_ENTRY"
    ],
    "tables": [
      "TABLE_MOD_NP_CLINIC_GRID"
    ],
    "dashboards": [
      "DASH_MOD_NP_CLINIC_EXECUTIVE"
    ],
    "reports": [
      "REP_MOD_NP_CLINIC_SUMMARY"
    ],
    "workflows": [
      "WF_STUDENTENROLLMENTWORKFLOW",
      "WF_FEEBILLINGWORKFLOW"
    ],
    "aiCapabilities": [
      "AI_PRIMARYACADEMICAGENT",
      "AI_ECDMILESTONETRACKERAGENT"
    ],
    "permissions": [
      "ROLE_HEAD_TEACHER",
      "ROLE_PRIMARY_DOS",
      "ROLE_ECD_TEACHER"
    ],
    "runtimeComponentId": "RTC_CAP_NP_CLINIC",
    "mobileParity": {
      "hasMobileView": true,
      "mobileComponentId": "M_RTC_CAP_NP_CLINIC",
      "mobileRoute": "/products/nursery-primary/mod-np-clinic/mobile"
    }
  },
  {
    "uiMetadataId": "UIM_CAP_NP_CATERING",
    "capabilityId": "CAP_NP_CATERING",
    "productId": "JUMO-NURSERY-PRIMARY-ERP",
    "moduleId": "MOD_NP_CATERING",
    "portalId": "PORTAL_EDU_HEAD",
    "pageTitle": "Nutrition & School Dining Engine",
    "navLabel": "Nutrition &",
    "icon": "LayoutGrid",
    "route": "/products/nursery-primary/mod-np-catering",
    "breadcrumbs": [
      "Enterprise",
      "JUMO-NURSERY-PRIMARY-ERP",
      "Nutrition & School Dining Engine"
    ],
    "layout": "STANDARD_DASHBOARD_GRID",
    "sections": [
      {
        "id": "SEC_KPI",
        "title": "Executive KPI Metrics",
        "type": "KPI_ROW"
      },
      {
        "id": "SEC_DATA",
        "title": "Operational Records Ledger",
        "type": "GRID_TABLE"
      },
      {
        "id": "SEC_ACTIONS",
        "title": "Action Dispatcher & Approvals",
        "type": "ACTION_BAR"
      }
    ],
    "cards": [
      {
        "id": "CARD_1",
        "title": "Active Work Items",
        "value": "28",
        "status": "NORMAL"
      },
      {
        "id": "CARD_2",
        "title": "Sovereign Audit Parity",
        "value": "100%",
        "status": "VERIFIED"
      }
    ],
    "forms": [
      "FORM_MOD_NP_CATERING_ENTRY"
    ],
    "tables": [
      "TABLE_MOD_NP_CATERING_GRID"
    ],
    "dashboards": [
      "DASH_MOD_NP_CATERING_EXECUTIVE"
    ],
    "reports": [
      "REP_MOD_NP_CATERING_SUMMARY"
    ],
    "workflows": [
      "WF_STUDENTENROLLMENTWORKFLOW",
      "WF_FEEBILLINGWORKFLOW"
    ],
    "aiCapabilities": [
      "AI_PRIMARYACADEMICAGENT",
      "AI_ECDMILESTONETRACKERAGENT"
    ],
    "permissions": [
      "ROLE_HEAD_TEACHER",
      "ROLE_PRIMARY_DOS",
      "ROLE_ECD_TEACHER"
    ],
    "runtimeComponentId": "RTC_CAP_NP_CATERING",
    "mobileParity": {
      "hasMobileView": true,
      "mobileComponentId": "M_RTC_CAP_NP_CATERING",
      "mobileRoute": "/products/nursery-primary/mod-np-catering/mobile"
    }
  },
  {
    "uiMetadataId": "UIM_CAP_NP_TRANSPORT",
    "capabilityId": "CAP_NP_TRANSPORT",
    "productId": "JUMO-NURSERY-PRIMARY-ERP",
    "moduleId": "MOD_NP_TRANSPORT",
    "portalId": "PORTAL_EDU_HEAD",
    "pageTitle": "Student Bus Routing & Tracking Engine",
    "navLabel": "Student Bus",
    "icon": "LayoutGrid",
    "route": "/products/nursery-primary/mod-np-transport",
    "breadcrumbs": [
      "Enterprise",
      "JUMO-NURSERY-PRIMARY-ERP",
      "Student Bus Routing & Tracking Engine"
    ],
    "layout": "STANDARD_DASHBOARD_GRID",
    "sections": [
      {
        "id": "SEC_KPI",
        "title": "Executive KPI Metrics",
        "type": "KPI_ROW"
      },
      {
        "id": "SEC_DATA",
        "title": "Operational Records Ledger",
        "type": "GRID_TABLE"
      },
      {
        "id": "SEC_ACTIONS",
        "title": "Action Dispatcher & Approvals",
        "type": "ACTION_BAR"
      }
    ],
    "cards": [
      {
        "id": "CARD_1",
        "title": "Active Work Items",
        "value": "28",
        "status": "NORMAL"
      },
      {
        "id": "CARD_2",
        "title": "Sovereign Audit Parity",
        "value": "100%",
        "status": "VERIFIED"
      }
    ],
    "forms": [
      "FORM_MOD_NP_TRANSPORT_ENTRY"
    ],
    "tables": [
      "TABLE_MOD_NP_TRANSPORT_GRID"
    ],
    "dashboards": [
      "DASH_MOD_NP_TRANSPORT_EXECUTIVE"
    ],
    "reports": [
      "REP_MOD_NP_TRANSPORT_SUMMARY"
    ],
    "workflows": [
      "WF_STUDENTENROLLMENTWORKFLOW",
      "WF_FEEBILLINGWORKFLOW"
    ],
    "aiCapabilities": [
      "AI_PRIMARYACADEMICAGENT",
      "AI_ECDMILESTONETRACKERAGENT"
    ],
    "permissions": [
      "ROLE_HEAD_TEACHER",
      "ROLE_PRIMARY_DOS",
      "ROLE_ECD_TEACHER"
    ],
    "runtimeComponentId": "RTC_CAP_NP_TRANSPORT",
    "mobileParity": {
      "hasMobileView": true,
      "mobileComponentId": "M_RTC_CAP_NP_TRANSPORT",
      "mobileRoute": "/products/nursery-primary/mod-np-transport/mobile"
    }
  },
  {
    "uiMetadataId": "UIM_CAP_SEC_HOD",
    "capabilityId": "CAP_SEC_HOD",
    "productId": "JUMO-SECONDARY-ERP",
    "moduleId": "MOD_SEC_HOD",
    "portalId": "PORTAL_SEC_PRINCIPAL",
    "pageTitle": "Academic Departmental Heads (HOD) Engine",
    "navLabel": "Academic Departmental",
    "icon": "LayoutGrid",
    "route": "/products/secondary/mod-sec-hod",
    "breadcrumbs": [
      "Enterprise",
      "JUMO-SECONDARY-ERP",
      "Academic Departmental Heads (HOD) Engine"
    ],
    "layout": "STANDARD_DASHBOARD_GRID",
    "sections": [
      {
        "id": "SEC_KPI",
        "title": "Executive KPI Metrics",
        "type": "KPI_ROW"
      },
      {
        "id": "SEC_DATA",
        "title": "Operational Records Ledger",
        "type": "GRID_TABLE"
      },
      {
        "id": "SEC_ACTIONS",
        "title": "Action Dispatcher & Approvals",
        "type": "ACTION_BAR"
      }
    ],
    "cards": [
      {
        "id": "CARD_1",
        "title": "Active Work Items",
        "value": "28",
        "status": "NORMAL"
      },
      {
        "id": "CARD_2",
        "title": "Sovereign Audit Parity",
        "value": "100%",
        "status": "VERIFIED"
      }
    ],
    "forms": [
      "FORM_MOD_SEC_HOD_ENTRY"
    ],
    "tables": [
      "TABLE_MOD_SEC_HOD_GRID"
    ],
    "dashboards": [
      "DASH_MOD_SEC_HOD_EXECUTIVE"
    ],
    "reports": [
      "REP_MOD_SEC_HOD_SUMMARY"
    ],
    "workflows": [
      "WF_SECONDARYMATRICULATIONWORKFLOW",
      "WF_TERMEXAMINATIONGRADINGWORKFLOW"
    ],
    "aiCapabilities": [
      "AI_SECONDARYACADEMICAGENT",
      "AI_DEPARTMENTALHODCOORDINATOR"
    ],
    "permissions": [
      "ROLE_PRINCIPAL",
      "ROLE_SENATE_MEMBER",
      "ROLE_REGISTRAR"
    ],
    "runtimeComponentId": "RTC_CAP_SEC_HOD",
    "mobileParity": {
      "hasMobileView": true,
      "mobileComponentId": "M_RTC_CAP_SEC_HOD",
      "mobileRoute": "/products/secondary/mod-sec-hod/mobile"
    }
  },
  {
    "uiMetadataId": "UIM_CAP_SEC_REGISTRAR",
    "capabilityId": "CAP_SEC_REGISTRAR",
    "productId": "JUMO-SECONDARY-ERP",
    "moduleId": "MOD_SEC_REGISTRAR",
    "portalId": "PORTAL_SEC_REGISTRAR",
    "pageTitle": "Secondary Registry & Matriculation Engine",
    "navLabel": "Secondary Registry",
    "icon": "LayoutGrid",
    "route": "/products/secondary/mod-sec-registrar",
    "breadcrumbs": [
      "Enterprise",
      "JUMO-SECONDARY-ERP",
      "Secondary Registry & Matriculation Engine"
    ],
    "layout": "STANDARD_DASHBOARD_GRID",
    "sections": [
      {
        "id": "SEC_KPI",
        "title": "Executive KPI Metrics",
        "type": "KPI_ROW"
      },
      {
        "id": "SEC_DATA",
        "title": "Operational Records Ledger",
        "type": "GRID_TABLE"
      },
      {
        "id": "SEC_ACTIONS",
        "title": "Action Dispatcher & Approvals",
        "type": "ACTION_BAR"
      }
    ],
    "cards": [
      {
        "id": "CARD_1",
        "title": "Active Work Items",
        "value": "28",
        "status": "NORMAL"
      },
      {
        "id": "CARD_2",
        "title": "Sovereign Audit Parity",
        "value": "100%",
        "status": "VERIFIED"
      }
    ],
    "forms": [
      "FORM_MOD_SEC_REGISTRAR_ENTRY"
    ],
    "tables": [
      "TABLE_MOD_SEC_REGISTRAR_GRID"
    ],
    "dashboards": [
      "DASH_MOD_SEC_REGISTRAR_EXECUTIVE"
    ],
    "reports": [
      "REP_MOD_SEC_REGISTRAR_SUMMARY"
    ],
    "workflows": [
      "WF_SECONDARYMATRICULATIONWORKFLOW",
      "WF_TERMEXAMINATIONGRADINGWORKFLOW"
    ],
    "aiCapabilities": [
      "AI_SECONDARYACADEMICAGENT",
      "AI_DEPARTMENTALHODCOORDINATOR"
    ],
    "permissions": [
      "ROLE_PRINCIPAL",
      "ROLE_SENATE_MEMBER",
      "ROLE_REGISTRAR"
    ],
    "runtimeComponentId": "RTC_CAP_SEC_REGISTRAR",
    "mobileParity": {
      "hasMobileView": true,
      "mobileComponentId": "M_RTC_CAP_SEC_REGISTRAR",
      "mobileRoute": "/products/secondary/mod-sec-registrar/mobile"
    }
  },
  {
    "uiMetadataId": "UIM_CAP_SEC_BURSARY",
    "capabilityId": "CAP_SEC_BURSARY",
    "productId": "JUMO-SECONDARY-ERP",
    "moduleId": "MOD_SEC_BURSARY",
    "portalId": "PORTAL_SEC_PRINCIPAL",
    "pageTitle": "Secondary Bursar & Tuitions Engine",
    "navLabel": "Secondary Bursar",
    "icon": "LayoutGrid",
    "route": "/products/secondary/mod-sec-bursary",
    "breadcrumbs": [
      "Enterprise",
      "JUMO-SECONDARY-ERP",
      "Secondary Bursar & Tuitions Engine"
    ],
    "layout": "STANDARD_DASHBOARD_GRID",
    "sections": [
      {
        "id": "SEC_KPI",
        "title": "Executive KPI Metrics",
        "type": "KPI_ROW"
      },
      {
        "id": "SEC_DATA",
        "title": "Operational Records Ledger",
        "type": "GRID_TABLE"
      },
      {
        "id": "SEC_ACTIONS",
        "title": "Action Dispatcher & Approvals",
        "type": "ACTION_BAR"
      }
    ],
    "cards": [
      {
        "id": "CARD_1",
        "title": "Active Work Items",
        "value": "28",
        "status": "NORMAL"
      },
      {
        "id": "CARD_2",
        "title": "Sovereign Audit Parity",
        "value": "100%",
        "status": "VERIFIED"
      }
    ],
    "forms": [
      "FORM_MOD_SEC_BURSARY_ENTRY"
    ],
    "tables": [
      "TABLE_MOD_SEC_BURSARY_GRID"
    ],
    "dashboards": [
      "DASH_MOD_SEC_BURSARY_EXECUTIVE"
    ],
    "reports": [
      "REP_MOD_SEC_BURSARY_SUMMARY"
    ],
    "workflows": [
      "WF_SECONDARYMATRICULATIONWORKFLOW",
      "WF_TERMEXAMINATIONGRADINGWORKFLOW"
    ],
    "aiCapabilities": [
      "AI_SECONDARYACADEMICAGENT",
      "AI_DEPARTMENTALHODCOORDINATOR"
    ],
    "permissions": [
      "ROLE_PRINCIPAL",
      "ROLE_SENATE_MEMBER",
      "ROLE_REGISTRAR"
    ],
    "runtimeComponentId": "RTC_CAP_SEC_BURSARY",
    "mobileParity": {
      "hasMobileView": true,
      "mobileComponentId": "M_RTC_CAP_SEC_BURSARY",
      "mobileRoute": "/products/secondary/mod-sec-bursary/mobile"
    }
  },
  {
    "uiMetadataId": "UIM_CAP_SEC_SENATE",
    "capabilityId": "CAP_SEC_SENATE",
    "productId": "JUMO-SECONDARY-ERP",
    "moduleId": "MOD_SEC_SENATE",
    "portalId": "PORTAL_SEC_SENATE",
    "pageTitle": "Secondary Academic Senate Engine",
    "navLabel": "Secondary Academic",
    "icon": "LayoutGrid",
    "route": "/products/secondary/mod-sec-senate",
    "breadcrumbs": [
      "Enterprise",
      "JUMO-SECONDARY-ERP",
      "Secondary Academic Senate Engine"
    ],
    "layout": "STANDARD_DASHBOARD_GRID",
    "sections": [
      {
        "id": "SEC_KPI",
        "title": "Executive KPI Metrics",
        "type": "KPI_ROW"
      },
      {
        "id": "SEC_DATA",
        "title": "Operational Records Ledger",
        "type": "GRID_TABLE"
      },
      {
        "id": "SEC_ACTIONS",
        "title": "Action Dispatcher & Approvals",
        "type": "ACTION_BAR"
      }
    ],
    "cards": [
      {
        "id": "CARD_1",
        "title": "Active Work Items",
        "value": "28",
        "status": "NORMAL"
      },
      {
        "id": "CARD_2",
        "title": "Sovereign Audit Parity",
        "value": "100%",
        "status": "VERIFIED"
      }
    ],
    "forms": [
      "FORM_MOD_SEC_SENATE_ENTRY"
    ],
    "tables": [
      "TABLE_MOD_SEC_SENATE_GRID"
    ],
    "dashboards": [
      "DASH_MOD_SEC_SENATE_EXECUTIVE"
    ],
    "reports": [
      "REP_MOD_SEC_SENATE_SUMMARY"
    ],
    "workflows": [
      "WF_SECONDARYMATRICULATIONWORKFLOW",
      "WF_TERMEXAMINATIONGRADINGWORKFLOW"
    ],
    "aiCapabilities": [
      "AI_SECONDARYACADEMICAGENT",
      "AI_DEPARTMENTALHODCOORDINATOR"
    ],
    "permissions": [
      "ROLE_PRINCIPAL",
      "ROLE_SENATE_MEMBER",
      "ROLE_REGISTRAR"
    ],
    "runtimeComponentId": "RTC_CAP_SEC_SENATE",
    "mobileParity": {
      "hasMobileView": true,
      "mobileComponentId": "M_RTC_CAP_SEC_SENATE",
      "mobileRoute": "/products/secondary/mod-sec-senate/mobile"
    }
  },
  {
    "uiMetadataId": "UIM_CAP_SEC_SERVICE",
    "capabilityId": "CAP_SEC_SERVICE",
    "productId": "JUMO-SECONDARY-ERP",
    "moduleId": "MOD_SEC_SERVICE",
    "portalId": "PORTAL_SEC_PRINCIPAL",
    "pageTitle": "Secondary Core Domain Service Engine",
    "navLabel": "Secondary Core",
    "icon": "LayoutGrid",
    "route": "/products/secondary/mod-sec-service",
    "breadcrumbs": [
      "Enterprise",
      "JUMO-SECONDARY-ERP",
      "Secondary Core Domain Service Engine"
    ],
    "layout": "STANDARD_DASHBOARD_GRID",
    "sections": [
      {
        "id": "SEC_KPI",
        "title": "Executive KPI Metrics",
        "type": "KPI_ROW"
      },
      {
        "id": "SEC_DATA",
        "title": "Operational Records Ledger",
        "type": "GRID_TABLE"
      },
      {
        "id": "SEC_ACTIONS",
        "title": "Action Dispatcher & Approvals",
        "type": "ACTION_BAR"
      }
    ],
    "cards": [
      {
        "id": "CARD_1",
        "title": "Active Work Items",
        "value": "28",
        "status": "NORMAL"
      },
      {
        "id": "CARD_2",
        "title": "Sovereign Audit Parity",
        "value": "100%",
        "status": "VERIFIED"
      }
    ],
    "forms": [
      "FORM_MOD_SEC_SERVICE_ENTRY"
    ],
    "tables": [
      "TABLE_MOD_SEC_SERVICE_GRID"
    ],
    "dashboards": [
      "DASH_MOD_SEC_SERVICE_EXECUTIVE"
    ],
    "reports": [
      "REP_MOD_SEC_SERVICE_SUMMARY"
    ],
    "workflows": [
      "WF_SECONDARYMATRICULATIONWORKFLOW",
      "WF_TERMEXAMINATIONGRADINGWORKFLOW"
    ],
    "aiCapabilities": [
      "AI_SECONDARYACADEMICAGENT",
      "AI_DEPARTMENTALHODCOORDINATOR"
    ],
    "permissions": [
      "ROLE_PRINCIPAL",
      "ROLE_SENATE_MEMBER",
      "ROLE_REGISTRAR"
    ],
    "runtimeComponentId": "RTC_CAP_SEC_SERVICE",
    "mobileParity": {
      "hasMobileView": true,
      "mobileComponentId": "M_RTC_CAP_SEC_SERVICE",
      "mobileRoute": "/products/secondary/mod-sec-service/mobile"
    }
  },
  {
    "uiMetadataId": "UIM_CAP_ALUM_REGISTRY",
    "capabilityId": "CAP_ALUM_REGISTRY",
    "productId": "JUMO-ALUMNI",
    "moduleId": "MOD_ALUM_REGISTRY",
    "portalId": "PORTAL_ALUM_DIR",
    "pageTitle": "Alumni Census & Graduate Registry Engine",
    "navLabel": "Alumni Census",
    "icon": "LayoutGrid",
    "route": "/products/alumni/mod-alum-registry",
    "breadcrumbs": [
      "Enterprise",
      "JUMO-ALUMNI",
      "Alumni Census & Graduate Registry Engine"
    ],
    "layout": "STANDARD_DASHBOARD_GRID",
    "sections": [
      {
        "id": "SEC_KPI",
        "title": "Executive KPI Metrics",
        "type": "KPI_ROW"
      },
      {
        "id": "SEC_DATA",
        "title": "Operational Records Ledger",
        "type": "GRID_TABLE"
      },
      {
        "id": "SEC_ACTIONS",
        "title": "Action Dispatcher & Approvals",
        "type": "ACTION_BAR"
      }
    ],
    "cards": [
      {
        "id": "CARD_1",
        "title": "Active Work Items",
        "value": "28",
        "status": "NORMAL"
      },
      {
        "id": "CARD_2",
        "title": "Sovereign Audit Parity",
        "value": "100%",
        "status": "VERIFIED"
      }
    ],
    "forms": [
      "FORM_MOD_ALUM_REGISTRY_ENTRY"
    ],
    "tables": [
      "TABLE_MOD_ALUM_REGISTRY_GRID"
    ],
    "dashboards": [
      "DASH_MOD_ALUM_REGISTRY_EXECUTIVE"
    ],
    "reports": [
      "REP_MOD_ALUM_REGISTRY_SUMMARY"
    ],
    "workflows": [
      "WF_ALUMNIVERIFICATIONWORKFLOW",
      "WF_GIVINGCAMPAIGNPLEDGEWORKFLOW"
    ],
    "aiCapabilities": [
      "AI_ALUMNIADVANCEMENTAGENT",
      "AI_ENDOWMENTYIELDCALCULATOR"
    ],
    "permissions": [
      "ROLE_ALUMNI_DIRECTOR",
      "ROLE_BOARD_MEMBER",
      "ROLE_CHAPTER_LEAD"
    ],
    "runtimeComponentId": "RTC_CAP_ALUM_REGISTRY",
    "mobileParity": {
      "hasMobileView": true,
      "mobileComponentId": "M_RTC_CAP_ALUM_REGISTRY",
      "mobileRoute": "/products/alumni/mod-alum-registry/mobile"
    }
  },
  {
    "uiMetadataId": "UIM_CAP_ALUM_GIVING",
    "capabilityId": "CAP_ALUM_GIVING",
    "productId": "JUMO-ALUMNI",
    "moduleId": "MOD_ALUM_GIVING",
    "portalId": "PORTAL_ALUM_GIVING",
    "pageTitle": "Giving Campaigns & Endowments Engine",
    "navLabel": "Giving Campaigns",
    "icon": "LayoutGrid",
    "route": "/products/alumni/mod-alum-giving",
    "breadcrumbs": [
      "Enterprise",
      "JUMO-ALUMNI",
      "Giving Campaigns & Endowments Engine"
    ],
    "layout": "STANDARD_DASHBOARD_GRID",
    "sections": [
      {
        "id": "SEC_KPI",
        "title": "Executive KPI Metrics",
        "type": "KPI_ROW"
      },
      {
        "id": "SEC_DATA",
        "title": "Operational Records Ledger",
        "type": "GRID_TABLE"
      },
      {
        "id": "SEC_ACTIONS",
        "title": "Action Dispatcher & Approvals",
        "type": "ACTION_BAR"
      }
    ],
    "cards": [
      {
        "id": "CARD_1",
        "title": "Active Work Items",
        "value": "28",
        "status": "NORMAL"
      },
      {
        "id": "CARD_2",
        "title": "Sovereign Audit Parity",
        "value": "100%",
        "status": "VERIFIED"
      }
    ],
    "forms": [
      "FORM_MOD_ALUM_GIVING_ENTRY"
    ],
    "tables": [
      "TABLE_MOD_ALUM_GIVING_GRID"
    ],
    "dashboards": [
      "DASH_MOD_ALUM_GIVING_EXECUTIVE"
    ],
    "reports": [
      "REP_MOD_ALUM_GIVING_SUMMARY"
    ],
    "workflows": [
      "WF_ALUMNIVERIFICATIONWORKFLOW",
      "WF_GIVINGCAMPAIGNPLEDGEWORKFLOW"
    ],
    "aiCapabilities": [
      "AI_ALUMNIADVANCEMENTAGENT",
      "AI_ENDOWMENTYIELDCALCULATOR"
    ],
    "permissions": [
      "ROLE_ALUMNI_DIRECTOR",
      "ROLE_BOARD_MEMBER",
      "ROLE_CHAPTER_LEAD"
    ],
    "runtimeComponentId": "RTC_CAP_ALUM_GIVING",
    "mobileParity": {
      "hasMobileView": true,
      "mobileComponentId": "M_RTC_CAP_ALUM_GIVING",
      "mobileRoute": "/products/alumni/mod-alum-giving/mobile"
    }
  },
  {
    "uiMetadataId": "UIM_CAP_ALUM_CHAPTERS",
    "capabilityId": "CAP_ALUM_CHAPTERS",
    "productId": "JUMO-ALUMNI",
    "moduleId": "MOD_ALUM_CHAPTERS",
    "portalId": "PORTAL_ALUM_CHAPTERS",
    "pageTitle": "Global Chapters & Diaspora Network Engine",
    "navLabel": "Global Chapters",
    "icon": "LayoutGrid",
    "route": "/products/alumni/mod-alum-chapters",
    "breadcrumbs": [
      "Enterprise",
      "JUMO-ALUMNI",
      "Global Chapters & Diaspora Network Engine"
    ],
    "layout": "STANDARD_DASHBOARD_GRID",
    "sections": [
      {
        "id": "SEC_KPI",
        "title": "Executive KPI Metrics",
        "type": "KPI_ROW"
      },
      {
        "id": "SEC_DATA",
        "title": "Operational Records Ledger",
        "type": "GRID_TABLE"
      },
      {
        "id": "SEC_ACTIONS",
        "title": "Action Dispatcher & Approvals",
        "type": "ACTION_BAR"
      }
    ],
    "cards": [
      {
        "id": "CARD_1",
        "title": "Active Work Items",
        "value": "28",
        "status": "NORMAL"
      },
      {
        "id": "CARD_2",
        "title": "Sovereign Audit Parity",
        "value": "100%",
        "status": "VERIFIED"
      }
    ],
    "forms": [
      "FORM_MOD_ALUM_CHAPTERS_ENTRY"
    ],
    "tables": [
      "TABLE_MOD_ALUM_CHAPTERS_GRID"
    ],
    "dashboards": [
      "DASH_MOD_ALUM_CHAPTERS_EXECUTIVE"
    ],
    "reports": [
      "REP_MOD_ALUM_CHAPTERS_SUMMARY"
    ],
    "workflows": [
      "WF_ALUMNIVERIFICATIONWORKFLOW",
      "WF_GIVINGCAMPAIGNPLEDGEWORKFLOW"
    ],
    "aiCapabilities": [
      "AI_ALUMNIADVANCEMENTAGENT",
      "AI_ENDOWMENTYIELDCALCULATOR"
    ],
    "permissions": [
      "ROLE_ALUMNI_DIRECTOR",
      "ROLE_BOARD_MEMBER",
      "ROLE_CHAPTER_LEAD"
    ],
    "runtimeComponentId": "RTC_CAP_ALUM_CHAPTERS",
    "mobileParity": {
      "hasMobileView": true,
      "mobileComponentId": "M_RTC_CAP_ALUM_CHAPTERS",
      "mobileRoute": "/products/alumni/mod-alum-chapters/mobile"
    }
  },
  {
    "uiMetadataId": "UIM_CAP_ALUM_CAREER",
    "capabilityId": "CAP_ALUM_CAREER",
    "productId": "JUMO-ALUMNI",
    "moduleId": "MOD_ALUM_CAREER",
    "portalId": "PORTAL_ALUM_CAREER",
    "pageTitle": "Career Services & Mentorship Engine",
    "navLabel": "Career Services",
    "icon": "LayoutGrid",
    "route": "/products/alumni/mod-alum-career",
    "breadcrumbs": [
      "Enterprise",
      "JUMO-ALUMNI",
      "Career Services & Mentorship Engine"
    ],
    "layout": "STANDARD_DASHBOARD_GRID",
    "sections": [
      {
        "id": "SEC_KPI",
        "title": "Executive KPI Metrics",
        "type": "KPI_ROW"
      },
      {
        "id": "SEC_DATA",
        "title": "Operational Records Ledger",
        "type": "GRID_TABLE"
      },
      {
        "id": "SEC_ACTIONS",
        "title": "Action Dispatcher & Approvals",
        "type": "ACTION_BAR"
      }
    ],
    "cards": [
      {
        "id": "CARD_1",
        "title": "Active Work Items",
        "value": "28",
        "status": "NORMAL"
      },
      {
        "id": "CARD_2",
        "title": "Sovereign Audit Parity",
        "value": "100%",
        "status": "VERIFIED"
      }
    ],
    "forms": [
      "FORM_MOD_ALUM_CAREER_ENTRY"
    ],
    "tables": [
      "TABLE_MOD_ALUM_CAREER_GRID"
    ],
    "dashboards": [
      "DASH_MOD_ALUM_CAREER_EXECUTIVE"
    ],
    "reports": [
      "REP_MOD_ALUM_CAREER_SUMMARY"
    ],
    "workflows": [
      "WF_ALUMNIVERIFICATIONWORKFLOW",
      "WF_GIVINGCAMPAIGNPLEDGEWORKFLOW"
    ],
    "aiCapabilities": [
      "AI_ALUMNIADVANCEMENTAGENT",
      "AI_ENDOWMENTYIELDCALCULATOR"
    ],
    "permissions": [
      "ROLE_ALUMNI_DIRECTOR",
      "ROLE_BOARD_MEMBER",
      "ROLE_CHAPTER_LEAD"
    ],
    "runtimeComponentId": "RTC_CAP_ALUM_CAREER",
    "mobileParity": {
      "hasMobileView": true,
      "mobileComponentId": "M_RTC_CAP_ALUM_CAREER",
      "mobileRoute": "/products/alumni/mod-alum-career/mobile"
    }
  },
  {
    "uiMetadataId": "UIM_CAP_ALUM_DASHBOARD",
    "capabilityId": "CAP_ALUM_DASHBOARD",
    "productId": "JUMO-ALUMNI",
    "moduleId": "MOD_ALUM_DASHBOARD",
    "portalId": "PORTAL_ALUM_DIR",
    "pageTitle": "Alumni Intelligence Dashboard Engine",
    "navLabel": "Alumni Intelligence",
    "icon": "LayoutGrid",
    "route": "/products/alumni/mod-alum-dashboard",
    "breadcrumbs": [
      "Enterprise",
      "JUMO-ALUMNI",
      "Alumni Intelligence Dashboard Engine"
    ],
    "layout": "STANDARD_DASHBOARD_GRID",
    "sections": [
      {
        "id": "SEC_KPI",
        "title": "Executive KPI Metrics",
        "type": "KPI_ROW"
      },
      {
        "id": "SEC_DATA",
        "title": "Operational Records Ledger",
        "type": "GRID_TABLE"
      },
      {
        "id": "SEC_ACTIONS",
        "title": "Action Dispatcher & Approvals",
        "type": "ACTION_BAR"
      }
    ],
    "cards": [
      {
        "id": "CARD_1",
        "title": "Active Work Items",
        "value": "28",
        "status": "NORMAL"
      },
      {
        "id": "CARD_2",
        "title": "Sovereign Audit Parity",
        "value": "100%",
        "status": "VERIFIED"
      }
    ],
    "forms": [
      "FORM_MOD_ALUM_DASHBOARD_ENTRY"
    ],
    "tables": [
      "TABLE_MOD_ALUM_DASHBOARD_GRID"
    ],
    "dashboards": [
      "DASH_MOD_ALUM_DASHBOARD_EXECUTIVE"
    ],
    "reports": [
      "REP_MOD_ALUM_DASHBOARD_SUMMARY"
    ],
    "workflows": [
      "WF_ALUMNIVERIFICATIONWORKFLOW",
      "WF_GIVINGCAMPAIGNPLEDGEWORKFLOW"
    ],
    "aiCapabilities": [
      "AI_ALUMNIADVANCEMENTAGENT",
      "AI_ENDOWMENTYIELDCALCULATOR"
    ],
    "permissions": [
      "ROLE_ALUMNI_DIRECTOR",
      "ROLE_BOARD_MEMBER",
      "ROLE_CHAPTER_LEAD"
    ],
    "runtimeComponentId": "RTC_CAP_ALUM_DASHBOARD",
    "mobileParity": {
      "hasMobileView": true,
      "mobileComponentId": "M_RTC_CAP_ALUM_DASHBOARD",
      "mobileRoute": "/products/alumni/mod-alum-dashboard/mobile"
    }
  },
  {
    "uiMetadataId": "UIM_CAP_CH_MEMBERSHIP",
    "capabilityId": "CAP_CH_MEMBERSHIP",
    "productId": "JUMO-CHURCH",
    "moduleId": "MOD_CH_MEMBERSHIP",
    "portalId": "PORTAL_CH_BISHOP",
    "pageTitle": "Congregation Directory & Census Engine",
    "navLabel": "Congregation Directory",
    "icon": "LayoutGrid",
    "route": "/products/church/mod-ch-membership",
    "breadcrumbs": [
      "Enterprise",
      "JUMO-CHURCH",
      "Congregation Directory & Census Engine"
    ],
    "layout": "STANDARD_DASHBOARD_GRID",
    "sections": [
      {
        "id": "SEC_KPI",
        "title": "Executive KPI Metrics",
        "type": "KPI_ROW"
      },
      {
        "id": "SEC_DATA",
        "title": "Operational Records Ledger",
        "type": "GRID_TABLE"
      },
      {
        "id": "SEC_ACTIONS",
        "title": "Action Dispatcher & Approvals",
        "type": "ACTION_BAR"
      }
    ],
    "cards": [
      {
        "id": "CARD_1",
        "title": "Active Work Items",
        "value": "28",
        "status": "NORMAL"
      },
      {
        "id": "CARD_2",
        "title": "Sovereign Audit Parity",
        "value": "100%",
        "status": "VERIFIED"
      }
    ],
    "forms": [
      "FORM_MOD_CH_MEMBERSHIP_ENTRY"
    ],
    "tables": [
      "TABLE_MOD_CH_MEMBERSHIP_GRID"
    ],
    "dashboards": [
      "DASH_MOD_CH_MEMBERSHIP_EXECUTIVE"
    ],
    "reports": [
      "REP_MOD_CH_MEMBERSHIP_SUMMARY"
    ],
    "workflows": [
      "WF_SACRAMENTALREGISTRATIONWORKFLOW",
      "WF_TITHECONTRIBUTIONWORKFLOW"
    ],
    "aiCapabilities": [
      "AI_DIOCESANCENSUSAGENT",
      "AI_TITHESAUDITAGENT"
    ],
    "permissions": [
      "ROLE_BISHOP",
      "ROLE_CHANCELLOR",
      "ROLE_PARISH_PRIEST"
    ],
    "runtimeComponentId": "RTC_CAP_CH_MEMBERSHIP",
    "mobileParity": {
      "hasMobileView": true,
      "mobileComponentId": "M_RTC_CAP_CH_MEMBERSHIP",
      "mobileRoute": "/products/church/mod-ch-membership/mobile"
    }
  },
  {
    "uiMetadataId": "UIM_CAP_CH_FINANCE",
    "capabilityId": "CAP_CH_FINANCE",
    "productId": "JUMO-CHURCH",
    "moduleId": "MOD_CH_FINANCE",
    "portalId": "PORTAL_CH_BISHOP",
    "pageTitle": "Tithes, Offerings & Diocesan Ledger Engine",
    "navLabel": "Tithes, Offerings",
    "icon": "LayoutGrid",
    "route": "/products/church/mod-ch-finance",
    "breadcrumbs": [
      "Enterprise",
      "JUMO-CHURCH",
      "Tithes, Offerings & Diocesan Ledger Engine"
    ],
    "layout": "STANDARD_DASHBOARD_GRID",
    "sections": [
      {
        "id": "SEC_KPI",
        "title": "Executive KPI Metrics",
        "type": "KPI_ROW"
      },
      {
        "id": "SEC_DATA",
        "title": "Operational Records Ledger",
        "type": "GRID_TABLE"
      },
      {
        "id": "SEC_ACTIONS",
        "title": "Action Dispatcher & Approvals",
        "type": "ACTION_BAR"
      }
    ],
    "cards": [
      {
        "id": "CARD_1",
        "title": "Active Work Items",
        "value": "28",
        "status": "NORMAL"
      },
      {
        "id": "CARD_2",
        "title": "Sovereign Audit Parity",
        "value": "100%",
        "status": "VERIFIED"
      }
    ],
    "forms": [
      "FORM_MOD_CH_FINANCE_ENTRY"
    ],
    "tables": [
      "TABLE_MOD_CH_FINANCE_GRID"
    ],
    "dashboards": [
      "DASH_MOD_CH_FINANCE_EXECUTIVE"
    ],
    "reports": [
      "REP_MOD_CH_FINANCE_SUMMARY"
    ],
    "workflows": [
      "WF_SACRAMENTALREGISTRATIONWORKFLOW",
      "WF_TITHECONTRIBUTIONWORKFLOW"
    ],
    "aiCapabilities": [
      "AI_DIOCESANCENSUSAGENT",
      "AI_TITHESAUDITAGENT"
    ],
    "permissions": [
      "ROLE_BISHOP",
      "ROLE_CHANCELLOR",
      "ROLE_PARISH_PRIEST"
    ],
    "runtimeComponentId": "RTC_CAP_CH_FINANCE",
    "mobileParity": {
      "hasMobileView": true,
      "mobileComponentId": "M_RTC_CAP_CH_FINANCE",
      "mobileRoute": "/products/church/mod-ch-finance/mobile"
    }
  },
  {
    "uiMetadataId": "UIM_CAP_CH_PASTORAL",
    "capabilityId": "CAP_CH_PASTORAL",
    "productId": "JUMO-CHURCH",
    "moduleId": "MOD_CH_PASTORAL",
    "portalId": "PORTAL_CH_PASTORAL",
    "pageTitle": "Pastoral Care & Visitation Tracking Engine",
    "navLabel": "Pastoral Care",
    "icon": "LayoutGrid",
    "route": "/products/church/mod-ch-pastoral",
    "breadcrumbs": [
      "Enterprise",
      "JUMO-CHURCH",
      "Pastoral Care & Visitation Tracking Engine"
    ],
    "layout": "STANDARD_DASHBOARD_GRID",
    "sections": [
      {
        "id": "SEC_KPI",
        "title": "Executive KPI Metrics",
        "type": "KPI_ROW"
      },
      {
        "id": "SEC_DATA",
        "title": "Operational Records Ledger",
        "type": "GRID_TABLE"
      },
      {
        "id": "SEC_ACTIONS",
        "title": "Action Dispatcher & Approvals",
        "type": "ACTION_BAR"
      }
    ],
    "cards": [
      {
        "id": "CARD_1",
        "title": "Active Work Items",
        "value": "28",
        "status": "NORMAL"
      },
      {
        "id": "CARD_2",
        "title": "Sovereign Audit Parity",
        "value": "100%",
        "status": "VERIFIED"
      }
    ],
    "forms": [
      "FORM_MOD_CH_PASTORAL_ENTRY"
    ],
    "tables": [
      "TABLE_MOD_CH_PASTORAL_GRID"
    ],
    "dashboards": [
      "DASH_MOD_CH_PASTORAL_EXECUTIVE"
    ],
    "reports": [
      "REP_MOD_CH_PASTORAL_SUMMARY"
    ],
    "workflows": [
      "WF_SACRAMENTALREGISTRATIONWORKFLOW",
      "WF_TITHECONTRIBUTIONWORKFLOW"
    ],
    "aiCapabilities": [
      "AI_DIOCESANCENSUSAGENT",
      "AI_TITHESAUDITAGENT"
    ],
    "permissions": [
      "ROLE_BISHOP",
      "ROLE_CHANCELLOR",
      "ROLE_PARISH_PRIEST"
    ],
    "runtimeComponentId": "RTC_CAP_CH_PASTORAL",
    "mobileParity": {
      "hasMobileView": true,
      "mobileComponentId": "M_RTC_CAP_CH_PASTORAL",
      "mobileRoute": "/products/church/mod-ch-pastoral/mobile"
    }
  },
  {
    "uiMetadataId": "UIM_CAP_CH_EVENTS",
    "capabilityId": "CAP_CH_EVENTS",
    "productId": "JUMO-CHURCH",
    "moduleId": "MOD_CH_EVENTS",
    "portalId": "PORTAL_CH_EVENTS",
    "pageTitle": "Liturgical Calendar & Event Operations Engine",
    "navLabel": "Liturgical Calendar",
    "icon": "LayoutGrid",
    "route": "/products/church/mod-ch-events",
    "breadcrumbs": [
      "Enterprise",
      "JUMO-CHURCH",
      "Liturgical Calendar & Event Operations Engine"
    ],
    "layout": "STANDARD_DASHBOARD_GRID",
    "sections": [
      {
        "id": "SEC_KPI",
        "title": "Executive KPI Metrics",
        "type": "KPI_ROW"
      },
      {
        "id": "SEC_DATA",
        "title": "Operational Records Ledger",
        "type": "GRID_TABLE"
      },
      {
        "id": "SEC_ACTIONS",
        "title": "Action Dispatcher & Approvals",
        "type": "ACTION_BAR"
      }
    ],
    "cards": [
      {
        "id": "CARD_1",
        "title": "Active Work Items",
        "value": "28",
        "status": "NORMAL"
      },
      {
        "id": "CARD_2",
        "title": "Sovereign Audit Parity",
        "value": "100%",
        "status": "VERIFIED"
      }
    ],
    "forms": [
      "FORM_MOD_CH_EVENTS_ENTRY"
    ],
    "tables": [
      "TABLE_MOD_CH_EVENTS_GRID"
    ],
    "dashboards": [
      "DASH_MOD_CH_EVENTS_EXECUTIVE"
    ],
    "reports": [
      "REP_MOD_CH_EVENTS_SUMMARY"
    ],
    "workflows": [
      "WF_SACRAMENTALREGISTRATIONWORKFLOW",
      "WF_TITHECONTRIBUTIONWORKFLOW"
    ],
    "aiCapabilities": [
      "AI_DIOCESANCENSUSAGENT",
      "AI_TITHESAUDITAGENT"
    ],
    "permissions": [
      "ROLE_BISHOP",
      "ROLE_CHANCELLOR",
      "ROLE_PARISH_PRIEST"
    ],
    "runtimeComponentId": "RTC_CAP_CH_EVENTS",
    "mobileParity": {
      "hasMobileView": true,
      "mobileComponentId": "M_RTC_CAP_CH_EVENTS",
      "mobileRoute": "/products/church/mod-ch-events/mobile"
    }
  },
  {
    "uiMetadataId": "UIM_CAP_CH_DASHBOARD",
    "capabilityId": "CAP_CH_DASHBOARD",
    "productId": "JUMO-CHURCH",
    "moduleId": "MOD_CH_DASHBOARD",
    "portalId": "PORTAL_CH_BISHOP",
    "pageTitle": "Executive Diocesan Dashboard Engine",
    "navLabel": "Executive Diocesan",
    "icon": "LayoutGrid",
    "route": "/products/church/mod-ch-dashboard",
    "breadcrumbs": [
      "Enterprise",
      "JUMO-CHURCH",
      "Executive Diocesan Dashboard Engine"
    ],
    "layout": "STANDARD_DASHBOARD_GRID",
    "sections": [
      {
        "id": "SEC_KPI",
        "title": "Executive KPI Metrics",
        "type": "KPI_ROW"
      },
      {
        "id": "SEC_DATA",
        "title": "Operational Records Ledger",
        "type": "GRID_TABLE"
      },
      {
        "id": "SEC_ACTIONS",
        "title": "Action Dispatcher & Approvals",
        "type": "ACTION_BAR"
      }
    ],
    "cards": [
      {
        "id": "CARD_1",
        "title": "Active Work Items",
        "value": "28",
        "status": "NORMAL"
      },
      {
        "id": "CARD_2",
        "title": "Sovereign Audit Parity",
        "value": "100%",
        "status": "VERIFIED"
      }
    ],
    "forms": [
      "FORM_MOD_CH_DASHBOARD_ENTRY"
    ],
    "tables": [
      "TABLE_MOD_CH_DASHBOARD_GRID"
    ],
    "dashboards": [
      "DASH_MOD_CH_DASHBOARD_EXECUTIVE"
    ],
    "reports": [
      "REP_MOD_CH_DASHBOARD_SUMMARY"
    ],
    "workflows": [
      "WF_SACRAMENTALREGISTRATIONWORKFLOW",
      "WF_TITHECONTRIBUTIONWORKFLOW"
    ],
    "aiCapabilities": [
      "AI_DIOCESANCENSUSAGENT",
      "AI_TITHESAUDITAGENT"
    ],
    "permissions": [
      "ROLE_BISHOP",
      "ROLE_CHANCELLOR",
      "ROLE_PARISH_PRIEST"
    ],
    "runtimeComponentId": "RTC_CAP_CH_DASHBOARD",
    "mobileParity": {
      "hasMobileView": true,
      "mobileComponentId": "M_RTC_CAP_CH_DASHBOARD",
      "mobileRoute": "/products/church/mod-ch-dashboard/mobile"
    }
  },
  {
    "uiMetadataId": "UIM_CAP_OCC_VERIFICATION",
    "capabilityId": "CAP_OCC_VERIFICATION",
    "productId": "JUMO-CONTROL",
    "moduleId": "MOD_OCC_VERIFICATION",
    "portalId": "PORTAL_OCC_CORE",
    "pageTitle": "Ring-0 Verification & Integrity Engine",
    "navLabel": "Ring-0 Verification",
    "icon": "LayoutGrid",
    "route": "/products/control/mod-occ-verification",
    "breadcrumbs": [
      "Enterprise",
      "JUMO-CONTROL",
      "Ring-0 Verification & Integrity Engine"
    ],
    "layout": "STANDARD_DASHBOARD_GRID",
    "sections": [
      {
        "id": "SEC_KPI",
        "title": "Executive KPI Metrics",
        "type": "KPI_ROW"
      },
      {
        "id": "SEC_DATA",
        "title": "Operational Records Ledger",
        "type": "GRID_TABLE"
      },
      {
        "id": "SEC_ACTIONS",
        "title": "Action Dispatcher & Approvals",
        "type": "ACTION_BAR"
      }
    ],
    "cards": [
      {
        "id": "CARD_1",
        "title": "Active Work Items",
        "value": "28",
        "status": "NORMAL"
      },
      {
        "id": "CARD_2",
        "title": "Sovereign Audit Parity",
        "value": "100%",
        "status": "VERIFIED"
      }
    ],
    "forms": [
      "FORM_MOD_OCC_VERIFICATION_ENTRY"
    ],
    "tables": [
      "TABLE_MOD_OCC_VERIFICATION_GRID"
    ],
    "dashboards": [
      "DASH_MOD_OCC_VERIFICATION_EXECUTIVE"
    ],
    "reports": [
      "REP_MOD_OCC_VERIFICATION_SUMMARY"
    ],
    "workflows": [
      "WF_RING0VERIFICATIONWORKFLOW",
      "WF_TENANTPROVISIONINGWORKFLOW"
    ],
    "aiCapabilities": [
      "AI_RUNTIMERELIABILITYAGENT",
      "AI_SOVEREIGNVERIFICATIONAGENT"
    ],
    "permissions": [
      "ROLE_SOVEREIGN_OWNER"
    ],
    "runtimeComponentId": "RTC_CAP_OCC_VERIFICATION",
    "mobileParity": {
      "hasMobileView": true,
      "mobileComponentId": "M_RTC_CAP_OCC_VERIFICATION",
      "mobileRoute": "/products/control/mod-occ-verification/mobile"
    }
  },
  {
    "uiMetadataId": "UIM_CAP_OCC_TRUST",
    "capabilityId": "CAP_OCC_TRUST",
    "productId": "JUMO-CONTROL",
    "moduleId": "MOD_OCC_TRUST",
    "portalId": "PORTAL_OCC_TRUST",
    "pageTitle": "JUMO Trust Engine & Anti-Tamper Engine",
    "navLabel": "JUMO Trust",
    "icon": "LayoutGrid",
    "route": "/products/control/mod-occ-trust",
    "breadcrumbs": [
      "Enterprise",
      "JUMO-CONTROL",
      "JUMO Trust Engine & Anti-Tamper Engine"
    ],
    "layout": "STANDARD_DASHBOARD_GRID",
    "sections": [
      {
        "id": "SEC_KPI",
        "title": "Executive KPI Metrics",
        "type": "KPI_ROW"
      },
      {
        "id": "SEC_DATA",
        "title": "Operational Records Ledger",
        "type": "GRID_TABLE"
      },
      {
        "id": "SEC_ACTIONS",
        "title": "Action Dispatcher & Approvals",
        "type": "ACTION_BAR"
      }
    ],
    "cards": [
      {
        "id": "CARD_1",
        "title": "Active Work Items",
        "value": "28",
        "status": "NORMAL"
      },
      {
        "id": "CARD_2",
        "title": "Sovereign Audit Parity",
        "value": "100%",
        "status": "VERIFIED"
      }
    ],
    "forms": [
      "FORM_MOD_OCC_TRUST_ENTRY"
    ],
    "tables": [
      "TABLE_MOD_OCC_TRUST_GRID"
    ],
    "dashboards": [
      "DASH_MOD_OCC_TRUST_EXECUTIVE"
    ],
    "reports": [
      "REP_MOD_OCC_TRUST_SUMMARY"
    ],
    "workflows": [
      "WF_RING0VERIFICATIONWORKFLOW",
      "WF_TENANTPROVISIONINGWORKFLOW"
    ],
    "aiCapabilities": [
      "AI_RUNTIMERELIABILITYAGENT",
      "AI_SOVEREIGNVERIFICATIONAGENT"
    ],
    "permissions": [
      "ROLE_SOVEREIGN_OWNER"
    ],
    "runtimeComponentId": "RTC_CAP_OCC_TRUST",
    "mobileParity": {
      "hasMobileView": true,
      "mobileComponentId": "M_RTC_CAP_OCC_TRUST",
      "mobileRoute": "/products/control/mod-occ-trust/mobile"
    }
  },
  {
    "uiMetadataId": "UIM_CAP_OCC_FACTORY",
    "capabilityId": "CAP_OCC_FACTORY",
    "productId": "JUMO-CONTROL",
    "moduleId": "MOD_OCC_FACTORY",
    "portalId": "PORTAL_OCC_FACTORY",
    "pageTitle": "ERP Template & Scaffolding Factory Engine",
    "navLabel": "ERP Template",
    "icon": "LayoutGrid",
    "route": "/products/control/mod-occ-factory",
    "breadcrumbs": [
      "Enterprise",
      "JUMO-CONTROL",
      "ERP Template & Scaffolding Factory Engine"
    ],
    "layout": "STANDARD_DASHBOARD_GRID",
    "sections": [
      {
        "id": "SEC_KPI",
        "title": "Executive KPI Metrics",
        "type": "KPI_ROW"
      },
      {
        "id": "SEC_DATA",
        "title": "Operational Records Ledger",
        "type": "GRID_TABLE"
      },
      {
        "id": "SEC_ACTIONS",
        "title": "Action Dispatcher & Approvals",
        "type": "ACTION_BAR"
      }
    ],
    "cards": [
      {
        "id": "CARD_1",
        "title": "Active Work Items",
        "value": "28",
        "status": "NORMAL"
      },
      {
        "id": "CARD_2",
        "title": "Sovereign Audit Parity",
        "value": "100%",
        "status": "VERIFIED"
      }
    ],
    "forms": [
      "FORM_MOD_OCC_FACTORY_ENTRY"
    ],
    "tables": [
      "TABLE_MOD_OCC_FACTORY_GRID"
    ],
    "dashboards": [
      "DASH_MOD_OCC_FACTORY_EXECUTIVE"
    ],
    "reports": [
      "REP_MOD_OCC_FACTORY_SUMMARY"
    ],
    "workflows": [
      "WF_RING0VERIFICATIONWORKFLOW",
      "WF_TENANTPROVISIONINGWORKFLOW"
    ],
    "aiCapabilities": [
      "AI_RUNTIMERELIABILITYAGENT",
      "AI_SOVEREIGNVERIFICATIONAGENT"
    ],
    "permissions": [
      "ROLE_SOVEREIGN_OWNER"
    ],
    "runtimeComponentId": "RTC_CAP_OCC_FACTORY",
    "mobileParity": {
      "hasMobileView": true,
      "mobileComponentId": "M_RTC_CAP_OCC_FACTORY",
      "mobileRoute": "/products/control/mod-occ-factory/mobile"
    }
  },
  {
    "uiMetadataId": "UIM_CAP_OCC_SHELL",
    "capabilityId": "CAP_OCC_SHELL",
    "productId": "JUMO-CONTROL",
    "moduleId": "MOD_OCC_SHELL",
    "portalId": "PORTAL_OCC_CORE",
    "pageTitle": "Universal Sovereign Platform Host Engine",
    "navLabel": "Universal Sovereign",
    "icon": "LayoutGrid",
    "route": "/products/control/mod-occ-shell",
    "breadcrumbs": [
      "Enterprise",
      "JUMO-CONTROL",
      "Universal Sovereign Platform Host Engine"
    ],
    "layout": "STANDARD_DASHBOARD_GRID",
    "sections": [
      {
        "id": "SEC_KPI",
        "title": "Executive KPI Metrics",
        "type": "KPI_ROW"
      },
      {
        "id": "SEC_DATA",
        "title": "Operational Records Ledger",
        "type": "GRID_TABLE"
      },
      {
        "id": "SEC_ACTIONS",
        "title": "Action Dispatcher & Approvals",
        "type": "ACTION_BAR"
      }
    ],
    "cards": [
      {
        "id": "CARD_1",
        "title": "Active Work Items",
        "value": "28",
        "status": "NORMAL"
      },
      {
        "id": "CARD_2",
        "title": "Sovereign Audit Parity",
        "value": "100%",
        "status": "VERIFIED"
      }
    ],
    "forms": [
      "FORM_MOD_OCC_SHELL_ENTRY"
    ],
    "tables": [
      "TABLE_MOD_OCC_SHELL_GRID"
    ],
    "dashboards": [
      "DASH_MOD_OCC_SHELL_EXECUTIVE"
    ],
    "reports": [
      "REP_MOD_OCC_SHELL_SUMMARY"
    ],
    "workflows": [
      "WF_RING0VERIFICATIONWORKFLOW",
      "WF_TENANTPROVISIONINGWORKFLOW"
    ],
    "aiCapabilities": [
      "AI_RUNTIMERELIABILITYAGENT",
      "AI_SOVEREIGNVERIFICATIONAGENT"
    ],
    "permissions": [
      "ROLE_SOVEREIGN_OWNER"
    ],
    "runtimeComponentId": "RTC_CAP_OCC_SHELL",
    "mobileParity": {
      "hasMobileView": true,
      "mobileComponentId": "M_RTC_CAP_OCC_SHELL",
      "mobileRoute": "/products/control/mod-occ-shell/mobile"
    }
  }
];

export const UniversalUIMetadataRegistry: RegistryCollection<AuthoritativeUIMetadata> = createRegistryCollection(
  RAW_UI_METADATA,
  "UNIVERSAL_UI_METADATA_REGISTRY"
);

export function getUIMetadataByCapability(capabilityId: string): AuthoritativeUIMetadata | undefined {
  return safeFind(UniversalUIMetadataRegistry, u => u.capabilityId === capabilityId);
}

export function getUIMetadataByModule(moduleId: string): AuthoritativeUIMetadata[] {
  return safeFilter(UniversalUIMetadataRegistry, u => u.moduleId === moduleId);
}

export function getUIMetadataByProduct(productId: string): AuthoritativeUIMetadata[] {
  const upper = (productId || '').toUpperCase();
  return safeFilter(UniversalUIMetadataRegistry, u =>
    u.productId.toUpperCase() === upper ||
    (upper.includes('NURSERY') && u.productId.includes('NURSERY')) ||
    (upper.includes('FINTECH') && u.productId.includes('FINTECH')) ||
    (upper.includes('SECONDARY') && u.productId.includes('SECONDARY')) ||
    (upper.includes('ALUMNI') && u.productId.includes('ALUMNI')) ||
    (upper.includes('CHURCH') && u.productId.includes('CHURCH')) ||
    (upper.includes('CONTROL') && u.productId.includes('CONTROL'))
  );
}
