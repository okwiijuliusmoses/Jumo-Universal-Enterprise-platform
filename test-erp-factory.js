import { erpFactoryManager } from "./platform/factory/erp/ERPFactoryManager.js";
import { erpActivationService } from "./platform/factory/erp/services/ERPActivationService.js";

const blueprint = {
 id:"education-demo-001",
 name:"JUMO Education ERP Test Instance",
 type:"education-erp",
 tenant:"demo-university",
 features:[
   "admissions",
   "student-management",
   "finance",
   "library",
   "examinations"
 ]
};

console.log("GENERATING ERP...");

const generated = erpFactoryManager.generateERP(blueprint);

console.log(JSON.stringify(generated,null,2));

console.log("ACTIVATING ERP...");

const activated = erpActivationService.activate(generated);

console.log(JSON.stringify(activated,null,2));
