/**
 * JMO UEOS DHP Phase-1
 * Enterprise Integration Manager
 */

const registry =
require("./connectorRegistry");


function connect(data){

    return registry.register({

        id:"CON-"+Date.now(),

        name:data.name,

        type:data.type,

        status:"CONNECTED",

        createdAt:new Date()

    });

}


function list(){

    return registry.all();

}


module.exports={

    connect,

    list

};
