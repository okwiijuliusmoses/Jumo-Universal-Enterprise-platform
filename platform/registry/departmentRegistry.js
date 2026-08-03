/**
 * JUMO UEOS
 * Enterprise Department Registry
 */

export class DepartmentRegistry {

 constructor(){
  this.departments=[];
 }


 register(department){

  this.departments.push({

   id:department.id || `dept-${Date.now()}`,

   name:department.name,

   organizationId:department.organizationId,

   parentDepartment:
    department.parentDepartment || null,

   services:[],

   portals:[],

   workflows:[],

   status:"ACTIVE"

  });

 }


 list(){

  return this.departments;

 }

}


export const departmentRegistry =
new DepartmentRegistry();
