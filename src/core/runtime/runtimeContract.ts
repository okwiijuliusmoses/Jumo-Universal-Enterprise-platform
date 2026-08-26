/**
 * JUMO UEOS Runtime Contract Layer
 *
 * Ensures all runtime schema collections, configurations, portals,
 * and deep objects are completely initialized to safe defaults,
 * preventing any possible "undefined.map()" or similar crashes.
 */

export interface PortalDefinition {
  id: string;
  name: string;
  role: string;
  description: string;
  modules: string[];
  permissions: string[];
  workflows: string[];
}

export interface PublicExperienceConfig {
  publicDomainSuffix: string;
  tagline: string;
  announcements: string[];
  publicServices: string[];
  actionButtons: { label: string; action: string; type: "primary" | "secondary" | "outline" }[];
}

export interface GovernanceNode {
  title: string;
  role: string;
  subNodes: GovernanceNode[];
}

export function normalizeGovernanceNode(node: any): GovernanceNode {
  if (!node || typeof node !== "object") {
    return { title: "Executive Council", role: "Governing Board", subNodes: [] };
  }
  return {
    title: node.title || "Committee Node",
    role: node.role || "Governance Member",
    subNodes: Array.isArray(node.subNodes) ? node.subNodes.map(normalizeGovernanceNode) : []
  };
}

export interface ERPTemplateDefinition {
  id: string;
  aliases?: string[];
  version: string;
  approvalStatus: "APPROVED" | "PENDING_AUDIT";
  name: string;
  ecosystemId: string;
  governanceType: string;
  description: string;
  publicExperience: PublicExperienceConfig;
  governanceStructure: GovernanceNode;
  portals: PortalDefinition[];
  departments: string[];
  modules: string[];
  workflows: string[];
  forms: string[];
  components: string[];
  apps?: string[];
  services?: string[];
  navigation?: any[];
  securityProfile: {
    dataSegregation: string;
    authPolicy: string;
    encryptionLevel: string;
  };
  aiProfile: string;
}

export interface NormalizedRuntime {
  connected: boolean;
  status: string;
  error?: string | null;
  ecosystems: any[];
  templates: ERPTemplateDefinition[];
  instances: any[];
  domains: any[];
  services: any[];
  portals: any[];
  modules: any[];
  workflows: any[];
  notifications: any[];
  widgets: any[];
  systemHealth?: any;
}

/**
 * Normalizes deep templates recursively to make sure all sub-properties
 * and arrays exist.
 */
export function normalizeTemplate(t: any): ERPTemplateDefinition {
  if (!t || typeof t !== "object") {
    return {
      id: "unknown",
      version: "1.0.0",
      approvalStatus: "PENDING_AUDIT",
      name: "Unknown Template",
      ecosystemId: "unknown",
      governanceType: "Standard",
      description: "Fallback Template",
      publicExperience: {
        publicDomainSuffix: ".jumo.platform",
        tagline: "Enterprise Operating Platform",
        announcements: [],
        publicServices: [],
        actionButtons: []
      },
      governanceStructure: { title: "Executive Council", role: "Governing Board", subNodes: [] },
      portals: [],
      departments: [],
      modules: [],
      workflows: [],
      forms: [],
      components: [],
      apps: [],
      services: [],
      navigation: [],
      securityProfile: {
        dataSegregation: "Standard Tenant Isolation",
        authPolicy: "Standard MFA",
        encryptionLevel: "AES-256"
      },
      aiProfile: "sovereign-ai"
    };
  }

  const portals = Array.isArray(t.portals)
    ? t.portals.map((p: any) => {
        if (!p || typeof p !== "object") {
          return {
            id: String(p || "portal").toLowerCase().replace(/\s+/g, "-"),
            name: String(p || "Portal"),
            role: "User",
            description: "",
            modules: [],
            permissions: [],
            workflows: []
          };
        }
        return {
          id: p.id || String(p.name || "portal").toLowerCase().replace(/\s+/g, "-"),
          name: p.name || "Portal",
          role: p.role || "User",
          description: p.description || "",
          modules: Array.isArray(p.modules) ? p.modules : [],
          permissions: Array.isArray(p.permissions) ? p.permissions : [],
          workflows: Array.isArray(p.workflows) ? p.workflows : []
        };
      })
    : [];

  const portalNames = portals.map((p: any) => p.name);
  const departments = Array.isArray(t.departments) ? t.departments : [];
  const modules = Array.isArray(t.modules) ? t.modules : [];
  const workflows = Array.isArray(t.workflows) ? t.workflows : [];
  const forms = Array.isArray(t.forms) ? t.forms : [];
  const components = Array.isArray(t.components) ? t.components : [];
  
  const apps = Array.isArray(t.apps) && t.apps.length > 0 ? t.apps : portalNames;
  const services = Array.isArray(t.services) && t.services.length > 0 ? t.services : ["FAAP Ledger Service", "Zero-Trust Identity Service", "Workflow Automation Service"];
  
  const navigation = Array.isArray(t.navigation) && t.navigation.length > 0
    ? t.navigation
    : [
        ...portalNames.map((p: string) => ({ id: p.toLowerCase().replace(/\s+/g, "-"), name: p, type: "PORTAL" })),
        ...modules.map((m: string) => ({ id: m.toLowerCase().replace(/\s+/g, "-"), name: m, type: "MODULE" })),
        ...departments.map((d: string) => ({ id: d.toLowerCase().replace(/\s+/g, "-"), name: d, type: "DEPARTMENT" })),
        ...workflows.map((w: string) => ({ id: w.toLowerCase().replace(/\s+/g, "-"), name: w, type: "WORKFLOW" })),
        ...services.map((s: string) => ({ id: s.toLowerCase().replace(/\s+/g, "-"), name: s, type: "SERVICE" })),
      ];

  const rawPub = t.publicExperience || {};
  const publicExperience: PublicExperienceConfig = {
    publicDomainSuffix: rawPub.publicDomainSuffix || ".jumo.platform",
    tagline: rawPub.tagline || "Enterprise Operating Platform",
    announcements: Array.isArray(rawPub.announcements) ? rawPub.announcements : [],
    publicServices: Array.isArray(rawPub.publicServices) ? rawPub.publicServices : [],
    actionButtons: Array.isArray(rawPub.actionButtons)
      ? rawPub.actionButtons.map((btn: any) => ({
          label: btn?.label || "Button",
          action: btn?.action || "action",
          type: btn?.type || "secondary"
        }))
      : []
  };

  const securityProfile = t.securityProfile || {
    dataSegregation: "Standard Tenant Isolation",
    authPolicy: "Standard MFA",
    encryptionLevel: "AES-256"
  };

  return {
    id: t.id || "unknown",
    aliases: Array.isArray(t.aliases) ? t.aliases : [],
    version: t.version || "1.0.0",
    approvalStatus: t.approvalStatus || "PENDING_AUDIT",
    name: t.name || "Unknown Template",
    ecosystemId: t.ecosystemId || "unknown",
    governanceType: t.governanceType || "Standard",
    description: t.description || "",
    publicExperience,
    governanceStructure: normalizeGovernanceNode(t.governanceStructure),
    portals,
    departments,
    modules,
    workflows,
    forms,
    components,
    apps,
    services,
    navigation,
    securityProfile,
    aiProfile: t.aiProfile || "sovereign-ai"
  };
}

/**
 * Ensures all dynamic runtime fields are completely present and secure.
 */
export function normalizeRuntime(data: any): NormalizedRuntime {
  if (!data || typeof data !== "object") {
    return {
      connected: false,
      status: "JUMO UEOS Runtime Offline - Diagnostics Available",
      error: null,
      ecosystems: [],
      templates: [],
      instances: [],
      domains: [],
      services: [],
      portals: [],
      modules: [],
      workflows: [],
      notifications: [],
      widgets: [],
      systemHealth: null
    };
  }

  const rawTemplates = Array.isArray(data.templates) ? data.templates : [];
  const templates = rawTemplates.map(normalizeTemplate);

  const rawInstances = Array.isArray(data.instances) ? data.instances : [];
  const instances = rawInstances.map((inst: any) => {
    if (!inst || typeof inst !== "object") {
      return {
        instanceId: "unknown",
        status: "SUSPENDED",
        configuration: {
          portals: []
        }
      };
    }
    const config = inst.configuration && typeof inst.configuration === "object" ? inst.configuration : {};
    return {
      ...inst,
      status: inst.status || "ACTIVE",
      apps: Array.isArray(inst.apps) ? inst.apps : [],
      modules: Array.isArray(inst.modules) ? inst.modules : [],
      services: Array.isArray(inst.services) ? inst.services : [],
      navigation: Array.isArray(inst.navigation) ? inst.navigation : [],
      workflows: Array.isArray(inst.workflows) ? inst.workflows : [],
      configuration: {
        ...config,
        portals: Array.isArray(config.portals) ? config.portals : [],
        portalDetails: Array.isArray(config.portalDetails) ? config.portalDetails : [],
        departments: Array.isArray(config.departments) ? config.departments : [],
        modules: Array.isArray(config.modules) ? config.modules : [],
        workflows: Array.isArray(config.workflows) ? config.workflows : [],
        forms: Array.isArray(config.forms) ? config.forms : [],
        components: Array.isArray(config.components) ? config.components : [],
        apps: Array.isArray(config.apps) ? config.apps : [],
        services: Array.isArray(config.services) ? config.services : [],
        navigation: Array.isArray(config.navigation) ? config.navigation : [],
        aiProfile: config.aiProfile || "sovereign-ai"
      }
    };
  });

  const rawEcosystems = Array.isArray(data.ecosystems) ? data.ecosystems : [];
  const ecosystems = rawEcosystems.map((eco: any) => {
    if (!eco || typeof eco !== "object") {
      return { id: "unknown", approvedTemplates: [] };
    }
    return {
      ...eco,
      approvedTemplates: Array.isArray(eco.approvedTemplates) ? eco.approvedTemplates : []
    };
  });

  const domains = Array.isArray(data.domains)
    ? data.domains.map((d: any) => ({
        id: d?.id || "unknown",
        name: d?.name || "Enterprise Domain",
        version: d?.version || "v1.0",
        status: d?.status || "Active",
        description: d?.description || ""
      }))
    : [];

  const services = Array.isArray(data.services)
    ? data.services.map((s: any) => ({
        id: s?.id || "unknown",
        name: s?.name || "Sovereign Service",
        version: s?.version || "v1.0",
        status: s?.status || "Active",
        description: s?.description || ""
      }))
    : [];

  const portals = Array.isArray(data.portals) ? data.portals : [];
  const modules = Array.isArray(data.modules) ? data.modules : [];
  const workflows = Array.isArray(data.workflows) ? data.workflows : [];
  const notifications = Array.isArray(data.notifications) ? data.notifications : [];
  const widgets = Array.isArray(data.widgets) ? data.widgets : [];

  return {
    connected: Boolean(data.connected),
    status: data.status || "JUMO UEOS Sovereign Runtime Active",
    error: data.error || null,
    ecosystems,
    templates,
    instances,
    domains,
    services,
    portals,
    modules,
    workflows,
    notifications,
    widgets,
    systemHealth: data.systemHealth || null
  };
}
