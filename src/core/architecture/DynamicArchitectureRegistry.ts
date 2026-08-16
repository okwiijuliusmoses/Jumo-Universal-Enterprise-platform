// JUMO UEOS — Dynamic Architecture Capability Registry & Extensibility Governor
// Single authoritative machine-readable registry for ALL enterprise capabilities across studios, factories, platforms, modules, services, AI agents, and workflows.
// Standard: JDPM-10000 Dynamic Architecture Extension Standard

import { SharedPlatformRegistry, SharedPlatformCode } from "../platform/SharedPlatformRegistry";
import { AuthoritativeFactoryRegistry } from "../factory/AuthoritativeFactoryRegistry";
import { JumoAIProviderRegistry } from "../ai/providers/JumoAIProviderRegistry";
import { JumoAIAgentRegistry } from "../ai/registry/JumoAIAgentRegistry";
import { JUMO_STUDIO_REGISTRY, JumoStudioDefinition } from "../hub/studios/JumoStudioRegistry";

export type CapabilityType =
  | 'STUDIO'
  | 'FACTORY'
  | 'SUBFACTORY'
  | 'SHARED_PLATFORM'
  | 'MODULE'
  | 'SERVICE'
  | 'WORKFLOW'
  | 'AI_AGENT'
  | 'AI_PROVIDER'
  | 'AI_MODEL'
  | 'PORTAL'
  | 'INSTITUTIONAL_CAPABILITY'
  | 'GOVERNANCE_GATE';

export type CapabilityDomain =
  | 'SPECIFICATION'
  | 'ARCHITECTURE'
  | 'MANUFACTURING'
  | 'ASSURANCE'
  | 'OPERATIONS'
  | 'GOVERNANCE'
  | 'FINANCIAL'
  | 'SECURITY'
  | 'COGNITIVE';

export type LifecycleStage =
  | 'INTAKE'
  | 'INSTALLATION'
  | 'CONFIGURATION'
  | 'COMMISSIONING'
  | 'GO_LIVE'
  | 'OPERATIONS'
  | 'MAINTENANCE'
  | 'BACKUP'
  | 'UPGRADE'
  | 'RETIREMENT';

export interface DynamicCapabilityDescriptor {
  id: string;
  type: CapabilityType;
  name: string;
  description: string;
  domain: CapabilityDomain;
  studioId?: string;
  category: string;
  version: string;
  status: 'ACTIVE' | 'EXPERIMENTAL' | 'DEGRADED' | 'MAINTENANCE';
  dependencies: string[];
  requiredServices: string[];
  requiredAgents: string[];
  requiredPermissions: string[];
  configurationSchema: Record<string, string>;
  runtimeContract: string;
  navigationMetadata: {
    navGroup: string;
    label: string;
    icon: string;
    route: string;
    visibleInShell: boolean;
    badgeText?: string;
    order: number;
  };
  lifecycleStage: LifecycleStage;
  factoryId?: string;
  verificationRequirements: string[];
  certificationRequirements: string[];
  health: 'OPTIMAL' | 'DEGRADED' | 'MAINTENANCE';
  availability: 'AVAILABLE' | 'RESTRICTED' | 'OFFLINE';
  source: string;
  owner: string;
  createdAt: string;
  updatedAt: string;
}

export class DynamicArchitectureRegistry {
  private static instance: DynamicArchitectureRegistry;
  private capabilities = new Map<string, DynamicCapabilityDescriptor>();

  private constructor() {
    this.discoverAndBootstrap();
  }

  public static getInstance(): DynamicArchitectureRegistry {
    if (!DynamicArchitectureRegistry.instance) {
      DynamicArchitectureRegistry.instance = new DynamicArchitectureRegistry();
    }
    return DynamicArchitectureRegistry.instance;
  }

  public registerCapability(capability: DynamicCapabilityDescriptor): void {
    this.capabilities.set(capability.id, {
      ...capability,
      updatedAt: new Date().toISOString()
    });
  }

  public getCapability(id: string): DynamicCapabilityDescriptor | undefined {
    return this.capabilities.get(id);
  }

  public getAllCapabilities(): DynamicCapabilityDescriptor[] {
    return Array.from(this.capabilities.values());
  }

  public getCapabilitiesByType(type: CapabilityType): DynamicCapabilityDescriptor[] {
    return this.getAllCapabilities().filter(c => c.type === type);
  }

  public getCapabilitiesByDomain(domain: CapabilityDomain): DynamicCapabilityDescriptor[] {
    return this.getAllCapabilities().filter(c => c.domain === domain);
  }

  public getNavigableCapabilities(): DynamicCapabilityDescriptor[] {
    return this.getAllCapabilities()
      .filter(c => c.navigationMetadata && c.navigationMetadata.visibleInShell)
      .sort((a, b) => (a.navigationMetadata.order || 99) - (b.navigationMetadata.order || 99));
  }

  /**
   * Performs dynamic full-repository capability discovery across Studios, Factories, Platforms, AI Fabrics, and Lifecycle Engines
   */
  public discoverAndBootstrap(): void {
    const now = new Date().toISOString();

    // 1. Discover all registered Studios
    const studios = JUMO_STUDIO_REGISTRY.list();
    studios.forEach((studio, idx) => {
      this.registerCapability({
        id: `studio-${studio.id}`,
        type: 'STUDIO',
        name: studio.name,
        description: studio.description,
        domain: this.mapStudioFamilyToDomain(studio.family),
        studioId: studio.id,
        category: studio.family,
        version: '2026.08',
        status: 'ACTIVE',
        dependencies: studio.dependencies,
        requiredServices: [],
        requiredAgents: studio.agents,
        requiredPermissions: ['UEOS_STUDIO_ACCESS'],
        configurationSchema: { 'enabled': 'boolean' },
        runtimeContract: `JDPM-STUDIO-${studio.id.toUpperCase()}`,
        navigationMetadata: {
          navGroup: this.mapStudioFamilyToNavGroup(studio.family),
          label: studio.name,
          icon: studio.icon,
          route: studio.route,
          visibleInShell: true,
          order: idx + 1
        },
        lifecycleStage: 'OPERATIONS',
        verificationRequirements: studio.verificationProfiles,
        certificationRequirements: ['JDPM/CERT2608/0001'],
        health: 'OPTIMAL',
        availability: 'AVAILABLE',
        source: 'JumoStudioRegistry',
        owner: 'UEOS Operating Authority',
        createdAt: now,
        updatedAt: now
      });
    });

    // 2. Discover all registered Factories (10+ sub-factories & institutional factories)
    const factoryInventory = AuthoritativeFactoryRegistry.getInstance().getFactoryInventory();
    factoryInventory.forEach((fact, idx) => {
      this.registerCapability({
        id: `factory-${fact.factoryId.toLowerCase()}`,
        type: fact.category === 'INSTITUTIONAL_INSTALLATION' ? 'SUBFACTORY' : 'FACTORY',
        name: fact.name,
        description: `Authoritative factory executing ${fact.contract}`,
        domain: 'MANUFACTURING',
        factoryId: fact.factoryId,
        category: fact.category,
        version: fact.version,
        status: 'ACTIVE',
        dependencies: fact.dependencies,
        requiredServices: [],
        requiredAgents: ['FACT_ENGINEER'],
        requiredPermissions: ['UEOS_FACTORY_EXECUTE'],
        configurationSchema: { 'autoPromote': 'boolean' },
        runtimeContract: fact.contract,
        navigationMetadata: {
          navGroup: '02 — DIGITAL PRODUCT FACTORY',
          label: fact.name,
          icon: 'box',
          route: `/factory/${fact.factoryId}`,
          visibleInShell: true,
          badgeText: fact.contract.split(' ')[0],
          order: 10 + idx
        },
        lifecycleStage: 'INSTALLATION',
        verificationRequirements: ['JDPM/VER2608/0001'],
        certificationRequirements: ['JDPM/CERT2608/0001'],
        health: fact.health,
        availability: fact.canExecute ? 'AVAILABLE' : 'RESTRICTED',
        source: 'AuthoritativeFactoryRegistry',
        owner: 'JDPM Digital Product Manufacturing Group',
        createdAt: now,
        updatedAt: now
      });
    });

    // 3. Discover all Shared Commercial Platforms
    const platforms = SharedPlatformRegistry.getInstance().getAllPlatforms();
    platforms.forEach((plat, idx) => {
      this.registerCapability({
        id: `platform-${plat.platformCode.toLowerCase()}`,
        type: 'SHARED_PLATFORM',
        name: plat.name,
        description: plat.description,
        domain: plat.category === 'FINANCIAL' || plat.category === 'COMMERCIAL_PAYMENTS' ? 'FINANCIAL' : 'GOVERNANCE',
        category: plat.category,
        version: plat.version,
        status: plat.status === 'ENABLED' || plat.status === 'CONFIGURED' ? 'ACTIVE' : 'DEGRADED',
        dependencies: plat.requiredDependencies,
        requiredServices: plat.exposedApis,
        requiredAgents: [],
        requiredPermissions: [plat.securityClearance],
        configurationSchema: plat.configurationSchema,
        runtimeContract: `JDPM-8000-${plat.platformCode}`,
        navigationMetadata: {
          navGroup: '05 — SOVEREIGN GOVERNANCE & TRUST STUDIO',
          label: plat.name.split(' ')[0] + ' Platform',
          icon: 'shield-check',
          route: `/platform/${plat.platformCode.toLowerCase()}`,
          visibleInShell: true,
          badgeText: plat.status,
          order: 30 + idx
        },
        lifecycleStage: 'OPERATIONS',
        verificationRequirements: ['NIST-800-207', 'FIPS-140-3'],
        certificationRequirements: ['SOVEREIGN-PLATFORM-CERT'],
        health: plat.health.state === 'OPTIMAL' ? 'OPTIMAL' : 'DEGRADED',
        availability: 'AVAILABLE',
        source: 'SharedPlatformRegistry',
        owner: plat.owner,
        createdAt: now,
        updatedAt: now
      });
    });

    // 4. Discover AI Providers & Models
    try {
      const providers = JumoAIProviderRegistry.getInstance().list();
      providers.forEach((provider, idx) => {
        this.registerCapability({
          id: `ai-provider-${provider.providerId.toLowerCase()}`,
          type: 'AI_PROVIDER',
          name: provider.displayName,
          description: `AI Provider powering sovereign intelligence`,
          domain: 'COGNITIVE',
          category: provider.local ? 'LOCAL' : 'CLOUD',
          version: '2026.08',
          status: 'ACTIVE',
          dependencies: [],
          requiredServices: [],
          requiredAgents: [],
          requiredPermissions: ['AI_PROVIDER_ACCESS'],
          configurationSchema: { 'apiKeyConfigured': 'boolean' },
          runtimeContract: 'JDPM-9000-AI-PROVIDER',
          navigationMetadata: {
            navGroup: '05 — SOVEREIGN GOVERNANCE & TRUST STUDIO',
            label: `${provider.displayName} AI`,
            icon: 'cpu',
            route: `/ai/provider/${provider.providerId}`,
            visibleInShell: false,
            order: 50 + idx
          },
          lifecycleStage: 'OPERATIONS',
          verificationRequirements: ['AI-SAFETY-VERIFICATION'],
          certificationRequirements: ['AI-MODEL-CERTIFICATION'],
          health: 'OPTIMAL',
          availability: 'AVAILABLE',
          source: 'JumoAIProviderRegistry',
          owner: 'Cognitive Computing Group',
          createdAt: now,
          updatedAt: now
        });
      });
    } catch (err) {
      console.warn('[DYNAMIC REGISTRY] Provider discovery skipped during initialization:', err);
    }

    // 5. Discover Workforce AI Agents
    try {
      const agents = JumoAIAgentRegistry.getAllAgents();
      agents.forEach((agent, idx) => {
        this.registerCapability({
          id: `ai-agent-${agent.agentId.toLowerCase()}`,
          type: 'AI_AGENT',
          name: agent.displayName || agent.jumoName,
          description: agent.description,
          domain: 'COGNITIVE',
          category: agent.division,
          version: '2026.08',
          status: 'ACTIVE',
          dependencies: [],
          requiredServices: [],
          requiredAgents: [],
          requiredPermissions: [agent.securityPolicy?.securityClearance || 'LEVEL-10-NATIONAL'],
          configurationSchema: { 'autonomyLevel': 'string' },
          runtimeContract: `JDPM-AGENT-${agent.agentId}`,
          navigationMetadata: {
            navGroup: '02 — DIGITAL PRODUCT FACTORY',
            label: agent.displayName || agent.jumoName,
            icon: 'bot',
            route: `/workforce/agent/${agent.agentId}`,
            visibleInShell: false,
            order: 70 + idx
          },
          lifecycleStage: 'OPERATIONS',
          verificationRequirements: ['AGENT-BEHAVIORAL-AUDIT'],
          certificationRequirements: ['SOVEREIGN-AGENT-APPROVAL'],
          health: 'OPTIMAL',
          availability: 'AVAILABLE',
          source: 'JumoAIAgentRegistry',
          owner: agent.division,
          createdAt: now,
          updatedAt: now
        });
      });
    } catch (err) {
      console.warn('[DYNAMIC REGISTRY] Agent discovery skipped during initialization:', err);
    }
  }

  private mapStudioFamilyToDomain(family: string): CapabilityDomain {
    switch (family) {
      case 'PLATFORM': return 'SPECIFICATION';
      case 'MANUFACTURING': return 'MANUFACTURING';
      case 'ASSURANCE': return 'ASSURANCE';
      case 'OPERATIONS': return 'OPERATIONS';
      case 'GOVERNANCE': return 'GOVERNANCE';
      default: return 'MANUFACTURING';
    }
  }

  private mapStudioFamilyToNavGroup(family: string): string {
    switch (family) {
      case 'PLATFORM': return '01 — PRODUCT ARCHITECTURE STUDIO';
      case 'MANUFACTURING': return '02 — DIGITAL PRODUCT FACTORY';
      case 'ASSURANCE': return '03 — PRODUCT ASSURANCE STUDIO';
      case 'OPERATIONS': return '04 — RUNTIME OPERATIONS STUDIO';
      case 'GOVERNANCE': return '05 — SOVEREIGN GOVERNANCE & TRUST STUDIO';
      default: return '02 — DIGITAL PRODUCT FACTORY';
    }
  }
}

export const dynamicArchitectureRegistry = DynamicArchitectureRegistry.getInstance();
