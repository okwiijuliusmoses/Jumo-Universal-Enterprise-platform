/**
 * JUMO UEOS
 * Public Experience & Branding Registry
 */

export class PublicExperienceRegistry {

constructor(){

 this.status="ONLINE";

 this.configuration={
  header:{},
  footer:{},
  navigation:[],
  news:[],
  advertisements:[],
  announcements:[]
 };

}


update(section,data){

 this.configuration[section]=data;

 return this.configuration[section];

}


get(){

 return this.configuration;

}


health(){

 return {
  registry:"UEOS Public Experience Registry",
  status:this.status,
  sections:Object.keys(this.configuration).length
 };

}

}


export const publicExperienceRegistry =
new PublicExperienceRegistry();
