// JUMO UEOS — Dynamic Schema-Driven Specification Contract Types
// Authoritative definitions for the 19 layers of implementation-grade contracts.

export type ProductClassification = 'ERP_ECOSYSTEM' | 'COMMERCIAL_PLATFORM' | 'SOFTWARE_PROGRAM';

export interface DynamicQuestion {
  id: string;
  label: string;
  type: 'text' | 'number' | 'select' | 'boolean' | 'textarea' | 'list';
  placeholder?: string;
  options?: string[];
  required: boolean;
  defaultValue?: any;
  category: string; // Maps to one of the 19 layers
}

export interface SpecificationSectionSchema {
  id: string;
  title: string;
  description: string;
  questions: DynamicQuestion[];
}

export interface ProductSpecificationSchema {
  classification: ProductClassification;
  sections: SpecificationSectionSchema[];
}

// Complete 19-Section Implementation-Grade Specification Contract
export interface ImplementationGradeSpecificationContract {
  // 1. Classification
  classification: ProductClassification;

  // 2. Product Identity
  identity: {
    productId: string;
    productName: string;
    productVersion: string;
    productClass: string;
    productFamily: string;
    productSubtype: string;
    productPurpose: string;
    productOwner: string;
    operatingOrganization: string;
    targetJurisdiction: string;
    countries: string[];
    languages: string[];
    currencies: string[];
    regulatoryJurisdictions: string[];
    deploymentScope: string;
    lifecycleStatus: string;
    initialReleaseScope: string;
    futureExpansionScope: string;
  };

  // 3. Organizational and Tenancy Model
  tenancyModel: {
    tenantModel: 'SINGLE_TENANT' | 'MULTI_TENANT' | 'HYBRID_TENANT';
    tenantHierarchy: string;
    parentChildRelationships: string;
    organizationHierarchy: string;
    institutionHierarchy: string;
    geographicHierarchy: string;
    administrativeHierarchy: string;
    businessUnitHierarchy: string;
    departmentHierarchy: string;
    branchHierarchy: string;
    userPopulations: string;
    workforcePopulations: string;
    externalUserPopulations: string;
    tenantIsolationRequirements: string;
    crossTenantAggregationRules: string;
    crossTenantAccessRules: string;
    centralAdministrationModel: string;
    delegatedAdministrationModel: string;
  };

  // 4. Capacity Specification
  capacity: {
    organizationsCount: number;
    tenantsCount: number;
    usersCount: number;
    activeUsersCount: number;
    concurrentUsersCount: number;
    administratorsCount: number;
    employeesCount: number;
    transactionsPerDay: number;
    transactionsPerSecond: number;
    peakTransactionsPerSecond: number;
    recordsCount: number;
    documentsCount: number;
    storageGb: number;
    apiRequestsPerSec: number;
    eventsPerSec: number;
    expectedAnnualGrowthPercentage: number;
    geographicNodesCount: number;
    availabilityTargetPercentage: number;
  };

  // 5. Business Operating Model
  businessOperations: {
    businessProcesses: string[];
    organizationalProcesses: string[];
    approvalProcesses: string[];
    authorizationProcesses: string[];
    escalationProcesses: string[];
    exceptionProcesses: string[];
    workflowStates: string[];
    workflowActors: string[];
    decisionPoints: string[];
    approvalThresholds: string;
    segregationOfDutyRules: string[];
    operatingCalendars: string;
    businessHours: string;
    holidayCalendars: string;
    serviceWindows: string;
    cutOffTimes: string;
    periodClosingRules: string;
    openingClosingProcedures: string;
    operationalDependencies: string;
  };

  // 6. Functional Scope (Required Business Capabilities)
  functionalCapabilities: Array<{
    capabilityName: string;
    capabilityDescription: string;
    businessOwner: string;
    userGroups: string[];
    inputs: string[];
    outputs: string[];
    businessRules: string[];
    transactions: string[];
    documents: string[];
    dataDependencies: string[];
    approvalRequirements: string;
    securityClassification: string;
    reportingRequirements: string[];
    integrationRequirements: string[];
    automationLevel: 'MANUAL' | 'SEMI_AUTOMATED' | 'FULLY_AUTOMATED';
    sla: string;
    priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
    criticality: 'NICE_TO_HAVE' | 'IMPORTANT' | 'MISSION_CRITICAL';
    dependencies: string[];
  }>;

  // 7. Data Architecture
  dataArchitecture: {
    dataDomains: string[];
    dataEntities: string[];
    entityOwnership: string;
    masterDataOwnership: string;
    dataClassification: string;
    personalDataClassification: string;
    financialDataClassification: string;
    sensitiveDataClassification: string;
    dataRelationships: string;
    dataLifecycle: string;
    dataRetention: string;
    dataArchival: string;
    dataDeletion: string;
    dataResidency: string;
    dataSovereignty: string;
    dataReplication: string;
    dataSynchronization: string;
    dataMigrationRequirements: string;
    historicalDataRequirements: string;
    reportingDatasets: string[];
    analyticalDatasets: string[];
    auditDatasets: string[];
  };

  // 8. Integration Contract
  integrations: Array<{
    systemName: string;
    systemOwner: string;
    systemType: string;
    interfaceType: string;
    apiSpecification: string;
    authenticationMechanism: string;
    authorizationMechanism: string;
    dataExchanged: string;
    requestFrequency: string;
    expectedThroughput: string;
    timeoutMs: number;
    retryPolicy: string;
    failureBehavior: string;
    idempotencyRequirements: string;
    eventRequirements: string;
    webhookRequirements: string;
    sla: string;
    dependencyCriticality: 'LOW' | 'MEDIUM' | 'HIGH';
    sandboxEnvironmentUrl: string;
    productionEndpointUrl: string;
  }>;

  // 9. Security Implementation Data
  security: {
    authenticationModel: string;
    identityProviders: string[];
    mfaRequirements: string;
    rbacModel: string;
    abacRequirements: string;
    privilegedRoles: string[];
    administrativeRoles: string[];
    serviceIdentities: string[];
    machineIdentities: string[];
    tenantIsolation: string;
    encryptionRequirements: string;
    keyManagementRequirements: string;
    secretsManagementRequirements: string;
    networkSecurity: string;
    apiSecurity: string;
    sessionPolicies: string;
    devicePolicies: string;
    auditRequirements: string;
    securityMonitoring: string;
    threatDetection: string;
    incidentResponse: string;
    fraudControls: string;
    securityTesting: string;
    penetrationTesting: string;
    vulnerabilityManagement: string;
    backupProtection: string;
  };

  // 10. Availability and Disaster Recovery
  availabilityAndRecovery: {
    availabilityTargetPercentage: number;
    rtoMinutes: number;
    rpoMinutes: number;
    maximumAcceptableDowntimeMinutes: number;
    backupFrequency: string;
    backupRetentionDays: number;
    recoveryRegions: string[];
    failoverMode: 'AUTOMATIC' | 'MANUAL' | 'SEMI_AUTOMATIC';
    failoverTimeSeconds: number;
    replicationMode: 'SYNCHRONOUS' | 'ASYNCHRONOUS' | 'HYBRID';
    disasterRecoveryEnvironment: string;
    disasterRecoveryTestingFrequency: string;
    businessContinuityRequirements: string;
    degradedOperationRequirements: string;
  };

  // 11. Performance Engineering
  performance: {
    responseTimeTargetsMs: number;
    apiLatencyTargetsMs: number;
    pageLoadTargetsMs: number;
    queryLatencyTargetsMs: number;
    batchProcessingLimits: string;
    concurrentSessionLimits: number;
    throughputRequirements: string;
    peakLoadPeriods: string;
    loadTestRequirements: string;
    stressTestRequirements: string;
    enduranceTestRequirements: string;
    scalabilityTargets: string;
  };

  // 12. AI Engineering Contract
  aiEngineering: {
    capabilitiesRequired: string[];
    agentsRequired: string[];
    agentResponsibilities: string;
    agentAuthority: string;
    humanApprovalRequirements: string;
    modelClass: string;
    externalProviderRequirements: string;
    localModelRequirements: string;
    hybridExecutionRequirements: string;
    modelRoutingRequirements: string;
    contextSources: string[];
    ragSources: string[];
    knowledgeBoundaries: string;
    toolPermissions: string[];
    agentToAgentCommunication: string;
    aiAuditRequirements: string;
    aiSafetyControls: string;
    aiCostControls: string;
    aiLatencyRequirements: string;
    aiFallbackPolicy: string;
  };

  // 13. Financial Architecture (applicable primarily to ERP)
  financialArchitecture: {
    accountingModel: string;
    chartOfAccountsRequirements: string;
    fiscalPeriods: string;
    journals: string[];
    ledgers: string[];
    subLedgers: string[];
    financialDimensions: string[];
    budgeting: string;
    procurementAccounting: string;
    receivables: string;
    payables: string;
    fixedAssets: string;
    taxation: string;
    revenueRecognition: string;
    financialConsolidation: string;
    treasury: string;
    cashManagement: string;
    bankReconciliation: string;
    paymentRails: string[];
    settlement: string;
    multiCurrency: string;
    exchangeRates: string;
    financialApprovals: string;
    financialAudit: string;
    regulatoryReporting: string;
  };

  // 14. Experience Requirements
  experience: {
    publicExperience: string;
    authenticationExperience: string;
    userWorkspace: string;
    administrativeWorkspace: string;
    institutionalWorkspace: string;
    mobileExperience: string;
    webExperience: string;
    accessibilityStandard: string;
    localization: string;
    languages: string[];
    notifications: string;
    search: string;
    navigation: string;
    forms: string;
    reports: string;
    dashboards: string;
    documentExperience: string;
    workflowExperience: string;
    offlineRequirements: string;
  };

  // 15. Infrastructure Specification
  infrastructure: {
    deploymentType: 'CLOUD' | 'ON_PREMISE' | 'HYBRID';
    regions: string[];
    availabilityZones: string[];
    computeRequirements: string;
    containerRequirements: string;
    databaseRequirements: string;
    cacheRequirements: string;
    messageBroker: string;
    objectStorage: string;
    searchInfrastructure: string;
    cdn: string;
    loadBalancing: string;
    apiGateway: string;
    networking: string;
    dns: string;
    secrets: string;
    certificates: string;
    monitoring: string;
    logging: string;
    tracing: string;
    backupInfrastructure: string;
    disasterRecoveryInfrastructure: string;
  };

  // 16. Compliance and Standards
  compliance: Array<{
    jurisdiction: string;
    regulatoryAuthority: string;
    applicableLegislation: string;
    industryStandard: string;
    dataProtectionRequirements: string;
    financialRegulation: string;
    educationRegulation: string;
    securityStandard: string;
    accessibilityStandard: string;
    recordsManagementRequirements: string;
    auditRequirements: string;
    certificationRequirements: string;
    evidenceRequirements: string;
    criticality: 'MANDATORY' | 'REQUIRED' | 'CONTRACTUAL' | 'RECOMMENDED' | 'OPTIONAL';
  }>;

  // 17. Manufacturing Requirements
  manufacturingRequirements: {
    manufacturingId: string;
    manufacturingVersion: string;
    architectureVersion: string;
    specificationVersion: string;
    requiredStudios: string[];
    requiredEngineeringDisciplines: string[];
    requiredAgents: string[];
    requiredArtifacts: string[];
    requiredDependencies: string[];
    requiredEnvironments: string[];
    requiredTests: string[];
    requiredVerificationGates: string[];
    requiredApprovals: string[];
    deploymentTarget: string;
    runtimeTarget: string;
    rollbackRequirements: string;
    acceptanceCriteria: string[];
  };

  // 18. Traceability Trace Matrix
  traceability: Array<{
    requirementId: string;
    capabilityId: string;
    architectureDecisionId: string;
    serviceId: string;
    apiId: string;
    entityId: string;
    engineeringTaskId: string;
    agentAssignmentId: string;
    testId: string;
    verificationId: string;
  }>;
}

// Global Authoritative Schemas for Specification Studio
export const ERP_SCHEMA: ProductSpecificationSchema = {
  classification: "ERP_ECOSYSTEM",
  sections: [
    {
      id: "identity",
      title: "2. Product Identity",
      description: "Define product naming, ownership, jurisdictions, and versioning variables.",
      questions: [
        { id: "productName", label: "Product Name", type: "text", required: true, placeholder: "e.g. National Healthcare ERP", category: "identity" },
        { id: "productVersion", label: "Product Version", type: "text", required: true, defaultValue: "v1.0.0", category: "identity" },
        { id: "productClass", label: "Product Class", type: "text", required: true, defaultValue: "Enterprise Resource Planning", category: "identity" },
        { id: "productFamily", label: "Product Family", type: "text", required: true, defaultValue: "National Sovereign Infrastructure", category: "identity" },
        { id: "productSubtype", label: "Product Subtype", type: "select", required: true, options: ["Health ERP", "Financial ERP", "Resource ERP", "Educational ERP"], category: "identity" },
        { id: "productPurpose", label: "Product Purpose", type: "textarea", required: true, placeholder: "Provide comprehensive national system integration...", category: "identity" },
        { id: "productOwner", label: "Product Owner", type: "text", required: true, placeholder: "e.g. Ministry of Finance", category: "identity" },
        { id: "operatingOrganization", label: "Operating Organization", type: "text", required: true, placeholder: "e.g. National IT Authority", category: "identity" },
        { id: "targetJurisdiction", label: "Target Jurisdiction(s)", type: "text", required: true, placeholder: "e.g. Sovereign National State", category: "identity" }
      ]
    },
    {
      id: "tenancyModel",
      title: "3. Tenancy and Organization Model",
      description: "Specify structural dimensions, isolation, and delegation boundaries.",
      questions: [
        { id: "tenantModel", label: "Tenant Model Type", type: "select", required: true, options: ["SINGLE_TENANT", "MULTI_TENANT", "HYBRID_TENANT"], defaultValue: "MULTI_TENANT", category: "tenancyModel" },
        { id: "tenantHierarchy", label: "Tenant Hierarchy Scope", type: "textarea", required: true, placeholder: "Federal -> State -> Municipal -> Departmental...", category: "tenancyModel" },
        { id: "tenantIsolationRequirements", label: "Tenant Isolation Protocol", type: "select", required: true, options: ["Database-level Separation", "Schema-level Isolation", "Logical Filter Separation"], category: "tenancyModel" },
        { id: "centralAdministrationModel", label: "Central Administration Model", type: "text", required: true, defaultValue: "Sovereign Root Administrator Delegation", category: "tenancyModel" }
      ]
    },
    {
      id: "capacity",
      title: "4. Capacity Specification",
      description: "Measure structural engineering values to size computation models.",
      questions: [
        { id: "usersCount", label: "Total Registered Users", type: "number", required: true, defaultValue: 100000, category: "capacity" },
        { id: "concurrentUsersCount", label: "Peak Concurrent Users", type: "number", required: true, defaultValue: 5000, category: "capacity" },
        { id: "transactionsPerSecond", label: "Expected Transactions Per Second (TPS)", type: "number", required: true, defaultValue: 150, category: "capacity" },
        { id: "storageGb", label: "Initial Storage Capacity (GB)", type: "number", required: true, defaultValue: 50000, category: "capacity" },
        { id: "availabilityTargetPercentage", label: "SLA Availability Target (%)", type: "number", required: true, defaultValue: 99.99, category: "capacity" }
      ]
    },
    {
      id: "financialArchitecture",
      title: "13. Financial Architecture Contract",
      description: "Configure accounting models, ledgers, and taxation rules.",
      questions: [
        { id: "accountingModel", label: "Accounting Basis Model", type: "select", required: true, options: ["Accrual Basis", "Cash Basis", "Modified Accrual Basis"], category: "financialArchitecture" },
        { id: "chartOfAccountsRequirements", label: "Chart of Accounts Structure", type: "textarea", required: true, placeholder: "10-digit segment mapping (Entity-Department-Account-Project)...", category: "financialArchitecture" },
        { id: "journals", label: "Primary Fiscal Journals", type: "text", required: true, defaultValue: "General, Receivables, Payables, Fixed Assets", category: "financialArchitecture" },
        { id: "taxation", label: "Sovereign Taxation Rules", type: "text", required: true, defaultValue: "Sovereign National GST / VAT Integration Engine", category: "financialArchitecture" }
      ]
    }
  ]
};

export const COMMERCIAL_SCHEMA: ProductSpecificationSchema = {
  classification: "COMMERCIAL_PLATFORM",
  sections: [
    {
      id: "identity",
      title: "2. Platform Identity",
      description: "Platform names, ownership, target markets, and currencies.",
      questions: [
        { id: "productName", label: "Platform Name", type: "text", required: true, placeholder: "e.g. JUMO Commercial Platform", category: "identity" },
        { id: "productVersion", label: "Platform Version", type: "text", required: true, defaultValue: "v1.0.0", category: "identity" },
        { id: "productClass", label: "Platform Class", type: "text", required: true, defaultValue: "Commercial Transaction Engine", category: "identity" },
        { id: "productPurpose", label: "Platform Purpose", type: "textarea", required: true, placeholder: "Drive multi-tenant commercial exchanges...", category: "identity" }
      ]
    },
    {
      id: "capacity",
      title: "4. Capacity and Throughput",
      description: "Expected transactional capacity and API requests.",
      questions: [
        { id: "concurrentUsersCount", label: "Concurrent Transactions Capability", type: "number", required: true, defaultValue: 25000, category: "capacity" },
        { id: "transactionsPerSecond", label: "Sustained Transactions/Sec", type: "number", required: true, defaultValue: 1000, category: "capacity" },
        { id: "storageGb", label: "Object Storage Scale (GB)", type: "number", required: true, defaultValue: 250000, category: "capacity" }
      ]
    }
  ]
};

export const SOFTWARE_SCHEMA: ProductSpecificationSchema = {
  classification: "SOFTWARE_PROGRAM",
  sections: [
    {
      id: "identity",
      title: "2. Program Identity",
      description: "Basic naming and scope parameters.",
      questions: [
        { id: "productName", label: "Program Name", type: "text", required: true, placeholder: "e.g. Real-Time Telemetry Daemon", category: "identity" },
        { id: "productVersion", label: "Program Version", type: "text", required: true, defaultValue: "v1.0.0", category: "identity" },
        { id: "productPurpose", label: "Program Objective", type: "textarea", required: true, placeholder: "Execute high-performance background telemetry logging...", category: "identity" }
      ]
    },
    {
      id: "capacity",
      title: "4. Capacity Metrics",
      description: "Resource targets.",
      questions: [
        { id: "apiRequestsPerSec", label: "API Ingress Capacity (req/sec)", type: "number", required: true, defaultValue: 100, category: "capacity" },
        { id: "availabilityTargetPercentage", label: "Program Availability Target (%)", type: "number", required: true, defaultValue: 99.9, category: "capacity" }
      ]
    }
  ]
};
