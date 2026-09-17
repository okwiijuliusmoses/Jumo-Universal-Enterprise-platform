/**
 * JUMO UEOS
 * Component Registry
 */

export class ComponentRegistry {

 constructor(){
   this.status="ONLINE";
   this.components=[];
 }

 register(component){
   this.components.push(component);
   return component;
 }

 list(){
   return this.components;
 }

 health(){
   return {
    registry:"JUMO Component Registry",
    status:this.status,
    components:this.components.length
   };
 }

}

export const componentRegistry = new ComponentRegistry();
