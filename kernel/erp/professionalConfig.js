export const professionalConfig = {
  id: "LawFirm-ERP",
  name: "Legal Practice & Case Management ERP",
  family: "LegalServices",
  governanceModel: "Managing Partner, Senior Counsel & Executive Committee",
  description: "Enterprise legal practice management system for law firms, legal departments, and corporate counsel.",
  portals: [
    { id: "law-public", name: "Firm Public & Client Portal", icon: "🌐", desc: "Practice overview, client consultations" },
    { id: "law-login", name: "Legal Professional Login Portal", icon: "🔐", desc: "Lawyers, partners and clerks authentication" },
    { id: "law-workspace", name: "Legal Practice Workspace", icon: "⚖️", desc: "Cases, court diaries, billing, document vaults" },
    { id: "client-portal", name: "Client Case Tracking Portal", icon: "📁", desc: "Case updates, documents, billings" }
  ],
  departments: [
    "Litigation & Dispute Resolution",
    "Corporate & Commercial Legal",
    "Conveyancing & Real Estate",
    "Billing & Practice Management"
  ],
  modules: [
    { id: "case-manager", name: "Case & Matter Management System", icon: "📁", status: "Active" },
    { id: "court-diary", name: "Court Diary & Deadline Calender", icon: "📅", status: "Active" },
    { id: "legal-billing", name: "Billable Hours & Retainer Invoicing", icon: "💵", status: "Active" },
    { id: "document-vault", name: "Secure Legal Document & Contract Vault", icon: "🔐", status: "Active" }
  ],
  workflows: [
    { id: "wf-case-intake", name: "New Client Matter Intake & Conflict Check Workflow", steps: 3 },
    { id: "wf-billing-approval", name: "Billable Hours Review & Invoice Approval Workflow", steps: 3 }
  ],
  roles: ["Managing Partner", "Advocate / Associate", "Legal Clerk", "Client"],
  forms: [
    { id: "form-client-intake", name: "New Client & Matter Opening Form" },
    { id: "form-expense-claim", name: "Legal Disbursements & Expense Claim Form" }
  ],
  reports: [
    { id: "rep-firm-billable", name: "Attorney Billable Hours & Revenue Generation Report" }
  ]
};
