/**
 * JUMO UEOS
 * Enterprise Digital Forms Engine Generator
 *
 * Generates structured, platform-connected forms for registration, approvals, transactions,
 * workflows, compliance, and reporting, and registers them in the Form Registry.
 */

import { formRegistry } from "../../../registry/formRegistry.js";

export class FormGenerator {
  generate(blueprint, directive = {}) {
    const erpInstanceId = directive.instanceId || `${blueprint.id}-instance`;
    const sectorName = blueprint.name || "Enterprise";

    // Dynamic, connected forms required by production standards
    const formsMetadata = [
      {
        id: `form-${erpInstanceId}-registration`,
        name: `${sectorName} Registration Form`,
        type: "REGISTRATION",
        connection: "identityGateway",
        fields: ["organizationId", "jurisdiction", "signatoryName", "nationalIdentityCode"]
      },
      {
        id: `form-${erpInstanceId}-approval`,
        name: `${sectorName} Approval Form`,
        type: "APPROVAL",
        connection: "workflowEngine",
        fields: ["approvalChainId", "escalationRuleId", "signOffLevel", "authorizedGrade"]
      },
      {
        id: `form-${erpInstanceId}-transaction`,
        name: `${sectorName} Transaction Form`,
        type: "TRANSACTION",
        connection: "FAAP",
        fields: ["ledgerDebitAccount", "ledgerCreditAccount", "settlementAmount", "txHash"]
      },
      {
        id: `form-${erpInstanceId}-workflow`,
        name: `${sectorName} Workflow Form`,
        type: "WORKFLOW",
        connection: "workflowEngine",
        fields: ["workflowState", "slaDeadline", "reviewerNotes"]
      },
      {
        id: `form-${erpInstanceId}-compliance`,
        name: `${sectorName} Compliance Form`,
        type: "COMPLIANCE",
        connection: "aegisSecurity",
        fields: ["policyClauseId", "auditVerificationToken", "nonComplianceRisk"]
      },
      {
        id: `form-${erpInstanceId}-reporting`,
        name: `${sectorName} Reporting Form`,
        type: "REPORTING",
        connection: "documentPlatform",
        fields: ["reportFrequency", "metricLedgerData", "compilationTimestamp"]
      }
    ];

    formsMetadata.forEach(form => {
      formRegistry.register({
        ...form,
        erpId: erpInstanceId,
        status: "ACTIVE",
        createdAt: new Date().toISOString()
      });
    });

    return formsMetadata.map(f => f.name);
  }
}

export const formGenerator = new FormGenerator();
