/**
 * JUMO UEOS
 * System Configuration Registry
 */

export class SystemConfigurationRegistry {

constructor(){

 this.status="ONLINE";
 this.settings={};

}


set(key,value){

 this.settings[key]=value;

 return {
  key,
  value
 };

}


get(key){

 return this.settings[key];

}


list(){

 return this.settings;

}


health(){

 return {
  registry:"UEOS Configuration Registry",
  status:this.status,
  configurations:Object.keys(this.settings).length
 };

}

}


export const systemConfigurationRegistry =
new SystemConfigurationRegistry();
