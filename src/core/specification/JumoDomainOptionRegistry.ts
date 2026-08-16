// JUMO UEOS — Authoritative Domain Option Registry & Guided Translation Engine
// Bridges the JumoProductTaxonomyRegistry with the 20-Stage Manufacturing Pipeline.
// Eliminates any global domain bleed by resolving context from the active Ecosystem.

import { ImplementationGradeSpecificationContract, ProductClassification } from '../../types/specification';
import { JumoProductTaxonomyRegistry, ProductEcosystemId, DomainTaxonomyNode } from './JumoProductTaxonomyRegistry';

export interface DomainOptionItem {
  id: string;
  name: string;
  category: string;
  description: string;
  domain: string;
  complexity: 'STANDARD' | 'ADVANCED' | 'ENTERPRISE';
  defaultEnabled?: boolean;
  metadata?: Record<string, any>;
}

export interface CapacityProfile {
  id: string;
  displayName: string;
  description: string;
  usersCount: number;
  concurrentUsersCount: number;
  storageGb: number;
  availabilityTargetPercentage: number;
  recommendedNodes: number;
  tier: 'STARTER' | 'INSTITUTIONAL' | 'ENTERPRISE' | 'LARGE_ENTERPRISE' | 'NATIONAL' | 'SOVEREIGN_CRITICAL';
}

export interface TenancyProfile {
  id: string;
  displayName: string;
  tenantModel: 'SINGLE_TENANT' | 'MULTI_TENANT' | 'HYBRID_TENANT';
  hierarchyType: string;
  description: string;
  isolationLevel: 'SCHEMA' | 'DATABASE' | 'CONTAINER' | 'AIR_GAPPED_CLUSTER';
  complianceLevel: 'STANDARD' | 'REGIONAL_DATA_SOVEREIGNTY' | 'NATIONAL_CRITICAL';
}

export interface InfrastructureProfile {
  id: string;
  displayName: string;
  deploymentType: 'CLOUD_NATIVE' | 'ON_PREMISE' | 'HYBRID_SOVEREIGN';
  scalingPolicy: 'CONSERVATIVE' | 'BALANCED' | 'AGGRESSIVE';
  redundancyZones: number;
  disasterRecoveryRpoMinutes: number;
  disasterRecoveryRtoMinutes: number;
  description: string;
}

export class JumoDomainOptionRegistry {
  // Capacity Profiles
  public static readonly CAPACITY_PROFILES: CapacityProfile[] = [
    {
      id: 'STARTER_COMMUNITY',
      displayName: 'Starter Community / Small Office',
      description: 'Suitable for small local offices, pilot programs, or single departments.',
      usersCount: 50,
      concurrentUsersCount: 15,
      storageGb: 50,
      availabilityTargetPercentage: 99.5,
      recommendedNodes: 2,
      tier: 'STARTER'
    },
    {
      id: 'INSTITUTIONAL_STANDARD',
      displayName: 'Institutional Standard (Schools / Clinics / Municipalities)',
      description: 'Balanced performance profile for schools, hospitals, local councils, and medium institutions.',
      usersCount: 1500,
      concurrentUsersCount: 350,
      storageGb: 500,
      availabilityTargetPercentage: 99.9,
      recommendedNodes: 4,
      tier: 'INSTITUTIONAL'
    },
    {
      id: 'ENTERPRISE_CORE',
      displayName: 'Enterprise Core (Colleges / Regional Hospitals / Commercial Banks)',
      description: 'High-throughput architecture for large institutions with intensive multi-departmental operations.',
      usersCount: 10000,
      concurrentUsersCount: 2500,
      storageGb: 2500,
      availabilityTargetPercentage: 99.95,
      recommendedNodes: 8,
      tier: 'ENTERPRISE'
    },
    {
      id: 'LARGE_ENTERPRISE_HIGH_LOAD',
      displayName: 'Large Enterprise High Load (Universities / Multi-branch Networks)',
      description: 'Distributed fault-tolerant cluster with dedicated caching and high-concurrency event queues.',
      usersCount: 50000,
      concurrentUsersCount: 12000,
      storageGb: 10000,
      availabilityTargetPercentage: 99.99,
      recommendedNodes: 16,
      tier: 'LARGE_ENTERPRISE'
    },
    {
      id: 'NATIONAL_CRITICAL_INFRASTRUCTURE',
      displayName: 'National Critical Infrastructure (Ministry / Central Bank / Sovereign Ledger)',
      description: 'Ultra-resilient multi-region sovereign cluster with synchronous failover and continuous verification.',
      usersCount: 500000,
      concurrentUsersCount: 100000,
      storageGb: 50000,
      availabilityTargetPercentage: 99.999,
      recommendedNodes: 32,
      tier: 'NATIONAL'
    },
    {
      id: 'SOVEREIGN_DEFENSE_AIR_GAP',
      displayName: 'Sovereign Defense & High-Security Air-Gap',
      description: 'Fully isolated sovereign nodes with zero external ingress/egress and cryptographic hardware security.',
      usersCount: 250000,
      concurrentUsersCount: 50000,
      storageGb: 100000,
      availabilityTargetPercentage: 99.999,
      recommendedNodes: 48,
      tier: 'SOVEREIGN_CRITICAL'
    }
  ];

  // Tenancy Profiles
  public static readonly TENANCY_PROFILES: TenancyProfile[] = [
    {
      id: 'SINGLE_INSTITUTION_DEDICATED',
      displayName: 'Single Dedicated Institution',
      tenantModel: 'SINGLE_TENANT',
      hierarchyType: 'Central Office -> Department -> Officer Unit',
      description: 'Dedicated isolated database and application compute for one sovereign entity.',
      isolationLevel: 'DATABASE',
      complianceLevel: 'REGIONAL_DATA_SOVEREIGNTY'
    },
    {
      id: 'MULTI_BRANCH_SHARED',
      displayName: 'Multi-Branch Shared Ecosystem',
      tenantModel: 'MULTI_TENANT',
      hierarchyType: 'Headquarters -> Regional Branch -> Local Unit -> Counter',
      description: 'Multi-tenant architecture with tenant key isolation for multi-campus or multi-branch networks.',
      isolationLevel: 'SCHEMA',
      complianceLevel: 'STANDARD'
    },
    {
      id: 'FEDERATED_NATIONAL_HIERARCHICAL',
      displayName: 'Federated National / Sovereign Hierarchy',
      tenantModel: 'HYBRID_TENANT',
      hierarchyType: 'National Ministry -> State Directorate -> District Office -> Institutional Node',
      description: 'Hybrid hierarchy combining centralized reporting with sovereign local execution nodes.',
      isolationLevel: 'CONTAINER',
      complianceLevel: 'NATIONAL_CRITICAL'
    }
  ];

  // Infrastructure Profiles
  public static readonly INFRASTRUCTURE_PROFILES: InfrastructureProfile[] = [
    {
      id: 'CLOUD_NATIVE_ELASTIC',
      displayName: 'Cloud Native Elastic Fabric',
      deploymentType: 'CLOUD_NATIVE',
      scalingPolicy: 'BALANCED',
      redundancyZones: 3,
      disasterRecoveryRpoMinutes: 5,
      disasterRecoveryRtoMinutes: 15,
      description: 'Automated elastic container provisioning with dynamic traffic balancing and automatic failover.'
    },
    {
      id: 'ON_PREMISE_SOVEREIGN_DATA_CENTER',
      displayName: 'On-Premise Sovereign Data Center',
      deploymentType: 'ON_PREMISE',
      scalingPolicy: 'CONSERVATIVE',
      redundancyZones: 2,
      disasterRecoveryRpoMinutes: 1,
      disasterRecoveryRtoMinutes: 5,
      description: 'Hosted on physical institutional servers with zero reliance on public cloud infrastructure.'
    },
    {
      id: 'HYBRID_SOVEREIGN_MESH',
      displayName: 'Hybrid Sovereign High-Availability Mesh',
      deploymentType: 'HYBRID_SOVEREIGN',
      scalingPolicy: 'AGGRESSIVE',
      redundancyZones: 4,
      disasterRecoveryRpoMinutes: 0,
      disasterRecoveryRtoMinutes: 1,
      description: 'Active-active dual-datacenter synchronization with air-gapped immutable backup ledgers.'
    }
  ];

  public static getAvailableDomains(ecosystemId?: ProductEcosystemId) {
    if (ecosystemId) {
      return JumoProductTaxonomyRegistry.getDomainsForEcosystem(ecosystemId).map(d => ({
        id: d.id,
        name: d.name,
        description: d.description,
        icon: d.icon,
        ecosystemId,
        defaultEcosystem: d.defaultEcosystemName
      }));
    }
    return JumoProductTaxonomyRegistry.getAvailableDomains();
  }

  private static mapToDomainOptionItems(items: string[], domain: string, category: string): DomainOptionItem[] {
    return items.map((name, index) => ({
      id: `${domain}_${category}_${index + 1}`.toUpperCase(),
      name,
      category,
      description: `${name} tailored specifically for ${domain} operations.`,
      domain,
      complexity: index > 5 ? 'ENTERPRISE' : index > 2 ? 'ADVANCED' : 'STANDARD',
      defaultEnabled: index < 4
    }));
  }

  public static getDomainPortals(domain: string): DomainOptionItem[] {
    return this.getPortalsForDomain(domain);
  }

  public static getPortalsForDomain(domain: string): DomainOptionItem[] {
    const details = JumoProductTaxonomyRegistry.getDomainDetails(domain.toUpperCase());
    const list = details?.domain.portals || ['Executive Command Portal', 'Staff Operations Console', 'Client Self-Service Portal'];
    return this.mapToDomainOptionItems(list, domain, 'PORTALS');
  }

  public static getDepartmentsForDomain(domain: string): DomainOptionItem[] {
    const details = JumoProductTaxonomyRegistry.getDomainDetails(domain.toUpperCase());
    const list = details?.domain.departments || ['Administration', 'Operations & Logistics', 'Finance & Accounts', 'Compliance & Risk'];
    return this.mapToDomainOptionItems(list, domain, 'DEPARTMENTS');
  }

  public static getModulesForDomain(domain: string): DomainOptionItem[] {
    const details = JumoProductTaxonomyRegistry.getDomainDetails(domain.toUpperCase());
    const list = details?.domain.modules || ['Core Workflow Ledger', 'Access Control & RBAC', 'Audit Trail Engine'];
    return this.mapToDomainOptionItems(list, domain, 'MODULES');
  }

  public static getComponentsForDomain(domain: string): DomainOptionItem[] {
    const details = JumoProductTaxonomyRegistry.getDomainDetails(domain.toUpperCase());
    const list = details?.domain.components || ['Dashboard KPI Card', 'Audit Event Table', 'Workflow State Inspector'];
    return this.mapToDomainOptionItems(list, domain, 'COMPONENTS');
  }

  public static getWorkflowsForDomain(domain: string): DomainOptionItem[] {
    const details = JumoProductTaxonomyRegistry.getDomainDetails(domain.toUpperCase());
    const list = details?.domain.workflows || ['Standard Intake Flow', 'Multi-Stage Approval Flow', 'Audit Settlement Flow'];
    return this.mapToDomainOptionItems(list, domain, 'WORKFLOWS');
  }

  public static getFormsForDomain(domain: string): DomainOptionItem[] {
    const details = JumoProductTaxonomyRegistry.getDomainDetails(domain.toUpperCase());
    const list = details?.domain.forms || ['Entity Registration Form', 'Approval Voucher Form', 'Incident Report Form'];
    return this.mapToDomainOptionItems(list, domain, 'FORMS');
  }

  public static getReportsForDomain(domain: string): DomainOptionItem[] {
    const details = JumoProductTaxonomyRegistry.getDomainDetails(domain.toUpperCase());
    const list = details?.domain.reports || ['Daily Operations Summary', 'Financial Trial Balance', 'Compliance Audit Report'];
    return this.mapToDomainOptionItems(list, domain, 'REPORTS');
  }

  public static getAICapabilitiesForDomain(domain: string): DomainOptionItem[] {
    const details = JumoProductTaxonomyRegistry.getDomainDetails(domain.toUpperCase());
    const list = details?.domain.aiCapabilities || ['Anomaly Detection Agent', 'Smart Schedule Optimizer', 'Policy Compliance Checker'];
    return this.mapToDomainOptionItems(list, domain, 'AI_CAPABILITIES');
  }

  public static getIntegrationsForDomain(domain: string): DomainOptionItem[] {
    const details = JumoProductTaxonomyRegistry.getDomainDetails(domain.toUpperCase());
    const list = details?.domain.integrations || ['FAAP Payment Gateway', 'National Biometric ID System', 'Ministry Reporting Bridge'];
    return this.mapToDomainOptionItems(list, domain, 'INTEGRATIONS');
  }

  /**
   * Translates human-friendly guided selections into an authoritative
   * ImplementationGradeSpecificationContract suitable for the manufacturing pipeline.
   */
  public static synthesizeSpecificationContract(params: {
    productName?: string;
    organizationName?: string;
    productVersion?: string;
    operatingOrganization?: string;
    ecosystemClassification?: ProductClassification;
    domain: string;
    capacityProfileId?: string;
    capacityTier?: string;
    tenancyProfileId?: string;
    tenancyTier?: string;
    infrastructureProfileId?: string;
    infrastructureTier?: string;
    selectedPortals?: string[];
    selectedDepartments?: string[] | any;
    selectedModules?: string[];
    selectedWorkflows?: string[];
    selectedAICapabilities?: string[];
    selectedIntegrations?: string[];
    additionalRequirements?: string;
    experienceSettings?: any;
    aiSettings?: any;
    localizationSettings?: any;
    accessibilitySettings?: any;
    communicationSettings?: any;
    deviceSettings?: any;
    securitySettings?: any;
  }): ImplementationGradeSpecificationContract {
    const capId = params.capacityProfileId || params.capacityTier;
    const cap = this.CAPACITY_PROFILES.find(c => c.id === capId || c.tier === capId) || this.CAPACITY_PROFILES[1];
    const tenId = params.tenancyProfileId || params.tenancyTier;
    const ten = this.TENANCY_PROFILES.find(t => t.id === tenId) || this.TENANCY_PROFILES[0];
    const infId = params.infrastructureProfileId || params.infrastructureTier;
    const inf = this.INFRASTRUCTURE_PROFILES.find(i => i.id === infId) || this.INFRASTRUCTURE_PROFILES[0];

    const details = JumoProductTaxonomyRegistry.getDomainDetails(params.domain.toUpperCase());
    const classification: ProductClassification = params.ecosystemClassification || details?.ecosystemId || 'ERP_ECOSYSTEM';

    const name = params.productName || params.organizationName || `${params.domain} Enterprise System`;
    const org = params.operatingOrganization || params.organizationName || name;
    const productId = `PROD-${name.toUpperCase().replace(/[^A-Z0-9]/g, '-')}-${Date.now().toString(36).toUpperCase()}`;

    // Reconciliation: Ensure all list-based parameters are arrays
    const ensureArray = (val: any) => Array.isArray(val) ? val : (typeof val === 'string' && val.length > 0 ? [val] : []);
    
    const departments = ensureArray(params.selectedDepartments);
    const portals = ensureArray(params.selectedPortals);
    const modules = ensureArray(params.selectedModules);
    const integrations = ensureArray(params.selectedIntegrations);
    const aiCaps = ensureArray(params.selectedAICapabilities);

    const exp = params.experienceSettings || {};
    const ai = params.aiSettings || {};
    const loc = params.localizationSettings || {};
    const acc = params.accessibilitySettings || {};
    const comm = params.communicationSettings || {};
    const dev = params.deviceSettings || {};
    const sec = params.securitySettings || {};

    const contract: ImplementationGradeSpecificationContract = {
      identity: {
        productId,
        productName: name,
        tenantName: org,
        productClassification: classification,
        productClass: 'ENTERPRISE_CORE',
        brandIdentity: {
          primaryColor: '#2563eb',
          typography: 'Inter, sans-serif'
        },
        organizationIdentity: org,
        publicFacingName: name,
        internalSystemIdentity: productId,
        productVersion: params.productVersion || '1.0.0',
        productDescription: params.additionalRequirements || `Sovereign ${params.domain} system designed for ${name}.`,
        productPurpose: params.additionalRequirements || `Sovereign ${params.domain} system designed for ${name}.`,
        targetAudience: 'Institutional Workforce & Public Citizens',
        geographicScope: 'NATIONAL',
        operatingJurisdictions: ['NATIONAL_SOVEREIGN'],
      },
      businessSpecification: {
        tenancyModel: ten.tenantModel,
        tenantHierarchy: ten.hierarchyType,
        organizationHierarchy: departments.length > 0 ? departments.join(' -> ') : 'Corporate -> Division -> Unit',
        businessProcesses: params.selectedWorkflows || ['Standard Intake'],
        operatingCalendars: 'Standard Gregorian',
        capacity: {
          usersCount: cap.usersCount,
          concurrentUsersCount: cap.concurrentUsersCount,
          transactionsPerSecond: 150,
          storageGb: cap.storageGb
        }
      },
      domainSpecification: {
        sector: params.domain,
        domainRequirements: modules,
        complianceStandards: ['JUMO_SOVEREIGN_POLICY'],
        industryProtocols: ['ISO_20022']
      },
      functionalSpecification: {
        coreCapabilities: modules,
        portals: portals,
        modules: modules,
        workflows: params.selectedWorkflows || [],
        automationLevel: 'SEMI_AUTONOMOUS',
        reportingRequirements: ['Daily Summary', 'Audit Ledger']
      },
      digitalExperience: {
        publicExperience: {
          enabled: exp.publicExperienceEnabled ?? true,
          landingPage: {
            pagePurpose: 'Discovery and Public Service Access',
            heroTitle: exp.heroTitle || `Welcome to ${name}`,
            heroSubtitle: exp.heroSubtitle || 'Sovereign Digital Services',
            primaryCTA: 'Get Started',
            secondaryCTAs: [],
            featuredServices: true,
            sections: ['Hero', 'Services', 'News', 'FAQ']
          },
          serviceDiscovery: {
            catalogEnabled: exp.serviceDiscoveryEnabled ?? true,
            categories: [params.domain],
            searchEnabled: true
          },
          footer: {
            links: ['About', 'Contact', 'Support'],
            socialEnabled: true,
            legalLinks: ['Privacy Policy', 'Terms of Service']
          }
        },
        authenticatedExperience: {
          onboardingRequired: true,
          dashboardLayout: exp.dashboardLayout || 'GRID',
          workspaceTheme: 'MODERN',
          navigationModel: exp.navigationModel || 'SIDEBAR'
        },
        headerArchitecture: {
          brandLogoEnabled: true,
          searchEnabled: true,
          notificationsEnabled: true,
          accountSwitching: true,
          languageSelection: true,
          contextSwitching: true
        },
        navigationArchitecture: {
          primaryNav: portals,
          secondaryNav: ['Settings', 'Profile'],
          breadcrumbs: true,
          roleAware: true
        },
        designSystem: {
          typography: 'Inter',
          density: 'STANDARD',
          radius: 16
        },
        advertisingEnabled: exp.advertisingEnabled ?? false
      },
      aiExperience: {
        publicAssistant: {
          enabled: ai.publicAssistantEnabled ?? true,
          assistantName: ai.assistantName || 'Sovereign Guide',
          knowledgeScope: ai.assistantKnowledgeScope || [params.domain],
          welcomeBehavior: 'How can I assist you with our services today?'
        },
        authenticatedAssistant: {
          enabled: ai.authenticatedAssistantEnabled ?? true,
          persona: 'ANALYST',
          tools: ['Data Retrieval', 'Workflow Automation']
        },
        domainAssistant: {
          enabled: true,
          domainFocus: params.domain
        },
        administrativeAssistant: {
          enabled: true
        },
        safetyGuardrails: ['Privacy Preserving', 'Context Bound']
      },
      localization: {
        defaultLanguage: loc.defaultLanguage || 'English',
        supportedLanguages: loc.supportedLanguages || ['English'],
        locale: 'en-US',
        dateFormat: 'YYYY-MM-DD',
        numberFormat: 'STANDARD',
        currency: 'USD',
        timezone: 'UTC',
        rtlSupport: false
      },
      accessibility: {
        targetStandard: acc.accessibilityTarget || 'WCAG_AA',
        keyboardNavigation: true,
        screenReaderSupport: true,
        reducedMotionSupport: true,
        contrastTarget: '4.5:1'
      },
      securityExperience: {
        authenticationMethods: ['OIDC', 'SAML'],
        mfaRequired: sec.mfaRequired ?? true,
        identityVerification: sec.identityVerificationRequired ?? false,
        privacyControlsEnabled: sec.privacyControlsEnabled ?? true,
        sessionManagement: '30_MIN_INACTIVITY',
        termsAcceptanceRequired: true
      },
      communication: {
        channels: comm.communicationChannels || ['IN_APP', 'EMAIL'],
        templatesRequired: true,
        notificationPreferences: true,
        criticalAlertsEnabled: true
      },
      deviceExperience: {
        targets: dev.deviceTargets || ['DESKTOP', 'MOBILE'],
        offlineCapability: dev.offlineCapability ?? false,
        lowBandwidthOptimization: true
      },
      operational: {
        deploymentType: inf.deploymentType as any,
        availabilityTarget: cap.availabilityTargetPercentage,
        backupPolicy: 'DAILY_REPLICATED',
        monitoringRequirements: ['Performance', 'Uptime', 'Security'],
        analyticsExperience: {
          usageAnalytics: true,
          performanceMonitoring: true,
          errorTracking: true
        }
      },
      manufacturing: {
        requiredStudios: ['Specification', 'Engineering', 'Manufacturing'],
        verificationGates: ['Architecture Approval', 'Final Assembly Review'],
        priority: 'NORMAL'
      }
    };

    return contract;
  }
}
