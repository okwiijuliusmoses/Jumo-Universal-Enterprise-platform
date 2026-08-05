/**
 * JMO UEOS DHP Phase-1
 * AI Gateway Runtime
 */

const store =
require("./aiGatewayStore");


function connect(data){

    const service = {

        id:"AI-"+Date.now(),

        name:data.name,

        provider:data.provider,

        type:data.type,

        status:"CONNECTED",

        createdAt:new Date()

    };


    return store.register(service);

}


function services(){

    return store.all();

}


module.exports = {

    connect,

    services

};
