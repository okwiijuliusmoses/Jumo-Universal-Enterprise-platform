/**
 * JUMO UEOS
 * Navigation Configuration Registry
 */

export class NavigationConfigurationRegistry {

 constructor(){
  this.navigation=[];
 }

 register(item){

  const exists=this.navigation.find(
   n=>n.id===item.id
  );

  if(exists){
   return exists;
  }

  this.navigation.push({
   ...item,
   status:"ACTIVE"
  });

  return item;
 }

 list(){
  return this.navigation;
 }

 health(){
  return {
   registry:"UEOS Navigation Configuration Registry",
   navigation:this.navigation.length,
   status:"ONLINE"
  };
 }

}

export const navigationConfigurationRegistry =
new NavigationConfigurationRegistry();
