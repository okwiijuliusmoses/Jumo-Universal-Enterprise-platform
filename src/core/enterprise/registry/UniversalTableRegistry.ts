import { createRegistryCollection, RegistryCollection, safeFind, safeFilter } from './UniversalRegistryContract';
export const UniversalTableRegistry = createRegistryCollection([
  {
    "tableId": "TABLE_MOD_FT_AGENT_BANKING_GRID",
    "moduleId": "MOD_FT_AGENT_BANKING",
    "productId": "JUMO-FINTECH",
    "title": "Agent Banking Grid View",
    "columns": [
      {
        "key": "id",
        "label": "ID",
        "sortable": true
      },
      {
        "key": "referenceNumber",
        "label": "Reference",
        "sortable": true
      },
      {
        "key": "entityName",
        "label": "Name",
        "sortable": true
      },
      {
        "key": "category",
        "label": "Category",
        "sortable": true
      },
      {
        "key": "status",
        "label": "Status",
        "sortable": true
      },
      {
        "key": "createdAt",
        "label": "Created At",
        "sortable": true
      }
    ]
  },
  {
    "tableId": "TABLE_MOD_FT_AGRICULTURAL_FINANCE_GRID",
    "moduleId": "MOD_FT_AGRICULTURAL_FINANCE",
    "productId": "JUMO-FINTECH",
    "title": "Agricultural Finance Grid View",
    "columns": [
      {
        "key": "id",
        "label": "ID",
        "sortable": true
      },
      {
        "key": "referenceNumber",
        "label": "Reference",
        "sortable": true
      },
      {
        "key": "entityName",
        "label": "Name",
        "sortable": true
      },
      {
        "key": "category",
        "label": "Category",
        "sortable": true
      },
      {
        "key": "status",
        "label": "Status",
        "sortable": true
      },
      {
        "key": "createdAt",
        "label": "Created At",
        "sortable": true
      }
    ]
  },
  {
    "tableId": "TABLE_MOD_FT_ATM_SELF_SERVICE_GRID",
    "moduleId": "MOD_FT_ATM_SELF_SERVICE",
    "productId": "JUMO-FINTECH",
    "title": "Atm Self Service Grid View",
    "columns": [
      {
        "key": "id",
        "label": "ID",
        "sortable": true
      },
      {
        "key": "referenceNumber",
        "label": "Reference",
        "sortable": true
      },
      {
        "key": "entityName",
        "label": "Name",
        "sortable": true
      },
      {
        "key": "category",
        "label": "Category",
        "sortable": true
      },
      {
        "key": "status",
        "label": "Status",
        "sortable": true
      },
      {
        "key": "createdAt",
        "label": "Created At",
        "sortable": true
      }
    ]
  },
  {
    "tableId": "TABLE_MOD_FT_BANK_PAYMENTS_GRID",
    "moduleId": "MOD_FT_BANK_PAYMENTS",
    "productId": "JUMO-FINTECH",
    "title": "Bank Payments Grid View",
    "columns": [
      {
        "key": "id",
        "label": "ID",
        "sortable": true
      },
      {
        "key": "referenceNumber",
        "label": "Reference",
        "sortable": true
      },
      {
        "key": "entityName",
        "label": "Name",
        "sortable": true
      },
      {
        "key": "category",
        "label": "Category",
        "sortable": true
      },
      {
        "key": "status",
        "label": "Status",
        "sortable": true
      },
      {
        "key": "createdAt",
        "label": "Created At",
        "sortable": true
      }
    ]
  },
  {
    "tableId": "TABLE_MOD_FT_BILL_PAYMENTS_GRID",
    "moduleId": "MOD_FT_BILL_PAYMENTS",
    "productId": "JUMO-FINTECH",
    "title": "Bill Payments Grid View",
    "columns": [
      {
        "key": "id",
        "label": "ID",
        "sortable": true
      },
      {
        "key": "referenceNumber",
        "label": "Reference",
        "sortable": true
      },
      {
        "key": "entityName",
        "label": "Name",
        "sortable": true
      },
      {
        "key": "category",
        "label": "Category",
        "sortable": true
      },
      {
        "key": "status",
        "label": "Status",
        "sortable": true
      },
      {
        "key": "createdAt",
        "label": "Created At",
        "sortable": true
      }
    ]
  },
  {
    "tableId": "TABLE_MOD_FT_CAPITAL_MARKETS_GRID",
    "moduleId": "MOD_FT_CAPITAL_MARKETS",
    "productId": "JUMO-FINTECH",
    "title": "Capital Markets Grid View",
    "columns": [
      {
        "key": "id",
        "label": "ID",
        "sortable": true
      },
      {
        "key": "referenceNumber",
        "label": "Reference",
        "sortable": true
      },
      {
        "key": "entityName",
        "label": "Name",
        "sortable": true
      },
      {
        "key": "category",
        "label": "Category",
        "sortable": true
      },
      {
        "key": "status",
        "label": "Status",
        "sortable": true
      },
      {
        "key": "createdAt",
        "label": "Created At",
        "sortable": true
      }
    ]
  },
  {
    "tableId": "TABLE_MOD_FT_CARDS_GRID",
    "moduleId": "MOD_FT_CARDS",
    "productId": "JUMO-FINTECH",
    "title": "Cards Grid View",
    "columns": [
      {
        "key": "id",
        "label": "ID",
        "sortable": true
      },
      {
        "key": "referenceNumber",
        "label": "Reference",
        "sortable": true
      },
      {
        "key": "entityName",
        "label": "Name",
        "sortable": true
      },
      {
        "key": "category",
        "label": "Category",
        "sortable": true
      },
      {
        "key": "status",
        "label": "Status",
        "sortable": true
      },
      {
        "key": "createdAt",
        "label": "Created At",
        "sortable": true
      }
    ]
  },
  {
    "tableId": "TABLE_MOD_FT_COLLECTIONS_GRID",
    "moduleId": "MOD_FT_COLLECTIONS",
    "productId": "JUMO-FINTECH",
    "title": "Collections Grid View",
    "columns": [
      {
        "key": "id",
        "label": "ID",
        "sortable": true
      },
      {
        "key": "referenceNumber",
        "label": "Reference",
        "sortable": true
      },
      {
        "key": "entityName",
        "label": "Name",
        "sortable": true
      },
      {
        "key": "category",
        "label": "Category",
        "sortable": true
      },
      {
        "key": "status",
        "label": "Status",
        "sortable": true
      },
      {
        "key": "createdAt",
        "label": "Created At",
        "sortable": true
      }
    ]
  },
  {
    "tableId": "TABLE_MOD_FT_COMPLIANCE_GRID",
    "moduleId": "MOD_FT_COMPLIANCE",
    "productId": "JUMO-FINTECH",
    "title": "Compliance Grid View",
    "columns": [
      {
        "key": "id",
        "label": "ID",
        "sortable": true
      },
      {
        "key": "referenceNumber",
        "label": "Reference",
        "sortable": true
      },
      {
        "key": "entityName",
        "label": "Name",
        "sortable": true
      },
      {
        "key": "category",
        "label": "Category",
        "sortable": true
      },
      {
        "key": "status",
        "label": "Status",
        "sortable": true
      },
      {
        "key": "createdAt",
        "label": "Created At",
        "sortable": true
      }
    ]
  },
  {
    "tableId": "TABLE_MOD_FT_CROSS_BORDER_GRID",
    "moduleId": "MOD_FT_CROSS_BORDER",
    "productId": "JUMO-FINTECH",
    "title": "Cross Border Grid View",
    "columns": [
      {
        "key": "id",
        "label": "ID",
        "sortable": true
      },
      {
        "key": "referenceNumber",
        "label": "Reference",
        "sortable": true
      },
      {
        "key": "entityName",
        "label": "Name",
        "sortable": true
      },
      {
        "key": "category",
        "label": "Category",
        "sortable": true
      },
      {
        "key": "status",
        "label": "Status",
        "sortable": true
      },
      {
        "key": "createdAt",
        "label": "Created At",
        "sortable": true
      }
    ]
  },
  {
    "tableId": "TABLE_MOD_FT_DATA_INTELLIGENCE_GRID",
    "moduleId": "MOD_FT_DATA_INTELLIGENCE",
    "productId": "JUMO-FINTECH",
    "title": "Data Intelligence Grid View",
    "columns": [
      {
        "key": "id",
        "label": "ID",
        "sortable": true
      },
      {
        "key": "referenceNumber",
        "label": "Reference",
        "sortable": true
      },
      {
        "key": "entityName",
        "label": "Name",
        "sortable": true
      },
      {
        "key": "category",
        "label": "Category",
        "sortable": true
      },
      {
        "key": "status",
        "label": "Status",
        "sortable": true
      },
      {
        "key": "createdAt",
        "label": "Created At",
        "sortable": true
      }
    ]
  },
  {
    "tableId": "TABLE_MOD_FT_DEVELOPER_API_GRID",
    "moduleId": "MOD_FT_DEVELOPER_API",
    "productId": "JUMO-FINTECH",
    "title": "Developer Api Grid View",
    "columns": [
      {
        "key": "id",
        "label": "ID",
        "sortable": true
      },
      {
        "key": "referenceNumber",
        "label": "Reference",
        "sortable": true
      },
      {
        "key": "entityName",
        "label": "Name",
        "sortable": true
      },
      {
        "key": "category",
        "label": "Category",
        "sortable": true
      },
      {
        "key": "status",
        "label": "Status",
        "sortable": true
      },
      {
        "key": "createdAt",
        "label": "Created At",
        "sortable": true
      }
    ]
  },
  {
    "tableId": "TABLE_MOD_FT_DIGITAL_BANKING_GRID",
    "moduleId": "MOD_FT_DIGITAL_BANKING",
    "productId": "JUMO-FINTECH",
    "title": "Digital Banking Grid View",
    "columns": [
      {
        "key": "id",
        "label": "ID",
        "sortable": true
      },
      {
        "key": "referenceNumber",
        "label": "Reference",
        "sortable": true
      },
      {
        "key": "entityName",
        "label": "Name",
        "sortable": true
      },
      {
        "key": "category",
        "label": "Category",
        "sortable": true
      },
      {
        "key": "status",
        "label": "Status",
        "sortable": true
      },
      {
        "key": "createdAt",
        "label": "Created At",
        "sortable": true
      }
    ]
  },
  {
    "tableId": "TABLE_MOD_FT_DIGITAL_WALLETS_GRID",
    "moduleId": "MOD_FT_DIGITAL_WALLETS",
    "productId": "JUMO-FINTECH",
    "title": "Digital Wallets Grid View",
    "columns": [
      {
        "key": "id",
        "label": "ID",
        "sortable": true
      },
      {
        "key": "referenceNumber",
        "label": "Reference",
        "sortable": true
      },
      {
        "key": "entityName",
        "label": "Name",
        "sortable": true
      },
      {
        "key": "category",
        "label": "Category",
        "sortable": true
      },
      {
        "key": "status",
        "label": "Status",
        "sortable": true
      },
      {
        "key": "createdAt",
        "label": "Created At",
        "sortable": true
      }
    ]
  },
  {
    "tableId": "TABLE_MOD_FT_EMBEDDED_FINANCE_GRID",
    "moduleId": "MOD_FT_EMBEDDED_FINANCE",
    "productId": "JUMO-FINTECH",
    "title": "Embedded Finance Grid View",
    "columns": [
      {
        "key": "id",
        "label": "ID",
        "sortable": true
      },
      {
        "key": "referenceNumber",
        "label": "Reference",
        "sortable": true
      },
      {
        "key": "entityName",
        "label": "Name",
        "sortable": true
      },
      {
        "key": "category",
        "label": "Category",
        "sortable": true
      },
      {
        "key": "status",
        "label": "Status",
        "sortable": true
      },
      {
        "key": "createdAt",
        "label": "Created At",
        "sortable": true
      }
    ]
  },
  {
    "tableId": "TABLE_MOD_FT_FINANCIAL_ACCOUNTING_GRID",
    "moduleId": "MOD_FT_FINANCIAL_ACCOUNTING",
    "productId": "JUMO-FINTECH",
    "title": "Financial Accounting Grid View",
    "columns": [
      {
        "key": "id",
        "label": "ID",
        "sortable": true
      },
      {
        "key": "referenceNumber",
        "label": "Reference",
        "sortable": true
      },
      {
        "key": "entityName",
        "label": "Name",
        "sortable": true
      },
      {
        "key": "category",
        "label": "Category",
        "sortable": true
      },
      {
        "key": "status",
        "label": "Status",
        "sortable": true
      },
      {
        "key": "createdAt",
        "label": "Created At",
        "sortable": true
      }
    ]
  },
  {
    "tableId": "TABLE_MOD_FT_FX_GRID",
    "moduleId": "MOD_FT_FX",
    "productId": "JUMO-FINTECH",
    "title": "Fx Grid View",
    "columns": [
      {
        "key": "id",
        "label": "ID",
        "sortable": true
      },
      {
        "key": "referenceNumber",
        "label": "Reference",
        "sortable": true
      },
      {
        "key": "entityName",
        "label": "Name",
        "sortable": true
      },
      {
        "key": "category",
        "label": "Category",
        "sortable": true
      },
      {
        "key": "status",
        "label": "Status",
        "sortable": true
      },
      {
        "key": "createdAt",
        "label": "Created At",
        "sortable": true
      }
    ]
  },
  {
    "tableId": "TABLE_MOD_FT_GLOBAL_ACCOUNTS_GRID",
    "moduleId": "MOD_FT_GLOBAL_ACCOUNTS",
    "productId": "JUMO-FINTECH",
    "title": "Global Accounts Grid View",
    "columns": [
      {
        "key": "id",
        "label": "ID",
        "sortable": true
      },
      {
        "key": "referenceNumber",
        "label": "Reference",
        "sortable": true
      },
      {
        "key": "entityName",
        "label": "Name",
        "sortable": true
      },
      {
        "key": "category",
        "label": "Category",
        "sortable": true
      },
      {
        "key": "status",
        "label": "Status",
        "sortable": true
      },
      {
        "key": "createdAt",
        "label": "Created At",
        "sortable": true
      }
    ]
  },
  {
    "tableId": "TABLE_MOD_FT_INSURANCE_GRID",
    "moduleId": "MOD_FT_INSURANCE",
    "productId": "JUMO-FINTECH",
    "title": "Insurance Grid View",
    "columns": [
      {
        "key": "id",
        "label": "ID",
        "sortable": true
      },
      {
        "key": "referenceNumber",
        "label": "Reference",
        "sortable": true
      },
      {
        "key": "entityName",
        "label": "Name",
        "sortable": true
      },
      {
        "key": "category",
        "label": "Category",
        "sortable": true
      },
      {
        "key": "status",
        "label": "Status",
        "sortable": true
      },
      {
        "key": "createdAt",
        "label": "Created At",
        "sortable": true
      }
    ]
  },
  {
    "tableId": "TABLE_MOD_FT_INVESTMENT_GRID",
    "moduleId": "MOD_FT_INVESTMENT",
    "productId": "JUMO-FINTECH",
    "title": "Investment Grid View",
    "columns": [
      {
        "key": "id",
        "label": "ID",
        "sortable": true
      },
      {
        "key": "referenceNumber",
        "label": "Reference",
        "sortable": true
      },
      {
        "key": "entityName",
        "label": "Name",
        "sortable": true
      },
      {
        "key": "category",
        "label": "Category",
        "sortable": true
      },
      {
        "key": "status",
        "label": "Status",
        "sortable": true
      },
      {
        "key": "createdAt",
        "label": "Created At",
        "sortable": true
      }
    ]
  },
  {
    "tableId": "TABLE_MOD_FT_LENDING_GRID",
    "moduleId": "MOD_FT_LENDING",
    "productId": "JUMO-FINTECH",
    "title": "Lending Grid View",
    "columns": [
      {
        "key": "id",
        "label": "ID",
        "sortable": true
      },
      {
        "key": "referenceNumber",
        "label": "Reference",
        "sortable": true
      },
      {
        "key": "entityName",
        "label": "Name",
        "sortable": true
      },
      {
        "key": "category",
        "label": "Category",
        "sortable": true
      },
      {
        "key": "status",
        "label": "Status",
        "sortable": true
      },
      {
        "key": "createdAt",
        "label": "Created At",
        "sortable": true
      }
    ]
  },
  {
    "tableId": "TABLE_MOD_FT_MERCHANT_ACQUIRING_GRID",
    "moduleId": "MOD_FT_MERCHANT_ACQUIRING",
    "productId": "JUMO-FINTECH",
    "title": "Merchant Acquiring Grid View",
    "columns": [
      {
        "key": "id",
        "label": "ID",
        "sortable": true
      },
      {
        "key": "referenceNumber",
        "label": "Reference",
        "sortable": true
      },
      {
        "key": "entityName",
        "label": "Name",
        "sortable": true
      },
      {
        "key": "category",
        "label": "Category",
        "sortable": true
      },
      {
        "key": "status",
        "label": "Status",
        "sortable": true
      },
      {
        "key": "createdAt",
        "label": "Created At",
        "sortable": true
      }
    ]
  },
  {
    "tableId": "TABLE_MOD_FT_MERCHANT_SERVICES_GRID",
    "moduleId": "MOD_FT_MERCHANT_SERVICES",
    "productId": "JUMO-FINTECH",
    "title": "Merchant Services Grid View",
    "columns": [
      {
        "key": "id",
        "label": "ID",
        "sortable": true
      },
      {
        "key": "referenceNumber",
        "label": "Reference",
        "sortable": true
      },
      {
        "key": "entityName",
        "label": "Name",
        "sortable": true
      },
      {
        "key": "category",
        "label": "Category",
        "sortable": true
      },
      {
        "key": "status",
        "label": "Status",
        "sortable": true
      },
      {
        "key": "createdAt",
        "label": "Created At",
        "sortable": true
      }
    ]
  },
  {
    "tableId": "TABLE_MOD_FT_MICROFINANCE_GRID",
    "moduleId": "MOD_FT_MICROFINANCE",
    "productId": "JUMO-FINTECH",
    "title": "Microfinance Grid View",
    "columns": [
      {
        "key": "id",
        "label": "ID",
        "sortable": true
      },
      {
        "key": "referenceNumber",
        "label": "Reference",
        "sortable": true
      },
      {
        "key": "entityName",
        "label": "Name",
        "sortable": true
      },
      {
        "key": "category",
        "label": "Category",
        "sortable": true
      },
      {
        "key": "status",
        "label": "Status",
        "sortable": true
      },
      {
        "key": "createdAt",
        "label": "Created At",
        "sortable": true
      }
    ]
  },
  {
    "tableId": "TABLE_MOD_FT_MOBILE_MONEY_GRID",
    "moduleId": "MOD_FT_MOBILE_MONEY",
    "productId": "JUMO-FINTECH",
    "title": "Mobile Money Grid View",
    "columns": [
      {
        "key": "id",
        "label": "ID",
        "sortable": true
      },
      {
        "key": "referenceNumber",
        "label": "Reference",
        "sortable": true
      },
      {
        "key": "entityName",
        "label": "Name",
        "sortable": true
      },
      {
        "key": "category",
        "label": "Category",
        "sortable": true
      },
      {
        "key": "status",
        "label": "Status",
        "sortable": true
      },
      {
        "key": "createdAt",
        "label": "Created At",
        "sortable": true
      }
    ]
  },
  {
    "tableId": "TABLE_MOD_FT_MULTI_CURRENCY_GRID",
    "moduleId": "MOD_FT_MULTI_CURRENCY",
    "productId": "JUMO-FINTECH",
    "title": "Multi Currency Grid View",
    "columns": [
      {
        "key": "id",
        "label": "ID",
        "sortable": true
      },
      {
        "key": "referenceNumber",
        "label": "Reference",
        "sortable": true
      },
      {
        "key": "entityName",
        "label": "Name",
        "sortable": true
      },
      {
        "key": "category",
        "label": "Category",
        "sortable": true
      },
      {
        "key": "status",
        "label": "Status",
        "sortable": true
      },
      {
        "key": "createdAt",
        "label": "Created At",
        "sortable": true
      }
    ]
  },
  {
    "tableId": "TABLE_MOD_FT_PAYMENT_GATEWAY_GRID",
    "moduleId": "MOD_FT_PAYMENT_GATEWAY",
    "productId": "JUMO-FINTECH",
    "title": "Payment Gateway Grid View",
    "columns": [
      {
        "key": "id",
        "label": "ID",
        "sortable": true
      },
      {
        "key": "referenceNumber",
        "label": "Reference",
        "sortable": true
      },
      {
        "key": "entityName",
        "label": "Name",
        "sortable": true
      },
      {
        "key": "category",
        "label": "Category",
        "sortable": true
      },
      {
        "key": "status",
        "label": "Status",
        "sortable": true
      },
      {
        "key": "createdAt",
        "label": "Created At",
        "sortable": true
      }
    ]
  },
  {
    "tableId": "TABLE_MOD_FT_PAYMENT_SWITCHING_GRID",
    "moduleId": "MOD_FT_PAYMENT_SWITCHING",
    "productId": "JUMO-FINTECH",
    "title": "Payment Switching Grid View",
    "columns": [
      {
        "key": "id",
        "label": "ID",
        "sortable": true
      },
      {
        "key": "referenceNumber",
        "label": "Reference",
        "sortable": true
      },
      {
        "key": "entityName",
        "label": "Name",
        "sortable": true
      },
      {
        "key": "category",
        "label": "Category",
        "sortable": true
      },
      {
        "key": "status",
        "label": "Status",
        "sortable": true
      },
      {
        "key": "createdAt",
        "label": "Created At",
        "sortable": true
      }
    ]
  },
  {
    "tableId": "TABLE_MOD_FT_PAYOUTS_GRID",
    "moduleId": "MOD_FT_PAYOUTS",
    "productId": "JUMO-FINTECH",
    "title": "Payouts Grid View",
    "columns": [
      {
        "key": "id",
        "label": "ID",
        "sortable": true
      },
      {
        "key": "referenceNumber",
        "label": "Reference",
        "sortable": true
      },
      {
        "key": "entityName",
        "label": "Name",
        "sortable": true
      },
      {
        "key": "category",
        "label": "Category",
        "sortable": true
      },
      {
        "key": "status",
        "label": "Status",
        "sortable": true
      },
      {
        "key": "createdAt",
        "label": "Created At",
        "sortable": true
      }
    ]
  },
  {
    "tableId": "TABLE_MOD_FT_PAYROLL_GRID",
    "moduleId": "MOD_FT_PAYROLL",
    "productId": "JUMO-FINTECH",
    "title": "Payroll Grid View",
    "columns": [
      {
        "key": "id",
        "label": "ID",
        "sortable": true
      },
      {
        "key": "referenceNumber",
        "label": "Reference",
        "sortable": true
      },
      {
        "key": "entityName",
        "label": "Name",
        "sortable": true
      },
      {
        "key": "category",
        "label": "Category",
        "sortable": true
      },
      {
        "key": "status",
        "label": "Status",
        "sortable": true
      },
      {
        "key": "createdAt",
        "label": "Created At",
        "sortable": true
      }
    ]
  },
  {
    "tableId": "TABLE_MOD_FT_REMITTANCES_GRID",
    "moduleId": "MOD_FT_REMITTANCES",
    "productId": "JUMO-FINTECH",
    "title": "Remittances Grid View",
    "columns": [
      {
        "key": "id",
        "label": "ID",
        "sortable": true
      },
      {
        "key": "referenceNumber",
        "label": "Reference",
        "sortable": true
      },
      {
        "key": "entityName",
        "label": "Name",
        "sortable": true
      },
      {
        "key": "category",
        "label": "Category",
        "sortable": true
      },
      {
        "key": "status",
        "label": "Status",
        "sortable": true
      },
      {
        "key": "createdAt",
        "label": "Created At",
        "sortable": true
      }
    ]
  },
  {
    "tableId": "TABLE_MOD_FT_SACCO_GRID",
    "moduleId": "MOD_FT_SACCO",
    "productId": "JUMO-FINTECH",
    "title": "Sacco Grid View",
    "columns": [
      {
        "key": "id",
        "label": "ID",
        "sortable": true
      },
      {
        "key": "referenceNumber",
        "label": "Reference",
        "sortable": true
      },
      {
        "key": "entityName",
        "label": "Name",
        "sortable": true
      },
      {
        "key": "category",
        "label": "Category",
        "sortable": true
      },
      {
        "key": "status",
        "label": "Status",
        "sortable": true
      },
      {
        "key": "createdAt",
        "label": "Created At",
        "sortable": true
      }
    ]
  },
  {
    "tableId": "TABLE_MOD_FT_SAVINGS_GRID",
    "moduleId": "MOD_FT_SAVINGS",
    "productId": "JUMO-FINTECH",
    "title": "Savings Grid View",
    "columns": [
      {
        "key": "id",
        "label": "ID",
        "sortable": true
      },
      {
        "key": "referenceNumber",
        "label": "Reference",
        "sortable": true
      },
      {
        "key": "entityName",
        "label": "Name",
        "sortable": true
      },
      {
        "key": "category",
        "label": "Category",
        "sortable": true
      },
      {
        "key": "status",
        "label": "Status",
        "sortable": true
      },
      {
        "key": "createdAt",
        "label": "Created At",
        "sortable": true
      }
    ]
  },
  {
    "tableId": "TABLE_MOD_FT_SECURITIES_CUSTODY_GRID",
    "moduleId": "MOD_FT_SECURITIES_CUSTODY",
    "productId": "JUMO-FINTECH",
    "title": "Securities Custody Grid View",
    "columns": [
      {
        "key": "id",
        "label": "ID",
        "sortable": true
      },
      {
        "key": "referenceNumber",
        "label": "Reference",
        "sortable": true
      },
      {
        "key": "entityName",
        "label": "Name",
        "sortable": true
      },
      {
        "key": "category",
        "label": "Category",
        "sortable": true
      },
      {
        "key": "status",
        "label": "Status",
        "sortable": true
      },
      {
        "key": "createdAt",
        "label": "Created At",
        "sortable": true
      }
    ]
  },
  {
    "tableId": "TABLE_MOD_FT_STABLECOIN_GRID",
    "moduleId": "MOD_FT_STABLECOIN",
    "productId": "JUMO-FINTECH",
    "title": "Stablecoin Grid View",
    "columns": [
      {
        "key": "id",
        "label": "ID",
        "sortable": true
      },
      {
        "key": "referenceNumber",
        "label": "Reference",
        "sortable": true
      },
      {
        "key": "entityName",
        "label": "Name",
        "sortable": true
      },
      {
        "key": "category",
        "label": "Category",
        "sortable": true
      },
      {
        "key": "status",
        "label": "Status",
        "sortable": true
      },
      {
        "key": "createdAt",
        "label": "Created At",
        "sortable": true
      }
    ]
  },
  {
    "tableId": "TABLE_MOD_FT_TAX_REVENUE_GRID",
    "moduleId": "MOD_FT_TAX_REVENUE",
    "productId": "JUMO-FINTECH",
    "title": "Tax Revenue Grid View",
    "columns": [
      {
        "key": "id",
        "label": "ID",
        "sortable": true
      },
      {
        "key": "referenceNumber",
        "label": "Reference",
        "sortable": true
      },
      {
        "key": "entityName",
        "label": "Name",
        "sortable": true
      },
      {
        "key": "category",
        "label": "Category",
        "sortable": true
      },
      {
        "key": "status",
        "label": "Status",
        "sortable": true
      },
      {
        "key": "createdAt",
        "label": "Created At",
        "sortable": true
      }
    ]
  },
  {
    "tableId": "TABLE_MOD_FT_TRADE_FINANCE_GRID",
    "moduleId": "MOD_FT_TRADE_FINANCE",
    "productId": "JUMO-FINTECH",
    "title": "Trade Finance Grid View",
    "columns": [
      {
        "key": "id",
        "label": "ID",
        "sortable": true
      },
      {
        "key": "referenceNumber",
        "label": "Reference",
        "sortable": true
      },
      {
        "key": "entityName",
        "label": "Name",
        "sortable": true
      },
      {
        "key": "category",
        "label": "Category",
        "sortable": true
      },
      {
        "key": "status",
        "label": "Status",
        "sortable": true
      },
      {
        "key": "createdAt",
        "label": "Created At",
        "sortable": true
      }
    ]
  },
  {
    "tableId": "TABLE_MOD_FT_TREASURY_GRID",
    "moduleId": "MOD_FT_TREASURY",
    "productId": "JUMO-FINTECH",
    "title": "Treasury Grid View",
    "columns": [
      {
        "key": "id",
        "label": "ID",
        "sortable": true
      },
      {
        "key": "referenceNumber",
        "label": "Reference",
        "sortable": true
      },
      {
        "key": "entityName",
        "label": "Name",
        "sortable": true
      },
      {
        "key": "category",
        "label": "Category",
        "sortable": true
      },
      {
        "key": "status",
        "label": "Status",
        "sortable": true
      },
      {
        "key": "createdAt",
        "label": "Created At",
        "sortable": true
      }
    ]
  },
  {
    "tableId": "TABLE_MOD_NP_ECD_MILESTONES_GRID",
    "moduleId": "MOD_NP_ECD_MILESTONES",
    "productId": "JUMO-NURSERY-PRIMARY-ERP",
    "title": "Early Childhood Development & Milestones Grid View",
    "columns": [
      {
        "key": "id",
        "label": "ID",
        "sortable": true
      },
      {
        "key": "referenceNumber",
        "label": "Reference",
        "sortable": true
      },
      {
        "key": "entityName",
        "label": "Name",
        "sortable": true
      },
      {
        "key": "category",
        "label": "Category",
        "sortable": true
      },
      {
        "key": "status",
        "label": "Status",
        "sortable": true
      },
      {
        "key": "createdAt",
        "label": "Created At",
        "sortable": true
      }
    ]
  },
  {
    "tableId": "TABLE_MOD_NP_PRIMARY_ACADEMICS_GRID",
    "moduleId": "MOD_NP_PRIMARY_ACADEMICS",
    "productId": "JUMO-NURSERY-PRIMARY-ERP",
    "title": "Primary Curriculum & Assessment Grid View",
    "columns": [
      {
        "key": "id",
        "label": "ID",
        "sortable": true
      },
      {
        "key": "referenceNumber",
        "label": "Reference",
        "sortable": true
      },
      {
        "key": "entityName",
        "label": "Name",
        "sortable": true
      },
      {
        "key": "category",
        "label": "Category",
        "sortable": true
      },
      {
        "key": "status",
        "label": "Status",
        "sortable": true
      },
      {
        "key": "createdAt",
        "label": "Created At",
        "sortable": true
      }
    ]
  },
  {
    "tableId": "TABLE_MOD_NP_PRIMARY_DOS_GRID",
    "moduleId": "MOD_NP_PRIMARY_DOS",
    "productId": "JUMO-NURSERY-PRIMARY-ERP",
    "title": "Primary Studies & Timetabling Grid View",
    "columns": [
      {
        "key": "id",
        "label": "ID",
        "sortable": true
      },
      {
        "key": "referenceNumber",
        "label": "Reference",
        "sortable": true
      },
      {
        "key": "entityName",
        "label": "Name",
        "sortable": true
      },
      {
        "key": "category",
        "label": "Category",
        "sortable": true
      },
      {
        "key": "status",
        "label": "Status",
        "sortable": true
      },
      {
        "key": "createdAt",
        "label": "Created At",
        "sortable": true
      }
    ]
  },
  {
    "tableId": "TABLE_MOD_NP_ADMISSIONS_GRID",
    "moduleId": "MOD_NP_ADMISSIONS",
    "productId": "JUMO-NURSERY-PRIMARY-ERP",
    "title": "Consolidated Student Admissions Grid View",
    "columns": [
      {
        "key": "id",
        "label": "ID",
        "sortable": true
      },
      {
        "key": "referenceNumber",
        "label": "Reference",
        "sortable": true
      },
      {
        "key": "entityName",
        "label": "Name",
        "sortable": true
      },
      {
        "key": "category",
        "label": "Category",
        "sortable": true
      },
      {
        "key": "status",
        "label": "Status",
        "sortable": true
      },
      {
        "key": "createdAt",
        "label": "Created At",
        "sortable": true
      }
    ]
  },
  {
    "tableId": "TABLE_MOD_NP_BURSARY_GRID",
    "moduleId": "MOD_NP_BURSARY",
    "productId": "JUMO-NURSERY-PRIMARY-ERP",
    "title": "Fee Invoicing & Bursar Ledger Grid View",
    "columns": [
      {
        "key": "id",
        "label": "ID",
        "sortable": true
      },
      {
        "key": "referenceNumber",
        "label": "Reference",
        "sortable": true
      },
      {
        "key": "entityName",
        "label": "Name",
        "sortable": true
      },
      {
        "key": "category",
        "label": "Category",
        "sortable": true
      },
      {
        "key": "status",
        "label": "Status",
        "sortable": true
      },
      {
        "key": "createdAt",
        "label": "Created At",
        "sortable": true
      }
    ]
  },
  {
    "tableId": "TABLE_MOD_NP_SAFEGUARDING_GRID",
    "moduleId": "MOD_NP_SAFEGUARDING",
    "productId": "JUMO-NURSERY-PRIMARY-ERP",
    "title": "Child Protection & Safeguarding Grid View",
    "columns": [
      {
        "key": "id",
        "label": "ID",
        "sortable": true
      },
      {
        "key": "referenceNumber",
        "label": "Reference",
        "sortable": true
      },
      {
        "key": "entityName",
        "label": "Name",
        "sortable": true
      },
      {
        "key": "category",
        "label": "Category",
        "sortable": true
      },
      {
        "key": "status",
        "label": "Status",
        "sortable": true
      },
      {
        "key": "createdAt",
        "label": "Created At",
        "sortable": true
      }
    ]
  },
  {
    "tableId": "TABLE_MOD_NP_CLINIC_GRID",
    "moduleId": "MOD_NP_CLINIC",
    "productId": "JUMO-NURSERY-PRIMARY-ERP",
    "title": "Infirmary & Pediatric Health Grid View",
    "columns": [
      {
        "key": "id",
        "label": "ID",
        "sortable": true
      },
      {
        "key": "referenceNumber",
        "label": "Reference",
        "sortable": true
      },
      {
        "key": "entityName",
        "label": "Name",
        "sortable": true
      },
      {
        "key": "category",
        "label": "Category",
        "sortable": true
      },
      {
        "key": "status",
        "label": "Status",
        "sortable": true
      },
      {
        "key": "createdAt",
        "label": "Created At",
        "sortable": true
      }
    ]
  },
  {
    "tableId": "TABLE_MOD_NP_CATERING_GRID",
    "moduleId": "MOD_NP_CATERING",
    "productId": "JUMO-NURSERY-PRIMARY-ERP",
    "title": "Nutrition & School Dining Grid View",
    "columns": [
      {
        "key": "id",
        "label": "ID",
        "sortable": true
      },
      {
        "key": "referenceNumber",
        "label": "Reference",
        "sortable": true
      },
      {
        "key": "entityName",
        "label": "Name",
        "sortable": true
      },
      {
        "key": "category",
        "label": "Category",
        "sortable": true
      },
      {
        "key": "status",
        "label": "Status",
        "sortable": true
      },
      {
        "key": "createdAt",
        "label": "Created At",
        "sortable": true
      }
    ]
  },
  {
    "tableId": "TABLE_MOD_NP_TRANSPORT_GRID",
    "moduleId": "MOD_NP_TRANSPORT",
    "productId": "JUMO-NURSERY-PRIMARY-ERP",
    "title": "Student Bus Routing & Tracking Grid View",
    "columns": [
      {
        "key": "id",
        "label": "ID",
        "sortable": true
      },
      {
        "key": "referenceNumber",
        "label": "Reference",
        "sortable": true
      },
      {
        "key": "entityName",
        "label": "Name",
        "sortable": true
      },
      {
        "key": "category",
        "label": "Category",
        "sortable": true
      },
      {
        "key": "status",
        "label": "Status",
        "sortable": true
      },
      {
        "key": "createdAt",
        "label": "Created At",
        "sortable": true
      }
    ]
  },
  {
    "tableId": "TABLE_MOD_SEC_HOD_GRID",
    "moduleId": "MOD_SEC_HOD",
    "productId": "JUMO-SECONDARY-ERP",
    "title": "Academic Departmental Heads (HOD) Grid View",
    "columns": [
      {
        "key": "id",
        "label": "ID",
        "sortable": true
      },
      {
        "key": "referenceNumber",
        "label": "Reference",
        "sortable": true
      },
      {
        "key": "entityName",
        "label": "Name",
        "sortable": true
      },
      {
        "key": "category",
        "label": "Category",
        "sortable": true
      },
      {
        "key": "status",
        "label": "Status",
        "sortable": true
      },
      {
        "key": "createdAt",
        "label": "Created At",
        "sortable": true
      }
    ]
  },
  {
    "tableId": "TABLE_MOD_SEC_REGISTRAR_GRID",
    "moduleId": "MOD_SEC_REGISTRAR",
    "productId": "JUMO-SECONDARY-ERP",
    "title": "Secondary Registry & Matriculation Grid View",
    "columns": [
      {
        "key": "id",
        "label": "ID",
        "sortable": true
      },
      {
        "key": "referenceNumber",
        "label": "Reference",
        "sortable": true
      },
      {
        "key": "entityName",
        "label": "Name",
        "sortable": true
      },
      {
        "key": "category",
        "label": "Category",
        "sortable": true
      },
      {
        "key": "status",
        "label": "Status",
        "sortable": true
      },
      {
        "key": "createdAt",
        "label": "Created At",
        "sortable": true
      }
    ]
  },
  {
    "tableId": "TABLE_MOD_SEC_BURSARY_GRID",
    "moduleId": "MOD_SEC_BURSARY",
    "productId": "JUMO-SECONDARY-ERP",
    "title": "Secondary Bursar & Tuitions Grid View",
    "columns": [
      {
        "key": "id",
        "label": "ID",
        "sortable": true
      },
      {
        "key": "referenceNumber",
        "label": "Reference",
        "sortable": true
      },
      {
        "key": "entityName",
        "label": "Name",
        "sortable": true
      },
      {
        "key": "category",
        "label": "Category",
        "sortable": true
      },
      {
        "key": "status",
        "label": "Status",
        "sortable": true
      },
      {
        "key": "createdAt",
        "label": "Created At",
        "sortable": true
      }
    ]
  },
  {
    "tableId": "TABLE_MOD_SEC_SENATE_GRID",
    "moduleId": "MOD_SEC_SENATE",
    "productId": "JUMO-SECONDARY-ERP",
    "title": "Secondary Academic Senate Grid View",
    "columns": [
      {
        "key": "id",
        "label": "ID",
        "sortable": true
      },
      {
        "key": "referenceNumber",
        "label": "Reference",
        "sortable": true
      },
      {
        "key": "entityName",
        "label": "Name",
        "sortable": true
      },
      {
        "key": "category",
        "label": "Category",
        "sortable": true
      },
      {
        "key": "status",
        "label": "Status",
        "sortable": true
      },
      {
        "key": "createdAt",
        "label": "Created At",
        "sortable": true
      }
    ]
  },
  {
    "tableId": "TABLE_MOD_SEC_SERVICE_GRID",
    "moduleId": "MOD_SEC_SERVICE",
    "productId": "JUMO-SECONDARY-ERP",
    "title": "Secondary Core Domain Service Grid View",
    "columns": [
      {
        "key": "id",
        "label": "ID",
        "sortable": true
      },
      {
        "key": "referenceNumber",
        "label": "Reference",
        "sortable": true
      },
      {
        "key": "entityName",
        "label": "Name",
        "sortable": true
      },
      {
        "key": "category",
        "label": "Category",
        "sortable": true
      },
      {
        "key": "status",
        "label": "Status",
        "sortable": true
      },
      {
        "key": "createdAt",
        "label": "Created At",
        "sortable": true
      }
    ]
  },
  {
    "tableId": "TABLE_MOD_ALUM_REGISTRY_GRID",
    "moduleId": "MOD_ALUM_REGISTRY",
    "productId": "JUMO-ALUMNI",
    "title": "Alumni Census & Graduate Registry Grid View",
    "columns": [
      {
        "key": "id",
        "label": "ID",
        "sortable": true
      },
      {
        "key": "referenceNumber",
        "label": "Reference",
        "sortable": true
      },
      {
        "key": "entityName",
        "label": "Name",
        "sortable": true
      },
      {
        "key": "category",
        "label": "Category",
        "sortable": true
      },
      {
        "key": "status",
        "label": "Status",
        "sortable": true
      },
      {
        "key": "createdAt",
        "label": "Created At",
        "sortable": true
      }
    ]
  },
  {
    "tableId": "TABLE_MOD_ALUM_GIVING_GRID",
    "moduleId": "MOD_ALUM_GIVING",
    "productId": "JUMO-ALUMNI",
    "title": "Giving Campaigns & Endowments Grid View",
    "columns": [
      {
        "key": "id",
        "label": "ID",
        "sortable": true
      },
      {
        "key": "referenceNumber",
        "label": "Reference",
        "sortable": true
      },
      {
        "key": "entityName",
        "label": "Name",
        "sortable": true
      },
      {
        "key": "category",
        "label": "Category",
        "sortable": true
      },
      {
        "key": "status",
        "label": "Status",
        "sortable": true
      },
      {
        "key": "createdAt",
        "label": "Created At",
        "sortable": true
      }
    ]
  },
  {
    "tableId": "TABLE_MOD_ALUM_CHAPTERS_GRID",
    "moduleId": "MOD_ALUM_CHAPTERS",
    "productId": "JUMO-ALUMNI",
    "title": "Global Chapters & Diaspora Network Grid View",
    "columns": [
      {
        "key": "id",
        "label": "ID",
        "sortable": true
      },
      {
        "key": "referenceNumber",
        "label": "Reference",
        "sortable": true
      },
      {
        "key": "entityName",
        "label": "Name",
        "sortable": true
      },
      {
        "key": "category",
        "label": "Category",
        "sortable": true
      },
      {
        "key": "status",
        "label": "Status",
        "sortable": true
      },
      {
        "key": "createdAt",
        "label": "Created At",
        "sortable": true
      }
    ]
  },
  {
    "tableId": "TABLE_MOD_ALUM_CAREER_GRID",
    "moduleId": "MOD_ALUM_CAREER",
    "productId": "JUMO-ALUMNI",
    "title": "Career Services & Mentorship Grid View",
    "columns": [
      {
        "key": "id",
        "label": "ID",
        "sortable": true
      },
      {
        "key": "referenceNumber",
        "label": "Reference",
        "sortable": true
      },
      {
        "key": "entityName",
        "label": "Name",
        "sortable": true
      },
      {
        "key": "category",
        "label": "Category",
        "sortable": true
      },
      {
        "key": "status",
        "label": "Status",
        "sortable": true
      },
      {
        "key": "createdAt",
        "label": "Created At",
        "sortable": true
      }
    ]
  },
  {
    "tableId": "TABLE_MOD_ALUM_DASHBOARD_GRID",
    "moduleId": "MOD_ALUM_DASHBOARD",
    "productId": "JUMO-ALUMNI",
    "title": "Alumni Intelligence Dashboard Grid View",
    "columns": [
      {
        "key": "id",
        "label": "ID",
        "sortable": true
      },
      {
        "key": "referenceNumber",
        "label": "Reference",
        "sortable": true
      },
      {
        "key": "entityName",
        "label": "Name",
        "sortable": true
      },
      {
        "key": "category",
        "label": "Category",
        "sortable": true
      },
      {
        "key": "status",
        "label": "Status",
        "sortable": true
      },
      {
        "key": "createdAt",
        "label": "Created At",
        "sortable": true
      }
    ]
  },
  {
    "tableId": "TABLE_MOD_CH_MEMBERSHIP_GRID",
    "moduleId": "MOD_CH_MEMBERSHIP",
    "productId": "JUMO-CHURCH",
    "title": "Congregation Directory & Census Grid View",
    "columns": [
      {
        "key": "id",
        "label": "ID",
        "sortable": true
      },
      {
        "key": "referenceNumber",
        "label": "Reference",
        "sortable": true
      },
      {
        "key": "entityName",
        "label": "Name",
        "sortable": true
      },
      {
        "key": "category",
        "label": "Category",
        "sortable": true
      },
      {
        "key": "status",
        "label": "Status",
        "sortable": true
      },
      {
        "key": "createdAt",
        "label": "Created At",
        "sortable": true
      }
    ]
  },
  {
    "tableId": "TABLE_MOD_CH_FINANCE_GRID",
    "moduleId": "MOD_CH_FINANCE",
    "productId": "JUMO-CHURCH",
    "title": "Tithes, Offerings & Diocesan Ledger Grid View",
    "columns": [
      {
        "key": "id",
        "label": "ID",
        "sortable": true
      },
      {
        "key": "referenceNumber",
        "label": "Reference",
        "sortable": true
      },
      {
        "key": "entityName",
        "label": "Name",
        "sortable": true
      },
      {
        "key": "category",
        "label": "Category",
        "sortable": true
      },
      {
        "key": "status",
        "label": "Status",
        "sortable": true
      },
      {
        "key": "createdAt",
        "label": "Created At",
        "sortable": true
      }
    ]
  },
  {
    "tableId": "TABLE_MOD_CH_PASTORAL_GRID",
    "moduleId": "MOD_CH_PASTORAL",
    "productId": "JUMO-CHURCH",
    "title": "Pastoral Care & Visitation Tracking Grid View",
    "columns": [
      {
        "key": "id",
        "label": "ID",
        "sortable": true
      },
      {
        "key": "referenceNumber",
        "label": "Reference",
        "sortable": true
      },
      {
        "key": "entityName",
        "label": "Name",
        "sortable": true
      },
      {
        "key": "category",
        "label": "Category",
        "sortable": true
      },
      {
        "key": "status",
        "label": "Status",
        "sortable": true
      },
      {
        "key": "createdAt",
        "label": "Created At",
        "sortable": true
      }
    ]
  },
  {
    "tableId": "TABLE_MOD_CH_EVENTS_GRID",
    "moduleId": "MOD_CH_EVENTS",
    "productId": "JUMO-CHURCH",
    "title": "Liturgical Calendar & Event Operations Grid View",
    "columns": [
      {
        "key": "id",
        "label": "ID",
        "sortable": true
      },
      {
        "key": "referenceNumber",
        "label": "Reference",
        "sortable": true
      },
      {
        "key": "entityName",
        "label": "Name",
        "sortable": true
      },
      {
        "key": "category",
        "label": "Category",
        "sortable": true
      },
      {
        "key": "status",
        "label": "Status",
        "sortable": true
      },
      {
        "key": "createdAt",
        "label": "Created At",
        "sortable": true
      }
    ]
  },
  {
    "tableId": "TABLE_MOD_CH_DASHBOARD_GRID",
    "moduleId": "MOD_CH_DASHBOARD",
    "productId": "JUMO-CHURCH",
    "title": "Executive Diocesan Dashboard Grid View",
    "columns": [
      {
        "key": "id",
        "label": "ID",
        "sortable": true
      },
      {
        "key": "referenceNumber",
        "label": "Reference",
        "sortable": true
      },
      {
        "key": "entityName",
        "label": "Name",
        "sortable": true
      },
      {
        "key": "category",
        "label": "Category",
        "sortable": true
      },
      {
        "key": "status",
        "label": "Status",
        "sortable": true
      },
      {
        "key": "createdAt",
        "label": "Created At",
        "sortable": true
      }
    ]
  },
  {
    "tableId": "TABLE_MOD_OCC_VERIFICATION_GRID",
    "moduleId": "MOD_OCC_VERIFICATION",
    "productId": "JUMO-CONTROL",
    "title": "Ring-0 Verification & Integrity Grid View",
    "columns": [
      {
        "key": "id",
        "label": "ID",
        "sortable": true
      },
      {
        "key": "referenceNumber",
        "label": "Reference",
        "sortable": true
      },
      {
        "key": "entityName",
        "label": "Name",
        "sortable": true
      },
      {
        "key": "category",
        "label": "Category",
        "sortable": true
      },
      {
        "key": "status",
        "label": "Status",
        "sortable": true
      },
      {
        "key": "createdAt",
        "label": "Created At",
        "sortable": true
      }
    ]
  },
  {
    "tableId": "TABLE_MOD_OCC_TRUST_GRID",
    "moduleId": "MOD_OCC_TRUST",
    "productId": "JUMO-CONTROL",
    "title": "JUMO Trust Engine & Anti-Tamper Grid View",
    "columns": [
      {
        "key": "id",
        "label": "ID",
        "sortable": true
      },
      {
        "key": "referenceNumber",
        "label": "Reference",
        "sortable": true
      },
      {
        "key": "entityName",
        "label": "Name",
        "sortable": true
      },
      {
        "key": "category",
        "label": "Category",
        "sortable": true
      },
      {
        "key": "status",
        "label": "Status",
        "sortable": true
      },
      {
        "key": "createdAt",
        "label": "Created At",
        "sortable": true
      }
    ]
  },
  {
    "tableId": "TABLE_MOD_OCC_FACTORY_GRID",
    "moduleId": "MOD_OCC_FACTORY",
    "productId": "JUMO-CONTROL",
    "title": "ERP Template & Scaffolding Factory Grid View",
    "columns": [
      {
        "key": "id",
        "label": "ID",
        "sortable": true
      },
      {
        "key": "referenceNumber",
        "label": "Reference",
        "sortable": true
      },
      {
        "key": "entityName",
        "label": "Name",
        "sortable": true
      },
      {
        "key": "category",
        "label": "Category",
        "sortable": true
      },
      {
        "key": "status",
        "label": "Status",
        "sortable": true
      },
      {
        "key": "createdAt",
        "label": "Created At",
        "sortable": true
      }
    ]
  },
  {
    "tableId": "TABLE_MOD_OCC_SHELL_GRID",
    "moduleId": "MOD_OCC_SHELL",
    "productId": "JUMO-CONTROL",
    "title": "Universal Sovereign Platform Host Grid View",
    "columns": [
      {
        "key": "id",
        "label": "ID",
        "sortable": true
      },
      {
        "key": "referenceNumber",
        "label": "Reference",
        "sortable": true
      },
      {
        "key": "entityName",
        "label": "Name",
        "sortable": true
      },
      {
        "key": "category",
        "label": "Category",
        "sortable": true
      },
      {
        "key": "status",
        "label": "Status",
        "sortable": true
      },
      {
        "key": "createdAt",
        "label": "Created At",
        "sortable": true
      }
    ]
  }
], "UNIVERSAL_TABLE_REGISTRY");
