export class PortalRuntime {

  constructor(){
    this.status = "ONLINE";
    this.portals = [];
  }

  register(portal){
    this.portals.push({
      id: portal.id,
      name: portal.name,
      domain: portal.domain || "enterprise",
      tenant: portal.tenant || null,
      modules: portal.modules || [],
      workflows: portal.workflows || []
    });

    return portal;
  }

  list(){
    return this.portals;
  }

  health(){
    return {
      runtime:"UEOS Portal Runtime",
      status:this.status,
      portals:this.portals.length
    };
  }

}

export const portalRuntime = new PortalRuntime();
