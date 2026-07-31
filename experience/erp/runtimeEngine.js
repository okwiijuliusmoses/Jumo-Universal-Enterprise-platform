/**
 * JUMO UEOS ERP Runtime Engine & Application Registry
 * Manages installable ERP templates, active module loading, governance portals,
 * departments, offices, components, digital forms, and workflows.
 */

export const ERP_CATALOGUE = [
  {
    id: "edu-uni",
    ecosystem: "Education",
    name: "University ERP",
    code: "UNIV-ERP-01",
    icon: "🎓",
    description: "Complete academic and executive management for universities.",
    governancePortals: [
      { id: "exec", name: "Executive Council & Senate", desc: "Chancellor, Vice Chancellor, Registrar, and Senate resolutions." },
      { id: "academic", name: "Academic Affairs & Faculties", desc: "Faculties, departments, programs, timetables, and grading." },
      { id: "finance", name: "Financial & Treasury Operations", desc: "Tuition collection, FAAP budgets, grants, and payroll." },
      { id: "hr", name: "Human Resources & Staff", desc: "Faculty recruitment, tenure, payroll, and performance." },
      { id: "student", name: "Student Affairs & Admissions", desc: "Admissions, enrollment, dorms, graduation, and records." },
      { id: "sacco", name: "Staff SACCO Portal", desc: "Integrated FAAP Staff SACCO savings, shares, and loans." }
    ],
    departments: [
      { name: "Registrar Department", office: "Admissions & Records Office", modules: ["Admissions Queue", "Student Registry", "Transcript Verification", "Graduation Clearance"] },
      { name: "Faculty of Computing", office: "Department of Software Engineering", modules: ["Course Scheduling", "Examinations Board", "Research Grants", "Laboratory Allocations"] },
      { name: "University Treasury", office: "Bursar & Revenue Office", modules: ["Tuition Ledger", "FAAP Payroll", "Vendor Disburse", "Asset Register"] }
    ],
    defaultModules: ["Admissions", "Student Registry", "Course Catalog", "Examinations", "FAAP Payroll", "Staff SACCO", "Library Registry"]
  },
  {
    id: "edu-col",
    ecosystem: "Education",
    name: "College ERP",
    code: "COL-ERP-02",
    icon: "🏛️",
    description: "Tertiary and diploma college administration platform.",
    governancePortals: [
      { id: "council", name: "College Governing Council", desc: "Board oversight, accreditation, and strategic planning." },
      { id: "academic", name: "Directorate of Studies", desc: "Curriculum, continuous assessment, and exams." },
      { id: "finance", name: "Bursary & Accounts", desc: "Fee collection, budgeting, and procurement." },
      { id: "sacco", name: "Staff SACCO Portal", desc: "Integrated FAAP Staff SACCO." }
    ],
    departments: [
      { name: "Academics", office: "Exams Office", modules: ["Term Grading", "Attendance Registry", "Timetabling"] },
      { name: "Administration", office: "HR Office", modules: ["Staff Records", "Leave Management"] }
    ],
    defaultModules: ["Student Enrollment", "Grading", "FAAP Payroll", "Staff SACCO"]
  },
  {
    id: "edu-voc",
    ecosystem: "Education",
    name: "Vocational & Technical ERP",
    code: "VOC-ERP-03",
    icon: "⚡",
    description: "Technical institute and practical skills training administration.",
    governancePortals: [
      { id: "board", name: "Technical Training Board", desc: "Skills certification and industry partnerships." },
      { id: "workshops", name: "Workshop Directorate", desc: "Equipment maintenance, materials inventory, and practical testing." },
      { id: "sacco", name: "Staff SACCO Portal", desc: "Integrated FAAP Staff SACCO." }
    ],
    departments: [
      { name: "Workshop Unit", office: "Electrical & Mechanics", modules: ["Tool Inventory", "Practical Assessment", "Safety Logs"] }
    ],
    defaultModules: ["Workshop Registry", "Practical Grading", "FAAP Payroll", "Staff SACCO"]
  },
  {
    id: "edu-sec",
    ecosystem: "Education",
    name: "Secondary School ERP",
    code: "SEC-ERP-04",
    icon: "🏫",
    description: "O and A-Level comprehensive school management.",
    governancePortals: [
      { id: "board", name: "School Board of Governors", desc: "Policy, discipline, and infrastructure." },
      { id: "dos", name: "Directorate of Studies", desc: "Term reports, UNEB registration, and discipline." },
      { id: "sacco", name: "Staff SACCO Portal", desc: "Integrated FAAP Staff SACCO." }
    ],
    departments: [
      { name: "Academics", office: "Director of Studies", modules: ["Report Cards", "Class Registers", "Discipline Log"] }
    ],
    defaultModules: ["Term Reports", "Fee Management", "FAAP Payroll", "Staff SACCO"]
  },
  {
    id: "edu-pri",
    ecosystem: "Education",
    name: "Nursery & Primary ERP",
    code: "PRI-ERP-05",
    icon: "🎨",
    description: "Early childhood and primary education management.",
    governancePortals: [
      { id: "admin", name: "Headteacher Administration", desc: "Pupil enrollment, attendance, and safety." },
      { id: "sacco", name: "Staff SACCO Portal", desc: "Integrated FAAP Staff SACCO." }
    ],
    departments: [
      { name: "Primary Section", office: "Admissions", modules: ["Pupil Registry", "Attendance", "Parent Portal"] }
    ],
    defaultModules: ["Pupil Registry", "Attendance", "FAAP Payroll", "Staff SACCO"]
  },
  {
    id: "church-prov",
    ecosystem: "Church",
    name: "Church Province ERP",
    code: "CH-PROV-01",
    icon: "⛪",
    description: "Provincial ecclesiastical governance and synod administration.",
    governancePortals: [
      { id: "synod", name: "Provincial Synod", desc: "Bishops, canon law, and provincial resolutions." },
      { id: "missions", name: "Board of Missions & Evangelism", desc: "Global outreach and church planting." },
      { id: "finance", name: "Provincial Treasury", desc: "Tithes, offerings clearing, and diocesan levies." },
      { id: "sacco", name: "Staff SACCO Portal", desc: "Integrated FAAP Staff SACCO." }
    ],
    departments: [
      { name: "Clergy Secretariat", office: "Bishop's Office", modules: ["Clergy Registry", "Ordination Records", "Postings"] }
    ],
    defaultModules: ["Clergy Registry", "Tithes & Offerings", "FAAP Treasury", "Staff SACCO"]
  },
  {
    id: "church-dio",
    ecosystem: "Church",
    name: "Church Diocese ERP",
    code: "CH-DIO-02",
    icon: "⛪",
    description: "Diocesan administration and archdeaconry supervision.",
    governancePortals: [
      { id: "standing", name: "Diocesan Standing Committee", desc: "Parish supervision and diocesan assets." },
      { id: "sacco", name: "Staff SACCO Portal", desc: "Integrated FAAP Staff SACCO." }
    ],
    departments: [
      { name: "Parish Coordination", office: "Archdeaconry Office", modules: ["Parish Register", "Sunday Collections", "Youth Ministry"] }
    ],
    defaultModules: ["Parish Register", "Collections", "FAAP Payroll", "Staff SACCO"]
  },
  {
    id: "hosp-hotel",
    ecosystem: "Hospitality",
    name: "Hotel & Resort ERP",
    code: "HOSP-HTL-01",
    icon: "🏨",
    description: "Comprehensive hotel, resort, and lodging management platform.",
    governancePortals: [
      { id: "exec", name: "Executive Management", desc: "Revenue management, occupancy tracking, and guest satisfaction." },
      { id: "front", name: "Front Office & Reservations", desc: "Check-in, room inventory, and concierge services." },
      { id: "restaurant", name: "Food & Beverage Directorate", desc: "Restaurant POS, kitchen display, and catering events." },
      { id: "sacco", name: "Staff SACCO Portal", desc: "Integrated FAAP Staff SACCO." }
    ],
    departments: [
      { name: "Front Office", office: "Reservations Desk", modules: ["Room Booking", "Guest Ledger", "Check-in Queue"] },
      { name: "Housekeeping", office: "Maintenance Unit", modules: ["Room Status", "Inventory", "Laundry Logs"] }
    ],
    defaultModules: ["Room Booking", "Restaurant POS", "Housekeeping", "FAAP Payroll", "Staff SACCO"]
  },
  {
    id: "standalone-alumni",
    ecosystem: "Alumni",
    name: "Alumni ERP",
    code: "ALUM-01",
    icon: "🤝",
    description: "Global alumni network, chapter management, and endowment fundraising.",
    governancePortals: [
      { id: "board", name: "Alumni Executive Board", desc: "Chapters, fundraising, and mentorship programs." },
      { id: "sacco", name: "Staff SACCO Portal", desc: "Integrated FAAP Staff SACCO." }
    ],
    departments: [
      { name: "Chapters", office: "Regional Chapters", modules: ["Member Directory", "Donations", "Reunions"] }
    ],
    defaultModules: ["Member Directory", "Endowment Funds", "FAAP Payroll", "Staff SACCO"]
  },
  {
    id: "standalone-retail",
    ecosystem: "Wholesale & Retail",
    name: "Wholesale & Retail ERP",
    code: "RET-01",
    icon: "🛍️",
    description: "Multi-branch merchandising, POS, warehousing, and inventory control.",
    governancePortals: [
      { id: "ops", name: "Commercial Operations", desc: "Sales targets, branch performance, and supply chain." },
      { id: "sacco", name: "Staff SACCO Portal", desc: "Integrated FAAP Staff SACCO." }
    ],
    departments: [
      { name: "Warehouse", office: "Logistics Unit", modules: ["Inventory Stock", "Purchase Orders", "Dispatch"] }
    ],
    defaultModules: ["POS Terminals", "Inventory Stock", "FAAP Payroll", "Staff SACCO"]
  },
  {
    id: "standalone-gov",
    ecosystem: "Government",
    name: "Government ERP",
    code: "GOV-01",
    icon: "🏛️",
    description: "Public administration, civil service records, and citizen service delivery.",
    governancePortals: [
      { id: "cabinet", name: "Cabinet & Executive Secretariat", desc: "Policy directives, public budgets, and inter-agency coordination." },
      { id: "sacco", name: "Staff SACCO Portal", desc: "Integrated FAAP Staff SACCO." }
    ],
    departments: [
      { name: "Civil Service", office: "Personnel Records", modules: ["Civil Servant Registry", "Pension Ledger", "Public Audit"] }
    ],
    defaultModules: ["Civil Servant Registry", "Public Budget", "FAAP Payroll", "Staff SACCO"]
  },
  {
    id: "standalone-health",
    ecosystem: "Healthcare",
    name: "Healthcare ERP",
    code: "HLTH-01",
    icon: "🏥",
    description: "National hospital networks, regional clinics, EMR, and pharmacy logistics.",
    governancePortals: [
      { id: "board", name: "Hospital Board of Directors", desc: "Clinical standards, accreditation, and health policies." },
      { id: "sacco", name: "Staff SACCO Portal", desc: "Integrated FAAP Staff SACCO." }
    ],
    departments: [
      { name: "Clinical Services", office: "Outpatient Department", modules: ["Patient EMR", "Pharmacy Inventory", "Ward Management"] }
    ],
    defaultModules: ["Patient EMR", "Pharmacy Stock", "FAAP Payroll", "Staff SACCO"]
  },
  {
    id: "standalone-ngo",
    ecosystem: "NGO",
    name: "NGO ERP",
    code: "NGO-01",
    icon: "🌍",
    description: "Grant management, donor reporting, project milestones, and field audits.",
    governancePortals: [
      { id: "board", name: "Board of Trustees", desc: "Donor compliance, governance, and mission oversight." },
      { id: "sacco", name: "Staff SACCO Portal", desc: "Integrated FAAP Staff SACCO." }
    ],
    departments: [
      { name: "Programs", office: "Grant Management", modules: ["Donor Reports", "Field Milestones", "Beneficiary Registry"] }
    ],
    defaultModules: ["Grant Tracking", "Donor Reports", "FAAP Payroll", "Staff SACCO"]
  }
];

export class ERPRuntimeEngine {
  constructor() {
    this.installedERPs = [
      {
        instanceId: "inst-univ-01",
        templateId: "edu-uni",
        name: "University of Kampala ERP",
        status: "Active Production",
        installedAt: "2026-05-10",
        activeModules: ["Admissions", "Student Registry", "Course Catalog", "Examinations", "FAAP Payroll", "Staff SACCO", "Library Registry"],
        tenantId: "tenant-default-001"
      }
    ];
  }

  installERP(templateId) {
    const template = ERP_CATALOGUE.find(t => t.id === templateId);
    if (!template) return null;

    const instanceId = `inst-${templateId}-${Date.now().toString().slice(-4)}`;
    const newInstance = {
      instanceId,
      templateId,
      name: `${template.name} (Deployed)`,
      status: "Active Production",
      installedAt: new Date().toISOString().split('T')[0],
      activeModules: [...template.defaultModules],
      tenantId: `tenant-${Date.now().toString().slice(-4)}`
    };

    this.installedERPs.push(newInstance);
    return newInstance;
  }

  getInstalled() {
    return this.installedERPs;
  }

  getTemplate(templateId) {
    return ERP_CATALOGUE.find(t => t.id === templateId) || ERP_CATALOGUE[0];
  }
}
