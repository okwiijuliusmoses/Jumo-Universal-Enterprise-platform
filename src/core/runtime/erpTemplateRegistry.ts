import { db } from "../../database/db";
import { EnterpriseTemplate, GovernanceNode } from "../../ueos/kernel/GovernanceEngine";
import { SecurityGovernor, SecurityAuthorizationRequest } from "../security/SecurityGovernor";
import { AuditSystem } from "../security/AuditSystem";
import { safeJSONParse } from "../../lib/json";
import { BlueprintIntelligenceEngine } from "../blueprint/BlueprintIntelligenceEngine";

export type ERPTemplateDefinition = EnterpriseTemplate;
export type { GovernanceNode };
export type PublicExperienceConfig = any;
export type PortalDefinition = any;

export function normalizeERPTemplate(raw: any): EnterpriseTemplate {
  const parsedBlueprint = typeof raw.blueprint === "string" ? safeJSONParse(raw.blueprint, {}) : (raw.blueprint || {});
  const merged = { ...raw, ...parsedBlueprint };

  const id = merged.id || `tpl-${Date.now()}`;
  const name = merged.name || "Enterprise Platform";
  const ecosystemId = merged.ecosystemId || "corporate";
  const ecosystem = merged.ecosystem || ecosystemId;
  const governanceModel = merged.governanceModel || merged.governanceType || "Standard Executive Governance";
  const institutionTypes = Array.isArray(merged.institutionTypes) && merged.institutionTypes.length > 0 
    ? merged.institutionTypes 
    : ["National Institution", "Regional Office"];

  const governanceStructure = merged.governanceStructure || merged.governance || merged.organizationalStructure || {
    title: `${name} Governing Body`,
    role: "Supreme Executive Council",
    subNodes: [
      {
        title: "Executive Director",
        role: "Chief Executive Leadership",
        subNodes: [
          { title: "Operations & Compliance Directorate", role: "Daily Operational Oversight" },
          { title: "FAAP Treasury & Finance Directorate", role: "Financial Ledger Management" }
        ]
      }
    ]
  };

  // Ensure mandatory 5 portals suite
  let portals = Array.isArray(merged.portals) && merged.portals.length > 0 ? merged.portals : [];
  
  const hasExecutive = portals.some((p: any) => p.id === "executive" || (p.name && p.name.toLowerCase().includes("executive")));
  if (!hasExecutive) {
    portals.unshift({
      id: "executive",
      name: "Executive Leadership Portal",
      roles: ["Board", "Executive Director"],
      description: "Executive strategic dashboard, financial health monitoring, and governance sign-off.",
      modules: ["Executive Dashboard", "FAAP Financial Audit", "AI Strategic Assistant"],
      permissions: ["exec:all"],
      workflows: ["Executive Policy Sign-off"]
    });
  }

  const hasStaff = portals.some((p: any) => p.id === "staff" || (p.name && p.name.toLowerCase().includes("staff")));
  if (!hasStaff) {
    portals.push({
      id: "staff",
      name: "Operational Staff Portal",
      roles: ["Staff", "Officer"],
      description: "Day-to-day operations, task management, and activity logging.",
      modules: ["Task Manager", "Activity Log", "Internal Messaging"],
      permissions: ["staff:read", "staff:write"],
      workflows: ["Task Approval"]
    });
  }

  const hasDept = portals.some((p: any) => p.id === "department" || (p.name && p.name.toLowerCase().includes("department")));
  if (!hasDept) {
    portals.push({
      id: "department",
      name: "Department & Directorate Workspace Portal",
      roles: ["Department Head", "Director"],
      description: "Departmental workflows, approvals, inventory, and ledger processing.",
      modules: ["Departmental Management", "Procurement", "FAAP General Ledger"],
      permissions: ["dept:manage", "faap:write"],
      workflows: ["Departmental Budget Approval"]
    });
  }

  const hasPublic = portals.some((p: any) => p.id === "public" || (p.name && p.name.toLowerCase().includes("public")));
  if (!hasPublic) {
    portals.push({
      id: "public",
      name: "Public Gateway Experience Portal",
      roles: ["Public Visitor", "Applicant"],
      description: "Public website, official announcements, e-service applications, and registry verification.",
      modules: ["Public Directory", "Online Service Desk", "Verification Registry"],
      permissions: ["public:read"],
      workflows: ["Public Application Submission"]
    });
  }

  const hasConsumer = portals.some((p: any) => p.id === "consumer" || p.id === "student" || p.id === "patient" || p.id === "member" || p.id === "citizen" || p.id === "donor");
  if (!hasConsumer) {
    portals.push({
      id: "consumer",
      name: "Client & Service Consumer Workspace",
      roles: ["End-User", "Client", "Member"],
      description: "Self-service account dashboard, statements, support tickets, and direct service applications.",
      modules: ["Account Dashboard", "Service Request", "Payment History"],
      permissions: ["consumer:read", "service:apply"],
      workflows: ["Service Request Submission"]
    });
  }

  const departments = Array.isArray(merged.departments) && merged.departments.length > 0 
    ? merged.departments 
    : ["Executive Secretariat", "Operations & Logistics", "Finance & FAAP Treasury", "Human Resources", "ICT & Security"];

  const roles = Array.isArray(merged.roles) && merged.roles.length > 0 
    ? merged.roles 
    : ["EXECUTIVE", "DIRECTOR", "MANAGER", "OFFICER", "STAFF", "CLIENT_USER"];

  const modules = Array.isArray(merged.modules) && merged.modules.length > 0 
    ? merged.modules 
    : ["FAAP General Ledger", "Human Resources & Payroll", "Procurement & Assets", "Identity & Access Control"];

  const components = Array.isArray(merged.components) && merged.components.length > 0 
    ? merged.components 
    : ["Executive Dashboard Summary", "FAAP Financial Balance Sheet", "Workflow Status Kanban", "Data Analytics Grid"];

  const forms = Array.isArray(merged.forms) && merged.forms.length > 0 
    ? merged.forms 
    : ["General Service Request Form", "Payment Voucher Form", "Access Control Requisition"];

  const workflows = Array.isArray(merged.workflows) && merged.workflows.length > 0 
    ? merged.workflows 
    : ["Service Request Verification & Approval", "Payment Disbursement & FAAP Posting"];

  const reports = Array.isArray(merged.reports) && merged.reports.length > 0 
    ? merged.reports 
    : ["FAAP Financial Ledger Report", "Operational Performance Report", "SecOps Compliance Audit"];

  const dashboards = Array.isArray(merged.dashboards) && merged.dashboards.length > 0 
    ? merged.dashboards 
    : ["Executive Leadership Dashboard", "Departmental Operations Dashboard", "Public Self-Service Portal"];

  const aiAgents = Array.isArray(merged.aiAgents) && merged.aiAgents.length > 0 
    ? merged.aiAgents 
    : ["Enterprise Cognitive Copilot AI", "FAAP Ledger Auditor AI"];

  const integrations = Array.isArray(merged.integrations) && merged.integrations.length > 0 
    ? merged.integrations 
    : ["FAAP Banking & Mobile Settlement Gateway", "National Identity Verification API"];

  const securityPolicies = merged.securityPolicies || merged.securityProfile || {
    dataSegregation: "Strict Multi-Tenant Row Isolation Scope",
    authPolicy: "Zero-Trust Role-Based Access Control with MFA",
    encryptionLevel: "AES-256 Field Cryptographic Protection",
    rbacRoles: roles
  };

  return {
    ...merged,
    id,
    name,
    ecosystem,
    ecosystemId,
    governanceModel,
    institutionTypes,
    governance: governanceStructure,
    governanceStructure,
    organizationalStructure: governanceStructure,
    portals,
    departments,
    roles,
    modules,
    components,
    forms,
    workflows,
    reports,
    dashboards,
    aiAgents,
    integrations,
    securityPolicies,
    securityProfile: securityPolicies,
    version: merged.version || "5.0.0-SOVEREIGN-ENTERPRISE",
    status: merged.status || "Active",
    description: merged.description || `Sovereign enterprise operating platform for ${name}.`
  };
}

export class ERPTemplateRegistry {
  static getAll(): EnterpriseTemplate[] {
    const records = db.select<any>("templates");
    const dbTemplates = records.map(r => normalizeERPTemplate(r));

    // Combine with static blueprints to ensure complete coverage without duplicates
    const staticBlueprints = BlueprintIntelligenceEngine.getAllBlueprints().map(bp => normalizeERPTemplate(bp));
    
    const resultMap = new Map<string, EnterpriseTemplate>();
    staticBlueprints.forEach(t => resultMap.set(t.id, t));
    dbTemplates.forEach(t => resultMap.set(t.id, t));

    return Array.from(resultMap.values());
  }

  static getById(id: string): EnterpriseTemplate | null {
    const all = this.getAll();
    const found = all.find(t => t.id === id || (t.aliases && t.aliases.includes(id)));
    return found || null;
  }

  static register(template: EnterpriseTemplate, signature: string): EnterpriseTemplate {
    const authRequest: SecurityAuthorizationRequest = {
      requestIdentity: "TEMPLATE-REGISTRY",
      operatorIdentity: "SYSTEM",
      action: "REGISTER_TEMPLATE",
      affectedEntity: template.id,
      securityClassification: 'RESTRICTED',
      timestamp: Date.now()
    };

    if (!SecurityGovernor.verifySignature(signature, authRequest)) {
      AuditSystem.logAction({ action: "REGISTER_TEMPLATE", operator: "SYSTEM", target: template.id, timestamp: Date.now(), status: 'REJECTED' });
      throw new Error("UNAUTHORIZED: SecOps signature verification failed.");
    }

    AuditSystem.logAction({ action: "REGISTER_TEMPLATE", operator: "SYSTEM", target: template.id, timestamp: Date.now(), status: 'APPROVED' });
    SecurityGovernor.authorizeAction("SYSTEM", "REGISTER_TEMPLATE", 'RESTRICTED');

    const normalized = normalizeERPTemplate(template);

    const record = {
      id: normalized.id,
      name: normalized.name,
      ecosystemId: normalized.ecosystemId,
      description: normalized.description,
      version: normalized.version,
      status: normalized.status,
      blueprint: JSON.stringify(normalized)
    };

    const exists = db.select<any>("templates", t => t.id === normalized.id);
    if (exists.length > 0) {
      db.update("templates", t => t.id === normalized.id, () => record);
    } else {
      db.insert("templates", record);
    }
    return normalized;
  }
}

export default ERPTemplateRegistry;
