import { createRegistryCollection, RegistryCollection, safeFind, safeFilter } from './UniversalRegistryContract';
export const UniversalDashboardRegistry = createRegistryCollection([
  {
    "dashboardId": "DASH_MOD_FT_AGENT_BANKING_EXECUTIVE",
    "moduleId": "MOD_FT_AGENT_BANKING",
    "productId": "JUMO-FINTECH",
    "title": "Agent Banking Executive Dashboard",
    "kpis": [
      {
        "label": "Active Volume",
        "value": "1,240",
        "change": "+5.2%"
      },
      {
        "label": "Audit Parity",
        "value": "100.0%",
        "change": "PASS"
      },
      {
        "label": "Pending Approvals",
        "value": "3",
        "change": "-1"
      }
    ]
  },
  {
    "dashboardId": "DASH_MOD_FT_AGRICULTURAL_FINANCE_EXECUTIVE",
    "moduleId": "MOD_FT_AGRICULTURAL_FINANCE",
    "productId": "JUMO-FINTECH",
    "title": "Agricultural Finance Executive Dashboard",
    "kpis": [
      {
        "label": "Active Volume",
        "value": "1,240",
        "change": "+5.2%"
      },
      {
        "label": "Audit Parity",
        "value": "100.0%",
        "change": "PASS"
      },
      {
        "label": "Pending Approvals",
        "value": "3",
        "change": "-1"
      }
    ]
  },
  {
    "dashboardId": "DASH_MOD_FT_ATM_SELF_SERVICE_EXECUTIVE",
    "moduleId": "MOD_FT_ATM_SELF_SERVICE",
    "productId": "JUMO-FINTECH",
    "title": "Atm Self Service Executive Dashboard",
    "kpis": [
      {
        "label": "Active Volume",
        "value": "1,240",
        "change": "+5.2%"
      },
      {
        "label": "Audit Parity",
        "value": "100.0%",
        "change": "PASS"
      },
      {
        "label": "Pending Approvals",
        "value": "3",
        "change": "-1"
      }
    ]
  },
  {
    "dashboardId": "DASH_MOD_FT_BANK_PAYMENTS_EXECUTIVE",
    "moduleId": "MOD_FT_BANK_PAYMENTS",
    "productId": "JUMO-FINTECH",
    "title": "Bank Payments Executive Dashboard",
    "kpis": [
      {
        "label": "Active Volume",
        "value": "1,240",
        "change": "+5.2%"
      },
      {
        "label": "Audit Parity",
        "value": "100.0%",
        "change": "PASS"
      },
      {
        "label": "Pending Approvals",
        "value": "3",
        "change": "-1"
      }
    ]
  },
  {
    "dashboardId": "DASH_MOD_FT_BILL_PAYMENTS_EXECUTIVE",
    "moduleId": "MOD_FT_BILL_PAYMENTS",
    "productId": "JUMO-FINTECH",
    "title": "Bill Payments Executive Dashboard",
    "kpis": [
      {
        "label": "Active Volume",
        "value": "1,240",
        "change": "+5.2%"
      },
      {
        "label": "Audit Parity",
        "value": "100.0%",
        "change": "PASS"
      },
      {
        "label": "Pending Approvals",
        "value": "3",
        "change": "-1"
      }
    ]
  },
  {
    "dashboardId": "DASH_MOD_FT_CAPITAL_MARKETS_EXECUTIVE",
    "moduleId": "MOD_FT_CAPITAL_MARKETS",
    "productId": "JUMO-FINTECH",
    "title": "Capital Markets Executive Dashboard",
    "kpis": [
      {
        "label": "Active Volume",
        "value": "1,240",
        "change": "+5.2%"
      },
      {
        "label": "Audit Parity",
        "value": "100.0%",
        "change": "PASS"
      },
      {
        "label": "Pending Approvals",
        "value": "3",
        "change": "-1"
      }
    ]
  },
  {
    "dashboardId": "DASH_MOD_FT_CARDS_EXECUTIVE",
    "moduleId": "MOD_FT_CARDS",
    "productId": "JUMO-FINTECH",
    "title": "Cards Executive Dashboard",
    "kpis": [
      {
        "label": "Active Volume",
        "value": "1,240",
        "change": "+5.2%"
      },
      {
        "label": "Audit Parity",
        "value": "100.0%",
        "change": "PASS"
      },
      {
        "label": "Pending Approvals",
        "value": "3",
        "change": "-1"
      }
    ]
  },
  {
    "dashboardId": "DASH_MOD_FT_COLLECTIONS_EXECUTIVE",
    "moduleId": "MOD_FT_COLLECTIONS",
    "productId": "JUMO-FINTECH",
    "title": "Collections Executive Dashboard",
    "kpis": [
      {
        "label": "Active Volume",
        "value": "1,240",
        "change": "+5.2%"
      },
      {
        "label": "Audit Parity",
        "value": "100.0%",
        "change": "PASS"
      },
      {
        "label": "Pending Approvals",
        "value": "3",
        "change": "-1"
      }
    ]
  },
  {
    "dashboardId": "DASH_MOD_FT_COMPLIANCE_EXECUTIVE",
    "moduleId": "MOD_FT_COMPLIANCE",
    "productId": "JUMO-FINTECH",
    "title": "Compliance Executive Dashboard",
    "kpis": [
      {
        "label": "Active Volume",
        "value": "1,240",
        "change": "+5.2%"
      },
      {
        "label": "Audit Parity",
        "value": "100.0%",
        "change": "PASS"
      },
      {
        "label": "Pending Approvals",
        "value": "3",
        "change": "-1"
      }
    ]
  },
  {
    "dashboardId": "DASH_MOD_FT_CROSS_BORDER_EXECUTIVE",
    "moduleId": "MOD_FT_CROSS_BORDER",
    "productId": "JUMO-FINTECH",
    "title": "Cross Border Executive Dashboard",
    "kpis": [
      {
        "label": "Active Volume",
        "value": "1,240",
        "change": "+5.2%"
      },
      {
        "label": "Audit Parity",
        "value": "100.0%",
        "change": "PASS"
      },
      {
        "label": "Pending Approvals",
        "value": "3",
        "change": "-1"
      }
    ]
  },
  {
    "dashboardId": "DASH_MOD_FT_DATA_INTELLIGENCE_EXECUTIVE",
    "moduleId": "MOD_FT_DATA_INTELLIGENCE",
    "productId": "JUMO-FINTECH",
    "title": "Data Intelligence Executive Dashboard",
    "kpis": [
      {
        "label": "Active Volume",
        "value": "1,240",
        "change": "+5.2%"
      },
      {
        "label": "Audit Parity",
        "value": "100.0%",
        "change": "PASS"
      },
      {
        "label": "Pending Approvals",
        "value": "3",
        "change": "-1"
      }
    ]
  },
  {
    "dashboardId": "DASH_MOD_FT_DEVELOPER_API_EXECUTIVE",
    "moduleId": "MOD_FT_DEVELOPER_API",
    "productId": "JUMO-FINTECH",
    "title": "Developer Api Executive Dashboard",
    "kpis": [
      {
        "label": "Active Volume",
        "value": "1,240",
        "change": "+5.2%"
      },
      {
        "label": "Audit Parity",
        "value": "100.0%",
        "change": "PASS"
      },
      {
        "label": "Pending Approvals",
        "value": "3",
        "change": "-1"
      }
    ]
  },
  {
    "dashboardId": "DASH_MOD_FT_DIGITAL_BANKING_EXECUTIVE",
    "moduleId": "MOD_FT_DIGITAL_BANKING",
    "productId": "JUMO-FINTECH",
    "title": "Digital Banking Executive Dashboard",
    "kpis": [
      {
        "label": "Active Volume",
        "value": "1,240",
        "change": "+5.2%"
      },
      {
        "label": "Audit Parity",
        "value": "100.0%",
        "change": "PASS"
      },
      {
        "label": "Pending Approvals",
        "value": "3",
        "change": "-1"
      }
    ]
  },
  {
    "dashboardId": "DASH_MOD_FT_DIGITAL_WALLETS_EXECUTIVE",
    "moduleId": "MOD_FT_DIGITAL_WALLETS",
    "productId": "JUMO-FINTECH",
    "title": "Digital Wallets Executive Dashboard",
    "kpis": [
      {
        "label": "Active Volume",
        "value": "1,240",
        "change": "+5.2%"
      },
      {
        "label": "Audit Parity",
        "value": "100.0%",
        "change": "PASS"
      },
      {
        "label": "Pending Approvals",
        "value": "3",
        "change": "-1"
      }
    ]
  },
  {
    "dashboardId": "DASH_MOD_FT_EMBEDDED_FINANCE_EXECUTIVE",
    "moduleId": "MOD_FT_EMBEDDED_FINANCE",
    "productId": "JUMO-FINTECH",
    "title": "Embedded Finance Executive Dashboard",
    "kpis": [
      {
        "label": "Active Volume",
        "value": "1,240",
        "change": "+5.2%"
      },
      {
        "label": "Audit Parity",
        "value": "100.0%",
        "change": "PASS"
      },
      {
        "label": "Pending Approvals",
        "value": "3",
        "change": "-1"
      }
    ]
  },
  {
    "dashboardId": "DASH_MOD_FT_FINANCIAL_ACCOUNTING_EXECUTIVE",
    "moduleId": "MOD_FT_FINANCIAL_ACCOUNTING",
    "productId": "JUMO-FINTECH",
    "title": "Financial Accounting Executive Dashboard",
    "kpis": [
      {
        "label": "Active Volume",
        "value": "1,240",
        "change": "+5.2%"
      },
      {
        "label": "Audit Parity",
        "value": "100.0%",
        "change": "PASS"
      },
      {
        "label": "Pending Approvals",
        "value": "3",
        "change": "-1"
      }
    ]
  },
  {
    "dashboardId": "DASH_MOD_FT_FX_EXECUTIVE",
    "moduleId": "MOD_FT_FX",
    "productId": "JUMO-FINTECH",
    "title": "Fx Executive Dashboard",
    "kpis": [
      {
        "label": "Active Volume",
        "value": "1,240",
        "change": "+5.2%"
      },
      {
        "label": "Audit Parity",
        "value": "100.0%",
        "change": "PASS"
      },
      {
        "label": "Pending Approvals",
        "value": "3",
        "change": "-1"
      }
    ]
  },
  {
    "dashboardId": "DASH_MOD_FT_GLOBAL_ACCOUNTS_EXECUTIVE",
    "moduleId": "MOD_FT_GLOBAL_ACCOUNTS",
    "productId": "JUMO-FINTECH",
    "title": "Global Accounts Executive Dashboard",
    "kpis": [
      {
        "label": "Active Volume",
        "value": "1,240",
        "change": "+5.2%"
      },
      {
        "label": "Audit Parity",
        "value": "100.0%",
        "change": "PASS"
      },
      {
        "label": "Pending Approvals",
        "value": "3",
        "change": "-1"
      }
    ]
  },
  {
    "dashboardId": "DASH_MOD_FT_INSURANCE_EXECUTIVE",
    "moduleId": "MOD_FT_INSURANCE",
    "productId": "JUMO-FINTECH",
    "title": "Insurance Executive Dashboard",
    "kpis": [
      {
        "label": "Active Volume",
        "value": "1,240",
        "change": "+5.2%"
      },
      {
        "label": "Audit Parity",
        "value": "100.0%",
        "change": "PASS"
      },
      {
        "label": "Pending Approvals",
        "value": "3",
        "change": "-1"
      }
    ]
  },
  {
    "dashboardId": "DASH_MOD_FT_INVESTMENT_EXECUTIVE",
    "moduleId": "MOD_FT_INVESTMENT",
    "productId": "JUMO-FINTECH",
    "title": "Investment Executive Dashboard",
    "kpis": [
      {
        "label": "Active Volume",
        "value": "1,240",
        "change": "+5.2%"
      },
      {
        "label": "Audit Parity",
        "value": "100.0%",
        "change": "PASS"
      },
      {
        "label": "Pending Approvals",
        "value": "3",
        "change": "-1"
      }
    ]
  },
  {
    "dashboardId": "DASH_MOD_FT_LENDING_EXECUTIVE",
    "moduleId": "MOD_FT_LENDING",
    "productId": "JUMO-FINTECH",
    "title": "Lending Executive Dashboard",
    "kpis": [
      {
        "label": "Active Volume",
        "value": "1,240",
        "change": "+5.2%"
      },
      {
        "label": "Audit Parity",
        "value": "100.0%",
        "change": "PASS"
      },
      {
        "label": "Pending Approvals",
        "value": "3",
        "change": "-1"
      }
    ]
  },
  {
    "dashboardId": "DASH_MOD_FT_MERCHANT_ACQUIRING_EXECUTIVE",
    "moduleId": "MOD_FT_MERCHANT_ACQUIRING",
    "productId": "JUMO-FINTECH",
    "title": "Merchant Acquiring Executive Dashboard",
    "kpis": [
      {
        "label": "Active Volume",
        "value": "1,240",
        "change": "+5.2%"
      },
      {
        "label": "Audit Parity",
        "value": "100.0%",
        "change": "PASS"
      },
      {
        "label": "Pending Approvals",
        "value": "3",
        "change": "-1"
      }
    ]
  },
  {
    "dashboardId": "DASH_MOD_FT_MERCHANT_SERVICES_EXECUTIVE",
    "moduleId": "MOD_FT_MERCHANT_SERVICES",
    "productId": "JUMO-FINTECH",
    "title": "Merchant Services Executive Dashboard",
    "kpis": [
      {
        "label": "Active Volume",
        "value": "1,240",
        "change": "+5.2%"
      },
      {
        "label": "Audit Parity",
        "value": "100.0%",
        "change": "PASS"
      },
      {
        "label": "Pending Approvals",
        "value": "3",
        "change": "-1"
      }
    ]
  },
  {
    "dashboardId": "DASH_MOD_FT_MICROFINANCE_EXECUTIVE",
    "moduleId": "MOD_FT_MICROFINANCE",
    "productId": "JUMO-FINTECH",
    "title": "Microfinance Executive Dashboard",
    "kpis": [
      {
        "label": "Active Volume",
        "value": "1,240",
        "change": "+5.2%"
      },
      {
        "label": "Audit Parity",
        "value": "100.0%",
        "change": "PASS"
      },
      {
        "label": "Pending Approvals",
        "value": "3",
        "change": "-1"
      }
    ]
  },
  {
    "dashboardId": "DASH_MOD_FT_MOBILE_MONEY_EXECUTIVE",
    "moduleId": "MOD_FT_MOBILE_MONEY",
    "productId": "JUMO-FINTECH",
    "title": "Mobile Money Executive Dashboard",
    "kpis": [
      {
        "label": "Active Volume",
        "value": "1,240",
        "change": "+5.2%"
      },
      {
        "label": "Audit Parity",
        "value": "100.0%",
        "change": "PASS"
      },
      {
        "label": "Pending Approvals",
        "value": "3",
        "change": "-1"
      }
    ]
  },
  {
    "dashboardId": "DASH_MOD_FT_MULTI_CURRENCY_EXECUTIVE",
    "moduleId": "MOD_FT_MULTI_CURRENCY",
    "productId": "JUMO-FINTECH",
    "title": "Multi Currency Executive Dashboard",
    "kpis": [
      {
        "label": "Active Volume",
        "value": "1,240",
        "change": "+5.2%"
      },
      {
        "label": "Audit Parity",
        "value": "100.0%",
        "change": "PASS"
      },
      {
        "label": "Pending Approvals",
        "value": "3",
        "change": "-1"
      }
    ]
  },
  {
    "dashboardId": "DASH_MOD_FT_PAYMENT_GATEWAY_EXECUTIVE",
    "moduleId": "MOD_FT_PAYMENT_GATEWAY",
    "productId": "JUMO-FINTECH",
    "title": "Payment Gateway Executive Dashboard",
    "kpis": [
      {
        "label": "Active Volume",
        "value": "1,240",
        "change": "+5.2%"
      },
      {
        "label": "Audit Parity",
        "value": "100.0%",
        "change": "PASS"
      },
      {
        "label": "Pending Approvals",
        "value": "3",
        "change": "-1"
      }
    ]
  },
  {
    "dashboardId": "DASH_MOD_FT_PAYMENT_SWITCHING_EXECUTIVE",
    "moduleId": "MOD_FT_PAYMENT_SWITCHING",
    "productId": "JUMO-FINTECH",
    "title": "Payment Switching Executive Dashboard",
    "kpis": [
      {
        "label": "Active Volume",
        "value": "1,240",
        "change": "+5.2%"
      },
      {
        "label": "Audit Parity",
        "value": "100.0%",
        "change": "PASS"
      },
      {
        "label": "Pending Approvals",
        "value": "3",
        "change": "-1"
      }
    ]
  },
  {
    "dashboardId": "DASH_MOD_FT_PAYOUTS_EXECUTIVE",
    "moduleId": "MOD_FT_PAYOUTS",
    "productId": "JUMO-FINTECH",
    "title": "Payouts Executive Dashboard",
    "kpis": [
      {
        "label": "Active Volume",
        "value": "1,240",
        "change": "+5.2%"
      },
      {
        "label": "Audit Parity",
        "value": "100.0%",
        "change": "PASS"
      },
      {
        "label": "Pending Approvals",
        "value": "3",
        "change": "-1"
      }
    ]
  },
  {
    "dashboardId": "DASH_MOD_FT_PAYROLL_EXECUTIVE",
    "moduleId": "MOD_FT_PAYROLL",
    "productId": "JUMO-FINTECH",
    "title": "Payroll Executive Dashboard",
    "kpis": [
      {
        "label": "Active Volume",
        "value": "1,240",
        "change": "+5.2%"
      },
      {
        "label": "Audit Parity",
        "value": "100.0%",
        "change": "PASS"
      },
      {
        "label": "Pending Approvals",
        "value": "3",
        "change": "-1"
      }
    ]
  },
  {
    "dashboardId": "DASH_MOD_FT_REMITTANCES_EXECUTIVE",
    "moduleId": "MOD_FT_REMITTANCES",
    "productId": "JUMO-FINTECH",
    "title": "Remittances Executive Dashboard",
    "kpis": [
      {
        "label": "Active Volume",
        "value": "1,240",
        "change": "+5.2%"
      },
      {
        "label": "Audit Parity",
        "value": "100.0%",
        "change": "PASS"
      },
      {
        "label": "Pending Approvals",
        "value": "3",
        "change": "-1"
      }
    ]
  },
  {
    "dashboardId": "DASH_MOD_FT_SACCO_EXECUTIVE",
    "moduleId": "MOD_FT_SACCO",
    "productId": "JUMO-FINTECH",
    "title": "Sacco Executive Dashboard",
    "kpis": [
      {
        "label": "Active Volume",
        "value": "1,240",
        "change": "+5.2%"
      },
      {
        "label": "Audit Parity",
        "value": "100.0%",
        "change": "PASS"
      },
      {
        "label": "Pending Approvals",
        "value": "3",
        "change": "-1"
      }
    ]
  },
  {
    "dashboardId": "DASH_MOD_FT_SAVINGS_EXECUTIVE",
    "moduleId": "MOD_FT_SAVINGS",
    "productId": "JUMO-FINTECH",
    "title": "Savings Executive Dashboard",
    "kpis": [
      {
        "label": "Active Volume",
        "value": "1,240",
        "change": "+5.2%"
      },
      {
        "label": "Audit Parity",
        "value": "100.0%",
        "change": "PASS"
      },
      {
        "label": "Pending Approvals",
        "value": "3",
        "change": "-1"
      }
    ]
  },
  {
    "dashboardId": "DASH_MOD_FT_SECURITIES_CUSTODY_EXECUTIVE",
    "moduleId": "MOD_FT_SECURITIES_CUSTODY",
    "productId": "JUMO-FINTECH",
    "title": "Securities Custody Executive Dashboard",
    "kpis": [
      {
        "label": "Active Volume",
        "value": "1,240",
        "change": "+5.2%"
      },
      {
        "label": "Audit Parity",
        "value": "100.0%",
        "change": "PASS"
      },
      {
        "label": "Pending Approvals",
        "value": "3",
        "change": "-1"
      }
    ]
  },
  {
    "dashboardId": "DASH_MOD_FT_STABLECOIN_EXECUTIVE",
    "moduleId": "MOD_FT_STABLECOIN",
    "productId": "JUMO-FINTECH",
    "title": "Stablecoin Executive Dashboard",
    "kpis": [
      {
        "label": "Active Volume",
        "value": "1,240",
        "change": "+5.2%"
      },
      {
        "label": "Audit Parity",
        "value": "100.0%",
        "change": "PASS"
      },
      {
        "label": "Pending Approvals",
        "value": "3",
        "change": "-1"
      }
    ]
  },
  {
    "dashboardId": "DASH_MOD_FT_TAX_REVENUE_EXECUTIVE",
    "moduleId": "MOD_FT_TAX_REVENUE",
    "productId": "JUMO-FINTECH",
    "title": "Tax Revenue Executive Dashboard",
    "kpis": [
      {
        "label": "Active Volume",
        "value": "1,240",
        "change": "+5.2%"
      },
      {
        "label": "Audit Parity",
        "value": "100.0%",
        "change": "PASS"
      },
      {
        "label": "Pending Approvals",
        "value": "3",
        "change": "-1"
      }
    ]
  },
  {
    "dashboardId": "DASH_MOD_FT_TRADE_FINANCE_EXECUTIVE",
    "moduleId": "MOD_FT_TRADE_FINANCE",
    "productId": "JUMO-FINTECH",
    "title": "Trade Finance Executive Dashboard",
    "kpis": [
      {
        "label": "Active Volume",
        "value": "1,240",
        "change": "+5.2%"
      },
      {
        "label": "Audit Parity",
        "value": "100.0%",
        "change": "PASS"
      },
      {
        "label": "Pending Approvals",
        "value": "3",
        "change": "-1"
      }
    ]
  },
  {
    "dashboardId": "DASH_MOD_FT_TREASURY_EXECUTIVE",
    "moduleId": "MOD_FT_TREASURY",
    "productId": "JUMO-FINTECH",
    "title": "Treasury Executive Dashboard",
    "kpis": [
      {
        "label": "Active Volume",
        "value": "1,240",
        "change": "+5.2%"
      },
      {
        "label": "Audit Parity",
        "value": "100.0%",
        "change": "PASS"
      },
      {
        "label": "Pending Approvals",
        "value": "3",
        "change": "-1"
      }
    ]
  },
  {
    "dashboardId": "DASH_MOD_NP_ECD_MILESTONES_EXECUTIVE",
    "moduleId": "MOD_NP_ECD_MILESTONES",
    "productId": "JUMO-NURSERY-PRIMARY-ERP",
    "title": "Early Childhood Development & Milestones Executive Dashboard",
    "kpis": [
      {
        "label": "Active Volume",
        "value": "1,240",
        "change": "+5.2%"
      },
      {
        "label": "Audit Parity",
        "value": "100.0%",
        "change": "PASS"
      },
      {
        "label": "Pending Approvals",
        "value": "3",
        "change": "-1"
      }
    ]
  },
  {
    "dashboardId": "DASH_MOD_NP_PRIMARY_ACADEMICS_EXECUTIVE",
    "moduleId": "MOD_NP_PRIMARY_ACADEMICS",
    "productId": "JUMO-NURSERY-PRIMARY-ERP",
    "title": "Primary Curriculum & Assessment Executive Dashboard",
    "kpis": [
      {
        "label": "Active Volume",
        "value": "1,240",
        "change": "+5.2%"
      },
      {
        "label": "Audit Parity",
        "value": "100.0%",
        "change": "PASS"
      },
      {
        "label": "Pending Approvals",
        "value": "3",
        "change": "-1"
      }
    ]
  },
  {
    "dashboardId": "DASH_MOD_NP_PRIMARY_DOS_EXECUTIVE",
    "moduleId": "MOD_NP_PRIMARY_DOS",
    "productId": "JUMO-NURSERY-PRIMARY-ERP",
    "title": "Primary Studies & Timetabling Executive Dashboard",
    "kpis": [
      {
        "label": "Active Volume",
        "value": "1,240",
        "change": "+5.2%"
      },
      {
        "label": "Audit Parity",
        "value": "100.0%",
        "change": "PASS"
      },
      {
        "label": "Pending Approvals",
        "value": "3",
        "change": "-1"
      }
    ]
  },
  {
    "dashboardId": "DASH_MOD_NP_ADMISSIONS_EXECUTIVE",
    "moduleId": "MOD_NP_ADMISSIONS",
    "productId": "JUMO-NURSERY-PRIMARY-ERP",
    "title": "Consolidated Student Admissions Executive Dashboard",
    "kpis": [
      {
        "label": "Active Volume",
        "value": "1,240",
        "change": "+5.2%"
      },
      {
        "label": "Audit Parity",
        "value": "100.0%",
        "change": "PASS"
      },
      {
        "label": "Pending Approvals",
        "value": "3",
        "change": "-1"
      }
    ]
  },
  {
    "dashboardId": "DASH_MOD_NP_BURSARY_EXECUTIVE",
    "moduleId": "MOD_NP_BURSARY",
    "productId": "JUMO-NURSERY-PRIMARY-ERP",
    "title": "Fee Invoicing & Bursar Ledger Executive Dashboard",
    "kpis": [
      {
        "label": "Active Volume",
        "value": "1,240",
        "change": "+5.2%"
      },
      {
        "label": "Audit Parity",
        "value": "100.0%",
        "change": "PASS"
      },
      {
        "label": "Pending Approvals",
        "value": "3",
        "change": "-1"
      }
    ]
  },
  {
    "dashboardId": "DASH_MOD_NP_SAFEGUARDING_EXECUTIVE",
    "moduleId": "MOD_NP_SAFEGUARDING",
    "productId": "JUMO-NURSERY-PRIMARY-ERP",
    "title": "Child Protection & Safeguarding Executive Dashboard",
    "kpis": [
      {
        "label": "Active Volume",
        "value": "1,240",
        "change": "+5.2%"
      },
      {
        "label": "Audit Parity",
        "value": "100.0%",
        "change": "PASS"
      },
      {
        "label": "Pending Approvals",
        "value": "3",
        "change": "-1"
      }
    ]
  },
  {
    "dashboardId": "DASH_MOD_NP_CLINIC_EXECUTIVE",
    "moduleId": "MOD_NP_CLINIC",
    "productId": "JUMO-NURSERY-PRIMARY-ERP",
    "title": "Infirmary & Pediatric Health Executive Dashboard",
    "kpis": [
      {
        "label": "Active Volume",
        "value": "1,240",
        "change": "+5.2%"
      },
      {
        "label": "Audit Parity",
        "value": "100.0%",
        "change": "PASS"
      },
      {
        "label": "Pending Approvals",
        "value": "3",
        "change": "-1"
      }
    ]
  },
  {
    "dashboardId": "DASH_MOD_NP_CATERING_EXECUTIVE",
    "moduleId": "MOD_NP_CATERING",
    "productId": "JUMO-NURSERY-PRIMARY-ERP",
    "title": "Nutrition & School Dining Executive Dashboard",
    "kpis": [
      {
        "label": "Active Volume",
        "value": "1,240",
        "change": "+5.2%"
      },
      {
        "label": "Audit Parity",
        "value": "100.0%",
        "change": "PASS"
      },
      {
        "label": "Pending Approvals",
        "value": "3",
        "change": "-1"
      }
    ]
  },
  {
    "dashboardId": "DASH_MOD_NP_TRANSPORT_EXECUTIVE",
    "moduleId": "MOD_NP_TRANSPORT",
    "productId": "JUMO-NURSERY-PRIMARY-ERP",
    "title": "Student Bus Routing & Tracking Executive Dashboard",
    "kpis": [
      {
        "label": "Active Volume",
        "value": "1,240",
        "change": "+5.2%"
      },
      {
        "label": "Audit Parity",
        "value": "100.0%",
        "change": "PASS"
      },
      {
        "label": "Pending Approvals",
        "value": "3",
        "change": "-1"
      }
    ]
  },
  {
    "dashboardId": "DASH_MOD_SEC_HOD_EXECUTIVE",
    "moduleId": "MOD_SEC_HOD",
    "productId": "JUMO-SECONDARY-ERP",
    "title": "Academic Departmental Heads (HOD) Executive Dashboard",
    "kpis": [
      {
        "label": "Active Volume",
        "value": "1,240",
        "change": "+5.2%"
      },
      {
        "label": "Audit Parity",
        "value": "100.0%",
        "change": "PASS"
      },
      {
        "label": "Pending Approvals",
        "value": "3",
        "change": "-1"
      }
    ]
  },
  {
    "dashboardId": "DASH_MOD_SEC_REGISTRAR_EXECUTIVE",
    "moduleId": "MOD_SEC_REGISTRAR",
    "productId": "JUMO-SECONDARY-ERP",
    "title": "Secondary Registry & Matriculation Executive Dashboard",
    "kpis": [
      {
        "label": "Active Volume",
        "value": "1,240",
        "change": "+5.2%"
      },
      {
        "label": "Audit Parity",
        "value": "100.0%",
        "change": "PASS"
      },
      {
        "label": "Pending Approvals",
        "value": "3",
        "change": "-1"
      }
    ]
  },
  {
    "dashboardId": "DASH_MOD_SEC_BURSARY_EXECUTIVE",
    "moduleId": "MOD_SEC_BURSARY",
    "productId": "JUMO-SECONDARY-ERP",
    "title": "Secondary Bursar & Tuitions Executive Dashboard",
    "kpis": [
      {
        "label": "Active Volume",
        "value": "1,240",
        "change": "+5.2%"
      },
      {
        "label": "Audit Parity",
        "value": "100.0%",
        "change": "PASS"
      },
      {
        "label": "Pending Approvals",
        "value": "3",
        "change": "-1"
      }
    ]
  },
  {
    "dashboardId": "DASH_MOD_SEC_SENATE_EXECUTIVE",
    "moduleId": "MOD_SEC_SENATE",
    "productId": "JUMO-SECONDARY-ERP",
    "title": "Secondary Academic Senate Executive Dashboard",
    "kpis": [
      {
        "label": "Active Volume",
        "value": "1,240",
        "change": "+5.2%"
      },
      {
        "label": "Audit Parity",
        "value": "100.0%",
        "change": "PASS"
      },
      {
        "label": "Pending Approvals",
        "value": "3",
        "change": "-1"
      }
    ]
  },
  {
    "dashboardId": "DASH_MOD_SEC_SERVICE_EXECUTIVE",
    "moduleId": "MOD_SEC_SERVICE",
    "productId": "JUMO-SECONDARY-ERP",
    "title": "Secondary Core Domain Service Executive Dashboard",
    "kpis": [
      {
        "label": "Active Volume",
        "value": "1,240",
        "change": "+5.2%"
      },
      {
        "label": "Audit Parity",
        "value": "100.0%",
        "change": "PASS"
      },
      {
        "label": "Pending Approvals",
        "value": "3",
        "change": "-1"
      }
    ]
  },
  {
    "dashboardId": "DASH_MOD_ALUM_REGISTRY_EXECUTIVE",
    "moduleId": "MOD_ALUM_REGISTRY",
    "productId": "JUMO-ALUMNI",
    "title": "Alumni Census & Graduate Registry Executive Dashboard",
    "kpis": [
      {
        "label": "Active Volume",
        "value": "1,240",
        "change": "+5.2%"
      },
      {
        "label": "Audit Parity",
        "value": "100.0%",
        "change": "PASS"
      },
      {
        "label": "Pending Approvals",
        "value": "3",
        "change": "-1"
      }
    ]
  },
  {
    "dashboardId": "DASH_MOD_ALUM_GIVING_EXECUTIVE",
    "moduleId": "MOD_ALUM_GIVING",
    "productId": "JUMO-ALUMNI",
    "title": "Giving Campaigns & Endowments Executive Dashboard",
    "kpis": [
      {
        "label": "Active Volume",
        "value": "1,240",
        "change": "+5.2%"
      },
      {
        "label": "Audit Parity",
        "value": "100.0%",
        "change": "PASS"
      },
      {
        "label": "Pending Approvals",
        "value": "3",
        "change": "-1"
      }
    ]
  },
  {
    "dashboardId": "DASH_MOD_ALUM_CHAPTERS_EXECUTIVE",
    "moduleId": "MOD_ALUM_CHAPTERS",
    "productId": "JUMO-ALUMNI",
    "title": "Global Chapters & Diaspora Network Executive Dashboard",
    "kpis": [
      {
        "label": "Active Volume",
        "value": "1,240",
        "change": "+5.2%"
      },
      {
        "label": "Audit Parity",
        "value": "100.0%",
        "change": "PASS"
      },
      {
        "label": "Pending Approvals",
        "value": "3",
        "change": "-1"
      }
    ]
  },
  {
    "dashboardId": "DASH_MOD_ALUM_CAREER_EXECUTIVE",
    "moduleId": "MOD_ALUM_CAREER",
    "productId": "JUMO-ALUMNI",
    "title": "Career Services & Mentorship Executive Dashboard",
    "kpis": [
      {
        "label": "Active Volume",
        "value": "1,240",
        "change": "+5.2%"
      },
      {
        "label": "Audit Parity",
        "value": "100.0%",
        "change": "PASS"
      },
      {
        "label": "Pending Approvals",
        "value": "3",
        "change": "-1"
      }
    ]
  },
  {
    "dashboardId": "DASH_MOD_ALUM_DASHBOARD_EXECUTIVE",
    "moduleId": "MOD_ALUM_DASHBOARD",
    "productId": "JUMO-ALUMNI",
    "title": "Alumni Intelligence Dashboard Executive Dashboard",
    "kpis": [
      {
        "label": "Active Volume",
        "value": "1,240",
        "change": "+5.2%"
      },
      {
        "label": "Audit Parity",
        "value": "100.0%",
        "change": "PASS"
      },
      {
        "label": "Pending Approvals",
        "value": "3",
        "change": "-1"
      }
    ]
  },
  {
    "dashboardId": "DASH_MOD_CH_MEMBERSHIP_EXECUTIVE",
    "moduleId": "MOD_CH_MEMBERSHIP",
    "productId": "JUMO-CHURCH",
    "title": "Congregation Directory & Census Executive Dashboard",
    "kpis": [
      {
        "label": "Active Volume",
        "value": "1,240",
        "change": "+5.2%"
      },
      {
        "label": "Audit Parity",
        "value": "100.0%",
        "change": "PASS"
      },
      {
        "label": "Pending Approvals",
        "value": "3",
        "change": "-1"
      }
    ]
  },
  {
    "dashboardId": "DASH_MOD_CH_FINANCE_EXECUTIVE",
    "moduleId": "MOD_CH_FINANCE",
    "productId": "JUMO-CHURCH",
    "title": "Tithes, Offerings & Diocesan Ledger Executive Dashboard",
    "kpis": [
      {
        "label": "Active Volume",
        "value": "1,240",
        "change": "+5.2%"
      },
      {
        "label": "Audit Parity",
        "value": "100.0%",
        "change": "PASS"
      },
      {
        "label": "Pending Approvals",
        "value": "3",
        "change": "-1"
      }
    ]
  },
  {
    "dashboardId": "DASH_MOD_CH_PASTORAL_EXECUTIVE",
    "moduleId": "MOD_CH_PASTORAL",
    "productId": "JUMO-CHURCH",
    "title": "Pastoral Care & Visitation Tracking Executive Dashboard",
    "kpis": [
      {
        "label": "Active Volume",
        "value": "1,240",
        "change": "+5.2%"
      },
      {
        "label": "Audit Parity",
        "value": "100.0%",
        "change": "PASS"
      },
      {
        "label": "Pending Approvals",
        "value": "3",
        "change": "-1"
      }
    ]
  },
  {
    "dashboardId": "DASH_MOD_CH_EVENTS_EXECUTIVE",
    "moduleId": "MOD_CH_EVENTS",
    "productId": "JUMO-CHURCH",
    "title": "Liturgical Calendar & Event Operations Executive Dashboard",
    "kpis": [
      {
        "label": "Active Volume",
        "value": "1,240",
        "change": "+5.2%"
      },
      {
        "label": "Audit Parity",
        "value": "100.0%",
        "change": "PASS"
      },
      {
        "label": "Pending Approvals",
        "value": "3",
        "change": "-1"
      }
    ]
  },
  {
    "dashboardId": "DASH_MOD_CH_DASHBOARD_EXECUTIVE",
    "moduleId": "MOD_CH_DASHBOARD",
    "productId": "JUMO-CHURCH",
    "title": "Executive Diocesan Dashboard Executive Dashboard",
    "kpis": [
      {
        "label": "Active Volume",
        "value": "1,240",
        "change": "+5.2%"
      },
      {
        "label": "Audit Parity",
        "value": "100.0%",
        "change": "PASS"
      },
      {
        "label": "Pending Approvals",
        "value": "3",
        "change": "-1"
      }
    ]
  },
  {
    "dashboardId": "DASH_MOD_OCC_VERIFICATION_EXECUTIVE",
    "moduleId": "MOD_OCC_VERIFICATION",
    "productId": "JUMO-CONTROL",
    "title": "Ring-0 Verification & Integrity Executive Dashboard",
    "kpis": [
      {
        "label": "Active Volume",
        "value": "1,240",
        "change": "+5.2%"
      },
      {
        "label": "Audit Parity",
        "value": "100.0%",
        "change": "PASS"
      },
      {
        "label": "Pending Approvals",
        "value": "3",
        "change": "-1"
      }
    ]
  },
  {
    "dashboardId": "DASH_MOD_OCC_TRUST_EXECUTIVE",
    "moduleId": "MOD_OCC_TRUST",
    "productId": "JUMO-CONTROL",
    "title": "JUMO Trust Engine & Anti-Tamper Executive Dashboard",
    "kpis": [
      {
        "label": "Active Volume",
        "value": "1,240",
        "change": "+5.2%"
      },
      {
        "label": "Audit Parity",
        "value": "100.0%",
        "change": "PASS"
      },
      {
        "label": "Pending Approvals",
        "value": "3",
        "change": "-1"
      }
    ]
  },
  {
    "dashboardId": "DASH_MOD_OCC_FACTORY_EXECUTIVE",
    "moduleId": "MOD_OCC_FACTORY",
    "productId": "JUMO-CONTROL",
    "title": "ERP Template & Scaffolding Factory Executive Dashboard",
    "kpis": [
      {
        "label": "Active Volume",
        "value": "1,240",
        "change": "+5.2%"
      },
      {
        "label": "Audit Parity",
        "value": "100.0%",
        "change": "PASS"
      },
      {
        "label": "Pending Approvals",
        "value": "3",
        "change": "-1"
      }
    ]
  },
  {
    "dashboardId": "DASH_MOD_OCC_SHELL_EXECUTIVE",
    "moduleId": "MOD_OCC_SHELL",
    "productId": "JUMO-CONTROL",
    "title": "Universal Sovereign Platform Host Executive Dashboard",
    "kpis": [
      {
        "label": "Active Volume",
        "value": "1,240",
        "change": "+5.2%"
      },
      {
        "label": "Audit Parity",
        "value": "100.0%",
        "change": "PASS"
      },
      {
        "label": "Pending Approvals",
        "value": "3",
        "change": "-1"
      }
    ]
  }
], "UNIVERSAL_DASHBOARD_REGISTRY");
