export class InformationManagementGenerator {

generate(template){

return template.informationSystems || [];

}

}

export const informationManagementGenerator = new InformationManagementGenerator();
