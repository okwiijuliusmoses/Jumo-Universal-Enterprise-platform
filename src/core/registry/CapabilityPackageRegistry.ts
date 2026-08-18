import { 
  CapabilityPackage, 
  Capability, 
  ModuleRegistryEntry, 
  FormDefinition, 
  WorkflowDefinition, 
  ReportDefinition, 
  AIServiceDefinition, 
  OfficeType,
  OfficeDefinition,
  ResolvedOfficeConfig
} from '../../erp/types';

export class CapabilityPackageRegistry {
  private static instance: CapabilityPackageRegistry;
  private packages: Map<string, CapabilityPackage> = new Map();

  private constructor() {
    this.seedDefaultPackages();
  }

  public static getInstance(): CapabilityPackageRegistry {
    if (!this.instance) {
      this.instance = new CapabilityPackageRegistry();
    }
    return this.instance;
  }

  public registerPackage(pkg: CapabilityPackage): void {
    this.packages.set(pkg.code, pkg);
    this.packages.set(pkg.id, pkg);
  }

  public registerPackages(pkgs: CapabilityPackage[]): void {
    pkgs.forEach(p => this.registerPackage(p));
  }

  public getPackage(codeOrId: string): CapabilityPackage | undefined {
    return this.packages.get(codeOrId);
  }

  public getAllPackages(): CapabilityPackage[] {
    const unique = new Map<string, CapabilityPackage>();
    this.packages.forEach(p => unique.set(p.code, p));
    return Array.from(unique.values());
  }

  public getPackagesByCategory(category: CapabilityPackage['category']): CapabilityPackage[] {
    return this.getAllPackages().filter(p => p.category === category);
  }

  /**
   * Automatically resolves Capability, Module, Form, Workflow, Report, and AI configurations
   * from the registry for a given office or package list.
   */
  public resolveOfficeConfigurations(
    office: {
      code?: string;
      officeType?: OfficeType;
      capabilityPackageCodes?: string[];
      capabilityCodes?: string[];
      moduleCodes?: string[];
      formCodes?: string[];
      workflowCodes?: string[];
      reportCodes?: string[];
      aiServiceCodes?: string[];
      permissions?: string[];
    },
    context: {
      allCapabilities: Capability[];
      allModules: ModuleRegistryEntry[];
      allForms: FormDefinition[];
      allWorkflows: WorkflowDefinition[];
      allReports?: ReportDefinition[];
      allAIServices?: AIServiceDefinition[];
    }
  ): ResolvedOfficeConfig {
    const matchedPackages: CapabilityPackage[] = [];
    const packageCodesToMatch = new Set<string>(office.capabilityPackageCodes || []);

    // If no explicit package codes, attempt intelligent mapping by officeType
    if (packageCodesToMatch.size === 0 && office.officeType) {
      const defaultPackageCode = this.getDefaultPackageCodeForOfficeType(office.officeType);
      if (defaultPackageCode) {
        packageCodesToMatch.add(defaultPackageCode);
      }
    }

    packageCodesToMatch.forEach(code => {
      const pkg = this.getPackage(code);
      if (pkg) matchedPackages.push(pkg);
    });

    // Aggregate capability codes
    const resolvedCapabilityCodes = new Set<string>(office.capabilityCodes || []);
    matchedPackages.forEach(pkg => {
      pkg.capabilityCodes.forEach(cc => resolvedCapabilityCodes.add(cc));
    });

    // Resolve Capabilities
    const resolvedCapabilities = context.allCapabilities.filter(c => 
      resolvedCapabilityCodes.has(c.code) || resolvedCapabilityCodes.has(c.id)
    );

    // Aggregate Module Codes
    const resolvedModuleCodes = new Set<string>(office.moduleCodes || []);
    matchedPackages.forEach(pkg => {
      pkg.defaultModuleCodes.forEach(mc => resolvedModuleCodes.add(mc));
    });

    // Also include modules linked directly to resolved capabilities
    const capabilityIdSet = new Set(resolvedCapabilities.map(c => c.id).concat(resolvedCapabilities.map(c => c.code)));
    const resolvedModules = context.allModules.filter(m => 
      resolvedModuleCodes.has(m.id) || 
      resolvedModuleCodes.has(m.componentKey) || 
      capabilityIdSet.has(m.capabilityId)
    );

    // Aggregate Form Codes
    const resolvedFormCodes = new Set<string>(office.formCodes || []);
    matchedPackages.forEach(pkg => {
      pkg.defaultFormCodes.forEach(fc => resolvedFormCodes.add(fc));
    });

    // Match forms by form code or target domain associated with capabilities
    const targetDomains = new Set<string>();
    if (office.officeType === 'FINANCIAL') targetDomains.add('FINANCE');
    if (office.officeType === 'ACADEMIC' || office.officeType === 'STUDENT_FACING') targetDomains.add('SIS');
    if (office.officeType === 'ADMINISTRATIVE') targetDomains.add('HR');
    if (office.officeType === 'OPERATIONAL') targetDomains.add('OPERATIONS');

    const resolvedForms = context.allForms.filter(f => 
      resolvedFormCodes.has(f.code) || 
      resolvedFormCodes.has(f.id) ||
      (resolvedFormCodes.size === 0 && targetDomains.has(f.targetDomain))
    );

    // Aggregate Workflow Codes
    const resolvedWorkflowCodes = new Set<string>(office.workflowCodes || []);
    matchedPackages.forEach(pkg => {
      pkg.defaultWorkflowCodes.forEach(wfc => resolvedWorkflowCodes.add(wfc));
    });
    const resolvedWorkflows = context.allWorkflows.filter(w => 
      resolvedWorkflowCodes.has(w.code) || resolvedWorkflowCodes.has(w.id)
    );

    // Aggregate Report Codes
    const resolvedReportCodes = new Set<string>(office.reportCodes || []);
    matchedPackages.forEach(pkg => {
      pkg.defaultReportCodes.forEach(rc => resolvedReportCodes.add(rc));
    });
    const allReports = context.allReports || this.getDefaultReports();
    const resolvedReports = allReports.filter(r => 
      resolvedReportCodes.has(r.code) || resolvedReportCodes.has(r.id)
    );

    // Aggregate AI Services
    const resolvedAICodes = new Set<string>(office.aiServiceCodes || []);
    matchedPackages.forEach(pkg => {
      pkg.defaultAICodes.forEach(aic => resolvedAICodes.add(aic));
    });
    const allAIServices = context.allAIServices || this.getDefaultAIServices();
    const resolvedAIServices = allAIServices.filter(ai => 
      resolvedAICodes.has(ai.code) || resolvedAICodes.has(ai.id)
    );

    // Permissions
    const permissions = new Set<string>(office.permissions || []);
    if (office.officeType === 'FINANCIAL') {
      permissions.add('FIN_GL_POST');
      permissions.add('FIN_VOTE_MANAGE');
      permissions.add('FIN_CASHBOOK_RECON');
    }
    if (office.officeType === 'ACADEMIC') {
      permissions.add('ACAD_MARKS_INPUT');
      permissions.add('ACAD_TIMETABLE_BUILD');
    }
    if (office.officeType === 'EXECUTIVE') {
      permissions.add('EXEC_ALL');
      permissions.add('AUDIT_INSPECT');
    }

    return {
      capabilities: resolvedCapabilities,
      modules: resolvedModules,
      forms: resolvedForms,
      workflows: resolvedWorkflows,
      reports: resolvedReports,
      aiServices: resolvedAIServices,
      permissions: Array.from(permissions)
    };
  }

  public getDefaultPackageCodeForOfficeType(officeType: OfficeType): string | undefined {
    switch (officeType) {
      case 'FINANCIAL':
        return 'FINANCE_FULL_SUITE';
      case 'ACADEMIC':
      case 'STUDENT_FACING':
        return 'SIS_FULL_SUITE';
      case 'EXECUTIVE':
      case 'REGULATORY':
        return 'GOVERNANCE_AUDIT_SUITE';
      case 'OPERATIONAL':
      case 'SUPPORT':
        return 'CAMPUS_OPERATIONS_SUITE';
      case 'ADMINISTRATIVE':
        return 'HR_STAFF_SUITE';
      case 'EXTERNAL_FACING':
        return 'UNIVERSAL_PAYMENT_SUITE';
      default:
        return undefined;
    }
  }

  public getDefaultReports(): ReportDefinition[] {
    return [
      { id: 'REP-FIN-TB', code: 'TRIAL_BALANCE', title: 'Statutory Trial Balance', category: 'FINANCE', description: 'Double-entry debit and credit verification', parameters: ['asOfDate', 'format'] },
      { id: 'REP-FIN-GL', code: 'GENERAL_LEDGER_REPORT', title: 'General Ledger Audit Activity', category: 'FINANCE', description: 'Detailed debit and credit ledger transactions', parameters: ['startDate', 'endDate', 'accountCode'] },
      { id: 'REP-FIN-PL', code: 'PROFIT_AND_LOSS', title: 'Statement of Comprehensive Income (P&L)', category: 'FINANCE', description: 'Institutional operating income and expenditure summary', parameters: ['fiscalYear', 'period'] },
      { id: 'REP-FIN-BS', code: 'BALANCE_SHEET', title: 'Statement of Financial Position (Balance Sheet)', category: 'FINANCE', description: 'Assets, Liabilities, and Institutional Capital Equities', parameters: ['asOfDate'] },
      { id: 'REP-FIN-CF', code: 'CASH_FLOW_STATEMENT', title: 'Statement of Cash Flows', category: 'FINANCE', description: 'Operating, investing, and financing cash flows', parameters: ['fiscalYear'] },
      { id: 'REP-FIN-BDG', code: 'BUDGET_EXECUTION_REPORT', title: 'Budget Execution & Variance Digest', category: 'FINANCE', description: 'Departmental approved vs committed vs actual variance', parameters: ['fiscalYear', 'directorate'] },
      { id: 'REP-FIN-VOTE', code: 'VOTE_BOOK_CONTROL_REPORT', title: 'Institutional Vote Book Commitment Register', category: 'FINANCE', description: 'Encumbrances, uncommitted vote balances, and LPO allocations', parameters: ['voteCode', 'fiscalYear'] },
      { id: 'REP-FIN-CASH', code: 'TRIPLE_COLUMN_CASH_REPORT', title: 'Cash Books & Contra Transfer Audit', category: 'FINANCE', description: 'Single, double, and triple-column cash book journals', parameters: ['cashBookType', 'dateRange'] },
      { id: 'REP-FIN-AR', code: 'FEES_AGING_REPORT', title: 'Accounts Receivable Student Fees Aging', category: 'FINANCE', description: '30/60/90+ day fee arrears analysis by class stream', parameters: ['term', 'classLevel'] },
      { id: 'REP-FIN-AP', code: 'ACCOUNTS_PAYABLE_AGING', title: 'Supplier Accounts Payable Aging', category: 'FINANCE', description: 'Trade vendor liabilities and payment schedule due dates', parameters: ['vendorId'] },
      { id: 'REP-SIS-ENR', code: 'STUDENT_ENROLLMENT_CENSUS', title: 'Student Enrollment Census & Demographics', category: 'SIS', description: 'Gender, class stream, boarding ratio, and house census', parameters: ['academicYear', 'term'] },
      { id: 'REP-SIS-GRD', code: 'CONTINUOUS_ASSESSMENT_BROADSHEET', title: 'Continuous Assessment & Exam Broadsheet', category: 'ACADEMIC', description: 'CAT 1/2, Exam, and Grade allocations by subject', parameters: ['classLevel', 'term', 'stream'] },
      { id: 'REP-SIS-TRN', code: 'OFFICIAL_ACADEMIC_TRANSCRIPT', title: 'Cumulative Academic Transcript', category: 'SIS', description: 'Termly GPA progression and accredited subject credits', parameters: ['studentId'] },
      { id: 'REP-SIS-ATT', code: 'DAILY_ATTENDANCE_DIGEST', title: 'Daily & Subject Attendance Summary', category: 'SIS', description: 'Student attendance frequency and absenteeism alerts', parameters: ['startDate', 'endDate', 'classLevel'] },
      { id: 'REP-AUD-01', code: 'STATUTORY_AUDITOR_FINDINGS', title: 'Auditor Observation & Compliance Register', category: 'AUDIT', description: 'Internal audit findings, risk levels, and management responses', parameters: ['fiscalYear', 'status'] },
      { id: 'REP-HR-STAFF', code: 'FACULTY_STAFF_DEPLOYMENT', title: 'Staff Deployment & Qualification Register', category: 'GOVERNANCE', description: 'Active teaching personnel, subject specializations, and contracts', parameters: ['departmentId'] },
      { id: 'REP-OPS-ESTATES', code: 'CAMPUS_ASSETS_MAINTENANCE', title: 'Estates & Infrastructure Condition Audit', category: 'GOVERNANCE', description: 'Building health, STEM laboratory equipment, and work orders', parameters: ['facilityType'] },
      { id: 'REP-OPS-FARM', code: 'FARM_PRODUCTION_YIELD', title: 'School Farm Agricultural Yield & Revenue', category: 'GOVERNANCE', description: 'Crops, livestock, kitchen rations, and market revenue', parameters: ['season'] }
    ];
  }

  public getDefaultAIServices(): AIServiceDefinition[] {
    return [
      { id: 'AI-FIN-ANOMALY', code: 'FIN_ANOMALY_DETECTOR', name: 'Treasury Anomaly & Risk Detector', domain: 'FINANCE', description: 'Scans double-entry journal vouchers for out-of-band anomalies', capabilities: ['ANOMALY_DETECTION', 'FRAUD_PREVENTION'] },
      { id: 'AI-FIN-CASHFLOW', code: 'CASHFLOW_FORECASTER', name: 'Predictive Cash Flow Intelligence', domain: 'FINANCE', description: 'Forecasts 90-day institutional liquidity and fee velocity', capabilities: ['CASHFLOW_PROJECTION', 'LIQUIDITY_OPTIMIZATION'] },
      { id: 'AI-SIS-INTERVENTION', code: 'ACADEMIC_INTERVENTION_AI', name: 'Student Academic Early Intervention AI', domain: 'SIS', description: 'Detects grade drop trends across CAT 1/2 and triggers remedial alerts', capabilities: ['GRADE_TREND_ANALYSIS', 'INTERVENTION_ALERT'] },
      { id: 'AI-AUD-LEAKAGE', code: 'REVENUE_LEAKAGE_INSPECTOR', name: 'Revenue Leakage & Vote Book Inspector', domain: 'EXECUTIVE', description: 'Continuous audit verification of uncommitted votes and receipt contra transfers', capabilities: ['VOTE_INTEGRITY', 'LEAKAGE_DETECTION'] },
      { id: 'AI-ACAD-LESSON', code: 'SYLLABUS_LESSON_COPILOT', name: 'Syllabus Scheme & Lesson Plan Copilot', domain: 'ACADEMIC', description: 'Automates lesson plan drafting mapped to Cambridge / National Syllabi', capabilities: ['CURRICULUM_MAPPING', 'LESSON_DRAFTING'] },
      { id: 'AI-OPS-MAINTENANCE', code: 'ESTATES_PREDICTIVE_MAINTENANCE', name: 'Estates Predictive Maintenance Heuristic', domain: 'EXECUTIVE', description: 'Analyzes campus infrastructure wear-and-tear and preventive scheduling', capabilities: ['WORK_ORDER_TRIAGE', 'PREDICTIVE_REPAIR'] }
    ];
  }

  private seedDefaultPackages(): void {
    const packages: CapabilityPackage[] = [
      {
        id: 'PKG-FIN-FULL',
        code: 'FINANCE_FULL_SUITE',
        name: 'JUMO FAAP Comprehensive Financial Suite',
        category: 'FINANCE',
        description: 'Complete institutional financial architecture: COA, GL, Budget Book, Vote Book, Cash Books, Auditor Books, Billing, A/P Bills, Bank Feeds, and Digital Pay',
        capabilityCodes: ['CAP-FIN-COA', 'CAP-FIN-GL', 'CAP-FIN-BILL', 'CAP-FIN-REC', 'CAP-FIN-PAY', 'CAP-FIN-BNK', 'CAP-FIN-BDG', 'CAP-FIN-AST', 'CAP-FIN-TAX', 'CAP-FIN-REP', 'CAP-FIN-AI'],
        defaultModuleCodes: ['MOD-FIN-01', 'MOD-REP-01'],
        defaultFormCodes: ['FORM-FIN-01', 'FORM-FIN-02', 'FORM-FIN-03', 'FORM-FIN-04'],
        defaultWorkflowCodes: ['WF-FIN-01'],
        defaultReportCodes: ['TRIAL_BALANCE', 'GENERAL_LEDGER_REPORT', 'PROFIT_AND_LOSS', 'BALANCE_SHEET', 'CASH_FLOW_STATEMENT', 'BUDGET_EXECUTION_REPORT', 'VOTE_BOOK_CONTROL_REPORT', 'TRIPLE_COLUMN_CASH_REPORT', 'FEES_AGING_REPORT', 'ACCOUNTS_PAYABLE_AGING'],
        defaultAICodes: ['FIN_ANOMALY_DETECTOR', 'CASHFLOW_FORECASTER']
      },
      {
        id: 'PKG-SIS-FULL',
        code: 'SIS_FULL_SUITE',
        name: 'JUMO ALPHA Complete Student Information Suite',
        category: 'SIS',
        description: 'Full education capability engine: Student Dossiers, Admissions Lifecycle, Enrollment, Timetables, Continuous Assessments, Transcripts, and Report Cards',
        capabilityCodes: ['CAP-SIS-REG', 'CAP-SIS-ADM', 'CAP-SIS-ATT', 'CAP-SIS-GRD', 'CAP-SIS-TRN', 'CAP-SIS-ONB', 'CAP-SIS-DOC', 'CAP-SIS-AID'],
        defaultModuleCodes: ['MOD-SIS-01', 'MOD-ACAD-01'],
        defaultFormCodes: ['FORM-ADM-01', 'FORM-SIS-01'],
        defaultWorkflowCodes: ['WF-ADM-01'],
        defaultReportCodes: ['STUDENT_ENROLLMENT_CENSUS', 'CONTINUOUS_ASSESSMENT_BROADSHEET', 'OFFICIAL_ACADEMIC_TRANSCRIPT', 'DAILY_ATTENDANCE_DIGEST'],
        defaultAICodes: ['ACADEMIC_INTERVENTION_AI']
      },
      {
        id: 'PKG-ACAD-FULL',
        code: 'ACADEMIC_FACULTY_SUITE',
        name: 'Curriculum & Faculty Suite',
        category: 'ACADEMIC',
        description: 'Curriculum Syllabi, Subject Catalog, Master Timetable Engine, Schemes of Work, and Lesson Plans',
        capabilityCodes: ['CAP-ACAD-CUR', 'CAP-ACAD-CRS', 'CAP-ACAD-TIM', 'CAP-ACAD-LES', 'CAP-ACAD-AI', 'CAP-ACAD-MOD'],
        defaultModuleCodes: ['MOD-ACAD-01'],
        defaultFormCodes: ['FORM-SIS-01'],
        defaultWorkflowCodes: ['WF-ADM-01'],
        defaultReportCodes: ['CONTINUOUS_ASSESSMENT_BROADSHEET'],
        defaultAICodes: ['SYLLABUS_LESSON_COPILOT']
      },
      {
        id: 'PKG-GOV-FULL',
        code: 'GOVERNANCE_AUDIT_SUITE',
        name: 'Executive Governance & Auditor Suite',
        category: 'GOVERNANCE',
        description: 'Board Governance, Executive Insights, Audit Logging, Auditor Books, and Risk Anomaly Detection',
        capabilityCodes: ['CAP-GOV-EXEC', 'CAP-GOV-AUD', 'CAP-GOV-BOG', 'CAP-GOV-PRP', 'CAP-FIN-REP'],
        defaultModuleCodes: ['MOD-EXEC-01', 'MOD-REP-01'],
        defaultFormCodes: [],
        defaultWorkflowCodes: ['WF-ADM-01', 'WF-FIN-01'],
        defaultReportCodes: ['STATUTORY_AUDITOR_FINDINGS', 'TRIAL_BALANCE', 'BALANCE_SHEET'],
        defaultAICodes: ['REVENUE_LEAKAGE_INSPECTOR']
      },
      {
        id: 'PKG-OPS-FULL',
        code: 'CAMPUS_OPERATIONS_SUITE',
        name: 'Campus Operations & Support Services Suite',
        category: 'OPERATIONS',
        description: 'Estates Maintenance, School Farm Enterprise, Sickbay Health, Fleet Logistics, Hostels, and Library Lending',
        capabilityCodes: ['CAP-EST-ASSET', 'CAP-FARM-ENT', 'CAP-OPS-HST', 'CAP-OPS-HLT', 'CAP-OPS-TRP', 'CAP-STR-INV', 'CAP-LIB-CAT', 'CAP-LIB-LON'],
        defaultModuleCodes: ['MOD-OPS-01'],
        defaultFormCodes: ['FORM-OPS-01'],
        defaultWorkflowCodes: ['WF-FIN-01'],
        defaultReportCodes: ['CAMPUS_ASSETS_MAINTENANCE', 'FARM_PRODUCTION_YIELD'],
        defaultAICodes: ['ESTATES_PREDICTIVE_MAINTENANCE']
      },
      {
        id: 'PKG-PAY-FULL',
        code: 'UNIVERSAL_PAYMENT_SUITE',
        name: 'Universal JUMO DIGITAL PAY Suite',
        category: 'UNIVERSAL_PAY',
        description: 'Digital payment gateway integration (MTN MoMo, Airtel Money, Cards), instant auto-reconciliation, receipt vouchers, and reversing journals',
        capabilityCodes: ['CAP-FIN-REC', 'CAP-FIN-BNK', 'CAP-FIN-GL'],
        defaultModuleCodes: ['MOD-FIN-01'],
        defaultFormCodes: ['FORM-FIN-03'],
        defaultWorkflowCodes: ['WF-FIN-01'],
        defaultReportCodes: ['TRIPLE_COLUMN_CASH_REPORT', 'FEES_AGING_REPORT'],
        defaultAICodes: ['FIN_ANOMALY_DETECTOR']
      },
      {
        id: 'PKG-HR-FULL',
        code: 'HR_STAFF_SUITE',
        name: 'Human Resources & Staff Administration Suite',
        category: 'HR',
        description: 'Staff dossiers, employee contracts, leave authorization routing, appraisals, and payroll schedule integration',
        capabilityCodes: ['CAP-HR-STAFF', 'CAP-HR-LEV', 'CAP-HR-APP', 'CAP-HR-PAY', 'CAP-WRK-OFF'],
        defaultModuleCodes: ['MOD-HR-01', 'MOD-WRK-01'],
        defaultFormCodes: ['FORM-HR-01'],
        defaultWorkflowCodes: ['WF-ADM-01'],
        defaultReportCodes: ['FACULTY_STAFF_DEPLOYMENT'],
        defaultAICodes: []
      },
      {
        id: 'PKG-AUDIT-FULL',
        code: 'INTERNAL_AUDITOR_SUITE',
        name: 'Statutory Internal Auditor & Risk Suite',
        category: 'GOVERNANCE',
        description: 'Dedicated auditor observations, risk ranking, root cause analysis, management responses, and resolution status',
        capabilityCodes: ['CAP-GOV-AUD', 'CAP-FIN-REP', 'CAP-GOV-EXEC'],
        defaultModuleCodes: ['MOD-FIN-01', 'MOD-EXEC-01', 'MOD-REP-01'],
        defaultFormCodes: [],
        defaultWorkflowCodes: [],
        defaultReportCodes: ['STATUTORY_AUDITOR_FINDINGS', 'TRIAL_BALANCE', 'GENERAL_LEDGER_REPORT'],
        defaultAICodes: ['REVENUE_LEAKAGE_INSPECTOR']
      }
    ];

    packages.forEach(p => this.registerPackage(p));
  }
}
