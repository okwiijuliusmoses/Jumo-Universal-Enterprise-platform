// JUMO UEOS — Authoritative Product Ecosystem & Domain Taxonomy Registry
// Enforces strict separation among the 3 approved top-level Product Ecosystems:
// 1. ERP Products (Institutional Operating Systems)
// 2. JUMO Commercial Platforms (Multi-tenant Digital Services & Marketplaces)
// 3. Software Programs (Standalone Applications, APIs, Tools, Agents)

export type ProductEcosystemId = 'ERP_ECOSYSTEM' | 'COMMERCIAL_PLATFORM' | 'SOFTWARE_PROGRAM';

export interface EcosystemTaxonomyNode {
  id: string;
  name: string;
  description: string;
  icon: string;
  families: ProductFamilyNode[];
}

export interface ProductFamilyNode {
  id: string;
  name: string;
  description: string;
  domains: DomainTaxonomyNode[];
}

export interface DomainTaxonomyNode {
  id: string;
  name: string;
  description: string;
  icon: string;
  defaultEcosystemName: string;
  subdomains: string[];
  productTypes: string[];
  portals: string[];
  departments: string[];
  modules: string[];
  components: string[];
  workflows: string[];
  forms: string[];
  reports: string[];
  aiCapabilities: string[];
  integrations: string[];
  dataDomains: string[];
  securityProfiles: string[];
}

export class JumoProductTaxonomyRegistry {
  private static ecosystems: Map<ProductEcosystemId, EcosystemTaxonomyNode> = new Map();
  private static domainLookup: Map<string, { ecosystemId: ProductEcosystemId; domain: DomainTaxonomyNode }> = new Map();

  static {
    this.initializeTaxonomies();
  }

  private static initializeTaxonomies() {
    // -------------------------------------------------------------------------
    // 1. ERP PRODUCTS ECOSYSTEM (Institutional & Organizational Operating Systems)
    // -------------------------------------------------------------------------
    const erpDomains: DomainTaxonomyNode[] = [
      {
        id: 'EDUCATION',
        name: 'Education & Academic Institutions',
        description: 'Primary, secondary, technical vocational institutions, and universities.',
        icon: 'graduation-cap',
        defaultEcosystemName: 'Academic Institution Management ERP',
        subdomains: ['K-12 Primary/Secondary', 'Higher Education / Universities', 'Technical & Vocational Colleges', 'Exam Boards'],
        productTypes: ['Academic ERP', 'Campus Operations Suite', 'Student Information System (SIS)'],
        portals: [
          'Student Academic Self-Service Portal', 'Teacher & Faculty Grading Workspace', 'Parental Engagement & Progress Portal',
          'Headmaster & Administrative Command Console', 'Admissions & Enrollment Hub', 'Library & Digital Repository Portal',
          'Hostel & Boarding Accommodation Management', 'Examinations & National Assessment Board Portal', 'Alumni Relations & Career Network',
          'Bursary, Tuition & Financial Ledger Portal', 'Disciplinary & Pastoral Care Registry', 'Academic Timetabling & Hall Allocation Hub'
        ],
        departments: [
          'Academic Affairs & Curriculum Directorate', 'Department of Mathematics & Computing', 'Department of Natural Sciences',
          'Department of Languages & Literature', 'Bursary & Financial Accounts Directorate', 'Examinations & Verification Office',
          'Student Welfare & Guidance Directorate', 'Campus Security & Facilities Unit'
        ],
        modules: [
          'Student Information System (SIS)', 'Academic Grading, GPA & Transcripts Engine', 'Automated Class & Exam Timetabling',
          'Continuous Assessment & Term Reporting', 'Admissions Application & Entrance Scoring', 'Student Attendance & Biometric Roll Call',
          'Bursary Invoicing, Fee Collection & FAAP Bridge', 'Library Management & RFID Book Tracking', 'Dormitory & Bed Space Allocation'
        ],
        components: [
          'Student Profile Card & Bio Data Inspector', 'Grade Matrix & Cumulative Report Card Viewer', 'Fee Balance Ledger & Receipt Generator',
          'Class Attendance Daily Roll Call Grid', 'Timetable Grid with Clash Detection', 'Exam Seat & Hall Allocation Planner'
        ],
        workflows: [
          'Student Admission to Enrollment Onboarding Flow', 'Term-End Grade Submission & Headmaster Approval Flow',
          'Fee Payment Settlement & Receipt Clearance Workflow', 'Disciplinary Hearing & Parent Notification Workflow'
        ],
        forms: [
          'Student New Admission & Bio-data Registration Form', 'Termly Continuous Assessment Score Entry Form',
          'Tuition Fee Payment Voucher & Bank Teller Slip Form', 'Medical Health Declaration & Emergency Consent Form'
        ],
        reports: [
          'Termly Student Academic Report Card', 'Master Grade Sheet & Class Ranking Summary', 'Tuition Fee Collection & Outstanding Ledger'
        ],
        aiCapabilities: [
          'Autonomous Student At-Risk Academic Failure Predictor', 'Smart Automated Timetable & Venue Conflict Solver',
          'Parent Query Multi-Lingual AI Assistant', 'Automated Essay & Continuous Assessment Plagiarism Screener'
        ],
        integrations: ['National Education Ministry SIS Gateway', 'FAAP School Fee Settlement Bridge', 'National Biometric ID Gateway'],
        dataDomains: ['STUDENT_ACADEMIC_RECORDS', 'FINANCIAL_BURSARY_LEDGER', 'STAFF_CURRICULUM_LOGS'],
        securityProfiles: ['FERPA_COMPLIANT', 'NATIONAL_STUDENT_PRIVACY', 'ROLE_BASED_FACULTY_ACCESS']
      },
      {
        id: 'ALUMNI_ENDOWMENT',
        name: 'Alumni & Endowment Organizations',
        description: 'Alumni associations, university foundation endowments, capital campaigns, and legacy trusts.',
        icon: 'award',
        defaultEcosystemName: 'Alumni Network & Capital Endowment ERP',
        subdomains: ['Alumni Relations', 'Endowment Asset Management', 'Capital Fundraising Campaigns', 'Mentorship & Career Networks'],
        productTypes: ['Endowment ERP', 'Alumni Giving & Pledge Suite', 'Institutional Legacy Platform'],
        portals: ['Alumni Community Portal', 'Major Donor & Philanthropy Workspace', 'Endowment Investment Oversight Hub', 'Career Mentorship Portal'],
        departments: ['Institutional Advancement Directorate', 'Endowment Asset Management Office', 'Alumni Engagement & Chapters Unit', 'Annual Giving Operations'],
        modules: ['Donor CRM & Giving History', 'Endowment Portfolio & Yield Allocation', 'Capital Campaign Pledges & Milestones', 'Alumni Career Directory'],
        components: ['Donor Giving Tier Badge', 'Endowment Fund Growth Chart', 'Pledge Fulfillment Tracker', 'Alumni Chapter Map'],
        workflows: ['Major Gift Pledge Recording & Tax Receipting Flow', 'Endowment Scholarship Distribution Approval Flow', 'Alumni Chapter Charter Workflow'],
        forms: ['Endowment Gift Agreement Form', 'Alumni Profile & Class Year Update Form', 'Scholarship Beneficiary Nomination Form'],
        reports: ['Annual Endowment Performance Statement', 'Capital Campaign Progress Dashboard', 'Alumni Giving Participation Report'],
        aiCapabilities: ['Predictive Donor Propensity & Affinity Scoring', 'Automated Stewardship Impact Report Synthesizer', 'Alumni Mentorship Matching Engine'],
        integrations: ['FAAP Trust Ledger Bridge', 'Global Banking Wire Network', 'Institutional SIS Records Gateway'],
        dataDomains: ['DONOR_PLEDGE_RECORDS', 'ENDOWMENT_CAPITAL_ALLOCATIONS', 'ALUMNI_LEGACY_DIRECTORY'],
        securityProfiles: ['PHILANTHROPY_DATA_SOVEREIGNTY', 'CONFIDENTIAL_DONOR_VAULT', 'FIPS_HSM_ENCRYPTED']
      },
      {
        id: 'HEALTHCARE',
        name: 'Healthcare & Clinical Networks',
        description: 'National referral hospitals, district clinics, specialist medical networks, and laboratory diagnostics.',
        icon: 'heart-pulse',
        defaultEcosystemName: 'Hospital Clinical & Electronic Health Records ERP',
        subdomains: ['Tertiary Referral Hospitals', 'Primary Healthcare Clinics', 'Diagnostic Laboratories', 'Pharmaceutical Supply Chains'],
        productTypes: ['Hospital Management Information System (HMIS)', 'EHR Clinical Suite', 'Public Health Surveillance ERP'],
        portals: [
          'Doctor Clinical Workstation & EHR Dashboard', 'Nurse Triage & Inpatient Bedside Workspace', 'Patient Health Portal & Appointment Booking',
          'Pharmacy Dispensing & Drug Formulary Hub', 'Laboratory Diagnostics & Pathological Test Console', 'Emergency Room (ER) & Trauma Triage Deck'
        ],
        departments: [
          'Directorate of Clinical Medicine & Surgery', 'Department of Emergency & Critical Care', 'Department of Pharmacy & Pharmaceutical Services',
          'Department of Pathology, Radiology & Laboratory Diagnostics', 'Hospital Administration & Billing Directorate'
        ],
        modules: [
          'Electronic Health Records (EHR) & Clinical Charting', 'Inpatient Admission, Bed Management & Discharge',
          'Outpatient Consultation & Queue Management', 'Pharmacy Inventory, Dispensing & Drug Interaction Engine', 'Laboratory Information Management System (LIMS)'
        ],
        components: [
          'Patient Medical Timeline & Allergy Alert Banner', 'Vital Signs Real-time Chart & EWS Score', 'Prescription Builder with Drug Interaction Check',
          'Ward Bed Layout & Patient Occupancy Map'
        ],
        workflows: [
          'Patient Admission to Discharge Clinical Flow', 'Prescription Ordering, Dispensing & Stock Deduction Flow',
          'Emergency Trauma Team Dispatch & Triage Workflow'
        ],
        forms: [
          'Patient Clinical Intake & Medical History Form', 'Doctor Consultation Clinical Note & Diagnosis Form',
          'Surgical Consent & Pre-Operative Checklist Form'
        ],
        reports: [
          'Hospital Inpatient Bed Occupancy & Morbidity Summary', 'Pharmacy Controlled Substances Dispensing Audit', 'Clinical Mortality & Infection Control Report'
        ],
        aiCapabilities: [
          'Clinical Sepsis & Deterioration Early Warning Predictor', 'Automated Drug-Drug Adverse Interaction AI Screener', 'Radiological Image Anomaly Triage Assistant'
        ],
        integrations: ['National Health Insurance Fund (NHIF) Gateway', 'FAAP Healthcare Settlement Bridge', 'DICOM/PACS Medical Imaging Server'],
        dataDomains: ['CLINICAL_EHR_RECORDS', 'PHARMACY_CONTROLLED_FORMULARY', 'LABORATORY_BIO_DIAGNOSTICS'],
        securityProfiles: ['HIPAA_COMPLIANT', 'SOVEREIGN_PATIENT_PRIVACY', 'DOCTOR_DIGITAL_SIGNATURE_RBAC']
      },
      {
        id: 'HOSPITALITY_TOURISM',
        name: 'Hospitality & Tourism',
        description: 'Hotel chains, eco-resorts, safari lodges, conference centres, and national tourism boards.',
        icon: 'compass',
        defaultEcosystemName: 'Hospitality Property & Guest Experience ERP',
        subdomains: ['Luxury Hotels & Resorts', 'Safari Lodges & Eco-Tourism', 'Convention & Exhibition Centres', 'Tour Operators'],
        productTypes: ['Property Management System (PMS)', 'Guest Experience Suite', 'Tour & Excursion ERP'],
        portals: ['Front Desk & Reservation Desk', 'Guest Digital Concierge Portal', 'Food & Beverage POS Workstation', 'Housekeeping & Maintenance Hub'],
        departments: ['Front Office & Guest Services', 'Housekeeping & Laundry Division', 'Food, Beverage & Culinary Arts', 'Sales, Banqueting & Events'],
        modules: ['Room Inventory & Channel Manager', 'Point of Sale (POS) Restaurant Engine', 'Housekeeping Room Status & Inspection', 'Guest Loyalty & CRM'],
        components: ['Interactive Room Availability Floorplan', 'Guest Folio Ledger & Bill Splitter', 'Kitchen Order Ticket (KOT) Display'],
        workflows: ['Guest Check-In to Express Check-Out Workflow', 'Banquet Event Order (BEO) Execution Flow', 'Lost & Found Asset Custody Flow'],
        forms: ['Guest Registration Card & ID Verification Form', 'Housekeeping Room Inspection Checklist', 'Banquet Booking Contract Form'],
        reports: ['Daily RevPAR & Occupancy Audit', 'Restaurant Food Cost & Variance Analysis', 'Guest Satisfaction & Net Promoter Score'],
        aiCapabilities: ['Dynamic Room Pricing & Yield Optimization Engine', 'Guest Dietary Preference & Personalization Bot', 'Staff Rostering & Peak Occupancy Predictor'],
        integrations: ['Global Distribution System (GDS)', 'FAAP Merchant Payment Gateway', 'Keycard Access Control Integration'],
        dataDomains: ['GUEST_RESERVATION_FOLIOS', 'HOTEL_PROPERTY_INVENTORY', 'FOOD_BEVERAGE_LEDGER'],
        securityProfiles: ['PCI_DSS_MERCHANT', 'GUEST_PRIVACY_SOVEREIGNTY', 'POS_TERMINAL_ENCRYPTION']
      },
      {
        id: 'CHURCH_FAITH',
        name: 'Church & Faith Organizations',
        description: 'Dioceses, parish networks, national religious assemblies, mosques, and faith charities.',
        icon: 'church',
        defaultEcosystemName: 'Diocese, Parish & Tithe Management ERP',
        subdomains: ['Diocesan Administration', 'Parish Networks', 'Tithe & Stewardship Funds', 'Sacramental Registries'],
        productTypes: ['Diocesan Administrative ERP', 'Parish Operations System', 'Faith Stewardship & Welfare Platform'],
        portals: ['Pastoral & Clergy Office Portal', 'Member & Family Directory Portal', 'Tithe, Offering & Stewardship Desk', 'Sacramental Records Registry'],
        departments: ['Diocesan Chancellor Office', 'Parish Pastoral Council', 'Finance, Tithe & Stewardship Board', 'Welfare & Humanitarian Ministry'],
        modules: ['Member & Family Registry', 'Tithe & Offering Digital Collection', 'Sacraments (Baptism, Confirmation, Marriage) Registry', 'Small Christian Communities (SCC) Module'],
        components: ['Family Member Household Tree', 'Tithe Contribution Envelope Ledger', 'Sacramental Certificate Issuer'],
        workflows: ['Sacramental Verification & Certificate Issue Flow', 'Parish Welfare Disbursement Approval Workflow', 'Diocesan Capital Project Fund Flow'],
        forms: ['Parishioner Registration Form', 'Sacrament Application & Sponsor Form', 'Tithe Pledge & Welfare Assistance Request Form'],
        reports: ['Annual Diocesan Stewardship Statement', 'Parish Demographic & Attendance Census', 'Welfare Fund Distribution Audit'],
        aiCapabilities: ['Pastoral Care Visitation Scheduler', 'Sermon & Liturgical Calendar Multi-Lingual Translator', 'Community Needs & Hardship Predictor'],
        integrations: ['FAAP Faith Giving Gateway', 'National Marriage Registry Bridge', 'SMS Mass Outreach Gateway'],
        dataDomains: ['PARISHIONER_FAMILY_RECORDS', 'SACRAMENTAL_HISTORICAL_ARCHIVES', 'FAITH_STEWARDSHIP_FUNDS'],
        securityProfiles: ['FAITH_CONFIDENTIALITY_CANONICAL', 'SOVEREIGN_DONOR_PRIVACY', 'CLERGY_AUTHENTICATION']
      },
      {
        id: 'CLAN_FAMILY',
        name: 'Clan & Family Organizations',
        description: 'Indigenous clan secretariats, ancestral royal trusts, family estates, and lineage assemblies.',
        icon: 'users',
        defaultEcosystemName: 'Clan Governance, Lineage & Ancestral Land ERP',
        subdomains: ['Lineage & Genealogy Registry', 'Ancestral Land & Property Trusts', 'Clan Welfare & Bursary Funds', 'Cultural Heritage & Customary Law'],
        productTypes: ['Clan Governance ERP', 'Lineage & Land Trust Suite', 'Family Estate Registry'],
        portals: ['Clan Council of Elders Portal', 'Lineage Member Family Tree Portal', 'Ancestral Land & Asset Registry', 'Clan Education Bursary Desk'],
        departments: ['Clan Elders Council Secretariat', 'Land Custodianship & Boundary Office', 'Customary Dispute Resolution Committee', 'Youth & Education Trust'],
        modules: ['Genealogical Lineage & Clan Totem Registry', 'Ancestral Land Parcel & Boundary Mapping', 'Clan Welfare Contributions & Emergency Fund', 'Customary Arbitration Log'],
        components: ['Lineage Tree Visualizer with Totem Badges', 'Ancestral Land Geospatial Boundary Polygon', 'Customary Dispute Case Dossier'],
        workflows: ['Lineage Membership Verification & Elder Blessing Flow', 'Customary Land Transfer Witness Workflow', 'Bursary Aid Allocation Flow'],
        forms: ['Clan Lineage Enrollment Form', 'Customary Land Demarcation Declaration', 'Clan Welfare Aid Application Form'],
        reports: ['Clan Census & Demographic Register', 'Ancestral Land Title & Custodianship Schedule', 'Clan Endowment Financial Statement'],
        aiCapabilities: ['Oral Tradition & Genealogy Lineage Reconstruction AI', 'Customary Precedent Search & Dispute Assistant', 'Clan Dialect Cultural Archive Engine'],
        integrations: ['National Land Commission Cadastral Bridge', 'FAAP Clan Treasury Ledger', 'Sovereign Biometric Registry'],
        dataDomains: ['GENEALOGICAL_LINEAGE_ARCHIVES', 'ANCESTRAL_LAND_CADASTRE', 'CUSTOMARY_DISPUTE_RECORDS'],
        securityProfiles: ['INDIGENOUS_KNOWLEDGE_SOVEREIGNTY', 'ELDER_COUNCIL_CONSENSUS_MULTI_KEY', 'FIPS_ENCRYPTED_VAULT']
      },
      {
        id: 'FINANCE_BANKING',
        name: 'Finance & Banking',
        description: 'Commercial banks, central settlement authorities, investment trusts, and custodian banks.',
        icon: 'landmark',
        defaultEcosystemName: 'Core Banking, Treasury & Clearing ERP',
        subdomains: ['Commercial Retail Banking', 'Corporate & Investment Banking', 'Central Clearing & Settlement', 'Treasury & FX Trading'],
        productTypes: ['Core Banking Engine', 'Treasury & Liquidity ERP', 'Trade Finance & Custody Suite'],
        portals: ['Branch Teller & Cash Vault Portal', 'Treasury & Money Market Workstation', 'Loan Origination & Credit Underwriting Desk', 'Compliance & AML/CFT Cockpit'],
        departments: ['Core Banking Operations', 'Treasury & Balance Sheet Management', 'Risk, Compliance & Financial Crime Directorate', 'Credit Risk & Lending Division'],
        modules: ['Deposit Accounts & Ledger Engine', 'Real-Time Gross Settlement (RTGS) Interface', 'Loan Management & Collateral Valuation', 'Anti-Money Laundering (AML) Screener'],
        components: ['Customer Account Balance Matrix', 'Real-Time Interbank Liquidity Gauge', 'Loan Repayment Amortization Schedule'],
        workflows: ['Large Value Wire Transfer Multi-Approval Workflow', 'Credit Appraisal to Loan Disbursement Flow', 'Suspicious Transaction Report (STR) Escalation'],
        forms: ['Corporate Account Opening KYC Form', 'Credit Facility Application & Collateral Deed', 'Forex Spot Deal Execution Ticket'],
        reports: ['Daily Balance Sheet & Trial Balance', 'Regulatory Capital Adequacy (Basel III) Return', 'Non-Performing Loans (NPL) Aging Analysis'],
        aiCapabilities: ['Real-Time Transaction Fraud & AML Anomaly Detector', 'Credit Scoring & Default Probability Engine', 'Automated Liquidity Cash-Flow Forecaster'],
        integrations: ['FAAP Sovereign Central Clearing Ledger', 'SWIFT / ISO 20022 Financial Network', 'National Credit Reference Bureau (CRB)'],
        dataDomains: ['CORE_BANKING_GENERAL_LEDGER', 'CUSTOMER_KYC_ACCOUNT_DATA', 'TRANSACTION_AUDIT_TRAIL'],
        securityProfiles: ['FIPS_140_3_HSM', 'BANKING_SECRECY_ACT', 'PCI_DSS_LEVEL_1', 'ZERO_TRUST_AIR_GAP']
      },
      {
        id: 'FINTECH',
        name: 'FinTech & Digital Wallets',
        description: 'Mobile money issuers, payment gateway providers, micro-investing apps, and remittance networks.',
        icon: 'zap',
        defaultEcosystemName: 'Digital Wallet, Merchant Settlement & Gateway ERP',
        subdomains: ['Mobile Money Wallets', 'Payment Gateway Infrastructure', 'Cross-Border Remittances', 'Micro-Lending Platforms'],
        productTypes: ['FinTech Core Wallet Engine', 'Payment Processing ERP', 'Digital Lending Suite'],
        portals: ['Merchant Settlement Dashboard', 'Agent Network Float Management Hub', 'Disputes & Chargeback Operations Desk', 'API Developer Integration Cockpit'],
        departments: ['Payment Operations & Clearing', 'Merchant Acquiring Directorate', 'FinTech Fraud & Risk Control', 'Agent Float & Liquidity Network'],
        modules: ['Stored Value Wallet & Ledger', 'Payment Gateway Switch & Router', 'Agent Float Invoicing & Commission Splitter', 'Instant Micro-Loan Underwriting Engine'],
        components: ['Real-Time TPS Throughput Gauge', 'Merchant Escrow Balance Widget', 'Agent Super-Float Liquidity Map'],
        workflows: ['Merchant Onboarding & Automated KYC Verification', 'Chargeback Dispute & Evidence Submission Flow', 'Cross-Border FX Liquidity Rebalancing'],
        forms: ['Merchant Payment API Agreement Form', 'Agent Cash-In/Cash-Out Float Request', 'Consumer Dispute Initiation Form'],
        reports: ['Daily Payment Switch Settlement Summary', 'Agent Commission & Revenue Share Audit', 'System Interchange Fee Statement'],
        aiCapabilities: ['Sub-Millisecond Payment Fraud Scoring Engine', 'Dynamic FX Routing & Spread Maximizer', 'Conversational AI Payment Bot'],
        integrations: ['FAAP Instant Settlement Rail', 'National Mobile Money Switch', 'Identity Verification Biometric Bridge'],
        dataDomains: ['DIGITAL_WALLET_TRANSACTIONS', 'MERCHANT_ESCROW_ACCOUNTS', 'PAYMENT_SWITCH_LOGS'],
        securityProfiles: ['PCI_DSS_CARDHOLDER_DATA', 'TOKENIZED_VAULT_ISOLATION', 'MICROSERVICE_MUTUAL_TLS']
      },
      {
        id: 'MICROFINANCE_SACCO',
        name: 'Microfinance & SACCO Cooperatives',
        description: 'Savings and Credit Cooperative Societies (SACCOs), community microfinance, and credit unions.',
        icon: 'piggy-bank',
        defaultEcosystemName: 'SACCO Member Shares, Loans & Dividend ERP',
        subdomains: ['Deposit-Taking SACCOs (DTS)', 'Community Microfinance Institutions', 'Teacher & Civil Servant SACCOs', 'Agricultural Cooperatives'],
        productTypes: ['SACCO Core Enterprise ERP', 'Microfinance Loan Suite', 'Member Share & Dividend Engine'],
        portals: ['Member Self-Service & Share Capital Portal', 'SACCO Credit Committee Approval Desk', 'FOSA Banking & Teller Counter', 'BOSA Loans & Guarantor Desk'],
        departments: ['Member Accounts & FOSA Operations', 'Credit & Loan Recovery Committee', 'Shares, Dividends & Investments Unit', 'Internal Audit & Supervisory Board'],
        modules: ['Member Shares & Non-Withdrawable Deposits', 'Loan Guarantorship & Collateral Pledge', 'Automated Dividend Computation Engine', 'FOSA Current & Savings Accounts'],
        components: ['Member Share Balance & Dividend Projection Widget', 'Guarantor Liability Breakdown Chart', 'Loan Arrears Aging Gauge'],
        workflows: ['SACCO Membership Registration & Share Allotment Flow', 'Loan Application, Guarantor Endorsement & Disbursement Flow', 'Annual Dividend Declaration Flow'],
        forms: ['SACCO Member Registration & Nominee Form', 'Development Loan Application & Guarantor Consent', 'Emergency Loan Fast-Track Request Form'],
        reports: ['SASRA Regulatory Supervisory Return', 'Member Shares & Deposits Trial Balance', 'Loan Portfolio at Risk (PAR 30/90) Summary'],
        aiCapabilities: ['Guarantor Risk Exposure & Collateral Valuation AI', 'Predictive Loan Default Risk Scoring', 'Automated Dividend Maximization Simulator'],
        integrations: ['FAAP SACCO Clearing Rail', 'National SACCO Regulatory Authority (SASRA) Bridge', 'National ID Biometric Gateway'],
        dataDomains: ['SACCO_MEMBER_SHARES', 'LOAN_GUARANTOR_LEDGER', 'DIVIDEND_DISTRIBUTION_LOGS'],
        securityProfiles: ['COOPERATIVE_SOCIETIES_ACT', 'SUPERVISORY_BOARD_CLEARANCE', 'FINANCIAL_AUDIT_LOGGING']
      },
      {
        id: 'AGRIBUSINESS',
        name: 'Agribusiness & Agriculture',
        description: 'Commercial farms, grain reserves, cooperative unions, tea/coffee processing factories, and commodity boards.',
        icon: 'wheat',
        defaultEcosystemName: 'Farm Operations, Outgrower & Commodity Processing ERP',
        subdomains: ['Commercial Plantation Farms', 'Smallholder Outgrower Schemes', 'Agro-Processing Factories', 'National Grain & Commodity Reserves'],
        productTypes: ['Agribusiness Operations ERP', 'Outgrower & Farmer Weighbridge Suite', 'Commodity Inventory & Processing System'],
        portals: ['Farm Field Manager & Agronomy Cockpit', 'Outgrower Weighbridge & Delivery Portal', 'Processing Factory SCADA Interface', 'Commodity Warehouse Receipts Desk'],
        departments: ['Agronomy & Field Operations Directorate', 'Factory Milling & Quality Assurance', 'Outgrower Logistics & Extension Services', 'Commodity Sales & Grain Reserve Board'],
        modules: ['Field Plot Mapping & Soil Nutrient Tracking', 'Weighbridge Gross-Tare-Net Automatic Scale Integration', 'Farmer Produce Payment & Advance Deduction', 'Fertilizer & Seed Input Credit Distribution'],
        components: ['Interactive Farm Block Weather & Crop Health Map', 'Weighbridge Real-Time Ticket Generator', 'Crop Yield Forecast Matrix'],
        workflows: ['Farmer Produce Delivery to FAAP Settlement Flow', 'Seasonal Farm Input Loan Allocation & Recovery Flow', 'Grain Reserve Silo Quality Certification Flow'],
        forms: ['Farmer Outgrower Contract & Land Plot Form', 'Weighbridge Delivery & Moisture Content Slip', 'Fertilizer Subsidized Input Issue Voucher'],
        reports: ['Seasonal Harvest Yield & Grade Analysis', 'Farmer Net Pay & Deduction Summary', 'Warehouse Grain Stock Moisture & Pest Audit'],
        aiCapabilities: ['Satellite Multispectral Crop Health & Pest Predictor', 'Automated Yield Forecast & Weather Hedging AI', 'Fair Commodity Farmgate Pricing Optimizer'],
        integrations: ['FAAP Agribusiness Payment Switch', 'National Warehouse Receipt System (WRS)', 'Geospatial Satellite Agronomy API'],
        dataDomains: ['FARM_PLOT_GEOMETRY_RECORDS', 'WEIGHBRIDGE_DELIVERY_RECEIPTS', 'FARMER_PAYMENT_LEDGER'],
        securityProfiles: ['NATIONAL_FOOD_SECURITY_DATA', 'FARMER_DATA_PRIVACY', 'TRACEABLE_COMMODITY_AUDIT']
      },
      {
        id: 'GOVERNMENT',
        name: 'Government & Public Administration',
        description: 'Ministries, national statutory agencies, public service commissions, revenue authorities, and state corporations.',
        icon: 'landmark',
        defaultEcosystemName: 'Integrated Public Financial & Citizen Services ERP',
        subdomains: ['National Government Ministries', 'Public Procurement & Asset Disposal', 'Revenue & Customs Administration', 'Civil Service Payroll & HR'],
        productTypes: ['Integrated Financial Management Information System (IFMIS)', 'Public Procurement ERP', 'Government Human Resource Information System (GHRIS)'],
        portals: ['Treasury Budget Office & Vote Book Console', 'Public Tender & Contractor Portal', 'Civil Service HR & Payroll Dashboard', 'Citizen E-Services Gateway'],
        departments: ['Ministry of Finance & National Treasury', 'Public Procurement Regulatory Authority', 'Public Service Commission & Human Capital', 'Internal Auditor General Directorate'],
        modules: ['National Chart of Accounts & Vote Book Budgeting', 'E-Procurement, Tender Scoring & Contract Award', 'Integrated Payroll & Personnel Database (IPPD)', 'Public Asset Register & Depreciation Engine'],
        components: ['Budget Vote Execution & Commitment Bar', 'Tender Evaluation Scorecard Matrix', 'Public Debt & Sinking Fund Gauge'],
        workflows: ['Budget Allocation to Local Purchase Order (LPO) Commitment Flow', 'Public Tender Advertisement to Award Clearance Flow', 'Civil Service Promotion & Gratuity Calculation Flow'],
        forms: ['Government Purchase Requisition (AIE Form)', 'Tender Bid Submission & Tax Clearance Declaration', 'Civil Service Annual Performance Appraisal Form'],
        reports: ['National Budget Implementation Review Report', 'Public Procurement Audit & Value-for-Money Report', 'Consolidated Public Debt & Sinking Fund Statement'],
        aiCapabilities: ['Public Procurement Collusion & Bid-Rigging Detector', 'Government Revenue Leakage & Tax Gap AI Screener', 'Automated Budget Execution Forecaster'],
        integrations: ['FAAP Sovereign Treasury Ledger', 'Central Bank Sovereign Debt Interface', 'National Citizen Identity Database'],
        dataDomains: ['NATIONAL_BUDGET_APPROPRIATIONS', 'PUBLIC_PROCUREMENT_TENDERS', 'CIVIL_SERVICE_PAYROLL_DATA'],
        securityProfiles: ['NATIONAL_SECURITY_CLEARANCE', 'OFFICIAL_SECRETS_ACT_COMPLIANT', 'PARLIAMENTARY_AUDIT_TRAIL']
      },
      {
        id: 'MANUFACTURING',
        name: 'Manufacturing & Industrial Production',
        description: 'Discrete manufacturing, process chemical plants, steel mills, beverage bottling, and automotive assembly lines.',
        icon: 'cpu',
        defaultEcosystemName: 'Plant Floor SCADA, MRP II & Supply Chain ERP',
        subdomains: ['Discrete Assembly & Automotive', 'Process & Chemical Plants', 'Food & Beverage Bottling', 'Heavy Industrial Metal & Steel'],
        productTypes: ['Manufacturing Resource Planning (MRP II)', 'Plant Floor Execution System (MES)', 'Industrial Supply Chain ERP'],
        portals: ['Plant Operations & SCADA Control Room', 'Bill of Materials (BOM) Engineering Console', 'Quality Assurance & Batch Inspection Lab', 'Maintenance & Plant Asset Repair Hub'],
        departments: ['Production Planning & Plant Engineering', 'Quality Assurance & Compliance Division', 'Procurement & Raw Material Warehousing', 'Plant Maintenance & Reliability Engineering'],
        modules: ['Multi-Level Bill of Materials (BOM) Engine', 'Material Requirements Planning (MRP II) Run', 'Overall Equipment Effectiveness (OEE) & Downtime Tracker', 'Batch Traceability & Electronic Batch Records (EBR)'],
        components: ['OEE Gauge & Production Throughput Chart', 'Interactive BOM Tree & Component Cost Drilldown', 'Plant Floor Workstation Status Grid'],
        workflows: ['Production Work Order Release to Finish Goods Flow', 'Quality Quarantine to Certificate of Analysis (COA) Flow', 'Preventive Maintenance Work Order Trigger'],
        forms: ['Production Batch Record & Recipe Sheet', 'Raw Material Inspection & Release Voucher', 'Plant Machine Breakdown Work Order Form'],
        reports: ['Daily Production Yield & Material Scrap Analysis', 'Machine OEE & Scheduled Downtime Audit', 'Batch Genealogy & Traceability Dossier'],
        aiCapabilities: ['Predictive Machine Breakdown & Acoustic Anomaly AI', 'Dynamic Production Schedule & Bottleneck Solver', 'Computer Vision Automated Quality Inspection'],
        integrations: ['OPC-UA / MQTT Industrial SCADA Gateway', 'FAAP Vendor Supply Chain Settlement Bridge', 'Enterprise Warehouse Management System (WMS)'],
        dataDomains: ['PRODUCTION_BATCH_RECORDS', 'BILL_OF_MATERIALS_SPECS', 'MACHINE_TELEMETRY_LOGS'],
        securityProfiles: ['ISA_95_INDUSTRIAL_STANDARD', 'PLANT_AIR_GAP_SECURITY', 'TRACEABLE_BATCH_INTEGRITY']
      },
      {
        id: 'LOGISTICS_TRANSPORT',
        name: 'Logistics, Transport & Haulage',
        description: 'Freight haulage fleets, port authorities, national railway networks, cargo aviation, and warehousing.',
        icon: 'truck',
        defaultEcosystemName: 'Fleet Telematics, Freight & Multi-Modal Logistics ERP',
        subdomains: ['Cross-Border Haulage Fleets', 'Maritime Port & Container Terminals', 'National Freight Railway', 'Air Cargo Operations'],
        productTypes: ['Fleet Management & Telematics ERP', 'Container Terminal Operating System (TOS)', 'Freight Forwarding Suite'],
        portals: ['Dispatch Command & Route Planning Deck', 'Driver Mobile App & Electronic Proof of Delivery (e-POD)', 'Container Yard & Crane Operations Deck', 'Fleet Maintenance & Fuel Depot Console'],
        departments: ['Fleet Operations & Dispatch Directorate', 'Terminal & Yard Management Division', 'Freight Billing & Customs Clearance', 'Automotive Workshop & Maintenance Unit'],
        modules: ['GPS Fleet Telematics & Geofencing Engine', 'Multi-Modal Waybill & Bill of Lading Engine', 'Fuel Sensor Calibration & Consumption Auditor', 'Vehicle Preventive Maintenance & Tire Tracking'],
        components: ['Live GPS Fleet Map with Vehicle Speed & Fuel Level', 'Container Yard Stacking 3D Visualizer', 'Driver Hours of Service (HOS) Compliance Gauge'],
        workflows: ['Cargo Booking to Automated Dispatch & e-POD Flow', 'Port Container Gate-In to Vessel Loading Workflow', 'Vehicle Service Trigger & Spare Part Requisition'],
        forms: ['Consignment Waybill & Cargo Manifest Form', 'Driver Vehicle Inspection & Mileage Log Form', 'Fuel Requisition & Smart Card Voucher'],
        reports: ['Fleet Fuel Efficiency & Cost-Per-Kilometer Statement', 'On-Time In-Full (OTIF) Delivery Performance Audit', 'Container Yard Dwell Time & Turnaround Report'],
        aiCapabilities: ['AI Dynamic Route & Traffic Congestion Optimizer', 'Predictive Vehicle Maintenance & Tire Wear Engine', 'Automated Freight Load Consolidator'],
        integrations: ['National Single Window Customs Gateway', 'FAAP Fleet Fuel & Toll Payment Bridge', 'GPS Telematics Satellite Stream'],
        dataDomains: ['FLEET_GPS_TELEMATICS_LOGS', 'CARGO_WAYBILL_MANIFESTS', 'FUEL_CONSUMPTION_LEDGER'],
        securityProfiles: ['CUSTOMS_BONDED_SECURITY', 'HAULAGE_SAFETY_COMPLIANCE', 'TAMPER_PROOF_EPOD']
      },
      {
        id: 'RETAIL_COMMERCE',
        name: 'Retail, Wholesale & Omnichannel Commerce',
        description: 'Supermarket retail chains, wholesale FMCG distributors, franchise retail networks, and department stores.',
        icon: 'shopping-cart',
        defaultEcosystemName: 'Omnichannel POS, Inventory & Merchant Settlement ERP',
        subdomains: ['Supermarket & Hypermarket Chains', 'FMCG Wholesale Distributors', 'Franchise Fashion Retail', 'Specialty Electronics Chains'],
        productTypes: ['Retail Enterprise ERP', 'Point of Sale (POS) Suite', 'Wholesale Distribution & Route-to-Market System'],
        portals: ['Cashier POS Terminal & Checkout Interface', 'Store Manager Floor Dashboard', 'Central Merchandising & Pricing Console', 'Wholesale Van-Sales Rep Portal'],
        departments: ['Store Operations & Cash Management', 'Merchandising, Category & Pricing Directorate', 'Supply Chain, Central DC & Warehousing', 'Loss Prevention & Internal Audit'],
        modules: ['Offline-Capable Point of Sale (POS) Engine', 'Central Automated Replenishment & Reorder Run', 'Promotions, Loyalty & Price Tier Engine', 'Van-Sales Route-to-Market Mobile Billing'],
        components: ['Store Daily Sales & Margin Gauge', 'Product Barcode Lookup & Shelf Stock Matrix', 'Cashier Till Reconciliation Sheet'],
        workflows: ['Store Replenishment Order to DC Dispatch Flow', 'Promotional Price Campaign Approval Flow', 'Cashier Shift Close & Bank Drop Reconcile'],
        forms: ['Store Goods Receipt & Discrepancy Note', 'Cashier Till Float Handover Form', 'Damaged / Expired Stock Write-off Form'],
        reports: ['Store Sales by Category & Top SKU Velocity', 'Gross Margin Return on Inventory Investment (GMROI)', 'Cashier Shrinkage & Discrepancy Audit'],
        aiCapabilities: ['Autonomous Stockout Predictor & Smart Replenishment', 'Customer Basket Association & Personalized Promotion Engine', 'Computer Vision Checkout Loss Prevention Screener'],
        integrations: ['FAAP Omnichannel Retail Payment Switch', 'Electronic Fiscal Device (EFD / ETR) Tax Bridge', 'Central Warehouse Automated Conveyor Integration'],
        dataDomains: ['POS_CHECKOUT_TRANSACTIONS', 'INVENTORY_DC_STORE_STOCK', 'CUSTOMER_LOYALTY_DATA'],
        securityProfiles: ['PCI_DSS_MERCHANT', 'FISCAL_MEMORY_TAX_COMPLIANCE', 'STORE_MANAGER_PIN_AUTHORIZATION']
      },
      {
        id: 'CONSTRUCTION_REAL_ESTATE',
        name: 'Construction & Real Estate Management',
        description: 'Civil engineering contractors, commercial real estate developers, property leasing managers, and infrastructure REITs.',
        icon: 'building-2',
        defaultEcosystemName: 'Construction Project Control & Property Leasing ERP',
        subdomains: ['Civil Infrastructure & EPC Contracting', 'Commercial & Residential Real Estate Leasing', 'Property Management & Facility Maintenance', 'Real Estate Investment Trusts (REITs)'],
        productTypes: ['Construction Project ERP', 'Property Management & Lease Suite', 'Facility Management System (CAFM)'],
        portals: ['Project Site Engineer & Quantity Surveyor Desk', 'Tenant Self-Service & Rent Payment Portal', 'Property Leasing Agent Dashboard', 'Facility Maintenance & Work Order Console'],
        departments: ['Project Engineering & Quantity Surveying', 'Property Leasing & Tenant Relations', 'Facility Maintenance & Asset Protection', 'Finance, Billing & Service Charge Directorate'],
        modules: ['Bill of Quantities (BOQ) & Cost-to-Complete Engine', 'Tenant Lease Contract & Automated Rent Invoicing', 'Subcontractor Payment Certificate & Retention Engine', 'Facility Maintenance Work Order & Preventive Service'],
        components: ['Project Cost S-Curve & Milestone Variance Widget', 'Property Unit Occupancy & Rent Collection Grid', 'Subcontractor Interim Payment Certificate (IPC) Tracker'],
        workflows: ['Interim Payment Certificate (IPC) Approval to Payout Flow', 'Tenant Lease Signing to Deposit Settlement Flow', 'Facility Tenant Maintenance Work Order Dispatch'],
        forms: ['Site Daily Progress & Labor Equipment Log', 'Tenant Lease Agreement & Key Handover Checklist', 'Subcontractor Variation Order Request Form'],
        reports: ['Project Earned Value Analysis (EVA) & Cost Variance', 'Property Portfolio Rent Collection & Arrears Aging', 'Service Charge Income & Expenditure Account'],
        aiCapabilities: ['BIM & BOQ Construction Cost Overrun Predictor', 'Automated Commercial Property Lease Valuation Engine', 'Facility Energy Consumption & HVAC Optimization AI'],
        integrations: ['FAAP Rent & Escrow Settlement Gateway', 'National Land Registry Cadastral Bridge', 'Building Information Modeling (BIM) Interface'],
        dataDomains: ['PROJECT_BOQ_COST_RECORDS', 'TENANT_LEASE_AGREEMENTS', 'PROPERTY_ASSET_MAINTENANCE_LOGS'],
        securityProfiles: ['FIDIC_CONTRACT_STANDARD', 'TENANT_DATA_PROTECTION', 'FIPS_ENCRYPTED_ESCROW']
      },
      {
        id: 'ENERGY_UTILITIES',
        name: 'Energy & Public Utilities',
        description: 'National power generation companies, electricity distribution grids, water utilities, and renewable solar/wind plants.',
        icon: 'zap',
        defaultEcosystemName: 'Smart Metering, Grid Telemetry & Utility Billing ERP',
        subdomains: ['Power Generation & Renewable Plants', 'Electric Transmission & Distribution Grids', 'Water & Sewerage Municipal Utilities', 'Clean Energy Microgrids'],
        productTypes: ['Utility Billing & Customer Care (CIS)', 'Grid Telemetry & SCADA Management ERP', 'Smart Meter Data Management (MDM)'],
        portals: ['Customer Utility Account & Token Purchase Portal', 'Grid Dispatch & Substation Operations Room', 'Field Technician Work Order Mobile App', 'Water Distribution & Non-Revenue Water (NRW) Console'],
        departments: ['Grid Operations & Substation Engineering', 'Customer Service, Metering & Billing Directorate', 'Field Maintenance & Rapid Response Division', 'Revenue Protection & Loss Mitigation'],
        modules: ['Automated Meter Reading (AMR) & Pre-paid Token Engine', 'Utility Tariffs, Tiered Invoicing & Payment Switch', 'Grid Substation SCADA & Outage Management System (OMS)', 'Non-Revenue Water / Energy Loss Detection Engine'],
        components: ['Live Power Grid Megawatt Load & Frequency Chart', 'Substation Feeder Status & Trip Alert Map', 'Pre-paid Token Transaction Key Generator'],
        workflows: ['Power Outage Incident Logging to Field Crew Restoration', 'New Customer Grid Connection & Meter Commissioning Flow', 'Illegal Connection Inspection & Penalty Workflow'],
        forms: ['New Electricity / Water Connection Application Form', 'Substation Inspection & Feeder Maintenance Sheet', 'Meter Tampering & Revenue Recovery Report Form'],
        reports: ['Monthly Energy Generated vs Sold Reconciliation', 'System Average Interruption Duration Index (SAIDI/SAIFI)', 'Non-Revenue Water & Commercial Loss Audit'],
        aiCapabilities: ['AI Grid Peak Demand & Renewable Generation Forecaster', 'Meter Tampering & Power Theft Anomaly Detector', 'Predictive Transformer Breakdown & Thermal Failure AI'],
        integrations: ['FAAP Utility Token Payment Bridge', 'IEC 61850 / DNP3 Substation SCADA Gateway', 'Smart Meter Cellular Mesh Head-End System'],
        dataDomains: ['SMART_METER_CONSUMPTION_SERIES', 'UTILITY_CUSTOMER_BILLING_LEDGER', 'GRID_TELEMETRY_SCADA_LOGS'],
        securityProfiles: ['NERC_CIP_CRITICAL_INFRASTRUCTURE', 'NATIONAL_GRID_SOVEREIGNTY', 'TAMPER_PROOF_TOKEN_ENCRYPTION']
      },
      {
        id: 'TELECOM_ISP',
        name: 'Telecommunications & ISPs',
        description: 'Mobile network operators (MNOs), internet service providers, fiber infrastructure operators, and satellite broadband.',
        icon: 'radio',
        defaultEcosystemName: 'Subscriber Billing, OSS/BSS & Network Operations ERP',
        subdomains: ['Mobile Network Operators (4G/5G)', 'Fiber-to-the-Home (FTTH) ISPs', 'Tower & Passive Infrastructure Companies', 'Data Center & Cloud Connectivity'],
        productTypes: ['Business Support Systems (BSS)', 'Operations Support Systems (OSS)', 'Telecom Billing & Mediation ERP'],
        portals: ['Subscriber Self-Care & eSIM Portal', 'Network Operations Center (NOC) Video Wall Console', 'Dealer & SIM Card Registration POS', 'Enterprise Leased-Line SLA Portal'],
        departments: ['Network Engineering & Operations (NOC)', 'Commercial BSS, Billing & Tariff Directorate', 'Customer Care & Subscriber Retention', 'Enterprise Wholesale & Interconnect Division'],
        modules: ['Convergent Billing, Rating & Charging (OCS)', 'Call Detail Record (CDR) Mediation Engine', 'SIM Registration & Sovereign KYC Biometric Compliance', 'Fiber Route GIS & Fault Isolation Tracker'],
        components: ['Network Live Traffic & Bandwidth Utilization Graph', 'Subscriber CDR Rating & Balance Deduction Matrix', 'Cellular Base Station (BTS) Status Heatmap'],
        workflows: ['Subscriber SIM Registration & Sovereign Activation Flow', 'Fiber Cable Cut Alarm to Field Crew Splicing Workflow', 'Enterprise Leased Line SLA Breach Credit Flow'],
        forms: ['Subscriber SIM Registration & ID Document Form', 'Enterprise Dedicated Internet Leased Line Agreement', 'Base Station Tower Entry & Maintenance Clearance Form'],
        reports: ['Monthly Telecommunications Regulatory Authority Return', 'Subscriber Churn & Average Revenue Per User (ARPU)', 'Network Availability & Packet Loss SLA Statement'],
        aiCapabilities: ['AI Cell Tower Traffic Congestion & Beamforming Optimizer', 'Predictive Subscriber Churn & Retention Intervention Engine', 'Automated Telecom Fraud & SIM Boxing Detector'],
        integrations: ['FAAP Airtime & Data Bundle Payment Switch', 'National Communications Authority Regulatory Bridge', 'Diameter / 3GPP Telecom Protocol Interface'],
        dataDomains: ['CDR_MEDIATION_EVENT_LOGS', 'SUBSCRIBER_KYC_ACCOUNT_DATA', 'NETWORK_OSS_TOPOLOGY_MAPS'],
        securityProfiles: ['3GPP_TELECOM_SECURITY', 'SOVEREIGN_COMMUNICATION_INTERCEPT_STANDARD', 'ZERO_TRUST_CORE_NETWORK']
      },
      {
        id: 'NGO_NONPROFIT',
        name: 'NGOs & Humanitarian Organizations',
        description: 'International NGOs, humanitarian relief agencies, charitable trusts, and community development foundations.',
        icon: 'globe',
        defaultEcosystemName: 'Donor Grants, Humanitarian Aid & Program ERP',
        subdomains: ['Humanitarian Disaster Relief', 'International Development Programs', 'Child & Community Sponsorship', 'Global Health & Vaccine Initiatives'],
        productTypes: ['NGO Program & Grant Management ERP', 'Humanitarian Aid Logistics Suite', 'Donor Compliance & Beneficiary Platform'],
        portals: ['Grant Management & Donor Reporting Portal', 'Field Aid Worker Mobile Collection App', 'Beneficiary Biometric Verification Counter', 'Volunteer Coordination & Deployment Desk'],
        departments: ['Program Strategy & Grants Management', 'Humanitarian Emergency Response Unit', 'Monitoring, Evaluation & Learning (MEL)', 'Finance, Compliance & Donor Audit Directorate'],
        modules: ['Multi-Donor Multi-Currency Grant Tracking Engine', 'Beneficiary Biometric ID & Relief Voucher Distribution', 'Monitoring, Evaluation & Results-Based Framework (M&E)', 'Humanitarian Last-Mile Supply Chain & Warehouse Module'],
        components: ['Grant Budget vs Actual Burn Rate Gauge', 'Beneficiary Food Ration Distribution Counter', 'Program Key Performance Indicator (KPI) Matrix'],
        workflows: ['Grant Proposal to Donor Award & Vote Book Creation', 'Emergency Field Relief Requisition to Air-Drop Workflow', 'Project End-of-Grant Closeout & Audit Flow'],
        forms: ['Field Beneficiary Registration & Needs Assessment Form', 'Grant Fund Drawdown Request & Donor Compliance Form', 'Field Emergency Relief Distribution Manifest'],
        reports: ['Donor Financial & Narrative Progress Report (USAID/EU/UN)', 'Program Monitoring & Evaluation Impact Scorecard', 'Humanitarian Aid Inventory & Loss Mitigation Audit'],
        aiCapabilities: ['Predictive Drought & Famine Early Warning System', 'Automated Multilingual Donor Grant Proposal Reviewer', 'Aid Diversion & Beneficiary Duplicate Detection AI'],
        integrations: ['FAAP Humanitarian Cash Transfer Rail', 'United Nations OCHA Humanitarian Data Exchange (HDX)', 'Biometric Iris / Fingerprint Field Scanner Gateway'],
        dataDomains: ['DONOR_GRANT_LEDGERS', 'HUMANITARIAN_BENEFICIARY_DATA', 'PROGRAM_MEL_INDICATORS'],
        securityProfiles: ['HUMANITARIAN_NEUTRALITY_STANDARDS', 'BENEFICIARY_PROTECTION_FRAMEWORK', 'UN_SANCTION_LIST_SCREENING']
      }
    ];

    const erpNode: EcosystemTaxonomyNode = {
      id: 'ERP_ECOSYSTEM',
      name: 'ERP Products (Institutional Operating Systems)',
      description: 'Comprehensive enterprise and institutional operating systems configured for organizational hierarchies, departments, and compliance.',
      icon: 'building-2',
      families: [
        {
          id: 'SOCIAL_INSTITUTIONS',
          name: 'Social, Academic & Faith Institutions',
          description: 'Educational campuses, healthcare clinics, alumni foundations, churches, and indigenous clan trusts.',
          domains: erpDomains.filter(d => ['EDUCATION', 'ALUMNI_ENDOWMENT', 'HEALTHCARE', 'HOSPITALITY_TOURISM', 'CHURCH_FAITH', 'CLAN_FAMILY', 'NGO_NONPROFIT'].includes(d.id))
        },
        {
          id: 'FINANCIAL_ENTERPRISES',
          name: 'Financial & Banking Institutions',
          description: 'Commercial banks, FinTech ecosystems, microfinance cooperatives, SACCOs, and investment trusts.',
          domains: erpDomains.filter(d => ['FINANCE_BANKING', 'FINTECH', 'MICROFINANCE_SACCO'].includes(d.id))
        },
        {
          id: 'INDUSTRIAL_INFRASTRUCTURE',
          name: 'Industrial, Public & Infrastructure Utilities',
          description: 'Government ministries, manufacturing plants, agribusiness, logistics, retail, construction, energy, and telecom.',
          domains: erpDomains.filter(d => ['AGRIBUSINESS', 'GOVERNMENT', 'MANUFACTURING', 'LOGISTICS_TRANSPORT', 'RETAIL_COMMERCE', 'CONSTRUCTION_REAL_ESTATE', 'ENERGY_UTILITIES', 'TELECOM_ISP'].includes(d.id))
        }
      ]
    };
    this.ecosystems.set('ERP_ECOSYSTEM', erpNode);
    erpDomains.forEach(d => this.domainLookup.set(d.id, { ecosystemId: 'ERP_ECOSYSTEM', domain: d }));

    // -------------------------------------------------------------------------
    // 2. JUMO COMMERCIAL PLATFORMS (Multi-tenant Digital Services & Marketplaces)
    // -------------------------------------------------------------------------
    const commercialDomains: DomainTaxonomyNode[] = [
      {
        id: 'DIGITAL_PAYMENTS',
        name: 'Digital Payments & Clearing Switch',
        description: 'Multi-party sovereign payment rail, merchant acquiring gateway, automated card switch, and QR checkout.',
        icon: 'credit-card',
        defaultEcosystemName: 'JUMO Sovereign Payment Switch & Merchant Gateway',
        subdomains: ['Card Switching & Processing', 'Instant QR & Contactless Payments', 'Merchant Multi-Currency Settlement', 'Cross-Border Remittance Clearing'],
        productTypes: ['Payment Switch Platform', 'Merchant Acquiring Gateway', 'Interbank Settlement Rail'],
        portals: ['Merchant Commercial Dashboard', 'FinTech Partner Developer Portal', 'Payment Operations Command Center', 'Dispute Resolution & Chargeback Desk'],
        departments: ['Merchant Services & Onboarding', 'Payment Routing & Switch Operations', 'Fraud Prevention & PCI Compliance', 'Financial Settlement & Escrow'],
        modules: ['High-Throughput ISO 8583 Switch', 'Merchant Dynamic Multi-Tier Pricing Engine', 'Automated Chargeback & Dispute Arbitrator', 'Real-Time FX Liquidity Pool Manager'],
        components: ['Live TPS Throughput & Latency Heatmap', 'Merchant Settlement Batch Summary', 'Fraud Score Alert Radar'],
        workflows: ['Merchant Self-Onboarding & Tier 1 KYC Flow', 'Instant Payment Settlement & Fee Split Workflow', 'Chargeback Arbitration & Reversal Workflow'],
        forms: ['Merchant Account & Settlement Bank Form', 'API Key Generation & Webhook Config Form', 'Chargeback Evidence Upload Form'],
        reports: ['Daily Switch Volume & Net Settlement Report', 'Interchange Revenue & Scheme Fee Breakdown', 'Merchant Processing Volume & Churn Statement'],
        aiCapabilities: ['Millisecond Fraud Transaction Predictor', 'Dynamic Lowest-Cost Payment Route Optimizer', 'Merchant Revenue & Cash-Flow Predictive Analyzer'],
        integrations: ['FAAP Sovereign Central Clearing Switch', 'Global Card Networks (Visa / Mastercard)', 'National Automated Clearing House (ACH)'],
        dataDomains: ['TRANSACTION_SWITCH_JOURNAL', 'MERCHANT_SETTLEMENT_ESCROW', 'API_KEY_ACCESS_TOKENS'],
        securityProfiles: ['PCI_DSS_LEVEL_1', 'FIPS_140_3_HSM_ENCRYPTED', 'ZERO_TRUST_MUTUAL_TLS']
      },
      {
        id: 'DIGITAL_MARKETPLACE',
        name: 'B2B & B2C Digital Commerce Marketplace',
        description: 'Multi-vendor digital product and commodity marketplace with automated escrow and rating systems.',
        icon: 'shopping-bag',
        defaultEcosystemName: 'JUMO Enterprise Multi-Vendor Marketplace',
        subdomains: ['B2B Wholesale Marketplace', 'B2C Retail Marketplace', 'Digital Assets & Service Marketplace', 'Commodity Exchange Trading Desk'],
        productTypes: ['Multi-Vendor Marketplace', 'Digital Product Storefront', 'Commodity B2B Platform'],
        portals: ['Vendor Seller Central Portal', 'Buyer Enterprise Procurement Portal', 'Marketplace Admin & Curation Console', 'Dispute & Trust Escrow Desk'],
        departments: ['Vendor Recruitment & Curation', 'Catalog Quality & Content Moderation', 'Marketplace Trust & Safety', 'Logistics & Fulfillment Operations'],
        modules: ['Vendor Onboarding & Tiered Commission Engine', 'Multi-Vendor Unified Cart & Order Splitter', 'Escrow Hold & Milestone Release Module', 'Review & Reputation Integrity Engine'],
        components: ['Vendor Sales & Payout Widget', 'Catalog Search with Faceted Filters', 'Order Escrow Status Tracker'],
        workflows: ['Vendor Application, Vetting & Storefront Approval Flow', 'Buyer Order Placement to Escrow Release Flow', 'Product Return & Dispute Refund Workflow'],
        forms: ['Vendor Store Registration & Tax Information Form', 'Product Listing & Inventory Creation Form', 'Buyer Return Merchandise Request Form'],
        reports: ['Gross Merchandise Value (GMV) & Take-Rate Report', 'Top Selling Categories & Vendor Ranking', 'Marketplace Escrow Float & Balance Audit'],
        aiCapabilities: ['Personalized Product Recommendation Engine', 'Visual Search & Duplicate Product Screener', 'Dynamic Seller Pricing & Demand Forecaster'],
        integrations: ['FAAP Escrow Settlement Engine', 'Global Logistics & Courier Tracking API', 'Automated Tax Calculation Engine'],
        dataDomains: ['MARKETPLACE_PRODUCT_CATALOG', 'VENDOR_COMMISSION_ACCOUNTS', 'ESCROW_ORDER_RECORDS'],
        securityProfiles: ['MERCHANT_DATA_ISOLATION', 'ESCROW_FUND_PROTECTION', 'SOC_2_COMPLIANT']
      },
      {
        id: 'AI_MARKETPLACE_SERVICES',
        name: 'AI Services & Cognitive Agent Marketplace',
        description: 'Commercial platform for discovering, licensing, provisioning, and billing sovereign AI specialist agents.',
        icon: 'bot',
        defaultEcosystemName: 'JUMO Sovereign AI Agent Hub & Capability Marketplace',
        subdomains: ['Cognitive Agent Store', 'Domain Fine-Tuned LLM Models', 'Enterprise Prompt & Workflow Blueprints', 'Autonomous Worker Leasing'],
        productTypes: ['AI Agent Marketplace', 'Model Licensing Platform', 'Cognitive Compute as a Service'],
        portals: ['Enterprise AI Consumer Portal', 'Agent Developer Studio & Submission Portal', 'AI Marketplace Governance Console', 'Token Metering & Billing Hub'],
        departments: ['Agent Certification & Benchmark Directorate', 'AI Developer Relations & Ecosystem', 'Token Economics & Pricing Strategy', 'Safety, Bias & Compliance Evaluation'],
        modules: ['Agent Discovery, Benchmark Scoring & Catalog', 'Dynamic Token Metering & Multi-Model Proxy', 'Pay-per-Inference & Monthly Agent Subscription', 'Agent Sandboxing & Zero-Data-Retention Enclave'],
        components: ['Agent Capability Badge & Benchmark Card', 'Real-Time Token Consumption & Cost Tracker', 'Interactive Agent Playground & Prompt Testbed'],
        workflows: ['Agent Submission, Benchmark Verification & Publishing Flow', 'Enterprise Agent License Purchase & Provisioning Flow', 'Agent Deprecation & Version Transition Workflow'],
        forms: ['Agent Developer Submission & License Form', 'Enterprise Token Quota Increase Request Form', 'Agent Performance Feedback & Issue Report Form'],
        reports: ['Marketplace AI Agent Usage & Revenue Share Statement', 'Model Latency, Token Throughput & Uptime Benchmark', 'Enterprise Cost Allocation by AI Specialty'],
        aiCapabilities: ['Autonomous Agent Capability Evaluator & Benchmark Tester', 'Semantic Search & Intent-Based Agent Matcher', 'Predictive Token Budget & Cost Optimizer'],
        integrations: ['FAAP AI Token Billing Rail', 'JUMO Sovereign Provider Fabric (Ollama / Gemini / Claude)', 'Docker / WebAssembly Isolated Agent Sandbox'],
        dataDomains: ['AGENT_CATALOG_REGISTRY', 'TOKEN_METERING_EVENTS', 'DEVELOPER_ROYALTY_LEDGER'],
        securityProfiles: ['ZERO_DATA_RETENTION_ENCLAVE', 'AIR_GAPPED_INFERENCE_OPTION', 'ENTERPRISE_API_KEY_RBAC']
      },
      {
        id: 'IDENTITY_TRUST_SERVICES',
        name: 'Sovereign Identity & Trust Platform',
        description: 'Decentralized identity verification, biometric authentication, digital signature PKI, and trust registry.',
        icon: 'shield-check',
        defaultEcosystemName: 'JUMO Sovereign Identity, PKI & Trust Platform',
        subdomains: ['National Digital ID & e-KYC', 'PKI Digital Signature & Timestamping', 'Decentralized Verifiable Credentials', 'Biometric Authentication as a Service'],
        productTypes: ['Identity as a Service (IDaaS)', 'Digital Signature Trust Service', 'Biometric Verification Platform'],
        portals: ['Citizen / User Identity Management Portal', 'Relying Party Enterprise Integration Portal', 'Trust Authority & Certificate Authority (CA) Console', 'Audit & Consent Revocation Hub'],
        departments: ['Identity Policy & Regulatory Compliance', 'Certificate Authority (CA) Operations', 'Biometric Algorithm & Liveness Engineering', 'Relying Party Support & Onboarding'],
        modules: ['FIPS-Grade Public Key Infrastructure (PKI)', 'Biometric Facial & Fingerprint Liveness Verification', 'OIDC / SAML / OAuth2 Multi-Tenant Identity Provider', 'Verifiable Credential Issuer & Cryptographic Verifier'],
        components: ['Identity Verification Status & Trust Level Badge', 'Active Session & Authenticator Device Grid', 'Digital Signature Document Previewer'],
        workflows: ['Citizen e-KYC Verification & Credential Issuance Flow', 'Document Multi-Party Cryptographic Signing Flow', 'Identity Revocation & Key Rotation Workflow'],
        forms: ['Relying Party Application Registration Form', 'User Identity Verification & Biometric Consent Form', 'Certificate Revocation Request Form'],
        reports: ['Identity Verification Volume & Success Rate Audit', 'Certificate Authority Issuance & Expiry Ledger', 'Security Incident & Unauthorized Access Log'],
        aiCapabilities: ['Deepfake & Presentation Attack Biometric Screener', 'Automated Document OCR & Security Feature Verifier', 'Behavioral Biometric Continuous Authentication'],
        integrations: ['FAAP Transaction Signing Rail', 'National Sovereign Biometric Database Bridge', 'Hardware Security Module (HSM) FIPS 140-3'],
        dataDomains: ['IDENTITY_CREDENTIAL_VAULT', 'PKI_CERTIFICATE_LEDGER', 'USER_CONSENT_AUDIT_LOGS'],
        securityProfiles: ['EIDAS_COMPLIANT', 'ISO_29115_LEVEL_4_TRUST', 'CRYPTOGRAPHIC_NON_REPUDIATION']
      }
    ];

    const commNode: EcosystemTaxonomyNode = {
      id: 'COMMERCIAL_PLATFORM',
      name: 'JUMO Commercial Platforms',
      description: 'Multi-tenant commercial digital platforms, payment clearing switches, marketplaces, and developer services operated by JUMO.',
      icon: 'globe',
      families: [
        {
          id: 'FINANCIAL_COMMERCE_PLATFORMS',
          name: 'Financial & Commerce Platforms',
          description: 'Payment switches, multi-vendor marketplaces, and trade finance platforms.',
          domains: commercialDomains.filter(d => ['DIGITAL_PAYMENTS', 'DIGITAL_MARKETPLACE'].includes(d.id))
        },
        {
          id: 'DIGITAL_SERVICES_PLATFORMS',
          name: 'AI & Trust Infrastructure Platforms',
          description: 'Sovereign AI agent marketplaces, decentralized identity services, and trust registries.',
          domains: commercialDomains.filter(d => ['AI_MARKETPLACE_SERVICES', 'IDENTITY_TRUST_SERVICES'].includes(d.id))
        }
      ]
    };
    this.ecosystems.set('COMMERCIAL_PLATFORM', commNode);
    commercialDomains.forEach(d => this.domainLookup.set(d.id, { ecosystemId: 'COMMERCIAL_PLATFORM', domain: d }));

    // -------------------------------------------------------------------------
    // 3. SOFTWARE PROGRAMS (Standalone Applications, APIs, Tools, Agentic Suites)
    // -------------------------------------------------------------------------
    const softwareDomains: DomainTaxonomyNode[] = [
      {
        id: 'WEB_MOBILE_APPS',
        name: 'Web, Mobile & Desktop Applications',
        description: 'Single-purpose client applications, cross-platform mobile apps, native desktop software, and PWAs.',
        icon: 'laptop',
        defaultEcosystemName: 'Autonomous Cross-Platform Application Suite',
        subdomains: ['Progressive Web Apps (PWA)', 'iOS & Android Native Mobile Apps', 'Desktop Utilities (Electron / Tauri)', 'Embedded Touchscreen Kiosks'],
        productTypes: ['Web Application', 'Mobile App', 'Desktop App', 'Kiosk Software'],
        portals: ['End-User Client Workspace', 'Application Admin Settings Console', 'Release Management & Update Channel Desk'],
        departments: ['Client Engineering Division', 'UX & Human Interface Engineering', 'Quality Assurance & Automated Testing'],
        modules: ['Offline Cache & Local SQLite Storage', 'Push Notification & Event Messaging Engine', 'Biometric Local Device Unlock Module', 'Dynamic Theme & White-Label Customizer'],
        components: ['Responsive Shell & Navigation Bar', 'Interactive Data Visualizer / Chart', 'Offline Synchronization Status Indicator'],
        workflows: ['User Onboarding & Permission Grant Flow', 'App Version Auto-Update & Migration Flow', 'Crash Report & Diagnostic Telemetry Flow'],
        forms: ['User Profile & Settings Form', 'Feedback & Issue Reporting Form', 'In-App Support Ticket Form'],
        reports: ['Daily Active Users (DAU) & Session Duration Report', 'Crash-Free Session Rate & Error Log', 'Feature Adoption & Funnel Analytics'],
        aiCapabilities: ['Client-Side On-Device Small Language Model (SLM)', 'Smart Autocomplete & Form Field Predictor', 'Automated Accessibility (A11y) Screen Reader Assistant'],
        integrations: ['Apple APNs & Google FCM Push Gateway', 'FAAP In-App Purchase Bridge', 'Sovereign OAuth2 / OIDC Auth Provider'],
        dataDomains: ['LOCAL_DEVICE_CACHE', 'USER_PREFERENCE_STORE', 'CLIENT_ANALYTICS_STREAM'],
        securityProfiles: ['DEVICE_SECURE_STORAGE', 'CERTIFICATE_PINNING', 'CODE_OBFUSCATION_STANDARDS']
      },
      {
        id: 'DEVELOPER_TOOLS_APIS',
        name: 'Developer Tools, SDKs & Headless APIs',
        description: 'Developer platforms, CLI toolchains, REST/gRPC backend microservices, SDK libraries, and middleware.',
        icon: 'terminal',
        defaultEcosystemName: 'Sovereign Developer Platform & API Gateway',
        subdomains: ['High-Performance REST/gRPC APIs', 'Software Development Kits (SDKs)', 'Command-Line Interface (CLI) Tools', 'Event Streaming Middleware'],
        productTypes: ['Headless API Service', 'Developer SDK Library', 'CLI Toolchain', 'Event Broker Service'],
        portals: ['Developer Documentation & Sandbox Portal', 'API Key & Rate Limit Management Hub', 'Telemetry & Distributed Tracing Cockpit'],
        departments: ['API & Platform Engineering', 'Developer Relations & Documentation', 'Infrastructure & Container Reliability'],
        modules: ['API Key Authentication & Rate Limiting Token Bucket', 'Automated OpenAPI 3.1 & SDK Generator', 'Distributed Tracing & OpenTelemetry Collector', 'Webhook Dispatch & Retry Queue Engine'],
        components: ['Interactive API Request/Response Swagger Console', 'Rate Limit Quota Consumption Gauge', 'Live Webhook Event Stream Log'],
        workflows: ['Developer Sign-up & API Key Generation Flow', 'API Version Deprecation & Migration Workflow', 'Incident Alert to On-Call Engineer Pager Flow'],
        forms: ['API Scope & Rate Limit Upgrade Request', 'Custom Webhook Endpoint Registration Form', 'Bug Bounty & Security Vulnerability Submission'],
        reports: ['API Latency P50/P95/P99 & Error Rate Summary', 'Developer Usage & Endpoint Hit Count Audit', 'SDK Download & Integration Analytics'],
        aiCapabilities: ['AI Code Generation & API Integration Copilot', 'Automated API Specification Anomaly Detector', 'Natural Language to SQL / GraphQL Query Synthesizer'],
        integrations: ['FAAP Developer Billing API', 'GitHub / GitLab CI/CD Pipeline', 'Prometheus & Grafana Telemetry Stream'],
        dataDomains: ['API_CALL_AUDIT_LOGS', 'DEVELOPER_ACCOUNT_KEYS', 'WEBHOOK_EVENT_QUEUES'],
        securityProfiles: ['MTLS_ZERO_TRUST', 'OWASP_API_TOP_10', 'HMAC_SHA256_WEBHOOK_SIGNING']
      },
      {
        id: 'AGENTIC_AUTOMATION',
        name: 'Agentic Systems & Workflow Automation',
        description: 'Multi-agent autonomous swarms, robotic process automation (RPA), data ingestion pipelines, and event choreographers.',
        icon: 'zap',
        defaultEcosystemName: 'Multi-Agent Autonomous Orchestration Suite',
        subdomains: ['Autonomous Multi-Agent Swarms', 'Robotic Process Automation (RPA)', 'ETL Data Pipelines & Ingestion', 'Event-Driven Workflow Choreography'],
        productTypes: ['Agentic Workflow System', 'Autonomous Background Worker', 'RPA Automation Bot'],
        portals: ['Workflow Builder & Agent Canvas Console', 'Execution History & Live Step Inspector', 'Human-in-the-Loop Approval Queue'],
        departments: ['Autonomous Systems Engineering', 'Workflow Design & Process Optimization', 'Model Governance & Safety Verification'],
        modules: ['Visual Directed Acyclic Graph (DAG) Engine', 'Autonomous Agent Step Execution Sandbox', 'Human-in-the-Loop Escalation & Approval Gateway', 'Dead-Letter Queue & Auto-Retry Resiliency Engine'],
        components: ['Interactive DAG Workflow Canvas', 'Live Agent Execution Step Progress Bar', 'Pending Human Approval Decision Card'],
        workflows: ['Automated Workflow Trigger to Multi-Agent Execution Flow', 'High-Risk Action Human Approval Escalation Flow', 'Execution Failure Auto-Remediation Workflow'],
        forms: ['Workflow Trigger Definition & Parameter Form', 'Human Approval Action & Reason Note Form', 'Agent Permission Grant & Scope Form'],
        reports: ['Workflow Execution Success & Mean Duration Report', 'Agent Resource & Token Consumption Audit', 'Human Approval Turnaround Time Statement'],
        aiCapabilities: ['Self-Refining Multi-Agent Task Planner & Solver', 'Automated Workflow Error Root Cause Analyzer', 'Predictive Process Bottleneck Detector'],
        integrations: ['FAAP Workflow Event Ledger', 'JUMO Sovereign Provider Fabric Registry', 'Enterprise Message Queue (Kafka / RabbitMQ)'],
        dataDomains: ['WORKFLOW_DAG_DEFINITIONS', 'STEP_EXECUTION_EVIDENCE', 'APPROVAL_AUDIT_TRAILS'],
        securityProfiles: ['STRICT_HUMAN_IN_THE_LOOP_POLICY', 'SANDBOX_CONTAINER_ISOLATION', 'FIPS_SIGNATURE_ON_STEPS']
      },
      {
        id: 'SECURITY_INFRASTRUCTURE',
        name: 'Security, Cryptography & Utility Software',
        description: 'FIPS cryptographic key vaults, intrusion detection engines, firewall governors, and system diagnostic utilities.',
        icon: 'shield',
        defaultEcosystemName: 'Sovereign Cryptographic Vault & Security Governor',
        subdomains: ['HSM Key Management & Encryption', 'Intrusion Detection & SOC Automation', 'Zero-Trust Policy Enforcement Governor', 'Backup & Disaster Recovery Utilities'],
        productTypes: ['Security Governor Software', 'Cryptographic Vault System', 'Diagnostic Utility Tool'],
        portals: ['Security Operations Center (SOC) Console', 'Cryptographic Key Lifecycle Dashboard', 'Access Policy & RBAC Governor Desk'],
        departments: ['Cybersecurity & Incident Response Team', 'Cryptographic Engineering Division', 'Infrastructure & Disaster Recovery'],
        modules: ['FIPS 140-3 Cryptographic Key Rotation Engine', 'Real-Time Threat Signature & Anomaly Screener', 'Role-Based & Attribute-Based Access Control (ABAC)', 'Automated Disaster Recovery Replication Engine'],
        components: ['Active Threat Level & Defense Status Meter', 'Cryptographic Key Expiry & Algorithm Matrix', 'Firewall Rule & Traffic Filter Table'],
        workflows: ['Master Encryption Key Rotation & Re-keying Flow', 'Security Incident Alert to Isolation Lockdown Flow', 'Disaster Recovery Automated Failover Flow'],
        forms: ['High-Security Clearance Request Form', 'Key Generation & Ceremony Authorization Form', 'Firewall Exception Rule Change Request'],
        reports: ['Daily SOC Threat Detection & Mitigation Report', 'Cryptographic Key Usage & Compliance Statement', 'Disaster Recovery RPO/RTO Drill Audit'],
        aiCapabilities: ['Autonomous Threat Hunting & Malware Signature AI', 'Zero-Day Vulnerability Predictive Screener', 'Automated Security Policy Conflict Solver'],
        integrations: ['Hardware Security Module (HSM)', 'FAAP Security Evidence Ledger', 'SIEM / Syslog Central Stream'],
        dataDomains: ['ENCRYPTED_KEY_VAULT_METADATA', 'SECURITY_INCIDENT_DOSSIERS', 'ACCESS_POLICY_DEFINITIONS'],
        securityProfiles: ['FIPS_140_3_LEVEL_4', 'DEFENSE_GRADE_AIR_GAP', 'TOP_SECRET_SOVEREIGN_CLEARANCE']
      }
    ];

    const softNode: EcosystemTaxonomyNode = {
      id: 'SOFTWARE_PROGRAM',
      name: 'Software Programs',
      description: 'Single-purpose client applications, developer SDKs, autonomous agentic systems, and security utility software.',
      icon: 'code',
      families: [
        {
          id: 'APPLICATIONS_DEVELOPER',
          name: 'Applications & Developer Toolchains',
          description: 'Client web/mobile apps, APIs, SDKs, and developer platforms.',
          domains: softwareDomains.filter(d => ['WEB_MOBILE_APPS', 'DEVELOPER_TOOLS_APIS'].includes(d.id))
        },
        {
          id: 'AGENTIC_SECURITY',
          name: 'Agentic Automation & Security Software',
          description: 'Multi-agent autonomous systems, RPA engines, cryptographic vaults, and security software.',
          domains: softwareDomains.filter(d => ['AGENTIC_AUTOMATION', 'SECURITY_INFRASTRUCTURE'].includes(d.id))
        }
      ]
    };
    this.ecosystems.set('SOFTWARE_PROGRAM', softNode);
    softwareDomains.forEach(d => this.domainLookup.set(d.id, { ecosystemId: 'SOFTWARE_PROGRAM', domain: d }));
  }

  // ---------------------------------------------------------------------------
  // Public Registry Query API
  // ---------------------------------------------------------------------------

  public static getEcosystems(): EcosystemTaxonomyNode[] {
    return Array.from(this.ecosystems.values());
  }

  public static getEcosystem(ecosystemId: ProductEcosystemId): EcosystemTaxonomyNode | undefined {
    return this.ecosystems.get(ecosystemId);
  }

  public static getDomainsForEcosystem(ecosystemId: ProductEcosystemId): DomainTaxonomyNode[] {
    const eco = this.ecosystems.get(ecosystemId);
    if (!eco) return [];
    const list: DomainTaxonomyNode[] = [];
    eco.families.forEach(f => list.push(...f.domains));
    return list;
  }

  public static getDomainDetails(domainId: string): { ecosystemId: ProductEcosystemId; domain: DomainTaxonomyNode } | undefined {
    return this.domainLookup.get(domainId);
  }

  public static getAvailableDomains(): Array<{ id: string; name: string; description: string; icon: string; ecosystemId: ProductEcosystemId; defaultEcosystem: string }> {
    const res: Array<{ id: string; name: string; description: string; icon: string; ecosystemId: ProductEcosystemId; defaultEcosystem: string }> = [];
    this.ecosystems.forEach((eco, ecoId) => {
      eco.families.forEach(f => {
        f.domains.forEach(d => {
          res.push({
            id: d.id,
            name: d.name,
            description: d.description,
            icon: d.icon,
            ecosystemId: ecoId,
            defaultEcosystem: d.defaultEcosystemName
          });
        });
      });
    });
    return res;
  }
}
