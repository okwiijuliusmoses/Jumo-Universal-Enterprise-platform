/**
 * JMO UEOS DHP Phase-1
 * Tenant Storage Layer
 */

const tenants = {};

function save(tenant){

    tenants[tenant.id] = tenant;

    return tenant;

}


function get(id){

    return tenants[id];

}


function all(){

    return Object.values(tenants);

}


module.exports = {
    save,
    get,
    all
};
