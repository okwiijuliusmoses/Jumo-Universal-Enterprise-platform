/**
 * Engine & Service Math Verification
 */

import { faapEngine } from '../backend/services/faapEngine';

import { faapEngine as platformFaapEngine } from '../platform/faap';

import { TreasuryEngine as treasuryEngine } from '../platform/treasury';

import { jumoAiPlatform } from '../platform/ai';

import { domainFramework } from '../domains';

import { jumoEnterpriseEngine } from '../platform/enterprise';

import { workflowEngine as platformWorkflowEngine } from '../platform/workflow';

function testHighRiskRejection() {
  console.log('[ENGINE TEST] Testing High Risk Rejection...');
  const res = faapEngine.evaluateRisk({
    tenantId: 'tnt_high_risk',
    requestedAmountUSD: 2000000,
    creditScore: 350,
    collateralRatio: 0.5,
    historicalDefaultRate: 0.25,
  });

  if (res.approvalStatus !== 'REJECTED' || res.riskCategory !== 'HIGH_RISK') {
    throw new Error(`Engine Test Failed: Expected REJECTED & HIGH_RISK, got status=${res.approvalStatus}, category=${res.riskCategory}`);
  }
  console.log('✅ High Risk Rejection test passed.');
}

function testOwnerOverrideRequirement() {
  console.log('[ENGINE TEST] Testing Owner Override Requirement...');
  const res = faapEngine.evaluateRisk({
    tenantId: 'tnt_moderate_risk',
    requestedAmountUSD: 2000000,
    creditScore: 600,
    collateralRatio: 1.0,
    historicalDefaultRate: 0.05,
  });

  if (res.approvalStatus !== 'REQUIRES_OWNER_OVERRIDE') {
    throw new Error(`Engine Test Failed: Expected REQUIRES_OWNER_OVERRIDE, got ${res.approvalStatus}`);
  }
  console.log('✅ Owner Override test passed.');
}

function testDoubleEntryBalancing() {
  console.log('[ENGINE TEST] Testing Double-Entry Accounting Balancing...');
  
  // Initially balanced
  const initialSummary = platformFaapEngine.generateFinancialSummary();
  if (!initialSummary.balanceSheetBalanced) {
    throw new Error('Engine Test Failed: Initial balance sheet is not balanced');
  }

  // Post a valid journal entry: Debit Cash 1010 (Asset) by 10,000, Credit Revenue 4010 by 10,000
  platformFaapEngine.postJournalEntry({
    tenantId: 'tenant_finbank_01',
    description: 'Test Cash Sale Revenue Entry',
    debitAccount: '1010',
    creditAccount: '4010',
    amountUSD: 10000,
  });

  const updatedSummary = platformFaapEngine.generateFinancialSummary();
  if (!updatedSummary.balanceSheetBalanced) {
    throw new Error('Engine Test Failed: Post-transaction balance sheet is unbalanced');
  }

  console.log('✅ Double-Entry Balancing test passed.');
}

function testTreasuryFxConversion() {
  console.log('[ENGINE TEST] Testing Treasury Sovereign FX Conversion...');
  
  // 100 USD to EUR should be 91.74 EUR (100 / 1.09 = 91.74)
  const eurVal = treasuryEngine.convertAmount(100, 'USD', 'EUR');
  if (eurVal !== 91.74) {
    throw new Error(`Engine Test Failed: Expected 100 USD = 91.74 EUR, got ${eurVal}`);
  }

  // 1300 KES to USD should be 10.01 USD (1300 * 0.0077 = 10.01)
  const usdVal = treasuryEngine.convertAmount(1300, 'KES', 'USD');
  if (usdVal !== 10.01) {
    throw new Error(`Engine Test Failed: Expected 1300 KES = 10.01 USD, got ${usdVal}`);
  }

  console.log('✅ Treasury FX Conversion test passed.');
}

async function testAiPlatform() {
  console.log('[ENGINE TEST] Testing JUMO AI Platform...');
  
  const query = 'What is the current liquidity buffer?';
  const result = await jumoAiPlatform.queryAiAssistant(query, 'TREASURY_LIQUIDITY');
  
  if (!result || !result.response || result.prompt !== query) {
    throw new Error('Engine Test Failed: AI platform failed to return valid response');
  }
  
  console.log(`✅ JUMO AI Platform test passed using model: ${result.modelUsed}`);
}

function testDomainEcosystem() {
  console.log('[ENGINE TEST] Testing Reusable Domain Ecosystem Framework...');

  // Test 1: Register a new ecosystem
  const initialCount = domainFramework.getEcosystems().length;
  const newEco = domainFramework.registerEcosystem({
    domainId: 'domain_hospital',
    name: 'Hospital & Healthcare ERP Engine',
    sector: 'ENTERPRISE',
    description: 'Medical clinic administration, insurance claims, pharmacy stock, and patient ledgers.',
    capabilities: ['Patient Records', 'Insurance Claims', 'Pharmacy Inventory', 'Billing Ledgers'],
  });

  if (domainFramework.getEcosystems().length !== initialCount + 1) {
    throw new Error('Engine Test Failed: New domain ecosystem was not added to list');
  }

  // Test 2: Provision a tenant for this ecosystem
  const originalTenants = newEco.activeTenants;
  const provisionResult = domainFramework.provisionTenantDomain('domain_hospital', 'tnt_medcare_01');

  if (!provisionResult.success || newEco.activeTenants !== originalTenants + 1) {
    throw new Error('Engine Test Failed: Domain provisioning did not increment tenant counts');
  }

  console.log('✅ Reusable Domain Ecosystem Framework test passed.');
}

function testEnterpriseIdentityLayer() {
  console.log('[ENGINE TEST] Testing JUMO Enterprise Identity Layer...');

  // Test 1: Query initial holdings
  const holdings = jumoEnterpriseEngine.getHoldings();
  if (holdings.length === 0) {
    throw new Error('Engine Test Failed: Holdings array is empty');
  }

  // Test 2: Register a subsidiary
  const initialSubs = jumoEnterpriseEngine.getSubsidiaries().length;
  jumoEnterpriseEngine.registerSubsidiary({
    subsidiaryId: 'sub_test_subsidiary',
    holdingId: 'holding_jumo_global',
    name: 'JUMO Enterprise West Africa Regional Sub',
    countryCode: 'NGA',
    operationalStatus: 'ACTIVE',
    primaryContact: 'westafrica@jumo.finance',
  });

  const newSubs = jumoEnterpriseEngine.getSubsidiaries().length;
  if (newSubs !== initialSubs + 1) {
    throw new Error('Engine Test Failed: Subsidiary failed to register');
  }

  // Test 3: Hire an employee
  const initialEmployees = jumoEnterpriseEngine.getEmployees().length;
  jumoEnterpriseEngine.hireEmployee({
    employeeId: 'emp_auditor_test',
    holdingId: 'holding_jumo_global',
    subsidiaryId: 'sub_test_subsidiary',
    departmentId: 'dept_compliance',
    firstName: 'Test',
    lastName: 'Auditor',
    email: 'auditor@jumo.finance',
    positionTitle: 'Assistant Compliance Inspector',
    roleId: 'role_risk_compliance',
    status: 'ACTIVE',
  });

  const newEmployees = jumoEnterpriseEngine.getEmployees().length;
  if (newEmployees !== initialEmployees + 1) {
    throw new Error('Engine Test Failed: Employee hiring failed');
  }

  console.log('✅ JUMO Enterprise Identity Layer test passed.');
}

function testAdvancedWorkflowStudio() {
  console.log('[ENGINE TEST] Testing JUMO Advanced Workflow Studio...');

  // Test 1: Initiate an approval workflow instance
  const instance = platformWorkflowEngine.initiateWorkflow('wf_rule_101', {
    tenantId: 'tenant_finbank_01',
    requestedAmountUSD: 1500000,
    riskScoreFactor: 1.35,
  });

  if (!instance || instance.status !== 'IN_PROGRESS' || instance.approvalChain.length !== 2) {
    throw new Error('Engine Test Failed: Workflow failed to initiate with proper approval chain');
  }

  // Test 2: Approve the first step ('TREASURY_DIRECTOR')
  platformWorkflowEngine.approveStep(instance.instanceId, 'TREASURY_DIRECTOR', 'director@jumo.finance', true);
  if (instance.currentStepIndex !== 1 || instance.approvalChain[0].status !== 'APPROVED') {
    throw new Error('Engine Test Failed: Failed to approve step 1 or advance step index');
  }

  // Test 3: Approve the second step ('OWNER')
  platformWorkflowEngine.approveStep(instance.instanceId, 'OWNER', 'owner@jumo.finance', true);
  if ((instance.status as string) !== 'COMPLETED') {
    throw new Error(`Engine Test Failed: Workflow should be COMPLETED, got status=${instance.status}`);
  }

  // Test 4: Evaluate analytics
  const analytics = platformWorkflowEngine.getAnalyticsSummary();
  if (analytics.totalInstances === 0 || analytics.completedCount !== 1) {
    throw new Error('Engine Test Failed: Analytics report incorrect');
  }

  console.log('✅ JUMO Advanced Workflow Studio test passed.');
}

async function testJumoIntelligenceFabric() {
  console.log('[ENGINE TEST] Testing JUMO Intelligence Fabric Specialized AI Agents...');

  // Test 1: Financial Agent Analysis
  const finAnalysis = await jumoAiPlatform.queryFinancialAgent('ANALYSIS', { tenantId: 'tenant_finbank_01' });
  if (finAnalysis.agentName !== 'Financial Intelligence Agent' || !finAnalysis.response || finAnalysis.response.length === 0) {
    throw new Error('Engine Test Failed: Financial Agent analysis returned incorrect result');
  }

  // Test 2: Compliance Agent Policy Check
  const compCheck = await jumoAiPlatform.queryComplianceAgent('POLICY_MONITOR', {});
  if (compCheck.agentName !== 'Compliance Agent' || !compCheck.response || compCheck.response.length === 0) {
    throw new Error('Engine Test Failed: Compliance Agent policy monitoring returned incorrect result');
  }

  // Test 3: Operations Agent Workflow Optimization
  const opsOptimization = await jumoAiPlatform.queryOperationsAgent('WORKFLOW_OPTIMIZATION', {});
  if (opsOptimization.agentName !== 'Operations Agent' || !opsOptimization.response || opsOptimization.response.length === 0) {
    throw new Error('Engine Test Failed: Operations Agent optimization returned incorrect result');
  }

  // Test 4: Customer Agent Support Automation
  const custSupport = await jumoAiPlatform.queryCustomerAgent('SUPPORT_AUTOMATION', {});
  if (custSupport.agentName !== 'Customer Agent' || !custSupport.response || custSupport.response.length === 0) {
    throw new Error('Engine Test Failed: Customer Agent support returned incorrect result');
  }

  console.log('✅ JUMO Intelligence Fabric test passed.');
}

async function main() {
  testHighRiskRejection();
  testOwnerOverrideRequirement();
  testDoubleEntryBalancing();
  testTreasuryFxConversion();
  await testAiPlatform();
  testDomainEcosystem();
  testEnterpriseIdentityLayer();
  testAdvancedWorkflowStudio();
  await testJumoIntelligenceFabric();
}

main().catch((err) => {
  console.error('❌ Engine tests failed:', err);
  process.exit(1);
});
