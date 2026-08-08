import { EcosystemRegistry } from "../runtime/ecosystemRegistry";
import { ERPTemplateRegistry } from "../runtime/erpTemplateRegistry";
import { WorkflowRegistry } from "../runtime/workflowRegistry";
import { ModuleRegistry } from "../runtime/moduleRegistry";
import { FormRegistry } from "../runtime/formRegistry";
import { ComponentRegistry } from "../runtime/componentRegistry";
import { 
  EnterpriseEcosystem, 
  EnterpriseTemplate, 
  EnterpriseModule, 
  EnterpriseForm, 
  EnterpriseComponent,
  EnterpriseWorkflow
} from "../../ueos/kernel/GovernanceEngine";
import { AuditSystem } from "../security/AuditSystem";

const BOOTSTRAP_ECOSYSTEMS: EnterpriseEcosystem[] = [
  {
    "id": "ECO-EDU",
    "name": "Education Ecosystem",
    "version": "v5.2.0",
    "category": "Education",
    "description": "National Education Platform for primary, secondary, vocational, and tertiary institutions.",
    "governanceModel": "MINISTRY_OF_EDUCATION",
    "supportedCountries": [
      "Uganda",
      "Zambia",
      "Kenya",
      "Rwanda"
    ],
    "institutionTypes": [
      "PRIMARY_SCHOOL",
      "SECONDARY_SCHOOL",
      "TVET",
      "COLLEGE",
      "UNIVERSITY",
      "DISTANCE_LEARNING"
    ],
    "templates": [
      "TPL-PRIMARY",
      "TPL-SECONDARY",
      "TPL-TECH-VOC",
      "TPL-COLLEGE",
      "TPL-UNI-NATIONAL",
      "TPL-DIST-LEARNING"
    ],
    "status": "Active",
    "modules": [
      "mod-academics",
      "mod-elearning",
      "mod-exams",
      "mod-library",
      "mod-sis",
      "mod-admission",
      "mod-research",
      "mod-alumni",
      "mod-hostel",
      "mod-transport",
      "mod-ledger",
      "mod-hr",
      "mod-sacco"
    ],
    "permissions": [
      "MINISTRY_INSPECTOR",
      "VICE_CHANCELLOR",
      "REGISTRAR",
      "DEAN",
      "LECTURER",
      "STUDENT",
      "PARENT"
    ]
  },
  {
    "id": "ECO-HEALTH",
    "name": "Healthcare Ecosystem",
    "version": "v5.2.0",
    "category": "Healthcare",
    "description": "Universal Healthcare Platform for hospitals, health centres, and clinical practices.",
    "governanceModel": "MINISTRY_OF_HEALTH",
    "supportedCountries": [
      "Uganda",
      "Kenya",
      "Zambia"
    ],
    "institutionTypes": [
      "HOSPITAL",
      "HEALTH_CENTER",
      "CLINIC"
    ],
    "templates": [
      "TPL-HOSP-NATIONAL",
      "TPL-HEALTH-CENTER",
      "TPL-CLINIC"
    ],
    "status": "Active",
    "modules": [
      "mod-clinical",
      "mod-pharmacy",
      "mod-lab",
      "mod-radiology",
      "mod-patients",
      "mod-insurance",
      "mod-emr",
      "mod-inventory",
      "mod-hr",
      "mod-sacco",
      "mod-ledger",
      "mod-procurement"
    ],
    "permissions": [
      "MINISTRY_HEALTH_INSPECTOR",
      "MEDICAL_DIRECTOR",
      "DOCTOR",
      "NURSE",
      "PHARMACIST",
      "PATIENT"
    ]
  },
  {
    "id": "ECO-CORP",
    "name": "Corporate & Enterprise Ecosystem",
    "version": "v5.2.0",
    "category": "Corporate",
    "description": "Enterprise Corporate & Service Company Platform.",
    "governanceModel": "COMPANIES_REGISTRY",
    "supportedCountries": [
      "Global"
    ],
    "institutionTypes": [
      "SERVICE_COMPANY",
      "CONSULTANCY_COMPANY",
      "GENERAL_COMPANY"
    ],
    "templates": [
      "TPL-SERVICE-CO",
      "TPL-CONSULT-CO",
      "TPL-GENERAL-CO"
    ],
    "status": "Active",
    "modules": [
      "mod-hr",
      "mod-payroll",
      "mod-crm",
      "mod-projects",
      "mod-procurement",
      "mod-ledger",
      "mod-inventory",
      "mod-sacco",
      "mod-docmgmt"
    ],
    "permissions": [
      "BOARD_MEMBER",
      "DIRECTOR",
      "PROJECT_MANAGER",
      "STAFF",
      "CLIENT"
    ]
  },
  {
    "id": "ECO-JUD",
    "name": "Judiciary & Legal Ecosystem",
    "version": "v5.2.0",
    "category": "Governance",
    "description": "Justice & Legal Practice Management Platform.",
    "governanceModel": "JUDICIAL_SERVICE_COMMISSION",
    "supportedCountries": [
      "National"
    ],
    "institutionTypes": [
      "COURT_SYSTEM",
      "LAW_FIRM",
      "LEGAL_PRACTICE"
    ],
    "templates": [
      "TPL-JUDICIARY"
    ],
    "status": "Active",
    "modules": [
      "mod-case-management",
      "mod-court-admin",
      "mod-legal-practice",
      "mod-docmgmt",
      "mod-hr",
      "mod-ledger"
    ],
    "permissions": [
      "CHIEF_JUSTICE",
      "JUDGE",
      "REGISTRAR_COURT",
      "ADVOCATE",
      "LITIGANT"
    ]
  },
  {
    "id": "ECO-GOVT",
    "name": "Government MDA Ecosystem",
    "version": "v5.2.0",
    "category": "Governance",
    "description": "National Public Service Platform for Ministries, Agencies, and Local Governments.",
    "governanceModel": "CABINET_OFFICE",
    "supportedCountries": [
      "National"
    ],
    "institutionTypes": [
      "MINISTRY",
      "AGENCY",
      "LOCAL_GOVERNMENT"
    ],
    "templates": [
      "TPL-GOVT-MINISTRY",
      "TPL-GOVT-AGENCY",
      "TPL-GOVT-DISTRICT"
    ],
    "status": "Active",
    "modules": [
      "mod-citizen-services",
      "mod-hr",
      "mod-payroll",
      "mod-procurement",
      "mod-ledger",
      "mod-records",
      "mod-reporting",
      "mod-compliance"
    ],
    "permissions": [
      "PERMANENT_SECRETARY",
      "DIRECTOR_GENERAL",
      "PUBLIC_SERVANT",
      "CITIZEN"
    ]
  },
  {
    "id": "ECO-AGRI",
    "name": "Agribusiness Ecosystem",
    "version": "v5.2.0",
    "category": "Industry",
    "description": "Agricultural Value Chain & Farm Enterprise Management Platform.",
    "governanceModel": "MINISTRY_OF_AGRICULTURE",
    "supportedCountries": [
      "National"
    ],
    "institutionTypes": [
      "AGRIBUSINESS",
      "FARM_COOPERATIVE",
      "PROCESSING_PLANT"
    ],
    "templates": [
      "TPL-AGRIBUSINESS"
    ],
    "status": "Active",
    "modules": [
      "mod-farm-management",
      "mod-supply-chain",
      "mod-farmer-mgmt",
      "mod-logistics",
      "mod-inventory",
      "mod-ledger",
      "mod-hr"
    ],
    "permissions": [
      "FARM_MANAGER",
      "SUPPLY_OFFICER",
      "EXTENSION_AGENT",
      "FARMER"
    ]
  },
  {
    "id": "ECO-MFI",
    "name": "Microfinance Ecosystem",
    "version": "v5.2.0",
    "category": "Finance",
    "description": "SACCO & Microfinance Deposit-Taking Platform.",
    "governanceModel": "COOPERATIVE_REGULATORY_AUTHORITY",
    "supportedCountries": [
      "Uganda",
      "Zambia",
      "Kenya"
    ],
    "institutionTypes": [
      "MICROFINANCE",
      "SACCO",
      "CREDIT_UNION"
    ],
    "templates": [
      "TPL-MICROFINANCE",
      "TPL-SACCO-PRO"
    ],
    "status": "Active",
    "modules": [
      "mod-loans",
      "mod-savings",
      "mod-members",
      "mod-credit-scoring",
      "mod-mobile-money",
      "mod-ledger",
      "mod-hr",
      "mod-sacco"
    ],
    "permissions": [
      "CHAIRMAN",
      "LOAN_OFFICER",
      "TELLER",
      "SACCO_MEMBER"
    ]
  },
  {
    "id": "ECO-CULT",
    "name": "Cultural & Religious Ecosystem",
    "version": "v5.2.0",
    "category": "Community",
    "description": "Church, Cultural Heritage, and Clan Registry Platform.",
    "governanceModel": "EPISCOPAL_CONFERENCE_AND_CULTURAL_COUNCIL",
    "supportedCountries": [
      "Global"
    ],
    "institutionTypes": [
      "CHURCH_PROVINCE",
      "DIOCESE",
      "PARISH",
      "CULTURAL_HERITAGE",
      "CLAN_FAMILY"
    ],
    "templates": [
      "TPL-DIOCESE-CORE",
      "TPL-CULTURAL-HERITAGE",
      "TPL-CLAN-FAMILY"
    ],
    "status": "Active",
    "modules": [
      "mod-membership-registry",
      "mod-events",
      "mod-ledger",
      "mod-donations",
      "mod-heritage-records",
      "mod-communication"
    ],
    "permissions": [
      "BISHOP",
      "CLERGY",
      "PARISH_COUNCIL",
      "HERITAGE_CUSTODIAN",
      "CONGREGANT"
    ]
  },
  {
    "id": "ECO-ALUMNI",
    "name": "Alumni & Community Development Ecosystem",
    "version": "v5.2.0",
    "category": "Community",
    "description": "Alumni Associations & Endowment Management Platform.",
    "governanceModel": "ALUMNI_BOARD_OF_TRUSTEES",
    "supportedCountries": [
      "Global"
    ],
    "institutionTypes": [
      "ALUMNI_ASSOCIATION",
      "ENDOWMENT_FUND"
    ],
    "templates": [
      "TPL-ALUMNI-ENDOWMENT"
    ],
    "status": "Active",
    "modules": [
      "mod-alumni-registry",
      "mod-endowment-mgmt",
      "mod-donations",
      "mod-projects",
      "mod-community-programs",
      "mod-ledger"
    ],
    "permissions": [
      "ALUMNI_PRESIDENT",
      "TRUSTEE",
      "ALUMNI_MEMBER"
    ]
  },
  {
    "id": "ECO-HOSP",
    "name": "Hospitality & Tourism Ecosystem",
    "version": "v5.2.0",
    "category": "Trade",
    "description": "Hotel, Resort & Tourism Management Platform.",
    "governanceModel": "TOURISM_BOARD",
    "supportedCountries": [
      "Global"
    ],
    "institutionTypes": [
      "HOTEL_RESORT"
    ],
    "templates": [
      "TPL-HOTEL-PRO"
    ],
    "status": "Active",
    "modules": [
      "mod-reservations",
      "mod-tourism-mgmt",
      "mod-restaurant",
      "mod-events",
      "mod-housekeeping",
      "mod-hr",
      "mod-ledger"
    ],
    "permissions": [
      "HOTEL_GENERAL_MANAGER",
      "RECEPTIONIST",
      "GUEST"
    ]
  },
  {
    "id": "ECO-MERCH",
    "name": "General Merchandise Ecosystem",
    "version": "v5.2.0",
    "category": "Trade",
    "description": "Wholesale, Retail, and Commercial Trade Enterprise Platform.",
    "governanceModel": "MINISTRY_OF_TRADE",
    "supportedCountries": [
      "Global"
    ],
    "institutionTypes": [
      "WHOLESALE_ENTERPRISE",
      "RETAIL_ENTERPRISE"
    ],
    "templates": [
      "TPL-WHOLESALE-PRO",
      "TPL-RETAIL-PRO"
    ],
    "status": "Active",
    "modules": [
      "mod-distribution",
      "mod-inventory",
      "mod-pos",
      "mod-procurement",
      "mod-supplier-mgmt",
      "mod-ledger",
      "mod-hr"
    ],
    "permissions": [
      "STORE_MANAGER",
      "CASHIER",
      "SUPPLIER"
    ]
  }
];

const BOOTSTRAP_TEMPLATES: EnterpriseTemplate[] = [
  {
    "id": "TPL-PRIMARY",
    "name": "Nursery & Primary ERP Blueprint",
    "ecosystemId": "ECO-EDU",
    "description": "Sovereign platform for nursery and primary education institutions.",
    "version": "v2.0.0",
    "status": "Active",
    "governance": {
      "title": "School Management Committee",
      "role": "GOVERNING_BODY"
    },
    "directorates": [
      {
        "id": "dir-head",
        "name": "Head Teacher Office",
        "governanceHead": "Head Teacher",
        "departments": [
          {
            "id": "dept-prim",
            "name": "Primary Curriculum",
            "directorateId": "dir-head",
            "modules": [
              "mod-academics"
            ],
            "roles": [
              "TEACHER"
            ]
          }
        ]
      }
    ],
    "portals": [
      {
        "id": "portal-parent",
        "name": "Parent Portal",
        "roles": [
          "PARENT"
        ],
        "modules": [
          "mod-academics",
          "mod-ledger"
        ],
        "dashboards": [
          "db-parent"
        ]
      },
      {
        "id": "portal-staff",
        "name": "Staff Portal",
        "roles": [
          "STAFF"
        ],
        "modules": [
          "mod-hr"
        ],
        "dashboards": [
          "db-staff"
        ]
      },
      {
        "id": "portal-admin",
        "name": "Admin Portal",
        "roles": [
          "ADMIN"
        ],
        "modules": [
          "mod-ledger",
          "mod-hr"
        ],
        "dashboards": [
          "db-admin"
        ]
      }
    ],
    "availableModules": [
      {
        "id": "mod-academics",
        "name": "Academic Engine",
        "category": "Education",
        "permissions": [],
        "workflows": [],
        "forms": [],
        "reports": []
      },
      {
        "id": "mod-sis",
        "name": "Student Information System",
        "category": "Education",
        "permissions": [],
        "workflows": [],
        "forms": [],
        "reports": []
      },
      {
        "id": "mod-ledger",
        "name": "FAAP General Ledger",
        "category": "Finance",
        "permissions": [],
        "workflows": [],
        "forms": [],
        "reports": []
      },
      {
        "id": "mod-hr",
        "name": "HR & Recruitment",
        "category": "Corporate",
        "permissions": [],
        "workflows": [],
        "forms": [],
        "reports": []
      }
    ],
    "workflows": [
      "wf-admission"
    ],
    "reports": [
      "attendance-report",
      "fee-statement"
    ],
    "integrations": [
      "MOBILE-MONEY"
    ]
  },
  {
    "id": "TPL-SECONDARY",
    "name": "Secondary School ERP Blueprint",
    "ecosystemId": "ECO-EDU",
    "description": "Sovereign operating system for secondary and high schools.",
    "version": "v2.0.0",
    "status": "Active",
    "governance": {
      "title": "Board of Governors",
      "role": "GOVERNING_BODY"
    },
    "directorates": [
      {
        "id": "dir-head",
        "name": "Headteacher Office",
        "governanceHead": "Headteacher",
        "departments": [
          {
            "id": "dept-sec",
            "name": "Secondary Curriculum",
            "directorateId": "dir-head",
            "modules": [
              "mod-academics"
            ],
            "roles": [
              "TEACHER"
            ]
          }
        ]
      }
    ],
    "portals": [
      {
        "id": "portal-student",
        "name": "Student Portal",
        "roles": [
          "STUDENT"
        ],
        "modules": [
          "mod-academics",
          "mod-elearning"
        ],
        "dashboards": [
          "db-student"
        ]
      },
      {
        "id": "portal-parent",
        "name": "Parent Portal",
        "roles": [
          "PARENT"
        ],
        "modules": [
          "mod-academics",
          "mod-ledger"
        ],
        "dashboards": [
          "db-parent"
        ]
      },
      {
        "id": "portal-staff",
        "name": "Staff Portal",
        "roles": [
          "STAFF"
        ],
        "modules": [
          "mod-hr"
        ],
        "dashboards": [
          "db-staff"
        ]
      },
      {
        "id": "portal-admin",
        "name": "Admin Portal",
        "roles": [
          "ADMIN"
        ],
        "modules": [
          "mod-ledger",
          "mod-hr"
        ],
        "dashboards": [
          "db-admin"
        ]
      }
    ],
    "availableModules": [
      {
        "id": "mod-academics",
        "name": "Academic Engine",
        "category": "Education",
        "permissions": [],
        "workflows": [],
        "forms": [],
        "reports": []
      },
      {
        "id": "mod-exams",
        "name": "Examination Management",
        "category": "Education",
        "permissions": [],
        "workflows": [],
        "forms": [],
        "reports": []
      },
      {
        "id": "mod-library",
        "name": "Library System",
        "category": "Education",
        "permissions": [],
        "workflows": [],
        "forms": [],
        "reports": []
      },
      {
        "id": "mod-ledger",
        "name": "FAAP General Ledger",
        "category": "Finance",
        "permissions": [],
        "workflows": [],
        "forms": [],
        "reports": []
      },
      {
        "id": "mod-hr",
        "name": "HR & Recruitment",
        "category": "Corporate",
        "permissions": [],
        "workflows": [],
        "forms": [],
        "reports": []
      }
    ],
    "workflows": [
      "wf-admission",
      "wf-payment-approval"
    ],
    "reports": [
      "report-card",
      "fee-reconciliation"
    ],
    "integrations": [
      "EXAM-BOARD-API"
    ]
  },
  {
    "id": "TPL-TECH-VOC",
    "name": "Technical & Vocational ERP Blueprint",
    "ecosystemId": "ECO-EDU",
    "description": "Specialized ERP platform for TVET and polytechnic institutes.",
    "version": "v2.0.0",
    "status": "Active",
    "governance": {
      "title": "Governing Council",
      "role": "GOVERNING_BODY"
    },
    "directorates": [],
    "portals": [
      {
        "id": "portal-trainee",
        "name": "Trainee Portal",
        "roles": [
          "STUDENT"
        ],
        "modules": [
          "mod-academics"
        ],
        "dashboards": [
          "db-student"
        ]
      },
      {
        "id": "portal-staff",
        "name": "Instructor Portal",
        "roles": [
          "STAFF"
        ],
        "modules": [
          "mod-hr"
        ],
        "dashboards": [
          "db-staff"
        ]
      },
      {
        "id": "portal-admin",
        "name": "Admin Portal",
        "roles": [
          "ADMIN"
        ],
        "modules": [
          "mod-ledger",
          "mod-hr"
        ],
        "dashboards": [
          "db-admin"
        ]
      }
    ],
    "availableModules": [
      {
        "id": "mod-academics",
        "name": "Practical Skill Engine",
        "category": "Education",
        "permissions": [],
        "workflows": [],
        "forms": [],
        "reports": []
      },
      {
        "id": "mod-inventory",
        "name": "Workshop Equipment & Tooling",
        "category": "Logistics",
        "permissions": [],
        "workflows": [],
        "forms": [],
        "reports": []
      },
      {
        "id": "mod-ledger",
        "name": "FAAP General Ledger",
        "category": "Finance",
        "permissions": [],
        "workflows": [],
        "forms": [],
        "reports": []
      }
    ],
    "workflows": [
      "wf-admission"
    ],
    "reports": [
      "skill-certification-report"
    ],
    "integrations": []
  },
  {
    "id": "TPL-COLLEGE",
    "name": "College ERP Blueprint",
    "ecosystemId": "ECO-EDU",
    "description": "Operating system for tertiary colleges and diploma institutions.",
    "version": "v2.0.0",
    "status": "Active",
    "governance": {
      "title": "College Principal Council",
      "role": "GOVERNING_BODY"
    },
    "directorates": [],
    "portals": [
      {
        "id": "portal-student",
        "name": "Student Portal",
        "roles": [
          "STUDENT"
        ],
        "modules": [
          "mod-academics"
        ],
        "dashboards": [
          "db-student"
        ]
      },
      {
        "id": "portal-staff",
        "name": "Staff Portal",
        "roles": [
          "STAFF"
        ],
        "modules": [
          "mod-hr"
        ],
        "dashboards": [
          "db-staff"
        ]
      },
      {
        "id": "portal-admin",
        "name": "Admin Portal",
        "roles": [
          "ADMIN"
        ],
        "modules": [
          "mod-ledger",
          "mod-hr"
        ],
        "dashboards": [
          "db-admin"
        ]
      }
    ],
    "availableModules": [
      {
        "id": "mod-academics",
        "name": "Academic Engine",
        "category": "Education",
        "permissions": [],
        "workflows": [],
        "forms": [],
        "reports": []
      },
      {
        "id": "mod-ledger",
        "name": "FAAP General Ledger",
        "category": "Finance",
        "permissions": [],
        "workflows": [],
        "forms": [],
        "reports": []
      },
      {
        "id": "mod-hr",
        "name": "HR & Recruitment",
        "category": "Corporate",
        "permissions": [],
        "workflows": [],
        "forms": [],
        "reports": []
      }
    ],
    "workflows": [
      "wf-admission"
    ],
    "reports": [
      "graduation-audit"
    ],
    "integrations": []
  },
  {
    "id": "TPL-UNI-NATIONAL",
    "name": "University ERP Blueprint",
    "ecosystemId": "ECO-EDU",
    "description": "Universal operating system for national universities with integrated research and admission engines.",
    "version": "v2.0.0",
    "status": "Active",
    "governance": {
      "title": "University Council",
      "role": "GOVERNING_BODY"
    },
    "directorates": [
      {
        "id": "dir-academic",
        "name": "Academic Registrar",
        "governanceHead": "Academic Registrar",
        "departments": [
          {
            "id": "dept-admissions",
            "name": "Admissions",
            "directorateId": "dir-academic",
            "modules": [
              "mod-academics"
            ],
            "roles": [
              "REGISTRAR"
            ]
          }
        ]
      },
      {
        "id": "dir-finance",
        "name": "Finance & Planning",
        "governanceHead": "University Bursar",
        "departments": [
          {
            "id": "dept-accounts",
            "name": "Accounts",
            "directorateId": "dir-finance",
            "modules": [
              "mod-ledger"
            ],
            "roles": [
              "ACCOUNTANT"
            ]
          }
        ]
      },
      {
        "id": "dir-hr",
        "name": "Human Resources",
        "governanceHead": "HR Director",
        "departments": [
          {
            "id": "dept-staff",
            "name": "Staff Management",
            "directorateId": "dir-hr",
            "modules": [
              "mod-hr"
            ],
            "roles": [
              "HR_ADMIN"
            ]
          }
        ]
      }
    ],
    "portals": [
      {
        "id": "portal-student",
        "name": "Student Portal",
        "roles": [
          "STUDENT"
        ],
        "modules": [
          "mod-academics",
          "mod-elearning"
        ],
        "dashboards": [
          "db-student"
        ]
      },
      {
        "id": "portal-staff",
        "name": "Staff Self-Service Portal",
        "roles": [
          "STAFF"
        ],
        "modules": [
          "mod-hr",
          "mod-sacco"
        ],
        "dashboards": [
          "db-staff"
        ]
      },
      {
        "id": "portal-admin",
        "name": "Admin Portal",
        "roles": [
          "ADMIN"
        ],
        "modules": [
          "mod-ledger",
          "mod-hr"
        ],
        "dashboards": [
          "db-admin"
        ]
      },
      {
        "id": "portal-recruitment",
        "name": "Recruitment Portal",
        "roles": [
          "APPLICANT"
        ],
        "modules": [
          "mod-hr"
        ],
        "dashboards": [
          "db-recruitment"
        ]
      }
    ],
    "availableModules": [
      {
        "id": "mod-academics",
        "name": "Academic Engine",
        "category": "Education",
        "permissions": [],
        "workflows": [],
        "forms": [],
        "reports": []
      },
      {
        "id": "mod-research",
        "name": "Research & Grant Management",
        "category": "Education",
        "permissions": [],
        "workflows": [],
        "forms": [],
        "reports": []
      },
      {
        "id": "mod-ledger",
        "name": "FAAP General Ledger",
        "category": "Finance",
        "permissions": [],
        "workflows": [],
        "forms": [],
        "reports": []
      },
      {
        "id": "mod-hr",
        "name": "HR & Recruitment",
        "category": "Corporate",
        "permissions": [],
        "workflows": [],
        "forms": [],
        "reports": []
      },
      {
        "id": "mod-sacco",
        "name": "Staff SACCO & Savings",
        "category": "Finance",
        "permissions": [],
        "workflows": [],
        "forms": [],
        "reports": []
      },
      {
        "id": "mod-elearning",
        "name": "Educa Digital (LMS)",
        "category": "Education",
        "permissions": [],
        "workflows": [],
        "forms": [],
        "reports": []
      }
    ],
    "workflows": [
      "wf-admission",
      "wf-recruitment"
    ],
    "reports": [
      "enrollment-report"
    ],
    "integrations": [
      "NATIONAL-ID-HUB"
    ]
  },
  {
    "id": "TPL-DIST-LEARNING",
    "name": "Distance Learning ERP Blueprint",
    "ecosystemId": "ECO-EDU",
    "description": "Operating system for open and distance e-learning universities.",
    "version": "v2.0.0",
    "status": "Active",
    "governance": {
      "title": "Open University Senate",
      "role": "GOVERNING_BODY"
    },
    "directorates": [],
    "portals": [
      {
        "id": "portal-student",
        "name": "Online Student Portal",
        "roles": [
          "STUDENT"
        ],
        "modules": [
          "mod-elearning"
        ],
        "dashboards": [
          "db-student"
        ]
      },
      {
        "id": "portal-staff",
        "name": "Online Tutor Portal",
        "roles": [
          "STAFF"
        ],
        "modules": [
          "mod-elearning"
        ],
        "dashboards": [
          "db-staff"
        ]
      },
      {
        "id": "portal-admin",
        "name": "Admin Portal",
        "roles": [
          "ADMIN"
        ],
        "modules": [
          "mod-ledger"
        ],
        "dashboards": [
          "db-admin"
        ]
      }
    ],
    "availableModules": [
      {
        "id": "mod-elearning",
        "name": "E-learning Engine",
        "category": "Education",
        "permissions": [],
        "workflows": [],
        "forms": [],
        "reports": []
      },
      {
        "id": "mod-ledger",
        "name": "FAAP General Ledger",
        "category": "Finance",
        "permissions": [],
        "workflows": [],
        "forms": [],
        "reports": []
      }
    ],
    "workflows": [
      "wf-admission"
    ],
    "reports": [
      "student-engagement-analytics"
    ],
    "integrations": []
  },
  {
    "id": "TPL-HOSP-NATIONAL",
    "name": "Hospital ERP Blueprint",
    "ecosystemId": "ECO-HEALTH",
    "description": "Full-scale enterprise operating system for hospitals and medical centers.",
    "version": "v2.0.0",
    "status": "Active",
    "governance": {
      "title": "Hospital Board",
      "role": "GOVERNING_BODY"
    },
    "directorates": [
      {
        "id": "dir-clinical",
        "name": "Clinical Services",
        "governanceHead": "Medical Director",
        "departments": [
          {
            "id": "dept-ipd",
            "name": "Inpatient Services",
            "directorateId": "dir-clinical",
            "modules": [
              "mod-clinical",
              "mod-pharmacy"
            ],
            "roles": [
              "DOCTOR",
              "NURSE"
            ]
          }
        ]
      },
      {
        "id": "dir-hr",
        "name": "Human Resources",
        "governanceHead": "HR Director",
        "departments": [
          {
            "id": "dept-staff",
            "name": "Staff Management",
            "directorateId": "dir-hr",
            "modules": [
              "mod-hr"
            ],
            "roles": [
              "HR_ADMIN"
            ]
          }
        ]
      }
    ],
    "portals": [
      {
        "id": "portal-patient",
        "name": "Patient Portal",
        "roles": [
          "PATIENT"
        ],
        "modules": [
          "mod-clinical"
        ],
        "dashboards": [
          "db-patient"
        ]
      },
      {
        "id": "portal-doctor",
        "name": "Doctor Portal",
        "roles": [
          "DOCTOR"
        ],
        "modules": [
          "mod-clinical"
        ],
        "dashboards": [
          "db-clinical"
        ]
      },
      {
        "id": "portal-staff",
        "name": "Staff Self-Service Portal",
        "roles": [
          "STAFF"
        ],
        "modules": [
          "mod-hr",
          "mod-sacco"
        ],
        "dashboards": [
          "db-staff"
        ]
      },
      {
        "id": "portal-admin",
        "name": "Admin Portal",
        "roles": [
          "ADMIN"
        ],
        "modules": [
          "mod-ledger",
          "mod-hr"
        ],
        "dashboards": [
          "db-admin"
        ]
      }
    ],
    "availableModules": [
      {
        "id": "mod-clinical",
        "name": "Clinical Records",
        "category": "Health",
        "permissions": [],
        "workflows": [],
        "forms": [],
        "reports": []
      },
      {
        "id": "mod-pharmacy",
        "name": "Pharmacy Management",
        "category": "Health",
        "permissions": [],
        "workflows": [],
        "forms": [],
        "reports": []
      },
      {
        "id": "mod-lab",
        "name": "Laboratory Management",
        "category": "Health",
        "permissions": [],
        "workflows": [],
        "forms": [],
        "reports": []
      },
      {
        "id": "mod-radiology",
        "name": "Radiology PACS",
        "category": "Health",
        "permissions": [],
        "workflows": [],
        "forms": [],
        "reports": []
      },
      {
        "id": "mod-hr",
        "name": "HR & Recruitment",
        "category": "Corporate",
        "permissions": [],
        "workflows": [],
        "forms": [],
        "reports": []
      },
      {
        "id": "mod-sacco",
        "name": "Staff SACCO & Savings",
        "category": "Finance",
        "permissions": [],
        "workflows": [],
        "forms": [],
        "reports": []
      }
    ],
    "workflows": [
      "wf-triage",
      "wf-recruitment"
    ],
    "reports": [
      "patient-census"
    ],
    "integrations": [
      "INSURANCE-GATEWAY"
    ]
  },
  {
    "id": "TPL-HEALTH-CENTER",
    "name": "Health Centre ERP Blueprint",
    "ecosystemId": "ECO-HEALTH",
    "description": "Operating system for health centers and community care facilities.",
    "version": "v2.0.0",
    "status": "Active",
    "governance": {
      "title": "Health Management Committee",
      "role": "GOVERNING_BODY"
    },
    "directorates": [],
    "portals": [
      {
        "id": "portal-patient",
        "name": "Patient Portal",
        "roles": [
          "PATIENT"
        ],
        "modules": [
          "mod-clinical"
        ],
        "dashboards": [
          "db-patient"
        ]
      },
      {
        "id": "portal-doctor",
        "name": "Clinician Portal",
        "roles": [
          "DOCTOR"
        ],
        "modules": [
          "mod-clinical"
        ],
        "dashboards": [
          "db-clinical"
        ]
      },
      {
        "id": "portal-staff",
        "name": "Staff Portal",
        "roles": [
          "STAFF"
        ],
        "modules": [
          "mod-hr"
        ],
        "dashboards": [
          "db-staff"
        ]
      },
      {
        "id": "portal-admin",
        "name": "Admin Portal",
        "roles": [
          "ADMIN"
        ],
        "modules": [
          "mod-ledger"
        ],
        "dashboards": [
          "db-admin"
        ]
      }
    ],
    "availableModules": [
      {
        "id": "mod-clinical",
        "name": "Clinical Records",
        "category": "Health",
        "permissions": [],
        "workflows": [],
        "forms": [],
        "reports": []
      },
      {
        "id": "mod-pharmacy",
        "name": "Pharmacy Management",
        "category": "Health",
        "permissions": [],
        "workflows": [],
        "forms": [],
        "reports": []
      },
      {
        "id": "mod-hr",
        "name": "HR & Recruitment",
        "category": "Corporate",
        "permissions": [],
        "workflows": [],
        "forms": [],
        "reports": []
      }
    ],
    "workflows": [],
    "reports": [],
    "integrations": []
  },
  {
    "id": "TPL-CLINIC",
    "name": "Clinic ERP Blueprint",
    "ecosystemId": "ECO-HEALTH",
    "description": "Operating system for local private and outpatient clinics.",
    "version": "v2.0.0",
    "status": "Active",
    "governance": {
      "title": "Clinic Management",
      "role": "GOVERNING_BODY"
    },
    "directorates": [],
    "portals": [
      {
        "id": "portal-patient",
        "name": "Patient Portal",
        "roles": [
          "PATIENT"
        ],
        "modules": [
          "mod-clinical"
        ],
        "dashboards": [
          "db-patient"
        ]
      },
      {
        "id": "portal-doctor",
        "name": "Clinician Portal",
        "roles": [
          "DOCTOR"
        ],
        "modules": [
          "mod-clinical"
        ],
        "dashboards": [
          "db-clinical"
        ]
      },
      {
        "id": "portal-admin",
        "name": "Admin Portal",
        "roles": [
          "ADMIN"
        ],
        "modules": [
          "mod-ledger"
        ],
        "dashboards": [
          "db-admin"
        ]
      }
    ],
    "availableModules": [
      {
        "id": "mod-clinical",
        "name": "Clinical Records",
        "category": "Health",
        "permissions": [],
        "workflows": [],
        "forms": [],
        "reports": []
      },
      {
        "id": "mod-pharmacy",
        "name": "Dispensary Engine",
        "category": "Health",
        "permissions": [],
        "workflows": [],
        "forms": [],
        "reports": []
      }
    ],
    "workflows": [],
    "reports": [],
    "integrations": []
  },
  {
    "id": "TPL-SERVICE-CO",
    "name": "Service Company ERP Blueprint",
    "ecosystemId": "ECO-CORP",
    "description": "Enterprise platform for service-oriented companies.",
    "version": "v2.0.0",
    "status": "Active",
    "governance": {
      "title": "Board of Directors",
      "role": "GOVERNING_BODY"
    },
    "directorates": [
      {
        "id": "dir-ops",
        "name": "Operations",
        "governanceHead": "COO",
        "departments": [
          {
            "id": "dept-projects",
            "name": "Projects",
            "directorateId": "dir-ops",
            "modules": [
              "mod-projects"
            ],
            "roles": [
              "PROJECT_MANAGER"
            ]
          }
        ]
      }
    ],
    "portals": [
      {
        "id": "portal-client",
        "name": "Client Portal",
        "roles": [
          "CLIENT"
        ],
        "modules": [
          "mod-crm"
        ],
        "dashboards": [
          "db-client"
        ]
      },
      {
        "id": "portal-staff",
        "name": "Staff Portal",
        "roles": [
          "STAFF"
        ],
        "modules": [
          "mod-hr",
          "mod-ledger",
          "mod-projects"
        ],
        "dashboards": [
          "db-staff"
        ]
      },
      {
        "id": "portal-admin",
        "name": "Admin Portal",
        "roles": [
          "ADMIN"
        ],
        "modules": [
          "mod-ledger",
          "mod-hr"
        ],
        "dashboards": [
          "db-admin"
        ]
      }
    ],
    "availableModules": [
      {
        "id": "mod-projects",
        "name": "Project Management",
        "category": "Corporate",
        "permissions": [],
        "workflows": [],
        "forms": [],
        "reports": []
      },
      {
        "id": "mod-crm",
        "name": "CRM",
        "category": "Corporate",
        "permissions": [],
        "workflows": [],
        "forms": [],
        "reports": []
      },
      {
        "id": "mod-hr",
        "name": "HR & Recruitment",
        "category": "Corporate",
        "permissions": [],
        "workflows": [],
        "forms": [],
        "reports": []
      },
      {
        "id": "mod-ledger",
        "name": "FAAP General Ledger",
        "category": "Finance",
        "permissions": [],
        "workflows": [],
        "forms": [],
        "reports": []
      }
    ],
    "workflows": [],
    "reports": [],
    "integrations": []
  },
  {
    "id": "TPL-CONSULT-CO",
    "name": "Consultancy Company ERP Blueprint",
    "ecosystemId": "ECO-CORP",
    "description": "Enterprise platform for professional consultancy firms.",
    "version": "v2.0.0",
    "status": "Active",
    "governance": {
      "title": "Managing Partners Council",
      "role": "GOVERNING_BODY"
    },
    "directorates": [],
    "portals": [
      {
        "id": "portal-client",
        "name": "Client Portal",
        "roles": [
          "CLIENT"
        ],
        "modules": [
          "mod-crm"
        ],
        "dashboards": [
          "db-client"
        ]
      },
      {
        "id": "portal-staff",
        "name": "Consultant Portal",
        "roles": [
          "STAFF"
        ],
        "modules": [
          "mod-hr",
          "mod-projects"
        ],
        "dashboards": [
          "db-staff"
        ]
      },
      {
        "id": "portal-admin",
        "name": "Admin Portal",
        "roles": [
          "ADMIN"
        ],
        "modules": [
          "mod-ledger",
          "mod-hr"
        ],
        "dashboards": [
          "db-admin"
        ]
      }
    ],
    "availableModules": [
      {
        "id": "mod-projects",
        "name": "Project Management",
        "category": "Corporate",
        "permissions": [],
        "workflows": [],
        "forms": [],
        "reports": []
      },
      {
        "id": "mod-crm",
        "name": "CRM",
        "category": "Corporate",
        "permissions": [],
        "workflows": [],
        "forms": [],
        "reports": []
      },
      {
        "id": "mod-hr",
        "name": "HR & Recruitment",
        "category": "Corporate",
        "permissions": [],
        "workflows": [],
        "forms": [],
        "reports": []
      }
    ],
    "workflows": [],
    "reports": [],
    "integrations": []
  },
  {
    "id": "TPL-GENERAL-CO",
    "name": "General Company ERP Blueprint",
    "ecosystemId": "ECO-CORP",
    "description": "Standard enterprise platform for general corporate entities.",
    "version": "v2.0.0",
    "status": "Active",
    "governance": {
      "title": "Board of Directors",
      "role": "GOVERNING_BODY"
    },
    "directorates": [],
    "portals": [
      {
        "id": "portal-staff",
        "name": "Staff Portal",
        "roles": [
          "STAFF"
        ],
        "modules": [
          "mod-hr",
          "mod-ledger"
        ],
        "dashboards": [
          "db-staff"
        ]
      },
      {
        "id": "portal-admin",
        "name": "Admin Portal",
        "roles": [
          "ADMIN"
        ],
        "modules": [
          "mod-ledger",
          "mod-hr"
        ],
        "dashboards": [
          "db-admin"
        ]
      }
    ],
    "availableModules": [
      {
        "id": "mod-hr",
        "name": "HR & Recruitment",
        "category": "Corporate",
        "permissions": [],
        "workflows": [],
        "forms": [],
        "reports": []
      },
      {
        "id": "mod-ledger",
        "name": "FAAP General Ledger",
        "category": "Finance",
        "permissions": [],
        "workflows": [],
        "forms": [],
        "reports": []
      }
    ],
    "workflows": [],
    "reports": [],
    "integrations": []
  },
  {
    "id": "TPL-JUDICIARY",
    "name": "Judiciary and Legal Practice ERP Blueprint",
    "ecosystemId": "ECO-JUD",
    "description": "National platform for court administration and legal practices.",
    "version": "v2.0.0",
    "status": "Active",
    "governance": {
      "title": "Judicial Service Commission",
      "role": "GOVERNING_BODY"
    },
    "directorates": [],
    "portals": [
      {
        "id": "portal-staff",
        "name": "Judicial Staff Portal",
        "roles": [
          "STAFF"
        ],
        "modules": [
          "mod-case-management"
        ],
        "dashboards": [
          "db-staff"
        ]
      },
      {
        "id": "portal-litigant",
        "name": "Public E-Filing Portal",
        "roles": [
          "LITIGANT"
        ],
        "modules": [
          "mod-case-management"
        ],
        "dashboards": [
          "db-litigant"
        ]
      },
      {
        "id": "portal-admin",
        "name": "Admin Portal",
        "roles": [
          "ADMIN"
        ],
        "modules": [
          "mod-ledger"
        ],
        "dashboards": [
          "db-admin"
        ]
      }
    ],
    "availableModules": [
      {
        "id": "mod-case-management",
        "name": "Case Management",
        "category": "Governance",
        "permissions": [],
        "workflows": [],
        "forms": [],
        "reports": []
      },
      {
        "id": "mod-court-admin",
        "name": "Court Administration",
        "category": "Governance",
        "permissions": [],
        "workflows": [],
        "forms": [],
        "reports": []
      },
      {
        "id": "mod-legal-practice",
        "name": "Legal Practice Management",
        "category": "Governance",
        "permissions": [],
        "workflows": [],
        "forms": [],
        "reports": []
      },
      {
        "id": "mod-hr",
        "name": "HR & Recruitment",
        "category": "Corporate",
        "permissions": [],
        "workflows": [],
        "forms": [],
        "reports": []
      },
      {
        "id": "mod-ledger",
        "name": "FAAP General Ledger",
        "category": "Finance",
        "permissions": [],
        "workflows": [],
        "forms": [],
        "reports": []
      }
    ],
    "workflows": [],
    "reports": [],
    "integrations": []
  },
  {
    "id": "TPL-GOVT-MINISTRY",
    "name": "Government Ministry ERP Blueprint",
    "ecosystemId": "ECO-GOVT",
    "description": "Sovereign operating platform for national government ministries.",
    "version": "v2.0.0",
    "status": "Active",
    "governance": {
      "title": "Permanent Secretary Office",
      "role": "EXECUTIVE_AUTHORITY"
    },
    "directorates": [
      {
        "id": "dir-admin",
        "name": "Finance & Administration",
        "governanceHead": "Under Secretary",
        "departments": [
          {
            "id": "dept-hr",
            "name": "Human Resources",
            "directorateId": "dir-admin",
            "modules": [
              "mod-hr"
            ],
            "roles": [
              "HR_ADMIN"
            ]
          }
        ]
      }
    ],
    "portals": [
      {
        "id": "portal-staff",
        "name": "Public Servant Portal",
        "roles": [
          "STAFF"
        ],
        "modules": [
          "mod-ledger",
          "mod-hr"
        ],
        "dashboards": [
          "db-internal"
        ]
      },
      {
        "id": "portal-citizen",
        "name": "Citizen Service Portal",
        "roles": [
          "CITIZEN"
        ],
        "modules": [
          "mod-citizen-services"
        ],
        "dashboards": [
          "db-citizen"
        ]
      },
      {
        "id": "portal-recruitment",
        "name": "Public Service Recruitment",
        "roles": [
          "APPLICANT"
        ],
        "modules": [
          "mod-hr"
        ],
        "dashboards": [
          "db-recruitment"
        ]
      },
      {
        "id": "portal-admin",
        "name": "Admin Portal",
        "roles": [
          "ADMIN"
        ],
        "modules": [
          "mod-ledger",
          "mod-hr"
        ],
        "dashboards": [
          "db-admin"
        ]
      }
    ],
    "availableModules": [
      {
        "id": "mod-ledger",
        "name": "FAAP General Ledger",
        "category": "Finance",
        "permissions": [],
        "workflows": [],
        "forms": [],
        "reports": []
      },
      {
        "id": "mod-hr",
        "name": "HR & Payroll",
        "category": "Corporate",
        "permissions": [],
        "workflows": [],
        "forms": [],
        "reports": []
      },
      {
        "id": "mod-citizen-services",
        "name": "Citizen Services",
        "category": "Governance",
        "permissions": [],
        "workflows": [],
        "forms": [],
        "reports": []
      }
    ],
    "workflows": [
      "wf-payment-approval",
      "wf-procurement"
    ],
    "reports": [
      "budget-performance"
    ],
    "integrations": [
      "IFMS-SYNC",
      "NATIONAL-ID-HUB"
    ]
  },
  {
    "id": "TPL-GOVT-AGENCY",
    "name": "Government Agency ERP Blueprint",
    "ecosystemId": "ECO-GOVT",
    "description": "Operating system for specialized government agencies and statutory authorities.",
    "version": "v2.0.0",
    "status": "Active",
    "governance": {
      "title": "Board of Directors",
      "role": "GOVERNING_BODY"
    },
    "directorates": [],
    "portals": [
      {
        "id": "portal-staff",
        "name": "Staff Portal",
        "roles": [
          "STAFF"
        ],
        "modules": [
          "mod-ledger",
          "mod-hr"
        ],
        "dashboards": [
          "db-internal"
        ]
      },
      {
        "id": "portal-citizen",
        "name": "Citizen Portal",
        "roles": [
          "CITIZEN"
        ],
        "modules": [
          "mod-citizen-services"
        ],
        "dashboards": [
          "db-citizen"
        ]
      },
      {
        "id": "portal-admin",
        "name": "Admin Portal",
        "roles": [
          "ADMIN"
        ],
        "modules": [
          "mod-ledger"
        ],
        "dashboards": [
          "db-admin"
        ]
      }
    ],
    "availableModules": [
      {
        "id": "mod-ledger",
        "name": "FAAP General Ledger",
        "category": "Finance",
        "permissions": [],
        "workflows": [],
        "forms": [],
        "reports": []
      },
      {
        "id": "mod-hr",
        "name": "HR & Payroll",
        "category": "Corporate",
        "permissions": [],
        "workflows": [],
        "forms": [],
        "reports": []
      },
      {
        "id": "mod-citizen-services",
        "name": "Citizen Services",
        "category": "Governance",
        "permissions": [],
        "workflows": [],
        "forms": [],
        "reports": []
      }
    ],
    "workflows": [],
    "reports": [],
    "integrations": []
  },
  {
    "id": "TPL-GOVT-DISTRICT",
    "name": "Local Government ERP Blueprint",
    "ecosystemId": "ECO-GOVT",
    "description": "Operating system for district councils and local municipalities.",
    "version": "v2.0.0",
    "status": "Active",
    "governance": {
      "title": "District Executive Committee",
      "role": "GOVERNING_BODY"
    },
    "directorates": [],
    "portals": [
      {
        "id": "portal-staff",
        "name": "Council Staff Portal",
        "roles": [
          "STAFF"
        ],
        "modules": [
          "mod-ledger"
        ],
        "dashboards": [
          "db-internal"
        ]
      },
      {
        "id": "portal-citizen",
        "name": "Resident Service Portal",
        "roles": [
          "CITIZEN"
        ],
        "modules": [
          "mod-citizen-services"
        ],
        "dashboards": [
          "db-citizen"
        ]
      },
      {
        "id": "portal-admin",
        "name": "Admin Portal",
        "roles": [
          "ADMIN"
        ],
        "modules": [
          "mod-ledger"
        ],
        "dashboards": [
          "db-admin"
        ]
      }
    ],
    "availableModules": [
      {
        "id": "mod-citizen-services",
        "name": "Local Revenue & Licensing",
        "category": "Governance",
        "permissions": [],
        "workflows": [],
        "forms": [],
        "reports": []
      },
      {
        "id": "mod-ledger",
        "name": "FAAP General Ledger",
        "category": "Finance",
        "permissions": [],
        "workflows": [],
        "forms": [],
        "reports": []
      }
    ],
    "workflows": [],
    "reports": [],
    "integrations": []
  },
  {
    "id": "TPL-AGRIBUSINESS",
    "name": "Agribusiness ERP Blueprint",
    "ecosystemId": "ECO-AGRI",
    "description": "Enterprise platform for agricultural production and processing.",
    "version": "v2.0.0",
    "status": "Active",
    "governance": {
      "title": "Agribusiness Management Board",
      "role": "GOVERNING_BODY"
    },
    "directorates": [],
    "portals": [
      {
        "id": "portal-farmer",
        "name": "Farmer Cooperative Portal",
        "roles": [
          "FARMER"
        ],
        "modules": [
          "mod-farm-management"
        ],
        "dashboards": [
          "db-farmer"
        ]
      },
      {
        "id": "portal-staff",
        "name": "Staff Portal",
        "roles": [
          "STAFF"
        ],
        "modules": [
          "mod-hr",
          "mod-ledger"
        ],
        "dashboards": [
          "db-staff"
        ]
      },
      {
        "id": "portal-admin",
        "name": "Admin Portal",
        "roles": [
          "ADMIN"
        ],
        "modules": [
          "mod-ledger"
        ],
        "dashboards": [
          "db-admin"
        ]
      }
    ],
    "availableModules": [
      {
        "id": "mod-farm-management",
        "name": "Farm Management",
        "category": "Industry",
        "permissions": [],
        "workflows": [],
        "forms": [],
        "reports": []
      },
      {
        "id": "mod-supply-chain",
        "name": "Supply Chain & Logistics",
        "category": "Logistics",
        "permissions": [],
        "workflows": [],
        "forms": [],
        "reports": []
      },
      {
        "id": "mod-hr",
        "name": "HR & Recruitment",
        "category": "Corporate",
        "permissions": [],
        "workflows": [],
        "forms": [],
        "reports": []
      },
      {
        "id": "mod-ledger",
        "name": "FAAP General Ledger",
        "category": "Finance",
        "permissions": [],
        "workflows": [],
        "forms": [],
        "reports": []
      }
    ],
    "workflows": [],
    "reports": [],
    "integrations": []
  },
  {
    "id": "TPL-MICROFINANCE",
    "name": "Microfinance ERP Blueprint",
    "ecosystemId": "ECO-MFI",
    "description": "Sovereign platform for Microfinance Institutions.",
    "version": "v2.0.0",
    "status": "Active",
    "governance": {
      "title": "Board of Directors",
      "role": "GOVERNING_BODY"
    },
    "directorates": [
      {
        "id": "dir-credit",
        "name": "Credit & Lending",
        "governanceHead": "Credit Manager",
        "departments": [
          {
            "id": "dept-loans",
            "name": "Loans",
            "directorateId": "dir-credit",
            "modules": [
              "mod-loans"
            ],
            "roles": [
              "CREDIT_OFFICER"
            ]
          }
        ]
      }
    ],
    "portals": [
      {
        "id": "portal-customer",
        "name": "Customer Portal",
        "roles": [
          "CUSTOMER"
        ],
        "modules": [
          "mod-savings",
          "mod-loans"
        ],
        "dashboards": [
          "db-customer"
        ]
      },
      {
        "id": "portal-staff",
        "name": "Staff Portal",
        "roles": [
          "STAFF"
        ],
        "modules": [
          "mod-hr",
          "mod-ledger"
        ],
        "dashboards": [
          "db-staff"
        ]
      },
      {
        "id": "portal-admin",
        "name": "Admin Portal",
        "roles": [
          "ADMIN"
        ],
        "modules": [
          "mod-ledger"
        ],
        "dashboards": [
          "db-admin"
        ]
      }
    ],
    "availableModules": [
      {
        "id": "mod-loans",
        "name": "Loan Management",
        "category": "Finance",
        "permissions": [],
        "workflows": [],
        "forms": [],
        "reports": []
      },
      {
        "id": "mod-savings",
        "name": "Savings & Deposits",
        "category": "Finance",
        "permissions": [],
        "workflows": [],
        "forms": [],
        "reports": []
      },
      {
        "id": "mod-ledger",
        "name": "FAAP General Ledger",
        "category": "Finance",
        "permissions": [],
        "workflows": [],
        "forms": [],
        "reports": []
      },
      {
        "id": "mod-hr",
        "name": "HR & Recruitment",
        "category": "Corporate",
        "permissions": [],
        "workflows": [],
        "forms": [],
        "reports": []
      }
    ],
    "workflows": [
      "wf-loan-approval"
    ],
    "reports": [
      "portfolio-at-risk"
    ],
    "integrations": [
      "CREDIT-REFERENCE-BUREAU"
    ]
  },
  {
    "id": "TPL-SACCO-PRO",
    "name": "SACCO ERP Blueprint",
    "ecosystemId": "ECO-MFI",
    "description": "Sovereign platform for Savings and Credit Cooperatives.",
    "version": "v2.0.0",
    "status": "Active",
    "governance": {
      "title": "Management Committee",
      "role": "GOVERNING_BODY"
    },
    "directorates": [],
    "portals": [
      {
        "id": "portal-member",
        "name": "Member Portal",
        "roles": [
          "MEMBER"
        ],
        "modules": [
          "mod-savings",
          "mod-loans"
        ],
        "dashboards": [
          "db-member"
        ]
      },
      {
        "id": "portal-staff",
        "name": "Staff Portal",
        "roles": [
          "STAFF"
        ],
        "modules": [
          "mod-hr",
          "mod-ledger"
        ],
        "dashboards": [
          "db-staff"
        ]
      },
      {
        "id": "portal-admin",
        "name": "Admin Portal",
        "roles": [
          "ADMIN"
        ],
        "modules": [
          "mod-ledger"
        ],
        "dashboards": [
          "db-admin"
        ]
      }
    ],
    "availableModules": [
      {
        "id": "mod-loans",
        "name": "Loan Management",
        "category": "Finance",
        "permissions": [],
        "workflows": [],
        "forms": [],
        "reports": []
      },
      {
        "id": "mod-savings",
        "name": "Savings & Deposits",
        "category": "Finance",
        "permissions": [],
        "workflows": [],
        "forms": [],
        "reports": []
      },
      {
        "id": "mod-ledger",
        "name": "FAAP General Ledger",
        "category": "Finance",
        "permissions": [],
        "workflows": [],
        "forms": [],
        "reports": []
      },
      {
        "id": "mod-hr",
        "name": "HR & Recruitment",
        "category": "Corporate",
        "permissions": [],
        "workflows": [],
        "forms": [],
        "reports": []
      }
    ],
    "workflows": [],
    "reports": [],
    "integrations": []
  },
  {
    "id": "TPL-DIOCESE-CORE",
    "name": "General Church ERP Blueprint",
    "ecosystemId": "ECO-CULT",
    "description": "Comprehensive administration platform for church provinces, dioceses, and parishes.",
    "version": "v2.0.0",
    "status": "Active",
    "governance": {
      "title": "Diocesan Synod / Council",
      "role": "GOVERNING_BODY"
    },
    "directorates": [],
    "portals": [
      {
        "id": "portal-clergy",
        "name": "Clergy Portal",
        "roles": [
          "CLERGY"
        ],
        "modules": [
          "mod-ledger",
          "mod-hr"
        ],
        "dashboards": [
          "db-clergy"
        ]
      },
      {
        "id": "portal-member",
        "name": "Congregant Portal",
        "roles": [
          "MEMBER"
        ],
        "modules": [
          "mod-ledger"
        ],
        "dashboards": [
          "db-member"
        ]
      },
      {
        "id": "portal-admin",
        "name": "Admin Portal",
        "roles": [
          "ADMIN"
        ],
        "modules": [
          "mod-ledger"
        ],
        "dashboards": [
          "db-admin"
        ]
      }
    ],
    "availableModules": [
      {
        "id": "mod-ledger",
        "name": "FAAP General Ledger",
        "category": "Finance",
        "permissions": [],
        "workflows": [],
        "forms": [],
        "reports": []
      },
      {
        "id": "mod-hr",
        "name": "HR & Recruitment",
        "category": "Corporate",
        "permissions": [],
        "workflows": [],
        "forms": [],
        "reports": []
      }
    ],
    "workflows": [
      "wf-payment-approval"
    ],
    "reports": [
      "tithe-collections"
    ],
    "integrations": [
      "MOBILE-MONEY"
    ]
  },
  {
    "id": "TPL-CULTURAL-HERITAGE",
    "name": "Cultural Heritage ERP Blueprint",
    "ecosystemId": "ECO-CULT",
    "description": "Platform for cultural institutions and heritage conservation sites.",
    "version": "v2.0.0",
    "status": "Active",
    "governance": {
      "title": "Heritage Custodians Board",
      "role": "GOVERNING_BODY"
    },
    "directorates": [],
    "portals": [
      {
        "id": "portal-staff",
        "name": "Staff Portal",
        "roles": [
          "STAFF"
        ],
        "modules": [
          "mod-heritage-registry",
          "mod-hr"
        ],
        "dashboards": [
          "db-staff"
        ]
      },
      {
        "id": "portal-admin",
        "name": "Admin Portal",
        "roles": [
          "ADMIN"
        ],
        "modules": [
          "mod-ledger"
        ],
        "dashboards": [
          "db-admin"
        ]
      }
    ],
    "availableModules": [
      {
        "id": "mod-heritage-registry",
        "name": "Heritage Registry",
        "category": "Community",
        "permissions": [],
        "workflows": [],
        "forms": [],
        "reports": []
      },
      {
        "id": "mod-hr",
        "name": "HR & Recruitment",
        "category": "Corporate",
        "permissions": [],
        "workflows": [],
        "forms": [],
        "reports": []
      }
    ],
    "workflows": [],
    "reports": [],
    "integrations": []
  },
  {
    "id": "TPL-CLAN-FAMILY",
    "name": "Clan & Family ERP Blueprint",
    "ecosystemId": "ECO-CULT",
    "description": "Platform for clan registries and family genealogy governance.",
    "version": "v2.0.0",
    "status": "Active",
    "governance": {
      "title": "Clan Council of Elders",
      "role": "GOVERNING_BODY"
    },
    "directorates": [],
    "portals": [
      {
        "id": "portal-member",
        "name": "Clan Member Portal",
        "roles": [
          "MEMBER"
        ],
        "modules": [
          "mod-family-registry"
        ],
        "dashboards": [
          "db-member"
        ]
      },
      {
        "id": "portal-admin",
        "name": "Admin Portal",
        "roles": [
          "ADMIN"
        ],
        "modules": [
          "mod-ledger"
        ],
        "dashboards": [
          "db-admin"
        ]
      }
    ],
    "availableModules": [
      {
        "id": "mod-family-registry",
        "name": "Family Registry",
        "category": "Community",
        "permissions": [],
        "workflows": [],
        "forms": [],
        "reports": []
      }
    ],
    "workflows": [],
    "reports": [],
    "integrations": []
  },
  {
    "id": "TPL-ALUMNI-ENDOWMENT",
    "name": "Alumni & Endowment ERP Blueprint",
    "ecosystemId": "ECO-ALUMNI",
    "description": "Platform for alumni networks and endowment fund governance.",
    "version": "v2.0.0",
    "status": "Active",
    "governance": {
      "title": "Board of Trustees",
      "role": "GOVERNING_BODY"
    },
    "directorates": [],
    "portals": [
      {
        "id": "portal-alumni",
        "name": "Alumni Portal",
        "roles": [
          "ALUMNI"
        ],
        "modules": [
          "mod-alumni-relations",
          "mod-donations"
        ],
        "dashboards": [
          "db-alumni"
        ]
      },
      {
        "id": "portal-admin",
        "name": "Admin Portal",
        "roles": [
          "ADMIN"
        ],
        "modules": [
          "mod-ledger"
        ],
        "dashboards": [
          "db-admin"
        ]
      }
    ],
    "availableModules": [
      {
        "id": "mod-alumni-relations",
        "name": "Alumni Relations",
        "category": "Community",
        "permissions": [],
        "workflows": [],
        "forms": [],
        "reports": []
      },
      {
        "id": "mod-donations",
        "name": "Endowment & Donations",
        "category": "Finance",
        "permissions": [],
        "workflows": [],
        "forms": [],
        "reports": []
      },
      {
        "id": "mod-hr",
        "name": "HR & Recruitment",
        "category": "Corporate",
        "permissions": [],
        "workflows": [],
        "forms": [],
        "reports": []
      },
      {
        "id": "mod-ledger",
        "name": "FAAP General Ledger",
        "category": "Finance",
        "permissions": [],
        "workflows": [],
        "forms": [],
        "reports": []
      }
    ],
    "workflows": [],
    "reports": [],
    "integrations": []
  },
  {
    "id": "TPL-HOTEL-PRO",
    "name": "Hotel and Resort ERP Blueprint",
    "ecosystemId": "ECO-HOSP",
    "description": "Comprehensive platform for hotels, resorts, and hospitality enterprises.",
    "version": "v2.0.0",
    "status": "Active",
    "governance": {
      "title": "Hotel Executive Board",
      "role": "GOVERNING_BODY"
    },
    "directorates": [
      {
        "id": "dir-rooms",
        "name": "Rooms Division",
        "governanceHead": "Rooms Manager",
        "departments": [
          {
            "id": "dept-frontdesk",
            "name": "Front Desk",
            "directorateId": "dir-rooms",
            "modules": [
              "mod-booking"
            ],
            "roles": [
              "RECEPTIONIST"
            ]
          }
        ]
      }
    ],
    "portals": [
      {
        "id": "portal-guest",
        "name": "Guest Portal",
        "roles": [
          "GUEST"
        ],
        "modules": [
          "mod-booking"
        ],
        "dashboards": [
          "db-guest"
        ]
      },
      {
        "id": "portal-staff",
        "name": "Staff Portal",
        "roles": [
          "STAFF"
        ],
        "modules": [
          "mod-hr",
          "mod-ledger"
        ],
        "dashboards": [
          "db-staff"
        ]
      },
      {
        "id": "portal-admin",
        "name": "Admin Portal",
        "roles": [
          "ADMIN"
        ],
        "modules": [
          "mod-ledger"
        ],
        "dashboards": [
          "db-admin"
        ]
      }
    ],
    "availableModules": [
      {
        "id": "mod-booking",
        "name": "Booking & Reservations",
        "category": "Hospitality",
        "permissions": [],
        "workflows": [],
        "forms": [],
        "reports": []
      },
      {
        "id": "mod-tourism",
        "name": "Tourism Management",
        "category": "Hospitality",
        "permissions": [],
        "workflows": [],
        "forms": [],
        "reports": []
      },
      {
        "id": "mod-hr",
        "name": "HR & Recruitment",
        "category": "Corporate",
        "permissions": [],
        "workflows": [],
        "forms": [],
        "reports": []
      },
      {
        "id": "mod-ledger",
        "name": "FAAP General Ledger",
        "category": "Finance",
        "permissions": [],
        "workflows": [],
        "forms": [],
        "reports": []
      }
    ],
    "workflows": [],
    "reports": [],
    "integrations": []
  },
  {
    "id": "TPL-WHOLESALE-PRO",
    "name": "Wholesale ERP Blueprint",
    "ecosystemId": "ECO-MERCH",
    "description": "Enterprise platform for wholesale commercial enterprises and distributors.",
    "version": "v2.0.0",
    "status": "Active",
    "governance": {
      "title": "Wholesale Management Board",
      "role": "GOVERNING_BODY"
    },
    "directorates": [],
    "portals": [
      {
        "id": "portal-staff",
        "name": "Wholesale Staff Portal",
        "roles": [
          "STAFF"
        ],
        "modules": [
          "mod-inventory",
          "mod-distribution"
        ],
        "dashboards": [
          "db-staff"
        ]
      },
      {
        "id": "portal-admin",
        "name": "Admin Portal",
        "roles": [
          "ADMIN"
        ],
        "modules": [
          "mod-ledger"
        ],
        "dashboards": [
          "db-admin"
        ]
      }
    ],
    "availableModules": [
      {
        "id": "mod-distribution",
        "name": "Distribution Management",
        "category": "Trade",
        "permissions": [],
        "workflows": [],
        "forms": [],
        "reports": []
      },
      {
        "id": "mod-inventory",
        "name": "Inventory Management",
        "category": "Logistics",
        "permissions": [],
        "workflows": [],
        "forms": [],
        "reports": []
      },
      {
        "id": "mod-ledger",
        "name": "FAAP General Ledger",
        "category": "Finance",
        "permissions": [],
        "workflows": [],
        "forms": [],
        "reports": []
      }
    ],
    "workflows": [],
    "reports": [],
    "integrations": []
  },
  {
    "id": "TPL-RETAIL-PRO",
    "name": "Retail ERP Blueprint",
    "ecosystemId": "ECO-MERCH",
    "description": "Enterprise platform for retail chain enterprises and point of sale networks.",
    "version": "v2.0.0",
    "status": "Active",
    "governance": {
      "title": "Retail Operations Board",
      "role": "GOVERNING_BODY"
    },
    "directorates": [],
    "portals": [
      {
        "id": "portal-staff",
        "name": "Store Cashier Portal",
        "roles": [
          "STAFF"
        ],
        "modules": [
          "mod-pos",
          "mod-inventory"
        ],
        "dashboards": [
          "db-staff"
        ]
      },
      {
        "id": "portal-admin",
        "name": "Admin Portal",
        "roles": [
          "ADMIN"
        ],
        "modules": [
          "mod-ledger"
        ],
        "dashboards": [
          "db-admin"
        ]
      }
    ],
    "availableModules": [
      {
        "id": "mod-pos",
        "name": "Point of Sale (POS)",
        "category": "Trade",
        "permissions": [],
        "workflows": [],
        "forms": [],
        "reports": []
      },
      {
        "id": "mod-inventory",
        "name": "Inventory Management",
        "category": "Logistics",
        "permissions": [],
        "workflows": [],
        "forms": [],
        "reports": []
      },
      {
        "id": "mod-ledger",
        "name": "FAAP General Ledger",
        "category": "Finance",
        "permissions": [],
        "workflows": [],
        "forms": [],
        "reports": []
      }
    ],
    "workflows": [],
    "reports": [],
    "integrations": []
  }
];

export class KernelBootstrap {
  static async execute() {
    console.log("[KERNEL] Initializing UEOS v5.2 Bootstrap sequence...");
    AuditSystem.logAction({ action: "KERNEL_BOOTSTRAP", operator: "SYSTEM_BOOTSTRAP_ORCHESTRATOR", target: "UEOS_KERNEL", timestamp: Date.now(), status: 'APPROVED' });
    
    this.installComponents();
    this.installForms();
    this.installModules();
    this.installWorkflows();
    this.installEcosystems();
    this.installTemplates();
    
    console.log("[KERNEL] Bootstrap complete. Engine status: READY.");
  }

  private static installComponents() {
    const components: EnterpriseComponent[] = [
      { id: "comp-grid", name: "Enterprise Data Grid", type: "UI", description: "Advanced data table with filtering and export." },
      { id: "comp-ledger", name: "FAAP Ledger Viewer", type: "UI", description: "Real-time double-entry ledger visualization." },
      { id: "comp-workflow", name: "Workflow Timeline", type: "UI", description: "Interactive approval state tracking." },
      { id: "comp-chart", name: "Analytics Dashboard Widget", type: "UI", description: "Dynamic Recharts-based data visualizer." },
      { id: "comp-doc", name: "Sovereign Document Viewer", type: "UI", description: "Secure document indexing and rendering." }
    ];
    components.forEach(c => {
      ComponentRegistry.register(c);
    });
  }

  private static installForms() {
    const forms: EnterpriseForm[] = [
      { id: "form-admission", name: "Student Admission Form", fields: [], validation: {} },
      { id: "form-voucher", name: "Payment Voucher", fields: [], validation: {}, workflowBinding: "wf-payment-approval" },
      { id: "form-loan", name: "Loan Application", fields: [], validation: {}, workflowBinding: "wf-loan-assessment" },
      { id: "form-encounter", name: "Clinical Encounter Log", fields: [], validation: {} }
    ];
    forms.forEach(f => {
      FormRegistry.register(f);
    });
  }

  private static installModules() {
    const modules: EnterpriseModule[] = [
      { id: "mod-ledger", name: "FAAP General Ledger", category: "Finance", permissions: ["FINANCE_ADMIN"], workflows: [], forms: ["form-voucher"], reports: ["trial-balance"] },
      { id: "mod-loans", name: "Loan Portfolio Manager", category: "Finance", permissions: ["LOAN_OFFICER"], workflows: ["wf-loan-assessment"], forms: ["form-loan"], reports: ["arrears-report"] },
      { id: "mod-academics", name: "Academic Registry", category: "Education", permissions: ["REGISTRAR"], workflows: [], forms: ["form-admission"], reports: ["enrolment-summary"] },
      { id: "mod-clinical", name: "Clinical Management", category: "Healthcare", permissions: ["DOCTOR"], workflows: [], forms: ["form-encounter"], reports: ["patient-summary"] },
      { id: "mod-procurement", name: "Procurement & SCM", category: "Trade", permissions: ["PROCUREMENT_OFFICER"], workflows: ["wf-payment-approval"], forms: [], reports: [] },
      { id: "mod-hr", name: "HR & Payroll", category: "Corporate", permissions: ["HR_ADMIN"], workflows: [], forms: [], reports: [] },
      { id: "mod-inventory", name: "Inventory & Assets", category: "Industry", permissions: ["STORE_MANAGER"], workflows: [], forms: [], reports: [] }
    ];
    modules.forEach(m => {
      ModuleRegistry.register(m, "JUMO-VALID-SIG-2026");
    });
  }

  private static installWorkflows() {
    const workflows: EnterpriseWorkflow[] = [
      { id: "wf-payment-approval", name: "Standard Payment Workflow", trigger: "FORM_SUBMIT", status: "Active", steps: [], approvals: [], roles: ["Accountant", "Finance Director"] },
      { id: "wf-loan-assessment", name: "Loan Credit Scoring", trigger: "FORM_SUBMIT", status: "Active", steps: [], approvals: [], roles: ["Loan Officer", "Credit Committee"] },
      { id: "wf-admission", name: "Academic Admission Cycle", trigger: "FORM_SUBMIT", status: "Active", steps: [], approvals: [], roles: ["Registrar", "Dean"] },
      { id: "wf-procurement", name: "Procurement Requisition", trigger: "FORM_SUBMIT", status: "Active", steps: [], approvals: [], roles: ["HOD", "Bursar"] }
    ];
    workflows.forEach(w => {
      WorkflowRegistry.register(w, "JUMO-VALID-SIG-2026");
    });
  }

  private static installEcosystems() {
    BOOTSTRAP_ECOSYSTEMS.forEach(e => {
      EcosystemRegistry.register(e, "JUMO-VALID-SIG-2026");
    });
  }

  private static installTemplates() {
    BOOTSTRAP_TEMPLATES.forEach(t => {
      ERPTemplateRegistry.register(t, "JUMO-VALID-SIG-2026");
    });
  }
}
