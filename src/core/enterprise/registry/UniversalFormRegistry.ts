import { createRegistryCollection, RegistryCollection, safeFind, safeFilter } from './UniversalRegistryContract';
export const UniversalFormRegistry = createRegistryCollection([
  {
    "formId": "FORM_MOD_FT_AGENT_BANKING_ENTRY",
    "moduleId": "MOD_FT_AGENT_BANKING",
    "productId": "JUMO-FINTECH",
    "title": "Agent Banking Master Record Form",
    "fields": [
      {
        "name": "referenceNumber",
        "label": "Reference Code",
        "type": "text",
        "required": true
      },
      {
        "name": "entityName",
        "label": "Entity / Account Name",
        "type": "text",
        "required": true
      },
      {
        "name": "category",
        "label": "Category / Classification",
        "type": "select",
        "options": [
          "Primary",
          "Secondary",
          "General",
          "Restricted"
        ],
        "required": true
      },
      {
        "name": "status",
        "label": "Status",
        "type": "select",
        "options": [
          "ACTIVE",
          "PENDING",
          "LOCKED"
        ],
        "required": true
      },
      {
        "name": "notes",
        "label": "Operational Notes",
        "type": "textarea",
        "required": false
      }
    ]
  },
  {
    "formId": "FORM_MOD_FT_AGRICULTURAL_FINANCE_ENTRY",
    "moduleId": "MOD_FT_AGRICULTURAL_FINANCE",
    "productId": "JUMO-FINTECH",
    "title": "Agricultural Finance Master Record Form",
    "fields": [
      {
        "name": "referenceNumber",
        "label": "Reference Code",
        "type": "text",
        "required": true
      },
      {
        "name": "entityName",
        "label": "Entity / Account Name",
        "type": "text",
        "required": true
      },
      {
        "name": "category",
        "label": "Category / Classification",
        "type": "select",
        "options": [
          "Primary",
          "Secondary",
          "General",
          "Restricted"
        ],
        "required": true
      },
      {
        "name": "status",
        "label": "Status",
        "type": "select",
        "options": [
          "ACTIVE",
          "PENDING",
          "LOCKED"
        ],
        "required": true
      },
      {
        "name": "notes",
        "label": "Operational Notes",
        "type": "textarea",
        "required": false
      }
    ]
  },
  {
    "formId": "FORM_MOD_FT_ATM_SELF_SERVICE_ENTRY",
    "moduleId": "MOD_FT_ATM_SELF_SERVICE",
    "productId": "JUMO-FINTECH",
    "title": "Atm Self Service Master Record Form",
    "fields": [
      {
        "name": "referenceNumber",
        "label": "Reference Code",
        "type": "text",
        "required": true
      },
      {
        "name": "entityName",
        "label": "Entity / Account Name",
        "type": "text",
        "required": true
      },
      {
        "name": "category",
        "label": "Category / Classification",
        "type": "select",
        "options": [
          "Primary",
          "Secondary",
          "General",
          "Restricted"
        ],
        "required": true
      },
      {
        "name": "status",
        "label": "Status",
        "type": "select",
        "options": [
          "ACTIVE",
          "PENDING",
          "LOCKED"
        ],
        "required": true
      },
      {
        "name": "notes",
        "label": "Operational Notes",
        "type": "textarea",
        "required": false
      }
    ]
  },
  {
    "formId": "FORM_MOD_FT_BANK_PAYMENTS_ENTRY",
    "moduleId": "MOD_FT_BANK_PAYMENTS",
    "productId": "JUMO-FINTECH",
    "title": "Bank Payments Master Record Form",
    "fields": [
      {
        "name": "referenceNumber",
        "label": "Reference Code",
        "type": "text",
        "required": true
      },
      {
        "name": "entityName",
        "label": "Entity / Account Name",
        "type": "text",
        "required": true
      },
      {
        "name": "category",
        "label": "Category / Classification",
        "type": "select",
        "options": [
          "Primary",
          "Secondary",
          "General",
          "Restricted"
        ],
        "required": true
      },
      {
        "name": "status",
        "label": "Status",
        "type": "select",
        "options": [
          "ACTIVE",
          "PENDING",
          "LOCKED"
        ],
        "required": true
      },
      {
        "name": "notes",
        "label": "Operational Notes",
        "type": "textarea",
        "required": false
      }
    ]
  },
  {
    "formId": "FORM_MOD_FT_BILL_PAYMENTS_ENTRY",
    "moduleId": "MOD_FT_BILL_PAYMENTS",
    "productId": "JUMO-FINTECH",
    "title": "Bill Payments Master Record Form",
    "fields": [
      {
        "name": "referenceNumber",
        "label": "Reference Code",
        "type": "text",
        "required": true
      },
      {
        "name": "entityName",
        "label": "Entity / Account Name",
        "type": "text",
        "required": true
      },
      {
        "name": "category",
        "label": "Category / Classification",
        "type": "select",
        "options": [
          "Primary",
          "Secondary",
          "General",
          "Restricted"
        ],
        "required": true
      },
      {
        "name": "status",
        "label": "Status",
        "type": "select",
        "options": [
          "ACTIVE",
          "PENDING",
          "LOCKED"
        ],
        "required": true
      },
      {
        "name": "notes",
        "label": "Operational Notes",
        "type": "textarea",
        "required": false
      }
    ]
  },
  {
    "formId": "FORM_MOD_FT_CAPITAL_MARKETS_ENTRY",
    "moduleId": "MOD_FT_CAPITAL_MARKETS",
    "productId": "JUMO-FINTECH",
    "title": "Capital Markets Master Record Form",
    "fields": [
      {
        "name": "referenceNumber",
        "label": "Reference Code",
        "type": "text",
        "required": true
      },
      {
        "name": "entityName",
        "label": "Entity / Account Name",
        "type": "text",
        "required": true
      },
      {
        "name": "category",
        "label": "Category / Classification",
        "type": "select",
        "options": [
          "Primary",
          "Secondary",
          "General",
          "Restricted"
        ],
        "required": true
      },
      {
        "name": "status",
        "label": "Status",
        "type": "select",
        "options": [
          "ACTIVE",
          "PENDING",
          "LOCKED"
        ],
        "required": true
      },
      {
        "name": "notes",
        "label": "Operational Notes",
        "type": "textarea",
        "required": false
      }
    ]
  },
  {
    "formId": "FORM_MOD_FT_CARDS_ENTRY",
    "moduleId": "MOD_FT_CARDS",
    "productId": "JUMO-FINTECH",
    "title": "Cards Master Record Form",
    "fields": [
      {
        "name": "referenceNumber",
        "label": "Reference Code",
        "type": "text",
        "required": true
      },
      {
        "name": "entityName",
        "label": "Entity / Account Name",
        "type": "text",
        "required": true
      },
      {
        "name": "category",
        "label": "Category / Classification",
        "type": "select",
        "options": [
          "Primary",
          "Secondary",
          "General",
          "Restricted"
        ],
        "required": true
      },
      {
        "name": "status",
        "label": "Status",
        "type": "select",
        "options": [
          "ACTIVE",
          "PENDING",
          "LOCKED"
        ],
        "required": true
      },
      {
        "name": "notes",
        "label": "Operational Notes",
        "type": "textarea",
        "required": false
      }
    ]
  },
  {
    "formId": "FORM_MOD_FT_COLLECTIONS_ENTRY",
    "moduleId": "MOD_FT_COLLECTIONS",
    "productId": "JUMO-FINTECH",
    "title": "Collections Master Record Form",
    "fields": [
      {
        "name": "referenceNumber",
        "label": "Reference Code",
        "type": "text",
        "required": true
      },
      {
        "name": "entityName",
        "label": "Entity / Account Name",
        "type": "text",
        "required": true
      },
      {
        "name": "category",
        "label": "Category / Classification",
        "type": "select",
        "options": [
          "Primary",
          "Secondary",
          "General",
          "Restricted"
        ],
        "required": true
      },
      {
        "name": "status",
        "label": "Status",
        "type": "select",
        "options": [
          "ACTIVE",
          "PENDING",
          "LOCKED"
        ],
        "required": true
      },
      {
        "name": "notes",
        "label": "Operational Notes",
        "type": "textarea",
        "required": false
      }
    ]
  },
  {
    "formId": "FORM_MOD_FT_COMPLIANCE_ENTRY",
    "moduleId": "MOD_FT_COMPLIANCE",
    "productId": "JUMO-FINTECH",
    "title": "Compliance Master Record Form",
    "fields": [
      {
        "name": "referenceNumber",
        "label": "Reference Code",
        "type": "text",
        "required": true
      },
      {
        "name": "entityName",
        "label": "Entity / Account Name",
        "type": "text",
        "required": true
      },
      {
        "name": "category",
        "label": "Category / Classification",
        "type": "select",
        "options": [
          "Primary",
          "Secondary",
          "General",
          "Restricted"
        ],
        "required": true
      },
      {
        "name": "status",
        "label": "Status",
        "type": "select",
        "options": [
          "ACTIVE",
          "PENDING",
          "LOCKED"
        ],
        "required": true
      },
      {
        "name": "notes",
        "label": "Operational Notes",
        "type": "textarea",
        "required": false
      }
    ]
  },
  {
    "formId": "FORM_MOD_FT_CROSS_BORDER_ENTRY",
    "moduleId": "MOD_FT_CROSS_BORDER",
    "productId": "JUMO-FINTECH",
    "title": "Cross Border Master Record Form",
    "fields": [
      {
        "name": "referenceNumber",
        "label": "Reference Code",
        "type": "text",
        "required": true
      },
      {
        "name": "entityName",
        "label": "Entity / Account Name",
        "type": "text",
        "required": true
      },
      {
        "name": "category",
        "label": "Category / Classification",
        "type": "select",
        "options": [
          "Primary",
          "Secondary",
          "General",
          "Restricted"
        ],
        "required": true
      },
      {
        "name": "status",
        "label": "Status",
        "type": "select",
        "options": [
          "ACTIVE",
          "PENDING",
          "LOCKED"
        ],
        "required": true
      },
      {
        "name": "notes",
        "label": "Operational Notes",
        "type": "textarea",
        "required": false
      }
    ]
  },
  {
    "formId": "FORM_MOD_FT_DATA_INTELLIGENCE_ENTRY",
    "moduleId": "MOD_FT_DATA_INTELLIGENCE",
    "productId": "JUMO-FINTECH",
    "title": "Data Intelligence Master Record Form",
    "fields": [
      {
        "name": "referenceNumber",
        "label": "Reference Code",
        "type": "text",
        "required": true
      },
      {
        "name": "entityName",
        "label": "Entity / Account Name",
        "type": "text",
        "required": true
      },
      {
        "name": "category",
        "label": "Category / Classification",
        "type": "select",
        "options": [
          "Primary",
          "Secondary",
          "General",
          "Restricted"
        ],
        "required": true
      },
      {
        "name": "status",
        "label": "Status",
        "type": "select",
        "options": [
          "ACTIVE",
          "PENDING",
          "LOCKED"
        ],
        "required": true
      },
      {
        "name": "notes",
        "label": "Operational Notes",
        "type": "textarea",
        "required": false
      }
    ]
  },
  {
    "formId": "FORM_MOD_FT_DEVELOPER_API_ENTRY",
    "moduleId": "MOD_FT_DEVELOPER_API",
    "productId": "JUMO-FINTECH",
    "title": "Developer Api Master Record Form",
    "fields": [
      {
        "name": "referenceNumber",
        "label": "Reference Code",
        "type": "text",
        "required": true
      },
      {
        "name": "entityName",
        "label": "Entity / Account Name",
        "type": "text",
        "required": true
      },
      {
        "name": "category",
        "label": "Category / Classification",
        "type": "select",
        "options": [
          "Primary",
          "Secondary",
          "General",
          "Restricted"
        ],
        "required": true
      },
      {
        "name": "status",
        "label": "Status",
        "type": "select",
        "options": [
          "ACTIVE",
          "PENDING",
          "LOCKED"
        ],
        "required": true
      },
      {
        "name": "notes",
        "label": "Operational Notes",
        "type": "textarea",
        "required": false
      }
    ]
  },
  {
    "formId": "FORM_MOD_FT_DIGITAL_BANKING_ENTRY",
    "moduleId": "MOD_FT_DIGITAL_BANKING",
    "productId": "JUMO-FINTECH",
    "title": "Digital Banking Master Record Form",
    "fields": [
      {
        "name": "referenceNumber",
        "label": "Reference Code",
        "type": "text",
        "required": true
      },
      {
        "name": "entityName",
        "label": "Entity / Account Name",
        "type": "text",
        "required": true
      },
      {
        "name": "category",
        "label": "Category / Classification",
        "type": "select",
        "options": [
          "Primary",
          "Secondary",
          "General",
          "Restricted"
        ],
        "required": true
      },
      {
        "name": "status",
        "label": "Status",
        "type": "select",
        "options": [
          "ACTIVE",
          "PENDING",
          "LOCKED"
        ],
        "required": true
      },
      {
        "name": "notes",
        "label": "Operational Notes",
        "type": "textarea",
        "required": false
      }
    ]
  },
  {
    "formId": "FORM_MOD_FT_DIGITAL_WALLETS_ENTRY",
    "moduleId": "MOD_FT_DIGITAL_WALLETS",
    "productId": "JUMO-FINTECH",
    "title": "Digital Wallets Master Record Form",
    "fields": [
      {
        "name": "referenceNumber",
        "label": "Reference Code",
        "type": "text",
        "required": true
      },
      {
        "name": "entityName",
        "label": "Entity / Account Name",
        "type": "text",
        "required": true
      },
      {
        "name": "category",
        "label": "Category / Classification",
        "type": "select",
        "options": [
          "Primary",
          "Secondary",
          "General",
          "Restricted"
        ],
        "required": true
      },
      {
        "name": "status",
        "label": "Status",
        "type": "select",
        "options": [
          "ACTIVE",
          "PENDING",
          "LOCKED"
        ],
        "required": true
      },
      {
        "name": "notes",
        "label": "Operational Notes",
        "type": "textarea",
        "required": false
      }
    ]
  },
  {
    "formId": "FORM_MOD_FT_EMBEDDED_FINANCE_ENTRY",
    "moduleId": "MOD_FT_EMBEDDED_FINANCE",
    "productId": "JUMO-FINTECH",
    "title": "Embedded Finance Master Record Form",
    "fields": [
      {
        "name": "referenceNumber",
        "label": "Reference Code",
        "type": "text",
        "required": true
      },
      {
        "name": "entityName",
        "label": "Entity / Account Name",
        "type": "text",
        "required": true
      },
      {
        "name": "category",
        "label": "Category / Classification",
        "type": "select",
        "options": [
          "Primary",
          "Secondary",
          "General",
          "Restricted"
        ],
        "required": true
      },
      {
        "name": "status",
        "label": "Status",
        "type": "select",
        "options": [
          "ACTIVE",
          "PENDING",
          "LOCKED"
        ],
        "required": true
      },
      {
        "name": "notes",
        "label": "Operational Notes",
        "type": "textarea",
        "required": false
      }
    ]
  },
  {
    "formId": "FORM_MOD_FT_FINANCIAL_ACCOUNTING_ENTRY",
    "moduleId": "MOD_FT_FINANCIAL_ACCOUNTING",
    "productId": "JUMO-FINTECH",
    "title": "Financial Accounting Master Record Form",
    "fields": [
      {
        "name": "referenceNumber",
        "label": "Reference Code",
        "type": "text",
        "required": true
      },
      {
        "name": "entityName",
        "label": "Entity / Account Name",
        "type": "text",
        "required": true
      },
      {
        "name": "category",
        "label": "Category / Classification",
        "type": "select",
        "options": [
          "Primary",
          "Secondary",
          "General",
          "Restricted"
        ],
        "required": true
      },
      {
        "name": "status",
        "label": "Status",
        "type": "select",
        "options": [
          "ACTIVE",
          "PENDING",
          "LOCKED"
        ],
        "required": true
      },
      {
        "name": "notes",
        "label": "Operational Notes",
        "type": "textarea",
        "required": false
      }
    ]
  },
  {
    "formId": "FORM_MOD_FT_FX_ENTRY",
    "moduleId": "MOD_FT_FX",
    "productId": "JUMO-FINTECH",
    "title": "Fx Master Record Form",
    "fields": [
      {
        "name": "referenceNumber",
        "label": "Reference Code",
        "type": "text",
        "required": true
      },
      {
        "name": "entityName",
        "label": "Entity / Account Name",
        "type": "text",
        "required": true
      },
      {
        "name": "category",
        "label": "Category / Classification",
        "type": "select",
        "options": [
          "Primary",
          "Secondary",
          "General",
          "Restricted"
        ],
        "required": true
      },
      {
        "name": "status",
        "label": "Status",
        "type": "select",
        "options": [
          "ACTIVE",
          "PENDING",
          "LOCKED"
        ],
        "required": true
      },
      {
        "name": "notes",
        "label": "Operational Notes",
        "type": "textarea",
        "required": false
      }
    ]
  },
  {
    "formId": "FORM_MOD_FT_GLOBAL_ACCOUNTS_ENTRY",
    "moduleId": "MOD_FT_GLOBAL_ACCOUNTS",
    "productId": "JUMO-FINTECH",
    "title": "Global Accounts Master Record Form",
    "fields": [
      {
        "name": "referenceNumber",
        "label": "Reference Code",
        "type": "text",
        "required": true
      },
      {
        "name": "entityName",
        "label": "Entity / Account Name",
        "type": "text",
        "required": true
      },
      {
        "name": "category",
        "label": "Category / Classification",
        "type": "select",
        "options": [
          "Primary",
          "Secondary",
          "General",
          "Restricted"
        ],
        "required": true
      },
      {
        "name": "status",
        "label": "Status",
        "type": "select",
        "options": [
          "ACTIVE",
          "PENDING",
          "LOCKED"
        ],
        "required": true
      },
      {
        "name": "notes",
        "label": "Operational Notes",
        "type": "textarea",
        "required": false
      }
    ]
  },
  {
    "formId": "FORM_MOD_FT_INSURANCE_ENTRY",
    "moduleId": "MOD_FT_INSURANCE",
    "productId": "JUMO-FINTECH",
    "title": "Insurance Master Record Form",
    "fields": [
      {
        "name": "referenceNumber",
        "label": "Reference Code",
        "type": "text",
        "required": true
      },
      {
        "name": "entityName",
        "label": "Entity / Account Name",
        "type": "text",
        "required": true
      },
      {
        "name": "category",
        "label": "Category / Classification",
        "type": "select",
        "options": [
          "Primary",
          "Secondary",
          "General",
          "Restricted"
        ],
        "required": true
      },
      {
        "name": "status",
        "label": "Status",
        "type": "select",
        "options": [
          "ACTIVE",
          "PENDING",
          "LOCKED"
        ],
        "required": true
      },
      {
        "name": "notes",
        "label": "Operational Notes",
        "type": "textarea",
        "required": false
      }
    ]
  },
  {
    "formId": "FORM_MOD_FT_INVESTMENT_ENTRY",
    "moduleId": "MOD_FT_INVESTMENT",
    "productId": "JUMO-FINTECH",
    "title": "Investment Master Record Form",
    "fields": [
      {
        "name": "referenceNumber",
        "label": "Reference Code",
        "type": "text",
        "required": true
      },
      {
        "name": "entityName",
        "label": "Entity / Account Name",
        "type": "text",
        "required": true
      },
      {
        "name": "category",
        "label": "Category / Classification",
        "type": "select",
        "options": [
          "Primary",
          "Secondary",
          "General",
          "Restricted"
        ],
        "required": true
      },
      {
        "name": "status",
        "label": "Status",
        "type": "select",
        "options": [
          "ACTIVE",
          "PENDING",
          "LOCKED"
        ],
        "required": true
      },
      {
        "name": "notes",
        "label": "Operational Notes",
        "type": "textarea",
        "required": false
      }
    ]
  },
  {
    "formId": "FORM_MOD_FT_LENDING_ENTRY",
    "moduleId": "MOD_FT_LENDING",
    "productId": "JUMO-FINTECH",
    "title": "Lending Master Record Form",
    "fields": [
      {
        "name": "referenceNumber",
        "label": "Reference Code",
        "type": "text",
        "required": true
      },
      {
        "name": "entityName",
        "label": "Entity / Account Name",
        "type": "text",
        "required": true
      },
      {
        "name": "category",
        "label": "Category / Classification",
        "type": "select",
        "options": [
          "Primary",
          "Secondary",
          "General",
          "Restricted"
        ],
        "required": true
      },
      {
        "name": "status",
        "label": "Status",
        "type": "select",
        "options": [
          "ACTIVE",
          "PENDING",
          "LOCKED"
        ],
        "required": true
      },
      {
        "name": "notes",
        "label": "Operational Notes",
        "type": "textarea",
        "required": false
      }
    ]
  },
  {
    "formId": "FORM_MOD_FT_MERCHANT_ACQUIRING_ENTRY",
    "moduleId": "MOD_FT_MERCHANT_ACQUIRING",
    "productId": "JUMO-FINTECH",
    "title": "Merchant Acquiring Master Record Form",
    "fields": [
      {
        "name": "referenceNumber",
        "label": "Reference Code",
        "type": "text",
        "required": true
      },
      {
        "name": "entityName",
        "label": "Entity / Account Name",
        "type": "text",
        "required": true
      },
      {
        "name": "category",
        "label": "Category / Classification",
        "type": "select",
        "options": [
          "Primary",
          "Secondary",
          "General",
          "Restricted"
        ],
        "required": true
      },
      {
        "name": "status",
        "label": "Status",
        "type": "select",
        "options": [
          "ACTIVE",
          "PENDING",
          "LOCKED"
        ],
        "required": true
      },
      {
        "name": "notes",
        "label": "Operational Notes",
        "type": "textarea",
        "required": false
      }
    ]
  },
  {
    "formId": "FORM_MOD_FT_MERCHANT_SERVICES_ENTRY",
    "moduleId": "MOD_FT_MERCHANT_SERVICES",
    "productId": "JUMO-FINTECH",
    "title": "Merchant Services Master Record Form",
    "fields": [
      {
        "name": "referenceNumber",
        "label": "Reference Code",
        "type": "text",
        "required": true
      },
      {
        "name": "entityName",
        "label": "Entity / Account Name",
        "type": "text",
        "required": true
      },
      {
        "name": "category",
        "label": "Category / Classification",
        "type": "select",
        "options": [
          "Primary",
          "Secondary",
          "General",
          "Restricted"
        ],
        "required": true
      },
      {
        "name": "status",
        "label": "Status",
        "type": "select",
        "options": [
          "ACTIVE",
          "PENDING",
          "LOCKED"
        ],
        "required": true
      },
      {
        "name": "notes",
        "label": "Operational Notes",
        "type": "textarea",
        "required": false
      }
    ]
  },
  {
    "formId": "FORM_MOD_FT_MICROFINANCE_ENTRY",
    "moduleId": "MOD_FT_MICROFINANCE",
    "productId": "JUMO-FINTECH",
    "title": "Microfinance Master Record Form",
    "fields": [
      {
        "name": "referenceNumber",
        "label": "Reference Code",
        "type": "text",
        "required": true
      },
      {
        "name": "entityName",
        "label": "Entity / Account Name",
        "type": "text",
        "required": true
      },
      {
        "name": "category",
        "label": "Category / Classification",
        "type": "select",
        "options": [
          "Primary",
          "Secondary",
          "General",
          "Restricted"
        ],
        "required": true
      },
      {
        "name": "status",
        "label": "Status",
        "type": "select",
        "options": [
          "ACTIVE",
          "PENDING",
          "LOCKED"
        ],
        "required": true
      },
      {
        "name": "notes",
        "label": "Operational Notes",
        "type": "textarea",
        "required": false
      }
    ]
  },
  {
    "formId": "FORM_MOD_FT_MOBILE_MONEY_ENTRY",
    "moduleId": "MOD_FT_MOBILE_MONEY",
    "productId": "JUMO-FINTECH",
    "title": "Mobile Money Master Record Form",
    "fields": [
      {
        "name": "referenceNumber",
        "label": "Reference Code",
        "type": "text",
        "required": true
      },
      {
        "name": "entityName",
        "label": "Entity / Account Name",
        "type": "text",
        "required": true
      },
      {
        "name": "category",
        "label": "Category / Classification",
        "type": "select",
        "options": [
          "Primary",
          "Secondary",
          "General",
          "Restricted"
        ],
        "required": true
      },
      {
        "name": "status",
        "label": "Status",
        "type": "select",
        "options": [
          "ACTIVE",
          "PENDING",
          "LOCKED"
        ],
        "required": true
      },
      {
        "name": "notes",
        "label": "Operational Notes",
        "type": "textarea",
        "required": false
      }
    ]
  },
  {
    "formId": "FORM_MOD_FT_MULTI_CURRENCY_ENTRY",
    "moduleId": "MOD_FT_MULTI_CURRENCY",
    "productId": "JUMO-FINTECH",
    "title": "Multi Currency Master Record Form",
    "fields": [
      {
        "name": "referenceNumber",
        "label": "Reference Code",
        "type": "text",
        "required": true
      },
      {
        "name": "entityName",
        "label": "Entity / Account Name",
        "type": "text",
        "required": true
      },
      {
        "name": "category",
        "label": "Category / Classification",
        "type": "select",
        "options": [
          "Primary",
          "Secondary",
          "General",
          "Restricted"
        ],
        "required": true
      },
      {
        "name": "status",
        "label": "Status",
        "type": "select",
        "options": [
          "ACTIVE",
          "PENDING",
          "LOCKED"
        ],
        "required": true
      },
      {
        "name": "notes",
        "label": "Operational Notes",
        "type": "textarea",
        "required": false
      }
    ]
  },
  {
    "formId": "FORM_MOD_FT_PAYMENT_GATEWAY_ENTRY",
    "moduleId": "MOD_FT_PAYMENT_GATEWAY",
    "productId": "JUMO-FINTECH",
    "title": "Payment Gateway Master Record Form",
    "fields": [
      {
        "name": "referenceNumber",
        "label": "Reference Code",
        "type": "text",
        "required": true
      },
      {
        "name": "entityName",
        "label": "Entity / Account Name",
        "type": "text",
        "required": true
      },
      {
        "name": "category",
        "label": "Category / Classification",
        "type": "select",
        "options": [
          "Primary",
          "Secondary",
          "General",
          "Restricted"
        ],
        "required": true
      },
      {
        "name": "status",
        "label": "Status",
        "type": "select",
        "options": [
          "ACTIVE",
          "PENDING",
          "LOCKED"
        ],
        "required": true
      },
      {
        "name": "notes",
        "label": "Operational Notes",
        "type": "textarea",
        "required": false
      }
    ]
  },
  {
    "formId": "FORM_MOD_FT_PAYMENT_SWITCHING_ENTRY",
    "moduleId": "MOD_FT_PAYMENT_SWITCHING",
    "productId": "JUMO-FINTECH",
    "title": "Payment Switching Master Record Form",
    "fields": [
      {
        "name": "referenceNumber",
        "label": "Reference Code",
        "type": "text",
        "required": true
      },
      {
        "name": "entityName",
        "label": "Entity / Account Name",
        "type": "text",
        "required": true
      },
      {
        "name": "category",
        "label": "Category / Classification",
        "type": "select",
        "options": [
          "Primary",
          "Secondary",
          "General",
          "Restricted"
        ],
        "required": true
      },
      {
        "name": "status",
        "label": "Status",
        "type": "select",
        "options": [
          "ACTIVE",
          "PENDING",
          "LOCKED"
        ],
        "required": true
      },
      {
        "name": "notes",
        "label": "Operational Notes",
        "type": "textarea",
        "required": false
      }
    ]
  },
  {
    "formId": "FORM_MOD_FT_PAYOUTS_ENTRY",
    "moduleId": "MOD_FT_PAYOUTS",
    "productId": "JUMO-FINTECH",
    "title": "Payouts Master Record Form",
    "fields": [
      {
        "name": "referenceNumber",
        "label": "Reference Code",
        "type": "text",
        "required": true
      },
      {
        "name": "entityName",
        "label": "Entity / Account Name",
        "type": "text",
        "required": true
      },
      {
        "name": "category",
        "label": "Category / Classification",
        "type": "select",
        "options": [
          "Primary",
          "Secondary",
          "General",
          "Restricted"
        ],
        "required": true
      },
      {
        "name": "status",
        "label": "Status",
        "type": "select",
        "options": [
          "ACTIVE",
          "PENDING",
          "LOCKED"
        ],
        "required": true
      },
      {
        "name": "notes",
        "label": "Operational Notes",
        "type": "textarea",
        "required": false
      }
    ]
  },
  {
    "formId": "FORM_MOD_FT_PAYROLL_ENTRY",
    "moduleId": "MOD_FT_PAYROLL",
    "productId": "JUMO-FINTECH",
    "title": "Payroll Master Record Form",
    "fields": [
      {
        "name": "referenceNumber",
        "label": "Reference Code",
        "type": "text",
        "required": true
      },
      {
        "name": "entityName",
        "label": "Entity / Account Name",
        "type": "text",
        "required": true
      },
      {
        "name": "category",
        "label": "Category / Classification",
        "type": "select",
        "options": [
          "Primary",
          "Secondary",
          "General",
          "Restricted"
        ],
        "required": true
      },
      {
        "name": "status",
        "label": "Status",
        "type": "select",
        "options": [
          "ACTIVE",
          "PENDING",
          "LOCKED"
        ],
        "required": true
      },
      {
        "name": "notes",
        "label": "Operational Notes",
        "type": "textarea",
        "required": false
      }
    ]
  },
  {
    "formId": "FORM_MOD_FT_REMITTANCES_ENTRY",
    "moduleId": "MOD_FT_REMITTANCES",
    "productId": "JUMO-FINTECH",
    "title": "Remittances Master Record Form",
    "fields": [
      {
        "name": "referenceNumber",
        "label": "Reference Code",
        "type": "text",
        "required": true
      },
      {
        "name": "entityName",
        "label": "Entity / Account Name",
        "type": "text",
        "required": true
      },
      {
        "name": "category",
        "label": "Category / Classification",
        "type": "select",
        "options": [
          "Primary",
          "Secondary",
          "General",
          "Restricted"
        ],
        "required": true
      },
      {
        "name": "status",
        "label": "Status",
        "type": "select",
        "options": [
          "ACTIVE",
          "PENDING",
          "LOCKED"
        ],
        "required": true
      },
      {
        "name": "notes",
        "label": "Operational Notes",
        "type": "textarea",
        "required": false
      }
    ]
  },
  {
    "formId": "FORM_MOD_FT_SACCO_ENTRY",
    "moduleId": "MOD_FT_SACCO",
    "productId": "JUMO-FINTECH",
    "title": "Sacco Master Record Form",
    "fields": [
      {
        "name": "referenceNumber",
        "label": "Reference Code",
        "type": "text",
        "required": true
      },
      {
        "name": "entityName",
        "label": "Entity / Account Name",
        "type": "text",
        "required": true
      },
      {
        "name": "category",
        "label": "Category / Classification",
        "type": "select",
        "options": [
          "Primary",
          "Secondary",
          "General",
          "Restricted"
        ],
        "required": true
      },
      {
        "name": "status",
        "label": "Status",
        "type": "select",
        "options": [
          "ACTIVE",
          "PENDING",
          "LOCKED"
        ],
        "required": true
      },
      {
        "name": "notes",
        "label": "Operational Notes",
        "type": "textarea",
        "required": false
      }
    ]
  },
  {
    "formId": "FORM_MOD_FT_SAVINGS_ENTRY",
    "moduleId": "MOD_FT_SAVINGS",
    "productId": "JUMO-FINTECH",
    "title": "Savings Master Record Form",
    "fields": [
      {
        "name": "referenceNumber",
        "label": "Reference Code",
        "type": "text",
        "required": true
      },
      {
        "name": "entityName",
        "label": "Entity / Account Name",
        "type": "text",
        "required": true
      },
      {
        "name": "category",
        "label": "Category / Classification",
        "type": "select",
        "options": [
          "Primary",
          "Secondary",
          "General",
          "Restricted"
        ],
        "required": true
      },
      {
        "name": "status",
        "label": "Status",
        "type": "select",
        "options": [
          "ACTIVE",
          "PENDING",
          "LOCKED"
        ],
        "required": true
      },
      {
        "name": "notes",
        "label": "Operational Notes",
        "type": "textarea",
        "required": false
      }
    ]
  },
  {
    "formId": "FORM_MOD_FT_SECURITIES_CUSTODY_ENTRY",
    "moduleId": "MOD_FT_SECURITIES_CUSTODY",
    "productId": "JUMO-FINTECH",
    "title": "Securities Custody Master Record Form",
    "fields": [
      {
        "name": "referenceNumber",
        "label": "Reference Code",
        "type": "text",
        "required": true
      },
      {
        "name": "entityName",
        "label": "Entity / Account Name",
        "type": "text",
        "required": true
      },
      {
        "name": "category",
        "label": "Category / Classification",
        "type": "select",
        "options": [
          "Primary",
          "Secondary",
          "General",
          "Restricted"
        ],
        "required": true
      },
      {
        "name": "status",
        "label": "Status",
        "type": "select",
        "options": [
          "ACTIVE",
          "PENDING",
          "LOCKED"
        ],
        "required": true
      },
      {
        "name": "notes",
        "label": "Operational Notes",
        "type": "textarea",
        "required": false
      }
    ]
  },
  {
    "formId": "FORM_MOD_FT_STABLECOIN_ENTRY",
    "moduleId": "MOD_FT_STABLECOIN",
    "productId": "JUMO-FINTECH",
    "title": "Stablecoin Master Record Form",
    "fields": [
      {
        "name": "referenceNumber",
        "label": "Reference Code",
        "type": "text",
        "required": true
      },
      {
        "name": "entityName",
        "label": "Entity / Account Name",
        "type": "text",
        "required": true
      },
      {
        "name": "category",
        "label": "Category / Classification",
        "type": "select",
        "options": [
          "Primary",
          "Secondary",
          "General",
          "Restricted"
        ],
        "required": true
      },
      {
        "name": "status",
        "label": "Status",
        "type": "select",
        "options": [
          "ACTIVE",
          "PENDING",
          "LOCKED"
        ],
        "required": true
      },
      {
        "name": "notes",
        "label": "Operational Notes",
        "type": "textarea",
        "required": false
      }
    ]
  },
  {
    "formId": "FORM_MOD_FT_TAX_REVENUE_ENTRY",
    "moduleId": "MOD_FT_TAX_REVENUE",
    "productId": "JUMO-FINTECH",
    "title": "Tax Revenue Master Record Form",
    "fields": [
      {
        "name": "referenceNumber",
        "label": "Reference Code",
        "type": "text",
        "required": true
      },
      {
        "name": "entityName",
        "label": "Entity / Account Name",
        "type": "text",
        "required": true
      },
      {
        "name": "category",
        "label": "Category / Classification",
        "type": "select",
        "options": [
          "Primary",
          "Secondary",
          "General",
          "Restricted"
        ],
        "required": true
      },
      {
        "name": "status",
        "label": "Status",
        "type": "select",
        "options": [
          "ACTIVE",
          "PENDING",
          "LOCKED"
        ],
        "required": true
      },
      {
        "name": "notes",
        "label": "Operational Notes",
        "type": "textarea",
        "required": false
      }
    ]
  },
  {
    "formId": "FORM_MOD_FT_TRADE_FINANCE_ENTRY",
    "moduleId": "MOD_FT_TRADE_FINANCE",
    "productId": "JUMO-FINTECH",
    "title": "Trade Finance Master Record Form",
    "fields": [
      {
        "name": "referenceNumber",
        "label": "Reference Code",
        "type": "text",
        "required": true
      },
      {
        "name": "entityName",
        "label": "Entity / Account Name",
        "type": "text",
        "required": true
      },
      {
        "name": "category",
        "label": "Category / Classification",
        "type": "select",
        "options": [
          "Primary",
          "Secondary",
          "General",
          "Restricted"
        ],
        "required": true
      },
      {
        "name": "status",
        "label": "Status",
        "type": "select",
        "options": [
          "ACTIVE",
          "PENDING",
          "LOCKED"
        ],
        "required": true
      },
      {
        "name": "notes",
        "label": "Operational Notes",
        "type": "textarea",
        "required": false
      }
    ]
  },
  {
    "formId": "FORM_MOD_FT_TREASURY_ENTRY",
    "moduleId": "MOD_FT_TREASURY",
    "productId": "JUMO-FINTECH",
    "title": "Treasury Master Record Form",
    "fields": [
      {
        "name": "referenceNumber",
        "label": "Reference Code",
        "type": "text",
        "required": true
      },
      {
        "name": "entityName",
        "label": "Entity / Account Name",
        "type": "text",
        "required": true
      },
      {
        "name": "category",
        "label": "Category / Classification",
        "type": "select",
        "options": [
          "Primary",
          "Secondary",
          "General",
          "Restricted"
        ],
        "required": true
      },
      {
        "name": "status",
        "label": "Status",
        "type": "select",
        "options": [
          "ACTIVE",
          "PENDING",
          "LOCKED"
        ],
        "required": true
      },
      {
        "name": "notes",
        "label": "Operational Notes",
        "type": "textarea",
        "required": false
      }
    ]
  },
  {
    "formId": "FORM_MOD_NP_ECD_MILESTONES_ENTRY",
    "moduleId": "MOD_NP_ECD_MILESTONES",
    "productId": "JUMO-NURSERY-PRIMARY-ERP",
    "title": "Early Childhood Development & Milestones Master Record Form",
    "fields": [
      {
        "name": "referenceNumber",
        "label": "Reference Code",
        "type": "text",
        "required": true
      },
      {
        "name": "entityName",
        "label": "Entity / Account Name",
        "type": "text",
        "required": true
      },
      {
        "name": "category",
        "label": "Category / Classification",
        "type": "select",
        "options": [
          "Primary",
          "Secondary",
          "General",
          "Restricted"
        ],
        "required": true
      },
      {
        "name": "status",
        "label": "Status",
        "type": "select",
        "options": [
          "ACTIVE",
          "PENDING",
          "LOCKED"
        ],
        "required": true
      },
      {
        "name": "notes",
        "label": "Operational Notes",
        "type": "textarea",
        "required": false
      }
    ]
  },
  {
    "formId": "FORM_MOD_NP_PRIMARY_ACADEMICS_ENTRY",
    "moduleId": "MOD_NP_PRIMARY_ACADEMICS",
    "productId": "JUMO-NURSERY-PRIMARY-ERP",
    "title": "Primary Curriculum & Assessment Master Record Form",
    "fields": [
      {
        "name": "referenceNumber",
        "label": "Reference Code",
        "type": "text",
        "required": true
      },
      {
        "name": "entityName",
        "label": "Entity / Account Name",
        "type": "text",
        "required": true
      },
      {
        "name": "category",
        "label": "Category / Classification",
        "type": "select",
        "options": [
          "Primary",
          "Secondary",
          "General",
          "Restricted"
        ],
        "required": true
      },
      {
        "name": "status",
        "label": "Status",
        "type": "select",
        "options": [
          "ACTIVE",
          "PENDING",
          "LOCKED"
        ],
        "required": true
      },
      {
        "name": "notes",
        "label": "Operational Notes",
        "type": "textarea",
        "required": false
      }
    ]
  },
  {
    "formId": "FORM_MOD_NP_PRIMARY_DOS_ENTRY",
    "moduleId": "MOD_NP_PRIMARY_DOS",
    "productId": "JUMO-NURSERY-PRIMARY-ERP",
    "title": "Primary Studies & Timetabling Master Record Form",
    "fields": [
      {
        "name": "referenceNumber",
        "label": "Reference Code",
        "type": "text",
        "required": true
      },
      {
        "name": "entityName",
        "label": "Entity / Account Name",
        "type": "text",
        "required": true
      },
      {
        "name": "category",
        "label": "Category / Classification",
        "type": "select",
        "options": [
          "Primary",
          "Secondary",
          "General",
          "Restricted"
        ],
        "required": true
      },
      {
        "name": "status",
        "label": "Status",
        "type": "select",
        "options": [
          "ACTIVE",
          "PENDING",
          "LOCKED"
        ],
        "required": true
      },
      {
        "name": "notes",
        "label": "Operational Notes",
        "type": "textarea",
        "required": false
      }
    ]
  },
  {
    "formId": "FORM_MOD_NP_ADMISSIONS_ENTRY",
    "moduleId": "MOD_NP_ADMISSIONS",
    "productId": "JUMO-NURSERY-PRIMARY-ERP",
    "title": "Consolidated Student Admissions Master Record Form",
    "fields": [
      {
        "name": "referenceNumber",
        "label": "Reference Code",
        "type": "text",
        "required": true
      },
      {
        "name": "entityName",
        "label": "Entity / Account Name",
        "type": "text",
        "required": true
      },
      {
        "name": "category",
        "label": "Category / Classification",
        "type": "select",
        "options": [
          "Primary",
          "Secondary",
          "General",
          "Restricted"
        ],
        "required": true
      },
      {
        "name": "status",
        "label": "Status",
        "type": "select",
        "options": [
          "ACTIVE",
          "PENDING",
          "LOCKED"
        ],
        "required": true
      },
      {
        "name": "notes",
        "label": "Operational Notes",
        "type": "textarea",
        "required": false
      }
    ]
  },
  {
    "formId": "FORM_MOD_NP_BURSARY_ENTRY",
    "moduleId": "MOD_NP_BURSARY",
    "productId": "JUMO-NURSERY-PRIMARY-ERP",
    "title": "Fee Invoicing & Bursar Ledger Master Record Form",
    "fields": [
      {
        "name": "referenceNumber",
        "label": "Reference Code",
        "type": "text",
        "required": true
      },
      {
        "name": "entityName",
        "label": "Entity / Account Name",
        "type": "text",
        "required": true
      },
      {
        "name": "category",
        "label": "Category / Classification",
        "type": "select",
        "options": [
          "Primary",
          "Secondary",
          "General",
          "Restricted"
        ],
        "required": true
      },
      {
        "name": "status",
        "label": "Status",
        "type": "select",
        "options": [
          "ACTIVE",
          "PENDING",
          "LOCKED"
        ],
        "required": true
      },
      {
        "name": "notes",
        "label": "Operational Notes",
        "type": "textarea",
        "required": false
      }
    ]
  },
  {
    "formId": "FORM_MOD_NP_SAFEGUARDING_ENTRY",
    "moduleId": "MOD_NP_SAFEGUARDING",
    "productId": "JUMO-NURSERY-PRIMARY-ERP",
    "title": "Child Protection & Safeguarding Master Record Form",
    "fields": [
      {
        "name": "referenceNumber",
        "label": "Reference Code",
        "type": "text",
        "required": true
      },
      {
        "name": "entityName",
        "label": "Entity / Account Name",
        "type": "text",
        "required": true
      },
      {
        "name": "category",
        "label": "Category / Classification",
        "type": "select",
        "options": [
          "Primary",
          "Secondary",
          "General",
          "Restricted"
        ],
        "required": true
      },
      {
        "name": "status",
        "label": "Status",
        "type": "select",
        "options": [
          "ACTIVE",
          "PENDING",
          "LOCKED"
        ],
        "required": true
      },
      {
        "name": "notes",
        "label": "Operational Notes",
        "type": "textarea",
        "required": false
      }
    ]
  },
  {
    "formId": "FORM_MOD_NP_CLINIC_ENTRY",
    "moduleId": "MOD_NP_CLINIC",
    "productId": "JUMO-NURSERY-PRIMARY-ERP",
    "title": "Infirmary & Pediatric Health Master Record Form",
    "fields": [
      {
        "name": "referenceNumber",
        "label": "Reference Code",
        "type": "text",
        "required": true
      },
      {
        "name": "entityName",
        "label": "Entity / Account Name",
        "type": "text",
        "required": true
      },
      {
        "name": "category",
        "label": "Category / Classification",
        "type": "select",
        "options": [
          "Primary",
          "Secondary",
          "General",
          "Restricted"
        ],
        "required": true
      },
      {
        "name": "status",
        "label": "Status",
        "type": "select",
        "options": [
          "ACTIVE",
          "PENDING",
          "LOCKED"
        ],
        "required": true
      },
      {
        "name": "notes",
        "label": "Operational Notes",
        "type": "textarea",
        "required": false
      }
    ]
  },
  {
    "formId": "FORM_MOD_NP_CATERING_ENTRY",
    "moduleId": "MOD_NP_CATERING",
    "productId": "JUMO-NURSERY-PRIMARY-ERP",
    "title": "Nutrition & School Dining Master Record Form",
    "fields": [
      {
        "name": "referenceNumber",
        "label": "Reference Code",
        "type": "text",
        "required": true
      },
      {
        "name": "entityName",
        "label": "Entity / Account Name",
        "type": "text",
        "required": true
      },
      {
        "name": "category",
        "label": "Category / Classification",
        "type": "select",
        "options": [
          "Primary",
          "Secondary",
          "General",
          "Restricted"
        ],
        "required": true
      },
      {
        "name": "status",
        "label": "Status",
        "type": "select",
        "options": [
          "ACTIVE",
          "PENDING",
          "LOCKED"
        ],
        "required": true
      },
      {
        "name": "notes",
        "label": "Operational Notes",
        "type": "textarea",
        "required": false
      }
    ]
  },
  {
    "formId": "FORM_MOD_NP_TRANSPORT_ENTRY",
    "moduleId": "MOD_NP_TRANSPORT",
    "productId": "JUMO-NURSERY-PRIMARY-ERP",
    "title": "Student Bus Routing & Tracking Master Record Form",
    "fields": [
      {
        "name": "referenceNumber",
        "label": "Reference Code",
        "type": "text",
        "required": true
      },
      {
        "name": "entityName",
        "label": "Entity / Account Name",
        "type": "text",
        "required": true
      },
      {
        "name": "category",
        "label": "Category / Classification",
        "type": "select",
        "options": [
          "Primary",
          "Secondary",
          "General",
          "Restricted"
        ],
        "required": true
      },
      {
        "name": "status",
        "label": "Status",
        "type": "select",
        "options": [
          "ACTIVE",
          "PENDING",
          "LOCKED"
        ],
        "required": true
      },
      {
        "name": "notes",
        "label": "Operational Notes",
        "type": "textarea",
        "required": false
      }
    ]
  },
  {
    "formId": "FORM_MOD_SEC_HOD_ENTRY",
    "moduleId": "MOD_SEC_HOD",
    "productId": "JUMO-SECONDARY-ERP",
    "title": "Academic Departmental Heads (HOD) Master Record Form",
    "fields": [
      {
        "name": "referenceNumber",
        "label": "Reference Code",
        "type": "text",
        "required": true
      },
      {
        "name": "entityName",
        "label": "Entity / Account Name",
        "type": "text",
        "required": true
      },
      {
        "name": "category",
        "label": "Category / Classification",
        "type": "select",
        "options": [
          "Primary",
          "Secondary",
          "General",
          "Restricted"
        ],
        "required": true
      },
      {
        "name": "status",
        "label": "Status",
        "type": "select",
        "options": [
          "ACTIVE",
          "PENDING",
          "LOCKED"
        ],
        "required": true
      },
      {
        "name": "notes",
        "label": "Operational Notes",
        "type": "textarea",
        "required": false
      }
    ]
  },
  {
    "formId": "FORM_MOD_SEC_REGISTRAR_ENTRY",
    "moduleId": "MOD_SEC_REGISTRAR",
    "productId": "JUMO-SECONDARY-ERP",
    "title": "Secondary Registry & Matriculation Master Record Form",
    "fields": [
      {
        "name": "referenceNumber",
        "label": "Reference Code",
        "type": "text",
        "required": true
      },
      {
        "name": "entityName",
        "label": "Entity / Account Name",
        "type": "text",
        "required": true
      },
      {
        "name": "category",
        "label": "Category / Classification",
        "type": "select",
        "options": [
          "Primary",
          "Secondary",
          "General",
          "Restricted"
        ],
        "required": true
      },
      {
        "name": "status",
        "label": "Status",
        "type": "select",
        "options": [
          "ACTIVE",
          "PENDING",
          "LOCKED"
        ],
        "required": true
      },
      {
        "name": "notes",
        "label": "Operational Notes",
        "type": "textarea",
        "required": false
      }
    ]
  },
  {
    "formId": "FORM_MOD_SEC_BURSARY_ENTRY",
    "moduleId": "MOD_SEC_BURSARY",
    "productId": "JUMO-SECONDARY-ERP",
    "title": "Secondary Bursar & Tuitions Master Record Form",
    "fields": [
      {
        "name": "referenceNumber",
        "label": "Reference Code",
        "type": "text",
        "required": true
      },
      {
        "name": "entityName",
        "label": "Entity / Account Name",
        "type": "text",
        "required": true
      },
      {
        "name": "category",
        "label": "Category / Classification",
        "type": "select",
        "options": [
          "Primary",
          "Secondary",
          "General",
          "Restricted"
        ],
        "required": true
      },
      {
        "name": "status",
        "label": "Status",
        "type": "select",
        "options": [
          "ACTIVE",
          "PENDING",
          "LOCKED"
        ],
        "required": true
      },
      {
        "name": "notes",
        "label": "Operational Notes",
        "type": "textarea",
        "required": false
      }
    ]
  },
  {
    "formId": "FORM_MOD_SEC_SENATE_ENTRY",
    "moduleId": "MOD_SEC_SENATE",
    "productId": "JUMO-SECONDARY-ERP",
    "title": "Secondary Academic Senate Master Record Form",
    "fields": [
      {
        "name": "referenceNumber",
        "label": "Reference Code",
        "type": "text",
        "required": true
      },
      {
        "name": "entityName",
        "label": "Entity / Account Name",
        "type": "text",
        "required": true
      },
      {
        "name": "category",
        "label": "Category / Classification",
        "type": "select",
        "options": [
          "Primary",
          "Secondary",
          "General",
          "Restricted"
        ],
        "required": true
      },
      {
        "name": "status",
        "label": "Status",
        "type": "select",
        "options": [
          "ACTIVE",
          "PENDING",
          "LOCKED"
        ],
        "required": true
      },
      {
        "name": "notes",
        "label": "Operational Notes",
        "type": "textarea",
        "required": false
      }
    ]
  },
  {
    "formId": "FORM_MOD_SEC_SERVICE_ENTRY",
    "moduleId": "MOD_SEC_SERVICE",
    "productId": "JUMO-SECONDARY-ERP",
    "title": "Secondary Core Domain Service Master Record Form",
    "fields": [
      {
        "name": "referenceNumber",
        "label": "Reference Code",
        "type": "text",
        "required": true
      },
      {
        "name": "entityName",
        "label": "Entity / Account Name",
        "type": "text",
        "required": true
      },
      {
        "name": "category",
        "label": "Category / Classification",
        "type": "select",
        "options": [
          "Primary",
          "Secondary",
          "General",
          "Restricted"
        ],
        "required": true
      },
      {
        "name": "status",
        "label": "Status",
        "type": "select",
        "options": [
          "ACTIVE",
          "PENDING",
          "LOCKED"
        ],
        "required": true
      },
      {
        "name": "notes",
        "label": "Operational Notes",
        "type": "textarea",
        "required": false
      }
    ]
  },
  {
    "formId": "FORM_MOD_ALUM_REGISTRY_ENTRY",
    "moduleId": "MOD_ALUM_REGISTRY",
    "productId": "JUMO-ALUMNI",
    "title": "Alumni Census & Graduate Registry Master Record Form",
    "fields": [
      {
        "name": "referenceNumber",
        "label": "Reference Code",
        "type": "text",
        "required": true
      },
      {
        "name": "entityName",
        "label": "Entity / Account Name",
        "type": "text",
        "required": true
      },
      {
        "name": "category",
        "label": "Category / Classification",
        "type": "select",
        "options": [
          "Primary",
          "Secondary",
          "General",
          "Restricted"
        ],
        "required": true
      },
      {
        "name": "status",
        "label": "Status",
        "type": "select",
        "options": [
          "ACTIVE",
          "PENDING",
          "LOCKED"
        ],
        "required": true
      },
      {
        "name": "notes",
        "label": "Operational Notes",
        "type": "textarea",
        "required": false
      }
    ]
  },
  {
    "formId": "FORM_MOD_ALUM_GIVING_ENTRY",
    "moduleId": "MOD_ALUM_GIVING",
    "productId": "JUMO-ALUMNI",
    "title": "Giving Campaigns & Endowments Master Record Form",
    "fields": [
      {
        "name": "referenceNumber",
        "label": "Reference Code",
        "type": "text",
        "required": true
      },
      {
        "name": "entityName",
        "label": "Entity / Account Name",
        "type": "text",
        "required": true
      },
      {
        "name": "category",
        "label": "Category / Classification",
        "type": "select",
        "options": [
          "Primary",
          "Secondary",
          "General",
          "Restricted"
        ],
        "required": true
      },
      {
        "name": "status",
        "label": "Status",
        "type": "select",
        "options": [
          "ACTIVE",
          "PENDING",
          "LOCKED"
        ],
        "required": true
      },
      {
        "name": "notes",
        "label": "Operational Notes",
        "type": "textarea",
        "required": false
      }
    ]
  },
  {
    "formId": "FORM_MOD_ALUM_CHAPTERS_ENTRY",
    "moduleId": "MOD_ALUM_CHAPTERS",
    "productId": "JUMO-ALUMNI",
    "title": "Global Chapters & Diaspora Network Master Record Form",
    "fields": [
      {
        "name": "referenceNumber",
        "label": "Reference Code",
        "type": "text",
        "required": true
      },
      {
        "name": "entityName",
        "label": "Entity / Account Name",
        "type": "text",
        "required": true
      },
      {
        "name": "category",
        "label": "Category / Classification",
        "type": "select",
        "options": [
          "Primary",
          "Secondary",
          "General",
          "Restricted"
        ],
        "required": true
      },
      {
        "name": "status",
        "label": "Status",
        "type": "select",
        "options": [
          "ACTIVE",
          "PENDING",
          "LOCKED"
        ],
        "required": true
      },
      {
        "name": "notes",
        "label": "Operational Notes",
        "type": "textarea",
        "required": false
      }
    ]
  },
  {
    "formId": "FORM_MOD_ALUM_CAREER_ENTRY",
    "moduleId": "MOD_ALUM_CAREER",
    "productId": "JUMO-ALUMNI",
    "title": "Career Services & Mentorship Master Record Form",
    "fields": [
      {
        "name": "referenceNumber",
        "label": "Reference Code",
        "type": "text",
        "required": true
      },
      {
        "name": "entityName",
        "label": "Entity / Account Name",
        "type": "text",
        "required": true
      },
      {
        "name": "category",
        "label": "Category / Classification",
        "type": "select",
        "options": [
          "Primary",
          "Secondary",
          "General",
          "Restricted"
        ],
        "required": true
      },
      {
        "name": "status",
        "label": "Status",
        "type": "select",
        "options": [
          "ACTIVE",
          "PENDING",
          "LOCKED"
        ],
        "required": true
      },
      {
        "name": "notes",
        "label": "Operational Notes",
        "type": "textarea",
        "required": false
      }
    ]
  },
  {
    "formId": "FORM_MOD_ALUM_DASHBOARD_ENTRY",
    "moduleId": "MOD_ALUM_DASHBOARD",
    "productId": "JUMO-ALUMNI",
    "title": "Alumni Intelligence Dashboard Master Record Form",
    "fields": [
      {
        "name": "referenceNumber",
        "label": "Reference Code",
        "type": "text",
        "required": true
      },
      {
        "name": "entityName",
        "label": "Entity / Account Name",
        "type": "text",
        "required": true
      },
      {
        "name": "category",
        "label": "Category / Classification",
        "type": "select",
        "options": [
          "Primary",
          "Secondary",
          "General",
          "Restricted"
        ],
        "required": true
      },
      {
        "name": "status",
        "label": "Status",
        "type": "select",
        "options": [
          "ACTIVE",
          "PENDING",
          "LOCKED"
        ],
        "required": true
      },
      {
        "name": "notes",
        "label": "Operational Notes",
        "type": "textarea",
        "required": false
      }
    ]
  },
  {
    "formId": "FORM_MOD_CH_MEMBERSHIP_ENTRY",
    "moduleId": "MOD_CH_MEMBERSHIP",
    "productId": "JUMO-CHURCH",
    "title": "Congregation Directory & Census Master Record Form",
    "fields": [
      {
        "name": "referenceNumber",
        "label": "Reference Code",
        "type": "text",
        "required": true
      },
      {
        "name": "entityName",
        "label": "Entity / Account Name",
        "type": "text",
        "required": true
      },
      {
        "name": "category",
        "label": "Category / Classification",
        "type": "select",
        "options": [
          "Primary",
          "Secondary",
          "General",
          "Restricted"
        ],
        "required": true
      },
      {
        "name": "status",
        "label": "Status",
        "type": "select",
        "options": [
          "ACTIVE",
          "PENDING",
          "LOCKED"
        ],
        "required": true
      },
      {
        "name": "notes",
        "label": "Operational Notes",
        "type": "textarea",
        "required": false
      }
    ]
  },
  {
    "formId": "FORM_MOD_CH_FINANCE_ENTRY",
    "moduleId": "MOD_CH_FINANCE",
    "productId": "JUMO-CHURCH",
    "title": "Tithes, Offerings & Diocesan Ledger Master Record Form",
    "fields": [
      {
        "name": "referenceNumber",
        "label": "Reference Code",
        "type": "text",
        "required": true
      },
      {
        "name": "entityName",
        "label": "Entity / Account Name",
        "type": "text",
        "required": true
      },
      {
        "name": "category",
        "label": "Category / Classification",
        "type": "select",
        "options": [
          "Primary",
          "Secondary",
          "General",
          "Restricted"
        ],
        "required": true
      },
      {
        "name": "status",
        "label": "Status",
        "type": "select",
        "options": [
          "ACTIVE",
          "PENDING",
          "LOCKED"
        ],
        "required": true
      },
      {
        "name": "notes",
        "label": "Operational Notes",
        "type": "textarea",
        "required": false
      }
    ]
  },
  {
    "formId": "FORM_MOD_CH_PASTORAL_ENTRY",
    "moduleId": "MOD_CH_PASTORAL",
    "productId": "JUMO-CHURCH",
    "title": "Pastoral Care & Visitation Tracking Master Record Form",
    "fields": [
      {
        "name": "referenceNumber",
        "label": "Reference Code",
        "type": "text",
        "required": true
      },
      {
        "name": "entityName",
        "label": "Entity / Account Name",
        "type": "text",
        "required": true
      },
      {
        "name": "category",
        "label": "Category / Classification",
        "type": "select",
        "options": [
          "Primary",
          "Secondary",
          "General",
          "Restricted"
        ],
        "required": true
      },
      {
        "name": "status",
        "label": "Status",
        "type": "select",
        "options": [
          "ACTIVE",
          "PENDING",
          "LOCKED"
        ],
        "required": true
      },
      {
        "name": "notes",
        "label": "Operational Notes",
        "type": "textarea",
        "required": false
      }
    ]
  },
  {
    "formId": "FORM_MOD_CH_EVENTS_ENTRY",
    "moduleId": "MOD_CH_EVENTS",
    "productId": "JUMO-CHURCH",
    "title": "Liturgical Calendar & Event Operations Master Record Form",
    "fields": [
      {
        "name": "referenceNumber",
        "label": "Reference Code",
        "type": "text",
        "required": true
      },
      {
        "name": "entityName",
        "label": "Entity / Account Name",
        "type": "text",
        "required": true
      },
      {
        "name": "category",
        "label": "Category / Classification",
        "type": "select",
        "options": [
          "Primary",
          "Secondary",
          "General",
          "Restricted"
        ],
        "required": true
      },
      {
        "name": "status",
        "label": "Status",
        "type": "select",
        "options": [
          "ACTIVE",
          "PENDING",
          "LOCKED"
        ],
        "required": true
      },
      {
        "name": "notes",
        "label": "Operational Notes",
        "type": "textarea",
        "required": false
      }
    ]
  },
  {
    "formId": "FORM_MOD_CH_DASHBOARD_ENTRY",
    "moduleId": "MOD_CH_DASHBOARD",
    "productId": "JUMO-CHURCH",
    "title": "Executive Diocesan Dashboard Master Record Form",
    "fields": [
      {
        "name": "referenceNumber",
        "label": "Reference Code",
        "type": "text",
        "required": true
      },
      {
        "name": "entityName",
        "label": "Entity / Account Name",
        "type": "text",
        "required": true
      },
      {
        "name": "category",
        "label": "Category / Classification",
        "type": "select",
        "options": [
          "Primary",
          "Secondary",
          "General",
          "Restricted"
        ],
        "required": true
      },
      {
        "name": "status",
        "label": "Status",
        "type": "select",
        "options": [
          "ACTIVE",
          "PENDING",
          "LOCKED"
        ],
        "required": true
      },
      {
        "name": "notes",
        "label": "Operational Notes",
        "type": "textarea",
        "required": false
      }
    ]
  },
  {
    "formId": "FORM_MOD_OCC_VERIFICATION_ENTRY",
    "moduleId": "MOD_OCC_VERIFICATION",
    "productId": "JUMO-CONTROL",
    "title": "Ring-0 Verification & Integrity Master Record Form",
    "fields": [
      {
        "name": "referenceNumber",
        "label": "Reference Code",
        "type": "text",
        "required": true
      },
      {
        "name": "entityName",
        "label": "Entity / Account Name",
        "type": "text",
        "required": true
      },
      {
        "name": "category",
        "label": "Category / Classification",
        "type": "select",
        "options": [
          "Primary",
          "Secondary",
          "General",
          "Restricted"
        ],
        "required": true
      },
      {
        "name": "status",
        "label": "Status",
        "type": "select",
        "options": [
          "ACTIVE",
          "PENDING",
          "LOCKED"
        ],
        "required": true
      },
      {
        "name": "notes",
        "label": "Operational Notes",
        "type": "textarea",
        "required": false
      }
    ]
  },
  {
    "formId": "FORM_MOD_OCC_TRUST_ENTRY",
    "moduleId": "MOD_OCC_TRUST",
    "productId": "JUMO-CONTROL",
    "title": "JUMO Trust Engine & Anti-Tamper Master Record Form",
    "fields": [
      {
        "name": "referenceNumber",
        "label": "Reference Code",
        "type": "text",
        "required": true
      },
      {
        "name": "entityName",
        "label": "Entity / Account Name",
        "type": "text",
        "required": true
      },
      {
        "name": "category",
        "label": "Category / Classification",
        "type": "select",
        "options": [
          "Primary",
          "Secondary",
          "General",
          "Restricted"
        ],
        "required": true
      },
      {
        "name": "status",
        "label": "Status",
        "type": "select",
        "options": [
          "ACTIVE",
          "PENDING",
          "LOCKED"
        ],
        "required": true
      },
      {
        "name": "notes",
        "label": "Operational Notes",
        "type": "textarea",
        "required": false
      }
    ]
  },
  {
    "formId": "FORM_MOD_OCC_FACTORY_ENTRY",
    "moduleId": "MOD_OCC_FACTORY",
    "productId": "JUMO-CONTROL",
    "title": "ERP Template & Scaffolding Factory Master Record Form",
    "fields": [
      {
        "name": "referenceNumber",
        "label": "Reference Code",
        "type": "text",
        "required": true
      },
      {
        "name": "entityName",
        "label": "Entity / Account Name",
        "type": "text",
        "required": true
      },
      {
        "name": "category",
        "label": "Category / Classification",
        "type": "select",
        "options": [
          "Primary",
          "Secondary",
          "General",
          "Restricted"
        ],
        "required": true
      },
      {
        "name": "status",
        "label": "Status",
        "type": "select",
        "options": [
          "ACTIVE",
          "PENDING",
          "LOCKED"
        ],
        "required": true
      },
      {
        "name": "notes",
        "label": "Operational Notes",
        "type": "textarea",
        "required": false
      }
    ]
  },
  {
    "formId": "FORM_MOD_OCC_SHELL_ENTRY",
    "moduleId": "MOD_OCC_SHELL",
    "productId": "JUMO-CONTROL",
    "title": "Universal Sovereign Platform Host Master Record Form",
    "fields": [
      {
        "name": "referenceNumber",
        "label": "Reference Code",
        "type": "text",
        "required": true
      },
      {
        "name": "entityName",
        "label": "Entity / Account Name",
        "type": "text",
        "required": true
      },
      {
        "name": "category",
        "label": "Category / Classification",
        "type": "select",
        "options": [
          "Primary",
          "Secondary",
          "General",
          "Restricted"
        ],
        "required": true
      },
      {
        "name": "status",
        "label": "Status",
        "type": "select",
        "options": [
          "ACTIVE",
          "PENDING",
          "LOCKED"
        ],
        "required": true
      },
      {
        "name": "notes",
        "label": "Operational Notes",
        "type": "textarea",
        "required": false
      }
    ]
  }
], "UNIVERSAL_FORM_REGISTRY");
