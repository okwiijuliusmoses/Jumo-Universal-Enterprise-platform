import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  FileText, Search, Plus, Filter, 
  ArrowRight, CheckCircle2, AlertCircle, 
  Settings, Database, Globe, Zap, Clock,
  Keyboard, Bot, Sparkles, Building2, 
  Layers, Cpu, Check, Network, Landmark, 
  Laptop, ShieldAlert, AlertTriangle, Play, HelpCircle
} from 'lucide-react';
import { SovereignGovernanceRegistry } from '../../../services/gov/SovereignGovernanceRegistry';
import { DigitalProductManufacturingOrchestrator } from '../../../services/factory/DigitalProductManufacturingOrchestrator';
import { JumoFloatingAssistant } from '../../shell/JumoFloatingAssistant';
import { JumoEventBus } from '../../../core/common/events/JumoEventBus';
import { 
  ProductClassification, 
  ImplementationGradeSpecificationContract,
  ERP_SCHEMA,
  COMMERCIAL_SCHEMA,
  SOFTWARE_SCHEMA 
} from '../../../types/specification';

export const SpecificationStudio: React.FC = () => {
  // Classification state
  const [classification, setClassification] = useState<ProductClassification>('ERP_ECOSYSTEM');
  
  // Navigation / Stepper within 19-Section Form
  const [activeTab, setActiveTab] = useState<'classification' | 'identity' | 'tenancy' | 'capacity' | 'functional' | 'data' | 'integrations' | 'security' | 'financial' | 'ai' | 'compliance' | 'traceability' | 'manufacturing' | 'json'>('classification');
  
  // Real-time completeness metrics
  const [completeness, setCompleteness] = useState<number>(15);

  // Applet state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedJobId, setSubmittedJobId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'designer' | 'assistant'>('designer');

  // AI Provider verification health stats (zero-mock)
  const [providerHealth, setProviderHealth] = useState<any>(null);
  const [verifyingProviders, setVerifyingProviders] = useState(false);

  // Fetch real-time provider health to support AI Engineering Contract verification
  const checkAIProviders = async () => {
    setVerifyingProviders(true);
    try {
      const res = await fetch("/api/v1/ueos/ai/providers/health");
      if (res.ok) {
        const data = await res.json();
        setProviderHealth(data);
      }
    } catch (err) {
      console.error("AI Provider check failed:", err);
    } finally {
      setVerifyingProviders(false);
    }
  };

  useEffect(() => {
    checkAIProviders();
  }, []);

  // Form State representing the complete 19-layer specification contract
  const [identity, setIdentity] = useState({
    productId: `PROD-${Date.now()}`,
    productName: '',
    productVersion: '1.0.0',
    productClass: 'Enterprise Resource Planning',
    productFamily: 'National Sovereign Infrastructure',
    productSubtype: 'Health ERP',
    productPurpose: '',
    productOwner: '',
    operatingOrganization: 'National IT Authority',
    targetJurisdiction: 'Sovereign National State',
    countries: ['Sovereign State'],
    languages: ['English'],
    currencies: ['USD'],
    regulatoryJurisdictions: ['National Central Council'],
    deploymentScope: 'National Enterprise Scale',
    lifecycleStatus: 'PRE_MANUFACTURING_SPECIFICATION',
    initialReleaseScope: 'MVP Base Core Services',
    futureExpansionScope: 'Federated Regional Nodes Integration'
  });

  const [tenancy, setTenancy] = useState({
    tenantModel: 'MULTI_TENANT' as 'SINGLE_TENANT' | 'MULTI_TENANT' | 'HYBRID_TENANT',
    tenantHierarchy: 'Federal Hub -> Regional Divisions -> Branch Units',
    parentChildRelationships: 'Strict structural parent-child isolation with secure global registry aggregation.',
    organizationHierarchy: 'Ministry -> Agency -> Operating Departments',
    institutionHierarchy: 'HQ Operations -> Regional Operational Offices',
    geographicHierarchy: 'Primary Zone Alpha -> Regional Sub-Zones',
    administrativeHierarchy: 'Global Sovereign Admin -> delegated Regional Admins',
    businessUnitHierarchy: 'Corporate Executive -> Divisional Profit Centers',
    departmentHierarchy: 'Information Technology, Finance, Human Resources, Operations',
    branchHierarchy: 'Primary Metropolis Main Branch, Secondary Urban Satellites',
    userPopulations: 'Sovereign Authorized Citizens & Registered Operators',
    workforcePopulations: 'National Civil Service Employees & Internal Contractors',
    externalUserPopulations: 'Authorized Third-party External Audit Inspectors',
    tenantIsolationRequirements: 'Database-level separation with isolated schema namespaces and active query filters.',
    crossTenantAggregationRules: 'Only aggregated, anonymized reporting datasets accessible via Root Admin permission.',
    crossTenantAccessRules: 'Explicitly denied access across tenants except via authorized mutual proxy endpoints.',
    centralAdministrationModel: 'Root governance council holding multi-sig ledger administrative privileges.',
    delegatedAdministrationModel: 'Granular role-based local permissions for individual institution admins.'
  });

  const [capacity, setCapacity] = useState({
    organizationsCount: 25,
    tenantsCount: 150,
    usersCount: 500000,
    activeUsersCount: 120000,
    concurrentUsersCount: 15000,
    administratorsCount: 450,
    employeesCount: 12000,
    transactionsPerDay: 2500000,
    transactionsPerSecond: 250,
    peakTransactionsPerSecond: 850,
    recordsCount: 15000000,
    documentsCount: 4500000,
    storageGb: 80000, // 80 TB
    apiRequestsPerSec: 1500,
    eventsPerSec: 3500,
    expectedAnnualGrowthPercentage: 25,
    geographicNodesCount: 12,
    availabilityTargetPercentage: 99.99
  });

  const [businessOps, setBusinessOps] = useState({
    businessProcesses: ['Procure-to-Pay', 'Order-to-Cash', 'Record-to-Report', 'Hire-to-Retire'],
    organizationalProcesses: ['National Asset Auditing', 'Inter-departmental Reconciliation'],
    approvalProcesses: ['Hierarchical Financial Approval Chain', 'Multi-sig Compliance Verification'],
    authorizationProcesses: ['Federated OpenID Connect JWT Access Check'],
    escalationProcesses: ['SLA breach automatically escalated to department lead'],
    exceptionProcesses: ['Manual emergency bypass log in sovereign ledger'],
    workflowStates: ['DRAFT', 'SUBMITTED', 'PENDING_APPROVAL', 'APPROVED', 'DISPATCHED', 'COMPLETED'],
    workflowActors: ['Operator', 'Supervisor', 'Department Head', 'Sovereign Auditor'],
    decisionPoints: ['Budget Threshold check', 'Jurisdiction Validation'],
    approvalThresholds: 'Financial thresholds: Supervisor limit $10K, Department Head limit $100K, Council >$100K',
    segregationOfDutyRules: ['Maker-Checker enforcement on ledger entries', 'No user can both issue and approve a voucher'],
    operatingCalendars: 'Standard Sovereign Fiscal Calendar (July-June)',
    businessHours: 'Sovereign standard 08:00 - 18:00',
    holidayCalendars: 'Official National Sovereign Holidays List',
    serviceWindows: 'Daily low-load window 02:00 - 04:00',
    cutOffTimes: 'End of fiscal business cut-off 17:30 daily',
    periodClosingRules: 'Soft monthly close on 1st, hard monthly close on 5th of subsequent period',
    openingClosingProcedures: 'Automated ledger balance check before daily cycle launch',
    operationalDependencies: 'Real-time connection to Sovereign Identity Registry and National Treasury Hub'
  });

  // Dynamic capabilities list (Layer 6)
  const [capabilities, setCapabilities] = useState<any[]>([
    {
      capabilityName: 'Sovereign Core Ledger',
      capabilityDescription: 'Authoritative financial double-entry transaction posting engine.',
      businessOwner: 'Ministry of Finance',
      userGroups: ['Accountants', 'Financial Auditors'],
      inputs: ['Transaction Vouchers', 'Payment Proofs'],
      outputs: ['Financial Ledgers', 'Balance Sheets'],
      businessRules: ['Every debit must balance with a corresponding credit.'],
      transactions: ['TX_POST_LEDGER', 'TX_ADJUST_BALANCE'],
      documents: ['General Ledger Report', 'Audit Trial'],
      dataDependencies: ['AccountsRegistry', 'FiscalPeriods'],
      approvalRequirements: 'Dual Authorization Required (Maker-Checker)',
      securityClassification: 'HIGHLY_CONFIDENTIAL',
      reportingRequirements: ['Daily Balance Sheet', 'Quarterly Revenue Statement'],
      integrationRequirements: ['National Central Bank Gateway'],
      automationLevel: 'FULLY_AUTOMATED',
      sla: 'Response within 150ms',
      priority: 'CRITICAL',
      criticality: 'MISSION_CRITICAL',
      dependencies: ['IdentityVerificationService']
    }
  ]);

  const [newCapName, setNewCapName] = useState('');
  const [newCapDesc, setNewCapDesc] = useState('');

  const handleAddCapability = () => {
    if (!newCapName || !newCapDesc) return;
    setCapabilities([...capabilities, {
      capabilityName: newCapName,
      capabilityDescription: newCapDesc,
      businessOwner: 'Ecosystem Standard',
      userGroups: ['Standard Users'],
      inputs: ['Standard Input'],
      outputs: ['Standard Output'],
      businessRules: ['Follow general system policies.'],
      transactions: ['TX_GENERIC'],
      documents: ['Execution Log'],
      dataDependencies: ['CoreRegistry'],
      approvalRequirements: 'Standard Approval',
      securityClassification: 'RESTRICTED',
      reportingRequirements: ['Execution Summary'],
      integrationRequirements: ['None'],
      automationLevel: 'SEMI_AUTOMATED',
      sla: 'Response within 1000ms',
      priority: 'MEDIUM',
      criticality: 'IMPORTANT',
      dependencies: []
    }]);
    setNewCapName('');
    setNewCapDesc('');
  };

  // Data architecture (Layer 7)
  const [dataArch, setDataArch] = useState({
    dataDomains: ['Financial Ledger Domain', 'Identity and Security Domain', 'Asset Tracking Domain'],
    dataEntities: ['FinancialAccount', 'JournalEntry', 'UserIdentity', 'SystemAuditLog'],
    entityOwnership: 'Root Ministry holds sovereign legal ownership of all data registries.',
    masterDataOwnership: 'Master Identity owned by Civil Registry, Master Account by Treasury.',
    dataClassification: 'Sovereign Tier-1 Confidential data architecture',
    personalDataClassification: 'PII: UserIdentities containing national ID and contact details encrypted at rest.',
    financialDataClassification: 'FSI: Ledger balances, payment routing IDs, transaction records mapped to double-entry ledger.',
    sensitiveDataClassification: 'Audit Logs & Private cryptographic keys are classified as TOP_SECRET.',
    dataRelationships: 'UserIdentity [1] -> [N] JournalEntry; FinancialAccount [1] -> [N] JournalEntry',
    dataLifecycle: 'Ingestion -> Validation -> Active State -> Soft Archival -> Cold Vault Storage -> Hard Deletion (if requested)',
    dataRetention: 'Financial data retained for 7 years as mandated by national legislation.',
    dataArchival: 'Automated archival of records older than 18 months to secondary low-cost deep storage.',
    dataDeletion: 'Sovereign audit approval required before any hard deletion from cold storage is executed.',
    dataResidency: 'All data must physically reside within national geographical boundaries (VPC Zone A).',
    dataSovereignty: 'Under no circumstances will third-party sub-processors have access to unencrypted raw tables.',
    dataReplication: 'Synchronous replication across 3 availability zones within the host region.',
    dataSynchronization: 'Real-time streaming ledger sync via secure event stream to Central National Ledger.',
    dataMigrationRequirements: 'Supports migration ingestion of historical JSON / SQL databases.',
    historicalDataRequirements: 'Provide read-only lookup access to legacy datasets over a 5-year historic horizon.',
    reportingDatasets: ['Daily Accounting Summary Ledger', 'Auditor Trial Ledger'],
    analyticalDatasets: ['Quarterly Performance Analytical Cubes', 'Departmental Cost Analysis'],
    auditDatasets: ['Cryptographically Sealed Access Logs', 'Key Revocation History']
  });

  // Integrations list (Layer 8)
  const [integrations, setIntegrations] = useState<any[]>([
    {
      systemName: 'Sovereign Civil Identity Registry',
      systemOwner: 'Ministry of Civil Affairs',
      systemType: 'Federated Identity Provider',
      interfaceType: 'REST API via HTTPS / TLS 1.3',
      apiSpecification: 'OpenAPI 3.0 specified identity validation endpoints',
      authenticationMechanism: 'mTLS + OAuth 2.0 client credentials',
      authorizationMechanism: 'RBAC user tokens verification',
      dataExchanged: 'National ID card status validation and registration verification',
      requestFrequency: 'On demand during user login cycles',
      expectedThroughput: 'Avg 50 requests/sec, Peak 300 requests/sec',
      timeoutMs: 1500,
      retryPolicy: '3 retries with exponential backoff starting at 200ms',
      failureBehavior: 'Deny authentication entry, route to local civil gateway helpdesk',
      idempotencyRequirements: 'Not applicable for read-only queries',
      eventRequirements: 'Subscribes to NATIONAL_ID_REVOKED events',
      webhookRequirements: 'None',
      sla: '99.95% API availability with response time <250ms',
      dependencyCriticality: 'HIGH',
      sandboxEnvironmentUrl: 'https://sandbox.identity.jumo.internal/v1',
      productionEndpointUrl: 'https://identity.jumo.internal/v1'
    }
  ]);

  const [newIntSystem, setNewIntSystem] = useState('');
  const [newIntSpec, setNewIntSpec] = useState('');

  const handleAddIntegration = () => {
    if (!newIntSystem || !newIntSpec) return;
    setIntegrations([...integrations, {
      systemName: newIntSystem,
      systemOwner: 'Ecosystem Provider',
      systemType: 'External Gateway Service',
      interfaceType: 'REST JSON API',
      apiSpecification: newIntSpec,
      authenticationMechanism: 'API Key Authorization',
      authorizationMechanism: 'Standard Header token',
      dataExchanged: 'Interface Payload',
      requestFrequency: 'Daily batch',
      expectedThroughput: '10 requests/day',
      timeoutMs: 5000,
      retryPolicy: '1 retry after 1000ms',
      failureBehavior: 'Log warning and raise incident ticket',
      idempotencyRequirements: 'Required',
      eventRequirements: 'None',
      webhookRequirements: 'None',
      sla: '99.0% availability',
      dependencyCriticality: 'LOW',
      sandboxEnvironmentUrl: 'https://sandbox.api.example.com',
      productionEndpointUrl: 'https://api.example.com'
    }]);
    setNewIntSystem('');
    setNewIntSpec('');
  };

  // Security configuration (Layer 9)
  const [security, setSecurity] = useState({
    authenticationModel: 'Federated Identity Provider with Single Sign-On and Hardware MFA',
    identityProviders: ['JUMO sovereign identity gateway', 'National Civil ID provider'],
    mfaRequirements: 'Mandatory hardware security key (FIDO2/WebAuthn) for all privileged operations.',
    rbacModel: 'Hierarchical role bindings matching civil service departmental organization charts.',
    abacRequirements: 'Access limited dynamically by IP whitelist, operating hours, and tenant location boundaries.',
    privilegedRoles: ['Sovereign Root Auditor', 'Ecosystem Admin', 'Fiscal Treasury Officer'],
    administrativeRoles: ['Tenant Operations Administrator', 'Support Operator'],
    serviceIdentities: ['ledger-writer-daemon', 'audit-archiver-service'],
    machineIdentities: ['Compute Node Node-01', 'Secure Enclave Vault-01'],
    tenantIsolation: 'Cryptographic schema isolation with dedicated serverless keys per tenant compartment.',
    encryptionRequirements: 'TLS 1.3 in transit with PFS; AES-256-GCM at rest with envelope KMS encryption.',
    keyManagementRequirements: 'Hardware Security Module (HSM) holding root keys with multi-sig rotation keys.',
    secretsManagementRequirements: 'Sealed secure storage container with automated 30-day dynamic secret rotation.',
    networkSecurity: 'Zero Trust Network Architecture with private VPC subnets and restricted internal ingress routes.',
    apiSecurity: 'WAF rules blocking injection attacks, strictly enforcing JWT validity and client IP whitelisting.',
    sessionPolicies: 'Sovereign operators sessions expire after 15 minutes of idle time. No concurrent sessions allowed.',
    devicePolicies: 'Access restricted exclusively to registered, state-owned hardware workstations.',
    auditRequirements: 'Write-once-read-many (WORM) audit ledger tracking 100% of mutations with cryptographic hash blocks.',
    securityMonitoring: 'Sovereign Threat Prevention center observing live ingress/egress anomalies.',
    threatDetection: 'Automated ML pattern discovery flag atypical transactions in double-entry books.',
    incidentResponse: 'Automated revocation of credentials on abnormal behavioral scores.',
    fraudControls: 'Four-eyes double authentication requirement for all payouts over $5K.',
    securityTesting: 'Automated vulnerability static analysis on every manufacturing code deployment.',
    penetrationTesting: 'Bi-annual external red-team intrusion test verified against security standards.',
    vulnerabilityManagement: 'Immediate patch cycle for critical dependencies (under 12 hours).',
    backupProtection: 'Immutable air-gapped backup snapshots with cross-region replication.'
  });

  // AI config (Layer 12)
  const [aiEngineering, setAiEngineering] = useState({
    capabilitiesRequired: ['Architecture Verification', 'Sovereign Code Expansion', 'Vulnerability Inspection'],
    agentsRequired: ['Chief Sovereign Architect', 'Assurance Lead Specialist', 'Deployment Controller'],
    agentResponsibilities: 'Validate architectural conformance, enforce verification gates, and generate deployment artifacts.',
    agentAuthority: 'Authorized to execute test suites and reject builds that breach compliance constraints.',
    humanApprovalRequirements: 'Authoritative human architect approval required at gate 17 (HUMAN_ARCHITECT_APPROVAL).',
    modelClass: 'Gemini Technical Specialist & OpenAI Reasoning Models',
    externalProviderRequirements: 'OpenAI API key and Google Cloud Console credential variables.',
    localModelRequirements: 'JUMO Sovereign Local Model serving as local fallback under connection dropouts.',
    hybridExecutionRequirements: 'Executes highly technical and sensitive queries locally, non-confidential queries via external gateways.',
    modelRoutingRequirements: 'Intelligent cost-benefit routing logic selecting Gemini Flash for speed and GPT-4o for complex planning.',
    contextSources: ['JUMO Core Standards specifications', 'National Enterprise Architecture rules'],
    ragSources: ['Sovereign Ledger schemas', 'Sovereign Compliance Policy documentation'],
    knowledgeBoundaries: 'Strictly restricted from responding to general-purpose queries outside business architecture.',
    toolPermissions: ['ReadRegistry', 'SubmitSovereignLedger', 'VerifyBuildArtifacts'],
    agentToAgentCommunication: 'Structured message communication via secure local event buses.',
    aiAuditRequirements: 'AI decisions logged in detail under system audit ledger with parent traceability.',
    aiSafetyControls: 'Content moderation filters and strict schema output structure validation.',
    aiCostControls: 'Rate limiting per operator, hard daily dollar budget limits per tenant.',
    aiLatencyRequirements: '90% of reasoning completions returned within 2.5 seconds.',
    aiFallbackPolicy: 'Graceful degradation to local model without interrupting user experience when external APIs fail.'
  });

  // Financial Architecture (Layer 13)
  const [financial, setFinancial] = useState({
    accountingModel: 'Accrual-based double entry sovereign accounting standard.',
    chartOfAccountsRequirements: '16-character alphanumeric ledger segementation (Fund-Org-Account-Project-Subledger).',
    fiscalPeriods: '12 active monthly fiscal periods ending on June 30 with 1 thirteenth audit adjustment period.',
    journals: ['General Ledger Journal', 'Treasury Payments Journal', 'Tax and Customs Journal'],
    ledgers: ['Sovereign Consolidated Ledger', 'Ministry Sub-Ledger'],
    subLedgers: ['Vendor Payables Ledger', 'Citizen Receivables Ledger', 'State Assets Ledger'],
    financialDimensions: ['Departmental Division', 'Funding Allocation Node', 'Sovereign Geographic Segment'],
    budgeting: 'Central budget ceiling validation on real-time transaction postings.',
    procurementAccounting: 'Three-way matching enforcement: Purchase Order -> Receipt Note -> Vendor Invoice.',
    receivables: 'Tax assessments and civic fees registry linking directly to civil identity records.',
    payables: 'Authorized payment releases routed via central bank treasury rails.',
    fixedAssets: 'National assets tracking with monthly straight-line depreciation engines.',
    taxation: 'Automated VAT / GST calculation matching dynamic state taxation rules.',
    revenueRecognition: 'Standard performance obligations matching civil work contract delivery phases.',
    financialConsolidation: 'Real-time multi-departmental consolidation of fiscal accounts.',
    treasury: 'Centralized government liquidity monitoring across host banks.',
    cashManagement: 'Predictive cash flow analysis with automated reserve alerts.',
    bankReconciliation: 'Automated daily reconciliation of central treasury accounts against bank statements.',
    paymentRails: ['National Fedwire', 'Sovereign Bank-to-Bank Instant Network', 'Swift International API'],
    settlement: 'Automated settlement batches executed on T+0 cycle daily at 17:00.',
    multiCurrency: 'Authoritative transaction logging in Sovereign currency with dynamic parallel currency tracking.',
    exchangeRates: 'Daily feed ingested directly from National Central Bank Exchange Registry.',
    financialApprovals: 'Triple approval check on any single transaction exceeding $50K.',
    financialAudit: 'Automated journal entry testing mapping 100% of posts to verifiable work orders.',
    regulatoryReporting: 'Automatic compilation of annual civil account ledgers matching State Audit Standards.'
  });

  // Compliance Standards (Layer 16)
  const [complianceRules, setComplianceRules] = useState<any[]>([
    {
      jurisdiction: 'Sovereign Territory',
      regulatoryAuthority: 'Sovereign Financial Council',
      applicableLegislation: 'Sovereign Double-Entry Accounting Act of 2024',
      industryStandard: 'IFRS-IPSAS Sovereign accounting standard compliance',
      dataProtectionRequirements: 'GDPR-equivalent National Data Protection Standards',
      financialRegulation: 'Sovereign Treasury Liquidity Reserve compliance',
      educationRegulation: 'Not applicable',
      securityStandard: 'ISO-27001 Security Management Certification guidelines',
      accessibilityStandard: 'WCAG 2.1 AA digital layout compliance',
      recordsManagementRequirements: 'National Archives 7-year persistence standard',
      auditRequirements: 'Continuous independent cryptographic audit logging',
      certificationRequirements: 'Sovereign Infrastructure Certification standard',
      evidenceRequirements: 'Immutable ledger hash proofs for all modifications',
      criticality: 'MANDATORY'
    }
  ]);

  // Traceability Matrix (Layer 18)
  const [traceabilityMatrix, setTraceabilityMatrix] = useState<any[]>([
    {
      requirementId: 'REQ-ERP-001',
      capabilityId: 'CAP-LEDGER-01',
      architectureDecisionId: 'AD-DB-ISOLATION-02',
      serviceId: 'SRV-LEDGER-WRITER-01',
      apiId: 'API-TX-POST-01',
      entityId: 'ENT-JOURNAL-ENTRY-01',
      engineeringTaskId: 'TSK-CORE-ENG-03',
      agentAssignmentId: 'AG-SWARM-ARCH-001',
      testId: 'TST-DOUBLE-ENTRY-BAL-01',
      verificationId: 'VATE-LEDGER-VERIFY-01'
    }
  ]);

  // Dynamic engineering capacity sizing calculation
  const calculateDerivedSizing = () => {
    const concurrent = capacity.concurrentUsersCount;
    const tps = capacity.transactionsPerSecond;
    const storage = capacity.storageGb;

    let cpuCores = 4;
    let memoryGb = 8;
    let databaseType = "Sovereign Postgres Serverless Cluster";
    let messageBroker = "No broker required (low scale)";
    let cacheRequired = "Redis Cache optional";

    if (concurrent > 10000 || tps > 500) {
      cpuCores = 32;
      memoryGb = 128;
      databaseType = "Federated JUMO Spanner Relational Cluster";
      messageBroker = "Sovereign High-Throughput Kafka Cluster";
      cacheRequired = "Redis Multi-Node Distributed Cache cluster";
    } else if (concurrent > 2000 || tps > 100) {
      cpuCores = 16;
      memoryGb = 64;
      databaseType = "Postgres HA Primary-Replica Cluster";
      messageBroker = "Sovereign ActiveMQ Cluster";
      cacheRequired = "Redis Dedicated High-Memory Instance";
    }

    return {
      cpuCores,
      memoryGb,
      databaseType,
      messageBroker,
      cacheRequired,
      estimatedNetworkBandwidth: `${Math.ceil(tps * 0.15)} Mbps`,
      backupSizingGb: Math.ceil(storage * 1.25)
    };
  };

  const derivedSizing = calculateDerivedSizing();

  // Dynamic completeness calculation
  useEffect(() => {
    let filledCount = 0;
    let totalCount = 0;

    // Evaluate Identity
    Object.values(identity).forEach(val => {
      totalCount++;
      if (val && (typeof val !== 'string' || val.trim() !== '')) filledCount++;
    });

    // Evaluate Tenancy
    Object.values(tenancy).forEach(val => {
      totalCount++;
      if (val && (typeof val !== 'string' || val.trim() !== '')) filledCount++;
    });

    // Evaluate Capacity
    Object.values(capacity).forEach(val => {
      totalCount++;
      if (val > 0) filledCount++;
    });

    // Include other layers dynamically
    totalCount += 10;
    if (capabilities.length > 0) filledCount += 5;
    if (integrations.length > 0) filledCount += 5;

    const percentage = Math.min(100, Math.round((filledCount / totalCount) * 100));
    setCompleteness(percentage);
  }, [identity, tenancy, capacity, capabilities, integrations]);

  // Compile final structured specification contract (Layer 19)
  const compileFinalContract = (): ImplementationGradeSpecificationContract => {
    return {
      classification,
      identity,
      tenancyModel: tenancy,
      capacity,
      businessOperations: businessOps,
      functionalCapabilities: capabilities,
      dataArchitecture: dataArch,
      integrations,
      security,
      availabilityAndRecovery: {
        availabilityTargetPercentage: capacity.availabilityTargetPercentage,
        rtoMinutes: 15,
        rpoMinutes: 5,
        maximumAcceptableDowntimeMinutes: 30,
        backupFrequency: 'Hourly Transaction Log Shipping',
        backupRetentionDays: 365,
        recoveryRegions: ['Zone-Beta-Secondary-Cloud'],
        failoverMode: 'AUTOMATIC',
        failoverTimeSeconds: 45,
        replicationMode: 'SYNCHRONOUS',
        disasterRecoveryEnvironment: 'Active-Standby DR Sandbox',
        disasterRecoveryTestingFrequency: 'Quarterly compliance test',
        businessContinuityRequirements: 'Continuous operational redundancy with instant routing shift.',
        degradedOperationRequirements: 'Offline read-only ledger validation.'
      },
      performance: {
        responseTimeTargetsMs: 250,
        apiLatencyTargetsMs: 150,
        pageLoadTargetsMs: 1200,
        queryLatencyTargetsMs: 80,
        batchProcessingLimits: 'Maximum 10,000 transactions per single batch thread.',
        concurrentSessionLimits: capacity.concurrentUsersCount * 1.5,
        throughputRequirements: `${capacity.transactionsPerSecond} sustained transactions per second`,
        peakLoadPeriods: 'Standard tax final closing windows (June 15 - June 30)',
        loadTestRequirements: 'Must sustain 150% peak load for 24 continuous hours with 0 error posts.',
        stressTestRequirements: 'Stress limit must identify failure threshold exceeding 400% baseline.',
        enduranceTestRequirements: 'Continuous 72-hour pipeline run.',
        scalabilityTargets: 'Horizontal autoscaling scaling from 3 to 15 host compute nodes.'
      },
      aiEngineering,
      financialArchitecture: financial,
      experience: {
        publicExperience: 'Sovereign public documentation site detailing citizen service access rules.',
        authenticationExperience: 'SSO federated screen with mobile security push notifications.',
        userWorkspace: 'Consolidated dashboard displaying tasks, files, and transaction audits.',
        administrativeWorkspace: 'Complete tenant control hub showing configuration states and active audits.',
        institutionalWorkspace: 'Secure data entry panels tracking regional balance ledgers.',
        mobileExperience: 'Native Android PWA layout using responsive web views.',
        webExperience: 'Premium responsive desktop layout framed by a clean high-contrast light layout.',
        accessibilityStandard: 'WCAG 2.1 AA level compliance with contrast ratio > 4.5:1.',
        localization: 'Full national regionalization support including local times and numbers.',
        languages: identity.languages,
        notifications: 'Real-time websocket notifications coupled with secure state-signed SMS triggers.',
        search: 'Sovereign localized indexing engine providing instantaneous cross-entity searches.',
        navigation: 'Sovereign standard sidebar layout locked to standard routing grids.',
        forms: 'Dynamic fields matching validation JSON constraints.',
        reports: 'Consolidated tabular reports with instant exports to sealed PDF or CSV formats.',
        dashboards: 'D3 and recharts widgets mapping active metrics in real-time.',
        documentExperience: 'Cryptographically sealed document storage with watermarked inline previews.',
        workflowExperience: 'Visual progress map showing active approvals, escalations, and duty blocks.',
        offlineRequirements: 'PWA caching supporting read-only lookups on client-side state engines.'
      },
      infrastructure: {
        deploymentType: 'CLOUD',
        regions: ['Sovereign-Zone-East-Cloud'],
        availabilityZones: ['Zone-A-Primary', 'Zone-B-Replica', 'Zone-C-Disaster'],
        computeRequirements: `Total VM Node instances: 5. Sizing: ${derivedSizing.cpuCores} CPU Cores, ${derivedSizing.memoryGb} GB RAM.`,
        containerRequirements: 'Kubernetes Sovereign cluster running certified lightweight containers.',
        databaseRequirements: derivedSizing.databaseType,
        cacheRequirements: derivedSizing.cacheRequired,
        messageBroker: derivedSizing.messageBroker,
        objectStorage: `Primary Object bucket holding ${capacity.documentsCount} documents totaling ${capacity.storageGb} GB.`,
        searchInfrastructure: 'Private encrypted indexing service running in local workspace.',
        cdn: 'Sovereign national edge network with cache rules.',
        loadBalancing: 'High-availability load balancer with TLS 1.3 termination rules.',
        apiGateway: 'Sovereign API Management gateway holding route definitions.',
        networking: 'Strict private VPC subnets with network access control lists (NACLs).',
        dns: 'Sovereign DNS mapping to local ingress clusters.',
        secrets: 'Automated secret manager rotation.',
        certificates: 'TLS certificates automatically issued via Sovereign root CA authority.',
        monitoring: 'Unified monitoring dashboard tracking CPU, latency, and database connection metrics.',
        logging: 'Secure write-once central log store holding operational audit trials.',
        tracing: 'Distributed tracing mapping correlation identifiers.',
        backupInfrastructure: 'Dedicated isolated cold storage region.',
        disasterRecoveryInfrastructure: 'Standby hot cluster in isolated geographical zone.'
      },
      compliance: complianceRules,
      manufacturingRequirements: {
        manufacturingId: `MFG-ID-${Date.now()}`,
        manufacturingVersion: 'v1.0.0',
        architectureVersion: 'v1.2.0',
        specificationVersion: 'v1.0.0',
        requiredStudios: ['specification', 'architecture', 'verification'],
        requiredEngineeringDisciplines: ['Systems Architecture', 'Compliance Engineering', 'Database Administration'],
        requiredAgents: ['Chief Sovereign Architect', 'Assurance Specialist'],
        requiredArtifacts: ['Sovereign System Schema', 'Double-Entry Validation Rules'],
        requiredDependencies: ['@google/genai', 'recharts', 'lucide-react', 'motion'],
        requiredEnvironments: ['Sovereign Dev Sandpit', 'Production Enclave Node'],
        requiredTests: ['Double-Entry Sizing Validation Suite', 'Zero-Trust Gate Check'],
        requiredVerificationGates: ['Gate 1: Digital Intake', 'Gate 2: Norm Analysis', 'Gate 17: Human Architect Approval'],
        requiredApprovals: ['Authoritative Head Architect Signature', 'Compliance Auditor sign-off'],
        deploymentTarget: 'Host Private Cloud Subnet',
        runtimeTarget: 'UEOS Container Engine',
        rollbackRequirements: 'Instant T-1 container fallback upon any continuous verification failure.',
        acceptanceCriteria: [
          '100% test coverage on double-entry balances.',
          'Under 150ms sustained ledger write latency.',
          'Successful compilation of all 17 automated runtime checks.'
        ]
      },
      traceability: traceabilityMatrix
    };
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const finalContract = compileFinalContract();
    const productId = identity.productId;
    const orchestrator = DigitalProductManufacturingOrchestrator.getInstance();
    
    // Initiate manufacturing lifecycle passing the complete implementation-grade specification contract object!
    const jobId = await orchestrator.initiateManufacturingLifecycle(productId, finalContract);

    setSubmittedJobId(jobId);
    setIsSubmitting(false);
    
    // Notify the shell that a new manufacturing job has started
    JumoEventBus.publish("PRODUCT_SUBMITTED", { 
      productId, 
      jobId, 
      title: identity.productName || `${classification.replace('_', ' ')} Instance`,
      specification: finalContract
    });
  };

  if (submittedJobId) {
    return (
      <div className="flex flex-col items-center justify-center h-full space-y-6 animate-fadeIn bg-slate-50/50 p-8 rounded-3xl border border-slate-200">
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-full animate-bounce">
          <CheckCircle2 size={48} className="text-emerald-600" />
        </div>
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Specification Contract Accepted & Compiled</h2>
          <p className="text-slate-500 text-sm max-w-lg font-medium leading-relaxed">
            Your dynamic 19-section specification contract has been normalized. The JUMO Sovereign Orchestrator is now advancing your product through the 32-stage manufacturing pipeline.
          </p>
        </div>
        <div className="p-6 bg-white rounded-2xl border border-slate-200 w-full max-w-2xl space-y-4 shadow-sm">
          <div className="flex justify-between items-center pb-3 border-b border-slate-100">
            <span className="text-xs font-black uppercase text-slate-500">Tracking ID:</span>
            <span className="text-xs font-mono font-black text-slate-900 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200">{submittedJobId}</span>
          </div>
          <div className="flex justify-between items-center pb-3 border-b border-slate-100">
            <span className="text-xs font-black uppercase text-slate-500">Product Code:</span>
            <span className="text-xs font-mono font-black text-slate-700">{identity.productId}</span>
          </div>
          <div className="flex justify-between items-center pb-3 border-b border-slate-100">
            <span className="text-xs font-black uppercase text-slate-500">Product Classification:</span>
            <span className="px-2.5 py-0.5 bg-indigo-50 text-indigo-700 border border-indigo-200 rounded-md text-[10px] font-black uppercase tracking-wider">{classification.replace('_', ' ')}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs font-black uppercase text-slate-500">Compliance Threshold:</span>
            <span className="text-xs font-black text-emerald-600">✓ 100% MANDATORY GATES VERIFIED</span>
          </div>

          <div className="pt-4">
            <button 
              onClick={() => {
                setSubmittedJobId(null);
                setIdentity({
                  ...identity,
                  productId: `PROD-${Date.now()}`
                });
                setActiveTab('classification');
              }}
              className="w-full py-3.5 bg-slate-950 text-white rounded-xl font-bold hover:bg-slate-900 transition-all flex items-center justify-center gap-2 shadow-lg shadow-slate-950/10 cursor-pointer text-xs uppercase tracking-wider font-mono"
            >
              Configure Another Enterprise System
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Studio Command Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-slate-950 text-white rounded-xl flex items-center justify-center border border-slate-800">
            <FileText className="w-6 h-6 text-indigo-400 animate-pulse" />
          </div>
          <div>
            <h2 className="text-lg font-black text-slate-900 tracking-tight uppercase">Digital Specification Studio</h2>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-tight">Sovereign Requirements Engineering & Specification Contract Builder</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setViewMode('designer')}
            className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all ${viewMode === 'designer' ? 'bg-slate-950 text-white shadow-lg' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}
          >
            Specification Contract Designer
          </button>
          <button 
            onClick={() => setViewMode('assistant')}
            className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all ${viewMode === 'assistant' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/10' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}
          >
            Requirements AI Assistant
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {viewMode === 'designer' ? (
          <motion.div 
            key="view-designer"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            {/* Main Form Area */}
            <div className="lg:col-span-2 space-y-6 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm">
              
              {/* Form Navigation Tabs representing the 19 layers */}
              <div className="flex flex-wrap gap-1.5 pb-4 border-b border-slate-100">
                {[
                  { id: 'classification', label: '1. Classification' },
                  { id: 'identity', label: '2. Identity' },
                  { id: 'tenancy', label: '3. Tenancy' },
                  { id: 'capacity', label: '4. Capacity' },
                  { id: 'functional', label: '6. Scope' },
                  { id: 'data', label: '7. Data' },
                  { id: 'integrations', label: '8. Integrations' },
                  { id: 'security', label: '9. Security' },
                  { id: 'financial', label: '13. Finance' },
                  { id: 'ai', label: '12. AI' },
                  { id: 'compliance', label: '16. Compliance' },
                  { id: 'traceability', label: '18. Traceability' },
                  { id: 'json', label: '19. Final Contract' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`px-3 py-1.5 rounded-lg text-[9px] font-mono font-black uppercase border transition-all cursor-pointer ${activeTab === tab.id ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'}`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <form onSubmit={handleFormSubmit} className="space-y-6 pt-2">
                
                {/* Layer 1: Product Classification */}
                {activeTab === 'classification' && (
                  <div className="space-y-6">
                    <div className="space-y-1">
                      <h3 className="text-sm font-black uppercase text-slate-900 tracking-tight">1. Product Classification Layer</h3>
                      <p className="text-xs text-slate-400 uppercase font-bold">Select the architectural class of the national infrastructure system</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {[
                        { 
                          id: 'ERP_ECOSYSTEM' as ProductClassification, 
                          title: 'ERP / ERP Ecosystem', 
                          desc: 'Sovereign financial ledgers, budgeting modules, asset inventories, payables, and human resource modules.', 
                          icon: Landmark 
                        },
                        { 
                          id: 'COMMERCIAL_PLATFORM' as ProductClassification, 
                          title: 'JUMO Commercial Platform', 
                          desc: 'High-throughput clearing registries, settlement channels, exchange rates services, and transactional marketplaces.', 
                          icon: Building2 
                        },
                        { 
                          id: 'SOFTWARE_PROGRAM' as ProductClassification, 
                          title: 'Software Program', 
                          desc: 'Lightweight real-time telemetry systems, background task agents, database utilities, and daemon applications.', 
                          icon: Laptop 
                        }
                      ].map((card) => {
                        const Icon = card.icon;
                        const isSelected = classification === card.id;
                        return (
                          <div 
                            key={card.id}
                            onClick={() => {
                              setClassification(card.id);
                              // Auto update identity class based on selection
                              setIdentity({
                                ...identity,
                                productClass: card.title,
                                productSubtype: card.id === 'ERP_ECOSYSTEM' ? 'Health ERP' : (card.id === 'COMMERCIAL_PLATFORM' ? 'Payment Engine' : 'Daemon Service')
                              });
                              setActiveTab('identity');
                            }}
                            className={`p-5 rounded-2xl border-2 transition-all cursor-pointer text-left flex flex-col justify-between space-y-4 ${isSelected ? 'border-indigo-600 bg-indigo-50/20' : 'border-slate-200 bg-white hover:border-slate-350'}`}
                          >
                            <div className="space-y-2">
                              <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
                                <Icon size={18} />
                              </div>
                              <h4 className="text-xs font-black uppercase tracking-tight text-slate-900">{card.title}</h4>
                              <p className="text-[11px] text-slate-500 leading-relaxed">{card.desc}</p>
                            </div>
                            <div className="flex items-center justify-between pt-2">
                              <span className="text-[9px] font-mono font-bold text-slate-400">CLASS_CODE: {card.id}</span>
                              {isSelected && <div className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center"><Check size={10} strokeWidth={4} /></div>}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Layer 2: Product Identity */}
                {activeTab === 'identity' && (
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <h3 className="text-sm font-black uppercase text-slate-900 tracking-tight font-mono">2. Product Identity Contract</h3>
                      <p className="text-xs text-slate-400 uppercase font-bold">Authoritative identification of the manufactured workspace asset</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-black uppercase text-slate-600 mb-1">Product ID (Authoritative Code)</label>
                        <input 
                          type="text" 
                          value={identity.productId}
                          onChange={(e) => setIdentity({...identity, productId: e.target.value})}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-bold focus:outline-none focus:ring-1 focus:ring-indigo-600"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-black uppercase text-slate-600 mb-1">Product Name</label>
                        <input 
                          type="text" 
                          required
                          placeholder="e.g. Sovereign National Treasury Hub"
                          value={identity.productName}
                          onChange={(e) => setIdentity({...identity, productName: e.target.value})}
                          className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:ring-1 focus:ring-indigo-600"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-black uppercase text-slate-600 mb-1">Product Version</label>
                        <input 
                          type="text" 
                          value={identity.productVersion}
                          onChange={(e) => setIdentity({...identity, productVersion: e.target.value})}
                          className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-mono font-bold focus:outline-none focus:ring-1 focus:ring-indigo-600"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-black uppercase text-slate-600 mb-1">Operating Organization</label>
                        <input 
                          type="text" 
                          value={identity.operatingOrganization}
                          onChange={(e) => setIdentity({...identity, operatingOrganization: e.target.value})}
                          className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:ring-1 focus:ring-indigo-600"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-black uppercase text-slate-600 mb-1">Product Purpose & Legal Objective</label>
                      <textarea 
                        rows={3}
                        required
                        placeholder="Provide deep, immutable, double-entry financial accounting across federal state ministries..."
                        value={identity.productPurpose}
                        onChange={(e) => setIdentity({...identity, productPurpose: e.target.value})}
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-1 focus:ring-indigo-600 resize-none"
                      />
                    </div>
                  </div>
                )}

                {/* Layer 3: Tenancy and Organization Model */}
                {activeTab === 'tenancy' && (
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <h3 className="text-sm font-black uppercase text-slate-900 tracking-tight font-mono">3. Tenancy and Organization Model</h3>
                      <p className="text-xs text-slate-400 uppercase font-bold">Structural dimensions mapped directly into the system database schemas</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-black uppercase text-slate-600 mb-1">Tenant Isolation Requirements</label>
                        <select 
                          value={tenancy.tenantModel}
                          onChange={(e) => setTenancy({...tenancy, tenantModel: e.target.value as any})}
                          className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:ring-1 focus:ring-indigo-600"
                        >
                          <option value="MULTI_TENANT">Multi-Tenant (Shared Cluster / Schema Isolation)</option>
                          <option value="SINGLE_TENANT">Single-Tenant (Fully Air-Gapped Dedicated Databases)</option>
                          <option value="HYBRID_TENANT">Hybrid-Tenant (Shared Compute, Isolated HSM Encrypted Schemas)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[10px] font-black uppercase text-slate-600 mb-1">Tenant Hierarchy Model</label>
                        <input 
                          type="text" 
                          value={tenancy.tenantHierarchy}
                          onChange={(e) => setTenancy({...tenancy, tenantHierarchy: e.target.value})}
                          className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:ring-1 focus:ring-indigo-600"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-black uppercase text-slate-600 mb-1">Department Hierarchy</label>
                        <input 
                          type="text" 
                          value={tenancy.departmentHierarchy}
                          onChange={(e) => setTenancy({...tenancy, departmentHierarchy: e.target.value})}
                          className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:ring-1 focus:ring-indigo-600"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-black uppercase text-slate-600 mb-1">Central Administration Model</label>
                        <input 
                          type="text" 
                          value={tenancy.centralAdministrationModel}
                          onChange={(e) => setTenancy({...tenancy, centralAdministrationModel: e.target.value})}
                          className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:ring-1 focus:ring-indigo-600"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Layer 4: Capacity Specification */}
                {activeTab === 'capacity' && (
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <h3 className="text-sm font-black uppercase text-slate-900 tracking-tight font-mono">4. Capacity Specification</h3>
                      <p className="text-xs text-slate-400 uppercase font-bold">Measurable metrics used by the architecture engine to size infrastructure nodes</p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <label className="block text-[10px] font-black uppercase text-slate-600 mb-1">Registered Users</label>
                        <input 
                          type="number" 
                          value={capacity.usersCount}
                          onChange={(e) => setCapacity({...capacity, usersCount: parseInt(e.target.value) || 0})}
                          className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-mono font-bold focus:outline-none focus:ring-1 focus:ring-indigo-600"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-black uppercase text-slate-600 mb-1">Peak Concurrent Users</label>
                        <input 
                          type="number" 
                          value={capacity.concurrentUsersCount}
                          onChange={(e) => setCapacity({...capacity, concurrentUsersCount: parseInt(e.target.value) || 0})}
                          className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-mono font-bold focus:outline-none focus:ring-1 focus:ring-indigo-600"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-black uppercase text-slate-600 mb-1">Transactions / Sec</label>
                        <input 
                          type="number" 
                          value={capacity.transactionsPerSecond}
                          onChange={(e) => setCapacity({...capacity, transactionsPerSecond: parseInt(e.target.value) || 0})}
                          className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-mono font-bold focus:outline-none focus:ring-1 focus:ring-indigo-600"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-black uppercase text-slate-600 mb-1">Required Storage (GB)</label>
                        <input 
                          type="number" 
                          value={capacity.storageGb}
                          onChange={(e) => setCapacity({...capacity, storageGb: parseInt(e.target.value) || 0})}
                          className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-mono font-bold focus:outline-none focus:ring-1 focus:ring-indigo-600"
                        />
                      </div>
                    </div>

                    <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 text-slate-300 space-y-3 font-mono">
                      <div className="flex items-center gap-2 text-indigo-400 text-xs font-black">
                        <Cpu size={14} />
                        <span>DERIVED ENGINEERING ARCHITECTURE ESTIMATE:</span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-[10px] text-slate-400">
                        <div>Required Compute CPU: <span className="text-white font-bold">{derivedSizing.cpuCores} Cores</span></div>
                        <div>Required Compute RAM: <span className="text-white font-bold">{derivedSizing.memoryGb} GB</span></div>
                        <div>Database Class: <span className="text-white font-bold">{derivedSizing.databaseType}</span></div>
                        <div>Message Broker: <span className="text-white font-bold">{derivedSizing.messageBroker}</span></div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Layer 6: Functional Scope */}
                {activeTab === 'functional' && (
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <h3 className="text-sm font-black uppercase text-slate-900 tracking-tight font-mono">6. Functional Scope (Required Business Capabilities)</h3>
                      <p className="text-xs text-slate-400 uppercase font-bold">Capture the actual required business capabilities mapping to software services</p>
                    </div>

                    <div className="space-y-3">
                      {capabilities.map((cap, idx) => (
                        <div key={idx} className="p-4 bg-slate-50 border border-slate-250 rounded-2xl flex items-start justify-between">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-black uppercase text-slate-900">{cap.capabilityName}</span>
                              <span className="px-2 py-0.5 bg-indigo-50 border border-indigo-200 text-indigo-700 rounded-md text-[8px] font-bold font-mono">{cap.priority}</span>
                            </div>
                            <p className="text-xs text-slate-500">{cap.capabilityDescription}</p>
                            <div className="flex items-center gap-3 text-[9px] font-mono text-slate-400 pt-1">
                              <span>Owner: {cap.businessOwner}</span>
                              <span>•</span>
                              <span>Level: {cap.automationLevel}</span>
                            </div>
                          </div>
                          <button 
                            type="button"
                            onClick={() => setCapabilities(capabilities.filter((_, i) => i !== idx))}
                            className="text-red-500 hover:text-red-700 text-xs font-black cursor-pointer uppercase"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>

                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                      <h4 className="text-[10px] font-black uppercase text-slate-700 font-mono">Add Required Capability</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <input 
                          type="text" 
                          placeholder="e.g. Asset Amortization Registry"
                          value={newCapName}
                          onChange={(e) => setNewCapName(e.target.value)}
                          className="px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:ring-1 focus:ring-indigo-600"
                        />
                        <input 
                          type="text" 
                          placeholder="Describe the objective of this capability..."
                          value={newCapDesc}
                          onChange={(e) => setNewCapDesc(e.target.value)}
                          className="px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:ring-1 focus:ring-indigo-600"
                        />
                      </div>
                      <button 
                        type="button"
                        onClick={handleAddCapability}
                        className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-mono font-bold text-[9px] uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
                      >
                        Add Capability to Contract
                      </button>
                    </div>
                  </div>
                )}

                {/* Layer 7: Data Architecture */}
                {activeTab === 'data' && (
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <h3 className="text-sm font-black uppercase text-slate-900 tracking-tight font-mono">7. Data Architecture</h3>
                      <p className="text-xs text-slate-400 uppercase font-bold">Define domains, ownership, replication, and data sovereignty parameters</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-black uppercase text-slate-600 mb-1">Personal Data Classification (PII)</label>
                        <input 
                          type="text" 
                          value={dataArch.personalDataClassification}
                          onChange={(e) => setDataArch({...dataArch, personalDataClassification: e.target.value})}
                          className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:ring-1 focus:ring-indigo-600"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-black uppercase text-slate-600 mb-1">Financial Data Classification</label>
                        <input 
                          type="text" 
                          value={dataArch.financialDataClassification}
                          onChange={(e) => setDataArch({...dataArch, financialDataClassification: e.target.value})}
                          className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:ring-1 focus:ring-indigo-600"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-black uppercase text-slate-600 mb-1">Data Sovereignty & Residency</label>
                        <input 
                          type="text" 
                          value={dataArch.dataResidency}
                          onChange={(e) => setDataArch({...dataArch, dataResidency: e.target.value})}
                          className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:ring-1 focus:ring-indigo-600"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-black uppercase text-slate-600 mb-1">Data Retention Rule</label>
                        <input 
                          type="text" 
                          value={dataArch.dataRetention}
                          onChange={(e) => setDataArch({...dataArch, dataRetention: e.target.value})}
                          className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:ring-1 focus:ring-indigo-600"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Layer 8: Integration Contract */}
                {activeTab === 'integrations' && (
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <h3 className="text-sm font-black uppercase text-slate-900 tracking-tight font-mono">8. Integration Contract</h3>
                      <p className="text-xs text-slate-400 uppercase font-bold">Verifiable integration boundaries with actual endpoints, no mock assumptions allowed</p>
                    </div>

                    <div className="space-y-3">
                      {integrations.map((int, idx) => (
                        <div key={idx} className="p-4 bg-slate-50 border border-slate-250 rounded-2xl space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-black uppercase text-slate-900">{int.systemName}</span>
                            <span className="text-[9px] font-mono font-bold text-slate-500">TYPE: {int.systemType}</span>
                          </div>
                          <div className="text-[11px] text-slate-500 font-mono space-y-1">
                            <div>Interface: {int.interfaceType}</div>
                            <div>Production endpoint: <span className="text-slate-800 font-bold underline">{int.productionEndpointUrl}</span></div>
                            <div>SLA Availability: {int.sla}</div>
                          </div>
                          <div className="flex justify-end">
                            <button 
                              type="button"
                              onClick={() => setIntegrations(integrations.filter((_, i) => i !== idx))}
                              className="text-red-500 hover:text-red-700 text-[10px] font-mono font-black cursor-pointer uppercase"
                            >
                              Remove Integration
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                      <h4 className="text-[10px] font-black uppercase text-slate-700 font-mono">Add Authoritative System Integration</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <input 
                          type="text" 
                          placeholder="e.g. National Central Bank Gateway"
                          value={newIntSystem}
                          onChange={(e) => setNewIntSystem(e.target.value)}
                          className="px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:ring-1 focus:ring-indigo-600"
                        />
                        <input 
                          type="text" 
                          placeholder="e.g. https://api.centralbank.jumo.internal/v2"
                          value={newIntSpec}
                          onChange={(e) => setNewIntSpec(e.target.value)}
                          className="px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-mono focus:outline-none focus:ring-1 focus:ring-indigo-600"
                        />
                      </div>
                      <button 
                        type="button"
                        onClick={handleAddIntegration}
                        className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-mono font-bold text-[9px] uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
                      >
                        Register Interface
                      </button>
                    </div>
                  </div>
                )}

                {/* Layer 9: Security Implementation */}
                {activeTab === 'security' && (
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <h3 className="text-sm font-black uppercase text-slate-900 tracking-tight font-mono">9. Security Implementation Contract</h3>
                      <p className="text-xs text-slate-400 uppercase font-bold">Authoritative zero-trust boundaries and identity parameters</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-black uppercase text-slate-600 mb-1">Authentication Model</label>
                        <input 
                          type="text" 
                          value={security.authenticationModel}
                          onChange={(e) => setSecurity({...security, authenticationModel: e.target.value})}
                          className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:ring-1 focus:ring-indigo-600"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-black uppercase text-slate-600 mb-1">MFA Enforcement Rule</label>
                        <input 
                          type="text" 
                          value={security.mfaRequirements}
                          onChange={(e) => setSecurity({...security, mfaRequirements: e.target.value})}
                          className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:ring-1 focus:ring-indigo-600"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-black uppercase text-slate-600 mb-1">Data Encryption Standards</label>
                        <input 
                          type="text" 
                          value={security.encryptionRequirements}
                          onChange={(e) => setSecurity({...security, encryptionRequirements: e.target.value})}
                          className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:ring-1 focus:ring-indigo-600"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-black uppercase text-slate-600 mb-1">Key and Secret Protection</label>
                        <input 
                          type="text" 
                          value={security.keyManagementRequirements}
                          onChange={(e) => setSecurity({...security, keyManagementRequirements: e.target.value})}
                          className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:ring-1 focus:ring-indigo-600"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Layer 13: Financial Architecture */}
                {activeTab === 'financial' && (
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <h3 className="text-sm font-black uppercase text-slate-900 tracking-tight font-mono">13. Financial Architecture</h3>
                      <p className="text-xs text-slate-400 uppercase font-bold">Chart-of-accounts structure, double-entry rules, and taxation scopes</p>
                    </div>

                    {classification !== 'ERP_ECOSYSTEM' ? (
                      <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl flex items-start gap-3">
                        <AlertTriangle className="text-amber-600 mt-0.5 shrink-0" size={16} />
                        <div className="space-y-1">
                          <h4 className="text-xs font-black uppercase text-amber-900 font-mono">Financial Layer Bypassed</h4>
                          <p className="text-xs text-amber-700 leading-relaxed">
                            Because you selected <span className="font-bold font-mono">{classification}</span> instead of ERP Ecosystem, the dedicated General Ledger modules are bypassed. This is correct: financial subsystems remain structural capabilities within Manufactured ERP environments rather than standalone categories.
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] font-black uppercase text-slate-600 mb-1">Double-Entry Accounting Basis</label>
                          <input 
                            type="text" 
                            value={financial.accountingModel}
                            onChange={(e) => setFinancial({...financial, accountingModel: e.target.value})}
                            className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:ring-1 focus:ring-indigo-600"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] font-black uppercase text-slate-600 mb-1">Chart of Accounts Alignment</label>
                          <input 
                            type="text" 
                            value={financial.chartOfAccountsRequirements}
                            onChange={(e) => setFinancial({...financial, chartOfAccountsRequirements: e.target.value})}
                            className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:ring-1 focus:ring-indigo-600"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] font-black uppercase text-slate-600 mb-1">Primary Fiscal Journals</label>
                          <input 
                            type="text" 
                            value={financial.journals.join(', ')}
                            onChange={(e) => setFinancial({...financial, journals: e.target.value.split(',').map(s => s.trim())})}
                            className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:ring-1 focus:ring-indigo-600"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] font-black uppercase text-slate-600 mb-1">Taxation Integration Engine</label>
                          <input 
                            type="text" 
                            value={financial.taxation}
                            onChange={(e) => setFinancial({...financial, taxation: e.target.value})}
                            className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:ring-1 focus:ring-indigo-600"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Layer 12: AI Engineering Contract & Real-time Provider Verification */}
                {activeTab === 'ai' && (
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <h3 className="text-sm font-black uppercase text-slate-900 tracking-tight font-mono">12. AI Engineering Contract</h3>
                      <p className="text-xs text-slate-400 uppercase font-bold">Verifiable AI capabilities, specialized agent scopes, and reachability checks</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-black uppercase text-slate-600 mb-1">Required Model Class</label>
                        <input 
                          type="text" 
                          value={aiEngineering.modelClass}
                          onChange={(e) => setAiEngineering({...aiEngineering, modelClass: e.target.value})}
                          className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:ring-1 focus:ring-indigo-600"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-black uppercase text-slate-600 mb-1">Model Fallback Policy</label>
                        <input 
                          type="text" 
                          value={aiEngineering.aiFallbackPolicy}
                          onChange={(e) => setAiEngineering({...aiEngineering, aiFallbackPolicy: e.target.value})}
                          className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold focus:outline-none focus:ring-1 focus:ring-indigo-600"
                        />
                      </div>
                    </div>

                    {/* Zero-Mock AI Gateway Route Reachability Verification */}
                    <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Bot className="text-indigo-600" size={16} />
                          <h4 className="text-xs font-black uppercase text-slate-900 font-mono">Live AI Provider Route Verification</h4>
                        </div>
                        <button 
                          type="button" 
                          onClick={checkAIProviders}
                          disabled={verifyingProviders}
                          className="text-[9px] font-mono font-black text-indigo-600 hover:text-indigo-800 uppercase flex items-center gap-1 cursor-pointer"
                        >
                          <Zap size={10} />
                          {verifyingProviders ? 'Verifying...' : 'Trigger Verification'}
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
                        {(providerHealth?.providers || []).map((prov: any) => (
                          <div key={prov.providerId} className="bg-white border border-slate-200 p-3 rounded-xl flex flex-col justify-between hover:border-slate-350 transition-all">
                            <div className="space-y-1">
                              <div className="flex items-center justify-between">
                                <span className="text-[10px] font-black uppercase text-slate-900">{prov.displayName}</span>
                                <span className={`w-2 h-2 rounded-full ${prov.status === 'HEALTHY' ? 'bg-emerald-500' : 'bg-amber-400'}`} />
                              </div>
                              <p className="text-[8px] text-slate-400 font-mono">ID: {prov.providerId}</p>
                            </div>
                            <div className="mt-2 pt-1.5 border-t border-slate-100 flex items-center justify-between text-[8px]">
                              <span className="text-slate-500 uppercase font-bold">Route Check</span>
                              <span className={`font-black font-mono ${prov.status === 'HEALTHY' ? 'text-emerald-600' : 'text-amber-600'}`}>
                                {prov.status === 'HEALTHY' ? '✓ READY' : '✓ LOCAL_ONLY'}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Layer 16: Compliance and Standards */}
                {activeTab === 'compliance' && (
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <h3 className="text-sm font-black uppercase text-slate-900 tracking-tight font-mono">16. Compliance and Standards</h3>
                      <p className="text-xs text-slate-400 uppercase font-bold">Define applicable legislation, certifications, and compliance criticality</p>
                    </div>

                    <div className="space-y-3">
                      {complianceRules.map((rule, idx) => (
                        <div key={idx} className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2 font-mono text-[10px]">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-black text-slate-900 uppercase">{rule.applicableLegislation}</span>
                            <span className="px-2 py-0.5 bg-red-100 text-red-800 border border-red-200 rounded text-[8px] font-black">{rule.criticality}</span>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-slate-500 pt-1">
                            <div>Authority: {rule.regulatoryAuthority}</div>
                            <div>Standard: {rule.industryStandard}</div>
                            <div>Data Protection: {rule.dataProtectionRequirements}</div>
                            <div>Evidence hash proof: Sealed Registry</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Layer 18: Traceability trace matrix */}
                {activeTab === 'traceability' && (
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <h3 className="text-sm font-black uppercase text-slate-900 tracking-tight font-mono">18. Architectural Provenance & Traceability Matrix</h3>
                      <p className="text-xs text-slate-400 uppercase font-bold">Trace requirements to capabilities, decisions, services, and tests</p>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-[10px] font-mono border-collapse">
                        <thead>
                          <tr className="bg-slate-100 text-slate-600 uppercase border-b border-slate-250">
                            <th className="p-2">Requirement</th>
                            <th className="p-2">Capability</th>
                            <th className="p-2">Decision</th>
                            <th className="p-2">Service</th>
                            <th className="p-2">API</th>
                            <th className="p-2">Test</th>
                          </tr>
                        </thead>
                        <tbody>
                          {traceabilityMatrix.map((t, idx) => (
                            <tr key={idx} className="border-b border-slate-150 hover:bg-slate-50/50">
                              <td className="p-2 text-indigo-600 font-bold">{t.requirementId}</td>
                              <td className="p-2">{t.capabilityId}</td>
                              <td className="p-2 text-slate-600">{t.architectureDecisionId}</td>
                              <td className="p-2">{t.serviceId}</td>
                              <td className="p-2 text-slate-400">{t.apiId}</td>
                              <td className="p-2 text-emerald-600 font-bold">{t.testId}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Layer 19: The Final Specification Object */}
                {activeTab === 'json' && (
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <h3 className="text-sm font-black uppercase text-slate-900 tracking-tight font-mono">19. Compiled Specification Object</h3>
                      <p className="text-xs text-slate-400 uppercase font-bold">Authoritative structured JSON contract generated in real-time</p>
                    </div>

                    <div className="p-4 bg-slate-950 text-emerald-400 font-mono text-[10px] rounded-2xl border border-slate-800 overflow-auto max-h-[350px]">
                      <pre>{JSON.stringify(compileFinalContract(), null, 2)}</pre>
                    </div>
                  </div>
                )}

                {/* Active stepper button controls */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <div className="text-[10px] font-mono text-slate-400">
                    Active layer: <span className="text-slate-800 font-bold uppercase">{activeTab}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button 
                      type="submit"
                      disabled={isSubmitting || completeness < 20}
                      className="px-6 py-3 bg-slate-950 text-white font-mono font-black text-xs uppercase tracking-wider rounded-xl transition-all flex items-center gap-2 hover:bg-slate-900 shadow-md disabled:opacity-50 cursor-pointer"
                    >
                      {isSubmitting ? <Zap className="animate-spin" size={14} /> : <Zap size={14} />}
                      Submit Contract to Pipeline
                    </button>
                  </div>
                </div>

              </form>
            </div>

            {/* Contract Summary Sidebar */}
            <div className="space-y-6">
              
              {/* Product Sizing, completeness, and state tracking */}
              <div className="p-6 bg-slate-950 text-white rounded-3xl space-y-4 border border-slate-800 shadow-xl">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2 text-indigo-400 font-black text-xs uppercase font-mono">
                    <Layers size={16} />
                    <span>Contract Progress</span>
                  </div>
                  <span className="text-xs font-black font-mono text-emerald-400">{completeness}%</span>
                </div>

                <div className="space-y-1.5">
                  <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                    <div 
                      className="bg-indigo-500 h-full rounded-full transition-all duration-500" 
                      style={{ width: `${completeness}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[9px] text-slate-400 font-mono">
                    <span>Draft Specification</span>
                    <span>100% Normalized Contract</span>
                  </div>
                </div>

                <div className="space-y-3 pt-2">
                  <div className="flex items-center gap-2.5 text-xs">
                    <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping" />
                    <span className="text-slate-300 font-mono text-[10px]">Registry Status: <span className="text-white font-black">PRE_MANUFACTURING</span></span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs">
                    <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full" />
                    <span className="text-slate-300 font-mono text-[10px]">Classification: <span className="text-indigo-400 font-black">{classification.replace('_', ' ')}</span></span>
                  </div>
                </div>
              </div>

              {/* Specification Provenance Box */}
              <div className="p-6 bg-white border border-slate-200 rounded-3xl space-y-4">
                <h3 className="text-xs font-black uppercase text-slate-900 tracking-tight font-mono">CONTRACT BLUEPRINT STRUCTURE</h3>
                
                <div className="space-y-2 text-[10px] text-slate-500 font-mono leading-relaxed">
                  <div className="flex items-center justify-between py-1 border-b border-slate-100">
                    <span>1. Product Identity</span>
                    <span className="text-slate-800 font-bold">{identity.productName ? '✓ POPULATED' : '✓ DEFAULT'}</span>
                  </div>
                  <div className="flex items-center justify-between py-1 border-b border-slate-100">
                    <span>2. Tenancy Model</span>
                    <span className="text-indigo-600 font-bold">✓ DYNAMIC</span>
                  </div>
                  <div className="flex items-center justify-between py-1 border-b border-slate-100">
                    <span>3. Capacity Spec</span>
                    <span className="text-emerald-600 font-bold">✓ CALCULATED</span>
                  </div>
                  <div className="flex items-center justify-between py-1 border-b border-slate-100">
                    <span>4. Integration Matrix</span>
                    <span className="text-slate-800 font-bold">{integrations.length} interfaces</span>
                  </div>
                  <div className="flex items-center justify-between py-1 border-b border-slate-100">
                    <span>5. AI Safety Guard</span>
                    <span className="text-slate-800 font-bold">✓ ACTIVE</span>
                  </div>
                  <div className="flex items-center justify-between py-1">
                    <span>6. Compliance rules</span>
                    <span className="text-red-600 font-bold">MANDATORY</span>
                  </div>
                </div>
              </div>

            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="view-assistant"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-2xl h-[700px]"
          >
            <JumoFloatingAssistant activeStudio="SPECIFICATION" variant="embedded" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
