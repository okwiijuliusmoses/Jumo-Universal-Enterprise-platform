import {
  DollarSign,
  GraduationCap,
  Church,
  Sliders,
  Database,
  Users,
  BarChart2,
  Shield,
  Code,
  Zap,
  Landmark,
  CreditCard,
  BookOpen,
  Package,
  Activity,
  ArrowRight,
  Clipboard,
  Send,
  CheckCircle2,
  TrendingUp,
  Layers,
  Building2,
  Globe,
  Lock,
  Sparkles,
  Settings,
  LayoutGrid,
  FileText,
  RefreshCw,
  Smartphone,
  FileSpreadsheet,
  Heart,
  Calendar,
  HeartPulse,
  Cloud,
  ShieldCheck,
  Award,
  Briefcase,
  Baby
} from 'lucide-react';
import { DynamicNavigationGenerator } from '../core/enterprise/navigation/DynamicNavigationGenerator';

export interface ApprovedProductNavigationItem {
  id: string;
  label: string;
  icon: any;
  category: string;
}

export interface ApprovedProductAiCapability {
  agentId: string;
  name: string;
  description: string;
  modelAlias: string;
}

export interface ApprovedProductDefinition {
  id: string;
  code: string;
  name: string;
  badge: string;
  description: string;
  category: string;
  version: string;
  owner: string;
  tenantAvailability: string;
  route: string;
  icon: any;
  iconName: string;
  color: string;
  bgAccent: string;
  borderAccent: string;
  accentColor: string;
  accentHover: string;
  monthlyPrice: number;
  navigationRegistry: ApprovedProductNavigationItem[];
  aiCapabilityMapping: ApprovedProductAiCapability[];
  modules: string[];
  offices?: string[];
  portals?: string[];
  apis: string[];
}

export const ApprovedProductRegistry: ApprovedProductDefinition[] = [
  // 1. JUMO FINTECH
  {
    id: 'JUMO-FINTECH',
    code: 'JUMO-FINTECH-01',
    name: 'JUMO FINTECH',
    badge: 'FINTECH SOVEREIGN',
    description: 'Unified financial technology operating system. Houses independent installable financial families including FAAP General Ledger, Payment Switching, Mobile Money, Lending, Digital Wallets, FX, and Microfinance.',
    category: 'Authoritative JUMO Products',
    version: 'v16.2.0',
    owner: 'JUMO Sovereign Ledger & Payments Authority',
    tenantAvailability: 'Global Shared Kernel',
    route: '/products/fintech',
    icon: DollarSign,
    iconName: 'DollarSign',
    color: 'text-emerald-600',
    bgAccent: 'bg-emerald-600',
    borderAccent: 'border-emerald-200',
    accentColor: 'text-emerald-600',
    accentHover: 'hover:bg-emerald-50 hover:text-emerald-700',
    monthlyPrice: 599,
    // Dynamic navigation generated from MasterModuleRegistry
    get navigationRegistry() {
      try {
        return DynamicNavigationGenerator.generateFlatNavigation('JUMO-FINTECH');
      } catch (e) {
        return [{ id: 'home', label: 'Home & Overview', icon: DollarSign, category: 'Overview' }];
      }
    },
    aiCapabilityMapping: [
      { agentId: 'AGENT_FIN_AUDITOR', name: 'Financial Swarm Auditor', description: 'Real-time double-entry parity checks and automated anomaly detection.', modelAlias: 'gemini-2.5-pro' },
      { agentId: 'AGENT_CREDIT_RISK', name: 'Credit Risk Copilot', description: 'Underwrites microfinance and SACCO loans using predictive scoring.', modelAlias: 'gemini-2.5-flash' },
      { agentId: 'AGENT_PAY_RECON', name: 'Payments Reconciliation Agent', description: 'Automated settlement matching for payment switches and mobile money.', modelAlias: 'gemini-2.5-pro' }
    ],
    modules: [
      'General Ledger & FAAP', 'Tax & Revenue Orchestration', 'Universal Payment Switch', 'Mobile Money Core (v12)', 'Payment Gateway & Links',
      'Institutional Collections (PRN)', 'Bulk Payouts', 'Digital Wallets & Stored Value', 'Agent Banking (Float Admin)', 'Microfinance JLG Lending',
      'SACCO Core (Shares/Savings)', 'FX & Treasury Clearing', 'Digital Asset Settlement (Stablecoin)', 'Open Banking APIs', 'Compliance & AML'
    ],
    offices: ['Executive Treasury Office', 'Payments Switching Office', 'Digital Wallets Office', 'Lending & Credit Operations Office', 'Compliance & AML Office', 'Agent Banking Office'],
    portals: ['Executive CFO Portal', 'Treasury & FX Portal', 'Payments & Switch Portal', 'Lending & Credit Portal', 'Compliance & Risk Portal', 'Agent Operations Portal'],
    apis: ['POST /api/v1/ledger/post', 'POST /api/v1/payments/initiate', 'GET /api/v1/ledger/parity', 'POST /api/v1/wallets/create']
  },

  // 2. JUMO NURSERY & PRIMARY SCHOOL ERP
  {
    id: 'JUMO-NURSERY-PRIMARY-ERP',
    code: 'JUMO-EDU-01',
    name: 'JUMO NURSERY & PRIMARY ERP',
    badge: 'BASIC EDUCATION',
    description: 'Consolidated early childhood and primary school operating system. Features a shared core for identity, finance, and admissions, with specialized academic divisions for ECD/Nursery and Primary P.1-P.7.',
    category: 'Authoritative JUMO Products',
    version: 'v16.2.0',
    owner: 'JUMO Basic Education Authority',
    tenantAvailability: 'Multi-Tenant Isolated',
    route: '/products/nursery-primary',
    icon: GraduationCap,
    iconName: 'GraduationCap',
    color: 'text-blue-600',
    bgAccent: 'bg-blue-600',
    borderAccent: 'border-blue-200',
    accentColor: 'text-blue-600',
    accentHover: 'hover:bg-blue-50 hover:text-blue-700',
    monthlyPrice: 499,
    // Dynamic navigation generated from MasterModuleRegistry
    get navigationRegistry() {
      try {
        return DynamicNavigationGenerator.generateFlatNavigation('JUMO-NURSERY-PRIMARY-ERP');
      } catch (e) {
        return [{ id: 'home', label: 'Home & Overview', icon: GraduationCap, category: 'Overview' }];
      }
    },
    aiCapabilityMapping: [
      { agentId: 'AGENT_ECD_DEVELOPMENT', name: 'ECD Development Copilot', description: 'Monitors early childhood developmental milestones and nutrition intake.', modelAlias: 'gemini-2.5-flash' },
      { agentId: 'AGENT_PLE_ANALYTICS', name: 'PLE Performance Predictor', description: 'Analyzes upper-primary mock exam trends to predict UNEB PLE aggregates.', modelAlias: 'gemini-2.5-pro' },
      { agentId: 'AGENT_EDU_AUDITOR', name: 'School Finance Auditor', description: 'Reconciles fee collections against student enrolment and FAAP ledger.', modelAlias: 'gemini-2.5-pro' }
    ],
    modules: [
      'Executive Governance', 'Admissions & SIS', 'FAAP School Finance', 'ECD/Nursery Academics', 'Primary P.1-P.7 Academics',
      'National Exams (PLE)', 'School Health & Sick Bay', 'Transport & Fleet', 'Catering & Nutrition', 'Staff HR & Payroll'
    ],
    offices: ['Headteacher Executive Office', 'Bursar & FAAP Finance Office', 'ECD & Early Childhood Office', 'Primary Academic Directorate Office', 'Admissions & Registrar Office', 'Transport & Facilities Office'],
    portals: ['Headteacher Executive Portal', 'Bursar & FAAP Portal', 'ECD Learning Portal', 'Primary Academic Portal', 'Admissions Portal', 'Transport & Facilities Portal'],
    apis: ['POST /api/v1/education/admit', 'GET /api/v1/education/students', 'POST /api/v1/education/fees/invoice']
  },

  // 3. JUMO SECONDARY SCHOOL ERP
  {
    id: 'JUMO-SECONDARY-ERP',
    code: 'JUMO-SEC-01',
    name: 'JUMO SECONDARY SCHOOL ERP',
    badge: 'SECONDARY EDUCATION',
    description: 'Sovereign secondary and high school operating system. Manages Principal governance, O-Level & A-Level subject combinations, center administration, science laboratories, boarding facilities, and secondary bursar finance.',
    category: 'Authoritative JUMO Products',
    version: 'v16.2.0',
    owner: 'JUMO Secondary & High School Academic Authority',
    tenantAvailability: 'Multi-Tenant Isolated',
    route: '/products/secondary',
    icon: GraduationCap,
    iconName: 'GraduationCap',
    color: 'text-indigo-600',
    bgAccent: 'bg-indigo-600',
    borderAccent: 'border-indigo-200',
    accentColor: 'text-indigo-600',
    accentHover: 'hover:bg-indigo-50 hover:text-indigo-700',
    monthlyPrice: 499,
    // Dynamic navigation generated from MasterModuleRegistry
    get navigationRegistry() {
      try {
        return DynamicNavigationGenerator.generateFlatNavigation('JUMO-SECONDARY-ERP');
      } catch (e) {
        return [{ id: 'home', label: 'Home & Overview', icon: GraduationCap, category: 'Overview' }];
      }
    },
    aiCapabilityMapping: [
      { agentId: 'AGENT_UNEB_ANALYTICS', name: 'UNEB Results Copilot', description: 'Generates official NCDC / UNEB grade transcripts and subject combination checks.', modelAlias: 'gemini-2.5-pro' },
      { agentId: 'AGENT_SEC_SCHEDULER', name: 'Timetable Optimizer', description: 'AI-driven master timetable generation for complex subject combinations.', modelAlias: 'gemini-2.5-flash' }
    ],
    modules: [
      'Senate & Governance', 'Registrar & SIS', 'O & A Level Subject Combinations', 'UNEB National Center',
      'Science Laboratories', 'Boarding & Facilities', 'Secondary Bursar FAAP', 'E-Library Catalog'
    ],
    offices: ['Head Teacher Executive Office', 'Director of Studies (DOS) Office', 'Bursar & Finance Office', 'UNEB Exam Office', 'Boarding & Student Welfare Office', 'HR & Staff Office'],
    portals: ['Head Teacher Portal', 'DOS Academic Portal', 'Bursar Portal', 'UNEB Exams Portal', 'Boarding Welfare Portal', 'HR & Staff Portal'],
    apis: ['POST /api/v1/secondary/students/register', 'GET /api/v1/secondary/uneb/candidates', 'POST /api/v1/secondary/transcripts/generate']
  },

  // 4. JUMO ALUMNI ASSOCIATION ERP
  {
    id: 'JUMO-ALUMNI',
    code: 'JUMO-ALUM-01',
    name: 'JUMO ALUMNI ASSOCIATION ERP',
    badge: 'ADVANCEMENT SOVEREIGN',
    description: 'Independent institutional advancement and alumni network platform. Coordinates graduate censuses, global alumni chapters, capital campaigns, endowments, and career mentorship.',
    category: 'Authoritative JUMO Products',
    version: 'v14.0.0',
    owner: 'JUMO Institutional Advancement Authority',
    tenantAvailability: 'Multi-Tenant Isolated',
    route: '/products/alumni',
    icon: Award,
    iconName: 'Award',
    color: 'text-rose-600',
    bgAccent: 'bg-rose-600',
    borderAccent: 'border-rose-200',
    accentColor: 'text-rose-600',
    accentHover: 'hover:bg-rose-50 hover:text-rose-700',
    monthlyPrice: 399,
    // Dynamic navigation generated from MasterModuleRegistry
    get navigationRegistry() {
      try {
        return DynamicNavigationGenerator.generateFlatNavigation('JUMO-ALUMNI');
      } catch (e) {
        return [{ id: 'home', label: 'Home & Overview', icon: Award, category: 'Overview' }];
      }
    },
    aiCapabilityMapping: [
      { agentId: 'AGENT_MENTORSHIP', name: 'Mentorship Matching Copilot', description: 'Pairs graduating students with established alumni in industry.', modelAlias: 'gemini-2.5-flash' },
      { agentId: 'AGENT_DONOR_PROPENSITY', name: 'Endowment Propensity Engine', description: 'Predicts high-impact donor readiness for major capital campaigns.', modelAlias: 'gemini-2.5-pro' },
      { agentId: 'AGENT_ALUM_ENGAGEMENT', name: 'Sentiment Analysis Agent', description: 'Monitors global chapter engagement levels and reunion turnout predictors.', modelAlias: 'gemini-2.5-flash' }
    ],
    modules: [
      'Graduate Registry & Census', 'Global Regional Chapters', 'Endowment & Capital Campaigns',
      'Mentorship & Career Portal', 'Reunion & Event Management', 'Institutional Advancement Governance'
    ],
    offices: ['Advancement Executive Office', 'Alumni Census & Records Office', 'Global Chapters Office', 'Capital Campaigns & Endowment Office', 'Career & Mentorship Office'],
    portals: ['Advancement Executive Portal', 'Alumni Census Portal', 'Global Chapters Portal', 'Endowment & Donor Portal', 'Career & Mentorship Portal'],
    apis: ['GET /api/alumni/directory', 'POST /api/alumni/donations', 'POST /api/alumni/chapters/join', 'POST /api/alumni/mentorship/match']
  },

  // 5. JUMO CHURCH ERP
  {
    id: 'JUMO-CHURCH',
    code: 'JUMO-CH-01',
    name: 'JUMO CHURCH ERP',
    badge: 'ECCLESIASTICAL SOVEREIGN',
    description: 'Sovereign diocese, parish, and ministry operating system. Coordinates diocesan synods, parish registers, sacramental records, clergy management, tithes, pastoral care, and church projects.',
    category: 'Authoritative JUMO Products',
    version: 'v14.5.0',
    owner: 'JUMO Ecclesiastical & Diocesan Authority',
    tenantAvailability: 'Multi-Tenant Isolated',
    route: '/products/church',
    icon: Church,
    iconName: 'Church',
    color: 'text-purple-600',
    bgAccent: 'bg-purple-600',
    borderAccent: 'border-purple-200',
    accentColor: 'text-purple-600',
    accentHover: 'hover:bg-purple-50 hover:text-purple-700',
    monthlyPrice: 349,
    // Dynamic navigation generated from MasterModuleRegistry
    get navigationRegistry() {
      try {
        return DynamicNavigationGenerator.generateFlatNavigation('JUMO-CHURCH');
      } catch (e) {
        return [{ id: 'home', label: 'Home & Overview', icon: Church, category: 'Overview' }];
      }
    },
    aiCapabilityMapping: [
      { agentId: 'AGENT_PASTORAL_CARE', name: 'Pastoral Care Copilot', description: 'Identifies parishioner wellness triggers, hospital visit needs, and bereavement support.', modelAlias: 'gemini-2.5-flash' },
      { agentId: 'AGENT_STEWARDSHIP_AUDITOR', name: 'Tithe Stewardship Auditor', description: 'Validates diocesan parish remittances and general ledger postings.', modelAlias: 'gemini-2.5-pro' },
      { agentId: 'AGENT_HOMILY_INSIGHT', name: 'Theological Semantic Indexer', description: 'Indexes sermon transcripts for doctrinal consistency and archival retrieval.', modelAlias: 'gemini-2.5-pro' }
    ],
    modules: [
      'Diocesan Governance & Synod', 'Parish Administration', 'Sacramental Registers',
      'Clergy & Vocations Management', 'Church Finance (FAAP Tithe Ledger)', 'Property & Asset Registry'
    ],
    offices: ['Diocesan Bishop & Synod Executive Office', 'Parish Administration Office', 'Sacramental Registers Office', 'Pastoral Care & Clergy Office', 'Church Finance & FAAP Office'],
    portals: ['Synod Executive Portal', 'Parish Admin Portal', 'Sacraments Portal', 'Pastoral Care Portal', 'Church Finance Portal'],
    apis: ['GET /api/church/parishes', 'POST /api/church/sacraments/register', 'POST /api/church/tithes/post', 'GET /api/church/clergy']
  },

  // 6. PLATFORM STORE & SOVEREIGN CONTROL
  {
    id: 'JUMO-CONTROL',
    code: 'JUMO-CTRL-04',
    name: 'Sovereign Control Center',
    badge: 'SOVEREIGN CORE',
    description: 'Central administrative command for tenants, cloud infrastructure, AI gateways, security policies, and platform store extensions.',
    category: 'Control & Infrastructure',
    version: 'v18.0.0',
    owner: 'JUMO Sovereign Operations',
    tenantAvailability: 'Global Shared Kernel',
    route: '/control-center',
    icon: Sliders,
    iconName: 'Sliders',
    color: 'text-indigo-600',
    bgAccent: 'bg-indigo-600',
    borderAccent: 'border-indigo-200',
    accentColor: 'text-indigo-600',
    accentHover: 'hover:bg-indigo-50 hover:text-indigo-700',
    monthlyPrice: 0,
    // Dynamic navigation generated from MasterModuleRegistry
    get navigationRegistry() {
      try {
        return DynamicNavigationGenerator.generateFlatNavigation('JUMO-CONTROL');
      } catch (e) {
        return [{ id: 'home', label: 'Home & Overview', icon: Sliders, category: 'Overview' }];
      }
    },
    aiCapabilityMapping: [
      { agentId: 'AGENT_SOV_GOVERNOR', name: 'Sovereign Governor Agent', description: 'Monitors cluster node health and enforces zero-trust access control.', modelAlias: 'gemini-2.5-pro' }
    ],
    modules: ['Platform Store', 'AEGIS Security', 'AI Gateway', 'Cloud Console', 'Diagnostics'],
    offices: ['Sovereign Owner Control Office', 'Cloud Infrastructure Operations Office', 'Security & AEGIS Command Office', 'AI Gateway & Workforce Office'],
    portals: ['Platform Store Portal', 'AEGIS Security Portal', 'AI Command Center Portal', 'Cloud Infrastructure Portal', 'Diagnostics & Telemetry Portal'],
    apis: ['GET /api/control/health', 'POST /api/control/config']
  }
];

export const WaffleAppsList = [
  { name: 'JUMO FINTECH', route: '/products/fintech', icon: DollarSign, color: 'text-emerald-700 bg-emerald-50', productId: 'JUMO-FINTECH' },
  { name: 'JUMO NURSERY & PRIMARY ERP', route: '/products/nursery-primary', icon: GraduationCap, color: 'text-blue-700 bg-blue-50', productId: 'JUMO-NURSERY-PRIMARY-ERP' },
  { name: 'JUMO SECONDARY ERP', route: '/products/secondary', icon: GraduationCap, color: 'text-indigo-700 bg-indigo-50', productId: 'JUMO-SECONDARY-ERP' },
  { name: 'JUMO ALUMNI ERP', route: '/products/alumni', icon: Award, color: 'text-rose-700 bg-rose-50', productId: 'JUMO-ALUMNI' },
  { name: 'JUMO CHURCH ERP', route: '/products/church', icon: Church, color: 'text-purple-700 bg-purple-50', productId: 'JUMO-CHURCH' },
  { name: 'Sovereign Control Center', route: '/control-center', icon: Sliders, color: 'text-indigo-700 bg-indigo-50', productId: 'JUMO-CONTROL' }
];

export function getApprovedProduct(idOrAlias?: string): ApprovedProductDefinition {
  const registry = ApprovedProductRegistry || [];
  if (registry.length === 0) {
    // Return a valid mock fallback definition if called during bootstrapping before registry finishes loading
    return {
      id: 'JUMO-FINTECH',
      code: 'JUMO-FINTECH-01',
      name: 'JUMO FINTECH',
      badge: 'FINTECH SOVEREIGN',
      description: 'Unified financial technology operating system.',
      category: 'Authoritative JUMO Products',
      version: 'v16.2.0',
      owner: 'JUMO Sovereign Ledger & Payments Authority',
      tenantAvailability: 'Global Shared Kernel',
      route: '/products/fintech',
      icon: DollarSign,
      iconName: 'DollarSign',
      color: 'text-emerald-600',
      bgAccent: 'bg-emerald-600',
      borderAccent: 'border-emerald-200',
      accentColor: 'text-emerald-600',
      accentHover: 'hover:bg-emerald-50 hover:text-emerald-700',
      monthlyPrice: 599,
      navigationRegistry: [{ id: 'home', label: 'Home & Overview', icon: DollarSign, category: 'Overview' }],
      aiCapabilityMapping: [],
      modules: [],
      apis: []
    };
  }

  if (!idOrAlias) return registry[0];
  const upper = idOrAlias.toUpperCase();
  const lower = idOrAlias.toLowerCase();

  const found = registry.find(p =>
    p && p.id && (
      p.id.toUpperCase() === upper ||
      p.code.toUpperCase() === upper ||
      p.name.toUpperCase().includes(upper) ||
      (lower.includes('fintech') && p.id === 'JUMO-FINTECH') ||
      (lower.includes('finance') && p.id === 'JUMO-FINTECH') ||
      (lower.includes('pay') && p.id === 'JUMO-FINTECH') ||
      (lower.includes('faap') && p.id === 'JUMO-FINTECH') ||
      (lower.includes('alumni') && p.id === 'JUMO-ALUMNI') ||
      (lower.includes('nursery') && p.id === 'JUMO-NURSERY-PRIMARY-ERP') ||
      (lower.includes('primary') && p.id === 'JUMO-NURSERY-PRIMARY-ERP') ||
      (lower.includes('secondary') && p.id === 'JUMO-SECONDARY-ERP') ||
      (lower.includes('church') && p.id === 'JUMO-CHURCH') ||
      (lower.includes('diocese') && p.id === 'JUMO-CHURCH') ||
      (lower.includes('parish') && p.id === 'JUMO-CHURCH') ||
      (lower.includes('control') && p.id === 'JUMO-CONTROL') ||
      (lower.includes('admin') && p.id === 'JUMO-CONTROL')
    )
  );

  return found || registry[0];
}

export function mapPlatformIdToApprovedKey(platformId?: string): 'fintech' | 'nursery-primary' | 'secondary' | 'alumni' | 'church' | 'control' {
  if (!platformId) return 'fintech';
  const lower = platformId.toLowerCase();
  if (lower.includes('alumni')) return 'alumni';
  if (lower.includes('nursery') || lower.includes('primary')) return 'nursery-primary';
  if (lower.includes('secondary')) return 'secondary';
  if (lower.includes('church') || lower.includes('diocese') || lower.includes('parish')) return 'church';
  if (lower.includes('control') || lower.includes('admin') || lower.includes('store') || lower.includes('owner')) return 'control';
  return 'fintech';
}
