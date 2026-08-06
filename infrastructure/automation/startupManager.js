/**
 * JMO UEOS DHP Phase-1
 * Service Startup Automation
 */


const services=[];


function register(service){

    services.push({

        name:service,

        status:"STARTED"

    });


}


function list(){

    return services;

}


module.exports={

    register,

    list

};
