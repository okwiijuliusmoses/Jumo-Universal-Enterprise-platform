/**
 * JUMO SPECIFICATION COMPILER & ENTERPRISE REQUIREMENT ENGINE
 *
 * Authoritative specification engine for JUMO UEOS.
 * Compiles non-technical enterprise/product requirements into canonical JSON specifications
 * for automatic handoff to Architecture Studio and the 420+ Cognitive Engineering Workforce.
 */

export interface JumoEnterpriseEcosystem {
  id: string;
  name: string;
  category: 'Specialized Institutional' | 'Public & Sovereign' | 'Enterprise & Commercial' | 'Industrial & Infrastructure';
  description: string;
  organizationTypes: string[];
  recommendedCapabilities: string[];
  recommendedPortals: string[];
  recommendedModules: string[];
  recommendedWorkflows: string[];
}

export const SHARED_PLATFORM_FOUNDATION_COMPONENTS = [
  { name: 'UEOS Sovereign Core Kernel & Operating State', category: 'Sovereign Control', locked: true },
  { name: 'JUMO Identity Provider & Sovereign PKI', category: 'Identity & Access', locked: true },
  { name: 'AEGIS Zero-Trust Security Shield & HSM Vault', category: 'Security', locked: true },
  { name: 'FAAP / One JUMO Double-Entry Accounting Engine', category: 'Financial Foundation', locked: true },
  { name: 'JUMO Digital Pay & Financial Settlement Switch', category: 'Payments', locked: true },
  { name: 'JUMO Treasury & Sovereign Reserve System', category: 'Treasury', locked: true },
  { name: 'One Human Capital & Recruitment Foundation', category: 'Human Capital', locked: true },
  { name: 'One Unified Communications & Messaging Bus', category: 'Communications', locked: true },
  { name: 'One Multi-Tier Workflow & Rules Engine', category: 'Workflow', locked: true },
  { name: 'One Document & Archival Repository', category: 'Documents', locked: true },
  { name: 'Immutable Cryptographic Audit Engine', category: 'Audit & Compliance', locked: true },
  { name: 'Data Intelligence & Neural RAG Fabric', category: 'Intelligence', locked: true },
  { name: 'JUMO Cloud & Sovereign Infrastructure Mesh', category: 'Infrastructure', locked: true },
  { name: 'JUMO GPT & 420+ Cognitive Engineering Workforce', category: 'Cognition', locked: true },
  { name: 'Multi-Region Active Resilience & Disaster Recovery', category: 'Resilience', locked: true }
];

export const JUMO_ENTERPRISE_ECOSYSTEM_CATALOGUE: JumoEnterpriseEcosystem[] = [
  {
    id: 'eco-01-education',
    name: 'JUMO Education and Alumni ERP Ecosystem',
    category: 'Specialized Institutional',
    description: 'Comprehensive education administration, student lifecycle, academic records, alumni advancement, fees, accommodation and endowment platform.',
    organizationTypes: [
      'University',
      'College',
      'Technical/Vocational Institution',
      'Secondary School',
      'Primary School',
      'Education Authority',
      'Research Institution',
      'Training Organization',
      'Education Group / Multi-Campus Institution'
    ],
    recommendedPortals: ['Student Portal', 'Applicant Portal', 'Staff Portal', 'Management Portal', 'Alumni Portal', 'Parent/Guardian Portal'],
    recommendedCapabilities: [
      'Student Information System (SIS)',
      'Admissions & Enrollment Processing',
      'Academic Curriculum & Grading Management',
      'Student Fees & Billing Engine',
      'Scholarship & Financial Aid Management',
      'Student Accommodation & Hostel Logistics',
      'Alumni Advancement & Engagement',
      'Endowment & Fund Investment Management',
      'Research Grants & Publication Tracking',
      'General Ledger & Double-Entry Accounting',
      'Human Capital & Payroll Management'
    ],
    recommendedModules: ['Student Records', 'Admissions', 'Fee Billing', 'Alumni Advancement', 'Endowment', 'Library RAG', 'Timetabling'],
    recommendedWorkflows: ['Student Admission Approval', 'Scholarship Allocation', 'Grade Verification', 'Endowment Disbursement']
  },
  {
    id: 'eco-02-religious',
    name: 'JUMO Religious Institutions ERP Ecosystem',
    category: 'Specialized Institutional',
    description: 'Faith community administration, congregation records, clergy personnel, tithes, offerings, ministry logistics, events, tithe accounting and safeguarding.',
    organizationTypes: [
      'Church',
      'Mosque',
      'Temple',
      'Religious School',
      'Diocese / Province',
      'Synod',
      'Denomination',
      'Religious Headquarters',
      'Religious NGO',
      'Religious University',
      'Multi-Congregation Organization'
    ],
    recommendedPortals: ['Member / Congregation Portal', 'Clergy & Minister Portal', 'Administrator Portal', 'Finance & Tithes Portal', 'Volunteer Portal'],
    recommendedCapabilities: [
      'Membership & Congregation Directory',
      'Clergy & Religious Personnel Records',
      'Tithes, Offerings & Gift Aid Tracking',
      'Sacraments, Ceremonies & Worship Scheduling',
      'Ministries & Departmental Operations',
      'Endowment & Foundation Management',
      'Property, Temple & Asset Maintenance',
      'General Ledger & Double-Entry Accounting',
      'Volunteer Safeguarding & Compliance',
      'Human Capital & Payroll Management'
    ],
    recommendedModules: ['Member Registry', 'Tithe Accounting', 'Worship Scheduler', 'Clergy HR', 'Endowment', 'Safeguarding'],
    recommendedWorkflows: ['Member Onboarding', 'Tithe Verification', 'Event Approval', 'Safeguarding Clearance']
  },
  {
    id: 'eco-03-hospitality',
    name: 'JUMO Hospitality & Tourism ERP Ecosystem',
    category: 'Enterprise & Commercial',
    description: 'Hotel property management (PMS), resort operations, POS, reservations, guest loyalty, tours, event venues and hospitality group finance.',
    organizationTypes: [
      'Hotel',
      'Resort',
      'Lodge',
      'Restaurant Group',
      'Hospitality Group',
      'Travel Agency',
      'Tour Operator',
      'Tourism Authority',
      'Conference Centre',
      'Event Venue',
      'Airline / Travel Service',
      'Multi-property Hospitality Group'
    ],
    recommendedPortals: ['Guest / Customer Portal', 'Front Desk Operator Portal', 'Housekeeping Portal', 'Staff Portal', 'Supplier Portal', 'Executive Dashboard'],
    recommendedCapabilities: [
      'Property Management System (PMS) & Reservations',
      'Guest CRM & Loyalty Program',
      'Restaurant Point of Sale (POS) & Kitchen Display',
      'Housekeeping & Facility Maintenance',
      'Tour & Event Venue Booking Engine',
      'Revenue Management & Dynamic Pricing',
      'Inventory & Food/Beverage Supply Logistics',
      'General Ledger & Double-Entry Accounting',
      'Human Capital & Payroll Management'
    ],
    recommendedModules: ['Property Reservations', 'Guest PMS', 'Restaurant POS', 'Event Venues', 'Inventory', 'Revenue Engine'],
    recommendedWorkflows: ['Reservation Check-In', 'Housekeeping Task Dispatch', 'Supplier Order Approval', 'Event Contract Verification']
  },
  {
    id: 'eco-04-government',
    name: 'JUMO Government ERP Ecosystem',
    category: 'Public & Sovereign',
    description: 'Public sector administration, public fund accounting, Treasury FAAP integration, government procurement, agency HR and civil service operations.',
    organizationTypes: [
      'Ministry',
      'Government Agency',
      'Department',
      'Bureau',
      'Commission',
      'Public Authority',
      'State-Owned Enterprise'
    ],
    recommendedPortals: ['Citizen Portal', 'Staff Portal', 'Administrator Portal', 'Executive Dashboard', 'Agency Portal', 'Auditor & Compliance Portal'],
    recommendedCapabilities: [
      'Public Sector Fund Accounting & Budget Control',
      'FAAP Treasury Interconnect & Warrant Management',
      'Civil Service Personnel & Payroll Management',
      'Public Procurement & Contract Bidding',
      'Government Asset Lifecycle Tracking',
      'Sovereign Identity Gateway',
      'Immutable Cryptographic Audit Logging'
    ],
    recommendedModules: ['Fund Ledger', 'Budget Allocation', 'Civil Payroll', 'Public Procurement', 'Sovereign Identity', 'Audit Vault'],
    recommendedWorkflows: ['Warrant Approval Chain', 'Procurement Bidding Review', 'Payroll Certification', 'Audit Inspection']
  },
  {
    id: 'eco-05-national',
    name: 'JUMO National ERP Ecosystem',
    category: 'Public & Sovereign',
    description: 'Country-wide sovereign infrastructure grid uniting national ministries, central bank settlement, identity registries and public sector federation.',
    organizationTypes: ['National Government', 'Sovereign Secretariat', 'Federation of Agencies', 'National Council'],
    recommendedPortals: ['Citizen Sovereign Portal', 'National Command Centre', 'Ministerial Dashboard', 'Agency Gateway', 'SOC Security Portal'],
    recommendedCapabilities: [
      'Sovereign Core Control & Agency Federation',
      'National Citizen & Identity Registry',
      'Central Treasury & FAAP Interconnect',
      'National Payment Switch & Settlement',
      'Zero-Trust Sovereign Security Fortress'
    ],
    recommendedModules: ['National Registry', 'Sovereign Identity', 'FAAP Reserve Switch', 'National Command', 'AEGIS Shield'],
    recommendedWorkflows: ['National Budget Execution', 'Agency Federation Authorization', 'Security Threat Quarantine']
  },
  {
    id: 'eco-06-enterprise',
    name: 'JUMO Enterprise ERP Ecosystem',
    category: 'Enterprise & Commercial',
    description: 'Multi-branch corporate resource management, consolidation ledgers, corporate HR, procurement, supply chain and business intelligence.',
    organizationTypes: ['Corporation', 'Holding Company', 'Enterprise Group', 'Multinational Firm'],
    recommendedPortals: ['Employee Portal', 'Management Portal', 'Executive Dashboard', 'Supplier Portal', 'Customer Portal'],
    recommendedCapabilities: [
      'General Ledger & Multi-Entity Consolidation',
      'Enterprise Asset Lifecycle Management',
      'Procurement, Bidding & Requisitions',
      'Human Capital & Global Payroll',
      'Workflow & Process Automation'
    ],
    recommendedModules: ['General Ledger', 'Asset Manager', 'Procurement', 'Global Payroll', 'Workflow Engine'],
    recommendedWorkflows: ['Purchase Requisition Approval', 'Financial Period Close', 'Employee Onboarding']
  },
  {
    id: 'eco-07-financial',
    name: 'JUMO Financial ERP Ecosystem',
    category: 'Enterprise & Commercial',
    description: 'Financial services corporate management, regulatory ledger, treasury, investment accounting, compliance reporting and risk control.',
    organizationTypes: ['Financial Institution', 'Investment Firm', 'Microfinance Group', 'Fund Manager'],
    recommendedPortals: ['Executive Dashboard', 'Finance & Treasury Portal', 'Auditor & Compliance Portal', 'Risk Operations Portal'],
    recommendedCapabilities: [
      'Double-Entry Financial Ledger',
      'Treasury & Cash Flow Liquidity Engine',
      'Regulatory Compliance & KYC/AML Verification',
      'Risk Modeling & Portfolio Accounting',
      'Immutable Audit Logging'
    ],
    recommendedModules: ['Financial Ledger', 'Treasury Switch', 'AML Compliance', 'Risk Analytics', 'Audit Vault'],
    recommendedWorkflows: ['Treasury Transfer Approval', 'AML Alert Escalation', 'Regulatory Report Certification']
  },
  {
    id: 'eco-08-enterprise',
    name: 'JUMO Enterprise Operations Ecosystem',
    category: 'Enterprise & Commercial',
    description: 'Enterprise operations, resource planning, asset management, and cross-departmental coordination.',
    organizationTypes: ['Enterprise Corporation', 'Regional Hub', 'Service Provider'],
    recommendedPortals: ['Executive Portal', 'Operations Portal', 'Staff Portal'],
    recommendedCapabilities: [
      'Resource Planning & Operations',
      'Asset Management & Allocation',
      'Quality Control & Compliance',
      'Inventory Logistics'
    ],
    recommendedModules: ['Operations Control', 'Asset Management', 'Quality Gate', 'Inventory Logistics'],
    recommendedWorkflows: ['Work Order Release', 'Quality Inspection Approval', 'Asset Maintenance Alert']
  },
  {
    id: 'eco-09-commerce',
    name: 'JUMO Commerce ERP Ecosystem',
    category: 'Enterprise & Commercial',
    description: 'Retail & wholesale e-commerce, multi-store POS, inventory sync, order fulfillment, digital payments and customer loyalty.',
    organizationTypes: ['Retail Chain', 'Wholesale Distributor', 'E-commerce Group', 'Merchant Platform'],
    recommendedPortals: ['Customer Portal', 'Store Manager Portal', 'Warehouse Operator Portal', 'Executive Dashboard'],
    recommendedCapabilities: [
      'Multi-Store Point of Sale (POS)',
      'Omnichannel Inventory Synchronization',
      'Order Fulfillment & Dispatch Logistics',
      'Digital Payments & Checkout Switch',
      'Customer Loyalty & Promotion Engine'
    ],
    recommendedModules: ['Multi-Store POS', 'Omnichannel Inventory', 'Order Manager', 'Digital Pay', 'Loyalty Engine'],
    recommendedWorkflows: ['Order Dispatch', 'POS Shift Close', 'Refund Authorization']
  },
  {
    id: 'eco-10-supply-chain',
    name: 'JUMO Supply Chain ERP Ecosystem',
    category: 'Industrial & Infrastructure',
    description: 'End-to-end logistics, warehouse management (WMS), freight tracking, customs clearance, vendor portal and shipment routing.',
    organizationTypes: ['Logistics Provider', 'Warehouse Hub', 'Freight Forwarder', 'Distribution Network'],
    recommendedPortals: ['Vendor / Carrier Portal', 'Warehouse Operator Portal', 'Customs Portal', 'Executive Dashboard'],
    recommendedCapabilities: [
      'Warehouse Management System (WMS)',
      'Fleet & Freight Tracking Systems',
      'Customs Clearance & Documentation',
      'Supplier & Carrier Bidding Network',
      'Supply Chain Risk & Disruption RAG'
    ],
    recommendedModules: ['WMS Warehouse', 'Fleet Tracker', 'Customs Clearance', 'Carrier Network', 'Risk Monitor'],
    recommendedWorkflows: ['Shipment Clearance', 'Warehouse Receiving', 'Carrier Dispatch']
  },
  {
    id: 'eco-11-agriculture',
    name: 'JUMO Agriculture ERP Ecosystem',
    category: 'Specialized Institutional',
    description: 'Farm production management, cooperative crop collection, agri-processing, supply chain tracking, farmer payouts and soil/weather analytics.',
    organizationTypes: ['Agri-Business', 'Farming Cooperative', 'Produce Processor', 'Agricultural Board'],
    recommendedPortals: ['Farmer / Member Portal', 'Extension Officer Portal', 'Processing Facility Portal', 'Management Portal'],
    recommendedCapabilities: [
      'Farmer Directory & Crop Parcel Mapping',
      'Cooperative Produce Weigh-In & Quality Grading',
      'Automated Mobile Farmer Payout Engine',
      'Agricultural Input Supply & Distribution',
      'Weather & Crop Yield Intelligence'
    ],
    recommendedModules: ['Farmer Registry', 'Produce Grading', 'Farmer Mobile Pay', 'Input Store', 'Yield Analytics'],
    recommendedWorkflows: ['Produce Weigh-In Approval', 'Farmer Payout Dispatch', 'Input Requisition']
  },
  {
    id: 'eco-12-health',
    name: 'JUMO Health ERP Ecosystem',
    category: 'Specialized Institutional',
    description: 'Hospital management, electronic health records (EHR), pharmacy inventory, patient billing, medical appointments and laboratory diagnostics.',
    organizationTypes: ['Hospital', 'Clinic Network', 'Diagnostic Laboratory', 'Health Authority'],
    recommendedPortals: ['Patient Portal', 'Doctor / Clinician Portal', 'Nurse Portal', 'Pharmacy Portal', 'Hospital Admin Portal'],
    recommendedCapabilities: [
      'Electronic Health Records (EHR) & Diagnostics',
      'Outpatient & Inpatient Bed Management',
      'Pharmacy Inventory & Prescription Verification',
      'Medical Billing & Health Insurance Claims',
      'Patient Appointment & Triage Engine'
    ],
    recommendedModules: ['EHR Core', 'Bed Manager', 'Pharmacy WMS', 'Medical Billing', 'Clinical Triage'],
    recommendedWorkflows: ['Patient Triage Escalation', 'Prescription Verification', 'Insurance Claim Approval']
  },
  {
    id: 'eco-13-human-capital',
    name: 'JUMO Human Capital ERP Ecosystem',
    category: 'Enterprise & Commercial',
    description: 'Talent acquisition, recruitment, employee performance management, learning management, payroll, leave and workforce planning.',
    organizationTypes: ['HR Agency', 'Corporate HR Division', 'Recruitment Enterprise', 'Workforce Authority'],
    recommendedPortals: ['Applicant Portal', 'Employee Self-Service Portal', 'Manager Portal', 'HR Admin Portal'],
    recommendedCapabilities: [
      'Talent Acquisition & Applicant Tracking',
      'Automated Payroll & Tax Withholding',
      'Performance Appraisals & Goal Tracking',
      'Learning & Skill Certification Platform',
      'Workforce Scheduling & Timekeeping'
    ],
    recommendedModules: ['Applicant ATS', 'Global Payroll', 'Performance Appraisals', 'LMS Learning', 'Attendance Engine'],
    recommendedWorkflows: ['Job Offer Approval', 'Performance Review Signoff', 'Leave Approval']
  },
  {
    id: 'eco-14-transport',
    name: 'JUMO Transport & Logistics ERP Ecosystem',
    category: 'Industrial & Infrastructure',
    description: 'Fleet management, transit route scheduling, ticketers, cargo manifests, vehicle maintenance and transport authority oversight.',
    organizationTypes: ['Transit Authority', 'Bus/Rail Operator', 'Fleet Enterprise', 'Cargo Operator'],
    recommendedPortals: ['Passenger Portal', 'Driver / Conductor Portal', 'Fleet Inspector Portal', 'Control Centre Dashboard'],
    recommendedCapabilities: [
      'Fleet Telematics & Route Scheduling',
      'Digital Ticketing & Transit Fare Switch',
      'Vehicle Maintenance & Safety Inspection',
      'Cargo Manifest & Waybill Tracking',
      'Driver Licensing & Shift Roster'
    ],
    recommendedModules: ['Fleet Telematics', 'Transit Ticketing', 'Maintenance Workshop', 'Cargo Waybills', 'Roster Engine'],
    recommendedWorkflows: ['Safety Inspection Clearance', 'Fleet Dispatch', 'Fare Settlement']
  },
  {
    id: 'eco-15-infrastructure',
    name: 'JUMO Infrastructure & Property ERP Ecosystem',
    category: 'Industrial & Infrastructure',
    description: 'Real estate property management, tenant leasing, facilities maintenance, construction project management and asset valuations.',
    organizationTypes: ['Real Estate Developer', 'Property Management Firm', 'Infrastructure Board', 'Facility Management Corp'],
    recommendedPortals: ['Tenant Portal', 'Property Manager Portal', 'Contractor Portal', 'Executive Dashboard'],
    recommendedCapabilities: [
      'Tenant Lease & Rent Collection Engine',
      'Facilities Maintenance Work Orders',
      'Construction Project Budgeting & Milestones',
      'Property Asset Valuation & Depreciation',
      'Space Utilization & Energy Management'
    ],
    recommendedModules: ['Lease Engine', 'Facility Work Orders', 'Project Manager', 'Property Ledger', 'Space Analytics'],
    recommendedWorkflows: ['Lease Contract Approval', 'Maintenance Work Order Dispatch', 'Contractor Payment Release']
  },
  {
    id: 'eco-16-energy',
    name: 'JUMO Energy & Utilities ERP Ecosystem',
    category: 'Industrial & Infrastructure',
    description: 'Utility smart metering, grid operations, customer billing, outage management, renewable power generation and asset maintenance.',
    organizationTypes: ['Power Utility', 'Water Authority', 'Gas Enterprise', 'Renewable Energy Plant'],
    recommendedPortals: ['Consumer Utility Portal', 'Field Technician Portal', 'Grid Operator Portal', 'Executive Dashboard'],
    recommendedCapabilities: [
      'Smart Meter Data Management (MDM)',
      'Utility Consumer Billing & Tariff Switch',
      'Grid Outage & Incident Management',
      'Power Plant & Substation Asset Maintenance',
      'Environmental Compliance Reporting'
    ],
    recommendedModules: ['Meter Data Manager', 'Utility Billing', 'Outage Dispatch', 'Plant EAM', 'Compliance Vault'],
    recommendedWorkflows: ['Outage Incident Resolution', 'Tariff Revision Approval', 'High-Consumption Alert']
  },
  {
    id: 'eco-17-telecom',
    name: 'JUMO Telecommunications ERP Ecosystem',
    category: 'Industrial & Infrastructure',
    description: 'Telecom subscriber management, billing (BSS/OSS), SIM activation, network infrastructure management and partner interconnect.',
    organizationTypes: ['Mobile Network Operator', 'ISP Provider', 'Telecom Infrastructure Co', 'Satellite Operator'],
    recommendedPortals: ['Subscriber Portal', 'Dealer / Retailer Portal', 'NOC Operator Portal', 'Executive Dashboard'],
    recommendedCapabilities: [
      'Subscriber Management & SIM Provisioning',
      'Telecom Convergent Billing & Charging (BSS)',
      'Network Operations Centre (NOC) Monitoring',
      'Tower & Optical Fiber Asset Management',
      'Interconnect Carrier Settlement'
    ],
    recommendedModules: ['Subscriber BSS', 'SIM Provisioning', 'NOC Monitor', 'Tower EAM', 'Carrier Settlement'],
    recommendedWorkflows: ['Subscriber KYC Clearance', 'Network Incident Dispatch', 'Interconnect Invoice Settlement']
  },
  {
    id: 'eco-18-insurance',
    name: 'JUMO Insurance ERP Ecosystem',
    category: 'Enterprise & Commercial',
    description: 'Policy underwriting, claims processing, reinsurance, actuary modeling, broker portals and digital premium collection.',
    organizationTypes: ['Insurance Enterprise', 'Micro-Insurance Provider', 'Underwriting Agency', 'Reinsurance Group'],
    recommendedPortals: ['Policyholder Portal', 'Broker / Agent Portal', 'Claims Inspector Portal', 'Underwriter Dashboard'],
    recommendedCapabilities: [
      'Policy Lifecycle Underwriting Engine',
      'Automated Claims Processing & Inspection',
      'Premium Collection & Digital Pay Switch',
      'Reinsurance Accounting & Treaty Management',
      'Actuarial Analytics & Fraud Detection'
    ],
    recommendedModules: ['Underwriting Core', 'Claims Engine', 'Premium Switch', 'Reinsurance Ledger', 'Fraud Analytics'],
    recommendedWorkflows: ['Policy Underwriting Signoff', 'Claim Settlement Approval', 'Fraud Investigation Escalation']
  },
  {
    id: 'eco-19-cooperative',
    name: 'JUMO Cooperative & SACCO ERP Ecosystem',
    category: 'Specialized Institutional',
    description: 'SACCO member savings, share capital, micro-loans, dividend distribution, mobile money deposits and cooperative auditing.',
    organizationTypes: ['Savings & Credit Cooperative (SACCO)', 'Farmers Cooperative', 'Housing Cooperative', 'Union'],
    recommendedPortals: ['Member Mobile Portal', 'Teller / Cashier Portal', 'Credit Officer Portal', 'Audit & Board Dashboard'],
    recommendedCapabilities: [
      'Member Share Capital & Savings Ledger',
      'Loan Application, Appraisal & Disbursement',
      'Mobile Money Deposit & Withdrawal Switch',
      'Dividend Calculation & Distribution',
      'Cooperative Regulatory Audit Compliance'
    ],
    recommendedModules: ['Savings Ledger', 'Loan Manager', 'Mobile Pay Switch', 'Dividend Engine', 'Audit Reporter'],
    recommendedWorkflows: ['Loan Appraisal Approval', 'Mobile Withdrawal Clearance', 'Dividend Distribution Release']
  },
  {
    id: 'eco-20-ngo',
    name: 'JUMO NGO & Development ERP Ecosystem',
    category: 'Specialized Institutional',
    description: 'Nonprofit grant management, donor funding tracking, humanitarian aid distribution, project field monitoring and NGO compliance.',
    organizationTypes: ['International NGO', 'Development Agency', 'Charitable Foundation', 'Humanitarian Mission'],
    recommendedPortals: ['Donor Portal', 'Field Officer Portal', 'Beneficiary Portal', 'NGO Leadership Dashboard'],
    recommendedCapabilities: [
      'Donor Grant Accounting & Fund Allocation',
      'Field Project Monitoring & Impact Analytics',
      'Beneficiary Verification & Aid Distribution',
      'Procurement & Emergency Relief Supply',
      'Donor Compliance & Transparency Reporting'
    ],
    recommendedModules: ['Grant Accounting', 'Project Field Tracker', 'Beneficiary Aid', 'Emergency Relief', 'Donor Compliance'],
    recommendedWorkflows: ['Grant Disbursement Approval', 'Aid Distribution Verification', 'Donor Report Signoff']
  },
  {
    id: 'eco-21-legal',
    name: 'JUMO Legal & Compliance ERP Ecosystem',
    category: 'Enterprise & Commercial',
    description: 'Law firm case management, court filing, regulatory compliance tracking, contract lifecycle management (CLM) and legal billing.',
    organizationTypes: ['Law Firm', 'Corporate Legal Department', 'Regulatory Authority', 'Judicial Secretariat'],
    recommendedPortals: ['Client Portal', 'Attorney Portal', 'Compliance Officer Portal', 'Court Registrar Portal'],
    recommendedCapabilities: [
      'Legal Case & Matter Lifecycle Tracking',
      'Contract Lifecycle Management (CLM)',
      'Attorney Billable Hours & Retainer Billing',
      'Regulatory Compliance Audit Tracking',
      'Secure Document Vault & Digital Signatures'
    ],
    recommendedModules: ['Matter Tracker', 'CLM Contracts', 'Legal Billing', 'Compliance Audit', 'Document Vault'],
    recommendedWorkflows: ['Contract Execution Approval', 'Case Milestone Filing', 'Compliance Alert Escalation']
  },
  {
    id: 'eco-22-procurement',
    name: 'JUMO Procurement & Contracting Ecosystem',
    category: 'Public & Sovereign',
    description: 'Sovereign public procurement, e-tendering, supplier evaluation, contract awarding, bid security and public expenditure tracking.',
    organizationTypes: ['Procurement Authority', 'Tender Board', 'Corporate Sourcing Group'],
    recommendedPortals: ['Bidding Supplier Portal', 'Procurement Officer Portal', 'Tender Committee Portal', 'Public Oversight Portal'],
    recommendedCapabilities: [
      'E-Tendering & Sealed Bid Submission',
      'Supplier Qualification & Performance Rating',
      'Contract Awarding & Milestone Management',
      'Bid Security & Guarantee Vault',
      'Public Expenditure Anti-Fraud Monitoring'
    ],
    recommendedModules: ['E-Tendering Engine', 'Supplier Rating', 'Contract Award', 'Bid Guarantee Vault', 'Anti-Fraud Monitor'],
    recommendedWorkflows: ['Tender Specification Release', 'Sealed Bid Opening', 'Contract Award Signoff']
  },
  {
    id: 'eco-23-smart-city',
    name: 'JUMO Smart City / Municipal ERP Ecosystem',
    category: 'Public & Sovereign',
    description: 'City municipal governance, property rates, trade licensing, waste management, municipal permits and urban infrastructure IoT.',
    organizationTypes: ['City Council', 'Municipal Authority', 'Urban Development Corporation', 'Town Board'],
    recommendedPortals: ['Citizen City Portal', 'Business Licensing Portal', 'Municipal Inspector Portal', 'Mayor & Council Dashboard'],
    recommendedCapabilities: [
      'Municipal Property Rates & Valuation',
      'Business Trade License & Permit Issuance',
      'Municipal Waste & Service Delivery Logistics',
      'Building Plan Submission & Inspection',
      'City IoT Sensors & Traffic Management'
    ],
    recommendedModules: ['Property Rates', 'Trade Licenses', 'Building Permits', 'Waste Logistics', 'City IoT Mesh'],
    recommendedWorkflows: ['Building Permit Approval', 'Trade License Clearance', 'Inspection Dispatch']
  },
  {
    id: 'eco-24-research',
    name: 'JUMO Research & Innovation Ecosystem',
    category: 'Specialized Institutional',
    description: 'Scientific research hub, laboratory notebook tracking, HPC compute scheduling, IP patent management and research grant funds.',
    organizationTypes: ['Research Institute', 'Innovation Hub', 'Laboratory Complex', 'Scientific Foundation'],
    recommendedPortals: ['Researcher Portal', 'Lab Operator Portal', 'Grant Reviewer Portal', 'Director Dashboard'],
    recommendedCapabilities: [
      'Electronic Lab Notebook (ELN) & Data Vault',
      'HPC Scientific Compute Scheduling',
      'IP Patent & Invention Disclosure Tracking',
      'Research Grant Funding & Expenditure',
      'Peer Review & Publication Repository'
    ],
    recommendedModules: ['ELN Notebook', 'Compute Scheduler', 'IP Patent Vault', 'Grant Accounting', 'RAG Repository'],
    recommendedWorkflows: ['Invention Disclosure Review', 'Grant Application Approval', 'Compute Job Allocation']
  },
  {
    id: 'eco-25-digital-gov-services',
    name: 'JUMO Digital Government Services Ecosystem',
    category: 'Public & Sovereign',
    description: 'Citizen e-services, passport/license processing, civil registration (births, deaths, marriages), public service queue and digital identity.',
    organizationTypes: ['Digital Government Agency', 'Civil Registration Bureau', 'E-Services Authority'],
    recommendedPortals: ['Citizen Self-Service Portal', 'Service Counter Operator Portal', 'Agency Director Dashboard'],
    recommendedCapabilities: [
      'Civil Status Registration (Births, Deaths, Marriages)',
      'Passport, License & ID Application Processing',
      'Public Service Queue & Appointment Manager',
      'Citizen Digital Wallet & Identity Credentials',
      'Multi-Agency Interoperability Bus'
    ],
    recommendedModules: ['Civil Registry', 'Document Processing', 'Queue Manager', 'Citizen Wallet', 'Interop Bus'],
    recommendedWorkflows: ['Passport Issue Approval', 'Civil Status Registration', 'Document Verification']
  },
  {
    id: 'eco-26-enterprise-banking',
    name: 'JUMO Enterprise Banking & Financial Services Ecosystem',
    category: 'Enterprise & Commercial',
    description: 'Core banking platform, deposit accounts, credit lines, interbank settlement, SWIFT/ISO20022 gateway, treasury and loan origination.',
    organizationTypes: ['Commercial Bank', 'Development Bank', 'Central Bank Division', 'Neobank'],
    recommendedPortals: ['Banking Customer Portal', 'Teller / Branch Portal', 'Credit Risk Officer Portal', 'Executive Dashboard'],
    recommendedCapabilities: [
      'Core Banking Account Ledger & Deposits',
      'Loan Origination & Credit Scoring Engine',
      'ISO 20022 / Interbank Payment Switch',
      'Treasury Liquidity & Reserve Accounting',
      'Regulatory Central Bank Compliance Reporting'
    ],
    recommendedModules: ['Core Banking Ledger', 'Loan Origination', 'ISO 20022 Switch', 'Treasury Core', 'Regulatory Vault'],
    recommendedWorkflows: ['Loan Disbursement Signoff', 'High-Value Transfer Approval', 'AML Audit Escalation']
  },
  {
    id: 'eco-27-industrial',
    name: 'JUMO Industrial & Engineering Ecosystem',
    category: 'Industrial & Infrastructure',
    description: 'Heavy engineering project management, EPC contracting, CAD/BIM document repository, safety compliance and equipment logistics.',
    organizationTypes: ['Engineering Contractor (EPC)', 'Construction Firm', 'Industrial Plant Builder', 'Mining Enterprise'],
    recommendedPortals: ['Site Engineer Portal', 'Subcontractor Portal', 'Safety Inspector Portal', 'Executive Dashboard'],
    recommendedCapabilities: [
      'EPC Project Milestone & Cost Control',
      'CAD / BIM Blueprint & Document Management',
      'Heavy Equipment & Plant Logistics',
      'Site Health, Safety & Environment (HSE)',
      'Subcontractor Bidding & Valuations'
    ],
    recommendedModules: ['EPC Milestones', 'BIM Vault', 'Equipment Logistics', 'HSE Safety Gate', 'Subcontractor Ledger'],
    recommendedWorkflows: ['Site Safety Clearance', 'Milestone Completion Signoff', 'Equipment Dispatch']
  },
  {
    id: 'eco-28-media',
    name: 'JUMO Media & Communications Ecosystem',
    category: 'Enterprise & Commercial',
    description: 'Broadcasting media asset management (MAM), digital publishing, advertising rights, royalty accounting and content distribution.',
    organizationTypes: ['Broadcasting Network', 'Media House', 'Digital Publisher', 'Entertainment Enterprise'],
    recommendedPortals: ['Content Creator Portal', 'Advertiser Portal', 'Station Operator Portal', 'Executive Dashboard'],
    recommendedCapabilities: [
      'Media Asset Management (MAM) & Metadata',
      'Advertising Airtime Scheduling & Billing',
      'Content Licensing & Royalty Accounting',
      'Omnichannel Content Streaming Dispatch',
      'Audience Analytics & Engagement RAG'
    ],
    recommendedModules: ['MAM Vault', 'Ad Scheduler', 'Royalty Engine', 'Stream Dispatcher', 'Audience Analytics'],
    recommendedWorkflows: ['Content Broadcast Approval', 'Royalty Payout Release', 'Ad Campaign Clearance']
  },
  {
    id: 'eco-29-security-resilience',
    name: 'JUMO Security & Resilience Ecosystem',
    category: 'Public & Sovereign',
    description: 'Cybersecurity SOC platform, threat intelligence, disaster recovery node management, emergency response dispatch and audit compliance.',
    organizationTypes: ['National Cyber Authority', 'Security Operations Center (SOC)', 'Emergency Response Agency'],
    recommendedPortals: ['SOC Security Guardian Portal', 'Incident Commander Portal', 'Executive Dashboard'],
    recommendedCapabilities: [
      'Security Operations Center (SOC) Incident Engine',
      'Sovereign Threat Intelligence & Quarantine',
      'Zero-Trust Network Access & ABAC Control',
      'Disaster Recovery Air-Gap Synchronization',
      'Cryptographic Evidence Chain'
    ],
    recommendedModules: ['SOC Engine', 'Threat Quarantine', 'Zero-Trust Gate', 'DR Air-Gap', 'Evidence Chain'],
    recommendedWorkflows: ['Threat Quarantine Authorization', 'Disaster Failover Trigger', 'Security Breach Escalation']
  },
  {
    id: 'eco-30-professional-services',
    name: 'JUMO Professional Services ERP Ecosystem',
    category: 'Enterprise & Commercial',
    description: 'Consulting, accounting firm, IT services, project timekeeping, billable expenses, resource allocation and client invoicing.',
    organizationTypes: ['Consulting Firm', 'IT Services Enterprise', 'Accounting Practice', 'Agency'],
    recommendedPortals: ['Client Portal', 'Consultant Portal', 'Resource Manager Portal', 'Finance Dashboard'],
    recommendedCapabilities: [
      'Project Resource Allocation & Utilization',
      'Timesheet & Billable Expense Tracking',
      'Client Contract & Milestone Invoicing',
      'Knowledge RAG & Document Repository',
      'General Ledger & Profitability Analytics'
    ],
    recommendedModules: ['Resource Planner', 'Timesheet Engine', 'Client Billing', 'Knowledge RAG', 'Ledger Analytics'],
    recommendedWorkflows: ['Timesheet Signoff', 'Invoice Release Approval', 'Project Milestone Verification']
  },
  {
    id: 'eco-31-multi-enterprise',
    name: 'JUMO Multi-Enterprise Group Ecosystem',
    category: 'Enterprise & Commercial',
    description: 'Conglomerate umbrella platform uniting diverse subsidiary companies under one sovereign JUMO platform foundation with inter-company elimination.',
    organizationTypes: ['Conglomerate', 'Holding Group', 'Diversified Industrial Group', 'Sovereign Sovereign Investment Group'],
    recommendedPortals: ['Group Executive Dashboard', 'Subsidiary CEO Portal', 'Group Audit & Treasury Portal'],
    recommendedCapabilities: [
      'Inter-Company Settlement & Elimination Ledger',
      'Multi-Subsidiary Financial Consolidation',
      'Group Treasury & Cash Liquidity Pool',
      'Cross-Subsidiary HR & Talent Mobility',
      'Centralized Sovereign Security Governance'
    ],
    recommendedModules: ['Group Consolidation', 'Inter-Company Switch', 'Group Treasury Pool', 'Global Talent Mobility', 'AEGIS Shield'],
    recommendedWorkflows: ['Inter-Company Settlement Signoff', 'Group Treasury Allocation', 'Subsidiary Budget Authorization']
  }
];


export type ProductFamilyId =
  | 'ENTERPRISE_MANAGEMENT'
  | 'GOVERNMENT_DIGITAL_PLATFORM'
  | 'COMMERCIAL_PRODUCTS'
  | 'JUMO_PLATFORM_PRODUCTS'
  | 'RESEARCH_AND_INNOVATION'
  | 'CUSTOM_PRODUCT';

export type ProductGradeId =
  | 'ESSENTIAL'
  | 'STANDARD'
  | 'PROFESSIONAL'
  | 'ENTERPRISE'
  | 'ENTERPRISE_PLUS'
  | 'GOVERNMENT'
  | 'NATIONAL'
  | 'SOVEREIGN'
  | 'MISSION_CRITICAL'
  | 'CUSTOM';

export interface ProductFamilyDefinition {
  id: ProductFamilyId;
  name: string;
  description: string;
  types: string[];
}

export const PRODUCT_FAMILIES: ProductFamilyDefinition[] = [
  {
    id: 'ENTERPRISE_MANAGEMENT',
    name: 'A. ENTERPRISE MANAGEMENT',
    description: 'Core organizational resource planning, financial, human capital, and operational governance suites.',
    types: [
      'General Enterprise ERP',
      'Government ERP',
      'Financial ERP',
      'Human Capital Management (HCM)',
      'Procurement & Sourcing Management',
      'Supply Chain Management (SCM)',
      'Enterprise Asset Management',
      'Project & Program Management',
      'Customer Relationship Management (CRM)',
      'Document & Records Management',
      'Workflow & Process Automation',
      'Enterprise Content Management (ECM)',
      'Enterprise Resource Planning Suite'
    ]
  },
  {
    id: 'GOVERNMENT_DIGITAL_PLATFORM',
    name: 'B. GOVERNMENT DIGITAL PLATFORM',
    description: 'Sovereign, agency, national registry, citizen service, and public administration digital systems.',
    types: [
      'National Digital Government Platform',
      'Citizen Services Platform',
      'Government Agency Platform',
      'Ministry Platform',
      'Public Administration Platform',
      'National Registry Platform',
      'Digital Identity Platform',
      'Government Service Delivery Platform',
      'National Payments Platform',
      'Government Data Exchange Platform'
    ]
  },
  {
    id: 'COMMERCIAL_PRODUCTS',
    name: 'C. COMMERCIAL PRODUCTS',
    description: 'Marketplace, B2B/B2C SaaS, FinTech, commerce, logistics, and domain-specific commercial platforms.',
    types: [
      'FinTech Product',
      'Banking Platform',
      'Payment Platform',
      'Commercial Marketplace',
      'E-commerce Platform',
      'Logistics Platform',
      'Insurance Platform',
      'Telecom Platform',
      'Healthcare Product',
      'Education Product',
      'Enterprise Product',
      'Hospitality Product',
      'Property Platform',
      'Mobility Platform',
      'SaaS Product',
      'AI Product',
      'Security Product',
      'Data & Analytics Product',
      'Custom Commercial Product'
    ]
  },
  {
    id: 'JUMO_PLATFORM_PRODUCTS',
    name: 'D. JUMO PLATFORM PRODUCTS',
    description: 'Native JUMO infrastructure, financial switches, identity, RAG, and automation building blocks.',
    types: [
      'JUMO Digital Pay',
      'FAAP Treasury',
      'Identity Provider',
      'AI Cognition Platform',
      'Automation Engine',
      'Data Intelligence Fabric',
      'Digital Twin Engine',
      'IoT Mesh Gateway',
      'Knowledge & RAG Studio',
      'API Management Platform',
      'Security & Shield Platform',
      'Developer Platform',
      'Marketplace Platform',
      'Infrastructure Fabric'
    ]
  },
  {
    id: 'RESEARCH_AND_INNOVATION',
    name: 'E. RESEARCH & INNOVATION',
    description: 'Scientific computing, AI research, simulation modeling, and experimental engineering hubs.',
    types: [
      'Research Platform',
      'Scientific Computing Hub',
      'AI Research Laboratory',
      'Simulation & Modeling System',
      'Digital Twin Research Engine',
      'Experimental Platform',
      'Custom Research System'
    ]
  },
  {
    id: 'CUSTOM_PRODUCT',
    name: 'F. CUSTOM PRODUCT',
    description: 'Tailored, highly specialized sovereign or commercial software applications.',
    types: [
      'Custom Enterprise Platform',
      'Custom Sovereign System',
      'Specialized Domain Engine',
      'Hybrid Platform Architecture'
    ]
  }
];

export interface RequirementProfile {
  availabilityTarget: string;
  auditLevel: string;
  scalingModel: string;
  zeroTrust: boolean;
  dataResidencyRequired: boolean;
  hsmRequired: boolean;
  airGapCapable: boolean;
  failoverType: string;
  drRto: string;
  drRpo: string;
  recommendedInfrastructure: string[];
}

export const GRADE_REQUIREMENT_PROFILES: Record<ProductGradeId, RequirementProfile> = {
  ESSENTIAL: {
    availabilityTarget: '99.5%',
    auditLevel: 'Basic Log Storage',
    scalingModel: 'Single Region Auto-Scale',
    zeroTrust: false,
    dataResidencyRequired: false,
    hsmRequired: false,
    airGapCapable: false,
    failoverType: 'Manual Active-Passive',
    drRto: '24 Hours',
    drRpo: '1 Hour',
    recommendedInfrastructure: ['JUMO Standard Cloud Container', 'Relational Database', 'Encrypted Storage']
  },
  STANDARD: {
    availabilityTarget: '99.9%',
    auditLevel: 'Standard Audit Trail',
    scalingModel: 'Horizontal Auto-Scaling',
    zeroTrust: false,
    dataResidencyRequired: false,
    hsmRequired: false,
    airGapCapable: false,
    failoverType: 'Automated Active-Passive',
    drRto: '4 Hours',
    drRpo: '15 Minutes',
    recommendedInfrastructure: ['JUMO Sovereign Cloud', 'HA Relational Cluster', 'Object Storage', 'Redis Cache']
  },
  PROFESSIONAL: {
    availabilityTarget: '99.95%',
    auditLevel: 'Immutable Structured Audit',
    scalingModel: 'Multi-Zone Elastic Scaling',
    zeroTrust: true,
    dataResidencyRequired: true,
    hsmRequired: false,
    airGapCapable: false,
    failoverType: 'Automated Multi-AZ Failover',
    drRto: '1 Hour',
    drRpo: '5 Minutes',
    recommendedInfrastructure: ['JUMO Enterprise Cluster', 'HA PostgreSQL/Cloud SQL', 'Redis Sentinel', 'API Gateway']
  },
  ENTERPRISE: {
    availabilityTarget: '99.99%',
    auditLevel: 'Cryptographic Immutable Audit',
    scalingModel: 'Multi-Region High Throughput',
    zeroTrust: true,
    dataResidencyRequired: true,
    hsmRequired: true,
    airGapCapable: false,
    failoverType: 'Active-Active Multi-Region',
    drRto: '15 Minutes',
    drRpo: 'Zero (Sync Replication)',
    recommendedInfrastructure: ['JUMO Multi-Region Mesh', 'Distributed Sovereign Database', 'HSM Vault', 'WAF & Shield']
  },
  ENTERPRISE_PLUS: {
    availabilityTarget: '99.99%',
    auditLevel: 'Zero-Leak Cryptographic Audit',
    scalingModel: 'Multi-Region Elastic Fabric',
    zeroTrust: true,
    dataResidencyRequired: true,
    hsmRequired: true,
    airGapCapable: true,
    failoverType: 'Active-Active Synchronous',
    drRto: '5 Minutes',
    drRpo: 'Zero',
    recommendedInfrastructure: ['JUMO Sovereign Private Grid', 'Distributed Global Ledger', 'Sovereign HSM', 'DDoS Fortress']
  },
  GOVERNMENT: {
    availabilityTarget: '99.99%',
    auditLevel: 'National Security Regulatory Audit',
    scalingModel: 'National Agency Federation',
    zeroTrust: true,
    dataResidencyRequired: true,
    hsmRequired: true,
    airGapCapable: true,
    failoverType: 'Sovereign Multi-Zone Failover',
    drRto: '15 Minutes',
    drRpo: 'Zero',
    recommendedInfrastructure: ['JUMO Government Cloud', 'Sovereign Key Manager', 'Agency Gateway', 'Audit Fortress']
  },
  NATIONAL: {
    availabilityTarget: '99.995%',
    auditLevel: 'Sovereign Chain-of-Custody Audit',
    scalingModel: 'National Infrastructure Grid',
    zeroTrust: true,
    dataResidencyRequired: true,
    hsmRequired: true,
    airGapCapable: true,
    failoverType: 'Active-Active Sovereign Nodes',
    drRto: '1 Minute',
    drRpo: 'Zero',
    recommendedInfrastructure: ['JUMO National Sovereign Cloud', 'FAAP Reserve Interconnect', 'National HSM Network']
  },
  SOVEREIGN: {
    availabilityTarget: '99.999%',
    auditLevel: 'Air-Gapped Cryptographic Evidence',
    scalingModel: 'Air-Gapped Sovereign Cluster',
    zeroTrust: true,
    dataResidencyRequired: true,
    hsmRequired: true,
    airGapCapable: true,
    failoverType: 'Dual Air-Gapped Hot Swap',
    drRto: 'Near-Zero (<1m)',
    drRpo: 'Zero',
    recommendedInfrastructure: ['Sovereign Air-Gapped Data Center', 'Dedicated Hardware HSM', 'Sovereign Ledger']
  },
  MISSION_CRITICAL: {
    availabilityTarget: '99.999%',
    auditLevel: 'Real-Time Continuous Verification',
    scalingModel: 'Massively Redundant Cluster',
    zeroTrust: true,
    dataResidencyRequired: true,
    hsmRequired: true,
    airGapCapable: true,
    failoverType: 'Zero-Downtime Continuous Failover',
    drRto: 'Zero (Instantaneous)',
    drRpo: 'Zero',
    recommendedInfrastructure: ['JUMO Mission-Critical Core', 'Triple-Redundant Datacenter', 'Hardware Lock']
  },
  CUSTOM: {
    availabilityTarget: 'Target Dependent',
    auditLevel: 'Custom Configured',
    scalingModel: 'Custom Model',
    zeroTrust: true,
    dataResidencyRequired: true,
    hsmRequired: false,
    airGapCapable: false,
    failoverType: 'Custom Failover Strategy',
    drRto: 'Custom',
    drRpo: 'Custom',
    recommendedInfrastructure: ['Custom Hybrid Fabric']
  }
};

export interface ScaleCapacityProfile {
  expectedUsers: string;
  concurrentUsers: string;
  transactionsPerSecond: number;
  peakTransactionsPerSecond: number;
  dataVolumeGb: number;
  apiRequestsPerMin: number;
  geographicCoverage: string;
  tenantModel: string;
  annualDataGrowthGb: number;
}

export interface ServiceLevelProfile {
  availabilityProfile: string;
  targetAvailability: string;
  rtoTarget: string;
  rpoTarget: string;
  failoverStrategy: string;
  regionalRedundancy: string;
  backupFrequency: string;
  maintenanceWindow: string;
}

export interface PortalRequirement {
  id: string;
  name: string;
  category: string;
  derivedRoles: string[];
  derivedApis: string[];
  securityClearance: string;
}

export const PORTAL_CATALOGUE: PortalRequirement[] = [
  { id: 'p-pub', name: 'Public Portal', category: 'External', derivedRoles: ['Public User', 'Guest'], derivedApis: ['GET /api/public/services', 'POST /api/public/enquiry'], securityClearance: 'PUBLIC' },
  { id: 'p-cit', name: 'Citizen Portal', category: 'External', derivedRoles: ['Verified Citizen'], derivedApis: ['GET /api/citizen/identity', 'POST /api/citizen/application'], securityClearance: 'CITIZEN' },
  { id: 'p-cust', name: 'Customer Portal', category: 'External', derivedRoles: ['Customer', 'Account Owner'], derivedApis: ['GET /api/customer/account', 'POST /api/customer/orders'], securityClearance: 'CUSTOMER' },
  { id: 'p-emp', name: 'Employee / Staff Portal', category: 'Internal', derivedRoles: ['Staff Member', 'Supervisor'], derivedApis: ['GET /api/staff/tasks', 'POST /api/staff/actions'], securityClearance: 'STAFF' },
  { id: 'p-adm', name: 'Administrator Portal', category: 'Internal', derivedRoles: ['System Administrator'], derivedApis: ['GET /api/admin/config', 'POST /api/admin/users'], securityClearance: 'ADMIN' },
  { id: 'p-exec', name: 'Executive Dashboard', category: 'Internal', derivedRoles: ['Executive', 'Minister', 'Director'], derivedApis: ['GET /api/executive/analytics', 'GET /api/executive/reports'], securityClearance: 'EXECUTIVE' },
  { id: 'p-agency', name: 'Agency / Department Portal', category: 'Internal', derivedRoles: ['Agency Officer'], derivedApis: ['GET /api/agency/records', 'POST /api/agency/approvals'], securityClearance: 'AGENCY' },
  { id: 'p-part', name: 'Partner & Supplier Portal', category: 'External', derivedRoles: ['Vendor', 'Supplier', 'Partner'], derivedApis: ['GET /api/partner/orders', 'POST /api/partner/invoices'], securityClearance: 'PARTNER' },
  { id: 'p-aud', name: 'Auditor & Compliance Portal', category: 'Governance', derivedRoles: ['Compliance Auditor', 'Inspector'], derivedApis: ['GET /api/audit/logs', 'POST /api/audit/verify'], securityClearance: 'AUDITOR' },
  { id: 'p-sec', name: 'Security Operations (SOC)', category: 'Governance', derivedRoles: ['Security Guardian'], derivedApis: ['GET /api/sec/threats', 'POST /api/sec/quarantine'], securityClearance: 'SECURITY' },
  { id: 'p-dev', name: 'Developer & API Portal', category: 'Technical', derivedRoles: ['API Developer', 'Integrator'], derivedApis: ['GET /api/dev/docs', 'POST /api/dev/keys'], securityClearance: 'DEVELOPER' },
  { id: 'p-cmd', name: 'Command Centre', category: 'Operations', derivedRoles: ['Chief Operator', 'Control Plane Lead'], derivedApis: ['GET /api/cmd/status', 'POST /api/cmd/failover'], securityClearance: 'COMMAND' }
];

export interface CapabilityDefinition {
  id: string;
  name: string;
  category: string;
  familyAlignment: ProductFamilyId[];
}

export const CAPABILITY_CATALOGUE: CapabilityDefinition[] = [
  // Finance & Treasury
  { id: 'cap-gl', name: 'General Ledger & Double-Entry Accounting', category: 'Finance', familyAlignment: ['ENTERPRISE_MANAGEMENT', 'GOVERNMENT_DIGITAL_PLATFORM', 'COMMERCIAL_PRODUCTS'] },
  { id: 'cap-treasury', name: 'Treasury & Cash Management', category: 'Finance', familyAlignment: ['ENTERPRISE_MANAGEMENT', 'GOVERNMENT_DIGITAL_PLATFORM', 'COMMERCIAL_PRODUCTS'] },
  { id: 'cap-budget', name: 'Budgeting, Allocation & Fund Control', category: 'Finance', familyAlignment: ['ENTERPRISE_MANAGEMENT', 'GOVERNMENT_DIGITAL_PLATFORM'] },
  { id: 'cap-pay', name: 'Payment Processing & Settlement Switch', category: 'Finance', familyAlignment: ['COMMERCIAL_PRODUCTS', 'GOVERNMENT_DIGITAL_PLATFORM', 'JUMO_PLATFORM_PRODUCTS'] },
  // Procurement & Supply Chain
  { id: 'cap-procure', name: 'Procurement, Bidding & Requisitions', category: 'Operations', familyAlignment: ['ENTERPRISE_MANAGEMENT', 'GOVERNMENT_DIGITAL_PLATFORM'] },
  { id: 'cap-inventory', name: 'Inventory & Stock Logistics', category: 'Operations', familyAlignment: ['ENTERPRISE_MANAGEMENT', 'COMMERCIAL_PRODUCTS'] },
  { id: 'cap-assets', name: 'Enterprise Asset Lifecycle Management', category: 'Operations', familyAlignment: ['ENTERPRISE_MANAGEMENT', 'GOVERNMENT_DIGITAL_PLATFORM'] },
  // Human Capital & CRM
  { id: 'cap-hr', name: 'Human Capital & Personnel Management', category: 'HR', familyAlignment: ['ENTERPRISE_MANAGEMENT', 'GOVERNMENT_DIGITAL_PLATFORM'] },
  { id: 'cap-payroll', name: 'Automated Payroll & Tax Withholding', category: 'HR', familyAlignment: ['ENTERPRISE_MANAGEMENT', 'GOVERNMENT_DIGITAL_PLATFORM'] },
  { id: 'cap-crm', name: 'Customer & Beneficiary Management (CRM)', category: 'Customer', familyAlignment: ['COMMERCIAL_PRODUCTS', 'ENTERPRISE_MANAGEMENT'] },
  // Governance & Records
  { id: 'cap-doc', name: 'Document & Archive Management', category: 'Governance', familyAlignment: ['ENTERPRISE_MANAGEMENT', 'GOVERNMENT_DIGITAL_PLATFORM'] },
  { id: 'cap-workflow', name: 'Multi-Tier Workflow Approval Engine', category: 'Governance', familyAlignment: ['ENTERPRISE_MANAGEMENT', 'GOVERNMENT_DIGITAL_PLATFORM', 'JUMO_PLATFORM_PRODUCTS'] },
  { id: 'cap-audit', name: 'Immutable Cryptographic Audit Logging', category: 'Governance', familyAlignment: ['ENTERPRISE_MANAGEMENT', 'GOVERNMENT_DIGITAL_PLATFORM', 'COMMERCIAL_PRODUCTS', 'JUMO_PLATFORM_PRODUCTS', 'RESEARCH_AND_INNOVATION', 'CUSTOM_PRODUCT'] },
  // Identity & Security
  { id: 'cap-identity', name: 'Sovereign Digital Identity & PKI', category: 'Security', familyAlignment: ['GOVERNMENT_DIGITAL_PLATFORM', 'JUMO_PLATFORM_PRODUCTS', 'ENTERPRISE_MANAGEMENT'] },
  { id: 'cap-zerotrust', name: 'Zero-Trust Gatekeeping & ABAC', category: 'Security', familyAlignment: ['ENTERPRISE_MANAGEMENT', 'GOVERNMENT_DIGITAL_PLATFORM', 'COMMERCIAL_PRODUCTS', 'JUMO_PLATFORM_PRODUCTS'] },
  // AI & Analytics
  { id: 'cap-analytics', name: 'Real-Time Analytics & BI Engine', category: 'Intelligence', familyAlignment: ['ENTERPRISE_MANAGEMENT', 'COMMERCIAL_PRODUCTS', 'GOVERNMENT_DIGITAL_PLATFORM', 'JUMO_PLATFORM_PRODUCTS'] },
  { id: 'cap-rag', name: 'Neural RAG Knowledge Engine', category: 'Intelligence', familyAlignment: ['JUMO_PLATFORM_PRODUCTS', 'RESEARCH_AND_INNOVATION', 'COMMERCIAL_PRODUCTS'] },
  { id: 'cap-agent', name: 'Autonomous Cognitive AI Agents', category: 'Intelligence', familyAlignment: ['JUMO_PLATFORM_PRODUCTS', 'RESEARCH_AND_INNOVATION', 'ENTERPRISE_MANAGEMENT', 'COMMERCIAL_PRODUCTS'] }
];

export interface CanonicalEcosystemSpecification {
  specificationId: string;
  version: number;
  createdAt: string;

  // Enterprise Ecosystem & Platform Foundation Alignment
  ecosystemSpecification?: {
    selectedEcosystemId?: string;
    selectedEcosystemName?: string;
    sharedFoundation?: Array<{ name: string; category: string; locked: boolean }>;
    customModules?: string[];
    customWorkflows?: string[];
  };

  // 1 & 2. Product Family & Type
  productFamily: ProductFamilyId;
  productType: string;
  productName: string;
  purpose: string;
  problemBeingSolved: string;
  sector: 'Public' | 'Private' | 'Hybrid' | 'Sovereign';

  // 3. Product Grade
  productGrade: ProductGradeId;
  gradeProfile: RequirementProfile;

  // 4. Capacity & Scale
  capacityProfile: ScaleCapacityProfile;

  // 5. Availability & Service Level
  serviceLevel: ServiceLevelProfile;

  // 6. User & Organization Model
  userModel: {
    targetUsers: string[];
    userRoles: string[];
  };
  organizationModel: {
    targetOrganization: string;
    organizationType: string;
    hierarchyNodes: string[];
  };

  // 7. Portal Model
  selectedPortals: string[];
  derivedPortalSpecs: PortalRequirement[];

  // 8 & 9. Capability Model & Product Packs
  selectedCapabilities: string[];
  productPackRequirements: string[];
  selectedWorkflows?: string[];

  // 10. Security Profile
  securityGrade: string;
  selectedSecurityControls: string[];

  // 11. Data Profile
  dataProfile: {
    dataClasses: string[];
    sensitivityLevel: 'PUBLIC' | 'CONFIDENTIAL' | 'RESTRICTED' | 'TOP_SECRET_SOVEREIGN';
    dataResidencyCountry: string;
    retentionYears: number;
    disasterRecoveryType: string;
  };

  // 12. Integration Profile
  selectedIntegrations: string[];
  integrationPattern: 'REAL_TIME_EVENT_DRIVEN' | 'SYNCHRONOUS_REST' | 'BATCH_PIPELINE' | 'HYBRID_MESH';

  // 13. Deployment Profile
  deploymentModel: 'JUMO_SOVEREIGN_CLOUD' | 'HYBRID_PRIVATE_NODE' | 'SOVEREIGN_AIR_GAPPED' | 'PUBLIC_MULTI_REGION';
  scalingStrategy: 'AUTOMATIC_ELASTIC' | 'SCHEDULED' | 'MANUAL_RESERVE';
  targetInfrastructure: string;

  // 14. AI & Automation Profile
  aiRequirements: string[];
  assignedCognitiveWorkforce: string[];

  // 15. Compliance & Governance
  complianceJurisdictions: string[];
  regulatoryFrameworks: string[];

  // 16. AI Recommendations & Overrides
  appliedRecommendations: {
    ruleId: string;
    title: string;
    rationale: string;
    overrideByClient: boolean;
  }[];

  // 17. Completeness Gate
  completenessScore: number;
  readinessStatus: 'INCOMPLETE' | 'READY_FOR_ARCHITECTURE' | 'AUTOMATICALLY_COMPLETED';
}

export class JumoSpecificationCompiler {
  public static compileSpecification(
    raw: Partial<CanonicalEcosystemSpecification>
  ): CanonicalEcosystemSpecification {
    const family = raw.productFamily || 'ENTERPRISE_MANAGEMENT';
    const grade = raw.productGrade || 'ENTERPRISE';
    const profile = GRADE_REQUIREMENT_PROFILES[grade];

    // Auto derive portals based on selected IDs or default set
    const selectedPortalIds = raw.selectedPortals || ['Public Portal', 'Administrator Portal'];
    const derivedPortalSpecs = PORTAL_CATALOGUE.filter(p => 
      selectedPortalIds.includes(p.name) || selectedPortalIds.includes(p.id)
    );

    // Auto derive AI workforce assignments
    const aiReqs = raw.aiRequirements || ['Decision Support AI', 'Document Intelligence'];
    const workforce = [
      'Sovereign Architect Agent',
      'Cognitive Software Engineer',
      'Zero-Trust Security Agent',
      'Database Engine Agent',
      'Integration Bridge Agent',
      'Compliance & Audit Agent',
      'Quality Assurance Agent'
    ];
    if (grade === 'NATIONAL' || grade === 'SOVEREIGN' || grade === 'MISSION_CRITICAL') {
      workforce.push('Air-Gap Node Specialist', 'HSM Encryption Specialist', 'Continuous Failover Inspector');
    }

    // Auto calculate completeness
    const score = this.calculateCompletenessScore(raw);

    const spec: CanonicalEcosystemSpecification = {
      specificationId: raw.specificationId || `spec-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      version: raw.version || 1,
      createdAt: raw.createdAt || new Date().toISOString(),

      ecosystemSpecification: raw.ecosystemSpecification || {
        selectedEcosystemId: 'eco-01-education',
        selectedEcosystemName: 'JUMO Education and Alumni ERP Ecosystem',
        sharedFoundation: SHARED_PLATFORM_FOUNDATION_COMPONENTS,
        customModules: raw.productPackRequirements || [],
        customWorkflows: raw.selectedWorkflows || []
      },

      productFamily: family,
      productType: raw.productType || 'General Enterprise ERP',
      productName: raw.productName || 'JUMO Sovereign Platform',
      purpose: raw.purpose || 'Enterprise digital transformation and automated governance.',
      problemBeingSolved: raw.problemBeingSolved || 'Legacy disconnected operations.',
      sector: raw.sector || 'Sovereign',

      productGrade: grade,
      gradeProfile: profile,

      capacityProfile: {
        expectedUsers: raw.capacityProfile?.expectedUsers || '10,000',
        concurrentUsers: raw.capacityProfile?.concurrentUsers || 'High (1,000+)',
        transactionsPerSecond: raw.capacityProfile?.transactionsPerSecond || 250,
        peakTransactionsPerSecond: raw.capacityProfile?.peakTransactionsPerSecond || 1000,
        dataVolumeGb: raw.capacityProfile?.dataVolumeGb || 5000,
        apiRequestsPerMin: raw.capacityProfile?.apiRequestsPerMin || 15000,
        geographicCoverage: raw.capacityProfile?.geographicCoverage || 'National Jurisdiction',
        tenantModel: raw.capacityProfile?.tenantModel || 'Multi-Agency Federation',
        annualDataGrowthGb: raw.capacityProfile?.annualDataGrowthGb || 1200
      },

      serviceLevel: {
        availabilityProfile: raw.serviceLevel?.availabilityProfile || profile.availabilityTarget,
        targetAvailability: raw.serviceLevel?.targetAvailability || profile.availabilityTarget,
        rtoTarget: raw.serviceLevel?.rtoTarget || profile.drRto,
        rpoTarget: raw.serviceLevel?.rpoTarget || profile.drRpo,
        failoverStrategy: raw.serviceLevel?.failoverStrategy || profile.failoverType,
        regionalRedundancy: raw.serviceLevel?.regionalRedundancy || 'Multi-Zone Active Redundancy',
        backupFrequency: raw.serviceLevel?.backupFrequency || 'Hourly Snapshot with PITR',
        maintenanceWindow: raw.serviceLevel?.maintenanceWindow || 'Zero Downtime Rolling Release'
      },

      userModel: {
        targetUsers: raw.userModel?.targetUsers || ['Citizens', 'Agency Personnel', 'System Administrators'],
        userRoles: raw.userModel?.userRoles || ['Operator', 'Auditor', 'Supervisor', 'Administrator']
      },

      organizationModel: {
        targetOrganization: raw.organizationModel?.targetOrganization || 'National Digital Authority',
        organizationType: raw.organizationModel?.organizationType || 'Autonomous Agency',
        hierarchyNodes: raw.organizationModel?.hierarchyNodes || [
          'National Governing Council',
          'Directorate of Operations',
          'Department of Finance',
          'Branch Offices',
          'Field Units'
        ]
      },

      selectedPortals: selectedPortalIds,
      derivedPortalSpecs: derivedPortalSpecs,

      selectedCapabilities: raw.selectedCapabilities || [
        'General Ledger & Double-Entry Accounting',
        'Multi-Tier Workflow Approval Engine',
        'Immutable Cryptographic Audit Logging',
        'Zero-Trust Gatekeeping & ABAC'
      ],

      productPackRequirements: raw.productPackRequirements || [
        'Core Accounting Module',
        'Sovereign Identity Gateway',
        'Automated Reporting Engine'
      ],

      securityGrade: raw.securityGrade || (grade === 'SOVEREIGN' ? 'Sovereign Maximum Shield' : 'Enterprise Zero-Trust'),
      selectedSecurityControls: raw.selectedSecurityControls || [
        'Zero-Trust Network Access (ZTNA)',
        'Multi-Factor Authentication (MFA)',
        'Role & Attribute-Based Access Control',
        'Immutable Cryptographic Audit Log',
        'Hardware Security Module (HSM) Vault'
      ],

      dataProfile: {
        dataClasses: raw.dataProfile?.dataClasses || ['Financial Records', 'User Identity', 'Audit Evidence'],
        sensitivityLevel: raw.dataProfile?.sensitivityLevel || 'RESTRICTED',
        dataResidencyCountry: raw.dataProfile?.dataResidencyCountry || 'Sovereign Jurisdiction',
        retentionYears: raw.dataProfile?.retentionYears || 10,
        disasterRecoveryType: raw.dataProfile?.disasterRecoveryType || 'Active-Active Synchronous Replica'
      },

      selectedIntegrations: raw.selectedIntegrations || [
        'FAAP Treasury Interconnect',
        'JUMO Digital Pay Switch',
        'Sovereign Identity Provider',
        'RESTful Gateway APIs'
      ],
      integrationPattern: raw.integrationPattern || 'REAL_TIME_EVENT_DRIVEN',

      deploymentModel: raw.deploymentModel || (grade === 'SOVEREIGN' ? 'SOVEREIGN_AIR_GAPPED' : 'JUMO_SOVEREIGN_CLOUD'),
      scalingStrategy: raw.scalingStrategy || 'AUTOMATIC_ELASTIC',
      targetInfrastructure: raw.targetInfrastructure || 'JUMO Sovereign Enterprise Cloud (Multi-AZ)',

      aiRequirements: aiReqs,
      assignedCognitiveWorkforce: workforce,

      complianceJurisdictions: raw.complianceJurisdictions || ['National Sovereign Data Act', 'ISO/IEC 27001', 'SOC 2 Type II'],
      regulatoryFrameworks: raw.regulatoryFrameworks || ['Financial Regulation Standards', 'National Cyber Authority Standards'],

      appliedRecommendations: raw.appliedRecommendations || [
        {
          ruleId: 'REC-01',
          title: 'Multi-Region Failover Architecture',
          rationale: `Multi-region deployment automatically assigned for product grade ${grade}.`,
          overrideByClient: false
        },
        {
          ruleId: 'REC-02',
          title: 'Cryptographic Immutable Audit Engine',
          rationale: 'Required for high-compliance enterprise & sovereign product classifications.',
          overrideByClient: false
        }
      ],

      completenessScore: score,
      readinessStatus: score >= 90 ? 'READY_FOR_ARCHITECTURE' : 'INCOMPLETE'
    };

    return spec;
  }

  public static calculateCompletenessScore(raw: Partial<CanonicalEcosystemSpecification>): number {
    let score = 0;
    const checks = [
      !!raw.productName && raw.productName.length > 2,
      !!raw.productFamily,
      !!raw.productType,
      !!raw.productGrade,
      !!raw.purpose,
      (raw.selectedPortals?.length ?? 0) > 0,
      (raw.selectedCapabilities?.length ?? 0) > 0,
      (raw.selectedSecurityControls?.length ?? 0) > 0,
      (raw.selectedIntegrations?.length ?? 0) > 0,
      !!raw.capacityProfile?.expectedUsers,
      !!raw.organizationModel?.targetOrganization
    ];

    const passed = checks.filter(Boolean).length;
    score = Math.round((passed / checks.length) * 100);
    return score;
  }

  public static generateRecommendedOrgStructure(family: ProductFamilyId, grade: ProductGradeId): string[] {
    if (grade === 'SOVEREIGN' || grade === 'NATIONAL' || family === 'GOVERNMENT_DIGITAL_PLATFORM') {
      return [
        'National Governing Board / Ministry',
        'Directorate General of Operations',
        'Department of Finance & Treasury',
        'Department of Procurement & Supply',
        'Division of Digital Services',
        'Agency Regional Offices',
        'Field Operating Units',
        'Independent Audit Unit'
      ];
    }
    if (family === 'ENTERPRISE_MANAGEMENT') {
      return [
        'Executive Management (C-Suite)',
        'Finance & Accounting Division',
        'Human Capital & Operations',
        'Supply Chain & Warehouse Ops',
        'Information Technology',
        'Internal Audit & Compliance'
      ];
    }
    return [
      'Corporate Leadership',
      'Product & Engineering',
      'Operations & Logistics',
      'Sales & Customer Success',
      'Finance & Governance'
    ];
  }
}
