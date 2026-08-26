/**
 * JUMO UEOS
 * Enterprise Layer Registry
 */

export class EnterpriseLayerRegistry {
  constructor() {
    this.layers = [
      {
        id: "identity-layer",
        name: "Identity & Access Layer",
        description: "User management, identity verification, authentication, RBAC, and tenant management.",
        components: ["User Management", "Identity Verification", "Authentication Engine", "RBAC Matrix", "Tenant Manager"]
      },
      {
        id: "governance-layer",
        name: "Governance & Compliance Layer",
        description: "Policies, compliance frameworks, approvals, audit logging, and decision management.",
        components: ["Policy Engine", "Compliance Monitor", "Approval Matrix", "Audit Trail Logger", "Decision Framework"]
      },
      {
        id: "operations-layer",
        name: "Operations & Process Layer",
        description: "Departments, workflows, business processes, and task management.",
        components: ["Department Registry", "Workflow Engine", "Process Designer", "Task Allocator", "Operations Monitor"]
      },
      {
        id: "application-layer",
        name: "Application & Module Layer",
        description: "ERP modules, portals, components, and digital forms.",
        components: ["Module Orchestrator", "Portal Gateway", "UI Component Hub", "Digital Forms Engine"]
      },
      {
        id: "data-layer",
        name: "Data & Records Layer",
        description: "Master data management, records storage, documents, and data governance.",
        components: ["Master Data Repository", "Records Management", "Document Repository", "Data Governance Engine"]
      },
      {
        id: "intelligence-layer",
        name: "Intelligence & AI Layer",
        description: "AI enterprise assistants, analytics, predictions, and automated insights.",
        components: ["AI Enterprise Assistant", "Predictive Analytics Engine", "Automated Insights", "Natural Language Processor"]
      },
      {
        id: "financial-layer",
        name: "Financial Architecture Layer (FAAP)",
        description: "Accounting, treasury, payment gateways, budget management, and financial reporting.",
        components: ["General Ledger", "Treasury Management", "Payment Gateway Integration", "Budget Engine", "Financial Reporting"]
      },
      {
        id: "security-layer",
        name: "Security & Trust Layer (AEGIS)",
        description: "Zero trust architecture, end-to-end encryption, real-time threat detection, and security monitoring.",
        components: ["Zero Trust Gateway", "Encryption Engine", "Threat Monitor", "Security Dashboard"]
      }
    ];
  }

  listLayers() {
    return this.layers;
  }

  getLayer(id) {
    return this.layers.find(l => l.id === id);
  }
}

export const enterpriseLayerRegistry = new EnterpriseLayerRegistry();
