/**
 * JUMO UEOS
 * ERP Ecosystem Template Registry
 *
 * Defines dynamic, national-grade enterprise templates for each ecosystem.
 */

import { ERPBlueprintRegistry } from "./ERPBlueprintRegistry.js";

export class ERPEcosystemTemplateRegistry {
  constructor() {
    this.templates = [
      // 1. EDUCATION ECOSYSTEM TEMPLATES
      {
        id: "university-erp",
        ecosystemId: "education-erp",
        name: "University & Higher Education ERP",
        description: "National-grade higher education platform for research universities, colleges, and tertiary institutes.",
        portals: ["Sovereign Executive Portal", "Academic Registrar Portal", "Bursar Portal", "Faculty & Lecturer Portal", "Dean of Students Portal", "Student Self-Service Portal"],
        departments: ["University Senate Governance", "Office of the Registrar", "Bursary & Accounts Division", "Human Resource Department", "Research & Grants Directorate", "Library & Information Services Unit", "ICT Services Centre", "Student Affairs Division"],
        modules: ["Student Information Management", "Admissions & Intake Registration", "Curriculum & Academic Registry", "Examinations & Grade Book Processing", "FAAP Financial Tuition Billing", "E-Learning & LMS Integration", "Accommodation & Hall Management", "Research Administration & Grants", "Alumni & Endowment Tracking"],
        layers: ["National Governance Oversight", "Sovereign Institutional Core", "Regional Branch Campuses", "Operations & Services Hub"],
        components: ["Academic Senate Configurator", "Student Biometric Registrar", "Fee Billing Engine", "Exam Seating Assigner", "LMS Node Controller"],
        branches: ["National University HQ", "Main Central Campus", "Northern Regional Campus", "Eastern Regional Campus", "Western Regional Campus", "Southern Regional Campus"],
        workflows: ["Student Admission Route", "Grade Change Approval Workflow", "Scholarship Allocation Workflow", "Tuition Waiver Clearance Workflow"]
      },
      {
        id: "college-erp",
        ecosystemId: "education-erp",
        name: "Tertiary College ERP",
        description: "Comprehensive platform for professional, teacher training, and specialized colleges.",
        portals: ["College Director Portal", "Academic Dean Portal", "Finance & Cashier Portal", "Registrar Portal", "Student Portal"],
        departments: ["College Directorate", "Academic Registry Office", "Finance & Cashier Section", "ICT Support Unit", "Welfare & Student Union Office"],
        modules: ["Student Enrollment Management", "Class & Term Scheduling", "Fee Collection & Payments", "Academic Grading Records", "Library Catalog Systems", "Staff Payroll Control"],
        layers: ["Sovereign Core Control", "Administrative Services", "Regional Branch Offices"],
        components: ["Term Calendar Builder", "Fee Receipt Printer", "Class Schedule Grid", "Biometric Staff Clock-in"],
        branches: ["Central Campus Directorate", "Metropolitan Branch Office", "Rural Training Node"],
        workflows: ["Enrollment Verification Workflow", "Fee Installment Approval Path", "Staff Travel Requisition Workflow"]
      },
      {
        id: "vocational-erp",
        ecosystemId: "education-erp",
        name: "Technical & Vocational ERP",
        description: "Skills training, vocational institute, and polytechnic operations manager.",
        portals: ["Institute Principal Portal", "Technical Instructor Portal", "Bursary Portal", "Trainee Portal"],
        departments: ["Principal's Secretariat", "Technical Instruction Directorate", "Bursary & Storekeep Department", "Industrial Liaison Unit"],
        modules: ["Trainee Skill Registry", "Workshop Inventory & Capex Control", "Industrial Placement Management", "Fee Structure & Collections", "Practical Exam Assessment"],
        layers: ["Institutional Core", "Practical Workshop Hubs", "Industrial Liaison Nodes"],
        components: ["Workshop Machine Asset Registry", "Practical Grades Ledger", "Placement Site Locator", "Tool Crib Check-out Console"],
        branches: ["National Technical Institute HQ", "Central Vocational Workshop", "Coastal Marine Annex", "Inland Agricultural Workshop"],
        workflows: ["Practical Exam Clearance Workflow", "Workshop Consumable Restocking", "Placement Partner Verification"]
      },
      {
        id: "secondary-erp",
        ecosystemId: "education-erp",
        name: "Secondary School ERP",
        description: "High-grade management system for high schools, secondary schools, and academies.",
        portals: ["Head Teacher Portal", "Bursar Portal", "Teacher Grading Portal", "Parent Portal", "Student Portal"],
        departments: ["Head Teacher Secretariat", "Bursar's Accounts Office", "Teacher & Subject Committees", "Boarding & Catering Unit"],
        modules: ["Student Master Database", "Subject Allocation & Grading", "School Fee & Boarding Bills", "Catering & Consumables Control", "Parent-Teacher Communications"],
        layers: ["School Governance", "Academic Operations", "Boarding & Domestic Operations"],
        components: ["Continuous Assessment Grid", "Boarding Bed Assigner", "Parent Communication Node", "Consumables Inventory Table"],
        branches: ["National Education Ministry Office", "Main School Campus", "Girls Boarding Annex", "Boys Boarding Annex"],
        workflows: ["Term Report Release Approval", "Disciplinary Action Review Route", "Consumables Restocking Approval"]
      },
      {
        id: "primary-erp",
        ecosystemId: "education-erp",
        name: "Nursery & Primary School ERP",
        description: "Early childhood development and primary school tracking with parent integration.",
        portals: ["Headmistress Portal", "Accounts Portal", "Class Teacher Portal", "Parent Portal"],
        departments: ["Administration Office", "Early Childhood Development Section", "Accounts Section", "Parent-Teacher Association Node"],
        modules: ["Pupil Enrollment Database", "Attendance & Health Logs", "Basic Fee & Transport Billing", "Activity & Progress Reports", "Transport Route Dispatcher"],
        layers: ["School Governance", "Childhood Operations", "Logistics & Transport"],
        components: ["Pupil Attendance Grid", "Immunization Status Monitor", "Transport Vehicle GPS Tracker", "Term Progress Sheet"],
        branches: ["Central Primary Campus", "Preschool & Nursery Branch", "Eastside Bus Transit Hub"],
        workflows: ["Pupil Registration Route", "Transport Route Change Approval", "ECD Activity Plan Approval"]
      },

      // 2. GOVERNMENT ECOSYSTEM TEMPLATES
      {
        id: "ministry-erp",
        ecosystemId: "government-erp",
        name: "National Ministry ERP",
        description: "State-level enterprise platform for administrative ministries, agencies, and public institutions.",
        portals: ["Ministerial Leadership Portal", "Permanent Secretary Portal", "Department Director Portal", "Public Officer Portal", "Citizen Inquiry Portal"],
        departments: ["Office of the Minister", "Permanent Secretary Secretariat", "Administration & HR Directorate", "Finance & Accounts Department", "Policy Planning & Research", "Internal Audit Directorate", "ICT Services Agency"],
        modules: ["Citizen Identity & Services Registry", "Civil Service Workforce Management", "Public Financial Architecture (FAAP)", "Government Procurement Node", "Document & Archives Management", "Policy Monitoring & KPI Analytics", "Sovereign Audit Ledger Logs", "Citizen Welfare Services"],
        layers: ["Cabinet & State Level Oversight", "Ministry Operations Core", "Regional Directorate Branches", "Citizen Public Services Interface"],
        branches: ["National Ministry HQ (Capital)", "Northern Regional Branch Office", "Eastern Regional Branch Office", "Western Regional Branch Office", "Southern Regional Branch Office"],
        workflows: ["Procurement Requisition Clearance Workflow", "Budget Allocation Review Route", "Policy Amendment Approval Track", "Civil Servant Appointment Workflow"]
      },
      {
        id: "agency-erp",
        ecosystemId: "government-erp",
        name: "State Authority & Agency ERP",
        description: "Regulatory authority, statutory board, or autonomous state agency manager.",
        portals: ["Director General Portal", "Licensing Portal", "Enforcement Portal", "Finance Portal"],
        departments: ["Directorate General", "Licensing & Regulatory Division", "Enforcement & Compliance Unit", "Finance & Support Department"],
        modules: ["Agency Registry & Permits", "Regulatory Compliance Auditor", "Enforcement Tracking Node", "Fee & Revenue Collections", "State Asset Architecture"],
        layers: ["National Oversight Board", "Regulatory Operations", "Field Enforcement Network"],
        components: ["Regulatory Standard Configurator", "Licensing Approval Dashboard", "Asset Tracking Matrix", "Enforcement Report Console"],
        branches: ["National Agency HQ", "Metropolitan Branch Office", "Port & Borders Customs Station"],
        workflows: ["Licensing Verification & Stamp Workflow", "Enforcement Action Referral", "Revenue Reconciliation Path"]
      },
      {
        id: "local-gov-erp",
        ecosystemId: "government-erp",
        name: "Local Government & Municipality ERP",
        description: "Municipal council, district administration, or local government operating framework.",
        portals: ["Mayor & Town Clerk Portal", "Municipal Engineer Portal", "Local Revenue Portal", "Citizen Portal"],
        departments: ["Town Clerk Secretariat", "Municipal Engineering Directorate", "Revenue & Property Rates Division", "Public Health & Environment Office"],
        modules: ["Citizen Property Registry", "Local Tax & Property Rates Billing", "Municipal Infrastructure Projects", "Public Health & Waste Disposal Control", "Citizen Complaint Registry"],
        layers: ["Municipal Council Board", "Local Government Operations", "Community Services Hub"],
        components: ["Property Valuation Database", "Local Tax Ledger Table", "Municipal Project Milestone Tracker", "Complaint Dispatch Console"],
        branches: ["Municipal Council Headquarters", "North Division Office", "East Division Office", "West Division Office", "South Division Office"],
        workflows: ["Building Plan Permission Approval", "Municipal Expenditure Requisition", "Citizen Complaint Resolution Path"]
      },

      // 3. FINANCE & MICROFINANCE ECOSYSTEM TEMPLATES
      {
        id: "microfinance-erp",
        ecosystemId: "finance-microfinance-erp",
        name: "Microfinance Institution ERP",
        description: "Enterprise operating platform for deposit-taking microfinance institutions and SACCOs.",
        portals: ["Managing Director Portal", "Credit Committee Portal", "Loan Officer Portal", "Teller Operations Portal", "Customer Savings Portal"],
        departments: ["Executive Directorate", "Credit & Risk Management", "Operations & Branches Directorate", "Finance & Treasury Department", "Compliance & AML Unit", "Internal Audit"],
        modules: ["Customer Member Directory", "Savings & Deposit Ledger", "Loan Lifecycle Engine", "Credit Scoring Auditor", "FAAP General Ledger Integration", "Regulatory Compliance Reporting", "Sovereign Audit Ledger Logs"],
        layers: ["Board of Directors Oversight", "Microfinance Core Operations", "National Branch Network", "Customer Mobile Portal Layer"],
        branches: ["National Microfinance HQ", "Central City Branch", "Northern Agricultural Branch", "Eastern Commerce Branch", "Western Frontier Branch"],
        workflows: ["Loan Underwriting Approval Path", "Member Registration Approval Route", "Vault Cash Balance Limit Override", "Fixed Deposit Settlement Workflow"]
      },
      {
        id: "sacco-erp",
        ecosystemId: "finance-microfinance-erp",
        name: "SACCO & Savings Cooperative ERP",
        description: "Member savings, share capital, dividend, and cooperative loan platform.",
        portals: ["SACCO Chairman Portal", "Credit Committee Portal", "Cooperative Manager Portal", "Member Portal"],
        departments: ["SACCO Executive Board", "Cooperative Secretariat", "Savings & Credit Unit", "Member Welfare & Education Committee"],
        modules: ["Member Registry & Shares Ledger", "Savings Accounts & Welfare Fund", "Cooperative Loan Calculator", "Dividend Distribution Engine", "FAAP Cashier Settlement Node"],
        layers: ["Cooperative Governance", "Management Operations", "Member Services Core"],
        components: ["Share Ledger Matrix", "Cooperative Loan Queue", "Dividend Calculation Panel", "Member Saving Statement"],
        branches: ["SACCO Headquarters", "Metropolitan Branch Office", "Upcountry Farming Hub"],
        workflows: ["Member Admission Approval Path", "SACCO Loan Guarantee Sign-off", "Welfare Fund Disbursement Workflow"]
      },
      {
        id: "credit-union-erp",
        ecosystemId: "finance-microfinance-erp",
        name: "Credit Union Platform ERP",
        description: "Community credit union savings, lending, and investment manager.",
        portals: ["Credit Union Executive Portal", "Credit Committee Portal", "Compliance Portal", "Member Portal"],
        departments: ["Union Leadership Committee", "Credit Assessment Section", "Treasury & Finance Directorate", "Compliance Office"],
        modules: ["Member Savings Portfolio", "Credit Assessment Node", "Liquidity & Investment Control", "General Ledger Accounting", "Union Audit Logs"],
        layers: ["Union Governance", "Lending & Investment Operations", "Community Branch Hubs"],
        components: ["Portfolio Allocation Chart", "Credit Assessment Grid", "Union Transaction Table", "Audit Ledger Console"],
        branches: ["National Credit Union HQ", "Downtown Branch Hub", "Suburban Member Annex"],
        workflows: ["Credit Limit Extension Approval", "Investment Allocation Review Route", "Compliance Audit Release Workflow"]
      },

      // 4. HEALTHCARE ECOSYSTEM TEMPLATES
      {
        id: "hospital-erp",
        ecosystemId: "healthcare-erp",
        name: "National Referral Hospital ERP",
        description: "Advanced medical center and clinical operations management with digital patient records.",
        portals: ["Medical Director Portal", "Consultant Clinician Portal", "Chief Pharmacist Portal", "Ward Nurse Portal", "Billing & Insurance Portal", "Patient Health Portal"],
        departments: ["Medical Directorate", "Clinical Services Department", "Nursing Services Division", "Pharmacy & Diagnostics Directorate", "Finance & Cashier Office", "ICT & Records Agency", "Inpatient Ward Administration"],
        modules: ["Patient Identity & Biometrics", "Electronic Health Records (EHR)", "Clinical Order Entries", "Pharmacy & Dispensing Control", "Laboratory Information Node", "Ward Admission & Scheduling", "Healthcare FAAP Financial Billing", "Medical Insurance & Claims Engine"],
        layers: ["Hospital Governance Board", "Clinical Operations Core", "Ward & Intensive Care Layer", "Patient Services Interface"],
        branches: ["National Referral Hospital HQ", "Capital City Outpatient Wing", "Northern Referral Branch", "Western Clinical Center"],
        workflows: ["Inpatient Bed Assignment Route", "Emergency Drug Requisition Workflow", "Surgical Clearance Approval Track", "Medical Insurance Claim Approval"]
      },
      {
        id: "clinic-erp",
        ecosystemId: "healthcare-erp",
        name: "Regional Medical Clinic ERP",
        description: "Outpatient clinic, primary healthcare facility, or regional clinic manager.",
        portals: ["Clinic Manager Portal", "Doctor & Nurse Portal", "Pharmacy Counter Portal", "Billing Portal"],
        departments: ["Clinic Directorate", "Outpatient Ward Office", "Pharmacy Section", "Accounts & Reception Office"],
        modules: ["Outpatient Patient Database", "Clinical Notes & Diagnosis", "Pharmacy Inventory & OTC Billing", "Cash & Mobile Payment Node", "Laboratory Quick Tests"],
        layers: ["Clinic Management Core", "Primary Patient Services", "Local Operations Wing"],
        components: ["Outpatient Queue Manager", "Diagnosis Entry Sheet", "Pharmacy Inventory Grid", "Quick Bills Table"],
        branches: ["Clinic Central Office", "Eastside Outreach Outpost", "Westside Mobile Clinic Hub"],
        workflows: ["Patient Admission Verification", "Diagnostic Order Release", "Billing Settlement Approval"]
      },
      {
        id: "health-network-erp",
        ecosystemId: "healthcare-erp",
        name: "Public Health Network ERP",
        description: "National health service, county health network, or hospital network coordinator.",
        portals: ["Health Director Portal", "Epidemiology Monitor Portal", "Logistics Portal", "Clinic Coordinator Portal"],
        departments: ["Public Health Directorate", "Epidemiology & Research Unit", "Medical Logistics Department", "Regional Clinic Liaison Directorate"],
        modules: ["Network Patient Master Registry", "Disease Surveillance & Alerts", "Medical Supply Chain Logistics", "Public Health Program Reports", "Network Infrastructure Audit"],
        layers: ["National Health Governance", "Health Logistics Operations", "Epidemiological Surveillance Network"],
        components: ["Network Clinic Registry Table", "Disease Heatmap Chart", "Logistics Delivery Map", "SLA Performance Console"],
        branches: ["Ministry of Health HQ", "Northern Health District Center", "Eastern Health District Center", "Western Health District Center"],
        workflows: ["Emergency Logistics Dispatch Path", "Vaccine Allocation Approval Route", "Network Facility Audit Certification"]
      },

      // 5. AGRICULTURE ECOSYSTEM TEMPLATES
      {
        id: "cooperative-erp",
        ecosystemId: "agriculture-erp",
        name: "Farmer Cooperative ERP",
        description: "Farmer registration, crop collection, cooperative warehouse, and financial disbursement platform.",
        portals: ["Cooperative Manager Portal", "Warehouse Storekeeper Portal", "Cooperative Agronomist Portal", "Farmer Member Portal"],
        departments: ["Cooperative Executive Committee", "Operations & Storekeeping Directorate", "Agronomy & Quality Office", "Accounts & Finance Division"],
        modules: ["Farmer Biometric Database", "Crop Collection & Weighing System", "Cooperative Warehouse Inventory", "Input Fertilizer Distribution", "FAAP Farmer Payments Clearing", "Cooperative Sacco Services", "Sovereign Audit Ledger Logs"],
        layers: ["Cooperative Governance Board", "Agricultural Operations Core", "Regional Storage Warehouses", "Farmer Services Interface"],
        branches: ["Cooperative Headquarters", "Central Storage Depot", "Northern Collection Depot", "Eastern Collection Depot", "Western Input Depot"],
        workflows: ["Crop Quality Clearance Workflow", "Farmer Payment Authorization Path", "Fertilizer Subsidy Allocation", "Warehouse Stock Audit Route"]
      },
      {
        id: "agribusiness-erp",
        ecosystemId: "agriculture-erp",
        name: "Agribusiness Enterprise ERP",
        description: "Commercial farming, agricultural processing, and trade operations system.",
        portals: ["Agribusiness Director Portal", "Agronomist Portal", "Processing Manager Portal", "Sales Portal"],
        departments: ["Agribusiness Directorate", "Crop Production Division", "Processing & Packaging Unit", "Sales & Distribution Directorate"],
        modules: ["Field Cultivation & Yield Tracker", "Processing Plant Operations", "Packaging & Quality Control", "Commercial Sales Ledger", "Machinery Capex Control"],
        layers: ["Agribusiness Governance", "Production & Processing", "Commercial Sales Network"],
        components: ["Cultivation Calendar Node", "Processing Plant Monitor", "Product Quality Sheet", "Sales Order Table"],
        branches: ["Agribusiness HQ", "Farming Estate North", "Processing Factory East", "Logistics Hub Capital"],
        workflows: ["Harvest Delivery Verification", "Processing Batch Approval Path", "Bulk Sales Release Workflow"]
      },
      {
        id: "supply-chain-erp",
        ecosystemId: "agriculture-erp",
        name: "Agricultural Supply Chain & Tracing ERP",
        description: "Traceability system from seed to shelf with international certification logging.",
        portals: ["Chain Administrator Portal", "Quality Inspector Portal", "Logistics Coordinator Portal", "Exporter Portal"],
        departments: ["Supply Chain Directorate", "Quality Assurance Department", "Logistics & Fleet Operations", "Export Compliance Office"],
        modules: ["Batch Traceability Registry", "Organic & Quality Certification Node", "Fleet Dispatcher & Transit Map", "Export Customs Documents", "Supply Chain Analytics"],
        layers: ["National Agriculture Registry", "Logistics & Traceability Core", "Export & Compliance Network"],
        components: ["Traceability Blockchain Table", "Inspector Assessment Sheet", "Fleet Transit Router", "Export Document Console"],
        branches: ["Supply Chain Authority HQ", "Air Cargo Export Center", "Maritime Port Transit Station"],
        workflows: ["Organic Certificate Verification Path", "Batch Quarantine Escalation", "Export Clearance Sign-off"]
      },

      // 6. COMMERCE ECOSYSTEM TEMPLATES
      {
        id: "wholesale-erp",
        ecosystemId: "commerce-erp",
        name: "Wholesale Distribution ERP",
        description: "National-grade wholesale operations, bulk inventory control, and distribution network manager.",
        portals: ["Wholesale Manager Portal", "Warehouse Dispatch Portal", "Sales Agent Portal", "Buyer Portal"],
        departments: ["Wholesale Operations Office", "Warehouse Management Division", "Sales & Marketing Directorate", "Accounts & Finance Department"],
        modules: ["Bulk Inventory Architecture", "Warehouse Rack & Bin Management", "Sales Agent Lead Registry", "FAAP Wholesale Billing System", "Logistics Fleet Dispatcher"],
        layers: ["Commerce Governance Board", "Wholesale Distribution Core", "Regional Storage Warehouses"],
        components: ["Bulk Inventory Grid", "Rack Assigner Map", "Agent Commission Panel", "Dispatch Order Console"],
        branches: ["Wholesale HQ Depot", "Northern Regional Warehouse", "Eastern Regional Warehouse", "Western Regional Warehouse"],
        workflows: ["Bulk Order Discount Approval", "Logistics Vehicle Dispatch Route", "Inventory Audit Clearance Path"]
      },
      {
        id: "retail-chain-erp",
        ecosystemId: "commerce-erp",
        name: "Retail Chain Enterprise ERP",
        description: "Centralized product management, franchise network control, and store replenishment manager.",
        portals: ["Retail Director Portal", "Store Manager Portal", "Procurement Desk Portal", "Franchise Partner Portal"],
        departments: ["Retail Operations Directorate", "Procurement & Sourcing Division", "Franchise Support Office", "Finance & Auditing Department"],
        modules: ["Centralized Product Catalog", "Store Replenishment Coordinator", "Franchise Agreement Registry", "Corporate general Ledger", "Audit & Price Control"],
        layers: ["Corporate Governance Core", "Franchise Operations Network", "Supply Chain Delivery Hub"],
        components: ["Replenishment Forecast Sheet", "Price Matrix Configurator", "Franchise Fee Auditor", "Retail Performance Dashboard"],
        branches: ["Retail Corporate HQ", "Main City Flagship Store", "Northern Franchise Branch", "Eastern Franchise Branch"],
        workflows: ["Store Stock Requisition Pathway", "Retail Price Revision Approval", "Franchise Settlement Authorization"]
      },
      {
        id: "supermarket-erp",
        ecosystemId: "commerce-erp",
        name: "Supermarket Group ERP",
        description: "Point of Sale (POS) backend, shelf stocking, fresh produce lifecycle, and checkout manager.",
        portals: ["Supermarket General Manager Portal", "Head Cashier Portal", "Stock Coordinator Portal", "Supplier Portal"],
        departments: ["Supermarket Executive Office", "Checkout & Cashier Directorate", "Floor Stocking & Fresh Produce Unit", "Procurement & Supplier Office"],
        modules: ["Point of Sale (POS) Backend Server", "Shelf Inventory Tracker", "Produce Expiry Monitor", "Supplier Requisitions Manager", "FAAP Retail Cash Clearing"],
        layers: ["Supermarket Operations", "Checkout & Cashier Service Network", "Supplier Integration Hub"],
        components: ["POS Transaction Logger", "Shelf Stock Level Grid", "Produce Expiry Alert Panel", "Supplier Delivery Board"],
        branches: ["Supermarket Corporate HQ", "Supermarket Branch 1 (Central)", "Supermarket Branch 2 (North)", "Supermarket Branch 3 (East)"],
        workflows: ["Supplier Invoice Clearance Route", "POS Cash Limit Override Approval", "Produce Disposal Verification Path"]
      },

      // 7. ENTERPRISE ECOSYSTEM TEMPLATES
      {
        id: "corporate-erp",
        ecosystemId: "enterprise-company-erp",
        name: "Corporate Enterprise ERP",
        description: "Professional services, corporate human resources, project accounting, and CRM.",
        portals: ["Sovereign Executive Board Portal", "Human Resources Portal", "Project Manager Portal", "Sales Director Portal", "Finance Portal"],
        departments: ["Executive Board Office", "Human Resource Directorate", "Project Management Division", "Sales & Marketing Department", "Finance & Accounts Office"],
        modules: ["Employee Lifecycle Registry", "Project Architecture & WBS", "Customer Relations (CRM) Engine", "FAAP Financial Payroll System", "Corporate Asset Controller"],
        layers: ["Board of Directors Oversight", "Corporate Operations Core", "Regional Holding Subsidiaries"],
        components: ["Employee Biometric Profile", "Project Gantt Chart Console", "CRM Pipeline Funnel Panel", "Payroll Balance ledger"],
        branches: ["Corporate HQ Capital", "Subsidiary North Office", "Subsidiary East Office", "Regional Sales Annex"],
        workflows: ["Employee Recruitment Route", "Project Budget Limit approval", "Sales Contract Clearance Path", "Payroll Disbursement Workflow"]
      },
      {
        id: "service-company-erp",
        ecosystemId: "enterprise-company-erp",
        name: "Professional Service Company ERP",
        description: "Consultancy, law practice, or accounting firm timesheet, project, and client billing system.",
        portals: ["Partner-in-Charge Portal", "Senior Consultant Portal", "Accounts Portal", "Client Portal"],
        departments: ["Executive Partners Committee", "Professional Consulting Division", "Accounts & Billing Department", "Client Relations Desk"],
        modules: ["Consultant Timesheet Tracker", "Project Milestone Deliverables", "Client Billable Hours Calculator", "FAAP Invoice Settlement Node", "Resource Allocation Planner"],
        layers: ["Partners Advisory Board", "Consulting Operations Core", "Client Interaction Interface"],
        components: ["Timesheet Submission Sheet", "Milestone Target Matrix", "Billing Hour Calculation Grid", "Client Invoice Board"],
        branches: ["Consultancy HQ Office", "Metropolitan Service Node", "Offshore Advisory Annex"],
        workflows: ["Timesheet Verification Workflow", "Invoice Release Sign-off", "Client Contract Onboarding Path"]
      },
      {
        id: "manufacturing-erp",
        ecosystemId: "enterprise-company-erp",
        name: "Manufacturing Enterprise ERP",
        description: "Bill of Materials (BOM), production floor, machine maintenance, and supply operations.",
        portals: ["Factory Manager Portal", "Production Supervisor Portal", "Procurement Desk Portal", "Logistics Dispatch Portal"],
        departments: ["Factory Directorate Office", "Production Floor Division", "Material Sourcing & Procurement Office", "Maintenance & Machine Operations Unit"],
        modules: ["Bill of Materials (BOM) Configurator", "Production Job Router", "Machine Maintenance Schedule", "Material Requisition Planner", "FAAP Industrial General Ledger"],
        layers: ["Manufacturing Core Oversight", "Production Line Operations", "Logistics & supply Chain Network"],
        components: ["BOM Configurator Panel", "Job Route Dispatch Grid", "Machine Maintenance Board", "Material Sourcing Matrix"],
        branches: ["Manufacturing Group HQ", "Assembly Plant Capital", "Packaging & Casting Plant East", "Metropolitan Logistics Depot"],
        workflows: ["Production Batch Initiation Pathway", "Machine Maintenance Shutdown Approval", "Material Purchasing Requisition Path"]
      },

      // 8. COMMUNITY ECOSYSTEM TEMPLATES
      {
        id: "cultural-erp",
        ecosystemId: "community-cultural-erp",
        name: "Cultural Institution ERP",
        description: "Cultural kingdom, clan association, or heritage trust governance and archive platform.",
        portals: ["Sovereign Leader Portal", "Prime Minister Portal", "Heritage Archives Portal", "Community Welfare Portal"],
        departments: ["Sovereign Office", "Prime Minister's Secretariat", "Heritage & History Directorate", "Welfare & Social Support Committee"],
        modules: ["Clan Registry & Heritage Tree", "Heritage Archives Digitization", "Community Welfare Funds", "Cultural Events Scheduler", "Sovereign Audit Ledger Logs"],
        layers: ["Sovereign Cultural Governance", "Heritage Preservation Core", "Regional Community Chapters"],
        components: ["Heritage Scroll Registry", "Welfare Application Grid", "Community Contribution Ledger", "Audit Ledger Console"],
        branches: ["Sovereign Cultural Palace HQ", "Northern Kingdom Center", "Eastern Kingdom Center", "Western Kingdom Center"],
        workflows: ["Heritage Record Verification Path", "Welfare Grant Disbursement Approval", "Event Permit Approval Route"]
      },
      {
        id: "religious-erp",
        ecosystemId: "community-cultural-erp",
        name: "Religious Organization ERP",
        description: "National church network, diocese, cathedral, or religious foundation manager.",
        portals: ["Bishop/Sheik Portal", "Parish Pastor Portal", "Treasury Portal", "Congregation Portal"],
        departments: ["National Secretariat", "Parish Operations Division", "Donations & Treasury Office", "Community Outreach Outreach Department"],
        modules: ["Congregation Member Directory", "Donations & Sanctuary Funds Tracking", "Outreach Program Manager", "FAAP Sanctuary Fund Settlement", "Religious Assets Registry"],
        layers: ["Diocese Governance Synod", "Parish Administrative Operations", "Community Welfare Service Network"],
        components: ["Member Contribution Table", "Sanctuary Fund Grid", "Outreach Event Dispatch Console", "Asset Registry List"],
        branches: ["National Cathedral Headquarters", "Northern Parish Chapter", "Eastern Parish Chapter", "Western Parish Chapter"],
        workflows: ["Missions Outreach Requisition Path", "Diocese Expense Sign-off Path", "Outreach Materials Clearance Route"]
      },
      {
        id: "clan-erp",
        ecosystemId: "community-cultural-erp",
        name: "Clan & Family Association ERP",
        description: "Genealogical registration, land heritage trust, and mutual aid community manager.",
        portals: ["Clan Head Portal", "Council of Elders Portal", "Welfare Desk Portal", "Member Portal"],
        departments: ["Office of Clan Head", "Council of Elders Secretariat", "Mutual Aid Welfare Section", "Land Trust Advisory Office"],
        modules: ["Genealogical Tree Database", "Land Heritage Trust Registry", "Mutual Aid Contribution Node", "Council Resolution Registry", "Member Identification Registrar"],
        layers: ["Clan Assembly Board", "Sovereign Heritage Trust Operations", "Community Liaison Chapters"],
        components: ["Genealogical Tree Connector", "Land Heritage Trust Grid", "Aid Ledger Table", "Resolution Record Console"],
        branches: ["Central Clan Seat Palace", "Regional Chapter North", "Regional Chapter East", "Regional Chapter West"],
        workflows: ["Genealogical Verification Approval Path", "Heritage Land Trust Transfer Route", "Aid Fund Clearance Workflow"]
      },

      // 9. ALUMNI ECOSYSTEM TEMPLATES
      {
        id: "alumni-network-erp",
        ecosystemId: "alumni-endowment-erp",
        name: "Alumni Network ERP",
        description: "University or college alumni engagement, convention registry, and donor records platform.",
        portals: ["Alumni President Portal", "Chapter Chairperson Portal", "Finance & Donations Portal", "Alumni Member Portal"],
        departments: ["Alumni Association Board", "Regional Chapters Directorate", "Donation & Capital Campaign Office", "Events & Public Relations Unit"],
        modules: ["Alumni Registry Database", "Chapter Activity Coordinator", "Donation & Contributions Engine", "Convention & Ticket Registry", "Alumni Welfare Portfolio"],
        layers: ["National Alumni Association Oversight", "Chapter Operational Network", "Alumni Services Hub"],
        components: ["Alumni Member Grid", "Donation Progress Tracker", "Convention Registration Panel", "Welfare Disbursement Sheet"],
        branches: ["Central Alumni HQ Office", "Metropolitan Alumni Chapter", "North Regional Chapter", "East Regional Chapter"],
        workflows: ["Alumni Admission Verification Path", "Welfare Grant Allocation Route", "Convention Expense Requisition Path"]
      },
      {
        id: "endowment-erp",
        ecosystemId: "alumni-endowment-erp",
        name: "Endowment Fund ERP",
        description: "Capital endowment asset allocation, compound portfolio auditing, and scholarship clearing platform.",
        portals: ["Endowment Board Chairman Portal", "Fund Investment Manager Portal", "Scholarship Grants Coordinator Portal", "Auditor Portal"],
        departments: ["Board of Trustees Secretariat", "Capital Investment Division", "Scholarship & Grants Disbursement Directorate", "Internal Audit & Compliance"],
        modules: ["Endowment Asset Registry", "Investment Allocation & Portfolio Engine", "Scholarship Grant Allocation Node", "FAAP Fund Disbursement clearing", "Sovereign Compliance Monitor"],
        layers: ["Board of Trustees Oversight", "Capital Operations Core", "Grant Disbursement Network"],
        components: ["Endowment Asset Allocation Chart", "Investment Portfolio Sheet", "Grant Recipient Grid", "Audit Ledger Console"],
        branches: ["Endowment Fund Headquarters", "Capital Investment Branch Office", "Offshore Fund Advisory Center"],
        workflows: ["Capital Allocation Authorization Path", "Scholarship Award Sign-off Pathway", "Auditor Certification Release Workflow"]
      },
      {
        id: "foundation-erp",
        ecosystemId: "alumni-endowment-erp",
        name: "Institutional Foundation ERP",
        description: "Capital campaigns, foundation operations, donor reporting, and grant tracking manager.",
        portals: ["Foundation Director Portal", "Grant Coordinator Portal", "Donor Portal", "Auditor Portal"],
        departments: ["Foundation Directorate", "Grant Allocation Division", "Donor Relations Department", "Auditing & Compliance Unit"],
        modules: ["Donor Master Database", "Grant Allocation Registry", "Campaign Fundraising Tracker", "General Ledger Settlement Node", "Audit Trail System"],
        layers: ["Foundation Trust Governance", "Operations & Grant Administration", "Donor Support Interface"],
        components: ["Donor Contribution Matrix", "Grant Allocation Grid", "Campaign Goal Progress Bar", "Audit Log Viewer"],
        branches: ["Institutional Foundation HQ", "City Outreach Office", "International Donor Liaison Center"],
        workflows: ["Grant Clearance Pathway", "Campaign Funds Allocation Approval", "Donor Audit Release Certification"]
      },

      // 10. HOSPITALITY ECOSYSTEM TEMPLATES
      {
        id: "hotel-erp",
        ecosystemId: "hospitality-erp",
        name: "Hotel & Resort Group ERP",
        description: "Front desk booking, culinary menu planner, banquet sales, room settlement, and housekeeping manager.",
        portals: ["Resort General Manager Portal", "Front Desk Reception Portal", "Executive Chef Kitchen Portal", "Banquet Sales Coordinator Portal", "Housekeeping Operations Portal"],
        departments: ["Resort Executive Management", "Front Desk Reception Division", "Culinary Operations & Kitchen", "Banquet & Events Directorate", "Housekeeping & Laundry Unit", "Finance & Cashier Office"],
        modules: ["Room Reservation Registry", "Culinary Menu Sourcing Planner", "Banquet & Event Venue Booker", "Housekeeping Room Tracker", "FAAP Room Settlement Ledger", "Kitchen Sourcing Logistics Manager"],
        layers: ["Hospitality Governance Board", "Resort Operations Core", "Guest Services Delivery Network"],
        branches: ["Hospitality Group HQ Office", "Sovereign Luxury Resort (HQ Branch)", "Metropolitan City Hotel Branch", "Eastern Beach Hotel Branch", "Western Wildlife Lodge Branch"],
        workflows: ["VIP Booking Special Discount Approval", "Banquet Contract Price Approval Path", "Housekeeping Room Release Route", "Culinary Inventory Capex Requisition"]
      },
      {
        id: "restaurant-group-erp",
        ecosystemId: "hospitality-erp",
        name: "Restaurant Group ERP",
        description: "Point of Sale (POS) console, central recipe index, kitchen display system, and procurement organizer.",
        portals: ["Restaurant Group Director Portal", "Branch Manager Portal", "Kitchen Chef Portal", "Procurement Desk Portal"],
        departments: ["Restaurant Group Executive Office", "Branch Operations Division", "Kitchen & Culinary Unit", "Procurement & Sourcing Section"],
        modules: ["POS Sales Backend Integration", "Centralized Recipe Index", "Kitchen Display Queue (KDS)", "Ingredient Sourcing Requisitioner", "FAAP Cash Settlement ledger"],
        layers: ["Group Brand Governance", "Kitchen Production Operations", "Supply Chain Sourcing Hub"],
        components: ["Sales Analytics Chart", "Recipe Ingredient Cost Sheet", "Kitchen Queue Grid", "Ingredient Procurement Table"],
        branches: ["Restaurant Group HQ Office", "Central City Diner (Branch 1)", "Northside Cafe (Branch 2)", "Eastside Bistro (Branch 3)"],
        workflows: ["Bulk Sourcing Order Approval Route", "Recipe Cost Allocation Revision Pathway", "POS Override Action Approval"]
      },
      {
        id: "tourism-erp",
        ecosystemId: "hospitality-erp",
        name: "Tourism & Leisure Group ERP",
        description: "Fleet booking, tour guide catalog, regional activity reservation, and dispatch coordinator.",
        portals: ["Tourism General Manager Portal", "Tour Dispatcher Portal", "Tour Guide Portal", "Finance Portal"],
        departments: ["Tourism Group Directorate", "Tour Logistics & Fleet Division", "Guide Liaison & Welfare Section", "Finance & Outbound Payments Office"],
        modules: ["Tour Package Reservation Registry", "Transport Fleet Booking Hub", "Guide Catalog & Assignment Node", "FAAP Outbound Payment Settlement", "Fleet Maintenance Ledger"],
        layers: ["Group Tour Governance", "Logistics & Tour Operations Core", "Guide & Client Services Network"],
        components: ["Reservation Record Matrix", "Fleet Vehicle Status Board", "Guide Assignment Grid", "Settlement Payment Table"],
        branches: ["Tourism Group Headquarters", "Airport Reception Desk Annex", "National Park Safari Office"],
        workflows: ["Tour Route Security Verification Path", "Fleet Emergency Capex Requisition", "Guide Payment Authorization Workflow"]
      },

      // 11. LEGAL ECOSYSTEM TEMPLATES
      {
        id: "law-firm-erp",
        ecosystemId: "legal-case-management-erp",
        name: "Law Firm ERP",
        description: "Legal practice manager, client case management, document archival, billable hours, and escrow.",
        portals: ["Managing Partner Portal", "Consultant Lawyer Portal", "Accounts & Billing Portal", "Client Portal"],
        departments: ["Managing Partners Committee", "Legal Consulting Directorate", "Accounts & Escrow Division", "Practice Administration Unit"],
        modules: ["Client Litigations Database", "Escrow & Trust Financial Accounts", "Lawyer Billable Hour Timesheet", "FAAP Legal Invoicing Server", "Corporate Legal Documents Registry"],
        layers: ["Partners Governance Core", "Legal Operations Directorate", "Client Interaction Interface"],
        components: ["Litigation Case Grid", "Escrow Transaction Sheet", "Timesheet Hour Entry Panel", "Invoice Settlement Board"],
        branches: ["Law Firm HQ Capital", "Metropolitan Branch Office", "Offshore Jurisdictional Office"],
        workflows: ["Client Intake KYC Verification Route", "Escrow Account Settlement Approval Pathway", "Legal Document Clearance Workflow"]
      },
      {
        id: "court-erp",
        ecosystemId: "legal-case-management-erp",
        name: "Judicial Court ERP",
        description: "Court registrar, judge case allocators, docket schedule planners, and public legal registries.",
        portals: ["Chief Registrar Portal", "Presiding Judge Portal", "Clerk of Court Portal", "Public Case Portal"],
        departments: ["Office of Chief Registrar", "Judges Chambers Division", "Clerk of Court Docket Office", "Public Case Registry Unit"],
        modules: ["Case Docket Registration Database", "Judge Assignment Algorithmic Router", "Hearing Schedule Docket Planner", "Fines & Payments Accounts Registry", "Public Case Files Archival Server"],
        layers: ["Judicial Governance Synod", "Court Management Operations Core", "Public Legal Services Interface"],
        components: ["Case Docket Registry Table", "Judge Allocation Queue", "Hearing Schedule Grid", "Fines Balance Sheet"],
        branches: ["Sovereign High Court HQ", "Regional Court North Division", "Regional Court East Division", "Regional Court West Division"],
        workflows: ["Case Filing Admission Path", "Judge Recusal Reassignment Route", "Docket Emergency Reschedule Workflow"]
      },
      {
        id: "legal-aid-erp",
        ecosystemId: "legal-case-management-erp",
        name: "Legal Aid & Registry ERP",
        description: "Sovereign legal aid services, public defender registries, and beneficiary outreach trackers.",
        portals: ["Director of Legal Aid Portal", "Public Defender Portal", "Welfare Desk Portal", "Client Aid Portal"],
        departments: ["Legal Aid Directorate", "Public Defenders Section", "Client Welfare Outreach Office", "Finance & Grants Office"],
        modules: ["Client Aid Master Database", "Public Defender Case Registry", "Beneficiary Outreach Coordinator", "FAAP Grant Disbursement Clearing", "Audit Trail System"],
        layers: ["Aid Agency Governance Synod", "Defenders Case Management Operations", "Beneficiary Support Interface"],
        components: ["Client Registry Matrix", "Defender Allocation Sheet", "Outreach Goal Progress Board", "Audit Log Viewer"],
        branches: ["National Legal Aid Agency HQ", "City Defender Annex", "Rural Outreach Liaison Office"],
        workflows: ["Aid Application Qualification Route", "Case Assignment Clearance Workflow", "Grants Allocation Review Route"]
      },

      // 12. COMMERCIAL BANKING ECOSYSTEM TEMPLATES
      {
        id: "retail-bank-erp",
        ecosystemId: "banking-erp",
        name: "Retail Banking ERP",
        description: "Retail banking core, customer savings, consumer loans, teller vault control, and swift integrations.",
        portals: ["Retail Director Portal", "Branch Teller Portal", "Consumer Loans Portal", "Customer Mobile Portal"],
        departments: ["Retail Banking Directorate", "Branch Network Operations", "Consumer Credit Assessment", "Branch Vault Control Section", "Treasury Settle Desk"],
        modules: ["Customer Savings Core Database", "Consumer Loan Calculator Node", "Teller Vault Balance Monitor", "FAAP Customer Cash Clearing", "SWIFT Gateway Integration Node"],
        layers: ["Bank Corporate Governance Synod", "Retail Banking Core Operations", "Branch Physical Service Network"],
        components: ["Customer Account Table", "Consumer Loan Assessment Sheet", "Vault Limit Grid", "SWIFT Payment Ledger"],
        branches: ["Retail Banking HQ", "Main City Center Branch", "Northern Regional Branch Hub", "Eastern Regional Branch Hub"],
        workflows: ["Account Intake Approval Pathway", "Consumer Credit Line Limit approval", "Vault Cash Allocation Request Path"]
      },
      {
        id: "commercial-bank-erp",
        ecosystemId: "banking-erp",
        name: "Commercial Bank ERP",
        description: "Corporate banking, trade finance, credit line allocation, and treasury asset auditing.",
        portals: ["Commercial Executive Portal", "Relationship Officer Portal", "Risk Management Portal", "Corporate Client Portal"],
        departments: ["Corporate Boardroom Office", "Relationship Management Directorate", "Corporate Risk Directorate", "Treasury & Asset Management Unit", "Finance & clearing Division"],
        modules: ["Corporate Client Master Directory", "Commercial Credit line Allocator", "Trade Finance LC Node", "FAAP Corporate general Ledger", "Risk & AML Tracker"],
        layers: ["Corporate Banking Board", "Risk Assessment & Core Operations", "Corporate Client Service Network"],
        components: ["Corporate Client Grid", "Credit Line Limit assessment Sheet", "Trade Finance LC Grid", "AML Alarm Dashboard"],
        branches: ["Commercial Banking Corporate HQ", "Metropolitan Corporate Center", "Port Customs Clearing Hub"],
        workflows: ["Corporate Credit Line Overhaul Path", "Trade LC Risk Clearance Workflow", "Corporate Client Onboarding Pathway"]
      },
      {
        id: "central-bank-erp",
        ecosystemId: "banking-erp",
        name: "Sovereign Central Bank ERP",
        description: "Reserve ratio tracking, monetary policy monitors, commercial bank auditing, and currency clearing.",
        portals: ["Governor Central Bank Portal", "Commercial Auditor Portal", "Monetary Operations Portal", "Treasury Vault Portal"],
        departments: ["Office of Governor Synod", "Bank Supervision Directorate", "Monetary Policy & Research Unit", "National Treasury Vault Operations", "Clearing House Section"],
        modules: ["Commercial Bank reserve Ratio Tracker", "Commercial Bank Financial Auditor Node", "Monetary Policy Indicator Tracker", "Sovereign Treasury Vault Controller", "National Clearing House Server"],
        layers: ["Sovereign Board of Governors", "Monetary Supervision Operations Core", "National Financial Settlement network"],
        components: ["Reserve Ratio Monitor Grid", "Supervision Audit Report List", "Policy Indicators Sheet", "Vault Transaction Table"],
        branches: ["Sovereign Central Bank Palace", "National Security Gold Vault Annex", "Metropolitan Settlement Annex"],
        workflows: ["Commercial Bank Audit Issue Escalation", "Reserve Ratio Deviation Notice Approval", "Vault Asset Transit Security Path"]
      },

      // 13. INSURANCE ECOSYSTEM TEMPLATES
      {
        id: "life-insurance-erp",
        ecosystemId: "insurance-erp",
        name: "Life Insurance ERP",
        description: "Policy administration, claims adjustment, underwriting engine, and brokerage portals.",
        portals: ["Life Insurance Director Portal", "Underwriter Dashboard Portal", "Claims Adjuster Portal", "Broker Portal"],
        departments: ["Life Insurance Executive Office", "Underwriting Directorate", "Claims Management Division", "Broker & Agent Network Division"],
        modules: ["Life Policy Registry Database", "Underwriting Assessment Engine", "Claims Validation & Review Node", "FAAP Insurance Reserve ledger", "Broker Commissions Recorder"],
        layers: ["Corporate Board of Directors", "Insurance Underwriting Operations", "Broker Distribution Network"],
        components: ["Policy Ledger Table", "Underwriting Risk Assigner Grid", "Claim Investigation Panel", "Commission Sheet"],
        branches: ["Life Insurance Corporate HQ", "Main City Broker Annex", "Northern Regional Broker Branch"],
        workflows: ["Policy Issuance Approval Pathway", "Critical Claim Escalation Pathway", "Broker Commission Settlement Route"]
      },
      {
        id: "health-insurance-erp",
        ecosystemId: "insurance-erp",
        name: "Health Insurance ERP",
        description: "Provider networks, medical claims coding, billing limits, and patient clearance hubs.",
        portals: ["Health Insurance Director Portal", "Provider Liaison Portal", "Medical Adjuster Portal", "Patient Portal"],
        departments: ["Health Insurance Directorate", "Hospital Provider Network Office", "Medical Claim Auditing Unit", "Accounts & Settle Office"],
        modules: ["Provider Hospital Directory", "Medical Claim Coding (ICD) Validator", "Provider Billing Limits Monitor", "FAAP Hospital Settlement Server", "Patient Health Policy Database"],
        layers: ["Health Insurance Operations Core", "Hospital Service Provider Network", "Member Support Interface"],
        components: ["Hospital Provider List Table", "ICD Code Claim validation Sheet", "Billing Limit Tracker Panel", "Patient Invoice Board"],
        branches: ["Health Insurance HQ Office", "Clinical Liaison Station 1", "Clinical Liaison Station 2"],
        workflows: ["Hospital Invoice Verification Route", "Claim Deviation Auditor Referral", "Patient Enrollment Route"]
      },
      {
        id: "general-insurance-erp",
        ecosystemId: "insurance-erp",
        name: "General Property & Casualty Insurance ERP",
        description: "Asset risk valuations, incident inspections, premium calculators, and adjuster logs.",
        portals: ["General Insurance Director Portal", "Inspection Officer Portal", "Adjuster Portal", "Client Portal"],
        departments: ["General Insurance Directorate", "Risk Inspection Division", "Property Adjusters Section", "Claims Outbound Settle Desk"],
        modules: ["Asset Risk Valuation Database", "Incident Inspector Dispatch Node", "Premium Calculator Engine", "FAAP Outbound Claim Settler", "Fleet & Cargo Insurance Node"],
        layers: ["General Insurance Board", "Property Inspection & Adjustment Core", "Logistics Delivery Hub"],
        components: ["Asset Value Evaluation Matrix", "Incident Dispatch Board", "Premium Configurator Panel", "Settlement Payments Table"],
        branches: ["General Insurance HQ", "Maritime Port Cargo Hub Office", "Metropolitan Car Claim Depot"],
        workflows: ["Asset Risk Verification Path", "Incident Claim Settlement Sign-off", "Inspector Field Action Dispatch Path"]
      },

      // 14. NGO & FOUNDATION ECOSYSTEM TEMPLATES
      {
        id: "ngo-national-erp",
        ecosystemId: "ngo-erp",
        name: "National NGO ERP",
        description: "Grant management, donor reporting, project tracking, and volunteer coordinators for non-profits.",
        portals: ["Executive Director Portal", "Grant Manager Portal", "Project Coordinator Portal", "Volunteer Portal"],
        departments: ["Executive Directorate Secretariat", "Grant & Donor Relations Division", "Project Implementation Directorate", "Volunteer Liaison & HR Office", "Finance Office"],
        modules: ["Grant Allocation Registry Database", "Donor Report Composer Node", "Project Milestones Monitor", "Volunteer Dispatch Coordinator", "FAAP Development Budget Ledger"],
        layers: ["NGO Board of Trustees Synod", "Development Program Operations Core", "Field Implementation Hubs"],
        components: ["Grant Allocation Matrix", "Donor Reporting Table", "Project Milestones Grid", "Volunteer Dispatch Panel"],
        branches: ["National NGO HQ", "Northern Field Action Station", "Eastern Field Action Station", "Western Field Action Station"],
        workflows: ["Grant Clearance Pathway", "Project Budget Relocation Approval", "Volunteer Dispatch Action Path"]
      },
      {
        id: "international-ngo-erp",
        ecosystemId: "ngo-erp",
        name: "International NGO ERP",
        description: "Multi-country charity networks, currency hedge accounts, and international compliance auditing.",
        portals: ["Country Director Portal", "HQ Grant Monitor Portal", "Logistics Portal", "Compliance Portal"],
        departments: ["Country Director Secretariat", "International Grant Audit Section", "Logistics & Fleet Operations", "International Compliance Office"],
        modules: ["Multi-Country Grant Database", "Hedge Account Ledger Node", "Fleet Dispatcher & Transit Map", "Compliance Customs Documents", "NGO Program Analytics"],
        layers: ["International Oversight Synod", "Logistics & Grant Operations", "International Compliance Network"],
        components: ["Grant Blockchain Ledger", "Hedge Fund Allocation Grid", "Fleet Router Panel", "Compliance Document Console"],
        branches: ["International NGO Global HQ", "Country Office Capital", "Regional Border Transit Office"],
        workflows: ["Compliance Certificate Validation Path", "Grant Discrepancy Escalation Route", "Export Materials Clearance Path"]
      },
      {
        id: "charity-trust-erp",
        ecosystemId: "ngo-erp",
        name: "Charitable Trust ERP",
        description: "Legacy trust capital allocation, asset manager, and scholarship clearing platform.",
        portals: ["Trustee Board Chairman Portal", "Fund Manager Portal", "Scholarship Coordinator Portal", "Auditor Portal"],
        departments: ["Board of Trustees Secretariat", "Capital Investment Division", "Scholarship Grants Directorate", "Compliance Office"],
        modules: ["Trustee Asset Registry", "Investment Allocation Portfolio Engine", "Scholarship Allocation Node", "FAAP Trust Fund clearing", "Compliance Auditor Node"],
        layers: ["Board of Trustees Governance Synod", "Investment Operations Core", "Scholarship Support Interface"],
        components: ["Trust Asset Chart", "Fund Allocation Grid", "Scholarship Recipient Table", "Audit Log Viewer"],
        branches: ["Charitable Trust HQ", "Downtown Trust Office", "Suburban Liaison Center"],
        workflows: ["Capital Allocation Authorization Path", "Scholarship Award Sign-off Pathway", "Auditor Certification Release Workflow"]
      },

      // 15. CORE BANKING & FINANCE ECOSYSTEM TEMPLATES
      {
        id: "fintech-erp",
        ecosystemId: "finance-banking-erp",
        name: "FinTech Operations ERP",
        description: "Core e-money registers, digital transaction settling, api ledger validators, and merchant dashboards.",
        portals: ["Fintech Director Portal", "Transaction settling Desk Portal", "Compliance Auditor Portal", "Merchant Portal"],
        departments: ["FinTech Directorate", "Digital Operations Division", "Compliance & AML Office", "Merchant Services Division", "Finance Directorate"],
        modules: ["Digital Wallet Ledger Core", "Payment Settlement Gateway Node", "API Ledger transaction Validator", "Merchant Settlement Accountant", "FAAP Centralized Cash Repository"],
        layers: ["FinTech Board of Directors Synod", "Digital Core Processing Engine", "Merchant Service Portal Interface"],
        components: ["Wallet Balances Table", "Payment Transaction Queue", "API Ledger Audit Sheet", "Merchant Settlement Grid"],
        branches: ["FinTech Corporate HQ", "Digital Processing Engine Node 1", "Backup Operations Center Node 2"],
        workflows: ["Merchant Settlement Release Path", "AML High-Value Transaction Alert Path", "API Endpoint Configuration Approval"]
      },
      {
        id: "investment-bank-erp",
        ecosystemId: "finance-banking-erp",
        name: "Investment Banking ERP",
        description: "Capital market asset allocation, compound portfolio auditing, and scholarship clearing platform.",
        portals: ["Investment Board Chairman Portal", "Fund Investment Manager Portal", "Grants Coordinator Portal", "Auditor Portal"],
        departments: ["Board of Trustees Secretariat", "Capital Investment Division", "Scholarship Grants Directorate", "Compliance Office"],
        modules: ["Asset Allocation Portfolio Engine", "Investment Portfolio Ledger", "Investment Settlement Server", "Sovereign Compliance Monitor", "Audit Trail System"],
        layers: ["Investment Board Governance Synod", "Capital Operations Core", "Investor Support Interface"],
        components: ["Asset Allocation Matrix", "Portfolio Grid", "Investment Goal Progress Bar", "Audit Log Viewer"],
        branches: ["Investment Banking HQ", "Metropolitan Financial District Branch", "Offshore Fund Advisory Center"],
        workflows: ["Capital Allocation Authorization Path", "Investment Award Sign-off Pathway", "Auditor Certification Release Workflow"]
      },
      {
        id: "payment-gateway-erp",
        ecosystemId: "finance-banking-erp",
        name: "National Payment Settlement ERP",
        description: "National payment settlement gateway, reserve accounting, and sovereign clearing core.",
        portals: ["Governor Central Bank Portal", "Commercial Auditor Portal", "Monetary Operations Portal", "Treasury Vault Portal"],
        departments: ["Office of Governor Synod", "Bank Supervision Directorate", "Monetary Policy & Research Unit", "National Treasury Vault Operations", "Clearing House Section"],
        modules: ["Commercial Bank reserve Ratio Tracker", "Commercial Bank Financial Auditor Node", "Monetary Policy Indicator Tracker", "Sovereign Treasury Vault Controller", "National Clearing House Server"],
        layers: ["Sovereign Board of Governors", "Monetary Supervision Operations Core", "National Financial Settlement network"],
        components: ["Reserve Ratio Monitor Grid", "Supervision Audit Report List", "Policy Indicators Sheet", "Vault Transaction Table"],
        branches: ["Sovereign Central Bank Palace", "National Security Gold Vault Annex", "Metropolitan Settlement Annex"],
        workflows: ["Commercial Bank Audit Issue Escalation", "Reserve Ratio Deviation Notice Approval", "Vault Asset Transit Security Path"]
      }
    ];
  }

  listTemplates() {
    return this.templates;
  }

  getTemplate(id) {
    return this.templates.find(t => t.id === id);
  }

  getTemplatesByEcosystem(ecosystemId) {
    return this.templates.filter(t => t.ecosystemId === ecosystemId);
  }

  getBlueprint(id) {
    const template = this.templates.find(t => t.id === id || t.ecosystemId === id);
    if (template) {
      return template;
    }
    return ERPBlueprintRegistry.getBlueprint(id);
  }
}

export const erpEcosystemTemplateRegistry = new ERPEcosystemTemplateRegistry();
