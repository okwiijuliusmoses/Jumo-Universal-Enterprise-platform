/**
 * JUMO UEOS
 * Governance Registry Bootstrap
 */

import { masterRegistryRegistry } from "./MasterRegistryRegistry.js";

import { lifecycleControlRegistry } from "./LifecycleControlRegistry.js";
import { permissionGovernanceRegistry } from "./PermissionGovernanceRegistry.js";
import { approvalRegistry } from "./ApprovalRegistry.js";
import { systemConfigurationRegistry } from "./SystemConfigurationRegistry.js";
import { publicExperienceRegistry } from "./PublicExperienceRegistry.js";
import { upgradeRegistry } from "./UpgradeRegistry.js";
import { navigationRegistry } from "./NavigationRegistry.js";
import { auditAccountabilityRegistry } from "./AuditAccountabilityRegistry.js";


export function registerGovernanceRegistries(){

const registries=[

{
 id:"lifecycle-control",
 name:"Lifecycle Control Registry",
 instance:lifecycleControlRegistry
},

{
 id:"permission-governance",
 name:"Permission Governance Registry",
 instance:permissionGovernanceRegistry
},

{
 id:"approval",
 name:"Approval Registry",
 instance:approvalRegistry
},

{
 id:"system-configuration",
 name:"System Configuration Registry",
 instance:systemConfigurationRegistry
},

{
 id:"public-experience",
 name:"Public Experience Registry",
 instance:publicExperienceRegistry
},

{
 id:"upgrade-release",
 name:"Upgrade Registry",
 instance:upgradeRegistry
},

{
 id:"navigation",
 name:"Navigation Registry",
 instance:navigationRegistry
},

{
 id:"audit-accountability",
 name:"Audit Accountability Registry",
 instance:auditAccountabilityRegistry
}

];


registries.forEach(r=>
 masterRegistryRegistry.register(r)
);


return masterRegistryRegistry.list();

}
