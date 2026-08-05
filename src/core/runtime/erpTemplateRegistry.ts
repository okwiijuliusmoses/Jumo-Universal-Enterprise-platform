/**
 * JUMO UEOS ERP Template Registry
 *
 * Templates are sovereign enterprise platform blueprints.
 * They DO NOT manufacture themselves.
 * Manufacturing is handled exclusively by Universal ERP Factory.
 */

export interface PortalDefinition {
  id: string;
  name: string;
  role: string;
  description: string;
  modules: string[];
  permissions: string[];
  workflows: string[];
}

export interface GovernanceNode {
  title: string;
  role: string;
  subNodes?: GovernanceNode[];
}

export interface PublicExperienceConfig {
  publicDomainSuffix: string;
  tagline: string;
  announcements: string[];
  publicServices: string[];
  actionButtons: { label: string; action: string; type: "primary" | "secondary" | "outline" }[];
}

export interface ERPTemplateDefinition {
  id: string;
  aliases?: string[];
  version: string;
  approvalStatus: "APPROVED" | "PENDING_AUDIT";
  name: string;
  ecosystemId: string;
  governanceType: string;
  description: string;
  publicExperience: PublicExperienceConfig;
  governanceStructure: GovernanceNode;
  portals: PortalDefinition[];
  departments: string[];
  modules: string[];
  workflows: string[];
  forms: string[];
  components: string[];
  apps?: string[];
  services?: string[];
  navigation?: any[];
  securityProfile: {
    dataSegregation: string;
    authPolicy: string;
    encryptionLevel: string;
  };
  aiProfile: string;
}

const templates: ERPTemplateDefinition[] = [
  {
    id: "university-erp",
    aliases: ["university-erp", "UNIVERSITY_ERP_TEMPLATE", "EDU_UNIV_TEMPLATE"],
    version: "4.2.0-SOVEREIGN",
    approvalStatus: "APPROVED",
    name: "University ERP Platform Blueprint",
    ecosystemId: "education",
    governanceType: "University Governance",
    description: "National-grade higher education, research, campus, and student lifecycle operating platform.",
    publicExperience: {
      publicDomainSuffix: ".jumo.platform",
      tagline: "Empowering Academic Excellence & Sovereign Educational Governance",
      announcements: [
        "Academic Year Admissions Now Open",
        "Research Grants Application Deadline Extended",
        "Graduation Ceremony Schedule Announced"
      ],
      publicServices: [
        "Online Course Catalogue",
        "Public Research Repository",
        "Alumni Credential Verification",
        "Campus Visitor Portal"
      ],
      actionButtons: [
        { label: "Student Login", action: "login_student", type: "primary" },
        { label: "Staff Login", action: "login_staff", type: "secondary" },
        { label: "Administrator Login", action: "login_admin", type: "outline" },
        { label: "Create Account", action: "register_user", type: "secondary" },
        { label: "Institution Registration", action: "register_inst", type: "outline" }
      ]
    },
    governanceStructure: {
      title: "University Council",
      role: "Supreme Sovereign Governing Body",
      subNodes: [
        {
          title: "Chancellor & Vice Chancellor",
          role: "Chief Executive Leadership",
          subNodes: [
            {
              title: "Deputy VC Academic Affairs",
              role: "Academic Governance",
              subNodes: [
                { title: "Faculties & Schools", role: "Academic Divisions" },
                { title: "Academic Registrar", role: "Admissions & Exams" }
              ]
            },
            {
              title: "Deputy VC Finance & Administration",
              role: "Financial & Operational Management",
              subNodes: [
                { title: "FAAP Treasury Directorate", role: "Financial Control" },
                { title: "Human Resources Directorate", role: "Staffing & Payroll" },
                { title: "ICT Directorate", role: "Digital Infrastructure" }
              ]
            }
          ]
        }
      ]
    },
    portals: [
      {
        id: "executive-portal",
        name: "Executive & Chancellery Portal",
        role: "Council & Executive Management",
        description: "Institutional performance dashboards, Senate oversight, and budget allocation controls.",
        modules: ["Analytics", "FAAP Treasury", "Governance Oversight", "Audit Trail"],
        permissions: ["EXECUTIVE_FULL_ACCESS", "SENATE_AUDIT"],
        workflows: ["Budget Approval Workflow", "Policy Enactment"]
      },
      {
        id: "administration-portal",
        name: "Administration & HR Portal",
        role: "Administrative Directorate",
        description: "Campus operations, staffing, payroll, procurement, and facility logistics.",
        modules: ["HR & Payroll", "Procurement", "Asset Accounting", "Campus Logistics"],
        permissions: ["ADMIN_OPS_WRITE", "PAYROLL_APPROVAL"],
        workflows: ["Staff Onboarding", "Procurement Requisition"]
      },
      {
        id: "academic-portal",
        name: "Academic & Senate Portal",
        role: "Deans & Lecturers",
        description: "Curriculum authoring, lecture scheduling, grading, and research oversight.",
        modules: ["LMS", "Course Management", "Gradebook", "Research Ledger"],
        permissions: ["FACULTY_GRADE_INPUT", "CURRICULUM_EDIT"],
        workflows: ["Grade Moderation", "Course Approval"]
      },
      {
        id: "registrar-portal",
        name: "Registrar & Admissions Portal",
        role: "Academic Registrar",
        description: "Student admission processing, transcript issuing, and graduation clearance.",
        modules: ["SIS Admissions", "Student Records", "Transcripts", "Exams"],
        permissions: ["REGISTRAR_RECORD_MUTATION", "ENROLLMENT_SEAL"],
        workflows: ["Admissions Pipeline", "Graduation Clearance"]
      },
      {
        id: "finance-portal",
        name: "Finance & Bursar Portal",
        role: "University Bursar & Finance Staff",
        description: "Tuition billing, ledger balancing, grant accounting, and vendor disbursements via FAAP.",
        modules: ["FAAP Ledger", "Tuition Billing", "Grant Management", "Payroll"],
        permissions: ["BURSAR_TREASURY_WRITE", "DISBURSEMENT_EXECUTE"],
        workflows: ["Fee Reconciliation", "Vendor Disbursement"]
      },
      {
        id: "student-portal",
        name: "Student Portal",
        role: "Enrolled Students",
        description: "Course enrollment, tuition payment receipts, grade access, and hostel booking.",
        modules: ["Student Dashboard", "Course Enrollment", "Fee Receipts", "Library", "Hostel"],
        permissions: ["STUDENT_SELF_READ", "PAYMENT_INITIATE"],
        workflows: ["Course Registration", "Tuition Payment"]
      },
      {
        id: "staff-portal",
        name: "Staff & Faculty Portal",
        role: "University Employees",
        description: "Payroll stubs, leave applications, class attendance logging, and appraisal requests.",
        modules: ["Staff Dashboard", "Attendance", "Leave Management", "Research Submissions"],
        permissions: ["STAFF_SELF_READ", "LEAVE_SUBMIT"],
        workflows: ["Leave Request", "Research Grant Application"]
      }
    ],
    departments: [
      "Academic Affairs",
      "Admissions & Registrar",
      "FAAP Finance & Bursary",
      "Research & Innovation",
      "Library & Information Services",
      "Human Resources & Payroll",
      "ICT & Digital Infrastructure",
      "Procurement & Estates"
    ],
    modules: [
      "Admissions Pipeline",
      "Student Information System (SIS)",
      "Academic Curriculum & LMS",
      "Examinations & Transcripts",
      "FAAP Treasury & Bursary",
      "HR & Payroll Engine",
      "Research Grant Ledger",
      "Digital Library System",
      "Hostel & Accommodation",
      "Procurement & Supply Chain",
      "Campus Medical Center",
      "Institutional Analytics"
    ],
    workflows: [
      "Online Admission Pipeline",
      "Semester Course Registration",
      "Tuition Payment Reconciliation",
      "Examination Grade Moderation",
      "Graduation Clearance Audit"
    ],
    forms: [
      "Student Admission Application",
      "Course Registration Form",
      "Tuition Waiver Request",
      "Research Grant Requisition"
    ],
    components: [
      "Executive Dashboard Panel",
      "Student Academic Transcript Viewer",
      "FAAP Financial Audit Ledger",
      "Real-time Class Schedule Grid"
    ],
    securityProfile: {
      dataSegregation: "Multi-Campus Row-Level Security with Tenant Isolation",
      authPolicy: "Multi-Factor Authentication with Student & Staff SSO",
      encryptionLevel: "AES-256 at Rest & TLS 1.3 in Transit"
    },
    aiProfile: "education-ai"
  },

  {
    id: "college-erp",
    aliases: ["college-erp", "EDU_COLLEGE_TEMPLATE"],
    version: "4.1.0-SOVEREIGN",
    approvalStatus: "APPROVED",
    name: "College ERP Operating Blueprint",
    ecosystemId: "education",
    governanceType: "College Governance",
    description: "Specialized tertiary college, institute, and professional school management platform.",
    publicExperience: {
      publicDomainSuffix: ".college.platform",
      tagline: "Professional Skills & Tertiary Academic Excellence",
      announcements: ["New Intake Applications Open", "Diploma Examinations Schedule"],
      publicServices: ["Diploma Programs Directory", "Verification Portal"],
      actionButtons: [
        { label: "Student Login", action: "login_student", type: "primary" },
        { label: "Staff Login", action: "login_staff", type: "secondary" },
        { label: "Apply Now", action: "register_user", type: "outline" }
      ]
    },
    governanceStructure: {
      title: "College Governing Board",
      role: "Board of Governors",
      subNodes: [
        { title: "College Principal", role: "Chief Executive" },
        { title: "Academic Dean", role: "Academic Management" }
      ]
    },
    portals: [
      {
        id: "college-admin-portal",
        name: "College Administration Portal",
        role: "Principal & Staff",
        description: "Enrollments, course scheduling, and tuition receipts.",
        modules: ["Admissions", "Course Scheduling", "FAAP Bursary"],
        permissions: ["COLLEGE_ADMIN_WRITE"],
        workflows: ["Student Enrollment Workflow"]
      },
      {
        id: "college-student-portal",
        name: "College Student Portal",
        role: "Enrolled Trainees",
        description: "Coursework, grades, and fee payments.",
        modules: ["Student Records", "Fee Ledger"],
        permissions: ["STUDENT_READ"],
        workflows: ["Fee Payment Workflow"]
      }
    ],
    departments: ["Academic Affairs", "Administration", "Finance", "Student Welfare"],
    modules: ["Admissions", "Student Management", "FAAP Bursary", "Examinations"],
    workflows: ["Admissions Workflow", "Academic Assessment Workflow"],
    forms: ["Student Application Form", "Fee Payment Form"],
    components: ["College Dashboard", "Grade Matrix"],
    securityProfile: {
      dataSegregation: "Tenant Isolation",
      authPolicy: "MFA / SSO",
      encryptionLevel: "AES-256"
    },
    aiProfile: "education-ai"
  },

  {
    id: "technical-vocational-erp",
    aliases: ["technical-vocational-erp", "EDU_TVET_TEMPLATE"],
    version: "4.1.0-SOVEREIGN",
    approvalStatus: "APPROVED",
    name: "Technical & Vocational (TVET) ERP Blueprint",
    ecosystemId: "education",
    governanceType: "TVET Board Governance",
    description: "Vocational training institutes, practical skill centers, and apprenticeship certification platforms.",
    publicExperience: {
      publicDomainSuffix: ".tvet.platform",
      tagline: "Practical Industry Skills & National Technical Accreditation",
      announcements: ["Vocational Trade Skills Registration", "Apprenticeship Program Launch"],
      publicServices: ["Skills Directory", "Certificates Registry"],
      actionButtons: [
        { label: "Trainee Portal", action: "login_student", type: "primary" },
        { label: "Instructor Portal", action: "login_staff", type: "secondary" }
      ]
    },
    governanceStructure: {
      title: "TVET Governing Council",
      role: "Council Governance",
      subNodes: [
        { title: "Institute Director", role: "Head of Institute" },
        { title: "Head of Vocational Training", role: "Skills Assessment Director" }
      ]
    },
    portals: [
      {
        id: "tvet-learner-portal",
        name: "Learner & Apprentice Portal",
        role: "Trainees",
        description: "Practical assessment logs, workshop schedules, and skill certification records.",
        modules: ["Skill Assessment", "Workshop Logs"],
        permissions: ["TRAINEE_READ"],
        workflows: ["Skill Assessment Submission"]
      },
      {
        id: "tvet-instructor-portal",
        name: "Instructor & Master Craftsman Portal",
        role: "Instructors",
        description: "Workshop grading, practical skill evaluation, and attendance tracking.",
        modules: ["Practical Grading", "Workshop Inventory"],
        permissions: ["INSTRUCTOR_WRITE"],
        workflows: ["Skill Certification Approval"]
      }
    ],
    departments: ["Training & Workshops", "Assessment & Accreditation", "Administration", "Finance"],
    modules: ["Course Modules", "Practical Skill Assessment", "Workshop Equipment Ledger", "FAAP Finance"],
    workflows: ["Enrollment Workflow", "Practical Assessment Clearance"],
    forms: ["Apprenticeship Registration Form", "Workshop Safety Clearance"],
    components: ["Skill Matrix Tracker", "Equipment Inventory Grid"],
    securityProfile: {
      dataSegregation: "Tenant Isolation",
      authPolicy: "Role-Based Access",
      encryptionLevel: "AES-256"
    },
    aiProfile: "education-ai"
  },

  {
    id: "secondary-school-erp",
    aliases: ["secondary-school-erp", "EDU_SECONDARY_TEMPLATE"],
    version: "4.0.0-SOVEREIGN",
    approvalStatus: "APPROVED",
    name: "Secondary School ERP Platform Blueprint",
    ecosystemId: "education",
    governanceType: "School Board Governance",
    description: "High school, secondary academy, and boarding school operating platform.",
    publicExperience: {
      publicDomainSuffix: ".school.platform",
      tagline: "Nurturing Character & Academic Excellence",
      announcements: ["Term Results Available", "Parent-Teacher Association Meeting"],
      publicServices: ["School Calendar", "Admissions Info"],
      actionButtons: [
        { label: "Parent Login", action: "login_parent", type: "primary" },
        { label: "Teacher Login", action: "login_staff", type: "secondary" },
        { label: "Student Login", action: "login_student", type: "outline" }
      ]
    },
    governanceStructure: {
      title: "Board of Governors",
      role: "School Board",
      subNodes: [
        { title: "Headteacher / Principal", role: "School Administrator" },
        { title: "Deputy Headteacher Academics", role: "Academic Management" }
      ]
    },
    portals: [
      {
        id: "secondary-parent-portal",
        name: "Parent & Guardian Portal",
        role: "Parents",
        description: "Student report cards, fee payments, attendance tracking, and teacher communication.",
        modules: ["Report Cards", "Fee Ledger", "Attendance"],
        permissions: ["PARENT_CHILD_READ"],
        workflows: ["Fee Payment"]
      },
      {
        id: "secondary-teacher-portal",
        name: "Teacher & Class Tutor Portal",
        role: "Teachers",
        description: "Class attendance, continuous assessment entering, and behavior logging.",
        modules: ["Gradebook", "Attendance", "Behavior Log"],
        permissions: ["TEACHER_GRADE_WRITE"],
        workflows: ["Report Card Submission"]
      }
    ],
    departments: ["Academics", "Administration", "Boarding & Welfare", "Finance"],
    modules: ["Student Information", "Examinations", "Class Timetable", "FAAP Bursary"],
    workflows: ["Admission Workflow", "Term Assessment Clearance"],
    forms: ["Student Enrolment Form", "Boarding Clearance Form"],
    components: ["Report Card Generator", "Timetable Grid"],
    securityProfile: {
      dataSegregation: "Row Segregation",
      authPolicy: "Guardian SSO",
      encryptionLevel: "AES-256"
    },
    aiProfile: "education-ai"
  },

  {
    id: "nursery-primary-erp",
    aliases: ["nursery-primary-erp", "EDU_PRIMARY_TEMPLATE"],
    version: "4.0.0-SOVEREIGN",
    approvalStatus: "APPROVED",
    name: "Nursery & Primary ERP Blueprint",
    ecosystemId: "education",
    governanceType: "Primary School Governance",
    description: "Early childhood education, primary school, and foundation academy platform.",
    publicExperience: {
      publicDomainSuffix: ".primary.platform",
      tagline: "Foundational Growth & Creative Learning Environment",
      announcements: ["New Term Registration Open", "Sports Day Schedule"],
      publicServices: ["Primary Admissions Info"],
      actionButtons: [
        { label: "Parent Portal", action: "login_parent", type: "primary" },
        { label: "Teacher Portal", action: "login_staff", type: "secondary" }
      ]
    },
    governanceStructure: {
      title: "School Board",
      role: "Board of Management",
      subNodes: [
        { title: "Headmistress / Headmaster", role: "School Head" }
      ]
    },
    portals: [
      {
        id: "primary-parent-portal",
        name: "Parent Portal",
        role: "Parents",
        description: "Pupil daily updates, learning progress, and school fee receipts.",
        modules: ["Pupil Updates", "Fee Receipts"],
        permissions: ["PARENT_READ"],
        workflows: ["Fee Payment"]
      }
    ],
    departments: ["Early Childhood", "Primary Academics", "Administration", "Finance"],
    modules: ["Pupil Records", "Learning Activities", "FAAP School Fees"],
    workflows: ["Enrollment Workflow"],
    forms: ["Pupil Registration Form"],
    components: ["Pupil Growth Matrix"],
    securityProfile: {
      dataSegregation: "Tenant Isolation",
      authPolicy: "Password / OTP",
      encryptionLevel: "AES-256"
    },
    aiProfile: "education-ai"
  },

  {
    id: "community-finance-erp",
    aliases: ["community-finance-erp", "SACCO_HQ_TEMPLATE", "SACCO_BRANCH_TEMPLATE", "MICROFINANCE_ERP"],
    version: "4.3.0-SOVEREIGN",
    approvalStatus: "APPROVED",
    name: "Community Finance & SACCO Core Platform Blueprint",
    ecosystemId: "community-finance",
    governanceType: "Financial Cooperative Governance",
    description: "Full-scale SACCO, microfinance, community savings federation, and credit treasury platform.",
    publicExperience: {
      publicDomainSuffix: ".sacco.platform",
      tagline: "Empowering Member Wealth Through Sovereign Cooperative Finance",
      announcements: ["Annual General Meeting (AGM) Notice", "Dividend Rates Released"],
      publicServices: ["Loan Calculator", "Membership Eligibility Check"],
      actionButtons: [
        { label: "Member Login", action: "login_member", type: "primary" },
        { label: "Staff Login", action: "login_staff", type: "secondary" },
        { label: "Apply for Membership", action: "register_user", type: "outline" }
      ]
    },
    governanceStructure: {
      title: "Board of Directors",
      role: "Sovereign Board Governance",
      subNodes: [
        {
          title: "Chief Executive Officer",
          role: "Executive Management",
          subNodes: [
            { title: "Credit Committee", role: "Loan Approval Authority" },
            { title: "Supervisory Committee", role: "Audit & Compliance" },
            { title: "FAAP Chief Financial Officer", role: "Treasury Operations" }
          ]
        }
      ]
    },
    portals: [
      {
        id: "member-portal",
        name: "Member Self-Service Portal",
        role: "Cooperative Members",
        description: "View savings balances, apply for loans, check dividend statements, and transfer funds.",
        modules: ["Savings Account", "Loan Applications", "Dividends", "Share Capital"],
        permissions: ["MEMBER_SELF_ACCESS"],
        workflows: ["Loan Application Workflow", "Savings Deposit"]
      },
      {
        id: "officer-portal",
        name: "Credit & Loans Officer Portal",
        role: "Credit Officers",
        description: "Loan appraisal, collateral verification, credit scoring, and repayment tracking.",
        modules: ["Loan Appraisal Engine", "Collateral Registry", "Credit Scoring"],
        permissions: ["CREDIT_OFFICER_MUTATE"],
        workflows: ["Loan Appraisal Pipeline"]
      },
      {
        id: "sacco-management-portal",
        name: "Executive Treasury & Board Portal",
        role: "Board & CEO",
        description: "FAAP ledger balancing, dividend calculation, liquidity monitoring, and regulatory compliance.",
        modules: ["FAAP Banking Ledger", "Dividends Engine", "Liquidity Dashboard", "Regulatory Audit"],
        permissions: ["BOARD_EXECUTIVE_FULL"],
        workflows: ["Dividend Distribution Approval", "Liquidity Adjustment"]
      }
    ],
    departments: ["Member Services", "Credit & Risk Assessment", "FAAP Treasury", "Internal Audit", "Legal & Compliance"],
    modules: [
      "Member Registry",
      "Savings & Fixed Deposit Accounts",
      "Loan Appraisal & Disbursal Engine",
      "Share Capital Ledger",
      "FAAP Core Banking Ledger",
      "Dividends Calculation Engine",
      "Credit Scoring & Risk AI",
      "M-Pesa / Banking API Bridge"
    ],
    workflows: [
      "Member Registration Pipeline",
      "Loan Application & Credit Approval",
      "Loan Disbursement & FAAP Posting",
      "Monthly Dividend Calculation"
    ],
    forms: ["Member Application Form", "Loan Request Form", "Guarantor Pledge Form"],
    components: ["Member Account Summary", "Loan Repayment Schedule", "FAAP Treasury Balance Sheet"],
    securityProfile: {
      dataSegregation: "Double-Entry Ledger Integrity + Tenant Isolation",
      authPolicy: "MFA + Biometric Signature Validation",
      encryptionLevel: "AES-256 + Encrypted Ledger Audit Hashing"
    },
    aiProfile: "finance-ai"
  },

  {
    id: "hospitality-erp",
    aliases: ["hospitality-erp", "HOSPITALITY_HOTEL_TEMPLATE", "RESORT_ERP_TEMPLATE"],
    version: "4.1.0-SOVEREIGN",
    approvalStatus: "APPROVED",
    name: "Hospitality & Resort Operating Blueprint",
    ecosystemId: "hospitality",
    governanceType: "Hospitality Executive Governance",
    description: "Hotels, resorts, luxury accommodations, restaurant chains, and tourism management platform.",
    publicExperience: {
      publicDomainSuffix: ".hotel.platform",
      tagline: "Unrivaled Guest Hospitality & Operations Mastery",
      announcements: ["Seasonal Suite Rates", "Dining Specials"],
      publicServices: ["Online Room Booking", "Restaurant Table Reservation"],
      actionButtons: [
        { label: "Book a Room", action: "register_user", type: "primary" },
        { label: "Guest Login", action: "login_member", type: "secondary" },
        { label: "Staff Login", action: "login_staff", type: "outline" }
      ]
    },
    governanceStructure: {
      title: "Board of Directors",
      role: "Property Governance",
      subNodes: [
        { title: "General Manager", role: "Hotel Leadership" },
        { title: "Operations Director", role: "Front Desk & Housekeeping" }
      ]
    },
    portals: [
      {
        id: "guest-portal",
        name: "Guest Experience Portal",
        role: "Hotel Guests",
        description: "Room reservations, room service ordering, keyless access, and bill review.",
        modules: ["Reservations", "Room Service", "Billing"],
        permissions: ["GUEST_READ"],
        workflows: ["Booking Workflow"]
      },
      {
        id: "hospitality-staff-portal",
        name: "Staff & Housekeeping Portal",
        role: "Hotel Staff",
        description: "Room status management, POS dining orders, housekeeping tasks, and maintenance.",
        modules: ["Front Desk POS", "Housekeeping", "Inventory"],
        permissions: ["STAFF_OPS_WRITE"],
        workflows: ["Check-in Workflow"]
      }
    ],
    departments: ["Front Desk", "Housekeeping", "Food & Beverage", "Events & Catering", "FAAP Finance"],
    modules: ["Room Reservation Engine", "Restaurant POS", "Inventory & Supply Chain", "FAAP Ledger"],
    workflows: ["Guest Check-in Pipeline", "Night Audit Reconciliation"],
    forms: ["Guest Check-in Registration", "Room Service Order"],
    components: ["Room Status Grid", "POS Terminal Dashboard"],
    securityProfile: {
      dataSegregation: "Property Segregation",
      authPolicy: "PIN / Card / SSO",
      encryptionLevel: "AES-256"
    },
    aiProfile: "hospitality-ai"
  },

  {
    id: "diocese-province-erp",
    aliases: ["diocese-province-erp", "CHURCH_GOV_TEMPLATE", "PARISH_NETWORK_TEMPLATE"],
    version: "4.2.0-SOVEREIGN",
    approvalStatus: "APPROVED",
    name: "Diocese & Church Federation Blueprint",
    ecosystemId: "religious-diocese",
    governanceType: "Ecclesial Synod Governance",
    description: "Diocese, provincial synod, archdeaconries, and parish network administration platform.",
    publicExperience: {
      publicDomainSuffix: ".church.platform",
      tagline: "Stewardship, Fellowship & Spiritual Administration",
      announcements: ["Diocesan Synod Assembly Notice", "Easter Stewardship Appeal"],
      publicServices: ["Parish Locator", "Ministry Outreach Directory"],
      actionButtons: [
        { label: "Parish Login", action: "login_staff", type: "primary" },
        { label: "Member Login", action: "login_member", type: "secondary" }
      ]
    },
    governanceStructure: {
      title: "Diocesan Synod",
      role: "Synodical Governance",
      subNodes: [
        { title: "Diocesan Bishop", role: "Ecclesial Leader" },
        { title: "Diocesan Secretary & Bursar", role: "Administration & Stewardship" }
      ]
    },
    portals: [
      {
        id: "diocesan-leadership-portal",
        name: "Diocesan Synod & Bishop Portal",
        role: "Diocesan Executive",
        description: "Stewardship accounting across all parishes, clergy registry, and ministry budgets.",
        modules: ["Diocesan FAAP Treasury", "Clergy Registry", "Parish Audits"],
        permissions: ["SYNOD_FULL_READ"],
        workflows: ["Parish Quota Allocation"]
      },
      {
        id: "parish-portal",
        name: "Parish Administration Portal",
        role: "Parish Priest & Treasurers",
        description: "Congregation records, tithes & offering receipts, and local project funds.",
        modules: ["Congregation Records", "Tithe Receipts", "Parish Finance"],
        permissions: ["PARISH_ADMIN_WRITE"],
        workflows: ["Tithe Reconciliation"]
      }
    ],
    departments: ["Parish Operations", "Clergy & Ministry", "FAAP Financial Stewardship", "Community Projects"],
    modules: ["Congregation Registry", "Tithe & Offering Ledger", "Parish Quota Manager", "FAAP Treasury"],
    workflows: ["Tithe Logging Workflow", "Diocesan Quota Clearance"],
    forms: ["Member Registration Form", "Baptismal / Confirmation Record"],
    components: ["Parish Financial Dashboard", "Diocesan Map Overview"],
    securityProfile: {
      dataSegregation: "Multi-Parish Row Isolation",
      authPolicy: "MFA / SSO",
      encryptionLevel: "AES-256"
    },
    aiProfile: "community-ai"
  },

  {
    id: "clan-heritage-erp",
    aliases: ["clan-heritage-erp", "CLAN_HERITAGE_TEMPLATE", "KINGDOM_GOV_TEMPLATE"],
    version: "4.1.0-SOVEREIGN",
    approvalStatus: "APPROVED",
    name: "Clan, Heritage & Family Registry Blueprint",
    ecosystemId: "clan-heritage",
    governanceType: "Clan Council Governance",
    description: "Clan governance, genealogy tree, family welfare fund, and cultural heritage platform.",
    publicExperience: {
      publicDomainSuffix: ".clan.platform",
      tagline: "Preserving Heritage, Lineage & Community Welfare",
      announcements: ["Annual Clan Heritage Assembly", "Lineage Registry Update"],
      publicServices: ["Genealogy Search", "Clan Welfare Fund Info"],
      actionButtons: [
        { label: "Clan Member Login", action: "login_member", type: "primary" },
        { label: "Council Login", action: "login_admin", type: "secondary" }
      ]
    },
    governanceStructure: {
      title: "Council of Elders",
      role: "Supreme Cultural Governance",
      subNodes: [
        { title: "Clan Prime Minister / Head", role: "Executive Council" },
        { title: "Lineage Chiefs", role: "Branch Lineages" }
      ]
    },
    portals: [
      {
        id: "clan-member-portal",
        name: "Clan Member Portal",
        role: "Registered Members",
        description: "View family lineage, pay welfare dues, access cultural archives, and register births.",
        modules: ["Genealogy Tree", "Welfare Contributions", "Cultural Archive"],
        permissions: ["MEMBER_READ"],
        workflows: ["Birth Registration Workflow"]
      },
      {
        id: "clan-council-portal",
        name: "Elders & Council Portal",
        role: "Council Officers",
        description: "Lineage verification, welfare fund allocation, and customary dispute logs.",
        modules: ["Lineage Registry", "Welfare Disbursement", "Customary Disputes"],
        permissions: ["COUNCIL_WRITE"],
        workflows: ["Welfare Request Approval"]
      }
    ],
    departments: ["Council Secretariat", "Genealogy & Lineage", "Welfare Fund", "Cultural Preservation"],
    modules: ["Family Genealogy Tree", "Member Lineage Registry", "Clan Welfare Ledger", "FAAP Treasury"],
    workflows: ["Lineage Verification Workflow", "Welfare Fund Disbursal"],
    forms: ["Lineage Registration Form", "Welfare Assistance Request"],
    components: ["Interactive Genealogy Tree", "Welfare Fund Balance"],
    securityProfile: {
      dataSegregation: "Lineage Privacy Isolation",
      authPolicy: "OTP / Biometric",
      encryptionLevel: "AES-256"
    },
    aiProfile: "community-ai"
  },

  {
    id: "govt-agency-erp",
    aliases: ["govt-agency-erp", "GOVT_AGENCY_TEMPLATE", "MINISTRY_ERP_TEMPLATE"],
    version: "4.5.0-SOVEREIGN",
    approvalStatus: "APPROVED",
    name: "Sovereign Government Agency Blueprint",
    ecosystemId: "sovereign-govt",
    governanceType: "Public Ministry Governance",
    description: "National government agencies, public ministries, regulatory commissions, and municipal councils.",
    publicExperience: {
      publicDomainSuffix: ".gov.platform",
      tagline: "Sovereign Public Administration & Citizen Service Efficiency",
      announcements: ["Public Service Gazette Notice", "Citizen Portal Upgraded"],
      publicServices: ["e-Permit Application", "Public Registry Verification"],
      actionButtons: [
        { label: "Citizen Services", action: "register_user", type: "primary" },
        { label: "Civil Servant Login", action: "login_staff", type: "secondary" }
      ]
    },
    governanceStructure: {
      title: "Ministry Cabinet",
      role: "Sovereign State Authority",
      subNodes: [
        { title: "Permanent Secretary", role: "Accounting Officer" },
        { title: "Directors General", role: "Agency Leadership" }
      ]
    },
    portals: [
      {
        id: "citizen-portal",
        name: "Citizen e-Services Portal",
        role: "Citizens & Businesses",
        description: "Apply for permits, pay government fees, verify licenses, and track applications.",
        modules: ["e-Permits", "License Verification", "Revenue Payments"],
        permissions: ["CITIZEN_PUBLIC_ACCESS"],
        workflows: ["Permit Application"]
      },
      {
        id: "public-admin-portal",
        name: "Agency Staff & Inspector Portal",
        role: "Civil Servants",
        description: "Application vetting, inspection logging, license issuing, and audit trail.",
        modules: ["Application Vetting", "Inspection Logs", "FAAP Public Treasury"],
        permissions: ["CIVIL_SERVANT_WRITE"],
        workflows: ["License Approval Pipeline"]
      }
    ],
    departments: ["Public Service Delivery", "Regulatory Inspection", "FAAP Public Treasury", "Legal & Gazette"],
    modules: ["Citizen Registry", "Permit & License Engine", "Inspection Ledger", "FAAP Public Treasury"],
    workflows: ["Permit Application & Clearance", "Revenue Collection Reconciliation"],
    forms: ["e-Permit Application Form", "Inspection Compliance Form"],
    components: ["Citizen Service Tracker", "Public Treasury Ledger"],
    securityProfile: {
      dataSegregation: "Top-Secret Sovereign Encryption + Multi-Department Isolation",
      authPolicy: "National Digital ID + CAC Smartcard / MFA",
      encryptionLevel: "AES-256 + Sovereign Audit Seals"
    },
    aiProfile: "sovereign-ai"
  },

  {
    id: "ngo-grant-erp",
    aliases: ["ngo-grant-erp", "NGO_GRANT_TEMPLATE", "HUMANITARIAN_FIELD_TEMPLATE"],
    version: "4.2.0-SOVEREIGN",
    approvalStatus: "APPROVED",
    name: "NGO & Grant Humanitarian Blueprint",
    ecosystemId: "ngo-humanitarian",
    governanceType: "Non-Profit Board Governance",
    description: "International NGOs, grant foundations, humanitarian field programs, and multi-currency aid operations.",
    publicExperience: {
      publicDomainSuffix: ".ngo.platform",
      tagline: "Transparent Humanitarian Aid & Global Grant Stewardship",
      announcements: ["Annual Impact Report Published", "Emergency Aid Appeal"],
      publicServices: ["Donor Transparency Portal", "Field Impact Metrics"],
      actionButtons: [
        { label: "Donor Portal", action: "login_member", type: "primary" },
        { label: "Staff & Field Login", action: "login_staff", type: "secondary" }
      ]
    },
    governanceStructure: {
      title: "Board of Trustees",
      role: "Global Non-Profit Governance",
      subNodes: [
        { title: "Executive Director", role: "Head of Mission" },
        { title: "Country Directors", role: "Regional Operations" }
      ]
    },
    portals: [
      {
        id: "donor-portal",
        name: "Donor & Trustee Portal",
        role: "Grant Donors",
        description: "Real-time grant allocation tracking, project impact metrics, and financial audits.",
        modules: ["Grant Allocation Ledger", "Impact Metrics", "FAAP Multi-Currency"],
        permissions: ["DONOR_AUDIT_READ"],
        workflows: ["Grant Clearance"]
      },
      {
        id: "ngo-field-portal",
        name: "Field Operations & Program Portal",
        role: "Field Program Officers",
        description: "Beneficiary registration, field disbursement, inventory dispatch, and impact logging.",
        modules: ["Beneficiary Registry", "Field Disbursement", "Logistics"],
        permissions: ["FIELD_OFFICER_WRITE"],
        workflows: ["Aid Distribution Workflow"]
      }
    ],
    departments: ["Program Operations", "Grant Management", "Field Logistics", "FAAP Multi-Currency Finance"],
    modules: ["Grant Ledger", "Beneficiary Information System", "Field Aid Logistics", "FAAP Finance"],
    workflows: ["Grant Disbursement Pipeline", "Impact Verification Audit"],
    forms: ["Grant Application Form", "Field Expenditure Voucher"],
    components: ["Grant Allocation Grid", "Global Impact Map"],
    securityProfile: {
      dataSegregation: "Donor-Audited Multi-Currency Row Segregation",
      authPolicy: "MFA + Field Token Validation",
      encryptionLevel: "AES-256"
    },
    aiProfile: "ngo-ai"
  }
];

function normalizeTemplate(t: any): ERPTemplateDefinition {
  if (!t) return t;
  const portals = Array.isArray(t.portals) ? t.portals : [];
  const portalNames = portals.map((p: any) => typeof p === "string" ? p : (p.name || p.id));
  const departments = Array.isArray(t.departments) ? t.departments : [];
  const modules = Array.isArray(t.modules) ? t.modules : [];
  const workflows = Array.isArray(t.workflows) ? t.workflows : [];
  const forms = Array.isArray(t.forms) ? t.forms : [];
  const components = Array.isArray(t.components) ? t.components : [];
  
  const apps = Array.isArray(t.apps) && t.apps.length > 0 ? t.apps : portalNames;
  const services = Array.isArray(t.services) && t.services.length > 0 ? t.services : ["FAAP Ledger Service", "Zero-Trust Identity Service", "Workflow Automation Service"];
  
  const navigation = Array.isArray(t.navigation) && t.navigation.length > 0
    ? t.navigation
    : [
        ...portalNames.map((p: string) => ({ id: p.toLowerCase().replace(/\s+/g, "-"), name: p, type: "PORTAL" })),
        ...modules.map((m: string) => ({ id: m.toLowerCase().replace(/\s+/g, "-"), name: m, type: "MODULE" })),
        ...departments.map((d: string) => ({ id: d.toLowerCase().replace(/\s+/g, "-"), name: d, type: "DEPARTMENT" })),
        ...workflows.map((w: string) => ({ id: w.toLowerCase().replace(/\s+/g, "-"), name: w, type: "WORKFLOW" })),
        ...services.map((s: string) => ({ id: s.toLowerCase().replace(/\s+/g, "-"), name: s, type: "SERVICE" })),
      ];

  const publicExperience = t.publicExperience || {
    publicDomainSuffix: ".jumo.platform",
    tagline: "Enterprise Operating Platform",
    announcements: [],
    publicServices: [],
    actionButtons: []
  };

  publicExperience.announcements = Array.isArray(publicExperience.announcements) ? publicExperience.announcements : [];
  publicExperience.publicServices = Array.isArray(publicExperience.publicServices) ? publicExperience.publicServices : [];
  publicExperience.actionButtons = Array.isArray(publicExperience.actionButtons) ? publicExperience.actionButtons : [];

  return {
    ...t,
    portals,
    departments,
    modules,
    workflows,
    forms,
    components,
    apps,
    services,
    navigation,
    publicExperience,
    governanceStructure: t.governanceStructure || { title: "Executive Council", role: "Governing Board", subNodes: [] }
  };
}

export class ERPTemplateRegistry {
  static getAll(): ERPTemplateDefinition[] {
    return templates.map(normalizeTemplate);
  }

  static getById(idOrAlias: string): ERPTemplateDefinition | undefined {
    if (!idOrAlias) return undefined;
    const searchKey = idOrAlias.trim();
    const found = templates.find(t =>
      t.id.toLowerCase() === searchKey.toLowerCase() ||
      (t.aliases && t.aliases.some(alias => alias.toLowerCase() === searchKey.toLowerCase()))
    );
    return found ? normalizeTemplate(found) : undefined;
  }
}

export default ERPTemplateRegistry;
