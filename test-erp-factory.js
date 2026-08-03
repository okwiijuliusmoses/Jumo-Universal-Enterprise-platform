import { erpFactoryManager } from "./platform/factory/erp/ERPFactoryManager.js";
import { erpActivationService } from "./platform/factory/erp/services/ERPActivationService.js";

const blueprint = {
  blueprintId:"education-erp",
  instanceId:"education-demo-001",
  name:"JUMO Education ERP Test Instance",
  tenant:"demo-university",

  configuration:{
    institutionType:"University",
    modules:[
      "admissions",
      "student-management",
      "finance",
      "library",
      "examinations"
    ]
  }
};

console.log("GENERATING ERP...");

const generated =
erpFactoryManager.generateERP(blueprint);

console.log(JSON.stringify({
 id:generated.id,
 blueprintId:generated.blueprintId,
 portals:generated.portals.length,
 modules:generated.modules.length,
 forms:generated.forms.length,
 workflows:generated.workflows.length,
 status:generated.status
},null,2));


console.log("ACTIVATING ERP...");

const activated =
erpActivationService.activate(generated);

console.log(JSON.stringify(activated,null,2));
