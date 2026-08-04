/**
 * JUMO UEOS ERP FACTORY ARCHITECTURE CONTRACT
 *
 * UNLOCKED ENTERPRISE MANUFACTURING ENGINE
 * 
 * Factory produces approved ERP templates only.
 * Templates dynamically configure ERP Instances (Governance, Portals, Departments, Modules, Workflows, Forms, Settings).
 */

export const ERPFactoryArchitecture = {

  version: "2.5",

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
          governance: ["Chancellor", "Vice Chancellor", "Deputy Vice Chancellors", "University Council", "Senate"],
          portals: ["Student Portal", "Lecturer Portal", "Registrar Portal", "Finance Portal", "Research Portal", "Library Portal", "Executive Portal", "Administrator Portal"],
          departments: ["Faculties", "Academic Affairs", "Admissions", "Registrar", "Finance", "Library", "Research", "ICT", "Student Affairs", "Human Resources", "Procurement", "Estates", "Quality Assurance"],
          modules: ["Admissions", "Student Information System", "Academic Records", "Course Management", "Digital Learning", "Examination Engine", "Assessment Management", "Timetable", "Fees Management", "Finance Integration", "Library", "Research", "HR", "Procurement", "Accommodation", "Alumni"],
          restrictions: { facultiesAllowed: true }
        },
        {
          id: "college",
          name: "College ERP",
          type: "institutional",
          governance: ["Principal", "College Council", "Academic Board"],
          portals: ["Student Portal", "Lecturer Portal", "Administration Portal", "Finance Portal", "Management Portal"],
          departments: ["Academic Departments", "Admissions", "Finance", "Registry", "Student Affairs", "ICT", "Library", "Administration"],
          modules: ["Admissions", "Student Records", "Programs", "Digital Learning", "Examinations", "Assessments", "Timetable", "Finance", "Library", "HR", "Reports"],
          restrictions: { facultiesAllowed: false }
        },
        {
          id: "technical-vocational",
          name: "Technical & Vocational ERP",
          type: "institutional",
          governance: ["Director", "Training Board"],
          portals: ["Student Portal", "Instructor Portal", "Workshop Portal", "Administration Portal"],
          departments: ["Training Departments", "Workshops", "Skills Assessment", "Student Affairs", "Finance", "Administration"],
          modules: ["Admissions", "Skills Training", "Competency Assessment", "Digital Learning", "Examinations", "Certification", "Workshop Management", "Equipment Management", "Internship Management", "Finance"],
          restrictions: { facultiesAllowed: false }
        },
        {
          id: "secondary-school",
          name: "Secondary School ERP",
          type: "institutional",
          governance: ["Head Teacher", "Board of Governors"],
          portals: ["Student Portal", "Teacher Portal", "Parent Portal", "Administration Portal", "Finance Portal"],
          departments: ["Academic Departments", "Examinations", "Boarding", "Finance", "Administration", "Student Welfare"],
          modules: ["Admissions", "Learner Records", "Classes", "Subjects", "Digital Learning", "Examinations", "Continuous Assessment", "Timetable", "Fees", "Library", "Discipline", "Boarding Management", "Reports"],
          restrictions: { facultiesAllowed: false }
        },
        {
          id: "nursery-primary",
          name: "Nursery & Primary School ERP",
          type: "institutional",
          governance: ["Head Teacher", "School Management Committee"],
          portals: ["Parent Portal", "Learner Portal", "Teacher Portal", "Administration Portal", "Finance Portal"],
          departments: ["Lower Primary", "Upper Primary", "Nursery", "Administration", "Finance", "Welfare"],
          modules: ["Admissions", "Learner Records", "Class Management", "Subject Management", "Digital Learning", "Assessment", "Examinations", "Timetable", "Fees", "Library", "Communication", "Reports"],
          restrictions: { facultiesAllowed: false }
        },
        {
          id: "alumni",
          name: "Alumni ERP",
          type: "institutional",
          governance: ["Alumni Association", "Alumni Executive Committee"],
          portals: ["Alumni Portal", "Administration Portal", "Development Portal"],
          departments: ["Membership", "Chapters", "Events", "Donations", "Endowment", "Career Network"],
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
          governance: ["General Management", "Operations Directorate", "Executive Board"],
          portals: ["Management Portal", "Guest Portal", "Staff Portal", "Operations Portal", "Finance Portal"],
          departments: ["Hotel Operations", "Accommodation", "Restaurant", "Bar", "Tourism Services", "Reservations", "Guest Relations", "Transport Services", "Events", "Housekeeping", "Finance", "Procurement"],
          modules: ["Reservations", "Guest Management", "Rooms & Accommodation", "Restaurant Management", "Bar Management", "POS", "Inventory", "Housekeeping", "Events Management", "Tourism Services", "Billing", "Procurement", "HR", "Reporting"],
          modes: ["Hotel Mode", "Resort Mode", "Lodge Mode", "Restaurant Mode", "Hospitality Group Mode"]
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
      id: "religious-diocese",
      name: "Religious & Diocese ERP Ecosystem",
      templates: [
        {
          id: "diocese-province",
          name: "Diocese & Province ERP",
          type: "institutional",
          governance: ["Diocese Leadership", "Bishop Office", "Province Administration"],
          portals: ["Leadership Portal", "Parish Portal", "Member Portal", "Finance Portal", "Administration Portal"],
          departments: ["Parishes", "Finance", "Clergy Management", "Schools", "Health Facilities", "Projects", "Charity", "Membership"],
          modules: ["Member Management", "Parish Management", "Clergy/Leadership Records", "Contributions", "Finance", "Events", "Communication", "Assets", "Projects", "Reporting"],
          modes: ["Diocese Mode", "Religious Province Mode", "Church Administrative Org Mode"]
        }
      ],
      sharedServices: [
        "Clergy Directory",
        "Parish Registry",
        "Event Management",
        "Contributions & Tithes",
        "Community Projects"
      ]
    },

    {
      id: "clan-heritage",
      name: "Clan, Family & Heritage ERP Ecosystem",
      templates: [
        {
          id: "clan-heritage",
          name: "Clan & Heritage ERP",
          type: "institutional",
          governance: ["Clan Council", "Family Council", "Heritage Committee"],
          portals: ["Member Portal", "Leadership Portal", "Heritage Portal", "Administration Portal"],
          departments: ["Membership", "Genealogy", "Heritage Records", "Events", "Contributions", "Welfare", "Projects"],
          modules: ["Membership", "Genealogy", "Family Records", "Heritage Archives", "Events", "Contributions", "Communication", "Asset Management", "Reporting"],
          modes: ["Clan Mode", "Family Network Mode", "Cultural Organization Mode"]
        }
      ],
      sharedServices: [
        "Member Directory",
        "Genealogy Engine",
        "Event Management",
        "Heritage Archive",
        "Welfare Fund"
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
          governance: ["Board", "Management", "Members Assembly"],
          portals: ["Member Portal", "Management Portal", "Loan Officer Portal", "Finance Portal", "Administration Portal"],
          departments: ["Savings", "Loans", "Credit", "Member Services", "Treasury", "Risk", "Compliance", "Branch Operations"],
          modules: ["Member Management", "Savings", "Loans", "Credit Assessment", "Repayments", "Payments", "Finance", "Reporting", "Risk Management", "Compliance"],
          modes: ["SACCO Mode", "Microfinance Institution Mode", "Credit Union Mode", "Cooperative Finance Mode"]
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
    let ecosystem = this.ecosystems.find(e => e.id === ecosystemId);
    if (!ecosystem) {
      ecosystem = {
        id: ecosystemId,
        name: `${ecosystemId.toUpperCase()} Ecosystem`,
        templates: [],
        sharedServices: ["Universal Enterprise Service"]
      };
      this.ecosystems.push(ecosystem);
    }
    ecosystem.templates.push(template);
    return template;
  }

};

export default ERPFactoryArchitecture;
