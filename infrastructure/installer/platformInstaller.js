function checkPlatform(){

    return {

        platform:
        "JUMO DIGITAL HYBRID PLATFORM",

        runtime:
        process.version,

        status:
        "READY",

        checkedAt:
        new Date()

    };

}


function installComponent(name){

    return {

        component:name,

        status:
        "REGISTERED",

        installedAt:
        new Date()

    };

}


module.exports = {

    checkPlatform,

    installComponent

};
