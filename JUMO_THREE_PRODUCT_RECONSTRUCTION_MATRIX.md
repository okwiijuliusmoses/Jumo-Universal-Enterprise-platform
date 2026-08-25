# JUMO THREE-PRODUCT RECONSTRUCTION MATRIX
## Exhaustive Architectural Map & Product Boundary Standard

### 1. The Three Approved Products

| Product ID | Product Name | Primary Responsibilities | Dedicated Web Shell | Dedicated Mobile App |
| :--- | :--- | :--- | :--- | :--- |
| `JUMO-FINTECH` | **JUMO FINTECH** | General Ledger (FAAP), Payment Switching, Mobile Money, Lending, Wallets, Agent Banking, FX, Microfinance, SACCO, Treasury | `FintechShell.tsx` | `FaapMobileApp.tsx` |
| `JUMO-EDU-UNIVERSAL` | **JUMO Universal Education ERP** | Council Governance, Student Admissions, Registrar SIS, Senate Approvals, Bursary Accounts, Clinic, Library, Hostels | `EducationErpWebShell.tsx` | `EducationErpMobileApp.tsx` |
| `JUMO-ALUMNI` | **JUMO Alumni Association ERP** | Graduate Census, Global Chapters, Endowments & Capital Giving, Career Mentorship, Alumni Events | `AlumniErpWebShell.tsx` | `AlumniErpMobileApp.tsx` |

---

### 2. Family Consolidation inside JUMO FINTECH
The following previously separate financial systems are now independent installable family modules inside `JUMO FINTECH`:

| Previous Conceptual Product | Consolidated Family Module in JUMO FINTECH | Primary Workspace |
| :--- | :--- | :--- |
| Financial Accounting & Administration (FAAP) | `FAM_LEDGER` (General Ledger & Double-Entry Core) | `FaapControllerWorkspace.tsx` |
| JUMO Digital Pay | `FAM_PAY_SWITCH` (Universal Payment Switching) | `UniversalFintechFamilyWorkspace.tsx` |
| Agent Banking | `FAM_AGENT_BANKING` (Agent Network & Float) | `AgentNetworkWorkspace.tsx` |
| Microfinance Platform | `FAM_MICROFINANCE` (Joint Liability Group Lending) | `MicrofinanceWorkspace.tsx` |
| Digital Wallets | `FAM_DIGITAL_WALLETS` (Stored Value & Balances) | `DigitalWalletWorkspace.tsx` |
| Foreign Exchange Desk | `FAM_FX` (FX Dealing Desk & Rates) | `FxWorkspace.tsx` |
| Merchant POS & QR | `FAM_MERCHANT_SERVICES` (Merchant Settlement & QR) | `MerchantServicesWorkspace.tsx` |
| SACCO Platform | `FAM_SACCO` (SACCO Shares & Multipliers) | `UniversalFintechFamilyWorkspace.tsx` |
| Lending Platform | `FAM_LENDING` (Credit Underwriting & LOS) | `UniversalFintechFamilyWorkspace.tsx` |
| Corporate Treasury | `FAM_TREASURY` (Liquidity Forecasting & Sweeps) | `UniversalFintechFamilyWorkspace.tsx` |

---

### 3. Cross-Product Interoperability Standard
All products communicate through standard REST/gRPC interfaces and share the underlying micro-kernel:
- **Zero-Trust Identity**: Single unified session and RBAC credentials across all 3 products.
- **Financial Clearing**: Education and Alumni products generate invoices and payment reference numbers that clear automatically through JUMO FINTECH.
- **Cognitive AI**: Specialized Gemini 2.5 agents serve each product domain without vendor lock-in.
