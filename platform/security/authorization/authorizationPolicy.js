const policies=[];


function createPolicy(policy){

    policies.push({

        name:policy,
        status:"ACTIVE",
        createdAt:new Date()

    });

}


function listPolicies(){

    return policies;

}


module.exports={
    createPolicy,
    listPolicies
};
