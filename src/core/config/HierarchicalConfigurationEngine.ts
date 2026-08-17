// JUMO UEOS — Hierarchical Sovereign Configuration Engine
// Multi-layer scope resolution (GLOBAL -> PLATFORM -> PRODUCT -> INSTITUTION -> DEPARTMENT -> WORKSPACE -> USER)
// Standard: JDPM-6000 Enterprise Configuration Governance Standard

import { enterpriseLedgerEngine } from '../ledger/EnterpriseLedgerEngine';

export type ConfigScopeLevel =
  | 'GLOBAL'
  | 'PLATFORM'
  | 'PRODUCT'
  | 'INSTITUTION'
  | 'DEPARTMENT'
  | 'WORKSPACE'
  | 'USER';

export interface ConfigurationParameter {
  key: string;
  scope: ConfigScopeLevel;
  scopeId: string; // e.g. 'global', 'plat-ueos', 'inst-health'
  value: any;
  dataType: 'string' | 'number' | 'boolean' | 'json' | 'array';
  description: string;
  isSecret: boolean;
  version: number;
  owner: string;
  updatedAt: string;
  updatedBy: string;
}

export class HierarchicalConfigurationEngine {
  private static instance: HierarchicalConfigurationEngine;
  private parameters = new Map<string, ConfigurationParameter>(); // key = `${scope}:${scopeId}:${parameterKey}`
  private history: ConfigurationParameter[] = [];

  private constructor() {
    this.seedDefaultConfig();
  }

  public static getInstance(): HierarchicalConfigurationEngine {
    if (!HierarchicalConfigurationEngine.instance) {
      HierarchicalConfigurationEngine.instance = new HierarchicalConfigurationEngine();
    }
    return HierarchicalConfigurationEngine.instance;
  }

  public setParameter(
    key: string,
    value: any,
    scope: ConfigScopeLevel,
    scopeId = 'default',
    description = '',
    updatedBy = 'OPERATOR_ADMIN'
  ): ConfigurationParameter {
    const compositeKey = `${scope}:${scopeId}:${key}`;
    const existing = this.parameters.get(compositeKey);
    const version = existing ? existing.version + 1 : 1;

    const param: ConfigurationParameter = {
      key,
      scope,
      scopeId,
      value,
      dataType: typeof value === 'boolean' ? 'boolean' : typeof value === 'number' ? 'number' : typeof value === 'object' ? 'json' : 'string',
      description: description || existing?.description || `Config key ${key}`,
      isSecret: key.toLowerCase().includes('secret') || key.toLowerCase().includes('key') || key.toLowerCase().includes('token'),
      version,
      owner: scopeId,
      updatedAt: new Date().toISOString(),
      updatedBy
    };

    this.parameters.set(compositeKey, param);
    this.history.push(param);

    enterpriseLedgerEngine.appendEntry(
      'CONFIGURATION',
      updatedBy,
      'SET_CONFIGURATION_PARAMETER',
      { key, scope, scopeId, value: param.isSecret ? '[REDACTED]' : value, version }
    );

    return param;
  }

  /**
   * Resolves parameter using hierarchical fallback:
   * USER -> WORKSPACE -> DEPARTMENT -> INSTITUTION -> PRODUCT -> PLATFORM -> GLOBAL
   */
  public resolveParameter(
    key: string,
    context: {
      userId?: string;
      workspaceId?: string;
      departmentId?: string;
      institutionId?: string;
      productId?: string;
      platformId?: string;
    }
  ): { value: any; sourceScope: ConfigScopeLevel; sourceScopeId: string } {
    const scopes: Array<{ scope: ConfigScopeLevel; scopeId?: string }> = [
      { scope: 'USER', scopeId: context.userId },
      { scope: 'WORKSPACE', scopeId: context.workspaceId },
      { scope: 'DEPARTMENT', scopeId: context.departmentId },
      { scope: 'INSTITUTION', scopeId: context.institutionId },
      { scope: 'PRODUCT', scopeId: context.productId },
      { scope: 'PLATFORM', scopeId: context.platformId },
      { scope: 'GLOBAL', scopeId: 'global' }
    ];

    for (const s of scopes) {
      if (!s.scopeId) continue;
      const compositeKey = `${s.scope}:${s.scopeId}:${key}`;
      if (this.parameters.has(compositeKey)) {
        const param = this.parameters.get(compositeKey)!;
        return { value: param.value, sourceScope: s.scope, sourceScopeId: s.scopeId };
      }
    }

    return { value: undefined, sourceScope: 'GLOBAL', sourceScopeId: 'global' };
  }

  public getAllParameters(): ConfigurationParameter[] {
    return Array.from(this.parameters.values());
  }

  public detectDrift(baselineScopeId = 'global'): Array<{ key: string; expected: any; actual: any; scope: ConfigScopeLevel; scopeId: string }> {
    const drifts: Array<{ key: string; expected: any; actual: any; scope: ConfigScopeLevel; scopeId: string }> = [];
    const globals = Array.from(this.parameters.values()).filter(p => p.scope === 'GLOBAL');

    globals.forEach(g => {
      const overrides = Array.from(this.parameters.values()).filter(p => p.key === g.key && p.scope !== 'GLOBAL');
      overrides.forEach(ov => {
        if (typeof ov.value !== typeof g.value) {
          drifts.push({ key: g.key, expected: g.value, actual: ov.value, scope: ov.scope, scopeId: ov.scopeId });
        }
      });
    });

    return drifts;
  }

  private seedDefaultConfig(): void {
    this.setParameter('system.name', 'JUMO Universal Enterprise Operating System', 'GLOBAL', 'global', 'Sovereign system identifier');
    this.setParameter('system.version', '2026.08.15', 'GLOBAL', 'global', 'System release version');
    this.setParameter('security.zeroTrustEnforced', true, 'GLOBAL', 'global', 'Global zero-trust toggle');
    this.setParameter('ai.primaryProvider', 'JUMO_SOVEREIGN_GATEWAY', 'GLOBAL', 'global', 'Default AI Gateway');
    this.setParameter('manufacturing.autoPromoteJobs', false, 'GLOBAL', 'global', 'Auto-promote jobs');
    this.setParameter('theme.primaryColor', '#0f172a', 'GLOBAL', 'global', 'Primary UI Slate theme');
  }
}

export const hierarchicalConfigurationEngine = HierarchicalConfigurationEngine.getInstance();
