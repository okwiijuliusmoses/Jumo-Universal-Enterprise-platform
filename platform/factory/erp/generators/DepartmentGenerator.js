export class DepartmentGenerator {

generate(template){

return template.departments || [];

}

}

export const departmentGenerator = new DepartmentGenerator();
