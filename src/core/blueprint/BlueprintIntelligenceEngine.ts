/**
 * JUMO UEOS Blueprint Intelligence Engine
 *
 * Central Enterprise Generation Engine.
 * Synthesizes institutional blueprints into complete sovereign enterprise platform definitions.
 */

import { ERPTemplateDefinition, GovernanceNode, PublicExperienceConfig, PortalDefinition } from "../runtime/erpTemplateRegistry";

import universityBlueprint from "../runtime/enterprise-blueprints/university.json";
import churchBlueprint from "../runtime/enterprise-blueprints/church.json";
import ngoBlueprint from "../runtime/enterprise-blueprints/ngo.json";
import governmentBlueprint from "../runtime/enterprise-blueprints/government.json";
import saccoBlueprint from "../runtime/enterprise-blueprints/sacco.json";
import healthcareBlueprint from "../runtime/enterprise-blueprints/healthcare.json";

export interface SynthesizeInstitutionInput {
  institutionType: "university" | "college" | "tvet" | "church" | "ngo" | "government" | "sacco" | "healthcare" | "enterprise";
  institutionName: string;
  country?: string;
  region?: string;
  governanceTier?: string;
  branchCount?: number;
  departmentCount?: number;
  estimatedUsers?: number;
  financialModel?: string;
  customModules?: string[];
}

const STATIC_BLUEPRINTS: Record<string, ERPTemplateDefinition> = {
  "university-erp": universityBlueprint as unknown as ERPTemplateDefinition,
  "church-national-platform": churchBlueprint as unknown as ERPTemplateDefinition,
  "ngo-national-platform": ngoBlueprint as unknown as ERPTemplateDefinition,
  "government-national-platform": governmentBlueprint as unknown as ERPTemplateDefinition,
  "sacco-national-platform": saccoBlueprint as unknown as ERPTemplateDefinition,
  "healthcare-national-platform": healthcareBlueprint as unknown as ERPTemplateDefinition
};

export class BlueprintIntelligenceEngine {
  /**
   * Retrieve a static blueprint by ID or alias
   */
  static getBlueprint(templateId: string): ERPTemplateDefinition | undefined {
    if (STATIC_BLUEPRINTS[templateId]) {
      return STATIC_BLUEPRINTS[templateId];
    }
    const found = Object.values(STATIC_BLUEPRINTS).find(bp => 
      bp.id === templateId || (bp.aliases && bp.aliases.includes(templateId))
    );
    return found;
  }

  /**
   * Get all registered static blueprints
   */
  static getAllBlueprints(): ERPTemplateDefinition[] {
    return Object.values(STATIC_BLUEPRINTS);
  }

  /**
   * Synthesize a dynamic institution blueprint from institutional parameters
   */
  static synthesizeInstitutionBlueprint(input: SynthesizeInstitutionInput): ERPTemplateDefinition {
    const typeKey = input.institutionType.toLowerCase();
    const country = input.country || "Uganda";
    const region = input.region || "National HQ";
    const name = input.institutionName || `${input.institutionType.toUpperCase()} Sovereign Platform`;

    // Base template match or fallback
    let baseBlueprint: ERPTemplateDefinition;
    if (typeKey.includes("univ") || typeKey.includes("college") || typeKey.includes("tvet")) {
      baseBlueprint = universityBlueprint as unknown as ERPTemplateDefinition;
    } else if (typeKey.includes("church") || typeKey.includes("parish")) {
      baseBlueprint = churchBlueprint as unknown as ERPTemplateDefinition;
    } else if (typeKey.includes("ngo") || typeKey.includes("humanitarian")) {
      baseBlueprint = ngoBlueprint as unknown as ERPTemplateDefinition;
    } else if (typeKey.includes("gov") || typeKey.includes("ministry")) {
      baseBlueprint = governmentBlueprint as unknown as ERPTemplateDefinition;
    } else if (typeKey.includes("sacco") || typeKey.includes("finance")) {
      baseBlueprint = saccoBlueprint as unknown as ERPTemplateDefinition;
    } else if (typeKey.includes("health") || typeKey.includes("hospital")) {
      baseBlueprint = healthcareBlueprint as unknown as ERPTemplateDefinition;
    } else {
      baseBlueprint = universityBlueprint as unknown as ERPTemplateDefinition;
    }

    const templateId = `custom-${typeKey}-${Date.now()}`;
    const branchInfo = input.branchCount ? ` (${input.branchCount} Branches / Campuses)` : "";

    // Synthesize Public Experience
    const publicExperience: PublicExperienceConfig = {
      publicDomainSuffix: `.${typeKey}.jumo.platform`,
      tagline: `Sovereign ${name} National Operating Platform - ${country}`,
      announcements: [
        `Official Launch of ${name} Digital Public Gateway in ${country}`,
        `Sovereign FAAP Financial Settlement & Portal Active`,
        `Multi-Branch ${branchInfo} Workspace Online`
      ],
      publicServices: [
        ...baseBlueprint.publicExperience.publicServices,
        `${name} Official E-Services`,
        `National ${country} Credential & FAAP Audit Verification`
      ],
      actionButtons: [...baseBlueprint.publicExperience.actionButtons]
    };

    // Synthesize Governance Structure
    const governanceStructure: GovernanceNode = {
      title: `${name} Governing Council / Board`,
      role: `Supreme Governing Body (${country})`,
      subNodes: [
        {
          title: `Executive Director / Vice Chancellor (${region})`,
          role: "Chief Executive Leadership",
          subNodes: [
            { title: "Academic & Operational Directorate", role: "Primary Operations & Compliance" },
            { title: "FAAP Treasury & Finance Directorate", role: "Double-Entry Ledger & Audit" },
            { title: "Human Capital Directorate", role: "Personnel & Payroll Administration" }
          ]
        }
      ]
    };

    // Synthesize Custom Modules
    const customMods = Array.isArray(input.customModules) ? input.customModules : [];
    const mergedModules = Array.from(new Set([...baseBlueprint.modules, ...customMods]));

    return {
      id: templateId,
      aliases: [templateId, `custom-${input.institutionName.toLowerCase().replace(/\s+/g, "-")}`],
      version: "5.0.0-SOVEREIGN-DYNAMIC",
      approvalStatus: "APPROVED",
      name: `${name} National Operating Platform`,
      ecosystemId: baseBlueprint.ecosystemId,
      governanceType: `${input.institutionType.toUpperCase()} Governance - ${country}`,
      description: `Synthesized sovereign operating platform for ${name} in ${country}. Supports ${input.estimatedUsers || 10000}+ users across ${input.branchCount || 1} branches.`,
      publicExperience,
      governance: governanceStructure,
      governanceStructure,
      portals: baseBlueprint.portals,
      departments: baseBlueprint.departments,
      modules: mergedModules,
      availableModules: (baseBlueprint as any).availableModules || [],
      workflows: baseBlueprint.workflows,
      reports: (baseBlueprint as any).reports || [],
      integrations: (baseBlueprint as any).integrations || [],
      status: "Active",
      forms: baseBlueprint.forms,
      components: baseBlueprint.components,
      apps: baseBlueprint.apps,
      services: baseBlueprint.services,
      securityProfile: {
        dataSegregation: `Strict Tenant Segregation for ${name}`,
        authPolicy: "Multi-Tier Role-Based Access with MFA",
        encryptionLevel: "AES-256 Field Cryptographic Isolation"
      },
      aiProfile: baseBlueprint.aiProfile || "sovereign-ai"
    };
  }
}

export default BlueprintIntelligenceEngine;
