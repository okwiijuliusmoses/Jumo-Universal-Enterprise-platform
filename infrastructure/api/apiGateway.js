/**
 * JMO UEOS DHP Phase-1
 * Enterprise API Gateway
 */

const registry =
require("./routeRegistry");


function registerEndpoint(data){

    return registry.register({

        path:data.path,

        method:data.method,

        service:data.service,

        status:"ACTIVE"

    });

}


function routes(){

    return registry.all();

}


function request(path){

    const route =
    registry.find(path);


    if(!route){

        return {

            status:"NOT_FOUND"

        };

    }


    return {

        status:"CONNECTED",

        service:route.service

    };

}


module.exports = {

    registerEndpoint,

    routes,

    request

};
