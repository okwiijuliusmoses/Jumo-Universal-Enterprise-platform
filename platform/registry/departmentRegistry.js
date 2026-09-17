/**
 * JUMO UEOS
 * Enterprise Department Registry
 */

export class DepartmentRegistry {

 constructor(){
   this.status="ONLINE";
   this.departments=[];
 }

 register(department){
   this.departments.push(department);
   return department;
 }

 list(){
   return this.departments;
 }

 health(){
   return {
    registry:"JUMO Department Registry",
    status:this.status,
    departments:this.departments.length
   };
 }

}

export const departmentRegistry = new DepartmentRegistry();
