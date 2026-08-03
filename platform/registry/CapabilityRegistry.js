/**
 * JUMO UEOS
 * Enterprise Capability Registry
 *
 * Central capability resolution layer for ERP generation.
 */

export class CapabilityRegistry {

  constructor(){
    this.capabilities = {
      domain: [],
      module: [],
      workflow: [],
      form: [],
      component: [],
      ai: []
    };
  }

  register(type, capability){

    if(!this.capabilities[type]){
      this.capabilities[type] = [];
    }

    this.capabilities[type].push(capability);

    return capability;
  }

  list(type){

    if(type){
      return this.capabilities[type] || [];
    }

    return this.capabilities;
  }

  clear(){

    Object.keys(this.capabilities)
      .forEach(type => {
        this.capabilities[type] = [];
      });

  }

}

export const capabilityRegistry = new CapabilityRegistry();
