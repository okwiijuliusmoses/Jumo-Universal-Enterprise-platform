/**
 * JUMO UEOS
 * Universal Navigation Registry
 */

export class NavigationRegistry {

constructor(){

 this.status="ONLINE";
 this.routes=[];

}


register(route){

 this.routes.push({
  ...route,
  enabled:true
 });

 return route;

}


disable(id){

 const route=this.routes.find(
  r=>r.id===id
 );

 if(route){
  route.enabled=false;
 }

 return route;

}


list(){

 return this.routes;

}


health(){

 return {
  registry:"UEOS Navigation Registry",
  status:this.status,
  routes:this.routes.length
 };

}

}


export const navigationRegistry =
new NavigationRegistry();
