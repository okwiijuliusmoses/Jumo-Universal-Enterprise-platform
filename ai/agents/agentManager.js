/**
 * JMO UEOS DHP Phase-1
 * AI Agent Lifecycle Manager
 */

const agents=[];


function createAgent(data){

    const agent={

        id:"AGENT-"+Date.now(),

        name:data.name,

        purpose:data.purpose,

        status:"ACTIVE",

        createdAt:new Date()

    };


    agents.push(agent);

    return agent;

}


function list(){

    return agents;

}


module.exports={

    createAgent,

    list

};
