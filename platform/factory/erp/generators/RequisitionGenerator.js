export class RequisitionGenerator {

generate(){

return [
"Purchase Request",
"Leave Request",
"Payment Request",
"Maintenance Request",
"Service Request",
"Approval Request"
];

}

}

export const requisitionGenerator =
new RequisitionGenerator();
