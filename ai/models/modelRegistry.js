/**
 * JMO UEOS DHP Phase-1
 * AI Model Registry
 */

const models=[];


function register(model){

    models.push({

        id:"MODEL-"+Date.now(),

        name:model.name,

        provider:model.provider,

        mode:model.mode,

        status:"AVAILABLE"

    });


    return models[models.length-1];

}


function all(){

    return models;

}


module.exports={

    register,

    all

};
