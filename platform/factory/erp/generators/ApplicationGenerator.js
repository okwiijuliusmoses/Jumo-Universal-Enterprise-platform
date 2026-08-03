export class ApplicationGenerator {

generate(template){

return template.applications || [];

}

}

export const applicationGenerator = new ApplicationGenerator();
