/**
 * JUMO UEOS
 * National Enterprise Tenant Registry
 */

export class TenantRegistry {

  constructor(){

    this.status="ONLINE";

    this.tenants=[];

  }


  register(tenant){

    this.tenants.push({

      id:tenant.id,

      name:tenant.name,

      domains:tenant.domains || [],

      modules:tenant.modules || [],

      workflows:tenant.workflows || [],

      governance:tenant.governance || "standard"

    });

    return tenant;

  }


  get(id){

    return this.tenants.find(x=>x.id===id);

  }


  list(){

    return this.tenants;

  }


  health(){

    return {

      registry:"UEOS Tenant Registry",

      status:this.status,

      tenants:this.tenants.length

    };

  }

}


export const tenantRegistry = new TenantRegistry();
