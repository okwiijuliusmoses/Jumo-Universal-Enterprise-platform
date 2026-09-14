export type FunctionalTestStatus =
  | 'PLANNED'
  | 'READY'
  | 'RUNNING'
  | 'PASSED'
  | 'FAILED'
  | 'BLOCKED';

export type FunctionalTestCategory =
  | 'BOOT'
  | 'ROUTING'
  | 'AUTHENTICATION'
  | 'AUTHORIZATION'
  | 'WORKSPACE'
  | 'PORTAL'
  | 'MODULE'
  | 'FORM'
  | 'API'
  | 'DATABASE'
  | 'CRUD'
  | 'WORKFLOW'
  | 'SEARCH'
  | 'NOTIFICATION'
  | 'AI'
  | 'PAYMENT'
  | 'ACCOUNTING'
  | 'TREASURY'
  | 'SECURITY'
  | 'INTEGRATION';

export interface FunctionalTestCase {
  id: string;
  assemblyElementId: string;
  category: FunctionalTestCategory;
  name: string;
  description: string;
  required: boolean;
  status: FunctionalTestStatus;
  expectedResult: string;
  actualResult?: string;
  evidenceReference?: string;
  findings: string[];
}

export interface FunctionalTestPlan {
  id: string;
  productId: string;
  assemblyPlanId: string;
  createdAt: string;
  status: FunctionalTestStatus;
  tests: FunctionalTestCase[];
  totalTests: number;
  passedTests: number;
  failedTests: number;
  blockedTests: number;
  recommendations: string[];
}

export interface FunctionalTestRequest {
  productId: string;
  assemblyPlanId: string;
  tests: Array<{
    id: string;
    assemblyElementId: string;
    category: FunctionalTestCategory;
    name: string;
    description?: string;
    required?: boolean;
    expectedResult: string;
  }>;
}

export class JumoApplicationFunctionalTestingEngine {
  private readonly plans =
    new Map<string, FunctionalTestPlan>();

  createPlan(
    request: FunctionalTestRequest
  ): FunctionalTestPlan {
    if (!request.productId.trim()) {
      throw new Error('Product ID is required.');
    }

    if (!request.assemblyPlanId.trim()) {
      throw new Error(
        'Verified application assembly plan ID is required.'
      );
    }

    const id =
      `functional-tests-${request.productId}-${Date.now()}`;

    const tests: FunctionalTestCase[] =
      request.tests.map((test) => ({
        id: test.id,
        assemblyElementId: test.assemblyElementId,
        category: test.category,
        name: test.name,
        description: test.description ?? '',
        required: test.required ?? true,
        status: 'PLANNED',
        expectedResult: test.expectedResult,
        findings: [],
      }));

    const plan: FunctionalTestPlan = {
      id,
      productId: request.productId,
      assemblyPlanId: request.assemblyPlanId,
      createdAt: new Date().toISOString(),
      status:
        tests.length > 0 ? 'READY' : 'BLOCKED',
      tests,
      totalTests: tests.length,
      passedTests: 0,
      failedTests: 0,
      blockedTests: 0,
      recommendations:
        tests.length > 0
          ? []
          : ['Create functional tests before execution.'],
    };

    this.plans.set(id, plan);

    return this.get(id);
  }

  get(id: string): FunctionalTestPlan {
    const plan = this.plans.get(id);

    if (!plan) {
      throw new Error(
        `Functional test plan not found: ${id}`
      );
    }

    return this.clone(plan);
  }

  list(): FunctionalTestPlan[] {
    return Array.from(this.plans.values()).map(
      (plan) => this.clone(plan)
    );
  }

  prepare(id: string): FunctionalTestPlan {
    const plan = this.requireMutable(id);

    for (const test of plan.tests) {
      test.findings = [];

      if (
        test.required &&
        !test.assemblyElementId.trim()
      ) {
        test.findings.push(
          'Test is not linked to an assembled application element.'
        );
        test.status = 'BLOCKED';
        continue;
      }

      if (!test.expectedResult.trim()) {
        test.findings.push(
          'Expected result is missing.'
        );
        test.status = 'BLOCKED';
        continue;
      }

      test.status = 'READY';
    }

    this.recalculate(plan);

    return this.get(id);
  }

  begin(id: string): FunctionalTestPlan {
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
  ): FunctionalTestPlan {
    const plan = this.requireMutable(id);

    const test = plan.tests.find(
      (candidate) => candidate.id === testId
    );

    if (!test) {
      throw new Error(
        `Functional test not found: ${testId}`
      );
    }

    if (!actualResult.trim()) {
      throw new Error(
        'Actual test result is required.'
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
        'Functional test did not satisfy its expected result.',
      ];
    }

    this.recalculate(plan);

    return this.get(id);
  }

  blockTest(
    id: string,
    testId: string,
    reason: string
  ): FunctionalTestPlan {
    const plan = this.requireMutable(id);

    const test = plan.tests.find(
      (candidate) => candidate.id === testId
    );

    if (!test) {
      throw new Error(
        `Functional test not found: ${testId}`
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

  canEnterFullApplicationTestingB(
    id: string
  ): boolean {
    const plan = this.requireMutable(id);

    this.recalculate(plan);

    return (
      plan.status === 'PASSED' &&
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
    };
  }

  remove(id: string): boolean {
    return this.plans.delete(id);
  }

  private requireMutable(
    id: string
  ): FunctionalTestPlan {
    const plan = this.plans.get(id);

    if (!plan) {
      throw new Error(
        `Functional test plan not found: ${id}`
      );
    }

    return plan;
  }

  private recalculate(
    plan: FunctionalTestPlan
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
        'Resolve blocked functional tests.',
        'Run the affected tests again.',
      ];
      return;
    }

    if (plan.failedTests > 0) {
      plan.status = 'FAILED';
      plan.recommendations = [
        'Correct failed application functionality.',
        'Re-run functional verification.',
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
        'Structural and functional application testing passed.',
        'Proceed to Full Application Testing B.',
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
    plan: FunctionalTestPlan
  ): FunctionalTestPlan {
    return {
      ...plan,
      tests: plan.tests.map(
        (test) => ({
          ...test,
          findings: [...test.findings],
        })
      ),
      recommendations: [
        ...plan.recommendations,
      ],
    };
  }
}

export const jumoApplicationFunctionalTestingEngine =
  new JumoApplicationFunctionalTestingEngine();
