# Education ERP: Workflows, Forms & API Specifications

## 1. High-Fidelity Forms Definition

### A. Sovereign Admissions Intake Form
*   **Purpose:** Enrolls and registers students while automatically triggering financial billing.
*   **Form Fields:**
    *   `fullName` (String, Required): Student's complete legal name.
    *   `regNumber` (String, Required): Distinct academic matriculation code.
    *   `programmeId` (Select, Required): Academic degree / certificate selection.
    *   `campusLocation` (Select, Required): Designated campus hub.
    *   `semester` (Select, Required): Initial enrollment term.
    *   `parentEmail` (String, Optional): Linkage parameter for K-12 parent portals.
*   **Data Written:** Appends to student profile registry, logs JRM registration interaction, and inserts flat UGX 1.2M invoice to FAAP ledger.

### B. Vote Book Requisition Form
*   **Purpose:** Commits cash expenditures against departmental allocations with strict overdraft validation blocks.
*   **Form Fields:**
    *   `voteCode` (Select, Required): Departmental vote code.
    *   `memo` (String, Required): Specific requisition justification text.
    *   `amount` (Number, Required): Total cost in UGX.
*   **Validation Rules:** Checks if requested amount is greater than the available budget head balance. If yes, stops progression and outputs a warning.

---

## 2. API Specifications (JSON Mappings)

### A. Admissions POST Route
*   **Endpoint:** `/api/ueos/education/students`
*   **Request Payload:**
```json
{
  "regNumber": "REG/2026/012",
  "fullName": "Elizabeth Kizza",
  "programmeId": "BSc Computer Science",
  "campus": "Platform Hub 01",
  "currentSemester": "SEM_1"
}
```
*   **Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "id": "std_a90x81b",
    "regNumber": "REG/2026/012",
    "fullName": "Elizabeth Kizza",
    "programmeId": "BSc Computer Science",
    "campus": "Platform Hub 01",
    "currentSemester": "SEM_1",
    "academicStatus": "NORMAL_PROGRESS"
  }
}
```

### B. Vote Book Expenditure POST Route
*   **Endpoint:** `/api/ueos/education/votebook/commit`
*   **Request Payload:**
```json
{
  "voteCode": "V-RES-01",
  "amount": 4500000,
  "memo": "Purchased lab test-tubes and equipment"
}
```
*   **Response (200 OK):**
```json
{
  "success": true,
  "balanceRemaining": 33500000
}
```
