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
  }
];

export const WaffleAppsList = [
  { name: 'JUMO FINTECH', route: '/products/fintech', icon: DollarSign, color: 'text-emerald-700 bg-emerald-50', productId: 'JUMO-FINTECH' }
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
      (lower.includes('faap') && p.id === 'JUMO-FINTECH')
    )
  );

  return found || registry[0];
}

export function mapPlatformIdToApprovedKey(platformId?: string): 'fintech' {
  return 'fintech';
}
