/**
 * JUMO UEOS
 * ERP Deployment Registry
 */

export class ERPDeploymentRegistry {

  constructor(){
    this.deployments=[];
    this.status="ONLINE";
  }

  register(instance){

    const exists =
      this.deployments.find(
        item=>item.id===instance.id
      );

    if(exists){
      return exists;
    }

    const record={
      id:instance.id,
      blueprintId:instance.blueprintId || null,
      name:instance.name || null,
      tenant:instance.tenant || null,
      category:instance.category || null,
      status:"DEPLOYED",
      lifecycle:"ACTIVE",
      portals:(instance.portals || []).length,
      modules:(instance.modules || []).length,
      forms:(instance.forms || []).length,
      workflows:(instance.workflows || []).length,
      components:(instance.components || []).length,
      aiAgents:(instance.aiAgents || []).length,
      deployedAt:new Date().toISOString()
    };

    this.deployments.push(record);

    return record;
  }

  get(id){
    return this.deployments.find(
      item=>item.id===id
    );
  }

  list(){
    return this.deployments;
  }

  health(){
    return {
      registry:"ERP Deployment Registry",
      status:this.status,
      deployments:this.deployments.length
    };
  }

}

export const erpDeploymentRegistry =
new ERPDeploymentRegistry();
