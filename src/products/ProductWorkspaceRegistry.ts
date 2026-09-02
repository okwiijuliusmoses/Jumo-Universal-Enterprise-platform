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
  }
};

export const DEFAULT_WORKSPACE_TABS: ProductWorkspaceTabDef[] = [
  { id: 'OVERVIEW', label: 'Enterprise Overview', icon: Building2 },
  { id: 'MODULES', label: 'Functional Modules', icon: LayoutGrid },
  { id: 'CAPABILITIES', label: 'Service Capabilities', icon: Cpu },
  { id: 'BENCHMARK_EVIDENCE', label: 'Operational Standards', icon: FileText },
  { id: 'SHARED_SERVICES', label: 'Core Banking Rails', icon: Landmark },
  { id: 'DASHBOARDS', label: 'Reports & Analytics', icon: BarChart3 },
  { id: 'WORKFLOWS', label: 'Business Workflows', icon: Workflow },
  { id: 'DATABASE_APIS', label: 'Ledger & APIs', icon: Database },
  { id: 'SECURITY_ROLES', label: 'Permissions & Roles', icon: Shield }
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
    { id: 'OVERVIEW', label: 'Enterprise Overview', icon: Building2 },
    { id: 'MODULES', label: `Functional Modules (${modulesCount})`, icon: LayoutGrid },
    { id: 'CAPABILITIES', label: `Service Capabilities (${capabilitiesCount})`, icon: Cpu },
    { id: 'BENCHMARK_EVIDENCE', label: 'Operational Standards', icon: FileText },
    { id: 'SHARED_SERVICES', label: 'Core Banking Rails', icon: Landmark },
    { id: 'DASHBOARDS', label: `Reports & Analytics (${dashboardsCount})`, icon: BarChart3 },
    { id: 'WORKFLOWS', label: `Business Workflows (${workflowsCount})`, icon: Workflow },
    { id: 'DATABASE_APIS', label: `Ledger & APIs (${dbCount}/${apisCount})`, icon: Database },
    { id: 'SECURITY_ROLES', label: `Permissions & Roles (${rolesCount})`, icon: Shield }
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
