/**
 * JUMO UEOS
 * AI ERP Department Generator
 */

export class DepartmentGenerator {

 generate(blueprint){

   return [
    "Administration",
    "Finance",
    "Operations",
    "Human Resources",
    "Technology",
    "Compliance",
    "Research & Innovation",
    `${blueprint.category} Department`
   ];

 }

}

export const departmentGenerator = new DepartmentGenerator();
