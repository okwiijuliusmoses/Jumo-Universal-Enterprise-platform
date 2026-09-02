/**
 * JUMO UEOS
 * AI Lifecycle Verification & Detection Registry
 *
 * Governing principle:
 * AI guides the product from specification through retirement.
 *
 * Detection count is NOT a fixed architectural limit.
 * The initial catalogue contains 220+ detection rules and may grow dynamically.
 */

export type JumoAILifecycleStage =
  | 'SPECIFICATION'
  | 'ARCHITECTURE'
  | 'PROVISIONING'
  | 'VERIFICATION'
  | 'TESTING'
  | 'PACKAGING'
  | 'DEPLOYMENT'
  | 'CONFIGURATION'
  | 'OPERATION'
  | 'MONITORING'
  | 'UPGRADE'
  | 'EXPANSION'
  | 'MAINTENANCE'
  | 'AUDIT'
  | 'RETIREMENT';

export type JumoDetectionSeverity =
  | 'INFO'
  | 'WARNING'
  | 'MAJOR'
  | 'CRITICAL'
  | 'BLOCKING';

export type JumoDetectionCategory =
  | 'SPECIFICATION'
  | 'ARCHITECTURE'
  | 'PRODUCT'
  | 'ERP'
  | 'ECOSYSTEM'
  | 'COMPONENT'
  | 'MODULE'
  | 'NAVIGATION'
  | 'CONFIGURATION'
  | 'UI_UX'
  | 'BRANDING'
  | 'PUBLIC_PLATFORM'
  | 'BACKEND'
  | 'FRONTEND'
  | 'DATA'
  | 'INTEGRATION'
  | 'SECURITY'
  | 'AI'
  | 'TESTING'
  | 'PERFORMANCE'
  | 'DEPLOYMENT'
  | 'LIFECYCLE';

export interface JumoAIVerificationDetection {
  id: string;
  category: JumoDetectionCategory;
  name: string;
  description: string;
  lifecycleStages: JumoAILifecycleStage[];
  severity: JumoDetectionSeverity;
  blocking: boolean;
  automated: boolean;
  architectureRequired: boolean;
  evidenceRequired: boolean;
  engineerArea: string;
  correctionRequired: boolean;
}

const ALL_LIFECYCLE_STAGES: JumoAILifecycleStage[] = [
  'SPECIFICATION',
  'ARCHITECTURE',
  'PROVISIONING',
  'VERIFICATION',
  'TESTING',
  'PACKAGING',
  'DEPLOYMENT',
  'CONFIGURATION',
  'OPERATION',
  'MONITORING',
  'UPGRADE',
  'EXPANSION',
  'MAINTENANCE',
  'AUDIT',
  'RETIREMENT'
];

/**
 * Detection families.
 *
 * 22 families x 10 detection rules = 220 baseline detections.
 * Additional rules can be registered dynamically.
 */
const DETECTION_FAMILIES: Array<{
  category: JumoDetectionCategory;
  engineerArea: string;
  rules: string[];
}> = [
  {
    category: 'SPECIFICATION',
    engineerArea: 'Specification Engineering',
    rules: [
      'Required specification field missing',
      'Specification field contains contradictory information',
      'Enterprise identity incomplete',
      'Enterprise structure incomplete',
      'Branch information incomplete',
      'Department information incomplete',
      'Administrative structure incomplete',
      'Subscription/package requirements incomplete',
      'Public platform requirements incomplete',
      'Specification requires AI clarification'
    ]
  },
  {
    category: 'ARCHITECTURE',
    engineerArea: 'Architecture Engineering',
    rules: [
      'Architecture layer missing',
      'Architecture dependency missing',
      'Architecture boundary violation',
      'Unauthorized architecture change',
      'Orphaned architecture component',
      'Duplicate architecture capability',
      'Architecture contract violation',
      'Architecture version mismatch',
      'Architecture-to-implementation mismatch',
      'Architecture upgrade compatibility failure'
    ]
  },
  {
    category: 'PRODUCT',
    engineerArea: 'Product Engineering',
    rules: [
      'Product registry entry missing',
      'Product identity mismatch',
      'Product lifecycle state invalid',
      'Product package definition incomplete',
      'Product capability missing',
      'Product dependency missing',
      'Product entitlement mismatch',
      'Product integration declaration missing',
      'Product verification profile missing',
      'Product retirement policy missing'
    ]
  },
  {
    category: 'ERP',
    engineerArea: 'ERP Engineering',
    rules: [
      'ERP core capability missing',
      'ERP domain structure incomplete',
      'ERP portal missing',
      'ERP department capability missing',
      'ERP branch capability missing',
      'ERP workflow missing',
      'ERP reporting capability missing',
      'ERP governance capability missing',
      'ERP configuration incomplete',
      'ERP architecture completeness failure'
    ]
  },
  {
    category: 'ECOSYSTEM',
    engineerArea: 'Ecosystem Engineering',
    rules: [
      'Ecosystem registry entry missing',
      'Ecosystem template missing',
      'Ecosystem ERP factory mapping missing',
      'Ecosystem dependency invalid',
      'Ecosystem capability incomplete',
      'Ecosystem integration incomplete',
      'Ecosystem package mismatch',
      'Ecosystem governance missing',
      'Ecosystem navigation incomplete',
      'Ecosystem verification profile missing'
    ]
  },
  {
    category: 'COMPONENT',
    engineerArea: 'Component Engineering',
    rules: [
      'Required component missing',
      'Component registered but not implemented',
      'Component implemented but not registered',
      'Component dependency missing',
      'Component interface mismatch',
      'Component contract violation',
      'Component duplicated',
      'Component orphaned',
      'Component version mismatch',
      'Component regression detected'
    ]
  },
  {
    category: 'MODULE',
    engineerArea: 'Module Engineering',
    rules: [
      'Required module missing',
      'Module registered but static',
      'Module has placeholder implementation',
      'Module dependency missing',
      'Module workflow incomplete',
      'Module permission mapping missing',
      'Module configuration missing',
      'Module integration missing',
      'Module test coverage insufficient',
      'Module regression detected'
    ]
  },
  {
    category: 'NAVIGATION',
    engineerArea: 'Navigation Engineering',
    rules: [
      'Required route missing',
      'Route points to nonexistent component',
      'Navigation entry missing',
      'Navigation entry orphaned',
      'Portal navigation incomplete',
      'Role navigation incomplete',
      'Breadcrumb/navigation state failure',
      'Deep-link failure',
      'Mobile navigation failure',
      'Navigation architecture mismatch'
    ]
  },
  {
    category: 'CONFIGURATION',
    engineerArea: 'Configuration Engineering',
    rules: [
      'Required configuration missing',
      'Invalid configuration value',
      'Configuration schema mismatch',
      'Configuration dependency missing',
      'Tenant configuration incomplete',
      'ERP configuration incomplete',
      'Package configuration mismatch',
      'Environment configuration mismatch',
      'Configuration migration failure',
      'Configuration drift detected'
    ]
  },
  {
    category: 'UI_UX',
    engineerArea: 'UI/UX Engineering',
    rules: [
      'Required page missing',
      'Static card detected',
      'Placeholder UI detected',
      'Broken responsive layout',
      'Mobile usability failure',
      'Accessibility violation',
      'Inconsistent component layout',
      'Theme inconsistency',
      'Form usability failure',
      'UI architecture mismatch'
    ]
  },
  {
    category: 'BRANDING',
    engineerArea: 'Brand Engineering',
    rules: [
      'Approved logo missing',
      'Unauthorized logo variation',
      'Logo geometry violation',
      'Logo placement violation',
      'Enterprise colour violation',
      'Typography inconsistency',
      'Brand theme mismatch',
      'Public identity mismatch',
      'Product identity mismatch',
      'Branding architecture violation'
    ]
  },
  {
    category: 'PUBLIC_PLATFORM',
    engineerArea: 'Public Platform Engineering',
    rules: [
      'Public landing page missing',
      'Public enterprise name missing',
      'Public communication address missing',
      'Public contact information missing',
      'Public service information missing',
      'Public announcement capability missing',
      'Public registration flow failure',
      'Public authentication boundary failure',
      'Public branding mismatch',
      'Public-to-private boundary violation'
    ]
  },
  {
    category: 'BACKEND',
    engineerArea: 'Backend Engineering',
    rules: [
      'Required backend service missing',
      'API endpoint missing',
      'API contract mismatch',
      'Backend route failure',
      'Service dependency failure',
      'Persistence operation failure',
      'Error handling failure',
      'Authorization enforcement missing',
      'Backend test failure',
      'Backend/frontend contract mismatch'
    ]
  },
  {
    category: 'FRONTEND',
    engineerArea: 'Frontend Engineering',
    rules: [
      'Required frontend application missing',
      'Frontend route failure',
      'Frontend service binding missing',
      'Frontend/backend data mismatch',
      'State management failure',
      'Loading state missing',
      'Error state missing',
      'Empty state missing',
      'Frontend test failure',
      'Frontend regression detected'
    ]
  },
  {
    category: 'DATA',
    engineerArea: 'Data Engineering',
    rules: [
      'Required schema missing',
      'Schema mismatch',
      'Required field missing',
      'Invalid data type',
      'Data integrity violation',
      'Data lineage missing',
      'Data ownership missing',
      'Retention policy missing',
      'Data quality failure',
      'Unauthorized data access'
    ]
  },
  {
    category: 'INTEGRATION',
    engineerArea: 'Integration Engineering',
    rules: [
      'Required integration missing',
      'FAAP integration failure',
      'JUMO Digital Pay integration failure',
      'AEGIS integration failure',
      'JUMO Cloud integration failure',
      'Treasury integration failure',
      'Digital Auditor integration failure',
      'Integration contract mismatch',
      'Integration authentication failure',
      'Integration reconciliation failure'
    ]
  },
  {
    category: 'SECURITY',
    engineerArea: 'AEGIS Security Engineering',
    rules: [
      'Authentication boundary failure',
      'Authorization boundary failure',
      'Privilege escalation risk',
      'Missing security policy',
      'Missing audit evidence',
      'Unsafe API exposure',
      'Secret/configuration exposure',
      'Security integration failure',
      'Threat detection failure',
      'Security regression detected'
    ]
  },
  {
    category: 'AI',
    engineerArea: 'AI Engineering',
    rules: [
      'AI gateway unavailable',
      'AI provider unavailable',
      'Model registry mismatch',
      'AI routing failure',
      'AI context boundary failure',
      'AI policy violation',
      'AI agent assignment failure',
      'AI verification evidence missing',
      'AI recommendation not traceable',
      'AI correction requires human approval'
    ]
  },
  {
    category: 'TESTING',
    engineerArea: 'Verification & Test Engineering',
    rules: [
      'Required test suite missing',
      'Unit test failure',
      'Integration test failure',
      'System test failure',
      'End-to-end test failure',
      'Regression test failure',
      'Verification evidence missing',
      'Mandatory verification gate failed',
      'Unverified implementation detected',
      'Release acceptance failure'
    ]
  },
  {
    category: 'PERFORMANCE',
    engineerArea: 'Performance Engineering',
    rules: [
      'Latency threshold exceeded',
      'Throughput threshold exceeded',
      'CPU resource threshold exceeded',
      'Memory resource threshold exceeded',
      'Database performance degradation',
      'API performance degradation',
      'Frontend performance degradation',
      'Load test failure',
      'Stress test failure',
      'Scalability threshold failure'
    ]
  },
  {
    category: 'DEPLOYMENT',
    engineerArea: 'Deployment Engineering',
    rules: [
      'Build failure',
      'Deployment configuration failure',
      'Environment mismatch',
      'Artifact missing',
      'Artifact integrity failure',
      'Runtime health failure',
      'Deployment verification failure',
      'Rollback capability missing',
      'Release configuration drift',
      'Production readiness failure'
    ]
  },
  {
    category: 'LIFECYCLE',
    engineerArea: 'Lifecycle Engineering',
    rules: [
      'Unsupported version detected',
      'Migration requirement missing',
      'Upgrade compatibility failure',
      'Deprecated component detected',
      'Retirement dependency unresolved',
      'Archive requirement missing',
      'Historical evidence missing',
      'Lifecycle state mismatch',
      'Upgrade regression detected',
      'Retirement readiness failure'
    ]
  }
];

class JumoAIVerificationDetectionRegistry {
  private readonly detections =
    new Map<string, JumoAIVerificationDetection>();

  constructor() {
    this.seedBaseline();
  }

  private seedBaseline(): void {
    let sequence = 1;

    for (const family of DETECTION_FAMILIES) {
      for (const rule of family.rules) {
        const id = `AI-DET-${String(sequence).padStart(4, '0')}`;

        this.register({
          id,
          category: family.category,
          name: rule,
          description:
            `AI detection for ${rule.toLowerCase()} within ${family.category} verification.`,
          lifecycleStages: ALL_LIFECYCLE_STAGES,
          severity: this.defaultSeverity(family.category, rule),
          blocking: this.isBlocking(family.category, rule),
          automated: true,
          architectureRequired: true,
          evidenceRequired: true,
          engineerArea: family.engineerArea,
          correctionRequired: true
        });

        sequence++;
      }
    }
  }

  private defaultSeverity(
    category: JumoDetectionCategory,
    rule: string
  ): JumoDetectionSeverity {
    const blockingCategories: JumoDetectionCategory[] = [
      'ARCHITECTURE',
      'SECURITY',
      'TESTING',
      'DEPLOYMENT',
      'INTEGRATION'
    ];

    if (
      blockingCategories.includes(category) ||
      /missing|failure|violation|unauthorized|unverified/i.test(rule)
    ) {
      return 'BLOCKING';
    }

    return 'MAJOR';
  }

  private isBlocking(
    category: JumoDetectionCategory,
    rule: string
  ): boolean {
    return (
      category === 'ARCHITECTURE' ||
      category === 'SECURITY' ||
      category === 'TESTING' ||
      category === 'DEPLOYMENT' ||
      category === 'INTEGRATION' ||
      /mandatory|unverified|unauthorized|violation|failure/i.test(rule)
    );
  }

  public register(
    detection: JumoAIVerificationDetection
  ): JumoAIVerificationDetection {
    if (!detection.id) {
      throw new Error('AI detection requires an ID.');
    }

    if (this.detections.has(detection.id)) {
      throw new Error(`AI detection already registered: ${detection.id}`);
    }

    this.detections.set(detection.id, detection);
    return detection;
  }

  public upsert(
    detection: JumoAIVerificationDetection
  ): JumoAIVerificationDetection {
    this.detections.set(detection.id, detection);
    return detection;
  }

  public get(id: string): JumoAIVerificationDetection | undefined {
    return this.detections.get(id);
  }

  public has(id: string): boolean {
    return this.detections.has(id);
  }

  public list(): JumoAIVerificationDetection[] {
    return Array.from(this.detections.values());
  }

  public byCategory(
    category: JumoDetectionCategory
  ): JumoAIVerificationDetection[] {
    return this.list().filter(d => d.category === category);
  }

  public blocking(): JumoAIVerificationDetection[] {
    return this.list().filter(d => d.blocking);
  }

  public automated(): JumoAIVerificationDetection[] {
    return this.list().filter(d => d.automated);
  }

  public forLifecycle(
    stage: JumoAILifecycleStage
  ): JumoAIVerificationDetection[] {
    return this.list().filter(d => d.lifecycleStages.includes(stage));
  }

  public count(): number {
    return this.detections.size;
  }

  public status() {
    return {
      totalDetections: this.detections.size,
      minimumBaseline: 200,
      exceedsMinimumBaseline: this.detections.size >= 200,
      blockingDetections: this.blocking().length,
      automatedDetections: this.automated().length,
      categories: new Set(
        this.list().map(d => d.category)
      ).size,
      lifecycleStages: new Set(
        this.list().flatMap(d => d.lifecycleStages)
      ).size,
      dynamicRegistration: true,
      fixedDetectionLimit: false
    };
  }
}

export const JUMO_AI_VERIFICATION_DETECTION_REGISTRY =
  new JumoAIVerificationDetectionRegistry();

export { JumoAIVerificationDetectionRegistry };
