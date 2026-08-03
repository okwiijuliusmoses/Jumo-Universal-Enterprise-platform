export class ComponentGenerator {

generate(template){

return template.components || [];

}

}

export const componentGenerator = new ComponentGenerator();
