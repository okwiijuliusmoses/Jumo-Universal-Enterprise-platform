# OFFLINE SYNC ARCHITECTURE REPORT
## JUMO Universal Enterprise Operating System (UEOS) — Mobile & Edge Offline Sync Subsystem

This document provides the full architectural specification, state machine documentation, and integration guide for the JUMO Mobile & Edge Offline Synchronization Engine (`offlineSyncService`).

---

### 1. Architectural Overview

The JUMO Mobile Offline Synchronization Engine enables all 7 standalone products to execute high-value operational tasks (fee payments, exeat pass approvals, nursery welfare logs, field expense vouchers, and bank reconciliations) in zero-connectivity environments.

It features:
- **Persistent Local Queue**: Saved to `localStorage` (with fallback to IndexedDB or in-memory ring buffers) across application restarts.
- **Idempotency Fingerprinting**: Cryptographic hash generation (`productCode + type + timestamp + JSON.stringify(payload)`) preventing duplicate submissions upon reconnection.
- **State Machine Lifecycle**: Explicit state transitions tracking items from creation to cloud synchronization.
- **Network Event Listener**: Automatic background triggering upon `online` network events.

---

### 2. State Machine Lifecycle

Each queued item follows an explicit state transition lifecycle:

```
                  ┌─────────────────┐
                  │   LOCAL_ONLY    │
                  └────────┬────────┘
                           │ (Enqueue)
                           ▼
                  ┌─────────────────┐
                  │     QUEUED      │ ◄─────────────────────┐
                  └────────┬────────┘                       │
                           │ (Network Online / Sync Call)   │
                           ▼                                │
                  ┌─────────────────┐                       │
                  │    SYNCING      │                       │
                  └────┬───────┬────┘                       │
      (Success)        │       │ (Transient Error)          │
          ┌────────────┘       └────────────┐               │
          ▼                                 ▼               │
┌─────────────────┐               ┌─────────────────┐       │
│     SYNCED      │               │  RETRY_PENDING  ├───────┘ (Exponential Backoff)
└─────────────────┘               └────────┬────────┘
                                           │ (Max Retries Exceeded)
                                           ▼
                                  ┌─────────────────┐
                                  │     FAILED      │
                                  └────────┬────────┘
                                           │ (Conflict Detected)
                                           ▼
                                  ┌─────────────────┐
                                  │REQUIRES_REVIEW  │
                                  └─────────────────┘
```

#### State Definitions
1. **`LOCAL_ONLY`**: Operation created and rendered in the local UI before queueing.
2. **`QUEUED`**: Safely serialized into the persistent queue, awaiting network connectivity.
3. **`SYNCING`**: Active HTTP/WebSocket payload dispatch in progress.
4. **`SYNCED`**: Successfully committed to cloud ledger (FAAP / product backend) and acknowledged with cloud ID.
5. **`RETRY_PENDING`**: Transient network timeout or 5xx server error encountered; scheduled for automatic retry.
6. **`FAILED`**: Maximum retries (default: 5) exceeded or fatal schema error returned.
7. **`CONFLICT`**: Cloud state has mutated since local queuing; conflict resolution required.
8. **`REQUIRES_REVIEW`**: High-value transaction flagged for manual supervisor audit.

---

### 3. Implementation Code Reference (`src/core/offline/offlineSyncService.ts`)

```typescript
export interface OfflineSyncItem<T = any> {
  id: string;
  fingerprint: string;
  productCode: string;
  operationType: 'PAYMENT' | 'EXEAT_REQUEST' | 'NURSERY_WELFARE' | 'EXPENSE_VOUCHER' | 'JOURNAL_POST' | 'GENERIC';
  payload: T;
  state: 'LOCAL_ONLY' | 'QUEUED' | 'SYNCING' | 'SYNCED' | 'RETRY_PENDING' | 'FAILED' | 'CONFLICT' | 'REQUIRES_REVIEW';
  retryCount: number;
  maxRetries: number;
  createdAt: string;
  updatedAt: string;
  lastError?: string;
  cloudId?: string;
}
```

---

### 4. Integration Examples in Standalone Mobile Products

#### 4.1 Payment Submission in Mobile App (`AlphaAcademyMobileApp.tsx`)
```typescript
if (!isOnline) {
  offlineSyncService.enqueuePayment('PROD_EDU_PRIMARY', {
    amount: paymentAmount,
    currency: 'UGX',
    payerId: selectedStudent.id,
    payerName: selectedStudent.fullName,
    recipientAccount: 'Alpha Academy Bursar',
    paymentRail: 'MOBILE_MONEY',
    reference: `MOB-PAY-${Date.now()}`
  });
}
```

#### 4.2 Exeat Request Submission (`AlphaAcademyMobileApp.tsx`)
```typescript
if (!isOnline) {
  offlineSyncService.enqueueExeatRequest('PROD_EDU_PRIMARY', {
    studentId: selectedStudent.id,
    studentName: selectedStudent.fullName,
    requestType: 'MEDICAL_EXEAT',
    departureDateTime: departureDate,
    expectedReturnDateTime: returnDate
  });
}
```

---

### 5. Verification & Diagnostics

The Platform Owner and developers can inspect the live offline sync status via:
- `offlineSyncService.getQueueSummary()`: Returns counts grouped by state (`QUEUED`, `SYNCING`, `SYNCED`, `FAILED`).
- `offlineSyncService.getQueue()`: Returns full serialized payload list for audit inspection.
- Browser `localStorage` key: `JUMO_UEOS_OFFLINE_QUEUE_V1`.
