export const churchConfig = {
  id: "Diocese-Church-ERP",
  name: "Diocese & Church Administration ERP",
  family: "Church",
  governanceModel: "Bishop, Diocesan Council & Executive Board",
  description: "Faith-based digital operating system for churches, dioceses, ministries, and religious organizations.",
  portals: [
    { id: "church-public", name: "Parish Public & Community Portal", icon: "🌐", desc: "Services, sermons, events, giving" },
    { id: "church-login", name: "Clergy & Admin Login Portal", icon: "🔐", desc: "Secured pastor and administrator authentication" },
    { id: "church-workspace", name: "Diocese Administration Workspace", icon: "⛪", desc: "Parishes, clergy assignments, sacraments" },
    { id: "member-portal", name: "Church Member Workspace", icon: "👥", desc: "Membership profile, tithes, small groups" },
    { id: "finance-church", name: "Church Tithes & Finance Portal", icon: "💵", desc: "Tithes, offerings, project fundraising, FAAP ledger" }
  ],
  departments: [
    "Diocesan Secretariat",
    "Pastoral & Clergy Affairs",
    "Church Finance & Endowment",
    "Missions & Evangelism",
    "Youth & Family Ministry"
  ],
  modules: [
    { id: "membership-registry", name: "Parishioner Membership Registry", icon: "👥", status: "Active" },
    { id: "sacraments", name: "Sacramental Records (Baptism, Matrimony)", icon: "📜", status: "Active" },
    { id: "tithes-giving", name: "Tithes, Offerings & Giving Manager", icon: "🤲", status: "Active" },
    { id: "clergy-directory", name: "Clergy Assignment & Roster", icon: "👔", status: "Active" },
    { id: "outreach-projects", name: "Community Outreach & Project Tracker", icon: "🌟", status: "Active" }
  ],
  workflows: [
    { id: "wf-baptism-request", name: "Baptism & Confirmation Registration Workflow", steps: 3 },
    { id: "wf-tithe-reconciliation", name: "Parish Tithe & Offering Reconciliation Workflow", steps: 3 }
  ],
  roles: ["Bishop / Overseer", "Parish Priest", "Church Administrator", "Treasurer", "Parishioner"],
  forms: [
    { id: "form-baptism-app", name: "Sacrament of Baptism Application Form" },
    { id: "form-pledge-card", name: "Church Building Project Pledge Form" }
  ],
  reports: [
    { id: "rep-diocesan-annual", name: "Diocesan Annual Statistical & Financial Report" }
  ]
};
