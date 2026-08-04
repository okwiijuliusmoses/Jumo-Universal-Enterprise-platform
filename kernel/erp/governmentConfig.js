export const governmentConfig = {
  id: "Government-ERP",
  name: "Ministry & Public Service Operating Platform",
  family: "Government",
  governanceModel: "Cabinet, Permanent Secretary & Public Service Commission",
  description: "Enterprise digital operating system for government ministries, public administration, and citizen service delivery.",
  portals: [
    { id: "gov-public", name: "Citizen Services Portal", icon: "🌐", desc: "Public services, licenses, permits, information" },
    { id: "gov-login", name: "Sovereign Gov Login", icon: "🔐", desc: "Secured government personnel authentication" },
    { id: "gov-admin", name: "Ministry Administrative Workspace", icon: "🏛️", desc: "Policy implementation, budgets, directives" },
    { id: "gov-procurement", name: "Public Procurement & Tender Portal", icon: "📋", desc: "Bidding, evaluation, contract award" },
    { id: "gov-audit", name: "Government Audit & Compliance Portal", icon: "🛡️", desc: "Auditing, accountability, anti-corruption tracking" },
    { id: "gov-treasury", name: "Public Treasury & Allocation Portal", icon: "💵", desc: "Fund disbursement, fiscal management" }
  ],
  departments: [
    "Department of Public Administration",
    "Procurement & Disposal Unit",
    "Finance & Economic Planning",
    "Internal Audit Directorate",
    "Legal & Parliamentary Affairs"
  ],
  modules: [
    { id: "citizen-registry", name: "National Citizen Registry Integration", icon: "🪪", status: "Active" },
    { id: "budget-allocator", name: "Public Budget Appropriation Engine", icon: "💰", status: "Active" },
    { id: "procurement-system", name: "e-Procurement & Tender Management", icon: "📑", status: "Active" },
    { id: "policy-tracker", name: "Government Policy & Directive Tracker", icon: "📊", status: "Active" },
    { id: "public-payroll", name: "Public Service Consolidated Payroll", icon: "💼", status: "Active" }
  ],
  workflows: [
    { id: "wf-tender-approval", name: "Public Tender Evaluation & Award Workflow", steps: 5 },
    { id: "wf-budget-approval", name: "Ministerial Budget Appropriation Workflow", steps: 4 }
  ],
  roles: ["Cabinet Minister", "Permanent Secretary", "Accounting Officer", "Procurement Officer", "Auditor General", "Citizen"],
  forms: [
    { id: "form-tender-bid", name: "Public Tender Submission Form" },
    { id: "form-license-app", name: "Government Operating License Application Form" }
  ],
  reports: [
    { id: "rep-gov-budget", name: "National Budget Performance & Execution Report" }
  ]
};
