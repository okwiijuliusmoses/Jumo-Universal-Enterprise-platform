/**
 * JUMO UEOS — ARCHITECTURE EVIDENCE REGISTRY
 *
 * Comprehensive evidence ledger indexing all discovered products, directorates,
 * departments, offices, portals, modules, capabilities, UI metadata, and runtime components.
 */

export type ArchitectureElementType =
  | "PRODUCT"
  | "DIRECTORATE"
  | "DEPARTMENT"
  | "OFFICE"
  | "PORTAL"
  | "MODULE"
  | "CAPABILITY"
  | "UI_METADATA"
  | "RUNTIME_COMPONENT"
  | "SERVICE"
  | "WORKFLOW"
  | "AGENT"
  | "REPORT"
  | "DASHBOARD";

export type VerificationStatus =
  | "DISCOVERED"
  | "VERIFIED"
  | "RECONCILED"
  | "PARTIAL"
  | "UNRESOLVED";

export interface ArchitectureEvidenceEntry {
  productId: string;
  sourceFile: string;
  sourceType: string;
  elementType: ArchitectureElementType;
  elementId: string;
  parentId?: string;
  status: VerificationStatus;
  evidence: string;
}

export const JUMO_ARCHITECTURE_EVIDENCE: readonly ArchitectureEvidenceEntry[] = Object.freeze(
  [
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/recovery/manifests/JUMO-FINTECH.manifest.ts",
    "sourceType": "TYPESCRIPT_MANIFEST",
    "elementType": "PRODUCT",
    "elementId": "JUMO-FINTECH",
    "parentId": "JUMO_PLATFORM_KERNEL",
    "status": "VERIFIED",
    "evidence": "Authoritative sovereign product manifest for FINTECH ERP"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/recovery/manifests/JUMO-FINTECH.manifest.ts",
    "sourceType": "TYPESCRIPT_MANIFEST",
    "elementType": "DIRECTORATE",
    "elementId": "DIR_FIN_EXECUTIVE",
    "parentId": "JUMO-FINTECH",
    "status": "VERIFIED",
    "evidence": "Directorate: Financial Executive & Strategy Directorate"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/recovery/manifests/JUMO-FINTECH.manifest.ts",
    "sourceType": "TYPESCRIPT_MANIFEST",
    "elementType": "DIRECTORATE",
    "elementId": "DIR_FIN_TREASURY",
    "parentId": "JUMO-FINTECH",
    "status": "VERIFIED",
    "evidence": "Directorate: Treasury, Accounting & FAAP Directorate"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/recovery/manifests/JUMO-FINTECH.manifest.ts",
    "sourceType": "TYPESCRIPT_MANIFEST",
    "elementType": "DIRECTORATE",
    "elementId": "DIR_FIN_RISK",
    "parentId": "JUMO-FINTECH",
    "status": "VERIFIED",
    "evidence": "Directorate: Risk, Compliance & Tax Directorate"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/recovery/manifests/JUMO-FINTECH.manifest.ts",
    "sourceType": "TYPESCRIPT_MANIFEST",
    "elementType": "DIRECTORATE",
    "elementId": "DIR_FIN_OPERATIONS",
    "parentId": "JUMO-FINTECH",
    "status": "VERIFIED",
    "evidence": "Directorate: Retail Banking, Payments & Switch Directorate"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/recovery/manifests/JUMO-FINTECH.manifest.ts",
    "sourceType": "TYPESCRIPT_MANIFEST",
    "elementType": "DIRECTORATE",
    "elementId": "DIR_FIN_INVESTMENT",
    "parentId": "JUMO-FINTECH",
    "status": "VERIFIED",
    "evidence": "Directorate: Capital Markets & Investment Directorate"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/recovery/manifests/JUMO-FINTECH.manifest.ts",
    "sourceType": "TYPESCRIPT_MANIFEST",
    "elementType": "DIRECTORATE",
    "elementId": "DIR_FIN_TECHNOLOGY",
    "parentId": "JUMO-FINTECH",
    "status": "VERIFIED",
    "evidence": "Directorate: Fintech Platform Engineering Directorate"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/recovery/manifests/JUMO-FINTECH.manifest.ts",
    "sourceType": "TYPESCRIPT_MANIFEST",
    "elementType": "DEPARTMENT",
    "elementId": "DEP_FIN_EXECUTIVE",
    "parentId": "DIR_FIN_EXECUTIVE",
    "status": "VERIFIED",
    "evidence": "Department: Office of the Chief Financial Officer"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/recovery/manifests/JUMO-FINTECH.manifest.ts",
    "sourceType": "TYPESCRIPT_MANIFEST",
    "elementType": "DEPARTMENT",
    "elementId": "DEP_FIN_ACCOUNTING",
    "parentId": "DIR_FIN_TREASURY",
    "status": "VERIFIED",
    "evidence": "Department: Financial Accounting & General Ledger (FAAP)"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/recovery/manifests/JUMO-FINTECH.manifest.ts",
    "sourceType": "TYPESCRIPT_MANIFEST",
    "elementType": "DEPARTMENT",
    "elementId": "DEP_FIN_TREASURY_MGMT",
    "parentId": "DIR_FIN_TREASURY",
    "status": "VERIFIED",
    "evidence": "Department: Corporate Treasury & FX Management"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/recovery/manifests/JUMO-FINTECH.manifest.ts",
    "sourceType": "TYPESCRIPT_MANIFEST",
    "elementType": "DEPARTMENT",
    "elementId": "DEP_FIN_COMPLIANCE",
    "parentId": "DIR_FIN_RISK",
    "status": "VERIFIED",
    "evidence": "Department: Anti-Money Laundering & Regulatory Compliance"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/recovery/manifests/JUMO-FINTECH.manifest.ts",
    "sourceType": "TYPESCRIPT_MANIFEST",
    "elementType": "DEPARTMENT",
    "elementId": "DEP_FIN_CREDIT",
    "parentId": "DIR_FIN_RISK",
    "status": "VERIFIED",
    "evidence": "Department: Credit, Underwriting & Agricultural Finance"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/recovery/manifests/JUMO-FINTECH.manifest.ts",
    "sourceType": "TYPESCRIPT_MANIFEST",
    "elementType": "DEPARTMENT",
    "elementId": "DEP_FIN_INSURANCE",
    "parentId": "DIR_FIN_RISK",
    "status": "VERIFIED",
    "evidence": "Department: Insurtech & Actuarial Management"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/recovery/manifests/JUMO-FINTECH.manifest.ts",
    "sourceType": "TYPESCRIPT_MANIFEST",
    "elementType": "DEPARTMENT",
    "elementId": "DEP_FIN_PAYMENTS",
    "parentId": "DIR_FIN_OPERATIONS",
    "status": "VERIFIED",
    "evidence": "Department: Payment Gateway, Switch & Disbursals"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/recovery/manifests/JUMO-FINTECH.manifest.ts",
    "sourceType": "TYPESCRIPT_MANIFEST",
    "elementType": "DEPARTMENT",
    "elementId": "DEP_FIN_RETAIL",
    "parentId": "DIR_FIN_OPERATIONS",
    "status": "VERIFIED",
    "evidence": "Department: Agency Banking, Cards, ATM & Merchant Acquiring"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/recovery/manifests/JUMO-FINTECH.manifest.ts",
    "sourceType": "TYPESCRIPT_MANIFEST",
    "elementType": "DEPARTMENT",
    "elementId": "DEP_FIN_COOPERATIVES",
    "parentId": "DIR_FIN_OPERATIONS",
    "status": "VERIFIED",
    "evidence": "Department: SACCO & Microfinance Operations"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/recovery/manifests/JUMO-FINTECH.manifest.ts",
    "sourceType": "TYPESCRIPT_MANIFEST",
    "elementType": "DEPARTMENT",
    "elementId": "DEP_FIN_DIGITAL",
    "parentId": "DIR_FIN_OPERATIONS",
    "status": "VERIFIED",
    "evidence": "Department: Digital Wallets & Neo-Banking Core"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/recovery/manifests/JUMO-FINTECH.manifest.ts",
    "sourceType": "TYPESCRIPT_MANIFEST",
    "elementType": "DEPARTMENT",
    "elementId": "DEP_FIN_CROSS_BORDER",
    "parentId": "DIR_FIN_TREASURY",
    "status": "VERIFIED",
    "evidence": "Department: Cross-Border Settlement & Trade Finance"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/recovery/manifests/JUMO-FINTECH.manifest.ts",
    "sourceType": "TYPESCRIPT_MANIFEST",
    "elementType": "DEPARTMENT",
    "elementId": "DEP_FIN_INVESTMENT",
    "parentId": "DIR_FIN_INVESTMENT",
    "status": "VERIFIED",
    "evidence": "Department: Securities Custody, Asset Management & Brokerage"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/recovery/manifests/JUMO-FINTECH.manifest.ts",
    "sourceType": "TYPESCRIPT_MANIFEST",
    "elementType": "DEPARTMENT",
    "elementId": "DEP_FIN_WEALTH",
    "parentId": "DIR_FIN_INVESTMENT",
    "status": "VERIFIED",
    "evidence": "Department: Wealth Management & Fixed Term Deposits"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/recovery/manifests/JUMO-FINTECH.manifest.ts",
    "sourceType": "TYPESCRIPT_MANIFEST",
    "elementType": "DEPARTMENT",
    "elementId": "DEP_FIN_INTELLIGENCE",
    "parentId": "DIR_FIN_TECHNOLOGY",
    "status": "VERIFIED",
    "evidence": "Department: Financial Data Intelligence & Telemetry"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/recovery/manifests/JUMO-FINTECH.manifest.ts",
    "sourceType": "TYPESCRIPT_MANIFEST",
    "elementType": "DEPARTMENT",
    "elementId": "DEP_FIN_TECHNOLOGY",
    "parentId": "DIR_FIN_TECHNOLOGY",
    "status": "VERIFIED",
    "evidence": "Department: Developer API Gateway & Integrations"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/recovery/manifests/JUMO-FINTECH.manifest.ts",
    "sourceType": "TYPESCRIPT_MANIFEST",
    "elementType": "OFFICE",
    "elementId": "OFF_FIN_CFO",
    "parentId": "DEP_FIN_EXECUTIVE",
    "status": "VERIFIED",
    "evidence": "Office: CFO Office Office"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/recovery/manifests/JUMO-FINTECH.manifest.ts",
    "sourceType": "TYPESCRIPT_MANIFEST",
    "elementType": "OFFICE",
    "elementId": "OFF_FIN_CONTROLLER",
    "parentId": "DEP_FIN_ACCOUNTING",
    "status": "VERIFIED",
    "evidence": "Office: FAAP General Ledger Office"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/recovery/manifests/JUMO-FINTECH.manifest.ts",
    "sourceType": "TYPESCRIPT_MANIFEST",
    "elementType": "OFFICE",
    "elementId": "OFF_FIN_TAX",
    "parentId": "DEP_FIN_COMPLIANCE",
    "status": "VERIFIED",
    "evidence": "Office: Tax & Revenue Management Office"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/recovery/manifests/JUMO-FINTECH.manifest.ts",
    "sourceType": "TYPESCRIPT_MANIFEST",
    "elementType": "OFFICE",
    "elementId": "OFF_FIN_AML",
    "parentId": "DEP_FIN_COMPLIANCE",
    "status": "VERIFIED",
    "evidence": "Office: Financial Compliance (AML) Office"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/recovery/manifests/JUMO-FINTECH.manifest.ts",
    "sourceType": "TYPESCRIPT_MANIFEST",
    "elementType": "OFFICE",
    "elementId": "OFF_FIN_ANALYTICS",
    "parentId": "DEP_FIN_INTELLIGENCE",
    "status": "VERIFIED",
    "evidence": "Office: Financial Data Intelligence Office"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/recovery/manifests/JUMO-FINTECH.manifest.ts",
    "sourceType": "TYPESCRIPT_MANIFEST",
    "elementType": "OFFICE",
    "elementId": "OFF_FIN_PAYROLL",
    "parentId": "DEP_FIN_ACCOUNTING",
    "status": "VERIFIED",
    "evidence": "Office: Payroll & Salary Payments Office"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/recovery/manifests/JUMO-FINTECH.manifest.ts",
    "sourceType": "TYPESCRIPT_MANIFEST",
    "elementType": "OFFICE",
    "elementId": "OFF_FIN_SWITCH",
    "parentId": "DEP_FIN_PAYMENTS",
    "status": "VERIFIED",
    "evidence": "Office: Universal Payment Switch Office"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/recovery/manifests/JUMO-FINTECH.manifest.ts",
    "sourceType": "TYPESCRIPT_MANIFEST",
    "elementType": "OFFICE",
    "elementId": "OFF_FIN_MOMO",
    "parentId": "DEP_FIN_PAYMENTS",
    "status": "VERIFIED",
    "evidence": "Office: Mobile Money Core (USSD) Office"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/recovery/manifests/JUMO-FINTECH.manifest.ts",
    "sourceType": "TYPESCRIPT_MANIFEST",
    "elementType": "OFFICE",
    "elementId": "OFF_FIN_GATEWAY",
    "parentId": "DEP_FIN_PAYMENTS",
    "status": "VERIFIED",
    "evidence": "Office: Payment Gateway Checkout Office"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/recovery/manifests/JUMO-FINTECH.manifest.ts",
    "sourceType": "TYPESCRIPT_MANIFEST",
    "elementType": "OFFICE",
    "elementId": "OFF_FIN_COLLECTIONS",
    "parentId": "DEP_FIN_PAYMENTS",
    "status": "VERIFIED",
    "evidence": "Office: Institutional Collections Office"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/recovery/manifests/JUMO-FINTECH.manifest.ts",
    "sourceType": "TYPESCRIPT_MANIFEST",
    "elementType": "OFFICE",
    "elementId": "OFF_FIN_PAYOUTS",
    "parentId": "DEP_FIN_PAYMENTS",
    "status": "VERIFIED",
    "evidence": "Office: Bulk Payouts & Disbursal Office"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/recovery/manifests/JUMO-FINTECH.manifest.ts",
    "sourceType": "TYPESCRIPT_MANIFEST",
    "elementType": "OFFICE",
    "elementId": "OFF_FIN_REMIT",
    "parentId": "DEP_FIN_CROSS_BORDER",
    "status": "VERIFIED",
    "evidence": "Office: Cross-Border Remittances Office"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/recovery/manifests/JUMO-FINTECH.manifest.ts",
    "sourceType": "TYPESCRIPT_MANIFEST",
    "elementType": "OFFICE",
    "elementId": "OFF_FIN_AGENT",
    "parentId": "DEP_FIN_RETAIL",
    "status": "VERIFIED",
    "evidence": "Office: Agency Banking Network Office"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/recovery/manifests/JUMO-FINTECH.manifest.ts",
    "sourceType": "TYPESCRIPT_MANIFEST",
    "elementType": "OFFICE",
    "elementId": "OFF_FIN_MERCHANT",
    "parentId": "DEP_FIN_RETAIL",
    "status": "VERIFIED",
    "evidence": "Office: Merchant Acquiring & POS Office"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/recovery/manifests/JUMO-FINTECH.manifest.ts",
    "sourceType": "TYPESCRIPT_MANIFEST",
    "elementType": "OFFICE",
    "elementId": "OFF_FIN_CARDS",
    "parentId": "DEP_FIN_RETAIL",
    "status": "VERIFIED",
    "evidence": "Office: Card Issuing & Management Office"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/recovery/manifests/JUMO-FINTECH.manifest.ts",
    "sourceType": "TYPESCRIPT_MANIFEST",
    "elementType": "OFFICE",
    "elementId": "OFF_FIN_ATM",
    "parentId": "DEP_FIN_RETAIL",
    "status": "VERIFIED",
    "evidence": "Office: ATM & Self-Service Kiosks Office"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/recovery/manifests/JUMO-FINTECH.manifest.ts",
    "sourceType": "TYPESCRIPT_MANIFEST",
    "elementType": "OFFICE",
    "elementId": "OFF_FIN_WALLETS",
    "parentId": "DEP_FIN_DIGITAL",
    "status": "VERIFIED",
    "evidence": "Office: Digital Wallets System Office"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/recovery/manifests/JUMO-FINTECH.manifest.ts",
    "sourceType": "TYPESCRIPT_MANIFEST",
    "elementType": "OFFICE",
    "elementId": "OFF_FIN_DIGIBANK",
    "parentId": "DEP_FIN_DIGITAL",
    "status": "VERIFIED",
    "evidence": "Office: Digital Banking Core Office"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/recovery/manifests/JUMO-FINTECH.manifest.ts",
    "sourceType": "TYPESCRIPT_MANIFEST",
    "elementType": "OFFICE",
    "elementId": "OFF_FIN_EMBEDDED",
    "parentId": "DEP_FIN_DIGITAL",
    "status": "VERIFIED",
    "evidence": "Office: Embedded Finance (BaaS) Office"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/recovery/manifests/JUMO-FINTECH.manifest.ts",
    "sourceType": "TYPESCRIPT_MANIFEST",
    "elementType": "OFFICE",
    "elementId": "OFF_FIN_SACCO",
    "parentId": "DEP_FIN_COOPERATIVES",
    "status": "VERIFIED",
    "evidence": "Office: SACCO Core Banking Office"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/recovery/manifests/JUMO-FINTECH.manifest.ts",
    "sourceType": "TYPESCRIPT_MANIFEST",
    "elementType": "OFFICE",
    "elementId": "OFF_FIN_MICRO",
    "parentId": "DEP_FIN_COOPERATIVES",
    "status": "VERIFIED",
    "evidence": "Office: Microfinance Operations Office"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/recovery/manifests/JUMO-FINTECH.manifest.ts",
    "sourceType": "TYPESCRIPT_MANIFEST",
    "elementType": "OFFICE",
    "elementId": "OFF_FIN_SAVINGS",
    "parentId": "DEP_FIN_WEALTH",
    "status": "VERIFIED",
    "evidence": "Office: Savings & Fixed Deposits Office"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/recovery/manifests/JUMO-FINTECH.manifest.ts",
    "sourceType": "TYPESCRIPT_MANIFEST",
    "elementType": "OFFICE",
    "elementId": "OFF_FIN_LENDING",
    "parentId": "DEP_FIN_CREDIT",
    "status": "VERIFIED",
    "evidence": "Office: Credit & Lending Platform Office"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/recovery/manifests/JUMO-FINTECH.manifest.ts",
    "sourceType": "TYPESCRIPT_MANIFEST",
    "elementType": "OFFICE",
    "elementId": "OFF_FIN_AGRI",
    "parentId": "DEP_FIN_CREDIT",
    "status": "VERIFIED",
    "evidence": "Office: Agricultural Finance Office"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/recovery/manifests/JUMO-FINTECH.manifest.ts",
    "sourceType": "TYPESCRIPT_MANIFEST",
    "elementType": "OFFICE",
    "elementId": "OFF_FIN_TRADE",
    "parentId": "DEP_FIN_CROSS_BORDER",
    "status": "VERIFIED",
    "evidence": "Office: Trade Finance & Escrow Office"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/recovery/manifests/JUMO-FINTECH.manifest.ts",
    "sourceType": "TYPESCRIPT_MANIFEST",
    "elementType": "OFFICE",
    "elementId": "OFF_FIN_TREASURY",
    "parentId": "DEP_FIN_TREASURY_MGMT",
    "status": "VERIFIED",
    "evidence": "Office: Corporate Treasury & Liquidity Office"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/recovery/manifests/JUMO-FINTECH.manifest.ts",
    "sourceType": "TYPESCRIPT_MANIFEST",
    "elementType": "OFFICE",
    "elementId": "OFF_FIN_FX",
    "parentId": "DEP_FIN_TREASURY_MGMT",
    "status": "VERIFIED",
    "evidence": "Office: FX & Foreign Exchange Desk Office"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/recovery/manifests/JUMO-FINTECH.manifest.ts",
    "sourceType": "TYPESCRIPT_MANIFEST",
    "elementType": "OFFICE",
    "elementId": "OFF_FIN_CAPMARKETS",
    "parentId": "DEP_FIN_INVESTMENT",
    "status": "VERIFIED",
    "evidence": "Office: Capital Markets & Brokerage Office"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/recovery/manifests/JUMO-FINTECH.manifest.ts",
    "sourceType": "TYPESCRIPT_MANIFEST",
    "elementType": "OFFICE",
    "elementId": "OFF_FIN_INVEST",
    "parentId": "DEP_FIN_INVESTMENT",
    "status": "VERIFIED",
    "evidence": "Office: Wealth & Investment Funds Office"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/recovery/manifests/JUMO-FINTECH.manifest.ts",
    "sourceType": "TYPESCRIPT_MANIFEST",
    "elementType": "OFFICE",
    "elementId": "OFF_FIN_CUSTODY",
    "parentId": "DEP_FIN_INVESTMENT",
    "status": "VERIFIED",
    "evidence": "Office: Securities Custody & Depository Office"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/recovery/manifests/JUMO-FINTECH.manifest.ts",
    "sourceType": "TYPESCRIPT_MANIFEST",
    "elementType": "OFFICE",
    "elementId": "OFF_FIN_INSURE",
    "parentId": "DEP_FIN_INSURANCE",
    "status": "VERIFIED",
    "evidence": "Office: Insurtech & Micro-Insurance Office"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/recovery/manifests/JUMO-FINTECH.manifest.ts",
    "sourceType": "TYPESCRIPT_MANIFEST",
    "elementType": "OFFICE",
    "elementId": "OFF_FIN_STABLECOIN",
    "parentId": "DEP_FIN_DIGITAL",
    "status": "VERIFIED",
    "evidence": "Office: Stablecoin & Digital Asset Rails Office"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/recovery/manifests/JUMO-FINTECH.manifest.ts",
    "sourceType": "TYPESCRIPT_MANIFEST",
    "elementType": "OFFICE",
    "elementId": "OFF_FIN_GLOBALACC",
    "parentId": "DEP_FIN_CROSS_BORDER",
    "status": "VERIFIED",
    "evidence": "Office: Multi-Currency Global Accounts Office"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/recovery/manifests/JUMO-FINTECH.manifest.ts",
    "sourceType": "TYPESCRIPT_MANIFEST",
    "elementType": "OFFICE",
    "elementId": "OFF_FIN_MULTICURR",
    "parentId": "DEP_FIN_CROSS_BORDER",
    "status": "VERIFIED",
    "evidence": "Office: Multi-Currency Clearing Office"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/recovery/manifests/JUMO-FINTECH.manifest.ts",
    "sourceType": "TYPESCRIPT_MANIFEST",
    "elementType": "OFFICE",
    "elementId": "OFF_FIN_DEV_API",
    "parentId": "DEP_FIN_TECHNOLOGY",
    "status": "VERIFIED",
    "evidence": "Office: Developer API Gateway Office"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/recovery/manifests/JUMO-FINTECH.manifest.ts",
    "sourceType": "TYPESCRIPT_MANIFEST",
    "elementType": "OFFICE",
    "elementId": "OFF_FIN_BANK_PAY",
    "parentId": "DEP_FIN_PAYMENTS",
    "status": "VERIFIED",
    "evidence": "Office: Commercial Bank Payments Office"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/recovery/manifests/JUMO-FINTECH.manifest.ts",
    "sourceType": "TYPESCRIPT_MANIFEST",
    "elementType": "OFFICE",
    "elementId": "OFF_FIN_BILL_PAY",
    "parentId": "DEP_FIN_PAYMENTS",
    "status": "VERIFIED",
    "evidence": "Office: Utility Bill Aggregator Office"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/recovery/manifests/JUMO-FINTECH.manifest.ts",
    "sourceType": "TYPESCRIPT_MANIFEST",
    "elementType": "OFFICE",
    "elementId": "OFF_FIN_MERCH_SERV",
    "parentId": "DEP_FIN_RETAIL",
    "status": "VERIFIED",
    "evidence": "Office: Merchant Solutions Hub Office"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/products/ModulePortalRegistry.ts",
    "sourceType": "TYPESCRIPT_REGISTRY",
    "elementType": "PORTAL",
    "elementId": "PORTAL_FIN_CFO",
    "parentId": "OFF_FIN_CFO",
    "status": "VERIFIED",
    "evidence": "Portal: CFO Office (/fintech/cfo)"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/products/ModulePortalRegistry.ts",
    "sourceType": "TYPESCRIPT_REGISTRY",
    "elementType": "PORTAL",
    "elementId": "PORTAL_FIN_LEDGER",
    "parentId": "OFF_FIN_CONTROLLER",
    "status": "VERIFIED",
    "evidence": "Portal: FAAP General Ledger (/fintech/gl)"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/products/ModulePortalRegistry.ts",
    "sourceType": "TYPESCRIPT_REGISTRY",
    "elementType": "PORTAL",
    "elementId": "PORTAL_FIN_TAX",
    "parentId": "OFF_FIN_TAX",
    "status": "VERIFIED",
    "evidence": "Portal: Tax & Revenue Management (/fintech/tax)"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/products/ModulePortalRegistry.ts",
    "sourceType": "TYPESCRIPT_REGISTRY",
    "elementType": "PORTAL",
    "elementId": "PORTAL_FIN_COMPLIANCE",
    "parentId": "OFF_FIN_AML",
    "status": "VERIFIED",
    "evidence": "Portal: Financial Compliance (AML) (/fintech/compliance)"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/products/ModulePortalRegistry.ts",
    "sourceType": "TYPESCRIPT_REGISTRY",
    "elementType": "PORTAL",
    "elementId": "PORTAL_FIN_DATA_INT",
    "parentId": "OFF_FIN_ANALYTICS",
    "status": "VERIFIED",
    "evidence": "Portal: Financial Data Intelligence (/fintech/data-int)"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/products/ModulePortalRegistry.ts",
    "sourceType": "TYPESCRIPT_REGISTRY",
    "elementType": "PORTAL",
    "elementId": "PORTAL_FIN_PAYROLL",
    "parentId": "OFF_FIN_PAYROLL",
    "status": "VERIFIED",
    "evidence": "Portal: Payroll & Salary Payments (/fintech/payroll)"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/products/ModulePortalRegistry.ts",
    "sourceType": "TYPESCRIPT_REGISTRY",
    "elementType": "PORTAL",
    "elementId": "PORTAL_FIN_SWITCH",
    "parentId": "OFF_FIN_SWITCH",
    "status": "VERIFIED",
    "evidence": "Portal: Universal Payment Switch (/fintech/switch)"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/products/ModulePortalRegistry.ts",
    "sourceType": "TYPESCRIPT_REGISTRY",
    "elementType": "PORTAL",
    "elementId": "PORTAL_FIN_MOMO",
    "parentId": "OFF_FIN_MOMO",
    "status": "VERIFIED",
    "evidence": "Portal: Mobile Money Core (USSD) (/fintech/momo)"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/products/ModulePortalRegistry.ts",
    "sourceType": "TYPESCRIPT_REGISTRY",
    "elementType": "PORTAL",
    "elementId": "PORTAL_FIN_GATEWAY",
    "parentId": "OFF_FIN_GATEWAY",
    "status": "VERIFIED",
    "evidence": "Portal: Payment Gateway Checkout (/fintech/gateway)"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/products/ModulePortalRegistry.ts",
    "sourceType": "TYPESCRIPT_REGISTRY",
    "elementType": "PORTAL",
    "elementId": "PORTAL_FIN_COLLECTIONS",
    "parentId": "OFF_FIN_COLLECTIONS",
    "status": "VERIFIED",
    "evidence": "Portal: Institutional Collections (/fintech/collections)"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/products/ModulePortalRegistry.ts",
    "sourceType": "TYPESCRIPT_REGISTRY",
    "elementType": "PORTAL",
    "elementId": "PORTAL_FIN_PAYOUTS",
    "parentId": "OFF_FIN_PAYOUTS",
    "status": "VERIFIED",
    "evidence": "Portal: Bulk Payouts & Disbursal (/fintech/payouts)"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/products/ModulePortalRegistry.ts",
    "sourceType": "TYPESCRIPT_REGISTRY",
    "elementType": "PORTAL",
    "elementId": "PORTAL_FIN_REMIT",
    "parentId": "OFF_FIN_REMIT",
    "status": "VERIFIED",
    "evidence": "Portal: Cross-Border Remittances (/fintech/remit)"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/products/ModulePortalRegistry.ts",
    "sourceType": "TYPESCRIPT_REGISTRY",
    "elementType": "PORTAL",
    "elementId": "PORTAL_FIN_AGENT",
    "parentId": "OFF_FIN_AGENT",
    "status": "VERIFIED",
    "evidence": "Portal: Agency Banking Network (/fintech/agent-banking)"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/products/ModulePortalRegistry.ts",
    "sourceType": "TYPESCRIPT_REGISTRY",
    "elementType": "PORTAL",
    "elementId": "PORTAL_FIN_MERCHANT",
    "parentId": "OFF_FIN_MERCHANT",
    "status": "VERIFIED",
    "evidence": "Portal: Merchant Acquiring & POS (/fintech/merchant-acquiring)"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/products/ModulePortalRegistry.ts",
    "sourceType": "TYPESCRIPT_REGISTRY",
    "elementType": "PORTAL",
    "elementId": "PORTAL_FIN_CARDS",
    "parentId": "OFF_FIN_CARDS",
    "status": "VERIFIED",
    "evidence": "Portal: Card Issuing & Management (/fintech/cards)"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/products/ModulePortalRegistry.ts",
    "sourceType": "TYPESCRIPT_REGISTRY",
    "elementType": "PORTAL",
    "elementId": "PORTAL_FIN_ATM",
    "parentId": "OFF_FIN_ATM",
    "status": "VERIFIED",
    "evidence": "Portal: ATM & Self-Service Kiosks (/fintech/atm)"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/products/ModulePortalRegistry.ts",
    "sourceType": "TYPESCRIPT_REGISTRY",
    "elementType": "PORTAL",
    "elementId": "PORTAL_FIN_WALLETS",
    "parentId": "OFF_FIN_WALLETS",
    "status": "VERIFIED",
    "evidence": "Portal: Digital Wallets System (/fintech/wallets)"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/products/ModulePortalRegistry.ts",
    "sourceType": "TYPESCRIPT_REGISTRY",
    "elementType": "PORTAL",
    "elementId": "PORTAL_FIN_DIGIBANK",
    "parentId": "OFF_FIN_DIGIBANK",
    "status": "VERIFIED",
    "evidence": "Portal: Digital Banking Core (/fintech/digital-banking)"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/products/ModulePortalRegistry.ts",
    "sourceType": "TYPESCRIPT_REGISTRY",
    "elementType": "PORTAL",
    "elementId": "PORTAL_FIN_EMBEDDED",
    "parentId": "OFF_FIN_EMBEDDED",
    "status": "VERIFIED",
    "evidence": "Portal: Embedded Finance (BaaS) (/fintech/embedded)"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/products/ModulePortalRegistry.ts",
    "sourceType": "TYPESCRIPT_REGISTRY",
    "elementType": "PORTAL",
    "elementId": "PORTAL_FIN_SACCO",
    "parentId": "OFF_FIN_SACCO",
    "status": "VERIFIED",
    "evidence": "Portal: SACCO Core Banking (/fintech/sacco)"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/products/ModulePortalRegistry.ts",
    "sourceType": "TYPESCRIPT_REGISTRY",
    "elementType": "PORTAL",
    "elementId": "PORTAL_FIN_MICRO",
    "parentId": "OFF_FIN_MICRO",
    "status": "VERIFIED",
    "evidence": "Portal: Microfinance Operations (/fintech/microfinance)"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/products/ModulePortalRegistry.ts",
    "sourceType": "TYPESCRIPT_REGISTRY",
    "elementType": "PORTAL",
    "elementId": "PORTAL_FIN_SAVINGS",
    "parentId": "OFF_FIN_SAVINGS",
    "status": "VERIFIED",
    "evidence": "Portal: Savings & Fixed Deposits (/fintech/savings)"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/products/ModulePortalRegistry.ts",
    "sourceType": "TYPESCRIPT_REGISTRY",
    "elementType": "PORTAL",
    "elementId": "PORTAL_FIN_LENDING",
    "parentId": "OFF_FIN_LENDING",
    "status": "VERIFIED",
    "evidence": "Portal: Credit & Lending Platform (/fintech/lending)"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/products/ModulePortalRegistry.ts",
    "sourceType": "TYPESCRIPT_REGISTRY",
    "elementType": "PORTAL",
    "elementId": "PORTAL_FIN_AGRI",
    "parentId": "OFF_FIN_AGRI",
    "status": "VERIFIED",
    "evidence": "Portal: Agricultural Finance (/fintech/agri-finance)"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/products/ModulePortalRegistry.ts",
    "sourceType": "TYPESCRIPT_REGISTRY",
    "elementType": "PORTAL",
    "elementId": "PORTAL_FIN_TRADE",
    "parentId": "OFF_FIN_TRADE",
    "status": "VERIFIED",
    "evidence": "Portal: Trade Finance & Escrow (/fintech/trade-finance)"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/products/ModulePortalRegistry.ts",
    "sourceType": "TYPESCRIPT_REGISTRY",
    "elementType": "PORTAL",
    "elementId": "PORTAL_FIN_TREASURY",
    "parentId": "OFF_FIN_TREASURY",
    "status": "VERIFIED",
    "evidence": "Portal: Corporate Treasury & Liquidity (/fintech/treasury)"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/products/ModulePortalRegistry.ts",
    "sourceType": "TYPESCRIPT_REGISTRY",
    "elementType": "PORTAL",
    "elementId": "PORTAL_FIN_FX",
    "parentId": "OFF_FIN_FX",
    "status": "VERIFIED",
    "evidence": "Portal: FX & Foreign Exchange Desk (/fintech/fx)"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/products/ModulePortalRegistry.ts",
    "sourceType": "TYPESCRIPT_REGISTRY",
    "elementType": "PORTAL",
    "elementId": "PORTAL_FIN_CAPMARKETS",
    "parentId": "OFF_FIN_CAPMARKETS",
    "status": "VERIFIED",
    "evidence": "Portal: Capital Markets & Brokerage (/fintech/capital-markets)"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/products/ModulePortalRegistry.ts",
    "sourceType": "TYPESCRIPT_REGISTRY",
    "elementType": "PORTAL",
    "elementId": "PORTAL_FIN_INVEST",
    "parentId": "OFF_FIN_INVEST",
    "status": "VERIFIED",
    "evidence": "Portal: Wealth & Investment Funds (/fintech/investment)"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/products/ModulePortalRegistry.ts",
    "sourceType": "TYPESCRIPT_REGISTRY",
    "elementType": "PORTAL",
    "elementId": "PORTAL_FIN_CUSTODY",
    "parentId": "OFF_FIN_CUSTODY",
    "status": "VERIFIED",
    "evidence": "Portal: Securities Custody & Depository (/fintech/custody)"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/products/ModulePortalRegistry.ts",
    "sourceType": "TYPESCRIPT_REGISTRY",
    "elementType": "PORTAL",
    "elementId": "PORTAL_FIN_INSURE",
    "parentId": "OFF_FIN_INSURE",
    "status": "VERIFIED",
    "evidence": "Portal: Insurtech & Micro-Insurance (/fintech/insurance)"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/products/ModulePortalRegistry.ts",
    "sourceType": "TYPESCRIPT_REGISTRY",
    "elementType": "PORTAL",
    "elementId": "PORTAL_FIN_STABLECOIN",
    "parentId": "OFF_FIN_STABLECOIN",
    "status": "VERIFIED",
    "evidence": "Portal: Stablecoin & Digital Asset Rails (/fintech/stablecoin)"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/products/ModulePortalRegistry.ts",
    "sourceType": "TYPESCRIPT_REGISTRY",
    "elementType": "PORTAL",
    "elementId": "PORTAL_FIN_GLOBALACC",
    "parentId": "OFF_FIN_GLOBALACC",
    "status": "VERIFIED",
    "evidence": "Portal: Multi-Currency Global Accounts (/fintech/global-accounts)"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/products/ModulePortalRegistry.ts",
    "sourceType": "TYPESCRIPT_REGISTRY",
    "elementType": "PORTAL",
    "elementId": "PORTAL_FIN_MULTICURR",
    "parentId": "OFF_FIN_MULTICURR",
    "status": "VERIFIED",
    "evidence": "Portal: Multi-Currency Clearing (/fintech/multi-currency)"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/products/ModulePortalRegistry.ts",
    "sourceType": "TYPESCRIPT_REGISTRY",
    "elementType": "PORTAL",
    "elementId": "PORTAL_FIN_DEV_API",
    "parentId": "OFF_FIN_DEV_API",
    "status": "VERIFIED",
    "evidence": "Portal: Developer API Gateway (/fintech/dev-api)"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/products/ModulePortalRegistry.ts",
    "sourceType": "TYPESCRIPT_REGISTRY",
    "elementType": "PORTAL",
    "elementId": "PORTAL_FIN_BANK_PAY",
    "parentId": "OFF_FIN_BANK_PAY",
    "status": "VERIFIED",
    "evidence": "Portal: Commercial Bank Payments (/fintech/bank-payments)"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/products/ModulePortalRegistry.ts",
    "sourceType": "TYPESCRIPT_REGISTRY",
    "elementType": "PORTAL",
    "elementId": "PORTAL_FIN_BILL_PAY",
    "parentId": "OFF_FIN_BILL_PAY",
    "status": "VERIFIED",
    "evidence": "Portal: Utility Bill Aggregator (/fintech/bill-payments)"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/products/ModulePortalRegistry.ts",
    "sourceType": "TYPESCRIPT_REGISTRY",
    "elementType": "PORTAL",
    "elementId": "PORTAL_FIN_MERCH_SERV",
    "parentId": "OFF_FIN_MERCH_SERV",
    "status": "VERIFIED",
    "evidence": "Portal: Merchant Solutions Hub (/fintech/merchant-services)"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "products/fintech/agent-banking/manifest.ts",
    "sourceType": "SOURCE_FILE",
    "elementType": "MODULE",
    "elementId": "MOD_FT_AGENT_BANKING",
    "parentId": "JUMO-FINTECH",
    "status": "VERIFIED",
    "evidence": "Module: Agent Banking [FT-AGENT-BANKING]"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "products/fintech/agricultural-finance/manifest.ts",
    "sourceType": "SOURCE_FILE",
    "elementType": "MODULE",
    "elementId": "MOD_FT_AGRICULTURAL_FINANCE",
    "parentId": "JUMO-FINTECH",
    "status": "VERIFIED",
    "evidence": "Module: Agricultural Finance [FT-AGRICULTURAL-FINANCE]"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "products/fintech/atm-self-service/manifest.ts",
    "sourceType": "SOURCE_FILE",
    "elementType": "MODULE",
    "elementId": "MOD_FT_ATM_SELF_SERVICE",
    "parentId": "JUMO-FINTECH",
    "status": "VERIFIED",
    "evidence": "Module: Atm Self Service [FT-ATM-SELF-SERVICE]"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "products/fintech/bank-payments/manifest.ts",
    "sourceType": "SOURCE_FILE",
    "elementType": "MODULE",
    "elementId": "MOD_FT_BANK_PAYMENTS",
    "parentId": "JUMO-FINTECH",
    "status": "VERIFIED",
    "evidence": "Module: Bank Payments [FT-BANK-PAYMENTS]"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "products/fintech/bill-payments/manifest.ts",
    "sourceType": "SOURCE_FILE",
    "elementType": "MODULE",
    "elementId": "MOD_FT_BILL_PAYMENTS",
    "parentId": "JUMO-FINTECH",
    "status": "VERIFIED",
    "evidence": "Module: Bill Payments [FT-BILL-PAYMENTS]"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "products/fintech/capital-markets/manifest.ts",
    "sourceType": "SOURCE_FILE",
    "elementType": "MODULE",
    "elementId": "MOD_FT_CAPITAL_MARKETS",
    "parentId": "JUMO-FINTECH",
    "status": "VERIFIED",
    "evidence": "Module: Capital Markets [FT-CAPITAL-MARKETS]"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "products/fintech/cards/manifest.ts",
    "sourceType": "SOURCE_FILE",
    "elementType": "MODULE",
    "elementId": "MOD_FT_CARDS",
    "parentId": "JUMO-FINTECH",
    "status": "VERIFIED",
    "evidence": "Module: Cards [FT-CARDS]"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "products/fintech/collections/manifest.ts",
    "sourceType": "SOURCE_FILE",
    "elementType": "MODULE",
    "elementId": "MOD_FT_COLLECTIONS",
    "parentId": "JUMO-FINTECH",
    "status": "VERIFIED",
    "evidence": "Module: Collections [FT-COLLECTIONS]"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "products/fintech/compliance/manifest.ts",
    "sourceType": "SOURCE_FILE",
    "elementType": "MODULE",
    "elementId": "MOD_FT_COMPLIANCE",
    "parentId": "JUMO-FINTECH",
    "status": "VERIFIED",
    "evidence": "Module: Compliance [FT-COMPLIANCE]"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "products/fintech/cross-border/manifest.ts",
    "sourceType": "SOURCE_FILE",
    "elementType": "MODULE",
    "elementId": "MOD_FT_CROSS_BORDER",
    "parentId": "JUMO-FINTECH",
    "status": "VERIFIED",
    "evidence": "Module: Cross Border [FT-CROSS-BORDER]"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "products/fintech/data-intelligence/manifest.ts",
    "sourceType": "SOURCE_FILE",
    "elementType": "MODULE",
    "elementId": "MOD_FT_DATA_INTELLIGENCE",
    "parentId": "JUMO-FINTECH",
    "status": "VERIFIED",
    "evidence": "Module: Data Intelligence [FT-DATA-INTELLIGENCE]"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "products/fintech/developer-api/manifest.ts",
    "sourceType": "SOURCE_FILE",
    "elementType": "MODULE",
    "elementId": "MOD_FT_DEVELOPER_API",
    "parentId": "JUMO-FINTECH",
    "status": "VERIFIED",
    "evidence": "Module: Developer Api [FT-DEVELOPER-API]"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "products/fintech/digital-banking/manifest.ts",
    "sourceType": "SOURCE_FILE",
    "elementType": "MODULE",
    "elementId": "MOD_FT_DIGITAL_BANKING",
    "parentId": "JUMO-FINTECH",
    "status": "VERIFIED",
    "evidence": "Module: Digital Banking [FT-DIGITAL-BANKING]"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "products/fintech/digital-wallets/manifest.ts",
    "sourceType": "SOURCE_FILE",
    "elementType": "MODULE",
    "elementId": "MOD_FT_DIGITAL_WALLETS",
    "parentId": "JUMO-FINTECH",
    "status": "VERIFIED",
    "evidence": "Module: Digital Wallets [FT-DIGITAL-WALLETS]"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "products/fintech/embedded-finance/manifest.ts",
    "sourceType": "SOURCE_FILE",
    "elementType": "MODULE",
    "elementId": "MOD_FT_EMBEDDED_FINANCE",
    "parentId": "JUMO-FINTECH",
    "status": "VERIFIED",
    "evidence": "Module: Embedded Finance [FT-EMBEDDED-FINANCE]"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "products/fintech/financial-accounting/manifest.ts",
    "sourceType": "SOURCE_FILE",
    "elementType": "MODULE",
    "elementId": "MOD_FT_FINANCIAL_ACCOUNTING",
    "parentId": "JUMO-FINTECH",
    "status": "VERIFIED",
    "evidence": "Module: Financial Accounting [FT-FINANCIAL-ACCOUNTING]"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "products/fintech/fx/manifest.ts",
    "sourceType": "SOURCE_FILE",
    "elementType": "MODULE",
    "elementId": "MOD_FT_FX",
    "parentId": "JUMO-FINTECH",
    "status": "VERIFIED",
    "evidence": "Module: Fx [FT-FX]"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "products/fintech/global-accounts/manifest.ts",
    "sourceType": "SOURCE_FILE",
    "elementType": "MODULE",
    "elementId": "MOD_FT_GLOBAL_ACCOUNTS",
    "parentId": "JUMO-FINTECH",
    "status": "VERIFIED",
    "evidence": "Module: Global Accounts [FT-GLOBAL-ACCOUNTS]"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "products/fintech/insurance/manifest.ts",
    "sourceType": "SOURCE_FILE",
    "elementType": "MODULE",
    "elementId": "MOD_FT_INSURANCE",
    "parentId": "JUMO-FINTECH",
    "status": "VERIFIED",
    "evidence": "Module: Insurance [FT-INSURANCE]"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "products/fintech/investment/manifest.ts",
    "sourceType": "SOURCE_FILE",
    "elementType": "MODULE",
    "elementId": "MOD_FT_INVESTMENT",
    "parentId": "JUMO-FINTECH",
    "status": "VERIFIED",
    "evidence": "Module: Investment [FT-INVESTMENT]"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "products/fintech/lending/manifest.ts",
    "sourceType": "SOURCE_FILE",
    "elementType": "MODULE",
    "elementId": "MOD_FT_LENDING",
    "parentId": "JUMO-FINTECH",
    "status": "VERIFIED",
    "evidence": "Module: Lending [FT-LENDING]"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "products/fintech/merchant-acquiring/manifest.ts",
    "sourceType": "SOURCE_FILE",
    "elementType": "MODULE",
    "elementId": "MOD_FT_MERCHANT_ACQUIRING",
    "parentId": "JUMO-FINTECH",
    "status": "VERIFIED",
    "evidence": "Module: Merchant Acquiring [FT-MERCHANT-ACQUIRING]"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "products/fintech/merchant-services/manifest.ts",
    "sourceType": "SOURCE_FILE",
    "elementType": "MODULE",
    "elementId": "MOD_FT_MERCHANT_SERVICES",
    "parentId": "JUMO-FINTECH",
    "status": "VERIFIED",
    "evidence": "Module: Merchant Services [FT-MERCHANT-SERVICES]"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "products/fintech/microfinance/manifest.ts",
    "sourceType": "SOURCE_FILE",
    "elementType": "MODULE",
    "elementId": "MOD_FT_MICROFINANCE",
    "parentId": "JUMO-FINTECH",
    "status": "VERIFIED",
    "evidence": "Module: Microfinance [FT-MICROFINANCE]"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "products/fintech/mobile-money/manifest.ts",
    "sourceType": "SOURCE_FILE",
    "elementType": "MODULE",
    "elementId": "MOD_FT_MOBILE_MONEY",
    "parentId": "JUMO-FINTECH",
    "status": "VERIFIED",
    "evidence": "Module: Mobile Money [FT-MOBILE-MONEY]"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "products/fintech/multi-currency/manifest.ts",
    "sourceType": "SOURCE_FILE",
    "elementType": "MODULE",
    "elementId": "MOD_FT_MULTI_CURRENCY",
    "parentId": "JUMO-FINTECH",
    "status": "VERIFIED",
    "evidence": "Module: Multi Currency [FT-MULTI-CURRENCY]"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "products/fintech/payment-gateway/manifest.ts",
    "sourceType": "SOURCE_FILE",
    "elementType": "MODULE",
    "elementId": "MOD_FT_PAYMENT_GATEWAY",
    "parentId": "JUMO-FINTECH",
    "status": "VERIFIED",
    "evidence": "Module: Payment Gateway [FT-PAYMENT-GATEWAY]"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "products/fintech/payment-switching/manifest.ts",
    "sourceType": "SOURCE_FILE",
    "elementType": "MODULE",
    "elementId": "MOD_FT_PAYMENT_SWITCHING",
    "parentId": "JUMO-FINTECH",
    "status": "VERIFIED",
    "evidence": "Module: Payment Switching [FT-PAYMENT-SWITCHING]"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "products/fintech/payouts/manifest.ts",
    "sourceType": "SOURCE_FILE",
    "elementType": "MODULE",
    "elementId": "MOD_FT_PAYOUTS",
    "parentId": "JUMO-FINTECH",
    "status": "VERIFIED",
    "evidence": "Module: Payouts [FT-PAYOUTS]"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "products/fintech/payroll/manifest.ts",
    "sourceType": "SOURCE_FILE",
    "elementType": "MODULE",
    "elementId": "MOD_FT_PAYROLL",
    "parentId": "JUMO-FINTECH",
    "status": "VERIFIED",
    "evidence": "Module: Payroll [FT-PAYROLL]"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "products/fintech/remittances/manifest.ts",
    "sourceType": "SOURCE_FILE",
    "elementType": "MODULE",
    "elementId": "MOD_FT_REMITTANCES",
    "parentId": "JUMO-FINTECH",
    "status": "VERIFIED",
    "evidence": "Module: Remittances [FT-REMITTANCES]"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "products/fintech/sacco/manifest.ts",
    "sourceType": "SOURCE_FILE",
    "elementType": "MODULE",
    "elementId": "MOD_FT_SACCO",
    "parentId": "JUMO-FINTECH",
    "status": "VERIFIED",
    "evidence": "Module: Sacco [FT-SACCO]"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "products/fintech/savings/manifest.ts",
    "sourceType": "SOURCE_FILE",
    "elementType": "MODULE",
    "elementId": "MOD_FT_SAVINGS",
    "parentId": "JUMO-FINTECH",
    "status": "VERIFIED",
    "evidence": "Module: Savings [FT-SAVINGS]"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "products/fintech/securities-custody/manifest.ts",
    "sourceType": "SOURCE_FILE",
    "elementType": "MODULE",
    "elementId": "MOD_FT_SECURITIES_CUSTODY",
    "parentId": "JUMO-FINTECH",
    "status": "VERIFIED",
    "evidence": "Module: Securities Custody [FT-SECURITIES-CUSTODY]"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "products/fintech/stablecoin/manifest.ts",
    "sourceType": "SOURCE_FILE",
    "elementType": "MODULE",
    "elementId": "MOD_FT_STABLECOIN",
    "parentId": "JUMO-FINTECH",
    "status": "VERIFIED",
    "evidence": "Module: Stablecoin [FT-STABLECOIN]"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "products/fintech/tax-revenue/manifest.ts",
    "sourceType": "SOURCE_FILE",
    "elementType": "MODULE",
    "elementId": "MOD_FT_TAX_REVENUE",
    "parentId": "JUMO-FINTECH",
    "status": "VERIFIED",
    "evidence": "Module: Tax Revenue [FT-TAX-REVENUE]"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "products/fintech/trade-finance/manifest.ts",
    "sourceType": "SOURCE_FILE",
    "elementType": "MODULE",
    "elementId": "MOD_FT_TRADE_FINANCE",
    "parentId": "JUMO-FINTECH",
    "status": "VERIFIED",
    "evidence": "Module: Trade Finance [FT-TRADE-FINANCE]"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "products/fintech/treasury/manifest.ts",
    "sourceType": "SOURCE_FILE",
    "elementType": "MODULE",
    "elementId": "MOD_FT_TREASURY",
    "parentId": "JUMO-FINTECH",
    "status": "VERIFIED",
    "evidence": "Module: Treasury [FT-TREASURY]"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/products/fintech/core/agents/FintechCapabilityRegistry.ts",
    "sourceType": "CAPABILITY_REGISTRY",
    "elementType": "CAPABILITY",
    "elementId": "CAP_FT_AGENT_BANKING",
    "parentId": "MOD_FT_AGENT_BANKING",
    "status": "VERIFIED",
    "evidence": "Capability: Agent Banking Autonomous Engine"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/products/fintech/core/agents/FintechCapabilityRegistry.ts",
    "sourceType": "CAPABILITY_REGISTRY",
    "elementType": "CAPABILITY",
    "elementId": "CAP_FT_AGRICULTURAL_FINANCE",
    "parentId": "MOD_FT_AGRICULTURAL_FINANCE",
    "status": "VERIFIED",
    "evidence": "Capability: Agricultural Finance Autonomous Engine"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/products/fintech/core/agents/FintechCapabilityRegistry.ts",
    "sourceType": "CAPABILITY_REGISTRY",
    "elementType": "CAPABILITY",
    "elementId": "CAP_FT_ATM_SELF_SERVICE",
    "parentId": "MOD_FT_ATM_SELF_SERVICE",
    "status": "VERIFIED",
    "evidence": "Capability: Atm Self Service Autonomous Engine"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/products/fintech/core/agents/FintechCapabilityRegistry.ts",
    "sourceType": "CAPABILITY_REGISTRY",
    "elementType": "CAPABILITY",
    "elementId": "CAP_FT_BANK_PAYMENTS",
    "parentId": "MOD_FT_BANK_PAYMENTS",
    "status": "VERIFIED",
    "evidence": "Capability: Bank Payments Autonomous Engine"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/products/fintech/core/agents/FintechCapabilityRegistry.ts",
    "sourceType": "CAPABILITY_REGISTRY",
    "elementType": "CAPABILITY",
    "elementId": "CAP_FT_BILL_PAYMENTS",
    "parentId": "MOD_FT_BILL_PAYMENTS",
    "status": "VERIFIED",
    "evidence": "Capability: Bill Payments Autonomous Engine"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/products/fintech/core/agents/FintechCapabilityRegistry.ts",
    "sourceType": "CAPABILITY_REGISTRY",
    "elementType": "CAPABILITY",
    "elementId": "CAP_FT_CAPITAL_MARKETS",
    "parentId": "MOD_FT_CAPITAL_MARKETS",
    "status": "VERIFIED",
    "evidence": "Capability: Capital Markets Autonomous Engine"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/products/fintech/core/agents/FintechCapabilityRegistry.ts",
    "sourceType": "CAPABILITY_REGISTRY",
    "elementType": "CAPABILITY",
    "elementId": "CAP_FT_CARDS",
    "parentId": "MOD_FT_CARDS",
    "status": "VERIFIED",
    "evidence": "Capability: Cards Autonomous Engine"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/products/fintech/core/agents/FintechCapabilityRegistry.ts",
    "sourceType": "CAPABILITY_REGISTRY",
    "elementType": "CAPABILITY",
    "elementId": "CAP_FT_COLLECTIONS",
    "parentId": "MOD_FT_COLLECTIONS",
    "status": "VERIFIED",
    "evidence": "Capability: Collections Autonomous Engine"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/products/fintech/core/agents/FintechCapabilityRegistry.ts",
    "sourceType": "CAPABILITY_REGISTRY",
    "elementType": "CAPABILITY",
    "elementId": "CAP_FT_COMPLIANCE",
    "parentId": "MOD_FT_COMPLIANCE",
    "status": "VERIFIED",
    "evidence": "Capability: Compliance Autonomous Engine"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/products/fintech/core/agents/FintechCapabilityRegistry.ts",
    "sourceType": "CAPABILITY_REGISTRY",
    "elementType": "CAPABILITY",
    "elementId": "CAP_FT_CROSS_BORDER",
    "parentId": "MOD_FT_CROSS_BORDER",
    "status": "VERIFIED",
    "evidence": "Capability: Cross Border Autonomous Engine"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/products/fintech/core/agents/FintechCapabilityRegistry.ts",
    "sourceType": "CAPABILITY_REGISTRY",
    "elementType": "CAPABILITY",
    "elementId": "CAP_FT_DATA_INTELLIGENCE",
    "parentId": "MOD_FT_DATA_INTELLIGENCE",
    "status": "VERIFIED",
    "evidence": "Capability: Data Intelligence Autonomous Engine"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/products/fintech/core/agents/FintechCapabilityRegistry.ts",
    "sourceType": "CAPABILITY_REGISTRY",
    "elementType": "CAPABILITY",
    "elementId": "CAP_FT_DEVELOPER_API",
    "parentId": "MOD_FT_DEVELOPER_API",
    "status": "VERIFIED",
    "evidence": "Capability: Developer Api Autonomous Engine"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/products/fintech/core/agents/FintechCapabilityRegistry.ts",
    "sourceType": "CAPABILITY_REGISTRY",
    "elementType": "CAPABILITY",
    "elementId": "CAP_FT_DIGITAL_BANKING",
    "parentId": "MOD_FT_DIGITAL_BANKING",
    "status": "VERIFIED",
    "evidence": "Capability: Digital Banking Autonomous Engine"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/products/fintech/core/agents/FintechCapabilityRegistry.ts",
    "sourceType": "CAPABILITY_REGISTRY",
    "elementType": "CAPABILITY",
    "elementId": "CAP_FT_DIGITAL_WALLETS",
    "parentId": "MOD_FT_DIGITAL_WALLETS",
    "status": "VERIFIED",
    "evidence": "Capability: Digital Wallets Autonomous Engine"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/products/fintech/core/agents/FintechCapabilityRegistry.ts",
    "sourceType": "CAPABILITY_REGISTRY",
    "elementType": "CAPABILITY",
    "elementId": "CAP_FT_EMBEDDED_FINANCE",
    "parentId": "MOD_FT_EMBEDDED_FINANCE",
    "status": "VERIFIED",
    "evidence": "Capability: Embedded Finance Autonomous Engine"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/products/fintech/core/agents/FintechCapabilityRegistry.ts",
    "sourceType": "CAPABILITY_REGISTRY",
    "elementType": "CAPABILITY",
    "elementId": "CAP_FT_FINANCIAL_ACCOUNTING",
    "parentId": "MOD_FT_FINANCIAL_ACCOUNTING",
    "status": "VERIFIED",
    "evidence": "Capability: Financial Accounting Autonomous Engine"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/products/fintech/core/agents/FintechCapabilityRegistry.ts",
    "sourceType": "CAPABILITY_REGISTRY",
    "elementType": "CAPABILITY",
    "elementId": "CAP_FT_FX",
    "parentId": "MOD_FT_FX",
    "status": "VERIFIED",
    "evidence": "Capability: Fx Autonomous Engine"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/products/fintech/core/agents/FintechCapabilityRegistry.ts",
    "sourceType": "CAPABILITY_REGISTRY",
    "elementType": "CAPABILITY",
    "elementId": "CAP_FT_GLOBAL_ACCOUNTS",
    "parentId": "MOD_FT_GLOBAL_ACCOUNTS",
    "status": "VERIFIED",
    "evidence": "Capability: Global Accounts Autonomous Engine"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/products/fintech/core/agents/FintechCapabilityRegistry.ts",
    "sourceType": "CAPABILITY_REGISTRY",
    "elementType": "CAPABILITY",
    "elementId": "CAP_FT_INSURANCE",
    "parentId": "MOD_FT_INSURANCE",
    "status": "VERIFIED",
    "evidence": "Capability: Insurance Autonomous Engine"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/products/fintech/core/agents/FintechCapabilityRegistry.ts",
    "sourceType": "CAPABILITY_REGISTRY",
    "elementType": "CAPABILITY",
    "elementId": "CAP_FT_INVESTMENT",
    "parentId": "MOD_FT_INVESTMENT",
    "status": "VERIFIED",
    "evidence": "Capability: Investment Autonomous Engine"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/products/fintech/core/agents/FintechCapabilityRegistry.ts",
    "sourceType": "CAPABILITY_REGISTRY",
    "elementType": "CAPABILITY",
    "elementId": "CAP_FT_LENDING",
    "parentId": "MOD_FT_LENDING",
    "status": "VERIFIED",
    "evidence": "Capability: Lending Autonomous Engine"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/products/fintech/core/agents/FintechCapabilityRegistry.ts",
    "sourceType": "CAPABILITY_REGISTRY",
    "elementType": "CAPABILITY",
    "elementId": "CAP_FT_MERCHANT_ACQUIRING",
    "parentId": "MOD_FT_MERCHANT_ACQUIRING",
    "status": "VERIFIED",
    "evidence": "Capability: Merchant Acquiring Autonomous Engine"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/products/fintech/core/agents/FintechCapabilityRegistry.ts",
    "sourceType": "CAPABILITY_REGISTRY",
    "elementType": "CAPABILITY",
    "elementId": "CAP_FT_MERCHANT_SERVICES",
    "parentId": "MOD_FT_MERCHANT_SERVICES",
    "status": "VERIFIED",
    "evidence": "Capability: Merchant Services Autonomous Engine"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/products/fintech/core/agents/FintechCapabilityRegistry.ts",
    "sourceType": "CAPABILITY_REGISTRY",
    "elementType": "CAPABILITY",
    "elementId": "CAP_FT_MICROFINANCE",
    "parentId": "MOD_FT_MICROFINANCE",
    "status": "VERIFIED",
    "evidence": "Capability: Microfinance Autonomous Engine"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/products/fintech/core/agents/FintechCapabilityRegistry.ts",
    "sourceType": "CAPABILITY_REGISTRY",
    "elementType": "CAPABILITY",
    "elementId": "CAP_FT_MOBILE_MONEY",
    "parentId": "MOD_FT_MOBILE_MONEY",
    "status": "VERIFIED",
    "evidence": "Capability: Mobile Money Autonomous Engine"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/products/fintech/core/agents/FintechCapabilityRegistry.ts",
    "sourceType": "CAPABILITY_REGISTRY",
    "elementType": "CAPABILITY",
    "elementId": "CAP_FT_MULTI_CURRENCY",
    "parentId": "MOD_FT_MULTI_CURRENCY",
    "status": "VERIFIED",
    "evidence": "Capability: Multi Currency Autonomous Engine"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/products/fintech/core/agents/FintechCapabilityRegistry.ts",
    "sourceType": "CAPABILITY_REGISTRY",
    "elementType": "CAPABILITY",
    "elementId": "CAP_FT_PAYMENT_GATEWAY",
    "parentId": "MOD_FT_PAYMENT_GATEWAY",
    "status": "VERIFIED",
    "evidence": "Capability: Payment Gateway Autonomous Engine"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/products/fintech/core/agents/FintechCapabilityRegistry.ts",
    "sourceType": "CAPABILITY_REGISTRY",
    "elementType": "CAPABILITY",
    "elementId": "CAP_FT_PAYMENT_SWITCHING",
    "parentId": "MOD_FT_PAYMENT_SWITCHING",
    "status": "VERIFIED",
    "evidence": "Capability: Payment Switching Autonomous Engine"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/products/fintech/core/agents/FintechCapabilityRegistry.ts",
    "sourceType": "CAPABILITY_REGISTRY",
    "elementType": "CAPABILITY",
    "elementId": "CAP_FT_PAYOUTS",
    "parentId": "MOD_FT_PAYOUTS",
    "status": "VERIFIED",
    "evidence": "Capability: Payouts Autonomous Engine"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/products/fintech/core/agents/FintechCapabilityRegistry.ts",
    "sourceType": "CAPABILITY_REGISTRY",
    "elementType": "CAPABILITY",
    "elementId": "CAP_FT_PAYROLL",
    "parentId": "MOD_FT_PAYROLL",
    "status": "VERIFIED",
    "evidence": "Capability: Payroll Autonomous Engine"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/products/fintech/core/agents/FintechCapabilityRegistry.ts",
    "sourceType": "CAPABILITY_REGISTRY",
    "elementType": "CAPABILITY",
    "elementId": "CAP_FT_REMITTANCES",
    "parentId": "MOD_FT_REMITTANCES",
    "status": "VERIFIED",
    "evidence": "Capability: Remittances Autonomous Engine"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/products/fintech/core/agents/FintechCapabilityRegistry.ts",
    "sourceType": "CAPABILITY_REGISTRY",
    "elementType": "CAPABILITY",
    "elementId": "CAP_FT_SACCO",
    "parentId": "MOD_FT_SACCO",
    "status": "VERIFIED",
    "evidence": "Capability: Sacco Autonomous Engine"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/products/fintech/core/agents/FintechCapabilityRegistry.ts",
    "sourceType": "CAPABILITY_REGISTRY",
    "elementType": "CAPABILITY",
    "elementId": "CAP_FT_SAVINGS",
    "parentId": "MOD_FT_SAVINGS",
    "status": "VERIFIED",
    "evidence": "Capability: Savings Autonomous Engine"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/products/fintech/core/agents/FintechCapabilityRegistry.ts",
    "sourceType": "CAPABILITY_REGISTRY",
    "elementType": "CAPABILITY",
    "elementId": "CAP_FT_SECURITIES_CUSTODY",
    "parentId": "MOD_FT_SECURITIES_CUSTODY",
    "status": "VERIFIED",
    "evidence": "Capability: Securities Custody Autonomous Engine"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/products/fintech/core/agents/FintechCapabilityRegistry.ts",
    "sourceType": "CAPABILITY_REGISTRY",
    "elementType": "CAPABILITY",
    "elementId": "CAP_FT_STABLECOIN",
    "parentId": "MOD_FT_STABLECOIN",
    "status": "VERIFIED",
    "evidence": "Capability: Stablecoin Autonomous Engine"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/products/fintech/core/agents/FintechCapabilityRegistry.ts",
    "sourceType": "CAPABILITY_REGISTRY",
    "elementType": "CAPABILITY",
    "elementId": "CAP_FT_TAX_REVENUE",
    "parentId": "MOD_FT_TAX_REVENUE",
    "status": "VERIFIED",
    "evidence": "Capability: Tax Revenue Autonomous Engine"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/products/fintech/core/agents/FintechCapabilityRegistry.ts",
    "sourceType": "CAPABILITY_REGISTRY",
    "elementType": "CAPABILITY",
    "elementId": "CAP_FT_TRADE_FINANCE",
    "parentId": "MOD_FT_TRADE_FINANCE",
    "status": "VERIFIED",
    "evidence": "Capability: Trade Finance Autonomous Engine"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/products/fintech/core/agents/FintechCapabilityRegistry.ts",
    "sourceType": "CAPABILITY_REGISTRY",
    "elementType": "CAPABILITY",
    "elementId": "CAP_FT_TREASURY",
    "parentId": "MOD_FT_TREASURY",
    "status": "VERIFIED",
    "evidence": "Capability: Treasury Autonomous Engine"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/core/enterprise/components/metadata/UniversalUIMetadataRegistry.ts",
    "sourceType": "METADATA_FABRIC",
    "elementType": "UI_METADATA",
    "elementId": "UI_FT_CFO",
    "parentId": "CAP_FT_CFO",
    "status": "VERIFIED",
    "evidence": "UI Metadata for /fintech/cfo [DASHBOARD]"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/core/enterprise/components/metadata/UniversalUIMetadataRegistry.ts",
    "sourceType": "METADATA_FABRIC",
    "elementType": "UI_METADATA",
    "elementId": "UI_FT_LEDGER",
    "parentId": "CAP_FT_LEDGER",
    "status": "VERIFIED",
    "evidence": "UI Metadata for /fintech/gl [DASHBOARD]"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/core/enterprise/components/metadata/UniversalUIMetadataRegistry.ts",
    "sourceType": "METADATA_FABRIC",
    "elementType": "UI_METADATA",
    "elementId": "UI_FT_TAX",
    "parentId": "CAP_FT_TAX",
    "status": "VERIFIED",
    "evidence": "UI Metadata for /fintech/tax [DASHBOARD]"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/core/enterprise/components/metadata/UniversalUIMetadataRegistry.ts",
    "sourceType": "METADATA_FABRIC",
    "elementType": "UI_METADATA",
    "elementId": "UI_FT_COMPLIANCE",
    "parentId": "CAP_FT_COMPLIANCE",
    "status": "VERIFIED",
    "evidence": "UI Metadata for /fintech/compliance [DASHBOARD]"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/core/enterprise/components/metadata/UniversalUIMetadataRegistry.ts",
    "sourceType": "METADATA_FABRIC",
    "elementType": "UI_METADATA",
    "elementId": "UI_FT_DATA_INT",
    "parentId": "CAP_FT_DATA_INT",
    "status": "VERIFIED",
    "evidence": "UI Metadata for /fintech/data-int [DASHBOARD]"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/core/enterprise/components/metadata/UniversalUIMetadataRegistry.ts",
    "sourceType": "METADATA_FABRIC",
    "elementType": "UI_METADATA",
    "elementId": "UI_FT_PAYROLL",
    "parentId": "CAP_FT_PAYROLL",
    "status": "VERIFIED",
    "evidence": "UI Metadata for /fintech/payroll [DASHBOARD]"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/core/enterprise/components/metadata/UniversalUIMetadataRegistry.ts",
    "sourceType": "METADATA_FABRIC",
    "elementType": "UI_METADATA",
    "elementId": "UI_FT_SWITCH",
    "parentId": "CAP_FT_SWITCH",
    "status": "VERIFIED",
    "evidence": "UI Metadata for /fintech/switch [DASHBOARD]"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/core/enterprise/components/metadata/UniversalUIMetadataRegistry.ts",
    "sourceType": "METADATA_FABRIC",
    "elementType": "UI_METADATA",
    "elementId": "UI_FT_MOMO",
    "parentId": "CAP_FT_MOMO",
    "status": "VERIFIED",
    "evidence": "UI Metadata for /fintech/momo [DASHBOARD]"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/core/enterprise/components/metadata/UniversalUIMetadataRegistry.ts",
    "sourceType": "METADATA_FABRIC",
    "elementType": "UI_METADATA",
    "elementId": "UI_FT_GATEWAY",
    "parentId": "CAP_FT_GATEWAY",
    "status": "VERIFIED",
    "evidence": "UI Metadata for /fintech/gateway [DASHBOARD]"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/core/enterprise/components/metadata/UniversalUIMetadataRegistry.ts",
    "sourceType": "METADATA_FABRIC",
    "elementType": "UI_METADATA",
    "elementId": "UI_FT_COLLECTIONS",
    "parentId": "CAP_FT_COLLECTIONS",
    "status": "VERIFIED",
    "evidence": "UI Metadata for /fintech/collections [DASHBOARD]"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/core/enterprise/components/metadata/UniversalUIMetadataRegistry.ts",
    "sourceType": "METADATA_FABRIC",
    "elementType": "UI_METADATA",
    "elementId": "UI_FT_PAYOUTS",
    "parentId": "CAP_FT_PAYOUTS",
    "status": "VERIFIED",
    "evidence": "UI Metadata for /fintech/payouts [DASHBOARD]"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/core/enterprise/components/metadata/UniversalUIMetadataRegistry.ts",
    "sourceType": "METADATA_FABRIC",
    "elementType": "UI_METADATA",
    "elementId": "UI_FT_REMIT",
    "parentId": "CAP_FT_REMIT",
    "status": "VERIFIED",
    "evidence": "UI Metadata for /fintech/remit [DASHBOARD]"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/core/enterprise/components/metadata/UniversalUIMetadataRegistry.ts",
    "sourceType": "METADATA_FABRIC",
    "elementType": "UI_METADATA",
    "elementId": "UI_FT_AGENT",
    "parentId": "CAP_FT_AGENT",
    "status": "VERIFIED",
    "evidence": "UI Metadata for /fintech/agent-banking [DASHBOARD]"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/core/enterprise/components/metadata/UniversalUIMetadataRegistry.ts",
    "sourceType": "METADATA_FABRIC",
    "elementType": "UI_METADATA",
    "elementId": "UI_FT_MERCHANT",
    "parentId": "CAP_FT_MERCHANT",
    "status": "VERIFIED",
    "evidence": "UI Metadata for /fintech/merchant-acquiring [DASHBOARD]"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/core/enterprise/components/metadata/UniversalUIMetadataRegistry.ts",
    "sourceType": "METADATA_FABRIC",
    "elementType": "UI_METADATA",
    "elementId": "UI_FT_CARDS",
    "parentId": "CAP_FT_CARDS",
    "status": "VERIFIED",
    "evidence": "UI Metadata for /fintech/cards [DASHBOARD]"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/core/enterprise/components/metadata/UniversalUIMetadataRegistry.ts",
    "sourceType": "METADATA_FABRIC",
    "elementType": "UI_METADATA",
    "elementId": "UI_FT_ATM",
    "parentId": "CAP_FT_ATM",
    "status": "VERIFIED",
    "evidence": "UI Metadata for /fintech/atm [DASHBOARD]"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/core/enterprise/components/metadata/UniversalUIMetadataRegistry.ts",
    "sourceType": "METADATA_FABRIC",
    "elementType": "UI_METADATA",
    "elementId": "UI_FT_WALLETS",
    "parentId": "CAP_FT_WALLETS",
    "status": "VERIFIED",
    "evidence": "UI Metadata for /fintech/wallets [DASHBOARD]"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/core/enterprise/components/metadata/UniversalUIMetadataRegistry.ts",
    "sourceType": "METADATA_FABRIC",
    "elementType": "UI_METADATA",
    "elementId": "UI_FT_DIGIBANK",
    "parentId": "CAP_FT_DIGIBANK",
    "status": "VERIFIED",
    "evidence": "UI Metadata for /fintech/digital-banking [DASHBOARD]"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/core/enterprise/components/metadata/UniversalUIMetadataRegistry.ts",
    "sourceType": "METADATA_FABRIC",
    "elementType": "UI_METADATA",
    "elementId": "UI_FT_EMBEDDED",
    "parentId": "CAP_FT_EMBEDDED",
    "status": "VERIFIED",
    "evidence": "UI Metadata for /fintech/embedded [DASHBOARD]"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/core/enterprise/components/metadata/UniversalUIMetadataRegistry.ts",
    "sourceType": "METADATA_FABRIC",
    "elementType": "UI_METADATA",
    "elementId": "UI_FT_SACCO",
    "parentId": "CAP_FT_SACCO",
    "status": "VERIFIED",
    "evidence": "UI Metadata for /fintech/sacco [DASHBOARD]"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/core/enterprise/components/metadata/UniversalUIMetadataRegistry.ts",
    "sourceType": "METADATA_FABRIC",
    "elementType": "UI_METADATA",
    "elementId": "UI_FT_MICRO",
    "parentId": "CAP_FT_MICRO",
    "status": "VERIFIED",
    "evidence": "UI Metadata for /fintech/microfinance [DASHBOARD]"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/core/enterprise/components/metadata/UniversalUIMetadataRegistry.ts",
    "sourceType": "METADATA_FABRIC",
    "elementType": "UI_METADATA",
    "elementId": "UI_FT_SAVINGS",
    "parentId": "CAP_FT_SAVINGS",
    "status": "VERIFIED",
    "evidence": "UI Metadata for /fintech/savings [DASHBOARD]"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/core/enterprise/components/metadata/UniversalUIMetadataRegistry.ts",
    "sourceType": "METADATA_FABRIC",
    "elementType": "UI_METADATA",
    "elementId": "UI_FT_LENDING",
    "parentId": "CAP_FT_LENDING",
    "status": "VERIFIED",
    "evidence": "UI Metadata for /fintech/lending [DASHBOARD]"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/core/enterprise/components/metadata/UniversalUIMetadataRegistry.ts",
    "sourceType": "METADATA_FABRIC",
    "elementType": "UI_METADATA",
    "elementId": "UI_FT_AGRI",
    "parentId": "CAP_FT_AGRI",
    "status": "VERIFIED",
    "evidence": "UI Metadata for /fintech/agri-finance [DASHBOARD]"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/core/enterprise/components/metadata/UniversalUIMetadataRegistry.ts",
    "sourceType": "METADATA_FABRIC",
    "elementType": "UI_METADATA",
    "elementId": "UI_FT_TRADE",
    "parentId": "CAP_FT_TRADE",
    "status": "VERIFIED",
    "evidence": "UI Metadata for /fintech/trade-finance [DASHBOARD]"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/core/enterprise/components/metadata/UniversalUIMetadataRegistry.ts",
    "sourceType": "METADATA_FABRIC",
    "elementType": "UI_METADATA",
    "elementId": "UI_FT_TREASURY",
    "parentId": "CAP_FT_TREASURY",
    "status": "VERIFIED",
    "evidence": "UI Metadata for /fintech/treasury [DASHBOARD]"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/core/enterprise/components/metadata/UniversalUIMetadataRegistry.ts",
    "sourceType": "METADATA_FABRIC",
    "elementType": "UI_METADATA",
    "elementId": "UI_FT_FX",
    "parentId": "CAP_FT_FX",
    "status": "VERIFIED",
    "evidence": "UI Metadata for /fintech/fx [DASHBOARD]"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/core/enterprise/components/metadata/UniversalUIMetadataRegistry.ts",
    "sourceType": "METADATA_FABRIC",
    "elementType": "UI_METADATA",
    "elementId": "UI_FT_CAPMARKETS",
    "parentId": "CAP_FT_CAPMARKETS",
    "status": "VERIFIED",
    "evidence": "UI Metadata for /fintech/capital-markets [DASHBOARD]"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/core/enterprise/components/metadata/UniversalUIMetadataRegistry.ts",
    "sourceType": "METADATA_FABRIC",
    "elementType": "UI_METADATA",
    "elementId": "UI_FT_INVEST",
    "parentId": "CAP_FT_INVEST",
    "status": "VERIFIED",
    "evidence": "UI Metadata for /fintech/investment [DASHBOARD]"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/core/enterprise/components/metadata/UniversalUIMetadataRegistry.ts",
    "sourceType": "METADATA_FABRIC",
    "elementType": "UI_METADATA",
    "elementId": "UI_FT_CUSTODY",
    "parentId": "CAP_FT_CUSTODY",
    "status": "VERIFIED",
    "evidence": "UI Metadata for /fintech/custody [DASHBOARD]"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/core/enterprise/components/metadata/UniversalUIMetadataRegistry.ts",
    "sourceType": "METADATA_FABRIC",
    "elementType": "UI_METADATA",
    "elementId": "UI_FT_INSURE",
    "parentId": "CAP_FT_INSURE",
    "status": "VERIFIED",
    "evidence": "UI Metadata for /fintech/insurance [DASHBOARD]"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/core/enterprise/components/metadata/UniversalUIMetadataRegistry.ts",
    "sourceType": "METADATA_FABRIC",
    "elementType": "UI_METADATA",
    "elementId": "UI_FT_STABLECOIN",
    "parentId": "CAP_FT_STABLECOIN",
    "status": "VERIFIED",
    "evidence": "UI Metadata for /fintech/stablecoin [DASHBOARD]"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/core/enterprise/components/metadata/UniversalUIMetadataRegistry.ts",
    "sourceType": "METADATA_FABRIC",
    "elementType": "UI_METADATA",
    "elementId": "UI_FT_GLOBALACC",
    "parentId": "CAP_FT_GLOBALACC",
    "status": "VERIFIED",
    "evidence": "UI Metadata for /fintech/global-accounts [DASHBOARD]"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/core/enterprise/components/metadata/UniversalUIMetadataRegistry.ts",
    "sourceType": "METADATA_FABRIC",
    "elementType": "UI_METADATA",
    "elementId": "UI_FT_MULTICURR",
    "parentId": "CAP_FT_MULTICURR",
    "status": "VERIFIED",
    "evidence": "UI Metadata for /fintech/multi-currency [DASHBOARD]"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/core/enterprise/components/metadata/UniversalUIMetadataRegistry.ts",
    "sourceType": "METADATA_FABRIC",
    "elementType": "UI_METADATA",
    "elementId": "UI_FT_DEV_API",
    "parentId": "CAP_FT_DEV_API",
    "status": "VERIFIED",
    "evidence": "UI Metadata for /fintech/dev-api [DASHBOARD]"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/core/enterprise/components/metadata/UniversalUIMetadataRegistry.ts",
    "sourceType": "METADATA_FABRIC",
    "elementType": "UI_METADATA",
    "elementId": "UI_FT_BANK_PAY",
    "parentId": "CAP_FT_BANK_PAY",
    "status": "VERIFIED",
    "evidence": "UI Metadata for /fintech/bank-payments [DASHBOARD]"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/core/enterprise/components/metadata/UniversalUIMetadataRegistry.ts",
    "sourceType": "METADATA_FABRIC",
    "elementType": "UI_METADATA",
    "elementId": "UI_FT_BILL_PAY",
    "parentId": "CAP_FT_BILL_PAY",
    "status": "VERIFIED",
    "evidence": "UI Metadata for /fintech/bill-payments [DASHBOARD]"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/core/enterprise/components/metadata/UniversalUIMetadataRegistry.ts",
    "sourceType": "METADATA_FABRIC",
    "elementType": "UI_METADATA",
    "elementId": "UI_FT_MERCH_SERV",
    "parentId": "CAP_FT_MERCH_SERV",
    "status": "VERIFIED",
    "evidence": "UI Metadata for /fintech/merchant-services [DASHBOARD]"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/products/fintech/FintechShell.tsx",
    "sourceType": "REACT_TSX_COMPONENT",
    "elementType": "RUNTIME_COMPONENT",
    "elementId": "RTC_FT_CFO",
    "parentId": "CAP_FT_CFO",
    "status": "VERIFIED",
    "evidence": "Runtime Component at src/products/fintech/FintechShell.tsx"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/products/fintech/FintechShell.tsx",
    "sourceType": "REACT_TSX_COMPONENT",
    "elementType": "RUNTIME_COMPONENT",
    "elementId": "RTC_FT_LEDGER",
    "parentId": "CAP_FT_LEDGER",
    "status": "VERIFIED",
    "evidence": "Runtime Component at src/products/fintech/FintechShell.tsx"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/products/fintech/FintechShell.tsx",
    "sourceType": "REACT_TSX_COMPONENT",
    "elementType": "RUNTIME_COMPONENT",
    "elementId": "RTC_FT_TAX",
    "parentId": "CAP_FT_TAX",
    "status": "VERIFIED",
    "evidence": "Runtime Component at src/products/fintech/FintechShell.tsx"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/products/fintech/FintechShell.tsx",
    "sourceType": "REACT_TSX_COMPONENT",
    "elementType": "RUNTIME_COMPONENT",
    "elementId": "RTC_FT_COMPLIANCE",
    "parentId": "CAP_FT_COMPLIANCE",
    "status": "VERIFIED",
    "evidence": "Runtime Component at src/products/fintech/FintechShell.tsx"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/products/fintech/FintechShell.tsx",
    "sourceType": "REACT_TSX_COMPONENT",
    "elementType": "RUNTIME_COMPONENT",
    "elementId": "RTC_FT_DATA_INT",
    "parentId": "CAP_FT_DATA_INT",
    "status": "VERIFIED",
    "evidence": "Runtime Component at src/products/fintech/FintechShell.tsx"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/products/fintech/FintechShell.tsx",
    "sourceType": "REACT_TSX_COMPONENT",
    "elementType": "RUNTIME_COMPONENT",
    "elementId": "RTC_FT_PAYROLL",
    "parentId": "CAP_FT_PAYROLL",
    "status": "VERIFIED",
    "evidence": "Runtime Component at src/products/fintech/FintechShell.tsx"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/products/fintech/FintechShell.tsx",
    "sourceType": "REACT_TSX_COMPONENT",
    "elementType": "RUNTIME_COMPONENT",
    "elementId": "RTC_FT_SWITCH",
    "parentId": "CAP_FT_SWITCH",
    "status": "VERIFIED",
    "evidence": "Runtime Component at src/products/fintech/FintechShell.tsx"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/products/fintech/FintechShell.tsx",
    "sourceType": "REACT_TSX_COMPONENT",
    "elementType": "RUNTIME_COMPONENT",
    "elementId": "RTC_FT_MOMO",
    "parentId": "CAP_FT_MOMO",
    "status": "VERIFIED",
    "evidence": "Runtime Component at src/products/fintech/FintechShell.tsx"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/products/fintech/FintechShell.tsx",
    "sourceType": "REACT_TSX_COMPONENT",
    "elementType": "RUNTIME_COMPONENT",
    "elementId": "RTC_FT_GATEWAY",
    "parentId": "CAP_FT_GATEWAY",
    "status": "VERIFIED",
    "evidence": "Runtime Component at src/products/fintech/FintechShell.tsx"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/products/fintech/FintechShell.tsx",
    "sourceType": "REACT_TSX_COMPONENT",
    "elementType": "RUNTIME_COMPONENT",
    "elementId": "RTC_FT_COLLECTIONS",
    "parentId": "CAP_FT_COLLECTIONS",
    "status": "VERIFIED",
    "evidence": "Runtime Component at src/products/fintech/FintechShell.tsx"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/products/fintech/FintechShell.tsx",
    "sourceType": "REACT_TSX_COMPONENT",
    "elementType": "RUNTIME_COMPONENT",
    "elementId": "RTC_FT_PAYOUTS",
    "parentId": "CAP_FT_PAYOUTS",
    "status": "VERIFIED",
    "evidence": "Runtime Component at src/products/fintech/FintechShell.tsx"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/products/fintech/FintechShell.tsx",
    "sourceType": "REACT_TSX_COMPONENT",
    "elementType": "RUNTIME_COMPONENT",
    "elementId": "RTC_FT_REMIT",
    "parentId": "CAP_FT_REMIT",
    "status": "VERIFIED",
    "evidence": "Runtime Component at src/products/fintech/FintechShell.tsx"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/products/fintech/FintechShell.tsx",
    "sourceType": "REACT_TSX_COMPONENT",
    "elementType": "RUNTIME_COMPONENT",
    "elementId": "RTC_FT_AGENT",
    "parentId": "CAP_FT_AGENT",
    "status": "VERIFIED",
    "evidence": "Runtime Component at src/products/fintech/FintechShell.tsx"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/products/fintech/FintechShell.tsx",
    "sourceType": "REACT_TSX_COMPONENT",
    "elementType": "RUNTIME_COMPONENT",
    "elementId": "RTC_FT_MERCHANT",
    "parentId": "CAP_FT_MERCHANT",
    "status": "VERIFIED",
    "evidence": "Runtime Component at src/products/fintech/FintechShell.tsx"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/products/fintech/FintechShell.tsx",
    "sourceType": "REACT_TSX_COMPONENT",
    "elementType": "RUNTIME_COMPONENT",
    "elementId": "RTC_FT_CARDS",
    "parentId": "CAP_FT_CARDS",
    "status": "VERIFIED",
    "evidence": "Runtime Component at src/products/fintech/FintechShell.tsx"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/products/fintech/FintechShell.tsx",
    "sourceType": "REACT_TSX_COMPONENT",
    "elementType": "RUNTIME_COMPONENT",
    "elementId": "RTC_FT_ATM",
    "parentId": "CAP_FT_ATM",
    "status": "VERIFIED",
    "evidence": "Runtime Component at src/products/fintech/FintechShell.tsx"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/products/fintech/FintechShell.tsx",
    "sourceType": "REACT_TSX_COMPONENT",
    "elementType": "RUNTIME_COMPONENT",
    "elementId": "RTC_FT_WALLETS",
    "parentId": "CAP_FT_WALLETS",
    "status": "VERIFIED",
    "evidence": "Runtime Component at src/products/fintech/FintechShell.tsx"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/products/fintech/FintechShell.tsx",
    "sourceType": "REACT_TSX_COMPONENT",
    "elementType": "RUNTIME_COMPONENT",
    "elementId": "RTC_FT_DIGIBANK",
    "parentId": "CAP_FT_DIGIBANK",
    "status": "VERIFIED",
    "evidence": "Runtime Component at src/products/fintech/FintechShell.tsx"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/products/fintech/FintechShell.tsx",
    "sourceType": "REACT_TSX_COMPONENT",
    "elementType": "RUNTIME_COMPONENT",
    "elementId": "RTC_FT_EMBEDDED",
    "parentId": "CAP_FT_EMBEDDED",
    "status": "VERIFIED",
    "evidence": "Runtime Component at src/products/fintech/FintechShell.tsx"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/products/fintech/FintechShell.tsx",
    "sourceType": "REACT_TSX_COMPONENT",
    "elementType": "RUNTIME_COMPONENT",
    "elementId": "RTC_FT_SACCO",
    "parentId": "CAP_FT_SACCO",
    "status": "VERIFIED",
    "evidence": "Runtime Component at src/products/fintech/FintechShell.tsx"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/products/fintech/FintechShell.tsx",
    "sourceType": "REACT_TSX_COMPONENT",
    "elementType": "RUNTIME_COMPONENT",
    "elementId": "RTC_FT_MICRO",
    "parentId": "CAP_FT_MICRO",
    "status": "VERIFIED",
    "evidence": "Runtime Component at src/products/fintech/FintechShell.tsx"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/products/fintech/FintechShell.tsx",
    "sourceType": "REACT_TSX_COMPONENT",
    "elementType": "RUNTIME_COMPONENT",
    "elementId": "RTC_FT_SAVINGS",
    "parentId": "CAP_FT_SAVINGS",
    "status": "VERIFIED",
    "evidence": "Runtime Component at src/products/fintech/FintechShell.tsx"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/products/fintech/FintechShell.tsx",
    "sourceType": "REACT_TSX_COMPONENT",
    "elementType": "RUNTIME_COMPONENT",
    "elementId": "RTC_FT_LENDING",
    "parentId": "CAP_FT_LENDING",
    "status": "VERIFIED",
    "evidence": "Runtime Component at src/products/fintech/FintechShell.tsx"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/products/fintech/FintechShell.tsx",
    "sourceType": "REACT_TSX_COMPONENT",
    "elementType": "RUNTIME_COMPONENT",
    "elementId": "RTC_FT_AGRI",
    "parentId": "CAP_FT_AGRI",
    "status": "VERIFIED",
    "evidence": "Runtime Component at src/products/fintech/FintechShell.tsx"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/products/fintech/FintechShell.tsx",
    "sourceType": "REACT_TSX_COMPONENT",
    "elementType": "RUNTIME_COMPONENT",
    "elementId": "RTC_FT_TRADE",
    "parentId": "CAP_FT_TRADE",
    "status": "VERIFIED",
    "evidence": "Runtime Component at src/products/fintech/FintechShell.tsx"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/products/fintech/FintechShell.tsx",
    "sourceType": "REACT_TSX_COMPONENT",
    "elementType": "RUNTIME_COMPONENT",
    "elementId": "RTC_FT_TREASURY",
    "parentId": "CAP_FT_TREASURY",
    "status": "VERIFIED",
    "evidence": "Runtime Component at src/products/fintech/FintechShell.tsx"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/products/fintech/FintechShell.tsx",
    "sourceType": "REACT_TSX_COMPONENT",
    "elementType": "RUNTIME_COMPONENT",
    "elementId": "RTC_FT_FX",
    "parentId": "CAP_FT_FX",
    "status": "VERIFIED",
    "evidence": "Runtime Component at src/products/fintech/FintechShell.tsx"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/products/fintech/FintechShell.tsx",
    "sourceType": "REACT_TSX_COMPONENT",
    "elementType": "RUNTIME_COMPONENT",
    "elementId": "RTC_FT_CAPMARKETS",
    "parentId": "CAP_FT_CAPMARKETS",
    "status": "VERIFIED",
    "evidence": "Runtime Component at src/products/fintech/FintechShell.tsx"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/products/fintech/FintechShell.tsx",
    "sourceType": "REACT_TSX_COMPONENT",
    "elementType": "RUNTIME_COMPONENT",
    "elementId": "RTC_FT_INVEST",
    "parentId": "CAP_FT_INVEST",
    "status": "VERIFIED",
    "evidence": "Runtime Component at src/products/fintech/FintechShell.tsx"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/products/fintech/FintechShell.tsx",
    "sourceType": "REACT_TSX_COMPONENT",
    "elementType": "RUNTIME_COMPONENT",
    "elementId": "RTC_FT_CUSTODY",
    "parentId": "CAP_FT_CUSTODY",
    "status": "VERIFIED",
    "evidence": "Runtime Component at src/products/fintech/FintechShell.tsx"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/products/fintech/FintechShell.tsx",
    "sourceType": "REACT_TSX_COMPONENT",
    "elementType": "RUNTIME_COMPONENT",
    "elementId": "RTC_FT_INSURE",
    "parentId": "CAP_FT_INSURE",
    "status": "VERIFIED",
    "evidence": "Runtime Component at src/products/fintech/FintechShell.tsx"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/products/fintech/FintechShell.tsx",
    "sourceType": "REACT_TSX_COMPONENT",
    "elementType": "RUNTIME_COMPONENT",
    "elementId": "RTC_FT_STABLECOIN",
    "parentId": "CAP_FT_STABLECOIN",
    "status": "VERIFIED",
    "evidence": "Runtime Component at src/products/fintech/FintechShell.tsx"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/products/fintech/FintechShell.tsx",
    "sourceType": "REACT_TSX_COMPONENT",
    "elementType": "RUNTIME_COMPONENT",
    "elementId": "RTC_FT_GLOBALACC",
    "parentId": "CAP_FT_GLOBALACC",
    "status": "VERIFIED",
    "evidence": "Runtime Component at src/products/fintech/FintechShell.tsx"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/products/fintech/FintechShell.tsx",
    "sourceType": "REACT_TSX_COMPONENT",
    "elementType": "RUNTIME_COMPONENT",
    "elementId": "RTC_FT_MULTICURR",
    "parentId": "CAP_FT_MULTICURR",
    "status": "VERIFIED",
    "evidence": "Runtime Component at src/products/fintech/FintechShell.tsx"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/products/fintech/FintechShell.tsx",
    "sourceType": "REACT_TSX_COMPONENT",
    "elementType": "RUNTIME_COMPONENT",
    "elementId": "RTC_FT_DEV_API",
    "parentId": "CAP_FT_DEV_API",
    "status": "VERIFIED",
    "evidence": "Runtime Component at src/products/fintech/FintechShell.tsx"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/products/fintech/FintechShell.tsx",
    "sourceType": "REACT_TSX_COMPONENT",
    "elementType": "RUNTIME_COMPONENT",
    "elementId": "RTC_FT_BANK_PAY",
    "parentId": "CAP_FT_BANK_PAY",
    "status": "VERIFIED",
    "evidence": "Runtime Component at src/products/fintech/FintechShell.tsx"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/products/fintech/FintechShell.tsx",
    "sourceType": "REACT_TSX_COMPONENT",
    "elementType": "RUNTIME_COMPONENT",
    "elementId": "RTC_FT_BILL_PAY",
    "parentId": "CAP_FT_BILL_PAY",
    "status": "VERIFIED",
    "evidence": "Runtime Component at src/products/fintech/FintechShell.tsx"
  },
  {
    "productId": "JUMO-FINTECH",
    "sourceFile": "src/products/fintech/FintechShell.tsx",
    "sourceType": "REACT_TSX_COMPONENT",
    "elementType": "RUNTIME_COMPONENT",
    "elementId": "RTC_FT_MERCH_SERV",
    "parentId": "CAP_FT_MERCH_SERV",
    "status": "VERIFIED",
    "evidence": "Runtime Component at src/products/fintech/FintechShell.tsx"
  },
  {
    "productId": "JUMO-NURSERY-PRIMARY-ERP",
    "sourceFile": "src/recovery/manifests/JUMO-NURSERY-PRIMARY-ERP.manifest.ts",
    "sourceType": "TYPESCRIPT_MANIFEST",
    "elementType": "PRODUCT",
    "elementId": "JUMO-NURSERY-PRIMARY-ERP",
    "parentId": "JUMO_PLATFORM_KERNEL",
    "status": "VERIFIED",
    "evidence": "Authoritative sovereign product manifest for Nursery & Primary Consolidated ERP"
  },
  {
    "productId": "JUMO-NURSERY-PRIMARY-ERP",
    "sourceFile": "src/recovery/manifests/JUMO-NURSERY-PRIMARY-ERP.manifest.ts",
    "sourceType": "TYPESCRIPT_MANIFEST",
    "elementType": "DIRECTORATE",
    "elementId": "DIR_NP_GOVERNANCE",
    "parentId": "JUMO-NURSERY-PRIMARY-ERP",
    "status": "VERIFIED",
    "evidence": "Directorate: Consolidated Institutional Governance Directorate"
  },
  {
    "productId": "JUMO-NURSERY-PRIMARY-ERP",
    "sourceFile": "src/recovery/manifests/JUMO-NURSERY-PRIMARY-ERP.manifest.ts",
    "sourceType": "TYPESCRIPT_MANIFEST",
    "elementType": "DIRECTORATE",
    "elementId": "DIR_NUR_ACADEMICS",
    "parentId": "JUMO-NURSERY-PRIMARY-ERP",
    "status": "VERIFIED",
    "evidence": "Directorate: Early Childhood Development (ECD) & Nursery Directorate"
  },
  {
    "productId": "JUMO-NURSERY-PRIMARY-ERP",
    "sourceFile": "src/recovery/manifests/JUMO-NURSERY-PRIMARY-ERP.manifest.ts",
    "sourceType": "TYPESCRIPT_MANIFEST",
    "elementType": "DIRECTORATE",
    "elementId": "DIR_PRI_ACADEMICS",
    "parentId": "JUMO-NURSERY-PRIMARY-ERP",
    "status": "VERIFIED",
    "evidence": "Directorate: Primary Academic Studies & Examinations Directorate"
  },
  {
    "productId": "JUMO-NURSERY-PRIMARY-ERP",
    "sourceFile": "src/recovery/manifests/JUMO-NURSERY-PRIMARY-ERP.manifest.ts",
    "sourceType": "TYPESCRIPT_MANIFEST",
    "elementType": "DIRECTORATE",
    "elementId": "DIR_NP_FINANCE",
    "parentId": "JUMO-NURSERY-PRIMARY-ERP",
    "status": "VERIFIED",
    "evidence": "Directorate: Bursary & Financial Management Directorate"
  },
  {
    "productId": "JUMO-NURSERY-PRIMARY-ERP",
    "sourceFile": "src/recovery/manifests/JUMO-NURSERY-PRIMARY-ERP.manifest.ts",
    "sourceType": "TYPESCRIPT_MANIFEST",
    "elementType": "DIRECTORATE",
    "elementId": "DIR_NP_WELFARE",
    "parentId": "JUMO-NURSERY-PRIMARY-ERP",
    "status": "VERIFIED",
    "evidence": "Directorate: Child Safeguarding, Health & Pastoral Care Directorate"
  },
  {
    "productId": "JUMO-NURSERY-PRIMARY-ERP",
    "sourceFile": "src/recovery/manifests/JUMO-NURSERY-PRIMARY-ERP.manifest.ts",
    "sourceType": "TYPESCRIPT_MANIFEST",
    "elementType": "DIRECTORATE",
    "elementId": "DIR_NP_OPERATIONS",
    "parentId": "JUMO-NURSERY-PRIMARY-ERP",
    "status": "VERIFIED",
    "evidence": "Directorate: Campus Logistics, Fleet & Dining Directorate"
  },
  {
    "productId": "JUMO-NURSERY-PRIMARY-ERP",
    "sourceFile": "src/recovery/manifests/JUMO-NURSERY-PRIMARY-ERP.manifest.ts",
    "sourceType": "TYPESCRIPT_MANIFEST",
    "elementType": "DEPARTMENT",
    "elementId": "DEP_NP_EXECUTIVE",
    "parentId": "DIR_NP_GOVERNANCE",
    "status": "VERIFIED",
    "evidence": "Department: Office of the Head Teacher / Directorship"
  },
  {
    "productId": "JUMO-NURSERY-PRIMARY-ERP",
    "sourceFile": "src/recovery/manifests/JUMO-NURSERY-PRIMARY-ERP.manifest.ts",
    "sourceType": "TYPESCRIPT_MANIFEST",
    "elementType": "DEPARTMENT",
    "elementId": "DEP_NP_ADMISSIONS",
    "parentId": "DIR_NP_GOVERNANCE",
    "status": "VERIFIED",
    "evidence": "Department: Student Admissions & Enrollment Secretariat"
  },
  {
    "productId": "JUMO-NURSERY-PRIMARY-ERP",
    "sourceFile": "src/recovery/manifests/JUMO-NURSERY-PRIMARY-ERP.manifest.ts",
    "sourceType": "TYPESCRIPT_MANIFEST",
    "elementType": "DEPARTMENT",
    "elementId": "DEP_NUR_ACADEMICS",
    "parentId": "DIR_NUR_ACADEMICS",
    "status": "VERIFIED",
    "evidence": "Department: Nursery Curriculum & Milestones Tracking"
  },
  {
    "productId": "JUMO-NURSERY-PRIMARY-ERP",
    "sourceFile": "src/recovery/manifests/JUMO-NURSERY-PRIMARY-ERP.manifest.ts",
    "sourceType": "TYPESCRIPT_MANIFEST",
    "elementType": "DEPARTMENT",
    "elementId": "DEP_PRI_ACADEMICS",
    "parentId": "DIR_PRI_ACADEMICS",
    "status": "VERIFIED",
    "evidence": "Department: Primary Studies, Curriculum & Grading"
  },
  {
    "productId": "JUMO-NURSERY-PRIMARY-ERP",
    "sourceFile": "src/recovery/manifests/JUMO-NURSERY-PRIMARY-ERP.manifest.ts",
    "sourceType": "TYPESCRIPT_MANIFEST",
    "elementType": "DEPARTMENT",
    "elementId": "DEP_NP_FINANCE",
    "parentId": "DIR_NP_FINANCE",
    "status": "VERIFIED",
    "evidence": "Department: Bursary, Tuition Invoicing & Stores"
  },
  {
    "productId": "JUMO-NURSERY-PRIMARY-ERP",
    "sourceFile": "src/recovery/manifests/JUMO-NURSERY-PRIMARY-ERP.manifest.ts",
    "sourceType": "TYPESCRIPT_MANIFEST",
    "elementType": "DEPARTMENT",
    "elementId": "DEP_NP_WELFARE",
    "parentId": "DIR_NP_WELFARE",
    "status": "VERIFIED",
    "evidence": "Department: Child Protection, Safeguarding & Welfare"
  },
  {
    "productId": "JUMO-NURSERY-PRIMARY-ERP",
    "sourceFile": "src/recovery/manifests/JUMO-NURSERY-PRIMARY-ERP.manifest.ts",
    "sourceType": "TYPESCRIPT_MANIFEST",
    "elementType": "DEPARTMENT",
    "elementId": "DEP_NP_HEALTH",
    "parentId": "DIR_NP_WELFARE",
    "status": "VERIFIED",
    "evidence": "Department: Pediatric Infirmary & Health Management"
  },
  {
    "productId": "JUMO-NURSERY-PRIMARY-ERP",
    "sourceFile": "src/recovery/manifests/JUMO-NURSERY-PRIMARY-ERP.manifest.ts",
    "sourceType": "TYPESCRIPT_MANIFEST",
    "elementType": "DEPARTMENT",
    "elementId": "DEP_NP_LOGISTICS",
    "parentId": "DIR_NP_OPERATIONS",
    "status": "VERIFIED",
    "evidence": "Department: Transport Fleet & Dining Services"
  },
  {
    "productId": "JUMO-NURSERY-PRIMARY-ERP",
    "sourceFile": "src/recovery/manifests/JUMO-NURSERY-PRIMARY-ERP.manifest.ts",
    "sourceType": "TYPESCRIPT_MANIFEST",
    "elementType": "DEPARTMENT",
    "elementId": "DEP_NP_ADMINISTRATION",
    "parentId": "DIR_NP_OPERATIONS",
    "status": "VERIFIED",
    "evidence": "Department: Teaching Staff & Human Resources"
  },
  {
    "productId": "JUMO-NURSERY-PRIMARY-ERP",
    "sourceFile": "src/recovery/manifests/JUMO-NURSERY-PRIMARY-ERP.manifest.ts",
    "sourceType": "TYPESCRIPT_MANIFEST",
    "elementType": "OFFICE",
    "elementId": "OFF_NP_HEAD",
    "parentId": "DEP_NP_EXECUTIVE",
    "status": "VERIFIED",
    "evidence": "Office: Head Teacher / Director Office Office"
  },
  {
    "productId": "JUMO-NURSERY-PRIMARY-ERP",
    "sourceFile": "src/recovery/manifests/JUMO-NURSERY-PRIMARY-ERP.manifest.ts",
    "sourceType": "TYPESCRIPT_MANIFEST",
    "elementType": "OFFICE",
    "elementId": "OFF_NP_ADMISSIONS",
    "parentId": "DEP_NP_ADMISSIONS",
    "status": "VERIFIED",
    "evidence": "Office: Consolidated Admissions Office"
  },
  {
    "productId": "JUMO-NURSERY-PRIMARY-ERP",
    "sourceFile": "src/recovery/manifests/JUMO-NURSERY-PRIMARY-ERP.manifest.ts",
    "sourceType": "TYPESCRIPT_MANIFEST",
    "elementType": "OFFICE",
    "elementId": "OFF_NP_HR",
    "parentId": "DEP_NP_ADMINISTRATION",
    "status": "VERIFIED",
    "evidence": "Office: Staff & Teacher HR Office"
  },
  {
    "productId": "JUMO-NURSERY-PRIMARY-ERP",
    "sourceFile": "src/recovery/manifests/JUMO-NURSERY-PRIMARY-ERP.manifest.ts",
    "sourceType": "TYPESCRIPT_MANIFEST",
    "elementType": "OFFICE",
    "elementId": "OFF_NP_BURSAR",
    "parentId": "DEP_NP_FINANCE",
    "status": "VERIFIED",
    "evidence": "Office: School Bursar & Finance Office"
  },
  {
    "productId": "JUMO-NURSERY-PRIMARY-ERP",
    "sourceFile": "src/recovery/manifests/JUMO-NURSERY-PRIMARY-ERP.manifest.ts",
    "sourceType": "TYPESCRIPT_MANIFEST",
    "elementType": "OFFICE",
    "elementId": "OFF_NP_STORES",
    "parentId": "DEP_NP_LOGISTICS",
    "status": "VERIFIED",
    "evidence": "Office: Stores & Procurement Office"
  },
  {
    "productId": "JUMO-NURSERY-PRIMARY-ERP",
    "sourceFile": "src/recovery/manifests/JUMO-NURSERY-PRIMARY-ERP.manifest.ts",
    "sourceType": "TYPESCRIPT_MANIFEST",
    "elementType": "OFFICE",
    "elementId": "OFF_PRI_DOS",
    "parentId": "DEP_PRI_ACADEMICS",
    "status": "VERIFIED",
    "evidence": "Office: Primary Director of Studies (DOS) Office"
  },
  {
    "productId": "JUMO-NURSERY-PRIMARY-ERP",
    "sourceFile": "src/recovery/manifests/JUMO-NURSERY-PRIMARY-ERP.manifest.ts",
    "sourceType": "TYPESCRIPT_MANIFEST",
    "elementType": "OFFICE",
    "elementId": "OFF_PRI_EXAMS",
    "parentId": "DEP_PRI_ACADEMICS",
    "status": "VERIFIED",
    "evidence": "Office: Primary Examinations Office Office"
  },
  {
    "productId": "JUMO-NURSERY-PRIMARY-ERP",
    "sourceFile": "src/recovery/manifests/JUMO-NURSERY-PRIMARY-ERP.manifest.ts",
    "sourceType": "TYPESCRIPT_MANIFEST",
    "elementType": "OFFICE",
    "elementId": "OFF_NUR_HEAD",
    "parentId": "DEP_NUR_ACADEMICS",
    "status": "VERIFIED",
    "evidence": "Office: ECD & Nursery Milestones Office"
  },
  {
    "productId": "JUMO-NURSERY-PRIMARY-ERP",
    "sourceFile": "src/recovery/manifests/JUMO-NURSERY-PRIMARY-ERP.manifest.ts",
    "sourceType": "TYPESCRIPT_MANIFEST",
    "elementType": "OFFICE",
    "elementId": "OFF_NP_CLINIC",
    "parentId": "DEP_NP_HEALTH",
    "status": "VERIFIED",
    "evidence": "Office: School Clinic & Health Office"
  },
  {
    "productId": "JUMO-NURSERY-PRIMARY-ERP",
    "sourceFile": "src/recovery/manifests/JUMO-NURSERY-PRIMARY-ERP.manifest.ts",
    "sourceType": "TYPESCRIPT_MANIFEST",
    "elementType": "OFFICE",
    "elementId": "OFF_NP_SAFEGUARDING",
    "parentId": "DEP_NP_WELFARE",
    "status": "VERIFIED",
    "evidence": "Office: Safeguarding & Welfare Office"
  },
  {
    "productId": "JUMO-NURSERY-PRIMARY-ERP",
    "sourceFile": "src/recovery/manifests/JUMO-NURSERY-PRIMARY-ERP.manifest.ts",
    "sourceType": "TYPESCRIPT_MANIFEST",
    "elementType": "OFFICE",
    "elementId": "OFF_NP_TRANSPORT",
    "parentId": "DEP_NP_LOGISTICS",
    "status": "VERIFIED",
    "evidence": "Office: School Transport & Fleet Office"
  },
  {
    "productId": "JUMO-NURSERY-PRIMARY-ERP",
    "sourceFile": "src/recovery/manifests/JUMO-NURSERY-PRIMARY-ERP.manifest.ts",
    "sourceType": "TYPESCRIPT_MANIFEST",
    "elementType": "OFFICE",
    "elementId": "OFF_NP_CATERING",
    "parentId": "DEP_NP_LOGISTICS",
    "status": "VERIFIED",
    "evidence": "Office: Dining & Catering Office"
  },
  {
    "productId": "JUMO-NURSERY-PRIMARY-ERP",
    "sourceFile": "src/products/ModulePortalRegistry.ts",
    "sourceType": "TYPESCRIPT_REGISTRY",
    "elementType": "PORTAL",
    "elementId": "PORTAL_EDU_HEAD",
    "parentId": "OFF_NP_HEAD",
    "status": "VERIFIED",
    "evidence": "Portal: Head Teacher / Director Office (/nursery-primary/head)"
  },
  {
    "productId": "JUMO-NURSERY-PRIMARY-ERP",
    "sourceFile": "src/products/ModulePortalRegistry.ts",
    "sourceType": "TYPESCRIPT_REGISTRY",
    "elementType": "PORTAL",
    "elementId": "PORTAL_EDU_ADMISSION",
    "parentId": "OFF_NP_ADMISSIONS",
    "status": "VERIFIED",
    "evidence": "Portal: Consolidated Admissions (/nursery-primary/admissions)"
  },
  {
    "productId": "JUMO-NURSERY-PRIMARY-ERP",
    "sourceFile": "src/products/ModulePortalRegistry.ts",
    "sourceType": "TYPESCRIPT_REGISTRY",
    "elementType": "PORTAL",
    "elementId": "PORTAL_EDU_HR",
    "parentId": "OFF_NP_HR",
    "status": "VERIFIED",
    "evidence": "Portal: Staff & Teacher HR (/nursery-primary/hr)"
  },
  {
    "productId": "JUMO-NURSERY-PRIMARY-ERP",
    "sourceFile": "src/products/ModulePortalRegistry.ts",
    "sourceType": "TYPESCRIPT_REGISTRY",
    "elementType": "PORTAL",
    "elementId": "PORTAL_EDU_BURSAR",
    "parentId": "OFF_NP_BURSAR",
    "status": "VERIFIED",
    "evidence": "Portal: School Bursar & Finance (/nursery-primary/bursar)"
  },
  {
    "productId": "JUMO-NURSERY-PRIMARY-ERP",
    "sourceFile": "src/products/ModulePortalRegistry.ts",
    "sourceType": "TYPESCRIPT_REGISTRY",
    "elementType": "PORTAL",
    "elementId": "PORTAL_EDU_STORES",
    "parentId": "OFF_NP_STORES",
    "status": "VERIFIED",
    "evidence": "Portal: Stores & Procurement (/nursery-primary/stores)"
  },
  {
    "productId": "JUMO-NURSERY-PRIMARY-ERP",
    "sourceFile": "src/products/ModulePortalRegistry.ts",
    "sourceType": "TYPESCRIPT_REGISTRY",
    "elementType": "PORTAL",
    "elementId": "PORTAL_PRI_DOS",
    "parentId": "OFF_PRI_DOS",
    "status": "VERIFIED",
    "evidence": "Portal: Primary Director of Studies (DOS) (/nursery-primary/dos)"
  },
  {
    "productId": "JUMO-NURSERY-PRIMARY-ERP",
    "sourceFile": "src/products/ModulePortalRegistry.ts",
    "sourceType": "TYPESCRIPT_REGISTRY",
    "elementType": "PORTAL",
    "elementId": "PORTAL_PRI_EXAMS",
    "parentId": "OFF_PRI_EXAMS",
    "status": "VERIFIED",
    "evidence": "Portal: Primary Examinations Office (/nursery-primary/exams)"
  },
  {
    "productId": "JUMO-NURSERY-PRIMARY-ERP",
    "sourceFile": "src/products/ModulePortalRegistry.ts",
    "sourceType": "TYPESCRIPT_REGISTRY",
    "elementType": "PORTAL",
    "elementId": "PORTAL_NUR_MILESTONES",
    "parentId": "OFF_NUR_HEAD",
    "status": "VERIFIED",
    "evidence": "Portal: ECD & Nursery Milestones (/nursery-primary/milestones)"
  },
  {
    "productId": "JUMO-NURSERY-PRIMARY-ERP",
    "sourceFile": "src/products/ModulePortalRegistry.ts",
    "sourceType": "TYPESCRIPT_REGISTRY",
    "elementType": "PORTAL",
    "elementId": "PORTAL_EDU_CLINIC",
    "parentId": "OFF_NP_CLINIC",
    "status": "VERIFIED",
    "evidence": "Portal: School Clinic & Health (/nursery-primary/clinic)"
  },
  {
    "productId": "JUMO-NURSERY-PRIMARY-ERP",
    "sourceFile": "src/products/ModulePortalRegistry.ts",
    "sourceType": "TYPESCRIPT_REGISTRY",
    "elementType": "PORTAL",
    "elementId": "PORTAL_EDU_WELFARE",
    "parentId": "OFF_NP_SAFEGUARDING",
    "status": "VERIFIED",
    "evidence": "Portal: Safeguarding & Welfare (/nursery-primary/safeguard)"
  },
  {
    "productId": "JUMO-NURSERY-PRIMARY-ERP",
    "sourceFile": "src/products/ModulePortalRegistry.ts",
    "sourceType": "TYPESCRIPT_REGISTRY",
    "elementType": "PORTAL",
    "elementId": "PORTAL_EDU_TRANSPORT",
    "parentId": "OFF_NP_TRANSPORT",
    "status": "VERIFIED",
    "evidence": "Portal: School Transport & Fleet (/nursery-primary/transport)"
  },
  {
    "productId": "JUMO-NURSERY-PRIMARY-ERP",
    "sourceFile": "src/products/ModulePortalRegistry.ts",
    "sourceType": "TYPESCRIPT_REGISTRY",
    "elementType": "PORTAL",
    "elementId": "PORTAL_EDU_CATERING",
    "parentId": "OFF_NP_CATERING",
    "status": "VERIFIED",
    "evidence": "Portal: Dining & Catering (/nursery-primary/catering)"
  },
  {
    "productId": "JUMO-NURSERY-PRIMARY-ERP",
    "sourceFile": "products/nursery-primary-erp/web/portals/academics-ecd/NurseryMilestonesPortal.tsx",
    "sourceType": "SOURCE_FILE",
    "elementType": "MODULE",
    "elementId": "MOD_NP_ECD_MILESTONES",
    "parentId": "JUMO-NURSERY-PRIMARY-ERP",
    "status": "VERIFIED",
    "evidence": "Module: Early Childhood Development & Milestones [NP-ECD-01]"
  },
  {
    "productId": "JUMO-NURSERY-PRIMARY-ERP",
    "sourceFile": "products/nursery-primary-erp/web/portals/academics-primary/PrimaryAcademicPortals.tsx",
    "sourceType": "SOURCE_FILE",
    "elementType": "MODULE",
    "elementId": "MOD_NP_PRIMARY_ACADEMICS",
    "parentId": "JUMO-NURSERY-PRIMARY-ERP",
    "status": "VERIFIED",
    "evidence": "Module: Primary Curriculum & Assessment [NP-PRI-01]"
  },
  {
    "productId": "JUMO-NURSERY-PRIMARY-ERP",
    "sourceFile": "products/nursery-primary-erp/web/portals/academics-primary/PrimaryDosPortal.tsx",
    "sourceType": "SOURCE_FILE",
    "elementType": "MODULE",
    "elementId": "MOD_NP_PRIMARY_DOS",
    "parentId": "JUMO-NURSERY-PRIMARY-ERP",
    "status": "VERIFIED",
    "evidence": "Module: Primary Studies & Timetabling [NP-PRI-02]"
  },
  {
    "productId": "JUMO-NURSERY-PRIMARY-ERP",
    "sourceFile": "products/nursery-primary-erp/domain/AdmissionsService.ts",
    "sourceType": "SOURCE_FILE",
    "elementType": "MODULE",
    "elementId": "MOD_NP_ADMISSIONS",
    "parentId": "JUMO-NURSERY-PRIMARY-ERP",
    "status": "VERIFIED",
    "evidence": "Module: Consolidated Student Admissions [NP-ADM-01]"
  },
  {
    "productId": "JUMO-NURSERY-PRIMARY-ERP",
    "sourceFile": "products/nursery-primary-erp/domain/NurseryPrimaryService.ts",
    "sourceType": "SOURCE_FILE",
    "elementType": "MODULE",
    "elementId": "MOD_NP_BURSARY",
    "parentId": "JUMO-NURSERY-PRIMARY-ERP",
    "status": "VERIFIED",
    "evidence": "Module: Fee Invoicing & Bursar Ledger [NP-FIN-01]"
  },
  {
    "productId": "JUMO-NURSERY-PRIMARY-ERP",
    "sourceFile": "products/nursery-primary-erp/domain/SafeguardingService.ts",
    "sourceType": "SOURCE_FILE",
    "elementType": "MODULE",
    "elementId": "MOD_NP_SAFEGUARDING",
    "parentId": "JUMO-NURSERY-PRIMARY-ERP",
    "status": "VERIFIED",
    "evidence": "Module: Child Protection & Safeguarding [NP-SAF-01]"
  },
  {
    "productId": "JUMO-NURSERY-PRIMARY-ERP",
    "sourceFile": "products/nursery-primary-erp/domain/ClinicService.ts",
    "sourceType": "SOURCE_FILE",
    "elementType": "MODULE",
    "elementId": "MOD_NP_CLINIC",
    "parentId": "JUMO-NURSERY-PRIMARY-ERP",
    "status": "VERIFIED",
    "evidence": "Module: Infirmary & Pediatric Health [NP-CLI-01]"
  },
  {
    "productId": "JUMO-NURSERY-PRIMARY-ERP",
    "sourceFile": "products/nursery-primary-erp/domain/CateringService.ts",
    "sourceType": "SOURCE_FILE",
    "elementType": "MODULE",
    "elementId": "MOD_NP_CATERING",
    "parentId": "JUMO-NURSERY-PRIMARY-ERP",
    "status": "VERIFIED",
    "evidence": "Module: Nutrition & School Dining [NP-CAT-01]"
  },
  {
    "productId": "JUMO-NURSERY-PRIMARY-ERP",
    "sourceFile": "products/nursery-primary-erp/domain/TransportService.ts",
    "sourceType": "SOURCE_FILE",
    "elementType": "MODULE",
    "elementId": "MOD_NP_TRANSPORT",
    "parentId": "JUMO-NURSERY-PRIMARY-ERP",
    "status": "VERIFIED",
    "evidence": "Module: Student Bus Routing & Tracking [NP-TRA-01]"
  },
  {
    "productId": "JUMO-NURSERY-PRIMARY-ERP",
    "sourceFile": "src/products/fintech/core/agents/FintechCapabilityRegistry.ts",
    "sourceType": "CAPABILITY_REGISTRY",
    "elementType": "CAPABILITY",
    "elementId": "CAP_NP_ECD_MILESTONES",
    "parentId": "MOD_NP_ECD_MILESTONES",
    "status": "VERIFIED",
    "evidence": "Capability: Early Childhood Development & Milestones Engine"
  },
  {
    "productId": "JUMO-NURSERY-PRIMARY-ERP",
    "sourceFile": "src/products/fintech/core/agents/FintechCapabilityRegistry.ts",
    "sourceType": "CAPABILITY_REGISTRY",
    "elementType": "CAPABILITY",
    "elementId": "CAP_NP_PRIMARY_ACADEMICS",
    "parentId": "MOD_NP_PRIMARY_ACADEMICS",
    "status": "VERIFIED",
    "evidence": "Capability: Primary Curriculum & Assessment Engine"
  },
  {
    "productId": "JUMO-NURSERY-PRIMARY-ERP",
    "sourceFile": "src/products/fintech/core/agents/FintechCapabilityRegistry.ts",
    "sourceType": "CAPABILITY_REGISTRY",
    "elementType": "CAPABILITY",
    "elementId": "CAP_NP_PRIMARY_DOS",
    "parentId": "MOD_NP_PRIMARY_DOS",
    "status": "VERIFIED",
    "evidence": "Capability: Primary Studies & Timetabling Engine"
  },
  {
    "productId": "JUMO-NURSERY-PRIMARY-ERP",
    "sourceFile": "src/products/fintech/core/agents/FintechCapabilityRegistry.ts",
    "sourceType": "CAPABILITY_REGISTRY",
    "elementType": "CAPABILITY",
    "elementId": "CAP_NP_ADMISSIONS",
    "parentId": "MOD_NP_ADMISSIONS",
    "status": "VERIFIED",
    "evidence": "Capability: Consolidated Student Admissions Engine"
  },
  {
    "productId": "JUMO-NURSERY-PRIMARY-ERP",
    "sourceFile": "src/products/fintech/core/agents/FintechCapabilityRegistry.ts",
    "sourceType": "CAPABILITY_REGISTRY",
    "elementType": "CAPABILITY",
    "elementId": "CAP_NP_BURSARY",
    "parentId": "MOD_NP_BURSARY",
    "status": "VERIFIED",
    "evidence": "Capability: Fee Invoicing & Bursar Ledger Engine"
  },
  {
    "productId": "JUMO-NURSERY-PRIMARY-ERP",
    "sourceFile": "src/products/fintech/core/agents/FintechCapabilityRegistry.ts",
    "sourceType": "CAPABILITY_REGISTRY",
    "elementType": "CAPABILITY",
    "elementId": "CAP_NP_SAFEGUARDING",
    "parentId": "MOD_NP_SAFEGUARDING",
    "status": "VERIFIED",
    "evidence": "Capability: Child Protection & Safeguarding Engine"
  },
  {
    "productId": "JUMO-NURSERY-PRIMARY-ERP",
    "sourceFile": "src/products/fintech/core/agents/FintechCapabilityRegistry.ts",
    "sourceType": "CAPABILITY_REGISTRY",
    "elementType": "CAPABILITY",
    "elementId": "CAP_NP_CLINIC",
    "parentId": "MOD_NP_CLINIC",
    "status": "VERIFIED",
    "evidence": "Capability: Infirmary & Pediatric Health Engine"
  },
  {
    "productId": "JUMO-NURSERY-PRIMARY-ERP",
    "sourceFile": "src/products/fintech/core/agents/FintechCapabilityRegistry.ts",
    "sourceType": "CAPABILITY_REGISTRY",
    "elementType": "CAPABILITY",
    "elementId": "CAP_NP_CATERING",
    "parentId": "MOD_NP_CATERING",
    "status": "VERIFIED",
    "evidence": "Capability: Nutrition & School Dining Engine"
  },
  {
    "productId": "JUMO-NURSERY-PRIMARY-ERP",
    "sourceFile": "src/products/fintech/core/agents/FintechCapabilityRegistry.ts",
    "sourceType": "CAPABILITY_REGISTRY",
    "elementType": "CAPABILITY",
    "elementId": "CAP_NP_TRANSPORT",
    "parentId": "MOD_NP_TRANSPORT",
    "status": "VERIFIED",
    "evidence": "Capability: Student Bus Routing & Tracking Engine"
  },
  {
    "productId": "JUMO-NURSERY-PRIMARY-ERP",
    "sourceFile": "src/core/enterprise/components/metadata/UniversalUIMetadataRegistry.ts",
    "sourceType": "METADATA_FABRIC",
    "elementType": "UI_METADATA",
    "elementId": "UI_NP_EDU_HEAD",
    "parentId": "CAP_NP_ECD_MILESTONES",
    "status": "VERIFIED",
    "evidence": "UI Metadata for /nursery-primary/head [PORTAL]"
  },
  {
    "productId": "JUMO-NURSERY-PRIMARY-ERP",
    "sourceFile": "src/core/enterprise/components/metadata/UniversalUIMetadataRegistry.ts",
    "sourceType": "METADATA_FABRIC",
    "elementType": "UI_METADATA",
    "elementId": "UI_NP_EDU_ADMISSION",
    "parentId": "CAP_NP_ECD_MILESTONES",
    "status": "VERIFIED",
    "evidence": "UI Metadata for /nursery-primary/admissions [PORTAL]"
  },
  {
    "productId": "JUMO-NURSERY-PRIMARY-ERP",
    "sourceFile": "src/core/enterprise/components/metadata/UniversalUIMetadataRegistry.ts",
    "sourceType": "METADATA_FABRIC",
    "elementType": "UI_METADATA",
    "elementId": "UI_NP_EDU_HR",
    "parentId": "CAP_NP_ECD_MILESTONES",
    "status": "VERIFIED",
    "evidence": "UI Metadata for /nursery-primary/hr [PORTAL]"
  },
  {
    "productId": "JUMO-NURSERY-PRIMARY-ERP",
    "sourceFile": "src/core/enterprise/components/metadata/UniversalUIMetadataRegistry.ts",
    "sourceType": "METADATA_FABRIC",
    "elementType": "UI_METADATA",
    "elementId": "UI_NP_EDU_BURSAR",
    "parentId": "CAP_NP_ECD_MILESTONES",
    "status": "VERIFIED",
    "evidence": "UI Metadata for /nursery-primary/bursar [PORTAL]"
  },
  {
    "productId": "JUMO-NURSERY-PRIMARY-ERP",
    "sourceFile": "src/core/enterprise/components/metadata/UniversalUIMetadataRegistry.ts",
    "sourceType": "METADATA_FABRIC",
    "elementType": "UI_METADATA",
    "elementId": "UI_NP_EDU_STORES",
    "parentId": "CAP_NP_ECD_MILESTONES",
    "status": "VERIFIED",
    "evidence": "UI Metadata for /nursery-primary/stores [PORTAL]"
  },
  {
    "productId": "JUMO-NURSERY-PRIMARY-ERP",
    "sourceFile": "src/core/enterprise/components/metadata/UniversalUIMetadataRegistry.ts",
    "sourceType": "METADATA_FABRIC",
    "elementType": "UI_METADATA",
    "elementId": "UI_NP_PRI_DOS",
    "parentId": "CAP_NP_ECD_MILESTONES",
    "status": "VERIFIED",
    "evidence": "UI Metadata for /nursery-primary/dos [PORTAL]"
  },
  {
    "productId": "JUMO-NURSERY-PRIMARY-ERP",
    "sourceFile": "src/core/enterprise/components/metadata/UniversalUIMetadataRegistry.ts",
    "sourceType": "METADATA_FABRIC",
    "elementType": "UI_METADATA",
    "elementId": "UI_NP_PRI_EXAMS",
    "parentId": "CAP_NP_ECD_MILESTONES",
    "status": "VERIFIED",
    "evidence": "UI Metadata for /nursery-primary/exams [PORTAL]"
  },
  {
    "productId": "JUMO-NURSERY-PRIMARY-ERP",
    "sourceFile": "src/core/enterprise/components/metadata/UniversalUIMetadataRegistry.ts",
    "sourceType": "METADATA_FABRIC",
    "elementType": "UI_METADATA",
    "elementId": "UI_NP_NUR_MILESTONES",
    "parentId": "CAP_NP_ECD_MILESTONES",
    "status": "VERIFIED",
    "evidence": "UI Metadata for /nursery-primary/milestones [PORTAL]"
  },
  {
    "productId": "JUMO-NURSERY-PRIMARY-ERP",
    "sourceFile": "src/core/enterprise/components/metadata/UniversalUIMetadataRegistry.ts",
    "sourceType": "METADATA_FABRIC",
    "elementType": "UI_METADATA",
    "elementId": "UI_NP_EDU_CLINIC",
    "parentId": "CAP_NP_ECD_MILESTONES",
    "status": "VERIFIED",
    "evidence": "UI Metadata for /nursery-primary/clinic [PORTAL]"
  },
  {
    "productId": "JUMO-NURSERY-PRIMARY-ERP",
    "sourceFile": "src/core/enterprise/components/metadata/UniversalUIMetadataRegistry.ts",
    "sourceType": "METADATA_FABRIC",
    "elementType": "UI_METADATA",
    "elementId": "UI_NP_EDU_WELFARE",
    "parentId": "CAP_NP_ECD_MILESTONES",
    "status": "VERIFIED",
    "evidence": "UI Metadata for /nursery-primary/safeguard [PORTAL]"
  },
  {
    "productId": "JUMO-NURSERY-PRIMARY-ERP",
    "sourceFile": "src/core/enterprise/components/metadata/UniversalUIMetadataRegistry.ts",
    "sourceType": "METADATA_FABRIC",
    "elementType": "UI_METADATA",
    "elementId": "UI_NP_EDU_TRANSPORT",
    "parentId": "CAP_NP_ECD_MILESTONES",
    "status": "VERIFIED",
    "evidence": "UI Metadata for /nursery-primary/transport [PORTAL]"
  },
  {
    "productId": "JUMO-NURSERY-PRIMARY-ERP",
    "sourceFile": "src/core/enterprise/components/metadata/UniversalUIMetadataRegistry.ts",
    "sourceType": "METADATA_FABRIC",
    "elementType": "UI_METADATA",
    "elementId": "UI_NP_EDU_CATERING",
    "parentId": "CAP_NP_ECD_MILESTONES",
    "status": "VERIFIED",
    "evidence": "UI Metadata for /nursery-primary/catering [PORTAL]"
  },
  {
    "productId": "JUMO-NURSERY-PRIMARY-ERP",
    "sourceFile": "src/products/nursery-primary-erp/web/NurseryPrimaryErpWebShell.tsx",
    "sourceType": "REACT_TSX_COMPONENT",
    "elementType": "RUNTIME_COMPONENT",
    "elementId": "RTC_NP_SHELL",
    "parentId": "CAP_NP_ECD_MILESTONES",
    "status": "VERIFIED",
    "evidence": "Runtime Component at src/products/nursery-primary-erp/web/NurseryPrimaryErpWebShell.tsx"
  },
  {
    "productId": "JUMO-NURSERY-PRIMARY-ERP",
    "sourceFile": "src/products/nursery-primary-erp/web/portals/academics-ecd/NurseryMilestonesPortal.tsx",
    "sourceType": "REACT_TSX_COMPONENT",
    "elementType": "RUNTIME_COMPONENT",
    "elementId": "RTC_NP_ECD",
    "parentId": "CAP_NP_ECD_MILESTONES",
    "status": "VERIFIED",
    "evidence": "Runtime Component at src/products/nursery-primary-erp/web/portals/academics-ecd/NurseryMilestonesPortal.tsx"
  },
  {
    "productId": "JUMO-NURSERY-PRIMARY-ERP",
    "sourceFile": "src/products/nursery-primary-erp/web/portals/academics-primary/PrimaryDosPortal.tsx",
    "sourceType": "REACT_TSX_COMPONENT",
    "elementType": "RUNTIME_COMPONENT",
    "elementId": "RTC_NP_PRI_DOS",
    "parentId": "CAP_NP_PRIMARY_ACADEMICS",
    "status": "VERIFIED",
    "evidence": "Runtime Component at src/products/nursery-primary-erp/web/portals/academics-primary/PrimaryDosPortal.tsx"
  },
  {
    "productId": "JUMO-NURSERY-PRIMARY-ERP",
    "sourceFile": "src/products/nursery-primary-erp/web/portals/finance/BursarPortal.tsx",
    "sourceType": "REACT_TSX_COMPONENT",
    "elementType": "RUNTIME_COMPONENT",
    "elementId": "RTC_NP_BURSAR",
    "parentId": "CAP_NP_BURSARY",
    "status": "VERIFIED",
    "evidence": "Runtime Component at src/products/nursery-primary-erp/web/portals/finance/BursarPortal.tsx"
  },
  {
    "productId": "JUMO-SECONDARY-ERP",
    "sourceFile": "src/recovery/manifests/JUMO-SECONDARY-ERP.manifest.ts",
    "sourceType": "TYPESCRIPT_MANIFEST",
    "elementType": "PRODUCT",
    "elementId": "JUMO-SECONDARY-ERP",
    "parentId": "JUMO_PLATFORM_KERNEL",
    "status": "VERIFIED",
    "evidence": "Authoritative sovereign product manifest for Secondary School ERP"
  },
  {
    "productId": "JUMO-SECONDARY-ERP",
    "sourceFile": "src/recovery/manifests/JUMO-SECONDARY-ERP.manifest.ts",
    "sourceType": "TYPESCRIPT_MANIFEST",
    "elementType": "DIRECTORATE",
    "elementId": "DIR_SEC_GOVERNANCE",
    "parentId": "JUMO-SECONDARY-ERP",
    "status": "VERIFIED",
    "evidence": "Directorate: Secondary Governance & Senate Directorate"
  },
  {
    "productId": "JUMO-SECONDARY-ERP",
    "sourceFile": "src/recovery/manifests/JUMO-SECONDARY-ERP.manifest.ts",
    "sourceType": "TYPESCRIPT_MANIFEST",
    "elementType": "DIRECTORATE",
    "elementId": "DIR_SEC_ACADEMICS",
    "parentId": "JUMO-SECONDARY-ERP",
    "status": "VERIFIED",
    "evidence": "Directorate: Secondary Academic Studies & Examinations Directorate"
  },
  {
    "productId": "JUMO-SECONDARY-ERP",
    "sourceFile": "src/recovery/manifests/JUMO-SECONDARY-ERP.manifest.ts",
    "sourceType": "TYPESCRIPT_MANIFEST",
    "elementType": "DIRECTORATE",
    "elementId": "DIR_SEC_FINANCE",
    "parentId": "JUMO-SECONDARY-ERP",
    "status": "VERIFIED",
    "evidence": "Directorate: Secondary Bursary & Procurement Directorate"
  },
  {
    "productId": "JUMO-SECONDARY-ERP",
    "sourceFile": "src/recovery/manifests/JUMO-SECONDARY-ERP.manifest.ts",
    "sourceType": "TYPESCRIPT_MANIFEST",
    "elementType": "DIRECTORATE",
    "elementId": "DIR_SEC_OPERATIONS",
    "parentId": "JUMO-SECONDARY-ERP",
    "status": "VERIFIED",
    "evidence": "Directorate: Secondary Campus Operations & Discipline Directorate"
  },
  {
    "productId": "JUMO-SECONDARY-ERP",
    "sourceFile": "src/recovery/manifests/JUMO-SECONDARY-ERP.manifest.ts",
    "sourceType": "TYPESCRIPT_MANIFEST",
    "elementType": "DEPARTMENT",
    "elementId": "DEP_SEC_EXECUTIVE",
    "parentId": "DIR_SEC_GOVERNANCE",
    "status": "VERIFIED",
    "evidence": "Department: Office of the Principal / Rector"
  },
  {
    "productId": "JUMO-SECONDARY-ERP",
    "sourceFile": "src/recovery/manifests/JUMO-SECONDARY-ERP.manifest.ts",
    "sourceType": "TYPESCRIPT_MANIFEST",
    "elementType": "DEPARTMENT",
    "elementId": "DEP_SEC_GOVERNANCE",
    "parentId": "DIR_SEC_GOVERNANCE",
    "status": "VERIFIED",
    "evidence": "Department: Academic Senate Secretariat"
  },
  {
    "productId": "JUMO-SECONDARY-ERP",
    "sourceFile": "src/recovery/manifests/JUMO-SECONDARY-ERP.manifest.ts",
    "sourceType": "TYPESCRIPT_MANIFEST",
    "elementType": "DEPARTMENT",
    "elementId": "DEP_SEC_REGISTRAR",
    "parentId": "DIR_SEC_ACADEMICS",
    "status": "VERIFIED",
    "evidence": "Department: Admissions & Student Registry"
  },
  {
    "productId": "JUMO-SECONDARY-ERP",
    "sourceFile": "src/recovery/manifests/JUMO-SECONDARY-ERP.manifest.ts",
    "sourceType": "TYPESCRIPT_MANIFEST",
    "elementType": "DEPARTMENT",
    "elementId": "DEP_SEC_ACADEMICS",
    "parentId": "DIR_SEC_ACADEMICS",
    "status": "VERIFIED",
    "evidence": "Department: Director of Studies & Departmental Heads (HOD)"
  },
  {
    "productId": "JUMO-SECONDARY-ERP",
    "sourceFile": "src/recovery/manifests/JUMO-SECONDARY-ERP.manifest.ts",
    "sourceType": "TYPESCRIPT_MANIFEST",
    "elementType": "DEPARTMENT",
    "elementId": "DEP_SEC_FINANCE",
    "parentId": "DIR_SEC_FINANCE",
    "status": "VERIFIED",
    "evidence": "Department: School Bursary & Student Invoicing"
  },
  {
    "productId": "JUMO-SECONDARY-ERP",
    "sourceFile": "src/recovery/manifests/JUMO-SECONDARY-ERP.manifest.ts",
    "sourceType": "TYPESCRIPT_MANIFEST",
    "elementType": "DEPARTMENT",
    "elementId": "DEP_SEC_LOGISTICS",
    "parentId": "DIR_SEC_OPERATIONS",
    "status": "VERIFIED",
    "evidence": "Department: Procurement, Stores & Campus Logistics"
  },
  {
    "productId": "JUMO-SECONDARY-ERP",
    "sourceFile": "src/recovery/manifests/JUMO-SECONDARY-ERP.manifest.ts",
    "sourceType": "TYPESCRIPT_MANIFEST",
    "elementType": "OFFICE",
    "elementId": "OFF_SEC_PRINCIPAL",
    "parentId": "DEP_SEC_EXECUTIVE",
    "status": "VERIFIED",
    "evidence": "Office: Principal Office Office"
  },
  {
    "productId": "JUMO-SECONDARY-ERP",
    "sourceFile": "src/recovery/manifests/JUMO-SECONDARY-ERP.manifest.ts",
    "sourceType": "TYPESCRIPT_MANIFEST",
    "elementType": "OFFICE",
    "elementId": "OFF_SEC_SENATE",
    "parentId": "DEP_SEC_GOVERNANCE",
    "status": "VERIFIED",
    "evidence": "Office: Academic Senate Office"
  },
  {
    "productId": "JUMO-SECONDARY-ERP",
    "sourceFile": "src/recovery/manifests/JUMO-SECONDARY-ERP.manifest.ts",
    "sourceType": "TYPESCRIPT_MANIFEST",
    "elementType": "OFFICE",
    "elementId": "OFF_SEC_REGISTRAR",
    "parentId": "DEP_SEC_REGISTRAR",
    "status": "VERIFIED",
    "evidence": "Office: Admissions & Registrar Office"
  },
  {
    "productId": "JUMO-SECONDARY-ERP",
    "sourceFile": "src/recovery/manifests/JUMO-SECONDARY-ERP.manifest.ts",
    "sourceType": "TYPESCRIPT_MANIFEST",
    "elementType": "OFFICE",
    "elementId": "OFF_SEC_ADMISSIONS",
    "parentId": "DEP_SEC_REGISTRAR",
    "status": "VERIFIED",
    "evidence": "Office: Direct Admissions Desk Office"
  },
  {
    "productId": "JUMO-SECONDARY-ERP",
    "sourceFile": "src/recovery/manifests/JUMO-SECONDARY-ERP.manifest.ts",
    "sourceType": "TYPESCRIPT_MANIFEST",
    "elementType": "OFFICE",
    "elementId": "OFF_SEC_DOS",
    "parentId": "DEP_SEC_ACADEMICS",
    "status": "VERIFIED",
    "evidence": "Office: Director of Studies (DOS) Office"
  },
  {
    "productId": "JUMO-SECONDARY-ERP",
    "sourceFile": "src/recovery/manifests/JUMO-SECONDARY-ERP.manifest.ts",
    "sourceType": "TYPESCRIPT_MANIFEST",
    "elementType": "OFFICE",
    "elementId": "OFF_SEC_EXAMS",
    "parentId": "DEP_SEC_ACADEMICS",
    "status": "VERIFIED",
    "evidence": "Office: Examinations Office Office"
  },
  {
    "productId": "JUMO-SECONDARY-ERP",
    "sourceFile": "src/recovery/manifests/JUMO-SECONDARY-ERP.manifest.ts",
    "sourceType": "TYPESCRIPT_MANIFEST",
    "elementType": "OFFICE",
    "elementId": "OFF_SEC_BURSAR",
    "parentId": "DEP_SEC_FINANCE",
    "status": "VERIFIED",
    "evidence": "Office: School Bursar Office"
  },
  {
    "productId": "JUMO-SECONDARY-ERP",
    "sourceFile": "src/recovery/manifests/JUMO-SECONDARY-ERP.manifest.ts",
    "sourceType": "TYPESCRIPT_MANIFEST",
    "elementType": "OFFICE",
    "elementId": "OFF_SEC_STORES",
    "parentId": "DEP_SEC_LOGISTICS",
    "status": "VERIFIED",
    "evidence": "Office: Procurement & Stores Office"
  },
  {
    "productId": "JUMO-SECONDARY-ERP",
    "sourceFile": "src/products/ModulePortalRegistry.ts",
    "sourceType": "TYPESCRIPT_REGISTRY",
    "elementType": "PORTAL",
    "elementId": "PORTAL_SEC_PRINCIPAL",
    "parentId": "OFF_SEC_PRINCIPAL",
    "status": "VERIFIED",
    "evidence": "Portal: Principal Office (/secondary/principal)"
  },
  {
    "productId": "JUMO-SECONDARY-ERP",
    "sourceFile": "src/products/ModulePortalRegistry.ts",
    "sourceType": "TYPESCRIPT_REGISTRY",
    "elementType": "PORTAL",
    "elementId": "PORTAL_SEC_SENATE",
    "parentId": "OFF_SEC_SENATE",
    "status": "VERIFIED",
    "evidence": "Portal: Academic Senate (/secondary/senate)"
  },
  {
    "productId": "JUMO-SECONDARY-ERP",
    "sourceFile": "src/products/ModulePortalRegistry.ts",
    "sourceType": "TYPESCRIPT_REGISTRY",
    "elementType": "PORTAL",
    "elementId": "PORTAL_SEC_REGISTRAR",
    "parentId": "OFF_SEC_REGISTRAR",
    "status": "VERIFIED",
    "evidence": "Portal: Admissions & Registrar (/secondary/registrar)"
  },
  {
    "productId": "JUMO-SECONDARY-ERP",
    "sourceFile": "src/products/ModulePortalRegistry.ts",
    "sourceType": "TYPESCRIPT_REGISTRY",
    "elementType": "PORTAL",
    "elementId": "PORTAL_SEC_ADMISSIONS",
    "parentId": "OFF_SEC_ADMISSIONS",
    "status": "VERIFIED",
    "evidence": "Portal: Direct Admissions Desk (/secondary/admissions)"
  },
  {
    "productId": "JUMO-SECONDARY-ERP",
    "sourceFile": "src/products/ModulePortalRegistry.ts",
    "sourceType": "TYPESCRIPT_REGISTRY",
    "elementType": "PORTAL",
    "elementId": "PORTAL_SEC_DOS",
    "parentId": "OFF_SEC_DOS",
    "status": "VERIFIED",
    "evidence": "Portal: Director of Studies (DOS) (/secondary/dos)"
  },
  {
    "productId": "JUMO-SECONDARY-ERP",
    "sourceFile": "src/products/ModulePortalRegistry.ts",
    "sourceType": "TYPESCRIPT_REGISTRY",
    "elementType": "PORTAL",
    "elementId": "PORTAL_SEC_EXAMS",
    "parentId": "OFF_SEC_EXAMS",
    "status": "VERIFIED",
    "evidence": "Portal: Examinations Office (/secondary/exams)"
  },
  {
    "productId": "JUMO-SECONDARY-ERP",
    "sourceFile": "src/products/ModulePortalRegistry.ts",
    "sourceType": "TYPESCRIPT_REGISTRY",
    "elementType": "PORTAL",
    "elementId": "PORTAL_SEC_BURSAR",
    "parentId": "OFF_SEC_BURSAR",
    "status": "VERIFIED",
    "evidence": "Portal: School Bursar (/secondary/bursar)"
  },
  {
    "productId": "JUMO-SECONDARY-ERP",
    "sourceFile": "src/products/ModulePortalRegistry.ts",
    "sourceType": "TYPESCRIPT_REGISTRY",
    "elementType": "PORTAL",
    "elementId": "PORTAL_SEC_PROC",
    "parentId": "OFF_SEC_STORES",
    "status": "VERIFIED",
    "evidence": "Portal: Procurement & Stores (/secondary/procurement)"
  },
  {
    "productId": "JUMO-SECONDARY-ERP",
    "sourceFile": "products/secondary-erp/web/portals/academics/SecondaryHodPortal.tsx",
    "sourceType": "SOURCE_FILE",
    "elementType": "MODULE",
    "elementId": "MOD_SEC_HOD",
    "parentId": "JUMO-SECONDARY-ERP",
    "status": "VERIFIED",
    "evidence": "Module: Academic Departmental Heads (HOD) [SEC-HOD-01]"
  },
  {
    "productId": "JUMO-SECONDARY-ERP",
    "sourceFile": "products/secondary-erp/web/portals/admissions/SecondaryRegistrarPortal.tsx",
    "sourceType": "SOURCE_FILE",
    "elementType": "MODULE",
    "elementId": "MOD_SEC_REGISTRAR",
    "parentId": "JUMO-SECONDARY-ERP",
    "status": "VERIFIED",
    "evidence": "Module: Secondary Registry & Matriculation [SEC-REG-01]"
  },
  {
    "productId": "JUMO-SECONDARY-ERP",
    "sourceFile": "products/secondary-erp/web/portals/finance/SecondaryBursarPortal.tsx",
    "sourceType": "SOURCE_FILE",
    "elementType": "MODULE",
    "elementId": "MOD_SEC_BURSARY",
    "parentId": "JUMO-SECONDARY-ERP",
    "status": "VERIFIED",
    "evidence": "Module: Secondary Bursar & Tuitions [SEC-FIN-01]"
  },
  {
    "productId": "JUMO-SECONDARY-ERP",
    "sourceFile": "products/secondary-erp/web/portals/governance/SecondarySenatePortal.tsx",
    "sourceType": "SOURCE_FILE",
    "elementType": "MODULE",
    "elementId": "MOD_SEC_SENATE",
    "parentId": "JUMO-SECONDARY-ERP",
    "status": "VERIFIED",
    "evidence": "Module: Secondary Academic Senate [SEC-SEN-01]"
  },
  {
    "productId": "JUMO-SECONDARY-ERP",
    "sourceFile": "products/secondary-erp/domain/SecondaryService.ts",
    "sourceType": "SOURCE_FILE",
    "elementType": "MODULE",
    "elementId": "MOD_SEC_SERVICE",
    "parentId": "JUMO-SECONDARY-ERP",
    "status": "VERIFIED",
    "evidence": "Module: Secondary Core Domain Service [SEC-SRV-01]"
  },
  {
    "productId": "JUMO-SECONDARY-ERP",
    "sourceFile": "src/products/fintech/core/agents/FintechCapabilityRegistry.ts",
    "sourceType": "CAPABILITY_REGISTRY",
    "elementType": "CAPABILITY",
    "elementId": "CAP_SEC_HOD",
    "parentId": "MOD_SEC_HOD",
    "status": "VERIFIED",
    "evidence": "Capability: Academic Departmental Heads (HOD) Engine"
  },
  {
    "productId": "JUMO-SECONDARY-ERP",
    "sourceFile": "src/products/fintech/core/agents/FintechCapabilityRegistry.ts",
    "sourceType": "CAPABILITY_REGISTRY",
    "elementType": "CAPABILITY",
    "elementId": "CAP_SEC_REGISTRAR",
    "parentId": "MOD_SEC_REGISTRAR",
    "status": "VERIFIED",
    "evidence": "Capability: Secondary Registry & Matriculation Engine"
  },
  {
    "productId": "JUMO-SECONDARY-ERP",
    "sourceFile": "src/products/fintech/core/agents/FintechCapabilityRegistry.ts",
    "sourceType": "CAPABILITY_REGISTRY",
    "elementType": "CAPABILITY",
    "elementId": "CAP_SEC_BURSARY",
    "parentId": "MOD_SEC_BURSARY",
    "status": "VERIFIED",
    "evidence": "Capability: Secondary Bursar & Tuitions Engine"
  },
  {
    "productId": "JUMO-SECONDARY-ERP",
    "sourceFile": "src/products/fintech/core/agents/FintechCapabilityRegistry.ts",
    "sourceType": "CAPABILITY_REGISTRY",
    "elementType": "CAPABILITY",
    "elementId": "CAP_SEC_SENATE",
    "parentId": "MOD_SEC_SENATE",
    "status": "VERIFIED",
    "evidence": "Capability: Secondary Academic Senate Engine"
  },
  {
    "productId": "JUMO-SECONDARY-ERP",
    "sourceFile": "src/products/fintech/core/agents/FintechCapabilityRegistry.ts",
    "sourceType": "CAPABILITY_REGISTRY",
    "elementType": "CAPABILITY",
    "elementId": "CAP_SEC_SERVICE",
    "parentId": "MOD_SEC_SERVICE",
    "status": "VERIFIED",
    "evidence": "Capability: Secondary Core Domain Service Engine"
  },
  {
    "productId": "JUMO-SECONDARY-ERP",
    "sourceFile": "src/core/enterprise/components/metadata/UniversalUIMetadataRegistry.ts",
    "sourceType": "METADATA_FABRIC",
    "elementType": "UI_METADATA",
    "elementId": "UI_SEC_PRINCIPAL",
    "parentId": "CAP_SEC_HOD",
    "status": "VERIFIED",
    "evidence": "UI Metadata for /secondary/principal [PORTAL]"
  },
  {
    "productId": "JUMO-SECONDARY-ERP",
    "sourceFile": "src/core/enterprise/components/metadata/UniversalUIMetadataRegistry.ts",
    "sourceType": "METADATA_FABRIC",
    "elementType": "UI_METADATA",
    "elementId": "UI_SEC_SENATE",
    "parentId": "CAP_SEC_HOD",
    "status": "VERIFIED",
    "evidence": "UI Metadata for /secondary/senate [PORTAL]"
  },
  {
    "productId": "JUMO-SECONDARY-ERP",
    "sourceFile": "src/core/enterprise/components/metadata/UniversalUIMetadataRegistry.ts",
    "sourceType": "METADATA_FABRIC",
    "elementType": "UI_METADATA",
    "elementId": "UI_SEC_REGISTRAR",
    "parentId": "CAP_SEC_HOD",
    "status": "VERIFIED",
    "evidence": "UI Metadata for /secondary/registrar [PORTAL]"
  },
  {
    "productId": "JUMO-SECONDARY-ERP",
    "sourceFile": "src/core/enterprise/components/metadata/UniversalUIMetadataRegistry.ts",
    "sourceType": "METADATA_FABRIC",
    "elementType": "UI_METADATA",
    "elementId": "UI_SEC_ADMISSIONS",
    "parentId": "CAP_SEC_HOD",
    "status": "VERIFIED",
    "evidence": "UI Metadata for /secondary/admissions [PORTAL]"
  },
  {
    "productId": "JUMO-SECONDARY-ERP",
    "sourceFile": "src/core/enterprise/components/metadata/UniversalUIMetadataRegistry.ts",
    "sourceType": "METADATA_FABRIC",
    "elementType": "UI_METADATA",
    "elementId": "UI_SEC_DOS",
    "parentId": "CAP_SEC_HOD",
    "status": "VERIFIED",
    "evidence": "UI Metadata for /secondary/dos [PORTAL]"
  },
  {
    "productId": "JUMO-SECONDARY-ERP",
    "sourceFile": "src/core/enterprise/components/metadata/UniversalUIMetadataRegistry.ts",
    "sourceType": "METADATA_FABRIC",
    "elementType": "UI_METADATA",
    "elementId": "UI_SEC_EXAMS",
    "parentId": "CAP_SEC_HOD",
    "status": "VERIFIED",
    "evidence": "UI Metadata for /secondary/exams [PORTAL]"
  },
  {
    "productId": "JUMO-SECONDARY-ERP",
    "sourceFile": "src/core/enterprise/components/metadata/UniversalUIMetadataRegistry.ts",
    "sourceType": "METADATA_FABRIC",
    "elementType": "UI_METADATA",
    "elementId": "UI_SEC_BURSAR",
    "parentId": "CAP_SEC_HOD",
    "status": "VERIFIED",
    "evidence": "UI Metadata for /secondary/bursar [PORTAL]"
  },
  {
    "productId": "JUMO-SECONDARY-ERP",
    "sourceFile": "src/core/enterprise/components/metadata/UniversalUIMetadataRegistry.ts",
    "sourceType": "METADATA_FABRIC",
    "elementType": "UI_METADATA",
    "elementId": "UI_SEC_PROC",
    "parentId": "CAP_SEC_HOD",
    "status": "VERIFIED",
    "evidence": "UI Metadata for /secondary/procurement [PORTAL]"
  },
  {
    "productId": "JUMO-SECONDARY-ERP",
    "sourceFile": "src/products/secondary-erp/web/SecondaryErpWebShell.tsx",
    "sourceType": "REACT_TSX_COMPONENT",
    "elementType": "RUNTIME_COMPONENT",
    "elementId": "RTC_SEC_SHELL",
    "parentId": "CAP_SEC_HOD",
    "status": "VERIFIED",
    "evidence": "Runtime Component at src/products/secondary-erp/web/SecondaryErpWebShell.tsx"
  },
  {
    "productId": "JUMO-SECONDARY-ERP",
    "sourceFile": "src/products/secondary-erp/web/portals/academics/SecondaryHodPortal.tsx",
    "sourceType": "REACT_TSX_COMPONENT",
    "elementType": "RUNTIME_COMPONENT",
    "elementId": "RTC_SEC_HOD",
    "parentId": "CAP_SEC_HOD",
    "status": "VERIFIED",
    "evidence": "Runtime Component at src/products/secondary-erp/web/portals/academics/SecondaryHodPortal.tsx"
  },
  {
    "productId": "JUMO-SECONDARY-ERP",
    "sourceFile": "src/products/secondary-erp/web/portals/admissions/SecondaryRegistrarPortal.tsx",
    "sourceType": "REACT_TSX_COMPONENT",
    "elementType": "RUNTIME_COMPONENT",
    "elementId": "RTC_SEC_REG",
    "parentId": "CAP_SEC_REGISTRAR",
    "status": "VERIFIED",
    "evidence": "Runtime Component at src/products/secondary-erp/web/portals/admissions/SecondaryRegistrarPortal.tsx"
  },
  {
    "productId": "JUMO-SECONDARY-ERP",
    "sourceFile": "src/products/secondary-erp/web/portals/finance/SecondaryBursarPortal.tsx",
    "sourceType": "REACT_TSX_COMPONENT",
    "elementType": "RUNTIME_COMPONENT",
    "elementId": "RTC_SEC_BURSAR",
    "parentId": "CAP_SEC_BURSARY",
    "status": "VERIFIED",
    "evidence": "Runtime Component at src/products/secondary-erp/web/portals/finance/SecondaryBursarPortal.tsx"
  },
  {
    "productId": "JUMO-SECONDARY-ERP",
    "sourceFile": "src/products/secondary-erp/web/portals/governance/SecondarySenatePortal.tsx",
    "sourceType": "REACT_TSX_COMPONENT",
    "elementType": "RUNTIME_COMPONENT",
    "elementId": "RTC_SEC_SENATE",
    "parentId": "CAP_SEC_SENATE",
    "status": "VERIFIED",
    "evidence": "Runtime Component at src/products/secondary-erp/web/portals/governance/SecondarySenatePortal.tsx"
  },
  {
    "productId": "JUMO-ALUMNI-ERP",
    "sourceFile": "src/recovery/manifests/JUMO-ALUMNI-ERP.manifest.ts",
    "sourceType": "TYPESCRIPT_MANIFEST",
    "elementType": "PRODUCT",
    "elementId": "JUMO-ALUMNI-ERP",
    "parentId": "JUMO_PLATFORM_KERNEL",
    "status": "VERIFIED",
    "evidence": "Authoritative sovereign product manifest for Alumni ERP"
  },
  {
    "productId": "JUMO-ALUMNI-ERP",
    "sourceFile": "src/recovery/manifests/JUMO-ALUMNI-ERP.manifest.ts",
    "sourceType": "TYPESCRIPT_MANIFEST",
    "elementType": "DIRECTORATE",
    "elementId": "DIR_ALUM_GOVERNANCE",
    "parentId": "JUMO-ALUMNI-ERP",
    "status": "VERIFIED",
    "evidence": "Directorate: Alumni Governance & Board Directorate"
  },
  {
    "productId": "JUMO-ALUMNI-ERP",
    "sourceFile": "src/recovery/manifests/JUMO-ALUMNI-ERP.manifest.ts",
    "sourceType": "TYPESCRIPT_MANIFEST",
    "elementType": "DIRECTORATE",
    "elementId": "DIR_ALUM_ADVANCEMENT",
    "parentId": "JUMO-ALUMNI-ERP",
    "status": "VERIFIED",
    "evidence": "Directorate: Advancement, Records & Chapters Directorate"
  },
  {
    "productId": "JUMO-ALUMNI-ERP",
    "sourceFile": "src/recovery/manifests/JUMO-ALUMNI-ERP.manifest.ts",
    "sourceType": "TYPESCRIPT_MANIFEST",
    "elementType": "DIRECTORATE",
    "elementId": "DIR_ALUM_FINANCE",
    "parentId": "JUMO-ALUMNI-ERP",
    "status": "VERIFIED",
    "evidence": "Directorate: Endowment, Giving & Treasury Directorate"
  },
  {
    "productId": "JUMO-ALUMNI-ERP",
    "sourceFile": "src/recovery/manifests/JUMO-ALUMNI-ERP.manifest.ts",
    "sourceType": "TYPESCRIPT_MANIFEST",
    "elementType": "DIRECTORATE",
    "elementId": "DIR_ALUM_PROGRAMS",
    "parentId": "JUMO-ALUMNI-ERP",
    "status": "VERIFIED",
    "evidence": "Directorate: Career Services & Alumni Programs Directorate"
  },
  {
    "productId": "JUMO-ALUMNI-ERP",
    "sourceFile": "src/recovery/manifests/JUMO-ALUMNI-ERP.manifest.ts",
    "sourceType": "TYPESCRIPT_MANIFEST",
    "elementType": "DEPARTMENT",
    "elementId": "DEP_ALUM_EXECUTIVE",
    "parentId": "DIR_ALUM_GOVERNANCE",
    "status": "VERIFIED",
    "evidence": "Department: Office of the Alumni Director"
  },
  {
    "productId": "JUMO-ALUMNI-ERP",
    "sourceFile": "src/recovery/manifests/JUMO-ALUMNI-ERP.manifest.ts",
    "sourceType": "TYPESCRIPT_MANIFEST",
    "elementType": "DEPARTMENT",
    "elementId": "DEP_ALUM_GOVERNANCE",
    "parentId": "DIR_ALUM_GOVERNANCE",
    "status": "VERIFIED",
    "evidence": "Department: Association Board & Committees"
  },
  {
    "productId": "JUMO-ALUMNI-ERP",
    "sourceFile": "src/recovery/manifests/JUMO-ALUMNI-ERP.manifest.ts",
    "sourceType": "TYPESCRIPT_MANIFEST",
    "elementType": "DEPARTMENT",
    "elementId": "DEP_ALUM_RECORDS",
    "parentId": "DIR_ALUM_ADVANCEMENT",
    "status": "VERIFIED",
    "evidence": "Department: Graduate Records & Census Verification"
  },
  {
    "productId": "JUMO-ALUMNI-ERP",
    "sourceFile": "src/recovery/manifests/JUMO-ALUMNI-ERP.manifest.ts",
    "sourceType": "TYPESCRIPT_MANIFEST",
    "elementType": "DEPARTMENT",
    "elementId": "DEP_ALUM_CHAPTERS",
    "parentId": "DIR_ALUM_ADVANCEMENT",
    "status": "VERIFIED",
    "evidence": "Department: Global Chapters & Diaspora Networks"
  },
  {
    "productId": "JUMO-ALUMNI-ERP",
    "sourceFile": "src/recovery/manifests/JUMO-ALUMNI-ERP.manifest.ts",
    "sourceType": "TYPESCRIPT_MANIFEST",
    "elementType": "DEPARTMENT",
    "elementId": "DEP_ALUM_ENGAGEMENT",
    "parentId": "DIR_ALUM_ADVANCEMENT",
    "status": "VERIFIED",
    "evidence": "Department: Alumni Relations & Reunions"
  },
  {
    "productId": "JUMO-ALUMNI-ERP",
    "sourceFile": "src/recovery/manifests/JUMO-ALUMNI-ERP.manifest.ts",
    "sourceType": "TYPESCRIPT_MANIFEST",
    "elementType": "DEPARTMENT",
    "elementId": "DEP_ALUM_COMMUNICATIONS",
    "parentId": "DIR_ALUM_ADVANCEMENT",
    "status": "VERIFIED",
    "evidence": "Department: Publications & Public Relations"
  },
  {
    "productId": "JUMO-ALUMNI-ERP",
    "sourceFile": "src/recovery/manifests/JUMO-ALUMNI-ERP.manifest.ts",
    "sourceType": "TYPESCRIPT_MANIFEST",
    "elementType": "DEPARTMENT",
    "elementId": "DEP_ALUM_FINANCE",
    "parentId": "DIR_ALUM_FINANCE",
    "status": "VERIFIED",
    "evidence": "Department: Endowment Fund & Major Giving Campaigns"
  },
  {
    "productId": "JUMO-ALUMNI-ERP",
    "sourceFile": "src/recovery/manifests/JUMO-ALUMNI-ERP.manifest.ts",
    "sourceType": "TYPESCRIPT_MANIFEST",
    "elementType": "DEPARTMENT",
    "elementId": "DEP_ALUM_PROGRAMS",
    "parentId": "DIR_ALUM_PROGRAMS",
    "status": "VERIFIED",
    "evidence": "Department: Career Mentorship & Networking"
  },
  {
    "productId": "JUMO-ALUMNI-ERP",
    "sourceFile": "src/recovery/manifests/JUMO-ALUMNI-ERP.manifest.ts",
    "sourceType": "TYPESCRIPT_MANIFEST",
    "elementType": "OFFICE",
    "elementId": "OFF_ALUM_DIR",
    "parentId": "DEP_ALUM_EXECUTIVE",
    "status": "VERIFIED",
    "evidence": "Office: Alumni Director Office Office"
  },
  {
    "productId": "JUMO-ALUMNI-ERP",
    "sourceFile": "src/recovery/manifests/JUMO-ALUMNI-ERP.manifest.ts",
    "sourceType": "TYPESCRIPT_MANIFEST",
    "elementType": "OFFICE",
    "elementId": "OFF_ALUM_BOARD",
    "parentId": "DEP_ALUM_GOVERNANCE",
    "status": "VERIFIED",
    "evidence": "Office: Association Board Office"
  },
  {
    "productId": "JUMO-ALUMNI-ERP",
    "sourceFile": "src/recovery/manifests/JUMO-ALUMNI-ERP.manifest.ts",
    "sourceType": "TYPESCRIPT_MANIFEST",
    "elementType": "OFFICE",
    "elementId": "OFF_ALUM_REGISTRAR",
    "parentId": "DEP_ALUM_RECORDS",
    "status": "VERIFIED",
    "evidence": "Office: Graduate Records & Census Office"
  },
  {
    "productId": "JUMO-ALUMNI-ERP",
    "sourceFile": "src/recovery/manifests/JUMO-ALUMNI-ERP.manifest.ts",
    "sourceType": "TYPESCRIPT_MANIFEST",
    "elementType": "OFFICE",
    "elementId": "OFF_ALUM_CHAPTERS",
    "parentId": "DEP_ALUM_CHAPTERS",
    "status": "VERIFIED",
    "evidence": "Office: Global Chapters Network Office"
  },
  {
    "productId": "JUMO-ALUMNI-ERP",
    "sourceFile": "src/recovery/manifests/JUMO-ALUMNI-ERP.manifest.ts",
    "sourceType": "TYPESCRIPT_MANIFEST",
    "elementType": "OFFICE",
    "elementId": "OFF_ALUM_ENGAGE",
    "parentId": "DEP_ALUM_ENGAGEMENT",
    "status": "VERIFIED",
    "evidence": "Office: Engagement & Reunion Office"
  },
  {
    "productId": "JUMO-ALUMNI-ERP",
    "sourceFile": "src/recovery/manifests/JUMO-ALUMNI-ERP.manifest.ts",
    "sourceType": "TYPESCRIPT_MANIFEST",
    "elementType": "OFFICE",
    "elementId": "OFF_ALUM_COMM",
    "parentId": "DEP_ALUM_COMMUNICATIONS",
    "status": "VERIFIED",
    "evidence": "Office: Alumni Communications Office"
  },
  {
    "productId": "JUMO-ALUMNI-ERP",
    "sourceFile": "src/recovery/manifests/JUMO-ALUMNI-ERP.manifest.ts",
    "sourceType": "TYPESCRIPT_MANIFEST",
    "elementType": "OFFICE",
    "elementId": "OFF_ALUM_ENDOWMENT",
    "parentId": "DEP_ALUM_FINANCE",
    "status": "VERIFIED",
    "evidence": "Office: Endowment Fund Management Office"
  },
  {
    "productId": "JUMO-ALUMNI-ERP",
    "sourceFile": "src/recovery/manifests/JUMO-ALUMNI-ERP.manifest.ts",
    "sourceType": "TYPESCRIPT_MANIFEST",
    "elementType": "OFFICE",
    "elementId": "OFF_ALUM_GIVING",
    "parentId": "DEP_ALUM_FINANCE",
    "status": "VERIFIED",
    "evidence": "Office: Annual Giving Campaigns Office"
  },
  {
    "productId": "JUMO-ALUMNI-ERP",
    "sourceFile": "src/recovery/manifests/JUMO-ALUMNI-ERP.manifest.ts",
    "sourceType": "TYPESCRIPT_MANIFEST",
    "elementType": "OFFICE",
    "elementId": "OFF_ALUM_TREASURY",
    "parentId": "DEP_ALUM_FINANCE",
    "status": "VERIFIED",
    "evidence": "Office: Contribution Reconciliation Office"
  },
  {
    "productId": "JUMO-ALUMNI-ERP",
    "sourceFile": "src/recovery/manifests/JUMO-ALUMNI-ERP.manifest.ts",
    "sourceType": "TYPESCRIPT_MANIFEST",
    "elementType": "OFFICE",
    "elementId": "OFF_ALUM_CAREER",
    "parentId": "DEP_ALUM_PROGRAMS",
    "status": "VERIFIED",
    "evidence": "Office: Career & Mentorship Hub Office"
  },
  {
    "productId": "JUMO-ALUMNI-ERP",
    "sourceFile": "src/recovery/manifests/JUMO-ALUMNI-ERP.manifest.ts",
    "sourceType": "TYPESCRIPT_MANIFEST",
    "elementType": "OFFICE",
    "elementId": "OFF_ALUM_COMMUNITY",
    "parentId": "DEP_ALUM_PROGRAMS",
    "status": "VERIFIED",
    "evidence": "Office: Community & Class Groups Office"
  },
  {
    "productId": "JUMO-ALUMNI-ERP",
    "sourceFile": "src/recovery/manifests/JUMO-ALUMNI-ERP.manifest.ts",
    "sourceType": "TYPESCRIPT_MANIFEST",
    "elementType": "OFFICE",
    "elementId": "OFF_ALUM_EVENTS",
    "parentId": "DEP_ALUM_PROGRAMS",
    "status": "VERIFIED",
    "evidence": "Office: Events & Galas Office"
  },
  {
    "productId": "JUMO-ALUMNI-ERP",
    "sourceFile": "src/products/ModulePortalRegistry.ts",
    "sourceType": "TYPESCRIPT_REGISTRY",
    "elementType": "PORTAL",
    "elementId": "PORTAL_ALUM_DIR",
    "parentId": "OFF_ALUM_DIR",
    "status": "VERIFIED",
    "evidence": "Portal: Alumni Director Office (/alumni/director)"
  },
  {
    "productId": "JUMO-ALUMNI-ERP",
    "sourceFile": "src/products/ModulePortalRegistry.ts",
    "sourceType": "TYPESCRIPT_REGISTRY",
    "elementType": "PORTAL",
    "elementId": "PORTAL_ALUM_BOARD",
    "parentId": "OFF_ALUM_BOARD",
    "status": "VERIFIED",
    "evidence": "Portal: Association Board (/alumni/board)"
  },
  {
    "productId": "JUMO-ALUMNI-ERP",
    "sourceFile": "src/products/ModulePortalRegistry.ts",
    "sourceType": "TYPESCRIPT_REGISTRY",
    "elementType": "PORTAL",
    "elementId": "PORTAL_ALUM_REGISTRAR",
    "parentId": "OFF_ALUM_REGISTRAR",
    "status": "VERIFIED",
    "evidence": "Portal: Graduate Records & Census (/alumni/records)"
  },
  {
    "productId": "JUMO-ALUMNI-ERP",
    "sourceFile": "src/products/ModulePortalRegistry.ts",
    "sourceType": "TYPESCRIPT_REGISTRY",
    "elementType": "PORTAL",
    "elementId": "PORTAL_ALUM_CHAPTERS",
    "parentId": "OFF_ALUM_CHAPTERS",
    "status": "VERIFIED",
    "evidence": "Portal: Global Chapters Network (/alumni/chapters)"
  },
  {
    "productId": "JUMO-ALUMNI-ERP",
    "sourceFile": "src/products/ModulePortalRegistry.ts",
    "sourceType": "TYPESCRIPT_REGISTRY",
    "elementType": "PORTAL",
    "elementId": "PORTAL_ALUM_ENGAGE",
    "parentId": "OFF_ALUM_ENGAGE",
    "status": "VERIFIED",
    "evidence": "Portal: Engagement & Reunion (/alumni/engagement)"
  },
  {
    "productId": "JUMO-ALUMNI-ERP",
    "sourceFile": "src/products/ModulePortalRegistry.ts",
    "sourceType": "TYPESCRIPT_REGISTRY",
    "elementType": "PORTAL",
    "elementId": "PORTAL_ALUM_COMM",
    "parentId": "OFF_ALUM_COMM",
    "status": "VERIFIED",
    "evidence": "Portal: Alumni Communications (/alumni/comm)"
  },
  {
    "productId": "JUMO-ALUMNI-ERP",
    "sourceFile": "src/products/ModulePortalRegistry.ts",
    "sourceType": "TYPESCRIPT_REGISTRY",
    "elementType": "PORTAL",
    "elementId": "PORTAL_ALUM_FUND",
    "parentId": "OFF_ALUM_ENDOWMENT",
    "status": "VERIFIED",
    "evidence": "Portal: Endowment Fund Management (/alumni/endowment)"
  },
  {
    "productId": "JUMO-ALUMNI-ERP",
    "sourceFile": "src/products/ModulePortalRegistry.ts",
    "sourceType": "TYPESCRIPT_REGISTRY",
    "elementType": "PORTAL",
    "elementId": "PORTAL_ALUM_GIVING",
    "parentId": "OFF_ALUM_GIVING",
    "status": "VERIFIED",
    "evidence": "Portal: Annual Giving Campaigns (/alumni/giving)"
  },
  {
    "productId": "JUMO-ALUMNI-ERP",
    "sourceFile": "src/products/ModulePortalRegistry.ts",
    "sourceType": "TYPESCRIPT_REGISTRY",
    "elementType": "PORTAL",
    "elementId": "PORTAL_ALUM_RECONCILE",
    "parentId": "OFF_ALUM_TREASURY",
    "status": "VERIFIED",
    "evidence": "Portal: Contribution Reconciliation (/alumni/reconciliation)"
  },
  {
    "productId": "JUMO-ALUMNI-ERP",
    "sourceFile": "src/products/ModulePortalRegistry.ts",
    "sourceType": "TYPESCRIPT_REGISTRY",
    "elementType": "PORTAL",
    "elementId": "PORTAL_ALUM_CAREER",
    "parentId": "OFF_ALUM_CAREER",
    "status": "VERIFIED",
    "evidence": "Portal: Career & Mentorship Hub (/alumni/career)"
  },
  {
    "productId": "JUMO-ALUMNI-ERP",
    "sourceFile": "src/products/ModulePortalRegistry.ts",
    "sourceType": "TYPESCRIPT_REGISTRY",
    "elementType": "PORTAL",
    "elementId": "PORTAL_ALUM_COMMUNITY",
    "parentId": "OFF_ALUM_COMMUNITY",
    "status": "VERIFIED",
    "evidence": "Portal: Community & Class Groups (/alumni/community)"
  },
  {
    "productId": "JUMO-ALUMNI-ERP",
    "sourceFile": "src/products/ModulePortalRegistry.ts",
    "sourceType": "TYPESCRIPT_REGISTRY",
    "elementType": "PORTAL",
    "elementId": "PORTAL_ALUM_EVENTS",
    "parentId": "OFF_ALUM_EVENTS",
    "status": "VERIFIED",
    "evidence": "Portal: Events & Galas (/alumni/events)"
  },
  {
    "productId": "JUMO-ALUMNI-ERP",
    "sourceFile": "products/alumni-erp/web/modules/AlumniRegistryModule.tsx",
    "sourceType": "SOURCE_FILE",
    "elementType": "MODULE",
    "elementId": "MOD_ALUM_REGISTRY",
    "parentId": "JUMO-ALUMNI-ERP",
    "status": "VERIFIED",
    "evidence": "Module: Alumni Census & Graduate Registry [ALUM-REG-01]"
  },
  {
    "productId": "JUMO-ALUMNI-ERP",
    "sourceFile": "products/alumni-erp/web/modules/AlumniGivingModule.tsx",
    "sourceType": "SOURCE_FILE",
    "elementType": "MODULE",
    "elementId": "MOD_ALUM_GIVING",
    "parentId": "JUMO-ALUMNI-ERP",
    "status": "VERIFIED",
    "evidence": "Module: Giving Campaigns & Endowments [ALUM-GIV-01]"
  },
  {
    "productId": "JUMO-ALUMNI-ERP",
    "sourceFile": "products/alumni-erp/web/modules/AlumniChaptersModule.tsx",
    "sourceType": "SOURCE_FILE",
    "elementType": "MODULE",
    "elementId": "MOD_ALUM_CHAPTERS",
    "parentId": "JUMO-ALUMNI-ERP",
    "status": "VERIFIED",
    "evidence": "Module: Global Chapters & Diaspora Network [ALUM-CHP-01]"
  },
  {
    "productId": "JUMO-ALUMNI-ERP",
    "sourceFile": "products/alumni-erp/web/modules/AlumniCareerModule.tsx",
    "sourceType": "SOURCE_FILE",
    "elementType": "MODULE",
    "elementId": "MOD_ALUM_CAREER",
    "parentId": "JUMO-ALUMNI-ERP",
    "status": "VERIFIED",
    "evidence": "Module: Career Services & Mentorship [ALUM-CAR-01]"
  },
  {
    "productId": "JUMO-ALUMNI-ERP",
    "sourceFile": "products/alumni-erp/web/modules/AlumniDashboard.tsx",
    "sourceType": "SOURCE_FILE",
    "elementType": "MODULE",
    "elementId": "MOD_ALUM_DASHBOARD",
    "parentId": "JUMO-ALUMNI-ERP",
    "status": "VERIFIED",
    "evidence": "Module: Alumni Intelligence Dashboard [ALUM-DSH-01]"
  },
  {
    "productId": "JUMO-ALUMNI-ERP",
    "sourceFile": "src/products/fintech/core/agents/FintechCapabilityRegistry.ts",
    "sourceType": "CAPABILITY_REGISTRY",
    "elementType": "CAPABILITY",
    "elementId": "CAP_ALUM_REGISTRY",
    "parentId": "MOD_ALUM_REGISTRY",
    "status": "VERIFIED",
    "evidence": "Capability: Alumni Census & Graduate Registry Engine"
  },
  {
    "productId": "JUMO-ALUMNI-ERP",
    "sourceFile": "src/products/fintech/core/agents/FintechCapabilityRegistry.ts",
    "sourceType": "CAPABILITY_REGISTRY",
    "elementType": "CAPABILITY",
    "elementId": "CAP_ALUM_GIVING",
    "parentId": "MOD_ALUM_GIVING",
    "status": "VERIFIED",
    "evidence": "Capability: Giving Campaigns & Endowments Engine"
  },
  {
    "productId": "JUMO-ALUMNI-ERP",
    "sourceFile": "src/products/fintech/core/agents/FintechCapabilityRegistry.ts",
    "sourceType": "CAPABILITY_REGISTRY",
    "elementType": "CAPABILITY",
    "elementId": "CAP_ALUM_CHAPTERS",
    "parentId": "MOD_ALUM_CHAPTERS",
    "status": "VERIFIED",
    "evidence": "Capability: Global Chapters & Diaspora Network Engine"
  },
  {
    "productId": "JUMO-ALUMNI-ERP",
    "sourceFile": "src/products/fintech/core/agents/FintechCapabilityRegistry.ts",
    "sourceType": "CAPABILITY_REGISTRY",
    "elementType": "CAPABILITY",
    "elementId": "CAP_ALUM_CAREER",
    "parentId": "MOD_ALUM_CAREER",
    "status": "VERIFIED",
    "evidence": "Capability: Career Services & Mentorship Engine"
  },
  {
    "productId": "JUMO-ALUMNI-ERP",
    "sourceFile": "src/products/fintech/core/agents/FintechCapabilityRegistry.ts",
    "sourceType": "CAPABILITY_REGISTRY",
    "elementType": "CAPABILITY",
    "elementId": "CAP_ALUM_DASHBOARD",
    "parentId": "MOD_ALUM_DASHBOARD",
    "status": "VERIFIED",
    "evidence": "Capability: Alumni Intelligence Dashboard Engine"
  },
  {
    "productId": "JUMO-ALUMNI-ERP",
    "sourceFile": "src/core/enterprise/components/metadata/UniversalUIMetadataRegistry.ts",
    "sourceType": "METADATA_FABRIC",
    "elementType": "UI_METADATA",
    "elementId": "UI_ALUM_DIR",
    "parentId": "CAP_ALUM_REGISTRY",
    "status": "VERIFIED",
    "evidence": "UI Metadata for /alumni/director [PORTAL]"
  },
  {
    "productId": "JUMO-ALUMNI-ERP",
    "sourceFile": "src/core/enterprise/components/metadata/UniversalUIMetadataRegistry.ts",
    "sourceType": "METADATA_FABRIC",
    "elementType": "UI_METADATA",
    "elementId": "UI_ALUM_BOARD",
    "parentId": "CAP_ALUM_REGISTRY",
    "status": "VERIFIED",
    "evidence": "UI Metadata for /alumni/board [PORTAL]"
  },
  {
    "productId": "JUMO-ALUMNI-ERP",
    "sourceFile": "src/core/enterprise/components/metadata/UniversalUIMetadataRegistry.ts",
    "sourceType": "METADATA_FABRIC",
    "elementType": "UI_METADATA",
    "elementId": "UI_ALUM_REGISTRAR",
    "parentId": "CAP_ALUM_REGISTRY",
    "status": "VERIFIED",
    "evidence": "UI Metadata for /alumni/records [PORTAL]"
  },
  {
    "productId": "JUMO-ALUMNI-ERP",
    "sourceFile": "src/core/enterprise/components/metadata/UniversalUIMetadataRegistry.ts",
    "sourceType": "METADATA_FABRIC",
    "elementType": "UI_METADATA",
    "elementId": "UI_ALUM_CHAPTERS",
    "parentId": "CAP_ALUM_REGISTRY",
    "status": "VERIFIED",
    "evidence": "UI Metadata for /alumni/chapters [PORTAL]"
  },
  {
    "productId": "JUMO-ALUMNI-ERP",
    "sourceFile": "src/core/enterprise/components/metadata/UniversalUIMetadataRegistry.ts",
    "sourceType": "METADATA_FABRIC",
    "elementType": "UI_METADATA",
    "elementId": "UI_ALUM_ENGAGE",
    "parentId": "CAP_ALUM_REGISTRY",
    "status": "VERIFIED",
    "evidence": "UI Metadata for /alumni/engagement [PORTAL]"
  },
  {
    "productId": "JUMO-ALUMNI-ERP",
    "sourceFile": "src/core/enterprise/components/metadata/UniversalUIMetadataRegistry.ts",
    "sourceType": "METADATA_FABRIC",
    "elementType": "UI_METADATA",
    "elementId": "UI_ALUM_COMM",
    "parentId": "CAP_ALUM_REGISTRY",
    "status": "VERIFIED",
    "evidence": "UI Metadata for /alumni/comm [PORTAL]"
  },
  {
    "productId": "JUMO-ALUMNI-ERP",
    "sourceFile": "src/core/enterprise/components/metadata/UniversalUIMetadataRegistry.ts",
    "sourceType": "METADATA_FABRIC",
    "elementType": "UI_METADATA",
    "elementId": "UI_ALUM_FUND",
    "parentId": "CAP_ALUM_REGISTRY",
    "status": "VERIFIED",
    "evidence": "UI Metadata for /alumni/endowment [PORTAL]"
  },
  {
    "productId": "JUMO-ALUMNI-ERP",
    "sourceFile": "src/core/enterprise/components/metadata/UniversalUIMetadataRegistry.ts",
    "sourceType": "METADATA_FABRIC",
    "elementType": "UI_METADATA",
    "elementId": "UI_ALUM_GIVING",
    "parentId": "CAP_ALUM_REGISTRY",
    "status": "VERIFIED",
    "evidence": "UI Metadata for /alumni/giving [PORTAL]"
  },
  {
    "productId": "JUMO-ALUMNI-ERP",
    "sourceFile": "src/core/enterprise/components/metadata/UniversalUIMetadataRegistry.ts",
    "sourceType": "METADATA_FABRIC",
    "elementType": "UI_METADATA",
    "elementId": "UI_ALUM_RECONCILE",
    "parentId": "CAP_ALUM_REGISTRY",
    "status": "VERIFIED",
    "evidence": "UI Metadata for /alumni/reconciliation [PORTAL]"
  },
  {
    "productId": "JUMO-ALUMNI-ERP",
    "sourceFile": "src/core/enterprise/components/metadata/UniversalUIMetadataRegistry.ts",
    "sourceType": "METADATA_FABRIC",
    "elementType": "UI_METADATA",
    "elementId": "UI_ALUM_CAREER",
    "parentId": "CAP_ALUM_REGISTRY",
    "status": "VERIFIED",
    "evidence": "UI Metadata for /alumni/career [PORTAL]"
  },
  {
    "productId": "JUMO-ALUMNI-ERP",
    "sourceFile": "src/core/enterprise/components/metadata/UniversalUIMetadataRegistry.ts",
    "sourceType": "METADATA_FABRIC",
    "elementType": "UI_METADATA",
    "elementId": "UI_ALUM_COMMUNITY",
    "parentId": "CAP_ALUM_REGISTRY",
    "status": "VERIFIED",
    "evidence": "UI Metadata for /alumni/community [PORTAL]"
  },
  {
    "productId": "JUMO-ALUMNI-ERP",
    "sourceFile": "src/core/enterprise/components/metadata/UniversalUIMetadataRegistry.ts",
    "sourceType": "METADATA_FABRIC",
    "elementType": "UI_METADATA",
    "elementId": "UI_ALUM_EVENTS",
    "parentId": "CAP_ALUM_REGISTRY",
    "status": "VERIFIED",
    "evidence": "UI Metadata for /alumni/events [PORTAL]"
  },
  {
    "productId": "JUMO-ALUMNI-ERP",
    "sourceFile": "src/products/alumni-erp/web/AlumniErpWebShell.tsx",
    "sourceType": "REACT_TSX_COMPONENT",
    "elementType": "RUNTIME_COMPONENT",
    "elementId": "RTC_ALUM_SHELL",
    "parentId": "CAP_ALUM_REGISTRY",
    "status": "VERIFIED",
    "evidence": "Runtime Component at src/products/alumni-erp/web/AlumniErpWebShell.tsx"
  },
  {
    "productId": "JUMO-ALUMNI-ERP",
    "sourceFile": "src/products/alumni-erp/web/modules/AlumniRegistryModule.tsx",
    "sourceType": "REACT_TSX_COMPONENT",
    "elementType": "RUNTIME_COMPONENT",
    "elementId": "RTC_ALUM_REG",
    "parentId": "CAP_ALUM_REGISTRY",
    "status": "VERIFIED",
    "evidence": "Runtime Component at src/products/alumni-erp/web/modules/AlumniRegistryModule.tsx"
  },
  {
    "productId": "JUMO-ALUMNI-ERP",
    "sourceFile": "src/products/alumni-erp/web/modules/AlumniGivingModule.tsx",
    "sourceType": "REACT_TSX_COMPONENT",
    "elementType": "RUNTIME_COMPONENT",
    "elementId": "RTC_ALUM_GIV",
    "parentId": "CAP_ALUM_GIVING",
    "status": "VERIFIED",
    "evidence": "Runtime Component at src/products/alumni-erp/web/modules/AlumniGivingModule.tsx"
  },
  {
    "productId": "JUMO-ALUMNI-ERP",
    "sourceFile": "src/products/alumni-erp/web/modules/AlumniChaptersModule.tsx",
    "sourceType": "REACT_TSX_COMPONENT",
    "elementType": "RUNTIME_COMPONENT",
    "elementId": "RTC_ALUM_CHP",
    "parentId": "CAP_ALUM_CHAPTERS",
    "status": "VERIFIED",
    "evidence": "Runtime Component at src/products/alumni-erp/web/modules/AlumniChaptersModule.tsx"
  },
  {
    "productId": "JUMO-ALUMNI-ERP",
    "sourceFile": "src/products/alumni-erp/web/modules/AlumniCareerModule.tsx",
    "sourceType": "REACT_TSX_COMPONENT",
    "elementType": "RUNTIME_COMPONENT",
    "elementId": "RTC_ALUM_CAR",
    "parentId": "CAP_ALUM_CAREER",
    "status": "VERIFIED",
    "evidence": "Runtime Component at src/products/alumni-erp/web/modules/AlumniCareerModule.tsx"
  },
  {
    "productId": "JUMO-CHURCH-ERP",
    "sourceFile": "src/recovery/manifests/JUMO-CHURCH-ERP.manifest.ts",
    "sourceType": "TYPESCRIPT_MANIFEST",
    "elementType": "PRODUCT",
    "elementId": "JUMO-CHURCH-ERP",
    "parentId": "JUMO_PLATFORM_KERNEL",
    "status": "VERIFIED",
    "evidence": "Authoritative sovereign product manifest for Church ERP"
  },
  {
    "productId": "JUMO-CHURCH-ERP",
    "sourceFile": "src/recovery/manifests/JUMO-CHURCH-ERP.manifest.ts",
    "sourceType": "TYPESCRIPT_MANIFEST",
    "elementType": "DIRECTORATE",
    "elementId": "DIR_CH_ECCLESIASTICAL",
    "parentId": "JUMO-CHURCH-ERP",
    "status": "VERIFIED",
    "evidence": "Directorate: Ecclesiastical Governance & Chancery Directorate"
  },
  {
    "productId": "JUMO-CHURCH-ERP",
    "sourceFile": "src/recovery/manifests/JUMO-CHURCH-ERP.manifest.ts",
    "sourceType": "TYPESCRIPT_MANIFEST",
    "elementType": "DIRECTORATE",
    "elementId": "DIR_CH_PARISH",
    "parentId": "JUMO-CHURCH-ERP",
    "status": "VERIFIED",
    "evidence": "Directorate: Parish Pastoral & Sacramental Directorate"
  },
  {
    "productId": "JUMO-CHURCH-ERP",
    "sourceFile": "src/recovery/manifests/JUMO-CHURCH-ERP.manifest.ts",
    "sourceType": "TYPESCRIPT_MANIFEST",
    "elementType": "DIRECTORATE",
    "elementId": "DIR_CH_MINISTRY",
    "parentId": "JUMO-CHURCH-ERP",
    "status": "VERIFIED",
    "evidence": "Directorate: Congregation Ministry & Welfare Directorate"
  },
  {
    "productId": "JUMO-CHURCH-ERP",
    "sourceFile": "src/recovery/manifests/JUMO-CHURCH-ERP.manifest.ts",
    "sourceType": "TYPESCRIPT_MANIFEST",
    "elementType": "DIRECTORATE",
    "elementId": "DIR_CH_FINANCE",
    "parentId": "JUMO-CHURCH-ERP",
    "status": "VERIFIED",
    "evidence": "Directorate: Diocesan Treasury & Tithes Directorate"
  },
  {
    "productId": "JUMO-CHURCH-ERP",
    "sourceFile": "src/recovery/manifests/JUMO-CHURCH-ERP.manifest.ts",
    "sourceType": "TYPESCRIPT_MANIFEST",
    "elementType": "DIRECTORATE",
    "elementId": "DIR_CH_OPERATIONS",
    "parentId": "JUMO-CHURCH-ERP",
    "status": "VERIFIED",
    "evidence": "Directorate: Church Projects & Communications Directorate"
  },
  {
    "productId": "JUMO-CHURCH-ERP",
    "sourceFile": "src/recovery/manifests/JUMO-CHURCH-ERP.manifest.ts",
    "sourceType": "TYPESCRIPT_MANIFEST",
    "elementType": "DEPARTMENT",
    "elementId": "DEP_CH_EPISCOPAL",
    "parentId": "DIR_CH_ECCLESIASTICAL",
    "status": "VERIFIED",
    "evidence": "Department: Episcopal See & Bishopric Secretariat"
  },
  {
    "productId": "JUMO-CHURCH-ERP",
    "sourceFile": "src/recovery/manifests/JUMO-CHURCH-ERP.manifest.ts",
    "sourceType": "TYPESCRIPT_MANIFEST",
    "elementType": "DEPARTMENT",
    "elementId": "DEP_CH_CHANCERY",
    "parentId": "DIR_CH_ECCLESIASTICAL",
    "status": "VERIFIED",
    "evidence": "Department: Diocesan Chancery & Archdeaconries"
  },
  {
    "productId": "JUMO-CHURCH-ERP",
    "sourceFile": "src/recovery/manifests/JUMO-CHURCH-ERP.manifest.ts",
    "sourceType": "TYPESCRIPT_MANIFEST",
    "elementType": "DEPARTMENT",
    "elementId": "DEP_CH_PARISH",
    "parentId": "DIR_CH_PARISH",
    "status": "VERIFIED",
    "evidence": "Department: Parish Pastoral Offices & Sacramental Registries"
  },
  {
    "productId": "JUMO-CHURCH-ERP",
    "sourceFile": "src/recovery/manifests/JUMO-CHURCH-ERP.manifest.ts",
    "sourceType": "TYPESCRIPT_MANIFEST",
    "elementType": "DEPARTMENT",
    "elementId": "DEP_CH_MINISTRY",
    "parentId": "DIR_CH_MINISTRY",
    "status": "VERIFIED",
    "evidence": "Department: Congregation Membership, Auxiliaries & Liturgy"
  },
  {
    "productId": "JUMO-CHURCH-ERP",
    "sourceFile": "src/recovery/manifests/JUMO-CHURCH-ERP.manifest.ts",
    "sourceType": "TYPESCRIPT_MANIFEST",
    "elementType": "DEPARTMENT",
    "elementId": "DEP_CH_FINANCE",
    "parentId": "DIR_CH_FINANCE",
    "status": "VERIFIED",
    "evidence": "Department: Diocesan Treasury, Tithes & Stewardship"
  },
  {
    "productId": "JUMO-CHURCH-ERP",
    "sourceFile": "src/recovery/manifests/JUMO-CHURCH-ERP.manifest.ts",
    "sourceType": "TYPESCRIPT_MANIFEST",
    "elementType": "DEPARTMENT",
    "elementId": "DEP_CH_DEVELOPMENT",
    "parentId": "DIR_CH_OPERATIONS",
    "status": "VERIFIED",
    "evidence": "Department: Church Building Projects & Benevolence Welfare"
  },
  {
    "productId": "JUMO-CHURCH-ERP",
    "sourceFile": "src/recovery/manifests/JUMO-CHURCH-ERP.manifest.ts",
    "sourceType": "TYPESCRIPT_MANIFEST",
    "elementType": "DEPARTMENT",
    "elementId": "DEP_CH_COMMUNICATIONS",
    "parentId": "DIR_CH_OPERATIONS",
    "status": "VERIFIED",
    "evidence": "Department: Diocesan Publications & Media Operations"
  },
  {
    "productId": "JUMO-CHURCH-ERP",
    "sourceFile": "src/recovery/manifests/JUMO-CHURCH-ERP.manifest.ts",
    "sourceType": "TYPESCRIPT_MANIFEST",
    "elementType": "DEPARTMENT",
    "elementId": "DEP_CH_TECH",
    "parentId": "DIR_CH_OPERATIONS",
    "status": "VERIFIED",
    "evidence": "Department: Church ERP Technology & Administration"
  },
  {
    "productId": "JUMO-CHURCH-ERP",
    "sourceFile": "src/recovery/manifests/JUMO-CHURCH-ERP.manifest.ts",
    "sourceType": "TYPESCRIPT_MANIFEST",
    "elementType": "OFFICE",
    "elementId": "OFF_CH_BISHOP",
    "parentId": "DEP_CH_EPISCOPAL",
    "status": "VERIFIED",
    "evidence": "Office: Bishop / Overseer Office Office"
  },
  {
    "productId": "JUMO-CHURCH-ERP",
    "sourceFile": "src/recovery/manifests/JUMO-CHURCH-ERP.manifest.ts",
    "sourceType": "TYPESCRIPT_MANIFEST",
    "elementType": "OFFICE",
    "elementId": "OFF_CH_SYNOD",
    "parentId": "DEP_CH_EPISCOPAL",
    "status": "VERIFIED",
    "evidence": "Office: Diocesan Synod Secretariat Office"
  },
  {
    "productId": "JUMO-CHURCH-ERP",
    "sourceFile": "src/recovery/manifests/JUMO-CHURCH-ERP.manifest.ts",
    "sourceType": "TYPESCRIPT_MANIFEST",
    "elementType": "OFFICE",
    "elementId": "OFF_CH_CHANCELLOR",
    "parentId": "DEP_CH_CHANCERY",
    "status": "VERIFIED",
    "evidence": "Office: Diocesan Chancellor Office"
  },
  {
    "productId": "JUMO-CHURCH-ERP",
    "sourceFile": "src/recovery/manifests/JUMO-CHURCH-ERP.manifest.ts",
    "sourceType": "TYPESCRIPT_MANIFEST",
    "elementType": "OFFICE",
    "elementId": "OFF_CH_ARCH",
    "parentId": "DEP_CH_CHANCERY",
    "status": "VERIFIED",
    "evidence": "Office: Archdeaconry Administration Office"
  },
  {
    "productId": "JUMO-CHURCH-ERP",
    "sourceFile": "src/recovery/manifests/JUMO-CHURCH-ERP.manifest.ts",
    "sourceType": "TYPESCRIPT_MANIFEST",
    "elementType": "OFFICE",
    "elementId": "OFF_CH_PRIEST",
    "parentId": "DEP_CH_PARISH",
    "status": "VERIFIED",
    "evidence": "Office: Parish Priest Office Office"
  },
  {
    "productId": "JUMO-CHURCH-ERP",
    "sourceFile": "src/recovery/manifests/JUMO-CHURCH-ERP.manifest.ts",
    "sourceType": "TYPESCRIPT_MANIFEST",
    "elementType": "OFFICE",
    "elementId": "OFF_CH_SACRAMENTS",
    "parentId": "DEP_CH_PARISH",
    "status": "VERIFIED",
    "evidence": "Office: Sacraments & Rites Registry Office"
  },
  {
    "productId": "JUMO-CHURCH-ERP",
    "sourceFile": "src/recovery/manifests/JUMO-CHURCH-ERP.manifest.ts",
    "sourceType": "TYPESCRIPT_MANIFEST",
    "elementType": "OFFICE",
    "elementId": "OFF_CH_MEMBERSHIP",
    "parentId": "DEP_CH_MINISTRY",
    "status": "VERIFIED",
    "evidence": "Office: Congregation Membership Office"
  },
  {
    "productId": "JUMO-CHURCH-ERP",
    "sourceFile": "src/recovery/manifests/JUMO-CHURCH-ERP.manifest.ts",
    "sourceType": "TYPESCRIPT_MANIFEST",
    "elementType": "OFFICE",
    "elementId": "OFF_CH_PASTORAL",
    "parentId": "DEP_CH_MINISTRY",
    "status": "VERIFIED",
    "evidence": "Office: Pastoral Care & Visitation Office"
  },
  {
    "productId": "JUMO-CHURCH-ERP",
    "sourceFile": "src/recovery/manifests/JUMO-CHURCH-ERP.manifest.ts",
    "sourceType": "TYPESCRIPT_MANIFEST",
    "elementType": "OFFICE",
    "elementId": "OFF_CH_LITURGY",
    "parentId": "DEP_CH_MINISTRY",
    "status": "VERIFIED",
    "evidence": "Office: Liturgy & Event Planner Office"
  },
  {
    "productId": "JUMO-CHURCH-ERP",
    "sourceFile": "src/recovery/manifests/JUMO-CHURCH-ERP.manifest.ts",
    "sourceType": "TYPESCRIPT_MANIFEST",
    "elementType": "OFFICE",
    "elementId": "OFF_CH_MINISTRIES",
    "parentId": "DEP_CH_MINISTRY",
    "status": "VERIFIED",
    "evidence": "Office: Auxiliary Ministries Hub Office"
  },
  {
    "productId": "JUMO-CHURCH-ERP",
    "sourceFile": "src/recovery/manifests/JUMO-CHURCH-ERP.manifest.ts",
    "sourceType": "TYPESCRIPT_MANIFEST",
    "elementType": "OFFICE",
    "elementId": "OFF_CH_TREASURY",
    "parentId": "DEP_CH_FINANCE",
    "status": "VERIFIED",
    "evidence": "Office: Parish / Diocesan Treasury Office"
  },
  {
    "productId": "JUMO-CHURCH-ERP",
    "sourceFile": "src/recovery/manifests/JUMO-CHURCH-ERP.manifest.ts",
    "sourceType": "TYPESCRIPT_MANIFEST",
    "elementType": "OFFICE",
    "elementId": "OFF_CH_TITHES",
    "parentId": "DEP_CH_FINANCE",
    "status": "VERIFIED",
    "evidence": "Office: Tithes & Offerings Ledger Office"
  },
  {
    "productId": "JUMO-CHURCH-ERP",
    "sourceFile": "src/recovery/manifests/JUMO-CHURCH-ERP.manifest.ts",
    "sourceType": "TYPESCRIPT_MANIFEST",
    "elementType": "OFFICE",
    "elementId": "OFF_CH_PROJECTS",
    "parentId": "DEP_CH_DEVELOPMENT",
    "status": "VERIFIED",
    "evidence": "Office: Church Building & Projects Office"
  },
  {
    "productId": "JUMO-CHURCH-ERP",
    "sourceFile": "src/recovery/manifests/JUMO-CHURCH-ERP.manifest.ts",
    "sourceType": "TYPESCRIPT_MANIFEST",
    "elementType": "OFFICE",
    "elementId": "OFF_CH_WELFARE",
    "parentId": "DEP_CH_DEVELOPMENT",
    "status": "VERIFIED",
    "evidence": "Office: Benevolence & Welfare Fund Office"
  },
  {
    "productId": "JUMO-CHURCH-ERP",
    "sourceFile": "src/recovery/manifests/JUMO-CHURCH-ERP.manifest.ts",
    "sourceType": "TYPESCRIPT_MANIFEST",
    "elementType": "OFFICE",
    "elementId": "OFF_CH_MEDIA",
    "parentId": "DEP_CH_COMMUNICATIONS",
    "status": "VERIFIED",
    "evidence": "Office: Diocesan Media & Bulletin Office"
  },
  {
    "productId": "JUMO-CHURCH-ERP",
    "sourceFile": "src/recovery/manifests/JUMO-CHURCH-ERP.manifest.ts",
    "sourceType": "TYPESCRIPT_MANIFEST",
    "elementType": "OFFICE",
    "elementId": "OFF_CH_DEV",
    "parentId": "DEP_CH_TECH",
    "status": "VERIFIED",
    "evidence": "Office: Church ERP Developer Studio Office"
  },
  {
    "productId": "JUMO-CHURCH-ERP",
    "sourceFile": "src/recovery/manifests/JUMO-CHURCH-ERP.manifest.ts",
    "sourceType": "TYPESCRIPT_MANIFEST",
    "elementType": "OFFICE",
    "elementId": "OFF_CH_CTRL",
    "parentId": "DEP_CH_TECH",
    "status": "VERIFIED",
    "evidence": "Office: Church ERP Control Center Office"
  },
  {
    "productId": "JUMO-CHURCH-ERP",
    "sourceFile": "src/recovery/manifests/JUMO-CHURCH-ERP.manifest.ts",
    "sourceType": "TYPESCRIPT_MANIFEST",
    "elementType": "OFFICE",
    "elementId": "OFF_CH_CENSUS",
    "parentId": "DEP_CH_EPISCOPAL",
    "status": "VERIFIED",
    "evidence": "Office: Diocesan Census Intelligence Office"
  },
  {
    "productId": "JUMO-CHURCH-ERP",
    "sourceFile": "src/recovery/manifests/JUMO-CHURCH-ERP.manifest.ts",
    "sourceType": "TYPESCRIPT_MANIFEST",
    "elementType": "OFFICE",
    "elementId": "OFF_CH_ROSTER",
    "parentId": "DEP_CH_EPISCOPAL",
    "status": "VERIFIED",
    "evidence": "Office: Clergy & Personnel Roster Office"
  },
  {
    "productId": "JUMO-CHURCH-ERP",
    "sourceFile": "src/products/ModulePortalRegistry.ts",
    "sourceType": "TYPESCRIPT_REGISTRY",
    "elementType": "PORTAL",
    "elementId": "PORTAL_CH_BISHOP",
    "parentId": "OFF_CH_BISHOP",
    "status": "VERIFIED",
    "evidence": "Portal: Bishop / Overseer Office (/church/bishop)"
  },
  {
    "productId": "JUMO-CHURCH-ERP",
    "sourceFile": "src/products/ModulePortalRegistry.ts",
    "sourceType": "TYPESCRIPT_REGISTRY",
    "elementType": "PORTAL",
    "elementId": "PORTAL_CH_SYNOD",
    "parentId": "OFF_CH_SYNOD",
    "status": "VERIFIED",
    "evidence": "Portal: Diocesan Synod Secretariat (/church/synod)"
  },
  {
    "productId": "JUMO-CHURCH-ERP",
    "sourceFile": "src/products/ModulePortalRegistry.ts",
    "sourceType": "TYPESCRIPT_REGISTRY",
    "elementType": "PORTAL",
    "elementId": "PORTAL_CH_CHANCELLOR",
    "parentId": "OFF_CH_CHANCELLOR",
    "status": "VERIFIED",
    "evidence": "Portal: Diocesan Chancellor (/church/chancellor)"
  },
  {
    "productId": "JUMO-CHURCH-ERP",
    "sourceFile": "src/products/ModulePortalRegistry.ts",
    "sourceType": "TYPESCRIPT_REGISTRY",
    "elementType": "PORTAL",
    "elementId": "PORTAL_CH_ARCH",
    "parentId": "OFF_CH_ARCH",
    "status": "VERIFIED",
    "evidence": "Portal: Archdeaconry Administration (/church/archdeaconry)"
  },
  {
    "productId": "JUMO-CHURCH-ERP",
    "sourceFile": "src/products/ModulePortalRegistry.ts",
    "sourceType": "TYPESCRIPT_REGISTRY",
    "elementType": "PORTAL",
    "elementId": "PORTAL_CH_PARISH",
    "parentId": "OFF_CH_PRIEST",
    "status": "VERIFIED",
    "evidence": "Portal: Parish Priest Office (/church/parish)"
  },
  {
    "productId": "JUMO-CHURCH-ERP",
    "sourceFile": "src/products/ModulePortalRegistry.ts",
    "sourceType": "TYPESCRIPT_REGISTRY",
    "elementType": "PORTAL",
    "elementId": "PORTAL_CH_SACRAMENTS",
    "parentId": "OFF_CH_SACRAMENTS",
    "status": "VERIFIED",
    "evidence": "Portal: Sacraments & Rites Registry (/church/sacraments)"
  },
  {
    "productId": "JUMO-CHURCH-ERP",
    "sourceFile": "src/products/ModulePortalRegistry.ts",
    "sourceType": "TYPESCRIPT_REGISTRY",
    "elementType": "PORTAL",
    "elementId": "PORTAL_CH_MEMBERS",
    "parentId": "OFF_CH_MEMBERSHIP",
    "status": "VERIFIED",
    "evidence": "Portal: Congregation Membership (/church/membership)"
  },
  {
    "productId": "JUMO-CHURCH-ERP",
    "sourceFile": "src/products/ModulePortalRegistry.ts",
    "sourceType": "TYPESCRIPT_REGISTRY",
    "elementType": "PORTAL",
    "elementId": "PORTAL_CH_PASTORAL",
    "parentId": "OFF_CH_PASTORAL",
    "status": "VERIFIED",
    "evidence": "Portal: Pastoral Care & Visitation (/church/pastoral)"
  },
  {
    "productId": "JUMO-CHURCH-ERP",
    "sourceFile": "src/products/ModulePortalRegistry.ts",
    "sourceType": "TYPESCRIPT_REGISTRY",
    "elementType": "PORTAL",
    "elementId": "PORTAL_CH_EVENTS",
    "parentId": "OFF_CH_LITURGY",
    "status": "VERIFIED",
    "evidence": "Portal: Liturgy & Event Planner (/church/liturgy)"
  },
  {
    "productId": "JUMO-CHURCH-ERP",
    "sourceFile": "src/products/ModulePortalRegistry.ts",
    "sourceType": "TYPESCRIPT_REGISTRY",
    "elementType": "PORTAL",
    "elementId": "PORTAL_CH_MINISTRIES",
    "parentId": "OFF_CH_MINISTRIES",
    "status": "VERIFIED",
    "evidence": "Portal: Auxiliary Ministries Hub (/church/ministries)"
  },
  {
    "productId": "JUMO-CHURCH-ERP",
    "sourceFile": "src/products/ModulePortalRegistry.ts",
    "sourceType": "TYPESCRIPT_REGISTRY",
    "elementType": "PORTAL",
    "elementId": "PORTAL_CH_TREASURY",
    "parentId": "OFF_CH_TREASURY",
    "status": "VERIFIED",
    "evidence": "Portal: Parish / Diocesan Treasury (/church/treasury)"
  },
  {
    "productId": "JUMO-CHURCH-ERP",
    "sourceFile": "src/products/ModulePortalRegistry.ts",
    "sourceType": "TYPESCRIPT_REGISTRY",
    "elementType": "PORTAL",
    "elementId": "PORTAL_CH_TITHES",
    "parentId": "OFF_CH_TITHES",
    "status": "VERIFIED",
    "evidence": "Portal: Tithes & Offerings Ledger (/church/tithes)"
  },
  {
    "productId": "JUMO-CHURCH-ERP",
    "sourceFile": "src/products/ModulePortalRegistry.ts",
    "sourceType": "TYPESCRIPT_REGISTRY",
    "elementType": "PORTAL",
    "elementId": "PORTAL_CH_PROJECTS",
    "parentId": "OFF_CH_PROJECTS",
    "status": "VERIFIED",
    "evidence": "Portal: Church Building & Projects (/church/projects)"
  },
  {
    "productId": "JUMO-CHURCH-ERP",
    "sourceFile": "src/products/ModulePortalRegistry.ts",
    "sourceType": "TYPESCRIPT_REGISTRY",
    "elementType": "PORTAL",
    "elementId": "PORTAL_CH_WELFARE",
    "parentId": "OFF_CH_WELFARE",
    "status": "VERIFIED",
    "evidence": "Portal: Benevolence & Welfare Fund (/church/welfare)"
  },
  {
    "productId": "JUMO-CHURCH-ERP",
    "sourceFile": "src/products/ModulePortalRegistry.ts",
    "sourceType": "TYPESCRIPT_REGISTRY",
    "elementType": "PORTAL",
    "elementId": "PORTAL_CH_COMM",
    "parentId": "OFF_CH_MEDIA",
    "status": "VERIFIED",
    "evidence": "Portal: Diocesan Media & Bulletin (/church/media)"
  },
  {
    "productId": "JUMO-CHURCH-ERP",
    "sourceFile": "src/products/ModulePortalRegistry.ts",
    "sourceType": "TYPESCRIPT_REGISTRY",
    "elementType": "PORTAL",
    "elementId": "PORTAL_CH_DEV",
    "parentId": "OFF_CH_DEV",
    "status": "VERIFIED",
    "evidence": "Portal: Church ERP Developer Studio (/church/developer)"
  },
  {
    "productId": "JUMO-CHURCH-ERP",
    "sourceFile": "src/products/ModulePortalRegistry.ts",
    "sourceType": "TYPESCRIPT_REGISTRY",
    "elementType": "PORTAL",
    "elementId": "PORTAL_CH_CTRL",
    "parentId": "OFF_CH_CTRL",
    "status": "VERIFIED",
    "evidence": "Portal: Church ERP Control Center (/church/control)"
  },
  {
    "productId": "JUMO-CHURCH-ERP",
    "sourceFile": "src/products/ModulePortalRegistry.ts",
    "sourceType": "TYPESCRIPT_REGISTRY",
    "elementType": "PORTAL",
    "elementId": "PORTAL_CH_CENSUS",
    "parentId": "OFF_CH_CENSUS",
    "status": "VERIFIED",
    "evidence": "Portal: Diocesan Census Intelligence (/church/census)"
  },
  {
    "productId": "JUMO-CHURCH-ERP",
    "sourceFile": "src/products/ModulePortalRegistry.ts",
    "sourceType": "TYPESCRIPT_REGISTRY",
    "elementType": "PORTAL",
    "elementId": "PORTAL_CH_ROSTER",
    "parentId": "OFF_CH_ROSTER",
    "status": "VERIFIED",
    "evidence": "Portal: Clergy & Personnel Roster (/church/roster)"
  },
  {
    "productId": "JUMO-CHURCH-ERP",
    "sourceFile": "products/church-erp/web/modules/MemberDirectory.tsx",
    "sourceType": "SOURCE_FILE",
    "elementType": "MODULE",
    "elementId": "MOD_CH_MEMBERSHIP",
    "parentId": "JUMO-CHURCH-ERP",
    "status": "VERIFIED",
    "evidence": "Module: Congregation Directory & Census [CH-MEM-01]"
  },
  {
    "productId": "JUMO-CHURCH-ERP",
    "sourceFile": "products/church-erp/web/modules/ChurchFinance.tsx",
    "sourceType": "SOURCE_FILE",
    "elementType": "MODULE",
    "elementId": "MOD_CH_FINANCE",
    "parentId": "JUMO-CHURCH-ERP",
    "status": "VERIFIED",
    "evidence": "Module: Tithes, Offerings & Diocesan Ledger [CH-FIN-01]"
  },
  {
    "productId": "JUMO-CHURCH-ERP",
    "sourceFile": "products/church-erp/web/modules/PastoralCare.tsx",
    "sourceType": "SOURCE_FILE",
    "elementType": "MODULE",
    "elementId": "MOD_CH_PASTORAL",
    "parentId": "JUMO-CHURCH-ERP",
    "status": "VERIFIED",
    "evidence": "Module: Pastoral Care & Visitation Tracking [CH-PAS-01]"
  },
  {
    "productId": "JUMO-CHURCH-ERP",
    "sourceFile": "products/church-erp/web/modules/EventManager.tsx",
    "sourceType": "SOURCE_FILE",
    "elementType": "MODULE",
    "elementId": "MOD_CH_EVENTS",
    "parentId": "JUMO-CHURCH-ERP",
    "status": "VERIFIED",
    "evidence": "Module: Liturgical Calendar & Event Operations [CH-EVT-01]"
  },
  {
    "productId": "JUMO-CHURCH-ERP",
    "sourceFile": "products/church-erp/web/modules/ChurchDashboard.tsx",
    "sourceType": "SOURCE_FILE",
    "elementType": "MODULE",
    "elementId": "MOD_CH_DASHBOARD",
    "parentId": "JUMO-CHURCH-ERP",
    "status": "VERIFIED",
    "evidence": "Module: Executive Diocesan Dashboard [CH-DSH-01]"
  },
  {
    "productId": "JUMO-CHURCH-ERP",
    "sourceFile": "src/products/fintech/core/agents/FintechCapabilityRegistry.ts",
    "sourceType": "CAPABILITY_REGISTRY",
    "elementType": "CAPABILITY",
    "elementId": "CAP_CH_MEMBERSHIP",
    "parentId": "MOD_CH_MEMBERSHIP",
    "status": "VERIFIED",
    "evidence": "Capability: Congregation Directory & Census Engine"
  },
  {
    "productId": "JUMO-CHURCH-ERP",
    "sourceFile": "src/products/fintech/core/agents/FintechCapabilityRegistry.ts",
    "sourceType": "CAPABILITY_REGISTRY",
    "elementType": "CAPABILITY",
    "elementId": "CAP_CH_FINANCE",
    "parentId": "MOD_CH_FINANCE",
    "status": "VERIFIED",
    "evidence": "Capability: Tithes, Offerings & Diocesan Ledger Engine"
  },
  {
    "productId": "JUMO-CHURCH-ERP",
    "sourceFile": "src/products/fintech/core/agents/FintechCapabilityRegistry.ts",
    "sourceType": "CAPABILITY_REGISTRY",
    "elementType": "CAPABILITY",
    "elementId": "CAP_CH_PASTORAL",
    "parentId": "MOD_CH_PASTORAL",
    "status": "VERIFIED",
    "evidence": "Capability: Pastoral Care & Visitation Tracking Engine"
  },
  {
    "productId": "JUMO-CHURCH-ERP",
    "sourceFile": "src/products/fintech/core/agents/FintechCapabilityRegistry.ts",
    "sourceType": "CAPABILITY_REGISTRY",
    "elementType": "CAPABILITY",
    "elementId": "CAP_CH_EVENTS",
    "parentId": "MOD_CH_EVENTS",
    "status": "VERIFIED",
    "evidence": "Capability: Liturgical Calendar & Event Operations Engine"
  },
  {
    "productId": "JUMO-CHURCH-ERP",
    "sourceFile": "src/products/fintech/core/agents/FintechCapabilityRegistry.ts",
    "sourceType": "CAPABILITY_REGISTRY",
    "elementType": "CAPABILITY",
    "elementId": "CAP_CH_DASHBOARD",
    "parentId": "MOD_CH_DASHBOARD",
    "status": "VERIFIED",
    "evidence": "Capability: Executive Diocesan Dashboard Engine"
  },
  {
    "productId": "JUMO-CHURCH-ERP",
    "sourceFile": "src/core/enterprise/components/metadata/UniversalUIMetadataRegistry.ts",
    "sourceType": "METADATA_FABRIC",
    "elementType": "UI_METADATA",
    "elementId": "UI_CH_BISHOP",
    "parentId": "CAP_CH_MEMBERSHIP",
    "status": "VERIFIED",
    "evidence": "UI Metadata for /church/bishop [PORTAL]"
  },
  {
    "productId": "JUMO-CHURCH-ERP",
    "sourceFile": "src/core/enterprise/components/metadata/UniversalUIMetadataRegistry.ts",
    "sourceType": "METADATA_FABRIC",
    "elementType": "UI_METADATA",
    "elementId": "UI_CH_SYNOD",
    "parentId": "CAP_CH_MEMBERSHIP",
    "status": "VERIFIED",
    "evidence": "UI Metadata for /church/synod [PORTAL]"
  },
  {
    "productId": "JUMO-CHURCH-ERP",
    "sourceFile": "src/core/enterprise/components/metadata/UniversalUIMetadataRegistry.ts",
    "sourceType": "METADATA_FABRIC",
    "elementType": "UI_METADATA",
    "elementId": "UI_CH_CHANCELLOR",
    "parentId": "CAP_CH_MEMBERSHIP",
    "status": "VERIFIED",
    "evidence": "UI Metadata for /church/chancellor [PORTAL]"
  },
  {
    "productId": "JUMO-CHURCH-ERP",
    "sourceFile": "src/core/enterprise/components/metadata/UniversalUIMetadataRegistry.ts",
    "sourceType": "METADATA_FABRIC",
    "elementType": "UI_METADATA",
    "elementId": "UI_CH_ARCH",
    "parentId": "CAP_CH_MEMBERSHIP",
    "status": "VERIFIED",
    "evidence": "UI Metadata for /church/archdeaconry [PORTAL]"
  },
  {
    "productId": "JUMO-CHURCH-ERP",
    "sourceFile": "src/core/enterprise/components/metadata/UniversalUIMetadataRegistry.ts",
    "sourceType": "METADATA_FABRIC",
    "elementType": "UI_METADATA",
    "elementId": "UI_CH_PARISH",
    "parentId": "CAP_CH_MEMBERSHIP",
    "status": "VERIFIED",
    "evidence": "UI Metadata for /church/parish [PORTAL]"
  },
  {
    "productId": "JUMO-CHURCH-ERP",
    "sourceFile": "src/core/enterprise/components/metadata/UniversalUIMetadataRegistry.ts",
    "sourceType": "METADATA_FABRIC",
    "elementType": "UI_METADATA",
    "elementId": "UI_CH_SACRAMENTS",
    "parentId": "CAP_CH_MEMBERSHIP",
    "status": "VERIFIED",
    "evidence": "UI Metadata for /church/sacraments [PORTAL]"
  },
  {
    "productId": "JUMO-CHURCH-ERP",
    "sourceFile": "src/core/enterprise/components/metadata/UniversalUIMetadataRegistry.ts",
    "sourceType": "METADATA_FABRIC",
    "elementType": "UI_METADATA",
    "elementId": "UI_CH_MEMBERS",
    "parentId": "CAP_CH_MEMBERSHIP",
    "status": "VERIFIED",
    "evidence": "UI Metadata for /church/membership [PORTAL]"
  },
  {
    "productId": "JUMO-CHURCH-ERP",
    "sourceFile": "src/core/enterprise/components/metadata/UniversalUIMetadataRegistry.ts",
    "sourceType": "METADATA_FABRIC",
    "elementType": "UI_METADATA",
    "elementId": "UI_CH_PASTORAL",
    "parentId": "CAP_CH_MEMBERSHIP",
    "status": "VERIFIED",
    "evidence": "UI Metadata for /church/pastoral [PORTAL]"
  },
  {
    "productId": "JUMO-CHURCH-ERP",
    "sourceFile": "src/core/enterprise/components/metadata/UniversalUIMetadataRegistry.ts",
    "sourceType": "METADATA_FABRIC",
    "elementType": "UI_METADATA",
    "elementId": "UI_CH_EVENTS",
    "parentId": "CAP_CH_MEMBERSHIP",
    "status": "VERIFIED",
    "evidence": "UI Metadata for /church/liturgy [PORTAL]"
  },
  {
    "productId": "JUMO-CHURCH-ERP",
    "sourceFile": "src/core/enterprise/components/metadata/UniversalUIMetadataRegistry.ts",
    "sourceType": "METADATA_FABRIC",
    "elementType": "UI_METADATA",
    "elementId": "UI_CH_MINISTRIES",
    "parentId": "CAP_CH_MEMBERSHIP",
    "status": "VERIFIED",
    "evidence": "UI Metadata for /church/ministries [PORTAL]"
  },
  {
    "productId": "JUMO-CHURCH-ERP",
    "sourceFile": "src/core/enterprise/components/metadata/UniversalUIMetadataRegistry.ts",
    "sourceType": "METADATA_FABRIC",
    "elementType": "UI_METADATA",
    "elementId": "UI_CH_TREASURY",
    "parentId": "CAP_CH_MEMBERSHIP",
    "status": "VERIFIED",
    "evidence": "UI Metadata for /church/treasury [PORTAL]"
  },
  {
    "productId": "JUMO-CHURCH-ERP",
    "sourceFile": "src/core/enterprise/components/metadata/UniversalUIMetadataRegistry.ts",
    "sourceType": "METADATA_FABRIC",
    "elementType": "UI_METADATA",
    "elementId": "UI_CH_TITHES",
    "parentId": "CAP_CH_MEMBERSHIP",
    "status": "VERIFIED",
    "evidence": "UI Metadata for /church/tithes [PORTAL]"
  },
  {
    "productId": "JUMO-CHURCH-ERP",
    "sourceFile": "src/core/enterprise/components/metadata/UniversalUIMetadataRegistry.ts",
    "sourceType": "METADATA_FABRIC",
    "elementType": "UI_METADATA",
    "elementId": "UI_CH_PROJECTS",
    "parentId": "CAP_CH_MEMBERSHIP",
    "status": "VERIFIED",
    "evidence": "UI Metadata for /church/projects [PORTAL]"
  },
  {
    "productId": "JUMO-CHURCH-ERP",
    "sourceFile": "src/core/enterprise/components/metadata/UniversalUIMetadataRegistry.ts",
    "sourceType": "METADATA_FABRIC",
    "elementType": "UI_METADATA",
    "elementId": "UI_CH_WELFARE",
    "parentId": "CAP_CH_MEMBERSHIP",
    "status": "VERIFIED",
    "evidence": "UI Metadata for /church/welfare [PORTAL]"
  },
  {
    "productId": "JUMO-CHURCH-ERP",
    "sourceFile": "src/core/enterprise/components/metadata/UniversalUIMetadataRegistry.ts",
    "sourceType": "METADATA_FABRIC",
    "elementType": "UI_METADATA",
    "elementId": "UI_CH_COMM",
    "parentId": "CAP_CH_MEMBERSHIP",
    "status": "VERIFIED",
    "evidence": "UI Metadata for /church/media [PORTAL]"
  },
  {
    "productId": "JUMO-CHURCH-ERP",
    "sourceFile": "src/core/enterprise/components/metadata/UniversalUIMetadataRegistry.ts",
    "sourceType": "METADATA_FABRIC",
    "elementType": "UI_METADATA",
    "elementId": "UI_CH_DEV",
    "parentId": "CAP_CH_MEMBERSHIP",
    "status": "VERIFIED",
    "evidence": "UI Metadata for /church/developer [PORTAL]"
  },
  {
    "productId": "JUMO-CHURCH-ERP",
    "sourceFile": "src/core/enterprise/components/metadata/UniversalUIMetadataRegistry.ts",
    "sourceType": "METADATA_FABRIC",
    "elementType": "UI_METADATA",
    "elementId": "UI_CH_CTRL",
    "parentId": "CAP_CH_MEMBERSHIP",
    "status": "VERIFIED",
    "evidence": "UI Metadata for /church/control [PORTAL]"
  },
  {
    "productId": "JUMO-CHURCH-ERP",
    "sourceFile": "src/core/enterprise/components/metadata/UniversalUIMetadataRegistry.ts",
    "sourceType": "METADATA_FABRIC",
    "elementType": "UI_METADATA",
    "elementId": "UI_CH_CENSUS",
    "parentId": "CAP_CH_MEMBERSHIP",
    "status": "VERIFIED",
    "evidence": "UI Metadata for /church/census [PORTAL]"
  },
  {
    "productId": "JUMO-CHURCH-ERP",
    "sourceFile": "src/core/enterprise/components/metadata/UniversalUIMetadataRegistry.ts",
    "sourceType": "METADATA_FABRIC",
    "elementType": "UI_METADATA",
    "elementId": "UI_CH_ROSTER",
    "parentId": "CAP_CH_MEMBERSHIP",
    "status": "VERIFIED",
    "evidence": "UI Metadata for /church/roster [PORTAL]"
  },
  {
    "productId": "JUMO-CHURCH-ERP",
    "sourceFile": "src/products/church-erp/web/ChurchErpWebShell.tsx",
    "sourceType": "REACT_TSX_COMPONENT",
    "elementType": "RUNTIME_COMPONENT",
    "elementId": "RTC_CH_SHELL",
    "parentId": "CAP_CH_MEMBERSHIP",
    "status": "VERIFIED",
    "evidence": "Runtime Component at src/products/church-erp/web/ChurchErpWebShell.tsx"
  },
  {
    "productId": "JUMO-CHURCH-ERP",
    "sourceFile": "src/products/church-erp/web/modules/MemberDirectory.tsx",
    "sourceType": "REACT_TSX_COMPONENT",
    "elementType": "RUNTIME_COMPONENT",
    "elementId": "RTC_CH_MEM",
    "parentId": "CAP_CH_MEMBERSHIP",
    "status": "VERIFIED",
    "evidence": "Runtime Component at src/products/church-erp/web/modules/MemberDirectory.tsx"
  },
  {
    "productId": "JUMO-CHURCH-ERP",
    "sourceFile": "src/products/church-erp/web/modules/ChurchFinance.tsx",
    "sourceType": "REACT_TSX_COMPONENT",
    "elementType": "RUNTIME_COMPONENT",
    "elementId": "RTC_CH_FIN",
    "parentId": "CAP_CH_FINANCE",
    "status": "VERIFIED",
    "evidence": "Runtime Component at src/products/church-erp/web/modules/ChurchFinance.tsx"
  },
  {
    "productId": "JUMO-CHURCH-ERP",
    "sourceFile": "src/products/church-erp/web/modules/PastoralCare.tsx",
    "sourceType": "REACT_TSX_COMPONENT",
    "elementType": "RUNTIME_COMPONENT",
    "elementId": "RTC_CH_PAS",
    "parentId": "CAP_CH_PASTORAL",
    "status": "VERIFIED",
    "evidence": "Runtime Component at src/products/church-erp/web/modules/PastoralCare.tsx"
  },
  {
    "productId": "JUMO-CHURCH-ERP",
    "sourceFile": "src/products/church-erp/web/modules/EventManager.tsx",
    "sourceType": "REACT_TSX_COMPONENT",
    "elementType": "RUNTIME_COMPONENT",
    "elementId": "RTC_CH_EVT",
    "parentId": "CAP_CH_EVENTS",
    "status": "VERIFIED",
    "evidence": "Runtime Component at src/products/church-erp/web/modules/EventManager.tsx"
  },
  {
    "productId": "JUMO-OWNER-CONTROL-CENTER",
    "sourceFile": "src/recovery/manifests/JUMO-OWNER-CONTROL-CENTER.manifest.ts",
    "sourceType": "TYPESCRIPT_MANIFEST",
    "elementType": "PRODUCT",
    "elementId": "JUMO-OWNER-CONTROL-CENTER",
    "parentId": "JUMO_PLATFORM_KERNEL",
    "status": "VERIFIED",
    "evidence": "Authoritative sovereign product manifest for Owner"
  },
  {
    "productId": "JUMO-OWNER-CONTROL-CENTER",
    "sourceFile": "src/recovery/manifests/JUMO-OWNER-CONTROL-CENTER.manifest.ts",
    "sourceType": "TYPESCRIPT_MANIFEST",
    "elementType": "DIRECTORATE",
    "elementId": "DIR_OCC_SOVEREIGN",
    "parentId": "JUMO-OWNER-CONTROL-CENTER",
    "status": "VERIFIED",
    "evidence": "Directorate: Sovereign Ownership & Ring-0 Core Directorate"
  },
  {
    "productId": "JUMO-OWNER-CONTROL-CENTER",
    "sourceFile": "src/recovery/manifests/JUMO-OWNER-CONTROL-CENTER.manifest.ts",
    "sourceType": "TYPESCRIPT_MANIFEST",
    "elementType": "DIRECTORATE",
    "elementId": "DIR_OCC_GOVERNANCE",
    "parentId": "JUMO-OWNER-CONTROL-CENTER",
    "status": "VERIFIED",
    "evidence": "Directorate: Platform Integrity, Audit & Trust Directorate"
  },
  {
    "productId": "JUMO-OWNER-CONTROL-CENTER",
    "sourceFile": "src/recovery/manifests/JUMO-OWNER-CONTROL-CENTER.manifest.ts",
    "sourceType": "TYPESCRIPT_MANIFEST",
    "elementType": "DIRECTORATE",
    "elementId": "DIR_OCC_ENGINEERING",
    "parentId": "JUMO-OWNER-CONTROL-CENTER",
    "status": "VERIFIED",
    "evidence": "Directorate: Software Factory & Template Architecture Directorate"
  },
  {
    "productId": "JUMO-OWNER-CONTROL-CENTER",
    "sourceFile": "src/recovery/manifests/JUMO-OWNER-CONTROL-CENTER.manifest.ts",
    "sourceType": "TYPESCRIPT_MANIFEST",
    "elementType": "DIRECTORATE",
    "elementId": "DIR_OCC_COMMERCE",
    "parentId": "JUMO-OWNER-CONTROL-CENTER",
    "status": "VERIFIED",
    "evidence": "Directorate: Platform Marketplace & Ecosystem Directorate"
  },
  {
    "productId": "JUMO-OWNER-CONTROL-CENTER",
    "sourceFile": "src/recovery/manifests/JUMO-OWNER-CONTROL-CENTER.manifest.ts",
    "sourceType": "TYPESCRIPT_MANIFEST",
    "elementType": "DEPARTMENT",
    "elementId": "DEP_OCC_SOVEREIGN",
    "parentId": "DIR_OCC_SOVEREIGN",
    "status": "VERIFIED",
    "evidence": "Department: Ring-0 Command Console & Privileged Operations"
  },
  {
    "productId": "JUMO-OWNER-CONTROL-CENTER",
    "sourceFile": "src/recovery/manifests/JUMO-OWNER-CONTROL-CENTER.manifest.ts",
    "sourceType": "TYPESCRIPT_MANIFEST",
    "elementType": "DEPARTMENT",
    "elementId": "DEP_OCC_SECURITY",
    "parentId": "DIR_OCC_SOVEREIGN",
    "status": "VERIFIED",
    "evidence": "Department: AEGIS Sovereign Security Wall & MFA Gateway"
  },
  {
    "productId": "JUMO-OWNER-CONTROL-CENTER",
    "sourceFile": "src/recovery/manifests/JUMO-OWNER-CONTROL-CENTER.manifest.ts",
    "sourceType": "TYPESCRIPT_MANIFEST",
    "elementType": "DEPARTMENT",
    "elementId": "DEP_OCC_INTEGRITY",
    "parentId": "DIR_OCC_GOVERNANCE",
    "status": "VERIFIED",
    "evidence": "Department: JUMO Trust & Cryptographic Audit Integrity"
  },
  {
    "productId": "JUMO-OWNER-CONTROL-CENTER",
    "sourceFile": "src/recovery/manifests/JUMO-OWNER-CONTROL-CENTER.manifest.ts",
    "sourceType": "TYPESCRIPT_MANIFEST",
    "elementType": "DEPARTMENT",
    "elementId": "DEP_OCC_FACTORIES",
    "parentId": "DIR_OCC_ENGINEERING",
    "status": "VERIFIED",
    "evidence": "Department: ERP Scaffolding & Code Generation Engine"
  },
  {
    "productId": "JUMO-OWNER-CONTROL-CENTER",
    "sourceFile": "src/recovery/manifests/JUMO-OWNER-CONTROL-CENTER.manifest.ts",
    "sourceType": "TYPESCRIPT_MANIFEST",
    "elementType": "DEPARTMENT",
    "elementId": "DEP_OCC_COMMERCE",
    "parentId": "DIR_OCC_COMMERCE",
    "status": "VERIFIED",
    "evidence": "Department: Platform Store, Licensing & Multi-Tenant Registry"
  },
  {
    "productId": "JUMO-OWNER-CONTROL-CENTER",
    "sourceFile": "src/recovery/manifests/JUMO-OWNER-CONTROL-CENTER.manifest.ts",
    "sourceType": "TYPESCRIPT_MANIFEST",
    "elementType": "OFFICE",
    "elementId": "OFF_OCC_COMMAND",
    "parentId": "DEP_OCC_SOVEREIGN",
    "status": "VERIFIED",
    "evidence": "Office: Ring-0 Command Console Office"
  },
  {
    "productId": "JUMO-OWNER-CONTROL-CENTER",
    "sourceFile": "src/recovery/manifests/JUMO-OWNER-CONTROL-CENTER.manifest.ts",
    "sourceType": "TYPESCRIPT_MANIFEST",
    "elementType": "OFFICE",
    "elementId": "OFF_OCC_TRUST",
    "parentId": "DEP_OCC_INTEGRITY",
    "status": "VERIFIED",
    "evidence": "Office: JUMO Trust & Platform Verification Office"
  },
  {
    "productId": "JUMO-OWNER-CONTROL-CENTER",
    "sourceFile": "src/recovery/manifests/JUMO-OWNER-CONTROL-CENTER.manifest.ts",
    "sourceType": "TYPESCRIPT_MANIFEST",
    "elementType": "OFFICE",
    "elementId": "OFF_OCC_FACTORY",
    "parentId": "DEP_OCC_FACTORIES",
    "status": "VERIFIED",
    "evidence": "Office: Software Factory & ERP Studio Office"
  },
  {
    "productId": "JUMO-OWNER-CONTROL-CENTER",
    "sourceFile": "src/recovery/manifests/JUMO-OWNER-CONTROL-CENTER.manifest.ts",
    "sourceType": "TYPESCRIPT_MANIFEST",
    "elementType": "OFFICE",
    "elementId": "OFF_OCC_SECURITY",
    "parentId": "DEP_OCC_SECURITY",
    "status": "VERIFIED",
    "evidence": "Office: AEGIS Ring-0 Security Wall Office"
  },
  {
    "productId": "JUMO-OWNER-CONTROL-CENTER",
    "sourceFile": "src/recovery/manifests/JUMO-OWNER-CONTROL-CENTER.manifest.ts",
    "sourceType": "TYPESCRIPT_MANIFEST",
    "elementType": "OFFICE",
    "elementId": "OFF_OCC_STORE",
    "parentId": "DEP_OCC_COMMERCE",
    "status": "VERIFIED",
    "evidence": "Office: Platform Store & Module Marketplace Office"
  },
  {
    "productId": "JUMO-OWNER-CONTROL-CENTER",
    "sourceFile": "src/recovery/manifests/JUMO-OWNER-CONTROL-CENTER.manifest.ts",
    "sourceType": "TYPESCRIPT_MANIFEST",
    "elementType": "OFFICE",
    "elementId": "OFF_OCC_AUDIT",
    "parentId": "DEP_OCC_INTEGRITY",
    "status": "VERIFIED",
    "evidence": "Office: Cryptographic Audit & Parity Ledger Office"
  },
  {
    "productId": "JUMO-OWNER-CONTROL-CENTER",
    "sourceFile": "src/products/ModulePortalRegistry.ts",
    "sourceType": "TYPESCRIPT_REGISTRY",
    "elementType": "PORTAL",
    "elementId": "PORTAL_OCC_CORE",
    "parentId": "OFF_OCC_COMMAND",
    "status": "VERIFIED",
    "evidence": "Portal: Ring-0 Command Console (/control-center)"
  },
  {
    "productId": "JUMO-OWNER-CONTROL-CENTER",
    "sourceFile": "src/products/ModulePortalRegistry.ts",
    "sourceType": "TYPESCRIPT_REGISTRY",
    "elementType": "PORTAL",
    "elementId": "PORTAL_OCC_TRUST",
    "parentId": "OFF_OCC_TRUST",
    "status": "VERIFIED",
    "evidence": "Portal: JUMO Trust & Platform Verification (/control-center/trust)"
  },
  {
    "productId": "JUMO-OWNER-CONTROL-CENTER",
    "sourceFile": "src/products/ModulePortalRegistry.ts",
    "sourceType": "TYPESCRIPT_REGISTRY",
    "elementType": "PORTAL",
    "elementId": "PORTAL_OCC_FACTORY",
    "parentId": "OFF_OCC_FACTORY",
    "status": "VERIFIED",
    "evidence": "Portal: Software Factory & ERP Studio (/control-center/factory)"
  },
  {
    "productId": "JUMO-OWNER-CONTROL-CENTER",
    "sourceFile": "src/products/ModulePortalRegistry.ts",
    "sourceType": "TYPESCRIPT_REGISTRY",
    "elementType": "PORTAL",
    "elementId": "PORTAL_OCC_SECURITY",
    "parentId": "OFF_OCC_SECURITY",
    "status": "VERIFIED",
    "evidence": "Portal: AEGIS Ring-0 Security Wall (/control-center/security)"
  },
  {
    "productId": "JUMO-OWNER-CONTROL-CENTER",
    "sourceFile": "src/products/ModulePortalRegistry.ts",
    "sourceType": "TYPESCRIPT_REGISTRY",
    "elementType": "PORTAL",
    "elementId": "PORTAL_OCC_STORE",
    "parentId": "OFF_OCC_STORE",
    "status": "VERIFIED",
    "evidence": "Portal: Platform Store & Module Marketplace (/control-center/store)"
  },
  {
    "productId": "JUMO-OWNER-CONTROL-CENTER",
    "sourceFile": "src/products/ModulePortalRegistry.ts",
    "sourceType": "TYPESCRIPT_REGISTRY",
    "elementType": "PORTAL",
    "elementId": "PORTAL_OCC_AUDIT",
    "parentId": "OFF_OCC_AUDIT",
    "status": "VERIFIED",
    "evidence": "Portal: Cryptographic Audit & Parity Ledger (/control-center/audit)"
  },
  {
    "productId": "JUMO-OWNER-CONTROL-CENTER",
    "sourceFile": "core/security/SovereignVerificationRegistry.ts",
    "sourceType": "SOURCE_FILE",
    "elementType": "MODULE",
    "elementId": "MOD_OCC_VERIFICATION",
    "parentId": "JUMO-OWNER-CONTROL-CENTER",
    "status": "VERIFIED",
    "evidence": "Module: Ring-0 Verification & Integrity [OCC-VRF-01]"
  },
  {
    "productId": "JUMO-OWNER-CONTROL-CENTER",
    "sourceFile": "platforms/trust/JumoTrustPlatform.tsx",
    "sourceType": "SOURCE_FILE",
    "elementType": "MODULE",
    "elementId": "MOD_OCC_TRUST",
    "parentId": "JUMO-OWNER-CONTROL-CENTER",
    "status": "VERIFIED",
    "evidence": "Module: JUMO Trust Engine & Anti-Tamper [OCC-TRU-01]"
  },
  {
    "productId": "JUMO-OWNER-CONTROL-CENTER",
    "sourceFile": "platforms/factory/SoftwareFactoryPlatform.tsx",
    "sourceType": "SOURCE_FILE",
    "elementType": "MODULE",
    "elementId": "MOD_OCC_FACTORY",
    "parentId": "JUMO-OWNER-CONTROL-CENTER",
    "status": "VERIFIED",
    "evidence": "Module: ERP Template & Scaffolding Factory [OCC-FAC-01]"
  },
  {
    "productId": "JUMO-OWNER-CONTROL-CENTER",
    "sourceFile": "platforms/shell/UniversalPlatformShell.tsx",
    "sourceType": "SOURCE_FILE",
    "elementType": "MODULE",
    "elementId": "MOD_OCC_SHELL",
    "parentId": "JUMO-OWNER-CONTROL-CENTER",
    "status": "VERIFIED",
    "evidence": "Module: Universal Sovereign Platform Host [OCC-SHL-01]"
  },
  {
    "productId": "JUMO-OWNER-CONTROL-CENTER",
    "sourceFile": "src/products/fintech/core/agents/FintechCapabilityRegistry.ts",
    "sourceType": "CAPABILITY_REGISTRY",
    "elementType": "CAPABILITY",
    "elementId": "CAP_OCC_VERIFICATION",
    "parentId": "MOD_OCC_VERIFICATION",
    "status": "VERIFIED",
    "evidence": "Capability: Ring-0 Verification & Integrity Engine"
  },
  {
    "productId": "JUMO-OWNER-CONTROL-CENTER",
    "sourceFile": "src/products/fintech/core/agents/FintechCapabilityRegistry.ts",
    "sourceType": "CAPABILITY_REGISTRY",
    "elementType": "CAPABILITY",
    "elementId": "CAP_OCC_TRUST",
    "parentId": "MOD_OCC_TRUST",
    "status": "VERIFIED",
    "evidence": "Capability: JUMO Trust Engine & Anti-Tamper Engine"
  },
  {
    "productId": "JUMO-OWNER-CONTROL-CENTER",
    "sourceFile": "src/products/fintech/core/agents/FintechCapabilityRegistry.ts",
    "sourceType": "CAPABILITY_REGISTRY",
    "elementType": "CAPABILITY",
    "elementId": "CAP_OCC_FACTORY",
    "parentId": "MOD_OCC_FACTORY",
    "status": "VERIFIED",
    "evidence": "Capability: ERP Template & Scaffolding Factory Engine"
  },
  {
    "productId": "JUMO-OWNER-CONTROL-CENTER",
    "sourceFile": "src/products/fintech/core/agents/FintechCapabilityRegistry.ts",
    "sourceType": "CAPABILITY_REGISTRY",
    "elementType": "CAPABILITY",
    "elementId": "CAP_OCC_SHELL",
    "parentId": "MOD_OCC_SHELL",
    "status": "VERIFIED",
    "evidence": "Capability: Universal Sovereign Platform Host Engine"
  },
  {
    "productId": "JUMO-OWNER-CONTROL-CENTER",
    "sourceFile": "src/core/enterprise/components/metadata/UniversalUIMetadataRegistry.ts",
    "sourceType": "METADATA_FABRIC",
    "elementType": "UI_METADATA",
    "elementId": "UI_OCC_CORE",
    "parentId": "CAP_OCC_VERIFICATION",
    "status": "VERIFIED",
    "evidence": "UI Metadata for /control-center [CONTROL_PLANE]"
  },
  {
    "productId": "JUMO-OWNER-CONTROL-CENTER",
    "sourceFile": "src/core/enterprise/components/metadata/UniversalUIMetadataRegistry.ts",
    "sourceType": "METADATA_FABRIC",
    "elementType": "UI_METADATA",
    "elementId": "UI_OCC_TRUST",
    "parentId": "CAP_OCC_VERIFICATION",
    "status": "VERIFIED",
    "evidence": "UI Metadata for /control-center/trust [CONTROL_PLANE]"
  },
  {
    "productId": "JUMO-OWNER-CONTROL-CENTER",
    "sourceFile": "src/core/enterprise/components/metadata/UniversalUIMetadataRegistry.ts",
    "sourceType": "METADATA_FABRIC",
    "elementType": "UI_METADATA",
    "elementId": "UI_OCC_FACTORY",
    "parentId": "CAP_OCC_VERIFICATION",
    "status": "VERIFIED",
    "evidence": "UI Metadata for /control-center/factory [CONTROL_PLANE]"
  },
  {
    "productId": "JUMO-OWNER-CONTROL-CENTER",
    "sourceFile": "src/core/enterprise/components/metadata/UniversalUIMetadataRegistry.ts",
    "sourceType": "METADATA_FABRIC",
    "elementType": "UI_METADATA",
    "elementId": "UI_OCC_SECURITY",
    "parentId": "CAP_OCC_VERIFICATION",
    "status": "VERIFIED",
    "evidence": "UI Metadata for /control-center/security [CONTROL_PLANE]"
  },
  {
    "productId": "JUMO-OWNER-CONTROL-CENTER",
    "sourceFile": "src/core/enterprise/components/metadata/UniversalUIMetadataRegistry.ts",
    "sourceType": "METADATA_FABRIC",
    "elementType": "UI_METADATA",
    "elementId": "UI_OCC_STORE",
    "parentId": "CAP_OCC_VERIFICATION",
    "status": "VERIFIED",
    "evidence": "UI Metadata for /control-center/store [CONTROL_PLANE]"
  },
  {
    "productId": "JUMO-OWNER-CONTROL-CENTER",
    "sourceFile": "src/core/enterprise/components/metadata/UniversalUIMetadataRegistry.ts",
    "sourceType": "METADATA_FABRIC",
    "elementType": "UI_METADATA",
    "elementId": "UI_OCC_AUDIT",
    "parentId": "CAP_OCC_VERIFICATION",
    "status": "VERIFIED",
    "evidence": "UI Metadata for /control-center/audit [CONTROL_PLANE]"
  },
  {
    "productId": "JUMO-OWNER-CONTROL-CENTER",
    "sourceFile": "src/platforms/shell/UniversalPlatformShell.tsx",
    "sourceType": "REACT_TSX_COMPONENT",
    "elementType": "RUNTIME_COMPONENT",
    "elementId": "RTC_OCC_SHELL",
    "parentId": "CAP_OCC_VERIFICATION",
    "status": "VERIFIED",
    "evidence": "Runtime Component at src/platforms/shell/UniversalPlatformShell.tsx"
  },
  {
    "productId": "JUMO-OWNER-CONTROL-CENTER",
    "sourceFile": "src/platforms/trust/JumoTrustPlatform.tsx",
    "sourceType": "REACT_TSX_COMPONENT",
    "elementType": "RUNTIME_COMPONENT",
    "elementId": "RTC_OCC_TRUST",
    "parentId": "CAP_OCC_TRUST",
    "status": "VERIFIED",
    "evidence": "Runtime Component at src/platforms/trust/JumoTrustPlatform.tsx"
  },
  {
    "productId": "JUMO-OWNER-CONTROL-CENTER",
    "sourceFile": "src/platforms/factory/SoftwareFactoryPlatform.tsx",
    "sourceType": "REACT_TSX_COMPONENT",
    "elementType": "RUNTIME_COMPONENT",
    "elementId": "RTC_OCC_FACTORY",
    "parentId": "CAP_OCC_FACTORY",
    "status": "VERIFIED",
    "evidence": "Runtime Component at src/platforms/factory/SoftwareFactoryPlatform.tsx"
  },
  {
    "productId": "JUMO-OWNER-CONTROL-CENTER",
    "sourceFile": "src/core/security/RuntimeReliabilityAgent.tsx",
    "sourceType": "REACT_TSX_COMPONENT",
    "elementType": "RUNTIME_COMPONENT",
    "elementId": "RTC_OCC_SECURITY",
    "parentId": "CAP_OCC_VERIFICATION",
    "status": "VERIFIED",
    "evidence": "Runtime Component at src/core/security/RuntimeReliabilityAgent.tsx"
  }
]
);

export class JUMOArchitectureEvidenceRegistry {
  private static entries: ArchitectureEvidenceEntry[] = [...JUMO_ARCHITECTURE_EVIDENCE];

  public static getAllEntries(): readonly ArchitectureEvidenceEntry[] {
    return this.entries;
  }

  public static getEntriesByProduct(productId: string): ArchitectureEvidenceEntry[] {
    return this.entries.filter(e => e.productId === productId);
  }

  public static getEntriesByType(elementType: ArchitectureElementType): ArchitectureEvidenceEntry[] {
    return this.entries.filter(e => e.elementType === elementType);
  }

  public static getEntryById(elementId: string): ArchitectureEvidenceEntry | undefined {
    return this.entries.find(e => e.elementId === elementId);
  }

  public static getChildrenOf(parentId: string): ArchitectureEvidenceEntry[] {
    return this.entries.filter(e => e.parentId === parentId);
  }

  public static getSummary() {
    const byType: Record<string, number> = {};
    const byProduct: Record<string, number> = {};
    this.entries.forEach(e => {
      byType[e.elementType] = (byType[e.elementType] || 0) + 1;
      byProduct[e.productId] = (byProduct[e.productId] || 0) + 1;
    });

    return {
      totalCount: this.entries.length,
      byType,
      byProduct
    };
  }
}

export default JUMOArchitectureEvidenceRegistry;
