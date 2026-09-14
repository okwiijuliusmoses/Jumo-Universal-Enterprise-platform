/**
 * JUMO UEOS
 * Enterprise Event Registry
 */

export class EventRegistry {

 constructor(){
  this.events=[];
 }


 register(event){

  this.events.push({

   id:event.id || `event-${Date.now()}`,

   name:event.name,

   source:event.source,

   consumers:event.consumers || [],

   timestamp:new Date().toISOString()

  });

 }


 list(){

  return this.events;

 }

}


export const eventRegistry =
new EventRegistry();
