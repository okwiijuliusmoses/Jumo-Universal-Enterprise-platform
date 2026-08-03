/**
 * JUMO UEOS
 * Identity Access Governance Registry
 */

export class AccessGovernanceRegistry {

 constructor(){
  this.roles=[];
  this.policies=[];
 }


 registerRole(role){

  this.roles.push({
   id:role.id || `role-${Date.now()}`,
   name:role.name,
   permissions:role.permissions || [],
   scope:role.scope || "ENTERPRISE",
   status:"ACTIVE"
  });

 }


 registerPolicy(policy){

  this.policies.push({
   id:policy.id || `policy-${Date.now()}`,
   name:policy.name,
   rules:policy.rules || [],
   status:"ACTIVE"
  });

 }


 listRoles(){
  return this.roles;
 }


 listPolicies(){
  return this.policies;
 }

}


export const accessGovernanceRegistry =
new AccessGovernanceRegistry();
