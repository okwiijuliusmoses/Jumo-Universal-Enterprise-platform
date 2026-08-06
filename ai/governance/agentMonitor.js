const records=[];


function monitor(agent){

    const status={

        agent,

        performance:"NORMAL",

        availability:"ONLINE",

        checkedAt:new Date()

    };


    records.push(status);


    return status;

}


function list(){

    return records;

}


module.exports={
    monitor,
    list
};
