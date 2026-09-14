/**
 * JUMO UEOS
 * Enterprise Organization Registry
 */

export class OrganizationRegistry {

 constructor(){
  this.organizations=[];
 }


 register(org){

  const record={
   id: org.id || `org-${Date.now()}`,
   name: org.name,
   type: org.type,
   parentId: org.parentId || null,
   jurisdiction: org.jurisdiction || null,
   departments: [],
   users: [],
   status:"ACTIVE",
   createdAt:new Date().toISOString()
  };

  this.organizations.push(record);

  return record;

 }


 get(id){
  return this.organizations.find(o=>o.id===id);
 }


 getChildren(parentId){

  return this.organizations.filter(
   o=>o.parentId===parentId
  );

 }


 list(){
  return this.organizations;
 }

}


export const organizationRegistry =
new OrganizationRegistry();
