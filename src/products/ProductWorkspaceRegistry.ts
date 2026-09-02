import { ComponentType } from 'react';
import { 
  Building2, DollarSign, BookOpen, School, Church, Award, Sliders, Landmark, CreditCard, Shield, Users, LayoutGrid, Cpu, FileText, BarChart3, Workflow, Database
} from 'lucide-react';
import { ApprovedProductRegistry, ApprovedProductDefinition, getApprovedProduct } from './ApprovedProductRegistry';
import { CANONICAL_PRODUCT_MAP, getCanonicalProduct } from './canonical';
import { CanonicalProductHierarchy } from './canonical/types';

export interface ProductWorkspaceTabDef {
  id: string;
  label: string;
  icon: any;
  category?: string;
}

export interface ProductUIRegistryEntry {
  productId: string;
  code: string;
  name: string;
  badge: string;
  description: string;
  icon: any;
  colorTheme: {
    badgeBg: string;
    accentColor: string;
    activeTab: string;
    icon: any;
    hoverBorder: string;
  };
  navigationTabs: ProductWorkspaceTabDef[];
  leadExecutiveRole: string;
  governingLegislation?: string;
  portals: string[];
  offices: string[];
  modules: string[];
  apis: string[];
  aiCapabilities: Array<{ agentId: string; name: string; description: string; modelAlias: string }>;
  standaloneComponent?: ComponentType<{ onBackToLauncher?: () => void }>;
}

export const PRODUCT_UI_THEMES: Record<string, ProductUIRegistryEntry['colorTheme']> = {
  'prod-fintech': {
    badgeBg: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    accentColor: 'text-emerald-700',
    activeTab: 'border-emerald-600 text-emerald-700 font-bold bg-emerald-50/50',
    icon: DollarSign,
    hoverBorder: 'hover:border-emerald-400'
  },
  'JUMO-FINTECH': {
    badgeBg: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    accentColor: 'text-emerald-700',
    activeTab: 'border-emerald-600 text-emerald-700 font-bold bg-emerald-50/50',
    icon: DollarSign,
    hoverBorder: 'hover:border-emerald-400'
  },
  'prod-secondary-school': {
    badgeBg: 'bg-indigo-50 text-indigo-800 border-indigo-200',
    accentColor: 'text-indigo-700',
    activeTab: 'border-indigo-600 text-indigo-700 font-bold bg-indigo-50/50',
    icon: BookOpen,
    hoverBorder: 'hover:border-indigo-400'
  },
  'JUMO-SECONDARY-ERP': {
    badgeBg: 'bg-indigo-50 text-indigo-800 border-indigo-200',
    accentColor: 'text-indigo-700',
    activeTab: 'border-indigo-600 text-indigo-700 font-bold bg-indigo-50/50',
    icon: BookOpen,
    hoverBorder: 'hover:border-indigo-400'
  },
  'prod-nursery-primary': {
    badgeBg: 'bg-amber-50 text-amber-800 border-amber-200',
    accentColor: 'text-amber-700',
    activeTab: 'border-amber-600 text-amber-700 font-bold bg-amber-50/50',
    icon: School,
    hoverBorder: 'hover:border-amber-400'
  },
  'JUMO-NURSERY-PRIMARY-ERP': {
    badgeBg: 'bg-amber-50 text-amber-800 border-amber-200',
    accentColor: 'text-amber-700',
    activeTab: 'border-amber-600 text-amber-700 font-bold bg-amber-50/50',
    icon: School,
    hoverBorder: 'hover:border-amber-400'
  },
  'prod-church-faith': {
    badgeBg: 'bg-purple-50 text-purple-800 border-purple-200',
    accentColor: 'text-purple-700',
    activeTab: 'border-purple-600 text-purple-700 font-bold bg-purple-50/50',
    icon: Church,
    hoverBorder: 'hover:border-purple-400'
  },
  'JUMO-CHURCH': {
    badgeBg: 'bg-purple-50 text-purple-800 border-purple-200',
    accentColor: 'text-purple-700',
    activeTab: 'border-purple-600 text-purple-700 font-bold bg-purple-50/50',
    icon: Church,
    hoverBorder: 'hover:border-purple-400'
  },
  'JUMO-ALUMNI': {
    badgeBg: 'bg-rose-50 text-rose-800 border-rose-200',
    accentColor: 'text-rose-700',
    activeTab: 'border-rose-600 text-rose-700 font-bold bg-rose-50/50',
    icon: Award,
    hoverBorder: 'hover:border-rose-400'
  },
  'JUMO-CONTROL': {
    badgeBg: 'bg-slate-100 text-slate-800 border-slate-300',
    accentColor: 'text-slate-900',
    activeTab: 'border-slate-800 text-slate-900 font-bold bg-slate-100',
    icon: Sliders,
    hoverBorder: 'hover:border-slate-400'
  }
};

export const DEFAULT_WORKSPACE_TABS: ProductWorkspaceTabDef[] = [
  { id: 'OVERVIEW', label: 'Architecture Overview', icon: Building2 },
  { id: 'MODULES', label: 'Mounted Modules', icon: LayoutGrid },
  { id: 'CAPABILITIES', label: 'Capabilities & Runtime', icon: Cpu },
  { id: 'BENCHMARK_EVIDENCE', label: 'Benchmark Evidence', icon: FileText },
  { id: 'SHARED_SERVICES', label: 'Shared Platform Services', icon: Landmark },
  { id: 'DASHBOARDS', label: 'Dashboards & Reports', icon: BarChart3 },
  { id: 'WORKFLOWS', label: 'Workflows', icon: Workflow },
  { id: 'DATABASE_APIS', label: 'Data & APIs', icon: Database },
  { id: 'SECURITY_ROLES', label: 'Security & Roles', icon: Shield }
];

export function getProductUIRegistry(productId: string): ProductUIRegistryEntry {
  const approved = getApprovedProduct(productId);
  const theme = PRODUCT_UI_THEMES[productId] || PRODUCT_UI_THEMES[approved.id] || {
    badgeBg: 'bg-blue-50 text-blue-800 border-blue-200',
    accentColor: 'text-blue-700',
    activeTab: 'border-blue-600 text-blue-700 font-bold bg-blue-50/50',
    icon: Building2,
    hoverBorder: 'hover:border-blue-400'
  };

  const canonical = getCanonicalProduct(productId) || CANONICAL_PRODUCT_MAP[productId];

  const modulesCount = canonical?.modules.length || approved.modules.length;
  const capabilitiesCount = canonical?.capabilities.length || 0;
  const dashboardsCount = canonical?.dashboards.length || 0;
  const workflowsCount = canonical?.workflows.length || 0;
  const dbCount = canonical?.databaseEntities.length || 0;
  const apisCount = canonical?.apis.length || approved.apis.length;
  const rolesCount = canonical?.roles.length || 0;

  const dynamicTabs: ProductWorkspaceTabDef[] = [
    { id: 'OVERVIEW', label: 'Architecture Overview', icon: Building2 },
    { id: 'MODULES', label: `Mounted Modules (${modulesCount})`, icon: LayoutGrid },
    { id: 'CAPABILITIES', label: `Capabilities & Runtime (${capabilitiesCount})`, icon: Cpu },
    { id: 'BENCHMARK_EVIDENCE', label: 'Benchmark Evidence', icon: FileText },
    { id: 'SHARED_SERVICES', label: 'Shared Platform Services', icon: Landmark },
    { id: 'DASHBOARDS', label: `Dashboards & Reports (${dashboardsCount})`, icon: BarChart3 },
    { id: 'WORKFLOWS', label: `Workflows (${workflowsCount})`, icon: Workflow },
    { id: 'DATABASE_APIS', label: `Data & APIs (${dbCount}/${apisCount})`, icon: Database },
    { id: 'SECURITY_ROLES', label: `Security & Roles (${rolesCount})`, icon: Shield }
  ];

  return {
    productId: approved.id || productId,
    code: approved.code || productId.toUpperCase(),
    name: approved.name || canonical?.product.name || 'Sovereign Product',
    badge: approved.badge || 'SOVEREIGN PRODUCT',
    description: approved.description || canonical?.product.description || '',
    icon: theme.icon,
    colorTheme: theme,
    navigationTabs: dynamicTabs,
    leadExecutiveRole: canonical?.product.leadExecutiveRole || approved.owner || 'Executive Director',
    governingLegislation: canonical?.product.governingLegislation,
    portals: approved.portals || [],
    offices: approved.offices || [],
    modules: approved.modules || [],
    apis: approved.apis || [],
    aiCapabilities: approved.aiCapabilityMapping || []
  };
}
