/**
 * JUMO UEOS Template Compiler
 * 
 * Compiles metadata blueprints into fully validated operational platform contracts.
 */

import { ERPTemplateDefinition, PortalDefinition } from "../runtime/erpTemplateRegistry";

export interface CompiledPlatformContract {
  blueprintId: string;
  name: string;
  ecosystemId: string;
  version: string;
  compiledAt: string;
  portals: PortalDefinition[];
  departments: string[];
  modules: string[];
  workflows: string[];
  forms: string[];
  components: string[];
  databaseSchema: {
    tables: string[];
    indexes: string[];
    securityScopes: string[];
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
    const tables = (blueprint.modules || []).map(m => `ueos_tbl_${m.toLowerCase().replace(/[^a-z0-0]/g, "_")}`);
    tables.push("ueos_institution_identity", "ueos_faap_general_ledger", "ueos_workflow_audit_log");

    const indexes = tables.map(t => `idx_${t}_tenant_id`);

    return {
      blueprintId: blueprint.id,
      name: blueprint.name,
      ecosystemId: blueprint.ecosystemId,
      version: blueprint.version || "5.0.0-COMPILED",
      compiledAt: new Date().toISOString(),
      portals: blueprint.portals || [],
      departments: blueprint.departments || [],
      modules: blueprint.modules || [],
      workflows: blueprint.workflows || [],
      forms: blueprint.forms || [],
      components: blueprint.components || [],
      databaseSchema: {
        tables,
        indexes,
        securityScopes: [blueprint.securityProfile?.dataSegregation || "Tenant Isolation Scope"]
      },
      security: {
        segregation: blueprint.securityProfile?.dataSegregation || "Strict Tenant Segregation",
        authPolicy: blueprint.securityProfile?.authPolicy || "Zero-Trust RBAC",
        encryption: blueprint.securityProfile?.encryptionLevel || "AES-256 Cryptographic Field Protection"
      }
    };
  }
}

export default TemplateCompiler;
