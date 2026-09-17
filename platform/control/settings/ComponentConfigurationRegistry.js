/**
 * JUMO UEOS
 * Component Configuration Registry
 */

export class ComponentConfigurationRegistry {

 constructor(){
  this.components=[];
 }

 register(component){

  const exists=this.components.find(
   c=>c.id===component.id
  );

  if(exists){
   return exists;
  }

  this.components.push({
   ...component,
   status:"ACTIVE"
  });

  return component;
 }

 list(){
  return this.components;
 }

 health(){
  return {
   registry:"UEOS Component Configuration Registry",
   components:this.components.length,
   status:"ONLINE"
  };
 }

}

export const componentConfigurationRegistry =
new ComponentConfigurationRegistry();
