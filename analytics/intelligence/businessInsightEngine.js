const insights=[];


function analyze(data){

    const result={

        id:"INSIGHT-"+Date.now(),

        subject:data,

        recommendation:
        "System analysis completed",

        confidence:"HIGH",

        generatedAt:new Date()

    };


    insights.push(result);


    return result;

}


function list(){

    return insights;

}


module.exports={
    analyze,
    list
};
