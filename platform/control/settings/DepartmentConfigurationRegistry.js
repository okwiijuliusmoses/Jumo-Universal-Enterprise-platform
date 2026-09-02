/**
 * JUMO UEOS
 * Department Configuration Registry
 */

export class DepartmentConfigurationRegistry {

 constructor(){
  this.departments=[];
 }

 register(department){

  const exists=this.departments.find(
   d=>d.id===department.id
  );

  if(exists){
   return exists;
  }

  this.departments.push({
   ...department,
   status:"ACTIVE"
  });

  return department;
 }

 list(){
  return this.departments;
 }

 health(){
  return {
   registry:"UEOS Department Configuration Registry",
   departments:this.departments.length,
   status:"ONLINE"
  };
 }

}

export const departmentConfigurationRegistry =
new DepartmentConfigurationRegistry();
