export class RequisitionGenerator {

generate(template){

return template.requisitions || [];

}

}

export const requisitionGenerator = new RequisitionGenerator();
