export const alumniConfig = {
  id: "Alumni-ERP",
  name: "Alumni Network & Lifelong Engagement Platform",
  family: "Education",
  educationLevel: "Alumni & Graduate Network",
  governanceModel: "Alumni Executive Council & Director of Relations",
  description: "Enterprise alumni engagement, career tracking, fundraising, mentorship, and lifelong institutional relationship platform.",
  portals: [
    { id: "alumni-public", name: "Alumni Public & Verification Portal", icon: "🌐", desc: "Public directory, verification, news" },
    { id: "alumni-login", name: "Alumni Authentication Portal", icon: "🔐", desc: "Secure graduate login & identity" },
    { id: "alumni-workspace", name: "Graduate Member Workspace", icon: "🎓", desc: "Profile, network, chapters, events" },
    { id: "alumni-office", name: "University Alumni Office Portal", icon: "🏛️", desc: "Directory administration, communications, analytics" },
    { id: "career-portal", name: "Career & Job Board Portal", icon: "💼", desc: "Job postings, recruitment, CV matching" },
    { id: "mentorship-portal", name: "Mentorship & Guidance Portal", icon: "🤝", desc: "Student-alumni mentorship pairing" },
    { id: "events-portal", name: "Reunions & Events Portal", icon: "📅", desc: "Homecoming, chapter meetups, ticketing" },
    { id: "donations-portal", name: "Endowment & Fundraising Portal", icon: "💰", desc: "Campaigns, giving, scholarships funding" },
    { id: "chapter-portal", name: "Regional Chapters Portal", icon: "🌍", desc: "International and regional alumni chapters" },
    { id: "admin-portal", name: "System Administration Portal", icon: "⚙️", desc: "Roles, permissions, security, logs" }
  ],
  departments: [
    "Directorate of Alumni Relations",
    "Career Services & Placement",
    "Endowment & Fundraising Office",
    "Institutional Advancement",
    "Chapters & Regional Coordination"
  ],
  modules: [
    { id: "registry", name: "Graduate Registry & Profiles", icon: "📁", status: "Active" },
    { id: "verification", name: "Degree & Certificate Verification", icon: "🛡️", status: "Active" },
    { id: "career-board", name: "Career Center & Job Board", icon: "💼", status: "Active" },
    { id: "mentorship", name: "Mentorship Matching Engine", icon: "🤝", status: "Active" },
    { id: "fundraising", name: "Endowment & Donations Manager", icon: "💵", status: "Active" },
    { id: "chapters", name: "Regional Chapters Manager", icon: "🌐", status: "Active" },
    { id: "events", name: "Reunions & Ticketing", icon: "🎟️", status: "Active" },
    { id: "analytics", name: "Engagement & Impact Analytics", icon: "📈", status: "Active" }
  ],
  workflows: [
    { id: "wf-alumni-verify", name: "Graduate Identity Verification Workflow", steps: 3 },
    { id: "wf-alumni-fund", name: "Endowment Grant & Disbursement Workflow", steps: 4 }
  ],
  roles: ["Alumni Director", "Chapter President", "Graduate Member", "Employer", "System Administrator"],
  forms: [
    { id: "form-alumni-reg", name: "Alumni Registration & Profile Update Form" },
    { id: "form-alumni-job", name: "Employer Job Posting Form" },
    { id: "form-alumni-donate", name: "Endowment Contribution Pledge Form" }
  ],
  reports: [
    { id: "rep-alumni-engagement", name: "Annual Alumni Engagement & Giving Report" },
    { id: "rep-alumni-career", name: "Graduate Employment & Career Progression Report" }
  ]
};
