/**
 * JUMO UEOS ERP Runtime Engine & Application Registry (Consolidated & Synchronized)
 * Manages installable ERP templates, active module loading, governance portals,
 * departments, offices, components, digital forms, and workflows.
 * Updated: 2026-07-31
 */

export const DIGITAL_FORMS_CATALOGUE = [
  { id: "form-std-app", name: "Student Application & Admission Form", category: "Education", fields: ["Applicant Name", "National ID / Passport", "Selected Program", "Previous Academic Qualifications", "Emergency Contact"], approvalPath: ["Admissions Officer", "Head of Department", "Academic Registrar"] },
  { id: "form-emp-reg", name: "Employee Registration & Onboarding Form", category: "Human Resources", fields: ["Full Name", "Tax ID / NIN", "Designation", "Department", "Bank Account Details", "SACCO Membership Opt-in"], approvalPath: ["HR Manager", "Department Head", "Bursar / Finance"] },
  { id: "form-leave-req", name: "Staff Leave & Absence Request", category: "Human Resources", fields: ["Employee ID", "Leave Type (Annual/Sick/Study)", "Start Date", "End Date", "Handover Delegate"], approvalPath: ["Supervisor", "HR Office"] },
  { id: "form-proc-req", name: "Institutional Procurement Requisition", category: "Procurement", fields: ["Requisition Title", "Department Code", "Item Description & Quantity", "Estimated Cost", "Vendor Quotes Attachment"], approvalPath: ["Department Head", "Procurement Officer", "Bursar", "Accounting Officer"] },
  { id: "form-pay-appr", name: "FAAP Payment & Disbursement Voucher", category: "Finance & Treasury", fields: ["Payee Name", "Invoice Reference", "Amount", "Currency", "Budget Line Code", "FAAP Wallet Address"], approvalPath: ["Internal Auditor", "Finance Director", "Platform Owner / VC"] },
  { id: "form-doc-sub", name: "Digital Document Submission & Verification", category: "Administration", fields: ["Document Title", "Document Category", "Issuing Authority", "Digital Signature Hash", "Attachment"], approvalPath: ["Document Registrar", "Legal Counsel"] },
  { id: "form-sacco-loan", name: "Staff SACCO Loan Application Form", category: "Staff SACCO", fields: ["Member SACCO ID", "Loan Category (Development/Emergency/School Fees)", "Requested Loan Amount", "Repayment Period (Months)", "Guarantor 1 ID", "Guarantor 2 ID"], approvalPath: ["SACCO Credit Committee", "SACCO Treasurer", "FAAP Auto-Disburse"] },
  { id: "form-inst-reg", name: "New Enterprise Institution Profile Form", category: "Governance", fields: ["Institution Name", "Ecosystem Category", "Registration License No.", "Head of Institution", "Primary Domain", "FAAP Clearinghouse Account"], approvalPath: ["Platform Owner / Control Center"] }
];

export const ERP_CATALOGUE = [
  // 1. Education Ecosystem (5 ERPs)
  {
    id: "edu-uni",
    ecosystem: "Education",
    name: "University ERP",
    code: "UNIV-ERP-01",
    icon: "🎓",
    description: "Complete academic, governance, and executive management for public & private universities.",
    governancePortals: [
      { id: "council", name: "University Council & Senate", desc: "Chancellor, Vice Chancellor, Registrar, and Senate academic resolutions." },
      { id: "academic", name: "Directorate of Academic Affairs", desc: "Faculties, departments, degree programs, timetables, and grading." },
      { id: "finance", name: "University Bursary & Treasury", desc: "Tuition collection, FAAP budgets, research grants, and payroll." },
      { id: "hr", name: "Human Resources Directorate", desc: "Faculty recruitment, tenure, staff payroll, and performance appraisal." },
      { id: "student", name: "Student Affairs & Admissions", desc: "Admissions, enrollment, dormitories, graduation, and transcripts." },
      { id: "sacco", name: "Staff SACCO Portal", desc: "Integrated FAAP Staff SACCO savings, shares, dividends, and loans." }
    ],
    departments: [
      { name: "Registrar Department", office: "Admissions & Academic Records Office", modules: ["Admissions Queue", "Student Registry", "Transcript Verification", "Graduation Clearance"] },
      { name: "Faculty of Computing", office: "Department of Software Engineering", modules: ["Course Scheduling", "Examinations Board", "Research Grants", "Laboratory Allocations"] },
      { name: "University Treasury", office: "Bursar & Revenue Office", modules: ["Tuition Ledger", "FAAP Payroll", "Vendor Disburse", "Asset Register"] }
    ],
    defaultModules: ["Admissions Queue", "Student Registry", "Course Catalog", "Examinations Board", "FAAP Payroll", "Staff SACCO", "Library Registry", "Research Grants"]
  },
  {
    id: "edu-col",
    ecosystem: "Education",
    name: "College ERP",
    code: "COL-ERP-02",
    icon: "🏛️",
    description: "Tertiary, diploma, and institute administration platform.",
    governancePortals: [
      { id: "board", name: "College Governing Board", desc: "Board oversight, accreditation, and strategic expansion." },
      { id: "academic", name: "Directorate of Studies", desc: "Curriculum, continuous assessment, exams, and diploma awards." },
      { id: "bursary", name: "Bursary & Accounts", desc: "Fee collection, budgeting, procurement, and staff payroll." },
      { id: "sacco", name: "Staff SACCO Portal", desc: "Integrated FAAP Staff SACCO." }
    ],
    departments: [
      { name: "Academic Office", office: "Exams & Timetabling Office", modules: ["Term Grading", "Attendance Registry", "Timetabling"] },
      { name: "Administration", office: "HR & Records Office", modules: ["Staff Records", "Leave Management"] }
    ],
    defaultModules: ["Student Enrollment", "Grading Ledger", "FAAP Payroll", "Staff SACCO", "Library"]
  },
  {
    id: "edu-voc",
    ecosystem: "Education",
    name: "Vocational & Technical ERP",
    code: "VOC-ERP-03",
    icon: "⚡",
    description: "Technical institute and practical skills training administration.",
    governancePortals: [
      { id: "board", name: "Technical Training Board", desc: "Skills certification, trade testing, and industry partnerships." },
      { id: "workshops", name: "Directorate of Workshops", desc: "Equipment maintenance, materials inventory, and practical testing." },
      { id: "sacco", name: "Staff SACCO Portal", desc: "Integrated FAAP Staff SACCO." }
    ],
    departments: [
      { name: "Workshop Unit", office: "Electrical & Mechanical Engineering", modules: ["Tool Inventory", "Practical Assessment", "Safety Logs"] }
    ],
    defaultModules: ["Workshop Registry", "Practical Grading", "FAAP Payroll", "Staff SACCO", "Tool Store"]
  },
  {
    id: "edu-sec",
    ecosystem: "Education",
    name: "Secondary School ERP",
    code: "SEC-ERP-04",
    icon: "🏫",
    description: "O and A-Level comprehensive secondary school management.",
    governancePortals: [
      { id: "board", name: "Board of Governors (BOG)", desc: "School policy, infrastructure development, and discipline." },
      { id: "dos", name: "Directorate of Studies (DOS)", desc: "Term reports, national exam registration, and curriculum." },
      { id: "sacco", name: "Staff SACCO Portal", desc: "Integrated FAAP Staff SACCO." }
    ],
    departments: [
      { name: "Academics", office: "Director of Studies Office", modules: ["Report Cards", "Class Registers", "Discipline Log"] }
    ],
    defaultModules: ["Term Reports", "Fee Management", "FAAP Payroll", "Staff SACCO", "Dormitory Register"]
  },
  {
    id: "edu-pri",
    ecosystem: "Education",
    name: "Nursery & Primary ERP",
    code: "PRI-ERP-05",
    icon: "🎨",
    description: "Early childhood and primary education management platform.",
    governancePortals: [
      { id: "admin", name: "Headteacher Secretariat", desc: "Pupil enrollment, attendance tracking, and child safety." },
      { id: "sacco", name: "Staff SACCO Portal", desc: "Integrated FAAP Staff SACCO." }
    ],
    departments: [
      { name: "Primary Section", office: "Admissions & Parent Desk", modules: ["Pupil Registry", "Attendance", "Parent Portal"] }
    ],
    defaultModules: ["Pupil Registry", "Daily Attendance", "FAAP Payroll", "Staff SACCO", "Parent Messaging"]
  },

  // 2. Church Ecosystem (2 ERPs)
  {
    id: "church-prov",
    ecosystem: "Church",
    name: "Church Province ERP",
    code: "CH-PROV-01",
    icon: "⛪",
    description: "Provincial ecclesiastical governance, synod administration, and multi-diocese oversight.",
    governancePortals: [
      { id: "synod", name: "Provincial Synod Secretariat", desc: "House of Bishops, canon law resolutions, and provincial assemblies." },
      { id: "missions", name: "Board of Missions & Evangelism", desc: "Global outreach, church planting, and theological education." },
      { id: "treasury", name: "Provincial Treasury", desc: "Tithes, diocesan quota clearing, and FAAP investments." },
      { id: "sacco", name: "Staff SACCO Portal", desc: "Integrated Clergy & Lay Staff SACCO." }
    ],
    departments: [
      { name: "Clergy Secretariat", office: "Archbishop's Office", modules: ["Clergy Registry", "Ordination Records", "Postings & Transfers"] }
    ],
    defaultModules: ["Clergy Registry", "Tithes & Quotas", "FAAP Treasury", "Staff SACCO", "Synod Resolutions"]
  },
  {
    id: "church-dio",
    ecosystem: "Church",
    name: "Church Diocese ERP",
    code: "CH-DIO-02",
    icon: "⛪",
    description: "Diocesan administration, archdeaconry supervision, and parish registries.",
    governancePortals: [
      { id: "standing", name: "Diocesan Standing Committee", desc: "Parish supervision, diocesan assets, and clergy welfare." },
      { id: "sacco", name: "Staff SACCO Portal", desc: "Integrated Diocesan Staff SACCO." }
    ],
    departments: [
      { name: "Parish Coordination", office: "Archdeaconry Supervision Office", modules: ["Parish Register", "Sunday Collections", "Youth Ministry"] }
    ],
    defaultModules: ["Parish Register", "Sunday Collections", "FAAP Payroll", "Staff SACCO", "Sacramental Register"]
  },

  // 3. Hospitality Ecosystem (1 ERP)
  {
    id: "hosp-hotel",
    ecosystem: "Hospitality",
    name: "Hotel & Resort ERP",
    code: "HOSP-HTL-01",
    icon: "🏨",
    description: "Comprehensive hotel, resort, restaurant, tourism, and conference centre platform.",
    governancePortals: [
      { id: "exec", name: "Executive Directorate", desc: "Yield & revenue management, occupancy tracking, and guest experience." },
      { id: "front", name: "Front Office & Reservations", desc: "Check-in, room inventory, concierge, and guest folio." },
      { id: "restaurant", name: "Food & Beverage Directorate", desc: "Restaurant POS, kitchen display, bar inventory, and catering events." },
      { id: "sacco", name: "Staff SACCO Portal", desc: "Integrated Staff SACCO." }
    ],
    departments: [
      { name: "Front Office", office: "Reservations Desk", modules: ["Room Booking", "Guest Ledger", "Check-in Queue"] },
      { name: "Housekeeping", office: "Maintenance Unit", modules: ["Room Status", "Inventory", "Laundry Logs"] }
    ],
    defaultModules: ["Room Booking", "Restaurant POS", "Housekeeping", "FAAP Payroll", "Staff SACCO", "Event Catering"]
  },

  // 4. Company Ecosystem (3 ERPs)
  {
    id: "comp-service",
    ecosystem: "Company",
    name: "Service Company ERP",
    code: "COMP-SVC-01",
    icon: "💼",
    description: "Professional services, consulting, IT agencies, and project-based enterprises.",
    governancePortals: [
      { id: "exec", name: "Board of Directors", desc: "Client portfolios, project profitability, and growth metrics." },
      { id: "sacco", name: "Staff SACCO Portal", desc: "Integrated Staff SACCO." }
    ],
    departments: [
      { name: "Operations", office: "Project Management Office (PMO)", modules: ["Client Billing", "Timesheets", "Project Milestones"] }
    ],
    defaultModules: ["Client Invoicing", "Timesheets", "Project Tracker", "FAAP Payroll", "Staff SACCO"]
  },
  {
    id: "comp-goods",
    ecosystem: "Company",
    name: "Goods Company ERP",
    code: "COMP-GDS-02",
    icon: "🏭",
    description: "Manufacturing, assembly plants, processing, and supply chain logistics.",
    governancePortals: [
      { id: "exec", name: "Plant Executive Board", desc: "Production lines, bill of materials (BOM), and quality assurance." },
      { id: "sacco", name: "Staff SACCO Portal", desc: "Integrated Staff SACCO." }
    ],
    departments: [
      { name: "Manufacturing", office: "Production Floor Desk", modules: ["BOM Registry", "Work Orders", "Quality Control"] }
    ],
    defaultModules: ["BOM Registry", "Inventory Warehousing", "Procurement", "FAAP Payroll", "Staff SACCO"]
  },
  {
    id: "comp-retail",
    ecosystem: "Company",
    name: "Wholesale & Retail ERP",
    code: "COMP-RET-03",
    icon: "🛍️",
    description: "Multi-branch merchandising, POS terminals, inventory control, and supply chain.",
    governancePortals: [
      { id: "ops", name: "Commercial Operations Directorate", desc: "Sales targets, branch performance, and distributor logistics." },
      { id: "sacco", name: "Staff SACCO Portal", desc: "Integrated Staff SACCO." }
    ],
    departments: [
      { name: "Logistics", office: "Central Warehouse Office", modules: ["Inventory Stock", "Purchase Orders", "Dispatch"] }
    ],
    defaultModules: ["POS Terminals", "Inventory Stock", "Vendor Clearing", "FAAP Payroll", "Staff SACCO"]
  },

  // 5. Independent ERPs
  {
    id: "standalone-alumni",
    ecosystem: "Alumni",
    name: "Alumni ERP",
    code: "ALUM-01",
    icon: "🤝",
    description: "Global alumni network, regional chapters, fundraising, and endowment management.",
    governancePortals: [
      { id: "board", name: "Alumni Executive Board", desc: "Global chapters, endowment funds, mentorship, and reunions." },
      { id: "sacco", name: "Staff SACCO Portal", desc: "Integrated Staff SACCO." }
    ],
    departments: [
      { name: "Chapters", office: "Regional Chapters Secretariat", modules: ["Member Directory", "Donation Ledger", "Reunions"] }
    ],
    defaultModules: ["Member Directory", "Endowment Fund", "Donation Ledger", "FAAP Payroll", "Staff SACCO"]
  },
  {
    id: "standalone-gov",
    ecosystem: "Government",
    name: "Government ERP",
    code: "GOV-01",
    icon: "🏛️",
    description: "Ministries, agencies, public sector budgeting, civil service, and citizen delivery.",
    governancePortals: [
      { id: "cabinet", name: "Cabinet & Ministerial Secretariat", desc: "Policy directives, public budgets, legislative bills, and inter-agency coordination." },
      { id: "sacco", name: "Staff SACCO Portal", desc: "Integrated Public Civil Service SACCO." }
    ],
    departments: [
      { name: "Civil Service", office: "Personnel & Pensions Office", modules: ["Civil Servant Registry", "Pension Ledger", "Public Audit"] }
    ],
    defaultModules: ["Civil Servant Registry", "Public Budget", "FAAP Treasury", "Staff SACCO", "Public Procurement"]
  },
  {
    id: "standalone-health",
    ecosystem: "Healthcare",
    name: "Healthcare ERP",
    code: "HLTH-01",
    icon: "🏥",
    description: "National hospitals, regional clinics, electronic medical records (EMR), and pharmacy logistics.",
    governancePortals: [
      { id: "board", name: "Hospital Board of Directors", desc: "Clinical standards, medical accreditation, ethics, and health policies." },
      { id: "sacco", name: "Staff SACCO Portal", desc: "Integrated Healthcare Staff SACCO." }
    ],
    departments: [
      { name: "Clinical Operations", office: "Outpatient & ER Desk", modules: ["Patient EMR", "Pharmacy Inventory", "Ward Management"] }
    ],
    defaultModules: ["Patient EMR", "Pharmacy Stock", "Ward Management", "FAAP Payroll", "Staff SACCO"]
  },
  {
    id: "standalone-ngo",
    ecosystem: "NGO",
    name: "NGO ERP",
    code: "NGO-01",
    icon: "🌍",
    description: "Grant management, donor compliance, field project tracking, and humanitarian aid.",
    governancePortals: [
      { id: "board", name: "Board of Trustees", desc: "Donor compliance, governance, mission oversight, and annual audits." },
      { id: "sacco", name: "Staff SACCO Portal", desc: "Integrated Staff SACCO." }
    ],
    departments: [
      { name: "Programs", office: "Grant Administration Office", modules: ["Donor Reports", "Field Milestones", "Beneficiary Registry"] }
    ],
    defaultModules: ["Grant Tracking", "Donor Reports", "Beneficiary Registry", "FAAP Payroll", "Staff SACCO"]
  },
  {
    id: "standalone-micro",
    ecosystem: "Specialized",
    name: "Microfinance ERP",
    code: "MFI-01",
    icon: "🏦",
    description: "Micro-lending, credit scoring, savings deposits, and financial inclusion.",
    governancePortals: [
      { id: "board", name: "MFI Credit Committee & Board", desc: "Interest rates, portfolio risk, and Central Bank compliance." },
      { id: "sacco", name: "Staff SACCO Portal", desc: "Integrated Staff SACCO." }
    ],
    departments: [
      { name: "Credit Desk", office: "Loan Origination Unit", modules: ["Loan Applications", "Disbursement Queue", "Repayment Ledger"] }
    ],
    defaultModules: ["Savings Ledger", "Loan Origination", "Credit Scoring", "FAAP Treasury", "Staff SACCO"]
  },
  {
    id: "standalone-legal",
    ecosystem: "Specialized",
    name: "Legal & Law Firm ERP",
    code: "LGL-01",
    icon: "⚖️",
    description: "Case management, court filing tracking, billable hours, and client trust accounts.",
    governancePortals: [
      { id: "partners", name: "Managing Partners Committee", desc: "Firm equity, case portfolio, legal ethics, and trust accounts." },
      { id: "sacco", name: "Staff SACCO Portal", desc: "Integrated Staff SACCO." }
    ],
    departments: [
      { name: "Litigation", office: "Court Filing Office", modules: ["Case Management", "Court Dates", "Time Tracking"] }
    ],
    defaultModules: ["Case Management", "Client Trust Accounts", "Time & Billing", "FAAP Payroll", "Staff SACCO"]
  },
  {
    id: "standalone-clan",
    ecosystem: "Specialized",
    name: "Clan & Family ERP",
    code: "CLAN-01",
    icon: "🌳",
    description: "Cultural lineage, clan land registry, family welfare funds, and ancestral records.",
    governancePortals: [
      { id: "council", name: "Council of Elders & Clan Heads", desc: "Lineage records, clan land disputes, and cultural preservation." },
      { id: "sacco", name: "Staff SACCO Portal", desc: "Integrated Clan Welfare SACCO." }
    ],
    departments: [
      { name: "Lineage Office", office: "Genealogy & Land Desk", modules: ["Ancestral Registry", "Clan Land Ledger", "Welfare Fund"] }
    ],
    defaultModules: ["Ancestral Registry", "Clan Land Register", "Welfare Fund", "Staff SACCO"]
  },
  {
    id: "standalone-trad",
    ecosystem: "Specialized",
    name: "Traditional & Cultural ERP",
    code: "TRAD-01",
    icon: "👑",
    description: "Kingdom administration, royal treasury, cultural heritage sites, and customary governance.",
    governancePortals: [
      { id: "cabinet", name: "Royal Cabinet & Lukiiko / Synod", desc: "Customary decrees, royal awards, and kingdom development." },
      { id: "sacco", name: "Staff SACCO Portal", desc: "Integrated Royal Staff SACCO." }
    ],
    departments: [
      { name: "Royal Treasury", office: "Kingdom Revenue Office", modules: ["Customary Tributes", "Heritage Sites", "Royal Welfare"] }
    ],
    defaultModules: ["Customary Tributes", "Heritage Sites", "Royal Treasury", "Staff SACCO"]
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
        activeModules: ["Admissions Queue", "Student Registry", "Course Catalog", "Examinations Board", "FAAP Payroll", "Staff SACCO", "Library Registry"],
        tenantId: "tenant-default-001",
        saccoBalance: 450000,
        saccoMembers: 1240,
        activeLoans: [
          { id: "LOAN-101", applicant: "Dr. Sarah Namubiru", amount: "$15,000", purpose: "Home Development", status: "APPROVED", date: "2026-06-12" },
          { id: "LOAN-102", applicant: "Prof. John Mukasa", amount: "$8,000", purpose: "School Fees", status: "PENDING", date: "2026-07-28" }
        ]
      }
    ];
  }

  installERP(templateId, customName = null) {
    const template = ERP_CATALOGUE.find(t => t.id === templateId);
    if (!template) return null;

    const instanceId = `inst-${templateId}-${Date.now().toString().slice(-4)}`;
    const newInstance = {
      instanceId,
      templateId,
      name: customName || `${template.name} (Deployed)`,
      status: "Active Production",
      installedAt: new Date().toISOString().split('T')[0],
      activeModules: [...template.defaultModules],
      tenantId: `tenant-${Date.now().toString().slice(-4)}`,
      saccoBalance: 120000,
      saccoMembers: 150,
      activeLoans: []
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

