export const clanConfig = {
  id: "Clan-ERP",
  name: "Family Heritage & Clan Council ERP",
  family: "FamilyClan",
  governanceModel: "Clan Elders, Heritage Trustees & Executive Council",
  description: "Digital heritage platform for family clans, cultural institutions, ancestral lineage records, and community development projects.",
  portals: [
    { id: "clan-public", name: "Clan Heritage & Public Portal", icon: "🌐", desc: "Lineage history, cultural events, public notices" },
    { id: "clan-login", name: "Clan Member Login Portal", icon: "🔐", desc: "Secure relative authentication and registry" },
    { id: "clan-workspace", name: "Clan Council Executive Workspace", icon: "🏛️", desc: "Genealogy registry, meetings, council decisions" },
    { id: "development-portal", name: "Clan Development & Endowment Portal", icon: "🤝", desc: "Ancestral land projects, scholarships, giving" }
  ],
  departments: [
    "Council of Elders & Genealogy",
    "Cultural & Heritage Affairs",
    "Finance & Ancestral Land Trust",
    "Youth & Family Welfare"
  ],
  modules: [
    { id: "lineage-registry", name: "Ancestral Lineage & Family Tree Registry", icon: "🌳", status: "Active" },
    { id: "cultural-events", name: "Cultural Gatherings & Ceremonies", icon: "📅", status: "Active" },
    { id: "clan-fund", name: "Family Development & Welfare Fund", icon: "💰", status: "Active" },
    { id: "dispute-resolution", name: "Clan Mediation & Arbitration Records", icon: "⚖️", status: "Active" }
  ],
  workflows: [
    { id: "wf-lineage-verify", name: "New Relative Lineage Verification Workflow", steps: 3 },
    { id: "wf-welfare-grant", name: "Family Welfare Support Grant Workflow", steps: 3 }
  ],
  roles: ["Clan Elder", "Council Secretary", "Treasurer", "Clan Member"],
  forms: [
    { id: "form-relative-reg", name: "New Relative Birth & Lineage Registration Form" },
    { id: "form-welfare-req", name: "Family Welfare & Education Support Request Form" }
  ],
  reports: [
    { id: "rep-clan-census", name: "Clan Demographic & Membership Census Report" }
  ]
};
