export interface AppManifest {
  id: string;
  name: string;
  category: string;
  description: string;
  status: 'approved' | 'pending' | 'revoked' | 'active';
  plan?: string;
  notes?: string;
  modules?: any[];
  icon?: any;
  route?: string;
}

const INITIAL_APPS: AppManifest[] = [
  { id: 'hospitality_eos', name: 'Hospitality-EOS (Digital Hybrid)', category: 'Enterprise ERP', description: 'Next-generation Hospitality Enterprise Operating System unifying 15 configurable phases.', status: 'approved', plan: 'Enterprise Hybrid' },
  { id: 'sacco_erp', name: 'SACCO & Microfinance ERP', category: 'Financial', description: 'Complete SACCO management system with FAAP integration.', status: 'approved', plan: 'Pro' },
  { id: 'church_erp', name: 'Church & Diocese ERP', category: 'Religious', description: 'Diocesan operations and parish management system.', status: 'approved', plan: 'Pro' },
  { id: 'education_erp', name: 'School & University ERP', category: 'Education', description: 'Academic management and alumni identity wallet.', status: 'approved', plan: 'Pro' },
  { id: 'ngo_erp', name: 'NGO & Grant ERP', category: 'Non-Profit', description: 'Grant management and humanitarian operations.', status: 'approved', plan: 'Standard' },
  { id: 'gov_erp', name: 'Government & Municipal ERP', category: 'Public Sector', description: 'Municipal governance and public citizen portal.', status: 'approved', plan: 'Enterprise Hybrid' },
];

let appsStore: AppManifest[] = [...INITIAL_APPS];

export const AppRegistryService = {
  getAllApps(): AppManifest[] {
    return appsStore;
  },
  approveSubscription(id: string): void {
    appsStore = appsStore.map(app => app.id === id ? { ...app, status: 'approved' as const } : app);
  },
  revokeSubscription(id: string): void {
    appsStore = appsStore.map(app => app.id === id ? { ...app, status: 'revoked' as const } : app);
  },
  requestSubscription(id: string, plan: string, notes?: string): void {
    const existing = appsStore.find(app => app.id === id);
    if (existing) {
      appsStore = appsStore.map(app => app.id === id ? { ...app, status: 'pending' as const, plan, notes } : app);
    } else {
      appsStore.push({
        id,
        name: id.replace(/_/g, ' ').toUpperCase(),
        category: 'Extension',
        description: `Custom requested subscription for ${plan}`,
        status: 'pending',
        plan,
        notes
      });
    }
  }
};
