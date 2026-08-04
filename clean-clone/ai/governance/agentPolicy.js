const policies=[];


function createPolicy(policy){

    policies.push({

        id:"AGENT-POLICY-"+Date.now(),

        agent:policy.agent,

        permissions:
        policy.permissions || [],

        restrictions:
        policy.restrictions || [],

        status:"ACTIVE",

        createdAt:new Date()

    });

}


function list(){

    return policies;

}


module.exports={
    createPolicy,
    list
};
