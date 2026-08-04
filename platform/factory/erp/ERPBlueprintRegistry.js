/**
 * JUMO UEOS
 * Configurable AI ERP Blueprint Registry
 *
 * Blueprints are configurable generation rules,
 * not locked ERP products.
 */

export const ERPBlueprintRegistry = {

  version: "1.0",

  standards: {
    portals: 20,
    modules: 200,
    forms: 500,
    workflows: 100,
    components: 100,
    aiAgents: 20
  },


  blueprints: [

    {
      id:"education-erp",
      name:"Education ERP",
      category:"Institutional ERP",

      configurableScope:[
        "University",
        "College",
        "Vocational",
        "Secondary",
        "Primary"
      ],

      capabilities:[
        "Academic Management",
        "Student Lifecycle",
        "Admissions",
        "Examinations",
        "Learning Management",
        "Library",
        "Accommodation",
        "Research Administration",
        "Alumni Integration"
      ],

      portals: [
        "Student Portal",
        "Academic Portal",
        "Registrar Portal",
        "Staff Portal",
        "Finance Portal"
      ],
      
      settings: {
        theme: "Enterprise Light",
        language: "en-US",
        timezone: "UTC"
      },
      
      configuration: {
        academicYear: "2026/2027",
        admissionStatus: "OPEN",
        gradingSystem: "GPA"
      },
      
      features: {
        onlineLearning: true,
        studentPortal: true,
        librarySystem: true
      },
      
      permissions: [
        "ACADEMIC_ADMIN",
        "STUDENT_VIEW",
        "FACULTY_ACCESS"
      ],
      
      policies: {
        dataRetention: "7 Years",
        privacyLevel: "HIGH"
      },

      generationRules:{
        configurable:true
      }
    },


    {
      id:"government-erp",
      name:"Government ERP",
      category:"Public Administration ERP",

      configurableScope:[
        "Ministry",
        "Agency",
        "Local Government",
        "Public Institution"
      ],

      capabilities:[
        "Administration",
        "Citizen Services",
        "Procurement",
        "Compliance",
        "Records"
      ],

      portals: [
        "Citizen Portal",
        "Ministry Portal",
        "Administration Portal"
      ],
      
      settings: {
        theme: "Government Standard",
        language: "en-US",
        timezone: "UTC"
      },
      
      configuration: {
        fiscalYear: "2026/2027",
        procurementThreshold: 5000,
        complianceLevel: "STRICT"
      },
      
      features: {
        citizenPortal: true,
        digitalSignatures: true,
        auditLogging: true
      },
      
      permissions: [
        "GOV_ADMIN",
        "CITIZEN_VIEW",
        "COMPLIANCE_OFFICER"
      ],
      
      policies: {
        publicTransparency: "FULL",
        dataSovereignty: "NATIONAL"
      },

      generationRules:{
        configurable:true
      }
    },


    {
      id:"finance-microfinance-erp",
      name:"Finance & Microfinance ERP",
      category:"Financial Institution ERP",

      configurableScope:[
        "Microfinance",
        "SACCO",
        "Cooperative",
        "Financial Institution"
      ],

      capabilities:[
        "Member Management",
        "Savings",
        "Loans",
        "Credit Management",
        "Financial Operations"
      ],
      
      settings: {
        theme: "Banking Blue",
        language: "en-US",
        timezone: "UTC"
      },
      
      configuration: {
        fiscalYear: "2026/2027",
        loanInterestRate: 0.12,
        maxLoanDurationMonths: 36
      },
      
      features: {
        mobileBanking: true,
        automatedScoring: true,
        onlineSavings: true
      },
      
      permissions: [
        "LOAN_OFFICER",
        "CREDIT_MANAGER",
        "TELLER_VIEW"
      ],
      
      policies: {
        kycLevel: "STRICT",
        amlMonitoring: "CONTINUOUS"
      },

      generationRules:{
        configurable:true
      }
    },


    {
      id:"healthcare-erp",
      name:"Healthcare ERP",
      category:"Healthcare Operations ERP",

      configurableScope:[
        "Hospital",
        "Clinic",
        "Healthcare Network"
      ],

      capabilities:[
        "Patient Management",
        "Medical Records",
        "Pharmacy",
        "Billing"
      ],
      
      settings: {
        theme: "Clinical Clean",
        language: "en-US",
        timezone: "UTC"
      },
      
      configuration: {
        standardShiftHours: 12,
        emergencyStatus: "NORMAL"
      },
      
      features: {
        telemedicine: true,
        ePrescribing: true,
        patientPortal: true
      },
      
      permissions: [
        "DOCTOR_ACCESS",
        "NURSE_VIEW",
        "PATIENT_READ"
      ],
      
      policies: {
        hipaaCompliance: "REQUIRED",
        dataEncryption: "AES-256"
      },

      generationRules:{
        configurable:true
      }
    },


    {
      id:"agriculture-erp",
      name:"Agriculture ERP",
      category:"Agribusiness ERP",

      configurableScope:[
        "Farm",
        "Agribusiness",
        "Agricultural Organization"
      ],

      capabilities:[
        "Production",
        "Supply Chain",
        "Inventory",
        "Farmer Management"
      ],
      
      settings: {
        theme: "Nature Earth",
        language: "en-US",
        timezone: "UTC"
      },
      
      configuration: {
        harvestSeason: "SPRING",
        inventoryThreshold: 100
      },
      
      features: {
        iotMonitoring: true,
        marketPricing: true,
        logisticsTracking: true
      },
      
      permissions: [
        "FARM_MANAGER",
        "SUPPLY_CHAIN_COORDINATOR",
        "FIELD_AGENT"
      ],
      
      policies: {
        organicCertification: "OPTIONAL",
        sustainabilityTracking: "ENABLED"
      },

      generationRules:{
        configurable:true
      }
    },


    {
      id:"commerce-erp",
      name:"Wholesale Retail & Supermarket ERP",
      category:"Commerce ERP",

      configurableScope:[
        "Wholesale",
        "Retail",
        "Supermarket",
        "Distribution"
      ],

      capabilities:[
        "Sales",
        "Inventory",
        "POS",
        "Warehousing"
      ],

      generationRules:{
        configurable:true
      }
    },


    {
      id:"enterprise-company-erp",
      name:"Enterprise Company ERP",
      category:"Corporate ERP",

      configurableScope:[
        "Professional Company",
        "Service Company",
        "Universal Company"
      ],

      capabilities:[
        "Operations",
        "CRM",
        "HR",
        "Projects"
      ],

      generationRules:{
        configurable:true
      }
    },


    {
      id:"community-cultural-erp",
      name:"Community & Cultural Institutions ERP",
      category:"Social Institution ERP",

      configurableScope:[
        "Community",
        "Culture",
        "Clan",
        "Family",
        "Religious Institution"
      ],

      capabilities:[
        "Membership",
        "Events",
        "Heritage",
        "Community Services"
      ],

      generationRules:{
        configurable:true
      }
    },


    {
      id:"alumni-endowment-erp",
      name:"Alumni & Endowment ERP",
      category:"Institutional Network ERP",

      configurableScope:[
        "Alumni Network",
        "Foundation",
        "Endowment"
      ],

      capabilities:[
        "Alumni Relations",
        "Donations",
        "Scholarships"
      ],

      generationRules:{
        configurable:true
      }
    },


    {
      id:"hospitality-erp",
      name:"Hospitality ERP",
      category:"Hospitality Operations ERP",

      configurableScope:[
        "Hotel",
        "Restaurant",
        "Tourism Business"
      ],

      capabilities:[
        "Reservations",
        "Guest Management",
        "Operations"
      ],

      generationRules:{
        configurable:true
      }
    },


    {
      id:"legal-case-management-erp",
      name:"Legal & Case Management ERP",
      category:"Justice ERP",

      configurableScope:[
        "Law Firm",
        "Court",
        "Legal Institution"
      ],

      capabilities:[
        "Case Management",
        "Client Management",
        "Document Management",
        "Compliance"
      ],

      generationRules:{
        configurable:true
      }
    },


    {
      id:"banking-erp",
      name:"Commercial Banking ERP",
      category:"Banking ERP",

      configurableScope:[
        "Commercial Bank",
        "Retail Bank",
        "Investment Bank",
        "Central Bank"
      ],

      capabilities:[
        "Core Banking Engine",
        "Asset Management",
        "Liquidity Control",
        "Risk Assessment",
        "Regulatory Reporting",
        "Treasury Operations",
        "Customer 360",
        "Fraud Detection"
      ],

      settings: {
        theme: "Banking Deep Blue",
        language: "en-US",
        timezone: "UTC"
      },

      configuration: {
        reserveRatio: 0.1,
        capitalAdequacyRatio: 0.08,
        interestRateBase: 0.05
      },

      features: {
        realTimeSettlement: true,
        aiCreditScoring: true,
        cryptoGateway: false,
        swiftIntegration: true
      },

      permissions: [
        "BANK_ADMIN",
        "TREASURY_OPERATOR",
        "AUDIT_CONTROLLER",
        "BRANCH_MANAGER"
      ],

      policies: {
        baselIIICompliance: "REQUIRED",
        dataPrivacyLevel: "MAXIMUM",
        transactionMonitoring: "REALTIME"
      },

      generationRules:{
        configurable:true
      }
    },


    {
      id:"insurance-erp",
      name:"Insurance ERP",
      category:"Insurance ERP",

      configurableScope:[
        "Life Insurance",
        "Health Insurance",
        "General Insurance",
        "Reinsurance"
      ],

      capabilities:[
        "Policy Administration",
        "Claims Management",
        "Underwriting Engine",
        "Actuarial Analytics",
        "Broker Portal",
        "Reinsurance Management"
      ],

      settings: {
        theme: "Insurance Slate",
        language: "en-US",
        timezone: "UTC"
      },

      configuration: {
        claimThreshold: 1000,
        underwritingAuthority: "SENIOR"
      },

      features: {
        aiClaimsProcessing: true,
        automatedUnderwriting: true,
        mobileClaims: true
      },

      permissions: [
        "CLAIMS_ADJUSTER",
        "UNDERWRITER",
        "ACTUARY",
        "AGENT_ACCESS"
      ],

      policies: {
        solvencyIICompliance: "REQUIRED",
        riskDisclosure: "MANDATORY"
      },

      generationRules:{
        configurable:true
      }
    },


    {
      id:"ngo-erp",
      name:"NGO & Foundation ERP",
      category:"Non-Profit ERP",

      configurableScope:[
        "NGO",
        "Foundation",
        "Charity",
        "Social Enterprise"
      ],

      capabilities:[
        "Donor Management",
        "Grant Administration",
        "Project Tracking",
        "Impact Analytics",
        "Volunteer Coordination"
      ],

      generationRules:{
        configurable:true
      }
    },


    {
      id:"finance-banking-erp",
      name:"Core Banking & Finance ERP",
      category:"Financial Services ERP",

      configurableScope:[
        "Bank",
        "Microfinance",
        "Credit Union",
        "FinTech"
      ],

      capabilities:[
        "Core Banking Operations",
        "Loan & Credit Management",
        "Treasury Management",
        "Financial Risk Analytics",
        "Regulatory Compliance"
      ],

      generationRules:{
        configurable:true
      }
    }

  ],


  getBlueprint(id){

    return this.blueprints.find(
      blueprint=>blueprint.id===id
    );

  },


  list(){

    return this.blueprints;

  }

};
