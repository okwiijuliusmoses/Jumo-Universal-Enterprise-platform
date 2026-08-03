import { loadAllRegistries } 
from "./platform/control/registry/RegistryBootstrap.js";

import { erpInstanceRegistry } 
from "./platform/registry/ERPInstanceRegistry.js";

console.log("LOADING UEOS REGISTRIES...");

loadAllRegistries();

console.log("");
console.log("JUMO UEOS ERP INSTANCE VERIFICATION");
console.log("--------------------------------");

const instances = erpInstanceRegistry.list();

console.log("REGISTERED ERP COUNT:", instances.length);

instances.forEach((erp,index)=>{
 console.log({
   number:index+1,
   id:erp.id,
   blueprint:erp.blueprintId,
   status:erp.status,
   lifecycle:erp.lifecycle
 });
});

console.log("");

console.log(
"ACTIVE INSTANCES:",
erpInstanceRegistry.list().length
);

console.log("--------------------------------");
console.log("ERP DEPLOYMENT CHECK COMPLETE");
