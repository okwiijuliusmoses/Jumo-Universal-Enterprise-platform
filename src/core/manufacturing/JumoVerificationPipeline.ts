export type VerificationPipelineStage =
  | 'SPECIFICATION'
  | 'ARCHITECTURE'
  | 'LAYERS'
  | 'COMPONENTS'
  | 'MODULES'
  | 'NAVIGATION'
  | 'CONFIGURATION'
  | 'LAYOUT'
  | 'DESIGN'
  | 'BRANDING'
  | 'PUBLIC_PLATFORM'
  | 'INTEGRATION'
  | 'BACKEND'
  | 'FRONTEND'
  | 'DATA'
  | 'SECURITY'
  | 'AI'
  | 'PERFORMANCE'
  | 'COMPLIANCE'
  | 'TESTING'
  | 'ENGINEER_REVIEW'
  | 'FINAL_ACCEPTANCE'
  | 'PROVISIONING';

export type VerificationResult =
  | 'PENDING'
  | 'RUNNING'
  | 'PASSED'
  | 'FAILED'
  | 'BLOCKED'
  | 'WAIVED';

export interface VerificationCheck {
  id: string;
  stage: VerificationPipelineStage;
  name: string;
  description: string;
  mandatory: boolean;
  blocking: boolean;
  result: VerificationResult;
  score: number;
  findings: string[];
  engineerIds: string[];
  checkedAt?: string;
}

export interface VerificationReport {
  verificationId: string;
  productId: string;
  productName: string;
  startedAt: string;
  completedAt?: string;
  status: 'IN_PROGRESS' | 'PASSED' | 'FAILED' | 'BLOCKED';
  totalChecks: number;
  passedChecks: number;
  failedChecks: number;
  blockedChecks: number;
  score: number;
  canProceedToProvisioning: boolean;
  checks: VerificationCheck[];
  recommendations: string[];
}

const STAGES: Array<{
  stage: VerificationPipelineStage;
  name: string;
  description: string;
}> = [
  {
    stage: 'SPECIFICATION',
    name: 'Specification Verification',
    description: 'Verify the client specification is complete and internally consistent.',
  },
  {
    stage: 'ARCHITECTURE',
    name: 'Architecture Verification',
    description: 'Verify the product matches the approved JUMO architecture.',
  },
  {
    stage: 'LAYERS',
    name: 'Architecture Layer Verification',
    description: 'Verify every required architecture layer is present and correctly implemented.',
  },
  {
    stage: 'COMPONENTS',
    name: 'Component Verification',
    description: 'Verify required components exist, connect correctly and are operational.',
  },
  {
    stage: 'MODULES',
    name: 'Module Verification',
    description: 'Verify required modules exist and belong to the correct enterprise scope.',
  },
  {
    stage: 'NAVIGATION',
    name: 'Navigation Verification',
    description: 'Verify menus, routes, workspaces, portals and navigation paths.',
  },
  {
    stage: 'CONFIGURATION',
    name: 'Configuration Verification',
    description: 'Verify configurable settings, tenant configuration and package configuration.',
  },
  {
    stage: 'LAYOUT',
    name: 'Layout Verification',
    description: 'Verify enterprise workspace layout and information hierarchy.',
  },
  {
    stage: 'DESIGN',
    name: 'Design Verification',
    description: 'Verify UI/UX consistency, responsiveness and enterprise presentation.',
  },
  {
    stage: 'BRANDING',
    name: 'Branding Verification',
    description: 'Verify approved logo, identity, colours and institutional theme.',
  },
  {
    stage: 'PUBLIC_PLATFORM',
    name: 'Public Platform Verification',
    description: 'Verify landing page, public information, contacts and communication surfaces.',
  },
  {
    stage: 'INTEGRATION',
    name: 'Commercial Integration Verification',
    description: 'Verify required shared JUMO products are correctly and configurably integrated.',
  },
  {
    stage: 'BACKEND',
    name: 'Backend Verification',
    description: 'Verify backend services, APIs, contracts and runtime behaviour.',
  },
  {
    stage: 'FRONTEND',
    name: 'Frontend Verification',
    description: 'Verify frontend components, state, routes and runtime behaviour.',
  },
  {
    stage: 'DATA',
    name: 'Data Verification',
    description: 'Verify schemas, persistence, ownership, quality and lifecycle handling.',
  },
  {
    stage: 'SECURITY',
    name: 'Security Verification',
    description: 'Verify identity, authorization, AEGIS controls and security boundaries.',
  },
  {
    stage: 'AI',
    name: 'AI Verification',
    description: 'Verify AI providers, agents, policies, routing, automation and model boundaries.',
  },
  {
    stage: 'PERFORMANCE',
    name: 'Performance Verification',
    description: 'Verify latency, throughput, resource use and scalability.',
  },
  {
    stage: 'COMPLIANCE',
    name: 'Compliance Verification',
    description: 'Verify applicable legal, regulatory and governance requirements.',
  },
  {
    stage: 'TESTING',
    name: 'Application Testing',
    description: 'Execute automated, integration, regression and end-to-end test suites.',
  },
  {
    stage: 'ENGINEER_REVIEW',
    name: 'Engineer Review',
    description: 'Route failed or incomplete areas to responsible specialist engineers for correction.',
  },
  {
    stage: 'FINAL_ACCEPTANCE',
    name: 'Final Acceptance',
    description: 'Confirm every mandatory verification requirement has passed.',
  },
  {
    stage: 'PROVISIONING',
    name: 'Provisioning Gate',
    description: 'Final controlled gate before installation, configuration and provisioning.',
  },
];

const TYPED_STAGES = STAGES;

export class JumoVerificationPipeline {
  private readonly reports = new Map<string, VerificationReport>();

  create(productId: string, productName: string): VerificationReport {
    const verificationId =
      `verification-${productId}-${Date.now()}`;

    const checks: VerificationCheck[] = TYPED_STAGES.map((definition, index) => ({
      id: `${verificationId}-${definition.stage.toLowerCase()}`,
      stage: definition.stage,
      name: definition.name,
      description: definition.description,
      mandatory: definition.stage !== 'PROVISIONING',
      blocking: definition.stage !== 'ENGINEER_REVIEW',
      result: 'PENDING',
      score: 0,
      findings: [],
      engineerIds: [],
    }));

    const report: VerificationReport = {
      verificationId,
      productId,
      productName,
      startedAt: new Date().toISOString(),
      status: 'IN_PROGRESS',
      totalChecks: checks.length,
      passedChecks: 0,
      failedChecks: 0,
      blockedChecks: 0,
      score: 0,
      canProceedToProvisioning: false,
      checks,
      recommendations: [],
    };

    this.reports.set(verificationId, report);
    return report;
  }

  updateCheck(
    verificationId: string,
    checkId: string,
    result: VerificationResult,
    score = result === 'PASSED' ? 100 : 0,
    findings: string[] = [],
    engineerIds: string[] = [],
  ): VerificationReport {
    const report = this.require(verificationId);
    const check = report.checks.find(item => item.id === checkId);

    if (!check) {
      throw new Error(`Verification check not found: ${checkId}`);
    }

    check.result = result;
    check.score = Math.max(0, Math.min(100, score));
    check.findings = findings;
    check.engineerIds = engineerIds;
    check.checkedAt = new Date().toISOString();

    this.recalculate(report);
    return report;
  }

  get(verificationId: string): VerificationReport | undefined {
    return this.reports.get(verificationId);
  }

  list(): VerificationReport[] {
    return Array.from(this.reports.values());
  }

  canProvision(verificationId: string): boolean {
    return this.require(verificationId).canProceedToProvisioning;
  }

  finalize(verificationId: string): VerificationReport {
    const report = this.require(verificationId);

    this.recalculate(report);

    if (!report.canProceedToProvisioning) {
      report.status = 'BLOCKED';
      report.completedAt = new Date().toISOString();

      throw new Error(
        'Provisioning blocked: mandatory verification requirements have not passed.',
      );
    }

    report.status = 'PASSED';
    report.completedAt = new Date().toISOString();

    return report;
  }

  private recalculate(report: VerificationReport): void {
    report.passedChecks =
      report.checks.filter(check => check.result === 'PASSED').length;

    report.failedChecks =
      report.checks.filter(check => check.result === 'FAILED').length;

    report.blockedChecks =
      report.checks.filter(check => check.result === 'BLOCKED').length;

    report.score =
      report.totalChecks === 0
        ? 0
        : Math.round(
            report.checks.reduce(
              (total, check) => total + check.score,
              0,
            ) / report.totalChecks,
          );

    const mandatoryChecks = report.checks.filter(
      check => check.mandatory && check.stage !== 'PROVISIONING',
    );

    const allMandatoryPassed = mandatoryChecks.every(
      check => check.result === 'PASSED',
    );

    report.canProceedToProvisioning = allMandatoryPassed;

    report.status = allMandatoryPassed
      ? 'PASSED'
      : report.failedChecks > 0 || report.blockedChecks > 0
        ? 'BLOCKED'
        : 'IN_PROGRESS';

    report.recommendations = report.checks
      .filter(check => check.result !== 'PASSED')
      .map(check =>
        `${check.name}: ${check.findings.length > 0
          ? check.findings.join('; ')
          : 'verification is incomplete and requires engineer attention.'}`,
      );
  }

  private require(verificationId: string): VerificationReport {
    const report = this.reports.get(verificationId);

    if (!report) {
      throw new Error(
        `Verification report not found: ${verificationId}`,
      );
    }

    return report;
  }
}

export const JUMO_VERIFICATION_PIPELINE =
  new JumoVerificationPipeline();
