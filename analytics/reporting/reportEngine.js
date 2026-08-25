const reports=[];


function createReport(report){

    const item={

        id:"REPORT-"+Date.now(),

        name:report.name,

        type:report.type,

        data:report.data,

        status:"GENERATED",

        createdAt:new Date()

    };


    reports.push(item);

    return item;

}


function list(){

    return reports;

}


module.exports={
    createReport,
    list
};
