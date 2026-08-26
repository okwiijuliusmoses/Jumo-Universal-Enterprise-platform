# Digital Pay: Workflows, Forms & API Specifications

## 1. High-Fidelity Forms Definition

### A. Merchant Onboarding & Compliance (KYC) Form
*   **Purpose:** Verifies legal organizations before unlocking payouts.
*   **Form Fields:**
    *   `legalBusinessName` (String, Required): Registered trade name.
    *   `taxRegistrationNumber` (String, Required): Distinct tax ID (e.g. URA TIN).
    *   `incorporationCountry` (Select, Required): Legal country base.
    *   `merchantCategoryCode` (Select, Required): MCC classification.
    *   `signatoryPassport` (File, Required): Director photo verification ID.
    *   `companyWebsite` (String, Optional): Verification reference URL.
*   **Validation Rules:** Checks if the TIN matches localized formats. Unverified forms restrict transaction disbursements.

### B. PRN Reference Generator Form
*   **Purpose:** Registers valid lookup codes inside the clearing switch database.
*   **Form Fields:**
    *   `referenceCode` (String, Required): Customized PRN code (e.g. REF-102-X).
    *   `payerFullName` (String, Required): Legal payer name.
    *   `payerId` (String, Required): National ID / student registration code.
    *   `billingAmount` (Number, Required): Total value in UGX.
    *   `institutionSelection` (Select, Required): Merchant profile target.

---

## 2. API Specifications (JSON Mappings)

### A. Authorize PRN Payment POST Route
*   **Endpoint:** `/api/ueos/digitalpay/charge`
*   **Request Payload:**
```json
{
  "reference": "REF-11022-Y",
  "amount": 1200000,
  "channel": "MOBILE_MONEY",
  "paymentDate": "2026-08-19"
}
```
*   **Response (200 OK):**
```json
{
  "success": true,
  "transactionRef": "TXN_774921X",
  "status": "SUCCESS",
  "commissionAllocated": 18000,
  "netSettlementAmount": 1182000
}
```

### B. Trigger Daily Settlement POST Route
*   **Endpoint:** `/api/ueos/digitalpay/settlement/close`
*   **Request Payload:**
```json
{
  "merchantCode": "ALPHA"
}
```
*   **Response (201 Created):**
```json
{
  "success": true,
  "batchRef": "BAT-2026-08-19-ALPHA",
  "totalGross": 2400000,
  "netDisbursed": 2364000,
  "commissionRetained": 36000
}
```
