
function getEnvironment(){

return {

platform:"JUMO UEOS",

deployment:"REPLIT",

runtime:process.version,

mode:process.env.NODE_ENV || "development",

checkedAt:new Date()

};

}


module.exports={

getEnvironment

};

