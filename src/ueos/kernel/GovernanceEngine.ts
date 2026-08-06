
export interface GovernanceNode {
  id?: string;
  title: string;
  role: string;
  subNodes?: GovernanceNode[];
}

export interface EnterpriseModule {
  id: string;
  name: string;
  category: string;
  permissions: string[];
  workflows: string[];
  forms: string[];
  reports: string[];
}

export interface EnterpriseEcosystem {
  id: string;
  name: string;
  version: string;
  category: string;
  description: string;
  governanceModel: string;
  supportedCountries: string[];
  institutionTypes: string[];
  templates: string[];
  status: "Active" | "Draft" | "Archived";
  modules: string[];
  permissions: string[];
}

export interface EnterpriseTemplate {
  [key: string]: any;
  id: string;
  name: string;
  ecosystemId: string;
  description: string;
  version: string;
  governance: GovernanceNode;
  governanceStructure?: any;
  portals: Array<{
    id: string;
    name: string;
    roles: string[];
    modules: string[];
  }>;
  availableModules: EnterpriseModule[];
  modules?: any[];
  workflows: string[];
  reports: string[];
  integrations: string[];
  status: "Active" | "Draft";
  aliases?: string[];
  publicExperience?: any;
  securityProfile?: any;
  departments?: string[];
  forms?: string[];
  components?: string[];
  apps?: string[];
  services?: string[];
  aiProfile?: string;
  approvalStatus?: string;
}

export interface EnterpriseInstance {
  [key: string]: any;
  id: string;
  instanceId?: string; // Alias
  name: string;
  templateId: string;
  templateName?: string;
  ecosystemId: string;
  profile: {
    country: string;
    region: string;
    operator: string;
    institutionId?: string;
    institutionName?: string;
  };
  institution?: {
    institutionId: string;
    institutionName: string;
    country: string;
    region: string;
    operator: string;
  };
  governance: GovernanceNode;
  modules: string[];
  apps?: string[];
  services?: string[];
  navigation?: any[];
  workflows?: string[];
  users: Array<{ id: string; name: string; role: string }>;
  status: "Operational" | "Provisioning" | "Maintenance" | "Suspended" | "ACTIVE";
  tenantConfig: any;
  configuration?: any;
  createdAt: string;
}

export interface EnterpriseWorkflow {
  id: string;
  name: string;
  trigger: string;
  steps: string[];
  approvals: string[];
  roles: string[];
  status: "Active" | "Inactive" | "Pending";
}

export interface EnterpriseComponent {
  id: string;
  name: string;
  type: "UI" | "SERVICE" | "DATA";
  description: string;
}

export interface EnterpriseForm {
  id: string;
  name: string;
  fields: any[];
  validation: any;
  workflowBinding?: string;
}

export class GovernanceEngine {
  static resolveHierarchy(node: GovernanceNode, depth: number = 0): any[] {
    const result = [{ ...node, depth }];
    if (node.subNodes) {
      node.subNodes.forEach(sub => {
        result.push(...this.resolveHierarchy(sub, depth + 1));
      });
    }
    return result;
  }
}
