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
  Heart,
  Calendar,
  HeartPulse,
  Cloud,
  ShieldCheck,
  Award,
  Briefcase,
  Baby
} from 'lucide-react';

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
    navigationRegistry: [
      { id: 'overview', label: 'Fintech Overview', icon: BarChart2, category: 'Overview' },
      { id: 'modules_store', label: 'Financial Family Manager', icon: Package, category: 'Overview' },
      { id: 'ledger', label: 'General Ledger & FAAP', icon: Landmark, category: 'Accounting & Ledger' },
      { id: 'tax-revenue', label: 'Tax & Revenue Management', icon: Clipboard, category: 'Accounting & Ledger' },
      { id: 'payments', label: 'Payment Switching', icon: Zap, category: 'Payments' },
      { id: 'mobile-money', label: 'Mobile Money Core', icon: Activity, category: 'Payments' },
      { id: 'payment-gateway', label: 'Payment Gateway & Checkout', icon: CreditCard, category: 'Payments' },
      { id: 'collections', label: 'Collections & PRN Engine', icon: ArrowRight, category: 'Payments' },
      { id: 'payouts', label: 'Bulk Disbursements', icon: Send, category: 'Payments' },
      { id: 'merchant-services', label: 'Merchant QR & POS', icon: Building2, category: 'Payments' },
      { id: 'digital-wallets', label: 'Digital Wallets & Balances', icon: CreditCard, category: 'Banking & Wallets' },
      { id: 'agent-banking', label: 'Agent Banking Network', icon: Users, category: 'Banking & Wallets' },
      { id: 'digital-banking', label: 'Core Digital Banking', icon: Landmark, category: 'Banking & Wallets' },
      { id: 'multi-currency', label: 'Multi-Currency Accounts', icon: Globe, category: 'Banking & Wallets' },
      { id: 'savings', label: 'Savings & Deposits', icon: Landmark, category: 'Banking & Wallets' },
      { id: 'cards', label: 'Cards Issuing', icon: CreditCard, category: 'Banking & Wallets' },
      { id: 'microfinance', label: 'Microfinance & JLG', icon: Layers, category: 'Lending & Credit' },
      { id: 'lending', label: 'Credit & Underwriting', icon: TrendingUp, category: 'Lending & Credit' },
      { id: 'sacco', label: 'SACCO Financial Core', icon: Building2, category: 'Lending & Credit' },
      { id: 'embedded-finance', label: 'Embedded Finance BNPL', icon: Code, category: 'Lending & Credit' },
      { id: 'fx', label: 'FX & Dealing Desk', icon: Globe, category: 'Treasury & Wealth' },
      { id: 'treasury', label: 'Corporate Treasury', icon: BarChart2, category: 'Treasury & Wealth' },
      { id: 'investments', label: 'Capital Markets', icon: TrendingUp, category: 'Treasury & Wealth' },
      { id: 'insurance', label: 'Insurtech Policies', icon: Shield, category: 'Treasury & Wealth' },
      { id: 'compliance', label: 'AML & Sanctions Guard', icon: ShieldCheck, category: 'Compliance & Security' },
      { id: 'data-intelligence', label: 'Predictive Finance AI', icon: Sparkles, category: 'Compliance & Security' },
      { id: 'developer', label: 'Developer API & Webhooks', icon: Code, category: 'Developer Portal' }
    ],
    aiCapabilityMapping: [
      { agentId: 'AGENT_FIN_AUDITOR', name: 'Financial Swarm Auditor', description: 'Real-time double-entry parity checks and automated anomaly detection.', modelAlias: 'gemini-2.5-pro' },
      { agentId: 'AGENT_CREDIT_RISK', name: 'Credit Risk Copilot', description: 'Underwrites microfinance and SACCO loans using predictive scoring.', modelAlias: 'gemini-2.5-flash' }
    ],
    modules: ['General Ledger (FAAP)', 'Universal Payment Switch', 'Mobile Money Core', 'Digital Wallets', 'Agent Banking', 'Microfinance JLG', 'SACCO Management', 'FX & Treasury', 'Developer APIs'],
    apis: ['POST /api/v1/ledger/post', 'POST /api/v1/payments/initiate', 'GET /api/v1/ledger/parity', 'POST /api/v1/wallets/create']
  },

  // 2. JUMO NURSERY / PRE-PRIMARY SCHOOL ERP
  {
    id: 'JUMO-NURSERY-ERP',
    code: 'JUMO-NUR-01',
    name: 'JUMO NURSERY SCHOOL ERP',
    badge: 'PRE-PRIMARY ECD',
    description: 'Early Childhood Development (ECD) pre-primary school operating system. Coordinates toddler admissions, guardian pickup authorizations, milestone observations, diet logs, and nursery fee collections.',
    category: 'Authoritative JUMO Products',
    version: 'v16.2.0',
    owner: 'JUMO Early Childhood Education Authority',
    tenantAvailability: 'Multi-Tenant Isolated',
    route: '/products/nursery',
    icon: Baby,
    iconName: 'Baby',
    color: 'text-pink-600',
    bgAccent: 'bg-pink-600',
    borderAccent: 'border-pink-200',
    accentColor: 'text-pink-600',
    accentHover: 'hover:bg-pink-50 hover:text-pink-700',
    monthlyPrice: 299,
    navigationRegistry: [
      { id: 'MOD_NUR_ADMIN', label: 'Toddler Enrollment & Admin', icon: Baby, category: 'Administration' },
      { id: 'MOD_NUR_MILESTONES', label: 'ECD Milestones & Safeguarding', icon: Heart, category: 'Child Development' },
      { id: 'MOD_NUR_BURSAR', label: 'Nursery Tuition & FAAP Fees', icon: DollarSign, category: 'Finance' },
      { id: 'developer', label: 'Nursery Developer API', icon: Code, category: 'Developer Portal' }
    ],
    aiCapabilityMapping: [
      { agentId: 'AGENT_ECD_DEVELOPMENT', name: 'ECD Development Copilot', description: 'Monitors early childhood developmental milestones and nutrition intake.', modelAlias: 'gemini-2.5-flash' }
    ],
    modules: ['Toddler Enrollment', 'Guardian Pickup Authorization', 'ECD Milestones Tracker', 'Nutrition & Health Logs', 'Nursery FAAP Fees'],
    apis: ['POST /api/v1/nursery/toddlers/register', 'GET /api/v1/nursery/ecd/milestones', 'POST /api/v1/nursery/fees/invoice']
  },

  // 3. JUMO PRIMARY SCHOOL ERP (Hillside Naalya Benchmark)
  {
    id: 'JUMO-PRIMARY-ERP',
    code: 'JUMO-PRI-01',
    name: 'JUMO PRIMARY SCHOOL ERP',
    badge: 'HILLSIDE NAALYA BENCHMARK',
    description: 'Primary school operating system benchmarked on Hillside Naalya. Manages P.1–P.7 class streams, pupil admissions, lower-primary thematic curriculum, upper-primary subject assessments, PLE preparation, and primary bursar finance.',
    category: 'Authoritative JUMO Products',
    version: 'v16.2.0',
    owner: 'JUMO Primary Academic Authority',
    tenantAvailability: 'Multi-Tenant Isolated',
    route: '/products/primary',
    icon: GraduationCap,
    iconName: 'GraduationCap',
    color: 'text-blue-600',
    bgAccent: 'bg-blue-600',
    borderAccent: 'border-blue-200',
    accentColor: 'text-blue-600',
    accentHover: 'hover:bg-blue-50 hover:text-blue-700',
    monthlyPrice: 399,
    navigationRegistry: [
      { id: 'MOD_PRI_GOVERNANCE', label: 'Headteacher & P.1–P.7 Streams', icon: Building2, category: 'Governance' },
      { id: 'MOD_PRI_CURRICULUM', label: 'Thematic & Four Core Subjects', icon: BookOpen, category: 'Academics' },
      { id: 'MOD_PRI_BURSAR', label: 'Primary Bursar & Alpha Cashbook', icon: DollarSign, category: 'Finance' },
      { id: 'developer', label: 'Primary Developer API', icon: Code, category: 'Developer Portal' }
    ],
    aiCapabilityMapping: [
      { agentId: 'AGENT_PLE_ANALYTICS', name: 'PLE Performance Predictor', description: 'Analyzes upper-primary mock exam trends to predict UNEB PLE aggregates.', modelAlias: 'gemini-2.5-pro' }
    ],
    modules: ['P.1-P.7 Class Streams', 'Pupil Admission Register', 'Thematic Curriculum Competencies', 'PLE Candidate Registration', 'Primary FAAP Cashbook & Vote Book'],
    apis: ['POST /api/v1/primary/pupils/admit', 'GET /api/v1/primary/ple/candidates', 'POST /api/v1/primary/fees/invoice']
  },

  // 4. JUMO SECONDARY SCHOOL ERP (St. Lawrence Academy Benchmark)
  {
    id: 'JUMO-SECONDARY-ERP',
    code: 'JUMO-SEC-01',
    name: 'JUMO SECONDARY SCHOOL ERP',
    badge: 'ST. LAWRENCE BENCHMARK',
    description: 'Secondary and high school operating system benchmarked on St. Lawrence Academy. Manages Principal governance, O-Level & A-Level subject combinations, UNEB UCE & UACE center administration, science laboratories, boarding facilities, and secondary bursar finance.',
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
    navigationRegistry: [
      { id: 'MOD_SEC_GOVERNANCE', label: 'Principal & Secondary Senate', icon: Building2, category: 'Governance' },
      { id: 'MOD_SEC_REGISTRAR', label: 'Registrar & UNEB Center (UCE/UACE)', icon: Users, category: 'Operations' },
      { id: 'MOD_SEC_DOS', label: 'DOS Academic & Subject Combinations', icon: BookOpen, category: 'Academics' },
      { id: 'MOD_SEC_BURSAR', label: 'Secondary Bursar & FAAP Ledger', icon: DollarSign, category: 'Finance' },
      { id: 'MOD_SEC_GRADEBOOK', label: 'Teacher Gradebook & Transcripts', icon: Award, category: 'Academics' },
      { id: 'developer', label: 'Secondary Developer API', icon: Code, category: 'Developer Portal' }
    ],
    aiCapabilityMapping: [
      { agentId: 'AGENT_UNEB_ANALYTICS', name: 'UNEB Results & Transcripts Copilot', description: 'Generates official NCDC / UNEB grade transcripts and subject combination checks.', modelAlias: 'gemini-2.5-pro' }
    ],
    modules: ['Principal Office', 'Registrar SIS & UNEB Center', 'O & A Level Subject Combinations', 'Science Labs & E-Library', 'Boarding & Houses', 'Secondary Bursar FAAP Ledger'],
    apis: ['POST /api/v1/secondary/students/register', 'GET /api/v1/secondary/uneb/candidates', 'POST /api/v1/secondary/transcripts/generate']
  },

  // 3. JUMO ALUMNI ASSOCIATION ERP
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
    navigationRegistry: [
      { id: 'MOD_ALUMNI_DASHBOARD', label: 'Advancement Overview', icon: LayoutGrid, category: 'Overview' },
      { id: 'MOD_ALUMNI_REGISTRY', label: 'Graduate Census & Directory', icon: Users, category: 'Census' },
      { id: 'MOD_ALUMNI_CHAPTERS', label: 'Global Regional Chapters', icon: Globe, category: 'Chapters' },
      { id: 'MOD_ALUMNI_GIVING', label: 'Endowments & Capital Giving', icon: DollarSign, category: 'Fundraising' },
      { id: 'MOD_ALUMNI_CAREER', label: 'Mentorship & Careers', icon: Briefcase, category: 'Advancement' },
      { id: 'developer', label: 'API Developer Portal', icon: Code, category: 'Developer Portal' },
      { id: 'admin', label: 'Licensing & Chapters Admin', icon: Settings, category: 'Administration' }
    ],
    aiCapabilityMapping: [
      { agentId: 'AGENT_MENTORSHIP', name: 'Mentorship Matching Copilot', description: 'Pairs graduating students with established alumni in industry.', modelAlias: 'gemini-2.5-flash' },
      { agentId: 'AGENT_DONOR_PROPENSITY', name: 'Endowment Propensity Engine', description: 'Predicts high-impact donor readiness for major capital campaigns.', modelAlias: 'gemini-2.5-pro' }
    ],
    modules: ['Graduate Directory', 'Global Chapters Network', 'Endowment Campaign Engine', 'Mentorship Portal', 'Reunion & Events Hub', 'Impact Tracking'],
    apis: ['GET /api/alumni/directory', 'POST /api/alumni/donations', 'POST /api/alumni/chapters/join', 'POST /api/alumni/mentorship/match']
  },

  // 4. JUMO CHURCH ERP
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
    navigationRegistry: [
      { id: 'MOD_CH_DASHBOARD', label: 'Diocesan & Parish Overview', icon: LayoutGrid, category: 'Overview' },
      { id: 'MOD_CH_DIOCESE', label: 'Diocese & Bishop Synod', icon: Building2, category: 'Diocese' },
      { id: 'MOD_CH_PARISH', label: 'Parish & Curate Stations', icon: Church, category: 'Diocese' },
      { id: 'MOD_CH_SACRAMENTS', label: 'Sacraments (Baptism, Matrimony)', icon: Heart, category: 'Ministry' },
      { id: 'MOD_CH_MEMBERSHIP', label: 'Parishioner Census & Directory', icon: Users, category: 'Ministry' },
      { id: 'MOD_CH_TITHES', label: 'Tithes & Stewardship Giving', icon: DollarSign, category: 'Finance' },
      { id: 'MOD_CH_CLERGY', label: 'Clergy & Pastoral Appointments', icon: ShieldCheck, category: 'Clergy' },
      { id: 'MOD_CH_PROJECTS', label: 'Parish Development Projects', icon: Layers, category: 'Projects' }
    ],
    aiCapabilityMapping: [
      { agentId: 'AGENT_PASTORAL_CARE', name: 'Pastoral Care Copilot', description: 'Identifies parishioner wellness triggers, hospital visit needs, and bereavement support.', modelAlias: 'gemini-2.5-flash' },
      { agentId: 'AGENT_STEWARDSHIP_AUDITOR', name: 'Tithe Stewardship Auditor', description: 'Validates diocesan parish remittances and general ledger postings.', modelAlias: 'gemini-2.5-pro' }
    ],
    modules: ['Diocese Hierarchy', 'Parish Directory', 'Sacramental Registers', 'Clergy Deployment', 'Tithe Ledger', 'Pastoral Care Hub'],
    apis: ['GET /api/church/parishes', 'POST /api/church/sacraments/register', 'POST /api/church/tithes/post', 'GET /api/church/clergy']
  },

  // PLATFORM STORE & SOVEREIGN CONTROL
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
    navigationRegistry: [
      { id: 'overview', label: 'System Overview', icon: LayoutGrid, category: 'Overview' },
      { id: 'store', label: 'Platform Store', icon: Package, category: 'Catalog' },
      { id: 'security', label: 'AEGIS Security', icon: Shield, category: 'Governance' },
      { id: 'ai', label: 'AI Command Center', icon: Sparkles, category: 'Intelligence' },
      { id: 'cloud', label: 'Cloud & Compute', icon: Cloud, category: 'Infrastructure' },
      { id: 'settings', label: 'System Configuration', icon: Settings, category: 'Administration' }
    ],
    aiCapabilityMapping: [
      { agentId: 'AGENT_SOV_GOVERNOR', name: 'Sovereign Governor Agent', description: 'Monitors cluster node health and enforces zero-trust access control.', modelAlias: 'gemini-2.5-pro' }
    ],
    modules: ['Platform Store', 'AEGIS Security', 'AI Gateway', 'Cloud Console', 'Diagnostics'],
    apis: ['GET /api/control/health', 'POST /api/control/config']
  }
];

export const WaffleAppsList = [
  { name: 'JUMO FINTECH', route: '/products/fintech', icon: DollarSign, color: 'text-emerald-700 bg-emerald-50', productId: 'JUMO-FINTECH' },
  { name: 'JUMO NURSERY ERP', route: '/products/nursery', icon: Baby, color: 'text-pink-700 bg-pink-50', productId: 'JUMO-NURSERY-ERP' },
  { name: 'JUMO PRIMARY ERP', route: '/products/primary', icon: GraduationCap, color: 'text-blue-700 bg-blue-50', productId: 'JUMO-PRIMARY-ERP' },
  { name: 'JUMO SECONDARY ERP', route: '/products/secondary', icon: GraduationCap, color: 'text-indigo-700 bg-indigo-50', productId: 'JUMO-SECONDARY-ERP' },
  { name: 'JUMO ALUMNI ERP', route: '/products/alumni', icon: Award, color: 'text-rose-700 bg-rose-50', productId: 'JUMO-ALUMNI' },
  { name: 'JUMO CHURCH ERP', route: '/products/church', icon: Church, color: 'text-purple-700 bg-purple-50', productId: 'JUMO-CHURCH' },
  { name: 'Sovereign Control Center', route: '/control-center', icon: Sliders, color: 'text-indigo-700 bg-indigo-50', productId: 'JUMO-CONTROL' }
];

export function getApprovedProduct(idOrAlias?: string): ApprovedProductDefinition {
  if (!idOrAlias) return ApprovedProductRegistry[0];
  const upper = idOrAlias.toUpperCase();
  const lower = idOrAlias.toLowerCase();

  const found = ApprovedProductRegistry.find(p => 
    p.id.toUpperCase() === upper || 
    p.code.toUpperCase() === upper ||
    p.name.toUpperCase().includes(upper) ||
    (lower.includes('fintech') && p.id === 'JUMO-FINTECH') ||
    (lower.includes('finance') && p.id === 'JUMO-FINTECH') ||
    (lower.includes('pay') && p.id === 'JUMO-FINTECH') ||
    (lower.includes('faap') && p.id === 'JUMO-FINTECH') ||
    (lower.includes('alumni') && p.id === 'JUMO-ALUMNI') ||
    (lower.includes('nursery') && p.id === 'JUMO-NURSERY-ERP') ||
    (lower.includes('primary') && p.id === 'JUMO-PRIMARY-ERP') ||
    (lower.includes('secondary') && p.id === 'JUMO-SECONDARY-ERP') ||
    (lower.includes('church') && p.id === 'JUMO-CHURCH') ||
    (lower.includes('diocese') && p.id === 'JUMO-CHURCH') ||
    (lower.includes('parish') && p.id === 'JUMO-CHURCH') ||
    (lower.includes('control') && p.id === 'JUMO-CONTROL') ||
    (lower.includes('admin') && p.id === 'JUMO-CONTROL')
  );

  return found || ApprovedProductRegistry[0];
}

export function mapPlatformIdToApprovedKey(platformId?: string): 'fintech' | 'nursery' | 'primary' | 'secondary' | 'alumni' | 'church' | 'control' {
  if (!platformId) return 'fintech';
  const lower = platformId.toLowerCase();
  if (lower.includes('alumni')) return 'alumni';
  if (lower.includes('nursery')) return 'nursery';
  if (lower.includes('primary')) return 'primary';
  if (lower.includes('secondary')) return 'secondary';
  if (lower.includes('church') || lower.includes('diocese') || lower.includes('parish')) return 'church';
  if (lower.includes('control') || lower.includes('admin') || lower.includes('store') || lower.includes('owner')) return 'control';
  return 'fintech';
}
