export class FormGenerator {

generate(template){

return template.forms || [];

}

}

export const formGenerator = new FormGenerator();
