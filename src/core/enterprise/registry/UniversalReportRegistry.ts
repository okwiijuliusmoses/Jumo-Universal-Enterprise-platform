import { createRegistryCollection, RegistryCollection, safeFind, safeFilter } from './UniversalRegistryContract';
export const UniversalReportRegistry = createRegistryCollection([
  {
    "reportId": "REP_MOD_FT_AGENT_BANKING_SUMMARY",
    "moduleId": "MOD_FT_AGENT_BANKING",
    "productId": "JUMO-FINTECH",
    "title": "Agent Banking Periodic Analytical Summary",
    "exportFormats": [
      "PDF",
      "CSV",
      "XLSX"
    ]
  },
  {
    "reportId": "REP_MOD_FT_AGRICULTURAL_FINANCE_SUMMARY",
    "moduleId": "MOD_FT_AGRICULTURAL_FINANCE",
    "productId": "JUMO-FINTECH",
    "title": "Agricultural Finance Periodic Analytical Summary",
    "exportFormats": [
      "PDF",
      "CSV",
      "XLSX"
    ]
  },
  {
    "reportId": "REP_MOD_FT_ATM_SELF_SERVICE_SUMMARY",
    "moduleId": "MOD_FT_ATM_SELF_SERVICE",
    "productId": "JUMO-FINTECH",
    "title": "Atm Self Service Periodic Analytical Summary",
    "exportFormats": [
      "PDF",
      "CSV",
      "XLSX"
    ]
  },
  {
    "reportId": "REP_MOD_FT_BANK_PAYMENTS_SUMMARY",
    "moduleId": "MOD_FT_BANK_PAYMENTS",
    "productId": "JUMO-FINTECH",
    "title": "Bank Payments Periodic Analytical Summary",
    "exportFormats": [
      "PDF",
      "CSV",
      "XLSX"
    ]
  },
  {
    "reportId": "REP_MOD_FT_BILL_PAYMENTS_SUMMARY",
    "moduleId": "MOD_FT_BILL_PAYMENTS",
    "productId": "JUMO-FINTECH",
    "title": "Bill Payments Periodic Analytical Summary",
    "exportFormats": [
      "PDF",
      "CSV",
      "XLSX"
    ]
  },
  {
    "reportId": "REP_MOD_FT_CAPITAL_MARKETS_SUMMARY",
    "moduleId": "MOD_FT_CAPITAL_MARKETS",
    "productId": "JUMO-FINTECH",
    "title": "Capital Markets Periodic Analytical Summary",
    "exportFormats": [
      "PDF",
      "CSV",
      "XLSX"
    ]
  },
  {
    "reportId": "REP_MOD_FT_CARDS_SUMMARY",
    "moduleId": "MOD_FT_CARDS",
    "productId": "JUMO-FINTECH",
    "title": "Cards Periodic Analytical Summary",
    "exportFormats": [
      "PDF",
      "CSV",
      "XLSX"
    ]
  },
  {
    "reportId": "REP_MOD_FT_COLLECTIONS_SUMMARY",
    "moduleId": "MOD_FT_COLLECTIONS",
    "productId": "JUMO-FINTECH",
    "title": "Collections Periodic Analytical Summary",
    "exportFormats": [
      "PDF",
      "CSV",
      "XLSX"
    ]
  },
  {
    "reportId": "REP_MOD_FT_COMPLIANCE_SUMMARY",
    "moduleId": "MOD_FT_COMPLIANCE",
    "productId": "JUMO-FINTECH",
    "title": "Compliance Periodic Analytical Summary",
    "exportFormats": [
      "PDF",
      "CSV",
      "XLSX"
    ]
  },
  {
    "reportId": "REP_MOD_FT_CROSS_BORDER_SUMMARY",
    "moduleId": "MOD_FT_CROSS_BORDER",
    "productId": "JUMO-FINTECH",
    "title": "Cross Border Periodic Analytical Summary",
    "exportFormats": [
      "PDF",
      "CSV",
      "XLSX"
    ]
  },
  {
    "reportId": "REP_MOD_FT_DATA_INTELLIGENCE_SUMMARY",
    "moduleId": "MOD_FT_DATA_INTELLIGENCE",
    "productId": "JUMO-FINTECH",
    "title": "Data Intelligence Periodic Analytical Summary",
    "exportFormats": [
      "PDF",
      "CSV",
      "XLSX"
    ]
  },
  {
    "reportId": "REP_MOD_FT_DEVELOPER_API_SUMMARY",
    "moduleId": "MOD_FT_DEVELOPER_API",
    "productId": "JUMO-FINTECH",
    "title": "Developer Api Periodic Analytical Summary",
    "exportFormats": [
      "PDF",
      "CSV",
      "XLSX"
    ]
  },
  {
    "reportId": "REP_MOD_FT_DIGITAL_BANKING_SUMMARY",
    "moduleId": "MOD_FT_DIGITAL_BANKING",
    "productId": "JUMO-FINTECH",
    "title": "Digital Banking Periodic Analytical Summary",
    "exportFormats": [
      "PDF",
      "CSV",
      "XLSX"
    ]
  },
  {
    "reportId": "REP_MOD_FT_DIGITAL_WALLETS_SUMMARY",
    "moduleId": "MOD_FT_DIGITAL_WALLETS",
    "productId": "JUMO-FINTECH",
    "title": "Digital Wallets Periodic Analytical Summary",
    "exportFormats": [
      "PDF",
      "CSV",
      "XLSX"
    ]
  },
  {
    "reportId": "REP_MOD_FT_EMBEDDED_FINANCE_SUMMARY",
    "moduleId": "MOD_FT_EMBEDDED_FINANCE",
    "productId": "JUMO-FINTECH",
    "title": "Embedded Finance Periodic Analytical Summary",
    "exportFormats": [
      "PDF",
      "CSV",
      "XLSX"
    ]
  },
  {
    "reportId": "REP_MOD_FT_FINANCIAL_ACCOUNTING_SUMMARY",
    "moduleId": "MOD_FT_FINANCIAL_ACCOUNTING",
    "productId": "JUMO-FINTECH",
    "title": "Financial Accounting Periodic Analytical Summary",
    "exportFormats": [
      "PDF",
      "CSV",
      "XLSX"
    ]
  },
  {
    "reportId": "REP_MOD_FT_FX_SUMMARY",
    "moduleId": "MOD_FT_FX",
    "productId": "JUMO-FINTECH",
    "title": "Fx Periodic Analytical Summary",
    "exportFormats": [
      "PDF",
      "CSV",
      "XLSX"
    ]
  },
  {
    "reportId": "REP_MOD_FT_GLOBAL_ACCOUNTS_SUMMARY",
    "moduleId": "MOD_FT_GLOBAL_ACCOUNTS",
    "productId": "JUMO-FINTECH",
    "title": "Global Accounts Periodic Analytical Summary",
    "exportFormats": [
      "PDF",
      "CSV",
      "XLSX"
    ]
  },
  {
    "reportId": "REP_MOD_FT_INSURANCE_SUMMARY",
    "moduleId": "MOD_FT_INSURANCE",
    "productId": "JUMO-FINTECH",
    "title": "Insurance Periodic Analytical Summary",
    "exportFormats": [
      "PDF",
      "CSV",
      "XLSX"
    ]
  },
  {
    "reportId": "REP_MOD_FT_INVESTMENT_SUMMARY",
    "moduleId": "MOD_FT_INVESTMENT",
    "productId": "JUMO-FINTECH",
    "title": "Investment Periodic Analytical Summary",
    "exportFormats": [
      "PDF",
      "CSV",
      "XLSX"
    ]
  },
  {
    "reportId": "REP_MOD_FT_LENDING_SUMMARY",
    "moduleId": "MOD_FT_LENDING",
    "productId": "JUMO-FINTECH",
    "title": "Lending Periodic Analytical Summary",
    "exportFormats": [
      "PDF",
      "CSV",
      "XLSX"
    ]
  },
  {
    "reportId": "REP_MOD_FT_MERCHANT_ACQUIRING_SUMMARY",
    "moduleId": "MOD_FT_MERCHANT_ACQUIRING",
    "productId": "JUMO-FINTECH",
    "title": "Merchant Acquiring Periodic Analytical Summary",
    "exportFormats": [
      "PDF",
      "CSV",
      "XLSX"
    ]
  },
  {
    "reportId": "REP_MOD_FT_MERCHANT_SERVICES_SUMMARY",
    "moduleId": "MOD_FT_MERCHANT_SERVICES",
    "productId": "JUMO-FINTECH",
    "title": "Merchant Services Periodic Analytical Summary",
    "exportFormats": [
      "PDF",
      "CSV",
      "XLSX"
    ]
  },
  {
    "reportId": "REP_MOD_FT_MICROFINANCE_SUMMARY",
    "moduleId": "MOD_FT_MICROFINANCE",
    "productId": "JUMO-FINTECH",
    "title": "Microfinance Periodic Analytical Summary",
    "exportFormats": [
      "PDF",
      "CSV",
      "XLSX"
    ]
  },
  {
    "reportId": "REP_MOD_FT_MOBILE_MONEY_SUMMARY",
    "moduleId": "MOD_FT_MOBILE_MONEY",
    "productId": "JUMO-FINTECH",
    "title": "Mobile Money Periodic Analytical Summary",
    "exportFormats": [
      "PDF",
      "CSV",
      "XLSX"
    ]
  },
  {
    "reportId": "REP_MOD_FT_MULTI_CURRENCY_SUMMARY",
    "moduleId": "MOD_FT_MULTI_CURRENCY",
    "productId": "JUMO-FINTECH",
    "title": "Multi Currency Periodic Analytical Summary",
    "exportFormats": [
      "PDF",
      "CSV",
      "XLSX"
    ]
  },
  {
    "reportId": "REP_MOD_FT_PAYMENT_GATEWAY_SUMMARY",
    "moduleId": "MOD_FT_PAYMENT_GATEWAY",
    "productId": "JUMO-FINTECH",
    "title": "Payment Gateway Periodic Analytical Summary",
    "exportFormats": [
      "PDF",
      "CSV",
      "XLSX"
    ]
  },
  {
    "reportId": "REP_MOD_FT_PAYMENT_SWITCHING_SUMMARY",
    "moduleId": "MOD_FT_PAYMENT_SWITCHING",
    "productId": "JUMO-FINTECH",
    "title": "Payment Switching Periodic Analytical Summary",
    "exportFormats": [
      "PDF",
      "CSV",
      "XLSX"
    ]
  },
  {
    "reportId": "REP_MOD_FT_PAYOUTS_SUMMARY",
    "moduleId": "MOD_FT_PAYOUTS",
    "productId": "JUMO-FINTECH",
    "title": "Payouts Periodic Analytical Summary",
    "exportFormats": [
      "PDF",
      "CSV",
      "XLSX"
    ]
  },
  {
    "reportId": "REP_MOD_FT_PAYROLL_SUMMARY",
    "moduleId": "MOD_FT_PAYROLL",
    "productId": "JUMO-FINTECH",
    "title": "Payroll Periodic Analytical Summary",
    "exportFormats": [
      "PDF",
      "CSV",
      "XLSX"
    ]
  },
  {
    "reportId": "REP_MOD_FT_REMITTANCES_SUMMARY",
    "moduleId": "MOD_FT_REMITTANCES",
    "productId": "JUMO-FINTECH",
    "title": "Remittances Periodic Analytical Summary",
    "exportFormats": [
      "PDF",
      "CSV",
      "XLSX"
    ]
  },
  {
    "reportId": "REP_MOD_FT_SACCO_SUMMARY",
    "moduleId": "MOD_FT_SACCO",
    "productId": "JUMO-FINTECH",
    "title": "Sacco Periodic Analytical Summary",
    "exportFormats": [
      "PDF",
      "CSV",
      "XLSX"
    ]
  },
  {
    "reportId": "REP_MOD_FT_SAVINGS_SUMMARY",
    "moduleId": "MOD_FT_SAVINGS",
    "productId": "JUMO-FINTECH",
    "title": "Savings Periodic Analytical Summary",
    "exportFormats": [
      "PDF",
      "CSV",
      "XLSX"
    ]
  },
  {
    "reportId": "REP_MOD_FT_SECURITIES_CUSTODY_SUMMARY",
    "moduleId": "MOD_FT_SECURITIES_CUSTODY",
    "productId": "JUMO-FINTECH",
    "title": "Securities Custody Periodic Analytical Summary",
    "exportFormats": [
      "PDF",
      "CSV",
      "XLSX"
    ]
  },
  {
    "reportId": "REP_MOD_FT_STABLECOIN_SUMMARY",
    "moduleId": "MOD_FT_STABLECOIN",
    "productId": "JUMO-FINTECH",
    "title": "Stablecoin Periodic Analytical Summary",
    "exportFormats": [
      "PDF",
      "CSV",
      "XLSX"
    ]
  },
  {
    "reportId": "REP_MOD_FT_TAX_REVENUE_SUMMARY",
    "moduleId": "MOD_FT_TAX_REVENUE",
    "productId": "JUMO-FINTECH",
    "title": "Tax Revenue Periodic Analytical Summary",
    "exportFormats": [
      "PDF",
      "CSV",
      "XLSX"
    ]
  },
  {
    "reportId": "REP_MOD_FT_TRADE_FINANCE_SUMMARY",
    "moduleId": "MOD_FT_TRADE_FINANCE",
    "productId": "JUMO-FINTECH",
    "title": "Trade Finance Periodic Analytical Summary",
    "exportFormats": [
      "PDF",
      "CSV",
      "XLSX"
    ]
  },
  {
    "reportId": "REP_MOD_FT_TREASURY_SUMMARY",
    "moduleId": "MOD_FT_TREASURY",
    "productId": "JUMO-FINTECH",
    "title": "Treasury Periodic Analytical Summary",
    "exportFormats": [
      "PDF",
      "CSV",
      "XLSX"
    ]
  },
  {
    "reportId": "REP_MOD_NP_ECD_MILESTONES_SUMMARY",
    "moduleId": "MOD_NP_ECD_MILESTONES",
    "productId": "JUMO-NURSERY-PRIMARY-ERP",
    "title": "Early Childhood Development & Milestones Periodic Analytical Summary",
    "exportFormats": [
      "PDF",
      "CSV",
      "XLSX"
    ]
  },
  {
    "reportId": "REP_MOD_NP_PRIMARY_ACADEMICS_SUMMARY",
    "moduleId": "MOD_NP_PRIMARY_ACADEMICS",
    "productId": "JUMO-NURSERY-PRIMARY-ERP",
    "title": "Primary Curriculum & Assessment Periodic Analytical Summary",
    "exportFormats": [
      "PDF",
      "CSV",
      "XLSX"
    ]
  },
  {
    "reportId": "REP_MOD_NP_PRIMARY_DOS_SUMMARY",
    "moduleId": "MOD_NP_PRIMARY_DOS",
    "productId": "JUMO-NURSERY-PRIMARY-ERP",
    "title": "Primary Studies & Timetabling Periodic Analytical Summary",
    "exportFormats": [
      "PDF",
      "CSV",
      "XLSX"
    ]
  },
  {
    "reportId": "REP_MOD_NP_ADMISSIONS_SUMMARY",
    "moduleId": "MOD_NP_ADMISSIONS",
    "productId": "JUMO-NURSERY-PRIMARY-ERP",
    "title": "Consolidated Student Admissions Periodic Analytical Summary",
    "exportFormats": [
      "PDF",
      "CSV",
      "XLSX"
    ]
  },
  {
    "reportId": "REP_MOD_NP_BURSARY_SUMMARY",
    "moduleId": "MOD_NP_BURSARY",
    "productId": "JUMO-NURSERY-PRIMARY-ERP",
    "title": "Fee Invoicing & Bursar Ledger Periodic Analytical Summary",
    "exportFormats": [
      "PDF",
      "CSV",
      "XLSX"
    ]
  },
  {
    "reportId": "REP_MOD_NP_SAFEGUARDING_SUMMARY",
    "moduleId": "MOD_NP_SAFEGUARDING",
    "productId": "JUMO-NURSERY-PRIMARY-ERP",
    "title": "Child Protection & Safeguarding Periodic Analytical Summary",
    "exportFormats": [
      "PDF",
      "CSV",
      "XLSX"
    ]
  },
  {
    "reportId": "REP_MOD_NP_CLINIC_SUMMARY",
    "moduleId": "MOD_NP_CLINIC",
    "productId": "JUMO-NURSERY-PRIMARY-ERP",
    "title": "Infirmary & Pediatric Health Periodic Analytical Summary",
    "exportFormats": [
      "PDF",
      "CSV",
      "XLSX"
    ]
  },
  {
    "reportId": "REP_MOD_NP_CATERING_SUMMARY",
    "moduleId": "MOD_NP_CATERING",
    "productId": "JUMO-NURSERY-PRIMARY-ERP",
    "title": "Nutrition & School Dining Periodic Analytical Summary",
    "exportFormats": [
      "PDF",
      "CSV",
      "XLSX"
    ]
  },
  {
    "reportId": "REP_MOD_NP_TRANSPORT_SUMMARY",
    "moduleId": "MOD_NP_TRANSPORT",
    "productId": "JUMO-NURSERY-PRIMARY-ERP",
    "title": "Student Bus Routing & Tracking Periodic Analytical Summary",
    "exportFormats": [
      "PDF",
      "CSV",
      "XLSX"
    ]
  },
  {
    "reportId": "REP_MOD_SEC_HOD_SUMMARY",
    "moduleId": "MOD_SEC_HOD",
    "productId": "JUMO-SECONDARY-ERP",
    "title": "Academic Departmental Heads (HOD) Periodic Analytical Summary",
    "exportFormats": [
      "PDF",
      "CSV",
      "XLSX"
    ]
  },
  {
    "reportId": "REP_MOD_SEC_REGISTRAR_SUMMARY",
    "moduleId": "MOD_SEC_REGISTRAR",
    "productId": "JUMO-SECONDARY-ERP",
    "title": "Secondary Registry & Matriculation Periodic Analytical Summary",
    "exportFormats": [
      "PDF",
      "CSV",
      "XLSX"
    ]
  },
  {
    "reportId": "REP_MOD_SEC_BURSARY_SUMMARY",
    "moduleId": "MOD_SEC_BURSARY",
    "productId": "JUMO-SECONDARY-ERP",
    "title": "Secondary Bursar & Tuitions Periodic Analytical Summary",
    "exportFormats": [
      "PDF",
      "CSV",
      "XLSX"
    ]
  },
  {
    "reportId": "REP_MOD_SEC_SENATE_SUMMARY",
    "moduleId": "MOD_SEC_SENATE",
    "productId": "JUMO-SECONDARY-ERP",
    "title": "Secondary Academic Senate Periodic Analytical Summary",
    "exportFormats": [
      "PDF",
      "CSV",
      "XLSX"
    ]
  },
  {
    "reportId": "REP_MOD_SEC_SERVICE_SUMMARY",
    "moduleId": "MOD_SEC_SERVICE",
    "productId": "JUMO-SECONDARY-ERP",
    "title": "Secondary Core Domain Service Periodic Analytical Summary",
    "exportFormats": [
      "PDF",
      "CSV",
      "XLSX"
    ]
  },
  {
    "reportId": "REP_MOD_ALUM_REGISTRY_SUMMARY",
    "moduleId": "MOD_ALUM_REGISTRY",
    "productId": "JUMO-ALUMNI",
    "title": "Alumni Census & Graduate Registry Periodic Analytical Summary",
    "exportFormats": [
      "PDF",
      "CSV",
      "XLSX"
    ]
  },
  {
    "reportId": "REP_MOD_ALUM_GIVING_SUMMARY",
    "moduleId": "MOD_ALUM_GIVING",
    "productId": "JUMO-ALUMNI",
    "title": "Giving Campaigns & Endowments Periodic Analytical Summary",
    "exportFormats": [
      "PDF",
      "CSV",
      "XLSX"
    ]
  },
  {
    "reportId": "REP_MOD_ALUM_CHAPTERS_SUMMARY",
    "moduleId": "MOD_ALUM_CHAPTERS",
    "productId": "JUMO-ALUMNI",
    "title": "Global Chapters & Diaspora Network Periodic Analytical Summary",
    "exportFormats": [
      "PDF",
      "CSV",
      "XLSX"
    ]
  },
  {
    "reportId": "REP_MOD_ALUM_CAREER_SUMMARY",
    "moduleId": "MOD_ALUM_CAREER",
    "productId": "JUMO-ALUMNI",
    "title": "Career Services & Mentorship Periodic Analytical Summary",
    "exportFormats": [
      "PDF",
      "CSV",
      "XLSX"
    ]
  },
  {
    "reportId": "REP_MOD_ALUM_DASHBOARD_SUMMARY",
    "moduleId": "MOD_ALUM_DASHBOARD",
    "productId": "JUMO-ALUMNI",
    "title": "Alumni Intelligence Dashboard Periodic Analytical Summary",
    "exportFormats": [
      "PDF",
      "CSV",
      "XLSX"
    ]
  },
  {
    "reportId": "REP_MOD_CH_MEMBERSHIP_SUMMARY",
    "moduleId": "MOD_CH_MEMBERSHIP",
    "productId": "JUMO-CHURCH",
    "title": "Congregation Directory & Census Periodic Analytical Summary",
    "exportFormats": [
      "PDF",
      "CSV",
      "XLSX"
    ]
  },
  {
    "reportId": "REP_MOD_CH_FINANCE_SUMMARY",
    "moduleId": "MOD_CH_FINANCE",
    "productId": "JUMO-CHURCH",
    "title": "Tithes, Offerings & Diocesan Ledger Periodic Analytical Summary",
    "exportFormats": [
      "PDF",
      "CSV",
      "XLSX"
    ]
  },
  {
    "reportId": "REP_MOD_CH_PASTORAL_SUMMARY",
    "moduleId": "MOD_CH_PASTORAL",
    "productId": "JUMO-CHURCH",
    "title": "Pastoral Care & Visitation Tracking Periodic Analytical Summary",
    "exportFormats": [
      "PDF",
      "CSV",
      "XLSX"
    ]
  },
  {
    "reportId": "REP_MOD_CH_EVENTS_SUMMARY",
    "moduleId": "MOD_CH_EVENTS",
    "productId": "JUMO-CHURCH",
    "title": "Liturgical Calendar & Event Operations Periodic Analytical Summary",
    "exportFormats": [
      "PDF",
      "CSV",
      "XLSX"
    ]
  },
  {
    "reportId": "REP_MOD_CH_DASHBOARD_SUMMARY",
    "moduleId": "MOD_CH_DASHBOARD",
    "productId": "JUMO-CHURCH",
    "title": "Executive Diocesan Dashboard Periodic Analytical Summary",
    "exportFormats": [
      "PDF",
      "CSV",
      "XLSX"
    ]
  },
  {
    "reportId": "REP_MOD_OCC_VERIFICATION_SUMMARY",
    "moduleId": "MOD_OCC_VERIFICATION",
    "productId": "JUMO-CONTROL",
    "title": "Ring-0 Verification & Integrity Periodic Analytical Summary",
    "exportFormats": [
      "PDF",
      "CSV",
      "XLSX"
    ]
  },
  {
    "reportId": "REP_MOD_OCC_TRUST_SUMMARY",
    "moduleId": "MOD_OCC_TRUST",
    "productId": "JUMO-CONTROL",
    "title": "JUMO Trust Engine & Anti-Tamper Periodic Analytical Summary",
    "exportFormats": [
      "PDF",
      "CSV",
      "XLSX"
    ]
  },
  {
    "reportId": "REP_MOD_OCC_FACTORY_SUMMARY",
    "moduleId": "MOD_OCC_FACTORY",
    "productId": "JUMO-CONTROL",
    "title": "ERP Template & Scaffolding Factory Periodic Analytical Summary",
    "exportFormats": [
      "PDF",
      "CSV",
      "XLSX"
    ]
  },
  {
    "reportId": "REP_MOD_OCC_SHELL_SUMMARY",
    "moduleId": "MOD_OCC_SHELL",
    "productId": "JUMO-CONTROL",
    "title": "Universal Sovereign Platform Host Periodic Analytical Summary",
    "exportFormats": [
      "PDF",
      "CSV",
      "XLSX"
    ]
  }
], "UNIVERSAL_REPORT_REGISTRY");
