// JUMO UEOS — Digital Component & Module Dependency Registry Engine
// Machine-readable dependency graph engine for Digital Products, Modules, Services, Capabilities, and Components.
// Standard: JDPM-5000 Digital Artifact Dependency Graph Standard

export type DigitalArtifactType =
  | 'DIGITAL_PRODUCT'
  | 'DIGITAL_MODULE'
  | 'DIGITAL_SERVICE'
  | 'DIGITAL_CAPABILITY'
  | 'DIGITAL_COMPONENT';

export interface DigitalArtifactDescriptor {
  id: string;
  type: DigitalArtifactType;
  name: string;
  code: string;
  description: string;
  version: string;
  domain: string;
  dependencies: string[]; // Array of artifact IDs this depends on
  requiredAgents: string[];
  outputArtifacts: string[];
  securityClearance: string;
  status: 'COMMITTED' | 'MANUFACTURING' | 'VERIFIED' | 'DEPRECATED';
}

export class DigitalComponentModuleRegistry {
  private static instance: DigitalComponentModuleRegistry;
  private artifacts = new Map<string, DigitalArtifactDescriptor>();

  private constructor() {
    this.seedDefaultArtifacts();
  }

  public static getInstance(): DigitalComponentModuleRegistry {
    if (!DigitalComponentModuleRegistry.instance) {
      DigitalComponentModuleRegistry.instance = new DigitalComponentModuleRegistry();
    }
    return DigitalComponentModuleRegistry.instance;
  }

  public registerArtifact(descriptor: DigitalArtifactDescriptor): void {
    this.artifacts.set(descriptor.id, descriptor);
  }

  public getArtifact(id: string): DigitalArtifactDescriptor | undefined {
    return this.artifacts.get(id);
  }

  public getAllArtifacts(): DigitalArtifactDescriptor[] {
    return Array.from(this.artifacts.values());
  }

  public getArtifactsByType(type: DigitalArtifactType): DigitalArtifactDescriptor[] {
    return this.getAllArtifacts().filter(a => a.type === type);
  }

  /**
   * Resolves topological build sequence for a target artifact
   */
  public resolveBuildSequence(targetId: string): DigitalArtifactDescriptor[] {
    const visited = new Set<string>();
    const sequence: DigitalArtifactDescriptor[] = [];

    const visit = (id: string) => {
      if (visited.has(id)) return;
      visited.add(id);

      const artifact = this.getArtifact(id);
      if (artifact) {
        artifact.dependencies.forEach(depId => visit(depId));
        sequence.push(artifact);
      }
    };

    visit(targetId);
    return sequence;
  }

  private seedDefaultArtifacts(): void {
    // Low-level Components
    this.registerArtifact({
      id: 'COMP-UI-BUTTON',
      type: 'DIGITAL_COMPONENT',
      name: 'Sovereign UI Control Button',
      code: 'UI_BTN_01',
      description: 'Single-line accessible control button with keyboard focus state',
      version: '1.0.0',
      domain: 'UI_CORE',
      dependencies: [],
      requiredAgents: ['AGENT-004'],
      outputArtifacts: ['ButtonComponent.tsx'],
      securityClearance: 'LEVEL-01-OPERATOR',
      status: 'VERIFIED'
    });

    this.registerArtifact({
      id: 'COMP-DB-PGPOOL',
      type: 'DIGITAL_COMPONENT',
      name: 'PostgreSQL Connection Pool Connector',
      code: 'DB_PG_POOL',
      description: 'Resilient database connection pool with automatic SSL enclave binding',
      version: '2.1.0',
      domain: 'DATA_PERSISTENCE',
      dependencies: [],
      requiredAgents: ['AGENT-003'],
      outputArtifacts: ['db.ts'],
      securityClearance: 'LEVEL-08-SECURITY',
      status: 'VERIFIED'
    });

    // Services
    this.registerArtifact({
      id: 'SERV-AUTH-SSO',
      type: 'DIGITAL_SERVICE',
      name: 'Sovereign SAML2/OAuth Identity Service',
      code: 'AUTH_SVC',
      description: 'Single Sign-On authentication and clearance evaluation gateway',
      version: '1.5.0',
      domain: 'IDENTITY',
      dependencies: ['COMP-DB-PGPOOL'],
      requiredAgents: ['AGENT-008'],
      outputArtifacts: ['PublicGateway.tsx'],
      securityClearance: 'LEVEL-10-NATIONAL',
      status: 'VERIFIED'
    });

    // Modules
    this.registerArtifact({
      id: 'MOD-GOV-LEDGER',
      type: 'DIGITAL_MODULE',
      name: 'Sovereign Audit Ledger Module',
      code: 'GOV_LEDGER',
      description: 'Append-only ledger module for tamper-proof national auditing',
      version: '3.0.0',
      domain: 'GOVERNANCE',
      dependencies: ['COMP-DB-PGPOOL', 'SERV-AUTH-SSO'],
      requiredAgents: ['AGENT-001'],
      outputArtifacts: ['EnterpriseLedgerEngine.ts'],
      securityClearance: 'LEVEL-10-NATIONAL',
      status: 'VERIFIED'
    });

    // Product
    this.registerArtifact({
      id: 'PROD-UEOS-CORE',
      type: 'DIGITAL_PRODUCT',
      name: 'JUMO Universal Enterprise Operating System',
      code: 'UEOS_CORE',
      description: 'National Sovereign Enterprise Hybrid Digital Platform',
      version: '2026.08',
      domain: 'NATIONAL_ENTERPRISE',
      dependencies: ['MOD-GOV-LEDGER', 'SERV-AUTH-SSO'],
      requiredAgents: ['AGENT-001', 'AGENT-003', 'AGENT-010'],
      outputArtifacts: ['UEOSShell.tsx', 'NationalManufacturingHub.tsx'],
      securityClearance: 'LEVEL-10-NATIONAL',
      status: 'VERIFIED'
    });
  }
}

export const digitalComponentModuleRegistry = DigitalComponentModuleRegistry.getInstance();
