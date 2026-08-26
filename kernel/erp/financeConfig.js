export const financeConfig = {
  id: "FAAP-Financials",
  name: "FAAP General Ledger & Treasury ERP",
  family: "Finance",
  governanceModel: "Chief Financial Officer & Board Audit Committee",
  description: "Enterprise FAAP financial operating system with multi-currency general ledger, treasury management, and clearinghouse routing.",
  portals: [
    { id: "faap-public", name: "Financial Transparency Portal", icon: "🌐", desc: "Public audits, macro liquidity metrics" },
    { id: "faap-login", name: "Treasury & Officer Login Portal", icon: "🔐", desc: "Secured financial operator authentication" },
    { id: "faap-workspace", name: "FAAP Treasury Command Workspace", icon: "💰", desc: "Multi-currency pools, liquidity routing" },
    { id: "ledger-portal", name: "General Ledger & Accounting Portal", icon: "📊", desc: "Double-entry books, trial balance, journals" },
    { id: "audit-portal", name: "Financial Audit & Compliance Portal", icon: "🛡️", desc: "Immutable ledger verification, reconciliation" }
  ],
  departments: [
    "Treasury & Liquidity Operations",
    "General Accounting & Ledger",
    "Accounts Payable & Receivable",
    "Risk, Audit & Compliance",
    "Tax & Regulatory Reporting"
  ],
  modules: [
    { id: "general-ledger", name: "Multi-Currency Double-Entry General Ledger", icon: "📒", status: "Active" },
    { id: "treasury-pools", name: "Global Treasury Pool Management", icon: "💰", status: "Active" },
    { id: "ap-ar", name: "Accounts Payable & Receivable Automation", icon: "📑", status: "Active" },
    { id: "bank-recon", name: "Automated Bank Reconciliation Engine", icon: "🔄", status: "Active" },
    { id: "clearinghouse", name: "JUMO Digital Pay Settlement Router", icon: "⚡", status: "Active" }
  ],
  workflows: [
    { id: "wf-disbursement", name: "Treasury Disbursement Approval Workflow", steps: 4 },
    { id: "wf-journal-posting", name: "Journal Entry Verification & Posting Workflow", steps: 3 }
  ],
  roles: ["Chief Financial Officer", "Senior Treasurer", "General Accountant", "Auditor", "Clearing Officer"],
  forms: [
    { id: "form-wire-transfer", name: "Cross-Border Wire Transfer & Disbursement Form" },
    { id: "form-journal-entry", name: "Manual Journal Entry Voucher Form" }
  ],
  reports: [
    { id: "rep-financial-statements", name: "Comprehensive Balance Sheet & P&L Statement" }
  ]
};
