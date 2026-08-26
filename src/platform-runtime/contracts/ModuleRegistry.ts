/**
 * JUMO UEOS — Sovereign Module Registry Contract
 * Registers and validates type-safe operational modules for domain runtimes.
 */

export interface ModuleDefinition {
  id: string;
  name: string;
  description: string;
  status: 'ACTIVE' | 'INACTIVE' | 'ERROR';
  category?: string;
  config?: Record<string, any>;
  permissions?: string[];
}

export const ModuleRegistry = {
  validateModuleList(modules: any[] | undefined): ModuleDefinition[] {
    if (!modules || !Array.isArray(modules)) {
      return [];
    }
    return modules.map((mod, idx) => ({
      id: mod?.id || `mod_${idx + 1}`,
      name: typeof mod === 'string' ? mod : (mod?.name || `Operational Module #${idx + 1}`),
      description: typeof mod === 'string' ? `${mod} subsystem engine.` : (mod?.description || `Standard operating module.`),
      status: (mod?.status === 'ACTIVE' || mod?.status === 'INACTIVE' || mod?.status === 'ERROR') ? mod.status : 'ACTIVE',
      category: mod?.category || 'General',
      config: mod?.config || {},
      permissions: mod?.permissions || ['READ', 'EXECUTE']
    }));
  }
};
