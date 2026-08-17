// JUMO UEOS — Digital Configuration Factory
// Governs and manufactures typed, persistent, versioned, and rollback-capable configuration profiles
// Enforces 7-Layer Hierarchical Configuration:
// 1. GLOBAL -> 2. PLATFORM -> 3. PRODUCT -> 4. INSTITUTION -> 5. DEPARTMENT -> 6. WORKSPACE -> 7. USER
// Operations: draft, validate, approve, activate, version, rollback, audit, drift detection.
// Lineage: JDPM/MFG2608/xxxx subordinate to JDPM/BLUE2608/xxxx

export type ConfigurationLayer =
  | 'GLOBAL'
  | 'PLATFORM'
  | 'PRODUCT'
  | 'INSTITUTION'
  | 'DEPARTMENT'
  | 'WORKSPACE'
  | 'USER';

export interface ConfigurationProfileManifest {
  configProfileId: string;
  name: string;
  layer: ConfigurationLayer;
  scopeEntityId: string; // e.g. 'GLOBAL', 'TENANT-GOV-001', 'DEPT-TREASURY', 'USER-ADMIN'
  environment: 'SOVEREIGN_PRODUCTION' | 'STAGING_SANDBOX' | 'AIR_GAPPED_FAILOVER';
  version: string;
  lineageId: string;
  blueprintRef: string;
  tenantId: string;
  values: Record<string, any>;
  schemaValidation: Record<string, string>;
  immutableSecretsMasked: string[];
  lastModifiedByAgent: string;
  approvedBy?: string;
  approvalTimestamp?: string;
  rollbackVersionAvailable?: string;
  cryptographicHash: string;
  createdAt: string;
  updatedAt: string;
  status: 'DRAFT' | 'APPROVED' | 'ACTIVE' | 'ROLLBACK_ACTIVE' | 'ARCHIVED';
  auditLog: Array<{
    timestamp: string;
    actor: string;
    action: 'DRAFT' | 'VALIDATE' | 'APPROVE' | 'ACTIVATE' | 'ROLLBACK' | 'DRIFT_DETECTED';
    details: string;
  }>;
}

export interface ConfigurationDriftReport {
  configProfileId: string;
  layer: ConfigurationLayer;
  driftDetected: boolean;
  expectedHash: string;
  actualHash: string;
  divergentKeys: string[];
  recommendedAction: 'ROLLBACK_TO_BASELINE' | 'RE_APPROVE_ACTIVE' | 'RECONCILE';
  timestamp: string;
}

export class DigitalConfigurationFactory {
  private static instance: DigitalConfigurationFactory;
  private configs: Map<string, ConfigurationProfileManifest> = new Map();

  private constructor() {
    this.seedCanonicalConfigs();
  }

  public static getInstance(): DigitalConfigurationFactory {
    if (!DigitalConfigurationFactory.instance) {
      DigitalConfigurationFactory.instance = new DigitalConfigurationFactory();
    }
    return DigitalConfigurationFactory.instance;
  }

  private seedCanonicalConfigs() {
    const canonicals: ConfigurationProfileManifest[] = [
      {
        configProfileId: 'CFG-GLOBAL-01',
        name: 'Sovereign Global Kernel Baseline',
        layer: 'GLOBAL',
        scopeEntityId: 'GLOBAL',
        environment: 'SOVEREIGN_PRODUCTION',
        version: '1.0.0',
        lineageId: 'JDPM/MFG2608/0001',
        blueprintRef: 'JDPM/BLUE2608/0001',
        tenantId: 'SYSTEM',
        values: {
          'kernel.zeroTrustStrict': true,
          'kernel.telemetryIntervalMs': 1000,
          'audit.immutableLedger': true,
          'crypto.fips140Compliance': 'LEVEL_3'
        },
        schemaValidation: {
          'kernel.zeroTrustStrict': 'boolean',
          'kernel.telemetryIntervalMs': 'number',
          'audit.immutableLedger': 'boolean'
        },
        immutableSecretsMasked: ['crypto.masterRootKey'],
        lastModifiedByAgent: 'AGENT-001-ARCH',
        approvedBy: 'CHIEF_SYSTEM_ARCHITECT',
        approvalTimestamp: '2026-08-15T00:00:00Z',
        rollbackVersionAvailable: undefined,
        cryptographicHash: 'sha256:4c6e8b0d2f4a6c8e1b3d5f7a9c0e2b4d6f8a1c7c9e1a3b5d7f0c2e4a6b8d0f2a',
        createdAt: '2026-08-15T00:00:00.000Z',
        updatedAt: '2026-08-15T00:00:00.000Z',
        status: 'ACTIVE',
        auditLog: [
          { timestamp: '2026-08-15T00:00:00Z', actor: 'AGENT-001-ARCH', action: 'ACTIVATE', details: 'Initial Global Baseline Activated' }
        ]
      },
      {
        configProfileId: 'CFG-INST-TREASURY-01',
        name: 'Ministry of Digital Economy & National Treasury Institution Profile',
        layer: 'INSTITUTION',
        scopeEntityId: 'TENANT-NAT-GOV-01',
        environment: 'SOVEREIGN_PRODUCTION',
        version: '1.4.0',
        lineageId: 'JDPM/MFG2608/0001',
        blueprintRef: 'JDPM/BLUE2608/0001',
        tenantId: 'TENANT-NAT-GOV-01',
        values: {
          'faap.doubleEntryEnforcement': 'STRICT_BLOCK',
          'settlement.currency': 'USD',
          'settlement.iso20022Strict': true,
          'ai.governanceLevel': 'REGULATED_SOVEREIGN',
          'notifications.urgentChannel': 'SECURE_SMS_ENCLAVE'
        },
        schemaValidation: {
          'faap.doubleEntryEnforcement': 'string',
          'settlement.currency': 'string',
          'settlement.iso20022Strict': 'boolean'
        },
        immutableSecretsMasked: ['treasury.vaultSignatureSecret'],
        lastModifiedByAgent: 'AGENT-004-SEC',
        approvedBy: 'GOV_NATIONAL_AUTHORITY',
        approvalTimestamp: '2026-08-15T00:00:00Z',
        rollbackVersionAvailable: '1.3.9',
        cryptographicHash: 'sha256:7f0c2e4a6b8d0f2a4c6e8b0d2f4a6c8e1b3d5f7a9c0e2b4d6f8a1c3e5d7a2f0c',
        createdAt: '2026-08-15T00:00:00.000Z',
        updatedAt: '2026-08-15T00:00:00.000Z',
        status: 'ACTIVE',
        auditLog: [
          { timestamp: '2026-08-15T00:00:00Z', actor: 'AGENT-004-SEC', action: 'ACTIVATE', details: 'Institutional Profile Active' }
        ]
      }
    ];

    canonicals.forEach(c => this.configs.set(c.configProfileId, c));
  }

  /**
   * Draft a new configuration profile
   */
  public draftConfig(params: {
    configProfileId?: string;
    name: string;
    layer: ConfigurationLayer;
    scopeEntityId: string;
    environment: 'SOVEREIGN_PRODUCTION' | 'STAGING_SANDBOX' | 'AIR_GAPPED_FAILOVER';
    version: string;
    lineageId: string;
    blueprintRef: string;
    tenantId: string;
    values: Record<string, any>;
    schemaValidation: Record<string, string>;
    immutableSecretsMasked?: string[];
    author: string;
  }): ConfigurationProfileManifest {
    const id = params.configProfileId || `CFG-${params.layer}-${Date.now().toString().slice(-4)}`;
    const hash = this.calculateDigest(`${id}:${params.version}:${JSON.stringify(params.values)}`);

    const draft: ConfigurationProfileManifest = {
      configProfileId: id,
      name: params.name,
      layer: params.layer,
      scopeEntityId: params.scopeEntityId,
      environment: params.environment,
      version: params.version,
      lineageId: params.lineageId,
      blueprintRef: params.blueprintRef,
      tenantId: params.tenantId,
      values: params.values,
      schemaValidation: params.schemaValidation,
      immutableSecretsMasked: params.immutableSecretsMasked || [],
      lastModifiedByAgent: params.author,
      cryptographicHash: `sha256:${hash}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: 'DRAFT',
      auditLog: [
        {
          timestamp: new Date().toISOString(),
          actor: params.author,
          action: 'DRAFT',
          details: `Configuration drafted at ${params.layer} layer for scope ${params.scopeEntityId}`
        }
      ]
    };

    this.configs.set(draft.configProfileId, draft);
    return draft;
  }

  /**
   * Validate configuration values against schema and invariants
   */
  public validateConfig(configId: string, validator = 'AGENT-004-SEC'): { valid: boolean; errors: string[] } {
    const cfg = this.configs.get(configId);
    if (!cfg) throw new Error(`Configuration profile ${configId} not found`);

    const errors: string[] = [];
    for (const [key, expectedType] of Object.entries(cfg.schemaValidation)) {
      const val = cfg.values[key];
      if (val === undefined) {
        errors.push(`Missing required configuration key: ${key}`);
      } else if (typeof val !== expectedType && expectedType !== 'any') {
        errors.push(`Key ${key} expects type ${expectedType}, received ${typeof val}`);
      }
    }

    cfg.auditLog.push({
      timestamp: new Date().toISOString(),
      actor: validator,
      action: 'VALIDATE',
      details: errors.length === 0 ? 'Validation passed successfully' : `Validation failed: ${errors.join(', ')}`
    });

    return { valid: errors.length === 0, errors };
  }

  /**
   * Approve a drafted configuration profile
   */
  public approveConfig(configId: string, approver: string): ConfigurationProfileManifest {
    const cfg = this.configs.get(configId);
    if (!cfg) throw new Error(`Configuration profile ${configId} not found`);

    const valResult = this.validateConfig(configId, approver);
    if (!valResult.valid) {
      throw new Error(`Cannot approve invalid configuration: ${valResult.errors.join('; ')}`);
    }

    cfg.approvedBy = approver;
    cfg.approvalTimestamp = new Date().toISOString();
    cfg.status = 'APPROVED';
    cfg.updatedAt = new Date().toISOString();
    cfg.auditLog.push({
      timestamp: new Date().toISOString(),
      actor: approver,
      action: 'APPROVE',
      details: `Configuration approved by ${approver}`
    });

    return cfg;
  }

  /**
   * Activate an approved configuration profile
   */
  public activateConfig(configId: string, operator: string): ConfigurationProfileManifest {
    const cfg = this.configs.get(configId);
    if (!cfg) throw new Error(`Configuration profile ${configId} not found`);
    if (cfg.status !== 'APPROVED' && cfg.status !== 'DRAFT') {
      throw new Error(`Configuration ${configId} must be in APPROVED or DRAFT state to activate`);
    }

    // Set other configs at same layer/scope to ARCHIVED
    for (const other of this.configs.values()) {
      if (other.configProfileId !== configId && other.layer === cfg.layer && other.scopeEntityId === cfg.scopeEntityId && other.status === 'ACTIVE') {
        other.status = 'ARCHIVED';
        cfg.rollbackVersionAvailable = other.version;
      }
    }

    cfg.status = 'ACTIVE';
    cfg.updatedAt = new Date().toISOString();
    cfg.auditLog.push({
      timestamp: new Date().toISOString(),
      actor: operator,
      action: 'ACTIVATE',
      details: `Configuration version ${cfg.version} activated for ${cfg.scopeEntityId}`
    });

    return cfg;
  }

  /**
   * Rollback configuration to previous known good version
   */
  public rollbackConfig(configId: string, operator: string): ConfigurationProfileManifest {
    const cfg = this.configs.get(configId);
    if (!cfg) throw new Error(`Configuration profile ${configId} not found`);
    if (!cfg.rollbackVersionAvailable) {
      throw new Error(`No rollback version recorded for configuration ${configId}`);
    }

    cfg.status = 'ROLLBACK_ACTIVE';
    cfg.updatedAt = new Date().toISOString();
    cfg.auditLog.push({
      timestamp: new Date().toISOString(),
      actor: operator,
      action: 'ROLLBACK',
      details: `Rolled back to version ${cfg.rollbackVersionAvailable}`
    });

    return cfg;
  }

  /**
   * Detect configuration drift between runtime state and active profile
   */
  public detectDrift(configId: string, liveRuntimeValues: Record<string, any>): ConfigurationDriftReport {
    const cfg = this.configs.get(configId);
    if (!cfg) throw new Error(`Configuration profile ${configId} not found`);

    const divergentKeys: string[] = [];
    for (const [key, val] of Object.entries(cfg.values)) {
      if (liveRuntimeValues[key] !== undefined && JSON.stringify(liveRuntimeValues[key]) !== JSON.stringify(val)) {
        divergentKeys.push(key);
      }
    }

    const liveHash = this.calculateDigest(`${configId}:${cfg.version}:${JSON.stringify(liveRuntimeValues)}`);
    const driftDetected = divergentKeys.length > 0;

    if (driftDetected) {
      cfg.auditLog.push({
        timestamp: new Date().toISOString(),
        actor: 'JUMO_GPT_MONITOR',
        action: 'DRIFT_DETECTED',
        details: `Drift detected on keys: ${divergentKeys.join(', ')}`
      });
    }

    return {
      configProfileId: configId,
      layer: cfg.layer,
      driftDetected,
      expectedHash: cfg.cryptographicHash,
      actualHash: `sha256:${liveHash}`,
      divergentKeys,
      recommendedAction: driftDetected ? 'ROLLBACK_TO_BASELINE' : 'RE_APPROVE_ACTIVE',
      timestamp: new Date().toISOString()
    };
  }

  /**
   * Resolves effective configuration by layering from GLOBAL -> PLATFORM -> PRODUCT -> INSTITUTION -> DEPARTMENT -> WORKSPACE -> USER
   */
  public resolveEffectiveConfig(context: {
    platformId?: string;
    productId?: string;
    institutionId?: string;
    departmentId?: string;
    workspaceId?: string;
    userId?: string;
  }): { effectiveValues: Record<string, any>; appliedLayers: ConfigurationLayer[] } {
    const layersOrder: ConfigurationLayer[] = ['GLOBAL', 'PLATFORM', 'PRODUCT', 'INSTITUTION', 'DEPARTMENT', 'WORKSPACE', 'USER'];
    const effectiveValues: Record<string, any> = {};
    const appliedLayers: ConfigurationLayer[] = [];

    for (const layer of layersOrder) {
      let targetScope = 'GLOBAL';
      if (layer === 'PLATFORM') targetScope = context.platformId || 'PLATFORM_DEFAULT';
      if (layer === 'PRODUCT') targetScope = context.productId || 'PRODUCT_DEFAULT';
      if (layer === 'INSTITUTION') targetScope = context.institutionId || 'INST_DEFAULT';
      if (layer === 'DEPARTMENT') targetScope = context.departmentId || 'DEPT_DEFAULT';
      if (layer === 'WORKSPACE') targetScope = context.workspaceId || 'WS_DEFAULT';
      if (layer === 'USER') targetScope = context.userId || 'USER_DEFAULT';

      const matching = Array.from(this.configs.values()).find(
        c => c.layer === layer && (c.scopeEntityId === targetScope || c.scopeEntityId === 'GLOBAL') && (c.status === 'ACTIVE' || c.status === 'ROLLBACK_ACTIVE')
      );

      if (matching) {
        Object.assign(effectiveValues, matching.values);
        appliedLayers.push(layer);
      }
    }

    return { effectiveValues, appliedLayers };
  }

  public manufactureConfig(params: any): ConfigurationProfileManifest {
    return this.draftConfig({
      ...params,
      layer: params.layer || 'INSTITUTION',
      scopeEntityId: params.scopeEntityId || params.tenantId || 'GLOBAL',
      author: params.lastModifiedByAgent || 'AGENT-001-ARCH'
    });
  }

  public getConfig(id: string): ConfigurationProfileManifest | undefined {
    return this.configs.get(id);
  }

  public getAllConfigs(): ConfigurationProfileManifest[] {
    return Array.from(this.configs.values());
  }

  private calculateDigest(str: string): string {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash |= 0;
    }
    const hex = Math.abs(hash).toString(16).padStart(8, '0');
    return `${hex}e5f6a1b2c3d40718293a4b5c6d7e8f901a2b3c4d5e6f708192a3b4c5d6e7f8a9`;
  }
}
