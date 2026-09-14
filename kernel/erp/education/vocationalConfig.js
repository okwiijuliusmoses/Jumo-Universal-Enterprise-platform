export const vocationalConfig = {
  id: "Vocational-ERP",
  name: "Vocational & Technical Training ERP",
  family: "Education",
  educationLevel: "Vocational / Technical",
  governanceModel: "Director & Technical Board",
  description: "Enterprise operating system for vocational training institutes, technical colleges, and practical skills centers.",
  portals: [
    { id: "voc-student", name: "Skills Student Portal", icon: "🛠️", desc: "Competency tracking, workshops, schedule" },
    { id: "voc-instructor", name: "Instructor Portal", icon: "👨‍🔧", desc: "Practical assessments, workshop grading" },
    { id: "voc-workshop", name: "Workshop & Equipment Portal", icon: "⚙️", desc: "Tools inventory, safety logs, maintenance" },
    { id: "voc-industry", name: "Industry Partnership Portal", icon: "🤝", desc: "Apprenticeships, placements, employers" }
  ],
  departments: [
    "Directorate of Training",
    "Technical Workshops",
    "Skills Assessment Unit",
    "Industry Placement & Apprenticeships",
    "Administration & Procurement"
  ],
  modules: [
    { id: "competency", name: "Competency Management", icon: "🎯", status: "Active" },
    { id: "practical-training", name: "Practical Training & Workshop", icon: "🔧", status: "Active" },
    { id: "workshop-inventory", name: "Equipment & Tool Inventory", icon: "📦", status: "Active" },
    { id: "apprenticeships", name: "Industrial Attachment & Placement", icon: "🏭", status: "Active" },
    { id: "certification", name: "Skills Certification & Trade Tests", icon: "📜", status: "Active" }
  ],
  workflows: [
    { id: "wf-voc-assessment", name: "Practical Competency Verification", steps: 3 },
    { id: "wf-voc-attachment", name: "Industrial Attachment Approval", steps: 4 }
  ],
  roles: ["Director", "Workshop Supervisor", "Instructor", "Apprentice", "Industry Partner"],
  forms: [
    { id: "form-voc-enroll", name: "Skills Training Enrollment Form" },
    { id: "form-voc-logbook", name: "Apprenticeship Logbook Submission" }
  ],
  reports: [
    { id: "rep-voc-competency", name: "Trade Test Pass Rates & Competencies" },
    { id: "rep-voc-inventory", name: "Workshop Equipment Maintenance Status" }
  ]
};
