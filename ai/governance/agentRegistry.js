const agents=[];


function register(agent){

    const item={

        id:"AGENT-"+Date.now(),

        name:agent.name,

        domain:agent.domain,

        purpose:agent.purpose,

        status:"REGISTERED",

        createdAt:new Date()

    };


    agents.push(item);

    return item;

}


function list(){

    return agents;

}


module.exports={
    register,
    list
};
