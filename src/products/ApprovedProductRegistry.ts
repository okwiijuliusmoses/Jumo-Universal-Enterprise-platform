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
  Briefcase
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

  // 2. JUMO UNIVERSAL EDUCATION ERP
  {
    id: 'JUMO-EDU-UNIVERSAL',
    code: 'JUMO-EDU-01',
    name: 'JUMO UNIVERSAL EDUCATION ERP',
    badge: 'ACADEMIC SOVEREIGN',
    description: 'Comprehensive academic institution operating system. Manages governance, student admissions, registrar records, senate approvals, bursary finances, campus clinics, and e-library.',
    category: 'Authoritative JUMO Products',
    version: 'v15.0.0',
    owner: 'JUMO Academic & Higher Education Authority',
    tenantAvailability: 'Multi-Tenant Isolated',
    route: '/products/education',
    icon: GraduationCap,
    iconName: 'GraduationCap',
    color: 'text-blue-600',
    bgAccent: 'bg-blue-600',
    borderAccent: 'border-blue-200',
    accentColor: 'text-blue-600',
    accentHover: 'hover:bg-blue-50 hover:text-blue-700',
    monthlyPrice: 499,
    navigationRegistry: [
      { id: 'MOD_EDU_DASHBOARD', label: 'Academic Overview', icon: LayoutGrid, category: 'Overview' },
      { id: 'MOD_EDU_GOVERNANCE', label: 'Governance & Council', icon: Building2, category: 'Governance' },
      { id: 'MOD_EDU_REGISTRAR', label: 'Registrar Office & SIS', icon: Users, category: 'Operations' },
      { id: 'MOD_EDU_SENATE', label: 'Senate & Curricula', icon: CheckCircle2, category: 'Governance' },
      { id: 'MOD_EDU_BURSARY', label: 'Bursary & Student Fees', icon: DollarSign, category: 'Operations' },
      { id: 'MOD_EDU_CLINIC', label: 'Health & Clinic Services', icon: HeartPulse, category: 'Campus Services' },
      { id: 'MOD_EDU_LIBRARY', label: 'E-Library Console', icon: BookOpen, category: 'Campus Services' },
      { id: 'MOD_EDU_HOSTEL', label: 'Hostel Allocation', icon: Cloud, category: 'Campus Services' },
      { id: 'developer', label: 'API Developer Portal', icon: Code, category: 'Developer Portal' },
      { id: 'admin', label: 'Licensing & Tenancy', icon: Settings, category: 'Administration' }
    ],
    aiCapabilityMapping: [
      { agentId: 'AGENT_EDU_ATTRITION', name: 'Student Attrition Predictor', description: 'Early warning indicators for academic dropouts and financial arrears.', modelAlias: 'gemini-2.5-flash' },
      { agentId: 'AGENT_CURRICULUM_SYNC', name: 'Curriculum Alignment Agent', description: 'Aligns academic credit units to national qualification frameworks.', modelAlias: 'gemini-2.5-pro' }
    ],
    modules: ['Registrar Office', 'Student Information System', 'Senate Approvals', 'Bursary & Alpha Cash Book', 'Campus Clinic', 'E-Library', 'Hostel Management'],
    apis: ['POST /api/edu/admissions', 'GET /api/edu/students', 'POST /api/edu/fees/invoice', 'POST /api/edu/grades/submit']
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
  { name: 'JUMO Universal Education ERP', route: '/products/education', icon: GraduationCap, color: 'text-blue-700 bg-blue-50', productId: 'JUMO-EDU-UNIVERSAL' },
  { name: 'JUMO Alumni Association ERP', route: '/products/alumni', icon: Award, color: 'text-rose-700 bg-rose-50', productId: 'JUMO-ALUMNI' },
  { name: 'Sovereign Control Center', route: '/control-center', icon: Sliders, color: 'text-indigo-700 bg-indigo-50', productId: 'JUMO-CONTROL' },
  { name: 'Platform Store', route: '/control-center/store', icon: Package, color: 'text-slate-700 bg-slate-50', productId: 'JUMO-CONTROL' }
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
    (lower.includes('edu') && p.id === 'JUMO-EDU-UNIVERSAL') ||
    (lower.includes('school') && p.id === 'JUMO-EDU-UNIVERSAL') ||
    (lower.includes('control') && p.id === 'JUMO-CONTROL') ||
    (lower.includes('admin') && p.id === 'JUMO-CONTROL')
  );

  return found || ApprovedProductRegistry[0];
}

export function mapPlatformIdToApprovedKey(platformId?: string): 'fintech' | 'education' | 'alumni' | 'control' {
  if (!platformId) return 'fintech';
  const lower = platformId.toLowerCase();
  if (lower.includes('alumni')) return 'alumni';
  if (lower.includes('edu') || lower.includes('school')) return 'education';
  if (lower.includes('control') || lower.includes('admin') || lower.includes('store') || lower.includes('owner')) return 'control';
  return 'fintech';
}
