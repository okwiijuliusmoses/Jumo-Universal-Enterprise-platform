/**
 * JUMO UEOS
 * Permission Governance Registry
 */

export class PermissionGovernanceRegistry {

constructor(){

 this.status="ONLINE";
 this.permissions=[];

}


register(permission){

 this.permissions.push({
  ...permission,
  active:true
 });

 return permission;

}


list(){
 return this.permissions;
}


health(){

 return {
  registry:"UEOS Permission Governance Registry",
  status:this.status,
  permissions:this.permissions.length
 };

}

}


export const permissionGovernanceRegistry =
new PermissionGovernanceRegistry();
