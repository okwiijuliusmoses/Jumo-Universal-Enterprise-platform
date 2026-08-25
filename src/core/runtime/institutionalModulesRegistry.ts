/**
 * JUMO UEOS Roadmap v29.0 — Universal Institutional Enterprise Module Architecture
 * 
 * Defines the 13 Authoritative Institutional Enterprise Modules (IEMs).
 * Each IEM is a complete operational business domain containing all mandatory enterprise components:
 * - Operational Workspace & Dashboard
 * - CRUD Records Engine & Data Grid
 * - Configuration Center
 * - Statutory Reports & Analytics
 * - Module-specific JUMO Assistant (Human-Centric Enterprise Identity Directive)
 * - Approval Workflow Engine
 * - Notification Center & Audit Trail
 * - Document & Attachment Repository
 * - API Layer, Offline & Hybrid Sync
 * - Ring-0 Owner Governance
 */

export interface InstitutionalModuleDefinition {
  id: string;
  name: string;
  shortCode: string;
  category: string;
  description: string;
  jumoAssistantName: string;
  subModules: string[];
  mandatoryCapabilities: string[];
  assignedErpFamilies: string[];
  version: string;
  status: 'OPERATIONAL' | 'CONFIGURING' | 'RING_0_LOCKED';
}

export const INSTITUTIONAL_ENTERPRISE_MODULES: InstitutionalModuleDefinition[] = [
  {
    id: 'iem_education',
    name: 'Education Institutional Enterprise Module',
    shortCode: 'EDU-IEM',
    category: 'Education & Academics',
    description: 'Comprehensive academic, student, examination, research, and campus operational framework.',
    jumoAssistantName: 'JUMO Academic Assistant',
    subModules: [
      'Academic Administration',
      'Student Information System (SIS)',
      'Admissions & Online Enrollment',
      'Course Registration & Billing',
      'Academic Calendar & Term Schedules',
      'Curriculum & Syllabus Management',
      'Departments, Faculties & Schools',
      'Student Biometric Attendance',
      'Examinations & Grading Engine',
      'Digital Library & RFID Archive',
      'Research Grants & Project Accounting',
      'Digital Learning LMS (SCORM)',
      'Hostels & Dormitory Allocation',
      'Campus Fleet & Transport GPS',
      'Campus Infirmary & Medical',
      'Student Welfare & Disciplinary',
      'Financial Ledger & Fee Clearance',
      'Graduation & Degree Verification',
      'Certificates & Transcripts',
      'Accreditation & Audit Compliance',
      'International Students Portal',
      'Quality Assurance & Faculty Audit',
      'Timetabling & Room Allocation',
      'Academic Analytics & KPIs'
    ],
    mandatoryCapabilities: [
      'Dashboard', 'CRUD Engine', 'Forms', 'Data Grid', 'Reports', 'Analytics',
      'JUMO Academic Assistant', 'Approval Workflow', 'Notifications', 'Document Vault',
      'Audit Trail', 'API Layer', 'Mobile Runtime', 'Offline Sync', 'FAAP Integration'
    ],
    assignedErpFamilies: ['education', 'university', 'school', 'all'],
    version: '29.0.1',
    status: 'OPERATIONAL'
  },
  {
    id: 'iem_healthcare',
    name: 'Healthcare Institutional Enterprise Module',
    shortCode: 'HLT-IEM',
    category: 'Healthcare & Clinical',
    description: 'End-to-end hospital administration, clinical EHR, lab diagnostics, pharmacy, and patient care.',
    jumoAssistantName: 'JUMO Healthcare Assistant',
    subModules: [
      'Hospital Administration & Governance',
      'Patient Registration & Biometric KYC',
      'Electronic Health Records (EHR)',
      'Clinical Services & Doctor Consults',
      'Nursing Care & Bed Management',
      'Laboratory Diagnostics & LIMS',
      'Radiology PACS & Imaging',
      'Hospital Pharmacy & Dispensing',
      'Operating Theatre & Surgical Logs',
      'Emergency & Ambulance Routing',
      'Outpatient Appointments & Triage',
      'Medical Billing & ICD-10 Claims',
      'Insurance Clearinghouse & Pre-Auth',
      'Medical Inventory & Cold Chain',
      'Facilities & Sterile Maintenance',
      'Medical Research & Clinical Trials',
      'Public Health Telemetry & Epidemic Scan'
    ],
    mandatoryCapabilities: [
      'Dashboard', 'CRUD Engine', 'Forms', 'Data Grid', 'Reports', 'Analytics',
      'JUMO Healthcare Assistant', 'Approval Workflow', 'Notifications', 'Document Vault',
      'Audit Trail', 'API Layer', 'Mobile Runtime', 'Offline Sync', 'FAAP Integration'
    ],
    assignedErpFamilies: ['healthcare', 'hospital', 'clinic', 'all'],
    version: '29.0.1',
    status: 'OPERATIONAL'
  },
  {
    id: 'iem_church',
    name: 'Church Institutional Enterprise Module',
    shortCode: 'CHR-IEM',
    category: 'Faith & Institutions',
    description: 'Parishioner census, tithe ledger, sacraments, diocesan synod, and ministry operations.',
    jumoAssistantName: 'JUMO Church Assistant',
    subModules: [
      'Parishioner Census & Family Tree',
      'Pastoral Care & Visitation Logs',
      'Ministries & Department Roster',
      'Church Administration & Synod',
      'Events, Conferences & Sacraments',
      'Home Cell & Fellowship Groups',
      'Children & Sunday School Ministry',
      'Youth Fellowship & Mentorship',
      'Choir & Worship Ministry',
      'Media, Broadcasting & AV Assets',
      'Tithe, Offering & Pledge Registry',
      'Special Projects & Building Fund',
      'Church Assets & Sacred Regalia',
      'Broadcast SMS & WhatsApp Channels',
      'Discipleship & Catechism Tracker',
      'Missions & Evangelism Outreach',
      'Theological School & Education'
    ],
    mandatoryCapabilities: [
      'Dashboard', 'CRUD Engine', 'Forms', 'Data Grid', 'Reports', 'Analytics',
      'JUMO Church Assistant', 'Approval Workflow', 'Notifications', 'Document Vault',
      'Audit Trail', 'API Layer', 'Mobile Runtime', 'Offline Sync', 'FAAP Integration'
    ],
    assignedErpFamilies: ['church', 'faith', 'parish', 'diocese', 'all'],
    version: '29.0.1',
    status: 'OPERATIONAL'
  },
  {
    id: 'iem_cooperative',
    name: 'Cooperative / SACCO Institutional Enterprise Module',
    shortCode: 'SAC-IEM',
    category: 'FinTech & Cooperatives',
    description: 'Member deposits, share capital, loan underwriting, dividend rebate, and agency banking.',
    jumoAssistantName: 'JUMO Cooperative Assistant',
    subModules: [
      'Member Registry & Biometric KYC',
      'Non-Withdrawable Share Capital',
      'Savings Accounts & Fixed Deposits',
      'Loan Underwriting & Amortization',
      'Investments & Treasury Portfolio',
      'General Meetings & Voting Engine',
      'Branch Network & Agency Terminals',
      'Financial Ledger & Double-Entry Balance',
      'Statutory Regulatory Compliance',
      'Loan Recovery & Default Management',
      'Guarantor Risk Engine (Chama)',
      'Insurance & Micro-Credit Cover'
    ],
    mandatoryCapabilities: [
      'Dashboard', 'CRUD Engine', 'Forms', 'Data Grid', 'Reports', 'Analytics',
      'JUMO Cooperative Assistant', 'Approval Workflow', 'Notifications', 'Document Vault',
      'Audit Trail', 'API Layer', 'Mobile Runtime', 'Offline Sync', 'FAAP Integration'
    ],
    assignedErpFamilies: ['sacco', 'cooperative', 'finance', 'all'],
    version: '29.0.1',
    status: 'OPERATIONAL'
  },
  {
    id: 'iem_government',
    name: 'Government Institutional Enterprise Module',
    shortCode: 'GOV-IEM',
    category: 'Government & Public Sector',
    description: 'Citizen portal, municipal revenue, licensing, public procurement, and council resolutions.',
    jumoAssistantName: 'JUMO Government Assistant',
    subModules: [
      'Citizen Portal & Public Service Gateway',
      'Departmental Governance & Budgets',
      'Urban Planning & Zoned Mapping',
      'Treasury & Public Revenue Collection',
      'Taxation & Municipal Fee Clearance',
      'Business Licensing & Permit Approvals',
      'Public Procurement & e-Tendering',
      'Land Registry & Title Deeds Custody',
      'Capital Infrastructure Projects',
      'Public Sector Civil Service HR',
      'Judicial & Legal Affairs Secretariat',
      'Municipal Council Resolutions',
      'Public Service Delivery Monitoring',
      'Public Safety & Emergency Services'
    ],
    mandatoryCapabilities: [
      'Dashboard', 'CRUD Engine', 'Forms', 'Data Grid', 'Reports', 'Analytics',
      'JUMO Government Assistant', 'Approval Workflow', 'Notifications', 'Document Vault',
      'Audit Trail', 'API Layer', 'Mobile Runtime', 'Offline Sync', 'FAAP Integration'
    ],
    assignedErpFamilies: ['government', 'ministry', 'municipality', 'all'],
    version: '29.0.1',
    status: 'OPERATIONAL'
  },
  {
    id: 'iem_agriculture',
    name: 'Agriculture Institutional Enterprise Module',
    shortCode: 'AGR-IEM',
    category: 'Agriculture & Agribusiness',
    description: 'Farm management, livestock tracking, crop yield prediction, extension services, and storage.',
    jumoAssistantName: 'JUMO Agriculture Assistant',
    subModules: [
      'Farm Operations & Land Parcel Mapping',
      'Livestock Registry & Pedigree Tracking',
      'Crop Cultivation & Harvest Schedules',
      'Agronomy Extension & Pest Surveillance',
      'Farmers Cooperatives & Input Supply',
      'Produce Market Place & Auction House',
      'Silo Storage & Grain Inventory',
      'Agro-Weather Telemetry & Soil Sensing',
      'Agri-Finance & Micro-Crop Insurance',
      'Agri-Logistics & Cold Chain Fleet'
    ],
    mandatoryCapabilities: [
      'Dashboard', 'CRUD Engine', 'Forms', 'Data Grid', 'Reports', 'Analytics',
      'JUMO Agriculture Assistant', 'Approval Workflow', 'Notifications', 'Document Vault',
      'Audit Trail', 'API Layer', 'Mobile Runtime', 'Offline Sync', 'FAAP Integration'
    ],
    assignedErpFamilies: ['agriculture', 'farm', 'coop', 'all'],
    version: '29.0.1',
    status: 'OPERATIONAL'
  },
  {
    id: 'iem_hospitality',
    name: 'Hospitality Institutional Enterprise Module',
    shortCode: 'HSP-IEM',
    category: 'Hospitality & Tourism',
    description: 'Property management, reservations, POS dining, housekeeping, and guest CRM.',
    jumoAssistantName: 'JUMO Hospitality Assistant',
    subModules: [
      'Property Reservations & Booking Engine',
      'Front Desk & Guest Check-In/Out',
      'Housekeeping & Room Sanitize Status',
      'Restaurant & Bar Point-of-Sale (POS)',
      'Banquet, Events & Conference Center',
      'Facilities Maintenance & Work Orders',
      'Hotel Finance, Folios & Night Audit',
      'Guest Loyalty Program & CRM',
      'Beverage & Food Inventory Control'
    ],
    mandatoryCapabilities: [
      'Dashboard', 'CRUD Engine', 'Forms', 'Data Grid', 'Reports', 'Analytics',
      'JUMO Hospitality Assistant', 'Approval Workflow', 'Notifications', 'Document Vault',
      'Audit Trail', 'API Layer', 'Mobile Runtime', 'Offline Sync', 'FAAP Integration'
    ],
    assignedErpFamilies: ['hospitality', 'hotel', 'resort', 'all'],
    version: '29.0.1',
    status: 'OPERATIONAL'
  },
  {
    id: 'iem_corporate',
    name: 'Corporate Enterprise Institutional Module',
    shortCode: 'CRP-IEM',
    category: 'Corporate & Holding',
    description: 'Holding company consolidation, multi-subsidiary HR, CRM, projects, and procurement.',
    jumoAssistantName: 'JUMO Corporate Assistant',
    subModules: [
      'Organizational Hierarchy & Holding',
      'Departmental Cost Allocation',
      'Human Resources & Payroll Engine',
      'Project Portfolio & Agile Milestones',
      'Customer Relationship Management (CRM)',
      'Corporate Finance & General Ledger',
      'Procurement & Vendor Portal',
      'Fixed Asset Accounting & Depreciation',
      'Inventory & Warehouse Logistics',
      'Corporate Sales & Quotations',
      'Marketing Campaigns & Conversion',
      'Customer Support & Helpdesk Ticketing',
      'Regulatory Compliance & Risk Control'
    ],
    mandatoryCapabilities: [
      'Dashboard', 'CRUD Engine', 'Forms', 'Data Grid', 'Reports', 'Analytics',
      'JUMO Corporate Assistant', 'Approval Workflow', 'Notifications', 'Document Vault',
      'Audit Trail', 'API Layer', 'Mobile Runtime', 'Offline Sync', 'FAAP Integration'
    ],
    assignedErpFamilies: ['corporate', 'enterprise', 'holding', 'all'],
    version: '29.0.1',
    status: 'OPERATIONAL'
  },
  {
    id: 'iem_manufacturing',
    name: 'Manufacturing Institutional Enterprise Module',
    shortCode: 'MFG-IEM',
    category: 'Manufacturing & Industrial',
    description: 'Bill of Materials (BOM), shop floor control, quality assurance, warehouse, and supply chain.',
    jumoAssistantName: 'JUMO Manufacturing Assistant',
    subModules: [
      'Production Master Schedule & Work Orders',
      'Bill of Materials (BOM) & Routing',
      'Raw Material Requirement Planning (MRP)',
      'Warehouse Stock & Batch Tracking',
      'Industrial Procurement & Vendor Quality',
      'Quality Control & Non-Conformance',
      'Plant Equipment Preventive Maintenance',
      'Industrial Process Engineering & CAD',
      'Factory Floor Telemetry & OEE Analytics',
      'Global Supply Chain & Logistics Dispatch'
    ],
    mandatoryCapabilities: [
      'Dashboard', 'CRUD Engine', 'Forms', 'Data Grid', 'Reports', 'Analytics',
      'JUMO Manufacturing Assistant', 'Approval Workflow', 'Notifications', 'Document Vault',
      'Audit Trail', 'API Layer', 'Mobile Runtime', 'Offline Sync', 'FAAP Integration'
    ],
    assignedErpFamilies: ['manufacturing', 'industrial', 'plant', 'all'],
    version: '29.0.1',
    status: 'OPERATIONAL'
  },
  {
    id: 'iem_legal',
    name: 'Legal Institutional Enterprise Module',
    shortCode: 'LGL-IEM',
    category: 'Legal & Judiciary',
    description: 'Court litigation, case docket management, legal research, contracts, and billable hours.',
    jumoAssistantName: 'JUMO Legal Assistant',
    subModules: [
      'Case Docket & Matter Management',
      'Client Intake & Conflict Check',
      'Court Scheduling & Hearing Dates',
      'Legal Document Vault & Versioning',
      'Contract Drafting & Lifecycle (CLM)',
      'Regulatory Compliance & Statutory Scan',
      'Litigation Risk & Settlement Valuation',
      'Legal Precedent Research Index',
      'Time Tracking & Billable Hours Ledger'
    ],
    mandatoryCapabilities: [
      'Dashboard', 'CRUD Engine', 'Forms', 'Data Grid', 'Reports', 'Analytics',
      'JUMO Legal Assistant', 'Approval Workflow', 'Notifications', 'Document Vault',
      'Audit Trail', 'API Layer', 'Mobile Runtime', 'Offline Sync', 'FAAP Integration'
    ],
    assignedErpFamilies: ['legal', 'judiciary', 'law_firm', 'all'],
    version: '29.0.1',
    status: 'OPERATIONAL'
  },
  {
    id: 'iem_cultural',
    name: 'Cultural Institutions Enterprise Module',
    shortCode: 'CUL-IEM',
    category: 'Culture & Kingdoms',
    description: 'Kingdom governance, royal treasury, traditional chiefdoms, cultural archives, and heritage.',
    jumoAssistantName: 'JUMO Cultural Assistant',
    subModules: [
      'Kingdom Administration & Royal Cabinet',
      'Traditional Leadership & Chiefdoms',
      'Royal Regalia & Crown Lands Trust',
      'Cultural Heritage Preservation & Relics',
      'Indigenous Language & Dialect Dictionary',
      'Royal Historical Archives & Oral History',
      'Traditional Customary Justice Council',
      'Royal Ceremonies & Cultural Festivals',
      'Kingdom Research & Anthropology',
      'Community Welfare & Royalty Grants',
      'Traditional Education & Apprenticeships'
    ],
    mandatoryCapabilities: [
      'Dashboard', 'CRUD Engine', 'Forms', 'Data Grid', 'Reports', 'Analytics',
      'JUMO Cultural Assistant', 'Approval Workflow', 'Notifications', 'Document Vault',
      'Audit Trail', 'API Layer', 'Mobile Runtime', 'Offline Sync', 'FAAP Integration'
    ],
    assignedErpFamilies: ['cultural', 'kingdom', 'traditional', 'all'],
    version: '29.0.1',
    status: 'OPERATIONAL'
  },
  {
    id: 'iem_clan',
    name: 'Clan Institutional Enterprise Module',
    shortCode: 'CLN-IEM',
    category: 'Clan & Family Lineage',
    description: 'Genealogy tree, ancestral land deeds, customary marriage registry, and clan council.',
    jumoAssistantName: 'JUMO Clan Assistant',
    subModules: [
      'Family Lineage & Ancestral Genealogy',
      'Clan Census & Lineage Verification',
      'Customary Marriage & Dowry Registry',
      'Ancestral Land Ownership & Boundaries',
      'Clan Elders Council & Administration',
      'Cultural Identity & Totem Preservation',
      'Community Welfare & Funeral Funds',
      'Inheritance & Customary Estate Allocator',
      'Traditional Dispute & Conflict Resolution'
    ],
    mandatoryCapabilities: [
      'Dashboard', 'CRUD Engine', 'Forms', 'Data Grid', 'Reports', 'Analytics',
      'JUMO Clan Assistant', 'Approval Workflow', 'Notifications', 'Document Vault',
      'Audit Trail', 'API Layer', 'Mobile Runtime', 'Offline Sync', 'FAAP Integration'
    ],
    assignedErpFamilies: ['clan', 'lineage', 'family', 'all'],
    version: '29.0.1',
    status: 'OPERATIONAL'
  },
  {
    id: 'iem_alumni',
    name: 'Alumni Institutional Enterprise Module',
    shortCode: 'ALM-IEM',
    category: 'Alumni & Foundations',
    description: 'Alumni directory, regional chapters, mentorship matching, endowment trust, and reunions.',
    jumoAssistantName: 'JUMO Alumni Assistant',
    subModules: [
      'Global Alumni Directory & Chapter Registry',
      'Professional Networking & Industry Search',
      'Senior Alumni Student Mentorship',
      'Job Placement & Career Portal',
      'Reunions, Dinners & Chapter Events',
      'Alumni Endowment & Trust Fundraising',
      'Institutional Research Sponsorship',
      'Alumni Awards & Distinguished Recognition'
    ],
    mandatoryCapabilities: [
      'Dashboard', 'CRUD Engine', 'Forms', 'Data Grid', 'Reports', 'Analytics',
      'JUMO Alumni Assistant', 'Approval Workflow', 'Notifications', 'Document Vault',
      'Audit Trail', 'API Layer', 'Mobile Runtime', 'Offline Sync', 'FAAP Integration'
    ],
    assignedErpFamilies: ['alumni', 'foundation', 'reunion', 'all'],
    version: '29.0.1',
    status: 'OPERATIONAL'
  }
];

export const getInstitutionalModuleByErp = (erpId: string): InstitutionalModuleDefinition => {
  const cleanId = erpId.toLowerCase();
  if (cleanId.includes('edu') || cleanId.includes('univ') || cleanId.includes('school')) {
    return INSTITUTIONAL_ENTERPRISE_MODULES.find(m => m.id === 'iem_education')!;
  }
  if (cleanId.includes('health') || cleanId.includes('hosp') || cleanId.includes('clinic')) {
    return INSTITUTIONAL_ENTERPRISE_MODULES.find(m => m.id === 'iem_healthcare')!;
  }
  if (cleanId.includes('church') || cleanId.includes('faith') || cleanId.includes('parish') || cleanId.includes('diocese')) {
    return INSTITUTIONAL_ENTERPRISE_MODULES.find(m => m.id === 'iem_church')!;
  }
  if (cleanId.includes('sacco') || cleanId.includes('coop') || cleanId.includes('fin')) {
    return INSTITUTIONAL_ENTERPRISE_MODULES.find(m => m.id === 'iem_cooperative')!;
  }
  if (cleanId.includes('gov') || cleanId.includes('ministry') || cleanId.includes('council')) {
    return INSTITUTIONAL_ENTERPRISE_MODULES.find(m => m.id === 'iem_government')!;
  }
  if (cleanId.includes('agri') || cleanId.includes('farm')) {
    return INSTITUTIONAL_ENTERPRISE_MODULES.find(m => m.id === 'iem_agriculture')!;
  }
  if (cleanId.includes('hospit') || cleanId.includes('hotel')) {
    return INSTITUTIONAL_ENTERPRISE_MODULES.find(m => m.id === 'iem_hospitality')!;
  }
  if (cleanId.includes('manuf') || cleanId.includes('plant')) {
    return INSTITUTIONAL_ENTERPRISE_MODULES.find(m => m.id === 'iem_manufacturing')!;
  }
  if (cleanId.includes('legal') || cleanId.includes('court')) {
    return INSTITUTIONAL_ENTERPRISE_MODULES.find(m => m.id === 'iem_legal')!;
  }
  if (cleanId.includes('cultur') || cleanId.includes('king')) {
    return INSTITUTIONAL_ENTERPRISE_MODULES.find(m => m.id === 'iem_cultural')!;
  }
  if (cleanId.includes('clan')) {
    return INSTITUTIONAL_ENTERPRISE_MODULES.find(m => m.id === 'iem_clan')!;
  }
  if (cleanId.includes('alumni')) {
    return INSTITUTIONAL_ENTERPRISE_MODULES.find(m => m.id === 'iem_alumni')!;
  }
  return INSTITUTIONAL_ENTERPRISE_MODULES.find(m => m.id === 'iem_corporate')!;
};
