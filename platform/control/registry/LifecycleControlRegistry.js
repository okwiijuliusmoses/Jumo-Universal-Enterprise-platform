/**
 * JUMO UEOS
 * Lifecycle Control Registry
 */

export class LifecycleControlRegistry {

constructor(){
 this.status="ONLINE";
 this.records=[];
}

register(entity){
 const record={
  ...entity,
  state:"ACTIVE",
  history:[
   {
    action:"REGISTERED",
    date:new Date().toISOString()
   }
  ]
 };

 this.records.push(record);
 return record;
}


changeState(id,state){

 const entity=this.records.find(
  e=>e.id===id
 );

 if(!entity){
  return null;
 }

 entity.state=state;

 entity.history.push({
  action:state,
  date:new Date().toISOString()
 });

 return entity;
}


list(){
 return this.records;
}


health(){
 return {
  registry:"UEOS Lifecycle Control Registry",
  status:this.status,
  entities:this.records.length
 };
}

}

export const lifecycleControlRegistry =
new LifecycleControlRegistry();
