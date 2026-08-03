/**
 * JUMO UEOS
 * Master Registry of Registries
 */

export class MasterRegistryRegistry {

constructor(){

 this.status="ONLINE";
 this.registries=[];

}


register(registry){

 const exists=this.registries.find(
  r=>r.id===registry.id
 );

 if(exists){
  return exists;
 }

 this.registries.push({
  ...registry,
  active:true,
  registeredAt:new Date().toISOString()
 });

 return registry;

}


get(id){

 return this.registries.find(
  r=>r.id===id
 );

}


list(){

 return this.registries;

}


health(){

 return {
  registry:"UEOS Master Registry of Registries",
  status:this.status,
  registries:this.registries.length
 };

}

}


export const masterRegistryRegistry =
new MasterRegistryRegistry();
