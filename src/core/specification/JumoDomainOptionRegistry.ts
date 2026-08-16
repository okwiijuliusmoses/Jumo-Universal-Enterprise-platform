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
    const workflows = ensureArray(params.selectedWorkflows);

    const timestamp = new Date().toISOString();
    const t = <T>(value: T, source: any = 'HUMAN_SELECTED'): any => ({
      value,
      source,
      timestamp
    });

    const contract: ImplementationGradeSpecificationContract = {
      classification: {
        ecosystem: t(classification, 'MINIMUM_STANDARD'),
        domain: t(params.domain, 'HUMAN_SELECTED'),
        secondaryDomains: t([], 'CONTEXT_GENERATED'),
        scope: t('NATIONAL', 'MINIMUM_STANDARD')
      },
      identity: {
        productId,
        productName: t(name),
        tenantName: t(org),
        productClassification: classification,
        productClass: t('ENTERPRISE_CORE', 'MINIMUM_STANDARD'),
        brandIdentity: {
          primaryColor: t('#2563eb'),
          typography: t('Inter, sans-serif')
        },
        organizationIdentity: t(org),
        publicFacingName: t(name),
        internalSystemIdentity: productId,
        productVersion: t(params.productVersion || '1.0.0'),
        productDescription: t(params.additionalRequirements || `Sovereign ${params.domain} system designed for ${name}.`),
        productPurpose: t(params.additionalRequirements || `Sovereign ${params.domain} system designed for ${name}.`),
        targetAudience: t('Institutional Workforce & Public Citizens'),
        geographicScope: t('NATIONAL'),
        operatingJurisdictions: t(['NATIONAL_SOVEREIGN']),
      },
      businessSpecification: {
        tenancyModel: t(ten.tenantModel, 'ENGINEERING_RECOMMENDED'),
        tenantHierarchy: t(ten.hierarchyType, 'ENGINEERING_RECOMMENDED'),
        organizationHierarchy: t(departments.length > 0 ? departments.join(' -> ') : 'Corporate -> Division -> Unit'),
        businessProcesses: t(workflows),
        operatingCalendars: t('Standard Gregorian'),
        capacity: {
          usersCount: t(cap.usersCount),
          concurrentUsersCount: t(cap.concurrentUsersCount),
          transactionsPerSecond: t(150, 'ENGINEERING_RECOMMENDED'),
          storageGb: t(cap.storageGb)
        }
      },
      domainSpecification: {
        sector: t(params.domain),
        domainRequirements: t(modules),
        complianceStandards: t(['JUMO_SOVEREIGN_POLICY'], 'REGULATORY_REQUIRED'),
        industryProtocols: t(['ISO_20022'], 'REGULATORY_REQUIRED')
      },
      functionalSpecification: {
        coreCapabilities: t(modules),
        portals: t(portals),
        modules: t(modules),
        workflows: t(workflows),
        automationLevel: t('SEMI_AUTONOMOUS', 'ENGINEERING_RECOMMENDED'),
        reportingRequirements: t(['Daily Summary', 'Audit Ledger'], 'MINIMUM_STANDARD')
      },
      digitalExperience: {
        publicExperience: {
          enabled: t(true),
          landingPage: {
            pagePurpose: t('Discovery and Public Service Access'),
            heroTitle: t(`Welcome to ${name}`),
            heroSubtitle: t('Sovereign Digital Services'),
            primaryCTA: t('Get Started'),
            sections: t(['Hero', 'Services', 'News', 'FAQ'])
          },
          serviceDiscovery: {
            catalogEnabled: t(true),
            categories: t([params.domain])
          }
        },
        authenticatedExperience: {
          onboardingRequired: t(true),
          dashboardLayout: t('GRID'),
          workspaceTheme: t('MODERN'),
          navigationModel: t('SIDEBAR')
        },
        designSystem: {
          typography: t('Inter'),
          density: t('STANDARD'),
          radius: t(16)
        }
      },
      aiExperience: {
        publicAssistant: {
          enabled: t(true),
          assistantName: t('Sovereign Guide'),
          knowledgeScope: t([params.domain])
        },
        authenticatedAssistant: {
          enabled: t(true),
          persona: t('ANALYST'),
          tools: t(['Data Retrieval', 'Workflow Automation'])
        },
        safetyGuardrails: t(['Privacy Preserving', 'Context Bound'], 'REGULATORY_REQUIRED')
      },
      localization: {
        defaultLanguage: t('English'),
        supportedLanguages: t(['English']),
        timezone: t('UTC'),
        rtlSupport: t(false)
      },
      accessibility: {
        targetStandard: t('WCAG_AA', 'REGULATORY_REQUIRED'),
        screenReaderSupport: t(true),
        contrastTarget: t('4.5:1', 'REGULATORY_REQUIRED')
      },
      securityExperience: {
        authenticationMethods: t(['OIDC', 'SAML'], 'ENGINEERING_RECOMMENDED'),
        mfaRequired: t(true, 'REGULATORY_REQUIRED'),
        identityVerification: t(false),
        privacyControlsEnabled: t(true),
        termsAcceptanceRequired: t(true, 'REGULATORY_REQUIRED')
      },
      communication: {
        channels: t(['IN_APP', 'EMAIL']),
        targets: t(['DESKTOP', 'MOBILE'])
      },
      dataSpecification: {
        entities: t(['User', 'Profile', 'AuditLog'], 'CONTEXT_GENERATED'),
        classification: t('INTERNAL', 'CONTEXT_GENERATED'),
        retentionPolicy: t('7_YEARS', 'REGULATORY_REQUIRED'),
        residencyRequirements: t('NATIONAL_ONLY', 'REGULATORY_REQUIRED')
      },
      integrationSpecification: {
        externalSystems: t(integrations),
        apiProtocols: t(['REST', 'GRAPHQL']),
        webhookEvents: t(['ENTITY_CREATED', 'WORKFLOW_STARTED'])
      },
      financialSpecification: {
        currency: t('USD'),
        paymentGateways: t(['STRIPE', 'JUMO_PAY']),
        taxationModels: t(['STANDARD_VAT']),
        billingIntervals: t(['MONTHLY'])
      },
      workflowSpecification: {
        businessProcesses: t(workflows),
        automationTriggers: t(['TIME_BASED', 'EVENT_BASED']),
        approvalChains: t(['ADMIN_APPROVAL'])
      },
      analyticsSpecification: {
        kpis: t(['User Engagement', 'Success Rate']),
        standardReports: t(['Monthly Activity', 'Security Audit']),
        dashboards: t(['Operational Overview'])
      },
      contentSpecification: {
        knowledgeBases: t(['System Documentation']),
        documentTypes: t(['PDF', 'DOCX'])
      },
      engagementSpecification: {
        campaignTypes: t([]),
        adPlacements: t([]),
        loyaltyPrograms: t(false)
      },
      searchSpecification: {
        searchScopes: t(['GLOBAL', 'MODULE']),
        indexingFrequency: t('REAL_TIME'),
        aiSearchEnabled: t(true)
      },
      supportSpecification: {
        supportChannels: t(['EMAIL', 'HELP_CENTER']),
        slaLevels: t(['P1_4H', 'P2_24H']),
        helpPortalEnabled: t(true)
      },
      complianceSpecification: {
        regulatoryFrameworks: t(['GDPR', 'ISO_27001']),
        auditRequirements: t(['QUARTERLY_EXTERNAL']),
        dataGovernancePolicy: t('SOVEREIGN_DATA_POLICY')
      },
      deploymentSpecification: {
        targets: t(['CLOUD_CLUSTER']),
        regions: t(['PRIMARY_REGION']),
        infrastructureRequirements: t('HIGH_AVAILABILITY')
      },
      verificationSpecification: {
        acceptanceCriteria: t(['ALL_TESTS_PASS', 'SECURITY_SCAN_CLEAR']),
        verificationProtocols: t(['MANUAL_HUMAN_SIGN_OFF']),
        automatedTestsRequired: t(true)
      },
      manufacturingSpecification: {
        manufacturingProfile: t('STANDARD_ERP'),
        qualityStandards: t(['JUMO_Q1']),
        priority: t('NORMAL')
      },
      certificationSpecification: {
        releaseGates: t(['SECURITY_GATE', 'LEGAL_GATE']),
        certificationTargets: t(['SOC2_TYPE_2']),
        humanSignOffRequired: t(true)
      },
      evolutionSpecification: {
        upgradePolicy: t('SCHEDULED'),
        featureEvolutionPath: t('CONTINUOUS'),
        maintenanceWindows: t('SUN_0200_0400')
      },
      humanGovernance: {
        mandatoryApprovalGates: t(['ARCHITECTURE_APPROVAL', 'MANUFACTURING_APPROVAL']),
        gatekeepers: t(['CHIEF_ARCHITECT', 'SOVEREIGN_GOVERNOR']),
        rejectionWorkflows: t('RE-DESIGN_REQUIRED')
      },
      priorities: {
        criticalRequirements: t(['DATA_SOVEREIGNTY', 'ZERO_TRUST']),
        technicalConstraints: t(['LATENCY_UNDER_100MS']),
        budgetaryConstraints: t('NOT_SPECIFIED')
      },
      traceability: {
        mappingRequirement: t('DEEP'),
        auditTrailEnabled: t(true)
      },
      metadata: {
        createdAt: timestamp,
        updatedAt: timestamp,
        version: 1,
        specificationCompleteness: 100
      }
    };

    return contract;
  }
}
