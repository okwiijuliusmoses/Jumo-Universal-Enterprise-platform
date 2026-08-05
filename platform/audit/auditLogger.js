/**
 * JMO UEOS DHP Phase-1
 * Enterprise Audit Logger
 */

const store =
require("./auditStore");


function log(data){

    const record = {

        id:"AUD-"+Date.now(),

        tenantId:data.tenantId,

        userId:data.userId,

        action:data.action,

        module:data.module,

        timestamp:new Date()

    };


    return store.save(record);

}


function history(){

    return store.all();

}


module.exports = {

    log,

    history

};
