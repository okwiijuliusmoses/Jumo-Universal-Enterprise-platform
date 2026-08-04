const logs=[];


function record(event){

    logs.push({

        event,

        timestamp:new Date()

    });

}


function history(){

    return logs;

}


module.exports={
    record,
    history
};
