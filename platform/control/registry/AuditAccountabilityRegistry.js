/**
 * JUMO UEOS
 * Audit & Accountability Registry
 */

export class AuditAccountabilityRegistry {

constructor(){

 this.status="ONLINE";
 this.events=[];

}


record(event){

 this.events.push({
  ...event,
  timestamp:new Date().toISOString()
 });

}


list(){

 return this.events;

}


health(){

 return {
  registry:"UEOS Audit Accountability Registry",
  status:this.status,
  events:this.events.length
 };

}

}


export const auditAccountabilityRegistry =
new AuditAccountabilityRegistry();
