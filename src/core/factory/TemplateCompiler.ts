/**
 * JUMO UEOS Template Compiler
 * 
 * Compiles metadata blueprints into fully validated operational platform contracts.
 */

import { ERPTemplateDefinition, PortalDefinition } from "../runtime/erpTemplateRegistry";
import { GovernanceNode } from "../../ueos/kernel/GovernanceEngine";

export interface CompiledPlatformContract {
  blueprintId: string;
  id: string;
  name: string;
  ecosystem: string;
  ecosystemId: string;
  governanceModel: string;
  institutionTypes: string[];
  version: string;
  compiledAt: string;
  governanceStructure: GovernanceNode;
  organizationalStructure: GovernanceNode;
  portals: PortalDefinition[];
  departments: string[];
  roles: string[];
  modules: string[];
  workflows: string[];
  forms: string[];
  reports: string[];
  dashboards: string[];
  aiAgents: string[];
  integrations: string[];
  components: string[];
  databaseSchema: {
    tables: string[];
    indexes: string[];
    securityScopes: string[];
  };
  securityPolicies: {
    dataSegregation: string;
    authPolicy: string;
    encryptionLevel: string;
    rbacRoles: string[];
  };
  security: {
    segregation: string;
    authPolicy: string;
    encryption: string;
  };
}

export class TemplateCompiler {
  /**
   * Compiles an ERPTemplateDefinition metadata blueprint into a CompiledPlatformContract
   */
  static compile(blueprint: ERPTemplateDefinition): CompiledPlatformContract {
    const modules = blueprint.modules || [];
    const tables = modules.map(m => `ueos_tbl_${m.toLowerCase().replace(/[^a-z0-9]/g, "_")}`);
    tables.push("ueos_institution_identity", "ueos_faap_general_ledger", "ueos_workflow_audit_log", "ueos_secops_telemetry");

    const indexes = tables.map(t => `idx_${t}_tenant_id`);

    const governanceStructure = blueprint.governanceStructure || blueprint.governance || blueprint.organizationalStructure || {
      title: `${blueprint.name} Council`,
      role: "Supreme Sovereign Governing Body",
      subNodes: [
        {
          title: "Chief Executive Leadership",
          role: "Executive Administration",
          subNodes: [
            { title: "Operations Directorate", role: "Field & Service Delivery" },
            { title: "FAAP Treasury Directorate", role: "General Ledger & Treasury" }
          ]
        }
      ]
    };

    const roles = blueprint.roles || ["EXECUTIVE", "DIRECTOR", "MANAGER", "OFFICER", "STAFF", "CLIENT"];
    const reports = blueprint.reports || ["FAAP Financial Ledger Report", "Operational Activity Summary", "Audit & Compliance Report"];
    const dashboards = blueprint.dashboards || ["Executive Leadership Dashboard", "Departmental Operations Dashboard", "Client Self-Service Dashboard"];
    const aiAgents = blueprint.aiAgents || ["Enterprise Cognitive Copilot AI", "FAAP Ledger Auditor AI"];
    const integrations = blueprint.integrations || ["FAAP Banking & Mobile Money Gateway", "National Identity Verification API"];

    const secProfile = blueprint.securityPolicies || blueprint.securityProfile || {};

    return {
      blueprintId: blueprint.id,
      id: blueprint.id,
      name: blueprint.name,
      ecosystem: blueprint.ecosystem || blueprint.ecosystemId || "corporate",
      ecosystemId: blueprint.ecosystemId || "corporate",
      governanceModel: blueprint.governanceModel || "Standard Executive Governance",
      institutionTypes: blueprint.institutionTypes || ["National Institution", "Regional Branch"],
      version: blueprint.version || "5.0.0-COMPILED",
      compiledAt: new Date().toISOString(),
      governanceStructure,
      organizationalStructure: governanceStructure,
      portals: blueprint.portals || [],
      departments: blueprint.departments || [],
      roles,
      modules,
      workflows: blueprint.workflows || [],
      forms: blueprint.forms || [],
      reports,
      dashboards,
      aiAgents,
      integrations,
      components: blueprint.components || [],
      databaseSchema: {
        tables,
        indexes,
        securityScopes: [secProfile.dataSegregation || "Tenant Isolation Scope"]
      },
      securityPolicies: {
        dataSegregation: secProfile.dataSegregation || "Strict Multi-Tenant Row Segregation",
        authPolicy: secProfile.authPolicy || "Zero-Trust Role-Based Access Control",
        encryptionLevel: secProfile.encryptionLevel || "AES-256 Field Cryptography",
        rbacRoles: roles
      },
      security: {
        segregation: secProfile.dataSegregation || "Strict Tenant Segregation",
        authPolicy: secProfile.authPolicy || "Zero-Trust RBAC",
        encryption: secProfile.encryptionLevel || "AES-256 Cryptographic Field Protection"
      }
    };
  }
}

export default TemplateCompiler;
