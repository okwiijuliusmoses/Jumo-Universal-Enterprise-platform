/**
 * JUMO UEOS ERP FACTORY ARCHITECTURE CONTRACT
 *
 * FROZEN APPROVED CATALOGUE (10 ERP TEMPLATES):
 * 1. University ERP
 * 2. College ERP
 * 3. Technical & Vocational ERP
 * 4. Secondary School ERP
 * 5. Nursery & Primary ERP
 * 6. Alumni ERP
 * 7. Hospitality ERP
 * 8. Province & Diocese ERP
 * 9. Clan, Family & Heritage ERP
 * 10. Community Finance ERP
 */

export const ERPFactoryArchitecture = {

  version: "2.0",

  architectureRules: {
    ecosystemIsFactory: true,
    productIsInstitutionalERP: true,
    moduleCannotBecomeERP: true,
    portalCannotBecomeERP: true,
    workflowCannotBecomeERP: true,
    runtimeGenerationEnabled: true,
    metadataDriven: true
  },

  ecosystems: [
    {
      id: "education",
      name: "Education ERP Ecosystem",
      templates: [
        {
          id: "university",
          name: "University ERP",
          type: "institutional",
          governance: ["Council", "Senate", "Faculties", "Schools", "Institutes", "Departments", "Directorates", "Administrative Units"],
          portals: ["Student Portal", "Lecturer Portal", "Registrar Portal", "Finance Portal", "Research Portal", "Library Portal", "Executive Portal", "Administrator Portal"],
          modules: ["Admissions", "Student Information System", "Academic Records", "Course Management", "Digital Learning", "Examination Engine", "Assessment Management", "Timetable", "Fees Management", "Finance Integration", "Library", "Research", "HR", "Procurement", "Accommodation", "Alumni"]
        },
        {
          id: "college",
          name: "College ERP",
          type: "institutional",
          governance: ["Schools", "Departments", "Programs", "Academic Units", "Administration"],
          portals: ["Student Portal", "Lecturer Portal", "Administration Portal", "Finance Portal", "Management Portal"],
          modules: ["Admissions", "Student Records", "Programs", "Digital Learning", "Examinations", "Assessments", "Timetable", "Finance", "Library", "HR", "Reports"]
        },
        {
          id: "technical-vocational",
          name: "Technical & Vocational ERP",
          type: "institutional",
          governance: ["Training Departments", "Workshops", "Skills Centres", "Programs", "Administration"],
          portals: ["Student Portal", "Instructor Portal", "Workshop Portal", "Administration Portal"],
          modules: ["Admissions", "Skills Training", "Competency Assessment", "Digital Learning", "Examinations", "Certification", "Workshop Management", "Equipment Management", "Internship Management", "Finance"]
        },
        {
          id: "secondary-school",
          name: "Secondary School ERP",
          type: "institutional",
          governance: ["Administration", "Academic Departments", "Subjects", "Classes", "Houses", "Support Units"],
          portals: ["Student Portal", "Teacher Portal", "Parent Portal", "Administration Portal", "Finance Portal"],
          modules: ["Admissions", "Learner Records", "Classes", "Subjects", "Digital Learning", "Examinations", "Continuous Assessment", "Timetable", "Fees", "Library", "Discipline", "Boarding Management", "Reports"]
        },
        {
          id: "nursery-primary",
          name: "Nursery & Primary School ERP",
          type: "institutional",
          governance: ["Administration", "Classes", "Sections", "Teachers", "Support Units"],
          portals: ["Parent Portal", "Learner Portal", "Teacher Portal", "Administration Portal", "Finance Portal"],
          modules: ["Admissions", "Learner Records", "Class Management", "Subject Management", "Digital Learning", "Assessment", "Examinations", "Timetable", "Fees", "Library", "Communication", "Reports"]
        },
        {
          id: "alumni",
          name: "Alumni ERP",
          type: "institutional",
          governance: ["Chapters", "Regional Groups", "Committees", "Administration"],
          portals: ["Alumni Portal", "Administration Portal", "Development Portal"],
          modules: ["Alumni Registration", "Graduate Records", "Chapters", "Events", "Communication", "Donations", "Endowment Management", "Career Networking"]
        }
      ],
      sharedServices: [
        "Digital Learning Engine",
        "Examination Engine",
        "Assessment Engine",
        "Library Service",
        "AI Education Assistant",
        "Payment Integration",
        "Identity Service",
        "Reporting Engine"
      ]
    },

    {
      id: "hospitality",
      name: "Hospitality ERP Ecosystem",
      templates: [
        {
          id: "hospitality",
          name: "Hospitality ERP",
          type: "institutional",
          governance: ["General Management", "Operations Directorate", "Accommodation Department", "Food & Beverage Department", "Restaurant Operations", "Bar Operations", "Events Department", "Tourism Services", "Finance Department", "HR Department", "Procurement Department"],
          portals: ["Management Portal", "Guest Portal", "Staff Portal", "Operations Portal", "Finance Portal"],
          modules: ["Reservations", "Guest Management", "Rooms & Accommodation", "Restaurant Management", "Bar Management", "POS", "Inventory", "Housekeeping", "Events Management", "Tourism Services", "Billing", "Procurement", "HR", "Reporting"]
        }
      ],
      sharedServices: [
        "Reservations Engine",
        "Point of Sale",
        "Inventory Control",
        "Billing & Payments",
        "Guest Relations"
      ]
    },

    {
      id: "religious-cultural",
      name: "Religious & Cultural ERP Ecosystem",
      templates: [
        {
          id: "province-diocese",
          name: "Province & Diocese ERP",
          type: "institutional",
          governance: ["Leadership Office", "Parishes", "Ministries", "Departments", "Administrative Units", "Finance Office", "Community Services"],
          portals: ["Leadership Portal", "Parish Portal", "Member Portal", "Finance Portal", "Administration Portal"],
          modules: ["Member Management", "Parish Management", "Clergy/Leadership Records", "Contributions", "Finance", "Events", "Communication", "Assets", "Projects", "Reporting"]
        },
        {
          id: "clan-family-heritage",
          name: "Clan, Family & Heritage ERP",
          type: "institutional",
          governance: ["Leadership", "Family Branches", "Members", "Committees", "Heritage Units", "Archives"],
          portals: ["Member Portal", "Leadership Portal", "Heritage Portal", "Administration Portal"],
          modules: ["Membership", "Genealogy", "Family Records", "Heritage Archives", "Events", "Contributions", "Communication", "Asset Management", "Reporting"]
        }
      ],
      sharedServices: [
        "Member Directory",
        "Genealogy Engine",
        "Event Management",
        "Contributions & Tithes",
        "Heritage Archive"
      ]
    },

    {
      id: "community-finance",
      name: "Community Finance ERP Ecosystem",
      templates: [
        {
          id: "community-finance",
          name: "Community Finance ERP",
          type: "institutional",
          governance: ["Board", "Management", "Branches", "Member Services", "Credit Department", "Finance Department", "Operations"],
          portals: ["Member Portal", "Management Portal", "Loan Officer Portal", "Finance Portal", "Administration Portal"],
          modules: ["Member Management", "Savings", "Loans", "Credit Assessment", "Repayments", "Payments", "Finance", "Reporting", "Risk Management", "Compliance"]
        }
      ],
      sharedServices: [
        "SACCO Layer",
        "Credit Union Layer",
        "Savings Engine",
        "Lending Engine",
        "FAAP Integration",
        "Risk Assessment"
      ]
    }
  ],

  createTemplate(ecosystemId, template) {
    const ecosystem = this.ecosystems.find(e => e.id === ecosystemId);
    if (!ecosystem) {
      throw new Error("ERP Ecosystem not found");
    }
    ecosystem.templates.push(template);
    return template;
  }

};

export default ERPFactoryArchitecture;
