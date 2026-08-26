/**
 * JUMO UEOS Phase 26 — Intelligent Enterprise Operating System (UEOS) Universal Domain Runtime
 * Replaces ordinary static ERP dashboards with a configurable, multi-portal, AI-enterprise operating system.
 * Features:
 * - Sovereign Automated Payment Engines (Mobile Money M-Pesa/MTN/Airtel, SWIFT ACH, Card, CBDC, Recurring Pledges/Tithes)
 * - Automated Self-Registration & Demographic Census Data Collection (Age cohorts, Gender/Sex, Marital status, Cell groups)
 * - Multi-Role Separated Portals (e.g., Clergy, Lay Readers, Support Staff, Members for Religious/Church ERP; Donors, Chapter Leads, Mentors for Alumni ERP)
 * - AI Document Verification Tools & Cryptographic SHA-256 Validation Seal
 * - Sovereign Digital Museum & Historical Archive (Centuries of records, audio/visual archives, AI archival researcher)
 * - Advanced Management Templates & Instant Cloning Suite
 */

import React, { useState } from 'react';
import { formatMoney, formatNumber } from '../../utils/formatters';
import { DomainDefinition } from '../../types';
import { 
  Bot, Settings, FileText, BarChart3, Workflow, Terminal, Cloud, ShieldCheck, 
  Users, CreditCard, QrCode, Search, CheckCircle2, AlertTriangle, BookOpen, 
  Heart, Landmark, Building2, Briefcase, GraduationCap, UserCheck, History, 
  Sparkles, RefreshCw, Download, Upload, Plus, Filter, Layers, Lock, Unlock, 
  Send, DollarSign, Globe, Activity, Award, FileCheck, Church, UserPlus, 
  Coins, Scale, Server, Archive, Key, CheckCircle, Smartphone, Banknote, HelpCircle, Eye, ChevronRight,
  Calculator, Home, Calendar, Compass, Cpu, Bell, ArrowLeft, ArrowRight
} from 'lucide-react';

import { ChurchMembership } from './ChurchMembership';
import { ChurchClergy } from './ChurchClergy';
import { ChurchDepartments } from './ChurchDepartments';
import { ChurchGovernance } from './ChurchGovernance';
import { ChurchFinance } from './ChurchFinance';
import { ChurchAssets } from './ChurchAssets';
import { ChurchDocuments } from './ChurchDocuments';
import { ChurchEducation } from './ChurchEducation';
import { ChurchMissions } from './ChurchMissions';
import { ChurchEvents } from './ChurchEvents';
import { ChurchReports } from './ChurchReports';
import { ChurchAIEngines } from './ChurchAIEngines';
import { ChurchSettings } from './ChurchSettings';
import { DioceseOperationsCenter } from './DioceseOperationsCenter';
import { ArchbishopCommandDashboard } from './ArchbishopCommandDashboard';
import { ChurchEnterpriseDOSMaster } from './ChurchEnterpriseDOSMaster';
import { SchoolEnterpriseDOSMaster } from './SchoolEnterpriseDOSMaster';
import { AlumniEnterpriseDOSMaster } from './AlumniEnterpriseDOSMaster';
import { UniversalModuleWorkspaceRuntime } from '../universal-runtime/UniversalModuleWorkspaceRuntime';

interface UniversalDomainRuntimeProps {
  domain: DomainDefinition;
  onNavigate?: (route: string) => void;
  currentRoute?: string;
}

// Payment Engine State Interface
interface PaymentTransaction {
  id: string;
  timestamp: string;
  donorOrMember: string;
  category: 'Tithe' | 'Pledge' | 'Endowment Donation' | 'Tuition & Fees' | 'Hospital Billing' | 'General Contribution';
  method: 'M-Pesa Mobile Money' | 'MTN Mobile Money' | 'Airtel Money' | 'SWIFT ACH Wire' | 'Visa/Mastercard' | 'Sovereign CBDC';
  amount: number;
  currency: string;
  status: 'COMPLETED' | 'PENDING_VERIFICATION' | 'AEGIS_FLAGGED';
  receiptNo: string;
  taxDeductible: boolean;
}

// Demographic Census Interface
interface MemberRegistration {
  id: string;
  fullName: string;
  ageCohort: 'Children (0-12)' | 'Youth (13-24)' | 'Young Adult (25-39)' | 'Adult (40-59)' | 'Elder (60+)';
  gender: 'Male' | 'Female' | 'Other / Undisclosed';
  maritalStatus: 'Single' | 'Married' | 'Widowed' | 'Divorced';
  baptismalOrAlumniStatus: 'Baptized & Confirmed' | 'Catechumen' | 'Verified Alumni' | 'Student Member' | 'General Member';
  cellGroupOrChapter: string;
  phone: string;
  email: string;
  registeredDate: string;
  status: 'VERIFIED_ACTIVE' | 'PENDING_DOCS' | 'ARCHIVED';
}

// Historical Archive & Museum Artifact Interface
interface MuseumArtifact {
  id: string;
  title: string;
  yearOrCentury: string;
  category: 'Parish Register' | 'Royal Synod Decree' | 'University Charter' | 'Audio/Visual Sermon' | 'Land Title & Deed';
  description: string;
  verificationHash: string;
  verifiedByAi: boolean;
}

export const UniversalDomainRuntime: React.FC<UniversalDomainRuntimeProps> = ({ domain, onNavigate, currentRoute }) => {
  const queryParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : new URLSearchParams();
  const activeTemplateId = queryParams.get('template') || (currentRoute && currentRoute.includes('template=') ? currentRoute.split('template=')[1] : null);

  // Navigation & Portal Switcher State
  const [activeTab, setActiveTab] = useState<string>('overview');
  
  // Consolidated 4-Product Domain Identification
  const isFinPayDomain = domain.id === 'JUMO-FINPAY';
  const isEduAlumniDomain = domain.id === 'JUMO-EDU-ALUMNI';
  const isChurchDomain = domain.id === 'JUMO-CHURCH';
  const isControlCenter = domain.id === 'JUMO-CONTROL';
  
  // Legacy flags for specialized UI logic compatibility (mapped to canonical 4)
  const isSchoolDomain = isEduAlumniDomain;
  const isAlumniDomain = isEduAlumniDomain;
  const isSaccoDomain = isFinPayDomain;
  const isFaapDomain = isFinPayDomain;
  
  // Default active role portal based on domain type
  const [activeRolePortal, setActiveRolePortal] = useState<string>(
    isChurchDomain ? 'clergy' : isEduAlumniDomain ? 'faculty' : isFinPayDomain ? 'treasury' : 'executives'
  );

  // --- CHURCH ERP CORE ARCHITECTURE STATES ---
  const churchTiers = [
    { id: 'global', label: 'Global Communion', name: 'Anglican Communion Global Secretariat (Canterbury)', head: 'Most Rev. & Right Hon. Dr. Justin Welby (Archbishop of Canterbury)', activeMembers: 85000000, activeClergy: 124000, annualBudget: 145000000, instances: 165 },
    { id: 'national', label: 'National Church', name: 'National Assembly of Anglican Church of Uganda', head: 'Most Rev. Dr. Stephen Kaziimba (Primate & Archbishop)', activeMembers: 14200000, activeClergy: 24500, annualBudget: 38200000, instances: 42 },
    { id: 'province', label: 'Province', name: 'Ecclesiastical Province of East Africa Synod', head: 'Most Rev. Dr. Jackson Ole Sapit (Provincial Archbishop)', activeMembers: 4800000, activeClergy: 8200, annualBudget: 14900000, instances: 12 },
    { id: 'diocese', label: 'Diocese Hub', name: 'Namirembe Diocesan Bishop Synod & Headquarters', head: 'Right Rev. Moses Banja (Diocesan Bishop)', activeMembers: 482900, activeClergy: 1240, annualBudget: 4290000, instances: 84 },
    { id: 'parish', label: 'Parish Cathedral', name: 'St. Paul Diocesan Cathedral Parish, Namirembe', head: 'Very Rev. Canon Jonathan Kisawuzi (Dean)', activeMembers: 14820, activeClergy: 14, annualBudget: 482900, instances: 14 },
    { id: 'local_church', label: 'Local Congregation', name: 'St. Jude Mission Outpost, Parish Mission', head: 'Rev. Emmanuel Mukasa (Vicar & Priest)', activeMembers: 1250, activeClergy: 2, annualBudget: 45000, instances: 4 },
    { id: 'cell_group', label: 'Home Cell Group', name: 'Northern Cathedral Home Cell Fellowship #4', head: 'Brother Julius Moses (Lay Reader & Leader)', activeMembers: 45, activeClergy: 0, annualBudget: 1200, instances: 1 }
  ];

  const [selectedChurchTier, setSelectedChurchTier] = useState<string>('diocese');

  const activeChurchTierObj = churchTiers.find(t => t.id === selectedChurchTier) || churchTiers[3];

  const [churchAssets, setChurchAssets] = useState([
    { id: 'AST-CH-001', name: 'St. Paul Cathedral Sanctuary & Land Deed', category: 'Real Estate & Properties', value: 8500000, location: 'Namirembe Hill, Plot 4', custodian: 'Diocesan Trustees Board', status: 'VERIFIED_ACTIVE' },
    { id: 'AST-CH-002', name: '18th Century Gold Chalice & Paten Set', category: 'Sacred Vessels & Regalia', value: 250000, location: 'Cathedral Treasury Vault', custodian: 'Very Rev. Dean Kisawuzi', status: 'VERIFIED_ACTIVE' },
    { id: 'AST-CH-003', name: 'Toyota Land Cruiser (Bishop Convoy)', category: 'Vehicle Fleets', value: 120000, location: 'Diocesan Car Pool', custodian: 'Archbishop Administrative Secretary', status: 'VERIFIED_ACTIVE' },
    { id: 'AST-CH-004', name: 'Diocesan Printing Press & Equipment', category: 'Institutional Equipment', value: 180000, location: 'Cathedral Office block B', custodian: 'Support Staff Press Manager', status: 'VERIFIED_ACTIVE' }
  ]);

  const [synodResolutions, setSynodResolutions] = useState([
    { id: 'RES-SYN-2026-01', title: 'Approval of Cathedral Roof Restoration Budget', proposer: 'Very Rev. Canon Jonathan Kisawuzi', status: 'PASSED', date: '2026-06-12', votesFor: 112, votesAgainst: 4, bishopSigned: true },
    { id: 'RES-SYN-2026-02', title: 'Establishment of Youth Development Welfare Fund', proposer: 'Sister Agnes Nakato', status: 'PENDING_SIGNATURE', date: '2026-07-24', votesFor: 98, votesAgainst: 12, bishopSigned: false },
    { id: 'RES-SYN-2026-03', title: 'Leasing of Diocesan Agriculture Plot 14 to Farmers', proposer: 'Deaconess Sarah Kintu', status: 'UNDER_DEBATE', date: '2026-07-25', votesFor: 45, votesAgainst: 38, bishopSigned: false }
  ]);

  const [clergyMembers, setClergyMembers] = useState([
    { id: 'CLG-001', name: 'Right Rev. Moses Banja', role: 'Diocesan Bishop', licenseId: 'LIC-1994-BANJA', ordinationDate: '1994-06-12', status: 'ACTIVE_LICENSED', bio: 'Ordained Bishop governing Namirembe Diocese structures, signing all Diocesan resolutions.' },
    { id: 'CLG-002', name: 'Very Rev. Canon Jonathan Kisawuzi', role: 'Dean of the Cathedral', licenseId: 'LIC-2001-KISAW', ordinationDate: '2001-08-19', status: 'ACTIVE_LICENSED', bio: 'Directs spiritual and secular administration of St. Paul Cathedral Parish.' },
    { id: 'CLG-003', name: 'Rev. Emmanuel Mukasa', role: 'Cathedral Vicar & Priest-in-charge', licenseId: 'LIC-2010-MUKAS', ordinationDate: '2010-11-05', status: 'ACTIVE_LICENSED', bio: 'Manages member care tracking, liturgical preparation, and cell outreach ministries.' },
    { id: 'CLG-004', name: 'Sister Agnes Nakato', role: 'Lay Reader & Sunday School Director', licenseId: 'LIC-2018-NAKAT', ordinationDate: '2018-05-15', status: 'ACTIVE_LICENSED', bio: 'Catechist leading Sunday School ministries and children cohort enrollment.' }
  ]);

  const [doubleEntryPostings, setDoubleEntryPostings] = useState([
    { id: 'JNL-89401', timestamp: '2026-07-25 14:15:22', debitAccount: '1010 - Safaricom M-Pesa Treasury Cash', creditAccount: '4110 - Canonical Tithes & Offerings Revenue', amount: 1500, description: 'Reconciled Tithe - Sarah Kintu' },
    { id: 'JNL-89402', timestamp: '2026-07-25 14:10:05', debitAccount: '1020 - MTN MoMo Settlement Account', creditAccount: '4120 - Capital Campaign Pledges Revenue', amount: 4200, description: 'Reconciled Pledge - Dr. Emmanuel Otim' },
    { id: 'JNL-89403', timestamp: '2026-07-25 13:45:10', debitAccount: '1030 - Central Bank Wire Clearing', creditAccount: '4130 - General Offertory Contributions', amount: 25000, description: 'Reconciled Wire - Youth Fellowship' }
  ]);

  const [prayerName, setPrayerName] = useState('');
  const [prayerText, setPrayerText] = useState('');
  const [prayerRequests, setPrayerRequests] = useState([
    { id: 1, name: 'Brother Julius Moses', text: 'Prayers for the home cell ministry outreach this coming Saturday.', date: '2026-07-25', status: 'ACTIVE', joinedCount: 8 },
    { id: 2, name: 'Sister Agnes Nakato', text: 'Healing for the Sunday School children suffering from flu.', date: '2026-07-24', status: 'ACTIVE', joinedCount: 14 }
  ]);

  const [cellGroups, setCellGroups] = useState([
    { id: 'CEL-01', name: 'Northern Cathedral Cell #4', leader: 'Brother Julius Moses', location: 'Northern Suburbs Sector 2', members: 45, weeklyOffering: 120, pastoralCareRequestCount: 1 },
    { id: 'CEL-02', name: 'Central Cathedral Grace Cell #1', leader: 'Deaconess Sarah Kintu', location: 'Central Town Hall Area', members: 32, weeklyOffering: 95, pastoralCareRequestCount: 0 },
    { id: 'CEL-03', name: 'Worship Praise & Choir Cell', leader: 'Sister Esther Kiconco', location: 'Cathedral Choir Vestry', members: 28, weeklyOffering: 60, pastoralCareRequestCount: 2 }
  ]);

  const handleBishopSign = (resId: string) => {
    setSynodResolutions(synodResolutions.map(r => {
      if (r.id === resId) {
        return { ...r, status: 'PASSED', bishopSigned: true };
      }
      return r;
    }));
    alert("Resolution cryptographically signed via Diocesan Bishop Dual-Key and written to AEGIS sovereign audit trail!");
  };

  const handleSignResolution = (resId: string) => {
    setSynodResolutions(synodResolutions.map(r => {
      if (r.id === resId) {
        return { ...r, status: 'Signed & Gazetted', bishopSigned: true };
      }
      return r;
    }));
    alert("Resolution cryptographically signed via Bishop Banja's key!");
  };

  const handleRegisterPrayer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prayerName.trim() || !prayerText.trim()) return;
    const newPr = {
      id: Date.now(),
      name: prayerName,
      text: prayerText,
      date: new Date().toISOString().substring(0, 10),
      status: 'ACTIVE',
      joinedCount: 1
    };
    setPrayerRequests([newPr, ...prayerRequests]);
    setPrayerName('');
    setPrayerText('');
    alert("Prayer request posted to the pastoral care intercession board!");
  };

  const handleJoinPrayer = (id: number) => {
    setPrayerRequests(prayerRequests.map(p => {
      if (p.id === id) {
        return { ...p, joinedCount: (p.joinedCount || 0) + 1 };
      }
      return p;
    }));
  };

  const handleTriggerCellTelemetry = (cellId: string) => {
    setCellGroups(cellGroups.map(c => {
      if (c.id === cellId) {
        const addedOffering = 50;
        const updatedOffering = c.weeklyOffering + addedOffering;
        
        const newJnl = {
          id: `JNL-${Math.floor(10000 + Math.random() * 90000)}`,
          timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
          debitAccount: '1010 - Safaricom M-Pesa Treasury Cash',
          creditAccount: '4130 - General Offertory Contributions',
          amount: addedOffering,
          description: `Cell Offering - ${c.name} Weekly Telemetry`
        };
        setDoubleEntryPostings([newJnl, ...doubleEntryPostings]);
        return { ...c, weeklyOffering: updatedOffering };
      }
      return c;
    }));
    alert("Weekly cell telemetry & offerings recorded & automatically posted to FAAP Double-Entry General Ledger!");
  };

  const handleRecordCellOffering = handleTriggerCellTelemetry;

  // Interactive Payment Engine State
  const [transactions, setTransactions] = useState<PaymentTransaction[]>([
    {
      id: 'TX-89421-MPE',
      timestamp: '2026-07-25 14:15:22',
      donorOrMember: isChurchDomain ? 'Deaconess Sarah Kintu' : isAlumniDomain ? 'Dr. Robert Mukasa (Class of 1998)' : 'Enterprise Client A',
      category: isChurchDomain ? 'Tithe' : isAlumniDomain ? 'Endowment Donation' : 'General Contribution',
      method: 'M-Pesa Mobile Money',
      amount: 1500,
      currency: 'USD',
      status: 'COMPLETED',
      receiptNo: 'REC-2026-88910',
      taxDeductible: true
    },
    {
      id: 'TX-89422-MTN',
      timestamp: '2026-07-25 14:10:05',
      donorOrMember: isChurchDomain ? 'Dr. Emmanuel Otim' : isAlumniDomain ? 'Global Tech Alumni Chapter' : 'Partner Corporation B',
      category: isChurchDomain ? 'Pledge' : isAlumniDomain ? 'Endowment Donation' : 'Tuition & Fees',
      method: 'MTN Mobile Money',
      amount: 4200,
      currency: 'USD',
      status: 'COMPLETED',
      receiptNo: 'REC-2026-88911',
      taxDeductible: true
    },
    {
      id: 'TX-89423-SWI',
      timestamp: '2026-07-25 13:45:10',
      donorOrMember: isChurchDomain ? 'St. Jude Youth Fellowship' : isAlumniDomain ? 'Anonymous Benefactor (Class of 1985)' : 'Sovereign Treasury Fund',
      category: isChurchDomain ? 'General Contribution' : isAlumniDomain ? 'Endowment Donation' : 'General Contribution',
      method: 'SWIFT ACH Wire',
      amount: 25000,
      currency: 'USD',
      status: 'COMPLETED',
      receiptNo: 'REC-2026-88912',
      taxDeductible: true
    }
  ]);

  // Payment Form Simulation
  const [newPayAmount, setNewPayAmount] = useState<string>('500');
  const [newPayMethod, setNewPayMethod] = useState<PaymentTransaction['method']>('M-Pesa Mobile Money');
  const [newPayCategory, setNewPayCategory] = useState<PaymentTransaction['category']>(isChurchDomain ? 'Tithe' : 'Endowment Donation');
  const [newPaySender, setNewPaySender] = useState<string>('Brother Julius Moses');

  // Demographic Registrations State
  const [members, setMembers] = useState<MemberRegistration[]>([
    {
      id: 'MEM-2026-001',
      fullName: 'Agnes Nakato Walusimbi',
      ageCohort: 'Young Adult (25-39)',
      gender: 'Female',
      maritalStatus: 'Married',
      baptismalOrAlumniStatus: isChurchDomain ? 'Baptized & Confirmed' : 'Verified Alumni',
      cellGroupOrChapter: isChurchDomain ? 'Northern Cathedral Cell #4' : 'London Alumni Chapter Hub',
      phone: '+256 772 104 889',
      email: 'agnes.walusimbi@sovereign-cloud.org',
      registeredDate: '2026-07-24',
      status: 'VERIFIED_ACTIVE'
    },
    {
      id: 'MEM-2026-002',
      fullName: 'Rev. Canon David Ochieng',
      ageCohort: 'Elder (60+)',
      gender: 'Male',
      maritalStatus: 'Married',
      baptismalOrAlumniStatus: isChurchDomain ? 'Baptized & Confirmed' : 'Verified Alumni',
      cellGroupOrChapter: isChurchDomain ? 'Diocesan Synod Council' : 'Nairobi Executive Chapter',
      phone: '+254 722 981 004',
      email: 'rev.david.ochieng@ecclesia-aegis.org',
      registeredDate: '2026-07-22',
      status: 'VERIFIED_ACTIVE'
    },
    {
      id: 'MEM-2026-003',
      fullName: 'Esther Kiconco',
      ageCohort: 'Youth (13-24)',
      gender: 'Female',
      maritalStatus: 'Single',
      baptismalOrAlumniStatus: isChurchDomain ? 'Catechumen' : 'Student Member',
      cellGroupOrChapter: isChurchDomain ? 'Youth Worship & Praise Team' : 'Kampala Campus Scholars',
      phone: '+256 781 554 210',
      email: 'esther.kiconco@jumo-highered.org',
      registeredDate: '2026-07-25',
      status: 'VERIFIED_ACTIVE'
    }
  ]);

  // New Registration Form Simulation
  const [regName, setRegName] = useState('');
  const [regAge, setRegAge] = useState<MemberRegistration['ageCohort']>('Young Adult (25-39)');
  const [regGender, setRegGender] = useState<MemberRegistration['gender']>('Female');
  const [regMarital, setRegMarital] = useState<MemberRegistration['maritalStatus']>('Single');
  const [regCell, setRegCell] = useState(isChurchDomain ? 'Central Cathedral Grace Cell #1' : 'Global Tech Alumni Chapter');

  // Museum & Artifact Archive State
  const [artifacts, setArtifacts] = useState<MuseumArtifact[]>([
    {
      id: 'ART-1892-PAR01',
      title: isChurchDomain ? 'Original Parish Baptismal Register (1892–1910)' : isAlumniDomain ? 'University Founding Royal Charter & First Graduation Roll (1922)' : 'Sovereign Institutional Charter & Seal (1935)',
      yearOrCentury: '19th/20th Century Transition',
      category: isChurchDomain ? 'Parish Register' : isAlumniDomain ? 'University Charter' : 'Land Title & Deed',
      description: 'Hand-inscribed parchment ledger recording early baptisms, confirmations, and founding institutional bylaws.',
      verificationHash: 'SHA256:8f41e9a2b7c0d38194e6f21a009c814b7e21fa90356149814421b8c001e9a2b1',
      verifiedByAi: true
    },
    {
      id: 'ART-1955-SYN04',
      title: isChurchDomain ? 'Diocesan Synod Decree on Ecclesiastical Land Rights' : 'Endowment Scholarship Trust Deed & Land Grant',
      yearOrCentury: 'Mid-20th Century (1955)',
      category: isChurchDomain ? 'Royal Synod Decree' : 'Land Title & Deed',
      description: 'Legal instrument establishing perpetual sovereign ownership of cathedral grounds and educational estates.',
      verificationHash: 'SHA256:4a11c890e1f3a77281044bb211c8801f99e410b001a44e883391b10319e0411a',
      verifiedByAi: true
    },
    {
      id: 'ART-1988-SER09',
      title: isChurchDomain ? 'Archbishop Jubilee Celebration Audio Sermon Archive' : 'Alumni Centennial Jubilee Keynote Address & Transcript',
      yearOrCentury: 'Late 20th Century (1988)',
      category: isChurchDomain ? 'Audio/Visual Sermon' : 'University Charter',
      description: 'Digitized magnetic reel recording of the landmark 50-year jubilee celebration and prophetic charge.',
      verificationHash: 'SHA256:9c00b144e82a991f8832a0014b77c10294e88a10b4119e0021c9a88241b10a22',
      verifiedByAi: true
    }
  ]);

  // JUMO Enterprise AI Copilot Query State
  const [aiQuery, setAiQuery] = useState('');
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [isThinking, setIsThinking] = useState(false);

  // Document Verification Simulation State
  const [docFile, setDocFile] = useState<string>('Baptismal_Certificate_Scan_1984.pdf');
  const [docVerifying, setDocVerifying] = useState(false);
  const [docResult, setDocResult] = useState<{ status: 'VERIFIED_AUTHENTIC' | 'FLAGGED'; hash: string; details: string } | null>({
    status: 'VERIFIED_AUTHENTIC',
    hash: 'SHA256:e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    details: 'Cryptographic watermark matched against Diocesan Master Archive. Signatures of Bishop & Registrar authenticated via JUMO AI Vision Engine model.'
  });

  // Handle Payment Submission
  const handleProcessPayment = (e: React.FormEvent) => {
    e.preventDefault();
    const amountVal = parseFloat(newPayAmount) || 0;
    if (amountVal <= 0) return;

    const newTx: PaymentTransaction = {
      id: `TX-${Math.floor(10000 + Math.random() * 90000)}-${newPayMethod.substring(0, 3).toUpperCase()}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      donorOrMember: newPaySender || 'Anonymous Contributor',
      category: newPayCategory,
      method: newPayMethod,
      amount: amountVal,
      currency: 'USD',
      status: 'COMPLETED',
      receiptNo: `REC-2026-${Math.floor(10000 + Math.random() * 90000)}`,
      taxDeductible: true
    };

    setTransactions([newTx, ...transactions]);

    if (isChurchDomain) {
      const debitAcct = newPayMethod.includes('M-Pesa') || newPayMethod.includes('MTN') 
        ? '1010 - Safaricom M-Pesa Treasury Cash' 
        : newPayMethod.includes('SWIFT') 
          ? '1030 - Central Bank Wire Clearing' 
          : '1020 - MTN MoMo Settlement Account';
      const creditAcct = newPayCategory === 'Tithe' 
        ? '4110 - Canonical Tithes & Offerings Revenue' 
        : newPayCategory === 'Pledge' 
          ? '4120 - Capital Campaign Pledges Revenue' 
          : '4130 - General Offertory Contributions';
      
      const newJnl = {
        id: `JNL-${Math.floor(10000 + Math.random() * 90000)}`,
        timestamp: newTx.timestamp,
        debitAccount: debitAcct,
        creditAccount: creditAcct,
        amount: amountVal,
        description: `Reconciled ${newPayCategory} - ${newPaySender}`
      };
      setDoubleEntryPostings([newJnl, ...doubleEntryPostings]);
    }

    setNewPayAmount('500');
  };

  // Handle New Member Registration
  const handleRegisterMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regName.trim()) return;

    const newMem: MemberRegistration = {
      id: `MEM-2026-${Math.floor(100 + Math.random() * 900)}`,
      fullName: regName,
      ageCohort: regAge,
      gender: regGender,
      maritalStatus: regMarital,
      baptismalOrAlumniStatus: isChurchDomain ? 'Baptized & Confirmed' : 'Verified Alumni',
      cellGroupOrChapter: regCell,
      phone: '+256 700 ' + Math.floor(100000 + Math.random() * 900000),
      email: `${regName.toLowerCase().replace(/\s+/g, '.')}@sovereign-member.org`,
      registeredDate: new Date().toISOString().substring(0, 10),
      status: 'VERIFIED_ACTIVE'
    };

    setMembers([newMem, ...members]);
    setRegName('');
  };

  // Simulate JUMO Enterprise AI Copilot Query
  const handleRunAiQuery = (prompt?: string) => {
    const q = prompt || aiQuery;
    if (!q.trim()) return;

    setIsThinking(true);
    setTimeout(() => {
      setIsThinking(false);
      if (isChurchDomain) {
        setAiResponse(`⛪ [Sovereign Ecclesiastical AI Assistant — JUMO AI Enterprise Engine]: Analyzing query "${q}". Based on current congregation telemetry, total tithe and pledge compliance is at 94.2% across 14 cell groups. For sacramental scheduling, 12 baptismal candidates in the Youth cohort have completed catechism verification. All treasury disbursements have passed AEGIS 10-W Sovereign Accountability guardrails without anomaly.`);
      } else if (isAlumniDomain) {
        setAiResponse(`🎓 [Alumni Endowment & Mentorship JUMO Enterprise AI Copilot — JUMO AI Enterprise Engine]: Analyzing query "${q}". Endowment contributions increased by 28% following the London & Nairobi regional reunions. We have automatically matched 45 graduating engineering students with senior alumni mentors in the telecommunications and clean energy sectors. No credential discrepancies detected.`);
      } else {
        setAiResponse(`⚡ [Sovereign Enterprise JUMO Enterprise AI Copilot — JUMO AI Enterprise Engine]: Analyzing query "${q}". Operational throughput across all active domain modules is operating at 99.98% efficiency. All financial ledgers and data pipelines are fully compliant with sovereign zero-trust governance.`);
      }
    }, 800);
  };

  // Simulate Document Scanning
  const handleScanDocument = () => {
    setDocVerifying(true);
    setDocResult(null);
    setTimeout(() => {
      setDocVerifying(false);
      setDocResult({
        status: 'VERIFIED_AUTHENTIC',
        hash: 'SHA256:' + Array.from({length: 64}, () => Math.floor(Math.random() * 16).toString(16)).join(''),
        details: 'Cryptographic SHA-256 seal generated. Watermark, seal embossed stamp, and authorized registrar signature verified with 99.99% confidence against historical institutional archives.'
      });
    }, 1200);
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 text-slate-900">
      {/* 0. ENTERPRISE NAVIGATION STACK & WORKSPACE NAVIGATION TOOLBAR (Directive v16.1 Sections 4 & 5) */}
      <div className="bg-slate-900 text-white px-6 py-2.5 flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 text-xs font-medium shadow-sm">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => onNavigate ? onNavigate('/platform/erp') : window.history.back()}
            className="px-2.5 py-1 rounded bg-white/10 hover:bg-white/20 text-white flex items-center gap-1.5 transition-all"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-[#0078D4]" />
            Back to ERP Platform Center
          </button>
          <div className="h-4 w-px bg-slate-700 mx-1 hidden sm:block" />
          <span className="text-slate-400 hidden sm:flex items-center gap-1.5">
            <Home className="w-3.5 h-3.5 text-slate-500" />
            JUMO Ecosystem <ChevronRight className="w-3 h-3 text-slate-600" /> ERP Store <ChevronRight className="w-3 h-3 text-slate-600" /> <span className="text-white font-semibold">{domain.displayName || domain.name} Workspace</span>
            {activeTemplateId && activeTemplateId !== 'Standard Universal Template' && (
              <span className="ml-2 px-2 py-0.5 rounded bg-[#0078D4]/20 border border-[#0078D4]/50 text-blue-300 text-[10px] font-mono font-bold uppercase">
                Template: {activeTemplateId}
              </span>
            )}
          </span>
        </div>

        <div className="flex items-center gap-1.5 flex-wrap">
          <button onClick={() => window.history.back()} title="Back" className="p-1.5 rounded hover:bg-white/10 text-slate-300 hover:text-white transition-all">
            <ArrowLeft className="w-3.5 h-3.5" />
          </button>
          <button onClick={() => window.history.forward()} title="Forward" className="p-1.5 rounded hover:bg-white/10 text-slate-300 hover:text-white transition-all">
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <button onClick={() => onNavigate ? onNavigate('/') : (window.location.href = '/')} title="Home" className="px-2 py-1 rounded hover:bg-white/10 text-slate-300 hover:text-white flex items-center gap-1 transition-all">
            <Home className="w-3.5 h-3.5 text-blue-400" />
            <span className="hidden md:inline">Home</span>
          </button>
          <button onClick={() => alert('Refreshing sovereign workspace... All tenant state verified and synchronized with Ring-0 ledger.')} title="Refresh Workspace" className="px-2 py-1 rounded hover:bg-white/10 text-slate-300 hover:text-white flex items-center gap-1 transition-all">
            <RefreshCw className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden md:inline">Refresh</span>
          </button>
          <button onClick={() => alert('Search initiated across all 16 platform modules and tenant records.')} title="Search" className="px-2 py-1 rounded hover:bg-white/10 text-slate-300 hover:text-white flex items-center gap-1 transition-all">
            <Search className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden md:inline">Search</span>
          </button>
          <button onClick={() => setActiveTab('settings')} title="Workspace Settings" className="px-2 py-1 rounded hover:bg-white/10 text-slate-300 hover:text-white flex items-center gap-1 transition-all">
            <Settings className="w-3.5 h-3.5 text-slate-400" />
            <span className="hidden md:inline">Settings</span>
          </button>
          <button onClick={() => setActiveTab('notifications')} title="Notifications" className="px-2 py-1 rounded hover:bg-white/10 text-slate-300 hover:text-white flex items-center gap-1 transition-all">
            <Bell className="w-3.5 h-3.5 text-purple-400" />
            <span className="hidden md:inline">Notifications</span>
          </button>
          <button onClick={() => setActiveTab('documentation')} title="Help" className="px-2 py-1 rounded hover:bg-white/10 text-slate-300 hover:text-white flex items-center gap-1 transition-all">
            <HelpCircle className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden md:inline">Help</span>
          </button>
          <button onClick={() => setActiveTab('universal-runtime')} className="px-2.5 py-1 rounded bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold flex items-center gap-1.5 shadow-sm transition-all ml-1">
            <Activity className="w-3.5 h-3.5" />
            190+ Modules
          </button>
          <button onClick={() => setActiveTab('ai_command')} className="px-2.5 py-1 rounded bg-[#0078D4] hover:bg-[#0078D4]/90 text-white font-bold flex items-center gap-1.5 shadow-sm transition-all ml-1">
            <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
            JUMO AI Assistant
          </button>
        </div>
      </div>

      {/* 1. TOP COMMAND BAR & DOMAIN HEADER */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-900 via-indigo-800 to-slate-900 text-white flex items-center justify-center shadow-md">
            {isChurchDomain ? <Church className="w-6 h-6 text-purple-300" /> : isAlumniDomain ? <GraduationCap className="w-6 h-6 text-[#0078D4]" /> : <Building2 className="w-6 h-6 text-blue-400" />}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold tracking-tight text-slate-900">{domain.displayName || domain.name}</h1>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                UEOS Phase 26 Active
              </span>
            </div>
            <p className="text-xs text-slate-500 font-mono mt-0.5">
              Sovereign Domain Runtime ID: {domain.id.toUpperCase()} • Layer-13 Isolated Runtime • AEGIS 10-W Audited
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={() => handleRunAiQuery("Generate comprehensive executive status report")}
            className="px-3.5 py-2 rounded-lg bg-blue-900 hover:bg-blue-100 text-white text-xs font-medium inline-flex items-center gap-2 shadow-sm transition-all"
          >
            <Sparkles className="w-4 h-4 text-[#0078D4]" />
            Trigger JUMO Enterprise AI Copilot Report
          </button>
          <button className="px-3.5 py-2 rounded-lg border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-medium inline-flex items-center gap-1.5 transition-all">
            <Settings className="w-3.5 h-3.5 text-slate-500" />
            Config Bench
          </button>
        </div>
      </header>

      {/* 2. DYNAMIC CONFIGURABLE NAVIGATION BAR (Directive v16.0 & v16.1 Section 7: 16 Hybrid Component Architecture Required Tabs) */}
      <nav className="bg-white text-slate-700 px-6 overflow-x-auto border-b border-slate-200 flex items-center gap-1 shadow-inner">
        {(() => {
          let domainTabs: any[] = [];
          
          if (isChurchDomain) {
            domainTabs = [
              { id: 'overview', label: 'Executive Dashboard', icon: Bot },
              { id: 'dos_master', label: 'Church DOS Master Hub (31 Phases)', icon: Cpu, badge: 'Final DOS' },
              { id: 'membership', label: 'Membership & Families', icon: Users, badge: 'Census' },
              { id: 'clergy', label: 'Clergy & Ministers', icon: Award, badge: 'Credentials' },
              { id: 'departments', label: 'Ministry Departments', icon: Layers },
              { id: 'governance', label: 'Synod Governance', icon: ShieldCheck },
              { id: 'finance', label: 'FAAP Finance & Tithes', icon: DollarSign, badge: 'M-Pesa' },
              { id: 'assets', label: 'Sacred Assets & Fleet', icon: Building2 },
              { id: 'documents', label: 'Document Intelligence', icon: FileCheck },
              { id: 'education', label: 'Theology Education', icon: BookOpen },
              { id: 'missions', label: 'Missions & Outposts', icon: Globe },
              { id: 'events', label: 'Events & Volunteers', icon: Calendar },
              { id: 'reports', label: 'Statistics & Reports', icon: BarChart3 },
              { id: 'diocese_ops', label: 'Diocese Operations', icon: Building2, badge: 'Hub' },
              { id: 'archbishop_command', label: 'Archbishop Command', icon: Compass, badge: 'Province' },
              { id: 'ai_command', label: 'AI Command Center', icon: Sparkles },
              { id: 'settings', label: 'Tenant Settings', icon: Settings }
            ];
          } else if (isEduAlumniDomain) {
            domainTabs = [
              { id: 'overview', label: 'Executive Dashboard', icon: Bot },
              { id: 'dos_master', label: 'Edu-Alumni DOS Master Hub', icon: Cpu, badge: 'Universal' },
              { id: 'admissions', label: 'Admissions & Enrollment', icon: UserPlus },
              { id: 'academic', label: 'Academic Management', icon: GraduationCap },
              { id: 'finance', label: 'FAAP Finance & Fees', icon: DollarSign },
              { id: 'lms', label: 'Learning Management', icon: BookOpen },
              { id: 'alumni_registry', label: 'Alumni Directory & Census', icon: UserPlus, badge: `${members.length} Active` },
              { id: 'staff', label: 'Staff Management', icon: Users },
              { id: 'settings', label: 'Tenant Settings', icon: Settings }
            ];
          } else if (isFinPayDomain) {
            domainTabs = [
              { id: 'overview', label: 'Financial & Pay Overview', icon: Bot },
              { id: 'dos_master', label: 'FinPay DOS Master Hub', icon: Cpu, badge: 'FAAP 5.0' },
              { id: 'finance', label: 'General Ledger (FAAP)', icon: Landmark },
              { id: 'payments', label: 'Digital Pay Switch', icon: CreditCard, badge: 'M-Pesa' },
              { id: 'treasury', label: 'Treasury & Liquidity', icon: Coins },
              { id: 'budgeting', label: 'Vote Book & Budgeting', icon: Calculator },
              { id: 'compliance', label: 'Regulatory Compliance', icon: Scale },
              { id: 'ai_command', label: 'Financial AI Swarm', icon: Sparkles },
              { id: 'settings', label: 'Platform Settings', icon: Settings }
            ];
          } else if (isControlCenter) {
            domainTabs = [
              { id: 'overview', label: 'Sovereign Command Center', icon: Bot },
              { id: 'dos_master', label: 'Kernel Master Hub', icon: Cpu },
              { id: 'security', label: 'AEGIS Security Suite', icon: ShieldCheck },
              { id: 'nodes', label: 'Platform Nodes', icon: Server },
              { id: 'identity', label: 'Identity & Trust', icon: Users },
              { id: 'telemetry', label: 'System Telemetry', icon: Activity },
              { id: 'ai_orchestration', label: 'AI Model Orchestration', icon: Sparkles },
              { id: 'settings', label: 'Global Settings', icon: Settings }
            ];
          } else {
            domainTabs = [
              { id: 'overview', label: 'Executive Overview', icon: Bot },
              { id: 'dos_master', label: 'Sovereign DOS Master Hub', icon: Cpu },
              { id: 'settings', label: 'Settings', icon: Settings }
            ];
          }

          const standardPlatformTabs = [
            { id: 'universal-runtime', label: '⚡ Universal Runtime (190+ Modules)', icon: Activity, badge: 'v27.0' },
            { id: 'templates', label: 'Template Manager', icon: BookOpen },
            { id: 'workflow', label: 'Workflow Engine', icon: Workflow },
            { id: 'reports', label: 'Reports & Analytics', icon: BarChart3 },
            { id: 'analytics', label: 'Analytics & Health', icon: Activity },
            { id: 'licensing', label: 'Licensing & Quotas', icon: Key },
            { id: 'updates', label: 'Updates & Migration', icon: RefreshCw },
            { id: 'integrations', label: 'Integrations & Connectors', icon: Globe },
            { id: 'api_management', label: 'API Management & Webhooks', icon: Terminal },
            { id: 'notifications', label: 'Notification Center', icon: Bell },
            { id: 'documentation', label: 'Sovereign Documentation', icon: HelpCircle },
            { id: 'aegis_audit', label: 'Audit Logs & Security', icon: ShieldCheck },
            { id: 'ai_command', label: 'AI Command Center', icon: Sparkles },
            { id: 'settings', label: 'Tenant Settings', icon: Settings }
          ];

          const existingIds = new Set(domainTabs.map(t => t.id));
          const missingTabs = standardPlatformTabs.filter(t => !existingIds.has(t.id));
          return [...domainTabs, ...missingTabs];
        })().map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-3.5 text-xs font-medium flex items-center gap-2 border-b-2 transition-all whitespace-nowrap ${
                isActive 
                  ? 'border-cyan-400 text-white bg-white/80' 
                  : 'border-transparent hover:text-white hover:bg-white/40'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-[#0078D4]' : 'text-slate-600'}`} />
              {tab.label}
              {(tab as any).badge && (
                <span className={`px-1.5 py-0.2 rounded text-[10px] font-semibold ${isActive ? 'bg-cyan-400 text-slate-950' : 'bg-white text-slate-600'}`}>
                  {(tab as any).badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* 3. WORKSPACE CONTENT AREA */}
      <main className="flex-1 overflow-y-auto p-6 space-y-6">
        
        {/* ========================================================= */}
        {/* UNIVERSAL RUNTIME v27.0 (190+ MODULES) */}
        {activeTab === 'universal-runtime' && (
          <div className="h-full -m-6 md:-m-8 animate-in fade-in duration-300">
            <UniversalModuleWorkspaceRuntime
              erpId={domain.id}
              erpName={domain.name}
              currentUser={{
                name: 'Domain Executive Administrator',
                role: 'erp_admin',
                email: 'admin@domain.ueos'
              }}
              onNavigate={(route) => {
                if (route === '/workspace/home') setActiveTab('overview');
              }}
            />
          </div>
        )}

        {/* TAB 1: EXECUTIVE OVERVIEW & AI COPILOT                    */}
        {/* ========================================================= */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Hierarchical Ecclesiastical Switcher */}
            {isChurchDomain && (
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                      <Layers className="w-4 h-4 text-purple-600" />
                      Universal Ecclesiastical Hierarchy Level & Multi-Tenant Instance Context
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Select active node context. Every tier inherits core capabilities and is monitored independently through the UEOS Control Center.
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono font-bold bg-purple-50 text-purple-700 px-2 py-0.5 rounded border border-purple-200">
                      Active: {activeChurchTierObj.label}
                    </span>
                  </div>
                </div>

                {/* Switcher buttons */}
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
                  {churchTiers.map(tier => {
                    const isSelected = selectedChurchTier === tier.id;
                    return (
                      <button
                        key={tier.id}
                        onClick={() => setSelectedChurchTier(tier.id)}
                        className={`p-2.5 rounded-lg border text-left transition-all flex flex-col justify-between ${
                          isSelected
                            ? 'border-purple-500 bg-purple-50/50 shadow-sm ring-1 ring-purple-500'
                            : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                        }`}
                      >
                        <span className="text-[10px] text-slate-500 font-medium">{tier.label}</span>
                        <span className="text-xs font-bold text-slate-900 truncate mt-1">
                          {tier.id === 'global' ? 'Global' : tier.id === 'national' ? 'National' : tier.id === 'province' ? 'Province' : tier.id === 'diocese' ? 'Namirembe' : tier.id === 'parish' ? 'Cathedral' : tier.id === 'local_church' ? 'St. Jude' : 'Home Cell'}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Selected Node Details Card */}
                <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  <div>
                    <span className="text-slate-500 block">Current Tenant Name:</span>
                    <strong className="text-slate-800 font-bold block mt-0.5">{activeChurchTierObj.name}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Ecclesiastical Head & Presiding Bishop:</span>
                    <strong className="text-slate-800 font-bold block mt-0.5">{activeChurchTierObj.head}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Parent Governance Council:</span>
                    <strong className="text-slate-800 font-bold block mt-0.5">
                      {selectedChurchTier === 'global' ? 'None (Apex Root)' : selectedChurchTier === 'national' ? 'Global Synod' : selectedChurchTier === 'province' ? 'National Assembly' : selectedChurchTier === 'diocese' ? 'Province Synod' : selectedChurchTier === 'parish' ? 'Diocese Board' : selectedChurchTier === 'local_church' ? 'Parish Council' : 'Local Congregation Vicar'}
                    </strong>
                  </div>
                </div>
              </div>
            )}

            {/* KPI Summary Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Total Active Membership</p>
                  <p className="text-2xl font-bold text-slate-900 mt-1">
                    {isChurchDomain ? `${activeChurchTierObj.activeMembers.toLocaleString()} Souls` : isAlumniDomain ? '38,450 Alumni' : '24,100 Entities'}
                  </p>
                  <p className="text-xs text-emerald-600 font-medium mt-1 flex items-center gap-1">
                    <span>↑ +8.4% this quarter</span>
                  </p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Users className="w-6 h-6" />
                </div>
              </div>

              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                    {isChurchDomain ? 'Monthly Tithes & Pledges' : isAlumniDomain ? 'Endowment Fund Volume' : 'Treasury Revenue Pool'}
                  </p>
                  <p className="text-2xl font-bold text-slate-900 mt-1">
                    {isChurchDomain 
                      ? `$${(activeChurchTierObj.annualBudget / 12).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`
                      : '$482,900.00'}
                  </p>
                  <p className="text-xs text-emerald-600 font-medium mt-1">100% Reconciled via M-Pesa/SWIFT</p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <DollarSign className="w-6 h-6" />
                </div>
              </div>

              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Verified Documents</p>
                  <p className="text-2xl font-bold text-slate-900 mt-1">
                    {isChurchDomain 
                      ? `${(activeChurchTierObj.instances * 42).toLocaleString()} Records`
                      : '3,492 Records'}
                  </p>
                  <p className="text-xs text-blue-600 font-medium mt-1">SHA-256 Cryptographic Seals</p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
                  <FileCheck className="w-6 h-6" />
                </div>
              </div>

              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">AEGIS Governance Status</p>
                  <p className="text-2xl font-bold text-emerald-600 mt-1">100% Compliant</p>
                  <p className="text-xs text-slate-500 font-medium mt-1">Zero Trust • No Anomalies</p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6" />
                </div>
              </div>
            </div>

            {/* Interactive JUMO Enterprise AI Copilot Command Bench */}
            <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-xl p-6 text-white shadow-lg border border-slate-200">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-cyan-400 text-slate-950 flex items-center justify-center font-bold">
                    <Bot className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold">Sovereign Domain AI Intelligence Bench (JUMO AI Enterprise Engine)</h2>
                    <p className="text-xs text-slate-700">
                      Automated reasoning engine embedded with domain-specific RAG knowledge base & policy guardrails.
                    </p>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-mono bg-blue-500/20 text-blue-700 border border-blue-400/30 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Zero-Hallucination Guardrail Active
                </span>
              </div>

              {/* Quick AI Trigger Chips */}
              <div className="flex flex-wrap gap-2 mb-4">
                {[
                  isChurchDomain ? "Summarize weekly tithe collections by cell group" : isAlumniDomain ? "Identify top 20 potential endowment donors" : "Generate Q3 financial anomaly audit",
                  isChurchDomain ? "Verify baptismal record authenticity for youth cohort" : isAlumniDomain ? "Match graduating cohort with telecommunication mentors" : "Verify regulatory compliance for new vendor work orders",
                  isChurchDomain ? "Draft sacramental liturgy schedule for next Sunday" : isAlumniDomain ? "Draft invitation letter for Centennial Jubilee reunion" : "Optimize cloud container resource allocations"
                ].map((promptText, i) => (
                  <button
                    key={i}
                    onClick={() => handleRunAiQuery(promptText)}
                    className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs text-slate-200 border border-white/15 transition-all flex items-center gap-1.5 text-left"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#0078D4] shrink-0" />
                    <span>{promptText}</span>
                  </button>
                ))}
              </div>

              {/* AI Query Input */}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={aiQuery}
                  onChange={(e) => setAiQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleRunAiQuery()}
                  placeholder={`Ask anything about ${domain.displayName || domain.name} operations, finances, demographics, or documents...`}
                  className="flex-1 bg-white/80 border border-slate-200 rounded-lg px-4 py-2.5 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400"
                />
                <button
                  onClick={() => handleRunAiQuery()}
                  disabled={isThinking || !aiQuery.trim()}
                  className="px-6 py-2.5 bg-cyan-400 hover:bg-cyan-300 disabled:opacity-50 text-slate-950 font-bold rounded-lg text-sm flex items-center gap-2 transition-all shadow-md"
                >
                  {isThinking ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                  Analyze
                </button>
              </div>

              {/* AI Output Response Box */}
              {(aiResponse || isThinking) && (
                <div className="mt-4 p-4 rounded-lg bg-white/80 border border-slate-200 text-sm font-sans leading-relaxed text-slate-200">
                  {isThinking ? (
                    <div className="flex items-center gap-3 text-[#0078D4]">
                      <RefreshCw className="w-5 h-5 animate-spin" />
                      <span>JUMO AI Enterprise Engine is synthesizing cross-layer domain data and auditing financial ledgers...</span>
                    </div>
                  ) : (
                    <div>{aiResponse}</div>
                  )}
                </div>
              )}
            </div>

            {/* Active ERP Modules Grid */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Layers className="w-5 h-5 text-blue-600" />
                  Active Domain Modules & Sub-Engines
                </h3>
                <span className="text-xs font-mono text-slate-500">{(domain.erpModules ?? []).length} Modules Loaded</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {(domain.erpModules ?? []).map((mod, idx) => (
                  <div key={mod.id || idx} className="p-4 rounded-lg border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all bg-slate-50/50 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-semibold px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                          Module #{idx + 1}
                        </span>
                        <span className="w-2 h-2 rounded-full bg-emerald-500" title="Active & Reconciled" />
                      </div>
                      <h4 className="font-bold text-slate-900 text-sm">{mod.name}</h4>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">{mod.description}</p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between">
                      <span className="text-[11px] font-mono text-slate-600">Status: {mod.status}</span>
                      <button 
                        onClick={() => setActiveTab('role_portals')}
                        className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1"
                      >
                        Launch Portal <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* CHURCH DIGITAL ENTERPRISE OPERATING MODULES               */}
        {/* ========================================================= */}
        {isChurchDomain && activeTab === 'membership' && (
          <ChurchMembership />
        )}

        {isChurchDomain && activeTab === 'clergy' && (
          <ChurchClergy />
        )}

        {isChurchDomain && activeTab === 'departments' && (
          <ChurchDepartments />
        )}

        {isChurchDomain && activeTab === 'governance' && (
          <ChurchGovernance />
        )}

        {isChurchDomain && activeTab === 'finance' && (
          <ChurchFinance />
        )}

        {isChurchDomain && activeTab === 'assets' && (
          <ChurchAssets />
        )}

        {isChurchDomain && activeTab === 'documents' && (
          <ChurchDocuments />
        )}

        {isChurchDomain && activeTab === 'education' && (
          <ChurchEducation />
        )}

        {isChurchDomain && activeTab === 'missions' && (
          <ChurchMissions />
        )}

        {isChurchDomain && activeTab === 'events' && (
          <ChurchEvents />
        )}

        {activeTab === 'reports' && (
          isChurchDomain ? <ChurchReports /> : (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="bg-[#0078D4] text-white p-6 rounded-2xl shadow-md flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h3 className="text-xl font-bold">Institutional Analytics & Financial Reports</h3>
                  <p className="text-xs text-blue-100 mt-1">Real-time ledger audit trails and operational statistics for {domain.name}.</p>
                </div>
                <button onClick={() => alert("Generating PDF audit summary...")} className="px-4 py-2 bg-white text-[#0078D4] rounded-xl font-bold text-xs shadow-xs hover:bg-blue-50 transition cursor-pointer">Download Comprehensive PDF</button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1"><span className="text-xs font-bold text-slate-400 uppercase">Total Revenue Cleared</span><div className="text-2xl font-extrabold text-slate-900">$4,820,500.00</div><span className="text-xs text-emerald-600 font-medium">↑ 14.8% vs last quarter</span></div>
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1"><span className="text-xs font-bold text-slate-400 uppercase">FAAP Clearing Fee (1.5%)</span><div className="text-2xl font-extrabold text-[#0078D4]">$72,307.50</div><span className="text-xs text-slate-500">Auto-routed to master treasury</span></div>
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1"><span className="text-xs font-bold text-slate-400 uppercase">Active Entitlements</span><div className="text-2xl font-extrabold text-purple-600">100% Valid</div><span className="text-xs text-slate-500">Ring-0 verification passed</span></div>
              </div>
            </div>
          )
        )}

        {isChurchDomain && activeTab === 'diocese_ops' && (
          <DioceseOperationsCenter />
        )}

        {isChurchDomain && activeTab === 'archbishop_command' && (
          <ArchbishopCommandDashboard />
        )}

        {isSchoolDomain && activeTab === 'dos_master' && (
          <SchoolEnterpriseDOSMaster />
        )}

        {isChurchDomain && activeTab === 'dos_master' && (
          <ChurchEnterpriseDOSMaster />
        )}

        {isAlumniDomain && activeTab === 'dos_master' && (
          <AlumniEnterpriseDOSMaster />
        )}

        {!isChurchDomain && !isSchoolDomain && !isAlumniDomain && activeTab === 'dos_master' && (
          <div className="p-8 bg-white rounded-xl border border-slate-200 shadow-sm text-center space-y-4">
            <Cpu className="w-12 h-12 text-[#0078D4] mx-auto" />
            <h3 className="text-xl font-bold text-slate-900">{domain.name} — Sovereign Domain Operating System</h3>
            <p className="text-sm text-slate-600 max-w-lg mx-auto">
              This domain is powered by the JUMO UEOS Micro-Kernel. All transactions are securely audited by AEGIS Zero-Trust and settled through the FAAP Cryptographic Ledger.
            </p>
          </div>
        )}

        {activeTab === 'ai_command' && (
          isChurchDomain ? <ChurchAIEngines /> : (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 p-6 rounded-2xl text-white shadow-md flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h3 className="text-xl font-bold flex items-center gap-2">
                    <Sparkles className="w-6 h-6 text-purple-400" /> JUMO AI - Sovereign Domain Copilot
                  </h3>
                  <p className="text-xs text-purple-200 mt-1">Tenant-scoped RAG retrieval, automated ledger audits, and natural language query routing for {domain.name}.</p>
                </div>
                <span className="text-xs font-mono bg-purple-500/20 border border-purple-500/30 text-purple-300 px-3 py-1.5 rounded-lg font-bold uppercase">Gemini 2.5 Pro Active</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center font-bold"><Bot className="w-5 h-5" /></div>
                  <h4 className="font-bold text-slate-900">Sovereign Knowledge Base</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">Indexed 1,420 institutional documents, policy bylaws, and statutory compliance guidelines specific to {domain.name}.</p>
                  <button onClick={() => alert("Re-indexing knowledge embeddings...")} className="text-xs font-semibold text-purple-700 hover:underline">Re-index Embeddings →</button>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold"><ShieldCheck className="w-5 h-5" /></div>
                  <h4 className="font-bold text-slate-900">Automated Ledger Auditing</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">Continuous background verification of double-entry ledger postings ensuring $0.00 offset balance parity across all accounts.</p>
                  <button onClick={() => alert("Ledger parity verified: 100% compliant.")} className="text-xs font-semibold text-emerald-700 hover:underline">Run Instant Parity Audit →</button>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0078D4] flex items-center justify-center font-bold"><Cpu className="w-5 h-5" /></div>
                  <h4 className="font-bold text-slate-900">UAMP Schema Generation</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">Generate new custom domain modules, REST APIs, and UI tables from natural language prompts without downtime.</p>
                  <button onClick={() => alert("UAMP Generator ready.")} className="text-xs font-semibold text-[#0078D4] hover:underline">Launch Scaffolder →</button>
                </div>
              </div>
            </div>
          )
        )}

        {activeTab === 'settings' && (
          isChurchDomain ? <ChurchSettings /> : (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-md flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h3 className="text-xl font-bold flex items-center gap-2">
                    <Settings className="w-6 h-6 text-blue-400" /> Tenant Configuration & Governance
                  </h3>
                  <p className="text-xs text-slate-300 mt-1">Manage institutional parameters, Aegis Zero-Trust RBAC scopes, and API keys for {domain.name}.</p>
                </div>
                <span className="text-xs font-mono bg-slate-800 border border-slate-700 text-emerald-400 px-3 py-1.5 rounded-lg font-bold uppercase">Ring-0 Isolated</span>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
                <div className="border-b border-slate-100 pb-4">
                  <h4 className="text-base font-bold text-slate-900">Institutional Identity & Branding</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Customize your sovereign workspace branding, official motto, and seal.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
                  <div>
                    <label className="block font-semibold text-slate-700 uppercase tracking-wider mb-2">Tenant Name</label>
                    <input type="text" readOnly value={domain.name} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-medium" />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 uppercase tracking-wider mb-2">Sovereign Domain ID</label>
                    <input type="text" readOnly value={domain.id} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-mono" />
                  </div>
                </div>
                <div className="pt-4 flex justify-end">
                  <button onClick={() => alert("Tenant settings saved to Ring-0 registry.")} className="px-5 py-2.5 rounded-xl bg-[#0078D4] text-white font-semibold text-xs shadow-sm hover:bg-[#005a9e] transition">Save Institutional Settings</button>
                </div>
              </div>
            </div>
          )
        )}

        {/* ========================================================= */}
        {/* TAB 2: AUTOMATED PAYMENT & TREASURY ENGINE                */}
        {/* ========================================================= */}
        {activeTab === 'payments' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 p-6 rounded-xl text-white shadow-md flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <Banknote className="w-6 h-6 text-emerald-400" />
                  Sovereign Automated Payment & Treasury Engine
                </h2>
                <p className="text-xs text-slate-700 mt-1">
                  Direct API integrations for M-Pesa, MTN Mobile Money, Airtel Money, SWIFT ACH Wire, and Sovereign CBDC. 
                  All transactions automatically issue tax-deductible receipts and log directly to the AEGIS 10-W ledger.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-white/10 px-4 py-2 rounded-lg border border-white/15 text-center">
                  <p className="text-[10px] uppercase text-emerald-700 font-semibold">24h Volume</p>
                  <p className="text-lg font-bold font-mono">$30,700.00</p>
                </div>
                <div className="bg-white/10 px-4 py-2 rounded-lg border border-white/15 text-center">
                  <p className="text-[10px] uppercase text-emerald-700 font-semibold">Settlement Rate</p>
                  <p className="text-lg font-bold font-mono">1.2 Seconds</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Payment Processing Form */}
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm lg:col-span-1 space-y-4">
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 border-b pb-3">
                  <CreditCard className="w-5 h-5 text-emerald-600" />
                  Process New Payment / Pledge
                </h3>
                <form onSubmit={handleProcessPayment} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Contributor / Member Name</label>
                    <input
                      type="text"
                      value={newPaySender}
                      onChange={(e) => setNewPaySender(e.target.value)}
                      placeholder="e.g. Deaconess Sarah Kintu"
                      className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:border-emerald-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Payment Category</label>
                    <select
                      value={newPayCategory}
                      onChange={(e) => setNewPayCategory(e.target.value as any)}
                      className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:border-emerald-500 bg-white"
                    >
                      {isChurchDomain ? (
                        <>
                          <option value="Tithe">Tithe (10% Canonical Pledge)</option>
                          <option value="Pledge">Capital Building Fund Pledge</option>
                          <option value="General Contribution">Sunday Offertory & Missions</option>
                        </>
                      ) : isAlumniDomain ? (
                        <>
                          <option value="Endowment Donation">University Endowment Scholarship Fund</option>
                          <option value="General Contribution">Annual Chapter Membership Fee</option>
                          <option value="Tuition & Fees">Continuing Education Tuition</option>
                        </>
                      ) : (
                        <>
                          <option value="General Contribution">Enterprise Service Settlement</option>
                          <option value="Tuition & Fees">Institutional Licensing Fee</option>
                          <option value="Hospital Billing">Medical Inpatient & Pharmacy Billing</option>
                        </>
                      )}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Payment Method & Gateway</label>
                    <select
                      value={newPayMethod}
                      onChange={(e) => setNewPayMethod(e.target.value as any)}
                      className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:border-emerald-500 bg-white font-medium text-slate-800"
                    >
                      <option value="M-Pesa Mobile Money">📱 M-Pesa Mobile Money (Safaricom API)</option>
                      <option value="MTN Mobile Money">📱 MTN Mobile Money (MoMo API)</option>
                      <option value="Airtel Money">📱 Airtel Money Gateway</option>
                      <option value="SWIFT ACH Wire">🏦 SWIFT International Wire / ACH</option>
                      <option value="Visa/Mastercard">💳 Visa / Mastercard Merchant Clearing</option>
                      <option value="Sovereign CBDC">⚡ Sovereign CBDC / Blockchain Token</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Amount (USD Equivalent)</label>
                    <div className="relative">
                      <span className="absolute left-3 top-2.5 text-slate-600 font-bold">$</span>
                      <input
                        type="number"
                        value={newPayAmount}
                        onChange={(e) => setNewPayAmount(e.target.value)}
                        className="w-full pl-8 pr-3 py-2 text-sm font-mono font-bold rounded-lg border border-slate-300 focus:outline-none focus:border-emerald-500"
                        min="1"
                        step="any"
                        required
                      />
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-start gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Automated Verification:</strong> Instant receipt issuance with SHA-256 digital stamp and automatic reconciliation against the member's tax-deductibility ledger.
                    </span>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg text-sm shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <CheckCircle className="w-4 h-4" />
                    Authorize & Settle Payment
                  </button>
                </form>
              </div>

              {/* Transaction History Ledger */}
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm lg:col-span-2 space-y-4">
                <div className="flex items-center justify-between border-b pb-3">
                  <div>
                    <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                      <History className="w-5 h-5 text-blue-600" />
                      Real-Time Financial Ledger & Reconciliation
                    </h3>
                    <p className="text-xs text-slate-500">Live stream of verified payments across all cellular and banking gateways.</p>
                  </div>
                  <span className="px-2.5 py-1 rounded bg-slate-100 text-slate-700 font-mono text-xs font-semibold">
                    {transactions.length} Verified Records
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-200 bg-slate-50 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                        <th className="py-2.5 px-3">Receipt / ID</th>
                        <th className="py-2.5 px-3">Contributor</th>
                        <th className="py-2.5 px-3">Category</th>
                        <th className="py-2.5 px-3">Gateway</th>
                        <th className="py-2.5 px-3 text-right">Amount</th>
                        <th className="py-2.5 px-3 text-center">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-xs">
                      {transactions.map(tx => (
                        <tr key={tx.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="py-3 px-3 font-mono font-semibold text-blue-600">
                            {tx.receiptNo}
                            <div className="text-[10px] text-slate-600 font-normal">{tx.timestamp}</div>
                          </td>
                          <td className="py-3 px-3 font-medium text-slate-900">{tx.donorOrMember}</td>
                          <td className="py-3 px-3">
                            <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-800 font-medium">
                              {tx.category}
                            </span>
                          </td>
                          <td className="py-3 px-3">
                            <span className="inline-flex items-center gap-1 font-medium text-slate-700">
                              {tx.method.includes('M-Pesa') || tx.method.includes('MTN') ? <Smartphone className="w-3.5 h-3.5 text-emerald-600" /> : <Landmark className="w-3.5 h-3.5 text-blue-600" />}
                              {tx.method}
                            </span>
                          </td>
                          <td className="py-3 px-3 text-right font-mono font-bold text-slate-900">
                            ${tx.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                          </td>
                          <td className="py-3 px-3 text-center">
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 inline-flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3" />
                              {tx.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {isChurchDomain && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                {/* 1. FAAP DOUBLE ENTRY GENERAL LEDGER POSTING LOG */}
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
                  <div>
                    <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                      <Calculator className="w-5 h-5 text-purple-600" />
                      FAAP Double-Entry General Ledger Postings (Live Synced)
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Canonical double-entry records automatically written by the financial rule-engine upon mobile money or bank wire clearing.
                    </p>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="border-b border-slate-200 bg-slate-50 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                          <th className="py-2 px-2">Ref / Date</th>
                          <th className="py-2 px-2">Accounts (Debit / Credit)</th>
                          <th className="py-2 px-2 text-right">Debit</th>
                          <th className="py-2 px-2 text-right">Credit</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 font-mono">
                        {doubleEntryPostings.map(jnl => (
                          <tr key={jnl.id} className="hover:bg-slate-50">
                            <td className="py-2 px-2">
                              <span className="font-bold text-purple-600 block">{jnl.id}</span>
                              <span className="text-[10px] text-slate-600 block">{jnl.timestamp.split(' ')[1] || jnl.timestamp}</span>
                            </td>
                            <td className="py-2 px-2">
                              <div className="text-emerald-700 font-medium">Dr: {jnl.debitAccount}</div>
                              <div className="text-slate-600 pl-4">Cr: {jnl.creditAccount}</div>
                              <div className="text-[10px] text-slate-600 font-sans italic pl-4 mt-0.5">{jnl.description}</div>
                            </td>
                            <td className="py-2 px-2 text-right font-bold text-emerald-700 align-top">{formatMoney(jnl.amount, '$')}</td>
                            <td className="py-2 px-2 text-right font-bold text-slate-700 align-top">{formatMoney(jnl.amount, '$')}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* 2. INSTITUTIONAL PROPERTIES & SACRED ASSETS REGISTRY */}
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                        <Home className="w-5 h-5 text-purple-600" />
                        Sovereign Institutional Real Estate & Sacred Assets Registry
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Securely cataloged properties, vehicle fleets, and heritage sacred vessels with automated active custodian tracking.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {churchAssets.map(asset => (
                      <div key={asset.id} className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-[10px] font-mono text-slate-600 font-bold">{asset.id}</span>
                            <span className="px-1.5 py-0.2 rounded bg-slate-200 text-[10px] text-slate-700 font-bold uppercase">{asset.category}</span>
                          </div>
                          <strong className="text-slate-800 font-bold block mt-1">{asset.name}</strong>
                          <span className="text-[11px] text-slate-500 block mt-0.5">Location: {asset.location} • Custodian: {asset.custodian}</span>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="text-xs font-mono font-bold text-slate-950 block">${asset.value.toLocaleString()}</span>
                          <span className="text-[10px] text-emerald-700 font-semibold mt-0.5 flex items-center justify-end gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> AEGIS Inspected
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 3: DEMOGRAPHIC CENSUS & SELF-REGISTRATION             */}
        {/* ========================================================= */}
        {activeTab === 'registration' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 p-6 rounded-xl text-white shadow-md flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <UserPlus className="w-6 h-6 text-[#0078D4]" />
                  Automated Self-Registration & Demographic Census Engine
                </h2>
                <p className="text-xs text-slate-700 mt-1">
                  Self-service QR/mobile onboarding with automated age cohort segmentation, gender demographics, marital profiling, and cell group assignment.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => alert("QR Code & NFC Registration Kiosk URL copied to clipboard: https://sovereign.jumo.org/register/" + domain.id)}
                  className="px-3.5 py-2 rounded-lg bg-white text-slate-900 font-bold text-xs hover:bg-slate-100 transition-all flex items-center gap-2 shadow-sm"
                >
                  <QrCode className="w-4 h-4 text-blue-600" />
                  Launch Self-Reg Kiosk
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Registration Form */}
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm lg:col-span-1 space-y-4">
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 border-b pb-3">
                  <UserCheck className="w-5 h-5 text-blue-600" />
                  Register New Member / Profile
                </h3>
                <form onSubmit={handleRegisterMember} className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Full Legal Name</label>
                    <input
                      type="text"
                      value={regName}
                      onChange={(e) => setRegName(e.target.value)}
                      placeholder="e.g. Agnes Nakato Walusimbi"
                      className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:border-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Age Cohort</label>
                    <select
                      value={regAge}
                      onChange={(e) => setRegAge(e.target.value as any)}
                      className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:border-blue-500 bg-white"
                    >
                      <option value="Children (0-12)">👶 Children (0–12 Years)</option>
                      <option value="Youth (13-24)">🧑‍🎓 Youth (13–24 Years)</option>
                      <option value="Young Adult (25-39)">🧑‍💼 Young Adult (25–39 Years)</option>
                      <option value="Adult (40-59)">👔 Adult (40–59 Years)</option>
                      <option value="Elder (60+)">🧓 Elder (60+ Years)</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Gender / Sex</label>
                      <select
                        value={regGender}
                        onChange={(e) => setRegGender(e.target.value as any)}
                        className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:border-blue-500 bg-white"
                      >
                        <option value="Female">Female</option>
                        <option value="Male">Male</option>
                        <option value="Other / Undisclosed">Other / Undisclosed</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Marital Status</label>
                      <select
                        value={regMarital}
                        onChange={(e) => setRegMarital(e.target.value as any)}
                        className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:border-blue-500 bg-white"
                      >
                        <option value="Single">Single</option>
                        <option value="Married">Married</option>
                        <option value="Widowed">Widowed</option>
                        <option value="Divorced">Divorced</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      {isChurchDomain ? 'Cell Group / Geographical Zone' : isAlumniDomain ? 'Alumni Chapter Hub' : 'Department / Division'}
                    </label>
                    <input
                      type="text"
                      value={regCell}
                      onChange={(e) => setRegCell(e.target.value)}
                      className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:outline-none focus:border-blue-500"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg text-sm shadow-md transition-all flex items-center justify-center gap-2 mt-2"
                  >
                    <Plus className="w-4 h-4" />
                    Verify & Enroll into Census
                  </button>
                </form>
              </div>

              {/* Census Register Table */}
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm lg:col-span-2 space-y-4">
                <div className="flex items-center justify-between border-b pb-3">
                  <div>
                    <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                      <Users className="w-5 h-5 text-blue-600" />
                      Demographic Register & Census Ledger
                    </h3>
                    <p className="text-xs text-slate-500">Verified biometric and demographic profile registry.</p>
                  </div>
                  <div className="flex gap-2">
                    <span className="px-2.5 py-1 rounded bg-blue-50 text-blue-700 font-mono text-xs font-semibold">
                      Total: {members.length} Members
                    </span>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-200 bg-slate-50 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                        <th className="py-2.5 px-3">Member ID</th>
                        <th className="py-2.5 px-3">Full Name</th>
                        <th className="py-2.5 px-3">Age Cohort</th>
                        <th className="py-2.5 px-3">Sex / Marital</th>
                        <th className="py-2.5 px-3">Cell / Chapter</th>
                        <th className="py-2.5 px-3 text-center">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-xs">
                      {members.map(m => (
                        <tr key={m.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="py-3 px-3 font-mono font-bold text-blue-600">{m.id}</td>
                          <td className="py-3 px-3 font-semibold text-slate-900">
                            {m.fullName}
                            <div className="text-[10px] text-slate-600 font-normal">{m.email}</div>
                          </td>
                          <td className="py-3 px-3 font-medium text-slate-700">{m.ageCohort}</td>
                          <td className="py-3 px-3">
                            <span className="text-slate-900">{m.gender}</span> • <span className="text-slate-500">{m.maritalStatus}</span>
                          </td>
                          <td className="py-3 px-3 font-medium text-slate-800">{m.cellGroupOrChapter}</td>
                          <td className="py-3 px-3 text-center">
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 inline-flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3" />
                              {m.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 4: SEPARATED ECCLESIASTICAL / ALUMNI / ROLE PORTALS   */}
        {/* ========================================================= */}
        {activeTab === 'role_portals' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 p-6 rounded-xl text-white shadow-md">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Layers className="w-6 h-6 text-purple-300" />
                {isChurchDomain ? 'Separated Ecclesiastical & Ministry Governance Portals' : isAlumniDomain ? 'Alumni Network & Endowment Governance Portals' : 'Enterprise Multi-Role Operational Portals'}
              </h2>
              <p className="text-xs text-slate-700 mt-1">
                Strict role separation ensuring privacy, security, and specialized operational tools for each tier of governance.
              </p>

              {/* Role Portal Switcher Buttons */}
              <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-white/15">
                {isChurchDomain ? (
                  <>
                    {[
                      { id: 'clergy', label: '1. Ordained Clergy & Ministers Portal', icon: BookOpen },
                      { id: 'lay_readers', label: '2. Lay Readers & Catechists Portal', icon: Users },
                      { id: 'support_staff', label: '3. Support Staff & Administration Portal', icon: Briefcase },
                      { id: 'member_self', label: '4. Member Self-Service Portal', icon: Heart }
                    ].map(p => (
                      <button
                        key={p.id}
                        onClick={() => setActiveRolePortal(p.id)}
                        className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
                          activeRolePortal === p.id 
                            ? 'bg-cyan-400 text-slate-950 shadow-md scale-105' 
                            : 'bg-white/10 hover:bg-white/20 text-white'
                        }`}
                      >
                        <p.icon className="w-4 h-4" />
                        {p.label}
                      </button>
                    ))}
                  </>
                ) : isAlumniDomain ? (
                  <>
                    {[
                      { id: 'donors', label: '1. Donors & Endowment Portal', icon: DollarSign },
                      { id: 'chapters', label: '2. Chapter Leads & Regional Hubs Portal', icon: Globe },
                      { id: 'mentoring', label: '3. Student & Mentor Networking Portal', icon: Users }
                    ].map(p => (
                      <button
                        key={p.id}
                        onClick={() => setActiveRolePortal(p.id)}
                        className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
                          activeRolePortal === p.id 
                            ? 'bg-cyan-400 text-slate-950 shadow-md scale-105' 
                            : 'bg-white/10 hover:bg-white/20 text-white'
                        }`}
                      >
                        <p.icon className="w-4 h-4" />
                        {p.label}
                      </button>
                    ))}
                  </>
                ) : (
                  <>
                    {[
                      { id: 'executives', label: '1. Executive Leadership Portal', icon: Award },
                      { id: 'operations', label: '2. Operations & Supply Chain Portal', icon: Activity },
                      { id: 'finance_audit', label: '3. Finance & Audit Guardrail Portal', icon: ShieldCheck }
                    ].map(p => (
                      <button
                        key={p.id}
                        onClick={() => setActiveRolePortal(p.id)}
                        className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
                          activeRolePortal === p.id 
                            ? 'bg-blue-400 text-slate-950 shadow-md scale-105' 
                            : 'bg-white/10 hover:bg-white/20 text-white'
                        }`}
                      >
                        <p.icon className="w-4 h-4" />
                        {p.label}
                      </button>
                    ))}
                  </>
                )}
              </div>
            </div>

            {/* Portal Content Rendered based on activeRolePortal */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
              {/* Church - Clergy Portal */}
              {activeRolePortal === 'clergy' && (
                <div className="space-y-6">
                  <div className="border-b pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-bold text-purple-950 flex items-center gap-2">
                        <BookOpen className="w-6 h-6 text-purple-600" />
                        Ordained Clergy & Ministers Canonical Workspace
                      </h3>
                      <p className="text-xs text-slate-600 mt-1">
                        Bishop's Registry, confidential pastoral counseling, licensed clergy rosters, and Diocesan Synod Resolutions.
                      </p>
                    </div>
                    <span className="px-2 py-0.5 rounded font-mono text-[10px] bg-purple-100 text-purple-800 font-bold border border-purple-200">
                      Licensed: {clergyMembers.length} ordained ministers
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-5 rounded-xl border bg-purple-50/40 border-purple-200/60">
                      <h4 className="font-bold text-purple-950 text-sm mb-2">📜 AI Sermon Generator & Research Copilot</h4>
                      <p className="text-xs text-purple-800 leading-relaxed mb-4">
                        Access cross-referenced theological commentaries, Greek/Hebrew root translations, and historic synod papers with JUMO AI.
                      </p>
                      <button 
                        onClick={() => handleRunAiQuery("Draft theological outline for Sunday sermon on canonical stewardship")}
                        className="w-full py-2 bg-purple-700 hover:bg-purple-800 text-white font-bold rounded text-xs transition-all shadow-sm"
                      >
                        Launch Sermon Assistant
                      </button>
                    </div>

                    <div className="p-5 rounded-xl border bg-purple-50/40 border-purple-200/60">
                      <h4 className="font-bold text-purple-950 text-sm mb-2">🕊️ Sacramental Liturgy & Holy Matrimony</h4>
                      <p className="text-xs text-purple-800 leading-relaxed mb-4">
                        Schedule upcoming baptisms, parish confirmation rosters, and holy matrimony ceremonies with automated national registry sync.
                      </p>
                      <button 
                        onClick={() => alert("Sacramental roster synchronized with Diocesan Registry and AEGIS audit gateway.")}
                        className="w-full py-2 bg-purple-700 hover:bg-purple-800 text-white font-bold rounded text-xs transition-all shadow-sm"
                      >
                        Open Liturgical Calendar
                      </button>
                    </div>

                    <div className="p-5 rounded-xl border bg-white text-white border-slate-200 shadow-md">
                      <h4 className="font-bold text-[#0078D4] text-sm mb-2">🔒 Confidential Pastoral Counseling Logs</h4>
                      <p className="text-xs text-slate-700 leading-relaxed mb-4">
                        AES-256 encrypted pastoral logs. Access is protected under strict canonical privilege and zero-trust credentials.
                      </p>
                      <button 
                        onClick={() => alert("Canonical counseling vault requires secondary biometric or physical YubiKey HSM token.")}
                        className="w-full py-2 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold rounded text-xs transition-all flex items-center justify-center gap-1.5 shadow-sm"
                      >
                        <Lock className="w-3.5 h-3.5 text-slate-950" /> Unlock Confidential Vault
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* licensed clergy */}
                    <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-3">
                      <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider border-b pb-2">
                        Bishop's Registry: Licensed Clergy & Parish Vicars
                      </h4>
                      <div className="space-y-2.5">
                        {clergyMembers.map(minister => (
                          <div key={minister.id} className="p-3 bg-white rounded-lg border border-slate-200 flex items-center justify-between gap-4 text-xs">
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-slate-900">{minister.name}</span>
                                <span className="text-[10px] font-mono text-purple-700 font-bold bg-purple-50 px-1.5 rounded">{minister.role}</span>
                              </div>
                              <span className="text-slate-500 block mt-0.5">{minister.assignedParish} • Ordained: {minister.ordinationDate}</span>
                            </div>
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              minister.status === 'Active' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                            }`}>
                              {minister.status}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* diocesan resolutions */}
                    <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-3">
                      <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider border-b pb-2">
                        Synod Council Resolutions & Governance Decrees
                      </h4>
                      <div className="space-y-3">
                        {synodResolutions.map(res => (
                          <div key={res.id} className="p-3.5 bg-white rounded-lg border border-slate-200 text-xs space-y-2">
                            <div className="flex justify-between items-start gap-4">
                              <div>
                                <span className="text-[10px] font-mono text-slate-600 font-semibold">{res.id} • Proposer: {res.proposer}</span>
                                <h5 className="font-bold text-slate-900 mt-0.5">{res.title}</h5>
                              </div>
                              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                res.status === 'Signed & Gazetted' ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-800'
                              }`}>
                                {res.status}
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-600 leading-relaxed">{res.description}</p>
                            <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                              <span className="text-[10px] text-slate-500 font-semibold">Votes: {res.votesCount} Approved</span>
                              {res.status === 'Pending Dual Signature' && (
                                <button
                                  onClick={() => handleSignResolution(res.id)}
                                  className="px-2.5 py-1 rounded bg-purple-600 hover:bg-purple-700 text-white font-bold text-[10px] shadow transition-all"
                                >
                                  Bishop Dual-Sign Decrees
                                </button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Church - Lay Readers Portal */}
              {activeRolePortal === 'lay_readers' && (
                <div className="space-y-6">
                  <div className="border-b pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                        <Users className="w-6 h-6 text-purple-600" />
                        Lay Readers, Catechists & Cell Leaders Portal
                      </h3>
                      <p className="text-xs text-slate-600 mt-1">
                        Manage Sunday School, geographical cell fellowships, liturgical rosters, and community care visits.
                      </p>
                    </div>
                    <span className="px-2 py-0.5 rounded font-mono text-[10px] bg-slate-100 text-slate-700 font-bold border border-slate-200">
                      {cellGroups.length} geographical cells registered
                    </span>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="p-5 rounded-xl border border-slate-200 bg-slate-50 lg:col-span-1 space-y-3">
                      <h4 className="font-bold text-slate-950 text-sm border-b pb-1">📖 Sunday School & Liturgical Readings</h4>
                      <p className="text-xs text-slate-600">Daily canonical reading rosters and curriculum topics assigned to lay catechists.</p>
                      
                      <div className="space-y-2.5 text-xs">
                        <div className="p-2.5 bg-white rounded border border-slate-200">
                          <span className="text-[10px] text-slate-600 font-bold block uppercase">First Lesson (Old Testament)</span>
                          <strong className="text-slate-800 block mt-0.5">Deuteronomy 8:1-10</strong>
                          <span className="text-[11px] text-slate-500 block">Reader: Lay Reader Samuel Ssewankambo</span>
                        </div>
                        <div className="p-2.5 bg-white rounded border border-slate-200">
                          <span className="text-[10px] text-slate-600 font-bold block uppercase">Sunday School Syllabus</span>
                          <strong className="text-slate-800 block mt-0.5">The Parable of the Sower</strong>
                          <span className="text-[11px] text-slate-500 block">Class Lead: Sister Harriet Nabakooza</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-5 rounded-xl border border-slate-200 bg-slate-50 lg:col-span-2 space-y-3">
                      <h4 className="font-bold text-slate-950 text-sm border-b pb-1">🏡 Home Cell Fellowship Groups & Weekly Telemetry</h4>
                      <p className="text-xs text-slate-600">Track local weekly cells, attendance patterns, and local care needs.</p>

                      <div className="space-y-2.5">
                        {cellGroups.map(cell => (
                          <div key={cell.id} className="p-3 bg-white rounded-lg border border-slate-200 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                            <div>
                              <div className="flex items-center gap-1.5">
                                <strong className="text-slate-800 font-bold">{cell.name}</strong>
                                <span className="px-1.5 py-0.2 rounded bg-slate-100 text-[9px] text-slate-600 font-bold font-mono">Leader: {cell.leader}</span>
                              </div>
                              <span className="text-[11px] text-slate-500 block mt-1">
                                Attendance: {cell.members} Souls • Offerings: ${cell.weeklyOffering}.00 • Care Requests: {cell.pastoralCareRequestCount} pending
                              </span>
                            </div>
                            <button
                              onClick={() => handleTriggerCellTelemetry(cell.id)}
                              className="px-3 py-1.5 rounded bg-purple-600 hover:bg-purple-700 text-white font-bold text-[10px] transition-all shrink-0 shadow-sm"
                            >
                              Sync Cell Telemetry
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Church - Support Staff Portal */}
              {activeRolePortal === 'support_staff' && (
                <div className="space-y-6">
                  <div className="border-b pb-4">
                    <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                      <Briefcase className="w-6 h-6 text-purple-600" />
                      Support Staff & Institutional Administration Workspace
                    </h3>
                    <p className="text-xs text-slate-600 mt-1">
                      Provincial Canon Law compliance audits, digital asset checklists, land deed audits, and dual-signature financial approval matrix.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* canon compliance audit scorecard */}
                    <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-4">
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm">Provincial Canon Law & Civil Compliance Scorecard</h4>
                        <p className="text-xs text-slate-500 mt-0.5">Real-time status of constitutional filings and institutional governance compliance.</p>
                      </div>

                      <div className="space-y-3">
                        {[
                          { title: "Provincial Synod Constitution Filings", desc: "Sovereign constitutional bylaws verified by Provincial General Assembly.", status: "Verified & Filed", badge: "bg-emerald-100 text-emerald-800" },
                          { title: "National Registrar Bi-Annual Census Roster", desc: "Submission of church membership census registers for civil tax exemption compliance.", status: "Submitted", badge: "bg-emerald-100 text-emerald-800" },
                          { title: "AEGIS land registry boundaries audit", desc: "No encroached diocesan parcel boundaries identified.", status: "Audited & Passed", badge: "bg-emerald-100 text-emerald-800" },
                          { title: "Treasury double-signed financial approvals", desc: "Require dual keys from presiding bishop and diocesan chancellor.", status: "Enforced", badge: "bg-purple-100 text-purple-800 font-mono" }
                        ].map((audit, idx) => (
                          <div key={idx} className="p-3 bg-white rounded-lg border border-slate-200 text-xs flex justify-between items-start gap-4">
                            <div>
                              <strong className="text-slate-800 font-bold block">{audit.title}</strong>
                              <span className="text-slate-500 text-[11px] block mt-0.5">{audit.desc}</span>
                            </div>
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold shrink-0 ${audit.badge}`}>
                              {audit.status}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* dual approval manager */}
                    <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-4 flex flex-col justify-between">
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm">Support Staff Operations & Security Dashboard</h4>
                        <p className="text-xs text-slate-500 mt-0.5">Perform instant real-estate audits or approve high-value capital fund procurement orders.</p>
                        
                        <div className="p-4 bg-purple-50/50 border border-purple-200 rounded-lg text-xs text-purple-800 space-y-2 mt-4">
                          <strong>Procurement Approval dual-signature matrix:</strong>
                          <p className="leading-relaxed text-[11px]">
                            Capital disbursements above $5,000 must be entered by Support Staff, verified by Lay Catechist Synod Board, and signed with Bishop Banja's cryptographic key.
                          </p>
                        </div>
                      </div>

                      <div className="space-y-2 mt-4">
                        <button 
                          onClick={() => alert("AEGIS Asset scan successfully completed. 100% of physical properties matched registered deed coordinates.")}
                          className="w-full py-2.5 bg-white text-white hover:bg-white font-bold rounded-lg text-xs transition-all shadow-sm flex items-center justify-center gap-2"
                        >
                          <ShieldCheck className="w-4 h-4 text-emerald-400" /> Trigger Instant AEGIS Properties Audit
                        </button>
                        <button 
                          onClick={() => alert("Dual-key disbursements require chancellor ledger token to proceed.")}
                          className="w-full py-2.5 border border-slate-300 hover:bg-slate-100 text-slate-700 font-bold rounded-lg text-xs transition-all"
                        >
                          Release Verified Capital Procurement Disbursement
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Church - Member Self-Service Portal */}
              {activeRolePortal === 'member_self' && (
                <div className="space-y-6">
                  <div className="border-b pb-4">
                    <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                      <Heart className="w-6 h-6 text-purple-600" />
                      Lay Member Self-Service & Community Care Portal
                    </h3>
                    <p className="text-xs text-slate-600 mt-1">
                      Lay members submit prayer requests, track tithe statements, explore historic digital archives, and join intercessory prayer networks.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* submit request */}
                    <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 lg:col-span-1 space-y-3.5">
                      <h4 className="font-bold text-slate-900 text-sm border-b pb-1">🕊️ Submit Prayer / Care Intercession Request</h4>
                      <form onSubmit={handleRegisterPrayer} className="space-y-3">
                        <div>
                          <label className="block text-[11px] font-semibold text-slate-700 mb-1">Your Name</label>
                          <input
                            type="text"
                            value={prayerName}
                            onChange={(e) => setPrayerName(e.target.value)}
                            placeholder="e.g. Deaconess Sarah Kintu"
                            className="w-full px-3 py-2 text-xs rounded border border-slate-300 focus:outline-none focus:border-purple-500 bg-white"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-semibold text-slate-700 mb-1">Prayer & Welfare Request details</label>
                          <textarea
                            value={prayerText}
                            onChange={(e) => setPrayerText(e.target.value)}
                            placeholder="e.g. Please pray for healing for family members and successful mission work in the Northern Diocese..."
                            className="w-full px-3 py-2 text-xs rounded border border-slate-300 focus:outline-none focus:border-purple-500 bg-white h-24 resize-none"
                            required
                          />
                        </div>
                        <button
                          type="submit"
                          className="w-full py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded text-xs transition-all shadow-sm"
                        >
                          Submit to Parish Intercession List
                        </button>
                      </form>
                    </div>

                    {/* prayer requests listing */}
                    <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 lg:col-span-2 space-y-3">
                      <h4 className="font-bold text-slate-900 text-sm border-b pb-1">
                        Active Parish Intercession Board & Prayer Group
                      </h4>
                      <p className="text-xs text-slate-500">Join other members in supporting fellow congregation members with active care needs.</p>

                      <div className="space-y-3">
                        {prayerRequests.map(req => (
                          <div key={req.id} className="p-4 bg-white rounded-lg border border-slate-200 text-xs flex justify-between items-start gap-4 shadow-xs">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <strong className="text-slate-800 font-bold">{req.name}</strong>
                                <span className="text-[10px] font-mono text-slate-600">{req.date}</span>
                              </div>
                              <p className="text-slate-600 leading-relaxed">{req.text}</p>
                            </div>
                            
                            <button
                              onClick={() => handleJoinPrayer(req.id)}
                              className="px-2.5 py-1.5 rounded-lg border border-purple-200 hover:border-purple-400 bg-purple-50 hover:bg-purple-100 text-purple-700 text-[10px] font-bold transition-all shrink-0 flex items-center gap-1 shadow-2xs"
                            >
                              <Heart className="w-3.5 h-3.5 fill-purple-600 text-purple-600" />
                              <span>{req.joinedCount} Prayed</span>
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Alumni - Donors Portal */}
              {activeRolePortal === 'donors' && (
                <div className="space-y-6">
                  <div className="border-b pb-4">
                    <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                      <DollarSign className="w-6 h-6 text-emerald-600" />
                      University Endowment & Capital Campaign Donor Portal
                    </h3>
                    <p className="text-xs text-slate-600 mt-1">
                      Track capital fundraising drives, endowed chairs, student scholarship sweeps, and donor naming rights.
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-5 rounded-xl border bg-emerald-50 border-emerald-200">
                      <h4 className="font-bold text-emerald-900 text-sm mb-1">Centenary Capital Campaign</h4>
                      <p className="text-2xl font-bold text-emerald-700 my-2">$14.2M / $20.0M</p>
                      <div className="w-full bg-emerald-200 h-2 rounded-full overflow-hidden mb-3">
                        <div className="bg-emerald-600 h-full" style={{ width: '71%' }} />
                      </div>
                      <p className="text-xs text-emerald-800">71% of Goal Reached • 1,420 Donors</p>
                    </div>
                    <div className="p-5 rounded-xl border bg-blue-50 border-blue-200">
                      <h4 className="font-bold text-blue-900 text-sm mb-1">Scholarship Fund Ledger</h4>
                      <p className="text-2xl font-bold text-blue-700 my-2">142 Scholars Supported</p>
                      <p className="text-xs text-blue-800">Automated tuition sweeps directly to bursar accounts via SWIFT/ACH.</p>
                    </div>
                    <div className="p-5 rounded-xl border bg-purple-50 border-purple-200">
                      <h4 className="font-bold text-purple-900 text-sm mb-1">Tax Receipt Generation</h4>
                      <p className="text-xs text-purple-800 my-2">Download 100% compliant annual tax-deductibility receipts with SHA-256 verification seals.</p>
                      <button 
                        onClick={() => alert("Generating consolidated annual donor tax receipt PDF with cryptographic watermark.")}
                        className="w-full py-1.5 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded text-xs transition-all"
                      >
                        Download Tax Statements
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Fallback general role portal view for any other selection */}
              {activeRolePortal !== 'clergy' && activeRolePortal !== 'lay_readers' && activeRolePortal !== 'donors' && (
                <div className="p-8 text-center bg-slate-50 rounded-xl border border-dashed border-slate-300">
                  <Award className="w-12 h-12 text-blue-500 mx-auto mb-3" />
                  <h4 className="font-bold text-slate-900 text-base">Active Role Portal: {activeRolePortal.toUpperCase().replace('_', ' ')}</h4>
                  <p className="text-xs text-slate-600 max-w-md mx-auto mt-1 mb-4">
                    Specialized operational controls, permission boundaries, and workflow automations configured for this specific role in {domain.displayName || domain.name}.
                  </p>
                  <button 
                    onClick={() => setActiveTab('overview')}
                    className="px-4 py-2 bg-white text-white rounded-lg text-xs font-bold hover:bg-white transition-all"
                  >
                    Return to Overview
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 5: DOCUMENT VERIFICATION & CRYPTOGRAPHIC SEAL       */}
        {/* ========================================================= */}
        {activeTab === 'verification' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 p-6 rounded-xl text-white shadow-md">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <FileCheck className="w-6 h-6 text-[#0078D4]" />
                AI Document Verification & Cryptographic SHA-256 Seal Engine
              </h2>
              <p className="text-xs text-slate-700 mt-1">
                Scan, verify, and authenticate institutional documents (baptismal certificates, academic diplomas, ordination credentials, marriage licenses, legal deeds) using JUMO AI Vision Engine and immutable hashing.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Upload & Scan Bench */}
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 border-b pb-3">
                  <Upload className="w-5 h-5 text-blue-600" />
                  Upload Document for AI Authentication
                </h3>

                <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center bg-slate-50 hover:bg-slate-100/80 transition-all cursor-pointer">
                  <FileText className="w-12 h-12 text-blue-500 mx-auto mb-3" />
                  <p className="text-sm font-bold text-slate-800">{docFile}</p>
                  <p className="text-xs text-slate-500 mt-1">PDF, JPG, PNG or TIFF high-resolution scan supported (Max 25MB)</p>
                  <button 
                    onClick={() => setDocFile(`Institutional_Credential_Scan_${Math.floor(1000 + Math.random() * 9000)}.pdf`)}
                    className="mt-4 px-3 py-1.5 bg-white border border-slate-300 rounded text-xs font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    Select Different File
                  </button>
                </div>

                <button
                  onClick={handleScanDocument}
                  disabled={docVerifying}
                  className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold rounded-xl text-sm shadow-md transition-all flex items-center justify-center gap-2"
                >
                  {docVerifying ? <RefreshCw className="w-5 h-5 animate-spin" /> : <ShieldCheck className="w-5 h-5" />}
                  {docVerifying ? 'Scanning via JUMO AI Vision & Cross-checking Ledger...' : 'Run Cryptographic Authentication Scan'}
                </button>
              </div>

              {/* Verification Result Stamp */}
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 border-b pb-3">
                    <ShieldCheck className="w-5 h-5 text-emerald-600" />
                    Authentication Seal & Verification Output
                  </h3>

                  {docVerifying ? (
                    <div className="p-8 text-center text-slate-500 space-y-3">
                      <RefreshCw className="w-10 h-10 animate-spin text-blue-600 mx-auto" />
                      <p className="text-sm font-medium">Analyzing watermark patterns, seal embossments, and historical registrar signatures...</p>
                    </div>
                  ) : docResult ? (
                    <div className="mt-4 space-y-4">
                      <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 flex items-center gap-3">
                        <CheckCircle2 className="w-8 h-8 text-emerald-600 shrink-0" />
                        <div>
                          <p className="text-sm font-bold uppercase tracking-wide">Document Verified Authentic</p>
                          <p className="text-xs text-emerald-800 mt-0.5">100% confidence match against institutional archival database.</p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <p className="text-xs font-bold text-slate-700 uppercase">Cryptographic SHA-256 Hash Seal:</p>
                        <div className="p-3 rounded bg-white text-emerald-400 font-mono text-[11px] break-all select-all border border-slate-200">
                          {docResult.hash}
                        </div>
                      </div>

                      <div className="p-3 rounded bg-slate-50 border border-slate-200 text-xs text-slate-700 leading-relaxed">
                        <strong>AI Vision Analysis:</strong> {docResult.details}
                      </div>
                    </div>
                  ) : null}
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200 flex justify-end gap-2">
                  <button 
                    onClick={() => alert("Cryptographic verification certificate downloaded as digitally signed PDF.")}
                    className="px-4 py-2 bg-white hover:bg-white text-white font-bold rounded-lg text-xs flex items-center gap-1.5 transition-all"
                  >
                    <Download className="w-4 h-4" /> Download Official Seal Certificate
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 6: DIGITAL MUSEUM & HISTORICAL ARCHIVE                */}
        {/* ========================================================= */}
        {activeTab === 'museum' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 p-6 rounded-xl text-white shadow-md flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <Archive className="w-6 h-6 text-[#0078D4]" />
                  Sovereign Digital Museum & Historical Artifact Archive
                </h2>
                <p className="text-xs text-slate-700 mt-1">
                  Preserving centuries of institutional heritage: digitized parish registers, royal synod decrees, university charters, audio/visual sermon archives, and land titles.
                </p>
              </div>
              <button 
                onClick={() => alert("Launching AI Historical Researcher. You can ask natural language questions about events dating back to the 19th Century.")}
                className="px-4 py-2 rounded-lg bg-cyan-400 text-slate-950 font-bold text-xs hover:bg-cyan-300 transition-all flex items-center gap-2 shrink-0 shadow-sm"
              >
                <Search className="w-4 h-4" /> Launch AI Historical Researcher
              </button>
            </div>

            {/* Museum Timeline Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {artifacts.map(art => (
                <div key={art.id} className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
                  <div className="p-5 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-900 border border-cyan-300 uppercase">
                        {art.category}
                      </span>
                      <span className="text-xs font-mono font-bold text-slate-500">{art.yearOrCentury}</span>
                    </div>
                    <h3 className="font-bold text-slate-900 text-base leading-snug">{art.title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">{art.description}</p>
                  </div>

                  <div className="p-4 bg-slate-50 border-t border-slate-200 space-y-2">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-slate-500">Authenticity:</span>
                      <span className="text-emerald-700 font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Verified by AI Vision
                      </span>
                    </div>
                    <div className="font-mono text-[9px] text-slate-600 truncate bg-white p-1.5 rounded border" title={art.verificationHash}>
                      {art.verificationHash}
                    </div>
                    <button 
                      onClick={() => alert(`Opening interactive high-resolution viewer for artifact: ${art.title}`)}
                      className="w-full py-1.5 bg-white hover:bg-white text-white font-bold rounded text-xs transition-all flex items-center justify-center gap-1"
                    >
                      <Eye className="w-3.5 h-3.5" /> Inspect Artifact Vault
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 7: MANAGEMENT TEMPLATES & PRESETS                     */}
        {/* ========================================================= */}
        {activeTab === 'templates' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 p-6 rounded-xl text-white shadow-md">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <BookOpen className="w-6 h-6 text-[#0078D4]" />
                Sovereign Management Templates & Instant Cloning Bench
              </h2>
              <p className="text-xs text-slate-700 mt-1">
                Pre-configured institutional presets with pre-wired RBAC roles, automated workflows, and specialized AI copilot prompts. 1-click install and cloning.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: 'Cathedral & Diocese Governance Network', type: 'Ecclesiastical', desc: 'Full multi-parish hierarchy with diocesan synod reporting, clergy payroll, sacramental schedules, and tithe reconciliation.', ai: 'Pastoral & Canon Law Advisor' },
                { name: 'Mega-Church Multi-Campus Platform', type: 'Ecclesiastical', desc: 'Real-time multi-campus live streaming coordination, children ministry check-in kiosk, home cell group rosters, and M-Pesa tithing.', ai: 'Congregation Engagement AI' },
                { name: 'National University Higher Education ERP', type: 'Education', desc: 'Complete multi-faculty admissions, course grading, research grant administration, hostel allocation, and alumni endowment sweeps.', ai: 'JUMO Academic Advisor' },
                { name: 'Tier-1 National Cooperative SACCO', type: 'Finance', desc: 'Member share capital registers, automated loan underwriting, mobile money disbursement, and central bank compliance.', ai: 'SACCO Credit Risk AI' },
                { name: 'National Referral Hospital Clinical Platform', type: 'Healthcare', desc: 'Inpatient wards, ICU telemetry monitoring, surgery theater scheduling, electronic health records, and pharmacy dispensing.', ai: 'JUMO Clinical Assistant' },
                { name: 'Sovereign Kingdom & Heritage Administration', type: 'Cultural Governance', desc: 'Royal palace protocol, county chiefdom hierarchies, cultural artifact archiving, and annual ceremony coordination.', ai: 'Royal Heritage Historian' }
              ].map((tpl, i) => (
                <div key={i} className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm hover:border-blue-400 transition-all flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-800 border border-blue-200">
                        {tpl.type}
                      </span>
                      <span className="text-xs font-mono text-emerald-600 font-semibold">v12.9.4 Certified</span>
                    </div>
                    <h3 className="font-bold text-slate-900 text-sm leading-snug">{tpl.name}</h3>
                    <p className="text-xs text-slate-600 mt-2 leading-relaxed">{tpl.desc}</p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 space-y-3">
                    <div className="text-[11px] text-slate-500 flex items-center gap-1.5">
                      <Bot className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                      <span className="font-medium text-slate-800">JUMO Enterprise AI Copilot:</span> {tpl.ai}
                    </div>
                    <button 
                      onClick={() => alert(`Successfully cloned and deployed preset template: "${tpl.name}" into current domain workspace!`)}
                      className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg text-xs transition-all shadow-sm flex items-center justify-center gap-1.5"
                    >
                      <Plus className="w-4 h-4" /> Clone & Activate Template
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 8: AEGIS 10-W ACCOUNTABILITY LOG                      */}
        {/* ========================================================= */}
        {activeTab === 'aegis_audit' && (
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b pb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-600" />
                  AEGIS 10-W Sovereign Accountability Log
                </h3>
                <p className="text-xs text-slate-500">Immutable, zero-trust cryptographic audit trail monitoring every API call, payment, and verification.</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-300">
                100% Zero-Trust Compliance
              </span>
            </div>

            <div className="space-y-2 font-mono text-xs">
              {[
                "2026-07-25 14:15:22 | [PAYMENT_SETTLED] | Receipt REC-2026-88910 ($1,500.00 M-Pesa) | Status: RECONCILED | Hash: 8f41e9a2...",
                "2026-07-25 14:10:05 | [PAYMENT_SETTLED] | Receipt REC-2026-88911 ($4,200.00 MTN MoMo) | Status: RECONCILED | Hash: 4a11c890...",
                "2026-07-25 13:55:12 | [DOC_VERIFICATION] | Baptismal_Certificate_Scan_1984.pdf | Result: AUTHENTIC | Hash: e3b0c442...",
                "2026-07-25 13:45:10 | [PAYMENT_SETTLED] | Receipt REC-2026-88912 ($25,000.00 SWIFT Wire) | Status: RECONCILED | Hash: 9c00b144...",
                "2026-07-25 13:30:00 | [AI_GUARDRAIL_CHECK] | JUMO AI Enterprise Engine query analysis | Result: NO_HALLUCINATION | Latency: 142ms",
                "2026-07-25 13:10:00 | [MEMBER_CENSUS] | New demographic registration MEM-2026-003 | Cohort: Youth (13-24) | Cell: Kampala Scholars"
              ].map((log, idx) => (
                <div key={idx} className="p-2.5 rounded bg-white text-slate-700 border border-slate-200 flex items-center justify-between">
                  <span>{log}</span>
                  <span className="text-emerald-400 font-bold">VERIFIED</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 16. OPERATIONAL MATURITY TABS (Directive v16.0 & v16.1 Section 7) */}
        {activeTab === 'workflow' && (
          <div className="space-y-6">
            <div className="bg-[#0078D4] text-white p-6 rounded-2xl shadow-md flex justify-between items-center">
              <div>
                <h3 className="text-lg font-bold">Autonomous Workflow Engine (Ring-0 Execution)</h3>
                <p className="text-xs text-blue-100 mt-1">Orchestrating multi-step tenant approvals, ledger settlements, and AI guardrail pipelines.</p>
              </div>
              <button onClick={() => alert('New sovereign workflow pipeline initialized with Ring-0 zero-trust verification.')} className="px-4 py-2 rounded-xl bg-white text-[#0078D4] font-bold text-xs hover:bg-blue-50 transition-all">
                + Create Pipeline
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { name: 'FAAP Automated Rebalancing', trigger: 'Cron (0 0 * * *)', status: 'ACTIVE', steps: '4 Steps', latency: '42ms' },
                { name: 'Zero-Trust Role Attestation', trigger: 'On User Login', status: 'ACTIVE', steps: '6 Steps', latency: '18ms' },
                { name: 'Document Cryptographic Sealing', trigger: 'On Upload', status: 'ACTIVE', steps: '3 Steps', latency: '95ms' },
                { name: 'Tenant Billing & Invoice Dispatch', trigger: '1st of Month', status: 'ACTIVE', steps: '5 Steps', latency: '310ms' },
                { name: 'AI Hallucination Guardrail Check', trigger: 'Before Response', status: 'ACTIVE', steps: '2 Steps', latency: '110ms' },
                { name: 'AEGIS 10-W Ledger Snapshot', trigger: 'Hourly', status: 'ACTIVE', steps: '4 Steps', latency: '65ms' }
              ].map((wf, idx) => (
                <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">{wf.status}</span>
                      <span className="text-xs font-mono text-slate-400">{wf.latency}</span>
                    </div>
                    <h4 className="font-bold text-slate-900 text-sm">{wf.name}</h4>
                    <p className="text-xs text-slate-500 mt-1">Trigger: <span className="font-mono text-slate-700">{wf.trigger}</span></p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-100 flex justify-between items-center text-xs">
                    <span className="text-slate-500">{wf.steps} executed</span>
                    <button onClick={() => alert(`Executing workflow ${wf.name}...`)} className="text-[#0078D4] font-semibold hover:underline">Execute Now →</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div className="bg-[#0078D4] text-white p-6 rounded-2xl shadow-md">
              <h3 className="text-lg font-bold">Tenant Analytics & Health Telemetry</h3>
              <p className="text-xs text-blue-100 mt-1">Real-time metrics across 16 hybrid platform layers and Ring-0 kernel nodes.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm"><span className="text-xs font-bold text-slate-400 uppercase">System Uptime</span><div className="text-3xl font-extrabold text-[#0078D4] mt-1">99.999%</div><span className="text-xs text-emerald-600 mt-1 block">✓ 0 Planned Downtime</span></div>
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm"><span className="text-xs font-bold text-slate-400 uppercase">Ring-0 Latency</span><div className="text-3xl font-extrabold text-slate-900 mt-1">14.2 ms</div><span className="text-xs text-slate-500 mt-1 block">Sub-20ms SLA Met</span></div>
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm"><span className="text-xs font-bold text-slate-400 uppercase">Active Subscriptions</span><div className="text-3xl font-extrabold text-emerald-600 mt-1">1,420</div><span className="text-xs text-slate-500 mt-1 block">+12% this month</span></div>
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm"><span className="text-xs font-bold text-slate-400 uppercase">Ledger Reconciliations</span><div className="text-3xl font-extrabold text-purple-600 mt-1">100%</div><span className="text-xs text-slate-500 mt-1 block">0 Parity Discrepancies</span></div>
            </div>
          </div>
        )}

        {activeTab === 'licensing' && (
          <div className="space-y-6">
            <div className="bg-[#0078D4] text-white p-6 rounded-2xl shadow-md">
              <h3 className="text-lg font-bold">Sovereign Licensing & Quotas</h3>
              <p className="text-xs text-blue-100 mt-1">Managing Ring-0 cryptographic entitlement keys and tenant resource utilization.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex justify-between items-center pb-4 border-b border-slate-100">
                <div><h4 className="font-bold text-slate-900">Current Entitlement Tier: <span className="text-[#0078D4]">Enterprise Hybrid Sovereign (Tier 1)</span></h4><p className="text-xs text-slate-500">License Key: <span className="font-mono">JUMO-UEOS-2026-SOV-8891-RING0</span></p></div>
                <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">ACTIVE & VERIFIED</span>
              </div>
              <div className="space-y-3">
                <div><div className="flex justify-between text-xs font-semibold mb-1"><span>API Requests & Webhooks</span><span>1,420,000 / 10,000,000 (14.2%)</span></div><div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden"><div className="bg-[#0078D4] h-full rounded-full" style={{ width: '14.2%' }} /></div></div>
                <div><div className="flex justify-between text-xs font-semibold mb-1"><span>Storage & Cryptographic Archives</span><span>420 GB / 5,000 GB (8.4%)</span></div><div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden"><div className="bg-emerald-500 h-full rounded-full" style={{ width: '8.4%' }} /></div></div>
                <div><div className="flex justify-between text-xs font-semibold mb-1"><span>AI Token Usage (Gemini 2.5 Flash / Pro)</span><span>2,100,000 / 50,000,000 (4.2%)</span></div><div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden"><div className="bg-purple-500 h-full rounded-full" style={{ width: '4.2%' }} /></div></div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'updates' && (
          <div className="space-y-6">
            <div className="bg-[#0078D4] text-white p-6 rounded-2xl shadow-md">
              <h3 className="text-lg font-bold">System Updates & Hot-Swap Migration</h3>
              <p className="text-xs text-blue-100 mt-1">Zero-downtime micro-kernel module patching and AEGIS 10-W state synchronization.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center gap-4 p-4 rounded-xl bg-blue-50 border border-blue-200">
                <RefreshCw className="w-6 h-6 text-[#0078D4] animate-spin" />
                <div><h4 className="font-bold text-slate-900 text-sm">UEOS Micro-Kernel Phase 26.4 is up to date</h4><p className="text-xs text-slate-600">Last ledger verification: Today at 06:00 UTC. All 16 hybrid layers synchronized.</p></div>
              </div>
              <button onClick={() => alert('Checking Ring-0 registry for kernel patches... All modules verified.')} className="px-4 py-2 rounded-xl bg-[#0078D4] text-white text-xs font-bold hover:bg-blue-700 transition-all">Check for Updates</button>
            </div>
          </div>
        )}

        {activeTab === 'integrations' && (
          <div className="space-y-6">
            <div className="bg-[#0078D4] text-white p-6 rounded-2xl shadow-md">
              <h3 className="text-lg font-bold">Integrations & Connectors</h3>
              <p className="text-xs text-blue-100 mt-1">Unified gateways for banking APIs, M-Pesa, government registries, and external cloud services.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { name: 'Safaricom M-Pesa Daraja API', category: 'Payment Gateway', status: 'CONNECTED', desc: 'Instant C2B and B2C mobile money settlement.' },
                { name: 'SWIFT International Wire', category: 'Banking Gateway', status: 'CONNECTED', desc: 'Real-time wire transfers and treasury parity.' },
                { name: 'Google Workspace Sync', category: 'Productivity', status: 'CONNECTED', desc: 'Calendar, Docs, and Gmail enterprise synchronization.' },
                { name: 'Government Civil Registry', category: 'Compliance', status: 'CONNECTED', desc: 'National ID and Tax PIN biometric verification.' },
                { name: 'Stripe Enterprise Connect', category: 'Payment Gateway', status: 'CONNECTED', desc: 'Global card processing and subscription billing.' },
                { name: 'AWS / GCP Hybrid Storage', category: 'Infrastructure', status: 'CONNECTED', desc: 'Distributed multi-cloud document archiving.' }
              ].map((item, idx) => (
                <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-2"><span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">{item.status}</span><span className="text-[10px] font-semibold text-slate-400 uppercase">{item.category}</span></div>
                    <h4 className="font-bold text-slate-900 text-sm">{item.name}</h4>
                    <p className="text-xs text-slate-500 mt-1">{item.desc}</p>
                  </div>
                  <button onClick={() => alert(`Configuring ${item.name}...`)} className="mt-4 pt-3 border-t border-slate-100 text-xs text-[#0078D4] font-semibold hover:underline text-left">Configure Connector →</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'api_management' && (
          <div className="space-y-6">
            <div className="bg-[#0078D4] text-white p-6 rounded-2xl shadow-md flex justify-between items-center">
              <div><h3 className="text-lg font-bold">API Management & Webhook Registry</h3><p className="text-xs text-blue-100 mt-1">Manage REST/GraphQL endpoints, API keys, and event webhook listeners.</p></div>
              <button onClick={() => alert('New API key generated: jumo_live_pk_889100...')} className="px-4 py-2 rounded-xl bg-white text-[#0078D4] font-bold text-xs hover:bg-blue-50 transition-all">+ Generate API Key</button>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3 font-mono text-xs">
              <div className="p-3 rounded bg-slate-50 border border-slate-200 flex justify-between items-center"><span>POST /api/v1/tenant/settle_transaction</span><span className="text-emerald-600 font-bold">ACTIVE (SLA: 12ms)</span></div>
              <div className="p-3 rounded bg-slate-50 border border-slate-200 flex justify-between items-center"><span>GET /api/v1/tenant/aegis_audit_logs</span><span className="text-emerald-600 font-bold">ACTIVE (SLA: 18ms)</span></div>
              <div className="p-3 rounded bg-slate-50 border border-slate-200 flex justify-between items-center"><span>WEBHOOK: https://api.jumo.ai/webhooks/mpesa_callback</span><span className="text-purple-600 font-bold">LISTENING</span></div>
            </div>
          </div>
        )}

        {activeTab === 'notifications' && (
          <div className="space-y-6">
            <div className="bg-[#0078D4] text-white p-6 rounded-2xl shadow-md">
              <h3 className="text-lg font-bold">Sovereign Notification Center</h3>
              <p className="text-xs text-blue-100 mt-1">Real-time alerts, system broadcasts, and AI guardrail notifications across all tenant users.</p>
            </div>
            <div className="space-y-3">
              {[
                { title: 'Ledger Settlement Complete', time: '2 minutes ago', desc: 'FAAP Treasury automatically reconciled 1,420 transactions without discrepancy.', type: 'SUCCESS' },
                { title: 'AI Guardrail Report Ready', time: '1 hour ago', desc: 'JUMO AI Assistant completed daily compliance scan across all records.', type: 'INFO' },
                { title: 'System Hot-Swap Patch Applied', time: '5 hours ago', desc: 'Ring-0 micro-kernel upgraded to Phase 26.4 with zero downtime.', type: 'SUCCESS' }
              ].map((notif, idx) => (
                <div key={idx} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-start gap-3">
                  <Bell className="w-5 h-5 text-[#0078D4] shrink-0 mt-0.5" />
                  <div><h4 className="font-bold text-slate-900 text-sm">{notif.title}</h4><p className="text-xs text-slate-600 mt-0.5">{notif.desc}</p><span className="text-[10px] text-slate-400 mt-1 block">{notif.time}</span></div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'documentation' && (
          <div className="space-y-6">
            <div className="bg-[#0078D4] text-white p-6 rounded-2xl shadow-md">
              <h3 className="text-lg font-bold">Sovereign Documentation & Knowledge Base</h3>
              <p className="text-xs text-blue-100 mt-1">Authoritative guides for JUMO UEOS Phase 26, Ring-0 ledger rules, and hybrid deployment.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm"><h4 className="font-bold text-slate-900 mb-2">FAAP Treasury Accounting Manual</h4><p className="text-xs text-slate-600">Learn how double-entry parity is strictly enforced across all sovereign tenant accounts.</p><button onClick={() => alert('Opening FAAP Treasury Manual...')} className="mt-3 text-xs font-bold text-[#0078D4] hover:underline">Read Guide →</button></div>
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm"><h4 className="font-bold text-slate-900 mb-2">AEGIS 10-W Security Architecture</h4><p className="text-xs text-slate-600">Comprehensive overview of cryptographic SHA-256 document sealing and zero-trust RBAC.</p><button onClick={() => alert('Opening AEGIS 10-W Guide...')} className="mt-3 text-xs font-bold text-[#0078D4] hover:underline">Read Guide →</button></div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
};
