/**
 * JMO UEOS DHP Phase-1
 * Enterprise Policy Engine
 */

const store =
require("./policyStore");


function createPolicy(data){

    const policy = {

        id:data.id,

        name:data.name,

        module:data.module,

        action:data.action,

        allowedRoles:data.allowedRoles,

        status:"ACTIVE",

        createdAt:new Date()

    };


    return store.save(policy);

}


function check(policyId, role){

    const policy =
    store.get(policyId);


    if(!policy){

        return false;

    }


    return policy.allowedRoles
    .includes(role);

}


function list(){

    return store.all();

}


module.exports = {

    createPolicy,

    check,

    list

};
