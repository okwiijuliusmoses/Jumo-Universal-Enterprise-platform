export type AIDetectionCategory =
  | 'SPECIFICATION'
  | 'ARCHITECTURE'
  | 'APPLICATION_BUILD'
  | 'FRONTEND'
  | 'BACKEND'
  | 'DATABASE'
  | 'API'
  | 'NAVIGATION'
  | 'PORTAL'
  | 'MODULE'
  | 'COMPONENT'
  | 'CONFIGURATION'
  | 'BRANDING'
  | 'PUBLIC_PLATFORM'
  | 'INTEGRATION'
  | 'SECURITY'
  | 'AEGIS'
  | 'AI'
  | 'DATA'
  | 'PERFORMANCE'
  | 'ACCESSIBILITY'
  | 'COMPLIANCE'
  | 'CLOUD'
  | 'OFFLINE'
  | 'TREASURY'
  | 'FAAP'
  | 'PAYMENTS'
  | 'OPERATIONS'
  | 'TESTING'
  | 'LIFECYCLE';

export type AIDetectionSeverity =
  | 'INFO'
  | 'LOW'
  | 'MEDIUM'
  | 'HIGH'
  | 'CRITICAL';

export type AIDetectionMode =
  | 'STATIC'
  | 'RUNTIME'
  | 'AI'
  | 'INTEGRATION'
  | 'SECURITY'
  | 'E2E';

export interface AIVerificationDetection {
  id: string;
  category: AIDetectionCategory;
  severity: AIDetectionSeverity;
  mode: AIDetectionMode;
  name: string;
  description: string;
  detectionRule: string;
  remediation: string;
  blocking: boolean;
  enabled: boolean;
}

export interface AIDetectionResult {
  id: string;
  productId: string;
  detectionId: string;
  category: AIDetectionCategory;
  severity: AIDetectionSeverity;
  status: 'PASS' | 'FAIL' | 'WARNING' | 'SKIPPED';
  message: string;
  recommendation: string;
  detectedAt: string;
  evidenceRequired: boolean;
  metadata: Record<string, unknown>;
}

export interface AIVerificationRunReport {
  runId: string;
  productId: string;
  startedAt: string;
  completedAt: string;
  totalDetections: number;
  executedDetections: number;
  passed: number;
  failed: number;
  warnings: number;
  skipped: number;
  criticalFailures: number;
  highFailures: number;
  score: number;
  provisioningBlocked: boolean;
  results: AIDetectionResult[];
}

const CATEGORIES: AIDetectionCategory[] = [
  'SPECIFICATION',
  'ARCHITECTURE',
  'APPLICATION_BUILD',
  'FRONTEND',
  'BACKEND',
  'DATABASE',
  'API',
  'NAVIGATION',
  'PORTAL',
  'MODULE',
  'COMPONENT',
  'CONFIGURATION',
  'BRANDING',
  'PUBLIC_PLATFORM',
  'INTEGRATION',
  'SECURITY',
  'AEGIS',
  'AI',
  'DATA',
  'PERFORMANCE',
  'ACCESSIBILITY',
  'COMPLIANCE',
  'CLOUD',
  'OFFLINE',
  'TREASURY',
  'FAAP',
  'PAYMENTS',
  'OPERATIONS',
  'TESTING',
  'LIFECYCLE',
];

const DETECTION_NAMES: Record<
  AIDetectionCategory,
  string[]
> = {
  SPECIFICATION: [
    'Specification completeness',
    'Specification consistency',
    'Specification approval state',
    'Client requirement traceability',
    'Enterprise identity completeness',
    'Organizational structure completeness',
    'Branch definition completeness',
    'Department definition completeness',
    'Role definition completeness',
    'Subscription package compatibility',
  ],

  ARCHITECTURE: [
    'UEOS architecture conformance',
    'Required layer presence',
    'Layer dependency integrity',
    'Layer ownership integrity',
    'Domain registry integrity',
    'Product registry integrity',
    'Runtime contract compliance',
    'Service registry integrity',
    'Event bus registration',
    'Workflow engine registration',
  ],

  APPLICATION_BUILD: [
    'TypeScript compilation',
    'Production build',
    'Bundle generation',
    'Build artifact integrity',
    'Dependency resolution',
    'Unused dependency detection',
    'Missing module detection',
    'Environment configuration',
    'Build reproducibility',
    'Production startup readiness',
  ],

  FRONTEND: [
    'Frontend route integrity',
    'Component rendering',
    'State management integrity',
    'Error boundary coverage',
    'Responsive layout',
    'Form validation',
    'Loading state coverage',
    'Empty state coverage',
    'Error state coverage',
    'Interactive control integrity',
  ],

  BACKEND: [
    'Backend startup',
    'Service registration',
    'API handler integrity',
    'Runtime exception detection',
    'Unhandled promise detection',
    'Request validation',
    'Response contract validation',
    'Health endpoint readiness',
    'Graceful shutdown',
    'Configuration loading',
  ],

  DATABASE: [
    'Database connectivity',
    'Schema integrity',
    'Migration integrity',
    'Persistence verification',
    'Transaction integrity',
    'Data ownership',
    'Data lifecycle',
    'Backup configuration',
    'Recovery configuration',
    'Local storage fallback',
  ],

  API: [
    'API route availability',
    'API contract compatibility',
    'Authentication enforcement',
    'Authorization enforcement',
    'Request schema validation',
    'Response schema validation',
    'HTTP error handling',
    'Rate limiting',
    'CORS configuration',
    'API versioning',
  ],

  NAVIGATION: [
    'Route discovery',
    'Menu integrity',
    'Breadcrumb integrity',
    'Workspace navigation',
    'Portal navigation',
    'Deep-link support',
    'Unauthorized route blocking',
    'Missing route detection',
    'Dead link detection',
    'Navigation consistency',
  ],

  PORTAL: [
    'Portal registration',
    'Portal authentication',
    'Portal authorization',
    'Portal isolation',
    'Portal module boundaries',
    'Portal route boundaries',
    'Portal data boundaries',
    'Portal dashboard integrity',
    'Portal workflow integrity',
    'Portal session integrity',
  ],

  MODULE: [
    'Module registration',
    'Module ownership',
    'Module dependency integrity',
    'Module configuration',
    'Module lifecycle',
    'Module permissions',
    'Module route integrity',
    'Module data integrity',
    'Module workflow integrity',
    'Module test coverage',
  ],

  COMPONENT: [
    'Component registration',
    'Component ownership',
    'Component dependency integrity',
    'Component configuration',
    'Component rendering',
    'Component state integrity',
    'Component event handling',
    'Component accessibility',
    'Component error handling',
    'Component test coverage',
  ],

  CONFIGURATION: [
    'Tenant configuration',
    'Enterprise configuration',
    'Product configuration',
    'Package configuration',
    'Feature configuration',
    'Environment configuration',
    'Permission configuration',
    'Integration configuration',
    'AI configuration',
    'Configuration persistence',
  ],

  BRANDING: [
    'Logo integrity',
    'Logo geometry',
    'Logo asset availability',
    'Enterprise name integrity',
    'Colour configuration',
    'Typography configuration',
    'Brand consistency',
    'Public identity consistency',
    'Document identity consistency',
    'Branding non-hardcoding',
  ],

  PUBLIC_PLATFORM: [
    'Public landing page',
    'Public enterprise profile',
    'Public contacts',
    'Public communication addresses',
    'Public services listing',
    'Public registration',
    'Public notice board',
    'Public advertising surface',
    'Public AI assistant',
    'Public accessibility',
  ],

  INTEGRATION: [
    'Shared product registry',
    'FAAP integration',
    'JUMO Digital Pay integration',
    'AEGIS integration',
    'JUMO Cloud integration',
    'Treasury integration',
    'Accounting integration',
    'AI integration',
    'Event integration',
    'Workflow integration',
  ],

  SECURITY: [
    'Authentication',
    'Authorization',
    'RBAC',
    'Tenant isolation',
    'Session security',
    'Secret management',
    'API security',
    'Input sanitization',
    'Security headers',
    'Audit logging',
  ],

  AEGIS: [
    'AEGIS registration',
    'Threat detection',
    'Policy enforcement',
    'Security event routing',
    'Risk classification',
    'Anomaly detection',
    'Access anomaly detection',
    'Integrity monitoring',
    'Security audit trail',
    'Incident lifecycle',
  ],

  AI: [
    'AI provider configuration',
    'AI provider availability',
    'AI routing',
    'AI authorization',
    'AI context boundaries',
    'AI hallucination guard',
    'AI action boundaries',
    'AI human approval',
    'AI audit logging',
    'AI fallback provider',
  ],

  DATA: [
    'Schema completeness',
    'Data validation',
    'Data consistency',
    'Data ownership',
    'Data isolation',
    'Data duplication',
    'Data integrity',
    'Data retention',
    'Data export',
    'Data recovery',
  ],

  PERFORMANCE: [
    'Startup performance',
    'API latency',
    'Frontend load performance',
    'Database performance',
    'Memory consumption',
    'CPU consumption',
    'Bundle size',
    'Concurrent request handling',
    'Resource exhaustion',
    'Performance regression',
  ],

  ACCESSIBILITY: [
    'Keyboard navigation',
    'Form labels',
    'Focus management',
    'Contrast configuration',
    'Semantic structure',
    'Screen-reader compatibility',
    'Accessible navigation',
    'Accessible errors',
    'Accessible forms',
    'Responsive accessibility',
  ],

  COMPLIANCE: [
    'Governance configuration',
    'Audit requirements',
    'Data protection',
    'Retention requirements',
    'Access governance',
    'Financial controls',
    'Security controls',
    'Approval controls',
    'Evidence retention',
    'Compliance traceability',
  ],

  CLOUD: [
    'Cloud configuration',
    'Cloud environment',
    'Cloud service registration',
    'Provisioning readiness',
    'Deployment configuration',
    'Health monitoring',
    'Runtime observability',
    'Cloud storage',
    'Cloud recovery',
    'Cloud dependency analysis',
  ],

  OFFLINE: [
    'Offline startup',
    'Local runtime',
    'Local data persistence',
    'Offline authentication',
    'Offline workflow',
    'Offline configuration',
    'Offline module availability',
    'Offline synchronization',
    'Conflict resolution',
    'Offline recovery',
  ],

  TREASURY: [
    'Treasury registration',
    'Automated deduction configuration',
    'Revenue routing',
    'Treasury account mapping',
    'Settlement configuration',
    'Multi-currency routing',
    'Liquidity controls',
    'Treasury audit trail',
    'Treasury authorization',
    'Treasury reconciliation',
  ],

  FAAP: [
    'FAAP registration',
    'Accounting integration',
    'Financial control integration',
    'Credit risk integration',
    'Ledger integration',
    'Transaction classification',
    'Financial audit trail',
    'Financial authorization',
    'Financial reconciliation',
    'FAAP configuration',
  ],

  PAYMENTS: [
    'JUMO Digital Pay registration',
    'Payment method configuration',
    'Mobile money integration',
    'Card payment integration',
    'Bank payment integration',
    'Payment authorization',
    'Payment reconciliation',
    'Payment status tracking',
    'Payment audit trail',
    'Payment failure recovery',
  ],

  OPERATIONS: [
    'Operational health',
    'Service availability',
    'Workflow execution',
    'Event processing',
    'Queue processing',
    'Telemetry',
    'Logging',
    'Monitoring',
    'Incident management',
    'Operational recovery',
  ],

  TESTING: [
    'Unit test execution',
    'Integration test execution',
    'API test execution',
    'End-to-end test execution',
    'Security test execution',
    'Regression test execution',
    'Smoke test execution',
    'Build test execution',
    'Runtime test execution',
    'Provisioning test execution',
  ],

  LIFECYCLE: [
    'Installation readiness',
    'Provisioning readiness',
    'Activation readiness',
    'Upgrade readiness',
    'Rollback readiness',
    'Migration readiness',
    'Backup readiness',
    'Recovery readiness',
    'Archival readiness',
    'Retirement readiness',
  ],
};

const detectionRules: Record<
  AIDetectionCategory,
  string
> = {
  SPECIFICATION: 'Validate specification fields, relationships, approvals and traceability.',
  ARCHITECTURE: 'Compare implementation registry against approved UEOS architecture.',
  APPLICATION_BUILD: 'Inspect source, compiler output, production artifacts and startup contracts.',
  FRONTEND: 'Inspect routes, components, state, forms and runtime rendering.',
  BACKEND: 'Inspect services, handlers, runtime behaviour and startup health.',
  DATABASE: 'Inspect persistence, schema, migration and recovery contracts.',
  API: 'Exercise API contracts and verify authorization and response behaviour.',
  NAVIGATION: 'Traverse registered routes and verify accessible navigation paths.',
  PORTAL: 'Verify portal isolation, identity, authorization and module boundaries.',
  MODULE: 'Verify module registration, dependencies, lifecycle and ownership.',
  COMPONENT: 'Verify component registration, rendering, events and dependencies.',
  CONFIGURATION: 'Inspect runtime and tenant configuration for completeness and hardcoding.',
  BRANDING: 'Compare configured identity against approved enterprise branding.',
  PUBLIC_PLATFORM: 'Verify public-facing enterprise information and communication surfaces.',
  INTEGRATION: 'Verify shared JUMO product contracts and integration health.',
  SECURITY: 'Run security policy, authorization and secret-boundary checks.',
  AEGIS: 'Run AEGIS security and anomaly detection controls.',
  AI: 'Verify AI provider, routing, policy, context and action boundaries.',
  DATA: 'Inspect data quality, integrity, ownership and lifecycle.',
  PERFORMANCE: 'Measure runtime resources, latency and performance regression.',
  ACCESSIBILITY: 'Inspect accessibility semantics, keyboard operation and responsive behaviour.',
  COMPLIANCE: 'Verify governance, evidence and control requirements.',
  CLOUD: 'Verify cloud environment, provisioning and observability contracts.',
  OFFLINE: 'Verify local runtime and offline continuity capabilities.',
  TREASURY: 'Verify automated treasury routing and financial control contracts.',
  FAAP: 'Verify FAAP financial architecture and accounting integration.',
  PAYMENTS: 'Verify JUMO Digital Pay payment configuration and reconciliation.',
  OPERATIONS: 'Verify live operational health and recovery capabilities.',
  TESTING: 'Execute automated application test suites.',
  LIFECYCLE: 'Verify installation through retirement lifecycle controls.',
};

const remediationRules: Record<
  AIDetectionCategory,
  string
> = {
  SPECIFICATION: 'Return the specification to guided completion and approval.',
  ARCHITECTURE: 'Correct the implementation against the approved architecture registry.',
  APPLICATION_BUILD: 'Repair build errors before provisioning.',
  FRONTEND: 'Repair frontend runtime or structural defects.',
  BACKEND: 'Repair backend service or runtime defects.',
  DATABASE: 'Repair persistence, schema or migration defects.',
  API: 'Repair API contract, security or availability defects.',
  NAVIGATION: 'Repair missing, inaccessible or unauthorized navigation paths.',
  PORTAL: 'Restore portal isolation and authorization boundaries.',
  MODULE: 'Correct module registration, dependency or lifecycle configuration.',
  COMPONENT: 'Correct component registration, rendering or dependency issues.',
  CONFIGURATION: 'Complete configuration through supported configuration surfaces.',
  BRANDING: 'Restore approved configurable enterprise branding.',
  PUBLIC_PLATFORM: 'Complete the public enterprise information surface.',
  INTEGRATION: 'Repair the affected shared-product integration.',
  SECURITY: 'Block deployment until security defects are remediated.',
  AEGIS: 'Route the security finding through AEGIS controls.',
  AI: 'Repair provider, routing, policy or AI boundary configuration.',
  DATA: 'Repair data integrity, ownership or lifecycle defects.',
  PERFORMANCE: 'Optimize or remediate the identified performance regression.',
  ACCESSIBILITY: 'Correct the identified accessibility defect.',
  COMPLIANCE: 'Resolve the governance or compliance finding.',
  CLOUD: 'Correct cloud provisioning or runtime configuration.',
  OFFLINE: 'Restore required offline runtime capabilities.',
  TREASURY: 'Correct treasury routing or authorization configuration.',
  FAAP: 'Correct FAAP integration or financial control configuration.',
  PAYMENTS: 'Correct payment integration, authorization or reconciliation.',
  OPERATIONS: 'Restore operational health and recovery capability.',
  TESTING: 'Repair failed tests and execute the affected suite again.',
  LIFECYCLE: 'Correct the affected lifecycle transition or control.',
};

function buildCatalog(): AIVerificationDetection[] {
  const catalog: AIVerificationDetection[] = [];

  for (const category of CATEGORIES) {
    const names = DETECTION_NAMES[category];

    names.forEach((name, index) => {
      const severity: AIDetectionSeverity =
        index === 0
          ? 'CRITICAL'
          : index < 3
            ? 'HIGH'
            : index < 6
              ? 'MEDIUM'
              : 'LOW';

      catalog.push({
        id:
          `ai-${category.toLowerCase()}-${String(index + 1).padStart(3, '0')}`,
        category,
        severity,
        mode:
          category === 'SECURITY' ||
          category === 'AEGIS'
            ? 'SECURITY'
            : category === 'TESTING'
              ? 'E2E'
              : category === 'INTEGRATION'
                ? 'INTEGRATION'
                : category === 'OPERATIONS' ||
                    category === 'PERFORMANCE'
                  ? 'RUNTIME'
                  : 'AI',
        name,
        description:
          `AI-assisted detection for ${name.toLowerCase()}.`,
        detectionRule:
          detectionRules[category],
        remediation:
          remediationRules[category],
        blocking:
          severity === 'CRITICAL' ||
          severity === 'HIGH',
        enabled: true,
      });
    });
  }

  return catalog;
}

export class JumoAIVerificationDetectionEngine {
  private readonly catalog =
    new Map<string, AIVerificationDetection>();

  private readonly results =
    new Map<string, AIDetectionResult>();

  constructor() {
    for (const detection of buildCatalog()) {
      this.catalog.set(
        detection.id,
        detection
      );
    }
  }

  listDetections(): AIVerificationDetection[] {
    return Array.from(
      this.catalog.values()
    ).map((item) => ({
      ...item,
    }));
  }

  getDetection(
    id: string
  ): AIVerificationDetection {
    const detection =
      this.catalog.get(id);

    if (!detection) {
      throw new Error(
        `AI verification detection not found: ${id}`
      );
    }

    return {
      ...detection,
    };
  }

  enableDetection(
    id: string
  ): AIVerificationDetection {
    const detection =
      this.catalog.get(id);

    if (!detection) {
      throw new Error(
        `AI verification detection not found: ${id}`
      );
    }

    detection.enabled = true;

    return {
      ...detection,
    };
  }

  disableDetection(
    id: string
  ): AIVerificationDetection {
    const detection =
      this.catalog.get(id);

    if (!detection) {
      throw new Error(
        `AI verification detection not found: ${id}`
      );
    }

    detection.enabled = false;

    return {
      ...detection,
    };
  }

  recordResult(
    input: Omit<
      AIDetectionResult,
      'id' | 'detectedAt'
    >
  ): AIDetectionResult {
    const detection =
      this.catalog.get(
        input.detectionId
      );

    if (!detection) {
      throw new Error(
        `Unknown detection: ${input.detectionId}`
      );
    }

    const id =
      `result-${input.productId}-${Date.now()}-${this.results.size}`;

    const result: AIDetectionResult = {
      ...input,
      id,
      detectedAt:
        new Date().toISOString(),
    };

    this.results.set(id, result);

    return {
      ...result,
      metadata: {
        ...result.metadata,
      },
    };
  }

  runRegisteredDetections(
    productId: string,
    executor?: (
      detection: AIVerificationDetection
    ) => Partial<
      Pick<
        AIDetectionResult,
        'status' |
        'message' |
        'recommendation' |
        'evidenceRequired' |
        'metadata'
      >
    >
  ): AIVerificationRunReport {
    const runId =
      `ai-verification-${productId}-${Date.now()}`;

    const startedAt =
      new Date().toISOString();

    const results: AIDetectionResult[] = [];

    for (const detection of this.catalog.values()) {
      if (!detection.enabled) {
        continue;
      }

      const execution =
        executor?.(detection);

      results.push(
        this.recordResult({
          productId,
          detectionId:
            detection.id,
          category:
            detection.category,
          severity:
            detection.severity,
          status:
            execution?.status ??
            'WARNING',
          message:
            execution?.message ??
            'Detection is registered and awaiting an execution adapter.',
          recommendation:
            execution?.recommendation ??
            detection.remediation,
          evidenceRequired:
            execution?.evidenceRequired ??
            true,
          metadata:
            execution?.metadata ??
            {
              executionMode:
                detection.mode,
              detectionRule:
                detection.detectionRule,
              adapterRequired:
                true,
            },
        })
      );
    }

    const completedAt =
      new Date().toISOString();

    const passed =
      results.filter(
        (result) =>
          result.status === 'PASS'
      ).length;

    const failed =
      results.filter(
        (result) =>
          result.status === 'FAIL'
      ).length;

    const warnings =
      results.filter(
        (result) =>
          result.status === 'WARNING'
      ).length;

    const skipped =
      results.filter(
        (result) =>
          result.status === 'SKIPPED'
      ).length;

    const criticalFailures =
      results.filter(
        (result) =>
          result.status === 'FAIL' &&
          result.severity === 'CRITICAL'
      ).length;

    const highFailures =
      results.filter(
        (result) =>
          result.status === 'FAIL' &&
          result.severity === 'HIGH'
      ).length;

    const executed =
      results.length;

    const score =
      executed === 0
        ? 0
        : Math.round(
            (
              passed +
              warnings * 0.5
            ) /
            executed *
            100
          );

    return {
      runId,
      productId,
      startedAt,
      completedAt,
      totalDetections:
        this.catalog.size,
      executedDetections:
        executed,
      passed,
      failed,
      warnings,
      skipped,
      criticalFailures,
      highFailures,
      score,
      provisioningBlocked:
        criticalFailures > 0 ||
        highFailures > 0 ||
        failed > 0,
      results,
    };
  }

  resultsForProduct(
    productId: string
  ): AIDetectionResult[] {
    return Array.from(
      this.results.values()
    )
      .filter(
        (result) =>
          result.productId === productId
      )
      .map((result) => ({
        ...result,
        metadata: {
          ...result.metadata,
        },
      }));
  }

  status() {
    const detections =
      this.listDetections();

    return {
      detectionCount:
        detections.length,
      enabledDetections:
        detections.filter(
          (item) => item.enabled
        ).length,
      criticalDetections:
        detections.filter(
          (item) =>
            item.severity === 'CRITICAL'
        ).length,
      highDetections:
        detections.filter(
          (item) =>
            item.severity === 'HIGH'
        ).length,
      categories:
        new Set(
          detections.map(
            (item) =>
              item.category
          )
        ).size,
      resultCount:
        this.results.size,
    };
  }
}

export const jumoAIVerificationDetectionEngine =
  new JumoAIVerificationDetectionEngine();
