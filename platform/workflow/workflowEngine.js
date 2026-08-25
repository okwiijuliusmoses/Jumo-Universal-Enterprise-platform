/**
 * JMO UEOS DHP Phase-1
 * Enterprise Workflow Engine
 */

const store =
require("./workflowStore");


function createWorkflow(data){

    const workflow = {

        id:data.id,

        name:data.name,

        tenantId:data.tenantId,

        status:"CREATED",

        steps:data.steps || [],

        createdAt:new Date()

    };


    return store.save(workflow);

}


function execute(id){

    const workflow =
    store.get(id);


    if(!workflow){

        throw new Error(
            "Workflow not found"
        );

    }


    workflow.status="RUNNING";


    return workflow;

}


function list(){

    return store.all();

}


module.exports = {

    createWorkflow,

    execute,

    list

};
