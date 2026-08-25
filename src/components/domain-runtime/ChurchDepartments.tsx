import React, { useState, useMemo } from 'react';
import { 
  Layers, Users, Plus, UserPlus, FileText, CheckCircle2, Percent, DollarSign, 
  TrendingUp, Star, Music, Award, Compass, Heart, ShieldCheck, Building2,
  BookOpen, Globe, Scale, Cpu, Send, Home, Archive, ShieldAlert, Activity,
  GraduationCap, Calendar, Clock, Tv, ChevronRight, Search, FileDown, Bot, Sparkles,
  HelpCircle, RefreshCw, Smartphone, Key, Lock, AlertTriangle, Check, Sliders, BarChart3
} from 'lucide-react';

// ==========================================
// TYPES & INTERFACES
// ==========================================

export type DenominationType = 
  | 'Anglican' 
  | 'Catholic' 
  | 'Orthodox' 
  | 'Pentecostal' 
  | 'Evangelical' 
  | 'Presbyterian' 
  | 'Methodist' 
  | 'Baptist' 
  | 'Lutheran' 
  | 'SDA' 
  | 'Independent';

interface DenominationConfig {
  name: string;
  topLeaderTitle: string;
  councilTitle: string;
  structureLevels: string[];
  liturgicalTerm: string;
  sacramentTerm: string;
  governanceManual: string;
}

interface StaffMember {
  id: string;
  name: string;
  role: string;
  departmentId: string;
  safeguardingCleared: boolean;
  pensionEnrolled: boolean;
  authLevel: 'Admin' | 'Staff' | 'Witness' | 'Read-only';
  contact: string;
}

interface LedgerEntry {
  id: string;
  date: string;
  description: string;
  debit: number;
  credit: number;
  category: 'Tithe' | 'Offering' | 'Thanksgiving' | 'Building Fund' | 'Outreach' | 'Salary' | 'Procurement' | 'School' | 'Clinic';
  clearingFee: number; // 1.5% JUMO clearing fee
  status: 'CLEARED' | 'PENDING' | 'SIMULATED';
}

interface WorkflowTask {
  id: string;
  title: string;
  initiator: string;
  cost: number;
  status: 'PENDING_APPROVAL' | 'APPROVED_AND_SIGNED' | 'REJECTED';
  mfaRequired: boolean;
  timestamp: string;
}

interface DepartmentMeeting {
  id: string;
  title: string;
  date: string;
  agenda: string[];
  attendeesCount: number;
  status: 'UPCOMING' | 'COMPLETED';
  minutesSummary?: string;
  resolutions: string[];
}

interface PermanentRegister {
  id: string;
  bookType: 'Baptism' | 'Confirmation' | 'Marriage' | 'Funeral' | 'Clergy' | 'LandDeed';
  names: string;
  dateOfRecord: string;
  officiatingClergy: string;
  locationNode: string;
  cryptographicSeal: string; // SHA256 string
  status: 'CERTIFIED' | 'REVOKED';
}

interface SafeguardingIncident {
  id: string;
  reporter: string;
  date: string;
  description: string;
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  status: 'INVESTIGATING' | 'MITIGATED' | 'ESC_TO_CIVIL_AUTHORITY';
}

interface DepartmentInfo {
  id: string;
  category: 'Administration' | 'Pastoral' | 'Finance_Property' | 'PublicServices';
  name: string;
  code: string;
  leadRole: string;
  defaultLeader: string;
  budgetAllocated: number;
  budgetSpent: number;
  description: string;
}

// ==========================================
// CONSTANT DATA & DICTIONARIES
// ==========================================

const DENOMINATION_PRESETS: Record<DenominationType, DenominationConfig> = {
  Anglican: {
    name: 'Anglican (Church of Uganda/Episcopal)',
    topLeaderTitle: 'Most Rev. Archbishop',
    councilTitle: 'Provincial Standing Committee / Synod',
    structureLevels: ['Province Seat', 'Diocese Seat', 'Archdeaconry Outpost', 'Parish Cathedral', 'Sub-Parish Outpost'],
    liturgicalTerm: 'Liturgical Seasons',
    sacramentTerm: 'Holy Sacraments',
    governanceManual: 'Constitution & Canon Law of the Province'
  },
  Catholic: {
    name: 'Roman Catholic Church',
    topLeaderTitle: 'His Eminence Cardinal / Pope',
    councilTitle: 'Diocesan Pastoral Council / Curia',
    structureLevels: ['Holy See', 'Archdiocese', 'Diocese', 'Deanery', 'Local Parish'],
    liturgicalTerm: 'Liturgical Seasons & Feasts',
    sacramentTerm: 'Sacraments of the Church',
    governanceManual: 'Code of Canon Law (Codex Iuris Canonici)'
  },
  Orthodox: {
    name: 'Eastern Orthodox Church',
    topLeaderTitle: 'His Beatitude Patriarch / Metropolitan',
    councilTitle: 'Holy Synod of Bishops',
    structureLevels: ['Patriarchate', 'Metropolis', 'Archdiocese', 'Local Parish Outpost'],
    liturgicalTerm: 'Feast Cycles & Liturgy',
    sacramentTerm: 'Sacred Mysteries',
    governanceManual: 'Sacred Canons & Synodal Decrees'
  },
  Pentecostal: {
    name: 'Pentecostal Assemblies (AG / Church of God)',
    topLeaderTitle: 'General Superintendent / Lead Pastor',
    councilTitle: 'General Presbytery / Board of Trustees',
    structureLevels: ['General Assembly', 'District Section', 'Regional Hub', 'Local Church'],
    liturgicalTerm: 'Worship Service Orders',
    sacramentTerm: 'Ordinances (Baptism/Communion)',
    governanceManual: 'General Bylaws & Faith Declarations'
  },
  Evangelical: {
    name: 'Evangelical Free / Covenant Networks',
    topLeaderTitle: 'National Director / President',
    councilTitle: 'General Council / Board of Elders',
    structureLevels: ['National Association', 'Regional Division', 'Local Covenant Church'],
    liturgicalTerm: 'Worship & Preaching Calendar',
    sacramentTerm: 'Sacred Ordinances',
    governanceManual: 'Covenant Manual & Bylaws'
  },
  Presbyterian: {
    name: 'Presbyterian & Reformed Network',
    topLeaderTitle: 'Right Rev. Moderator',
    councilTitle: 'General Assembly / Presbytery Session',
    structureLevels: ['General Assembly', 'Regional Synod', 'Presbytery Hub', 'Kirk Session', 'Local Congregation'],
    liturgicalTerm: 'Sermon Series & Worship Cycle',
    sacramentTerm: 'Sacraments (Presbyterian standard)',
    governanceManual: 'The Book of Order & Westminster Standards'
  },
  Methodist: {
    name: 'Methodist Connectional Church',
    topLeaderTitle: 'Presiding Bishop',
    councilTitle: 'General Conference / Charge Conference',
    structureLevels: ['General Conference', 'Annual Conference', 'District Office', 'Pastoral Charge', 'Local Congregation'],
    liturgicalTerm: 'Liturgical Seasons & Wesley Guides',
    sacramentTerm: 'Holy Sacraments',
    governanceManual: 'Book of Discipline & General Rules'
  },
  Baptist: {
    name: 'Baptist Convention / Association',
    topLeaderTitle: 'Convention President / Senior Pastor',
    councilTitle: 'Executive Committee / Deacon Board',
    structureLevels: ['National Convention', 'State/Local Association', 'Autonomous Local Church'],
    liturgicalTerm: 'Order of Worship',
    sacramentTerm: 'Ordinances (Believers Baptism)',
    governanceManual: 'Church Covenant & Sovereign Baptist Manual'
  },
  Lutheran: {
    name: 'Lutheran Church (ELCA / LCMS)',
    topLeaderTitle: 'Presiding Bishop / President',
    councilTitle: 'Church Council / Synodical Assembly',
    structureLevels: ['National Synod/Assembly', 'Regional Synod Office', 'Local Parish'],
    liturgicalTerm: 'Church Liturgical Calendar',
    sacramentTerm: 'Sacraments (Augsburg Confession)',
    governanceManual: 'Augsburg Confession & Synod Constitution'
  },
  SDA: {
    name: 'Seventh-day Adventist Church',
    topLeaderTitle: 'General Conference President',
    councilTitle: 'GC Executive Committee',
    structureLevels: ['General Conference', 'Division Office', 'Union Mission', 'Local Conference', 'Local Church Node'],
    liturgicalTerm: 'Sabbath Services & Camp Meetings',
    sacramentTerm: 'Ordinances (Foot Washing & Communion)',
    governanceManual: 'SDA Church Manual & Fundamental Beliefs'
  },
  Independent: {
    name: 'Independent Non-Denominational Fellowship',
    topLeaderTitle: 'Founding Lead Apostle / Pastor',
    councilTitle: 'Eldership Guild / Advisory Board',
    structureLevels: ['Central Campus', 'Satellite Sites', 'Small Cell Groups'],
    liturgicalTerm: 'Worship Series Calendar',
    sacramentTerm: 'Sacred Ordinances',
    governanceManual: 'Local Church Bylaws & Corporate Charter'
  }
};

const DEPARTMENTS_INFO_LIST: DepartmentInfo[] = [
  // Category: Administration
  { id: 'DEPT-EXEC', category: 'Administration', name: "Executive Administration", code: 'EXA', leadRole: 'Chancellory Secretary', defaultLeader: 'Sister Grace Kiconco', budgetAllocated: 50000, budgetSpent: 12000, description: "Coordinates the Archbishop/Bishop Office, Chancellor's decree rosters, and central provincial operations." },
  { id: 'DEPT-GOV', category: 'Administration', name: 'Governance & Corporate Affairs', code: 'GOV', leadRole: 'Synod Clerk', defaultLeader: 'Very Rev. Jonathan Kisawuzi', budgetAllocated: 30000, budgetSpent: 8500, description: "Manages General Assembly, Synod boards, Canon Law audits, and diocesan constitutional compliance." },
  { id: 'DEPT-HR', category: 'Administration', name: 'Human Resource Management', code: 'HRM', leadRole: 'HR Director', defaultLeader: 'Sister Agnes Nakato', budgetAllocated: 40000, budgetSpent: 15400, description: "Governs Clergy postings, pension enrollments, layout ministry welfare pools, and performance scorecards." },
  { id: 'DEPT-LEGAL', category: 'Administration', name: 'Legal Affairs & Land Registry', code: 'LGL', leadRole: 'Provincial Registrar', defaultLeader: 'Adv. Samuel Ssenyondo', budgetAllocated: 45000, budgetSpent: 5000, description: "Protects land deed coordinates, processes contractor legalities, and manages ecclesiastical property rights." },
  { id: 'DEPT-ICT', category: 'Administration', name: 'ICT & Digital Services', code: 'ICT', leadRole: 'IT Director', defaultLeader: 'Brother Joseph Ssewankambo', budgetAllocated: 60000, budgetSpent: 35000, description: "Runs the JDHP digital services, AI routing gateways, database backups, and online streaming pipelines." },
  
  // Category: Pastoral
  { id: 'DEPT-WORSHIP', category: 'Pastoral', name: 'Worship & Liturgy', code: 'WSH', leadRole: 'Choir Master', defaultLeader: 'Sister Esther Kiconco', budgetAllocated: 20000, budgetSpent: 7200, description: "Coordinates choral schedules, hymnal audio publishing, liturgy planning, and altar guild operations." },
  { id: 'DEPT-MISSION', category: 'Pastoral', name: 'Evangelism & Missions', code: 'MSN', leadRole: 'Missions Director', defaultLeader: 'Rev. Emmanuel Mukasa', budgetAllocated: 80000, budgetSpent: 42000, description: "Drives church planting crusades, cross-cultural missions, and specialized chaplaincies (prison/military)." },
  { id: 'DEPT-EDU', category: 'Pastoral', name: 'Christian Education', code: 'CED', leadRole: 'Sunday School Lead', defaultLeader: 'Sister Harriet Nabakooza', budgetAllocated: 15000, budgetSpent: 3100, description: "Manages Sunday school curricula, youth fellowships, confirmation catechism registers, and discipleship booklets." },
  { id: 'DEPT-FAMILY', category: 'Pastoral', name: 'Family & Community Life', code: 'FAM', leadRole: 'Mothers Union Lead', defaultLeader: 'Deaconess Sarah Kintu', budgetAllocated: 25000, budgetSpent: 9800, description: "Sponsors Mothers' and Fathers' unions, marital counseling registries, and vulnerable orphan care programs." },

  // Category: Finance_Property
  { id: 'DEPT-FINANCE', category: 'Finance_Property', name: 'Finance & Treasury (FAAP)', code: 'FIN', leadRole: 'Chief Treasurer', defaultLeader: 'Dr. Emmanuel Otim', budgetAllocated: 90000, budgetSpent: 28000, description: "Administers direct JUMO FAAP ledger bookkeeping, 1.5% clearing reconciliations, and endowment investment portfolios." },
  { id: 'DEPT-PROPERTY', category: 'Finance_Property', name: 'Property & Facilities Management', code: 'PRP', leadRole: 'Estates Officer', defaultLeader: 'Eng. Amos Kabareebe', budgetAllocated: 120000, budgetSpent: 65000, description: "Coordinates Cathedral facilities, diocese building constructions, fleet maintenance, and utility audits." },
  { id: 'DEPT-STEWARD', category: 'Finance_Property', name: 'Stewardship & Giving Center', code: 'STW', leadRole: 'Giving Lead', defaultLeader: 'Brother Julius Moses', budgetAllocated: 10000, budgetSpent: 1200, description: "Administers digital M-Pesa tithing systems, special thanksgiving harvests, and building fundraising campaigns." },

  // Category: PublicServices
  { id: 'DEPT-HEALTH', category: 'PublicServices', name: 'Health & Medical Services', code: 'MED', leadRole: 'Medical Coordinator', defaultLeader: 'Dr. Rebecca Nakitto', budgetAllocated: 110000, budgetSpent: 52000, description: "Governs church-affiliated clinics, regional health centers, pharmacy supplies, and medical outreach camps." },
  { id: 'DEPT-SCHOOLS', category: 'PublicServices', name: 'Education Network', code: 'EDN', leadRole: 'Education Officer', defaultLeader: 'Prof. Samuel Okello', budgetAllocated: 95000, budgetSpent: 38000, description: "Integrates central chancellorship with affiliated primary/secondary schools, theological seminaries, and bible colleges." },
  { id: 'DEPT-PROJECTS', category: 'PublicServices', name: 'Development & Projects Council', code: 'PRJ', leadRole: 'Projects Architect', defaultLeader: 'Sister Faith Kiconco', budgetAllocated: 150000, budgetSpent: 92000, description: "Executes water projects, agricultural cooperatives, strategic planning development, and women-empowerment grants." },
  { id: 'DEPT-COMM', category: 'PublicServices', name: 'Communications & Media Centre', code: 'COM', leadRole: 'Public Relations Officer', defaultLeader: 'Brother Paul Kigozi', budgetAllocated: 35000, budgetSpent: 18000, description: "Runs broadcasting SMS platforms, bishop circular distributions, sermon libraries, and social media media centers." },
  { id: 'DEPT-ARCHIVES', category: 'PublicServices', name: 'Archives & Heritage Preservation', code: 'ARC', leadRole: 'Archival Custodian', defaultLeader: 'Rev. Canon Jonathan Kisawuzi', budgetAllocated: 18000, budgetSpent: 2500, description: "Maintains historic maps, Bishops diaries, permanent sacramental registers, and rare theological manuscript indexes." }
];

export const ChurchDepartments: React.FC = () => {
  // ==========================================
  // STATE DEFINITIONS
  // ==========================================
  
  // Denomination State
  const [selectedDenomination, setSelectedDenomination] = useState<DenominationType>('Anglican');
  const [configWizardOpen, setConfigWizardOpen] = useState<boolean>(false);
  
  // Layout Navigation State
  const [activeDeptId, setActiveDeptId] = useState<string>('DEPT-EXEC');
  const [activeSubTab, setActiveSubTab] = useState<'dashboard' | 'staff' | 'finance' | 'workflows' | 'meetings' | 'comms' | 'registers' | 'safeguarding'>('dashboard');
  const [filterCategory, setFilterCategory] = useState<'ALL' | 'Administration' | 'Pastoral' | 'Finance_Property' | 'PublicServices'>('ALL');

  // Interactive Staff State
  const [staffList, setStaffList] = useState<StaffMember[]>([
    { id: 'STF-001', name: 'Sister Grace Kiconco', role: 'Diocesan Secretary', departmentId: 'DEPT-EXEC', safeguardingCleared: true, pensionEnrolled: true, authLevel: 'Admin', contact: 'grace@namirembe.org' },
    { id: 'STF-002', name: 'Very Rev. Canon Jonathan Kisawuzi', role: 'Cathedral Provost', departmentId: 'DEPT-GOV', safeguardingCleared: true, pensionEnrolled: true, authLevel: 'Admin', contact: 'jonathan@namirembe.org' },
    { id: 'STF-003', name: 'Sister Agnes Nakato', role: 'HR Coordinator', departmentId: 'DEPT-HR', safeguardingCleared: true, pensionEnrolled: true, authLevel: 'Admin', contact: 'agnes@namirembe.org' },
    { id: 'STF-004', name: 'Adv. Samuel Ssenyondo', role: 'Legal Chancellor', departmentId: 'DEPT-LEGAL', safeguardingCleared: true, pensionEnrolled: false, authLevel: 'Staff', contact: 'samuel@namirembe.org' },
    { id: 'STF-005', name: 'Brother Joseph Ssewankambo', role: 'Chief Systems Analyst', departmentId: 'DEPT-ICT', safeguardingCleared: true, pensionEnrolled: true, authLevel: 'Admin', contact: 'joseph@namirembe.org' },
    { id: 'STF-006', name: 'Sister Esther Kiconco', role: 'Choir Director', departmentId: 'DEPT-WORSHIP', safeguardingCleared: true, pensionEnrolled: true, authLevel: 'Staff', contact: 'esther@namirembe.org' },
    { id: 'STF-007', name: 'Rev. Emmanuel Mukasa', role: 'Missions Vicar', departmentId: 'DEPT-MISSION', safeguardingCleared: true, pensionEnrolled: true, authLevel: 'Admin', contact: 'emmanuel@namirembe.org' },
    { id: 'STF-008', name: 'Sister Harriet Nabakooza', role: 'Children Ministry Lead', departmentId: 'DEPT-EDU', safeguardingCleared: true, pensionEnrolled: false, authLevel: 'Staff', contact: 'harriet@namirembe.org' },
    { id: 'STF-009', name: 'Deaconess Sarah Kintu', role: 'Mothers Union Chairman', departmentId: 'DEPT-FAMILY', safeguardingCleared: true, pensionEnrolled: true, authLevel: 'Staff', contact: 'sarah@namirembe.org' },
    { id: 'STF-010', name: 'Dr. Emmanuel Otim', role: 'Board of Finance Accountant', departmentId: 'DEPT-FINANCE', safeguardingCleared: true, pensionEnrolled: true, authLevel: 'Admin', contact: 'otim@namirembe.org' },
    { id: 'STF-011', name: 'Eng. Amos Kabareebe', role: 'Estates Surveyor', departmentId: 'DEPT-PROPERTY', safeguardingCleared: true, pensionEnrolled: true, authLevel: 'Staff', contact: 'amos@namirembe.org' },
    { id: 'STF-012', name: 'Brother Julius Moses', role: 'Giving Coordinator', departmentId: 'DEPT-STEWARD', safeguardingCleared: true, pensionEnrolled: false, authLevel: 'Staff', contact: 'julius@namirembe.org' },
    { id: 'STF-013', name: 'Dr. Rebecca Nakitto', role: 'Chief Medical Officer', departmentId: 'DEPT-HEALTH', safeguardingCleared: true, pensionEnrolled: false, authLevel: 'Staff', contact: 'rebecca@namirembe.org' },
    { id: 'STF-014', name: 'Prof. Samuel Okello', role: 'Theology College Dean', departmentId: 'DEPT-SCHOOLS', safeguardingCleared: true, pensionEnrolled: true, authLevel: 'Admin', contact: 'okello@namirembe.org' },
    { id: 'STF-015', name: 'Sister Faith Kiconco', role: 'M&E Coordinator', departmentId: 'DEPT-PROJECTS', safeguardingCleared: true, pensionEnrolled: true, authLevel: 'Staff', contact: 'faith@namirembe.org' },
    { id: 'STF-016', name: 'Brother Paul Kigozi', role: 'PR & Media Director', departmentId: 'DEPT-COMM', safeguardingCleared: true, pensionEnrolled: false, authLevel: 'Staff', contact: 'paul@namirembe.org' }
  ]);

  const [newStaff, setNewStaff] = useState({ name: '', role: '', authLevel: 'Staff' as any, contact: '' });

  // Interactive Financial Ledger State (simulated direct integration with JUMO FAAP)
  const [ledgerEntries, setLedgerEntries] = useState<LedgerEntry[]>([
    { id: 'FAAP-SWP-001', date: '2026-07-25', description: 'Central Tithe M-Pesa Reconciled Sweep', debit: 0, credit: 45000, category: 'Tithe', clearingFee: 675, status: 'CLEARED' },
    { id: 'FAAP-SWP-002', date: '2026-07-24', description: 'Sunday Thanksgiving Harvest Cash Deposit', debit: 0, credit: 12500, category: 'Thanksgiving', clearingFee: 187.5, status: 'CLEARED' },
    { id: 'FAAP-EXP-003', date: '2026-07-23', description: 'Released Clinic Solar Grid Contractor Initial Fee', debit: 15000, credit: 0, category: 'Clinic', clearingFee: 225, status: 'CLEARED' },
    { id: 'FAAP-EXP-004', date: '2026-07-22', description: 'Vicar Postings Monthly Pension Trust Sweeps', debit: 4200, credit: 0, category: 'Salary', clearingFee: 63, status: 'CLEARED' },
    { id: 'FAAP-DON-005', date: '2026-07-20', description: 'Water Borehole Strategic Donor Allocation', debit: 0, credit: 30000, category: 'Building Fund', clearingFee: 450, status: 'CLEARED' }
  ]);

  const [newLedger, setNewLedger] = useState({ description: '', debit: '0', credit: '0', category: 'Tithe' as any });

  // Interactive Workflows & Signatures State
  const [workflowsList, setWorkflowsList] = useState<WorkflowTask[]>([
    { id: 'WFK-101', title: 'Approve $85,000 Roof Restorations Contractor Tender', initiator: 'Eng. Amos Kabareebe', cost: 85000, status: 'PENDING_APPROVAL', mfaRequired: true, timestamp: '2026-07-26' },
    { id: 'WFK-102', title: 'Certify Holy Trinity Primary School Boundary Coordinates', initiator: 'Adv. Samuel Ssenyondo', cost: 0, status: 'APPROVED_AND_SIGNED', mfaRequired: false, timestamp: '2026-07-24' },
    { id: 'WFK-103', title: 'Authorize Soroti Mission Clinic Medicine Procurement', initiator: 'Dr. Rebecca Nakitto', cost: 7500, status: 'PENDING_APPROVAL', mfaRequired: true, timestamp: '2026-07-26' },
    { id: 'WFK-104', title: 'Establish Bishop Welfare Pension Trust Account', initiator: 'Sister Agnes Nakato', cost: 15000, status: 'APPROVED_AND_SIGNED', mfaRequired: true, timestamp: '2026-07-21' }
  ]);

  const [signaturePin, setSignaturePin] = useState<string>('');
  const [selectedWorkflowId, setSelectedWorkflowId] = useState<string | null>(null);

  // Interactive Meetings & Synod State (with AI Minutes Assistant)
  const [meetingsList, setMeetingsList] = useState<DepartmentMeeting[]>([
    { 
      id: 'MTG-001', 
      title: 'Annual Diocesan Synod Strategic Assembly', 
      date: '2026-07-28', 
      agenda: ['1. Double-Entry Tithing Audits', '2. Safeguarding Compliance Checklist', '3. M-Pesa 1.5% Settlement Clearance Reports'], 
      attendeesCount: 48, 
      status: 'UPCOMING',
      resolutions: []
    },
    { 
      id: 'MTG-002', 
      title: 'Mothers Union Welfare Board Council', 
      date: '2026-07-24', 
      agenda: ['1. High School Bursary Approvals', '2. Hospital Maternity Outreach Logistics'], 
      attendeesCount: 15, 
      status: 'COMPLETED',
      minutesSummary: 'Resolved to allocate $5,000 for local prenatal support and verified 14 new scholarship applicants.',
      resolutions: ['RESOLVED: Allocate $5,000 for regional prenatal support packages.', 'RESOLVED: Formally approve 14 high-school girl bursaries under Cathedral wing.']
    }
  ]);

  const [newMeeting, setNewMeeting] = useState({ title: '', date: '', agendaInput: '' });
  const [aiMinutesOutput, setAiMinutesOutput] = useState<string>('');
  const [isSummarizing, setIsSummarizing] = useState<boolean>(false);

  // Interactive Communications State (with smart demographic filters)
  const [commsCampaigns, setCommsCampaigns] = useState([
    { id: 'CAM-01', title: 'Daily Devotion - Liturgical Cycle', target: 'All Members', channel: 'WhatsApp / Email', sentCount: 14800, date: '2026-07-26' },
    { id: 'CAM-02', title: 'Safeguarding Mandatory Training Notice', target: 'All Clergy & Staff', channel: 'SMS Broadcast', sentCount: 42, date: '2026-07-25' }
  ]);

  const [commsForm, setCommsForm] = useState({ title: '', message: '', ageFilter: 'All', genderFilter: 'All', statusFilter: 'All', channel: 'SMS' });
  const [aiDraftOutput, setAiDraftOutput] = useState<string>('');
  const [isDrafting, setIsDrafting] = useState<boolean>(false);

  // Permanent Registry State (Sacramental registers + land deeds)
  const [registrySearch, setRegistrySearch] = useState<string>('');
  const [selectedBookFilter, setSelectedBookFilter] = useState<'ALL' | 'Baptism' | 'Confirmation' | 'Marriage' | 'Funeral' | 'Clergy' | 'LandDeed'>('ALL');
  const [permanentRegisters, setPermanentRegisters] = useState<PermanentRegister[]>([
    { id: 'REG-BAP-001', bookType: 'Baptism', names: 'Agnes Nakato Walusimbi (Daughter of Stephen Walusimbi & Mary Nakato)', dateOfRecord: '1998-05-12', officiatingClergy: 'Very Rev. Canon Jonathan Kisawuzi', locationNode: 'Namirembe Cathedral Main Sanctuary', cryptographicSeal: 'SHA256:8f41e9a2b53f6e1a9082c3c6fde80d3e1a0b3f88d92911b3e412a613f1b490ce', status: 'CERTIFIED' },
    { id: 'REG-BAP-002', bookType: 'Baptism', names: 'Samuel Ssewankambo Junior', dateOfRecord: '2005-11-20', officiatingClergy: 'Rev. Emmanuel Mukasa', locationNode: 'St. Jude Mission Outpost', cryptographicSeal: 'SHA256:7f1c1a9b2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a', status: 'CERTIFIED' },
    { id: 'REG-CON-001', bookType: 'Confirmation', names: 'Esther Kiconco (Sponsor: Deaconess Sarah Kintu)', dateOfRecord: '2014-06-15', officiatingClergy: 'Rt. Rev. Moses Banja', locationNode: 'Namirembe Cathedral Choir Wing', cryptographicSeal: 'SHA256:a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2', status: 'CERTIFIED' },
    { id: 'REG-MAR-001', bookType: 'Marriage', names: 'Julius Moses & Esther Kiconco', dateOfRecord: '2024-04-18', officiatingClergy: 'Most Rev. Stephen Kaziimba Mugalu', locationNode: 'Namirembe Cathedral Main Sanctuary', cryptographicSeal: 'SHA256:9c8d7e6f5a4b3c2d1e0f9a8b7c6d5e4f3g2h1i0j9k8l7m6n5o4p3q2r1s0t9u8v', status: 'CERTIFIED' },
    { id: 'REG-FUN-001', bookType: 'Funeral', names: 'Late Elder Stephen Walusimbi (Age 78)', dateOfRecord: '2025-01-10', officiatingClergy: 'Very Rev. Canon Jonathan Kisawuzi', locationNode: 'Cathedral Cemetery Section G', cryptographicSeal: 'SHA256:5e4d3c2b1a0f9e8d7c6b5a4f3e2d1c0b9a8f7e6d5c4b3a2f1e0d9c8b7a6f5e4d', status: 'CERTIFIED' },
    { id: 'REG-CLG-001', bookType: 'Clergy', names: 'Rev. Emmanuel Mukasa (Ordained Priest)', dateOfRecord: '2019-12-05', officiatingClergy: 'Most Rev. Stephen Kaziimba Mugalu', locationNode: 'Provincial Chancellory Desk', cryptographicSeal: 'SHA256:bc8f2a9e3d4c7b8192a83c7d6e5f01234a5b6c7d8e9f01a2b3c4d5e6f7a8b9c0', status: 'CERTIFIED' },
    { id: 'REG-LND-001', bookType: 'LandDeed', names: 'Namirembe Plot 12 Cathedral Sanctuary Ground (45.2 Hectares)', dateOfRecord: '1915-08-30', officiatingClergy: 'Adv. Samuel Ssenyondo (Registrar)', locationNode: 'Land Registry Archives Box B-12', cryptographicSeal: 'SHA256:4d8e9f01a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9', status: 'CERTIFIED' }
  ]);

  const [newRegisterForm, setNewRegisterForm] = useState({ bookType: 'Baptism' as any, names: '', officiatingClergy: '', locationNode: '' });

  // Safeguarding & Compliance State
  const [incidentList, setIncidentList] = useState<SafeguardingIncident[]>([
    { id: 'INC-201', reporter: 'Sister Harriet Nabakooza', date: '2026-07-22', description: 'Sunday School visitor corridor access pattern without a matching certified staff escort.', severity: 'MEDIUM', status: 'MITIGATED' },
    { id: 'INC-202', reporter: 'Eng. Amos Kabareebe', date: '2026-07-24', description: 'Identified minor property boundary variance of 0.8 meters on Northern School block plot.', severity: 'LOW', status: 'INVESTIGATING' }
  ]);

  const [newIncident, setNewIncident] = useState({ reporter: '', description: '', severity: 'LOW' as any });

  // ==========================================
  // COMPUTED CONFIGURATIONS & VALUES
  // ==========================================
  
  const denomConfig = DENOMINATION_PRESETS[selectedDenomination];
  const activeDept = DEPARTMENTS_INFO_LIST.find(d => d.id === activeDeptId) || DEPARTMENTS_INFO_LIST[0];

  const filteredDeptsList = useMemo(() => {
    if (filterCategory === 'ALL') return DEPARTMENTS_INFO_LIST;
    return DEPARTMENTS_INFO_LIST.filter(d => d.category === filterCategory);
  }, [filterCategory]);

  // Zero-Trust Auth levels count
  const activeStaffForDept = useMemo(() => {
    return staffList.filter(s => s.departmentId === activeDeptId);
  }, [staffList, activeDeptId]);

  // Direct calculation of tithing & fee sweeps
  const financialTotals = useMemo(() => {
    const activeEntries = ledgerEntries.filter(e => {
      if (activeDeptId === 'DEPT-FINANCE' || activeDeptId === 'DEPT-STEWARD') return true;
      if (activeDeptId === 'DEPT-HEALTH' && e.category === 'Clinic') return true;
      if (activeDeptId === 'DEPT-SCHOOLS' && e.category === 'School') return true;
      if (activeDeptId === 'DEPT-PROPERTY' && e.category === 'Procurement') return true;
      if (activeDeptId === 'DEPT-HR' && e.category === 'Salary') return true;
      return false;
    });

    const debits = activeEntries.reduce((sum, e) => sum + e.debit, 0);
    const credits = activeEntries.reduce((sum, e) => sum + e.credit, 0);
    const fees = activeEntries.reduce((sum, e) => sum + e.clearingFee, 0);

    return { debits, credits, fees, entryCount: activeEntries.length, activeEntries };
  }, [ledgerEntries, activeDeptId]);

  // ==========================================
  // ACTION HANDLERS
  // ==========================================

  const handleEnrollStaff = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStaff.name.trim() || !newStaff.role.trim()) return;

    const added: StaffMember = {
      id: `STF-0${staffList.length + 1}`,
      name: newStaff.name,
      role: newStaff.role,
      departmentId: activeDeptId,
      safeguardingCleared: true,
      pensionEnrolled: true,
      authLevel: newStaff.authLevel,
      contact: newStaff.contact || 'contact@churchedos.org'
    };

    setStaffList([...staffList, added]);
    setNewStaff({ name: '', role: '', authLevel: 'Staff', contact: '' });
    alert(`Successfully enrolled ${added.name} as ${added.role} in ${activeDept.name}. Zero-Trust security profile initialized.`);
  };

  const handlePostLedger = (e: React.FormEvent) => {
    e.preventDefault();
    const debitVal = parseFloat(newLedger.debit) || 0;
    const creditVal = parseFloat(newLedger.credit) || 0;

    if (!newLedger.description.trim() || (debitVal === 0 && creditVal === 0)) return;

    // Automatic 1.5% clearings calculation
    const amount = creditVal > 0 ? creditVal : debitVal;
    const computedFee = amount * 0.015;

    const added: LedgerEntry = {
      id: `FAAP-SIM-0${ledgerEntries.length + 1}`,
      date: new Date().toISOString().substring(0, 10),
      description: newLedger.description,
      debit: debitVal,
      credit: creditVal,
      category: newLedger.category,
      clearingFee: computedFee,
      status: 'SIMULATED'
    };

    setLedgerEntries([added, ...ledgerEntries]);
    setNewLedger({ description: '', debit: '0', credit: '0', category: 'Tithe' });
    alert(`Entry posted successfully. 1.5% Settlement Clearing Fee of $${(computedFee ?? 0).toFixed(2)} applied and routed to central JUMO Master Treasury.`);
  };

  const handleCreateWorkflow = (title: string, cost: number) => {
    const added: WorkflowTask = {
      id: `WFK-0${workflowsList.length + 1}`,
      title,
      initiator: activeDept.defaultLeader,
      cost,
      status: 'PENDING_APPROVAL',
      mfaRequired: cost > 10000,
      timestamp: new Date().toISOString().substring(0, 10)
    };
    setWorkflowsList([added, ...workflowsList]);
    alert(`Administrative workflow dispatched: "${title}"`);
  };

  const handleSignWorkflow = (id: string) => {
    const task = workflowsList.find(w => w.id === id);
    if (!task) return;

    if (task.mfaRequired && signaturePin !== '1926') {
      alert("❌ Dual-Signature verification failed. Invalid secure chancellorship signing credentials.");
      return;
    }

    setWorkflowsList(workflowsList.map(w => {
      if (w.id === id) {
        return { ...w, status: 'APPROVED_AND_SIGNED' };
      }
      return w;
    }));
    setSignaturePin('');
    setSelectedWorkflowId(null);
    alert(`🔒 Canonical Dual-Signature Applied! Seal established under Archbishop and Chancellor credentials.`);
  };

  const handlePostMeeting = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMeeting.title.trim() || !newMeeting.date) return;

    const added: DepartmentMeeting = {
      id: `MTG-0${meetingsList.length + 1}`,
      title: newMeeting.title,
      date: newMeeting.date,
      agenda: newMeeting.agendaInput.split(',').map(a => a.trim()).filter(Boolean),
      attendeesCount: 0,
      status: 'UPCOMING',
      resolutions: []
    };

    setMeetingsList([added, ...meetingsList]);
    setNewMeeting({ title: '', date: '', agendaInput: '' });
    alert(`Meeting scheduled: ${added.title}`);
  };

  const runAiMinutesSummarizer = (meetingId: string) => {
    setIsSummarizing(true);
    setAiMinutesOutput('');
    const meeting = meetingsList.find(m => m.id === meetingId);
    
    setTimeout(() => {
      setIsSummarizing(false);
      const generatedMinutes = `⛪ [JUMO Ecclesiastical AI Scribe - Department Minutes]: 
Synod minutes draft compiled for: "${meeting?.title || 'Departmental Session'}".
Date: ${meeting?.date || 'Today'}.

1. CALL TO ORDER: Session commenced by Lead Chair: ${activeDept.defaultLeader}.
2. DOUBLE-ENTRY LEDGER RECONCILIATION: Reconciled active budgets with perfect $0.00 offset verified. 1.5% clearing fees synchronized to JDHP portal.
3. ADOPTED RESOLUTIONS:
   - RESOLVED: Confirm full child protection background checks on all volunteer catechists.
   - RESOLVED: Re-verify coordinates for Namirembe Sanctuary boundary plot #PL-012.
4. ACTION REGISTER DISPATCHED:
   - HR department to sync vicar pension files by Q3.
   - ICT lead to deploy encrypted database backups.`;

      setAiMinutesOutput(generatedMinutes);
      
      // Update meeting summary in state
      setMeetingsList(meetingsList.map(m => {
        if (m.id === meetingId) {
          return {
            ...m,
            status: 'COMPLETED',
            attendeesCount: 22,
            minutesSummary: 'Resolved to enforce double-entry tithing reconciliations, synchronized 1.5% clearing records on AEGIS ledger.',
            resolutions: ['RESOLVED: Confirm all local coordinates are logged.', 'RESOLVED: Dispatch safe-church agreements to diocese.']
          };
        }
        return m;
      }));
    }, 1200);
  };

  const handlePostRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRegisterForm.names.trim() || !newRegisterForm.officiatingClergy.trim()) return;

    const randomHash = Array.from({length: 64}, () => Math.floor(Math.random()*16).toString(16)).join('');

    const added: PermanentRegister = {
      id: `REG-${newRegisterForm.bookType.substring(0,3).toUpperCase()}-0${permanentRegisters.length + 1}`,
      bookType: newRegisterForm.bookType,
      names: newRegisterForm.names,
      dateOfRecord: new Date().toISOString().substring(0, 10),
      officiatingClergy: newRegisterForm.officiatingClergy,
      locationNode: newRegisterForm.locationNode || 'Cathedral Sanctuary Main Altar',
      cryptographicSeal: `SHA256:${randomHash}`,
      status: 'CERTIFIED'
    };

    setPermanentRegisters([added, ...permanentRegisters]);
    setNewRegisterForm({ bookType: 'Baptism', names: '', officiatingClergy: '', locationNode: '' });
    alert(`Sacramental entry registered! Cryptographic hash signed and cataloged on the permanent heritage register: ${added.id}`);
  };

  const handleDraftComms = () => {
    if (!commsForm.title.trim()) return;
    setIsDrafting(true);
    setAiDraftOutput('');

    setTimeout(() => {
      setIsDrafting(false);
      const generatedMsg = `📜 [AI Pastoral Assistant - Sermon & Circular Composer]:
Drafting target: [${commsForm.ageFilter} / ${commsForm.genderFilter} / ${commsForm.statusFilter}]
Theme: "${commsForm.title}"

"Beloved Congregation,
In accordance with the liturgical cycle, we reflect on our communal covenant. Let us stand firm in stewardship, ensuring our households remain sanctuary spaces of faith and active grace. We invite all families to join the upcoming assembly on ${new Date().toLocaleDateString()}."

👉 Action Point: Confirm your registration on the PWA portal. 1.5% mobile tithing clearings fully updated.`;

      setAiDraftOutput(generatedMsg);
      setCommsForm({ ...commsForm, message: generatedMsg });
    }, 1000);
  };

  const handleDispatchComms = () => {
    if (!commsForm.title.trim() || !commsForm.message.trim()) return;

    const added = {
      id: `CAM-0${commsCampaigns.length + 1}`,
      title: commsForm.title,
      target: `${commsForm.genderFilter} Members (${commsForm.ageFilter})`,
      channel: commsForm.channel + ' Broadcast',
      sentCount: commsForm.genderFilter === 'All' ? 14820 : 4290,
      date: new Date().toISOString().substring(0, 10)
    };

    setCommsCampaigns([added, ...commsCampaigns]);
    setCommsForm({ title: '', message: '', ageFilter: 'All', genderFilter: 'All', statusFilter: 'All', channel: 'SMS' });
    setAiDraftOutput('');
    alert(`Bulk transmission scheduled! Successfully queued ${added.sentCount} notifications via the JUMO Communications Platform.`);
  };

  const handlePostIncident = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newIncident.reporter.trim() || !newIncident.description.trim()) return;

    const added: SafeguardingIncident = {
      id: `INC-${Math.floor(Math.random()*900) + 100}`,
      reporter: newIncident.reporter,
      date: new Date().toISOString().substring(0, 10),
      description: newIncident.description,
      severity: newIncident.severity,
      status: 'INVESTIGATING'
    };

    setIncidentList([added, ...incidentList]);
    setNewIncident({ reporter: '', description: '', severity: 'LOW' });
    alert(`Critical Safeguarding Incident Report logged under strictly controlled chancellorship access. Reference: ${added.id}`);
  };

  // Registry filter search
  const filteredRegisters = useMemo(() => {
    return permanentRegisters.filter(reg => {
      const matchBook = selectedBookFilter === 'ALL' || reg.bookType === selectedBookFilter;
      const matchSearch = reg.names.toLowerCase().includes(registrySearch.toLowerCase()) || 
                          reg.officiatingClergy.toLowerCase().includes(registrySearch.toLowerCase()) ||
                          reg.id.toLowerCase().includes(registrySearch.toLowerCase());
      return matchBook && matchSearch;
    });
  }, [permanentRegisters, selectedBookFilter, registrySearch]);

  return (
    <div className="bg-slate-50 min-h-screen text-slate-800 flex flex-col">
      
      {/* 1. CDOS CANONICAL PLATFORM HEADER */}
      <div className="bg-white border-b border-slate-200 shadow-xs px-6 py-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 bg-indigo-100 text-indigo-800 font-mono text-[10px] font-bold rounded">JUMO UEOS v10.4-W</span>
            <span className="text-slate-600">•</span>
            <span className="text-xs text-slate-500 font-medium font-sans">Sovereign Church Digital Operating System (CDOS)</span>
          </div>
          <h1 className="text-xl font-bold text-slate-900 mt-1 flex items-center gap-2">
            <Building2 className="w-5 h-5 text-indigo-600" />
            Ecclesiastical Department Management Suite
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Running tailored {denomConfig.name} governance framework. Reporting line: <span className="font-mono text-indigo-700 font-semibold">{denomConfig.structureLevels.join(' ➔ ')}</span>.
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setConfigWizardOpen(true)}
            className="px-3 py-1.5 border border-slate-300 bg-white hover:bg-slate-50 text-xs font-semibold rounded flex items-center gap-1.5 transition-all shadow-xs"
          >
            <Sliders className="w-4 h-4 text-indigo-600" />
            Tailor Governance Wizard
          </button>
        </div>
      </div>

      {/* ==========================================
          DENOMINATION TAILORING WIZARD OVERLAY
          ========================================== */}
      {configWizardOpen && (
        <div className="fixed inset-0 bg-white/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl border border-slate-200 shadow-2xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 text-left">
            <div className="bg-indigo-900 text-white p-5 flex justify-between items-center">
              <div>
                <span className="text-[9px] uppercase font-bold tracking-wider text-indigo-300 font-mono">UAMP CANONICAL WIZARD</span>
                <h3 className="text-lg font-bold flex items-center gap-1.5 mt-0.5">
                  <Sliders className="w-5 h-5 text-indigo-300" />
                  Tailor Ecclesiastical ERP Wizard
                </h3>
              </div>
              <button 
                onClick={() => setConfigWizardOpen(false)}
                className="w-8 h-8 rounded-full hover:bg-indigo-800 flex items-center justify-center text-white font-bold text-sm transition-all"
              >
                ✕
              </button>
            </div>
            
            <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
              <p className="text-xs text-slate-600 leading-relaxed">
                Tailor the JUMO CDOS engine to match your denominational governance structure. This updates active terminologies, liturgical periods, sacramental registers, and operational hierarchy models across all 17 departments dynamically.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                {Object.keys(DENOMINATION_PRESETS).map((key) => {
                  const item = DENOMINATION_PRESETS[key as DenominationType];
                  const isSelected = selectedDenomination === key;
                  return (
                    <button
                      key={key}
                      onClick={() => {
                        setSelectedDenomination(key as DenominationType);
                        alert(`Governance preset changed to: ${item.name}. Terminology updated.`);
                      }}
                      className={`p-3 rounded-lg border text-left transition-all text-xs flex flex-col justify-between ${
                        isSelected 
                          ? 'border-indigo-600 bg-indigo-50/55 shadow-sm ring-1 ring-indigo-600' 
                          : 'border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex justify-between items-center w-full">
                        <strong className="text-slate-950 block text-[13px]">{item.name}</strong>
                        {isSelected && <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />}
                      </div>
                      <span className="text-slate-500 mt-1 block font-medium">Head Office: {item.topLeaderTitle}</span>
                      <span className="text-[10px] text-indigo-800 font-mono mt-1 block">Seal: {item.governanceManual}</span>
                    </button>
                  );
                })}
              </div>

              {/* Reporting structure visualization */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider font-mono block">Dynamic Hierarchy Mapping:</span>
                <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-800 font-medium">
                  {denomConfig.structureLevels.map((lvl, index) => (
                    <React.Fragment key={lvl}>
                      <span className="px-2.5 py-1 bg-white border rounded shadow-xs text-slate-900">{lvl}</span>
                      {index < denomConfig.structureLevels.length - 1 && <ChevronRight className="w-3.5 h-3.5 text-slate-600 shrink-0" />}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-slate-50 p-4 border-t border-slate-200 flex justify-end gap-2">
              <button
                onClick={() => setConfigWizardOpen(false)}
                className="px-4 py-2 bg-indigo-700 hover:bg-indigo-800 text-white font-bold rounded text-xs transition-all shadow-sm"
              >
                Apply Framework Configurations
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==========================================
          MAIN TWO-COLUMN WORKSPACE
          ========================================== */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 min-h-0">
        
        {/* LEFT COLUMN: 17 DEPARTMENTS SELECTOR */}
        <div className="bg-white border-r border-slate-200 flex flex-col h-full overflow-hidden">
          <div className="p-4 border-b border-slate-100 bg-slate-50">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-2 font-mono">Filter Categories:</span>
            <div className="flex flex-wrap gap-1">
              {[
                { id: 'ALL', label: 'All Depts' },
                { id: 'Administration', label: 'Admin' },
                { id: 'Pastoral', label: 'Pastoral' },
                { id: 'Finance_Property', label: 'Finance' },
                { id: 'PublicServices', label: 'Services' }
              ].map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setFilterCategory(cat.id as any)}
                  className={`px-2 py-1 text-[11px] font-bold rounded transition-all ${
                    filterCategory === cat.id 
                      ? 'bg-indigo-600 text-white shadow-xs' 
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Department buttons scrollable */}
          <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
            {filteredDeptsList.map(dept => {
              const isActive = activeDeptId === dept.id;
              return (
                <button
                  key={dept.id}
                  onClick={() => {
                    setActiveDeptId(dept.id);
                    setAiMinutesOutput('');
                    setAiDraftOutput('');
                  }}
                  className={`w-full p-3.5 text-left transition-all flex items-start gap-3 relative ${
                    isActive 
                      ? 'bg-indigo-50/55 border-r-3 border-indigo-600' 
                      : 'hover:bg-slate-50/70'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                    isActive ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {dept.id.includes('EXEC') || dept.id.includes('GOV') ? <Building2 className="w-4 h-4" /> :
                     dept.id.includes('FIN') || dept.id.includes('STEW') ? <DollarSign className="w-4 h-4" /> :
                     dept.id.includes('WOR') ? <Music className="w-4 h-4" /> :
                     dept.id.includes('MSN') ? <Compass className="w-4 h-4" /> :
                     dept.id.includes('HEA') ? <Activity className="w-4 h-4" /> :
                     dept.id.includes('SCH') ? <GraduationCap className="w-4 h-4" /> :
                     dept.id.includes('ARC') ? <Archive className="w-4 h-4" /> :
                     dept.id.includes('ICT') ? <Cpu className="w-4 h-4" /> : <Users className="w-4 h-4" />}
                  </div>
                  <div className="min-w-0">
                    <strong className={`block text-xs font-bold ${isActive ? 'text-indigo-900' : 'text-slate-800'}`}>
                      {dept.name}
                    </strong>
                    <span className="text-[10px] text-slate-600 block mt-0.5">Code: {dept.code} • Leader: {dept.defaultLeader}</span>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="p-4 border-t border-slate-100 bg-slate-50 space-y-2 text-xs">
            <span className="font-bold text-slate-700 block uppercase tracking-wider text-[10px] font-mono">Department Core Specs:</span>
            <div className="p-3 bg-white border border-slate-200 rounded-lg">
              <strong className="text-slate-800 text-[11px] block font-bold">{activeDept.leadRole}: {activeDept.defaultLeader}</strong>
              <p className="text-[10.5px] text-slate-500 mt-1 leading-normal">{activeDept.description}</p>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: MINI-ERP WORKSPACE AREA */}
        <div className="lg:col-span-3 flex flex-col h-full bg-slate-50 overflow-hidden">
          
          {/* Active Department Workspace Header */}
          <div className="bg-white p-5 border-b border-slate-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
            <div>
              <span className="text-[9px] uppercase font-bold tracking-wider text-indigo-600 font-mono">ACTIVE DEPARTMENTS ENTERPRISE WORKSPACE</span>
              <h2 className="text-lg font-bold text-slate-900 mt-0.5 flex items-center gap-2">
                {activeDept.name} Workspace
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Primary Lead: <span className="font-semibold text-slate-800">{activeDept.defaultLeader} ({activeDept.leadRole})</span> • Budget Allocated: <span className="font-semibold font-mono text-indigo-700">${activeDept.budgetAllocated.toLocaleString()}</span>
              </p>
            </div>

            <div className="flex gap-2">
              <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 font-mono font-bold text-xs rounded border border-emerald-200 shrink-0">
                FAAP COMPLIANT
              </span>
            </div>
          </div>

          {/* Sub-Tabs Nav Bar */}
          <div className="flex border-b border-slate-200 bg-white overflow-x-auto shrink-0">
            {[
              { id: 'dashboard', label: 'Operational Dashboard', icon: BarChart3 },
              { id: 'staff', label: 'Staff & Volunteers', icon: Users },
              { id: 'finance', label: 'FAAP Ledger & Giving', icon: DollarSign },
              { id: 'workflows', label: 'Workflows & MFA', icon: Lock },
              { id: 'meetings', label: 'Synod & Councils', icon: Calendar },
              { id: 'comms', label: 'Communications', icon: Send },
              { id: 'registers', label: 'Permanent Registers', icon: Archive },
              { id: 'safeguarding', label: 'Safeguarding & Risk', icon: ShieldAlert }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeSubTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveSubTab(tab.id as any)}
                  className={`py-3 px-4 text-xs font-semibold border-b-2 flex items-center gap-1.5 transition-all whitespace-nowrap shrink-0 ${
                    isActive 
                      ? 'border-indigo-600 text-indigo-700 bg-indigo-50/15' 
                      : 'border-transparent text-slate-500 hover:text-slate-900'
                  }`}
                >
                  <Icon className="w-4 h-4 text-indigo-600 shrink-0" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* SUB-TAB SCROLLABLE MAIN CONTENT AREA */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">

            {/* PANEL 1: OPERATIONAL DASHBOARD */}
            {activeSubTab === 'dashboard' && (
              <div className="space-y-6 animate-in fade-in duration-200">
                {/* Financial KPI stats bar */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
                    <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider block">Department Budget limit</span>
                    <strong className="text-xl font-bold text-slate-900 block mt-1 font-mono">${activeDept.budgetAllocated.toLocaleString()}.00</strong>
                    <span className="text-[10px] text-slate-500 block mt-1">Authorized by Board of Finance</span>
                  </div>

                  <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
                    <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider block">Spent & Accounted</span>
                    <strong className="text-xl font-bold text-emerald-700 block mt-1 font-mono">${activeDept.budgetSpent.toLocaleString()}.00</strong>
                    <span className="text-[10px] text-emerald-600 font-semibold block mt-1">100% Double-entry cleared</span>
                  </div>

                  <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
                    <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider block">Utilization Percentage</span>
                    <strong className="text-xl font-bold text-indigo-700 block mt-1 font-mono">{(activeDept?.budgetAllocated > 0 ? (((activeDept.budgetSpent ?? 0) / activeDept.budgetAllocated) * 100).toFixed(1) : '0.0')}%</strong>
                    <span className="text-[10px] text-slate-500 block mt-1">Within budget threshold</span>
                  </div>

                  <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
                    <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider block">Active Officers</span>
                    <strong className="text-xl font-bold text-slate-900 block mt-1">{activeStaffForDept.length} Personnel</strong>
                    <span className="text-[10px] text-slate-500 block mt-1">Zero-Trust accredited</span>
                  </div>
                </div>

                {/* Domain custom telemetry */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Left big box: Customized Department Metrics */}
                  <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs md:col-span-2 space-y-4">
                    <h3 className="font-bold text-slate-900 text-sm border-b pb-2 flex items-center gap-1.5">
                      <Star className="w-4 h-4 text-indigo-600 animate-spin-slow" />
                      Departmental Custom Telemetry & KPI Targets
                    </h3>
                    
                    {/* Render different stats depending on selected department */}
                    {activeDept.id === 'DEPT-FINANCE' || activeDept.id === 'DEPT-STEWARD' ? (
                      <div className="space-y-4">
                        <p className="text-xs text-slate-600">Reconciled M-Pesa giving streams synchronized to JUMO Treasury with automatic clearing fees applied.</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                          <div className="p-3 bg-slate-50 border rounded-lg">
                            <span className="text-slate-600 block">Accumulated Tithes Swept</span>
                            <strong className="text-slate-800 text-sm mt-1 block">$1,482,900.00</strong>
                          </div>
                          <div className="p-3 bg-slate-50 border rounded-lg">
                            <span className="text-slate-600 block">1.5% Settlement Pool</span>
                            <strong className="text-emerald-700 text-sm mt-1 block">+$22,243.50</strong>
                          </div>
                        </div>
                      </div>
                    ) : activeDept.id === 'DEPT-HEALTH' ? (
                      <div className="space-y-4">
                        <p className="text-xs text-slate-600">Health ministry clinics, immunization counts, and rural outreach programs.</p>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                          <div className="p-3 bg-slate-50 border rounded-lg">
                            <span className="text-slate-600 block">Active Hospitals/Clinics</span>
                            <strong className="text-slate-800 text-sm mt-1 block">14 facilities</strong>
                          </div>
                          <div className="p-3 bg-slate-50 border rounded-lg">
                            <span className="text-slate-600 block">Beds Occupancy</span>
                            <strong className="text-slate-800 text-sm mt-1 block">84% Capacity</strong>
                          </div>
                          <div className="p-3 bg-slate-50 border rounded-lg">
                            <span className="text-slate-600 block">Vaccines Administered</span>
                            <strong className="text-indigo-600 text-sm mt-1 block">4,290 patients</strong>
                          </div>
                        </div>
                      </div>
                    ) : activeDept.id === 'DEPT-SCHOOLS' ? (
                      <div className="space-y-4">
                        <p className="text-xs text-slate-600">Education Network affiliated nursery, primary, secondary and vocational institutions.</p>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                          <div className="p-3 bg-slate-50 border rounded-lg">
                            <span className="text-slate-600 block">Primary Schools</span>
                            <strong className="text-slate-800 text-sm mt-1 block">24 Registered</strong>
                          </div>
                          <div className="p-3 bg-slate-50 border rounded-lg">
                            <span className="text-slate-600 block">Secondary/Vocational</span>
                            <strong className="text-slate-800 text-sm mt-1 block">12 Registered</strong>
                          </div>
                          <div className="p-3 bg-slate-50 border rounded-lg">
                            <span className="text-slate-600 block">Theology College Scholars</span>
                            <strong className="text-indigo-600 text-sm mt-1 block">245 Students</strong>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <p className="text-xs text-slate-600">Standard operational goals for clergy engagement, worship attendance, and parish history registers.</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                          <div className="p-3 bg-slate-50 border rounded-lg">
                            <span className="text-slate-600 block">Monthly Event Attendance Rate</span>
                            <strong className="text-slate-800 text-sm mt-1 block">94.2% Reconciled</strong>
                          </div>
                          <div className="p-3 bg-slate-50 border rounded-lg">
                            <span className="text-slate-600 block">Permanent Record Books Verified</span>
                            <strong className="text-indigo-600 text-sm mt-1 block">100% Cryptographic Signed</strong>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="pt-2">
                      <span className="text-slate-500 text-[11px] block mb-1">Target Milestone: Project Development Goals</span>
                      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div className="bg-indigo-600 h-full" style={{ width: '65%' }} />
                      </div>
                      <span className="text-slate-600 text-[10px] block mt-1">Status: On track to complete Q3 development objectives</span>
                    </div>
                  </div>

                  {/* Right small box: Quick actions */}
                  <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-3 flex flex-col justify-between">
                    <div>
                      <h3 className="font-bold text-slate-900 text-sm border-b pb-2 flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4 text-indigo-600 animate-pulse" />
                        AI Strategic Advisor
                      </h3>
                      <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                        Ecclesiastical AI analyst automatically monitors this workspace. It flags budget overrides, pension mismatches, or outstanding background checks instantly.
                      </p>
                    </div>

                    <button
                      onClick={() => alert(`⛪ [JUMO Ecclesiastical AI Auditor]: Current workspace diagnostics look excellent. All ${activeStaffForDept.length} staff are cleared on Child protection. Tithing ledger offsets are at absolute parity ($0.00 skew).`)}
                      className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded shadow transition-all flex items-center justify-center gap-1.5"
                    >
                      <Bot className="w-4 h-4 text-indigo-200" />
                      Run Department AI Scan
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* PANEL 2: STAFF & VOLUNTEERS */}
            {activeSubTab === 'staff' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in duration-200 text-xs">
                {/* Roster list */}
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs lg:col-span-2 space-y-4">
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm border-b pb-2 flex items-center gap-1.5">
                      <Users className="w-4 h-4 text-indigo-600" />
                      Department Personnel & Volunteer Roster
                    </h3>
                    <p className="text-slate-500 mt-1">Zero-Trust accredited operators permitted to log ledger entries and sign resolutions.</p>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="border-b border-slate-200 bg-slate-50 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                          <th className="py-2 px-3">Officer Name</th>
                          <th className="py-2 px-3">Role</th>
                          <th className="py-2 px-3 text-center">Safeguarding Check</th>
                          <th className="py-2 px-3 text-center">Pension Sync</th>
                          <th className="py-2 px-3">Auth Level</th>
                          <th className="py-2 px-3 text-center">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-slate-700">
                        {activeStaffForDept.map(member => (
                          <tr key={member.id} className="hover:bg-slate-50/55">
                            <td className="py-3 px-3 font-semibold text-slate-900">{member.name}</td>
                            <td className="py-3 px-3 text-slate-600">{member.role}</td>
                            <td className="py-3 px-3 text-center">
                              <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                                CLEARED
                              </span>
                            </td>
                            <td className="py-3 px-3 text-center">
                              <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold border ${
                                member.pensionEnrolled 
                                  ? 'bg-blue-100 text-blue-800 border-blue-200' 
                                  : 'bg-amber-100 text-amber-800 border-amber-200'
                              }`}>
                                {member.pensionEnrolled ? 'ENROLLED' : 'N/A'}
                              </span>
                            </td>
                            <td className="py-3 px-3 font-semibold font-mono text-[10.5px] text-indigo-700">
                              {member.authLevel}
                            </td>
                            <td className="py-3 px-3 text-center">
                              <button
                                onClick={() => {
                                  setStaffList(staffList.filter(s => s.id !== member.id));
                                  alert(`De-authorized and removed officer: ${member.name}`);
                                }}
                                className="px-1.5 py-0.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded font-bold"
                              >
                                Revoke
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Add Personnel Form */}
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-4 h-fit">
                  <h3 className="font-bold text-slate-900 text-sm border-b pb-2 flex items-center gap-1.5">
                    <UserPlus className="w-4 h-4 text-indigo-600" />
                    Enroll Ecclesiastical Personnel
                  </h3>

                  <form onSubmit={handleEnrollStaff} className="space-y-3.5">
                    <div>
                      <label className="block text-slate-600 font-semibold mb-1">Full Name</label>
                      <input
                        type="text"
                        value={newStaff.name}
                        onChange={(e) => setNewStaff({ ...newStaff, name: e.target.value })}
                        placeholder="e.g. Deaconess Harriet"
                        className="w-full p-2 rounded border border-slate-300 bg-white"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-slate-600 font-semibold mb-1">Role / Designation</label>
                      <input
                        type="text"
                        value={newStaff.role}
                        onChange={(e) => setNewStaff({ ...newStaff, role: e.target.value })}
                        placeholder="e.g. Welfare Coordinator"
                        className="w-full p-2 rounded border border-slate-300 bg-white"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-slate-600 font-semibold mb-1">Contact Email</label>
                      <input
                        type="email"
                        value={newStaff.contact}
                        onChange={(e) => setNewStaff({ ...newStaff, contact: e.target.value })}
                        placeholder="officer@church.org"
                        className="w-full p-2 rounded border border-slate-300 bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-600 font-semibold mb-1">Role-Based Access Level</label>
                      <select
                        value={newStaff.authLevel}
                        onChange={(e) => setNewStaff({ ...newStaff, authLevel: e.target.value as any })}
                        className="w-full p-2 rounded border border-slate-300 bg-white"
                      >
                        <option value="Admin">Admin (Full Write/Sign)</option>
                        <option value="Staff">Staff (Standard Ledger)</option>
                        <option value="Witness">Witness (Validate Only)</option>
                        <option value="Read-only">Read-only Observer</option>
                      </select>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded shadow transition-all"
                    >
                      Certify & Enroll Officer
                    </button>
                  </form>
                </div>
              </div>
            )}

            {/* PANEL 3: FINANCIAL LEDGER & GIVING (FAAP INTEGRATION) */}
            {activeSubTab === 'finance' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in duration-200 text-xs">
                {/* Ledger Listing */}
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs lg:col-span-2 space-y-4">
                  <div className="flex justify-between items-center border-b pb-2">
                    <div>
                      <h3 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                        <DollarSign className="w-4 h-4 text-indigo-600" />
                        JUMO FAAP Unified Department Ledger Sweeps
                      </h3>
                      <p className="text-slate-500 mt-1">Reconciled debits, credits, and M-Pesa clearing pools showing zero-offset balance parity.</p>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-slate-600 block font-mono">1.5% Fee Pool Volume</span>
                      <strong className="text-emerald-700 font-mono text-[13px] font-bold">+${(financialTotals?.fees ?? 0).toFixed(2)}</strong>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div className="p-2 bg-slate-50 rounded border">
                      <span className="text-slate-600 text-[10px] block">Sum of Debits</span>
                      <strong className="text-slate-800 font-mono text-sm mt-0.5 block">${financialTotals.debits.toLocaleString()}.00</strong>
                    </div>
                    <div className="p-2 bg-slate-50 rounded border">
                      <span className="text-slate-600 text-[10px] block">Sum of Credits</span>
                      <strong className="text-slate-800 font-mono text-sm mt-0.5 block">${financialTotals.credits.toLocaleString()}.00</strong>
                    </div>
                    <div className="p-2 bg-emerald-50 text-emerald-950 border border-emerald-200 rounded">
                      <span className="text-emerald-700 text-[10px] block">Double-entry Offset</span>
                      <strong className="text-emerald-800 font-mono text-sm mt-0.5 block">$0.00 Parity</strong>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {financialTotals.activeEntries.map(entry => (
                      <div key={entry.id} className="p-3 bg-slate-50/70 border rounded-lg flex justify-between items-center text-xs hover:bg-slate-50 transition-all">
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="font-mono text-[10px] text-slate-600 font-bold">{entry.id}</span>
                            <span className="px-1.5 py-0.2 bg-slate-200 text-slate-600 rounded text-[9px] font-bold uppercase">{entry.category}</span>
                          </div>
                          <strong className="text-slate-900 block mt-1 font-semibold truncate">{entry.description}</strong>
                          <span className="text-[10px] text-slate-600 font-mono">Date: {entry.date} • JUMO Master Cleared</span>
                        </div>

                        <div className="text-right shrink-0">
                          <strong className={`font-mono text-xs block ${entry.credit > 0 ? 'text-emerald-700' : 'text-slate-900'}`}>
                            {entry.credit > 0 ? `+ $${entry.credit.toLocaleString()}.00` : `- $${entry.debit.toLocaleString()}.00`}
                          </strong>
                          <span className="text-[10px] text-emerald-600 font-mono mt-0.5 block">Clearing Fee: ${(entry.clearingFee ?? 0).toFixed(2)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Post Transactions form */}
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-4 h-fit">
                  <div className="border-b pb-2">
                    <h3 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                      <Plus className="w-4 h-4 text-indigo-600" />
                      Post Direct FAAP Entry
                    </h3>
                    <p className="text-slate-500 text-[11px] mt-0.5">Clears instantly on Archbishop JUMO Treasury ledger.</p>
                  </div>

                  <form onSubmit={handlePostLedger} className="space-y-3.5">
                    <div>
                      <label className="block text-slate-600 font-semibold mb-1">Transaction Description</label>
                      <input
                        type="text"
                        value={newLedger.description}
                        onChange={(e) => setNewLedger({ ...newLedger, description: e.target.value })}
                        placeholder="e.g. Sunday School Manual Procurements"
                        className="w-full p-2 rounded border border-slate-300 bg-white"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-slate-600 font-semibold mb-1">Debit Amount ($)</label>
                        <input
                          type="number"
                          value={newLedger.debit}
                          onChange={(e) => setNewLedger({ ...newLedger, debit: e.target.value, credit: '0' })}
                          className="w-full p-2 rounded border border-slate-300 bg-white font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-600 font-semibold mb-1">Credit Amount ($)</label>
                        <input
                          type="number"
                          value={newLedger.credit}
                          onChange={(e) => setNewLedger({ ...newLedger, credit: e.target.value, debit: '0' })}
                          className="w-full p-2 rounded border border-slate-300 bg-white font-mono"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-slate-600 font-semibold mb-1">Giving / Expense Category</label>
                      <select
                        value={newLedger.category}
                        onChange={(e) => setNewLedger({ ...newLedger, category: e.target.value as any })}
                        className="w-full p-2 rounded border border-slate-300 bg-white"
                      >
                        <option value="Tithe">Tithe Sweeps</option>
                        <option value="Offering">Sunday Offering</option>
                        <option value="Thanksgiving">Thanksgiving Harvest</option>
                        <option value="Building Fund">Building Capital Fund</option>
                        <option value="Salary">Clergy Posting Salary</option>
                        <option value="Procurement">Standard Procurement</option>
                      </select>
                    </div>

                    <div className="p-3 bg-indigo-50 text-indigo-950 rounded border border-indigo-100 text-[10.5px]">
                      <strong>JUMO Treasury Mandate:</strong> A 1.5% clearance fee is enforced on all transactions. This debit is credited to Fee Revenue.
                    </div>

                    <button
                      type="submit"
                      className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded shadow transition-all"
                    >
                      Commit to FAAP Ledger
                    </button>
                  </form>
                </div>
              </div>
            )}

            {/* PANEL 4: WORKFLOW AUTOMATION & SIGNATURE WALL */}
            {activeSubTab === 'workflows' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in duration-200 text-xs">
                {/* Active Workflows list */}
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs lg:col-span-2 space-y-4">
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm border-b pb-2 flex items-center gap-1.5">
                      <Lock className="w-4 h-4 text-indigo-600" />
                      Administrative Workflows & Ecclesiastical Approvals
                    </h3>
                    <p className="text-slate-500 mt-1">High-risk capital releases or licensing certifications requiring MFA Dual-Signatures.</p>
                  </div>

                  <div className="space-y-3">
                    {workflowsList.map(task => (
                      <div key={task.id} className="p-4 bg-slate-50 border rounded-xl space-y-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span className="font-mono text-slate-600 text-[10px] font-bold">{task.id}</span>
                              {task.mfaRequired && (
                                <span className="px-1.5 py-0.2 bg-rose-100 text-rose-800 text-[9px] font-bold rounded">
                                  MFA WALL REQUIRED
                                </span>
                              )}
                            </div>
                            <strong className="text-slate-900 block mt-1.5 font-bold">{task.title}</strong>
                            <span className="text-slate-500 text-[10.5px] block mt-1">Dispatched by: {task.initiator} • Date: {task.timestamp}</span>
                          </div>

                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold whitespace-nowrap ${
                            task.status === 'APPROVED_AND_SIGNED' ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' : 'bg-amber-100 text-amber-800 border border-amber-200'
                          }`}>
                            {task.status === 'APPROVED_AND_SIGNED' ? 'CERTIFIED & SIGNED' : 'PENDING CHANCELLOR SIGN'}
                          </span>
                        </div>

                        {task.status === 'PENDING_APPROVAL' && (
                          <div className="pt-3 border-t border-slate-200 flex justify-between items-center">
                            <span className="text-slate-600 font-mono font-bold">Release Sum: ${task.cost.toLocaleString()}.00</span>
                            <button
                              onClick={() => {
                                setSelectedWorkflowId(task.id);
                                if (!task.mfaRequired) {
                                  handleSignWorkflow(task.id);
                                }
                              }}
                              className="px-3 py-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded text-[10.5px]"
                            >
                              Dual-Sign Decree
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* MFA Verification Sidebar */}
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-4 h-fit">
                  <div className="border-b pb-2">
                    <h3 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                      <Key className="w-4 h-4 text-indigo-600" />
                      Ecclesiastical Signatures Wall
                    </h3>
                    <p className="text-slate-500 text-[11px] mt-0.5">Verifies Chancellor keys instantly.</p>
                  </div>

                  {selectedWorkflowId ? (
                    <div className="space-y-4">
                      <div className="p-3 bg-amber-50 text-amber-950 border border-amber-200 rounded text-[10.5px] leading-relaxed">
                        <strong>Administrative MFA Shield:</strong> Dual-Signature for task {selectedWorkflowId} requires the chancellorship pin.
                        <br />
                        <span className="font-mono font-bold text-slate-500 mt-2 block">System default authorized pin: <span className="text-indigo-700">1926</span></span>
                      </div>

                      <div>
                        <label className="block text-slate-600 font-semibold mb-1">Enter Cryptographic MFA PIN</label>
                        <input
                          type="password"
                          value={signaturePin}
                          onChange={(e) => setSignaturePin(e.target.value)}
                          placeholder="••••"
                          className="w-full p-2.5 rounded border border-slate-300 bg-white font-mono text-center tracking-widest text-lg"
                        />
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => setSelectedWorkflowId(null)}
                          className="flex-1 py-1.5 border hover:bg-slate-50 text-slate-700 font-bold rounded text-[11px]"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => handleSignWorkflow(selectedWorkflowId)}
                          className="flex-1 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded text-[11px] shadow"
                        >
                          Verify & Sign
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3.5">
                      <p className="text-slate-600 text-[11.5px] leading-relaxed">
                        To initiate a new workflow decree (e.g. missionary deployment, school building fund releases, licensing approvals), click below:
                      </p>
                      
                      <button
                        onClick={() => handleCreateWorkflow(`Disburse ${activeDept.name} Q3 Educational Grant`, 25000)}
                        className="w-full py-2 bg-white hover:bg-white text-white font-bold rounded text-xs transition-all flex items-center justify-center gap-1.5"
                      >
                        <Plus className="w-4 h-4 text-[#0078D4]" /> Dispense Q3 Capital Grant
                      </button>

                      <button
                        onClick={() => handleCreateWorkflow('Renew Licensed Vicar Postings & Pension Allocations', 0)}
                        className="w-full py-2 border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-bold rounded text-xs transition-all flex items-center justify-center gap-1.5"
                      >
                        <RefreshCw className="w-4 h-4 text-slate-600" /> Renew Postings File
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* PANEL 5: MEETINGS & SYNOD PLANNER (WITH AI SUMMARIZATION) */}
            {activeSubTab === 'meetings' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in duration-200 text-xs">
                {/* Meetings scheduler list */}
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs lg:col-span-2 space-y-4">
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm border-b pb-2 flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-indigo-600" />
                      Department Committees & Synod Assemblies
                    </h3>
                    <p className="text-slate-500 mt-1">Schedule House of Bishops, Standing Committees, and Parish Councils.</p>
                  </div>

                  <div className="space-y-4">
                    {meetingsList.map(meeting => (
                      <div key={meeting.id} className="p-4 bg-slate-50 border rounded-xl space-y-3">
                        <div className="flex justify-between items-start border-b pb-2 border-slate-200">
                          <div>
                            <strong className="text-sm font-bold text-slate-900">{meeting.title}</strong>
                            <span className="text-[10px] text-slate-600 block mt-0.5">Meeting Reference: {meeting.id} • Attendees: {meeting.attendeesCount || 'Pending'}</span>
                          </div>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            meeting.status === 'COMPLETED' ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-800'
                          }`}>
                            {meeting.status}
                          </span>
                        </div>

                        <div>
                          <strong className="text-[10.5px] text-slate-500 block mb-1">Agenda Items:</strong>
                          <ul className="list-disc pl-4 space-y-1 text-slate-700 leading-normal">
                            {meeting.agenda.map((ag, i) => (
                              <li key={i}>{ag}</li>
                            ))}
                          </ul>
                        </div>

                        {meeting.minutesSummary && (
                          <div className="p-3 bg-white border border-slate-200 rounded-lg space-y-1.5">
                            <strong className="text-indigo-900 font-bold block flex items-center gap-1 uppercase tracking-wide text-[10px]">
                              <Bot className="w-4 h-4 text-indigo-700" /> Consolidated Synod Minutes:
                            </strong>
                            <p className="text-slate-700 text-[11px] leading-relaxed italic">"{meeting.minutesSummary}"</p>
                          </div>
                        )}

                        <div className="pt-2 border-t flex justify-between items-center">
                          <span className="font-mono text-slate-500 text-[10px]">Target Date: <strong>{meeting.date}</strong></span>
                          <div className="flex gap-1.5">
                            {meeting.status === 'UPCOMING' && (
                              <button
                                onClick={() => runAiMinutesSummarizer(meeting.id)}
                                className="px-3 py-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded text-[10px] flex items-center gap-1"
                              >
                                <Sparkles className="w-3 h-3 text-[#0078D4] animate-pulse" /> Run AI Minutes Scribe
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {aiMinutesOutput && (
                    <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-xl space-y-2 text-xs">
                      <h4 className="text-xs font-bold text-indigo-900 uppercase tracking-wide flex items-center gap-1.5">
                        <Bot className="w-4 h-4 text-indigo-700 animate-bounce" />
                        AI-Assisted Ecclesiastical Minutes Summary Output
                      </h4>
                      <p className="text-indigo-950 font-mono leading-relaxed whitespace-pre-line leading-normal">{aiMinutesOutput}</p>
                    </div>
                  )}
                </div>

                {/* Schedule meeting form */}
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-4 h-fit">
                  <h3 className="font-bold text-slate-900 text-sm border-b pb-2 flex items-center gap-1.5">
                    <Plus className="w-4 h-4 text-indigo-600" />
                    Propose Assembly Session
                  </h3>

                  <form onSubmit={handlePostMeeting} className="space-y-3.5">
                    <div>
                      <label className="block text-slate-600 font-semibold mb-1">Meeting/Synod Title</label>
                      <input
                        type="text"
                        value={newMeeting.title}
                        onChange={(e) => setNewMeeting({ ...newMeeting, title: e.target.value })}
                        placeholder="e.g. Cathedral Finance Sub-committee"
                        className="w-full p-2 rounded border border-slate-300 bg-white"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-slate-600 font-semibold mb-1">Target Date</label>
                      <input
                        type="date"
                        value={newMeeting.date}
                        onChange={(e) => setNewMeeting({ ...newMeeting, date: e.target.value })}
                        className="w-full p-2 rounded border border-slate-300 bg-white font-mono"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-slate-600 font-semibold mb-1">Agenda Items (Comma separated)</label>
                      <textarea
                        value={newMeeting.agendaInput}
                        onChange={(e) => setNewMeeting({ ...newMeeting, agendaInput: e.target.value })}
                        placeholder="1. Audit, 2. Safeguarding, 3. Welfare"
                        className="w-full p-2 rounded border border-slate-300 bg-white h-20 resize-none"
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded shadow transition-all"
                    >
                      Schedule Committee Meeting
                    </button>
                  </form>
                </div>
              </div>
            )}

            {/* PANEL 6: COMMUNICATIONS & MEDIA HUB */}
            {activeSubTab === 'comms' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in duration-200 text-xs">
                {/* Dispatch Communications Form */}
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs lg:col-span-2 space-y-4 text-xs">
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm border-b pb-2 flex items-center gap-1.5">
                      <Send className="w-4 h-4 text-indigo-600" />
                      Unified Communications Dispatch Board
                    </h3>
                    <p className="text-slate-500 mt-1">Broadcast daily devotions, pastoral circulars, and emergency alerts with custom filters.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-slate-600 font-semibold mb-1">Filter by Age Cohort</label>
                      <select
                        value={commsForm.ageFilter}
                        onChange={(e) => setCommsForm({ ...commsForm, ageFilter: e.target.value })}
                        className="w-full p-2 border rounded bg-white"
                      >
                        <option value="All">All Members</option>
                        <option value="Youth">Youths (13-24)</option>
                        <option value="Mothers">Mothers Guilds</option>
                        <option value="Elderly">Elderly Members</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-slate-600 font-semibold mb-1">Filter by Gender/Union</label>
                      <select
                        value={commsForm.genderFilter}
                        onChange={(e) => setCommsForm({ ...commsForm, genderFilter: e.target.value })}
                        className="w-full p-2 border rounded bg-white"
                      >
                        <option value="All">All Genders</option>
                        <option value="Mothers">Mothers Union</option>
                        <option value="Fathers">Fathers Union</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-slate-600 font-semibold mb-1">Channel Delivery</label>
                      <select
                        value={commsForm.channel}
                        onChange={(e) => setCommsForm({ ...commsForm, channel: e.target.value })}
                        className="w-full p-2 border rounded bg-white"
                      >
                        <option value="SMS">Bulk SMS Gateway</option>
                        <option value="WhatsApp">WhatsApp Business API</option>
                        <option value="Email">Bulk HTML Email</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="block text-slate-600 font-semibold mb-1">Broadcast Topic / Theme</label>
                      <input
                        type="text"
                        value={commsForm.title}
                        onChange={(e) => setCommsForm({ ...commsForm, title: e.target.value })}
                        placeholder="e.g. Namirembe Strategic Census Rebalancing Seminar"
                        className="w-full p-2 border rounded bg-white"
                      />
                    </div>

                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={handleDraftComms}
                        className="px-3.5 py-1 bg-indigo-100 hover:bg-indigo-200 text-indigo-700 font-bold rounded text-[11px] flex items-center gap-1.5"
                      >
                        <Sparkles className="w-4 h-4 text-indigo-700 animate-pulse" />
                        AI Draft Pastoral Letter
                      </button>
                    </div>

                    {aiDraftOutput && (
                      <div className="p-3 bg-indigo-50 border border-indigo-200 rounded-lg text-indigo-950 font-mono text-[10.5px] leading-relaxed whitespace-pre-line">
                        {aiDraftOutput}
                      </div>
                    )}

                    <div>
                      <label className="block text-slate-600 font-semibold mb-1">Notification Message Content</label>
                      <textarea
                        value={commsForm.message}
                        onChange={(e) => setCommsForm({ ...commsForm, message: e.target.value })}
                        placeholder="Draft or paste pastoral content here..."
                        className="w-full p-2 border rounded bg-white h-24 resize-none leading-normal"
                      />
                    </div>

                    <button
                      type="button"
                      onClick={handleDispatchComms}
                      className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded shadow transition-all flex items-center justify-center gap-2"
                    >
                      <Send className="w-4 h-4 text-indigo-200" /> Dispatch Transmission Group
                    </button>
                  </div>
                </div>

                {/* Comms Logs */}
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-4 h-fit">
                  <h3 className="font-bold text-slate-900 text-sm border-b pb-2 flex items-center gap-1.5">
                    <Tv className="w-4 h-4 text-indigo-600" />
                    Broadcast History Log
                  </h3>

                  <div className="space-y-3">
                    {commsCampaigns.map(camp => (
                      <div key={camp.id} className="p-3 bg-slate-50 border rounded-lg text-xs space-y-1.5">
                        <div className="flex justify-between items-center font-semibold">
                          <strong className="text-slate-900">{camp.title}</strong>
                          <span className="text-[10px] text-slate-600 font-mono">{camp.id}</span>
                        </div>
                        <p className="text-slate-500 text-[10.5px]">Target: {camp.target} • Via: {camp.channel}</p>
                        <div className="flex justify-between items-center text-[10px] text-slate-600 font-mono pt-1 border-t border-slate-200/65">
                          <span>Total Sent: <strong className="text-indigo-700">{camp.sentCount.toLocaleString()}</strong></span>
                          <span>{camp.date}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* PANEL 7: PERMANENT PARISH REGISTRY & SACRAMENTAL BOOKS */}
            {activeSubTab === 'registers' && (
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 animate-in fade-in duration-200 text-xs">
                
                {/* Search & filters bar */}
                <div className="lg:col-span-1 bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-4 h-fit">
                  <h3 className="font-bold text-slate-900 text-sm border-b pb-2 flex items-center gap-1.5">
                    <Archive className="w-4 h-4 text-indigo-600" />
                    Select Registry Book
                  </h3>

                  <div className="space-y-1">
                    {[
                      { id: 'ALL', label: 'All Historic Books' },
                      { id: 'Baptism', label: 'Baptism Register' },
                      { id: 'Confirmation', label: 'Confirmation Register' },
                      { id: 'Marriage', label: 'Marriage Register' },
                      { id: 'Funeral', label: 'Funeral Register' },
                      { id: 'Clergy', label: 'Clergy & Lay Register' },
                      { id: 'LandDeed', label: 'Property Deeds & Maps' }
                    ].map(book => (
                      <button
                        key={book.id}
                        onClick={() => setSelectedBookFilter(book.id as any)}
                        className={`w-full p-2 rounded text-left transition-all font-semibold ${
                          selectedBookFilter === book.id 
                            ? 'bg-indigo-600 text-white shadow-xs' 
                            : 'text-slate-600 hover:bg-slate-50 border border-transparent'
                        }`}
                      >
                        {book.label}
                      </button>
                    ))}
                  </div>

                  <div className="pt-2 border-t">
                    <label className="block text-slate-600 font-semibold mb-1">Search Registers</label>
                    <div className="relative">
                      <input
                        type="text"
                        value={registrySearch}
                        onChange={(e) => setRegistrySearch(e.target.value)}
                        placeholder="Search names or seals..."
                        className="w-full p-2 pl-8 rounded border border-slate-300 bg-white"
                      />
                      <Search className="w-4 h-4 text-slate-600 absolute left-2.5 top-2.5" />
                    </div>
                  </div>
                </div>

                {/* Registry Search Results & Certificate Generator */}
                <div className="lg:col-span-3 space-y-4">
                  <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-4">
                    <div className="flex justify-between items-center border-b pb-2">
                      <div>
                        <h3 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4 text-indigo-600" />
                          Ecclesiastical Sacramental Permanent Registers
                        </h3>
                        <p className="text-slate-500 mt-1">Sovereign certified church histories, signed baptisms, and land coordinates.</p>
                      </div>

                      <button
                        onClick={() => alert(`Consolidated registers exported as signed JSON package: SHA256 matches verified.`)}
                        className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 border rounded font-semibold text-xs flex items-center gap-1 shadow-xs"
                      >
                        <FileDown className="w-3.5 h-3.5 text-slate-600" />
                        Export Book
                      </button>
                    </div>

                    <div className="space-y-3">
                      {filteredRegisters.length > 0 ? (
                        filteredRegisters.map(record => (
                          <div key={record.id} className="p-3.5 bg-slate-50 border rounded-xl space-y-2 hover:bg-slate-50 transition-all">
                            <div className="flex justify-between items-start gap-4">
                              <div>
                                <div className="flex items-center gap-1.5">
                                  <span className="font-mono text-[10px] text-slate-600 font-bold">{record.id}</span>
                                  <span className="px-1.5 py-0.2 bg-indigo-100 text-indigo-800 text-[9px] font-bold rounded uppercase">
                                    {record.bookType} Register
                                  </span>
                                </div>
                                <h4 className="font-bold text-slate-950 mt-1.5 text-sm">{record.names}</h4>
                                <p className="text-slate-600 text-[11px] mt-1">Officiating: {record.officiatingClergy} • Location: {record.locationNode}</p>
                              </div>
                              <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 font-bold text-[9px] rounded font-mono">
                                CERTIFIED
                              </span>
                            </div>

                            <div className="pt-2 border-t border-slate-200 flex justify-between items-center text-[10px] text-slate-600 font-mono">
                              <span className="truncate max-w-xs">{record.cryptographicSeal}</span>
                              <span>Recorded: {record.dateOfRecord}</span>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="p-8 text-center text-slate-600 bg-slate-50 border border-dashed rounded-xl">
                          No certified sacramental files match your filter selection.
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Register New Sacramental Entry Form */}
                  <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-4">
                    <h3 className="font-bold text-slate-900 text-sm border-b pb-2 flex items-center gap-1.5">
                      <Plus className="w-4 h-4 text-indigo-600" />
                      Seal New Sacramental Registry Entry
                    </h3>

                    <form onSubmit={handlePostRegister} className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                      <div>
                        <label className="block text-slate-600 font-semibold mb-1">Target Register Book</label>
                        <select
                          value={newRegisterForm.bookType}
                          onChange={(e) => setNewRegisterForm({ ...newRegisterForm, bookType: e.target.value as any })}
                          className="w-full p-2 border rounded bg-white"
                        >
                          <option value="Baptism">Baptism Register</option>
                          <option value="Confirmation">Confirmation Register</option>
                          <option value="Marriage">Marriage Register</option>
                          <option value="Funeral">Funeral Register</option>
                          <option value="Clergy">Clergy & Lay Register</option>
                          <option value="LandDeed">Property Deeds & Maps</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-slate-600 font-semibold mb-1">Names / Parties Involved</label>
                        <input
                          type="text"
                          value={newRegisterForm.names}
                          onChange={(e) => setNewRegisterForm({ ...newRegisterForm, names: e.target.value })}
                          placeholder="e.g. John Doe (Son of Arthur Doe)"
                          className="w-full p-2 border rounded bg-white"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-slate-600 font-semibold mb-1">Officiating Clergy / Registrar</label>
                        <input
                          type="text"
                          value={newRegisterForm.officiatingClergy}
                          onChange={(e) => setNewRegisterForm({ ...newRegisterForm, officiatingClergy: e.target.value })}
                          placeholder="e.g. Rev. Emmanuel Mukasa"
                          className="w-full p-2 border rounded bg-white"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-slate-600 font-semibold mb-1">Location Coordinates Node</label>
                        <input
                          type="text"
                          value={newRegisterForm.locationNode}
                          onChange={(e) => setNewRegisterForm({ ...newRegisterForm, locationNode: e.target.value })}
                          placeholder="e.g. Cathedral Section G"
                          className="w-full p-2 border rounded bg-white"
                        />
                      </div>

                      <div className="sm:col-span-2 pt-2 flex justify-end">
                        <button
                          type="submit"
                          className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded shadow transition-all"
                        >
                          Sealed & Commit Register Entry
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            )}

            {/* PANEL 8: SAFEGUARDING, RISK & COMPLIANCE */}
            {activeSubTab === 'safeguarding' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in duration-200 text-xs">
                {/* Incidents register list */}
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs lg:col-span-2 space-y-4">
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm border-b pb-2 flex items-center gap-1.5">
                      <ShieldAlert className="w-4.5 h-4.5 text-rose-600 animate-pulse" />
                      Safeguarding incident & Risk Management Ledger
                    </h3>
                    <p className="text-slate-500 mt-1">Vulnerable adult, child protection, and property coordinate variance logs.</p>
                  </div>

                  <div className="space-y-3">
                    {incidentList.map(inc => (
                      <div key={inc.id} className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg space-y-2">
                        <div className="flex justify-between items-center">
                          <strong className="text-slate-800 font-bold">Reference ID: {inc.id}</strong>
                          <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                            inc.severity === 'CRITICAL' ? 'bg-rose-100 text-rose-800 font-bold' : inc.severity === 'HIGH' ? 'bg-amber-100 text-amber-800' : 'bg-slate-200 text-slate-700'
                          }`}>
                            {inc.severity} SEVERITY
                          </span>
                        </div>
                        <p className="text-slate-700 font-mono text-[11px] leading-relaxed italic">"{inc.description}"</p>
                        <div className="flex justify-between items-center text-[10px] text-slate-600 border-t pt-1.5">
                          <span>Reported by: <strong>{inc.reporter}</strong></span>
                          <span className={`px-1.5 py-0.2 rounded font-mono font-bold ${
                            inc.status === 'MITIGATED' ? 'bg-emerald-100 text-emerald-800' : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {inc.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Report Incident Form */}
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-4 h-fit">
                  <div className="border-b pb-2">
                    <h3 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                      <AlertTriangle className="w-4 h-4 text-rose-600" />
                      File Incident Protection Report
                    </h3>
                    <p className="text-slate-500 text-[11px] mt-0.5">Strictly confidential. Transmits to Bishop and Civil Trustees.</p>
                  </div>

                  <form onSubmit={handlePostIncident} className="space-y-3.5">
                    <div>
                      <label className="block text-slate-600 font-semibold mb-1">Reporter Full Name</label>
                      <input
                        type="text"
                        value={newIncident.reporter}
                        onChange={(e) => setNewIncident({ ...newIncident, reporter: e.target.value })}
                        placeholder="e.g. Deaconess Sarah"
                        className="w-full p-2 rounded border border-slate-300 bg-white"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-slate-600 font-semibold mb-1">Description of Incident</label>
                      <textarea
                        value={newIncident.description}
                        onChange={(e) => setNewIncident({ ...newIncident, description: e.target.value })}
                        placeholder="Provide details about safeguarding variance..."
                        className="w-full p-2 rounded border border-slate-300 bg-white h-24 resize-none leading-normal"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-slate-600 font-semibold mb-1">Severity Classification</label>
                      <select
                        value={newIncident.severity}
                        onChange={(e) => setNewIncident({ ...newIncident, severity: e.target.value as any })}
                        className="w-full p-2 rounded border border-slate-300 bg-white"
                      >
                        <option value="LOW">Low (Coordinate skews/Administrative)</option>
                        <option value="MEDIUM">Medium (Visitor corridor check/Process slip)</option>
                        <option value="HIGH">High (Potential trust breach/Unauthorized action)</option>
                        <option value="CRITICAL">Critical (Immediate dispatch needed)</option>
                      </select>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded shadow transition-all"
                    >
                      Log Confidential Report
                    </button>
                  </form>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>

    </div>
  );
};
