// JUMO UEOS Boot Migration & Data Seeding Routine
import { 
  UserRepository, 
  LedgerRepository, 
  RegistryRepository, 
  WorkflowRepository, 
  AuditLogRepository,
  EcosystemRepository as UEOS_EcosystemRepository,
  TemplateRepository as UEOS_TemplateRepository
} from "../repositories/repositories";

export function runMigrations() {
  console.log("[MIGRATION] Checking tables and seeding default operational metrics...");

  // 1. Seed Identity & RBAC User profiles
  const users = UserRepository.findAll();
  if (users.length === 0) {
    console.log("[MIGRATION] Seeding canonical User profiles and Zero-Trust clearances...");
    UserRepository.save({
      email: "okwiijuliusmoses@gmail.com",
      name: "Julius Moses Okwi",
      role: "SecOps_Administrator",
      tenantId: "Global",
      trustLevel: "L4_High_Trust"
    });
    UserRepository.save({
      email: "owner@jumo.net",
      name: "System Owner",
      role: "SecOps_Administrator",
      tenantId: "Global",
      trustLevel: "L4_High_Trust"
    });
    UserRepository.save({
      email: "admin@jumo.net",
      name: "SecOps Administrator",
      role: "SecOps_Administrator",
      tenantId: "Global",
      trustLevel: "L4_High_Trust"
    });
    UserRepository.save({
      email: "compliance-bot@jumo.net",
      name: "AI Compliance Officer",
      role: "FAAP_Controller",
      tenantId: "Global",
      trustLevel: "Strict Sandbox"
    });
    UserRepository.save({
      email: "sacco@jumo.net",
      name: "Zambia Sacco Operator",
      role: "SACCO_Manager",
      tenantId: "sacco-zambia-hq",
      trustLevel: "Strict Sandbox"
    });
    UserRepository.save({
      email: "church@jumo.net",
      name: "Kampala Diocese Registrar",
      role: "Church_Rector",
      tenantId: "church-uganda-diocese",
      trustLevel: "Strict Sandbox"
    });
    UserRepository.save({
      email: "ngo@jumo.net",
      name: "NGO Global Program Lead",
      role: "NGO_Project_Lead",
      tenantId: "ngo-global-node",
      trustLevel: "Strict Sandbox"
    });
  }

  // 2. Seed FAAP Chart of Accounts (COA)
  const accounts = LedgerRepository.findAllAccounts();
  if (accounts.length === 0) {
    console.log("[MIGRATION] Seeding standard FAAP Chart of Accounts balances...");
    LedgerRepository.saveAccount({ code: "1010-CASH", name: "Cooperative Vault Cash", category: "Asset", balance: 142500.50 });
    LedgerRepository.saveAccount({ code: "1200-LOANS", name: "Outstanding Member Loans", category: "Asset", balance: 489200.00 });
    LedgerRepository.saveAccount({ code: "2010-SAVINGS", name: "Member Savings Deposits", category: "Liability", balance: 350450.00 });
    LedgerRepository.saveAccount({ code: "3010-SHARES", name: "Cooperative Capital Shares", category: "Equity", balance: 275000.00 });
    LedgerRepository.saveAccount({ code: "4010-INTEREST", name: "Loan Interest Revenue", category: "Revenue", balance: 12500.25 });
    LedgerRepository.saveAccount({ code: "5010-SALARIES", name: "Staff Payroll Expense", category: "Expense", balance: 6250.00 });
    
    // Hardened JUMO UEOS Master Treasury Ledger Accounts
    LedgerRepository.saveAccount({ code: "1020-JUMO-TREASURY", name: "JUMO Master Treasury Cash Reserves", category: "Asset", balance: 250000.00 });
    LedgerRepository.saveAccount({ code: "4020-JUMO-FEES", name: "JUMO Master Treasury Platform Service Fees", category: "Revenue", balance: 12450.00 });
    LedgerRepository.saveAccount({ code: "1030-CLEARING-TRANSIT", name: "JUMO Fintech Transit Clearing Pool", category: "Asset", balance: 50000.00 });
    LedgerRepository.saveAccount({ code: "4030-RECONCILIATION-RESERVE", name: "JUMO Ledger Discrepancy Reserve Offset", category: "Equity", balance: 0.00 });
  }

  // 3. Seed Platform registries
  const registries = RegistryRepository.findAll();
  if (registries.length === 0) {
    console.log("[MIGRATION] Seeding platform registries for kernel components...");
    RegistryRepository.save({ name: "SACCO_ERP_Core", type: "Domain", status: "Active", tenant: "sacco-zambia-hq", version: "v2.1.0", permissions: "admin-only", updatedBy: "System Kern" });
    RegistryRepository.save({ name: "FAAP_DoubleEntry_Engine", type: "Service", status: "Active", tenant: "Global", version: "v1.4.2", permissions: "all-tenants", updatedBy: "FAAP core team" });
    RegistryRepository.save({ name: "ZeroTrust_RBAC_Validator", type: "Security", status: "Active", tenant: "Global", version: "v3.0.1", permissions: "root-only", updatedBy: "SecOps Core" });
    RegistryRepository.save({ name: "Gemini_Multimodel_Router", type: "AI", status: "Active", tenant: "Global", version: "v1.0.0", permissions: "all-tenants", updatedBy: "System Kern" });
    RegistryRepository.save({ name: "Church_ERP_Module", type: "Domain", status: "Active", tenant: "church-uganda-diocese", version: "v1.1.0", permissions: "diocese-admin", updatedBy: "Uganda Lead" });
    RegistryRepository.save({ name: "Edu_Fee_Reconciler", type: "Service", status: "Active", tenant: "education-kenya-board", version: "v1.0.2", permissions: "registrar-only", updatedBy: "EduDev core" });
    RegistryRepository.save({ name: "FAAP_Core_Fintech_Platform", type: "Domain", status: "Active", tenant: "Global", version: "v2.0.0", permissions: "all-tenants", updatedBy: "Treasury Core" });
    RegistryRepository.save({ name: "Edu_Core_ERP_Module", type: "Domain", status: "Active", tenant: "Global", version: "v2.0.0", permissions: "registrar-only", updatedBy: "Education Core" });
    RegistryRepository.save({ name: "Enterprise_Tenant_Manager", type: "Domain", status: "Active", tenant: "Global", version: "v2.0.0", permissions: "root-only", updatedBy: "SecOps Core" });
  }

  // 4. Seed system automation workflows
  const workflows = WorkflowRepository.findAll();
  if (workflows.length === 0) {
    console.log("[MIGRATION] Seeding automation rules inside Workflow engine...");
    WorkflowRepository.save({ id: "WF-001", name: "SACCO High-Value Loan Approval Rule", triggerEvent: "Loan requested > $10,000", status: "Active", approvers: "Sacco Manager, Credit Officer, AI Audit Agent", lastTriggered: "Never" });
    WorkflowRepository.save({ id: "WF-002", name: "Double Entry Out of Balance Alert", triggerEvent: "Ledger out of balance > 0", status: "Active", approvers: "Treasury Head, Compliance Officer", lastTriggered: "Never" });
    WorkflowRepository.save({ id: "WF-003", name: "Zero Trust Session Invalidation Trigger", triggerEvent: "Multi-tenant context breach threat", status: "Active", approvers: "SecOps Officer, AI Guard Dog", lastTriggered: "Never" });
  }

  // 5. Seed audit logs
  const logs = AuditLogRepository.findAll();
  if (logs.length === 0) {
    console.log("[MIGRATION] Seeding initial audit checkpoints...");
    AuditLogRepository.log("System Kernel", "BOOTSTRAP", "Kernel boot process initialized successfully on node 1.", "success");
    AuditLogRepository.log("secops-officer@jumo.net", "RBAC_VALIDATE", "Zero-Trust policy rules compiled for tenant 'church-uganda-diocese'.", "success");
    AuditLogRepository.log("audit-bot@jumo.net", "LEDGER_INTEGRITY_CHECK", "Consolidated ledger verified. Double entry checksum: BALANCED.", "success");
  }

  // 6. Seed UEOS Ecosystems
  const ecosystems = UEOS_EcosystemRepository.findAll();
  if (ecosystems.length === 0) {
    console.log("[MIGRATION] Seeding national enterprise ecosystems...");
    UEOS_EcosystemRepository.save({
      id: "FINANCIAL",
      name: "Financial & Sacco Ecosystem",
      version: "v5.0.0",
      category: "Fintech",
      description: "National platform for Savings and Credit Cooperatives.",
      governanceModel: "CENTRAL_REGULATORY",
      status: "Active",
      config: JSON.stringify({
        supportedCountries: ["Zambia", "Uganda", "Kenya"],
        institutionTypes: ["SACCO", "MFI", "Credit Union"],
        templates: ["SACCO_PRO_v1", "MFI_CORE_v1"],
        modules: ["LOANS", "SAVINGS", "SHARES", "FAAP_LEDGER"],
        permissions: ["REGULATORY_AUDIT", "MEMBER_PRIVACY"]
      })
    });
    UEOS_EcosystemRepository.save({
      id: "RELIGIOUS",
      name: "Faith-Based Institutional Ecosystem",
      version: "v5.0.0",
      category: "Religious",
      description: "Platform for Church and Mosque administration and financial transparency.",
      governanceModel: "DIOCESAN_AUTONOMY",
      status: "Active",
      config: JSON.stringify({
        supportedCountries: ["Uganda", "Zambia", "Rwanda"],
        institutionTypes: ["DIOCESE", "PARISH", "MOSQUE"],
        templates: ["CHURCH_ERP_v1", "MOSQUE_PLATFORM_v1"],
        modules: ["TITHES", "MEMBERSHIP", "PROJECTS", "FAAP_LEDGER"],
        permissions: ["TRANSPARENCY_PUBLIC", "CLERGY_ONLY"]
      })
    });
    UEOS_EcosystemRepository.save({
      id: "EDUCATION",
      name: "Sovereign Education Ecosystem",
      version: "v5.0.0",
      category: "Education",
      description: "Platform for Universities and Schools governance and fee management.",
      governanceModel: "MINISTRY_OVERSIGHT",
      status: "Active",
      config: JSON.stringify({
        supportedCountries: ["Kenya", "Uganda"],
        institutionTypes: ["UNIVERSITY", "SECONDARY_SCHOOL"],
        templates: ["UNI_CORE_v1", "SCHOOL_MGMT_v1"],
        modules: ["FEES", "ACADEMICS", "ADMISSIONS", "FAAP_LEDGER"],
        permissions: ["REGISTRAR_LEVEL", "STUDENT_PORTAL"]
      })
    });
  }

  // 7. Seed UEOS Templates
  const templates = UEOS_TemplateRepository.findAll();
  if (templates.length === 0) {
    console.log("[MIGRATION] Seeding sovereign enterprise blueprints...");
    UEOS_TemplateRepository.save({
      id: "SACCO_PRO_v1",
      name: "JUMO SACCO Pro Blueprint",
      ecosystemId: "FINANCIAL",
      description: "Complete ERP for large-scale SACCO operations with FAAP integration.",
      version: "v1.0.0",
      status: "Active",
      blueprint: JSON.stringify({
        governance: { type: "BOARD_CENTRIC", boardSeats: 7, regulatoryReporting: true },
        portals: ["Manager Portal", "Member Portal", "Teller Terminal"],
        availableModules: [
          { id: "SAVINGS", name: "Savings & Deposits", status: "CORE" },
          { id: "LOANS", name: "Loan Portfolio Manager", status: "CORE" },
          { id: "SHARES", name: "Share Capital Engine", status: "CORE" }
        ],
        workflows: ["LOAN_APPROVAL", "WITHDRAWAL_LIMIT_BYPASS"],
        reports: ["TRIAL_BALANCE", "MEMBER_STATEMENT", "AGEING_REPORT"],
        integrations: ["M-PESA", "MTN_MOMO", "STRIPE"]
      })
    });
    UEOS_TemplateRepository.save({
      id: "CHURCH_ERP_v1",
      name: "JUMO Church Management Blueprint",
      ecosystemId: "RELIGIOUS",
      description: "Institutional platform for diocesan and parish administration.",
      version: "v1.0.0",
      status: "Active",
      blueprint: JSON.stringify({
        governance: { type: "DIOCESAN", authority: "BISHOP_COUNCIL", transparency: "HIGH" },
        portals: ["Bishop Dashboard", "Parish Registry", "Member App"],
        availableModules: [
          { id: "TITHES", name: "Tithes & Offerings", status: "CORE" },
          { id: "MEMBERS", name: "Parishioner Registry", status: "CORE" }
        ],
        workflows: ["PROJECT_FUND_APPROVAL", "MEMBERSHIP_VALIDATION"],
        reports: ["ANNUAL_FINANCIAL_REPORT", "DEVELOPMENT_FUND_LOGS"],
        integrations: ["CELLULAR_MONEY", "EMAIL_NOTIFICATIONS"]
      })
    });
  }

  console.log("[MIGRATION] Migration complete. All database stores fully primed.");
}
