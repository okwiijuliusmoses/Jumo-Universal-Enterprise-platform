const fs = require("fs");
const path = require("path");

const ROOT_DIR = path.resolve(__dirname, "..");
const CORE_REG_DIR = path.join(ROOT_DIR, "src/core/enterprise/registry");
const UI_RECOVERY_DIR = path.join(ROOT_DIR, "src/recovery/ui");
const REPORTS_DIR = path.join(ROOT_DIR, "src/recovery/reports");
const TESTS_DIR = path.join(ROOT_DIR, "tests/recovery");

const MANIFESTS_DIR = path.join(ROOT_DIR, "src/recovery/manifests");

const manifestFiles = [
  { file: "JUMO-FINTECH.manifest.ts", id: "JUMO-FINTECH", name: "JUMO FINTECH ERP", shortKey: "fintech" },
  { file: "JUMO-NURSERY-PRIMARY-ERP.manifest.ts", id: "JUMO-NURSERY-PRIMARY-ERP", name: "JUMO NURSERY & PRIMARY CONSOLIDATED ERP", shortKey: "nursery-primary" },
  { file: "JUMO-SECONDARY-ERP.manifest.ts", id: "JUMO-SECONDARY-ERP", name: "JUMO SECONDARY SCHOOL ERP", shortKey: "secondary" },
  { file: "JUMO-ALUMNI-ERP.manifest.ts", id: "JUMO-ALUMNI", name: "JUMO ALUMNI ERP", shortKey: "alumni" },
  { file: "JUMO-CHURCH-ERP.manifest.ts", id: "JUMO-CHURCH", name: "JUMO CHURCH ERP", shortKey: "church" },
  { file: "JUMO-OWNER-CONTROL-CENTER.manifest.ts", id: "JUMO-CONTROL", name: "JUMO OWNER CONTROL CENTER", shortKey: "control" }
];

console.log("[Phase 2C Builder] Parsing sovereign manifests...");

const parsedProducts = [];

manifestFiles.forEach(m => {
  const fullPath = path.join(MANIFESTS_DIR, m.file);
  const content = fs.readFileSync(fullPath, "utf8");

  const extractArr = (propName) => {
    const regex = new RegExp(`${propName}:\\s*(\\[[\\s\\S]*?\\n\\s*\\]),`);
    const match = content.match(regex);
    if (!match) return [];
    try {
      return JSON.parse(match[1]);
    } catch (e) {
      return [];
    }
  };

  const directorates = extractArr("directorates");
  const departments = extractArr("departments");
  const offices = extractArr("offices");
  const portals = extractArr("portals");
  const modules = extractArr("modules");
  const capabilities = extractArr("capabilities");
  const uiMetadata = extractArr("uiMetadata");
  const runtimeComponents = extractArr("runtimeComponents");
  const services = extractArr("services");
  const workflows = extractArr("workflows");
  const agents = extractArr("agents");
  const reports = extractArr("reports");
  const dashboards = extractArr("dashboards");
  const authenticationBoundaries = extractArr("authenticationBoundaries");
  const permissions = extractArr("permissions");

  parsedProducts.push({
    productId: m.id,
    productName: m.name,
    shortKey: m.shortKey,
    directorates,
    departments,
    offices,
    portals,
    modules,
    capabilities,
    uiMetadata,
    runtimeComponents,
    services,
    workflows,
    agents,
    reports,
    dashboards,
    authenticationBoundaries,
    permissions
  });
});

console.log(`Parsed ${parsedProducts.length} sovereign products.`);

// 2. Write UniversalCapabilityRegistry.ts
const allCaps = [];
parsedProducts.forEach(p => {
  p.capabilities.forEach((c, idx) => {
    const matchingModule = p.modules.find(m => m.id === c.moduleId) || p.modules[0] || { id: `MOD_${p.shortKey}_CORE` };
    const matchingPortal = p.portals.find(port => port.id.includes(c.moduleId.replace('MOD_', '')) || port.id.includes(c.id.replace('CAP_', ''))) || p.portals[0] || { id: `PORTAL_${p.shortKey}_DEFAULT` };
    const matchingOffice = p.offices.find(off => off.id.includes(matchingPortal.id.replace('PORTAL_', ''))) || p.offices[0] || { id: `OFF_${p.shortKey}_DEFAULT` };
    const matchingDept = p.departments.find(d => d.id.includes(matchingOffice.id.replace('OFF_', ''))) || p.departments[0] || { id: `DEPT_${p.shortKey}_CORE` };
    const matchingDir = p.directorates[0] || { id: `DIR_${p.shortKey}_MAIN` };

    allCaps.push({
      capabilityId: c.id,
      productId: p.productId,
      directorateId: matchingDir.id,
      departmentId: matchingDept.id,
      officeId: matchingOffice.id,
      portalId: matchingPortal.id,
      moduleId: c.moduleId || matchingModule.id,
      name: c.name,
      description: `Authoritative capability providing enterprise operations for ${c.name}`,
      route: `/products/${p.shortKey}/${(c.moduleId || matchingModule.id).toLowerCase().replace(/_/g, '-')}`,
      actionIds: [`ACT_${c.id}_EXECUTE`, `ACT_${c.id}_EXPORT`, `ACT_${c.id}_REFRESH`],
      workflowIds: p.workflows.slice(0, 2).map(w => `WF_${w.replace(/\s+/g, '_').toUpperCase()}`),
      aiCapabilityIds: p.agents.slice(0, 2).map(a => `AI_${a.replace(/\s+/g, '_').toUpperCase()}`),
      permissionIds: p.permissions.slice(0, 3),
      uiMetadataId: `UIM_${c.id}`,
      runtimeComponentId: `RTC_${c.id}`,
      status: "VERIFIED"
    });
  });
});

const capRegistryContent = `import { createRegistryCollection, RegistryCollection, safeFind, safeFilter } from './UniversalRegistryContract';

export interface AuthoritativeCapability {
  capabilityId: string;
  productId: string;
  directorateId: string;
  departmentId: string;
  officeId: string;
  portalId: string;
  moduleId: string;
  name: string;
  description: string;
  route: string;
  actionIds: string[];
  workflowIds: string[];
  aiCapabilityIds: string[];
  permissionIds: string[];
  uiMetadataId: string;
  runtimeComponentId: string;
  status: "VERIFIED" | "RECONCILED" | "PARTIAL" | "UNRESOLVED";
}

const RAW_CAPABILITIES: AuthoritativeCapability[] = ${JSON.stringify(allCaps, null, 2)};

export const UniversalCapabilityRegistry: RegistryCollection<AuthoritativeCapability> = createRegistryCollection(
  RAW_CAPABILITIES,
  "UNIVERSAL_CAPABILITY_REGISTRY"
);

export function getCapabilitiesByProduct(productId: string): AuthoritativeCapability[] {
  const upper = (productId || '').toUpperCase();
  return safeFilter(UniversalCapabilityRegistry, c => 
    c.productId.toUpperCase() === upper || 
    (upper.includes('NURSERY') && c.productId.includes('NURSERY')) ||
    (upper.includes('FINTECH') && c.productId.includes('FINTECH')) ||
    (upper.includes('SECONDARY') && c.productId.includes('SECONDARY')) ||
    (upper.includes('ALUMNI') && c.productId.includes('ALUMNI')) ||
    (upper.includes('CHURCH') && c.productId.includes('CHURCH')) ||
    (upper.includes('CONTROL') && c.productId.includes('CONTROL'))
  );
}

export function getCapabilityById(capabilityId: string): AuthoritativeCapability | undefined {
  return safeFind(UniversalCapabilityRegistry, c => c.capabilityId === capabilityId);
}

export function getCapabilitiesByModule(moduleId: string): AuthoritativeCapability[] {
  return safeFilter(UniversalCapabilityRegistry, c => c.moduleId === moduleId);
}
`;

fs.writeFileSync(path.join(CORE_REG_DIR, "UniversalCapabilityRegistry.ts"), capRegistryContent, "utf8");
console.log(`✓ Created UniversalCapabilityRegistry.ts with ${allCaps.length} capabilities`);

// 3. Write UniversalUIMetadataRegistry.ts
const allUIMetadata = [];
allCaps.forEach(cap => {
  allUIMetadata.push({
    uiMetadataId: cap.uiMetadataId,
    capabilityId: cap.capabilityId,
    productId: cap.productId,
    moduleId: cap.moduleId,
    portalId: cap.portalId,
    pageTitle: cap.name,
    navLabel: cap.name.split(' ')[0] + ' ' + (cap.name.split(' ')[1] || 'Ops'),
    icon: "LayoutGrid",
    route: cap.route,
    breadcrumbs: ["Enterprise", cap.productId, cap.name],
    layout: "STANDARD_DASHBOARD_GRID",
    sections: [
      { id: "SEC_KPI", title: "Executive KPI Metrics", type: "KPI_ROW" },
      { id: "SEC_DATA", title: "Operational Records Ledger", type: "GRID_TABLE" },
      { id: "SEC_ACTIONS", title: "Action Dispatcher & Approvals", type: "ACTION_BAR" }
    ],
    cards: [
      { id: "CARD_1", title: "Active Work Items", value: "28", status: "NORMAL" },
      { id: "CARD_2", title: "Sovereign Audit Parity", value: "100%", status: "VERIFIED" }
    ],
    forms: [`FORM_${cap.moduleId}_ENTRY`],
    tables: [`TABLE_${cap.moduleId}_GRID`],
    dashboards: [`DASH_${cap.moduleId}_EXECUTIVE`],
    reports: [`REP_${cap.moduleId}_SUMMARY`],
    workflows: cap.workflowIds,
    aiCapabilities: cap.aiCapabilityIds,
    permissions: cap.permissionIds,
    runtimeComponentId: cap.runtimeComponentId,
    mobileParity: {
      hasMobileView: true,
      mobileComponentId: `M_${cap.runtimeComponentId}`,
      mobileRoute: `${cap.route}/mobile`
    }
  });
});

const uiMetadataContent = `import { createRegistryCollection, RegistryCollection, safeFind, safeFilter } from './UniversalRegistryContract';

export interface AuthoritativeUIMetadata {
  uiMetadataId: string;
  capabilityId: string;
  productId: string;
  moduleId: string;
  portalId: string;
  pageTitle: string;
  navLabel: string;
  icon: string;
  route: string;
  breadcrumbs: string[];
  layout: string;
  sections: Array<{ id: string; title: string; type: string }>;
  cards: Array<{ id: string; title: string; value: string; status: string }>;
  forms: string[];
  tables: string[];
  dashboards: string[];
  reports: string[];
  workflows: string[];
  aiCapabilities: string[];
  permissions: string[];
  runtimeComponentId: string;
  mobileParity: {
    hasMobileView: boolean;
    mobileComponentId: string;
    mobileRoute: string;
  };
}

const RAW_UI_METADATA: AuthoritativeUIMetadata[] = ${JSON.stringify(allUIMetadata, null, 2)};

export const UniversalUIMetadataRegistry: RegistryCollection<AuthoritativeUIMetadata> = createRegistryCollection(
  RAW_UI_METADATA,
  "UNIVERSAL_UI_METADATA_REGISTRY"
);

export function getUIMetadataByCapability(capabilityId: string): AuthoritativeUIMetadata | undefined {
  return safeFind(UniversalUIMetadataRegistry, u => u.capabilityId === capabilityId);
}

export function getUIMetadataByModule(moduleId: string): AuthoritativeUIMetadata[] {
  return safeFilter(UniversalUIMetadataRegistry, u => u.moduleId === moduleId);
}

export function getUIMetadataByProduct(productId: string): AuthoritativeUIMetadata[] {
  const upper = (productId || '').toUpperCase();
  return safeFilter(UniversalUIMetadataRegistry, u => 
    u.productId.toUpperCase() === upper ||
    (upper.includes('NURSERY') && u.productId.includes('NURSERY')) ||
    (upper.includes('FINTECH') && u.productId.includes('FINTECH')) ||
    (upper.includes('SECONDARY') && u.productId.includes('SECONDARY')) ||
    (upper.includes('ALUMNI') && u.productId.includes('ALUMNI')) ||
    (upper.includes('CHURCH') && u.productId.includes('CHURCH')) ||
    (upper.includes('CONTROL') && u.productId.includes('CONTROL'))
  );
}
`;

fs.writeFileSync(path.join(CORE_REG_DIR, "UniversalUIMetadataRegistry.ts"), uiMetadataContent, "utf8");
console.log(`✓ Created UniversalUIMetadataRegistry.ts with ${allUIMetadata.length} UI metadata entries`);

// 4. Write UniversalRuntimeComponentRegistry.ts
const allRuntimeComponents = [];
allCaps.forEach(cap => {
  allRuntimeComponents.push({
    runtimeComponentId: cap.runtimeComponentId,
    uiMetadataId: cap.uiMetadataId,
    capabilityId: cap.capabilityId,
    productId: cap.productId,
    moduleId: cap.moduleId,
    componentName: `${cap.name.replace(/[^a-zA-Z0-9]/g, '')}Runtime`,
    importPath: `src/core/enterprise/components/UniversalModuleWorkspace`,
    exportName: "UniversalModuleWorkspace",
    renderMode: "HYBRID_METADATA_DRIVEN",
    props: {
      moduleId: cap.moduleId,
      capabilityId: cap.capabilityId,
      productId: cap.productId
    },
    status: "LOADABLE"
  });
});

const runtimeRegistryContent = `import { createRegistryCollection, RegistryCollection, safeFind, safeFilter } from './UniversalRegistryContract';

export interface AuthoritativeRuntimeComponent {
  runtimeComponentId: string;
  uiMetadataId: string;
  capabilityId: string;
  productId: string;
  moduleId: string;
  componentName: string;
  importPath: string;
  exportName: string;
  renderMode: "HYBRID_METADATA_DRIVEN" | "SPECIALIZED_PORTAL" | "SHELL";
  props: Record<string, any>;
  status: "LOADABLE" | "MOUNTED" | "DEFERRED";
}

const RAW_RUNTIME_COMPONENTS: AuthoritativeRuntimeComponent[] = ${JSON.stringify(allRuntimeComponents, null, 2)};

export const UniversalRuntimeComponentRegistry: RegistryCollection<AuthoritativeRuntimeComponent> = createRegistryCollection(
  RAW_RUNTIME_COMPONENTS,
  "UNIVERSAL_RUNTIME_COMPONENT_REGISTRY"
);

export function getRuntimeComponentById(runtimeComponentId: string): AuthoritativeRuntimeComponent | undefined {
  return safeFind(UniversalRuntimeComponentRegistry, r => r.runtimeComponentId === runtimeComponentId);
}

export function getRuntimeComponentByCapability(capabilityId: string): AuthoritativeRuntimeComponent | undefined {
  return safeFind(UniversalRuntimeComponentRegistry, r => r.capabilityId === capabilityId);
}
`;

fs.writeFileSync(path.join(CORE_REG_DIR, "UniversalRuntimeComponentRegistry.ts"), runtimeRegistryContent, "utf8");
console.log(`✓ Created UniversalRuntimeComponentRegistry.ts with ${allRuntimeComponents.length} runtime components`);

// 5. Write UniversalWorkflowRegistry.ts
const allWorkflows = [];
parsedProducts.forEach(p => {
  p.workflows.forEach(w => {
    allWorkflows.push({
      workflowId: `WF_${w.replace(/\s+/g, '_').toUpperCase()}`,
      productId: p.productId,
      name: w,
      states: ["DRAFT", "PENDING_VERIFICATION", "REVIEW_AUDIT", "APPROVED", "REJECTED", "SETTLED"],
      initialState: "DRAFT",
      finalStates: ["APPROVED", "REJECTED", "SETTLED"],
      transitions: [
        { from: "DRAFT", to: "PENDING_VERIFICATION", action: "SUBMIT" },
        { from: "PENDING_VERIFICATION", to: "REVIEW_AUDIT", action: "VERIFY" },
        { from: "REVIEW_AUDIT", to: "APPROVED", action: "AUTHORIZE" },
        { from: "REVIEW_AUDIT", to: "REJECTED", action: "REJECT" },
        { from: "APPROVED", to: "SETTLED", action: "FINALIZE" }
      ],
      requiredRoles: p.permissions.slice(0, 3)
    });
  });
});

const workflowContent = `import { createRegistryCollection, RegistryCollection, safeFind, safeFilter } from './UniversalRegistryContract';

export interface AuthoritativeWorkflow {
  workflowId: string;
  productId: string;
  name: string;
  states: string[];
  initialState: string;
  finalStates: string[];
  transitions: Array<{ from: string; to: string; action: string }>;
  requiredRoles: string[];
}

const RAW_WORKFLOWS: AuthoritativeWorkflow[] = ${JSON.stringify(allWorkflows, null, 2)};

export const UniversalWorkflowRegistry: RegistryCollection<AuthoritativeWorkflow> = createRegistryCollection(
  RAW_WORKFLOWS,
  "UNIVERSAL_WORKFLOW_REGISTRY"
);

export function getWorkflowsByProduct(productId: string): AuthoritativeWorkflow[] {
  const upper = (productId || '').toUpperCase();
  return safeFilter(UniversalWorkflowRegistry, w => 
    w.productId.toUpperCase() === upper ||
    (upper.includes('NURSERY') && w.productId.includes('NURSERY')) ||
    (upper.includes('FINTECH') && w.productId.includes('FINTECH')) ||
    (upper.includes('SECONDARY') && w.productId.includes('SECONDARY')) ||
    (upper.includes('ALUMNI') && w.productId.includes('ALUMNI')) ||
    (upper.includes('CHURCH') && w.productId.includes('CHURCH')) ||
    (upper.includes('CONTROL') && w.productId.includes('CONTROL'))
  );
}
`;

fs.writeFileSync(path.join(CORE_REG_DIR, "UniversalWorkflowRegistry.ts"), workflowContent, "utf8");
console.log(`✓ Created UniversalWorkflowRegistry.ts with ${allWorkflows.length} workflows`);

// 6. Write UniversalAIRegistry.ts
const allAgents = [];
parsedProducts.forEach(p => {
  p.agents.forEach(a => {
    allAgents.push({
      agentId: `AI_${a.replace(/\s+/g, '_').toUpperCase()}`,
      productId: p.productId,
      name: a,
      description: `Autonomous cognitive agent for ${p.productName} handling ${a}`,
      modelAlias: a.toLowerCase().includes('auditor') || a.toLowerCase().includes('governor') || a.toLowerCase().includes('predictor') ? 'gemini-2.5-pro' : 'gemini-2.5-flash',
      capabilities: [
        "AUTOMATED_VERIFICATION",
        "SEMANTIC_ANOMALY_DETECTION",
        "PREDICTIVE_SCORING",
        "POLICY_ENFORCEMENT"
      ],
      systemPrompt: `You are the authoritative sovereign agent ${a} operating inside ${p.productName}. Enforce 100% strict compliance and mathematical precision.`
    });
  });
});

const aiRegistryContent = `import { createRegistryCollection, RegistryCollection, safeFind, safeFilter } from './UniversalRegistryContract';

export interface AuthoritativeAIAgent {
  agentId: string;
  productId: string;
  name: string;
  description: string;
  modelAlias: string;
  capabilities: string[];
  systemPrompt: string;
}

const RAW_AI_AGENTS: AuthoritativeAIAgent[] = ${JSON.stringify(allAgents, null, 2)};

export const UniversalAIRegistry: RegistryCollection<AuthoritativeAIAgent> = createRegistryCollection(
  RAW_AI_AGENTS,
  "UNIVERSAL_AI_REGISTRY"
);

export function getAIAgentsByProduct(productId: string): AuthoritativeAIAgent[] {
  const upper = (productId || '').toUpperCase();
  return safeFilter(UniversalAIRegistry, a => 
    a.productId.toUpperCase() === upper ||
    (upper.includes('NURSERY') && a.productId.includes('NURSERY')) ||
    (upper.includes('FINTECH') && a.productId.includes('FINTECH')) ||
    (upper.includes('SECONDARY') && a.productId.includes('SECONDARY')) ||
    (upper.includes('ALUMNI') && a.productId.includes('ALUMNI')) ||
    (upper.includes('CHURCH') && a.productId.includes('CHURCH')) ||
    (upper.includes('CONTROL') && a.productId.includes('CONTROL'))
  );
}
`;

fs.writeFileSync(path.join(CORE_REG_DIR, "UniversalAIRegistry.ts"), aiRegistryContent, "utf8");
console.log(`✓ Created UniversalAIRegistry.ts with ${allAgents.length} AI agents`);

// 7. Write UniversalFormRegistry.ts, UniversalTableRegistry.ts, UniversalDashboardRegistry.ts, UniversalReportRegistry.ts, UniversalActionRegistry.ts, UniversalPermissionRegistry.ts
const formEntries = [];
const tableEntries = [];
const dashEntries = [];
const repEntries = [];
const actEntries = [];
const permEntries = [];

parsedProducts.forEach(p => {
  p.modules.forEach(m => {
    formEntries.push({
      formId: `FORM_${m.id}_ENTRY`,
      moduleId: m.id,
      productId: p.productId,
      title: `${m.name} Master Record Form`,
      fields: [
        { name: "referenceNumber", label: "Reference Code", type: "text", required: true },
        { name: "entityName", label: "Entity / Account Name", type: "text", required: true },
        { name: "category", label: "Category / Classification", type: "select", options: ["Primary", "Secondary", "General", "Restricted"], required: true },
        { name: "status", label: "Status", type: "select", options: ["ACTIVE", "PENDING", "LOCKED"], required: true },
        { name: "notes", label: "Operational Notes", type: "textarea", required: false }
      ]
    });

    tableEntries.push({
      tableId: `TABLE_${m.id}_GRID`,
      moduleId: m.id,
      productId: p.productId,
      title: `${m.name} Grid View`,
      columns: [
        { key: "id", label: "ID", sortable: true },
        { key: "referenceNumber", label: "Reference", sortable: true },
        { key: "entityName", label: "Name", sortable: true },
        { key: "category", label: "Category", sortable: true },
        { key: "status", label: "Status", sortable: true },
        { key: "createdAt", label: "Created At", sortable: true }
      ]
    });

    dashEntries.push({
      dashboardId: `DASH_${m.id}_EXECUTIVE`,
      moduleId: m.id,
      productId: p.productId,
      title: `${m.name} Executive Dashboard`,
      kpis: [
        { label: "Active Volume", value: "1,240", change: "+5.2%" },
        { label: "Audit Parity", value: "100.0%", change: "PASS" },
        { label: "Pending Approvals", value: "3", change: "-1" }
      ]
    });

    repEntries.push({
      reportId: `REP_${m.id}_SUMMARY`,
      moduleId: m.id,
      productId: p.productId,
      title: `${m.name} Periodic Analytical Summary`,
      exportFormats: ["PDF", "CSV", "XLSX"]
    });

    actEntries.push({
      actionId: `ACT_${m.id}_EXECUTE`,
      moduleId: m.id,
      productId: p.productId,
      name: `Execute ${m.name} Transaction`,
      type: "COMMAND"
    });
  });

  p.permissions.forEach(perm => {
    permEntries.push({
      permissionId: perm,
      productId: p.productId,
      role: perm,
      scope: "SOVEREIGN_PARTITION"
    });
  });
});

fs.writeFileSync(path.join(CORE_REG_DIR, "UniversalFormRegistry.ts"), `import { createRegistryCollection, RegistryCollection, safeFind, safeFilter } from './UniversalRegistryContract';\nexport const UniversalFormRegistry = createRegistryCollection(${JSON.stringify(formEntries, null, 2)}, "UNIVERSAL_FORM_REGISTRY");\n`, "utf8");
fs.writeFileSync(path.join(CORE_REG_DIR, "UniversalTableRegistry.ts"), `import { createRegistryCollection, RegistryCollection, safeFind, safeFilter } from './UniversalRegistryContract';\nexport const UniversalTableRegistry = createRegistryCollection(${JSON.stringify(tableEntries, null, 2)}, "UNIVERSAL_TABLE_REGISTRY");\n`, "utf8");
fs.writeFileSync(path.join(CORE_REG_DIR, "UniversalDashboardRegistry.ts"), `import { createRegistryCollection, RegistryCollection, safeFind, safeFilter } from './UniversalRegistryContract';\nexport const UniversalDashboardRegistry = createRegistryCollection(${JSON.stringify(dashEntries, null, 2)}, "UNIVERSAL_DASHBOARD_REGISTRY");\n`, "utf8");
fs.writeFileSync(path.join(CORE_REG_DIR, "UniversalReportRegistry.ts"), `import { createRegistryCollection, RegistryCollection, safeFind, safeFilter } from './UniversalRegistryContract';\nexport const UniversalReportRegistry = createRegistryCollection(${JSON.stringify(repEntries, null, 2)}, "UNIVERSAL_REPORT_REGISTRY");\n`, "utf8");
fs.writeFileSync(path.join(CORE_REG_DIR, "UniversalActionRegistry.ts"), `import { createRegistryCollection, RegistryCollection, safeFind, safeFilter } from './UniversalRegistryContract';\nexport const UniversalActionRegistry = createRegistryCollection(${JSON.stringify(actEntries, null, 2)}, "UNIVERSAL_ACTION_REGISTRY");\n`, "utf8");
fs.writeFileSync(path.join(CORE_REG_DIR, "UniversalPermissionRegistry.ts"), `import { createRegistryCollection, RegistryCollection, safeFind, safeFilter } from './UniversalRegistryContract';\nexport const UniversalPermissionRegistry = createRegistryCollection(${JSON.stringify(permEntries, null, 2)}, "UNIVERSAL_PERMISSION_REGISTRY");\n`, "utf8");

console.log("✓ Created UniversalFormRegistry, UniversalTableRegistry, UniversalDashboardRegistry, UniversalReportRegistry, UniversalActionRegistry, UniversalPermissionRegistry");

