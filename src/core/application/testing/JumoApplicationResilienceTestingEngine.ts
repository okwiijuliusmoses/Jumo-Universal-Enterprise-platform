export type ResilienceTestStatus =
  | 'PLANNED'
  | 'READY'
  | 'RUNNING'
  | 'PASSED'
  | 'FAILED'
  | 'BLOCKED';

export type ResilienceTestCategory =
  | 'SECURITY_BOUNDARY'
  | 'RBAC_ISOLATION'
  | 'TENANT_ISOLATION'
  | 'DATA_INTEGRITY'
  | 'FAILURE_RECOVERY'
  | 'SERVICE_RECOVERY'
  | 'API_RESILIENCE'
  | 'DATABASE_RESILIENCE'
  | 'OFFLINE_OPERATION'
  | 'HYBRID_OPERATION'
  | 'SYNC_RECOVERY'
  | 'NETWORK_FAILURE'
  | 'AI_PROVIDER_FAILURE'
  | 'PAYMENT_FAILURE'
  | 'TREASURY_FAILURE'
  | 'ACCOUNTING_INTEGRITY'
  | 'SHARED_PRODUCT_ISOLATION'
  | 'PERFORMANCE'
  | 'LOAD'
  | 'SCALABILITY'
  | 'RESOURCE_CONTROL'
  | 'DEPLOYMENT'
  | 'ROLLBACK'
  | 'UPGRADE_SAFETY'
  | 'REGRESSION'
  | 'BACKUP_RECOVERY'
  | 'AUDITABILITY'
  | 'CONFIGURATION_SAFETY';

export interface ResilienceTestCase {
  id: string;
  functionalTestPlanId?: string;
  category: ResilienceTestCategory;
  name: string;
  description: string;
  required: boolean;
  status: ResilienceTestStatus;
  failureScenario: string;
  expectedRecovery: string;
  actualResult?: string;
  evidenceReference?: string;
  findings: string[];
}

export interface ResilienceTestPlan {
  id: string;
  productId: string;
  functionalTestPlanId: string;
  createdAt: string;
  status: ResilienceTestStatus;
  tests: ResilienceTestCase[];
  totalTests: number;
  passedTests: number;
  failedTests: number;
  blockedTests: number;
  criticalFailures: string[];
  recommendations: string[];
}

export interface ResilienceTestRequest {
  productId: string;
  functionalTestPlanId: string;
  tests: Array<{
    id: string;
    functionalTestPlanId?: string;
    category: ResilienceTestCategory;
    name: string;
    description?: string;
    required?: boolean;
    failureScenario: string;
    expectedRecovery: string;
  }>;
}

export class JumoApplicationResilienceTestingEngine {
  private readonly plans =
    new Map<string, ResilienceTestPlan>();

  createPlan(
    request: ResilienceTestRequest
  ): ResilienceTestPlan {
    if (!request.productId.trim()) {
      throw new Error('Product ID is required.');
    }

    if (!request.functionalTestPlanId.trim()) {
      throw new Error(
        'Full Application Testing A plan ID is required.'
      );
    }

    const id =
      `resilience-tests-${request.productId}-${Date.now()}`;

    const tests: ResilienceTestCase[] =
      request.tests.map((test) => ({
        id: test.id,
        functionalTestPlanId:
          test.functionalTestPlanId,
        category: test.category,
        name: test.name,
        description: test.description ?? '',
        required: test.required ?? true,
        status: 'PLANNED',
        failureScenario: test.failureScenario,
        expectedRecovery: test.expectedRecovery,
        findings: [],
      }));

    const plan: ResilienceTestPlan = {
      id,
      productId: request.productId,
      functionalTestPlanId:
        request.functionalTestPlanId,
      createdAt: new Date().toISOString(),
      status:
        tests.length > 0 ? 'READY' : 'BLOCKED',
      tests,
      totalTests: tests.length,
      passedTests: 0,
      failedTests: 0,
      blockedTests: 0,
      criticalFailures: [],
      recommendations:
        tests.length > 0
          ? []
          : ['Define resilience tests before execution.'],
    };

    this.plans.set(id, plan);

    return this.get(id);
  }

  get(id: string): ResilienceTestPlan {
    const plan = this.plans.get(id);

    if (!plan) {
      throw new Error(
        `Resilience test plan not found: ${id}`
      );
    }

    return this.clone(plan);
  }

  list(): ResilienceTestPlan[] {
    return Array.from(this.plans.values()).map(
      (plan) => this.clone(plan)
    );
  }

  prepare(id: string): ResilienceTestPlan {
    const plan = this.requireMutable(id);

    for (const test of plan.tests) {
      test.findings = [];

      if (!test.failureScenario.trim()) {
        test.findings.push(
          'Failure scenario is missing.'
        );
        test.status = 'BLOCKED';
        continue;
      }

      if (!test.expectedRecovery.trim()) {
        test.findings.push(
          'Expected recovery behaviour is missing.'
        );
        test.status = 'BLOCKED';
        continue;
      }

      test.status = 'READY';
    }

    this.recalculate(plan);

    return this.get(id);
  }

  begin(id: string): ResilienceTestPlan {
    const plan = this.requireMutable(id);

    this.recalculate(plan);

    if (plan.status === 'BLOCKED') {
      return this.get(id);
    }

    plan.status = 'RUNNING';

    for (const test of plan.tests) {
      if (test.status === 'READY') {
        test.status = 'RUNNING';
      }
    }

    return this.get(id);
  }

  recordResult(
    id: string,
    testId: string,
    passed: boolean,
    actualResult: string,
    evidenceReference?: string
  ): ResilienceTestPlan {
    const plan = this.requireMutable(id);

    const test = plan.tests.find(
      (candidate) => candidate.id === testId
    );

    if (!test) {
      throw new Error(
        `Resilience test not found: ${testId}`
      );
    }

    if (!actualResult.trim()) {
      throw new Error(
        'Actual resilience test result is required.'
      );
    }

    test.actualResult = actualResult;
    test.evidenceReference =
      evidenceReference;

    if (passed) {
      test.status = 'PASSED';
      test.findings = [];
    } else {
      test.status = 'FAILED';
      test.findings = [
        'The application did not satisfy the expected resilience behaviour.',
      ];
    }

    this.recalculate(plan);

    return this.get(id);
  }

  blockTest(
    id: string,
    testId: string,
    reason: string
  ): ResilienceTestPlan {
    const plan = this.requireMutable(id);

    const test = plan.tests.find(
      (candidate) => candidate.id === testId
    );

    if (!test) {
      throw new Error(
        `Resilience test not found: ${testId}`
      );
    }

    if (!reason.trim()) {
      throw new Error(
        'Blocking reason is required.'
      );
    }

    test.status = 'BLOCKED';
    test.findings = [reason];

    this.recalculate(plan);

    return this.get(id);
  }

  registerCriticalFailure(
    id: string,
    testId: string,
    finding: string
  ): ResilienceTestPlan {
    const plan = this.requireMutable(id);

    const test = plan.tests.find(
      (candidate) => candidate.id === testId
    );

    if (!test) {
      throw new Error(
        `Resilience test not found: ${testId}`
      );
    }

    if (!finding.trim()) {
      throw new Error(
        'Critical failure finding is required.'
      );
    }

    test.status = 'FAILED';
    test.findings = [
      ...test.findings,
      finding,
    ];

    plan.criticalFailures.push(
      `${test.name}: ${finding}`
    );

    this.recalculate(plan);

    return this.get(id);
  }

  canEnterAcceptance(
    id: string
  ): boolean {
    const plan = this.requireMutable(id);

    this.recalculate(plan);

    return (
      plan.status === 'PASSED' &&
      plan.criticalFailures.length === 0 &&
      plan.tests.every(
        (test) =>
          !test.required ||
          test.status === 'PASSED'
      )
    );
  }

  status() {
    const plans = this.list();

    return {
      planCount: plans.length,
      readyPlans: plans.filter(
        (plan) => plan.status === 'READY'
      ).length,
      runningPlans: plans.filter(
        (plan) => plan.status === 'RUNNING'
      ).length,
      passedPlans: plans.filter(
        (plan) => plan.status === 'PASSED'
      ).length,
      failedPlans: plans.filter(
        (plan) => plan.status === 'FAILED'
      ).length,
      blockedPlans: plans.filter(
        (plan) => plan.status === 'BLOCKED'
      ).length,
      totalTests: plans.reduce(
        (count, plan) =>
          count + plan.totalTests,
        0
      ),
      passedTests: plans.reduce(
        (count, plan) =>
          count + plan.passedTests,
        0
      ),
      failedTests: plans.reduce(
        (count, plan) =>
          count + plan.failedTests,
        0
      ),
      blockedTests: plans.reduce(
        (count, plan) =>
          count + plan.blockedTests,
        0
      ),
      criticalFailures: plans.reduce(
        (count, plan) =>
          count + plan.criticalFailures.length,
        0
      ),
    };
  }

  remove(id: string): boolean {
    return this.plans.delete(id);
  }

  private requireMutable(
    id: string
  ): ResilienceTestPlan {
    const plan = this.plans.get(id);

    if (!plan) {
      throw new Error(
        `Resilience test plan not found: ${id}`
      );
    }

    return plan;
  }

  private recalculate(
    plan: ResilienceTestPlan
  ): void {
    plan.totalTests = plan.tests.length;

    plan.passedTests =
      plan.tests.filter(
        (test) => test.status === 'PASSED'
      ).length;

    plan.failedTests =
      plan.tests.filter(
        (test) => test.status === 'FAILED'
      ).length;

    plan.blockedTests =
      plan.tests.filter(
        (test) => test.status === 'BLOCKED'
      ).length;

    if (plan.blockedTests > 0) {
      plan.status = 'BLOCKED';
      plan.recommendations = [
        'Resolve every blocked resilience test.',
        'Re-run resilience verification.',
      ];
      return;
    }

    if (
      plan.failedTests > 0 ||
      plan.criticalFailures.length > 0
    ) {
      plan.status = 'FAILED';
      plan.recommendations = [
        'Resolve every resilience or security failure.',
        'Repeat the affected tests.',
        'Do not proceed to acceptance while critical failures remain.',
      ];
      return;
    }

    const required =
      plan.tests.filter(
        (test) => test.required
      );

    if (
      required.length > 0 &&
      required.every(
        (test) => test.status === 'PASSED'
      )
    ) {
      plan.status = 'PASSED';
      plan.recommendations = [
        'Full Application Testing B passed.',
        'Application may proceed to final acceptance verification.',
      ];
      return;
    }

    if (
      plan.tests.some(
        (test) => test.status === 'RUNNING'
      )
    ) {
      plan.status = 'RUNNING';
      return;
    }

    if (
      plan.tests.every(
        (test) =>
          test.status === 'READY' ||
          !test.required
      )
    ) {
      plan.status = 'READY';
      return;
    }

    plan.status = 'PLANNED';
  }

  private clone(
    plan: ResilienceTestPlan
  ): ResilienceTestPlan {
    return {
      ...plan,
      tests: plan.tests.map(
        (test) => ({
          ...test,
          findings: [...test.findings],
        })
      ),
      criticalFailures: [
        ...plan.criticalFailures,
      ],
      recommendations: [
        ...plan.recommendations,
      ],
    };
  }
}

export const jumoApplicationResilienceTestingEngine =
  new JumoApplicationResilienceTestingEngine();
