/**
 * JMO UEOS DHP Phase-1
 * Enterprise Deployment Manager
 */

const deployments=[];


function deploy(data){

    const record={

        id:"DEP-"+Date.now(),

        environment:data.environment,

        target:data.target,

        version:data.version || "0.1.0",

        status:"DEPLOYED",

        deployedAt:new Date()

    };


    deployments.push(record);

    return record;

}


function history(){

    return deployments;

}


module.exports={

    deploy,

    history

};
