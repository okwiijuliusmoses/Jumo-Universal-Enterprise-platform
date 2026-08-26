# Financial ERP: Workflows, Forms & API Specifications

## 1. High-Fidelity Forms Definition

### A. General Journal Entry Form
*   **Purpose:** Registers double-entry adjustment logs to general books.
*   **Form Fields:**
    *   `memo` (String, Required): Purpose of the journal entry.
    *   `postingDate` (Date, Required): Designated fiscal posting date.
    *   `journalLines` (Array, Required): Minimum of two journal line entries.
        *   `accountCode` (String, Required): Target ledger account from COA.
        *   `debit` (Number, Required): Debit allocation. Must be 0 if credit is set.
        *   `credit` (Number, Required): Credit allocation. Must be 0 if debit is set.
        *   `department` (String, Optional): Operational dimension tag.
*   **Validation Rules:** Sum of debits must equal sum of credits. Unbalanced journals throw a blocking error.

### B. Customer Invoicing Form
*   **Purpose:** Bill customers or students for active services.
*   **Form Fields:**
    *   `customerName` (String, Required): Legal customer name.
    *   `invoiceNumber` (String, Required): Unique invoice serial.
    *   `issueDate` (Date, Required): Invoicing date.
    *   `lineItems` (Array, Required): Invoiced products / items.
        *   `description` (String, Required): Service description text.
        *   `quantity` (Number, Required): Unit quantity.
        *   `unitPrice` (Number, Required): Individual unit cost in UGX.
*   **Data Written:** Creates outstanding invoice, increments accounts receivable ledger, and notifies customer.

---

## 2. API Specifications (JSON Mappings)

### A. Post General Journal POST Route
*   **Endpoint:** `/api/ueos/faap/journals`
*   **Request Payload:**
```json
{
  "memo": "Reclassified lab materials expenditure",
  "postingDate": "2026-08-19",
  "lines": [
    { "accountCode": "50020_EXPENSE", "debit": 1500000, "credit": 0 },
    { "accountCode": "10010_CASH", "debit": 0, "credit": 1500000 }
  ]
}
```
*   **Response (201 Created):**
```json
{
  "success": true,
  "journalRef": "JNL_98310X",
  "status": "POSTED",
  "postedTimestamp": "2026-08-19T13:03:00Z"
}
```

### B. Get Trial Balance GET Route
*   **Endpoint:** `/api/ueos/faap/trialbalance`
*   **Response (200 OK):**
```json
{
  "success": true,
  "asOfDate": "2026-08-19",
  "totalDebits": 450000000,
  "totalCredits": 450000000,
  "isBalanced": true
}
```
