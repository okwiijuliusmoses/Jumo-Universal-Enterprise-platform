import { createRegistryCollection, RegistryCollection, safeFind, safeFilter } from './UniversalRegistryContract';
export const UniversalActionRegistry = createRegistryCollection([
  {
    "actionId": "ACT_MOD_FT_AGENT_BANKING_EXECUTE",
    "moduleId": "MOD_FT_AGENT_BANKING",
    "productId": "JUMO-FINTECH",
    "name": "Execute Agent Banking Transaction",
    "type": "COMMAND"
  },
  {
    "actionId": "ACT_MOD_FT_AGRICULTURAL_FINANCE_EXECUTE",
    "moduleId": "MOD_FT_AGRICULTURAL_FINANCE",
    "productId": "JUMO-FINTECH",
    "name": "Execute Agricultural Finance Transaction",
    "type": "COMMAND"
  },
  {
    "actionId": "ACT_MOD_FT_ATM_SELF_SERVICE_EXECUTE",
    "moduleId": "MOD_FT_ATM_SELF_SERVICE",
    "productId": "JUMO-FINTECH",
    "name": "Execute Atm Self Service Transaction",
    "type": "COMMAND"
  },
  {
    "actionId": "ACT_MOD_FT_BANK_PAYMENTS_EXECUTE",
    "moduleId": "MOD_FT_BANK_PAYMENTS",
    "productId": "JUMO-FINTECH",
    "name": "Execute Bank Payments Transaction",
    "type": "COMMAND"
  },
  {
    "actionId": "ACT_MOD_FT_BILL_PAYMENTS_EXECUTE",
    "moduleId": "MOD_FT_BILL_PAYMENTS",
    "productId": "JUMO-FINTECH",
    "name": "Execute Bill Payments Transaction",
    "type": "COMMAND"
  },
  {
    "actionId": "ACT_MOD_FT_CAPITAL_MARKETS_EXECUTE",
    "moduleId": "MOD_FT_CAPITAL_MARKETS",
    "productId": "JUMO-FINTECH",
    "name": "Execute Capital Markets Transaction",
    "type": "COMMAND"
  },
  {
    "actionId": "ACT_MOD_FT_CARDS_EXECUTE",
    "moduleId": "MOD_FT_CARDS",
    "productId": "JUMO-FINTECH",
    "name": "Execute Cards Transaction",
    "type": "COMMAND"
  },
  {
    "actionId": "ACT_MOD_FT_COLLECTIONS_EXECUTE",
    "moduleId": "MOD_FT_COLLECTIONS",
    "productId": "JUMO-FINTECH",
    "name": "Execute Collections Transaction",
    "type": "COMMAND"
  },
  {
    "actionId": "ACT_MOD_FT_COMPLIANCE_EXECUTE",
    "moduleId": "MOD_FT_COMPLIANCE",
    "productId": "JUMO-FINTECH",
    "name": "Execute Compliance Transaction",
    "type": "COMMAND"
  },
  {
    "actionId": "ACT_MOD_FT_CROSS_BORDER_EXECUTE",
    "moduleId": "MOD_FT_CROSS_BORDER",
    "productId": "JUMO-FINTECH",
    "name": "Execute Cross Border Transaction",
    "type": "COMMAND"
  },
  {
    "actionId": "ACT_MOD_FT_DATA_INTELLIGENCE_EXECUTE",
    "moduleId": "MOD_FT_DATA_INTELLIGENCE",
    "productId": "JUMO-FINTECH",
    "name": "Execute Data Intelligence Transaction",
    "type": "COMMAND"
  },
  {
    "actionId": "ACT_MOD_FT_DEVELOPER_API_EXECUTE",
    "moduleId": "MOD_FT_DEVELOPER_API",
    "productId": "JUMO-FINTECH",
    "name": "Execute Developer Api Transaction",
    "type": "COMMAND"
  },
  {
    "actionId": "ACT_MOD_FT_DIGITAL_BANKING_EXECUTE",
    "moduleId": "MOD_FT_DIGITAL_BANKING",
    "productId": "JUMO-FINTECH",
    "name": "Execute Digital Banking Transaction",
    "type": "COMMAND"
  },
  {
    "actionId": "ACT_MOD_FT_DIGITAL_WALLETS_EXECUTE",
    "moduleId": "MOD_FT_DIGITAL_WALLETS",
    "productId": "JUMO-FINTECH",
    "name": "Execute Digital Wallets Transaction",
    "type": "COMMAND"
  },
  {
    "actionId": "ACT_MOD_FT_EMBEDDED_FINANCE_EXECUTE",
    "moduleId": "MOD_FT_EMBEDDED_FINANCE",
    "productId": "JUMO-FINTECH",
    "name": "Execute Embedded Finance Transaction",
    "type": "COMMAND"
  },
  {
    "actionId": "ACT_MOD_FT_FINANCIAL_ACCOUNTING_EXECUTE",
    "moduleId": "MOD_FT_FINANCIAL_ACCOUNTING",
    "productId": "JUMO-FINTECH",
    "name": "Execute Financial Accounting Transaction",
    "type": "COMMAND"
  },
  {
    "actionId": "ACT_MOD_FT_FX_EXECUTE",
    "moduleId": "MOD_FT_FX",
    "productId": "JUMO-FINTECH",
    "name": "Execute Fx Transaction",
    "type": "COMMAND"
  },
  {
    "actionId": "ACT_MOD_FT_GLOBAL_ACCOUNTS_EXECUTE",
    "moduleId": "MOD_FT_GLOBAL_ACCOUNTS",
    "productId": "JUMO-FINTECH",
    "name": "Execute Global Accounts Transaction",
    "type": "COMMAND"
  },
  {
    "actionId": "ACT_MOD_FT_INSURANCE_EXECUTE",
    "moduleId": "MOD_FT_INSURANCE",
    "productId": "JUMO-FINTECH",
    "name": "Execute Insurance Transaction",
    "type": "COMMAND"
  },
  {
    "actionId": "ACT_MOD_FT_INVESTMENT_EXECUTE",
    "moduleId": "MOD_FT_INVESTMENT",
    "productId": "JUMO-FINTECH",
    "name": "Execute Investment Transaction",
    "type": "COMMAND"
  },
  {
    "actionId": "ACT_MOD_FT_LENDING_EXECUTE",
    "moduleId": "MOD_FT_LENDING",
    "productId": "JUMO-FINTECH",
    "name": "Execute Lending Transaction",
    "type": "COMMAND"
  },
  {
    "actionId": "ACT_MOD_FT_MERCHANT_ACQUIRING_EXECUTE",
    "moduleId": "MOD_FT_MERCHANT_ACQUIRING",
    "productId": "JUMO-FINTECH",
    "name": "Execute Merchant Acquiring Transaction",
    "type": "COMMAND"
  },
  {
    "actionId": "ACT_MOD_FT_MERCHANT_SERVICES_EXECUTE",
    "moduleId": "MOD_FT_MERCHANT_SERVICES",
    "productId": "JUMO-FINTECH",
    "name": "Execute Merchant Services Transaction",
    "type": "COMMAND"
  },
  {
    "actionId": "ACT_MOD_FT_MICROFINANCE_EXECUTE",
    "moduleId": "MOD_FT_MICROFINANCE",
    "productId": "JUMO-FINTECH",
    "name": "Execute Microfinance Transaction",
    "type": "COMMAND"
  },
  {
    "actionId": "ACT_MOD_FT_MOBILE_MONEY_EXECUTE",
    "moduleId": "MOD_FT_MOBILE_MONEY",
    "productId": "JUMO-FINTECH",
    "name": "Execute Mobile Money Transaction",
    "type": "COMMAND"
  },
  {
    "actionId": "ACT_MOD_FT_MULTI_CURRENCY_EXECUTE",
    "moduleId": "MOD_FT_MULTI_CURRENCY",
    "productId": "JUMO-FINTECH",
    "name": "Execute Multi Currency Transaction",
    "type": "COMMAND"
  },
  {
    "actionId": "ACT_MOD_FT_PAYMENT_GATEWAY_EXECUTE",
    "moduleId": "MOD_FT_PAYMENT_GATEWAY",
    "productId": "JUMO-FINTECH",
    "name": "Execute Payment Gateway Transaction",
    "type": "COMMAND"
  },
  {
    "actionId": "ACT_MOD_FT_PAYMENT_SWITCHING_EXECUTE",
    "moduleId": "MOD_FT_PAYMENT_SWITCHING",
    "productId": "JUMO-FINTECH",
    "name": "Execute Payment Switching Transaction",
    "type": "COMMAND"
  },
  {
    "actionId": "ACT_MOD_FT_PAYOUTS_EXECUTE",
    "moduleId": "MOD_FT_PAYOUTS",
    "productId": "JUMO-FINTECH",
    "name": "Execute Payouts Transaction",
    "type": "COMMAND"
  },
  {
    "actionId": "ACT_MOD_FT_PAYROLL_EXECUTE",
    "moduleId": "MOD_FT_PAYROLL",
    "productId": "JUMO-FINTECH",
    "name": "Execute Payroll Transaction",
    "type": "COMMAND"
  },
  {
    "actionId": "ACT_MOD_FT_REMITTANCES_EXECUTE",
    "moduleId": "MOD_FT_REMITTANCES",
    "productId": "JUMO-FINTECH",
    "name": "Execute Remittances Transaction",
    "type": "COMMAND"
  },
  {
    "actionId": "ACT_MOD_FT_SACCO_EXECUTE",
    "moduleId": "MOD_FT_SACCO",
    "productId": "JUMO-FINTECH",
    "name": "Execute Sacco Transaction",
    "type": "COMMAND"
  },
  {
    "actionId": "ACT_MOD_FT_SAVINGS_EXECUTE",
    "moduleId": "MOD_FT_SAVINGS",
    "productId": "JUMO-FINTECH",
    "name": "Execute Savings Transaction",
    "type": "COMMAND"
  },
  {
    "actionId": "ACT_MOD_FT_SECURITIES_CUSTODY_EXECUTE",
    "moduleId": "MOD_FT_SECURITIES_CUSTODY",
    "productId": "JUMO-FINTECH",
    "name": "Execute Securities Custody Transaction",
    "type": "COMMAND"
  },
  {
    "actionId": "ACT_MOD_FT_STABLECOIN_EXECUTE",
    "moduleId": "MOD_FT_STABLECOIN",
    "productId": "JUMO-FINTECH",
    "name": "Execute Stablecoin Transaction",
    "type": "COMMAND"
  },
  {
    "actionId": "ACT_MOD_FT_TAX_REVENUE_EXECUTE",
    "moduleId": "MOD_FT_TAX_REVENUE",
    "productId": "JUMO-FINTECH",
    "name": "Execute Tax Revenue Transaction",
    "type": "COMMAND"
  },
  {
    "actionId": "ACT_MOD_FT_TRADE_FINANCE_EXECUTE",
    "moduleId": "MOD_FT_TRADE_FINANCE",
    "productId": "JUMO-FINTECH",
    "name": "Execute Trade Finance Transaction",
    "type": "COMMAND"
  },
  {
    "actionId": "ACT_MOD_FT_TREASURY_EXECUTE",
    "moduleId": "MOD_FT_TREASURY",
    "productId": "JUMO-FINTECH",
    "name": "Execute Treasury Transaction",
    "type": "COMMAND"
  },
  {
    "actionId": "ACT_MOD_NP_ECD_MILESTONES_EXECUTE",
    "moduleId": "MOD_NP_ECD_MILESTONES",
    "productId": "JUMO-NURSERY-PRIMARY-ERP",
    "name": "Execute Early Childhood Development & Milestones Transaction",
    "type": "COMMAND"
  },
  {
    "actionId": "ACT_MOD_NP_PRIMARY_ACADEMICS_EXECUTE",
    "moduleId": "MOD_NP_PRIMARY_ACADEMICS",
    "productId": "JUMO-NURSERY-PRIMARY-ERP",
    "name": "Execute Primary Curriculum & Assessment Transaction",
    "type": "COMMAND"
  },
  {
    "actionId": "ACT_MOD_NP_PRIMARY_DOS_EXECUTE",
    "moduleId": "MOD_NP_PRIMARY_DOS",
    "productId": "JUMO-NURSERY-PRIMARY-ERP",
    "name": "Execute Primary Studies & Timetabling Transaction",
    "type": "COMMAND"
  },
  {
    "actionId": "ACT_MOD_NP_ADMISSIONS_EXECUTE",
    "moduleId": "MOD_NP_ADMISSIONS",
    "productId": "JUMO-NURSERY-PRIMARY-ERP",
    "name": "Execute Consolidated Student Admissions Transaction",
    "type": "COMMAND"
  },
  {
    "actionId": "ACT_MOD_NP_BURSARY_EXECUTE",
    "moduleId": "MOD_NP_BURSARY",
    "productId": "JUMO-NURSERY-PRIMARY-ERP",
    "name": "Execute Fee Invoicing & Bursar Ledger Transaction",
    "type": "COMMAND"
  },
  {
    "actionId": "ACT_MOD_NP_SAFEGUARDING_EXECUTE",
    "moduleId": "MOD_NP_SAFEGUARDING",
    "productId": "JUMO-NURSERY-PRIMARY-ERP",
    "name": "Execute Child Protection & Safeguarding Transaction",
    "type": "COMMAND"
  },
  {
    "actionId": "ACT_MOD_NP_CLINIC_EXECUTE",
    "moduleId": "MOD_NP_CLINIC",
    "productId": "JUMO-NURSERY-PRIMARY-ERP",
    "name": "Execute Infirmary & Pediatric Health Transaction",
    "type": "COMMAND"
  },
  {
    "actionId": "ACT_MOD_NP_CATERING_EXECUTE",
    "moduleId": "MOD_NP_CATERING",
    "productId": "JUMO-NURSERY-PRIMARY-ERP",
    "name": "Execute Nutrition & School Dining Transaction",
    "type": "COMMAND"
  },
  {
    "actionId": "ACT_MOD_NP_TRANSPORT_EXECUTE",
    "moduleId": "MOD_NP_TRANSPORT",
    "productId": "JUMO-NURSERY-PRIMARY-ERP",
    "name": "Execute Student Bus Routing & Tracking Transaction",
    "type": "COMMAND"
  },
  {
    "actionId": "ACT_MOD_SEC_HOD_EXECUTE",
    "moduleId": "MOD_SEC_HOD",
    "productId": "JUMO-SECONDARY-ERP",
    "name": "Execute Academic Departmental Heads (HOD) Transaction",
    "type": "COMMAND"
  },
  {
    "actionId": "ACT_MOD_SEC_REGISTRAR_EXECUTE",
    "moduleId": "MOD_SEC_REGISTRAR",
    "productId": "JUMO-SECONDARY-ERP",
    "name": "Execute Secondary Registry & Matriculation Transaction",
    "type": "COMMAND"
  },
  {
    "actionId": "ACT_MOD_SEC_BURSARY_EXECUTE",
    "moduleId": "MOD_SEC_BURSARY",
    "productId": "JUMO-SECONDARY-ERP",
    "name": "Execute Secondary Bursar & Tuitions Transaction",
    "type": "COMMAND"
  },
  {
    "actionId": "ACT_MOD_SEC_SENATE_EXECUTE",
    "moduleId": "MOD_SEC_SENATE",
    "productId": "JUMO-SECONDARY-ERP",
    "name": "Execute Secondary Academic Senate Transaction",
    "type": "COMMAND"
  },
  {
    "actionId": "ACT_MOD_SEC_SERVICE_EXECUTE",
    "moduleId": "MOD_SEC_SERVICE",
    "productId": "JUMO-SECONDARY-ERP",
    "name": "Execute Secondary Core Domain Service Transaction",
    "type": "COMMAND"
  },
  {
    "actionId": "ACT_MOD_ALUM_REGISTRY_EXECUTE",
    "moduleId": "MOD_ALUM_REGISTRY",
    "productId": "JUMO-ALUMNI",
    "name": "Execute Alumni Census & Graduate Registry Transaction",
    "type": "COMMAND"
  },
  {
    "actionId": "ACT_MOD_ALUM_GIVING_EXECUTE",
    "moduleId": "MOD_ALUM_GIVING",
    "productId": "JUMO-ALUMNI",
    "name": "Execute Giving Campaigns & Endowments Transaction",
    "type": "COMMAND"
  },
  {
    "actionId": "ACT_MOD_ALUM_CHAPTERS_EXECUTE",
    "moduleId": "MOD_ALUM_CHAPTERS",
    "productId": "JUMO-ALUMNI",
    "name": "Execute Global Chapters & Diaspora Network Transaction",
    "type": "COMMAND"
  },
  {
    "actionId": "ACT_MOD_ALUM_CAREER_EXECUTE",
    "moduleId": "MOD_ALUM_CAREER",
    "productId": "JUMO-ALUMNI",
    "name": "Execute Career Services & Mentorship Transaction",
    "type": "COMMAND"
  },
  {
    "actionId": "ACT_MOD_ALUM_DASHBOARD_EXECUTE",
    "moduleId": "MOD_ALUM_DASHBOARD",
    "productId": "JUMO-ALUMNI",
    "name": "Execute Alumni Intelligence Dashboard Transaction",
    "type": "COMMAND"
  },
  {
    "actionId": "ACT_MOD_CH_MEMBERSHIP_EXECUTE",
    "moduleId": "MOD_CH_MEMBERSHIP",
    "productId": "JUMO-CHURCH",
    "name": "Execute Congregation Directory & Census Transaction",
    "type": "COMMAND"
  },
  {
    "actionId": "ACT_MOD_CH_FINANCE_EXECUTE",
    "moduleId": "MOD_CH_FINANCE",
    "productId": "JUMO-CHURCH",
    "name": "Execute Tithes, Offerings & Diocesan Ledger Transaction",
    "type": "COMMAND"
  },
  {
    "actionId": "ACT_MOD_CH_PASTORAL_EXECUTE",
    "moduleId": "MOD_CH_PASTORAL",
    "productId": "JUMO-CHURCH",
    "name": "Execute Pastoral Care & Visitation Tracking Transaction",
    "type": "COMMAND"
  },
  {
    "actionId": "ACT_MOD_CH_EVENTS_EXECUTE",
    "moduleId": "MOD_CH_EVENTS",
    "productId": "JUMO-CHURCH",
    "name": "Execute Liturgical Calendar & Event Operations Transaction",
    "type": "COMMAND"
  },
  {
    "actionId": "ACT_MOD_CH_DASHBOARD_EXECUTE",
    "moduleId": "MOD_CH_DASHBOARD",
    "productId": "JUMO-CHURCH",
    "name": "Execute Executive Diocesan Dashboard Transaction",
    "type": "COMMAND"
  },
  {
    "actionId": "ACT_MOD_OCC_VERIFICATION_EXECUTE",
    "moduleId": "MOD_OCC_VERIFICATION",
    "productId": "JUMO-CONTROL",
    "name": "Execute Ring-0 Verification & Integrity Transaction",
    "type": "COMMAND"
  },
  {
    "actionId": "ACT_MOD_OCC_TRUST_EXECUTE",
    "moduleId": "MOD_OCC_TRUST",
    "productId": "JUMO-CONTROL",
    "name": "Execute JUMO Trust Engine & Anti-Tamper Transaction",
    "type": "COMMAND"
  },
  {
    "actionId": "ACT_MOD_OCC_FACTORY_EXECUTE",
    "moduleId": "MOD_OCC_FACTORY",
    "productId": "JUMO-CONTROL",
    "name": "Execute ERP Template & Scaffolding Factory Transaction",
    "type": "COMMAND"
  },
  {
    "actionId": "ACT_MOD_OCC_SHELL_EXECUTE",
    "moduleId": "MOD_OCC_SHELL",
    "productId": "JUMO-CONTROL",
    "name": "Execute Universal Sovereign Platform Host Transaction",
    "type": "COMMAND"
  }
], "UNIVERSAL_ACTION_REGISTRY");
