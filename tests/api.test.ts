/**
 * API Controller Integration & Smoke Test Suite
 */

import { identityService } from '../backend/services/identityService';
import { faapEngine } from '../backend/services/faapEngine';
import { treasuryService } from '../backend/services/treasuryService';

async function runTests() {
  console.log('--- STARTING JUMO UEOS API SMOKE TESTS ---');

  // Test 1: Identity Auth
  console.log('[TEST 1] Testing Owner Identity Authentication...');
  const ownerAuth = identityService.authenticate('owner@jumo.io', 'jumo123');
  if (!ownerAuth || ownerAuth.user.role !== 'OWNER') {
    throw new Error('Test 1 Failed: Owner authentication mismatch');
  }
  console.log('✅ [TEST 1 PASSED] Owner auth token generated.');

  // Test 2: FAAP Engine Math
  console.log('[TEST 2] Testing FAAP Credit Risk Engine Math...');
  const faapResult = faapEngine.evaluateRisk({
    tenantId: 'tnt_finbank_88',
    requestedAmountUSD: 500000,
    creditScore: 780,
    collateralRatio: 1.5,
    historicalDefaultRate: 0.01,
  });
  if (faapResult.approvalStatus !== 'APPROVED' || faapResult.riskCategory !== 'LOW_RISK') {
    throw new Error('Test 2 Failed: Unexpected risk evaluation output');
  }
  console.log('✅ [TEST 2 PASSED] FAAP risk scoring verified.');

  // Test 3: Treasury Pool Allocation
  console.log('[TEST 3] Testing Treasury Pool Liquidity Allocation...');
  const { pool } = treasuryService.allocateFacility('pool_us_east_01', 100000);
  if (pool.allocatedAmountUSD < 100000) {
    throw new Error('Test 3 Failed: Allocation arithmetic mismatch');
  }
  console.log('✅ [TEST 3 PASSED] Treasury pool allocation verified.');

  console.log('--- ALL SMOKE TESTS PASSED SUCCESSFULLY ---');
}

runTests().catch((err) => {
  console.error('❌ SMOKE TEST FAILED:', err);
  process.exit(1);
});
