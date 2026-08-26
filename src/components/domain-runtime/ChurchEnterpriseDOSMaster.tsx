import React, { useState } from 'react';
import {
  Bot, Cpu, Sparkles, ShieldCheck, FileText, Award, Building2, Globe, BookOpen,
  Users, DollarSign, Layers, Calendar, Clock, CheckCircle, AlertTriangle, Key,
  Lock, RefreshCw, Search, Filter, Plus, Trash2, Edit3, ChevronRight, Share2,
  Download, Printer, Send, Smartphone, Tv, Radio, Mic, Video, Camera, Image,
  FolderOpen, Archive, HelpCircle, Activity, BarChart3, PieChart, TrendingUp,
  MapPin, Navigation, Compass, Heart, Cross, ShieldAlert, Sliders, Check,
  UserPlus, FileCheck, Banknote, Briefcase, GraduationCap, Home, Wifi,
  HardDrive, Database, Terminal, Shield, QrCode, FileDown, Eye, Play
} from 'lucide-react';

// ==========================================
// INTERFACES & TYPES
// ==========================================

export type DenominationType = 'Anglican / Episcopal' | 'Roman Catholic' | 'Orthodox' | 'Pentecostal / Charismatic' | 'Seventh-Day Adventist' | 'Methodist / Wesleyan' | 'Reformed / Presbyterian' | 'Baptist' | 'Independent / Non-Denominational';

export interface SacramentalRecord {
  id: string;
  sacramentType: 'Baptism' | 'Confirmation' | 'First Holy Communion' | 'Holy Matrimony' | 'Holy Orders (Ordination)' | 'Clergy Licensing' | 'Commissioning' | 'Funeral / Memorial Service' | 'Anointing of the Sick';
  memberId: string;
  memberName: string;
  date: string;
  parish: string;
  diocese: string;
  officiatingClergy: string;
  witnesses: string[];
  certificateNumber: string;
  sha256Seal: string;
  qrVerificationUrl: string;
  status: 'Verified & Sealed' | 'Pending Dual Signature' | 'Archived';
}

export interface DigitalChurchIdentity {
  id: string;
  membershipNumber: string;
  nationalId: string;
  fullName: string;
  passportPhoto: string;
  householdNumber: string;
  role: 'Laity' | 'Lay Reader' | 'Evangelist' | 'Catechist' | 'Deacon' | 'Priest / Pastor' | 'Canon' | 'Archdeacon' | 'Bishop' | 'Archbishop';
  gpsCoordinates: string;
  spiritualGifts: string[];
  professionalQualifications: string[];
  activeMinistries: string[];
  lifelongSacraments: string[];
  status: 'Active Communicant' | 'Catechumen' | 'New Believer' | 'Clergy on Active Duty' | 'Retired Clergy' | 'Missionary in Field';
}

export interface MissionFieldProject {
  id: string;
  missionName: string;
  region: string;
  category: 'Church Planting' | 'Crusade & Outreach' | 'Prison Ministry' | 'Hospital Ministry' | 'Campus Ministry' | 'Remote Tribe Outreach';
  leadMissionary: string;
  status: 'Active Field' | 'Planted & Self-Sustaining' | 'Planning Phase';
  convertsCount: number;
  budgetAllocated: number;
  faapClearingStatus: 'Settled via 1.5% JUMO Sweep' | 'Pending Allocation';
}

export interface ChurchAIAgent {
  id: string;
  name: string;
  category: 'Executive & Episcopal' | 'Theology & Canon Law' | 'Administration & Finance' | 'Evangelism & Missions' | 'Safeguarding & Welfare';
  model: 'Gemini 2.5 Pro (Theology/Reasoning)' | 'Gemini 2.5 Flash (Instant Search/Admin)' | 'Omni Audio/Video Engine';
  description: string;
  status: 'Active & Synchronized' | 'Training on Parish Archives';
  lastQuery: string;
}

// ==========================================
// MAIN COMPONENT: CHURCH DOS MASTER HUB
// ==========================================

export const ChurchEnterpriseDOSMaster: React.FC = () => {
  // Navigation State for our 12 Enterprise DOS Portals
  const [activePortal, setActivePortal] = useState<
    | 'identity_sacraments'
    | 'member_app'
    | 'leadership_app'
    | 'registration_engine'
    | 'church_ai'
    | 'communication_hub'
    | 'suggestion_intelligence'
    | 'virtual_service'
    | 'document_trust'
    | 'knowledge_management'
    | 'event_experience'
    | 'volunteer_talent'
    | 'social_impact'
    | 'digital_giving'
    | 'geographic_intelligence'
    | 'digital_governance'
    | 'marketplace_exchange'
    | 'ai_command'
  >('identity_sacraments');

  // UAMP Manufacturing Template State
  const [denomination, setDenomination] = useState<DenominationType>('Anglican / Episcopal');
  const [isUampConfigOpen, setIsUampConfigOpen] = useState(false);
  const [governanceHierarchy, setGovernanceHierarchy] = useState<string[]>(
    ['Global Church', 'National Church', 'Province', 'Diocese', 'Archdeaconry', 'Deanery', 'Parish', 'Local Church / Chapel', 'Small Christian Community', 'Cell Group']
  );

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDioceseFilter, setSelectedDioceseFilter] = useState('All Dioceses');

  // Interactive Modal States
  const [showNewSacramentModal, setShowNewSacramentModal] = useState(false);
  const [showAiCopilotModal, setShowAiCopilotModal] = useState(false);
  const [activeAiAgent, setActiveAiAgent] = useState<ChurchAIAgent | null>(null);
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [isGeneratingAi, setIsGeneratingAi] = useState(false);

  // Mock Sacramental Records (Permanent Immutable Ledger)
  const [sacraments, setSacraments] = useState<SacramentalRecord[]>([
    {
      id: 'SAC-2026-8891',
      sacramentType: 'Baptism',
      memberId: 'MEM-UG-4401',
      memberName: 'John Wesley Mukasa',
      date: '2026-07-15',
      parish: 'St. Paul Cathedral Parish',
      diocese: 'Diocese of Kampala',
      officiatingClergy: 'Rev. Canon Peter Ssemwogerere',
      witnesses: ['Grace Mukasa (Godmother)', 'David Kigozi (Godfather)'],
      certificateNumber: 'CERT-BAP-2026-UG009',
      sha256Seal: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
      qrVerificationUrl: 'https://jumo.ueos/verify/sacrament/CERT-BAP-2026-UG009',
      status: 'Verified & Sealed'
    },
    {
      id: 'SAC-2026-8892',
      sacramentType: 'Holy Orders (Ordination)',
      memberId: 'MEM-KE-1109',
      memberName: 'Rev. Samuel Ochieng',
      date: '2026-06-28',
      parish: 'All Saints Cathedral',
      diocese: 'Diocese of Nairobi',
      officiatingClergy: 'Most Rev. Dr. Jackson Ole Sapit (Archbishop)',
      witnesses: ['Ven. Sarah Njoroge', 'Rev. Dr. Stephen Kamau'],
      certificateNumber: 'CERT-ORD-2026-KE004',
      sha256Seal: 'f482a39103c81023910293810293810293810293810293810293810293810293',
      qrVerificationUrl: 'https://jumo.ueos/verify/sacrament/CERT-ORD-2026-KE004',
      status: 'Verified & Sealed'
    },
    {
      id: 'SAC-2026-8893',
      sacramentType: 'Holy Matrimony',
      memberId: 'MEM-TZ-5512',
      memberName: 'Dr. Emanuel & Sarah Mwakasege',
      date: '2026-07-20',
      parish: 'St. Alban Parish',
      diocese: 'Diocese of Dar es Salaam',
      officiatingClergy: 'Rev. Fr. Augustine Lwanga',
      witnesses: ['Michael Mwakasege', 'Esther Mwakasege'],
      certificateNumber: 'CERT-MAT-2026-TZ018',
      sha256Seal: 'a1b2c3d4e5f67890123456789abcdef0123456789abcdef0123456789abcdef0',
      qrVerificationUrl: 'https://jumo.ueos/verify/sacrament/CERT-MAT-2026-TZ018',
      status: 'Verified & Sealed'
    }
  ]);

  // Mock Digital Identities
  const [identities] = useState<DigitalChurchIdentity[]>([
    {
      id: 'ID-UG-001',
      membershipNumber: 'UG-KMP-2021-0001',
      nationalId: 'CM8902110928KB',
      fullName: 'Most Rev. Dr. Stephen Kaziimba Mugalu',
      passportPhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      householdNumber: 'HH-UG-KMP-0010',
      role: 'Archbishop',
      gpsCoordinates: '0.3136° N, 32.5811° E (Namirembe Hill)',
      spiritualGifts: ['Apostolic Leadership', 'Preaching', 'Reconciliation'],
      professionalQualifications: ['Ph.D. Theology', 'Master of Divinity'],
      activeMinistries: ['House of Bishops', 'Provincial Synod Governance', 'Global Missions'],
      lifelongSacraments: ['Baptism (1963)', 'Confirmation (1975)', 'Holy Orders (1990)', 'Episcopal Consecration (2008)'],
      status: 'Clergy on Active Duty'
    },
    {
      id: 'ID-UG-002',
      membershipNumber: 'UG-KMP-2024-0812',
      nationalId: 'CF9801129381LL',
      fullName: 'Dr. Beatrice Akello',
      passportPhoto: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
      householdNumber: 'HH-UG-KMP-0442',
      role: 'Laity',
      gpsCoordinates: '0.3476° N, 32.5825° E (Ntinda Parish)',
      spiritualGifts: ['Administration', 'Philanthropy', 'Teaching'],
      professionalQualifications: ['MD Pediatrics', 'MPH Epidemiology'],
      activeMinistries: ['Diocesan Health Committee', 'Women Ministry (Mothers Union)', 'Sunday School Superintendent'],
      lifelongSacraments: ['Baptism (1988)', 'Confirmation (2002)', 'Holy Matrimony (2014)'],
      status: 'Active Communicant'
    }
  ]);

  // Mock Mission Field Projects (Phase II #13)
  const [missions] = useState<MissionFieldProject[]>([
    {
      id: 'MIS-2026-01',
      missionName: 'Karamoja Nomadic Pastoralist Outreach & Church Planting',
      region: 'Moroto & Kotido Districts (Northern Uganda)',
      category: 'Church Planting',
      leadMissionary: 'Rev. Capt. Titus Okello (Church Army)',
      status: 'Active Field',
      convertsCount: 1420,
      budgetAllocated: 45000,
      faapClearingStatus: 'Settled via 1.5% JUMO Sweep'
    },
    {
      id: 'MIS-2026-02',
      missionName: 'Kampala University Campus Discipleship & Leadership Hub',
      region: 'Makerere & Kyambogo Universities',
      category: 'Campus Ministry',
      leadMissionary: 'Rev. Dr. Timothy Lwanga',
      status: 'Planted & Self-Sustaining',
      convertsCount: 3800,
      budgetAllocated: 28000,
      faapClearingStatus: 'Settled via 1.5% JUMO Sweep'
    },
    {
      id: 'MIS-2026-03',
      missionName: 'Luzira Maximum Security Prison Chaplaincy & Rehab Center',
      region: 'Luzira Penitentiary Complex',
      category: 'Prison Ministry',
      leadMissionary: 'Rev. Canon Esther Nabatanzi',
      status: 'Active Field',
      convertsCount: 650,
      budgetAllocated: 15500,
      faapClearingStatus: 'Settled via 1.5% JUMO Sweep'
    }
  ]);

  // Mock Church AI Agents (Phase III #31)
  const [aiAgents] = useState<ChurchAIAgent[]>([
    {
      id: 'AI-CANON-01',
      name: 'AEGIS Canon Law & Constitutional Advisor',
      category: 'Theology & Canon Law',
      model: 'Gemini 2.5 Pro (Theology/Reasoning)',
      description: 'Analyzes Provincial Constitutions, Diocesan Regulations, and Anglican Canon Law to provide instant legal rulings on parish disputes and clergy licensing.',
      status: 'Active & Synchronized',
      lastQuery: 'Can a parish synod borrow funds against church land without explicit written resolution from the Diocesan Trustees?'
    },
    {
      id: 'AI-THEO-02',
      name: 'Chrysostom Sermon & Liturgy Assistant',
      category: 'Theology & Canon Law',
      model: 'Gemini 2.5 Pro (Theology/Reasoning)',
      description: 'Generates exegesis, Greek/Hebrew word studies, sermon outlines aligned with the 3-Year Revised Common Lectionary, and responsive prayers.',
      status: 'Active & Synchronized',
      lastQuery: 'Generate a 4-part sermon series outline on Isaiah 61 focusing on community restoration and jubilee liberation.'
    },
    {
      id: 'AI-FIN-03',
      name: 'FAAP Autonomous Church Auditor & Tithe Analyzer',
      category: 'Administration & Finance',
      model: 'Gemini 2.5 Flash (Instant Search/Admin)',
      description: 'Continuously reconciles parish M-Pesa tithe remittances with the JUMO FAAP ledger, flagging variances and predicting monthly cash flow trends.',
      status: 'Active & Synchronized',
      lastQuery: 'Run anomaly detection on Q2 building fund collections across all archdeaconries in Northern Province.'
    },
    {
      id: 'AI-SAFE-04',
      name: 'Good Samaritan Safeguarding & Welfare Sentinel',
      category: 'Safeguarding & Welfare',
      model: 'Gemini 2.5 Flash (Instant Search/Admin)',
      description: 'Monitors child protection clearances for Sunday school teachers, tracks orphan sponsorship disbursements, and flags vulnerable household emergencies.',
      status: 'Active & Synchronized',
      lastQuery: 'Verify police background check renewals for all 420 youth leaders attending the upcoming National Camp.'
    }
  ]);

  // Handle AI Copilot execution
  const triggerAiAgent = (agent: ChurchAIAgent) => {
    setActiveAiAgent(agent);
    setAiPrompt(agent.lastQuery);
    setAiResponse('');
    setShowAiCopilotModal(true);
  };

  const executeAiGeneration = () => {
    if (!aiPrompt) return;
    setIsGeneratingAi(true);
    setTimeout(() => {
      let mockRes = '';
      if (activeAiAgent?.id === 'AI-CANON-01') {
        mockRes = `📜 **CANON LAW RULING: PARISH LAND ENCUMBRANCE & BORROWING**\n\n**Authority:** Provincial Constitution (Article 24, Clause 3) & Diocesan Trust Properties Act.\n\n**Ruling:** **STRICTLY PROHIBITED WITHOUT DIOCESAN TRUSTEE RESOLUTION.**\n1. **Title Ownership:** All ecclesiastical real estate is vested legally in the Registered Trustees of the Diocese, not the individual Parish Council or incumbent Priest.\n2. **Mortgage Restriction:** No Parish Synod, Archdeaconry Council, or individual clergy may pledge, mortgage, lease for >3 years, or alienate church land.\n3. **Mandatory Procedure:** Any borrowing exceeding $10,000 requiring asset collateral MUST receive a unanimous vote from the Diocesan Board of Finance followed by the physical signature and cryptographic SHA-256 seal of the Diocesan Bishop and Diocesan Chancellor.\n\n*Compliance status automatically logged to AEGIS 10-W Audit Ledger.*`;
      } else if (activeAiAgent?.id === 'AI-THEO-02') {
        mockRes = `✝️ **SERMON SERIES OUTLINE: THE JUBILEE RESTORATION (ISAIAH 61:1-4)**\n\n**Series Theme:** Rebuilding the Ancient Ruins through Gospel Empowerment\n\n**Week 1: The Anointing for the Brokenhearted (Isa 61:1)**\n• *Exegetical Focus:* 'Mashach' (Anointed) and 'Basar' (Good Tidings). Jesus' programmatic declaration in Luke 4:18.\n• *Application:* Moving from personal grief to spiritual empowerment.\n\n**Week 2: Beauty for Ashes: The Divine Exchange (Isa 61:2-3)**\n• *Exegetical Focus:* The garment of praise replacing the spirit of heaviness.\n• *Application:* Pastoral healing for families recovering from economic and emotional distress.\n\n**Week 3: Oaks of Righteousness: Structural Integrity (Isa 61:3b)**\n• *Exegetical Focus:* 'Eylay Tsedek' (Trees planted by Yahweh for His glory).\n• *Application:* Discipleship character that withstands cultural storms.\n\n**Week 4: Repairers of the Breach: Transforming Communities (Isa 61:4)**\n• *Exegetical Focus:* Rebuilding devastated cities and generational foundations.\n• *Application:* Launching our Parish Welfare & Vocational Apprenticeship Project.`;
      } else {
        mockRes = `🤖 **JUMO CHURCH AI AGENT REPORT**\n\nAnalysis complete for prompt: "${aiPrompt}"\n\n**Key Findings & Recommendations:**\n• All 17 parish departments in the selected diocese are operating within 98.4% budget compliance.\n• M-Pesa automated tithe sweeps settled via JUMO FAAP cleared $142,500 with zero clearing discrepancies.\n• 14 new Sunday School teachers were verified against the National Safeguarding Registry with valid certificates.\n\n*Cryptographically stamped by JUMO AI Command Center.*`;
      }
      setAiResponse(mockRes);
      setIsGeneratingAi(false);
    }, 1200);
  };

  // Add new sacrament record
  const handleCreateSacrament = (e: React.FormEvent) => {
    e.preventDefault();
    const newRec: SacramentalRecord = {
      id: `SAC-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      sacramentType: 'Confirmation',
      memberId: 'MEM-UG-9912',
      memberName: 'Sarah Nakato',
      date: new Date().toISOString().split('T')[0],
      parish: 'St. John Parish',
      diocese: 'Diocese of Kampala',
      officiatingClergy: 'Rt. Rev. Dr. Hannington Mutebi',
      witnesses: ['James Katende', 'Mary Katende'],
      certificateNumber: `CERT-CNF-2026-UG${Math.floor(100 + Math.random() * 900)}`,
      sha256Seal: '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08',
      qrVerificationUrl: 'https://jumo.ueos/verify/sacrament/CERT-CNF-2026-NEW',
      status: 'Verified & Sealed'
    };
    setSacraments([newRec, ...sacraments]);
    setShowNewSacramentModal(false);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans">
      
      {/* 1. MASTER HEADER & DENOMINATION TEMPLATE BANNER */}
      <header className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border-b border-indigo-500/30 px-6 py-5 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/30 text-white flex items-center justify-center">
              <Cross className="w-8 h-8 text-amber-700 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/20 border border-indigo-400/40 text-indigo-300 text-xs font-bold tracking-wider uppercase flex items-center gap-1">
                  <Cpu className="w-3 h-3" />
                  JUMO UEOS Church DOS 3.0
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-700 text-xs font-bold flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" />
                  31 Phases Consolidated
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-700 text-xs font-bold flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" />
                  FAAP 1.5% Direct Sweep
                </span>
              </div>
              <h1 className="text-2xl font-black tracking-tight text-white mt-1 flex items-center gap-3">
                Church Digital Operating System (Church DOS)
                <span className="text-sm font-semibold text-indigo-300 bg-white/80 px-3 py-1 rounded-lg border border-slate-200">
                  Denomination: {denomination}
                </span>
              </h1>
              <p className="text-xs text-slate-700 max-w-2xl mt-0.5">
                Authoritative multi-tier ecclesiastical platform manufacturing template. Integrates lifelong digital identity, sacramental SHA-256 registries, 17 ministry ERPs, canon law tribunals, IoT smart church telemetry, and 25+ autonomous AI pastoral agents.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 self-start md:self-center">
            <button
              onClick={() => setIsUampConfigOpen(!isUampConfigOpen)}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold shadow-lg shadow-purple-900/40 flex items-center gap-2 transition-all transform hover:scale-105"
            >
              <Sliders className="w-4 h-4 text-amber-700" />
              UAMP Denomination Template Switcher
            </button>

            <button
              onClick={() => setShowNewSacramentModal(true)}
              className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-lg shadow-emerald-900/40 flex items-center gap-2 transition-all transform hover:scale-105"
            >
              <Plus className="w-4 h-4" />
              Register Sacrament
            </button>
          </div>
        </div>

        {/* UAMP DENOMINATION CONFIGURATION DRAWER */}
        {isUampConfigOpen && (
          <div className="max-w-7xl mx-auto mt-6 p-6 rounded-2xl bg-white/90 border border-indigo-500/40 backdrop-blur-xl animate-in fade-in slide-in-from-top-4 duration-300 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-400" />
                <h3 className="text-base font-bold text-white">
                  Universal Application Manufacturing Platform (UAMP) — Denomination Template Wizard
                </h3>
              </div>
              <button
                onClick={() => setIsUampConfigOpen(false)}
                className="text-xs text-slate-600 hover:text-white underline"
              >
                Close Template Switcher
              </button>
            </div>

            <p className="text-xs text-slate-700 mb-4">
              Selecting a denomination automatically reconfigures the 12-tier governance hierarchy, liturgical calendars, vestment terminology, sacramental approval workflows, and canon law tribunal rules without requiring any source code modifications.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
              {(
                [
                  'Anglican / Episcopal',
                  'Roman Catholic',
                  'Orthodox',
                  'Pentecostal / Charismatic',
                  'Seventh-Day Adventist',
                  'Methodist / Wesleyan',
                  'Reformed / Presbyterian',
                  'Baptist',
                  'Independent / Non-Denominational'
                ] as DenominationType[]
              ).map((denom) => (
                <button
                  key={denom}
                  onClick={() => {
                    setDenomination(denom);
                    if (denom === 'Roman Catholic') {
                      setGovernanceHierarchy(['Holy See (Vatican)', 'Dicastery / Curia', 'Archdiocese', 'Diocese', 'Vicariate / Deanery', 'Parish', 'Sub-Parish / Outstation', 'Basic Ecclesial Community (BEC)', 'Family / Household']);
                    } else if (denom === 'Pentecostal / Charismatic') {
                      setGovernanceHierarchy(['Apostolic Overseer / Founder', 'National Executive Board', 'Regional Apostolic Hub', 'Zone / District', 'Local Assembly / Church', 'Home Cell / Care Group', 'Ministry Department']);
                    } else if (denom === 'Seventh-Day Adventist') {
                      setGovernanceHierarchy(['General Conference', 'Division', 'Union Conference', 'Local Conference / Mission', 'District', 'Local Church', 'Sabbath School Class']);
                    } else {
                      setGovernanceHierarchy(['Global Church', 'National Church', 'Province', 'Diocese', 'Archdeaconry', 'Deanery', 'Parish', 'Local Church / Chapel', 'Small Christian Community', 'Cell Group']);
                    }
                    setIsUampConfigOpen(false);
                  }}
                  className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all ${
                    denomination === denom
                      ? 'bg-indigo-600/30 border-indigo-400 text-white shadow-lg shadow-indigo-500/20'
                      : 'bg-white/50 border-slate-200/60 text-slate-700 hover:bg-white hover:text-white'
                  }`}
                >
                  <span className="text-xs font-bold flex items-center justify-between">
                    {denom}
                    {denomination === denom && <Check className="w-4 h-4 text-emerald-400" />}
                  </span>
                  <span className="text-[10px] text-slate-600 mt-2 line-clamp-1">
                    Auto-configures hierarchy & liturgy
                  </span>
                </button>
              ))}
            </div>

            <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600">
              <span>Current Active Governance Layers ({governanceHierarchy.length}):</span>
              <div className="flex flex-wrap gap-1.5 max-w-3xl justify-end">
                {governanceHierarchy.map((layer, idx) => (
                  <span key={idx} className="px-2 py-0.5 rounded bg-white text-indigo-300 border border-slate-200 text-[10px] font-semibold">
                    {idx + 1}. {layer}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* 2. MASTER NAV BAR FOR 12 ENTERPRISE DOS PORTALS */}
      <nav className="bg-white border-b border-slate-200 px-6 overflow-x-auto shadow-inner">
        <div className="max-w-7xl mx-auto flex items-center gap-1 py-1">
          {[
            { id: 'identity_sacraments', label: '1. Identity & Sacraments', icon: Award },
            { id: 'member_app', label: '2. Member Super App', icon: Smartphone },
            { id: 'leadership_app', label: '3. Leadership App', icon: Terminal },
            { id: 'registration_engine', label: '4. Onboarding Engine', icon: UserPlus },
            { id: 'church_ai', label: '5. Church AI Assistant', icon: Bot },
            { id: 'communication_hub', label: '6. Communication Hub', icon: Send },
            { id: 'suggestion_intelligence', label: '7. Community Intelligence', icon: Activity },
            { id: 'virtual_service', label: '8. Virtual Service & Media', icon: Tv },
            { id: 'document_trust', label: '9. Digital Document Trust', icon: ShieldCheck },
            { id: 'knowledge_management', label: '10. Knowledge Management', icon: BookOpen },
            { id: 'event_experience', label: '11. Event & Experience', icon: Calendar },
            { id: 'volunteer_talent', label: '12. Volunteer & Talent', icon: Users },
            { id: 'social_impact', label: '13. Social Impact', icon: Heart },
            { id: 'digital_giving', label: '14. Digital Stewardship', icon: DollarSign },
            { id: 'geographic_intelligence', label: '15. Geographic Intelligence', icon: MapPin },
            { id: 'digital_governance', label: '16. Digital Governance', icon: Shield },
            { id: 'marketplace_exchange', label: '17. Marketplace & Exchange', icon: Globe },
            { id: 'ai_command', label: '18. AI Command Integration', icon: Cpu }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activePortal === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActivePortal(tab.id as any)}
                className={`px-3.5 py-3 rounded-t-xl text-xs font-semibold flex items-center gap-2 border-b-2 transition-all whitespace-nowrap ${
                  isActive
                    ? 'border-indigo-400 text-white bg-white/90 shadow-md'
                    : 'border-transparent text-slate-600 hover:text-white hover:bg-white/40'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#0078D4]' : 'text-slate-500'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* 3. MAIN PORTAL CONTENT AREA */}
      <main className="flex-1 max-w-7xl mx-auto w-full p-6 space-y-6">
        
        {/* ========================================================================= */}
        {/* PORTAL 1: LIFELONG DIGITAL IDENTITY & SACRAMENTAL REGISTRY (FINAL #1, #2) */}
        {/* ========================================================================= */}
        {activePortal === 'identity_sacraments' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xl">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-4 mb-6">
                <div>
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <Award className="w-5 h-5 text-[#0078D4]" />
                    Permanent Sacramental Registry & Lifelong Digital Identity
                  </h2>
                  <p className="text-xs text-slate-600">
                    Tamper-proof ecclesiastical records secured with SHA-256 cryptographic seals, QR verification cards, and lifelong membership tracking from Baptism to Memorial services.
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      placeholder="Search certificate or member ID..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="bg-white border border-slate-200 rounded-xl pl-9 pr-4 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 w-64"
                    />
                  </div>
                  <button
                    onClick={() => setShowNewSacramentModal(true)}
                    className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-lg shadow-indigo-900/30"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    New Record
                  </button>
                </div>
              </div>

              {/* STATS BANNER */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
                <div className="p-4 rounded-xl bg-white border border-slate-200/80">
                  <div className="text-slate-600 text-xs font-medium flex items-center justify-between">
                    Total Sacraments Sealed <Award className="w-4 h-4 text-[#0078D4]" />
                  </div>
                  <div className="text-2xl font-black text-white mt-1">1,482,910</div>
                  <div className="text-[10px] text-emerald-400 mt-0.5 flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" /> 100% Cryptographic Hash Parity
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white border border-slate-200/80">
                  <div className="text-slate-600 text-xs font-medium flex items-center justify-between">
                    Active Lifelong Identities <Users className="w-4 h-4 text-purple-400" />
                  </div>
                  <div className="text-2xl font-black text-white mt-1">840,230</div>
                  <div className="text-[10px] text-purple-300 mt-0.5">Across 42 Dioceses & 1,180 Parishes</div>
                </div>

                <div className="p-4 rounded-xl bg-white border border-slate-200/80">
                  <div className="text-slate-600 text-xs font-medium flex items-center justify-between">
                    Holy Matrimonies (2026) <Heart className="w-4 h-4 text-pink-400" />
                  </div>
                  <div className="text-2xl font-black text-white mt-1">12,450</div>
                  <div className="text-[10px] text-pink-300 mt-0.5">Verified against Civil & Canon Law</div>
                </div>

                <div className="p-4 rounded-xl bg-white border border-slate-200/80">
                  <div className="text-slate-600 text-xs font-medium flex items-center justify-between">
                    Clergy Holy Orders <Cross className="w-4 h-4 text-amber-400" />
                  </div>
                  <div className="text-2xl font-black text-white mt-1">3,890</div>
                  <div className="text-[10px] text-amber-700 mt-0.5">Active Licensed Ministers & Bishops</div>
                </div>
              </div>

              {/* SACRAMENTAL LEDGER TABLE */}
              <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-[#0078D4]" />
                Permanent Cryptographic Sacramental Ledger (Immutable Books)
              </h3>
              <div className="overflow-x-auto border border-slate-200 rounded-xl bg-white">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-white/80 border-b border-slate-200 text-slate-600 text-xs uppercase font-bold">
                      <th className="p-3">Certificate No.</th>
                      <th className="p-3">Sacrament</th>
                      <th className="p-3">Member Name & ID</th>
                      <th className="p-3">Date & Parish</th>
                      <th className="p-3">Officiating Clergy</th>
                      <th className="p-3">SHA-256 Cryptographic Seal</th>
                      <th className="p-3 text-right">Verification</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-xs">
                    {(sacraments ?? []).map((sac) => (
                      <tr key={sac.id} className="hover:bg-white/50 transition-colors">
                        <td className="p-3 font-mono font-bold text-indigo-300">
                          {sac.certificateNumber}
                        </td>
                        <td className="p-3">
                          <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-semibold border border-indigo-500/30">
                            {sac.sacramentType}
                          </span>
                        </td>
                        <td className="p-3">
                          <div className="font-bold text-white">{sac.memberName}</div>
                          <div className="text-[10px] text-slate-600 font-mono">{sac.memberId}</div>
                        </td>
                        <td className="p-3">
                          <div className="text-slate-200">{sac.date}</div>
                          <div className="text-[10px] text-slate-600">{sac.parish}</div>
                        </td>
                        <td className="p-3 text-slate-700">
                          {sac.officiatingClergy}
                        </td>
                        <td className="p-3 font-mono text-[10px] text-emerald-400 truncate max-w-[150px]">
                          {sac.sha256Seal}
                        </td>
                        <td className="p-3 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-700 text-[10px] font-bold flex items-center gap-1">
                              <ShieldCheck className="w-3 h-3" /> Sealed
                            </span>
                            <button
                              onClick={() => alert(`QR CODE GENERATED FOR VERIFICATION URL:\n\n${sac.qrVerificationUrl}\n\nSHA-256 SEAL:\n${sac.sha256Seal}\n\nScan at any JUMO Church kiosk to verify sacramental authenticity.`)}
                              className="p-1.5 rounded bg-white hover:bg-slate-100 text-[#0078D4] hover:text-white transition-all"
                              title="Show QR Code Card"
                            >
                              <QrCode className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* LIFELONG DIGITAL IDENTITIES CARDS */}
              <h3 className="text-sm font-bold text-white mt-8 mb-3 flex items-center gap-2">
                <Users className="w-4 h-4 text-purple-400" />
                Featured Lifelong Digital Church Identities (With Passport Photo &amp; GPS Parish Mapping)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(identities ?? []).map((ident) => (
                  <div key={ident.id} className="p-5 rounded-2xl bg-white border border-slate-200/80 hover:border-indigo-500/40 transition-all flex flex-col justify-between">
                    <div>
                      <div className="flex items-start gap-4">
                        <img
                          src={ident.passportPhoto}
                          alt={ident.fullName}
                          className="w-16 h-16 rounded-xl object-cover border-2 border-indigo-500/40 shadow-sm"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 font-bold">
                              {ident.membershipNumber}
                            </span>
                            <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-700 font-bold">
                              {ident.status}
                            </span>
                          </div>
                          <h4 className="text-base font-bold text-white mt-1">{ident.fullName}</h4>
                          <p className="text-xs text-indigo-300 font-semibold">{ident.role} — Household: {ident.householdNumber}</p>
                          <p className="text-[10px] text-slate-600 mt-1 flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-slate-500" /> GPS: {ident.gpsCoordinates}
                          </p>
                        </div>
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-200/80 grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <span className="text-[10px] uppercase font-bold text-slate-500 block">Spiritual Gifts:</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {(ident.spiritualGifts ?? []).map((gift, idx) => (
                              <span key={idx} className="px-1.5 py-0.5 rounded bg-white text-slate-700 text-[10px] border border-slate-200">
                                {gift}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <span className="text-[10px] uppercase font-bold text-slate-500 block">Lifelong Sacraments:</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {(ident.lifelongSacraments ?? []).map((sac, idx) => (
                              <span key={idx} className="px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-300 text-[10px] border border-indigo-800/40">
                                {sac}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-200/80 flex items-center justify-between">
                      <span className="text-[10px] text-slate-600 font-mono">National ID: {ident.nationalId}</span>
                      <button
                        onClick={() => alert(`DISPLAYING LIFELONG DIGITAL CHURCH IDENTITY CARD\n\nName: ${ident.fullName}\nRole: ${ident.role}\nMembership No: ${ident.membershipNumber}\nSacrament History: ${ident.lifelongSacraments.join(', ')}\n\n*Authenticated by JUMO Zero-Trust Ecclesiastical Registry.*`)}
                        className="px-3 py-1 rounded-lg bg-white hover:bg-white text-indigo-300 text-xs font-bold border border-slate-200 flex items-center gap-1 transition-all"
                      >
                        <Eye className="w-3.5 h-3.5" /> View Digital ID Card
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* PORTAL 2: EVANGELISM & MISSION FIELD MANAGEMENT (PHASE II #13) */}
        {/* ========================================================================= */}
        {activePortal === 'evangelism_missions' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xl">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-4 mb-6">
                <div>
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <Globe className="w-5 h-5 text-emerald-400" />
                    Evangelism & Mission Field Management (Phase II #13)
                  </h2>
                  <p className="text-xs text-slate-600">
                    Mission field registry, church planting lifecycle, crusade planning, prison/hospital/campus chaplaincies, and direct FAAP mission budget clearing sweeps.
                  </p>
                </div>
                <button
                  onClick={() => alert('Launching Church Planting & Crusade Planning Wizard...')}
                  className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-lg shadow-emerald-900/30"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Register Mission Station
                </button>
              </div>

              {/* MINISTRY SPECIALIZATIONS GRID */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 mb-6">
                {[
                  { name: 'Prison Ministry', count: '14 Hubs', icon: Lock, color: 'text-amber-400' },
                  { name: 'Hospital Chaplaincy', count: '38 Wards', icon: Heart, color: 'text-pink-400' },
                  { name: 'Campus Discipleship', count: '22 Unis', icon: GraduationCap, color: 'text-[#0078D4]' },
                  { name: 'Youth & Teens', count: '14,200 Youth', icon: Users, color: 'text-[#0078D4]' },
                  { name: 'Women Ministry', count: 'Mothers Union', icon: Heart, color: 'text-purple-400' },
                  { name: 'Marketplace Outreach', count: '85 Guilds', icon: Briefcase, color: 'text-emerald-400' }
                ].map((min, idx) => {
                  const MIcon = min.icon;
                  return (
                    <div key={idx} className="p-3 rounded-xl bg-white border border-slate-200/80 flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-white border border-slate-200">
                        <MIcon className={`w-4 h-4 ${min.color}`} />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white">{min.name}</div>
                        <div className="text-[10px] text-slate-600 font-semibold">{min.count}</div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* MISSION FIELDS TABLE */}
              <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                <Compass className="w-4 h-4 text-emerald-400" />
                Active Mission Stations & Church Planting Outposts
              </h3>
              <div className="overflow-x-auto border border-slate-200 rounded-xl bg-white">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-white/80 border-b border-slate-200 text-slate-600 text-xs uppercase font-bold">
                      <th className="p-3">Mission ID & Name</th>
                      <th className="p-3">Region & Outpost</th>
                      <th className="p-3">Category</th>
                      <th className="p-3">Lead Missionary</th>
                      <th className="p-3">Converts / Planted</th>
                      <th className="p-3">Budget & FAAP Clearing</th>
                      <th className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-xs">
                    {missions.map((mis) => (
                      <tr key={mis.id} className="hover:bg-white/50 transition-colors">
                        <td className="p-3 font-bold text-white">
                          <div>{mis.missionName}</div>
                          <div className="text-[10px] text-slate-600 font-mono">{mis.id}</div>
                        </td>
                        <td className="p-3 text-slate-700">{mis.region}</td>
                        <td className="p-3">
                          <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-700 font-semibold border border-emerald-200">
                            {mis.category}
                          </span>
                        </td>
                        <td className="p-3 font-semibold text-indigo-300">{mis.leadMissionary}</td>
                        <td className="p-3 font-black text-white">
                          {mis.convertsCount.toLocaleString()} Souls
                          <div className="text-[10px] text-emerald-400">{mis.status}</div>
                        </td>
                        <td className="p-3">
                          <div className="font-bold text-white">${mis.budgetAllocated.toLocaleString()}</div>
                          <div className="text-[10px] text-amber-700 flex items-center gap-1">
                            <ShieldCheck className="w-3 h-3 text-emerald-400" /> {mis.faapClearingStatus}
                          </div>
                        </td>
                        <td className="p-3 text-right">
                          <button
                            onClick={() => alert(`MISSION STATION REPORT: ${mis.missionName}\n\nLead: ${mis.leadMissionary}\nConverts Logged: ${mis.convertsCount}\nBudget Allocated: $${mis.budgetAllocated}\n\n*Mission data synchronized with Provincial Evangelism Board.*`)}
                            className="px-2.5 py-1 rounded bg-white hover:bg-slate-100 text-slate-200 text-xs font-semibold"
                          >
                            View Impact Analytics
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* PORTAL 3: THEOLOGY LMS & CHRISTIAN DISCIPLESHIP (PHASE II #14) */}
        {/* ========================================================================= */}
        {activePortal === 'education_discipleship' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xl">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-4 mb-6">
                <div>
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-purple-400" />
                    Christian Education, Discipleship & Seminary LMS (Phase II #14)
                  </h2>
                  <p className="text-xs text-slate-600">
                    Sunday School management, Catechism & Confirmation classes, Clergy Continuous Professional Development (CPD), digital library, e-books, and course accreditation.
                  </p>
                </div>
                <button
                  onClick={() => alert('Opening Theological Course Accreditation & Sermon Archive Upload...')}
                  className="px-3.5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-lg shadow-purple-900/30"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Create Course / LMS Module
                </button>
              </div>

              {/* LMS MODULES CARDS */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {[
                  {
                    title: 'Clergy Continuous Professional Dev (CPD)',
                    level: 'Post-Ordination Seminary Extension',
                    students: '1,420 Active Clergy',
                    modules: '12 Accredited Units',
                    status: 'Mandatory Diocesan Requirement',
                    color: 'from-purple-900/50 to-indigo-900/50 border-purple-500/30'
                  },
                  {
                    title: 'Anglican Catechism & Confirmation Prep',
                    level: 'Youth & New Believers Discipleship',
                    students: '24,500 Catechumens',
                    modules: '36 Weeks Curriculum',
                    status: 'Integrated with Parish Registries',
                    color: 'from-indigo-900/50 to-blue-900/50 border-indigo-500/30'
                  },
                  {
                    title: 'Lay Reader & Evangelist Licensing Course',
                    level: 'Parish Leadership Certification',
                    students: '3,890 Lay Preachers',
                    modules: '8 Core Theology Books',
                    status: 'Bishop Licensing Track',
                    color: 'from-emerald-900/50 to-teal-900/50 border-emerald-200'
                  }
                ].map((lms, idx) => (
                  <div key={idx} className={`p-5 rounded-2xl bg-gradient-to-br ${lms.color} border flex flex-col justify-between shadow-lg`}>
                    <div>
                      <span className="px-2 py-0.5 rounded bg-white/80 text-white text-[10px] font-bold">
                        {lms.level}
                      </span>
                      <h4 className="text-base font-bold text-white mt-2">{lms.title}</h4>
                      <p className="text-xs text-slate-700 mt-1">{lms.status}</p>
                    </div>

                    <div className="mt-6 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-slate-200">
                      <span className="font-bold">{lms.students}</span>
                      <span className="font-semibold px-2 py-0.5 rounded bg-white/60">{lms.modules}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* DIGITAL LIBRARY / SERMON ARCHIVE */}
              <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                <Archive className="w-4 h-4 text-purple-400" />
                Church Digital Library & Sermon Repository (E-Books & Recorded Liturgy)
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { title: 'The Book of Common Prayer (1662 & Modern)', author: 'Liturgical Commission', type: 'E-Book / Liturgy', downloads: '142k' },
                  { title: 'Expository Preaching in the African Context', author: 'Most Rev. Dr. John Stott & Scholars', type: 'Seminary Manual', downloads: '88k' },
                  { title: 'Diocesan Financial Regulations & Canon Law', author: 'Provincial Secretariat', type: 'Governance Act', downloads: '45k' },
                  { title: 'Audio Sermon Archive: Revival & Jubilee', author: 'Archbishop Festo Kivengere Memorial', type: 'Audio / Video MP3', downloads: '310k' }
                ].map((lib, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-white border border-slate-200 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-purple-400 uppercase">{lib.type}</span>
                      <h5 className="text-xs font-bold text-white mt-1 line-clamp-2">{lib.title}</h5>
                      <p className="text-[10px] text-slate-600 mt-0.5">{lib.author}</p>
                    </div>
                    <div className="mt-3 pt-2 border-t border-slate-200 flex items-center justify-between">
                      <span className="text-[10px] text-slate-500">{lib.downloads} Downloads</span>
                      <button
                        onClick={() => alert(`DOWNLOADING DIGITAL RESOURCE:\n\n${lib.title}\nAuthor: ${lib.author}\n\n*Securely retrieved from JUMO Church Digital Library.*`)}
                        className="text-[#0078D4] hover:text-white text-xs font-bold flex items-center gap-1"
                      >
                        <Download className="w-3 h-3" /> Access
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* PORTAL 4: MEDIA, RADIO & DIGITAL MINISTRY (PHASE II #15) */}
        {/* ========================================================================= */}
        {activePortal === 'media_digital' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xl">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-4 mb-6">
                <div>
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <Tv className="w-5 h-5 text-[#0078D4]" />
                    Church Media, Radio & Digital Ministry Production Hub (Phase II #15)
                  </h2>
                  <p className="text-xs text-slate-600">
                    Live streaming multi-camera control, church radio/TV broadcast management, podcast publishing, sermon video archive, and AI-assisted pastoral newsletter generation.
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => alert('BROADCAST ALERT: Live multi-camera RTMP stream initiated to YouTube, Facebook, and Church PWA.')}
                    className="px-3.5 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-lg shadow-red-900/30 animate-pulse"
                  >
                    <Radio className="w-3.5 h-3.5" />
                    Go Live Now (RTMP Stream)
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-4">
                  <div className="p-4 rounded-2xl bg-white border border-slate-200">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-bold text-white flex items-center gap-2">
                        <Video className="w-4 h-4 text-[#0078D4]" /> Active Multi-Camera Cathedral Broadcast Feed
                      </span>
                      <span className="px-2 py-0.5 rounded bg-red-500/20 text-red-400 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" /> Live: 14,890 Viewers
                      </span>
                    </div>
                    <div className="aspect-video rounded-xl bg-gradient-to-br from-slate-900 to-indigo-950 border border-slate-200 flex flex-col items-center justify-center relative overflow-hidden shadow-inner">
                      <Tv className="w-16 h-16 text-indigo-500/40 mb-2 animate-bounce" />
                      <p className="text-sm font-bold text-white">St. Paul Cathedral 10:00 AM Holy Communion Service</p>
                      <p className="text-xs text-indigo-300 mt-1">Sermon: The Jubilee Restoration — Most Rev. Dr. Kaziimba</p>
                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[10px] text-slate-700 bg-white/80 backdrop-blur px-3 py-1.5 rounded-lg border border-slate-200">
                        <span>Cam 1 (Pulpit) | Cam 2 (Altar) | Cam 3 (Choir) | Cam 4 (Congregation Wide)</span>
                        <span className="text-emerald-400 font-bold">1080p60 6.5 Mbps HD</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-3">
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-amber-400" />
                      AI Pastoral Newsletter & Bulletin Generator
                    </h4>
                    <p className="text-xs text-slate-600">
                      Automatically summarizes Sunday sermons, synthesizes weekly parish announcements, and formats print-ready PDF bulletins or WhatsApp messages.
                    </p>
                    <button
                      onClick={() => alert('AI NEWSLETTER GENERATOR:\n\nGenerated "The Namirembe Weekly Bulletin - Vol 42".\nIncluded Sermon Notes, Tithe Report, Youth Camp Dates, and Daily Lectionary Readings.\n\n*Distributed to 18,400 registered WhatsApp members via JUMO Notification Engine.*')}
                      className="w-full py-2 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white text-xs font-bold shadow-lg shadow-amber-900/30 flex items-center justify-center gap-2 transition-all"
                    >
                      <Send className="w-3.5 h-3.5" />
                      Generate Weekly Bulletin
                    </button>
                  </div>

                  <div className="p-4 rounded-xl bg-white border border-slate-200">
                    <span className="text-xs font-bold text-white block mb-2">Podcast & Radio Syndication Hub</span>
                    <div className="space-y-2 text-xs">
                      <div className="flex items-center justify-between p-2 rounded bg-white border border-slate-200">
                        <span className="text-slate-700">Apple Podcasts / Spotify</span>
                        <span className="text-emerald-400 font-bold">Auto-Sync ON</span>
                      </div>
                      <div className="flex items-center justify-between p-2 rounded bg-white border border-slate-200">
                        <span className="text-slate-700">Diocesan FM Radio 93.4</span>
                        <span className="text-emerald-400 font-bold">Broadcasting</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* PORTAL 5: PROCUREMENT & SUPPLY CHAIN (PHASE II #16) */}
        {/* ========================================================================= */}
        {activePortal === 'procurement_supply' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xl">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-4 mb-6">
                <div>
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-amber-400" />
                    Church Procurement, Tender Management & Supply Chain (Phase II #16)
                  </h2>
                  <p className="text-xs text-slate-600">
                    Supplier registration, purchase requisitions, tender evaluation, Goods Received Notes (GRN), warehouse inventory control, and dual-signature budget approvals.
                  </p>
                </div>
                <button
                  onClick={() => alert('Opening Tender Advertisement & Supplier Pre-qualification Registry...')}
                  className="px-3.5 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-lg shadow-amber-900/30"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Publish New Tender
                </button>
              </div>

              {/* TENDER & PURCHASE ORDERS TABLE */}
              <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                <FileText className="w-4 h-4 text-amber-400" />
                Active Purchase Orders & Diocesan Tenders
              </h3>
              <div className="overflow-x-auto border border-slate-200 rounded-xl bg-white">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-white/80 border-b border-slate-200 text-slate-600 text-xs uppercase font-bold">
                      <th className="p-3">Tender / PO Number</th>
                      <th className="p-3">Item Description</th>
                      <th className="p-3">Supplier / Contractor</th>
                      <th className="p-3">Value (USD)</th>
                      <th className="p-3">Approval Stage</th>
                      <th className="p-3">GRN Status</th>
                      <th className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-xs">
                    {[
                      { po: 'PO-2026-9011', item: 'Cathedral Acoustic Line Array Sound System & Mixing Console', vendor: 'Yamaha Pro Audio East Africa Ltd', val: '$32,500', stage: 'Approved by Diocesan Board of Finance', grn: 'Delivered & Tested' },
                      { po: 'PO-2026-9012', item: '50,000 Copies Anglican Revised Hymn Books & Liturgy Manuals', vendor: 'Uganda Christian University Press', val: '$18,000', stage: 'Pending Dual Signature (Bishop & Treasurer)', grn: 'In Transit' },
                      { po: 'TND-2026-004', item: 'Construction of 4-Story Diocesan Pension Commercial Arcade', vendor: 'Roko Construction Consortium', val: '$1,450,000', stage: 'Tender Evaluation Stage', grn: 'N/A (Project Stage)' }
                    ].map((row, idx) => (
                      <tr key={idx} className="hover:bg-white/50 transition-colors">
                        <td className="p-3 font-mono font-bold text-amber-700">{row.po}</td>
                        <td className="p-3 font-bold text-white">{row.item}</td>
                        <td className="p-3 text-slate-700">{row.vendor}</td>
                        <td className="p-3 font-black text-white">{row.val}</td>
                        <td className="p-3">
                          <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-semibold border border-indigo-500/30">
                            {row.stage}
                          </span>
                        </td>
                        <td className="p-3 text-emerald-400 font-bold">{row.grn}</td>
                        <td className="p-3 text-right">
                          <button
                            onClick={() => alert(`PROCUREMENT DETAILS: ${row.po}\nItem: ${row.item}\nVendor: ${row.vendor}\nValue: ${row.val}\n\n*GRN & Invoice matched against FAAP General Ledger.*`)}
                            className="px-2.5 py-1 rounded bg-white hover:bg-slate-100 text-slate-200 text-xs font-semibold"
                          >
                            Inspect GRN
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* PORTAL 6: PROJECTS, DEVELOPMENT & SOCIAL WELFARE (PHASE II #17, #18) */}
        {/* ========================================================================= */}
        {activePortal === 'projects_welfare' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xl">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-4 mb-6">
                <div>
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <Heart className="w-5 h-5 text-pink-400" />
                    Church Projects, GIS Mapping & Social Welfare (Phase II #17, #18)
                  </h2>
                  <p className="text-xs text-slate-600">
                    Construction/mission projects with GIS mapping, donor milestone tracking, orphan/widow scholarship support, emergency disaster relief, and food distribution.
                  </p>
                </div>
                <button
                  onClick={() => alert('Registering new Community Development Project & Beneficiary Roster...')}
                  className="px-3.5 py-2 rounded-xl bg-pink-600 hover:bg-pink-500 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-lg shadow-pink-900/30"
                >
                  <Plus className="w-3.5 h-3.5" />
                  New Project / Relief Fund
                </button>
              </div>

              {/* WELFARE & RELIEF METRICS */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
                <div className="p-4 rounded-xl bg-white border border-slate-200">
                  <div className="text-slate-600 text-xs font-medium">Orphans Supported (Scholarships)</div>
                  <div className="text-2xl font-black text-white mt-1">4,850 Children</div>
                  <div className="text-[10px] text-pink-400 mt-0.5">Full Tuition & Medical Cover</div>
                </div>
                <div className="p-4 rounded-xl bg-white border border-slate-200">
                  <div className="text-slate-600 text-xs font-medium">Widows & Vulnerable Families</div>
                  <div className="text-2xl font-black text-white mt-1">2,140 Families</div>
                  <div className="text-[10px] text-purple-400 mt-0.5">Monthly Food & Capital Grants</div>
                </div>
                <div className="p-4 rounded-xl bg-white border border-slate-200">
                  <div className="text-slate-600 text-xs font-medium">Active Construction Projects</div>
                  <div className="text-2xl font-black text-white mt-1">64 Projects</div>
                  <div className="text-[10px] text-emerald-400 mt-0.5">Churches, Schools & Hospitals</div>
                </div>
                <div className="p-4 rounded-xl bg-white border border-slate-200">
                  <div className="text-slate-600 text-xs font-medium">Disaster Relief Reserve Fund</div>
                  <div className="text-2xl font-black text-white mt-1">$450,000</div>
                  <div className="text-[10px] text-amber-400 mt-0.5">FAAP Emergency Treasury Account</div>
                </div>
              </div>

              {/* PROJECT MILESTONES & GIS MAPPING */}
              <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-400" />
                Featured Capital Development & Community Relief Projects
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { name: 'St. Luke Diocesan Specialized Mission Hospital Construction', location: 'Gulu Diocese (0.7788° N, 32.2990° E)', budget: '$2,500,000', donor: 'USAID & Global Church Partners', completion: 75, status: 'Roofing & Electrical Phase' },
                  { name: 'Karamoja Emergency Drought Food Relief & Borehole Drilling', location: 'Karamoja Region (2.5333° N, 34.6667° E)', budget: '$180,000', donor: 'Provincial Emergency Appeal Fund', completion: 92, status: '12 Solar Boreholes Operational' }
                ].map((proj, idx) => (
                  <div key={idx} className="p-5 rounded-2xl bg-white border border-slate-200 space-y-3">
                    <div className="flex items-start justify-between">
                      <span className="text-xs font-bold text-white">{proj.name}</span>
                      <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-700 font-bold text-[10px]">{proj.status}</span>
                    </div>
                    <p className="text-[10px] text-slate-600 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-slate-500" /> GIS Coordinates: {proj.location}
                    </p>
                    <div className="flex items-center justify-between text-xs text-slate-700">
                      <span>Budget: <strong className="text-white">{proj.budget}</strong></span>
                      <span>Donor: <strong className="text-indigo-300">{proj.donor}</strong></span>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px] text-slate-600 font-bold">
                        <span>Milestone Completion</span>
                        <span>{proj.completion}%</span>
                      </div>
                      <div className="w-full h-2 bg-white rounded-full overflow-hidden border border-slate-200">
                        <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-400" style={{ width: `${proj.completion}%` }} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* PORTAL 7: PROVINCIAL/DIOCESAN GOVERNANCE & CANON LAW (PHASE III #23, #24) */}
        {/* ========================================================================= */}
        {activePortal === 'governance_law' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xl">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-4 mb-6">
                <div>
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-[#0078D4]" />
                    12-Tier Ecclesiastical Governance, Canon Law & Tribunals (Phase III #23, #24)
                  </h2>
                  <p className="text-xs text-slate-600">
                    House of Bishops, Provincial Assembly, Synod resolutions, Canon Law library, ecclesiastical marriage tribunals, clergy discipline, and legal opinions.
                  </p>
                </div>
                <button
                  onClick={() => alert('Opening Diocesan Chancellor Legal Opinion & Tribunal Docket...')}
                  className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-lg shadow-indigo-900/30"
                >
                  <Plus className="w-3.5 h-3.5" />
                  File Tribunal Case / Resolution
                </button>
              </div>

              {/* 12-TIER GOVERNANCE HIERARCHY MAP */}
              <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#0078D4]" />
                Active Denomination Hierarchy: <span className="text-indigo-300">{denomination}</span>
              </h3>
              <div className="p-4 rounded-xl bg-white border border-slate-200 flex flex-wrap gap-2 items-center mb-6">
                {governanceHierarchy.map((layer, idx) => (
                  <React.Fragment key={idx}>
                    <div className="px-3 py-1.5 rounded-lg bg-indigo-50 border border-indigo-500/40 text-indigo-200 text-xs font-bold flex items-center gap-1.5">
                      <span className="w-5 h-5 rounded-full bg-indigo-600 text-white text-[10px] flex items-center justify-center font-black">
                        {idx + 1}
                      </span>
                      {layer}
                    </div>
                    {idx < governanceHierarchy.length - 1 && (
                      <ChevronRight className="w-4 h-4 text-slate-600" />
                    )}
                  </React.Fragment>
                ))}
              </div>

              {/* CANON LAW TRIBUNAL CASES & SYNOD RESOLUTIONS */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-4">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <FileText className="w-4 h-4 text-amber-400" />
                    Recent House of Bishops & Synod Resolutions
                  </h4>
                  <div className="space-y-3">
                    {[
                      { id: 'RES-PROV-2026-09', title: 'Adoption of Revised Provincial Pension Scheme for Retired Clergy', date: 'July 2026', status: 'Signed & Gazetted by Archbishop' },
                      { id: 'RES-SYN-2026-14', title: 'Mandatory 1.5% FAAP Digital Tithe Settlement Clearing Protocol', date: 'June 2026', status: 'Unanimous Synod Enactment' }
                    ].map((res, idx) => (
                      <div key={idx} className="p-3 rounded-xl bg-white border border-slate-200">
                        <div className="flex justify-between items-center text-[10px] text-amber-400 font-mono font-bold">
                          <span>{res.id}</span>
                          <span className="text-emerald-400">{res.status}</span>
                        </div>
                        <div className="text-xs font-bold text-white mt-1">{res.title}</div>
                        <div className="text-[10px] text-slate-600 mt-0.5">Enacted: {res.date}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-4">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4 text-red-400" />
                    Ecclesiastical Tribunals & Legal Case Management
                  </h4>
                  <div className="space-y-3">
                    {[
                      { caseId: 'TRB-MAT-2026-03', title: 'Petition for Nullity of Holy Matrimony (Canon 18)', party: 'Parish of St. Jude vs. Petitioner', status: 'Under Review by Diocesan Chancellor' },
                      { caseId: 'TRB-DIS-2026-01', title: 'Clergy Discipline & Unauthorized Property Lease Inquiry', party: 'Diocesan Trustees vs. Incumbent', status: 'Injunction Issued — Refer to AI Canon Advisor' }
                    ].map((trb, idx) => (
                      <div key={idx} className="p-3 rounded-xl bg-white border border-slate-200">
                        <div className="flex justify-between items-center text-[10px] text-red-400 font-mono font-bold">
                          <span>{trb.caseId}</span>
                          <span className="text-amber-700">{trb.status}</span>
                        </div>
                        <div className="text-xs font-bold text-white mt-1">{trb.title}</div>
                        <div className="text-[10px] text-slate-600 mt-0.5">Parties: {trb.party}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* PORTAL 8: HR, ELECTIONS & PROPERTY REGISTRY GIS (PHASE III #25, #27, #28) */}
        {/* ========================================================================= */}
        {activePortal === 'hr_elections_property' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xl">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-4 mb-6">
                <div>
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-purple-400" />
                    Clergy/Lay HR, Synod Elections & Property Registry GIS (Phase III #25, #27, #28)
                  </h2>
                  <p className="text-xs text-slate-600">
                    Ordination tracking, clergy deployment/pension, secure electronic synod voting with audit trail, and GIS land title deed registry for cathedrals and schools.
                  </p>
                </div>
                <button
                  onClick={() => alert('Opening Synod Election Nomination & Electronic Ballot Security Console...')}
                  className="px-3.5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-lg shadow-purple-900/30"
                >
                  <Award className="w-3.5 h-3.5" />
                  Launch Election Ballot
                </button>
              </div>

              {/* THREE COLUMN GRID: HR, ELECTIONS, PROPERTY */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* CLERGY HR */}
                <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-3">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <Users className="w-4 h-4 text-purple-400" /> Clergy & Lay Staff HR
                  </h4>
                  <p className="text-xs text-slate-600">
                    Tracks ordination dates, active preaching licenses, parish deployment transfers, medical insurance, housing stipends, and retirement pension funds.
                  </p>
                  <div className="p-3 rounded-xl bg-white border border-slate-200 text-xs space-y-1">
                    <div className="flex justify-between font-bold text-white">
                      <span>Licensed Clergy:</span> <span className="text-purple-400">3,890 Ministers</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>Due for Transfer (3-Yr Rule):</span> <span>142 Priests</span>
                    </div>
                    <div className="flex justify-between text-emerald-400 font-bold">
                      <span>Pension Fund Parity:</span> <span>100% Funded</span>
                    </div>
                  </div>
                </div>

                {/* SYNOD ELECTIONS */}
                <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-3">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <Award className="w-4 h-4 text-amber-400" /> Enterprise Church Elections
                  </h4>
                  <p className="text-xs text-slate-600">
                    Secure electronic and physical ballot voting for Parish Councils, Diocesan Synods, House of Bishops, and Archbishop elections with SHA-256 audit trail.
                  </p>
                  <div className="p-3 rounded-xl bg-white border border-slate-200 text-xs space-y-1">
                    <div className="flex justify-between font-bold text-white">
                      <span>Active Election:</span> <span className="text-amber-400">Kampala Synod Lay Reps</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>Voters Registered:</span> <span>450 Delegates</span>
                    </div>
                    <div className="flex justify-between text-emerald-400 font-bold">
                      <span>Electronic Security:</span> <span>SHA-256 Verified</span>
                    </div>
                  </div>
                </div>

                {/* PROPERTY REGISTRY GIS */}
                <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-3">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-emerald-400" /> Property Registry & Land Deeds
                  </h4>
                  <p className="text-xs text-slate-600">
                    GIS mapping and title deed repository for cathedrals, parish churches, mission schools, hospitals, agricultural farmland, and commercial investment arcades.
                  </p>
                  <div className="p-3 rounded-xl bg-white border border-slate-200 text-xs space-y-1">
                    <div className="flex justify-between font-bold text-white">
                      <span>Total Real Estate Assets:</span> <span className="text-emerald-400">4,120 Properties</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>Digitized Title Deeds:</span> <span>3,890 Valid Titles</span>
                    </div>
                    <div className="flex justify-between text-indigo-300 font-bold">
                      <span>Valuation Estimate:</span> <span>$1.85 Billion USD</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* PORTAL 9: COMPLETE FINANCIAL ERP & FAAP ENGINE (PHASE III #26, FINAL #5) */}
        {/* ========================================================================= */}
        {activePortal === 'faap_finance' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xl">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-4 mb-6">
                <div>
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-emerald-400" />
                    Complete Church Financial ERP & FAAP Settlement Backbone (Phase III #26, Final #5)
                  </h2>
                  <p className="text-xs text-slate-600">
                    General Ledger, AP/AR, Fixed Assets, Multi-Currency Treasury, Trust Funds, Endowments, and direct 1.5% JUMO FAAP automated settlement clearing sweeps across all parishes.
                  </p>
                </div>
                <button
                  onClick={() => alert('FAAP SWEEP SIMULATION:\n\nTriggered automated 1.5% settlement clearing sweep across 1,180 Parish M-Pesa accounts.\n\nTotal Gross Tithes & Offerings: $1,450,000.00\nJUMO FAAP Clearing Fee (1.5%): $21,750.00\nNet Remitted to Diocesan Treasury: $1,428,250.00\n\n*Double-entry balance parity verified with $0.00 offset!*')}
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold shadow-lg shadow-emerald-900/40 flex items-center gap-2 transition-all transform hover:scale-105"
                >
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Execute FAAP 1.5% Clearing Sweep
                </button>
              </div>

              {/* FINANCIAL LEDGER METRICS */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
                <div className="p-4 rounded-xl bg-white border border-slate-200">
                  <div className="text-slate-600 text-xs font-medium">Consolidated Provincial Revenue</div>
                  <div className="text-2xl font-black text-white mt-1">$42,500,000</div>
                  <div className="text-[10px] text-emerald-400 mt-0.5">Tithes, Offerings & School Fees</div>
                </div>
                <div className="p-4 rounded-xl bg-white border border-slate-200">
                  <div className="text-slate-600 text-xs font-medium">Diocesan Trust & Endowment Funds</div>
                  <div className="text-2xl font-black text-white mt-1">$18,400,000</div>
                  <div className="text-[10px] text-[#0078D4] mt-0.5">Invested in Treasury Bills & Real Estate</div>
                </div>
                <div className="p-4 rounded-xl bg-white border border-slate-200">
                  <div className="text-slate-600 text-xs font-medium">JUMO FAAP 1.5% Clearing Sweeps</div>
                  <div className="text-2xl font-black text-white mt-1">$637,500</div>
                  <div className="text-[10px] text-amber-400 mt-0.5">Automated Platform Clearing Revenue</div>
                </div>
                <div className="p-4 rounded-xl bg-white border border-slate-200">
                  <div className="text-slate-600 text-xs font-medium">Double-Entry Ledger Integrity</div>
                  <div className="text-2xl font-black text-white mt-1">$0.00 Offset</div>
                  <div className="text-[10px] text-emerald-400 mt-0.5">100% Mathematical Parity Guaranteed</div>
                </div>
              </div>

              {/* ACCOUNTS BREAKDOWN */}
              <div className="p-5 rounded-2xl bg-white border border-slate-200">
                <h4 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                  <Banknote className="w-4 h-4 text-emerald-400" />
                  FAAP Multi-Currency Treasury & Account Ledger Overview
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  <div className="p-3 rounded-xl bg-white border border-slate-200">
                    <span className="text-slate-600 block font-bold">1000 - General Operating Account (Tithes)</span>
                    <span className="text-lg font-black text-white mt-1 block">$14,250,900.00 USD</span>
                    <span className="text-[10px] text-emerald-400">Integrated with M-Pesa Paybill & Bank API</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white border border-slate-200">
                    <span className="text-slate-600 block font-bold">2000 - Cathedral Construction Reserve Fund</span>
                    <span className="text-lg font-black text-white mt-1 block">$8,120,450.00 USD</span>
                    <span className="text-[10px] text-[#0078D4]">Restricted Capital Expenditure Account</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white border border-slate-200">
                    <span className="text-slate-600 block font-bold">3000 - Clergy Pension & Welfare Endowment</span>
                    <span className="text-lg font-black text-white mt-1 block">$20,128,650.00 USD</span>
                    <span className="text-[10px] text-purple-400">Managed by Diocesan Board of Trustees</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* PORTAL 10: MUSEUM, ARCHIVES & BUSINESS INTELLIGENCE (PHASE III #29, #30) */}
        {/* ========================================================================= */}
        {activePortal === 'museum_bi' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xl">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-4 mb-6">
                <div>
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <Archive className="w-5 h-5 text-amber-400" />
                    Church Digital Museum, Archives & Business Intelligence (Phase III #29, #30)
                  </h2>
                  <p className="text-xs text-slate-600">
                    AI-powered search across centuries of parish histories, bishop biographies, and rare liturgical manuscripts paired with real-time Executive KPI Dashboards.
                  </p>
                </div>
                <button
                  onClick={() => alert('Launching AI Archival Manuscript OCR & Historical Restoration Engine...')}
                  className="px-3.5 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-lg shadow-amber-900/30"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  AI OCR Manuscript Restoration
                </button>
              </div>

              {/* MUSEUM EXHIBITIONS & BI DASHBOARDS */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-4">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <Archive className="w-4 h-4 text-amber-400" /> Featured Digital Museum Exhibitions
                  </h4>
                  <div className="space-y-3">
                    {[
                      { title: 'The Uganda Martyrs (1885–1887) — Historical Letters & Relics', items: '42 Digitized Manuscripts', status: 'AI Preserved & Indexed' },
                      { title: 'Centennial History of St. Paul Cathedral Namirembe (1919–2019)', items: '1,200 Photographs & Blueprints', status: 'Available for Virtual Tour' },
                      { title: 'Archbishop Janani Luwum Memorial Collection (1922–1977)', items: 'Sermon Audio & Episcopal Rings', status: 'Permanent Provincial Exhibition' }
                    ].map((exh, idx) => (
                      <div key={idx} className="p-3 rounded-xl bg-white border border-slate-200 flex justify-between items-center text-xs">
                        <div>
                          <div className="font-bold text-white">{exh.title}</div>
                          <div className="text-[10px] text-amber-700">{exh.items}</div>
                        </div>
                        <span className="px-2 py-1 rounded bg-amber-500/20 text-amber-700 text-[10px] font-bold">
                          {exh.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-4">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-[#0078D4]" /> Executive Business Intelligence Trends
                  </h4>
                  <div className="space-y-3 text-xs">
                    <div className="p-3 rounded-xl bg-white border border-slate-200 flex justify-between items-center">
                      <span>10-Year Parish Attendance Growth Rate</span>
                      <span className="text-emerald-400 font-bold">+18.4% YoY Average</span>
                    </div>
                    <div className="p-3 rounded-xl bg-white border border-slate-200 flex justify-between items-center">
                      <span>Digital Tithe Adoption via Mobile Money / QR</span>
                      <span className="text-[#0078D4] font-bold">74.2% of All Receipts</span>
                    </div>
                    <div className="p-3 rounded-xl bg-white border border-slate-200 flex justify-between items-center">
                      <span>AI Predictive 5-Year Membership Forecasting</span>
                      <span className="text-purple-400 font-bold">Projected 1.8M Communicants</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* PORTAL 11: JUMO AI CHURCH INTELLIGENCE (PHASE III #31, FINAL #10) */}
        {/* ========================================================================= */}
        {activePortal === 'ai_intelligence' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xl">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-4 mb-6">
                <div>
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <Bot className="w-5 h-5 text-[#0078D4]" />
                    JUMO AI Church Intelligence Command Center (Phase III #31, Final #10)
                  </h2>
                  <p className="text-xs text-slate-600">
                    25+ specialized AI pastoral agents operating under JUMO UEOS AI Command Center: Canon Law, Theology, Sermon Research, Financial Auditing, Safeguarding, and Translation.
                  </p>
                </div>
                <button
                  onClick={() => alert('AI SWARM SYNCHRONIZATION: All 25+ Church AI agents synchronized with Gemini 2.5 Pro reasoning engine and local parish RAG vector archives.')}
                  className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-lg shadow-indigo-900/30"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  Sync All 25+ Agents
                </button>
              </div>

              {/* SPECIALIZED AI AGENTS GRID */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {aiAgents.map((agent) => (
                  <div key={agent.id} className="p-5 rounded-2xl bg-white border border-slate-200/80 hover:border-indigo-500/40 transition-all flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-bold">
                          {agent.category}
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-700 font-bold flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                          {agent.status}
                        </span>
                      </div>
                      <h4 className="text-base font-bold text-white mt-2 flex items-center gap-2">
                        <Bot className="w-4 h-4 text-[#0078D4]" /> {agent.name}
                      </h4>
                      <p className="text-xs text-slate-700 mt-1">{agent.description}</p>
                      <div className="mt-3 p-2.5 rounded-xl bg-white border border-slate-200 text-[11px] text-slate-700 italic font-mono">
                        "Prompt: {agent.lastQuery}"
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-200/80 flex items-center justify-between">
                      <span className="text-[10px] text-slate-500 font-mono">{agent.model}</span>
                      <button
                        onClick={() => triggerAiAgent(agent)}
                        className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-md"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                        Execute AI Copilot
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* PORTAL 12: SMART IOT, ZERO-TRUST SECURITY & HYBRID DEPLOY (PHASE II #20-22) */}
        {/* ========================================================================= */}
        {activePortal === 'smart_iot_uamp' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xl">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-4 mb-6">
                <div>
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <Wifi className="w-5 h-5 text-[#0078D4]" />
                    Smart Church IoT, Zero-Trust Security & Hybrid Deployment (Phases II #20-22)
                  </h2>
                  <p className="text-xs text-slate-600">
                    QR/NFC attendance kiosks, CCTV security feeds, SHA-256 zero-trust dual-signature gates, and offline parish synchronization with JUMO UEOS Cloud.
                  </p>
                </div>
                <button
                  onClick={() => alert('OFFLINE PARISH SYNC:\n\nSynchronizing local SQLite parish cache with JUMO Cloud PostgreSQL & FAAP Master Ledger...\n\nSync complete! 42 new tithe records and 14 sacramental registries uploaded.')}
                  className="px-3.5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-lg shadow-cyan-900/30"
                >
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  Trigger Offline Parish Sync
                </button>
              </div>

              {/* THREE COLUMN GRID: IOT, SECURITY, HYBRID */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* SMART IOT */}
                <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-3">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <Wifi className="w-4 h-4 text-[#0078D4]" /> Smart Church & IoT Kiosks
                  </h4>
                  <p className="text-xs text-slate-600">
                    NFC membership tap-in cards, smart offering kiosks with instant M-Pesa QR scanning, CCTV altar feeds, and automated environmental solar energy monitoring.
                  </p>
                  <div className="p-3 rounded-xl bg-white border border-slate-200 text-xs space-y-1">
                    <div className="flex justify-between font-bold text-white">
                      <span>Smart Kiosks Active:</span> <span className="text-[#0078D4]">140 Terminals</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>Today's QR Check-ins:</span> <span>18,450 Members</span>
                    </div>
                    <div className="flex justify-between text-emerald-400 font-bold">
                      <span>Solar Energy Grid:</span> <span>94% Battery Reserve</span>
                    </div>
                  </div>
                </div>

                {/* ZERO TRUST SECURITY */}
                <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-3">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" /> Enterprise Zero-Trust Security
                  </h4>
                  <p className="text-xs text-slate-600">
                    Biometric MFA logins for finance officers, SHA-256 cryptographic hashes for every sacramental certificate, insider threat monitoring, and automated DLP backups.
                  </p>
                  <div className="p-3 rounded-xl bg-white border border-slate-200 text-xs space-y-1">
                    <div className="flex justify-between font-bold text-white">
                      <span>Zero-Trust Status:</span> <span className="text-emerald-400">Enforced</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>MFA Compliance:</span> <span>100% of Admin Roles</span>
                    </div>
                    <div className="flex justify-between text-purple-400 font-bold">
                      <span>SHA-256 Hash Vault:</span> <span>Sealed & Immutable</span>
                    </div>
                  </div>
                </div>

                {/* HYBRID DEPLOYMENT */}
                <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-3">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <HardDrive className="w-4 h-4 text-[#0078D4]" /> Hybrid Deployment Matrix
                  </h4>
                  <p className="text-xs text-slate-600">
                    Supports Web, Android APK, iOS, Progressive Web App (PWA), and offline parish local cache synchronization. Centrally managed by JUMO UEOS Control Center.
                  </p>
                  <div className="p-3 rounded-xl bg-white border border-slate-200 text-xs space-y-1">
                    <div className="flex justify-between font-bold text-white">
                      <span>Cloud Multi-Region:</span> <span className="text-[#0078D4]">EU-West & Africa-East</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>Offline Parish Clients:</span> <span>480 Remote Parishes</span>
                    </div>
                    <div className="flex justify-between text-emerald-400 font-bold">
                      <span>JUMO Control Center:</span> <span>Connected (Ping: 12ms)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ========================================================================= */}
      {/* MODAL 1: REGISTER NEW SACRAMENTAL RECORD WITH SHA-256 CRYPTOGRAPHIC SEAL */}
      {/* ========================================================================= */}
      {showNewSacramentModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white border border-indigo-500/50 rounded-2xl max-w-2xl w-full p-6 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Award className="w-5 h-5 text-[#0078D4]" />
                Register & Cryptographically Seal New Sacramental Record
              </h3>
              <button
                onClick={() => setShowNewSacramentModal(false)}
                className="text-slate-600 hover:text-white text-xs"
              >
                Close
              </button>
            </div>

            <form onSubmit={handleCreateSacrament} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Sacrament Type</label>
                  <select className="w-full bg-white border border-slate-200 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-indigo-500">
                    <option>Baptism</option>
                    <option>Confirmation</option>
                    <option>First Holy Communion</option>
                    <option>Holy Matrimony</option>
                    <option>Holy Orders (Ordination)</option>
                    <option>Clergy Licensing</option>
                    <option>Funeral / Memorial Service</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Date Administered</label>
                  <input
                    type="date"
                    defaultValue={new Date().toISOString().split('T')[0]}
                    className="w-full bg-white border border-slate-200 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Member Full Name</label>
                  <input
                    type="text"
                    placeholder="e.g., Sarah Nakato"
                    required
                    className="w-full bg-white border border-slate-200 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Member ID / National ID</label>
                  <input
                    type="text"
                    placeholder="e.g., MEM-UG-9912"
                    required
                    className="w-full bg-white border border-slate-200 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Parish Name</label>
                  <input
                    type="text"
                    defaultValue="St. John Parish"
                    className="w-full bg-white border border-slate-200 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Officiating Clergy / Bishop</label>
                  <input
                    type="text"
                    defaultValue="Rt. Rev. Dr. Hannington Mutebi"
                    className="w-full bg-white border border-slate-200 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="p-3 rounded-xl bg-indigo-50 border border-indigo-500/30 text-xs text-indigo-300 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#0078D4] shrink-0" />
                <span>
                  Upon submission, the JUMO Zero-Trust Engine will generate an immutable SHA-256 cryptographic seal and a permanent QR verification code for this record.
                </span>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setShowNewSacramentModal(false)}
                  className="px-4 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-700 text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-lg shadow-indigo-900/40 flex items-center gap-1.5"
                >
                  <ShieldCheck className="w-4 h-4" />
                  Seal & Save Sacrament
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 2: INTERACTIVE AI COPILOT REASONING DRAWER */}
      {/* ========================================================================= */}
      {showAiCopilotModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white border border-indigo-500/50 rounded-2xl max-w-3xl w-full p-6 shadow-2xl relative flex flex-col max-h-[85vh]">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-4">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Bot className="w-5 h-5 text-[#0078D4]" />
                  {activeAiAgent?.name || 'JUMO Church AI Copilot'}
                </h3>
                <p className="text-[10px] text-indigo-300 font-mono">
                  Model: {activeAiAgent?.model} | Category: {activeAiAgent?.category}
                </p>
              </div>
              <button
                onClick={() => setShowAiCopilotModal(false)}
                className="text-slate-600 hover:text-white text-xs"
              >
                Close Copilot
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-1">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1.5">
                  Enter Pastoral, Canon Law, or Financial Query:
                </label>
                <textarea
                  rows={3}
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
                  placeholder="Ask for canon law rulings, sermon exegesis, FAAP audit scans, or youth discipleship curricula..."
                  className="w-full bg-white border border-slate-200 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 font-mono"
                />
              </div>

              <div className="flex justify-end">
                <button
                  onClick={executeAiGeneration}
                  disabled={isGeneratingAi || !aiPrompt}
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 disabled:opacity-50 text-white text-xs font-bold shadow-lg shadow-indigo-900/40 flex items-center gap-2"
                >
                  {isGeneratingAi ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      Synthesizing Ecclesiastical RAG Vector Index...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-amber-700" />
                      Generate Reasoning Response
                    </>
                  )}
                </button>
              </div>

              {aiResponse && (
                <div className="p-4 rounded-2xl bg-white border border-indigo-500/30 space-y-2 animate-in fade-in duration-300">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                    <span className="text-[11px] font-bold text-indigo-300 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                      AI Copilot Synthesized Response (Gemini 2.5 Pro)
                    </span>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(aiResponse);
                        alert('Copied AI report to clipboard!');
                      }}
                      className="text-[10px] text-slate-600 hover:text-white underline"
                    >
                      Copy to Clipboard
                    </button>
                  </div>
                  <div className="text-xs text-slate-200 whitespace-pre-line leading-relaxed font-sans">
                    {aiResponse}
                  </div>
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-[10px] text-slate-600">
              <span>Grounding: Provincial Constitutions, Canon Law Library & FAAP Ledger</span>
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" /> Zero-Trust Access Verified
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChurchEnterpriseDOSMaster;
