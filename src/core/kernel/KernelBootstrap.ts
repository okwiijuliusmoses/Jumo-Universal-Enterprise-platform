import { EcosystemRegistry } from "../runtime/ecosystemRegistry";
import { ERPTemplateRegistry } from "../runtime/erpTemplateRegistry";
import { WorkflowRegistry } from "../runtime/workflowRegistry";
import { ModuleRegistry } from "../runtime/moduleRegistry";
import { FormRegistry } from "../runtime/formRegistry";
import { ComponentRegistry } from "../runtime/componentRegistry";
import { 
  EnterpriseEcosystem, 
  EnterpriseTemplate, 
  EnterpriseModule, 
  EnterpriseForm, 
  EnterpriseComponent,
  EnterpriseWorkflow
} from "../../ueos/kernel/GovernanceEngine";

export class KernelBootstrap {
  static async execute() {
    console.log("[KERNEL] Initializing UEOS v5.1 Bootstrap sequence...");
    
    this.installComponents();
    this.installForms();
    this.installModules();
    this.installWorkflows();
    this.installEcosystems();
    this.installTemplates();
    
    console.log("[KERNEL] Bootstrap complete. Engine status: READY.");
  }

  private static installComponents() {
    const components: EnterpriseComponent[] = [
      { id: "comp-grid", name: "Enterprise Data Grid", type: "UI", description: "Advanced data table with filtering and export." },
      { id: "comp-ledger", name: "FAAP Ledger Viewer", type: "UI", description: "Real-time double-entry ledger visualization." },
      { id: "comp-workflow", name: "Workflow Timeline", type: "UI", description: "Interactive approval state tracking." },
      { id: "comp-chart", name: "Analytics Dashboard Widget", type: "UI", description: "Dynamic Recharts-based data visualizer." },
      { id: "comp-doc", name: "Sovereign Document Viewer", type: "UI", description: "Secure document indexing and rendering." }
    ];
    components.forEach(c => {
      if (!ComponentRegistry.getById(c.id)) ComponentRegistry.register(c);
    });
  }

  private static installForms() {
    const forms: EnterpriseForm[] = [
      { id: "form-admission", name: "Student Admission Form", fields: [], validation: {} },
      { id: "form-voucher", name: "Payment Voucher", fields: [], validation: {}, workflowBinding: "wf-payment-approval" },
      { id: "form-loan", name: "Loan Application", fields: [], validation: {}, workflowBinding: "wf-loan-assessment" },
      { id: "form-encounter", name: "Clinical Encounter Log", fields: [], validation: {} }
    ];
    forms.forEach(f => {
      if (!FormRegistry.getById(f.id)) FormRegistry.register(f);
    });
  }

  private static installModules() {
    const modules: EnterpriseModule[] = [
      { id: "mod-ledger", name: "FAAP General Ledger", category: "Finance", permissions: ["FINANCE_ADMIN"], workflows: [], forms: ["form-voucher"], reports: ["trial-balance"] },
      { id: "mod-loans", name: "Loan Portfolio Manager", category: "Finance", permissions: ["LOAN_OFFICER"], workflows: ["wf-loan-assessment"], forms: ["form-loan"], reports: ["arrears-report"] },
      { id: "mod-academics", name: "Academic Registry", category: "Education", permissions: ["REGISTRAR"], workflows: [], forms: ["form-admission"], reports: ["enrolment-summary"] }
    ];
    modules.forEach(m => {
      if (!ModuleRegistry.getById(m.id)) ModuleRegistry.register(m);
    });
  }

  private static installWorkflows() {
    const workflows: EnterpriseWorkflow[] = [
      { id: "wf-payment-approval", name: "Standard Payment Workflow", trigger: "FORM_SUBMIT", status: "Active", steps: [], approvals: [], roles: ["Accountant", "Finance Director"] },
      { id: "wf-loan-assessment", name: "Loan Credit Scoring", trigger: "FORM_SUBMIT", status: "Active", steps: [], approvals: [], roles: ["Loan Officer", "Credit Committee"] }
    ];
    workflows.forEach(w => {
      if (!WorkflowRegistry.getById(w.id)) WorkflowRegistry.register(w);
    });
  }

  private static installEcosystems() {
    const ecosystems: EnterpriseEcosystem[] = [
      {
        id: "EDU-NATIONAL",
        name: "National Education Ecosystem",
        version: "v5.1.0",
        category: "Education",
        description: "National platform for Universities and Schools.",
        governanceModel: "MINISTRY_OVERSIGHT",
        supportedCountries: ["Zambia", "Uganda", "Kenya"],
        institutionTypes: ["UNIVERSITY", "COLLEGE", "SECONDARY_SCHOOL"],
        templates: ["UNI-CORE-V1", "SCHOOL-MGMT-V1"],
        status: "Active",
        modules: ["mod-academics", "mod-ledger"],
        permissions: ["REGISTRAR", "FINANCE_ADMIN"]
      },
      {
        id: "FIN-NATIONAL",
        name: "Sovereign Financial Ecosystem",
        version: "v5.1.0",
        category: "Finance",
        description: "National platform for SACCOs and Microfinance.",
        governanceModel: "CENTRAL_REGULATORY",
        supportedCountries: ["Uganda", "Zambia"],
        institutionTypes: ["SACCO", "MFI", "CREDIT_UNION"],
        templates: ["SACCO-PRO-V1"],
        status: "Active",
        modules: ["mod-loans", "mod-ledger"],
        permissions: ["LOAN_OFFICER", "FINANCE_ADMIN"]
      },
      {
        id: "HEALTH-NATIONAL",
        name: "Universal Healthcare Ecosystem",
        version: "v5.1.0",
        category: "Healthcare",
        description: "National health data and hospital governance platform.",
        governanceModel: "MINISTRY_OF_HEALTH",
        supportedCountries: ["Uganda", "Kenya", "Rwanda"],
        institutionTypes: ["REFERRAL_HOSPITAL", "CLINIC", "HEALTH_CENTER"],
        templates: ["HEALTH-CORE-V1"],
        status: "Active",
        modules: ["mod-clinical", "mod-ledger"],
        permissions: ["DOCTOR", "NURSE", "ADMIN"]
      }
    ];
    ecosystems.forEach(e => {
      if (!EcosystemRegistry.getById(e.id)) EcosystemRegistry.register(e);
    });
  }

  private static installTemplates() {
    const templates: EnterpriseTemplate[] = [
      {
        id: "UNI-CORE-V1",
        name: "JUMO University Core Blueprint",
        ecosystemId: "EDU-NATIONAL",
        description: "Complete ERP for national universities.",
        version: "v1.0.0",
        status: "Active",
        governance: { title: "University Council", role: "GOVERNING_BODY" },
        directorates: [
          { id: "dir-vc", name: "Office of the Vice Chancellor", departments: [] },
          { id: "dir-academic", name: "Academic Affairs", departments: [
            { id: "dept-registry", name: "Registrar's Office", directorateId: "dir-academic", modules: ["mod-academics"], roles: ["REGISTRAR"] }
          ]}
        ],
        portals: [
          { id: "portal-student", name: "Student Self-Service", roles: ["STUDENT"], modules: ["mod-academics"] },
          { id: "portal-admin", name: "Executive Dashboard", roles: ["ADMINISTRATOR"], modules: ["mod-academics", "mod-ledger"] }
        ],
        availableModules: [
          { id: "mod-academics", name: "Academic Registry", category: "Education", permissions: [], workflows: [], forms: [], reports: [] }
        ],
        workflows: ["wf-payment-approval"],
        reports: ["trial-balance"],
        integrations: ["M-PESA"]
      },
      {
        id: "HEALTH-CORE-V1",
        name: "JUMO Healthcare Core Blueprint",
        ecosystemId: "HEALTH-NATIONAL",
        description: "Universal health operating system for hospitals.",
        version: "v1.0.0",
        status: "Active",
        governance: { title: "Medical Board", role: "REGULATORY_BODY" },
        directorates: [
          { id: "dir-clinical", name: "Clinical Services", departments: [
            { id: "dept-nursing", name: "Nursing Department", directorateId: "dir-clinical", modules: ["mod-clinical"], roles: ["NURSE"] }
          ]}
        ],
        portals: [
          { id: "portal-doctor", name: "Doctor Terminal", roles: ["DOCTOR"], modules: ["mod-clinical"] },
          { id: "portal-patient", name: "Patient Portal", roles: ["PATIENT"], modules: ["mod-clinical"] }
        ],
        availableModules: [
          { id: "mod-clinical", name: "Clinical Management", category: "Healthcare", permissions: [], workflows: [], forms: ["form-encounter"], reports: [] }
        ],
        workflows: ["wf-payment-approval"],
        reports: ["patient-summary"],
        integrations: ["LAB-SYSTEM"]
      }
    ];
    templates.forEach(t => {
      if (!ERPTemplateRegistry.getById(t.id)) ERPTemplateRegistry.register(t);
    });
  }
}
