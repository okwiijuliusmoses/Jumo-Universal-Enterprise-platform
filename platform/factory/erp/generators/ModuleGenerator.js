export class ModuleGenerator {

generate(template){

return template.modules || [];

}

}

export const moduleGenerator = new ModuleGenerator();
