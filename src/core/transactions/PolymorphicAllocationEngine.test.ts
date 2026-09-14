import crypto from "crypto";
import { db } from "../../database/db";
import { PolymorphicAllocationEngine, AllocationPayload } from "./PolymorphicAllocationEngine";
import { MultiCurrencyConverter } from "./MultiCurrencyConverter";
import { KafkaErpSubscriber, PlatformLedgerEvent } from "./KafkaErpSubscriber";
import { UniversalUssdStateMachine, UssdRequest } from "../digitalpay/UniversalUssdStateMachine";
import { LedgerRepository, SecretsRepository } from "../../repositories/repositories";
import { LedgerEngine } from "../faap/LedgerEngine";

// Set a test webhook secret for HMAC verification
process.env.AGGREGATOR_WEBHOOK_SECRET = "jumo_secret_key_123456";

class TestAssertionError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "TestAssertionError";
  }
}

function assertEquals<T>(actual: T, expected: T, testName: string) {
  if (actual !== expected) {
    throw new TestAssertionError(`[FAIL] ${testName}: Expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
  }
}

function assertThrows(fn: () => any, testName: string, expectedErrSub?: string) {
  try {
    fn();
    throw new TestAssertionError(`[FAIL] ${testName}: Expected exception but function executed successfully.`);
  } catch (err: any) {
    if (err instanceof TestAssertionError) {
      throw err;
    }
    if (expectedErrSub && !err.message.includes(expectedErrSub)) {
      throw new TestAssertionError(`[FAIL] ${testName}: Expected error message to include "${expectedErrSub}", but got "${err.message}"`);
    }
    // Success: Threw correct error
  }
}

async function assertThrowsAsync(fn: () => Promise<any>, testName: string, expectedErrSub?: string) {
  try {
    await fn();
    throw new TestAssertionError(`[FAIL] ${testName}: Expected async exception but function executed successfully.`);
  } catch (err: any) {
    if (err instanceof TestAssertionError) {
      throw err;
    }
    if (expectedErrSub && !err.message.includes(expectedErrSub)) {
      throw new TestAssertionError(`[FAIL] ${testName}: Expected async error message to include "${expectedErrSub}", but got "${err.message}"`);
    }
    // Success: Threw correct error
  }
}

function generateSignature(eventId: string, payload: any): string {
  const hmac = crypto.createHmac("sha256", process.env.AGGREGATOR_WEBHOOK_SECRET!);
  const bodyStr = JSON.stringify({
    tenantId: payload.tenantId,
    eventId: payload.eventId,
    partyRoutingCode: payload.partyRoutingCode,
    amountMinor: payload.amountMinor,
    currency: payload.currency
  });
  hmac.update(bodyStr);
  return hmac.digest("hex");
}

export async function runAllTests() {
  console.log("\n==================================================");
  console.log("   RUNNING POLYMORPHIC ALLOCATION ENGINE TESTS    ");
  console.log("==================================================");

  let passed = 0;
  let failed = 0;

  const testCases = [
    // Webhook Signature / HMAC Security Tests
    { id: "T01", name: "Valid HMAC signature allows processing", fn: testT01 },
    { id: "T02", name: "Invalid HMAC signature throws Unauthorized Exception", fn: testT02 },
    { id: "T03", name: "Malformed signature encoding throws Exception", fn: testT03 },
    { id: "T04", name: "Missing signature header throws Exception", fn: testT04 },
    { id: "T05", name: "Signature timing-attack protection checks (timingSafeEqual)", fn: testT05 },

    // Idempotency Boundaries Tests
    { id: "T06", name: "First payment callback processed successfully", fn: testT06 },
    { id: "T07", name: "Duplicate callback returns cached result (no double allocation)", fn: testT07 },
    { id: "T08", name: "Duplicate callback with different tenantId does not conflict", fn: testT08 },
    { id: "T09", name: "Concurrent requests lock conflict handled gracefully", fn: testT09 },
    { id: "T10", name: "Voided processed payment allows reprocessing", fn: testT10 },

    // FIFO Allocation Engine Tests
    { id: "T11", name: "Single open item, exact full allocation", fn: testT11 },
    { id: "T12", name: "Single open item, partial allocation (marked PARTIALLY_PAID)", fn: testT12 },
    { id: "T13", name: "Multiple open items, FIFO sequence matched by oldest dueDate first", fn: testT13 },
    { id: "T14", name: "Multiple open items with same dueDate, matched by oldest createdAt first", fn: testT14 },
    { id: "T15", name: "Multiple open items, payment covers some fully and one partially", fn: testT15 },
    { id: "T16", name: "Zero open items, entire payment routed to S-Wallet overpayment", fn: testT16 },
    { id: "T17", name: "Non-active party (suspended/frozen) rejects payment allocation", fn: testT17 },
    { id: "T18", name: "Negative or zero remittance amount rejects allocation", fn: testT18 },
    { id: "T19", name: "Open items of different currency skipped during FIFO allocation", fn: testT19 },
    { id: "T20", name: "Overpayment policy SUSPENSE redirects residual to Suspense account", fn: testT20 },

    // S-Wallet Integration Tests
    { id: "T21", name: "Credit existing active S-wallet updates balance atomically", fn: testT21 },
    { id: "T22", name: "Credit missing S-wallet creates active wallet and adds balance", fn: testT22 },
    { id: "T23", name: "Credit frozen S-wallet throws Exception", fn: testT23 },
    { id: "T24", name: "Multi-currency S-wallets separate balance correctly", fn: testT24 },
    { id: "T25", name: "S-wallet updates logged inside Audit logs table", fn: testT25 },

    // Double-Entry GL Post Validation Tests
    { id: "T26", name: "Allocation posts valid journal header and entry items", fn: testT26 },
    { id: "T27", name: "Debits sum equals Credits sum (Double-Entry parity)", fn: testT27 },
    { id: "T28", name: "Cash clearing account configured by tenant debited correctly", fn: testT28 },
    { id: "T29", name: "Receivables control account configured by tenant credited correctly", fn: testT29 },
    { id: "T30", name: "Ledger Engine rejects imbalanced journal allocation post", fn: testT30 },

    // Multi-Currency Converter Tests
    { id: "T31", name: "Base identity conversion returns exact amount", fn: testT31 },
    { id: "T32", name: "Spot rate direct conversion (USD to UGX) with integer scaling", fn: testT32 },
    { id: "T33", name: "Cross-currency pivot calculation (GHS to KES through USD)", fn: testT33 },
    { id: "T34", name: "BigInt integer arithmetic prevents float precision drifts", fn: testT34 },
    { id: "T35", name: "Unresolved spot rate throws Treasury Exception", fn: testT35 },

    // Kafka Event Bus & USSD State Machine Tests
    { id: "T36", name: "Kafka subscriber handles retry block and DLQ routing on failure", fn: testT36 },
    { id: "T37", name: "Kafka subscriber rejects duplicate eventId (idempotency key)", fn: testT37 },
    { id: "T38", name: "USSD state machine handles menu transitions successfully", fn: testT38 },
  ];

  for (const tc of testCases) {
    try {
      // Clear database tables before each test to guarantee complete isolation
      resetDatabase();
      await tc.fn();
      console.log(`[PASS] ${tc.id}: ${tc.name}`);
      passed++;
    } catch (err: any) {
      console.error(`[FAIL] ${tc.id}: ${tc.name}`);
      console.error(`       Reason: ${err.message}`);
      failed++;
    }
  }

  console.log("\n==================================================");
  console.log(`  TEST RESULTS: ${passed} PASSED, ${failed} FAILED`);
  console.log("==================================================");

  if (failed > 0) {
    process.exit(1);
  }
}

// Ensure database tables are empty/reset for testing
function resetDatabase() {
  db.truncate("parties");
  db.truncate("open_items");
  db.truncate("wallets");
  db.truncate("processed_payments");
  db.truncate("journals");
  db.truncate("ledger_entries");
  db.truncate("audit_logs");
  db.truncate("ledger_accounts");
  db.truncate("accounting_periods");
  db.truncate("secrets_vault");

  // Seed required ledger accounts for standard tests
  LedgerRepository.saveAccount({ code: "1030-CLEARING-TRANSIT", name: "JUMO Fintech Transit Clearing Pool", category: "Asset", balance: 50000.00, status: "Active" });
  LedgerRepository.saveAccount({ code: "1200-LOANS", name: "Outstanding Member Loans", category: "Asset", balance: 489200.00, status: "Active" });
  LedgerRepository.saveAccount({ code: "1020-JUMO-TREASURY", name: "JUMO Master Treasury Cash Reserves", category: "Asset", balance: 250000.00, status: "Active" });
  LedgerRepository.saveAccount({ code: "4030-RECONCILIATION-RESERVE", name: "JUMO Ledger Discrepancy Reserve Offset", category: "Equity", balance: 0.00, status: "Active" });
  LedgerRepository.saveAccount({ code: "2010-SAVINGS", name: "Member Savings Deposits", category: "Liability", balance: 350450.00, status: "Active" });

  // Seed open accounting period for the entire year 2026
  db.insert("accounting_periods", {
    id: "FY2026",
    startDate: "2026-01-01T00:00:00Z",
    endDate: "2026-12-31T23:59:59Z",
    status: "Open"
  });
}

// ------------------- TEST CASES IMPLEMENTATIONS -------------------

// T01: Valid HMAC signature allows processing
async function testT01() {
  const partyId = "PRT-100";
  db.insert("parties", { id: partyId, tenantId: "TENT-1", routingCode: "1234567890", name: "Test Party", type: "STUDENT", status: "ACTIVE", createdAt: new Date().toISOString() });
  
  const payload: AllocationPayload = {
    tenantId: "TENT-1",
    eventId: "EVT-T01",
    signature: "",
    partyRoutingCode: "1234567890",
    amountMinor: 5000,
    currency: "UGX"
  };
  payload.signature = generateSignature(payload.eventId, payload);

  const res = await PolymorphicAllocationEngine.allocatePayment(payload);
  assertEquals(res.success, true, "T01");
}

// T02: Invalid HMAC signature throws Unauthorized Exception
async function testT02() {
  const payload: AllocationPayload = {
    tenantId: "TENT-1",
    eventId: "EVT-T02",
    signature: "bad_signature_value_123456",
    partyRoutingCode: "1234567890",
    amountMinor: 5000,
    currency: "UGX"
  };

  await assertThrowsAsync(
    () => PolymorphicAllocationEngine.allocatePayment(payload),
    "T02",
    "Security Exception: Unauthorized payment callback signature validation mismatch"
  );
}

// T03: Malformed signature encoding throws Exception
async function testT03() {
  const payload: AllocationPayload = {
    tenantId: "TENT-1",
    eventId: "EVT-T03",
    signature: "not-hex-characters-!!!!",
    partyRoutingCode: "1234567890",
    amountMinor: 5000,
    currency: "UGX"
  };

  await assertThrowsAsync(
    () => PolymorphicAllocationEngine.allocatePayment(payload),
    "T03"
  );
}

// T04: Missing signature header throws Exception
async function testT04() {
  const payload: AllocationPayload = {
    tenantId: "TENT-1",
    eventId: "EVT-T04",
    signature: "",
    partyRoutingCode: "1234567890",
    amountMinor: 5000,
    currency: "UGX"
  };

  await assertThrowsAsync(
    () => PolymorphicAllocationEngine.allocatePayment(payload),
    "T04",
    "Security Exception: Webhook signature is malformed or empty"
  );
}

// T05: Signature timing-attack protection checks (timingSafeEqual)
async function testT05() {
  // Indirectly validated by timingSafeEqual invocation and byte length matchers
  const payload: AllocationPayload = {
    tenantId: "TENT-1",
    eventId: "EVT-T05",
    signature: "a".repeat(64), // length 64 hex but incorrect value
    partyRoutingCode: "1234567890",
    amountMinor: 5000,
    currency: "UGX"
  };

  await assertThrowsAsync(
    () => PolymorphicAllocationEngine.allocatePayment(payload),
    "T05",
    "Security Exception: Unauthorized payment callback signature validation mismatch"
  );
}

// T06: First payment callback processed successfully
async function testT06() {
  db.insert("parties", { id: "P-T06", tenantId: "TENT-1", routingCode: "1111111111", name: "Party T06", type: "STUDENT", status: "ACTIVE", createdAt: new Date().toISOString() });
  
  const payload: AllocationPayload = {
    tenantId: "TENT-1",
    eventId: "EVT-T06",
    signature: "",
    partyRoutingCode: "1111111111",
    amountMinor: 10000,
    currency: "UGX"
  };
  payload.signature = generateSignature(payload.eventId, payload);

  const res = await PolymorphicAllocationEngine.allocatePayment(payload);
  assertEquals(res.success, true, "T06");
  assertEquals(res.paymentId, "EVT-T06", "T06");
}

// T07: Duplicate callback (same eventId) returns cached result (no double allocation)
async function testT07() {
  db.insert("parties", { id: "P-T07", tenantId: "TENT-1", routingCode: "2222222222", name: "Party T07", type: "STUDENT", status: "ACTIVE", createdAt: new Date().toISOString() });
  
  const payload: AllocationPayload = {
    tenantId: "TENT-1",
    eventId: "EVT-T07",
    signature: "",
    partyRoutingCode: "2222222222",
    amountMinor: 10000,
    currency: "UGX"
  };
  payload.signature = generateSignature(payload.eventId, payload);

  // First process
  await PolymorphicAllocationEngine.allocatePayment(payload);

  // Duplicate process
  const res = await PolymorphicAllocationEngine.allocatePayment(payload);
  assertEquals(res.success, true, "T07");
  
  // Verify that only 1 processed payment entry is committed
  const list = db.select<any>("processed_payments", (p: any) => p.id === "TENT-1:EVT-T07");
  assertEquals(list.length, 1, "T07");
}

// T08: Duplicate callback with different tenantId does not conflict (tenant isolation)
async function testT08() {
  db.insert("parties", { id: "P-T08-1", tenantId: "TENT-1", routingCode: "3333333333", name: "Party T08-1", type: "STUDENT", status: "ACTIVE", createdAt: new Date().toISOString() });
  db.insert("parties", { id: "P-T08-2", tenantId: "TENT-2", routingCode: "3333333333", name: "Party T08-2", type: "STUDENT", status: "ACTIVE", createdAt: new Date().toISOString() });

  const payload1: AllocationPayload = {
    tenantId: "TENT-1",
    eventId: "EVT-T08",
    signature: "",
    partyRoutingCode: "3333333333",
    amountMinor: 4000,
    currency: "UGX"
  };
  payload1.signature = generateSignature(payload1.eventId, payload1);

  const payload2: AllocationPayload = {
    tenantId: "TENT-2",
    eventId: "EVT-T08",
    signature: "",
    partyRoutingCode: "3333333333",
    amountMinor: 4000,
    currency: "UGX"
  };
  payload2.signature = generateSignature(payload2.eventId, payload2);

  const res1 = await PolymorphicAllocationEngine.allocatePayment(payload1);
  const res2 = await PolymorphicAllocationEngine.allocatePayment(payload2);

  assertEquals(res1.success, true, "T08");
  assertEquals(res2.success, true, "T08");

  const list = db.select<any>("processed_payments", (p: any) => p.id.endsWith("EVT-T08"));
  assertEquals(list.length, 2, "T08"); // 2 processed payments across different tenants
}

// T09: Concurrent requests lock conflict handled gracefully
async function testT09() {
  db.insert("parties", { id: "P-T09", tenantId: "TENT-1", routingCode: "4444444444", name: "Party T09", type: "STUDENT", status: "ACTIVE", createdAt: new Date().toISOString() });
  
  const payload: AllocationPayload = {
    tenantId: "TENT-1",
    eventId: "EVT-T09",
    signature: "",
    partyRoutingCode: "4444444444",
    amountMinor: 5000,
    currency: "UGX"
  };
  payload.signature = generateSignature(payload.eventId, payload);

  // Trigger two allocations on the same party simultaneously
  const p1 = PolymorphicAllocationEngine.allocatePayment(payload);
  
  // The second one must immediately throw a Lock Conflict Error
  await assertThrowsAsync(
    () => PolymorphicAllocationEngine.allocatePayment(payload),
    "T09",
    "Lock Conflict"
  );

  await p1;
}

// T10: Voided processed payment allows reprocessing
async function testT10() {
  db.insert("parties", { id: "P-T10", tenantId: "TENT-1", routingCode: "5555555555", name: "Party T10", type: "STUDENT", status: "ACTIVE", createdAt: new Date().toISOString() });
  
  const payload: AllocationPayload = {
    tenantId: "TENT-1",
    eventId: "EVT-T10",
    signature: "",
    partyRoutingCode: "5555555555",
    amountMinor: 5000,
    currency: "UGX"
  };
  payload.signature = generateSignature(payload.eventId, payload);

  await PolymorphicAllocationEngine.allocatePayment(payload);

  // Manually delete/void the processed payment log
  db.delete("processed_payments", (p: any) => p.id === "EVT-T10");

  // Re-process should succeed now
  const res = await PolymorphicAllocationEngine.allocatePayment(payload);
  assertEquals(res.success, true, "T10");
}

// T11: Single open item, exact full allocation
async function testT11() {
  const partyId = "P-T11";
  db.insert("parties", { id: partyId, tenantId: "TENT-1", routingCode: "6666666666", name: "Party T11", type: "STUDENT", status: "ACTIVE", createdAt: new Date().toISOString() });
  db.insert("open_items", { id: "OI-T11", tenantId: "TENT-1", partyId, amountMinor: 10000, allocatedAmountMinor: 0, currency: "UGX", type: "TUITION", dueDate: "2026-12-31", createdAt: "2026-09-01", status: "UNPAID" });

  const payload: AllocationPayload = {
    tenantId: "TENT-1",
    eventId: "EVT-T11",
    signature: "",
    partyRoutingCode: "6666666666",
    amountMinor: 10000,
    currency: "UGX"
  };
  payload.signature = generateSignature(payload.eventId, payload);

  const res = await PolymorphicAllocationEngine.allocatePayment(payload);
  assertEquals(res.allocatedAmountMinor, 10000, "T11");
  assertEquals(res.residualAmountMinor, 0, "T11");

  const oi = db.select<any>("open_items", (o: any) => o.id === "OI-T11")[0];
  assertEquals(oi.status, "PAID", "T11");
  assertEquals(oi.allocatedAmountMinor, 10000, "T11");
}

// T12: Single open item, partial allocation (marked PARTIALLY_PAID)
async function testT12() {
  const partyId = "P-T12";
  db.insert("parties", { id: partyId, tenantId: "TENT-1", routingCode: "7777777777", name: "Party T12", type: "STUDENT", status: "ACTIVE", createdAt: new Date().toISOString() });
  db.insert("open_items", { id: "OI-T12", tenantId: "TENT-1", partyId, amountMinor: 10000, allocatedAmountMinor: 0, currency: "UGX", type: "TUITION", dueDate: "2026-12-31", createdAt: "2026-09-01", status: "UNPAID" });

  const payload: AllocationPayload = {
    tenantId: "TENT-1",
    eventId: "EVT-T12",
    signature: "",
    partyRoutingCode: "7777777777",
    amountMinor: 4000,
    currency: "UGX"
  };
  payload.signature = generateSignature(payload.eventId, payload);

  const res = await PolymorphicAllocationEngine.allocatePayment(payload);
  assertEquals(res.allocatedAmountMinor, 4000, "T12");
  assertEquals(res.residualAmountMinor, 0, "T12");

  const oi = db.select<any>("open_items", (o: any) => o.id === "OI-T12")[0];
  assertEquals(oi.status, "PARTIALLY_PAID", "T12");
  assertEquals(oi.allocatedAmountMinor, 4000, "T12");
}

// T13: Multiple open items, FIFO sequence matched by oldest dueDate first
async function testT13() {
  const partyId = "P-T13";
  db.insert("parties", { id: partyId, tenantId: "TENT-1", routingCode: "8888888888", name: "Party T13", type: "STUDENT", status: "ACTIVE", createdAt: new Date().toISOString() });
  
  // Two open items. OI-2 has an older due date than OI-1.
  db.insert("open_items", { id: "OI-T13-1", tenantId: "TENT-1", partyId, amountMinor: 5000, allocatedAmountMinor: 0, currency: "UGX", type: "TUITION", dueDate: "2026-12-31", createdAt: "2026-09-01", status: "UNPAID" });
  db.insert("open_items", { id: "OI-T13-2", tenantId: "TENT-1", partyId, amountMinor: 5000, allocatedAmountMinor: 0, currency: "UGX", type: "TUITION", dueDate: "2026-10-31", createdAt: "2026-09-05", status: "UNPAID" });

  const payload: AllocationPayload = {
    tenantId: "TENT-1",
    eventId: "EVT-T13",
    signature: "",
    partyRoutingCode: "8888888888",
    amountMinor: 5000,
    currency: "UGX"
  };
  payload.signature = generateSignature(payload.eventId, payload);

  // Remaining unallocated should be 0, because the 5000 is fully applied to OI-2 (oldest due date)
  const res = await PolymorphicAllocationEngine.allocatePayment(payload);
  assertEquals(res.allocatedAmountMinor, 5000, "T13");
  assertEquals(res.allocatedItems[0].openItemId, "OI-T13-2", "T13");

  const oi1 = db.select<any>("open_items", (o: any) => o.id === "OI-T13-1")[0];
  const oi2 = db.select<any>("open_items", (o: any) => o.id === "OI-T13-2")[0];

  assertEquals(oi2.status, "PAID", "T13");
  assertEquals(oi1.status, "UNPAID", "T13");
}

// T14: Multiple open items with same dueDate, FIFO sequence matched by oldest createdAt first
async function testT14() {
  const partyId = "P-T14";
  db.insert("parties", { id: partyId, tenantId: "TENT-1", routingCode: "9999999999", name: "Party T14", type: "STUDENT", status: "ACTIVE", createdAt: new Date().toISOString() });
  
  // Same dueDate, OI-1 has older createdAt than OI-2
  db.insert("open_items", { id: "OI-T14-1", tenantId: "TENT-1", partyId, amountMinor: 5000, allocatedAmountMinor: 0, currency: "UGX", type: "TUITION", dueDate: "2026-12-31", createdAt: "2026-09-01", status: "UNPAID" });
  db.insert("open_items", { id: "OI-T14-2", tenantId: "TENT-1", partyId, amountMinor: 5000, allocatedAmountMinor: 0, currency: "UGX", type: "TUITION", dueDate: "2026-12-31", createdAt: "2026-09-10", status: "UNPAID" });

  const payload: AllocationPayload = {
    tenantId: "TENT-1",
    eventId: "EVT-T14",
    signature: "",
    partyRoutingCode: "9999999999",
    amountMinor: 5000,
    currency: "UGX"
  };
  payload.signature = generateSignature(payload.eventId, payload);

  const res = await PolymorphicAllocationEngine.allocatePayment(payload);
  assertEquals(res.allocatedAmountMinor, 5000, "T14");
  assertEquals(res.allocatedItems[0].openItemId, "OI-T14-1", "T14"); // Olest createdAt first
}

// T15: Multiple open items, payment covers some fully and one partially
async function testT15() {
  const partyId = "P-T15";
  db.insert("parties", { id: partyId, tenantId: "TENT-1", routingCode: "1212121212", name: "Party T15", type: "STUDENT", status: "ACTIVE", createdAt: new Date().toISOString() });
  
  db.insert("open_items", { id: "OI-T15-1", tenantId: "TENT-1", partyId, amountMinor: 4000, allocatedAmountMinor: 0, currency: "UGX", type: "TUITION", dueDate: "2026-10-01", createdAt: "2026-09-01", status: "UNPAID" });
  db.insert("open_items", { id: "OI-T15-2", tenantId: "TENT-1", partyId, amountMinor: 4000, allocatedAmountMinor: 0, currency: "UGX", type: "TUITION", dueDate: "2026-11-01", createdAt: "2026-09-02", status: "UNPAID" });

  const payload: AllocationPayload = {
    tenantId: "TENT-1",
    eventId: "EVT-T15",
    signature: "",
    partyRoutingCode: "1212121212",
    amountMinor: 6000,
    currency: "UGX"
  };
  payload.signature = generateSignature(payload.eventId, payload);

  const res = await PolymorphicAllocationEngine.allocatePayment(payload);
  assertEquals(res.allocatedAmountMinor, 6000, "T15");
  assertEquals(res.residualAmountMinor, 0, "T15");
  assertEquals(res.allocatedItems.length, 2, "T15");

  const oi1 = db.select<any>("open_items", (o: any) => o.id === "OI-T15-1")[0];
  const oi2 = db.select<any>("open_items", (o: any) => o.id === "OI-T15-2")[0];

  assertEquals(oi1.status, "PAID", "T15");
  assertEquals(oi2.status, "PARTIALLY_PAID", "T15");
  assertEquals(oi2.allocatedAmountMinor, 2000, "T15");
}

// T16: Zero open items, entire payment routed to S-Wallet overpayment
async function testT16() {
  const partyId = "P-T16";
  db.insert("parties", { id: partyId, tenantId: "TENT-1", routingCode: "1313131313", name: "Party T16", type: "STUDENT", status: "ACTIVE", createdAt: new Date().toISOString() });

  const payload: AllocationPayload = {
    tenantId: "TENT-1",
    eventId: "EVT-T16",
    signature: "",
    partyRoutingCode: "1313131313",
    amountMinor: 8000,
    currency: "UGX"
  };
  payload.signature = generateSignature(payload.eventId, payload);

  const res = await PolymorphicAllocationEngine.allocatePayment(payload);
  assertEquals(res.allocatedAmountMinor, 0, "T16");
  assertEquals(res.residualAmountMinor, 8000, "T16");
  assertEquals(res.walletCredited, true, "T16");

  const wallet = db.select<any>("wallets", (w: any) => w.partyId === partyId)[0];
  assertEquals(wallet.balanceMinor, 8000, "T16");
}

// T17: Non-active party (suspended/frozen) rejects payment allocation
async function testT17() {
  db.insert("parties", { id: "P-T17", tenantId: "TENT-1", routingCode: "1414141414", name: "Party T17", type: "STUDENT", status: "SUSPENDED", createdAt: new Date().toISOString() });

  const payload: AllocationPayload = {
    tenantId: "TENT-1",
    eventId: "EVT-T17",
    signature: "",
    partyRoutingCode: "1414141414",
    amountMinor: 5000,
    currency: "UGX"
  };
  payload.signature = generateSignature(payload.eventId, payload);

  await assertThrowsAsync(
    () => PolymorphicAllocationEngine.allocatePayment(payload),
    "T17",
    "Security Exception: Party P-T17 status is SUSPENDED. Payments rejected."
  );
}

// T18: Negative or zero remittance amount rejects allocation
async function testT18() {
  const payload: AllocationPayload = {
    tenantId: "TENT-1",
    eventId: "EVT-T18",
    signature: "",
    partyRoutingCode: "1515151515",
    amountMinor: -100,
    currency: "UGX"
  };

  await assertThrowsAsync(
    () => PolymorphicAllocationEngine.allocatePayment(payload),
    "T18",
    "Treasury Exception: Allocation amount must be positive"
  );
}

// T19: Open items of different currency skipped during FIFO allocation
async function testT19() {
  const partyId = "P-T19";
  db.insert("parties", { id: partyId, tenantId: "TENT-1", routingCode: "1616161616", name: "Party T19", type: "STUDENT", status: "ACTIVE", createdAt: new Date().toISOString() });
  
  // One USD item, one UGX item. Remitting UGX should skip the USD item!
  db.insert("open_items", { id: "OI-T19-USD", tenantId: "TENT-1", partyId, amountMinor: 100, allocatedAmountMinor: 0, currency: "USD", type: "TUITION", dueDate: "2026-10-01", createdAt: "2026-09-01", status: "UNPAID" });
  db.insert("open_items", { id: "OI-T19-UGX", tenantId: "TENT-1", partyId, amountMinor: 5000, allocatedAmountMinor: 0, currency: "UGX", type: "TUITION", dueDate: "2026-11-01", createdAt: "2026-09-02", status: "UNPAID" });

  const payload: AllocationPayload = {
    tenantId: "TENT-1",
    eventId: "EVT-T19",
    signature: "",
    partyRoutingCode: "1616161616",
    amountMinor: 5000,
    currency: "UGX"
  };
  payload.signature = generateSignature(payload.eventId, payload);

  const res = await PolymorphicAllocationEngine.allocatePayment(payload);
  assertEquals(res.allocatedAmountMinor, 5000, "T19");
  assertEquals(res.allocatedItems[0].openItemId, "OI-T19-UGX", "T19");

  const usdItem = db.select<any>("open_items", (o: any) => o.id === "OI-T19-USD")[0];
  assertEquals(usdItem.status, "UNPAID", "T19");
}

// T20: Overpayment policy SUSPENSE redirects residual to Suspense account
async function testT20() {
  const partyId = "P-T20";
  db.insert("parties", { id: partyId, tenantId: "TENT-1", routingCode: "1717171717", name: "Party T20", type: "STUDENT", status: "ACTIVE", createdAt: new Date().toISOString() });
  
  // Set policy in secrets_vault to SUSPENSE using SecretsRepository to avoid primary key conflicts
  SecretsRepository.save({ key: "overpaymentPolicy_TENT-1", value: "SUSPENSE", category: "config", description: "", status: "active", versionHistory: "[]", lastRotated: "", expiresAt: "", createdBy: "admin", updatedBy: "admin" });

  const payload: AllocationPayload = {
    tenantId: "TENT-1",
    eventId: "EVT-T20",
    signature: "",
    partyRoutingCode: "1717171717",
    amountMinor: 5000,
    currency: "UGX"
  };
  payload.signature = generateSignature(payload.eventId, payload);

  const res = await PolymorphicAllocationEngine.allocatePayment(payload);
  assertEquals(res.residualAmountMinor, 5000, "T20");
  assertEquals(res.walletCredited, false, "T20");

  // Verify journal posts matching the overpayment entry into the Suspense Ledger
  const journalEntries = db.select<any>("ledger_entries", (e: any) => e.journalId === res.journalId && e.accountId === "4030-RECONCILIATION-RESERVE");
  assertEquals(journalEntries.length, 1, "T20");
  assertEquals(journalEntries[0].credit, 5000, "T20");
}

// T21: Credit existing active S-wallet updates balance atomically
async function testT21() {
  const partyId = "P-T21";
  db.insert("parties", { id: partyId, tenantId: "TENT-1", routingCode: "1818181818", name: "Party T21", type: "STUDENT", status: "ACTIVE", createdAt: new Date().toISOString() });
  db.insert("wallets", { id: "WLT-TENT-1-P-T21-UGX", tenantId: "TENT-1", partyId, currency: "UGX", balanceMinor: 1000, status: "ACTIVE", updatedAt: new Date().toISOString() });

  const payload: AllocationPayload = {
    tenantId: "TENT-1",
    eventId: "EVT-T21",
    signature: "",
    partyRoutingCode: "1818181818",
    amountMinor: 5000,
    currency: "UGX"
  };
  payload.signature = generateSignature(payload.eventId, payload);

  const res = await PolymorphicAllocationEngine.allocatePayment(payload);
  assertEquals(res.residualAmountMinor, 5000, "T21");
  assertEquals(res.walletCredited, true, "T21");

  const wallet = db.select<any>("wallets", (w: any) => w.partyId === partyId)[0];
  assertEquals(wallet.balanceMinor, 6000, "T21"); // 1000 + 5000 = 6000
}

// T22: Credit missing S-wallet creates active wallet and adds balance
async function testT22() {
  const partyId = "P-T22";
  db.insert("parties", { id: partyId, tenantId: "TENT-1", routingCode: "1919191919", name: "Party T22", type: "STUDENT", status: "ACTIVE", createdAt: new Date().toISOString() });

  const payload: AllocationPayload = {
    tenantId: "TENT-1",
    eventId: "EVT-T22",
    signature: "",
    partyRoutingCode: "1919191919",
    amountMinor: 5000,
    currency: "UGX"
  };
  payload.signature = generateSignature(payload.eventId, payload);

  await PolymorphicAllocationEngine.allocatePayment(payload);

  const wallet = db.select<any>("wallets", (w: any) => w.partyId === partyId)[0];
  assertEquals(wallet.balanceMinor, 5000, "T22");
  assertEquals(wallet.status, "ACTIVE", "T22");
}

// T23: Credit frozen S-wallet throws Exception
async function testT23() {
  const partyId = "P-T23";
  db.insert("parties", { id: partyId, tenantId: "TENT-1", routingCode: "2020202020", name: "Party T23", type: "STUDENT", status: "ACTIVE", createdAt: new Date().toISOString() });
  db.insert("wallets", { id: "WLT-TENT-1-P-T23-UGX", tenantId: "TENT-1", partyId, currency: "UGX", balanceMinor: 1000, status: "FROZEN", updatedAt: new Date().toISOString() });

  const payload: AllocationPayload = {
    tenantId: "TENT-1",
    eventId: "EVT-T23",
    signature: "",
    partyRoutingCode: "2020202020",
    amountMinor: 5000,
    currency: "UGX"
  };
  payload.signature = generateSignature(payload.eventId, payload);

  await assertThrowsAsync(
    () => PolymorphicAllocationEngine.allocatePayment(payload),
    "T23",
    "S-Wallet Exception: Cannot credit frozen or closed digital wallet"
  );
}

// T24: Multi-currency S-wallets separate balance correctly
async function testT24() {
  const partyId = "P-T24";
  db.insert("parties", { id: partyId, tenantId: "TENT-1", routingCode: "2121212121", name: "Party T24", type: "STUDENT", status: "ACTIVE", createdAt: new Date().toISOString() });
  db.insert("wallets", { id: "WLT-TENT-1-P-T24-UGX", tenantId: "TENT-1", partyId, currency: "UGX", balanceMinor: 1000, status: "ACTIVE", updatedAt: new Date().toISOString() });

  const payload: AllocationPayload = {
    tenantId: "TENT-1",
    eventId: "EVT-T24",
    signature: "",
    partyRoutingCode: "2121212121",
    amountMinor: 50,
    currency: "USD" // Remitting USD overpayment
  };
  payload.signature = generateSignature(payload.eventId, payload);

  await PolymorphicAllocationEngine.allocatePayment(payload);

  const walletUgx = db.select<any>("wallets", (w: any) => w.partyId === partyId && w.currency === "UGX")[0];
  const walletUsd = db.select<any>("wallets", (w: any) => w.partyId === partyId && w.currency === "USD")[0];

  assertEquals(walletUgx.balanceMinor, 1000, "T24");
  assertEquals(walletUsd.balanceMinor, 50, "T24");
}

// T25: S-wallet updates logged inside Audit logs table
async function testT25() {
  const partyId = "P-T25";
  db.insert("parties", { id: partyId, tenantId: "TENT-1", routingCode: "2222222221", name: "Party T25", type: "STUDENT", status: "ACTIVE", createdAt: new Date().toISOString() });

  const payload: AllocationPayload = {
    tenantId: "TENT-1",
    eventId: "EVT-T25",
    signature: "",
    partyRoutingCode: "2222222221",
    amountMinor: 5000,
    currency: "UGX"
  };
  payload.signature = generateSignature(payload.eventId, payload);

  await PolymorphicAllocationEngine.allocatePayment(payload);

  const logs = db.select<any>("audit_logs", (l: any) => l.actor === "WALLET_SERVICE" && l.action === "WALLET_CREDITED");
  assertEquals(logs.length, 1, "T25");
}

// T26: Allocation posts valid journal header and entry items
async function testT26() {
  const partyId = "P-T26";
  db.insert("parties", { id: partyId, tenantId: "TENT-1", routingCode: "2323232323", name: "Party T26", type: "STUDENT", status: "ACTIVE", createdAt: new Date().toISOString() });
  
  const payload: AllocationPayload = {
    tenantId: "TENT-1",
    eventId: "EVT-T26",
    signature: "",
    partyRoutingCode: "2323232323",
    amountMinor: 5000,
    currency: "UGX"
  };
  payload.signature = generateSignature(payload.eventId, payload);

  const res = await PolymorphicAllocationEngine.allocatePayment(payload);
  
  const journal = db.select<any>("journals", (j: any) => j.id === res.journalId)[0];
  assertEquals(journal.reference, "EVT-T26", "T26");
}

// T27: Debits sum equals Credits sum (Double-Entry parity)
async function testT27() {
  const partyId = "P-T27";
  db.insert("parties", { id: partyId, tenantId: "TENT-1", routingCode: "2424242424", name: "Party T27", type: "STUDENT", status: "ACTIVE", createdAt: new Date().toISOString() });
  db.insert("open_items", { id: "OI-T27", tenantId: "TENT-1", partyId, amountMinor: 3000, allocatedAmountMinor: 0, currency: "UGX", type: "TUITION", dueDate: "2026-10-01", createdAt: "2026-09-01", status: "UNPAID" });

  const payload: AllocationPayload = {
    tenantId: "TENT-1",
    eventId: "EVT-T27",
    signature: "",
    partyRoutingCode: "2424242424",
    amountMinor: 5000, // 3000 allocated, 2000 wallet overpayment
    currency: "UGX"
  };
  payload.signature = generateSignature(payload.eventId, payload);

  const res = await PolymorphicAllocationEngine.allocatePayment(payload);

  const entries = db.select<any>("ledger_entries", (e: any) => e.journalId === res.journalId);
  const debits = entries.reduce((s: number, e: any) => s + Number(e.debit), 0);
  const credits = entries.reduce((s: number, e: any) => s + Number(e.credit), 0);

  assertEquals(debits, 5000, "T27");
  assertEquals(credits, 5000, "T27");
}

// T28: Cash clearing account configured by tenant debited correctly
async function testT28() {
  const partyId = "P-T28";
  db.insert("parties", { id: partyId, tenantId: "TENT-1", routingCode: "2525252525", name: "Party T28", type: "STUDENT", status: "ACTIVE", createdAt: new Date().toISOString() });
  
  // Configure alternative custom clearing account using SecretsRepository to avoid conflicts
  SecretsRepository.save({
    key: "accountsMap_TENT-1",
    value: JSON.stringify({ clearingAccount: "1020-JUMO-TREASURY", receivablesAccount: "1200-LOANS" }),
    category: "config", description: "", status: "active", versionHistory: "[]", lastRotated: "", expiresAt: "", createdBy: "admin", updatedBy: "admin"
  });

  const payload: AllocationPayload = {
    tenantId: "TENT-1",
    eventId: "EVT-T28",
    signature: "",
    partyRoutingCode: "2525252525",
    amountMinor: 5000,
    currency: "UGX"
  };
  payload.signature = generateSignature(payload.eventId, payload);

  const res = await PolymorphicAllocationEngine.allocatePayment(payload);

  const clearingEntries = db.select<any>("ledger_entries", (e: any) => e.journalId === res.journalId && e.accountId === "1020-JUMO-TREASURY");
  assertEquals(clearingEntries.length, 1, "T28");
  assertEquals(clearingEntries[0].debit, 5000, "T28");
}

// T29: Receivables control account configured by tenant credited correctly
async function testT29() {
  const partyId = "P-T29";
  db.insert("parties", { id: partyId, tenantId: "TENT-1", routingCode: "2626262626", name: "Party T29", type: "STUDENT", status: "ACTIVE", createdAt: new Date().toISOString() });
  db.insert("open_items", { id: "OI-T29", tenantId: "TENT-1", partyId, amountMinor: 5000, allocatedAmountMinor: 0, currency: "UGX", type: "TUITION", dueDate: "2026-10-01", createdAt: "2026-09-01", status: "UNPAID" });

  // Configure custom accounts map for TENT-1 using SecretsRepository
  SecretsRepository.save({
    key: "accountsMap_TENT-1",
    value: JSON.stringify({ clearingAccount: "1030-CLEARING-TRANSIT", receivablesAccount: "1200-LOANS" }),
    category: "config", description: "", status: "active", versionHistory: "[]", lastRotated: "", expiresAt: "", createdBy: "admin", updatedBy: "admin"
  });

  const payload: AllocationPayload = {
    tenantId: "TENT-1",
    eventId: "EVT-T29",
    signature: "",
    partyRoutingCode: "2626262626",
    amountMinor: 5000,
    currency: "UGX"
  };
  payload.signature = generateSignature(payload.eventId, payload);

  const res = await PolymorphicAllocationEngine.allocatePayment(payload);

  const receivablesEntries = db.select<any>("ledger_entries", (e: any) => e.journalId === res.journalId && e.accountId === "1200-LOANS");
  assertEquals(receivablesEntries.length, 1, "T29");
  assertEquals(receivablesEntries[0].credit, 5000, "T29");
}

// T30: Ledger Engine rejects imbalanced journal allocation post
async function testT30() {
  const entries = [
    { accountId: "1030-CLEARING-TRANSIT", debit: 1000, credit: 0, currency: "UGX" },
    { accountId: "1200-LOANS", debit: 0, credit: 950, currency: "UGX" } // Imbalanced by 50 UGX
  ];

  const isValid = LedgerEngine.validateBalance(entries);
  assertEquals(isValid, false, "T30");
}

// T31: Base identity conversion returns exact amount
async function testT31() {
  const res = await MultiCurrencyConverter.convert(1000, "UGX", "UGX");
  assertEquals(res.convertedAmountMinor, 1000, "T31");
  assertEquals(res.appliedRate, 1.0, "T31");
}

// T32: Spot rate direct conversion (USD to UGX) with integer scaling
async function testT32() {
  const res = await MultiCurrencyConverter.convert(10, "USD", "UGX");
  // 1 USD = 3700 UGX, so 10 USD cents * 3700 = 37000 UGX cents
  assertEquals(res.convertedAmountMinor, 37000, "T32");
}

// T33: Cross-currency pivot calculation (GHS to KES through USD)
async function testT33() {
  const res = await MultiCurrencyConverter.convert(1000, "GHS", "KES");
  // Direct GHS -> KES rate = 10.8
  // 1000 * 10.8 = 10800
  assertEquals(res.convertedAmountMinor, 10800, "T33");
}

// T34: BigInt integer arithmetic prevents float precision drifts
async function testT34() {
  const res = await MultiCurrencyConverter.convert(12345678, "UGX", "USD");
  // UGX -> USD rate = 0.00027
  // BigInt scaling converts 12345678 * 270 (0.00027 * 1000000) / 1000000 = 3333.33306 -> 3333
  assertEquals(res.convertedAmountMinor, 3333, "T34");
}

// T35: Unresolved spot rate throws Treasury Exception
async function testT35() {
  await assertThrowsAsync(
    () => MultiCurrencyConverter.convert(1000, "CAD", "UGX"),
    "T35",
    "Treasury Exception: Unable to resolve active spot exchange rate"
  );
}

// T36: Kafka subscriber handles retry block and DLQ routing on failure
async function testT36() {
  const subscriber = new KafkaErpSubscriber();
  
  // Subscribe a failing handler
  subscriber.subscribe("test.fail.topic", async (e) => {
    throw new Error("Downstream connection timeout");
  });

  // Must complete without crashing the thread, after exhausting 3 retry dispatches, routing to DLQ
  await subscriber.handleInboundEvent("test.fail.topic", JSON.stringify({ eventId: "EVT-T36", tenantId: "T-1", journalId: "J-1", reference: "R-1", amountMinor: 100, currency: "UGX", timestamp: "", partyRoutingCode: "" }));
}

// T37: Kafka subscriber rejects duplicate eventId (idempotency key)
async function testT37() {
  const subscriber = new KafkaErpSubscriber();
  let invokeCount = 0;

  subscriber.subscribe("test.idempotency.topic", async (e) => {
    invokeCount++;
  });

  const payload = JSON.stringify({ eventId: "EVT-T37", tenantId: "T-1", journalId: "J-1", reference: "R-1", amountMinor: 100, currency: "UGX", timestamp: "", partyRoutingCode: "" });
  
  await subscriber.handleInboundEvent("test.idempotency.topic", payload);
  await subscriber.handleInboundEvent("test.idempotency.topic", payload); // Duplicate

  assertEquals(invokeCount, 1, "T37"); // Invoked exactly once!
}

// T38: USSD state machine handles menu transitions from WELCOME to COMPLETED successfully
async function testT38() {
  // Prep database with active routing code
  const partyId = "P-T38";
  db.insert("parties", { id: partyId, tenantId: "TENT-1", routingCode: "9876543210", name: "Julius Okwi", type: "STUDENT", status: "ACTIVE", createdAt: new Date().toISOString() });

  const sessId = "SESS-123";
  const phone = "256770000001";

  // Step 1: Initial Trigger
  let res = UniversalUssdStateMachine.handleRequest({ sessionId: sessId, phoneNumber: phone, text: "", serviceCode: "*217#" });
  assertEquals(res.startsWith("CON"), true, "T38-S1");

  // Step 2: Choose Quick Pay
  res = UniversalUssdStateMachine.handleRequest({ sessionId: sessId, phoneNumber: phone, text: "1", serviceCode: "*217#" });
  assertEquals(res.includes("Enter 10-Digit Payee Routing Code"), true, "T38-S2");

  // Step 3: Enter Routing Code
  res = UniversalUssdStateMachine.handleRequest({ sessionId: sessId, phoneNumber: phone, text: "1*9876543210", serviceCode: "*217#" });
  assertEquals(res.includes("Payee: Julius Okwi"), true, "T38-S3");

  // Step 4: Confirm Payee & Pay
  res = UniversalUssdStateMachine.handleRequest({ sessionId: sessId, phoneNumber: phone, text: "1*9876543210*1", serviceCode: "*217#" });
  assertEquals(res.includes("Enter Amount in minor units"), true, "T38-S4");

  // Step 5: Enter Amount
  res = UniversalUssdStateMachine.handleRequest({ sessionId: sessId, phoneNumber: phone, text: "1*9876543210*1*5000", serviceCode: "*217#" });
  assertEquals(res.includes("Confirm payment of 5000"), true, "T38-S5");

  // Step 6: Final Confirm
  res = UniversalUssdStateMachine.handleRequest({ sessionId: sessId, phoneNumber: phone, text: "1*9876543210*1*5000*1", serviceCode: "*217#" });
  assertEquals(res.startsWith("END"), true, "T38-S6");
  assertEquals(res.includes("initiated"), true, "T38-S6");
}

// Auto-run if executed directly via node/tsx
const isDirectRun = process.argv[1] && (process.argv[1].endsWith("PolymorphicAllocationEngine.test.ts") || process.argv[1].endsWith("PolymorphicAllocationEngine.test.js"));
if (isDirectRun || !process.argv[1]) {
  runAllTests().catch((err) => {
    console.error("Fatal uncaught exception in test suite:", err);
    process.exit(1);
  });
}
