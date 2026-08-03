/**
 * JUMO UEOS
 * ERP Workspace Provisioner
 */

export class ERPWorkspaceProvisioner {

  constructor(){
    this.workspaces=[];
    this.status="ONLINE";
  }


  provision(erp){

    const workspace = {

      id:`${erp.id}-workspace`,

      erpInstance:
        erp.id,

      tenant:
        erp.tenant || `${erp.id}-tenant`,

      portals:
        erp.portals || [],

      modules:
        erp.modules || [],

      departments:
        erp.departments || [],

      roles:[
        "System Administrator",
        "Institution Administrator",
        "Manager",
        "Staff",
        "User"
      ],

      status:"ACTIVE",

      createdAt:
        new Date().toISOString()

    };


    this.workspaces.push(workspace);


    return {
      workspace:
        workspace.id,

      status:"PROVISIONED",

      lifecycle:"ACTIVE",

      resources:{
        portals:
          workspace.portals.length,

        modules:
          workspace.modules.length,

        departments:
          workspace.departments.length
      }
    };

  }


  list(){
    return this.workspaces;
  }

}


export const erpWorkspaceProvisioner =
new ERPWorkspaceProvisioner();
