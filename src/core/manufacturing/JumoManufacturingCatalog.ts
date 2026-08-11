import {
  JumoVerificationDetectionRegistry,
  DetectionFamily,
} from './quality/JumoVerificationDetectionRegistry';

import {
  JumoEngineerAssignmentEngine,
} from './engineering/JumoEngineerAssignmentEngine';

import {
  JumoApplicationTestingEngine,
} from './testing/JumoApplicationTestingEngine';

import {
  JumoEndToEndTestingEngine,
} from './testing/JumoEndToEndTestingEngine';

import {
  JumoCloudQualityProvisioningEngine,
} from './quality/JumoCloudQualityProvisioningEngine';

import {
  JumoDigitalSpecificationEngine,
} from './specification/JumoDigitalSpecificationEngine';

export interface ManufacturingCatalogStats {
  detectionCount: number;
  automatedDetectionCount: number;
  blockingDetectionCount: number;
  engineerFamilyCount: number;
  applicationTestCount: number;
  endToEndScenarioCount: number;
  cloudRequirementCount: number;
  specificationSchemaCount: number;
}

const DETECTION_FAMILIES: Array<{
  family: DetectionFamily;
  engineerFamily: string;
  areas: string[];
}> = [
  {
    family: 'SPECIFICATION',
    engineerFamily: 'specification-engineering',
    areas: [
      'identity',
      'business-profile',
      'organization',
      'branches',
      'departments',
      'staffing',
      'capacity',
      'contacts',
      'public-information',
      'commercial-package',
    ],
  },
  {
    family: 'ARCHITECTURE',
    engineerFamily: 'architecture-engineering',
    areas: [
      'architecture-contract',
      'runtime',
      'domain',
      'ecosystem',
      'erp',
      'tenant',
      'workspace',
      'factory',
      'registry',
      'lifecycle',
    ],
  },
  {
    family: 'LAYERS',
    engineerFamily: 'layer-engineering',
    areas: [
      'kernel',
      'gateway',
      'identity',
      'navigation',
      'configuration',
      'presentation',
      'domain',
      'integration',
      'data',
      'operations',
    ],
  },
  {
    family: 'COMPONENTS',
    engineerFamily: 'component-engineering',
    areas: [
      'registration',
      'dependencies',
      'contracts',
      'rendering',
      'state',
      'events',
      'permissions',
      'configuration',
      'telemetry',
      'recovery',
    ],
  },
  {
    family: 'MODULES',
    engineerFamily: 'module-engineering',
    areas: [
      'module-presence',
      'scope',
      'dependencies',
      'permissions',
      'configuration',
      'navigation',
      'data',
      'workflows',
      'integration',
      'lifecycle',
    ],
  },
  {
    family: 'NAVIGATION',
    engineerFamily: 'navigation-engineering',
    areas: [
      'routes',
      'menus',
      'workspaces',
      'portals',
      'breadcrumbs',
      'deep-links',
      'guards',
      'fallbacks',
      'mobile-navigation',
      'accessibility',
    ],
  },
  {
    family: 'CONFIGURATION',
    engineerFamily: 'configuration-engineering',
    areas: [
      'tenant-settings',
      'package-settings',
      'feature-flags',
      'workflow-settings',
      'branding-settings',
      'payment-settings',
      'security-settings',
      'integration-settings',
      'regional-settings',
      'upgrade-settings',
    ],
  },
  {
    family: 'LAYOUT',
    engineerFamily: 'layout-engineering',
    areas: [
      'information-hierarchy',
      'workspace-layout',
      'responsive-layout',
      'density',
      'forms',
      'tables',
      'dashboards',
      'portals',
      'print-layout',
      'mobile-layout',
    ],
  },
  {
    family: 'DESIGN',
    engineerFamily: 'design-engineering',
    areas: [
      'ux-consistency',
      'responsive-design',
      'component-consistency',
      'interaction',
      'typography',
      'spacing',
      'states',
      'feedback',
      'accessibility',
      'enterprise-theme',
    ],
  },
  {
    family: 'BRANDING',
    engineerFamily: 'branding-engineering',
    areas: [
      'logo',
      'logo-geometry',
      'colour-system',
      'brand-assets',
      'tenant-branding',
      'institutional-theme',
      'favicon',
      'metadata',
      'public-identity',
      'brand-consistency',
    ],
  },
  {
    family: 'PUBLIC_PLATFORM',
    engineerFamily: 'public-platform-engineering',
    areas: [
      'landing-page',
      'public-profile',
      'communications',
      'contacts',
      'addresses',
      'announcements',
      'services',
      'public-navigation',
      'registration',
      'public-security',
    ],
  },
  {
    family: 'INTEGRATION',
    engineerFamily: 'integration-engineering',
    areas: [
      'FAAP',
      'JUMO-Digital-Pay',
      'AEGIS',
      'JUMO-Cloud',
      'Treasury',
      'Identity',
      'AI',
      'notifications',
      'external-services',
      'shared-products',
    ],
  },
  {
    family: 'BACKEND',
    engineerFamily: 'backend-engineering',
    areas: [
      'API',
      'services',
      'contracts',
      'runtime',
      'queues',
      'events',
      'jobs',
      'errors',
      'persistence',
      'observability',
    ],
  },
  {
    family: 'FRONTEND',
    engineerFamily: 'frontend-engineering',
    areas: [
      'components',
      'state',
      'routes',
      'forms',
      'tables',
      'loading',
      'errors',
      'permissions',
      'responsive',
      'runtime',
    ],
  },
  {
    family: 'DATA',
    engineerFamily: 'data-engineering',
    areas: [
      'schema',
      'integrity',
      'ownership',
      'validation',
      'persistence',
      'migration',
      'backup',
      'retention',
      'recovery',
      'audit',
    ],
  },
  {
    family: 'SECURITY',
    engineerFamily: 'security-engineering',
    areas: [
      'authentication',
      'authorization',
      'tenant-isolation',
      'secrets',
      'encryption',
      'sessions',
      'audit',
      'AEGIS',
      'abuse-controls',
      'recovery',
    ],
  },
  {
    family: 'AI',
    engineerFamily: 'ai-engineering',
    areas: [
      'specification-guidance',
      'architecture-guidance',
      'detection',
      'recommendation',
      'agent-routing',
      'model-policy',
      'data-boundaries',
      'human-escalation',
      'evidence',
      'explainability',
    ],
  },
  {
    family: 'PERFORMANCE',
    engineerFamily: 'performance-engineering',
    areas: [
      'latency',
      'throughput',
      'memory',
      'CPU',
      'database',
      'network',
      'rendering',
      'concurrency',
      'scaling',
      'recovery',
    ],
  },
  {
    family: 'COMPLIANCE',
    engineerFamily: 'compliance-engineering',
    areas: [
      'governance',
      'audit',
      'records',
      'privacy',
      'financial-controls',
      'access-controls',
      'retention',
      'regional',
      'policy',
      'reporting',
    ],
  },
  {
    family: 'TESTING',
    engineerFamily: 'testing-engineering',
    areas: [
      'unit',
      'integration',
      'regression',
      'API',
      'security',
      'performance',
      'navigation',
      'configuration',
      'accessibility',
      'runtime',
    ],
  },
  {
    family: 'PROVISIONING',
    engineerFamily: 'provisioning-engineering',
    areas: [
      'preflight',
      'configuration',
      'identity',
      'database',
      'storage',
      'runtime',
      'network',
      'observability',
      'backup',
      'installation',
    ],
  },
  {
    family: 'LIFECYCLE',
    engineerFamily: 'lifecycle-engineering',
    areas: [
      'installation',
      'activation',
      'operations',
      'upgrade',
      'elevation',
      'migration',
      'backup',
      'decommission',
      'retirement',
      'archive',
    ],
  },
];

const ENGINEER_FAMILY_NAMES: Record<string, string> = {
  'specification-engineering': 'Specification Engineering',
  'architecture-engineering': 'Architecture Engineering',
  'layer-engineering': 'Architecture Layer Engineering',
  'component-engineering': 'Component Engineering',
  'module-engineering': 'Module Engineering',
  'navigation-engineering': 'Navigation Engineering',
  'configuration-engineering': 'Configuration Engineering',
  'layout-engineering': 'Layout Engineering',
  'design-engineering': 'Design & UX Engineering',
  'branding-engineering': 'Branding Engineering',
  'public-platform-engineering': 'Public Platform Engineering',
  'integration-engineering': 'Commercial Integration Engineering',
  'backend-engineering': 'Backend Engineering',
  'frontend-engineering': 'Frontend Engineering',
  'data-engineering': 'Data Engineering',
  'security-engineering': 'Security Engineering',
  'ai-engineering': 'AI Engineering',
  'performance-engineering': 'Performance Engineering',
  'compliance-engineering': 'Compliance Engineering',
  'testing-engineering': 'Application Testing Engineering',
  'provisioning-engineering': 'Provisioning Engineering',
  'lifecycle-engineering': 'Lifecycle Engineering',
};

const DEFAULT_SCHEMA = {
  id: 'universal-enterprise-specification',
  version: '1.0.0',
  name: 'Universal Enterprise Digital Specification',
  description:
    'Guided specification for manufacturing an enterprise, ERP or commercial JUMO product.',
  fields: [
    {
      id: 'enterpriseName',
      label: 'Enterprise Name',
      type: 'TEXT' as const,
      required: true,
    },
    {
      id: 'enterpriseType',
      label: 'Enterprise Type',
      type: 'SELECT' as const,
      required: true,
    },
    {
      id: 'packageClass',
      label: 'Commercial Package',
      type: 'SELECT' as const,
      required: true,
    },
    {
      id: 'industry',
      label: 'Industry / Ecosystem',
      type: 'SELECT' as const,
      required: true,
    },
    {
      id: 'branches',
      label: 'Number of Branches',
      type: 'NUMBER' as const,
    },
    {
      id: 'departments',
      label: 'Departments',
      type: 'STRUCTURE' as const,
    },
    {
      id: 'administrativeStaff',
      label: 'Administrative Staff',
      type: 'NUMBER' as const,
    },
    {
      id: 'contacts',
      label: 'Public Contacts',
      type: 'CONTACT' as const,
      required: true,
    },
    {
      id: 'publicAddresses',
      label: 'Public Addresses',
      type: 'ADDRESS' as const,
    },
    {
      id: 'logo',
      label: 'Approved Logo',
      type: 'ASSET' as const,
    },
    {
      id: 'enterpriseColours',
      label: 'Enterprise Colours',
      type: 'MULTI_SELECT' as const,
    },
    {
      id: 'paymentRequirements',
      label: 'Payment Requirements',
      type: 'CAPABILITY' as const,
    },
    {
      id: 'accountingRequirements',
      label: 'Accounting Requirements',
      type: 'CAPABILITY' as const,
    },
    {
      id: 'treasuryRequirements',
      label: 'Treasury Requirements',
      type: 'CAPABILITY' as const,
    },
    {
      id: 'securityRequirements',
      label: 'Security Requirements',
      type: 'CAPABILITY' as const,
    },
    {
      id: 'cloudRequirements',
      label: 'Cloud Requirements',
      type: 'CAPABILITY' as const,
    },
    {
      id: 'aiRequirements',
      label: 'AI Requirements',
      type: 'CAPABILITY' as const,
    },
    {
      id: 'offlineRequired',
      label: 'Offline Operation Required',
      type: 'BOOLEAN' as const,
    },
    {
      id: 'cloudOnlyOperation',
      label: 'Cloud Only Operation',
      type: 'BOOLEAN' as const,
    },
    {
      id: 'requiresGlobalCapabilities',
      label: 'Global Capabilities Required',
      type: 'BOOLEAN' as const,
    },
  ],
};

export function registerJumoManufacturingCatalog(
  detections: JumoVerificationDetectionRegistry,
  engineers: JumoEngineerAssignmentEngine,
  applicationTesting: JumoApplicationTestingEngine,
  e2eTesting: JumoEndToEndTestingEngine,
  cloud: JumoCloudQualityProvisioningEngine,
  specification: JumoDigitalSpecificationEngine,
): ManufacturingCatalogStats {
  /*
   * Each verification family contains multiple independent detection
   * definitions. The registry determines the actual total; there is
   * deliberately no hardcoded detection ceiling.
   */
  for (const family of DETECTION_FAMILIES) {
    engineers.registerEngineerFamily({
      id: family.engineerFamily,
      name:
        ENGINEER_FAMILY_NAMES[family.engineerFamily] ||
        family.engineerFamily,
      specializations: family.areas,
      enabled: true,
      metadata: {
        autonomousReviewSlots: 10,
        assignmentMode: 'SPECIALIST',
        automatedGuidance: true,
      },
    });

    for (const area of family.areas) {
      const detectionId =
        `${family.family.toLowerCase()}-${area
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')}`;

      detections.register({
        id: detectionId,
        family: family.family,
        name: `${family.family} — ${area}`,
        description:
          `Automatically verify ${area} within the ${family.family.toLowerCase()} verification family.`,
        severity:
          family.family === 'SECURITY' ||
          family.family === 'PROVISIONING' ||
          family.family === 'ARCHITECTURE'
            ? 'BLOCKING'
            : 'ERROR',
        blocking:
          family.family !== 'COMPLIANCE' ||
          area === 'financial-controls',
        evidenceType: 'AUTOMATED_RUNTIME_EVIDENCE',
        engineerFamily: family.engineerFamily,
        automated: true,
        enabled: true,
        metadata: {
          verificationMode: 'CONTINUOUS',
          aiGuided: true,
          architectureAware: true,
          specialistAssignment: true,
        },
      });
    }
  }

  applicationTesting.register({
    id: 'application-functional-runtime',
    type: 'FUNCTIONAL',
    name: 'Application Functional Runtime Test',
    description:
      'Verify that the manufactured application executes its approved functional contract.',
    required: true,
  });

  applicationTesting.register({
    id: 'application-navigation',
    type: 'NAVIGATION',
    name: 'Application Navigation Test',
    description:
      'Verify every approved navigation path, route, portal and workspace.',
    required: true,
  });

  applicationTesting.register({
    id: 'application-configuration',
    type: 'CONFIGURATION',
    name: 'Configuration Runtime Test',
    description:
      'Verify that configurable behaviour operates without source-code modification.',
    required: true,
  });

  applicationTesting.register({
    id: 'application-security',
    type: 'SECURITY',
    name: 'Application Security Test',
    description:
      'Verify authentication, authorization, tenant isolation and security boundaries.',
    required: true,
  });

  applicationTesting.register({
    id: 'application-integration',
    type: 'INTEGRATION',
    name: 'Commercial Integration Test',
    description:
      'Verify configurable shared-product integrations and contracts.',
    required: true,
  });

  applicationTesting.register({
    id: 'application-regression',
    type: 'REGRESSION',
    name: 'Application Regression Test',
    description:
      'Verify approved functionality remains intact after changes and upgrades.',
    required: true,
  });

  applicationTesting.register({
    id: 'application-performance',
    type: 'PERFORMANCE',
    name: 'Application Performance Test',
    description:
      'Verify runtime performance against the approved architecture profile.',
    required: true,
  });

  applicationTesting.register({
    id: 'application-api',
    type: 'API',
    name: 'Application API Contract Test',
    description:
      'Verify API contracts, responses, errors and authorization.',
    required: true,
  });

  applicationTesting.register({
    id: 'application-accessibility',
    type: 'ACCESSIBILITY',
    name: 'Application Accessibility Test',
    description:
      'Verify accessible navigation, controls, forms and content.',
    required: true,
  });

  applicationTesting.register({
    id: 'application-unit',
    type: 'UNIT',
    name: 'Application Unit Test',
    description:
      'Verify isolated application components and services.',
    required: true,
  });

  const e2eScenarios = [
    [
      'specification-to-manufacturing',
      'Specification to Manufacturing',
      [
        'capture specification',
        'AI completeness analysis',
        'architecture generation',
        'manufacturing verification',
      ],
    ],
    [
      'public-to-authenticated-workspace',
      'Public Portal to Authenticated Workspace',
      [
        'open public platform',
        'authenticate',
        'resolve identity',
        'resolve workspace',
      ],
    ],
    [
      'configuration-to-runtime',
      'Configuration to Runtime',
      [
        'load configuration',
        'apply configuration',
        'start runtime',
        'verify configured behaviour',
      ],
    ],
    [
      'payment-to-accounting',
      'Payment to Accounting',
      [
        'initiate payment',
        'process payment',
        'record financial event',
        'reconcile accounting',
      ],
    ],
    [
      'security-to-audit',
      'Security to Audit',
      [
        'authenticate',
        'authorize',
        'execute protected operation',
        'record audit evidence',
      ],
    ],
    [
      'upgrade-to-verification',
      'Upgrade to Verification',
      [
        'apply approved upgrade',
        'run regression',
        'run architecture verification',
        'produce engineering report',
      ],
    ],
    [
      'provisioning-to-operations',
      'Provisioning to Operations',
      [
        'pass provisioning gate',
        'configure runtime',
        'activate application',
        'start operational telemetry',
      ],
    ],
  ] as const;

  for (const [id, name, steps] of e2eScenarios) {
    e2eTesting.registerScenario({
      id,
      name,
      description:
        `End-to-end verification journey: ${name}.`,
      steps: [...steps],
      required: true,
    });
  }

  for (const category of [
    'RUNTIME',
    'DATABASE',
    'STORAGE',
    'NETWORK',
    'IDENTITY',
    'CONFIGURATION',
    'OBSERVABILITY',
    'BACKUP',
    'RECOVERY',
    'SECURITY',
    'DEPLOYMENT',
    'OFFLINE',
    'CAPACITY',
  ] as const) {
    cloud.registerRequirement({
      id: `cloud-quality-${category.toLowerCase()}`,
      category,
      name: `JUMO Cloud ${category} Quality`,
      required: true,
      metadata: {
        automatedPreflight: true,
        evidenceRequired: true,
        architectureAware: true,
      },
    });
  }

  specification.registerSchema(DEFAULT_SCHEMA);

  return {
    detectionCount: detections.count(),
    automatedDetectionCount: detections.automated().length,
    blockingDetectionCount: detections.blocking().length,
    engineerFamilyCount: engineers.listEngineerFamilies().length,
    applicationTestCount: applicationTesting.listDefinitions().length,
    endToEndScenarioCount: e2eTesting.listScenarios().length,
    cloudRequirementCount: cloud.listRequirements().length,
    specificationSchemaCount: specification.listSchemas().length,
  };
}
