const lifecycle=[];


function activate(agent){

    lifecycle.push({

        agent,

        state:"ACTIVE",

        activatedAt:new Date()

    });

}


function deactivate(agent){

    lifecycle.push({

        agent,

        state:"DEACTIVATED",

        updatedAt:new Date()

    });

}


function list(){

    return lifecycle;

}


module.exports={
    activate,
    deactivate,
    list
};
