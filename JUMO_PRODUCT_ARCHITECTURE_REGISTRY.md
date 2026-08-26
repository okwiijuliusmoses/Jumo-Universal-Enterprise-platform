# JUMO UEOS Product Architecture Registry

## 1. Architectural Overview
Every product in JUMO UEOS is declared inside a registry-driven architecture. Products are not hardcoded inside rendering loops or `App.tsx` routes. They declare their metadata, navigation models, module registries, role models, payment capabilities, financial ledger bindings, and AI cognitive contexts.

---

## 2. Product Registry Declarations

### Product Declaration: JUMO FAAP
```typescript
{
  productId: "PROD_FAAP",
  productName: "JUMO Financial & Accounting Platform (FAAP)",
  productType: "FINANCIAL_ERP",
  version: "v4.2.0-Enterprise",
  benchmarkSources: ["QuickBooks", "Sage Intacct", "SAP FI"],
  targetOrganizations: ["Enterprises", "Universities", "Dioceses", "Government Agencies"],
  navigationModel: {
    layout: "FINANCE_FIRST",
    groups: [
      { name: "Executive Summary", items: ["Financial Dashboard", "Key Metrics", "Treasury Status"] },
      { name: "Ledger Operations", items: ["Chart of Accounts", "Journal Entries", "General Ledger", "Trial Balance"] },
      { name: "Financial Record Books", items: ["Vote Book", "Cash Book", "Petty Cash Book", "Receipt Book", "Payment Book", "Auditor Book"] },
      { name: "Payables & Receivables", items: ["Invoices", "Bills & Expenses", "Customer Accounts", "Vendor Accounts"] },
      { name: "Compliance & Audit", items: ["Tax Registers", "Asset Register", "Audit Logs", "AI Financial Auditor"] }
    ]
  },
  moduleRegistry: [
    "FAAP_MOD_COA", "FAAP_MOD_GL", "FAAP_MOD_AP", "FAAP_MOD_AR", "FAAP_MOD_VOTEBOOK",
    "FAAP_MOD_CASHBOOK", "FAAP_MOD_RECON", "FAAP_MOD_TAX", "FAAP_MOD_ASSETS", "FAAP_MOD_AUDIT"
  ],
  roleRegistry: [
    "ROLE_CONTROLLER", "ROLE_ACCOUNTANT", "ROLE_AUDITOR", "ROLE_TREASURER", "ROLE_BUDGET_OFFICER", "ROLE_TAX_OFFICER"
  ],
  workflowRegistry: [
    "WF_JOURNAL_APPROVAL", "WF_BUDGET_REALLOCATION", "WF_PAYMENT_VOUCHER_APPROVAL", "WF_PERIOD_CLOSE"
  ],
  reportRegistry: [
    "RPT_BALANCE_SHEET", "RPT_PROFIT_LOSS", "RPT_TRIAL_BALANCE", "RPT_VOTEBOOK_SUMMARY", "RPT_CASH_FLOW"
  ],
  paymentCapabilities: {
    directBankSettlement: true,
    masterTreasuryClearing: true,
    reconciliationEngine: true
  },
  financeCapabilities: {
    doubleEntryStrict: true,
    zeroOffsetVerification: true,
    recordBooksCount: 27
  },
  AIRegistry: {
    contextId: "FAAP_AI_CONTEXT",
    capabilities: ["Double-entry verification", "Anomaly detection", "Budget variance explanation", "Tax calculation"]
  }
}
```

---

### Product Declaration: JUMO Digital Pay
```typescript
{
  productId: "PROD_DP",
  productName: "JUMO Digital Pay Switch",
  productType: "PAYMENT_SWITCH",
  version: "v3.8.0-Switch",
  benchmarkSources: ["SchoolPay", "Stripe", "M-Pesa", "Interswitch"],
  targetOrganizations: ["Schools", "Universities", "Merchants", "Utility Providers"],
  navigationModel: {
    layout: "PAYMENTS_FIRST",
    groups: [
      { name: "Switch Overview", items: ["Transactions Live Feed", "Volume Metrics", "Channel Status"] },
      { name: "Collections & Tuition", items: ["Student Payment Codes", "Tuition Fee Schedules", "Payment Link Generator"] },
      { name: "Disbursements & Settlement", items: ["Split Settlement Engine", "Merchant Payouts", "1.5% Treasury Clearing"] },
      { name: "Channels & Terminals", items: ["Mobile Money Gateway", "POS Agent Hub", "Bank Rails", "API Keys"] },
      { name: "Security & Risk", items: ["Fraud Sentinel", "Chargeback Manager", "Audit Trail"] }
    ]
  },
  moduleRegistry: [
    "DP_MOD_REFGEN", "DP_MOD_TUITION", "DP_MOD_POSTING", "DP_MOD_SETTLEMENT", "DP_MOD_POS", "DP_MOD_RISK"
  ],
  roleRegistry: [
    "ROLE_MERCHANT", "ROLE_AGENT", "ROLE_OPS", "ROLE_RISK_ANALYST", "ROLE_DEVELOPER", "ROLE_SETTLEMENT_OFFICER"
  ],
  workflowRegistry: [
    "WF_SETTLEMENT_BATCH", "WF_REFUND_APPROVAL", "WF_AGENT_ONBOARDING", "WF_DISPUTE_RESOLUTION"
  ],
  AIRegistry: {
    contextId: "DP_AI_CONTEXT",
    capabilities: ["Fraud pattern detection", "Settlement reconciliation assistant", "Payment link auto-generator"]
  }
}
```

---

### Product Declaration: JUMO University ERP
```typescript
{
  productId: "PROD_EDU_UNIV",
  productName: "JUMO University ERP",
  productType: "HIGHER_EDUCATION_ERP",
  version: "v4.0.0-University",
  benchmarkSources: ["IUIU", "UCU", "Ellucian Banner"],
  targetOrganizations: ["Universities", "Tertiary Colleges", "Polytechnics"],
  navigationModel: {
    layout: "FACULTY_AND_STUDENT_FIRST",
    groups: [
      { name: "Governance & Executive", items: ["Council & Senate Portal", "Vice-Chancellor Workspace", "Institutional Analytics"] },
      { name: "Academic Administration", items: ["Faculties & Schools", "Departments & Programs", "Curriculum Manager", "Senate Resolutions"] },
      { name: "Student Information System", items: ["Admissions & Applications", "Student Enrolment", "Course Registration", "Class Timetable"] },
      { name: "Examinations & Records", items: ["Exam Schedules", "Marks Entry", "GPA/CGPA Engine", "Transcripts & Graduation"] },
      { name: "Student Life & Services", items: ["Hostel & Housing", "University Health Center", "Library System", "Dean of Students"] }
    ]
  },
  moduleRegistry: [
    "EDU_MOD_SENATE", "EDU_MOD_SIS", "EDU_MOD_GPA", "EDU_MOD_GRAD", "EDU_MOD_HEALTH", "EDU_MOD_LIBRARY"
  ],
  roleRegistry: [
    "ROLE_REGISTRAR", "ROLE_BURSAR", "ROLE_DEAN", "ROLE_EXAM_OFFICER", "ROLE_LIBRARIAN", "ROLE_WARDEN", "ROLE_LECTURER"
  ],
  AIRegistry: {
    contextId: "UNIV_AI_CONTEXT",
    capabilities: ["Academic performance predictor", "Prerequisite validator", "Graduation eligibility auditor"]
  }
}
```

---

### Product Declaration: JUMO Church & Diocese ERP
```typescript
{
  productId: "PROD_CH",
  productName: "JUMO Church & Diocese ERP",
  productType: "FAITH_BASED_ERP",
  version: "v2.9.0-Diocese",
  benchmarkSources: ["Church360", "Breeze", "Diocesan Registers"],
  targetOrganizations: ["Dioceses", "Archdeaconries", "Parishes", "Local Churches"],
  navigationModel: {
    layout: "PARISH_AND_HIERARCHY_FIRST",
    groups: [
      { name: "Episcopal Governance", items: ["Bishop Portal", "Diocesan Synod", "Archdeaconry Council"] },
      { name: "Parish Administration", items: ["Parish Priest Workspace", "Congregation Directory", "Small Christian Communities"] },
      { name: "Sacramental Registers", items: ["Holy Baptism", "Confirmation", "Holy Matrimony", "Christian Burial"] },
      { name: "Stewardship & Finance", items: ["Tithes & Offerings", "Building Pledges", "Diocesan Quota", "Parish Accounts"] },
      { name: "Pastoral Care", items: ["Visitation Logs", "Sick Communion", "Clergy Postings"] }
    ]
  },
  moduleRegistry: [
    "CH_MOD_DIOCESE", "CH_MOD_SACRAMENT", "CH_MOD_TITHE", "CH_MOD_CLERGY", "CH_MOD_PARISH"
  ],
  roleRegistry: [
    "ROLE_BISHOP", "ROLE_CHURCH_ADMIN", "ROLE_CLERGY", "ROLE_CHURCH_TREASURER", "ROLE_PARISH_PRIEST", "ROLE_MEMBER"
  ],
  AIRegistry: {
    contextId: "CHURCH_AI_CONTEXT",
    capabilities: ["Stewardship trend analysis", "Pastoral visitation scheduler", "Diocesan quota calculator"]
  }
}
```
